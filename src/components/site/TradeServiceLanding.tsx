import {
  CheckCircle2,
  ShieldCheck,
  Award,
  PhoneCall,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { PageShell } from "./PageShell";
import { PillButton } from "./PillButton";
import { WebsitePackagesSection } from "./WebsitePackagesSection";
import type { TradeVertical } from "@/lib/trade-data";
import type { LocationInfo } from "@/lib/location-data";

const ACCREDITATIONS_MAP: Record<string, string[]> = {
  electricians: [
    "NICEIC Approved Contractor",
    "NAPIT Registered",
    "OZEV Authorised",
    "Part P Compliant",
  ],
  "heating-engineers": [
    "Gas Safe Register",
    "CIPHE Institute Member",
    "Vaillant / Worcester Accredited",
    "Unvented G3",
  ],
  builders: [
    "Federation of Master Builders (FMB)",
    "TrustMark Endorsed",
    "LABC Warranty Partner",
    "NHBC Registered",
  ],
  "commercial-contractors": [
    "CHAS Accredited",
    "SafeContractor Approved",
    "Constructionline Gold",
    "ISO 9001",
  ],
};

const DEFAULT_ACCREDITATIONS = [
  "NICEIC Approved",
  "Gas Safe Register",
  "NAPIT Registered",
  "Federation of Master Builders",
];

export function TradeServiceLanding({
  name,
  location = false,
  topics = [],
  tradeInfo,
  locationInfo,
}: {
  name: string;
  location?: boolean;
  topics?: string[];
  tradeInfo?: TradeVertical;
  locationInfo?: LocationInfo;
}) {
  const kicker = tradeInfo
    ? tradeInfo.badge
    : locationInfo
      ? `WEBSITES FOR ${locationInfo.cityName.toUpperCase()} & ${locationInfo.county.toUpperCase()} TRADES`
      : location
        ? "WEBSITES FOR LOCAL SERVICE BUSINESSES"
        : "WEBSITES FOR YOUR TRADE";

  const headline = tradeInfo ? (
    <>
      {tradeInfo.heroHeadline}
      <br />
      <span>{tradeInfo.heroHighlight}</span>
    </>
  ) : locationInfo ? (
    <>
      {locationInfo.headline.split(".")[0]}.
      <br />
      <span className="studio-muted">{locationInfo.cityName} & Area.</span>
    </>
  ) : (
    <>
      {location ? "Good work in" : "Built around"}
      <br />
      <span>{name}.</span>
    </>
  );

  const subheadline = tradeInfo
    ? tradeInfo.heroSubheadline
    : locationInfo
      ? locationInfo.subheadline
      : location
        ? "A considered website for your local business, with clear services, genuine project work and a straightforward way to enquire."
        : "Show the quality of your work. Explain your services clearly. Make it easy for the right customers to get in touch.";

  const effectiveTopics = tradeInfo?.targetEnquiries || topics;
  const badges = tradeInfo
    ? (ACCREDITATIONS_MAP[tradeInfo.slug] ?? DEFAULT_ACCREDITATIONS)
    : DEFAULT_ACCREDITATIONS;

  return (
    <PageShell quiet>
      <div className="studio-home">
        <section className="studio-hero">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              {/* Trust & Rating Pre-header */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 text-[11px] font-bold text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Design, copy and ongoing care</span>
                </div>
              </div>

              <p className="studio-kicker">{kicker}</p>
              <h1>{headline}</h1>
              <p className="hero-description">{subheadline}</p>

              {/* Unambiguous, High-Contrast Action Points */}
              <div className="studio-actions flex flex-wrap items-center gap-3">
                <PillButton
                  as="link"
                  to="/contact"
                  search={{ service: (location ? "Website in " : "Website for ") + name }}
                  variant="dark"
                  className="min-h-[48px] px-6 text-sm font-bold shadow-md cursor-pointer"
                >
                  Check Availability & Get Plan
                </PillButton>

                <PillButton
                  as="link"
                  to="/contact"
                  search={{ service: `Website Review for ${name}` }}
                  variant="ghost"
                  className="min-h-[48px] px-5 text-sm font-semibold border border-ink/20 hover:bg-ink/5 cursor-pointer"
                >
                  Get a Website Review
                </PillButton>

                {locationInfo?.localPhone && (
                  <PillButton
                    as="a"
                    href={`tel:${locationInfo.localPhone.replace(/\s+/g, "")}`}
                    variant="ghost"
                    className="min-h-[48px] px-4 text-xs font-bold text-ink"
                  >
                    <PhoneCall size={14} className="mr-1.5 inline" />
                    Call {locationInfo.localPhone}
                  </PillButton>
                )}
              </div>

              <p className="hero-support text-xs leading-relaxed text-ink-muted">
                {tradeInfo
                  ? "Ratified commercial pricing: £1,495 setup (50% deposit £747.50 / 50% on approval) · £249/mo care. All copywriting written for you."
                  : "£1,495 setup (50% deposit / 50% approval) · £249/mo managed care · delivery schedule agreed in writing."}
              </p>

              {/* Regional Authority Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-ink-muted">
                <span className="flex items-center gap-1 text-emerald-800">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  Bristol, Bath & M4 Corridor
                </span>
                <span>·</span>
                <span>Direct Access to Founder Robbie Harley</span>
                <span>·</span>
                <span>Zero Sales Fluff</span>
              </div>
            </div>
            <div className="service-preview">
              <img
                src="/images/home/solar.jpg"
                alt="Solar panels illustrating the practical work of a trade business"
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
              <p>Illustrative photography · your website will use approved business assets</p>
            </div>
          </div>
        </section>

        {/* Accreditation Badges Strip */}
        <section className="studio-wrap my-6">
          <div className="rounded-2xl border border-ink/10 bg-slate-50/70 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <Award size={16} className="text-amber-600" />
                <span>Trade Accreditations We Showcase & Verify:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-ink/10 bg-white px-3 py-1 text-xs font-bold text-ink shadow-2xs"
                  >
                    <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {tradeInfo?.stats && (
          <section className="studio-wrap my-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-2xl border border-ink/10 bg-white p-6">
              {tradeInfo.stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-mono text-2xl font-semibold text-ink">{stat.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {locationInfo?.stats && (
          <section className="studio-wrap my-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-2xl border border-ink/10 bg-white p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Regional Opportunity
                </p>
                <p className="mt-1 font-mono text-2xl font-semibold text-ink">
                  {locationInfo.cityName} & Surrounds
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Delivery Schedule
                </p>
                <p className="mt-1 font-mono text-2xl font-semibold text-ink">Agreed after brief</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Commercial Offer
                </p>
                <p className="mt-1 font-mono text-2xl font-semibold text-ink">£1,495 + £249/mo</p>
              </div>
            </div>
          </section>
        )}

        {locationInfo?.localCaseStudy && (
          <section className="studio-wrap my-8">
            <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50/50 p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                Illustrative Design Study · Trade Blueprint
              </span>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                {locationInfo.localCaseStudy.name} — {locationInfo.localCaseStudy.trade}
              </h3>
              <p className="text-sm font-medium text-emerald-700">
                {locationInfo.localCaseStudy.location}
              </p>
              <p className="mt-4 text-base italic text-ink/80">
                "{locationInfo.localCaseStudy.quote}"
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-900/10 text-xs text-ink-muted">
                <span className="inline-block rounded-full bg-emerald-700 px-3 py-1 font-semibold text-white">
                  Target Outcome: {locationInfo.localCaseStudy.result}
                </span>
                <span className="text-[11px] italic">
                  Independent design study demonstrating trade architecture; not an endorsement or
                  guaranteed result.
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Trade Case Study (Bristol, Bath & Regional Focus) */}
        {tradeInfo && (
          <section className="studio-wrap my-8">
            {(() => {
              const study = {
                electricians: {
                  name: "VoltCraft Electrical Contractors",
                  location: "Bristol, Bath & M4 Corridor",
                  result: "Captured commercial 3-phase and workplace EV contracts",
                  quote:
                    "We were losing tenders to national contractors because our old DIY site looked like a one-man band. HDW gave us an authoritative presence with verified NICEIC badges and done-for-you technical copy.",
                },
                "heating-engineers": {
                  name: "Apex Thermal Solutions",
                  location: "Bath & Northeast Somerset",
                  result: "Replaced directory lead subscriptions with direct boiler enquiries",
                  quote:
                    "I was spending £800/mo buying shared leads on directories and taking calls at 9pm from price shoppers. Our new site with clear boiler and heat pump packages weeds out tyre-kickers.",
                },
                builders: {
                  name: "Severn & Avon Construction",
                  location: "Bristol, Bath & South Gloucestershire",
                  result: "Booked 2 double-storey extensions with verified plans",
                  quote:
                    "Organising our extensions gallery and highlighting FMB credentials made customers trust our pricing. HDW handled all the writing so I didn't have to touch a computer in the evenings.",
                },
                "commercial-contractors": {
                  name: "West Facilities & Maintenance",
                  location: "Bristol Fleet & Southwest Frameworks",
                  result: "Pre-qualified for local authority facilities tenders",
                  quote:
                    "Commercial procurement teams inspect your compliance credentials immediately. Having our CHAS and multi-van capacity front and centre gave us instant credibility.",
                },
              }[tradeInfo.slug] ?? {
                name: "Apex Regional Trade Services",
                location: "Bristol & Bath Corridor",
                result: "Consistent qualified direct enquiries",
                quote:
                  "Having an authoritative digital presence with clear trade services and accreditations completely transforms the quality of enquiries you receive.",
              };

              return (
                <div className="rounded-2xl border border-emerald-900/15 bg-emerald-50/50 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                      Regional Case Study · {study.location}
                    </span>
                    <span className="rounded-full bg-emerald-700/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
                      Target Outcome: {study.result}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-ink">
                    {study.name} — {tradeInfo.name}
                  </h3>
                  <p className="mt-3 text-sm italic text-ink/80 leading-relaxed">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <p className="mt-4 pt-3 border-t border-emerald-900/10 text-[11px] text-ink-muted italic">
                    Independent design study demonstrating trade architecture for the Bristol, Bath
                    and M4 region; not an endorsement or guaranteed outcome.
                  </p>
                </div>
              );
            })()}
          </section>
        )}

        {/* Practical Business Outcomes: Eliminating Evening Quote Headaches */}
        <section className="studio-section studio-wrap deferred-section">
          <p className="studio-kicker">BUILT FOR HOW TRADES ACTUALLY WORK</p>
          <h2>
            Eliminate evening quote administration.
            <br />
            <span className="studio-muted">Win better domestic & commercial contracts.</span>
          </h2>
          <div className="group-principle-grid">
            <article>
              <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <Clock size={16} />
                <span>Zero Evening Homework</span>
              </div>
              <h3>100% Written For You</h3>
              <p>
                You never have to sit at a laptop after a 10-hour day on site. We draft every
                service description, accreditation detail, and project story based on your confirmed
                facts.
              </p>
            </article>
            <article>
              <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck size={16} />
                <span>Cut Out The Middlemen</span>
              </div>
              <h3>Own Your Enquiries</h3>
              <p>
                Stop paying £30–£80 per lead to directories like Checkatrade or Bark where you race
                competitors to the bottom. Your own website generates direct, exclusive enquiries.
              </p>
            </article>
            <article>
              <div className="flex items-center gap-2 mb-2 text-violet-700 font-bold text-xs uppercase tracking-wider">
                <Sparkles size={16} />
                <span>Pre-Qualified Leads</span>
              </div>
              <h3>Weed Out Tyre-Kickers</h3>
              <p>
                Enquiry forms collect room sizes, postcodes, and project photographs so you know
                whether a job is worth your time before picking up the phone.
              </p>
            </article>
          </div>
        </section>

        {tradeInfo?.keyChallenges && tradeInfo.keyChallenges.length > 0 && (
          <section className="studio-section studio-wrap deferred-section">
            <p className="studio-kicker">SOLVING YOUR INBOUND CHALLENGES</p>
            <h2>
              Stop losing quotes.
              <br />
              <span className="studio-muted">Start capturing high-margin work.</span>
            </h2>
            <div className="group-principle-grid">
              {tradeInfo.keyChallenges.map((challenge, idx) => (
                <article key={idx}>
                  <h3>Challenge 0{idx + 1}</h3>
                  <p>{challenge}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="studio-section studio-wrap deferred-section">
          <p className="studio-kicker">MAKE YOUR BUSINESS EASY TO CHOOSE</p>
          <h2>
            Your services. Your work.
            <br />
            <span className="studio-muted">Clearly presented.</span>
          </h2>
          <div className="group-principle-grid">
            <article>
              <h3>Show what you do.</h3>
              <p>
                Organise your services around the work you want enquiries for.{" "}
                {effectiveTopics.length
                  ? "We can discuss " + effectiveTopics.slice(0, 3).join(", ") + "."
                  : "Keep the information useful, specific and easy to find."}
              </p>
            </article>
            <article>
              <h3>Build trust with facts.</h3>
              <p>
                Use real project photographs, customer-authorised reviews and current qualifications
                that you can verify.
              </p>
            </article>
            <article>
              <h3>Make the next step simple.</h3>
              <p>
                Clear contact details and a useful enquiry form, designed to work on a phone as well
                as a desktop.
              </p>
            </article>
          </div>
        </section>

        {locationInfo?.boroughs && locationInfo.boroughs.length > 0 && (
          <section className="studio-wrap my-8 deferred-section">
            <div className="rounded-2xl border border-ink/10 bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                Coverage Postcodes & Boroughs
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {locationInfo.nearbyPostcodes.map((pc) => (
                  <span
                    key={pc}
                    className="rounded-md bg-ink/5 px-2.5 py-1 text-xs font-mono font-medium text-ink"
                  >
                    {pc}
                  </span>
                ))}
                {locationInfo.boroughs.map((b) => (
                  <span
                    key={b}
                    className="rounded-md bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="deferred-section">
          <WebsitePackagesSection />
        </div>
      </div>
    </PageShell>
  );
}
