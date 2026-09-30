import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";

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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lift"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border/80 bg-background/90 px-6 py-3.5 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "shadow-soft border-border" : "shadow-xs"
          }`}
        >
          <Link
            to="/"
            className="group flex items-baseline gap-1.5 transition-opacity hover:opacity-90"
          >
            <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
              {SITE_CONFIG.shortName}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {SITE_CONFIG.navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="group relative px-1 py-1.5 text-sm font-medium tracking-tight text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground"
                activeProps={{
                  className: "text-foreground font-semibold",
                }}
              >
                {({ isActive }) => (
                  <>
                    <span>{l.label}</span>
                    <span
                      className={`absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${
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
              className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-300 ease-out hover:opacity-90 hover:shadow-xs hover:-translate-y-0.5 active:scale-[0.98] sm:inline-flex"
            >
              Get in touch
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 ease-out hover:bg-secondary active:scale-95 md:hidden"
            >
              <div className="relative h-3.5 w-3.5 flex flex-col justify-center items-center">
                <span
                  className={`absolute block h-[1.5px] w-3.5 rounded-full bg-current transition-all duration-300 ease-out ${
                    open ? "rotate-45 translate-y-0" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`absolute block h-[1.5px] w-3.5 rounded-full bg-current transition-all duration-300 ease-out ${
                    open ? "-rotate-45 translate-y-0" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Backdrop with smooth fade */}
        <div
          className={`fixed inset-0 z-40 bg-foreground/15 backdrop-blur-xs transition-opacity duration-300 ease-out md:hidden ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Drawer with smooth slide & fade */}
        <div
          className={`relative z-50 mx-auto mt-2 max-w-5xl rounded-3xl border border-border bg-background/95 p-4 shadow-lift backdrop-blur-xl transition-all duration-300 ease-out md:hidden ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-3 scale-[0.98] pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-1">
            {SITE_CONFIG.navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-muted-foreground transition-all duration-200 ease-out hover:bg-secondary hover:text-foreground active:scale-[0.99]"
                activeProps={{
                  className: "bg-secondary font-semibold text-primary",
                }}
              >
                {({ isActive }) => (
                  <>
                    <span>{l.label}</span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 ease-out ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`}
                    />
                  </>
                )}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-foreground px-4 py-3 text-base font-semibold text-background transition-all duration-200 ease-out hover:opacity-90 active:scale-[0.99]"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
