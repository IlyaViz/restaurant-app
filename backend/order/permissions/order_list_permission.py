from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsManagerRole
from order.permissions.general_permission import (
    IsOrderKitchenStaff,
    IsOrderProductKitchenStaff,
)


class CanListOrder(BasePermission):
    def has_permission(self, request, view):
        return IsOrderKitchenStaff().has_permission(
            request, view
        ) or IsManagerRole().has_permission(request, view)


class CanListOrderProduct(BasePermission):
    def has_permission(self, request, view):
        return IsOrderProductKitchenStaff().has_permission(
            request, view
        ) or IsManagerRole().has_permission(request, view)
