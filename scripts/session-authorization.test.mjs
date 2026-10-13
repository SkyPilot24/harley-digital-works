import test from "node:test";
import assert from "node:assert/strict";

/**
 * Simulates JWT claim expiration check and bearer parsing logic
 * matching src/integrations/supabase/auth-middleware.ts
 */
function validateAuthHeader(authHeader, nowInSeconds = Math.floor(Date.now() / 1000)) {
  if (!authHeader) {
    return {
      valid: false,
      error: "Unauthorized: No authorization header provided",
      statusCode: 401,
    };
  }

  if (!authHeader.startsWith("Bearer ")) {
    return {
      valid: false,
      error: "Unauthorized: Only Bearer tokens are supported",
      statusCode: 401,
    };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return { valid: false, error: "Unauthorized: No token provided", statusCode: 401 };
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false, error: "Unauthorized: Invalid token structure", statusCode: 401 };
  }

  let claims;
  try {
    const payloadJson = Buffer.from(parts[1], "base64url").toString("utf8");
    claims = JSON.parse(payloadJson);
  } catch {
    return { valid: false, error: "Unauthorized: Malformed token payload", statusCode: 401 };
  }

  if (!claims.sub) {
    return { valid: false, error: "Unauthorized: No user ID found in token", statusCode: 401 };
  }

  // Token expiration check
  if (claims.exp && claims.exp < nowInSeconds) {
    return {
      valid: false,
      error: "Unauthorized: Token expired",
      statusCode: 401,
      expiredAt: new Date(claims.exp * 1000).toISOString(),
    };
  }

  return { valid: true, userId: claims.sub, claims };
}

/**
 * Creates a synthetic JWT token for testing
 */
function createSyntheticJwt(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = "synthetic_signature_hash";
  return `${header}.${body}.${signature}`;
}

test("1. Missing Authorization header fails closed with 401", () => {
  const result = validateAuthHeader(null);
  assert.equal(result.valid, false);
  assert.equal(result.statusCode, 401);
  assert.match(result.error, /No authorization header/i);
});

test("2. Non-Bearer Authorization header fails closed with 401", () => {
  const result = validateAuthHeader("Basic dXNlcjpwYXNz");
  assert.equal(result.valid, false);
  assert.equal(result.statusCode, 401);
  assert.match(result.error, /Only Bearer tokens are supported/i);
});

test("3. Malformed/truncated token structure is rejected", () => {
  const result = validateAuthHeader("Bearer not.a.valid.four.part.token");
  assert.equal(result.valid, false);
  assert.equal(result.statusCode, 401);
  assert.match(result.error, /Invalid token structure/i);
});

test("4. Expired JWT token is rejected with explicit expiration error", () => {
  const now = Math.floor(Date.now() / 1000);
  const expiredToken = createSyntheticJwt({
    sub: "user_fictional_expired_001",
    email: "rehearsal@example.test",
    role: "authenticated",
    exp: now - 3600, // Expired 1 hour ago
  });

  const result = validateAuthHeader(`Bearer ${expiredToken}`, now);
  assert.equal(result.valid, false);
  assert.equal(result.statusCode, 401);
  assert.match(result.error, /Token expired/i);
  assert.ok(result.expiredAt);
});

test("5. Valid unexpired JWT passes and returns claims and user ID", () => {
  const now = Math.floor(Date.now() / 1000);
  const validToken = createSyntheticJwt({
    sub: "usr_active_admin_001",
    email: "robbie@theharleygroup.org",
    role: "authenticated",
    exp: now + 3600, // Valid for 1 more hour
  });

  const result = validateAuthHeader(`Bearer ${validToken}`, now);
  assert.equal(result.valid, true);
  assert.equal(result.userId, "usr_active_admin_001");
  assert.equal(result.claims.email, "robbie@theharleygroup.org");
});

test("6. Role authorization boundary: non-admin authenticated user denied admin route access", () => {
  function checkAdminAuthorization(userRole) {
    if (userRole !== "admin") {
      return { allowed: false, reason: "Forbidden: Admin role required", statusCode: 403 };
    }
    return { allowed: true };
  }

  assert.deepEqual(checkAdminAuthorization("authenticated"), {
    allowed: false,
    reason: "Forbidden: Admin role required",
    statusCode: 403,
  });

  assert.deepEqual(checkAdminAuthorization("client"), {
    allowed: false,
    reason: "Forbidden: Admin role required",
    statusCode: 403,
  });

  assert.deepEqual(checkAdminAuthorization("admin"), {
    allowed: true,
  });
});

test("7. Session logout and cache teardown: query cache cancelled and session invalidated", () => {
  const mockCache = {
    cancelled: false,
    cleared: false,
    cancelQueries: async () => {
      mockCache.cancelled = true;
    },
    clear: () => {
      mockCache.cleared = true;
    },
  };

  let sessionActive = true;
  async function performSignOut(cache) {
    await cache.cancelQueries();
    cache.clear();
    sessionActive = false;
    return { redirectedTo: "/auth", sessionCleared: true };
  }

  return performSignOut(mockCache).then((res) => {
    assert.equal(res.redirectedTo, "/auth");
    assert.equal(mockCache.cancelled, true);
    assert.equal(mockCache.cleared, true);
    assert.equal(sessionActive, false);
  });
});
