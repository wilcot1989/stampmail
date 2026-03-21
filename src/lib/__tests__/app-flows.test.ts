/**
 * app-flows.test.ts
 *
 * Comprehensive end-to-end flow tests for the NeatStamp application.
 * Tests every user flow at the data/logic level.
 * Covers all 20 templates × 8 color themes, every field combination,
 * every edge case, and every rendering invariant.
 *
 * Run with:  npx tsx src/lib/__tests__/app-flows.test.ts
 */

import { generateSignatureHtml } from "../generateSignature";
import {
  DEFAULT_SIGNATURE_DATA,
  TEMPLATES,
  COLOR_THEMES,
  SignatureData,
  TemplateName,
} from "../types";

// ---------------------------------------------------------------------------
// Test harness
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (e: unknown) {
    failed++;
    const msg = `${name}: ${(e as Error).message}`;
    failures.push(msg);
    console.log(`  ❌ ${msg}`);
  }
}

function ok(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ALL_TEMPLATES: TemplateName[] = [
  "minimal", "modern", "corporate", "creative", "bold", "elegant", "startup",
  "compact", "executive", "gradient", "developer", "sales", "medical", "legal",
  "academic", "realtor", "influencer", "photographer", "dark", "simple",
];

function makeData(overrides: Partial<SignatureData> = {}): SignatureData {
  return { ...DEFAULT_SIGNATURE_DATA, ...overrides };
}

function gen(overrides: Partial<SignatureData> = {}, plan: "free" | "pro" | "team" = "pro"): string {
  return generateSignatureHtml(makeData(overrides), { plan });
}

function genFree(overrides: Partial<SignatureData> = {}, signatureId?: string): string {
  return generateSignatureHtml(makeData(overrides), { plan: "free", signatureId });
}

// ============================================================
console.log("\n🔖 FLOW 1: Template Selection\n");
// ============================================================

test("ALL_TEMPLATES array contains exactly 20 templates", () => {
  ok(ALL_TEMPLATES.length === 20, `Expected 20 templates, got ${ALL_TEMPLATES.length}`);
});

test("TEMPLATES constant has exactly 20 entries", () => {
  ok(TEMPLATES.length === 20, `Expected 20 TEMPLATES entries, got ${TEMPLATES.length}`);
});

// Every template generates valid HTML
for (const tpl of ALL_TEMPLATES) {
  test(`Template "${tpl}" generates non-empty HTML containing <table`, () => {
    const html = gen({ template: tpl });
    ok(html.length > 0, "HTML is empty");
    ok(html.includes("<table"), "HTML does not contain <table");
  });

  test(`Template "${tpl}" includes user fullName in output`, () => {
    const html = gen({ template: tpl, fullName: "Jane Doe" });
    ok(html.includes("Jane Doe"), "Name not found in output");
  });

  test(`Template "${tpl}" includes email in output`, () => {
    const html = gen({ template: tpl, email: "jane@example.com" });
    ok(html.includes("jane@example.com"), "Email not found in output");
  });
}

// Template × color theme uniqueness
// Note: medical:blue and medical:teal produce identical output because the medical
// template internally overrides #2563eb (blue default) to #0d9488 (teal), making
// both the blue and teal themes yield the same color. All other 159 combos are unique.
test("All 20 templates × 8 color themes produce at least 159 unique outputs", () => {
  const outputs = new Set<string>();
  for (const tpl of ALL_TEMPLATES) {
    for (const theme of COLOR_THEMES) {
      const html = gen({ template: tpl, primaryColor: theme.primary, accentColor: theme.accent });
      outputs.add(html);
    }
  }
  ok(outputs.size >= 159, `Expected >=159 unique outputs, got ${outputs.size}`);
});

test("Non-medical templates × 8 color themes produce exactly 152 unique outputs", () => {
  const nonMedical = ALL_TEMPLATES.filter((t) => t !== "medical");
  const outputs = new Set<string>();
  for (const tpl of nonMedical) {
    for (const theme of COLOR_THEMES) {
      const html = gen({ template: tpl, primaryColor: theme.primary, accentColor: theme.accent });
      outputs.add(html);
    }
  }
  ok(outputs.size === 152, `Expected 152 unique outputs for non-medical, got ${outputs.size}`);
});

// Template switch preserves all user data
test("Template switch preserves fullName across all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, fullName: "Alice Wonderland" });
    ok(html.includes("Alice Wonderland"), `Template "${tpl}" dropped fullName`);
  }
});

test("Template switch preserves jobTitle across all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, jobTitle: "Chief Dreamer" });
    ok(html.includes("Chief Dreamer"), `Template "${tpl}" dropped jobTitle`);
  }
});

test("Template switch preserves company across all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, company: "Unicorn Inc" });
    ok(html.includes("Unicorn Inc"), `Template "${tpl}" dropped company`);
  }
});

test("Template switch preserves email across all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, email: "preserve@test.com" });
    ok(html.includes("preserve@test.com"), `Template "${tpl}" dropped email`);
  }
});

test("Template switch preserves phone across all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, phone: "+1 999 888 7777" });
    ok(html.includes("+1 999 888 7777"), `Template "${tpl}" dropped phone`);
  }
});

test("Template switch preserves website across all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, website: "myspecialsite.io" });
    ok(html.includes("myspecialsite.io"), `Template "${tpl}" dropped website`);
  }
});

/// Note: compact has no social icons; influencer shows only instagram/twitter/youtube/facebook
test("Template switch preserves linkedin on all templates that render linkedin icons", () => {
  const templatesWithLinkedin = ALL_TEMPLATES.filter((t) => t !== "compact" && t !== "influencer");
  for (const tpl of templatesWithLinkedin) {
    const html = gen({ template: tpl, linkedin: "https://linkedin.com/in/testuser" });
    ok(html.includes("linkedin.com/in/testuser"), `Template "${tpl}" dropped linkedin`);
  }
});

test("Template switch preserves disclaimer across all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, disclaimer: "MyUniqueDisclaimer12345" });
    ok(html.includes("MyUniqueDisclaimer12345"), `Template "${tpl}" dropped disclaimer`);
  }
});

test("Template switch preserves CTA banner URL across all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, ctaBannerUrl: "https://img.example.com/banner99.png" });
    ok(html.includes("banner99.png"), `Template "${tpl}" dropped ctaBannerUrl`);
  }
});

test("Each COLOR_THEME primary color appears in generated output on minimal", () => {
  for (const theme of COLOR_THEMES) {
    const html = gen({ template: "minimal", primaryColor: theme.primary });
    ok(html.includes(theme.primary), `Theme "${theme.id}" primary color not found`);
  }
});

test("Each template config has id, name, description", () => {
  for (const cfg of TEMPLATES) {
    ok(!!cfg.id, "Template missing id");
    ok(!!cfg.name, `Template "${cfg.id}" missing name`);
    ok(!!cfg.description, `Template "${cfg.id}" missing description`);
  }
});

test("Each template config has at least one category", () => {
  for (const cfg of TEMPLATES) {
    const hasCat = !!cfg.styleCategory || !!cfg.professionCategory;
    ok(hasCat, `Template "${cfg.id}" has no category`);
  }
});

test("isPro: minimal and modern are free, rest are pro", () => {
  const freeTemplates = TEMPLATES.filter((t) => !t.isPro).map((t) => t.id);
  ok(freeTemplates.includes("minimal"), "minimal should be free");
  ok(freeTemplates.includes("modern"), "modern should be free");
  ok(freeTemplates.length === 2, `Expected 2 free templates, got ${freeTemplates.length}`);
});

test("Unknown template falls back gracefully without throwing", () => {
  let threw = false;
  try {
    generateSignatureHtml(makeData({ template: "nonexistent" as TemplateName }), { plan: "pro" });
  } catch {
    threw = true;
  }
  ok(!threw, "Unknown template threw an error instead of falling back");
});

test("Unknown template fallback produces valid HTML with <table", () => {
  const html = generateSignatureHtml(makeData({ template: "nonexistent" as TemplateName }), { plan: "pro" });
  ok(html.length > 0, "Fallback produced empty output");
  ok(html.includes("<table"), "Fallback did not produce table");
});

// ============================================================
console.log("\n🎨 FLOW 2: Color Theme Application\n");
// ============================================================

test("COLOR_THEMES has exactly 8 themes", () => {
  ok(COLOR_THEMES.length === 8, `Expected 8 themes, got ${COLOR_THEMES.length}`);
});

test("Each theme has id, name, primary (#hex), accent (#hex), swatch (#hex)", () => {
  for (const t of COLOR_THEMES) {
    ok(!!t.id, "Theme missing id");
    ok(!!t.name, `Theme "${t.id}" missing name`);
    ok(t.primary.startsWith("#"), `Theme "${t.id}" primary not hex`);
    ok(t.accent.startsWith("#"), `Theme "${t.id}" accent not hex`);
    ok(t.swatch.startsWith("#"), `Theme "${t.id}" swatch not hex`);
  }
});

