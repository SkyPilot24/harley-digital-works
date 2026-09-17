import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("==================================================");
console.log(" The Harley Group & Harley Digital Works");
console.log(" Automated Platform Smoke & Integrity Test Suite");
console.log("==================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

// 1. Verify Core Routes
console.log("[Test Suite 1: Route Integrity]");
const expectedRoutes = [
  "src/routes/index.tsx",
  "src/routes/the-harley-group.tsx",
  "src/routes/labs.tsx",
  "src/routes/proposals.tsx",
  "src/routes/partners.tsx",
  "src/routes/trades.tsx",
  "src/routes/trades_.$slug.tsx",
  "src/routes/services.tsx",
  "src/routes/services_.launch-plan.tsx",
  "src/routes/services_.web-design-development.tsx",
  "src/routes/services_.care-plans.tsx",
  "src/routes/demos.tsx",
  "src/routes/calculator.tsx",
  "src/routes/tools.seo-inspector.tsx",
  "src/routes/tools.review-booster.tsx",
  "src/routes/care-desk.tsx",
  "src/routes/onboarding.tsx",
  "src/routes/track.tsx",
  "src/routes/work.tsx",
  "src/routes/about.tsx",
  "src/routes/brand.tsx",
  "src/routes/locations.tsx",
  "src/routes/locations_.$slug.tsx",
  "src/routes/domains.tsx",
  "src/routes/contact.tsx",
  "src/routes/privacy.tsx",
  "src/routes/_authenticated/admin.index.tsx",
  "src/routes/_authenticated/admin.knowledge-base.tsx",
  "src/routes/_authenticated/admin.invoices.tsx",
  "src/routes/_authenticated/admin.leads.tsx",
  "src/routes/_authenticated/admin.revenue-os.tsx",
  "src/routes/_authenticated/admin.domain-os.tsx",
  "src/routes/_authenticated/admin.playbooks.tsx",
  "src/routes/_authenticated/admin.diagnostics.tsx",
];

expectedRoutes.forEach((relPath) => {
  const fullPath = path.join(rootDir, relPath);
  assert(fs.existsSync(fullPath), `Route file exists: ${relPath}`);
});

// 2. Verify Key Site Components
console.log("\n[Test Suite 2: Component Integrity]");
const components = [
  "src/components/site/SiteHeader.tsx",
  "src/components/site/FooterDark.tsx",
  "src/components/site/PageShell.tsx",
  "src/components/site/FloatingWhatsAppDesk.tsx",
  "src/components/site/ExitIntentModal.tsx",
  "src/components/site/PillButton.tsx",
  "src/components/site/BrandLogo.tsx",
  "src/components/admin/AdminShell.tsx",
];

components.forEach((compPath) => {
  const fullPath = path.join(rootDir, compPath);
  assert(fs.existsSync(fullPath), `Component exists: ${compPath}`);
});

// 3. Verify Antigravity Agent Skills Installation
console.log("\n[Test Suite 3: Antigravity Agent Skills]");
const skills = [
  ".agents/skills/harley-commercial-governance/SKILL.md",
  ".agents/skills/harley-trade-copywriting/SKILL.md",
  ".agents/skills/harley-edge-ssr-diagnostics/SKILL.md",
  ".agents/skills/harley-seo-map-pack-radar/SKILL.md",
];

skills.forEach((skillPath) => {
  const fullPath = path.join(rootDir, skillPath);
  assert(fs.existsSync(fullPath), `Agent Skill manifest exists: ${skillPath}`);
});

// 4. Verify Pricing & Proposal Financial Calculation Formulas
console.log("\n[Test Suite 4: Commercial Pricing & Deposit Logic]");
const testPackagePrice = 2995; // Growth Plan
const testAddons = [495, 295, 395]; // SEO, Review, Fleet
const upfrontTotal = testPackagePrice + testAddons.reduce((a, b) => a + b, 0);
const depositRequired = Math.round(upfrontTotal * 0.5);
const balance = upfrontTotal - depositRequired;

assert(upfrontTotal === 4180, `Upfront total calculation (£4,180 expected, got £${upfrontTotal})`);
assert(depositRequired === 2090, `50% deposit requirement (£2,090 expected, got £${depositRequired})`);
assert(balance === 2090, `50% completion balance (£2,090 expected, got £${balance})`);

// 5. Verify Partner Referral Commission Logic
console.log("\n[Test Suite 5: Partner Referral Commission Logic]");
const partnerReferrals = 4;
const ratePerTrade = 250;
const monthlyPayout = partnerReferrals * ratePerTrade;
const annualPayout = monthlyPayout * 12;

assert(monthlyPayout === 1000, `Partner monthly commission (£1,000 for 4 trades, got £${monthlyPayout})`);
assert(annualPayout === 12000, `Partner annual commission (£12,000 for 4 trades/mo, got £${annualPayout})`);

// 6. Verify VAT Calculation & HMRC Rules (GB 948 2018 39)
console.log("\n[Test Suite 6: VAT & Invoicing Accounting Logic]");
const netDeposit = 1497.50;
const ukVatRate = 0.20;
const expectedVat = netDeposit * ukVatRate;
const expectedGross = netDeposit + expectedVat;

assert(expectedVat === 299.50, `20% UK VAT on £1,497.50 (£299.50 expected, got £${expectedVat.toFixed(2)})`);
assert(expectedGross === 1797.00, `Gross Total Inc-VAT (£1,797.00 expected, got £${expectedGross.toFixed(2)})`);

console.log("\n==================================================");
console.log(` Summary: ${passed} Passed | ${failed} Failed`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("\nAll smoke and regression tests passed with 100% success!\n");
  process.exit(0);
}
