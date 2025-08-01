from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from order.serializers.order_product_serializer import OrderProductSerializer
from order.permissions.order_update_permission import CanUpdateOrderProduct
from order.permissions.general_permission import IsOrderProductOwner
from order.models import OrderProduct
from account.permissions.general_permission import IsKitchenStaffRole


class OrderProductViewSet(ModelViewSet):
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()

    def get_permissions(self):
        if self.action == "list":
            return [IsAuthenticated(), IsKitchenStaffRole()]

        if self.action in ["update", "partial_update"]:
            return [IsAuthenticated(), CanUpdateOrderProduct()]

        if self.action == "create":
            return [IsAuthenticated()]

        return [IsAuthenticated(), IsOrderProductOwner()]

    def perform_create(self, serializer):
        order = serializer.validated_data["order"]

        if (
            self.request.user not in order.participants.all()
            or self.request.user != order.customer
        ):
            raise PermissionDenied(
                "You are not allowed to create order products for this order."
            )

        serializer.save(customer=self.request.user, status=OrderProduct.Status.DRAFT)
