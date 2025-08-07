from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.core.validators import MinValueValidator
from restaurant.models import Table
from menu.models import Product
from common.models import ProjectBaseModel


User = get_user_model()


class Order(ProjectBaseModel):
    customer = models.ForeignKey(User, on_delete=models.PROTECT)
    table = models.ForeignKey(Table, on_delete=models.PROTECT)
    start_at = models.DateTimeField(default=timezone.now)
    finished_at = models.DateTimeField(null=True, blank=True)
    participants = models.ManyToManyField(
        User, blank=True, related_name="order_participant_set"
    )

    def has_active_products(self):
        return self.orderproduct_set.filter(
            status__in=[
                OrderProduct.Status.IN_PROGRESS,
                OrderProduct.Status.COMPLETED,
            ]
        ).exists()

    def has_unpaid_products(self):
        return self.orderproduct_set.exclude(status=OrderProduct.Status.PAID).exists()

    def delete(self, *args, **kwargs):
        if self.has_active_products():
            raise ValidationError("Cannot delete order with active products.")

        return super().delete(*args, **kwargs)

    def validate_active_order_can_not_be_finished(self):
        if self.finished_at and self.has_unpaid_products():
            raise ValidationError("Cannot finish an order with unpaid products.")

    def validate_one_active_order_per_customer(self):
        if (
            self.customer.order_set.filter(finished_at__isnull=True)
            .exclude(pk=self.pk)
            .exists()
        ):
            raise ValidationError("Customer already has an active order.")

    def clean(self, *args, **kwargs):
        self.validate_active_order_can_not_be_finished()
        self.validate_one_active_order_per_customer()

        return super().clean(*args, **kwargs)


class OrderProduct(ProjectBaseModel):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PENDING = "pending", "Pending"
        IN_PROGRESS = "in_progress", "In Progress"
        COMPLETED = "completed", "Completed"
        PAID = "paid", "Paid"

    INACTIVE_STATUSES = [
        Status.DRAFT,
        Status.PENDING,
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField(
        default=1, validators=[MinValueValidator(1)]
    )
    status = models.CharField(choices=Status.choices, default=Status.PENDING)

    def delete(self, *args, **kwargs):
        if self.status not in [self.Status.DRAFT, self.Status.PENDING]:
            raise ValidationError(
                "Cannot delete order product that is not draft or pending."
            )

        return super().delete(*args, **kwargs)

    def validate_customer_has_access_to_order(self):
        if (
            self.customer not in self.order.participants.all()
            and self.customer != self.order.customer
        ):
            raise ValidationError("Customer does not have access to this order.")

    def validate_order_is_active(self):
        if self.order.finished_at is not None:
            raise ValidationError("Cannot modify order product of a finished order.")

    def clean(self, *args, **kwargs):
        self.validate_order_is_active()
        self.validate_customer_has_access_to_order()

        return super().clean(*args, **kwargs)
