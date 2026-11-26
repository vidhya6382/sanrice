from django.db import models


class SiteSettings(models.Model):
    """Contact details shown on the Contact page, footer and WhatsApp button (one row only)."""

    phone = models.CharField(max_length=20, default="+91 70105 57589")
    whatsapp = models.CharField(max_length=15, default="917010557589", help_text="Country code + number, digits only.")
    email = models.EmailField(default="sanrice.ambai@gmail.com")
    hours = models.CharField(max_length=100, default="Open daily, 8:30 AM – 9:00 PM")
    instagram_handle = models.CharField(max_length=50, default="@san_rice_ambai")
    instagram = models.URLField(default="https://www.instagram.com/san_rice_ambai/")
    facebook = models.URLField(blank=True, default="https://www.facebook.com/")
    youtube = models.URLField(blank=True, default="https://www.youtube.com/")
    address = models.TextField(default="San Rice,\n6/51, Main Road,\nPallakkal Pothukudi,\nTamil Nadu 627413")
    map_url = models.URLField(
        max_length=500,
        default="https://www.google.com/maps/search/?api=1&query=San+Rice+Pallakkal+Pothukudi+Tamil+Nadu+627413",
    )
    map_embed_url = models.URLField(
        max_length=500,
        default="https://www.google.com/maps?q=San+Rice,+Pallakkal+Pothukudi,+Tamil+Nadu+627413&output=embed",
    )

    class Meta:
        verbose_name = verbose_name_plural = "site settings"

    def save(self, *args, **kwargs):
        self.pk = 1  # always a single row
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Contact & social details"
