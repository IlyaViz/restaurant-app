from rest_framework.serializers import ModelSerializer
from menu.models import Product


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "category", "is_active"]
