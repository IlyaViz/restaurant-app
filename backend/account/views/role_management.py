from rest_framework.generics import UpdateAPIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from ..serializers.role_management import UserRoleSerializer


User = get_user_model()


class UpdateUserRoleView(UpdateAPIView):
    serializer_class = UserRoleSerializer
    queryset = User.objects.all()
