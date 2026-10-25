import { useState } from "react";
import {
  Search,
  Sparkles,
  Zap,
  Globe,
  Building2,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Send,
  MessageSquare,
  Copy,
  ExternalLink,
  Check,
  ShieldCheck,
  Gauge,
  Video,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

export interface ProspectAuditData {
  audit: {
    url: string;
    businessName: string;
    trade: string;
    location: string;
    phone: string;
    overallScore: number;
    speedScore: number;
    trustScore: number;
    leadCaptureScore: number;
    localSeoScore: number;
    estimatedLostRevenueMonthly: string;
    defects: string[];
  };
  pitches: {
    whatsApp: string;
    emailSubject: string;
    emailBody: string;
    videoScript: string;
  };
  demoUrl: string;
  source: string;
}

const PRESET_PROSPECTS = [
  {
    companyName: "RG Electrical Bristol Limited",
    websiteUrl: "rg-electrical.com",
    trade: "Electrical",
    location: "Bristol (BS32 / South West)",
    phone: "01454 612 000",
  },
  {
    companyName: "Bath-Electrical Ltd",
    websiteUrl: "bath-electrical.co.uk",
    trade: "Electrical",
    location: "Bath (BA1 / Somerset)",
    phone: "01225 436 123",
  },
  {
    companyName: "Nextgen Electrical Contractors Ltd",
    websiteUrl: "nextgenelec.co.uk",
    trade: "Electrical",
    location: "Warmley, Bristol (BS30)",
    phone: "0117 960 4567",
  },
  {
    companyName: "Apex Electrical Bristol",
    websiteUrl: "apexelectrical-bristol.co.uk",
    trade: "Electrical",
    location: "Bristol (BS16)",
    phone: "0117 900 1234",
  },
];

export function ProspectAuditorDesk({
  onImportLead,
}: {
  onImportLead?: (data: {
    name: string;
    company: string;
    email: string;
    phone: string;
    notes: string;
  }) => void;
}) {
  const [websiteUrl, setWebsiteUrl] = useState(PRESET_PROSPECTS[0].websiteUrl);
  const [businessName, setBusinessName] = useState(PRESET_PROSPECTS[0].companyName);
  const [trade, setTrade] = useState(PRESET_PROSPECTS[0].trade);
  const [location, setLocation] = useState(PRESET_PROSPECTS[0].location);
  const [phone, setPhone] = useState(PRESET_PROSPECTS[0].phone);

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<ProspectAuditData | null>(null);
  const [activeTab, setActiveTab] = useState<"whatsapp" | "email" | "video" | "all">("whatsapp");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleApplyPreset = (preset: (typeof PRESET_PROSPECTS)[0]) => {
    setWebsiteUrl(preset.websiteUrl);
    setBusinessName(preset.companyName);
    setTrade(preset.trade);
    setLocation(preset.location);
    setPhone(preset.phone);
  };

  const handleRunAudit = async () => {
    if (!websiteUrl.trim() || isAuditing) return;

    setIsAuditing(true);
    setAuditResult(null);

    try {
      const response = await fetch("/api/audit/prospect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteUrl,
          businessName,
          trade,
          location,
          phone,
        }),
      });

      if (!response.ok) throw new Error("Audit generation failed");

      const data = (await response.json()) as ProspectAuditData;
      setAuditResult(data);
      toast.success(`Audit completed for ${data.audit.businessName}`);
    } catch {
      toast.error("Audit request failed. Please check your network connection.");
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleImport = () => {
    if (!auditResult || !onImportLead) return;
    onImportLead({
      name: auditResult.audit.businessName,
      company: auditResult.audit.businessName,
      email: `contact@${auditResult.audit.url.replace(/^www\./, "")}`,
      phone: auditResult.audit.phone,
      notes: `Audited site: ${auditResult.audit.url}\nHealth Score: ${auditResult.audit.overallScore}/100\nEst. Lost Revenue: ${auditResult.audit.estimatedLostRevenueMonthly}\nTop Defects:\n- ${auditResult.audit.defects.join("\n- ")}`,
    });
    toast.success("Lead imported to pipeline!");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-[#081B30] to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
              <Sparkles className="h-3.5 w-3.5" />
              STAGE 3 · PROSPECT AUDITOR &amp; SALES ENGINE
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Instant Prospect Website &amp; Domain Auditor
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Audit any contractor's existing website in 5 seconds. Identify their 3 biggest revenue
              leaks and generate personalised 1-click WhatsApp, email, and video outreach pitches.
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Google Agent Builder Connected
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form & Presets */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Target Prospect Details</h3>
            <span className="text-xs text-slate-500">Sniper Mode</span>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Test Candidate Presets:</label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_PROSPECTS.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium text-left"
                >
                  {preset.companyName}
                </button>
              ))}
            </div>
          </div>

          {/* Domain / Website URL */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Contractor Website / Domain
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="e.g. apexelectrical-bristol.co.uk"
                className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-600 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Business Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">Trading / Business Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Apex Electrical Bristol Limited"
                className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-600 transition-colors"
              />
            </div>
          </div>

          {/* Trade & City */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Trade Vertical</label>
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-600 transition-colors"
              >
                <option value="Electrical">Electrical (Domestic &amp; Comm)</option>
                <option value="Heating & Gas">Heating &amp; Gas Safe</option>
                <option value="Roofing">Roofing &amp; Cladding</option>
                <option value="Commercial FM">Commercial Facilities</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Target Location / City</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bristol (BS16)"
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-600 transition-colors"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">WhatsApp / Contact Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0117 900 1234"
                className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-600 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Run Audit Button */}
          <button
            type="button"
            onClick={handleRunAudit}
            disabled={isAuditing || !websiteUrl.trim()}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-sky-950/20 transition-all hover:scale-[1.01]"
          >
            {isAuditing ? (
              <>
                <span className="h-3 w-3 rounded-full bg-white animate-ping" />
                <span>Auditing Domain via Google Agent Builder...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Audit Website &amp; Generate Custom Pitch</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output Showcase */}
        <div className="lg:col-span-7 space-y-4">
          {!auditResult && !isAuditing && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-12 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                <Search className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">No Domain Audited Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click a test candidate on the left or enter any contractor's URL, then click{" "}
                  <strong>"Audit Website &amp; Generate Custom Pitch"</strong>.
                </p>
              </div>
            </div>
          )}

          {isAuditing && (
            <div className="rounded-2xl border border-sky-500/30 bg-slate-900 p-12 text-center text-white space-y-4 shadow-xl">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Sparkles className="h-6 w-6 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">
                  Google Agent Builder Diagnostic Running...
                </h4>
                <p className="text-xs text-slate-400">
                  Testing mobile speed, accreditation visibility, instant quote leaks, and drafting
                  3 custom pitches
                </p>
              </div>
            </div>
          )}

          {auditResult && (
            <div className="space-y-4">
              {/* Scorecard Box */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">
                        {auditResult.audit.businessName}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {auditResult.audit.url}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {auditResult.audit.trade} · {auditResult.audit.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-black text-rose-600">
                        {auditResult.audit.overallScore}/100
                      </div>
                      <span className="text-[10px] font-semibold text-rose-700 uppercase tracking-wider">
                        High Opportunity
                      </span>
                    </div>
                    <div className="text-right border-l border-slate-200 pl-3">
                      <div className="text-sm font-bold text-amber-600">
                        {auditResult.audit.estimatedLostRevenueMonthly}
                      </div>
                      <span className="text-[10px] text-slate-500">Est. Lost Enquiries</span>
                    </div>
                  </div>
                </div>

                {/* 4 Health Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">
                      Mobile Speed
                    </span>
                    <div className="text-sm font-bold text-rose-600 mt-0.5">
                      {auditResult.audit.speedScore}/100
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">
                      Trust &amp; Badges
                    </span>
                    <div className="text-sm font-bold text-amber-600 mt-0.5">
                      {auditResult.audit.trustScore}/100
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">
                      24/7 Quote Tool
                    </span>
                    <div className="text-sm font-bold text-rose-600 mt-0.5">
                      {auditResult.audit.leadCaptureScore}/100
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">
                      Local SEO
                    </span>
                    <div className="text-sm font-bold text-amber-600 mt-0.5">
                      {auditResult.audit.localSeoScore}/100
                    </div>
                  </div>
                </div>

                {/* Conversion Leaks List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-slate-800">Top 3 Conversion Leaks:</span>
                  <div className="space-y-1">
                    {auditResult.audit.defects.slice(0, 3).map((defect, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-rose-900 bg-rose-50/70 p-2 rounded-lg border border-rose-100"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>{defect}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outreach Pitches Controls */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-900">
                    Personalised Outbound Pitches
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setActiveTab("whatsapp")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === "whatsapp"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    1-Click WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("email")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === "email"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Cold Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("video")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === "video"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    60s Video Script
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === "all"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All 3
                  </button>
                </div>
              </div>

              {/* PITCH CARDS */}
              <div className="space-y-4">
                {/* 1. WHATSAPP PITCH */}
                {(activeTab === "whatsapp" || activeTab === "all") && (
                  <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900">
                            1-Click WhatsApp Pitch
                          </span>
                          <p className="text-[11px] text-slate-500">
                            Contractor-to-contractor tone referencing their exact website leaks
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopy(auditResult.pitches.whatsApp, "whatsapp")}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
                        >
                          {copiedKey === "whatsapp" ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>{copiedKey === "whatsapp" ? "Copied!" : "Copy WhatsApp"}</span>
                        </button>
                        <a
                          href={`https://wa.me/${auditResult.audit.phone.replace(/\s+/g, "").replace(/^0/, "44")}?text=${encodeURIComponent(auditResult.pitches.whatsApp)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors"
                        >
                          <Send className="h-3 w-3" />
                          <span>Open in WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-emerald-50/60 p-4 border border-emerald-100/80 text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                      {auditResult.pitches.whatsApp}
                    </div>
                  </div>
                )}

                {/* 2. COLD EMAIL */}
                {(activeTab === "email" || activeTab === "all") && (
                  <div className="rounded-2xl border border-sky-200 bg-white p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900">
                            Cold Email Outreach
                          </span>
                          <p className="text-[11px] text-slate-500">
                            Zero homework framing with interactive prototype link
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              `Subject: ${auditResult.pitches.emailSubject}\n\n${auditResult.pitches.emailBody}`,
                              "email",
                            )
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold transition-colors"
                        >
                          {copiedKey === "email" ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>{copiedKey === "email" ? "Copied!" : "Copy Email"}</span>
                        </button>
                        <a
                          href={`mailto:info@${auditResult.audit.url.replace(/^www\./, "")}?subject=${encodeURIComponent(auditResult.pitches.emailSubject)}&body=${encodeURIComponent(auditResult.pitches.emailBody)}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors"
                        >
                          <Send className="h-3 w-3" />
                          <span>Open in Mail</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-700">
                      <div className="font-semibold text-slate-900 border-b border-slate-200 pb-1.5">
                        Subject: {auditResult.pitches.emailSubject}
                      </div>
                      <div className="whitespace-pre-line leading-relaxed">
                        {auditResult.pitches.emailBody}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. 60-SECOND VIDEO SCRIPT */}
                {(activeTab === "video" || activeTab === "all") && (
                  <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                          <Video className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900">
                            60-Second Video Audit Script (Loom)
                          </span>
                          <p className="text-[11px] text-slate-500">
                            Speak these 3 bullet points aloud while scrolling their website on Loom
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(auditResult.pitches.videoScript, "video")}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors"
                      >
                        {copiedKey === "video" ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>{copiedKey === "video" ? "Copied!" : "Copy Script"}</span>
                      </button>
                    </div>

                    <div className="rounded-xl bg-indigo-50/50 p-4 border border-indigo-100 text-xs text-indigo-950 leading-relaxed whitespace-pre-line">
                      {auditResult.pitches.videoScript}
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION FOOTER */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Ready to follow up? Save this prospect to your CRM or test the prototype demo.
                </div>
                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <a
                    href={auditResult.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Preview Demo Site</span>
                  </a>
                  {onImportLead && (
                    <button
                      type="button"
                      onClick={handleImport}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Import to Leads Pipeline</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
