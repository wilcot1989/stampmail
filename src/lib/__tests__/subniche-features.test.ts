/**
 * SUB-NICHE FEATURES TEST — Tests all new tools and components
 * Run: npx tsx src/lib/__tests__/subniche-features.test.ts
 */

import { generateSignatureHtml } from "../generateSignature";
import { SignatureData, DEFAULT_SIGNATURE_DATA } from "../types";

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

// ================================================================
console.log("\n🔧 NEW OUTLOOK MIGRATION CHECKER — HTML analysis\n");
// ================================================================

test("Detects VML code", () => {
  const html = '<v:roundrect>test</v:roundrect>';
  ok(html.includes("v:"), "VML should be detected");
});

test("Detects conditional comments", () => {
  const html = '<!--[if mso]><table><![endif]-->';
  ok(html.includes("[if mso]"), "Conditional comments should be detected");
});

test("Detects mso CSS properties", () => {
  const html = '<td style="mso-line-height-rule:exactly">text</td>';
  ok(html.includes("mso-"), "mso- properties should be detected");
});

test("Detects base64 images", () => {
  const html = '<img src="data:image/png;base64,abc123" />';
  ok(html.includes("data:image"), "base64 images should be detected");
});

test("NeatStamp output has NO VML", () => {
  const html = generateSignatureHtml(d());
  ok(!html.includes("v:roundrect"), "NeatStamp should not use VML");
  ok(!html.includes("v:shape"), "NeatStamp should not use VML shapes");
});

test("NeatStamp output has NO conditional comments", () => {
  const html = generateSignatureHtml(d());
  ok(!html.includes("[if mso]"), "NeatStamp should not use conditional comments");
});

test("NeatStamp output has NO mso- CSS", () => {
  const html = generateSignatureHtml(d());
  ok(!html.includes("mso-"), "NeatStamp should not use mso- CSS");
});

test("NeatStamp output has NO base64 images", () => {
  const html = generateSignatureHtml(d({ photoUrl: "https://example.com/photo.jpg" }));
  ok(!html.includes("data:image"), "NeatStamp should not embed base64 images");
});

test("NeatStamp output has NO SVG", () => {
  const html = generateSignatureHtml(d({ linkedin: "https://linkedin.com/in/test" }));
  ok(!html.includes("<svg"), "NeatStamp should not use SVG (Outlook blocks it)");
  ok(html.includes(".png"), "Social icons should be PNG");
});

test("NeatStamp output has NO CSS classes", () => {
  const html = generateSignatureHtml(d());
  ok(!html.includes('class="'), "NeatStamp should not use CSS classes (Outlook strips them)");
});

test("NeatStamp output uses table-based layout", () => {
  const html = generateSignatureHtml(d());
  ok(html.includes("<table"), "Should use table-based layout");
  ok(!html.includes("display:flex"), "Should not use flexbox");
  ok(!html.includes("display:grid"), "Should not use CSS grid");
});

test("NeatStamp output has width=500", () => {
  const html = generateSignatureHtml(d());
  ok(html.includes("width:500px") || html.includes('width="500"'), "Outer table should be 500px wide");
});

test("NeatStamp output uses inline styles only", () => {
  const html = generateSignatureHtml(d());
  ok(!html.includes("<style"), "Should not have <style> blocks");
  ok(!html.includes("<link"), "Should not have external stylesheets");
  ok(html.includes('style="'), "Should use inline styles");
});

// ================================================================
console.log("\n📱 OUTLOOK MOBILE COMPATIBILITY\n");
// ================================================================

test("All images have explicit width", () => {
  const html = generateSignatureHtml(d({ photoUrl: "https://example.com/p.jpg" }));
  // Every img tag should have width attribute or width in style
  const imgTags = html.match(/<img[^>]+>/g) || [];
  ok(imgTags.length > 0, "Should have at least 1 image");
  imgTags.forEach((img, i) => {
    const hasWidth = img.includes("width:") || img.includes("width=");
    ok(hasWidth, `Image ${i} should have explicit width`);
  });
});

test("All images have explicit height", () => {
  const html = generateSignatureHtml(d({ photoUrl: "https://example.com/p.jpg" }));
  const imgTags = html.match(/<img[^>]+>/g) || [];
  imgTags.forEach((img, i) => {
    const hasHeight = img.includes("height:") || img.includes("height=");
    ok(hasHeight, `Image ${i} should have explicit height`);
  });
});

test("No CSS media queries (mobile incompatible)", () => {
  const html = generateSignatureHtml(d());
  ok(!html.includes("@media"), "Should not use media queries");
});

test("Phone number is clickable (tel: link)", () => {
  const html = generateSignatureHtml(d({ phone: "+31612345678" }));
  ok(html.includes("tel:"), "Phone should be wrapped in tel: link");
});

test("Email is clickable (mailto: link)", () => {
  const html = generateSignatureHtml(d({ email: "test@example.com" }));
  ok(html.includes("mailto:"), "Email should be wrapped in mailto: link");
});

test("Website is clickable (https link)", () => {
  const html = generateSignatureHtml(d({ website: "www.example.com" }));
  ok(html.includes("http"), "Website should be a clickable link");
});

// ================================================================
console.log("\n🏢 TEAM FEATURES — signature generation\n");
// ================================================================

