# Put SAN Rice online with Render (free)

What gets created:

| Part | Render service | Address |
|---|---|---|
| Website (React) | Static Site `sanrice-website` | https://sanrice-website.onrender.com |
| API + admin (Django) | Web Service `sanrice-api` | https://sanrice-api.onrender.com/admin |
| Database | PostgreSQL `sanrice-db` | (internal) |
| Product photos | Cloudinary | (your Cloudinary account) |

Everything is described in `render.yaml`, so Render sets it all up in one go.

---

## Step 1 – Cloudinary (stores product photos)

1. Sign up free at https://cloudinary.com
2. On the **Dashboard**, find **API Environment variable** and copy it.
   It looks like `cloudinary://123456789012345:AbCdEf...@your-cloud-name`
3. Keep it for Step 3.

## Step 2 – Put the project on GitHub

Easiest with **GitHub Desktop** (https://desktop.github.com):

1. Sign in with your GitHub account.
2. **File → Add local repository** → choose this folder (`sanrice-render`).
   If it says "not a Git repository", click **create a repository** → **Create repository**.
3. Click **Publish repository**, untick **Keep this code private** only if you want it public, then **Publish**.

(Or with Git commands, inside this folder:)
```
git init
git add .
git commit -m "SAN Rice website"
git branch -M main
git remote add origin https://github.com/<your-username>/sanrice.git
git push -u origin main
```

## Step 3 – Create everything on Render

1. Sign up at https://render.com (log in with GitHub).
2. **New → Blueprint** → choose your `sanrice` repository → **Connect**.
3. Render asks for 3 values:
   - `CLOUDINARY_URL` → paste from Step 1
   - `DJANGO_SUPERUSER_USERNAME` → your admin username (e.g. `sanrice`)
   - `DJANGO_SUPERUSER_PASSWORD` → a strong password
4. Click **Apply**. The first deploy takes 5–10 minutes.

## Step 4 – Check it

- Website: open the **sanrice-website** service → its URL.
- Admin: open the **sanrice-api** service URL + `/admin`, log in with the username/password from Step 3.

If Render gave the API a different address than `https://sanrice-api.onrender.com`
(it adds a suffix if the name is taken): open **sanrice-website → Environment**, set
`VITE_API_URL` to `https://<your-api-address>/api`, save, then **Manual Deploy → Deploy latest commit**.

## Good to know (free plan)

- The API **sleeps after 15 minutes** without visitors. The next visit takes ~30–60 s to wake it;
  the website shows products immediately anyway (built-in copy) and switches to live data when the API is awake.
- The free PostgreSQL database has an **expiry date** set by Render – check the database page and upgrade
  or export your data before it expires.
- Products and contact details are loaded automatically on the first deploy only. After that, manage
  everything in the admin; redeploys never overwrite your changes.
- New enquiry emails: add `EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` (Gmail app password)
  under **sanrice-api → Environment**.

## Updating the site later

Change the code, then push to GitHub (GitHub Desktop: **Commit** → **Push origin**).
Render redeploys both services automatically.
