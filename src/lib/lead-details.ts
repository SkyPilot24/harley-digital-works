import type { LeadInput } from "./lead-schema.ts";

export function formatLeadMessage(data: LeadInput) {
  const details = [
    data.source === "website_review" ? "Lead Source: website_review" : null,
    data.enquiryContext ? `Enquiry interest: ${data.enquiryContext}` : null,
    data.phone ? `Phone: ${data.phone}` : null,
    data.websiteUrl ? `Current Website: ${data.websiteUrl}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
  ].filter(Boolean);
  return details.length
    ? `${data.message}\n\n---\nQualification Context:\n${details.join("\n")}`
    : data.message;
}

export function buildLeadMailto(data: LeadInput, recipient: string) {
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : "",
    data.package ? `Interested in: ${data.package}` : "",
    `Source: ${data.source || "contact_form"}`,
    formatLeadMessage(data),
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${recipient}?subject=${encodeURIComponent(`Website enquiry from ${data.name}`)}&body=${encodeURIComponent(body)}`;
}

export const enquiryInterests = [
  "Managed Trade Website (£1,495)",
  "Website Care Plan & Hosting (£249/mo)",
  "Redesign My Existing Website",
  "Free Website Health Check Consultation",
  "Domain purchase / enquiry",
  "Something else",
] as const;

export function resolveEnquiryInterest(search: {
  package?: string;
  service?: string;
  domain?: string;
}) {
  if (search.domain) return "Domain purchase / enquiry";
  const value = search.package || search.service || "";
  if (enquiryInterests.some((interest) => interest === value)) return value;
  if (/^pro\b/i.test(value)) return "Managed Trade Website (£1,495)";
  if (/^growth\b/i.test(value)) return "Managed Trade Website (£1,495)";
  if (/^launch\b/i.test(value)) return "Managed Trade Website (£1,495)";
  if (/care|hosting/i.test(value)) return "Website Care Plan & Hosting (£249/mo)";
  if (/audit|health|consultation|review/i.test(value))
    return "Free Website Health Check Consultation";
  return value ? "Something else" : "";
}

export async function notifyWithoutFailingReceipt(
  notify: () => Promise<void>,
  onFailure: () => void,
) {
  try {
    await notify();
    return true;
  } catch {
    onFailure();
    return false;
  }
}
