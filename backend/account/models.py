from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USER_ROLES = [
        ("customer", "Customer"),
        ("restaurant_owner", "Restaurant Owner"),
        ("kitchen_staff", "Kitchen Staff"),
        ("manager", "Manager"),
    ]

    role = models.CharField(
        max_length=50, choices=USER_ROLES, null=False, blank=False, default="customer"
    )
