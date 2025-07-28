from django.urls import path
from .views.auth import RegisterView
from .views.role_management import UpdateUserRoleView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path("register/", RegisterView.as_view(), name="account-register"),
    path("obtain-token/", obtain_auth_token, name="account-obtain-token"),
    path(
        "update-role/<int:pk>/",
        UpdateUserRoleView.as_view(),
        name="account-update-role",
    ),
]
