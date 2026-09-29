import { createFileRoute, notFound } from "@tanstack/react-router";
import { TRADE_VERTICALS } from "@/lib/trade-data";
import { TradeServiceLanding } from "@/components/site/TradeServiceLanding";
export const Route = createFileRoute("/trades_/$slug")({
  loader: ({ params }) => {
    const trade = TRADE_VERTICALS[params.slug];
    if (!trade) throw notFound();
    return trade;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: "Websites for " + (loaderData?.name || "UK trades") + " | Harley Digital Works" },
      {
        name: "description",
        content:
          "Website design, clear copy and ongoing monthly care for " +
          (loaderData?.name || "trade businesses") +
          ". Scope and costs agreed before you commit.",
      },
    ],
  }),
  component: Page,
});
function Page() {
  const trade = Route.useLoaderData();
  return <TradeServiceLanding name={trade.name} topics={trade.targetEnquiries} />;
}
