from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model
from account.serializers.user_serializer import UserSerializer


User = get_user_model()


class UserCreateView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
