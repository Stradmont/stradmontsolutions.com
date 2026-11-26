import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface CapabilityNode {
  id: string;
  name: string;
  symbol: "circle" | "square" | "diamond" | "triangle";
  symbolColor: string;
  category: "core" | "strategy" | "growth";
  summary: string;
  deliverables: string[];
}

const coreCapabilities: CapabilityNode[] = [
  {
    id: "saas-engineering",
    name: "SaaS & Product Development",
    symbol: "square",
    symbolColor: "#dc2626",
    category: "core",
    summary:
      "Designing and building SaaS platforms, web applications, and backend APIs that teams rely on every day.",
    deliverables: ["SaaS Platforms", "Backend APIs", "Web Applications"],
  },
  {
    id: "cybersecurity-appsec",
    name: "Cybersecurity & AppSec",
    symbol: "diamond",
    symbolColor: "#7c3aed",
    category: "core",
    summary:
      "Protecting web applications and company data with secure authentication, access controls, and regular security testing.",
    deliverables: ["Application Security", "Auth & Access Control", "Vulnerability Fixes"],
  },
  {
    id: "applied-ai",
    name: "Applied AI",
    symbol: "circle",
    symbolColor: "#2563eb",
    category: "core",
    summary:
      "Practical AI tools, document search, and internal automation built around your own data with strict privacy controls.",
    deliverables: ["AI Workflows", "Internal Knowledge Search", "Model Guardrails"],
  },
  {
    id: "zero-trust-cloud",
    name: "Cloud Security",
    symbol: "triangle",
    symbolColor: "#0284c7",
    category: "core",
    summary:
      "Locking down cloud accounts, network boundaries, permissions, and secrets so your infrastructure stays protected.",
    deliverables: ["Network Security", "IAM & Permissions", "Encrypted Storage"],
  },
  {
    id: "platform-data",
    name: "Data Systems",
    symbol: "circle",
    symbolColor: "#059669",
    category: "core",
    summary:
      "Clean databases, automated data pipelines, and reliable syncing across the tools your business uses.",
    deliverables: ["Data Pipelines", "Database Design", "Data Sync & Reporting"],
  },
  {
    id: "security-audits",
    name: "Security Audits & Testing",
    symbol: "diamond",
    symbolColor: "#ea580c",
    category: "core",
    summary:
      "Hands-on code reviews, architecture audits, and penetration testing to find and fix security issues early.",
    deliverables: ["Penetration Testing", "Code & API Reviews", "Security Reports"],
  },
  {
    id: "devops-cloud",
    name: "Cloud & DevOps",
    symbol: "circle",
    symbolColor: "#2563eb",
    category: "core",
    summary:
      "Setting up cloud servers, Docker and Kubernetes containers, and automated deployment pipelines.",
    deliverables: [
      "Containers & Kubernetes",
      "Infrastructure as Code",
      "Automated Deployments",
    ],
  },
  {
    id: "modernisation",
    name: "System Modernisation",
    symbol: "square",
    symbolColor: "#7c3aed",
    category: "core",
    summary:
      "Upgrading older software and tangled codebases into clean, maintainable services without interrupting your business.",
    deliverables: ["System Upgrades", "Code Refactoring", "Safe Migrations"],
  },
];

const strategySatellites = [
  {
    id: "ux-design",
    name: "UX Design",
    summary:
      "Clear, easy-to-use interfaces designed around how your team and customers actually work.",
    deliverables: ["Interface Design", "Workflow Simplification", "Prototypes"],
  },
  {
    id: "design-systems",
    name: "Design Systems",
    summary:
      "Shared UI components and style guides that keep your products consistent and faster to build.",
    deliverables: ["Design Tokens", "Component Libraries", "UI Guidelines"],
  },
  {
    id: "tech-due-diligence",
    name: "Technical Audits",
    summary:
      "Clear assessments of code quality, security risks, and architecture for founders and leadership teams.",
    deliverables: ["Architecture Review", "Risk Assessment", "Improvement Roadmap"],
  },
  {
    id: "team-coaching",
    name: "Team Coaching",
    summary:
      "Working directly with your developers to improve code reviews, testing, and deployment habits.",
    deliverables: ["Code Reviews", "Testing Practices", "CI/CD Setup"],
  },
];

