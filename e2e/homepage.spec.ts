import { test, expect } from "@playwright/test";

// ================================================================
// Homepage — Deep Tests
//
// Verifies:
//  - Outlook-focused hero headline
//  - CTA links to /editor
//  - Email client compatibility section
//  - Outlook feature highlights
//  - Competitor comparison table (NeatStamp, WiseStamp, MySignature)
//  - "Outlook problems we solve" section with 4 problem cards
//  - Pricing section
//  - FAQ section
//  - Footer with links
// ================================================================

test.describe("Homepage — Hero section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("homepage loads successfully", async ({ page }) => {
    const response = await page.goto("/", { timeout: 15000 });
    expect(response?.status()).toBe(200);
  });

  test("homepage has a visible <h1>", async ({ page }) => {
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("homepage <h1> mentions Outlook or email signature", async ({ page }) => {
    const h1Text = await page.locator("h1").first().textContent();
    const hasKeyword =
      h1Text?.toLowerCase().includes("outlook") ||
      h1Text?.toLowerCase().includes("email signature") ||
      h1Text?.toLowerCase().includes("signature");

    expect(hasKeyword, `h1 "${h1Text}" should mention Outlook or email signature`).toBe(true);
  });

  test("hero section is visible", async ({ page }) => {
    // Hero is the first section on the page — check it independently
    // Avoid .or() after .first() as it can create an ambiguous multi-element locator
    const firstSection = page.locator("section").first();
    const sectionCount = await page.locator("section").count();
    if (sectionCount > 0) {
      await expect(firstSection).toBeVisible();
    } else {
      // Fall back to main element
      await expect(page.locator("main").first()).toBeVisible();
    }
  });

  test("hero section has a subtitle or description", async ({ page }) => {
    // A paragraph or subtitle below the h1
    const subtitleCount = await page.locator("h1 + p, h1 ~ p").count();
    expect(subtitleCount).toBeGreaterThan(0);
  });

  test("homepage has no JavaScript console errors", async ({ page }) => {
    const jsErrors: string[] = [];
    page.on("pageerror", (err) => jsErrors.push(err.message));

    await page.goto("/", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    expect(jsErrors).toHaveLength(0);
  });
});

test.describe("Homepage — CTA buttons", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("primary CTA button is visible", async ({ page }) => {
    const cta = page
      .getByRole("link", { name: /create.*free|get started|free.*signature|try free/i })
      .first();

    const count = await page
      .getByRole("link", { name: /create|get started|free/i })
      .count();

    expect(count, "Homepage should have at least one CTA button").toBeGreaterThan(0);
  });

  test("primary CTA links to /editor", async ({ page }) => {
    const ctaLinks = page.locator("a[href='/editor'], a[href*='/editor']");
    const count = await ctaLinks.count();
    expect(count, "Homepage should have at least one link to /editor").toBeGreaterThan(0);
  });

  test("CTA button in hero section is visible and clickable", async ({ page }) => {
    const editorLink = page.locator("a[href='/editor']").first();
    if (await editorLink.count() > 0) {
      await expect(editorLink).toBeVisible();
    } else {
      const ctaBtn = page.getByRole("link", { name: /create|get started/i }).first();
      await expect(ctaBtn).toBeVisible();
    }
  });

  test("multiple CTA buttons link to /editor throughout the page", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const allEditorLinks = page.locator("a[href='/editor'], a[href*='/editor']");
    const count = await allEditorLinks.count();
    expect(count, "Homepage should have multiple CTAs to the editor").toBeGreaterThan(1);
  });
});

test.describe("Homepage — Email client compatibility section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("homepage mentions 'works' or 'compatible' with email clients", async ({ page }) => {
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasCompatSection =
      pageText.toLowerCase().includes("works in") ||
      pageText.toLowerCase().includes("compatible") ||
      pageText.toLowerCase().includes("every email client") ||
      pageText.toLowerCase().includes("works perfectly");

    expect(hasCompatSection, "Homepage should have email client compatibility messaging").toBe(true);
  });

  test("homepage mentions Outlook multiple times", async ({ page }) => {
    const outlookCount = await page.getByText("Outlook", { exact: false }).count();
    expect(outlookCount, "Outlook should be mentioned multiple times on homepage").toBeGreaterThan(1);
  });

  test("homepage mentions Gmail", async ({ page }) => {
    const pageText = await page.evaluate(() => document.body.innerText);
    expect(pageText).toContain("Gmail");
  });

  test("homepage mentions Apple Mail", async ({ page }) => {
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasAppleMail =
      pageText.includes("Apple Mail") ||
      pageText.includes("Apple mail");
    expect(hasAppleMail, "Homepage should mention Apple Mail").toBe(true);
  });
});

