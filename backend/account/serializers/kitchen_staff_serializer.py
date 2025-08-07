from rest_framework.serializers import ModelSerializer
from account.models import KitchenStaff


class KitchenStaffExtraSerializer(ModelSerializer):
    class Meta:
        model = KitchenStaff
        fields = ["restaurant"]
