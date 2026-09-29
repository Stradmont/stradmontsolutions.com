import { Link } from "@tanstack/react-router";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/stradmont-solutions",
    // LinkedIn brand blue
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
    // Instagram brand gradient approximated as a solid mid-tone
    color: "#E1306C",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Our Products", to: "/products" },
  { label: "Letters", to: "/letters" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        {/* Main grid — brand full-width on mobile, 3 columns on md+ */}
        <div className="grid gap-8 sm:grid-cols-2 md:gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="inline-flex items-baseline gap-1.5">
              <span className="font-display text-base font-extrabold tracking-tight text-foreground">
                Stradmont
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </Link>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
              Systems over chaos. Built for technology and finance.
            </p>

            {/* Social icons with native brand colours */}
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ "--brand": s.color } as React.CSSProperties}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)] hover:bg-[color-mix(in_oklab,var(--brand)_8%,transparent)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="eyebrow mb-5">Navigation</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-muted-foreground transition-all duration-200 ease-out hover:text-foreground hover:translate-x-1"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="eyebrow mb-5">Get in touch</p>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="mailto:info@stradmontsolutions.com"
                  className="group flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <svg
                    className="mt-0.5 shrink-0"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="1" y="3" width="14" height="10" rx="1.5" />
                    <path d="M1 5l7 5 7-5" />
                  </svg>
                  info@stradmontsolutions.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+12269751978"
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <svg
                    className="shrink-0"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1h1a1.5 1.5 0 0 1 1.5 1.5v.5c0 .6-.3 1.1-.8 1.4L4.5 5a9 9 0 0 0 6.5 6.5l.6-.7c.3-.5.8-.8 1.4-.8h.5A1.5 1.5 0 0 1 15 11.5v1A1.5 1.5 0 0 1 13.5 14C7.1 14 2 8.9 2 2.5z" />
                  </svg>
                  +1 (226) 975-1978
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <svg
                  className="shrink-0"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3 4.5 8.5 4.5 8.5S12.5 9 12.5 6A4.5 4.5 0 0 0 8 1.5z" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                Ontario, Canada
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:mt-12 sm:flex-row sm:gap-3">
          <p>© {new Date().getFullYear()} Stradmont Solutions. All rights reserved.</p>
          <p>Systems over chaos.</p>
        </div>
      </div>
    </footer>
  );
}
