/**
 * Global site constants
 */
export const SITE_URL = "https://stradmontsolutions.com" as const;
export const SITE_DOMAIN = "stradmontsolutions.com" as const;

/**
 * Application environment configuration.
 * Centralizes all environment variables across the app.
 */
export const ENV = {
  API_BASE_URL: (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, ""),
  TURNSTILE_SITE_KEY: (import.meta.env.VITE_TURNSTILE_SITE_KEY || "").trim(),
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;

export default ENV;
