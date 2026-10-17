import test from "node:test";
import assert from "node:assert/strict";
import {
  observeAuthSession,
  signOutWithPrivateCache,
  clearNonRoleQueries,
} from "../src/lib/auth-session.ts";
import { QueryClient } from "@tanstack/react-query";

const session = (id) => ({ user: { id } });
const tick = () => new Promise((resolve) => setImmediate(resolve));
test("access failure removes private records while retaining the role failure/denial", () => {
  const cache = new QueryClient();
  cache.setQueryData(["is-admin", "owner"], false);
  cache.setQueryData(["leads"], [{ name: "Private fixture" }]);
  cache.setQueryData(["delivery-review", "owner"], { content: "Private revision" });
  clearNonRoleQueries(cache);
  assert.equal(cache.getQueryData(["is-admin", "owner"]), false);
  assert.equal(cache.getQueryData(["leads"]), undefined);
  assert.equal(cache.getQueryData(["delivery-review", "owner"]), undefined);
  cache.clear();
});
function fixture(read, initialUser = null) {
  const states = [];
  const trace = [];
  let emit;
  let unsubscribed = false;
  const auth = {
    getSession: read,
    onAuthStateChange: (callback) => {
      emit = callback;
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              unsubscribed = true;
            },
          },
        },
      };
    },
  };
  const current = { current: initialUser };
  const stop = observeAuthSession(
    auth,
    (state) => {
      states.push(state);
      trace.push(`state:${state.session?.user.id ?? "none"}`);
    },
    () => trace.push("clear"),
    current,
  );
  return {
    states,
    trace,
    current,
    stop,
    emit: (...args) => emit(...args),
    unsubscribed: () => unsubscribed,
  };
}
test("a newer auth event wins over an older pending session read", async () => {
  let finish;
  const observed = fixture(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  await tick();
  observed.emit("SIGNED_IN", session("new-user"));
  finish({ data: { session: null }, error: null });
  await tick();
  assert.equal(observed.states.at(-1).session.user.id, "new-user");
  assert.deepEqual(observed.trace.slice(-2), ["clear", "state:new-user"]);
  observed.stop();
});
test("returned errors, rejected promises and synchronous throws end loading and clear private data", async () => {
  const failure = new Error("Storage unavailable");
  for (const read of [
    async () => ({ data: { session: null }, error: failure }),
    async () => {
      throw failure;
    },
    () => {
      throw failure;
    },
  ]) {
    const observed = fixture(read, "previous-user");
    await tick();
    assert.equal(observed.states.at(-1).loading, false);
    assert.equal(observed.states.at(-1).error, failure);
    assert.equal(observed.states.at(-1).session, null);
    assert.equal(observed.current.current, null);
    assert(observed.trace.includes("clear"));
    observed.stop();
  }
});
test("sign-out and account changes clear cached records before publishing the new identity", async () => {
  const observed = fixture(
    async () => ({ data: { session: session("owner") }, error: null }),
    "owner",
  );
  await tick();
  observed.emit("TOKEN_REFRESHED", session("owner"));
  assert.equal(observed.trace.filter((item) => item === "clear").length, 0);
  observed.emit("SIGNED_OUT", null);
  assert.deepEqual(observed.trace.slice(-2), ["clear", "state:none"]);
  observed.emit("SIGNED_IN", session("other"));
  assert.deepEqual(observed.trace.slice(-2), ["clear", "state:other"]);
  observed.stop();
});
test("stopped observers unsubscribe and ignore late results and events", async () => {
  let finish;
  const observed = fixture(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  await tick();
  observed.stop();
  const count = observed.states.length;
  finish({ data: { session: session("late") }, error: null });
  observed.emit("SIGNED_IN", session("late-event"));
  await tick();
  assert.equal(observed.states.length, count);
  assert(observed.unsubscribed());
});
test("sign-out errors propagate and private cache is still cleared", async () => {
  const order = [];
  const failure = new Error("Sign-out unavailable");
  await assert.rejects(
    signOutWithPrivateCache(
      {
        signOut: async () => {
          order.push("signOut");
          return { error: failure };
        },
      },
      { cancelQueries: async () => order.push("cancel"), clear: () => order.push("clear") },
    ),
    (error) => error === failure,
  );
  assert.deepEqual(order, ["cancel", "clear", "signOut"]);
});
test("cancellation failure still clears cached private data without claiming sign-out", async () => {
  let cleared = false;
  let signedOut = false;
  await assert.rejects(
    signOutWithPrivateCache(
      {
        signOut: async () => {
          signedOut = true;
          return { error: null };
        },
      },
      {
        cancelQueries: async () => {
          throw new Error("Cancellation failed");
        },
        clear: () => {
          cleared = true;
        },
      },
    ),
  );
  assert(cleared);
  assert.equal(signedOut, false);
});
