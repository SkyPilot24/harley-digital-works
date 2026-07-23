import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  LucideIcon,
  ArrowRight,
  Check,
  Sparkles,
  Stethoscope,
  Mail,
  ExternalLink,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { submitLead } from "@/lib/lead-intake.functions";
import { toast } from "sonner";
import { useHomepageAnimations } from "@/hooks/use-homepage-animations";
import { parseLeadFormData } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harley Digital Works — Better websites. Smarter systems. Simpler growth." },
      {
        name: "description",
        content:
          "Harley Digital Works helps businesses and organisations build better websites, automate repetitive work and create scalable digital systems.",
      },
    ],
  }),
  component: NoemaHomepage,
});

function NoemaHomepage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const submitLeadFn = useServerFn(submitLead);

  useHomepageAnimations(containerRef);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = parseLeadFormData(fd, { package: "Aura Style" });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please verify your details.");
      return;
    }

    setBusy(true);
    try {
      await submitLeadFn({ data: parsed.data });
      toast.success("Enquiry received. Robbie will get back to you within 24 hours.");
      setSent(true);
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Could not send enquiry. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  // Scrambled manifesto words data
  const manifestoSentence = [
    { text: "We", x: -120, y: 150, r: -35 },
    { text: "build", x: 220, y: -200, r: 45 },
    { text: "useful", x: -300, y: 80, r: -20 },
    { text: "websites,", x: 180, y: 300, r: 55 },
    { text: "content,", x: -80, y: -280, r: -40 },
    { text: "and", x: 250, y: 120, r: 30 },
    { text: "automations", x: -400, y: -100, r: -60 },
    { text: "for", x: 90, y: 240, r: 15 },
    { text: "purpose-led", x: -280, y: -240, r: -50 },
    { text: "teams", x: 340, y: 80, r: 40 },
    { text: "with", x: -150, y: 180, r: -25 },
    { text: "plain", x: 210, y: -150, r: 35 },
    { text: "English", x: -90, y: 290, r: -15 },
    { text: "and", x: 120, y: -300, r: 25 },
    { text: "NHS-grade", x: -350, y: 190, r: -55 },
    { text: "reliability.", x: 400, y: -80, r: 60 },
  ];

  // Community win/testimonial card data (Scattered snap)
  const boardCards = [
    {
      type: "metric",
      label: "5-10 Assets",
      title: "From one source",
      desc: "Record once, then shape clips, graphics, and updates to feed community channels.",
      x: -250,
      y: 200,
      r: -25,
      bg: "bg-surface-cream",
    },
    {
      type: "testimonial",
      label: "NHS Reliability",
      title: "Integrity first",
      desc: "Robbie's NHS IT leadership brings calm: docs, risk management, and service continuity.",
      x: 300,
      y: -180,
      r: 18,
      bg: "bg-white",
    },
    {
      type: "metric",
      label: "1 Week Build",
      title: "Days, not months",
      desc: "Move from rough brief to a fully functional page, capture form, and follow-up paths.",
      x: -180,
      y: -300,
      r: -15,
      bg: "bg-surface-stone",
    },
    {
      type: "domain",
      label: "Premium Portfolio",
      title: "Active Monetisation",
      desc: "Curated domain inventory with Stripe-backed buy-now checkouts for brand building.",
      x: 220,
      y: 280,
      r: 22,
      bg: "bg-surface-mist",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-[#f4efe7] select-none overflow-x-hidden font-sans"
    >
      {/* 0. LOADER OVERLAY (z-9999) */}
      <div className="loader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]">
        {/* Animated wave path */}
        <div className="mb-8 h-20 w-44">
          <svg
            viewBox="0 0 42 18"
            className="h-full w-full stroke-[#4F46E5] stroke-[1.5] fill-none"
          >
            <path
              className="wave-path-1"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M3 9C8 1.8 14 1.8 21 9C28 16.2 34 16.2 39 9"
            />
            <path
              className="wave-path-2"
              strokeDasharray="100"
              strokeDashoffset="100"
              d="M3 9C8 16.2 14 16.2 21 9C28 1.8 34 1.8 39 9"
            />
          </svg>
        </div>
        {/* Rise letters */}
        <div className="flex overflow-hidden font-display text-4xl uppercase tracking-widest text-[#f4efe7] md:text-6xl">
          {Array.from("HARLEY DIGITAL WORKS").map((char, index) => (
            <span key={index} className="loader-letter inline-block translate-y-full opacity-0">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        {/* Staggered strips that scale in */}
        <div className="absolute inset-0 z-10 flex pointer-events-none">
          <div className="loader-strip flex-1 scale-y-0 bg-[#4F46E5]" />
          <div className="loader-strip flex-1 scale-y-0 bg-[#F43F5E]" />
          <div className="loader-strip flex-1 scale-y-0 bg-[#10B981]" />
          <div className="loader-strip flex-1 scale-y-0 bg-[#f4efe7]" />
        </div>
      </div>

      {/* FIXED DIVIDER GRID PATTERN */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.05]">
        <div className="grid h-full w-full grid-cols-5 grid-rows-4 border-l border-t border-[#f4efe7]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-r border-b border-[#f4efe7]" />
          ))}
        </div>
      </div>

      {/* FIXED NAVIGATION WITH BLEND MODE (z-60) */}
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 mix-blend-difference md:px-10">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-display text-2xl uppercase tracking-tighter text-[#f4efe7]">
            hdw
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#f4efe7]/80">
            works
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/services"
            className="text-xs font-semibold uppercase tracking-wider text-[#f4efe7] hover:opacity-85"
          >
            Services
          </Link>
          <Link
            to="/domains"
            className="text-xs font-semibold uppercase tracking-wider text-[#f4efe7] hover:opacity-85"
          >
            Domains
          </Link>
          <Link
            to="/about"
            className="text-xs font-semibold uppercase tracking-wider text-[#f4efe7] hover:opacity-85"
          >
            About
          </Link>
          <Link
            to="/resources"
            className="text-xs font-semibold uppercase tracking-wider text-[#f4efe7] hover:opacity-85"
          >
            Resources
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/admin"
            className="rounded-full border border-[#f4efe7]/30 bg-transparent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f4efe7] hover:bg-[#f4efe7]/10"
          >
            Admin
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-[#10B981] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:opacity-90"
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setNavOpen(!navOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4efe7] text-black md:hidden"
          aria-label="Toggle Navigation"
          aria-expanded={navOpen}
          aria-controls="mobile-main-nav"
        >
          <span className="text-xs font-bold font-mono">{navOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      {navOpen && (
        <div
          id="mobile-main-nav"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-[#050505] p-10 pt-24 text-[#f4efe7] md:hidden"
        >
          <div className="flex flex-col gap-6 text-5xl font-display uppercase tracking-tight">
            <Link to="/services" onClick={() => setNavOpen(false)}>
              Services
            </Link>
            <Link to="/domains" onClick={() => setNavOpen(false)}>
              Domains
            </Link>
            <Link to="/about" onClick={() => setNavOpen(false)}>
              About
            </Link>
            <Link to="/resources" onClick={() => setNavOpen(false)}>
              Resources
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/admin"
              onClick={() => setNavOpen(false)}
              className="flex items-center justify-center rounded-full border border-[#f4efe7]/30 py-3 font-semibold uppercase tracking-widest text-xs"
            >
              Control Centre
            </Link>
            <Link
              to="/contact"
              onClick={() => setNavOpen(false)}
              className="flex items-center justify-center rounded-full bg-[#10B981] py-3 font-semibold uppercase tracking-widest text-black text-xs"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="main-wrapper opacity-0">
        {/* SECTION 1: HERO (#hero) */}
        <section
          id="hero"
          className="relative flex h-screen w-screen items-center justify-center bg-[#4F46E5] overflow-hidden"
        >
          {/* Huge background wordmark */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none">
            <h2 className="font-display text-[22vw] uppercase tracking-tighter text-[#050505] opacity-25 leading-none select-none">
              HARLEY.WORKS
            </h2>
          </div>

          {/* 3D Perspective container */}
          <div className="relative z-10 flex h-[500px] w-full max-w-[1200px] items-center justify-center [perspective:1400px]">
            {/* Card 1 (Launch Plan) */}
            <div className="hero-card-1 absolute left-1/2 top-1/2 h-[380px] w-[290px] -translate-x-[180px] -translate-y-[190px] -rotate-6 rounded-2xl border border-black/10 bg-[#F43F5E] p-6 text-black shadow-lg will-change-transform">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">
                    Package 01
                  </span>
                  <h3 className="mt-4 font-display text-4xl uppercase tracking-tighter leading-[0.9]">
                    Launch Plan
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed opacity-80">
                    A complete responsive website delivered in a single week. AI-planning, copy
                    matching, and intake forms configured.
                  </p>
                </div>
                <div className="border-t border-black/10 pt-4">
                  <div className="font-display text-2xl uppercase tracking-tighter">
                    £800 - £1,200
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 mt-1">
                    Outcome: Page + Booking
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 (AI & Automation) - CENTRAL CARD WITH SHEEN & IDLE */}
            <div className="hero-card-2 absolute left-1/2 top-1/2 z-10 h-[430px] w-[320px] -translate-x-1/2 -translate-y-[215px] rounded-2xl border border-[#f4efe7]/20 bg-[#050505] p-8 text-[#f4efe7] shadow-2xl will-change-transform">
              {/* Soft sheen gradient screen */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#4F46E5]/10 via-[#F43F5E]/5 to-[#10B981]/15 opacity-40 mix-blend-screen pointer-events-none" />

              <div className="flex h-full flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 rounded-full bg-[#10B981]/10 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#10B981]">
                    <Sparkles size={8} /> Primary Offer
                  </div>
                  <Cpu size={14} className="text-[#10B981]" />
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#f4efe7]/60">
                    Pillar Offer
                  </span>
                  <h3 className="mt-4 font-display text-5xl uppercase tracking-tighter leading-[0.9] text-white">
                    Applied AI & Automation
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#f4efe7]/80">
                    Lightweight integrations, customized GPT setups, form triggers, and operational
                    checkpoints to eradicate administrative fatigue.
                  </p>
                </div>

                <div className="border-t border-[#f4efe7]/10 pt-4 flex justify-between items-end">
                  <div>
                    <div className="font-display text-2xl uppercase tracking-tighter text-[#10B981]">
                      Audits & Retainers
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#f4efe7]/60 mt-1">
                      Immediate time savings
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-[#10B981]" />
                </div>
              </div>
            </div>

            {/* Card 3 (Care Plans) */}
            <div className="hero-card-3 absolute left-1/2 top-1/2 h-[380px] w-[290px] translate-x-[180px] -translate-y-[190px] rotate-6 rounded-2xl border border-black/10 bg-[#10B981] p-6 text-black shadow-lg will-change-transform">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">
                    Package 03
                  </span>
                  <h3 className="mt-4 font-display text-4xl uppercase tracking-tighter leading-[0.9]">
                    Care Plans
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed opacity-80">
                    Hosting, performance checks, regular security updates, domain renewal, and
                    technical support managed as a quiet service.
                  </p>
                </div>
                <div className="border-t border-black/10 pt-4">
                  <div className="font-display text-2xl uppercase tracking-tighter">£150 / mo</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 mt-1">
                    Outcome: Continuous support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PILLARS (#pillars) */}
        <section
          id="pillars"
          className="relative flex h-screen w-screen flex-col justify-between bg-[#10B981] p-10 text-black"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">
              Core Methodology
            </span>
            <h2 className="pillar-title mt-6 font-display text-[7vw] uppercase tracking-tighter leading-none max-w-5xl">
              TRANSLATING ENTERPRISE POWER FOR SMALL OPERATORS.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mt-auto">
            {[
              {
                t: "Applied AI",
                d: "AI that drives real work speed-ups. Shorter prototyping, faster content formatting, and decision engines.",
              },
              {
                t: "Lightweight Data",
                d: "We structure customer forms, contact pipelines, and domain records to yield clear action points.",
              },
              {
                t: "Cloud Platforms",
                d: "Lightweight, reliable hosting, backup tasks, and secure database connections that just work.",
              },
              {
                t: "Engineering Craft",
                d: "Hands-on maker capability shaped by NHS systems discipline and clean web architectures.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="pillar-item rounded-xl border border-black/10 bg-white/40 p-6 backdrop-blur-md"
              >
                <span className="font-mono text-xs opacity-60">0{idx + 1}</span>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-tighter">{p.t}</h3>
                <p className="mt-2 text-xs leading-relaxed opacity-80">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: MANIFESTO (#manifesto) */}
        <section
          id="manifesto"
          className="relative flex h-screen w-screen items-center justify-center bg-[#f4efe7] text-[#050505] p-10 overflow-hidden"
        >
          {/* Decorative gradients */}
          <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-[#4F46E5]/10 filter blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-[#F43F5E]/10 filter blur-[80px]" />

          <div className="relative z-10 w-full max-w-5xl text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#050505]/60 mb-8 block">
              HDW Manifesto
            </span>

            {/* Scrambled snap container */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-[4vw] uppercase tracking-tighter leading-none text-black">
              {manifestoSentence.map((w, idx) => (
                <span
                  key={idx}
                  className="manifesto-word inline-block opacity-0 will-change-transform"
                  style={{
                    transform: `translate(${w.x}px, ${w.y}px) rotate(${w.r}deg)`,
                  }}
                >
                  {w.text}
                </span>
              ))}
            </div>

            {/* Hand-drawn arrow illustration */}
            <div className="absolute left-[8%] bottom-[-160px] h-[100px] w-[130px] hidden lg:block opacity-65">
              <svg
                viewBox="0 0 120 90"
                className="h-full w-full stroke-[#4F46E5] stroke-[2.5] fill-none"
              >
                <path d="M8 10 C 40 20, 70 40, 100 72" />
                <path d="M86 68 L 102 74 L 96 56" />
              </svg>
              <span className="absolute right-[-100px] bottom-4 font-hand text-lg text-[#4F46E5]">
                Direct, capable, human
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 4: WORK BOARD (#board) */}
        <section
          id="board"
          className="relative flex h-screen w-screen flex-col justify-between bg-[#10B981] p-10 text-black overflow-hidden"
        >
          {/* Flying dots midground */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <svg className="h-full w-full">
              <path
                className="flying-dot-1"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="6 10"
                d="M -100 200 C 400 300, 800 100, 1400 400"
                fill="none"
              />
              <path
                className="flying-dot-2"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="6 10"
                d="M -100 500 C 500 200, 700 600, 1400 300"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">
              Agency Output
            </span>
            <h2 className="font-display text-[7vw] uppercase tracking-tighter leading-none mt-4">
              PROVEN RESULTS. EVERY TIME.
            </h2>
          </div>

          {/* Snap Board Cards */}
          <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-auto">
            {boardCards.map((c, idx) => (
              <div
                key={idx}
                className={`board-card rounded-2xl border border-black/10 ${c.bg} p-6 shadow-md opacity-0 will-change-transform`}
                style={{
                  transform: `translate(${c.x}px, ${c.y}px) rotate(${c.r}deg)`,
                }}
              >
                <div className="flex flex-col justify-between h-full min-h-[180px]">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded-full">
                      {c.label}
                    </span>
                    <h3 className="mt-4 font-display text-2xl uppercase tracking-tighter leading-none">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed opacity-75 mt-3">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: CTA WIPES (#cta) */}
        <section id="cta" className="relative h-screen w-screen bg-black overflow-hidden">
          {/* Wipe 1: Rose (Bottom Swipe) */}
          <div className="wipe-rose absolute inset-0 z-10 flex translate-y-full items-center justify-center bg-[#F43F5E]">
            <h3 className="sweep-title-rose font-display text-[9vw] uppercase tracking-tighter text-black opacity-0 leading-none">
              NO COMPLEX RETROFITS.
            </h3>
          </div>

          {/* Wipe 2: Emerald (Left Swipe) */}
          <div className="wipe-emerald absolute inset-0 z-20 flex -translate-x-full items-center justify-center bg-[#10B981]">
            <h3 className="sweep-title-emerald font-display text-[9vw] uppercase tracking-tighter text-black opacity-0 leading-none">
              JUST THE WORK.
            </h3>
          </div>

          {/* Wipe 3: Black (Top Swipe) & Final Content Pane */}
          <div className="wipe-black absolute inset-0 z-30 flex translate-y-full flex-col justify-between bg-[#050505] p-10 text-[#f4efe7]">
            <div className="flex w-full items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#f4efe7]/60">
                Get in touch
              </span>
              <span className="font-hand text-lg text-[#10B981]">Robbie Harley, Founder</span>
            </div>

            {/* Final Content Pane */}
            <div className="final-pane grid gap-8 md:grid-cols-2 max-w-6xl mx-auto w-full items-center justify-center opacity-0 my-auto">
              <div>
                <h3 className="sweep-title-black font-display text-[5vw] uppercase tracking-tighter leading-none text-white">
                  TALK THROUGH A PROJECT.
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-[#f4efe7]/80 max-w-md">
                  We reply within one working day. No jargon, no high-pressure pitch. Just direct,
                  capable assistance to scope what you actually need.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="flex items-center gap-2 rounded-full border border-[#f4efe7]/30 bg-transparent px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#f4efe7] hover:bg-[#f4efe7]/10"
                  >
                    <Mail size={12} /> {siteConfig.contactEmail}
                  </a>
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#10B981] underline underline-offset-4 hover:opacity-80"
                  >
                    Open Control Centre <ExternalLink size={12} />
                  </Link>
                </div>
              </div>

              {/* High Fidelity Lead Capture Form */}
              <form
                onSubmit={handleContactSubmit}
                className="rounded-2xl border border-[#f4efe7]/10 bg-white/5 p-6 backdrop-blur-md"
              >
                {sent && (
                  <div className="mb-4 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 p-3 text-xs text-[#10B981]">
                    Thank you! Enquiry recorded. Robbie will respond within 24 hours.
                  </div>
                )}

                <div className="grid gap-4">
                  <div>
                    <label
                      className="block text-[11px] font-mono uppercase tracking-wider text-[#f4efe7]/60"
                      htmlFor="cta-name"
                    >
                      Your Name
                    </label>
                    <input
                      required
                      id="cta-name"
                      name="name"
                      type="text"
                      placeholder="Robbie"
                      className="mt-1 w-full rounded-lg border border-[#f4efe7]/10 bg-[#050505] px-3 py-2 text-sm text-[#f4efe7] focus:border-[#10B981] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-[11px] font-mono uppercase tracking-wider text-[#f4efe7]/60"
                      htmlFor="cta-email"
                    >
                      Email
                    </label>
                    <input
                      required
                      id="cta-email"
                      name="email"
                      type="email"
                      placeholder={`you@${siteConfig.domain}`}
                      className="mt-1 w-full rounded-lg border border-[#f4efe7]/10 bg-[#050505] px-3 py-2 text-sm text-[#f4efe7] focus:border-[#10B981] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-[11px] font-mono uppercase tracking-wider text-[#f4efe7]/60"
                      htmlFor="cta-company"
                    >
                      Organisation (optional)
                    </label>
                    <input
                      id="cta-company"
                      name="company"
                      type="text"
                      placeholder={siteConfig.name}
                      className="mt-1 w-full rounded-lg border border-[#f4efe7]/10 bg-[#050505] px-3 py-2 text-sm text-[#f4efe7] focus:border-[#10B981] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-[11px] font-mono uppercase tracking-wider text-[#f4efe7]/60"
                      htmlFor="cta-message"
                    >
                      How can we help?
                    </label>
                    <textarea
                      required
                      id="cta-message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about the website, content workflow, or automation you want to build..."
                      className="mt-1 w-full rounded-lg border border-[#f4efe7]/10 bg-[#050505] px-3 py-2 text-sm text-[#f4efe7] focus:border-[#10B981] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    className="mt-2 w-full rounded-full bg-[#10B981] py-3 text-xs font-semibold uppercase tracking-widest text-black hover:opacity-90 disabled:opacity-50 transition"
                  >
                    {busy ? "SUBMITTING..." : "SUBMIT ENQUIRY"}
                  </button>
                </div>
              </form>
            </div>

            <div className="flex w-full items-center justify-between text-[11px] text-[#f4efe7]/50 border-t border-[#f4efe7]/10 pt-4">
              <span>© {new Date().getFullYear()} HARLEY DIGITAL WORKS</span>
              <div className="flex gap-4">
                <Link to="/about" className="hover:underline">
                  About Robbie
                </Link>
                <Link to="/services" className="hover:underline">
                  Offer Packages
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
