import test from "node:test";
import assert from "node:assert/strict";
import { requireDeliverySession } from "../src/lib/delivery-session.server.ts";
const user = "00000000-0000-4000-8000-000000000001";
const session = "00000000-0000-4000-8000-000000000002";
test("verified session claims are required and storage uncertainty fails closed", async () => {
  let calls = 0;
  const db = {
    rpc: async (name, args) => {
      calls++;
      assert.equal(name, "delivery_session_active");
      assert.deepEqual(args, { p_user_id: user, p_session_id: session });
      return { data: true, error: null };
    },
  };
  for (const claims of [{}, { session_id: "forged" }, { session_id: null }])
    await assert.rejects(requireDeliverySession(db, user, claims), (e) => e.status === 401);
  assert.equal(calls, 0);
  await requireDeliverySession(db, user, { session_id: session });
  for (const data of [false, null, "true"])
    await assert.rejects(
      requireDeliverySession({ rpc: async () => ({ data, error: null }) }, user, {
        session_id: session,
      }),
      (e) => e.status === 401,
    );
  await assert.rejects(
    requireDeliverySession(
      { rpc: async () => ({ data: true, error: { message: "offline" } }) },
      user,
      { session_id: session },
    ),
    (e) => e.status === 503,
  );
});
