import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchCareers, CareerRecord } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  ArrowUpRight,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Cpu,
  Globe2,
  Mail,
} from "lucide-react";

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
      { title: `Careers | Engineering & Systems at ${SITE_CONFIG.name}` },
      {
        name: "description",
        content: `Join Stradmont Solutions. We engineer specialised SaaS platforms, distributed workflow systems, and infrastructure for technology and finance institutions.`,
      },
      { property: "og:title", content: `Careers | Engineering & Systems at ${SITE_CONFIG.name}` },
      {
        property: "og:description",
        content: `Join Stradmont Solutions. High-trust autonomy, specialised engineering craft, and remote-first culture.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_CONFIG.url}/careers` },
      {
        property: "og:image",
        content: SITE_CONFIG.ogImage,
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_CONFIG.url}/careers` }],
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
              name: "Careers",
              item: `${SITE_CONFIG.url}/careers`,
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

  return (
    <div className="surface-ambient min-h-screen text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
      <SiteNav />

      <main id="main-content" className="pt-28 sm:pt-36 pb-20">
        {/* Hero Section */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Engineering &amp; Talent</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Build high-assurance software with high-trust autonomy.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              We engineer specialised SaaS platforms, transaction backbones, and workflow software
              for institutions where correctness and determinism matter. We are always looking for
              unusually capable engineers and architects who care deeply about their craft.
            </p>
          </div>

          {/* Working Culture Grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="card-lab p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground">High-Trust Autonomy</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Zero bureaucracy, minimal synchronous meetings, and clear domain ownership. We hire
                experts and empower them to make decisive architectural calls.
              </p>
            </div>

            <div className="card-lab p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground">Engineering Craft</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We obsess over clean system boundaries, sub-second latencies, type safety, and resilient
                concurrency patterns over fragile shortcuts.
              </p>
            </div>

            <div className="card-lab p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Globe2 className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground">Remote-First Model</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Work from wherever you produce your best thinking. We prioritize asynchronous written
                clarity and results over physical presence.
              </p>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="mt-16 sm:mt-20 border-t border-border/60 pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Open Opportunities
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Explore current positions across systems architecture, product, and finance technology.
                </p>
              </div>

              {departments.length > 2 && (
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedDept === dept
                          ? "bg-foreground text-background shadow-xs"
                          : "border border-border/80 bg-background/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Opportunities List */}
            <div className="mt-8 space-y-4">
              {filteredCareers.length === 0 ? (
                <div className="card-lab p-10 text-center rounded-2xl border border-border/80">
                  <Briefcase className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-semibold text-foreground">No open roles in this category right now</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check back soon or send an open application below.
                  </p>
                </div>
              ) : (
                filteredCareers.map((c) => (
                  <Link
                    key={c.id}
                    to="/careers/$slug"
                    params={{ slug: c.slug }}
                    className="group card-lab block rounded-2xl border border-border/80 p-6 sm:p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-soft"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {c.department}
                          </span>
                          {c.isFeatured && (
                            <span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-500">
                              Featured
                            </span>
                          )}
                          <span className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            {c.type}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                          {c.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {c.summary}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span>{c.location}</span>
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span>{c.experience}</span>
                          </span>
                        </div>
                      </div>

                      <div className="sm:self-center shrink-0">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <span>View Role &amp; Apply</span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* General Inquiries Box */}
            <div className="mt-14 card-lab rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 to-secondary/30 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Open Applications</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  Don't see your exact role?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We are always open to meeting extraordinary system architects, distributed systems
                  engineers, and quantitative builders. Send your GitHub, portfolio, or past work directly
                  to our team.
                </p>
              </div>

              <a
                href="mailto:careers@stradmontsolutions.com?subject=Open%20Application%20%E2%80%94%20Stradmont%20Solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5 shrink-0"
                style={{ background: "var(--gradient-electric)" }}
              >
                <span>Email careers@stradmontsolutions.com</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
