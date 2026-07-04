import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailLayout } from "@/components/site/ServiceDetailLayout";

export const Route = createFileRoute("/services/care-plans")({
  head: () => ({
    meta: [
      { title: "Care Plans — THG Digital Agency" },
      {
        name: "description",
        content:
          "Hosting, updates, small changes and monitoring — bundled at one small monthly price. Post-launch peace of mind for small operators.",
      },
    ],
  }),
  component: () => (
    <ServiceDetailLayout
      eyebrow="Care Plans"
      title="Post-launch peace of mind, priced fairly."
      intro="Hosting, updates, small content changes and monitoring — bundled into one small monthly price. Cancel any time."
      priceTag="From"
      price="£95 / month"
      deliverables={[
        { tag: "Hosting", title: "Managed hosting on fast, green infrastructure with daily backups.", surface: "sage" },
        { tag: "Updates", title: "All core, plugin and dependency updates applied monthly, tested before go-live.", surface: "stone" },
        { tag: "Small changes", title: "Up to 60 minutes of content or design edits included every month.", surface: "mist" },
        { tag: "Monitoring", title: "24/7 uptime monitoring with same-day response to any incidents.", surface: "cream" },
        { tag: "Security", title: "SSL, firewall and vulnerability scanning kept current at all times.", surface: "sage" },
        { tag: "Reporting", title: "Monthly digest — traffic, uptime, changes made, anything worth knowing.", surface: "stone" },
      ]}
      processTitle="How it works"
      processIntro="From onboarding to ongoing care — nothing hidden, nothing surprising."
      process={[
        { step: "01", title: "Onboard in 48 hours", body: "We audit your site, set up hosting or migrate you across, and schedule the first backup." },
        { step: "02", title: "Monthly maintenance", body: "Updates applied on a fixed schedule, tested in staging, then rolled out with zero downtime." },
        { step: "03", title: "Small changes on request", body: "Email or Slack us any small edit; we bank the time and roll unused minutes into the next month." },
      ]}
    />
  ),
});
