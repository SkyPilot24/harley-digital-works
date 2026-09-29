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
    "Data controller & trading identity",
    "Harley Digital Works operates as a digital service brand under The Harley Group. Personal information submitted via this website is controlled by The Harley Group for the purpose of communicating about website design, digital care, and related business services.",
  ],
  [
    "Information we collect",
    "When you submit an enquiry form, we collect your name, email address, phone number, organisation/trade, geographic location, and message details. For abuse prevention and rate limiting, form submissions generate a temporary, hashed fingerprint derived from your network connection; raw IP addresses are not stored in database records.",
  ],
  [
    "How we use your information",
    "We use your information solely to respond to your enquiries, evaluate project fit, deliver agreed website build or care services, issue requested quotes, and maintain legitimate business records. We never sell, rent, or trade your personal data to third parties.",
  ],
  [
    "Subprocessors & infrastructure",
    "Data processed through this website is stored and transmitted using established cloud providers: Cloudflare (hosting, SSL, edge security), Supabase (database & CRM persistence), Resend (transactional notification email dispatch), and Slack (internal operational alerts). Each provider processes data under strict security and privacy standards.",
  ],
  [
    "Retention & data security",
    "Enquiry records and client project information are retained only for as long as necessary to fulfil service agreements, maintain accounting records, or comply with legal requirements. Temporary abuse prevention tokens expire and are purged within 24 hours.",
  ],
  [
    "Your rights under UK GDPR",
    "Under UK GDPR, you have the right to request access to, correction of, or deletion of your personal data, as well as the right to object to or restrict processing. To exercise any of these rights, please contact us directly.",
  ],
  [
    "Cookies & local storage",
    "This website uses essential session storage and functional cookies required for form submission and site navigation. We do not place third-party advertising tracking cookies.",
  ],
  [
    "Contact for privacy enquiries",
    "Questions regarding this policy or data protection requests should be sent to " +
      siteConfig.contactEmail +
      ". We aim to respond to all valid requests within 5 business days.",
  ],
];

function Page() {
  return (
    <PageShell>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <p className="eyebrow">Privacy & Data Protection</p>
          <h1 className="mt-6 text-[clamp(3rem,7vw,6rem)] tracking-[-.05em]">Privacy policy</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Last updated: 28 September 2026. This notice outlines how Harley Digital Works and The Harley Group collect, use, and protect your information.
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
              Harley Digital Works · The Harley Group. Operating in compliance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
            </p>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
