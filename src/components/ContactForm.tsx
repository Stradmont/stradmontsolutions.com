import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(120).optional(),
  topic: z.enum(["Partnership", "Our Products", "Investment", "Other"]),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submission, setSubmission] = useState<{
    name: string;
    email: string;
    company?: string | undefined;
    topic: string;
    message: string;
    mailtoUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const v = parsed.data;
    const subject = encodeURIComponent(`[${v.topic}] Enquiry from ${v.name}`);
    const plainBody = `${v.message}\n\nFrom: ${v.name}${v.company ? `, ${v.company}` : ""}\nEmail: ${v.email}`;
    const body = encodeURIComponent(plainBody);
    const mailtoUrl = `mailto:info@stradmontsolutions.com?subject=${subject}&body=${body}`;

    setSubmission({
      name: v.name,
      email: v.email,
      company: v.company,
      topic: v.topic,
      message: v.message,
      mailtoUrl,
    });

    window.location.href = mailtoUrl;
    e.currentTarget.reset();
  }

  function handleCopy() {
    if (!submission) return;
    const textToCopy = `To: info@stradmontsolutions.com\nSubject: [${submission.topic}] Enquiry from ${submission.name}\n\n${submission.message}\n\nFrom: ${submission.name}${submission.company ? `, ${submission.company}` : ""}\nEmail: ${submission.email}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (submission) {
    return (
      <div className="card-lab p-8 text-center sm:p-10">
        <span className="eyebrow">Message Ready</span>
        <h3 className="mt-3 text-2xl font-bold text-foreground">Thank you, {submission.name}.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your email application should now be open with your message prepared for sending.
        </p>

        {/* Fallback for OS with no default mail client */}
        <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5 text-left text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Email client didn't open automatically?</p>
          <p className="mt-1">
            Send your message directly to{" "}
            <a
              href="mailto:info@stradmontsolutions.com"
              className="font-medium text-primary underline underline-offset-2"
            >
              info@stradmontsolutions.com
            </a>{" "}
            or copy the details below:
          </p>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {copied ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                  Copied to clipboard
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="5" y="5" width="9" height="9" rx="1.5" />
                    <path d="M3 11V3a1 1 0 0 1 1-1h8" />
                  </svg>
                  Copy message details
                </>
              )}
            </button>
            <a
              href={submission.mailtoUrl}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-secondary"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="1" y="3" width="14" height="10" rx="1.5" />
                <path d="M1 5l7 5 7-5" />
              </svg>
              Reopen email client
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmission(null);
            setCopied(false);
          }}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card-lab space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            name="name"
            autoComplete="name"
            maxLength={100}
            placeholder="Jane Doe"
            className={field}
          />
        </Field>
        <Field label="Work email" error={errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={255}
            placeholder="jane@company.com"
            className={field}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company (optional)" error={errors.company}>
          <input
            name="company"
            autoComplete="organization"
            maxLength={120}
            placeholder="Company name"
            className={field}
          />
        </Field>
        <Field label="Topic" error={errors.topic}>
          <div className="relative">
            <select
              name="topic"
              defaultValue="Partnership"
              className={`${field} cursor-pointer appearance-none pr-10`}
            >
              <option>Partnership</option>
              <option>Our Products</option>
              <option>Investment</option>
              <option>Other</option>
            </select>
            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </div>
          </div>
        </Field>
      </div>
      <Field label="Message" error={errors.message}>
        <textarea
          name="message"
          rows={5}
          maxLength={1000}
          placeholder="Tell us what you're working on."
          className={`${field} resize-none`}
        />
      </Field>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
        style={{ background: "var(--gradient-electric)" }}
      >
        Send message
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
