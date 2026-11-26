import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics
from rest_framework.throttling import ScopedRateThrottle

from .serializers import EnquirySerializer

log = logging.getLogger(__name__)


def client_ip(request):
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    return forwarded.split(",")[0].strip() if forwarded else request.META.get("REMOTE_ADDR")


class EnquiryCreateView(generics.CreateAPIView):
    """POST /api/enquiries/ – the public can create, but never list, enquiries."""

    serializer_class = EnquirySerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "enquiries"

    def perform_create(self, serializer):
        enquiry = serializer.save(ip_address=client_ip(self.request))
        product = enquiry.product
        body = "\n".join(
            [
                "New enquiry from the SAN Rice website",
                "",
                f"Name:     {enquiry.name}",
                f"Mobile:   {enquiry.phone}",
                f"Email:    {enquiry.email or '-'}",
                f"Product:  {product.name + ' (' + product.weight + ')' if product else '-'}",
                f"Quantity: {str(enquiry.quantity) + ' bags' if enquiry.quantity else '-'}",
                "",
                enquiry.message or "",
                "",
                "Manage it in the admin panel → Enquiries.",
            ]
        )
        try:
            send_mail(
                subject=f"New enquiry: {enquiry.name} ({enquiry.phone})",
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=settings.ENQUIRY_NOTIFY_EMAILS,
            )
        except Exception:  # never lose an enquiry because email failed
            log.exception("Could not send enquiry email")
