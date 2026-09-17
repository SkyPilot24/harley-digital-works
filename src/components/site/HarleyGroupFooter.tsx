import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { ShieldCheck, Lock, Globe } from "lucide-react";

export function HarleyGroupFooter() {
  return (
    <footer className="studio-footer bg-[#0D0D0D] text-white/80 border-t border-white/10 pt-16 pb-12">
      <div className="studio-wrap space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/the-harley-group" aria-label="The Harley Group corporate home">
              <BrandLogo entity="group" variant="light" imageClassName="h-8 w-auto" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              The Harley Group is an independent UK corporate holding company overseeing operating divisions in web engineering, commercial digital services, and proprietary operational tooling.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-white/50">
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                <ShieldCheck size={14} className="text-[#C89D3C]" /> ICO Registered
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                <Lock size={14} className="text-[#C89D3C]" /> GDPR Compliant
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                <Globe size={14} className="text-[#C89D3C]" /> Bristol, UK Headquarters
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C89D3C]">
              Operating Divisions
            </h4>
            <nav className="flex flex-col space-y-2 text-sm text-white/70">
              <Link to="/services" className="hover:text-white transition-colors">
                Harley Digital Works (Commercial Web)
              </Link>
              <Link to="/labs" className="hover:text-white transition-colors">
                Harley Labs (R&D & Engineering)
              </Link>
              <Link to="/domains" className="hover:text-white transition-colors">
                Domain Infrastructure Portfolio
              </Link>
              <Link to="/care-desk" className="hover:text-white transition-colors">
                Client Operations Desk
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C89D3C]">
              Governance & Standards
            </h4>
            <nav className="flex flex-col space-y-2 text-sm text-white/70">
              <a href="#overview" className="hover:text-white transition-colors">
                Corporate Overview
              </a>
              <a href="#investment" className="hover:text-white transition-colors">
                Capital Allocation & Philosophy
              </a>
              <a href="#governance" className="hover:text-white transition-colors">
                Statutory Governance Record
              </a>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Group Privacy & Data Governance
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C89D3C]">
              Executive Contact
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-white/70">
              <Link
                to="/contact"
                search={{
                  service: undefined,
                  package: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
                className="hover:text-white transition-colors font-mono text-xs underline decoration-white/20"
              >
                Submit Executive Enquiry ↗
              </Link>
              <p className="text-xs text-white/50 pt-2 leading-normal">
                Direct enquiries regarding commercial partnerships, operating ventures, or corporate governance.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} The Harley Group Ltd. Registered in England & Wales. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-mono">
            <span>DISCIPLINE</span>
            <span>·</span>
            <span>GOVERNANCE</span>
            <span>·</span>
            <span>VALUE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
