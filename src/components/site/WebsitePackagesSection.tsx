import { Check, ArrowUpRight } from "lucide-react";
import { PillButton } from "./PillButton";

export function WebsitePackagesSection({
  title = "One website. Looked after.",
  subtitle = "An initial build fee gets you live. A monthly subscription keeps your digital presence working.",
  kicker = "TRANSPARENT INVESTMENT",
}: {
  title?: string;
  subtitle?: string;
  kicker?: string;
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
            <p className="studio-kicker">{kicker}</p>
            <h2 id="offer-heading">{title}</h2>
          </div>
          <p>{subtitle}</p>
        </div>
        <div className="managed-offer-grid">
          <div className="managed-offer-intro">
            <div className="inline-flex items-center gap-2 rounded-full bg-hdw-blue/60 px-3 py-1 text-xs font-mono text-hdw-ivory mb-3 border border-hdw-ivory/30">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Quality Guard: Max 2 Active Builds
            </div>
            <p className="studio-kicker">YOUR DIGITAL PRESENCE, FULLY MANAGED</p>
            <h3>
              Managed websites
              <br />
              for ambitious trades.
            </h3>
            <p>
              Professional design, copywriting based on your confirmed business facts, and ongoing
              technical care. We prepare the copy; you approve the facts and finished website.
            </p>
            <div className="flex flex-col gap-2 w-full my-4 p-4 rounded-xl bg-hdw-blue/80 border border-white/10 text-xs">
              <div className="flex justify-between items-center text-white/90">
                <span className="font-semibold text-hdw-ivory">Initial Setup</span>
                <span className="font-mono">£1,495</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Payment Schedule</span>
                <span className="font-mono">50% Deposit / 50% on Approval</span>
              </div>
              <div className="flex justify-between items-center text-white/90 pt-2 border-t border-white/10">
                <span className="font-semibold text-emerald-400">Monthly Digital Care</span>
                <span className="font-mono">£249 / mo (Rolling 30-day)</span>
              </div>
              <div className="flex justify-between items-center text-white/80 pt-1.5 border-t border-white/5 text-[11px]">
                <span className="text-amber-300 font-medium">+ 24/7 Phone Receptionist</span>
                <span className="font-mono text-amber-200">+£99 / mo (Save £50/mo)</span>
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
                  Agreed Delivery Schedule
                </span>
              </div>
              <h3>Get the right foundations for your business.</h3>
              <p className="text-sm text-ink-muted mb-3">
                50% deposit (£747.50) reserves your build slot · 50% balance (£747.50) payable only
                upon your final preview approval.
              </p>
              <ul>
                {[
                  "5-page custom trade architecture (Home, About, Services, Selected Work, Dual Enquiry Desk)",
                  "Done-for-you trade copywriting based on your confirmed business facts",
                  "Fast mobile experience, your verified trade accreditations, and agreed dual enquiry routing",
                  "Factual local-business structured data and reviewed domain connection preserving your existing email",
                  "Two structured preview revision rounds before public cutover: you approve before going live",
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
                Monthly care begins at go-live · Cancel with 30 days written notice, as set out in
                your agreement.
              </p>
              <ul>
                {[
                  "Cloudflare hosting and SSL maintenance, with monitoring and backup arrangements confirmed in your proposal",
                  "One non-accumulating content edit batch each month, up to 30 minutes",
                  "Dual-desk enquiry health checks with direct Slack/founder priority triage",
                  "Monthly performance reporting and Google review workflow recommendations",
                  "Support contact, covered hours and response commitments set out in your proposal",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            {/* 24/7 Receptionist Add-On Spotlight */}
            <div className="rounded-xl border border-amber-300/80 bg-amber-50/80 p-4 text-xs text-[#081B30] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="space-y-1">
                <span className="font-bold text-[#081B30] flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-[#081B30] font-mono text-[10px] uppercase font-bold">
                    Popular Add-On
                  </span>
                  <span>24/7 AI Virtual Phone Receptionist (+£99 / mo)</span>
                </span>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  Never miss an emergency call while on tools or driving. Answers in natural British
                  English and texts lead summaries to your WhatsApp in 30 seconds. (£50/mo bundle
                  discount when paired with your website).
                </p>
              </div>
              <a
                href="/virtual-receptionist"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-[#081B30] px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-xs"
              >
                <span>Voice Demo</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="offer-terms bg-stone-50 p-4 rounded-xl border border-stone-200/60 text-xs">
              <strong className="block text-ink font-semibold mb-1">
                The Harley Group Governance Promise:
              </strong>
              <p className="mb-2">
                Your written quote confirms the scope, payment milestones, delivery schedule and all
                terms upfront before you commit.
              </p>
              <p>
                To maintain senior founder oversight and high delivery standards, client onboarding
                is strictly limited to two active builds at any one time.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <a href="/services/care-plans" className="studio-text-link">
                What ongoing care means <ArrowUpRight size={16} />
              </a>
              <a
                href="/contact?service=Website%20scope%20and%20investment"
                className="studio-text-link"
              >
                Discuss your website investment <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
