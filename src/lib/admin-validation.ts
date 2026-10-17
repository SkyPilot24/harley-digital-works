import type { Database } from "../integrations/supabase/types";

type Enums = Database["public"]["Enums"];
export type LeadStatus = Enums["lead_status"];
export type ClientStatus = Enums["client_status"];
export type ProjectStatus = Enums["project_status"];

export const leadStatuses: readonly LeadStatus[] = ["new", "contacted", "qualified", "won", "lost"];
export const clientStatuses: readonly ClientStatus[] = ["lead", "active", "paused", "archived"];
export const projectStatuses: readonly ProjectStatus[] = [
  "discovery",
  "in_progress",
  "review",
  "launched",
  "on_hold",
  "archived",
];

/** Postgres `integer` ceiling; money is stored as whole pence. */
export const MAX_CENTS = 2_147_483_647;
const SHORT = 200;
const LONG = 4000;

/** A message that is always safe to show to the operator. */
export class AdminValidationError extends Error {
  field?: string;
  constructor(message: string, field?: string) {
    super(message);
    this.name = "AdminValidationError";
    this.field = field;
  }
}

// Deliberately matches control characters in order to reject them.
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

function asString(raw: unknown): string {
  if (raw === null || raw === undefined) return "";
  if (typeof raw !== "string") throw new AdminValidationError("Unexpected value type");
  return raw;
}

/** Trims, normalises line endings and rejects control characters. Blank becomes null. */
export function parseText(
  raw: unknown,
  label: string,
  options: { required?: boolean; max?: number; multiline?: boolean } = {},
): string | null {
  const max = options.max ?? (options.multiline ? LONG : SHORT);
  let value = asString(raw).replace(/\r\n?/g, "\n").trim();
  if (!options.multiline) value = value.replace(/\s+/g, " ");
  if (!value) {
    if (options.required) throw new AdminValidationError(`${label} is required`, label);
    return null;
  }
  if (CONTROL.test(value)) throw new AdminValidationError(`${label} contains invalid characters`);
  if (value.length > max)
    throw new AdminValidationError(`${label} must be ${max} characters or fewer`);
  return value;
}

const emailPattern =
  /^[^\s@<>()[\]\\,;:"]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

export function parseEmail(
  raw: unknown,
  label: string,
  options: { required?: boolean } = {},
): string | null {
  const value = parseText(raw, label, { required: options.required, max: 254 });
  if (value === null) return null;
  const email = value.toLowerCase();
  if (!emailPattern.test(email) || email.split("@")[0].length > 64)
    throw new AdminValidationError(`${label} must be a valid email address`);
  return email;
}

export function parsePhone(raw: unknown, label: string): string | null {
  const value = parseText(raw, label, { max: 30 });
  if (value === null) return null;
  const digits = value.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(value) || digits.length < 7 || digits.length > 15)
    throw new AdminValidationError(`${label} must be a valid telephone number`);
  return value;
}

/** Accepts a bare domain or http(s) URL and stores a normalised https/http URL. */
export function parseWebsite(raw: unknown, label: string): string | null {
  const value = parseText(raw, label, { max: 300 });
  if (value === null) return null;
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new AdminValidationError(`${label} must be a valid web address`);
  }
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    !url.hostname.includes(".") ||
    /\s/.test(value)
  )
    throw new AdminValidationError(`${label} must be a valid web address`);
  const path = url.pathname === "/" && !url.search && !url.hash ? "" : url.pathname;
  return `${url.protocol}//${url.host}${path}${url.search}${url.hash}`;
}

