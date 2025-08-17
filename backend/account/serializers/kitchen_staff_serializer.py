from rest_framework.serializers import ModelSerializer
from account.models import KitchenStaff


class KitchenStaffProfileSerializer(ModelSerializer):
    class Meta:
        model = KitchenStaff
        fields = ["id", "user", "restaurant"]
