import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle } from "lucide-react";
import { StudioWordmark } from "./StudioWordmark";
import { siteConfig } from "@/lib/site-config";

export function FooterDark() {
  return (
    <footer className="studio-footer">
      <div className="studio-wrap">
        <div className="studio-footer-top">
          <div>
            <Link to="/" aria-label="Harley Digital Works home">
              <StudioWordmark light />
            </Link>
            <p>
              Thoughtful websites for people who care about their business. Designed, written and
              looked after.
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-[11px] leading-relaxed text-slate-400">
              <span className="font-semibold text-white block mb-0.5">What we commit to</span>
              <span>
                Final 50% due only after you approve. Agreed scope in writing. Cancel on 30 days’
                notice.
              </span>
            </div>
          </div>
          <div>
            <h3>Make your next move.</h3>
            <nav aria-label="Website services">
              <Link to="/work">Selected Work & Design Studies</Link>
              <Link to="/virtual-receptionist">24/7 Phone Receptionist</Link>
              <Link to="/demos">Interactive Trade Demos</Link>
              <a href="/#packages">Build & monthly care</a>
              <Link to="/services/care-plans">Managed care</Link>
              <Link
                to="/contact"
                search={{
                  service: undefined,
                  package: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
              >
                Start a conversation
              </Link>
            </nav>
          </div>
          <div>
            <h3>Get to know us.</h3>
            <nav aria-label="About the studio">
              <Link to="/about">About the studio</Link>
              <Link to="/domains">Domain Portfolio</Link>
              <Link to="/the-harley-group">The Harley Group</Link>
              <Link to="/labs">Harley Labs R&D</Link>
              <Link
                to="/contact"
                search={{
                  service: "Free Website Health Check Consultation",
                  package: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
              >
                Free website consultation
              </Link>
            </nav>
          </div>
          <div>
            <h3>A good place to start.</h3>
            <nav aria-label="Contact the studio">
              <a
                href={"tel:" + siteConfig.contactPhoneTel}
                className="inline-flex items-center gap-1.5"
                aria-label={`Call ${siteConfig.contactPhone}`}
              >
                <Phone size={13} className="text-gold-400" />
                <span>{siteConfig.contactPhone}</span>
              </a>
              <a
                href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
                aria-label={`Chat on WhatsApp ${siteConfig.whatsappDisplay}`}
              >
                <MessageCircle size={13} />
                <span>WhatsApp: {siteConfig.whatsappDisplay}</span>
              </a>
              <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>
              <Link
                to="/contact"
                search={{
                  service: undefined,
                  package: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
              >
                Tell us about your project ↗
              </Link>
              <Link to="/privacy">Privacy policy</Link>
            </nav>
          </div>
        </div>
        <div className="studio-footer-bottom">
          <span>
            © {new Date().getFullYear()} Harley Digital Works. Part of The Harley Group · Bristol,
            UK · Mon - Fri 09:00 - 17:00
          </span>
          <span>Independent thinking. Considered design.</span>
        </div>
      </div>
    </footer>
  );
}
