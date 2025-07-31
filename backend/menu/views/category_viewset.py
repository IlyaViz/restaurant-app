from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from menu.models import Category, Product
from menu.permissions.general_permission import CanManageMenu
from menu.serializers.category_serializer import CategorySerializer
from menu.serializers.product_serializer import ProductSerializer


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

        products = Product.active_objects.filter(category=instance)
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)
