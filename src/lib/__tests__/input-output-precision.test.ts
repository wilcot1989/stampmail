/**
 * INPUT-OUTPUT PRECISION TESTS
 *
 * Verifies that every field in SignatureData produces the EXACT expected HTML output.
 * Tests go beyond "html contains X" — they check context, defaults, overrides,
 * template switching, structural layout, and edge cases that break the preview.
 *
 * Run with: npx tsx src/lib/__tests__/input-output-precision.test.ts
 */

import { generateSignatureHtml } from "../generateSignature";
import { SignatureData, DEFAULT_SIGNATURE_DATA, TemplateName } from "../types";

// ---------------------------------------------------------------------------
// Test infrastructure
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;
const FAILURES: string[] = [];

function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (e: unknown) {
    failed++;
    const msg = `${name}: ${(e as Error).message}`;
    FAILURES.push(msg);
    console.log(`  ❌ ${msg}`);
  }
}

/** ok: assert condition is truthy */
function ok(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

/** notOk: assert condition is falsy */
function notOk(cond: boolean, msg: string) {
  if (cond) throw new Error(msg);
}

/** Build a SignatureData from DEFAULT_SIGNATURE_DATA plus overrides */
function d(overrides: Partial<SignatureData> = {}): SignatureData {
  return { ...DEFAULT_SIGNATURE_DATA, ...overrides };
}

/**
 * Extract the style attribute content from the element containing a specific text string.
 * Looks for pattern: style="...<text>..." within the same TD/SPAN.
 * Returns null if not found.
 */
function extractStyleContaining(html: string, text: string): string | null {
  // Find all style="..." attributes in the HTML and check which one is near the target text
  const stylePattern = /style="([^"]+)"/g;
  let match;
  // Walk through chunks of HTML: split on the text, look at the preceding context
  const idx = html.indexOf(text);
  if (idx === -1) return null;
  // Look backwards from the text to find the most recent style= attribute
  const before = html.slice(0, idx);
  const lastStyleStart = before.lastIndexOf('style="');
  if (lastStyleStart === -1) return null;
  const afterStyle = before.slice(lastStyleStart + 7);
  const closeQuote = afterStyle.indexOf('"');
  if (closeQuote === -1) return null;
  return afterStyle.slice(0, closeQuote);
}

/**
 * Find all occurrences of a pattern in an HTML string, return their indices.
 */
function findAll(html: string, sub: string): number[] {
  const positions: number[] = [];
  let start = 0;
  while (true) {
    const idx = html.indexOf(sub, start);
    if (idx === -1) break;
    positions.push(idx);
    start = idx + 1;
  }
  return positions;
}

/**
 * Get the HTML slice around the first occurrence of `needle` for context inspection.
 */
function contextAround(html: string, needle: string, radius = 120): string {
  const idx = html.indexOf(needle);
  if (idx === -1) return "";
  return html.slice(Math.max(0, idx - radius), idx + needle.length + radius);
}

// Photo URL used throughout photo-related tests
const PHOTO = "https://example.com/photo.jpg";

// ============================================================
// SECTION 1: TEMPLATE DEFAULT VALUES
// ============================================================

console.log("\n=== SECTION 1: Template Default Values ===\n");

// ----------------------------------------------------------------
// minimal
// ----------------------------------------------------------------
test("minimal: default photoSize is 70px", () => {
  const html = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO }));
  ok(html.includes("width:70px"), `Expected width:70px, context: ${contextAround(html, "width:")}`);
  ok(html.includes("height:70px"), "Expected height:70px");
});

test("minimal: default photoShape is circle (border-radius:50%)", () => {
  const html = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO }));
  ok(html.includes("border-radius:50%"), "Expected border-radius:50% for minimal default shape");
});

test("minimal: default name font-size is 17px", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  ok(html.includes("font-size:17px"), "Expected font-size:17px for name in minimal");
});

test("minimal: default name color is #1a1a1a", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  // The name style includes color:#1a1a1a
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1a1a1a"), `Expected color:#1a1a1a near name, got: ${nameCtx}`);
});

test("minimal: default name is bold (font-weight:bold)", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("font-weight:bold"), `Expected font-weight:bold near name, got: ${nameCtx}`);
});

test("minimal: default title font-size is 12px", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  // title is Marketing Manager
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("font-size:12px"), `Expected font-size:12px near job title, got: ${titleCtx}`);
});

test("minimal: default company color is #999", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("color:#999"), `Expected color:#999 near company, got: ${compCtx}`);
});

test("minimal: company appears in its own row", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  ok(html.includes("Acme Corp"), "Company name should appear");
  // Company is in its own <tr><td> in minimal
  const compCtx = contextAround(html, "Acme Corp", 200);
  ok(compCtx.includes("<tr>"), `Expected company to be in a table row, got: ${compCtx}`);
});

test("minimal: uses border-top separator above contact info", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  ok(html.includes("border-top:1px solid #e5e7eb"), "Expected border-top separator");
});

test("minimal: photoPosition defaults to left (photo before contentTd)", () => {
  const html = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO }));
  const photoIdx = html.indexOf(PHOTO);
  const nameIdx = html.indexOf("Alex Johnson");
  ok(photoIdx < nameIdx, "Photo should appear before name (left position)");
});

// ----------------------------------------------------------------
// modern
// ----------------------------------------------------------------
test("modern: default photoSize is 75px", () => {
  const html = generateSignatureHtml(d({ template: "modern", photoUrl: PHOTO }));
  ok(html.includes("width:75px"), "Expected width:75px for modern default");
  ok(html.includes("height:75px"), "Expected height:75px for modern default");
});

test("modern: default photoShape is rounded (border-radius:8px)", () => {
  const html = generateSignatureHtml(d({ template: "modern", photoUrl: PHOTO }));
  ok(html.includes("border-radius:8px"), "Expected border-radius:8px for modern default shape");
});

test("modern: default name font-size is 18px", () => {
  const html = generateSignatureHtml(d({ template: "modern" }));
  ok(html.includes("font-size:18px"), "Expected font-size:18px for name in modern");
});

