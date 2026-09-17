import { useState, useMemo } from "react";
import { X, Printer, Copy, Check, FileText, Send, Sparkles, ShieldCheck, Mail, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { dispatchTransactionalEmail } from "@/lib/email-dispatch.functions";
import type { Database } from "@/integrations/supabase/types";

type LeadRow = Database["public"]["Tables"]["leads"]["Row"];

interface LeadProposalModalProps {
  lead: LeadRow;
  onClose: () => void;
}

export function LeadProposalModal({ lead, onClose }: LeadProposalModalProps) {
  const dispatchEmailFn = useServerFn(dispatchTransactionalEmail);
  const [selectedTier, setSelectedTier] = useState<"launch" | "growth" | "pro">("launch");
  const [carePlan, setCarePlan] = useState<"standard" | "priority" | "none">("standard");
  const [copied, setCopied] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const tierDetails = {
    launch: {
      name: "14-Day Launch Website",
      price: 1495,
      scope: [
        "100% Done-For-You Copywriting (No writing required from you)",
        "Mobile-first responsive conversion design",
        "Click-to-Call & WhatsApp instant quote dispatch",
        "Google Review & Trade Accreditation Trust Badges (NICEIC/Gas Safe/TrustMark)",
        "Fast 14-Day Delivery Guarantee",
      ],
    },
    growth: {
      name: "Growth Commercial Website",
      price: 2995,
      scope: [
        "Everything in Launch Plan",
        "Interactive Instant Ballpark Cost Estimator Calculator",
        "Multi-Location Regional Suburb Landing Pages (Local SEO)",
        "Before & After Interactive Work Gallery Slider",
        "Custom Lead Pipeline & Email Alert Integration",
      ],
    },
    pro: {
      name: "Pro Custom Platform",
      price: 4995,
      scope: [
        "Bespoke multi-service contractor portal",
        "Direct trade CRM / dispatch integration",
        "Automated customer quote booking & scheduling",
        "Dedicated VIP performance engineering",
      ],
    },
  }[selectedTier];

  const carePlanRate = carePlan === "standard" ? 95 : carePlan === "priority" ? 195 : 0;
  const depositAmount = Math.round(tierDetails.price * 0.5);
  const finalAmount = tierDetails.price - depositAmount;

  const whatsappMessage = useMemo(() => {
    return `Hi ${lead.name.split(" ")[0] || "there"},

Here is the fixed-price website proposal for *${lead.company || lead.name}* from Harley Digital Works:

*PROPOSAL SUMMARY:*
• Package: *${tierDetails.name}*
• Fixed Build Investment: *£${tierDetails.price.toLocaleString()} + VAT*
• Payment Terms: 50% deposit (£${depositAmount.toLocaleString()}), 50% on pre-launch sign-off (£${finalAmount.toLocaleString()})
• Turnaround Time: *14 Calendar Days*
${carePlan !== "none" ? `• Managed Care & Hosting: *£${carePlanRate}/mo* (Rolling 30-day term, high-speed UK cloud hosting, updates & backups)` : ""}

*INCLUDED DELIVERABLES:*
${tierDetails.scope.map((s) => `✅ ${s}`).join("\n")}

*OUR PROMISE:*
100% Done-For-You. We write every word, build the pages, and set up your lead capture so you can focus on running your business.

Would you like us to provision your build slot for this month?`;
  }, [lead, tierDetails, carePlan, carePlanRate, depositAmount, finalAmount]);

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    toast.success("WhatsApp proposal copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = async () => {
    if (!lead.email) {
      toast.error("No email address found for this lead.");
      return;
    }

    setIsSendingEmail(true);
    try {
      const res = await dispatchEmailFn({
        data: {
          recipientEmail: lead.email,
          recipientName: lead.name,
          companyName: lead.company || lead.name,
          subject: `Website Proposal for ${lead.company || lead.name} - Harley Digital Works`,
          templateType: "proposal",
          plainTextBody: whatsappMessage,
          referenceId: lead.id,
        },
      });

      if (res.delivered) {
        toast.success(`Proposal email sent directly to ${lead.email}`);
      } else {
        toast.info("Opening email client draft with pre-formatted proposal...");
        window.location.href = res.mailtoUrl;
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to dispatch email");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Commercial Proposal Generator</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Proposal for {lead.company || lead.name}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Client: {lead.name} • Contact: {lead.email || "Direct Lead"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Tier Selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Website Package Tier:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedTier("launch")}
                className={`p-2.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTier === "launch"
                    ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Launch (£1,495)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTier("growth")}
                className={`p-2.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTier === "growth"
                    ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Growth (£2,995)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTier("pro")}
                className={`p-2.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTier === "pro"
                    ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Pro (£4,995)
              </button>
            </div>
          </div>

          {/* Care Plan Selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Monthly Managed Care Plan:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCarePlan("standard")}
                className={`p-2.5 rounded-xl text-xs font-medium transition-all ${
                  carePlan === "standard"
                    ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Launch (£95/mo)
              </button>
              <button
                type="button"
                onClick={() => setCarePlan("priority")}
                className={`p-2.5 rounded-xl text-xs font-medium transition-all ${
                  carePlan === "priority"
                    ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Growth (£195/mo)
              </button>
              <button
                type="button"
                onClick={() => setCarePlan("none")}
                className={`p-2.5 rounded-xl text-xs font-medium transition-all ${
                  carePlan === "none"
                    ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                None (£0)
              </button>
            </div>
          </div>
        </div>

        {/* Printable/Formatted Proposal Document */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 mb-6 shadow-inner font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-4">
            <div>
              <div className="text-xs text-gold-400 font-semibold tracking-wider uppercase">
                Fixed-Scope Investment
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">{tierDetails.name}</h3>
            </div>
            <div className="sm:text-right">
              <div className="text-2xl font-extrabold text-white">
                £{tierDetails.price.toLocaleString()}
                <span className="text-xs text-neutral-400 font-normal"> + VAT</span>
              </div>
              <div className="text-xs text-emerald-400 font-medium">
                Deposit: £{depositAmount.toLocaleString()} • Final: £{finalAmount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
            Scope & Included Deliverables:
          </div>
          <ul className="space-y-2 mb-4">
            {tierDetails.scope.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                <span className="text-emerald-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {carePlan !== "none" && (
            <div className="flex items-center gap-2 text-xs text-gold-400 bg-gold-500/10 border border-gold-500/20 p-2.5 rounded-xl">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>
                Includes <strong>£{carePlanRate}/mo Managed Care</strong> (UK hosting, daily backups, 30 min updates/mo, rolling 30-day term).
              </span>
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 text-xs font-semibold text-white transition-all"
          >
            <Printer className="h-4 w-4" />
            <span>Print / PDF</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={isSendingEmail}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md"
            >
              {isSendingEmail ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              <span>{isSendingEmail ? "Sending…" : "Email Proposal"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md"
            >
              {copied ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              <span>{copied ? "Copied!" : "WhatsApp Pitch"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-neutral-800 px-3.5 py-2.5 text-xs font-medium text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
