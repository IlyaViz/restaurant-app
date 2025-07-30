from rest_framework.routers import DefaultRouter
from restaurant.views.restaurant_management import RestaurantViewSet, TableViewSet


router = DefaultRouter()
router.register("", RestaurantViewSet)
router.register("table", TableViewSet)

urlpatterns = router.urls
