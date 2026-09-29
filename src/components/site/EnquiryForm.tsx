import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/lead-intake.functions";
import { parseLeadFormData } from "@/lib/lead-schema";
import { buildLeadMailto } from "@/lib/lead-details";
import { leadCaptureConfigured, siteConfig } from "@/lib/site-config";

export function EnquiryForm({
  source = "contact_form",
  interest = "",
  websiteUrl = "",
}: {
  source?: "contact_form" | "group_contact_form";
  interest?: string;
  websiteUrl?: string;
}) {
  const send = useServerFn(submitLead);
  const [startedAt] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const result = parseLeadFormData(new FormData(event.currentTarget));
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Please check the form.");
      return;
    }
    if (!leadCaptureConfigured) {
      const link = buildLeadMailto(result.data, siteConfig.contactEmail);
      setDraft(link);
      window.location.href = link;
      return;
    }
    setBusy(true);
    try {
      await send({ data: result.data });
      setSent(true);
    } catch {
      setError(
        "Your enquiry could not be sent. Your details are still here. Please try again or email us directly.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (sent)
    return (
      <div className="enquiry-success" role="status">
        <span className="studio-kicker">ENQUIRY RECEIVED</span>
        <h2>Thank you. Let’s take it from here.</h2>
        <p>
          We’ll review your details and reply by email to discuss the next step. You haven’t
          committed to a project or payment.
        </p>
      </div>
    );
  return (
    <form className="enquiry-form" onSubmit={submit} aria-label="Website project enquiry">
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="package" value={interest.slice(0, 60)} />
      <div className="enquiry-honeypot" aria-hidden="true">
        <label htmlFor={source + "-trap"}>Leave empty</label>
        <input id={source + "-trap"} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <p className="studio-kicker">TELL US A LITTLE ABOUT YOUR BUSINESS</p>
        <h2>Start with a conversation.</h2>
        <p className="enquiry-form-intro">
          No need for a finished brief. A few details will help us point you in the right direction.
        </p>
      </div>
      <div className="enquiry-field-grid">
        <label>
          Your name <span>*</span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Email address <span>*</span>
          <input name="email" type="email" autoComplete="email" required maxLength={255} />
        </label>
      </div>
      <div className="enquiry-field-grid">
        <label>
          Business name <small>(optional)</small>
          <input name="company" autoComplete="organization" maxLength={120} />
        </label>
        <label>
          Phone <small>(optional)</small>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
      </div>
      <label>
        Current website <small>(optional)</small>
        <input
          name="websiteUrl"
          autoComplete="url"
          defaultValue={websiteUrl}
          placeholder="Your website address, if you have one"
          maxLength={200}
        />
      </label>
      <label>
        What would you like help with? <span>*</span>
        <textarea
          name="message"
          rows={4}
          required
          minLength={5}
          maxLength={2000}
          placeholder="Your trade, where you work, and what you’d like your website to do better."
          defaultValue={interest ? "I would like to discuss " + interest + "." : ""}
        />
      </label>
      {!leadCaptureConfigured && (
        <p className="enquiry-notice">
          This form prepares an email in your email app. You’ll need to press send there. Prefer to
          write directly?{" "}
          <a href={"mailto:" + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>
        </p>
      )}
      {error && (
        <p role="alert" className="enquiry-error">
          {error}
        </p>
      )}
      {draft && (
        <p role="status" className="enquiry-notice">
          Your email draft is ready, but has not been sent by this website.{" "}
          <a href={draft}>Open the draft again</a>, or email {siteConfig.contactEmail} directly.
        </p>
      )}
      <button className="enquiry-submit" type="submit" disabled={busy}>
        {busy
          ? "Sending…"
          : leadCaptureConfigured
            ? "Send my enquiry ↗"
            : "Prepare my enquiry email ↗"}
      </button>
      <p className="enquiry-privacy">
        We use your details to respond to this enquiry. <a href="/privacy">Privacy policy</a>. No
        payment or commitment at this stage.
      </p>
    </form>
  );
}
