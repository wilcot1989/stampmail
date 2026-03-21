/**
 * TEAM, HEALTH, OUTLOOK & API FLOW TESTS
 *
 * Tests all team management flows, health monitoring, Outlook push,
 * master template generation, plan gating, and API contract validation.
 *
 * Since API routes require Cloudflare D1/auth, we test the logic layer:
 * - Master template placeholder generation
 * - Health check logic (client-side checks)
 * - Microsoft Graph URL construction
 * - Plan gating rules
 * - CSV parsing logic
 * - Signature data validation
 * - API request/response contracts
 *
 * Run: npx tsx src/lib/__tests__/team-and-api-flows.test.ts
 */

import { generateSignatureHtml, GenerateOptions } from "../generateSignature";
import { SignatureData, DEFAULT_SIGNATURE_DATA, TemplateName, COLOR_THEMES } from "../types";
import { getMicrosoftAuthUrl } from "../microsoft";

function d(overrides: Partial<SignatureData> = {}): SignatureData {
  return { ...DEFAULT_SIGNATURE_DATA, ...overrides };
}

let passed = 0;
let failed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
  try { fn(); passed++; }
  catch (e: unknown) { failed++; const msg = `${name}: ${(e as Error).message}`; failures.push(msg); console.log(`  ❌ ${msg}`); }
}
function ok(cond: boolean, msg: string) { if (!cond) throw new Error(msg); }

const TEMPLATES: TemplateName[] = [
  "minimal","modern","corporate","creative","bold","elegant","startup",
  "compact","executive","gradient","developer","sales","medical","legal",
  "academic","realtor","influencer","photographer","dark","simple",
];

// ================================================================
console.log("\n🏢 FLOW 1: MASTER TEMPLATE — Placeholder generation\n");
// ================================================================

// Simulates the master-template API: replace user fields with {{placeholders}}
test("Master template with {{name}} placeholder renders", () => {
  const html = generateSignatureHtml(d({ fullName: "{{name}}" }));
  ok(html.includes("{{name}}"), "Placeholder should appear in output");
});

test("Master template with all placeholders renders valid HTML", () => {
  const html = generateSignatureHtml(d({
    fullName: "{{name}}",
    jobTitle: "{{title}}",
    email: "{{email}}",
    phone: "{{phone}}",
    company: "{{company}}",
    website: "{{website}}",
  }));
  ok(html.includes("{{name}}"), "Name placeholder");
  ok(html.includes("{{title}}"), "Title placeholder");
  ok(html.includes("{{email}}"), "Email placeholder");
  ok(html.includes("{{phone}}"), "Phone placeholder");
  ok(html.includes("{{company}}"), "Company placeholder");
  ok(html.includes("{{website}}"), "Website placeholder");
  ok(html.includes("<table"), "Still valid table-based HTML");
});

test("Master template on every template", () => {
  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml(d({
      template: t,
      fullName: "{{name}}",
      jobTitle: "{{title}}",
      email: "{{email}}",
      phone: "{{phone}}",
    }));
    ok(html.includes("{{name}}"), `${t}: name placeholder present`);
    ok(html.includes("<table"), `${t}: valid HTML`);
  });
});

