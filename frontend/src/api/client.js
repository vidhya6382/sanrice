import axios from "axios";
import * as fallback from "../data/fallback";

// Where the Django API lives:
// - VITE_API_URL  full address, e.g. https://sanrice-api.onrender.com/api
// - VITE_API_HOST just the host (Render fills this in), e.g. sanrice-api.onrender.com
// - otherwise "/api" (local development through the Vite proxy)
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.VITE_API_HOST ? `https://${import.meta.env.VITE_API_HOST}/api` : "/api");

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

// DRF can return either a plain list or a paginated { results: [...] } object.
const list = (data) => (Array.isArray(data) ? data : data?.results ?? []);

// Read endpoints fall back to bundled content if the API is down,
// so the website never shows an empty page.
async function withFallback(request, fallbackValue) {
  try {
    const { data } = await request();
    return data;
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[api] using fallback data:", err.message);
    return fallbackValue;
  }
}

export async function getProducts({ brand, featured } = {}) {
  const params = {};
  if (brand) params.brand = brand;
  if (featured) params.featured = "true";
  const data = await withFallback(() => api.get("/products/", { params }), null);
  if (data) return list(data);

  return fallback.products.filter(
    (p) => (!brand || p.brand.slug === brand) && (!featured || p.is_featured)
  );
}

export async function getProduct(slug) {
  const data = await withFallback(() => api.get(`/products/${slug}/`), null);
  return data ?? fallback.products.find((p) => p.slug === slug) ?? null;
}

export async function getBrands() {
  const data = await withFallback(() => api.get("/brands/"), null);
  return data ? list(data) : fallback.brands;
}

export async function getSettings() {
  const data = await withFallback(() => api.get("/settings/"), null);
  return { ...fallback.settings, ...(data || {}) };
}

// Enquiries must reach the server, so errors are passed back to the form.
export async function createEnquiry(payload) {
  const { data } = await api.post("/enquiries/", payload);
  return data;
}
