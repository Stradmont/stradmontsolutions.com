import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FlowLines } from "@/components/FlowLines";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { CapabilityMap } from "@/components/CapabilityMap";
import { fetchLetters } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  loader: async () => {
    const items = await fetchLetters();
    return { letters: items };
  },
  head: () => ({
    meta: [
      { title: `${SITE_CONFIG.name} | SaaS, AI, Cloud & Cybersecurity` },
      {
        name: "description",
        content:
          "Stradmont Solutions builds SaaS products and helps organizations with cybersecurity, cloud infrastructure, data systems, and AI.",
      },
      {
        property: "og:title",
        content: `${SITE_CONFIG.name} | SaaS, AI, Cloud & Cybersecurity`,
      },
      {
        property: "og:description",
        content:
          "We build SaaS products and help organizations with cybersecurity, cloud infrastructure, data systems, and AI.",
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
        content: `${SITE_CONFIG.name} | SaaS, AI, Cloud & Cybersecurity`,
      },
      {
        name: "twitter:description",
        content:
          "We build SaaS products and help organizations with cybersecurity, cloud infrastructure, data systems, and AI.",
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
              alternateName: SITE_CONFIG.shortName,
              url: SITE_CONFIG.url,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_CONFIG.url}/favicon.svg`,
              },
              image: SITE_CONFIG.ogImage,
              description:
                "Stradmont Solutions builds SaaS products and works with organizations on cybersecurity, cloud infrastructure, data systems, and AI.",
              knowsAbout: [
                "SaaS Development",
                "Cybersecurity",
                "Cloud Infrastructure",
                "Data & AI",
                "Web & API Development",
              ],
              email: SITE_CONFIG.contact.email,
              telephone: SITE_CONFIG.contact.phoneSchema,
              address: {
                "@type": "PostalAddress",
                addressRegion: "ON",
                addressCountry: "CA",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: SITE_CONFIG.contact.phoneSchema,
                email: SITE_CONFIG.contact.email,
                contactType: "customer support",
                url: `${SITE_CONFIG.url}/contact`,
              },
              sameAs: [SITE_CONFIG.socials.linkedin.href, SITE_CONFIG.socials.instagram.href],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_CONFIG.url}/#website`,
              url: SITE_CONFIG.url,
              name: SITE_CONFIG.name,
              alternateName: SITE_CONFIG.shortName,
              description: SITE_CONFIG.tagline,
              publisher: {
                "@id": `${SITE_CONFIG.url}/#organization`,
              },
              hasPart: [
                { "@id": `${SITE_CONFIG.url}/products#webpage` },
                { "@id": `${SITE_CONFIG.url}/letters#webpage` },
                { "@id": `${SITE_CONFIG.url}/careers#webpage` },
                { "@id": `${SITE_CONFIG.url}/contact#webpage` },
              ],
            },
            {
              "@type": "ItemList",
              "@id": `${SITE_CONFIG.url}/#navigation`,
              name: `${SITE_CONFIG.name} Site Navigation`,
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  "@id": `${SITE_CONFIG.url}/products#webpage`,
                  position: 1,
                  name: "Our Products",
                  description:
                    "Software products built by Stradmont Solutions, including Builders Base.",
                  url: `${SITE_CONFIG.url}/products`,
                },
                {
                  "@type": "SiteNavigationElement",
                  "@id": `${SITE_CONFIG.url}/letters#webpage`,
                  position: 2,
                  name: "Stradmont Letters",
                  description:
                    "Articles and technical notes on software engineering, security, cloud, and data.",
                  url: `${SITE_CONFIG.url}/letters`,
                },
                {
                  "@type": "SiteNavigationElement",
                  "@id": `${SITE_CONFIG.url}/careers#webpage`,
                  position: 3,
                  name: "Careers",
                  description:
                    "Open positions at Stradmont Solutions across software engineering, security, cloud, and AI.",
                  url: `${SITE_CONFIG.url}/careers`,
                },
                {
                  "@type": "SiteNavigationElement",
                  "@id": `${SITE_CONFIG.url}/contact#webpage`,
                  position: 4,
                  name: "Contact Us",
                  description:
                    "Get in touch with Stradmont Solutions about products, security, cloud projects, or partnerships.",
                  url: `${SITE_CONFIG.url}/contact`,
                },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${SITE_CONFIG.url}/#webpage`,
              url: `${SITE_CONFIG.url}/`,
              name: `${SITE_CONFIG.name} | SaaS, AI, Cloud & Cybersecurity`,
              isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
              about: { "@id": `${SITE_CONFIG.url}/#organization` },
              description:
                "Stradmont Solutions builds SaaS products and helps organizations with cybersecurity, cloud infrastructure, data systems, and AI.",
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_CONFIG.url}/#faq`,
              mainEntity: faqCategories.flatMap((cat) =>
                cat.items.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.a,
                  },
                })),
              ),
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const pills = [{ label: "SaaS", style: "left-[7%] top-[15%]", delay: "0s" }];

const rightPills = [
  { label: "Cybersecurity", style: "right-[5%] top-[56%]", delay: "0.4s" },
  { label: "Cloud & AI", style: "right-[3%] top-[73%]", delay: "1.2s" },
];