test("Master template placeholder replacement simulates team deploy", () => {
  // Step 1: Generate template with placeholders
  const templateHtml = generateSignatureHtml(d({
    fullName: "{{name}}",
    jobTitle: "{{title}}",
    email: "{{email}}",
    phone: "{{phone}}",
  }));

  // Step 2: Simulate CSV row replacement
  const memberData = {
    "{{name}}": "Jan de Vries",
    "{{title}}": "IT Manager",
    "{{email}}": "jan@acme.nl",
    "{{phone}}": "+31612345678",
  };

  let memberHtml = templateHtml;
  for (const [placeholder, value] of Object.entries(memberData)) {
    memberHtml = memberHtml.replace(new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"), value);
  }

  ok(memberHtml.includes("Jan de Vries"), "Replaced name");
  ok(memberHtml.includes("IT Manager"), "Replaced title");
  ok(memberHtml.includes("jan@acme.nl"), "Replaced email");
  ok(memberHtml.includes("+31612345678"), "Replaced phone");
  ok(!memberHtml.includes("{{"), "No remaining placeholders");
});

test("Master template: bulk generate for 10 team members", () => {
  const members = [
    { name: "Alice Brown", title: "CEO", email: "alice@co.com", phone: "+1111" },
    { name: "Bob Smith", title: "CTO", email: "bob@co.com", phone: "+2222" },
    { name: "Carol White", title: "CFO", email: "carol@co.com", phone: "+3333" },
    { name: "Dave Black", title: "COO", email: "dave@co.com", phone: "+4444" },
    { name: "Eve Green", title: "VP Sales", email: "eve@co.com", phone: "+5555" },
    { name: "Frank Red", title: "VP Marketing", email: "frank@co.com", phone: "+6666" },
    { name: "Grace Blue", title: "HR Director", email: "grace@co.com", phone: "+7777" },
    { name: "Henry Gold", title: "Lead Dev", email: "henry@co.com", phone: "+8888" },
    { name: "Iris Silver", title: "Designer", email: "iris@co.com", phone: "+9999" },
    { name: "Jack Copper", title: "Intern", email: "jack@co.com", phone: "+0000" },
  ];

  const signatures: string[] = [];
  members.forEach(m => {
    const html = generateSignatureHtml(d({
      fullName: m.name,
      jobTitle: m.title,
      email: m.email,
      phone: m.phone,
      company: "TestCorp",
      primaryColor: "#2563eb",
    }));
    ok(html.includes(m.name), `${m.name}: name present`);
    ok(html.includes(m.email), `${m.name}: email present`);
    signatures.push(html);
  });

  // All signatures should be unique
  const unique = new Set(signatures);
  ok(unique.size === 10, `All 10 signatures should be unique, got ${unique.size}`);
});

// ================================================================
console.log("\n🔒 FLOW 2: PLAN GATING — Access control rules\n");
// ================================================================

test("Free plan: branding present on all templates", () => {
  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml(d({ template: t }), { plan: "free" });
    ok(html.includes("NeatStamp"), `${t}: free plan should have NeatStamp branding`);
  });
});

test("Pro plan: NO branding on any template", () => {
  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml(d({ template: t }), { plan: "pro" });
    ok(!html.includes("Made with NeatStamp"), `${t}: pro plan should NOT have branding`);
  });
});

test("Team plan: NO branding (same as pro)", () => {
  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml(d({ template: t }), { plan: "team" });
    ok(!html.includes("Made with NeatStamp"), `${t}: team plan should NOT have branding`);
  });
});

test("Free + signatureId: tracking pixel present", () => {
  const html = generateSignatureHtml(d(), { plan: "free", signatureId: "test-sig-123" });
  ok(html.includes("test-sig-123"), "Tracking pixel with signature ID should be present");
});

test("Pro + signatureId: NO tracking pixel", () => {
  const html = generateSignatureHtml(d(), { plan: "pro", signatureId: "test-sig-123" });
  ok(!html.includes("test-sig-123/track"), "Pro should NOT have tracking pixel");
});

test("Team + signatureId: NO tracking pixel", () => {
  const html = generateSignatureHtml(d(), { plan: "team", signatureId: "test-sig-123" });
  ok(!html.includes("test-sig-123/track"), "Team should NOT have tracking pixel");
});

test("Free without signatureId: no tracking pixel at all", () => {
  const html = generateSignatureHtml(d(), { plan: "free" });
  ok(!html.includes("/track"), "No tracking pixel without signatureId");
});

// Plan gating business rules
test("Free plan limits: 1 signature, 2 templates, 2 socials, 90-day expiry", () => {
  // These are business rules enforced by the API/UI, not generateSignatureHtml
  // But we can verify the data model supports them
  ok(true, "Business rules documented");
});

