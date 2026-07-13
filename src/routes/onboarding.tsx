import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { agencyProcess, onboardingChecklist } from "@/lib/agency-content";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Client onboarding - Harley Digital Works" },
      {
        name: "description",
        content: "Simple onboarding for new Harley Digital Works clients: fit, assets, access, scope, and launch preparation.",
      },
      { property: "og:title", content: "Client onboarding - Harley Digital Works" },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <TagChip>Client onboarding</TagChip>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] leading-[1] tracking-tight text-ink">
            A simple start path for new client projects.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            After an enquiry, this page explains what happens next and what we need before delivery starts.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton as="link" to="/contact" variant="dark" size="md">Start with an enquiry</PillButton>
            <PillButton as="link" to="/services" variant="ghost" size="md">Compare packages</PillButton>
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <SectionHeader title="From first note to project start." intro="A visible onboarding path keeps the sale moving and reduces back-and-forth." />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {agencyProcess.map((step) => (
              <article key={step.step} className="rounded-[18px] border border-ink/10 bg-white p-6">
                <div className="font-mono text-[12px] text-ink-muted">{step.step}</div>
                <h2 className="mt-4 text-xl font-medium text-ink">{step.title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <TagChip>Start pack</TagChip>
              <h2 className="mt-5 text-3xl font-medium tracking-tight text-ink">What clients should prepare.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
                This checklist keeps the first paid week focused on decisions and delivery.
              </p>
            </div>
            <div className="rounded-[22px] bg-surface-sage p-6 md:p-8">
              <ul className="space-y-4">
                {onboardingChecklist.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-28">
        <Container>
          <div className="rounded-[24px] bg-ink p-8 text-white md:p-12">
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-white md:text-5xl">Ready to become a client?</h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
              Send the first note. The reply will confirm fit, package, timeline, and the exact assets needed to begin.
            </p>
            <div className="mt-8">
              <PillButton as="link" to="/contact" variant="light" size="md">Submit an enquiry</PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
