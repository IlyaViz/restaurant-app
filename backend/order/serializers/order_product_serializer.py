from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from order.models import OrderProduct


class OrderProductSerializer(ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ["id", "order", "customer", "product", "quantity", "status"]
        extra_kwargs = {
            "customer": {"read_only": True},
        }

    NON_ACTIVE_STATUSES = [
        OrderProduct.Status.DRAFT,
        OrderProduct.Status.PENDING,
    ]

    def is_active_status(self):
        return self.instance.status not in self.NON_ACTIVE_STATUSES

    def validate_owner_can_not_change_status(
        self, data, is_object_owner, changed_fields
    ):
        if (
            is_object_owner
            and "status" in changed_fields
            and not self.is_active_status()
            and data["status"] not in self.NON_ACTIVE_STATUSES
        ):
            raise serializers.ValidationError(
                "You cannot change the status of this order product."
            )

    def validate_not_owner_can_change_only_status(
        self, is_object_owner, changed_fields
    ):
        if not is_object_owner and changed_fields != ["status"]:
            raise serializers.ValidationError(
                "You can only update the status of this order product."
            )

    def validate_owner_can_not_change_order_product_with_status(self, is_object_owner):
        if is_object_owner and self.is_active_status():
            raise serializers.ValidationError(
                "Cannot update order product that is not draft or pending."
            )

    def validate(self, data):
        if self.context["request"].method in ["PUT", "PATCH"]:
            is_object_owner = self.context["request"].user == self.instance.customer
            changed_fields = [
                field for field in data if field != getattr(self.instance, field)
            ]

            self.validate_owner_can_not_change_order_product_with_status(
                is_object_owner
            )
            self.validate_owner_can_not_change_status(
                data, is_object_owner, changed_fields
            )
            self.validate_not_owner_can_change_only_status(
                is_object_owner, changed_fields
            )

        return data
