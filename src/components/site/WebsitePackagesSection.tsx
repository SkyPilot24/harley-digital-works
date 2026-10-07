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
              <span className="offer-stage">01 / INITIAL SETUP · £1,495</span>
              <h3>Get the right foundations.</h3>
              <p className="text-sm text-ink-muted mb-3">
                50% deposit (£747.50) to reserve build slot · 50% balance (£747.50) upon preview
                sign-off.
              </p>
              <ul>
                {[
                  "5-page trade architecture (Home, About, Services, Selected Work, Contact Desk)",
                  "100% done-for-you technical copy written and verified for your trade",
                  "Mobile-responsive design, trade accreditation badges and dual enquiry desk",
                  "Local Map Pack Schema JSON-LD microdata, domain DNS and email protection",
                  "Two structured preview revision rounds before public cutover",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="offer-stage">02 / MONTHLY CARE · £249 / MO</span>
              <h3>Keep moving after launch.</h3>
              <p className="text-sm text-ink-muted mb-3">
                Rolling 30-day agreement · Billed via Stripe auto-debit starting on your go-live
                date.
              </p>
              <ul>
                {[
                  "Cloudflare edge hosting, SSL certificates and uptime monitoring",
                  "1 batch of content updates per month (up to 30 mins non-accumulative)",
                  "Dual-desk enquiry health checks and direct support triage",
                  "Monthly performance digest and review workflow guidance",
                  "Standard 24h business-day support SLA (4h outage priority response)",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <p className="offer-terms">
              VAT treatment: Operating below the statutory HMRC threshold; prices are zero-rated /
              VAT not applicable. Onboarding capacity is capped at 2–3 concurrent builds to
              safeguard quality and senior attention.
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
