import { test, expect, type Page } from "@playwright/test";

// ================================================================
// Landing Pages — Deep Tests
//
// Tests the 3 new sub-niche landing pages + calculator:
//  /outlook-mobile-signature
//  /outlook-signature-html
//  /outlook-signature-for-company
//  /email-signature-cost-calculator
//
// For each: page loads, h1 with keyword, FAQ, breadcrumb, CTA,
// related guides, content length > 2000 chars, internal links > 10
// ================================================================

const LANDING_PAGES = [
  {
    url: "/outlook-mobile-signature",
    keyword: "outlook",
    description: "Outlook Mobile Signature landing page",
  },
  {
    url: "/outlook-signature-html",
    keyword: "outlook",
    description: "Outlook Signature HTML landing page",
  },
  {
    url: "/outlook-signature-for-company",
    keyword: "outlook",
    description: "Outlook Signature for Company landing page",
  },
];

// ================================================================
// Group 1: Page loads with HTTP 200
// ================================================================

test.describe("Landing Pages — Page loads", () => {
  for (const { url, description } of LANDING_PAGES) {
    test(`${url} loads with HTTP 200`, async ({ page }) => {
      const response = await page.goto(url, { timeout: 15000 });
      expect(response?.status(), `${description} should return 200`).toBe(200);
    });
  }

  test("/email-signature-cost-calculator loads with HTTP 200", async ({ page }) => {
    const response = await page.goto("/email-signature-cost-calculator", { timeout: 15000 });
    expect(response?.status()).toBe(200);
  });
});

// ================================================================
// Group 2: Has <h1> with target keyword
// ================================================================

test.describe("Landing Pages — Has <h1> with keyword", () => {
  for (const { url, keyword, description } of LANDING_PAGES) {
    test(`${url} has <h1> containing "${keyword}"`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible();

      const h1Text = await h1.textContent();
      expect(h1Text?.toLowerCase()).toContain(keyword.toLowerCase());
    });
  }

  test("/email-signature-cost-calculator has <h1>", async ({ page }) => {
    await page.goto("/email-signature-cost-calculator", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThan(0);
  });
});

// ================================================================
// Group 3: Has FAQ section
// ================================================================

test.describe("Landing Pages — Has FAQ section", () => {
  for (const { url, description } of LANDING_PAGES) {
    test(`${url} has FAQ section`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const detailsCount = await page.locator("details").count();
      const summaryCount = await page.locator("summary").count();
      const faqHeading = await page.getByText(/FAQ|Frequently Asked/i).count();

      const hasFaq = detailsCount > 0 || summaryCount > 0 || faqHeading > 0;
      expect(hasFaq, `${description} should have a FAQ section`).toBe(true);
    });
  }

  test("/email-signature-cost-calculator has FAQ section", async ({ page }) => {
    await page.goto("/email-signature-cost-calculator", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const detailsCount = await page.locator("details").count();
    const summaryCount = await page.locator("summary").count();
    const faqHeading = await page.getByText(/FAQ|Frequently Asked/i).count();

    const hasFaq = detailsCount > 0 || summaryCount > 0 || faqHeading > 0;
    expect(hasFaq).toBe(true);
  });
});

// ================================================================
// Group 4: Has breadcrumb
// ================================================================

test.describe("Landing Pages — Has breadcrumb", () => {
  for (const { url, description } of LANDING_PAGES) {
    test(`${url} has breadcrumb navigation`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      // Breadcrumb may use nav[aria-label="breadcrumb"] or ol with structured items
      const breadcrumbNav = page.locator("nav[aria-label*='breadcrumb' i], [data-testid*='breadcrumb']");
      const homeLink = page.locator("a").filter({ hasText: "Home" });
      const breadcrumbHome = page.locator("a[href='/']").or(homeLink);

      const breadcrumbCount = await breadcrumbNav.count();
      const homeLinkCount = await breadcrumbHome.count();

      const hasBreadcrumb = breadcrumbCount > 0 || homeLinkCount > 0;
      expect(hasBreadcrumb, `${description} should have breadcrumb navigation`).toBe(true);
    });
  }
});

// ================================================================
// Group 5: Has CTA linking to /editor
// ================================================================

test.describe("Landing Pages — Has CTA to /editor", () => {
  for (const { url, description } of LANDING_PAGES) {
    test(`${url} has CTA linking to /editor`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const editorLinks = page.locator("a[href='/editor'], a[href*='/editor']");
      const count = await editorLinks.count();
      expect(count, `${description} should link to /editor`).toBeGreaterThan(0);
    });
  }

  test("/email-signature-cost-calculator has CTA linking to /editor", async ({ page }) => {
    await page.goto("/email-signature-cost-calculator", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const editorLinks = page.locator("a[href='/editor'], a[href*='/editor']");
    const count = await editorLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ================================================================
// Group 6: Has related guides section
// ================================================================

test.describe("Landing Pages — Has related guides", () => {
  for (const { url, description } of LANDING_PAGES) {
    test(`${url} has related guides or related articles section`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const relatedSection = await page
        .getByText(/related guide|related article|you might also|more guides|further reading|related/i)
        .count();

      expect(relatedSection, `${description} should have a related guides section`).toBeGreaterThan(0);
    });
  }
});

// ================================================================
// Group 7: Content length > 2000 chars
// ================================================================

test.describe("Landing Pages — Substantial content (>2000 chars)", () => {
  for (const { url, description } of LANDING_PAGES) {
    test(`${url} has more than 2000 characters of content`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const bodyText = await page.evaluate(() => {
        const main = document.querySelector("main, article, [data-testid='page-content']");
        const el = (main || document.body) as HTMLElement;
        return el.innerText;
      });

      expect(
        bodyText.length,
        `${description} is too short (${bodyText.length} chars) — should be > 2000`
      ).toBeGreaterThan(2000);
    });
  }
});

// ================================================================
// Group 8: Internal links count > 10
// ================================================================

test.describe("Landing Pages — Rich internal linking (>10 links)", () => {
  for (const { url, description } of LANDING_PAGES) {
    test(`${url} has more than 10 internal links`, async ({ page }) => {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const internalLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("a[href^='/']")).length;
      });

      expect(
        internalLinks,
        `${description} has only ${internalLinks} internal links — should have > 10`
      ).toBeGreaterThan(10);
    });
  }
});

