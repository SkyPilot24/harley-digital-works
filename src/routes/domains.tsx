import { useState } from "react";
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
  type DomainAsset,
} from "@/lib/domain-portfolio";
import { siteConfig } from "@/lib/site-config";
import { Eye, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, X } from "lucide-react";

export const Route = createFileRoute("/domains")({
  head: () => {
    const canonicalUrl = `${siteConfig.url}/domains`;
    const ogImage = `${siteConfig.url}/brand/2026-10-21/HDW-Brand-Pack/08-Web-Ready/social-share-1200x630.png`;
    const title = "Strategic Domain Portfolio & Digital Brand Assets - Harley Digital Works";
    const description =
      "Acquire premium owned domains across AI, fintech, commercial EV mobility, smart IoT, and UK digital brands. Available via outright purchase, escrow transfer, or flexible lease-to-own.";

    const allSellableDomains = rankedDomains().filter(
      (domain) => getDomainBuyNowPrice(domain.name) !== null && domain.category !== "Personal",
    );

    const schemaJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: canonicalUrl,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: allSellableDomains.length,
        itemListElement: allSellableDomains.map((domain, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: domain.name,
            category: domain.category,
            description: domain.useCase,
            offers: {
              "@type": "Offer",
              priceCurrency: "GBP",
              price: getDomainBuyNowPrice(domain.name) || 0,
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "The Harley Group Ltd",
                url: siteConfig.url,
              },
            },
          },
        })),
      },
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: siteConfig.name },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(schemaJsonLd),
        },
      ],
    };
  },
  component: DomainsPage,
});

const DOMAIN_CONCEPTS: Record<string, { image: string; tag: string; description: string }> = {
  "letscarshop.com": {
    image: "/images/domains/letscarshop-preview.jpg",
    tag: "Automotive Marketplace Concept",
    description: "Digital car supermarket frontend with EV search filters and monthly finance calculator.",
  },
  "valuecurrencies.com": {
    image: "/images/domains/valuecurrencies-preview.jpg",
    tag: "Fintech Currency Terminal Concept",
    description: "Global FX comparison portal with live market data and provider transfer fee savings.",
  },
  "aiwearables.co.uk": {
    image: "/images/domains/aiwearables-preview.jpg",
    tag: "AI Wearables & HealthTech Concept",
    description: "Luxury British consumer tech store for biometric smart rings, AI glasses, and health trackers.",
  },
  "greenautomotive.co.uk": {
    image: "/images/domains/greenautomotive-preview.jpg",
    tag: "Commercial EV Fleet Concept",
    description: "Turnkey fleet electrification hub with commercial van grant and charging ROI calculators.",
  },
};

type CategoryFilter = "All" | "AI & Tech" | "Finance & Telecoms" | "Mobility & EV" | "Smart IoT";

function DomainsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
    desc: string;
  } | null>(null);

  const allDomains = rankedDomains().filter(
    (domain) => getDomainBuyNowPrice(domain.name) !== null && domain.category !== "Personal",
  );

  const filteredDomains = allDomains.filter((domain) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "AI & Tech") {
      return ["AI", "AI / Wearables", "AI / Avatars", "Health Tech"].includes(domain.category);
    }
    if (selectedCategory === "Finance & Telecoms") {
      return ["Finance", "Telecoms"].includes(domain.category);
    }
    if (selectedCategory === "Mobility & EV") {
      return ["Automotive", "Autonomous Vehicles", "Green Transport"].includes(domain.category);
    }
    if (selectedCategory === "Smart IoT") {
      return ["IoT", "Smart Home", "Drones"].includes(domain.category);
    }
    return true;
  });

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 border-b border-ink/5">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <TagChip>Strategic Digital Assets</TagChip>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/70">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Direct Owner Transfers
            </span>
          </div>
          <h1
            className="mt-6 max-w-4xl text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              lineHeight: 1.02,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            Owned domains for AI, fintech, electric mobility, and UK enterprise brands.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Acquire premium brand assets outright or via 0% interest 12-month lease-to-own. Every
            domain is owned directly by The Harley Group with verified registrar history, fast
            assisted transfer, and zero third-party broker buyer fees.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton as="link" to="/contact" search={{ package: "Domain purchase / enquiry" }}>
              Enquire about a domain
            </PillButton>
            <PillButton
              as="link"
              to="/contact"
              search={{ package: "Domain portfolio offer" }}
              variant="ghost"
            >
              Make a portfolio bundle offer
            </PillButton>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-ink/10 text-xs">
            <div className="flex items-center gap-2 text-ink-muted">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Nominet & ICANN Verified</span>
            </div>
            <div className="flex items-center gap-2 text-ink-muted">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>0% Interest Lease Option</span>
            </div>
            <div className="flex items-center gap-2 text-ink-muted">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Assisted Registrar Transfer</span>
            </div>
            <div className="flex items-center gap-2 text-ink-muted">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Optional Turnkey Website Build</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Catalog Section */}
      <section className="py-12 md:py-20">
        <Container>
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-sm">
            {(
              [
                "All",
                "AI & Tech",
                "Finance & Telecoms",
                "Mobility & EV",
                "Smart IoT",
              ] as CategoryFilter[]
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#081B30] text-white shadow-sm"
                    : "bg-ink/5 text-ink-muted hover:bg-ink/10 hover:text-ink"
                }`}
              >
                {cat}
                {cat === "All" && ` (${allDomains.length})`}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            {/* Domain Grid */}
            <div className="md:col-span-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredDomains.map((domain) => {
                  const buyNow = getDomainBuyNowPrice(domain.name);
                  const concept = DOMAIN_CONCEPTS[domain.name];
                  const monthlyEstimate = buyNow ? Math.round(buyNow / 12) : null;

                  return (
                    <article
                      key={domain.name}
                      className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-5 shadow-xs hover:border-ink/20 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <TagChip>{domain.category}</TagChip>
                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800 border border-emerald-200/60">
                            Available
                          </span>
                        </div>

                        <p className="mt-4 font-mono text-[19px] font-semibold text-ink tracking-tight">
                          {domain.name}
                        </p>

                        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                          {domain.useCase}
                        </p>

                        {/* Concept Visual Banner if available */}
                        {concept && (
                          <div className="mt-4 overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.02]">
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewImage({
                                  url: concept.image,
                                  title: domain.name,
                                  desc: concept.description,
                                })
                              }
                              className="group relative w-full text-left cursor-pointer"
                            >
                              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                <img
                                  src={concept.image}
                                  alt={`${domain.name} concept mockup`}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs">
                                  <span className="inline-flex items-center gap-1 font-medium bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-[11px]">
                                    <Sparkles className="h-3 w-3 text-amber-400" />
                                    {concept.tag}
                                  </span>
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                                    <Eye className="h-3 w-3" />
                                    Preview
                                  </span>
                                </div>
                              </div>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Pricing & Enquiry Action */}
                      <div className="mt-5 border-t border-ink/10 pt-4">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs text-ink-muted">Buy-It-Now</span>
                          <span className="font-mono text-base font-bold text-ink">
                            {buyNow ? formatGbp(buyNow) : "Enquire for terms"}
                          </span>
                        </div>

                        {monthlyEstimate && (
                          <div className="mt-1 flex items-center justify-between text-[11px] text-ink-muted">
                            <span>Lease-to-own</span>
                            <span className="font-mono text-emerald-700 font-medium">
                              From £{monthlyEstimate}/mo (12 mo)
                            </span>
                          </div>
                        )}

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
                            Acquire {domain.name}
                          </PillButton>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Sidebar with Bundles and Strategic Info */}
            <aside className="space-y-6 md:col-span-4">
              <FeatureCard
                surface="sage"
                tag="Acquisition Terms"
                title="Direct transfer or turnkey build."
                body="Acquire strategic brand assets outright or bundle them with a bespoke Harley Digital Works trade website. We manage escrow verification, Nominet tag changes, and Cloudflare DNS configuration."
                ctaLabel="Enquire on a name"
                ctaTo="/contact"
              />

              <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-xs">
                <h2 className="font-semibold text-ink flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Portfolio Bundles
                </h2>
                <p className="mt-1 text-xs text-ink-muted">
                  Package acquisitions available with bundled discounts.
                </p>
                <div className="mt-4 space-y-4">
                  {domainBundles.map((bundle) => (
                    <div key={bundle.name} className="rounded-xl bg-ink/[0.03] p-4 border border-ink/5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-ink text-sm">{bundle.name}</h3>
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          {bundle.domains.length} Domains
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed font-mono text-ink-muted">
                        {bundle.domains.join(" · ")}
                      </p>
                      <div className="mt-3 pt-3 border-t border-ink/5 flex items-center justify-between">
                        <span className="text-[11px] text-ink/70">Discounted package deal</span>
                        <PillButton
                          as="link"
                          to="/contact"
                          search={{
                            domain: bundle.name,
                            package: "Domain portfolio offer",
                          }}
                          size="sm"
                          variant="ghost"
                        >
                          Enquire
                        </PillButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escrow & Security Trust Card */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Secure Ownership Escrow
                </div>
                <p className="mt-2 text-xs leading-relaxed text-emerald-900/80">
                  Transactions over £1,000 can be completed via Sedo Escrow, Afternic, or Dan.com
                  for 100% buyer protection. Immediate auth-code release upon payment confirmation.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Visual Concept Lightbox Modal */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl bg-white p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Visual Concept Mockup
                </span>
                <h3 className="text-lg font-bold text-[#081B30]">{previewImage.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-950">
              <img
                src={previewImage.url}
                alt={`${previewImage.title} concept mockup`}
                className="w-full object-contain max-h-[70vh]"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                {previewImage.desc}
              </p>
              <PillButton
                as="link"
                to="/contact"
                search={{
                  domain: previewImage.title,
                  package: "Domain purchase enquiry",
                }}
                size="sm"
              >
                Acquire {previewImage.title}
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

