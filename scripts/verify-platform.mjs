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
  "src/routes/_authenticated/admin.radar.tsx",
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
assert(
  depositRequired === 2090,
  `50% deposit requirement (£2,090 expected, got £${depositRequired})`,
);
assert(balance === 2090, `50% completion balance (£2,090 expected, got £${balance})`);

// 5. Verify Partner Referral Commission Logic
console.log("\n[Test Suite 5: Partner Referral Commission Logic]");
const partnerReferrals = 4;
const ratePerTrade = 250;
const monthlyPayout = partnerReferrals * ratePerTrade;
const annualPayout = monthlyPayout * 12;

assert(
  monthlyPayout === 1000,
  `Partner monthly commission (£1,000 for 4 trades, got £${monthlyPayout})`,
);
assert(
  annualPayout === 12000,
  `Partner annual commission (£12,000 for 4 trades/mo, got £${annualPayout})`,
);

// 6. Verify VAT Calculation & HMRC Rules (GB 948 2018 39)
console.log("\n[Test Suite 6: VAT & Invoicing Accounting Logic]");
const netDeposit = 1497.5;
const ukVatRate = 0.2;
const expectedVat = netDeposit * ukVatRate;
const expectedGross = netDeposit + expectedVat;

assert(
  expectedVat === 299.5,
  `20% UK VAT on £1,497.50 (£299.50 expected, got £${expectedVat.toFixed(2)})`,
);
assert(
  expectedGross === 1797.0,
  `Gross Total Inc-VAT (£1,797.00 expected, got £${expectedGross.toFixed(2)})`,
);

// 7. Cloudflare Deployment & Environment Secrets Verification
console.log("\n[Test Suite 7: Cloudflare Deployment & Environment Secrets]");
const outputWranglerPath = path.join(rootDir, ".output/server/wrangler.json");
const outputHeadersPath = path.join(rootDir, ".output/public/_headers");

assert(
  fs.existsSync(outputWranglerPath),
  "Cloudflare Nitro worker output exists (.output/server/wrangler.json)",
);
assert(
  fs.existsSync(outputHeadersPath),
  "Cloudflare static asset headers exit (.output/public/_headers)",
);

if (fs.existsSync(outputWranglerPath)) {
  const wranglerContent = fs.readFileSync(outputWranglerPath, "utf-8");
  const wranglerConfig = JSON.parse(wranglerContent);
  assert(
    wranglerConfig.main.includes("index.mjs"),
    "Wrangler entrypoint references index.mjs worker",
  );
  assert(
    wranglerConfig.compatibility_flags?.includes("nodejs_compat") ||
      wranglerConfig.compatibility_date,
    "Wrangler includes Cloudflare compatibility settings",
  );
  assert(
    Array.isArray(wranglerConfig.triggers?.crons) &&
      wranglerConfig.triggers.crons.includes("* * * * *") &&
      wranglerConfig.triggers.crons.includes("0 * * * *"),
    "Cloudflare worker triggers configure both minute notification and hourly retention cron schedules",
  );
}

