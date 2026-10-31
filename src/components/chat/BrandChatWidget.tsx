import { useState, useRef, useEffect, useId } from "react";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Sparkles,
  Building2,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Minimize2,
} from "lucide-react";
import type { AssistantBrand, ChatMessage, ExtractedChatLead } from "@/lib/ai-assistant/types";
import { HDW_ASSISTANT_CONFIG } from "@/lib/ai-assistant/knowledge-hdw";
import { GROUP_ASSISTANT_CONFIG } from "@/lib/ai-assistant/knowledge-group";

import { TurnstileWidget } from "@/components/site/TurnstileWidget";

interface BrandChatWidgetProps {
  brand?: AssistantBrand;
}

export function BrandChatWidget({ brand = "hdw" }: BrandChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadPrompt, setShowLeadPrompt] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  // Form inputs for quick in-chat consultation booking
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [leadToken, setLeadToken] = useState("");
  const [leadVerificationAttempt, setLeadVerificationAttempt] = useState(0);
  const [leadStartedAt] = useState(() => Date.now());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetId = useId();

  const config = brand === "group" ? GROUP_ASSISTANT_CONFIG : HDW_ASSISTANT_CONFIG;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "initial-msg",
      sender: "assistant",
      text: config.welcomeMessage,
      timestamp: "Just now",
      source: "local_knowledge_engine",
    },
  ]);

  // Keep welcome message updated if brand prop switches
  useEffect(() => {
    setMessages([
      {
        id: "initial-msg",
        sender: "assistant",
        text: config.welcomeMessage,
        timestamp: "Just now",
        source: "local_knowledge_engine",
      },
    ]);
  }, [brand, config.welcomeMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isLoading, showLeadPrompt]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: `web-${brand}-${widgetId}`,
          brand,
        }),
      });

      if (!response.ok) throw new Error("Assistant response failed");

      const data = (await response.json()) as {
        reply: string;
        source: "google_agent_builder" | "local_knowledge_engine";
        extractedLead?: ExtractedChatLead;
      };

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: "assistant",
        text: data.reply,
        source: data.source,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // If user shared contact signals, prepopulate lead form
      if (data.extractedLead) {
        if (data.extractedLead.name) setLeadName(data.extractedLead.name);
        if (data.extractedLead.email) setLeadEmail(data.extractedLead.email);
        if (data.extractedLead.phone) setLeadPhone(data.extractedLead.phone);
        if (data.extractedLead.isQualified && !leadCaptured) {
          setShowLeadPrompt(true);
        }
      }
    } catch {
      const fallbackReply =
        brand === "group"
          ? "The Harley Group Ltd oversees Harley Digital Works, Harley Labs, and our commercial domain portfolio. You can reach our founder Robbie Harley directly at robbie@theharleygroup.org or call 07394 041487."
          : "Our managed trade website package is £1,495 setup (50% upfront, 50% on approval) plus £249/mo care. You can also reach Robbie Harley directly on 07394 041487.";

      const fallbackMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: "assistant",
        text: fallbackReply,
        source: "local_knowledge_engine",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!leadName.trim() || !leadEmail.trim() || isSubmittingLead) return;
    const website = new FormData(e.currentTarget).get("website") || "";
    setIsSubmittingLead(true);
    setLeadError("");
    try {
      const response = await fetch("/api/chat/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim(),
          notes: "Website consultation requested after " + messages.length + " chat messages.",
          sessionId: "web-" + brand + "-" + widgetId,
          startedAt: leadStartedAt,
          turnstileToken: leadToken,
          website,
        }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || result.ok !== true)
        throw new Error(result.message || "We could not save your enquiry. Please try again.");
      setLeadCaptured(true);
      setShowLeadPrompt(false);
      setMessages((prev) => [
        ...prev,
        {
          id: "a-conf-" + Date.now(),
          sender: "assistant",
          text: result.message || "Your enquiry has been received.",
          source: "local_knowledge_engine",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (error) {
      setLeadToken("");
      setLeadVerificationAttempt((attempt) => attempt + 1);
      setLeadError(
        error instanceof Error
          ? error.message
          : "We could not save your enquiry. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const isHdw = brand === "hdw";

  return (
    <aside
      aria-label={`${config.agentName} AI Assistant`}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none"
    >
      {/* Discreet Floating Launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className={`inline-flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 group border ${
            isHdw
              ? "bg-[#081B30]/95 hover:bg-[#0c2644] border-emerald-500/30 shadow-emerald-950/40"
              : "bg-[#0F172A]/95 hover:bg-[#1E293B] border-amber-500/30 shadow-amber-950/40"
          }`}
          aria-label={`Open ${config.agentName} digital assistant`}
          aria-expanded={isOpen}
        >
          <div
            className={`relative flex h-8 w-8 items-center justify-center rounded-full text-slate-950 font-bold transition-transform duration-300 group-hover:rotate-12 ${
              isHdw ? "bg-emerald-500 text-slate-950" : "bg-amber-400 text-slate-950"
            }`}
          >
            {isHdw ? <Wrench className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
            <span
              className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 animate-pulse ${
                isHdw ? "bg-emerald-400" : "bg-amber-300"
              }`}
            />
          </div>

          <div className="text-left">
            <div className="text-xs font-bold flex items-center gap-1.5 text-white">
              <span>{config.agentName}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${
                  isHdw
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`}
              >
                AI Assistant
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              {isHdw ? "Ask about website builds & pricing" : "The Harley Group enquiries"}
            </div>
          </div>
        </button>
      )}

      {/* Floating Interactive Window */}
      {isOpen && (
        <div
          role="region"
          aria-label={`${config.agentName} Interactive Chat`}
          className={`w-[calc(100vw-2rem)] sm:w-[380px] flex flex-col rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all duration-300 overflow-hidden ${
            isMinimized
              ? "h-16 bg-[#081B30]/95 border-slate-700"
              : "h-[80vh] sm:h-[540px] max-h-[620px] bg-[#081B30]/98 border-slate-700/80"
          }`}
        >
          {/* Header */}
          <div
            className={`p-3.5 px-4 flex items-center justify-between border-b ${
              isHdw ? "bg-slate-950/90 border-slate-800" : "bg-slate-950/90 border-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`relative h-8 w-8 rounded-xl flex items-center justify-center font-black shadow-md ${
                  isHdw ? "bg-emerald-500 text-slate-950" : "bg-amber-400 text-slate-950"
                }`}
              >
                {isHdw ? <Wrench className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-slate-950 ${
                    isHdw ? "bg-emerald-300" : "bg-amber-300"
                  }`}
                />
              </div>

              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{config.agentName}</span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                      isHdw
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    Online
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">{config.agentTitle}</div>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body Content (if not minimized) */}
          {!isMinimized && (
            <>
              {/* Message Transcript Area */}
              <div
                aria-live="polite"
                aria-atomic="false"
                className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-slate-950/60"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-[12px] ${
                        msg.sender === "user"
                          ? isHdw
                            ? "bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-950/40"
                            : "bg-amber-600 text-white rounded-br-none shadow-md shadow-amber-950/40"
                          : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-md"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-slate-500">
                      <span>{msg.timestamp}</span>
                      {msg.source === "google_agent_builder" && (
                        <span className="text-emerald-400/80 font-mono">· Google Cloud Agent</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* In-chat Lead Capture Prompt */}
                {showLeadPrompt && !leadCaptured && (
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-white shadow-xl space-y-2.5 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Ready to discuss your project?</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      Leave your details for Robbie Harley to confirm build availability or arrange
                      a direct phone consultation.
                    </p>
                    <form onSubmit={handleSubmitLead} className="space-y-2 pt-1">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number (optional)"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <div hidden aria-hidden="true">
                        <label>
                          Website
                          <input name="website" tabIndex={-1} autoComplete="off" />
                        </label>
                      </div>
                      <TurnstileWidget key={leadVerificationAttempt} onVerify={setLeadToken} />
                      {leadError && (
                        <p role="alert" className="text-xs text-red-300">
                          {leadError}
                        </p>
                      )}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          disabled={isSubmittingLead}
                          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold text-slate-950 transition-colors ${
                            isHdw
                              ? "bg-emerald-400 hover:bg-emerald-300"
                              : "bg-amber-400 hover:bg-amber-300"
                          }`}
                        >
                          {isSubmittingLead ? "Registering..." : "Submit to Robbie Harley"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowLeadPrompt(false)}
                          className="py-1.5 px-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                        >
                          Later
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Loading / Typing Indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800/60 w-fit">
                    <span
                      className={`h-1.5 w-1.5 rounded-full animate-ping ${
                        isHdw ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    <span>{config.agentName} is composing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              {messages.length < 4 && !showLeadPrompt && (
                <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
                  {config.quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      className="shrink-0 text-[10px] px-2.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    isHdw
                      ? "Ask about websites, care plans, pricing..."
                      : "Ask about The Harley Group services..."
                  }
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled={isLoading}
                  aria-label="Your message to the AI assistant"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className={`p-2 rounded-xl text-slate-950 transition-colors disabled:opacity-40 ${
                    isHdw
                      ? "bg-emerald-400 hover:bg-emerald-300"
                      : "bg-amber-400 hover:bg-amber-300"
                  }`}
                  aria-label="Send message"
                >
                  <Send className="h-3.5 w-3.5 fill-current" />
                </button>
              </form>

              {/* Direct Founder Escalation Strip & GDPR Footer */}
              <div className="bg-[#051323] px-3 py-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate pr-1">Direct founder contact:</span>
                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href={`tel:${config.directPhoneTel}`}
                    className="hover:text-white flex items-center gap-1 font-mono text-emerald-400 hover:underline"
                    aria-label={`Call Robbie Harley on ${config.directPhone}`}
                  >
                    <Phone className="h-2.5 w-2.5" />
                    <span>{config.directPhone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowLeadPrompt(true)}
                    className="text-slate-300 hover:text-white font-semibold underline text-[10px]"
                  >
                    Book Call
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </aside>
  );
}
