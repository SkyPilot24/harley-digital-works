import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.index";
import { CurrentStrategy } from "@/components/admin/CurrentStrategy";
export const Route = createFileRoute("/_authenticated/admin/revenue-os")({
  component: () => (
    <div className="space-y-8">
      <PageHeader
        title="Business strategy"
        subtitle="The current Managed website and monthly care offer."
      />
      <CurrentStrategy />
    </div>
  ),
});
