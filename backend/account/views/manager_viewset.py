from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from account.serializers.user_serializer import UserSerializer
from account.permissions.manager_permission import CanManageManager, CanListManager

User = get_user_model()


class ManagerViewSet(ModelViewSet):
    queryset = User.objects.filter(role=User.Role.MANAGER)
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in [
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [IsAuthenticated(), CanManageManager()]

        if self.action == "list":
            return [IsAuthenticated(), CanListManager()]

        return super().get_permissions()