const corePillars = [
  {
    index: "01",
    tag: "SaaS & Software Development",
    title: "Practical software built for everyday work.",
    description:
      "We build our own SaaS products, like Builders Base, and develop custom web applications and APIs that replace slow manual tasks with clean, dependable tools.",
    highlights: ["SaaS Platforms", "Web & API Development", "System Modernization"],
  },
  {
    index: "02",
    tag: "Cybersecurity",
    title: "Keeping your applications and data safe.",
    description:
      "We test software for vulnerabilities, review code and cloud setups, tighten access controls, and help teams fix security gaps before they become real problems.",
    highlights: ["Security Audits", "Penetration Testing", "Cloud & Access Security"],
  },
  {
    index: "03",
    tag: "Data & AI",
    title: "Clear data and useful automation.",
    description:
      "We bring scattered company data into clean pipelines, straightforward reporting, and private AI tools that help your team get work done faster.",
    highlights: ["AI Workflows", "Data Pipelines", "Reporting & Analytics"],
  },
  {
    index: "04",
    tag: "Cloud & DevOps",
    title: "Reliable cloud infrastructure.",
    description:
      "We set up and look after cloud environments, containers, and deployment pipelines so your systems stay fast, stable, and easy to maintain.",
    highlights: ["Cloud Setup & Migration", "Containers & Kubernetes", "CI/CD Pipelines"],
  },
];

const processSteps = [
  {
    step: "Phase 01",
    title: "Understand the problem",
    description: "Review your current tools, workflows, and security gaps.",
  },
  {
    step: "Phase 02",
    title: "Plan the architecture",
    description: "Design a clear system structure with strong security from day one.",
  },
  {
    step: "Phase 03",
    title: "Build and test",
    description: "Develop the software, test thoroughly, and verify every integration.",
  },
  {
    step: "Phase 04",
    title: "Launch and support",
    description: "Deploy smoothly and keep the system monitored, updated, and secure.",
  },
];

const faqCategories = [
  {
    id: "general",
    label: "General",
    items: [
      {
        q: "What does Stradmont Solutions do?",
        a: "We build our own SaaS products, like Builders Base, and work directly with companies on software development, cybersecurity, cloud infrastructure, and data systems.",
      },
      {
        q: "Who do you typically work with?",
        a: "We work with growing companies in technology, finance, and insurance that need reliable software built or want to strengthen the security and infrastructure of their existing systems.",
      },
      {
        q: "Where are you based?",
        a: "We are based in Ontario, Canada, and work remotely with teams and clients across different time zones.",
      },
      {
        q: "How do I get started?",
        a: "Send us a message through the contact form or email us directly. We will set up a short call to talk through what you need.",
      },
    ],
  },
  {
    id: "products",
    label: "Our Products",
    items: [
      {
        q: "What is Builders Base?",
        a: "Builders Base is our software platform that helps insurance distribution organizations train their people, support their leaders, and grow their teams. Visit thebuildersbase.com to learn more.",
      },
      {
        q: "Is Builders Base available to the public?",
        a: "Builders Base is currently in development, with early access open to select teams. Reach out if you would like to try it.",
      },
    ],
  },
  {
    id: "security-engineering",
    label: "Security & Engineering",
    items: [
      {
        q: "What kind of security work do you do?",
        a: "We review application code and cloud environments, run penetration tests, fix authentication and access control issues, and help teams set up secure deployment practices.",
      },
      {
        q: "Can you review or secure an existing application?",
        a: "Yes. We regularly audit existing web apps and cloud setups to find security risks, improve performance, and tighten infrastructure without interrupting your users.",
      },
      {
        q: "Do you work with internal engineering teams?",
        a: "Yes. We work alongside your developers and operations leads to ship new features, clean up technical bottlenecks, and improve security practices.",
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
  const { letters } = Route.useLoaderData();
  const [activeTab, setActiveTab] = useState(0);
  const featuredLetter = letters[0];
  const secondLetter = letters[1];

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
            <span className="eyebrow animate-rise">Stradmont Solutions</span>

            <h1
              className="animate-rise mt-5 hero-title text-foreground sm:mt-6"
              style={{ animationDelay: "60ms" }}
            >
              Building Products That
              <br />
              Move the World Forward.
            </h1>

            <p
              className="animate-rise mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg"
              style={{ animationDelay: "140ms" }}
            >
              We build products that solve real problems, simplify daily work, and keep critical
              systems secure. Every platform starts with a clear purpose and is built to last.
            </p>

            <div
              className="animate-rise mt-8 flex justify-center sm:mt-10"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                to="/products"
                className="group btn-primary w-full sm:w-auto"
                style={{ background: "var(--gradient-electric)" }}
              >
                Our Products
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
            </div>
          </div>
        </section>

        {/* ---------------- Overview ---------------- */}
        <section id="overview" className="scroll-mt-28 border-y border-border bg-background">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-6 sm:py-20 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="mt-4 section-heading">Software built and secured properly.</h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                As companies grow, their tools often get tangled: disconnected software, manual
                workarounds, and overlooked security gaps. That is where we step in. We build clean
                software and secure the infrastructure behind it.
              </p>
              <p>
                Alongside client systems, we develop and run our own SaaS products, including{" "}
                <span className="font-semibold text-foreground">Builders Base</span>.
              </p>
            </div>
          </div>

          {/* Dual Pillars: SaaS + Security */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px border-t border-border bg-border md:grid-cols-2">
            {corePillars.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-background p-6 transition-colors hover:bg-secondary/30 sm:p-10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold text-primary">{pillar.index}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="text-xs font-semibold text-primary">{pillar.tag}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground sm:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {pillar.highlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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

        {/* ---------------- Capability Map (Radar & Orbit) ---------------- */}
        <CapabilityMap />

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
            {(() => {
              const currentCategory = faqCategories[activeTab];
              if (!currentCategory) return null;
              return (
                <div
                  key={activeTab}
                  style={{
                    animation: "stradmont-rise 280ms cubic-bezier(0.22, 1, 0.36, 1) both",
                  }}
                >
                  <FaqAccordion items={currentCategory.items} />
                </div>
              );
            })()}

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
              <h2 className="mt-5 section-heading">
                Tell us what you are building.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Whether you are launching a new product, modernizing an existing platform, or
                looking to secure your systems, we would love to talk.
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