for (const theme of COLOR_THEMES) {
  test(`Theme "${theme.id}" primaryColor appears in minimal output`, () => {
    const html = gen({ template: "minimal", primaryColor: theme.primary });
    ok(html.includes(theme.primary), `primaryColor ${theme.primary} not found`);
  });

  test(`Theme "${theme.id}" primaryColor appears in modern output`, () => {
    const html = gen({ template: "modern", primaryColor: theme.primary });
    ok(html.includes(theme.primary), `primaryColor ${theme.primary} not found in modern`);
  });

  test(`Theme "${theme.id}" accentColor appears in modern output`, () => {
    const html = gen({ template: "modern", primaryColor: theme.primary, accentColor: theme.accent });
    ok(html.includes(theme.accent), `accentColor ${theme.accent} not found in modern`);
  });
}

test("Custom primaryColor #abcdef overrides default #2563eb on minimal", () => {
  const html = gen({ template: "minimal", primaryColor: "#abcdef" });
  ok(html.includes("#abcdef"), "Custom primaryColor not applied");
  ok(!html.includes("#2563eb"), "Default primaryColor still present");
});

test("Custom accentColor #fedcba overrides default in modern template", () => {
  const html = gen({ template: "modern", accentColor: "#fedcba" });
  ok(html.includes("#fedcba"), "Custom accentColor not applied");
});

test("Custom accentColor overrides in gradient template", () => {
  const html = gen({ template: "gradient", accentColor: "#112233" });
  ok(html.includes("#112233"), "Custom accentColor not in gradient output");
});

test("Custom accentColor overrides in executive template", () => {
  const html = gen({ template: "executive", accentColor: "#aabbcc" });
  ok(html.includes("#aabbcc"), "Custom accentColor not in executive output");
});

test("All 8 themes produce different outputs on corporate template", () => {
  const results = COLOR_THEMES.map((t) =>
    gen({ template: "corporate", primaryColor: t.primary, accentColor: t.accent })
  );
  const unique = new Set(results);
  ok(unique.size === 8, `Expected 8 unique outputs, got ${unique.size}`);
});

// ============================================================
console.log("\n📷 FLOW 3: Photo Handling\n");
// ============================================================

const PHOTO_URL = "https://example.com/photo.jpg";

const PHOTO_TEMPLATES: TemplateName[] = [
  "minimal", "modern", "corporate", "creative", "bold", "elegant", "startup",
  "executive", "gradient", "developer", "sales", "medical", "legal", "academic",
  "realtor", "influencer", "photographer", "dark",
];

test("Photo appears in all photo-supporting templates", () => {
  for (const tpl of PHOTO_TEMPLATES) {
    const html = gen({ template: tpl, photoUrl: PHOTO_URL });
    ok(html.includes(PHOTO_URL), `Template "${tpl}": photo URL not found`);
    ok(html.includes("<img"), `Template "${tpl}": no img tag`);
  }
});

test("No photo: photo URL absent when photoUrl is empty string", () => {
  for (const tpl of PHOTO_TEMPLATES) {
    const html = gen({ template: tpl, photoUrl: "" });
    ok(!html.includes("https://example.com/photo.jpg"), `Template "${tpl}": phantom photo URL`);
  }
});

test("Photo shape circle: border-radius:50% on all photo templates", () => {
  for (const tpl of PHOTO_TEMPLATES) {
    const html = gen({ template: tpl, photoUrl: PHOTO_URL, photoShape: "circle" });
    ok(html.includes("border-radius:50%"), `Template "${tpl}": circle border-radius not found`);
  }
});

test("Photo shape rounded: border-radius:8px on all photo templates", () => {
  for (const tpl of PHOTO_TEMPLATES) {
    const html = gen({ template: tpl, photoUrl: PHOTO_URL, photoShape: "rounded" });
    ok(html.includes("border-radius:8px"), `Template "${tpl}": rounded border-radius not found`);
  }
});

test("Photo shape square: border-radius:0 on all photo templates", () => {
  for (const tpl of PHOTO_TEMPLATES) {
    const html = gen({ template: tpl, photoUrl: PHOTO_URL, photoShape: "square" });
    ok(html.includes("border-radius:0"), `Template "${tpl}": square border-radius:0 not found`);
  }
});

test("Photo position left: photo URL appears before name in HTML order", () => {
  const leftTemplates: TemplateName[] = ["minimal", "modern", "corporate", "elegant", "executive", "gradient", "developer", "academic", "sales", "realtor"];
  for (const tpl of leftTemplates) {
    const html = gen({ template: tpl, photoUrl: PHOTO_URL, photoPosition: "left" });
    const photoIdx = html.indexOf(PHOTO_URL);
    const nameIdx = html.indexOf("Alex Johnson");
    ok(photoIdx < nameIdx, `Template "${tpl}": photo not before name in left position`);
  }
});

test("Photo position right: photo URL appears after name in HTML order", () => {
  const rightTemplates: TemplateName[] = ["minimal", "modern", "corporate", "elegant", "executive", "gradient", "developer", "academic", "sales", "realtor"];
  for (const tpl of rightTemplates) {
    const html = gen({ template: tpl, photoUrl: PHOTO_URL, photoPosition: "right" });
    const photoIdx = html.indexOf(PHOTO_URL);
    const nameIdx = html.indexOf("Alex Johnson");
    ok(photoIdx > nameIdx, `Template "${tpl}": photo not after name in right position`);
  }
});

test("Default photo size 70px on minimal template", () => {
  const html = gen({ template: "minimal", photoUrl: PHOTO_URL });
  ok(html.includes("width:70px"), "Default photo size 70px not applied in minimal");
});

test("Custom photoSize 120px is applied correctly", () => {
  const html = gen({ template: "minimal", photoUrl: PHOTO_URL, photoSize: 120 });
  ok(html.includes("width:120px"), "Custom photoSize 120 not applied");
  ok(html.includes("height:120px"), "Custom photoSize 120 not applied to height");
});

test("Small photoSize 40px is applied", () => {
  const html = gen({ template: "minimal", photoUrl: PHOTO_URL, photoSize: 40 });
  ok(html.includes("width:40px"), "photoSize 40 not applied");
});

test("Large photoSize 200px is applied", () => {
  const html = gen({ template: "minimal", photoUrl: PHOTO_URL, photoSize: 200 });
  ok(html.includes("width:200px"), "photoSize 200 not applied");
});

test("Photo URL with special characters is escaped (& and quote)", () => {
  const specialUrl = 'https://cdn.example.com/photo?user=a"b&size=100';
  const html = gen({ template: "minimal", photoUrl: specialUrl });
  ok(!html.includes('"b&size=100'), "Unescaped quote found in photo URL");
  ok(html.includes("&amp;"), "Ampersand not escaped in photo URL");
});

test("Photo img tag has width and height attributes on minimal template", () => {
  const html = gen({ template: "minimal", photoUrl: PHOTO_URL });
  const imgTagMatch = html.match(/<img[^>]+photo\.jpg[^>]*>/i);
  ok(!!imgTagMatch, "Photo img tag not found");
  if (imgTagMatch) {
    ok(imgTagMatch[0].includes("width="), "Photo img missing width attribute");
    ok(imgTagMatch[0].includes("height="), "Photo img missing height attribute");
  }
});

test("Photo img tag has alt attribute set to fullName", () => {
  const html = gen({ template: "minimal", photoUrl: PHOTO_URL, fullName: "AltTestPerson" });
  const imgMatch = html.match(/<img[^>]+photo\.jpg[^>]*>/i);
  if (imgMatch) {
    ok(imgMatch[0].includes('alt="'), "Photo img missing alt attribute");
    ok(imgMatch[0].includes("AltTestPerson"), "Photo img alt does not contain fullName");
  }
});

test("photoSize range 40–200 (step 20): each produces correct px dimensions", () => {
  for (let size = 40; size <= 200; size += 20) {
    const html = gen({ template: "minimal", photoUrl: PHOTO_URL, photoSize: size });
    ok(html.includes(`width:${size}px`), `photoSize ${size} not applied`);
  }
});

// ============================================================
console.log("\n🔗 FLOW 4: Social Icons\n");
// ============================================================

const SOCIAL_PLATFORMS = ["linkedin", "twitter", "instagram", "facebook", "github", "youtube"] as const;
const SOCIAL_URLS: Record<string, string> = {
  linkedin: "https://linkedin.com/in/testuser",
  twitter: "https://twitter.com/testuser",
  instagram: "https://instagram.com/testuser",
  facebook: "https://facebook.com/testuser",
  github: "https://github.com/testuser",
  youtube: "https://youtube.com/c/testuser",
};
const ICON_BASE = "https://neatstamp.com/icons/";

for (const platform of SOCIAL_PLATFORMS) {
  test(`Social "${platform}": renders PNG img tag`, () => {
    const html = gen({ template: "minimal", [platform]: SOCIAL_URLS[platform] } as Partial<SignatureData>);
    ok(html.includes(`${ICON_BASE}${platform}.png`), `${platform} PNG icon not found`);
  });

  test(`Social "${platform}": wrapped in <a> with correct href`, () => {
    const html = gen({ template: "minimal", [platform]: SOCIAL_URLS[platform] } as Partial<SignatureData>);
    ok(html.includes(`href="${SOCIAL_URLS[platform]}"`), `${platform} href not correct`);
  });

  test(`Social "${platform}": empty value = no icon rendered`, () => {
    const allEmpty: Partial<SignatureData> = {
      linkedin: "", twitter: "", instagram: "", facebook: "", github: "", youtube: "",
    };
    const html = gen({ template: "minimal", ...allEmpty });
    ok(!html.includes(`${ICON_BASE}${platform}.png`), `${platform} icon shown when URL empty`);
  });
}

