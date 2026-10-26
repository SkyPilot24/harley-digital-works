import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { FeatureCard } from "@/components/site/FeatureCard";
import {
  domainBundles,
  formatGbp,
  getDomainBuyNowPrice,
  rankedDomains,
} from "@/lib/domain-portfolio";
import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/domains")({
  head: () =>
    buildPageSeoHead({
      title: "Domains - Harley Digital Works",
      description:
        "A sale portfolio of owned domains across AI, autonomous driving, green transport, IoT, finance, and UK niche brands.",
      path: "/domains",
    }),
  component: DomainsPage,
});

const priorityStyles = {
  High: "bg-emerald-50 text-emerald-700",
  Medium: "bg-blue-50 text-blue-700",
  Low: "bg-ink/10 text-ink/70",
};

function DomainsPage() {
  const domains = rankedDomains().filter(
    (domain) => getDomainBuyNowPrice(domain.name) !== null && domain.category !== "Personal",
  );

  return (
    <PageShell>
      <section className="pt-20 pb-12 md:pt-24 md:pb-16">
        <Container>
          <TagChip>Domains for sale</TagChip>
          <h1
            className="mt-6 max-w-4xl text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              lineHeight: 1.02,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            Owned domains for AI, mobility, finance, smart tech, and UK niche projects.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Enquire about individual domains, portfolio bundles, or flexible lease-to-own terms.
            Guide prices help you assess fit before we confirm availability and transfer
            arrangements.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton as="link" to="/contact" search={{ package: "Domain purchase / enquiry" }}>
              Ask about a domain
            </PillButton>
            <PillButton
              as="link"
              to="/contact"
              search={{ package: "Domain portfolio offer" }}
              variant="ghost"
            >
              Make a portfolio offer
            </PillButton>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">
            Available via outright purchase, assisted registrar transfer, or bundled with an HDW
            website build. Every transaction is confirmed manually in writing before payment.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {domains.map((domain) => {
                  const buyNowPrice = getDomainBuyNowPrice(domain.name);
                  return (
                    <article
                      key={domain.name}
                      className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-5"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <TagChip>{domain.category}</TagChip>
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-800 border border-emerald-200/60">
                            Available
                          </span>
                        </div>
                        <p className="mt-5 font-mono text-[20px] font-medium text-ink">
                          {domain.name}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                          {domain.useCase}
                        </p>
                      </div>
                      <div className="mt-6 border-t border-ink/10 pt-4">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-ink-muted">Guide price</span>
                          <span className="font-medium text-ink">{formatGbp(buyNowPrice)}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-ink-muted font-mono">
                          <span>Lease-to-own</span>
                          <span className="text-emerald-700 font-semibold">From £79 / mo</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                          <PillButton
                            as="link"
                            to="/contact"
                            search={{
                              domain: domain.name,
                              package: "Domain purchase enquiry",
                            }}
                            size="sm"
                          >
                            Buy {domain.name}
                          </PillButton>
                          <PillButton
                            as="link"
                            to="/contact"
                            search={{
                              domain: domain.name,
                              package: "Domain lease-to-own enquiry",
                            }}
                            variant="ghost"
                            size="sm"
                          >
                            Lease from £79/mo
                          </PillButton>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="space-y-4 md:col-span-4">
              <FeatureCard
                surface="sage"
                tag="Acquisition Options"
                title="Purchase outright or lease-to-own."
                body="Acquire strategic digital real estate via outright purchase, escrow transfer, or flexible lease-to-own from £79/mo. We confirm availability, registrar requirements, and payment terms before either party commits."
                ctaLabel="Ask about a name"
                ctaTo="/contact"
              />
              <div className="rounded-2xl border border-ink/10 bg-white p-5">
                <h2 className="font-semibold text-ink">Suggested bundles</h2>
                <div className="mt-4 space-y-4">
                  {domainBundles.map((bundle) => (
                    <div key={bundle.name} className="rounded-xl bg-ink/[0.03] p-4">
                      <h3 className="font-medium text-ink">{bundle.name}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                        {bundle.domains.join(" · ")}
                      </p>
                      <p className="mt-2 text-xs text-ink/70">
                        Available as a package deal or individual transfers.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
