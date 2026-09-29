import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.index";
import { StrategySources } from "@/components/admin/CurrentStrategy";
export const Route = createFileRoute("/_authenticated/admin/knowledge-base")({
  component: () => (
    <div className="space-y-8">
      <PageHeader
        title="Business records"
        subtitle="One governing plan, with decisions and delivery evidence kept in the Business OS."
      />
      <StrategySources />
    </div>
  ),
});
