import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Stradmont Solutions" },
      {
        name: "description",
        content:
          "Get in touch with Stradmont Solutions about partnerships, products or investment.",
      },
      { property: "og:title", content: "Contact Us | Stradmont Solutions" },
      {
        property: "og:description",
        content: "Send the Stradmont team a message. Every enquiry is read by a person.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stradmontsolutions.com/contact" },
      {
        property: "og:image",
        content: "https://stradmontsolutions.com/og-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Contact Us | Stradmont Solutions",
      },
      {
        name: "twitter:description",
        content: "Send the Stradmont team a message. Every enquiry is read by a person.",
      },
      {
        name: "twitter:image",
        content: "https://stradmontsolutions.com/og-image.png",
      },
    ],
    links: [{ rel: "canonical", href: "https://stradmontsolutions.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://stradmontsolutions.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact",
              item: "https://stradmontsolutions.com/contact",
            },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

const contactDetails = [
  {
    label: "Email",
    value: "info@stradmontsolutions.com",
    href: "mailto:info@stradmontsolutions.com",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="1" y="3" width="14" height="10" rx="1.5" />
        <path d="M1 5l7 5 7-5" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+1 (226) 975-1978",
    href: "tel:+12269751978",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1h1a1.5 1.5 0 0 1 1.5 1.5v.5c0 .6-.3 1.1-.8 1.4L4.5 5a9 9 0 0 0 6.5 6.5l.6-.7c.3-.5.8-.8 1.4-.8h.5A1.5 1.5 0 0 1 15 11.5v1A1.5 1.5 0 0 1 13.5 14C7.1 14 2 8.9 2 2.5z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Ontario, Canada",
    href: null,
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3 4.5 8.5 4.5 8.5S12.5 9 12.5 6A4.5 4.5 0 0 0 8 1.5z" />
        <circle cx="8" cy="6" r="1.5" />
      </svg>
    ),
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/stradmont-solutions",
    color: "#0A66C2",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5A2.49 2.49 0 0 1 2.5 6a2.49 2.49 0 0 1-2.48-2.5A2.49 2.49 0 0 1 2.5 1a2.49 2.49 0 0 1 2.48 2.5zM.25 8.5H4.75V24H.25V8.5zm7.5 0H12v2.15h.06c.63-1.2 2.17-2.46 4.47-2.46C21.27 8.19 22 11.37 22 15.27V24h-4.5v-7.87c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24H7.75V8.5z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stradmont.solutions/",
    color: "#E1306C",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main id="main-content" className="animate-page-transition">
        <section className="surface-ambient border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-32 sm:gap-16 sm:px-6 sm:pb-24 sm:pt-48 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* ── Left: contact info ── */}
            <div>
              <span className="eyebrow">Contact us</span>
              <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.05] text-foreground">
                Let's talk.
              </h1>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
                Tell us about your company and what you need. We reply within two working days.
              </p>

              {/* Details list */}
              <ul className="mt-10 space-y-5 border-t border-border pt-8">
                {contactDetails.map((d) => (
                  <li key={d.label} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                      {d.icon}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{d.label}</p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-0.5 text-sm font-medium text-foreground transition-colors duration-200 ease-out hover:text-primary"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <div>
                          <p className="mt-0.5 text-sm font-medium text-foreground">{d.value}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Social */}
              <div className="mt-8 border-t border-border pt-8">
                <p className="text-xs font-medium text-muted-foreground">Follow us</p>
                <div className="mt-4 flex items-center gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      style={{ "--brand": s.color } as React.CSSProperties}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)] hover:bg-[color-mix(in_oklab,var(--brand)_8%,transparent)]"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
