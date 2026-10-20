import { createFileRoute, notFound } from "@tanstack/react-router";
import { DomainPortfolio } from "@/components/admin/DomainPortfolio";
export const Route = createFileRoute("/domain-portfolio-preview")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex,nofollow" }] }),
  component: () => <DomainPortfolio localPreview />,
});
