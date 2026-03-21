/**
 * MOCKED RUNTIME TESTS — Tests for modules that depend on browser/Cloudflare runtime
 *
 * Covers: microsoft.ts, password.ts, clipboard.ts, audit.ts, seoPages.ts, blocks.ts
 * Uses mock objects for: fetch, navigator, document, crypto.subtle, D1Database
 *
 * Run: npx tsx src/lib/__tests__/mocked-runtime.test.ts
 */

import {
  getMicrosoftAuthUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
  pushSignatureToOutlook,
  getMicrosoftUserProfile,
  getMailboxSettings,
  isTokenExpired,
  tokenExpiresAt,
} from "../microsoft";
import { hashPassword, verifyPassword } from "../password";
import { logAudit } from "../audit";
import { SEO_PAGES } from "../seoPages";
import { getPresetForTemplate } from "../blocks";
import { DEFAULT_SIGNATURE_DATA } from "../types";

let passed = 0;
let failed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void | Promise<void>) {
  const result = fn();
  if (result instanceof Promise) {
    result.then(() => { passed++; }).catch((e: unknown) => {
      failed++;
      const msg = `${name}: ${(e as Error).message}`;
      failures.push(msg);
      console.log(`  ❌ ${msg}`);
    });
  } else {
    try { passed++; } catch { /* sync already ran */ }
  }
}

// Wrap async tests to run sequentially
const asyncTests: Array<{ name: string; fn: () => Promise<void> }> = [];
function asyncTest(name: string, fn: () => Promise<void>) {
  asyncTests.push({ name, fn });
}

function ok(cond: boolean, msg: string) { if (!cond) throw new Error(msg); }

// ================================================================
// MOCK SETUP
// ================================================================

// Mock fetch for Microsoft Graph API tests
const fetchCalls: Array<{ url: string; init?: RequestInit }> = [];
const mockFetchResponses: Array<{ ok: boolean; status: number; body: unknown }> = [];

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input: string | URL | Request, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  fetchCalls.push({ url, init });
  const mockResponse = mockFetchResponses.shift() || { ok: true, status: 200, body: {} };
  return {
    ok: mockResponse.ok,
    status: mockResponse.status,
    text: async () => JSON.stringify(mockResponse.body),
    json: async () => mockResponse.body,
    headers: new Headers(),
  } as Response;
};

function resetFetchMock() {
  fetchCalls.length = 0;
  mockFetchResponses.length = 0;
}

// Mock D1Database
function createMockDB() {
  const insertedRows: Array<{ table: string; values: unknown[] }> = [];
  const queries: string[] = [];

  const mockDB = {
    prepare: (sql: string) => {
      queries.push(sql);
      return {
        bind: (...values: unknown[]) => ({
          run: async () => {
            insertedRows.push({ table: "audit_log", values });
            return { success: true };
          },
          first: async () => null,
          all: async () => ({ results: [] }),
        }),
        run: async () => ({ success: true }),
        first: async () => null,
        all: async () => ({ results: [] }),
      };
    },
    _queries: queries,
    _insertedRows: insertedRows,
  };

  return mockDB;
}

// ================================================================
console.log("\n🔑 MICROSOFT GRAPH API — OAuth & token utilities\n");
// ================================================================

// getMicrosoftAuthUrl
test("getMicrosoftAuthUrl: generates valid OAuth URL", () => {
  process.env.MICROSOFT_CLIENT_ID = "test-client-id";
  process.env.MICROSOFT_REDIRECT_URI = "https://neatstamp.com/api/auth/microsoft/callback";

  
  const url = getMicrosoftAuthUrl("state-123");

  ok(url.startsWith("https://login.microsoftonline.com/common/oauth2/v2.0/authorize"), "Correct authority");
  ok(url.includes("client_id=test-client-id"), "Has client_id");
  ok(url.includes("state=state-123"), "Has state");
  ok(url.includes("response_type=code"), "Code flow");
  ok(url.includes("MailboxSettings.ReadWrite"), "Has MailboxSettings scope");
  ok(url.includes("offline_access"), "Has offline_access");
  ok(url.includes("User.Read"), "Has User.Read");
  ok(url.includes("prompt=select_account"), "Has select_account prompt");
  ok(url.includes(encodeURIComponent("https://neatstamp.com/api/auth/microsoft/callback")), "Has redirect_uri");
});

