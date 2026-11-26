import csv

from django.contrib import admin
from django.http import HttpResponse
from django.utils import timezone
from django.utils.html import format_html

from .models import Enquiry

STATUS_COLOURS = {
    Enquiry.Status.NEW: "#b3261e",
    Enquiry.Status.CONTACTED: "#b26a00",
    Enquiry.Status.CONVERTED: "#1b7f3b",
    Enquiry.Status.CLOSED: "#666666",
}


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ("created_at", "name", "phone_link", "email", "product", "quantity", "status_badge", "status")
    list_display_links = ("created_at", "name")
    list_editable = ("status",)
    list_filter = ("status", "product", "created_at")
    search_fields = ("name", "phone", "email", "message")
    # No date_hierarchy: it needs MySQL time-zone tables, which XAMPP on Windows doesn't include.
    # Use the "By created at" filter on the right instead.
    list_per_page = 50
    actions = ["mark_contacted", "mark_converted", "export_csv"]

    readonly_fields = ("created_at", "updated_at", "ip_address", "whatsapp_link")
    fieldsets = (
        ("Customer", {"fields": ("name", "phone", "whatsapp_link", "email")}),
        ("Enquiry", {"fields": ("product", "quantity", "message")}),
        ("Follow-up", {"fields": ("status", "notes")}),
        ("Info", {"fields": ("created_at", "updated_at", "ip_address"), "classes": ("collapse",)}),
    )

    # Model validators (mobile, name, quantity, message length) also run here,
    # so data typed in the admin is checked exactly like the website form.

    @admin.display(description="Mobile", ordering="phone")
    def phone_link(self, obj):
        return format_html('<a href="tel:{}">{}</a>', obj.phone.replace(" ", ""), obj.phone)

    @admin.display(description="WhatsApp")
    def whatsapp_link(self, obj):
        if not obj.pk:
            return "-"
        number = "".join(c for c in obj.phone if c.isdigit())
        return format_html('<a href="https://wa.me/{}" target="_blank">Open chat on WhatsApp</a>', number)

    @admin.display(description="", ordering="status")
    def status_badge(self, obj):
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 10px;border-radius:10px;font-size:11px">{}</span>',
            STATUS_COLOURS.get(obj.status, "#666"),
            obj.get_status_display(),
        )

    @admin.action(description="Mark selected as Contacted")
    def mark_contacted(self, request, queryset):
        updated = queryset.update(status=Enquiry.Status.CONTACTED)
        self.message_user(request, f"{updated} enquiries marked as contacted.")

    @admin.action(description="Mark selected as Order placed")
    def mark_converted(self, request, queryset):
        updated = queryset.update(status=Enquiry.Status.CONVERTED)
        self.message_user(request, f"{updated} enquiries marked as order placed.")

    @admin.action(description="Download selected as Excel/CSV")
    def export_csv(self, request, queryset):
        response = HttpResponse(content_type="text/csv; charset=utf-8")
        stamp = timezone.localtime().strftime("%Y-%m-%d")
        response["Content-Disposition"] = f'attachment; filename="san-rice-enquiries-{stamp}.csv"'
        response.write("﻿")  # so Excel shows Tamil/₹ correctly
        writer = csv.writer(response)
        writer.writerow(["Date", "Name", "Mobile", "Email", "Product", "Quantity (bags)", "Message", "Status", "Notes"])
        for e in queryset.select_related("product"):
            writer.writerow([
                timezone.localtime(e.created_at).strftime("%d-%m-%Y %I:%M %p"),
                e.name, e.phone, e.email, e.product or "", e.quantity or "", e.message,
                e.get_status_display(), e.notes,
            ])
        return response
