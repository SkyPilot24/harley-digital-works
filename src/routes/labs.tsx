import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import {
  Cpu,
  Terminal,
  Activity,
  Bot,
  Zap,
  Layers,
  Database,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Code2,
  Sparkles,
  Building2,
  RefreshCw,
  Server,
  Compass,
} from "lucide-react";
import { ClientSiteCodeExporter } from "@/components/admin/ClientSiteCodeExporter";
import { LocalMapPackMatrixDesk } from "@/components/admin/LocalMapPackMatrixDesk";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Harley Labs | Systems Architecture, Edge Infrastructure & Digital R&D" },
      {
        name: "description",
        content:
          "Harley Labs is the digital product and software engineering division of The Harley Group, building high-speed edge rendering engines, automated revenue platforms, and local search telemetry.",
      },
    ],
  }),
  component: HarleyLabsPage,
});

const RESEARCH_VECTORS = [
  {
    icon: Zap,
    title: "Sub-50ms Edge SSR & Headless Architecture",
    badge: "Production Standard",
    description:
      "Zero-cold-start edge rendering engines compiled into global V8 isolates. Delivering sub-30ms Time to First Byte with zero layout shift.",
    specs: [
      "Sub-30ms TTFB across UK edge nodes",
      "Zero hydration layout shift (CLS 0.00)",
      "Streaming server components & partial prerendering",
      "Nitro V8 engine with automated cache revalidation",
    ],
  },
  {
    icon: Search,
    title: "Algorithmic Local Search & Geo-Grid Radar",
    badge: "Field Tested",
    description:
      "Precision crawling engines sampling Google Local Map Pack proximity grids, extracting competitor ranking matrices and automated NAP citation gaps.",
    specs: [
      "5x5 km high-density pin sampling",
      "Competitor review velocity tracking",
      "Automated microdata & schema auditing",
      "Organic rank volatility alerts",
    ],
  },
  {
    icon: Database,
    title: "Contractor Revenue OS & Instant Quoting",
    badge: "Commercial Venture",
    description:
      "Algorithmic quoting engines and automated client intake pipelines built for high-ticket trade operators to eliminate manual lead leakage.",
    specs: [
      "1-Click WhatsApp customer dispatch",
      "Instant trade ROI & project cost modelling",
      "Automated 5-Star SMS review booster",
      "Client Care Plan live sync desk",
    ],
  },
  {
    icon: Bot,
    title: "Autonomous Agent Orchestration & Workflow Tools",
    badge: "Active R&D",
    description:
      "Coordinated software tools specialized in research, architectural validation, code synthesis, and continuous deployment for trade digital platforms.",
    specs: [
      "Dynamic prompt graph routing",
      "Self-healing validation loops",
      "Antigravity & Gemini API SDK integration",
      "Persistent state & workspace synchronization",
    ],
  },
];

const VENTURE_PRODUCTS = [
  {
    name: "Revenue OS",
    status: "Active in Client Sites",
    description: "Automated instant trade quoting, lead qualification, and dynamic pricing models.",
    tag: "Commercial Tooling",
  },
  {
    name: "ContentFlow",
    status: "Internal Pipeline",
    description:
      "Technical copywriting generator calibrated for UK construction, engineering, and luxury home improvement.",
    tag: "Content Engine",
  },
  {
    name: "Domain OS",
    status: "Live Portfolio Management",
    description:
      "Automated DNS orchestration, appraisal, and landing page deployment for premium UK domains.",
    tag: "Infrastructure",
  },
];

const SIMULATION_MODES = [
  { id: "agents", label: "Agent Swarm Telemetry", icon: Bot },
  { id: "benchmarks", label: "Edge SSR Benchmarks", icon: Zap },
  { id: "contentflow", label: "ContentFlow Pipeline", icon: Terminal },
] as const;

type SimMode = (typeof SIMULATION_MODES)[number]["id"];

