from rest_framework import serializers

from .models import Brand, Product


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name", "slug"]


class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    # The React cards expect a plain list of strings.
    features = serializers.SlugRelatedField(many=True, read_only=True, slug_field="text")

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "brand", "weight", "description", "image", "features", "is_featured"]
