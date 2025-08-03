from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsKitchenStaffRole
from account.models import KitchenStaff


class IsOrderOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.customer


class IsOrderProductOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.customer


class IsOrderKitchenStaff(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            IsKitchenStaffRole().has_permission(request, view)
            and KitchenStaff.objects.filter(
                user=request.user, restaurant=obj.table.restaurant
            ).exists()
        )


class IsOrderProductKitchenStaff(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            IsKitchenStaffRole().has_permission(request, view)
            and KitchenStaff.objects.filter(
                user=request.user, restaurant=obj.order.table.restaurant
            ).exists()
        )
