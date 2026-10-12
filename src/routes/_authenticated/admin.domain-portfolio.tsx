import { createFileRoute, notFound } from "@tanstack/react-router";
import { DomainPortfolio } from "@/components/admin/DomainPortfolio";
export const Route = createFileRoute("/_authenticated/admin/domain-portfolio")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: DomainPortfolio,
});
