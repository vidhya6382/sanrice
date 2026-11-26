from django.core.validators import MaxLengthValidator, MaxValueValidator, MinValueValidator
from django.db import models

from .validators import validate_indian_mobile, validate_person_name


class Enquiry(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        CONVERTED = "converted", "Order placed"
        CLOSED = "closed", "Closed / not interested"

    product = models.ForeignKey(
        "products.Product", null=True, blank=True, on_delete=models.SET_NULL, related_name="enquiries"
    )
    name = models.CharField(max_length=100, validators=[validate_person_name])
    phone = models.CharField("mobile", max_length=20, validators=[validate_indian_mobile])
    email = models.EmailField(blank=True)
    quantity = models.PositiveIntegerField(
        "quantity (bags)",
        null=True,
        blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(100000)],
    )
    message = models.TextField(blank=True, validators=[MaxLengthValidator(1000)])

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    is_contacted = models.BooleanField(default=False, editable=False)  # kept for older data; use status
    notes = models.TextField(blank=True, help_text="Internal notes (not shown to the customer).")
    ip_address = models.GenericIPAddressField(null=True, blank=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "enquiries"
        indexes = [models.Index(fields=["phone", "created_at"])]

    def clean(self):
        # Store every number in one format, whether typed on the website or in the admin.
        from django.core.exceptions import ValidationError

        from .validators import normalize_indian_mobile

        try:
            self.phone = normalize_indian_mobile(self.phone)
        except ValidationError:
            pass  # the field validator already reports the error
        self.name = " ".join((self.name or "").split())
        self.email = (self.email or "").strip().lower()

    def __str__(self):
        return f"{self.name} – {self.phone}"
