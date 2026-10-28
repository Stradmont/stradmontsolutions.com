import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

interface CapabilityNode {
  id: string;
  name: string;
  code: string;
  symbol: "circle" | "square" | "diamond" | "triangle";
  symbolColor: string;
  category: "core" | "strategy" | "growth";
  summary: string;
  deliverables: string[];
}

const coreCapabilities: CapabilityNode[] = [
  {
    id: "applied-ai",
    name: "applied ai",
    code: "/01",
    symbol: "circle",
    symbolColor: "#2563eb",
    category: "core",
    summary:
      "Production-grade autonomous agents, semantic vector search, and contextual RAG pipelines engineered for mission-critical reliability.",
    deliverables: ["Agentic Workflows", "Vector Search & RAG", "Custom Model Fine-Tuning"],
  },
  {
    id: "product-engineering",
    name: "product engineering",
    code: "/02",
    symbol: "square",
    symbolColor: "#dc2626",
    category: "core",
    summary:
      "End-to-end distributed system architectures, high-throughput microservices, and zero-to-one product development.",
    deliverables: ["Distributed Systems", "Domain-Driven Design", "High-Throughput Backends"],
  },
  {
    id: "architecture-consulting",
    name: "consulting & architecture",
    code: "/03",
    symbol: "diamond",
    symbolColor: "#7c3aed",
    category: "core",
    summary:
      "Translating complex business requirements into scalable technical roadmaps, risk audits, and resilient architectural blueprints.",
    deliverables: ["Architecture Blueprints", "System Audits", "Technology Roadmaps"],
  },
  {
    id: "platform-data",
    name: "platform & data",
    code: "/04",
    symbol: "circle",
    symbolColor: "#059669",
    category: "core",
    summary:
      "Modern lakehouse architectures, event-driven streaming pipelines, and unified data governance built for zero data loss at scale.",
    deliverables: ["Lakehouse Modeling", "Event Streaming", "Schema Governance"],
  },
  {
    id: "web-development",
    name: "web development",
    code: "/05",
    symbol: "triangle",
    symbolColor: "#0284c7",
    category: "core",
    summary:
      "Ultra-fast, accessible web applications engineered with modern SSR and edge technologies, strict type safety, and fluid interactions.",
    deliverables: ["Full-Stack TypeScript", "SSR & Edge Routing", "Sub-Second Latency"],
  },
  {
    id: "devops-cloud",
    name: "devops & cloud",
    code: "/06",
    symbol: "circle",
    symbolColor: "#ea580c",
    category: "core",
    summary:
      "Immutable cloud infrastructure as code, automated Kubernetes clusters, and hardened CI/CD pipelines ensuring high availability.",
    deliverables: [
      "Kubernetes & Containers",
      "Infrastructure as Code",
      "Zero-Downtime Deployments",
    ],
  },
  {
    id: "modernisation",
    name: "modernisation",
    code: "/07",
    symbol: "square",
    symbolColor: "#2563eb",
    category: "core",
    summary:
      "De-risking legacy technical debt by systematically decoupling monolithic codebases into modular cloud-native services without downtime.",
    deliverables: ["Strangler Pattern", "Legacy Refactoring", "Zero-Downtime Migration"],
  },
  {
    id: "evals-modelops",
    name: "evals & model ops",
    code: "/08",
    symbol: "diamond",
    symbolColor: "#7c3aed",
    category: "core",
    summary:
      "Continuous quality assurance for machine learning models and LLMs through systematic regression benchmarks and safety guardrails.",
    deliverables: ["Benchmark Suites", "Safety Guardrails", "Drift & Hallucination Telemetry"],
  },
];

const strategySatellites = [
  {
    id: "ux-design",
    name: "ux design",
    summary:
      "High-density workflow interfaces and user research crafted for institutional clarity and operational efficiency.",
    deliverables: ["Interface Prototypes", "Workflow Simplification", "Interaction Models"],
  },
  {
    id: "design-systems",
    name: "design systems",
    summary:
      "Cohesive tokens, reusable atomic component libraries, and visual guidelines enforcing brand consistency across all platforms.",
    deliverables: ["Figma Design Tokens", "Component Libraries", "Accessibility Standards"],
  },
  {
    id: "tech-due-diligence",
    name: "tech due diligence",
    summary:
      "Exhaustive code quality, security posture, and architectural audit for investors, founders, and technology leaders.",
    deliverables: ["Architecture Audit", "Technical Debt Scorecard", "Risk Assessment"],
  },
  {
    id: "team-coaching",
    name: "team coaching",
    summary:
      "Upskilling internal engineering squads in domain-driven design, automated testing, and continuous delivery.",
    deliverables: ["Pair Programming", "Architecture Workshops", "CI/CD Best Practices"],
  },
];

