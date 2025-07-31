from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["role"]
        extra_kwargs = {"role": {"required": True}}

    def validate_role(self, value):
        requested_user = self.context["request"].user
        target_user = self.instance

        if requested_user.level <= target_user.level:
            raise serializers.ValidationError(
                "You do not have permission to change this user's role."
            )

        if User.get_role_level(value) > requested_user.level:
            raise serializers.ValidationError(
                "You cannot assign a role that is equal to or higher than your own."
            )

        return value
