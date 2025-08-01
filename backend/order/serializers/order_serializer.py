from rest_framework.serializers import ModelSerializer
from order.models import Order


class OrderSerializer(ModelSerializer):
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