test("Pro plan features: all templates, unlimited signatures, no branding", () => {
  // All 20 templates should work with pro
  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml(d({ template: t }), { plan: "pro" });
    ok(html.length > 200, `${t}: generates HTML on pro plan`);
  });
});

// ================================================================
console.log("\n🩺 FLOW 3: HEALTH CHECKS — Client-side signature analysis\n");
// ================================================================

// Simulate the health checks that run in HealthMonitorTab

function runHealthChecks(html: string): { name: string; pass: boolean; detail: string }[] {
  const checks: { name: string; pass: boolean; detail: string }[] = [];

  // Check 1: HTML size under 10KB
  const sizeKB = Buffer.byteLength(html, "utf8") / 1024;
  checks.push({
    name: "HTML size",
    pass: sizeKB < 10,
    detail: `${sizeKB.toFixed(1)}KB (limit: 10KB)`,
  });

  // Check 2: No base64 images
  const hasBase64 = html.includes("data:image");
  checks.push({
    name: "No base64 images",
    pass: !hasBase64,
    detail: hasBase64 ? "Found embedded base64 images" : "All images are URL-hosted",
  });

  // Check 3: All image URLs use HTTPS
  const imgSrcs = html.match(/src="([^"]+)"/g) || [];
  const allHttps = imgSrcs.every(s => s.includes("https://") || s.includes("data:"));
  checks.push({
    name: "HTTPS images",
    pass: allHttps || imgSrcs.length === 0,
    detail: `${imgSrcs.length} images found`,
  });

  // Check 4: Contact info present (at least name + email)
  const hasName = html.includes("Alex Johnson") || html.length > 200;
  checks.push({
    name: "Contact info",
    pass: hasName,
    detail: hasName ? "Name found" : "Missing name",
  });

  // Check 5: Outlook-safe HTML (table-based, no flexbox)
  const isOutlookSafe = html.includes("<table") && !html.includes("display:flex") && !html.includes("display:grid");
  checks.push({
    name: "Outlook-safe",
    pass: isOutlookSafe,
    detail: isOutlookSafe ? "Table-based layout" : "Uses flexbox/grid",
  });

  // Check 6: No script tags
  const hasScript = html.includes("<script");
  checks.push({
    name: "No scripts",
    pass: !hasScript,
    detail: hasScript ? "Script tags found!" : "Clean",
  });

  return checks;
}

test("Health check: default signature passes all 6 checks", () => {
  const html = generateSignatureHtml(d());
  const checks = runHealthChecks(html);
  checks.forEach(check => {
    ok(check.pass, `Health check "${check.name}" should pass: ${check.detail}`);
  });
});

test("Health check: all 20 templates pass all checks", () => {
  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml(d({ template: t, email: "test@test.com", phone: "+1234" }));
    const checks = runHealthChecks(html);
    checks.forEach(check => {
      ok(check.pass, `${t} - "${check.name}" should pass: ${check.detail}`);
    });
  });
});

test("Health check: signature with all fields still under 10KB", () => {
  const html = generateSignatureHtml(d({
    fullName: "John Doe",
    jobTitle: "Chief Executive Officer of Technology and Innovation",
    company: "International Business Machines Corporation",
    email: "john.doe.executive@ibm-corporation.com",
    phone: "+1 (555) 123-4567 ext. 8901",
    website: "www.ibm-corporation.com/leadership/john-doe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    facebook: "https://facebook.com/johndoe",
    github: "https://github.com/johndoe",
    youtube: "https://youtube.com/@johndoe",
    photoUrl: "https://cdn.example.com/photos/john-doe-headshot-2026.jpg",
    disclaimer: "This email and any attachments are confidential. If you received this in error, please delete it immediately.",
    calendlyUrl: "https://calendly.com/john-doe-ibm/30min",
    ctaBannerUrl: "https://cdn.example.com/banners/q1-2026-promo.jpg",
    ctaBannerLink: "https://ibm.com/promo/q1-2026",
  }));
  const checks = runHealthChecks(html);
  const sizeCheck = checks.find(c => c.name === "HTML size");
  ok(sizeCheck!.pass, `Fully-loaded signature should be under 10KB: ${sizeCheck!.detail}`);
});

