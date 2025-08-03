from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from order.serializers.order_serializer import OrderSerializer
from order.models import Order
from order.permissions.order_list_permission import CanListOrder
from order.permissions.order_destroy_permission import CanDestroyOrder
from order.permissions.general_permission import IsOrderOwner
from order.permissions.order_update_permission import CanUpdateOrder


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action == "list":
            return [IsAuthenticated(), CanListOrder()]

        if self.action == "destroy":
            return [IsAuthenticated(), CanDestroyOrder()]

        if self.action in ["update", "partial_update"]:
            return [IsAuthenticated(), CanUpdateOrder()]

        return [IsAuthenticated(), IsOrderOwner()]

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    @action(detail=True, methods=["patch"], url_path="finish-order")
    def finish_order(self, request, pk=None):
        order = self.get_object()

        order.finished_at = timezone.now()
        order.save()

        serializer = self.get_serializer(order)

        return Response(serializer.data)
