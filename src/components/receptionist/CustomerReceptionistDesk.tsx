import { useState } from "react";
import {
  PhoneCall,
  PhoneForwarded,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  Copy,
  ChevronRight,
  Plus,
  Send,
  Building2,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { ReceptionistTenantConfig } from "@/lib/receptionist-tenants";

interface CustomerReceptionistDeskProps {
  tenant: ReceptionistTenantConfig;
}

export function CustomerReceptionistDesk({ tenant }: CustomerReceptionistDeskProps) {
  const [forwardDirectToMobile, setForwardDirectToMobile] = useState(false);
  const [customFaqs, setCustomFaqs] = useState(tenant.faqKnowledge);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [showAddFaq, setShowAddFaq] = useState(false);

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    setCustomFaqs((prev) => [...prev, { question: newQuestion.trim(), answer: newAnswer.trim() }]);
    setNewQuestion("");
    setNewAnswer("");
    setShowAddFaq(false);
    toast.success("Receptionist Knowledge Updated", {
      description: "Your virtual receptionist will now answer this question for callers.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Status Card */}
      <div className="p-6 rounded-2xl bg-[#081B30] text-white space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>RECEPTIONIST ACTIVE 24/7</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white">
              {tenant.businessName} Switchboard
            </h2>
            <p className="text-xs text-slate-300">
              Assigned Phone Number:{" "}
              <span className="font-mono font-bold text-amber-300">{tenant.assignedDid}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${tenant.assignedDid}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#081B30] text-xs font-bold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Test Call Switchboard</span>
            </a>
          </div>
        </div>

        {/* Call Forwarding Toggle */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold flex items-center gap-2 text-white">
              <PhoneForwarded className="w-4 h-4 text-amber-400" />
              <span>Direct Mobile Forwarding Override</span>
            </div>
            <p className="text-[11px] text-slate-300">
              When enabled, incoming calls ring your mobile (
              <span className="font-mono text-amber-300">{tenant.transferPhone}</span>) directly
              instead of being answered by AI.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setForwardDirectToMobile(!forwardDirectToMobile);
              toast.success(
                !forwardDirectToMobile
                  ? "Forwarding Enabled: Calls will ring your mobile directly."
                  : "AI Receptionist Resumed: Answering calls and qualifying leads 24/7.",
              );
            }}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all",
              forwardDirectToMobile
                ? "bg-amber-500 text-[#081B30]"
                : "bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700",
            )}
          >
            {forwardDirectToMobile ? "Forwarding Active" : "Let AI Answer (Recommended)"}
          </button>
        </div>

        {/* Monthly Call Usage Meter */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Monthly Call Allowance: 42 of {tenant.monthlyCallAllowance} calls used</span>
            <span>28% capacity</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: "28%" }} />
          </div>
        </div>
      </div>

      {/* Trade FAQs Knowledge Base */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-[#081B30] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <span>Common Questions & Answers</span>
            </h3>
            <p className="text-xs text-stone-500">
              Tell your AI receptionist how to answer homeowner pricing and availability questions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddFaq(!showAddFaq)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </button>
        </div>

        {showAddFaq && (
          <form
            onSubmit={handleAddFaq}
            className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3"
          >
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Question Callers Ask</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="e.g. Do you install car chargers for domestic homes?"
                className="w-full p-2.5 rounded-lg border border-stone-200 text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#081B30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">How AI Should Answer</label>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={2}
                placeholder="e.g. Yes, we are OZEV approved installers for Zappi and Hypervolt EV chargers across Bristol."
                className="w-full p-2.5 rounded-lg border border-stone-200 text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#081B30]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddFaq(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-stone-600 hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#081B30] text-white hover:bg-slate-800"
              >
                Save Question
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {customFaqs.map((faq, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1"
            >
              <div className="text-xs font-bold text-[#081B30] flex items-start gap-2">
                <span className="text-amber-700 font-mono">Q:</span>
                <span>{faq.question}</span>
              </div>
              <div className="text-xs text-stone-600 flex items-start gap-2 pl-4">
                <span>{faq.answer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
