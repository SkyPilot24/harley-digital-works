import { Link } from "@tanstack/react-router";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-thg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-extrabold">THG</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-thg-teal-light">
              Digital Agency
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            The lean, AI-powered digital partner for small operators who want
            big-brand results without the agency overhead.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link to="/services" className="hover:text-white">Websites</Link></li>
            <li><Link to="/services" className="hover:text-white">Content engine</Link></li>
            <li><Link to="/services" className="hover:text-white">Automation</Link></li>
            <li><Link to="/domains" className="hover:text-white">Domains</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li>
              <a href="mailto:hello@thg.digital" className="hover:text-white">
                hello@thg.digital
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>&copy; {YEAR} The Harley Group. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.2em]">Direct · Capable · Human</p>
        </div>
      </div>
    </footer>
  );
}
