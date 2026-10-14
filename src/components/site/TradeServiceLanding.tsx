import { PageShell } from "./PageShell";
import { PillButton } from "./PillButton";
import { WebsitePackagesSection } from "./WebsitePackagesSection";
import type { TradeVertical } from "@/lib/trade-data";
import type { LocationInfo } from "@/lib/location-data";

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

  return (
    <PageShell quiet>
      <div className="studio-home">
        <section className="studio-hero">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">{kicker}</p>
              <h1>{headline}</h1>
              <p className="hero-description">{subheadline}</p>
              <div className="studio-actions">
                <PillButton
                  as="link"
                  to="/contact"
                  search={{ service: (location ? "Website in " : "Website for ") + name }}
                  variant="dark"
                >
                  Get your website plan
                </PillButton>

                {locationInfo?.localPhone && (
                  <PillButton
                    as="a"
                    href={`tel:${locationInfo.localPhone.replace(/\s+/g, "")}`}
                    variant="ghost"
                  >
                    Call {locationInfo.localPhone}
                  </PillButton>
                )}
              </div>
              <p className="hero-support">
                {tradeInfo
                  ? "Show your verified trade accreditations, services and genuine project work."
                  : "£1,495 setup (50% deposit / 50% approval) · £249/mo managed care · delivery schedule agreed in writing."}
              </p>
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
