from rest_framework import viewsets

from .models import Brand, Product
from .serializers import BrandSerializer, ProductSerializer


class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/brands/"""

    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = "slug"


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/products/                 all active products
    GET /api/products/?featured=true   Home page products
    GET /api/products/?brand=<slug>    one brand
    GET /api/products/<slug>/          one product
    """

    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).select_related("brand").prefetch_related("features")
        brand = self.request.query_params.get("brand")
        if brand:
            qs = qs.filter(brand__slug=brand)
        if self.request.query_params.get("featured") in ("1", "true", "yes"):
            qs = qs.filter(is_featured=True)
        return qs
