from rest_framework.permissions import BasePermission
from django.contrib.auth import get_user_model


User = get_user_model()


class IsOwnerRole(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.RESTAURANT_OWNER


class IsManagerRole(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.MANAGER


class IsKitchenStaffRole(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.KITCHEN_STAFF
