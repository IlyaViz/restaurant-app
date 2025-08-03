from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from order.models import Order


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

    def validate(self, data):
        if self.context["request"].method in ["PUT", "PATCH"]:
            is_owner = self.context["request"].user == self.instance.customer

            self.validate_owner_can_not_change_finished_at(data, is_owner)

        return data
