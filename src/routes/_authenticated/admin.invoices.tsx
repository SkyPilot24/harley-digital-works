import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.index";
import { BillingUnavailable } from "@/components/admin/BillingUnavailable";

export const Route = createFileRoute("/_authenticated/admin/invoices")({
  component: InvoicesAdminPage,
});

function InvoicesAdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" subtitle="Billing connection pending." />
      <BillingUnavailable />
    </div>
  );
}
