import { useState } from "react";
import {
  MessageSquare,
  Send,
  Phone,
  Bot,
  User,
  Sparkles,
  ExternalLink,
  Copy,
  CheckCircle2,
  Clock,
  Zap,
  Flame,
  ShieldCheck,
  Building2,
  PhoneCall,
  Mic,
  Play,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  sender: "contractor" | "bot" | "admin";
  senderName: string;
  message: string;
  timestamp: string;
  stagingUrl?: string;
}

interface WhatsAppThread {
  id: string;
  contractorName: string;
  companyName: string;
  phone: string;
  trade: string;
  city: string;
  unreadCount: number;
  lastMessageTime: string;
  status: "qualified" | "staging_sent" | "proposal_pending" | "converted";
  messages: ChatMessage[];
}

const SAMPLE_THREADS: WhatsAppThread[] = [
  {
    id: "th-1",
    contractorName: "Dave Harrison",
    companyName: "Cheshire Heat & Boiler Co Ltd",
    phone: "07700 900281",
    trade: "Heating & Gas Safe",
    city: "Stockport, Greater Manchester",
    unreadCount: 0,
    lastMessageTime: "10:42 AM",
    status: "staging_sent",
    messages: [
      {
        id: "m-1",
        sender: "contractor",
        senderName: "Dave Harrison",
        message:
          "Hi mate, saw your trade websites. I'm a Gas Safe heating engineer in Stockport. Need more high-margin boiler install quotes instead of cheap radiator bleeds. How fast can you get a site up?",
        timestamp: "10:40 AM",
      },
      {
        id: "m-2",
        sender: "bot",
        senderName: "Harley AI Dispatch",
        message:
          "Hi Dave! We specialize in Gas Safe heating engineers across Stockport & Manchester. We guarantee full live launch in 14 days with zero writing required from you.",
        timestamp: "10:41 AM",
      },
      {
        id: "m-3",
        sender: "bot",
        senderName: "Harley AI Dispatch",
        message:
          "I've just generated a live interactive staging concept tailored for Cheshire Heat & Boiler Co Ltd including a live Boiler Replacement Calculator and Gas Safe trust badges: https://harleydigitalworks.com/demos?company=Cheshire+Heat+%26+Boiler+Co+Ltd&trade=heating&city=Stockport",
        timestamp: "10:42 AM",
        stagingUrl:
          "https://harleydigitalworks.com/demos?company=Cheshire+Heat+%26+Boiler+Co+Ltd&trade=heating&city=Stockport",
      },
    ],
  },
  {
    id: "th-2",
    contractorName: "Craig Robinson",
    companyName: "Vanguard Electrical & EV",
    phone: "07700 900512",
    trade: "Electrical & Solar",
    city: "Solihull, Birmingham",
    unreadCount: 1,
    lastMessageTime: "09:15 AM",
    status: "qualified",
    messages: [
      {
        id: "m-4",
        sender: "contractor",
        senderName: "Craig Robinson",
        message:
          "Morning, CEF Birmingham recommended you guys. Looking to launch a commercial 3-phase and workplace EV charging site. Can you send pricing?",
        timestamp: "09:15 AM",
      },
    ],
  },
  {
    id: "th-3",
    contractorName: "Liam Walker",
    companyName: "Apex Commercial Facilities Ltd",
    phone: "07700 900894",
    trade: "Commercial Contractors",
    city: "Leeds, West Yorkshire",
    unreadCount: 0,
    lastMessageTime: "Yesterday",
    status: "proposal_pending",
    messages: [
      {
        id: "m-5",
        sender: "contractor",
        senderName: "Liam Walker",
        message:
          "Loved the staging demo. Send over the formal proposal and we'll pay the 50% deposit to lock the build slot.",
        timestamp: "Yesterday, 16:30",
      },
    ],
  },
];

const QUICK_RESPONSE_TEMPLATES = [
  {
    label: "Send 14-Day Delivery Guarantee",
    text: "All our builds operate on a guaranteed 14-day SLA: 50% deposit upfront, 50% on live launch. We write 100% of the copy and configure your Gas Safe / NICEIC accreditations.",
  },
  {
    label: "Send Instant Price Breakdown",
    text: "We offer 2 turnkey models: Launch Plan (£1,495 for sole traders) and Growth Engine (£2,995 for multi-van fleets) with optional £95/mo managed care covering unlimited updates.",
  },
  {
    label: "Generate & Send Live Staging Demo",
    text: "I've created an interactive live staging concept for your business so you can test it on your phone: ",
  },
];

export interface WhatsAppIntakeDeskProps {
  onImportLead?: (lead: {
    name: string;
    company: string;
    phone: string;
    trade: string;
    city: string;
    notes: string;
  }) => void;
}

