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
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <TagChip>Contact</TagChip>
          <h1
            className="mt-6 max-w-4xl text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            Tell us what needs to work better.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Share the website, workflow or customer journey you want to improve. A short note is
            enough; we reply within one working day.
          </p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <form
              className="rounded-[20px] border border-ink/10 bg-background p-8 md:col-span-7 md:p-10"
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
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800">
                    Thanks, your message was sent. We will reply within one working day.
                  </div>
                )}
                <Field label="Your name" name="name" placeholder="Jane Smith" />
                <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
                <Field label="Company (optional)" name="company" placeholder="Local Brand Ltd" />
                <Field
                  label="Current website (optional)"
                  name="websiteUrl"
                  placeholder="https://example.com"
                  defaultValue={search.websiteUrl ?? ""}
                />
                <div className="grid gap-2">
                  <label className="text-[13px] font-medium text-ink" htmlFor="package">
                    Interested in
                  </label>
                  <select
                    id="package"
                    name="package"
                    className="rounded-lg border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue={initialPackage}
                  >
                    <option value="" disabled>
                      Choose a service or package
                    </option>
                    <option value="Launch Website (£1,495)">Launch Website (£1,495)</option>
                    <option value="Growth Website (£2,995)">
                      Growth Website (£2,995 - Most Popular)
                    </option>
                    <option value="Pro Platform (£4,995+)">Pro / Custom Platform (£4,995+)</option>
                    <option value="Website Care Plan & Hosting (£95/mo)">
                      Website Care Plan & Managed Hosting (£95/mo)
                    </option>
                    <option value="AI & workflow automation">AI & workflow automation</option>
                    <option value="Domain purchase / enquiry">Domain purchase / enquiry</option>
                    <option value="Digital transformation">Digital transformation</option>
                    <option value="Free Website Health Check Followup">
                      Free Website Health Check Consultation
                    </option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-[13px] font-medium text-ink" htmlFor="budget">
                      Estimated budget (optional)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="rounded-lg border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      defaultValue=""
                    >
                      <option value="">Select a range</option>
                      <option>Under £1,500</option>
                      <option>£1,500 – £3,000</option>
                      <option>£3,000 – £5,000</option>
                      <option>£5,000+</option>
                      <option>Monthly retainer / Care plan</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-[13px] font-medium text-ink" htmlFor="timeline">
                      Target timeline (optional)
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="rounded-lg border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      defaultValue=""
                    >
                      <option value="">Select a timeline</option>
                      <option>Immediately (urgent)</option>
                      <option>Within 30 days</option>
                      <option>1 – 3 months</option>
                      <option>Exploring / Planning</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-[13px] font-medium text-ink" htmlFor="message">
                    What can we help with?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    minLength={5}
                    defaultValue={initialMessage}
                    placeholder="A short note about what you are trying to do..."
                    className="rounded-lg border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-white transition hover:bg-ink/90 disabled:opacity-50"
                  >
                    {busy ? "Sending..." : leadCaptureConfigured ? "Send message" : "Prepare email"}
                  </button>
                  <p className="mt-3 text-[12px] text-ink-muted">
                    {leadCaptureConfigured
                      ? "We reply within one working day. No spam, ever."
                      : "This opens a ready-to-send draft in your email app."}
                  </p>
                </div>
              </div>
            </form>

            <aside className="rounded-[20px] bg-surface-sage p-8 md:col-span-5 md:p-10">
              <h3 className="text-[20px] font-medium tracking-tight text-ink">
                Talk to us directly
              </h3>
              <dl className="mt-8 space-y-6 text-[15px]">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-ink hover:text-primary"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    Response time
                  </dt>
                  <dd className="mt-2 text-ink">Within one working day, usually the same day.</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    Free call
                  </dt>
                  <dd className="mt-2 text-ink">15 minutes. No pitch. Bring your questions.</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    Based in
                  </dt>
                  <dd className="mt-2 text-ink">
                    Manchester, UK, working with clients across the UK and EU.
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    Hours
                  </dt>
                  <dd className="mt-2 text-ink">Monday to Friday, 9:00 to 17:00 UK.</dd>
                </div>
              </dl>
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
