import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/services")({
  component: () => (
    <ResourceManager
      title="Services (CMS)"
      table="cms_services"
      orderBy={{ column: "sort_order", ascending: true }}
      emptyHint="Add service packages to render on the public /services page."
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", required: true, placeholder: "care-plans" },
        { name: "tagline", label: "Tagline" },
        { name: "price_label", label: "Price label", placeholder: "From £399/mo" },
        { name: "description", label: "Description", type: "textarea", hideInTable: true },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  ),
});
