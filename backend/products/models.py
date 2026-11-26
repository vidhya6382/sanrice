from django.db import models
from django.utils.text import slugify


class Brand(models.Model):
    """SAN Pannaiyar, SAN Market Raja, Ali Baba, SAN Rice."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=110, unique=True, blank=True)
    logo = models.ImageField(upload_to="brands/", blank=True)
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers show first.")

    class Meta:
        ordering = ["order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT, related_name="products")
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=160, unique=True, blank=True)
    weight = models.CharField(max_length=20, help_text='Pack size, e.g. "26 kg"')
    description = models.TextField()
    image = models.ImageField(upload_to="products/", help_text="Bag photo, transparent PNG/WebP works best.")
    is_featured = models.BooleanField(default=True, help_text="Show on the Home page.")
    is_active = models.BooleanField(default=True, help_text="Untick to hide from the website.")
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers show first.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.brand} · {self.weight})"


class ProductFeature(models.Model):
    """The bullet points shown on each product card."""

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="features")
    text = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text
