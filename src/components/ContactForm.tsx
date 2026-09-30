import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ApiClientError, submitContactEnquiry } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/site-config";

interface TurnstileRenderOptions {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// ── Zod Schema ────────────────────────────────────────────────────────────────
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address")
    .max(255, "Email must be 255 characters or fewer"),
  company: z
    .string()
    .trim()
    .max(120, "Company name must be 120 characters or fewer")
    .optional()
    .or(z.literal("")),
  topic: z.enum(["Partnership", "Our Products", "Investment", "Other"], {
    errorMap: () => ({ message: "Please select a topic" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (minimum 10 characters)")
    .max(1000, "Message must be 1000 characters or fewer"),
});

type FormValues = z.infer<typeof schema>;

// ── Field styling ─────────────────────────────────────────────────────────────
const fieldBase =
  "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:ring-4";

function fieldClass(hasError: boolean) {
  return hasError
    ? `${fieldBase} border-destructive focus:border-destructive focus:ring-destructive/10`
    : `${fieldBase} border-border focus:border-primary focus:ring-primary/10`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ContactForm() {
  const [submission, setSubmission] = useState<{
    name: string;
    email: string;
    company?: string | undefined;
    topic: string;
    message: string;
    mailtoUrl: string;
    referenceId?: string | undefined;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched", // validate on blur, then live on every keystroke
    defaultValues: {
      name: "",
      email: "",
      company: "",
      topic: "Partnership",
      message: "",
    },
  });

  const messageValue = watch("message", "");

  useEffect(() => {
    if (submission) return;
    if (typeof window === "undefined" || !SITE_CONFIG.turnstileSiteKey) return;

    let cancelled = false;

    function mountWidget() {
      if (cancelled || !turnstileContainerRef.current || !window.turnstile) {
        return;
      }
      if (turnstileWidgetIdRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // ignore cleanup errors
        }
      }

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: SITE_CONFIG.turnstileSiteKey,
        theme: "light",
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileError(null);
        },
        "expired-callback": () => {
          setTurnstileToken(null);
        },
        "error-callback": () => {
          setTurnstileToken(null);
        },
      });
    }

    if (window.turnstile) {
      mountWidget();
    } else {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener("load", mountWidget);
      } else {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.addEventListener("load", mountWidget);
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (turnstileWidgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // ignore cleanup errors
        }
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [submission]);

  function resetTurnstile() {
    setTurnstileToken(null);
    if (turnstileWidgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      } catch {
        // ignore reset errors
      }
    }
  }

  async function onSubmit(data: FormValues) {
    setServerError(null);
    setTurnstileError(null);

    if (SITE_CONFIG.turnstileSiteKey && !turnstileToken) {
      setTurnstileError("Please complete the security verification challenge.");
      return;
    }

    const subject = encodeURIComponent(`[${data.topic}] Enquiry from ${data.name}`);
    const plainBody = `${data.message}\n\nFrom: ${data.name}${data.company ? `, ${data.company}` : ""}\nEmail: ${data.email}`;
    const body = encodeURIComponent(plainBody);
    const mailtoUrl = `${SITE_CONFIG.contact.emailHref}?subject=${subject}&body=${body}`;

    try {
      const response = await submitContactEnquiry({
        name: data.name,
        email: data.email,
        company: data.company || undefined,
        topic: data.topic,
        message: data.message,
        turnstileToken: turnstileToken || undefined,
      });

      const referenceId = response.data?.id
        ? response.data.id.slice(0, 8).toUpperCase()
        : undefined;

      setSubmission({
        name: data.name,
        email: data.email,
        company: data.company,
        topic: data.topic,
        message: data.message,
        mailtoUrl,
        referenceId,
      });
      reset();
      setTurnstileToken(null);
    } catch (error) {
      resetTurnstile();
      if (error instanceof ApiClientError) {
        setServerError(error.message);
        return;
      }

      setServerError(
        `Unable to reach the server right now. Please try again shortly or email us directly at ${SITE_CONFIG.contact.email}.`,
      );
    }
  }