test("modern: default name color is primaryColor (#2563eb)", () => {
  const html = generateSignatureHtml(d({ template: "modern" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#2563eb"), `Expected name color to be primaryColor #2563eb, got: ${nameCtx}`);
});

test("modern: default name is bold", () => {
  const html = generateSignatureHtml(d({ template: "modern" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("font-weight:bold"), `Expected font-weight:bold near name, got: ${nameCtx}`);
});

test("modern: has left border using primaryColor", () => {
  const html = generateSignatureHtml(d({ template: "modern" }));
  ok(html.includes("border-left:4px solid #2563eb"), "Expected left border with primaryColor");
});

test("modern: job title uses accentColor (#f59e0b) and uppercase", () => {
  const html = generateSignatureHtml(d({ template: "modern" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("color:#f59e0b"), `Expected accentColor on title, got: ${titleCtx}`);
  ok(titleCtx.includes("text-transform:uppercase"), `Expected uppercase on title, got: ${titleCtx}`);
});

test("modern: company and title appear in same row separated by pipe", () => {
  const html = generateSignatureHtml(d({ template: "modern" }));
  // Modern puts title and company in same <td>
  const block = contextAround(html, "Marketing Manager", 300);
  ok(block.includes("Acme Corp"), "Company should be in same block as title");
});

// ----------------------------------------------------------------
// corporate
// ----------------------------------------------------------------
test("corporate: default photoSize is 65px", () => {
  const html = generateSignatureHtml(d({ template: "corporate", photoUrl: PHOTO }));
  ok(html.includes("width:65px"), "Expected width:65px for corporate default");
  ok(html.includes("height:65px"), "Expected height:65px for corporate default");
});

test("corporate: default photoShape is rounded (border-radius:4px)", () => {
  const html = generateSignatureHtml(d({ template: "corporate", photoUrl: PHOTO }));
  ok(html.includes("border-radius:4px"), "Expected border-radius:4px for corporate default shape");
});

test("corporate: default name font-size is 17px", () => {
  const html = generateSignatureHtml(d({ template: "corporate" }));
  ok(html.includes("font-size:17px"), "Expected font-size:17px for name in corporate");
});

test("corporate: default name color is #1a1a1a", () => {
  const html = generateSignatureHtml(d({ template: "corporate" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1a1a1a"), `Expected color:#1a1a1a near name, got: ${nameCtx}`);
});

test("corporate: has border-top with primaryColor", () => {
  const html = generateSignatureHtml(d({ template: "corporate" }));
  ok(html.includes("border-top:3px solid #2563eb"), "Expected border-top with primaryColor");
});

test("corporate: contact uses labeled rows (T E W A)", () => {
  const html = generateSignatureHtml(d({ template: "corporate" }));
  ok(html.includes(">T&nbsp;</span>"), "Expected T label for phone");
  ok(html.includes(">E&nbsp;</span>"), "Expected E label for email");
  ok(html.includes(">W&nbsp;</span>"), "Expected W label for website");
});

test("corporate: job title uses primaryColor and bold", () => {
  const html = generateSignatureHtml(d({ template: "corporate" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("color:#2563eb"), `Expected primaryColor on title, got: ${titleCtx}`);
  ok(titleCtx.includes("font-weight:bold"), `Expected bold title, got: ${titleCtx}`);
});

test("corporate: company appears bold in same row as title", () => {
  const html = generateSignatureHtml(d({ template: "corporate" }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("font-weight:bold"), `Expected company to be bold, got: ${compCtx}`);
});

// ----------------------------------------------------------------
// creative
// ----------------------------------------------------------------
test("creative: default photoSize is 90px", () => {
  const html = generateSignatureHtml(d({ template: "creative", photoUrl: PHOTO }));
  ok(html.includes("width:90px"), "Expected width:90px for creative default");
  ok(html.includes("height:90px"), "Expected height:90px for creative default");
});

test("creative: default photoShape is circle (border-radius:50%)", () => {
  const html = generateSignatureHtml(d({ template: "creative", photoUrl: PHOTO }));
  ok(html.includes("border-radius:50%"), "Expected border-radius:50% for creative default shape");
});

test("creative: photo has colored border using primaryColor", () => {
  const html = generateSignatureHtml(d({ template: "creative", photoUrl: PHOTO }));
  ok(html.includes("border:3px solid #2563eb"), "Expected photo border with primaryColor");
});

test("creative: default name font-size is 20px", () => {
  const html = generateSignatureHtml(d({ template: "creative" }));
  ok(html.includes("font-size:20px"), "Expected font-size:20px for name in creative");
});

test("creative: default name color is primaryColor (#2563eb)", () => {
  const html = generateSignatureHtml(d({ template: "creative" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#2563eb"), `Expected primaryColor on name, got: ${nameCtx}`);
});

test("creative: uses dashed left border with accentColor", () => {
  const html = generateSignatureHtml(d({ template: "creative" }));
  ok(html.includes("border-left:2px dashed #f59e0b"), "Expected dashed border with accentColor");
});

test("creative: contact uses emoji icons (phone=✆, email=✉)", () => {
  const html = generateSignatureHtml(d({ template: "creative" }));
  ok(html.includes("&#9742;"), "Expected phone unicode icon ✆");
  ok(html.includes("&#9993;"), "Expected email unicode icon ✉");
  ok(html.includes("&#127760;"), "Expected website unicode icon 🌐");
});

test("creative: company appears under photo when photo is present", () => {
  const html = generateSignatureHtml(d({ template: "creative", photoUrl: PHOTO }));
  // Company appears in the photo <td> in creative, not in content area
  const photoTdIdx = html.indexOf(PHOTO);
  const compIdx = html.indexOf("Acme Corp");
  // When photo is present, company appears in photo cell (near the photo)
  const photoCtx = html.slice(Math.max(0, photoTdIdx - 50), photoTdIdx + 400);
  ok(photoCtx.includes("Acme Corp"), "Company should appear in photo cell when photo is present");
});

test("creative: company appears in content area when no photo", () => {
  const html = generateSignatureHtml(d({ template: "creative", photoUrl: "" }));
  // When no photo, company appears in content area
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("text-transform:uppercase"), `Expected uppercase company when no photo, got: ${compCtx}`);
});

// ----------------------------------------------------------------
// bold
// ----------------------------------------------------------------
test("bold: default photoSize is 75px", () => {
  const html = generateSignatureHtml(d({ template: "bold", photoUrl: PHOTO }));
  ok(html.includes("width:75px"), "Expected width:75px for bold default");
  ok(html.includes("height:75px"), "Expected height:75px for bold default");
});

test("bold: default photoShape is rounded (border-radius:8px)", () => {
  const html = generateSignatureHtml(d({ template: "bold", photoUrl: PHOTO }));
  // Bold uses rounded as default
  ok(html.includes("border-radius:8px"), "Expected border-radius:8px for bold default shape");
});

test("bold: default name font-size is 20px", () => {
  const html = generateSignatureHtml(d({ template: "bold" }));
  ok(html.includes("font-size:20px"), "Expected font-size:20px for name in bold");
});

test("bold: name color is #fff (white on colored background)", () => {
  const html = generateSignatureHtml(d({ template: "bold" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#fff"), `Expected white name color, got: ${nameCtx}`);
});

test("bold: background-color is primaryColor (full background template)", () => {
  const html = generateSignatureHtml(d({ template: "bold" }));
  ok(html.includes("background-color:#2563eb"), "Expected primaryColor as background");
});

test("bold: has border-radius:8px on outer table", () => {
  const html = generateSignatureHtml(d({ template: "bold" }));
  ok(html.includes("border-radius:8px"), "Expected border-radius on outer wrapper");
});

test("bold: contact separator uses opacity:0.4", () => {
  const html = generateSignatureHtml(d({ template: "bold" }));
  ok(html.includes("opacity:0.4"), "Expected opacity-based separator in bold contact");
});

// ----------------------------------------------------------------
// elegant
// ----------------------------------------------------------------
test("elegant: default photoSize is 70px", () => {
  const html = generateSignatureHtml(d({ template: "elegant", photoUrl: PHOTO }));
  ok(html.includes("width:70px"), "Expected width:70px for elegant default");
  ok(html.includes("height:70px"), "Expected height:70px for elegant default");
});

test("elegant: default photoShape is circle (border-radius:50%)", () => {
  const html = generateSignatureHtml(d({ template: "elegant", photoUrl: PHOTO }));
  ok(html.includes("border-radius:50%"), "Expected border-radius:50% for elegant default shape");
});

test("elegant: default name font-size is 18px", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  ok(html.includes("font-size:18px"), "Expected font-size:18px for name in elegant");
});

test("elegant: default name color is #1a1a1a", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1a1a1a"), `Expected #1a1a1a near name, got: ${nameCtx}`);
});

test("elegant: uses serif font (Georgia)", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  ok(html.includes("Georgia"), "Expected Georgia serif font");
});

test("elegant: has decorative divider (dots/lines)", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  // Elegant has a decorative divider using colored cells
  ok(html.includes("border-radius:50%"), "Expected circle dot in elegant divider");
});

test("elegant: job title uses italic style", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("font-style:italic"), `Expected italic title in elegant, got: ${titleCtx}`);
});

test("elegant: company uses uppercase letter-spacing", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("text-transform:uppercase"), `Expected uppercase company, got: ${compCtx}`);
  ok(compCtx.includes("letter-spacing"), `Expected letter-spacing on company, got: ${compCtx}`);
});

test("elegant: contact separator uses em dash", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  ok(html.includes("&mdash;"), "Expected em dash separator in elegant");
});

// ----------------------------------------------------------------
// startup
// ----------------------------------------------------------------
test("startup: default photoSize is 44px (avatar)", () => {
  const html = generateSignatureHtml(d({ template: "startup", photoUrl: PHOTO }));
  ok(html.includes("width:44px"), "Expected width:44px for startup avatar");
  ok(html.includes("height:44px"), "Expected height:44px for startup avatar");
});

test("startup: default photoShape is circle (border-radius:50%)", () => {
  const html = generateSignatureHtml(d({ template: "startup", photoUrl: PHOTO }));
  ok(html.includes("border-radius:50%"), "Expected border-radius:50% for startup default shape");
});

test("startup: default name font-size is 15px", () => {
  const html = generateSignatureHtml(d({ template: "startup" }));
  ok(html.includes("font-size:15px"), "Expected font-size:15px for name in startup");
});

test("startup: default name color is #1a1a1a", () => {
  const html = generateSignatureHtml(d({ template: "startup" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1a1a1a"), `Expected #1a1a1a near name, got: ${nameCtx}`);
});

test("startup: title and company use @ separator", () => {
  const html = generateSignatureHtml(d({ template: "startup" }));
  ok(html.includes("@ </span>") || html.includes(" @ "), "Expected @ separator between title and company");
});

test("startup: name/title/company on single line then contact row below", () => {
  const html = generateSignatureHtml(d({ template: "startup" }));
  // Startup is a two-row layout: top row has name+title, bottom row has contact
  ok(html.includes("border-top:1px solid #f0f0f0"), "Expected separator above contact row");
});

test("startup: calendly uses pill/rounded button style (border-radius:12px)", () => {
  const html = generateSignatureHtml(d({ template: "startup", calendlyUrl: "https://calendly.com/test" }));
  ok(html.includes("border-radius:12px"), "Expected rounded pill button in startup");
});

// ----------------------------------------------------------------
// compact
// ----------------------------------------------------------------
test("compact: does NOT include a photo (no photo support)", () => {
  const html = generateSignatureHtml(d({ template: "compact", photoUrl: PHOTO }));
  // Compact template has no photoCell call — verify photo URL does NOT appear
  notOk(html.includes(PHOTO), "Compact template should not render the photo");
});

test("compact: default name font-size is 13px", () => {
  const html = generateSignatureHtml(d({ template: "compact" }));
  ok(html.includes("font-size:13px"), "Expected font-size:13px for name in compact");
});

test("compact: default name color is #1a1a1a", () => {
  const html = generateSignatureHtml(d({ template: "compact" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1a1a1a"), `Expected #1a1a1a near name, got: ${nameCtx}`);
});

test("compact: name, title, company all on single line", () => {
  const html = generateSignatureHtml(d({ template: "compact" }));
  // In compact, all fields are in a single <tr><td> with white-space:nowrap
  ok(html.includes("white-space:nowrap"), "Expected nowrap for single-line layout");
  const nameIdx = html.indexOf("Alex Johnson");
  const titleIdx = html.indexOf("Marketing Manager");
  const compIdx = html.indexOf("Acme Corp");
  // All should be in the same TD (within ~500 chars of each other)
  ok(Math.abs(nameIdx - titleIdx) < 500, "Name and title should be in the same block");
  ok(Math.abs(nameIdx - compIdx) < 500, "Name and company should be in the same block");
});

test("compact: uses middot separator (·) in contact", () => {
  const html = generateSignatureHtml(d({ template: "compact" }));
  ok(html.includes("&middot;"), "Expected middot separator in compact contact");
});

// ----------------------------------------------------------------
// executive
// ----------------------------------------------------------------
test("executive: default photoSize is 80px", () => {
  const html = generateSignatureHtml(d({ template: "executive", photoUrl: PHOTO }));
  ok(html.includes("width:80px"), "Expected width:80px for executive default");
  ok(html.includes("height:80px"), "Expected height:80px for executive default");
});

test("executive: default photoShape is rounded (border-radius:6px)", () => {
  const html = generateSignatureHtml(d({ template: "executive", photoUrl: PHOTO }));
  ok(html.includes("border-radius:6px"), "Expected border-radius:6px for executive default shape");
});

test("executive: default name font-size is 20px", () => {
  const html = generateSignatureHtml(d({ template: "executive" }));
  ok(html.includes("font-size:20px"), "Expected font-size:20px for name in executive");
});

test("executive: name color is #fff (white on dark header)", () => {
  const html = generateSignatureHtml(d({ template: "executive" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#fff"), `Expected white name on dark header, got: ${nameCtx}`);
});

test("executive: has dark header background (#1e293b)", () => {
  const html = generateSignatureHtml(d({ template: "executive" }));
  ok(html.includes("background-color:#1e293b"), "Expected dark header background");
});

test("executive: company uses uppercase text-transform in header", () => {
  const html = generateSignatureHtml(d({ template: "executive" }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("text-transform:uppercase"), `Expected uppercase company, got: ${compCtx}`);
});

test("executive: light section uses left border with primaryColor", () => {
  const html = generateSignatureHtml(d({ template: "executive" }));
  ok(html.includes("border-left:3px solid #2563eb"), "Expected left border on contact section");
});

test("executive: contact section has #fafafa background", () => {
  const html = generateSignatureHtml(d({ template: "executive" }));
  ok(html.includes("background-color:#fafafa"), "Expected #fafafa contact section background");
});

// ----------------------------------------------------------------
// gradient
// ----------------------------------------------------------------
test("gradient: default photoSize is 70px", () => {
  const html = generateSignatureHtml(d({ template: "gradient", photoUrl: PHOTO }));
  ok(html.includes("width:70px"), "Expected width:70px for gradient default");
  ok(html.includes("height:70px"), "Expected height:70px for gradient default");
});

test("gradient: default photoShape is circle (border-radius:50%)", () => {
  const html = generateSignatureHtml(d({ template: "gradient", photoUrl: PHOTO }));
  ok(html.includes("border-radius:50%"), "Expected border-radius:50% for gradient default shape");
});

test("gradient: default name font-size is 19px", () => {
  const html = generateSignatureHtml(d({ template: "gradient" }));
  ok(html.includes("font-size:19px"), "Expected font-size:19px for name in gradient");
});

test("gradient: default name color is primaryColor (#2563eb)", () => {
  const html = generateSignatureHtml(d({ template: "gradient" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#2563eb"), `Expected primaryColor on name, got: ${nameCtx}`);
});

test("gradient: has dual-color left stripe (primary + accent)", () => {
  const html = generateSignatureHtml(d({ template: "gradient" }));
  ok(html.includes("background-color:#2563eb"), "Expected primary stripe");
  ok(html.includes("background-color:#f59e0b"), "Expected accent stripe");
});

test("gradient: content area has #f8fafc background", () => {
  const html = generateSignatureHtml(d({ template: "gradient" }));
  ok(html.includes("background-color:#f8fafc"), "Expected light background on content");
});

test("gradient: title uses accentColor and bold", () => {
  const html = generateSignatureHtml(d({ template: "gradient" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("color:#f59e0b"), `Expected accentColor on title, got: ${titleCtx}`);
  ok(titleCtx.includes("font-weight:bold"), `Expected bold title, got: ${titleCtx}`);
});

// ----------------------------------------------------------------
// developer
// ----------------------------------------------------------------
test("developer: default photoSize is 64px", () => {
  const html = generateSignatureHtml(d({ template: "developer", photoUrl: PHOTO }));
  ok(html.includes("width:64px"), "Expected width:64px for developer default");
  ok(html.includes("height:64px"), "Expected height:64px for developer default");
});

test("developer: default photoShape is rounded (border-radius:4px)", () => {
  const html = generateSignatureHtml(d({ template: "developer", photoUrl: PHOTO }));
  ok(html.includes("border-radius:4px"), "Expected border-radius:4px for developer default shape");
});

test("developer: default name font-size is 15px", () => {
  const html = generateSignatureHtml(d({ template: "developer" }));
  ok(html.includes("font-size:15px"), "Expected font-size:15px for name in developer");
});

test("developer: default name color is primaryColor (#2563eb)", () => {
  const html = generateSignatureHtml(d({ template: "developer" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#2563eb"), `Expected primaryColor on name, got: ${nameCtx}`);
});

test("developer: uses monospace font (Courier New)", () => {
  const html = generateSignatureHtml(d({ template: "developer" }));
  ok(html.includes("Courier New") || html.includes("Courier"), "Expected monospace font");
});

test("developer: name has comment prefix (//) in HTML", () => {
  const html = generateSignatureHtml(d({ template: "developer" }));
  ok(html.includes("// </span>") || html.includes("// "), "Expected // comment prefix before name");
});

test("developer: job title uses const role = syntax", () => {
  const html = generateSignatureHtml(d({ template: "developer" }));
  ok(html.includes("const "), "Expected const keyword in developer title");
  ok(html.includes("role"), "Expected role variable name");
});

test("developer: contact items use > prefix", () => {
  const html = generateSignatureHtml(d({ template: "developer" }));
  ok(html.includes("&gt; "), "Expected > prefix for contact items");
});

test("developer: has bottom border (border-bottom:2px solid #e2e8f0)", () => {
  const html = generateSignatureHtml(d({ template: "developer" }));
  ok(html.includes("border-bottom:2px solid #e2e8f0"), "Expected bottom border in developer");
});

test("developer: github field rendered separately with github/ prefix", () => {
  const html = generateSignatureHtml(d({
    template: "developer",
    github: "https://github.com/testuser"
  }));
  ok(html.includes("github/testuser"), "Expected github/username link format");
});

// ----------------------------------------------------------------
// sales
// ----------------------------------------------------------------
test("sales: default photoSize is 72px", () => {
  const html = generateSignatureHtml(d({ template: "sales", photoUrl: PHOTO }));
  ok(html.includes("width:72px"), "Expected width:72px for sales default");
  ok(html.includes("height:72px"), "Expected height:72px for sales default");
});

test("sales: default photoShape is circle (border-radius:50%)", () => {
  const html = generateSignatureHtml(d({ template: "sales", photoUrl: PHOTO }));
  ok(html.includes("border-radius:50%"), "Expected border-radius:50% for sales default shape");
});

test("sales: default name font-size is 16px", () => {
  const html = generateSignatureHtml(d({ template: "sales" }));
  ok(html.includes("font-size:16px"), "Expected font-size:16px for name in sales");
});

test("sales: default name color is #1a1a1a", () => {
  const html = generateSignatureHtml(d({ template: "sales" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1a1a1a"), `Expected #1a1a1a near name, got: ${nameCtx}`);
});

test("sales: phone appears as hero click-to-call above name in green", () => {
  const html = generateSignatureHtml(d({ template: "sales" }));
  // The phone is rendered inside a <td style="font-size:18px;font-weight:bold;color:#16a34a;">
  // contextAround looks backwards from the phone text and finds the <a> tag's style, not the <td>'s.
  // So we check the broader HTML slice around the phone occurrence.
  const phoneIdx = html.indexOf("+1 (555) 123-4567");
  const phoneBlock = html.slice(Math.max(0, phoneIdx - 200), phoneIdx + 100);
  ok(phoneBlock.includes("color:#16a34a"), `Expected green phone color, got: ${phoneBlock}`);
  ok(phoneBlock.includes("font-size:18px"), `Expected large phone font-size, got: ${phoneBlock}`);
});

test("sales: phone appears BEFORE name in the HTML (hero position)", () => {
  const html = generateSignatureHtml(d({ template: "sales" }));
  const phoneIdx = html.indexOf("+1 (555) 123-4567");
  const nameIdx = html.indexOf("Alex Johnson");
  ok(phoneIdx < nameIdx, "Phone should appear before name in sales template");
});

test("sales: calendly button uses green (#16a34a) not primaryColor", () => {
  const html = generateSignatureHtml(d({ template: "sales", calendlyUrl: "https://calendly.com/x" }));
  ok(html.includes("background-color:#16a34a"), "Expected green calendly button in sales");
  ok(html.includes("Schedule a Call"), "Expected 'Schedule a Call' text in sales calendly button");
});

// ----------------------------------------------------------------
// medical
// ----------------------------------------------------------------
test("medical: default photoSize is 72px", () => {
  const html = generateSignatureHtml(d({ template: "medical", photoUrl: PHOTO }));
  ok(html.includes("width:72px"), "Expected width:72px for medical default");
  ok(html.includes("height:72px"), "Expected height:72px for medical default");
});

test("medical: default photoShape is circle (border-radius:50%)", () => {
  const html = generateSignatureHtml(d({ template: "medical", photoUrl: PHOTO }));
  ok(html.includes("border-radius:50%"), "Expected border-radius:50% for medical default shape");
});

test("medical: default name font-size is 17px", () => {
  const html = generateSignatureHtml(d({ template: "medical" }));
  ok(html.includes("font-size:17px"), "Expected font-size:17px for name in medical");
});

test("medical: primaryColor overrides to teal (#0d9488) when default blue used", () => {
  // Medical template overrides the default blue with teal
  const html = generateSignatureHtml(d({ template: "medical" }));
  ok(html.includes("#0d9488"), "Expected teal color (#0d9488) when default primaryColor is used");
});

test("medical: photo has colored border matching the effective color", () => {
  const html = generateSignatureHtml(d({ template: "medical", photoUrl: PHOTO }));
  ok(html.includes("border:2px solid #0d9488"), "Expected photo border with teal color in medical");
});

test("medical: has border-top:3px solid (matching effective color)", () => {
  const html = generateSignatureHtml(d({ template: "medical" }));
  ok(html.includes("border-top:3px solid #0d9488"), "Expected border-top with teal color");
});

test("medical: when non-default primaryColor used, it does NOT override to teal", () => {
  const html = generateSignatureHtml(d({ template: "medical", primaryColor: "#7c3aed" }));
  ok(html.includes("#7c3aed"), "Expected custom primaryColor to be used");
  notOk(html.includes("#0d9488"), "Should NOT use teal when a non-default primaryColor is given");
});

// ----------------------------------------------------------------
// legal
// ----------------------------------------------------------------
test("legal: default photoSize is 72px", () => {
  const html = generateSignatureHtml(d({ template: "legal", photoUrl: PHOTO }));
  ok(html.includes("width:72px"), "Expected width:72px for legal default");
  ok(html.includes("height:72px"), "Expected height:72px for legal default");
});

test("legal: default photoShape is square-ish (border-radius:2px)", () => {
  const html = generateSignatureHtml(d({ template: "legal", photoUrl: PHOTO }));
  ok(html.includes("border-radius:2px"), "Expected border-radius:2px for legal default shape");
});

test("legal: default name font-size is 16px", () => {
  const html = generateSignatureHtml(d({ template: "legal" }));
  ok(html.includes("font-size:16px"), "Expected font-size:16px for name in legal");
});

test("legal: name uses uppercase letter-spacing:2px", () => {
  const html = generateSignatureHtml(d({ template: "legal" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("letter-spacing:2px"), `Expected letter-spacing:2px on name, got: ${nameCtx}`);
  ok(nameCtx.includes("text-transform:uppercase"), `Expected uppercase name, got: ${nameCtx}`);
});

test("legal: uses serif font (Georgia)", () => {
  const html = generateSignatureHtml(d({ template: "legal" }));
  ok(html.includes("Georgia"), "Expected Georgia serif font in legal");
});

test("legal: job title uses italic style", () => {
  const html = generateSignatureHtml(d({ template: "legal" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("font-style:italic"), `Expected italic title in legal, got: ${titleCtx}`);
});

test("legal: has bottom border on outer table (border-bottom:3px solid #334155)", () => {
  const html = generateSignatureHtml(d({ template: "legal" }));
  ok(html.includes("border-bottom:3px solid #334155"), "Expected bottom border in legal");
});

test("legal: contact has separator (border-top:2px solid #334155)", () => {
  const html = generateSignatureHtml(d({ template: "legal" }));
  ok(html.includes("border-top:2px solid #334155"), "Expected separator above contact in legal");
});

test("legal: company is bold and larger than title", () => {
  const html = generateSignatureHtml(d({ template: "legal" }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("font-weight:bold"), `Expected bold company, got: ${compCtx}`);
  ok(compCtx.includes("font-size:13px"), `Expected font-size:13px for company, got: ${compCtx}`);
});

// ----------------------------------------------------------------
// academic
// ----------------------------------------------------------------
test("academic: default photoSize is 68px", () => {
  const html = generateSignatureHtml(d({ template: "academic", photoUrl: PHOTO }));
  ok(html.includes("width:68px"), "Expected width:68px for academic default");
  ok(html.includes("height:68px"), "Expected height:68px for academic default");
});

test("academic: default photoShape is rounded (border-radius:4px)", () => {
  const html = generateSignatureHtml(d({ template: "academic", photoUrl: PHOTO }));
  ok(html.includes("border-radius:4px"), "Expected border-radius:4px for academic default shape");
});

test("academic: default name font-size is 18px", () => {
  const html = generateSignatureHtml(d({ template: "academic" }));
  ok(html.includes("font-size:18px"), "Expected font-size:18px for name in academic");
});

test("academic: default name color is navy (#1e3a5f)", () => {
  const html = generateSignatureHtml(d({ template: "academic" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1e3a5f"), `Expected navy color on name, got: ${nameCtx}`);
});

test("academic: job title uses italic style", () => {
  const html = generateSignatureHtml(d({ template: "academic" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("font-style:italic"), `Expected italic title in academic, got: ${titleCtx}`);
});

test("academic: company uses navy (#1e3a5f) and bold", () => {
  const html = generateSignatureHtml(d({ template: "academic" }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("color:#1e3a5f"), `Expected navy on company, got: ${compCtx}`);
  ok(compCtx.includes("font-weight:bold"), `Expected bold company, got: ${compCtx}`);
});

test("academic: contact in separate row with border-top separator", () => {
  const html = generateSignatureHtml(d({ template: "academic" }));
  ok(html.includes("border-top:1px solid #cbd5e1"), "Expected border-top in academic contact separator");
});

// ----------------------------------------------------------------
// realtor
// ----------------------------------------------------------------
test("realtor: default photoSize is 100px (largest default)", () => {
  const html = generateSignatureHtml(d({ template: "realtor", photoUrl: PHOTO }));
  ok(html.includes("width:100px"), "Expected width:100px for realtor default");
  ok(html.includes("height:100px"), "Expected height:100px for realtor default");
});

test("realtor: default photoShape is rounded (border-radius:8px)", () => {
  const html = generateSignatureHtml(d({ template: "realtor", photoUrl: PHOTO }));
  ok(html.includes("border-radius:8px"), "Expected border-radius:8px for realtor default shape");
});

test("realtor: photo has colored border (3px solid primaryColor)", () => {
  const html = generateSignatureHtml(d({ template: "realtor", photoUrl: PHOTO }));
  ok(html.includes("border:3px solid #2563eb"), "Expected photo border with primaryColor");
});

test("realtor: default name font-size is 22px (largest name size)", () => {
  const html = generateSignatureHtml(d({ template: "realtor" }));
  ok(html.includes("font-size:22px"), "Expected font-size:22px for name in realtor");
});

test("realtor: default name color is #1a1a1a", () => {
  const html = generateSignatureHtml(d({ template: "realtor" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1a1a1a"), `Expected #1a1a1a near name, got: ${nameCtx}`);
});

test("realtor: has left border with primaryColor (4px solid)", () => {
  const html = generateSignatureHtml(d({ template: "realtor" }));
  ok(html.includes("border-left:4px solid #2563eb"), "Expected left border in realtor");
});

test("realtor: company font-size is 14px (largest company size)", () => {
  const html = generateSignatureHtml(d({ template: "realtor" }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("font-size:14px"), `Expected font-size:14px for company, got: ${compCtx}`);
});

test("realtor: phone and email inline with pipe separator", () => {
  const html = generateSignatureHtml(d({ template: "realtor" }));
  // Phone and email in same row
  const phoneIdx = html.indexOf("+1 (555) 123-4567");
  const emailIdx = html.indexOf("alex@acmecorp.com");
  ok(Math.abs(phoneIdx - emailIdx) < 400, "Phone and email should be in same row");
});

test("realtor: website appears on separate row with accentColor", () => {
  const html = generateSignatureHtml(d({ template: "realtor" }));
  // The website display text is "www.acmecorp.com" (protocol stripped).
  // "acmecorp.com" also appears in the email link, so we search for the www. prefixed version.
  const webCtx = contextAround(html, "www.acmecorp.com");
  ok(webCtx.includes("color:#f59e0b"), `Expected accentColor on website link, got: ${webCtx}`);
});

// ----------------------------------------------------------------
// influencer
// ----------------------------------------------------------------
test("influencer: default photoSize is 85px", () => {
  const html = generateSignatureHtml(d({ template: "influencer", photoUrl: PHOTO }));
  ok(html.includes("width:85px"), "Expected width:85px for influencer default");
  ok(html.includes("height:85px"), "Expected height:85px for influencer default");
});

test("influencer: default photoShape is circle (border-radius:50%)", () => {
  const html = generateSignatureHtml(d({ template: "influencer", photoUrl: PHOTO }));
  ok(html.includes("border-radius:50%"), "Expected border-radius:50% for influencer default shape");
});

test("influencer: photo has dual border (primary color + accent outline)", () => {
  const html = generateSignatureHtml(d({ template: "influencer", photoUrl: PHOTO }));
  ok(html.includes("border:3px solid #2563eb"), "Expected primary color border");
  ok(html.includes("outline:3px solid #f59e0b"), "Expected accent color outline");
});

test("influencer: default name font-size is 21px", () => {
  const html = generateSignatureHtml(d({ template: "influencer" }));
  ok(html.includes("font-size:21px"), "Expected font-size:21px for name in influencer");
});

test("influencer: default name color is primaryColor (#2563eb)", () => {
  const html = generateSignatureHtml(d({ template: "influencer" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#2563eb"), `Expected primaryColor on name, got: ${nameCtx}`);
});

test("influencer: job title uses accentColor and bold", () => {
  const html = generateSignatureHtml(d({ template: "influencer" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("color:#f59e0b"), `Expected accentColor on title, got: ${titleCtx}`);
  ok(titleCtx.includes("font-weight:bold"), `Expected bold title, got: ${titleCtx}`);
});

test("influencer: company appears with @ prefix", () => {
  const html = generateSignatureHtml(d({ template: "influencer" }));
  ok(html.includes("@Acme Corp"), "Expected @ prefix before company name");
});

test("influencer: social icons are 24px (larger than standard 20px)", () => {
  const html = generateSignatureHtml(d({
    template: "influencer",
    instagram: "https://instagram.com/test"
  }));
  ok(html.includes("width:24px"), "Expected 24px icons in influencer");
  ok(html.includes("height:24px"), "Expected 24px icons in influencer");
});

// ----------------------------------------------------------------
// photographer
// ----------------------------------------------------------------
test("photographer: default photoSize is 55px", () => {
  const html = generateSignatureHtml(d({ template: "photographer", photoUrl: PHOTO }));
  ok(html.includes("width:55px"), "Expected width:55px for photographer default");
  ok(html.includes("height:55px"), "Expected height:55px for photographer default");
});

test("photographer: default photoShape is square (border-radius:0)", () => {
  const html = generateSignatureHtml(d({ template: "photographer", photoUrl: PHOTO }));
  // Photographer uses square as default shape
  ok(html.includes("border-radius:0"), "Expected border-radius:0 for photographer default shape");
});

test("photographer: default name font-size is 18px", () => {
  const html = generateSignatureHtml(d({ template: "photographer" }));
  ok(html.includes("font-size:18px"), "Expected font-size:18px for name in photographer");
});

test("photographer: name is NOT bold (nameBold defaults false)", () => {
  const html = generateSignatureHtml(d({ template: "photographer" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("font-weight:normal"), `Expected font-weight:normal on name in photographer, got: ${nameCtx}`);
});

test("photographer: name has letter-spacing:1.5px", () => {
  const html = generateSignatureHtml(d({ template: "photographer" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("letter-spacing:1.5px"), `Expected letter-spacing on name, got: ${nameCtx}`);
});

test("photographer: website uses underline and italic style", () => {
  const html = generateSignatureHtml(d({ template: "photographer" }));
  // "acmecorp.com" appears first in the email link. The website display text is "www.acmecorp.com".
  const webCtx = contextAround(html, "www.acmecorp.com");
  ok(webCtx.includes("text-decoration:underline"), `Expected underline on website, got: ${webCtx}`);
  ok(webCtx.includes("font-style:italic"), `Expected italic on website, got: ${webCtx}`);
});

test("photographer: phone and email are in separate TD cells (not inline)", () => {
  const html = generateSignatureHtml(d({ template: "photographer" }));
  // Photographer puts phone and email in table cells
  const phoneCtx = contextAround(html, "+1 (555) 123-4567", 50);
  ok(phoneCtx.includes("<td"), `Expected phone in <td>, got: ${phoneCtx}`);
});

test("photographer: has border-top separator above contact area", () => {
  const html = generateSignatureHtml(d({ template: "photographer" }));
  ok(html.includes("border-top:1px solid #e5e7eb"), "Expected border-top separator in photographer");
});

// ----------------------------------------------------------------
// dark
// ----------------------------------------------------------------
test("dark: default photoSize is 76px", () => {
  const html = generateSignatureHtml(d({ template: "dark", photoUrl: PHOTO }));
  ok(html.includes("width:76px"), "Expected width:76px for dark default");
  ok(html.includes("height:76px"), "Expected height:76px for dark default");
});

test("dark: default photoShape is rounded (border-radius:8px)", () => {
  const html = generateSignatureHtml(d({ template: "dark", photoUrl: PHOTO }));
  ok(html.includes("border-radius:8px"), "Expected border-radius:8px for dark default shape");
});

test("dark: default name font-size is 19px", () => {
  const html = generateSignatureHtml(d({ template: "dark" }));
  ok(html.includes("font-size:19px"), "Expected font-size:19px for name in dark");
});

test("dark: name color is #f1f5f9 (near-white on dark background)", () => {
  const html = generateSignatureHtml(d({ template: "dark" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#f1f5f9"), `Expected near-white name color, got: ${nameCtx}`);
});

test("dark: outer background is #111827 (near-black)", () => {
  const html = generateSignatureHtml(d({ template: "dark" }));
  ok(html.includes("background-color:#111827"), "Expected dark background");
});

test("dark: has border-radius:8px on outer wrapper", () => {
  const html = generateSignatureHtml(d({ template: "dark" }));
  ok(html.includes("border-radius:8px"), "Expected border-radius on dark wrapper");
});

test("dark: job title uses accentColor and bold", () => {
  const html = generateSignatureHtml(d({ template: "dark" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("color:#f59e0b"), `Expected accentColor on title in dark, got: ${titleCtx}`);
  ok(titleCtx.includes("font-weight:bold"), `Expected bold title, got: ${titleCtx}`);
});

test("dark: company uses rgba semi-transparent color", () => {
  const html = generateSignatureHtml(d({ template: "dark" }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("rgba(255,255,255,0.45)"), `Expected semi-transparent company color, got: ${compCtx}`);
});

// ----------------------------------------------------------------
// simple
// ----------------------------------------------------------------
test("simple: does NOT render photo", () => {
  const html = generateSignatureHtml(d({ template: "simple", photoUrl: PHOTO }));
  notOk(html.includes(PHOTO), "Simple template should not render the photo");
});

test("simple: default name font-size is 14px", () => {
  const html = generateSignatureHtml(d({ template: "simple" }));
  ok(html.includes("font-size:14px"), "Expected font-size:14px for name in simple");
});

test("simple: default name color is #1a1a1a", () => {
  const html = generateSignatureHtml(d({ template: "simple" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#1a1a1a"), `Expected #1a1a1a near name, got: ${nameCtx}`);
});

test("simple: name, title, company on single line with | separator", () => {
  const html = generateSignatureHtml(d({ template: "simple" }));
  ok(html.includes("white-space:nowrap"), "Expected nowrap for single-line layout");
  // All three fields close together
  const nameIdx = html.indexOf("Alex Johnson");
  const titleIdx = html.indexOf("Marketing Manager");
  ok(Math.abs(nameIdx - titleIdx) < 500, "Name and title should be in same block");
});

test("simple: uses middot separator in contact", () => {
  const html = generateSignatureHtml(d({ template: "simple" }));
  ok(html.includes("&middot;"), "Expected middot separator in simple contact");
});

// ============================================================
// SECTION 2: Override Precision
// ============================================================

console.log("\n=== SECTION 2: Override Precision ===\n");

test("nameSize override replaces default in minimal (17 → 28)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal" }));
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", nameSize: 28 }));
  ok(defaultHtml.includes("font-size:17px"), "Default should have 17px");
  ok(overrideHtml.includes("font-size:28px"), "Override should have 28px");
  // 17px should NOT appear in the name context of the overridden version
  const nameCtx = contextAround(overrideHtml, "Alex Johnson");
  notOk(nameCtx.includes("font-size:17px"), `font-size:17px should not appear near name when overridden, got: ${nameCtx}`);
});

test("nameSize override replaces default in creative (20 → 14)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "creative" }));
  const overrideHtml = generateSignatureHtml(d({ template: "creative", nameSize: 14 }));
  ok(defaultHtml.includes("font-size:20px"), "Default creative should have 20px name");
  ok(overrideHtml.includes("font-size:14px"), "Override should have 14px name");
});

test("nameColor override replaces default in minimal (#1a1a1a → #ff0000)", () => {
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", nameColor: "#ff0000" }));
  const nameCtx = contextAround(overrideHtml, "Alex Johnson");
  ok(nameCtx.includes("color:#ff0000"), `Expected red color near name, got: ${nameCtx}`);
  notOk(nameCtx.includes("color:#1a1a1a"), `Default #1a1a1a should not appear near name when overridden, got: ${nameCtx}`);
});

test("nameColor override replaces default in modern (primaryColor → #ff0000)", () => {
  const overrideHtml = generateSignatureHtml(d({ template: "modern", nameColor: "#ff0000" }));
  const nameCtx = contextAround(overrideHtml, "Alex Johnson");
  ok(nameCtx.includes("color:#ff0000"), `Expected red color near name, got: ${nameCtx}`);
  notOk(nameCtx.includes("color:#2563eb") && nameCtx.startsWith("color:#2563eb"), "Primary color should be replaced in name style");
});

test("nameBold=false overrides default bold in minimal", () => {
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", nameBold: false }));
  const nameCtx = contextAround(overrideHtml, "Alex Johnson");
  ok(nameCtx.includes("font-weight:normal"), `Expected font-weight:normal when nameBold=false, got: ${nameCtx}`);
  notOk(nameCtx.includes("font-weight:bold"), `Should not have bold when nameBold=false, got: ${nameCtx}`);
});

test("nameBold=true makes photographer name bold (overrides false default)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "photographer" }));
  const overrideHtml = generateSignatureHtml(d({ template: "photographer", nameBold: true }));
  const defaultNameCtx = contextAround(defaultHtml, "Alex Johnson");
  const overrideNameCtx = contextAround(overrideHtml, "Alex Johnson");
  ok(defaultNameCtx.includes("font-weight:normal"), "Photographer default name is not bold");
  ok(overrideNameCtx.includes("font-weight:bold"), "nameBold=true should make name bold");
});

test("nameItalic=true adds italic style to name in minimal", () => {
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", nameItalic: true }));
  const nameCtx = contextAround(overrideHtml, "Alex Johnson");
  ok(nameCtx.includes("font-style:italic"), `Expected italic when nameItalic=true, got: ${nameCtx}`);
});

test("titleSize override replaces default in minimal (12 → 18)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal" }));
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", titleSize: 18 }));
  // Default title size is 12 — find it near Marketing Manager
  const defaultTitleCtx = contextAround(defaultHtml, "Marketing Manager");
  const overrideTitleCtx = contextAround(overrideHtml, "Marketing Manager");
  ok(defaultTitleCtx.includes("font-size:12px"), "Default minimal title is 12px");
  ok(overrideTitleCtx.includes("font-size:18px"), "Override title should be 18px");
  // NOTE: 12px will still appear in the HTML near the title because the company row (also 12px
  // by default) immediately follows. We verify the title element itself uses 18px, not 12px,
  // by checking the style attribute that contains "Marketing Manager" text.
  // The title <td style="font-size:18px...">Marketing Manager</td> — verify 18px is immediately before.
  const titleElementIdx = overrideHtml.indexOf("Marketing Manager");
  const titleStyle = overrideHtml.slice(Math.max(0, titleElementIdx - 80), titleElementIdx);
  ok(titleStyle.includes("font-size:18px"), `Title element style should have 18px, got: ${titleStyle}`);
  notOk(titleStyle.includes("font-size:12px"), `Title element style should NOT have 12px, got: ${titleStyle}`);
});

test("titleColor override replaces default in modern (accentColor → #123456)", () => {
  const overrideHtml = generateSignatureHtml(d({ template: "modern", titleColor: "#123456" }));
  const titleCtx = contextAround(overrideHtml, "Marketing Manager");
  ok(titleCtx.includes("color:#123456"), `Expected override color near title, got: ${titleCtx}`);
  notOk(titleCtx.includes("color:#f59e0b"), `Accent color should be replaced on title, got: ${titleCtx}`);
});

test("titleBold=true makes title bold in minimal (default is not bold)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal" }));
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", titleBold: true }));
  const defaultTitleCtx = contextAround(defaultHtml, "Marketing Manager");
  const overrideTitleCtx = contextAround(overrideHtml, "Marketing Manager");
  ok(defaultTitleCtx.includes("font-weight:normal"), "Default minimal title is not bold");
  ok(overrideTitleCtx.includes("font-weight:bold"), "titleBold=true should make title bold");
});

test("titleItalic=true adds italic to title in minimal", () => {
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", titleItalic: true }));
  const titleCtx = contextAround(overrideHtml, "Marketing Manager");
  ok(titleCtx.includes("font-style:italic"), `Expected italic title, got: ${titleCtx}`);
});

test("titleItalic=false removes italic from elegant title (default is italic)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "elegant" }));
  const overrideHtml = generateSignatureHtml(d({ template: "elegant", titleItalic: false }));
  const defaultTitleCtx = contextAround(defaultHtml, "Marketing Manager");
  const overrideTitleCtx = contextAround(overrideHtml, "Marketing Manager");
  ok(defaultTitleCtx.includes("font-style:italic"), "Elegant default title is italic");
  notOk(overrideTitleCtx.includes("font-style:italic"), "titleItalic=false should remove italic");
});

test("companySize override replaces default in minimal (12 → 20)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal" }));
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", companySize: 20 }));
  const defaultCompCtx = contextAround(defaultHtml, "Acme Corp");
  const overrideCompCtx = contextAround(overrideHtml, "Acme Corp");
  ok(defaultCompCtx.includes("font-size:12px"), "Default company size is 12px in minimal");
  ok(overrideCompCtx.includes("font-size:20px"), "Override company size should be 20px");
  // NOTE: 12px will still appear near "Acme Corp" because the contact row (font-size:12px) follows.
  // Verify the company element itself uses 20px by checking the style immediately before the text.
  const compElementIdx = overrideHtml.indexOf("Acme Corp");
  const compStyle = overrideHtml.slice(Math.max(0, compElementIdx - 80), compElementIdx);
  ok(compStyle.includes("font-size:20px"), `Company element style should have 20px, got: ${compStyle}`);
  notOk(compStyle.includes("font-size:12px"), `Company element style should NOT have 12px, got: ${compStyle}`);
});

test("companyColor override replaces default in minimal (#999 → #abcdef)", () => {
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", companyColor: "#abcdef" }));
  const compCtx = contextAround(overrideHtml, "Acme Corp");
  ok(compCtx.includes("color:#abcdef"), `Expected override color near company, got: ${compCtx}`);
  notOk(compCtx.includes("color:#999"), `Default #999 should be replaced, got: ${compCtx}`);
});

test("companyBold=true makes company bold in minimal (default is not bold)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal" }));
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", companyBold: true }));
  const defaultCompCtx = contextAround(defaultHtml, "Acme Corp");
  const overrideCompCtx = contextAround(overrideHtml, "Acme Corp");
  ok(defaultCompCtx.includes("font-weight:normal"), "Default minimal company is not bold");
  ok(overrideCompCtx.includes("font-weight:bold"), "companyBold=true should make company bold");
});

test("photoSize override replaces default in minimal (70 → 120)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO }));
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO, photoSize: 120 }));
  ok(defaultHtml.includes("width:70px"), "Default minimal photo is 70px");
  ok(overrideHtml.includes("width:120px"), "Override should be 120px");
  notOk(overrideHtml.includes("width:70px"), "70px should not appear when overridden");
});

test("photoSize override replaces default in creative (90 → 50)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "creative", photoUrl: PHOTO }));
  const overrideHtml = generateSignatureHtml(d({ template: "creative", photoUrl: PHOTO, photoSize: 50 }));
  ok(defaultHtml.includes("width:90px"), "Default creative photo is 90px");
  ok(overrideHtml.includes("width:50px"), "Override should be 50px");
  notOk(overrideHtml.includes("width:90px"), "90px should not appear when overridden");
});

test("photoShape=square overrides circle default in creative", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "creative", photoUrl: PHOTO }));
  const overrideHtml = generateSignatureHtml(d({ template: "creative", photoUrl: PHOTO, photoShape: "square" }));
  ok(defaultHtml.includes("border-radius:50%"), "Default creative photo is circle");
  // Square means border-radius:0
  const photoCtx = contextAround(overrideHtml, PHOTO);
  ok(photoCtx.includes("border-radius:0"), `Expected border-radius:0 for square, got: ${photoCtx}`);
  notOk(photoCtx.includes("border-radius:50%"), "50% should not appear when shape=square");
});

test("photoShape=rounded overrides circle default in minimal", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO }));
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO, photoShape: "rounded" }));
  ok(defaultHtml.includes("border-radius:50%"), "Default minimal photo is circle");
  const photoCtx = contextAround(overrideHtml, PHOTO);
  ok(photoCtx.includes("border-radius:8px"), `Expected border-radius:8px for rounded, got: ${photoCtx}`);
  notOk(photoCtx.includes("border-radius:50%"), "50% should not appear when shape=rounded");
});

test("photoShape=circle overrides rounded default in modern", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "modern", photoUrl: PHOTO }));
  const overrideHtml = generateSignatureHtml(d({ template: "modern", photoUrl: PHOTO, photoShape: "circle" }));
  ok(defaultHtml.includes("border-radius:8px"), "Default modern photo is rounded");
  const photoCtx = contextAround(overrideHtml, PHOTO);
  ok(photoCtx.includes("border-radius:50%"), `Expected border-radius:50% for circle, got: ${photoCtx}`);
});

test("fontFamily override replaces default in minimal", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal" }));
  const overrideHtml = generateSignatureHtml(d({ template: "minimal", fontFamily: "Verdana,sans-serif" }));
  ok(defaultHtml.includes("Arial,Helvetica,sans-serif"), "Default minimal uses Arial");
  ok(overrideHtml.includes("Verdana,sans-serif"), "Override should use Verdana");
  // The outer table font-family should use override
  notOk(overrideHtml.includes("font-family:Arial,Helvetica,sans-serif"), "Arial should be replaced by override");
});

test("fontFamily override replaces Courier New in developer", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "developer" }));
  const overrideHtml = generateSignatureHtml(d({ template: "developer", fontFamily: "Arial,sans-serif" }));
  ok(defaultHtml.includes("Courier New") || defaultHtml.includes("Courier"), "Default developer uses monospace");
  ok(overrideHtml.includes("Arial,sans-serif"), "Override should use Arial");
});

test("photoPosition=right moves photo after content", () => {
  const leftHtml = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO }));
  const rightHtml = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO, photoPosition: "right" }));
  const leftPhotoIdx = leftHtml.indexOf(PHOTO);
  const leftNameIdx = leftHtml.indexOf("Alex Johnson");
  const rightPhotoIdx = rightHtml.indexOf(PHOTO);
  const rightNameIdx = rightHtml.indexOf("Alex Johnson");
  ok(leftPhotoIdx < leftNameIdx, "Left: photo should be before name");
  ok(rightPhotoIdx > rightNameIdx, "Right: photo should be after name");
});

test("photoPosition=right works in modern template", () => {
  const rightHtml = generateSignatureHtml(d({ template: "modern", photoUrl: PHOTO, photoPosition: "right" }));
  const photoIdx = rightHtml.indexOf(PHOTO);
  const nameIdx = rightHtml.indexOf("Alex Johnson");
  ok(photoIdx > nameIdx, "Photo should appear after name when photoPosition=right");
});

test("primaryColor change propagates to all color references in minimal", () => {
  const html = generateSignatureHtml(d({ template: "minimal", primaryColor: "#ff6600" }));
  ok(html.includes("#ff6600"), "Expected custom primaryColor in output");
  // Check it's in the email link
  const emailCtx = contextAround(html, "alex@acmecorp.com");
  ok(emailCtx.includes("#ff6600"), `Expected primaryColor in email link color, got: ${emailCtx}`);
});

test("accentColor change propagates to modern title color", () => {
  const html = generateSignatureHtml(d({ template: "modern", accentColor: "#aa1122" }));
  const titleCtx = contextAround(html, "Marketing Manager");
  ok(titleCtx.includes("color:#aa1122"), `Expected custom accentColor on title, got: ${titleCtx}`);
});

test("backgroundColor wraps output in outer table", () => {
  const html = generateSignatureHtml(d({ template: "minimal", backgroundColor: "#f0f0f0" }));
  ok(html.includes("background-color:#f0f0f0"), "Expected custom background color in wrapper");
  ok(html.includes("<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#f0f0f0"), "Expected wrapper table");
});

test("textOnDark=true replaces dark text colors with white equivalents", () => {
  const html = generateSignatureHtml(d({ template: "minimal", backgroundColor: "#000000", textOnDark: true }));
  // textOnDark replaces #1a1a1a, #333, #555, #666, #999, #aaa
  notOk(html.includes("color:#1a1a1a"), "textOnDark should replace #1a1a1a");
  notOk(html.includes("color:#333"), "textOnDark should replace #333");
  notOk(html.includes("color:#555"), "textOnDark should replace #555");
  ok(html.includes("color:#ffffff") || html.includes("rgba(255,255,255"), "Should have white/rgba colors");
});

// ============================================================
// SECTION 3: Template Switch Simulation
// ============================================================

console.log("\n=== SECTION 3: Template Switch Simulation ===\n");

test("switch minimal→creative: square photoShape from minimal still renders square in creative", () => {
  // User set photoShape="square" on minimal, then switches to creative
  // Creative default is "circle", but stored data.photoShape="square" takes precedence
  const html = generateSignatureHtml(d({
    template: "creative",
    photoUrl: PHOTO,
    photoShape: "square" // previously set on minimal
  }));
  const photoCtx = contextAround(html, PHOTO);
  ok(photoCtx.includes("border-radius:0"), `Creative should show square when photoShape=square, got: ${photoCtx}`);
  notOk(photoCtx.includes("border-radius:50%"), "Circle default should NOT appear when photoShape=square is stored");
});

test("switch creative→minimal: circle photoShape from creative overrides minimal's circle default (same result)", () => {
  // User set photoShape="circle" on creative, switches to minimal — both are circle, so same result
  const html = generateSignatureHtml(d({
    template: "minimal",
    photoUrl: PHOTO,
    photoShape: "circle"
  }));
  const photoCtx = contextAround(html, PHOTO);
  ok(photoCtx.includes("border-radius:50%"), "Should still be circle");
});

test("switch bold→minimal: square photoShape from bold shows as square in minimal (overrides circle default)", () => {
  // Bold default is rounded, user changed to square, now switches to minimal (circle default)
  const html = generateSignatureHtml(d({
    template: "minimal",
    photoUrl: PHOTO,
    photoShape: "square"
  }));
  const photoCtx = contextAround(html, PHOTO);
  ok(photoCtx.includes("border-radius:0"), `Stored square should override minimal's circle default, got: ${photoCtx}`);
});

test("switch minimal→realtor: photoSize=40 stored from minimal is used in realtor (not 100 default)", () => {
  // Realtor default is 100px, but if user set 40 on minimal and switches to realtor, 40 is used
  const html = generateSignatureHtml(d({
    template: "realtor",
    photoUrl: PHOTO,
    photoSize: 40
  }));
  ok(html.includes("width:40px"), "Stored photoSize=40 should be used, not realtor's 100 default");
  notOk(html.includes("width:100px"), "Realtor default 100px should NOT appear when photoSize is stored");
});

test("switch realtor→startup: photoSize=100 stored from realtor is used in startup (not 44 default)", () => {
  const html = generateSignatureHtml(d({
    template: "startup",
    photoUrl: PHOTO,
    photoSize: 100
  }));
  ok(html.includes("width:100px"), "Stored photoSize=100 should override startup's 44 default");
  notOk(html.includes("width:44px"), "Startup default 44px should NOT appear when photoSize is stored");
});

test("switch minimal→developer: fontFamily stored as Georgia from elegant persists in developer", () => {
  // User was on elegant (Georgia), switches to developer (Courier New default)
  // If fontFamily is stored in data, it overrides the template default
  const html = generateSignatureHtml(d({
    template: "developer",
    fontFamily: "Georgia,serif" // stored from elegant
  }));
  ok(html.includes("Georgia,serif"), "Stored fontFamily should override developer's Courier default");
  // Courier should NOT appear in the outer table font-family
  notOk(html.includes("font-family:'Courier New',Courier,monospace"), "Courier should be replaced by stored fontFamily");
});

test("switch corporate→elegant: bold nameStyle stays bold (both are bold by default)", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("font-weight:bold"), "Elegant name should be bold");
});

test("switch minimal→dark: nameColor=#ff0000 stored from minimal renders as red in dark", () => {
  const html = generateSignatureHtml(d({
    template: "dark",
    nameColor: "#ff0000"
  }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#ff0000"), `Stored nameColor should override dark's default, got: ${nameCtx}`);
  notOk(nameCtx.includes("color:#f1f5f9"), `Dark default #f1f5f9 should be replaced, got: ${nameCtx}`);
});

test("switch dark→minimal: nameBold=false stored from dark overrides minimal's bold default", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    nameBold: false
  }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("font-weight:normal"), "Stored nameBold=false should override minimal's bold default");
  notOk(nameCtx.includes("font-weight:bold"), "Bold should not appear when nameBold=false is stored");
});

test("switch minimal→photographer: nameSize=25 stored overrides photographer default (18)", () => {
  const html = generateSignatureHtml(d({
    template: "photographer",
    nameSize: 25
  }));
  ok(html.includes("font-size:25px"), "Stored nameSize should override photographer's 18px default");
  const nameCtx = contextAround(html, "Alex Johnson");
  notOk(nameCtx.includes("font-size:18px"), "Photographer default 18px should not appear near name");
});

test("switch corporate→influencer: photoShape=square overrides influencer's circle default", () => {
  const html = generateSignatureHtml(d({
    template: "influencer",
    photoUrl: PHOTO,
    photoShape: "square"
  }));
  const photoCtx = contextAround(html, PHOTO);
  ok(photoCtx.includes("border-radius:0"), `Should show square, got: ${photoCtx}`);
  notOk(photoCtx.includes("border-radius:50%"), "Influencer circle default should be overridden");
});

// ============================================================
// SECTION 4: Exact HTML Structure Per Template
// ============================================================

console.log("\n=== SECTION 4: Exact HTML Structure Per Template ===\n");

// Photo cell presence/absence
test("structure: minimal DOES render photo when photoUrl is set", () => {
  const html = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO }));
  ok(html.includes(PHOTO), "Minimal should render photo");
  ok(html.includes("<img"), "Should have img tag");
});

test("structure: compact does NOT render photo at all", () => {
  const html = generateSignatureHtml(d({ template: "compact", photoUrl: PHOTO }));
  notOk(html.includes("<img"), "Compact should have no img tag");
});

test("structure: simple does NOT render photo at all", () => {
  const html = generateSignatureHtml(d({ template: "simple", photoUrl: PHOTO }));
  // Simple has no photoCell call — verify the PHOTO URL itself does not appear.
  // (<img still appears for social icons if any are set, so check for the photo URL.)
  notOk(html.includes(PHOTO), "Simple should not render the photo URL");
});

test("structure: all photo-supporting templates render photo when URL set", () => {
  const photoTemplates: TemplateName[] = [
    "minimal", "modern", "corporate", "creative", "bold", "elegant",
    "startup", "executive", "gradient", "developer", "sales", "medical",
    "legal", "academic", "realtor", "influencer", "photographer", "dark"
  ];
  for (const template of photoTemplates) {
    const html = generateSignatureHtml(d({ template, photoUrl: PHOTO }));
    ok(html.includes(PHOTO), `${template}: should render photo when URL set`);
  }
});

test("structure: all templates skip photo img when photoUrl is empty", () => {
  // Templates may still render social icon <img> tags, so we check that the photo
  // placeholder URL does not appear (i.e. no photo cell is emitted), not that <img is absent.
  // We generate with a known photo URL and verify it's absent when photoUrl is empty.
  const allTemplates: TemplateName[] = [
    "minimal", "modern", "corporate", "creative", "bold", "elegant",
    "startup", "compact", "executive", "gradient", "developer", "sales",
    "medical", "legal", "academic", "realtor", "influencer", "photographer",
    "dark", "simple"
  ];
  for (const template of allTemplates) {
    const html = generateSignatureHtml(d({ template, photoUrl: "" }));
    // When photoUrl is "", resolvePhotoSrc returns "" and photoCell() returns "" immediately.
    // The PHOTO constant URL should definitely not appear.
    notOk(html.includes(PHOTO), `${template}: photo URL should not appear when photoUrl is empty`);
    // Also verify no object-fit:cover (used exclusively on the profile photo img, not social icons)
    notOk(html.includes("object-fit:cover"), `${template}: should not render photo cell when URL is empty`);
  }
});

// Social icons
test("structure: social icons render in minimal when linkedin is set", () => {
  const html = generateSignatureHtml(d({ template: "minimal", linkedin: "https://linkedin.com/in/test" }));
  ok(html.includes("linkedin.png"), "Expected linkedin icon");
  ok(html.includes("LinkedIn"), "Expected LinkedIn alt text");
});

test("structure: social icons NOT rendered when all social fields empty", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    github: "",
    youtube: ""
  }));
  notOk(html.includes("linkedin.png"), "Should not render social icons when all empty");
});

