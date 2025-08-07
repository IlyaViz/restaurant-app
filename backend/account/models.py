from django.db import models
from django.contrib.auth.models import AbstractUser
from restaurant.models import Restaurant
from common.models import ProjectBaseModel


class User(ProjectBaseModel, AbstractUser):
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

    email = models.EmailField(unique=True, blank=False, null=False)

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


class KitchenStaff(ProjectBaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
