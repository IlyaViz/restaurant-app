from rest_framework.routers import DefaultRouter
from restaurant.views.restaurant_viewset import RestaurantViewSet
from restaurant.views.table_viewset import TableViewSet

router = DefaultRouter()
router.register("", RestaurantViewSet)
router.register("table", TableViewSet)

urlpatterns = router.urls