/** Parses a pounds amount into exact integer pence without floating-point arithmetic. */
export function parsePoundsToCents(raw: unknown, label: string): number | null {
  const value = asString(raw).trim().replace(/^£\s*/, "");
  if (!value) return null;
  const match = /^(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?$/.exec(value);
  if (!match) throw new AdminValidationError(`${label} must be an amount in pounds, e.g. 249.50`);
  const whole = match[1].replace(/,/g, "");
  if (whole.length > 10) throw new AdminValidationError(`${label} is too large`);
  const cents = Number(whole) * 100 + Number((match[2] ?? "").padEnd(2, "0") || "0");
  if (!Number.isSafeInteger(cents) || cents > MAX_CENTS)
    throw new AdminValidationError(`${label} is too large`);
  return cents;
}

/** Formats stored pence as an editable pounds string (no floating-point division). */
export function centsToPoundsInput(cents: number | null | undefined): string {
  if (cents === null || cents === undefined || !Number.isSafeInteger(cents) || cents < 0) return "";
  const pence = String(cents % 100).padStart(2, "0");
  return `${Math.floor(cents / 100)}${pence === "00" ? "" : `.${pence}`}`;
}

export function formatCents(cents: number | null | undefined): string | null {
  if (cents === null || cents === undefined || !Number.isSafeInteger(cents)) return null;
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = String(Math.floor(abs / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}£${whole}.${String(abs % 100).padStart(2, "0")}`;
}

/** Accepts a real calendar date in YYYY-MM-DD form. */
export function parseDate(raw: unknown, label: string): string | null {
  const value = asString(raw).trim();
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new AdminValidationError(`${label} must be a valid date`);
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    year < 2000 ||
    year > 2100 ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  )
    throw new AdminValidationError(`${label} must be a valid date`);
  return value;
}

export function parseEnum<T extends string>(raw: unknown, allowed: readonly T[], label: string): T {
  const value = asString(raw).trim();
  if (!(allowed as readonly string[]).includes(value))
    throw new AdminValidationError(`${label} is not a recognised option`);
  return value as T;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseUuid(raw: unknown, label: string): string {
  const value = asString(raw).trim();
  if (!uuidPattern.test(value)) throw new AdminValidationError(`${label} is not a valid record`);
  return value;
}

export function parseOptionalUuid(raw: unknown, label: string): string | null {
  return asString(raw).trim() ? parseUuid(raw, label) : null;
}

type Raw = Record<string, unknown>;

export type LeadInput = {
  name: string;
  email: string;
  company: string | null;
  package: string | null;
  status: LeadStatus;
  message: string;
  notes: string | null;
};

/** Message is NOT NULL in the database, so an unstated message is stored as an honest empty string. */
export function parseLeadInput(raw: Raw, options: { messageRequired?: boolean } = {}): LeadInput {
  return {
    name: parseText(raw.name, "Name", { required: true })!,
    email: parseEmail(raw.email, "Email", { required: true })!,
    company: parseText(raw.company, "Company"),
    package: parseText(raw.package, "Package / scope"),
    status: parseEnum(raw.status ?? "new", leadStatuses, "Status"),
    message:
      parseText(raw.message, "Message", {
        multiline: true,
        required: options.messageRequired ?? true,
      }) ?? "",
    notes: parseText(raw.notes, "Internal notes", { multiline: true }),
  };
}

export type ClientInput = {
  name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  status: ClientStatus;
  monthly_value_cents: number | null;
  notes: string | null;
};

export function parseClientInput(raw: Raw): ClientInput {
  return {
    name: parseText(raw.name, "Business name", { required: true })!,
    contact_name: parseText(raw.contact_name, "Contact name"),
    contact_email: parseEmail(raw.contact_email, "Contact email"),
    contact_phone: parsePhone(raw.contact_phone, "Phone"),
    website: parseWebsite(raw.website, "Website"),
    status: parseEnum(raw.status, clientStatuses, "Status"),
    monthly_value_cents: parsePoundsToCents(raw.monthly_value, "Monthly care value"),
    notes: parseText(raw.notes, "Notes", { multiline: true }),
  };
}

export type ProjectInput = {
  name: string;
  client_id: string | null;
  status: ProjectStatus;
  budget_cents: number | null;
  start_date: string | null;
  target_date: string | null;
  summary: string | null;
};

export function parseProjectInput(raw: Raw): ProjectInput {
  const start = parseDate(raw.start_date, "Start date");
  const target = parseDate(raw.target_date, "Target date");
  if (start && target && target < start)
    throw new AdminValidationError("Target date cannot be before the start date");
  return {
    name: parseText(raw.name, "Project title", { required: true })!,
    client_id: parseOptionalUuid(raw.client_id, "Client"),
    status: parseEnum(raw.status ?? "discovery", projectStatuses, "Status"),
    budget_cents: parsePoundsToCents(raw.budget, "Budget"),
    start_date: start,
    target_date: target,
    summary: parseText(raw.summary, "Scope summary", { multiline: true }),
  };
}

export const parseLeadStatus = (raw: unknown) => parseEnum(raw, leadStatuses, "Status");
export const parseProjectStatus = (raw: unknown) => parseEnum(raw, projectStatuses, "Status");
