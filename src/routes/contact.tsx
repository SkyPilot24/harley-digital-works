import { Phone, MessageCircle, Mail, MapPin, Clock, Sparkles } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { siteConfig, buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>) => ({
    service: typeof s.service === "string" && s.service.length <= 120 ? s.service : undefined,
    package: typeof s.package === "string" && s.package.length <= 120 ? s.package : undefined,
    domain: typeof s.domain === "string" && s.domain.length <= 253 ? s.domain : undefined,
    websiteUrl:
      typeof s.websiteUrl === "string" && s.websiteUrl.length <= 200 ? s.websiteUrl : undefined,
  }),
  head: () =>
    buildPageSeoHead({
      title: "Let’s plan your website | Harley Digital Works",
      description:
        "Tell us about your trade business. Discuss your website build and ongoing care, with a clear scope and written quote before you commit.",
      path: "/contact",
    }),
  component: ContactPage,
});
function ContactPage() {
  const search = Route.useSearch();
  return (
    <PageShell quiet>
      <div className="studio-home">
        <section className="contact-conversion studio-wrap">
          <div className="contact-intro">
            <p className="studio-kicker">YOUR BUSINESS. YOUR NEXT CHAPTER.</p>
            <h1>
              Good work.
              <br />A better
              <br />
              <span>first impression.</span>
            </h1>
            <p>
              Tell us about the business you’re building. We’ll help you work out what your website
              needs - and what it doesn’t.
            </p>
            <ol className="contact-next">
              <li>
                <span>01</span>
                <div>
                  <strong>Tell us where you are.</strong>
                  <p>New website, tired website or too much to manage.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Talk through a useful plan.</strong>
                  <p>We’ll discuss your services, customers and priorities.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Know the scope and cost upfront.</strong>
                  <p>
                    £1,495 setup (50% deposit / 50% on approval) + £249/mo care. Your written quote
                    confirms scope, delivery timing and any applicable taxes.
                  </p>
                </div>
              </li>
            </ol>
            <div className="mt-8 space-y-3 rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block font-bold">
                Direct Contact Channels
              </span>

              {/* Primary: Telephone */}
              <div className="flex items-start gap-3 pt-1">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#081B30]/5 text-[#081B30] border border-[#081B30]/15">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <a
                      href={"tel:" + siteConfig.contactPhoneTel}
                      className="font-bold text-sm text-ink hover:text-[#173C62] transition-colors"
                    >
                      {siteConfig.contactPhone}
                    </a>
                    <span className="rounded-full bg-[#081B30]/10 px-2 py-0.5 text-[10px] font-bold text-[#081B30]">
                      Primary · Call Us
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Speak directly with our Bristol studio team.
                  </p>
                </div>
              </div>

              {/* Secondary: WhatsApp */}
              <div className="flex items-start gap-3 pt-2 border-t border-ink/10">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm text-emerald-800 hover:text-emerald-900 transition-colors"
                    >
                      {siteConfig.whatsappDisplay}
                    </a>
                    <span className="rounded-full bg-emerald-100/70 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                      WhatsApp Business
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Convenient messaging for quick queries on site.
                  </p>
                </div>
              </div>

              {/* Hours & Location */}
              <div className="pt-2 border-t border-ink/10 flex flex-wrap items-center justify-between text-[11px] text-ink-muted gap-2">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-[#173C62]" />
                  {siteConfig.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} className="text-emerald-700" />
                  {siteConfig.operatingHours}
                </span>
              </div>
            </div>

            <div className="contact-person">
              <img
                src="/images/home/robbie-restored.jpg"
                alt="Robbie Harley"
                width="72"
                height="72"
                loading="lazy"
                decoding="async"
              />
              <div>
                <strong>Robbie Harley</strong>
                <span>Founder, Harley Digital Works</span>
                <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>
                <a
                  href={"tel:" + siteConfig.contactPhoneTel}
                  className="text-xs font-semibold text-[#173C62] hover:underline"
                >
                  {siteConfig.contactPhone}
                </a>
              </div>
            </div>
          </div>
          <div id="contact-form">
            {/* Contextual Opportunity Callout */}
            {search.service?.includes("Health Check") ||
            search.service?.toLowerCase().includes("review") ||
            search.service?.toLowerCase().includes("audit") ? (
              <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50/80 p-5 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-800 text-white rounded-xl shrink-0 font-bold">
                    <Sparkles size={18} className="text-emerald-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono text-[10px] uppercase font-bold">
                      Free Consultation · 100% No Obligation
                    </div>
                    <h3 className="text-sm font-bold text-ink">
                      Request Your Free 15-Minute Website & Visibility Health Check
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Enter your current website URL below. Dr Robbie Harley will personally inspect
                      your mobile loading speed, Google Local Map Pack visibility, and enquiry
                      conversion pathways, and talk you through practical, actionable improvements.
                    </p>
                  </div>
                </div>
              </div>
            ) : search.service?.includes("projection") ||
              search.service?.includes("Calculator") ||
              search.service?.includes("Website Plan Inquiry") ? (
              <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50/80 p-5 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-800 text-white rounded-xl shrink-0 font-bold">
                    <Sparkles size={18} className="text-emerald-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono text-[10px] uppercase font-bold">
                      Revenue Projection Follow-Up
                    </div>
                    <h3 className="text-sm font-bold text-ink">
                      Discuss Your Growth Plan & Job Value Scenarios
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      You’ve modeled how winning extra trade jobs can transform your revenue.
                      Complete the brief below to turn that projection into a clear, fixed-price
                      digital platform with 100% done-for-you copywriting and ongoing care.
                    </p>
                  </div>
                </div>
              </div>
            ) : search.domain ? (
              <div className="mb-6 rounded-2xl border border-blue-300 bg-blue-50/80 p-5 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#081B30] text-white rounded-xl shrink-0 font-bold">
                    <Sparkles size={18} className="text-blue-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-mono text-[10px] uppercase font-bold">
                      Domain Acquisition · {search.domain}
                    </div>
                    <h3 className="text-sm font-bold text-ink">
                      Secure {search.domain} for Your Business
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Available via outright purchase, escrow transfer, or flexible lease-to-own
                      from £79/mo. Submit your enquiry below to confirm availability and transfer
                      arrangements within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            ) : search.service?.includes("Receptionist") ? (
              <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50/80 p-5 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500 text-[#081B30] rounded-xl shrink-0 font-bold">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono text-[10px] uppercase font-bold">
                      24/7 AI Voice Phone Receptionist
                    </div>
                    <h3 className="text-sm font-bold text-ink">
                      Never Miss High-Ticket Emergency Jobs Again
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Tell us your trade and territory below. We'll set up your dedicated British
                      voice persona, emergency escalation rules, and instant WhatsApp lead dispatch
                      with a 30-day rolling agreement.
                    </p>
                  </div>
                </div>
              </div>
            ) : search.service?.includes("Harley Labs") ? (
              <div className="mb-6 rounded-2xl border border-indigo-300 bg-indigo-50/80 p-5 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#081B30] text-white rounded-xl shrink-0 font-bold">
                    <Sparkles size={18} className="text-indigo-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-mono text-[10px] uppercase font-bold">
                      Harley Labs · Systems & R&D Enquiry
                    </div>
                    <h3 className="text-sm font-bold text-ink">
                      Turn Software Architecture Ideas Into Commercial Systems
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Tell us about your automation bottlenecks, platform architecture requirements,
                      or venture collaboration ideas. We'll evaluate technical feasibility and
                      response within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 rounded-2xl border border-[#173C62]/20 bg-[#173C62]/5 p-5 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#081B30] text-white rounded-xl shrink-0 font-bold">
                    <Sparkles size={18} className="text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-ink">
                      Show Us Your Website: We’ll Show You What’s Possible
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Have an existing website that isn’t generating qualified enquiries? Enter your
                      website address below. We’ll review your mobile usability, trust signals, and
                      enquiry pathways, then prepare an illustrative transformation plan.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <EnquiryForm
              interest={
                search.domain
                  ? "Domain enquiry: " + search.domain
                  : search.service || search.package || ""
              }
              websiteUrl={search.websiteUrl}
            />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
