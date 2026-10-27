import { useState } from "react";
import {
  Send,
  Mail,
  MessageSquare,
  Phone,
  Copy,
  Check,
  Sparkles,
  Download,
  Calendar,
  ExternalLink,
  Flame,
  ShieldCheck,
  Clock,
  Layers,
  Zap,
  Users,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { TRADE_VERTICALS } from "@/lib/trade-data";

interface OutreachProspect {
  companyName: string;
  contactName: string;
  tradeSector: string;
  city: string;
  phone: string;
  email: string;
  websiteUrl: string;
  estimatedLostRevenue: string;
  competitorName: string;
}

const DEFAULT_PROSPECT: OutreachProspect = {
  companyName: "Cheshire Heat & Boiler Co Ltd",
  contactName: "Dave",
  tradeSector: "Heating & Gas Safe Engineers",
  city: "Stockport, Greater Manchester",
  phone: "07700 900281",
  email: "dave@cheshireheat.co.uk",
  websiteUrl: "https://cheshireheat.co.uk",
  estimatedLostRevenue: "£4,200/mo",
  competitorName: "Stockport Boiler Pros Ltd",
};

interface SequenceStep {
  stepNumber: number;
  dayDelay: string;
  title: string;
  objective: string;
  emailSubject: string;
  emailBody: string;
  whatsappBody: string;
  smsBody: string;
}

const DEFAULT_STEPS: SequenceStep[] = [
  {
    stepNumber: 1,
    dayDelay: "Day 1 (Instant)",
    title: "The 60-Second Live Staging Demo Teaser",
    objective:
      "Establish immediate trust by showing working software built specifically for their company before asking for a penny.",
    emailSubject: "Quick question regarding {{companyName}} in {{city}}",
    emailBody: `Hi {{contactName}},

I came across {{companyName}} while researching top {{tradeSector}} across {{city}}.

Most contractor websites we audit are leaking an estimated {{lostRevenueMonthly}} in high-ticket installation enquiries because they lack instant fixed-price quote calculators and mobile click-to-call.

Rather than sending a generic sales deck, our engineering team put together a live interactive staging concept tailored for {{companyName}}:
{{stagingUrl}}

It includes an instant boiler replacement calculator, 1-tap WhatsApp dispatch, and Gas Safe trust accreditation badges.

We operate on a strict 14-day live launch guarantee with 100% of the copywriting done for you (zero homework on your evenings).

Would you be open to a 5-minute phone chat this Thursday afternoon to see if this makes sense for your business?

Best regards,

Robbie Harley
Founder
Harley Digital Works (part of The Harley Group)
Direct WhatsApp: 07700 900500`,
    whatsappBody: `Hi {{contactName}}, Robbie Harley here from Harley Digital Works. We build managed websites for UK {{tradeSector}}.

I put together an interactive staging concept specifically for {{companyName}} in {{city}}:
{{stagingUrl}}

Includes an instant quote estimator and WhatsApp enquiry routing. Worth a quick 3-minute look on your phone?`,
    smsBody: `Hi {{contactName}}, put together a live website concept for {{companyName}} with an instant quote calculator: {{stagingUrl}} - Quick call this week? - Robbie Harley (Harley Digital Works)`,
  },
  {
    stepNumber: 2,
    dayDelay: "Day 3 (+48 Hours)",
    title: "Local Search Visibility Benchmark",
    objective:
      "Provide concrete local search data showing where local competitors are capturing search traffic in their area.",
    emailSubject: "Local search audit for {{companyName}}",
    emailBody: `Hi {{contactName}},

Following up on the live staging demo I sent over for {{companyName}} on Tuesday.

Here is the interactive demo again for your review:
{{stagingUrl}}

Are you free for 5 minutes tomorrow at 10:30am or 2:00pm?

Best,

Robbie Harley
Harley Digital Works`,
    whatsappBody: `Morning {{contactName}}, following up on the website staging demo I created for {{companyName}}: {{stagingUrl}} Have 5 mins today?`,
    smsBody: `Hi {{contactName}}, website concept for {{companyName}} in {{city}} is ready: {{stagingUrl}} - Robbie`,
  },
  {
    stepNumber: 3,
    dayDelay: "Day 7 (+4 Days)",
    title: "Final Follow-up",
    objective: "Final check on their staging demo before archiving.",
    emailSubject: "Closing your staging demo for {{companyName}}",
    emailBody: `Hi {{contactName}},

I know how busy you are on site managing jobs across {{city}}, so I will keep this brief.

We cap our onboarding to 2 active builds at a time to ensure focused delivery.

If you are looking to upgrade {{companyName}}'s web presence with fixed £1,495 setup and £249/mo managed care, we can discuss locking your build slot with a 50% deposit:
{{stagingUrl}}

If the timing isn't right, no problem at all — I'll archive the staging demo by Friday.

Wishing you continued success on the tools,

Robbie Harley
Harley Digital Works
https://harleydigitalworks.com`,
    whatsappBody: `Hi {{contactName}}, archiving our {{city}} build slots for this month on Friday. If you want to review the concept for {{companyName}}, let me know today: {{stagingUrl}} - Robbie`,
    smsBody: `Final check {{contactName}} - archiving your {{companyName}} staging concept this Friday: {{stagingUrl}} - Robbie Harley`,
  },
];

export function OutreachSequenceEngine() {
  const [prospect, setProspect] = useState<OutreachProspect>(DEFAULT_PROSPECT);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [activeChannel, setActiveChannel] = useState<"email" | "whatsapp" | "sms">("email");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const stagingUrl = `https://harleydigitalworks.com/demos?company=${encodeURIComponent(
    prospect.companyName,
  )}&trade=${encodeURIComponent(
    prospect.tradeSector.toLowerCase().includes("heat") ? "heating" : "electrical",
  )}&city=${encodeURIComponent(prospect.city.split(",")[0])}`;

  const replaceTokens = (text: string) => {
    return text
      .replace(/\{\{companyName\}\}/g, prospect.companyName)
      .replace(/\{\{contactName\}\}/g, prospect.contactName)
      .replace(/\{\{tradeSector\}\}/g, prospect.tradeSector)
      .replace(/\{\{city\}\}/g, prospect.city)
      .replace(/\{\{stagingUrl\}\}/g, stagingUrl)
      .replace(/\{\{lostRevenueMonthly\}\}/g, prospect.estimatedLostRevenue)
      .replace(/\{\{competitorName\}\}/g, prospect.competitorName);
  };

  const activeStep = DEFAULT_STEPS[activeStepIdx];
  const renderedSubject = replaceTokens(activeStep.emailSubject);
  const renderedEmail = replaceTokens(activeStep.emailBody);
  const renderedWhatsApp = replaceTokens(activeStep.whatsappBody);
  const renderedSms = replaceTokens(activeStep.smsBody);

  const handleCopy = (content: string, fieldKey: string) => {
    navigator.clipboard.writeText(content);
    setCopiedField(fieldKey);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = [
      "Step",
      "Day",
      "Channel",
      "Prospect_Company",
      "Contact_Name",
      "Email",
      "Phone",
      "Subject",
      "Body_Content",
    ];

    const rows: string[][] = [];

    DEFAULT_STEPS.forEach((step) => {
      rows.push([
        `Step ${step.stepNumber}`,
        step.dayDelay,
        "Email",
        `"${prospect.companyName}"`,
        `"${prospect.contactName}"`,
        prospect.email,
        prospect.phone,
        `"${replaceTokens(step.emailSubject).replace(/"/g, '""')}"`,
        `"${replaceTokens(step.emailBody).replace(/"/g, '""')}"`,
      ]);
      rows.push([
        `Step ${step.stepNumber}`,
        step.dayDelay,
        "WhatsApp",
        `"${prospect.companyName}"`,
        `"${prospect.contactName}"`,
        prospect.email,
        prospect.phone,
        `"WhatsApp Message"`,
        `"${replaceTokens(step.whatsappBody).replace(/"/g, '""')}"`,
      ]);
      rows.push([
        `Step ${step.stepNumber}`,
        step.dayDelay,
        "SMS",
        `"${prospect.companyName}"`,
        `"${prospect.contactName}"`,
        prospect.email,
        prospect.phone,
        `"SMS Text"`,
        `"${replaceTokens(step.smsBody).replace(/"/g, '""')}"`,
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Outreach-Sequence-${prospect.companyName.replace(/[^a-z0-9]/gi, "-")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Outreach sequence exported to CSV for Instantly / Smartlead / CRM import!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
              <Send className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-ink">
                  Automated Multi-Channel Outreach OS
                </h3>
                <span className="rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5">
                  COLD EMAIL · WHATSAPP · SMS
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Conversion-engineered 3-step sequences for UK trade contractors with dynamic staging
                demo formulation and competitor gap benchmarks.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/90 transition-colors shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Sequence to CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prospect Parameters Matrix */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>Target Trade Prospect Parameters</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Token Replacement Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase mb-1">
              Company Name ({"{{companyName}}"}):
            </label>
            <input
              type="text"
              value={prospect.companyName}
              onChange={(e) => setProspect({ ...prospect, companyName: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-xs text-ink focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase mb-1">
              Contact First Name ({"{{contactName}}"}):
            </label>
            <input
              type="text"
              value={prospect.contactName}
              onChange={(e) => setProspect({ ...prospect, contactName: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-xs text-ink focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase mb-1">
              Trade Sector ({"{{tradeSector}}"}):
            </label>
            <input
              type="text"
              value={prospect.tradeSector}
              onChange={(e) => setProspect({ ...prospect, tradeSector: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-xs text-ink focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase mb-1">
              City / County ({"{{city}}"}):
            </label>
            <input
              type="text"
              value={prospect.city}
              onChange={(e) => setProspect({ ...prospect, city: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-xs text-ink focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase mb-1">
              Est. Monthly Lost Rev ({"{{lostRevenueMonthly}}"}):
            </label>
            <input
              type="text"
              value={prospect.estimatedLostRevenue}
              onChange={(e) => setProspect({ ...prospect, estimatedLostRevenue: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-xs text-ink focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase mb-1">
              Local Competitor ({"{{competitorName}}"}):
            </label>
            <input
              type="text"
              value={prospect.competitorName}
              onChange={(e) => setProspect({ ...prospect, competitorName: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-xs text-ink focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase mb-1">
              Phone / WhatsApp Number:
            </label>
            <input
              type="text"
              value={prospect.phone}
              onChange={(e) => setProspect({ ...prospect, phone: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-xs text-ink focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase mb-1">
              Contact Email:
            </label>
            <input
              type="email"
              value={prospect.email}
              onChange={(e) => setProspect({ ...prospect, email: e.target.value })}
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-xs text-ink focus:border-purple-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Live Formulated Demo Link */}
        <div className="rounded-xl bg-slate-50 p-3 border border-ink/10 flex items-center justify-between text-xs font-mono">
          <span className="text-ink-muted truncate mr-2">
            Target Staging URL: <span className="text-purple-700">{stagingUrl}</span>
          </span>
          <a
            href={stagingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-bold text-purple-700 hover:text-purple-900 shrink-0"
          >
            <span>Test Demo</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* 3-Step Sequence Navigation & Channel Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted px-1">
            Outreach Sequence Flow (7-Day Rhythm)
          </div>

          {DEFAULT_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIdx(idx)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${
                activeStepIdx === idx
                  ? "bg-purple-50/80 border-purple-300 shadow-xs"
                  : "bg-white border-ink/10 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-purple-100 text-purple-800 text-[10px] font-mono font-bold px-2 py-0.5">
                  {step.dayDelay}
                </span>
                <span className="text-xs font-mono font-bold text-ink">Step {step.stepNumber}</span>
              </div>
              <h4 className="mt-2 text-xs font-bold text-ink">{step.title}</h4>
              <p className="mt-1 text-[11px] text-ink-muted leading-relaxed line-clamp-2">
                {step.objective}
              </p>
            </button>
          ))}

          <div className="rounded-2xl border border-ink/10 bg-white p-4 text-xs text-ink-muted space-y-2">
            <div className="font-bold text-ink flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Conversion Principles Enforced</span>
            </div>
            <ul className="space-y-1 text-[11px]">
              <li>✓ Staging demo provided upfront with zero pitch deck</li>
              <li>✓ Local competitor proximity search gaps audited</li>
              <li>✓ 14-day delivery SLA with 100% done-for-you copy</li>
              <li>✓ Clear WhatsApp & 1-tap phone CTA on every step</li>
            </ul>
          </div>
        </div>

        {/* Message Preview & Action Console */}
        <div className="lg:col-span-8 rounded-2xl border border-ink/10 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            {/* Channel Tabs */}
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveChannel("email")}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeChannel === "email"
                      ? "bg-ink text-white"
                      : "bg-slate-100 text-ink-muted hover:bg-slate-200"
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Cold Email</span>
                </button>

                <button
                  onClick={() => setActiveChannel("whatsapp")}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeChannel === "whatsapp"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-ink-muted hover:bg-slate-200"
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp Message</span>
                </button>

                <button
                  onClick={() => setActiveChannel("sms")}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeChannel === "sms"
                      ? "bg-amber-600 text-white"
                      : "bg-slate-100 text-ink-muted hover:bg-slate-200"
                  }`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>SMS Follow-Up</span>
                </button>
              </div>

              <span className="text-xs font-mono font-bold text-ink-muted">
                Step {activeStep.stepNumber} of 3
              </span>
            </div>

            {/* Email View */}
            {activeChannel === "email" && (
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-slate-50 p-3 border border-ink/10 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-semibold text-ink-muted uppercase mr-2">Subject:</span>
                    <span className="font-bold text-ink">{renderedSubject}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(renderedSubject, "subject")}
                    className="text-xs text-purple-700 hover:text-purple-900 font-semibold inline-flex items-center gap-1"
                  >
                    {copiedField === "subject" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedField === "subject" ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="relative">
                  <pre className="w-full whitespace-pre-wrap font-sans text-xs text-ink leading-relaxed bg-white p-4 rounded-xl border border-ink/15 max-h-[340px] overflow-y-auto">
                    {renderedEmail}
                  </pre>
                  <button
                    onClick={() => handleCopy(renderedEmail, "emailBody")}
                    className="absolute top-3 right-3 rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-semibold text-ink inline-flex items-center gap-1 border border-ink/10"
                  >
                    {copiedField === "emailBody" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedField === "emailBody" ? "Copied Body" : "Copy Body"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* WhatsApp View */}
            {activeChannel === "whatsapp" && (
              <div className="mt-4 space-y-3">
                <div className="relative">
                  <pre className="w-full whitespace-pre-wrap font-sans text-xs text-ink leading-relaxed bg-emerald-50/40 p-4 rounded-xl border border-emerald-200 max-h-[340px] overflow-y-auto">
                    {renderedWhatsApp}
                  </pre>
                  <button
                    onClick={() => handleCopy(renderedWhatsApp, "whatsappBody")}
                    className="absolute top-3 right-3 rounded-lg bg-white hover:bg-slate-100 px-2.5 py-1 text-xs font-semibold text-ink inline-flex items-center gap-1 border border-emerald-300"
                  >
                    {copiedField === "whatsappBody" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedField === "whatsappBody" ? "Copied" : "Copy WhatsApp"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* SMS View */}
            {activeChannel === "sms" && (
              <div className="mt-4 space-y-3">
                <div className="relative">
                  <pre className="w-full whitespace-pre-wrap font-sans text-xs text-ink leading-relaxed bg-amber-50/40 p-4 rounded-xl border border-amber-200 max-h-[340px] overflow-y-auto">
                    {renderedSms}
                  </pre>
                  <button
                    onClick={() => handleCopy(renderedSms, "smsBody")}
                    className="absolute top-3 right-3 rounded-lg bg-white hover:bg-slate-100 px-2.5 py-1 text-xs font-semibold text-ink inline-flex items-center gap-1 border border-amber-300"
                  >
                    {copiedField === "smsBody" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedField === "smsBody" ? "Copied" : "Copy SMS"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Dispatch Triggers */}
          <div className="pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${prospect.email}?subject=${encodeURIComponent(renderedSubject)}&body=${encodeURIComponent(renderedEmail)}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-bold text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Open in Email Client</span>
              </a>

              <a
                href={`https://wa.me/44${prospect.phone.replace(/^0+/, "").replace(/\s+/g, "")}?text=${encodeURIComponent(renderedWhatsApp)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Send via WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                handleCopy(
                  activeChannel === "email"
                    ? `Subject: ${renderedSubject}\n\n${renderedEmail}`
                    : activeChannel === "whatsapp"
                      ? renderedWhatsApp
                      : renderedSms,
                  "allActive",
                );
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Full Step</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
