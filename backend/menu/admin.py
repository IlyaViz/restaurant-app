from django.contrib import admin
from menu.models import Category, Product


admin.site.register(
    [
        Category,
        Product,
    ]
)