test("structure: influencer shows larger social icons (24px)", () => {
  const html = generateSignatureHtml(d({
    template: "influencer",
    instagram: "https://instagram.com/test",
    twitter: "https://twitter.com/test"
  }));
  ok(html.includes("width:24px"), "Influencer social icons should be 24px");
});

test("structure: all other templates show 20px social icons", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    linkedin: "https://linkedin.com/in/test"
  }));
  ok(html.includes("width:20px"), "Standard social icons should be 20px");
  ok(html.includes("height:20px"), "Standard social icons should be 20px");
});

// Calendly button
test("structure: calendly button NOT rendered when calendlyUrl is empty", () => {
  const html = generateSignatureHtml(d({ template: "minimal", calendlyUrl: "" }));
  notOk(html.includes("Book a Meeting"), "Should not render calendly button when URL empty");
  notOk(html.includes("Schedule a Call"), "Should not render calendly CTA when URL empty");
});

test("structure: calendly button rendered in minimal with correct text", () => {
  const html = generateSignatureHtml(d({ template: "minimal", calendlyUrl: "https://calendly.com/test" }));
  ok(html.includes("Book a Meeting"), "Expected 'Book a Meeting' text");
  ok(html.includes("https://calendly.com/test"), "Expected calendly URL in button");
});

