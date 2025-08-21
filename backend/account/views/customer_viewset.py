from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from common.pagination import LimitOffsetPaginationWithMaxLimit
from account.serializers.user_serializer import UserSerializer
from account.permissions.customer_permission import CanManageCustomer, CanListCustomer


User = get_user_model()


class CustomerViewSet(ModelViewSet):
    queryset = User.objects.filter(role=User.Role.CUSTOMER)
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {"username": ["icontains"]}
    pagination_class = LimitOffsetPaginationWithMaxLimit

    def get_permissions(self):
        if self.action in [
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            return [IsAuthenticated(), CanManageCustomer()]

        if self.action == "list":
            return [IsAuthenticated(), CanListCustomer()]

        return super().get_permissions()
