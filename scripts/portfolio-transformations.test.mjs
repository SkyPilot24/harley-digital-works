import test from "node:test";
import assert from "node:assert/strict";
import { PORTFOLIO_TRANSFORMATIONS } from "../src/lib/portfolio-data.ts";

test("portfolio design studies dataset contains exactly the six approved UK trade concepts", () => {
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

test("all design study items are explicitly marked as concept demonstrations without fake testimonials", () => {
  for (const item of PORTFOLIO_TRANSFORMATIONS) {
    assert.equal(item.type, "concept");
    assert.ok(item.summary.length > 20);
    assert.ok(item.summary.toLowerCase().includes("design study"));
    // Ensure no fake testimonial/social proof exists
    assert.equal("supportingSocialProof" in item, false);
  }
});

test("each design study contains comprehensive before and after architecture", () => {
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
    assert.ok(
      item.after.conversionBoosters.length >= 2,
      `Expected conversion boosters for ${item.id}`,
    );
    assert.ok(item.after.callToAction, `Missing CTA for ${item.id}`);
  }
});

test("commercial benefits include qualitative design observations without invented numbers", () => {
  for (const item of PORTFOLIO_TRANSFORMATIONS) {
    const { commercialBenefits } = item;
    assert.ok(commercialBenefits.beforeSummary.length > 20);
    assert.ok(commercialBenefits.afterSummary.length > 20);
    assert.ok(commercialBenefits.potentialImpact.length > 20);
    // Ensure no fake financial scenario numbers exist
    assert.equal("commercialScenario" in commercialBenefits, false);
  }
});