  function handleCopy() {
    if (!submission) return;
    const textToCopy = `To: ${SITE_CONFIG.contact.email}\nSubject: [${submission.topic}] Enquiry from ${submission.name}\n\n${submission.message}\n\nFrom: ${submission.name}${submission.company ? `, ${submission.company}` : ""}\nEmail: ${submission.email}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // ── Success state ─────────────────────────────────────────────────────────────
  if (submission) {
    return (
      <div className="card-lab p-8 text-center sm:p-10">
        <span className="eyebrow">Enquiry Received</span>
        <h3 className="mt-3 text-2xl font-bold text-foreground">Thank you, {submission.name}.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We have received your enquiry regarding{" "}
          <span className="font-medium text-foreground">{submission.topic}</span> and dispatched a
          confirmation email to{" "}
          <span className="font-medium text-foreground">{submission.email}</span>.
          {submission.referenceId && (
            <span className="mt-2 block font-mono text-xs text-primary">
              Reference ID: #{submission.referenceId}
            </span>
          )}
        </p>

        {/* Direct contact & copy options */}
        <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5 text-left text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">
            Need to share attachments or follow up directly?
          </p>
          <p className="mt-1">
            Write directly to{" "}
            <a
              href={SITE_CONFIG.contact.emailHref}
              className="font-medium text-primary underline underline-offset-2"
            >
              {SITE_CONFIG.contact.email}
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
              Open in email client
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

  // ── Form ──────────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="card-lab space-y-5 p-6 sm:p-8"
    >
      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive"
        >
          {serverError}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <Field label="Name" error={errors.name?.message} htmlFor="contact-name" required>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass(!!errors.name)}
            {...register("name")}
          />
        </Field>

        {/* Email */}
        <Field label="Work email" error={errors.email?.message} htmlFor="contact-email" required>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            maxLength={255}
            placeholder="jane@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass(!!errors.email)}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Company */}
        <Field label="Company (optional)" error={errors.company?.message} htmlFor="contact-company">
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            placeholder="Company name"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
            className={fieldClass(!!errors.company)}
            {...register("company")}
          />
        </Field>

        {/* Topic */}
        <Field label="Topic" error={errors.topic?.message} htmlFor="contact-topic" required>
          <div className="relative">
            <select
              id="contact-topic"
              aria-invalid={!!errors.topic}
              aria-describedby={errors.topic ? "contact-topic-error" : undefined}
              className={`${fieldClass(!!errors.topic)} cursor-pointer appearance-none pr-10`}
              {...register("topic")}
            >
              <option value="Partnership">Partnership</option>
              <option value="Our Products">Our Products</option>
              <option value="Investment">Investment</option>
              <option value="Other">Other</option>
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

      {/* Message */}
      <Field label="Message" error={errors.message?.message} htmlFor="contact-message" required>
        <div className="relative">
          <textarea
            id="contact-message"
            rows={5}
            maxLength={1000}
            placeholder="Tell us what you're working on."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${fieldClass(!!errors.message)} resize-none pb-7`}
            {...register("message")}
          />
          {/* Live character counter */}
          <span
            className={`absolute bottom-3 right-3.5 text-[10px] tabular-nums transition-colors ${
              messageValue.length >= 950
                ? "text-destructive"
                : messageValue.length >= 800
                  ? "text-amber-500"
                  : "text-muted-foreground/50"
            }`}
          >
            {messageValue.length}/1000
          </span>
        </div>
      </Field>

      {/* Cloudflare Turnstile Widget */}
      {SITE_CONFIG.turnstileSiteKey && (
        <div className="flex flex-col gap-1.5">
          <div ref={turnstileContainerRef} className="min-h-[65px]" />
          {turnstileError && (
            <span role="alert" className="flex items-center gap-1 text-xs text-destructive">
              <svg
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="7" />
                <path d="M8 5v4M8 11v.5" />
              </svg>
              {turnstileError}
            </span>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
        style={{ background: "var(--gradient-electric)" }}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  htmlFor,
  required,
  children,
}: {
  label: string;
  error?: string | undefined;
  htmlFor: string;
  required?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="block text-xs font-semibold text-foreground">
        {label}
        {required && (
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <span
          id={`${htmlFor}-error`}
          role="alert"
          className="flex items-center gap-1 text-xs text-destructive"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7" />
            <path d="M8 5v4M8 11v.5" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
