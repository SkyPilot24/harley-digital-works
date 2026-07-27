import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Container, PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { agencyOffers, agencyProcess } from "@/lib/agency-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harley Digital Works | Websites, content and automation" },
      {
        name: "description",
        content:
          "A practical digital partner for small organisations. Clear websites, useful content and smarter workflows, delivered without agency overhead.",
      },
      {
        property: "og:title",
        content: "Harley Digital Works | Digital work that makes the next step easier",
      },
      {
        property: "og:description",
        content:
          "Websites, content and automation for small organisations that need useful results without unnecessary complexity.",
      },
    ],
  }),
  component: Homepage,
});

const proofPoints = [
  "Clear scope",
  "Senior partner throughout",
  "Plain-English handover",
  "Useful after launch",
];

function Homepage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-[#0d0d0d] pb-20 pt-32 text-white md:pb-28 md:pt-44">
        <div
          aria-hidden
          className="absolute -right-20 top-0 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl"
        />
        <Container className="relative">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <TagChip tone="dark">Independent digital studio</TagChip>
              <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,7.5vw,7rem)] leading-[0.92] tracking-[-0.055em] text-white">
                Digital work that makes the next step easier.
              </h1>
              <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-white/70 md:text-[20px]">
                We help small organisations build a stronger web presence, create useful content and
                remove repetitive work with practical automation.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PillButton as="link" to="/contact">
                  Talk through your project
                </PillButton>
                <PillButton
                  as="link"
                  to="/services"
                  variant="light"
                  className="bg-white/10 text-white hover:bg-white/15"
                >
                  Explore services
                </PillButton>
              </div>
            </div>
            <aside className="border-l border-white/15 pl-6 lg:col-span-4 lg:pl-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                Start with the problem
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-white/75">
                You do not need to know which service to buy. Tell us what is slowing you down and
                we will recommend the smallest useful next step.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <Container>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 py-5 text-[13px] font-medium text-ink sm:px-4 first:pl-0"
              >
                <Check size={15} className="text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <TagChip>What we do</TagChip>
              <h2 className="mt-5 text-[clamp(2.2rem,4vw,3.6rem)] tracking-[-0.04em] text-ink">
                Three capabilities. One joined-up partner.
              </h2>
            </div>
            <p className="text-[18px] leading-relaxed text-ink-muted md:col-span-6 md:col-start-7 md:pt-10">
              A website should explain the offer. Content should bring the right people to it.
              Automation should make every enquiry easier to handle.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {agencyOffers.map((offer, index) => (
              <article
                key={offer.slug}
                className="group flex min-h-[400px] flex-col rounded-[22px] border border-ink/10 bg-white p-7 transition-transform hover:-translate-y-1 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-muted">0{index + 1}</span>
                  {index === 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                      <Sparkles size={11} /> Most requested
                    </span>
                  )}
                </div>
                <h3 className="mt-10 text-[28px] text-ink">{offer.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{offer.summary}</p>
                <p className="mt-6 border-t border-ink/10 pt-6 text-[14px] leading-relaxed">
                  <strong>What changes:</strong> {offer.outcome}
                </p>
                <Link
                  to="/contact"
                  className="mt-auto flex items-center justify-between pt-8 text-[14px] font-semibold"
                >
                  {offer.cta}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-stone py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <TagChip>Who it is for</TagChip>
              <h2 className="mt-5 text-[clamp(2.1rem,3.5vw,3.25rem)] tracking-[-0.04em]">
                Built for teams doing a lot with a little.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
                Small businesses, community organisations and founder-led teams that value direct
                access and practical systems.
              </p>
            </div>
            <div className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-7 lg:col-start-6">
              {[
                "A credible digital presence that explains what you do.",
                "Content people can understand, use and share.",
                "Workflows that save time without adding complexity.",
              ].map((item, i) => (
                <div key={item} className="grid grid-cols-[48px_1fr] py-7">
                  <span className="font-mono text-[11px] text-primary">0{i + 1}</span>
                  <p className="text-[18px] text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <TagChip>How it works</TagChip>
              <h2 className="mt-5 text-[clamp(2.1rem,3.5vw,3.25rem)] tracking-[-0.04em]">
                Clear from first conversation to handover.
              </h2>
            </div>
            <ol className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-7 lg:col-start-6">
              {agencyProcess.map((step) => (
                <li key={step.step} className="grid gap-4 py-7 sm:grid-cols-[60px_120px_1fr]">
                  <span className="font-mono text-[11px] text-primary">{step.step}</span>
                  <h3 className="text-[18px]">{step.title}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="rounded-[28px] bg-[#0d0d0d] px-7 py-12 text-white md:px-12 md:py-16">
            <TagChip tone="dark">A useful first conversation</TagChip>
            <div className="mt-6 grid items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] tracking-[-0.045em] text-white">
                  Bring the messy version. We will help make it clear.
                </h2>
                <p className="mt-5 max-w-2xl text-[17px] text-white/65">
                  Share the goal and the sticking point. You will get a direct response within one
                  working day.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <PillButton as="link" to="/contact">
                  Start the conversation
                </PillButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
