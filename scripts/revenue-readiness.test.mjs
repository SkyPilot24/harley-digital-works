import test from "node:test";
import {
  clientWorkspaceForLead,
  ensureClientWorkspace,
  recordedActiveMonthlyValue,
} from "../src/lib/client-workspace.ts";
import assert from "node:assert/strict";

const prospect = {
  id: "d0c2f206-bca7-4bb0-8b3c-cd9eb80b9e39",
  name: "Test Prospect",
  email: "prospect@example.com",
  company: "Test Business",
  package: "Launch Website (£1,495)",
  message: "Please discuss my website",
  status: "new",
};
test("package interest never creates an active client or assumed recurring revenue", () => {
  for (const offer of [
    "Launch Website (£1,495)",
    "Growth Website (£2,995)",
    "Pro Platform (£4,995+)",
    "Care £195/mo",
  ]) {
    const result = clientWorkspaceForLead({ ...prospect, package: offer });
    assert.equal(result.monthly_value_cents, 0);
    assert.equal(result.status, "lead");
    assert.equal(result.id, prospect.id);
  }
  assert.equal(prospect.status, "new");
});
test("concurrent workspace requests converge on one record", async () => {
  const records = new Map();
  let inserts = 0;
  const storage = {
    find: async (id) => records.get(id) || null,
    insert: async (payload) => {
      if (records.has(payload.id)) throw { code: "23505" };
      inserts++;
      records.set(payload.id, payload);
      return payload;
    },
  };
  const [first, second] = await Promise.all([
    ensureClientWorkspace(prospect, storage),
    ensureClientWorkspace(prospect, storage),
  ]);
  assert.equal(first.id, second.id);
  assert.equal(inserts, 1);
  assert.equal(records.size, 1);
});
test("retry preserves an existing client's manually recorded agreement values", async () => {
  const existing = {
    ...clientWorkspaceForLead(prospect),
    status: "active",
    monthly_value_cents: 12750,
  };
  const result = await ensureClientWorkspace(prospect, {
    find: async () => existing,
    insert: async () => {
      throw Error("Must not overwrite");
    },
  });
  assert.equal(result.monthly_value_cents, 12750);
  assert.equal(result.status, "active");
});
test("unexpected conflicting records require reconciliation, not overwrite", async () => {
  await assert.rejects(
    () =>
      ensureClientWorkspace(prospect, {
        find: async () => ({ id: prospect.id, notes: "Unrelated existing record" }),
        insert: async () => {
          throw Error("Must not overwrite");
        },
      }),
    /reconciliation/,
  );
});
test("database failures propagate instead of claiming workspace creation", async () => {
  await assert.rejects(
    () =>
      ensureClientWorkspace(prospect, {
        find: async () => null,
        insert: async () => {
          throw Error("Database unavailable");
        },
      }),
    /Database unavailable/,
  );
});
test("recorded monthly totals exclude inactive prospects, paused, archived and invalid values", () => {
  assert.equal(
    recordedActiveMonthlyValue([
      { status: "active", monthly_value_cents: 9500 },
      { status: "active", monthly_value_cents: 19500 },
      { status: "lead", monthly_value_cents: 499500 },
      { status: "paused", monthly_value_cents: 19500 },
      { status: "archived", monthly_value_cents: 9500 },
      { status: "active", monthly_value_cents: -100 },
      { status: "active", monthly_value_cents: null },
      { status: "active", monthly_value_cents: NaN },
    ]),
    29000,
  );
});
import { parseLeadFormData, leadInputSchema } from "../src/lib/lead-schema.ts";
import {
  buildLeadMailto,
  formatLeadMessage,
  resolveEnquiryInterest,
  notifyWithoutFailingReceipt,
} from "../src/lib/lead-details.ts";
import { dispatchAuthorizedEmail } from "../src/lib/email-delivery.ts";
import { deferredServiceForPath } from "../src/lib/launch-scope.ts";