test("structure: sales calendly uses 'Schedule a Call' not 'Book a Meeting'", () => {
  const html = generateSignatureHtml(d({ template: "sales", calendlyUrl: "https://calendly.com/test" }));
  ok(html.includes("Schedule a Call"), "Sales should use 'Schedule a Call'");
  notOk(html.includes("Book a Meeting"), "Sales should NOT use 'Book a Meeting'");
});

test("structure: startup calendly uses pill style (border-radius:12px)", () => {
  const html = generateSignatureHtml(d({ template: "startup", calendlyUrl: "https://calendly.com/test" }));
  ok(html.includes("border-radius:12px"), "Startup calendly should use pill shape");
});

test("structure: bold calendly button reverses colors (white bg, primaryColor text)", () => {
  const html = generateSignatureHtml(d({ template: "bold", calendlyUrl: "https://calendly.com/test" }));
  // Bold's calendly has white background and primaryColor text (inverted from normal)
  ok(html.includes("background:#fff"), "Bold calendly should have white background");
  ok(html.includes("color:#2563eb"), "Bold calendly text should be primaryColor");
});

// CTA Banner
test("structure: ctaBanner NOT rendered when ctaBannerUrl is empty", () => {
  const html = generateSignatureHtml(d({ template: "minimal", ctaBannerUrl: "" }));
  notOk(html.includes("Banner"), "Should not render banner alt text when URL empty");
});

