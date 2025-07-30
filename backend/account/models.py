from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Role(models.TextChoices):
        CUSTOMER = "customer", "Customer"
        KITCHEN_STAFF = "kitchen_staff", "Kitchen Staff"
        MANAGER = "manager", "Manager"
        RESTAURANT_OWNER = "owner", "Owner"

    ROLES_HIERARCHY = [
        Role.CUSTOMER,
        Role.KITCHEN_STAFF,
        Role.MANAGER,
        Role.RESTAURANT_OWNER,
    ]

    role = models.CharField(
        choices=Role.choices,
        default=Role.CUSTOMER,
    )

    @classmethod
    def get_role_level(cls, role):
        return cls.ROLES_HIERARCHY.index(role)

    @property
    def level(self):
        return self.get_role_level(self.role)
