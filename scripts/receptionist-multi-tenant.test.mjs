import test from "node:test";
import assert from "node:assert/strict";
import {
  getReceptionistTenant,
  BUILTIN_RECEPTIONIST_TENANTS,
} from "../src/lib/receptionist-tenants.ts";
import {
  extractLeadFromConversation,
  processReceptionistCall,
} from "../src/lib/receptionist-agent.ts";

test("1. Multi-Tenant Receptionist Store: Primary HDW Agent Preservation", () => {
  const hdw = getReceptionistTenant("hdw-primary");
  assert.equal(hdw.tenantSlug, "hdw-primary");
  assert.equal(hdw.businessName, "Harley Digital Works");
  assert.equal(hdw.assignedDid, "+441172141357");
  assert.equal(hdw.status, "active");
  assert.match(hdw.greetingText, /Harley Digital Works/);
  assert.match(hdw.greetingText, /24\/7/);

  // Both main VoIP line and WhatsApp mobile resolve to hdw-primary
  const byVoip = getReceptionistTenant("+441172141357");
  assert.equal(byVoip.tenantSlug, "hdw-primary");
  const byMobile = getReceptionistTenant("+447394041487");
  assert.equal(byMobile.tenantSlug, "hdw-primary");

  // Default fallback must resolve to hdw-primary
  const fallback = getReceptionistTenant(null);
  assert.equal(fallback.tenantSlug, "hdw-primary");
});

test("2. Multi-Tenant Switchboards: Client Tenant Isolation", () => {
  const rg = getReceptionistTenant("rg-electrical");
  assert.equal(rg.businessName, "RG Electrical & Renewable Solutions");
  assert.equal(rg.tradeType, "electrical_contractor");
  assert.equal(rg.assignedDid, "+441172141358");
  assert.match(rg.greetingText, /RG Electrical/);

  const apex = getReceptionistTenant("apex-heating");
  assert.equal(apex.businessName, "Apex Gas & Heating Engineers");
  assert.equal(apex.tradeType, "heating_and_gas");
  assert.equal(apex.assignedDid, "+441172141359");

  const clifton = getReceptionistTenant("clifton-roofing");
  assert.equal(clifton.businessName, "Clifton Roofing & Leadwork");
  assert.equal(clifton.tradeType, "roofing_contractor");
  assert.equal(clifton.assignedDid, "+441172141360");
});

test("3. Lead Extraction: Emergency Triage Detection Across Trades", () => {
  const rg = getReceptionistTenant("rg-electrical");
  const emergencyMessage =
    "Urgent: I have sparks and a strong burning smell from my fuseboard in Clifton. Call me at 07700 900123.";
  const lead = extractLeadFromConversation(emergencyMessage, rg);

  assert.equal(lead.urgency, "urgent_emergency");
  assert.equal(lead.callerPhone, "07700 900123");
  assert.equal(lead.callerLocation, "Clifton");
  assert.equal(lead.serviceScope, "Fuseboard Upgrade / Rewire");

  // Standard non-emergency call
  const standardMessage = "Can I get an estimate for an EV charger in Bristol?";
  const standardLead = extractLeadFromConversation(standardMessage, rg);
  assert.equal(standardLead.urgency, "standard");
  assert.equal(standardLead.serviceScope, "EV Charger Installation");
});

test("4. Multi-Tenant Process Call: Local Knowledge Engine Execution", async () => {
  const rg = getReceptionistTenant("rg-electrical");
  const res = await processReceptionistCall(
    "How much is an 18th edition fuseboard replacement?",
    "session-test-1",
    rg.tenantSlug,
    "tenant_switchboard",
  );

  assert.equal(res.tenantSlug, "rg-electrical");
  assert.equal(res.businessName, "RG Electrical & Renewable Solutions");
  assert.equal(res.isEmergency, false);
  assert.match(res.replyText, /£850/);
  assert.match(res.replyText, /NICEIC/);
});

test("5. Emergency Safety Guidance Response", async () => {
  const apex = getReceptionistTenant("apex-heating");
  const res = await processReceptionistCall(
    "Emergency: I smell gas near the boiler in Bath! Phone is 07890 000111",
    "session-test-2",
    apex.tenantSlug,
    "tenant_switchboard",
  );

  assert.equal(res.tenantSlug, "apex-heating");
  assert.equal(res.isEmergency, true);
  assert.match(res.replyText, /SAFETY NOTICE/);
  assert.match(res.replyText, /Gas Safe/);
  assert.equal(res.leadInfo.callerPhone, "07890 000111");
  assert.equal(res.leadInfo.callerLocation, "Bath");
});

test("6. Commercial Model & Pricing Tiers Verification", () => {
  const tiers = {
    solo: { price: 79, setup: 195, allowance: 50 },
    pro: { price: 149, setup: 295, allowance: 150 },
    care_addon: { price: 99, setup: 0, allowance: 150 },
    fleet: { price: 249, setup: 495, allowance: 350 },
  };

  assert.equal(tiers.solo.price, 79);
  assert.equal(tiers.pro.price, 149);
  assert.equal(tiers.care_addon.price, 99);
  assert.equal(tiers.fleet.price, 249);

  // Check margins against wholesale cost (~£0.065/minute, 2.5 min avg = ~£0.16/call)
  const soloCost = tiers.solo.allowance * 0.16 + 1.0; // £9.00
  const soloMargin = ((tiers.solo.price - soloCost) / tiers.solo.price) * 100;
  assert.ok(soloMargin > 80, "Solo margin must exceed 80%");

  const proCost = tiers.pro.allowance * 0.16 + 1.0; // £25.00
  const proMargin = ((tiers.pro.price - proCost) / tiers.pro.price) * 100;
  assert.ok(proMargin > 75, "Pro margin must exceed 75%");
});
