from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from account.permissions.general import IsOwnerRole
from restaurant.models import Restaurant, Table
from restaurant.serializers.restaurant_management import (
    RestaurantSerializer,
    TableSerializer,
)


class RestaurantViewSet(ModelViewSet):
    queryset = Restaurant.objects.filter(is_active=True)
    serializer_class = RestaurantSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsOwnerRole()]

        return super().get_permissions()

    @action(detail=True, methods=["get"])
    def tables(self, request, pk=None):
        instance = self.get_object()

        tables = instance.table_set.all()
        serializer = TableSerializer(tables, many=True)

        return Response(serializer.data)


class TableViewSet(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsOwnerRole()]

        return super().get_permissions()
