import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

test("smoke: unauthenticated admin access redirects to /auth with return target", () => {
  const adminShellPath = path.join(rootDir, "src", "components", "admin", "AdminShell.tsx");
  assert.ok(fs.existsSync(adminShellPath), "AdminShell.tsx must exist");
  const content = fs.readFileSync(adminShellPath, "utf8");

  // Verify unauthenticated check redirects to /auth
  assert.ok(
    content.includes('navigate({ to: "/auth"'),
    "AdminShell must redirect unauthenticated visitors to /auth",
  );
  assert.ok(
    content.includes("redirect: currentPath"),
    "AdminShell must pass currentPath as redirect query to return after auth",
  );
});

test("smoke: contact lead intake flow is configured and maps to valid database actions", () => {
  const leadIntakePath = path.join(rootDir, "src", "lib", "lead-intake.functions.ts");
  assert.ok(fs.existsSync(leadIntakePath), "lead-intake.functions.ts must exist");
  const content = fs.readFileSync(leadIntakePath, "utf8");

  assert.ok(content.includes("submitLead"), "submitLead server function must be exported");
  assert.ok(
    content.includes("verifyTurnstileToken"),
    "Turnstile verification must be integrated into lead intake",
  );
  assert.ok(
    content.includes("createRequestFingerprint"),
    "Request fingerprinting must be enforced for intake rate limiting",
  );
});

test("smoke: accessibility structure on key customer-facing pages (WCAG 2.1 AA essentials)", () => {
  const keyRoutes = [
    { file: path.join(rootDir, "src", "routes", "index.tsx"), name: "Home" },
    { file: path.join(rootDir, "src", "routes", "contact.tsx"), name: "Contact" },
    { file: path.join(rootDir, "src", "routes", "calculator.tsx"), name: "Calculator" },
    { file: path.join(rootDir, "src", "routes", "demos_.rg-electrical.tsx"), name: "Demo" },
  ];

  for (const route of keyRoutes) {
    assert.ok(fs.existsSync(route.file), `${route.name} route must exist`);
    const content = fs.readFileSync(route.file, "utf8");

    // Every key route must provide an h1 heading
    assert.ok(
      content.includes("<h1") || content.includes("h1:"),
      `${route.name} route must contain an <h1> heading element`,
    );
  }
});

test("smoke: global prefers-reduced-motion preference is respected", () => {
  const rootRoutePath = path.join(rootDir, "src", "routes", "__root.tsx");
  const rootContent = fs.readFileSync(rootRoutePath, "utf8");
  assert.ok(
    rootContent.includes('<MotionConfig reducedMotion="user">'),
    "__root.tsx must configure MotionConfig with reducedMotion='user'",
  );

  const homepageAnimPath = path.join(rootDir, "src", "hooks", "use-homepage-animations.ts");
  const animContent = fs.readFileSync(homepageAnimPath, "utf8");
  assert.ok(
    animContent.includes("prefers-reduced-motion: reduce"),
    "Homepage GSAP animations hook must check prefers-reduced-motion",
  );
});
