import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Clock,
  ShieldCheck,
  Star,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  Flame,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { TRADE_VERTICALS } from "@/lib/trade-data";

export interface TradeCaseStudy {
  id: string;
  clientName: string;
  tradeSlug: string;
  tradeLabel: string;
  city: string;
  tagline: string;
  summary: string;
  beforeStats: {
    loadTime: string;
    bounceRate: string;
    monthlyQuotes: string;
    mapPackRank: string;
  };
  afterStats: {
    loadTime: string;
    bounceRate: string;
    monthlyQuotes: string;
    mapPackRank: string;
  };
  keyFeatures: string[];
  clientQuote: {
    quote: string;
    author: string;
    role: string;
  };
  packageTier: string;
  liveUrl?: string;
}

export const CASE_STUDY_PRESETS: TradeCaseStudy[] = [
  {
    id: "cs-cheshire-heat",
    clientName: "Cheshire Heat & Boiler Co Ltd",
    tradeSlug: "heating-engineers",
    tradeLabel: "Heating & Gas Safe Engineers",
    city: "Stockport, Greater Manchester",
    tagline: "300% increase in high-ticket boiler replacement leads within 30 days of launch.",
    summary:
      "Transitioned from a dated WordPress template with broken plugins to a sub-50ms TanStack edge site with an interactive Combi Swap Calculator and Gas Safe trust badges.",
    beforeStats: {
      loadTime: "4.8s",
      bounceRate: "72%",
      monthlyQuotes: "£3,200",
      mapPackRank: "#19 in Stockport",
    },
    afterStats: {
      loadTime: "0.32s",
      bounceRate: "14%",
      monthlyQuotes: "£16,400",
      mapPackRank: "#1 Map Pack",
    },
    keyFeatures: [
      "Fixed-Price Combi Swap Estimator",
      "1-Tap WhatsApp Emergency Callout",
      "Multi-Borough Schema (SK1 - SK8)",
      "Gas Safe Register #592011 Verified Badge",
    ],
    clientQuote: {
      quote:
        "We had 3 new combi boiler swaps booked in our first week live. Inquiries arrive directly on WhatsApp with all room and property details already filled in.",
      author: "Dave Harrison",
      role: "Director & Lead Engineer",
    },
    packageTier: "Managed Trade Presence (£1,495) + £249/mo Care",
    liveUrl:
      "https://harleydigitalworks.com/demos?company=Cheshire+Heat+%26+Boiler+Co+Ltd&trade=heating&city=Stockport",
  },
  {
    id: "cs-vanguard-electrical",
    clientName: "Vanguard Electrical & EV Ltd",
    tradeSlug: "electricians",
    tradeLabel: "Commercial Electricians & EV Charging",
    city: "Solihull, Birmingham",
    tagline: "Secured £48,000 in commercial 3-phase and workplace EV contracts in Quarter 1.",
    summary:
      "Engineered an authoritative NICEIC-approved commercial website positioning Vanguard as the go-to specialist for industrial warehousing and workplace EV charging infrastructure.",
    beforeStats: {
      loadTime: "5.4s",
      bounceRate: "68%",
      monthlyQuotes: "£4,500",
      mapPackRank: "#22 in Solihull",
    },
    afterStats: {
      loadTime: "0.28s",
      bounceRate: "11%",
      monthlyQuotes: "£24,800",
      mapPackRank: "#2 Map Pack",
    },
    keyFeatures: [
      "Commercial 3-Phase Board Calculator",
      "Workplace EV Charging ROI Estimator",
      "NICEIC Approved Contractor Schema",
      "Automated 5-Star SMS Review Booster",
    ],
    clientQuote: {
      quote:
        "The done-for-you copywriting completely changed our customer calibre. We went from small domestic socket repairs to £15k warehouse distribution fit-outs.",
      author: "Craig Robinson",
      role: "Managing Director",
    },
    packageTier: "Managed Trade Presence (£1,495) + £249/mo Care",
    liveUrl:
      "https://harleydigitalworks.com/demos?company=Vanguard+Electrical+%26+EV+Ltd&trade=electrical&city=Solihull",
  },
  {
    id: "cs-apex-roofing",
    clientName: "Apex Premier Roofing & Cladding",
    tradeSlug: "roofing-specialists",
    tradeLabel: "Roofing & Gutter Specialists",
    city: "Leeds, West Yorkshire",
    tagline: "4.9★ Google reputation shield with 42 verified reviews captured in 60 days.",
    summary:
      "Integrated the automated Post-Job Review Booster and multi-city borough SEO covering 12 postal codes across West Yorkshire for emergency storm repairs and re-roofs.",
    beforeStats: {
      loadTime: "4.1s",
      bounceRate: "64%",
      monthlyQuotes: "£5,000",
      mapPackRank: "#14 in Leeds",
    },
    afterStats: {
      loadTime: "0.35s",
      bounceRate: "16%",
      monthlyQuotes: "£19,500",
      mapPackRank: "#1 Map Pack",
    },
    keyFeatures: [
      "Instant Roof Replacement Estimator",
      "Before & After Work Slider Gallery",
      "Automated Review Booster (42 New 5★ Reviews)",
      "West Yorkshire Borough Schema Cluster",
    ],
    clientQuote: {
      quote:
        "The review booster alone pays for our monthly Care Plan ten times over. Homeowners see our 4.9★ rating on Google Maps and book us without asking for quotes from anyone else.",
      author: "Liam Walker",
      role: "Founder & Master Roofer",
    },
    packageTier: "Managed Trade Presence (£1,495) + £249/mo Care",
    liveUrl:
      "https://harleydigitalworks.com/demos?company=Apex+Premier+Roofing&trade=roofing&city=Leeds",
  },
];

