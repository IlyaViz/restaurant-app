from django.urls import path
from rest_framework.routers import DefaultRouter
from account.views.kitchen_staff_viewset import KitchenStaffViewSet
from account.views.manager_viewset import ManagerViewSet
from account.views.customer_viewset import CustomerViewSet
from account.views.custom_obtain_auth_token_view import CustomObtainAuthToken
from account.views.user_create_view import UserCreateView
from account.views.kitchen_staff_work_viewset import KitchenStaffProfileViewSet


router = DefaultRouter()
router.register(r"kitchen-staff", KitchenStaffViewSet)
router.register(r"customer", CustomerViewSet)
router.register(r"kitchen-staff-work", KitchenStaffProfileViewSet)
router.register(r"manager", ManagerViewSet)

urlpatterns = [
    path("obtain-token/", CustomObtainAuthToken.as_view(), name="account-obtain-token"),
    path("register/", UserCreateView.as_view(), name="account-register"),
] + router.urls
