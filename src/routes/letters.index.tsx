import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { letters } from "@/lib/letters-data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/letters/")({
  head: () => ({
    meta: [
      { title: "Stradmont Letters | Notes from the lab" },
      {
        name: "description",
        content:
          "Letters, notes and studies released from the Stradmont laboratory. On systems, technology and finance operations.",
      },
      { property: "og:title", content: "Stradmont Letters | Notes from the lab" },
      {
        property: "og:description",
        content:
          "Letters, notes and studies released from the Stradmont laboratory. On systems, technology and finance operations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stradmontsolutions.com/letters" },
      {
        property: "og:image",
        content: "https://stradmontsolutions.com/og-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Stradmont Letters | Notes from the lab",
      },
      {
        name: "twitter:description",
        content:
          "Letters, notes and studies released from the Stradmont laboratory. On systems, technology and finance operations.",
      },
      {
        name: "twitter:image",
        content: "https://stradmontsolutions.com/og-image.png",
      },
    ],
    links: [{ rel: "canonical", href: "https://stradmontsolutions.com/letters" }],
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
              name: "Letters",
              item: "https://stradmontsolutions.com/letters",
            },
          ],
        }),
      },
    ],
  }),
  component: LettersIndexPage,
});

function LettersIndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main id="main-content">
        {/* Header */}
        <section className="surface-ambient border-b border-border pt-40 pb-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <span className="eyebrow">Stradmont Letters</span>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[0.98] text-foreground">
              Notes from the chaos
              <br />
              we solve.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Letters, notes and studies released from the laboratory. On systems, technology and finance operations.
            </p>
          </div>
        </section>

        {/* Letters Grid */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {letters.map((letter) => (
              <Link
                key={letter.slug}
                to="/letters/$slug"
                params={{ slug: letter.slug }}
                className="card-lab group flex flex-col justify-between overflow-hidden p-8 no-underline transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-primary">
                      {letter.kind} {letter.number}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">{letter.date}</span>
                  </div>

                  <h2 className="mt-5 font-display text-xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                    {letter.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {letter.body}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-xs text-muted-foreground">{letter.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                    Read letter
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
