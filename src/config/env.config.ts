/**
 * Global site constants
 */
export const SITE_URL = "https://stradmontsolutions.com" as const;
export const SITE_DOMAIN = "stradmontsolutions.com" as const;

/**
 * Application environment configuration.
 * Centralizes all environment variables across the app.
 */
const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const rawTurnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export const ENV = {
  API_BASE_URL:
    typeof rawApiBaseUrl === "string" && rawApiBaseUrl.trim().length > 0
      ? rawApiBaseUrl.trim().replace(/\/+$/, "")
      : "",
  TURNSTILE_SITE_KEY:
    typeof rawTurnstileKey === "string" && rawTurnstileKey.trim().length > 0
      ? rawTurnstileKey.trim()
      : "",
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;

export default ENV;
