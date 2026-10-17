import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileSpreadsheet,
  GitMerge,
  Layers,
  MailWarning,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NodeData {
  id: string;
  chaosLabel: string;
  chaosSub: string;
  chaosStatus: string;
  orderLabel: string;
  orderSub: string;
  orderLatency: string;
  // Chaos state coordinates (scattered, tilted, overlapping)
  cx: number;
  cy: number;
  cRot: number;
  // Order state coordinates (aligned 2x3 pipeline grid)
  ox: number;
  oy: number;
  IconChaos: React.ComponentType<{ className?: string }>;
  IconOrder: React.ComponentType<{ className?: string }>;
}

const WORKFLOW_NODES: NodeData[] = [
  {
    id: "node-1",
    chaosLabel: "Clients_FINAL_v4(2).csv",
    chaosSub: "Row 412: #REF! Error",
    chaosStatus: "Unverified",
    orderLabel: "Ingest & Schema Sync",
    orderSub: "Validated • 0ms drift",
    orderLatency: "12ms",
    cx: -145,
    cy: -95,
    cRot: -14,
    ox: -155,
    oy: -105,
    IconChaos: FileSpreadsheet,
    IconOrder: Layers,
  },
  {
    id: "node-2",
    chaosLabel: "Fwd: Re: Missing Invoice?",
    chaosSub: "3 Manual Follow-ups",
    chaosStatus: "Bottleneck",
    orderLabel: "Stripe Billing Webhook",
    orderSub: "Auto-reconciled ledger",
    orderLatency: "38ms",
    cx: 130,
    cy: -115,
    cRot: 11,
    ox: 155,
    oy: -105,
    IconChaos: MailWarning,
    IconOrder: Zap,
  },
  {
    id: "node-3",
    chaosLabel: "Copy-Paste CRM Entry",
    chaosSub: "Duplicate record found",
    chaosStatus: "Manual Entry",
    orderLabel: "CRM Two-Way Sync",
    orderSub: "Deduplicated entity graph",
    orderLatency: "24ms",
    cx: -165,
    cy: 25,
    cRot: 16,
    ox: -155,
    oy: 0,
    IconChaos: RefreshCw,
    IconOrder: GitMerge,
  },
  {
    id: "node-4",
    chaosLabel: "Zapier Task Failed #809",
    chaosSub: "Rate limit exceeded",
    chaosStatus: "Halted",
    orderLabel: "Queue Worker Cluster",
    orderSub: "Idempotent retry engine",
    orderLatency: "9ms",
    cx: 145,
    cy: 45,
    cRot: -9,
    ox: 155,
    oy: 0,
    IconChaos: Terminal,
    IconOrder: Cpu,
  },
  {
    id: "node-5",
    chaosLabel: "Where_is_the_contract.pdf",
    chaosSub: "Awaiting wet signature",
    chaosStatus: "Stalled 6d",
    orderLabel: "Automated Dispatch",
    orderSub: "Cryptographic audit trail",
    orderLatency: "18ms",
    cx: -105,
    cy: 125,
    cRot: -12,
    ox: -155,
    oy: 105,
    IconChaos: FileSpreadsheet,
    IconOrder: ShieldCheck,
  },
  {
    id: "node-6",
    chaosLabel: "Friday_Report_Manual.xlsx",
    chaosSub: "4.5 hrs/wk admin load",
    chaosStatus: "Outdated",
    orderLabel: "Live Executive Telemetry",
    orderSub: "Real-time P&L & SLA feed",
    orderLatency: "4ms",
    cx: 115,
    cy: 130,
    cRot: 15,
    ox: 155,
    oy: 105,
    IconChaos: MailWarning,
    IconOrder: CheckCircle2,
  },
];

