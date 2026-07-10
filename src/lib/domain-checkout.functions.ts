import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { domainPortfolio, getDomainBuyNowPrice } from "@/lib/domain-portfolio";
import { siteConfig } from "@/lib/site-config";

const checkoutInputSchema = z.object({
  domain: z.string().trim().min(1).max(120),
});

export const createDomainCheckout = createServerFn({ method: "POST" })
  .validator((input: unknown) => checkoutInputSchema.parse(input))
  .handler(async ({ data }) => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) throw new Error("Stripe is not configured yet.");

    const domain = domainPortfolio.find((item) => item.name === data.domain);
    const price = getDomainBuyNowPrice(data.domain);

    if (!domain || !price) {
      throw new Error("This domain is enquiry-only.");
    }

    const successUrl =
      process.env.STRIPE_DOMAIN_SUCCESS_URL ||
      `${siteConfig.url}/domains?checkout=success&domain=${encodeURIComponent(domain.name)}`;
    const cancelUrl =
      process.env.STRIPE_DOMAIN_CANCEL_URL ||
      `${siteConfig.url}/domains?checkout=cancelled&domain=${encodeURIComponent(domain.name)}`;

    const body = new URLSearchParams({
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "gbp",
      "line_items[0][price_data][unit_amount]": String(price * 100),
      "line_items[0][price_data][product_data][name]": domain.name,
      "line_items[0][price_data][product_data][description]": `Domain purchase: ${domain.name}. Transfer to be completed after payment verification.`,
      "metadata[domain]": domain.name,
      "metadata[type]": "domain_purchase",
    });

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${secretKey}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error?.message || "Stripe checkout could not be created.");
    }

    return { url: String(result.url) };
  });
