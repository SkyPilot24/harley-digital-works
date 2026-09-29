import { useState } from "react";
import {
  Radar,
  Search,
  Sparkles,
  Download,
  ExternalLink,
  AlertTriangle,
  Zap,
  Phone,
  Send,
  CheckCircle2,
  FileText,
  Filter,
  ArrowRight,
  TrendingDown,
  ShieldAlert,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

export interface RadarProspect {
  id: string;
  director: string;
  companyName: string;
  trade: string;
  city: string;
  postcode: string;
  websiteUrl: string;
  phone: string;
  mobileSpeed: string;
  speedStatus: "critical" | "warning" | "optimal";
  ttfbMs: number;
  googleRating: number;
  reviewCount: number;
  hasWhatsApp: boolean;
  hasQuoteCalc: boolean;
  hasSsl: boolean;
  monthlyRevenueLeakGbp: number;
  primaryAngle: string;
}

const INITIAL_PROSPECTS: RadarProspect[] = [
  {
    id: "rad_101",
    director: "Mark Taylor",
    companyName: "Cheshire Heat & Power Ltd",
    trade: "Heating & Boiler Specialists",
    city: "Wilmslow",
    postcode: "SK9 1AA",
    websiteUrl: "cheshireheat.co.uk",
    phone: "07700900123",
    mobileSpeed: "5.4s",
    speedStatus: "critical",
    ttfbMs: 840,
    googleRating: 4.8,
    reviewCount: 24,
    hasWhatsApp: false,
    hasQuoteCalc: false,
    hasSsl: true,
    monthlyRevenueLeakGbp: 4800,
    primaryAngle: "The 3-Second Speed Teardown",
  },
  {
    id: "rad_102",
    director: "Liam Fletcher",
    companyName: "Vanguard Roofing & Solar Ltd",
    trade: "Solar PV & Battery Storage",
    city: "Knutsford",
    postcode: "WA16 6DD",
    websiteUrl: "vanguardroofing.co.uk",
    phone: "07700900456",
    mobileSpeed: "6.1s",
    speedStatus: "critical",
    ttfbMs: 1120,
    googleRating: 4.9,
    reviewCount: 42,
    hasWhatsApp: false,
    hasQuoteCalc: false,
    hasSsl: true,
    monthlyRevenueLeakGbp: 6200,
    primaryAngle: "Google Map Pack Missed Calls",
  },
  {
    id: "rad_103",
    director: "Craig Higgins",
    companyName: "Apex Air Conditioning Services",
    trade: "Air Conditioning & HVAC",
    city: "Altrincham",
    postcode: "WA14 2EP",
    websiteUrl: "apexaircon-cheshire.co.uk",
    phone: "07700900789",
    mobileSpeed: "4.8s",
    speedStatus: "warning",
    ttfbMs: 650,
    googleRating: 4.6,
    reviewCount: 18,
    hasWhatsApp: false,
    hasQuoteCalc: false,
    hasSsl: false,
    monthlyRevenueLeakGbp: 3900,
    primaryAngle: "Emergency Out-of-Hours Dominance",
  },
  {
    id: "rad_104",
    director: "David Evans",
    companyName: "Crown Commercial Electrical",
    trade: "Commercial Electrical & EV",
    city: "Macclesfield",
    postcode: "SK10 1EE",
    websiteUrl: "crownelectrical-macclesfield.co.uk",
    phone: "07700900321",
    mobileSpeed: "5.8s",
    speedStatus: "critical",
    ttfbMs: 910,
    googleRating: 4.7,
    reviewCount: 31,
    hasWhatsApp: false,
    hasQuoteCalc: false,
    hasSsl: true,
    monthlyRevenueLeakGbp: 5100,
    primaryAngle: "The 3-Second Speed Teardown",
  },
  {
    id: "rad_105",
    director: "Simon Bradley",
    companyName: "Alderley Edge Plumbing & Bathrooms",
    trade: "Emergency Plumbing & Heating",
    city: "Alderley Edge",
    postcode: "SK9 7QL",
    websiteUrl: "alderleyedgeplumbing.co.uk",
    phone: "07700900654",
    mobileSpeed: "3.9s",
    speedStatus: "warning",
    ttfbMs: 520,
    googleRating: 5.0,
    reviewCount: 15,
    hasWhatsApp: false,
    hasQuoteCalc: false,
    hasSsl: true,
    monthlyRevenueLeakGbp: 3200,
    primaryAngle: "Emergency Out-of-Hours Dominance",
  },
];

const TRADES = [
  "All Trade Sectors",
  "Heating & Boiler Specialists",
  "Solar PV & Battery Storage",
  "Air Conditioning & HVAC",
  "Commercial Electrical & EV",
  "Emergency Plumbing & Heating",
];

const REGIONS = [
  "All UK Hubs",
  "Wilmslow & Cheshire (SK9)",
  "Knutsford & Tatton (WA16)",
  "Altrincham & Hale (WA14/15)",
  "Macclesfield & Prestbury (SK10/11)",
  "Greater Manchester (M1/M2/SK8)",
];

export function TradeLeadRadarDesk({
  onSelectProspect,
}: {
  onSelectProspect?: (prospect: RadarProspect) => void;
}) {
  const [prospects, setProspects] = useState<RadarProspect[]>(INITIAL_PROSPECTS);
  const [selectedTrade, setSelectedTrade] = useState("All Trade Sectors");
  const [selectedRegion, setSelectedRegion] = useState("All UK Hubs");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = prospects.filter((p) => {
    const matchTrade = selectedTrade === "All Trade Sectors" || p.trade === selectedTrade;
    const matchRegion =
      selectedRegion === "All UK Hubs" ||
      selectedRegion.toLowerCase().includes(p.city.toLowerCase());
    const matchSearch =
      !searchTerm ||
      p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTrade && matchRegion && matchSearch;
  });

  const totalLeak = filtered.reduce((sum, p) => sum + p.monthlyRevenueLeakGbp, 0);
  const criticalCount = filtered.filter((p) => p.speedStatus === "critical").length;

  const exportCsv = () => {
    const header =
      "Director,Company,Trade,City,Postcode,Website,Phone,Speed,GoogleRating,ReviewCount,EstMonthlyLeak,Angle\n";
    const rows = filtered
      .map(
        (p) =>
          `"${p.director}","${p.companyName}","${p.trade}","${p.city}","${p.postcode}","${p.websiteUrl}","${p.phone}","${p.mobileSpeed}","${p.googleRating}★","${p.reviewCount}","£${p.monthlyRevenueLeakGbp}","${p.primaryAngle}"`,
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `harley-lead-radar-export-${Date.now().toString(36)}.csv`;
    a.click();
    toast.success(`${filtered.length} qualified prospects exported to CSV!`);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-ink/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 text-purple-700 px-3 py-1 text-xs font-semibold border border-purple-200">
              <Radar className="h-3.5 w-3.5" />
              <span>UK Trade Lead Radar & Slow-Site Prospector</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-ink">
              High-Ticket Contractor Opportunity Matrix
            </h2>
            <p className="mt-1 text-xs text-ink-muted max-w-2xl">
              Continuously scans UK trade contractors across Cheshire & Greater Manchester,
              benchmarks mobile loading latency, flags missing conversion triggers, and models
              estimated lost revenue.
            </p>
          </div>

          <button
            onClick={exportCsv}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink hover:bg-ink/90 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>Export {filtered.length} Leads (CSV)</span>
          </button>
        </div>

        {/* Telemetry Metrics */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-surface-sage p-4 border border-ink/5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Total Scanned Targets
            </div>
            <div className="mt-1 text-2xl font-bold text-ink">{filtered.length} Prospects</div>
            <div className="mt-0.5 text-xs text-ink-muted">Active UK Geo-Grid</div>
          </div>

          <div className="rounded-2xl bg-red-50 p-4 border border-red-200">
            <div className="text-[11px] font-mono uppercase tracking-wider text-red-600 font-semibold">
              Critical Speed Latency (&gt;4.5s)
            </div>
            <div className="mt-1 text-2xl font-bold text-red-700">{criticalCount} Targets</div>
            <div className="mt-0.5 text-xs text-red-600/80">Immediate high-bounce risk</div>
          </div>

          <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700 font-semibold">
              Missing WhatsApp / Quote Engine
            </div>
            <div className="mt-1 text-2xl font-bold text-amber-800">100% of Targets</div>
            <div className="mt-0.5 text-xs text-amber-700/80">Prime conversion upgrade fit</div>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              Total Monthly Revenue Leak
            </div>
            <div className="mt-1 text-2xl font-bold text-emerald-800">
              £{totalLeak.toLocaleString()}/mo
            </div>
            <div className="mt-0.5 text-xs text-emerald-700/80">Recoverable by Harley Edge</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-ink-muted" />
            <span className="text-xs font-semibold text-ink">Filters:</span>
          </div>

          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="rounded-xl border border-ink/15 bg-background/50 px-3 py-1.5 text-xs font-medium text-ink"
          >
            {TRADES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-xl border border-ink/15 bg-background/50 px-3 py-1.5 text-xs font-medium text-ink"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contractor or town…"
            className="w-full rounded-xl border border-ink/15 bg-background/50 pl-8 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted"
          />
        </div>
      </div>

      {/* Main Prospect Table */}
      <div className="rounded-3xl border border-ink/10 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ink/10 bg-surface-sage/60 text-ink-muted uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3.5 px-4 font-semibold">Contractor & Town</th>
                <th className="py-3.5 px-4 font-semibold">Trade Vertical</th>
                <th className="py-3.5 px-4 font-semibold">Speed / TTFB</th>
                <th className="py-3.5 px-4 font-semibold">Google Reviews</th>
                <th className="py-3.5 px-4 font-semibold">Conversion Gaps</th>
                <th className="py-3.5 px-4 font-semibold">Est. Monthly Leak</th>
                <th className="py-3.5 px-4 font-semibold text-right">Outreach Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 text-ink/80">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-ink/[0.02] transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-sm text-ink">{p.companyName}</div>
                    <div className="text-[11px] text-ink-muted flex items-center gap-1.5 mt-0.5">
                      <span>{p.director}</span>
                      <span>•</span>
                      <span className="font-mono">
                        {p.city} ({p.postcode})
                      </span>
                    </div>
                    <a
                      href={`https://${p.websiteUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono text-primary hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      <span>{p.websiteUrl}</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </td>

                  <td className="py-4 px-4 font-medium text-ink">{p.trade}</td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-mono font-bold ${
                          p.speedStatus === "critical"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {p.mobileSpeed}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-ink-muted mt-1">
                      TTFB: {p.ttfbMs}ms
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-ink flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span>{p.googleRating}</span>
                      <span className="text-ink-muted font-normal">({p.reviewCount})</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                      High Reputation
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {!p.hasWhatsApp && (
                        <span className="rounded bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 text-[10px] font-medium">
                          No WhatsApp
                        </span>
                      )}
                      {!p.hasQuoteCalc && (
                        <span className="rounded bg-purple-50 text-purple-800 border border-purple-200 px-1.5 py-0.5 text-[10px] font-medium">
                          No Calculator
                        </span>
                      )}
                      {!p.hasSsl && (
                        <span className="rounded bg-red-50 text-red-800 border border-red-200 px-1.5 py-0.5 text-[10px] font-medium">
                          No SSL
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-red-700">
                    -£{p.monthlyRevenueLeakGbp.toLocaleString()}/mo
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <a
                        href={`https://wa.me/${p.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hi ${p.director}, Robbie Harley here from Harley Digital Works in Wilmslow. I ran a quick mobile speed test on ${p.websiteUrl} (${p.mobileSpeed} load time). We put together a 60-second teardown showing how to capture ~£${p.monthlyRevenueLeakGbp}/mo in lost local quote requests. Would love to share the 4-slide audit with you.`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 text-[11px] font-bold transition-all shadow-sm"
                      >
                        <Send className="h-3 w-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