const growthSatellites = [
  {
    id: "analytics",
    name: "analytics",
    summary:
      "Real-time operational telemetry, automated event tracking, and decision-ready executive business intelligence dashboards.",
    deliverables: ["Real-Time Telemetry", "Automated Metrics", "Executive BI Dashboards"],
  },
  {
    id: "security-compliance",
    name: "security & compliance",
    summary:
      "Threat modeling, zero-trust network boundaries, automated audit logging, and vulnerability mitigation.",
    deliverables: ["Zero-Trust Boundaries", "Pen-Test Remediation", "Audit Logging"],
  },
  {
    id: "accessibility",
    name: "accessibility",
    summary:
      "Full WCAG 2.1 AA compliance, keyboard navigation parity, and screen reader certification for equitable digital experiences.",
    deliverables: ["WCAG 2.1 AA Audit", "Screen Reader Parity", "Keyboard Navigation"],
  },
  {
    id: "integrations",
    name: "integrations",
    summary:
      "Resilient bi-directional connectors, robust webhooks, and fault-tolerant bridges across banking, ERP, and SaaS partners.",
    deliverables: ["Webhook Architecture", "Banking & ERP Bridges", "Failover Systems"],
  },
];

function renderSymbol(type: CapabilityNode["symbol"], color: string) {
  switch (type) {
    case "circle":
      return <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />;
    case "square":
      return <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: color }} />;
    case "diamond":
      return (
        <span className="h-2 w-2 rotate-45 rounded-[1px]" style={{ backgroundColor: color }} />
      );
    case "triangle":
      return (
        <span
          className="inline-block h-0 w-0 border-x-4 border-b-[7px] border-x-transparent"
          style={{ borderBottomColor: color }}
        />
      );
  }
}

