import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FeatureCard } from "@/components/site/FeatureCard";

type Surface = "sage" | "stone" | "mist" | "cream";

export function ServiceDetailLayout({
  eyebrow,
  title,
  intro,
  price,
  priceTag,
  deliverables,
  processTitle,
  processIntro,
  process,
  ctaTitle = "Ready to start?",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  price: string;
  priceTag: string;
  deliverables: { tag: string; title: string; surface: Surface }[];
  processTitle: string;
  processIntro: string;
  process: { step: string; title: string; body: string }[];
  ctaTitle?: string;
}) {
  return (
    <PageShell>
      <section className="pt-32 pb-14 md:pt-40 md:pb-20">
        <Container>
          <TagChip>{eyebrow}</TagChip>
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
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink-muted">{intro}</p>

          <div className="mt-10 flex flex-wrap items-baseline gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                {priceTag}
              </div>
              <div className="mt-2 text-[28px] font-medium tracking-tight text-ink">{price}</div>
            </div>
            <PillButton as="link" to="/contact" variant="dark" size="md">
              Enquire
            </PillButton>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <SectionHeader
            title="What you get"
            intro="Everything included in the package, priced upfront, delivered on the timeline we agree."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d) => (
              <FeatureCard key={d.tag} tag={d.tag} title={d.title} surface={d.surface} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title={processTitle} intro={processIntro} />
          <ol className="mt-12 divide-y divide-ink/10">
            {process.map((p) => (
              <li key={p.step} className="grid gap-4 py-8 md:grid-cols-[120px_1fr] md:gap-10">
                <span className="font-mono text-[13px] tracking-[0.1em] text-ink-muted">
                  {p.step}
                </span>
                <div>
                  <h3 className="text-[20px] font-medium tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-muted">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <h2
              className="text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
              }}
            >
              {ctaTitle}
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              Book a free 15-minute call and we&rsquo;ll scope the work together.
            </p>
            <div className="mt-8">
              <PillButton as="link" to="/contact" variant="primary" size="md">
                Book a free call
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
