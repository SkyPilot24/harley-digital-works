import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import {
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Calendar,
  Clock,
  Sparkles,
  Building2,
  Share2,
  Printer,
  ChevronRight,
  CreditCard,
  Layers,
  ArrowRight,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/proposals")({
  head: () => ({
    meta: [
      { title: "Interactive Client Proposal Desk | Harley Digital Works" },
      {
        name: "description",
        content:
          "Bespoke, interactive website proposals and instant digital agreements for UK trade contractors and growing businesses.",
      },
    ],
  }),
  component: ProposalsPage,
});

interface AddonOption {
  id: string;
  name: string;
  category: string;
  price: number;
  monthly?: number;
  description: string;
}

const PACKAGES = {
  launch: {
    name: "14-Day Launch Website",
    price: 1495,
    tagline: "High-converting 5-page trade website ready in 14 days.",
    deliverables: [
      "100% Done-for-you technical copywriting (zero homework)",
      "Mobile-first responsive design & Google PageSpeed 95+",
      "Interactive trade quote request form",
      "Google Map Pack & Local Business Schema markup",
      "Full SSL, domain connection & UK edge cloud hosting",
      "14-Day guaranteed turnaround to live Google launch",
    ],
  },
  growth: {
    name: "Commercial Growth Platform",
    price: 2995,
    tagline: "Multi-page dominance platform with sub-service hubs and trade ROI calculator.",
    deliverables: [
      "Everything in Launch Website + up to 10 custom service pages",
      "Interactive Trade ROI & Instant Quote Calculator engine",
      "Commercial Fleet / Multi-van compliance & CHAS showcase",
      "Advanced geo-targeted landing pages for up to 5 regional towns",
      "Google 5-Star Review Booster & WhatsApp dispatch integration",
      "Priority 14-day SLA delivery with dedicated project lead",
    ],
  },
  pro: {
    name: "Enterprise Digital Product",
    price: 4995,
    tagline: "Custom bespoke digital infrastructure, client portals, and workflow automation.",
    deliverables: [
      "Everything in Growth Platform + custom database/API integrations",
      "Client Self-Service Portal & booking dispatcher",
      "Automated SMS/Email follow-up workflow engines",
      "Custom domain acquisition & DNS architecture by Domain OS",
      "Direct senior engineering oversight by Harley Labs",
    ],
  },
};

const AVAILABLE_ADDONS: AddonOption[] = [
  {
    id: "care-plus",
    name: "Managed Care Plan Plus",
    category: "Ongoing Care",
    price: 0,
    monthly: 95,
    description: "Ultra-fast UK cloud hosting, automated daily backups, security monitoring, and unlimited monthly content updates.",
  },
  {
    id: "seo-pack",
    name: "Local Map-Pack Domination Pack",
    category: "Search Engine Optimization",
    price: 495,
    description: "In-depth competitor geo-grid audit, 25 high-authority UK trade directory citations, and Google Business Profile optimization.",
  },
  {
    id: "review-booster",
    name: "Contractor 5-Star Review Booster Engine",
    category: "Lead Conversion",
    price: 295,
    description: "Automated 1-tap SMS & WhatsApp review request dispatcher to turn happy customers into 5-star Google ratings.",
  },
  {
    id: "fleet-pack",
    name: "Commercial Fleet & Accreditation Pack",
    category: "Commercial Authority",
    price: 395,
    description: "CHAS Elite, SafeContractor, and £10M commercial compliance portal for landing high-ticket commercial contracts.",
  },
];

const SLA_SCHEDULE = [
  { day: "Days 1–2", title: "Project Kick-Off & Architecture", desc: "Fast-track onboarding, DNS setup, and trade scope lock." },
  { day: "Days 3–5", title: "Commercial Copywriting", desc: "100% done-for-you technical copy tailored to your exact accreditations." },
  { day: "Days 6–9", title: "Web Design & Interactive Systems", desc: "High-speed frontend build, quote calculators, and mobile responsiveness." },
  { day: "Days 10–12", title: "Client Staging Review", desc: "1-click review link issued for final approval and adjustments." },
  { day: "Days 13–14", title: "Live Launch & Google Verification", desc: "DNS switch, SSL certificate deployment, and Google Search Console indexing." },
];

