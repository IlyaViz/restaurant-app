from django.db import models
from django.core.exceptions import ValidationError


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)

    def delete(self, **kwargs):
        self.is_active = False

        self.save()

    def clean(self, **kwargs):
        if (
            self.is_active
            and Product.objects.filter(name=self.name, is_active=True)
            .exclude(pk=self.pk)
            .exists()
        ):
            raise ValidationError("An active product with this name already exists.")
