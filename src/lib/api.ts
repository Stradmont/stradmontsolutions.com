import { ENV } from "@/config/env.config";
import { getLetterBySlug, letters, type Letter } from "@/lib/letters-data";
import { SITE_CONFIG } from "@/lib/site-config";

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ContactEnquiryPayload {
  name: string;
  email: string;
  company?: string | undefined;
  topic: "Partnership" | "Our Products" | "Investment" | "Other";
  message: string;
  turnstileToken?: string | undefined;
}

export interface ContactEnquiryRecord extends ContactEnquiryPayload {
  id: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
  createdAt: string;
}

export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  tag: string;
  status: string;
  logo: string;
  url: string;
  body: string;
  isActive: boolean;
}

export interface ProductRecord {
  id?: string;
  name: string;
  slug: string;
  tag: string;
  status: string;
  logo: string;
  url: string;
  domain: string;
  body: string;
}

export interface BackendErrorResponse {
  message?: string;
  errors?: string[];
  success?: boolean;
}

export class ApiClientError extends Error {
  statusCode: number;
  errors?: string[] | undefined;

  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * Extracts and normalizes the domain hostname from a fully-qualified product URL.
 * Throws an explicit Error if the URL is invalid or malformed.
 */
export function extractDomain(url: string): string {
  if (!url || typeof url !== "string") {
    throw new Error("Cannot extract domain from empty or invalid URL");
  }
  const parsed = new URL(url);
  return parsed.hostname.replace(/^www\./, "");
}

/**
 * Submits a contact enquiry to the backend (`POST /api/v1/contact`),
 * which verifies the Cloudflare Turnstile token, persists the enquiry, and
 * dispatches notifications.
 */
export async function submitContactEnquiry(
  payload: ContactEnquiryPayload,
): Promise<ApiResponse<ContactEnquiryRecord>> {
  if (!ENV.API_BASE_URL) {
    throw new ApiClientError(
      `Service is temporarily unavailable. Please contact us directly at ${SITE_CONFIG.contact.email}.`,
      503,
    );
  }

  const response = await fetch(`${ENV.API_BASE_URL}/public/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim(),
      company: payload.company ? payload.company.trim() : undefined,
      topic: payload.topic,
      message: payload.message.trim(),
      turnstileToken: payload.turnstileToken,
    }),
  });
  const contentType = response.headers.get("content-type");
  const isJson = Boolean(contentType && contentType.includes("application/json"));
  const json = isJson ? ((await response.json()) as BackendErrorResponse) : null;

  if (!response.ok) {
    let errorMessage = "Unable to submit your enquiry right now. Please try again.";
    let validationErrors: string[] | undefined = undefined;

    if (json) {
      if (Array.isArray(json.errors) && json.errors.length > 0) {
        validationErrors = json.errors;
        const firstError = validationErrors[0];
        if (typeof firstError === "string" && firstError.length > 0) {
          errorMessage = firstError;
        }
      } else if (typeof json.message === "string" && json.message.trim().length > 0) {
        errorMessage = json.message;
      }
    }

    throw new ApiClientError(errorMessage, response.status, validationErrors);
  }

  return json as unknown as ApiResponse<ContactEnquiryRecord>;
}

/**
 * Fetches published Stradmont Letters from the backend API (`GET /api/v1/public/letters`).
 * Uses editorial content when the backend API URL is not configured.
 */
export async function fetchLetters(): Promise<Letter[]> {
  if (!ENV.API_BASE_URL) {
    return letters;
  }

  const response = await fetch(`${ENV.API_BASE_URL}/public/letters?limit=100`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new ApiClientError(
      `Failed to fetch letters from backend: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  const json = (await response.json()) as ApiResponse<Letter[]>;
  if (!Array.isArray(json.data)) {
    throw new ApiClientError("Invalid response format: expected letters array", response.status);
  }

  return json.data;
}

/**
 * Fetches a single Stradmont Letter by slug from the backend API (`GET /api/v1/public/letters/:slug`).
 * Returns undefined if not found (404).
 */
export async function fetchLetterBySlug(slug: string): Promise<Letter | undefined> {
  if (!ENV.API_BASE_URL) {
    return getLetterBySlug(slug);
  }

  const response = await fetch(`${ENV.API_BASE_URL}/public/letters/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new ApiClientError(
      `Failed to fetch letter "${slug}" from backend: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  const json = (await response.json()) as ApiResponse<Letter>;
  return json.data;
}

/**
 * Fetches active products from the backend API (`GET /api/v1/public/products`).
 * Uses editorial product configuration when the backend API URL is not configured.
 */
export async function fetchProducts(): Promise<ProductRecord[]> {
  if (!ENV.API_BASE_URL) {
    return [SITE_CONFIG.products.buildersBase];
  }

  const response = await fetch(`${ENV.API_BASE_URL}/public/products`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new ApiClientError(
      `Failed to fetch products from backend: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  const json = (await response.json()) as ApiResponse<ProductDto[]>;
  if (!Array.isArray(json.data)) {
    throw new ApiClientError("Invalid response format: expected products array", response.status);
  }

  return json.data.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    tag: item.tag,
    status: item.status,
    logo: item.logo,
    url: item.url,
    domain: extractDomain(item.url),
    body: item.body,
  }));
}
