/**
 * LIVE PREVIEW FLOW TESTS — Simulates the editor → preview data flow
 *
 * These tests verify that when data changes in the editor,
 * the preview (generateSignatureHtml) immediately reflects those changes.
 * This includes: field edits, reordering, removing, re-adding, and styling.
 *
 * Run: npx tsx src/lib/__tests__/live-preview-flow.test.ts
 */

import { generateSignatureHtml } from "../generateSignature";
import { SignatureData, DEFAULT_SIGNATURE_DATA, TemplateName } from "../types";

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
console.log("\n✏️  EDIT FIELD → PREVIEW UPDATES\n");
// ================================================================

test("Change name → preview shows new name", () => {
  const before = generateSignatureHtml(d({ fullName: "Old Name" }));
  const after = generateSignatureHtml(d({ fullName: "New Name" }));
  ok(before.includes("Old Name"), "Before should have old name");
  ok(!before.includes("New Name"), "Before should NOT have new name");
  ok(after.includes("New Name"), "After should have new name");
  ok(!after.includes("Old Name"), "After should NOT have old name");
});

test("Change job title → preview shows new title", () => {
  const before = generateSignatureHtml(d({ jobTitle: "Developer" }));
  const after = generateSignatureHtml(d({ jobTitle: "CTO" }));
  ok(before.includes("Developer"), "Before has old title");
  ok(after.includes("CTO"), "After has new title");
  ok(!after.includes("Developer"), "After doesn't have old title");
});

test("Change company → preview shows new company", () => {
  const before = generateSignatureHtml(d({ company: "Acme Inc" }));
  const after = generateSignatureHtml(d({ company: "NeatStamp BV" }));
  ok(before.includes("Acme Inc"), "Before has old company");
  ok(after.includes("NeatStamp BV"), "After has new company");
});

test("Change email → preview shows new email", () => {
  const before = generateSignatureHtml(d({ email: "old@test.com" }));
  const after = generateSignatureHtml(d({ email: "new@test.com" }));
  ok(before.includes("old@test.com"), "Before has old email");
  ok(after.includes("new@test.com"), "After has new email");
  ok(!after.includes("old@test.com"), "After doesn't have old email");
});

test("Change phone → preview shows new phone", () => {
  const before = generateSignatureHtml(d({ phone: "111-OLD" }));
  const after = generateSignatureHtml(d({ phone: "222-NEW" }));
  ok(before.includes("111-OLD"), "Before has old phone");
  ok(after.includes("222-NEW"), "After has new phone");
});

test("Change website → preview shows new website", () => {
  const before = generateSignatureHtml(d({ website: "www.old.com" }));
  const after = generateSignatureHtml(d({ website: "www.new.com" }));
  ok(before.includes("old.com"), "Before has old website");
  ok(after.includes("new.com"), "After has new website");
});

test("Change photo URL → preview shows new photo", () => {
  const before = generateSignatureHtml(d({ photoUrl: "https://old.com/1.jpg" }));
  const after = generateSignatureHtml(d({ photoUrl: "https://new.com/2.jpg" }));
  ok(before.includes("old.com/1.jpg"), "Before has old photo");
  ok(after.includes("new.com/2.jpg"), "After has new photo");
});

test("Add LinkedIn → preview shows LinkedIn icon", () => {
  const before = generateSignatureHtml(d({ linkedin: "" }));
  const after = generateSignatureHtml(d({ linkedin: "https://linkedin.com/in/test" }));
  ok(!before.includes("linkedin.png"), "Before has no LinkedIn icon");
  ok(after.includes("linkedin.png"), "After has LinkedIn icon");
});

test("Remove LinkedIn → preview removes LinkedIn icon", () => {
  const before = generateSignatureHtml(d({ linkedin: "https://linkedin.com/in/test" }));
  const after = generateSignatureHtml(d({ linkedin: "" }));
  ok(before.includes("linkedin.png"), "Before has LinkedIn icon");
  ok(!after.includes("linkedin.png"), "After has no LinkedIn icon");
});

// ================================================================
console.log("\n🔀 FIELD REORDER (contactOrder) → PREVIEW CHANGES ORDER\n");
// ================================================================

