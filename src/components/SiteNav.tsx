import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "Our Products", to: "/products" },
  { label: "Letters", to: "/letters" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-[var(--shadow-lift)]"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border/80 bg-background/90 px-6 py-3.5 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "shadow-[var(--shadow-soft)] border-border" : "shadow-xs"
          }`}
        >
          <Link
            to="/"
            className="group flex items-baseline gap-1.5 transition-opacity hover:opacity-90"
          >
            <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
              Stradmont
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="group relative px-1 py-1.5 text-[15px] font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{
                  className: "text-foreground font-semibold",
                }}
              >
                {({ isActive }) => (
                  <>
                    <span>{l.label}</span>
                    <span
                      className={`absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? "scale-x-100 bg-primary opacity-100"
                          : "scale-x-0 bg-primary/70 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                    />
                  </>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/contact"
              className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-200 hover:opacity-90 hover:shadow-xs active:scale-[0.98] sm:inline-flex"
            >
              Get in touch
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary md:hidden"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                {open ? <path d="M3 3l10 10M13 3L3 13" /> : <path d="M2 5h12M2 11h12" />}
              </svg>
            </button>
          </div>
        </nav>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-foreground/15 backdrop-blur-xs md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div className="relative z-50 mx-auto mt-2 max-w-5xl rounded-3xl border border-border bg-background/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur-xl md:hidden">
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
                    activeProps={{
                      className: "bg-secondary font-semibold text-primary",
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{l.label}</span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                      </>
                    )}
                  </Link>
                ))}
                <div className="mt-2 border-t border-border pt-2">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-2xl bg-foreground px-4 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
