from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from account.serializers.kitchen_staff_serializer import KitchenStaffProfileSerializer
from account.permissions.kitchen_staff_permission import (
    CanManageKitchenStaff,
    CanListKitchenStaff,
)
from account.models import KitchenStaff


class KitchenStaffProfileViewSet(ModelViewSet):
    queryset = KitchenStaff.objects.all()
    serializer_class = KitchenStaffProfileSerializer

    def get_permissions(self):
        if self.action in [
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [IsAuthenticated(), CanManageKitchenStaff()]

        if self.action == "list":
            return [IsAuthenticated(), CanListKitchenStaff()]

        return super().get_permissions()
