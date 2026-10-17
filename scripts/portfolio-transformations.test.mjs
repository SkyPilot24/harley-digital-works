import test from "node:test";
import assert from "node:assert/strict";
import { PORTFOLIO_TRANSFORMATIONS } from "../src/lib/portfolio-data.ts";

test("portfolio transformations dataset contains exactly the six approved UK trade concepts", () => {
  assert.equal(PORTFOLIO_TRANSFORMATIONS.length, 6);

  const expectedTrades = [
    "Plumbing & Heating",
    "Electrical Services",
    "Roofing",
    "Building & Renovations",
    "Landscaping & Gardening",
    "Painting & Decorating",
  ];

  const actualTrades = PORTFOLIO_TRANSFORMATIONS.map((t) => t.tradeName);
  assert.deepEqual(actualTrades, expectedTrades);
});

test("all transformation items are explicitly marked as concept demonstrations with fictional status", () => {
  for (const item of PORTFOLIO_TRANSFORMATIONS) {
    assert.equal(item.type, "concept");
    assert.ok(item.summary.length > 20);
    assert.ok(item.supportingSocialProof.isFictional === true);
    assert.ok(
      item.supportingSocialProof.businessOwner.toLowerCase().includes("illustrative") ||
        item.supportingSocialProof.businessOwner.toLowerCase().includes("concept"),
      `Expected ${item.id} businessOwner to clearly signal illustrative/concept nature`,
    );
    assert.ok(
      item.supportingSocialProof.tradingName.toLowerCase().includes("concept"),
      `Expected ${item.id} tradingName to include 'Concept'`,
    );
  }
});

test("each transformation contains comprehensive before and after architecture", () => {
  for (const item of PORTFOLIO_TRANSFORMATIONS) {
    // Before validation
    assert.ok(item.before.title, `Missing before title for ${item.id}`);
    assert.ok(item.before.urlPlaceholder, `Missing before URL for ${item.id}`);
    assert.ok(item.before.headline, `Missing before headline for ${item.id}`);
    assert.ok(item.before.flaws.length >= 3, `Expected at least 3 flaws for ${item.id}`);
    assert.ok(item.before.mobileIssues.length >= 2, `Expected mobile issues for ${item.id}`);

    // After validation
    assert.ok(item.after.title, `Missing after title for ${item.id}`);
    assert.ok(item.after.urlPlaceholder.startsWith("https://"), `Invalid after URL for ${item.id}`);
    assert.ok(item.after.headline, `Missing after headline for ${item.id}`);
    assert.ok(item.after.badge, `Missing after badge for ${item.id}`);
    assert.ok(item.after.keyFeatures.length >= 3, `Expected key features for ${item.id}`);
    assert.ok(item.after.conversionBoosters.length >= 2, `Expected conversion boosters for ${item.id}`);
    assert.ok(item.after.callToAction, `Missing CTA for ${item.id}`);
  }
});

test("commercial benefits include explicit assumptions and disclaimers", () => {
  for (const item of PORTFOLIO_TRANSFORMATIONS) {
    const { commercialBenefits } = item;
    assert.ok(commercialBenefits.beforeSummary.length > 20);
    assert.ok(commercialBenefits.afterSummary.length > 20);
    assert.ok(commercialBenefits.potentialImpact.length > 20);

    const scenario = commercialBenefits.commercialScenario;
    assert.ok(scenario.monthlyVisitors > 0);
    assert.ok(scenario.conversionAfter > scenario.conversionBefore);
    assert.ok(scenario.monthlyExtraEnquiries > 0);
    assert.ok(scenario.assumedAvgJobValue.length > 0);
    assert.ok(scenario.illustrativeAnnualGain.length > 0);

    // Verify assumptions explain hypothetical nature
    assert.ok(scenario.assumptions.length >= 2);
    const hasDisclaimer = scenario.assumptions.some(
      (a) => a.toLowerCase().includes("hypothetical") || a.toLowerCase().includes("illustrative"),
    );
    assert.ok(hasDisclaimer, `Expected hypothetical disclaimer in assumptions for ${item.id}`);
  }
});
