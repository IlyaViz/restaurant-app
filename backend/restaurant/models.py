from django.db import models
from django.core.exceptions import ValidationError


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, unique=True)
    contact_number = models.CharField(max_length=15, unique=True)
    workday_open_hour = models.TimeField(blank=True, null=True)
    workday_close_hour = models.TimeField(blank=True, null=True)
    weekend_open_hour = models.TimeField(blank=True, null=True)
    weekend_close_hour = models.TimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def delete(self, **kwargs):
        self.is_active = False

        self.save()

    def clean(self, **kwargs):
        if (
            self.is_active
            and Restaurant.objects.filter(name=self.name, is_active=True)
            .exclude(pk=self.pk)
            .exists()
        ):
            raise ValidationError("An active restaurant with this name already exists.")


class Table(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    number = models.PositiveSmallIntegerField()
