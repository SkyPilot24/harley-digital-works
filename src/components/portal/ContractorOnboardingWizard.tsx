import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Upload,
  Phone,
  Mail,
  Building,
  MapPin,
  Flame,
  Zap,
  Hammer,
  Clock,
  Send,
  ExternalLink,
  Camera,
  FileCheck
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";

interface OnboardingData {
  trade: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  existingDomain: string;
  accreditations: string[];
  certNumber: string;
  insuranceCover: string;
  primaryCity: string;
  coverageAreas: string;
  starServices: string;
  emergencyCallout: boolean;
  colorScheme: "dark-gold" | "navy-white" | "slate-yellow";
  uploadedFiles: string[];
}

const INITIAL_DATA: OnboardingData = {
  trade: "electrical",
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  existingDomain: "",
  accreditations: ["NICEIC Approved"],
  certNumber: "",
  insuranceCover: "£5M Public Liability",
  primaryCity: "",
  coverageAreas: "",
  starServices: "",
  emergencyCallout: true,
  colorScheme: "dark-gold",
  uploadedFiles: [],
};

const TRADES = [
  { id: "electrical", label: "Electrician & Solar", icon: Zap, defaultCert: "NICEIC Approved" },
  { id: "roofing", label: "Roofing & Flat Roofs", icon: ShieldCheck, defaultCert: "CORC Member" },
  { id: "heating", label: "Gas Safe & Heating", icon: Flame, defaultCert: "Gas Safe Registered" },
  { id: "builder", label: "Builder & Joinery", icon: Hammer, defaultCert: "FMB Master Builder" },
  { id: "commercial", label: "Commercial & FM", icon: Building, defaultCert: "CHAS Accredited" },
];

const ACCREDITATIONS_LIST = [
  "NICEIC Approved Contractor",
  "NAPIT Registered",
  "Gas Safe Registered",
  "CORC Confederation of Roofing",
  "Federation of Master Builders (FMB)",
  "TrustMark Government Endorsed",
  "CHAS Accredited",
  "City & Guilds Qualified",
  "OZEV EV Installer",
  "Vaillant / Worcester Accredited",
];

interface ContractorOnboardingWizardProps {
  initialData?: Partial<OnboardingData>;
}

