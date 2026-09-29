import { PageShell } from "./PageShell";
import { PillButton } from "./PillButton";
import { WebsitePackagesSection } from "./WebsitePackagesSection";
export function TradeServiceLanding({
  name,
  location = false,
  topics = [],
}: {
  name: string;
  location?: boolean;
  topics?: string[];
}) {
  return (
    <PageShell quiet>
      <div className="studio-home">
        <section className="studio-hero">
          <div className="studio-wrap hero-layout">
            <div className="hero-copy">
              <p className="studio-kicker">
                {location ? "WEBSITES FOR LOCAL SERVICE BUSINESSES" : "WEBSITES FOR YOUR TRADE"}
              </p>
              <h1>
                {location ? "Good work in" : "Built around"}
                <br />
                <span>{name}.</span>
              </h1>
              <p className="hero-description">
                {location
                  ? "A considered website for your local business, with clear services, genuine project work and a straightforward way to enquire."
                  : "Show the quality of your work. Explain your services clearly. Make it easy for the right customers to get in touch."}
              </p>
              <div className="studio-actions">
                <PillButton
                  as="link"
                  to="/contact"
                  search={{ service: (location ? "Website in " : "Website for ") + name }}
                  variant="dark"
                >
                  Get your website plan
                </PillButton>
              </div>
              <p className="hero-support">
                An initial build fee and an ongoing monthly service. Scope, timing and costs agreed
                before work begins.
              </p>
            </div>
            <div className="service-preview">
              <img
                src="/images/home/solar.jpg"
                alt="Solar panels illustrating the practical work of a trade business"
                width="1200"
                height="800"
              />
              <p>Illustrative photography · your website will use approved business assets</p>
            </div>
          </div>
        </section>
        <section className="studio-section studio-wrap">
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
                {topics.length
                  ? "We can discuss " + topics.slice(0, 3).join(", ") + "."
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
        <WebsitePackagesSection />
      </div>
    </PageShell>
  );
}