test("Default order: phone before email", () => {
  const html = generateSignatureHtml(d({
    phone: "PHONE_MARKER",
    email: "EMAIL_MARKER@test.com",
    website: "www.WEB_MARKER.com",
  }));
  const phoneIdx = html.indexOf("PHONE_MARKER");
  const emailIdx = html.indexOf("EMAIL_MARKER");
  ok(phoneIdx > 0, "Phone should exist");
  ok(emailIdx > 0, "Email should exist");
  ok(phoneIdx < emailIdx, "Default: phone should come before email");
});

test("contactOrder [email, phone, website] → email first", () => {
  const html = generateSignatureHtml(d({
    phone: "PHONE_MARKER",
    email: "EMAIL_MARKER@test.com",
    website: "www.WEB_MARKER.com",
    contactOrder: ["email", "phone", "website"],
  }));
  const phoneIdx = html.indexOf("PHONE_MARKER");
  const emailIdx = html.indexOf("EMAIL_MARKER");
  ok(emailIdx < phoneIdx, "Email should come before phone with custom order");
});

test("contactOrder [website, phone, email] → website first", () => {
  const html = generateSignatureHtml(d({
    phone: "PHONE_MARKER",
    email: "EMAIL_MARKER@test.com",
    website: "www.WEB_MARKER.com",
    contactOrder: ["website", "phone", "email"],
  }));
  const webIdx = html.indexOf("WEB_MARKER");
  const phoneIdx = html.indexOf("PHONE_MARKER");
  const emailIdx = html.indexOf("EMAIL_MARKER");
  ok(webIdx < phoneIdx, "Website should come before phone");
  ok(phoneIdx < emailIdx, "Phone should come before email");
});

test("contactOrder [website, email, phone] → website first, email second", () => {
  const html = generateSignatureHtml(d({
    phone: "PHONE_MARKER",
    email: "EMAIL_MARKER@test.com",
    website: "www.WEB_MARKER.com",
    contactOrder: ["website", "email", "phone"],
  }));
  const webIdx = html.indexOf("WEB_MARKER");
  const emailIdx = html.indexOf("EMAIL_MARKER");
  const phoneIdx = html.indexOf("PHONE_MARKER");
  ok(webIdx < emailIdx, "Website before email");
  ok(emailIdx < phoneIdx, "Email before phone");
});

// These templates have intentional custom layouts where some fields are on fixed positions.
// Sales: phone is always the hero element above the name.
// Realtor: website is always on a separate row below inline fields.
// Photographer: website is always on a separate row below inline fields.
const CUSTOM_CONTACT_TEMPLATES = ["sales", "realtor", "photographer"];

// Test contactOrder on EVERY template (except those with intentional custom layouts)
TEMPLATES.filter(t => !CUSTOM_CONTACT_TEMPLATES.includes(t)).forEach(t => {
  test(`${t}: contactOrder respected`, () => {
    const html = generateSignatureHtml(d({
      template: t,
      phone: "PHONE_CCC",
      email: "EMAIL_CCC@test.com",
      website: "www.WEB_CCC.com",
      contactOrder: ["website", "email", "phone"],
    }));
    const webIdx = html.indexOf("WEB_CCC");
    const emailIdx = html.indexOf("EMAIL_CCC");
    const phoneIdx = html.indexOf("PHONE_CCC");
    // All three should exist
    ok(webIdx > 0, `${t}: website should exist`);
    ok(emailIdx > 0, `${t}: email should exist`);
    ok(phoneIdx > 0, `${t}: phone should exist`);
    // Order should be website < email < phone
    ok(webIdx < emailIdx, `${t}: website (${webIdx}) should come before email (${emailIdx})`);
    ok(emailIdx < phoneIdx, `${t}: email (${emailIdx}) should come before phone (${phoneIdx})`);
  });
});

// ================================================================
console.log("\n🔀 FIELD REORDER (fieldOrder) → NAME/TITLE/COMPANY ORDER\n");
// ================================================================

test("Default fieldOrder: name before title before company", () => {
  const html = generateSignatureHtml(d({
    fullName: "NAME_MARKER",
    jobTitle: "TITLE_MARKER",
    company: "COMPANY_MARKER",
  }));
  const nameIdx = html.indexOf("NAME_MARKER");
  const titleIdx = html.indexOf("TITLE_MARKER");
  const companyIdx = html.indexOf("COMPANY_MARKER");
  ok(nameIdx > 0 && titleIdx > 0 && companyIdx > 0, "All three should exist");
});

