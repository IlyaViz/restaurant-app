from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from account.permissions.general_permission import IsOwnerRole
from restaurant.models import Table
from restaurant.serializers.table_serializer import TableSerializer


class TableViewSet(ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsOwnerRole()]

        return super().get_permissions()
