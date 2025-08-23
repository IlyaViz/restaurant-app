from rest_framework import serializers
from menu.models import Product
from backend.settings import DEBUG


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "image",
            "image_url",
            "category",
        ]
        extra_kwargs = {"image": {"write_only": True}}

    def get_image_url(self, obj):
        if obj.image:
            url = obj.image.url
            
            if DEBUG and "request" in self.context:
                return self.context["request"].build_absolute_uri(url)

            return url

        return None
