import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Flame,
  Zap,
  Hammer,
  Truck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  PhoneCall,
  FileCheck,
} from "lucide-react";
import { TRADE_VERTICALS, type TradeVertical } from "@/lib/trade-data";
import { PillButton } from "./PillButton";

const TRADE_ICONS: Record<string, React.ElementType> = {
  "heating-engineers": Flame,
  electricians: Zap,
  builders: Hammer,
  "commercial-contractors": Truck,
};

export function TradeShowcaseSection() {
  const tradeKeys = Object.keys(TRADE_VERTICALS);
  const [selectedKey, setSelectedKey] = useState<string>("heating-engineers");
  const activeTrade: TradeVertical =
    TRADE_VERTICALS[selectedKey] || TRADE_VERTICALS["heating-engineers"];
  const ActiveIcon = TRADE_ICONS[selectedKey] || Flame;

  return (
    <section
      className="studio-section deferred-section bg-stone-50/70 border-y border-stone-200/80 py-20"
      id="trades-showcase"
      aria-labelledby="trades-showcase-heading"
    >
      <div className="studio-wrap space-y-16">
        {/* Section Header */}
        <div className="studio-section-heading">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 px-2.5 py-1 text-[11px] font-bold text-emerald-950">
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>Your verified accreditations, clearly presented</span>
              </span>
              <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
                Serving Trade Contractors Nationwide Across the UK
              </span>
            </div>
            <p className="studio-kicker">04 / ENGINEERED SPECIFICALLY FOR UK TRADES</p>
            <h2
              id="trades-showcase-heading"
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-ink"
            >
              Your trade. Your reputation.
              <br />
              <span className="text-ink-muted">Make your work easier to choose.</span>
            </h2>
          </div>
          <p className="text-base text-ink-muted max-w-xl leading-relaxed">
            Help customers understand your services and see the quality of your work. We build
            clear, trade websites with written copy and ongoing care for ambitious UK trades.
          </p>
        </div>

        {/* Trade Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 p-1.5 bg-stone-100 rounded-2xl max-w-4xl mx-auto border border-stone-200/80 shadow-xs">
          {tradeKeys.map((key) => {
            const trade = TRADE_VERTICALS[key];
            const Icon = TRADE_ICONS[key] || Flame;
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                className={`flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-[#081B30] text-white shadow-md shadow-stone-900/20 scale-[1.01]"
                    : "text-ink-muted hover:text-ink hover:bg-white"
                }`}
                aria-pressed={isSelected}
              >
                <Icon size={16} className={isSelected ? "text-emerald-400" : "text-ink-muted"} />
                <span>{trade.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Trade Feature Card */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-lg shadow-stone-100/80 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Trade Overview & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#081B30]/5 px-3 py-1 text-xs font-bold text-[#081B30] border border-[#081B30]/15">
                <ActiveIcon size={14} className="text-[#173C62]" />
                <span>{activeTrade.badge}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight leading-snug">
                  {activeTrade.heroHeadline}{" "}
                  <span className="text-[#173C62] underline decoration-[#173C62]/30 underline-offset-4">
                    {activeTrade.heroHighlight}
                  </span>
                </h3>
                <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                  {activeTrade.heroSubheadline}
                </p>
              </div>

              {/* High-Value Target Enquiries */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                  <Sparkles size={14} className="text-[#173C62]" />
                  High-Margin Enquiries We Target For You
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTrade.targetEnquiries.map((enquiry, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-stone-100 bg-stone-50/80 p-3 text-xs font-medium text-ink"
                    >
                      <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      <span>{enquiry}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problems HDW Eliminates */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2">
                  <XCircle size={14} className="text-rose-600" />
                  Trade Headaches We Remove
                </h4>
                <ul className="space-y-1.5 text-xs text-ink-muted">
                  {activeTrade.keyChallenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Done-for-You Package & Call to Action */}
            <div className="lg:col-span-5 rounded-3xl bg-[#081B30] text-[#F6F3ED] p-6 sm:p-8 space-y-6 shadow-2xl border border-white/10 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                      Managed Turnkey Package
                    </span>
                    <div className="text-3xl font-black text-white mt-0.5 font-display">
                      £1,495{" "}
                      <span className="text-xs font-normal text-slate-300">+ £249/mo care</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-mono text-emerald-300">
                      Pilot: Max 2 spots
                    </span>
                    <div className="text-[11px] text-slate-300 mt-1">Agreed Delivery Schedule</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <FileCheck size={14} className="text-emerald-400" />
                    Included For Your Trade:
                  </h5>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    {activeTrade.includedFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 text-[11px] text-slate-200 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    50% Deposit / 50% on Final Approval
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    You only pay the completion balance once you have reviewed the working staging
                    site and confirmed satisfaction.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <Link
                  to="/contact"
                  search={{
                    service: `Website for ${activeTrade.name}`,
                    package: undefined,
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 text-sm transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
                >
                  <span>Check Availability & Get Plan</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  search={{
                    service: `Website Review for ${activeTrade.name}`,
                    package: undefined,
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-4 py-2.5 text-xs transition-colors cursor-pointer"
                >
                  <span>Get a Website Review</span>
                </Link>
                <div className="text-center text-[11px] text-slate-300 pt-1">
                  No pushy sales calls · Straightforward conversation with founder Robbie Harley
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Matrix: Why UK Trades Choose HDW */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-lg shadow-stone-100/80 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="studio-kicker">HONEST VALUE COMPARISON</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Why UK Trades Choose Harley Digital Works
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted">
              How we compare against building it yourself in the evenings or hiring a generic
              digital agency.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-stone-200 text-xs font-bold text-ink uppercase tracking-wider">
                  <th className="py-3 px-4 w-1/4">Aspect</th>
                  <th className="py-3 px-4 w-1/4 text-stone-500">DIY / Wix / Squarespace</th>
                  <th className="py-3 px-4 w-1/4 text-stone-500">Generic Web Agency</th>
                  <th className="py-3.5 px-4 w-1/4 bg-[#081B30] text-white rounded-t-xl font-extrabold border-t border-x border-[#081B30]">
                    Harley Digital Works
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-stone-100">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-ink">Copywriting & Words</td>
                  <td className="py-3.5 px-4 text-stone-600">
                    You have to write everything yourself after a 10-hour day on site.
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    Generic marketing fluff from juniors who don&apos;t know Gas Safe or NICEIC.
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50 text-ink font-semibold border-x border-slate-200">
                    ✓ 100% done-for-you technical copywriting based on your confirmed trade facts.
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-bold text-ink">Pricing & Transparency</td>
                  <td className="py-3.5 px-4 text-stone-600">
                    £25/mo + 60+ unpaid hours of your own time wrestling with templates.
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    £3,000–£7,000+ upfront fee, plus £150/hr for minor text updates.
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50 text-ink font-semibold border-x border-slate-200">
                    ✓ Clear £1,495 setup (50/50 milestone) + £249/mo rolling all-inclusive care.
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-bold text-ink">Turnaround Schedule</td>
                  <td className="py-3.5 px-4 text-stone-600">
                    Often drags out for 6+ months as an unfinished draft.
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    8 to 16 weeks with endless committee meetings and delay.
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50 text-ink font-semibold border-x border-slate-200">
                    ✓ Agreed delivery schedule with private staging preview and revision rounds.
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-bold text-ink">Ongoing Maintenance</td>
                  <td className="py-3.5 px-4 text-stone-600">
                    You troubleshoot broken plugins, SSL certificates, and DNS settings.
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    Submit tickets to a support desk and wait days for a response.
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50 text-ink font-semibold border-x border-slate-200">
                    ✓ Dedicated monthly care: hosting, SSL, enquiry checks & 30-min monthly edit
                    batch.
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-bold text-ink">Attention & Capacity</td>
                  <td className="py-3.5 px-4 text-stone-600">
                    Self-service DIY tool with automated chatbots.
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    One of 50 accounts assigned to rotating junior account managers.
                  </td>
                  <td className="py-3.5 px-4 bg-slate-50 text-ink font-semibold border-x border-b border-slate-200 rounded-b-xl">
                    ✓ Strict 2-spot pilot capacity: direct access to founder Robbie Harley.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-3 text-xs text-ink-muted">
              <PhoneCall size={16} className="text-[#173C62] shrink-0" />
              <span>Questions before booking? Email or call us directly. No hard sell.</span>
            </div>
            <PillButton
              as="link"
              to="/contact"
              variant="dark"
              className="shrink-0 text-xs font-bold"
            >
              Book a Free 15-Minute Chat
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
