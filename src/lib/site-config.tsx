import type { ReactNode } from "react";

export const SITE_CONFIG = {
  name: "Stradmont Solutions",
  shortName: "Stradmont",
  tagline: "Systems over chaos",
  url: "https://stradmontsolutions.com",
  apiBaseUrl:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    "http://localhost:4000/api/v1",
  turnstileSiteKey:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_TURNSTILE_SITE_KEY) ||
    "1x00000000000000000000AA",
  ogImage: "https://stradmontsolutions.com/og-image.png",
  contact: {
    email: "info@stradmontsolutions.com",
    emailHref: "mailto:info@stradmontsolutions.com",
    phone: "+1 (226) 975-1978",
    phoneSchema: "+1-226-975-1978",
    phoneHref: "tel:+12269751978",
    location: "Ontario, Canada",
  },
  socials: {
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/stradmont-solutions",
      color: "#0A66C2",
    },
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/stradmont.solutions/",
      color: "#E1306C",
    },
  },
  navLinks: [
    { label: "Home", to: "/" },
    { label: "Our Products", to: "/products" },
    { label: "Letters", to: "/letters" },
  ] as const,
  footerNavLinks: [
    { label: "Home", to: "/" },
    { label: "Our Products", to: "/products" },
    { label: "Letters", to: "/letters" },
    { label: "Contact", to: "/contact" },
  ] as const,
  products: {
    buildersBase: {
      name: "Builders Base",
      tag: "Platform",
      status: "In development",
      logo: "/buildersbase-logo.jpeg",
      url: "https://thebuildersbase.com",
      domain: "thebuildersbase.com",
      body: "Builders Base is software that helps insurance distribution organizations develop their people, support their leaders, and grow their organizations.",
    },
  },
} as const;

export interface SocialLinkItem {
  label: string;
  href: string;
  color: string;
  icon: ReactNode;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    ...SITE_CONFIG.socials.linkedin,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5A2.49 2.49 0 0 1 2.5 6a2.49 2.49 0 0 1-2.48-2.5A2.49 2.49 0 0 1 2.5 1a2.49 2.49 0 0 1 2.48 2.5zM.25 8.5H4.75V24H.25V8.5zm7.5 0H12v2.15h.06c.63-1.2 2.17-2.46 4.47-2.46C21.27 8.19 22 11.37 22 15.27V24h-4.5v-7.87c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24H7.75V8.5z" />
      </svg>
    ),
  },
  {
    ...SITE_CONFIG.socials.instagram,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];
