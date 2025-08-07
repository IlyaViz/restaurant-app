from rest_framework.permissions import BasePermission
from django.contrib.auth import get_user_model


User = get_user_model()


class IsOwnerRole(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.RESTAURANT_OWNER


class IsKitchenStaffRole(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.KITCHEN_STAFF


class IsManagerRole(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.MANAGER


class IsAccountOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj

