#!/usr/bin/env bash
# Render runs this on every deploy.
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate --no-input
# Load the products/brands only the first time (never overwrites your admin edits).
python manage.py seed_data --if-empty
# Copy product photos on every deploy (Render clears media/ on each deploy).
mkdir -p media/products
cp -r seed_images/. media/products/
# Create the admin login from the DJANGO_SUPERUSER_* settings (skipped if it exists).
python manage.py ensure_admin
