import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — THG Digital Agency" },
      {
        name: "description",
        content:
          "Book a free 15-minute call, or send us a note. We reply within one working day.",
      },
      { property: "og:title", content: "Contact — THG Digital Agency" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
            Let&rsquo;s talk about what&rsquo;s next.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Book a free 15-minute call, or send us a note below. We reply within
            one working day — usually the same day.
          </p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <form
              className="rounded-[20px] border border-ink/10 bg-background p-8 md:col-span-7 md:p-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-5">
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
                    <option>Digital Foundation</option>
                    <option>Content Engine</option>
                    <option>Complete Presence</option>
                    <option>Care Plan</option>
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
                    placeholder="A short note about what you're trying to do…"
                    className="rounded-lg border border-ink/15 bg-background px-4 py-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="pt-2">
                  <PillButton variant="dark" size="md" arrow>
                    Send message
                  </PillButton>
                  <p className="mt-3 text-[12px] text-ink-muted">
                    Form is a UI preview — wiring to Cloud comes in a follow-up.
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
                    <a href="mailto:hello@thg.digital" className="text-ink hover:text-primary">
                      hello@thg.digital
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
              </dl>
            </aside>
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
