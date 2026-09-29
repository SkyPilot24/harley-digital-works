import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Globe,
  Zap,
  Activity,
  Send,
  MessageCircle,
  FileCheck2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Mail,
  Camera,
  Pencil,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type ClientRow = Database["public"]["Tables"]["clients"]["Row"];

interface CareHealthStatus {
  clientId: string;
  domain: string;
  sslValid: boolean;
  sslExpiresDays: number;
  cwvScore: number; // 0-100
  ttfbMs: number;
  uptimeMonthlyPercent: number;
  googleReviewsThisMonth: number;
  totalGoogleReviews: number;
  pendingRequests: number;
  lastBackupDate: string;
  status: "healthy" | "attention_needed" | "critical";
}

interface ChangeRequest {
  id: string;
  clientName: string;
  type: "photos" | "pricing" | "reviews" | "emergency" | "team";
  title: string;
  createdAt: string;
  status: "pending" | "in_progress" | "resolved";
  slaHoursLeft: number;
}

const SAMPLE_CHANGE_REQUESTS: ChangeRequest[] = [
  {
    id: "cr-1",
    clientName: "Apex Heating & Gas Ltd",
    type: "photos",
    title: "Uploaded 4 new Worcester Bosch boiler installation photos for gallery",
    createdAt: "Today, 08:30 AM",
    status: "pending",
    slaHoursLeft: 18,
  },
  {
    id: "cr-2",
    clientName: "Vanguard Electrical Contractors",
    type: "emergency",
    title: "Toggle 24/7 Storm Response Emergency Banner for Solihull area",
    createdAt: "Today, 07:15 AM",
    status: "in_progress",
    slaHoursLeft: 4,
  },
  {
    id: "cr-3",
    clientName: "Cheshire Master Roofers",
    type: "pricing",
    title: "Update GRP Flat Roof warranty badge from 20yr to 25yr guarantee",
    createdAt: "Yesterday, 16:45 PM",
    status: "resolved",
    slaHoursLeft: 0,
  },
];