const growthSatellites = [
  {
    id: "analytics",
    name: "Analytics",
    summary:
      "Clear dashboards and system monitoring so you always know how your product and business are performing.",
    deliverables: ["System Monitoring", "Event Tracking", "Reporting Dashboards"],
  },
  {
    id: "security-compliance",
    name: "Compliance",
    summary:
      "Audit logs, access policies, and security documentation to help your team meet industry requirements.",
    deliverables: ["Audit Logging", "Access Policies", "Compliance Readiness"],
  },
  {
    id: "accessibility",
    name: "Accessibility",
    summary:
      "Making sure your web applications work well for everyone, including keyboard and screen-reader users.",
    deliverables: ["WCAG 2.1 AA Checks", "Screen Reader Support", "Keyboard Navigation"],
  },
  {
    id: "integrations",
    name: "Integrations",
    summary:
      "Connecting your software reliably with payment providers, CRMs, ERPs, and third-party APIs.",
    deliverables: ["API Integrations", "Webhooks", "Third-Party Connectors"],
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
  const [activeId, setActiveId] = useState<string>("saas-engineering");

  const allNodes = [
    ...coreCapabilities,
    ...strategySatellites,
    ...growthSatellites,
  ];
  const activeNode = allNodes.find((n) => n.id === activeId) ?? coreCapabilities[0]!;

  return (
    <section
      id="capabilities"
      className="scroll-mt-28 border-y border-border bg-gradient-to-b from-background via-secondary/20 to-background py-16 text-foreground antialiased sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Sub-heading */}
        <div className="text-center">
          <span className="eyebrow">Capabilities</span>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            How we help teams build and secure software.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            From product development and cloud infrastructure to security testing and AI, explore
            the areas we work in.
          </p>
        </div>

        {/* Main Radar Canvas */}
        <div className="relative mt-10 min-h-[620px] w-full select-none overflow-hidden rounded-3xl border border-border bg-white shadow-soft p-4 sm:p-8 md:min-h-[700px]">
          {/* Subtle Concentric Orbital Background Rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[820px] w-[820px] rounded-full border border-primary/10" />
            <div className="absolute h-[540px] w-[540px] rounded-full border border-primary/20 bg-secondary/30 md:h-[600px] md:w-[600px]" />
            <div className="absolute h-[320px] w-[320px] rounded-full border border-primary/20 border-dashed" />
            <div
              className="absolute h-[480px] w-[480px] rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Horizontal Strategy-to-Growth Axis Line */}
          <div className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 sm:px-6">
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase sm:text-xs">
              Strategy
            </span>
            <div className="mx-3 h-px flex-1 border-t border-dashed border-border sm:mx-8" />
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase sm:text-xs">
              Growth
            </span>
          </div>

          {/* Content Grid with Satellites & Central Core */}
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
                      className={`group inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
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
                  {/* Top center pill */}
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
                    </button>
                  )}

                  {/* Row 2 */}
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
                      </button>
                    ))}
                  </div>

                  {/* Row 3 */}
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
                      </button>
                    ))}
                  </div>

                  {/* Row 4 */}
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
                      </button>
                    ))}
                  </div>

                  {/* Bottom core pill */}
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
                      className={`group inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
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
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
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

          {/* Active Capability Detail Panel */}
          <div className="relative z-10 mt-2 rounded-2xl border border-border bg-secondary/35 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">
                    {activeNode.name}
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {activeNode.summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {activeNode.deliverables.map((d) => (
                  <span
                    key={d}
                    className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Direct CTA Strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/30 p-5 sm:flex-row sm:p-6">
          <p className="text-xs text-muted-foreground sm:text-sm">
            Have a software product, cloud migration, or security audit in mind?
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