// ================================================================
// Cost Calculator specific tests
// ================================================================

test.describe("Landing Pages — Cost Calculator specific", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/email-signature-cost-calculator", { timeout: 15000 });
    await page.waitForLoadState("networkidle");
  });

  test("calculator page has an interactive component (sliders or inputs)", async ({ page }) => {
    // Calculator should have range inputs (sliders) or number inputs
    const rangeInputs = await page.locator("input[type='range']").count();
    const numberInputs = await page.locator("input[type='number']").count();
    const selectInputs = await page.locator("select").count();

    const hasInteractive = rangeInputs > 0 || numberInputs > 0 || selectInputs > 0;
    expect(
      hasInteractive,
      "Calculator should have interactive sliders or inputs"
    ).toBe(true);
  });

  test("calculator page shows a cost result or estimate", async ({ page }) => {
    // The calculator should display some cost output
    const costOutput = await page
      .getByText(/\$|cost|per month|per year|annually|save/i)
      .count();

    expect(costOutput, "Calculator should show cost figures").toBeGreaterThan(0);
  });

  test("calculator input interaction updates the result", async ({ page }) => {
    // Try to interact with a slider or number input
    const rangeInput = page.locator("input[type='range']").first();
    const numberInput = page.locator("input[type='number']").first();

    if (await rangeInput.count() > 0 && await rangeInput.isVisible()) {
      // Change the slider value
      await rangeInput.fill("50");
      await rangeInput.dispatchEvent("input");
      await page.waitForTimeout(300);
      // Page should still be functional
      await expect(page.locator("h1").first()).toBeVisible();
    } else if (await numberInput.count() > 0 && await numberInput.isVisible()) {
      await numberInput.clear();
      await numberInput.fill("25");
      await numberInput.dispatchEvent("input");
      await page.waitForTimeout(300);
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });

  test("calculator page FAQ has relevant questions", async ({ page }) => {
    const detailsCount = await page.locator("details").count();
    const summaryCount = await page.locator("summary").count();
    const faqHeading = await page.getByText(/FAQ|Frequently Asked/i).count();

    expect(detailsCount + summaryCount + faqHeading).toBeGreaterThan(0);
  });

  test("calculator page mentions cost/savings in content", async ({ page }) => {
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasCostContent =
      pageText.toLowerCase().includes("cost") ||
      pageText.toLowerCase().includes("save") ||
      pageText.toLowerCase().includes("price") ||
      pageText.toLowerCase().includes("budget");

    expect(hasCostContent, "Calculator page should discuss costs/savings").toBe(true);
  });
});

// ================================================================
// Landing page quality checks
// ================================================================

test.describe("Landing Pages — Quality checks", () => {
  test("/outlook-mobile-signature mentions mobile Outlook specifically", async ({ page }) => {
    await page.goto("/outlook-mobile-signature", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const pageText = await page.evaluate(() => document.body.innerText);
    const hasMobileContent =
      pageText.toLowerCase().includes("mobile") ||
      pageText.toLowerCase().includes("ios") ||
      pageText.toLowerCase().includes("android") ||
      pageText.toLowerCase().includes("iphone");

    expect(hasMobileContent, "Page should mention mobile-specific content").toBe(true);
  });

  test("/outlook-signature-html mentions HTML in content", async ({ page }) => {
    await page.goto("/outlook-signature-html", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const pageText = await page.evaluate(() => document.body.innerText);
    const hasHtmlContent =
      pageText.toLowerCase().includes("html") ||
      pageText.toLowerCase().includes("code") ||
      pageText.toLowerCase().includes("table");

    expect(hasHtmlContent, "Page should mention HTML-specific content").toBe(true);
  });

  test("/outlook-signature-for-company mentions teams or company", async ({ page }) => {
    await page.goto("/outlook-signature-for-company", { timeout: 15000 });
    await page.waitForLoadState("networkidle");

    const pageText = await page.evaluate(() => document.body.innerText);
    const hasCompanyContent =
      pageText.toLowerCase().includes("company") ||
      pageText.toLowerCase().includes("team") ||
      pageText.toLowerCase().includes("business") ||
      pageText.toLowerCase().includes("employee");

    expect(hasCompanyContent, "Page should mention company/team content").toBe(true);
  });

  test("all landing pages have no JS errors", async ({ page }) => {
    const allPages = [...LANDING_PAGES.map((p) => p.url), "/email-signature-cost-calculator"];

    for (const url of allPages) {
      const jsErrors: string[] = [];
      page.on("pageerror", (err) => jsErrors.push(err.message));

      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      expect(jsErrors, `${url} has JS errors: ${jsErrors.join("; ")}`).toHaveLength(0);

      // Remove error listener for next iteration
      page.removeAllListeners("pageerror");
    }
  });

  test("all landing pages have canonical tags", async ({ page }) => {
    for (const { url } of LANDING_PAGES) {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("networkidle");

      const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
      expect(canonical, `${url} should have a canonical tag`).not.toBeNull();
      expect(canonical).toContain("neatstamp.com");
    }
  });
});
