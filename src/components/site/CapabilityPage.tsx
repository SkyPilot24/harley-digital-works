import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { PageShell, Container } from "./PageShell";
import { PillButton } from "./PillButton";

export type Capability = {
  eyebrow: string;
  title: string;
  intro: string;
  problems: string[];
  deliverables: string[];
  outcomes: string[];
  related: { label: string; to: string }[];
};

export function CapabilityPage({
  data,
  children,
}: {
  data: Capability;
  children?: React.ReactNode;
}) {
  return (
    <PageShell>
      <section className="border-b border-ink/10 pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <p className="eyebrow">{data.eyebrow}</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,6.5rem)] leading-[.94] tracking-[-.055em]">
            {data.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">{data.intro}</p>
          <div className="mt-9">
            <PillButton as="link" to="/contact" variant="dark">
              Discuss your project
            </PillButton>
          </div>
        </Container>
      </section>
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">When this helps</p>
              <h2 className="mt-5 text-4xl tracking-[-.04em]">
                Start with the friction, not the technology.
              </h2>
            </div>
            <ul className="lg:col-span-8">
              {data.problems.map((item, i) => (
                <li
                  key={item}
                  className="grid gap-4 border-t border-ink/15 py-7 sm:grid-cols-[64px_1fr]"
                >
                  <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
                  <p className="text-xl">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="bg-ink py-20 text-background md:py-28">
        <Container>
          <p className="eyebrow text-background/55">What we can deliver</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-background/15 sm:grid-cols-2 lg:grid-cols-3">
            {data.deliverables.map((item) => (
              <article key={item} className="bg-ink p-7">
                <Check className="text-primary" size={18} />
                <h3 className="mt-12 text-xl">{item}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>
      {children}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">The outcome</p>
              <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[.98] tracking-[-.05em]">
                Change people can feel and teams can run.
              </h2>
            </div>
            <ul className="space-y-4">
              {data.outcomes.map((item) => (
                <li key={item} className="flex gap-3 border-t border-ink/15 pt-5 text-lg">
                  <Check className="mt-1 shrink-0 text-primary" size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-20 flex flex-wrap gap-4 border-t border-ink/15 pt-8">
            {data.related.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex items-center gap-2 text-sm font-medium"
              >
                {item.label}
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
