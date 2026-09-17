import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { SectionHeader } from "@/components/site/SectionHeader";
import { TagChip } from "@/components/site/TagChip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitLead } from "@/lib/lead-intake.functions";
import { parseLeadFormData } from "@/lib/lead-schema";
import { leadCaptureConfigured, siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
    package: typeof search.package === "string" ? search.package : undefined,
    domain: typeof search.domain === "string" ? search.domain : undefined,
    websiteUrl: typeof search.websiteUrl === "string" ? search.websiteUrl : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact - Harley Digital Works" },
      {
        name: "description",
        content: "Book a free 15-minute call, or send us a note. We reply within one working day.",
      },
      { property: "og:title", content: "Contact - Harley Digital Works" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
  const submitLeadFn = useServerFn(submitLead);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  const initialPackage = search.package || (search.domain ? "Domain purchase / enquiry" : "");
  const initialMessage = search.domain
    ? `Hi, I would like to enquire about acquiring the domain ${search.domain}.`
    : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = parseLeadFormData(fd);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    if (!leadCaptureConfigured) {
      const subject = encodeURIComponent(`Website enquiry from ${parsed.data.name}`);
      const body = encodeURIComponent(
        [
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          parsed.data.company ? `Company: ${parsed.data.company}` : "",
          parsed.data.websiteUrl ? `Current Website: ${parsed.data.websiteUrl}` : "",
          parsed.data.package ? `Interested in: ${parsed.data.package}` : "",
          parsed.data.budget ? `Estimated Budget: ${parsed.data.budget}` : "",
          parsed.data.timeline ? `Target Timeline: ${parsed.data.timeline}` : "",
          "",
          parsed.data.message,
        ]
          .filter(Boolean)
          .join("\n"),
      );
      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
      toast.info("Your email app is opening with the enquiry details ready to send.");
      return;
    }

    setBusy(true);
    try {
      await submitLeadFn({ data: parsed.data });
    } catch {
      toast.error("Could not send your message. Please try again.");
      setBusy(false);
      return;
    }
    setBusy(false);
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setStartedAt(Date.now());
    toast.success("Message sent. We will be in touch shortly.");
  }

  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-background to-white/40 border-b border-ink/10">
        <Container>
          <TagChip>Get a Free Quote</TagChip>
          <h1
            className="mt-6 max-w-4xl text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            Get your website sorted. <span className="text-primary block">Fast, simple, done-for-you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Tell us about your trade or business. We’ll review your requirements and send a fixed-price proposal and plan within one working day. No obligations, no pushy sales calls.
          </p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32 pt-12">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <form
              className="rounded-[24px] border border-ink/10 bg-white p-8 md:col-span-7 md:p-10 shadow-sm"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="startedAt" value={startedAt} />
              <div
                className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid gap-5">
                {sent && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800 font-medium">
                    ✓ Thanks! Your enquiry was received. Our team will review your business and reply with a custom plan within one working day.
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your Name" name="name" placeholder="Dave Miller" />
                  <Field label="Phone Number (for WhatsApp preview)" name="phone" placeholder="07123 456789" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email Address" name="email" type="email" placeholder="dave@example.co.uk" />
                  <Field label="Business / Trade Name" name="company" placeholder="Miller Electrical & Solar" />
                </div>

                <Field
                  label="Current Website (if you already have one)"
                  name="websiteUrl"
                  placeholder="https://example.co.uk (or leave blank if new)"
                  defaultValue={search.websiteUrl ?? ""}
                />

                <div className="grid gap-2">
                  <label className="text-[13px] font-semibold text-ink" htmlFor="package">
                    What are you looking for?
                  </label>
                  <select
                    id="package"
                    name="package"
                    className="rounded-xl border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue={initialPackage}
                  >
                    <option value="" disabled>
                      Select a package or service
                    </option>
                    <option value="Launch Website (£1,495)">Launch Website (£1,495 - 5 Pages, 14-Day Delivery)</option>
                    <option value="Growth Website (£2,995)">
                      Growth Website (£2,995 - Most Popular for Trades)
                    </option>
                    <option value="Pro Platform (£4,995+)">Pro Platform (£4,995+ - Multi-Location / Custom)</option>
                    <option value="Website Care Plan & Hosting (£95/mo)">
                      Website Care Plan & Managed Hosting (£95/mo)
                    </option>
                    <option value="Redesign My Existing Website">Redesign My Existing Website</option>
                    <option value="Free Website Health Check Consultation">
                      Free 15-Minute Website Consultation
                    </option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-[13px] font-semibold text-ink" htmlFor="budget">
                      Estimated budget (optional)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="rounded-xl border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      defaultValue=""
                    >
                      <option value="">Select a range</option>
                      <option>£1,495 (Launch Package)</option>
                      <option>£2,995 (Growth Package)</option>
                      <option>£5,000+ (Pro Custom)</option>
                      <option>Monthly Care Plan (£95–£195/mo)</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-[13px] font-semibold text-ink" htmlFor="timeline">
                      Target timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="rounded-xl border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      defaultValue=""
                    >
                      <option value="">Select timeline</option>
                      <option>Ready to start immediately</option>
                      <option>Within next 14–30 days</option>
                      <option>Exploring / Next 1–3 months</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-[13px] font-semibold text-ink" htmlFor="message">
                    Tell us a little about what you need
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    minLength={5}
                    defaultValue={initialMessage || "Hi, I would like to get a quote for a new website for my business."}
                    placeholder="E.g. We are an electrical contracting firm based in Manchester and want to get more commercial solar jobs..."
                    className="rounded-xl border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-ink/90 disabled:opacity-50 shadow-lg shadow-ink/10 w-full sm:w-auto"
                  >
                    {busy ? "Sending Quote Request..." : leadCaptureConfigured ? "Get My Free Quote & Plan →" : "Prepare Email Draft"}
                  </button>
                  <p className="mt-3 text-[12px] text-ink-muted">
                    {leadCaptureConfigured
                      ? "🔒 We reply within 1 working day. No spam, no pushy sales, ever."
                      : "This opens a ready-to-send draft in your email app."}
                  </p>
                </div>
              </div>
            </form>

            <aside className="rounded-[24px] bg-surface-sage p-8 md:col-span-5 md:p-10 border border-ink/10 flex flex-col justify-between">
              <div>
                <h3 className="text-[22px] font-semibold tracking-tight text-ink">
                  Direct UK Support
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  Prefer to talk right now? Call us or send a note directly.
                </p>

                <dl className="mt-8 space-y-6 text-[15px]">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted font-semibold">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-ink font-medium hover:text-primary transition"
                      >
                        {siteConfig.contactEmail}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted font-semibold">
                      Response Guarantee
                    </dt>
                    <dd className="mt-1 text-ink font-medium">Within 1 working day (usually same day).</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted font-semibold">
                      Free 15-Min Call
                    </dt>
                    <dd className="mt-1 text-ink font-medium">No sales pressure. Just honest advice and a fixed quote.</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted font-semibold">
                      Location & Coverage
                    </dt>
                    <dd className="mt-1 text-ink font-medium">
                      Based in Manchester, working with trades & businesses nationwide.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-10 rounded-xl bg-white p-4 border border-ink/10 text-xs text-ink/80">
                <strong>Why trades choose Harley Digital Works:</strong>
                <ul className="mt-2 space-y-1 text-ink-muted">
                  <li>✓ 100% Done-For-You (We write the copy)</li>
                  <li>✓ Fixed upfront pricing (No surprise bills)</li>
                  <li>✓ 14-day turnaround to live Google launch</li>
                  <li>✓ £95/mo care plans for total peace of mind</li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeader title="What happens next" align="stacked" />
          <ol className="mt-12 divide-y divide-ink/10">
            {[
              {
                n: "01",
                t: "You send a note",
                d: "A short message is enough. We do not need a full brief to start.",
              },
              {
                n: "02",
                t: "We reply within a working day",
                d: "With a fixed quote, a call slot, or an honest pointer to a better route.",
              },
              {
                n: "03",
                t: "We scope the work together",
                d: "No obligation, no theatre. If it is a fit, we start the following week.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-6 md:grid-cols-[120px_1fr] md:gap-10"
              >
                <span className="font-mono text-[13px] tracking-[0.1em] text-ink-muted">{s.n}</span>
                <div>
                  <p className="text-[17px] font-medium leading-snug text-ink">{s.t}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <SectionHeader
            title="Frequently asked"
            intro="Short, plain answers to the questions we get most often."
          />
          <div className="mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "How fast can you start?",
                  a: "Usually within a week of the first call. Bigger scopes queue behind whatever is in flight, but we will always tell you a real date, not a hopeful one.",
                },
                {
                  q: "Do you take on ongoing work?",
                  a: "Yes. Our Care Plans cover hosting, updates, and small changes month to month, and we are happy to keep improving the site over time.",
                },
                {
                  q: "What does a fixed price actually include?",
                  a: "Everything in the written quote. If the scope changes, we quote the change first, with no surprise line items at the end of the month.",
                },
                {
                  q: "What if I am not technical?",
                  a: "That is the point. We handle the technical side and translate everything into plain English so you can make confident decisions.",
                },
                {
                  q: "Do you work outside the UK?",
                  a: "Yes. Most delivery is remote and asynchronous, and we work happily with clients across the UK and EU.",
                },
              ].map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className="border-ink/10">
                  <AccordionTrigger className="py-5 text-left text-[17px] font-medium text-ink hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-muted">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-[13px] font-medium text-ink" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={name === "name" || name === "email"}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-lg border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
