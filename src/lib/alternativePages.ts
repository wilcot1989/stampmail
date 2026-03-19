export interface AlternativePageData {
  slug: string;
  competitorName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  painPoints: { issue: string; detail: string; source: string }[];
  comparisonRows: {
    feature: string;
    us: string | boolean;
    them: string | boolean;
  }[];
  switchReasons: { title: string; description: string }[];
}

export const ALTERNATIVE_PAGES: AlternativePageData[] = [
  {
    slug: "alternative-to-wisestamp",
    competitorName: "WiseStamp",
    metaTitle:
      "Best WiseStamp Alternative (2026) | NeatStamp — Actually Free",
    metaDescription:
      "Looking for a WiseStamp alternative? NeatStamp is free (really), Outlook-proof, and takes 60 seconds. No subscription traps. No cancel headaches. Switch today.",
    h1: "The Best Free WiseStamp Alternative",
    intro:
      "WiseStamp has 1.2 million users — but 53% of their Trustpilot reviews are 1-star. Users report subscription traps, impossible cancellation, and continued charges after canceling. If you're looking for a better alternative, NeatStamp was built specifically to fix everything WiseStamp gets wrong.",
    painPoints: [
      {
        issue: "Can't cancel subscription",
        detail:
          "No cancel button in the dashboard. Users must email support, which takes weeks to respond. Some users report being charged for years after requesting cancellation.",
        source: "Trustpilot (53% 1-star reviews)",
      },
      {
        issue: "Continues charging after cancellation",
        detail:
          "Multiple users report WiseStamp billing them long after they canceled. One user was charged since 2018 despite emailing cancellation requests.",
        source: "Trustpilot reviews",
      },
      {
        issue: "No refunds",
        detail:
          "WiseStamp refuses refunds even when the service isn't working. Users must dispute charges with their bank.",
        source: "Trustpilot reviews",
      },
      {
        issue: "Signatures don't work on mobile",
        detail:
          "Multiple users report that WiseStamp signatures break on mobile devices.",
        source: "Trustpilot reviews",
      },
      {
        issue: "UI updates break existing signatures",
        detail:
          "Platform updates have broken templates and workflows for long-time users. Custom templates become unusable.",
        source: "Trustpilot reviews",
      },
      {
        issue: "Terrible customer service",
        detail:
          "Weeks-long response times. Automated responses that don't address actual problems. Users question whether humans work there.",
        source: "Trustpilot reviews",
      },
    ],
    comparisonRows: [
      { feature: "Free tier (no catch)", us: true, them: false },
      { feature: "No account required for free", us: true, them: false },
      { feature: "Cancel in 2 clicks", us: true, them: false },
      { feature: "30-day money-back guarantee", us: true, them: false },
      { feature: "Outlook-proof guaranteed", us: true, them: false },
      { feature: "Mobile responsive", us: true, them: false },
      { feature: "Privacy-first (client-side)", us: true, them: false },
      { feature: "Multiple templates", us: true, them: true },
      { feature: "Social media links", us: true, them: true },
      { feature: "Team management", us: true, them: true },
      { feature: "Free price", us: "$0", them: "$0 (paywall)" },
      { feature: "Pro price", us: "$5/mo", them: "$6-10/mo" },
    ],
    switchReasons: [
      {
        title: "Actually Free",
        description:
          "NeatStamp's free tier works without an account. No credit card. No paywall after 20 minutes of work. WiseStamp's 'free' version is severely limited and pushes you to upgrade constantly.",
      },
      {
        title: "Cancel in 2 Clicks",
        description:
          "WiseStamp's #1 complaint is that you can't cancel. NeatStamp uses LemonSqueezy — cancel in 2 clicks from your account, anytime. No emails, no waiting, no games.",
      },
      {
        title: "Outlook-Proof",
        description:
          "WiseStamp signatures break on mobile and in some Outlook versions. NeatStamp uses table-based HTML and inline CSS — the gold standard that works everywhere.",
      },
      {
        title: "Half the Price",
        description:
          "WiseStamp Pro costs $6-10/month. NeatStamp Pro is $5/month (or $39/year). Same features, lower price, better experience.",
      },
    ],
  },
  {
    slug: "alternative-to-mysignature",
    competitorName: "MySignature",
    metaTitle:
      "Best MySignature Alternative (2026) | NeatStamp — Truly Free",
    metaDescription:
      "Looking for a MySignature alternative? NeatStamp is genuinely free — no surprise charges, no paywall. Outlook-proof signatures in 60 seconds.",
    h1: "The Best Free MySignature Alternative",
    intro:
      "MySignature generates $700K per year — largely by advertising as 'free' while charging users without clear warning. If you've been burned by MySignature's pricing tactics, NeatStamp offers a genuinely free alternative with better Outlook support and no data collection.",
    painPoints: [
      {
        issue: "Misleading 'free' model",
        detail:
          "MySignature advertises as free but charges users' credit cards without clear warning. Users report unexpected charges after signing up.",
        source: "Trustpilot reviews",
      },
      {
        issue: "Only 1 signature per account",
        detail:
          "Even on paid plans, MySignature limits you to one signature unless you pay for additional accounts.",
        source: "Trustpilot reviews",
      },
      {
        issue: "Formatting breaks in Outlook",
        detail:
          "Users report that MySignature signatures break when displayed in Microsoft Outlook.",
        source: "Trustpilot reviews",
      },
      {
        issue: "Blurry logos and images",
        detail:
          "Users complain about logo quality degradation in their signatures.",
        source: "Trustpilot reviews",
      },
      {
        issue: "Account disabled without warning",
        detail:
          "Multiple users report their accounts being disabled with no communication or explanation.",
        source: "Trustpilot reviews",
      },
      {
        issue: "Slow support (4-5 follow-ups needed)",
        detail:
          "Users need to send multiple follow-up emails before getting a meaningful response from support.",
        source: "Trustpilot reviews",
      },
    ],
    comparisonRows: [
      { feature: "Genuinely free (no surprise charges)", us: true, them: false },
      { feature: "No account required for free", us: true, them: false },
      { feature: "Multiple signatures (free)", us: false, them: false },
      { feature: "Multiple signatures (Pro)", us: true, them: false },
      { feature: "Outlook-proof guaranteed", us: true, them: false },
      { feature: "Privacy-first (no data stored)", us: true, them: false },
      { feature: "Image quality optimization", us: true, them: false },
      { feature: "Social media links", us: true, them: true },
      { feature: "Email tracking", us: false, them: true },
      { feature: "Free price", us: "$0", them: "$0 (paywall)" },
      { feature: "Pro price", us: "$5/mo", them: "$4-8/mo" },
    ],
    switchReasons: [
      {
        title: "No Surprise Charges",
        description:
          "NeatStamp's free tier requires no account and no credit card. You can't be charged for something you never signed up for. MySignature users report being charged without clear warning.",
      },
      {
        title: "Unlimited Signatures on Pro",
        description:
          "MySignature limits you to one signature per account. NeatStamp Pro gives you unlimited signatures for different roles and contexts.",
      },
      {
        title: "Better Outlook Support",
        description:
          "MySignature signatures break in Outlook. NeatStamp uses table-based HTML specifically designed to render correctly in every version of Outlook.",
      },
      {
        title: "Your Data Stays Private",
        description:
          "MySignature stores your personal data on their servers. NeatStamp's free tier runs entirely in your browser — your name, phone, and photo never leave your device.",
      },
    ],
  },
  {
    slug: "alternative-to-exclaimer",
    competitorName: "Exclaimer",
    metaTitle:
      "Best Exclaimer Alternative (2026) | NeatStamp — Simple & Affordable",
    metaDescription:
      "Looking for an Exclaimer alternative? NeatStamp is simpler, cheaper, and works for individuals and small teams. No IT department needed.",
    h1: "The Best Affordable Exclaimer Alternative",
    intro:
      "Exclaimer is built for enterprises with dedicated IT teams and big budgets. If you're a freelancer, small business, or startup that needs professional email signatures without the enterprise complexity and price tag, NeatStamp is your answer.",
    painPoints: [
      {
        issue: "Enterprise pricing (minimum 10 users)",
        detail:
          "Exclaimer's cheapest plan requires a minimum of 10 users. There's no option for individuals or small teams of 2-5 people.",
        source: "G2 / Capterra reviews",
      },
      {
        issue: "Steep learning curve",
        detail:
          "Users describe the interface as 'incredibly confusing for someone with above average technical skill.' IT administrators struggle with the setup.",
        source: "G2 reviews",
      },
      {
        issue: "Requires HTML/CSS knowledge",
        detail:
          "Designing custom signatures requires technical skills that most small business owners don't have.",
        source: "Software Advice reviews",
      },
      {
        issue: "Complex for small teams",
        detail:
          "The platform is designed for large organizations. Features like compliance policies and multi-server deployment are overkill for a 5-person startup.",
        source: "Capterra reviews",
      },
      {
        issue: "Worse support for smaller customers",
        detail:
          "Users report that support and account management falters for smaller customers, likely because their focus is on enterprise clients.",
        source: "G2 reviews",
      },
    ],
    comparisonRows: [
      { feature: "Free tier available", us: true, them: false },
      { feature: "Single-user pricing", us: true, them: false },
      { feature: "No IT department needed", us: true, them: false },
      { feature: "Setup in 60 seconds", us: true, them: false },
      { feature: "No HTML/CSS knowledge required", us: true, them: false },
      { feature: "Enterprise team management", us: false, them: true },
      { feature: "Active Directory sync", us: false, them: true },
      { feature: "Compliance policies", us: false, them: true },
      { feature: "Outlook compatible", us: true, them: true },
      { feature: "Starting price", us: "$0", them: "~$2/user/mo (min 10)" },
    ],
    switchReasons: [
      {
        title: "No Minimum Users",
        description:
          "Exclaimer requires minimum 10 users. NeatStamp works for 1 person (free) or 5+ (Team plan at $3/user/month). Perfect for freelancers and small teams.",
      },
      {
        title: "Zero Learning Curve",
        description:
          "Exclaimer requires IT expertise. NeatStamp takes 60 seconds: fill in your details, pick a design, copy and paste. No HTML knowledge needed.",
      },
      {
        title: "Genuinely Free for Individuals",
        description:
          "Exclaimer has no free tier. NeatStamp's free tier gives you everything you need for a professional signature — forever.",
      },
      {
        title: "Built for Small Teams",
        description:
          "Exclaimer is enterprise software simplified down. NeatStamp is built from the ground up for freelancers, startups, and small businesses.",
      },
    ],
  },
  {
    slug: "alternative-to-signaturely",
    competitorName: "Signaturely",
    metaTitle: "Best Signaturely Alternative (2026) | NeatStamp",
    metaDescription:
      "Looking for a Signaturely alternative for email signatures? NeatStamp is free, secure, and creates professional signatures in 60 seconds.",
    h1: "The Best Free Signaturely Alternative",
    intro:
      "Signaturely has been receiving concerning reports from users — phishing emails sent using their branding, payment demands after free trials, and unresponsive support. If you need a trustworthy email signature generator, NeatStamp prioritizes your security and privacy.",
    painPoints: [
      {
        issue: "Phishing emails with Signaturely branding",
        detail:
          "Multiple Trustpilot reviewers report receiving scam emails with the Signaturely logo asking them to confirm annual maintenance contracts or unauthorized purchases.",
        source: "Trustpilot (3 of 5 negative reviews)",
      },
      {
        issue: "Payment demanded after free design",
        detail:
          "Users spend 20 minutes designing a signature, then are asked for bank details for 'activation.' Users describe this as suspicious.",
        source: "Trustpilot reviews",
      },
      {
        issue: "No support after payment",
        detail:
          "Users who paid for the service received no response to support requests. 'Looks like they took the money and ran.'",
        source: "Trustpilot reviews",
      },
    ],
    comparisonRows: [
      { feature: "No phishing/scam reports", us: true, them: false },
      { feature: "No payment for basic features", us: true, them: false },
      { feature: "Privacy-first (no data stored)", us: true, them: false },
      { feature: "Responsive support", us: true, them: false },
      { feature: "Outlook-proof HTML", us: true, them: true },
      { feature: "Free templates", us: true, them: true },
      { feature: "Free price", us: "$0", them: "$0 (paywall)" },
    ],
    switchReasons: [
      {
        title: "Trustworthy & Secure",
        description:
          "No phishing reports, no shady payment demands. NeatStamp's free tier doesn't even require an email address — there's nothing to exploit.",
      },
      {
        title: "No Bait-and-Switch",
        description:
          "NeatStamp doesn't let you design for 20 minutes and then demand payment. The free tier is complete: create, customize, copy, done.",
      },
      {
        title: "Your Data is Safe",
        description:
          "NeatStamp's free tier runs entirely client-side. Your personal information never touches a server. No data to leak, no data to phish.",
      },
    ],
  },
  {
    slug: "alternative-to-hubspot-signature",
    competitorName: "HubSpot Email Signature Generator",
    metaTitle:
      "Best HubSpot Email Signature Alternative (2026) | NeatStamp",
    metaDescription:
      "Looking for more than HubSpot's basic email signature generator? NeatStamp offers more templates, customization, and features — still free.",
    h1: "The Best HubSpot Email Signature Generator Alternative",
    intro:
      "HubSpot's free email signature generator is decent — but limited. Only 12 templates, basic customization, and it's designed to funnel you into the HubSpot CRM ecosystem. NeatStamp gives you more templates, more customization, and no CRM upsell.",
    painPoints: [
      {
        issue: "Limited to 12 templates",
        detail:
          "HubSpot offers only 12 basic templates with limited design variation.",
        source: "Product comparison",
      },
      {
        issue: "Gateway to HubSpot CRM",
        detail:
          "The signature generator is a lead-gen tool designed to get you into the HubSpot ecosystem. Expect marketing emails and CRM upsells.",
        source: "HubSpot marketing strategy",
      },
      {
        issue: "Basic customization only",
        detail:
          "Limited color options, no Calendly integration, no CTA banners, no analytics.",
        source: "Product comparison",
      },
      {
        issue: "No saved signatures",
        detail:
          "You can't save your signature to edit later unless you create a HubSpot account.",
        source: "Product experience",
      },
    ],
    comparisonRows: [
      { feature: "Number of free templates", us: "5", them: "12" },
      { feature: "Pro templates available", us: "15+", them: "12 (same)" },
      { feature: "Custom color picker", us: true, them: true },
      { feature: "Calendly integration", us: true, them: false },
      { feature: "CTA banner", us: true, them: false },
      { feature: "Click analytics", us: true, them: false },
      { feature: "No CRM upsell", us: true, them: false },
      { feature: "Privacy-first", us: true, them: false },
      { feature: "Outlook-proof guaranteed", us: true, them: true },
      { feature: "Price", us: "$0 (Pro: $5/mo)", them: "$0 (CRM: $20+/mo)" },
    ],
    switchReasons: [
      {
        title: "More Features, No Upsell",
        description:
          "NeatStamp gives you Calendly buttons, CTA banners, and click analytics — features HubSpot reserves for their paid CRM. And we never try to sell you a CRM.",
      },
      {
        title: "Privacy Focused",
        description:
          "HubSpot collects your data to feed their marketing machine. NeatStamp's free tier stores nothing — no tracking, no marketing emails, no data harvesting.",
      },
      {
        title: "More Customization",
        description:
          "NeatStamp offers more template variety, accent colors, photo styling options, and social media link options than HubSpot's basic generator.",
      },
    ],
  },
  {
    slug: "alternative-to-newoldstamp",
    competitorName: "Newoldstamp",
    metaTitle:
      "Best Newoldstamp Alternative (2026) | NeatStamp — Modern & Free",
    metaDescription:
      "Looking for a Newoldstamp alternative? NeatStamp is the modern, free email signature generator with better templates and simpler pricing.",
    h1: "The Best Free Newoldstamp Alternative",
    intro:
      "Newoldstamp was acquired by BlackPearl Group in 2022 and has shifted focus to enterprise clients. If you're an individual or small team looking for a modern, affordable alternative, NeatStamp delivers the same core functionality with a better free tier and simpler pricing.",
    painPoints: [
      {
        issue: "Enterprise-focused after acquisition",
        detail:
          "Since being acquired in 2022, Newoldstamp has increasingly focused on enterprise features and pricing, leaving individual users behind.",
        source: "Product direction analysis",
      },
      {
        issue: "Aging interface",
        detail:
          "The UI hasn't seen major updates. Competitors offer more modern design tools and templates.",
        source: "Product comparison",
      },
      {
        issue: "Higher pricing for individuals",
        detail:
          "Individual plans have become less competitive as the company focuses on team and enterprise tiers.",
        source: "Pricing comparison",
      },
    ],
    comparisonRows: [
      { feature: "Free tier (no account)", us: true, them: false },
      { feature: "Modern UI/UX", us: true, them: false },
      { feature: "Individual pricing", us: "$5/mo", them: "$8+/mo" },
      { feature: "Team pricing", us: "$3/user/mo", them: "$5+/user/mo" },
      { feature: "Outlook compatible", us: true, them: true },
      { feature: "Analytics", us: true, them: true },
      { feature: "Privacy-first", us: true, them: false },
    ],
    switchReasons: [
      {
        title: "Built for Individuals First",
        description:
          "Newoldstamp has moved upmarket. NeatStamp is built from the ground up for freelancers, consultants, and small teams who want simplicity and value.",
      },
      {
        title: "Modern Design",
        description:
          "NeatStamp offers contemporary templates and a modern editor built with the latest web technology. No dated interfaces.",
      },
      {
        title: "Better Value",
        description:
          "NeatStamp Pro at $5/month undercuts Newoldstamp's individual pricing, with a free tier that requires no account.",
      },
    ],
  },
  {
    slug: "alternative-to-canva-signature",
    competitorName: "Canva",
    metaTitle:
      "Best Canva Email Signature Alternative (2026) | NeatStamp",
    metaDescription:
      "Canva email signatures look great but break in Outlook and can't be copy-pasted. NeatStamp creates Outlook-proof signatures that actually work in email clients.",
    h1: "The Best Alternative to Canva for Email Signatures",
    intro:
      "Canva is amazing for graphics — but not for email signatures. Canva signatures are designed as images or PDFs, not email-compatible HTML. They break in Outlook, can't include clickable links, and don't resize on mobile. NeatStamp is purpose-built for email signatures that work everywhere.",
    painPoints: [
      {
        issue: "Not real email HTML",
        detail:
          "Canva creates image-based signatures, not proper HTML. This means no clickable links, no phone number links, and no social media links in the actual email.",
        source: "Technical limitation",
      },
      {
        issue: "Breaks in Outlook",
        detail:
          "Image-based signatures don't render consistently in Outlook. Images may be blocked, resized incorrectly, or shown as attachments.",
        source: "Email client testing",
      },
      {
        issue: "Not mobile responsive",
        detail:
          "A fixed-size image signature doesn't adapt to mobile screens. It either gets cropped or becomes too small to read.",
        source: "Technical limitation",
      },
      {
        issue: "No clickable contact info",
        detail:
          "Because it's an image, recipients can't click your email address, phone number, or website URL.",
        source: "Technical limitation",
      },
      {
        issue: "Large file size",
        detail:
          "Image-based signatures add significant weight to every email, potentially triggering spam filters.",
        source: "Email deliverability concern",
      },
    ],
    comparisonRows: [
      { feature: "Real HTML email signature", us: true, them: false },
      { feature: "Clickable links & phone numbers", us: true, them: false },
      { feature: "Works in Outlook", us: true, them: false },
      { feature: "Mobile responsive", us: true, them: false },
      { feature: "Small file size (no spam risk)", us: true, them: false },
      { feature: "Copy-paste installation", us: true, them: false },
      { feature: "Beautiful design", us: true, them: true },
      { feature: "Free tier", us: true, them: true },
      { feature: "Template variety", us: "8+", them: "100+ (image only)" },
    ],
    switchReasons: [
      {
        title: "Real Email HTML",
        description:
          "NeatStamp creates proper HTML signatures with clickable links, phone numbers, and social media buttons. Canva creates images that can't be interacted with.",
      },
      {
        title: "Works Everywhere",
        description:
          "NeatStamp signatures work in every email client — Outlook, Gmail, Apple Mail, mobile. Canva image signatures break in Outlook and don't resize on phones.",
      },
      {
        title: "Better Deliverability",
        description:
          "Image-heavy emails trigger spam filters. NeatStamp's lightweight HTML signatures keep your emails in the inbox, not the spam folder.",
      },
      {
        title: "Purpose-Built",
        description:
          "Canva is a general design tool. NeatStamp is built specifically for email signatures — every feature is optimized for how email clients actually render HTML.",
      },
    ],
  },
];
