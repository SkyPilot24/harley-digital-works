import { useState, useMemo, useEffect } from "react";
import { Calculator, CheckCircle2, PhoneCall, Send, ShieldCheck, Zap, MapPin } from "lucide-react";
import { PillButton } from "@/components/site/PillButton";
import type { TradeDemoBusiness } from "./TradeDemoData";

interface TradeQuoteCalculatorProps {
  business: TradeDemoBusiness;
}

export function TradeQuoteCalculator({ business }: TradeQuoteCalculatorProps) {
  const calc = business.calculator;

  const [selectedJob, setSelectedJob] = useState<string>(calc.jobTypes[0]?.id || "");
  const [selectedSize, setSelectedSize] = useState<string>(calc.propertySizes[0]?.id || "");
  const [selectedUrgency, setSelectedUrgency] = useState<string>(calc.urgencyOptions[0]?.id || "");
  const [postcode, setPostcode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [quoteLocked, setQuoteLocked] = useState<boolean>(false);
  const [postcodeValidation, setPostcodeValidation] = useState<{
    valid: boolean;
    city?: string;
    formattedAddress?: string;
  } | null>(null);

  const activeJob = useMemo(
    () => calc.jobTypes.find((j) => j.id === selectedJob) || calc.jobTypes[0],
    [calc.jobTypes, selectedJob],
  );
  const activeSize = useMemo(
    () => calc.propertySizes.find((s) => s.id === selectedSize) || calc.propertySizes[0],
    [calc.propertySizes, selectedSize],
  );
  const activeUrgency = useMemo(
    () => calc.urgencyOptions.find((u) => u.id === selectedUrgency) || calc.urgencyOptions[0],
    [calc.urgencyOptions, selectedUrgency],
  );

  const priceEstimate = useMemo(() => {
    if (!activeJob || !activeSize || !activeUrgency) return { low: 0, high: 0 };
    const base = activeJob.basePrice * activeSize.multiplier + activeUrgency.surcharge;
    const low = Math.round(base * 0.95);
    const high = Math.round(base * 1.15);
    return { low, high };
  }, [activeJob, activeSize, activeUrgency]);

  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `Hi ${business.name}, I used your instant estimator on your website for ${activeJob?.name} (${activeSize?.name}). Ballpark estimate: £${priceEstimate.low} - £${priceEstimate.high}. My postcode is ${postcode || "local area"}. Can you confirm your availability?`,
    );
    window.open(
      `https://wa.me/44${business.whatsapp.replace(/^0+/, "").replace(/\s+/g, "")}?text=${message}`,
      "_blank",
    );
  };

  useEffect(() => {
    const clean = postcode.trim().toUpperCase();
    if (clean.length < 3) {
      setPostcodeValidation(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/maps/lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "geocode", query: clean }),
        });
        if (res.ok) {
          const body = (await res.json()) as {
            success: boolean;
            data?: { city?: string; formattedAddress: string };
          };
          if (body.success && body.data) {
            setPostcodeValidation({
              valid: true,
              city: body.data.city,
              formattedAddress: body.data.formattedAddress,
            });
          } else {
            setPostcodeValidation(null);
          }
        }
      } catch {
        setPostcodeValidation(null);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [postcode]);

  return (
    <div className="rounded-3xl border border-gold-500/20 bg-neutral-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
            Interactive Customer Feature
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{calc.title}</h3>
        </div>
      </div>
      <p className="text-sm text-neutral-400 mb-6">{calc.subtitle}</p>

      {/* Step 1: Job Type */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
          1. Select Required Work:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {calc.jobTypes.map((job) => {
            const isSelected = selectedJob === job.id;
            return (
              <button
                key={job.id}
                type="button"
                onClick={() => setSelectedJob(job.id)}
                className={`p-3 text-left rounded-xl border transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? "border-gold-500 bg-gold-500/15 text-white shadow-sm ring-1 ring-gold-500/40"
                    : "border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/60"
                }`}
              >
                <div className="font-semibold text-sm text-white mb-1 flex items-center justify-between">
                  {job.name}
                  {isSelected && <Zap className="h-3.5 w-3.5 text-gold-400" />}
                </div>
                <div className="text-[11px] text-neutral-400">{job.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Property Scale / Size */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
          2. Property Type / Scale:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {calc.propertySizes.map((size) => {
            const isSelected = selectedSize === size.id;
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSize(size.id)}
                className={`p-2.5 text-center rounded-xl border text-xs font-medium transition-all ${
                  isSelected
                    ? "border-gold-500 bg-gold-500/20 text-gold-300"
                    : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                {size.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Urgency / Timeframe */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
          3. When do you need this done?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {calc.urgencyOptions.map((urgency) => {
            const isSelected = selectedUrgency === urgency.id;
            return (
              <button
                key={urgency.id}
                type="button"
                onClick={() => setSelectedUrgency(urgency.id)}
                className={`p-2.5 text-center rounded-xl border text-xs font-medium transition-all ${
                  isSelected
                    ? "border-gold-500 bg-gold-500/20 text-gold-300"
                    : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                {urgency.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Output & Lead Capture Box */}
      <div className="rounded-2xl border border-gold-500/40 bg-gradient-to-br from-gold-500/10 via-neutral-950 to-neutral-950 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-500/20 pb-5 mb-5">
          <div>
            <div className="text-xs font-medium text-gold-400 uppercase tracking-wider">
              Estimated Guide Price
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-0.5">
              £{priceEstimate.low.toLocaleString()} – £{priceEstimate.high.toLocaleString()}
              <span className="text-xs font-normal text-neutral-400 ml-2">
                (inc. VAT & fitting guide)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-900/80 border border-neutral-800 px-3 py-2 rounded-xl">
            <ShieldCheck className="h-4 w-4 text-gold-400" />
            <span>Fixed quote guarantee prior to work</span>
          </div>
        </div>

        {quoteLocked ? (
          <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">Estimate Locked & Sent!</div>
            <p className="text-xs text-neutral-300 mt-1">
              One of our certified team will WhatsApp/call you on{" "}
              <strong className="text-white">{phone}</strong> within 15 minutes to confirm booking.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Postcode (e.g. M20 2AB)"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-gold-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Mobile number for quote SMS / WhatsApp"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-gold-500 focus:outline-none"
              />
            </div>

            {postcodeValidation?.valid && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>
                  Covered Area: {postcodeValidation.city || postcodeValidation.formattedAddress}{" "}
                  (Priority Dispatch Radius)
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleWhatsAppQuote}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs py-3 px-4 transition-all shadow-md"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Estimate via WhatsApp (Fastest)</span>
              </button>
              <PillButton
                size="sm"
                onClick={() => {
                  if (!phone) {
                    alert("Please enter a contact number to lock in your estimate.");
                    return;
                  }
                  setQuoteLocked(true);
                }}
                className="py-3"
              >
                <span>Lock In This Quote</span>
              </PillButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
