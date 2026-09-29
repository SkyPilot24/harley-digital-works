import { createFileRoute, notFound } from "@tanstack/react-router";
import { UK_LOCATIONS } from "@/lib/location-data";
import { TradeServiceLanding } from "@/components/site/TradeServiceLanding";
export const Route = createFileRoute("/locations_/$slug")({
  loader: ({ params }) => {
    const location = UK_LOCATIONS[params.slug];
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          "Websites for trades in " +
          (loaderData?.cityName || "the UK") +
          " | Harley Digital Works",
      },
      {
        name: "description",
        content:
          "Website design and ongoing digital care for trade businesses in " +
          (loaderData?.cityName || "the UK") +
          ". Discuss an initial build and monthly service.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Page,
});
function Page() {
  const location = Route.useLoaderData();
  return <TradeServiceLanding name={location.cityName} location />;
}
