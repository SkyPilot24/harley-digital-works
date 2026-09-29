import { z } from "zod";

export const emailDispatchSchema = z.object({
  recipientEmail: z.string().trim().email().max(255),
  recipientName: z.string().trim().min(1).max(120),
  companyName: z.string().trim().max(120).optional().nullable(),
  subject: z.string().trim().min(3).max(200),
  templateType: z.enum(["proposal", "invoice", "audit", "outreach"]),
  plainTextBody: z.string().trim().min(10).max(20_000),
  htmlContent: z.string().max(50_000).optional().nullable(),
  referenceId: z.string().max(100).optional().nullable(),
});

export type EmailDispatchInput = z.infer<typeof emailDispatchSchema>;

export async function dispatchAuthorizedEmail(
  input: EmailDispatchInput,
  options: {
    authorize: () => Promise<void>;
    enabled: boolean;
    apiKey?: string;
    senderEmail?: string;
    fetch: typeof fetch;
  },
) {
  await options.authorize();
  const data = emailDispatchSchema.parse(input);
  const mailtoUrl = `mailto:${encodeURIComponent(data.recipientEmail)}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.plainTextBody)}`;
  if (!options.enabled || !options.apiKey || !options.senderEmail) {
    return {
      status: "prepared" as const,
      accepted: false,
      delivered: false,
      mailtoUrl,
      message: "Email draft prepared. Nothing has been sent.",
    };
  }
  const response = await options.fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${options.apiKey}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({
      from: `Harley Digital Works <${options.senderEmail}>`,
      to: [data.recipientEmail],
      subject: data.subject,
      text: data.plainTextBody,
      html: data.htmlContent || undefined,
    }),
  });
  // An ambiguous provider failure must not trigger a second automatic send.
  if (!response.ok)
    throw new Error("Email provider did not confirm acceptance. Check before retrying.");
  const receipt = (await response.json()) as { id?: unknown };
  if (typeof receipt.id !== "string" || !receipt.id) {
    throw new Error("Email provider returned no receipt. Check before retrying.");
  }
  return {
    status: "accepted" as const,
    accepted: true,
    delivered: false,
    providerId: receipt.id,
    mailtoUrl,
    message: "Email accepted by the provider. Delivery is not yet confirmed.",
  };
}