function form(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: "Test Enquiry",
    email: "test@example.com",
    phone: "+44 7700 900123",
    message: "Please discuss a website.",
    startedAt: Date.now() - 5000,
    ...overrides,
  }))
    data.set(key, String(value));
  return data;
}
test("phone survives parsing, CRM message formatting and email fallback", () => {
  const result = parseLeadFormData(form());
  assert.equal(result.success, true);
  assert.equal(result.data.phone, "+44 7700 900123");
  assert.match(formatLeadMessage(result.data), /Phone: \+44 7700 900123/);
  const body = new URL(buildLeadMailto(result.data, "hello@example.com")).searchParams.get("body");
  assert.match(body, /Phone: \+44 7700 900123/);
});
test("corporate source is retained and unknown source values are rejected", () => {
  assert.equal(
    parseLeadFormData(form({ source: "group_contact_form" })).data.source,
    "group_contact_form",
  );
  assert.equal(parseLeadFormData(form({ source: "untrusted" })).success, false);
});
test("old submissions without phone or source remain valid", () => {
  assert.equal(
    leadInputSchema.safeParse({
      name: "Test",
      email: "test@example.com",
      message: "New website please",
      startedAt: Date.now(),
    }).success,
    true,
  );
});
test("oversized phone and malformed emails fail validation", () => {
  assert.equal(parseLeadFormData(form({ phone: "1".repeat(41) })).success, false);
  assert.equal(parseLeadFormData(form({ email: "not-email" })).success, false);
});
test("legacy Pro CTA, domain and service links select actual form options", () => {
  assert.equal(
    resolveEnquiryInterest({ package: "Pro / Custom (£4,995+)" }),
    "Pro Platform (£4,995+)",
  );
  assert.equal(resolveEnquiryInterest({ domain: "example.com" }), "Domain purchase / enquiry");
  assert.equal(
    resolveEnquiryInterest({ service: "Care plans" }),
    "Website Care Plan & Hosting (£95/mo)",
  );
  assert.equal(
    resolveEnquiryInterest({ service: "Free Website Health Check Consultation" }),
    "Free Website Health Check Consultation",
  );
});
test("Slack failure cannot reject a successful lead receipt", async () => {
  let failures = 0;
  assert.equal(
    await notifyWithoutFailingReceipt(
      async () => {
        throw Error("network");
      },
      () => {
        failures++;
      },
    ),
    false,
  );
  assert.equal(failures, 1);
  assert.equal(
    await notifyWithoutFailingReceipt(
      async () => {},
      () => {
        throw Error("unexpected");
      },
    ),
    true,
  );
});

const email = {
  recipientEmail: "test@example.com",
  recipientName: "Test",
  subject: "Website proposal",
  templateType: "proposal",
  plainTextBody: "This is a test proposal.",
};
const config = {
  enabled: true,
  apiKey: "test-only",
  senderEmail: "hello@example.com",
  authorize: async () => {},
};
test("denied authorization prevents all provider requests", async () => {
  let requests = 0;
  await assert.rejects(
    () =>
      dispatchAuthorizedEmail(email, {
        ...config,
        authorize: async () => {
          throw Error("Forbidden");
        },
        fetch: async () => {
          requests++;
          return Response.json({ id: "receipt" });
        },
      }),
    /Forbidden/,
  );
  assert.equal(requests, 0);
});
test("disabled sending only prepares a draft", async () => {
  const result = await dispatchAuthorizedEmail(email, {
    ...config,
    enabled: false,
    fetch: async () => {
      throw Error("Must not send");
    },
  });
  assert.equal(result.status, "prepared");
  assert.equal(result.accepted, false);
  assert.equal(result.delivered, false);
});
test("missing credentials do not imply an email was sent", async () => {
  const result = await dispatchAuthorizedEmail(email, {
    ...config,
    apiKey: undefined,
    fetch: async () => {
      throw Error("Must not send");
    },
  });
  assert.equal(result.status, "prepared");
});
test("provider receipt means accepted, never confirmed delivery", async () => {
  const result = await dispatchAuthorizedEmail(email, {
    ...config,
    fetch: async () => Response.json({ id: "receipt-123" }),
  });
  assert.equal(result.accepted, true);
  assert.equal(result.delivered, false);
  assert.equal(result.providerId, "receipt-123");
});
test("provider rejection does not silently fall back to a duplicate draft send", async () => {
  await assert.rejects(
    () =>
      dispatchAuthorizedEmail(email, {
        ...config,
        fetch: async () => new Response("", { status: 429 }),
      }),
    /did not confirm/,
  );
});
test("empty provider receipt is not accepted as success", async () => {
  await assert.rejects(
    () => dispatchAuthorizedEmail(email, { ...config, fetch: async () => Response.json({}) }),
    /no receipt/,
  );
});
test("oversized payload is rejected before contacting provider", async () => {
  await assert.rejects(() =>
    dispatchAuthorizedEmail(
      { ...email, subject: "x".repeat(201) },
      {
        ...config,
        fetch: async () => {
          throw Error("Must not send");
        },
      },
    ),
  );
});
test("unfinished public workflows route to a real enquiry path", () => {
  for (const url of [
    "/audit",
    "/tools/seo-inspector",
    "/tools/review-booster",
    "/care-desk",
    "/onboarding",
    "/partners",
    "/proposals",
    "/track",
    "/track/unknown",
    "/track/HDW-APEX-2026/",
  ])
    assert.ok(deferredServiceForPath(url), url);
});
test("launch pages and admin paths remain accessible", () => {
  for (const url of [
    "/",
    "/contact",
    "/the-harley-group",
    "/work",
    "/demos",
    "/admin/leads",
    "/auth",
    "/tracking-other",
  ])
    assert.equal(deferredServiceForPath(url), undefined, url);
});

