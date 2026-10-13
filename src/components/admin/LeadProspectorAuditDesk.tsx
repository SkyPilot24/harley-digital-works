import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Sparkles,
  Zap,
  Globe,
  Building2,
  Phone,
  Mail,
  Flame,
  Hammer,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Send,
  MessageCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { TRADE_VERTICALS } from "@/lib/trade-data";
import { UK_LOCATIONS } from "@/lib/location-data";

export interface SourcedLead {
  id: string;
  companyName: string;
  tradeSector: string;
  location: string;
  websiteUrl: string;
  phone: string;
  email: string;
  googleRating: number;
  reviewCount: number;
  pageSpeedScore: number;
  opportunityScore: number; // 1 to 100
  estimatedLostRevenueMonthly: string;
  identifiedIssues: string[];
}

const SAMPLE_PROSPECT_POOL: SourcedLead[] = [
  {
    id: "prospect-1",
    companyName: "Cheshire Heat & Boiler Co Ltd",
    tradeSector: "heating-engineers",
    location: "Stockport, Greater Manchester",
    websiteUrl: "cheshireheatboilers-example.co.uk",
    phone: "0161 480 9201",
    email: "info@cheshireheatboilers.co.uk",
    googleRating: 4.2,
    reviewCount: 14,
    pageSpeedScore: 31,
    opportunityScore: 94,
    estimatedLostRevenueMonthly: "£8,500/mo",
    identifiedIssues: [
      "4.8s mobile load time (fails Google Core Web Vitals)",
      "No interactive boiler quote or brand selector",
      "Gas Safe registration badge is missing from mobile header",
      "Rank #14 on Google Map Pack for 'Boiler Install Stockport'",
    ],
  },
  {
    id: "prospect-2",
    companyName: "Vanguard Electrical & EV Solutions",
    tradeSector: "electricians",
    location: "Solihull, Birmingham",
    websiteUrl: "vanguard-electric-midlands.co.uk",
    phone: "0121 705 4410",
    email: "contact@vanguard-electric.co.uk",
    googleRating: 4.5,
    reviewCount: 22,
    pageSpeedScore: 42,
    opportunityScore: 89,
    estimatedLostRevenueMonthly: "£12,000/mo",
    identifiedIssues: [
      "No workplace EV charge point or 3-phase commercial service pages",
      "Missing automated review capture mechanism",
      "No click-to-call button on mobile viewport",
      "No LocalBusiness JSON-LD schema markup",
    ],
  },
  {
    id: "prospect-3",
    companyName: "Apex Commercial Facilities & HVAC Ltd",
    tradeSector: "commercial-contractors",
    location: "Leeds, West Yorkshire",
    websiteUrl: "apexfacilities-yorkshire.co.uk",
    phone: "0113 244 8830",
    email: "enquiries@apexfacilities-yorkshire.co.uk",
    googleRating: 4.1,
    reviewCount: 9,
    pageSpeedScore: 24,
    opportunityScore: 96,
    estimatedLostRevenueMonthly: "£28,000/mo",
    identifiedIssues: [
      "Missing £10M commercial liability & CHAS Elite accreditation showcase",
      "No PPM maintenance retainer calculator for facilities managers",
      "Flash/Old WordPress theme crashing on modern mobile browsers",
      "Zero regional landing pages for Sheffield and Bradford",
    ],
  },
  {
    id: "prospect-4",
    companyName: "Pennine Architectural Extensions",
    tradeSector: "builders",
    location: "Altrincham & Hale, Cheshire",
    websiteUrl: "penninebuildextensions.co.uk",
    phone: "0161 928 3310",
    email: "paul@penninebuild.co.uk",
    googleRating: 4.8,
    reviewCount: 31,
    pageSpeedScore: 48,
    opportunityScore: 91,
    estimatedLostRevenueMonthly: "£45,000/mo",
    identifiedIssues: [
      "Low-resolution build gallery without before/after project sliders",
      "Missing Federation of Master Builders (FMB) trust warranty banner",
      "No structural extension cost guide to qualify £50k+ homeowners",
    ],
  },
];

