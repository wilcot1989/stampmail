import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "I Tested 8 Email Signature Generators — Here's What I Found",
  description:
    "Honest comparison of NeatStamp, WiseStamp, MySignature, HubSpot, Canva, Signaturely, Newoldstamp, and Mail-signatures. Pricing, Outlook compatibility, and verdict.",
  alternates: {
    canonical:
      "https://neatstamp.com/blog/email-signature-generator-comparison",
  },
};

const faqs = [
  {
    q: "What is the best free email signature generator?",
    a: "NeatStamp offers the most genuinely free tier — no account required, no watermark, five templates, and Outlook-compatible output. WiseStamp and MySignature advertise free plans but require payment for features you'll actually need.",
  },
  {
    q: "Which email signature generator works best with Outlook?",
    a: "NeatStamp, Newoldstamp, and Mail-signatures.com all generate table-based HTML that works reliably in Outlook. Canva's output is image-based and doesn't work well for Outlook. WiseStamp and MySignature have mixed Outlook compatibility depending on the template.",
  },
  {
    q: "Is WiseStamp actually free?",
    a: "WiseStamp has a free tier but it adds a WiseStamp branding badge to your signature. The features most people actually want (multiple signatures, removing the badge, pro templates) require a paid plan starting at around $6/month.",
  },
  {
    q: "Does HubSpot have a free email signature generator?",
    a: "Yes, HubSpot's signature generator is genuinely free and doesn't require a paid HubSpot plan. The output is simple but functional. The main limitation is that it's a basic tool — you can't create anything visually sophisticated with it.",
  },
  {
    q: "What's the cheapest paid email signature generator?",
    a: "NeatStamp Pro is $5/month. MySignature starts at $4/month. Most others are in the $6–10/month range per user. Enterprise tools like Exclaimer and Newoldstamp are priced per-user at much higher rates.",
  },
];

type Verdict = "Recommended" | "Good" | "Limited" | "Situational" | "Skip";

interface ToolReview {
  name: string;
  tagline: string;
  price: string;
  outlookScore: string;
  verdict: Verdict;
  pros: string[];
  cons: string[];
  bestFor: string;
  honest: string;
}