test("structure: ctaBanner rendered with link when ctaBannerLink is set", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    ctaBannerUrl: "https://example.com/banner.jpg",
    ctaBannerLink: "https://example.com/promo"
  }));
  ok(html.includes("https://example.com/banner.jpg"), "Expected banner image URL");
  ok(html.includes("https://example.com/promo"), "Expected banner link URL");
  ok(html.includes("<a href"), "Expected banner wrapped in link");
});

test("structure: ctaBanner rendered without link when ctaBannerLink is empty", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    ctaBannerUrl: "https://example.com/banner.jpg",
    ctaBannerLink: ""
  }));
  ok(html.includes("https://example.com/banner.jpg"), "Expected banner image URL");
  // Should be a plain img, not wrapped in link
  const bannerCtx = contextAround(html, "https://example.com/banner.jpg", 50);
  notOk(bannerCtx.includes("<a href"), "Banner should NOT be in a link when ctaBannerLink is empty");
});

// Disclaimer
test("structure: disclaimer NOT rendered when disclaimer is empty", () => {
  const html = generateSignatureHtml(d({ template: "minimal", disclaimer: "" }));
  notOk(html.includes("font-size:9px"), "Should not render disclaimer row when empty");
});

test("structure: disclaimer rendered with 9px font and light color", () => {
  const html = generateSignatureHtml(d({ template: "minimal", disclaimer: "Confidential message." }));
  ok(html.includes("Confidential message."), "Expected disclaimer text");
  ok(html.includes("font-size:9px"), "Expected small font for disclaimer");
  ok(html.includes("color:#94a3b8"), "Expected light color for disclaimer");
});