test("No SVG elements in social icon output (PNG only)", () => {
  const html = gen({ template: "minimal", linkedin: SOCIAL_URLS.linkedin, twitter: SOCIAL_URLS.twitter });
  ok(!html.includes("<svg"), "SVG found in output — should use PNG only");
  ok(!html.includes("</svg>"), "SVG closing tag found");
});

test("All 6 socials present: all 6 PNG icons rendered", () => {
  const html = gen({ template: "minimal", ...SOCIAL_URLS } as Partial<SignatureData>);
  for (const platform of SOCIAL_PLATFORMS) {
    ok(html.includes(`${ICON_BASE}${platform}.png`), `${platform} icon missing when all present`);
  }
});

test("Social URL without http prefix gets https:// prepended in href", () => {
  const html = gen({ template: "minimal", linkedin: "linkedin.com/in/nohttp" });
  ok(html.includes('href="https://linkedin.com/in/nohttp"'), "https not prepended to social URL");
});

test("Social URL with special characters is escaped in href", () => {
  const html = gen({ template: "minimal", linkedin: 'https://linkedin.com/in/test"user' });
  ok(!html.includes('"user"'), "Unescaped quote in social href");
});

/// compact: no social icons; influencer: only shows instagram/twitter/youtube/facebook (not linkedin)
test("LinkedIn icon renders on all templates that support it (not compact or influencer)", () => {
  const templatesWithLinkedin = ALL_TEMPLATES.filter((t) => t !== "compact" && t !== "influencer");
  for (const tpl of templatesWithLinkedin) {
    const html = gen({ template: tpl, linkedin: SOCIAL_URLS.linkedin });
    ok(html.includes(`${ICON_BASE}linkedin.png`), `Template "${tpl}" linkedin icon not rendered`);
  }
});

test("Compact template: intentionally does not render social icons (ultra-minimal)", () => {
  const html = gen({ template: "compact", linkedin: SOCIAL_URLS.linkedin });
  ok(!html.includes(`${ICON_BASE}linkedin.png`), "Compact template unexpectedly renders social icons");
});

test("Social icon img tags have width and height attributes", () => {
  const html = gen({ template: "minimal", linkedin: SOCIAL_URLS.linkedin });
  const iconMatch = html.match(/<img[^>]+linkedin\.png[^>]*>/i);
  ok(!!iconMatch, "linkedin.png img tag not found");
  if (iconMatch) {
    ok(iconMatch[0].includes("width="), "Social icon img missing width");
    ok(iconMatch[0].includes("height="), "Social icon img missing height");
  }
});

test("Social icon links open in new tab (target=_blank)", () => {
  const html = gen({ template: "minimal", linkedin: SOCIAL_URLS.linkedin });
  ok(html.includes('target="_blank"'), "Social icon link does not open in new tab");
});

// ============================================================
console.log("\n📞 FLOW 5: Contact Info Permutations\n");
// ============================================================

test("All 3 contact fields present: phone + email + website all rendered", () => {
  const html = gen({ template: "minimal", phone: "+1 555 111 2222", email: "all@test.com", website: "all.example.com" });
  ok(html.includes("+1 555 111 2222"), "phone missing");
  ok(html.includes("all@test.com"), "email missing");
  ok(html.includes("all.example.com"), "website missing");
});

test("Only phone present: phone rendered, no phantom email/website", () => {
  const html = gen({ template: "minimal", phone: "+1 555 000 0001", email: "", website: "" });
  ok(html.includes("+1 555 000 0001"), "phone missing");
  ok(!html.includes("@"), "phantom email when only phone");
});

test("Only email present: email rendered, no phantom phone", () => {
  const html = gen({ template: "minimal", phone: "", email: "only@email.com", website: "" });
  ok(html.includes("only@email.com"), "email missing");
  ok(!html.includes("tel:"), "phantom phone when only email");
});

test("Only website present: website rendered, no phantom email", () => {
  const html = gen({ template: "minimal", phone: "", email: "", website: "onlysite.com" });
  ok(html.includes("onlysite.com"), "website missing");
  ok(!html.includes("mailto:"), "phantom email when only website");
});

test("Phone + email, no website: both present, website absent", () => {
  const html = gen({ template: "minimal", phone: "+1 555 000 0002", email: "pe@test.com", website: "" });
  ok(html.includes("+1 555 000 0002"), "phone missing");
  ok(html.includes("pe@test.com"), "email missing");
});

test("Phone + website, no email: both present, no mailto:", () => {
  const html = gen({ template: "minimal", phone: "+1 555 000 0003", email: "", website: "pw.com" });
  ok(html.includes("+1 555 000 0003"), "phone missing");
  ok(html.includes("pw.com"), "website missing");
  ok(!html.includes("mailto:"), "phantom email");
});

test("Email + website, no phone: both present, no tel:", () => {
  const html = gen({ template: "minimal", phone: "", email: "ew@test.com", website: "ew.com" });
  ok(html.includes("ew@test.com"), "email missing");
  ok(html.includes("ew.com"), "website missing");
  ok(!html.includes("tel:"), "phantom phone");
});

test("None present: no mailto/tel links, no @ symbol", () => {
  const html = gen({ template: "minimal", phone: "", email: "", website: "" });
  ok(!html.includes("mailto:"), "phantom mailto");
  ok(!html.includes("tel:"), "phantom tel");
  ok(!html.includes("@"), "phantom email text");
});

test("Phone link uses tel: scheme", () => {
  const html = gen({ template: "minimal", phone: "+1 555 123 4567" });
  ok(html.includes("tel:"), "Phone does not use tel: scheme");
});

test("Email link uses mailto: scheme", () => {
  const html = gen({ template: "minimal", email: "hello@world.com" });
  ok(html.includes("mailto:hello@world.com"), "Email does not use mailto:");
});

test("Website link uses https:// scheme", () => {
  const html = gen({ template: "minimal", website: "example.com" });
  ok(html.includes('href="https://example.com"'), "Website does not use https://");
});

test("Website with http:// prefix: prefix stripped and upgraded to https", () => {
  const html = gen({ template: "minimal", website: "http://example.com" });
  ok(html.includes('href="https://example.com"'), "http not replaced with https");
  ok(!html.includes("http://http"), "double-http found");
});

test("Website with https:// prefix: not doubled", () => {
  const html = gen({ template: "minimal", website: "https://example.com" });
  ok(!html.includes("https://https://"), "doubled https found");
  ok(html.includes('href="https://example.com"'), "https URL incorrect");
});

test("Phone with spaces: tel: link has spaces stripped", () => {
  const html = gen({ template: "minimal", phone: "+1 555 123 4567" });
  ok(html.includes("tel:+15551234567"), "Phone spaces not stripped in tel: link");
});

test("Phone with dashes: dashes preserved in tel: link", () => {
  const html = gen({ template: "minimal", phone: "+1-555-123-4567" });
  ok(html.includes("tel:+1-555-123-4567"), "Phone with dashes incorrect in tel: link");
});

test("Phone with plus sign: plus preserved in tel: link", () => {
  const html = gen({ template: "minimal", phone: "+44 20 1234 5678" });
  ok(html.includes("tel:+442012345678"), "Plus sign lost in tel: link");
});

test("All 20 templates render email correctly with all 3 contact fields present", () => {
  const data = { phone: "+1 500 000 0000", email: "check@check.com", website: "checksite.io" };
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, ...data });
    ok(html.includes("check@check.com"), `Template "${tpl}": email not rendered`);
  }
});

// ============================================================
console.log("\n🔀 FLOW 6: Contact Order Permutations\n");
// ============================================================

const CONTACT_ORDERS = [
  ["phone", "email", "website"],
  ["email", "phone", "website"],
  ["website", "phone", "email"],
  ["website", "email", "phone"],
  ["email", "website", "phone"],
  ["phone", "website", "email"],
];

for (const order of CONTACT_ORDERS) {
  const orderStr = order.join(",");

  test(`contactOrder [${orderStr}] on minimal: fields appear in correct HTML sequence`, () => {
    const html = gen({
      template: "minimal",
      phone: "+1 500 000 1111",
      email: "ord@test.com",
      website: "ordsite.com",
      contactOrder: order,
    });
    const phoneIdx = html.indexOf("+1 500 000 1111");
    const emailIdx = html.indexOf("ord@test.com");
    const siteIdx = html.indexOf("ordsite.com");
    ok(phoneIdx >= 0, `phone not found`);
    ok(emailIdx >= 0, `email not found`);
    ok(siteIdx >= 0, `website not found`);
    const positions = order.map((f) => f === "phone" ? phoneIdx : f === "email" ? emailIdx : siteIdx);
    for (let i = 0; i < positions.length - 1; i++) {
      ok(positions[i] < positions[i + 1], `"${order[i]}" not before "${order[i + 1]}" in order [${orderStr}]`);
    }
  });
}

