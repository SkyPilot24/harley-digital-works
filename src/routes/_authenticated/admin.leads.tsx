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
} from "lucide-react";
import { PageHeader, StatusBadge } from "./admin.index";

type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
type LeadStatus = Database["public"]["Enums"]["lead_status"];

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: LeadsPage,
});

function LeadsPage() {
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null);
  const [editingLead, setEditingLead] = useState<Partial<LeadRow> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const leadsQuery = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as LeadRow[];
    },
  });

  // Convert Lead to Client Mutation
  const convertToClientMutation = useMutation({
    mutationFn: async (lead: LeadRow) => {
      let monthlyCents = 0;
      const pkg = (lead.package ?? "").toLowerCase();
      if (pkg.includes("care") || pkg.includes("95")) {
        monthlyCents = 9500;
      } else if (pkg.includes("growth") || pkg.includes("195")) {
        monthlyCents = 19500;
      }

      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .insert({
          name: lead.company || lead.name,
          contact_name: lead.name,
          contact_email: lead.email,
          status: "active",
          monthly_value_cents: monthlyCents,
          notes: `Converted from lead on ${new Date().toLocaleDateString("en-GB")}.\nPackage interest: ${lead.package ?? "Not specified"}\n\nOriginal Message:\n${lead.message}`,
        })
        .select()
        .single();

      if (clientError) throw clientError;

      const { error: leadUpdateError } = await supabase
        .from("leads")
        .update({ status: "won" })
        .eq("id", lead.id);

      if (leadUpdateError) throw leadUpdateError;

      return clientData;
    },
    onSuccess: (client) => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      qc.invalidateQueries({ queryKey: ["clients"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      setSelectedLead(null);
      toast.success(`Converted ${client.name} to active Client!`, {
        description: "You can now manage their projects and care plans in Clients.",
      });
    },
    onError: (err: Error) => {
      toast.error(`Conversion failed: ${err.message}`);
    },
  });

  // Save / Update Lead Mutation
  const saveLeadMutation = useMutation({
    mutationFn: async (payload: Partial<LeadRow>) => {
      if (payload.id) {
        const { id, ...rest } = payload;
        const { error } = await supabase.from("leads").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("leads").insert({
          name: payload.name ?? "",
          email: payload.email ?? "",
          message: payload.message ?? "",
          company: payload.company ?? null,
          package: payload.package ?? null,
          status: payload.status ?? "new",
          notes: payload.notes ?? null,
          source: payload.source ?? "admin_manual",
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      setEditingLead(null);
      setIsCreating(false);
      toast.success("Lead saved successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  // Delete Lead Mutation
  const deleteLeadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      if (selectedLead?.id) setSelectedLead(null);
      toast.success("Lead deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const leads = leadsQuery.data ?? [];
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const wonLeads = leads.filter((l) => l.status === "won").length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  const filteredLeads = leads.filter((l) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "new" && l.status === "new") ||
      (activeTab === "qualified" && l.status === "qualified") ||
      (activeTab === "won" && l.status === "won") ||
      (activeTab === "lost" && l.status === "lost");

    const matchesSearch =
      !searchTerm ||
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.package && l.package.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="Lead Intake & Pipeline"
        subtitle="Manage inbound enquiries, qualify commercial fit, and convert leads into active clients."
        action={
          <button
            onClick={() => {
              setEditingLead({ status: "new" });
              setIsCreating(true);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
          >
            <Plus size={16} /> Add Lead
          </button>
        }
      />

      {/* Metrics Bar */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <div className="flex items-center gap-2 text-ink-muted">
            <Inbox size={14} />
            <span className="text-[12px] uppercase tracking-wider">Total Inbound</span>
          </div>
          <div className="mt-3 text-3xl font-semibold text-ink">{totalLeads}</div>
          <div className="mt-1 text-xs text-ink-muted">All-time enquiries</div>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
          <div className="flex items-center gap-2 text-blue-700">
            <Sparkles size={14} />
            <span className="text-[12px] uppercase tracking-wider font-semibold">
              Action Required
            </span>
          </div>
          <div className="mt-3 text-3xl font-semibold text-blue-900">{newLeads}</div>
          <div className="mt-1 text-xs text-blue-700">New / uncontacted leads</div>
        </div>
        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <div className="flex items-center gap-2 text-violet-700">
            <Building size={14} />
            <span className="text-[12px] uppercase tracking-wider font-semibold">Qualified</span>
          </div>
          <div className="mt-3 text-3xl font-semibold text-ink">{qualifiedLeads}</div>
          <div className="mt-1 text-xs text-ink-muted">Ready for proposal / quote</div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
          <div className="flex items-center gap-2 text-emerald-700">
            <UserPlus size={14} />
            <span className="text-[12px] uppercase tracking-wider font-semibold">Converted</span>
          </div>
          <div className="mt-3 text-3xl font-semibold text-emerald-900">{wonLeads}</div>
          <div className="mt-1 text-xs text-emerald-700">
            {conversionRate}% win / conversion rate
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Leads", count: totalLeads },
            { id: "new", label: "New", count: newLeads },
            { id: "qualified", label: "Qualified", count: qualifiedLeads },
            { id: "won", label: "Won / Converted", count: wonLeads },
            {
              id: "lost",
              label: "Lost",
              count: leads.filter((l) => l.status === "lost").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-ink text-white"
                  : "border border-ink/10 bg-white text-ink/70 hover:bg-ink/[0.04]"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-ink/15 bg-white py-1.5 pl-9 pr-4 text-xs text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
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
            {filteredLeads.length === 0 && !leadsQuery.isLoading && (
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
                              `Convert "${lead.name}" (${lead.company || "Individual"}) to an active Client record?`,
                            )
                          ) {
                            convertToClientMutation.mutate(lead);
                          }
                        }}
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                        title="Convert to Client"
                      >
                        <UserPlus size={13} />
                        <span>Convert</span>
                      </button>
                    )}
                    <button
                      onClick={() => setEditingLead(lead)}
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
                        Ready to convert this lead?
                      </h4>
                      <p className="mt-0.5 text-xs text-emerald-800">
                        Automatically provisions a Client record and allows project & MRR
                        management.
                      </p>
                    </div>
                    <button
                      onClick={() => convertToClientMutation.mutate(selectedLead)}
                      disabled={convertToClientMutation.isPending}
                      className="shrink-0 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 disabled:opacity-50"
                    >
                      {convertToClientMutation.isPending ? "Converting…" : "Convert to Client"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-ink/10 bg-ink/[0.03] p-4 flex items-center justify-between">
                  <div className="text-xs text-ink/80">
                    <span className="font-semibold text-emerald-700">✓ Converted to Client.</span>{" "}
                    Record is live in Client Workspace.
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
                  {(["new", "contacted", "qualified", "won", "lost"] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => saveLeadMutation.mutate({ id: selectedLead.id, status: st })}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        selectedLead.status === st
                          ? "bg-ink text-white"
                          : "border border-ink/15 bg-white text-ink/70 hover:bg-ink/5"
                      }`}
                    >
                      {st.replace(/_/g, " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  name: String(fd.get("name") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  company: String(fd.get("company") ?? "") || null,
                  package: String(fd.get("package") ?? "") || null,
                  status: (String(fd.get("status") ?? "new") as LeadStatus) || "new",
                  message: String(fd.get("message") ?? ""),
                  notes: String(fd.get("notes") ?? "") || null,
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
                  placeholder="e.g. Launch Website (£1,495), Care Plan"
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
    </div>
  );
}
