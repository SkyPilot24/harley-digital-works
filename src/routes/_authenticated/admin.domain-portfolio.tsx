import { createFileRoute } from "@tanstack/react-router";
import { DomainPortfolio } from "@/components/admin/DomainPortfolio";
export const Route = createFileRoute("/_authenticated/admin/domain-portfolio")({
  component: DomainPortfolio,
});
