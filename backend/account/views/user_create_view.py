from rest_framework.generics import CreateAPIView
from account.serializers.user_register_serializer import UserRegisterSerializer


class RegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer
