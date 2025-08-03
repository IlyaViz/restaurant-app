from rest_framework import serializers
from account.models import KitchenStaff


class KitchenStaffSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = KitchenStaff
        fields = ["id", "restaurant", "username"]