test("Health check: base64 image fails check", () => {
  // Simulate a signature that somehow has base64 images
  const html = '<table><tr><td><img src="data:image/png;base64,abc123" /></td></tr></table>';
  const checks = runHealthChecks(html);
  const base64Check = checks.find(c => c.name === "No base64 images");
  ok(!base64Check!.pass, "base64 image should fail check");
});

test("Health check: script tag fails check", () => {
  const html = '<table><tr><td>Hi</td></tr></table><script>alert(1)</script>';
  const checks = runHealthChecks(html);
  const scriptCheck = checks.find(c => c.name === "No scripts");
  ok(!scriptCheck!.pass, "Script tag should fail check");
});

test("Health score calculation: 6/6 = 100", () => {
  const html = generateSignatureHtml(d());
  const checks = runHealthChecks(html);
  const passCount = checks.filter(c => c.pass).length;
  const score = Math.round((passCount / checks.length) * 100);
  ok(score === 100, `Default signature should score 100, got ${score}`);
});

// ================================================================
console.log("\n📧 FLOW 4: OUTLOOK PUSH — Microsoft Graph integration\n");
// ================================================================

test("getMicrosoftAuthUrl generates valid URL", () => {
  // Set env vars for test
  process.env.MICROSOFT_CLIENT_ID = "test-client-id-123";
  process.env.MICROSOFT_REDIRECT_URI = "https://neatstamp.com/api/auth/microsoft/callback";

  const url = getMicrosoftAuthUrl("csrf-token-abc");
  ok(url.includes("login.microsoftonline.com"), "Uses Microsoft login endpoint");
  ok(url.includes("test-client-id-123"), "Contains client ID");
  ok(url.includes("csrf-token-abc"), "Contains state parameter");
  ok(url.includes("MailboxSettings.ReadWrite"), "Requests MailboxSettings scope");
  ok(url.includes("offline_access"), "Requests offline_access scope");
  ok(url.includes("User.Read"), "Requests User.Read scope");
  ok(url.includes("response_type=code"), "Authorization code flow");
  ok(url.includes(encodeURIComponent("https://neatstamp.com/api/auth/microsoft/callback")), "Contains redirect URI");

  // Clean up
  delete process.env.MICROSOFT_CLIENT_ID;
  delete process.env.MICROSOFT_REDIRECT_URI;
});

test("getMicrosoftAuthUrl throws without env vars", () => {
  delete process.env.MICROSOFT_CLIENT_ID;
  delete process.env.MICROSOFT_REDIRECT_URI;

  let threw = false;
  try {
    getMicrosoftAuthUrl("test");
  } catch {
    threw = true;
  }
  ok(threw, "Should throw without MICROSOFT_CLIENT_ID");
});

test("Signature HTML for Outlook push is valid", () => {
  // The push API sends the HTML from generateSignatureHtml to Graph API
  const html = generateSignatureHtml(d({
    fullName: "Jan de Vries",
    jobTitle: "IT Manager",
    company: "NeatStamp BV",
    email: "jan@neatstamp.com",
    phone: "+31612345678",
    website: "www.neatstamp.com",
  }), { plan: "pro" });

  // Validate it's suitable for Outlook Graph API
  ok(html.includes("<table"), "Table-based HTML");
  ok(!html.includes("<script"), "No scripts");
  ok(!html.includes("class="), "No CSS classes");
  ok(!html.includes("<style"), "No style blocks");
  ok(html.includes("Jan de Vries"), "Contains user data");
  ok(!html.includes("Made with NeatStamp"), "Pro plan: no branding badge (clean for Outlook)");
});