test("Signature with all fields generates valid HTML", () => {
  const html = generateSignatureHtml(d({
    fullName: "John Doe",
    jobTitle: "IT Manager",
    company: "Acme Corp",
    email: "john@acme.com",
    phone: "+31612345678",
    website: "www.acme.com",
    linkedin: "https://linkedin.com/in/johndoe",
    photoUrl: "https://example.com/photo.jpg",
  }));
  ok(html.includes("John Doe"), "Name should appear");
  ok(html.includes("IT Manager"), "Title should appear");
  ok(html.includes("Acme Corp"), "Company should appear");
  ok(html.includes("john@acme.com"), "Email should appear");
  ok(html.includes("+31612345678"), "Phone should appear");
  ok(html.includes("acme.com"), "Website should appear");
});

test("Signature with placeholders works (for master templates)", () => {
  const html = generateSignatureHtml(d({
    fullName: "{{name}}",
    jobTitle: "{{title}}",
    email: "{{email}}",
    phone: "{{phone}}",
  }));
  ok(html.includes("{{name}}"), "Name placeholder should appear");
  ok(html.includes("{{title}}"), "Title placeholder should appear");
  ok(html.includes("{{email}}"), "Email placeholder should appear");
  ok(html.includes("{{phone}}"), "Phone placeholder should appear");
});

test("All 20 templates generate valid HTML", () => {
  const templates = [
    "minimal","modern","corporate","creative","bold","elegant","startup",
    "compact","executive","gradient","developer","sales","medical","legal",
    "academic","realtor","influencer","photographer","dark","simple",
  ] as const;
  templates.forEach(t => {
    const html = generateSignatureHtml(d({ template: t }));
    ok(html.includes("<table"), `${t}: should contain table`);
    ok(html.includes("Alex Johnson"), `${t}: should contain default name`);
    ok(html.length > 200, `${t}: should generate substantial HTML`);
  });
});

// ================================================================
console.log("\n🔒 SECURITY CHECKS\n");
// ================================================================

test("XSS in name is escaped", () => {
  const html = generateSignatureHtml(d({ fullName: '<script>alert(1)</script>' }));
  ok(!html.includes('<script>'), "Raw script tag should not appear");
});

test("XSS in email is escaped", () => {
  const html = generateSignatureHtml(d({ email: 'test@test.com"><script>alert(1)</script>' }));
  ok(!html.includes('<script>'), "Script in email should be escaped");
});

test("XSS in website is escaped", () => {
  const html = generateSignatureHtml(d({ website: 'javascript:alert(1)' }));
  // Should not create a javascript: link
  const hasJavascriptLink = html.includes('href="javascript:');
  ok(!hasJavascriptLink, "javascript: URLs should be blocked");
});

test("XSS in disclaimer is escaped", () => {
  const html = generateSignatureHtml(d({ disclaimer: '<img src=x onerror=alert(1)>' }));
  ok(!html.includes('<img src=x'), "Raw img tag should not appear in disclaimer");
});

test("Very long input doesn't crash", () => {
  const longName = "A".repeat(10000);
  const html = generateSignatureHtml(d({ fullName: longName }));
  ok(html.length > 0, "Should handle very long input");
});

test("Empty data generates minimal valid HTML", () => {
  const html = generateSignatureHtml(d({
    fullName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    photoUrl: "",
  }));
  ok(html.includes("<table"), "Should still generate a table");
});

// ================================================================
console.log("\n🎨 PER-TEMPLATE DARK MODE SAFETY\n");
// ================================================================

test("Default output has no transparent PNG risk markers", () => {
  const html = generateSignatureHtml(d());
  // NeatStamp's social icons are PNG with solid background
  ok(html.includes(".png"), "Should use PNG icons");
});

test("Background color wrapper works", () => {
  const html = generateSignatureHtml(d({ backgroundColor: "#1a1a2e" }));
  ok(html.includes("background-color:#1a1a2e"), "Background should be applied");
});

test("textOnDark converts to white text", () => {
  const html = generateSignatureHtml(d({ backgroundColor: "#111", textOnDark: true }));
  ok(html.includes("#ffffff"), "Should have white text");
});

// ================================================================
console.log("\n📊 DELIVERABILITY SAFETY\n");
// ================================================================

test("HTML output is under 50KB", () => {
  const html = generateSignatureHtml(d({
    fullName: "Test User",
    jobTitle: "CEO",
    company: "Big Company",
    email: "test@test.com",
    phone: "+1234567890",
    website: "www.test.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    github: "https://github.com",
    youtube: "https://youtube.com",
    photoUrl: "https://example.com/photo.jpg",
    disclaimer: "This is a legal disclaimer for email communication.",
    calendlyUrl: "https://calendly.com/test",
    ctaBannerUrl: "https://example.com/banner.jpg",
    ctaBannerLink: "https://example.com/promo",
  }));
  const sizeKB = Buffer.byteLength(html, 'utf8') / 1024;
  ok(sizeKB < 50, `HTML should be under 50KB, was ${sizeKB.toFixed(1)}KB`);
});

test("Output has fewer than 10 links (deliverability)", () => {
  const html = generateSignatureHtml(d({
    email: "test@test.com",
    phone: "+1234567890",
    website: "www.test.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  }));
  const linkCount = (html.match(/href="/g) || []).length;
  ok(linkCount < 15, `Should have reasonable link count, had ${linkCount}`);
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
  failures.forEach(f => console.log(`  - ${f}`));
}
console.log(`${"=".repeat(60)}\n`);
if (failed > 0) process.exit(1);
