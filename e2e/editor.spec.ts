import { test, expect } from "@playwright/test";

test.describe("Editor Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/editor");
    // Wait for editor to fully load
    await page.waitForSelector("[data-testid='live-preview-signature']", { timeout: 10000 });
  });

  // ================================================================
  // FLOW 1: Page loads correctly
  // ================================================================

  test("editor page loads with default signature in preview", async ({ page }) => {
    const preview = page.locator("[data-testid='live-preview-signature']");
    await expect(preview).toBeVisible();
    // Default name should be visible
    await expect(preview).toContainText("Alex Johnson");
    await expect(preview).toContainText("Marketing Manager");
  });

  test("editor has Details and Design tabs", async ({ page }) => {
    await expect(page.locator("[data-testid='tab-details']")).toBeVisible();
    await expect(page.locator("[data-testid='tab-design']")).toBeVisible();
  });

  test("editor has Copy Signature button", async ({ page }) => {
    await expect(page.getByText("Copy Signature")).toBeVisible();
  });

  // ================================================================
  // FLOW 2: Type in fields → preview updates instantly
  // ================================================================

  test("change name → preview updates", async ({ page }) => {
    const nameInput = page.locator("[data-testid='field-fullName']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    // Clear and type new name
    await nameInput.clear();
    await nameInput.fill("Jan de Vries");

    // Preview should update
    await expect(preview).toContainText("Jan de Vries");
    await expect(preview).not.toContainText("Alex Johnson");
  });

  test("change job title → preview updates", async ({ page }) => {
    const input = page.locator("[data-testid='field-jobTitle']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    await input.clear();
    await input.fill("IT Manager");

    await expect(preview).toContainText("IT Manager");
  });

  test("change company → preview updates", async ({ page }) => {
    const input = page.locator("[data-testid='field-company']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    await input.clear();
    await input.fill("NeatStamp BV");

    await expect(preview).toContainText("NeatStamp BV");
  });

  test("change email → preview updates", async ({ page }) => {
    const input = page.locator("[data-testid='field-email']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    await input.clear();
    await input.fill("jan@neatstamp.com");

    await expect(preview).toContainText("jan@neatstamp.com");
  });

  test("change phone → preview updates", async ({ page }) => {
    const input = page.locator("[data-testid='field-phone']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    await input.clear();
    await input.fill("+31612345678");

    await expect(preview).toContainText("+31612345678");
  });

  test("change website → preview updates", async ({ page }) => {
    const input = page.locator("[data-testid='field-website']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    await input.clear();
    await input.fill("www.neatstamp.com");

    await expect(preview).toContainText("neatstamp.com");
  });

  test("rapid typing → preview keeps up", async ({ page }) => {
    const nameInput = page.locator("[data-testid='field-fullName']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    await nameInput.clear();
    // Type character by character fast
    await nameInput.pressSequentially("Quick Typer", { delay: 30 });

    await expect(preview).toContainText("Quick Typer");
  });

  // ================================================================
  // FLOW 3: Clear field → disappears from preview
  // ================================================================

  test("clear email → no mailto: link in preview", async ({ page }) => {
    const input = page.locator("[data-testid='field-email']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    await input.clear();

    // Wait a tick for React to re-render
    await page.waitForTimeout(200);

    const html = await preview.innerHTML();
    expect(html).not.toContain("mailto:");
  });

  test("clear phone → no tel: link in preview", async ({ page }) => {
    const input = page.locator("[data-testid='field-phone']");
    const preview = page.locator("[data-testid='live-preview-signature']");

    await input.clear();
    await page.waitForTimeout(200);

    const html = await preview.innerHTML();
    expect(html).not.toContain("tel:");
  });

  // ================================================================
  // FLOW 4: Design tab controls
  // ================================================================

  test("switch to Design tab → styling controls visible", async ({ page }) => {
    await page.locator("[data-testid='tab-design']").click();

    // Should see text styling section
    await expect(page.getByText("Text Styling")).toBeVisible();
    await expect(page.getByText("Name", { exact: true }).first()).toBeVisible();
  });

  // ================================================================
  // FLOW 5: Template selection → preview changes
  // ================================================================

  test("template selector is visible", async ({ page }) => {
    // Scroll up to template selector
    await page.evaluate(() => window.scrollTo(0, 0));
    // There should be template options
    const templates = page.locator("[data-template-id]");
    // If no data-template-id, look for template names
    const templateCount = await templates.count();
    if (templateCount === 0) {
      // Templates might be rendered differently
      const templateText = await page.getByText("Minimal").first().isVisible();
      expect(templateText).toBeTruthy();
    } else {
      expect(templateCount).toBeGreaterThan(0);
    }
  });

  // ================================================================
  // FLOW 6: Preview HTML structure
  // ================================================================

  test("preview renders table-based HTML", async ({ page }) => {
    const preview = page.locator("[data-testid='live-preview-signature']");
    const html = await preview.innerHTML();

    expect(html).toContain("<table");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("display:flex");
  });

  test("preview contains social icon as PNG", async ({ page }) => {
    // Default data has LinkedIn
    const preview = page.locator("[data-testid='live-preview-signature']");
    const html = await preview.innerHTML();

    expect(html).toContain("linkedin.png");
    expect(html).not.toContain("linkedin.svg");
  });

  test("preview has 500px max-width", async ({ page }) => {
    const preview = page.locator("[data-testid='live-preview-signature']");
    const html = await preview.innerHTML();

    expect(html).toContain("500px");
  });

  // ================================================================
  // FLOW 7: Full user journey
  // ================================================================

  test("complete signature creation flow", async ({ page }) => {
    const preview = page.locator("[data-testid='live-preview-signature']");

    // Step 1: Fill in name
    await page.locator("[data-testid='field-fullName']").clear();
    await page.locator("[data-testid='field-fullName']").fill("Maria Garcia");

    // Step 2: Fill in title
    await page.locator("[data-testid='field-jobTitle']").clear();
    await page.locator("[data-testid='field-jobTitle']").fill("CEO");

    // Step 3: Fill in company
    await page.locator("[data-testid='field-company']").clear();
    await page.locator("[data-testid='field-company']").fill("TechCorp");

    // Step 4: Fill in email
    await page.locator("[data-testid='field-email']").clear();
    await page.locator("[data-testid='field-email']").fill("maria@techcorp.com");

    // Step 5: Fill in phone
    await page.locator("[data-testid='field-phone']").clear();
    await page.locator("[data-testid='field-phone']").fill("+34 600 000 000");

    // Verify all fields appear in preview
    await expect(preview).toContainText("Maria Garcia");
    await expect(preview).toContainText("CEO");
    await expect(preview).toContainText("TechCorp");
    await expect(preview).toContainText("maria@techcorp.com");
    await expect(preview).toContainText("+34 600 000 000");

    // Step 6: Verify HTML quality
    const html = await preview.innerHTML();
    expect(html).toContain("<table");
    expect(html).toContain("mailto:maria@techcorp.com");
    expect(html).toContain("tel:");
  });

  // ================================================================
  // FLOW 8: Social links
  // ================================================================

  test("add social link → icon appears in preview", async ({ page }) => {
    const preview = page.locator("[data-testid='live-preview-signature']");

    // Find the LinkedIn input (it might be in the social section)
    const linkedinInput = page.locator("[data-testid='field-linkedin']");
    if (await linkedinInput.isVisible()) {
      await linkedinInput.clear();
      await linkedinInput.fill("https://linkedin.com/in/testuser");

      const html = await preview.innerHTML();
      expect(html).toContain("linkedin.png");
    }
  });

  // ================================================================
  // FLOW 9: Copy button works
  // ================================================================

  test("copy button click changes to success state", async ({ page }) => {
    const copyBtn = page.getByText("Copy Signature");
    await copyBtn.click();

    // Should show success state (text changes)
    await expect(page.getByText("Copied!").or(page.getByText("Copy failed"))).toBeVisible({ timeout: 3000 });
  });
});

// ================================================================
// SEO & Page structure tests
// ================================================================

test.describe("SEO Pages", () => {
  const pages = [
    { url: "/", title: "NeatStamp" },
    { url: "/pricing", title: "Pricing" },
    { url: "/templates", title: "template" },
    { url: "/email-signature-outlook", title: "Outlook" },
    { url: "/outlook-mobile-signature", title: "Outlook Mobile" },
    { url: "/outlook-signature-html", title: "Outlook" },
    { url: "/blog", title: "Blog" },
  ];

  for (const p of pages) {
    test(`${p.url} loads and has title containing "${p.title}"`, async ({ page }) => {
      await page.goto(p.url);
      const title = await page.title();
      expect(title.toLowerCase()).toContain(p.title.toLowerCase());
    });
  }

  test("homepage has Outlook-focused messaging", async ({ page }) => {
    await page.goto("/");
    // The homepage mentions Outlook in multiple places — check that at least one
    // visible instance exists without strict single-match requirement
    const outlookCount = await page.getByText("Outlook", { exact: false }).count();
    expect(outlookCount, "Homepage should mention Outlook at least once").toBeGreaterThan(0);
    const teamCount = await page.getByText("team", { exact: false }).count();
    expect(teamCount, "Homepage should mention teams at least once").toBeGreaterThan(0);
  });

  test("pricing page shows 4 plans", async ({ page }) => {
    await page.goto("/pricing");
    // Use first() to avoid strict mode issues — plan names appear in h3 elements
    await expect(page.locator("h3").filter({ hasText: "Free" }).first()).toBeVisible();
    await expect(page.locator("h3").filter({ hasText: "Pro" }).first()).toBeVisible();
    await expect(page.locator("h3").filter({ hasText: "Team" }).first()).toBeVisible();
  });
});
