from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from account.models import KitchenStaff
from account.serializers.kitchen_staff_serializer import KitchenStaffSerializer
from account.permissions.kitchen_staff_permission import CanManageKitchenStaff


class KitchenStaffViewSet(ModelViewSet):
    queryset = KitchenStaff.objects.all()
    serializer_class = KitchenStaffSerializer
    permission_classes = [IsAuthenticated, CanManageKitchenStaff]
