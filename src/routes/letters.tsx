import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/letters")({
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
  component: Letters,
});

const letters = [
  {
    kind: "Letter",
    date: "Sep 2026",
    readTime: "5 min read",
    title: "Why operating software should be written down before it is written",
    body: "On design documents as an instrument of institutional memory. Writing the spec first saves ten times the effort in rewrites.",
    image: "/images/letters/design-docs.jpg",
  },
  {
    kind: "Note",
    date: "Aug 2026",
    readTime: "4 min read",
    title: "Latency is a governance problem",
    body: "How response-time budgets quietly become policy decisions inside finance teams, and why engineers rarely get a seat at that table.",
    image: "/images/letters/latency.jpg",
  },
  {
    kind: "Study",
    date: "Jul 2026",
    readTime: "7 min read",
    title: "The finance data layer nobody owns",
    body: "A structural read on the gap between operating systems and financial reporting, and the silent costs of that gap.",
    image: "/images/letters/data-layer.jpg",
  },
];

function Letters() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main id="main-content">
        {/* Header */}
        <section className="surface-ambient border-b border-border pt-40 pb-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <span className="eyebrow">Stradmont Letters</span>
            <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[0.98] text-foreground">
              Notes from the chaos
              <br />
              we solve.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Letters, notes and studies released from the laboratory. No newsletters, no funnels.
            </p>
          </div>
        </section>

        {/* Letters Grid */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {letters.map((letter) => (
              <article key={letter.title} className="card-lab group flex flex-col overflow-hidden">
                {/* Cover image */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-secondary">
                  <img
                    src={letter.image}
                    alt={letter.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {letter.kind}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">{letter.date}</span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                    {letter.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {letter.body}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <span className="text-xs text-muted-foreground">{letter.readTime}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground border border-border">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      Forthcoming release
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
