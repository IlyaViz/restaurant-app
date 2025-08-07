from rest_framework import serializers
from rest_framework.serializers import ValidationError
from django.contrib.auth import get_user_model
from account.models import KitchenStaff
from account.serializers.kitchen_staff_serializer import KitchenStaffExtraSerializer


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    role_info = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "role", "role_info"]
        extra_kwargs = {"password": {"write_only": True}}

    def get_role_info(self, obj):
        if obj.role == User.Role.KITCHEN_STAFF:
            kitchen_staff = KitchenStaff.objects.filter(user=obj).first()

            if kitchen_staff:
                return KitchenStaffExtraSerializer(kitchen_staff).data

        return None

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user

    def validate_can_not_change_credentials(self, data):
        unchangable_fields = ["username", "email", "password"]

        for field in unchangable_fields:
            if field in data:
                raise ValidationError(f"{field} cannot be changed.")

    def validate_can_change_role(self, data):
        if "role" not in data:
            return

        acting_user = self.context["request"].user
        target_user = self.instance

        if acting_user.level <= target_user.level:
            raise ValidationError("You do not have permission to change this role.")

        if User.get_role_level(data["role"]) > acting_user.level:
            raise ValidationError(
                "You cannot assign a role with higher level than your own."
            )

    def validate(self, data):
        if self.context["request"].method in ["PUT", "PATCH"]:
            self.validate_can_not_change_credentials(data)
            self.validate_can_change_role(data)

        return data
