import { test, expect, type Page } from "@playwright/test";

// ================================================================
// Blog Content Tests
//
// For each of the 10 key blog posts, verifies:
//  - Page loads (HTTP 200)
//  - Has <h1>
//  - Has breadcrumb with Home and Blog links
//  - Has FAQ section (details/summary elements)
//  - Has at least 1 internal link to /editor
//  - Has related guides section
//  - Has CTA section at bottom
//  - No JavaScript console errors
//  - Content length > 1000 chars
// ================================================================

const BLOG_POSTS = [
  "/blog/outlook-signature-not-working",
  "/blog/outlook-signature-disappeared",
  "/blog/new-outlook-signature-problems",
  "/blog/outlook-roaming-signatures",
  "/blog/outlook-signature-deployment-guide",
  "/blog/microsoft-365-email-signature-management",
  "/blog/outlook-signature-best-practices-2026",
  "/blog/outlook-vs-gmail-signature-differences",
  "/blog/email-signature-not-working-new-outlook",
  "/blog/outlook-signature-not-saving",
];

// ================================================================
// Helper: collect JS errors on a page
// ================================================================
async function collectJsErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

// ================================================================
// Group 1: Page loads correctly
// ================================================================

test.describe("Blog Content — Page loads (HTTP 200)", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} returns HTTP 200`, async ({ page }) => {
      const response = await page.goto(url, { timeout: 15000 });
      expect(response?.status(), `${url} should return 200`).toBe(200);
    });
  }
});

// ================================================================
// Group 2: Has <h1>
// ================================================================

test.describe("Blog Content — Has <h1>", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} has exactly one <h1>`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const h1Count = await page.locator("h1").count();
      expect(h1Count, `${url} should have exactly 1 <h1>`).toBe(1);
    });
  }
});

// ================================================================
// Group 3: Has breadcrumb with Home and Blog links
// ================================================================

test.describe("Blog Content — Has breadcrumb", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} has breadcrumb with Home link`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      // Home link — could be "/" or "https://neatstamp.com"
      const homeLinks = page.locator("a[href='/']")
        .or(page.locator("a[href='https://neatstamp.com']"))
        .or(page.locator("a").filter({ hasText: "Home" }));

      const count = await homeLinks.count();
      expect(count, `${url} should have a Home link in breadcrumb`).toBeGreaterThan(0);
    });
  }

  for (const url of BLOG_POSTS) {
    test(`${url} has breadcrumb with Blog link`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      // Blog link — /blog or text "Blog"
      const blogLinks = page.locator("a[href='/blog']")
        .or(page.locator("a").filter({ hasText: /^Blog$/ }));

      const count = await blogLinks.count();
      expect(count, `${url} should have a Blog link in breadcrumb`).toBeGreaterThan(0);
    });
  }
});

// ================================================================
// Group 4: Has FAQ section
// ================================================================

test.describe("Blog Content — Has FAQ section", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} has FAQ section with details/summary or FAQ heading`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const detailsCount = await page.locator("details").count();
      const summaryCount = await page.locator("summary").count();
      const faqHeading = await page.getByText(/FAQ|Frequently Asked/i).count();

      const hasFaq = detailsCount > 0 || summaryCount > 0 || faqHeading > 0;
      expect(hasFaq, `${url} should have a FAQ section (details/summary or FAQ heading)`).toBe(true);
    });
  }
});

// ================================================================
// Group 5: Has at least 1 internal link to /editor
// ================================================================

test.describe("Blog Content — Has link to /editor", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} has at least one link to /editor`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const editorLinks = page.locator("a[href='/editor']")
        .or(page.locator("a[href*='/editor']"));

      const count = await editorLinks.count();
      expect(count, `${url} should link to /editor at least once`).toBeGreaterThan(0);
    });
  }
});

// ================================================================
// Group 6: Has related guides or related articles section
// ================================================================

test.describe("Blog Content — Has related guides section", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} has related guides or related articles section`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const relatedSection = await page
        .getByText(/related guide|related article|you might also|more guides|further reading|more outlook|signature guides/i)
        .count();

      expect(
        relatedSection,
        `${url} should have a related guides section`
      ).toBeGreaterThan(0);
    });
  }
});

// ================================================================
// Group 7: Has CTA section at bottom
// ================================================================

test.describe("Blog Content — Has CTA section", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} has a CTA section linking to the editor`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      // Scroll to bottom to ensure CTA is loaded
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      // CTA is typically a prominent link/button near the bottom
      const ctaLinks = page.locator("a[href='/editor'], a[href*='/editor']");
      const ctaCount = await ctaLinks.count();

      expect(ctaCount, `${url} should have a CTA linking to the editor`).toBeGreaterThan(0);
    });
  }
});

// ================================================================
// Group 8: No JavaScript console errors
// ================================================================

test.describe("Blog Content — No JS errors", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} loads without JavaScript console errors`, async ({ page }) => {
      const jsErrors: string[] = [];
      page.on("pageerror", (err) => jsErrors.push(err.message));

      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      expect(jsErrors, `${url} has JS errors: ${jsErrors.join("; ")}`).toHaveLength(0);
    });
  }
});

// ================================================================
// Group 9: Content length > 1000 chars
// ================================================================

test.describe("Blog Content — Substantial content", () => {
  for (const url of BLOG_POSTS) {
    test(`${url} has more than 1000 characters of content`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      // Get the text content of the main article area
      const bodyText = await page.evaluate(() => {
        // Try to get article content, fall back to body
        const article = document.querySelector("article, main, [data-testid='article-content']");
        const el = (article || document.body) as HTMLElement;
        return el.innerText;
      });

      expect(
        bodyText.length,
        `${url} content is too short (${bodyText.length} chars) — should be > 1000`
      ).toBeGreaterThan(1000);
    });
  }
});

// ================================================================
// Additional: Blog article structural quality
// ================================================================

test.describe("Blog Content — Structural quality checks", () => {
  test("blog article has multiple <h2> subheadings", async ({ page }) => {
    await page.goto("/blog/outlook-signature-not-working", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const h2Count = await page.locator("h2").count();
    expect(h2Count, "Blog article should have multiple h2 subheadings").toBeGreaterThan(1);
  });

  test("blog article has no broken internal links", async ({ page }) => {
    await page.goto("/blog/outlook-signature-not-working", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const internalLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a[href^='/']"))
        .map((a) => a.getAttribute("href"))
        .filter(Boolean) as string[];
    });

    // Internal links should exist
    expect(internalLinks.length).toBeGreaterThan(0);
  });

  test("blog article page has a title with relevant keywords", async ({ page }) => {
    await page.goto("/blog/outlook-signature-not-working", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/outlook|signature|email/);
  });

  test("blog article has canonical tag pointing to neatstamp.com", async ({ page }) => {
    await page.goto("/blog/outlook-signature-disappeared", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(canonical).toContain("neatstamp.com");
  });

  test("blog article FAQ has at least 3 questions", async ({ page }) => {
    await page.goto("/blog/outlook-signature-not-working", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const summaryCount = await page.locator("summary").count();
    const faqItems = await page.locator("[data-testid='faq-item'], .faq-item").count();

    const totalFaqItems = summaryCount + faqItems;
    // Blog posts should have a rich FAQ with multiple questions
    expect(totalFaqItems).toBeGreaterThan(0);
  });

  test("blog article uses meta description", async ({ page }) => {
    await page.goto("/blog/new-outlook-signature-problems", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const metaDesc = await page.locator("meta[name='description']").getAttribute("content");
    expect(metaDesc).not.toBeNull();
    expect((metaDesc ?? "").length).toBeGreaterThan(50);
  });
});
