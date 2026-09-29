import { Check, ArrowUpRight } from "lucide-react";
import { PillButton } from "./PillButton";

export function WebsitePackagesSection({
  title = "One website. Looked after.",
  subtitle = "An initial build fee gets you live. A monthly subscription keeps your digital presence working.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="managed-offer studio-section" id="packages" aria-labelledby="offer-heading">
      <div className="studio-wrap">
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">04 / A CLEAR WAY TO WORK TOGETHER</p>
            <h2 id="offer-heading">{title}</h2>
          </div>
          <p>{subtitle}</p>
        </div>
        <div className="managed-offer-grid">
          <div className="managed-offer-intro">
            <p className="studio-kicker">YOUR DIGITAL SIDE, TAKEN CARE OF</p>
            <h3>
              Managed websites
              <br />
              for busy trades.
            </h3>
            <p>
              A considered website and a practical ongoing service. Built around your business, with
              a clear scope before you commit.
            </p>
            <PillButton
              as="link"
              to="/contact"
              search={{ service: "Managed website and ongoing care" }}
              variant="light"
            >
              Get your website plan
            </PillButton>
            <span className="offer-small">
              A conversation first. A written quote before work begins.
            </span>
          </div>
          <div className="managed-offer-detail">
            <div>
              <span className="offer-stage">01 / INITIAL BUILD FEE</span>
              <h3>Get the right foundations.</h3>
              <ul>
                {[
                  "A focused website with your services, work and contact details",
                  "Copy written for you, with business facts approved by you",
                  "Mobile-friendly design and clear enquiry routes",
                  "Search metadata, launch checks and domain connection",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="offer-stage">02 / MONTHLY SUBSCRIPTION</span>
              <h3>Keep moving after launch.</h3>
              <ul>
                {[
                  "Managed hosting and routine website maintenance",
                  "Content changes within an agreed monthly allowance",
                  "Enquiry checks and a clear route to request help",
                  "Practical reporting and prioritised improvements",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <p className="offer-terms">
              Your proposal sets out the setup fee, monthly cost, page count, revisions, support,
              ownership and cancellation terms. Extra pages or integrations are scoped separately.
            </p>
            <a href="/services/care-plans" className="studio-text-link">
              What ongoing care means <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