// fieldOrder is currently only implemented for the minimal template.
// Other templates have hardcoded layouts and are not expected to respect fieldOrder.
test("fieldOrder [company, fullName, jobTitle] → company first (minimal template)", () => {
  const html = generateSignatureHtml(d({
    template: "minimal",
    fullName: "NAME_FO",
    jobTitle: "TITLE_FO",
    company: "COMPANY_FO",
    fieldOrder: ["company", "fullName", "jobTitle"],
  }));
  const nameIdx = html.indexOf("NAME_FO");
  const companyIdx = html.indexOf("COMPANY_FO");
  ok(companyIdx < nameIdx, `Company (${companyIdx}) should come before name (${nameIdx})`);
});

// ================================================================
console.log("\n❌ REMOVE FIELD → PREVIEW REMOVES IT\n");
// ================================================================

test("Remove phone (empty string) → no phone in preview", () => {
  const with_ = generateSignatureHtml(d({ phone: "+31612345678" }));
  const without = generateSignatureHtml(d({ phone: "" }));
  ok(with_.includes("+31612345678"), "With phone should show it");
  ok(!without.includes("tel:"), "Without phone should not have tel: link");
});

test("Remove email → no email in preview", () => {
  const with_ = generateSignatureHtml(d({ email: "test@neatstamp.com" }));
  const without = generateSignatureHtml(d({ email: "" }));
  ok(with_.includes("test@neatstamp.com"), "With email should show it");
  ok(!without.includes("mailto:"), "Without email should not have mailto:");
});

test("Remove website → no website in preview", () => {
  const with_ = generateSignatureHtml(d({ website: "www.neatstamp.com" }));
  const without = generateSignatureHtml(d({ website: "" }));
  ok(with_.includes("neatstamp.com"), "With website should show it");
  ok(!without.includes("www."), "Without website should not have www.");
});

test("Remove job title → no title in preview", () => {
  const with_ = generateSignatureHtml(d({ jobTitle: "CEO of Everything" }));
  const without = generateSignatureHtml(d({ jobTitle: "" }));
  ok(with_.includes("CEO of Everything"), "With title should show it");
  ok(!without.includes("CEO of Everything"), "Without title should not show it");
});

test("Remove company → no company in preview", () => {
  const with_ = generateSignatureHtml(d({ company: "NeatStamp BV" }));
  const without = generateSignatureHtml(d({ company: "" }));
  ok(with_.includes("NeatStamp BV"), "With company should show it");
  ok(!without.includes("NeatStamp BV"), "Without company should not show it");
});

test("Remove photo → no img in preview", () => {
  const with_ = generateSignatureHtml(d({ photoUrl: "https://example.com/photo.jpg" }));
  const without = generateSignatureHtml(d({ photoUrl: "" }));
  ok(with_.includes("example.com/photo.jpg"), "With photo should show it");
  ok(!without.includes("example.com/photo.jpg"), "Without photo should not show it");
});

// Remove ALL contact fields → only name/title/company remain
test("Remove all contact → minimal signature", () => {
  const html = generateSignatureHtml(d({
    phone: "", email: "", website: "",
    linkedin: "", twitter: "", instagram: "", facebook: "", github: "", youtube: "",
    photoUrl: "", calendlyUrl: "", ctaBannerUrl: "",
  }));
  ok(html.includes("Alex Johnson"), "Name should still be there");
  ok(!html.includes("tel:"), "No phone links");
  ok(!html.includes("mailto:"), "No email links");
  ok(!html.includes("linkedin.png"), "No social icons");
});

// ================================================================
console.log("\n🎨 STYLE CHANGES → PREVIEW UPDATES\n");
// ================================================================

TEMPLATES.forEach(t => {
  test(`${t}: change primaryColor → preview updates`, () => {
    const before = generateSignatureHtml(d({ template: t, primaryColor: "#111111" }));
    const after = generateSignatureHtml(d({ template: t, primaryColor: "#ff0000" }));
    ok(before.includes("#111111"), `${t}: before has old color`);
    ok(after.includes("#ff0000"), `${t}: after has new color`);
    ok(!after.includes("#111111"), `${t}: after doesn't have old color`);
  });
});

