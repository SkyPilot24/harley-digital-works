import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  MapPin,
  FileText,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  Code2,
} from "lucide-react";

const EXAMPLE_JOBS = [
  {
    title: "Fuseboard Upgrade (Bradley Stoke)",
    trade: "Electrical",
    client: "RG Electrical Bristol Limited",
    location: "Bradley Stoke (BS32)",
    scope:
      "Replaced 1970s rewirable Bakelite fusebox with Hager 10-way metal consumer unit, individual RCBOs and Type 2 Surge Protection. 1 day install, NICEIC Part P certificate issued in 24h. Project value: £650.",
  },
  {
    title: "Victorian House Rewire (Stoke Gifford)",
    trade: "Electrical",
    client: "RG Electrical Bristol Limited",
    location: "Stoke Gifford, Bristol",
    scope:
      "Full first and second fix domestic rewire for 3-bed Victorian home. Created dedicated 32A kitchen ring, separate induction hob circuit, and 4 zoned dimmable LED downlight circuits. Staged around plasterers, zero mess. Value: £4,200.",
  },
  {
    title: "Landlord EICR Inspection (Filton)",
    trade: "Electrical",
    client: "RG Electrical Bristol Limited",
    location: "Filton, North Bristol",
    scope:
      "Urgent periodic inspection for tenancy handover. Rectified C2 bonding observations on site, tested loop impedance, issued digital satisfactory EICR certificate same afternoon. Value: £220.",
  },
];

interface ParsedAssets {
  gbpPost: string;
  caseStudy: string;
  whatsApp: string;
  safetyTip: string;
}

