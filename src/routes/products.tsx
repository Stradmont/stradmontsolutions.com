import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Products | Stradmont Solutions" },
      {
        name: "description",
        content:
          "Products incubated by Stradmont Solutions: Stradmont Order and Builders Base.",
      },
      { property: "og:title", content: "Our Products | Stradmont Solutions" },
      {
        property: "og:description",
        content:
          "Software products incubated inside the Stradmont research laboratory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const products = [
  {
    name: "Stradmont Order",
    tag: "Commerce",
    status: "In development",
    body: "A clean, reliable ordering platform that keeps every transaction accurate and every record traceable. Built for teams that can no longer afford loose ends.",
    points: [
      "Real-time order flow",
      "Accurate reconciliation",
      "Clear owner reporting",
    ],
  },
  {
    name: "Builders Base",
    tag: "Platform",
    status: "In development",
    body: "A foundation for teams building financial and operational tools. It gives you structured data, sound permissions, and an architecture ready to scale.",
    points: [
      "Structured data layer",
      "Role-based access control",
      "Built to be audited",
    ],
  },
];

function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* ── Header ── */}
      <section className="surface-ambient border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-40 text-center sm:pt-48">
          <span className="eyebrow">Our Products</span>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-extrabold leading-[1.02] text-foreground">
            Built inside the lab.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Every product begins as research. The ones that hold up become tools
            people rely on.
          </p>
        </div>
      </section>

      {/* ── Product cards ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <article
              key={p.name}
              className="card-lab group flex flex-col gap-0 overflow-hidden rounded-3xl"
            >
              {/* Coloured top bar */}
              <div className="h-1.5 w-full" style={{ background: "var(--gradient-electric)" }} />

              <div className="flex flex-1 flex-col p-8 sm:p-10">
                {/* Tags row */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                    {p.tag}
                  </span>
                  <span className="inline-flex rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {p.status}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-bold text-foreground">
                  {p.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>

                <ul className="mt-7 space-y-3 border-t border-border pt-6">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  Ask about {p.name}
                  <svg
                    width="14" height="14" viewBox="0 0 16 16"
                    fill="none" stroke="currentColor" strokeWidth="1.8"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-secondary/40 px-8 py-7 sm:flex-row">
          <div>
            <p className="font-semibold text-foreground">
              Interested in early access?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Both products are in active development. Select teams can apply
              now.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: "var(--gradient-electric)" }}
          >
            Get in touch
            <svg
              width="14" height="14" viewBox="0 0 16 16"
              fill="none" stroke="currentColor" strokeWidth="1.8"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
