import assert from "node:assert/strict";
import test from "node:test";
import {
  AdminValidationError,
  MAX_CENTS,
  centsToPoundsInput,
  formatCents,
  parseClientInput,
  parseDate,
  parseEmail,
  parseLeadInput,
  parseLeadStatus,
  parsePhone,
  parseProjectInput,
  parseProjectStatus,
  parsePoundsToCents,
  parseText,
  parseUuid,
  parseWebsite,
} from "../src/lib/admin-validation.ts";

const invalid = (fn) => assert.throws(fn, AdminValidationError);

test("money is parsed to exact pence without floating-point error", () => {
  assert.equal(parsePoundsToCents("19.99", "x"), 1999);
  assert.equal(parsePoundsToCents("1.1", "x"), 110);
  assert.equal(parsePoundsToCents("0.29", "x"), 29); // 0.29 * 100 === 28.999999999999996
  assert.equal(parsePoundsToCents("1.15", "x"), 115);
  assert.equal(parsePoundsToCents("£249", "x"), 24900);
  assert.equal(parsePoundsToCents("1,495.50", "x"), 149550);
  assert.equal(parsePoundsToCents("0", "x"), 0);
  assert.equal(parsePoundsToCents(String(MAX_CENTS / 100).replace(/\.\d+$/, ""), "x"), 2147483600);
});

test("blank money stays optional (null) rather than becoming a default", () => {
  assert.equal(parsePoundsToCents("", "x"), null);
  assert.equal(parsePoundsToCents("   ", "x"), null);
  assert.equal(parsePoundsToCents(null, "x"), null);
  assert.equal(parsePoundsToCents(undefined, "x"), null);
});

test("malformed, negative, fractional-pence and oversized money is rejected", () => {
  for (const bad of [
    "abc",
    "NaN",
    "Infinity",
    "-5",
    "1.005",
    "1e3",
    "1,23",
    "1..2",
    "12.",
    ".5",
    "0x10",
    "99999999999",
    "21474837",
  ]) {
    invalid(() => parsePoundsToCents(bad, "x"));
  }
  invalid(() => parsePoundsToCents(12, "x"));
});

test("pence round-trip to editable and display text", () => {
  assert.equal(centsToPoundsInput(24900), "249");
  assert.equal(centsToPoundsInput(24950), "249.50");
  assert.equal(centsToPoundsInput(5), "0.05");
  assert.equal(centsToPoundsInput(null), "");
  assert.equal(centsToPoundsInput(-1), "");
  assert.equal(formatCents(149500), "£1,495.00");
  assert.equal(formatCents(0), "£0.00");
  assert.equal(formatCents(null), null);
  assert.equal(parsePoundsToCents(centsToPoundsInput(12345), "x"), 12345);
});

test("text is trimmed, normalised, bounded and optional", () => {
  assert.equal(parseText("  Dave   Miller ", "Name"), "Dave Miller");
  assert.equal(parseText("", "Name"), null);
  assert.equal(parseText("a\r\nb", "Notes", { multiline: true }), "a\nb");
  invalid(() => parseText("", "Name", { required: true }));
  invalid(() => parseText("x".repeat(201), "Name"));
  invalid(() => parseText("bad\u0000value", "Name"));
  invalid(() => parseText(42, "Name"));
});

test("email is normalised and validated; optional when not required", () => {
  assert.equal(
    parseEmail(" Dave@Example.CO.uk ", "Email", { required: true }),
    "dave@example.co.uk",
  );
  assert.equal(parseEmail("", "Email"), null);
  invalid(() => parseEmail("", "Email", { required: true }));
  for (const bad of ["dave", "dave@", "@x.com", "a b@x.com", "a@x", "a@@x.com", "<a>@x.com"]) {
    invalid(() => parseEmail(bad, "Email"));
  }
});

test("phone accepts real numbers only", () => {
  assert.equal(parsePhone("0117 900 1234", "Phone"), "0117 900 1234");
  assert.equal(parsePhone("+44 7123 456789", "Phone"), "+44 7123 456789");
  assert.equal(parsePhone("", "Phone"), null);
  invalid(() => parsePhone("call me", "Phone"));
  invalid(() => parsePhone("123", "Phone"));
});

