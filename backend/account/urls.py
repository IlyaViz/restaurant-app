from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from account.views.kitchen_staff_viewset import KitchenStaffViewSet
from account.views.manager_viewset import ManagerViewSet
from account.views.customer_viewset import CustomerViewSet


router = DefaultRouter()
router.register(r"kitchen-staff", KitchenStaffViewSet)
router.register(r"customer", CustomerViewSet)
router.register(r"manager", ManagerViewSet)

urlpatterns = [
    path("obtain-token/", obtain_auth_token, name="account-obtain-token"),
] + router.urls
