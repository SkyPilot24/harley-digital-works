import { ZodError } from "zod";
import { persistPublicLead, type IntakeOptions } from "./lead-intake-service.ts";
import { trustedIntakeIp } from "./lead-intake-result.ts";

export async function handleChatLead(request: Request, options: Omit<IntakeOptions, "ip">) {
  const respond = (status: number, ok: boolean, message: string) =>
    Response.json({ ok, message }, { status });
  try {
    const text = await request.text();
    if (text.length > 10000) return respond(413, false, "Please shorten your enquiry.");
    let body: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(text);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
      body = parsed as Record<string, unknown>;
    } catch {
      return respond(400, false, "Please check your enquiry and try again.");
    }
    const result = await persistPublicLead(
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        package: body.serviceNeeded,
        source: body.brand === "group" ? "group_contact_form" : "contact_form",
        message:
          typeof body.notes === "string" && body.notes.trim()
            ? body.notes
            : "Website consultation requested via chat.",
        enquiryContext: body.trade,
        startedAt: body.startedAt,
        website: body.website,
        turnstileToken: body.turnstileToken,
      },
      { ...options, ip: trustedIntakeIp(request.headers) },
    );
    return respond(
      200,
      result.ok,
      "Your enquiry has been received. We will review it and get back to you.",
    );
  } catch (error) {
    if (error instanceof Response) return respond(error.status, false, await error.text());
    if (error instanceof ZodError)
      return respond(400, false, "Please check your name, email and enquiry, then try again.");
    return respond(
      503,
      false,
      "We could not save your enquiry. Please try again or contact us directly.",
    );
  }
}
