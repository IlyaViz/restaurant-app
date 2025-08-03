from rest_framework.routers import DefaultRouter
from order.views.order_product_viewset import OrderProductViewSet
from order.views.order_viewset import OrderViewSet


router = DefaultRouter()
router.register("order", OrderViewSet)
router.register("order-product", OrderProductViewSet)
urlpatterns = router.urls
