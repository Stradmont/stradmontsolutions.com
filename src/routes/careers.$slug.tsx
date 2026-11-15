import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchCareerBySlug, CareerRecord } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/careers/$slug")({
  loader: async ({ params }) => {
    try {
      const career = await fetchCareerBySlug(params.slug);
      if (!career) throw notFound();
      return { career };
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => {
    const career = loaderData?.career as CareerRecord | undefined;
    const title = career
      ? `${career.title} | Careers at ${SITE_CONFIG.name}`
      : `Career Opportunity | ${SITE_CONFIG.name}`;
    const desc = career?.summary || `Career opportunity at ${SITE_CONFIG.name}`;
    const normalizedType = career?.type?.toLowerCase().includes("part")
      ? "PART_TIME"
      : career?.type?.toLowerCase().includes("contract")
        ? "CONTRACTOR"
        : "FULL_TIME";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_CONFIG.url}/careers/${career?.slug}` },
        { property: "og:image", content: SITE_CONFIG.ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: SITE_CONFIG.ogImage },
      ],
      links: [
        {
          rel: "canonical",
          href: `${SITE_CONFIG.url}/careers/${career?.slug}`,
        },
      ],
      scripts: career
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "JobPosting",
                    "@id": `${SITE_CONFIG.url}/careers/${career.slug}#jobposting`,
                    title: career.title,
                    description: career.descriptionHtml || career.summary,
                    datePosted: career.createdAt,
                    employmentType: normalizedType,
                    directApply: true,
                    hiringOrganization: {
                      "@type": "Organization",
                      "@id": `${SITE_CONFIG.url}/#organization`,
                      name: SITE_CONFIG.name,
                      sameAs: SITE_CONFIG.url,
                      logo: `${SITE_CONFIG.url}/favicon.svg`,
                    },
                    jobLocationType: "TELECOMMUTE",
                    applicantLocationRequirements: {
                      "@type": "Country",
                      name: "CA",
                    },
                  },
                  {
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
                        name: "Careers",
                        item: `${SITE_CONFIG.url}/careers`,
                      },
                      {
                        "@type": "ListItem",
                        position: 3,
                        name: career.title,
                        item: `${SITE_CONFIG.url}/careers/${career.slug}`,
                      },
                    ],
                  },
                ],
              }),
            },
          ]
        : [],
    };
  },
  component: CareerDetailPage,
  notFoundComponent: CareerNotFound,
});

function CareerNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main
        id="main-content"
        className="flex min-h-[70svh] flex-col items-center justify-center px-6 text-center"
      >
        <span className="eyebrow">404</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          Position not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          This role may have been filled or is no longer accepting applications.
        </p>
        <Link
          to="/careers"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to careers
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function CareerDetailPage() {
  const { career } = Route.useLoaderData() as { career: CareerRecord };

  const applyEmail = career.applyEmail || `careers@${SITE_CONFIG.domain}`;
  const applySubject = encodeURIComponent(
    `Application: ${career.title} (${career.slug}) — [Your Name]`,
  );
  const applyBody = encodeURIComponent(
    `Hello Stradmont Team,\n\nI would like to apply for the ${career.title} role (${career.department}).\n\nLinks & background:\n- GitHub / Portfolio / LinkedIn: \n- Relevant work: \n\nBest regards,\n[Your Name]`,
  );
  const mailtoUrl = `mailto:${applyEmail}?subject=${applySubject}&body=${applyBody}`;
  const applyHref = career.applyUrl || mailtoUrl;

  const metaItems = [career.department, career.location, career.type, career.experience].filter(
    Boolean,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main id="main-content" className="animate-page-transition">
        {/* ── Header ── */}
        <header className="surface-ambient border-b border-border pt-32 pb-12 sm:pt-44 sm:pb-16">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <Link
              to="/careers"
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span>Careers</span>
            </Link>

            <h1 className="mt-5 article-title text-foreground">{career.title}</h1>

            {career.summary && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {career.summary}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                {metaItems.map((item, idx) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {idx > 0 && <span className="text-border">·</span>}
                    <span className={idx === 0 ? "font-semibold text-primary" : ""}>{item}</span>
                  </span>
                ))}
              </div>

              <a
                href={applyHref}
                target={career.applyUrl ? "_blank" : undefined}
                rel={career.applyUrl ? "noopener noreferrer" : undefined}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lift transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--gradient-electric)" }}
              >
                <span>Apply for this role</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </header>

        {/* ── Single-Column Role Description ── */}
        <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
          <div
            className="max-w-none text-base leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 first:[&_h2]:mt-0 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-6 [&_ol]:space-y-2 [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline hover:[&_a]:opacity-80"
            dangerouslySetInnerHTML={{ __html: career.descriptionHtml }}
          />

          {/* ── Bottom Apply Strip ── */}
          <div className="mt-14 flex flex-col gap-5 rounded-3xl border border-border bg-secondary/40 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
            <div>
              <p className="font-semibold text-foreground">Ready to apply?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Send your resume, GitHub, or portfolio to{" "}
                <a href={mailtoUrl} className="font-medium text-primary hover:underline">
                  {applyEmail}
                </a>
                .
              </p>
            </div>
            <a
              href={applyHref}
              target={career.applyUrl ? "_blank" : undefined}
              rel={career.applyUrl ? "noopener noreferrer" : undefined}
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ background: "var(--gradient-electric)" }}
            >
              <span>Apply now</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
