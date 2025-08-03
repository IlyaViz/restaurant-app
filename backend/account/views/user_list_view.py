from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from account.serializers.user_list_serializer import UserListSerializer
from account.permissions.user_list_permission import CanListManagers


User = get_user_model()


class CustomerListView(ListAPIView):
    serializer_class = UserListSerializer
    queryset = User.objects.filter(role=User.Role.CUSTOMER)


class ManagerListView(ListAPIView):
    permission_classes = [IsAuthenticated, CanListManagers]
    serializer_class = UserListSerializer
    queryset = User.objects.filter(role=User.Role.MANAGER)
