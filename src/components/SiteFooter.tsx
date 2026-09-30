import { Link } from "@tanstack/react-router";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        {/* Main grid — Brand full-width on mobile/tablet, 3-col on md+ */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Col 1 — Brand: full width until md */}
          <div className="md:col-auto">
            <Link to="/" className="inline-flex items-baseline gap-1.5">
              <span className="font-display text-base font-extrabold tracking-tight text-foreground">
                {SITE_CONFIG.shortName}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </Link>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
              {SITE_CONFIG.tagline}. Built for technology and finance.
            </p>

            {/* Social icons with native brand colours */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => (
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

          {/* Col 2 + 3 wrapper — side by side on mobile/sm, unwrapped on md */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            {/* Col 2 — Navigation */}
            <div>
              <p className="eyebrow mb-5">Navigation</p>
              <nav className="flex flex-col gap-3">
                {SITE_CONFIG.footerNavLinks.map((l) => (
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
                    href={SITE_CONFIG.contact.emailHref}
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
                    <span className="break-all">{SITE_CONFIG.contact.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.contact.phoneHref}
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
                    {SITE_CONFIG.contact.phone}
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
                  {SITE_CONFIG.contact.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:mt-12 sm:flex-row sm:gap-3">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p>{SITE_CONFIG.tagline}.</p>
        </div>
      </div>
    </footer>
  );
}
