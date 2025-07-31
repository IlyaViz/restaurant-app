from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.serializers import (
    as_serializer_error,
    ValidationError as DRFValidationError,
)
from rest_framework.views import exception_handler as drf_exception_handler


def exception_handler(exception, context):
    if isinstance(exception, DjangoValidationError):
        exception = DRFValidationError(as_serializer_error(exception))

    return drf_exception_handler(exception, context)
