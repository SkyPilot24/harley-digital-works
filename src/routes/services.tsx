import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FeatureCard } from "@/components/site/FeatureCard";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — THG Digital Agency" },
      {
        name: "description",
        content:
          "Fixed-price websites, content engines, automation, care plans and full launch packages — built for small operators.",
      },
      { property: "og:title", content: "Services — THG Digital Agency" },
      {
        property: "og:description",
        content:
          "Fixed-price packages. Delivered in days. Priced for small operators.",
      },
    ],
  }),
  component: ServicesPage,
});

const PACKAGES = [
  {
    num: "01",
    tag: "One-time",
    title: "The Digital Foundation",
    price: "£800 – £1,200",
    body: "A fast, responsive 3-page website with basic SEO and a contact form. Built and delivered in one week — clean, purposeful code, never drag-and-drop.",
    bullets: [
      "3 pages, responsive design",
      "Basic on-page SEO",
      "Contact form + inbox routing",
      "Analytics setup",
      "One week delivery",
    ],
    surface: "sage" as const,
  },
  {
    num: "02",
    tag: "Per month",
    title: "The Content Engine",
    price: "£500",
    body: "10 custom AI image prompts, 5 ready-to-use video templates, and a full 30-day social calendar. Stay consistent without burning out.",
    bullets: [
      "30-day content calendar",
      "10 branded AI image prompts",
      "5 short-video templates",
      "Monthly review call",
      "Cancel any time",
    ],
    surface: "stone" as const,
  },
  {
    num: "03",
    tag: "Full package",
    title: "The Complete Presence",
    price: "£2,000+",
    body: "A 5-page website, YouTube channel setup and a custom AI prompt library built around your brand voice. Everything to show up professionally.",
    bullets: [
      "5-page website with CMS",
      "YouTube channel setup",
      "Custom AI prompt library",
      "Brand voice guidelines",
      "30 days post-launch support",
    ],
    surface: "mist" as const,
  },
];

const SUB_SERVICES = [
  {
    tag: "Care plans",
    title: "Hosting, updates, small changes and monitoring — one small monthly price.",
    to: "/services/care-plans",
    surface: "cream" as const,
  },
  {
    tag: "Launch plan",
    title: "A structured 30-day plan to take you from brief to live and converting.",
    to: "/services/launch-plan",
    surface: "sage" as const,
  },
  {
    tag: "Digital products",
    title: "Templates, prompt packs and playbooks — DIY tools for solo operators.",
    to: "/services/digital-products",
    surface: "stone" as const,
  },
];

function ServicesPage() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <TagChip>Services</TagChip>
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
            Three ways to work together.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Fixed-price packages. Delivered in days, not months. Priced for
            small operators, not enterprise budgets.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {PACKAGES.map((p) => (
              <article
                key={p.num}
                className={`flex h-full flex-col rounded-[20px] p-8 md:p-10 ${
                  p.surface === "sage"
                    ? "bg-surface-sage"
                    : p.surface === "stone"
                      ? "bg-surface-stone"
                      : "bg-surface-mist"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-ink-muted">
                    {p.num}
                  </span>
                  <TagChip>{p.tag}</TagChip>
                </div>
                <h3 className="mt-8 text-[24px] font-medium leading-snug tracking-tight text-ink">
                  {p.title}
                </h3>
                <div className="mt-2 text-[15px] text-ink-muted">{p.price}</div>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
                  {p.body}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-6 text-[14px] text-ink">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <PillButton as="link" to="/contact" variant="dark" size="sm">
                    Enquire
                  </PillButton>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="Everything else you might need."
            intro="Beyond the three packages, we run ongoing care plans, structured launch programmes, and a small library of DIY digital products."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {SUB_SERVICES.map((s) => (
              <FeatureCard
                key={s.tag}
                tag={s.tag}
                title={s.title}
                ctaTo={s.to}
                surface={s.surface}
              />
            ))}
          </div>
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
              Not sure which one fits?
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              Book a free 15-minute call and we&rsquo;ll help you scope the
              right package — or tell you honestly if we&rsquo;re not the right
              fit.
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
