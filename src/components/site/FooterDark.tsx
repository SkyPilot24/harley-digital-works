import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function FooterDark() {
  return (
    <footer className="w-full bg-[#F7F5EE] text-[#0b1c30] pt-12 pb-8 border-t border-[#dce9ff]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
        {/* Pilot Capacity Callout Banner */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl bg-[#081B30] p-6 text-white shadow-[0_12px_28px_-6px_rgba(8,27,48,0.18)] md:flex-row md:items-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded bg-[#0F2642] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#10B981]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
              Pilot Capacity: Strictly limited to 2 concurrent builds
            </div>
            <p className="text-[15px] leading-[24px] text-[#eff4ff]">
              Engineering bespoke lead generation engines for established UK trade
              specialists. Zero outsourced fluff.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#d3e4fe]">
              SLA DISPATCH READY
            </span>
            <Link
              to="/contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#10B981] px-4 text-xs font-bold text-[#081B30] transition-colors hover:bg-[#34D399]"
            >
              Reserve Build Slot →
            </Link>
          </div>
        </div>

        {/* 4-Column Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-4">
          <div className="space-y-4">
            <Link
              to="/"
              className="font-display text-[20px] font-bold uppercase tracking-[-0.015em] text-[#081B30] block"
            >
              HARLEY DIGITAL WORKS
            </Link>
            <p className="text-[13px] leading-[20px] text-[#44474d]">
              Specialised web design, high-ticket trade copywriting, and monthly digital
              infrastructure care for premier UK commercial and domestic contractors.
            </p>
            <div className="space-y-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
              <div>BRISTOL, UK · MON-FRI 09:00-17:00</div>
              <div>
                <Link to="/the-harley-group" className="hover:text-[#081B30] underline">
                  PART OF THE HARLEY GROUP
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#081B30]">
              TRADE SPECIALISMS
            </div>
            <ul className="space-y-2 text-[13px] leading-[20px]">
              <li>
                <a
                  href="/#trades-showcase"
                  className="text-[#44474d] transition-colors hover:text-[#081B30]"
                >
                  Electrical &amp; EV Contractors
                </a>
              </li>
              <li>
                <a
                  href="/#trades-showcase"
                  className="text-[#44474d] transition-colors hover:text-[#081B30]"
                >
                  Heating &amp; Gas Engineers
                </a>
              </li>
              <li>
                <a
                  href="/#work"
                  className="text-[#44474d] transition-colors hover:text-[#081B30]"
                >
                  Renewables &amp; Solar PV
                </a>
              </li>
              <li>
                <a
                  href="/#trades-showcase"
                  className="text-[#44474d] transition-colors hover:text-[#081B30]"
                >
                  Master Builders &amp; Renovators
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#081B30]">
              CORE INFRASTRUCTURE
            </div>
            <ul className="space-y-2 text-[13px] leading-[20px]">
              <li>
                <Link
                  to="/services/care-plans"
                  className="text-[#44474d] transition-colors hover:text-[#081B30]"
                >
                  Monthly Digital Care Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/virtual-receptionist"
                  className="text-[#44474d] transition-colors hover:text-[#081B30]"
                >
                  24/7 Virtual Receptionist
                </Link>
              </li>
              <li>
                <Link
                  to="/demos"
                  className="text-[#44474d] transition-colors hover:text-[#081B30]"
                >
                  High-Ticket Quote Calculators
                </Link>
              </li>
              <li>
                <Link
                  to="/work"
                  className="text-[#44474d] transition-colors hover:text-[#081B30]"
                >
                  Architectural Project Portfolios
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#081B30]">
              DIRECT DISPATCH &amp; CONTACT
            </div>
            <div className="space-y-2 text-[13px] leading-[20px] text-[#44474d]">
              <div>
                Direct Phone:{" "}
                <a
                  className="font-semibold text-[#081B30] hover:text-[#006c49]"
                  href={`tel:${siteConfig.contactPhoneTel}`}
                >
                  {siteConfig.contactPhone}
                </a>
              </div>
              <div>
                WhatsApp Dispatch:{" "}
                <a
                  className="font-semibold text-[#081B30] hover:text-[#006c49]"
                  href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.whatsappDisplay}
                </a>
              </div>
              <div>
                Studio Enquiries:{" "}
                <a
                  className="font-semibold text-[#081B30] hover:text-[#006c49]"
                  href={`mailto:${siteConfig.contactEmail}`}
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
              <div className="pt-1">
                <Link
                  to="/labs"
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#006c49] hover:underline"
                >
                  Harley Labs R&amp;D →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contractor Trust & Assurance Commitments */}
        <div className="my-4 rounded-xl bg-[#F3F4F6] p-6 border border-[#E2E8F0]">
          <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d]">
            CONTRACTOR TRUST &amp; ASSURANCE COMMITMENTS
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#081B30]">
                <CheckCircle2 size={16} className="text-[#006c49] shrink-0" />
                <span>50/50 Approval Milestone</span>
              </div>
              <p className="text-[13px] leading-[20px] text-[#44474d]">
                Second invoice issued exclusively upon total sign-off. Zero-risk deposit
                model.
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#081B30]">
                <CheckCircle2 size={16} className="text-[#006c49] shrink-0" />
                <span>100% Client Asset Ownership</span>
              </div>
              <p className="text-[13px] leading-[20px] text-[#44474d]">
                Complete proprietary handover of code, high-res assets, copywriting, and
                domain DNS.
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#081B30]">
                <CheckCircle2 size={16} className="text-[#006c49] shrink-0" />
                <span>30-Day Fair Exit Care</span>
              </div>
              <p className="text-[13px] leading-[20px] text-[#44474d]">
                No vendor lock-in. Cancel care plans anytime with smooth 30-day
                offboarding.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#44474d] md:flex-row">
          <div>
            © {new Date().getFullYear()} HARLEY DIGITAL WORKS. ALL RIGHTS RESERVED. THE
            HARLEY GROUP UK.
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <span>BRITISH TRADE ENGINEERING</span>
            <Link to="/privacy" className="hover:text-[#081B30] transition-colors">
              PRIVACY &amp; COOKIES
            </Link>
            <Link to="/privacy" className="hover:text-[#081B30] transition-colors">
              TERMS OF ENGAGEMENT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
