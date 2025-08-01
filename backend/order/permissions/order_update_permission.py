from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsKitchenStaffRole
from order.permissions.general_permission import IsOrderProductOwner


class CanUpdateOrderProduct(BasePermission):
    def has_object_permission(self, request, view, obj):
        return IsOrderProductOwner().has_object_permission(
            request, view, obj
        ) or IsKitchenStaffRole().has_object_permission(request, view, obj)
