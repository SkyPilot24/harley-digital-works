import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { VirtualPhoneCockpit } from "@/components/phone/VirtualPhoneCockpit";
import {
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ShieldAlert,
  Clock,
  MessageSquare,
  TrendingUp,
  Zap,
  HelpCircle,
  Check,
  X,
  PhoneForwarded,
} from "lucide-react";

export const Route = createFileRoute("/virtual-receptionist")({
  head: () => ({
    meta: [
      {
        title: "24/7 AI Virtual Phone Receptionist for UK Trades | Harley Digital Works",
      },
      {
        name: "description",
        content:
          "Never miss a high-ticket trade enquiry while on tools or driving. 24/7 British voice AI receptionist that answers homeowner questions, qualifies quotes, and texts leads in 30 seconds.",
      },
      {
        property: "og:title",
        content: "24/7 AI Virtual Phone Receptionist for UK Trades | Harley Digital Works",
      },
      {
        property: "og:description",
        content:
          "Natural British voice phone answering for electricians, heating engineers, roofers, and builders. Live interactive demonstration.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Harley Digital Works 24/7 AI Virtual Phone Receptionist",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Cloud / Telephony",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "GBP",
            lowPrice: "79",
            highPrice: "249",
            offerCount: "3",
          },
          provider: {
            "@type": "Organization",
            name: "The Harley Group Ltd",
            url: "https://harleydigitalworks.com",
            telephone: "+447394041487",
          },
        }),
      },
    ],
  }),
  component: VirtualReceptionistPage,
});

function VirtualReceptionistPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const FAQS = [
    {
      q: "Does the receptionist sound like a real person?",
      a: "Yes. We use state-of-the-art British Neural speech synthesis (en-GB Neural2) calibrated with natural conversational pacing, pauses, and friendly trade terminology. It sounds like an attentive, professional British receptionist based in your office, not a robotic automated menu.",
    },
    {
      q: "What happens when a caller has an urgent emergency?",
      a: "The receptionist detects emergency keywords (such as burning smells, sparks, gas leaks, or burst pipes). It immediately provides calm safety guidance and triggers an instant high-priority alert to your on-call mobile so you can respond within minutes.",
    },
    {
      q: "How do I receive customer leads and quote enquiries?",
      a: "Within 30 seconds of the call ending, a structured brief is dispatched straight to your WhatsApp and email. The brief includes the caller's name, phone number, trade service needed, postcode, and a concise summary of the conversation.",
    },
    {
      q: "Can I bundle this with a new website?",
      a: "Yes. When you take our £1,495 signature Managed Website package, the AI Phone Receptionist is available as an ongoing add-on for just £99/month (saving £50/month compared to the standalone £149/mo rate).",
    },
    {
      q: "Can I still answer my own phone when I'm free?",
      a: "Absolutely. You can set the receptionist to answer only when your line is engaged or unanswered after 4 rings, or leave it on 24/7. You retain complete control.",
    },
    {
      q: "Are there long contracts or exit fees?",
      a: "No. All subscriptions operate on a simple rolling 30-day agreement. You can pause, upgrade, or cancel with 30 days notice at any time.",
    },
  ];

  return (
    <PageShell>
      {/* SECTION 1: ARCHITECTURAL HERO */}
      <section className="pt-24 pb-16 bg-[#081B30] text-white border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        <Container>
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>24/7 AI VIRTUAL PHONE RECEPTIONIST FOR UK TRADES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
              You're Busy Doing the Job. We'll Make Sure You Never Miss the Next One.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              Meet your 24/7 AI receptionist. It answers your business calls in natural British
              English, answers customer pricing questions, and sends qualified job briefs straight
              to your WhatsApp—even while you're 40 feet up a ladder, driving between jobs, or
              finishing an installation.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#demo-cockpit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#081B30] font-bold text-xs tracking-wide transition-all shadow-md"
              >
                <span>Try Live Voice Demo Below</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs tracking-wide transition-all border border-white/20"
              >
                <span>View Transparent Pricing</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                Natural British Speech
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                30s WhatsApp Briefing
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                Rolling 30-Day Agreement
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                No Hidden Fees
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: THE REAL COST OF MISSED CALLS */}
      <section className="py-16 bg-[#F6F3ED] border-b border-stone-200">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
                THE REVENUE LEAK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081B30] font-display">
                When Your Phone Rings Out, Callers Ring Your Competitor
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto">
                Homeowners and facility managers rarely leave voicemails. If nobody picks up within
                5 rings, they click the next contractor on Google.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-[#081B30]">
                  £1,200 Consumer Unit & Rewire
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Lost while up in a roof void running SWA cable. The caller needed an 18th edition
                  fuseboard upgrade for a house sale and booked the first company that answered.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-[#081B30]">
                  £3,500 Combi Boiler Breakdown
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Lost while driving on the M4. A young family with no heating in mid-winter called
                  three heating engineers. The first to answer secured the emergency replacement.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-[#081B30]">£4,500 Heritage Slate Repair</div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Lost while on a scaffold repairing lead valley gutters. A homeowner in Clifton
                  needed urgent storm leak repairs and booked another contractor within 10 minutes.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3: INTERACTIVE VOICE COCKPIT */}
      <section id="demo-cockpit" className="py-16 bg-[#ECE8E1] border-b border-stone-300/80">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
              INTERACTIVE VOICE SIMULATOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081B30] font-display">
              Experience the 24/7 British Voice Receptionist
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto">
              Test how the receptionist answers calls, provides ballpark quotes, and escalates
              emergencies. Switch between trade vertical demonstrations below.
            </p>
          </div>

          <VirtualPhoneCockpit />
        </Container>
      </section>

      {/* SECTION 4: HOW IT WORKS IN 3 STEPS */}
      <section className="py-16 bg-white border-b border-stone-200">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
                SIMPLE & DONE-FOR-YOU
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081B30] font-display">
                How It Works in 3 Clean Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#081B30] text-amber-400 flex items-center justify-center font-bold text-sm font-mono">
                  01
                </div>
                <h3 className="text-base font-bold text-[#081B30]">Answered in 2 Seconds</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Callers are greeted warmly in natural British English by a virtual receptionist
                  dedicated to your trade business.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#081B30] text-amber-400 flex items-center justify-center font-bold text-sm font-mono">
                  02
                </div>
                <h3 className="text-base font-bold text-[#081B30]">Job Qualified & Triaged</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  It confirms their postcode, asks what service they need, explains your standard
                  pricing, and detects urgent emergencies.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#081B30] text-amber-400 flex items-center justify-center font-bold text-sm font-mono">
                  03
                </div>
                <h3 className="text-base font-bold text-[#081B30]">WhatsApp Lead in 30s</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  You receive an instant WhatsApp summary with caller name, mobile number, job
                  details, and urgency so you can call back on your terms.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5: TRANSPARENT COMMERCIAL PRICING */}
      <section id="pricing" className="py-16 bg-[#F6F3ED] border-b border-stone-200">
        <Container>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
                TRANSPARENT COMMERCIAL PRICING
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081B30] font-display">
                Predictable Monthly Plans. No Hidden Fees. No Contracts.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
                Rolling 30-day agreements. Setup covers custom British voice persona, trade FAQ
                configuration, emergency dispatch rules, and telephony testing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Plan 1: Solo */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      SOLO TRADE
                    </span>
                    <div className="text-3xl font-extrabold text-[#081B30] font-display">
                      £79
                      <span className="text-xs font-normal text-stone-500"> / month</span>
                    </div>
                    <div className="text-xs text-stone-500 font-mono">
                      Setup: £195 (one-time) · No hidden fees
                    </div>
                  </div>

                  <p className="text-xs text-stone-600">
                    Ideal for sole traders losing evening and weekend emergency callouts.
                  </p>

                  <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>50 calls included per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>24/7 Out-of-hours coverage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Dedicated UK virtual phone number</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Instant WhatsApp lead notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Rolling 30-day agreement</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/447394041487?text=Hi%20Robbie%2C%20I%20am%20interested%20in%20the%20Solo%20Trade%20AI%20Receptionist%20plan%20(%C2%A379%2Fmo)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#081B30] font-bold text-xs text-center transition-all"
                >
                  Get Started with Solo
                </a>
              </div>

              {/* Plan 2: Pro Managed (Flagship) */}
              <div className="p-6 rounded-2xl bg-[#081B30] text-white border-2 border-amber-500 shadow-xl flex flex-col justify-between space-y-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-[#081B30] font-mono font-bold text-[10px] uppercase tracking-wider">
                  MOST POPULAR FOR CONTRACTORS
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                      PRO MANAGED
                    </span>
                    <div className="text-3xl font-extrabold text-white font-display">
                      £149
                      <span className="text-xs font-normal text-slate-300"> / month</span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono">
                      Setup: £295 (one-time) · No hidden fees
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">
                    Engineered for established contractors with 2–5 vans on the road.
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-white/10">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>150 calls included per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Custom British voice persona (Male/Female)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Emergency keyword triage & escalation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Ballpark pricing & trade FAQs answered</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Instant WhatsApp & Email lead dispatch</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Monthly performance & call summary digest</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/447394041487?text=Hi%20Robbie%2C%20I%20am%20interested%20in%20the%20Pro%20Managed%20AI%20Receptionist%20plan%20(%C2%A3149%2Fmo)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#081B30] font-bold text-xs text-center transition-all shadow-md"
                >
                  Start Pro Managed Pilot
                </a>
              </div>

              {/* Plan 3: Commercial Fleet */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      COMMERCIAL FLEET
                    </span>
                    <div className="text-3xl font-extrabold text-[#081B30] font-display">
                      £249
                      <span className="text-xs font-normal text-stone-500"> / month</span>
                    </div>
                    <div className="text-xs text-stone-500 font-mono">
                      Setup: £495 (one-time) · No hidden fees
                    </div>
                  </div>

                  <p className="text-xs text-stone-600">
                    For multi-van building, HVAC, and facilities management companies.
                  </p>

                  <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>350 calls included per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Multi-department call routing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Multi-engineer on-call mobile alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Custom CRM integration & webhook feed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Priority SLA support & phone check-ins</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/447394041487?text=Hi%20Robbie%2C%20I%20am%20interested%20in%20the%20Commercial%20Fleet%20AI%20Receptionist%20plan%20(%C2%A3249%2Fmo)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#081B30] font-bold text-xs text-center transition-all"
                >
                  Contact About Fleet Switchboard
                </a>
              </div>
            </div>

            {/* THE WEBSITE CARE PLAN BUNDLE CALLOUT */}
            <div className="p-8 rounded-3xl bg-[#081B30] text-white border border-amber-500/40 relative overflow-hidden shadow-xl">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded border border-amber-500/30">
                  THE MANAGED REVENUE & SWITCHBOARD BUNDLE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Your Website Wins Their Interest. Your AI Receptionist Makes Sure Their Call Gets
                  Answered.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  When you commission a bespoke Harley Digital Works trade website (£1,495 setup),
                  you can add the 24/7 AI Phone Receptionist to your Managed Website Care Plan for
                  just <strong className="text-amber-300">+£99/month</strong> instead of £149/mo
                  (saving £600/year). Your digital marketing and your phone switchboard work as one
                  unified client-generating machine.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-xs">
                    <span className="text-slate-400">
                      Website Care (£249) + AI Receptionist (£99) =
                    </span>{" "}
                    <span className="text-amber-300 font-bold text-sm">£348 / month</span>
                  </div>
                  <a
                    href="https://wa.me/447394041487?text=Hi%20Robbie%2C%20I%20want%20to%20discuss%20the%20Bespoke%20Website%20plus%20AI%20Receptionist%20Bundle."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#081B30] font-bold text-xs tracking-wide transition-all shadow-md"
                  >
                    <span>Discuss the Managed Bundle</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 6: COMPARISON TABLE */}
      <section className="py-16 bg-white border-b border-stone-200">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
                COMPARE THE ALTERNATIVES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081B30] font-display">
                Traditional Call Answering vs Harley 24/7 AI Switchboard
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4">Capability</th>
                    <th className="py-3.5 px-4 text-stone-400">Traditional Call Answering</th>
                    <th className="py-3.5 px-4 bg-amber-500/10 text-[#081B30] font-bold">
                      Harley 24/7 AI Receptionist
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-stone-800">Typical Monthly Cost</td>
                    <td className="py-3.5 px-4 text-stone-500">£180 – £350+ / month</td>
                    <td className="py-3.5 px-4 bg-amber-50/30 font-bold text-emerald-700">
                      £79 – £149 / month (Fixed)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-stone-800">Out-of-Hours Answering</td>
                    <td className="py-3.5 px-4 text-stone-500">
                      Expensive evening surcharges (£2.50+/call)
                    </td>
                    <td className="py-3.5 px-4 bg-amber-50/30 font-bold text-emerald-700">
                      100% 24/7/365 Included
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-stone-800">
                      Technical Trade Qualification
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      Basic name and number note-taking only
                    </td>
                    <td className="py-3.5 px-4 bg-amber-50/30 font-bold text-emerald-700">
                      Verifies boiler type, rewires, postcodes & triage
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-stone-800">
                      Emergency Safety Protocol
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      No safety triage or instant dispatch
                    </td>
                    <td className="py-3.5 px-4 bg-amber-50/30 font-bold text-emerald-700">
                      Instant on-call alert + gas/electrical safety advice
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-stone-800">Speed to Contractor</td>
                    <td className="py-3.5 px-4 text-stone-500">
                      Delayed email batch (15–45 minutes)
                    </td>
                    <td className="py-3.5 px-4 bg-amber-50/30 font-bold text-emerald-700">
                      WhatsApp lead brief within 30 seconds
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 7: FAQS */}
      <section className="py-16 bg-[#F6F3ED] border-b border-stone-200">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081B30] font-display">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left text-sm font-bold text-[#081B30] flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-stone-400 font-mono text-base">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="p-5 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 8: FINAL CONVERSION CTA */}
      <section className="py-16 bg-[#081B30] text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Ready to Stop Losing High-Ticket Quotes to Missed Calls?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Join our paying pilot. We'll configure your trade switchboard, record your custom
              greeting, and test call your new line together before going live.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/447394041487?text=Hi%20Robbie%2C%20I%20want%20to%20set%20up%20an%20AI%20Virtual%20Receptionist%20for%20my%20trade%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#081B30] font-bold text-sm tracking-wide transition-all shadow-lg"
              >
                <span>Message Robbie Harley on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Direct line: 0117 214 1357 · WhatsApp: 07394 041487
            </p>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
