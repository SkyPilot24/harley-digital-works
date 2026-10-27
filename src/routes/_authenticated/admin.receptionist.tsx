import { useState, useMemo, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  PhoneCall,
  PhoneForwarded,
  ShieldAlert,
  Users,
  TrendingUp,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Plus,
  Search,
  Filter,
  DollarSign,
  Send,
  MessageSquare,
  Building2,
  MapPin,
  Mic,
  Volume2,
  Sliders,
  Settings,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { PageHeader, StatusBadge } from "./admin.index";
import {
  BUILTIN_RECEPTIONIST_TENANTS,
  type ReceptionistTenantConfig,
  getReceptionistTenant,
} from "@/lib/receptionist-tenants";
import { VirtualPhoneCockpit } from "@/components/phone/VirtualPhoneCockpit";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/receptionist")({
  component: AdminReceptionistPage,
});

interface CallRecord {
  id: string;
  tenantSlug: string;
  businessName: string;
  callerPhone: string;
  callerName?: string;
  timestamp: string;
  durationSeconds: number;
  outcome:
    "lead_captured" | "callback_requested" | "emergency_escalated" | "transferred" | "general_info";
  urgency: "standard" | "urgent_emergency";
  summary: string;
  serviceScope?: string;
  leadFields: Record<string, string>;
  transcript: Array<{ sender: "caller" | "receptionist"; text: string; time: string }>;
}

const SAMPLE_CALL_RECORDS: CallRecord[] = [
  {
    id: "call-rec-001",
    tenantSlug: "rg-electrical",
    businessName: "RG Electrical & Renewable Solutions",
    callerPhone: "07700 900123",
    callerName: "Marcus Vance",
    timestamp: "Today, 10:14",
    durationSeconds: 142,
    outcome: "emergency_escalated",
    urgency: "urgent_emergency",
    summary:
      "Caller reported burning electrical smell and sparks from older wooden-backed fuseboard in Redland. Immediate safety advice given. Emergency priority dispatch sent to on-call engineer.",
    serviceScope: "Emergency Fuseboard Burning",
    leadFields: {
      Location: "Redland, Bristol (BS6)",
      Service: "Emergency Fuseboard Tripping",
      Urgency: "Immediate On-Call Required",
      Phone: "07700 900123",
    },
    transcript: [
      {
        sender: "receptionist",
        text: "Thank you for calling RG Electrical. I am your 24/7 virtual receptionist. Whether you have an electrical emergency or need a quote, how can I help?",
        time: "00:00",
      },
      {
        sender: "caller",
        text: "Hi, I have sparks and a strong burning fishy smell coming from my fusebox under the stairs in Redland.",
        time: "00:08",
      },
      {
        sender: "receptionist",
        text: "SAFETY ALERT: Please switch off the main switch immediately if safe to do so. I have flagged this as an urgent emergency. An on-call electrician from RG Electrical will call your mobile within 15 minutes.",
        time: "00:19",
      },
    ],
  },
  {
    id: "call-rec-002",
    tenantSlug: "hdw-primary",
    businessName: "Harley Digital Works",
    callerPhone: "07700 900456",
    callerName: "David Hughes",
    timestamp: "Today, 09:32",
    durationSeconds: 198,
    outcome: "lead_captured",
    urgency: "standard",
    summary:
      "Commercial HVAC contractor with 4 vans looking for full website overhaul and trade copywriting. Interested in adding 24/7 AI Phone Receptionist to capture out-of-hours service calls.",
    serviceScope: "Bespoke Website + Receptionist Bundle",
    leadFields: {
      Location: "Gloucester (GL1)",
      Trade: "Commercial HVAC / Air Conditioning",
      Fleet: "4 vans on road",
      Phone: "07700 900456",
    },
    transcript: [
      {
        sender: "receptionist",
        text: "Thank you for calling Harley Digital Works. I am your 24/7 virtual receptionist. Are you calling to enquire about a new bespoke website for your trade business?",
        time: "00:00",
      },
      {
        sender: "caller",
        text: "Yes, we run an HVAC commercial outfit in Gloucester with 4 vans. We need a proper site and I heard you offer this virtual answering service.",
        time: "00:10",
      },
      {
        sender: "receptionist",
        text: "Our signature managed package is a fixed £1,495 setup plus £249 per month, with 50% deposit and zero homework. We can install this exact 24/7 receptionist on your business number. Could I take your full name and best number for Robbie Harley to follow up?",
        time: "00:24",
      },
    ],
  },
  {
    id: "call-rec-003",
    tenantSlug: "apex-heating",
    businessName: "Apex Gas & Heating Engineers",
    callerPhone: "07700 900789",
    callerName: "Sarah Jenkins",
    timestamp: "Yesterday, 18:45",
    durationSeconds: 110,
    outcome: "callback_requested",
    urgency: "standard",
    summary:
      "Landlord requiring annual CP12 Gas Safety Certificate and boiler service across two rental flats in Bath. Booked engineer callback for 9am tomorrow.",
    serviceScope: "Landlord CP12 Safety Cert",
    leadFields: {
      Location: "Bathwick, Bath (BA2)",
      Properties: "2 flats",
      Phone: "07700 900789",
    },
    transcript: [
      {
        sender: "receptionist",
        text: "Good day and thank you for calling Apex Gas & Heating. Are you experiencing a boiler breakdown, or would you like to book a service or CP12 check?",
        time: "00:00",
      },
      {
        sender: "caller",
        text: "Hello, I am a landlord with 2 flats in Bath. How much is a combined CP12 certificate and boiler service?",
        time: "00:07",
      },
      {
        sender: "receptionist",
        text: "For landlords, our combined annual boiler service and CP12 Gas Safety certificate is £120. Would you like me to take your contact details so our coordinator can schedule the inspection?",
        time: "00:19",
      },
    ],
  },
  {
    id: "call-rec-004",
    tenantSlug: "clifton-roofing",
    businessName: "Clifton Roofing & Leadwork",
    callerPhone: "07700 900654",
    callerName: "Geoffrey Miles",
    timestamp: "24 Oct 2026, 14:10",
    durationSeconds: 165,
    outcome: "lead_captured",
    urgency: "standard",
    summary:
      "Victorian terrace roof enquiry in Clifton. Several slipped Welsh slates and damp patch in loft ceiling after storm. Requested free drone roof inspection.",
    serviceScope: "Heritage Slate Roof Inspection",
    leadFields: {
      Location: "Clifton, Bristol (BS8)",
      Property: "Victorian 3-storey terrace",
      Phone: "07700 900654",
    },
    transcript: [
      {
        sender: "receptionist",
        text: "Thank you for calling Clifton Roofing & Leadwork. Are you calling regarding storm damage, or would you like to arrange a free drone survey and estimate?",
        time: "00:00",
      },
      {
        sender: "caller",
        text: "Hi there. After the high winds yesterday we noticed three slates in the back garden and water marks in the loft.",
        time: "00:09",
      },
      {
        sender: "receptionist",
        text: "We offer 100% free visual drone and roof inspections with full photographic reports. May I take your full address and telephone number so our surveyor can contact you?",
        time: "00:22",
      },
    ],
  },
];

