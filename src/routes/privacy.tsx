import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { siteConfig } from "@/lib/site-config";
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Harley Digital Works" },
      {
        name: "description",
        content:
          "How Harley Digital Works handles personal information submitted through this website.",
      },
    ],
  }),
  component: Page,
});
const sections = [
  [
    "Information we collect",
    "When you contact us, we may collect your name, email address, organisation, project interest and the information you include in your message. For abuse prevention, the form also processes a short-lived HMAC fingerprint derived from the request network address; the raw address is not stored in the lead record.",
  ],
  [
    "How we use it",
    "We use this information to respond to enquiries, assess potential projects, deliver requested services, maintain records and protect the website. We do not sell personal information.",
  ],
  [
    "Processors and sharing",
    "Information may be processed by service providers that support hosting, forms, databases, communications and security. We share only what is reasonably necessary for those services or where law requires it.",
  ],
  [
    "Retention",
    "We keep enquiry and client information only for as long as it is reasonably needed for the purpose collected, legitimate record-keeping and legal obligations. Form-abuse attempt fingerprints are deleted after 24 hours during normal submission processing.",
  ],
  [
    "Your rights",
    "Depending on applicable law, you may ask to access, correct, delete or restrict use of your personal information, or object to certain processing. Contact us to make a request.",
  ],
  [
    "Cookies and analytics",
    "The website may use essential storage and privacy-conscious analytics. If optional tracking is introduced, this notice and any required consent controls should be updated before use.",
  ],
  [
    "Contact",
    "Questions or privacy requests can be sent to " +
      siteConfig.contactEmail +
      ". We may need to verify your identity before completing a request.",
  ],
];
function Page() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <p className="eyebrow">Privacy</p>
          <h1 className="mt-6 text-[clamp(3rem,7vw,6rem)] tracking-[-.05em]">Privacy policy</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Last reviewed: 1 August 2026. This page explains in plain English how information
            submitted through this website is handled.
          </p>
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          <div className="max-w-3xl">
            {sections.map(([title, text]) => (
              <section key={title} className="border-t border-ink/15 py-8">
                <h2 className="text-2xl">{title}</h2>
                <p className="mt-4 leading-relaxed text-ink-muted">{text}</p>
              </section>
            ))}
            <p className="mt-8 rounded-2xl bg-surface-stone p-5 text-sm text-ink-muted">
              This policy is a practical website notice and should be reviewed against final
              business details, processors and legal requirements before relying on it as legal
              advice.
            </p>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
