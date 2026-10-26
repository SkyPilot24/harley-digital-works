import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FeatureCard } from "@/components/site/FeatureCard";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Playbooks and resources - Harley Digital Works" },
      {
        name: "description",
        content:
          "Plain-English agency playbooks for daily sales, content, AI research, delivery, and client onboarding.",
      },
      { property: "og:title", content: "Playbooks and resources - Harley Digital Works" },
    ],
  }),
  component: ResourcesPage,
});

const PLAYBOOKS = [
  {
    tag: "Daily rhythm",
    title: "The 45-minute agency operating block",
    body: "Check leads, send one follow-up, create one asset, run one research task, and choose the next Revenue OS action.",
    surface: "sage" as const,
  },
  {
    tag: "Manus",
    title: "Research one niche before lunch",
    body: "Use Manus to gather competitor pages, common offers, pricing clues, and 10 prospects. Turn the output into tasks.",
    surface: "mist" as const,
  },
  {
    tag: "ChatGPT",
    title: "Draft sales replies without sounding robotic",
    body: "Paste the enquiry, ask for a concise reply, then edit it into your own voice before sending.",
    surface: "stone" as const,
  },
  {
    tag: "Google AI Pro",
    title: "Turn messy notes into a useful client doc",
    body: "Use it for longer synthesis: meeting notes, onboarding checklists, content drafts, and simple proposals.",
    surface: "cream" as const,
  },
  {
    tag: "Delivery",
    title: "A simple launch checklist",
    body: "Confirm copy, assets, contact form, metadata, sitemap, diagnostics, mobile view, and the post-launch care offer.",
    surface: "sage" as const,
  },
  {
    tag: "Sales",
    title: "One offer, one audience, one next step",
    body: "Keep each package easy to explain: who it is for, what it costs, what changes, and what happens next.",
    surface: "mist" as const,
  },
];

function ResourcesPage() {
  return (
    <PageShell>
      <section className="pt-20 pb-12 md:pt-24 md:pb-16">
        <Container>
          <TagChip>Playbooks</TagChip>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-tight text-ink">
            Simple steps for running the agency each day.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Plain-English runbooks for using Manus, ChatGPT, Google AI Pro, and the Control Centre
            to find leads, create assets, and deliver work.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeader
            title="Start here. Repeat daily."
            intro="The goal is not to use every tool. The goal is to do one useful sales, content, research, or delivery action every day."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PLAYBOOKS.map((item) => (
              <FeatureCard
                key={item.title}
                tag={item.tag}
                title={item.title}
                body={item.body}
                surface={item.surface}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="rounded-[24px] bg-ink p-8 text-white md:p-12">
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-white md:text-5xl">
              Medium technical is enough.
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
              Use the admin panel as the source of truth: Leads for enquiries, Revenue OS for
              priorities, Diagnostics for site health, Resources for useful content, and Playbooks
              for what to do next.
            </p>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
