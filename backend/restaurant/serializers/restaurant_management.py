from rest_framework.serializers import ModelSerializer
from restaurant.models import Restaurant, Table


class RestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = [
            "id",
            "name",
            "location",
            "contact_number",
            "workday_open_hour",
            "workday_close_hour",
            "weekend_open_hour",
            "weekend_close_hour",
        ]


class TableSerializer(ModelSerializer):
    class Meta:
        model = Table
        fields = ["id", "restaurant", "number"]
