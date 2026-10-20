import {
  AdminValidationError,
  parseDate,
  parseEmail,
  parseText,
  parseWebsite,
} from "./admin-validation.ts";

export type ResourceField = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
};

/** Shared CMS boundary: blanks remain null; invalid numeric input never becomes NaN. */
export function parseResourceInput(fields: ResourceField[], values: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    const raw = values[field.name];
    if (field.type === "checkbox") {
      result[field.name] = raw === true || raw === "on";
      continue;
    }
    const text = parseText(raw, field.label, {
      required: field.required,
      multiline: field.type === "textarea",
      max: field.type === "textarea" ? 100000 : 4000,
    });
    if (field.type === "number" && text !== null) {
      if (
        !/^-?\d+$/.test(text) ||
        !Number.isSafeInteger(Number(text)) ||
        Math.abs(Number(text)) > 2147483647
      )
        throw new AdminValidationError(
          `${field.label} must be a whole number within the supported range`,
        );
      result[field.name] = Number(text);
    } else if (field.type === "email")
      result[field.name] = parseEmail(text, field.label, { required: field.required });
    else if (field.type === "url") result[field.name] = parseWebsite(text, field.label);
    else if (field.type === "date") result[field.name] = parseDate(text, field.label);
    else if (field.type === "select" && text !== null && !field.options?.includes(text))
      throw new AdminValidationError(`${field.label} must be a listed option`);
    else result[field.name] = text;
  }
  return result;
}
