from rest_framework.permissions import BasePermission
from django.contrib.auth import get_user_model


User = get_user_model()


class CanListManagers(BasePermission):
    def has_permission(self, request, view):
        return request.user.level >= User.get_role_level(User.Role.MANAGER)