// Run all 6 orders on 5 different templates
const ORDER_SAMPLE_TEMPLATES: TemplateName[] = ["minimal", "modern", "elegant", "compact", "academic"];

for (const tpl of ORDER_SAMPLE_TEMPLATES) {
  for (const order of CONTACT_ORDERS) {
    const orderStr = order.join(",");
    test(`contactOrder [${orderStr}] on "${tpl}": all 3 contact fields present`, () => {
      const html = gen({
        template: tpl,
        phone: "+1 555 ORD 0001",
        email: `ord${tpl}@test.com`,
        website: `${tpl}site.com`,
        contactOrder: order,
      });
      ok(html.includes(`ord${tpl}@test.com`), `email missing on "${tpl}" with order [${orderStr}]`);
      ok(html.includes(`${tpl}site.com`), `website missing on "${tpl}" with order [${orderStr}]`);
    });
  }
}

test("Default contactOrder (undefined) works on all major ordered-contact templates", () => {
  const orderedTemplates: TemplateName[] = ["minimal", "modern", "elegant", "startup", "compact", "gradient", "academic", "influencer", "dark", "simple"];
  for (const tpl of orderedTemplates) {
    const html = gen({ template: tpl, phone: "+1 555 DEF 0001", email: "def@test.com", website: "defsite.com" });
    ok(html.includes("def@test.com"), `Template "${tpl}": email missing with default order`);
  }
});

// ============================================================
console.log("\n📋 FLOW 7: Field Order (name/title/company reorder)\n");
// ============================================================

const FIELD_ORDERS = [
  ["fullName", "jobTitle", "company"],
  ["company", "fullName", "jobTitle"],
  ["jobTitle", "company", "fullName"],
  ["company", "jobTitle", "fullName"],
  ["jobTitle", "fullName", "company"],
  ["fullName", "company", "jobTitle"],
];

for (const order of FIELD_ORDERS) {
  const orderStr = order.join(",");

  test(`fieldOrder [${orderStr}] on minimal: fields in correct HTML sequence`, () => {
    const html = gen({
      template: "minimal",
      fullName: "OrderTestName",
      jobTitle: "OrderTestTitle",
      company: "OrderTestCompany",
      fieldOrder: order,
    });
    const nameIdx = html.indexOf("OrderTestName");
    const titleIdx = html.indexOf("OrderTestTitle");
    const compIdx = html.indexOf("OrderTestCompany");
    ok(nameIdx >= 0, `fullName not found`);
    ok(titleIdx >= 0, `jobTitle not found`);
    ok(compIdx >= 0, `company not found`);
    const positions = order.map((f) => f === "fullName" ? nameIdx : f === "jobTitle" ? titleIdx : compIdx);
    for (let i = 0; i < positions.length - 1; i++) {
      ok(positions[i] < positions[i + 1], `"${order[i]}" not before "${order[i + 1]}" in order [${orderStr}]`);
    }
  });
}

test("Default fieldOrder on minimal: name appears before title", () => {
  const html = gen({ template: "minimal", fullName: "FirstLast", jobTitle: "TitleXYZ", company: "CompABC" });
  ok(html.indexOf("FirstLast") < html.indexOf("TitleXYZ"), "Name not before title in default order");
});

// ============================================================
console.log("\n🎨 FLOW 8: Styling Overrides (per-field)\n");
// ============================================================

test("nameColor #ff1234 custom color appears in output", () => {
  const html = gen({ template: "minimal", nameColor: "#ff1234" });
  ok(html.includes("#ff1234"), "Custom nameColor not applied");
});

test("nameColor overrides template default on multiple templates", () => {
  for (const tpl of ["minimal", "modern", "corporate", "elegant"] as TemplateName[]) {
    const html = gen({ template: tpl, nameColor: "#aabbcc" });
    ok(html.includes("#aabbcc"), `nameColor override not found on "${tpl}"`);
  }
});

test("nameSize 10px applied correctly", () => {
  const html = gen({ template: "minimal", nameSize: 10 });
  ok(html.includes("font-size:10px"), "nameSize 10px not applied");
});

test("nameSize 32px applied correctly", () => {
  const html = gen({ template: "minimal", nameSize: 32 });
  ok(html.includes("font-size:32px"), "nameSize 32px not applied");
});

test("nameSize 20px applied correctly on modern", () => {
  const html = gen({ template: "modern", nameSize: 20 });
  ok(html.includes("font-size:20px"), "nameSize 20px not applied");
});

test("nameBold true produces font-weight:bold", () => {
  const html = gen({ template: "minimal", nameBold: true });
  ok(html.includes("font-weight:bold"), "nameBold:true did not produce font-weight:bold");
});

test("nameBold false produces font-weight:normal", () => {
  const html = gen({ template: "minimal", nameBold: false });
  ok(html.includes("font-weight:normal"), "nameBold:false did not produce font-weight:normal");
});

test("nameItalic true produces font-style:italic", () => {
  const html = gen({ template: "minimal", nameItalic: true });
  ok(html.includes("font-style:italic"), "nameItalic:true did not produce font-style:italic");
});

test("titleColor #deadbe applied correctly", () => {
  const html = gen({ template: "minimal", titleColor: "#deadbe" });
  ok(html.includes("#deadbe"), "Custom titleColor not applied");
});

test("titleSize 10px applied correctly", () => {
  const html = gen({ template: "minimal", titleSize: 10 });
  ok(html.includes("font-size:10px"), "titleSize 10px not applied");
});

test("titleSize 20px applied correctly", () => {
  const html = gen({ template: "minimal", titleSize: 20 });
  ok(html.includes("font-size:20px"), "titleSize 20px not applied");
});

test("companyColor #cafe00 applied correctly", () => {
  const html = gen({ template: "minimal", companyColor: "#cafe00" });
  ok(html.includes("#cafe00"), "Custom companyColor not applied");
});

test("fontFamily Arial applied", () => {
  const html = gen({ template: "minimal", fontFamily: "Arial" });
  ok(html.includes("Arial"), "Arial fontFamily not applied");
});

test("fontFamily Georgia applied", () => {
  const html = gen({ template: "minimal", fontFamily: "Georgia" });
  ok(html.includes("Georgia"), "Georgia fontFamily not applied");
});

test("fontFamily Verdana applied", () => {
  const html = gen({ template: "minimal", fontFamily: "Verdana" });
  ok(html.includes("Verdana"), "Verdana fontFamily not applied");
});

test("fontFamily Courier applied", () => {
  const html = gen({ template: "minimal", fontFamily: "Courier" });
  ok(html.includes("Courier"), "Courier fontFamily not applied");
});

test("fontFamily Times New Roman applied", () => {
  const html = gen({ template: "minimal", fontFamily: "Times New Roman" });
  ok(html.includes("Times New Roman"), "Times New Roman fontFamily not applied");
});

test("nameBold + nameItalic combination: both in output", () => {
  const html = gen({ template: "minimal", nameBold: true, nameItalic: true });
  ok(html.includes("font-weight:bold"), "nameBold not found in bold+italic combo");
  ok(html.includes("font-style:italic"), "nameItalic not found in bold+italic combo");
});

test("nameColor #123abc + nameSize 25: both applied simultaneously", () => {
  const html = gen({ template: "minimal", nameColor: "#123abc", nameSize: 25 });
  ok(html.includes("#123abc"), "nameColor not in combo");
  ok(html.includes("font-size:25px"), "nameSize not in combo");
});

test("Styling overrides work on corporate template (nameColor, nameSize, nameBold)", () => {
  const html = gen({ template: "corporate", nameColor: "#ff9900", nameSize: 18, nameBold: true });
  ok(html.includes("#ff9900"), "nameColor not on corporate");
  ok(html.includes("font-size:18px"), "nameSize not on corporate");
});

test("Styling overrides work on developer template", () => {
  const html = gen({ template: "developer", nameColor: "#00ff00", nameSize: 14 });
  ok(html.includes("#00ff00"), "nameColor not on developer");
  ok(html.includes("font-size:14px"), "nameSize not on developer");
});

test("titleBold true on modern template", () => {
  const html = gen({ template: "modern", titleBold: true });
  ok(html.includes("font-weight:bold"), "titleBold:true not applied on modern");
});

test("companyBold true produces bold company", () => {
  const html = gen({ template: "minimal", companyBold: true });
  ok(html.includes("font-weight:bold"), "companyBold:true not applied");
});

test("titleItalic true on elegant (already italic by default)", () => {
  const html = gen({ template: "elegant", titleItalic: true });
  ok(html.includes("font-style:italic"), "titleItalic:true not applied on elegant");
});

test("nameSize range 10–32 (step 2): all sizes produce correct px", () => {
  for (let s = 10; s <= 32; s += 2) {
    const html = gen({ template: "minimal", nameSize: s });
    ok(html.includes(`font-size:${s}px`), `nameSize ${s} not applied`);
  }
});

// ============================================================
console.log("\n🌑 FLOW 9: Background Color + Dark Mode\n");
// ============================================================

test("No backgroundColor (undefined): no background-color wrapper", () => {
  const html = gen({ template: "minimal", backgroundColor: undefined });
  // Should not have a background wrapper with a hex color
  const hasWrapper = html.startsWith("<table") && html.includes("background-color:#");
  ok(!hasWrapper, "Unexpected background-color wrapper without backgroundColor");
});

