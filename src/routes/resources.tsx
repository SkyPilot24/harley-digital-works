import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { NewsCard } from "@/components/site/NewsCard";
import { ImageFeatureBlock } from "@/components/site/ImageFeatureBlock";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — THG Digital Agency" },
      {
        name: "description",
        content:
          "Field notes, playbooks and case studies for people running small brands, communities and founder-led businesses.",
      },
      { property: "og:title", content: "Resources — THG Digital Agency" },
    ],
  }),
  component: ResourcesPage,
});

const FEATURED = {
  image:
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1800&q=80",
  imageAlt: "Open notebook, pen and coffee on a wooden desk",
  tag: "Featured",
  title:
    "The lean digital playbook — how small operators ship a professional presence in one week.",
  to: "/resources",
};

const ARTICLES = [
  {
    tag: "Field notes",
    title: "Why fixed-price beats hourly for small operators",
    excerpt:
      "The maths, the psychology, and the reason most agencies won't quote you a number.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Planner and pen on a warm desk",
    to: "/resources",
  },
  {
    tag: "Case study",
    title: "Six days from brief to launch — a community rebuild",
    excerpt:
      "The scope, the process, the trade-offs, and what we'd do differently next time.",
    image:
      "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Team collaborating around a laptop",
    to: "/resources",
  },
  {
    tag: "Playbook",
    title: "A 30-day content calendar for local brands",
    excerpt:
      "The template we use to keep small operators consistent without burning them out.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Green plants beside a keyboard",
    to: "/resources",
  },
  {
    tag: "Update",
    title: "Care Plans — post-launch peace of mind, priced fairly",
    excerpt:
      "Hosting, updates, small changes and monitoring bundled at one small monthly price.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Team meeting with laptops",
    to: "/services/care-plans",
  },
  {
    tag: "Field notes",
    title: "When AI helps and when it just gets in the way",
    excerpt:
      "A practical take on where AI-assisted delivery pays off — and where it doesn't.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Abstract computer code on a screen",
    to: "/resources",
  },
  {
    tag: "Playbook",
    title: "A one-page brief that gets you to a fixed quote in 24 hours",
    excerpt:
      "The exact template we send to new enquiries — copy it, adapt it, use it yourself.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Documents and pen on a desk",
    to: "/resources",
  },
];

function ResourcesPage() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <TagChip>Resources</TagChip>
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
            Field notes, playbooks &amp; case studies.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Practical writing for people running small brands, communities and
            founder-led businesses — no fluff, no growth-hack theatre.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container>
          <ImageFeatureBlock {...FEATURED} />
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <SectionHeader title="Recent" align="stacked" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a) => (
              <NewsCard key={a.title} {...a} />
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
