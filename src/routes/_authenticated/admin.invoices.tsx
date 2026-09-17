import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader } from "./admin.index";
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Building2,
  CreditCard,
  Plus,
  Trash2,
  Send,
  ShieldCheck,
  Receipt,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/invoices")({
  component: InvoicesAdminPage,
});

interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

const DEFAULT_INVOICE_TEMPLATES = {
  deposit: {
    title: "50% Upfront Project Deposit",
    items: [
      {
        id: "1",
        description: "14-Day Growth Website Platform Build (50% Upfront Deposit Milestone)",
        quantity: 1,
        unitPrice: 1497.5,
      },
    ],
  },
  final: {
    title: "50% Live Launch Balance",
    items: [
      {
        id: "1",
        description: "14-Day Growth Website Platform Build (50% Final Launch Balance Milestone)",
        quantity: 1,
        unitPrice: 1497.5,
      },
    ],
  },
  care: {
    title: "Managed Monthly Care Plan",
    items: [
      {
        id: "1",
        description: "Monthly Managed Care Plan: High-Speed UK Edge Hosting, Daily Backups & Unlimited Updates",
        quantity: 1,
        unitPrice: 95.0,
      },
    ],
  },
  launchDeposit: {
    title: "Launch Plan 50% Deposit",
    items: [
      {
        id: "1",
        description: "14-Day Launch Plan Website Build (50% Upfront Deposit Milestone)",
        quantity: 1,
        unitPrice: 747.5,
      },
    ],
  },
};

