from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from restaurant.models import Table
from menu.models import Product


User = get_user_model()


class Order(models.Model):
    creator_customer = models.ForeignKey(User, on_delete=models.PROTECT)
    table = models.ForeignKey(Table, on_delete=models.PROTECT)
    start_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    secret = models.CharField(max_length=10, unique=True)

    def has_active_products(self):
        return self.orderproduct_set.filter(
            status__in=[
                OrderProduct.Status.IN_PROGRESS,
                OrderProduct.Status.COMPLETED,
            ]
        ).exists()

    def delete(self, *args, **kwargs):
        if self.has_active_products():
            raise ValidationError("Cannot delete order with active products.")

        return super().delete(*args, **kwargs)

    def clean(self, *args, **kwargs):
        if self.finished_at and self.has_active_products():
            raise ValidationError("Cannot finish order with active products.")

        return super().clean(*args, **kwargs)


class OrderProduct(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PENDING = "pending", "Pending"
        IN_PROGRESS = "in_progress", "In Progress"
        COMPLETED = "completed", "Completed"
        PAID = "paid", "Paid"

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField(default=1)
    status = models.CharField(choices=Status.choices, default=Status.PENDING)

    def delete(self, *args, **kwargs):
        if self.status not in [self.Status.DRAFT, self.Status.PENDING]:
            raise ValidationError(
                "Cannot delete order product that is not draft or pending."
            )

        return super().delete(*args, **kwargs)