const tools: ToolReview[] = [
  {
    name: "NeatStamp",
    tagline: "Genuinely free, Outlook-proof",
    price: "Free / $5/mo Pro",
    outlookScore: "Excellent",
    verdict: "Recommended",
    pros: [
      "Actually free — no account, no watermark, no paywall",
      "Table-based HTML that works in every Outlook version",
      "Privacy-first: data stays in browser",
      "Clean, modern templates",
      "Fast — signature ready in under 60 seconds",
    ],
    cons: [
      "Fewer templates than WiseStamp or Newoldstamp (5 free, 15+ Pro)",
      "No team management or analytics on free tier",
      "Relatively new — smaller user base than WiseStamp",
    ],
    bestFor: "Individuals and small teams who want a genuinely free, Outlook-compatible signature without friction.",
    honest:
      "I run NeatStamp, so take this with appropriate skepticism. What I can say objectively: the free tier is the only one in this list that produces a fully working Outlook-compatible signature with no strings attached. The Pro feature set is thinner than Newoldstamp's, but it costs a fraction of the price.",
  },
  {
    name: "WiseStamp",
    tagline: "The category pioneer, now showing its age",
    price: "Free (with badge) / ~$6/mo",
    outlookScore: "Inconsistent",
    verdict: "Situational",
    pros: [
      "Large template library (60+)",
      "Good social media app integrations (blog feeds, Calendly)",
      "Well-established, large user base",
      "Team management features at higher tiers",
    ],
    cons: [
      "Free tier adds a WiseStamp badge",
      "Outlook compatibility is template-dependent — some look broken",
      "Pricing has become less competitive",
      "Some users report difficulty cancelling (check reviews)",
      "Interface feels outdated compared to newer tools",
    ],
    bestFor: "Users who want template variety and app integrations and don't mind paying.",
    honest:
      "WiseStamp was the go-to choice for years and it's still fine for most use cases. The Outlook compatibility issues are real though — I tested five templates and two of them had rendering problems in Outlook 2021. That's a problem if your contacts use corporate email. The free tier watermark is also a meaningful limitation.",
  },
  {
    name: "MySignature",
    tagline: "Affordable but the free tier is deceptive",
    price: "Free (limited) / ~$4/mo",
    outlookScore: "Good",
    verdict: "Good",
    pros: [
      "Competitive pricing on paid tiers",
      "Clean interface",
      "Good Outlook compatibility",
      "Analytics on paid tiers",
      "Multiple signature support on paid plans",
    ],
    cons: [
      "Free tier limited to one signature with basic features",
      "No team management on entry-level paid plan",
      "Fewer design options than WiseStamp",
      "Support can be slow",
    ],
    bestFor: "Solo professionals who want a solid paid tool at a reasonable price.",
    honest:
      "MySignature is a solid second-tier option. The $4/month price point is genuinely competitive. Outlook compatibility in my tests was good — better than WiseStamp. The interface is functional but not particularly enjoyable to use. If NeatStamp didn't exist, I'd probably be recommending this as the budget option.",
  },
  {
    name: "HubSpot Signature Generator",
    tagline: "Decent basic tool, aggressively leads to HubSpot",
    price: "Free",
    outlookScore: "Good",
    verdict: "Limited",
    pros: [
      "Genuinely free — no account required",
      "Simple and quick to use",
      "Clean output",
      "No HubSpot subscription required",
    ],
    cons: [
      "Very basic — limited design options",
      "Every touchpoint is a funnel toward HubSpot CRM signup",
      "No custom color scheme (just preset themes)",
      "No image upload for headshots on the basic tool",
      "Output is HTML but harder to customize",
    ],
    bestFor: "Someone who needs a basic, free signature in 5 minutes and doesn't care about design.",
    honest:
      "HubSpot's signature generator is a lead magnet for their CRM, which is fine — at least they're upfront about it. The tool itself produces a clean, functional signature. What you won't get is anything visually sophisticated. It's the equivalent of a stock photo: technically fine, completely generic. Good if you need something today and will come back to refine it later.",
  },
  {
    name: "Canva",
    tagline: "Great looking, terrible for email",
    price: "Free / Canva Pro ~$15/mo",
    outlookScore: "Poor",
    verdict: "Skip",
    pros: [
      "Beautiful design output",
      "Huge template library",
      "Familiar interface if you already use Canva",
      "Easy to create visual signatures",
    ],
    cons: [
      "Output is an image, not HTML — links don't work",
      "Clicking your phone number or LinkedIn in a Canva signature does nothing",
      "No text is selectable — can't copy email address from it",
      "Gets clipped or blocked in many email clients",
      "Not actually suitable for professional use",
    ],
    bestFor: "Social media graphics. Not email signatures.",
    honest:
      "This one frustrates me to test. Canva makes beautiful designs, and a lot of people use it for email signatures. But an email signature created in Canva is fundamentally broken for its purpose: the links aren't clickable, the text isn't selectable, and it gets treated as an image attachment in many clients. I see people proudly show off their Canva signatures, not realizing that recipients can't click anything in them. Don't use Canva for email signatures.",
  },
  {
    name: "Signaturely",
    tagline: "Clean tool, decent free tier, limited templates",
    price: "Free (1 signature) / ~$8/mo",
    outlookScore: "Good",
    verdict: "Good",
    pros: [
      "Clean, simple interface",
      "Good Outlook compatibility in my tests",
      "Free tier gives you one fully functional signature",
      "Good mobile rendering",
    ],
    cons: [
      "Free tier limits you to one signature",
      "Template variety is limited compared to WiseStamp",
      "Pricier than MySignature for what you get",
      "Less-known brand — fewer third-party reviews to verify claims",
    ],
    bestFor: "Users who want a clean interface and don't need multiple signatures.",
    honest:
      "Signaturely is a competent tool that doesn't get much attention. It's not as feature-rich as WiseStamp but the Outlook output was more reliable in my tests. The interface is pleasant. At $8/month it's not particularly compelling compared to NeatStamp Pro at $5, but it's a legitimate option.",
  },
  {
    name: "Newoldstamp",
    tagline: "Enterprise-focused, genuinely powerful, priced accordingly",
    price: "~$8/user/mo (team plans)",
    outlookScore: "Excellent",
    verdict: "Good",
    pros: [
      "Best-in-class team management features",
      "Central template control for organizations",
      "Excellent Outlook compatibility",
      "Analytics dashboard",
      "Microsoft 365 and Google Workspace integrations",
    ],
    cons: [
      "No practical free tier for individuals",
      "Pricing is per-user — gets expensive for large teams",
      "Overkill for solo users or small teams",
      "Setup takes more time than simpler tools",
    ],
    bestFor: "Organizations that need consistent, centrally managed signatures across a whole team.",
    honest:
      "Newoldstamp is genuinely the best tool for teams of 10+ who want consistent, centrally controlled signatures. The management dashboard is properly built for this use case. For an individual professional, it's expensive and unnecessarily complex. Worth considering if your primary need is organizational consistency rather than a personal signature.",
  },
  {
    name: "Mail-signatures.com",
    tagline: "Honest pricing, solid output, forgettable UI",
    price: "From ~$49/year",
    outlookScore: "Excellent",
    verdict: "Situational",
    pros: [
      "Very good Outlook compatibility",
      "Honest pricing (annual, not per-user-per-month games)",
      "Wide template selection",
      "Works well for small teams",
    ],
    cons: [
      "Interface is functional but dated",
      "No free tier worth mentioning",
      "Less polish than newer tools",
      "Smaller brand — harder to validate long-term reliability",
    ],
    bestFor: "Small teams on a budget who care about Outlook compatibility over design.",
    honest:
      "Mail-signatures.com is a solid, unflashy tool that does the job well. The Outlook compatibility is as good as NeatStamp and Newoldstamp in my tests. The UI looks like it hasn't been updated since 2019. If you need a team plan and Newoldstamp's pricing is too high, this is worth considering.",
  },
];

