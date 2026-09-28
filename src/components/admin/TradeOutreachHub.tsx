import { useState } from "react";
import {
  Send,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  UserPlus,
  Phone,
  MapPin,
  Zap,
  Building,
  Mail,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { dispatchTransactionalEmail } from "@/lib/email-dispatch.functions";

interface Prospect {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  trade: "electrical" | "roofing" | "heating" | "builder" | "cleaning";
  tradeTitle: string;
  city: string;
  region: string;
  recommendedPackage: string;
  estimatedJobValue: string;
  keyCert: string;
}

const PROSPECT_TARGETS: Prospect[] = [
  {
    id: "p1",
    company: "Apex Electrical & Solar Ltd",
    contact: "Mark Taylor",
    phone: "0161 820 4910",
    email: "mark@apexelectricalmcr.co.uk",
    trade: "electrical",
    tradeTitle: "Electrician & EV Installer",
    city: "Manchester",
    region: "Greater Manchester & Cheshire",
    recommendedPackage: "Growth Website (£2,995)",
    estimatedJobValue: "£1,200 (Fuseboards & EV)",
    keyCert: "NICEIC Approved Contractor",
  },
  {
    id: "p2",
    company: "Vanguard Roofing & Property Care",
    contact: "Dave Evans",
    phone: "0121 740 8820",
    email: "dave@vanguardroofingmidlands.co.uk",
    trade: "roofing",
    tradeTitle: "Roofing & GRP Flat Roof Specialist",
    city: "Birmingham",
    region: "West Midlands & Solihull",
    recommendedPackage: "Launch Website (£1,495)",
    estimatedJobValue: "£3,500 (GRP Flat Roofs)",
    keyCert: "CORC Confederation Member",
  },
  {
    id: "p3",
    company: "Harley Heating & Gas Engineers",
    contact: "Gary Thompson",
    phone: "0113 490 1280",
    email: "gary@harleyheatingyorkshire.co.uk",
    trade: "heating",
    tradeTitle: "Gas Safe Boiler Engineer",
    city: "Leeds",
    region: "West Yorkshire & Harrogate",
    recommendedPackage: "Launch Website (£1,495) + £95/mo Care",
    estimatedJobValue: "£2,200 (Boiler Replacements)",
    keyCert: "Gas Safe Registered #648192",
  },
  {
    id: "p4",
    company: "Alderley Bespoke Living",
    contact: "Rob Fletcher",
    phone: "01625 910 240",
    email: "rob@alderleybespokeliving.co.uk",
    trade: "builder",
    tradeTitle: "Luxury Renovations & Extensions",
    city: "Cheshire",
    region: "Wilmslow, Alderley Edge & Knutsford",
    recommendedPackage: "Growth Website (£2,995)",
    estimatedJobValue: "£25,000+ (Extensions & Joinery)",
    keyCert: "Federation of Master Builders",
  },
  {
    id: "p5",
    company: "Capital Commercial Facilities",
    contact: "Sarah Jenkins",
    phone: "020 8191 7840",
    email: "sarah@capitalfacilitiesuk.com",
    trade: "cleaning",
    tradeTitle: "Commercial Cleaning & FM",
    city: "London",
    region: "Central London & City",
    recommendedPackage: "Pro Custom Platform (£4,995)",
    estimatedJobValue: "£850/mo (B2B Recurring)",
    keyCert: "BICSc Certified & SafeContractor",
  },
];

export function TradeOutreachHub() {
  const qc = useQueryClient();
  const [selectedProspect, setSelectedProspect] = useState<Prospect>(PROSPECT_TARGETS[0]);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isPushing, setIsPushing] = useState(false);

  const getDemoUrl = (trade: string) => {
    const slug = trade === "builder" ? "roofing" : trade === "cleaning" ? "electrical" : trade;
    return `https://harleydigitalworks.com/demos?trade=${slug}`;
  };

  const generateWhatsAppScript = (p: Prospect) => {
    const firstName = p.contact.split(" ")[0];
    const demoUrl = getDemoUrl(p.trade);
    return `Hi ${firstName}, came across ${p.company} while looking at top ${p.tradeTitle} contractors around ${p.city}.

We just built an interactive website prototype specifically for UK ${p.tradeTitle} businesses with an instant quote estimator, ${p.keyCert} trust badges, and click-to-WhatsApp dispatch.

You can test the live demo on your phone here:
👉 ${demoUrl}

We build and write the entire website for you in 14 days for a fixed £1,495 (100% Done-For-You, no writing required from you).

Worth a quick 5-min look this week?`;
  };

  const generateEmailScript = (p: Prospect) => {
    const firstName = p.contact.split(" ")[0];
    const demoUrl = getDemoUrl(p.trade);
    return `Subject: New website demo prototype for ${p.company}

Hi ${firstName},

I run Harley Digital Works (part of The Harley Group). We build high-converting, 100% Done-For-You websites for UK trade contractors and small businesses.

We recently put together an interactive mobile demo specifically for ${p.tradeTitle} businesses in ${p.region}. It includes:
• Live job price estimator (homeowners calculate ballpark price & WhatsApp you)
• Before & after job photo sliders
• Verified ${p.keyCert} accreditation badges
• 14-day guaranteed delivery

You can test the interactive prototype directly here:
👉 ${demoUrl}

We handle 100% of the copywriting and setup for a fixed investment of £1,495 + VAT, with managed hosting and monthly updates for £95/mo.

Are you free for a brief 10-minute intro call on Thursday or Friday?

Best regards,

Jack Miller
Lead Web Producer | Harley Digital Works
0161 820 4910 | www.harleydigitalworks.com`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast.success(`Copied ${type} to clipboard!`);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const dispatchEmailFn = useServerFn(dispatchTransactionalEmail);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleSendOutreachEmail = async (p: Prospect) => {
    setIsSendingEmail(true);
    try {
      const emailSubject = `New trade website prototype built for ${p.company}`;
      const emailBody = generateEmailScript(p);

      const res = await dispatchEmailFn({
        data: {
          recipientEmail: p.email,
          recipientName: p.contact,
          companyName: p.company,
          subject: emailSubject,
          templateType: "outreach",
          plainTextBody: emailBody,
          referenceId: p.id,
        },
      });

      if (res.accepted) {
        toast.success(res.message);
      } else {
        toast.info("Opening email client draft with trade demo pitch...");
        window.location.href = res.mailtoUrl;
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to dispatch outreach email");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handlePushToLeads = async (p: Prospect) => {
    setIsPushing(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: p.contact,
        email: p.email,
        company: p.company,
        package: p.recommendedPackage,
        message: `[OUTBOUND TARGET - ${p.city.toUpperCase()}] Trade: ${p.tradeTitle}. Cert: ${p.keyCert}. Estimated Job Value: ${p.estimatedJobValue}. Outbound pitch sent via WhatsApp/Email with live demo.`,
        status: "contacted",
      });

      if (error) throw error;
      toast.success(`Pushed ${p.company} to Leads CRM!`);
      qc.invalidateQueries({ queryKey: ["leads"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to push lead");
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-1">
            <Sparkles size={14} />
            <span>High-Velocity Prospecting Engine</span>
          </div>
          <h2 className="text-xl font-bold text-ink">Trade Outbound Pitch & Campaign Hub</h2>
          <p className="text-xs text-ink-muted mt-0.5">
            1-click customized WhatsApp pitches, cold email templates, and CRM integration for UK
            trades.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePushToLeads(selectedProspect)}
            disabled={isPushing}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2 transition-all shadow-sm disabled:opacity-50"
          >
            <UserPlus size={14} />
            <span>{isPushing ? "Adding…" : "Add to Leads CRM"}</span>
          </button>
        </div>
      </div>

      {/* Target Selector Bar */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
          Select Target Prospect:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {PROSPECT_TARGETS.map((p) => {
            const isSelected = selectedProspect.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProspect(p)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-ink shadow-sm ring-1 ring-primary/40"
                    : "border-ink/10 bg-surface-cream hover:bg-white text-ink-muted hover:text-ink"
                }`}
              >
                <div className="font-bold text-xs text-ink truncate">{p.company}</div>
                <div className="text-[11px] text-ink-muted mt-0.5 flex items-center gap-1">
                  <MapPin size={10} className="shrink-0 text-primary" />
                  <span className="truncate">{p.city}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prospect Summary Sheet */}
      <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-semibold text-ink-muted">
              Director / Contact
            </span>
            <div className="font-bold text-ink mt-0.5">{selectedProspect.contact}</div>
            <div className="text-ink-muted text-[11px]">{selectedProspect.email}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-ink-muted">
              Trade Specialism
            </span>
            <div className="font-bold text-ink mt-0.5">{selectedProspect.tradeTitle}</div>
            <div className="text-primary text-[11px] font-medium">{selectedProspect.keyCert}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-ink-muted">
              Operating Radius
            </span>
            <div className="font-bold text-ink mt-0.5">{selectedProspect.city}</div>
            <div className="text-ink-muted text-[11px]">{selectedProspect.region}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-ink-muted">
              Recommended Offer
            </span>
            <div className="font-bold text-emerald-800 mt-0.5">
              {selectedProspect.recommendedPackage}
            </div>
            <div className="text-ink-muted text-[11px]">
              Avg Win: {selectedProspect.estimatedJobValue}
            </div>
          </div>
        </div>
      </div>

      {/* Script Copy Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Box 1: WhatsApp Quick Pitch */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <Send size={13} className="text-emerald-700" />
                <span>WhatsApp Direct Pitch (Fastest Response)</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopy(generateWhatsAppScript(selectedProspect), "WhatsApp Pitch")
                }
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white border border-emerald-200 px-2.5 py-1 rounded-lg"
              >
                {copiedType === "WhatsApp Pitch" ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedType === "WhatsApp Pitch" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs text-emerald-950 leading-relaxed bg-white/80 p-3.5 rounded-lg border border-emerald-200/60 max-h-60 overflow-y-auto">
              {generateWhatsAppScript(selectedProspect)}
            </pre>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-800 pt-2 border-t border-emerald-200/50">
            <span>Direct Link: {getDemoUrl(selectedProspect.trade)}</span>
            <a
              href={`https://wa.me/44${selectedProspect.phone.replace(/^0+/, "").replace(/\s+/g, "")}?text=${encodeURIComponent(generateWhatsAppScript(selectedProspect))}`}
              target="_blank"
              rel="noreferrer"
              className="font-bold underline hover:text-emerald-950 inline-flex items-center gap-1"
            >
              Open in WhatsApp <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Box 2: Personalized Cold Email */}
        <div className="rounded-xl border border-ink/10 bg-white p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink uppercase tracking-wider">
                <Sparkles size={13} className="text-primary" />
                <span>Personalized Cold Email Sequence</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(generateEmailScript(selectedProspect), "Cold Email")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-primary bg-ink/[0.04] border border-ink/10 px-2.5 py-1 rounded-lg"
              >
                {copiedType === "Cold Email" ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedType === "Cold Email" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs text-ink/90 leading-relaxed bg-ink/[0.02] p-3.5 rounded-lg border border-ink/10 max-h-60 overflow-y-auto">
              {generateEmailScript(selectedProspect)}
            </pre>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-ink-muted pt-2 border-t border-ink/10">
            <span>To: {selectedProspect.email}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSendOutreachEmail(selectedProspect)}
                disabled={isSendingEmail}
                className="font-semibold text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isSendingEmail ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Mail size={12} />
                )}
                <span>{isSendingEmail ? "Sending…" : "Send Pitch Email"}</span>
              </button>
              <a
                href={`mailto:${selectedProspect.email}?subject=${encodeURIComponent(`New website demo prototype for ${selectedProspect.company}`)}&body=${encodeURIComponent(generateEmailScript(selectedProspect))}`}
                className="font-bold text-ink underline hover:text-primary inline-flex items-center gap-1"
              >
                Draft in Mail <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
