from django.db import models


class Restaurant(models.Model):
    name = models.CharField(max_length=100, unique=True)
    location = models.CharField(max_length=100, unique=True)
    contact_number = models.CharField(max_length=15, unique=True)
    workday_open_hour = models.TimeField(blank=True, null=True)
    workday_close_hour = models.TimeField(blank=True, null=True)
    weekend_open_hour = models.TimeField(blank=True, null=True)
    weekend_close_hour = models.TimeField(blank=True, null=True)
