import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { agencyOffers, agencyProcess } from "@/lib/agency-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - Harley Digital Works" },
      {
        name: "description",
        content:
          "Fixed-price launch websites, automation audits, and care plans for small operators who need a clear digital presence and lead capture.",
      },
      { property: "og:title", content: "Services - Harley Digital Works" },
      {
        property: "og:description",
        content:
          "Simple packages, clear outcomes, and fast delivery for launch-stage operators.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <TagChip>Services and packages</TagChip>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] leading-[1] tracking-tight text-ink">
            Clear offers that are easy to buy and easy to deliver.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Start with a focused package, prove the relationship, then grow into care plans, automation, and ongoing improvements.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton as="link" to="/contact" variant="dark" size="md">
              Book a free call
            </PillButton>
            <PillButton as="link" to="/onboarding" variant="ghost" size="md">
              See onboarding
            </PillButton>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {agencyOffers.map((offer) => (
              <article
                key={offer.slug}
                className={`flex h-full flex-col rounded-[20px] p-7 md:p-8 ${surfaceClass(offer.surface)}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <TagChip>{offer.eyebrow}</TagChip>
                  <span className="text-[13px] font-semibold text-ink">{offer.price}</span>
                </div>
                <h2 className="mt-7 text-3xl font-medium tracking-tight text-ink">{offer.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{offer.summary}</p>
                <div className="mt-5 rounded-[14px] bg-white/60 p-4 text-[14px] font-medium leading-relaxed text-ink">
                  Outcome: {offer.outcome}
                </div>
                <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-[14px] text-ink">
                  {offer.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <PillButton as="link" to="/contact" variant="dark" size="sm">
                    {offer.cta}
                  </PillButton>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="What every project includes."
            intro="The exact scope changes by package, but the foundation stays the same: clear positioning, responsive design, lead capture, and a clean handoff."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Positioning", "A clear headline, audience, offer, and next step so visitors know why to act."],
              ["Responsive build", "A fast site that works across phone, tablet, and desktop without layout surprises."],
              ["Lead capture", "Contact form, admin lead storage, and Slack-ready notification hooks."],
              ["Launch checklist", "Metadata, sitemap, diagnostics, and the next improvements to prioritise."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[18px] border border-ink/10 bg-white p-6">
                <h3 className="text-xl font-medium text-ink">{title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="How a client moves from enquiry to launch."
            intro="Keep the process visible. Buyers trust a simple path more than a vague promise."
          />
          <ol className="mt-10 divide-y divide-ink/10 rounded-[20px] border border-ink/10 bg-white px-6 md:px-8">
            {agencyProcess.map((step) => (
              <li key={step.step} className="grid gap-4 py-6 md:grid-cols-[110px_1fr] md:gap-8">
                <span className="font-mono text-[13px] text-ink-muted">{step.step}</span>
                <div>
                  <h3 className="text-xl font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-28">
        <Container>
          <div className="rounded-[24px] bg-ink p-8 text-white md:p-12">
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-white md:text-5xl">Not sure which package fits?</h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
              Send the enquiry anyway. We will recommend the smallest useful next step, even if that means starting with a quick audit instead of a full build.
            </p>
            <div className="mt-8">
              <PillButton as="link" to="/contact" variant="light" size="md">
                Submit an enquiry
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

function surfaceClass(surface: "sage" | "stone" | "mist" | "cream") {
  const map = {
    sage: "bg-surface-sage",
    stone: "bg-surface-stone",
    mist: "bg-surface-mist",
    cream: "bg-surface-cream",
  };
  return map[surface];
}