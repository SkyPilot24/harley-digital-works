import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FeatureCard } from "@/components/site/FeatureCard";
import { ImageFeatureBlock } from "@/components/site/ImageFeatureBlock";
import { PortraitFeature } from "@/components/site/PortraitFeature";
import { NewsCard } from "@/components/site/NewsCard";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { usePublishedResources } from "@/hooks/use-cms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "THG Digital Agency — Applied craft. Fixed-price delivery. Lasting impact.",
      },
      {
        name: "description",
        content:
          "Websites, content and automation for community groups, solo founders and local brands. Fixed prices, one-week builds, plain-English throughout.",
      },
      {
        property: "og:title",
        content: "THG Digital Agency — Applied craft. Lasting impact.",
      },
      {
        property: "og:description",
        content:
          "The lean, AI-powered digital partner for small operators. Fixed-price websites, content and automation.",
      },
    ],
  }),
  component: HomePage,
});

// ─── Motion primitives ───────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
};

// ─── Content ─────────────────────────────────────────────────────────────

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80";

const CAPABILITIES = [
  {
    tag: "Websites",
    title: "Fast, purposeful sites built in one week — never templates.",
    to: "/services",
    surface: "sage" as const,
  },
  {
    tag: "Content",
    title: "AI-assisted content engines that keep you consistent without burnout.",
    to: "/services/content-engine",
    surface: "stone" as const,
  },
  {
    tag: "Automation",
    title: "Quiet automations that save you a working day every week.",
    to: "/services/automation",
    surface: "mist" as const,
  },
  {
    tag: "Domains",
    title: "A curated portfolio of premium names for community & local brands.",
    to: "/domains",
    surface: "cream" as const,
  },
];

const IMPACT = [
  {
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Community group meeting in a bright hall",
    tag: "Community",
    title:
      "Rebuilt a community CIC's site in six days — enquiries doubled the first month.",
    to: "/resources",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Founder working at a desk with a laptop",
    tag: "Solo founder",
    title:
      "A one-person consultancy launched with a five-page site and a 30-day content calendar.",
    to: "/resources",
  },
];

const NEWS = [
  {
    tag: "Field notes",
    title: "Why fixed-price beats hourly for small operators",
    excerpt:
      "The maths, the psychology, and the reason most agencies won't quote you a number.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Notebook and coffee on a wooden desk",
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
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Planner and pen on a warm desk",
    to: "/resources",
  },
  {
    tag: "Update",
    title: "New: Care Plans for post-launch peace of mind",
    excerpt:
      "Hosting, updates, small changes and monitoring — all bundled at one small monthly price.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Green plants beside a keyboard",
    to: "/services/care-plans",
  },
];

// ─── Hero ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-16">
      <Container>
        <div className="relative overflow-hidden rounded-[24px]">
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[21/9] lg:aspect-[21/9]">
            <img
              src={HERO_IMAGE}
              alt="Hands holding a phone with a soft, out-of-focus green background"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,20,20,0.15) 0%, rgba(20,20,20,0) 45%, rgba(20,20,20,0.35) 100%)",
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TagChip tone="on-image">Digital · Web · Content</TagChip>
              </motion.div>

              <div className="max-w-3xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="text-white"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.02,
                    fontSize: "clamp(2.25rem, 6vw, 5rem)",
                  }}
                >
                  Applied craft.
                  <br />
                  Fixed-price delivery.
                  <br />
                  Lasting impact.
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="mt-7"
                >
                  <PillButton as="link" to="/contact" variant="primary" size="md">
                    Book a free call
                  </PillButton>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Intro band + capability grid ────────────────────────────────────────

function IntroBand() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div {...fadeUp} className="max-w-4xl">
          <p className="text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug tracking-tight text-ink">
            We help small operators build a digital presence that actually works
            — powered by fixed-price packages, AI-assisted delivery, and plain
            English throughout.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14"
        >
          <p className="mb-6 text-[13px] text-ink-muted">
            Learn how we work with:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <FeatureCard
                key={c.tag}
                tag={c.tag}
                title={c.title}
                ctaTo={c.to}
                surface={c.surface}
                compact
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Lasting impact (image feature blocks) ───────────────────────────────

function LastingImpact() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div {...fadeUp}>
          <SectionHeader
            title="Lasting impact"
            intro="Every project we take on is built to keep working — long after launch. Small, sharp, honest work for people running things themselves."
          />
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {IMPACT.map((i) => (
            <ImageFeatureBlock
              key={i.tag}
              image={i.image}
              imageAlt={i.imageAlt}
              tag={i.tag}
              title={i.title}
              ctaTo={i.to}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Portrait feature ────────────────────────────────────────────────────

function Founder() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <motion.div {...fadeUp}>
          <PortraitFeature
            tag="Meet the founder"
            title="Meet Dr Robbie Harley, MBA"
            quote="I wanted to make digital work matter — not just for platforms, but for the people running small things well."
            ctaLabel="Read Robbie's story"
            ctaTo="/about"
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"
            imageAlt="Portrait of a professional man in a studio setting"
          />
        </motion.div>
      </Container>
    </section>
  );
}

// ─── News grid ───────────────────────────────────────────────────────────

function LatestThinking() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div {...fadeUp}>
          <SectionHeader
            title="Latest thinking"
            align="stacked"
            intro={undefined}
          />
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {NEWS.map((n) => (
            <NewsCard key={n.title} {...n} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────

function LetsTalk() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <motion.div {...fadeUp} className="max-w-3xl">
          <h2
            className="text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
            }}
          >
            Let&rsquo;s talk about
            <br />
            what&rsquo;s next.
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            Book a free 15-minute call. We&rsquo;ll talk through where you are,
            what&rsquo;s not working, and what you actually need — no sales
            pitch either way.
          </p>
          <div className="mt-8">
            <PillButton as="link" to="/contact" variant="dark" size="md">
              Get in touch
            </PillButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <IntroBand />
      <LastingImpact />
      <Founder />
      <LatestThinking />
      <LetsTalk />
    </PageShell>
  );
}
