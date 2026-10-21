import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireAdmin } from "../src/lib/require-admin.server.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.resolve(__dirname, "../src");

const ALLOWLIST = new Set(["submitLead"]);

/**
 * Recursively find all .ts and .tsx files in a directory.
 */
function getSourceFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getSourceFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Scan source content for `export const <name> = createServerFn` statements
 * and determine if each includes `.middleware([requireSupabaseAuth])`.
 */
function scanServerFunctions(filePath, content) {
  const exports = [];
  const regex = /export\s+(?:const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*createServerFn\b/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const fnName = match[1];
    const startIndex = match.index;

    // Scan up to the .handler call or next 600 characters
    const remaining = content.slice(startIndex);
    const handlerMatch = remaining.match(/\.handler\s*\(/);
    const chain = handlerMatch
      ? remaining.slice(0, handlerMatch.index + handlerMatch[0].length)
      : remaining.slice(0, 600);

    const hasRequireAuth = chain.includes("requireSupabaseAuth") && chain.includes(".middleware");

    exports.push({
      filePath: path.relative(path.resolve(__dirname, ".."), filePath).replace(/\\/g, "/"),
      fnName,
      hasRequireAuth,
      chain,
    });
  }

  return exports;
}

test("Server Function Auth Scan: all createServerFn exports enforce requireSupabaseAuth (except allowlisted)", async (t) => {
  const sourceFiles = getSourceFiles(SRC_DIR);
  assert(sourceFiles.length > 0, "Source directory must contain files to scan");

  const allServerFunctions = [];
  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, "utf8");
    if (content.includes("createServerFn")) {
      const found = scanServerFunctions(file, content);
      allServerFunctions.push(...found);
    }
  }

  assert(
    allServerFunctions.length >= 10,
    `Expected at least 10 server functions in codebase, found ${allServerFunctions.length}`,
  );

  const missingAuth = [];

  for (const fn of allServerFunctions) {
    if (ALLOWLIST.has(fn.fnName)) {
      t.diagnostic(`Allowlisted public server function: ${fn.fnName} in ${fn.filePath}`);
      continue;
    }

    if (!fn.hasRequireAuth) {
      missingAuth.push(`${fn.fnName} (${fn.filePath})`);
    }
  }

  assert.equal(
    missingAuth.length,
    0,
    `Found server functions missing .middleware([requireSupabaseAuth]):\n${missingAuth.join("\n")}`,
  );
});

test("Server Function Auth Scan: explicit allowlist contains only submitLead", () => {
  assert.deepEqual(
    Array.from(ALLOWLIST),
    ["submitLead"],
    "ALLOWLIST must strictly be ['submitLead']",
  );
});

test("requireAdmin helper: permits authenticated users with admin role", async () => {
  const mockClient = {
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            maybeSingle: async () => ({
              data: { role: "admin" },
              error: null,
            }),
          }),
        }),
      }),
    }),
  };

  await assert.doesNotReject(async () => {
    await requireAdmin("user-admin-123", mockClient);
  });
});

test("requireAdmin helper: returns 403 Response for non-admin users", async () => {
  const mockClient = {
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            maybeSingle: async () => ({
              data: null, // No admin role found
              error: null,
            }),
          }),
        }),
      }),
    }),
  };

  await assert.rejects(
    async () => {
      await requireAdmin("user-regular-456", mockClient);
    },
    (err) => {
      assert(err instanceof Response, "Expected thrown error to be a Response object");
      assert.equal(err.status, 403, "Expected HTTP 403 Forbidden status");
      return true;
    },
  );
});

test("requireAdmin helper: propagates database error", async () => {
  const mockClient = {
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            maybeSingle: async () => ({
              data: null,
              error: { message: "Database connection failed" },
            }),
          }),
        }),
      }),
    }),
  };

  await assert.rejects(
    async () => {
      await requireAdmin("user-admin-123", mockClient);
    },
    {
      name: "Error",
      message: "Database connection failed",
    },
  );
});
