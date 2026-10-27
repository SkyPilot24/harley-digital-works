import { z } from "zod";
import { outreachComplianceConfig, validateOutreachBodyHasFooter } from "./site-config.ts";

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
    senderName?: string;
    replyToEmail?: string;
    fetch: typeof fetch;
  },
) {
  await options.authorize();
  const data = emailDispatchSchema.parse(input);

  if (data.templateType === "outreach") {
    if (!validateOutreachBodyHasFooter(data.plainTextBody)) {
      throw new Error(
        "Outreach email body must contain a compliant sender-identity footer (trading name, contact address placeholder, 'reply STOP and I won't contact you again', and privacy link).",
      );
    }
  }

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
  const fromName = options.senderName || "Robbie Harley";
  const replyTo = options.replyToEmail || options.senderEmail;

  const emailHeaders: Record<string, string> = {};
  if (data.templateType === "outreach") {
    emailHeaders["List-Unsubscribe"] =
      `<mailto:${outreachComplianceConfig.unsubscribeEmail}?subject=unsubscribe>`;
  }

  const response = await options.fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${options.apiKey}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({
      from: `${fromName} <${options.senderEmail}>`,
      to: [data.recipientEmail],
      reply_to: replyTo,
      subject: data.subject,
      text: data.plainTextBody,
      html: data.htmlContent || undefined,
      headers: Object.keys(emailHeaders).length > 0 ? emailHeaders : undefined,
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