function InvoicesAdminPage() {
  const [invoiceNumber, setInvoiceNumber] = useState("HDW-INV-2026-084");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [clientName, setClientName] = useState("Apex Heating & Mechanical Ltd");
  const [clientContact, setClientContact] = useState("Mark Davies");
  const [clientEmail, setClientEmail] = useState("mark@apexheating.co.uk");
  const [clientAddress, setClientAddress] = useState(
    "Unit 4, Trade Park, Stockport, Greater Manchester, SK4 1BS"
  );
  const [isPaid, setIsPaid] = useState(false);

  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    {
      id: "1",
      description: "14-Day Growth Website Platform Build (50% Upfront Deposit)",
      quantity: 1,
      unitPrice: 1497.5,
    },
    {
      id: "2",
      description: "Local SEO Map-Pack Domination Add-on Module",
      quantity: 1,
      unitPrice: 495.0,
    },
  ]);

  const loadTemplate = (templateKey: keyof typeof DEFAULT_INVOICE_TEMPLATES) => {
    const tpl = DEFAULT_INVOICE_TEMPLATES[templateKey];
    setLineItems(
      tpl.items.map((it, idx) => ({
        ...it,
        id: String(idx + 1),
      }))
    );
    toast.success(`Loaded template: ${tpl.title}`);
  };

  const addItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        description: "Custom Technical Service / Module",
        quantity: 1,
        unitPrice: 150,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (lineItems.length === 1) {
      toast.error("An invoice must contain at least one line item.");
      return;
    }
    setLineItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceLineItem, val: string | number) => {
    setLineItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  const calculations = useMemo(() => {
    const subtotal = lineItems.reduce((acc, it) => acc + (it.quantity * it.unitPrice || 0), 0);
    const vatRate = 0.2; // 20% UK VAT
    const vatAmount = subtotal * vatRate;
    const total = subtotal + vatAmount;

    return {
      subtotal,
      vatAmount,
      total,
    };
  }, [lineItems]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleSendInvoice = () => {
    toast.success(`Invoice ${invoiceNumber} dispatched to ${clientEmail}!`);
  };

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <PageHeader
          title="Automated VAT Invoices & Receipts"
          subtitle="Generate, issue, and print HMRC-compliant 20% VAT invoices for client project deposits, completion balances, and monthly care retainers."
          action={
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/85 shadow-sm transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>Print Official Tax Invoice / Save PDF</span>
              </button>
            </div>
          }
        />
      </div>

      {/* Quick Template Switcher & Invoice Config (Screen Only) */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
              1-Click Invoice Presets
            </span>
            <h3 className="text-sm font-bold text-ink">Load Common Trade Invoice Models</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadTemplate("launchDeposit")}
              className="rounded-lg bg-ink/5 hover:bg-ink/10 px-3 py-1.5 text-xs font-medium text-ink"
            >
              Launch Plan Deposit (£747.50 ex-VAT)
            </button>
            <button
              onClick={() => loadTemplate("deposit")}
              className="rounded-lg bg-ink/5 hover:bg-ink/10 px-3 py-1.5 text-xs font-medium text-ink"
            >
              Growth Plan Deposit (£1,497.50 ex-VAT)
            </button>
            <button
              onClick={() => loadTemplate("care")}
              className="rounded-lg bg-ink/5 hover:bg-ink/10 px-3 py-1.5 text-xs font-medium text-ink"
            >
              Care Plan (£95.00 ex-VAT)
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">Invoice Number</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">Issue Date</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">Payment Status</label>
            <button
              onClick={() => setIsPaid((p) => !p)}
              className={`w-full rounded-lg px-3 py-2 text-xs font-bold border transition-colors ${
                isPaid
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-amber-50 text-amber-800 border-amber-300"
              }`}
            >
              {isPaid ? "PAID IN FULL (Receipt Mode)" : "PAYMENT DUE (Invoice Mode)"}
            </button>
          </div>
        </div>
      </div>

      {/* Printable / Renderable Official Tax Invoice Document */}
      <div className="rounded-2xl border border-ink/10 bg-white p-8 md:p-12 shadow-md max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 font-sans text-ink">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-slate-900 pb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-slate-950 uppercase font-mono">
                The Harley Group
              </span>
              <span className="rounded bg-emerald-900 text-emerald-100 text-[10px] font-mono uppercase px-2 py-0.5">
                Holding & Operations
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600">Trading Division: <strong>Harley Digital Works</strong></p>
            <p className="text-xs text-slate-500 mt-2">
              Corporate Headquarters: Manchester, United Kingdom<br />
              Company Reg: England & Wales · VAT Reg: <strong>GB 948 2018 39</strong><br />
              Email: accounts@theharleygroup.co.uk · Web: harleydigitalworks.com
            </p>
          </div>

          <div className="text-right sm:self-start">
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 font-mono">
              {isPaid ? "VAT RECEIPT" : "TAX INVOICE"}
            </h1>
            <div className="mt-2 text-xs font-mono text-slate-600 space-y-1">
              <div>Invoice Ref: <strong className="text-slate-950">{invoiceNumber}</strong></div>
              <div>Issue Date: {issueDate}</div>
              <div>Due Date: <strong>{dueDate}</strong></div>
              {isPaid && (
                <div className="inline-block mt-2 rounded border border-emerald-600 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                  STATUS: PAID IN FULL
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bill To Info */}
        <div className="mt-8 grid sm:grid-cols-2 gap-8 border-b border-ink/10 pb-8 text-xs">
          <div>
            <span className="font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Invoice Addressed To (Customer):
            </span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full font-bold text-base text-slate-900 border-b border-dashed border-transparent hover:border-slate-400 focus:border-emerald-500 focus:outline-none bg-transparent"
            />
            <input
              type="text"
              value={clientContact}
              onChange={(e) => setClientContact(e.target.value)}
              placeholder="Attn: Contact Name"
              className="w-full text-slate-700 mt-1 border-b border-dashed border-transparent hover:border-slate-400 focus:border-emerald-500 focus:outline-none bg-transparent"
            />
            <input
              type="text"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Email address"
              className="w-full text-slate-600 mt-0.5 border-b border-dashed border-transparent hover:border-slate-400 focus:border-emerald-500 focus:outline-none bg-transparent"
            />
            <textarea
              rows={2}
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              placeholder="Company Address"
              className="w-full text-slate-500 mt-1 text-xs border-b border-dashed border-transparent hover:border-slate-400 focus:border-emerald-500 focus:outline-none bg-transparent resize-none"
            />
          </div>

          <div className="sm:text-right space-y-2">
            <span className="font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Payment Remittance Details:
            </span>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-left sm:text-right text-xs">
              <div className="font-bold text-slate-900">Bank: Barclays Bank UK PLC</div>
              <div>Account Name: <strong>The Harley Group Ltd</strong></div>
              <div>Sort Code: <strong className="font-mono">20-55-40</strong></div>
              <div>Account Number: <strong className="font-mono">83920194</strong></div>
              <div>Payment Reference: <strong className="font-mono text-emerald-800">{invoiceNumber}</strong></div>
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-xs font-mono uppercase tracking-wider text-slate-700">
                <th className="py-3 px-2">Description / Deliverables</th>
                <th className="py-3 px-2 text-center w-16">Qty</th>
                <th className="py-3 px-2 text-right w-28">Unit Price</th>
                <th className="py-3 px-2 text-right w-32">Total (Ex-VAT)</th>
                <th className="py-3 px-2 w-8 print:hidden"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {lineItems.map((it) => (
                <tr key={it.id}>
                  <td className="py-3 px-2">
                    <input
                      type="text"
                      value={it.description}
                      onChange={(e) => updateItem(it.id, "description", e.target.value)}
                      className="w-full text-slate-900 font-medium bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input
                      type="number"
                      value={it.quantity}
                      onChange={(e) => updateItem(it.id, "quantity", Number(e.target.value))}
                      className="w-12 text-center bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-2 text-right font-mono">
                    <input
                      type="number"
                      value={it.unitPrice}
                      onChange={(e) => updateItem(it.id, "unitPrice", Number(e.target.value))}
                      className="w-24 text-right bg-transparent focus:outline-none font-mono"
                    />
                  </td>
                  <td className="py-3 px-2 text-right font-mono font-semibold text-slate-900">
                    £{(it.quantity * it.unitPrice).toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-2 text-center print:hidden">
                    <button
                      onClick={() => removeItem(it.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 print:hidden">
            <button
              onClick={addItem}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Custom Line Item</span>
            </button>
          </div>
        </div>

        {/* Total Calculations */}
        <div className="mt-8 border-t-2 border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="text-xs text-slate-500 max-w-sm">
            <p className="font-semibold text-slate-800 mb-1">Standard Terms & Governance:</p>
            <p>
              Payment is due strictly within 7 days of invoice date. Digital assets and live domain
              handover remain the property of The Harley Group Ltd until full settlement.
            </p>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal (Net Ex-VAT):</span>
              <span>£{calculations.subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>UK VAT (20.0%):</span>
              <span>£{calculations.vatAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-slate-900 pt-2 flex justify-between text-base font-bold text-slate-950">
              <span>Total Amount Due:</span>
              <span>£{calculations.total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Footer Disclosures */}
        <div className="mt-12 border-t border-slate-200 pt-6 text-[11px] text-slate-400 text-center font-mono space-y-1">
          <div>The Harley Group Ltd · Registered in England and Wales · VAT Number: GB 948 2018 39</div>
          <div>Harley Digital Works is a trading name of The Harley Group Ltd</div>
        </div>
      </div>
    </div>
  );
}
