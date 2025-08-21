from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsManagerRole, IsOwnerRole
from order.permissions.general_permission import (
    IsKitchenStaffRole,
    IsOrderKitchenStaff,
    IsOrderOwner,
    IsOrderOwnerOrParticipant,
)


class CanListOrder(BasePermission):
    def has_permission(self, request, view):
        return (
            IsKitchenStaffRole().has_permission(request, view)
            or IsManagerRole().has_permission(request, view)
            or IsOwnerRole().has_permission(request, view)
        )


class CanListConcreteOrderOrderProducts(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            IsOrderOwnerOrParticipant().has_object_permission(request, view, obj)
            or IsOrderKitchenStaff().has_object_permission(request, view, obj)
            or IsManagerRole().has_permission(request, view)
            or IsOwnerRole().has_permission(request, view)
        )


class CanListOrderProduct(BasePermission):
    def has_permission(self, request, view):
        return (
            IsKitchenStaffRole().has_permission(request, view)
            or IsManagerRole().has_permission(request, view)
            or IsOwnerRole().has_permission(request, view)
        )