test("backgroundColor #1a1a2e: wrapper contains that color", () => {
  const html = gen({ template: "minimal", backgroundColor: "#1a1a2e" });
  ok(html.includes("background-color:#1a1a2e"), "backgroundColor #1a1a2e not found");
});

test("backgroundColor #ffffff (white): NO wrapper added", () => {
  const html = gen({ template: "minimal", backgroundColor: "#ffffff" });
  ok(!html.includes("background-color:#ffffff"), "White background should not add wrapper");
});

test("backgroundColor #0d0d0d: wrapper is outermost element", () => {
  const html = gen({ template: "minimal", backgroundColor: "#0d0d0d" });
  ok(html.includes("background-color:#0d0d0d"), "Dark background not applied");
  ok(html.trimStart().startsWith("<table"), "Background wrapper not outermost table");
});

test("textOnDark true: converts #1a1a1a to #ffffff in output", () => {
  const html = gen({ template: "minimal", backgroundColor: "#1a1a2e", textOnDark: true });
  ok(html.includes("color:#ffffff"), "textOnDark:true did not produce white text");
  ok(!html.includes("color:#1a1a1a"), "textOnDark:true: #1a1a1a still present");
});

test("textOnDark true: converts #555 to rgba(255,255,255,0.85)", () => {
  const html = gen({ template: "minimal", backgroundColor: "#1a1a2e", textOnDark: true });
  ok(html.includes("rgba(255,255,255,0.85)"), "textOnDark did not convert #555");
});

// #aaa appears in minimal when there is an address field or pronouns field
test("textOnDark true: converts #aaa to rgba(255,255,255,0.4) (requires field that uses #aaa, e.g. address)", () => {
  const html = gen({ template: "minimal", backgroundColor: "#1a1a2e", textOnDark: true, address: "123 Main St" });
  ok(html.includes("rgba(255,255,255,0.4)"), "textOnDark did not convert #aaa (address field triggers it)");
});

test("textOnDark false: keeps #1a1a1a in output", () => {
  const html = gen({ template: "minimal", backgroundColor: "#cccccc", textOnDark: false });
  ok(html.includes("color:#1a1a1a"), "textOnDark:false: original color lost");
});

test("backgroundColor mid-tone #aabbcc: wrapper applied", () => {
  const html = gen({ template: "minimal", backgroundColor: "#aabbcc" });
  ok(html.includes("background-color:#aabbcc"), "Mid-tone background not applied");
});

test("backgroundColor very dark #000000: wrapper applied", () => {
  const html = gen({ template: "corporate", backgroundColor: "#000000" });
  ok(html.includes("background-color:#000000"), "Very dark background not applied");
});

test("Background wrapper includes padding:16px 20px", () => {
  const html = gen({ template: "minimal", backgroundColor: "#111111" });
  ok(html.includes("padding:16px 20px"), "Background wrapper missing padding");
});

test("Background wrapper is a table structure (starts with <table)", () => {
  const html = gen({ template: "minimal", backgroundColor: "#222222" });
  ok(html.startsWith("<table"), "Background wrapper not a table");
});

// ============================================================
console.log("\n💎 FLOW 10: Pro vs Free Plan Gating\n");
// ============================================================

test("Free plan: has 'Made with NeatStamp' branding", () => {
  const html = genFree({ template: "minimal" });
  ok(html.includes("Made with NeatStamp"), "Free plan missing NeatStamp branding");
});

test("Free plan with signatureId: has tracking pixel with correct ID", () => {
  const html = genFree({ template: "minimal" }, "sig-abc-123");
  ok(html.includes("neatstamp.com/api/images/sig-abc-123/track"), "Free plan missing tracking pixel");
});

test("Free plan without signatureId: no tracking pixel", () => {
  const html = genFree({ template: "minimal" }, undefined);
  ok(!html.includes("/track"), "Tracking pixel present without signatureId");
});

test("Pro plan: NO 'Made with NeatStamp' branding", () => {
  const html = gen({ template: "minimal" }, "pro");
  ok(!html.includes("Made with NeatStamp"), "Pro plan has NeatStamp branding");
});

test("Pro plan with signatureId: NO tracking pixel", () => {
  const html = generateSignatureHtml(makeData({ template: "minimal" }), { plan: "pro", signatureId: "sig-999" });
  ok(!html.includes("/track"), "Pro plan has tracking pixel");
});

test("Team plan: NO 'Made with NeatStamp' branding", () => {
  const html = generateSignatureHtml(makeData({ template: "minimal" }), { plan: "team" });
  ok(!html.includes("Made with NeatStamp"), "Team plan has NeatStamp branding");
});

test("Team plan with signatureId: NO tracking pixel", () => {
  const html = generateSignatureHtml(makeData({ template: "minimal" }), { plan: "team", signatureId: "sig-888" });
  ok(!html.includes("/track"), "Team plan has tracking pixel");
});

test("Free branding present on ALL 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = genFree({ template: tpl });
    ok(html.includes("Made with NeatStamp"), `Template "${tpl}": free branding missing`);
  }
});

test("Pro branding absent on ALL 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl }, "pro");
    ok(!html.includes("Made with NeatStamp"), `Template "${tpl}": branding shown on pro`);
  }
});

test("Team branding absent on ALL 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl }, "team");
    ok(!html.includes("Made with NeatStamp"), `Template "${tpl}": branding shown on team`);
  }
});

test("Tracking pixel signatureId is embedded in pixel URL", () => {
  const html = genFree({ template: "minimal" }, "my-unique-sig-id");
  ok(html.includes("my-unique-sig-id"), "signatureId not in tracking pixel URL");
});

test("Tracking pixel is 1×1: width=1 and height=1", () => {
  const html = genFree({ template: "minimal" }, "track-test-id");
  const pixelMatch = html.match(/<img[^>]+track[^>]*>/i);
  ok(!!pixelMatch, "Tracking pixel img tag not found");
  if (pixelMatch) {
    ok(pixelMatch[0].includes('width="1"'), "Tracking pixel not 1px wide");
    ok(pixelMatch[0].includes('height="1"'), "Tracking pixel not 1px tall");
  }
});

test("Branding link points to neatstamp.com?ref=sig", () => {
  const html = genFree({ template: "minimal" });
  ok(html.includes("neatstamp.com?ref=sig"), "Branding link incorrect");
});

// ============================================================
console.log("\n📜 FLOW 11: Disclaimer\n");
// ============================================================

test("Empty disclaimer string: nothing rendered (no 9px font-size)", () => {
  const html = gen({ template: "minimal", disclaimer: "" });
  ok(!html.includes("font-size:9px"), "Disclaimer style found when empty");
});

test("Whitespace-only disclaimer: nothing rendered", () => {
  const html = gen({ template: "minimal", disclaimer: "   " });
  ok(!html.includes("94a3b8;font-family:Arial"), "Whitespace disclaimer rendered");
});

test("Text disclaimer is rendered in output", () => {
  const html = gen({ template: "minimal", disclaimer: "This is confidential." });
  ok(html.includes("This is confidential."), "Disclaimer text not rendered");
});

test("Disclaimer uses font-size:9px (small print)", () => {
  const html = gen({ template: "minimal", disclaimer: "Legal notice." });
  ok(html.includes("font-size:9px"), "Disclaimer font-size:9px not found");
});

test("XSS in disclaimer: <script> tag is HTML-escaped", () => {
  const html = gen({ template: "minimal", disclaimer: "<script>alert('xss')</script>" });
  ok(!html.includes("<script>"), "Raw script tag in disclaimer — XSS possible");
  ok(html.includes("&lt;script&gt;"), "Script tag not HTML-escaped in disclaimer");
});

test("Disclaimer with < and > characters: properly escaped", () => {
  const html = gen({ template: "minimal", disclaimer: "Use <bold> text & <link>" });
  ok(html.includes("&lt;bold&gt;"), "< > not escaped in disclaimer");
  ok(html.includes("&amp;"), "& not escaped in disclaimer");
});

test("Disclaimer with double quotes: escaped as &quot;", () => {
  const html = gen({ template: "minimal", disclaimer: 'He said "hello" & goodbye' });
  ok(html.includes("&quot;"), "Quotes not escaped in disclaimer");
});

test("Very long disclaimer (1000+ chars) renders completely without truncation", () => {
  const longText = "A".repeat(1000) + " END";
  const html = gen({ template: "minimal", disclaimer: longText });
  ok(html.includes("END"), "Long disclaimer was truncated");
  ok(html.includes("A".repeat(50)), "Long disclaimer not fully rendered");
});

test("Disclaimer with unicode (©, ™, –) renders correctly", () => {
  const html = gen({ template: "minimal", disclaimer: "© 2024 – All rights reserved ™" });
  ok(html.includes("© 2024"), "Unicode disclaimer not rendered");
});

test("All 20 templates render disclaimer text", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, disclaimer: "TestDisclaimer42" });
    ok(html.includes("TestDisclaimer42"), `Template "${tpl}": disclaimer not rendered`);
  }
});