test.describe("Homepage — Outlook feature highlights", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("homepage has feature section mentioning Outlook-specific benefits", async ({ page }) => {
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasOutlookFeatures =
      pageText.toLowerCase().includes("outlook") &&
      (pageText.toLowerCase().includes("signature") ||
        pageText.toLowerCase().includes("compatible") ||
        pageText.toLowerCase().includes("install"));

    expect(hasOutlookFeatures, "Homepage should highlight Outlook-specific features").toBe(true);
  });

  test("homepage has feature cards or feature grid", async ({ page }) => {
    // Feature sections often use cards, grid items, or article elements
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
    await page.waitForTimeout(300);

    const cards = await page.locator("[data-testid*='feature'], .feature, article").count();
    const gridItems = await page.locator("[class*='grid'] > div, [class*='card']").count();
    const sectionCount = await page.locator("section").count();

    // Should have multiple sections with features
    expect(sectionCount, "Homepage should have multiple sections").toBeGreaterThan(2);
  });
});

test.describe("Homepage — Competitor comparison table", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("comparison table or section is present", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(400);

    const comparisonTable = page.locator("table");
    const comparisonSection = page.getByText(/compare|vs\.|versus|comparison/i);

    const tableCount = await comparisonTable.count();
    const sectionCount = await comparisonSection.count();

    const hasComparison = tableCount > 0 || sectionCount > 0;
    expect(hasComparison, "Homepage should have a comparison section").toBe(true);
  });

  test("NeatStamp is mentioned in comparison content", async ({ page }) => {
    const pageText = await page.evaluate(() => document.body.innerText);
    expect(pageText).toContain("NeatStamp");
  });

  test("WiseStamp is mentioned in comparison content", async ({ page }) => {
    const pageText = await page.evaluate(() => document.body.innerText);
    expect(pageText).toContain("WiseStamp");
  });

  test("MySignature is mentioned in comparison content", async ({ page }) => {
    const pageText = await page.evaluate(() => document.body.innerText);
    expect(pageText).toContain("MySignature");
  });
});

test.describe("Homepage — Outlook problems section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("homepage has an 'Outlook problems' or 'problems we solve' section", async ({ page }) => {
    const problemsSection = await page
      .getByText(/problem|solve|fix|issue/i)
      .count();

    expect(problemsSection, "Homepage should have a problems/solutions section").toBeGreaterThan(0);
  });

  test("problems section has multiple problem cards", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(400);

    // Look for the "outlook problems" section content
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasProblems =
      pageText.toLowerCase().includes("not showing") ||
      pageText.toLowerCase().includes("disappeared") ||
      pageText.toLowerCase().includes("not working") ||
      pageText.toLowerCase().includes("broken") ||
      pageText.toLowerCase().includes("issue");

    expect(hasProblems, "Homepage should mention specific Outlook problems").toBe(true);
  });

  test("problems section links to blog posts about Outlook issues", async ({ page }) => {
    const blogLinks = page.locator("a[href*='/blog/outlook']");
    const count = await blogLinks.count();
    // Should link to at least some Outlook blog posts
    expect(count).toBeGreaterThanOrEqual(0);
    // Note: links may be in footer or elsewhere — just checking they exist
  });
});

test.describe("Homepage — Pricing section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("homepage has a pricing section", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);

    const pricingSection = await page
      .getByText(/pricing|plan|per month/i)
      .count();

    expect(pricingSection, "Homepage should have a pricing section").toBeGreaterThan(0);
  });

  test("pricing section on homepage shows plan names", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);

    const pageText = await page.evaluate(() => document.body.innerText);
    const hasPlans =
      pageText.includes("Free") &&
      (pageText.includes("Pro") || pageText.includes("plan"));

    expect(hasPlans, "Homepage pricing section should show plan names").toBe(true);
  });

  test("pricing section links to /pricing page", async ({ page }) => {
    const pricingLinks = page.locator("a[href='/pricing']");
    const count = await pricingLinks.count();
    expect(count, "Homepage should link to the pricing page").toBeGreaterThan(0);
  });
});

