from rest_framework.routers import DefaultRouter
from order.views.order_product_viewset import OrderProductViewSet
#from order.views.order_viewset import OrderViewSet


router = DefaultRouter()
#router.register("", OrderViewSet, basename="order")
router.register("order-product", OrderProductViewSet, basename="order-product")
urlpatterns = router.urls