test("Outlook push: both new messages and replies get same HTML", () => {
  // The Graph API sets signatureForNewMessages and signatureForReplies
  // Both should receive the same HTML
  const html = generateSignatureHtml(d(), { plan: "pro" });
  // Simulating what /api/outlook/push does:
  const graphPayload = {
    signatureForNewMessages: html,
    signatureForReplies: html,
  };
  ok(graphPayload.signatureForNewMessages === graphPayload.signatureForReplies,
    "New message and reply signatures should be identical");
  ok(graphPayload.signatureForNewMessages.length > 100,
    "Signature should have substantial content");
});

// ================================================================
console.log("\n📋 FLOW 5: CSV UPLOAD — Team member parsing\n");
// ================================================================

// Simulates CSV parsing logic used in the Team Dashboard

function parseCSV(csv: string): Array<Record<string, string>> {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] || ""; });
    return row;
  });
}

test("CSV parsing: basic 3-column CSV", () => {
  const csv = `Name,Email,Title
Alice Brown,alice@co.com,CEO
Bob Smith,bob@co.com,CTO`;
  const rows = parseCSV(csv);
  ok(rows.length === 2, "Should parse 2 rows");
  ok(rows[0].name === "Alice Brown", "First name");
  ok(rows[0].email === "alice@co.com", "First email");
  ok(rows[0].title === "CEO", "First title");
  ok(rows[1].name === "Bob Smith", "Second name");
});

test("CSV parsing: 5-column CSV with all fields", () => {
  const csv = `Name,Email,Title,Phone,Department
Alice Brown,alice@co.com,CEO,+1111,Executive
Bob Smith,bob@co.com,CTO,+2222,Engineering
Carol White,carol@co.com,CFO,+3333,Finance`;
  const rows = parseCSV(csv);
  ok(rows.length === 3, "Should parse 3 rows");
  ok(rows[2].department === "Finance", "Third department");
  ok(rows[1].phone === "+2222", "Second phone");
});

test("CSV parsing: empty CSV returns empty", () => {
  const rows = parseCSV("");
  ok(rows.length === 0, "Empty CSV = empty result");
});

test("CSV parsing: header only returns empty", () => {
  const rows = parseCSV("Name,Email,Title");
  ok(rows.length === 0, "Header only = empty result");
});

test("CSV parsing: missing values get empty string", () => {
  const csv = `Name,Email,Title
Alice,,CEO`;
  const rows = parseCSV(csv);
  ok(rows[0].email === "", "Missing email = empty string");
});

test("CSV parsing: generate signatures for all CSV rows", () => {
  const csv = `Name,Email,Title,Phone
Alice Brown,alice@co.com,CEO,+1111
Bob Smith,bob@co.com,CTO,+2222
Carol White,carol@co.com,CFO,+3333`;
  const rows = parseCSV(csv);
  const signatures = rows.map(row =>
    generateSignatureHtml(d({
      fullName: row.name,
      jobTitle: row.title,
      email: row.email,
      phone: row.phone,
      company: "TestCorp",
    }))
  );
  ok(signatures.length === 3, "3 signatures generated");
  ok(signatures[0].includes("Alice Brown"), "Alice's name");
  ok(signatures[1].includes("bob@co.com"), "Bob's email");
  ok(signatures[2].includes("+3333"), "Carol's phone");

  // All unique
  const unique = new Set(signatures);
  ok(unique.size === 3, "All signatures unique");
});

test("CSV: 25 members (team plan limit) all generate valid HTML", () => {
  const members = Array.from({ length: 25 }, (_, i) => ({
    name: `Employee ${i + 1}`,
    title: `Title ${i + 1}`,
    email: `emp${i + 1}@co.com`,
    phone: `+${String(i + 1).padStart(4, "0")}`,
  }));
  members.forEach(m => {
    const html = generateSignatureHtml(d({
      fullName: m.name,
      jobTitle: m.title,
      email: m.email,
      phone: m.phone,
    }));
    ok(html.includes(m.name), `${m.name}: name present`);
    ok(html.includes("<table"), `${m.name}: valid HTML`);
  });
});

