import { createFileRoute, notFound } from "@tanstack/react-router";
import { TRADE_VERTICALS } from "@/lib/trade-data";
import { TradeServiceLanding } from "@/components/site/TradeServiceLanding";
import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/trades_/$slug")({
  loader: ({ params }) => {
    const trade = TRADE_VERTICALS[params.slug];
    if (!trade) throw notFound();
    return trade;
  },
  head: ({ loaderData, params }) =>
    buildPageSeoHead({
      title:
        loaderData?.metaTitle ||
        `Websites for ${loaderData?.name || "UK trades"} | Harley Digital Works`,
      description:
        loaderData?.metaDescription ||
        `Website design, clear copy and ongoing monthly care for ${loaderData?.name || "trade businesses"}. Scope and costs agreed before you commit.`,
      path: `/trades/${params.slug}`,
    }),
  component: Page,
});

function Page() {
  const trade = Route.useLoaderData();
  return <TradeServiceLanding name={trade.name} tradeInfo={trade} topics={trade.targetEnquiries} />;
}
