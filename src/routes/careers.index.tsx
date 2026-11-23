import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchCareers, CareerRecord } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowUpRight, Mail } from "lucide-react";

export const Route = createFileRoute("/careers/")({
  loader: async () => {
    try {
      const items = await fetchCareers();
      return { careers: items };
    } catch {
      return { careers: [] };
    }
  },
  head: () => ({
    meta: [
      { title: `Careers | ${SITE_CONFIG.name}` },
      {
        name: "description",
        content: `Open roles and team information at ${SITE_CONFIG.name}.`,
      },
      { property: "og:title", content: `Careers | ${SITE_CONFIG.name}` },
      {
        property: "og:description",
        content: `Open roles and team information at ${SITE_CONFIG.name}.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_CONFIG.url}/careers` },
      {
        property: "og:image",
        content: SITE_CONFIG.ogImage,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Careers | ${SITE_CONFIG.name}` },
      {
        name: "twitter:description",
        content: `Open roles and team information at ${SITE_CONFIG.name}.`,
      },
      { name: "twitter:image", content: SITE_CONFIG.ogImage },
    ],
    links: [{ rel: "canonical", href: `${SITE_CONFIG.url}/careers` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${SITE_CONFIG.url}/careers#webpage`,
              url: `${SITE_CONFIG.url}/careers`,
              name: `Careers | ${SITE_CONFIG.name}`,
              description: `Open roles and team information at ${SITE_CONFIG.name}.`,
              isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
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
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: CareersIndexPage,
});

function CareersIndexPage() {
  const { careers } = Route.useLoaderData() as { careers: CareerRecord[] };
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const departments = [
    "All",
    ...Array.from(new Set(careers.map((c) => c.department).filter(Boolean))),
  ];

  const filteredCareers =
    selectedDept === "All"
      ? careers
      : careers.filter((c) => c.department.toLowerCase() === selectedDept.toLowerCase());

  const careersEmail = `careers@${SITE_CONFIG.domain}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main id="main-content" className="animate-page-transition">
        {/* Header */}
        <section className="surface-ambient border-b border-border">
          <div className="mx-auto max-w-2xl px-5 pb-10 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-44">
            <span className="eyebrow">Careers</span>
            <h1 className="mt-4 page-title text-foreground sm:mt-5">Work with us.</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              We build software for institutions. When we have open positions, we list them here.
            </p>
          </div>
        </section>

        {/* Open Positions */}
        <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
          {departments.length > 2 && (
            <div className="mb-6 flex flex-wrap gap-1.5">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedDept === dept
                      ? "bg-foreground text-background shadow-xs"
                      : "border border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}

          {/* Roles List */}
          {filteredCareers.length === 0 ? (
            <div className="rounded-3xl border border-border bg-secondary/30 px-6 py-12 text-center sm:px-10 sm:py-16">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-foreground sm:text-xl">
                {selectedDept === "All"
                  ? "No open positions right now"
                  : `No open positions in ${selectedDept}`}
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                We do not have any job openings right now. If you would like to reach out, send us an
                email.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3">
                <a
                  href={`mailto:${careersEmail}?subject=${encodeURIComponent(`Hello — ${SITE_CONFIG.name}`)}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ background: "var(--gradient-electric)" }}
                >
                  <span>Send an email</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="text-xs text-muted-foreground">
                  Or write to us at{" "}
                  <a
                    href={`mailto:${careersEmail}`}
                    className="font-medium text-primary hover:underline break-all sm:break-normal"
                  >
                    {careersEmail}
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {filteredCareers.map((c) => {
                  const meta = [c.department, c.location, c.type, c.experience].filter(Boolean);
                  return (
                    <Link
                      key={c.id}
                      to="/careers/$slug"
                      params={{ slug: c.slug }}
                      className="card-lab group flex flex-col justify-between gap-4 rounded-3xl p-5 no-underline sm:flex-row sm:items-center sm:p-8"
                    >
                      <div className="max-w-2xl space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                          {meta.map((item, idx) => (
                            <span key={item} className="inline-flex items-center gap-2">
                              {idx > 0 && <span className="text-border">·</span>}
                              <span className={idx === 0 ? "font-semibold text-primary" : ""}>
                                {item}
                              </span>
                            </span>
                          ))}
                        </div>

                        <h2 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                          {c.title}
                        </h2>

                        {c.summary && (
                          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {c.summary}
                          </p>
                        )}
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                        View role
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom CTA strip */}
              <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-border bg-secondary/40 px-5 py-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
                <div>
                  <p className="font-semibold text-foreground">Want to say hello?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Send your resume or work links to{" "}
                    <a
                      href={`mailto:${careersEmail}`}
                      className="font-medium text-primary hover:underline break-all sm:break-normal"
                    >
                      {careersEmail}
                    </a>
                    .
                  </p>
                </div>
                <a
                  href={`mailto:${careersEmail}?subject=${encodeURIComponent(`Hello — ${SITE_CONFIG.name}`)}`}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ background: "var(--gradient-electric)" }}
                >
                  <span>Send an email</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