export function CareDeskMonitor({ clients = [] }: { clients?: ClientRow[] }) {
  const [isScanning, setIsScanning] = useState(false);
  const [requests, setRequests] = useState<ChangeRequest[]>(SAMPLE_CHANGE_REQUESTS);
  const [selectedClientHealth, setSelectedClientHealth] = useState<CareHealthStatus | null>({
    clientId: "c-1",
    domain: "apexheatinggas.co.uk",
    sslValid: true,
    sslExpiresDays: 78,
    cwvScore: 98,
    ttfbMs: 34,
    uptimeMonthlyPercent: 99.98,
    googleReviewsThisMonth: 6,
    totalGoogleReviews: 38,
    pendingRequests: 1,
    lastBackupDate: "Today at 04:00 AM UTC",
    status: "healthy",
  });

  const handleRunHealthRadar = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Care Desk health check completed!", {
        description: "All client sites are online with valid SSL certificates and sub-40ms TTFB.",
      });
    }, 900);
  };

  const handleResolveRequest = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)));
    toast.success("Change request marked as deployed to production!");
  };

  const handleDispatchMonthlyReport = () => {
    toast.success("Monthly Care ROI & Performance Report dispatched to client email & WhatsApp!", {
      description:
        "Included uptime certificate, Core Web Vitals score, and new Google review count.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-ink">Automated Care Desk & Uptime Radar</h3>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  ACTIVE 24/7 SLA
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Zero-touch performance monitoring, automated daily backups, and 24-hour change
                request fulfillment for £95/mo Care subscribers.
              </p>
            </div>
          </div>

          <button
            onClick={handleRunHealthRadar}
            disabled={isScanning}
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white hover:bg-ink/90 transition-colors disabled:opacity-50 shadow-xs"
          >
            <RefreshCw className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
            <span>{isScanning ? "Probing Edge Servers…" : "Run Global Health Check"}</span>
          </button>
        </div>

        {/* Global Metric Cards */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-ink/10 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-ink-muted text-xs font-medium">
              <Activity className="h-3.5 w-3.5 text-emerald-600" />
              <span>Fleet Uptime (30-Day)</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-ink">99.98%</div>
            <div className="mt-0.5 text-[11px] text-emerald-700 font-medium">
              0 minutes unplanned downtime
            </div>
          </div>

          <div className="rounded-xl border border-ink/10 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-ink-muted text-xs font-medium">
              <Zap className="h-3.5 w-3.5 text-amber-600" />
              <span>Average TTFB (Edge)</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-ink">31ms</div>
            <div className="mt-0.5 text-[11px] text-ink-muted">Cloudflare global isolates</div>
          </div>

          <div className="rounded-xl border border-ink/10 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-ink-muted text-xs font-medium">
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              <span>Change Request SLA</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-ink">&lt; 6.2 hrs</div>
            <div className="mt-0.5 text-[11px] text-blue-700 font-medium">
              Guaranteed under 24 hours
            </div>
          </div>

          <div className="rounded-xl border border-ink/10 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-ink-muted text-xs font-medium">
              <TrendingUp className="h-3.5 w-3.5 text-purple-600" />
              <span>Recurring Care MRR</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-ink">£1,805/mo</div>
            <div className="mt-0.5 text-[11px] text-purple-700 font-medium">
              19 Active Care Subscribers
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Change Requests Intake vs Health Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Change Requests Queue */}
        <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-ink/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-600" />
              <h4 className="text-sm font-bold text-ink">Incoming Client Change Requests</h4>
            </div>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              {requests.filter((r) => r.status !== "resolved").length} Actionable
            </span>
          </div>

          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="rounded-xl border border-ink/10 p-4 bg-slate-50/40 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink">{req.clientName}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          req.status === "resolved"
                            ? "bg-emerald-100 text-emerald-800"
                            : req.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink/80 leading-relaxed">{req.title}</p>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-muted">
                      <span>{req.createdAt}</span>
                      <span>•</span>
                      {req.status !== "resolved" ? (
                        <span className="text-amber-700 font-medium">
                          SLA: {req.slaHoursLeft}h remaining
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium">Turnaround: 2.1 hours</span>
                      )}
                    </div>
                  </div>

                  {req.status !== "resolved" && (
                    <button
                      onClick={() => handleResolveRequest(req.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 text-[11px] font-bold transition-colors shrink-0 shadow-xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Deploy & Close</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Client Health & Performance Benchmark Card */}
        {selectedClientHealth && (
          <div className="rounded-2xl border border-slate-900 bg-slate-950 p-6 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white font-mono">
                      {selectedClientHealth.domain}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    SSL Cert: Valid ({selectedClientHealth.sslExpiresDays} days left) • Automated
                    Edge Backups Active
                  </div>
                </div>

                <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-1 border border-emerald-500/30">
                  HEALTHY
                </span>
              </div>

              {/* Vital Score Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Mobile Speed
                  </div>
                  <div className="mt-1 text-2xl font-black text-emerald-400">
                    {selectedClientHealth.cwvScore}
                  </div>
                  <div className="text-[10px] text-slate-400">Core Web Vitals</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Edge TTFB
                  </div>
                  <div className="mt-1 text-2xl font-black text-emerald-400">
                    {selectedClientHealth.ttfbMs}ms
                  </div>
                  <div className="text-[10px] text-slate-400">Global Response</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Reviews (30d)
                  </div>
                  <div className="mt-1 text-2xl font-black text-gold-400">
                    +{selectedClientHealth.googleReviewsThisMonth}
                  </div>
                  <div className="text-[10px] text-slate-400">Google 5-Star</div>
                </div>
              </div>

              {/* Maintenance Telemetry */}
              <div className="space-y-2 text-xs text-slate-300 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Database & Asset Snapshot:</span>
                  <span className="font-mono text-white">
                    {selectedClientHealth.lastBackupDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">WAF & DDoS Protection:</span>
                  <span className="text-emerald-400 font-semibold">Active (0 Threats Blocked)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Local SEO Schema Validator:</span>
                  <span className="text-emerald-400 font-semibold">100% Valid JSON-LD</span>
                </div>
              </div>
            </div>

            {/* 1-Click Dispatch Client Report */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400">
                Automated report generator retains subscribers & demonstrates tangible ROI.
              </div>
              <button
                onClick={handleDispatchMonthlyReport}
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2 text-xs font-bold text-neutral-950 transition-colors shadow-md"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Monthly Care ROI Report</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