export function CaseStudyFactoryDesk() {
  const [caseStudies, setCaseStudies] = useState<TradeCaseStudy[]>(CASE_STUDY_PRESETS);
  const [selectedId, setSelectedId] = useState<string>(CASE_STUDY_PRESETS[0].id);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeStudy = caseStudies.find((c) => c.id === selectedId) || caseStudies[0];

  const handleCopyJson = (study: TradeCaseStudy) => {
    navigator.clipboard.writeText(JSON.stringify(study, null, 2));
    setCopiedId(study.id);
    toast.success("Case study JSON copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateNew = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const newStudy: TradeCaseStudy = {
        id: `cs-custom-${Date.now()}`,
        clientName: "Summit Plumbing & Bathrooms Ltd",
        tradeSlug: "plumbing",
        tradeLabel: "Plumbing & Luxury Bathroom Fitters",
        city: "Altrincham, Cheshire",
        tagline: "Doubled luxury bathroom installation inquiries with 0 client writing required.",
        summary:
          "Turnkey 5-page trade website with interactive bathroom renovation pricing matrix, delivered to an agreed schedule.",
        beforeStats: {
          loadTime: "5.1s",
          bounceRate: "69%",
          monthlyQuotes: "£3,800",
          mapPackRank: "#16 in Altrincham",
        },
        afterStats: {
          loadTime: "0.29s",
          bounceRate: "12%",
          monthlyQuotes: "£18,200",
          mapPackRank: "#1 Map Pack",
        },
        keyFeatures: [
          "Luxury Bathroom Estimator",
          "Before/After Transformation Gallery",
          "Cheshire Multi-Borough Schema",
          "WhatsApp Instant Booking Desk",
        ],
        clientQuote: {
          quote:
            "[FICTIONAL SAMPLE QUOTE — replace with a real, permissioned client quote before any use.]",
          author: "Mark Evans",
          role: "Owner & Master Plumber",
        },
        packageTier: "Launch Plan (£1,495)",
        liveUrl:
          "https://harleydigitalworks.com/demos?company=Summit+Plumbing+%26+Bathrooms&trade=plumbing&city=Altrincham",
      };

      setCaseStudies([newStudy, ...caseStudies]);
      setSelectedId(newStudy.id);
      setIsSynthesizing(false);
      toast.success("New Trade Case Study Synthesized via Harley Labs Engine!");
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Fictional data warning — these presets are invented and must never be published or sent */}
      <div
        role="alert"
        className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
      >
        <strong>Fictional sample data only.</strong> Every company, quote, ranking and figure below
        is invented for layout testing. Never publish, send or quote these as real client results.
        Replace with verified client evidence and written permission first.
      </div>
      {/* Top Banner */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-ink">
                  Automated Trade Case Study & ROI Proof Factory
                </h3>
                <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 font-mono">
                  BEFORE/AFTER TELEMETRY
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Synthesize high-converting trade case studies with speed scores, revenue metrics,
                verified review lift, and client quotes for /work.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateNew}
            disabled={isSynthesizing}
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white hover:bg-ink/90 transition-colors shadow-xs shrink-0"
          >
            <Sparkles
              className={`h-4 w-4 text-amber-400 ${isSynthesizing ? "animate-spin" : ""}`}
            />
            <span>
              {isSynthesizing ? "Synthesizing Case Study..." : "Synthesize New Case Study"}
            </span>
          </button>
        </div>
      </div>

      {/* Grid: Presets Selector vs Live Case Study Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Case Study List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted px-1">
            Verified Trade Case Studies ({caseStudies.length})
          </div>

          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setSelectedId(study.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${
                selectedId === study.id
                  ? "bg-amber-50/80 border-amber-300 shadow-xs"
                  : "bg-white border-ink/10 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink truncate">{study.clientName}</span>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  {study.afterStats.monthlyQuotes}
                </span>
              </div>
              <div className="text-[11px] text-ink-muted mt-1">
                {study.tradeLabel} • {study.city.split(",")[0]}
              </div>
              <p className="mt-2 text-[11px] text-ink/80 italic line-clamp-2">
                &ldquo;{study.tagline}&rdquo;
              </p>
            </button>
          ))}
        </div>

        {/* Right: Live Case Study Preview Card */}
        <div className="lg:col-span-8 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8 shadow-md space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                  {activeStudy.tradeLabel}
                </span>
                <span className="text-xs text-ink-muted">• {activeStudy.city}</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-ink">{activeStudy.clientName}</h2>
              <p className="mt-1 text-xs text-emerald-700 font-semibold font-mono">
                {activeStudy.packageTier}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyJson(activeStudy)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors"
              >
                {copiedId === activeStudy.id ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copiedId === activeStudy.id ? "Copied JSON" : "Copy JSON"}</span>
              </button>

              {activeStudy.liveUrl && (
                <a
                  href={activeStudy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                  <span>View Staging</span>
                </a>
              )}
            </div>
          </div>

          {/* Tagline & Narrative */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-ink">{activeStudy.tagline}</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              {activeStudy.summary}
            </p>
          </div>

          {/* Before vs After Telemetry Comparison Grid */}
          <div className="rounded-2xl border border-ink/10 bg-slate-50 p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
              <span>Performance & Revenue Benchmark</span>
              <span className="text-emerald-700">Verified Client Telemetry</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-xl bg-white p-3 border border-ink/10">
                <div className="text-[10px] uppercase font-mono text-ink-muted">Page Speed</div>
                <div className="mt-1 text-xs text-rose-600 line-through font-mono">
                  {activeStudy.beforeStats.loadTime}
                </div>
                <div className="text-base font-bold text-emerald-700 font-mono">
                  {activeStudy.afterStats.loadTime}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 border border-ink/10">
                <div className="text-[10px] uppercase font-mono text-ink-muted">Mobile Bounce</div>
                <div className="mt-1 text-xs text-rose-600 line-through font-mono">
                  {activeStudy.beforeStats.bounceRate}
                </div>
                <div className="text-base font-bold text-emerald-700 font-mono">
                  {activeStudy.afterStats.bounceRate}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 border border-ink/10">
                <div className="text-[10px] uppercase font-mono text-ink-muted">
                  Monthly Pipeline
                </div>
                <div className="mt-1 text-xs text-rose-600 line-through font-mono">
                  {activeStudy.beforeStats.monthlyQuotes}
                </div>
                <div className="text-base font-bold text-emerald-700 font-mono">
                  {activeStudy.afterStats.monthlyQuotes}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 border border-ink/10">
                <div className="text-[10px] uppercase font-mono text-ink-muted">Map Pack Rank</div>
                <div className="mt-1 text-xs text-rose-600 line-through font-mono">
                  {activeStudy.beforeStats.mapPackRank}
                </div>
                <div className="text-base font-bold text-emerald-700 font-mono">
                  {activeStudy.afterStats.mapPackRank}
                </div>
              </div>
            </div>
          </div>

          {/* Key Implemented Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted font-bold">
              Key Delivered Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeStudy.keyFeatures.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 rounded-lg bg-white p-2 border border-ink/10 text-ink"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonial Box */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-900 ml-2">
                5.0 / 5.0 Client Rating
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 italic leading-relaxed">
              &ldquo;{activeStudy.clientQuote.quote}&rdquo;
            </p>
            <div className="text-xs text-amber-900 font-semibold pt-1 border-t border-amber-200/60">
              — {activeStudy.clientQuote.author},{" "}
              <span className="font-normal text-amber-800">
                {activeStudy.clientQuote.role} ({activeStudy.clientName})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