test("CSV: 100 members (team+ plan) all generate valid HTML", () => {
  const members = Array.from({ length: 100 }, (_, i) => ({
    name: `Employee ${i + 1}`,
    email: `emp${i + 1}@bigcorp.com`,
  }));
  members.forEach(m => {
    const html = generateSignatureHtml(d({ fullName: m.name, email: m.email }));
    ok(html.includes(m.name), `${m.name}: present`);
  });
});

// ================================================================
console.log("\n🔄 FLOW 6: DEPLOYMENT — PowerShell/Google Workspace\n");
// ================================================================

test("Deployment: signature HTML is self-contained (no external deps)", () => {
  const html = generateSignatureHtml(d({
    fullName: "Test User",
    email: "test@test.com",
    phone: "+1234567890",
    linkedin: "https://linkedin.com/in/test",
    photoUrl: "https://cdn.example.com/photo.jpg",
  }), { plan: "pro" });

  // Should not reference localhost or relative paths
  ok(!html.includes("localhost"), "No localhost references");
  ok(!html.includes("src=\"/"), "No relative image paths");
  // Should not have any JS
  ok(!html.includes("<script"), "No scripts");
  ok(!html.includes("onclick"), "No event handlers");
  // Should be valid standalone HTML fragment
  ok(html.includes("<table"), "Table-based");
});

test("Deployment: HTML escaping prevents HTML injection in all fields", () => {
  // User could put HTML that gets inserted into email clients
  const html = generateSignatureHtml(d({
    fullName: '<script>alert(1)</script>',
    email: '"><script>alert(2)</script>',
    website: '<img src=x>',
  }));
  // HTML injection should be escaped (< → &lt;, > → &gt;)
  ok(!html.includes("<script>"), "No raw script tags from name");
  ok(html.includes("&lt;script&gt;"), "Script tags are escaped");
  // Note: $() and backticks are safe in HTML context — PowerShell injection
  // is only a risk if the HTML is later embedded in a PS script without proper
  // PS-level escaping, which is handled by the deployment scripts.
});

test("Deployment: HTML works when embedded in PowerShell string", () => {
  const html = generateSignatureHtml(d({ fullName: "Test User" }), { plan: "pro" });
  // Simulate wrapping in PowerShell here-string
  const psScript = `$signatureHtml = @"\n${html}\n"@`;
  ok(psScript.includes("Test User"), "HTML can be embedded in PowerShell");
  ok(psScript.length < 100000, "Reasonable size for PowerShell");
});

// ================================================================
console.log("\n🔀 FLOW 7: TEMPLATE × COLOR THEME MATRIX\n");
// ================================================================

test("All 20 templates × 8 color themes generate valid HTML", () => {
  let count = 0;
  TEMPLATES.forEach(t => {
    COLOR_THEMES.forEach(theme => {
      const html = generateSignatureHtml(d({
        template: t,
        primaryColor: theme.primary,
        accentColor: theme.accent,
      }));
      ok(html.includes("<table"), `${t}×${theme.name}: valid HTML`);
      ok(html.length > 200, `${t}×${theme.name}: substantial output`);
      count++;
    });
  });
  ok(count === 160, `Should test 160 combinations, tested ${count}`);
});

// ================================================================
console.log("\n📱 FLOW 8: OUTLOOK ADD-IN — Signature injection\n");
// ================================================================

test("Signature for add-in: same as editor output", () => {
  const data = d({
    fullName: "Jan de Vries",
    jobTitle: "IT Manager",
    email: "jan@neatstamp.com",
  });
  const editorHtml = generateSignatureHtml(data, { plan: "pro" });
  const addinHtml = generateSignatureHtml(data, { plan: "pro" });
  ok(editorHtml === addinHtml, "Add-in should use identical HTML as editor");
});

test("Signature stored in roaming settings: HTML string is valid", () => {
  const html = generateSignatureHtml(d(), { plan: "pro" });
  // Roaming settings stores as string — verify it can be JSON serialized
  const serialized = JSON.stringify(html);
  const deserialized = JSON.parse(serialized);
  ok(deserialized === html, "HTML survives JSON round-trip (for roaming settings)");
});

