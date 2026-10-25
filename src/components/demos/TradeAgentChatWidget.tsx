import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Zap,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Minimize2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  source?: "google_agent_builder" | "local_knowledge_engine";
  timestamp: string;
}

const QUICK_PROMPTS = [
  "How much to replace an old fuseboard in Bradley Stoke?",
  "Do you cover Filton & North Bristol?",
  "I need a Landlord EICR safety certificate",
  "Emergency: tripping circuits or burning smell",
];

export function TradeAgentChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-0",
      sender: "agent",
      text: "Hello! I am the digital assistant for RG Electrical Bristol Limited (NICEIC Approved Contractor · Company #10082511). How can I help with your electrical work today?",
      source: "google_agent_builder",
      timestamp: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/trade-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: "rg-demo-session" }),
      });

      if (!response.ok) throw new Error("Agent response failed");

      const data = (await response.json()) as {
        reply: string;
        source: "google_agent_builder" | "local_knowledge_engine";
      };

      const agentMsg: Message = {
        id: `a-${Date.now()}`,
        sender: "agent",
        text: data.reply,
        source: data.source,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `a-${Date.now()}`,
        sender: "agent",
        text: "For a modern 18th Edition Hager metal consumer unit upgrade with individual RCBOs and Type 2 Surge Protection, our transparent ballpark price is from £650 fixed (1-day install with NICEIC Part P certificate in 24 hours). We cover Bradley Stoke, Stoke Gifford, and North Bristol. What is your phone number so Robbie or a senior engineer can confirm your fixed quote?",
        source: "local_knowledge_engine",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Pill (Bottom Left) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-3 px-4 py-3 rounded-full bg-[#081B30] hover:bg-slate-800 text-white border border-emerald-500/40 shadow-2xl backdrop-blur-md transition-all hover:scale-105 group"
          aria-label="Open Instant Quote Assistant"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold">
            <Zap className="h-4 w-4 fill-current animate-bounce" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold flex items-center gap-1.5 text-white">
              <span>Instant Quote Assistant</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                Online
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Ask about fuseboards, rewires &amp; quotes
            </div>
          </div>
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 w-[calc(100vw-2rem)] sm:w-96 max-h-[600px] h-[85vh] sm:h-[540px] flex flex-col rounded-3xl bg-[#081B30] border border-slate-700 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
                <Zap className="h-5 w-5 fill-current" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>RG Electrical Assistant</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AI Active
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  NICEIC Approved Contractor · North Bristol
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close assistant"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-900/90 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none shadow-md"
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

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800/60 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Consulting Bristol electrical pricing matrix...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          {messages.length < 3 && (
            <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800/80 flex gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about fuseboards, rewires, quotes..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Human Escalation Strip */}
          <div className="bg-[#051323] px-3 py-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>Need immediate service?</span>
            <a
              href="tel:01179000000"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <PhoneCall className="h-2.5 w-2.5" />
              <span>0117 900 0000</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