function parseMarketingAssets(raw: string | null): ParsedAssets {
  if (!raw) return { gbpPost: "", caseStudy: "", whatsApp: "", safetyTip: "" };

  const sections = raw
    .split(/(?:###|\*\*)\s*(?:Asset\s*\d+:?|[0-9]\))\s*|(?:\*\*\*)/i)
    .map((s) => s.trim())
    .filter(Boolean);

  let gbpPost = "";
  let caseStudy = "";
  let whatsApp = "";
  let safetyTip = "";

  for (const sec of sections) {
    const lower = sec.toLowerCase();
    if (
      lower.startsWith("google business profile") ||
      lower.includes("gbp") ||
      lower.includes("local update")
    ) {
      gbpPost = sec
        .replace(/^[^\n]+\n+/, "")
        .replace(/\*\*$/g, "")
        .trim();
    } else if (
      lower.startsWith("structured website") ||
      lower.startsWith("website case study") ||
      lower.includes("case study")
    ) {
      caseStudy = sec
        .replace(/^[^\n]+\n+/, "")
        .replace(/\*\*$/g, "")
        .trim();
    } else if (
      lower.startsWith("whatsapp review") ||
      lower.includes("whatsapp") ||
      lower.includes("review request")
    ) {
      whatsApp = sec
        .replace(/^[^\n]+\n+/, "")
        .replace(/\*\*$/g, "")
        .trim();
    } else if (
      lower.startsWith("homeowner safety") ||
      lower.includes("safety") ||
      lower.includes("maintenance")
    ) {
      safetyTip = sec
        .replace(/^[^\n]+\n+/, "")
        .replace(/\*\*$/g, "")
        .trim();
    }
  }

  // Fallback positional assignment
  if (!gbpPost && sections[0]) gbpPost = sections[0].replace(/^[^\n]+\n+/, "").trim();
  if (!caseStudy && sections[1]) caseStudy = sections[1].replace(/^[^\n]+\n+/, "").trim();
  if (!whatsApp && sections[2]) whatsApp = sections[2].replace(/^[^\n]+\n+/, "").trim();
  if (!safetyTip && sections[3]) safetyTip = sections[3].replace(/^[^\n]+\n+/, "").trim();

  return { gbpPost, caseStudy, whatsApp, safetyTip };
}

export function ContentFlowStudio() {
  const [trade, setTrade] = useState("Electrical");
  const [clientName, setClientName] = useState("RG Electrical Bristol Limited");
  const [location, setLocation] = useState("Bradley Stoke, Bristol (BS32)");
  const [jobScope, setJobScope] = useState(EXAMPLE_JOBS[0].scope);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeAssetFilter, setActiveAssetFilter] = useState<
    "all" | "gbp" | "case_study" | "whatsapp" | "safety" | "raw"
  >("all");

  const parsed = parseMarketingAssets(generatedOutput);

  const handleApplyExample = (ex: (typeof EXAMPLE_JOBS)[0]) => {
    setTrade(ex.trade);
    setClientName(ex.client);
    setLocation(ex.location);
    setJobScope(ex.scope);
  };

  const handleGenerate = async () => {
    if (!jobScope.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedOutput(null);

    const fullPrompt = `Client: ${clientName}. Trade: ${trade}. Location: ${location}. Scope: ${jobScope}`;

    try {
      const response = await fetch("/api/chat/content-flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) throw new Error("Generation request failed");

      const data = (await response.json()) as { result: string; source: string };
      setGeneratedOutput(data.result);
      setSource(data.source);
    } catch {
      setGeneratedOutput(
        `### Asset 1: Google Business Profile Post\n\nRecent project completed by our team in ${location}: ${jobScope}. Work was carried out in full compliance with UK regulations, with zero disruption to the household and certified building control documentation issued promptly.\n\nFor professional domestic and commercial services across ${location}, call RG Electrical Bristol today on 0117 900 0000.\n\n### Asset 2: Website Case Study Card\n\n- **The Problem:** Outdated installation failing to meet modern safety requirements and current UK building standards.\n- **Technical Workmanship Solution:** Completed comprehensive upgrade and precision testing according to trade regulations.\n- **Building Control / Industry Certification:** Official safety certification and compliance paperwork issued.\n- **Project Value / Outcome:** Clean, fully certified installation delivered on schedule with complete peace of mind.\n\n### Asset 3: WhatsApp Review Request\n\nHi! Thank you for choosing RG Electrical Bristol for your recent project. We hope you're delighted with the workmanship. If you have 30 seconds, would you mind leaving us a quick Google review here: [Insert Review Link]? It really helps our local family business. Thanks again!\n\n### Asset 4: Homeowner Safety & Maintenance Tip\n\nRegular check-in: We recommend testing your safety switches every six months by pressing the test button to ensure all circuits trip safely in an emergency.`,
      );
      setSource("local_template_engine");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#081B30] to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <Sparkles className="h-3.5 w-3.5" />
              HARLEY LABS · CONTENTFLOW AI ENGINE
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Automated Trade Marketing &amp; Case Study Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Turn rough job notes and photos into 4 ready-to-publish assets: Google Business
              Profile posts, website case studies, and WhatsApp review requests.
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Google Agent Builder Connected
            </span>
          </div>
        </div>
      </div>

      {/* Main Generator Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Job Intake Details</h3>
            <span className="text-xs text-slate-500">Zero homework mode</span>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Quick Test Examples:</label>
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLE_JOBS.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyExample(ex)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium text-left"
                >
                  {ex.title}
                </button>
              ))}
            </div>
          </div>

          {/* Client & Trade */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Client Business</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Trade Discipline</label>
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
              >
                <option value="Electrical">Electrical (BS7671 / NICEIC)</option>
                <option value="Heating & Gas">Heating &amp; Boiler (Gas Safe)</option>
                <option value="Roofing">Roofing &amp; Cladding</option>
                <option value="Commercial FM">Commercial FM / Facilities</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Job Location &amp; Postcode
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bradley Stoke, Bristol (BS32)"
              className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* Job Scope Notes */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Raw Job Scope / What Was Done
            </label>
            <textarea
              rows={4}
              value={jobScope}
              onChange={(e) => setJobScope(e.target.value)}
              placeholder="Type rough bullet points: old fuseboard replaced, Hager metal board, surge protection, 1 day, Part P certified in 24h..."
              className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors leading-relaxed"
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !jobScope.trim()}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.01]"
          >
            {isGenerating ? (
              <>
                <span className="h-3 w-3 rounded-full bg-white animate-ping" />
                <span>Generating Assets via Google Cloud...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate 4 Marketing Assets</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output Showcase */}
        <div className="lg:col-span-7 space-y-4">
          {!generatedOutput && !isGenerating && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-12 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">No Assets Generated Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click one of the quick test examples on the left, or type custom job notes, then
                  press <strong>"Generate 4 Marketing Assets"</strong>.
                </p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-12 text-center text-white space-y-4 shadow-xl">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Sparkles className="h-6 w-6 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">
                  Google Agent Builder Engine Running...
                </h4>
                <p className="text-xs text-slate-400">
                  Formatting 4 production assets: Google Business Profile, Case Study Card, WhatsApp
                  Review, &amp; Safety Tip
                </p>
              </div>
            </div>
          )}

          {generatedOutput && (
            <div className="space-y-4">
              {/* Top Control Bar */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-900">4 Assets Ready</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {source === "google_agent_builder" ? "Google Cloud Agent Builder" : "Template"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 self-stretch sm:self-auto justify-between sm:justify-end">
                  {/* Filter Pills */}
                  <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setActiveAssetFilter("all")}
                      className={`px-2 py-1 rounded-md font-medium transition-colors ${
                        activeAssetFilter === "all"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      All 4 Assets
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAssetFilter("gbp")}
                      className={`px-2 py-1 rounded-md font-medium transition-colors ${
                        activeAssetFilter === "gbp"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Google Maps
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAssetFilter("case_study")}
                      className={`px-2 py-1 rounded-md font-medium transition-colors ${
                        activeAssetFilter === "case_study"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Case Study
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAssetFilter("whatsapp")}
                      className={`px-2 py-1 rounded-md font-medium transition-colors ${
                        activeAssetFilter === "whatsapp"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAssetFilter("safety")}
                      className={`px-2 py-1 rounded-md font-medium transition-colors ${
                        activeAssetFilter === "safety"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Safety Tip
                    </button>
                  </div>

                  {/* Copy All Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(generatedOutput, "all")}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors shrink-0"
                  >
                    {copiedKey === "all" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedKey === "all" ? "Copied All!" : "Copy Full Suite"}</span>
                  </button>
                </div>
              </div>

              {/* ASSET CARDS CONTAINER */}
              <div className="space-y-4">
                {/* 1. GOOGLE BUSINESS PROFILE CARD */}
                {(activeAssetFilter === "all" || activeAssetFilter === "gbp") && parsed.gbpPost && (
                  <div className="rounded-2xl border border-sky-200 bg-white p-5 shadow-sm space-y-3 transition-all hover:border-sky-300">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              Asset 1: Google Business Profile Post
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold">
                              Google Maps Local SEO
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Paste into Google Business Manager to boost top-3 map ranking
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(parsed.gbpPost, "gbp")}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold transition-colors shrink-0"
                      >
                        {copiedKey === "gbp" ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>{copiedKey === "gbp" ? "Copied!" : "Copy Post"}</span>
                      </button>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                      {parsed.gbpPost}
                    </div>
                  </div>
                )}

                {/* 2. STRUCTURED WEBSITE CASE STUDY CARD */}
                {(activeAssetFilter === "all" || activeAssetFilter === "case_study") &&
                  parsed.caseStudy && (
                    <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm space-y-3 transition-all hover:border-indigo-300">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                Asset 2: Website Case Study Card
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">
                                Website Proof
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              Problem → Technical Solution → Certification → Customer Outcome
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(parsed.caseStudy, "case_study")}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors shrink-0"
                        >
                          {copiedKey === "case_study" ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>{copiedKey === "case_study" ? "Copied!" : "Copy Case Study"}</span>
                        </button>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                        {parsed.caseStudy}
                      </div>
                    </div>
                  )}

                {/* 3. WHATSAPP 5-STAR REVIEW REQUEST */}
                {(activeAssetFilter === "all" || activeAssetFilter === "whatsapp") &&
                  parsed.whatsApp && (
                    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm space-y-3 transition-all hover:border-emerald-300">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                Asset 3: WhatsApp Review Request
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                                5-Star Collector
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              Send directly to the homeowner to collect Google reviews effortlessly
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(parsed.whatsApp, "whatsapp")}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors shrink-0"
                        >
                          {copiedKey === "whatsapp" ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>{copiedKey === "whatsapp" ? "Copied!" : "Copy WhatsApp"}</span>
                        </button>
                      </div>

                      {/* WhatsApp Speech Bubble Aesthetic */}
                      <div className="rounded-2xl bg-emerald-50/60 p-4 border border-emerald-100/80 text-xs text-slate-800 leading-relaxed relative">
                        <div className="inline-block px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider mb-2">
                          WhatsApp Message Preview
                        </div>
                        <div className="whitespace-pre-line">{parsed.whatsApp}</div>
                      </div>
                    </div>
                  )}

                {/* 4. HOMEOWNER SAFETY & MAINTENANCE TIP */}
                {(activeAssetFilter === "all" || activeAssetFilter === "safety") &&
                  parsed.safetyTip && (
                    <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm space-y-3 transition-all hover:border-amber-300">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                Asset 4: Homeowner Safety &amp; Care Advice
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">
                                Authority Advice
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              Positions your client as a trusted compliance authority
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(parsed.safetyTip, "safety")}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-semibold transition-colors shrink-0"
                        >
                          {copiedKey === "safety" ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>{copiedKey === "safety" ? "Copied!" : "Copy Advice"}</span>
                        </button>
                      </div>

                      <div className="rounded-xl bg-amber-50/50 p-4 border border-amber-100 text-xs text-amber-950 leading-relaxed whitespace-pre-line">
                        {parsed.safetyTip}
                      </div>
                    </div>
                  )}

                {/* RAW TEXT VIEW (Optional) */}
                {activeAssetFilter === "raw" && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white space-y-3 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono text-slate-400">Raw Markdown Output</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(generatedOutput, "raw")}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        {copiedKey === "raw" ? "Copied!" : "Copy Raw"}
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap overflow-x-auto">
                      {generatedOutput}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