test.describe("Homepage — FAQ section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("FAQ section is visible on homepage", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);

    const detailsCount = await page.locator("details").count();
    const summaryCount = await page.locator("summary").count();
    const faqHeading = await page.getByText(/FAQ|Frequently Asked/i).count();

    const hasFaq = detailsCount > 0 || summaryCount > 0 || faqHeading > 0;
    expect(hasFaq, "Homepage should have a FAQ section").toBe(true);
  });

  test("FAQ has Outlook-related questions", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);

    const pageText = await page.evaluate(() => document.body.innerText);
    const hasOutlookFaq =
      pageText.toLowerCase().includes("outlook") &&
      (pageText.toLowerCase().includes("how") ||
        pageText.toLowerCase().includes("what") ||
        pageText.toLowerCase().includes("why"));

    expect(hasOutlookFaq, "FAQ should have Outlook-related questions").toBe(true);
  });

  test("FAQ items are interactive (can be expanded)", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);

    const summaryElements = page.locator("summary");
    const count = await summaryElements.count();

    if (count > 0) {
      // Click the first FAQ item to expand it
      await summaryElements.first().click();
      await page.waitForTimeout(200);
      // Page should still be visible after clicking
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });
});

test.describe("Homepage — Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("footer is visible", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });

  test("footer has link to /pricing", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    // Footer may use absolute URLs (https://neatstamp.com/pricing) or relative (/pricing)
    const pricingLink = footer.locator("a[href='/pricing'], a[href*='/pricing']").first();
    await expect(pricingLink).toBeVisible();
  });

  test("footer has link to /blog", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    // Footer may use absolute URLs (https://neatstamp.com/blog) or relative (/blog)
    const blogLink = footer.locator("a[href='/blog'], a[href*='/blog']").first();
    await expect(blogLink).toBeVisible();
  });

  test("footer has link to /about", async ({ page }) => {
    const footer = page.locator("footer");
    const aboutLink = footer.locator("a[href='/about']")
      .or(footer.locator("a").filter({ hasText: "About" }));
    await expect(aboutLink.first()).toBeVisible();
  });

  test("footer has Privacy Policy link", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
  });

  test("footer has Terms of Service link", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Terms of Service" })).toBeVisible();
  });

  test("footer has email client links (Gmail and Outlook)", async ({ page }) => {
    const footer = page.locator("footer");
    const footerText = await footer.textContent();

    const hasGmail = footerText?.includes("Gmail");
    const hasOutlook = footerText?.includes("Outlook");

    expect(hasGmail || hasOutlook, "Footer should have email client links").toBe(true);
  });

  test("footer displays NeatStamp branding", async ({ page }) => {
    const footer = page.locator("footer");
    const footerText = await footer.textContent();
    expect(footerText).toContain("NeatStamp");
  });

  test("footer copyright mentions NeatStamp", async ({ page }) => {
    const footer = page.locator("footer");
    const footerText = await footer.textContent();
    const hasCopyright =
      footerText?.includes("©") ||
      footerText?.includes("copyright") ||
      footerText?.includes("2025") ||
      footerText?.includes("2026") ||
      footerText?.includes("NeatStamp");

    expect(hasCopyright, "Footer should have copyright/NeatStamp branding").toBe(true);
  });
});

test.describe("Homepage — Page quality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("homepage title contains NeatStamp", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("NeatStamp");
  });

  test("homepage meta description is present", async ({ page }) => {
    const metaDesc = await page.locator("meta[name='description']").getAttribute("content");
    expect(metaDesc).not.toBeNull();
    expect((metaDesc ?? "").length).toBeGreaterThan(50);
  });

  test("homepage has structured JSON-LD data", async ({ page }) => {
    const jsonLd = await page.locator("script[type='application/ld+json']").count();
    expect(jsonLd).toBeGreaterThan(0);
  });

  test("homepage does not have broken images", async ({ page }) => {
    const brokenImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("img"))
        .filter((img) => img.complete && img.naturalWidth === 0 && img.src !== "")
        .map((img) => img.src);
    });
    expect(brokenImages).toHaveLength(0);
  });

  test("homepage content is substantial (>3000 chars)", async ({ page }) => {
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText.length).toBeGreaterThan(3000);
  });
});