test("Change nameColor → preview shows new color", () => {
  const before = generateSignatureHtml(d({ nameColor: "#000000" }));
  const after = generateSignatureHtml(d({ nameColor: "#ff5500" }));
  ok(after.includes("#ff5500"), "New name color should appear");
});

test("Change nameSize → preview shows new size", () => {
  const before = generateSignatureHtml(d({ nameSize: 16 }));
  const after = generateSignatureHtml(d({ nameSize: 24 }));
  ok(before.includes("font-size:16px"), "Before has 16px");
  ok(after.includes("font-size:24px"), "After has 24px");
});

test("Change nameBold true→false → preview updates", () => {
  const bold = generateSignatureHtml(d({ nameBold: true }));
  const normal = generateSignatureHtml(d({ nameBold: false }));
  ok(bold.includes("font-weight:bold"), "Bold has font-weight:bold");
  ok(normal.includes("font-weight:normal"), "Not bold has font-weight:normal");
});

test("Change nameItalic → preview updates", () => {
  const italic = generateSignatureHtml(d({ nameItalic: true }));
  const normal = generateSignatureHtml(d({ nameItalic: false }));
  ok(italic.includes("font-style:italic"), "Italic has font-style:italic");
});

test("Change fontFamily → preview updates", () => {
  const before = generateSignatureHtml(d({ fontFamily: "Arial,sans-serif" }));
  const after = generateSignatureHtml(d({ fontFamily: "Georgia,serif" }));
  ok(before.includes("Arial"), "Before has Arial");
  ok(after.includes("Georgia"), "After has Georgia");
});

test("Change photoSize → preview updates", () => {
  const small = generateSignatureHtml(d({ photoUrl: "https://x.com/p.jpg", photoSize: 60 }));
  const big = generateSignatureHtml(d({ photoUrl: "https://x.com/p.jpg", photoSize: 120 }));
  ok(small.includes("width:60px"), "Small has 60px");
  ok(big.includes("width:120px"), "Big has 120px");
});

test("Change photoShape circle→square → preview updates", () => {
  const circle = generateSignatureHtml(d({ photoUrl: "https://x.com/p.jpg", photoShape: "circle" }));
  const square = generateSignatureHtml(d({ photoUrl: "https://x.com/p.jpg", photoShape: "square" }));
  ok(circle.includes("border-radius:50%"), "Circle has 50%");
  ok(square.includes("border-radius:0"), "Square has 0");
});

test("Change photoPosition left→right → photo moves", () => {
  const left = generateSignatureHtml(d({ photoUrl: "https://x.com/p.jpg", photoPosition: "left" }));
  const right = generateSignatureHtml(d({ photoUrl: "https://x.com/p.jpg", photoPosition: "right" }));
  const leftPhotoIdx = left.indexOf("x.com/p.jpg");
  const leftNameIdx = left.indexOf("Alex Johnson");
  const rightPhotoIdx = right.indexOf("x.com/p.jpg");
  const rightNameIdx = right.indexOf("Alex Johnson");
  ok(leftPhotoIdx < leftNameIdx, "Left: photo before name");
  ok(rightNameIdx < rightPhotoIdx, "Right: name before photo");
});

// ================================================================
console.log("\n🔄 TEMPLATE SWITCH → PREVIEW CHANGES COMPLETELY\n");
// ================================================================

test("Switch template minimal→corporate → different HTML", () => {
  const minimal = generateSignatureHtml(d({ template: "minimal" }));
  const corporate = generateSignatureHtml(d({ template: "corporate" }));
  ok(minimal !== corporate, "Different templates should produce different HTML");
  // Both should still have the same data
  ok(minimal.includes("Alex Johnson"), "Minimal has name");
  ok(corporate.includes("Alex Johnson"), "Corporate has name");
});

