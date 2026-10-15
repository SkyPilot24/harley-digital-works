import { LEAD_PAGE_SIZE, loadLeadPage, loadLeadCounts, type LeadFilter } from "@/lib/admin-leads";
import { ensureClientWorkspace } from "@/lib/client-workspace";
import {
  adminErrorMessage,
  deleteRecord,
  insertRecord,
  invalidateAdminData,
  updateRecord,
} from "@/lib/admin-writes";
import { parseLeadInput, parseLeadStatus } from "@/lib/admin-validation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import {
  Inbox,
  UserPlus,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  Mail,
  Building,
  Calendar,
  Sparkles,
  Search,
  Plus,
  FileText,
} from "lucide-react";
import { PageHeader, StatusBadge } from "./admin.index";
import { LeadProposalModal } from "@/components/admin/LeadProposalModal";

type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
type LeadStatus = Database["public"]["Enums"]["lead_status"];

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: LeadsPage,
});

function LeadsPage() {
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<LeadFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null);
  const [editingLead, setEditingLead] = useState<Partial<LeadRow> | null>(null);
  const [proposingLead, setProposingLead] = useState<LeadRow | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const leadsQuery = useQuery({
    queryKey: ["leads", "page", activeTab, searchTerm, page],
    queryFn: ({ signal }) =>
      loadLeadPage(supabase, { page, status: activeTab, search: searchTerm, signal }),
  });
  const countsQuery = useQuery({
    queryKey: ["leads", "counts"],
    queryFn: () => loadLeadCounts(supabase),
  });
  const notificationQuery = useQuery({
    queryKey: ["lead-notification", selectedLead?.id],
    enabled: !!selectedLead,
    refetchInterval: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lead_notification_jobs")
        .select("status,attempts,last_error,next_attempt_at")
        .eq("lead_id", selectedLead!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // Convert Lead to Client Mutation
  const convertToClientMutation = useMutation({
    mutationFn: async (lead: LeadRow) =>
      ensureClientWorkspace(lead, {
        find: async (id) => {
          const { data, error } = await supabase
            .from("clients")
            .select("*")
            .eq("id", id)
            .maybeSingle();
          if (error) throw error;
          return data;
        },
        insert: async (payload) => {
          const { data, error } = await supabase.from("clients").insert(payload).select().single();
          if (error) throw error;
          return data;
        },
      }),
    onSuccess: (client) => {
      invalidateAdminData(qc, "client");
      setSelectedLead(null);
      toast.success(`Client workspace ready for ${client.name}`, {
        description:
          "This does not mark the lead won or record payment. Confirm the agreement separately.",
      });
    },
    onError: (err: unknown) =>
      toast.error(
        `Conversion failed: ${adminErrorMessage(err, "The workspace could not be created.")}`,
      ),
  });

  // Save / Update Lead Mutation
  const saveLeadMutation = useMutation({
    mutationFn: async (
      payload: Record<string, unknown> & { id?: string; statusOnly?: boolean },
    ) => {
      if (payload.statusOnly && payload.id)
        return updateRecord(supabase, "leads", payload.id, {
          status: parseLeadStatus(payload.status),
        });
      const input = parseLeadInput(payload);
      if (payload.id) return updateRecord(supabase, "leads", payload.id, input);
      return insertRecord(supabase, "leads", { ...input, source: "admin_manual" });
    },
    onSuccess: (saved) => {
      setSelectedLead((current) => (current?.id === saved.id ? saved : current));
      invalidateAdminData(qc, "lead");
      setEditingLead(null);
      setIsCreating(false);
      toast.success("Lead saved successfully");
    },
    onError: (err: unknown) => toast.error(adminErrorMessage(err, "The lead could not be saved.")),
  });

  // Delete Lead Mutation
  const deleteLeadMutation = useMutation({
    mutationFn: (id: string) => deleteRecord(supabase, "leads", id),
    onSuccess: (_result, id) => {
      invalidateAdminData(qc, "lead");
      setSelectedLead((current) => (current?.id === id ? null : current));
      setPage(0);
      toast.success("Lead deleted");
    },
    onError: (err: unknown) =>
      toast.error(adminErrorMessage(err, "The lead could not be deleted.")),
  });

  const filteredLeads = leadsQuery.isSuccess ? (leadsQuery.data?.rows ?? []) : [];
  const counts = countsQuery.isSuccess ? countsQuery.data : undefined;
  const totalLeads = counts?.all;
  const newLeads = counts?.new;
  const qualifiedLeads = counts?.qualified;
  const wonLeads = counts?.won;
  const conversionRate =
    totalLeads && wonLeads !== undefined ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const matchedTotal = leadsQuery.data?.total ?? 0;
  return (
    <div>
      <PageHeader
        title="Enquiries & qualification"
        subtitle="Record genuine enquiries, customer fit and agreed next steps. Workspace creation does not confirm payment."
        action={
          <button
            onClick={() => {
              setEditingLead({ status: "new" });
              setIsCreating(true);
            }}
            className="rounded-full bg-ink px-4 py-2 text-sm text-white"
          >
            <Plus size={16} className="mr-2 inline" />
            Add enquiry
          </button>
        }
      />
      <>
        {/* Metrics Bar */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-ink/10 bg-white p-5">
            <div className="flex items-center gap-2 text-ink-muted">
              <Inbox size={14} />
              <span className="text-[12px] uppercase tracking-wider">Total enquiries</span>
            </div>
            <div className="mt-3 text-3xl font-semibold text-ink">{totalLeads ?? "—"}</div>
            <div className="mt-1 text-xs text-ink-muted">All-time enquiries</div>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
            <div className="flex items-center gap-2 text-blue-700">
              <Sparkles size={14} />
              <span className="text-[12px] uppercase tracking-wider font-semibold">
                Action Required
              </span>
            </div>
            <div className="mt-3 text-3xl font-semibold text-blue-900">{newLeads ?? "—"}</div>
            <div className="mt-1 text-xs text-blue-700">New / uncontacted leads</div>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white p-5">
            <div className="flex items-center gap-2 text-violet-700">
              <Building size={14} />
              <span className="text-[12px] uppercase tracking-wider font-semibold">Qualified</span>
            </div>
            <div className="mt-3 text-3xl font-semibold text-ink">{qualifiedLeads ?? "—"}</div>
            <div className="mt-1 text-xs text-ink-muted">Ready for proposal / quote</div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
            <div className="flex items-center gap-2 text-emerald-700">
              <UserPlus size={14} />
              <span className="text-[12px] uppercase tracking-wider font-semibold">Won</span>
            </div>
            <div className="mt-3 text-3xl font-semibold text-emerald-900">{wonLeads ?? "—"}</div>
            <div className="mt-1 text-xs text-emerald-700">
              {countsQuery.isSuccess
                ? `${conversionRate}% of records marked won`
                : "Rate unavailable"}
            </div>
          </div>
        </div>

        {countsQuery.isError && (
          <p role="alert">
            Enquiry totals are unavailable.{" "}
            <button type="button" className="underline" onClick={() => void countsQuery.refetch()}>
              Retry totals
            </button>
          </p>
        )}
        {/* Filter and Search Bar */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Leads", count: totalLeads },
              { id: "new", label: "New", count: newLeads },
              { id: "contacted", label: "Contacted", count: counts?.contacted },
              { id: "qualified", label: "Qualified", count: qualifiedLeads },
              { id: "won", label: "Won", count: wonLeads },
              {
                id: "lost",
                label: "Lost",
                count: counts?.lost,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as LeadFilter);
                  setPage(0);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-ink text-white"
                    : "border border-ink/10 bg-white text-ink/70 hover:bg-ink/[0.04]"
                }`}
              >
                {tab.label} ({tab.count ?? "—"})
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              placeholder="Search leads by name, email, company..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              aria-label="Search enquiries"
              className="w-full rounded-full border border-ink/15 bg-white py-1.5 pl-9 pr-4 text-xs text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        {/* Leads Table */}
        <div
          className="mt-6 overflow-x-auto rounded-xl border border-ink/10 bg-white"
          aria-busy={leadsQuery.isFetching}
        >
          <table className="w-full text-sm">
            <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
              <tr>
                <th className="px-4 py-3">Lead / Company</th>
                <th className="px-4 py-3">Package / Scope</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leadsQuery.isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-ink-muted">
                    Loading leads…
                  </td>
                </tr>
              )}

              {leadsQuery.isError && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center" role="alert">
                    Enquiries could not be loaded.{" "}
                    <button
                      type="button"
                      className="underline"
                      onClick={() => leadsQuery.refetch()}
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              )}
              {filteredLeads.length === 0 && leadsQuery.isSuccess && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-ink-muted">
                    No leads found in this view.
                  </td>
                </tr>
              )}
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="cursor-pointer border-t border-ink/5 transition-colors hover:bg-ink/[0.02]"
                >
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-ink">{lead.name}</div>
                    <div className="text-xs text-ink-muted flex items-center gap-2">
                      {lead.company && <span>{lead.company} ·</span>}
                      <span>{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded bg-ink/[0.05] px-2 py-1 text-xs font-medium text-ink/80">
                      {lead.package || "General Enquiry"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3.5 text-xs text-ink-muted">
                    {new Date(lead.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      {lead.status !== "won" && (
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Create a client workspace for "${lead.name}"? This does not record an agreement, payment or recurring revenue.`,
                              )
                            ) {
                              convertToClientMutation.mutate(lead);
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                          disabled={convertToClientMutation.isPending}
                          title="Create client workspace"
                        >
                          <UserPlus size={13} />
                          <span>Create workspace</span>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setProposingLead(lead);
                        }}
                        className="inline-flex items-center gap-1 rounded-md bg-gold-500/10 border border-gold-500/30 px-2 py-1 text-xs font-semibold text-gold-700 hover:bg-gold-500/20"
                        title="Generate Client Proposal"
                      >
                        <FileText size={13} />
                        <span>Proposal</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingLead(lead);
                        }}
                        className="rounded-md p-1.5 text-ink/60 hover:bg-ink/[0.05] hover:text-ink"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete lead from ${lead.name}?`)) {
                            deleteLeadMutation.mutate(lead.id);
                          }
                        }}
                        className="rounded-md p-1.5 text-ink/60 hover:bg-rose-50 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav
          aria-label="Enquiry pages"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"
        >
          <p role="status">
            {leadsQuery.isSuccess
              ? `${matchedTotal} matching enquiries · Page ${page + 1}`
              : "Enquiry page unavailable"}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-ink/20 px-4 py-2 disabled:opacity-40"
              disabled={page === 0 || leadsQuery.isFetching}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-full border border-ink/20 px-4 py-2 disabled:opacity-40"
              disabled={
                !leadsQuery.isSuccess ||
                leadsQuery.isFetching ||
                (page + 1) * LEAD_PAGE_SIZE >= matchedTotal
              }
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </nav>
        {/* Lead Detail & Inspection Drawer */}
        {selectedLead && (
          <div
            className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs"
            onClick={() => setSelectedLead(null)}
          >
            <div
              className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-ink/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-ink">{selectedLead.name}</h2>
                    <StatusBadge status={selectedLead.status} />
                  </div>
                  {selectedLead.company && (
                    <p className="mt-1 text-sm text-ink-muted">{selectedLead.company}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded-md p-2 text-ink/60 hover:bg-ink/[0.05]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {/* Quick Conversion Banner */}
                {selectedLead.status !== "won" ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-950">
                          Prepare a client workspace
                        </h4>
                        <p className="mt-0.5 text-xs text-emerald-800">
                          Creates a prospect workspace. Mark the lead won only after an agreement;
                          record payments in your accounting provider.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setProposingLead(selectedLead)}
                          className="shrink-0 inline-flex items-center gap-1 rounded-full bg-gold-500/20 border border-gold-500/40 px-3.5 py-2 text-xs font-semibold text-neutral-900 hover:bg-gold-500/30"
                        >
                          <FileText size={13} />
                          <span>Proposal</span>
                        </button>
                        <button
                          onClick={() => convertToClientMutation.mutate(selectedLead)}
                          disabled={convertToClientMutation.isPending}
                          className="shrink-0 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 disabled:opacity-50"
                        >
                          {convertToClientMutation.isPending ? "Preparing…" : "Create workspace"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-ink/10 bg-ink/[0.03] p-4 flex items-center justify-between">
                    <div className="text-xs text-ink/80">
                      <span className="font-semibold text-emerald-700">✓ Lead marked won.</span>{" "}
                      Verify the client workspace and agreement; this status does not confirm
                      payment.
                    </div>
                    <Link
                      to="/admin/clients"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:underline"
                    >
                      View in Clients <ExternalLink size={12} />
                    </Link>
                  </div>
                )}

                {/* Contact Information */}
                <div className="grid gap-4 rounded-xl border border-ink/10 p-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                      Email
                    </div>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-primary hover:underline"
                    >
                      <Mail size={14} className="text-ink-muted" />
                      {selectedLead.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                      Received Date
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-ink">
                      <Calendar size={14} className="text-ink-muted" />
                      {new Date(selectedLead.created_at).toLocaleString("en-GB")}
                    </div>
                  </div>
                </div>

                {/* Package & Service Scope */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Requested Package / Service
                  </h3>
                  <div className="mt-2 inline-block rounded-lg border border-ink/15 bg-ink/[0.02] px-3.5 py-2 text-sm font-medium text-ink">
                    {selectedLead.package || "General Consultancy Enquiry"}
                  </div>
                </div>

                {/* Intake Message / Details */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Full Enquiry & Qualification Message
                  </h3>
                  <div className="mt-2 whitespace-pre-wrap rounded-xl border border-ink/10 bg-ink/[0.02] p-4 text-sm leading-relaxed text-ink/90">
                    {selectedLead.message}
                  </div>
                </div>

                <div aria-live="polite">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Enquiry alert
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    {notificationQuery.isError
                      ? "Alert status unavailable. The enquiry remains saved here."
                      : notificationQuery.isPending
                        ? "Checking alert status…"
                        : !notificationQuery.data
                          ? "No automatic alert recorded for this lead."
                          : notificationQuery.data.status === "accepted"
                            ? "Slack acknowledged this alert."
                            : notificationQuery.data.status === "failed"
                              ? "Alert failed after five attempts. Check the Slack connection before arranging a manual resend."
                              : notificationQuery.data.status === "processing"
                                ? "Alert delivery in progress."
                                : "Alert queued. Automatic retries run when the Slack connection is enabled."}
                  </p>
                  {notificationQuery.data && (
                    <p className="mt-1 text-xs text-ink-muted">
                      Delivery attempts: {notificationQuery.data.attempts} / 5
                    </p>
                  )}
                </div>

                {/* Internal Notes */}
                {selectedLead.notes && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      Internal Operator Notes
                    </h3>
                    <div className="mt-2 whitespace-pre-wrap rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-950">
                      {selectedLead.notes}
                    </div>
                  </div>
                )}

                {/* Status Update Controls */}
                <div className="border-t border-ink/10 pt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Update Lead Pipeline Status
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["new", "contacted", "qualified", "won", "lost"] as LeadStatus[]).map(
                      (st) => (
                        <button
                          key={st}
                          disabled={saveLeadMutation.isPending}
                          onClick={() =>
                            saveLeadMutation.mutate({
                              id: selectedLead.id,
                              status: st,
                              statusOnly: true,
                            })
                          }
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            selectedLead.status === st
                              ? "bg-ink text-white"
                              : "border border-ink/15 bg-white text-ink/70 hover:bg-ink/5"
                          }`}
                        >
                          {st.replace(/_/g, " ")}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>

      {/* Edit / Create Lead Modal */}
      {(editingLead || isCreating) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
          onClick={() => {
            setEditingLead(null);
            setIsCreating(false);
          }}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <h2 className="text-lg font-semibold text-ink">
                {editingLead?.id ? "Edit Lead" : "Add New Lead"}
              </h2>
              <button
                onClick={() => {
                  setEditingLead(null);
                  setIsCreating(false);
                }}
                className="rounded-md p-1.5 text-ink/60 hover:bg-ink/5"
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                saveLeadMutation.mutate({
                  id: editingLead?.id,
                  name: fd.get("name"),
                  email: fd.get("email"),
                  company: fd.get("company"),
                  package: fd.get("package"),
                  status: fd.get("status"),
                  message: fd.get("message"),
                  notes: fd.get("notes"),
                });
              }}
              className="mt-5 space-y-4 text-sm"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Name *
                </label>
                <input
                  name="name"
                  required
                  defaultValue={editingLead?.name ?? ""}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={editingLead?.email ?? ""}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Company
                  </label>
                  <input
                    name="company"
                    defaultValue={editingLead?.company ?? ""}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingLead?.status ?? "new"}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Package / Scope
                </label>
                <input
                  name="package"
                  placeholder="e.g. Managed website and ongoing care"
                  defaultValue={editingLead?.package ?? ""}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Message / Requirements *
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  defaultValue={editingLead?.message ?? ""}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Internal Notes
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue={editingLead?.notes ?? ""}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingLead(null);
                    setIsCreating(false);
                  }}
                  className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLeadMutation.isPending}
                  className="rounded-full bg-ink px-5 py-2 text-xs font-semibold text-white hover:bg-ink/90 disabled:opacity-50"
                >
                  {saveLeadMutation.isPending ? "Saving…" : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Proposal Generator Modal */}
      {proposingLead && (
        <LeadProposalModal lead={proposingLead} onClose={() => setProposingLead(null)} />
      )}
    </div>
  );
}
