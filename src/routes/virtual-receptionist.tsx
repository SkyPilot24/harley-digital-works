import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { VirtualPhoneCockpit } from "@/components/phone/VirtualPhoneCockpit";
import { Sparkles, PhoneCall, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/virtual-receptionist")({
  head: () => ({
    meta: [
      { title: "24/7 Virtual Phone Receptionist | Harley Digital Works" },
      {
        name: "description",
        content:
          "Experience the Harley Digital Works 24/7 Virtual Voice Phone Receptionist. Captures missed trade calls, answers homeowner pricing enquiries, and dispatches leads to WhatsApp.",
      },
      {
        property: "og:title",
        content: "24/7 Virtual Phone Receptionist | Harley Digital Works",
      },
      {
        property: "og:description",
        content:
          "Never miss a high-ticket trade quote while on tools or driving. Live interactive phone receptionist demonstration by Harley Digital Works.",
      },
    ],
  }),
  component: VirtualReceptionistPage,
});

function VirtualReceptionistPage() {
  return (
    <PageShell>
      <section className="pt-24 pb-16 bg-[#081B30] text-white border-b border-white/10">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              HDW 24/7 VOICE SWITCHBOARD
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              Harley Digital Works Virtual Phone Receptionist
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              When an established trade contractor calls Harley Digital Works, our virtual
              receptionist answers immediately in British English, explains our signature £1,495
              setup + £249/mo care package, and captures their trade and fleet details. Callers
              experience firsthand how this exact 24/7 phone answering engine can be deployed on
              their own trade business.
            </p>
          </div>
        </Container>
      </section>

      {/* Cockpit Section */}
      <section className="py-12 md:py-16 bg-[#F6F3ED]">
        <Container>
          <VirtualPhoneCockpit />
        </Container>
      </section>

      {/* Commercial Value Section */}
      <section className="py-16 bg-white border-t border-stone-200">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
                HOW THIS CONVERTS CLIENTS & GENERATES UPSELLS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081B30] font-display">
                Capture Every Agency Lead. Upsell Every Trade Client.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-stone-200/90 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#081B30]">1. Instant HDW Lead Capture</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Answers every agency inbound call in 2 seconds. Explains our 50/50 payment split
                  (£747.50 deposit), zero homework promise, and strictly capped 2-client capacity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-stone-200/90 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#081B30]">
                  2. The "You Can Have This" Upsell
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Callers experience our AI voice engineering firsthand. When we build their bespoke
                  website, we offer to install this exact 24/7 receptionist on their trade line.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-stone-200/90 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#081B30]">
                  3. 30s WhatsApp Brief to Robbie
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Extracts caller name, trade specialism, van count, and territory, then sends a
                  structured brief straight to Robbie's business mobile (+44 7394 041487).
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#081B30] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-base font-display">
                  Ready to deploy this on your trade website?
                </h4>
                <p className="text-xs text-slate-300">
                  Included in Harley Digital Works bespoke website packages or available as a
                  managed care plan upgrade.
                </p>
              </div>
              <a
                href="https://wa.me/447394041487?text=Hi%20Robbie%2C%20I%20tested%20the%20Virtual%20Phone%20Receptionist%20and%20want%20to%20discuss%20adding%20it%20to%20our%20trade%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#081B30] font-bold text-xs tracking-wide transition-all shadow-md"
              >
                <span>Speak with Robbie Harley</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