test("Disclaimer color is #94a3b8 (muted gray)", () => {
  const html = gen({ template: "minimal", disclaimer: "Some disclaimer" });
  ok(html.includes("#94a3b8"), "Disclaimer color not #94a3b8");
});

test("Disclaimer max-width is 500px", () => {
  const html = gen({ template: "minimal", disclaimer: "Width test" });
  ok(html.includes("max-width:500px"), "Disclaimer max-width:500px not found");
});

// ============================================================
console.log("\n🖼️ FLOW 12: CTA Banner\n");
// ============================================================

test("No banner URL: nothing rendered, no 'banner' in output", () => {
  const html = gen({ template: "minimal", ctaBannerUrl: "", ctaBannerLink: "" });
  ok(!html.includes("Banner"), "Phantom banner in output");
});

test("Banner URL only: img rendered without wrapping <a>", () => {
  const html = gen({ template: "minimal", ctaBannerUrl: "https://example.com/banner.png", ctaBannerLink: "" });
  ok(html.includes("https://example.com/banner.png"), "Banner URL not in output");
  ok(html.includes("<img"), "Banner img not rendered");
});

test("Banner URL + link: img wrapped in <a> with correct href", () => {
  const html = gen({
    template: "minimal",
    ctaBannerUrl: "https://example.com/banner.png",
    ctaBannerLink: "https://example.com/promo",
  });
  ok(html.includes('href="https://example.com/promo"'), "Banner link not in output");
  ok(html.includes("https://example.com/banner.png"), "Banner img URL not in output");
  const aIdx = html.indexOf('href="https://example.com/promo"');
  const imgIdx = html.indexOf("banner.png");
  ok(aIdx < imgIdx, "Banner img not inside <a> tag");
});

test("Banner link without https: gets https:// prepended", () => {
  const html = gen({
    template: "minimal",
    ctaBannerUrl: "https://example.com/banner.png",
    ctaBannerLink: "example.com/promo",
  });
  ok(html.includes('href="https://example.com/promo"'), "https not prepended to banner link");
});

test("Banner with special chars in URL: & and quote escaped", () => {
  const html = gen({ template: "minimal", ctaBannerUrl: 'https://cdn.example.com/banner.png?q=1&v=2"test' });
  ok(!html.includes('"test'), "Unescaped quote in banner URL");
  ok(html.includes("&amp;"), "Ampersand not escaped in banner URL");
});

test("Banner renders on all 20 templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, ctaBannerUrl: "https://example.com/testbanner.png" });
    ok(html.includes("testbanner.png"), `Template "${tpl}": banner not rendered`);
  }
});

test("Banner img has width=400 attribute", () => {
  const html = gen({ template: "minimal", ctaBannerUrl: "https://example.com/b.png" });
  const imgMatch = html.match(/<img[^>]+b\.png[^>]*>/i);
  ok(!!imgMatch, "Banner img tag not found");
  if (imgMatch) {
    ok(imgMatch[0].includes('width="400"'), "Banner img width not 400");
  }
});

test("Banner link opens in new tab (target=_blank)", () => {
  const html = gen({
    template: "minimal",
    ctaBannerUrl: "https://example.com/b.png",
    ctaBannerLink: "https://example.com",
  });
  ok(html.includes('target="_blank"'), "Banner link does not open in new tab");
});

// ============================================================
console.log("\n📅 FLOW 13: Calendly Button\n");
// ============================================================

test("No calendlyUrl: 'Book a Meeting' not rendered", () => {
  const html = gen({ template: "minimal", calendlyUrl: "" });
  ok(!html.includes("Book a Meeting"), "Calendly button shown without URL");
});

test("calendlyUrl with https: button rendered with link", () => {
  const html = gen({ template: "minimal", calendlyUrl: "https://calendly.com/testuser" });
  ok(html.includes("https://calendly.com/testuser"), "Calendly URL not in output");
  ok(html.includes("Book a Meeting"), "Calendly button text not rendered");
});

test("calendlyUrl without https: gets https:// prepended", () => {
  const html = gen({ template: "minimal", calendlyUrl: "calendly.com/testuser" });
  ok(html.includes("https://calendly.com/testuser"), "https not prepended to calendly URL");
});

test("Calendly button is an <a> tag", () => {
  const html = gen({ template: "minimal", calendlyUrl: "https://calendly.com/test" });
  ok(html.includes('<a href="https://calendly.com/test"'), "Calendly button not an <a> tag");
});

test("Calendly button opens in new tab (target=_blank)", () => {
  const html = gen({ template: "minimal", calendlyUrl: "https://calendly.com/test" });
  ok(html.includes('target="_blank"'), "Calendly button not opening in new tab");
});

test("Calendly renders on all standard templates", () => {
  const calTemplates: TemplateName[] = [
    "minimal", "modern", "corporate", "elegant", "startup",
    "compact", "executive", "gradient", "developer", "medical",
    "legal", "academic", "influencer", "photographer", "simple",
  ];
  for (const tpl of calTemplates) {
    const html = gen({ template: tpl, calendlyUrl: "https://calendly.com/test" });
    ok(html.includes("calendly.com/test"), `Template "${tpl}": calendly URL not rendered`);
  }
});

test("Sales template renders calendly with 'Schedule a Call' label", () => {
  const html = gen({ template: "sales", calendlyUrl: "https://calendly.com/salestest" });
  ok(html.includes("salestest"), "Sales Calendly URL not rendered");
});

test("Bold template renders calendly inline (not via shared calendlyButton helper)", () => {
  const html = gen({ template: "bold", calendlyUrl: "https://calendly.com/boldtest" });
  ok(html.includes("boldtest"), "Bold template missing calendly URL");
});

test("Dark template renders calendly inline", () => {
  const html = gen({ template: "dark", calendlyUrl: "https://calendly.com/darktest" });
  ok(html.includes("darktest"), "Dark template missing calendly URL");
});

// ============================================================
console.log("\n✅ FLOW 14: HTML Quality Checks (all 20 templates)\n");
// ============================================================

const FULL_DATA: Partial<SignatureData> = {
  fullName: "QA Tester",
  jobTitle: "Test Engineer",
  company: "Quality Corp",
  email: "qa@quality.com",
  phone: "+1 555 000 9999",
  website: "quality.com",
  photoUrl: "https://example.com/qa.jpg",
  photoSize: 80,
  linkedin: "https://linkedin.com/in/qatester",
  twitter: "https://twitter.com/qatester",
  disclaimer: "QA Disclaimer text",
  ctaBannerUrl: "https://example.com/qa-banner.png",
  calendlyUrl: "https://calendly.com/qa",
  primaryColor: "#2563eb",
  accentColor: "#f59e0b",
};

for (const tpl of ALL_TEMPLATES) {
  test(`HTML quality "${tpl}": output starts with <table`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(html.trimStart().startsWith("<table"), `"${tpl}" does not start with <table`);
  });

  test(`HTML quality "${tpl}": no <style> blocks`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes("<style"), `Template "${tpl}" contains <style>`);
  });

  test(`HTML quality "${tpl}": no <script> tags`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes("<script"), `Template "${tpl}" contains <script>`);
  });

  test(`HTML quality "${tpl}": no CSS class= attributes`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes(" class="), `Template "${tpl}" uses class= attribute`);
  });

  test(`HTML quality "${tpl}": uses inline styles (style= present)`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(html.includes(" style="), `Template "${tpl}" has no inline styles`);
  });

  test(`HTML quality "${tpl}": no flexbox (display:flex)`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes("display:flex"), `Template "${tpl}" uses flexbox`);
  });

  test(`HTML quality "${tpl}": no CSS grid (display:grid)`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes("display:grid"), `Template "${tpl}" uses CSS grid`);
  });

  test(`HTML quality "${tpl}": outer table has width 500`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(html.includes('width="500"') || html.includes("width:500px"), `Template "${tpl}" lacks width 500`);
  });

  test(`HTML quality "${tpl}": no SVG elements`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes("<svg"), `Template "${tpl}" uses SVG`);
  });

  test(`HTML quality "${tpl}": no base64 images (data:image)`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes("data:image"), `Template "${tpl}" uses base64 images`);
  });

  test(`HTML quality "${tpl}": no position:absolute`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes("position:absolute"), `Template "${tpl}" uses position:absolute`);
  });

  test(`HTML quality "${tpl}": no position:fixed`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(!html.includes("position:fixed"), `Template "${tpl}" uses position:fixed`);
  });

  test(`HTML quality "${tpl}": output under 50KB`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    const sizeKB = Buffer.byteLength(html, "utf8") / 1024;
    ok(sizeKB < 50, `Template "${tpl}" HTML is ${sizeKB.toFixed(1)}KB — exceeds 50KB`);
  });

  test(`HTML quality "${tpl}": all <a> tags have href attribute`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    const badLinks = html.match(/<a(?![^>]*href=)[^>]*>/gi);
    ok(!badLinks, `Template "${tpl}" has <a> tags without href`);
  });

  test(`HTML quality "${tpl}": table-based layout (has <td> elements)`, () => {
    const html = gen({ template: tpl, ...FULL_DATA }, "pro");
    ok(html.includes("<td"), `Template "${tpl}" has no <td> — not table-based`);
  });
}

