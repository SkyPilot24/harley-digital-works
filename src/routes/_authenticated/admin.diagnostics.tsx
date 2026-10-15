import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Sparkles,
  XCircle,
  Code2,
  Layers,
} from "lucide-react";
import {
  createWebsiteDiagnosticTasks,
  getAuthUserTriggers,
  getWebsiteDiagnostics,
  type AuthTrigger,
  type WebsiteDiagnostic,
} from "@/lib/admin-diagnostics.functions";
import { runWebsiteDiagnostics } from "@/lib/website-diagnostics-evaluator";
import { toast } from "sonner";
import { PageHeader, StatusBadge } from "./admin.index";
import { ClientSiteCodeExporter } from "@/components/admin/ClientSiteCodeExporter";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

const BOOTSTRAP_TRIGGER = "on_auth_user_created_bootstrap";
const BOOTSTRAP_FUNCTION = "public.handle_new_user_bootstrap";

export const Route = createFileRoute("/_authenticated/admin/diagnostics")({
  component: DiagnosticsPage,
});

function DiagnosticsPage() {
  const [activeView, setActiveView] = useState<"diagnostics" | "exporter">("diagnostics");
  const queryClient = useQueryClient();
  const listTriggers = useServerFn(getAuthUserTriggers);
  const checkWebsite = useServerFn(getWebsiteDiagnostics);
  const createDiagnosticTasks = useServerFn(createWebsiteDiagnosticTasks);

  const triggersQuery = useQuery({
    queryKey: ["admin", "auth-triggers"],
    queryFn: () => listTriggers(),
  });

  const websiteQuery = useQuery({
    queryKey: ["admin", "website-diagnostics"],
    queryFn: async () => {
      // In the browser, perform route checks directly via client fetch to bypass
      // Cloudflare Worker same-zone subrequest routing (which sends internal fetch to 100:: discard origin).
      if (typeof window !== "undefined") {
        return runWebsiteDiagnostics(window.location.origin);
      }
      return checkWebsite();
    },
  });

  const outboxQuery = useQuery({
    queryKey: ["admin", "outbox-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lead_notification_jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return (data ?? []) as Database["public"]["Tables"]["lead_notification_jobs"]["Row"][];
    },
  });

  const triggers = triggersQuery.data ?? [];
  const outboxJobs = outboxQuery.data ?? [];
  const bootstrap = triggers.find(
    (trigger) =>
      trigger.trigger_name === BOOTSTRAP_TRIGGER && trigger.function_name === BOOTSTRAP_FUNCTION,
  );
  const bootstrapOk = triggersQuery.isSuccess && !bootstrap?.enabled;
  const websiteChecks = websiteQuery.data ?? [];
  const websiteSummary = summarizeWebsiteChecks(websiteChecks);
  const attentionCount = websiteSummary.warning + websiteSummary.error;
  const groupSummary = summarizeWebsiteGroups(websiteChecks);

  const taskMutation = useMutation({
    mutationFn: () => createDiagnosticTasks({ data: websiteChecks }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["revenue-os-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "website-diagnostics"] });
      toast.success(result.message);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function refreshAll() {
    queryClient.invalidateQueries({ queryKey: ["admin", "auth-triggers"] });
    queryClient.invalidateQueries({ queryKey: ["admin", "website-diagnostics"] });
    queryClient.invalidateQueries({ queryKey: ["admin", "outbox-jobs"] });
    toast.success("Diagnostics refreshed");
  }

  return (
    <div>
      <PageHeader
        title={activeView === "diagnostics" ? "Diagnostics" : "1-Click Client Site Code Exporter"}
        subtitle={
          activeView === "diagnostics"
            ? "Verify admin plumbing, live website routes, metadata, and revenue capture surfaces."
            : "Generate full production React & Tailwind standalone repository blueprints for instant trade client launch."
        }
        action={
          activeView === "diagnostics" ? (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => taskMutation.mutate()}
                disabled={taskMutation.isPending || attentionCount === 0}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-white hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles size={13} />
                {taskMutation.isPending ? "Creating tasks..." : "Create Revenue OS tasks"}
              </button>
              <button
                onClick={refreshAll}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-ink/5"
              >
                <RefreshCw size={13} />
                Refresh
              </button>
            </div>
          ) : undefined
        }
      />

      {/* View Switcher Tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-ink/10 pb-4">
        <button
          onClick={() => setActiveView("diagnostics")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeView === "diagnostics"
              ? "bg-ink text-white shadow-sm"
              : "border border-ink/10 bg-white text-ink/70 hover:bg-ink/[0.04]"
          }`}
        >
          <RefreshCw size={15} />
          <span>System & Route Diagnostics</span>
        </button>
        <button
          onClick={() => setActiveView("exporter")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeView === "exporter"
              ? "bg-ink text-white shadow-sm"
              : "border border-ink/10 bg-white text-ink/70 hover:bg-ink/[0.04]"
          }`}
        >
          <Code2
            size={15}
            className={activeView === "exporter" ? "text-indigo-300" : "text-indigo-600"}
          />
          <span>1-Click Code Blueprint Exporter</span>
          <span className="ml-1 rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
            VITE/REACT COMPILER
          </span>
        </button>
      </div>

      {activeView === "exporter" ? (
        <div className="mt-6">
          <ClientSiteCodeExporter />
        </div>
      ) : (
        <>
          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <HealthCard
              label="Routes checked"
              value={websiteChecks.length || "--"}
              tone="neutral"
            />
            <HealthCard label="Healthy" value={websiteSummary.ok} tone="good" />
            <HealthCard
              label="Needs attention"
              value={attentionCount}
              tone={attentionCount > 0 ? "warn" : "good"}
            />
          </section>

          {groupSummary.length > 0 && (
            <section className="mt-4 grid gap-3 md:grid-cols-5">
              {groupSummary.map((group) => (
                <div key={group.name} className="rounded-xl border border-ink/10 bg-white p-4">
                  <div className="text-[11px] uppercase tracking-wider text-ink-muted">
                    {group.name}
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-ink">{group.attention}</div>
                  <div className="mt-1 text-xs text-ink-muted">
                    {group.total} route{group.total === 1 ? "" : "s"} mapped
                  </div>
                </div>
              ))}
            </section>
          )}

          <section className="mt-8">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                  Live website diagnostics
                </h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Checks mapped public routes for HTTP status, metadata, lead-capture links, contact
                  form health, sitemap coverage, owner, and route priority.
                </p>
              </div>
              {websiteChecks[0]?.checkedAt && (
                <span className="text-xs text-ink-muted">
                  Checked {new Date(websiteChecks[0].checkedAt).toLocaleString()}
                </span>
              )}
            </div>
            <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
                  <tr>
                    <th className="px-4 py-3">Route</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Health</th>
                    <th className="px-4 py-3">Metadata</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {websiteQuery.isLoading && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-ink-muted">
                        Checking live website...
                      </td>
                    </tr>
                  )}
                  {websiteQuery.error && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-rose-600">
                        {(websiteQuery.error as Error).message}
                      </td>
                    </tr>
                  )}
                  {!websiteQuery.isLoading && websiteChecks.length === 0 && !websiteQuery.error && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-ink-muted">
                        No website routes configured.
                      </td>
                    </tr>
                  )}
                  {websiteChecks.map((check) => (
                    <tr key={check.path} className="border-t border-ink/5 align-top">
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink">{check.label}</div>
                        <div className="font-mono text-xs text-ink-muted">{check.path}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-muted">
                        <div className="font-medium text-ink">{check.owner}</div>
                        <div>{check.diagnosticGroup}</div>
                        <div>Lead path: {check.leadCapturePath}</div>
                      </td>
                      <td className="px-4 py-3">
                        <WebsiteStatusBadge check={check} />
                        <div className="mt-1 text-xs text-ink-muted">
                          HTTP {check.httpStatus ?? "--"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-muted">
                        <div>Title: {check.title ? "Yes" : "No"}</div>
                        <div>Description: {check.hasDescription ? "Yes" : "No"}</div>
                        <div>Canonical: {check.hasCanonical ? "Yes" : "No"}</div>
                        <div>Legacy email: {check.hasLegacyEmail ? "Found" : "Clear"}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-muted">
                        <div>Lead link: {check.hasLeadCaptureLink ? "Yes" : "No"}</div>
                        <div>
                          Lead form:{" "}
                          {check.hasLeadForm === null
                            ? "N/A"
                            : check.hasLeadForm
                              ? "Ready"
                              : "Missing"}
                        </div>
                        <div>Sitemap: {check.hasSitemapEntry ? "Listed" : "Missing"}</div>
                      </td>
                      <td className="max-w-sm px-4 py-3 text-ink/70">{check.message}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={check.url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink hover:bg-ink/5"
                          >
                            View <ExternalLink className="inline" size={11} />
                          </a>
                          <Link
                            to={check.adminPath as "/admin"}
                            className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-white hover:bg-ink/90"
                          >
                            {check.adminLabel}
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Background Automations & Crons Monitoring */}
          <section className="mt-8 space-y-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                Automated Background Workflows & Scheduled Crons
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Continuous background processes running via Cloudflare Workers and Nitro server
                engine.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Slack Notification Outbox (* * * * *)
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Minute Schedule
                  </span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Cloudflare worker runs minute scheduled handler, claiming pending jobs with
                  disjoint leases and executing safe retries with exponential backoff up to 5
                  attempts.
                </p>
              </div>

              <div className="rounded-xl border border-ink/10 bg-white p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Abuse Attempt Retention Pruning (0 * * * *)
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Hourly Schedule
                  </span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Nitro scheduled task invokes prune_lead_submission_attempts() via service role
                  client every hour to ensure database cleanliness and GDPR-safe retention.
                </p>
              </div>
            </div>

            {/* Outbox Table */}
            <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
              <div className="border-b border-ink/10 bg-ink/[0.02] px-4 py-3 flex items-center justify-between">
                <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
                  Lead Notification Jobs Outbox ({outboxJobs.length})
                </h3>
                <span className="text-[11px] text-ink-muted">
                  Max 5 attempts · 1m, 5m, 15m, 60m delays
                </span>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-ink/[0.01] text-left text-[11px] uppercase tracking-wider text-ink-muted border-b border-ink/5">
                  <tr>
                    <th className="px-4 py-2.5">Job ID / Source</th>
                    <th className="px-4 py-2.5">Attempts</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5">Created</th>
                    <th className="px-4 py-2.5">Details / Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {outboxQuery.isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                        Loading outbox jobs…
                      </td>
                    </tr>
                  ) : outboxJobs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-ink-muted">
                        No notification jobs recorded.
                      </td>
                    </tr>
                  ) : (
                    outboxJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-ink/[0.01]">
                        <td className="px-4 py-3">
                          <div className="font-mono font-bold text-ink">{job.id.slice(0, 8)}…</div>
                          <div className="text-[11px] text-ink-muted">{job.source}</div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-ink">{job.attempts} / 5</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={job.status} />
                        </td>
                        <td className="px-4 py-3 text-[11px] text-ink-muted">
                          {new Date(job.created_at).toLocaleString("en-GB")}
                        </td>
                        <td className="px-4 py-3 text-[11px]">
                          {job.status === "accepted" ? (
                            <span className="text-emerald-700 font-medium">
                              Slack acknowledged this alert
                            </span>
                          ) : job.last_error ? (
                            <span className="text-rose-600 font-mono">{job.last_error}</span>
                          ) : (
                            <span className="text-ink-muted">Pending delivery</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8">
            <div
              className={`flex items-start gap-4 rounded-xl border p-5 ${
                bootstrapOk
                  ? "border-emerald-200 bg-emerald-50/60"
                  : "border-rose-200 bg-rose-50/60"
              }`}
            >
              <div className={bootstrapOk ? "text-emerald-600" : "text-rose-600"}>
                {bootstrapOk ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
              </div>
              <div className="flex-1">
                <h2 className="text-[15px] font-semibold text-ink">Administrator provisioning</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {triggersQuery.isPending
                    ? "Checking administrator provisioning…"
                    : triggersQuery.isError
                      ? "Unable to verify administrator provisioning. Retry the diagnostic before approving a release."
                      : bootstrapOk
                        ? "Automatic promotion is inactive. Administrator access must be granted explicitly by a trusted operator."
                        : "Unsafe automatic promotion is enabled. A signup can become an administrator whenever no admin exists. Apply the reviewed security migration before release."}
                </p>
                <dl className="mt-3 grid grid-cols-1 gap-1 text-[12px] text-ink-muted sm:grid-cols-2">
                  <div>
                    <dt className="inline font-medium text-ink/70">Trigger:</dt>{" "}
                    <dd className="inline font-mono">{BOOTSTRAP_TRIGGER}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-ink/70">Function:</dt>{" "}
                    <dd className="inline font-mono">{BOOTSTRAP_FUNCTION}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-ink/70">Table:</dt>{" "}
                    <dd className="inline font-mono">auth.users</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-ink/70">Fires:</dt>{" "}
                    <dd className="inline font-mono">AFTER INSERT</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
              All triggers on auth.users
            </h2>
            <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
                  <tr>
                    <th className="px-4 py-3">Trigger</th>
                    <th className="px-4 py-3">Function</th>
                    <th className="px-4 py-3">Timing</th>
                    <th className="px-4 py-3">Event</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {triggersQuery.isLoading && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                        Loading...
                      </td>
                    </tr>
                  )}
                  {triggersQuery.error && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-rose-600">
                        {(triggersQuery.error as Error).message}
                      </td>
                    </tr>
                  )}
                  {!triggersQuery.isLoading && triggers.length === 0 && !triggersQuery.error && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                        No user-defined triggers on auth.users.
                      </td>
                    </tr>
                  )}
                  {triggers.map((trigger: AuthTrigger) => (
                    <tr key={trigger.trigger_name} className="border-t border-ink/5">
                      <td className="px-4 py-3 font-mono text-[12px] text-ink">
                        {trigger.trigger_name}
                      </td>
                      <td className="px-4 py-3 font-mono text-[12px] text-ink/70">
                        {trigger.function_name}
                      </td>
                      <td className="px-4 py-3 text-ink/70">{trigger.timing}</td>
                      <td className="px-4 py-3 text-ink/70">{trigger.event}</td>
                      <td className="px-4 py-3">
                        {trigger.enabled ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            <CheckCircle2 size={11} /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
                            <XCircle size={11} /> Disabled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function summarizeWebsiteChecks(checks: WebsiteDiagnostic[]) {
  return checks.reduce(
    (summary, check) => ({ ...summary, [check.status]: summary[check.status] + 1 }),
    { ok: 0, warning: 0, error: 0 },
  );
}

function summarizeWebsiteGroups(checks: WebsiteDiagnostic[]) {
  const groups = new Map<string, { name: string; total: number; attention: number }>();
  checks.forEach((check) => {
    const group = groups.get(check.diagnosticGroup) ?? {
      name: check.diagnosticGroup,
      total: 0,
      attention: 0,
    };
    group.total += 1;
    if (check.status !== "ok") group.attention += 1;
    groups.set(check.diagnosticGroup, group);
  });
  return Array.from(groups.values());
}

function WebsiteStatusBadge({ check }: { check: WebsiteDiagnostic }) {
  if (check.status === "ok") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
        <CheckCircle2 size={11} /> Healthy
      </span>
    );
  }
  if (check.status === "warning") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
        <AlertTriangle size={11} /> Review
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
      <XCircle size={11} /> Error
    </span>
  );
}

function HealthCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone: "good" | "warn" | "neutral";
}) {
  const toneClass =
    tone === "good" ? "text-emerald-700" : tone === "warn" ? "text-amber-700" : "text-ink";
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <div className="text-[12px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className={`mt-3 text-3xl font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}
