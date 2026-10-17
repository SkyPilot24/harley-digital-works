import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Receipt,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building,
  User,
  Clock,
  ArrowRight,
  Plus,
  FileText,
  DollarSign,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { PageHeader, StatusBadge } from "./admin.index";
import { toast } from "sonner";
import { recordedActiveMonthlyValue } from "@/lib/client-workspace";
import { parsePoundsToCents, formatCents } from "@/lib/admin-validation";

export const Route = createFileRoute("/_authenticated/admin/invoices")({
  component: InvoicesAdminPage,
});

type ClientRow = Database["public"]["Tables"]["clients"]["Row"];

function InvoicesAdminPage() {
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [milestoneType, setMilestoneType] = useState<"deposit" | "balance" | "monthly" | "custom">(
    "deposit",
  );
  const [customAmount, setCustomAmount] = useState<string>("1495");
  const [customDescription, setCustomDescription] = useState<string>(
    "Standard Managed trade website setup",
  );

  const clientsQuery = useQuery({
    queryKey: ["admin", "clients-billing"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ClientRow[];
    },
  });

  const clients = clientsQuery.data ?? [];
  const recordedMonthlyCents = recordedActiveMonthlyValue(clients);

  const selectedClient = clients.find((c) => c.id === selectedClientId) ?? clients[0];

  const paymentCalculation = useMemo(() => {
    let amountCents = 74750;
    let label = "50% Setup Deposit (Milestone 1)";
    let purpose = "To reserve build slot, initiate Discovery and technical copywriting.";

    if (milestoneType === "deposit") {
      amountCents = 74750;
      label = "50% Setup Deposit (Milestone 1)";
      purpose = "To reserve build slot, initiate Discovery and technical copywriting.";
    } else if (milestoneType === "balance") {
      amountCents = 74750;
      label = "50% Completion Balance (Milestone 2)";
      purpose = "Due upon final staged preview sign-off, prior to live Cloudflare DNS launch.";
    } else if (milestoneType === "monthly") {
      amountCents = 24900;
      label = "Monthly Digital Care Subscription";
      purpose =
        "Cloudflare hosting, SSL maintenance, 30-min monthly edit batch, and enquiry health checks.";
    } else {
      try {
        amountCents = parsePoundsToCents(customAmount, "Custom Amount") ?? 0;
      } catch {
        amountCents = 0;
      }
      label = "Custom Milestone Payment";
      purpose = customDescription || "Additional approved trade digital scope.";
    }

    return { amountCents, label, purpose };
  }, [milestoneType, customAmount, customDescription]);

  const invoiceRequestText = useMemo(() => {
    const clientName = selectedClient?.name ?? "Trade Client";
    const contactName = selectedClient?.contact_name
      ? `Attn: ${selectedClient.contact_name}\n`
      : "";
    const contactEmail = selectedClient?.contact_email
      ? `Email: ${selectedClient.contact_email}\n`
      : "";
    const dateStr = new Date().toLocaleDateString("en-GB");

    return `
INTERNAL PAYMENT REQUEST DRAFT — NOT AN ISSUED INVOICE
Harley DigitalWorks Ltd · Harley Digital Works
Date: ${dateStr}
Reference: HDW-${selectedClient ? selectedClient.id.slice(0, 8).toUpperCase() : "INV"}-${milestoneType.toUpperCase()}

Client: ${clientName}
${contactName}${contactEmail}
--------------------------------------------------
Item: ${paymentCalculation.label}
Description: ${paymentCalculation.purpose}
Proposed Milestone Amount: ${formatCents(paymentCalculation.amountCents)}
VAT Status: Not VAT-registered (owner confirmed 14 October 2026).
Supplier Details: Reconcile the supplied company number and address against the internal seller record before issue.
Final Payable Amount: Confirm in the approved invoice/payment provider.
--------------------------------------------------

Proposed Payment Reference: HDW-${
      selectedClient
        ? selectedClient.name
            .replace(/[^a-zA-Z0-9]/g, "")
            .slice(0, 10)
            .toUpperCase()
        : "TRADE"
    }

Before sending: verify supplier legal details, agreed scope, tax treatment and payment destination.
Issue through the approved provider; this draft contains no payable link or verified bank details.
Confirm actual payment independently from provider/ledger evidence.
`.trim();
  }, [selectedClient, milestoneType, paymentCalculation]);

  function handleCopyInvoice() {
    navigator.clipboard.writeText(invoiceRequestText);
    toast.success("Payment request text copied to clipboard!");
  }

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Finance & Payment Drafts"
        subtitle="Prepare milestone drafts; reconcile actual payments in the approved provider and ledger."
      />

      {/* Financial Health Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Recorded Monthly Agreement Value
            </span>
            <Receipt size={16} className="text-emerald-700" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-ink">
            {clientsQuery.isError ? (
              <span className="text-xl text-rose-700">Unavailable</span>
            ) : clientsQuery.isPending ? (
              <div className="h-9 w-32 rounded bg-ink/10 animate-pulse my-1" />
            ) : (
              `${formatCents(recordedMonthlyCents) ?? "£0.00"}/mo`
            )}
          </div>
          <div className="mt-1 text-xs text-ink-muted">
            {clientsQuery.isError ? (
              <span role="alert" className="text-rose-700">
                Could not retrieve client agreements.{" "}
                <button
                  type="button"
                  className="font-bold underline text-ink hover:text-ink/80"
                  onClick={() => void clientsQuery.refetch()}
                >
                  Retry
                </button>
              </span>
            ) : (
              "Manually recorded client values; not verified subscriptions or collected revenue."
            )}
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Standard Setup Fee
            </span>
            <DollarSign size={16} className="text-blue-700" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-ink">£1,495</div>
          <div className="mt-1 text-xs text-ink-muted">
            50% deposit (£747.50) + 50% balance (£747.50).
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Ongoing Monthly Care
            </span>
            <ShieldCheck size={16} className="text-violet-700" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-ink">£249/mo</div>
          <div className="mt-1 text-xs text-ink-muted">
            Rolling 30-day agreement with 30-min edit allowance.
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tax & VAT Status</span>
            <Receipt size={16} className="text-amber-700" />
          </div>
          <div className="mt-2 text-xl font-bold text-ink">Not VAT-registered</div>
          <div className="mt-1 text-xs text-ink-muted">
            Owner confirmed 14 October 2026. Seller issue details remain pending.
          </div>
        </div>
      </div>

      {/* Query Error Banner if client query fails */}
      {clientsQuery.isError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-950 flex items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-rose-700 shrink-0" />
            <span>
              Unable to load client billing accounts from Supabase. Live agreement values and client
              dropdown are temporarily unavailable.
            </span>
          </div>
          <button
            type="button"
            onClick={() => void clientsQuery.refetch()}
            className="rounded-full border border-rose-300 bg-white px-3 py-1 font-bold text-rose-900 hover:bg-rose-100 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Tax & Governance Notice */}
      <div className="rounded-xl border border-ink/10 bg-emerald-50/50 p-4 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck size={18} className="text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Before issuing a payment request:</span> Confirm supplier
          identity, agreed scope, tax treatment and payment destination. This console prepares
          drafts; it does not issue provider invoices or verify payments. Record actual receipts
          separately in the approved provider and accounting ledger.
        </div>
      </div>

      {/* Interactive Milestone Payment Request Generator */}
      <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="border-b border-ink/10 pb-4 mb-6">
          <h2 className="text-lg font-bold text-ink">Prepare Milestone Payment Draft</h2>
          <p className="text-xs text-ink-muted mt-0.5">
            Prepare a draft for review before issuing an approved deposit, balance or care invoice.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Select Client Account
              </label>
              {clientsQuery.isPending ? (
                <div className="h-10 w-full rounded-lg bg-ink/5 animate-pulse" />
              ) : clients.length === 0 ? (
                <p className="text-xs text-ink-muted">
                  No client records available. Create a client first.
                </p>
              ) : (
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-xs font-medium text-ink focus:border-ink focus:outline-hidden"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.contact_name ? `(${c.contact_name})` : ""} · {c.status}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Milestone Type
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  { key: "deposit", label: "50% Deposit", amount: "£747.50" },
                  { key: "balance", label: "50% Balance", amount: "£747.50" },
                  { key: "monthly", label: "Monthly Care", amount: "£249.00" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMilestoneType(item.key as typeof milestoneType)}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      milestoneType === item.key
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                        : "border-ink/15 hover:border-ink/30 text-ink"
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-xs text-ink-muted mt-0.5">{item.amount}</div>
                  </button>
                ))}
              </div>
            </div>

            {milestoneType === "custom" && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-ink">Amount (£)</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink">Description</label>
                  <input
                    type="text"
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-xs"
                  />
                </div>
              </div>
            )}

            <div className="rounded-lg bg-ink/[0.02] border border-ink/10 p-3.5 text-xs space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-ink-muted">Milestone:</span>
                <span className="font-bold text-ink">{paymentCalculation.label}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-ink-muted">Amount Due:</span>
                <span className="font-extrabold text-emerald-800 text-sm">
                  {formatCents(paymentCalculation.amountCents)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-muted">
                <span>VAT Treatment:</span>
                <span>Not VAT-registered</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyInvoice}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white hover:bg-ink/90 transition-colors"
            >
              <Copy size={14} />
              <span>Copy Payment Request to Clipboard</span>
            </button>
          </div>

          {/* Preview Box */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
              Live Payment Notice Preview
            </label>
            <pre className="h-80 w-full overflow-y-auto rounded-xl border border-ink/15 bg-slate-50 p-4 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
              {invoiceRequestText}
            </pre>
          </div>
        </div>
      </div>

      {/* Stripe Deposit Tracking & Webhook Resilience Panel */}
      <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-ink flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-700" />
              Deposit Receipts & Idempotent Stripe Webhook Receiver
            </h2>
            <p className="text-xs text-ink-muted">
              Production payment processing safeguards, ratified integer pence tracking, and ledger
              reconciliation.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Receiver Active
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-ink/10 bg-slate-50/60 p-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Deposit Milestone (M1)
            </div>
            <div className="text-xl font-extrabold text-ink">£747.50</div>
            <p className="text-xs text-ink-muted">
              Exactly 74,750 integer pence. Triggers project workspace reservation and discovery
              kickoff.
            </p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-slate-50/60 p-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Balance Milestone (M2)
            </div>
            <div className="text-xl font-extrabold text-ink">£747.50</div>
            <p className="text-xs text-ink-muted">
              Exactly 74,750 integer pence. Payable upon final staged preview approval prior to live
              launch.
            </p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-slate-50/60 p-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Webhook Replay Defense
            </div>
            <div className="text-xl font-extrabold text-emerald-800">300s Tolerance</div>
            <p className="text-xs text-ink-muted">
              Cryptographic HMAC-SHA256 signature verification with idempotent deduplication via
              database RPC.
            </p>
          </div>
        </div>
      </div>

      {/* Client Recurring Ledger */}
      <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-ink">
              Client Subscription & Billing Directory
            </h2>
            <p className="text-xs text-ink-muted">
              Live customer accounts with monthly care agreement and payment values.
            </p>
          </div>
          <Link to="/admin/clients" className="text-xs font-semibold text-ink underline">
            Open client directory →
          </Link>
        </div>

        {clientsQuery.isPending ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-2 border-b border-ink/5"
              >
                <div className="h-4 w-1/4 rounded bg-ink/10 animate-pulse" />
                <div className="h-4 w-1/4 rounded bg-ink/10 animate-pulse" />
                <div className="h-4 w-1/6 rounded bg-ink/10 animate-pulse" />
                <div className="h-4 w-16 rounded bg-ink/10 animate-pulse" />
              </div>
            ))}
          </div>
        ) : clients.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink/15 p-8 text-center">
            <Receipt size={24} className="mx-auto text-ink-muted/50 mb-2" />
            <p className="text-xs font-semibold text-ink">No client accounts found</p>
            <p className="text-xs text-ink-muted mt-1">
              Add a client through the Enquiry Desk or Client Directory to draft payment requests.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ink/10 text-ink-muted">
                  <th className="pb-2.5 font-semibold">Client Name</th>
                  <th className="pb-2.5 font-semibold">Primary Contact</th>
                  <th className="pb-2.5 font-semibold">Monthly Care Value</th>
                  <th className="pb-2.5 font-semibold">Status</th>
                  <th className="pb-2.5 font-semibold">Account Date</th>
                  <th className="pb-2.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {clients.map((client) => {
                  const monthlyVal =
                    client.monthly_value_cents && client.monthly_value_cents > 0
                      ? `${formatCents(client.monthly_value_cents)}/mo`
                      : "£0.00/mo";
                  return (
                    <tr key={client.id} className="hover:bg-ink/[0.01]">
                      <td className="py-3 font-bold text-ink">{client.name}</td>
                      <td className="py-3 text-ink-muted">
                        {client.contact_name || client.contact_email || "—"}
                      </td>
                      <td className="py-3 font-mono font-bold text-emerald-800">{monthlyVal}</td>
                      <td className="py-3">
                        <StatusBadge status={client.status} />
                      </td>
                      <td className="py-3 text-[11px] text-ink-muted">
                        {new Date(client.created_at).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedClientId(client.id);
                            toast.success(`Selected ${client.name} in payment generator above`);
                          }}
                          className="rounded-full border border-ink/15 px-2.5 py-1 text-[11px] font-semibold text-ink hover:bg-ink/5 cursor-pointer"
                        >
                          Bill Milestone
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
