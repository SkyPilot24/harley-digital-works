import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Workflow, Compass } from "lucide-react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Digital Consultancy Services | Harley Digital Works" },
      {
        name: "description",
        content:
          "Web design and development, AI automation and focused digital transformation for ambitious organisations.",
      },
    ],
  }),
  component: Page,
});
const capabilities = [
  {
    n: "01",
    icon: Code2,
    title: "Web design & development",
    copy: "Positioning, user experience, content and engineering for websites that explain the value and create qualified action.",
    to: "/services/web-design-development",
    items: [
      "Strategy and information architecture",
      "UX, content and interface design",
      "Responsive development and launch",
    ],
  },
  {
    n: "02",
    icon: Workflow,
    title: "AI & automation",
    copy: "Practical workflows that reduce repetitive administration and connect the tools your team already uses.",
    to: "/services/ai-automation",
    items: [
      "Workflow and opportunity audits",
      "Integrations and AI-assisted processes",
      "Human review, documentation and enablement",
    ],
  },
  {
    n: "03",
    icon: Compass,
    title: "Digital transformation",
    copy: "Focused modernisation of customer journeys and operational systems, delivered in useful stages.",
    to: "/services/digital-transformation",
    items: [
      "Service and journey mapping",
      "Prioritised roadmap and prototypes",
      "Digital product delivery and adoption",
    ],
  },
];
function Page() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <p className="eyebrow">Services</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.5rem)] leading-[.94] tracking-[-.055em]">
            Strategy and technology, joined around the outcome.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
            We help organisations improve how they present, operate and serve customers—through
            clear decisions and working digital products.
          </p>
          <div className="mt-9">
            <PillButton as="link" to="/contact" variant="dark">
              Start a project
            </PillButton>
          </div>
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.n}
                to={c.to}
                className="service-row group grid gap-8 border-t border-ink/15 py-10 lg:grid-cols-[80px_1fr_1fr_auto]"
              >
                <span className="font-mono text-xs text-ink-muted">{c.n}</span>
                <div>
                  <Icon size={24} strokeWidth={1.5} />
                  <h2 className="mt-5 text-3xl tracking-[-.035em]">{c.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{c.copy}</p>
                </div>
                <ul className="space-y-3 text-sm">
                  {c.items.map((x) => (
                    <li key={x} className="border-t border-ink/10 pt-3">
                      {x}
                    </li>
                  ))}
                </ul>
                <ArrowRight className="hidden group-hover:translate-x-1 lg:block" />
              </Link>
            );
          })}
        </Container>
      </section>
      <section className="bg-ink py-20 text-background">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-background/55">Not sure where to start?</p>
              <h2 className="mt-5 max-w-3xl text-4xl tracking-[-.04em] md:text-6xl">
                Bring us the problem, not a finished brief.
              </h2>
            </div>
            <PillButton as="link" to="/contact" variant="light">
              Discuss your idea
            </PillButton>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