export default function InteractiveHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const quickProgressRef = useRef<gsap.QuickToFunc | null>(null);

  const modeRef = useRef<"scroll" | "cursor" | "manual">("scroll");
  const reduceMotionRef = useRef(false);
  const [uiProgress, setUiProgress] = useState<number>(100);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const resize = () => {
      const scale = Math.min((stage.clientWidth - 16) / 600, (stage.clientHeight - 85) / 440);
      stage.style.setProperty("--engine-scale", String(scale));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          reduceMotionRef.current = reduceMotion;

          // Initialize cards in their chaotic positions
          WORKFLOW_NODES.forEach((node, idx) => {
            gsap.set(`.node-card-${idx}`, {
              x: node.cx,
              y: node.cy,
              rotation: node.cRot,
            });
          });

          gsap.set(".order-layer", { opacity: 0 });
          gsap.set(".chaos-layer", { opacity: 1 });
          gsap.set(".core-hub", { scale: 0.72, opacity: 0.2 });
          gsap.set(".circuit-line", { strokeDashoffset: 240, opacity: 0.08 });
          gsap.set(".chaos-scribble", { opacity: 0.65, scale: 1 });

          // Master paused timeline representing 0 (Chaos) -> 1 (Structured Engine)
          const tl = gsap.timeline({
            paused: true,
            onUpdate: () => {
              const p = Math.round(tl.progress() * 100);
              setUiProgress(p);
            },
          });

          tlRef.current = tl;

          // 1. Animate each workflow card from scattered chaos into the structured grid
          WORKFLOW_NODES.forEach((node, idx) => {
            tl.to(
              `.node-card-${idx}`,
              {
                x: node.ox,
                y: node.oy,
                rotation: 0,
                ease: "power3.inOut",
                duration: 1,
              },
              0,
            );
          });

          // 2. Crossfade internal card states & telemetry
          tl.to(
            ".chaos-layer",
            {
              opacity: 0,
              ease: "power2.inOut",
              duration: 0.55,
            },
            0.15,
          );

          tl.to(
            ".order-layer",
            {
              opacity: 1,
              ease: "power2.inOut",
              duration: 0.55,
            },
            0.35,
          );

          // 3. Dissolve chaotic red dependency tangles & activate structured bus lines
          tl.to(
            ".chaos-scribble",
            {
              opacity: 0,
              scale: 0.85,
              transformOrigin: "center center",
              ease: "power2.inOut",
              duration: 0.6,
            },
            0.1,
          );

          tl.to(
            ".circuit-line",
            {
              strokeDashoffset: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 0.75,
              stagger: 0.03,
            },
            0.25,
          );

          // 4. Power up central Harley Digital Engine core
          tl.to(
            ".core-hub",
            {
              scale: 1,
              opacity: 1,
              ease: "back.out(1.6)",
              duration: 0.7,
            },
            0.3,
          );

          // Smooth interpolator for cursor/slider control
          quickProgressRef.current = gsap.quickTo(tl, "progress", {
            duration: reduceMotion ? 0.05 : 0.55,
            ease: "power3.out",
          });

          // Set initial resting state (18% so user immediately perceives the transition potential)
          if (reduceMotion) {
            tl.progress(1);
          } else {
            tl.progress(0.18);
          }

          // ScrollTrigger scrubs the transformation naturally as the user scrolls down
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 45%",
            scrub: 0.6,
            onUpdate: (self) => {
              // Let scroll drive the timeline unless user is actively hovering the stage
              if (modeRef.current === "scroll" && !reduceMotion) {
                const mapped = gsap.utils.clamp(0.15, 1, self.progress * 1.35 + 0.15);
                quickProgressRef.current?.(mapped);
              }
            },
          });
        },
      );

      return () => mm.revert();
    }, sectionRef);
    return () => {
      observer.disconnect();
      ctx.revert();
      quickProgressRef.current = null;
      tlRef.current = null;
    };
  }, []);

  // Pointer movement over the interactive stage scrubs from Chaos (left) to Order (right)
  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      reduceMotionRef.current ||
      e.pointerType === "touch" ||
      !stageRef.current ||
      !quickProgressRef.current
    )
      return;
    modeRef.current = "cursor";
    const rect = stageRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    // Pad edges so user easily hits 0% and 100% before leaving the container
    const normalized = gsap.utils.clamp(0, 1, (relX - 0.08) / 0.84);
    quickProgressRef.current(normalized);
  };

  const handleStagePointerLeave = () => {
    if (modeRef.current === "cursor") modeRef.current = "scroll";
  };

  const handleManualSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) / 100;
    modeRef.current = "manual";
    if (reduceMotionRef.current) tlRef.current?.progress(val);
    else quickProgressRef.current?.(val);
  };

  const triggerPreset = (target: number) => {
    modeRef.current = "manual";
    if (reduceMotionRef.current) tlRef.current?.progress(target);
    else quickProgressRef.current?.(target);
  };

  // Compute live metrics based on current timeline progress
  const hoursSaved = ((uiProgress / 100) * 34.5).toFixed(1);
  const errorReduction = Math.round((uiProgress / 100) * 99.4);
  const isOrdered = uiProgress >= 65;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="engine-hero-heading"
      className="engine-hero relative min-h-[92vh] w-full overflow-hidden bg-hdw-midnight text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200"
    >
      {/* Subtle Architectural Grid Background (Zero runtime cost CSS) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-35"
      />

      {/* Ambient Top Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT COLUMN: Value Proposition & Telemetry Controls */}
          <div className="flex flex-col items-start lg:col-span-6">
            {/* System Status Pill */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 text-xs font-medium text-slate-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full opacity-75 ${
                    isOrdered ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    isOrdered ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
              </span>
              <span className="font-mono tracking-tight uppercase text-slate-400">
                Harley Digital Works
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-emerald-400">Systems Architecture</span>
            </div>

            <p className="mb-5 text-xs tracking-wide text-slate-300">Part of The Harley Group</p>

            {/* Headline */}
            <h1
              id="engine-hero-heading"
              className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
            >
              Turn fragile manual admin into a{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
                structured digital engine.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              We replace disconnected spreadsheets, inbox bottlenecks, and brittle duct-tape scripts
              with deterministic, custom-engineered software and automated operational pipelines.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/contact?service=Workflow%20architecture%20review"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/15 transition-colors duration-200 hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                Book an Architecture Audit
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#selected-work"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-6 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-700 hover:bg-slate-800/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                Explore our design studies
              </a>
            </div>

            {/* Live Transformation Readout Strip */}
            <div className="mt-10 w-full max-w-xl rounded-2xl border border-slate-800/90 bg-slate-900/60 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => triggerPreset(0)}
                  className={`flex items-center gap-1.5 font-mono transition-colors ${
                    !isOrdered
                      ? "font-semibold text-amber-400"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  01. CHAOTIC ADMIN
                </button>

                <span className="hidden items-center gap-1.5 text-[11px] text-slate-400 sm:inline-flex">
                  <SlidersHorizontal className="h-3 w-3 text-emerald-400" />
                  Move cursor over diagram or drag slider
                </span>

                <button
                  type="button"
                  onClick={() => triggerPreset(1)}
                  className={`flex items-center gap-1.5 font-mono transition-colors ${
                    isOrdered
                      ? "font-semibold text-emerald-400"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  02. AUTOMATED ENGINE
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </button>
              </div>

              {/* Accessible Interactive Range Scrubber */}
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={uiProgress}
                  onChange={handleManualSlider}
                  aria-label="Scrub between chaotic manual admin and structured automated engine"
                  aria-valuetext={`${uiProgress}% automated engine`}
                  className="min-h-11 w-full cursor-pointer accent-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                />
                <span className="w-11 text-right font-mono text-xs font-semibold text-emerald-400">
                  {uiProgress}%
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Illustrative workflow demo. Figures and timings are examples, not measured client
                results or service guarantees.
              </p>

              {/* Dynamic Telemetry Counters */}
              <div className="mt-3.5 grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800/80 pt-3 text-left">
                <div className="pr-3">
                  <p className="text-[11px] font-medium text-slate-500">Example admin saved</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-white">
                    {hoursSaved} <span className="text-xs font-normal text-slate-400">hrs/wk</span>
                  </p>
                </div>
                <div className="px-3">
                  <p className="text-[11px] font-medium text-slate-500">Example error reduction</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-emerald-400">
                    {errorReduction}%
                  </p>
                </div>
                <div className="pl-3">
                  <p className="text-[11px] font-medium text-slate-500">Pipeline State</p>
                  <p
                    className={`mt-0.5 font-mono text-xs font-semibold ${
                      isOrdered ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {isOrdered ? "DETERMINISTIC" : "FRAGMENTED"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Hardware-Accelerated Interactive Engine Canvas */}
          <div className="lg:col-span-6">
            <div
              ref={stageRef}
              onPointerMove={handleStagePointerMove}
              onPointerLeave={handleStagePointerLeave}
              className="group relative mx-auto h-[340px] w-full max-w-[600px] cursor-ew-resize select-none overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/50 shadow-2xl shadow-black/60 backdrop-blur-xl sm:h-[520px]"
            >
              {/* Top Window Header Bar */}
              <div className="relative z-20 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">
                    Illustrative workflow
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span
                    className={`inline-flex items-center gap-1 rounded px-2 py-0.5 ${
                      isOrdered
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    <Sparkles className="h-3 w-3" />
                    {isOrdered ? "EXAMPLE: CONNECTED" : "MANUAL BOTTLENECK"}
                  </span>
                </div>
              </div>

              <div className="engine-canvas" aria-hidden="true">
                {/* SVG Connection Layer (Chaotic Tangles vs Structured Bus Lines) */}
                <svg
                  viewBox="-300 -220 600 440"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="busGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="busGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* CHAOS STATE: Messy, tangled manual follow-up paths */}
                  <g className="chaos-scribble opacity-0">
                    <path
                      d="M -145 -95 C -40 -175, 45 60, 130 -115 C 190 -10, -210 -40, -165 25 C -90 140, 60 -60, 145 45 C 40 160, -40 40, -105 125 C -10 185, 65 95, 115 130"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                      opacity="0.55"
                    />
                    <path
                      d="M 130 -115 C -80 -30, 90 120, -105 125"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1.25"
                      strokeDasharray="3 6"
                      opacity="0.45"
                    />
                  </g>

                  {/* ORDER STATE: Clean orthogonal circuit traces into the central hub */}
                  <g>
                    {/* Top-Left Node (-155, -105) -> Core (0,0) */}
                    <path
                      className="circuit-line"
                      d="M -155 -105 L -65 -105 L -28 -20"
                      fill="none"
                      stroke="url(#busGradLeft)"
                      strokeWidth="2"
                      strokeDasharray="240"
                    />
                    {/* Mid-Left Node (-155, 0) -> Core (0,0) */}
                    <path
                      className="circuit-line"
                      d="M -155 0 L -38 0"
                      fill="none"
                      stroke="url(#busGradLeft)"
                      strokeWidth="2"
                      strokeDasharray="240"
                    />
                    {/* Bottom-Left Node (-155, 105) -> Core (0,0) */}
                    <path
                      className="circuit-line"
                      d="M -155 105 L -65 105 L -28 20"
                      fill="none"
                      stroke="url(#busGradLeft)"
                      strokeWidth="2"
                      strokeDasharray="240"
                    />
                    {/* Top-Right Node (155, -105) -> Core (0,0) */}
                    <path
                      className="circuit-line"
                      d="M 155 -105 L 65 -105 L 28 -20"
                      fill="none"
                      stroke="url(#busGradRight)"
                      strokeWidth="2"
                      strokeDasharray="240"
                    />
                    {/* Mid-Right Node (155, 0) -> Core (0,0) */}
                    <path
                      className="circuit-line"
                      d="M 155 0 L 38 0"
                      fill="none"
                      stroke="url(#busGradRight)"
                      strokeWidth="2"
                      strokeDasharray="240"
                    />
                    {/* Bottom-Right Node (155, 105) -> Core (0,0) */}
                    <path
                      className="circuit-line"
                      d="M 155 105 L 65 105 L 28 20"
                      fill="none"
                      stroke="url(#busGradRight)"
                      strokeWidth="2"
                      strokeDasharray="240"
                    />
                  </g>
                </svg>

                {/* Interactive Stage Coordinate Origin (Center of Stage) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* CENTRAL HARLEY DIGITAL ENGINE HUB */}
                  <div className="core-hub pointer-events-none relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-emerald-400/40 bg-slate-950/95 shadow-[0_0_50px_-10px_rgba(16,185,129,0.55)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <span className="mt-1 font-mono text-[9px] font-bold tracking-widest text-emerald-300">
                      HDW CORE
                    </span>
                  </div>

                  {/* WORKFLOW NODES (Hardware-accelerated via x/y/rotation transforms) */}
                  {WORKFLOW_NODES.map((node, index) => {
                    const ChaosIcon = node.IconChaos;
                    const OrderIcon = node.IconOrder;

                    return (
                      <div
                        key={node.id}
                        style={{ transform: `translate(${node.ox}px, ${node.oy}px)` }}
                        className={`node-card-${index} absolute z-20 w-[192px] will-change-transform`}
                      >
                        <div className="relative h-[68px] w-full overflow-hidden rounded-xl bg-slate-900/95 shadow-lg backdrop-blur-md">
                          {/* CHAOS STATE LAYER */}
                          <div className="chaos-layer opacity-0 absolute inset-0 flex flex-col justify-between rounded-xl border border-amber-500/35 bg-gradient-to-br from-amber-950/35 via-slate-900 to-slate-900 p-2.5">
                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 truncate">
                                <ChaosIcon className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                                <span className="truncate font-mono text-[11px] font-medium text-amber-100">
                                  {node.chaosLabel}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="truncate text-[10px] text-amber-300/80">
                                {node.chaosSub}
                              </span>
                              <span className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-amber-300">
                                {node.chaosStatus}
                              </span>
                            </div>
                          </div>

                          {/* ORDER STATE LAYER */}
                          <div className="order-layer absolute inset-0 flex flex-col justify-between rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 p-2.5">
                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 truncate">
                                <OrderIcon className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                <span className="truncate text-[11px] font-semibold text-slate-100">
                                  {node.orderLabel}
                                </span>
                              </div>
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="truncate text-[10px] text-slate-400">
                                {node.orderSub}
                              </span>
                              <span className="shrink-0 rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] text-emerald-300">
                                {node.orderLatency}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Subtle Bottom Interactive Hint Bar */}
              <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center px-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/90 bg-slate-950/85 px-3.5 py-1 text-[11px] text-slate-400 shadow-md backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    <span className="sm:hidden">Use the slider above to compare.</span>
                    <span className="hidden sm:inline">
                      Hover left for{" "}
                      <strong className="font-medium text-amber-300">Manual Chaos</strong> • Hover
                      right for{" "}
                      <strong className="font-medium text-emerald-300">Automated Engine</strong>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
