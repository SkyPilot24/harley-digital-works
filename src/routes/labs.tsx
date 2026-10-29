import { useState, useId } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import {
  Cpu,
  ArrowRight,
  Building2,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Code2,
  Workflow,
  Calculator,
  Mic,
  Terminal,
  Send,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Harley Labs | Automation Workflows & Software Prototypes" },
      {
        name: "description",
        content:
          "Harley Labs is the research and software prototyping division of The Harley Group, exploring practical automations, digital tools, and operational prototypes.",
      },
      {
        property: "og:title",
        content: "Harley Labs | Automation Workflows & Software Prototypes",
      },
      {
        property: "og:description",
        content:
          "Harley Labs is the research and software prototyping division of The Harley Group, exploring practical automations, digital tools, and operational prototypes.",
      },
    ],
  }),
  component: HarleyLabsPage,
});

const VOICE_SCENARIOS = [
  {
    id: "heating",
    label: "Heating Breakdown",
    tag: "BOILER FAULT TRIAGE",
    caller:
      "Hi, our Vaillant boiler has just started flashing fault code F75 and there is no hot water in the house.",
    agent:
      "Understood. Vaillant F75 relates to system water pressure or the pressure sensor. Could you share your postcode and let me know if the pressure gauge is below 1 bar so I can brief our heating engineer?",
    note: "Captures fault code, checks whether it is an urgent breakdown, and sends a structured brief to WhatsApp.",
  },
  {
    id: "electrical",
    label: "Consumer Unit & EV",
    tag: "ELECTRICAL QUOTE",
    caller:
      "We need a 7kW EV charger fitted on the driveway in Clifton, and our fuseboard is an older plastic unit.",
    agent:
      "Thank you. For an EV charger we also check main bonding and whether an 18th-Edition metal consumer unit or surge protection is needed. What is your BS8 postcode and preferred day for a quick survey?",
    note: "Identifies likely board upgrade requirement alongside the EV charger enquiry before dispatching the lead.",
  },
  {
    id: "commercial",
    label: "Commercial Facilities",
    tag: "FACILITIES CALLOUT",
    caller:
      "We have a tripped 3-phase distribution board in our Avonmouth warehouse and two loading bay doors are without power.",
    agent:
      "Logged as a commercial priority callout in Avonmouth. Please keep the panel closed—I am alerting the on-call commercial electrician right now with your contact number.",
    note: "Separates commercial facilities emergencies from routine domestic quotes so urgent jobs are spotted immediately.",
  },
] as const;

