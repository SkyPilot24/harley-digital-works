import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/resources")({
  component: () => (
    <ResourceManager
      title="Resources (CMS)"
      table="cms_resources"
      orderBy={{ column: "sort_order", ascending: true }}
      emptyHint="Add articles and guides to render on the public /resources page."
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "category", label: "Category" },
        { name: "excerpt", label: "Excerpt", type: "textarea", hideInTable: true },
        { name: "body", label: "Body (markdown)", type: "textarea", hideInTable: true },
        { name: "cover_image_url", label: "Cover image URL", type: "url", hideInTable: true },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  ),
});