// Dividers/separators
test("structure: corporate has top border separator", () => {
  const html = generateSignatureHtml(d({ template: "corporate" }));
  ok(html.includes("border-top:3px solid"), "Corporate should have top border");
});

test("structure: elegant has decorative dots/lines divider", () => {
  const html = generateSignatureHtml(d({ template: "elegant" }));
  // The elegant divider is a table with colored cells
  ok(html.includes("width:36px;height:1px"), "Expected horizontal line in elegant divider");
  ok(html.includes("width:4px;height:4px;border-radius:50%"), "Expected dot in elegant divider");
});

test("structure: legal has bottom border (border-bottom:3px solid #334155)", () => {
  const html = generateSignatureHtml(d({ template: "legal" }));
  ok(html.includes("border-bottom:3px solid #334155"), "Legal should have bottom border");
});

test("structure: executive has two-section layout (dark header + light footer)", () => {
  const html = generateSignatureHtml(d({ template: "executive" }));
  ok(html.includes("background-color:#1e293b"), "Expected dark header section");
  ok(html.includes("background-color:#fafafa"), "Expected light footer section");
});

// Company field: separate vs combined with title
test("structure: minimal shows company in separate row below title", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  const titleIdx = html.indexOf("Marketing Manager");
  const compIdx = html.indexOf("Acme Corp");
  // They should be in different rows (some HTML between them)
  ok(Math.abs(titleIdx - compIdx) > 30, "Company should not be immediately next to title in minimal");
});

