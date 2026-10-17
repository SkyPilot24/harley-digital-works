import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppContactUrl } from "@/lib/site-config";

export function FloatingWhatsAppDesk() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <aside className="whatsapp-contact" aria-label="WhatsApp contact">
      <a
        href={getWhatsAppContactUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (opens WhatsApp in a new tab)"
      >
        <MessageCircle size={19} aria-hidden="true" />
        <span>Chat with us on WhatsApp</span>
      </a>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss WhatsApp contact button"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </aside>
  );
}
