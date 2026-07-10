import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FeatureCard } from "@/components/site/FeatureCard";
import { agencyOffers, agencyProcess, agencyStats } from "@/lib/agency-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "The Harley Group - AI, web, content and digital workflows",
      },
      {
        name: "description",
        content:
          "A digital creative and technical consultancy led by Robbie Harley, helping communities, small teams and purpose-led organisations build useful AI-assisted websites, content and workflows.",
      },
      {
        property: "og:title",
        content: "The Harley Group - Useful digital work for people doing real work",
      },
      {
        property: "og:description",
        content:
          "AI-assisted web development, creative content production and practical technical consultancy with a human, service-led approach.",
      },
    ],
  }),
  component: HomePage,
});

const serviceMap = [
  {
    source: "Applied AI",
    title: "AI that speeds up the work, not the waffle.",
    body: "For THG, applied AI means faster planning, sharper copy, prototype-to-build workflows and automation that helps people make better decisions.",
  },
  {
    source: "Data",
    title: "Useful signals from everyday activity.",
    body: "We turn forms, content calendars, enquiries and community feedback into simple insight so teams know what to improve next.",
  },
  {
    source: "Cloud",
    title: "Solid platforms that keep running.",
    body: "Hosting, integrations, access, backups and lightweight operational checks are treated as part of the service, not an afterthought.",
  },
  {
    source: "Engineering",
    title: "Maker energy with grown-up discipline.",
    body: "The build style is hands-on and curious, shaped by ethical hacking, NHS IT reliability and a bias for shipping useful things.",
  },
] as const;

const impactExamples = [
  {
    label: "Community content",
    title: "One event can become a reusable content pack.",
    body: "Record once, then shape clips, graphics, quotes and web updates so volunteer teams do not have to restart every week.",
    metric: "5-10 assets from one source",
  },
  {
    label: "Launch support",
    title: "A clear idea can become a working page quickly.",
    body: "Use AI-assisted planning, Figma, copy and build workflows to move from rough brief to credible page, form and follow-up path.",
    metric: "Days, not months",
  },
  {
    label: "Digital workflow",
    title: "Small automations remove repeated admin.",
    body: "Connect enquiries, checklists, notifications and handoff notes so people spend more time serving and less time chasing details.",
    metric: "Less repeat work",
  },
] as const;

