"""
Loads the brands, products and contact details from the SAN Rice design.

    python manage.py seed_data

Safe to run more than once: existing items are updated, not duplicated.
"""
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import transaction

from core.models import SiteSettings
from products.models import Brand, Product, ProductFeature

SEED_DIR = Path(settings.BASE_DIR) / "seed_images"

BRANDS = [
    ("SAN Pannaiyar", "san-pannaiyar"),
    ("SAN Market Raja", "san-market-raja"),
    ("Ali Baba", "ali-baba"),
    ("SAN Rice", "san-rice"),
]

PRODUCTS = [
    {
        "slug": "premium-netkichadi", "name": "Premium Netkichadi", "brand": "san-pannaiyar", "weight": "26 kg",
        "description": "Premium rice that cooks soft and fluffy, perfect for ghee rice and festive meals.",
        "features": ["Superior grain quality", "Rich natural aroma", "Long, non-sticky grain"],
    },
    {
        "slug": "soft-milky-white", "name": "Soft & Milky White", "brand": "san-pannaiyar", "weight": "26 kg",
        "description": "Soft, milky white rice for everyday South Indian meals.",
        "features": ["Soft texture", "Ideal for daily meals", "Naturally gluten-free"],
    },
    {
        "slug": "idly-rice", "name": "Idly Rice", "brand": "san-rice", "weight": "26 kg",
        "description": "Makes soft, spongy idlis and crisp, golden dosas every time.",
        "features": ["High water absorbency", "Soft idlis, crisp dosas", "Easy to digest"],
    },
    {
        "slug": "jeera-rice", "name": "Jeera Rice", "brand": "san-market-raja", "weight": "26 kg",
        "description": "Fragrant, long-grain rice for pulao, biryani and jeera rice.",
        "features": ["Fragrant long grain", "Perfect for pulao", "Export quality"],
    },
    {
        "slug": "nei-kitchadi", "name": "Nei Kitchadi", "brand": "ali-baba", "weight": "10 kg",
        "description": "Aromatic Nei Kitchadi rice, a traditional favourite for ghee rice.",
        "features": ["Aromatic grain", "Traditional taste", "Handy 10 kg pack"],
    },
]


class Command(BaseCommand):
    help = "Load SAN Rice brands, products and contact details."

    def add_arguments(self, parser):
        parser.add_argument(
            "--if-empty",
            action="store_true",
            help="Only load data when there are no products yet (used on every Render deploy).",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        if options["if_empty"] and Product.objects.exists():
            self.stdout.write("Products already exist - nothing to load.")
            SiteSettings.load()
            return
        brands = {}
        for order, (name, slug) in enumerate(BRANDS):
            brands[slug], _ = Brand.objects.update_or_create(slug=slug, defaults={"name": name, "order": order})
        self.stdout.write(f"Brands: {len(brands)}")

        for order, data in enumerate(PRODUCTS):
            product, created = Product.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "name": data["name"],
                    "brand": brands[data["brand"]],
                    "weight": data["weight"],
                    "description": data["description"],
                    "order": order,
                    "is_featured": True,
                    "is_active": True,
                },
            )
            if not product.image:
                image_path = SEED_DIR / f"{data['slug']}.webp"
                with image_path.open("rb") as fh:
                    product.image.save(image_path.name, File(fh), save=True)

            product.features.all().delete()
            ProductFeature.objects.bulk_create(
                ProductFeature(product=product, text=text, order=i) for i, text in enumerate(data["features"])
            )
            self.stdout.write(f"  {'Added' if created else 'Updated'}: {product}")

        # Contact details – only set the first time, so admin edits are kept.
        SiteSettings.objects.get_or_create(
            pk=1,
            defaults={
                "instagram": "https://www.instagram.com/san_rice_ambai/",
                "facebook": "https://www.facebook.com/share/18hiDct7Zq/",
            },
        )
        self.stdout.write(self.style.SUCCESS("Done. Products, brands and contact details are loaded."))
