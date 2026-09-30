import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FlowLines } from "@/components/FlowLines";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { fetchLetters } from "@/lib/api";
import { letters as staticLetters } from "@/lib/letters-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  loader: async () => {
    const items = await fetchLetters();
    return { letters: items };
  },
  head: () => ({
    meta: [
      { title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}` },
      {
        name: "description",
        content: `${SITE_CONFIG.tagline}. ${SITE_CONFIG.name} finds the chaos inside technology and finance operations and replaces it with systems that hold.`,
      },
      {
        property: "og:title",
        content: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
      },
      {
        property: "og:description",
        content:
          "We find the chaos in technology and finance operations, and build the systems that end it.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_CONFIG.url}/` },
      {
        property: "og:image",
        content: SITE_CONFIG.ogImage,
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
      },
      {
        name: "twitter:description",
        content:
          "We find the chaos in technology and finance operations, and build the systems that end it.",
      },
      {
        name: "twitter:image",
        content: SITE_CONFIG.ogImage,
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_CONFIG.url}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_CONFIG.url}/#organization`,
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.url,
              logo: `${SITE_CONFIG.url}/favicon.svg`,
              email: SITE_CONFIG.contact.email,
              telephone: SITE_CONFIG.contact.phoneSchema,
              sameAs: [SITE_CONFIG.socials.linkedin.href, SITE_CONFIG.socials.instagram.href],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_CONFIG.url}/#website`,
              url: SITE_CONFIG.url,
              name: SITE_CONFIG.name,
              publisher: {
                "@id": `${SITE_CONFIG.url}/#organization`,
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const pills = [{ label: "Research", style: "left-[8%] top-[14%]", delay: "0s" }];

const rightPills = [
  { label: "Systems", style: "right-[6%] top-[58%]", delay: "0.4s" },
  { label: "Capital", style: "right-[2%] top-[73%]", delay: "1.2s" },
];

const processSteps = [
  {
    step: "Phase 01",
    title: "Find the chaos",
    description: "Audit workflows and map operational choke points.",
  },
  {
    step: "Phase 02",
    title: "Study the cause",
    description: "Isolate root causes across tooling and data silos.",
  },
  {
    step: "Phase 03",
    title: "Design the system",
    description: "Architect resilient foundations and automated pipelines.",
  },
  {
    step: "Phase 04",
    title: "Keep it running",
    description: "Deploy with continuous monitoring and operational care.",
  },
];

const faqCategories = [
  {
    id: "general",
    label: "General",
    items: [
      {
        q: "What does Stradmont Solutions do?",
        a: "We find the chaos inside technology and finance operations. Scattered data, manual work, tools that don't talk to each other. We replace it with clear systems that hold. We research, architect, and engineer those systems, then stay to make sure they keep running.",
      },
      {
        q: "Who do you typically work with?",
        a: "Growth-stage companies in financial services and technology that have outgrown their initial processes. Our clients typically have smart teams but inherited systems that create invisible friction every day.",
      },
      {
        q: "Where are you based?",
        a: "Stradmont Solutions operates remotely, with a core team present across multiple time zones to serve clients wherever they are.",
      },
      {
        q: "How do I get started?",
        a: "Fill in the contact form on our site or write to us directly. We'll schedule a short call to understand your situation before proposing anything.",
      },
    ],
  },
  {
    id: "products",
    label: "Our Products",
    items: [
      {
        q: "What is Builders Base?",
        a: "Builders Base is software that helps insurance distribution organizations develop their people, support their leaders, and grow their organizations. Visit thebuildersbase.com to learn more.",
      },
      {
        q: "Is Builders Base available to the public?",
        a: "Builders Base is currently in active development. Early access is available for select teams. Get in touch to discuss whether you qualify.",
      },
    ],
  },
  {
    id: "working-with-us",
    label: "Working With Us",
    items: [
      {
        q: "What does an engagement look like?",
        a: "We begin with a deep audit of your existing operational and technical workflows to identify points of friction. From there, we architect a tailored system, engineer it alongside your team, and ensure smooth handover and ongoing reliability.",
      },
      {
        q: "How quickly can Stradmont begin?",
        a: "We work with a select number of institutions at a time to maintain focus. Following an initial briefing call, we can usually start the research phase within two weeks.",
      },
      {
        q: "Do you replace internal teams?",
        a: "No. We collaborate directly with your operations, finance, and engineering leaders to eliminate manual bottlenecks, empowering your existing team to operate at scale without burnout.",
      },
    ],
  },
];

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="group">
            <button
              type="button"
              id={`faq-btn-${i}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-lg"
            >
              <span className="transition-colors group-hover:text-primary">{item.q}</span>
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 ${
                  isOpen
                    ? "rotate-180 border-primary/40 bg-primary/10 text-primary"
                    : "text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 pt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Index() {
  const loaderData = Route.useLoaderData();
  const letters = loaderData?.letters ?? staticLetters;
  const [activeTab, setActiveTab] = useState(0);
  const featuredLetter = letters[0];
  const secondLetter = letters[2] ?? letters[1];

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main id="main-content" className="animate-page-transition">
        {/* ---------------- Hero ---------------- */}
        <section className="relative isolate overflow-hidden surface-ambient">
          <FlowLines />

          {/* Floating capability pills */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {pills.map((p, i) => (
              <span
                key={`pos-${p.label}`}
                className={`animate-float absolute ${p.style} rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lift`}
                style={{ animationDelay: p.delay, rotate: `${-8 + i * 5}deg` }}
              >
                {p.label}
              </span>
            ))}
            {rightPills.map((p, i) => (
              <span
                key={p.label}
                className={`animate-float absolute ${p.style} rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lift`}
                style={{ animationDelay: p.delay, rotate: `${10 + i * 6}deg` }}
              >
                {p.label}
              </span>
            ))}
          </div>

          <div className="relative mx-auto flex hero-section max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-6 sm:pb-24 sm:pt-40">
            <span className="eyebrow animate-rise">Systems over chaos</span>

            <h1
              className="animate-rise mt-5 hero-title text-foreground sm:mt-6"
              style={{ animationDelay: "60ms" }}
            >
              Where there is chaos,
              <br />
              we build systems.
            </h1>

            <p
              className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg"
              style={{ animationDelay: "140ms" }}
            >
              Scattered data, manual work, tools that don't talk to each other. We go where the
              chaos is in technology and finance, and replace it with clear systems that hold.
            </p>

            <div
              className="animate-rise mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                to="/products"
                className="group btn-primary w-full sm:w-auto sm:justify-start"
                style={{ background: "var(--gradient-electric)" }}
              >
                Our products
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <a href="#letters" className="btn-outline w-full sm:w-auto">
                Read our letters
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- Overview ---------------- */}
        <section id="overview" className="scroll-mt-28 border-y border-border bg-background">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-6 sm:py-20 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div>
              <span className="eyebrow">Our philosophy</span>
              <h2 className="mt-4 section-heading">Systems over chaos.</h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Every business has chaos somewhere: a process nobody owns, numbers that never match,
                work done twice. That is where we start. We find it, study it, and replace it with a
                system that runs the same way every time.
              </p>
              <p>
                The platforms we build, including{" "}
                <span className="font-semibold text-foreground">Builders Base</span>, began as chaos
                we found and solved.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px border-t border-border bg-border md:grid-cols-4">
            {processSteps.map((m) => (
              <div
                key={m.step}
                className="bg-background p-4 text-left transition-colors hover:bg-secondary/40 sm:p-6"
              >
                <span className="text-xs font-semibold text-primary">{m.step}</span>
                <div className="mt-2 text-base font-bold text-foreground sm:text-lg">{m.title}</div>
                <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {m.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className="scroll-mt-28 border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-24">
            {/* Heading */}
            <div className="mb-12 text-center">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-4 section-heading">Frequently asked questions.</h2>
            </div>

            {/* Tab switcher with sliding pill indicator */}
            <div className="relative mb-8 grid grid-cols-3 rounded-2xl border border-border bg-background p-1 shadow-xs sm:rounded-full">
              {/* Fluid sliding pill */}
              <div
                className="absolute top-1 bottom-1 left-1 rounded-full bg-primary shadow-lift transition-transform duration-300 ease-out"
                style={{
                  width: "calc((100% - 8px) / 3)",
                  transform: `translateX(calc(${activeTab} * 100%))`,
                }}
              />

              {faqCategories.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  id={`faq-tab-${cat.id}`}
                  onClick={() => setActiveTab(idx)}
                  className={`relative z-10 rounded-xl py-2.5 px-1.5 text-center text-xs font-medium leading-tight transition-colors duration-200 sm:rounded-full sm:px-2 sm:text-sm ${
                    activeTab === idx
                      ? "text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion with smooth entrance */}
            <div
              key={activeTab}
              style={{
                animation: "stradmont-rise 280ms cubic-bezier(0.22, 1, 0.36, 1) both",
              }}
            >
              <FaqAccordion items={faqCategories[activeTab]?.items ?? []} />
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Still have a question?{" "}
              <Link
                to="/contact"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Write to us
              </Link>
            </p>
          </div>
        </section>

        {/* ---------------- Stradmont Letters ---------------- */}
        <section id="letters" className="scroll-mt-28 border-y border-border bg-background">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-24">
            {/* Heading */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
              <div>
                <span className="eyebrow">Stradmont Letters</span>
                <h2 className="mt-4 section-heading">Notes and studies.</h2>
              </div>
              <Link
                to="/letters"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Read all letters
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>

            {/* Card grid — mirrors Circle1 Letters layout */}
            {featuredLetter && secondLetter && (
              <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                {/* Featured large card (left column) */}
                <Link
                  to="/letters/$slug"
                  params={{ slug: featuredLetter.slug }}
                  className="card-lab group relative flex flex-col justify-end overflow-hidden rounded-3xl p-6 text-background min-h-72 no-underline sm:p-8 sm:min-h-96"
                >
                  {/* Background cover image */}
                  <img
                    src={featuredLetter.image}
                    alt={featuredLetter.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/35" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold text-primary">
                        {featuredLetter.kind} {featuredLetter.number}
                      </span>
                      <span className="text-xs text-white/70">{featuredLetter.date}</span>
                      <span className="text-xs text-white/70">· {featuredLetter.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold leading-snug text-white">
                      {featuredLetter.title}
                    </h3>
                    <p className="mt-3 hidden text-sm text-white/80 leading-relaxed sm:block">
                      {featuredLetter.body}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                      Read full
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Right column — top card + bottom "all letters" card */}
                <div className="flex flex-col gap-4">
                  {/* Second featured letter with data-layer.jpg */}
                  <article className="card-lab group flex flex-col overflow-hidden rounded-3xl bg-secondary/80 p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative aspect-[16/10] sm:aspect-square sm:w-44 shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-border bg-secondary/50">
                        <img
                          src={secondLetter.image}
                          alt={secondLetter.title}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold text-primary">
                              {secondLetter.kind} {secondLetter.number}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {secondLetter.date}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              · {secondLetter.readTime}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
                            {secondLetter.title}
                          </h3>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                            {secondLetter.body}
                          </p>
                        </div>
                        <Link
                          to="/letters/$slug"
                          params={{ slug: secondLetter.slug }}
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1"
                        >
                          Read study
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>

                  {/* "Everything we've written" CTA card */}
                  <Link
                    to="/letters"
                    className="card-lab group flex items-center justify-between rounded-3xl bg-foreground p-6 text-background min-h-32 no-underline sm:p-8 sm:min-h-40"
                  >
                    <div>
                      <p className="text-lg font-semibold leading-snug">
                        Everything we have written so far.
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                        Read the letters
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="shrink-0 opacity-20"
                    >
                      <rect x="8" y="10" width="32" height="28" rx="3" />
                      <path d="M14 18h20M14 24h14M14 30h10" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section className="relative isolate overflow-hidden bg-background">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <FlowLines className="scale-x-[-1]" />
          </div>
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 sm:py-24 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="eyebrow">Contact us</span>
              <h2 className="mt-5 section-heading">Found chaos in your business?</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Tell us where things break down. We will help you turn it into a system.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