export function WhatsAppIntakeDesk({ onImportLead }: WhatsAppIntakeDeskProps = {}) {
  const [threads, setThreads] = useState<WhatsAppThread[]>(SAMPLE_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>("th-1");
  const [replyText, setReplyText] = useState("");
  const [isBotActive, setIsBotActive] = useState(true);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "admin",
      senderName: "Jack Miller (Web Producer)",
      message: replyText.trim(),
      timestamp: "Just now",
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? { ...t, messages: [...t.messages, newMsg], lastMessageTime: "Just now" }
          : t,
      ),
    );
    setReplyText("");
    toast.success("Message dispatched to contractor via WhatsApp Business API!");
  };

  const handleApplyTemplate = (tplText: string) => {
    if (tplText.includes("staging concept")) {
      const demoLink = `https://harleydigitalworks.com/demos?company=${encodeURIComponent(activeThread.companyName)}&trade=${activeThread.trade.toLowerCase().includes("heat") ? "heating" : "electrical"}&city=${encodeURIComponent(activeThread.city)}`;
      setReplyText(`${tplText}${demoLink}`);
    } else {
      setReplyText(tplText);
    }
  };

  const handleConvertLead = () => {
    if (onImportLead) {
      onImportLead({
        name: activeThread.contractorName,
        company: activeThread.companyName,
        phone: activeThread.phone,
        trade: activeThread.trade,
        city: activeThread.city,
        notes: `WhatsApp Conversation Log (${activeThread.trade} in ${activeThread.city}).\nLast Message: ${activeThread.messages[activeThread.messages.length - 1]?.message || "N/A"}`,
      });
    }

    setThreads((prev) =>
      prev.map((t) => (t.id === activeThread.id ? { ...t, status: "converted" } : t)),
    );

    toast.success(`Contractor "${activeThread.companyName}" marked as Converted!`, {
      description: "Pushed to Inbound CRM and generated official onboarding token.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-ink">
                  AI WhatsApp & SMS Inbound Intake Desk
                </h3>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  24/7 AUTO-DISPATCH ACTIVE
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Automated qualification, 60-second staging demo generation, and human-in-the-loop
                WhatsApp closing console.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-ink cursor-pointer bg-slate-50 border border-ink/10 px-3 py-2 rounded-xl">
              <input
                type="checkbox"
                checked={isBotActive}
                onChange={(e) => setIsBotActive(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>AI Auto-Responder {isBotActive ? "Enabled" : "Paused"}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Grid: Threads List vs Active Chat Conversation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: WhatsApp Inbound Threads */}
        <div className="lg:col-span-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-ink/10 pb-3 mb-2 px-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
              Active Trade Conversations
            </span>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              {threads.length} Inbound
            </span>
          </div>

          <div className="space-y-1.5 max-h-[550px] overflow-y-auto">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                  activeThreadId === t.id
                    ? "bg-emerald-50/80 border-emerald-300 shadow-xs"
                    : "bg-white border-ink/5 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">{t.contractorName}</span>
                  <span className="text-[10px] font-mono text-ink-muted">{t.lastMessageTime}</span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-800 truncate mt-0.5">
                  {t.companyName}
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-ink-muted">
                  <span>
                    {t.trade} • {t.city.split(",")[0]}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                      t.status === "converted"
                        ? "bg-emerald-100 text-emerald-800"
                        : t.status === "staging_sent"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {t.status.replace(/_/g, " ")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Chat Window & Response Console */}
        <div className="lg:col-span-8 rounded-2xl border border-ink/10 bg-white p-5 shadow-xs flex flex-col justify-between min-h-[550px]">
          <div>
            {/* Top Contractor Strip */}
            <div className="flex items-center justify-between border-b border-ink/10 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {activeThread.contractorName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">{activeThread.contractorName}</div>
                  <div className="text-xs text-ink-muted">
                    {activeThread.companyName} •{" "}
                    <a
                      href={`tel:${activeThread.phone}`}
                      className="hover:underline text-emerald-700 font-mono"
                    >
                      {activeThread.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleConvertLead}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Mark as Converted</span>
                </button>
              </div>
            </div>

            {/* Chat Bubble Feed */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
              {activeThread.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "contractor" ? "items-start" : "items-end"
                  }`}
                >
                  <div className="text-[10px] text-ink-muted mb-1 px-1">
                    {msg.senderName} • {msg.timestamp}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === "contractor"
                        ? "bg-slate-100 text-ink border border-ink/10 rounded-tl-xs"
                        : msg.sender === "bot"
                          ? "bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-tr-xs"
                          : "bg-ink text-white rounded-tr-xs"
                    }`}
                  >
                    <p>{msg.message}</p>
                    {msg.stagingUrl && (
                      <a
                        href={msg.stagingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 underline bg-white/80 px-2 py-1 rounded-md"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Open Staging Preview</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Console: Quick Response Chips & Message Input */}
          <div className="mt-4 pt-4 border-t border-ink/10 space-y-3">
            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5">
              {QUICK_RESPONSE_TEMPLATES.map((tpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyTemplate(tpl.text)}
                  className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-[11px] font-medium text-ink-muted hover:text-ink transition-colors"
                >
                  ⚡ {tpl.label}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${activeThread.contractorName} on WhatsApp...`}
                className="flex-1 rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-xs text-ink placeholder-ink-muted focus:border-emerald-600 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
                <span>Send WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
