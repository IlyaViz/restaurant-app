from rest_framework.routers import DefaultRouter
from restaurant.views.restaurant_management import RestaurantViewSet


router = DefaultRouter()
router.register("", RestaurantViewSet, basename="restaurant")

urlpatterns = router.urls