export function ContractorOnboardingWizard({ initialData }: ContractorOnboardingWizardProps = {}) {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<OnboardingData>(() => ({
    ...INITIAL_DATA,
    ...initialData,
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedToken, setCompletedToken] = useState<string | null>(null);

  const updateField = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAccreditation = (cert: string) => {
    setData((prev) => {
      const exists = prev.accreditations.includes(cert);
      return {
        ...prev,
        accreditations: exists
          ? prev.accreditations.filter((c) => c !== cert)
          : [...prev.accreditations, cert],
      };
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!data.companyName.trim() || !data.contactName.trim() || !data.phone.trim() || !data.email.trim()) {
        toast.error("Please fill in your company name, your name, phone, and email.");
        return;
      }
    }
    if (step === 2) {
      if (!data.primaryCity.trim()) {
        toast.error("Please provide your primary operating city or town.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Create client record
      const token = `tok_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
      const notes = `ONBOARDING INTAKE:
Trade: ${data.trade.toUpperCase()}
Accreditations: ${data.accreditations.join(", ")} (Reg: ${data.certNumber || "N/A"})
Insurance: ${data.insuranceCover}
Primary City: ${data.primaryCity}
Coverage Areas: ${data.coverageAreas}
Star Services: ${data.starServices}
24/7 Callout: ${data.emergencyCallout ? "YES" : "NO"}
Color Theme: ${data.colorScheme}
Existing Domain: ${data.existingDomain || "None provided"}`;

      const { error: clientError } = await supabase.from("clients").insert({
        name: data.companyName,
        contact_name: data.contactName,
        contact_email: data.email,
        contact_phone: data.phone,
        website: data.existingDomain || null,
        status: "active",
        monthly_value_cents: 9500,
        notes: notes,
      });

      if (clientError) console.warn("Could not insert into clients:", clientError);

      // 2. Also register in leads as won/contacted
      await supabase.from("leads").insert({
        name: data.contactName,
        email: data.email,
        company: data.companyName,
        package: "14-Day Launch Plan (£1,495) + £95/mo Care",
        message: notes,
        status: "won",
      });

      setCompletedToken(token);
      toast.success("Onboarding successfully completed!");
    } catch (err: any) {
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedToken) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-neutral-900 text-white p-8 md:p-12 text-center shadow-2xl max-w-2xl mx-auto font-sans">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Onboarding Received for {data.companyName}!
        </h2>
        <p className="mt-3 text-sm text-neutral-300 leading-relaxed max-w-lg mx-auto">
          Our team is now drafting your trade-specific copywriting and configuring your conversion funnels. Your 14-day delivery sprint has officially begun.
        </p>

        <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-left">
          <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">
            Your Private Project Tracker:
          </div>
          <div className="flex items-center justify-between gap-3 text-xs bg-neutral-900 p-3 rounded-xl border border-neutral-800">
            <span className="font-mono text-neutral-300 truncate">https://harleydigitalworks.com/track/{completedToken}</span>
            <Link
              to="/track/$token"
              params={{ token: completedToken }}
              className="font-bold text-gold-400 hover:text-gold-300 shrink-0 inline-flex items-center gap-1"
            >
              Open Tracker <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/441618204910?text=${encodeURIComponent(`Hi Jack, I have just completed the onboarding intake for ${data.companyName}!`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-xs font-bold text-white transition-all shadow-md"
          >
            <Send className="h-4 w-4" />
            <span>WhatsApp Your Web Producer</span>
          </a>
          <Link
            to="/track/$token"
            params={{ token: completedToken }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-6 py-3 text-xs font-semibold text-white transition-all"
          >
            <span>View 14-Day Milestone Timeline</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 text-white shadow-2xl p-6 sm:p-10 max-w-3xl mx-auto font-sans">
      {/* Stepper Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Fast-Track Client Intake (3 Minutes)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {step === 1 && "1. Your Business & Trade Focus"}
            {step === 2 && "2. Locations, Certifications & Services"}
            {step === 3 && "3. Visual Style & Photo Upload"}
            {step === 4 && "4. Review & Launch Sprint Confirmation"}
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-neutral-400">Step {step} of 4</span>
          <div className="flex items-center gap-1.5 mt-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step ? "w-6 bg-gold-400" : s < step ? "w-3 bg-emerald-400" : "w-3 bg-neutral-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Business Info */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Trade Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
                Select Your Trade:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TRADES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        updateField("trade", t.id);
                        if (!data.accreditations.includes(t.defaultCert)) {
                          setData((prev) => ({ ...prev, trade: t.id, accreditations: [t.defaultCert] }));
                        }
                      }}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        data.trade === t.id
                          ? "bg-gold-500 text-neutral-950 border-gold-400 shadow-md font-bold"
                          : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Business & Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Business / Trading Name *
                </label>
                <input
                  type="text"
                  value={data.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g. Apex Electrical & Solar Ltd"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={data.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  placeholder="e.g. Mark Taylor"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Mobile / WhatsApp Number (For Leads) *
                </label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="e.g. 07700 900123"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Contact Email Address *
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="e.g. mark@apexelectrical.co.uk"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Existing Domain or Desired Domain (Optional)
              </label>
              <input
                type="text"
                value={data.existingDomain}
                onChange={(e) => updateField("existingDomain", e.target.value)}
                placeholder="e.g. apexelectricalmcr.co.uk (Leave blank if you want us to register one for you)"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Locations & Accreditations */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Primary Base City / Town *
                </label>
                <input
                  type="text"
                  value={data.primaryCity}
                  onChange={(e) => updateField("primaryCity", e.target.value)}
                  placeholder="e.g. Manchester"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Surrounding Coverage Areas / Postcodes
                </label>
                <input
                  type="text"
                  value={data.coverageAreas}
                  onChange={(e) => updateField("coverageAreas", e.target.value)}
                  placeholder="e.g. Altrincham, Stockport, Wilmslow, SK9, WA14"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Your Star / Highest-Margin Services
              </label>
              <input
                type="text"
                value={data.starServices}
                onChange={(e) => updateField("starServices", e.target.value)}
                placeholder="e.g. EV Chargers, 18th Edition Fuseboards, EICR Landlord Certs, Rewires"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
              />
            </div>

            {/* Accreditations multi-select */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Select Your Accreditations & Badges:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ACCREDITATIONS_LIST.map((cert) => {
                  const active = data.accreditations.includes(cert);
                  return (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => toggleAccreditation(cert)}
                      className={`p-2.5 rounded-xl border text-[11px] font-medium text-left transition-all flex items-center justify-between ${
                        active
                          ? "bg-gold-500/15 border-gold-400 text-gold-300 font-semibold"
                          : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span className="truncate">{cert}</span>
                      {active && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold-400 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Registration / Gas Safe / NICEIC Number (If Applicable)
                </label>
                <input
                  type="text"
                  value={data.certNumber}
                  onChange={(e) => updateField("certNumber", e.target.value)}
                  placeholder="e.g. Reg #648192 or NICEIC #8291"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Public Liability Insurance Limit
                </label>
                <select
                  value={data.insuranceCover}
                  onChange={(e) => updateField("insuranceCover", e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white focus:border-gold-400 focus:outline-none"
                >
                  <option value="£2M Public Liability">£2M Public Liability</option>
                  <option value="£5M Public Liability">£5M Public Liability</option>
                  <option value="£10M Public Liability">£10M Public Liability</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Style & Asset Dropzone */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Color Scheme Picker */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
                Preferred Color Palette:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => updateField("colorScheme", "dark-gold")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    data.colorScheme === "dark-gold"
                      ? "border-gold-400 bg-neutral-950 shadow-md ring-1 ring-gold-400"
                      : "border-neutral-800 bg-neutral-950/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex gap-1.5 mb-2">
                    <span className="h-4 w-4 rounded-full bg-neutral-950 border border-neutral-700" />
                    <span className="h-4 w-4 rounded-full bg-amber-400" />
                  </div>
                  <div className="font-bold text-xs text-white">Dark Luxury & Gold</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">High contrast, modern premium look.</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField("colorScheme", "navy-white")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    data.colorScheme === "navy-white"
                      ? "border-blue-400 bg-neutral-950 shadow-md ring-1 ring-blue-400"
                      : "border-neutral-800 bg-neutral-950/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex gap-1.5 mb-2">
                    <span className="h-4 w-4 rounded-full bg-blue-900" />
                    <span className="h-4 w-4 rounded-full bg-white" />
                  </div>
                  <div className="font-bold text-xs text-white">Classic Navy & White</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Established, corporate contractor style.</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField("colorScheme", "slate-yellow")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    data.colorScheme === "slate-yellow"
                      ? "border-yellow-400 bg-neutral-950 shadow-md ring-1 ring-yellow-400"
                      : "border-neutral-800 bg-neutral-950/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex gap-1.5 mb-2">
                    <span className="h-4 w-4 rounded-full bg-neutral-800" />
                    <span className="h-4 w-4 rounded-full bg-yellow-400" />
                  </div>
                  <div className="font-bold text-xs text-white">High-Vis Yellow & Slate</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Emergency trades & fast conversion.</div>
                </button>
              </div>
            </div>

            {/* Asset Dropzone */}
            <div className="rounded-2xl border-2 border-dashed border-neutral-700 bg-neutral-950 p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800 text-gold-400 mb-3">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-white">Upload Your Logo, Van Photo or Business Card</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1 mb-4">
                Don't have a high-res file? Just snap a clear photo of your van graphics, branded invoice, or business card. We vectorize it for you.
              </p>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 px-5 py-2.5 text-xs font-bold text-neutral-950 transition-all shadow-md">
                <Upload className="h-4 w-4" />
                <span>Select Photos / Documents</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []).map((f) => f.name);
                    setData((prev) => ({ ...prev, uploadedFiles: [...prev.uploadedFiles, ...files] }));
                    toast.success(`${files.length} file(s) queued for project build!`);
                  }}
                />
              </label>

              {data.uploadedFiles.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {data.uploadedFiles.map((fn, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1 text-xs text-emerald-400 border border-neutral-700">
                      <FileCheck className="h-3.5 w-3.5" />
                      <span>{fn}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 4: Summary & Submit */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs text-neutral-400 uppercase font-semibold">Business Name</span>
                <span className="text-sm font-bold text-white">{data.companyName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs text-neutral-400 uppercase font-semibold">Lead Contact</span>
                <span className="text-sm font-bold text-white">{data.contactName} ({data.phone})</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs text-neutral-400 uppercase font-semibold">Primary Region</span>
                <span className="text-sm font-bold text-emerald-400">{data.primaryCity} & Surrounding Postcodes</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs text-neutral-400 uppercase font-semibold">Selected Accreditations</span>
                <span className="text-xs font-semibold text-gold-300">{data.accreditations.join(", ") || "Standard Trade Insurance"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 uppercase font-semibold">Turnaround Commitment</span>
                <span className="text-xs font-bold text-white bg-gold-500/10 text-gold-400 border border-gold-500/20 px-3 py-1 rounded-full">
                  14 Calendar Days Guaranteed
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-neutral-300 leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
              <span>
                <strong>100% Done-For-You Promise:</strong> You do not need to write any copy or configure code. Once submitted, our web producers write all service pages and prepare your live preview within 10 days.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-neutral-800 pt-6 mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-5 py-2.5 text-xs font-semibold text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 px-6 py-2.5 text-xs font-bold text-neutral-950 transition-all shadow-md"
          >
            <span>Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-7 py-3 text-xs font-extrabold text-white transition-all shadow-lg disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isSubmitting ? "Starting Your Sprint…" : "Submit & Start 14-Day Build"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
