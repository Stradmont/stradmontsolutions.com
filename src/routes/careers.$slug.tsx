import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchCareerBySlug, CareerRecord } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

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

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_CONFIG.url}/careers/${career?.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
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
                "@type": "JobPosting",
                title: career.title,
                description: career.summary,
                datePosted: career.createdAt,
                employmentType: career.type,
                hiringOrganization: {
                  "@type": "Organization",
                  name: SITE_CONFIG.name,
                  sameAs: SITE_CONFIG.url,
                  logo: `${SITE_CONFIG.url}/favicon.svg`,
                },
                jobLocationType: "TELECOMMUTE",
                applicantLocationRequirements: {
                  "@type": "Country",
                  name: "Worldwide",
                },
              }),
            },
          ]
        : [],
    };
  },
  component: CareerDetailPage,
});

function CareerDetailPage() {
  const { career } = Route.useLoaderData() as { career: CareerRecord };

  const applySubject = encodeURIComponent(
    `Application: ${career.title} (${career.slug}) — [Your Name]`,
  );
  const applyBody = encodeURIComponent(
    `Hello Stradmont Hiring Team,\n\nI am writing to express my strong interest in the ${career.title} position (${career.department}).\n\nPlease find my background and work below:\n- LinkedIn/Portfolio/GitHub: \n- Relevant experience summary: \n\nLooking forward to speaking with the team.\n\nBest regards,\n[Your Name]`,
  );
  const mailtoUrl = `mailto:${career.applyEmail || "careers@stradmontsolutions.com"}?subject=${applySubject}&body=${applyBody}`;

  return (
    <div className="surface-ambient min-h-screen text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
      <SiteNav />

      <main id="main-content" className="pt-28 sm:pt-36 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Back Navigation */}
          <div>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to all open positions</span>
            </Link>
          </div>

          {/* Role Header */}
          <header className="mt-8 border-b border-border/70 pb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {career.department}
              </span>
              <span className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                {career.type}
              </span>
              <span className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                {career.experience}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {career.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {career.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{career.location}</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>Published on {new Date(career.createdAt).toLocaleDateString()}</span>
              </span>
            </div>
          </header>

          {/* Content Layout: 2 Columns on desktop */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Description */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: career.descriptionHtml }}
              />
            </div>

            {/* Sticky Application Card */}
            <div className="lg:col-span-1">
              <div className="card-lab rounded-2xl border border-border/80 p-6 sm:p-7 sticky top-28 space-y-5">
                <div>
                  <span className="eyebrow text-primary">Direct Application</span>
                  <h3 className="font-display font-bold text-lg text-foreground mt-1">
                    Apply for this position
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    We review applications continuously. No cover letter required—share your GitHub,
                    portfolio, or past architecture highlights.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={career.applyUrl || mailtoUrl}
                    target={career.applyUrl ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
                    style={{ background: "var(--gradient-electric)" }}
                  >
                    <span>Submit Application</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <div className="text-center">
                    <span className="text-[11px] text-muted-foreground">
                      Or email directly to{" "}
                      <a
                        href={mailtoUrl}
                        className="text-primary hover:underline font-medium"
                      >
                        {career.applyEmail || "careers@stradmontsolutions.com"}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>High-trust autonomy &amp; flexible hours</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Top-tier hardware and tooling stipend</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Direct collaboration with senior leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
