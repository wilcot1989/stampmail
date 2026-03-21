import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://neatstamp.com";
  const now = new Date().toISOString();

  const pages: { url: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    // Core
    { url: "", priority: 1.0, changeFrequency: "weekly" },
    { url: "/editor", priority: 0.9, changeFrequency: "weekly" },
    { url: "/templates", priority: 0.8, changeFrequency: "monthly" },
    { url: "/examples", priority: 0.8, changeFrequency: "monthly" },
    { url: "/pricing", priority: 0.7, changeFrequency: "monthly" },

    // Email client pages
    { url: "/email-signature-gmail", priority: 0.9, changeFrequency: "monthly" },
    { url: "/email-signature-outlook", priority: 0.9, changeFrequency: "monthly" },
    { url: "/email-signature-apple-mail", priority: 0.7, changeFrequency: "monthly" },
    { url: "/email-signature-yahoo", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-outlook-365", priority: 0.7, changeFrequency: "monthly" },

    // Feature pages
    { url: "/email-signature-maker", priority: 0.8, changeFrequency: "monthly" },
    { url: "/professional-email-signature", priority: 0.8, changeFrequency: "monthly" },
    { url: "/email-signature-with-logo", priority: 0.8, changeFrequency: "monthly" },
    { url: "/email-signature-design", priority: 0.7, changeFrequency: "monthly" },
    { url: "/html-email-signature", priority: 0.7, changeFrequency: "monthly" },
    { url: "/best-email-signature-generator", priority: 0.8, changeFrequency: "monthly" },
    { url: "/ai-email-signature-generator", priority: 0.7, changeFrequency: "monthly" },
    { url: "/email-signature-examples-with-logo", priority: 0.7, changeFrequency: "monthly" },
    { url: "/email-signature-with-pronouns", priority: 0.7, changeFrequency: "monthly" },
    { url: "/email-signature-quotes", priority: 0.7, changeFrequency: "monthly" },
    { url: "/email-signature-disclaimer", priority: 0.7, changeFrequency: "monthly" },

    // Use case pages
    { url: "/email-signature-for-business", priority: 0.7, changeFrequency: "monthly" },
    { url: "/email-signature-for-freelancers", priority: 0.7, changeFrequency: "monthly" },
    { url: "/email-signature-for-students", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-real-estate", priority: 0.6, changeFrequency: "monthly" },
    { url: "/small-business-email-signature", priority: 0.7, changeFrequency: "monthly" },

    // Profession pages
    { url: "/email-signature-for-lawyer", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-doctor", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-teacher", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-nurse", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-ceo", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-designer", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-developer", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-consultant", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-photographer", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-job-seekers", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-accountant", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-engineer", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-hr", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-startup", priority: 0.6, changeFrequency: "monthly" },
    { url: "/email-signature-for-sales", priority: 0.7, changeFrequency: "monthly" },
    { url: "/email-signature-for-musician", priority: 0.5, changeFrequency: "monthly" },

    // Strategic pages (from competitive analysis)
    { url: "/email-signature-dark-mode-compatible", priority: 0.8, changeFrequency: "monthly" },
    { url: "/email-signature-outlook-compatible", priority: 0.9, changeFrequency: "monthly" },
    { url: "/email-signature-mobile-friendly", priority: 0.8, changeFrequency: "monthly" },
    { url: "/email-signature-deliverability", priority: 0.8, changeFrequency: "monthly" },
    { url: "/email-signature-for-teams", priority: 0.8, changeFrequency: "monthly" },

    // Sub-niche: Outlook + Teams + Mobile (NEW)
    { url: "/outlook-mobile-signature", priority: 0.9, changeFrequency: "monthly" },
    { url: "/outlook-signature-html", priority: 0.9, changeFrequency: "monthly" },
    { url: "/outlook-signature-for-company", priority: 0.8, changeFrequency: "monthly" },
    { url: "/email-signature-cost-calculator", priority: 0.7, changeFrequency: "monthly" },

    // Seasonal
    { url: "/christmas-email-signature", priority: 0.6, changeFrequency: "monthly" },
    { url: "/holiday-email-signature", priority: 0.6, changeFrequency: "monthly" },
    { url: "/new-year-email-signature", priority: 0.6, changeFrequency: "monthly" },

    // Alternative pages
    { url: "/alternative-to-wisestamp", priority: 0.7, changeFrequency: "monthly" },
    { url: "/alternative-to-mysignature", priority: 0.7, changeFrequency: "monthly" },
    { url: "/alternative-to-exclaimer", priority: 0.7, changeFrequency: "monthly" },
    { url: "/alternative-to-signaturely", priority: 0.6, changeFrequency: "monthly" },
    { url: "/alternative-to-hubspot-signature", priority: 0.6, changeFrequency: "monthly" },
    { url: "/alternative-to-newoldstamp", priority: 0.6, changeFrequency: "monthly" },
    { url: "/alternative-to-canva-signature", priority: 0.6, changeFrequency: "monthly" },
    { url: "/alternative-to-codetwo", priority: 0.6, changeFrequency: "monthly" },
    { url: "/alternative-to-letsignit", priority: 0.5, changeFrequency: "monthly" },
    { url: "/alternative-to-gimmio", priority: 0.5, changeFrequency: "monthly" },
    { url: "/alternative-to-rocketseed", priority: 0.5, changeFrequency: "monthly" },

    // Blog
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { url: "/blog/email-signature-best-practices", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-size", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/outlook-signature-not-working", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/how-to-add-social-media-icons-email-signature", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-generator-comparison", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-not-showing-outlook", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-images-not-displaying", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/gmail-signature-not-working", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-keeps-disappearing", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-etiquette", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/best-email-sign-offs", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-on-phone", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-personal-email", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-dark-mode", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/what-to-include-email-signature", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-with-credentials", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-animated-gif", priority: 0.5, changeFrequency: "monthly" },
    { url: "/blog/email-signature-banner-ideas", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-for-interns", priority: 0.5, changeFrequency: "monthly" },
    { url: "/blog/email-signature-marketing", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/how-many-lines-email-signature", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-when-leaving-job", priority: 0.5, changeFrequency: "monthly" },
    { url: "/blog/email-signature-remote-workers", priority: 0.5, changeFrequency: "monthly" },
    { url: "/blog/email-signature-trends-2026", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-spam-filter-fix", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-company-wide-management", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-ab-testing-guide", priority: 0.5, changeFrequency: "monthly" },
    { url: "/blog/email-signature-roi-calculator", priority: 0.5, changeFrequency: "monthly" },
    { url: "/blog/email-signature-qr-code-guide", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-chrome-extension-guide", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/cancel-wisestamp-subscription", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-onboarding-employees", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-gdpr-compliance", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-deliverability-guide", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/how-to-create-email-signature", priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog/email-signature-examples-2026", priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog/outlook-signature-template-guide", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/free-email-signature-template", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/gmail-signature-template-guide", priority: 0.7, changeFrequency: "monthly" },

    // Sub-niche blogs: Outlook + Teams + Mobile (NEW)
    { url: "/blog/outlook-signature-disappeared", priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog/outlook-roaming-signatures", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/outlook-signature-not-saving", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/outlook-365-signature-setup", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/outlook-signature-multiple-accounts", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/microsoft-365-email-signature-management", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/new-outlook-signature-problems", priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog/outlook-signature-best-practices-2026", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/outlook-vs-gmail-signature-differences", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/email-signature-for-remote-teams-outlook", priority: 0.6, changeFrequency: "monthly" },
    { url: "/blog/outlook-signature-deployment-guide", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blog/email-signature-not-working-new-outlook", priority: 0.8, changeFrequency: "monthly" },

    // Other
    { url: "/about", priority: 0.4, changeFrequency: "monthly" },
    { url: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { url: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
