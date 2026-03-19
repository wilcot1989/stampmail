import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Trends in 2026 — What's Changed | NeatStamp",
  description:
    "What's actually trending in email signatures in 2026 — and what's fading out. Dark mode, minimal design, Calendly links, AI layouts, QR codes, and what to ditch.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-trends-2026",
  },
};

const faqs = [
  {
    q: "What is the biggest email signature trend in 2026?",
    a: "Minimalism. The direction has been consistent for three years: fewer elements, less visual clutter, more whitespace. The data on this is clear — shorter signatures get higher engagement on their CTAs because there's less competing for attention. The average professional signature has gotten two lines shorter since 2023.",
  },
  {
    q: "Are QR codes in email signatures actually useful?",
    a: "In specific contexts, yes. Business-card-style introductory emails, trade show follow-ups, and signatures that regularly go to people on mobile who want to save contact info — these are where QR codes earn their place. For most everyday business email, a QR code adds visual complexity without a clear use case. Think about whether your recipients will actually scan it.",
  },
  {
    q: "Are animated GIFs in email signatures still used in 2026?",
    a: "They're declining sharply. Most recipients find them distracting, and they don't display correctly in Outlook on Windows (which still represents a large share of corporate email). The few cases where animated signatures still appear are in creative agencies trying to stand out — and even there, the trend is moving toward static design.",
  },
  {
    q: "What happened to long GDPR disclaimers in email signatures?",
    a: "They're still legally required in some regulated industries, but there's growing recognition that three-paragraph boilerplate disclaimers appended to every email accomplish nothing practically and create visual noise. The trend is toward shorter, more specific legal notices rather than generic 'this email is confidential' paragraphs.",
  },
  {
    q: "Do pronouns in email signatures still matter in 2026?",
    a: "Yes, and the adoption rate has continued to grow in corporate and professional contexts. In many sectors — tech, education, NGO, healthcare — it's now common enough that not including them is increasingly a deliberate choice rather than the default. The format 'She/Her' or 'He/Him' after the name has become the standard placement.",
  },
  {
    q: "What is a dynamic email signature?",
    a: "A signature that changes content based on context — who the recipient is, what day it is, or what campaign is running. The simplest version is rotating banners. The more advanced version, available in some enterprise tools, pulls in CRM data to show the recipient's account manager name or a personalized offer. Most businesses don't need this level of complexity, but it's where the high end of the market is moving.",
  },
];

