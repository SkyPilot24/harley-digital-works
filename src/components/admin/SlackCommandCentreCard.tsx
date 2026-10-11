import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Hash,
  Crown,
  BellRing,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  getSlackStatus,
  triggerTestDailyBriefing,
  triggerTestLeadAlert,
  triggerTestExceptionAlert,
} from "@/lib/slack/server-functions";
import { toast } from "sonner";

export function SlackCommandCentreCard() {
  const fetchStatus = useServerFn(getSlackStatus);
  const sendDigest = useServerFn(triggerTestDailyBriefing);
  const sendLead = useServerFn(triggerTestLeadAlert);
  const sendException = useServerFn(triggerTestExceptionAlert);

  const {
    data: status,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin", "slack-status"],
    queryFn: () => fetchStatus(),
  });

  const [activeTest, setActiveTest] = useState<string | null>(null);

  const digestMutation = useMutation({
    mutationFn: () => sendDigest(),
    onMutate: () => setActiveTest("digest"),
    onSettled: () => setActiveTest(null),
    onSuccess: (res) => {
      if (res.ok) toast.success(res.message);
      else toast.warning(res.message);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const leadMutation = useMutation({
    mutationFn: () => sendLead(),
    onMutate: () => setActiveTest("lead"),
    onSettled: () => setActiveTest(null),
    onSuccess: (res) => {
      if (res.ok) toast.success(res.message);
      else toast.warning(res.message);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const exceptionMutation = useMutation({
    mutationFn: () => sendException(),
    onMutate: () => setActiveTest("exception"),
    onSettled: () => setActiveTest(null),
    onSuccess: (res) => {
      if (res.ok) toast.success(res.message);
      else toast.warning(res.message);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-ink p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Crown size={16} />
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80">
              Founder Command Centre · Slack First
            </span>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 transition-colors"
          >
            <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
            <span>Check Status</span>
          </button>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
          Slack Operational Command Centre
        </h2>
        <p className="mt-1 text-sm text-white/80 max-w-2xl leading-relaxed">
          Manage The Harley Group and Harley Digital Works directly from Slack without dashboard
          switching. Interactive Block Kit workflows enable 1-click lead triage, approval sign-offs,
          and job retries managed strictly by exception.
        </p>

        {/* Integration Status Badges */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-4 border-t border-white/15">
          <div className="rounded-xl bg-white/5 p-3">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-white/60">
              Dispatch State
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
              <CheckCircle2 size={13} /> Active & Durable
            </span>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-white/60">
              Webhook Transport
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-white">
              {status?.hasWebhook ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-400" /> Configured
                </>
              ) : (
                <>
                  <AlertTriangle size={13} className="text-amber-400" /> Needs URL
                </>
              )}
            </span>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-white/60">
              Security / Signing
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-white">
              <ShieldCheck size={13} className="text-emerald-400" /> HMAC-SHA256
            </span>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-white/60">
              Target Operating Mode
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-amber-300">
              <Zap size={13} /> By Exception
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Testing & Dispatch Controls */}
      <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-xs">
        <h3 className="text-sm font-bold text-ink uppercase tracking-wider">
          Founder Actions & Dispatch Simulation
        </h3>
        <p className="mt-1 text-xs text-ink-muted">
          Trigger live Block Kit messages to verify interactive buttons, status updates, and
          formatting directly in your configured Slack workspace.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button
            onClick={() => digestMutation.mutate()}
            disabled={activeTest !== null}
            className="flex flex-col items-start gap-1 rounded-xl border border-ink/15 p-4 text-left hover:border-ink hover:bg-ink/5 transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-2 text-ink font-bold text-xs">
              <Crown size={15} className="text-amber-600" />
              <span>Send Daily Briefing</span>
            </div>
            <p className="text-[11px] text-ink-muted">
              Dispatches 08:00 executive KPI digest with verified MRR, 3-build capacity, and
              approvals to <span className="font-mono text-ink">#founder-command</span>.
            </p>
            <span className="mt-2 text-[10px] font-bold text-ink underline">
              {activeTest === "digest" ? "Dispatching..." : "Dispatch Now →"}
            </span>
          </button>

          <button
            onClick={() => leadMutation.mutate()}
            disabled={activeTest !== null}
            className="flex flex-col items-start gap-1 rounded-xl border border-ink/15 p-4 text-left hover:border-ink hover:bg-ink/5 transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-2 text-ink font-bold text-xs">
              <BellRing size={15} className="text-blue-600" />
              <span>Send Trade Lead Card</span>
            </div>
            <p className="text-[11px] text-ink-muted">
              Sends an interactive enquiry card with 1-click Contacted / Qualify / Convert buttons
              to <span className="font-mono text-ink">#new-leads</span>.
            </p>
            <span className="mt-2 text-[10px] font-bold text-ink underline">
              {activeTest === "lead" ? "Dispatching..." : "Dispatch Now →"}
            </span>
          </button>

          <button
            onClick={() => exceptionMutation.mutate()}
            disabled={activeTest !== null}
            className="flex flex-col items-start gap-1 rounded-xl border border-ink/15 p-4 text-left hover:border-ink hover:bg-ink/5 transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-2 text-ink font-bold text-xs">
              <AlertTriangle size={15} className="text-rose-600" />
              <span>Send Exception Alert</span>
            </div>
            <p className="text-[11px] text-ink-muted">
              Simulates a high-priority automation retry with a 1-click Retry Process button to{" "}
              <span className="font-mono text-ink">#automation-alerts</span>.
            </p>
            <span className="mt-2 text-[10px] font-bold text-ink underline">
              {activeTest === "exception" ? "Dispatching..." : "Dispatch Now →"}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Operational Channel Architecture */}
      <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider">
              Channel Architecture & Notification Matrix
            </h3>
            <p className="mt-0.5 text-xs text-ink-muted">
              Clean, low-noise operational channel routing designed for rapid founder triage.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
            9 Active Routing Nodes
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-3">
          {status?.channels.map((ch) => (
            <div
              key={ch.name}
              className="flex flex-col justify-between rounded-lg border border-ink/10 p-3 bg-slate-50/50"
            >
              <div>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-ink">
                  <Hash size={13} className="text-ink-muted" />
                  <span>{ch.name.replace("#", "")}</span>
                </div>
                <p className="mt-1 text-[11px] text-ink-muted leading-tight">{ch.purpose}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-ink-muted pt-2 border-t border-ink/5">
                <span className="text-emerald-700 font-semibold">Active</span>
                <span className="font-mono">Multiplexed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Founder Slash Commands Cheat Sheet */}
      <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={16} className="text-ink" />
          <h3 className="text-sm font-bold text-ink uppercase tracking-wider">
            Founder Slash Command Palette
          </h3>
        </div>
        <p className="text-xs text-ink-muted mb-4">
          Type these commands directly into any Slack channel to query real-time data from your
          phone or desktop without logging into the web dashboard:
        </p>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {[
            {
              cmd: "/thg status",
              desc: "Instant Executive Briefing: verified MRR, active builds (x/3 cap), pipeline, and open exceptions.",
            },
            {
              cmd: "/thg leads",
              desc: "Recent trade enquiries with 1-click Contacted, Qualify, and Convert Client action buttons.",
            },
            {
              cmd: "/thg builds",
              desc: "Current 14-day SLA delivery status across all active trade projects in flight.",
            },
            {
              cmd: "/thg approvals",
              desc: "Outstanding founder sign-offs (staged preview sign-off, custom proposals, DNS cutover).",
            },
            {
              cmd: "/thg retry",
              desc: "Reset and re-queue any stuck background automation or notification outbox jobs immediately.",
            },
            {
              cmd: "/thg help",
              desc: "Show interactive reference palette and system endpoints.",
            },
          ].map((item) => (
            <div
              key={item.cmd}
              className="flex items-start gap-3 rounded-lg border border-ink/10 bg-white p-3 shadow-2xs"
            >
              <code className="shrink-0 rounded bg-ink px-2 py-1 text-xs font-bold text-white">
                {item.cmd}
              </code>
              <p className="text-xs text-ink-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
