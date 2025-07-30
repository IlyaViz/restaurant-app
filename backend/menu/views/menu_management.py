from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from menu.models import Category, Product
from menu.permissions.menu_management import CanManageMenu
from menu.serializers.menu_management import (
    CategorySerializer,
    ProductSerializer,
)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), CanManageMenu()]

        return super().get_permissions()

    @action(detail=True, methods=["get"])
    def products(self, request, pk=None):
        instance = self.get_object()

        products = instance.product_set.filter(is_active=True)
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), CanManageMenu()]

        return super().get_permissions()