function HarleyLabsPage() {
  const [activeTab, setActiveTab] = useState<SimMode>("agents");
  const [isSimulating, setIsSimulating] = useState(false);

  const triggerSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 900);
  };

  return (
    <PageShell brand="labs">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f7f5ef] pt-20 pb-16 text-[#252720] md:pt-24 md:pb-20 border-b border-[#e2dec9]">
        <Container className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#171C23]/15 bg-white/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#171C23] shadow-sm backdrop-blur-md">
              <Cpu className="h-3.5 w-3.5 text-[#42C9E8]" />
              <span>Harley Labs · Automation · Prototypes · Digital Products</span>
            </div>
            <Link
              to="/the-harley-group"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#171C23]/10 bg-white/50 px-3 py-1.5 text-xs font-medium text-[#5a5d4e] hover:text-[#171C23] hover:border-[#171C23]/30 transition-colors"
            >
              <Building2 className="h-3 w-3 text-[#42C9E8]" />
              <span>Part of The Harley Group</span>
            </Link>
          </div>

          <div className="mt-8 mb-4 max-w-xs">
            <img
              src="/brand/2026-10-21/HL-Brand-Pack/08-Web-Ready/logo.svg"
              alt="Harley Labs | Part of The Harley Group"
              className="h-14 w-auto object-contain"
            />
          </div>

          <h1
            className="mt-4 max-w-4xl text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tight text-[#171C23] leading-[1.05]"
            style={{ fontFamily: "Bahnschrift, 'Arial Narrow', Arial, sans-serif" }}
          >
            Ideas into working systems.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5a5d4e]">
            Harley Labs explores practical automation, prototypes and new digital products. Part of
            The Harley Group, with an emphasis on building, testing and learning.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PillButton
              as="button"
              onClick={() => {
                const el = document.getElementById("labs-sandbox");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="dark"
              size="md"
            >
              Open Interactive Sandbox
            </PillButton>
            <PillButton
              as="link"
              to="/contact"
              search={{
                service: undefined,
                package: undefined,
                domain: undefined,
                websiteUrl: undefined,
              }}
              variant="ghost"
              size="md"
            >
              R&D Collaboration Enquiry
            </PillButton>
          </div>
        </Container>
      </section>

      {/* Interactive Labs Terminal & Sandbox */}
      <section
        id="labs-sandbox"
        className="py-16 md:py-24 bg-[#1e232a] text-white border-b border-slate-800"
      >
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#a3b899]">
                // Systems Telemetry
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Harley Labs Live Telemetry Desk
              </h2>
            </div>
            <button
              onClick={triggerSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-mono font-medium text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isSimulating ? "animate-spin text-[#a3b899]" : ""}`}
              />
              {isSimulating ? "Re-evaluating Telemetry..." : "Re-run Diagnostics"}
            </button>
          </div>

          {/* Sandbox Tabs */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {SIMULATION_MODES.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-xs font-mono font-semibold transition-colors ${
                    isActive
                      ? "bg-slate-900 text-[#a3b899] border-t-2 border-[#a3b899]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                  }`}
                >
                  <Icon className="h-4 w-4 text-[#a3b899]" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sandbox Screen */}
          <div className="mt-0 rounded-b-xl border border-t-0 border-slate-800 bg-slate-950 p-6 md:p-8 font-mono shadow-2xl">
            {activeTab === "agents" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    STATUS: 4 AGENT MODULES ACTIVE & SYNCHRONISED
                  </span>
                  <span>LATENCY: 12ms · MEMORY: 42MB</span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-xs text-[#a3b899]">
                      <span className="font-bold flex items-center gap-1.5">
                        <Bot className="h-3.5 w-3.5" /> Module #1: Lead Intelligence Synthesizer
                      </span>
                      <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-emerald-300 border border-emerald-800/40">
                        ONLINE
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 font-sans">
                      Enriches inbound quote requests, verifies UK company registration data, and
                      calculates estimated trade project scope.
                    </p>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Task Queue: <span className="text-white">0 pending (Realtime Stream)</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-xs text-[#a3b899]">
                      <span className="font-bold flex items-center gap-1.5">
                        <Code2 className="h-3.5 w-3.5" /> Module #2: Code Integrity Auditor
                      </span>
                      <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-emerald-300 border border-emerald-800/40">
                        ONLINE
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 font-sans">
                      Performs TypeScript compilation checks, Nitro SSR route validations, and
                      automated WCAG accessibility auditing.
                    </p>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Audit Score: <span className="text-emerald-400">100/100 Perfect Pass</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-xs text-[#a3b899]">
                      <span className="font-bold flex items-center gap-1.5">
                        <Search className="h-3.5 w-3.5" /> Module #3: Local Map Pack Radar
                      </span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 border border-slate-700">
                        SCANNING
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 font-sans">
                      Monitors 25-point geo-grid rankings for target trade keywords across
                      Manchester, Cheshire, and London.
                    </p>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Coverage:{" "}
                      <span className="text-white">
                        Local Map Pack grid tracking across tested nodes
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-xs text-[#a3b899]">
                      <span className="font-bold flex items-center gap-1.5">
                        <Activity className="h-3.5 w-3.5" /> Module #4: Edge Uptime Sentinel
                      </span>
                      <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-emerald-300 border border-emerald-800/40">
                        ACTIVE
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 font-sans">
                      Monitors Cloudflare edge node response times and triggers automated cache
                      revalidation on content updates.
                    </p>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Global Edge Availability: <span className="text-emerald-400">99.99%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "benchmarks" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
                  <span>EDGE SSR COMPILED BENCHMARKS (NITRO + TANSTACK START)</span>
                  <span className="text-emerald-400">A+ GRADE PERFORMANCE</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-emerald-400">22ms</div>
                    <div className="text-[11px] text-slate-400 mt-1">Time to First Byte (TTFB)</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-white">0.38s</div>
                    <div className="text-[11px] text-slate-400 mt-1">First Contentful Paint</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-emerald-400">0.00</div>
                    <div className="text-[11px] text-slate-400 mt-1">Cumulative Layout Shift</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-[#a3b899]">100</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Lighthouse Core Web Vitals
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-900/50 p-4 border border-slate-800 text-xs text-slate-300 font-mono space-y-1">
                  <div className="text-slate-500">// Edge SSR Build Artifact:</div>
                  <div>
                    Output: <span className="text-emerald-300">.output/server/index.mjs</span>{" "}
                    (Cloudflare Module Preset)
                  </div>
                  <div>
                    Compression:{" "}
                    <span className="text-slate-200">Brotli level 11 with edge streaming</span>
                  </div>
                  <div>
                    Cold Start Penalty:{" "}
                    <span className="text-emerald-300">0.00ms (Isolate warm pool)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contentflow" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
                  <span>CONTENTFLOW PIPELINE · TECHNICAL COPYWRITING GENERATOR</span>
                  <span className="text-[#a3b899]">CALIBRATED FOR UK TRADES</span>
                </div>

                <div className="rounded-lg bg-black/70 p-4 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                  <p className="text-slate-500">// Commercial trade copy synthesis:</p>
                  <p className="mt-2 text-slate-300">
                    &gt; [INPUT SCOPE]: Target: Commercial EV Charger Infrastructure & 3-Phase
                    Distribution. Location: Manchester & Cheshire. Tone: Authoritative,
                    compliance-led contractor.
                  </p>
                  <p className="mt-2 text-emerald-300">
                    &gt; [OUTPUT STREAM]: &quot;Commercial electrical infrastructure engineered for
                    uninterrupted operational uptime. From 3-phase board distribution to workplace
                    EV charging hubs, our fully accredited NICEIC Approved Contractors deliver
                    turnkey compliance and £10M public liability protection.&quot;
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Code Blueprint & Static Site Exporter Section */}
      <section
        id="code-exporter"
        className="py-16 md:py-24 bg-[#f7f5ef] text-[#252720] border-b border-[#e2dec9]"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#5a5d4e]">
              // Turnkey Site Compiler
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#252720] md:text-4xl">
              1-Click Standalone Trade Website Blueprint Compiler
            </h2>
            <p className="mt-3 text-[#5a5d4e] leading-relaxed">
              Export complete, production-grade React + Tailwind + Lucide trade website blueprints
              ready for instant V8 edge deployment on Cloudflare Workers, Netlify, or Vercel.
            </p>
          </div>

          <div className="mt-10">
            <ClientSiteCodeExporter />
          </div>
        </Container>
      </section>

      {/* Local Map-Pack Matrix Sub-Town Factory */}
      <section
        id="map-pack-matrix"
        className="py-16 bg-[#eef0e5] text-[#252720] border-b border-[#e2dec9]"
      >
        <Container>
          <LocalMapPackMatrixDesk />
        </Container>
      </section>

      {/* 4 Core Research Vectors */}
      <section className="py-16 md:py-24 bg-[#f7f5ef] text-[#252720] border-b border-[#e2dec9]">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#5a5d4e]">
              Core R&D Initiatives
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-[#252720]">
              Pioneering Technologies Engineered at Harley Labs.
            </h2>
            <p className="mt-3 text-[#5a5d4e]">
              We focus on practical, high-impact software architectures that deliver immediate
              commercial advantage.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {RESEARCH_VECTORS.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-[#e2dec9] bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef0e5] border border-[#e2dec9] text-[#252720]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-[#252720]/15 bg-[#eef0e5] px-3 py-1 text-xs font-mono text-[#252720]">
                      {v.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#252720]">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a5d4e]">{v.description}</p>

                  <div className="mt-6 border-t border-[#e2dec9] pt-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#5a5d4e] mb-3">
                      Architectural Specs
                    </h4>
                    <ul className="space-y-2">
                      {v.specs.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-2 text-xs text-[#252720] font-mono"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#4a7c59] shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Internal Software Ventures */}
      <section className="py-16 bg-[#eef0e5] text-[#252720] border-b border-[#e2dec9]">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#5a5d4e]">
              Internal Operating Systems
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#252720] md:text-3xl">
              Proprietary Venture Products
            </h2>
            <p className="mt-2 text-sm text-[#5a5d4e]">
              Software engines engineered inside Harley Labs to power client platforms and
              operational delivery.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {VENTURE_PRODUCTS.map((prod) => (
              <div
                key={prod.name}
                className="rounded-xl border border-[#e2dec9] bg-white p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#252720] font-bold">{prod.name}</span>
                    <span className="rounded bg-[#eef0e5] px-2 py-0.5 text-[#5a5d4e] text-[10px] font-mono">
                      {prod.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-[#5a5d4e] leading-relaxed">{prod.description}</p>
                </div>
                <div className="mt-6 border-t border-[#e2dec9] pt-3 flex items-center justify-between text-[11px] text-[#5a5d4e] font-mono">
                  <span>Status:</span>
                  <span className="text-[#4a7c59] font-semibold">{prod.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How Labs Powers HDW Trade Clients */}
      <section className="py-12 bg-white text-[#252720] border-b border-[#e2dec9]">
        <Container>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100/80 px-3 py-1 text-xs font-mono font-bold text-emerald-900">
                  <Zap className="h-3.5 w-3.5 text-emerald-700" />
                  <span>The Technology Engine Behind Harley Digital Works</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#252720]">
                  Why Edge Infrastructure Wins High-Ticket Trade Work
                </h3>
                <p className="text-sm text-[#5a5d4e] leading-relaxed">
                  Every website built by Harley Digital Works runs on the proprietary edge
                  infrastructure developed here in Harley Labs. When an emergency leak, power fault,
                  or boiler breakdown happens, homeowners search on their phone. Because our client
                  websites compile into global edge isolates and load in under 30 milliseconds
                  (compared to 4+ seconds for sluggish WordPress sites), our contractors capture the
                  £3,000+ job before competitors even finish rendering. Enterprise-grade speed with
                  zero headaches for the contractor.
                </p>
              </div>
              <Link
                to="/"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#252720] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#3a3e33] transition-colors"
              >
                <span>Explore Trade Websites</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* R&D Leadership & Systems Architecture */}
      <section className="py-16 md:py-24 bg-[#f7f5ef] text-[#252720] border-b border-[#e2dec9]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl border border-[#e2dec9] bg-white p-3 shadow-xl overflow-hidden group">
                <img
                  src="/images/robbie/04-labs-bw-editorial.jpg"
                  alt="Dr Robbie Harley - Harley Labs Systems Architecture & AI Direction"
                  className="w-full h-auto rounded-2xl object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-[#252720]/90 backdrop-blur-md p-4 text-white border border-[#252720]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Dr Robbie Harley, MBA</h4>
                      <p className="text-[11px] font-mono text-slate-300">
                        Head of Systems Architecture
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#1e232a] text-[#a3b899] border border-slate-700 px-2.5 py-1 rounded-full">
                      HARLEY LABS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#252720]/15 bg-white px-3 py-1 text-xs font-mono font-medium text-[#252720]">
                <Cpu className="h-3.5 w-3.5 text-[#5a5d4e]" />
                <span>R&D Philosophy & Systems Direction</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-[#252720]">
                Bridging Deep Software Research with Practical Commercial Utility.
              </h2>
              <p className="text-base text-[#5a5d4e] leading-relaxed">
                Harley Labs was created to engineer real, measurable software productivity. Rather
                than producing speculative proof-of-concepts, our research vectors solve concrete
                operating bottlenecks in edge infrastructure, high-velocity digital commerce, and
                real-time search analytics.
              </p>
              <div className="rounded-2xl border border-[#e2dec9] bg-white p-6 space-y-3 font-mono text-xs">
                <div className="text-[#252720] font-bold flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[#5a5d4e]" />
                  <span>// CORE LABS THESIS:</span>
                </div>
                <p className="text-[#5a5d4e] leading-relaxed italic">
                  &ldquo;Software architecture and edge compilation are only as valuable as the real
                  commercial efficiency they unlock. We build systems that eliminate operational
                  friction and deliver immediate speed.&rdquo;
                </p>
                <div className="pt-2 text-[11px] text-[#5a5d4e] flex items-center justify-between border-t border-[#e2dec9]">
                  <span>Stack: Nitro V8 + TanStack Start + Edge Cloud</span>
                  <span className="text-[#4a7c59] font-bold">100% Production Tested</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Labs Collaboration CTA */}
      <section className="py-16 md:py-24 bg-[#eef0e5] text-[#252720]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252720]/15 bg-white px-3.5 py-1 text-xs font-medium text-[#252720] font-mono">
              <Sparkles className="h-3.5 w-3.5 text-[#5a5d4e]" />
              R&D Partnerships & Systems Licensing
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Collaborate With Harley Labs
            </h2>
            <p className="mt-4 text-base text-[#5a5d4e] leading-relaxed">
              We partner with forward-thinking trade enterprises, commercial organizations, and
              technical teams seeking edge-native digital architecture and bespoke venture software.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PillButton
                as="link"
                to="/contact"
                search={{
                  service: undefined,
                  package: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
                variant="dark"
                size="md"
              >
                Submit R&D Inquiry
              </PillButton>
              <PillButton as="link" to="/the-harley-group" variant="ghost" size="md">
                The Harley Group Governance
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