export function CapabilityMap() {
  const [activeId, setActiveId] = useState<string>("applied-ai");

  return (
    <section
      id="capabilities"
      className="scroll-mt-28 border-y border-border bg-gradient-to-b from-background via-secondary/20 to-background py-16 text-foreground antialiased sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Architectural Technical Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 font-mono text-[11px] tracking-wider text-muted-foreground uppercase sm:text-xs">
          <span className="font-semibold text-primary">[ MASTERY / 01 ]</span>
          <span className="tracking-widest text-foreground font-medium">
            STRADMONT — CAPABILITY MAP
          </span>
          <span>2026 / STRADMONTSOLUTIONS.COM</span>
        </div>

        {/* Section Sub-heading */}
        <div className="mt-8 text-center sm:mt-10">
          <p className="font-mono text-xs tracking-widest text-primary font-semibold uppercase">
            — WHAT WE DO BEST —
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            The Stradmont System Orbit.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Where strategy meets compounding growth—engineered through the Stradmont build core to
            perform under real-world demand.
          </p>
        </div>

        {/* ── Main Radar Canvas (Light Architectural Theme) ── */}
        <div className="relative mt-10 min-h-[620px] w-full select-none overflow-hidden rounded-3xl border border-border bg-white shadow-soft p-4 sm:p-8 md:min-h-[700px]">
          {/* Subtle Concentric Orbital Background Rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Outer subtle orbital ring */}
            <div className="h-[820px] w-[820px] rounded-full border border-primary/10" />
            {/* Mid orbital core boundary ring */}
            <div className="absolute h-[540px] w-[540px] rounded-full border border-primary/20 bg-secondary/30 md:h-[600px] md:w-[600px]" />
            {/* Inner focus ring */}
            <div className="absolute h-[320px] w-[320px] rounded-full border border-primary/20 border-dashed" />
            {/* Radial ambient violet glow */}
            <div
              className="absolute h-[480px] w-[480px] rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Horizontal Strategy-to-Growth Axis Line */}
          <div className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 sm:px-6">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
              STRATEGY
            </span>
            <div className="mx-3 h-px flex-1 border-t border-dashed border-border sm:mx-8" />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
              GROWTH
            </span>
          </div>

          {/* ── Content Grid with Satellites & Central Core ── */}
          <div className="relative z-10 flex min-h-[580px] flex-col items-center justify-center py-6">
            <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
              {/* Left Column: Strategy Satellites (Desktop) */}
              <div className="hidden flex-col items-end gap-5 lg:flex pr-4">
                {strategySatellites.map((sat) => {
                  const isSelected = activeId === sat.id;
                  return (
                    <button
                      key={sat.id}
                      type="button"
                      onMouseEnter={() => setActiveId(sat.id)}
                      onClick={() => setActiveId(sat.id)}
                      className={`group inline-flex items-center rounded-full border px-4 py-2 font-mono text-xs lowercase tracking-wide transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-semibold shadow-xs scale-[1.03]"
                          : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <span>{sat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Center Column: Core Capabilities Inner Orbit Cluster */}
              <div className="relative flex flex-col items-center justify-center p-2 sm:p-6">
                <div className="flex flex-col items-center gap-3.5 sm:gap-4">
                  {/* Top center pill: Applied AI */}
                  {coreCapabilities[0] && (
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(coreCapabilities[0]!.id)}
                      onClick={() => setActiveId(coreCapabilities[0]!.id)}
                      className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeId === coreCapabilities[0]!.id
                          ? "border-primary bg-primary/10 text-primary shadow-soft scale-[1.03]"
                          : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-secondary/40 shadow-xs"
                      }`}
                    >
                      {renderSymbol(coreCapabilities[0]!.symbol, coreCapabilities[0]!.symbolColor)}
                      <span className="font-semibold">{coreCapabilities[0]!.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {coreCapabilities[0]!.code}
                      </span>
                    </button>
                  )}

                  {/* Row 2: Product Engineering & Consulting */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {coreCapabilities.slice(1, 3).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveId(item.id)}
                        onClick={() => setActiveId(item.id)}
                        className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                          activeId === item.id
                            ? "border-primary bg-primary/10 text-primary shadow-soft scale-[1.03]"
                            : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-secondary/40 shadow-xs"
                        }`}
                      >
                        {renderSymbol(item.symbol, item.symbolColor)}
                        <span className="font-semibold">{item.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{item.code}</span>
                      </button>
                    ))}
                  </div>

                  {/* Central Reticle Core Nucleus */}
                  <div className="my-1 flex items-center justify-center">
                    <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                      <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-primary">
                        STRADMONT BUILD CORE
                      </span>
                    </div>
                  </div>

                  {/* Row 3: Platform & Data + Web Development */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {coreCapabilities.slice(3, 5).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveId(item.id)}
                        onClick={() => setActiveId(item.id)}
                        className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                          activeId === item.id
                            ? "border-primary bg-primary/10 text-primary shadow-soft scale-[1.03]"
                            : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-secondary/40 shadow-xs"
                        }`}
                      >
                        {renderSymbol(item.symbol, item.symbolColor)}
                        <span className="font-semibold">{item.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{item.code}</span>
                      </button>
                    ))}
                  </div>

                  {/* Row 4: DevOps & Cloud + Modernisation */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {coreCapabilities.slice(5, 7).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveId(item.id)}
                        onClick={() => setActiveId(item.id)}
                        className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                          activeId === item.id
                            ? "border-primary bg-primary/10 text-primary shadow-soft scale-[1.03]"
                            : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-secondary/40 shadow-xs"
                        }`}
                      >
                        {renderSymbol(item.symbol, item.symbolColor)}
                        <span className="font-semibold">{item.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{item.code}</span>
                      </button>
                    ))}
                  </div>

                  {/* Bottom core pill: Evals & ModelOps */}
                  {coreCapabilities[7] && (
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(coreCapabilities[7]!.id)}
                      onClick={() => setActiveId(coreCapabilities[7]!.id)}
                      className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeId === coreCapabilities[7]!.id
                          ? "border-primary bg-primary/10 text-primary shadow-soft scale-[1.03]"
                          : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-secondary/40 shadow-xs"
                      }`}
                    >
                      {renderSymbol(coreCapabilities[7]!.symbol, coreCapabilities[7]!.symbolColor)}
                      <span className="font-semibold">{coreCapabilities[7]!.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {coreCapabilities[7]!.code}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Growth Satellites (Desktop) */}
              <div className="hidden flex-col items-start gap-5 lg:flex pl-4">
                {growthSatellites.map((sat) => {
                  const isSelected = activeId === sat.id;
                  return (
                    <button
                      key={sat.id}
                      type="button"
                      onMouseEnter={() => setActiveId(sat.id)}
                      onClick={() => setActiveId(sat.id)}
                      className={`group inline-flex items-center rounded-full border px-4 py-2 font-mono text-xs lowercase tracking-wide transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-semibold shadow-xs scale-[1.03]"
                          : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <span>{sat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet Satellites Horizontal Cluster */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 lg:hidden">
              {[...strategySatellites, ...growthSatellites].map((sat) => (
                <button
                  key={sat.id}
                  type="button"
                  onClick={() => setActiveId(sat.id)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[11px] lowercase transition-colors ${
                    activeId === sat.id
                      ? "border-primary bg-primary/15 text-primary font-semibold"
                      : "border-border bg-white text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Direct CTA Strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/30 p-5 sm:flex-row sm:p-6">
          <p className="text-xs text-muted-foreground sm:text-sm">
            Need end-to-end architecture, applied AI, or legacy modernization?
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lift transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ background: "var(--gradient-electric)" }}
          >
            Discuss a project
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
