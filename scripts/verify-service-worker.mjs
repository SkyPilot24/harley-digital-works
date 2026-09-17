import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
function harness(fetch) {
  const handlers = {};
  const deleted = [];
  const offline = new Response("offline fallback");
  vm.runInNewContext(source, {
    self: {
      location: { origin: "https://example.com" },
      addEventListener: (name, fn) => (handlers[name] = fn),
      skipWaiting() {},
      clients: { claim() {} },
    },
    caches: {
      match: async () => offline,
      keys: async () => [
        "harley-digital-works-cache-v2",
        "harley-digital-works-cache-v3",
        "unrelated-cache",
      ],
      delete: async (name) => deleted.push(name),
    },
    fetch,
    URL,
    Response,
    console,
  });
  return { handlers, deleted, offline };
}
test("navigation fetches fresh HTML even when cached content exists", async () => {
  const fresh = new Response("current release");
  const { handlers } = harness(async () => fresh);
  let result;
  handlers.fetch({
    request: { url: "https://example.com/", method: "GET", mode: "navigate" },
    respondWith: (value) => (result = value),
  });
  assert.equal(await result, fresh);
});
test("offline navigation receives the offline page", async () => {
  const { handlers, offline } = harness(async () => {
    throw new Error("offline");
  });
  let result;
  handlers.fetch({
    request: { url: "https://example.com/", method: "GET", mode: "navigate" },
    respondWith: (value) => (result = value),
  });
  assert.equal(await result, offline);
});
test("activation removes only obsolete caches owned by this app", async () => {
  const { handlers, deleted } = harness(async () => new Response());
  let result;
  handlers.activate({ waitUntil: (value) => (result = value) });
  await result;
  assert.deepEqual(deleted, ["harley-digital-works-cache-v2"]);
});
