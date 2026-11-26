"""Validation rules shared by the API and the admin panel."""
import re

from django.core.exceptions import ValidationError

NAME_RE = re.compile(r"^[A-Za-z஀-௿][A-Za-z஀-௿ .'-]*$")  # English or Tamil letters


def normalize_indian_mobile(value: str) -> str:
    """
    Accepts 9876543210, 98765 43210, +91 98765 43210, 091-9876543210 …
    Returns the standard form "+91 98765 43210".
    """
    digits = re.sub(r"\D", "", value or "")
    if len(digits) == 12 and digits.startswith("91"):
        digits = digits[2:]
    elif len(digits) == 11 and digits.startswith("0"):
        digits = digits[1:]
    if not re.fullmatch(r"[6-9]\d{9}", digits):
        raise ValidationError("Enter a valid 10-digit Indian mobile number (starting with 6, 7, 8 or 9).")
    return f"+91 {digits[:5]} {digits[5:]}"


def validate_indian_mobile(value):
    normalize_indian_mobile(value)


def validate_person_name(value):
    value = (value or "").strip()
    if len(value) < 2:
        raise ValidationError("Name must be at least 2 letters.")
    if not NAME_RE.match(value):
        raise ValidationError("Name can contain only letters, spaces, dots and apostrophes.")