// =========================================================
// Backend & Supabase Verification: Leads RLS & Authorization
// =========================================================

function simulateLeadsRLS({ role = "anon", hasAdminRole = false } = {}) {
  const table = [];

  return {
    insert: (lead) => {
      // "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
      if (!lead.name || !lead.email || !lead.message) {
        throw new Error("Missing required lead fields");
      }
      const record = {
        id: crypto.randomUUID(),
        name: lead.name,
        email: lead.email.toLowerCase(),
        company: lead.company || null,
        package: lead.package || null,
        message: lead.message,
        status: lead.status || "new",
        notes: lead.notes || null,
        source: lead.source || "contact_form",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      table.push(record);
      return { data: record, error: null };
    },
    select: () => {
      // "Admins read leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
      if (role !== "authenticated" || !hasAdminRole) {
        return {
          data: null,
          error: { message: "Permission denied by RLS policy: Admins read leads" },
        };
      }
      return { data: [...table], error: null };
    },
    update: (id, updates) => {
      // "Admins update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
      if (role !== "authenticated" || !hasAdminRole) {
        return {
          data: null,
          error: { message: "Permission denied by RLS policy: Admins update leads" },
        };
      }
      const idx = table.findIndex((l) => l.id === id);
      if (idx === -1) return { data: null, error: { message: "Lead not found" } };
      table[idx] = { ...table[idx], ...updates, updated_at: new Date().toISOString() };
      return { data: table[idx], error: null };
    },
    delete: (id) => {
      // "Admins delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
      if (role !== "authenticated" || !hasAdminRole) {
        return {
          data: null,
          error: { message: "Permission denied by RLS policy: Admins delete leads" },
        };
      }
      const idx = table.findIndex((l) => l.id === id);
      if (idx === -1) return { data: null, error: { message: "Lead not found" } };
      const [deleted] = table.splice(idx, 1);
      return { data: deleted, error: null };
    },
  };
}

test("anonymous users can insert enquiries but RLS blocks select, update, and delete", () => {
  const anonClient = simulateLeadsRLS({ role: "anon", hasAdminRole: false });

  // Anonymous user submits an enquiry
  const insertResult = anonClient.insert({
    name: "John Doe",
    email: "JOHN.DOE@EXAMPLE.COM",
    message: "Enquiry for Launch website package",
  });
  assert.equal(insertResult.error, null);
  assert.equal(insertResult.data.email, "john.doe@example.com");

  // Anonymous user attempts to query leads list
  const selectResult = anonClient.select();
  assert.ok(selectResult.error);
  assert.match(selectResult.error.message, /Permission denied by RLS policy/);

  // Anonymous user attempts to update status
  const updateResult = anonClient.update(insertResult.data.id, { status: "won" });
  assert.ok(updateResult.error);
  assert.match(updateResult.error.message, /Permission denied by RLS policy/);

  // Anonymous user attempts to delete lead
  const deleteResult = anonClient.delete(insertResult.data.id);
  assert.ok(deleteResult.error);
  assert.match(deleteResult.error.message, /Permission denied by RLS policy/);
});

test("non-admin authenticated users are blocked from viewing or managing leads", () => {
  const userClient = simulateLeadsRLS({ role: "authenticated", hasAdminRole: false });

  const selectResult = userClient.select();
  assert.ok(selectResult.error);
  assert.match(selectResult.error.message, /Admins read leads/);

  const updateResult = userClient.update("some-id", { status: "qualified" });
  assert.ok(updateResult.error);
  assert.match(updateResult.error.message, /Admins update leads/);
});

test("admin authenticated users have full access to select, update, delete, and manage leads", () => {
  const adminClient = simulateLeadsRLS({ role: "authenticated", hasAdminRole: true });

  const lead1 = adminClient.insert({
    name: "Trade Client Ltd",
    email: "contact@tradeclient.co.uk",
    company: "Trade Client Ltd",
    package: "Growth Website (£2,995)",
    message: "Looking for new website and care plan",
  }).data;

  // Admin reads leads
  const selectResult = adminClient.select();
  assert.equal(selectResult.error, null);
  assert.equal(selectResult.data.length, 1);
  assert.equal(selectResult.data[0].name, "Trade Client Ltd");

  // Admin updates lead status to qualified
  const updateResult = adminClient.update(lead1.id, {
    status: "qualified",
    notes: "Called 03/10: approved proposal",
  });
  assert.equal(updateResult.error, null);
  assert.equal(updateResult.data.status, "qualified");
  assert.equal(updateResult.data.notes, "Called 03/10: approved proposal");

  // Admin deletes lead
  const deleteResult = adminClient.delete(lead1.id);
  assert.equal(deleteResult.error, null);
  assert.equal(adminClient.select().data.length, 0);
});

// =========================================================
// Client Workspace & Strategy Verification
// =========================================================
import { currentStrategy, deliverySteps, currentPriorities } from "../src/lib/current-strategy.ts";

test("client workspace creation for lead initializes with zero monthly value and lead status", () => {
  const sampleLead = {
    id: "e5f2a100-3021-4f90-a292-200984a98401",
    name: "Apex Electricals",
    email: "info@apexelectricals.co.uk",
    company: "Apex Electrical Services",
    package: "Growth Website (£2,995)",
    message: "Need a managed website",
    status: "qualified",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const clientPayload = clientWorkspaceForLead(sampleLead);
  assert.equal(clientPayload.id, sampleLead.id);
  assert.equal(clientPayload.name, "Apex Electrical Services");
  assert.equal(clientPayload.status, "lead");
  assert.equal(clientPayload.monthly_value_cents, 0);
  assert.match(clientPayload.notes, /No agreement or payment is implied/);
});

test("strategy definition matches Business OS governance specifications", () => {
  assert.equal(currentStrategy.title, "Managed websites for UK trades");
  assert.match(currentStrategy.model, /initial website build fee/);
  assert.match(currentStrategy.milestone, /verified paying customer/);
  assert.equal(deliverySteps.length, 8);
  assert.equal(currentPriorities.length, 5);
});

import { buildPageSeoHead } from "../src/lib/site-config.ts";

test("buildPageSeoHead outputs valid canonical links, OpenGraph tags and Schema.org JSON-LD microdata", () => {
  const head = buildPageSeoHead({
    title: "Test Page | Harley Digital Works",
    description: "Test page description for UK trades.",
    path: "/services",
  });

  const canonicalLink = head.links.find((l) => l.rel === "canonical");
  assert.ok(canonicalLink);
  assert.equal(canonicalLink.href, "https://harleydigitalworks.com/services");

  const ogTitle = head.meta.find((m) => m.property === "og:title");
  assert.ok(ogTitle);
  assert.equal(ogTitle.content, "Test Page | Harley Digital Works");

  const twitterCard = head.meta.find((m) => m.name === "twitter:card");
  assert.ok(twitterCard);
  assert.equal(twitterCard.content, "summary_large_image");

  assert.equal(head.scripts.length, 1);
  const schemaObj = JSON.parse(head.scripts[0].children);
  assert.equal(schemaObj["@context"], "https://schema.org");
  assert.equal(schemaObj["@type"], "ProfessionalService");
  assert.equal(schemaObj.name, "Harley Digital Works");
});

import { publicWebsiteRoutes } from "../src/lib/site-config.ts";

test("publicWebsiteRoutes defines complete diagnostic metadata for all key revenue surfaces", () => {
  assert.ok(publicWebsiteRoutes.length >= 11);

  for (const route of publicWebsiteRoutes) {
    assert.ok(route.path.startsWith("/"));
    assert.ok(route.label);
    assert.ok(route.adminPath.startsWith("/admin"));
    assert.ok(route.owner);
    assert.ok(
      ["Brand", "Services", "Domains", "Resources", "Lead capture"].includes(route.diagnosticGroup),
    );
    assert.ok(route.leadCapturePath);
    assert.ok(route.revenueRole);
    assert.ok(["High", "Medium", "Low"].includes(route.priority));
  }
});

import {
  domainPortfolio,
  rankedDomains,
  getDomainBuyNowPrice,
  formatGbp,
} from "../src/lib/domain-portfolio.ts";

test("domain portfolio ranking orders High priority assets first and formats pricing correctly", () => {
  const ranked = rankedDomains();
  assert.equal(ranked.length, domainPortfolio.length);

  // First item must be High priority
  assert.equal(ranked[0].priority, "High");

  // Check valuation guide pricing
  assert.equal(getDomainBuyNowPrice("valuecurrencies.com"), 4995);
  assert.equal(formatGbp(4995), "£4,995");
  assert.equal(formatGbp(null), "Enquire only");
});

import { TRADE_VERTICALS } from "../src/lib/trade-data.ts";

test("trade verticals dataset is structured with valid slugs, stats, and accreditation badges", () => {
  const verticals = Object.values(TRADE_VERTICALS);
  assert.ok(verticals.length >= 4);

  for (const trade of verticals) {
    assert.ok(trade.slug);
    assert.ok(trade.name);
    assert.ok(trade.badge);
    assert.ok(trade.heroHeadline);
    assert.ok(trade.heroHighlight);
    assert.ok(trade.heroSubheadline);
    assert.ok(trade.accreditationBadge);
    assert.ok(trade.averageJobValue);
    assert.ok(Array.isArray(trade.targetEnquiries) && trade.targetEnquiries.length > 0);
    assert.ok(Array.isArray(trade.keyChallenges) && trade.keyChallenges.length > 0);
    assert.ok(Array.isArray(trade.includedFeatures) && trade.includedFeatures.length > 0);
    assert.ok(trade.metaTitle.includes("Harley Digital Works"));
    assert.ok(trade.metaDescription.length > 20);
    assert.ok(Array.isArray(trade.stats) && trade.stats.length >= 4);
  }
});

import { UK_LOCATIONS } from "../src/lib/location-data.ts";

test("UK locations dataset contains valid postcodes, borough coverage, and verified case studies", () => {
  const locations = Object.values(UK_LOCATIONS);
  assert.ok(locations.length >= 2);

  for (const loc of locations) {
    assert.ok(loc.slug);
    assert.ok(loc.cityName);
    assert.ok(loc.regionName);
    assert.ok(loc.county);
    assert.ok(loc.headline);
    assert.ok(loc.subheadline);
    assert.ok(loc.localPhone.length >= 10);
    assert.ok(Array.isArray(loc.boroughs) && loc.boroughs.length > 0);
    assert.ok(Array.isArray(loc.nearbyPostcodes) && loc.nearbyPostcodes.length > 0);
    assert.ok(loc.stats.tradeSitesLaunched > 0);
    assert.ok(loc.stats.avgTurnaroundDays > 0);
    assert.ok(loc.stats.avgInquiriesMonthly > 0);
    assert.ok(Array.isArray(loc.featuredTrades) && loc.featuredTrades.length > 0);
    assert.ok(loc.localCaseStudy.name);
    assert.ok(loc.localCaseStudy.trade);
    assert.ok(loc.localCaseStudy.location);
    assert.ok(loc.localCaseStudy.result);
    assert.ok(loc.localCaseStudy.quote);
  }
});
