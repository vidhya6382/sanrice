from django.contrib import admin
from django.utils.html import format_html

from .models import Brand, Product, ProductFeature


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order", "product_count")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("name",)}

    @admin.display(description="Products")
    def product_count(self, obj):
        return obj.products.count()


class ProductFeatureInline(admin.TabularInline):
    model = ProductFeature
    extra = 1
    fields = ("text", "order")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("thumb", "name", "brand", "weight", "is_featured", "is_active", "order")
    list_display_links = ("thumb", "name")
    list_editable = ("is_featured", "is_active", "order")
    list_filter = ("brand", "is_featured", "is_active")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductFeatureInline]
    fields = ("brand", "name", "slug", "weight", "description", "image", "preview", "is_featured", "is_active", "order")
    readonly_fields = ("preview",)

    @admin.display(description="")
    def thumb(self, obj):
        return format_html('<img src="{}" style="height:48px">', obj.image.url) if obj.image else ""

    @admin.display(description="Preview")
    def preview(self, obj):
        return format_html('<img src="{}" style="max-height:220px">', obj.image.url) if obj.image else "—"
