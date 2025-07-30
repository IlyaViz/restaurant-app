from django.contrib import admin
from restaurant.models import Restaurant, Table


admin.site.register(
    [
        Restaurant,
        Table,
    ]
)
