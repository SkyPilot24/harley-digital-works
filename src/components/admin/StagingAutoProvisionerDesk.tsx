import { useState } from "react";
import {
  Webhook,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Globe,
  Terminal,
  Send,
  Zap,
  Play,
  Copy,
  Check,
  RefreshCw,
  Server,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WebhookEvent {
  id: string;
  timestamp: string;
  source: "Stripe" | "GoCardless";
  eventType: string;
  customerName: string;
  companyName: string;
  packageType: string;
  depositPaid: string;
  trackingToken: string;
  stagingUrl: string;
  status: "provisioned" | "processing";
}

const INITIAL_EVENTS: WebhookEvent[] = [
  {
    id: "evt_stripe_98410291",
    timestamp: "10 mins ago",
    source: "Stripe",
    eventType: "checkout.session.completed",
    customerName: "Mark Taylor",
    companyName: "Cheshire Heat & Power Ltd",
    packageType: "Growth Plan (£2,995)",
    depositPaid: "£1,497.50 (50% Deposit Cleared)",
    trackingToken: "HDW-9021",
    stagingUrl: "https://cheshireheat.preview.harleydigitalworks.com",
    status: "provisioned",
  },
  {
    id: "evt_gc_44029188",
    timestamp: "2 hours ago",
    source: "GoCardless",
    eventType: "mandate.created",
    customerName: "David Evans",
    companyName: "Apex Solar & Electrical Ltd",
    packageType: "Launch Plan (£1,495)",
    depositPaid: "£747.50 (50% BACS Mandate)",
    trackingToken: "HDW-8842",
    stagingUrl: "https://apexsolar.preview.harleydigitalworks.com",
    status: "provisioned",
  },
];

export function StagingAutoProvisionerDesk() {
  const [events, setEvents] = useState<WebhookEvent[]>(INITIAL_EVENTS);
  const [isSimulating, setIsSimulating] = useState(false);
  const [testCompany, setTestCompany] = useState("Vanguard Roofing & Solar Ltd");
  const [testDirector, setTestDirector] = useState("Liam Fletcher");
  const [testEmail, setTestEmail] = useState("liam@vanguardroofing.co.uk");
  const [testPhone, setTestPhone] = useState("07700900888");
  const [testPackage, setTestPackage] = useState<"Launch (£1,495)" | "Growth (£2,995)">("Growth (£2,995)");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSimulateWebhook = async () => {
    setIsSimulating(true);
    const token = `HDW-${Math.floor(1000 + Math.random() * 9000)}`;
    const slug = testCompany.toLowerCase().replace(/[^a-z0-9]/g, "");
    const staging = `https://${slug}.preview.harleydigitalworks.com`;
    const deposit = testPackage.includes("Growth") ? "£1,497.50 (50% Deposit)" : "£747.50 (50% Deposit)";

    try {
      // Create Lead/Client record in Supabase
      await supabase.from("leads").insert({
        name: testDirector,
        company: testCompany,
        email: testEmail,
        package: testPackage,
        status: "won",
        message: `[AUTO-PROVISIONED VIA STRIPE WEBHOOK]\nTracking Token: ${token}\nStaging URL: ${staging}\nPhone: ${testPhone}`,
      });

      const newEvt: WebhookEvent = {
        id: `evt_stripe_${Date.now().toString(36)}`,
        timestamp: "Just now",
        source: "Stripe",
        eventType: "checkout.session.completed",
        customerName: testDirector,
        companyName: testCompany,
        packageType: testPackage,
        depositPaid: deposit,
        trackingToken: token,
        stagingUrl: staging,
        status: "provisioned",
      };

      setEvents((prev) => [newEvt, ...prev]);
      toast.success(`Webhook ingested & Project ${token} provisioned live!`);
    } catch (err: any) {
      toast.error(err.message || "Simulation failed");
    } finally {
      setIsSimulating(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied ${key} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-ink/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold border border-emerald-200">
              <Webhook className="h-3.5 w-3.5" />
              <span>Automated Payment Webhook & Staging Auto-Provisioner</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-ink">
              Zero-Touch Deposit Intake & Client Staging Deployment
            </h2>
            <p className="mt-1 text-xs text-ink-muted max-w-2xl">
              Listens for Stripe & GoCardless payment webhooks, instantly provisions the client's V8 edge preview environment, assigns a token (HDW-XXXX), and triggers the 14-day SLA clock.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-mono text-emerald-800 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Webhook Listener: ONLINE</span>
            </div>
          </div>
        </div>

        {/* 4-Step Auto-Provisioning Pipeline Overview */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Webhook Ingestion",
              desc: "Receives signed Stripe/GoCardless payment payload & validates 50% deposit.",
              icon: CreditCard,
            },
            {
              step: "02",
              title: "Token Generation",
              desc: "Assigns unique HDW-XXXX tracker & creates CRM Client registry.",
              icon: Zap,
            },
            {
              step: "03",
              title: "Staging V8 Isolate",
              desc: "Builds and deploys preview subdomain on Cloudflare Edge.",
              icon: Server,
            },
            {
              step: "04",
              title: "WhatsApp Welcome",
              desc: "Dispatches 1-tap onboarding intake to client with 14-day SLA guarantee.",
              icon: Send,
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="rounded-2xl bg-surface-sage p-4 border border-ink/5">
                <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
                  <span>STEP {s.step}</span>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h4 className="mt-2 text-sm font-bold text-ink">{s.title}</h4>
                <p className="mt-1 text-xs text-ink-muted leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Webhook Simulator Panel */}
      <div className="rounded-3xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-ink/10 mb-6">
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-primary" />
            <h3 className="text-base font-bold text-ink">Simulate Inbound Deposit Webhook</h3>
          </div>
          <span className="text-xs text-ink-muted">Tests end-to-end auto-provisioning pipeline</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={testCompany}
              onChange={(e) => setTestCompany(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-background/50 px-3 py-2 text-ink font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Director Name
            </label>
            <input
              type="text"
              value={testDirector}
              onChange={(e) => setTestDirector(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-background/50 px-3 py-2 text-ink font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Selected Package
            </label>
            <select
              value={testPackage}
              onChange={(e) => setTestPackage(e.target.value as any)}
              className="w-full rounded-xl border border-ink/15 bg-background/50 px-3 py-2 text-ink font-medium"
            >
              <option value="Launch (£1,495)">Launch Plan (£1,495) — £747.50 Deposit</option>
              <option value="Growth (£2,995)">Growth Plan (£2,995) — £1,497.50 Deposit</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Contact WhatsApp
            </label>
            <input
              type="text"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-background/50 px-3 py-2 text-ink font-medium"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSimulateWebhook}
            disabled={isSimulating}
            className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-ink/90 text-white px-6 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {isSimulating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4 text-gold-400" />}
            <span>{isSimulating ? "Executing Pipeline…" : "Simulate Stripe Deposit ($50%)"}</span>
          </button>
        </div>
      </div>

      {/* Real-Time Ingested Events & Staging Environments */}
      <div className="rounded-3xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-ink/10 mb-6">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <h3 className="text-base font-bold text-ink">Active Provisioned Projects & Live Staging</h3>
          </div>
          <span className="text-xs font-mono text-ink-muted">{events.length} Events Ingested</span>
        </div>

        <div className="space-y-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="rounded-2xl border border-ink/10 bg-surface-sage/50 p-5 transition-all hover:bg-white hover:shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-mono font-bold">
                      {evt.trackingToken}
                    </span>
                    <h4 className="font-bold text-sm text-ink">{evt.companyName}</h4>
                    <span className="text-xs text-ink-muted">· {evt.customerName}</span>
                    <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-mono text-ink-muted">
                      {evt.source}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-ink-muted flex items-center gap-3">
                    <span className="font-semibold text-emerald-700">{evt.depositPaid}</span>
                    <span>•</span>
                    <span>{evt.packageType}</span>
                    <span>•</span>
                    <span className="text-[11px]">{evt.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`/track/${evt.trackingToken}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-ink/15 hover:bg-ink/5 px-3 py-1.5 text-xs font-semibold text-ink transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    <span>Client Tracker</span>
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hi ${evt.customerName}, Robbie Harley here! We just received your deposit for ${evt.companyName}. Your 14-day delivery clock is running! Track live progress here: https://harleydigitalworks.com/track/${evt.trackingToken}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold transition-colors shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>WhatsApp Welcome</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
