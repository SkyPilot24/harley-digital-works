import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PortraitFeature } from "@/components/site/PortraitFeature";
import { FeatureCard } from "@/components/site/FeatureCard";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — THG Digital Agency" },
      {
        name: "description",
        content:
          "Founded by Dr Robbie Harley, MBA. THG is the lean, AI-powered digital partner for small operators who want big-brand results without the agency overhead.",
      },
      { property: "og:title", content: "About — THG Digital Agency" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    tag: "Direct",
    title: "Plain English. Fixed prices. No jargon, no theatre — just the work.",
    surface: "sage" as const,
  },
  {
    tag: "Capable",
    title: "Twenty-plus years of digital, plus AI-assisted delivery that keeps prices honest.",
    surface: "stone" as const,
  },
  {
    tag: "Human",
    title: "Built for the people running things themselves — not for enterprise procurement.",
    surface: "mist" as const,
  },
];

const MILESTONES = [
  { year: "2004", title: "First site shipped — a local charity in Manchester." },
  { year: "2015", title: "Ten years in enterprise digital transformation." },
  { year: "2022", title: "MBA completed. Focus shifts to small operators." },
  { year: "2024", title: "THG Digital Agency launched under The Harley Group." },
  { year: "2026", title: "Forty-plus fixed-price projects delivered." },
];

function AboutPage() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <TagChip>About</TagChip>
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
            A lean, AI-powered partner for small operators who deserve
            big-brand results.
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            THG Digital Agency was founded by Dr Robbie Harley, MBA — after
            twenty years of watching small brands, community groups, and solo
            founders get quoted enterprise prices for work they didn&rsquo;t
            need. We do the opposite.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <PortraitFeature
            tag="Founder"
            title="Meet Dr Robbie Harley, MBA"
            quote="Small brands don't need bigger agencies. They need shorter timelines, honest quotes, and someone who'll pick up the phone."
            ctaLabel="Book a call with Robbie"
            ctaTo="/contact"
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"
            imageAlt="Portrait of Dr Robbie Harley"
          />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="How we work"
            intro="Three principles that shape every decision — from the first call to the final handover."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {VALUES.map((v) => (
              <FeatureCard key={v.tag} tag={v.tag} title={v.title} surface={v.surface} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title="Milestones" align="stacked" />
          <ul className="mt-12 divide-y divide-ink/10">
            {MILESTONES.map((m) => (
              <li
                key={m.year}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-6 md:grid-cols-[120px_1fr] md:gap-10"
              >
                <span className="font-mono text-[13px] tracking-[0.1em] text-ink-muted">
                  {m.year}
                </span>
                <p className="text-[17px] leading-snug text-ink">{m.title}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <h2
              className="text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              Ready when you are.
            </h2>
            <div className="mt-8">
              <PillButton as="link" to="/contact" variant="dark" size="md">
                Book a free call
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