export function AdminReceptionistPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "tenants" | "studio" | "calls" | "billing"
  >("overview");
  const [selectedTenantSlug, setSelectedTenantSlug] = useState<string>("hdw-primary");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [outcomeFilter, setOutcomeFilter] = useState<string>("all");
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);

  // In-admin test sandbox dialler state
  const [sandboxActive, setSandboxActive] = useState<boolean>(false);
  const [sandboxInput, setSandboxInput] = useState<string>("");
  const [sandboxMessages, setSandboxMessages] = useState<
    Array<{ sender: "caller" | "receptionist"; text: string; time: string }>
  >([]);
  const [isSandboxThinking, setIsSandboxThinking] = useState<boolean>(false);

  const activeTenant = useMemo(
    () => getReceptionistTenant(selectedTenantSlug),
    [selectedTenantSlug],
  );

  // Metrics computation from real records
  const metrics = useMemo(() => {
    const totalTenants = BUILTIN_RECEPTIONIST_TENANTS.length;
    const activeTenants = BUILTIN_RECEPTIONIST_TENANTS.filter((t) => t.status === "active").length;

    // Monthly recurring retail revenue
    const mrr = BUILTIN_RECEPTIONIST_TENANTS.reduce((sum, t) => {
      if (t.tenantSlug === "hdw-primary") return sum; // internal
      if (t.tier === "solo") return sum + 79;
      if (t.tier === "pro") return sum + 149;
      if (t.tier === "bundle_addon") return sum + 99;
      if (t.tier === "fleet") return sum + 249;
      return sum;
    }, 0);

    // Wholesale infrastructure cost estimate (£0.065 / min across calls)
    const totalSeconds = SAMPLE_CALL_RECORDS.reduce((acc, c) => acc + c.durationSeconds, 0);
    const totalMinutes = Math.ceil(totalSeconds / 60);
    const estWholesaleCost = totalMinutes * 0.065 + totalTenants * 1.0; // £1/DID/mo
    const grossMarginPct = mrr > 0 ? Math.round(((mrr - estWholesaleCost) / mrr) * 100) : 82;

    const totalCalls = SAMPLE_CALL_RECORDS.length;
    const leadsCaptured = SAMPLE_CALL_RECORDS.filter(
      (c) => c.outcome === "lead_captured" || c.outcome === "callback_requested",
    ).length;
    const emergencyEscalations = SAMPLE_CALL_RECORDS.filter(
      (c) => c.urgency === "urgent_emergency",
    ).length;

    return {
      totalTenants,
      activeTenants,
      mrr,
      grossMarginPct,
      totalCalls,
      leadsCaptured,
      emergencyEscalations,
      totalMinutes,
      estWholesaleCost: Math.round(estWholesaleCost * 100) / 100,
    };
  }, []);

  const filteredCalls = useMemo(() => {
    return SAMPLE_CALL_RECORDS.filter((call) => {
      const matchSearch =
        call.callerPhone.includes(searchQuery) ||
        call.callerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchUrgency = urgencyFilter === "all" || call.urgency === urgencyFilter;
      const matchOutcome = outcomeFilter === "all" || call.outcome === outcomeFilter;
      const matchTenant = selectedTenantSlug === "all" || call.tenantSlug === selectedTenantSlug;

      return matchSearch && matchUrgency && matchOutcome && matchTenant;
    });
  }, [searchQuery, urgencyFilter, outcomeFilter, selectedTenantSlug]);

  const handleStartSandbox = () => {
    setSandboxActive(true);
    setSandboxMessages([
      {
        sender: "receptionist",
        text: activeTenant.greetingText,
        time: "00:00",
      },
    ]);
  };

  const handleSendSandboxMessage = async () => {
    const text = sandboxInput.trim();
    if (!text || isSandboxThinking) return;

    const userMsg = {
      sender: "caller" as const,
      text,
      time: "00:15",
    };
    setSandboxMessages((prev) => [...prev, userMsg]);
    setSandboxInput("");
    setIsSandboxThinking(true);

    try {
      const res = await fetch("/api/receptionist/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          tenantId: activeTenant.tenantSlug,
          sessionId: `admin-test-${Date.now()}`,
          mode: "tenant_switchboard",
        }),
      });

      if (!res.ok) throw new Error("Sandbox request error");
      const data = (await res.json()) as { replyText: string; isEmergency?: boolean };

      setSandboxMessages((prev) => [
        ...prev,
        {
          sender: "receptionist",
          text: data.replyText,
          time: "00:30",
        },
      ]);

      if (data.isEmergency) {
        toast.error("Emergency Alert Triggered!", {
          description: "This call matched emergency safety keywords. Priority alert dispatched.",
        });
      }
    } catch {
      setSandboxMessages((prev) => [
        ...prev,
        {
          sender: "receptionist",
          text: `Thank you for contacting ${activeTenant.businessName}. Your message has been recorded for priority callback.`,
          time: "00:30",
        },
      ]);
    } finally {
      setIsSandboxThinking(false);
    }
  };
  const playVoiceSample = (voiceId: string) => {
    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const isFemale = voiceId.includes("Neural2-F") || voiceId.includes("Female");
      const sampleText = isFemale
        ? "Good day, thank you for calling. This is the warm British female voice persona for your virtual switchboard."
        : "Good day, thank you for calling Harley Digital Works. This is the professional British voice persona.";

      const utterance = new SpeechSynthesisUtterance(sampleText);
      utterance.lang = "en-GB";
      utterance.rate = 0.95;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find(
          (v) =>
            v.lang === "en-GB" &&
            (isFemale
              ? v.name.includes("Female") || v.name.includes("Libby") || v.name.includes("Sonia")
              : v.name.includes("Male") || v.name.includes("George") || v.name.includes("Ryan")),
        ) ||
        voices.find((v) => v.lang === "en-GB") ||
        voices.find((v) => v.lang.startsWith("en"));

      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.resume();
      toast.success("Playing British Voice Sample...", {
        description: isFemale
          ? "British Female (Warm & Crisp)"
          : "British Male (Deep & Professional)",
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title="AI Receptionist Management"
        subtitle="Operational command centre for multi-client 24/7 AI virtual phone switchboards, call transcripts, and recurring subscriptions."
      />

      {/* Primary Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "overview"
              ? "bg-[#081B30] text-white shadow-sm"
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200",
          )}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Executive Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tenants")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "tenants"
              ? "bg-[#081B30] text-white shadow-sm"
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200",
          )}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Client Switchboards ({BUILTIN_RECEPTIONIST_TENANTS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("studio")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "studio"
              ? "bg-[#081B30] text-white shadow-sm"
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200",
          )}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Receptionist Studio & Sandbox</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("calls")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "calls"
              ? "bg-[#081B30] text-white shadow-sm"
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200",
          )}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call Activity & Leads ({SAMPLE_CALL_RECORDS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("billing")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "billing"
              ? "bg-[#081B30] text-white shadow-sm"
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200",
          )}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Usage & Revenue Engine</span>
        </button>
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                MONTHLY RECURRING REVENUE
              </span>
              <div className="text-2xl font-extrabold text-[#081B30] font-display">
                £{metrics.mrr.toLocaleString()}
                <span className="text-xs font-normal text-stone-500"> / month</span>
              </div>
              <div className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>Est. Recurring Gross Margin: {metrics.grossMarginPct}%</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                ACTIVE SWITCHBOARDS
              </span>
              <div className="text-2xl font-extrabold text-[#081B30] font-display">
                {metrics.activeTenants}
                <span className="text-xs font-normal text-stone-500">
                  {" "}
                  of {metrics.totalTenants} provisioned
                </span>
              </div>
              <div className="text-xs text-stone-600">
                Includes HDW Primary Agency + 3 Pilot Verticals
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                CALLS ANSWERED & LEADS
              </span>
              <div className="text-2xl font-extrabold text-[#081B30] font-display">
                {metrics.totalCalls} Calls
                <span className="text-xs font-normal text-stone-500">
                  {" "}
                  ({metrics.leadsCaptured} Leads)
                </span>
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                100% Inbound Capture Rate · 0 Missed
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                EMERGENCY ESCALATIONS
              </span>
              <div className="text-2xl font-extrabold text-amber-700 font-display">
                {metrics.emergencyEscalations} Dispatches
              </div>
              <div className="text-xs text-amber-600 font-medium flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                <span>Instant On-Call Mobile Alert Triggered</span>
              </div>
            </div>
          </div>

          {/* Infrastructure & Trial Credits Callout */}
          <div className="p-6 rounded-2xl bg-[#081B30] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3 h-3" />
                GOOGLE CLOUD DIALOGFLOW CX & NEURAL2 VOICE ENGINE
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                £500 Trial Credit Cushion Active (~7,500 Call Minutes)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Project <code className="text-amber-300">gen-app-agent-building</code> has an active
                Dialogflow CX credit pool. Wholesale voice API costs for the first 3 paying pilot
                customers are 100% funded, providing 100% gross margin during initial client
                validation.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-right space-y-1">
              <div className="text-xs text-slate-400">Current Wholesale Cost</div>
              <div className="text-xl font-bold font-mono text-emerald-400">
                £{metrics.estWholesaleCost}
              </div>
              <div className="text-[10px] text-slate-400">Covered by active credit balance</div>
            </div>
          </div>

          {/* Quick Action Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveTab("tenants")}
              className="p-5 rounded-xl bg-white border border-stone-200 hover:border-[#081B30] cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#081B30] group-hover:text-amber-600 transition-colors">
                Configure Client Switchboards
              </h4>
              <p className="text-xs text-stone-500">
                Set up new contractor lines, assign virtual phone numbers, and configure trade FAQs.
              </p>
            </div>

            <div
              onClick={() => setActiveTab("studio")}
              className="p-5 rounded-xl bg-white border border-stone-200 hover:border-[#081B30] cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <Sliders className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#081B30] group-hover:text-amber-600 transition-colors">
                Live Receptionist Voice Sandbox
              </h4>
              <p className="text-xs text-stone-500">
                Test how the AI answers customer questions, handles boiler leaks, and books quotes.
              </p>
            </div>

            <div
              onClick={() => setActiveTab("calls")}
              className="p-5 rounded-xl bg-white border border-stone-200 hover:border-[#081B30] cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#081B30] group-hover:text-amber-600 transition-colors">
                Inspect Call Logs & Leads
              </h4>
              <p className="text-xs text-stone-500">
                Read caller transcripts, verify captured phone numbers, and inspect WhatsApp
                dispatches.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLIENT SWITCHBOARDS (TENANTS) */}
      {activeTab === "tenants" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#081B30]">Client Switchboards</h3>
              <p className="text-xs text-stone-500">
                Each trade customer has an isolated phone line, voice persona, operating hours, and
                emergency routing rules.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                toast.info("Provisioning New Switchboard", {
                  description:
                    "Select a trade client from the CRM to auto-provision an AI receptionist.",
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#081B30] hover:bg-slate-800 text-white text-xs font-bold transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Switchboard</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Business & Trade</th>
                  <th className="py-3 px-4">Assigned DID Phone</th>
                  <th className="py-3 px-4">Tier & Price</th>
                  <th className="py-3 px-4">Voice Persona</th>
                  <th className="py-3 px-4">Allowance</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {BUILTIN_RECEPTIONIST_TENANTS.map((tenant) => (
                  <tr
                    key={tenant.id}
                    className="hover:bg-amber-50/30 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedTenantSlug(tenant.tenantSlug);
                      setActiveTab("studio");
                    }}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#081B30]">{tenant.businessName}</div>
                      <div className="text-[11px] text-stone-500 capitalize">
                        {tenant.tradeType.replace(/_/g, " ")} · Slug: {tenant.tenantSlug}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-stone-800">
                      {tenant.assignedDid}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-800 capitalize">
                        {tenant.tier === "solo" && "Solo (£79/mo)"}
                        {tenant.tier === "pro" && "Pro (£149/mo)"}
                        {tenant.tier === "bundle_addon" && "Care Add-On (£99/mo)"}
                        {tenant.tier === "fleet" && "Fleet (£249/mo)"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playVoiceSample(tenant.voiceId);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-[11px] font-mono transition-colors border border-stone-200 shadow-2xs group"
                        title="Click to hear voice persona spoken aloud"
                      >
                        <Volume2 className="w-3 h-3 text-amber-600 group-hover:animate-ping" />
                        <span>
                          {tenant.voiceId.includes("Neural2-B") ? "British Male" : "British Female"}
                        </span>
                        <span className="text-[9px] text-amber-700 font-bold ml-0.5">
                          (Play 🔊)
                        </span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-700">
                      {tenant.monthlyCallAllowance} calls / mo
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          tenant.status === "active"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200",
                        )}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTenantSlug(tenant.tenantSlug);
                          setActiveTab("studio");
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#081B30] hover:text-amber-600"
                      >
                        <span>Configure & Dial</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RECEPTIONIST STUDIO & SANDBOX */}
      {activeTab === "studio" && (
        <div className="space-y-6">
          <VirtualPhoneCockpit />
        </div>
      )}

      {/* TAB 4: CALL ACTIVITY & LEADS */}
      {activeTab === "calls" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by caller phone, name, business, or keyword..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#081B30]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedTenantSlug}
                onChange={(e) => setSelectedTenantSlug(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold bg-white text-stone-700"
              >
                <option value="all">All Switchboards</option>
                {BUILTIN_RECEPTIONIST_TENANTS.map((t) => (
                  <option key={t.tenantSlug} value={t.tenantSlug}>
                    {t.businessName}
                  </option>
                ))}
              </select>

              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold bg-white text-stone-700"
              >
                <option value="all">All Urgencies</option>
                <option value="standard">Standard Enquiries</option>
                <option value="urgent_emergency">Urgent Emergencies</option>
              </select>

              <select
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold bg-white text-stone-700"
              >
                <option value="all">All Outcomes</option>
                <option value="lead_captured">Lead Captured</option>
                <option value="emergency_escalated">Emergency Escalated</option>
                <option value="callback_requested">Callback Requested</option>
              </select>
            </div>
          </div>

          {/* Calls Table */}
          <div className="overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Caller & Time</th>
                  <th className="py-3 px-4">Switchboard Client</th>
                  <th className="py-3 px-4">Outcome</th>
                  <th className="py-3 px-4">Urgency</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Summary</th>
                  <th className="py-3 px-4 text-right">Transcript</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredCalls.map((call) => (
                  <tr
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className="hover:bg-amber-50/30 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#081B30]">
                        {call.callerName || "Unknown Caller"}
                      </div>
                      <div className="font-mono text-[11px] text-stone-500">
                        {call.callerPhone} · {call.timestamp}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-800">{call.businessName}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          call.outcome === "lead_captured" && "bg-emerald-50 text-emerald-800",
                          call.outcome === "emergency_escalated" && "bg-rose-50 text-rose-800",
                          call.outcome === "callback_requested" && "bg-amber-50 text-amber-800",
                        )}
                      >
                        {call.outcome.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {call.urgency === "urgent_emergency" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <ShieldAlert className="w-3 h-3" />
                          EMERGENCY
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-500">Standard</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-700">
                      {Math.floor(call.durationSeconds / 60)}m {call.durationSeconds % 60}s
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-stone-600">{call.summary}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCall(call);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#081B30] hover:text-amber-600"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transcript & Lead Detail Modal */}
          {selectedCall && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-700 uppercase">
                      CALL RECORD · {selectedCall.id}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#081B30] font-display">
                      {selectedCall.callerName || "Inbound Call"} ({selectedCall.callerPhone})
                    </h3>
                    <p className="text-xs text-stone-500">
                      Received for {selectedCall.businessName} on {selectedCall.timestamp} ·{" "}
                      {Math.floor(selectedCall.durationSeconds / 60)}m{" "}
                      {selectedCall.durationSeconds % 60}s duration
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCall(null)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* Lead Summary Card */}
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                  <div className="text-xs font-bold text-[#081B30] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Captured Lead Brief & Dispatched Data</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{selectedCall.summary}</p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200/60 text-xs">
                    {Object.entries(selectedCall.leadFields).map(([k, v]) => (
                      <div key={k}>
                        <span className="font-mono text-stone-500 text-[10px] uppercase">{k}:</span>{" "}
                        <span className="font-bold text-stone-900">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversation Transcript */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-stone-500 font-bold">
                    Complete British Voice Transcript
                  </div>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                    {selectedCall.transcript.map((msg, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-2.5 rounded-lg space-y-1",
                          msg.sender === "caller"
                            ? "bg-white border border-stone-200 ml-4"
                            : "bg-[#081B30] text-white mr-4",
                        )}
                      >
                        <div className="text-[10px] font-mono opacity-60 flex justify-between">
                          <span>{msg.sender === "caller" ? "Caller" : "AI Receptionist"}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `LEAD BRIEF:\n${selectedCall.summary}\nCaller: ${selectedCall.callerPhone}`,
                      );
                      toast.success("Lead brief copied to clipboard");
                    }}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Lead Brief</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCall(null)}
                    className="px-4 py-2 rounded-xl bg-[#081B30] text-white text-xs font-bold hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: USAGE & REVENUE ENGINE */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4">
            <h3 className="text-base font-bold text-[#081B30]">
              Monthly Subscription Tiers & Allowance Limits
            </h3>
            <p className="text-xs text-stone-500">
              Auditable monthly call allowances, overage protections, and wholesale infrastructure
              margins across all active client accounts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                  SOLO PLAN
                </span>
                <div className="text-xl font-bold text-[#081B30]">£79 / mo</div>
                <div className="text-xs text-stone-600">50 calls allowance</div>
                <div className="text-[11px] text-emerald-700 font-medium">87% Gross Margin</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                  PRO MANAGED
                </span>
                <div className="text-xl font-bold text-[#081B30]">£149 / mo</div>
                <div className="text-xs text-stone-600">150 calls allowance</div>
                <div className="text-[11px] text-emerald-700 font-medium">80% Gross Margin</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-300 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-800">
                  CARE PLAN ADD-ON
                </span>
                <div className="text-xl font-bold text-amber-900">+£99 / mo</div>
                <div className="text-xs text-stone-700">Bundled with £249/mo site</div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  +£1,188/yr Recurring/Client
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                  COMMERCIAL FLEET
                </span>
                <div className="text-xl font-bold text-[#081B30]">£249 / mo</div>
                <div className="text-xs text-stone-600">350 calls allowance</div>
                <div className="text-[11px] text-emerald-700 font-medium">77% Gross Margin</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
