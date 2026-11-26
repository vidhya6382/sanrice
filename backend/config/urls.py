from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve
from rest_framework.routers import DefaultRouter

from core.views import health, site_settings
from enquiries.views import EnquiryCreateView
from products.views import BrandViewSet, ProductViewSet

router = DefaultRouter()
router.register("brands", BrandViewSet, basename="brand")
router.register("products", ProductViewSet, basename="product")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/enquiries/", EnquiryCreateView.as_view(), name="enquiry-create"),
    path("api/settings/", site_settings, name="site-settings"),
    path("api/health/", health, name="health"),
]

# Product photos: served by Django unless they are stored on Cloudinary.
if not settings.CLOUDINARY_URL:
    urlpatterns += [re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT})]
