import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Spam Filter Fix (7 Causes)",
  description:
    "Your email signature might be sending emails to spam. Here are 7 specific causes — image hosting reputation, base64 bloat, too many links, HTML complexity — and how to fix each one.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-spam-filter-fix",
  },
};

const faqs = [
  {
    q: "Can an email signature cause emails to go to spam?",
    a: "Yes — and it's more common than most people realize. The main culprits are base64-encoded images (which inflate HTML file size), too many links (especially if any point to low-reputation domains), and overly complex HTML. Spam filters score the full email including the signature, not just the body.",
  },
  {
    q: "How many links in an email signature is too many?",
    a: "More than 5 external links starts to look suspicious to spam filters. A typical safe signature has 3–4: your website, LinkedIn, maybe one other social platform, and a phone number (tel: link). Every additional link adds a small spam risk, especially if any domain has a poor reputation.",
  },
  {
    q: "Should I use base64 images in my email signature?",
    a: "No. Base64 images embed the image data directly in the HTML, which dramatically inflates email size. A 20KB image becomes roughly 27KB of text in the HTML. Gmail clips emails over 102KB. Spam filters flag high base64 ratios. Always use externally hosted images with a standard src URL.",
  },
  {
    q: "What is a deliverability score for email signatures?",
    a: "A deliverability score is a numerical rating of how likely your signature is to trigger spam filters. It checks factors like HTML complexity, link count, image hosting reputation, base64 usage, and overall HTML-to-text ratio. NeatStamp's deliverability checker scores your signature and flags specific issues.",
  },
  {
    q: "Does an email signature affect SPF, DKIM, and DMARC?",
    a: "Not directly — SPF, DKIM, and DMARC operate at the server/domain level. But a badly formatted signature can still land emails in spam through content filtering even when your DNS records are perfect. Good authentication plus a clean signature gives you the best chance of consistent inbox delivery.",
  },
];

export default function EmailSignatureSpamFilterFixPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Spam Filter Fix",
            url: "https://neatstamp.com/blog/email-signature-spam-filter-fix",
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
            <span className="text-slate-700">Email Signature Spam Filter Fix</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  Deliverability
                </span>
                <span className="text-sm text-slate-400">13 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Spam Filter Fix: 7 Causes (and How to Fix Each One)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                A mistake I see all the time: someone spends hours perfecting their email
                signature, then wonders why important emails keep landing in the recipient&rsquo;s
                junk folder. The signature is often the culprit. Spam filters don&rsquo;t just
                analyze your message body — they score the entire email, including the HTML
                in your footer. Here&rsquo;s exactly what triggers them and how to fix each issue.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 13 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#the-problem", "Why your signature triggers spam filters"],
                  ["#how-filters-work", "How spam filters actually score emails"],
                  ["#7-causes", "7 specific causes (and fixes)"],
                  ["#test-deliverability", "How to test your signature's deliverability"],
                  ["#our-tool", "NeatStamp's deliverability score checker"],
                  ["#faq", "Frequently asked questions"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-blue-600 hover:text-blue-800 hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1 */}
            <section id="the-problem" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why your signature triggers spam filters
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most people assume spam filters only look at the subject line and message body.
                They don&rsquo;t. Modern spam filters — SpamAssassin, Microsoft&rsquo;s SmartScreen,
                Google&rsquo;s spam engine — score the full email. That means every image, every link,
                every line of HTML in your signature is part of the calculation.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The problem gets worse in cold outreach. If you&rsquo;re emailing someone for the
                first time, there&rsquo;s no prior relationship to weight in your favor. The spam
                filter has nothing to go on except the content. A poorly built signature can
                push a borderline email from &ldquo;inbox&rdquo; to &ldquo;spam&rdquo; on its own.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                I&rsquo;ve seen this happen repeatedly: a sales team notices their open rates
                drop after updating their signature. The new design has more images, more
                links, and fancier HTML. All of those are spam signals. The signature isn&rsquo;t
                obviously wrong — it looks fine in preview — but it&rsquo;s degrading deliverability
                across every email the team sends.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The good news: these are fixable, specific problems. Let&rsquo;s go through them
                one by one. And if you want to check where your current signature stands, the{" "}
                <Link href="/email-signature-deliverability" className="text-blue-600 hover:underline">
                  deliverability guide
                </Link>{" "}
                and NeatStamp&rsquo;s built-in score checker are the fastest way to get a diagnosis.
              </p>
            </section>

            {/* Section 2 */}
            <section id="how-filters-work" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How spam filters actually score emails
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Spam filters use a points-based system. Each suspicious element adds points
                to a score. If the total score crosses a threshold, the email goes to spam
                (or gets rejected entirely). No single factor usually causes a failure on its
                own — it&rsquo;s the combination that kills you.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                SpamAssassin, which underlies many corporate mail servers, uses a default
                threshold of 5.0 points. A typical cold outreach email without a signature
                might score 0.5–1.5 points — well inside the safe zone. Add a complex
                signature with 8 social icons, 3 externally hosted images from a shared
                image hosting service, and a bunch of nested HTML tables, and you can add
                another 2–3 points. Now you&rsquo;re approaching the threshold before the
                recipient even reads a word of your message.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The factors that contribute most to signature-related spam scoring are:
              </p>
              <ul className="space-y-2 mb-4 text-slate-600">
                {[
                  "HTML-to-text ratio (lots of HTML markup relative to readable text)",
                  "Base64-encoded images embedded directly in the HTML",
                  "External image sources from low-reputation domains",
                  "Excessive external links (especially to unfamiliar domains)",
                  "HTML complexity and deeply nested tables",
                  "Use of certain trigger phrases in alt text or link anchor text",
                  "Total email file size exceeding client thresholds",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Each of these is something you can fix. Here&rsquo;s how.
              </p>
            </section>

            {/* Section 3 — 7 Causes */}
            <section id="7-causes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                7 specific causes (and fixes)
              </h2>

              {/* Cause 1 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Base64-encoded images
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3">
                  This is the most common cause I see, and it&rsquo;s often introduced by
                  signature generators that embed images directly into the HTML to avoid
                  external hosting. The logic seems sensible — no external dependency — but
                  it backfires badly.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Base64 encoding takes binary image data and converts it to ASCII text.
                  A 20KB PNG logo becomes roughly 27KB of text like{" "}
                  <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                    data:image/png;base64,iVBORw0KGgo...
                  </code>
                  . This does two things wrong at once: it dramatically inflates the email
                  file size, and it creates a very high ratio of non-readable characters,
                  which spam filters treat with suspicion.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Gmail&rsquo;s 102KB clip limit means that a long email thread with a
                  base64-encoded signature can hit the limit fast. When Gmail clips a
                  message, your signature is the first thing to disappear — the recipient
                  sees &ldquo;[Message clipped]&rdquo; exactly where you want them to see your
                  contact details.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-1">The fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Host your images externally and reference them with a standard HTTPS URL.
                    Your company website, a CDN, or NeatStamp Pro (which hosts your images
                    automatically) all work. Never use a base64 data URI for signature images.
                  </p>
                </div>
              </div>

              {/* Cause 2 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Images hosted on low-reputation domains
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Where you host your images matters more than most people know. Spam filters
                  check the domains referenced in your email — not just the links you click,
                  but also the image source URLs. If your signature image is hosted on a
                  shared image hosting service that spammers also use (think free image hosts
                  or certain website builder domains), your email inherits their reputation
                  problem.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  I&rsquo;ve seen this catch people who use services like Imgur, Postimage, or
                  other free image hosts that are convenient but widely abused by spammers.
                  The domain may be on a block list maintained by Spamhaus or similar
                  organizations.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-1">The fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Host signature images on your own company domain (e.g.,{" "}
                    <code className="text-xs bg-green-100 px-1 py-0.5 rounded font-mono">
                      images.yourcompany.com/logo.png
                    </code>
                    ) or a reputable CDN like Cloudflare, AWS CloudFront, or NeatStamp&rsquo;s
                    hosted CDN. Check whether your image hosting domain appears on any major
                    block lists using MXToolbox&rsquo;s blacklist checker.
                  </p>
                </div>
              </div>

              {/* Cause 3 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Too many external links
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Every link in your signature is a signal spam filters analyze. A signature
                  with 8 social media links, a booking link, a website link, a portfolio
                  link, and a promotional banner link has 12+ URLs for the filter to check.
                  Spam filters are suspicious of emails that are link-heavy relative to
                  text content — because that&rsquo;s exactly what phishing emails look like.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  The risk multiplies if any of those links redirect through a URL shortener
                  (bit.ly, t.co, etc.). Many spam filters flag redirect chains, especially
                  from well-known shortener domains that are heavily used in spam campaigns.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-1">The fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Limit your signature to 4–5 external links maximum. Keep only the social
                    profiles where you&rsquo;re actually active and relevant to recipients.
                    Never use link shorteners in a signature — link directly to the final URL.
                    See the{" "}
                    <Link
                      href="/blog/email-signature-best-practices"
                      className="text-green-700 underline"
                    >
                      best practices guide
                    </Link>{" "}
                    for a full breakdown of what belongs and what doesn&rsquo;t.
                  </p>
                </div>
              </div>

              {/* Cause 4 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Excessive HTML complexity and nested tables
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Email signatures are still built with HTML tables because table-based
                  layouts are the only reliable way to achieve consistent rendering across
                  all email clients. But there&rsquo;s a big difference between a clean
                  two-column table structure and a mess of eight nested tables, each with
                  inline styles and spacer cells.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Excessive HTML complexity raises two spam signals at once: it makes
                  the HTML-to-text ratio worse (more markup relative to readable words),
                  and it resembles the obfuscated HTML that some spammers use to hide
                  keywords from text-based filters.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-1">The fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Use the simplest table structure that achieves your layout. A good rule:
                    if you&rsquo;re more than 3 levels of nesting deep, you&rsquo;ve gone too far. Use the{" "}
                    <Link href="/editor" className="text-green-700 underline">
                      NeatStamp editor
                    </Link>{" "}
                    to generate clean, minimal HTML — all signatures are single-pass
                    optimized and keep the markup as lean as possible.
                  </p>
                </div>
              </div>

              {/* Cause 5 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Spam trigger words in alt text or link text
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Alt text on signature images gets scored like any other text in the email.
                  If your banner image has alt text that reads &ldquo;FREE TRIAL — LIMITED TIME
                  OFFER!&rdquo;, that&rsquo;s a spam trigger even if the image itself is perfectly
                  innocent. Spam filters read alt text because spammers sometimes put their
                  actual message in alt text and hide it behind a blank image.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Similarly, the visible text of your links matters. A link that says &ldquo;Click
                  here to claim your free gift&rdquo; is going to score points even if it links to
                  your perfectly legitimate company homepage.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-1">The fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Write descriptive, factual alt text: &ldquo;Company logo&rdquo;, &ldquo;Spring 2026
                    product announcement&rdquo;. For links, use the actual destination or a simple
                    description: &ldquo;Schedule a call&rdquo; rather than &ldquo;Click here free&rdquo;. Avoid
                    exclamation marks and all-caps in alt text entirely.
                  </p>
                </div>
              </div>

              {/* Cause 6 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    6
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Mismatched link text and destination URLs
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3">
                  This is a classic phishing signal that spam filters are trained to catch.
                  When the visible text of a link says one domain but the actual href points
                  to a different domain, that&rsquo;s suspicious — even if both are legitimate.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  An example I&rsquo;ve seen: a consultant whose signature said{" "}
                  <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                    www.companyname.com
                  </code>{" "}
                  as the link text, but the href pointed to a different domain they were
                  redirecting through for tracking purposes. The filter flagged it as a
                  potential phishing attempt because the visible URL didn&rsquo;t match the
                  actual destination.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-1">The fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Make sure the visible text of any URL links matches the actual
                    destination domain. Don&rsquo;t use tracking redirects that change the domain.
                    If you need click tracking, use UTM parameters on the actual URL rather
                    than a separate redirect domain.
                  </p>
                </div>
              </div>

              {/* Cause 7 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    7
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Poor HTML-to-text ratio
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Spam filters look at the ratio of raw HTML markup to readable text content.
                  A legitimate email typically has a reasonable balance — maybe 2–3x as much
                  HTML as visible text. An email with a very complex, image-heavy signature
                  and a short two-line message can have a ratio of 20:1 or higher. That looks
                  like spam.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  This gets worse when the signature contains many images and few words.
                  If your signature has a logo, a headshot, a banner, and 8 social icons,
                  but only 3 lines of text, the ratio is terrible.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-1">The fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Keep signatures lean: 1 logo, optional headshot, 3–5 lines of text contact
                    info, 3–4 social links. Reduce image count. Write longer emails — a
                    2-sentence email with a massive signature is more likely to flag than a
                    full paragraph with the same signature. For mobile-rendering alongside
                    deliverability, see the{" "}
                    <Link
                      href="/email-signature-mobile-friendly"
                      className="text-green-700 underline"
                    >
                      mobile-friendly signature guide
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 — Testing */}
            <section id="test-deliverability" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to test your signature&rsquo;s deliverability
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Testing isn&rsquo;t complicated, but you need to test the right way. Here are four
                methods I use, in order of reliability.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                1. Send a test email to a Gmail address you control
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail has one of the most aggressive spam filters of any major email provider.
                If an email passes Gmail&rsquo;s filter consistently, it will usually pass others
                too. Send 5–10 test emails from different senders (or with the signature
                appended manually) and check whether they land in inbox or spam. Check the
                spam folder — don&rsquo;t assume inbox arrival means the filter passed.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                2. Use mail-tester.com
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Mail-tester.com gives you a temporary address to send to. It then analyzes
                the received email and gives you a score out of 10, with a detailed breakdown
                of what triggered each deduction. This is the fastest free way to see which
                specific elements of your email (including the signature) are causing issues.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                3. Check your image hosting domain against blacklists
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Use MXToolbox&rsquo;s blacklist checker (mxtoolbox.com/blacklists.aspx) to check
                the domain where your signature images are hosted. If it appears on any of
                the 100+ block lists MXToolbox checks, that&rsquo;s a direct problem. Move your
                images to a different host.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                4. Inspect the raw HTML size
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Open your email client&rsquo;s &ldquo;View source&rdquo; or &ldquo;Show original&rdquo; option on a sent
                email and look at the total HTML file size. In Gmail, click the three-dot
                menu and &ldquo;Show original&rdquo; — the raw message size is shown at the top. If
                you&rsquo;re within 20KB of the 102KB Gmail clip limit, your base64 images or
                complex HTML need to go.
              </p>

              <p className="text-slate-600 leading-relaxed">
                For a comprehensive look at all the factors that affect where your emails land,
                read the full{" "}
                <Link href="/email-signature-deliverability" className="text-blue-600 hover:underline">
                  email signature deliverability guide
                </Link>
                .
              </p>
            </section>

            {/* Section 5 — Our tool */}
            <section id="our-tool" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp&rsquo;s deliverability score checker
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every signature built in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                includes an automated deliverability score. It checks seven factors while
                you build and flags issues in real time before you copy the signature into
                your email client.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    check: "Image hosting",
                    detail: "Verifies all images are externally hosted (never base64). NeatStamp Pro hosts your images on our CDN automatically.",
                  },
                  {
                    check: "Link count",
                    detail: "Flags if you exceed 5 external links and shows which ones are adding risk.",
                  },
                  {
                    check: "HTML complexity",
                    detail: "Measures nesting depth and total markup-to-text ratio. Warns when either metric gets high.",
                  },
                  {
                    check: "Alt text quality",
                    detail: "Checks that all images have descriptive alt text with no spam trigger words.",
                  },
                  {
                    check: "Link consistency",
                    detail: "Verifies visible link text matches the destination domain for every link.",
                  },
                  {
                    check: "Total HTML size",
                    detail: "Estimates the contribution of your signature to total email size, flagging if it risks pushing Gmail over the 102KB limit.",
                  },
                  {
                    check: "Redirect detection",
                    detail: "Warns if any links pass through known redirect or URL shortener domains.",
                  },
                ].map((item) => (
                  <div key={item.check} className="flex gap-3 p-4 border border-slate-200 rounded-xl">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">{item.check}</p>
                      <p className="text-sm text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The score is shown as a number from 0–100. Signatures scoring 85+ are
                considered low-risk for spam filtering. Below 70, there&rsquo;s at least one
                specific issue to fix before using the signature in any high-stakes outreach.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For team use, where you need consistent deliverability across 10–200 employees,
                the{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  NeatStamp Teams plan
                </Link>{" "}
                checks each team member&rsquo;s signature and flags deviations from the master
                template — so you catch problems before they affect the entire company&rsquo;s
                sender reputation.
              </p>
            </section>

            {/* Quick wins summary */}
            <section className="mb-12">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Quick wins — do these first
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  If you don&rsquo;t have time to go through the full checklist, these three
                  changes will have the biggest impact on deliverability:
                </p>
                <ol className="space-y-3">
                  {[
                    "Switch all signature images from base64 to externally hosted URLs. This alone can reduce your spam score by 20–30%.",
                    "Cut your external link count to 4 or fewer. Remove social platforms you don't actively use.",
                    "Check your image hosting domain against MXToolbox's blacklist. If it's flagged, move the images to your own domain.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Related reads */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related reading</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "/email-signature-dark-mode-compatible", label: "Dark mode-compatible signatures" },
                  { href: "/email-signature-mobile-friendly", label: "Mobile-friendly signature guide" },
                  { href: "/blog/email-signature-size", label: "Email signature size guide" },
                  { href: "/professional-email-signature", label: "Professional email signature guide" },
                  { href: "/email-signature-for-business", label: "Business email signatures" },
                  { href: "/templates", label: "Browse clean signature templates" },
                  { href: "/email-signature-gmail", label: "Gmail signature guide" },
                  { href: "/email-signature-outlook", label: "Outlook signature guide" },
                  { href: "/email-signature-for-teams", label: "Team signature management" },
                  { href: "/alternative-to-wisestamp", label: "NeatStamp vs. WiseStamp" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-slate-700 hover:text-blue-700"
                  >
                    <span className="text-blue-400">→</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group border border-slate-200 rounded-xl">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                      {faq.q}
                      <svg
                        className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Check your signature&rsquo;s deliverability score
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Build or import your signature in NeatStamp to get an instant deliverability
                score with specific fixes. Free — no account needed.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Check My Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
