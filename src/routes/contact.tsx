import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact Us | ${SITE_CONFIG.name}` },
      {
        name: "description",
        content: `Get in touch with ${SITE_CONFIG.name} about partnerships, products or investment.`,
      },
      { property: "og:title", content: `Contact Us | ${SITE_CONFIG.name}` },
      {
        property: "og:description",
        content: "Send the Stradmont team a message. Every enquiry is read by a person.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_CONFIG.url}/contact` },
      {
        property: "og:image",
        content: SITE_CONFIG.ogImage,
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `Contact Us | ${SITE_CONFIG.name}`,
      },
      {
        name: "twitter:description",
        content: "Send the Stradmont team a message. Every enquiry is read by a person.",
      },
      {
        name: "twitter:image",
        content: SITE_CONFIG.ogImage,
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_CONFIG.url}/contact` }],
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
              item: `${SITE_CONFIG.url}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact",
              item: `${SITE_CONFIG.url}/contact`,
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
    value: SITE_CONFIG.contact.email,
    href: SITE_CONFIG.contact.emailHref,
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
    value: SITE_CONFIG.contact.phone,
    href: SITE_CONFIG.contact.phoneHref,
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
    value: SITE_CONFIG.contact.location,
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
              <h1 className="mt-5 page-title text-foreground">Let's talk.</h1>
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
                  {SOCIAL_LINKS.map((s) => (
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
