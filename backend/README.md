# SAN Rice – Backend (Django + Django REST Framework + MySQL)

Serves the API for the React site and gives you an admin panel to manage
products, brands, enquiries and contact details.

## 1. Requirements (Windows)

- **Python 3.11 – 3.13** from python.org (tick "Add Python to PATH" while installing)
- **MySQL 8** (MySQL Installer for Windows, includes MySQL Workbench)

## 2. Create the MySQL database

Open **MySQL Workbench** → connect as `root` → open `setup_mysql.sql` → run it (⚡ button).
This creates database `san_rice` and user `san_user`.

## 3. Install and set up (PowerShell, inside the `backend` folder)

```powershell
cd D:\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Open `.env` and set `DB_PASSWORD` to the password you used in `setup_mysql.sql`.

```powershell
python manage.py migrate
python manage.py seed_data          # loads the 5 rice products, 4 brands, contact details
python manage.py createsuperuser    # your admin login
python manage.py runserver
```

- API: http://127.0.0.1:8000/api/products/
- Admin: http://127.0.0.1:8000/admin/

Keep this terminal open. In a **second** terminal run the frontend (`cd D:\frontend`, `npm run dev`)
and open http://localhost:5173 – the site now shows live data from MySQL.

> If PowerShell says *"running scripts is disabled"* when activating the venv, run once:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` then try again.
>
> Trying it without MySQL? Put `DB_ENGINE=sqlite` in `.env` – everything else is the same.

## 4. Every day after setup

```powershell
cd D:\backend
venv\Scripts\activate
python manage.py runserver
```

## API

| Method | URL | Purpose |
|---|---|---|
| GET | `/api/products/` | all active products (`?featured=true`, `?brand=<slug>`) |
| GET | `/api/products/<slug>/` | one product |
| GET | `/api/brands/` | brands |
| GET | `/api/settings/` | phone, email, hours, socials, address, map |
| POST | `/api/enquiries/` | `{product, name, phone, email, quantity, message}` (limited to 10/hour per visitor) |
| GET | `/api/health/` | `{"status": "ok"}` |

## Admin panel

- **Products** – add/edit products, upload bag images, add feature bullet points, reorder, hide/show, choose what's on Home.
- **Brands** – SAN Pannaiyar, SAN Market Raja, Ali Baba, SAN Rice.
- **Enquiries** – every enquiry from the website; tick *is contacted* after you call back and add notes.
- **Site settings** – phone, WhatsApp number, email, hours, Instagram/Facebook/YouTube links, address, map.

## Email alerts

New enquiries are emailed to `ENQUIRY_NOTIFY_EMAILS`. Until you add SMTP details to `.env`,
the email is printed in the runserver terminal instead. For Gmail: Google Account → Security →
2-Step Verification → **App passwords**, then set:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=sanrice.ambai@gmail.com
EMAIL_HOST_PASSWORD=<16-character app password>
```

## Project structure

```
backend/
├── config/          settings.py (reads .env), urls.py
├── products/        Brand, Product, ProductFeature + API + seed_data command
├── enquiries/       Enquiry + POST API + email alert
├── core/            SiteSettings (contact details) + API
├── seed_images/     product bag images used by seed_data
├── setup_mysql.sql
├── requirements.txt
└── .env.example
```

## Going live (summary)

1. `.env`: `DEBUG=False`, a long random `SECRET_KEY`, your domain in `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`.
2. `python manage.py collectstatic`
3. Run with Gunicorn behind Nginx on a Linux VPS; let Nginx serve `/static/`, `/media/` and the React `dist/` folder, and proxy `/api/` and `/admin/` to Gunicorn.
4. Add HTTPS (Let's Encrypt / Certbot).
