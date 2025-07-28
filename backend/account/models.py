from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USER_ROLES = [
        ("customer", "Customer"),
        ("kitchen_staff", "Kitchen Staff"),
        ("manager", "Manager"),
        ("restaurant_owner", "Restaurant Owner"),
    ]
    USER_ROLES_HIERARCHY = [tuple[0] for tuple in USER_ROLES]

    role = models.CharField(
        max_length=50, choices=USER_ROLES, null=False, blank=False, default="customer"
    )

    @classmethod
    def get_role_level(cls, role):
        return cls.USER_ROLES_HIERARCHY.index(role)

    @property
    def level(self):
        return self.get_role_level(self.role)
