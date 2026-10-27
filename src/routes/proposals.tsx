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
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    client?: string;
    name?: string;
    trade?: string;
    package?: string;
    service?: string;
    domain?: string;
    websiteUrl?: string;
  } => ({
    client: typeof search.client === "string" ? search.client : undefined,
    name: typeof search.name === "string" ? search.name : undefined,
    trade: typeof search.trade === "string" ? search.trade : undefined,
    package: typeof search.package === "string" ? search.package : undefined,
    service: typeof search.service === "string" ? search.service : undefined,
    domain: typeof search.domain === "string" ? search.domain : undefined,
    websiteUrl: typeof search.websiteUrl === "string" ? search.websiteUrl : undefined,
  }),
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
    name: "Managed Trade Presence",
    price: 1495,
    tagline:
      "5-page trade website delivered to an agreed delivery schedule with ongoing managed care.",
    deliverables: [
      "5-Page trade architecture (Home, About, Services, Selected Work, Contact Desk)",
      "Trade copywriting based on your verified business facts",
      "Mobile-responsive layout, trade accreditation badges (NICEIC/NAPIT/Gas Safe)",
      "Structured local business Schema.org JSON-LD microdata",
      "Direct enquiry routing and contact workflow",
      "Cloudflare edge hosting, SSL, and business email setup review",
      "Two structured preview revision rounds before public DNS cutover",
    ],
  },
};

const AVAILABLE_ADDONS: AddonOption[] = [
  {
    id: "care-managed",
    name: "Managed Digital Care Plan",
    category: "Ongoing Care",
    price: 0,
    monthly: 249,
    description:
      "Cloudflare edge hosting, SSL certificates, 30-min monthly edit batch, enquiry health checks, monthly performance digest, and dedicated business hours support window.",
  },
  {
    id: "seo-pack",
    name: "Local Directory & Schema Booster",
    category: "Search Engine Optimization",
    price: 495,
    description:
      "High-authority UK trade directory citations, structured microdata review, and Google Business Profile optimization.",
  },
  {
    id: "review-booster",
    name: "Contractor Review Follow-up Engine",
    category: "Customer Feedback",
    price: 295,
    description:
      "Review request templates and guidance to invite happy customers to leave feedback on Google.",
  },
  {
    id: "fleet-pack",
    name: "Commercial Fleet & Accreditation Pack",
    category: "Commercial Authority",
    price: 395,
    description:
      "Commercial compliance portal, health & safety documentation, and tender credential showcase.",
  },
];

const SLA_SCHEDULE = [
  {
    day: "Phase 1",
    title: "Project Kick-Off & Architecture",
    desc: "Onboarding brief, domain review, and trade scope confirmation.",
  },
  {
    day: "Phase 2",
    title: "Trade Copywriting",
    desc: "Clear copywriting tailored to your exact accreditations and services.",
  },
  {
    day: "Phase 3",
    title: "Web Design & Implementation",
    desc: "High-speed frontend build, enquiry forms, and mobile optimisation.",
  },
  {
    day: "Phase 4",
    title: "Client Staging Review",
    desc: "Private review link issued for final approval, factual checks, and adjustments.",
  },
  {
    day: "Phase 5",
    title: "Live Launch",
    desc: "Domain connection, SSL certificate deployment, and final sign-off.",
  },
];

function ProposalsPage() {
  const search = Route.useSearch();
  const initialClient = search.client || "Apex Heating & Mechanical Ltd";
  const initialPkgKey =
    search.package && search.package in PACKAGES
      ? (search.package as keyof typeof PACKAGES)
      : "launch";

  // Preset defaults for proposal demonstration & customisation
  const [clientName, setClientName] = useState(initialClient);
  const [clientSector, setClientSector] = useState("Commercial & Domestic Electrical Contractors");
  const [clientLocation, setClientLocation] = useState("Bristol, Bath & M4 Corridor");
  const [selectedPackageKey, setSelectedPackageKey] =
    useState<keyof typeof PACKAGES>(initialPkgKey);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "care-managed",
    "seo-pack",
    "review-booster",
  ]);

  const currentPkg = PACKAGES[selectedPackageKey];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId],
    );
  };

  const calculatedTotals = useMemo(() => {
    let netUpfront = currentPkg.price;
    let monthlyTotal = 0;

    selectedAddons.forEach((id) => {
      const addon = AVAILABLE_ADDONS.find((a) => a.id === id);
      if (addon) {
        netUpfront += addon.price;
        if (addon.monthly) monthlyTotal += addon.monthly;
      }
    });

    const grossUpfront = netUpfront;
    const depositRequired = Math.round(grossUpfront * 0.5 * 100) / 100;
    const balanceOnCompletion = Math.round((grossUpfront - depositRequired) * 100) / 100;

    return {
      netUpfront,
      grossUpfront,
      upfrontTotal: netUpfront,
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

  return (
    <PageShell>
      {/* Proposal Header */}
      <section className="bg-slate-950 pt-20 pb-12 text-white md:pt-24 md:pb-16 border-b border-slate-800">
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
              <span>
                Sector: <strong className="text-white">{clientSector}</strong>
              </span>
              <span>•</span>
              <span>
                Region: <strong className="text-white">{clientLocation}</strong>
              </span>
              <span>•</span>
              <span>
                Prepared by:{" "}
                <strong className="text-white">Harley Digital Works (The Harley Group)</strong>
              </span>
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
                    <span className="text-2xl font-bold text-ink">
                      £{currentPkg.price.toLocaleString()}
                    </span>
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
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 border border-ink/5"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-ink leading-relaxed font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optional High-Impact Add-ons */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                      Modular Enhancements
                    </span>
                    <h3 className="text-lg font-bold text-ink mt-0.5">
                      Customise Your Growth Modules
                    </h3>
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
                              <span className="text-sm font-bold text-ink">+£{addon.price}</span>
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

              {/* Milestone Delivery SLA Timeline */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                  Agreed Delivery Framework
                </span>
                <h3 className="text-lg font-bold text-ink mt-0.5">Milestone Delivery Schedule</h3>
                <p className="mt-1 text-xs text-ink-muted">
                  Strict milestone progression with daily transparency via your dedicated build
                  tracker.
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
                      <span className="font-semibold text-ink">
                        £{currentPkg.price.toLocaleString()}
                      </span>
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

                    <div className="border-t border-ink/10 pt-3 flex justify-between font-bold text-sm text-ink">
                      <span>Setup Subtotal</span>
                      <span>£{calculatedTotals.netUpfront.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-emerald-800 border-t border-ink/5 pt-2">
                      <span>Total Upfront Investment</span>
                      <span>
                        £
                        {calculatedTotals.grossUpfront.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
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
                      <span>50% Deposit to Reserve Slot:</span>
                      <span className="font-bold text-white text-sm">
                        £
                        {calculatedTotals.depositRequired.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>50% Balance on Preview Sign-Off:</span>
                      <span>
                        £
                        {calculatedTotals.balanceOnCompletion.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                    <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-slate-900 text-white mb-2">
                      <Lock className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-bold text-ink">Formal Written Agreement</h4>
                    <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                      Proposals are agreed individually with written scope, deliverables and timings
                      confirmed upfront. To request or discuss your proposal, contact founder Robbie
                      Harley directly.
                    </p>
                    <div className="mt-4">
                      <Link
                        to="/contact"
                        search={{
                          service: "Proposal inquiry",
                          package: undefined,
                          domain: undefined,
                          websiteUrl: undefined,
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                      >
                        Start a conversation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