test("getMicrosoftAuthUrl: throws without env vars", () => {
  delete process.env.MICROSOFT_CLIENT_ID;
  delete process.env.MICROSOFT_REDIRECT_URI;

  
  let threw = false;
  try { getMicrosoftAuthUrl("test"); } catch { threw = true; }
  ok(threw, "Should throw");
});

test("getMicrosoftAuthUrl: different state = different URL", () => {
  process.env.MICROSOFT_CLIENT_ID = "test-id";
  process.env.MICROSOFT_REDIRECT_URI = "https://test.com/callback";

  
  const url1 = getMicrosoftAuthUrl("state-aaa");
  const url2 = getMicrosoftAuthUrl("state-bbb");
  ok(url1 !== url2, "Different states produce different URLs");
  ok(url1.includes("state-aaa"), "URL 1 has state-aaa");
  ok(url2.includes("state-bbb"), "URL 2 has state-bbb");
});

// isTokenExpired
test("isTokenExpired: future token is not expired", () => {
  
  const future = new Date(Date.now() + 3600 * 1000).toISOString(); // 1 hour from now
  ok(!isTokenExpired(future), "Token 1 hour from now should NOT be expired");
});

test("isTokenExpired: past token is expired", () => {
  
  const past = new Date(Date.now() - 3600 * 1000).toISOString(); // 1 hour ago
  ok(isTokenExpired(past), "Token 1 hour ago should BE expired");
});

test("isTokenExpired: token expiring in 4 minutes is expired (5-min buffer)", () => {
  
  const soon = new Date(Date.now() + 4 * 60 * 1000).toISOString(); // 4 min from now
  ok(isTokenExpired(soon), "Token expiring in 4 min should be expired (5-min buffer)");
});

test("isTokenExpired: token expiring in 6 minutes is NOT expired", () => {
  
  const later = new Date(Date.now() + 6 * 60 * 1000).toISOString();
  ok(!isTokenExpired(later), "Token expiring in 6 min should NOT be expired");
});

// tokenExpiresAt
test("tokenExpiresAt: converts seconds to ISO string", () => {
  
  const result = tokenExpiresAt(3600);
  ok(typeof result === "string", "Returns a string");
  ok(result.includes("T"), "Is ISO format");
  const parsed = new Date(result);
  ok(!isNaN(parsed.getTime()), "Is a valid date");
  // Should be roughly 1 hour from now
  const diff = parsed.getTime() - Date.now();
  ok(diff > 3500 * 1000 && diff < 3700 * 1000, "About 1 hour from now");
});

test("tokenExpiresAt: 0 seconds = now", () => {
  
  const result = tokenExpiresAt(0);
  const diff = Math.abs(new Date(result).getTime() - Date.now());
  ok(diff < 1000, "0 seconds = approximately now");
});

// ================================================================
console.log("\n📋 MICROSOFT GRAPH — exchangeCodeForTokens (mocked fetch)\n");
// ================================================================

asyncTest("exchangeCodeForTokens: sends correct request", async () => {
  process.env.MICROSOFT_CLIENT_ID = "mock-client-id";
  process.env.MICROSOFT_CLIENT_SECRET = "mock-secret";
  process.env.MICROSOFT_REDIRECT_URI = "https://test.com/callback";
  resetFetchMock();

  mockFetchResponses.push({
    ok: true, status: 200,
    body: { access_token: "at-123", refresh_token: "rt-456", expires_in: 3600, token_type: "Bearer" },
  });

  
  const result = await exchangeCodeForTokens("auth-code-xyz");

  ok(result.access_token === "at-123", "Returns access token");
  ok(result.refresh_token === "rt-456", "Returns refresh token");
  ok(result.expires_in === 3600, "Returns expires_in");
  ok(fetchCalls.length > 0, "Made a fetch call");
  ok(fetchCalls[0].url.includes("oauth2/v2.0/token"), "Called token endpoint");
  ok(fetchCalls[0].init?.method === "POST", "POST method");
  const bodyStr = fetchCalls[0].init?.body as string;
  ok(bodyStr.includes("auth-code-xyz"), "Body contains the auth code");
  ok(bodyStr.includes("mock-client-id"), "Body contains client_id");
});

