from rest_framework.generics import UpdateAPIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from account.serializers.user_role_serializer import UserRoleSerializer


User = get_user_model()


class UserRoleUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserRoleSerializer
    queryset = User.objects.all()
