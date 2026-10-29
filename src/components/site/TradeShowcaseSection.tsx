import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Flame,
  Zap,
  Hammer,
  Truck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
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

const TRADE_VISUALS: Record<
  string,
  {
    src: string;
    alt: string;
    kicker: string;
    caption: string;
  }
> = {
  electricians: {
    src: "/images/home/renewables-solar-ev.jpg",
    alt: "NICEIC approved electrical contractor EV charger and solar PV installation",
    kicker: "ELECTRICAL & EV INFRASTRUCTURE",
    caption: "Show the standard. Win the quote.",
  },
  "heating-engineers": {
    src: "/images/home/heating-plant-room.jpg",
    alt: "Precision heating plant room copper pipework and boiler installation by certified UK heating specialists",
    kicker: "PRECISION HEATING & PLANT ROOMS",
    caption: "Clean pipework. Clearer enquiries.",
  },
  "commercial-contractors": {
    src: "https://lh3.googleusercontent.com/aida/AEtjO1UQGAWyswKWr-bp6FiEdQCYvWngL-xdE70cfJfhOm1ym5Dhes36n30wvz1zbu8BP69LZm_AzJWIiJmoJtIGjUpawwj9YUBiLavXpEIVQzBw5fsqybVIDOAO24BPJ_wiBcnpix3JGA0zGct3BAjC2PTU8iIlv6eLnKDX0OpD7ihwEidhe3SZbxoqs4Dj2vnu9gwtPsVbLAmb2V7xKZreg7ahaWVJI3ECRKJTrmoCKN1BiL6d2xhypHoTp3U",
    alt: "UK commercial contractor on site in front of sign-written van checking commercial job enquiries",
    kicker: "COMMERCIAL & MULTI-VAN OPERATIONS",
    caption: "Keep every van booked with profitable work.",
  },
  builders: {
    src: "/images/home/extension-renovation.jpg",
    alt: "Contemporary architectural house extension with exposed steelwork and glazed doors",
    kicker: "ARCHITECTURAL EXTENSIONS & BUILD",
    caption: "Exceptional craft. A fitting first impression.",
  },
};

