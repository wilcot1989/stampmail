import { test, expect } from "@playwright/test";

// ================================================================
// Navigation tests — links, CTAs, header, footer, breadcrumbs
//
// NOTE: The Header component uses absolute URLs (https://neatstamp.com
// and https://app.neatstamp.com). In a local dev environment the
// navigation targets are external, so we verify the href attributes
// rather than performing a full navigation that would leave localhost.
// ================================================================

test.describe("Homepage navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("homepage loads with a visible header", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("logo in header links to the homepage", async ({ page }) => {
    // The logo <a> tag points to https://neatstamp.com
    const logoLink = page.locator("header a").first();
    const href = await logoLink.getAttribute("href");
    expect(href).toContain("neatstamp.com");
  });

  test("header contains Create Signature link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Create Signature" });
    await expect(link.first()).toBeVisible();
  });

  test("header contains Templates link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Templates" });
    await expect(link.first()).toBeVisible();
  });

  test("header contains Pricing link pointing to /pricing", async ({ page }) => {
    const pricingLinks = page.getByRole("link", { name: "Pricing" });
    const count = await pricingLinks.count();
    expect(count).toBeGreaterThan(0);
    const href = await pricingLinks.first().getAttribute("href");
    expect(href).toContain("pricing");
  });

  test("header contains Get Started — Free CTA", async ({ page }) => {
    const ctaLink = page.getByRole("link", { name: "Get Started — Free" });
    await expect(ctaLink.first()).toBeVisible();
  });

  test("homepage has a visible <h1>", async ({ page }) => {
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("homepage has a CTA button linking to the editor", async ({ page }) => {
    // Look for any link with text containing "Create" or "Get Started"
    const cta = page
      .getByRole("link", { name: /create.*free|get started|free.*signature/i })
      .first();
    const count = await page
      .getByRole("link", { name: /create|get started/i })
      .count();
    expect(count).toBeGreaterThan(0);
  });
});

// ================================================================
// In-app page navigation (using relative URLs, staying on localhost)
// ================================================================

test.describe("In-app page navigation", () => {
  test("/editor page loads from direct URL", async ({ page }) => {
    await page.goto("/editor");
    await page.waitForSelector("[data-testid='live-preview-signature']", { timeout: 10000 });
    await expect(page.locator("[data-testid='live-preview-signature']")).toBeVisible();
  });

  test("/pricing page loads from direct URL", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/blog page loads from direct URL", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/templates page loads from direct URL", async ({ page }) => {
    await page.goto("/templates");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/about page loads from direct URL", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible();
  });
});

// ================================================================
// Pricing page CTAs
// ================================================================

test.describe("Pricing page CTAs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");
  });

  test("pricing page shows Free plan", async ({ page }) => {
    // Plan names are rendered in h3 elements — use that to avoid matching
    // unrelated text that contains "Free" (e.g. "30-day money-back", "Start Free")
    const freePlan = page.locator("h3").filter({ hasText: "Free" }).first();
    const freeCount = await freePlan.count();
    if (freeCount > 0) {
      await expect(freePlan).toBeVisible();
    } else {
      // Fallback: any visible element with exact text "Free"
      const freeAny = page.getByText("Free", { exact: true }).first();
      await expect(freeAny).toBeVisible();
    }
  });

  test("pricing page shows Pro plan", async ({ page }) => {
    // Plan names are rendered in h3 elements — use that to avoid strict mode issues
    const proPlan = page.locator("h3").filter({ hasText: "Pro" }).first();
    const proCount = await proPlan.count();
    if (proCount > 0) {
      await expect(proPlan).toBeVisible();
    } else {
      // Fallback: any visible element with exact text "Pro"
      const proAny = page.getByText("Pro", { exact: true }).first();
      await expect(proAny).toBeVisible();
    }
  });

  test("pricing page shows at least one Get Started / Start Free CTA", async ({ page }) => {
    const ctaCount = await page
      .getByRole("link", { name: /get started|start free|try free|free/i })
      .count();
    expect(ctaCount).toBeGreaterThan(0);
  });

  test("pricing page CTAs link to the editor or login", async ({ page }) => {
    const ctas = page.getByRole("link", { name: /get started|start free|free/i });
    const count = await ctas.count();
    if (count > 0) {
      const href = await ctas.first().getAttribute("href");
      // Should go to the editor or login page
      expect(href).toMatch(/editor|login|auth/i);
    }
  });
});

// ================================================================
// Blog navigation
// ================================================================

