import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";

const BACKEND = "http://127.0.0.1:8000";

// While the Django backend is not running, every API call fails with
// ECONNREFUSED. The site already falls back to built-in data, so instead of
// printing the same error again and again we show one friendly note.
const logger = createLogger();
const originalError = logger.error;
let warned = false;
logger.error = (msg, options) => {
  if (typeof msg === "string" && msg.includes("http proxy error")) {
    if (!warned) {
      warned = true;
      logger.warn(
        `\n  [san-rice] Django backend not reachable at ${BACKEND} – showing built-in data.\n` +
          `  Start it with:  python manage.py runserver\n`
      );
    }
    return;
  }
  originalError(msg, options);
};

export default defineConfig({
  plugins: [react()],
  customLogger: logger,
  server: {
    port: 5173,
    // During development, calls to /api and /media are forwarded to Django.
    proxy: {
      "/api": BACKEND,
      "/media": BACKEND,
    },
  },
});
