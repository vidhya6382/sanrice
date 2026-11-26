from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import SiteSettings
from .serializers import SiteSettingsSerializer


@api_view(["GET"])
def site_settings(request):
    """GET /api/settings/"""
    return Response(SiteSettingsSerializer(SiteSettings.load()).data)


@api_view(["GET"])
def health(request):
    """GET /api/health/ – quick check that the API is up."""
    return Response({"status": "ok"})
