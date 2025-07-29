from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from account.permissions.general import IsOwnerRole
from restaurant.models import Restaurant
from restaurant.serializers.restaurant_management import RestaurantSerializer


class RestaurantViewSet(ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsOwnerRole()]

        return super().get_permissions()
