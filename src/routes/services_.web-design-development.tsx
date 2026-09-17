import { createFileRoute } from "@tanstack/react-router";
import { CapabilityPage } from "@/components/site/CapabilityPage";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";

export const Route = createFileRoute("/services_/web-design-development")({
  head: () => ({
    meta: [
      { title: "Web Design & Development for Trades | Harley Digital Works" },
      {
        name: "description",
        content:
          "Custom, high-performing websites built and written for UK trades and small businesses. Ready to launch in 14 days with zero technical hassle.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <CapabilityPage
      data={{
        eyebrow: "Done-For-You Web Design",
        title: "Websites that make your business look world-class and win more jobs.",
        intro:
          "We combine commercial sales copywriting, professional trade photography, and high-performance engineering to build websites that turn local searchers into paying clients.",
        problems: [
          "Your current website looks outdated and doesn't reflect your high standard of workmanship.",
          "You don't have the time to write website text, choose templates, or figure out hosting.",
          "You are missing out on profitable local jobs because your site doesn't rank or convert on mobile.",
        ],
        deliverables: [
          "100% done-for-you industry copywriting",
          "High-resolution trade photography curation",
          "Mobile-first design with fast click-to-call & WhatsApp routing",
          "Google Maps & local SEO schema integration",
          "Verified customer reviews and accreditation badge displays",
          "14-day delivery from kickoff call to Google launch",
        ],
        outcomes: [
          "Instant credibility when quoting against competitors",
          "A steady stream of qualified inbound enquiries and phone calls",
          "Zero ongoing technical headaches—we handle all updates and hosting",
        ],
        related: [
          { label: "Explore Care Plans", to: "/services/care-plans" },
          { label: "View trade case studies", to: "/work" },
        ],
      }}
    >
      <WebsitePackagesSection />
    </CapabilityPage>
  );
}
