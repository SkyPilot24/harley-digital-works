import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { harleyGroupConfig } from "@/lib/site-config";

export function HarleyGroupHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  const links = [
    ["#digital-works", "What we do"],
    ["#approach", "Our approach"],
    ["#community", "Community"],
    ["#contact", "Get in touch"],
  ];
  return (
    <header className="studio-header">
      <div className="studio-header-inner">
        <a href="/the-harley-group" className="group-wordmark" aria-label="The Harley Group home">
          THE HARLEY GROUP<span>PRACTICAL AMBITION. LASTING VALUE.</span>
        </a>
        <nav className="studio-desktop-nav" aria-label="Group navigation">
          {links.map(([h, t]) => (
            <a href={h} key={h}>
              {t}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${harleyGroupConfig.contactPhoneTel}`}
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-ink/80 hover:text-ink transition-colors px-2 py-1.5 rounded-lg hover:bg-ink/5"
            aria-label={`Call The Harley Group on ${harleyGroupConfig.contactPhone}`}
          >
            <Phone size={13} className="text-emerald-700" />
            <span>{harleyGroupConfig.contactPhone}</span>
          </a>
          <a className="group-header-link" href="https://harleydigitalworks.com">
            Digital Works ↗
          </a>
        </div>
        <button
          className="studio-menu-toggle"
          ref={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="group-mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="group-mobile-nav"
          className="studio-mobile-nav"
          aria-label="Group mobile navigation"
        >
          <div className="flex flex-col gap-2 pt-2 pb-3 border-b border-ink/10">
            <a
              href={`tel:${harleyGroupConfig.contactPhoneTel}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-ink/5 hover:bg-ink/10 p-2.5 text-xs font-bold text-ink"
              aria-label={`Call ${harleyGroupConfig.contactPhone}`}
            >
              <Phone size={14} className="text-emerald-700" />
              <span>Call {harleyGroupConfig.contactPhone}</span>
            </a>
            <a
              href={`${harleyGroupConfig.whatsappUrl}?text=${encodeURIComponent(harleyGroupConfig.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 p-2.5 text-xs font-bold text-emerald-900 border border-emerald-200"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={14} className="text-emerald-600" />
              <span>Chat on WhatsApp ({harleyGroupConfig.whatsappDisplay})</span>
            </a>
          </div>
          {links.map(([h, t]) => (
            <a href={h} key={h} onClick={() => setOpen(false)}>
              {t}
            </a>
          ))}
          <a href="https://harleydigitalworks.com">Harley Digital Works ↗</a>
        </nav>
      )}
    </header>
  );
}
