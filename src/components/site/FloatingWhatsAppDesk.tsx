import { useState, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const QUICK_PROMPTS = [
  "Hi, I want to discuss a managed website (£1,495 setup + £249/mo care).",
  "Hi Robbie, can we discuss the scope and timing for my trade website?",
  "Hi, I want to ask about your £249/mo managed website care.",
  "Hi, I have a question about my website project.",
];

export function FloatingWhatsAppDesk() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [isDismissed, setIsDismissed] = useState(false);

  // Phone number for Harley Digital Works (UK WhatsApp)
  const phone = "447883180424"; // Format without + or spaces for wa.me

  const handleSend = (textToSend: string) => {
    const encoded = encodeURIComponent(
      textToSend ||
        "Hi Harley Digital Works, I'd like to chat about getting a website sorted for my business.",
    );
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-xl hover:bg-emerald-500 active:scale-95 transition-all duration-200 border-2 border-emerald-400/40"
          aria-label="Open WhatsApp Trade Fast-Desk"
        >
          <div className="relative">
            <MessageCircle className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-100" />
            </span>
          </div>
          <span className="text-xs font-bold tracking-wide">
            WhatsApp Desk{" "}
            <span className="hidden sm:inline font-normal text-emerald-100">· Message us</span>
          </span>
        </button>
      )}

      {/* Expanded Fast-Desk Modal */}
      {isOpen && (
        <div className="relative w-[340px] sm:w-[380px] rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 p-4 border-b border-emerald-900/40 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Harley Digital Works
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                </h4>
                <p className="text-[11px] text-emerald-300 font-mono">Websites & ongoing care</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp messages"
              className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-900/90 text-xs">
            <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-slate-300">
              <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Need your website sorted fast?
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Send us a message on WhatsApp to discuss your website, ongoing care, or the next
                available build slot.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                1-Tap Quick Messages:
              </p>
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left rounded-lg bg-slate-950/80 hover:bg-emerald-950/40 hover:border-emerald-700/50 p-2.5 text-[11px] text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-between group"
                >
                  <span className="line-clamp-1 pr-2">{prompt}</span>
                  <ArrowRight className="h-3 w-3 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customMsg.trim()) {
                      handleSend(customMsg);
                    }
                  }}
                  placeholder="Type your message..."
                  aria-label="WhatsApp message"
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                />
                <button
                  onClick={() => handleSend(customMsg)}
                  aria-label="Open WhatsApp with this message"
                  className="rounded-xl bg-emerald-600 px-3.5 py-2 text-white hover:bg-emerald-500 transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="border-t border-slate-800 bg-slate-950 px-4 py-2 text-[10px] text-slate-500 text-center font-mono">
            Direct access to Dr Robbie Harley & HDW Project Leads
          </div>
        </div>
      )}
    </div>
  );
}