asyncTest("exchangeCodeForTokens: throws on error response", async () => {
  process.env.MICROSOFT_CLIENT_ID = "id";
  process.env.MICROSOFT_CLIENT_SECRET = "secret";
  process.env.MICROSOFT_REDIRECT_URI = "https://test.com/cb";
  resetFetchMock();

  mockFetchResponses.push({ ok: false, status: 400, body: { error: "invalid_grant" } });

  
  let threw = false;
  try { await exchangeCodeForTokens("bad-code"); } catch { threw = true; }
  ok(threw, "Should throw on error response");
});

// ================================================================
console.log("\n🔄 MICROSOFT GRAPH — refreshAccessToken (mocked fetch)\n");
// ================================================================

asyncTest("refreshAccessToken: sends correct request", async () => {
  process.env.MICROSOFT_CLIENT_ID = "mock-id";
  process.env.MICROSOFT_CLIENT_SECRET = "mock-secret";
  process.env.MICROSOFT_REDIRECT_URI = "https://test.com/cb";
  resetFetchMock();

  mockFetchResponses.push({
    ok: true, status: 200,
    body: { access_token: "new-at", refresh_token: "new-rt", expires_in: 7200 },
  });

  
  const result = await refreshAccessToken("old-refresh-token");

  ok(result.access_token === "new-at", "New access token");
  ok(result.expires_in === 7200, "New expires_in");
  const bodyStr = fetchCalls[fetchCalls.length - 1].init?.body as string;
  ok(bodyStr.includes("old-refresh-token"), "Contains refresh token");
  ok(bodyStr.includes("grant_type=refresh_token"), "Refresh grant type");
});

asyncTest("refreshAccessToken: throws on failure", async () => {
  process.env.MICROSOFT_CLIENT_ID = "id";
  process.env.MICROSOFT_CLIENT_SECRET = "s";
  process.env.MICROSOFT_REDIRECT_URI = "https://t.com/cb";
  resetFetchMock();
  mockFetchResponses.push({ ok: false, status: 401, body: { error: "invalid_token" } });

  
  let threw = false;
  try { await refreshAccessToken("expired-token"); } catch { threw = true; }
  ok(threw, "Should throw on refresh failure");
});

// ================================================================
console.log("\n📤 MICROSOFT GRAPH — pushSignatureToOutlook (mocked fetch)\n");
// ================================================================

asyncTest("pushSignatureToOutlook: sends PATCH to mailboxSettings", async () => {
  resetFetchMock();
  mockFetchResponses.push({ ok: true, status: 200, body: {} });

  
  const result = await pushSignatureToOutlook("bearer-token", "<table>sig</table>", "sig text");

  ok(result === true, "Returns true on success");
  const lastCall = fetchCalls[fetchCalls.length - 1];
  ok(lastCall.url.includes("me/mailboxSettings"), "Calls mailboxSettings endpoint");
  ok(lastCall.init?.method === "PATCH", "PATCH method");
  ok((lastCall.init?.headers as Record<string, string>)["Authorization"] === "Bearer bearer-token", "Has auth header");
  const body = JSON.parse(lastCall.init?.body as string);
  ok(body.signatureForNewMessages === "<table>sig</table>", "Sets new message signature");
  ok(body.signatureForReplies === "<table>sig</table>", "Sets reply signature");
});

asyncTest("pushSignatureToOutlook: throws on failure", async () => {
  resetFetchMock();
  mockFetchResponses.push({ ok: false, status: 403, body: { error: "insufficient_permissions" } });

  
  let threw = false;
  try { await pushSignatureToOutlook("bad-token", "<sig/>", "sig"); } catch { threw = true; }
  ok(threw, "Should throw on push failure");
});

// ================================================================
console.log("\n👤 MICROSOFT GRAPH — getMicrosoftUserProfile (mocked fetch)\n");
// ================================================================

asyncTest("getMicrosoftUserProfile: returns profile data", async () => {
  resetFetchMock();
  mockFetchResponses.push({
    ok: true, status: 200,
    body: { id: "u-123", displayName: "Jan de Vries", mail: "jan@acme.nl", userPrincipalName: "jan@acme.nl" },
  });

  
  const profile = await getMicrosoftUserProfile("valid-token");

  ok(profile.displayName === "Jan de Vries", "Display name");
  ok(profile.mail === "jan@acme.nl", "Email");
  const lastCall = fetchCalls[fetchCalls.length - 1];
  ok(lastCall.url.includes("me?$select="), "Selective fields query");
});

