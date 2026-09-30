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

export interface ProductRecord {
  id?: string;
  name: string;
  slug?: string;
  tag: string;
  status: string;
  logo: string;
  url: string;
  domain?: string;
  body: string;
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
 * Submits a contact enquiry to the Node.js backend (`POST /api/v1/contact`),
 * which verifies the Cloudflare Turnstile token, persists the enquiry, and
 * dispatches both the Admin Notification and User Acknowledgement emails.
 */
export async function submitContactEnquiry(
  payload: ContactEnquiryPayload,
): Promise<ApiResponse<ContactEnquiryRecord>> {
  const response = await fetch(`${SITE_CONFIG.apiBaseUrl}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim(),
      company: payload.company?.trim() || undefined,
      topic: payload.topic,
      message: payload.message.trim(),
      turnstileToken: payload.turnstileToken || undefined,
    }),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const validationErrors: string[] | undefined = Array.isArray(json?.errors)
      ? json.errors
      : undefined;
    const message =
      validationErrors?.[0] ||
      json?.message ||
      "Unable to submit your enquiry right now. Please try again.";
    throw new ApiClientError(message, response.status, validationErrors);
  }

  return json as ApiResponse<ContactEnquiryRecord>;
}

/**
 * Fetches published Stradmont Letters from the backend API (`GET /api/v1/letters`)
 * with automatic fallback to local editorial data if the backend is offline.
 */
export async function fetchLetters(): Promise<Letter[]> {
  try {
    const response = await fetch(`${SITE_CONFIG.apiBaseUrl}/letters`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return letters;
    const json = await response.json();
    if (Array.isArray(json?.data) && json.data.length > 0) {
      return json.data as Letter[];
    }
    return letters;
  } catch {
    return letters;
  }
}

/**
 * Fetches a single Stradmont Letter by slug from the backend API (`GET /api/v1/letters/:slug`)
 * with automatic fallback to local editorial data if the backend is offline.
 */
export async function fetchLetterBySlug(slug: string): Promise<Letter | undefined> {
  try {
    const response = await fetch(`${SITE_CONFIG.apiBaseUrl}/letters/${encodeURIComponent(slug)}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return getLetterBySlug(slug);
    const json = await response.json();
    if (json?.data?.slug) {
      return json.data as Letter;
    }
    return getLetterBySlug(slug);
  } catch {
    return getLetterBySlug(slug);
  }
}

/**
 * Fetches active products from the backend API (`GET /api/v1/products`)
 * with automatic fallback to `SITE_CONFIG.products` if the backend is offline.
 */
export async function fetchProducts(): Promise<ProductRecord[]> {
  const fallback: ProductRecord = {
    ...SITE_CONFIG.products.buildersBase,
    slug: "builders-base",
  };
  try {
    const response = await fetch(`${SITE_CONFIG.apiBaseUrl}/products`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return [fallback];
    const json = await response.json();
    if (Array.isArray(json?.data) && json.data.length > 0) {
      return json.data.map((item: ProductRecord) => ({
        ...item,
        domain: item.domain || new URL(item.url).hostname.replace(/^www\./, ""),
      }));
    }
    return [fallback];
  } catch {
    return [fallback];
  }
}
