from django.db import models
from django.core.exceptions import ValidationError
from django.db.models import Manager


class ActiveManager(Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class SoftlyDeletableModel(models.Model):
    is_active = models.BooleanField(default=True)

    objects = models.Manager()
    active_objects = ActiveManager()

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.full_clean()

        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.is_active = False

        self.save()

    def clean(self, *args, **kwargs):
        unique_fields = getattr(self, "unique_active_fields", [])

        if unique_fields and self.is_active:
            for field in unique_fields:
                if (
                    self.__class__.active_objects.filter(
                        **{field: getattr(self, field)}
                    )
                    .exclude(pk=self.pk)
                    .exists()
                ):
                    raise ValidationError(
                        f"An active instance with this {field} already exists."
                    )

        return super().clean(*args, **kwargs)
