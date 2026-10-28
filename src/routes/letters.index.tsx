import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchLetters } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/letters/")({
  loader: async () => {
    const items = await fetchLetters();
    return { letters: items };
  },
  head: () => ({
    meta: [
      { title: "Stradmont Letters | Systems Architecture & Dispatches" },
      {
        name: "description",
        content: `Dispatches on architecture, systems engineering, and building software that holds under real-world demand from ${SITE_CONFIG.name}.`,
      },
      { property: "og:title", content: "Stradmont Letters | Systems Architecture & Dispatches" },
      {
        property: "og:description",
        content: `Dispatches on architecture, systems engineering, and building software that holds under real-world demand from ${SITE_CONFIG.name}.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_CONFIG.url}/letters` },
      {
        property: "og:image",
        content: SITE_CONFIG.ogImage,
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Stradmont Letters | Systems Architecture & Dispatches",
      },
      {
        name: "twitter:description",
        content: `Dispatches on architecture, systems engineering, and building software that holds under real-world demand from ${SITE_CONFIG.name}.`,
      },
      {
        name: "twitter:image",
        content: SITE_CONFIG.ogImage,
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_CONFIG.url}/letters` }],
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
              name: "Letters",
              item: `${SITE_CONFIG.url}/letters`,
            },
          ],
        }),
      },
    ],
  }),
  component: LettersIndexPage,
});

function LettersIndexPage() {
  const { letters } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main id="main-content" className="animate-page-transition">
        {/* Header */}
        <section className="surface-ambient border-b border-border pt-32 pb-14 sm:pt-40 sm:pb-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <span className="eyebrow">Publication</span>
            <h1 className="mt-5 page-title text-foreground">Stradmont Letters.</h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Dispatches on architecture, systems engineering, and building software that holds
              under real-world demand.
            </p>
          </div>
        </section>

        {/* Letters Grid */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {letters.map((letter) => (
              <Link
                key={letter.slug}
                to="/letters/$slug"
                params={{ slug: letter.slug }}
                className="card-lab group flex flex-col justify-between overflow-hidden rounded-3xl p-0 no-underline transition-all duration-300 ease-out hover:-translate-y-1.5"
              >
                {/* Editorial cover image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-secondary/40">
                  <img
                    src={letter.image}
                    alt={letter.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-xs shadow-xs">
                      {letter.kind} {letter.number}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{letter.date}</span>
                      <span>{letter.readTime}</span>
                    </div>

                    <h2 className="mt-4 font-display text-lg font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary sm:text-xl">
                      {letter.title}
                    </h2>

                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {letter.body}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-end border-t border-border pt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                      Read letter
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
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
