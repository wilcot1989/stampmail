import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Deliverability: 10 Rules That Protect You",
  description:
    "How email signatures affect deliverability, spam scores, and inbox placement. Image sizing, link limits, HTML weight, and our deliverability checker.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-deliverability-guide",
  },
};

const faqs = [
  {
    q: "Can my email signature cause my emails to land in spam?",
    a: "Yes, it can contribute to that outcome. A signature with too many links, large embedded images, excessive HTML, certain banned words, or links to low-reputation domains can push your spam score high enough to trigger filters. No single element usually causes this alone — it's typically a combination of factors. The most common culprit is either base64-encoded images (which massively inflate email file size) or multiple external links with no text context.",
  },
  {
    q: "How many links in an email signature is too many?",
    a: "Spam filters don't have a hard cutoff, but best practice is 3–5 links maximum in a signature. That might include: website, LinkedIn, phone (tel: link), and an optional CTA. Beyond that, each additional link incrementally increases your spam score, especially if those links point to different domains.",
  },
  {
    q: "Should I use base64 images or hosted images in my email signature?",
    a: "Hosted images, always. Base64 encoding inflates image size by approximately 33%, bloating email file sizes significantly. Large file sizes (above 100KB total) reliably increase spam scores. Additionally, many spam filters specifically flag high base64 content as a signal of image-heavy spam. Use externally hosted images referenced by URL instead.",
  },
  {
    q: "What is the ideal total HTML size for an email signature?",
    a: "Aim for under 15KB of HTML (just the signature HTML, not counting externally loaded images). Under 10KB is better. Gmail clips emails over 102KB total — if your signature HTML contributes significantly to that, long email threads may get clipped, hiding your signature entirely.",
  },
  {
    q: "Does NeatStamp's deliverability checker scan my live emails or just the signature HTML?",
    a: "NeatStamp's deliverability checker analyzes your signature HTML directly — it checks image hosting method, file size, link count, domain reputation indicators, HTML weight, and known spam trigger words. It doesn't send test emails or require access to your email account. The check runs in seconds and gives you a score with specific recommendations.",
  },
];

export default function EmailSignatureDeliverabilityGuidePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Deliverability Guide",
            url: "https://neatstamp.com/blog/email-signature-deliverability-guide",
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
            <span className="text-slate-700">Deliverability Guide</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Deliverability
                </span>
                <span className="text-sm text-slate-400">15 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Deliverability Best Practices: 10 Rules to Keep Your Emails Out of Spam
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Your email signature can hurt your deliverability in ways most people don&rsquo;t
                expect. Large images, too many links, messy HTML, and certain hosting choices all
                contribute to spam scores. This guide covers all of it — with specific numbers,
                real examples, and a checklist you can use right now.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 15 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#how-signatures-affect-deliverability", "How signatures affect deliverability"],
                  ["#10-rules", "The 10 rules for deliverability-safe signatures"],
                  ["#image-rules", "Image rules in detail"],
                  ["#link-rules", "Link rules in detail"],
                  ["#html-weight", "HTML weight and file size"],
                  ["#spam-words", "Spam trigger words in signatures"],
                  ["#testing", "How to test your signature's deliverability impact"],
                  ["#deliverability-checker", "NeatStamp's deliverability checker"],
                  ["#checklist", "Final checklist"],
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
            <section id="how-signatures-affect-deliverability" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How signatures affect deliverability
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Email deliverability is determined by spam filters evaluating hundreds of signals.
                Your email signature contributes to several of those signals simultaneously —
                email body size, link count, link domain reputation, image hosting method, and
                HTML complexity.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The spam scoring model
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Spam filters like SpamAssassin assign weighted point values to signals. No single
                signal usually tips the balance — emails are scored cumulatively. A signature with
                one or two issues might not cause problems. A signature with five issues on top of
                a marketing-heavy email body can.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The key insight is that your signature represents a consistent element across
                every email you send. If your signature has a deliverability problem, that
                problem affects 100% of your outbound emails — not just one campaign.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The four ways signatures hurt deliverability
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    way: "File size inflation",
                    detail: "Base64-encoded images bloat the email HTML. Large emails (over 100KB) trigger spam signals and are also clipped by Gmail. A single 20KB image encoded as base64 adds approximately 27KB of HTML text.",
                    impact: "High",
                  },
                  {
                    way: "Link count and link domain diversity",
                    detail: "Each link in your signature is an external reference that spam filters evaluate. Multiple links to different domains — website, LinkedIn, Twitter, Instagram, Calendly, portfolio site — multiply the number of domain reputation checks. Any one of those domains having reputation issues can affect your score.",
                    impact: "Medium–High",
                  },
                  {
                    way: "HTML complexity",
                    detail: "Nested tables, CSS style blocks, non-standard HTML attributes, and inline JavaScript (never do this in a signature) all contribute to complexity that spam filters flag. Clean, minimal HTML is consistently better for deliverability.",
                    impact: "Medium",
                  },
                  {
                    way: "Spam trigger words",
                    detail: "Certain words and phrases in the text of your signature can contribute to spam scores — particularly promotional language, financial terms, or excessive capitalisation. These are more often a problem with signature banners and promotional CTAs than with the contact information section.",
                    impact: "Low–Medium",
                  },
                ].map((item) => (
                  <div key={item.way} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-900 text-sm">{item.way}</h4>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-3 ${
                        item.impact === "High"
                          ? "bg-red-100 text-red-700"
                          : item.impact === "Medium–High"
                          ? "bg-orange-100 text-orange-700"
                          : item.impact === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2 — 10 Rules */}
            <section id="10-rules" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The 10 rules for deliverability-safe signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These rules come from spam filter documentation, email deliverability research, and
                real-world testing. Follow all 10 and your signature will be essentially neutral from
                a deliverability standpoint.
              </p>

              <div className="space-y-5">
                {[
                  {
                    rule: 1,
                    title: "Never embed images as base64",
                    detail: "Host all images externally and reference them by URL. Base64 encoding inflates file size, looks suspicious to spam filters, and is stripped by several email clients anyway. Use a CDN or your company website to host your logo and headshot.",
                    spec: "File size impact: a 20KB image becomes ~27KB of base64 text",
                  },
                  {
                    rule: 2,
                    title: "Keep total HTML under 15KB",
                    detail: "The HTML code of your signature — excluding the content of externally hosted images — should be under 15KB. Under 10KB is better. Measure this by saving your signature HTML to a .txt file and checking the file size.",
                    spec: "Gmail clips entire emails above 102KB total. Signatures contribute.",
                  },
                  {
                    rule: 3,
                    title: "Use a maximum of 5 links",
                    detail: "Every link is a potential spam signal. Choose your links carefully: website, one social profile (LinkedIn is the safest choice), phone (tel: link), email (mailto: link), and one optional CTA. Cut everything else. Three links is ideal.",
                    spec: "Each additional link beyond 5 incrementally increases your SpamAssassin score",
                  },
                  {
                    rule: 4,
                    title: "Keep all links on the same domain or well-known platforms",
                    detail: "Links to your company website and to established platforms (LinkedIn, GitHub) are low-risk. Links to unusual domains, URL shorteners, or newly registered domains can hurt your score. Never use bit.ly or similar shorteners — spam filters distrust them.",
                    spec: "URL shorteners can add 0.5–1.0 SpamAssassin points",
                  },
                  {
                    rule: 5,
                    title: "Host images on a reputable CDN",
                    detail: "Your image hosting domain affects your deliverability. Images hosted on a domain with low reputation or one that's been used for spam can hurt your score. NeatStamp's CDN is specifically maintained for email signature image hosting with a clean sending reputation.",
                    spec: "Your own company domain or an established CDN (NeatStamp, AWS, Cloudflare) are the safest choices",
                  },
                  {
                    rule: 6,
                    title: "Optimise image file sizes",
                    detail: "Large images load slowly and are disproportionate to the context of an email signature. Logo: under 20KB. Headshot: under 25KB. Banner: under 40KB. Use PNG for graphics with transparency or text, JPG for photographs. WebP has limited email client support and should be avoided.",
                    spec: "Total signature images: aim for under 60KB combined",
                  },
                  {
                    rule: 7,
                    title: "Set explicit image dimensions in HTML attributes",
                    detail: "Use both width and height HTML attributes on every image element — not just CSS. Without them, Outlook renders images at full size, which can make a 2x retina image display at 2–4x its intended size. Explicit dimensions prevent layout-breaking surprises.",
                    spec: "Example: <img src='...' width='150' height='50' style='width:150px;height:50px;'>",
                  },
                  {
                    rule: 8,
                    title: "Avoid promotional language in your signature",
                    detail: "Words and phrases that trigger spam filters are more likely to appear in signature banners than in contact info. Avoid: FREE, guaranteed, limited offer, act now, click here, no cost, earn money, buy now. Your CTA link text should be descriptive and specific, not generic ('Book a call' not 'CLICK HERE FOR FREE CONSULTATION!!!').",
                    spec: "Exclamation marks in signatures can add 0.1–0.3 SpamAssassin points each",
                  },
                  {
                    rule: 9,
                    title: "Use clean, table-based HTML",
                    detail: "Email HTML should use table-based layouts with inline styles. Avoid CSS class attributes (many email clients ignore them), JavaScript (never use it), CSS hover states, media queries in the signature HTML (use only for the enclosing email template), and non-standard HTML5 elements. The simpler the HTML, the better.",
                    spec: "Spam filters assign higher trust to simple, well-formed HTML",
                  },
                  {
                    rule: 10,
                    title: "Test before deploying to the team",
                    detail: "Run your signature through a deliverability checker before rolling it out. Send test emails through mail-tester.com or use NeatStamp's built-in deliverability checker. Check your spam score, image rendering, and link validity. A 10-minute test before deployment prevents issues across hundreds of emails.",
                    spec: "Target: a mail-tester.com score of 9/10 or higher",
                  },
                ].map((item) => (
                  <div key={item.rule} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.rule}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">{item.detail}</p>
                      <p className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded">{item.spec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section id="image-rules" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Image rules in detail
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Images are the most common source of deliverability problems in email signatures.
                Here are the specific numbers to aim for.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Image type</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Display size</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Actual file size</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Logo", "150–200px wide", "Under 20KB", "PNG (transparent)"],
                      ["Headshot", "80–100px square", "Under 25KB", "JPG"],
                      ["Banner / CTA", "Max 600px wide", "Under 40KB", "JPG or PNG"],
                      ["Social icon", "20–24px square", "Under 3KB each", "PNG or SVG"],
                    ].map(([type, size, fileSize, format]) => (
                      <tr key={type} className="border-b border-slate-100">
                        <td className="px-4 py-3 font-medium text-slate-700">{type}</td>
                        <td className="px-4 py-3 text-slate-600">{size}</td>
                        <td className="px-4 py-3 text-slate-600">{fileSize}</td>
                        <td className="px-4 py-3 text-slate-600">{format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Retina (2x) images without file size problems
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Retina screens display images at 2x density. A logo displayed at 150px wide needs
                a 300px source image to look crisp on retina. But a 300px PNG can get large fast.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The trick: export your logo at 2x dimensions (300px wide for a 150px display size),
                but compress it aggressively with a tool like Squoosh, TinyPNG, or ImageOptim. A
                300px PNG logo can be kept under 12KB with proper compression — it looks sharp
                on retina and doesn&rsquo;t bloat your email.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Then set the HTML attributes to display it at the intended size:
              </p>
              <div className="bg-slate-50 rounded-xl p-4 mb-4 font-mono text-xs text-slate-700 overflow-x-auto">
                {`<img src="https://cdn.yourdomain.com/logo.png" `}
                <br />
                {`     width="150" height="50" `}
                <br />
                {`     style="width:150px;height:50px;display:block;" `}
                <br />
                {`     alt="Company Name" />`}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                The actual file is 300×100px, the display size is 150×50px. Retina screens
                display it at full sharpness; standard screens display it correctly scaled.
              </p>
            </section>

            {/* Section 4 */}
            <section id="link-rules" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Link rules in detail
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Links are the second most common deliverability issue in email signatures. Here&rsquo;s
                exactly how to handle them.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The safe links in a signature
              </h3>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                {[
                  "Website — your company homepage or a dedicated landing page",
                  "Phone — tel:+44... links (these are local calls, don't hit external domain checks)",
                  "Email — mailto: links (same, no external domain)",
                  "LinkedIn — high-reputation domain, routinely trusted by spam filters",
                  "One CTA — a specific page on your own website is the safest choice",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Links to avoid
              </h3>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                {[
                  "URL shorteners (bit.ly, tinyurl.com) — often flagged because spam abuses them",
                  "Newly registered domains (under 6 months old) — lower reputation",
                  "Links to domains with known spam history — run a check at mxtoolbox.com if unsure",
                  "Instagram, TikTok, Facebook — lower relevance in business contexts and add link count risk",
                  "Calendly, Cal.com, Acuity — fine individually, but if you already have 3 links, this is #4+",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to track link clicks without hurting deliverability
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you want to measure which links in your signature get clicked, avoid using
                UTM redirect services that route through a tracking domain. Instead, use UTM
                parameters directly appended to your own domain URL:
              </p>
              <div className="bg-slate-50 rounded-xl p-4 mb-4 font-mono text-xs text-slate-700 overflow-x-auto">
                {`<!-- Avoid: -->`}
                <br />
                {`https://track.signaturetool.com/click?url=https://yoursite.com&id=abc123`}
                <br />
                <br />
                {`<!-- Use instead: -->`}
                <br />
                {`https://yoursite.com/contact?utm_source=email&utm_medium=signature&utm_campaign=sales`}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                The second approach keeps all links on your own domain, which spam filters trust
                more, and Google Analytics (or your analytics tool) still tracks the click.
              </p>
            </section>

            {/* Section 5 */}
            <section id="html-weight" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                HTML weight and file size
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The HTML of your signature — the actual code, not the images — has a direct
                impact on deliverability and user experience.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Why HTML size matters
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail clips email messages that exceed 102KB of HTML. The clipping shows a
                &ldquo;[Message clipped] View entire message&rdquo; link at the bottom of the email.
                When an email is clipped, your signature is usually the first casualty — it
                appears after the body content, so it gets cut.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your signature HTML contributes to the 102KB limit on every email. A 25KB
                signature HTML leaves only 77KB for your email body. In a long reply thread,
                each reply appends the previous emails — making clipping increasingly likely.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What inflates signature HTML size
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  { cause: "Base64 images", impact: "Very high — a single 20KB image adds ~27KB of text" },
                  { cause: "Inline CSS from design tools", impact: "Medium — design tools often generate redundant style attributes" },
                  { cause: "Social icon SVGs inlined as code", impact: "Medium — each SVG can be 1–3KB; 6 icons = 6–18KB" },
                  { cause: "Nested table structures (5+ levels deep)", impact: "Low-Medium — adds HTML overhead" },
                  { cause: "HTML comments left in the code", impact: "Low — but clean them out anyway" },
                ].map((item) => (
                  <div key={item.cause} className="flex gap-3 text-sm">
                    <span className="font-medium text-slate-700 w-52 flex-shrink-0">{item.cause}</span>
                    <span className="text-slate-500">{item.impact}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to check your signature HTML size
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Copy your signature HTML and paste it into a text file. Check the file size
                in your file system. On Mac: right-click → Get Info. On Windows: right-click
                → Properties. Aim for under 15KB. If you&rsquo;re over 20KB, identify the largest
                elements and optimise them first.
              </p>
              <p className="text-slate-600 leading-relaxed">
                NeatStamp&rsquo;s signatures are optimised to stay under 12KB for the HTML. The{" "}
                <Link href="/email-signature-deliverability" className="text-blue-600 hover:underline">
                  deliverability checker
                </Link>{" "}
                measures this automatically.
              </p>
            </section>

            {/* Section 6 */}
            <section id="spam-words" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Spam trigger words in signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Spam trigger words in email body content are well documented. They apply equally
                to signature text. The risk is highest in promotional banners and CTA buttons
                added below the contact information.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                High-risk words and phrases
              </h3>
              <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    "FREE", "No cost", "Guarantee", "Limited offer", "Act now",
                    "Click here", "Buy now", "Earn money", "Increase sales",
                    "Risk free", "100% free", "No obligation", "Winner",
                    "Congratulations", "You have been selected", "Special promotion",
                  ].map((word) => (
                    <span
                      key={word}
                      className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-mono"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Better alternatives for common signature CTAs
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  { bad: "FREE consultation — click here!", good: "Book a 30-minute call" },
                  { bad: "Get your FREE demo NOW", good: "Request a product walkthrough" },
                  { bad: "SPECIAL OFFER: 50% off this week", good: "See current pricing" },
                  { bad: "Earn more — guaranteed results", good: "See how we've helped similar companies" },
                ].map((item) => (
                  <div key={item.bad} className="grid grid-cols-2 gap-3">
                    <div className="bg-red-50 rounded-lg p-3 text-xs text-red-700 font-mono">
                      {item.bad}
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-xs text-green-700 font-mono">
                      {item.good}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Formatting that triggers spam filters
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-slate-600">
                {[
                  "ALL CAPS text — spam filters flag this aggressively",
                  "Excessive exclamation marks!!! — each one adds a small penalty",
                  "Dollar signs in quantity — $$$, $FREE$, or repeated $ symbols",
                  "Coloured text on coloured background (especially if the contrast is low — looks like hidden text tricks)",
                  "Multiple font sizes in rapid succession — associated with visual spam tactics",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 7 */}
            <section id="testing" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to test your signature&rsquo;s deliverability impact
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Testing before deployment is the most reliable way to catch problems. Here are
                the tools and methods that actually work.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                mail-tester.com
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Mail Tester is a free tool that gives you a unique test email address. Send an
                email from your account using your signature, and it analyses the email and gives
                you a spam score out of 10. It checks SPF, DKIM, DMARC, content triggers, and
                link reputation. Aim for 9/10 or higher. Free users get 3 tests per day.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Important: when testing your signature specifically, write a short, neutral email
                body (not promotional text) so the body doesn&rsquo;t influence the result. The goal
                is to isolate the signature&rsquo;s contribution.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                GlockApps
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                GlockApps tests deliverability against multiple inbox providers simultaneously —
                Gmail, Outlook, Yahoo, AOL, and others. It shows you whether your email lands in
                inbox, spam, or promotions tab across each provider. This is more useful for
                marketing campaigns but can reveal if your signature is causing inbox placement
                issues with specific providers.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                MXToolbox blacklist check
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If your signature includes links to your company website, run your domain through
                MXToolbox&rsquo;s blacklist checker to confirm it&rsquo;s not on any major spam blacklists.
                This is especially worth doing if you&rsquo;ve recently moved to a new domain or if
                your domain was previously used by someone else.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Send to your own accounts first
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before rolling out a new signature to your team, send test emails to accounts on
                Gmail, Outlook.com, and Yahoo Mail from your work account. Check:
              </p>
              <ul className="space-y-2 mb-4 text-sm text-slate-600">
                {[
                  "Does the email land in inbox or spam?",
                  "Does the signature render correctly in each client?",
                  "Are images loading?",
                  "Are all links working?",
                  "Does the email look right on mobile?",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 8 */}
            <section id="deliverability-checker" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp&rsquo;s deliverability checker
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp includes a built-in deliverability checker for signatures built in the
                editor. Here&rsquo;s what it checks and how to use it.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    check: "Image hosting method",
                    what: "Detects any base64-encoded images and flags them with instructions to replace them with hosted URLs.",
                  },
                  {
                    check: "Total HTML size",
                    what: "Measures the raw HTML size of your signature and warns if it exceeds 15KB or 20KB thresholds.",
                  },
                  {
                    check: "Link count",
                    what: "Counts all external links (href attributes pointing to external domains) and warns if you exceed 5.",
                  },
                  {
                    check: "Link domain check",
                    what: "Checks whether linked domains are on known spam blacklists using real-time blacklist data.",
                  },
                  {
                    check: "URL shortener detection",
                    what: "Identifies links routed through URL shorteners and flags them for replacement.",
                  },
                  {
                    check: "Spam word scan",
                    what: "Scans visible text in the signature for common spam trigger words and phrases.",
                  },
                  {
                    check: "Image dimension attributes",
                    what: "Checks whether all img elements have explicit width and height HTML attributes.",
                  },
                ].map((item) => (
                  <div key={item.check} className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800">{item.check}: </span>
                      <span className="text-slate-600">{item.what}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The checker runs automatically when you build your signature in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>
                . Each check passes or fails, and failing checks include specific fix
                instructions. It&rsquo;s also available as a standalone tool on the{" "}
                <Link href="/email-signature-deliverability" className="text-blue-600 hover:underline">
                  deliverability page
                </Link>
                {" "}if you want to check a signature built elsewhere.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The checker doesn&rsquo;t replace sending a real test email — it analyzes the signature
                HTML in isolation. Use it as a first pass before testing with mail-tester.com.
              </p>
            </section>

            {/* Section 9 — Checklist */}
            <section id="checklist" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Final deliverability checklist
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Run through this before deploying any email signature.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6">
                {[
                  {
                    category: "Images",
                    items: [
                      "No base64-encoded images — all images hosted externally",
                      "All images have explicit width and height HTML attributes",
                      "Logo under 20KB, headshot under 25KB, banner under 40KB",
                      "Images hosted on company domain or reputable CDN",
                    ],
                  },
                  {
                    category: "Links",
                    items: [
                      "Maximum 5 external links",
                      "No URL shorteners",
                      "No links to recently registered or unusual domains",
                      "All linked domains checked against blacklists",
                    ],
                  },
                  {
                    category: "HTML",
                    items: [
                      "Total HTML under 15KB",
                      "No JavaScript in signature code",
                      "No CSS class attributes — only inline styles",
                      "Clean, valid HTML — no unclosed tags",
                    ],
                  },
                  {
                    category: "Text content",
                    items: [
                      "No all-caps text",
                      "No excessive exclamation marks",
                      "No spam trigger words in CTA text or banners",
                      "Disclaimer text is concise (under 3 lines)",
                    ],
                  },
                  {
                    category: "Testing",
                    items: [
                      "Run mail-tester.com check — score 9/10 or above",
                      "Sent test email to Gmail — lands in inbox",
                      "Sent test email to Outlook.com — lands in inbox",
                      "Checked rendering on mobile",
                    ],
                  },
                ].map((section) => (
                  <div key={section.category}>
                    <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                          <span className="mt-0.5 w-4 h-4 border border-slate-300 rounded flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related links */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related guides</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "/email-signature-deliverability", label: "NeatStamp Deliverability Checker" },
                  { href: "/blog/email-signature-best-practices", label: "Email Signature Best Practices" },
                  { href: "/professional-email-signature", label: "Professional Signature Guide" },
                  { href: "/email-signature-gmail", label: "Gmail Signature Setup" },
                  { href: "/email-signature-outlook", label: "Outlook Signature Setup" },
                  { href: "/email-signature-for-business", label: "Business Email Signatures" },
                  { href: "/templates", label: "Browse Signature Templates" },
                  { href: "/pricing", label: "NeatStamp Pricing" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm font-medium text-slate-700"
                  >
                    {link.label} &rarr;
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build a deliverability-safe signature
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates clean, lightweight HTML that follows every rule in this guide.
                Built-in deliverability checker included — free.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Create My Signature — Free
                </Link>
                <Link
                  href="/email-signature-deliverability"
                  className="inline-block px-8 py-3 bg-transparent text-white border border-white/30 font-semibold rounded-lg hover:border-white/60 transition-colors"
                >
                  Check My Existing Signature
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
