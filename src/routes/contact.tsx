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
import { z } from "zod";
import { toast } from "sonner";
import { submitLead } from "@/lib/lead-intake.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - THG Digital Agency" },
      {
        name: "description",
        content:
          "Book a free 15-minute call, or send us a note. We reply within one working day.",
      },
      { property: "og:title", content: "Contact - THG Digital Agency" },
    ],
  }),
  component: ContactPage,
});

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  package: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Tell us a little more").max(2000),
});

function ContactPage() {
  const submitLeadFn = useServerFn(submitLead);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = leadSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company") ?? "",
      package: fd.get("package") ?? "",
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
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
            Let&apos;s talk about what&apos;s next.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Book a free 15-minute call, or send us a note below. We reply within
            one working day, usually the same day.
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
              <div className="grid gap-5">
                {sent && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800">
                    Thanks, your message was sent. We will reply within one working day.
                  </div>
                )}
                <Field label="Your name" name="name" placeholder="Jane Smith" />
                <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
                <Field label="Company (optional)" name="company" placeholder="Local Brand Ltd" />
                <div className="grid gap-2">
                  <label className="text-[13px] font-medium text-ink" htmlFor="package">
                    Interested in
                  </label>
                  <select
                    id="package"
                    name="package"
                    className="rounded-lg border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue=""
                  >
                    <option value="" disabled>Choose a package</option>
                    <option>Launch Plan</option>
                    <option>Automation Audit</option>
                    <option>Care Plan</option>
                    <option>Content Engine</option>
                    <option>Digital Product</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-[13px] font-medium text-ink" htmlFor="message">
                    What can we help with?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
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
                    {busy ? "Sending..." : "Send message"}
                  </button>
                  <p className="mt-3 text-[12px] text-ink-muted">
                    We reply within one working day. No spam, ever.
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
                    <a href="mailto:hello@theharleygroup.org" className="text-ink hover:text-primary">
                      hello@theharleygroup.org
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
                  <dd className="mt-2 text-ink">Manchester, UK, working with clients across the UK and EU.</dd>
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
              { n: "01", t: "You send a note", d: "A short message is enough. We do not need a full brief to start." },
              { n: "02", t: "We reply within a working day", d: "With a fixed quote, a call slot, or an honest pointer to a better route." },
              { n: "03", t: "We scope the work together", d: "No obligation, no theatre. If it is a fit, we start the following week." },
            ].map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-6 md:grid-cols-[120px_1fr] md:gap-10"
              >
                <span className="font-mono text-[13px] tracking-[0.1em] text-ink-muted">
                  {s.n}
                </span>
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
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="border-ink/10"
                >
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        className="rounded-lg border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}