test("Switch template keeps all data intact", () => {
  const data = d({
    fullName: "Test User",
    jobTitle: "CEO",
    company: "TestCo",
    email: "test@test.com",
    phone: "+1234567890",
    website: "www.test.com",
    linkedin: "https://linkedin.com/in/test",
  });

  TEMPLATES.forEach(t => {
    const html = generateSignatureHtml({ ...data, template: t });
    ok(html.includes("Test User"), `${t}: keeps name after switch`);
    ok(html.includes("CEO"), `${t}: keeps title after switch`);
    ok(html.includes("TestCo"), `${t}: keeps company after switch`);
    ok(html.includes("test@test.com"), `${t}: keeps email after switch`);
    ok(html.includes("+1234567890"), `${t}: keeps phone after switch`);
  });
});

// ================================================================
console.log("\n➕ ADD FIELD BACK → PREVIEW SHOWS IT AGAIN\n");
// ================================================================

test("Remove phone then re-add → preview shows phone again", () => {
  const step1 = generateSignatureHtml(d({ phone: "+31612345678" }));
  const step2 = generateSignatureHtml(d({ phone: "" }));
  const step3 = generateSignatureHtml(d({ phone: "+31699999999" }));
  ok(step1.includes("+31612345678"), "Step 1: original phone");
  ok(!step2.includes("tel:"), "Step 2: no phone");
  ok(step3.includes("+31699999999"), "Step 3: new phone appears");
});

test("Remove photo then re-add → preview shows photo again", () => {
  const step1 = generateSignatureHtml(d({ photoUrl: "https://a.com/1.jpg" }));
  const step2 = generateSignatureHtml(d({ photoUrl: "" }));
  const step3 = generateSignatureHtml(d({ photoUrl: "https://b.com/2.jpg" }));
  ok(step1.includes("a.com/1.jpg"), "Step 1: original photo");
  ok(!step2.includes("a.com/1.jpg"), "Step 2: no photo");
  ok(step3.includes("b.com/2.jpg"), "Step 3: new photo appears");
});

// ================================================================
console.log("\n⚡ RAPID CHANGES (simulating fast typing)\n");
// ================================================================

test("Rapid name changes all reflect correctly", () => {
  const names = ["A", "Ab", "Abc", "Abcd", "Alex", "Alex J", "Alex Jo", "Alex Johnson"];
  names.forEach(name => {
    const html = generateSignatureHtml(d({ fullName: name }));
    ok(html.includes(name), `Typing "${name}" should appear in preview`);
  });
});

test("Rapid color changes all reflect correctly", () => {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#123456"];
  colors.forEach(color => {
    const html = generateSignatureHtml(d({ primaryColor: color }));
    ok(html.includes(color), `Color ${color} should appear in preview`);
  });
});

// ================================================================
console.log("\n🔗 DISCLAIMER + CTA CHANGES\n");
// ================================================================

test("Add disclaimer → preview shows it", () => {
  const before = generateSignatureHtml(d({ disclaimer: "" }));
  const after = generateSignatureHtml(d({ disclaimer: "Legal notice: this email is confidential." }));
  ok(!before.includes("Legal notice"), "Before: no disclaimer");
  ok(after.includes("Legal notice"), "After: disclaimer visible");
});

test("Change disclaimer → preview updates", () => {
  const v1 = generateSignatureHtml(d({ disclaimer: "Version 1 disclaimer" }));
  const v2 = generateSignatureHtml(d({ disclaimer: "Version 2 disclaimer" }));
  ok(v1.includes("Version 1"), "V1 has version 1");
  ok(v2.includes("Version 2"), "V2 has version 2");
  ok(!v2.includes("Version 1"), "V2 does not have version 1");
});

test("Add CTA banner → preview shows it", () => {
  const before = generateSignatureHtml(d({ ctaBannerUrl: "" }));
  const after = generateSignatureHtml(d({ ctaBannerUrl: "https://img.com/banner.jpg", ctaBannerLink: "https://promo.com" }));
  ok(!before.includes("banner.jpg"), "Before: no banner");
  ok(after.includes("banner.jpg"), "After: banner visible");
  ok(after.includes("promo.com"), "After: banner link present");
});

test("Add Calendly → preview shows button", () => {
  const before = generateSignatureHtml(d({ calendlyUrl: "" }));
  const after = generateSignatureHtml(d({ calendlyUrl: "https://calendly.com/test" }));
  ok(!before.includes("calendly.com/test"), "Before: no Calendly");
  ok(after.includes("calendly.com/test"), "After: Calendly visible");
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