function HarleyLabsPage() {
  const [activeVoiceIdx, setActiveVoiceIdx] = useState<number>(0);
  const [materialsCost, setMaterialsCost] = useState<number>(1450);
  const [labourHours, setLabourHours] = useState<number>(8);

  const matSliderId = useId();
  const labourSliderId = useId();

  const hourlyRate = 65;
  const tradeRebateMaterials = Math.round(materialsCost * 0.9);
  const labourTotal = labourHours * hourlyRate;
  const netCost = tradeRebateMaterials + labourTotal;
  const illustrativeQuote = Math.round(netCost * 1.25);

  const activeScenario = VOICE_SCENARIOS[activeVoiceIdx];

  return (
    <PageShell brand="labs">
      {/* Top Blueprint Header Strip */}
      <section className="w-full bg-[#081B30] text-slate-200 py-3 px-5 sm:px-6 border-b border-[#173C62]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#059669]" />
              <span className="font-mono text-[11px] font-bold text-[#6ffbbe] tracking-widest uppercase">
                HARLEY LABS // APPLIED AUTOMATION &amp; PROTOTYPING
              </span>
            </div>
            <div className="flex items-center gap-5 font-mono text-[11px] text-slate-300">
              <span>DIVISION: THE HARLEY GROUP</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-[#6ffbbe]">INTERACTIVE SANDBOX READY</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Stitch Hero Bento Command Module */}
      <section className="w-full bg-[#081B30] text-white pt-14 pb-20 border-b border-[#173C62] relative overflow-hidden">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Statement & Vision */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#173C62] text-[#6ffbbe] font-mono text-[11px] font-bold uppercase tracking-wider border border-white/10">
                  <Terminal className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>R&amp;D DIVISION · THE HARLEY GROUP</span>
                </div>
                <Link
                  to="/the-harley-group"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
                >
                  <Building2 className="h-3 w-3 text-[#6ffbbe]" />
                  <span>Part of The Harley Group</span>
                </Link>
              </div>

              <div className="max-w-xs">
                <img
                  src="/brand/2026-10-21/HL-Brand-Pack/08-Web-Ready/logo.svg"
                  alt="Harley Labs | Part of The Harley Group"
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.08]">
                Ideas into working systems for trade &amp; commercial operations.
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                Harley Labs is the software prototyping and workflow automation studio of The Harley
                Group. We design and test practical voice receptionists, instant job estimators, and
                lead-routing tools that cut repetitive admin for UK trade businesses.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#sandbox"
                  className="px-6 py-3.5 bg-[#059669] hover:bg-[#10B981] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>Try Prototype Sandbox</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/contact"
                  search={{
                    service: "Harley Labs Systems & R&D Enquiry",
                    package: undefined,
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  className="px-6 py-3.5 bg-[#173C62] hover:bg-[#173C62]/80 text-white font-semibold text-sm rounded-xl border border-white/15 transition-colors flex items-center gap-2"
                >
                  <Cpu className="h-4 w-4 text-[#6ffbbe]" />
                  <span>Discuss an Automation Idea</span>
                </Link>
              </div>
            </div>

            {/* Right: Stitch Active Prototype Overview Card (Honest labels, no fake telemetry) */}
            <div className="lg:col-span-5">
              <div className="bg-[#173C62] rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="font-display text-base font-bold text-white">
                      Active Prototype Workbench
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-[#081B30] text-[#6ffbbe]">
                    4 LAB TRACKS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#081B30] p-4 rounded-xl flex flex-col border border-white/5">
                    <span className="font-mono text-[10px] text-slate-300 uppercase">
                      Track 01 // Voice
                    </span>
                    <span className="font-display text-lg font-bold text-[#6ffbbe] mt-1">
                      Callum AI
                    </span>
                    <span className="text-xs text-slate-300 mt-0.5">24/7 phone call triage</span>
                  </div>
                  <div className="bg-[#081B30] p-4 rounded-xl flex flex-col border border-white/5">
                    <span className="font-mono text-[10px] text-slate-300 uppercase">
                      Track 02 // Pricing
                    </span>
                    <span className="font-display text-lg font-bold text-white mt-1">
                      Quote Matrix
                    </span>
                    <span className="text-xs text-slate-300 mt-0.5">Ballpark trade estimators</span>
                  </div>
                  <div className="bg-[#081B30] p-4 rounded-xl flex flex-col border border-white/5">
                    <span className="font-mono text-[10px] text-slate-300 uppercase">
                      Track 03 // Routing
                    </span>
                    <span className="font-display text-lg font-bold text-[#6ffbbe] mt-1">
                      WhatsApp Briefs
                    </span>
                    <span className="text-xs text-slate-300 mt-0.5">Structured lead summaries</span>
                  </div>
                  <div className="bg-[#081B30] p-4 rounded-xl flex flex-col border border-white/5">
                    <span className="font-mono text-[10px] text-slate-300 uppercase">
                      Track 04 // Web
                    </span>
                    <span className="font-display text-lg font-bold text-white mt-1">
                      Edge Sites
                    </span>
                    <span className="text-xs text-slate-300 mt-0.5">
                      Clean React &amp; Tailwind builds
                    </span>
                  </div>
                </div>

                <div className="bg-[#081B30] p-4 rounded-xl flex flex-col gap-2 border border-white/5">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-300 uppercase">
                      ILLUSTRATIVE AUDIO TRIAGE WAVEFORM
                    </span>
                    <span className="text-[#6ffbbe] font-bold">EN-GB SPEECH</span>
                  </div>
                  <svg
                    className="w-full h-10 text-[#10B981]"
                    fill="none"
                    viewBox="0 0 360 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 24 Q 20 8, 40 24 T 80 24 T 120 10 T 160 38 T 200 14 T 240 30 T 280 18 T 320 28 T 360 24"
                      fill="none"
                      opacity="0.85"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="flex justify-between font-mono text-[10px] text-slate-300">
                    <span>1. CALL ANSWERED</span>
                    <span>2. SCOPE CHECKED</span>
                    <span>3. WHATSAPP SENT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 01: Stitch 4-Card Bento Research Matrix */}
      <section className="w-full bg-[#F6F3ED] py-16 lg:py-24 text-[#081B30] border-b border-[#526479]/20">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#526479]/20">
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold text-[#059669] uppercase tracking-widest">
                  RESEARCH MATRIX // 01
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#081B30] tracking-tight">
                  What We Build &amp; Test in Harley Labs
                </h2>
              </div>
              <p className="text-sm text-[#526479] max-w-md leading-relaxed">
                Practical software prototypes focused on removing everyday admin bottlenecks for UK
                electrical, heating, and building contractors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {/* Track 1 (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-8 shadow-xs border border-[#526479]/15 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] px-3 py-1 bg-[#F6F3ED] rounded text-[#081B30] uppercase font-bold">
                      LAB TRACK: AUDIO-01
                    </span>
                    <span className="font-mono text-[11px] text-[#059669] font-bold">
                      COMMERCIAL PROTOTYPE
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#081B30]">
                    Callum: 24/7 British Voice Receptionist
                  </h3>
                  <p className="text-sm text-[#526479] leading-relaxed">
                    Automated phone answering built to greet callers in natural British English when
                    contractors are up a ladder or driving. Captures postcodes, identifies urgent
                    callouts, and sends a clear summary to WhatsApp.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-[#F6F3ED] p-3.5 rounded-xl">
                      <span className="font-mono text-[10px] text-[#526479] uppercase block">
                        Emergency Triage
                      </span>
                      <span className="font-display text-base font-bold text-[#081B30]">
                        Priority Alerts
                      </span>
                    </div>
                    <div className="bg-[#F6F3ED] p-3.5 rounded-xl">
                      <span className="font-mono text-[10px] text-[#526479] uppercase block">
                        Trade Lexicon
                      </span>
                      <span className="font-display text-base font-bold text-[#081B30]">
                        UK Terms
                      </span>
                    </div>
                    <div className="bg-[#F6F3ED] p-3.5 rounded-xl">
                      <span className="font-mono text-[10px] text-[#526479] uppercase block">
                        Lead Delivery
                      </span>
                      <span className="font-display text-base font-bold text-[#081B30]">
                        WhatsApp &amp; Email
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#526479]/15">
                  <span className="font-mono text-[11px] text-[#526479]">
                    VOICE ENGINE: EN-GB NEURAL SPEECH
                  </span>
                  <Link
                    to="/virtual-receptionist"
                    className="text-xs font-bold text-[#059669] hover:text-[#081B30] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Explore Phone Receptionist</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Track 2 (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-7 sm:p-8 shadow-xs border border-[#526479]/15 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] px-3 py-1 bg-[#F6F3ED] rounded text-[#081B30] uppercase font-bold">
                      LAB TRACK: CALC-02
                    </span>
                    <span className="font-mono text-[11px] text-[#059669] font-bold">
                      INTERACTIVE TOOL
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#081B30]">
                    Instant Trade Quote Estimators
                  </h3>
                  <p className="text-sm text-[#526479] leading-relaxed">
                    Configurable website calculators that give homeowners a clear ballpark price
                    range in 15 seconds (e.g. consumer unit upgrades, EV chargers, or boiler swaps)
                    before sending the pre-qualified enquiry to the contractor.
                  </p>
                  <div className="bg-[#081B30] text-white p-4 rounded-xl font-mono text-[11px] space-y-1.5">
                    <div className="text-[#6ffbbe] font-bold">FORMULA STRUCTURE:</div>
                    <div className="text-slate-200">
                      Guide = (BaseService × PropertyScale) + PriorityWindow
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#526479]/15">
                  <span className="font-mono text-[11px] text-[#526479]">
                    USED IN: FLAGSHIP ELECTRICAL DEMO
                  </span>
                  <Link
                    to="/demos/electrician-concept"
                    className="text-xs font-bold text-[#059669] hover:text-[#081B30] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Try Estimator</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Track 3 (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-7 sm:p-8 shadow-xs border border-[#526479]/15 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] px-3 py-1 bg-[#F6F3ED] rounded text-[#081B30] uppercase font-bold">
                      LAB TRACK: DISPATCH-03
                    </span>
                    <span className="font-mono text-[11px] text-[#059669] font-bold">
                      WORKFLOW ENGINE
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#081B30]">
                    Structured Lead &amp; WhatsApp Routing
                  </h3>
                  <p className="text-sm text-[#526479] leading-relaxed">
                    Turns website forms and phone enquiries into clean, scannable job briefs so
                    tradespeople can see the postcode, job type, and urgency at a glance between
                    jobs.
                  </p>
                  <div className="bg-[#F6F3ED] p-4 rounded-xl border-l-4 border-[#059669] space-y-1">
                    <span className="font-mono text-[10px] text-[#059669] uppercase font-bold">
                      SAMPLE BRIEF FORMAT:
                    </span>
                    <p className="text-xs text-[#081B30]">
                      &ldquo;[Example] Clifton BS8 · 18th-Edition Consumer Unit Quote · Customer
                      requested afternoon callback.&rdquo;
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#526479]/15">
                  <span className="font-mono text-[11px] text-[#526479]">
                    CHANNELS: WHATSAPP &amp; EMAIL
                  </span>
                  <Send className="h-4 w-4 text-[#059669]" />
                </div>
              </div>

              {/* Track 4 (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-8 shadow-xs border border-[#526479]/15 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] px-3 py-1 bg-[#F6F3ED] rounded text-[#081B30] uppercase font-bold">
                      LAB TRACK: WEB-04
                    </span>
                    <span className="font-mono text-[11px] text-[#059669] font-bold">
                      PRODUCTION ENGINE
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#081B30]">
                    Lean Trade Website Architecture
                  </h3>
                  <p className="text-sm text-[#526479] leading-relaxed">
                    Clean React and Tailwind website templates engineered for UK trade businesses—
                    built without fragile WordPress plugins, popups, or bloated page builders, and
                    deployed on Cloudflare edge hosting.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    {[
                      { label: "Mobile-First", sub: "Thumb-friendly CTAs" },
                      { label: "WCAG 2.1 AA", sub: "Accessible contrast" },
                      { label: "Schema JSON-LD", sub: "LocalBusiness data" },
                      { label: "Cloudflare SSR", sub: "Managed edge hosting" },
                    ].map((pill) => (
                      <div key={pill.label} className="bg-[#F6F3ED] p-3 rounded-xl text-center">
                        <span className="font-display text-sm font-bold text-[#081B30] block">
                          {pill.label}
                        </span>
                        <span className="font-mono text-[10px] text-[#526479] mt-0.5 block">
                          {pill.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#526479]/15">
                  <span className="font-mono text-[11px] text-[#526479]">
                    POWERS: HARLEY DIGITAL WORKS BUILDS
                  </span>
                  <Link
                    to="/demos"
                    className="text-xs font-bold text-[#059669] hover:text-[#081B30] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Interactive Demos</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 02: Stitch Interactive Prototype Sandbox */}
      <section
        id="sandbox"
        className="w-full bg-[#081B30] py-16 lg:py-24 text-white border-b border-[#173C62]"
      >
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173C62]">
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold text-[#6ffbbe] uppercase tracking-widest">
                  INTERACTIVE WORKBENCH // 02
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  Interactive Prototype Sandbox
                </h2>
              </div>
              <p className="text-sm text-slate-300 max-w-md">
                Explore how our voice triage scripts and illustrative job quoting formulas respond
                to different trade scenarios.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Widget 1: Voice Triage Scenario Simulator */}
              <div className="lg:col-span-6 bg-[#173C62] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-[#6ffbbe]" />
                    <h3 className="font-display text-lg font-bold text-white">
                      Voice Triage Script Simulator
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-3 py-1 rounded bg-[#081B30] text-[#6ffbbe]">
                    {activeScenario.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  Select a trade call scenario below to inspect how Callum gathers the right fault
                  details before messaging the engineer:
                </p>

                <div className="grid grid-cols-3 gap-2 bg-[#081B30] p-1.5 rounded-xl">
                  {VOICE_SCENARIOS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveVoiceIdx(idx)}
                      className={`py-2.5 px-3 rounded-lg font-mono text-[11px] font-bold transition-all text-center cursor-pointer ${
                        activeVoiceIdx === idx
                          ? "bg-[#059669] text-white"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="bg-[#081B30] rounded-xl p-5 flex flex-col gap-4 border border-white/5">
                  <div className="flex items-start gap-3 text-xs">
                    <span className="px-2 py-0.5 rounded bg-[#173C62] text-slate-200 font-mono text-[10px] font-bold shrink-0">
                      CALLER
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      &ldquo;{activeScenario.caller}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#173C62] border-l-2 border-[#059669] text-xs">
                    <span className="px-2 py-0.5 rounded bg-[#059669] text-white font-mono text-[10px] font-bold shrink-0">
                      CALLUM
                    </span>
                    <p className="text-white leading-relaxed">
                      &ldquo;{activeScenario.agent}&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-slate-300 italic">{activeScenario.note}</p>
                </div>
              </div>

              {/* Widget 2: Dynamic Quoting Math Sandbox */}
              <div className="lg:col-span-6 bg-[#173C62] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[#6ffbbe]" />
                    <h3 className="font-display text-lg font-bold text-white">
                      Job Estimator Formula Sandbox
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-3 py-1 rounded bg-[#081B30] text-[#6ffbbe]">
                    ILLUSTRATIVE MATH
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  Adjust sample material costs and estimated site hours to see how our interactive
                  client quote calculators build a ballpark figure:
                </p>

                <div className="flex flex-col gap-5 bg-[#081B30] p-6 rounded-xl border border-white/5">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between font-mono text-[11px]">
                      <label htmlFor={matSliderId} className="text-slate-200 uppercase">
                        Sample Materials (Parts / Board / Unit):
                      </label>
                      <span className="text-[#6ffbbe] font-bold">
                        £{materialsCost.toLocaleString()}
                      </span>
                    </div>
                    <input
                      id={matSliderId}
                      type="range"
                      min={400}
                      max={6000}
                      step={50}
                      value={materialsCost}
                      aria-label="Sample materials cost in pounds"
                      aria-valuetext={`£${materialsCost}`}
                      onChange={(e) => setMaterialsCost(Number(e.target.value))}
                      className="w-full accent-[#10B981] cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-slate-300">
                      <span>£400 (Minor Work)</span>
                      <span>£6,000 (Full Upgrade)</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between font-mono text-[11px]">
                      <label htmlFor={labourSliderId} className="text-slate-200 uppercase">
                        Estimated Site Hours (@ £{hourlyRate}/hr):
                      </label>
                      <span className="text-[#6ffbbe] font-bold">{labourHours} Hours</span>
                    </div>
                    <input
                      id={labourSliderId}
                      type="range"
                      min={2}
                      max={40}
                      step={1}
                      value={labourHours}
                      aria-label="Estimated site labour hours"
                      aria-valuetext={`${labourHours} hours`}
                      onChange={(e) => setLabourHours(Number(e.target.value))}
                      className="w-full accent-[#10B981] cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-slate-300">
                      <span>2 hrs (Callout)</span>
                      <span>40 hrs (Full Install)</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col gap-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Materials (with 10% trade merchant allowance):</span>
                      <span className="font-mono text-white">
                        £{tradeRebateMaterials.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Estimated Skilled Labour ({labourHours} hrs):</span>
                      <span className="font-mono text-white">£{labourTotal.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="font-display text-base font-bold text-white">
                          Illustrative Ballpark Guide
                        </span>
                        <span className="block font-mono text-[10px] text-slate-300">
                          INCLUDES 25% CONTRACTOR MARGIN EXAMPLE
                        </span>
                      </div>
                      <span className="font-display text-2xl font-bold text-[#6ffbbe]">
                        £{illustrativeQuote.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 03: The Harley Labs Engineering Cycle + Collaboration CTA */}
      <section className="py-16 lg:py-24 bg-[#F6F3ED] text-[#081B30]">
        <Container>
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  tag: "BOTTLENECK DISCOVERY",
                  title: "Start With the Real Job",
                  desc: "We look at where time or enquiries are genuinely being lost—missed calls while on tools, slow manual quoting, or repetitive admin.",
                },
                {
                  step: "02",
                  tag: "WORKING PROTOTYPE",
                  title: "Build & Test Cleanly",
                  desc: "We build a small, focused prototype and test it with realistic trade scenarios before ever rolling it into a live client workflow.",
                },
                {
                  step: "03",
                  tag: "MANAGED DEPLOYMENT",
                  title: "Keep Human Oversight",
                  desc: "Useful tools graduate into Harley Digital Works packages, always with clear customer controls and direct founder accountability.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white p-7 rounded-2xl border border-[#526479]/15 shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-bold text-[#059669]">
                        {item.step}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-[#F6F3ED] text-[#081B30]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#081B30]">{item.title}</h3>
                    <p className="text-xs text-[#526479] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto max-w-2xl text-center bg-white p-8 sm:p-10 rounded-2xl border border-[#526479]/20 shadow-xs">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F6F3ED] px-3.5 py-1 text-xs font-bold text-[#081B30] font-mono">
                <Sparkles className="h-3.5 w-3.5 text-[#059669]" />
                AUTOMATION &amp; PROTOTYPING
              </span>
              <h2 className="mt-4 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#081B30]">
                Collaborate With Harley Labs
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#526479] leading-relaxed">
                If you run a trade or commercial business with repetitive manual tasks, or you want
                to test our voice receptionist or quoting tools, get in touch with Robbie.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <PillButton
                  as="link"
                  to="/contact"
                  search={{
                    service: "Harley Labs Systems & R&D Enquiry",
                    package: undefined,
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  variant="dark"
                  size="md"
                >
                  Send an Enquiry
                </PillButton>
                <PillButton as="link" to="/the-harley-group" variant="ghost" size="md">
                  About The Harley Group
                </PillButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