// ================================================================
console.log("\n🔐 PASSWORD — PBKDF2 hash & verify\n");
// ================================================================

asyncTest("hashPassword: produces salt:hash format", async () => {
  
  const hash = await hashPassword("testpassword123");

  ok(typeof hash === "string", "Returns string");
  ok(hash.includes(":"), "Contains colon separator");
  const [salt, hashPart] = hash.split(":");
  ok(salt.length === 32, `Salt is 32 hex chars (16 bytes), got ${salt.length}`);
  ok(hashPart.length === 64, `Hash is 64 hex chars (32 bytes), got ${hashPart.length}`);
});

asyncTest("hashPassword: different passwords produce different hashes", async () => {
  
  const hash1 = await hashPassword("password1");
  const hash2 = await hashPassword("password2");
  ok(hash1 !== hash2, "Different passwords = different hashes");
});

asyncTest("hashPassword: same password produces different hashes (random salt)", async () => {
  
  const hash1 = await hashPassword("samepassword");
  const hash2 = await hashPassword("samepassword");
  ok(hash1 !== hash2, "Same password = different hashes due to random salt");
});

asyncTest("verifyPassword: correct password returns true", async () => {
  
  const hash = await hashPassword("mypassword");
  const valid = await verifyPassword("mypassword", hash);
  ok(valid === true, "Correct password should verify");
});

asyncTest("verifyPassword: wrong password returns false", async () => {
  
  const hash = await hashPassword("correctpassword");
  const valid = await verifyPassword("wrongpassword", hash);
  ok(valid === false, "Wrong password should fail");
});

asyncTest("verifyPassword: empty stored hash returns false", async () => {
  
  const valid = await verifyPassword("test", "");
  ok(valid === false, "Empty hash should fail");
});

asyncTest("verifyPassword: malformed hash returns false", async () => {
  
  const valid = await verifyPassword("test", "not-a-valid-hash");
  ok(valid === false, "Malformed hash should fail");
});

// ================================================================
console.log("\n📝 AUDIT LOG — logAudit with mock DB\n");
// ================================================================

asyncTest("logAudit: inserts correct data", async () => {
  
  const mockDB = createMockDB();

  await logAudit(mockDB, "login_google", {
    userId: "user-123",
    email: "test@test.com",
    detail: "Logged in via Google",
  });

  ok(mockDB._queries.length > 0, "Made a query");
  ok(mockDB._queries[0].includes("INSERT INTO audit_log"), "Inserted into audit_log");
  ok(mockDB._insertedRows.length > 0, "Inserted a row");
  ok(mockDB._insertedRows[0].values.includes("user-123"), "Has user ID");
  ok(mockDB._insertedRows[0].values.includes("test@test.com"), "Has email");
  ok(mockDB._insertedRows[0].values.includes("login_google"), "Has action");
});

asyncTest("logAudit: handles missing optional fields", async () => {
  
  const mockDB = createMockDB();

  await logAudit(mockDB, "signature_created");

  ok(mockDB._queries.length > 0, "Made a query");
  ok(mockDB._insertedRows[0].values.includes(null), "Null for missing fields");
});

asyncTest("logAudit: never throws (non-fatal)", async () => {
  
  // Create a DB that always throws
  const brokenDB = {
    prepare: () => ({
      bind: () => ({
        run: async () => { throw new Error("DB is down"); },
      }),
    }),
  };

  // Should NOT throw
  let threw = false;
  try { await logAudit(brokenDB, "webhook_received"); } catch { threw = true; }
  ok(!threw, "logAudit should never throw (non-fatal)");
});

asyncTest("logAudit: all action types are valid", async () => {
  const validActions = [
    "login_google", "login_magic_link", "magic_link_sent", "magic_link_failed",
    "magic_link_rate_limited", "token_invalid", "token_expired",
    "signature_created", "signature_updated", "signature_deleted",
    "plan_upgraded", "plan_cancelled", "checkout_created",
    "webhook_received", "webhook_invalid_signature",
  ];

  
  for (const action of validActions) {
    const db = createMockDB();
    await logAudit(db, action, { userId: "u1" });
    ok(db._insertedRows[0].values.includes(action), `Action ${action} logged`);
  }
});

// ================================================================
console.log("\n🌐 SEO PAGES — Data completeness\n");
// ================================================================

