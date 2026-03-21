/**
 * FUNCTIONAL TESTS — tests the complete feature flows, not just individual functions.
 * Run with: npx tsx src/lib/__tests__/functional-tests.test.ts
 *
 * These test real user scenarios end-to-end:
 * 1. Template selection → generates correct HTML
 * 2. Design overrides → applied to correct elements
 * 3. Photo handling → crop, position, shape all work
 * 4. Copy output → Outlook-safe HTML
 * 5. Free vs Pro → branding/tracking differences
 * 6. All 20 templates × all overrides = consistent behavior
 * 7. Deliverability checks
 * 8. Social icons
 * 9. Disclaimer
 * 10. Calendar/CTA
 */

import { generateSignatureHtml, GenerateOptions } from "../generateSignature";
import { SignatureData, DEFAULT_SIGNATURE_DATA, TemplateName } from "../types";

function makeData(overrides: Partial<SignatureData> = {}): SignatureData {
  return { ...DEFAULT_SIGNATURE_DATA, ...overrides };
}

let passed = 0;
let failed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
  } catch (e: unknown) {
    failed++;
    const msg = `${name}: ${(e as Error).message}`;
    failures.push(msg);
    console.log(`  ❌ ${msg}`);
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

const ALL_TEMPLATES: TemplateName[] = [
  "minimal", "modern", "corporate", "creative", "bold",
  "elegant", "startup", "compact", "executive", "gradient",
  "developer", "sales", "medical", "legal", "academic",
  "realtor", "influencer", "photographer", "dark", "simple",
];

// ================================================================
console.log("\n🔄 FLOW 1: Template selection generates correct HTML\n");
// ================================================================

ALL_TEMPLATES.forEach((t) => {
  test(`Template "${t}" generates non-empty, valid HTML`, () => {
    const html = generateSignatureHtml(makeData({ template: t }));
    assert(html.length > 100, "HTML too short");
    assert(html.includes("<table"), "No table element — not Outlook-safe");
    assert(html.includes("cellpadding"), "Missing cellpadding — not Outlook-safe");
    assert(html.includes('style="'), "No inline styles");
    assert(!html.includes('class="'), "Has CSS classes — will be stripped by email clients");
    assert(html.includes("Alex Johnson"), "Default name not in output");
  });
});

// ================================================================
console.log("\n🎨 FLOW 2: Design overrides on ALL templates\n");
// ================================================================

ALL_TEMPLATES.forEach((t) => {
  test(`"${t}": nameSize=24 changes output`, () => {
    const normal = generateSignatureHtml(makeData({ template: t }));
    const custom = generateSignatureHtml(makeData({ template: t, nameSize: 24 }));
    assert(custom.includes("font-size:24px"), "nameSize=24 not in output");
    assert(custom !== normal, "Output identical — override had no effect");
  });

  test(`"${t}": nameColor=#ff0000 changes output`, () => {
    const html = generateSignatureHtml(makeData({ template: t, nameColor: "#ff0000" }));
    assert(html.includes("#ff0000"), "nameColor not in output");
  });

  test(`"${t}": fontFamily=Verdana changes output`, () => {
    const html = generateSignatureHtml(makeData({ template: t, fontFamily: "Verdana,sans-serif" }));
    assert(html.includes("Verdana"), "fontFamily not in output");
  });

  test(`"${t}": titleColor=#00ff00 changes output`, () => {
    const html = generateSignatureHtml(makeData({ template: t, jobTitle: "CEO", titleColor: "#00ff00" }));
    assert(html.includes("#00ff00"), "titleColor not in output");
  });

  test(`"${t}": primaryColor=#abcdef used`, () => {
    const html = generateSignatureHtml(makeData({ template: t, primaryColor: "#abcdef" }));
    assert(html.includes("#abcdef"), "primaryColor not in output");
  });
});

// ================================================================
console.log("\n🖼️ FLOW 3: Photo handling\n");
// ================================================================

const photoTemplates = ALL_TEMPLATES.filter((t) => t !== "compact" && t !== "simple");

photoTemplates.forEach((t) => {
  test(`"${t}": photo appears when photoUrl set`, () => {
    const html = generateSignatureHtml(makeData({ template: t, photoUrl: "https://test.com/photo.jpg" }));
    assert(html.includes("test.com/photo.jpg"), "Photo URL not in output");
  });

  test(`"${t}": photoSize=100 changes dimensions`, () => {
    const html = generateSignatureHtml(makeData({ template: t, photoUrl: "https://test.com/p.jpg", photoSize: 100 }));
    assert(html.includes("width:100px"), "photoSize not applied");
    assert(html.includes("height:100px"), "photoSize height not applied");
  });

  test(`"${t}": photoShape=square gives radius 0`, () => {
    const html = generateSignatureHtml(makeData({ template: t, photoUrl: "https://test.com/p.jpg", photoShape: "square" }));
    assert(html.includes("border-radius:0"), "Square shape not applied");
  });

  test(`"${t}": photoPosition=right moves photo`, () => {
    const html = generateSignatureHtml(makeData({ template: t, photoUrl: "https://test.com/p.jpg", photoPosition: "right" }));
    const nameIdx = html.indexOf("Alex Johnson");
    const imgIdx = html.indexOf('test.com/p.jpg');
    assert(nameIdx < imgIdx, "Photo should come after name in right position");
  });
});

test("compact template does NOT render photo", () => {
  const html = generateSignatureHtml(makeData({ template: "compact", photoUrl: "https://test.com/p.jpg" }));
  assert(!html.includes("test.com/p.jpg"), "Compact should not show photo");
});

test("simple template does NOT render photo", () => {
  const html = generateSignatureHtml(makeData({ template: "simple", photoUrl: "https://test.com/p.jpg" }));
  assert(!html.includes("test.com/p.jpg"), "Simple should not show photo");
});

// ================================================================
console.log("\n📋 FLOW 4: Copy output — Outlook safety\n");
// ================================================================

ALL_TEMPLATES.forEach((t) => {
  test(`"${t}": output has width=500 for Outlook`, () => {
    const html = generateSignatureHtml(makeData({ template: t }));
    assert(html.includes('width="500"'), "Missing width=500");
  });

  test(`"${t}": output has max-width:500px`, () => {
    const html = generateSignatureHtml(makeData({ template: t }));
    assert(html.includes("max-width:500px"), "Missing max-width");
  });

  test(`"${t}": no CSS classes (Outlook strips them)`, () => {
    const html = generateSignatureHtml(makeData({ template: t }));
    assert(!html.includes('class="'), "Has CSS classes — broken in Outlook");
  });
});

// ================================================================
console.log("\n👤 FLOW 5: Free vs Pro differences\n");
// ================================================================

test("Free user gets NeatStamp branding", () => {
  const html = generateSignatureHtml(makeData(), { plan: "free" });
  assert(html.includes("NeatStamp"), "Free user missing branding");
});

test("Pro user does NOT get NeatStamp branding", () => {
  const html = generateSignatureHtml(makeData(), { plan: "pro" });
  assert(!html.includes("Made with NeatStamp"), "Pro user has branding — should not");
});

test("Free user with signatureId gets tracking pixel", () => {
  const html = generateSignatureHtml(makeData(), { plan: "free", signatureId: "test-123" });
  assert(html.includes("test-123/track"), "Free user missing tracking pixel");
});

test("Pro user does NOT get tracking pixel", () => {
  const html = generateSignatureHtml(makeData(), { plan: "pro", signatureId: "test-123" });
  assert(!html.includes("test-123/track"), "Pro user has tracking pixel — should not");
});

// ================================================================
console.log("\n🔗 FLOW 6: Social icons (PNG format, Outlook-safe)\n");
// ================================================================

test("LinkedIn PNG icon appears", () => {
  const html = generateSignatureHtml(makeData({ linkedin: "https://linkedin.com/in/test" }));
  assert(html.includes("linkedin.png"), "LinkedIn icon not PNG");
  assert(!html.includes("linkedin.svg"), "LinkedIn icon is SVG — broken in Outlook");
});

test("All 6 social platforms render", () => {
  const html = generateSignatureHtml(makeData({
    linkedin: "https://linkedin.com/in/test",
    twitter: "https://x.com/test",
    instagram: "https://instagram.com/test",
    facebook: "https://facebook.com/test",
    github: "https://github.com/test",
    youtube: "https://youtube.com/@test",
  }));
  ["linkedin", "twitter", "instagram", "facebook", "github", "youtube"].forEach((p) => {
    assert(html.includes(`${p}.png`), `${p} icon missing`);
  });
});

test("Empty social links produce no icons", () => {
  const html = generateSignatureHtml(makeData({ linkedin: "", twitter: "", instagram: "", facebook: "", github: "", youtube: "" }));
  assert(!html.includes("linkedin.png"), "Empty linkedin should not render");
});

// ================================================================
console.log("\n📝 FLOW 7: Disclaimer\n");
// ================================================================

ALL_TEMPLATES.forEach((t) => {
  test(`"${t}": disclaimer renders when set`, () => {
    const html = generateSignatureHtml(makeData({ template: t, disclaimer: "LEGAL_NOTICE_XYZ" }));
    assert(html.includes("LEGAL_NOTICE_XYZ"), "Disclaimer not in output");
  });
});

test("Disclaimer is XSS-safe", () => {
  const html = generateSignatureHtml(makeData({ disclaimer: '<script>alert("xss")</script>' }));
  assert(!html.includes("<script>"), "XSS not escaped!");
  assert(html.includes("&lt;script&gt;"), "Script tag not properly escaped");
});

test("Empty disclaimer produces no output", () => {
  const html = generateSignatureHtml(makeData({ disclaimer: "" }));
  assert(!html.includes("LEGAL"), "Empty disclaimer should not render");
});

// ================================================================
console.log("\n📅 FLOW 8: CTA / Calendly / Banner\n");
// ================================================================

test("Calendly button appears with URL", () => {
  const html = generateSignatureHtml(makeData({ calendlyUrl: "https://calendly.com/john" }));
  assert(html.includes("calendly.com/john"), "Calendly URL not in output");
  assert(html.includes("Book"), "CTA text missing");
});

test("No Calendly button without URL", () => {
  const html = generateSignatureHtml(makeData({ calendlyUrl: "" }));
  assert(!html.includes("calendly"), "Calendly should not render without URL");
});

test("Banner appears with URL", () => {
  const html = generateSignatureHtml(makeData({ ctaBannerUrl: "https://test.com/banner.png" }));
  assert(html.includes("banner.png"), "Banner image not in output");
});

test("Banner link wraps banner image", () => {
  const html = generateSignatureHtml(makeData({ ctaBannerUrl: "https://test.com/banner.png", ctaBannerLink: "https://promo.com" }));
  assert(html.includes("promo.com"), "Banner link not in output");
});

// ================================================================
console.log("\n🌗 FLOW 9: Background color + dark text\n");
// ================================================================

test("backgroundColor wraps signature", () => {
  const html = generateSignatureHtml(makeData({ backgroundColor: "#1a1a2e" }));
  assert(html.includes("background-color:#1a1a2e"), "Background not applied");
  assert(html.includes("border-radius:8px"), "Background missing border-radius");
});

test("textOnDark makes text white", () => {
  const html = generateSignatureHtml(makeData({ backgroundColor: "#111", textOnDark: true }));
  assert(html.includes("#ffffff"), "Text not white on dark bg");
  assert(!html.includes("color:#1a1a1a"), "Dark text still present on dark bg");
});

test("No background when not set", () => {
  const html = generateSignatureHtml(makeData({}));
  // The outer table should NOT have a background wrapper
  const bgCount = (html.match(/background-color:/g) || []).length;
  // Bold and dark templates have their own bg — that's ok. Just check no wrapper.
  assert(!html.startsWith('<table cellpadding="0" cellspacing="0" border="0" style="background-color:'), "Unexpected background wrapper");
});

// ================================================================
console.log("\n📊 FLOW 10: Empty field handling\n");
// ================================================================

test("Empty phone produces no tel: link", () => {
  const html = generateSignatureHtml(makeData({ phone: "" }));
  assert(!html.includes("tel:"), "Empty phone should not produce tel: link");
});

test("Empty email produces no mailto:", () => {
  const html = generateSignatureHtml(makeData({ email: "" }));
  assert(!html.includes("mailto:"), "Empty email should not produce mailto:");
});

test("Empty website produces no http link", () => {
  const html = generateSignatureHtml(makeData({ website: "" }));
  // Check there's no broken website link (but social/calendly links are ok)
  assert(!html.includes("www."), "Empty website should not appear");
});

test("Empty company doesn't show dash separator", () => {
  const html = generateSignatureHtml(makeData({ company: "", jobTitle: "CEO" }));
  assert(!html.includes("&mdash; </"), "Empty company shows broken separator");
});

test("Empty jobTitle doesn't show position text", () => {
  const html = generateSignatureHtml(makeData({ jobTitle: "" }));
  assert(!html.includes("Marketing Manager"), "Default title should not appear");
});

test("Fully empty data produces minimal output", () => {
  const html = generateSignatureHtml(makeData({
    fullName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    photoUrl: "",
    linkedin: "",
    pronouns: "",
  }));
  // Should still produce a table
  assert(html.includes("<table"), "Even empty data should produce a table");
});

// ================================================================
// Summary
// ================================================================

console.log(`\n${"=".repeat(60)}`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);
if (failures.length > 0) {
  console.log(`\nFailed tests:`);
  failures.forEach((f) => console.log(`  - ${f}`));
}
console.log(`${"=".repeat(60)}\n`);

if (failed > 0) process.exit(1);
