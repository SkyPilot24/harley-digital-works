import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
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
              needs—and what it doesn’t.
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
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <a
                      href={"tel:" + siteConfig.contactPhoneTel}
                      className="font-bold text-sm text-ink hover:text-amber-800 transition-colors"
                    >
                      {siteConfig.contactPhone}
                    </a>
                    <span className="rounded-full bg-amber-100/70 px-2 py-0.5 text-[10px] font-bold text-amber-900">
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
                  <MapPin size={12} className="text-amber-800" />
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
                  className="text-xs font-semibold text-gold-400 hover:underline"
                >
                  {siteConfig.contactPhone}
                </a>
              </div>
            </div>
          </div>
          <div id="contact-form">
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
