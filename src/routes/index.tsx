import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Phone,
  Play,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ConceptShowcase } from "@/components/site/ConceptShowcase";
import { BeforeAfterComparison } from "@/components/site/BeforeAfterComparison";
import { TradeShowcaseSection } from "@/components/site/TradeShowcaseSection";
import { HeroTransformationVideoModal } from "@/components/site/HeroTransformationVideoModal";
import {
  FloatingQuoteCalculatorBadge,
  TradeQuoteCalculatorModal,
} from "@/components/site/TradeQuoteCalculatorModal";
import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () =>
    buildPageSeoHead({
      title: "Your website and enquiries, looked after. | Harley Digital Works",
      description:
        "We write, build and run your website and enquiry form, so customers can reach you and you can get on with the job.",
      path: "/",
    }),
  component: HomePage,
});

const COMMITMENTS = [
  {
    code: "01 // COMMITMENT",
    title: "Full Final Approval",
    description:
      "You approve every word, fact, and finished page before it goes live to the public.",
    footer: "VERIFIED STAGING",
  },
  {
    code: "02 // MILESTONE",
    title: "50/50 Split Payment",
    description:
      "The final 50% balance is only payable after you test and formally sign off the build.",
    footer: "ZERO RISK DEPOSIT",
  },
  {
    code: "03 // PROPRIETARY",
    title: "Your Assets Always",
    description:
      "You retain complete ownership of your domain DNS, brand photography, and code.",
    footer: "100% OWNERSHIP",
  },
  {
    code: "04 // ROLLING CARE",
    title: "Fair Flexibility",
    description:
      "Cancel your care plan anytime on 30 days’ notice and receive a full static export.",
    footer: "NO LOCK-IN",
  },
  {
    code: "05 // SLA TERMS",
    title: "Everything in Writing",
    description:
      "Scope, turnaround schedule, and response commitments are documented upfront.",
    footer: "HARLEY GOVERNANCE",
  },
];

const SETUP_DELIVERABLES = [
  {
    bold: "5-Page Trade Website:",
    rest: "Home, About, Confirmed Services, Selected Project Work, Contact & Enquiry Journey.",
  },
  {
    bold: "Done-for-You Trade Copy:",
    rest: "Written by our studio based on your confirmed certifications and high-margin services.",
  },
  {
    bold: "High-Conversion Mobile UX:",
    rest: "Fast loading, phone-first enquiry routes, and verified trade accreditations strip.",
  },
  {
    bold: "Domain & Business Email Protection:",
    rest: "Seamless DNS setup preserving your existing Google Workspace / Outlook inbox.",
  },
  {
    bold: "Two Revision Rounds:",
    rest: "Full private staging preview before public launch. You approve before going live.",
  },
];

const CARE_DELIVERABLES = [
  {
    bold: "Cloudflare Enterprise Hosting:",
    rest: "SSL maintenance, daily backups, DDoS protection, and 99.9% uptime monitoring.",
  },
  {
    bold: "Monthly Edit Batch:",
    rest: "One non-accumulating content update batch per month (up to 30 mins) for rates, photos, or text.",
  },
  {
    bold: "Regular Enquiry Health Checks:",
    rest: "Weekly automated submission tests ensuring leads never disappear into spam.",
  },
  {
    bold: "Local Performance Monitoring:",
    rest: "Google Business review workflows and quarterly speed health reviews.",
  },
  {
    bold: "Direct Founder Access:",
    rest: "Priority support via WhatsApp and direct studio telephone line with Robbie Harley.",
  },
];

const FAQS = [
  {
    question: "Do you work with tradespeople across the whole UK?",
    answer:
      "Yes. While our headquarters are in Bristol and many of our clients operate across the South West and M4 corridor, we engineer and manage digital infrastructure for ambitious trade specialists across the region.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Just a 20-minute phone call to confirm your service focus, qualifications, and ideal jobs. We handle 100% of the copywriting and layout. You simply review our private staging build and approve the facts.",
  },
  {
    question: "How quickly can my website launch?",
    answer:
      "Because we strictly limit client onboarding to 2 active builds at a time, typical delivery is within 2 to 3 weeks from receipt of your deposit and initial discovery call.",
  },
  {
    question: "Can I keep my domain and business email?",
    answer:
      "Absolutely. You maintain 100% ownership of your domain. We configure the DNS records to preserve your Google Workspace or Microsoft 365 business email with zero downtime.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Your £249/mo care plan kicks in immediately. We manage hosting, security, daily backups, regular enquiry form checks, and carry out your monthly edit requests so you never have to touch a website builder again.",
  },
];

