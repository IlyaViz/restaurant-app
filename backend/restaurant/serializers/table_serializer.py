from rest_framework.serializers import ModelSerializer
from restaurant.models import Table


class TableSerializer(ModelSerializer):
    class Meta:
        model = Table
        fields = ["id", "restaurant", "number", "is_active"]
