import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PhoneCall,
  Calculator,
  ShieldCheck,
  Activity,
  AudioWaveform,
  Brain,
  Gauge,
  BookOpenCheck,
  CheckCircle2,
  Lock,
  Headphones,
  Radio,
  ArrowRight,
  TrendingUp,
  Coins,
  Timer,
  Server,
  Shield,
  RefreshCw,
  FileDown,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { buildPageSeoHead, siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/virtual-receptionist")({
  head: () =>
    buildPageSeoHead({
      title:
        "Autonomous Virtual Assistant (Callum) | Gender-Neutral Voice & Quantified ROI | Harley Digital Works",
      description:
        "The 24/7 Autonomous Receptionist with a natural gender-neutral British voice (158 Hz). Screens calls, qualifies high-value opportunities, and dispatches lead dossiers to WhatsApp in under 30 seconds.",
      path: "/virtual-receptionist",
    }),
  component: VirtualReceptionistPage,
});

type VoiceProfileId = "neutral" | "enterprise" | "concierge";
type ScenarioId = "commercial" | "emergency" | "robocall";

const VOICE_PROFILES: Record<
  VoiceProfileId,
  {
    label: string;
    tag: string;
    speakerHeader: string;
  }
> = {
  neutral: {
    label: "Neutral RP Studio (158 Hz)",
    tag: "158 Hz Median",
    speakerHeader: "CALLUM (158 Hz NEUTRAL VOICE)",
  },
  enterprise: {
    label: "Modern Enterprise Neutral",
    tag: "162 Hz Executive",
    speakerHeader: "CALLUM (MODERN ENTERPRISE NEUTRAL)",
  },
  concierge: {
    label: "Warm Triage Concierge",
    tag: "160 Hz Concierge",
    speakerHeader: "CALLUM (WARM TRIAGE CONCIERGE)",
  },
};

const SCENARIOS: Record<
  ScenarioId,
  {
    label: string;
    badge: string;
    badgeColor: string;
    timer: string;
    elapsed: string;
    dispatchMessage: string;
    turns: {
      role: "assistant" | "caller" | "action";
      speaker: string;
      text: string;
      isAlert?: boolean;
    }[];
    entities: { text: string; highlight?: boolean }[];
  }
> = {
  commercial: {
    label: "Commercial Tender (£18,500)",
    badge: "ACTIVE",
    badgeColor: "text-[#10B981]",
    timer: "00:34 / 00:48",
    elapsed: "12s ELAPSED",
    dispatchMessage: "Instant Lead Dossier Dispatched → Managing Director WhatsApp",
    turns: [
      {
        role: "assistant",
        speaker: "CALLUM (158 Hz NEUTRAL VOICE)",
        text: '"Good morning. Thank you for calling Harley Mechanical Systems. I understand you require an urgent site survey for a 3-phase plant distribution installation in Bristol Central?"',
      },
      {
        role: "caller",
        speaker: "CALLER (COMMERCIAL FACILITIES DIRECTOR — BRISTOL BS1)",
        text: '"Yes, precisely. We have an EV fast-charge commercial rack arriving next Friday and need the main busbar upgraded with certified NICEIC sign-off."',
      },
      {
        role: "action",
        speaker: "CALLUM (EXTRACTION & TRIAGE PROTOCOL)",
        text: '"Confirmed. I have logged the project scope: Commercial 3-Phase Busbar Upgrade with EV Infrastructure. I have matched an engineering survey window for Tuesday at 09:30 and dispatched the full briefing dossier to the director terminal."',
      },
    ],
    entities: [
      { text: "[Verified Postcode: BS1]", highlight: true },
      { text: "[Scope: 3-Phase & EV Hub]" },
      { text: "[Estimated Value: £18,500]", highlight: true },
      { text: "[Urgency: Priority Tender]" },
    ],
  },
  emergency: {
    label: "Out-of-Hours Critical Triage",
    badge: "READY",
    badgeColor: "text-[#d3e4fe]",
    timer: "00:22 / 00:35",
    elapsed: "6s ELAPSED",
    dispatchMessage: "URGENT DISPATCH: Alert Sent to 24/7 Field Engineer Mobile",
    turns: [
      {
        role: "assistant",
        speaker: "CALLUM (CRITICAL OUT-OF-HOURS TRIAGE)",
        text: '"Harley Engineering Emergency Line. You are speaking with Callum. I have isolated your incoming line. Please state if there is active water egress, gas leakage, or total power failure."',
      },
      {
        role: "caller",
        speaker: "CALLER (ESTATE MANAGER // CLIFTON TERRACE)",
        text: '"We have a ruptured 2-inch commercial cold-feed in the basement plant room flooding adjacent electrical risers."',
      },
      {
        role: "action",
        speaker: "CALLUM (IMMEDIATE ESCALATION DISPATCH)",
        text: '"Understood. Immediate priority dispatch initiated. First-call standby engineer notified via priority alert, and the stopcock isolation checklist has been transmitted to your mobile via SMS."',
      },
    ],
    entities: [
      { text: "[Priority: Emergency Callout]", highlight: true },
      { text: "[Location: Clifton BS8]" },
      { text: "[Hazard: Plant Room Water Egress]" },
      { text: "[Status: Standby Engineer Alerted]", highlight: true },
    ],
  },
  robocall: {
    label: "Robocall & Unsolicited Intercept",
    badge: "DEFENCE",
    badgeColor: "text-[#d3e4fe]",
    timer: "00:11 / 00:15",
    elapsed: "4s ELAPSED",
    dispatchMessage: "Shield Active: Call Intercepted and Logged (0s Director Disruption)",
    turns: [
      {
        role: "assistant",
        speaker: "CALLUM (GATEWAY SHIELD PROTOCOL)",
        text: '"Harley Executive Offices. To direct your query appropriately, please state your full name and company entity."',
      },
      {
        role: "caller",
        speaker: "CALLER (UNSOLICITED LEAD TELEMARKETER)",
        text: '"Hi, I\'m calling regarding upgrading your business telecom contracts to reduce monthly broadband expenses..."',
      },
      {
        role: "action",
        speaker: "CALLUM (AUTONOMOUS TELEPHONY TERMINATION)",
        text: '"Our procurement directory is closed to unsolicited outreach under Corporate TPS regulations. This number has been suppressed. Good day."',
        isAlert: true,
      },
    ],
    entities: [
      { text: "[Classification: Unsolicited Sales]", highlight: true },
      { text: "[Director Interruption: 0 sec]" },
      { text: "[Action: Line Suppressed]" },
    ],
  },
};

