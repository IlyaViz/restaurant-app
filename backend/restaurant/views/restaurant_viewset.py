from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from account.permissions.general_permission import IsOwnerRole
from restaurant.models import Restaurant, Table
from restaurant.serializers.restaurant_serializer import RestaurantSerializer
from restaurant.serializers.table_serializer import TableSerializer


class RestaurantViewSet(ModelViewSet):
    queryset = Restaurant.active_objects.all()
    serializer_class = RestaurantSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsOwnerRole()]

        return super().get_permissions()

    @action(detail=True, methods=["get"])
    def tables(self, request, pk=None):
        instance = self.get_object()

        tables = Table.active_objects.filter(restaurant=instance)
        serializer = TableSerializer(tables, many=True)

        return Response(serializer.data)
