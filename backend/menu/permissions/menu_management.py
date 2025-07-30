from rest_framework.permissions import BasePermission
from account.permissions.general import IsOwnerRole, IsManagerRole


class CanManageMenu(BasePermission):
    def has_permission(self, request, view):
        return IsOwnerRole().has_permission(
            request, view
        ) or IsManagerRole().has_permission(request, view)
