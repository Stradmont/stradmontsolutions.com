export interface Letter {
  slug: string;
  kind: "Letter" | "Note" | "Study";
  date: string;
  readTime: string;
  title: string;
  body: string; // teaser / summary
  content: Section[]; // full article
  author: string;
  authorTitle: string;
}

export interface Section {
  heading?: string;
  paragraphs: string[];
}

export const letters: Letter[] = [
  {
    slug: "why-operating-software-should-be-written-down-before-it-is-written",
    kind: "Letter",
    date: "Sep 2026",
    readTime: "5 min read",
    title: "Why operating software should be written down before it is written",
    body: "On design documents as an instrument of institutional memory. Writing the spec first saves ten times the effort in rewrites.",
    author: "Stradmont Editorial",
    authorTitle: "Stradmont Solutions",
    content: [
      {
        paragraphs: [
          "There is a pattern we see inside almost every engineering team that scales past thirty people: software gets built before it is understood. A ticket appears, a pull request follows, and weeks later someone asks what the system was supposed to do — only to find that the answer lives in the memory of the one person who wrote it.",
          "This is not a discipline problem. It is a structural one. The pressure to ship is real. The cost of writing first is visible. The cost of not writing is invisible — until it isn't.",
        ],
      },
      {
        heading: "The design document is not documentation",
        paragraphs: [
          "Design documents — sometimes called RFCs, technical specs, or architecture notes — are not the same as documentation. Documentation describes what a system does. A design document describes what a system should do, and why, before a single line of code is written.",
          "The act of writing forces clarity that verbal discussion never does. When you write down a proposed design, you discover the questions you had not thought to ask. You find the edge cases that seemed obvious in conversation and turn out to be unanswered. You realise the scope is twice what you assumed.",
          "This is not a bug in the process. It is the point.",
        ],
      },
      {
        heading: "Institutional memory as infrastructure",
        paragraphs: [
          "The hidden value of the design document is not in the decision it records — it is in the reasoning it preserves. Six months from now, when a team member joins and asks why the system works the way it does, you will not remember the answer. The document will.",
          "In financial operations, where regulatory environments shift and teams turn over, this kind of durable reasoning is not a luxury. It is infrastructure. The cost of reconstructing lost context is almost always higher than the cost of capturing it in the first place.",
          "We have seen organisations spend weeks — sometimes months — in archaeological mode, trying to reverse-engineer the logic behind a data pipeline or a pricing engine, because the people who built it moved on and the decision lived only in a Slack thread that no one archived.",
        ],
      },
      {
        heading: "A lightweight discipline",
        paragraphs: [
          "A design document does not need to be long. It needs to answer four questions: What problem are we solving? What are the constraints? What is our proposed solution, and why did we choose it over the alternatives? What does success look like?",
          "One page is often enough. The discipline is in writing it before code, not in the length.",
          "At Stradmont, every system we build starts with a written brief. Not because we have more time than our clients. Because we have learned, repeatedly, that writing first is the fastest path to building right.",
        ],
      },
    ],
  },
  {
    slug: "latency-is-a-governance-problem",
    kind: "Note",
    date: "Aug 2026",
    readTime: "4 min read",
    title: "Latency is a governance problem",
    body: "How response-time budgets quietly become policy decisions inside finance teams, and why engineers rarely get a seat at that table.",
    author: "Stradmont Editorial",
    authorTitle: "Stradmont Solutions",
    content: [
      {
        paragraphs: [
          "Inside every financial institution, somewhere between the engineering team and the compliance desk, there is a conversation that almost never happens. It is about latency — how fast data moves, how stale a figure is allowed to be before it becomes a liability — and it is one of the most consequential decisions an organisation makes without realising it is making one.",
        ],
      },
      {
        heading: "The invisible policy",
        paragraphs: [
          "When an engineer sets a cache TTL to sixty seconds, they are making a policy decision: that the organisation is comfortable with data being one minute old at the point of consumption. When a batch job runs overnight, someone has decided that a twelve-hour-old picture of the balance sheet is acceptable for morning decisions.",
          "These decisions are rarely recorded as decisions. They are technical choices made under time pressure, and they accrete into an informal policy that nobody has signed off on.",
          "Until something breaks.",
        ],
      },
      {
        heading: "Why this is a governance question",
        paragraphs: [
          "The question of how stale is too stale is not a technical question. It is a business question, and in regulated environments it is sometimes a legal one. When a fund manager acts on a position that turns out to be an hour old, the downstream implications are not measured in milliseconds — they are measured in basis points, in audit findings, in regulatory correspondence.",
          "Governance, properly understood, is about making decisions visibly and assigning accountability. Latency budgets are decisions. They deserve to be made visibly, by the right people, with the right information — not delegated silently to whoever is writing the cache layer.",
        ],
      },
      {
        heading: "What a latency conversation looks like",
        paragraphs: [
          "We are not arguing that every TTL needs a board paper. But teams that explicitly surface latency requirements — in user stories, in service level objectives, in data contracts between producing and consuming systems — build software that behaves predictably under pressure.",
          "The conversation is straightforward: For each data domain, how fresh does a consumer need this to be, and what happens if it is not? That question, asked once and answered in writing, prevents an entire class of incidents.",
          "The organisations that do this well treat latency as a product requirement, not a performance optimisation. The ones that do not tend to find out why it matters at the worst possible moment.",
        ],
      },
    ],
  },
  {
    slug: "the-finance-data-layer-nobody-owns",
    kind: "Study",
    date: "Jul 2026",
    readTime: "7 min read",
    title: "The finance data layer nobody owns",
    body: "A structural read on the gap between operating systems and financial reporting, and the silent costs of that gap.",
    author: "Stradmont Editorial",
    authorTitle: "Stradmont Solutions",
    content: [
      {
        paragraphs: [
          "In most financial services organisations, there is a layer of data that sits between where transactions happen and where they are reported. It is assembled from multiple systems, transformed by a mix of scheduled jobs and manual adjustments, and ultimately used to produce the numbers that leadership sees, auditors examine, and regulators rely on.",
          "Nobody owns it.",
        ],
      },
      {
        heading: "What we mean by the finance data layer",
        paragraphs: [
          "The finance data layer is not a product. It is not a team. It is the accumulated result of decisions made by engineers, accountants, and analysts over years — each solving a problem in front of them without a mandate to think about the whole.",
          "It typically includes: exports from transactional systems formatted for the accounting ledger; reconciliation scripts that normalise data between platforms; spreadsheet adjustments that capture what the systems do not; reporting templates that aggregate and present the result.",
          "In aggregate, this layer is often more complex than any individual system it draws from. And because it evolved rather than being designed, it has no owner — only contributors.",
        ],
      },
      {
        heading: "The silent costs",
        paragraphs: [
          "The costs of an unowned finance data layer are real but rarely attributed correctly. They appear as: close cycle time — the number of days between period end and finalised reporting; reconciliation effort — the hours spent each month comparing outputs that should agree but do not; audit preparation — the time required to explain to an external party how a number was derived; error correction — the cost of finding and fixing figures that the system produced incorrectly.",
          "These are not edge-case costs. In organisations processing significant transaction volumes, close cycle times measured in weeks and reconciliation efforts measured in person-days are common. They are simply accepted as the cost of doing business, rather than recognised as the cost of an architectural gap.",
        ],
      },
      {
        heading: "Ownership as the first design decision",
        paragraphs: [
          "The remedy is not, primarily, a technical one. It begins with a decision about ownership. Someone — a function, a team, a named individual — needs to be accountable for the finance data layer as a system: its inputs, its transformations, its outputs, and its behaviour under change.",
          "Without that accountability, technical improvements will be piecemeal. A better extract job here, a reconciled table there — improvements that reduce friction locally but do not change the structural picture.",
          "With ownership comes the ability to make architectural decisions: what the canonical source of truth is for each data domain, what the allowable latency is for financial reporting, what the acceptance criteria are for any change that touches the layer.",
          "This is the conversation we have with clients before we write a line of code. Not because the technology is unimportant — it is — but because technology without ownership produces systems that nobody trusts and everyone works around.",
        ],
      },
    ],
  },
];

export function getLetterBySlug(slug: string): Letter | undefined {
  return letters.find((l) => l.slug === slug);
}
