import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import {
  domainBundles,
  formatGbp,
  getDomainBuyNowPrice,
  rankedDomains,
} from "@/lib/domain-portfolio";
import { siteConfig } from "@/lib/site-config";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Lock,
  Laptop,
  Search,
  Car,
  Watch,
  LineChart,
  Zap,
  Home,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Eye,
  X,
} from "lucide-react";

export const Route = createFileRoute("/domains")({
  head: () => {
    const canonicalUrl = `${siteConfig.url}/domains`;
    const ogImage = `${siteConfig.url}/brand/2026-10-21/HDW-Brand-Pack/08-Web-Ready/social-share-1200x630.png`;
    const title = "The Harley Group — Strategic Domain Portfolio & IP Assets";
    const description =
      "Acquire premium owned domains across autonomous systems, fintech, commercial EV mobility, smart IoT, and UK digital brands. Available via outright purchase, escrow transfer, or 0% lease-to-own.";

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

type FlagshipId =
  "letscarshop" | "aiwearables" | "valuecurrencies" | "greenautomotive" | "mydigitalhouse";

interface FlagshipSpec {
  id: FlagshipId;
  domain: string;
  pillLabel: string;
  sectorKicker: string;
  description: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  secondaryMetricSub: string;
  bullets: string[];
  previewImage?: string;
}

const FLAGSHIP_SPECS: Record<FlagshipId, FlagshipSpec> = {
  letscarshop: {
    id: "letscarshop",
    domain: "letscarshop.com",
    pillLabel: "Marketplace",
    sectorKicker: "AUTOMOTIVE // .COM MARKETPLACE",
    description:
      "A high-conversion automotive aggregator designed for UK dealership networks, direct EV inventory reservations, and transparent finance calculators. Turnkey build includes vehicle feed API integration, instant valuation widget, and automated test-drive dispatch.",
    secondaryMetricLabel: "Turnkey Launch Time",
    secondaryMetricValue: "2–3 Weeks",
    secondaryMetricSub: "Full stack deployment",
    bullets: [
      "Instant stock feeds & reg lookup schema",
      "FCA-compliant finance calculator modules",
      "24/7 autonomous lead capture concierge ready",
    ],
    previewImage: "/images/domains/letscarshop-preview.jpg",
  },
  aiwearables: {
    id: "aiwearables",
    domain: "aiwearables.co.uk",
    pillLabel: "Hardware DTC",
    sectorKicker: "HARDWARE // DTC FLAGSHIP STORE",
    description:
      "A minimalist Nordic-luxury ecommerce and editorial platform for smart rings, spatial audio glasses, and biometric monitors. Includes headless commerce integration, interactive product comparison matrices, and UK consumer subscription billing.",
    secondaryMetricLabel: "Turnkey Launch Time",
    secondaryMetricValue: "3 Weeks",
    secondaryMetricSub: "Shopify Plus / Headless",
    bullets: [
      "Apple Pay, Klarna & multi-currency checkout",
      "Biometric spec matrix & comparison engine",
      "Integrated UK lifestyle review publication",
    ],
    previewImage: "/images/domains/aiwearables-preview.jpg",
  },
  valuecurrencies: {
    id: "valuecurrencies",
    domain: "valuecurrencies.com",
    pillLabel: "Fintech Terminal",
    sectorKicker: "FINTECH // MARKET INTELLIGENCE TERMINAL",
    description:
      "An institutional FX and multi-asset currency analytical terminal. Designed for currency spread comparisons, reserve telemetry, and macro interest rate monitors. Turnkey setup includes live rate feeds and premium financial briefing gating.",
    secondaryMetricLabel: "Global Authority",
    secondaryMetricValue: ".COM Generic",
    secondaryMetricSub: "Premium Global Identity",
    bullets: [
      "Sub-second FX tick telemetry & cross rates",
      "SaaS tier subscriptions & Stripe billing",
      "Institutional branding & research layout",
    ],
    previewImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7eznH7Mq-GVIjETfRiU7uOKzzkYuXhbQqzo7Uiqo_AcyIU27bHa9rKokczFngtciD3AxEpGrA4MCCiRvKWsBtaKA877kghJf8FzyddtKXX5U7zBtFn4QHOKNAx8RRmiHZUTNSo4u7yx1CBw_KcQ2vgwjFLGvIiScgX5VPqfr8zWT6UpoYFAou-_b1h7_FuPXxDwfi274qUm_1iP_0bsLI1eXgwOZWfDYtALVq2fk",
  },
  greenautomotive: {
    id: "greenautomotive",
    domain: "greenautomotive.co.uk",
    pillLabel: "Fleet B2B",
    sectorKicker: "CLEAN ENERGY // COMMERCIAL FLEET ELECTRIFICATION",
    description:
      "A high-ticket B2B commercial transport portal serving UK fleet operators switching vans, HGVs, and depots to zero emissions. Features UK Government plug-in van grant calculator, charging depot infrastructure RFP engine, and battery lifecycle intelligence.",
    secondaryMetricLabel: "Target Market",
    secondaryMetricValue: "UK Fleets",
    secondaryMetricSub: "High B2B Commercial Value",
    bullets: [
      "Commercial EV lease quotation workflows",
      "Depot DC rapid charging RFP lead generator",
      "Scope 1 & 3 fleet emissions reporting portal",
    ],
    previewImage: "/images/domains/greenautomotive-preview.jpg",
  },
  mydigitalhouse: {
    id: "mydigitalhouse",
    domain: "mydigitalhouse.co.uk",
    pillLabel: "Smart Living",
    sectorKicker: "SMART LIVING // ARCHITECTURAL IOT CONCIERGE",
    description:
      "A high-end residential smart home consultancy and installation directory. Built for certified CEDIA integrators, Matter-protocol IoT ecosystems, KNX lighting control, and luxury home cinema engineers across the UK.",
    secondaryMetricLabel: "Category Alignment",
    secondaryMetricValue: "Smart Living",
    secondaryMetricSub: "Affluent UK Homeowners",
    bullets: [
      "UK installer directory & postcode lead routing",
      "Architect & developer specification packages",
      "Matter & Apple HomeKit compatibility guide",
    ],
  },
};

type InventoryCategory = "all" | "ai" | "mobility" | "clean" | "smart" | "finance";

function matchesInventoryCategory(category: string, domainName: string, filter: InventoryCategory) {
  if (filter === "all") return true;
  if (filter === "ai") {
    return (
      ["AI", "AI / Wearables", "AI / Avatars", "Health Tech"].includes(category) ||
      domainName === "5gdata.org"
    );
  }
  if (filter === "mobility") {
    return ["Automotive", "Autonomous Vehicles", "Green Transport"].includes(category);
  }
  if (filter === "clean") {
    return category === "Green Transport";
  }
  if (filter === "smart") {
    return ["IoT", "Smart Home", "Drones", "Telecoms"].includes(category);
  }
  if (filter === "finance") {
    return ["Finance", "Automotive"].includes(category);
  }
  return true;
}

function DomainsPage() {
  const [activeConceptId, setActiveConceptId] = useState<FlagshipId>("letscarshop");
  const [activeFilter, setActiveFilter] = useState<InventoryCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    title: string;
    desc: string;
  } | null>(null);

  // Precision Acquisition Modal Drawer state
  const [inquiryModal, setInquiryModal] = useState<{
    domainName: string;
    pricingGuide: string;
    defaultModel: "buyout" | "lease" | "turnkey" | "bundle";
  } | null>(null);
  const [modalSubmitted, setModalSubmitted] = useState<boolean>(false);
  const [modalModel, setModalModel] = useState<"buyout" | "lease" | "turnkey" | "bundle">("buyout");
  const [modalName, setModalName] = useState<string>("");
  const [modalCompany, setModalCompany] = useState<string>("");
  const [modalEmail, setModalEmail] = useState<string>("");
  const [modalPhone, setModalPhone] = useState<string>("");
  const [modalOffer, setModalOffer] = useState<string>("");
  const [modalNotes, setModalNotes] = useState<string>("");

  const allDomains = rankedDomains().filter(
    (domain) => getDomainBuyNowPrice(domain.name) !== null && domain.category !== "Personal",
  );

  const filteredDomains = allDomains.filter((domain) => {
    const catMatch = matchesInventoryCategory(domain.category, domain.name, activeFilter);
    const q = searchQuery.trim().toLowerCase();
    const queryMatch =
      !q ||
      domain.name.toLowerCase().includes(q) ||
      domain.category.toLowerCase().includes(q) ||
      domain.useCase.toLowerCase().includes(q);
    return catMatch && queryMatch;
  });

  const activeSpec = FLAGSHIP_SPECS[activeConceptId];
  const activeBuyout = getDomainBuyNowPrice(activeSpec.domain) || 1495;
  const activeLease = Math.round(activeBuyout / 12);

  function openModal(
    domainName: string,
    pricingGuide: string,
    defaultModel: "buyout" | "lease" | "turnkey" | "bundle" = "buyout",
  ) {
    setInquiryModal({ domainName, pricingGuide, defaultModel });
    setModalModel(defaultModel);
    setModalSubmitted(false);
  }

  return (
    <PageShell>
      <div className="min-h-screen bg-[#fafafc] text-[#081B30]">
        {/* Hero Section: Clean, Expansive Whitespace, Understated Authority */}
        <section
          className="relative overflow-hidden border-b border-black/[0.06] bg-[#F6F3ED] pt-16 pb-16 md:pt-24 md:pb-24"
          id="hero-section"
        >
          {/* Subtle Blueprint Grid & Ambient Glow Elements */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#081b30_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
          <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-[#059669]/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            {/* Verified Header Tag & Live Escrow Status */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#059669]/25 bg-[#059669]/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-[#059669] shadow-2xs">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#059669]" />
                  AUTHENTIC DIRECT OWNER TRANSFERS
                </span>
                <span className="hidden font-mono text-[12px] text-[#526479] sm:inline">
                  • NO INTERMEDIARY FEES
                </span>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-black/[0.06] bg-white/80 px-3 py-1 font-mono text-[11px] text-[#081B30] backdrop-blur-md md:inline-flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
                <span>NOMINET CERTIFIED REGISTRY // ACTIVE LEDGER</span>
              </div>
            </div>

            {/* Typography Heading */}
            <h1 className="mb-6 max-w-4xl font-display text-4xl leading-[1.1] font-bold tracking-[-0.03em] text-[#081B30] sm:text-5xl md:text-6xl">
              Owned domains for AI, fintech, electric mobility, and UK enterprise brands.
            </h1>
            <p className="mb-10 max-w-3xl text-lg leading-relaxed font-normal text-[#526479] md:text-xl">
              Acquire premium brand assets outright or via 0% interest 12-month lease-to-own. Every
              domain is owned directly by The Harley Group with verified registrar history, fast
              assisted transfer, and zero third-party broker buyer fees.
            </p>

            {/* CTA & Quick Trust Anchors */}
            <div className="mb-14 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-[#081B30] px-6 py-3 text-[14px] font-medium text-white shadow-sm transition-all hover:bg-[#173C62]"
                href="#inventory"
              >
                <span>Explore {allDomains.length} Verified Holdings</span>
                <ArrowDown className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() =>
                  openModal("Portfolio Bundle Offer", "Discreet Portfolio Offer", "bundle")
                }
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-[14px] font-medium text-[#081B30] transition-all hover:bg-black/[0.03]"
              >
                <span>Make a portfolio bundle offer</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <div className="hidden items-center gap-2 border-l border-black/10 pl-4 font-mono text-xs text-[#526479] lg:flex">
                <Lock className="h-4 w-4 text-[#059669]" />
                <span>Direct Registrar Push Within 24 Hours</span>
              </div>
            </div>

            {/* Interactive Animated Metrics Strip */}
            <div className="border-t border-black/[0.08] pt-8">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-4 shadow-2xs transition-all hover:border-[#059669]/40">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-[#526479] uppercase">
                      Active Holdings
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#059669] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#059669]" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#081B30] md:text-4xl">
                      {allDomains.length}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#059669]">Assets</span>
                  </div>
                  <p className="mt-1 text-[12px] text-[#526479]">
                    Unencumbered IP &amp; generic titles
                  </p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-4 shadow-2xs transition-all hover:border-[#059669]/40">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-[#526479] uppercase">
                      Title Custody
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#059669] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#059669]" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#081B30] md:text-4xl">
                      100%
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#059669]">Direct</span>
                  </div>
                  <p className="mt-1 text-[12px] text-[#526479]">
                    Direct ownership by Harley Group
                  </p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-4 shadow-2xs transition-all hover:border-[#059669]/40">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-[#526479] uppercase">
                      Intermediary Fee
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#059669] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#059669]" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#081B30] md:text-4xl">
                      £0
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#059669]">
                      Buyer Brokerage
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-[#526479]">Zero buyer brokerage commission</p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-4 shadow-2xs transition-all hover:border-[#059669]/40">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-[#526479] uppercase">
                      Lease Options
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#059669] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#059669]" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#081B30] md:text-4xl">
                      12 Mo
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#059669]">
                      0% Interest
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-[#526479]">Flexible lease-to-own handover</p>
                </div>
              </div>

              {/* Four Value Props Pill Strip */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-black/[0.06] pt-6 md:grid-cols-4">
                <div className="flex items-center gap-2.5 text-[#526479]">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-[#059669]" />
                  <span className="text-[13px] font-medium text-[#081B30]">
                    Nominet &amp; ICANN Verified
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#526479]">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#059669]" />
                  <span className="text-[13px] font-medium text-[#081B30]">
                    0% Interest Lease Option
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#526479]">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#059669]" />
                  <span className="text-[13px] font-medium text-[#081B30]">
                    Assisted Registrar Handover
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#526479]">
                  <Laptop className="h-5 w-5 shrink-0 text-[#059669]" />
                  <span className="text-[13px] font-medium text-[#081B30]">
                    Optional Turnkey Website Build
                  </span>
                </div>
              </div>

              {/* Floating Scroll Indicator Pill */}
              <div className="mt-8 flex justify-center">
                <a
                  href="#turnkey-concepts"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/90 px-4 py-2 font-mono text-xs text-[#081B30] shadow-2xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#059669]/50 hover:bg-[#081B30] hover:text-white"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#059669]" />
                  <span>Explore Turnkey Flagship Prototypes</span>
                  <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#059669] group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Turnkey Flagship Prototypes & Interactive Concept Showcase Bento Stage */}
        <section
          className="overflow-hidden border-b border-black/[0.06] bg-[#f5f5f7] py-16 md:py-24"
          id="turnkey-concepts"
        >
          <div className="mx-auto max-w-7xl px-6">
            {/* Section Header & Strategy Overview */}
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#059669]/20 bg-[#059669]/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-[#059669]">
                  <Laptop className="h-3.5 w-3.5" />
                  TURNKEY FLAGSHIP PROTOTYPES
                </div>
                <h2 className="font-display text-3xl leading-[1.15] font-bold tracking-tight text-[#081B30] md:text-4xl lg:text-5xl">
                  From raw domain title to turnkey market leadership.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#526479] md:text-lg">
                  Preview simulated digital flagship architectures conceptualised by Harley Digital
                  Works. Acquire the standalone domain unencumbered, or commission an end-to-end
                  turnkey launch with bespoke frontend systems, CMS workflows, and automation.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 font-mono text-xs text-[#081B30] shadow-2xs">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#059669]" />
                  Harley Digital Works Certified Builds
                </div>
                <span className="font-mono text-[11px] text-[#526479]">
                  EPP Handover + Turnkey Staging Available
                </span>
              </div>
            </div>

            {/* Concept Selector Filter Tabs */}
            <div
              className="mb-8 flex flex-wrap items-center gap-2.5"
              role="group"
              aria-label="Flagship domain concepts"
            >
              {(
                [
                  { id: "letscarshop", icon: Car },
                  { id: "aiwearables", icon: Watch },
                  { id: "valuecurrencies", icon: LineChart },
                  { id: "greenautomotive", icon: Zap },
                  { id: "mydigitalhouse", icon: Home },
                ] as const
              ).map(({ id, icon: Icon }) => {
                const spec = FLAGSHIP_SPECS[id];
                const isSelected = activeConceptId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveConceptId(id)}
                    aria-pressed={isSelected}
                    className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all md:text-[13px] ${
                      isSelected
                        ? "bg-[#081B30] text-white shadow-sm"
                        : "border border-black/[0.08] bg-white text-[#526479] hover:bg-black/[0.02] hover:text-[#081B30]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{spec.domain}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        isSelected ? "bg-white/20 text-white" : "bg-black/[0.04] text-[#081B30]"
                      }`}
                    >
                      {spec.pillLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Concept Showcase Bento Stage */}
            <div className="relative overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-6 shadow-sm md:p-8 lg:p-10">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                {/* Left 5 Cols: Spec & Commercial Actions */}
                <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-[#059669] uppercase">
                        {activeSpec.sectorKicker}
                      </span>
                      <span className="font-mono text-[11px] text-[#526479]">• PROTOTYPE SPEC</span>
                    </div>
                    <h3 className="mb-3 font-display text-3xl font-bold tracking-tight text-[#081B30]">
                      {activeSpec.domain}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-[#526479]">
                      {activeSpec.description}
                    </p>

                    <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-black/[0.04] bg-[#f5f5f7] p-4">
                      <div>
                        <span className="block font-mono text-[10px] text-[#526479] uppercase">
                          Asset Buyout
                        </span>
                        <span className="font-display text-xl font-bold text-[#081B30]">
                          {formatGbp(activeBuyout)}
                        </span>
                        <span className="block font-mono text-[10px] text-[#059669]">
                          or £{activeLease}/mo (12 mo lease)
                        </span>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] text-[#526479] uppercase">
                          {activeSpec.secondaryMetricLabel}
                        </span>
                        <span className="font-display text-xl font-bold text-[#081B30]">
                          {activeSpec.secondaryMetricValue}
                        </span>
                        <span className="block font-mono text-[10px] text-[#526479]">
                          {activeSpec.secondaryMetricSub}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6 space-y-2">
                      {activeSpec.bullets.map((b) => (
                        <div
                          key={b}
                          className="flex items-center gap-2 font-mono text-xs text-[#526479]"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() =>
                        openModal(
                          activeSpec.domain,
                          `${formatGbp(activeBuyout)} (Turnkey Option) / £${activeLease}/mo`,
                          "turnkey",
                        )
                      }
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#081B30] px-6 py-3 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#173C62] md:text-sm"
                    >
                      <span>Acquire {activeSpec.domain} + Build</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openModal(
                          activeSpec.domain,
                          `${formatGbp(activeBuyout)} Outright / £${activeLease}/mo Lease`,
                          "buyout",
                        )
                      }
                      className="cursor-pointer rounded-full border border-black/10 bg-[#f5f5f7] px-5 py-3 text-xs font-medium text-[#081B30] transition-all hover:bg-black/[0.05] md:text-sm"
                    >
                      Domain Title Only
                    </button>
                  </div>
                </div>

                {/* Right 7 Cols: Realistic Simulated Browser Mockup */}
                <div className="lg:col-span-7">
                  {/* 1. LETSCARSHOP.COM SIMULATED BROWSER (Luxury Electric Flagship Showroom) */}
                  {activeConceptId === "letscarshop" && (
                    <div className="overflow-hidden rounded-2xl border border-black/15 bg-[#081B30] shadow-2xl transition-transform hover:-translate-y-0.5">
                      {/* Browser Chrome Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1d2e] px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-4 py-1 font-mono text-[11px] text-gray-300 shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
                          <Lock className="h-3 w-3 text-[#059669]" />
                          <span>https://letscarshop.com/electric-flagship</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <span className="rounded bg-[#059669]/20 px-2 py-0.5 font-mono text-[10px] text-[#34D399] uppercase">
                            Live Demo
                          </span>
                          {activeSpec.previewImage && (
                            <button
                              type="button"
                              onClick={() =>
                                setLightboxImage({
                                  url: activeSpec.previewImage!,
                                  title: activeSpec.domain,
                                  desc: activeSpec.description,
                                })
                              }
                              className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold text-gray-300 hover:text-white"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Mockup Viewport Body: Luxury Automotive Electric Supercar Showroom + HUD */}
                      <div className="group relative overflow-hidden">
                        <img
                          alt="letscarshop.com electric flagship showroom UI"
                          className="block h-auto w-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNq-qFzEJ9Ik9jNhx8hZAcnzt37SGD3ynSRLAs7Iv9kBEt3UXhyzoZmClj-BgGRWlvuTtM0rj_yI5-K-z5clcguPJpgO6X_9ixrsx7WoHcZgWRIzKlyC9vyh63BDdRSUyEY9P6BKNJfW0MQhj6KtlQHbqy10QlFP9peoxy1wCpjhWlypmk0VO4NTtvF-SdFaYFDIGuL5CdZUOx6xKQtV_2BRasNclmve7sWT1t9yE"
                        />
                        {/* Interactive Overlay Bar */}
                        <div className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/15 bg-[#081B30]/85 p-3 backdrop-blur-md">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
                            <span className="font-display text-xs font-semibold text-white">
                              Curated Performance &amp; Electric Fleet
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md border border-white/10 bg-white/10 px-2.5 py-1 font-mono text-[10px] text-gray-200">
                              0-60 MPH // 1.9s
                            </span>
                            <span className="rounded-md border border-[#10B981]/30 bg-[#059669]/20 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#34D399]">
                              RANGE // 450 MI
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                openModal(
                                  "letscarshop.com",
                                  `${formatGbp(activeBuyout)} Outright / £${activeLease}/mo Lease`,
                                  "turnkey",
                                )
                              }
                              className="cursor-pointer rounded-md bg-[#10B981] px-2.5 py-1 font-display text-[10px] font-bold text-[#081B30] transition-colors hover:bg-white"
                            >
                              Test Drive Lead
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. AIWEARABLES.CO.UK SIMULATED BROWSER */}
                  {activeConceptId === "aiwearables" && (
                    <div className="overflow-hidden rounded-2xl border border-black/15 bg-[#081B30] text-white shadow-2xl">
                      <div className="flex items-center justify-between border-b border-white/10 bg-[#081B30] px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-4 py-1 font-mono text-[11px] text-gray-300">
                          <Lock className="h-3 w-3 text-[#059669]" />
                          <span>https://aiwearables.co.uk</span>
                        </div>
                        {activeSpec.previewImage && (
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage({
                                url: activeSpec.previewImage!,
                                title: activeSpec.domain,
                                desc: activeSpec.description,
                              })
                            }
                            className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold text-[#34D399]"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Hi-Res</span>
                          </button>
                        )}
                      </div>
                      <div className="space-y-4 bg-[#081B30] p-5 md:p-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="font-display text-sm font-bold tracking-widest uppercase">
                            AI•WEARABLES<span className="text-[#34D399]">.UK</span>
                          </div>
                          <div className="hidden items-center gap-3 font-mono text-[11px] text-gray-300 sm:flex">
                            <span className="text-white">Smart Rings</span>
                            <span>Audio Glasses</span>
                            <span>Biometrics</span>
                          </div>
                          <div className="font-mono text-xs font-semibold text-[#34D399]">
                            Free UK Delivery
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#173C62]/60 p-6 md:flex-row">
                          <div className="space-y-2">
                            <span className="rounded bg-[#059669]/25 px-2 py-0.5 font-mono text-[10px] text-[#34D399] uppercase">
                              Flagship Launch
                            </span>
                            <h4 className="font-display text-2xl font-bold">
                              Circadian Ring Pro v3
                            </h4>
                            <p className="max-w-sm text-xs text-gray-200">
                              Continuous biometric monitoring, sleep telemetry, and daily recovery
                              briefings with titanium IP68 casing.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                              <span className="font-display text-lg font-bold text-white">
                                £299
                              </span>
                              <span className="text-xs text-gray-400 line-through">£349</span>
                              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#081B30]">
                                Order Now
                              </span>
                            </div>
                          </div>
                          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-[#059669]/50 bg-black/30 text-center font-mono text-[10px] text-[#34D399]">
                            TITANIUM
                            <br />
                            GEN-3
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                            <span className="text-xs font-medium">Spatial Audio Eyewear</span>
                            <span className="font-mono text-xs text-[#34D399]">£379</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                            <span className="text-xs font-medium">Biometric Recovery Band</span>
                            <span className="font-mono text-xs text-[#34D399]">£189</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. VALUECURRENCIES.COM SIMULATED BROWSER */}
                  {activeConceptId === "valuecurrencies" && (
                    <div className="overflow-hidden rounded-2xl border border-black/15 bg-[#081B30] text-white shadow-2xl">
                      <div className="flex items-center justify-between border-b border-white/10 bg-[#0F2642] px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-4 py-1 font-mono text-[11px] text-gray-300">
                          <Lock className="h-3 w-3 text-[#059669]" />
                          <span>https://valuecurrencies.com</span>
                        </div>
                        {activeSpec.previewImage && (
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage({
                                url: activeSpec.previewImage!,
                                title: activeSpec.domain,
                                desc: activeSpec.description,
                              })
                            }
                            className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold text-[#34D399]"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Hi-Res</span>
                          </button>
                        )}
                      </div>
                      <div className="space-y-4 p-5 font-mono text-xs md:p-6">
                        {/* LD4 Equinix Live Ticker Ribbon (Stitch Screen 13) */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 animate-ping rounded-full bg-[#10B981]" />
                            <span className="font-bold text-white tracking-wider">
                              LD4 LONDON EQUINIX
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-gray-300">
                            <span className="text-[#34D399] font-bold">
                              GBP/USD 1.28414 ▲ +0.14%
                            </span>
                            <span className="text-[#34D399]">EUR/USD 1.08922 ▲ +0.08%</span>
                            <span className="text-gray-400">USD/JPY 154.620 ▼ -0.02%</span>
                            <span className="hidden sm:inline text-gray-400">
                              24H DEPTH: $1.48B
                            </span>
                          </div>
                        </div>

                        {/* Telemetry Strip (Stitch Screen 13) */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          <div className="rounded border border-white/10 bg-white/5 p-2">
                            <span className="block text-[9px] uppercase tracking-wider text-gray-400">
                              LD4 Latency
                            </span>
                            <span className="font-bold text-[#34D399]">0.4ms Anycast</span>
                          </div>
                          <div className="rounded border border-white/10 bg-white/5 p-2">
                            <span className="block text-[9px] uppercase tracking-wider text-gray-400">
                              Custodial Escrow
                            </span>
                            <span className="font-bold text-white">SRA Solicitor</span>
                          </div>
                          <div className="rounded border border-white/10 bg-white/5 p-2">
                            <span className="block text-[9px] uppercase tracking-wider text-gray-400">
                              Turnkey Deploy
                            </span>
                            <span className="font-bold text-white">21 Working Days</span>
                          </div>
                          <div className="rounded border border-white/10 bg-white/5 p-2">
                            <span className="block text-[9px] uppercase tracking-wider text-gray-400">
                              Title Equity
                            </span>
                            <span className="font-bold text-[#34D399]">100% Unencumbered</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b border-white/10 pb-2 pt-1">
                          <div className="font-display text-sm font-bold text-white">
                            VALUE•CURRENCIES
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-[#34D399]">
                            <span className="rounded bg-[#10B981]/20 px-2 py-0.5 font-bold uppercase tracking-wider">
                              FAST-TRACK AUTH: 2H SLA
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded border border-white/10 bg-white/5 p-2.5">
                            <span className="block text-[10px] text-gray-400">
                              GLOBAL LIQUIDITY
                            </span>
                            <span className="text-sm font-bold text-white">$34.8T</span>
                            <span className="block text-[10px] text-[#34D399]">+4.2% MoM</span>
                          </div>
                          <div className="rounded border border-white/10 bg-white/5 p-2.5">
                            <span className="block text-[10px] text-gray-400">STABLE RESERVES</span>
                            <span className="text-sm font-bold text-white">$182.4B</span>
                            <span className="block text-[10px] text-[#34D399]">100% Backed</span>
                          </div>
                          <div className="rounded border border-white/10 bg-white/5 p-2.5">
                            <span className="block text-[10px] text-gray-400">
                              CENTRAL BANK INT
                            </span>
                            <span className="text-sm font-bold text-white">5.00% BOE</span>
                            <span className="block text-[10px] text-gray-300">Neutral Bias</span>
                          </div>
                        </div>
                        <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-bold text-white">
                              REAL-TIME YIELD SPREAD &amp; CURRENCY REGIME
                            </span>
                            <span className="font-mono text-[#34D399]">LIVE FEED</span>
                          </div>
                          <div className="flex h-16 items-end gap-1.5 pt-2">
                            {[32, 40, 48, 64, 56, 44, 52, 60, 56, 48, 52, 64].map((h, i) => (
                              <div
                                key={i}
                                className="w-1/12 rounded-t bg-[#10B981]/80"
                                style={{ height: `${h}px` }}
                              />
                            ))}
                          </div>
                          <p className="pt-1 text-[10px] text-gray-300">
                            Institutional FX rate spread models benchmarked against 14 major G10
                            currency pairings.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. GREENAUTOMOTIVE.CO.UK SIMULATED BROWSER (Commercial EV Fleet Platform) */}
                  {activeConceptId === "greenautomotive" && (
                    <div className="overflow-hidden rounded-2xl border border-black/15 bg-[#081B30] shadow-2xl transition-transform hover:-translate-y-0.5">
                      {/* Browser Chrome Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1d2e] px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-4 py-1 font-mono text-[11px] text-gray-300 shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
                          <Lock className="h-3 w-3 text-[#059669]" />
                          <span>https://greenautomotive.co.uk/commercial-fleet</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <span className="rounded bg-[#059669]/20 px-2 py-0.5 font-mono text-[10px] text-[#34D399] uppercase">
                            Solar Depot RFP
                          </span>
                          <Zap className="h-3.5 w-3.5 text-[#10B981]" />
                          {activeSpec.previewImage && (
                            <button
                              type="button"
                              onClick={() =>
                                setLightboxImage({
                                  url: activeSpec.previewImage!,
                                  title: activeSpec.domain,
                                  desc: activeSpec.description,
                                })
                              }
                              className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold text-gray-300 hover:text-white"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Mockup Viewport Body: Commercial Fleet Electrification Platform + HUD */}
                      <div className="group relative overflow-hidden">
                        <img
                          alt="greenautomotive.co.uk commercial fleet electrification platform UI"
                          className="block h-auto w-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoPz7p4Be9GGOtOZJERhtn_ezS8zWFrkZltxbAbhjQejAJ5PqdZayh72bbb6mM8n1sVkxkMuoedw-xWm8G2nIWWYbVRkVtAsVU-Ec_W6l5HEo_Mdf9SOvHPtGMFQWxWRBDkaZ62wsifY1-7mBtFa-kCz3M1nmtB10m32LJDG0vcRqMzmxJa_FkcWr0Ayth_kYjr7QA1MNgaqV_s0524OEk7t4L-l-2Ix8Ia201q0o"
                        />
                        {/* Live Fleet Dashboard Strip */}
                        <div className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/15 bg-[#081B30]/85 p-3 backdrop-blur-md">
                          <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
                            <span className="font-display text-xs font-semibold text-white">
                              Live Fleet Overview: 142/150 Active
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-[10px] text-gray-200">
                              CO2 Saved: 12.4t
                            </span>
                            <span className="rounded border border-[#10B981]/30 bg-[#059669]/20 px-2 py-0.5 font-mono text-[10px] text-[#34D399]">
                              Global Charge: 87%
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                openModal(
                                  "greenautomotive.co.uk",
                                  `${formatGbp(activeBuyout)} Outright / £${activeLease}/mo Lease`,
                                  "turnkey",
                                )
                              }
                              className="cursor-pointer rounded-md bg-[#10B981] px-2.5 py-1 font-display text-[10px] font-bold text-[#081B30] transition-colors hover:bg-white"
                            >
                              Reserve Portfolio
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. MYDIGITALHOUSE.CO.UK SIMULATED BROWSER */}
                  {activeConceptId === "mydigitalhouse" && (
                    <div className="overflow-hidden rounded-2xl border border-black/15 bg-white shadow-2xl">
                      <div className="flex items-center justify-between border-b border-black/10 bg-[#f4f4f7] px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-black/[0.08] bg-white px-4 py-1 font-mono text-[11px] text-[#526479]">
                          <Lock className="h-3 w-3 text-[#059669]" />
                          <span>https://mydigitalhouse.co.uk</span>
                        </div>
                        <Home className="h-4 w-4 text-[#081B30]" />
                      </div>
                      <div className="space-y-4 bg-[#fcfcfd] p-5 md:p-6">
                        <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                          <span className="font-display text-sm font-bold text-[#081B30]">
                            MyDigital<span className="text-[#059669]">House</span>
                          </span>
                          <div className="hidden items-center gap-3 font-mono text-[11px] text-[#526479] sm:flex">
                            <span>Lighting &amp; Shading</span>
                            <span>Multi-Room Audio</span>
                            <span>Security</span>
                          </div>
                          <span className="rounded-full bg-[#081B30] px-2.5 py-1 text-[11px] text-white">
                            Book Design Audit
                          </span>
                        </div>
                        <div className="space-y-3 rounded-xl bg-[#081B30] p-5 text-white">
                          <span className="font-mono text-[10px] font-semibold text-[#34D399] uppercase">
                            Architectural IoT &amp; AV
                          </span>
                          <h4 className="font-display text-xl leading-tight font-bold">
                            Discreet automation for forward-thinking British residences.
                          </h4>
                          <p className="text-xs text-gray-300">
                            From single-room acoustic cinema tuning to whole-home KNX climate and
                            biometric entry security.
                          </p>
                          <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                            <div className="rounded bg-white/10 p-2 text-center">
                              MATTER COMPLIANT
                            </div>
                            <div className="rounded bg-white/10 p-2 text-center">
                              CEDIA CERTIFIED
                            </div>
                            <div className="rounded bg-white/10 p-2 text-center">UK INSTALLERS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Turnkey Engagement Process Strip */}
              <div className="mt-8 grid grid-cols-1 gap-4 border-t border-black/[0.06] pt-6 md:grid-cols-3">
                <div className="flex items-start gap-3 rounded-xl border border-black/[0.04] bg-[#fafafc] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#081B30]/5 font-mono text-xs font-bold text-[#081B30]">
                    01
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-[#081B30]">
                      Acquire Unencumbered Title
                    </h4>
                    <p className="mt-0.5 text-[12px] text-[#526479]">
                      Immediate Nominet tag transfer or Sedo / Escrow.com institutional protection.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-black/[0.04] bg-[#fafafc] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#081B30]/5 font-mono text-xs font-bold text-[#081B30]">
                    02
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-[#081B30]">
                      Harley Works Engineering
                    </h4>
                    <p className="mt-0.5 text-[12px] text-[#526479]">
                      Custom responsive frontend, fast Cloudflare hosting, DNS architecture, and
                      lead integrations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-black/[0.04] bg-[#fafafc] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#081B30]/5 font-mono text-xs font-bold text-[#081B30]">
                    03
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-[#081B30]">
                      0% Lease or Outright Buyout
                    </h4>
                    <p className="mt-0.5 text-[12px] text-[#526479]">
                      Choose 12 equal monthly instalments with full DNS delegation from Day 1, or
                      direct buyout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Main Inventory Section (#inventory) */}
        <section className="bg-[#fafafc] py-16 md:py-24" id="inventory">
          <div className="mx-auto max-w-7xl px-6">
            {/* Controls & Filter Toolbar */}
            <div className="mb-8 flex flex-col justify-between gap-6 border-b border-black/[0.06] pb-8 lg:flex-row lg:items-center">
              <div>
                <span className="font-mono text-[11px] tracking-widest text-[#526479] uppercase">
                  OWNED INVENTORY ({allDomains.length} ASSETS)
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#081B30] md:text-3xl">
                  Authentic Treasury Portfolio
                </h2>
              </div>

              {/* Search Input + Realtime Counter */}
              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className=" absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#526479]" />
                  <input
                    id="domain-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search domain, sector, or TLD..."
                    aria-label="Search domain, sector, or TLD"
                    className="w-full rounded-full border border-black/10 bg-white py-2.5 pr-4 pl-10 text-[13px] text-[#081B30] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all placeholder:text-[#526479]/60 focus:border-[#081B30] focus:ring-1 focus:ring-[#081B30] focus:outline-none"
                  />
                </div>
                <div className="hidden items-center rounded-full border border-black/10 bg-white px-3.5 py-2 font-mono text-[11px] text-[#526479] sm:flex">
                  <span className="mr-1 font-bold text-[#081B30]">{filteredDomains.length}</span> of{" "}
                  {allDomains.length} Listed
                </div>
              </div>
            </div>

            {/* Filter Pill Chips */}
            <div
              className="mb-10 flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter domains by sector"
            >
              {(
                [
                  { id: "all", label: `All (${allDomains.length})` },
                  { id: "ai", label: "AI & Tech" },
                  { id: "mobility", label: "Mobility & Autonomous" },
                  { id: "clean", label: "Clean & Energy" },
                  { id: "smart", label: "Smart Living & IoT" },
                  { id: "finance", label: "Finance & Retail" },
                ] as const
              ).map((tab) => {
                const isSelected = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    aria-pressed={isSelected}
                    className={`cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                      isSelected
                        ? "bg-[#081B30] text-white shadow-sm"
                        : "border border-black/[0.08] bg-white text-[#526479] hover:bg-black/[0.02] hover:text-[#081B30]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* 3-Column Verified Owned Domain Cards Grid */}
            {filteredDomains.length === 0 ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-12 text-center">
                <p className="font-display text-lg font-bold text-[#081B30]">
                  No domains matched &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="mt-1 text-sm text-[#526479]">
                  Try clearing your search or selecting &ldquo;All&rdquo; categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 cursor-pointer rounded-full bg-[#081B30] px-5 py-2 text-xs font-semibold text-white"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDomains.map((domain) => {
                  const buyNow = getDomainBuyNowPrice(domain.name);
                  const monthlyEstimate = buyNow ? Math.round(buyNow / 12) : null;

                  return (
                    <article
                      key={domain.name}
                      className="flex flex-col justify-between rounded-2xl border border-black/[0.07] bg-white p-6 transition-all hover:border-black/20 hover:shadow-lg"
                    >
                      <div>
                        <div className="mb-3 flex items-center justify-between border-b border-black/[0.05] pb-3">
                          <span className="font-mono text-[10px] font-medium tracking-wider text-[#526479] uppercase">
                            {domain.category}
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#059669]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" /> AVAILABLE
                          </span>
                        </div>
                        <h3 className="mb-2 font-display text-xl font-bold tracking-tight text-[#081B30]">
                          {domain.name}
                        </h3>
                        <p className="mb-6 text-[13px] leading-relaxed text-[#526479]">
                          {domain.useCase}
                        </p>
                      </div>

                      <div className="border-t border-black/[0.05] pt-4">
                        <div className="mb-4 flex items-baseline justify-between">
                          <div>
                            <span className="font-display text-lg font-bold text-[#081B30]">
                              {buyNow ? formatGbp(buyNow) : "Enquire"}
                            </span>
                            <span className="block font-mono text-[10px] text-[#526479]">
                              Buy-It-Now
                            </span>
                          </div>
                          {monthlyEstimate && (
                            <div className="text-right">
                              <span className="font-mono text-[12px] text-[#526479]">
                                From{" "}
                                <strong className="text-[#081B30]">£{monthlyEstimate}/mo</strong>
                              </span>
                              <span className="block font-mono text-[10px] text-[#059669]">
                                12 mo lease-to-own
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            openModal(
                              domain.name,
                              buyNow
                                ? `${formatGbp(buyNow)} Outright / £${monthlyEstimate}/mo Lease`
                                : "Enquire for Guide",
                              "buyout",
                            )
                          }
                          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#081B30] py-2.5 text-[13px] font-medium text-white transition-all hover:bg-[#173C62]"
                        >
                          <span>Acquire {domain.name}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Section 4: Strategic Asset Bundles (#bundles) */}
        <section className="border-y border-black/[0.06] bg-[#f5f5f7] py-16 md:py-24" id="bundles">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-[11px] tracking-widest text-[#059669] uppercase">
                  PORTFOLIO CONSOLIDATION
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#081B30] md:text-3xl">
                  Strategic Multi-Domain Bundles
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#526479]">
                  Package acquisitions available with bundled discounts. Ideal for establishing
                  categorical moats across emerging UK sectors.
                </p>
              </div>
              <div className="font-mono text-xs text-[#526479]">
                All bundles include 0% interest lease terms or solicitor escrow settlement.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {domainBundles.map((bundle) => (
                <div
                  key={bundle.name}
                  className="flex flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-6 transition-all hover:border-black/20 hover:shadow-md"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-black/[0.05] pb-3">
                      <h3 className="font-display text-base font-bold text-[#081B30]">
                        {bundle.name}
                      </h3>
                      <span className="rounded bg-black/[0.04] px-2 py-0.5 font-mono text-[11px] text-[#081B30]">
                        {bundle.domains.length} DOMAINS
                      </span>
                    </div>
                    <ul className="mb-6 space-y-2 font-mono text-[12px] text-[#526479]">
                      {bundle.domains.map((dom) => (
                        <li key={dom} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#081B30]" />
                          <span>{dom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/[0.05] pt-4">
                    <span className="font-mono text-[11px] font-medium text-[#059669]">
                      Discounted Bundle
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        openModal(
                          `${bundle.name} (${bundle.domains.length} Domains)`,
                          "Discounted Package Deal",
                          "bundle",
                        )
                      }
                      className="flex cursor-pointer items-center gap-1 font-display text-[13px] font-semibold text-[#081B30] transition-colors hover:text-[#059669]"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Acquisition Terms & Institutional Escrow + Direct Partner Desk (#governance) */}
        <section className="bg-[#fafafc] py-16 md:py-24" id="governance">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#059669]/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-[#059669]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  ACQUISITION TERMS &amp; ESCROW
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#081B30] md:text-4xl">
                  Direct transfer or turnkey build.
                </h2>
                <p className="text-base leading-relaxed text-[#526479]">
                  Acquire strategic brand assets outright or bundle them with a bespoke Harley
                  Digital Works trade website. We manage escrow verification, Nominet tag changes,
                  and Cloudflare DNS configuration.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4 rounded-xl border border-black/[0.06] bg-white p-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f5f7] text-[#081B30]">
                      <ShieldCheck className="h-5 w-5 text-[#059669]" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#081B30]">
                        Secure Ownership Escrow
                      </h3>
                      <p className="mt-0.5 text-[13px] text-[#526479]">
                        Transactions over £1,000 can be completed via Sedo Escrow, Afternic, or
                        Dan.com for 100% buyer protection. Immediate auth-code release upon payment
                        confirmation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-black/[0.06] bg-white p-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f5f7] text-[#081B30]">
                      <Calendar className="h-5 w-5 text-[#059669]" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#081B30]">
                        0% Interest 12-Month Lease
                      </h3>
                      <p className="mt-0.5 text-[13px] text-[#526479]">
                        Spread capital allocation smoothly over 12 months with immediate operational
                        DNS management from Day 1. Full unencumbered registry title transferred at
                        month 12.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-black/[0.06] bg-white p-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f5f7] text-[#081B30]">
                      <Laptop className="h-5 w-5 text-[#059669]" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#081B30]">
                        Turnkey Website &amp; Identity Deployment
                      </h3>
                      <p className="mt-0.5 text-[13px] text-[#526479]">
                        Optionally commission Harley Digital Works to craft the digital flagship,
                        24/7 autonomous phone receptionist, and brand identity simultaneously.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner Contact Card: Robbie Harley */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-sm md:p-10 lg:col-span-6">
                <div className="mb-6 flex items-center justify-between border-b border-black/[0.06] pb-6">
                  <div>
                    <span className="font-mono text-[10px] tracking-wider text-[#526479] uppercase">
                      DIRECT PARTNER DESK
                    </span>
                    <h3 className="mt-0.5 font-display text-2xl font-bold text-[#081B30]">
                      Robbie Harley
                    </h3>
                    <span className="text-[13px] text-[#526479]">Founder • The Harley Group</span>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#081B30] font-display text-lg font-bold text-white">
                    RH
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-[#526479]">
                  For direct acquisitions, bundled package pricing, or discreet off-market
                  enquiries, connect directly with Robbie Harley:
                </p>

                <div className="mb-8 space-y-3">
                  <a
                    className="flex items-center justify-between rounded-xl bg-[#f5f5f7] p-3.5 transition-colors hover:bg-black/[0.04]"
                    href={`tel:${siteConfig.contactPhoneTel}`}
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[#081B30]" />
                      <span className="text-sm font-medium text-[#081B30]">
                        Direct UK Telephone
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#081B30]">
                      {siteConfig.contactPhone}
                    </span>
                  </a>

                  <a
                    className="flex items-center justify-between rounded-xl bg-[#f5f5f7] p-3.5 transition-colors hover:bg-black/[0.04]"
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4 text-[#059669]" />
                      <span className="text-sm font-medium text-[#081B30]">
                        Direct WhatsApp Line
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#059669]">
                      {siteConfig.whatsappDisplay}
                    </span>
                  </a>

                  <a
                    className="flex items-center justify-between rounded-xl bg-[#f5f5f7] p-3.5 transition-colors hover:bg-black/[0.04]"
                    href={`mailto:${siteConfig.contactEmail}`}
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-[#081B30]" />
                      <span className="text-sm font-medium text-[#081B30]">Direct Email</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#081B30]">
                      {siteConfig.contactEmail}
                    </span>
                  </a>
                </div>

                {/* Stealth Representation Prompt */}
                <div className="rounded-xl border border-black/[0.05] bg-[#fafafc] p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-[#081B30] uppercase">
                      STEALTH ACQUISITION MANDATES
                    </span>
                    <span className="font-mono text-[10px] text-[#526479]">CONFIDENTIAL</span>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-[#526479]">
                    Seeking a custom bundle or confidential transfer arrangement? Send your brief
                    directly for same-day founder review.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      openModal("Stealth Mandate Inquiry", "Off-Market Representation", "bundle")
                    }
                    className="w-full cursor-pointer rounded-lg bg-[#081B30] py-2 text-xs font-medium text-white transition-all hover:bg-[#173C62]"
                  >
                    Initiate Confidential Mandate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Acquisition Modal Drawer */}
        {inquiryModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-domain-heading"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#081B30]/60 p-4 backdrop-blur-xs"
            onClick={() => setInquiryModal(null)}
          >
            <div
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-[#081B30] px-6 py-5 text-white">
                <div>
                  <span className="font-mono text-[10px] font-medium tracking-wider text-[#34D399] uppercase">
                    DIRECT OWNER TRANSFER
                  </span>
                  <h3
                    id="modal-domain-heading"
                    className="font-display text-lg font-bold text-white"
                  >
                    {inquiryModal.domainName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInquiryModal(null)}
                  aria-label="Close modal"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {!modalSubmitted ? (
                <form
                  className="space-y-4 p-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setModalSubmitted(true);
                  }}
                >
                  <div className="flex items-center justify-between rounded-xl border border-black/[0.04] bg-[#f5f5f7] p-3.5">
                    <span className="text-xs text-[#526479]">Stated Pricing Guide:</span>
                    <span className="font-display text-sm font-bold text-[#081B30]">
                      {inquiryModal.pricingGuide}
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="modal-model-select"
                      className="mb-1 block font-display text-xs font-semibold text-[#081B30]"
                    >
                      Acquisition Model *
                    </label>
                    <select
                      id="modal-model-select"
                      value={modalModel}
                      onChange={(e) =>
                        setModalModel(e.target.value as "buyout" | "lease" | "turnkey" | "bundle")
                      }
                      className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-xs text-[#081B30] focus:border-[#081B30] focus:outline-none"
                    >
                      <option value="buyout">
                        Outright Purchase (Escrow.com / Solicitor Handover)
                      </option>
                      <option value="lease">12-Month 0% Interest Lease-to-Own</option>
                      <option value="turnkey">
                        Asset + Bespoke Harley Digital Works Website Build
                      </option>
                      <option value="bundle">Bundled Portfolio Package Inquiry</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="modal-name"
                        className="mb-1 block font-display text-xs font-semibold text-[#081B30]"
                      >
                        Your Name *
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        value={modalName}
                        onChange={(e) => setModalName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-xs text-[#081B30] focus:border-[#081B30] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="modal-company"
                        className="mb-1 block font-display text-xs font-semibold text-[#081B30]"
                      >
                        Company / Entity
                      </label>
                      <input
                        id="modal-company"
                        type="text"
                        value={modalCompany}
                        onChange={(e) => setModalCompany(e.target.value)}
                        placeholder="Company Ltd"
                        className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-xs text-[#081B30] focus:border-[#081B30] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="modal-email"
                        className="mb-1 block font-display text-xs font-semibold text-[#081B30]"
                      >
                        Executive Email *
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        required
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-xs text-[#081B30] focus:border-[#081B30] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="modal-phone"
                        className="mb-1 block font-display text-xs font-semibold text-[#081B30]"
                      >
                        Telephone *
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        value={modalPhone}
                        onChange={(e) => setModalPhone(e.target.value)}
                        placeholder="07700 900123"
                        className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-xs text-[#081B30] focus:border-[#081B30] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="modal-offer"
                      className="mb-1 block font-display text-xs font-semibold text-[#081B30]"
                    >
                      Initial Offer / Custom Proposal (£ GBP)
                    </label>
                    <input
                      id="modal-offer"
                      type="text"
                      value={modalOffer}
                      onChange={(e) => setModalOffer(e.target.value)}
                      placeholder={`Guide: ${inquiryModal.pricingGuide}`}
                      className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-xs text-[#081B30] focus:border-[#081B30] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="modal-notes"
                      className="mb-1 block font-display text-xs font-semibold text-[#081B30]"
                    >
                      Notes / Intended Strategic Use (Optional)
                    </label>
                    <textarea
                      id="modal-notes"
                      rows={2}
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      placeholder="Brief deployment plans or registrar preference..."
                      className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-xs text-[#081B30] focus:border-[#081B30] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="submit"
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#081B30] py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#173C62]"
                    >
                      <span>Prepare Expression of Interest</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <Link
                      to="/contact"
                      search={{
                        domain: inquiryModal.domainName,
                        package: "Domain purchase enquiry",
                        service: undefined,
                        websiteUrl: undefined,
                      }}
                      className="inline-flex items-center justify-center rounded-xl border border-black/15 bg-[#f5f5f7] px-4 py-2.5 text-xs font-medium text-[#081B30] hover:bg-black/5"
                    >
                      Full Contact Desk
                    </Link>
                  </div>

                  <p className="text-center font-mono text-[10px] text-[#526479]">
                    Handled directly by Robbie Harley. Nominet TAG push &amp; EPP handover assisted.
                  </p>
                </form>
              ) : (
                <div className="space-y-4 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#059669]/10 text-[#059669]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#081B30]">
                    Expression of Interest Ready
                  </h4>
                  <p className="mx-auto max-w-sm text-xs leading-relaxed text-[#526479]">
                    Click below to submit your enquiry for{" "}
                    <strong className="text-[#081B30]">{inquiryModal.domainName}</strong> via the
                    verified Harley Digital Works intake desk or WhatsApp.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <Link
                      to="/contact"
                      search={{
                        domain: inquiryModal.domainName,
                        package: `Domain (${modalModel}): ${modalOffer || inquiryModal.pricingGuide}`,
                        service: undefined,
                        websiteUrl: undefined,
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#081B30] px-5 py-2.5 text-xs font-semibold text-white"
                    >
                      <span>Complete on Intake Desk</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setInquiryModal(null)}
                      className="cursor-pointer rounded-full border border-black/15 px-5 py-2.5 text-xs font-medium text-[#081B30]"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* High-Res Concept Lightbox Modal */}
        {lightboxImage && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#081B30]/85 p-4 backdrop-blur-xs"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative w-full max-w-4xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold tracking-wider text-[#526479] uppercase">
                    Visual Concept Mockup
                  </span>
                  <h3 className="text-lg font-bold text-[#081B30]">{lightboxImage.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="cursor-pointer rounded-full p-2 text-[#526479] hover:bg-[#f5f5f7] hover:text-[#081B30]"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-[#081B30]">
                <img
                  src={lightboxImage.url}
                  alt={`${lightboxImage.title} concept mockup`}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
