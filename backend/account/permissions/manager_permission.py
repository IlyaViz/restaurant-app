from rest_framework.permissions import BasePermission
from account.permissions.general_permission import (
    IsAccountOwner,
    IsOwnerRole,
)


class CanListManager(BasePermission):
    def has_permission(self, request, view):
        return IsOwnerRole().has_permission(request, view)


class CanManageManager(BasePermission):
    def has_object_permission(self, request, view, obj):
        return IsAccountOwner().has_object_permission(
            request, view, obj
        ) or IsOwnerRole().has_permission(request, view)
