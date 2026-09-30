import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";

function BrandLogo() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      aria-label="Stradmont Solutions Home"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 shadow-soft transition-transform duration-300 group-hover:scale-105">
        <img
          src="/favicon.svg"
          alt="Stradmont monogram mark"
          className="h-6 w-6"
          width="24"
          height="24"
        />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
          Stradmont
        </span>
        <span className="h-2 w-2 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
      </div>
    </Link>
  );
}

function NotFoundComponent() {
  return (
    <div className="surface-ambient flex min-h-screen items-center justify-center px-4 py-12">
      <div className="card-lab w-full max-w-lg p-8 text-center sm:p-10">
        <div className="flex justify-center mb-6">
          <BrandLogo />
        </div>
        <span className="eyebrow">404 — Not Found</span>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          The requested system node or page could not be located. It may have been relocated or is
          currently decommissioned.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: "var(--gradient-electric)" }}
          >
            Return to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background/80 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Explore Products
          </Link>
        </div>
        <div className="mt-8 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            Looking for something specific? Browse our{" "}
            <Link
              to="/letters"
              className="font-medium text-foreground underline decoration-primary underline-offset-4 hover:text-primary"
            >
              Letters & Research
            </Link>{" "}
            or{" "}
            <Link
              to="/contact"
              className="font-medium text-foreground underline decoration-primary underline-offset-4 hover:text-primary"
            >
              Contact our team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="surface-ambient flex min-h-screen items-center justify-center px-4 py-12">
      <div className="card-lab w-full max-w-lg p-8 text-center sm:p-10">
        <div className="flex justify-center mb-6">
          <BrandLogo />
        </div>
        <span className="eyebrow">System Interruption</span>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Unexpected Error Encountered
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          An unhandled state occurred while processing this request. Our diagnostics have been
          notified.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: "var(--gradient-electric)" }}
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stradmont Solutions | Systems over chaos" },
      {
        name: "description",
        content:
          "Stradmont Solutions: engineering specialised SaaS platforms and workflow software for technology and finance institutions.",
      },
      { name: "author", content: "Stradmont Solutions" },
      { name: "theme-color", content: "#1e1b4b" },
      { property: "og:title", content: "Stradmont Solutions | Systems over chaos" },
      {
        property: "og:description",
        content:
          "Engineering specialised SaaS platforms and workflow software for technology and finance institutions.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://stradmontsolutions.com/og-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://stradmontsolutions.com/og-image.png",
      },
    ],
    links: [
      { rel: "canonical", href: "https://stradmontsolutions.com" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=JetBrains+Mono:wght@500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
