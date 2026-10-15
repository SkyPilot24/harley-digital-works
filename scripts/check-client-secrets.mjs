import { readFile, readdir } from "node:fs/promises";
import { parseEnv } from "node:util";
import { gunzipSync, brotliDecompressSync } from "node:zlib";

const config = parseEnv(await readFile(new URL("../.env.local", import.meta.url), "utf8"));
if (!config.SUPABASE_SERVICE_ROLE_KEY?.trim())
  throw new Error("Private staging key required for a meaningful exposure check");
const needles = [config.SUPABASE_SERVICE_ROLE_KEY, config.STRIPE_WEBHOOK_SECRET]
  .filter((value) => typeof value === "string" && value.length > 10)
  .flatMap((value) => [value, encodeURIComponent(value), Buffer.from(value).toString("base64")])
  .map((value) => Buffer.from(value));
let files = 0;
let exposed = 0;
async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) await scan(path);
    else if (entry.isFile()) {
      let content = await readFile(path);
      if (entry.name.endsWith(".gz")) content = gunzipSync(content);
      if (entry.name.endsWith(".br")) content = brotliDecompressSync(content);
      files++;
      if (needles.some((needle) => content.includes(needle))) exposed++;
    } else throw new Error("Unexpected public artifact type; exposure check incomplete");
  }
}
await scan(new URL("../.output/public/", import.meta.url));
if (!files) throw new Error("No built public artifacts found");
console.log(`Public artifacts inspected: ${files}`);
console.log(
  exposed
    ? "FAIL: Configured private value found in public build"
    : "PASS: Configured private values absent from public build",
);
console.log(
  "Checks exact raw, URI-encoded and base64 values, including compressed assets; not a general secret scanner or deployment proof.",
);
process.exitCode = exposed ? 1 : 0;
