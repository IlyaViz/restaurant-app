from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsKitchenStaffRole
from order.permissions.general_permission import IsOrderProductOwner, IsOrderOwner


class CanUpdateOrderProduct(BasePermission):
    def has_object_permission(self, request, view, obj):
        return IsOrderProductOwner().has_object_permission(
            request, view, obj
        ) or IsKitchenStaffRole().has_object_permission(request, view, obj)


class CanUpdateOrder(BasePermission):
    def has_permission(self, request, view):
        return IsKitchenStaffRole().has_permission(
            request, view
        ) or IsOrderOwner().has_permission(request, view)
