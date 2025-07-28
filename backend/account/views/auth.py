from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from ..serializers.auth import UserRegisterSerializer


class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer
