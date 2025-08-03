from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsKitchenStaffRole, IsManagerRole
from order.permissions.general_permission import IsOrderOwner


class CanDestroyOrder(BasePermission):
    def has_permission(self, request, view):
        # Only allow authenticated users to destroy orders
        return (
            IsOrderOwner().has_permission(request, view)
            or IsKitchenStaffRole().has_permission(request, view)
            or IsManagerRole().has_permission(request, view)
        )
