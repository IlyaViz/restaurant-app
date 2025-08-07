from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from account.views.kitchen_staff_viewset import KitchenStaffViewSet
from account.views.manager_viewset import ManagerViewSet
from account.views.customer_viewset import CustomerViewSet
from account.views.custom_obtain_auth_token_view import CustomObtainAuthToken


router = DefaultRouter()
router.register(r"kitchen-staff", KitchenStaffViewSet)
router.register(r"customer", CustomerViewSet)
router.register(r"manager", ManagerViewSet)

urlpatterns = [
    path("obtain-token/", CustomObtainAuthToken.as_view(), name="account-obtain-token"),
] + router.urls
