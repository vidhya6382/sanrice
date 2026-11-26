from datetime import timedelta

from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils import timezone
from rest_framework import serializers

from products.models import Product

from .models import Enquiry
from .validators import normalize_indian_mobile, validate_person_name

DUPLICATE_WINDOW = timedelta(minutes=10)


class EnquirySerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.filter(is_active=True),
        required=False,
        allow_null=True,
        error_messages={"does_not_exist": "This product is no longer available."},
    )
    name = serializers.CharField(
        max_length=100,
        error_messages={"blank": "Please enter your name.", "required": "Please enter your name."},
    )
    phone = serializers.CharField(
        max_length=20,
        error_messages={"blank": "Please enter your mobile number.", "required": "Please enter your mobile number."},
    )
    email = serializers.EmailField(
        required=False, allow_blank=True, error_messages={"invalid": "Enter a valid email address."}
    )
    # Accept "" from the form as "not given".
    quantity = serializers.IntegerField(
        required=False,
        allow_null=True,
        min_value=1,
        max_value=100000,
        error_messages={
            "invalid": "Enter the number of bags as a whole number.",
            "min_value": "Quantity must be at least 1 bag.",
            "max_value": "For orders above 100,000 bags please call us.",
        },
    )
    message = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=1000,
        error_messages={"max_length": "Message is too long (maximum 1000 characters)."},
    )

    class Meta:
        model = Enquiry
        fields = ["id", "product", "name", "phone", "email", "quantity", "message", "created_at"]
        read_only_fields = ["id", "created_at"]

    def to_internal_value(self, data):
        if hasattr(data, "copy"):
            data = data.copy()
            if data.get("quantity") in ("", None):
                data["quantity"] = None
        return super().to_internal_value(data)

    # --- field rules (same rules the admin uses) ---
    def validate_name(self, value):
        value = " ".join(value.split())
        try:
            validate_person_name(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value.title()

    def validate_phone(self, value):
        try:
            return normalize_indian_mobile(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)

    def validate_email(self, value):
        return value.strip().lower()

    def validate_message(self, value):
        return value.strip()

    # --- whole-form rules ---
    def validate(self, attrs):
        recent = Enquiry.objects.filter(
            phone=attrs["phone"],
            product=attrs.get("product"),
            created_at__gte=timezone.now() - DUPLICATE_WINDOW,
        )
        if recent.exists():
            raise serializers.ValidationError(
                "We already received your enquiry a few minutes ago. We'll call you back shortly."
            )
        return attrs
