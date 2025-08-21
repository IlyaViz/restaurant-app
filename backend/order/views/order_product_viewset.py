from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from order.serializers.order_product_serializer import OrderProductSerializer
from order.permissions.order_update_permission import CanUpdateOrderProduct
from order.permissions.general_permission import IsOrderProductOwnerOrOrderOwner
from order.models import OrderProduct
from order.permissions.order_list_permission import CanListOrderProduct


User = get_user_model()


class OrderProductViewSet(ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer

    def get_permissions(self):
        if self.action == "list":
            return [IsAuthenticated(), CanListOrderProduct()]

        if self.action in ["update", "partial_update"]:
            return [IsAuthenticated(), CanUpdateOrderProduct()]

        if self.action == "create":
            return [IsAuthenticated()]

        return [IsAuthenticated(), IsOrderProductOwnerOrOrderOwner()]

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user, status=OrderProduct.Status.DRAFT)
