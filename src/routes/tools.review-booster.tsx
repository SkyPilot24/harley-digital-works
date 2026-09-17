import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import {
  Star,
  Sparkles,
  Send,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/tools/review-booster")({
  head: () => ({
    meta: [
      { title: "5-Star Google Review Booster for Trade Contractors | Harley Digital Works" },
      {
        name: "description",
        content:
          "Generate more 5-star Google Reviews on autopilot for your trade business. Routes happy homeowners to Google with 1 tap and intercepts negative feedback privately.",
      },
      { property: "og:title", content: "Trade Google Review Booster | Harley Digital Works" },
    ],
  }),
  component: ReviewBoosterPage,
});

function ReviewBoosterPage() {
  const [businessName, setBusinessName] = useState("Apex Electrical Contractors");
  const [googlePlaceUrl, setGooglePlaceUrl] = useState("https://g.page/r/your-google-review-link/review");
  const [customerName, setCustomerName] = useState("John");
  const [customerPhone, setCustomerPhone] = useState("07700 900123");
  const [copiedText, setCopiedText] = useState(false);

  // Interactive Live Simulator State
  const [simulatedRating, setSimulatedRating] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const generatedSmsText = `Hi ${customerName || "there"}, thanks for choosing ${businessName} today! If you have 30 seconds, could you leave us a quick rating on our service? It really helps our local business:
https://harleydigitalworks.com/tools/review-booster?biz=${encodeURIComponent(businessName)}`;

  const handleCopySms = () => {
    navigator.clipboard.writeText(generatedSmsText);
    setCopiedText(true);
    toast.success("Review SMS message copied to clipboard!");
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <PageShell>
      {/* Top Hero */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-12 bg-neutral-950 border-b border-neutral-800 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <TagChip tone="dark">Trade Growth Accelerator</TagChip>
              <span className="text-xs text-neutral-400">Included in All Care Plans</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              5-Star Google Review Booster <br />
              <span className="text-gold-400">& Reputation Shield.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto">
              Text your homeowner right after packing your tools on site. Happy customers get routed straight to your Google Review page in 1 tap, while unhappy feedback is intercepted privately.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Dual-Column Workshop */}
      <section className="py-12 md:py-20 bg-neutral-950 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Generator Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider mb-4">
                  <Sparkles className="h-4 w-4" />
                  <span>1. Setup Your Post-Job Review Dispatch</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Your Trade Business Name:
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Electrical & Solar Ltd"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Your Google Business Review Link:
                    </label>
                    <input
                      type="text"
                      value={googlePlaceUrl}
                      onChange={(e) => setGooglePlaceUrl(e.target.value)}
                      placeholder="https://g.page/r/your-id/review"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Homeowner Name:
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Sarah"
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Homeowner Mobile:
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 07700 900123"
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Generated Message Output */}
                <div className="mt-6 pt-6 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Ready-to-Send SMS / WhatsApp Text:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySms}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-lg"
                    >
                      {copiedText ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedText ? "Copied!" : "Copy Text"}</span>
                    </button>
                  </div>

                  <pre className="whitespace-pre-wrap font-sans text-xs text-neutral-300 leading-relaxed bg-neutral-950 p-4 rounded-xl border border-neutral-800 max-h-36 overflow-y-auto">
                    {generatedSmsText}
                  </pre>

                  <div className="mt-4 flex gap-2">
                    <a
                      href={`https://wa.me/44${customerPhone.replace(/^0+/, "").replace(/\s+/g, "")}?text=${encodeURIComponent(generatedSmsText)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3 text-xs text-neutral-400">
                <div className="flex items-start gap-2.5 text-neutral-300 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Smart Reputation Shield: 1-3 star ratings are caught privately before harming your Google Map Pack ranking.</span>
                </div>
                <div className="flex items-start gap-2.5 text-neutral-300 font-semibold">
                  <Star className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>10x More Reviews: Eliminates friction by bringing the homeowner directly to the Google comment modal.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Mobile Homeowner Experience Simulator */}
            <div className="lg:col-span-6">
              <div className="max-w-sm mx-auto rounded-[40px] border-4 border-neutral-700 bg-neutral-950 p-6 shadow-2xl relative overflow-hidden">
                {/* Mobile Screen Header */}
                <div className="text-center pb-6 border-b border-neutral-800">
                  <div className="h-1.5 w-16 rounded-full bg-neutral-800 mx-auto mb-4" />
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 text-gold-400 font-bold mb-2">
                    ⭐
                  </div>
                  <h3 className="font-bold text-base text-white">{businessName}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">How was your service today?</p>
                </div>

                {/* Rating Interactive Selection */}
                <div className="py-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setSimulatedRating(star);
                          setFeedbackSent(false);
                        }}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            simulatedRating && star <= simulatedRating
                              ? "fill-gold-400 text-gold-400"
                              : "text-neutral-700 hover:text-gold-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-semibold text-neutral-400">
                    {simulatedRating === 5 && "🤩 Outstanding — 5 Out of 5!"}
                    {simulatedRating === 4 && "😊 Very Good — 4 Out of 5"}
                    {simulatedRating === 3 && "😐 Average — Could be better"}
                    {simulatedRating && simulatedRating <= 2 && "😞 Disappointed"}
                    {!simulatedRating && "Tap a star above to rate"}
                  </div>
                </div>

                {/* Branch 1: 4 or 5 Stars -> Google Redirect */}
                {simulatedRating && simulatedRating >= 4 && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-3 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Thank You So Much!</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Would you mind taking 15 seconds to copy your review to our official Google page? It helps local homeowners find us!
                    </p>
                    <a
                      href={googlePlaceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2.5 text-xs font-extrabold text-neutral-950 transition-all shadow-md"
                    >
                      <span>Post on Google Reviews</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}

                {/* Branch 2: 1 to 3 Stars -> Private Feedback Shield */}
                {simulatedRating && simulatedRating <= 3 && (
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-center space-y-3 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span>We Value Your Honesty</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      We are sorry your experience wasn't 100% perfect. Please tell our owner directly so we can resolve this today.
                    </p>

                    {feedbackSent ? (
                      <div className="p-3 bg-neutral-900 rounded-xl text-xs text-emerald-400 font-semibold">
                        ✓ Your private note has been forwarded to management.
                      </div>
                    ) : (
                      <div className="space-y-2 text-left">
                        <textarea
                          rows={3}
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="What could we have done better?"
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFeedbackSent(true);
                            toast.success("Private feedback sent to owner.");
                          }}
                          className="w-full rounded-xl bg-neutral-800 hover:bg-neutral-700 px-4 py-2 text-xs font-semibold text-white transition-all"
                        >
                          Submit Private Note
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
