from rest_framework.serializers import ModelSerializer
from order.models import Order


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "creator_customer",
            "table",
            "created_at",
            "finished_at",
            "secret",
        ]
