from rest_framework.serializers import ModelSerializer
from order.models import OrderProduct


class OrderProductSerializer(ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ["id", "order", "customer", "product", "quantity", "status"]
