from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsManagerRole, IsOwnerRole
from order.permissions.general_permission import IsOrderOwner, IsOrderKitchenStaff


class CanDestroyOrder(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            IsOrderOwner().has_object_permission(request, view, obj)
            or IsOrderKitchenStaff().has_object_permission(request, view, obj)
            or IsManagerRole().has_permission(request, view)
            or IsOwnerRole().has_permission(request, view)
        )
