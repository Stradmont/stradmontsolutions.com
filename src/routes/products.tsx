import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchProducts } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/site-config";

const defaultProduct = SITE_CONFIG.products.buildersBase;

export const Route = createFileRoute("/products")({
  loader: async () => {
    const products = await fetchProducts();
    return { products };
  },
  head: () => ({
    meta: [
      { title: `Our Products | ${SITE_CONFIG.name}` },
      {
        name: "description",
        content: defaultProduct.body,
      },
      { property: "og:title", content: `Our Products | ${SITE_CONFIG.name}` },
      {
        property: "og:description",
        content: defaultProduct.body,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_CONFIG.url}/products` },
      {
        property: "og:image",
        content: SITE_CONFIG.ogImage,
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `Our Products | ${SITE_CONFIG.name}`,
      },
      {
        name: "twitter:description",
        content: defaultProduct.body,
      },
      {
        name: "twitter:image",
        content: SITE_CONFIG.ogImage,
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_CONFIG.url}/products` }],
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
              name: "Our Products",
              item: `${SITE_CONFIG.url}/products`,
            },
          ],
        }),
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const loaderData = Route.useLoaderData();
  const product = loaderData?.products?.[0] ?? defaultProduct;
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main id="main-content" className="animate-page-transition">
        {/* ── Header ── */}
        <section className="surface-ambient border-b border-border">
          <div className="mx-auto max-w-3xl px-5 pb-14 pt-32 text-center sm:px-6 sm:pb-20 sm:pt-48">
            <span className="eyebrow">Our Products</span>
            <h1 className="mt-5 page-title text-foreground">Built for institutions.</h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Every platform begins as deep operational research. The ones that hold up become tools
              institutions rely on.
            </p>
          </div>
        </section>

        {/* ── Product showcase ── */}
        <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <article className="card-lab group overflow-hidden rounded-3xl">
            {/* Coloured top bar */}
            <div className="h-1.5 w-full" style={{ background: "var(--gradient-electric)" }} />

            <div className="p-6 sm:p-10 md:p-12">
              <div className="flex items-center gap-4">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
                  aria-label={`Visit ${product.name} website`}
                >
                  <img
                    src={product.logo}
                    alt={`${product.name} logo`}
                    className="h-full w-full object-contain p-2"
                    width="80"
                    height="80"
                  />
                </a>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                      {product.tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {product.status}
                    </span>
                  </div>
                  <h2 className="mt-2.5 font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-primary"
                    >
                      {product.name}
                    </a>
                  </h2>
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {product.body}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--gradient-electric)" }}
                >
                  Visit {product.domain}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 ease-out hover:border-primary hover:bg-secondary/60 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </article>

          {/* Bottom CTA strip */}
          <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-border bg-secondary/40 px-6 py-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
            <div>
              <p className="font-semibold text-foreground">Interested in early access?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Builders Base is in active development. Select teams can apply now.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ background: "var(--gradient-electric)" }}
            >
              Get in touch
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