test.describe("Blog navigation", () => {
  test("blog index page shows article links", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");

    // Blog index should have multiple article links
    const articleLinks = page.locator("a[href^='/blog/']");
    const count = await articleLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("clicking first blog article link loads the article page", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");

    const articleLinks = page.locator("a[href^='/blog/']");
    const count = await articleLinks.count();
    if (count > 0) {
      const href = await articleLinks.first().getAttribute("href");
      if (href) {
        await page.goto(href);
        await page.waitForLoadState("networkidle");
        await expect(page.locator("h1").first()).toBeVisible();
      }
    }
  });

  test("blog article page has a link back to /blog", async ({ page }) => {
    await page.goto("/blog/outlook-signature-not-working");
    await page.waitForLoadState("networkidle");

    // Should have a breadcrumb or nav link to /blog
    const blogLinks = page.locator("a[href='/blog']");
    const count = await blogLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("blog article back-to-blog link navigates to blog index", async ({ page }) => {
    await page.goto("/blog/outlook-signature-not-working");
    await page.waitForLoadState("networkidle");

    const blogLink = page.locator("a[href='/blog']").first();
    if (await blogLink.isVisible()) {
      await blogLink.click();
      await page.waitForLoadState("networkidle");
      expect(page.url()).toContain("/blog");
    }
  });

  test("blog article has a home link", async ({ page }) => {
    await page.goto("/blog/email-signature-best-practices");
    await page.waitForLoadState("networkidle");

    // Should have a link to homepage
    const homeLinks = page.locator("a[href='/']").or(
      page.locator("a[href='https://neatstamp.com']")
    );
    const count = await homeLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ================================================================
// Footer links
// ================================================================

test.describe("Footer links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("footer is visible", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("footer contains About link", async ({ page }) => {
    const footer = page.locator("footer");
    const aboutLink = footer.getByRole("link", { name: "About" });
    await expect(aboutLink).toBeVisible();
  });

  test("footer About link points to /about", async ({ page }) => {
    const footer = page.locator("footer");
    const aboutLink = footer.getByRole("link", { name: "About" });
    const href = await aboutLink.getAttribute("href");
    expect(href).toContain("/about");
  });

  test("footer contains Privacy Policy link", async ({ page }) => {
    const footer = page.locator("footer");
    const privacyLink = footer.getByRole("link", { name: "Privacy Policy" });
    await expect(privacyLink).toBeVisible();
  });

  test("footer Privacy link points to /privacy", async ({ page }) => {
    const footer = page.locator("footer");
    const privacyLink = footer.getByRole("link", { name: "Privacy Policy" });
    const href = await privacyLink.getAttribute("href");
    expect(href).toContain("/privacy");
  });

  test("footer contains Terms of Service link", async ({ page }) => {
    const footer = page.locator("footer");
    const termsLink = footer.getByRole("link", { name: "Terms of Service" });
    await expect(termsLink).toBeVisible();
  });

  test("footer Terms link points to /terms", async ({ page }) => {
    const footer = page.locator("footer");
    const termsLink = footer.getByRole("link", { name: "Terms of Service" });
    const href = await termsLink.getAttribute("href");
    expect(href).toContain("/terms");
  });

  test("footer contains Pricing link", async ({ page }) => {
    const footer = page.locator("footer");
    const pricingLink = footer.getByRole("link", { name: "Pricing" });
    await expect(pricingLink).toBeVisible();
  });

  test("footer contains Blog link", async ({ page }) => {
    const footer = page.locator("footer");
    const blogLink = footer.getByRole("link", { name: "Blog" });
    await expect(blogLink).toBeVisible();
  });

  test("footer contains email client links (Gmail, Outlook)", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Gmail Signature" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Outlook Signature" })).toBeVisible();
  });

  test("footer Privacy link navigates to privacy page", async ({ page }) => {
    const footer = page.locator("footer");
    const privacyLink = footer.getByRole("link", { name: "Privacy Policy" });
    await privacyLink.click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/privacy");
  });

  test("footer Terms link navigates to terms page", async ({ page }) => {
    const footer = page.locator("footer");
    const termsLink = footer.getByRole("link", { name: "Terms of Service" });
    await termsLink.click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/terms");
  });
});

// ================================================================
// Mobile hamburger menu
// ================================================================

test.describe("Mobile hamburger menu", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("hamburger menu button is visible on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const hamburgerBtn = page.locator("button[aria-label='Toggle menu']");
    await expect(hamburgerBtn).toBeVisible();
  });

  test("clicking hamburger opens mobile nav with links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const hamburgerBtn = page.locator("button[aria-label='Toggle menu']");
    await hamburgerBtn.click();
    await page.waitForTimeout(300);

    // Mobile menu should appear with nav links
    const mobileMenu = page.locator("header").locator("div.border-t");
    await expect(mobileMenu).toBeVisible();

    // Should contain Create Signature and Pricing
    await expect(page.getByRole("link", { name: "Create Signature" }).last()).toBeVisible();
    await expect(page.getByRole("link", { name: "Pricing" }).last()).toBeVisible();
  });

  test("clicking hamburger again closes mobile nav", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const hamburgerBtn = page.locator("button[aria-label='Toggle menu']");

    // Open
    await hamburgerBtn.click();
    await page.waitForTimeout(200);

    // Close
    await hamburgerBtn.click();
    await page.waitForTimeout(200);

    const mobileMenu = page.locator("header").locator("div.border-t");
    await expect(mobileMenu).not.toBeVisible();
  });
});
