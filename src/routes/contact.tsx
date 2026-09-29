import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { siteConfig } from "@/lib/site-config";
export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>) => ({
    service: typeof s.service === "string" ? s.service : undefined,
    package: typeof s.package === "string" ? s.package : undefined,
    domain: typeof s.domain === "string" ? s.domain : undefined,
    websiteUrl: typeof s.websiteUrl === "string" ? s.websiteUrl : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Let’s plan your website | Harley Digital Works" },
      {
        name: "description",
        content:
          "Tell us about your trade business. Discuss your website build and ongoing care, with a clear scope and written quote before you commit.",
      },
    ],
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
                  <strong>Know the scope and cost.</strong>
                  <p>Your build fee and monthly care, agreed in writing.</p>
                </div>
              </li>
            </ol>
            <div className="contact-person">
              <img
                src="/images/home/robbie-restored.jpg"
                alt="Robbie Harley"
                width="72"
                height="72"
              />
              <div>
                <strong>Robbie Harley</strong>
                <span>Founder, Harley Digital Works</span>
                <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>
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
