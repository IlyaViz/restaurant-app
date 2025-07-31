from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from account.views.user_role_update_view import UserRoleUpdateView
from account.views.user_list_view import (
    CustomerListView,
    KitchenStaffListView,
    ManagerListView,
)
from account.views.user_create_view import RegisterView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="account-register"),
    path("obtain-token/", obtain_auth_token, name="account-obtain-token"),
    path("customer/", CustomerListView.as_view(), name="account-customer-list"),
    path(
        "kitchen-staff/",
        KitchenStaffListView.as_view(),
        name="account-kitchen-staff-list",
    ),
    path("manager/", ManagerListView.as_view(), name="account-manager-list"),
    path(
        "update-role/<int:pk>/",
        UserRoleUpdateView.as_view(),
        name="account-update-role",
    ),
]
