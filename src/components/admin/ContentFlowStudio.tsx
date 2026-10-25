import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Send,
  Building2,
  MapPin,
  Wrench,
  FileText,
  MessageSquare,
  ShieldCheck,
  Zap,
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

export function ContentFlowStudio() {
  const [trade, setTrade] = useState("Electrical");
  const [clientName, setClientName] = useState("RG Electrical Bristol Limited");
  const [location, setLocation] = useState("Bradley Stoke, Bristol (BS32)");
  const [jobScope, setJobScope] = useState(EXAMPLE_JOBS[0].scope);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
        `**Asset 1: Google Business Profile Local Update Post**\n\nRecent project completed by our team in ${location}: ${jobScope}. Work was carried out in full compliance with UK regulations, with zero disruption to the household and certified building control documentation issued promptly.\n\nFor professional domestic and commercial services across ${location}, call RG Electrical Bristol today on 0117 900 0000.`,
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
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium"
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
                  Click one of the quick test examples on the left, or type a custom job, then press{" "}
                  <strong>"Generate 4 Marketing Assets"</strong>.
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
                  Compiling local Bristol citations, NICEIC compliance terms, and no-slop formatting
                </p>
              </div>
            </div>
          )}

          {generatedOutput && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Generated Marketing Suite</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    {source === "google_agent_builder"
                      ? "Google Cloud Agent Builder"
                      : "Template Engine"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(generatedOutput, "all")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  {copiedKey === "all" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedKey === "all" ? "Copied All!" : "Copy Full Suite"}</span>
                </button>
              </div>

              {/* Output Content */}
              <div className="font-sans text-xs text-slate-200 whitespace-pre-line leading-relaxed space-y-4 p-4 rounded-xl bg-slate-900 border border-slate-800/80 max-h-[500px] overflow-y-auto">
                {generatedOutput}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
