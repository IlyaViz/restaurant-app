from rest_framework import serializers
from menu.models import Product
from backend.settings import DEBUG


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "image",
            "category",
        ]

    def get_image(self, obj):
        if obj.image:
            url = obj.image.url

            if DEBUG and "request" in self.context:
                return self.context["request"].build_absolute_uri(url)

            return url

        return None
