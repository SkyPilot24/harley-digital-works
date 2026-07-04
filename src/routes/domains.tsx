import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FeatureCard } from "@/components/site/FeatureCard";

export const Route = createFileRoute("/domains")({
  head: () => ({
    meta: [
      { title: "Domains — THG Digital Agency" },
      {
        name: "description",
        content:
          "A curated portfolio of premium domain names for community groups, local brands, and solo founders.",
      },
      { property: "og:title", content: "Domains — THG Digital Agency" },
    ],
  }),
  component: DomainsPage,
});

const DOMAINS = [
  { name: "communityhub.co", category: "Community", price: "£2,400", status: "Available" as const },
  { name: "localbrand.studio", category: "Brand", price: "£1,800", status: "Available" as const },
  { name: "makerscollective.co", category: "Community", price: "£1,200", status: "Under offer" as const },
  { name: "solofounder.io", category: "Founder", price: "£3,600", status: "Available" as const },
  { name: "everydaycraft.co", category: "Craft", price: "£950", status: "Available" as const },
  { name: "northlaunch.co", category: "Regional", price: "£1,400", status: "Sold" as const },
  { name: "commonground.studio", category: "Community", price: "£1,600", status: "Available" as const },
  { name: "quietbrand.co", category: "Brand", price: "£1,100", status: "Available" as const },
];

const statusStyles: Record<string, string> = {
  Available: "bg-primary/10 text-primary",
  "Under offer": "bg-ink/10 text-ink",
  Sold: "bg-ink/70 text-background",
};

function DomainsPage() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <TagChip>Domains</TagChip>
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
            A curated portfolio of premium names.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Names chosen for community groups, local brands and solo founders —
            each one short, memorable, and easy to say out loud.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {DOMAINS.map((d) => (
                  <article
                    key={d.name}
                    className="group flex flex-col justify-between rounded-[20px] border border-ink/10 bg-background p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <TagChip>{d.category}</TagChip>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] ${statusStyles[d.status]}`}
                        >
                          {d.status}
                        </span>
                      </div>
                      <p
                        className="mt-6 font-mono text-[22px] font-medium tracking-tight text-ink"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {d.name}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                      <span className="text-[17px] font-medium text-ink">
                        {d.price}
                      </span>
                      <PillButton
                        as="link"
                        to="/contact"
                        variant="ghost"
                        size="sm"
                      >
                        Enquire
                      </PillButton>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="md:col-span-4">
              <FeatureCard
                surface="sage"
                tag="How it works"
                title="Buying a domain — how our process runs."
                body="Enquire on the name you want. We reply within one working day with a purchase agreement, escrow details, and a transfer timeline. Most transfers complete inside 72 hours."
                ctaLabel="Ask about a name"
                ctaTo="/contact"
              />
            </aside>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