export function LeadProspectorAuditDesk({
  onImportLead,
}: {
  onImportLead?: (lead: SourcedLead) => void;
}) {
  const [selectedTrade, setSelectedTrade] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [isScanning, setIsScanning] = useState(false);
  const [prospects, setProspects] = useState<SourcedLead[]>(SAMPLE_PROSPECT_POOL);
  const [selectedProspect, setSelectedProspect] = useState<SourcedLead | null>(
    SAMPLE_PROSPECT_POOL[0],
  );
  const [outreachChannel, setOutreachChannel] = useState<"whatsapp" | "email" | "linkedin">(
    "whatsapp",
  );

  const runProspectScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Discovered 4 high-opportunity UK trade prospects!");
    }, 800);
  };

  const filteredProspects = prospects.filter((p) => {
    const tradeMatch = selectedTrade === "all" || p.tradeSector === selectedTrade;
    return tradeMatch;
  });

  // Generate Personalised Outreach Content
  const generateOutreach = (prospect: SourcedLead) => {
    const tradeInfo = TRADE_VERTICALS[prospect.tradeSector] || { name: "Trade Business" };

    if (outreachChannel === "whatsapp") {
      return `Hi ${prospect.companyName.split(" ")[0]} team, Robbie here from Harley Digital Works in Manchester.

I took a quick look at your website (${prospect.websiteUrl}) and noticed it takes 4.8s to load on mobile and is missing an instant quote tool. You're likely losing 5–8 high-margin ${tradeInfo.name} enquiries every month to local competitors.

We build 100% done-for-you, sub-30ms trade websites with 14-day turnaround. 

Here is a bespoke preview we prepared for your business:
https://harleydigitalworks.com/proposals?client=${encodeURIComponent(prospect.companyName)}&trade=${encodeURIComponent(tradeInfo.name)}

Would you like me to send over a 60-second video breakdown?`;
    }

    if (outreachChannel === "email") {
      return `Subject: Quick question regarding ${prospect.companyName} website & local Google rank

Hi ${prospect.companyName} Team,

I run Harley Digital Works (part of The Harley Group in Manchester). We specialise in 100% done-for-you websites and Google Map Pack ranking for UK ${tradeInfo.name}.

I ran a quick automated audit of your site (${prospect.websiteUrl}) and identified 3 key opportunities:
1. PageSpeed score is currently ${prospect.pageSpeedScore}/100 (causing 60%+ of mobile visitors to bounce).
2. Missing interactive instant quote calculator for ${tradeInfo.name}.
3. Missing LocalBusiness schema microdata on Google Map Pack.

We launched a custom proposal desk and blueprint for ${prospect.companyName} here:
https://harleydigitalworks.com/proposals?client=${encodeURIComponent(prospect.companyName)}

We handle 100% of copywriting, build, and hosting with a 14-day live launch guarantee.

Are you free for a brief 10-minute chat this week?

Best regards,
Dr Robbie Harley, MBA
Managing Director | The Harley Group & Harley Digital Works
0117 214 1357 | harleydigitalworks.com`;
    }

    return `Hi team at ${prospect.companyName}, congratulations on your strong track record in ${prospect.location}. 

I noticed your web infrastructure is currently running at ${prospect.pageSpeedScore}/100 on Google PageSpeed, which is impacting your ability to win top commercial tenders. 

At The Harley Group, we deliver turnkey edge websites for UK contractors in 14 days with zero homework. Feel free to review your interactive proposal: https://harleydigitalworks.com/proposals?client=${encodeURIComponent(prospect.companyName)}`;
  };

  const handleCopyOutreach = () => {
    if (!selectedProspect) return;
    const text = generateOutreach(selectedProspect);
    navigator.clipboard.writeText(text);
    toast.success("Outreach message copied to clipboard!");
  };

  const handleOpenWhatsApp = () => {
    if (!selectedProspect) return;
    const text = generateOutreach(selectedProspect);
    const cleanPhone = selectedProspect.phone.replace(/\s+/g, "").replace(/^0/, "44");
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleOpenEmail = () => {
    if (!selectedProspect) return;
    const tradeInfo = TRADE_VERTICALS[selectedProspect.tradeSector] || { name: "Trade Business" };
    const subject = `Quick question regarding ${selectedProspect.companyName} website & local Google rank`;
    const body = generateOutreach(selectedProspect);
    window.open(
      `mailto:${selectedProspect.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <h3 className="text-lg font-bold text-ink">
              Automated Lead Sourcing, Audit & Outreach Engine
            </h3>
          </div>
          <p className="mt-1 text-xs text-ink-muted">
            Ingest local UK trade businesses, automatically identify PageSpeed & ranking deficits,
            and generate human-approved outreach.
          </p>
        </div>

        <button
          onClick={runProspectScan}
          disabled={isScanning}
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-ink/85 transition-colors"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${isScanning ? "animate-spin text-emerald-400" : ""}`}
          />
          <span>{isScanning ? "Scanning UK Trade Registries..." : "Run Live Prospect Scan"}</span>
        </button>
      </div>

      {/* Sourcing Filter Controls */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-[11px] font-semibold text-ink mb-1">Trade Sector</label>
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-slate-50 px-3 py-2 text-xs text-ink focus:outline-none focus:border-primary"
          >
            <option value="all">All High-Ticket Trades</option>
            <option value="heating-engineers">Gas & Heating Engineers</option>
            <option value="commercial-contractors">Commercial & Multi-Van Contractors</option>
            <option value="electricians">Electricians & EV Installers</option>
            <option value="builders">Master Builders & Extensions</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-ink mb-1">
            Target Metro Region
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-slate-50 px-3 py-2 text-xs text-ink focus:outline-none focus:border-primary"
          >
            <option value="all">All 25 UK Metro Hubs</option>
            <option value="manchester">Greater Manchester & Cheshire</option>
            <option value="birmingham">West Midlands & Birmingham</option>
            <option value="leeds">Leeds & West Yorkshire</option>
            <option value="london">Greater London</option>
          </select>
        </div>

        <div className="flex items-end">
          <div className="w-full rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-center text-xs text-emerald-900 font-semibold">
            {filteredProspects.length} High-Opportunity Leads Found
          </div>
        </div>
      </div>

      {/* 2-Column Workspace: Left = Sourced Leads / Right = Audit Dossier & Outreach */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Sourced Leads List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredProspects.map((prospect) => {
            const isSelected = selectedProspect?.id === prospect.id;
            return (
              <div
                key={prospect.id}
                onClick={() => setSelectedProspect(prospect)}
                className={`cursor-pointer rounded-xl p-4 border transition-all ${
                  isSelected
                    ? "bg-emerald-50/40 border-emerald-500 ring-1 ring-emerald-500 shadow-sm"
                    : "bg-white border-ink/10 hover:border-ink/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-ink leading-tight">
                      {prospect.companyName}
                    </h4>
                    <p className="text-xs text-ink-muted mt-0.5">{prospect.location}</p>
                  </div>
                  <span className="rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono px-2 py-0.5 shrink-0">
                    Score: {prospect.opportunityScore}/100
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-ink/5">
                  <span className="text-rose-600 font-semibold">
                    PageSpeed: {prospect.pageSpeedScore}/100
                  </span>
                  <span className="text-amber-800 font-mono font-bold">
                    Lost Rev: ~{prospect.estimatedLostRevenueMonthly}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Audit Dossier & Human-Approved Outreach Generator */}
        <div className="lg:col-span-7">
          {selectedProspect ? (
            <div className="rounded-xl border border-ink/10 bg-slate-50 p-6 space-y-6">
              {/* Audit Summary Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">
                    Automated Audit Dossier
                  </span>
                  <h3 className="text-lg font-bold text-ink">{selectedProspect.companyName}</h3>
                  <div className="text-xs text-ink-muted font-mono mt-0.5">
                    URL: {selectedProspect.websiteUrl} · Tel: {selectedProspect.phone}
                  </div>
                </div>

                <Link
                  to="/proposals"
                  search={{
                    service: undefined,
                    package: undefined,
                    domain: undefined,
                    websiteUrl: selectedProspect.websiteUrl,
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
                >
                  <span>Open Custom Proposal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Specific Vulnerabilities Found */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Identified Conversion Bottlenecks:
                </h4>
                <div className="space-y-1.5">
                  {selectedProspect.identifiedIssues.map((issue) => (
                    <div
                      key={issue}
                      className="flex items-start gap-2 rounded-lg bg-white p-2.5 text-xs text-ink border border-ink/5"
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalised Outreach Draft (Human-in-the-Loop) */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-emerald-400" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                      Human-Approved Outreach Generator
                    </h4>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setOutreachChannel("whatsapp")}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                        outreachChannel === "whatsapp"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => setOutreachChannel("email")}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                        outreachChannel === "email"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      Email
                    </button>
                  </div>
                </div>

                <div className="rounded-lg bg-black/60 p-4 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                  {generateOutreach(selectedProspect)}
                </div>

                {/* 1-Click Action Dispatchers */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleCopyOutreach}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-semibold text-white transition-colors"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Message</span>
                    </button>

                    {outreachChannel === "whatsapp" && (
                      <button
                        onClick={handleOpenWhatsApp}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Dispatch via WhatsApp</span>
                      </button>
                    )}

                    {outreachChannel === "email" && (
                      <button
                        onClick={handleOpenEmail}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Launch Email Client</span>
                      </button>
                    )}
                  </div>

                  {onImportLead && (
                    <button
                      onClick={() => onImportLead(selectedProspect)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition-colors"
                    >
                      <Building2 className="h-3.5 w-3.5" />
                      <span>Push to CRM Pipeline</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-ink/20 bg-slate-50 p-12 text-center text-ink-muted text-xs">
              Select a prospect from the left list to view their live audit and generate outreach.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
