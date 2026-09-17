import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailLayout } from "@/components/site/ServiceDetailLayout";

export const Route = createFileRoute("/services_/care-plans")({
  head: () => ({
    meta: [
      { title: "Website Care Plans & Managed Hosting — Harley Digital Works" },
      {
        name: "description",
        content:
          "Ultra-fast UK cloud hosting, security, daily backups, and unlimited monthly edits via WhatsApp. Total peace of mind for trades and business owners.",
      },
    ],
  }),
  component: () => (
    <ServiceDetailLayout
      eyebrow="Care Plans & Hosting"
      title="We manage your digital presence so you can run your business."
      intro="Ultra-fast UK cloud hosting, daily off-site backups, SSL security, and unlimited text and photo updates every month. Whenever you need a change, just send a message on WhatsApp."
      priceTag="From"
      price="£95 / month"
      deliverables={[
        {
          tag: "Managed Hosting",
          title: "Blazing-fast, green UK cloud hosting with 99.9% uptime and auto-scaling.",
          surface: "sage",
        },
        {
          tag: "Unlimited Edits",
          title: "Monthly text, photo, pricing, and testimonial updates completed within 24 hours.",
          surface: "stone",
        },
        {
          tag: "Security Shields",
          title: "Enterprise SSL certificates, active firewall, and daily automated security scanning.",
          surface: "mist",
        },
        {
          tag: "Daily Backups",
          title: "Automated daily cloud backups stored in secure off-site locations.",
          surface: "cream",
        },
        {
          tag: "WhatsApp Support",
          title: "Direct UK team access via WhatsApp, email, or phone. No ticketing runarounds.",
          surface: "sage",
        },
        {
          tag: "Monthly Digest",
          title: "Plain-English monthly report showing your visitor traffic, uptime, and completed tasks.",
          surface: "stone",
        },
      ]}
      processTitle="How Our Care Plans Work"
      processIntro="Simple, straightforward, and zero contract lock-in. Cancel anytime with 30 days notice."
      process={[
        {
          step: "01",
          title: "Instant Onboarding",
          body: "We set up your fast UK cloud hosting, configure your SSL security, and schedule daily cloud backups.",
        },
        {
          step: "02",
          title: "Zero-Downtime Maintenance",
          body: "We keep all framework files and security dependencies updated every month without interrupting your live site.",
        },
        {
          step: "03",
          title: "Message Us on WhatsApp",
          body: "Need a new project photo added, a price updated, or a new review published? Just send it over and we update it within 24 hours.",
        },
      ]}
    />
  ),
});
