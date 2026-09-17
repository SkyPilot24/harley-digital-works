import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
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
import { Check, Mail, Phone, ShieldCheck, Clock, ArrowDown } from "lucide-react";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
    package: typeof search.package === "string" ? search.package : undefined,
    domain: typeof search.domain === "string" ? search.domain : undefined,
    websiteUrl: typeof search.websiteUrl === "string" ? search.websiteUrl : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact the Studio | Harley Digital Works" },
      {
        name: "description",
        content:
          "Book a free 15-minute consultation or request a fixed-price proposal. We reply within one working day. Websites from £1,495.",
      },
      { property: "og:title", content: "Contact the Studio | Harley Digital Works" },
      {
        property: "og:description",
        content:
          "Start a conversation with Harley Digital Works. Clear scope, fixed pricing, zero pushy sales calls.",
      },
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
    <PageShell quiet>
      <div className="studio-home">
        {/* Contact Hero */}
        <section className="studio-hero" aria-labelledby="contact-heading">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> START A CONVERSATION · UK
              </p>
              <h1 id="contact-heading">
                Get your website
                <br />
                sorted.
                <br />
                <span>Fast, simple, done.</span>
              </h1>
              <p className="hero-description">
                Tell us about your business. We’ll review what you need and send an agreed scope and
                fixed quote within one working day.
              </p>
              <p className="hero-support">
                No obligations, zero pushy sales calls, and no technical jargon.
              </p>
              <div className="studio-actions">
                <a href="#contact-form" className="studio-text-link">
                  Go to enquiry form <ArrowDown size={16} />
                </a>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-note">
                <span>DIRECT SENIOR REASSURANCE</span>
                <span>↘</span>
              </div>
              <div className="founder-photo shadow-xl">
                <img
                  src="/images/home/robbie-restored.jpg"
                  alt="Dr Robbie Harley, founder of Harley Digital Works"
                  width="1200"
                  height="1600"
                  loading="eager"
                />
                <span>DR ROBBIE HARLEY / MANAGING DIRECTOR</span>
              </div>
              <div className="hero-art-caption">
                <span>
                  Reply within 1 working day.
                  <br />
                  <strong>Direct senior oversight.</strong>
                </span>
                <span className="hero-art-seal">
                  100%
                  <br />
                  <span>direct</span>
                  <br />
                  TOUCH
                </span>
              </div>
            </div>
          </div>

          <div className="studio-wrap hero-footnote">
            <span>TRANSPARENT PRICING. FAST REPLIES. ZERO PRESSURE.</span>
            <span>Based in Manchester, working across the UK.</span>
          </div>
        </section>

        {/* Form and Details Section */}
        <section className="studio-section" id="contact-form">
          <div className="studio-wrap">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <form
                  className="rounded-3xl border border-ink/10 bg-white p-8 md:p-10 shadow-sm"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="startedAt" value={startedAt} />
                  <div
                    className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <p className="studio-kicker">PROJECT ENQUIRY</p>
                      <h2 className="text-2xl font-bold tracking-tight text-ink mt-1">
                        Tell us about your project
                      </h2>
                    </div>

                    {sent && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800 font-medium">
                        ✓ Thanks! Your enquiry was received. We’ll review your business and reply
                        with a custom proposal within one working day.
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Your Name" name="name" placeholder="E.g. David Miller" />
                      <Field
                        label="Phone Number (for WhatsApp preview)"
                        name="phone"
                        placeholder="07123 456789"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="david@example.co.uk"
                      />
                      <Field
                        label="Business / Trade Name"
                        name="company"
                        placeholder="Miller Electrical & Solar"
                      />
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
                        <option value="Launch Website (£1,495)">
                          Launch Website (£1,495 - 5 Pages, 14-Day Delivery)
                        </option>
                        <option value="Growth Website (£2,995)">
                          Growth Website (£2,995 - Most Popular for Expanding Trades)
                        </option>
                        <option value="Pro Platform (£4,995+)">
                          Pro Platform (£4,995+ - Multi-Location / Custom Scope)
                        </option>
                        <option value="Website Care Plan & Hosting (£95/mo)">
                          Website Care Plan & Managed Hosting (£95/mo)
                        </option>
                        <option value="Redesign My Existing Website">
                          Redesign My Existing Website
                        </option>
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
                        defaultValue={
                          initialMessage ||
                          "Hi, I would like to discuss getting a website created for my business."
                        }
                        placeholder="E.g. We are an electrical contractor based in Manchester and want to attract more commercial solar contracts..."
                        className="rounded-xl border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={busy}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-ink/90 disabled:opacity-50 shadow-md shadow-ink/10 w-full sm:w-auto cursor-pointer"
                      >
                        {busy
                          ? "Sending Enquiry..."
                          : leadCaptureConfigured
                          ? "Send My Website Enquiry →"
                          : "Prepare Email Draft"}
                      </button>
                      <p className="mt-3 text-[12px] text-ink-muted">
                        🔒 We reply within 1 working day. No spam, no pushy sales, ever.
                      </p>
                    </div>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="rounded-3xl bg-[#FAF9F6] p-8 md:p-10 border border-ink/10 shadow-xs">
                  <p className="studio-kicker">DIRECT STUDIO SUPPORT</p>
                  <h3 className="text-xl font-bold tracking-tight text-ink mt-1">
                    Direct communication.
                    <br />
                    No ticket queues.
                  </h3>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    When you contact Harley Digital Works, you communicate directly with senior
                    practitioners who understand commercial reality.
                  </p>

                  <dl className="mt-8 space-y-6 text-sm">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted font-bold flex items-center gap-1.5">
                        <Mail size={13} /> Direct Email
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${siteConfig.contactEmail}`}
                          className="text-ink font-semibold hover:text-primary transition"
                        >
                          {siteConfig.contactEmail}
                        </a>
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted font-bold flex items-center gap-1.5">
                        <Clock size={13} /> Response Guarantee
                      </dt>
                      <dd className="mt-1 text-ink font-medium">
                        Within 1 working day (typically same day).
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted font-bold flex items-center gap-1.5">
                        <Phone size={13} /> Free 15-Minute Call
                      </dt>
                      <dd className="mt-1 text-ink font-medium">
                        A relaxed conversation to understand your goals. Zero sales pressure.
                      </dd>
                    </div>

                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted font-bold flex items-center gap-1.5">
                        <ShieldCheck size={13} /> UK Coverage
                      </dt>
                      <dd className="mt-1 text-ink font-medium">
                        Studio based in Manchester, delivering for ambitious businesses nationwide.
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xs space-y-3">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                    The Harley Commitment:
                  </div>
                  <ul className="space-y-2 text-xs text-ink/80">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-700 shrink-0" />
                      <span>100% Done-For-You (Copywriting included)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-700 shrink-0" />
                      <span>Fixed upfront investment (Agreed in writing)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-700 shrink-0" />
                      <span>14-day turnaround on Launch packages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-700 shrink-0" />
                      <span>Managed care plans from £95/month</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Section */}
        <section className="studio-section border-t border-ink/10">
          <div className="studio-wrap">
            <div className="max-w-3xl">
              <p className="studio-kicker">QUESTIONS & ANSWERS</p>
              <h2 className="text-3xl font-bold tracking-tight text-ink mt-2 font-display">
                Frequently asked before getting started.
              </h2>
              <p className="mt-3 text-base text-ink-muted">
                Straight answers to common questions about working with our studio.
              </p>
            </div>

            <div className="mt-10 max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "How fast can we start on my website?",
                    a: "Typically within a week of our introductory conversation. We schedule work to maintain our 14-day turnaround on Launch projects.",
                  },
                  {
                    q: "What do I need to prepare before getting in touch?",
                    a: "Nothing complicated. Just tell us what trade services you offer and where you want to win work. We write the copy and shape the site.",
                  },
                  {
                    q: "What does the fixed price include?",
                    a: "Full bespoke design, commercial copywriting, mobile optimisation, SEO schema, and your revision preview. Every detail is agreed in writing.",
                  },
                  {
                    q: "Can I keep my existing domain and email?",
                    a: "Yes. We configure your domain connection smoothly with zero interruption to your email accounts or current operations.",
                  },
                  {
                    q: "What ongoing care is available after launch?",
                    a: "We offer dedicated monthly care plans (£95/mo, £195/mo, £395/mo) covering high-speed UK cloud hosting, security, backups, and regular updates.",
                  },
                ].map((item, i) => (
                  <AccordionItem key={item.q} value={`item-${i}`} className="studio-faq-item">
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
          </div>
        </section>
      </div>
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
      <label className="text-[13px] font-semibold text-ink" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={name === "name" || name === "email"}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-xl border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
