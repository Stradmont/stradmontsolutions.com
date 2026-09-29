import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/letters")({
  head: () => ({
    meta: [
      { title: "Stradmont Letters | Notes from the lab" },
      {
        name: "description",
        content:
          "Letters, notes and studies released from the Stradmont laboratory. On systems, technology and finance operations.",
      },
    ],
  }),
  component: Letters,
});

const letters = [
  {
    kind: "Letter",
    date: "Sep 2026",
    readTime: "5 min read",
    title: "Why operating software should be written down before it is written",
    body: "On design documents as an instrument of institutional memory. Writing the spec first saves ten times the effort in rewrites.",
    // image: "/images/letters/design-docs.jpg", // add when ready
  },
  {
    kind: "Note",
    date: "Aug 2026",
    readTime: "4 min read",
    title: "Latency is a governance problem",
    body: "How response-time budgets quietly become policy decisions inside finance teams, and why engineers rarely get a seat at that table.",
    // image: "/images/letters/latency.jpg",
  },
  {
    kind: "Study",
    date: "Jul 2026",
    readTime: "7 min read",
    title: "The finance data layer nobody owns",
    body: "A structural read on the gap between operating systems and financial reporting, and the silent costs of that gap.",
    // image: "/images/letters/data-layer.jpg",
  },
];

/** Placeholder shown until a real image is provided */
function ImagePlaceholder({ kind }: { kind: string }) {
  const colors: Record<string, string> = {
    Letter: "from-violet-950 to-violet-800",
    Note: "from-slate-800 to-slate-700",
    Study: "from-indigo-950 to-indigo-800",
  };
  const gradient = colors[kind] ?? "from-slate-800 to-slate-700";
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        className="opacity-30"
      >
        <rect x="6" y="8" width="28" height="24" rx="2" />
        <path d="M12 16h16M12 21h10M12 26h8" />
      </svg>
    </div>
  );
}

function Letters() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Header */}
      <section className="surface-ambient border-b border-border pt-40 pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="eyebrow">Stradmont Letters</span>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[0.98] text-foreground">
            Notes from the chaos
            <br />
            we solve.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Letters, notes and studies released from the laboratory. No
            newsletters, no funnels.
          </p>
        </div>
      </section>

      {/* Letters Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {letters.map((letter) => (
            <article
              key={letter.title}
              className="card-lab group flex flex-col overflow-hidden"
            >
              {/* Image area — swap ImagePlaceholder for <img> when ready */}
              <div className="aspect-[16/9] w-full overflow-hidden">
                <ImagePlaceholder kind={letter.kind} />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {letter.kind}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">
                    {letter.date}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-snug text-foreground">
                  {letter.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {letter.body}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-xs text-muted-foreground">
                    {letter.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                    Coming soon
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
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