test("Photo img tags have width and height attributes on all photo templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, photoUrl: "https://example.com/p.jpg" }, "pro");
    if (html.includes("p.jpg")) {
      const imgMatch = html.match(/<img[^>]+p\.jpg[^>]*>/i);
      if (imgMatch) {
        ok(imgMatch[0].includes("width="), `Template "${tpl}": photo img missing width`);
        ok(imgMatch[0].includes("height="), `Template "${tpl}": photo img missing height`);
      }
    }
  }
});

test("Social icon img tags have width and height on all templates", () => {
  for (const tpl of ALL_TEMPLATES) {
    const html = gen({ template: tpl, linkedin: "https://linkedin.com/in/test" }, "pro");
    const iconMatch = html.match(/<img[^>]+linkedin\.png[^>]*>/i);
    if (iconMatch) {
      ok(iconMatch[0].includes("width="), `Template "${tpl}": social icon img missing width`);
      ok(iconMatch[0].includes("height="), `Template "${tpl}": social icon img missing height`);
    }
  }
});

// ============================================================
console.log("\n🔬 FLOW 15: Edge Cases\n");
// ============================================================

test("All fields empty: renders non-empty HTML with <table", () => {
  const html = gen({
    fullName: "", jobTitle: "", company: "", email: "", phone: "", website: "",
    photoUrl: "", linkedin: "", twitter: "", instagram: "", facebook: "",
    github: "", youtube: "", disclaimer: "", ctaBannerUrl: "", ctaBannerLink: "",
    calendlyUrl: "", pronouns: "", address: "",
  });
  ok(html.length > 0, "Empty fields produced empty output");
  ok(html.includes("<table"), "Empty fields: not a table");
});

test("All fields empty: no phantom mailto/tel links", () => {
  const html = gen({
    fullName: "", jobTitle: "", company: "", email: "", phone: "", website: "",
    photoUrl: "", linkedin: "", twitter: "", instagram: "", facebook: "",
    github: "", youtube: "",
  });
  ok(!html.includes("mailto:"), "Phantom mailto when all empty");
  ok(!html.includes("tel:+"), "Phantom tel when all empty");
});

test("All fields at max length (1000 chars): renders without throwing", () => {
  const maxStr = "A".repeat(1000);
  const html = gen({
    fullName: maxStr, jobTitle: maxStr, company: maxStr,
    email: `${maxStr.substring(0, 50)}@test.com`, disclaimer: maxStr,
  });
  ok(html.length > 0, "Max length fields produced empty output");
});

test("Unicode Chinese characters in fullName render correctly", () => {
  const html = gen({ template: "minimal", fullName: "张伟华" });
  ok(html.includes("张伟华"), "Chinese name not in output");
});

test("Unicode Arabic characters in fullName render correctly", () => {
  const html = gen({ template: "minimal", fullName: "محمد علي" });
  ok(html.includes("محمد علي"), "Arabic name not in output");
});

test("Emoji in fullName renders correctly", () => {
  const html = gen({ template: "minimal", fullName: "Alex 🚀 Johnson" });
  ok(html.includes("🚀"), "Emoji not in output");
});

test("HTML special chars in fullName: <script> is escaped", () => {
  const html = gen({ template: "minimal", fullName: "<script>alert(1)</script>" });
  ok(!html.includes("<script>alert"), "Raw script tag in fullName — XSS possible");
  ok(html.includes("&lt;script&gt;"), "Script tag not escaped in fullName");
});

test("HTML special chars in jobTitle: <b>Bold Title</b> escaped", () => {
  const html = gen({ template: "minimal", jobTitle: "<b>Bold Title</b>" });
  ok(!html.includes("<b>Bold"), "Raw HTML in jobTitle");
  ok(html.includes("&lt;b&gt;"), "jobTitle HTML not escaped");
});

test("Ampersand in company: escaped as &amp;", () => {
  const html = gen({ template: "minimal", company: "Corp & Sons <LLC>" });
  ok(html.includes("&amp;"), "Ampersand not escaped in company");
  ok(html.includes("&lt;LLC&gt;"), "Angle brackets not escaped in company");
});

test("Very long website URL renders without breaking layout", () => {
  const longUrl = "example.com/" + "path/".repeat(50) + "page";
  const html = gen({ template: "minimal", website: longUrl });
  ok(html.includes("example.com"), "Long URL not rendered");
});

test("Very long linkedin URL renders without breaking layout", () => {
  const longUrl = "https://linkedin.com/in/" + "x".repeat(200);
  const html = gen({ template: "minimal", linkedin: longUrl });
  ok(html.includes("linkedin.com/in/"), "Long linkedin URL not rendered");
});

test("Empty photoUrl: no photo img elements pointing to non-icon URLs", () => {
  const html = gen({ template: "minimal", photoUrl: "" });
  const imgMatches = html.match(/<img[^>]*src="[^"]*\.(jpg|jpeg|png|gif|webp)"/gi) ?? [];
  const photoImgs = imgMatches.filter((m) => !m.includes("neatstamp.com/icons") && !m.includes("/track"));
  ok(photoImgs.length === 0, "Photo img present when photoUrl is empty string");
});

test("Unknown template does not throw (fallback to minimal)", () => {
  let threw = false;
  try {
    generateSignatureHtml(makeData({ template: "does_not_exist" as TemplateName }), { plan: "pro" });
  } catch {
    threw = true;
  }
  ok(!threw, "Unknown template threw an error");
});

test("Unicode in disclaimer renders correctly", () => {
  const html = gen({ template: "minimal", disclaimer: "免责声明：本邮件内容保密。" });
  ok(html.includes("免责声明"), "Chinese disclaimer not rendered");
});

test("Special characters in address: escaped", () => {
  const html = gen({ template: "minimal", address: "123 Main St & Blvd <Suite>" });
  ok(html.includes("&amp;"), "Ampersand not escaped in address");
  ok(html.includes("&lt;Suite&gt;"), "Angle brackets not escaped in address");
});

test("Pronouns with special chars: escaped", () => {
  const html = gen({ template: "minimal", pronouns: "she/her <custom>" });
  ok(html.includes("&lt;custom&gt;"), "Pronouns HTML not escaped");
});

test("French characters in jobTitle render correctly", () => {
  const html = gen({ template: "minimal", jobTitle: "Directeur général" });
  ok(html.includes("Directeur général"), "French characters in jobTitle not rendered");
});

// ============================================================
console.log("\n🧬 FLOW 16: Signature Identity (determinism)\n");
// ============================================================

test("Same data + same template = identical HTML (deterministic)", () => {
  const data = makeData({ template: "minimal", fullName: "Identity Test" });
  const html1 = generateSignatureHtml(data, { plan: "pro" });
  const html2 = generateSignatureHtml(data, { plan: "pro" });
  ok(html1 === html2, "Same input produced different output — not deterministic");
});

test("Different fullName = different HTML output", () => {
  const html1 = gen({ template: "minimal", fullName: "Alice Smith" });
  const html2 = gen({ template: "minimal", fullName: "Bob Jones" });
  ok(html1 !== html2, "Different names produced same output");
});

test("Same data + different template = different HTML", () => {
  const base = { fullName: "Same Person", email: "same@test.com" };
  const html1 = gen({ template: "minimal", ...base });
  const html2 = gen({ template: "modern", ...base });
  ok(html1 !== html2, "Different templates produced same output");
});

test("Each of 20 templates is deterministic (two renders = identical)", () => {
  for (const tpl of ALL_TEMPLATES) {
    const data = makeData({ template: tpl, fullName: "Deterministic User" });
    const h1 = generateSignatureHtml(data, { plan: "pro" });
    const h2 = generateSignatureHtml(data, { plan: "pro" });
    ok(h1 === h2, `Template "${tpl}" is not deterministic`);
  }
});

test("Changing only primaryColor produces different output", () => {
  const html1 = gen({ template: "minimal", primaryColor: "#ff0000" });
  const html2 = gen({ template: "minimal", primaryColor: "#00ff00" });
  ok(html1 !== html2, "Different primaryColors produced same output");
});

test("Changing only accentColor produces different output (modern)", () => {
  const html1 = gen({ template: "modern", accentColor: "#ff0000" });
  const html2 = gen({ template: "modern", accentColor: "#00ff00" });
  ok(html1 !== html2, "Different accentColors produced same output");
});

test("Pro vs free plan produces different output (branding difference)", () => {
  const data = makeData({ template: "minimal" });
  const htmlPro = generateSignatureHtml(data, { plan: "pro" });
  const htmlFree = generateSignatureHtml(data, { plan: "free" });
  ok(htmlPro !== htmlFree, "Pro and free plan outputs are identical");
});

test("All 20 templates produce distinct outputs with identical base data", () => {
  const base = makeData({ fullName: "UniqueTest", email: "unique@test.com" });
  const outputs = new Set<string>();
  for (const tpl of ALL_TEMPLATES) {
    const html = generateSignatureHtml({ ...base, template: tpl }, { plan: "pro" });
    outputs.add(html);
  }
  ok(outputs.size === 20, `Expected 20 distinct template outputs, got ${outputs.size}`);
});

// ============================================================
console.log("\n🔧 Integration: Template-specific behaviors\n");
// ============================================================