export default function EmailSignatureTrends2026Page() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Trends in 2026",
            url: "https://neatstamp.com/blog/email-signature-trends-2026",
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
            <span className="text-slate-700">Email Signature Trends in 2026</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                  Trends
                </span>
                <span className="text-sm text-slate-400">12 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Trends in 2026 — What&rsquo;s Changed
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Email signatures have been evolving faster than most people realize. The
                design conventions that looked modern in 2022 look dated now, and some
                things that were dismissed as gimmicks — booking links, QR codes, pronouns —
                have become standard in certain sectors. Here&rsquo;s what the data actually shows
                about what&rsquo;s up and what&rsquo;s out.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 12 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#trends-up", "Trending up in 2026"],
                  ["#minimal-signatures", "The minimal signature movement"],
                  ["#dark-mode", "Dark mode compatibility"],
                  ["#booking-links", "Calendly and booking links"],
                  ["#pronouns", "Pronouns becoming standard"],
                  ["#interactive-banners", "Interactive and rotating banners"],
                  ["#ai-layouts", "AI-assisted signature generation"],
                  ["#qr-codes", "QR codes — niche but real"],
                  ["#trends-down", "Trending down in 2026"],
                  ["#new-in-2026", "What's genuinely new in 2026"],
                  ["#sustainability", "Sustainability footers"],
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

            {/* Trend snapshot */}
            <div className="grid gap-4 sm:grid-cols-2 mb-12">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-green-800 mb-3">Trending up</p>
                <ul className="space-y-1">
                  {[
                    "Minimal signatures (less is more)",
                    "Dark mode compatibility",
                    "Calendly / booking links",
                    "Pronouns",
                    "Interactive banners",
                    "AI-generated layouts",
                    "QR codes (selective use)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-green-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-red-800 mb-3">Trending down</p>
                <ul className="space-y-1">
                  {[
                    "Animated GIFs",
                    "Long legal disclaimers",
                    "Multiple social icons",
                    "Custom / non-web-safe fonts",
                    "Inspirational quotes",
                    "Environmental disclaimers",
                    "Heavy image signatures",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 1 */}
            <section id="trends-up" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Trending up in 2026
              </h2>
              <p className="text-slate-600 leading-relaxed">
                The trends gaining traction share a common thread: they either make the
                signature more functional (booking links, QR codes, dark mode compatibility)
                or more personal and specific (pronouns, minimal personal branding). The
                gimmicky era of email signatures — where flashy design was valued over
                usefulness — is fading.
              </p>
            </section>

            {/* Section 2 */}
            <section id="minimal-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The minimal signature movement
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The biggest shift in signature design over the last three years has been
                toward restraint. Signatures are getting shorter, using less color, dropping
                imagery, and cutting down on social links. The aesthetic standard in
                tech-forward companies has shifted from &ldquo;impressive-looking footer&rdquo; to
                &ldquo;barely noticeable but functional.&rdquo;
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The data behind this is fairly clear. Analysis of click-through rates on
                email signature CTAs consistently shows that signatures with fewer elements
                generate higher engagement on the elements they do have. When your signature
                has one link, recipients notice it. When it has six links and three icons
                and a banner, the cognitive load means most people notice none of it.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Minimal doesn&rsquo;t mean boring or inadequate. The best minimal signatures
                have:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Precise, confident typography (usually 13–14px, bold name, medium title)",
                  "One accent color used sparingly — a divider line or name highlight",
                  "Maximum 4 lines of text",
                  "One link: LinkedIn or a portfolio URL",
                  "No imagery, or a very small logo — not both",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                For practical guidance on minimal design, the{" "}
                <Link href="/email-signature-design" className="text-blue-600 hover:underline">
                  email signature design guide
                </Link>{" "}
                and{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional email signature guide
                </Link>{" "}
                both cover clean layout patterns in detail.
              </p>
            </section>

            {/* Section 3 */}
            <section id="dark-mode" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Dark mode compatibility
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Dark mode is now the default setting for a large share of email users.
                Estimates for 2026 put dark mode adoption at around 65–70% of email clients
                and 50%+ of active users. This is not a niche anymore.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The problem with signatures that weren&rsquo;t built with dark mode in mind:
                they often invert in ugly ways. A signature with black text on a white
                background might render as white text on a dark background (fine, usually)
                or as dark text on a dark background (invisible). Logos with transparent
                backgrounds often lose contrast entirely.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                What dark-mode-ready signatures do differently:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Explicit inline background-color: #ffffff on the container table — this prevents Gmail and Outlook from forcing a dark background behind your text",
                  "Text colors in dark grey (#333333 or #1a1a2e) rather than pure black — handles inversion better",
                  "Logos with a white or light background baked in, rather than transparent PNG — transparent logos often disappear in dark mode",
                  "High-contrast color choices throughout — elements that rely on subtle contrast differences become invisible in dark contexts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/blog/email-signature-dark-mode" className="text-blue-600 hover:underline">
                  email signature dark mode guide
                </Link>{" "}
                goes deep on the technical side of this — including how to test your
                signature in different dark mode implementations.
              </p>
            </section>

            {/* Section 4 */}
            <section id="booking-links" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Calendly and booking links
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Scheduling links have gone from a novelty to a staple in certain sectors.
                In 2022, including a Calendly link in a cold outreach email felt presumptuous
                to many recipients. By 2026, it&rsquo;s standard practice in sales, consulting,
                recruiting, and most B2B contexts.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The shift is practical: the back-and-forth of &ldquo;when are you free?&rdquo; /
                &ldquo;how about Tuesday?&rdquo; / &ldquo;Tuesday doesn&rsquo;t work, what about Thursday?&rdquo; is
                universally recognized as wasteful. A link that lets the recipient pick
                directly from your calendar cuts a 4-email thread to one click.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                What&rsquo;s changed in how these links are presented:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "Shorter link labels — 'Book a call' has replaced 'Schedule a meeting at your convenience'",
                  "Branded short links — yourcompany.com/meet instead of a long Calendly URL",
                  "Contextual links — different link types for different audiences (15-min call vs. 45-min demo)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                The tool alternatives to Calendly that have gained significant share by 2026:
                Cal.com (open-source, privacy-first), Reclaim.ai (which also handles
                calendar optimization), and Notion Calendar for teams already in the Notion
                ecosystem.
              </p>
            </section>

            {/* Section 5 */}
            <section id="pronouns" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Pronouns becoming standard
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Pronoun inclusion in email signatures has moved from being notable to being
                routine in a wide range of professional contexts. According to workplace
                survey data from 2025, over 40% of employees at companies with more than
                500 people include pronouns in their email signatures — up from around 15%
                in 2021.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The standardized format has also settled: &ldquo;She/Her&rdquo; or &ldquo;He/Him&rdquo; or
                &ldquo;They/Them&rdquo; on the same line as the name, or on a dedicated line between
                the name and the title. The older format of &ldquo;Pronouns: she/her&rdquo; is fading
                in favor of just the pronouns themselves.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Industry variation remains significant. Tech, education, NGOs, and healthcare
                organizations have high adoption. Legal, financial services, and traditional
                manufacturing sectors have lower adoption — not because of explicit policy,
                but cultural convention.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-with-pronouns" className="text-blue-600 hover:underline">
                  email signatures with pronouns guide
                </Link>{" "}
                covers formatting, placement, and how to implement this across a team
                consistently.
              </p>
            </section>

            {/* Section 6 */}
            <section id="interactive-banners" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Interactive and rotating banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The static promotional banner in email signatures has been joined by two
                more sophisticated approaches: rotating banners (that change on a schedule)
                and interactive banners (that respond to clicks or recipient data).
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Rotating banners
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                These work by serving the banner image from a server that can change what
                image is returned based on the date or a rotation schedule. The email HTML
                stays the same — the image URL always points to the same server endpoint —
                but what that endpoint returns changes. This means a banner you sent in
                January could show a new message if the recipient scrolls back to it in March.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Practical use: rotating between current marketing campaigns without
                touching the signature HTML. The downside is a dependency on an external
                server — if it goes down, the banner breaks.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Dynamic per-recipient signatures
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                More advanced systems can serve different signature content based on who
                the recipient is — pulling in CRM data to show a recipient-specific message,
                or showing different banners to prospects versus existing customers. This
                requires integration between your email client, signature platform, and CRM.
                It&rsquo;s available in enterprise tools like Exclaimer and Opensense, though
                not in most SMB-oriented signature generators.
              </p>
            </section>

            {/* Section 7 */}
            <section id="ai-layouts" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                AI-assisted signature generation
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                AI has entered the email signature space, and in 2026 it&rsquo;s actually useful
                rather than just a marketing claim. The primary applications:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "Layout selection from context",
                    body: "AI tools can suggest appropriate layout styles based on your industry, role, and company type. A physician at a hospital gets different layout recommendations than a freelance copywriter. This works reasonably well — better than a blank template picker.",
                  },
                  {
                    title: "Brand color extraction",
                    body: "Some generators now extract brand colors from your company website automatically and apply them to your signature. This saves the step of finding your HEX codes, and it ensures consistency with your web presence.",
                  },
                  {
                    title: "Copy suggestions for CTAs",
                    body: "AI can suggest alternative wording for signature CTAs based on your role and goal. 'Schedule a call' vs 'Book a 15-minute intro' vs 'See our latest case study' — it can generate variations to test.",
                  },
                  {
                    title: "Optimization based on engagement data",
                    body: "In more advanced tools, AI analyzes which signature elements generate the most clicks and surfaces recommendations: 'Signatures in your industry with a photo see 23% more response rates' or 'Booking links in this context average 1.4% CTR vs 0.6% for blog links.'",
                  },
                ].map((item) => (
                  <div key={item.title} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                NeatStamp&rsquo;s{" "}
                <Link href="/ai-email-signature-generator" className="text-blue-600 hover:underline">
                  AI email signature generator
                </Link>{" "}
                handles layout selection and brand color extraction. You provide your details,
                and it builds a layout matched to your role and company — then you customize
                from there.
              </p>
            </section>

            {/* Section 8 */}
            <section id="qr-codes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                QR codes — niche but real
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                QR codes in email signatures were predicted to go mainstream for years before
                they actually started appearing with any regularity. By 2026, they&rsquo;ve found
                a genuine niche — not as a mainstream trend, but as a useful tool in specific
                contexts.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Where QR codes in signatures actually work
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Conference and event follow-up emails — recipients often want to save contact details and a QR code linking to your vCard makes that easy on mobile",
                  "Sales introductions — linking to a product demo or pricing page, scanned from a phone while the sender is on a call",
                  "Physical-to-digital bridging — when the email is likely to be printed (invoices, formal correspondence), a QR code keeps the digital link accessible",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Where they don&rsquo;t add value
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                In everyday business email between people who already know each other,
                a QR code adds visual complexity for no practical gain. A colleague reading
                your email on their laptop isn&rsquo;t going to pick up their phone to scan your
                QR code. The use case simply doesn&rsquo;t match the context.
              </p>
            </section>

            {/* Section 9 */}
            <section id="trends-down" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Trending down in 2026
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                These elements haven&rsquo;t disappeared, but they&rsquo;re used less — and in most
                cases, that&rsquo;s the right direction.
              </p>

              <div className="space-y-5">
                {[
                  {
                    trend: "Animated GIFs",
                    detail:
                      "Animated GIFs in email signatures peaked around 2019–2021. By 2026, they're rare among companies with any design sensibility, for two reasons: (1) Outlook on Windows renders GIFs as static images, so most corporate recipients see a frozen first frame. (2) Users find them distracting in a medium where they're trying to read content. The GIF's moment has passed in this context.",
                    decline: "Strong",
                  },
                  {
                    trend: "Long legal disclaimers",
                    detail:
                      "The three-paragraph 'this email is confidential and may contain privileged information' boilerplate that once appeared on every corporate email has been under scrutiny for years. Legal consensus is that such disclaimers have minimal enforceability, and recipients ignore them completely. In regulated industries where disclaimers are genuinely required, the move is toward concise, specific language — not generic paragraphs.",
                    decline: "Moderate",
                  },
                  {
                    trend: "Multiple social media icons",
                    detail:
                      "The row of six or eight social icons — LinkedIn, Twitter, Facebook, Instagram, YouTube, Pinterest, TikTok — is declining sharply. The practical case against it is simple: most recipients will never click most of those icons. LinkedIn is almost always worth including. Twitter/X has lost its dominant position as a professional networking platform. The trend is: LinkedIn only, or LinkedIn plus one platform where you're genuinely active and your audience would care.",
                    decline: "Strong",
                  },
                  {
                    trend: "Non-web-safe custom fonts",
                    detail:
                      "The hope that custom fonts (Raleway, Nunito, Poppins) would render in email signatures has not been realized at scale. Outlook desktop — still a dominant email client in enterprise environments — renders them as system defaults. The lesson has sunk in for most designers: web-safe fonts (Arial, Georgia, Verdana) are the only reliable choice for signature text.",
                    decline: "Moderate",
                  },
                  {
                    trend: "Inspirational quotes",
                    detail:
                      "Quotes in email signatures have been declining for a decade and continue to do so. They add length, they're often irrelevant to the email content, and they can misalign with company culture in professional contexts. The rare exception: if your personal brand is explicitly built around a philosophy and your audience expects it. For everyone else, it's noise.",
                    decline: "Steady",
                  },
                ].map((item) => (
                  <div key={item.trend} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">{item.trend}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ml-3 ${
                          item.decline === "Strong"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.decline} decline
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                The{" "}
                <Link href="/blog/email-signature-animated-gif" className="text-blue-600 hover:underline">
                  email signature animated GIF guide
                </Link>{" "}
                covers the rendering issues in detail if you want to understand exactly why
                GIFs are such a poor fit for most email clients.
              </p>
            </section>

            {/* Section 10 */}
            <section id="new-in-2026" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What&rsquo;s genuinely new in 2026
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Beyond the trends that have been developing for a few years, there are
                a few things that are specifically new or accelerating in 2026.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Signature A/B testing as a standard practice",
                    body: "A/B testing email signature banners used to require custom tracking infrastructure. In 2026, several tools (including enterprise-tier signature platforms) offer built-in testing and analytics. This has made the practice more accessible and created a feedback loop that's improving banner effectiveness across the industry.",
                  },
                  {
                    title: "Signature analytics tied to CRM",
                    body: "The connection between signature clicks and CRM deal stages is becoming more direct. Sales teams can now see, in their CRM, that a prospect clicked the case study banner in a signature — and trigger follow-up sequences based on that behavior. This was technically possible before 2026 with UTM + CRM integration, but it's become a standard feature in some platforms.",
                  },
                  {
                    title: "Accessibility as a design requirement",
                    body: "Screen reader compatibility, alt text on signature images, and sufficient color contrast are becoming standard requirements rather than afterthoughts. Partly driven by WCAG 2.2 awareness, partly by increasing use of accessibility-testing tools. NeatStamp enforces minimum contrast ratios and prompts for alt text in the editor.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                    <h3 className="font-semibold text-indigo-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-indigo-800 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 11 */}
            <section id="sustainability" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Sustainability footers
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A genuinely new trend in 2026: brief sustainability statements in email
                signatures, particularly in companies with public ESG commitments. This is
                different from the old &ldquo;please consider the environment before printing&rdquo;
                line (which nobody took seriously and which is firmly in the &ldquo;declining&rdquo;
                category). These are specific, substantive statements.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Examples of the new format
                </p>
                <div className="space-y-2 text-sm font-mono text-slate-600 italic">
                  <p>&ldquo;Clearfield Group is carbon neutral as of 2025.&rdquo;</p>
                  <p>&ldquo;We&rsquo;re a certified B Corp. Here&rsquo;s what that means: [link]&rdquo;</p>
                  <p>&ldquo;1% of our revenue goes to environmental nonprofits via 1% for the Planet.&rdquo;</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The distinguishing characteristics: specific, verifiable, and linked to
                evidence. Not vague aspiration, not environmental advice to the recipient.
                If your company has a genuine sustainability milestone or certification, a
                one-line mention in the signature with a link is appropriate. If not, don&rsquo;t
                add a placeholder — it reads as greenwashing.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For a broader look at 2026 signature standards, the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  email signature best practices guide
                </Link>{" "}
                is kept current. And if you want to build a signature that reflects any
                of these trends, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                and{" "}
                <Link href="/ai-email-signature-generator" className="text-blue-600 hover:underline">
                  AI generator
                </Link>{" "}
                both work from current design conventions rather than templates from five
                years ago.
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

            {/* Related */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related reading</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/blog/email-signature-dark-mode",
                    title: "Email Signature Dark Mode",
                    desc: "Technical guide to dark mode compatibility",
                  },
                  {
                    href: "/blog/email-signature-animated-gif",
                    title: "Animated GIFs in Email Signatures",
                    desc: "Why they mostly don't work, and what to use instead",
                  },
                  {
                    href: "/blog/email-signature-best-practices",
                    title: "Email Signature Best Practices",
                    desc: "The full 2026 best practices guide",
                  },
                  {
                    href: "/email-signature-with-pronouns",
                    title: "Email Signatures with Pronouns",
                    desc: "How to add pronouns professionally",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 text-sm mb-1">{link.title}</p>
                    <p className="text-xs text-slate-500">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build a signature that reflects 2026 standards
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                The NeatStamp editor and AI generator use current design conventions —
                minimal, dark-mode compatible, mobile-friendly. Free to try.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Open the Editor
                </Link>
                <Link
                  href="/ai-email-signature-generator"
                  className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors border border-blue-400"
                >
                  Try AI Generator
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