function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;
    const timeoutId = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <PageShell quiet>
      <div className="flex w-full flex-col bg-[#f8f9ff] text-[#0b1c30] antialiased">
        {/* HERO SECTION: VARIANT 2 STRUCTURED MODULAR BENTO GRID (STITCH UI) */}
        <section className="relative w-full overflow-hidden bg-[#f8f9ff] py-8 lg:py-12">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6 space-y-4">
            {/* Top Bento Control Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 p-3.5 sm:p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e5eeff] text-[#081B30] font-mono text-[11px] font-bold uppercase tracking-[0.08em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse" />
                  WEBSITES · ENQUIRY SYSTEMS · DIGITAL CARE FOR AMBITIOUS UK TRADES
                </div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d] flex items-center gap-2">
                  <span>STRATEGY. DESIGN. WORDS. CARE.</span>
                  <span className="text-[#74777d]">/</span>
                  <span className="text-[#081B30] font-bold">ONE STUDIO. YOUR WHOLE WEBSITE.</span>
                </div>
              </div>
              <div className="md:col-span-4 p-3.5 sm:p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] shadow-xs flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] font-bold uppercase text-[#081B30] tracking-[0.08em]">PILOT CAPACITY: 2 SPOTS</span>
                  <span className="text-[12px] text-[#44474d]">BRISTOL, BATH &amp; THE M4 CORRIDOR</span>
                </div>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#059669]" />
                </span>
              </div>
            </div>

            {/* Integrated Bento Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* Bento Cell 1: Main Proposition (7 cols) */}
              <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E2E8F0] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#006c49] uppercase tracking-[0.08em]">
                    <CheckCircle2 className="h-4 w-4 text-[#006c49]" />
                    <span>HARLEY DIGITAL WORKS DISPATCH</span>
                  </div>
                  <h1 className="font-display text-[38px] sm:text-[50px] lg:text-[54px] font-bold text-[#081B30] tracking-[-0.03em] leading-[1.12]">
                    Your website
                    <br />
                    and enquiries,
                    <br />
                    <span className="font-serif italic font-normal text-[#44474d]">
                      looked after.
                    </span>
                  </h1>
                  <p className="max-w-xl text-[17px] sm:text-[18px] leading-[28px] tracking-[-0.01em] text-[#44474d]">
                    We write, build and run your website and enquiry form, so customers can
                    reach you and you can get on with the job.
                  </p>
                </div>

                {/* Dual Call to Action Buttons Integrated Matrix */}
                <div className="space-y-4 pt-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex h-12 items-center justify-center rounded-xl bg-[#081B30] px-6 text-[14px] font-semibold text-white shadow-[0_4px_14px_-2px_rgba(8,27,48,0.25)] transition-all hover:bg-[#0F2642]"
                    >
                      Get your website plan{" "}
                      <span className="ml-2 font-mono text-[12px] font-bold text-[#6ffbbe]">
                        →
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setIsVideoModalOpen(true)}
                      className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-[#F7F5EE] px-4 text-[14px] font-semibold text-[#081B30] transition-all hover:bg-[#F3F4F6] border border-[#E2E8F0] cursor-pointer"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#081B30] text-xs text-white">
                        <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                      </span>
                      <span>Watch 55s transformation</span>
                      <span className="rounded bg-[#dce9ff] px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#0b1c30]">
                        OLD VS HDW
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCalcModalOpen(true)}
                      className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#006c49]/30 bg-[#eff4ff] px-4 text-[13px] font-semibold text-[#081B30] shadow-2xs transition-all hover:bg-[#e5eeff] cursor-pointer"
                    >
                      <Calculator className="h-4 w-4 text-[#006c49]" />
                      <span className="font-bold">Instant Quote Calculator</span>
                      <span className="rounded bg-[#006c49] text-white px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                        LIVE DEMO
                      </span>
                    </button>
                  </div>

                  {/* Micro-trust Ledger Strip Bento Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#eff4ff] p-3.5 text-[#0b1c30] border border-[#dce9ff]">
                    <span className="text-[13px] text-[#44474d]">£1,495 setup (50% deposit / 50% approval)</span>
                    <span className="text-[13px] font-semibold text-[#081B30]">
                      £249/mo all-inclusive care
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#006c49]">
                      PILOT CAPACITY: 2 SPOTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Bento Cell 2: Live Screen Transformation Visual Hero Unit (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#081B30] border border-[#1E3A5F] shadow-xl flex flex-col justify-between">
                {/* Header bar of the simulated tablet viewport */}
                <div className="px-4 py-3 bg-[#0F2642] flex items-center justify-between border-b border-[#1E3A5F]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ba1a1a]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#4edea3]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/70" />
                  </div>
                  <a
                    href="#before-after"
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#d8e2ff] hover:text-[#6ffbbe] transition-colors"
                  >
                    BEFORE &amp; AFTER TRANSFORMATION ↘
                  </a>
                </div>

                {/* Hero Real Photography Asset with Overlays */}
                <div className="relative flex-1 min-h-[380px]">
                  <img
                    alt="UK trade contractor on site in front of professional van checking commercial job enquiries on mobile smartphone"
                    className="h-full w-full object-cover object-center contrast-[1.05]"
                    src="/images/home/renewables-solar-ev.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "/images/home/renewables-solar-ev.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081B30] via-transparent to-transparent opacity-85" />

                  {/* Floating Notification Pill (30s WhatsApp lead) */}
                  <div className="absolute right-4 top-4 max-w-xs rounded-xl bg-[#081B30]/95 p-3 text-white shadow-xl backdrop-blur-md border border-[#1E3A5F]">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
                      </span>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#6ffbbe]">
                        LIVE DISPATCH · WHATSAPP
                      </span>
                    </div>
                    <p className="text-[13px] font-medium leading-[20px] text-[#eff4ff]">
                      New £12,500 Commercial EV enquiry routed to phone in 30s
                    </p>
                  </div>

                  {/* Trade Accreditations Strip */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/95 p-3 text-[#081B30] shadow-sm backdrop-blur border border-[#E2E8F0]">
                    <div>
                      <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
                        Verified Accreditations Built-In
                      </div>
                      <div className="text-[14px] font-bold leading-[20px] text-[#081B30]">
                        NICEIC Approved · Gas Safe · OZEV Authorised
                      </div>
                    </div>
                    <span className="rounded bg-[#6cf8bb] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#00714d]">
                      100% Client Owned
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01 — THE POSSIBILITIES (Interactive Design Studies Showcase) */}
        <section id="work" className="w-full bg-[#F7F5EE] py-14 lg:py-20">
          <div className="mx-auto max-w-[1280px] space-y-10 px-5 sm:px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
                  01 / THE POSSIBILITIES
                </div>
                <h2 className="font-display text-[32px] font-bold leading-[1.18] tracking-[-0.025em] text-[#081B30] sm:text-[40px]">
                  Different businesses.
                  <br />
                  Distinctive websites.
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-[24px] text-[#44474d]">
                Your website should feel like your business. Explore three independent
                design studies — click any study to inspect the full desktop and mobile
                design.
              </p>
            </div>

            {/* Real Interactive Concept Showcase (01 Form & Field, 02 Solis, 03 Stillwater) */}
            <div className="studio-project-grid">
              <ConceptShowcase concept="architecture" featured />
              <ConceptShowcase concept="solar" />
              <ConceptShowcase concept="interior" />
            </div>

            <div className="pt-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
              ORIGINAL DESIGN CONCEPTS BY HARLEY DIGITAL WORKS. ILLUSTRATIVE PHOTOGRAPHY ·
              NOT COMMISSIONED CLIENT SITES.
            </div>
          </div>
        </section>

        {/* SECTION 02 — INTERACTIVE BEFORE & AFTER TRANSFORMATION */}
        <section id="before-after" className="w-full bg-[#f8f9ff] py-14 lg:py-20">
          <div className="mx-auto max-w-[1280px] space-y-10 px-5 sm:px-6">
            <BeforeAfterComparison
              initialTradeId="electrical-ev"
              showAllTrades={true}
              featuredOnly={false}
              sectionKicker="02 / BEFORE & AFTER DESIGN STUDIES"
              title="See what your website could become"
              subtitle="Compare two illustrative designs for the same trade. Drag the divider or switch between desktop and mobile to see how clearer words, layout and enquiry routes change the experience."
            />

            {/* Action Prompt Box */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-[#e5eeff] p-6 md:flex-row border border-[#dce9ff]">
              <div>
                <h4 className="font-display text-[20px] font-semibold leading-[28px] text-[#081B30]">
                  See the possibilities for your business.
                </h4>
                <p className="text-[13px] leading-[20px] text-[#44474d]">
                  Tell us about your existing website and what you would like it to do
                  better.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCalcModalOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#081B30]/20 bg-white px-4 text-[14px] font-semibold text-[#081B30] transition-all hover:bg-[#F7F5EE] cursor-pointer"
                >
                  <Calculator className="h-4 w-4 text-[#006c49]" />
                  Test Quote Calculator Demo
                </button>
                <Link
                  to="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#081B30] px-6 text-[14px] font-semibold text-white transition-all hover:bg-[#0F2642]"
                >
                  Get your website plan <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03 & 04 — ENGINEERED SPECIFICALLY FOR UK TRADES + HONEST VALUE COMPARISON */}
        <TradeShowcaseSection />

        {/* SECTION 05 & 06 — THE HARLEY STANDARD & ZERO-RISK COMMITMENTS */}
        <section className="w-full bg-[#081B30] py-14 text-white lg:py-20">
          <div className="mx-auto max-w-[1280px] space-y-8 px-5 sm:px-6">
            {/* Section Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#6ffbbe]">
                  06 / WHAT WE COMMIT TO
                </div>
                <h2 className="font-display text-[32px] font-bold leading-[1.18] tracking-[-0.025em] text-white sm:text-[40px]">
                  What we commit to.
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-[24px] text-[#eff4ff]">
                Clear terms, written in advance, and designed to protect your trade
                business from unnecessary agency risks.
              </p>
            </div>

            {/* 5 High-Trust Commitment Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {COMMITMENTS.map((card) => (
                <div
                  key={card.code}
                  className="flex flex-col justify-between space-y-3 rounded-xl bg-[#0F2642] p-5 border border-[#1E3A5F]"
                >
                  <div>
                    <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#10B981]">
                      {card.code}
                    </div>
                    <h4 className="mt-1.5 font-display text-[20px] font-semibold leading-[26px] text-white">
                      {card.title}
                    </h4>
                    <p className="mt-2 text-[13px] leading-[20px] text-[#eff4ff]">
                      {card.description}
                    </p>
                  </div>
                  <span className="pt-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#d8e2ff]">
                    {card.footer}
                  </span>
                </div>
              ))}
            </div>

            {/* Micro Banner within dark container */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-[#0F2642]/70 p-5 border border-[#1E3A5F] sm:flex-row">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 shrink-0 rounded-full bg-[#10B981]" />
                <span className="text-[15px] leading-[24px] text-[#eff4ff]">
                  Backed by The Harley Group. Every build is individually inspected and
                  approved before public launch.
                </span>
              </div>
              <Link
                to="/contact"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-white px-5 text-[14px] font-bold text-[#081B30] transition-colors hover:bg-[#f8f9ff]"
              >
                Get your website plan →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 07 — A CLEAR INVESTMENT (Pricing & Digital Care) */}
        <section id="packages" className="w-full bg-[#f8f9ff] py-14 lg:py-20">
          <div id="pricing" className="mx-auto max-w-[1280px] space-y-8 px-5 sm:px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
                  07 / A CLEAR INVESTMENT
                </div>
                <h2 className="font-display text-[32px] font-bold leading-[1.18] tracking-[-0.025em] text-[#081B30] sm:text-[40px]">
                  A clear investment. A better website.
                </h2>
              </div>
              <div className="md:text-right">
                <span className="inline-block rounded bg-[#6cf8bb] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#00714d]">
                  Quality Guard: Strictly 2 Active Builds At Any Time
                </span>
                <p className="mt-1 text-[13px] leading-[20px] text-[#44474d]">
                  An initial build fee. Ongoing monthly care. One clear proposal covering
                  both.
                </p>
              </div>
            </div>

            {/* Main Investment Ledger Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left: Setup Card */}
              <div className="flex flex-col justify-between space-y-6 rounded-xl bg-white p-6 shadow-[0_4px_16px_rgba(8,27,48,0.06)] border border-[#dce9ff] sm:p-8 lg:col-span-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
                      01 / INITIAL SETUP
                    </span>
                    <span className="rounded bg-[#e5eeff] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#081B30]">
                      50% DEPOSIT / 50% APPROVAL
                    </span>
                  </div>
                  <div className="font-display text-[48px] font-bold leading-none tracking-[-0.03em] text-[#081B30] sm:text-[56px]">
                    £1,495
                  </div>
                  <p className="text-[15px] leading-[24px] text-[#44474d]">
                    50% deposit (£747.50) reserves your slot. 50% balance (£747.50)
                    payable only upon your final preview approval.
                  </p>
                </div>

                {/* Setup Deliverables List */}
                <div className="space-y-3 pt-1 text-[13px] leading-[20px]">
                  {SETUP_DELIVERABLES.map((item) => (
                    <div
                      key={item.bold}
                      className="flex items-start gap-2.5 text-[#081B30]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#006c49]" />
                      <span>
                        <strong>{item.bold}</strong> {item.rest}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-[#081B30] text-[14px] font-semibold text-white transition-all hover:bg-[#0F2642]"
                  >
                    Reserve Setup Build Slot →
                  </Link>
                </div>
              </div>

              {/* Right: Monthly Care Card */}
              <div className="flex flex-col justify-between space-y-6 rounded-xl bg-white p-6 shadow-[0_4px_16px_rgba(8,27,48,0.06)] border border-[#dce9ff] sm:p-8 lg:col-span-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
                      02 / ONGOING CARE
                    </span>
                    <span className="rounded bg-[#dce9ff] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#0b1c30]">
                      ROLLING 30-DAY AGREEMENT
                    </span>
                  </div>
                  <div className="font-display text-[48px] font-bold leading-none tracking-[-0.03em] text-[#081B30] sm:text-[56px]">
                    £249{" "}
                    <span className="text-[22px] font-normal text-[#44474d]">
                      / month
                    </span>
                  </div>
                  <p className="text-[15px] leading-[24px] text-[#44474d]">
                    Monthly care begins at go-live. Continuous security, speed, and
                    updates with a 30-day fair exit policy.
                  </p>
                </div>

                {/* Monthly Deliverables List */}
                <div className="space-y-3 pt-1 text-[13px] leading-[20px]">
                  {CARE_DELIVERABLES.map((item) => (
                    <div
                      key={item.bold}
                      className="flex items-start gap-2.5 text-[#081B30]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#006c49]" />
                      <span>
                        <strong>{item.bold}</strong> {item.rest}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add-On Feature Box: 24/7 Virtual Receptionist */}
                <div className="rounded-xl bg-[#dce9ff] p-4 text-[#081B30]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#006c49]">
                      POPULAR ADD-ON
                    </span>
                    <span className="text-[14px] font-bold">
                      +£99 / mo{" "}
                      <span className="text-xs font-normal text-[#44474d] line-through">
                        £149/mo
                      </span>
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-[20px] text-[#44474d]">
                    <strong className="text-[#081B30]">
                      24/7 AI Virtual Phone Receptionist:
                    </strong>{" "}
                    Never miss an emergency call while driving or on tools. Answers in
                    natural British English and texts lead summaries to WhatsApp in 30
                    seconds.{" "}
                    <Link
                      to="/virtual-receptionist"
                      className="font-semibold text-[#081B30] underline hover:text-[#006c49]"
                    >
                      Test live voice demo →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 08 — FOUNDER ACCOUNTABILITY (Real Robbie Harley Portrait) */}
        <section id="founder" className="w-full bg-[#081B30] py-14 text-white lg:py-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Real Founder Portrait Image */}
              <div className="relative lg:col-span-5">
                <div className="relative overflow-hidden rounded-xl bg-[#0F2642] shadow-2xl border border-[#1E3A5F]">
                  <img
                    alt="Robbie Harley, Founder of Harley Digital Works"
                    className="h-[460px] w-full object-cover object-top"
                    src="/images/home/robbie-restored.jpg"
                  />
                  <div className="absolute bottom-4 left-4 rounded bg-[#081B30]/90 p-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#6ffbbe] backdrop-blur">
                    ROBBIE HARLEY / FOUNDER
                  </div>
                </div>
              </div>

              {/* Founder Words & Assurance */}
              <div className="space-y-5 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded bg-[#0F2642] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#10B981]">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" /> DIRECT FOUNDER
                  COMMITMENT
                </div>

                <h2 className="font-display text-[32px] font-bold leading-[1.16] tracking-[-0.025em] text-white sm:text-[40px]">
                  Proud of your business.
                  <br />
                  Personally invested
                  <br />
                  in your website.
                </h2>

                <blockquote className="border-l-2 border-[#006c49] pl-4 text-[18px] italic leading-[28px] text-[#eff4ff]">
                  “Your website should do your work justice. That means taking the time to
                  understand your business, caring about the details, and making the whole
                  experience straightforward.”
                </blockquote>

                <div className="space-y-1 pt-2">
                  <div className="font-display text-[22px] font-semibold text-white">
                    Robbie Harley
                  </div>
                  <div className="text-[13px] leading-[20px] text-[#d3e4fe]">
                    Founder, Harley Digital Works · Part of The Harley Group
                  </div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#74859f]">
                    BRISTOL STUDIO · DIRECT DISPATCH OVERSEEING EVERY BUILD
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <a
                    href="tel:01172141357"
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-[14px] font-bold text-[#081B30] transition-colors hover:bg-[#f8f9ff]"
                  >
                    <Phone className="h-4 w-4" />
                    0117 214 1357
                  </a>
                  <a
                    href="https://wa.me/447394041487"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0F2642] px-6 text-[14px] font-bold text-[#6ffbbe] transition-colors hover:bg-[#0F2642]/80 border border-[#1E3A5F]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp: 07394 041487
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 09 — FREQUENT QUESTIONS ACCORDION */}
        <section id="faq" className="w-full bg-[#F7F5EE] py-14 lg:py-20">
          <div className="mx-auto max-w-[1280px] space-y-8 px-5 sm:px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
                  09 / FREQUENT QUESTIONS
                </div>
                <h2 className="font-display text-[32px] font-bold leading-[1.18] tracking-[-0.025em] text-[#081B30] sm:text-[40px]">
                  Good questions.
                  <br />
                  Straight answers.
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-[24px] text-[#44474d]">
                Something else on your mind? Call Robbie directly on{" "}
                <a
                  href="tel:01172141357"
                  className="font-semibold text-[#081B30] underline"
                >
                  0117 214 1357
                </a>
                .
              </p>
            </div>

            {/* Accordion Stack */}
            <div className="max-w-3xl space-y-3">
              {FAQS.map((faq, idx) => (
                <details
                  key={faq.question}
                  open={idx === 0}
                  className="group rounded-xl bg-white p-5 shadow-sm border border-[#E2E8F0]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-[20px] font-semibold leading-[28px] text-[#081B30]">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#44474d] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-[24px] text-[#44474d]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10 — GRAND FINALE CONVERSION BANNER */}
        <section className="w-full bg-[#081B30] py-14 text-white lg:py-20">
          <div className="mx-auto max-w-[1280px] space-y-5 px-5 text-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded bg-[#0F2642] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#6ffbbe]">
              10 / LET’S MAKE SOMETHING GREAT
            </div>

            <h2 className="mx-auto max-w-3xl font-display text-[36px] font-bold leading-[1.14] tracking-[-0.03em] text-white sm:text-[48px] lg:text-[56px]">
              A website that feels like you.
              <br />
              And works for your business.
            </h2>

            <p className="mx-auto max-w-xl text-[18px] leading-[28px] text-[#eff4ff]">
              £1,495 setup · £249/mo care · Agreed delivery schedule · Strictly 2
              concurrent builds.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-[#10B981] px-8 text-[15px] font-bold text-[#081B30] shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-[#34D399]"
              >
                Get your website plan{" "}
                <span className="ml-2 font-mono text-[#081B30]">→</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsCalcModalOpen(true)}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-[#1E3A5F] bg-[#0F2642] px-6 text-[15px] font-semibold text-[#6ffbbe] transition-all hover:bg-[#0F2642]/80 cursor-pointer"
              >
                <Calculator className="h-4 w-4" />
                Try Quote Calculator Demo
              </button>

              <a
                href="tel:01172141357"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-[#0F2642] px-6 text-[15px] font-semibold text-white transition-all hover:bg-[#0F2642]/80"
              >
                Call Robbie on 0117 214 1357
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#74859f]">
              <span className="text-[#eff4ff]/80">✓ COPYWRITING INCLUDED</span>
              <span className="text-[#eff4ff]/80">✓ 50% DEPOSIT / 50% ON APPROVAL</span>
              <span className="text-[#eff4ff]/80">✓ ZERO-RISK ASSET HANDOVER</span>
              <span className="text-[#eff4ff]/80">✓ ROLLING 30-DAY CARE</span>
            </div>
          </div>
        </section>
      </div>

      <HeroTransformationVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <FloatingQuoteCalculatorBadge onOpen={() => setIsCalcModalOpen(true)} />
      <TradeQuoteCalculatorModal
        isOpen={isCalcModalOpen}
        onClose={() => setIsCalcModalOpen(false)}
      />
    </PageShell>
  );
}