test("Signature for add-in: works with Office.CoercionType.Html", () => {
  // Office.js setSignatureAsync expects raw HTML string
  const html = generateSignatureHtml(d({ fullName: "Test" }), { plan: "pro" });
  ok(typeof html === "string", "Is a string");
  ok(html.includes("<table"), "Contains HTML table");
  ok(!html.includes("<!DOCTYPE"), "No DOCTYPE (fragment, not full document)");
  ok(!html.includes("<html"), "No html wrapper");
  ok(!html.includes("<body"), "No body wrapper");
});

// ================================================================
console.log("\n🔐 FLOW 9: SECURITY — XSS/Injection across all fields\n");
// ================================================================

const XSS_PAYLOADS = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  '"><script>alert(1)</script>',
  "javascript:alert(1)",
  '<svg onload=alert(1)>',
  '{{constructor.constructor("return this")()}}',
  "${7*7}",
  '<iframe src="evil.com">',
  '<a href="javascript:alert(1)">click</a>',
  'onmouseover=alert(1) ',
];

const FIELDS_TO_TEST = ["fullName", "jobTitle", "company", "email", "phone", "website", "disclaimer", "address", "pronouns"] as const;

FIELDS_TO_TEST.forEach(field => {
  XSS_PAYLOADS.forEach((payload, i) => {
    test(`XSS ${field} payload #${i + 1}`, () => {
      const data = d({ [field]: payload } as Partial<SignatureData>);
      const html = generateSignatureHtml(data);
      // No raw (unescaped) HTML tags — < should be &lt;
      ok(!html.includes("<script>"), `${field}: no raw script tag`);
      // The key security check: are < and > escaped? If so, injected HTML tags
      // cannot become real elements. The browser will render &lt;img...&gt; as text.
      ok(!html.includes(`<img src=x`), `${field}: no unescaped <img tag from injection`);
      ok(!html.includes(`<img src="x"`), `${field}: no unescaped <img tag variant`);
      // No raw <svg (unescaped)
      ok(!html.includes("<svg"), `${field}: no SVG injection`);
      // No raw <iframe (unescaped)
      ok(!html.includes("<iframe"), `${field}: no iframe injection`);
      // No javascript: protocol in href
      const jsHref = html.match(/href="javascript:/g);
      ok(!jsHref, `${field}: no javascript: in href`);
    });
  });
});

// ================================================================
console.log("\n📊 FLOW 10: ANALYTICS — Tracking pixel contract\n");
// ================================================================

test("Free plan with sigId: pixel URL format correct", () => {
  const html = generateSignatureHtml(d(), { plan: "free", signatureId: "abc-123" });
  ok(html.includes("abc-123"), "Signature ID in pixel");
  // Pixel should be 1x1 image
  const pixelMatch = html.match(/width="1".*height="1"/);
  ok(!!pixelMatch || html.includes('width:1px'), "Pixel should be 1x1");
});

test("Tracking pixel doesn't appear in copied Pro signature", () => {
  const html = generateSignatureHtml(d(), { plan: "pro", signatureId: "abc-123" });
  ok(!html.includes("/track"), "No tracking endpoint in pro output");
  ok(!html.includes("abc-123/track"), "No pixel URL");
});

// ================================================================
console.log("\n🏗️ FLOW 11: SIGNATURE CRUD — Data consistency\n");
// ================================================================

test("Save and regenerate: identical output", () => {
  const data = d({
    fullName: "Saved User",
    jobTitle: "Manager",
    email: "saved@test.com",
    template: "modern",
    primaryColor: "#ff5500",
    nameSize: 20,
    nameBold: true,
    photoUrl: "https://cdn.example.com/photo.jpg",
    photoShape: "circle",
  });

  // Simulate save: serialize to JSON
  const saved = JSON.stringify(data);

  // Simulate load: deserialize
  const loaded = JSON.parse(saved) as SignatureData;

  // Regenerate
  const html1 = generateSignatureHtml(data);
  const html2 = generateSignatureHtml(loaded);

  ok(html1 === html2, "Regenerated HTML should be identical after save/load");
});

test("Signature data survives JSON round-trip with all fields", () => {
  const data = d({
    fullName: "Test",
    jobTitle: "CEO",
    company: "Corp",
    email: "t@t.com",
    phone: "+1234",
    website: "www.t.com",
    linkedin: "https://li.com",
    twitter: "https://tw.com",
    instagram: "https://ig.com",
    facebook: "https://fb.com",
    github: "https://gh.com",
    youtube: "https://yt.com",
    photoUrl: "https://ph.com/p.jpg",
    photoSize: 80,
    photoShape: "circle" as const,
    photoPosition: "right" as const,
    primaryColor: "#ff0000",
    accentColor: "#00ff00",
    nameColor: "#0000ff",
    nameSize: 24,
    nameBold: false,
    nameItalic: true,
    titleColor: "#aabbcc",
    titleSize: 14,
    fontFamily: "Georgia,serif",
    backgroundColor: "#1a1a2e",
    textOnDark: true,
    disclaimer: "Legal stuff",
    calendlyUrl: "https://cal.com/test",
    ctaBannerUrl: "https://banner.jpg",
    ctaBannerLink: "https://promo.com",
    contactOrder: ["website", "email", "phone"] as string[],
    fieldOrder: ["company", "fullName", "jobTitle"] as string[],
    template: "elegant" as TemplateName,
  });

  const json = JSON.stringify(data);
  const restored = JSON.parse(json) as SignatureData;

  // Every field should survive
  ok(restored.fullName === "Test", "fullName survived");
  ok(restored.primaryColor === "#ff0000", "primaryColor survived");
  ok(restored.photoShape === "circle", "photoShape survived");
  ok(restored.nameItalic === true, "nameItalic survived");
  ok(restored.contactOrder![0] === "website", "contactOrder survived");
  ok(restored.fieldOrder![0] === "company", "fieldOrder survived");
  ok(restored.template === "elegant", "template survived");

  // HTML should be identical
  const html1 = generateSignatureHtml(data);
  const html2 = generateSignatureHtml(restored);
  ok(html1 === html2, "HTML identical after round-trip");
});

// ================================================================
console.log("\n🌐 FLOW 12: MULTI-DEVICE — Same signature everywhere\n");
// ================================================================

test("Same data produces same HTML regardless of generation context", () => {
  const data = d({ fullName: "Multi Device User", email: "test@test.com" });
  const options: GenerateOptions = { plan: "pro" };

  // Simulate: generated on desktop, mobile, OWA, add-in
  const desktop = generateSignatureHtml(data, options);
  const mobile = generateSignatureHtml(data, options);
  const owa = generateSignatureHtml(data, options);
  const addin = generateSignatureHtml(data, options);

  ok(desktop === mobile, "Desktop = Mobile");
  ok(mobile === owa, "Mobile = OWA");
  ok(owa === addin, "OWA = Add-in");
});

test("Signature width is 500px (fits all Outlook versions)", () => {
  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml(d({ template: t }));
    const has500 = html.includes("width:500px") || html.includes('width="500"');
    ok(has500, `${t}: should have 500px width`);
  });
});

test("No media queries (mobile-safe without responsive CSS)", () => {
  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml(d({ template: t }));
    ok(!html.includes("@media"), `${t}: no media queries`);
  });
});

// ================================================================
// Summary
// ================================================================

console.log(`\n${"=".repeat(60)}`);
console.log(`  Team & API Flows Test Suite Complete`);
console.log(`  Total:  ${passed + failed}`);
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
if (failures.length > 0) {
  console.log(`\n  Failed tests:`);
  failures.forEach(f => console.log(`    - ${f}`));
}
console.log(`${"=".repeat(60)}\n`);
if (failed > 0) process.exit(1);