test("website is normalised and unsafe schemes rejected", () => {
  assert.equal(parseWebsite("apexelectrical.co.uk", "Website"), "https://apexelectrical.co.uk");
  assert.equal(parseWebsite("http://x.co.uk/a", "Website"), "http://x.co.uk/a");
  assert.equal(parseWebsite("", "Website"), null);
  for (const bad of [
    "javascript:alert(1)",
    "ftp://x.co.uk",
    "localhost",
    "https://u:p@x.co.uk",
    "not a url",
  ]) {
    invalid(() => parseWebsite(bad, "Website"));
  }
});

test("dates must be real calendar dates", () => {
  assert.equal(parseDate("2026-02-28", "Date"), "2026-02-28");
  assert.equal(parseDate("", "Date"), null);
  for (const bad of [
    "2026-02-30",
    "2026-13-01",
    "26-01-01",
    "2026-1-1",
    "1999-01-01",
    "2026-01-01T10:00:00Z",
    "tomorrow",
  ]) {
    invalid(() => parseDate(bad, "Date"));
  }
});

test("project input: target before start is rejected, optionals stay null, no invented defaults", () => {
  invalid(() =>
    parseProjectInput({ name: "P", start_date: "2026-05-02", target_date: "2026-05-01" }),
  );
  const p = parseProjectInput({
    name: "  P  ",
    client_id: "",
    budget: "",
    target_date: "",
    summary: "",
  });
  assert.deepEqual(p, {
    name: "P",
    client_id: null,
    status: "discovery",
    budget_cents: null,
    start_date: null,
    target_date: null,
    summary: null,
  });
  assert.equal(parseProjectInput({ name: "P", budget: "1495.00" }).budget_cents, 149500);
  invalid(() => parseProjectInput({ name: "" }));
  invalid(() => parseProjectInput({ name: "P", client_id: "not-a-uuid" }));
  invalid(() => parseProjectInput({ name: "P", status: "bogus" }));
  invalid(() => parseProjectInput({ name: "P", budget: "-1" }));
});

test("client input: optionals stay null and money is exact", () => {
  const c = parseClientInput({ name: "Apex", status: "active", monthly_value: "" });
  assert.equal(c.monthly_value_cents, null);
  assert.equal(c.contact_email, null);
  assert.equal(c.website, null);
  assert.equal(
    parseClientInput({ name: "A", status: "lead", monthly_value: "149" }).monthly_value_cents,
    14900,
  );
  invalid(() => parseClientInput({ name: "A", status: "vip" }));
  invalid(() => parseClientInput({ name: "A", status: "lead", monthly_value: "abc" }));
  invalid(() => parseClientInput({ name: "A", status: "lead", contact_email: "bad" }));
  invalid(() => parseClientInput({ name: " ", status: "lead" }));
});

test("lead input: required fields, optional message, status allow-list", () => {
  const l = parseLeadInput({ name: "D", email: "D@X.com", message: "hi" });
  assert.equal(l.email, "d@x.com");
  assert.equal(l.status, "new");
  assert.equal(l.package, null);
  assert.equal(
    parseLeadInput({ name: "D", email: "d@x.com" }, { messageRequired: false }).message,
    "",
  );
  invalid(() => parseLeadInput({ name: "D", email: "d@x.com" }));
  invalid(() => parseLeadInput({ name: "D", email: "bad", message: "m" }));
  invalid(() => parseLeadInput({ name: "D", email: "d@x.com", message: "m", status: "closed" }));
});

test("status and id parsers reject unknown values", () => {
  assert.equal(parseLeadStatus("won"), "won");
  assert.equal(parseProjectStatus("on_hold"), "on_hold");
  invalid(() => parseLeadStatus("WON"));
  invalid(() => parseLeadStatus(undefined));
  invalid(() => parseProjectStatus("done"));
  invalid(() => parseUuid("1", "Record"));
  assert.equal(
    parseUuid("123e4567-e89b-12d3-a456-426614174000", "Record"),
    "123e4567-e89b-12d3-a456-426614174000",
  );
});