export function TradeShowcaseSection() {
  const tradeKeys = Object.keys(TRADE_VERTICALS);
  const [selectedKey, setSelectedKey] = useState<string>("electricians");
  const activeTrade: TradeVertical =
    TRADE_VERTICALS[selectedKey] || TRADE_VERTICALS["electricians"];
  const ActiveIcon = TRADE_ICONS[selectedKey] || Zap;
  const activeVisual = TRADE_VISUALS[selectedKey] || TRADE_VISUALS["electricians"];

  return (
    <section
      className="w-full border-y border-[#081B30]/10 bg-[#F6F3ED] py-16 lg:py-20"
      id="trades-showcase"
      aria-labelledby="trades-showcase-heading"
    >
      <div className="mx-auto max-w-[1280px] space-y-14 px-5 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="space-y-2">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded bg-[#059669]/15 px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                <ShieldCheck size={13} className="text-[#059669]" />
                <span>Your verified accreditations, clearly presented</span>
              </span>
              <span className="hidden font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479] uppercase sm:inline">
                BRISTOL, BATH &amp; THE M4 CORRIDOR
              </span>
            </div>
            <p className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479] uppercase">
              03 / ENGINEERED SPECIFICALLY FOR UK TRADES
            </p>
            <h2
              id="trades-showcase-heading"
              className="font-display text-[32px] leading-[1.16] font-bold tracking-[-0.025em] text-[#081B30] sm:text-[40px]"
            >
              Your trade. Your reputation.
              <br />
              <span className="text-[#526479]">Make your work easier to choose.</span>
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-[24px] text-[#526479]">
            Help customers understand your services and see the quality of your work. We build clear
            trade websites with done-for-you copywriting and ongoing care for ambitious UK trades.
          </p>
        </div>

        {/* Trade Selector Tabs */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select trade vertical">
          {tradeKeys.map((key) => {
            const trade = TRADE_VERTICALS[key];
            const Icon = TRADE_ICONS[key] || Flame;
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.08em] uppercase transition-all ${
                  isSelected
                    ? "bg-[#081B30] text-white shadow-md"
                    : "border border-[#081B30]/12 bg-white text-[#081B30] hover:bg-[#081B30]/5"
                }`}
                aria-pressed={isSelected}
              >
                <Icon size={15} className={isSelected ? "text-[#059669]" : "text-[#526479]"} />
                <span>{trade.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Trade Feature Card */}
        <div className="rounded-2xl border border-[#081B30]/10 bg-white p-6 shadow-[0_4px_16px_rgba(8,27,48,0.06)] transition-all sm:p-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Column: Matched Trade Photo + Trade Overview & Value Prop */}
            <div className="space-y-6 lg:col-span-7">
              {/* Matched Trade Photography */}
              <div className="relative overflow-hidden rounded-xl bg-[#081B30] shadow-md">
                <img
                  src={activeVisual.src}
                  alt={activeVisual.alt}
                  className="h-[260px] w-full object-cover object-center transition-all duration-300 sm:h-[300px]"
                  onError={(e) => {
                    e.currentTarget.src = "/images/home/heating-plant-room.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B30]/90 via-transparent to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-end justify-between gap-2">
                  <div className="rounded-lg bg-[#081B30]/90 px-3.5 py-2 text-white backdrop-blur">
                    <div className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                      {activeVisual.kicker}
                    </div>
                    <div className="font-display text-[18px] leading-[24px] font-semibold">
                      {activeVisual.caption}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#081B30] shadow-sm">
                    <ActiveIcon size={13} className="text-[#059669]" />
                    <span>{activeTrade.badge}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-[#081B30]/10 bg-[#F6F3ED] p-5">
                <h3 className="font-display text-[22px] leading-snug font-bold tracking-[-0.015em] text-[#081B30] sm:text-[26px]">
                  {activeTrade.heroHeadline}{" "}
                  <span className="text-[#059669] underline decoration-[#059669]/30 underline-offset-4">
                    {activeTrade.heroHighlight}
                  </span>
                </h3>
                <p className="text-[15px] leading-[24px] text-[#526479]">
                  {activeTrade.heroSubheadline}
                </p>
              </div>

              {/* High-Value Target Enquiries & Headaches Side-by-Side */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2.5 rounded-xl border border-[#081B30]/10 bg-[#F6F3ED] p-4">
                  <h4 className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                    <Sparkles size={13} className="text-[#059669]" />
                    Key Enquiries Structured
                  </h4>
                  <ul className="space-y-2 text-[13px] leading-[20px] text-[#081B30]">
                    {activeTrade.targetEnquiries.map((enquiry, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#059669]" />
                        <span>{enquiry}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5 rounded-xl border border-[#081B30]/10 bg-white p-4">
                  <h4 className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479] uppercase">
                    <XCircle size={13} className="text-[#526479]" />
                    Headaches We Remove
                  </h4>
                  <ul className="space-y-2 text-[13px] leading-[20px] text-[#526479]">
                    {activeTrade.keyChallenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-[#526479]">✕</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Done-for-You Package & Call to Action */}
            <div className="flex h-full flex-col justify-between space-y-6 rounded-2xl border border-[#173C62] bg-[#081B30] p-6 text-white shadow-2xl sm:p-8 lg:col-span-5">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#173C62] pb-4">
                  <div>
                    <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-white/80 uppercase">
                      Managed Turnkey Package
                    </span>
                    <div className="mt-0.5 font-display text-3xl font-bold text-white">
                      £1,495{" "}
                      <span className="text-xs font-normal text-white/80">+ £249/mo care</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded border border-[#059669]/40 bg-[#173C62] px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                      Pilot: Max 2 spots
                    </span>
                    <div className="mt-1 text-[11px] text-white/80">Agreed Delivery Schedule</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-[0.08em] text-[#059669] uppercase">
                    <FileCheck size={14} className="text-[#059669]" />
                    Included For Your Trade:
                  </h5>
                  <ul className="space-y-2.5 text-[13px] leading-[20px] text-[#F6F3ED]">
                    {activeTrade.includedFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#059669]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1 rounded-xl border border-[#173C62] bg-[#173C62]/60 p-4 text-[12px] text-[#F6F3ED]">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <ShieldCheck size={14} className="text-[#059669]" />
                    50% Deposit / 50% on Final Approval
                  </div>
                  <p className="leading-relaxed text-white/80">
                    You only pay the completion balance once you have reviewed the working staging
                    site and confirmed satisfaction.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 border-t border-[#173C62] pt-4">
                <Link
                  to="/contact"
                  search={{
                    service: `Website for ${activeTrade.name}`,
                    package: undefined,
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#059669] px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(5,150,105,0.3)] transition-all hover:opacity-95"
                >
                  <span>Check Availability &amp; Get Plan</span>
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
                  className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#173C62] bg-[#173C62] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#173C62]/80"
                >
                  <span>Get a Website Review</span>
                </Link>
                <div className="pt-1 text-center text-[11px] text-white/80">
                  No pushy sales calls · Straightforward conversation with founder Robbie Harley
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 04 — HONEST VALUE COMPARISON TABLE */}
        <div
          id="why-hdw"
          className="space-y-8 rounded-2xl border border-[#081B30]/10 bg-white p-6 sm:p-10"
        >
          <div className="mx-auto max-w-xl space-y-2 text-center">
            <p className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#526479] uppercase">
              HONEST VALUE COMPARISON
            </p>
            <h3 className="font-display text-[28px] font-bold tracking-[-0.02em] text-[#081B30] sm:text-[36px]">
              Why UK Trades Choose HDW
            </h3>
            <p className="text-[15px] leading-[24px] text-[#526479]">
              How we compare against building it yourself in the evenings or hiring a generic
              digital agency.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#081B30]/10 bg-white shadow-[0_4px_16px_rgba(8,27,48,0.06)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-[13px] leading-[20px]">
                <thead>
                  <tr className="bg-[#081B30] font-mono text-[11px] font-bold tracking-[0.08em] text-white uppercase">
                    <th className="w-1/4 p-4">Core Trade Criteria</th>
                    <th className="w-1/4 p-4 opacity-80">DIY / Wix / Squarespace</th>
                    <th className="w-1/4 p-4 opacity-80">Generic Web Agency</th>
                    <th className="w-1/4 bg-[#173C62] p-4 text-[#059669]">
                      Harley Digital Works (✓ Winner)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#F6F3ED]">
                    <td className="p-4 font-bold text-[#081B30]">Copywriting &amp; Words</td>
                    <td className="p-4 text-[#526479]">
                      You write everything after a 10-hour day on site.
                    </td>
                    <td className="p-4 text-[#526479]">
                      Fluffy text requiring endless corrections on trade terms.
                    </td>
                    <td className="bg-[#059669]/10 p-4 font-semibold text-[#081B30]">
                      ✓ 100% done-for-you technical copy based on your trade facts.
                    </td>
                  </tr>

                  <tr className="bg-white">
                    <td className="p-4 font-bold text-[#081B30]">Pricing &amp; Transparency</td>
                    <td className="p-4 text-[#526479]">
                      £25/mo + 60+ unpaid hours battling builders.
                    </td>
                    <td className="p-4 text-[#526479]">
                      High variable fees with surprise hourly rates for tweaks.
                    </td>
                    <td className="bg-[#059669]/10 p-4 font-semibold text-[#081B30]">
                      ✓ Clear £1,495 setup (50/50 split) + £249/mo rolling all-inclusive care.
                    </td>
                  </tr>

                  <tr className="bg-[#F6F3ED]">
                    <td className="p-4 font-bold text-[#081B30]">Turnaround Schedule</td>
                    <td className="p-4 text-[#526479]">
                      Drags on for months as an unfinished draft.
                    </td>
                    <td className="p-4 text-[#526479]">
                      Lengthy agency queues with 4 different account managers.
                    </td>
                    <td className="bg-[#059669]/10 p-4 font-semibold text-[#081B30]">
                      ✓ Agreed delivery schedule with staging preview and review rounds.
                    </td>
                  </tr>

                  <tr className="bg-white">
                    <td className="p-4 font-bold text-[#081B30]">Ongoing Maintenance</td>
                    <td className="p-4 text-[#526479]">
                      You troubleshoot broken plugins and DNS errors.
                    </td>
                    <td className="p-4 text-[#526479]">
                      Impersonal ticketing desk with slow response times.
                    </td>
                    <td className="bg-[#059669]/10 p-4 font-semibold text-[#081B30]">
                      ✓ Cloudflare hosting, SSL, monthly 30-min edit batch, direct owner care.
                    </td>
                  </tr>

                  <tr className="bg-[#F6F3ED]">
                    <td className="p-4 font-bold text-[#081B30]">Attention &amp; Capacity</td>
                    <td className="p-4 text-[#526479]">
                      Self-service DIY tool with generic chatbots.
                    </td>
                    <td className="p-4 text-[#526479]">
                      Junior account executives juggling 50 accounts.
                    </td>
                    <td className="bg-[#059669]/10 p-4 font-semibold text-[#081B30]">
                      ✓ Strictly 2 active builds at a time. Direct contact with Robbie Harley.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
            <div className="flex items-center gap-2.5 text-[13px] text-[#526479]">
              <PhoneCall size={16} className="shrink-0 text-[#081B30]" />
              <span>
                Questions before booking? Speak directly with Robbie Harley. No pushy sales calls.
              </span>
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
