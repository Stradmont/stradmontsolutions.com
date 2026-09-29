import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getLetterBySlug, letters } from "@/lib/letters-data";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/letters/$slug")({
  loader: ({ params }) => {
    const letter = getLetterBySlug(params.slug);
    if (!letter) {
      throw notFound();
    }
    return { letter };
  },
  head: ({ loaderData }) => {
    const letter = loaderData?.letter;
    if (!letter) {
      return {
        meta: [{ title: "Letter Not Found | Stradmont Solutions" }],
      };
    }
    return {
      meta: [
        { title: `${letter.title} | Stradmont Letters` },
        { name: "description", content: letter.body },
        { property: "og:title", content: `${letter.title} | Stradmont Letters` },
        { property: "og:description", content: letter.body },
        { property: "og:type", content: "article" },
        {
          property: "og:url",
          content: `https://stradmontsolutions.com/letters/${letter.slug}`,
        },
        {
          property: "og:image",
          content: `https://stradmontsolutions.com${letter.image}`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${letter.title} | Stradmont Letters` },
        { name: "twitter:description", content: letter.body },
        {
          name: "twitter:image",
          content: `https://stradmontsolutions.com${letter.image}`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://stradmontsolutions.com/letters/${letter.slug}`,
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: letter.title,
            description: letter.body,
            datePublished: letter.date,
            author: {
              "@type": "Organization",
              name: letter.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Stradmont Solutions",
              url: "https://stradmontsolutions.com",
            },
          }),
        },
      ],
    };
  },
  component: LetterDetailPage,
  notFoundComponent: LetterNotFound,
});

function LetterNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main
        id="main-content"
        className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
      >
        <span className="text-xs font-semibold text-primary">404</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          Letter not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          The requested essay or technical note does not exist or may have been consolidated into
          our archive.
        </p>
        <Link
          to="/letters"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Return to letters index
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function LetterDetailPage() {
  const { letter } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const otherLetters = letters.filter((l) => l.slug !== letter.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <SiteNav />

      <main id="main-content" key={letter.slug} className="animate-page-transition">
        {/* Editorial Header */}
        <header className="border-b border-border/70 bg-gradient-to-b from-secondary/40 via-background to-background pb-16 pt-36 sm:pb-20 sm:pt-44">
          <div className="mx-auto max-w-[740px] px-6">
            {/* Top breadcrumb & series tag */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <Link
                to="/letters"
                className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
                <span>Letters</span>
                <span className="text-border">/</span>
                <span className="font-medium text-foreground">Letter {letter.number}</span>
              </Link>

              <span className="text-xs font-medium text-muted-foreground">{letter.kind}</span>
            </div>

            {/* Title */}
            <h1 className="mt-8 font-display text-[clamp(2.1rem,4.4vw,3.25rem)] font-extrabold leading-[1.12] tracking-tight text-foreground">
              {letter.title}
            </h1>

            {/* Standfirst / Lead Description (Natural case, natural font) */}
            <p className="mt-6 text-lg font-normal leading-[1.65] text-foreground/75 sm:text-[1.2rem]">
              {letter.body}
            </p>

            {/* Publishing Metadata & Share */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-display text-xs font-bold text-primary">
                  S
                </div>
                <div>
                  <span className="font-semibold text-foreground">{letter.author}</span>
                  <span className="mx-2 text-border">·</span>
                  <span>{letter.date}</span>
                  <span className="mx-2 text-border">·</span>
                  <span>{letter.readTime}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                aria-label="Copy article link"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-primary" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Editorial Feature Image */}
        <div className="mx-auto max-w-[800px] px-6 pt-10 sm:pt-14">
          <figure className="overflow-hidden rounded-3xl border border-border bg-secondary/30 shadow-[var(--shadow-soft)]">
            <img
              src={letter.image}
              alt={letter.title}
              className="h-auto w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.01]"
              width="1376"
              height="768"
              loading="eager"
            />
          </figure>
        </div>

        {/* Editorial Body */}
        <article className="mx-auto max-w-[740px] px-6 py-12 sm:py-16">
          <div className="space-y-12">
            {letter.content.map((section, idx) => (
              <section key={idx} className={idx > 0 ? "pt-6" : ""}>
                {section.heading && (
                  <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem]">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-6">
                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="font-serif text-[18px] leading-[1.85] tracking-[-0.003em] text-foreground/85 sm:text-[19.5px]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Editorial Signoff Box */}
          <footer className="mt-20 border-t border-border/80 pt-10">
            <div className="rounded-2xl border border-border bg-secondary/30 p-8">
              <p className="text-sm font-semibold text-foreground">Stradmont Systems</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We design and build specialised SaaS platforms for institutions where technical and
                financial workflows intersect. If you are re-evaluating core software solutions,
                our team welcomes technical dialogue.
              </p>
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Write to the team
                </Link>
              </div>
            </div>
          </footer>
        </article>

        {/* Read Next Section */}
        {otherLetters.length > 0 && (
          <aside className="border-t border-border bg-secondary/20 py-20">
            <div className="mx-auto max-w-5xl px-6">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-primary">Archive</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                    Further reading & studies
                  </h3>
                </div>
                <Link to="/letters" className="text-xs font-medium text-primary hover:underline transition-all duration-200 ease-out">
                  All letters &rarr;
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {otherLetters.map((item) => (
                  <Link
                    key={item.slug}
                    to="/letters/$slug"
                    params={{ slug: item.slug }}
                    className="card-lab group flex flex-col justify-between overflow-hidden rounded-3xl p-0 no-underline transition-all duration-300 ease-out hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-secondary/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur-xs">
                          {item.kind} {item.number}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          <span>{item.readTime}</span>
                        </div>
                        <h4 className="mt-2.5 font-display text-base font-bold leading-snug text-foreground transition-colors duration-200 ease-out group-hover:text-primary sm:text-lg">
                          {item.title}
                        </h4>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <span>Read {item.kind.toLowerCase()}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