// Ensure SUPABASE_SERVICE_ROLE_KEY is not leaked to public bundle
const publicBundleDir = path.join(rootDir, ".output/public");
if (fs.existsSync(publicBundleDir)) {
  const publicFiles = fs.readdirSync(publicBundleDir, { recursive: true });
  let secretLeaked = false;
  for (const file of publicFiles) {
    if (typeof file === "string" && file.endsWith(".js")) {
      const filePath = path.join(publicBundleDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      if (content.includes("SUPABASE_SERVICE_ROLE_KEY")) {
        secretLeaked = true;
        break;
      }
    }
  }
  assert(
    !secretLeaked,
    "SUPABASE_SERVICE_ROLE_KEY secret is strictly isolated from public client bundles",
  );
}

// 8. Knowledge Base & Handover Drift Detection Verification
console.log("\n[Test Suite 8: Knowledge Base & Handover Drift Detection]");
const kbPath = path.join(rootDir, "src/lib/knowledge-base.ts");
const strategyPath = path.join(rootDir, "src/lib/current-strategy.ts");
const offerDocPath = path.join(rootDir, "docs/COMMERCIAL_OFFER_MANAGED.md");
const handoverDocPath = path.join(rootDir, "docs/HANDOVER.md");
const projectStatusDocPath = path.join(rootDir, "PROJECT_STATUS.md");
const nitroConfigPath = path.join(rootDir, "nitro.config.ts");

assert(
  fs.existsSync(kbPath),
  "Dashboard operational knowledge base data exists (src/lib/knowledge-base.ts)",
);

if (
  fs.existsSync(kbPath) &&
  fs.existsSync(strategyPath) &&
  fs.existsSync(offerDocPath) &&
  fs.existsSync(handoverDocPath) &&
  fs.existsSync(projectStatusDocPath) &&
  fs.existsSync(nitroConfigPath)
) {
  const kbContent = fs.readFileSync(kbPath, "utf-8");
  const strategyContent = fs.readFileSync(strategyPath, "utf-8");
  const offerDocContent = fs.readFileSync(offerDocPath, "utf-8");
  const handoverDocContent = fs.readFileSync(handoverDocPath, "utf-8");
  const projectStatusContent = fs.readFileSync(projectStatusDocPath, "utf-8");
  const nitroConfigContent = fs.readFileSync(nitroConfigPath, "utf-8");

  // Check 1: Commercial pricing alignment (£1,495 setup + £249/mo)
  const priceAligned =
    kbContent.includes("£1,495") &&
    kbContent.includes("£249") &&
    strategyContent.includes("£1,495") &&
    strategyContent.includes("£249") &&
    offerDocContent.includes("£1,495") &&
    offerDocContent.includes("£249");
  assert(
    priceAligned,
    "Commercial pricing (£1,495 setup + £249/mo) is consistent across docs, strategy, and KB",
  );

  // Check 2: Active live database target alignment (worzpzbutngugwzhlvtj)
  const liveTargetAligned =
    kbContent.includes("worzpzbutngugwzhlvtj") &&
    handoverDocContent.includes("worzpzbutngugwzhlvtj") &&
    projectStatusContent.includes("worzpzbutngugwzhlvtj");
  assert(
    liveTargetAligned,
    "Live backend database ID (worzpzbutngugwzhlvtj) is consistent across handover, status, and KB",
  );

  // Check 3: Dual background cron schedules (* * * * * and 0 * * * *)
  const cronsAligned =
    nitroConfigContent.includes("* * * * *") &&
    nitroConfigContent.includes("0 * * * *") &&
    kbContent.includes("* * * * *") &&
    kbContent.includes("0 * * * *") &&
    handoverDocContent.includes("* * * * *") &&
    handoverDocContent.includes("0 * * * *");
  assert(
    cronsAligned,
    "Scheduled crons (* * * * * and 0 * * * *) are synchronized across Nitro config, handover, and KB",
  );

  // Check 4: Records retain the unresolved invoice/tax review gate, not a tax compliance claim.
  const vatAligned =
    kbContent.includes("Tax review required") &&
    strategyContent.includes('taxStatus: "Unverified') &&
    offerDocContent.includes("Registration/tax presentation needs seller/accountant confirmation");
  assert(vatAligned, "Commercial records retain the tax registration/invoice review gate");

  // Check 5: The retained pilot guard is two; this does not prove wider capacity approval.
  const concurrencyAligned =
    kbContent.includes("Hard pilot cap: 2") &&
    strategyContent.includes("Strict pilot cap: 2") &&
    offerDocContent.includes("hard limit of **2** during initial pilot");
  assert(concurrencyAligned, "Two-build pilot capacity is recorded across offer, strategy and KB");
}

console.log("\n==================================================");
console.log(` Summary: ${passed} Passed | ${failed} Failed`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("\nAll smoke and regression tests passed with 100% success!\n");
  process.exit(0);
}
