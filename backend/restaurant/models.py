from django.db import models
from django.core.exceptions import ValidationError
from common.models import SoftlyDeletableModel


class Restaurant(SoftlyDeletableModel):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    workday_open_hour = models.TimeField(blank=True, null=True)
    workday_close_hour = models.TimeField(blank=True, null=True)
    weekend_open_hour = models.TimeField(blank=True, null=True)
    weekend_close_hour = models.TimeField(blank=True, null=True)

    unique_active_fields = ["name", "location", "contact_number"]


class Table(SoftlyDeletableModel):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    number = models.PositiveSmallIntegerField()

    def clean(self, *args, **kwargs):
        if (
            self.is_active
            and Table.active_objects.filter(
                restaurant=self.restaurant, number=self.number
            )
            .exclude(pk=self.pk)
            .exists()
        ):
            raise ValidationError(
                "An active table with this number already exists for this restaurant."
            )

        return super().clean(*args, **kwargs)
