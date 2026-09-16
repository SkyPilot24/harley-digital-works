import { z } from "zod";

export const leadInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  websiteUrl: z.string().trim().max(200).optional().or(z.literal("")),
  package: z.string().trim().max(60).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Tell us a little more").max(2000),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export function parseLeadFormData(
  formData: FormData,
  defaults: Partial<Pick<LeadInput, "company" | "package" | "budget" | "timeline">> = {},
) {
  return leadInputSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? defaults.company ?? "",
    websiteUrl: formData.get("websiteUrl") ?? "",
    package: formData.get("package") ?? defaults.package ?? "",
    budget: formData.get("budget") ?? defaults.budget ?? "",
    timeline: formData.get("timeline") ?? defaults.timeline ?? "",
    message: formData.get("message"),
    website: formData.get("website") ?? "",
    startedAt: Number(formData.get("startedAt")),
  });
}