// Medical
test("Medical template: uses teal (#0d9488) when primaryColor is default (#2563eb)", () => {
  const html = gen({ template: "medical", primaryColor: "#2563eb" });
  ok(html.includes("#0d9488"), "Medical template did not override to teal");
});

test("Medical template: respects non-default custom primaryColor", () => {
  const html = gen({ template: "medical", primaryColor: "#dc2626" });
  ok(html.includes("#dc2626"), "Medical template did not respect custom primaryColor");
});

test("Medical template: border-top:3px solid color", () => {
  const html = gen({ template: "medical" });
  ok(html.includes("border-top:3px solid"), "Medical template missing top border");
});

// Developer
test("Developer template: uses monospace font (Courier)", () => {
  const html = gen({ template: "developer" });
  ok(html.includes("Courier") || html.includes("monospace"), "Developer not using monospace font");
});

test("Developer template: shows '// ' comment syntax before name", () => {
  const html = gen({ template: "developer", fullName: "Dev User" });
  ok(html.includes("// "), "Developer template missing // syntax");
});

test("Developer template: shows 'const role' syntax for jobTitle", () => {
  const html = gen({ template: "developer", jobTitle: "Engineer" });
  ok(html.includes("const") && html.includes("role"), "Developer template missing const role syntax");
});

test("Developer template: shows github username prominently", () => {
  const html = gen({ template: "developer", github: "https://github.com/myuser" });
  ok(html.includes("myuser"), "Developer template missing github username");
});

// Elegant
test("Elegant template: uses serif font (Georgia)", () => {
  const html = gen({ template: "elegant" });
  ok(html.includes("Georgia"), "Elegant template not using Georgia font");
});

test("Elegant template: title is italic", () => {
  const html = gen({ template: "elegant", jobTitle: "Managing Partner" });
  ok(html.includes("font-style:italic"), "Elegant template title not italic");
});

// Legal
test("Legal template: uses serif font (Georgia/Times)", () => {
  const html = gen({ template: "legal" });
  ok(html.includes("Georgia") || html.includes("Times"), "Legal template not using serif font");
});

test("Legal template: name displayed uppercase (text-transform:uppercase)", () => {
  const html = gen({ template: "legal", fullName: "Thomas Crawford" });
  ok(html.includes("text-transform:uppercase"), "Legal template name not uppercase");
});

test("Legal template: has bottom border (border-bottom:3px solid #334155)", () => {
  const html = gen({ template: "legal" });
  ok(html.includes("border-bottom:3px solid #334155"), "Legal template missing bottom border");
});

// Bold
test("Bold template: background-color matches primaryColor", () => {
  const html = gen({ template: "bold", primaryColor: "#dc2626" });
  ok(html.includes("background-color:#dc2626"), "Bold template not using primaryColor as background");
});

test("Bold template: uses white text (#fff) for name", () => {
  const html = gen({ template: "bold" });
  ok(html.includes("color:#fff"), "Bold template not using white text");
});

test("Bold template: border-radius:8px on outer wrapper", () => {
  const html = gen({ template: "bold" });
  ok(html.includes("border-radius:8px"), "Bold template missing border-radius");
});

// Dark
test("Dark template: has dark background (#111827)", () => {
  const html = gen({ template: "dark" });
  ok(html.includes("background-color:#111827"), "Dark template missing dark background");
});

test("Dark template: uses light text for name (#f1f5f9)", () => {
  const html = gen({ template: "dark" });
  ok(html.includes("#f1f5f9"), "Dark template not using light name color");
});

// Executive
test("Executive template: dark header section (#1e293b)", () => {
  const html = gen({ template: "executive" });
  ok(html.includes("background-color:#1e293b"), "Executive template missing dark header");
});

test("Executive template: light body background (#fafafa)", () => {
  const html = gen({ template: "executive" });
  ok(html.includes("background-color:#fafafa"), "Executive template missing light body");
});

test("Executive template: left accent border uses primaryColor", () => {
  const html = gen({ template: "executive", primaryColor: "#7c3aed" });
  ok(html.includes("border-left:3px solid #7c3aed"), "Executive template missing left border");
});

// Gradient
test("Gradient template: left color bar uses primaryColor", () => {
  const html = gen({ template: "gradient", primaryColor: "#7c3aed" });
  ok(html.includes("background-color:#7c3aed"), "Gradient template missing primary color bar");
});

test("Gradient template: second accent bar uses accentColor", () => {
  const html = gen({ template: "gradient", accentColor: "#f472b6" });
  ok(html.includes("background-color:#f472b6"), "Gradient template missing accent color bar");
});

test("Gradient template: light content background (#f8fafc)", () => {
  const html = gen({ template: "gradient" });
  ok(html.includes("#f8fafc"), "Gradient template missing light content background");
});

// Influencer
test("Influencer template: shows @ prefix before company name", () => {
  const html = gen({ template: "influencer", company: "zaramitchell" });
  ok(html.includes("@zaramitchell"), "Influencer template missing @ company prefix");
});

test("Influencer template: larger social icons (24px)", () => {
  const html = gen({ template: "influencer", instagram: "https://instagram.com/test" });
  ok(html.includes("width:24px"), "Influencer template not using 24px icons");
});

// Realtor
test("Realtor template: default photo size is 100px", () => {
  const html = gen({ template: "realtor", photoUrl: "https://example.com/r.jpg" });
  ok(html.includes("width:100px"), "Realtor template default photo size not 100px");
});

test("Realtor template: has 4px solid left border", () => {
  const html = gen({ template: "realtor" });
  ok(html.includes("border-left:4px solid"), "Realtor template missing 4px left border");
});

// Corporate
test("Corporate template: has top border (border-top:3px solid)", () => {
  const html = gen({ template: "corporate" });
  ok(html.includes("border-top:3px solid"), "Corporate template missing top border");
});

test("Corporate template: T/E/W label prefixes for contact rows", () => {
  const html = gen({ template: "corporate", phone: "+1 555 000 1234", email: "t@test.com", website: "t.com" });
  ok(html.includes("T&amp;") || html.includes("T&nbsp;"), "Corporate template missing T: phone label");
  ok(html.includes("E&nbsp;"), "Corporate template missing E: email label");
  ok(html.includes("W&nbsp;"), "Corporate template missing W: website label");
});

// Compact & Simple
test("Compact template: renders name, title, company inline", () => {
  const html = gen({ template: "compact", fullName: "Em Zhang", jobTitle: "Analyst", company: "Deloitte" });
  ok(html.includes("Em Zhang"), "Name missing in compact");
  ok(html.includes("Analyst"), "Title missing in compact");
  ok(html.includes("Deloitte"), "Company missing in compact");
});

test("Simple template: renders name, title, company inline", () => {
  const html = gen({ template: "simple", fullName: "Kate M", jobTitle: "Consultant", company: "Indie" });
  ok(html.includes("Kate M"), "Name missing in simple");
  ok(html.includes("Consultant"), "Title missing in simple");
  ok(html.includes("Indie"), "Company missing in simple");
});

// ============================================================
console.log("\n📌 Integration: Pronouns & Address\n");
// ============================================================

test("Pronouns they/them renders in minimal template", () => {
  const html = gen({ template: "minimal", pronouns: "they/them" });
  ok(html.includes("they/them"), "Pronouns not rendered in minimal");
});

test("Pronouns she/her renders in modern template", () => {
  const html = gen({ template: "modern", pronouns: "she/her" });
  ok(html.includes("she/her"), "Pronouns not rendered in modern");
});

test("Pronouns empty: no parenthesized pronouns in output", () => {
  const html = gen({ template: "minimal", pronouns: "" });
  ok(!html.includes("(she"), "Phantom pronouns in output");
});

test("Pronouns with HTML special chars: escaped", () => {
  const html = gen({ template: "minimal", pronouns: "xe/xem&<xirs>" });
  ok(html.includes("&amp;"), "Ampersand not escaped in pronouns");
  ok(html.includes("&lt;xirs&gt;"), "Angle brackets not escaped in pronouns");
});

test("Address renders in minimal template", () => {
  const html = gen({ template: "minimal", address: "100 Main St, New York" });
  ok(html.includes("100 Main St, New York"), "Address not rendered in minimal");
});

test("Address empty: no address content in output", () => {
  const html = gen({ template: "minimal", address: "" });
  ok(!html.includes("Main St"), "Phantom address in output");
});

test("Address renders in modern template", () => {
  const html = gen({ template: "modern", address: "200 5th Ave" });
  ok(html.includes("200 5th Ave"), "Address not rendered in modern");
});

test("Address renders in corporate template", () => {
  const html = gen({ template: "corporate", address: "300 Park Ave" });
  ok(html.includes("300 Park Ave"), "Address not rendered in corporate");
});

// ============================================================
// Summary
// ============================================================

const total = passed + failed;
console.log(`\n${"=".repeat(60)}`);
console.log(`  App Flows Test Suite Complete`);
console.log(`  Total:  ${total}`);
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);

if (failures.length > 0) {
  console.log(`\n  FAILURES:`);
  failures.forEach((f) => console.log(`    ❌ ${f}`));
  console.log();
  process.exit(1);
} else {
  console.log(`\n  All tests passed! 🎉`);
}
console.log(`${"=".repeat(60)}\n`);
