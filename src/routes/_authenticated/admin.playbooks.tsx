import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.index";
import { DeliveryPlaybook } from "@/components/admin/CurrentStrategy";
export const Route = createFileRoute("/_authenticated/admin/playbooks")({
  component: () => (
    <div className="space-y-8">
      <PageHeader
        title="Delivery playbook"
        subtitle="From qualified enquiry to verified payment, approved launch and ongoing care."
      />
      <DeliveryPlaybook />
    </div>
  ),
});
