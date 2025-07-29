from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views.auth import RegisterView
from .views.role_management import UpdateUserRoleView
from .views.list import CustomerListView, KitchenStaffListView, ManagerListView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="account-register"),
    path("obtain-token/", obtain_auth_token, name="account-obtain-token"),

    path("customers/", CustomerListView.as_view(), name="account-customer-list"),
    path("kitchen-staff/", KitchenStaffListView.as_view(), name="account-kitchen-staff-list"),
    path("managers/", ManagerListView.as_view(), name="account-manager-list"),
    
    path(
        "update-role/<int:pk>/",
        UpdateUserRoleView.as_view(),
        name="account-update-role",
    ),
]
