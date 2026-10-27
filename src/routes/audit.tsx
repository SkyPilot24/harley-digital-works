import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Search,
  MessageSquare,
  ShieldCheck,
  Send,
} from "lucide-react";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { submitLead } from "@/lib/lead-intake.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Request a Free Website Review | Harley Digital Works" },
      {
        name: "description",
        content:
          "Request an honest, manual website review for your UK trade business. We inspect your mobile layout, enquiry flow, and local search signals.",
      },
      {
        property: "og:title",
        content: "Request a Free Website Review | Harley Digital Works",
      },
      {
        property: "og:description",
        content:
          "Request an honest, manual website review for your UK trade business. We inspect your mobile layout, enquiry flow, and local search signals.",
      },
    ],
  }),
  component: FreeWebsiteReviewPage,
});

function FreeWebsiteReviewPage() {
  const submitLeadFn = useServerFn(submitLead);

  const [urlInput, setUrlInput] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [startedAt] = useState(() => Date.now());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!urlInput.trim() || !leadName.trim() || !leadEmail.trim()) {
      toast.error("Please fill in your website, name, and email address.");
      return;
    }

    const cleanUrl = urlInput
      .trim()
      .replace(/^https?:\/\//i, "")
      .replace(/\/+$/, "");

    setSubmitting(true);
    try {
      const messageText = notes.trim()
        ? `Website review requested for ${cleanUrl}. Notes from contractor: ${notes.trim()}`
        : `Website review requested for ${cleanUrl}. Please inspect mobile layout, enquiry flow, and local search presence.`;

      await submitLeadFn({
        data: {
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim() || undefined,
          company: businessName.trim() || cleanUrl,
          websiteUrl: cleanUrl,
          package: "Website Review",
          source: "website_review",
          message: messageText,
          website: honeypot, // Honeypot
          startedAt,
        },
      });

      setSubmitted(true);
      toast.success("Review request submitted! We will be in touch shortly.");
    } catch {
      toast.error("Could not submit your request. Please try again or message us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      {/* Hero Header */}
      <section className="border-b border-ink/10 pt-20 pb-12 md:pt-24 md:pb-16 bg-[#f7f5ef]">
        <Container>
          <TagChip>Honest Website Assessment</TagChip>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.02] tracking-tight text-ink font-bold">
            Request a Free Website Review
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            No automated scorecards or computer-generated checklists. We manually inspect your
            website on a phone and desktop to see how easy it is for local customers to find you,
            trust your business, and get in touch.
          </p>
        </Container>
      </section>

      {/* Main Review Form Section */}
      <section className="py-16 md:py-24 bg-white border-b border-ink/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 md:p-12 text-center">
                  <CheckCircle2 className="mx-auto text-emerald-600" size={48} />
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink md:text-3xl">
                    Review Request Received
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted max-w-lg mx-auto">
                    Thank you, {leadName}. Robbie will take a look at your website ({urlInput}) and
                    prepare honest, practical feedback on your mobile experience and enquiry flow.
                  </p>
                  <p className="mt-4 text-sm text-ink-muted">
                    We will be in touch by email at{" "}
                    <strong className="text-ink">{leadEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-ink/15 bg-white p-6 md:p-10 shadow-sm"
                >
                  <h2 className="text-2xl font-bold tracking-tight text-ink">
                    Tell us about your website
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    We'll review your site and reply with clear, actionable points.
                  </p>

                  <div className="mt-8 space-y-5">
                    {/* Website URL */}
                    <div>
                      <label
                        htmlFor="review-url"
                        className="block text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1.5"
                      >
                        Current Website URL *
                      </label>
                      <input
                        id="review-url"
                        type="text"
                        required
                        placeholder="e.g. www.vance-electrical.co.uk"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
                      />
                    </div>

                    {/* Business Name */}
                    <div>
                      <label
                        htmlFor="review-biz"
                        className="block text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1.5"
                      >
                        Trade / Business Name
                      </label>
                      <input
                        id="review-biz"
                        type="text"
                        placeholder="e.g. Vance Electrical Services"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
                      />
                    </div>

                    {/* Name & Email */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="review-name"
                          className="block text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1.5"
                        >
                          Your Name *
                        </label>
                        <input
                          id="review-name"
                          type="text"
                          required
                          placeholder="e.g. Alex Vance"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="review-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          id="review-email"
                          type="email"
                          required
                          placeholder="e.g. alex@vance-electrical.co.uk"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="review-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1.5"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        id="review-phone"
                        type="tel"
                        placeholder="e.g. 07700 900555"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
                      />
                    </div>

                    {/* Notes / Frustrations */}
                    <div>
                      <label
                        htmlFor="review-notes"
                        className="block text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1.5"
                      >
                        What would you like us to look at? (Optional)
                      </label>
                      <textarea
                        id="review-notes"
                        rows={3}
                        placeholder="e.g. Not getting enquiries on mobile, or want to know if our service list is clear..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10"
                      />
                    </div>

                    {/* Honeypot field */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:opacity-50"
                      >
                        {submitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            Request Free Website Review <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-center text-xs text-ink-muted">
                      No automated sales sequences. Robbie reviews each submission manually.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Explanation & Trust Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-ink/10 bg-[#f7f5ef] p-6 md:p-8">
                <h3 className="text-xl font-bold text-ink">What we check in your review</h3>
                <ul className="mt-5 space-y-4 text-sm text-ink-muted">
                  <li className="flex items-start gap-3">
                    <Smartphone className="mt-0.5 h-5 w-5 text-ink shrink-0" />
                    <div>
                      <strong className="text-ink">Mobile experience:</strong> Can an emergency
                      homeowner or facilities manager tap to call and find your services in 5
                      seconds?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageSquare className="mt-0.5 h-5 w-5 text-ink shrink-0" />
                    <div>
                      <strong className="text-ink">Enquiry capture:</strong> Does your contact desk
                      collect the right job details without frustrating the customer?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Search className="mt-0.5 h-5 w-5 text-ink shrink-0" />
                    <div>
                      <strong className="text-ink">Local clarity:</strong> Does your site clearly
                      state the towns, postcodes, and commercial trade services you actually cover?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-ink shrink-0" />
                    <div>
                      <strong className="text-ink">Accreditation proof:</strong> Are your NICEIC,
                      Gas Safe, or trade body credentials presented clearly to build immediate
                      trust?
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-ink/10 bg-white p-6 md:p-8">
                <h3 className="text-base font-bold text-ink">
                  Looking for complete website management?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  We build and run productised websites for trade contractors (£1,495 setup +
                  £249/mo ongoing care). Everything is written, built, and looked after for you.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reassurance Section */}
      <section className="py-16 md:py-20 bg-[#f7f5ef]">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-ink/10 bg-white p-6">
              <h4 className="text-base font-bold text-ink">Manual review by Robbie</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Every site is inspected manually. We look at real pages, forms, and mobile layouts
                rather than running generic scripts.
              </p>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-white p-6">
              <h4 className="text-base font-bold text-ink">Plain English feedback</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                No jargon or technical abbreviations. Just honest, practical observations about your
                website and how customers interact with it.
              </p>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-white p-6">
              <h4 className="text-base font-bold text-ink">Zero obligation</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Use the feedback however you like. If you want us to handle your website and digital
                care afterwards, we're here to help.
              </p>
            </article>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
