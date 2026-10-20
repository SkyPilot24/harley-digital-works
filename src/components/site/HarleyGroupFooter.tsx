import { Phone, MessageCircle } from "lucide-react";
import { harleyGroupConfig } from "@/lib/site-config";

export function HarleyGroupFooter() {
  return (
    <footer className="studio-footer">
      <div className="studio-wrap">
        <div className="group-footer-row">
          <a href="/the-harley-group" className="group-wordmark">
            THE HARLEY GROUP<span>THOUGHTFUL DESIGN. USEFUL TECHNOLOGY.</span>
          </a>
          <nav aria-label="Group footer" className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href={"tel:" + harleyGroupConfig.contactPhoneTel}
              className="inline-flex items-center gap-1 font-semibold text-ink hover:text-emerald-700"
              aria-label={`Call The Harley Group on ${harleyGroupConfig.contactPhone}`}
            >
              <Phone size={13} className="text-emerald-700" />
              <span>{harleyGroupConfig.contactPhone}</span>
            </a>
            <a
              href={`${harleyGroupConfig.whatsappUrl}?text=${encodeURIComponent(harleyGroupConfig.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-900"
              aria-label={`WhatsApp ${harleyGroupConfig.whatsappDisplay}`}
            >
              <MessageCircle size={13} className="text-emerald-600" />
              <span>WhatsApp: {harleyGroupConfig.whatsappDisplay}</span>
            </a>
            <a href={"mailto:" + harleyGroupConfig.contactEmail}>
              {harleyGroupConfig.contactEmail}
            </a>
            <a href="https://harleydigitalworks.com">Harley Digital Works ↗</a>
            <a href="#contact">Contact</a>
            <a href="https://harleydigitalworks.com/privacy">Privacy</a>
          </nav>
        </div>
        <div className="studio-footer-bottom">
          <span>
            © {new Date().getFullYear()} The Harley Group · Bristol, United Kingdom · Mon–Fri
            09:00–17:00
          </span>
          <span>Practical digital services for independent businesses.</span>
        </div>
      </div>
    </footer>
  );
}