function ProposalsPage() {
  // Preset defaults for proposal demonstration & customisation
  const [clientName, setClientName] = useState("Apex Heating & Mechanical Ltd");
  const [clientSector, setClientSector] = useState("Commercial & Domestic Gas Engineering");
  const [clientLocation, setClientLocation] = useState("Greater Manchester & Cheshire");
  const [selectedPackageKey, setSelectedPackageKey] = useState<keyof typeof PACKAGES>("growth");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["care-plus", "seo-pack", "review-booster"]);
  const [signatoryName, setSignatoryName] = useState("");
  const [signatoryEmail, setSignatoryEmail] = useState("");
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPkg = PACKAGES[selectedPackageKey];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculatedTotals = useMemo(() => {
    let upfrontTotal = currentPkg.price;
    let monthlyTotal = 0;

    selectedAddons.forEach((id) => {
      const addon = AVAILABLE_ADDONS.find((a) => a.id === id);
      if (addon) {
        upfrontTotal += addon.price;
        if (addon.monthly) monthlyTotal += addon.monthly;
      }
    });

    const depositRequired = Math.round(upfrontTotal * 0.5);
    const balanceOnCompletion = upfrontTotal - depositRequired;

    return {
      upfrontTotal,
      monthlyTotal,
      depositRequired,
      balanceOnCompletion,
    };
  }, [currentPkg, selectedAddons]);

  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Proposal link copied to clipboard!");
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleAcceptProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatoryName || !signatoryEmail) {
      toast.error("Please enter your full name and email to sign.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasAccepted(true);
      toast.success("Proposal signed successfully! Your 14-day build slot is reserved.");
    }, 1000);
  };

  return (
    <PageShell>
      {/* Proposal Header */}
      <section className="bg-slate-950 pt-32 pb-16 text-white md:pt-40 md:pb-20 border-b border-slate-800">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-md">
              <FileCheck2 className="h-3.5 w-3.5" />
              <span>Harley Digital Works · Interactive Proposal & SLA Desk</span>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handleShareLink}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Proposal</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          <div className="mt-8 max-w-4xl">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Prepared Exclusively For:
            </p>
            <h1 className="mt-2 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-tight text-white leading-tight">
              {clientName}
            </h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300 font-mono">
              <span>Sector: <strong className="text-white">{clientSector}</strong></span>
              <span>•</span>
              <span>Region: <strong className="text-white">{clientLocation}</strong></span>
              <span>•</span>
              <span>Prepared by: <strong className="text-white">Harley Digital Works (The Harley Group)</strong></span>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Proposal Body */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-ink/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Scope, Deliverables & Add-on Selector */}
            <div className="lg:col-span-8 space-y-10">
              {/* Package Selection Tier */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                      Primary Build Scope
                    </span>
                    <h2 className="text-xl font-bold text-ink mt-1">{currentPkg.name}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-ink">£{currentPkg.price.toLocaleString()}</span>
                    <span className="text-xs text-ink-muted block">Fixed upfront price</span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-ink-muted leading-relaxed">{currentPkg.tagline}</p>

                {/* Package Switcher Pills */}
                <div className="mt-6 flex flex-wrap gap-2 print:hidden">
                  {(Object.keys(PACKAGES) as (keyof typeof PACKAGES)[]).map((pkgKey) => (
                    <button
                      key={pkgKey}
                      onClick={() => setSelectedPackageKey(pkgKey)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                        selectedPackageKey === pkgKey
                          ? "bg-ink text-white shadow-sm"
                          : "bg-ink/5 text-ink hover:bg-ink/10"
                      }`}
                    >
                      {PACKAGES[pkgKey].name} (£{PACKAGES[pkgKey].price.toLocaleString()})
                    </button>
                  ))}
                </div>

                {/* Deliverables Checklist */}
                <div className="mt-8">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted mb-4">
                    Included Deliverables & Specifications
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {currentPkg.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 border border-ink/5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-ink leading-relaxed font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optional High-Leverage Add-ons */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                      Modular Enhancements
                    </span>
                    <h3 className="text-lg font-bold text-ink mt-0.5">Customise Your Growth Modules</h3>
                  </div>
                  <span className="text-xs text-ink-muted font-mono">Toggle to add/remove</span>
                </div>

                <div className="mt-6 space-y-4">
                  {AVAILABLE_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500"
                            : "border-ink/10 bg-white hover:border-ink/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleAddon(addon.id)}
                              className="mt-1 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-ink">{addon.name}</h4>
                                <span className="rounded bg-ink/5 px-2 py-0.5 text-[10px] font-mono text-ink-muted">
                                  {addon.category}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                                {addon.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            {addon.price > 0 && (
                              <span className="text-sm font-bold text-ink">
                                +£{addon.price}
                              </span>
                            )}
                            {addon.monthly && (
                              <span className="block text-xs font-bold text-emerald-700">
                                £{addon.monthly}/mo
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 14-Day Delivery SLA Timeline */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                  Guaranteed Operating SLA
                </span>
                <h3 className="text-lg font-bold text-ink mt-0.5">14-Day Delivery Schedule</h3>
                <p className="mt-1 text-xs text-ink-muted">
                  Strict milestone progression with daily transparency via your dedicated build tracker.
                </p>

                <div className="mt-6 space-y-4">
                  {SLA_SCHEDULE.map((step, idx) => (
                    <div key={step.day} className="flex gap-4 items-start">
                      <div className="flex h-8 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
                        {step.day}
                      </div>
                      <div className="pt-0.5">
                        <h4 className="text-sm font-semibold text-ink">{step.title}</h4>
                        <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Financial Summary & Digital Agreement Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-lg">
                  <div className="flex items-center gap-2 border-b border-ink/10 pb-4">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-ink">Financial Investment Summary</h3>
                  </div>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-ink-muted">
                      <span>{currentPkg.name}</span>
                      <span className="font-semibold text-ink">£{currentPkg.price.toLocaleString()}</span>
                    </div>

                    {selectedAddons.map((id) => {
                      const addon = AVAILABLE_ADDONS.find((a) => a.id === id);
                      if (!addon || addon.price === 0) return null;
                      return (
                        <div key={id} className="flex justify-between text-xs text-ink-muted">
                          <span className="truncate pr-2">{addon.name}</span>
                          <span className="font-semibold text-ink">+£{addon.price}</span>
                        </div>
                      );
                    })}

                    <div className="border-t border-ink/10 pt-3 flex justify-between font-bold text-base text-ink">
                      <span>Total Upfront Project</span>
                      <span>£{calculatedTotals.upfrontTotal.toLocaleString()}</span>
                    </div>

                    {calculatedTotals.monthlyTotal > 0 && (
                      <div className="flex justify-between rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-900 font-semibold border border-emerald-200">
                        <span>Ongoing Monthly Care</span>
                        <span>£{calculatedTotals.monthlyTotal}/month</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 rounded-xl bg-slate-900 p-4 text-white text-xs space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>50% Deposit to Start:</span>
                      <span className="font-bold text-white text-sm">£{calculatedTotals.depositRequired.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>50% Balance on Live Launch:</span>
                      <span>£{calculatedTotals.balanceOnCompletion.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Digital Signature Form / Acceptance */}
                  {!hasAccepted ? (
                    <form onSubmit={handleAcceptProposal} className="mt-6 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Signatory Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={signatoryName}
                          onChange={(e) => setSignatoryName(e.target.value)}
                          placeholder="e.g. Dr Robbie Harley"
                          className="w-full rounded-lg border border-ink/15 px-3 py-2 text-xs text-ink focus:border-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Authorised Signatory Email
                        </label>
                        <input
                          type="email"
                          required
                          value={signatoryEmail}
                          onChange={(e) => setSignatoryEmail(e.target.value)}
                          placeholder="e.g. info@apexheating.co.uk"
                          className="w-full rounded-lg border border-ink/15 px-3 py-2 text-xs text-ink focus:border-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div className="text-[11px] text-ink-muted flex items-start gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>By accepting, you agree to Harley Digital Works 14-Day Delivery Terms and 50% start deposit.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          "Authorising Agreement..."
                        ) : (
                          <>
                            <span>Accept & Sign Proposal</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="mt-6 rounded-xl border border-emerald-500 bg-emerald-50 p-4 text-center">
                      <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-emerald-600 text-white mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-emerald-950">Proposal Accepted & Signed</h4>
                      <p className="mt-1 text-xs text-emerald-800">
                        Signed by <strong>{signatoryName}</strong> ({signatoryEmail}). Tracking token <strong>HDW-PROP-9821</strong> generated.
                      </p>
                      <div className="mt-4">
                        <Link
                          to="/onboarding"
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-950 underline"
                        >
                          Proceed to Fast-Track Onboarding →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
