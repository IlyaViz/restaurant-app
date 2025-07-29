from rest_framework.generics import CreateAPIView
from account.serializers.auth import UserRegisterSerializer


class RegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer
