from rest_framework.generics import ListAPIView
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from common.pagination import LimitOffsetPaginationWithMaxLimit
from account.serializers.public_user_serializer import PublicUserSerializer


User = get_user_model()


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {"username": ["icontains"]}
    pagination_class = LimitOffsetPaginationWithMaxLimit
