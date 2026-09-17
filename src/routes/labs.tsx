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
} from "lucide-react";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Harley Labs | R&D, Autonomous AI & Digital Engineering" },
      {
        name: "description",
        content:
          "Harley Labs is the research, AI agentic systems, and digital product division of The Harley Group, engineering multi-agent workflows, edge architectures, and automated tooling.",
      },
    ],
  }),
  component: HarleyLabsPage,
});

const RESEARCH_VECTORS = [
  {
    icon: Bot,
    title: "Autonomous Multi-Agent Orchestration",
    badge: "Active R&D",
    description:
      "Engineering coordinated agent swarms (specialised in research, architectural validation, code synthesis, and continuous deployment) that automate complex digital operations.",
    specs: [
      "Dynamic prompt graph routing",
      "Self-healing validation loops",
      "Antigravity & Gemini API SDK integration",
      "Persistent memory & workspace state sync",
    ],
  },
  {
    icon: Zap,
    title: "Sub-50ms Edge SSR & Headless Architectures",
    badge: "Production Ready",
    description:
      "Developing zero-cold-start edge rendering engines using Nitro and TanStack Start, compiled into global Cloudflare V8 isolates for instant worldwide delivery.",
    specs: [
      "Sub-30ms Time to First Byte (TTFB)",
      "Zero hydration layout shift (CLS 0.00)",
      "Streaming server components & partial prerendering",
      "Automated edge caching & stale-while-revalidate",
    ],
  },
  {
    icon: Search,
    title: "Algorithmic Local Search & Geo-Grid Radar",
    badge: "Field Tested",
    description:
      "Precision crawling engines that sample Google Local Map Pack proximity grids, extracting competitor ranking matrices and automated NAP citation gaps.",
    specs: [
      "5x5 km high-density pin sampling",
      "Competitor review velocity tracking",
      "Automated schema & microdata validation",
      "Organic rank volatility alerts",
    ],
  },
  {
    icon: Database,
    title: "Contractor Revenue OS & Intelligent Dispatch",
    badge: "Commercial Venture",
    description:
      "Algorithmic quoting engines and automated client onboarding pipelines designed specifically for trade operators, eliminating manual lead leakage.",
    specs: [
      "1-Click WhatsApp customer dispatch",
      "Instant trade ROI & project cost modelling",
      "Automated 5-Star SMS review booster",
      "Client Care Plan live sync desk",
    ],
  },
];

const VENTURE_PRODUCTS = [
  {
    name: "Revenue OS",
    status: "Integrated in Client Sites",
    description: "Automated instant trade quoting, lead qualification, and dynamic pricing models.",
    tag: "Commercial Tooling",
  },
  {
    name: "ContentFlow AI",
    status: "Proprietary Pipeline",
    description: "Deep-domain technical copywriting generator calibrated for UK construction & trades.",
    tag: "NLP Engine",
  },
  {
    name: "Domain OS",
    status: "Live Portfolio Management",
    description: "Automated appraisal, DNS orchestration, and landing page deployment for premium UK domains.",
    tag: "Infrastructure",
  },
];

