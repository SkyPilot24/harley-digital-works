import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { StatusBadge } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/projects")({
  component: () => (
    <ResourceManager
      title="Projects"
      table="projects"
      orderBy={{ column: "created_at", ascending: false }}
      fields={[
        { name: "name", label: "Project name", required: true },
        { name: "summary", label: "Summary", type: "textarea", hideInTable: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["discovery", "in_progress", "review", "launched", "on_hold", "archived"],
          render: (v) => <StatusBadge status={v} />,
        },
        { name: "budget_cents", label: "Budget (cents)", type: "number", hideInTable: true },
        { name: "start_date", label: "Start date", type: "date" },
        { name: "target_date", label: "Target date", type: "date" },
      ]}
    />
  ),
});
