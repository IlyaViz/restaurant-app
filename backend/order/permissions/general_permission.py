from rest_framework.permissions import BasePermission
from account.permissions.general_permission import IsKitchenStaffRole
from account.models import KitchenStaff


class IsOrderOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.customer


class IsOrderOwnerOrParticipant(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            IsOrderOwner().has_object_permission(request, view, obj)
            or request.user in obj.participants.all()
        )


class IsOrderProductOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.customer


class IsOrderProductOwnerOrOrderOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            IsOrderProductOwner().has_object_permission(request, view, obj)
            or obj.order.customer == request.user
        )


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
