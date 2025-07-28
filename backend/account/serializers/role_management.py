from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["role"]
        extra_kwargs = {"role": {"required": True}}

    def validate_role(self, value):
        requested_user_role = self.context["request"].user.role
        target_user_role = self.instance.role

        role_hierarchy = ["restaurant_owner", "manager", "kitchen_staff", "customer"]

        if role_hierarchy.index(requested_user_role) >= role_hierarchy.index(
            target_user_role
        ):
            raise serializers.ValidationError(
                "You do not have permission to change this user's role."
            )

        if role_hierarchy.index(value) < role_hierarchy.index(requested_user_role):
            raise serializers.ValidationError(
                "You cannot assign a role higher than your own."
            )

        return value
