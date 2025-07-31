from rest_framework.routers import DefaultRouter
from menu.views.category_viewset import CategoryViewSet
from menu.views.product_viewset import ProductViewSet


router = DefaultRouter()
router.register("category", CategoryViewSet, basename="category")
router.register("product", ProductViewSet, basename="product")

urlpatterns = router.urls