const SIMULATION_MODES = [
  { id: "agents", label: "Agent Swarm Telemetry", icon: Bot },
  { id: "benchmarks", label: "Edge SSR Benchmarks", icon: Zap },
  { id: "contentflow", label: "ContentFlow AI Stream", icon: Terminal },
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
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0D14] pt-32 pb-20 text-white md:pt-44 md:pb-28 border-b border-indigo-950/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))]" />
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <Container className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-indigo-300 backdrop-blur-md">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              <span>Harley Labs · Advanced R&D & Autonomous Systems</span>
            </div>
            <Link
              to="/the-harley-group"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Building2 className="h-3 w-3 text-emerald-400" />
              <span>A Division of The Harley Group</span>
            </Link>
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,5.8vw,5rem)] font-bold tracking-tight text-white leading-[1.03]">
            Engineering Autonomous Workflows &{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              High-Velocity Edge Architectures.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Harley Labs is the research, engineering, and artificial intelligence incubator of The
            Harley Group. We build the autonomous agents, internal software engines, and edge-native
            frameworks that power modern digital commerce.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PillButton
              as="button"
              onClick={() => {
                const el = document.getElementById("labs-sandbox");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="light"
              size="md"
            >
              Open Interactive Sandbox
            </PillButton>
            <PillButton
              as="link"
              to="/contact"
              search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
              variant="ghost"
              size="md"
              className="border-indigo-900/80 bg-indigo-950/40 text-indigo-200 hover:bg-indigo-900/60 hover:text-white"
            >
              R&D Collaboration Desk
            </PillButton>
          </div>
        </Container>
      </section>

      {/* Interactive Labs Terminal & Sandbox */}
      <section id="labs-sandbox" className="py-20 md:py-28 bg-[#0D111C] text-white border-b border-slate-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
                // Interactive Sandbox
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Harley Labs Live Telemetry Desk
              </h2>
            </div>
            <button
              onClick={triggerSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-950/60 px-4 py-2 text-xs font-mono font-medium text-indigo-300 hover:bg-indigo-900/60 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSimulating ? "animate-spin text-indigo-400" : ""}`} />
              {isSimulating ? "Streaming Telemetry..." : "Re-run Diagnostics"}
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
                      ? "bg-slate-900 text-indigo-300 border-t-2 border-indigo-500"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                  }`}
                >
                  <Icon className="h-4 w-4 text-indigo-400" />
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
                    STATUS: 4 AGENTS ACTIVE & SYNCHRONISED
                  </span>
                  <span>LATENCY: 12ms · MEMORY: 42MB</span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-xs text-indigo-400">
                      <span className="font-bold flex items-center gap-1.5">
                        <Bot className="h-3.5 w-3.5" /> Agent #1: Lead Intelligence Synthesizer
                      </span>
                      <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-emerald-300 border border-emerald-800/40">
                        ONLINE
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 font-sans">
                      Autonomously enriches inbound quote requests, verifies UK company registration numbers, and calculates estimated project value.
                    </p>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Task Queue: <span className="text-white">0 pending (Realtime Stream)</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-xs text-indigo-400">
                      <span className="font-bold flex items-center gap-1.5">
                        <Code2 className="h-3.5 w-3.5" /> Agent #2: Autonomous Code Integrity Bot
                      </span>
                      <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-emerald-300 border border-emerald-800/40">
                        ONLINE
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 font-sans">
                      Performs real-time TypeScript compilation checks, Nitro SSR route validations, and automated accessibility auditing.
                    </p>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Audit Score: <span className="text-emerald-400">100/100 Perfect Pass</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-xs text-indigo-400">
                      <span className="font-bold flex items-center gap-1.5">
                        <Search className="h-3.5 w-3.5" /> Agent #3: Local Map Pack Radar
                      </span>
                      <span className="rounded bg-indigo-950/80 px-2 py-0.5 text-indigo-300 border border-indigo-800/40">
                        SCANNING
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 font-sans">
                      Monitors 25-point geo-grid rankings for client target trade keywords across Manchester, Cheshire, and London.
                    </p>
                    <div className="mt-3 text-[11px] text-slate-400">
                      Coverage: <span className="text-white">Top 3 Map Pack in 94% of tested nodes</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-xs text-indigo-400">
                      <span className="font-bold flex items-center gap-1.5">
                        <Activity className="h-3.5 w-3.5" /> Agent #4: Edge Uptime & Cache Sentinel
                      </span>
                      <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-emerald-300 border border-emerald-800/40">
                        ACTIVE
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 font-sans">
                      Monitors global Cloudflare edge node response times and triggers automatic cache warming on newly published case studies.
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
                  <span>EDGE COMPILED SSR BENCHMARKS (NITRO + TANSTACK ROUTER)</span>
                  <span className="text-emerald-400">A+ GRADE PERFORMANCE</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-emerald-400">22ms</div>
                    <div className="text-[11px] text-slate-400 mt-1">Time to First Byte (TTFB)</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-indigo-400">0.38s</div>
                    <div className="text-[11px] text-slate-400 mt-1">First Contentful Paint</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-cyan-400">0.00</div>
                    <div className="text-[11px] text-slate-400 mt-1">Cumulative Layout Shift</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-4 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-purple-400">100</div>
                    <div className="text-[11px] text-slate-400 mt-1">Lighthouse Core Web Vitals</div>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-900/50 p-4 border border-slate-800 text-xs text-slate-300 font-mono space-y-1">
                  <div className="text-slate-500">// Edge SSR Build Artifact:</div>
                  <div>Output: <span className="text-emerald-300">.output/server/index.mjs</span> (Cloudflare Module Preset)</div>
                  <div>Compression: <span className="text-indigo-300">Brotli 11x level with edge streaming</span></div>
                  <div>Cold Start Penalty: <span className="text-cyan-300">0.00ms (Isolate warm pool)</span></div>
                </div>
              </div>
            )}

            {activeTab === "contentflow" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
                  <span>CONTENTFLOW AI · REAL-TIME TECHNICAL COPY ENGINE</span>
                  <span className="text-cyan-400">GEMINI PRO EMBEDDINGS</span>
                </div>

                <div className="rounded-lg bg-black/70 p-4 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                  <p className="text-slate-500">// Generating bespoke commercial trade copy for NIC EIC Electrical Contractor:</p>
                  <p className="mt-2 text-indigo-300">
                    &gt; [PROMPT INPUT]: Target: Commercial EV Charger Installation & 3-Phase Distribution Upgrades. Location: Manchester / Cheshire. Tone: Authoritative, compliance-led, high-ticket contractor.
                  </p>
                  <p className="mt-2 text-emerald-300">
                    &gt; [OUTPUT STREAM]: &quot;Commercial electrical infrastructure built for uninterrupted operational uptime. From 3-phase board distribution to workplace EV charging hubs, our fully accredited NICEIC Approved Contractors deliver turnkey compliance and £10M public liability protection.&quot;
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 4 Core Research Vectors */}
      <section className="py-20 md:py-28 bg-[#0A0D14] text-white border-b border-slate-800">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
              Core R&D Initiatives
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-white">
              Pioneering Technologies Engineered at Harley Labs.
            </h2>
            <p className="mt-3 text-slate-300">
              We focus on practical, high-leverage software architectures that deliver immediate
              commercial advantages.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {RESEARCH_VECTORS.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-950 border border-indigo-800/50 text-indigo-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-indigo-500/30 bg-indigo-950/80 px-3 py-1 text-xs font-mono text-indigo-300">
                      {v.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{v.description}</p>

                  <div className="mt-6 border-t border-slate-800/80 pt-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                      Architectural Specs
                    </h4>
                    <ul className="space-y-2">
                      {v.specs.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
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
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
              Internal Operating Systems
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Proprietary Venture Products
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Software engines built inside Harley Labs to power client platforms and operational delivery.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {VENTURE_PRODUCTS.map((prod) => (
              <div
                key={prod.name}
                className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-indigo-400 font-semibold">{prod.name}</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 text-[10px] font-mono">
                      {prod.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">{prod.description}</p>
                </div>
                <div className="mt-6 border-t border-slate-800 pt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Status:</span>
                  <span className="text-emerald-400">{prod.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Labs Collaboration CTA */}
      <section className="py-20 bg-[#0A0D14] text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1 text-xs font-medium text-indigo-300 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              R&D Partnerships & Licensing
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Collaborate With Harley Labs
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              We partner with forward-thinking enterprises, trade organizations, and technology
              teams seeking agentic automation, edge architectures, or bespoke venture software.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PillButton
                as="link"
                to="/contact"
                search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
                variant="light"
                size="md"
              >
                Submit Research Inquiry
              </PillButton>
              <PillButton
                as="link"
                to="/the-harley-group"
                variant="ghost"
                size="md"
                className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
              >
                The Harley Group Governance
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
