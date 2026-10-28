import { ENV } from "@/config/env.config";
import { getLetterBySlug, letters, type Letter, type Section } from "@/lib/letters-data";
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

export interface ApiLetterSection {
  heading?: string | undefined;
  paragraphs?: string[] | undefined;
}

export interface ApiLetter {
  slug: string;
  number: string;
  kind?: "Letter" | "Note" | "Study" | undefined;
  date: string;
  readTime: string;
  title: string;
  body: string;
  image?: string | undefined;
  content?: ApiLetterSection[] | undefined;
  author: string;
  authorTitle: string;
}

function normalizeLetter(letter: ApiLetter): Letter {
  const content: Section[] = (letter.content || []).map((sec) => ({
    heading: sec.heading || undefined,
    paragraphs: Array.isArray(sec.paragraphs) ? sec.paragraphs : [],
  }));

  return {
    slug: letter.slug,
    number: letter.number,
    kind: letter.kind || "Letter",
    date: letter.date,
    readTime: letter.readTime,
    title: letter.title,
    body: letter.body,
    image: letter.image || "/images/letters/design-docs.jpg",
    content,
    author: letter.author,
    authorTitle: letter.authorTitle,
  };
}

/**
 * Submits a contact enquiry to the Node.js backend (`POST /api/v1/contact`),
 * which verifies the Cloudflare Turnstile token, persists the enquiry, and
 * dispatches both the Admin Notification and User Acknowledgement emails.
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

  const response = await fetch(`${ENV.API_BASE_URL}/contact`, {
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
    let validationErrors: string[] | undefined = undefined;
    if (Array.isArray(json?.errors)) {
      validationErrors = json.errors;
    } else if (json?.details && typeof json.details === "object") {
      validationErrors = Object.values(json.details as Record<string, unknown>).map((d) => {
        if (typeof d === "string") return d;
        if (d && typeof d === "object" && "message" in d) {
          return String((d as { message: unknown }).message);
        }
        return JSON.stringify(d);
      });
    }

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
  if (!ENV.API_BASE_URL) return letters;
  try {
    const response = await fetch(`${ENV.API_BASE_URL}/letters?limit=100&publishedOnly=true`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return letters;
    const json = await response.json();
    if (Array.isArray(json?.data) && json.data.length > 0) {
      return json.data.map(normalizeLetter);
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
  const fallback = getLetterBySlug(slug);
  if (!ENV.API_BASE_URL) return fallback;
  try {
    const response = await fetch(`${ENV.API_BASE_URL}/letters/${encodeURIComponent(slug)}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return fallback;
    const json = await response.json();
    if (json?.data?.slug) {
      return normalizeLetter(json.data);
    }
    return fallback;
  } catch {
    return fallback;
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
  if (!ENV.API_BASE_URL) return [fallback];
  try {
    const response = await fetch(`${ENV.API_BASE_URL}/products?activeOnly=true`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return [fallback];
    const json = await response.json();
    if (Array.isArray(json?.data) && json.data.length > 0) {
      return json.data.map((item: ProductRecord) => {
        let domain = item.domain;
        if (!domain && item.url) {
          try {
            domain = new URL(item.url).hostname.replace(/^www\./, "");
          } catch {
            const hostPart = item.url.replace(/^https?:\/\//, "").split("/")[0] ?? "";
            domain = hostPart.replace(/^www\./, "");
          }
        }
        return {
          ...item,
          domain: domain || "thebuildersbase.com",
        };
      });
    }
    return [fallback];
  } catch {
    return [fallback];
  }
}
