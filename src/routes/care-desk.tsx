import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { siteConfig } from "@/lib/site-config";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  Camera,
  Pencil,
  Star,
  Zap,
  Users,
  Send,
  Upload,
  CheckCircle2,
  FileCheck,
  CreditCard,
  PhoneCall,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CareBillingPortalDesk } from "@/components/portal/CareBillingPortalDesk";

export const Route = createFileRoute("/care-desk")({
  head: () => ({
    meta: [
      { title: "Client Care Plan Desk & Billing Portal | Harley Digital Works" },
      {
        name: "description",
        content:
          "Fast-track 1-tap website change requests, billing receipts, and 24-hour turnaround support for Harley Digital Works Care Plan clients.",
      },
      {
        property: "og:title",
        content: "Care Plan Desk & Billing Portal | Harley Digital Works",
      },
    ],
  }),
  component: CareDeskPage,
});

const REQUEST_TYPES = [
  {
    id: "photos",
    label: "Upload New Job Photos",
    icon: Camera,
    desc: "Add before/after photos of recently completed work.",
  },
  {
    id: "pricing",
    label: "Update Prices / Text",
    icon: Pencil,
    desc: "Change service prices, phone number or coverage towns.",
  },
  {
    id: "reviews",
    label: "Add New Reviews",
    icon: Star,
    desc: "Post new 5-star Google or Checkatrade testimonials.",
  },
  {
    id: "emergency",
    label: "Toggle Emergency Banner",
    icon: Zap,
    desc: "Turn on/off on-call emergency status alert.",
  },
  {
    id: "team",
    label: "Add Van or Team Member",
    icon: Users,
    desc: "Add new vehicle branding, staff bio or apprentice.",
  },
];

function CareDeskPage() {
  const [activeTab, setActiveTab] = useState<"tickets" | "billing">("tickets");
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [selectedType, setSelectedType] = useState("photos");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !contactName.trim() || !description.trim()) {
      toast.error("Please fill in your company name, your name, and request details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const notes = `[CARE PLAN TICKET - 24H SLA]
Category: ${selectedType.toUpperCase()}
Business: ${businessName}
Contact: ${contactName} (${contactPhone || "WhatsApp"})
Details: ${description}
Files Attached: ${uploadedFiles.join(", ") || "None"}`;

      await supabase.from("leads").insert({
        name: contactName,
        email: "care-plan@harleydigitalworks.com",
        company: businessName,
        package: "Managed Care Plan Ticket",
        message: notes,
        status: "contacted",
      });

      setIsSubmitted(true);
      toast.success("Care Plan update ticket submitted!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to submit request";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      {/* Top Header */}
      <section className="pt-20 pb-8 md:pt-24 md:pb-12 bg-neutral-950 border-b border-neutral-800 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <TagChip tone="dark">Managed Care Desk</TagChip>
              <span className="text-xs text-neutral-400">24-Hour SLA Guaranteed</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              1-Tap Client Care & <br />
              <span className="text-gold-400">Subscription Portal.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto">
              Need website updates deployed or want to manage your recurring £249/mo Managed Care
              Plan and subscription receipts? Everything is self-service below.
            </p>

            {/* Tab Buttons */}
            <div className="mt-8 inline-flex p-1.5 rounded-full bg-neutral-900 border border-neutral-800 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("tickets")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "tickets"
                    ? "bg-gold-500 text-neutral-950 shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>1-Tap Change Requests</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("billing")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "billing"
                    ? "bg-gold-500 text-neutral-950 shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <CreditCard className="h-3.5 w-3.5" />
                <span>Subscription & Billing Receipts</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-20 bg-neutral-950 text-white">
        <Container>
          {activeTab === "billing" ? (
            <CareBillingPortalDesk defaultCompany={businessName || "Cheshire Heat & Power Ltd"} />
          ) : isSubmitted ? (
            <div className="max-w-lg mx-auto rounded-3xl border border-emerald-500/30 bg-neutral-900 p-8 text-center shadow-2xl">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Ticket Received for {businessName}!</h2>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                Your assigned Web Producer is on it. Changes will be deployed live to your website
                within 24 business hours.
              </p>

              <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(`Hi Robbie, I just submitted an update ticket for ${businessName}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md"
                >
                  <Send className="h-4 w-4" />
                  <span>WhatsApp Producer Desk</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setDescription("");
                    setUploadedFiles([]);
                  }}
                  className="rounded-full border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-5 py-2.5 text-xs font-semibold text-white transition-all"
                >
                  Submit Another Update
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-10 shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
                <Sparkles className="h-4 w-4" />
                <span>Submit Website Change Request</span>
              </div>

              {/* Request Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
                  Select Request Category:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {REQUEST_TYPES.map((t) => {
                    const Icon = t.icon;
                    const active = selectedType === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedType(t.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                          active
                            ? "bg-gold-500 text-neutral-950 border-gold-400 shadow-md font-bold"
                            : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold">{t.label}</div>
                          <div
                            className={`text-[11px] mt-0.5 ${active ? "text-neutral-900 font-normal" : "text-neutral-500"}`}
                          >
                            {t.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Business Name & Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Your Business Name *
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Electrical & Solar Ltd"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Mark Taylor"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Mobile / WhatsApp Number (For Confirmation)
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. 07700 900123"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  What changes would you like us to make? *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your update in plain English. e.g. 'Please change our emergency callout price to £95, and add Altrincham to our coverage list.'"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none leading-relaxed"
                  required
                />
              </div>

              {/* Asset Upload */}
              <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-950 p-5 text-center">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 px-4 py-2 text-xs font-semibold text-white transition-all">
                  <Upload className="h-4 w-4 text-gold-400" />
                  <span>Attach Photos or Invoices (Optional)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []).map((f) => f.name);
                      setUploadedFiles((prev) => [...prev, ...files]);
                      toast.success(`${files.length} file(s) attached to ticket!`);
                    }}
                  />
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {uploadedFiles.map((fn, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1 text-xs text-emerald-400 border border-neutral-700"
                      >
                        <FileCheck className="h-3.5 w-3.5" />
                        <span>{fn}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>Guaranteed within 24 business hours</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 px-7 py-3 text-xs font-bold text-neutral-950 transition-all shadow-md disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Dispatching Ticket…" : "Submit Update Ticket"}</span>
                </button>
              </div>
            </form>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
