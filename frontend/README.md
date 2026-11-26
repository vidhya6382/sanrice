# SAN Rice – Frontend (React + Vite)

React website built from the **SAN Design 3 – Classic Red** design.
Pages: Home, About, Products (with brand filter), Product detail, Contact, Privacy Policy, Terms.

## Run it

```bash
cd frontend
npm install
cp .env.example .env        # Windows: copy .env.example .env
npm run dev                 # http://localhost:5173
```

The site works **even before the Django backend is running**: when the API is unreachable,
products, brands and contact details come from `src/data/fallback.js`.
Once Django runs on `http://127.0.0.1:8000`, the Vite dev server forwards `/api` and `/media`
calls to it automatically (see `vite.config.js`), and live data from MySQL replaces the fallback.

## Build for production

```bash
npm run build               # output in dist/
```

Set `VITE_API_URL` in `.env` to your live API (e.g. `https://api.sanrice.in/api`) before building,
or serve `dist/` and Django from the same domain and keep it as `/api`.

## Folder structure

```
src/
├── api/client.js          # axios calls + automatic fallback
├── assets/images/         # logo, product bags (transparent), banners
├── components/            # Navbar, Footer, PageHero, ProductCard, ProductGrid,
│                          # EnquiryModal, WhatsAppButton, Layout, Icons
├── context/SiteContext.jsx# shared brands, contact settings, enquiry popup
├── data/fallback.js       # offline copy of products / brands / settings
├── hooks/useApi.js        # tiny data-loading hook
├── pages/                 # Home, About, Products, ProductDetail, Contact, Legal, NotFound
├── styles/global.css      # Classic Red theme (colours/fonts in :root)
├── App.jsx                # routes
└── main.jsx
```

## API the frontend expects (Django REST Framework)

| Method | URL | Response / body |
|---|---|---|
| GET | `/api/products/?featured=true&brand=<slug>` | `[{id, name, slug, brand:{id,name,slug}, weight, description, image, features:[str], is_featured}]` |
| GET | `/api/products/<slug>/` | one product (same shape) |
| GET | `/api/brands/` | `[{id, name, slug}]` |
| GET | `/api/settings/` | `{phone, whatsapp, email, hours, instagram, instagram_handle, facebook, youtube, address, map_url, map_embed_url}` |
| POST | `/api/enquiries/` | body `{product (id or null), name, phone, email, quantity, message}` |

`features` is a list of strings and `image` is an absolute URL to the uploaded image.

## Customising

- **Colours and fonts:** edit the variables at the top of `src/styles/global.css`.
- **Text on Home / About:** edit `src/pages/Home.jsx` and `src/pages/About.jsx`.
- **Products:** manage them in the Django admin (the fallback file is only a backup).
- **WhatsApp number:** set it in Django settings (the `whatsapp` field) or `VITE_WHATSAPP_NUMBER`.
