from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsKitchenStaffRole, IsManagerRole


class CanListOrder(BasePermission):
    def has_permission(self, request, view):
        return IsKitchenStaffRole().has_permission(
            request, view
        ) or IsManagerRole().has_permission(request, view)


class CanListOrderProduct(BasePermission):
    def has_permission(self, request, view):
        return CanListOrder().has_permission(request, view)
