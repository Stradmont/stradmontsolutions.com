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
  const [sent, setSent] = useState(false);

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
    const body = encodeURIComponent(
      `${v.message}\n\nFrom: ${v.name}${v.company ? `, ${v.company}` : ""}\n${v.email}`,
    );
    window.location.href = `mailto:info@stradmontsolutions.com?subject=${subject}&body=${body}`;
    setSent(true);
    e.currentTarget.reset();
  }

  if (sent) {
    return (
      <div className="card-lab p-8 text-center sm:p-10">
        <span className="eyebrow">Received</span>
        <h3 className="mt-3 text-2xl font-bold text-foreground">Thank you.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your email app should now be open with your message ready to send.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
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
          <input name="name" maxLength={100} placeholder="Jane Doe" className={field} />
        </Field>
        <Field label="Work email" error={errors.email}>
          <input name="email" type="email" maxLength={255} placeholder="jane@company.com" className={field} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company (optional)" error={errors.company}>
          <input name="company" maxLength={120} placeholder="Company name" className={field} />
        </Field>
        <Field label="Topic" error={errors.topic}>
          <select name="topic" defaultValue="Partnership" className={field}>
            <option>Partnership</option>
            <option>Our Products</option>
            <option>Investment</option>
            <option>Other</option>
          </select>
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

function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
