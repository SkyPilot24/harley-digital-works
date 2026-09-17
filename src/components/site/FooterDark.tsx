import { Link } from "@tanstack/react-router";
import { StudioWordmark } from "./StudioWordmark";
import { siteConfig } from "@/lib/site-config";

export function FooterDark() {
  return (
    <footer className="studio-footer">
      <div className="studio-wrap">
        <div className="studio-footer-top">
          <div>
            <Link to="/" aria-label="Harley Digital Works home">
              <StudioWordmark />
            </Link>
            <p>
              Thoughtful websites for people who care about their business. Designed, written and
              looked after.
            </p>
          </div>
          <div>
            <h3>Make your next move.</h3>
            <nav aria-label="Website services">
              <a href="/#selected-work">Explore the designs</a>
              <a href="/#packages">Website packages</a>
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
              <Link to="/the-harley-group">The Harley Group</Link>
              <Link to="/resources">Resources</Link>
              <Link to="/care-desk">Client care desk</Link>
            </nav>
          </div>
          <div>
            <h3>A good place to start.</h3>
            <nav aria-label="Contact the studio">
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
          <span>© {new Date().getFullYear()} Harley Digital Works. Part of The Harley Group.</span>
          <span>Independent thinking. Considered design.</span>
        </div>
      </div>
    </footer>
  );
}
