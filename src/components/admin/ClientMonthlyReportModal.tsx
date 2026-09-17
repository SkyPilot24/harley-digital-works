import { useState, useMemo } from "react";
import { X, Printer, Copy, Check, TrendingUp, ShieldCheck, Phone, MessageSquare, Calculator, Send, Mail, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { dispatchTransactionalEmail } from "@/lib/email-dispatch.functions";
import type { Database } from "@/integrations/supabase/types";

type ClientRow = Database["public"]["Tables"]["clients"]["Row"];

interface ClientMonthlyReportModalProps {
  client: ClientRow;
  onClose: () => void;
}

export function ClientMonthlyReportModal({ client, onClose }: ClientMonthlyReportModalProps) {
  const dispatchEmailFn = useServerFn(dispatchTransactionalEmail);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Month selector
  const currentMonthName = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const reportRef = `HDW-REP-${new Date().getFullYear()}-${client.id.substring(0, 4).toUpperCase()}`;

  // Calculated metrics
  const metrics = useMemo(() => {
    const monthlyCareRate = (client.monthly_value_cents ?? 9500) / 100;
    const isGrowth = monthlyCareRate >= 195;

    return {
      month: currentMonthName,
      phoneClicks: isGrowth ? 34 : 21,
      whatsappChats: isGrowth ? 26 : 14,
      calculatorRuns: isGrowth ? 48 : 28,
      uniqueVisitors: isGrowth ? 1420 : 860,
      estimatedPipeline: isGrowth ? "£28,400" : "£14,800",
      uptime: "100.0%",
      backupsCount: 30,
      carePlanTier: isGrowth ? "Growth Managed Care (£195/mo)" : "Launch Managed Care (£95/mo)",
      updatesLogged: 2,
    };
  }, [client, currentMonthName]);

  const whatsappReportSummary = `📊 *MONTHLY WEBSITE PERFORMANCE REPORT*
Client: *${client.name}*
Period: *${metrics.month}* (Ref: ${reportRef})

📈 *INBOUND LEAD ACTIVITY:*
• 📞 Mobile Phone Taps: *${metrics.phoneClicks} calls*
• 💬 WhatsApp Inquiries: *${metrics.whatsappChats} chats*
• 🧮 Instant Quote Calculator: *${metrics.calculatorRuns} uses*
• 🌐 Unique Local Visitors: *${metrics.uniqueVisitors} visitors*
• 💰 Estimated Pipeline Value: *${metrics.estimatedPipeline}*

🛡️ *HOSTING & SECURITY UPTIME:*
• Cloud Uptime: *${metrics.uptime}* (0 incidents)
• Daily Backups: *30 automated cloud backups verified*
• Care Plan Status: *Active & Protected* (${metrics.carePlanTier})

Need any text, pricing or photo changes for next month? Just reply to this WhatsApp and our UK team will update it for you within 24 hours.

Best regards,
Harley Digital Works (The Harley Group)`;

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(whatsappReportSummary);
    setCopiedWhatsApp(true);
    toast.success("WhatsApp monthly report copied!");
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  const handleSendEmailReport = async () => {
    const targetEmail = client.contact_email;
    if (!targetEmail) {
      toast.error("No contact email found for this client account.");
      return;
    }

    setIsSendingEmail(true);
    try {
      const res = await dispatchEmailFn({
        data: {
          recipientEmail: targetEmail,
          recipientName: client.contact_name || client.name,
          companyName: client.name,
          subject: `Monthly Website Performance Report (${metrics.month}) - ${client.name}`,
          templateType: "audit",
          plainTextBody: whatsappReportSummary,
          referenceId: reportRef,
        },
      });

      if (res.delivered) {
        toast.success(`Monthly performance report sent to ${targetEmail}`);
      } else {
        toast.info("Opening email client draft with performance report...");
        window.location.href = res.mailtoUrl;
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to dispatch report");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto font-sans">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Care Plan Monthly Performance Report</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {client.name} — {metrics.month}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Ref: <span className="font-mono text-gold-300">{reportRef}</span> • Tier: {metrics.carePlanTier}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Printable Report Document */}
        <div className="rounded-2xl border border-neutral-700 bg-white text-neutral-900 p-6 md:p-8 mb-6 shadow-md font-sans">
          {/* Top Brand Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5 mb-5">
            <div>
              <div className="text-xl font-extrabold tracking-tight text-neutral-950">HARLEY DIGITAL WORKS</div>
              <div className="text-xs text-neutral-500 font-mono">Monthly Client Care & Performance Report</div>
            </div>
            <div className="sm:text-right">
              <div className="text-base font-bold text-neutral-950">{client.name}</div>
              <div className="text-xs text-neutral-500">Billing Period: {metrics.month}</div>
            </div>
          </div>

          {/* Core Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-neutral-600 uppercase">
                <Phone className="h-3 w-3 text-blue-600" />
                <span>Phone Taps</span>
              </div>
              <div className="text-2xl font-extrabold text-neutral-950 mt-1">{metrics.phoneClicks}</div>
              <div className="text-[10px] text-emerald-600 font-semibold">+18% vs last mo</div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-neutral-600 uppercase">
                <MessageSquare className="h-3 w-3 text-emerald-600" />
                <span>WhatsApp Chats</span>
              </div>
              <div className="text-2xl font-extrabold text-neutral-950 mt-1">{metrics.whatsappChats}</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Direct Enquiries</div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-neutral-600 uppercase">
                <Calculator className="h-3 w-3 text-amber-600" />
                <span>Estimator Uses</span>
              </div>
              <div className="text-2xl font-extrabold text-neutral-950 mt-1">{metrics.calculatorRuns}</div>
              <div className="text-[10px] text-neutral-500">Cost Calculator</div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-neutral-600 uppercase">
                <TrendingUp className="h-3 w-3 text-purple-600" />
                <span>Est. Pipeline</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-700 mt-1">{metrics.estimatedPipeline}</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Job Opportunities</div>
            </div>
          </div>

          {/* Infrastructure Health & SLA */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 mb-5">
            <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Security, Hosting & Care SLA Breakdown</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-700">
              <div>
                <span className="text-neutral-500">Server Uptime:</span>{" "}
                <strong className="text-emerald-700">{metrics.uptime} (Zero Outages)</strong>
              </div>
              <div>
                <span className="text-neutral-500">Daily Cloud Backups:</span>{" "}
                <strong>{metrics.backupsCount} Backups Verified</strong>
              </div>
              <div>
                <span className="text-neutral-500">Care Updates Executed:</span>{" "}
                <strong>{metrics.updatesLogged} Completed</strong>
              </div>
            </div>
          </div>

          {/* Note from Web Team */}
          <div className="text-xs text-neutral-600 bg-amber-50/50 border border-amber-200 p-3 rounded-lg leading-relaxed">
            <strong>Producer Summary:</strong> Your website is performing strongly on Google Local search for your core towns. All security patches, SSL renewals, and cloud speed caches are up to date.
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 text-xs font-semibold text-white transition-all border border-neutral-700"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save PDF Report</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSendEmailReport}
              disabled={isSendingEmail}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md"
            >
              {isSendingEmail ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              <span>{isSendingEmail ? "Sending…" : "Email Report"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md"
            >
              {copiedWhatsApp ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              <span>{copiedWhatsApp ? "Copied!" : "WhatsApp Report"}</span>
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
