from rest_framework.routers import DefaultRouter
from menu.models import Category, Product
from menu.views.menu_management import CategoryViewSet, ProductViewSet


router = DefaultRouter()
router.register("category", CategoryViewSet, basename="category")
router.register("product", ProductViewSet, basename="product")

urlpatterns = router.urls
