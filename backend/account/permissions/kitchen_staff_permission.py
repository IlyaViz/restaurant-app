from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsManagerRole, IsOwnerRole


class CanManageKitchenStaff(BasePermission):
    def has_permission(self, request, view):
        return IsManagerRole().has_permission(
            request, view
        ) or IsOwnerRole().has_permission(request, view)
