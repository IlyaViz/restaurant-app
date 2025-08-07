from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from order.models import Order, OrderProduct


User = get_user_model()


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "customer",
            "table",
            "start_at",
            "finished_at",
            "participants",
        ]

        extra_kwargs = {
            "customer": {"read_only": True},
            "finished_at": {"read_only": True},
        }

    def validate_owner_can_not_change_finished_at(self, data, is_owner):
        if (
            is_owner
            and "finished_at" in data
            and data["finished_at"] != self.instance.finished_at
        ):
            raise ValidationError("You cannot change the finished_at field.")

    def validate_owner_can_not_change_active_order_table(self, data, is_owner):
        if (
            is_owner
            and "table" in data
            and self.instance.orderproduct_set.exclude(
                status__in=OrderProduct.INACTIVE_STATUSES
            ).exists()
        ):
            raise ValidationError(
                "You cannot change the table field of an active order."
            )

    def validate_owner_can_not_change_active_order_start_at(self, data, is_owner):
        if (
            is_owner
            and "start_at" in data
            and self.instance.orderproduct_set.exclude(
                status__in=OrderProduct.INACTIVE_STATUSES
            ).exists()
        ):
            raise ValidationError(
                "You cannot change the start_at field of an active order."
            )

    def validate(self, data):
        if self.context["request"].method in ["PUT", "PATCH"]:
            is_owner = self.context["request"].user == self.instance.customer

            self.validate_owner_can_not_change_finished_at(data, is_owner)
            self.validate_owner_can_not_change_active_order_table(data, is_owner)
            self.validate_owner_can_not_change_active_order_start_at(data, is_owner)

        return data
