from rest_framework.permissions import BasePermission
from account.permissions.general_permission import (
    IsAccountOwner,
    IsManagerRole,
    IsOwnerRole,
)


class CanListCustomer(BasePermission):
    def has_permission(self, request, view):
        return IsManagerRole().has_permission(
            request, view
        ) or IsOwnerRole().has_permission(request, view)


class CanManageCustomer(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            IsAccountOwner().has_object_permission(request, view, obj)
            or IsManagerRole().has_permission(request, view)
            or IsOwnerRole().has_permission(request, view)
        )