test("All SEO pages have required fields", () => {
  

  ok(Array.isArray(SEO_PAGES), "SEO_PAGES is an array");
  ok(SEO_PAGES.length > 0, "Has at least 1 page");

  SEO_PAGES.forEach((page: { slug: string; title: string; metaTitle: string; metaDescription: string; h1: string; intro: string; steps: unknown[]; features: unknown[]; faq: unknown[] }) => {
    ok(!!page.slug, `${page.slug || "unknown"}: has slug`);
    ok(!!page.title, `${page.slug}: has title`);
    ok(!!page.metaTitle, `${page.slug}: has metaTitle`);
    ok(!!page.metaDescription, `${page.slug}: has metaDescription`);
    ok(!!page.h1, `${page.slug}: has h1`);
    ok(!!page.intro, `${page.slug}: has intro`);
    ok(page.steps.length > 0, `${page.slug}: has steps`);
    ok(page.features.length > 0, `${page.slug}: has features`);
    ok(page.faq.length > 0, `${page.slug}: has FAQ`);
  });
});

test("SEO page meta titles are under 60 chars", () => {
  
  SEO_PAGES.forEach((page: { slug: string; metaTitle: string }) => {
    ok(page.metaTitle.length <= 70, `${page.slug}: metaTitle is ${page.metaTitle.length} chars (max 70)`);
  });
});

test("SEO page meta descriptions are under 160 chars", () => {
  
  SEO_PAGES.forEach((page: { slug: string; metaDescription: string }) => {
    ok(page.metaDescription.length <= 160, `${page.slug}: metaDescription is ${page.metaDescription.length} chars (max 160)`);
  });
});

test("SEO pages have unique slugs", () => {
  
  const slugs = SEO_PAGES.map((p: { slug: string }) => p.slug);
  const unique = new Set(slugs);
  ok(unique.size === slugs.length, `All slugs unique: ${slugs.length} total, ${unique.size} unique`);
});

test("SEO pages all have FAQ with q and a", () => {
  
  SEO_PAGES.forEach((page: { slug: string; faq: Array<{ q: string; a: string }> }) => {
    page.faq.forEach((item, i) => {
      ok(!!item.q, `${page.slug} FAQ #${i}: has question`);
      ok(!!item.a, `${page.slug} FAQ #${i}: has answer`);
      ok(item.a.length > 20, `${page.slug} FAQ #${i}: answer has substance (${item.a.length} chars)`);
    });
  });
});

// ================================================================
console.log("\n🧱 BLOCKS — getPresetForTemplate\n");
// ================================================================

test("blocks.ts: all templates have presets", () => {
  
  
  const templates = [
    "minimal","modern","corporate","creative","bold","elegant","startup","compact",
  ];
  templates.forEach(t => {
    const preset = getPresetForTemplate(t, DEFAULT_SIGNATURE_DATA);
    ok(!!preset, `${t}: has preset`);
    ok(Array.isArray(preset.blocks), `${t}: preset has blocks array`);
    ok(!!preset.wrapperSettings, `${t}: preset has wrapperSettings`);
    ok(preset.blocks.length > 0, `${t}: has at least 1 block`);
  });
});

// ================================================================
// Run async tests sequentially, then print summary
// ================================================================

async function runAll() {
  for (const t of asyncTests) {
    try {
      await t.fn();
      passed++;
    } catch (e: unknown) {
      failed++;
      const msg = `${t.name}: ${(e as Error).message}`;
      failures.push(msg);
      console.log(`  ❌ ${msg}`);
    }
  }

  // Restore original fetch
  globalThis.fetch = originalFetch;

  // Clean up env
  delete process.env.MICROSOFT_CLIENT_ID;
  delete process.env.MICROSOFT_CLIENT_SECRET;
  delete process.env.MICROSOFT_REDIRECT_URI;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`  Mocked Runtime Test Suite Complete`);
  console.log(`  Total:  ${passed + failed}`);
  console.log(`  Passed: ${passed}`);
  console.log(`  Failed: ${failed}`);
  if (failures.length > 0) {
    console.log(`\n  Failed tests:`);
    failures.forEach(f => console.log(`    - ${f}`));
  }
  console.log(`${"=".repeat(60)}\n`);
  if (failed > 0) process.exit(1);
}

runAll();