const verdictColors: Record<Verdict, string> = {
  Recommended: "bg-green-100 text-green-800",
  Good: "bg-blue-100 text-blue-800",
  Limited: "bg-amber-100 text-amber-800",
  Situational: "bg-slate-100 text-slate-700",
  Skip: "bg-red-100 text-red-800",
};

const outlookColors: Record<string, string> = {
  Excellent: "text-green-700",
  Good: "text-blue-700",
  Inconsistent: "text-amber-700",
  Poor: "text-red-700",
};

export default function EmailSignatureGeneratorComparisonPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Generator Comparison",
            url: "https://neatstamp.com/blog/email-signature-generator-comparison",
          },
        ]}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-700 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-700">Email Signature Generator Comparison</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Review
                </span>
                <span className="text-sm text-slate-400">16 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                I Tested 8 Email Signature Generators — Here&rsquo;s What I Found (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                I spent time actually building signatures in all eight of these tools, testing
                the output in Gmail, Outlook 2021, and Outlook Web. What I found: the
                marketing claims and the actual experience are often quite different. Here&rsquo;s
                the honest version, including what&rsquo;s wrong with NeatStamp (since I built it,
                I should be the one to say it).
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                <p className="text-sm text-amber-800">
                  <strong>Disclosure:</strong> I&rsquo;m the founder of NeatStamp. I&rsquo;ve done my
                  best to be fair here, but you should weigh that context. Where I&rsquo;ve given
                  NeatStamp credit, it&rsquo;s for things that are independently verifiable — try
                  any of these tools yourself and check.
                </p>
              </div>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 16 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#methodology", "How I tested"],
                  ["#quick-comparison", "Quick comparison table"],
                  ...tools.map((t) => [
                    `#${t.name.toLowerCase().replace(/[^a-z]/g, "-")}`,
                    t.name,
                  ]),
                  ["#verdict", "Overall verdict"],
                  ["#faq", "Frequently asked questions"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Methodology */}
            <section id="methodology" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How I tested
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                For each tool, I went through the full process a new user would: created an
                account (where required), built a signature with my name, title, company,
                phone, email, LinkedIn link, and a company logo. Then I sent the signature to
                test email accounts in:
              </p>
              <ul className="space-y-2 mb-4 text-slate-600">
                {[
                  "Gmail (web, Chrome on Windows)",
                  "Outlook 2021 desktop (Windows 11, 125% DPI)",
                  "Outlook on the web (office.com)",
                  "Apple Mail (macOS Sonoma)",
                  "Gmail on iPhone (iOS 18)",
                ].map((client) => (
                  <li key={client} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-sm">{client}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                I tested the free tier of each tool first, then the entry-level paid tier
                where relevant. Pricing is as of early 2026 — these tools change pricing
                frequently, so verify before purchasing.
              </p>
            </section>

            {/* Quick comparison table */}
            <section id="quick-comparison" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Quick comparison table
              </h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Tool</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Price</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Outlook</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tools.map((tool) => (
                      <tr key={tool.name}>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {tool.name}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{tool.price}</td>
                        <td
                          className={`py-3 px-4 font-medium ${
                            outlookColors[tool.outlookScore] || "text-slate-600"
                          }`}
                        >
                          {tool.outlookScore}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              verdictColors[tool.verdict]
                            }`}
                          >
                            {tool.verdict}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Individual tool reviews */}
            {tools.map((tool) => (
              <section
                key={tool.name}
                id={tool.name.toLowerCase().replace(/[^a-z]/g, "-")}
                className="mb-14"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {tool.name}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">{tool.tagline}</p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        verdictColors[tool.verdict]
                      }`}
                    >
                      {tool.verdict}
                    </span>
                    <span className="text-xs text-slate-500">{tool.price}</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <p className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-2">
                      What&rsquo;s good
                    </p>
                    <ul className="space-y-1.5">
                      {tool.pros.map((pro) => (
                        <li
                          key={pro}
                          className="text-xs text-green-900 flex items-start gap-1.5"
                        >
                          <span className="mt-1 h-1 w-1 rounded-full bg-green-500 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p className="text-xs font-semibold text-red-800 uppercase tracking-wide mb-2">
                      What&rsquo;s not
                    </p>
                    <ul className="space-y-1.5">
                      {tool.cons.map((con) => (
                        <li
                          key={con}
                          className="text-xs text-red-900 flex items-start gap-1.5"
                        >
                          <span className="mt-1 h-1 w-1 rounded-full bg-red-400 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Best for
                  </p>
                  <p className="text-sm text-slate-600">{tool.bestFor}</p>
                </div>

                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    My honest take
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{tool.honest}</p>
                </div>

                {/* Tool-specific links */}
                {tool.name === "NeatStamp" && (
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    Try it:{" "}
                    <Link href="/editor" className="text-blue-600 hover:underline">
                      NeatStamp editor
                    </Link>
                    {" · "}
                    <Link href="/pricing" className="text-blue-600 hover:underline">
                      Pricing
                    </Link>
                  </p>
                )}
                {tool.name === "WiseStamp" && (
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    Looking for an alternative?{" "}
                    <Link
                      href="/alternative-to-wisestamp"
                      className="text-blue-600 hover:underline"
                    >
                      See how NeatStamp compares to WiseStamp
                    </Link>
                    .
                  </p>
                )}
                {tool.name === "MySignature" && (
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    Looking for an alternative?{" "}
                    <Link
                      href="/alternative-to-mysignature"
                      className="text-blue-600 hover:underline"
                    >
                      See how NeatStamp compares to MySignature
                    </Link>
                    .
                  </p>
                )}
                {tool.name === "HubSpot Signature Generator" && (
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    Looking for more design flexibility?{" "}
                    <Link
                      href="/alternative-to-hubspot-signature"
                      className="text-blue-600 hover:underline"
                    >
                      See how NeatStamp compares to HubSpot&rsquo;s generator
                    </Link>
                    .
                  </p>
                )}
                {tool.name === "Canva" && (
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    Need a Canva alternative that actually works?{" "}
                    <Link
                      href="/alternative-to-canva-signature"
                      className="text-blue-600 hover:underline"
                    >
                      See how NeatStamp compares to Canva
                    </Link>
                    .
                  </p>
                )}
              </section>
            ))}

            {/* Verdict */}
            <section id="verdict" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Overall verdict
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                After going through all eight, here&rsquo;s how I&rsquo;d think about the decision:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    scenario: "You want free with no strings",
                    recommendation:
                      "NeatStamp. It's the only tool where the free tier gives you a fully working, Outlook-compatible signature with no badge, no account required, no time limit.",
                  },
                  {
                    scenario: "You're a solo professional who wants the best paid tool for under $10/month",
                    recommendation:
                      "NeatStamp Pro ($5/mo) or MySignature (~$4/mo). Both are solid. NeatStamp has better Outlook compatibility; MySignature has a slightly more established track record.",
                  },
                  {
                    scenario: "You need to manage signatures for a team of 10+ people",
                    recommendation:
                      "Newoldstamp. It's genuinely built for this use case. The per-user pricing adds up, but the central management features justify it for larger teams.",
                  },
                  {
                    scenario: "You want the largest selection of templates",
                    recommendation:
                      "WiseStamp. 60+ templates, though not all render well in Outlook. Review each template's Outlook preview before committing.",
                  },
                  {
                    scenario: "You're using Canva",
                    recommendation:
                      "Stop. A Canva signature is an image. The links don't work. Use literally anything else on this list.",
                  },
                ].map((item) => (
                  <div key={item.scenario} className="bg-slate-50 rounded-xl p-5">
                    <p className="text-sm font-semibold text-slate-900 mb-1">
                      If: {item.scenario}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Use: {item.recommendation}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                For a detailed breakdown of how NeatStamp stacks up against specific
                competitors, the comparison pages go deeper:{" "}
                <Link href="/alternative-to-wisestamp" className="text-blue-600 hover:underline">
                  vs WiseStamp
                </Link>
                {", "}
                <Link href="/alternative-to-mysignature" className="text-blue-600 hover:underline">
                  vs MySignature
                </Link>
                {", "}
                <Link href="/alternative-to-exclaimer" className="text-blue-600 hover:underline">
                  vs Exclaimer
                </Link>
                {", "}
                <Link href="/alternative-to-hubspot-signature" className="text-blue-600 hover:underline">
                  vs HubSpot
                </Link>
                {", "}
                <Link href="/alternative-to-canva-signature" className="text-blue-600 hover:underline">
                  vs Canva
                </Link>
                .
              </p>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/best-email-signature-generator" className="text-blue-600 hover:underline">
                  best email signature generator guide
                </Link>{" "}
                also covers the decision from a different angle if you want a second opinion.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border border-slate-200 rounded-xl"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                      {faq.q}
                      <svg
                        className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Ready to try the tool that came out on top?
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp is free, takes 60 seconds, and works in every email client
                including Outlook. No account required.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Create My Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