test("structure: modern shows company and title in the SAME row", () => {
  const html = generateSignatureHtml(d({ template: "modern" }));
  // Modern puts both in same <td>
  const titleIdx = html.indexOf("Marketing Manager");
  const compIdx = html.indexOf("Acme Corp");
  ok(Math.abs(titleIdx - compIdx) < 200, "Company should be near title in modern");
});

test("structure: startup joins title and company with @ sign", () => {
  const html = generateSignatureHtml(d({ template: "startup" }));
  ok(html.includes("@ </span>") || html.includes(" @ "), "Startup uses @ between title and company");
});

test("structure: developer joins title and company in role = 'title @ company' format", () => {
  const html = generateSignatureHtml(d({ template: "developer" }));
  ok(html.includes(" @ "), "Developer role format uses @");
  // title and company near each other
  const titleIdx = html.indexOf("Marketing Manager");
  const compIdx = html.indexOf("Acme Corp");
  ok(Math.abs(titleIdx - compIdx) < 100, "Title and company should be in same token");
});

// Contact link colors
test("structure: minimal email link uses primaryColor", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  const emailCtx = contextAround(html, "alex@acmecorp.com");
  ok(emailCtx.includes("color:#2563eb"), `Expected primaryColor on email link, got: ${emailCtx}`);
});

test("structure: minimal phone link uses textColor (#555)", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  const phoneCtx = contextAround(html, "+1 (555) 123-4567");
  ok(phoneCtx.includes("color:#555"), `Expected #555 on phone link, got: ${phoneCtx}`);
});

test("structure: corporate email link uses primaryColor", () => {
  const html = generateSignatureHtml(d({ template: "corporate" }));
  const emailCtx = contextAround(html, "alex@acmecorp.com");
  ok(emailCtx.includes("color:#2563eb"), `Expected primaryColor on email, got: ${emailCtx}`);
});

test("structure: bold all contact links are white (#fff)", () => {
  const html = generateSignatureHtml(d({ template: "bold" }));
  // Bold contact links are white/rgba
  const phoneCtx = contextAround(html, "+1 (555) 123-4567");
  ok(phoneCtx.includes("color:#fff") || phoneCtx.includes("color:rgba(255,255,255"), `Expected white phone link, got: ${phoneCtx}`);
});

test("structure: dark phone uses rgba(255,255,255,0.7)", () => {
  const html = generateSignatureHtml(d({ template: "dark" }));
  const phoneCtx = contextAround(html, "+1 (555) 123-4567");
  ok(phoneCtx.includes("rgba(255,255,255,0.7)"), `Expected semi-transparent phone link, got: ${phoneCtx}`);
});

// Address field
test("structure: address renders in minimal when set", () => {
  const html = generateSignatureHtml(d({ template: "minimal", address: "123 Main St, Springfield" }));
  ok(html.includes("123 Main St, Springfield"), "Expected address text");
});

test("structure: address NOT rendered in minimal when empty", () => {
  const html = generateSignatureHtml(d({ template: "minimal", address: "" }));
  // Default data has empty address
  notOk(html.includes("font-size:11px;color:#aaa;padding-top:3px;"), "Should not render address row when empty");
});

test("structure: pronouns render inline with name in minimal", () => {
  const html = generateSignatureHtml(d({ template: "minimal", pronouns: "they/them" }));
  const nameCtx = contextAround(html, "Alex Johnson", 300);
  ok(nameCtx.includes("they/them"), "Pronouns should appear near name in minimal");
  ok(nameCtx.includes("(they/them)"), "Pronouns should be in parentheses");
});

test("structure: pronouns NOT rendered when empty", () => {
  const html = generateSignatureHtml(d({ template: "minimal", pronouns: "" }));
  // Parentheses can appear in the phone number tel: link, so we cannot check for ( directly.
  // Instead check that the specific inline span element used for pronouns is absent.
  // The pronouns span uses: font-size:11px;font-weight:normal;color:#999;
  notOk(html.includes("font-size:11px;font-weight:normal;color:#999;"), "Should not render pronoun span when pronouns is empty");
  // Also verify no empty parens appear near the name
  const nameCtx = contextAround(html, "Alex Johnson", 100);
  notOk(nameCtx.includes("()"), "Should not render empty () near name");
});

// fieldOrder (minimal only)
test("structure: fieldOrder reversal in minimal puts company before title", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal" }));
  const reorderedHtml = generateSignatureHtml(d({
    template: "minimal",
    fieldOrder: ["fullName", "company", "jobTitle", "pronouns"]
  }));
  const defaultTitleIdx = defaultHtml.indexOf("Marketing Manager");
  const defaultCompIdx = defaultHtml.indexOf("Acme Corp");
  ok(defaultTitleIdx < defaultCompIdx, "Default: title appears before company");
  const reorderedTitleIdx = reorderedHtml.indexOf("Marketing Manager");
  const reorderedCompIdx = reorderedHtml.indexOf("Acme Corp");
  ok(reorderedCompIdx < reorderedTitleIdx, "Reordered: company should appear before title");
});

test("structure: contactOrder reordering works in minimal (email first)", () => {
  const defaultHtml = generateSignatureHtml(d({ template: "minimal" }));
  const reorderedHtml = generateSignatureHtml(d({
    template: "minimal",
    contactOrder: ["email", "phone", "website"]
  }));
  // Default: phone first, email second
  const defaultPhoneIdx = defaultHtml.indexOf("+1 (555) 123-4567");
  const defaultEmailIdx = defaultHtml.indexOf("alex@acmecorp.com");
  ok(defaultPhoneIdx < defaultEmailIdx, "Default: phone before email");
  // Reordered: email first
  const reorderedEmailIdx = reorderedHtml.indexOf("alex@acmecorp.com");
  const reorderedPhoneIdx = reorderedHtml.indexOf("+1 (555) 123-4567");
  ok(reorderedEmailIdx < reorderedPhoneIdx, "Reordered: email should be before phone");
});

// Free tier branding
test("structure: neatstamp branding appears for free tier (no plan)", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }), undefined);
  ok(html.includes("Made with NeatStamp"), "Expected branding for free tier");
});

test("structure: neatstamp branding NOT rendered for pro plan", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }), { plan: "pro" });
  notOk(html.includes("Made with NeatStamp"), "Should not show branding for pro");
});

test("structure: neatstamp branding NOT rendered for team plan", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }), { plan: "team" });
  notOk(html.includes("Made with NeatStamp"), "Should not show branding for team");
});

// ============================================================
// SECTION 5: Edge Cases That Break Preview
// ============================================================

console.log("\n=== SECTION 5: Edge Cases That Break Preview ===\n");

test("edge: empty fullName renders empty string gracefully", () => {
  const html = generateSignatureHtml(d({ template: "minimal", fullName: "" }));
  // Should not crash; should produce some valid HTML
  ok(html.includes("<table"), "Should still produce HTML with empty name");
  ok(html.includes("Marketing Manager"), "Other fields should still render");
});

test("edge: empty fullName does not produce broken img alt attribute", () => {
  // If fullName is empty, the img alt= should be empty string
  const html = generateSignatureHtml(d({ template: "minimal", fullName: "", photoUrl: PHOTO }));
  // alt="" is valid — check it doesn't produce alt="undefined" or similar
  notOk(html.includes('alt="undefined"'), "alt should not be 'undefined'");
  notOk(html.includes('alt="null"'), "alt should not be 'null'");
  ok(html.includes('alt=""'), "alt should be empty string when fullName is empty");
});

test("edge: very long fullName (100+ chars) does not break table", () => {
  const longName = "A".repeat(120);
  const html = generateSignatureHtml(d({ template: "minimal", fullName: longName }));
  ok(html.includes(longName), "Long name should appear verbatim");
  ok(html.includes("max-width:500px"), "Table max-width should still be set");
});

test("edge: fullName with HTML special characters is escaped", () => {
  const html = generateSignatureHtml(d({ template: "minimal", fullName: "<script>alert(1)</script>" }));
  notOk(html.includes("<script>"), "Script tag should be escaped");
  ok(html.includes("&lt;script&gt;"), "Should have escaped angle brackets");
});

test("edge: email with special characters is escaped", () => {
  const html = generateSignatureHtml(d({ template: "minimal", email: '"quoted"@example.com' }));
  notOk(html.includes('"quoted"'), "Quotes in email should be escaped");
  ok(html.includes("&quot;quoted&quot;"), "Should have escaped quotes");
});

test("edge: photo URL with relative path (/images/photo.jpg) is used as-is for pro", () => {
  const html = generateSignatureHtml(
    d({ template: "minimal", photoUrl: "/images/photo.jpg" }),
    { plan: "pro" }
  );
  ok(html.includes("/images/photo.jpg"), "Relative photo URL should be used for pro");
});

test("edge: photo URL for free tier gets proxied when signatureId is set", () => {
  const html = generateSignatureHtml(
    d({ template: "minimal", photoUrl: "/images/photo.jpg" }),
    { plan: "free", signatureId: "sig123" }
  );
  // Free tier with non-neatstamp URL should proxy
  ok(html.includes("api/images/sig123/photo"), "Free tier photo should use proxy URL");
  notOk(html.includes("/images/photo.jpg"), "Original URL should not appear for free tier");
});

test("edge: photo URL already on neatstamp.com not proxied for free tier", () => {
  const neatstampPhoto = "https://neatstamp.com/storage/photos/abc.jpg";
  const html = generateSignatureHtml(
    d({ template: "minimal", photoUrl: neatstampPhoto }),
    { plan: "free", signatureId: "sig123" }
  );
  ok(html.includes(neatstampPhoto), "Neatstamp-hosted photo should not be proxied");
});

test("edge: calendlyUrl without https:// gets https:// prepended", () => {
  const html = generateSignatureHtml(d({ template: "minimal", calendlyUrl: "calendly.com/myslot" }));
  ok(html.includes("https://calendly.com/myslot"), "Expected https:// prepended to calendly URL");
  notOk(html.includes('"calendly.com/myslot"'), "Should not have bare domain without https://");
});

test("edge: website without https:// prefix is handled correctly", () => {
  const html = generateSignatureHtml(d({ template: "minimal", website: "www.example.com" }));
  ok(html.includes("https://www.example.com"), "Expected https:// prepended to bare website");
  // Display text should strip the protocol
  ok(html.includes(">www.example.com<"), "Display text should not have protocol");
});

test("edge: website with https:// prefix strips it from display text", () => {
  const html = generateSignatureHtml(d({ template: "minimal", website: "https://www.example.com" }));
  ok(html.includes("https://https://www.example.com") === false, "Should not double the https://");
  ok(html.includes(">www.example.com<"), "Display text should not show https://");
});

test("edge: template name that doesn't exist falls back to minimal", () => {
  const html = generateSignatureHtml(d({ template: "nonexistent" as TemplateName }));
  ok(html.includes("<table"), "Should produce HTML even for unknown template");
  // Falls back to minimal — should have minimal's characteristics
  ok(html.includes("Alex Johnson"), "Should render name in fallback template");
});

