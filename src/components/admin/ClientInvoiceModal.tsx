import { useState, useMemo } from "react";
import {
  X,
  Printer,
  Copy,
  Check,
  FileCheck,
  Landmark,
  Receipt,
  Sparkles,
  Mail,
  Loader2,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { dispatchTransactionalEmail } from "@/lib/email-dispatch.functions";
import type { Database } from "@/integrations/supabase/types";

type ClientRow = Database["public"]["Tables"]["clients"]["Row"];

interface ClientInvoiceModalProps {
  client: ClientRow;
  onClose: () => void;
}

export function ClientInvoiceModal({ client, onClose }: ClientInvoiceModalProps) {
  const dispatchEmailFn = useServerFn(dispatchTransactionalEmail);
  const [invoiceType, setInvoiceType] = useState<
    "deposit_launch" | "deposit_growth" | "final_launch" | "care_plan"
  >("deposit_launch");
  const [copiedBacs, setCopiedBacs] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const invoiceNumber = `HDW-INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const issueDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dueDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const invoiceData = useMemo(() => {
    switch (invoiceType) {
      case "deposit_launch":
        return {
          title: "50% Commencement Deposit — 14-Day Launch Website",
          description:
            "Initial 50% deposit for turnkey website design, professional copywriting, and mobile setup.",
          netAmount: 747.5,
        };
      case "deposit_growth":
        return {
          title: "50% Commencement Deposit — Growth Website & Local SEO",
          description:
            "Initial 50% deposit for custom website, interactive quote estimator, and multi-location local SEO.",
          netAmount: 1497.5,
        };
      case "final_launch":
        return {
          title: "Final 50% Balance — Pre-Launch Sign-off",
          description:
            "Final completion balance upon website review sign-off and domain DNS cutover.",
          netAmount: 747.5,
        };
      case "care_plan":
        return {
          title: "Monthly Managed Care Plan & High-Speed UK Hosting",
          description:
            "Recurring 30-day managed hosting, daily backups, 24/7 uptime monitoring, and 30 mins monthly updates.",
          netAmount: 95.0,
        };
    }
  }, [invoiceType]);

  const vatAmount = Number((invoiceData.netAmount * 0.2).toFixed(2));
  const grossTotal = Number((invoiceData.netAmount + vatAmount).toFixed(2));

  const bacsDetails = `Bank: Barclays Bank UK
Account Name: The Harley Group Ltd (t/a Harley Digital Works)
Sort Code: 20-00-00
Account Number: 83920194
Reference: ${invoiceNumber} / ${client.name}`;

  const handleCopyBacs = () => {
    navigator.clipboard.writeText(bacsDetails);
    setCopiedBacs(true);
    toast.success("BACS payment details copied!");
    setTimeout(() => setCopiedBacs(false), 2500);
  };

  const handleSendInvoiceEmail = async () => {
    const targetEmail = client.contact_email;
    if (!targetEmail) {
      toast.error("No contact email found for this client account.");
      return;
    }

    setIsSendingEmail(true);
    try {
      const emailBody = `Dear ${client.contact_name || client.name},

Please find the details for VAT Invoice ${invoiceNumber} issued by Harley Digital Works (The Harley Group Ltd):

ITEM: ${invoiceData.title}
DESCRIPTION: ${invoiceData.description}

Net Amount: £${invoiceData.netAmount.toFixed(2)}
VAT (20%): £${vatAmount.toFixed(2)}
TOTAL DUE: £${grossTotal.toFixed(2)}
DUE DATE: ${dueDate}

PAYMENT DETAILS (BACS):
Bank: Barclays Bank UK
Account Name: The Harley Group Ltd
Sort Code: 20-00-00
Account Number: 83920194
Reference: ${invoiceNumber}

Thank you for your business.

Warm regards,
Accounts Department
Harley Digital Works (The Harley Group Ltd)`;

      const res = await dispatchEmailFn({
        data: {
          recipientEmail: targetEmail,
          recipientName: client.contact_name || client.name,
          companyName: client.name,
          subject: `VAT Invoice ${invoiceNumber} (£${grossTotal.toFixed(2)}) - Harley Digital Works`,
          templateType: "invoice",
          plainTextBody: emailBody,
          referenceId: invoiceNumber,
        },
      });

      if (res.accepted) {
        toast.success(res.message);
      } else {
        toast.info("Opening email client draft with pre-formatted invoice...");
        window.location.href = res.mailtoUrl;
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to dispatch invoice email");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
              <Receipt className="h-4 w-4" />
              <span>VAT Invoice & Receipt Generator</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Invoice for {client.name}</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Ref: <span className="font-mono text-gold-300">{invoiceNumber}</span> • Issued:{" "}
              {issueDate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Invoice Item Selection */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
            Select Billing Line Item:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setInvoiceType("deposit_launch")}
              className={`p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                invoiceType === "deposit_launch"
                  ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                  : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              50% Launch Dep. (£747.50)
            </button>
            <button
              type="button"
              onClick={() => setInvoiceType("deposit_growth")}
              className={`p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                invoiceType === "deposit_growth"
                  ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                  : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              50% Growth Dep. (£1,497.50)
            </button>
            <button
              type="button"
              onClick={() => setInvoiceType("final_launch")}
              className={`p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                invoiceType === "final_launch"
                  ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                  : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Final Balance (£747.50)
            </button>
            <button
              type="button"
              onClick={() => setInvoiceType("care_plan")}
              className={`p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                invoiceType === "care_plan"
                  ? "bg-gold-500 text-neutral-950 font-bold shadow-sm"
                  : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Care Plan (£95.00/mo)
            </button>
          </div>
        </div>

        {/* Invoice Printable Preview Container */}
        <div className="rounded-2xl border border-neutral-700 bg-white text-neutral-900 p-6 md:p-8 mb-6 shadow-md font-sans">
          {/* Top Brand Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5 mb-5">
            <div>
              <div className="text-xl font-extrabold tracking-tight text-neutral-950">
                HARLEY DIGITAL WORKS
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                A Division of The Harley Group Ltd
              </div>
            </div>
            <div className="sm:text-right">
              <div className="text-lg font-bold text-neutral-950">VAT INVOICE</div>
              <div className="text-xs text-neutral-500 font-mono">Invoice: {invoiceNumber}</div>
              <div className="text-xs text-neutral-500">Date: {issueDate}</div>
            </div>
          </div>

          {/* Billed To & From */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-6 pb-5 border-b border-neutral-200">
            <div>
              <div className="font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Billed To:
              </div>
              <div className="font-bold text-neutral-950 text-sm">{client.name}</div>
              {client.contact_name && (
                <div className="text-neutral-700">Attn: {client.contact_name}</div>
              )}
              {client.contact_email && (
                <div className="text-neutral-500">{client.contact_email}</div>
              )}
              {client.contact_phone && (
                <div className="text-neutral-500">{client.contact_phone}</div>
              )}
            </div>

            <div className="sm:text-right">
              <div className="font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Payable To:
              </div>
              <div className="font-bold text-neutral-950">The Harley Group Ltd</div>
              <div className="text-neutral-600">Company Reg: England & Wales</div>
              <div className="text-neutral-600">VAT Reg: GB 948 2018 39</div>
              <div className="text-neutral-500">accounts@harleydigitalworks.com</div>
            </div>
          </div>

          {/* Line Item Table */}
          <table className="w-full text-xs mb-6">
            <thead>
              <tr className="border-b-2 border-neutral-900 text-neutral-950">
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2">Net (GBP)</th>
                <th className="text-right py-2">VAT (20%)</th>
                <th className="text-right py-2">Total (GBP)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="py-3">
                  <div className="font-bold text-neutral-950">{invoiceData.title}</div>
                  <div className="text-neutral-500 text-[11px] mt-0.5">
                    {invoiceData.description}
                  </div>
                </td>
                <td className="text-right font-mono py-3">£{invoiceData.netAmount.toFixed(2)}</td>
                <td className="text-right font-mono py-3">£{vatAmount.toFixed(2)}</td>
                <td className="text-right font-mono font-bold py-3">£{grossTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals & BACS details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs">
              <div className="font-bold text-neutral-900 flex items-center gap-1 mb-1">
                <Landmark className="h-3.5 w-3.5 text-neutral-700" />
                <span>BACS Bank Transfer Details:</span>
              </div>
              <div className="font-mono text-[11px] text-neutral-700 leading-tight space-y-0.5">
                <div>Bank: Barclays Bank UK</div>
                <div>Account: The Harley Group Ltd</div>
                <div>Sort Code: 20-00-00</div>
                <div>Account No: 83920194</div>
                <div>Ref: {invoiceNumber}</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs sm:text-right">
              <div className="flex justify-between sm:justify-end gap-6 text-neutral-600">
                <span>Subtotal (Net):</span>
                <span className="font-mono font-medium">£{invoiceData.netAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-6 text-neutral-600">
                <span>VAT (20%):</span>
                <span className="font-mono font-medium">£{vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-6 text-sm font-extrabold text-neutral-950 border-t-2 border-neutral-900 pt-2">
                <span>Total Due:</span>
                <span className="font-mono">£{grossTotal.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-neutral-500">Payment Due: {dueDate}</div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopyBacs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 text-xs font-semibold text-white transition-all border border-neutral-700"
          >
            {copiedBacs ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copiedBacs ? "Copied BACS" : "Copy BACS Details"}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSendInvoiceEmail}
              disabled={isSendingEmail}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md"
            >
              {isSendingEmail ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Mail className="h-3.5 w-3.5" />
              )}
              <span>{isSendingEmail ? "Sending…" : "Email Invoice"}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-5 py-2.5 text-xs font-bold text-neutral-950 transition-all shadow-md"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
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
