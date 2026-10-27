import { useState } from "react";
import {
  Cpu,
  Sparkles,
  FileText,
  Copy,
  Check,
  CheckCircle2,
  RefreshCw,
  Download,
  Layers,
  ArrowRight,
  Flame,
  Zap,
  Building2,
  Hammer,
} from "lucide-react";
import { toast } from "sonner";
import { TRADE_VERTICALS } from "@/lib/trade-data";

export function ContentFlowEngine() {
  const [selectedTrade, setSelectedTrade] = useState<string>("heating-engineers");
  const [businessName, setBusinessName] = useState("Vanguard Heating & Energy Ltd");
  const [town, setTown] = useState("Manchester & Stockport");
  const [accreditations, setAccreditations] = useState(
    "Gas Safe Reg: 592819, Worcester Bosch Accredited",
  );
  const [guaranteeYears, setGuaranteeYears] = useState("12");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePageTab, setActivePageTab] = useState<
    "home" | "services" | "pricing" | "about" | "geo"
  >("home");

  const trade = TRADE_VERTICALS[selectedTrade] || TRADE_VERTICALS["heating-engineers"];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("5-Page Technical Trade Copy Pack Generated!");
    }, 850);
  };

  const getPageCopy = (page: string) => {
    if (page === "home") {
      return `# ${businessName} — Official Website Copy

## Hero Section
**Eyebrow**: ${accreditations}
**Headline**: Reliable ${trade.name} Across ${town}.
**Subheadline**: We deliver high-efficiency boiler installations, rapid emergency repairs, and full central heating upgrades with up to ${guaranteeYears}-year manufacturer warranties. 100% fixed upfront pricing with zero hidden callout surprises.
**Primary CTA**: Get An Instant Fixed Quote (60 Seconds)
**Secondary CTA**: WhatsApp Emergency Dispatch (0161 496 0910)

## Trust & Authority Strip
- ✓ Gas Safe Registered & Fully Insured (£5M Liability)
- ✓ Up to ${guaranteeYears}-Year Manufacturer Warranty
- ✓ 0% Interest-Free Finance Options Available
- ✓ 5-Star Rated Across Google Reviews

## Core Service Pillars
1. **Combi Boiler Replacements**: Worcester Bosch, Vaillant & Baxi installations tailored for maximum energy efficiency.
2. **Emergency Heating Repairs**: Same-day diagnosis and prompt component replacement across ${town}.
3. **Smart Thermostats & Controls**: Hive & Nest integration to cut household heating bills by up to 25%.`;
    }

    if (page === "services") {
      return `# Service Breakdown — ${businessName}

### 1. High-Efficiency Boiler Installations
Stop wasting money on an inefficient 15-year-old boiler. We install modern A-rated condensing boilers with smart modulation, backed by our exclusive ${guaranteeYears}-year parts and labour warranty.

### 2. Commercial Landlord Gas Safety (CP12)
Comprehensive inspection of all gas appliances, flues, and meters for landlords and letting agents across ${town}. Digital certificates issued within 2 hours of inspection.

### 3. Power Flushing & System Cleansing
Restore maximum radiator heat output and remove damaging magnetite sludge with MagnaClean magnetic filtration.`;
    }

    if (page === "pricing") {
      return `# Transparent Trade Pricing Guide — ${businessName}

| Service Package | Typical Investment | Warranty / SLA |
|---|---|---|
| Combi Boiler Swap (Like-for-Like) | From £1,850 + VAT | ${guaranteeYears}-Year Guarantee |
| Full Central Heating System Upgrade | From £3,400 + VAT | ${guaranteeYears}-Year Guarantee |
| Annual Boiler Service & Flue Test | £85.00 + VAT | Full Digital Certificate |
| Emergency Diagnosis Callout | £95.00 + VAT | First hour diagnostic included |

**Payment Options**: We accept all major credit cards, direct bank BACS transfers, and offer monthly finance options.`;
    }

    if (page === "about") {
      return `# About ${businessName}

Founded with a commitment to straightforward engineering, ${businessName} has served homeowners and commercial property managers across ${town} with honest pricing and uncompromising workmanship.

### Our 4 Workmanship Standards:
1. **Punctual & Respectful**: We turn up on time in clean liveried vans and always use carpet protection sheets.
2. **Transparent Quotations**: We provide fixed itemized quotes before starting any work.
3. **Accredited Craft**: Every engineer is Gas Safe registered and undergoes continuous manufacturer factory training.
4. **Long-Term Support**: We service what we install and provide priority 24/7 care coverage.`;
    }

    return `# Regional Service Coverage — ${town}

We provide rapid same-day heating and gas engineering coverage across all local districts including:
- **Central ${town.split("&")[0]}** (M1, M2, M3)
- **Stockport & Cheadle** (SK1, SK4, SK8)
- **Altrincham, Sale & Timperley** (WA14, WA15)
- **Didsbury & Chorlton** (M20, M21)

**Need emergency heating assistance in ${town}?** Call our dispatch team directly on 0161 496 0910.`;
  };

  const handleCopyPage = () => {
    const text = getPageCopy(activePageTab);
    navigator.clipboard.writeText(text);
    toast.success("Page copy copied to clipboard!");
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-300">
              <Cpu className="h-4 w-4" />
            </span>
            <h3 className="text-lg font-bold text-ink">
              ContentFlow AI: Technical Trade Copy Engine
            </h3>
          </div>
          <p className="mt-1 text-xs text-ink-muted">
            Synthesizes 5 complete pages of authoritative, jargon-free trade copy ready for instant
            staging deployment.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Sparkles
            className={`h-3.5 w-3.5 ${isGenerating ? "animate-spin text-amber-300" : ""}`}
          />
          <span>{isGenerating ? "Synthesizing Copy..." : "Generate Full Copy Pack"}</span>
        </button>
      </div>

      {/* Input Parameters Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block text-[11px] font-semibold text-ink mb-1">Trade Vertical</label>
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-slate-50 px-3 py-2 text-xs text-ink focus:outline-none"
          >
            <option value="heating-engineers">Gas & Heating Engineers</option>
            <option value="commercial-contractors">Commercial & Multi-Van Contractors</option>
            <option value="electricians">Electricians & EV Installers</option>
            <option value="builders">Master Builders & Extensions</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-ink mb-1">Company Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-slate-50 px-3 py-2 text-xs text-ink focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-ink mb-1">
            Primary Metro Region
          </label>
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-slate-50 px-3 py-2 text-xs text-ink focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-ink mb-1">
            Accreditations / Badges
          </label>
          <input
            type="text"
            value={accreditations}
            onChange={(e) => setAccreditations(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-slate-50 px-3 py-2 text-xs text-ink focus:outline-none"
          />
        </div>
      </div>

      {/* 5-Page Tabs Switcher */}
      <div>
        <div className="flex gap-2 overflow-x-auto border-b border-ink/10 pb-2">
          {[
            { id: "home", label: "1. Homepage Hero & Pillars" },
            { id: "services", label: "2. Services Breakdown" },
            { id: "pricing", label: "3. Transparent Pricing Guide" },
            { id: "about", label: "4. About & Accreditations" },
            { id: "geo", label: "5. Regional Geo-Hub" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePageTab(tab.id as typeof activePageTab)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activePageTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Copy Display Screen */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-6 text-white font-mono text-xs space-y-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-bold">READY FOR DEPLOYMENT</span>
            <button
              onClick={handleCopyPage}
              className="inline-flex items-center gap-1.5 rounded bg-slate-800 hover:bg-slate-700 px-3 py-1 text-white text-xs transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Markdown</span>
            </button>
          </div>

          <div className="whitespace-pre-wrap leading-relaxed text-slate-200 max-h-72 overflow-y-auto">
            {getPageCopy(activePageTab)}
          </div>
        </div>
      </div>
    </div>
  );
}
