import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getLetterBySlug, letters } from "@/lib/letters-data";
import { ArrowLeft, Clock, Calendar, Share2, Check } from "lucide-react";
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
          content: "https://stradmontsolutions.com/og-image.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${letter.title} | Stradmont Letters` },
        { name: "twitter:description", content: letter.body },
        {
          name: "twitter:image",
          content: "https://stradmontsolutions.com/og-image.png",
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
      <main id="main-content" className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <span className="eyebrow text-primary">404</span>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          Letter not found
        </h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          The letter or note you are looking for does not exist or may have been archived.
        </p>
        <Link
          to="/letters"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:border-primary/40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all letters
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

  // Find other letters for recommendation
  const otherLetters = letters.filter((l) => l.slug !== letter.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main id="main-content">
        {/* Top Hero / Header Section */}
        <section className="surface-ambient border-b border-border pt-36 pb-16 sm:pt-44 sm:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            {/* Back link */}
            <Link
              to="/letters"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to letters
            </Link>

            {/* Letter Meta */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                {letter.kind}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {letter.date}
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {letter.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.12] text-foreground tracking-tight">
              {letter.title}
            </h1>

            {/* Lead description / abstract */}
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground font-medium border-l-2 border-primary/50 pl-4">
              {letter.body}
            </p>

            {/* Author bar & Share action */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div>
                <p className="text-sm font-bold text-foreground">{letter.author}</p>
                <p className="text-xs text-muted-foreground">{letter.authorTitle}</p>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-secondary hover:border-primary/30"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" />
                    <span>Link copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Share letter</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <article className="prose prose-neutral max-w-none text-foreground">
            {letter.content.map((section, idx) => (
              <div key={idx} className={idx > 0 ? "mt-12 pt-8 border-t border-border/60" : ""}>
                {section.heading && (
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem] mb-5">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-5">
                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base sm:text-[1.0625rem] leading-[1.8] text-muted-foreground selection:bg-primary/20"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </article>

          {/* Letter signoff */}
          <div className="mt-16 rounded-2xl border border-border bg-secondary/30 p-8 text-center sm:text-left">
            <span className="eyebrow text-primary">Stradmont Laboratory</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              These notes and studies reflect real architectural patterns encountered during system implementations.
              For questions, critiques, or to discuss how these principles apply to your operational stack, reach out to our team.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-all hover:-translate-y-0.5"
              >
                Discuss with Stradmont
              </Link>
            </div>
          </div>
        </section>

        {/* Read Next / Other Letters */}
        {otherLetters.length > 0 && (
          <section className="border-t border-border bg-secondary/20 py-20">
            <div className="mx-auto max-w-5xl px-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="eyebrow">Continue reading</span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
                    More from Stradmont Letters
                  </h2>
                </div>
                <Link
                  to="/letters"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
                >
                  All letters &rarr;
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {otherLetters.map((item) => (
                  <Link
                    key={item.slug}
                    to="/letters/$slug"
                    params={{ slug: item.slug }}
                    className="card-lab group flex flex-col p-7 transition-all no-underline"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">
                        {item.kind}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {item.body}
                    </p>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <span>Read letter</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
