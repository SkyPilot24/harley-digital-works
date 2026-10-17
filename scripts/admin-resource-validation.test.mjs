import assert from "node:assert/strict";
import { test } from "node:test";
import { parseResourceInput } from "../src/lib/admin-resource-validation.ts";
test("CMS ordering rejects non-finite, decimal and out-of-range values", () => {
  const fields = [{ name: "sort_order", label: "Sort order", type: "number" }];
  for (const value of ["Infinity", "NaN", "1.2", "1e4", "2147483648"])
    assert.throws(() => parseResourceInput(fields, { sort_order: value }));
  assert.deepEqual(parseResourceInput(fields, { sort_order: "0" }), { sort_order: 0 });
  assert.deepEqual(parseResourceInput(fields, { sort_order: "" }), { sort_order: null });
});
test("CMS accepts only declared options and safe URLs", () => {
  assert.throws(() =>
    parseResourceInput([{ name: "status", label: "Status", type: "select", options: ["draft"] }], {
      status: "published",
    }),
  );
  assert.throws(() =>
    parseResourceInput([{ name: "url", label: "URL", type: "url" }], {
      url: "javascript:alert(1)",
    }),
  );
  assert.throws(() =>
    parseResourceInput([{ name: "title", label: "Title", required: true }], { title: " " }),
  );
});
test("CMS preserves checkbox semantics and validates contact fields", () => {
  assert.deepEqual(
    parseResourceInput([{ name: "published", label: "Published", type: "checkbox" }], {}),
    { published: false },
  );
  assert.throws(() =>
    parseResourceInput([{ name: "email", label: "Email", type: "email" }], {
      email: "not an email",
    }),
  );
});