const WAVEFORM_BARS = [
  { x: 0, y: 12, h: 8 },
  { x: 10, y: 8, h: 16 },
  { x: 20, y: 4, h: 24 },
  { x: 30, y: 10, h: 12 },
  { x: 40, y: 2, h: 28 },
  { x: 50, y: 6, h: 20 },
  { x: 60, y: 14, h: 4 },
  { x: 70, y: 8, h: 16 },
  { x: 80, y: 0, h: 32 },
  { x: 90, y: 6, h: 20 },
  { x: 100, y: 12, h: 8 },
  { x: 110, y: 4, h: 24 },
  { x: 120, y: 10, h: 12 },
  { x: 130, y: 2, h: 28 },
  { x: 140, y: 8, h: 16 },
  { x: 150, y: 12, h: 8 },
  { x: 160, y: 6, h: 20 },
  { x: 170, y: 0, h: 32 },
  { x: 180, y: 10, h: 12 },
  { x: 190, y: 4, h: 24 },
  { x: 200, y: 14, h: 4 },
  { x: 210, y: 6, h: 20 },
  { x: 220, y: 2, h: 28 },
  { x: 230, y: 8, h: 16 },
  { x: 240, y: 12, h: 8 },
  { x: 250, y: 4, h: 24 },
  { x: 260, y: 10, h: 12 },
  { x: 270, y: 0, h: 32 },
  { x: 280, y: 8, h: 16 },
  { x: 290, y: 6, h: 20 },
  { x: 300, y: 12, h: 8 },
  { x: 310, y: 4, h: 24 },
  { x: 320, y: 10, h: 12 },
  { x: 330, y: 2, h: 28 },
  { x: 340, y: 8, h: 16 },
  { x: 350, y: 14, h: 4 },
  { x: 360, y: 6, h: 20 },
  { x: 370, y: 0, h: 32 },
  { x: 380, y: 8, h: 16 },
  { x: 390, y: 12, h: 8 },
];

const BENCHMARK_SECTORS = [
  { label: "M&E / Commercial Trade (£3,500 avg)", calls: 180, value: 3500, missRate: 0.25 },
  { label: "Private Medical & Dental (£650 avg)", calls: 240, value: 650, missRate: 0.2 },
  { label: "High-End Legal & Advisory (£5,000 avg)", calls: 90, value: 5000, missRate: 0.3 },
  {
    label: "Prime Real Estate & Commercial (£12,000 avg)",
    calls: 110,
    value: 12000,
    missRate: 0.25,
  },
];

const MISSED_RATES = [
  { rate: 0.15, pct: "15%", desc: "Low Leakage" },
  { rate: 0.25, pct: "25%", desc: "UK Trade Average" },
  { rate: 0.4, pct: "40%", desc: "High After-Hours" },
];

