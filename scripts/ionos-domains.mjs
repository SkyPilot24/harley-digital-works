#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

// Attempt to load .env.local if present
function loadEnv() {
  if (process.env.IONOS_API_KEY) return;
  const envLocalPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envLocalPath)) {
    const lines = fs.readFileSync(envLocalPath, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("IONOS_API_KEY=")) {
        const val = trimmed
          .slice("IONOS_API_KEY=".length)
          .trim()
          .replace(/^["']|["']$/g, "");
        process.env.IONOS_API_KEY = val;
        break;
      }
    }
  }
}

loadEnv();

const apiKey = process.env.IONOS_API_KEY;

if (!apiKey) {
  console.error("Error: IONOS_API_KEY is not defined in environment or .env.local");
  process.exit(1);
}

const BASE_URL = "https://api.hosting.ionos.com";

const headers = {
  "X-API-Key": apiKey,
  Accept: "application/json",
};

async function apiRequest(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`IONOS API error (${response.status} ${response.statusText}): ${errorBody}`);
  }
  return response.json();
}

/**
 * Lists all domains registered in the IONOS account
 */
export async function listDomains() {
  const data = await apiRequest("/domains/v1/domainitems");
  return data.domains || [];
}

/**
 * Gets detailed metadata for a specific domain by name or ID
 */
export async function getDomainDetails(domainNameOrId) {
  const domains = await listDomains();
  const target = domains.find(
    (d) => d.id === domainNameOrId || d.name?.toLowerCase() === domainNameOrId.toLowerCase(),
  );

  if (!target) {
    throw new Error(`Domain "${domainNameOrId}" not found in IONOS account.`);
  }

  const detail = await apiRequest(`/domains/v1/domainitems/${target.id}`);
  return detail;
}

/**
 * Gets all DNS zones
 */
export async function listDnsZones() {
  return apiRequest("/dns/v1/zones");
}

// CLI Execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "check";
  const targetDomain = args[1] || "buydronesupplies.co.uk";

  try {
    if (command === "list") {
      console.log("Fetching all domains from IONOS...");
      const domains = await listDomains();
      console.log(`Found ${domains.length} domains:`);
      console.table(
        domains.map((d) => ({
          Name: d.name,
          TLD: d.tld,
          ID: d.id,
          CancelOnExpire: d.cancelOnExpire,
        })),
      );
    } else if (command === "zones") {
      console.log("Fetching DNS zones from IONOS...");
      const zones = await listDnsZones();
      console.log(`Found ${zones.length} DNS zones:`);
      console.table(
        zones.map((z) => ({
          Name: z.name,
          ID: z.id,
          Type: z.type,
        })),
      );
    } else if (command === "check") {
      console.log(`Inspecting domain "${targetDomain}" via IONOS API...`);
      const detail = await getDomainDetails(targetDomain);

      const expiry = detail.expirationDate ? new Date(detail.expirationDate) : null;
      const now = new Date();
      const daysUntilExpiry = expiry
        ? Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      console.log("\n--- Domain Details ---");
      console.log(`Domain:          ${detail.name}`);
      console.log(`ID:              ${detail.id}`);
      console.log(`Type:            ${detail.domainType}`);
      console.log(`Auto-Renew:      ${detail.autoRenew ? "YES" : "NO"}`);
      console.log(`Cancel On Expiry:${detail.cancelOnExpire ? "YES" : "NO"}`);
      console.log(`Expiration Date: ${detail.expirationDate || "N/A"}`);
      console.log(
        `Days Remaining:  ${daysUntilExpiry !== null ? daysUntilExpiry + " days" : "Unknown"}`,
      );
      console.log(`DNSSEC:          ${detail.dnsSecEnabled ? "Enabled" : "Disabled"}`);
      console.log(`Domain Guard:    ${detail.domainGuardEnabled ? "Enabled" : "Disabled"}`);
      console.log(
        `Transfer Lock:   ${detail.transferLockAvailability ? "Available" : "Unavailable"}`,
      );
      console.log("----------------------\n");
    } else {
      console.log("Usage:");
      console.log("  node scripts/ionos-domains.mjs check [domain-name]");
      console.log("  node scripts/ionos-domains.mjs list");
      console.log("  node scripts/ionos-domains.mjs zones");
    }
  } catch (err) {
    console.error("Execution error:", err.message);
    process.exit(1);
  }
}

import { fileURLToPath } from "node:url";

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
) {
  main();
}
