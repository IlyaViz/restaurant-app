from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from order.serializers.order_product_serializer import OrderProductSerializer
from order.permissions.order_update_permission import CanUpdateOrderProduct
from order.permissions.general_permission import IsOrderProductOwner
from order.models import OrderProduct
from order.permissions.order_list_permission import CanListOrderProduct


class OrderProductViewSet(ModelViewSet):
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()

    def get_permissions(self):
        if self.action == "list":
            return [IsAuthenticated(), CanListOrderProduct()]

        if self.action in ["update", "partial_update"]:
            return [IsAuthenticated(), CanUpdateOrderProduct()]

        if self.action == "create":
            return [IsAuthenticated()]

        return [IsAuthenticated(), IsOrderProductOwner()]

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user, status=OrderProduct.Status.DRAFT)