function VirtualReceptionistPage() {
  const [selectedVoice, setSelectedVoice] = useState<VoiceProfileId>("neutral");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>("commercial");
  const [monthlyCalls, setMonthlyCalls] = useState<number>(180);
  const [avgLeadValue, setAvgLeadValue] = useState<number>(3500);
  const [missedRate, setMissedRate] = useState<number>(0.25);

  const activeVoice = VOICE_PROFILES[selectedVoice];
  const activeScenario = SCENARIOS[selectedScenario];

  // Exact Stitch ROI math (combining screens 14b8332d891944ea9c432be2d23653ca and 00aa3b69174243e188ae47b1abb6a504):
  const missedCalls = monthlyCalls * missedRate;
  const rescuedDeals = Math.max(1, Math.round(missedCalls * 0.15));
  const rescuedRevenue = rescuedDeals * avgLeadValue;
  const bureauCost = Math.round(monthlyCalls * 2.5 * 1.8);
  const bureauSavings = Math.max(0, bureauCost - 149);
  const hoursSaved = ((monthlyCalls * 0.25 * 8) / 60).toFixed(1);
  const totalNetMonthlyValue = rescuedRevenue + bureauSavings;

  return (
    <PageShell>
      <div className="flex w-full flex-col bg-[#F6F3ED] text-[#081B30]">
        {/* OVERVIEW & ARCHITECTURAL HERO (Stitch Screens 14b8332d891944ea9c432be2d23653ca & 00aa3b69174243e188ae47b1abb6a504) */}
        <section className="relative w-full overflow-hidden bg-[#081B30] px-6 py-16 text-white lg:px-12 lg:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-12">
            {/* Section Breadcrumb & System Protocol Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 animate-ping rounded-full bg-[#10B981]" />
                <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#4edea3] uppercase">
                  BRITISH COMMERCIAL INFRASTRUCTURE · APPLIED AUTONOMOUS AND INTELLIGENT SYSTEMS
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#0F2642] px-3.5 py-1.5 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-[#6ffbbe]" />
                <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#dce9ff] uppercase">
                  CALLUM TELEPHONY ENGINE v4.8 • REAL-TIME LATENCY &lt; 180MS
                </span>
              </div>
            </div>

            {/* Core Display Headline */}
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="flex flex-col gap-6 lg:col-span-7">
                <h1 className="font-display text-[38px] leading-[1.12] font-bold tracking-[-0.03em] text-white sm:text-[52px] lg:text-[56px]">
                  The 24/7 Autonomous Receptionist That Pays For Itself On Day One.
                </h1>
                <p className="max-w-2xl text-[18px] leading-[28px] text-[#dce9ff]">
                  A natural, gender-neutral British synthetic voice engine that screens inbound
                  callers, qualifies £1,000+ commercial opportunities with forensic accuracy, and
                  sends verified lead dossiers to your WhatsApp and CRM in under 30 seconds.
                  Engineered with autonomous and intelligent systems.
                </p>

                {/* Executive Action Cluster */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={`tel:${siteConfig.contactPhoneTel}`}
                    className="flex h-12 items-center justify-center gap-2 rounded bg-[#10B981] px-6 text-[14px] font-semibold text-[#081B30] shadow-md transition-transform hover:bg-[#34D399] active:scale-95"
                  >
                    <PhoneCall className="h-5 w-5" />
                    <span>TEST CALLUM LIVE: {siteConfig.contactPhone}</span>
                    <span className="ml-1 font-mono text-[11px] font-bold text-[#081B30]">→</span>
                  </a>
                  <a
                    href="#roi-calculator"
                    className="flex h-12 items-center justify-center gap-2 rounded border border-white/10 bg-[#0F2642] px-6 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#173C62]"
                  >
                    <Calculator className="h-5 w-5 text-[#6ffbbe]" />
                    <span>CALCULATE QUANTIFIED SAVINGS</span>
                  </a>
                </div>

                {/* Micro Proof Badges */}
                <div className="grid grid-cols-1 gap-4 pt-4 text-[#dce9ff] sm:grid-cols-3">
                  <div className="flex flex-col rounded-lg border border-white/10 bg-[#0F2642] p-3.5">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe]">
                      01 // RECEPTION DISPATCH
                    </span>
                    <span className="mt-1 font-display text-[22px] leading-[30px] font-semibold text-white">
                      &lt; 30 sec
                    </span>
                    <span className="text-[13px] leading-[20px] text-[#d3e4fe]">
                      Instant WhatsApp lead file
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg border border-white/10 bg-[#0F2642] p-3.5">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe]">
                      02 // VOICE PROFILE
                    </span>
                    <span className="mt-1 font-display text-[22px] leading-[30px] font-semibold text-white">
                      158 Hz
                    </span>
                    <span className="text-[13px] leading-[20px] text-[#d3e4fe]">
                      Neutral RP Studio synthesis
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg border border-white/10 bg-[#0F2642] p-3.5">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe]">
                      03 // FRONT-DESK ARBITRAGE
                    </span>
                    <span className="mt-1 font-display text-[22px] leading-[30px] font-semibold text-white">
                      96.3%
                    </span>
                    <span className="text-[13px] leading-[20px] text-[#d3e4fe]">
                      Cost reduction vs agency desk
                    </span>
                  </div>
                </div>
              </div>

              {/* Executive Photographic Anchor */}
              <div className="relative flex flex-col gap-3 lg:col-span-5">
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0F2642] shadow-xl">
                  <img
                    alt="Executive boardroom interior with active IP telephony console running autonomous receptionist diagnostics"
                    className="h-80 w-full object-cover lg:h-96"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW6AGS_TFcfP20YcnPetqGw7gOMv7eLARPkQ1MMlTLKU-gAgeY9qVu97XZz6da2SyVs63_gBgNpKdNO-JVtHd9yjkkjaqZaJ7Rsb1V_z4W0kl0eEJ91w8GlQilNZyZAY0jmOiquAP_bZwgKWj7t1veBMpz0DwQoli7piMyA3mIEtnkit1eg_hgPRi_wZErcEBPxB9mrjhO_6z61n4F9lc1b2CXmS2k20DnPoOQyvI"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081B30] via-transparent to-transparent opacity-85" />
                  {/* Grounding Telemetry Chips */}
                  <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between rounded bg-[#081B30]/90 px-3 py-2 backdrop-blur">
                      <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#4edea3]">
                        [STATUS: AUTONOMOUS TELEPHONY LIVE • 24/7 COVERAGE]
                      </span>
                      <Radio className="h-4 w-4 text-[#10B981]" />
                    </div>
                    <div className="flex items-center justify-between rounded bg-[#081B30]/90 px-3 py-2 backdrop-blur">
                      <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-white">
                        [VOICE PROFILE: {activeVoice.label.toUpperCase()}]
                      </span>
                      <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe]">
                        {activeVoice.tag.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 font-mono text-[11px] font-bold tracking-[0.08em] text-[#d3e4fe]">
                  <span>BRISTOL &amp; SOUTH WEST CORE ENGINE</span>
                  <span>UK PSTN / SIP ENCRYPTION TLS 1.3</span>
                </div>
              </div>
            </div>

            {/* Live Quantified ROI Metrics 4-Card Ribbon (from Screen 00aa3b69174243e188ae47b1abb6a504) */}
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-[#0F2642]/80 p-4 md:grid-cols-4">
              <div className="flex flex-col rounded-lg bg-[#081B30]/80 p-4">
                <span className="mb-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#34D399] uppercase">
                  SAVINGS RUN-RATE
                </span>
                <span className="font-display text-3xl font-bold text-white md:text-4xl">
                  £2,400+
                </span>
                <span className="mt-1 text-[13px] text-[#dce9ff]">Avg Monthly Bureau Savings</span>
              </div>
              <div className="flex flex-col rounded-lg bg-[#081B30]/80 p-4">
                <span className="mb-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#34D399] uppercase">
                  INTAKE PRECISION
                </span>
                <span className="font-display text-3xl font-bold text-white md:text-4xl">100%</span>
                <span className="mt-1 text-[13px] text-[#dce9ff]">
                  Structured Entity Extraction
                </span>
              </div>
              <div className="flex flex-col rounded-lg bg-[#081B30]/80 p-4">
                <span className="mb-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#34D399] uppercase">
                  ACOUSTIC STREAMING
                </span>
                <span className="font-display text-3xl font-bold text-white md:text-4xl">
                  &lt; 180ms
                </span>
                <span className="mt-1 text-[13px] text-[#dce9ff]">Ultra-Low Neural Latency</span>
              </div>
              <div className="flex flex-col rounded-lg bg-[#081B30]/80 p-4">
                <span className="mb-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#34D399] uppercase">
                  NOISE SUPPRESSION
                </span>
                <span className="font-display text-3xl font-bold text-white md:text-4xl">100%</span>
                <span className="mt-1 text-[13px] text-[#dce9ff]">
                  Robocall &amp; Cold Spam Intercept
                </span>
              </div>
            </div>

            {/* INTERACTIVE CALL SIMULATOR CONSOLE */}
            <div
              className="flex w-full flex-col gap-6 rounded-xl border border-white/10 bg-[#0F2642] p-6 shadow-xl lg:p-8"
              id="simulator"
            >
              <div className="flex flex-col justify-between gap-4 rounded-lg bg-[#081B30]/60 p-4 md:flex-row md:items-center">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe] uppercase">
                    LIVE CALL SIMULATOR CONSOLE
                  </span>
                  <span className="font-display text-[22px] leading-[30px] font-semibold text-white">
                    Experience Autonomous Intelligent Speech Synthesis
                  </span>
                </div>
                {/* Financial Metric Pill */}
                <div className="flex items-center gap-3 rounded-full bg-[#081B30] px-4 py-2 shadow-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#4edea3]">
                    LABOUR SAVED: £14.20 PER CALL | TRIAGE: 38s VS 6 MIN HUMAN BUREAU
                  </span>
                </div>
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                {/* Voice Profiles & Scenarios */}
                <div className="flex flex-col gap-4 lg:col-span-4">
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#dce9ff] uppercase">
                    1. SYNTHETIC VOICE MODULATION
                  </span>
                  <div className="flex flex-col gap-2" role="group" aria-label="Voice modulation">
                    {(Object.keys(VOICE_PROFILES) as VoiceProfileId[]).map((vKey) => {
                      const voice = VOICE_PROFILES[vKey];
                      const isSelected = selectedVoice === vKey;
                      return (
                        <button
                          key={vKey}
                          type="button"
                          onClick={() => setSelectedVoice(vKey)}
                          aria-pressed={isSelected}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-lg p-3 text-left text-[14px] font-semibold transition-colors ${
                            isSelected
                              ? "bg-[#081B30] text-white shadow-sm ring-1 ring-[#6ffbbe]/40"
                              : "bg-[#081B30]/40 text-[#d3e4fe] hover:bg-[#081B30] hover:text-white"
                          }`}
                        >
                          <span>{voice.label}</span>
                          <AudioWaveform
                            className={`h-4 w-4 ${isSelected ? "text-[#6ffbbe]" : "text-[#d3e4fe]"}`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <span className="pt-2 font-mono text-[11px] font-bold tracking-[0.08em] text-[#dce9ff] uppercase">
                    2. REAL INBOUND SCENARIOS
                  </span>
                  <div className="flex flex-col gap-2" role="group" aria-label="Inbound scenarios">
                    {(Object.keys(SCENARIOS) as ScenarioId[]).map((sKey) => {
                      const scen = SCENARIOS[sKey];
                      const isSelected = selectedScenario === sKey;
                      return (
                        <button
                          key={sKey}
                          type="button"
                          onClick={() => setSelectedScenario(sKey)}
                          aria-pressed={isSelected}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-lg p-3 text-left text-[14px] font-semibold transition-colors ${
                            isSelected
                              ? "bg-[#081B30] text-[#6ffbbe] shadow-sm ring-1 ring-[#6ffbbe]/40"
                              : "bg-[#081B30]/40 text-[#d3e4fe] hover:bg-[#081B30] hover:text-white"
                          }`}
                        >
                          <span>{scen.label}</span>
                          <span
                            className={`font-mono text-[11px] font-bold tracking-[0.08em] ${
                              isSelected ? "text-[#10B981]" : scen.badgeColor
                            }`}
                          >
                            {isSelected ? "ACTIVE" : scen.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Transcript Visualizer */}
                <div className="flex flex-col gap-4 rounded-xl bg-[#081B30] p-5 shadow-inner lg:col-span-8">
                  <div className="flex items-center justify-between rounded bg-[#0F2642]/60 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-ping rounded-full bg-[#10B981]" />
                      <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-white uppercase">
                        SIP STREAM ACTIVE // {siteConfig.contactPhone} · {activeVoice.tag}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe]">
                      {activeScenario.timer}
                    </span>
                  </div>

                  {/* Speech Audio Waveform SVG Simulation */}
                  <div className="flex h-12 w-full items-center justify-between overflow-hidden rounded bg-[#0F2642]/70 px-4">
                    <svg
                      className="h-8 w-full text-[#10B981]"
                      fill="currentColor"
                      preserveAspectRatio="none"
                      viewBox="0 0 400 32"
                      aria-hidden="true"
                    >
                      {WAVEFORM_BARS.map((bar, idx) => (
                        <rect key={idx} x={bar.x} y={bar.y} width="4" height={bar.h} rx="2" />
                      ))}
                    </svg>
                  </div>

                  {/* Transcript Dialogue Container */}
                  <div className="flex min-h-[160px] flex-col gap-3 pr-1 text-[13px] leading-[20px]">
                    {activeScenario.turns.map((turn, index) => {
                      const speakerText = index === 0 ? activeVoice.speakerHeader : turn.speaker;
                      if (turn.role === "caller") {
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-1 rounded-lg bg-[#0F2642]/60 p-3.5 text-[#d3e4fe]"
                          >
                            <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#d3e4fe]">
                              {speakerText}
                            </span>
                            <p>{turn.text}</p>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-1 rounded-lg bg-[#0F2642] p-3.5 text-white"
                        >
                          <span
                            className={`font-mono text-[11px] font-bold tracking-[0.08em] ${
                              turn.isAlert ? "text-amber-300" : "text-[#6ffbbe]"
                            }`}
                          >
                            {speakerText}
                          </span>
                          <p>{turn.text}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Extracted Entity Dossier Tags */}
                  <div className="flex flex-wrap items-center gap-2 rounded-lg bg-[#0F2642] p-3 text-white">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#4edea3] uppercase">
                      VERIFIED ENTITIES DISPATCHED:
                    </span>
                    {activeScenario.entities.map((ent, idx) => (
                      <span
                        key={idx}
                        className={`rounded bg-[#081B30] px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.08em] ${
                          ent.highlight ? "text-[#10B981]" : "text-[#dce9ff]"
                        }`}
                      >
                        {ent.text}
                      </span>
                    ))}
                  </div>

                  {/* Dispatch Result Notification Bar */}
                  <div className="flex items-center justify-between rounded-lg border border-[#10B981]/30 bg-[#0F2642] px-4 py-2.5 text-white">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                      <span className="text-[13px] font-semibold">
                        {activeScenario.dispatchMessage}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#34D399]">
                      {activeScenario.elapsed}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPANDED INTERACTIVE ROI & RESCUED REVENUE CALCULATOR MODULE */}
        <section
          className="w-full bg-[#F6F3ED] px-6 py-16 text-[#081B30] lg:px-12 lg:py-24"
          id="roi-calculator"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-12">
            {/* Section Title & Subheading */}
            <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#081B30]/10 bg-white p-6 shadow-sm md:flex-row md:items-end">
              <div className="flex max-w-2xl flex-col gap-2">
                <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                  01 / FINANCIAL VALIDATION &amp; CASH RECLAMATION ENGINE
                </span>
                <h2 className="font-display text-[30px] leading-[38px] font-bold tracking-[-0.025em] text-[#081B30] sm:text-[40px] sm:leading-[48px]">
                  Quantify Your Exact Cost Savings &amp; Rescued Revenue.
                </h2>
                <p className="text-[15px] leading-[24px] text-[#526479]">
                  Traditional telephone answering services cost £1.60 to £2.20 per minute, take
                  inaccurate notes, and lose callers after 5 PM. Callum operates 24/7 with zero hold
                  times and structured qualification.
                </p>
              </div>
              <div className="flex min-w-[220px] flex-col items-center justify-center rounded-lg bg-[#081B30] p-4 text-white">
                <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe]">
                  ESTIMATED AMORTIZATION
                </span>
                <span className="mt-1 font-display text-[28px] leading-[36px] font-semibold text-[#10B981]">
                  {rescuedRevenue > 5000 ? "< 1 DAY" : "< 4 DAYS"}
                </span>
                <span className="text-[13px] leading-[20px] text-[#dce9ff]">
                  Monthly subscription break-even
                </span>
              </div>
            </div>

            {/* Sector Quick Presets */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479] uppercase">
                LOAD PRESET ENTERPRISE BENCHMARKS:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {BENCHMARK_SECTORS.map((preset) => {
                  const isCurrent =
                    monthlyCalls === preset.calls &&
                    avgLeadValue === preset.value &&
                    Math.abs(missedRate - preset.missRate) < 0.01;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setMonthlyCalls(preset.calls);
                        setAvgLeadValue(preset.value);
                        setMissedRate(preset.missRate);
                      }}
                      className={`cursor-pointer rounded px-4 py-2 text-[14px] font-semibold shadow-sm transition-colors ${
                        isCurrent
                          ? "bg-[#081B30] text-white"
                          : "bg-white text-[#081B30] hover:bg-[#081B30] hover:text-white"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Calculator Grid */}
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              {/* Controls Panel (Left 7 cols) */}
              <div className="flex flex-col gap-6 rounded-xl border border-[#081B30]/10 bg-white p-6 shadow-sm lg:col-span-7">
                {/* Slider 1: Monthly Call Volume */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[14px] font-bold text-[#081B30]" htmlFor="slider-calls">
                      Inbound Monthly Call Volume
                    </label>
                    <span className="font-display text-[22px] font-bold text-[#059669]">
                      {monthlyCalls} calls
                    </span>
                  </div>
                  <input
                    id="slider-calls"
                    type="range"
                    min={40}
                    max={800}
                    step={10}
                    value={monthlyCalls}
                    onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                    aria-label="Inbound Monthly Call Volume"
                    aria-valuetext={`${monthlyCalls} calls per month`}
                    className="h-2 w-full cursor-pointer rounded-lg bg-[#d3e4fe] accent-[#059669]"
                  />
                  <div className="flex justify-between font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479]">
                    <span>40 / mo (Boutique)</span>
                    <span>400 / mo (Mid-tier)</span>
                    <span>800+ / mo (Enterprise)</span>
                  </div>
                </div>

                {/* Slider 2: Average Client/Tender Value */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[14px] font-bold text-[#081B30]" htmlFor="slider-value">
                      Average Completed Client / Tender Value
                    </label>
                    <span className="font-display text-[22px] font-bold text-[#059669]">
                      £{avgLeadValue.toLocaleString("en-GB")}
                    </span>
                  </div>
                  <input
                    id="slider-value"
                    type="range"
                    min={300}
                    max={20000}
                    step={100}
                    value={avgLeadValue}
                    onChange={(e) => setAvgLeadValue(Number(e.target.value))}
                    aria-label="Average Completed Client or Tender Value in Pounds"
                    aria-valuetext={`£${avgLeadValue.toLocaleString("en-GB")}`}
                    className="h-2 w-full cursor-pointer rounded-lg bg-[#d3e4fe] accent-[#059669]"
                  />
                  <div className="flex justify-between font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479]">
                    <span>£300 (Maintenance)</span>
                    <span>£5,000 (Commercial Works)</span>
                    <span>£20,000+ (Contract Tenders)</span>
                  </div>
                </div>

                {/* Selector 3: Missed / After-Hours Call Rate */}
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-bold text-[#081B30]">
                    Estimated Missed / After-Hours Call Ratio
                  </span>
                  <div
                    className="grid grid-cols-3 gap-3"
                    role="group"
                    aria-label="Estimated Missed Call Ratio"
                  >
                    {MISSED_RATES.map((item) => {
                      const isSelected = Math.abs(missedRate - item.rate) < 0.01;
                      return (
                        <button
                          key={item.pct}
                          type="button"
                          onClick={() => setMissedRate(item.rate)}
                          aria-pressed={isSelected}
                          className={`cursor-pointer rounded p-3 text-center transition-all ${
                            isSelected
                              ? "bg-[#081B30] text-white shadow-sm"
                              : "bg-[#F6F3ED] text-[#081B30] hover:bg-[#e5eeff]"
                          }`}
                        >
                          <span className="block font-display text-[22px] font-bold">
                            {item.pct}
                          </span>
                          <span
                            className={`font-mono text-[11px] font-bold tracking-[0.08em] ${
                              isSelected ? "text-[#34D399]" : "text-[#526479]"
                            }`}
                          >
                            {item.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Telephony Comparison Ledger Table */}
                <div className="mt-2 flex flex-col gap-2 rounded-lg bg-[#F6F3ED] p-4">
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479] uppercase">
                    MONTHLY OPERATIONAL COST BENCHMARK ({monthlyCalls} CALLS @ 2.5 MIN AVG):
                  </span>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="rounded bg-white p-2.5 shadow-2xs">
                      <span className="block font-mono text-[10px] font-bold text-[#526479]">
                        IN-HOUSE RECEPTION
                      </span>
                      <span className="mt-1 block text-[14px] font-bold text-red-700">
                        £2,450 / mo
                      </span>
                      <span className="font-mono text-[10px] text-[#526479]">
                        Salary + On-costs
                      </span>
                    </div>
                    <div className="rounded bg-white p-2.5 shadow-2xs">
                      <span className="block font-mono text-[10px] font-bold text-[#526479]">
                        UK ANSWERING BUREAU
                      </span>
                      <span className="mt-1 block text-[14px] font-bold text-[#081B30]">
                        £{bureauCost.toLocaleString("en-GB")} / mo
                      </span>
                      <span className="font-mono text-[10px] text-[#526479]">
                        £1.80/min billable
                      </span>
                    </div>
                    <div className="rounded bg-[#081B30] p-2.5 text-white">
                      <span className="block font-mono text-[10px] font-bold text-[#34D399]">
                        CALLUM AUTONOMOUS
                      </span>
                      <span className="mt-1 block text-[14px] font-bold text-[#10B981]">
                        £99 - £149 / mo
                      </span>
                      <span className="font-mono text-[10px] text-[#dce9ff]">
                        Flat 24/7 Unlimited
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Output Ledger (Right 5 cols) */}
              <div className="flex flex-col justify-between rounded-xl bg-[#081B30] p-8 text-white shadow-lg lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between pb-4">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#34D399] uppercase">
                      CALCULATED NET VALUE DELIVERED
                    </span>
                    <span className="rounded bg-[#059669] px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
                      PROJECTED 30-DAY ROI
                    </span>
                  </div>

                  {/* Grand Total */}
                  <div className="py-4">
                    <span className="block text-[13px] text-[#dce9ff] uppercase">
                      TOTAL ESTIMATED RESCUED VALUE:
                    </span>
                    <div className="font-display text-[42px] leading-[50px] font-bold tracking-tight text-[#34D399] sm:text-[48px]">
                      £{totalNetMonthlyValue.toLocaleString("en-GB")} / mo
                    </div>
                    <span className="mt-1 block font-mono text-[11px] font-bold tracking-[0.08em] text-[#dce9ff]">
                      BREAK-EVEN FORECAST: REACHED IN{" "}
                      {rescuedRevenue > 5000 ? "< 1 DAY" : "< 4 DAYS"}
                    </span>
                  </div>

                  {/* Breakdown Metrics */}
                  <div className="flex flex-col gap-3 py-4">
                    <div className="flex items-center justify-between rounded bg-[#0F2642] p-3.5">
                      <span className="text-[13px] text-[#dce9ff]">
                        Rescued High-Value Revenue ({rescuedDeals} deals)
                      </span>
                      <span className="font-display text-[20px] font-bold text-white">
                        £{rescuedRevenue.toLocaleString("en-GB")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[#0F2642] p-3.5">
                      <span className="text-[13px] text-[#dce9ff]">
                        Direct Bureau / Staff Savings
                      </span>
                      <span className="font-display text-[20px] font-bold text-white">
                        £{bureauSavings.toLocaleString("en-GB")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[#0F2642] p-3.5">
                      <span className="text-[13px] text-[#dce9ff]">
                        Director Billable Time Reclaimed
                      </span>
                      <span className="font-display text-[20px] font-bold text-[#10B981]">
                        {hoursSaved} hrs/mo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    to="/contact"
                    search={{
                      service: "Autonomous Virtual Receptionist (Commercial Evaluation)",
                      package: undefined,
                      domain: undefined,
                      websiteUrl: undefined,
                    }}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded bg-[#10B981] text-[14px] font-bold tracking-wider text-[#081B30] uppercase transition-all hover:bg-[#34D399]"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span>Deploy Autonomous System Pilot</span>
                  </Link>
                  <a
                    href={`tel:${siteConfig.contactPhoneTel}`}
                    className="flex h-10 w-full items-center justify-center gap-1.5 rounded bg-[#0F2642] font-mono text-[11px] font-bold tracking-wider text-white uppercase transition-all hover:bg-[#173C62]"
                  >
                    <FileDown className="h-4 w-4 text-[#34D399]" />
                    <span>Test Live Line: {siteConfig.contactPhone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Three Pillars of Quantification (from Screen 00aa3b69174243e188ae47b1abb6a504) */}
            <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3">
              <div className="flex flex-col gap-2 rounded-xl border border-[#081B30]/10 bg-white p-6 shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded bg-[#e5eeff] text-[#081B30]">
                  <TrendingUp className="h-5 w-5 text-[#059669]" />
                </div>
                <span className="font-display text-[20px] font-semibold text-[#081B30]">
                  1. Rescued High-Value Tenders
                </span>
                <p className="text-[13px] leading-[20px] text-[#526479]">
                  Most UK commercial clients hang up and phone a competitor if sent to voicemail or
                  put on endless hold. Callum answers on ring one, collects precise specifications,
                  and confirms receipt in seconds.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-[#081B30]/10 bg-white p-6 shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded bg-[#e5eeff] text-[#081B30]">
                  <Coins className="h-5 w-5 text-[#059669]" />
                </div>
                <span className="font-display text-[20px] font-semibold text-[#081B30]">
                  2. Slashed Front-Desk Overhead
                </span>
                <p className="text-[13px] leading-[20px] text-[#526479]">
                  Replace escalating per-minute bureau fees (£1.60–£2.20/min) and £30,000+
                  receptionist overheads with a predictable flat platform fee. Scale from 50 to
                  5,000 calls without additional headcount.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-[#081B30]/10 bg-white p-6 shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded bg-[#e5eeff] text-[#081B30]">
                  <Timer className="h-5 w-5 text-[#059669]" />
                </div>
                <span className="font-display text-[20px] font-semibold text-[#081B30]">
                  3. Reclaimed Director Focus
                </span>
                <p className="text-[13px] leading-[20px] text-[#526479]">
                  Cold callers, automated solar spam, recruitment agencies, and non-target enquiries
                  are professionally filtered and politely deflected. Only verified high-ticket
                  briefs land on your desk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ACOUSTIC SCIENCE & GENDER-NEUTRAL SYNTHESIS SECTION */}
        <section className="w-full border-y border-[#081B30]/10 bg-white px-6 py-16 text-[#081B30] lg:px-12 lg:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Audio Science Narrative & Frequency Curve SVG */}
              <div className="flex flex-col gap-6 lg:col-span-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                    02 / ACOUSTIC INTELLIGENCE &amp; PERCEPTION
                  </span>
                </div>
                <h2 className="font-display text-[30px] leading-[38px] font-bold tracking-[-0.025em] text-[#081B30] sm:text-[40px] sm:leading-[48px]">
                  Why a Gender-Neutral British Voice Closes More High-Value Opportunities.
                </h2>
                <p className="text-[15px] leading-[24px] text-[#526479]">
                  Standard synthetic voices suffer from cognitive friction: high-pitched assistants
                  trigger automated customer service fatigue, while deep masculine tones frequently
                  create friction on domestic and collaborative commercial calls.
                </p>
                <p className="text-[15px] leading-[24px] text-[#526479]">
                  Callum&apos;s acoustic synthesis is tuned to a precise{" "}
                  <strong className="font-semibold text-[#081B30]">155–165 Hz median pitch</strong>
                  —the mathematical perceptual equilibrium between traditional vocal
                  classifications. This neutral profile generates immediate demographic comfort,
                  authority, and caller retention.
                </p>

                {/* Frequency Curve SVG Schematic (from Screen 00aa3b69174243e188ae47b1abb6a504) */}
                <div className="flex flex-col gap-3 rounded-xl border border-[#081B30]/10 bg-[#F6F3ED] p-5">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold tracking-[0.08em]">
                    <span className="text-[#526479]">ACOUSTIC SPECTRUM ANALYSIS</span>
                    <span className="text-[#059669]">OPTIMAL EQUILIBRIUM: 160.4 Hz</span>
                  </div>
                  <svg
                    className="h-24 w-full text-[#081B30]"
                    viewBox="0 0 400 90"
                    aria-label="Acoustic frequency spectrum showing Callum centered at 160 Hz"
                  >
                    <line
                      stroke="#CBD5E1"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="0"
                      x2="400"
                      y1="20"
                      y2="20"
                    />
                    <line
                      stroke="#CBD5E1"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                      x1="0"
                      x2="400"
                      y1="50"
                      y2="50"
                    />
                    <line stroke="#CBD5E1" strokeWidth="1" x1="0" x2="400" y1="75" y2="75" />
                    <path
                      d="M 30,75 Q 80,10 130,75"
                      fill="none"
                      stroke="#64748B"
                      strokeDasharray="4 2"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 270,75 Q 320,10 370,75"
                      fill="none"
                      stroke="#64748B"
                      strokeDasharray="4 2"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 140,75 Q 200,5 260,75"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                    />
                    <circle cx="200" cy="5" fill="#059669" r="4" />
                    <text
                      fill="#64748B"
                      fontFamily="monospace"
                      fontSize="10"
                      textAnchor="middle"
                      x="80"
                      y="86"
                    >
                      Masc (~110Hz)
                    </text>
                    <text
                      fill="#059669"
                      fontFamily="monospace"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      x="200"
                      y="86"
                    >
                      CALLUM (160Hz)
                    </text>
                    <text
                      fill="#64748B"
                      fontFamily="monospace"
                      fontSize="10"
                      textAnchor="middle"
                      x="320"
                      y="86"
                    >
                      Fem (~220Hz)
                    </text>
                  </svg>
                </div>
              </div>

              {/* Right Column: Field Scenario & Enterprise Telephony Stack */}
              <div className="flex flex-col gap-6 lg:col-span-6">
                {/* Illustrative Commercial Field Scenario Block */}
                <div className="relative rounded-xl bg-[#081B30] p-8 text-white shadow-md">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                      <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#34D399] uppercase">
                        ILLUSTRATIVE COMMERCIAL SCENARIO · BRISTOL &amp; SOUTH WEST
                      </span>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#dce9ff]">
                      DESIGN STUDY
                    </span>
                  </div>
                  <p className="mb-6 text-[16px] leading-relaxed text-[#F6F3ED] italic">
                    &ldquo;Instead of paying £1,100 a month for a traditional message bureau that
                    misspells technical electrical terms, Callum screens out-of-hours commercial
                    enquiries, captures 3-phase switchgear and EV charger specifications accurately,
                    and dispatches a complete WhatsApp dossier before the caller even hangs
                    up.&rdquo;
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F2642] font-display text-sm font-bold text-[#34D399]">
                      M&amp;E
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-white">
                        Commercial Electrical &amp; Mechanical Workflow
                      </span>
                      <span className="font-mono text-[11px] text-[#34D399]">
                        TYPICAL HIGH-TICKET CONTRACTOR BENCHMARK · BS1 / BS8
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enterprise Telephony Stack Snapshot */}
                <div className="flex flex-col gap-3 rounded-xl border border-[#081B30]/10 bg-[#F6F3ED] p-6 shadow-sm">
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479] uppercase">
                    ENTERPRISE VOICE ARCHITECTURE // TELEPHONY STACK
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between rounded bg-white p-3">
                      <span className="flex items-center gap-2 text-[14px] font-semibold text-[#081B30]">
                        <Server className="h-4 w-4 text-[#059669]" />
                        Sovereign UK SIP Trunking (London Telehouse)
                      </span>
                      <span className="font-mono text-[11px] font-bold text-[#059669]">
                        &lt; 14ms Jitter
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-white p-3">
                      <span className="flex items-center gap-2 text-[14px] font-semibold text-[#081B30]">
                        <Shield className="h-4 w-4 text-[#059669]" />
                        Real-Time PII Redaction &amp; UK GDPR Shield
                      </span>
                      <span className="font-mono text-[11px] font-bold text-[#059669]">
                        UK ICO Ready
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-white p-3">
                      <span className="flex items-center gap-2 text-[14px] font-semibold text-[#081B30]">
                        <RefreshCw className="h-4 w-4 text-[#059669]" />
                        Direct CRM Ingestion (HubSpot, Salesforce, SimPRO, Joblogic)
                      </span>
                      <span className="font-mono text-[11px] font-bold text-[#059669]">
                        REST API v2
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Card Acoustic Feature Matrix Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#081B30]/10 bg-[#F6F3ED] p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#081B30] text-white">
                    <Activity className="h-5 w-5 text-[#6ffbbe]" />
                  </div>
                  <span className="mt-2 font-display text-[22px] leading-[30px] font-semibold text-[#081B30]">
                    155–165 Hz Fundamental
                  </span>
                  <p className="text-[13px] leading-[20px] text-[#526479]">
                    Tuned to the precise median acoustic band where vocal presence is perceived as
                    grounded, objective, and unflinchingly calm.
                  </p>
                </div>
                <div className="rounded bg-white p-2 font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                  FREQUENCY MEDIAN: BALANCED
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#081B30]/10 bg-[#F6F3ED] p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#081B30] text-white">
                    <Brain className="h-5 w-5 text-[#6ffbbe]" />
                  </div>
                  <span className="mt-2 font-display text-[22px] leading-[30px] font-semibold text-[#081B30]">
                    Zero Demographic Friction
                  </span>
                  <p className="text-[13px] leading-[20px] text-[#526479]">
                    Eliminates gender-based conversational posturing and unconscious listener
                    impatience during high-pressure emergency triage.
                  </p>
                </div>
                <div className="rounded bg-white p-2 font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                  CALLER ENGAGEMENT: HIGH TRUST
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#081B30]/10 bg-[#F6F3ED] p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#081B30] text-white">
                    <Gauge className="h-5 w-5 text-[#6ffbbe]" />
                  </div>
                  <span className="mt-2 font-display text-[22px] leading-[30px] font-semibold text-[#081B30]">
                    &lt; 180ms Turn-Taking
                  </span>
                  <p className="text-[13px] leading-[20px] text-[#526479]">
                    Streaming micro-chunk speech synthesis matches natural British conversational
                    cadences without awkward robotic pauses.
                  </p>
                </div>
                <div className="rounded bg-white p-2 font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                  STREAMING PROTOCOL: RTP-DIRECT
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#081B30]/10 bg-[#F6F3ED] p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#081B30] text-white">
                    <BookOpenCheck className="h-5 w-5 text-[#6ffbbe]" />
                  </div>
                  <span className="mt-2 font-display text-[22px] leading-[30px] font-semibold text-[#081B30]">
                    100% British Lexicon
                  </span>
                  <p className="text-[13px] leading-[20px] text-[#526479]">
                    Recognises UK postal districts (BS1, BA1, SN1), local engineering nomenclature,
                    and British compliance codes accurately.
                  </p>
                </div>
                <div className="rounded bg-white p-2 font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                  LOCALISATION: EN-GB NATIVE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MULTI-SECTOR USE CASES & ENTERPRISE INTEGRATIONS */}
        <section className="w-full bg-[#F6F3ED] px-6 py-16 text-[#081B30] lg:px-12 lg:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-12">
            {/* Section Header */}
            <div className="flex max-w-3xl flex-col gap-3">
              <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                03 / DEPLOYED TRADE &amp; ENTERPRISE INFRASTRUCTURE
              </span>
              <h2 className="font-display text-[30px] leading-[38px] font-bold tracking-[-0.025em] text-[#081B30] sm:text-[40px] sm:leading-[48px]">
                Sector-Engineered Inbound Call Workflows
              </h2>
              <p className="text-[15px] leading-[24px] text-[#526479]">
                Built for high-stakes British operations where missed inbound calls mean lost
                five-figure tenders or delayed emergency callouts.
              </p>
            </div>

            {/* Sector Bento Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Sector 1: Commercial Contracting & M&E */}
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#081B30]/10 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669]">
                      01 // HEAVY TRADE &amp; CONTRACTING
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#081B30]">
                      EST. TENDER £10K–£150K
                    </span>
                  </div>
                  <h3 className="font-display text-[26px] leading-[34px] font-semibold text-[#081B30]">
                    Commercial M&amp;E &amp; Engineering Contractors
                  </h3>
                  <p className="text-[15px] leading-[24px] text-[#526479]">
                    Screens high-volume subcontractor calls, extracts architectural job specs,
                    captures postcodes, and schedules qualified estimator surveys directly into
                    Tradify or ServiceM8.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Tradify Sync
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Site Survey Scheduling
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Subcontractor Gatekeeping
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#F6F3ED] p-4">
                  <span className="text-[13px] text-[#526479]">Operational Focus:</span>
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669]">
                    3-PHASE, EV FLEET &amp; PLANT TENDERS
                  </span>
                </div>
              </div>

              {/* Sector 2: Private Healthcare & Aesthetic Clinics */}
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#081B30]/10 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669]">
                      02 // MEDICAL &amp; CLINICAL PRACTICE
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#081B30]">
                      CONSULTATION £350–£1,200
                    </span>
                  </div>
                  <h3 className="font-display text-[26px] leading-[34px] font-semibold text-[#081B30]">
                    Private Medical &amp; Aesthetic Clinics
                  </h3>
                  <p className="text-[15px] leading-[24px] text-[#526479]">
                    Discreet, patient-sensitive reception screening. Callum categorises appointment
                    requests, checks clinic availability, and books consultation slots without human
                    hold times.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Clinic Calendar Sync
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      UK GDPR Compliant
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      SMS Booking Link Dispatch
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#F6F3ED] p-4">
                  <span className="text-[13px] text-[#526479]">Operational Focus:</span>
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669]">
                    ZERO HOLD-TIME PATIENT INTAKE
                  </span>
                </div>
              </div>

              {/* Sector 3: Legal & Accounting Practices */}
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#081B30]/10 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669]">
                      03 // PROFESSIONAL ADVISORY
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#081B30]">
                      RETAINERS £3K–£25K
                    </span>
                  </div>
                  <h3 className="font-display text-[26px] leading-[34px] font-semibold text-[#081B30]">
                    Commercial Law &amp; Chartered Accountants
                  </h3>
                  <p className="text-[15px] leading-[24px] text-[#526479]">
                    Shields partners from unqualified interruptions. Distinguishes commercial client
                    matters from cold sales calls, compiling a structured intake dossier before
                    forwarding.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Structured Matter Intake
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Conflict Pre-Check Notes
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Partner Calendar Booking
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#F6F3ED] p-4">
                  <span className="text-[13px] text-[#526479]">Operational Focus:</span>
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669]">
                    SENIOR PARTNER FOCUS PROTECTION
                  </span>
                </div>
              </div>

              {/* Sector 4: High-End Property & Asset Management */}
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#081B30]/10 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669]">
                      04 // PRIME PROPERTY &amp; ESTATES
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#081B30]">
                      PORTFOLIO MGMT £5K–£50K
                    </span>
                  </div>
                  <h3 className="font-display text-[26px] leading-[34px] font-semibold text-[#081B30]">
                    Prime Property &amp; Asset Management
                  </h3>
                  <p className="text-[15px] leading-[24px] text-[#526479]">
                    Handles out-of-hours maintenance emergencies by dispatching approved plumbing
                    and electrical contractors, while routing landlord and buyer enquiries straight
                    to director mobiles.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Emergency Fault Triage
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      24/7 Contractor Dispatch
                    </span>
                    <span className="rounded bg-[#F6F3ED] px-2.5 py-1 text-[13px] font-semibold text-[#081B30]">
                      Tenant Priority Routing
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#F6F3ED] p-4">
                  <span className="text-[13px] text-[#526479]">Operational Focus:</span>
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669]">
                    24/7 OUT-OF-HOURS ESCALATION
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLEAR FIXED PRICING & ASSURANCE */}
        <section
          className="w-full bg-[#081B30] px-6 py-16 text-white lg:px-12 lg:py-24"
          id="pricing"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-12">
            {/* Header */}
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#4edea3] uppercase">
                04 / TRANSPARENT COMMERCIAL PRICING
              </span>
              <h2 className="font-display text-[30px] leading-[38px] font-bold tracking-[-0.025em] text-white sm:text-[40px] sm:leading-[48px]">
                Predictable Flat-Rate Pricing. Zero Hidden Bureau Fees.
              </h2>
              <p className="text-[15px] leading-[24px] text-[#dce9ff]">
                Traditional UK telephone answering bureaus charge up to £1.85 per minute with tiered
                lock-ins. Callum operates as predictable fixed-fee telephony infrastructure.
              </p>
            </div>

            {/* Pricing Comparison Cards */}
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              {/* Standalone Plan */}
              <div className="flex flex-col justify-between gap-8 rounded-xl border border-white/10 bg-[#0F2642] p-8 shadow-xl">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#d3e4fe] uppercase">
                      STANDALONE TELEPHONY
                    </span>
                    <span className="rounded bg-[#081B30] px-3 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#dce9ff]">
                      PLUG &amp; PLAY SIP
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[40px] leading-[48px] font-bold text-white">
                      £149
                    </span>
                    <span className="text-[15px] text-[#dce9ff]">/ month flat</span>
                  </div>
                  <p className="text-[13px] leading-[20px] text-[#dce9ff]">
                    For established businesses with an existing website needing a dependable
                    autonomous receptionist and qualification engine.
                  </p>
                  <ul className="flex flex-col gap-3 pt-4 text-[13px] leading-[20px] text-[#dce9ff]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Dedicated UK 01 / 02 / 0800 Regional Number</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Gender-Neutral RP Studio Voice Engine (Callum)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Instant WhatsApp &amp; Email Lead File Dispatch</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>100% Robocall &amp; Cold Spam Intercept Filter</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Failover Routing to Director Mobile</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/contact"
                  search={{
                    service: "Autonomous Virtual Receptionist (Standalone £149/mo)",
                    package: undefined,
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded border border-white/15 bg-[#081B30] text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#173C62]"
                >
                  <span>ENQUIRE FOR STANDALONE SETUP</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Ecosystem Bundle Plan */}
              <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-xl border border-[#10B981]/40 bg-[#0F2642] p-8 shadow-xl">
                <div className="absolute top-0 right-0 rounded-bl bg-[#10B981] px-4 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#081B30] uppercase">
                  RECOMMENDED PARTNER TIER
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe] uppercase">
                      HARLEY ECOSYSTEM PARTNER
                    </span>
                    <span className="rounded bg-[#081B30] px-3 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#10B981]">
                      PARTNER TIER
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[40px] leading-[48px] font-bold text-[#10B981]">
                      £99
                    </span>
                    <span className="text-[15px] text-[#dce9ff]">/ month flat</span>
                  </div>
                  <p className="text-[13px] leading-[20px] text-[#dce9ff]">
                    Bundled with Harley Digital Works web infrastructure or bespoke Harley Labs
                    trade automation workflows.
                  </p>
                  <ul className="flex flex-col gap-3 pt-4 text-[13px] leading-[20px] text-white">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Everything in Standalone Telephony</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Synchronised CRM, SimPRO &amp; Joblogic Auto-Push</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Priority Speech Lexicon Fine-Tuning for Your Trade</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Quarterly Script &amp; Qualification Logic Optimisation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-[#10B981]" />
                      <span>Zero Onboarding or Trunk Setup Charges</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/contact"
                  search={{
                    service: "Autonomous Virtual Receptionist (Partner Bundle £99/mo)",
                    package: undefined,
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded bg-[#10B981] text-[14px] font-semibold text-[#081B30] shadow-md transition-transform hover:bg-[#34D399] active:scale-95"
                >
                  <span>DEPLOY WITH GROUP BUNDLE</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Trust Assurance Strip */}
            <div className="flex flex-wrap items-center justify-around gap-6 rounded-xl border border-white/10 bg-[#0F2642] p-6 text-center">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-[#10B981]" />
                <div className="flex flex-col text-left">
                  <span className="text-[14px] font-semibold text-white">
                    Structured Evaluation Pilot
                  </span>
                  <span className="text-[13px] text-[#dce9ff]">
                    Full feature access on live inbound calls
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-[#10B981]" />
                <div className="flex flex-col text-left">
                  <span className="text-[14px] font-semibold text-white">
                    No Long Contract Lock-ins
                  </span>
                  <span className="text-[13px] text-[#dce9ff]">
                    Rolling 30-day notice with full data export
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Headphones className="h-6 w-6 text-[#10B981]" />
                <div className="flex flex-col text-left">
                  <span className="text-[14px] font-semibold text-white">
                    100% Human Backup Escalation
                  </span>
                  <span className="text-[13px] text-[#dce9ff]">
                    Seamless live warm transfers anytime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIRECT AUDIO TRIAL CALLOUT */}
        <section className="w-full bg-[#F6F3ED] px-6 py-16 text-[#081B30] lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-2xl bg-[#081B30] p-8 text-white shadow-2xl lg:flex-row lg:p-12">
            <div className="flex max-w-2xl flex-col gap-3">
              <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#6ffbbe] uppercase">
                LIVE PSTN VOICE DEMO
              </span>
              <h2 className="font-display text-[30px] leading-[38px] font-bold tracking-[-0.025em] text-white sm:text-[36px] sm:leading-[44px]">
                Hear Callum Live on Your Mobile: Call {siteConfig.contactPhone}
              </h2>
              <p className="text-[15px] leading-[24px] text-[#dce9ff]">
                No form to fill. Dial now from any UK landline or mobile to test natural turn-taking
                cadence, British accent nuance, and instantaneous entity extraction firsthand.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-4 sm:flex-row">
              <a
                href={`tel:${siteConfig.contactPhoneTel}`}
                className="flex h-14 items-center justify-center gap-3 rounded bg-[#10B981] px-8 text-[14px] font-semibold text-[#081B30] shadow-md transition-transform hover:bg-[#34D399] active:scale-95"
              >
                <PhoneCall className="h-6 w-6" />
                <span>DIAL {siteConfig.contactPhone} NOW</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