const approachCards = [
  [
    "Reliable",
    "NHS IT leadership brings calm habits: documentation, risk awareness, service continuity and respect for users.",
  ],
  [
    "Practical",
    "The work is explained in normal language. You will know what is being built, why it matters and what comes next.",
  ],
  [
    "Service-led",
    "Faith shows up as integrity, patience and a desire to build things that genuinely help people.",
  ],
  [
    "Always learning",
    "AI creation, ethical hacking and creative tooling keep the practice sharp without chasing novelty for its own sake.",
  ],
] as const;

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Mapping />
      <ServicesPreview />
      <Impact />
      <Why />
      <HumanElement />
      <Process />
      <FinalCta />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <TagChip>AI, web, content and community</TagChip>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.7rem,6vw,5.2rem)] leading-[0.98] tracking-tight text-ink">
              Useful digital work for people doing real work.
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-muted">
              The Harley Group helps purpose-led teams turn ideas into websites, content and
              workflows that are clear, reliable and easy to keep using.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton as="link" to="/contact" variant="dark" size="md">
                Talk through a project
              </PillButton>
              <PillButton as="link" to="/services" variant="ghost" size="md">
                See what we do
              </PillButton>
            </div>
            <p className="mt-4 text-[13px] text-ink-muted">
              Led by Robbie Harley: NHS IT leader, Christian, AI creator and hands-on digital maker.
            </p>
          </div>

          <div className="rounded-[24px] bg-ink p-6 text-white md:p-8">
            <div className="rounded-[18px] bg-white/8 p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                Homepage plan
              </div>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-white">
                Professional impact, warmer roots.
              </h2>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/72">
                <li>Lead with outcomes, not a long list of tools.</li>
                <li>Map AI, data, cloud and engineering into plain THG services.</li>
                <li>Show service values: reliability, integrity and community care.</li>
                <li>Make Robbie visible as the expert, learner and builder behind the work.</li>
              </ul>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {agencyStats.map((stat) => (
                <div key={stat.label} className="rounded-[14px] bg-white/8 p-4">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-white/45">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Mapping() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <SectionHeader
          title="How the twoday-style pillars translate for THG."
          intro="The structure is enterprise-grade: AI, data, cloud and engineering. The Harley Group version keeps the impact energy, then brings it down to practical work for communities, small teams and purpose-led organisations."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {serviceMap.map((item) => (
            <article key={item.source} className="rounded-[18px] border border-ink/10 bg-white p-6">
              <TagChip>{item.source}</TagChip>
              <h3 className="mt-5 text-xl font-medium text-ink">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader
          title="Three practical ways The Harley Group helps."
          intro="Clear enough to understand in one read, flexible enough to fit a church, charity, small business, creator, consultant or local team."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {agencyOffers.map((offer) => (
            <FeatureCard
              key={offer.slug}
              tag={offer.eyebrow}
              title={offer.title}
              body={
                <>
                  <span className="block font-semibold text-ink">{offer.price}</span>
                  <span className="mt-2 block">{offer.summary}</span>
                </>
              }
              ctaLabel="Explore services"
              ctaTo="/services"
              surface={offer.surface}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Impact() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader
          title="Impact should be visible, even when the work is small."
          intro="Borrow the outcome-led proof style, then make it honest for THG: time saved, clearer communication, reusable assets and less repeated admin."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {impactExamples.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-[20px] bg-white p-7 shadow-sm shadow-ink/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <TagChip>{item.label}</TagChip>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-ink">
                  {item.metric}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink">{item.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Why() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[22px] bg-surface-sage p-8 md:p-10">
            <TagChip>The why</TagChip>
            <h2 className="mt-5 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Technology is at its best when people can trust it.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
              The Harley Group is not trying to be a faceless agency. It is a partner for teams who
              need someone technical, creative and steady enough to understand the mission behind
              the task.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {approachCards.map(([title, body]) => (
              <div key={title} className="rounded-[18px] border border-ink/10 bg-white p-6">
                <h3 className="text-xl font-medium text-ink">{title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function HumanElement() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <TagChip>Meet the expert</TagChip>
            <h2 className="mt-5 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Less hierarchy. More craft, curiosity and care.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
              Instead of a corporate leadership grid, make this section feel like meeting the person
              behind the work: what Robbie is learning, what he builds, how he thinks and why
              service matters.
            </p>
          </div>
          <div className="rounded-[24px] bg-ink p-6 text-white md:p-8">
            <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div className="aspect-square rounded-[20px] bg-white/10 p-5">
                <div className="flex h-full flex-col justify-between rounded-[16px] border border-white/10 p-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Robbie Harley
                  </span>
                  <span className="text-4xl font-medium tracking-tight text-white">THG</span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-medium tracking-tight text-white">
                  Builder, learner, servant-hearted technologist.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  The story to tell is not job title first. It is practice: NHS reliability,
                  faith-shaped integrity, ethical hacking curiosity, AI experimentation and a
                  genuine love for helping communities communicate better.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "NHS IT",
                    "AI creator",
                    "Ethical hacking",
                    "Figma and Canva",
                    "Community service",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Process() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader
          title="A simple working rhythm."
          intro="Every project should feel calm and understandable: listen properly, shape the scope, build the useful thing, then improve it from real feedback."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {agencyProcess.map((step) => (
            <article key={step.step} className="rounded-[18px] border border-ink/10 bg-white p-6">
              <div className="font-mono text-[12px] text-ink-muted">{step.step}</div>
              <h3 className="mt-4 text-xl font-medium text-ink">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-16 md:py-28">
      <Container>
        <div className="rounded-[24px] bg-ink p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-white md:text-5xl">
                Got a digital problem that needs a human answer?
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
                Send a short note. We will talk through the goal, recommend the smallest useful next
                step and keep the language plain.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <PillButton as="link" to="/contact" variant="light" size="md">
                Start a conversation
              </PillButton>
              <Link
                to="/services"
                className="inline-flex items-center text-sm font-medium text-white/70 underline underline-offset-4 hover:text-white"
              >
                Compare services
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
