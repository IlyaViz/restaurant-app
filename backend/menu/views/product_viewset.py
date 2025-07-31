from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from menu.models import Product
from menu.permissions.general_permission import CanManageMenu
from menu.serializers.product_serializer import ProductSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.active_objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), CanManageMenu()]

        return super().get_permissions()
