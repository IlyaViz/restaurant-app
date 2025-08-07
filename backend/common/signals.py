from django.dispatch import receiver
from django.db.models.signals import pre_save
from common.models import ProjectBaseModel


@receiver(pre_save)
def pre_save_handler(sender, instance, *args, **kwargs):
    if issubclass(sender, ProjectBaseModel):
        instance.full_clean()