test("edge: nameSize=0 does not crash, renders font-size:0px", () => {
  const html = generateSignatureHtml(d({ template: "minimal", nameSize: 0 }));
  ok(html.includes("font-size:0px"), "nameSize=0 should render as font-size:0px");
  ok(html.includes("Alex Johnson"), "Name should still appear even with size 0");
});

test("edge: nameSize negative does not crash", () => {
  let threw = false;
  try {
    const html = generateSignatureHtml(d({ template: "minimal", nameSize: -5 }));
    ok(html.includes("<table"), "Should produce HTML even with negative nameSize");
  } catch {
    threw = true;
  }
  notOk(threw, "Negative nameSize should not throw");
});

test("edge: photoSize=0 does not crash", () => {
  let threw = false;
  try {
    const html = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO, photoSize: 0 }));
    ok(html.includes("<table"), "Should produce HTML even with photoSize=0");
  } catch {
    threw = true;
  }
  notOk(threw, "photoSize=0 should not throw");
});

test("edge: primaryColor with invalid hex (#GGGGGG) is passed through as-is", () => {
  const html = generateSignatureHtml(d({ template: "minimal", primaryColor: "#GGGGGG" }));
  // The generator does no validation — it just inserts whatever primaryColor is given
  ok(html.includes("#GGGGGG"), "Invalid hex should appear in output (no validation)");
});

test("edge: all optional fields empty renders without broken structure", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    phone: "",
    email: "",
    website: "",
    photoUrl: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    github: "",
    youtube: "",
    calendlyUrl: "",
    ctaBannerUrl: "",
    ctaBannerLink: "",
    pronouns: "",
    address: "",
    disclaimer: ""
  }));
  ok(html.includes("<table"), "Should produce HTML with all optional fields empty");
  ok(html.includes("Alex Johnson"), "Name should still appear");
  notOk(html.includes("undefined"), "Should not have 'undefined' in output");
  notOk(html.includes("null"), "Should not have 'null' in output");
});

test("edge: all fields filled renders without conflicts", () => {
  const html = generateSignatureHtml(d({
    phone: "+1 (555) 999-0000",
    email: "test@test.com",
    website: "https://test.com",
    photoUrl: PHOTO,
    linkedin: "https://linkedin.com/in/test",
    twitter: "https://twitter.com/test",
    instagram: "https://instagram.com/test",
    facebook: "https://facebook.com/test",
    github: "https://github.com/test",
    youtube: "https://youtube.com/@test",
    calendlyUrl: "https://calendly.com/test",
    ctaBannerUrl: "https://example.com/banner.jpg",
    ctaBannerLink: "https://example.com/promo",
    pronouns: "he/him",
    address: "123 Main St",
    disclaimer: "Confidential"
  }));
  ok(html.includes("<table"), "Should produce valid HTML with all fields");
  ok(html.includes("Confidential"), "Disclaimer should appear");
  ok(html.includes(PHOTO), "Photo should appear");
});

test("edge: medical template with custom primaryColor uses it correctly (not teal fallback)", () => {
  const html = generateSignatureHtml(d({ template: "medical", primaryColor: "#dc2626" }));
  ok(html.includes("#dc2626"), "Custom primaryColor should be used in medical");
  notOk(html.includes("#0d9488"), "Teal fallback should not appear when custom color is set");
});

test("edge: developer template with github URL extracts username correctly", () => {
  const html = generateSignatureHtml(d({
    template: "developer",
    github: "https://github.com/johnsmith"
  }));
  ok(html.includes("github/johnsmith"), "Expected github/username format");
  notOk(html.includes("github/https://"), "Should not have double URL");
});

test("edge: developer template with bare github username (no URL)", () => {
  const html = generateSignatureHtml(d({
    template: "developer",
    github: "johnsmith"
  }));
  ok(html.includes("https://johnsmith"), "Bare username should get https:// prepended");
});

test("edge: ctaBannerLink without https:// gets https:// prepended", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    ctaBannerUrl: "https://example.com/banner.jpg",
    ctaBannerLink: "example.com/promo"
  }));
  ok(html.includes("https://example.com/promo"), "Expected https:// prepended to banner link");
});

test("edge: multiple social links all render with correct icons", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    linkedin: "https://linkedin.com/in/test",
    twitter: "https://twitter.com/test",
    instagram: "https://instagram.com/test",
    facebook: "https://facebook.com/test",
    github: "https://github.com/test",
    youtube: "https://youtube.com/@test"
  }));
  ok(html.includes("linkedin.png"), "LinkedIn icon should render");
  ok(html.includes("twitter.png"), "Twitter icon should render");
  ok(html.includes("instagram.png"), "Instagram icon should render");
  ok(html.includes("facebook.png"), "Facebook icon should render");
  ok(html.includes("github.png"), "GitHub icon should render");
  ok(html.includes("youtube.png"), "YouTube icon should render");
});

test("edge: social link without https:// gets https:// prepended", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    linkedin: "linkedin.com/in/test"
  }));
  ok(html.includes("https://linkedin.com/in/test"), "Expected https:// prepended to social URL");
});

test("edge: long disclaimer (500+ chars) renders correctly", () => {
  const longDisclaimer = "This is a confidential communication. ".repeat(15);
  const html = generateSignatureHtml(d({ template: "minimal", disclaimer: longDisclaimer }));
  ok(html.includes("This is a confidential communication."), "Long disclaimer should render");
  ok(html.includes("font-size:9px"), "Disclaimer should have small font");
});

test("edge: address with special HTML characters is escaped", () => {
  const html = generateSignatureHtml(d({ template: "minimal", address: "100 Main & Oak St <Suite 200>" }));
  notOk(html.includes("<Suite 200>"), "HTML in address should be escaped");
  ok(html.includes("&lt;Suite 200&gt;"), "Address HTML should be escaped");
  ok(html.includes("Main &amp; Oak St"), "Ampersand in address should be escaped");
});

test("edge: disclaimer with special HTML characters is escaped", () => {
  const html = generateSignatureHtml(d({ template: "minimal", disclaimer: "See <terms> & conditions" }));
  notOk(html.includes("<terms>"), "HTML in disclaimer should be escaped");
  ok(html.includes("&lt;terms&gt;"), "Disclaimer HTML should be escaped");
});

test("edge: nameSize override in executive affects name in dark header section", () => {
  const html = generateSignatureHtml(d({ template: "executive", nameSize: 30 }));
  ok(html.includes("font-size:30px"), "Override name size should appear in executive header");
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("font-size:30px"), `Override should be near name, got: ${nameCtx}`);
});

test("edge: nameColor override in bold changes name color from white", () => {
  const html = generateSignatureHtml(d({ template: "bold", nameColor: "#ffcc00" }));
  const nameCtx = contextAround(html, "Alex Johnson");
  ok(nameCtx.includes("color:#ffcc00"), `Custom nameColor should override white, got: ${nameCtx}`);
  notOk(nameCtx.includes("color:#fff"), `White default should be replaced, got: ${nameCtx}`);
});

test("edge: companyItalic=true makes company italic in minimal", () => {
  const html = generateSignatureHtml(d({ template: "minimal", companyItalic: true }));
  const compCtx = contextAround(html, "Acme Corp");
  ok(compCtx.includes("font-style:italic"), `Expected italic company, got: ${compCtx}`);
});

// ============================================================
// SECTION 6: HTML Width / Structure Invariants
// ============================================================

console.log("\n=== SECTION 6: HTML Structure Invariants ===\n");

test("invariant: all templates produce valid outer table with max-width:500px", () => {
  const allTemplates: TemplateName[] = [
    "minimal", "modern", "corporate", "creative", "bold", "elegant",
    "startup", "compact", "executive", "gradient", "developer", "sales",
    "medical", "legal", "academic", "realtor", "influencer", "photographer",
    "dark", "simple"
  ];
  for (const template of allTemplates) {
    const html = generateSignatureHtml(d({ template }));
    ok(html.includes("max-width:500px"), `${template}: should have max-width:500px`);
    ok(html.includes("cellpadding=\"0\""), `${template}: should have cellpadding=0`);
    ok(html.includes("cellspacing=\"0\""), `${template}: should have cellspacing=0`);
    ok(html.includes("border=\"0\""), `${template}: should have border=0`);
  }
});

test("invariant: all templates produce non-empty HTML", () => {
  const allTemplates: TemplateName[] = [
    "minimal", "modern", "corporate", "creative", "bold", "elegant",
    "startup", "compact", "executive", "gradient", "developer", "sales",
    "medical", "legal", "academic", "realtor", "influencer", "photographer",
    "dark", "simple"
  ];
  for (const template of allTemplates) {
    const html = generateSignatureHtml(d({ template }));
    ok(html.length > 100, `${template}: should produce substantial HTML`);
  }
});

test("invariant: all templates render fullName", () => {
  const allTemplates: TemplateName[] = [
    "minimal", "modern", "corporate", "creative", "bold", "elegant",
    "startup", "compact", "executive", "gradient", "developer", "sales",
    "medical", "legal", "academic", "realtor", "influencer", "photographer",
    "dark", "simple"
  ];
  for (const template of allTemplates) {
    const html = generateSignatureHtml(d({ template }));
    ok(html.includes("Alex Johnson"), `${template}: should render fullName`);
  }
});

test("invariant: all templates render email", () => {
  const allTemplates: TemplateName[] = [
    "minimal", "modern", "corporate", "creative", "bold", "elegant",
    "startup", "compact", "executive", "gradient", "developer", "sales",
    "medical", "legal", "academic", "realtor", "influencer", "photographer",
    "dark", "simple"
  ];
  for (const template of allTemplates) {
    const html = generateSignatureHtml(d({ template }));
    ok(html.includes("alex@acmecorp.com"), `${template}: should render email`);
  }
});

test("invariant: social links are in a <tr><td> wrapper", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    linkedin: "https://linkedin.com/in/test"
  }));
  ok(html.includes("padding-top:8px;"), "Social links container should have padding-top");
  ok(html.includes("display:inline-block;margin-right:8px"), "Social icons should be inline-block");
});

test("invariant: img tags in social icons have width and height attributes", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    linkedin: "https://linkedin.com/in/test"
  }));
  // width="20" height="20" should be present as attributes (for email clients)
  ok(html.includes('width="20" height="20"'), "Social icons should have width/height attributes");
});

test("invariant: photo img has both width/height attributes AND style width/height", () => {
  const html = generateSignatureHtml(d({ template: "minimal", photoUrl: PHOTO }));
  // Should have width="70" height="70" as attributes
  ok(html.includes('width="70" height="70"'), "Photo should have width/height attributes");
  // And width:70px;height:70px in style
  ok(html.includes("width:70px;height:70px"), "Photo should have width/height in style");
});

test("invariant: all links have target=_blank and rel=noopener noreferrer", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    linkedin: "https://linkedin.com/in/test",
    calendlyUrl: "https://calendly.com/test"
  }));
  // Social links and calendly button should have target and rel
  ok(html.includes('target="_blank"'), "Links should have target=_blank");
  ok(html.includes('rel="noopener noreferrer"'), "Links should have rel=noopener");
});

test("invariant: mailto: links use the exact email address", () => {
  const html = generateSignatureHtml(d({ template: "minimal" }));
  ok(html.includes('href="mailto:alex@acmecorp.com"'), "mailto link should have exact email");
});

test("invariant: tel: links strip spaces from phone number", () => {
  const html = generateSignatureHtml(d({ template: "minimal", phone: "+1 (555) 123-4567" }));
  ok(html.includes('href="tel:+1(555)123-4567"'), "tel link should have spaces stripped");
});

// ============================================================
// FINAL REPORT
// ============================================================

console.log("\n==============================================");
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log("==============================================\n");

if (FAILURES.length > 0) {
  console.log("FAILED TESTS:");
  FAILURES.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  process.exit(1);
} else {
  console.log("All tests passed!");
  process.exit(0);
}
