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
    <section
      className="managed-offer studio-section deferred-section"
      id="packages"
      aria-labelledby="offer-heading"
    >
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
            <div className="inline-flex items-center gap-2 rounded-full bg-hdw-blue/60 px-3 py-1 text-xs font-mono text-hdw-ivory mb-3 border border-hdw-ivory/30">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Pilot Capacity: Capped at 2–3 Builds
            </div>
            <p className="studio-kicker">YOUR DIGITAL PRESENCE, FULLY MANAGED</p>
            <h3>
              Managed websites
              <br />
              for ambitious trades.
            </h3>
            <p>
              Professional design, industry-verified copywriting, and ongoing technical care. No
              homework assignments, no agency retainers, and no technical headaches.
            </p>
            <div className="flex flex-col gap-2 w-full my-4 p-4 rounded-xl bg-hdw-blue/80 border border-white/10 text-xs">
              <div className="flex justify-between items-center text-white/90">
                <span className="font-semibold text-hdw-ivory">Initial Setup</span>
                <span className="font-mono">£1,495 (Zero VAT)</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Payment Schedule</span>
                <span className="font-mono">50% Deposit / 50% on Approval</span>
              </div>
              <div className="flex justify-between items-center text-white/90 pt-2 border-t border-white/10">
                <span className="font-semibold text-emerald-400">Monthly Digital Care</span>
                <span className="font-mono">£249 / mo (Rolling 30-day)</span>
              </div>
            </div>
            <PillButton
              as="link"
              to="/contact"
              search={{ service: "Managed website and ongoing care" }}
              variant="light"
            >
              Get your website plan
            </PillButton>
            <span className="offer-small">
              A conversation first. A written scope and quote before you commit.
            </span>
          </div>
          <div className="managed-offer-detail">
            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="offer-stage">01 / INITIAL SETUP · £1,495</span>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  14-Day Delivery
                </span>
              </div>
              <h3>Get the right foundations in 14 days.</h3>
              <p className="text-sm text-ink-muted mb-3">
                50% deposit (£747.50) reserves your build slot · 50% balance (£747.50) payable only
                upon your final preview approval.
              </p>
              <ul>
                {[
                  "5-page custom trade architecture (Home, About, Services, Selected Work, Dual Enquiry Desk)",
                  "100% done-for-you technical copy written and verified for your specific trade",
                  "Fast mobile experience, trade accreditation badges (NICEIC, Gas Safe, FMB), and dual enquiry routing",
                  "Top-3 Local Map Pack Schema JSON-LD microdata, domain DNS, and SPF/DKIM/DMARC email protection",
                  "Two structured preview revision rounds before public cutover — you approve before going live",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="offer-stage">02 / MONTHLY CARE · £249 / MO</span>
                <span className="text-xs font-mono text-ink-muted bg-stone-100 px-2.5 py-0.5 rounded-full">
                  Rolling 30-Day Agreement
                </span>
              </div>
              <h3>Continuous protection, speed, and updates.</h3>
              <p className="text-sm text-ink-muted mb-3">
                Billed via Stripe auto-debit starting on your go-live date · Cancel anytime with 30
                days notice.
              </p>
              <ul>
                {[
                  "Ultra-fast Cloudflare edge hosting, enterprise SSL, daily backups, and 24/7 uptime monitoring",
                  "Monthly content & copy updates included (new case studies, photos, pricing, or service additions)",
                  "Dual-desk enquiry health checks with direct Slack/founder priority triage",
                  "Monthly performance reporting and Google review workflow recommendations",
                  "Standard 24h business-day support SLA (with priority 4h outage triage)",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer-terms bg-stone-50 p-4 rounded-xl border border-stone-200/60 text-xs">
              <strong className="block text-ink font-semibold mb-1">
                The Harley Group Governance Promise:
              </strong>
              <p className="mb-2">
                VAT treatment: Operating below the statutory HMRC threshold; all quoted prices are
                zero-rated / VAT not applicable (£0 tax burden).
              </p>
              <p>
                Strict capacity governance: Robbie limits active client onboarding builds to 2–3 at
                any time to guarantee personal craftsmanship, responsive communication, and 14-day
                turnaround times.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <a href="/services/care-plans" className="studio-text-link">
                What ongoing care means <ArrowUpRight size={16} />
              </a>
              <a href="/calculator" className="studio-text-link">
                Calculate your trade ROI <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
