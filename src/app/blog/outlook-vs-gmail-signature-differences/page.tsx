import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook vs Gmail Signature: Key Differences",
  description:
    "Outlook vs Gmail signature rendering explained. What each client supports, what breaks, and how to build a signature that works in both.",
  alternates: {
    canonical:
      "https://neatstamp.com/blog/outlook-vs-gmail-signature-differences",
  },
};

const faqs = [
  {
    q: "Why does my Gmail signature look broken in Outlook?",
    a: "Gmail and Outlook use completely different rendering engines. Gmail is WebKit-based; Outlook desktop uses the Microsoft Word rendering engine. CSS that Gmail handles fine — like flexbox, border-radius, or background images — gets stripped or ignored by Outlook. The fix is to use table-based HTML with inline CSS, which both clients handle consistently.",
  },
  {
    q: "Does Outlook support HTML email signatures?",
    a: "Yes, but only a limited subset of HTML and CSS. Outlook desktop (2016, 2019, 2021, 2024) uses the Word rendering engine, which treats email like a Word document. It ignores CSS properties like border-radius, background-image, flexbox, and grid. Outlook on the web (office.com) is more capable, but most people in corporate environments use the desktop app.",
  },
  {
    q: "Can I use the same HTML signature in Gmail and Outlook?",
    a: "Yes, if you write it correctly. Use table-based layout instead of flexbox or grid. Use inline CSS instead of CSS classes or a style block. Use hosted images (not base64 or SVG). Use width attributes on table cells instead of max-width. These four rules get you most of the way to a signature that renders correctly in both clients.",
  },
  {
    q: "Does Gmail support CSS in email signatures?",
    a: "Gmail supports some inline CSS, but it strips CSS classes and most style block declarations. Properties like border-radius and box-shadow work. Flexbox is partially supported in Gmail's web interface but not consistently in the Gmail mobile app. The safest approach is inline CSS on table elements.",
  },
  {
    q: "Why does Outlook show my logo as an attachment?",
    a: "You're probably using a base64-encoded image. Outlook converts base64 images to attachments instead of displaying them inline. Use a hosted image URL (https://yourdomain.com/logo.png) instead. This also makes your signature smaller and faster to load.",
  },
  {
    q: "Why does my signature lose formatting when I reply in Outlook?",
    a: "Outlook strips styles from quoted content in replies. This is a known behavior. Your signature should appear correctly in new emails. If even new emails look wrong, check that your HTML uses inline styles, not CSS classes or a style block, and that images are hosted URLs rather than base64 or attached files.",
  },
  {
    q: "Does Gmail show SVG icons in email signatures?",
    a: "Gmail renders SVG, but Outlook blocks it entirely. If you use SVG social icons or logos in your signature, they'll display fine in Gmail but won't appear in Outlook at all. Use PNG icons for cross-client compatibility. A 24x24 or 32x32 PNG hosted on your server is the safest choice.",
  },
  {
    q: "What's the difference between installing a signature in Gmail vs Outlook?",
    a: "In Gmail, you paste HTML into Settings > See all settings > Signature. In Outlook desktop, you go to File > Options > Mail > Signatures, create a new signature, and paste the HTML into the editor (or use Insert > Signature to get the HTML editor view). The Outlook editor also has a quirk: it adds its own formatting when you paste plain HTML, so always use the dedicated signature editor rather than pasting into a compose window.",
  },
];

export default function OutlookVsGmailSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook vs Gmail Signature Differences",
            url: "https://neatstamp.com/blog/outlook-vs-gmail-signature-differences",
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
            <span className="text-slate-700">Outlook vs Gmail Signature Differences</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Comparison
                </span>
                <span className="text-sm text-slate-400">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook vs Gmail Signature: Key Differences You Need to Know
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Your signature looks perfect in Gmail. You send it to a colleague on Outlook
                — it&rsquo;s broken. Why? Because Gmail and Outlook render HTML completely
                differently. Understanding the gap between them is the only way to build a
                signature that works in both.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 10 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#rendering-engines", "The rendering engine problem"],
                  ["#css-support", "CSS support: side-by-side comparison"],
                  ["#install-gmail", "How to install a signature in Gmail"],
                  ["#install-outlook", "How to install a signature in Outlook"],
                  ["#cross-client-sending", "What happens when Gmail sends to Outlook"],
                  ["#safe-approach", "The cross-client safe approach"],
                  ["#neatstamp", "How NeatStamp handles both"],
                  ["#related", "Related guides"],
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

            {/* Rendering Engines */}
            <section id="rendering-engines" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The rendering engine problem
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail and Outlook don&rsquo;t just look different — they process HTML using
                entirely different engines, and that difference explains most signature
                breakage.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="font-semibold text-blue-900 mb-1">Gmail</p>
                  <p className="text-xs text-blue-700 mb-3 font-medium">WebKit-based rendering</p>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Gmail renders email in a browser-like environment. It understands modern
                    CSS fairly well, but it aggressively strips anything that could interfere
                    with its own interface — most notably CSS classes, style blocks, and
                    external stylesheets. What remains after Gmail&rsquo;s sanitization pass is
                    a limited subset of CSS, mostly inline styles on individual elements.
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                  <p className="font-semibold text-orange-900 mb-1">Outlook Desktop</p>
                  <p className="text-xs text-orange-700 mb-3 font-medium">Microsoft Word rendering engine</p>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    Outlook 2016, 2019, 2021, and 2024 all use the Word rendering engine to
                    display HTML email. Word was designed for print documents, not web pages.
                    It ignores most modern CSS layout properties, doesn&rsquo;t understand
                    flexbox or grid, can&rsquo;t apply border-radius, and has its own
                    interpretation of the box model. If you wrote HTML specifically for Word,
                    it would work fine. HTML written for a browser often doesn&rsquo;t.
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook on the web (office.com) is a separate case — it uses a more modern
                HTML renderer and behaves more like Gmail. But most corporate users who are
                &ldquo;on Outlook&rdquo; are using the desktop app, which means the Word engine.
                That&rsquo;s the one you need to design for.
              </p>
              <p className="text-slate-600 leading-relaxed">
                There&rsquo;s also the question of Gmail on mobile. The Gmail iOS and Android apps
                strip CSS more aggressively than the web version. A signature that works in
                Gmail web may still have issues on the Gmail mobile app. This is a separate
                problem from the Outlook issue, but worth keeping in mind. For more detail,
                see the{" "}
                <Link href="/email-signature-mobile-friendly" className="text-blue-600 hover:underline">
                  mobile-friendly email signature guide
                </Link>
                .
              </p>
            </section>

            {/* CSS Support Comparison */}
            <section id="css-support" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                CSS support: side-by-side comparison
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Here&rsquo;s a specific breakdown of properties that matter for email signatures
                and how each client handles them.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Feature</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Gmail (web)</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Outlook desktop</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        feature: "CSS classes",
                        gmail: "Stripped",
                        gmailColor: "text-red-600",
                        outlook: "Stripped",
                        outlookColor: "text-red-600",
                        note: "Both need inline CSS",
                      },
                      {
                        feature: "Inline CSS",
                        gmail: "Supported",
                        gmailColor: "text-green-700",
                        outlook: "Partial",
                        outlookColor: "text-amber-600",
                        note: "Outlook ignores some properties",
                      },
                      {
                        feature: "border-radius",
                        gmail: "Supported",
                        gmailColor: "text-green-700",
                        outlook: "Ignored",
                        outlookColor: "text-red-600",
                        note: "Corners appear square in Outlook",
                      },
                      {
                        feature: "Background images",
                        gmail: "Partial",
                        gmailColor: "text-amber-600",
                        outlook: "Needs VML",
                        outlookColor: "text-red-600",
                        note: "Use solid colors instead",
                      },
                      {
                        feature: "Flexbox",
                        gmail: "Partial",
                        gmailColor: "text-amber-600",
                        outlook: "None",
                        outlookColor: "text-red-600",
                        note: "Use tables for layout",
                      },
                      {
                        feature: "CSS Grid",
                        gmail: "Partial",
                        gmailColor: "text-amber-600",
                        outlook: "None",
                        outlookColor: "text-red-600",
                        note: "Use tables for layout",
                      },
                      {
                        feature: "SVG images",
                        gmail: "Renders",
                        gmailColor: "text-green-700",
                        outlook: "Blocked",
                        outlookColor: "text-red-600",
                        note: "Use PNG instead",
                      },
                      {
                        feature: "Base64 images",
                        gmail: "Supported",
                        gmailColor: "text-green-700",
                        outlook: "Converts to attachment",
                        outlookColor: "text-red-600",
                        note: "Use hosted URLs",
                      },
                      {
                        feature: "max-width",
                        gmail: "Supported",
                        gmailColor: "text-green-700",
                        outlook: "Ignored",
                        outlookColor: "text-red-600",
                        note: "Use width attribute instead",
                      },
                      {
                        feature: "width attribute (HTML)",
                        gmail: "Supported",
                        gmailColor: "text-green-700",
                        outlook: "Supported",
                        outlookColor: "text-green-700",
                        note: "Safe in both",
                      },
                      {
                        feature: "Web fonts (@font-face)",
                        gmail: "Stripped",
                        gmailColor: "text-red-600",
                        outlook: "Stripped",
                        outlookColor: "text-red-600",
                        note: "Use system fonts",
                      },
                      {
                        feature: "Table-based layout",
                        gmail: "Supported",
                        gmailColor: "text-green-700",
                        outlook: "Supported",
                        outlookColor: "text-green-700",
                        note: "The cross-client safe approach",
                      },
                    ].map((row) => (
                      <tr key={row.feature}>
                        <td className="py-3 px-4 font-medium text-slate-800 text-xs">
                          {row.feature}
                          {row.note && (
                            <span className="block text-slate-400 font-normal mt-0.5">{row.note}</span>
                          )}
                        </td>
                        <td className={`py-3 px-4 text-xs font-medium ${row.gmailColor}`}>
                          {row.gmail}
                        </td>
                        <td className={`py-3 px-4 text-xs font-medium ${row.outlookColor}`}>
                          {row.outlook}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The pattern that emerges from this table is clear: both clients strip CSS
                classes, so inline CSS is non-negotiable for either. Beyond that, Outlook
                strips more than Gmail does. If you design specifically to pass Outlook&rsquo;s
                restrictions, the result will also work in Gmail. The reverse isn&rsquo;t
                reliable.
              </p>

              <div className="space-y-5">
                <div className="border-l-4 border-slate-300 pl-4">
                  <h3 className="font-semibold text-slate-900 mb-2">CSS classes: both clients strip them</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This one surprises people. You might expect Outlook to be the bad actor
                    here, but Gmail also removes CSS class definitions. A style like
                    <code className="bg-slate-100 px-1 rounded text-xs mx-1">.signature-name {`{ font-size: 16px; }`}</code>
                    gets stripped by both. The workaround is the same in both cases: use
                    inline styles directly on every element.{" "}
                    <code className="bg-slate-100 px-1 rounded text-xs">style=&quot;font-size:16px;&quot;</code>{" "}
                    on the element itself. It&rsquo;s verbose but it&rsquo;s the only approach that
                    survives both clients.
                  </p>
                </div>

                <div className="border-l-4 border-slate-300 pl-4">
                  <h3 className="font-semibold text-slate-900 mb-2">border-radius: Gmail yes, Outlook no</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    If your signature design includes rounded profile photos, rounded buttons,
                    or pill-shaped elements, those will display in Gmail but appear as
                    hard-edged rectangles in Outlook. There&rsquo;s no VML workaround for
                    border-radius the way there is for background images. If consistent
                    appearance matters to you, design without rounded corners.
                  </p>
                </div>

                <div className="border-l-4 border-slate-300 pl-4">
                  <h3 className="font-semibold text-slate-900 mb-2">SVG icons: use PNG</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    SVG is completely blocked by Outlook. If you have social media icons as
                    SVG files in your signature, Outlook recipients won&rsquo;t see them — no
                    placeholder, just nothing. Use PNG icons hosted at a publicly accessible
                    URL. 24x24 pixels at 2x resolution (so rendered at 24px but the file is
                    48x48) works well across screens. For more on this, see the{" "}
                    <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                      HTML email signature guide
                    </Link>
                    .
                  </p>
                </div>

                <div className="border-l-4 border-slate-300 pl-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Base64 images: use hosted URLs</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Some tools embed images as base64 strings directly in the HTML, which
                    seems convenient but creates two problems. First, it makes the HTML much
                    larger, which can cause signatures to be clipped in Gmail (Gmail clips
                    messages over ~102KB). Second, Outlook converts base64 images to
                    attachments — they don&rsquo;t show inline. Always use a hosted image URL like
                    <code className="bg-slate-100 px-1 rounded text-xs mx-1">https://yoursite.com/signature-logo.png</code>.
                  </p>
                </div>

                <div className="border-l-4 border-slate-300 pl-4">
                  <h3 className="font-semibold text-slate-900 mb-2">max-width vs width</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Gmail respects <code className="bg-slate-100 px-1 rounded text-xs">max-width</code> as
                    a CSS property. Outlook ignores it. If you want to constrain your signature
                    to 600px, don&rsquo;t use <code className="bg-slate-100 px-1 rounded text-xs">style=&quot;max-width:600px;&quot;</code>
                    — use the HTML <code className="bg-slate-100 px-1 rounded text-xs">width=&quot;600&quot;</code> attribute
                    on your table element instead. Both clients respect HTML attributes on
                    table elements.
                  </p>
                </div>
              </div>
            </section>

            {/* Install in Gmail */}
            <section id="install-gmail" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to install a signature in Gmail
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail&rsquo;s signature editor is entirely web-based. The steps are the same
                whether you&rsquo;re on a paid Workspace account or a free Gmail account.
              </p>

              <ol className="space-y-4 mb-5">
                {[
                  {
                    step: "1",
                    title: "Open Gmail Settings",
                    detail: "Click the gear icon in the top-right corner, then click \"See all settings\".",
                  },
                  {
                    step: "2",
                    title: "Find the Signature section",
                    detail: "On the General tab, scroll down to the Signature section. Click \"Create new\" and give it a name.",
                  },
                  {
                    step: "3",
                    title: "Paste your HTML",
                    detail: "Gmail doesn't have a direct HTML paste button in the visible editor. To paste HTML: copy your signature HTML, then in the signature text area, use the \"Insert HTML\" option if your browser supports it, or paste the rendered output from NeatStamp's copy-to-clipboard function which handles Gmail formatting automatically.",
                  },
                  {
                    step: "4",
                    title: "Set as default",
                    detail: "Under the signature box, set it as the default for new emails and/or replies. Save changes at the bottom of the page.",
                  },
                  {
                    step: "5",
                    title: "Verify",
                    detail: "Open a new compose window and check how the signature appears. Send a test to another account if possible.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center justify-center">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">{item.title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="text-slate-600 text-sm leading-relaxed">
                For a full walkthrough with screenshots, see the{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail signature setup guide
                </Link>
                . If your Gmail signature isn&rsquo;t working after installation, the{" "}
                <Link href="/blog/gmail-signature-not-working" className="text-blue-600 hover:underline">
                  Gmail signature troubleshooting guide
                </Link>{" "}
                covers the most common causes.
              </p>
            </section>

            {/* Install in Outlook */}
            <section id="install-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to install a signature in Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook&rsquo;s signature installation is more involved than Gmail&rsquo;s, and there
                are a few places where things commonly go wrong.
              </p>

              <ol className="space-y-4 mb-5">
                {[
                  {
                    step: "1",
                    title: "Open the Signatures editor",
                    detail: "In Outlook desktop: File > Options > Mail > Signatures. Or open a new email and go to Insert > Signature > Signatures. Both open the same dialog.",
                  },
                  {
                    step: "2",
                    title: "Create a new signature",
                    detail: "Click \"New\", give the signature a name, and click OK.",
                  },
                  {
                    step: "3",
                    title: "Paste your HTML",
                    detail: "The Signatures editor shows a WYSIWYG view. Do not paste HTML code directly into this box — it will show as raw code. Instead, use the HTML editor button (if available in your Outlook version) or paste the rendered visual output. NeatStamp generates a copy-paste ready version specifically for Outlook.",
                  },
                  {
                    step: "4",
                    title: "Assign to account",
                    detail: "In the top-right of the dialog, set this signature as the default for new messages and/or replies on the relevant email account.",
                  },
                  {
                    step: "5",
                    title: "Save and test",
                    detail: "Click OK, then open a new email to verify. Check spacing, image rendering, and that links work.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 bg-orange-100 text-orange-700 text-xs font-bold rounded-full flex items-center justify-center">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">{item.title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>Common Outlook gotcha:</strong> If you paste your signature HTML into
                  a compose window (not the Signatures editor), Outlook will add its own
                  formatting on top of yours. Always use File &gt; Options &gt; Mail &gt;
                  Signatures to set your default signature.
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                For detailed instructions including Outlook for Mac and Outlook Web, see the{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature setup guide
                </Link>
                . If something&rsquo;s not working, the{" "}
                <Link href="/blog/outlook-signature-not-working" className="text-blue-600 hover:underline">
                  Outlook signature troubleshooting guide
                </Link>{" "}
                has fixes for the most common problems.
              </p>
            </section>

            {/* Cross-client sending */}
            <section id="cross-client-sending" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What happens when Gmail sends to Outlook (and vice versa)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The rendering problem isn&rsquo;t just about where you install the signature — it&rsquo;s
                about where the recipient reads it. When a Gmail user sends an email to an
                Outlook user, the Outlook recipient sees the signature rendered by Outlook&rsquo;s
                Word engine. If the signature was built with Gmail-specific CSS, it may look
                broken on the receiving end even though it looked fine when you composed it.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Gmail sender → Outlook recipient</p>
                  <ul className="space-y-2">
                    {[
                      "Recipient sees it through Outlook's Word engine",
                      "border-radius on your profile photo: disappears",
                      "SVG icons: blocked, no fallback shown",
                      "Flexbox layout: collapses unpredictably",
                      "Background color gradients: fall back to flat or nothing",
                    ].map((item) => (
                      <li key={item} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Outlook sender → Gmail recipient</p>
                  <ul className="space-y-2">
                    {[
                      "Recipient sees it through Gmail's WebKit engine",
                      "Table-based Outlook signatures look fine in Gmail",
                      "VML background image fallbacks are ignored (but harmless)",
                      "Outlook-safe inline CSS renders correctly",
                      "Usually the safer direction — Outlook-built signatures travel well",
                    ].map((item) => (
                      <li key={item} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                The practical takeaway: design for Outlook first. If your signature works in
                Outlook desktop, it will almost certainly work in Gmail. The reverse isn&rsquo;t
                true. This is also why Outlook-compatible signatures are generally the
                baseline — you can always see what yours looks like in both by reading the{" "}
                <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
                  Outlook-compatible email signature guide
                </Link>
                .
              </p>
            </section>

            {/* Safe approach */}
            <section id="safe-approach" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The cross-client safe approach
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You don&rsquo;t need to memorize every CSS quirk. Four rules cover the vast majority
                of cross-client problems.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    number: "01",
                    title: "Table-based layout, not flexbox or grid",
                    detail: "Every email client — including every version of Outlook — understands HTML tables. Use tables to arrange your layout columns. It feels old-fashioned, but it&rsquo;s the only approach with reliable cross-client support. Your signature is not a webpage; it&rsquo;s a table.",
                  },
                  {
                    number: "02",
                    title: "Inline CSS on every element",
                    detail: "Don&rsquo;t use a style block. Don&rsquo;t use CSS classes. Every element that needs styling gets a style= attribute directly. Yes, this means repeating font-family on every table cell. That&rsquo;s what cross-client compatibility requires.",
                  },
                  {
                    number: "03",
                    title: "Hosted images, not base64 or SVG",
                    detail: "Your logo, profile photo, and social icons should all be PNG files hosted at public URLs. This prevents Outlook&rsquo;s base64-to-attachment conversion and avoids SVG blocking. It also makes your HTML smaller and less likely to trigger Gmail&rsquo;s clipping.",
                  },
                  {
                    number: "04",
                    title: "Width attributes, not max-width CSS",
                    detail: "Set widths using the HTML width attribute on table and td elements. Outlook respects HTML attributes. Use style=\"width:600px\" as a secondary fallback, but the attribute takes priority in Outlook.",
                  },
                ].map((rule) => (
                  <div key={rule.number} className="flex gap-4 bg-slate-50 rounded-xl p-5">
                    <span className="flex-shrink-0 text-2xl font-black text-slate-200">
                      {rule.number}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">{rule.title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{rule.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Following these four rules won&rsquo;t give you a signature with rounded profile
                photos or gradient backgrounds. Those look nice in Gmail previews but break in
                Outlook. A cross-client safe signature uses solid colors, rectangular images,
                system fonts like Arial or Georgia, and plain table structure. It looks clean
                in every client rather than impressive in one and broken in another.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For a detailed look at what to include in the HTML itself, the{" "}
                <Link href="/outlook-signature-html" className="text-blue-600 hover:underline">
                  Outlook HTML signature guide
                </Link>{" "}
                goes deep on the actual code structure. If you want to see how a dark mode
                compatible signature handles both clients, the{" "}
                <Link href="/email-signature-dark-mode-compatible" className="text-blue-600 hover:underline">
                  dark mode compatible signature guide
                </Link>{" "}
                covers the added complexity.
              </p>
            </section>

            {/* NeatStamp section */}
            <section id="neatstamp" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How NeatStamp handles both
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every signature NeatStamp generates uses the four rules above by default.
                The output is table-based HTML with inline CSS, hosted image references, and
                width attributes on table elements. We test each template in Gmail web,
                Outlook 2021 desktop, and Outlook Web before publishing it.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you copy your signature from NeatStamp, you get two options: a Gmail
                copy and an Outlook copy. The Gmail version is formatted for direct paste into
                Gmail&rsquo;s signature editor. The Outlook version includes additional table
                structure and avoids any properties Outlook can&rsquo;t handle. The content and
                design are identical — only the HTML structure differs slightly to account for
                each client&rsquo;s quirks.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                You don&rsquo;t need to know which properties Outlook ignores or how to write
                VML. You build the signature once in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>
                , and the tool generates compatible HTML for both clients automatically.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you want to see what the output looks like before you build anything, the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template gallery
                </Link>{" "}
                shows previews of each design in both Gmail and Outlook rendering. You can
                also check the{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing page
                </Link>{" "}
                — the free tier generates fully working, cross-client compatible signatures
                with no account required.
              </p>
            </section>

            {/* Related guides */}
            <section id="related" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-5">
                Related guides
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/email-signature-outlook",
                    label: "Outlook signature setup guide",
                    desc: "Step-by-step install for all Outlook versions",
                  },
                  {
                    href: "/email-signature-gmail",
                    label: "Gmail signature setup guide",
                    desc: "Complete Gmail installation walkthrough",
                  },
                  {
                    href: "/email-signature-outlook-compatible",
                    label: "Outlook-compatible signatures",
                    desc: "What to check before you send",
                  },
                  {
                    href: "/outlook-signature-html",
                    label: "Outlook HTML signature guide",
                    desc: "The actual HTML structure that works",
                  },
                  {
                    href: "/html-email-signature",
                    label: "HTML email signature guide",
                    desc: "Building from scratch, cross-client",
                  },
                  {
                    href: "/blog/outlook-signature-not-working",
                    label: "Outlook signature not working",
                    desc: "Fixes for the most common problems",
                  },
                  {
                    href: "/blog/gmail-signature-not-working",
                    label: "Gmail signature not working",
                    desc: "Why it breaks and how to fix it",
                  },
                  {
                    href: "/email-signature-mobile-friendly",
                    label: "Mobile-friendly email signatures",
                    desc: "How Gmail and Apple Mail handle mobile",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block bg-slate-50 hover:bg-slate-100 rounded-xl p-4 transition-colors group"
                  >
                    <p className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 mb-0.5">
                      {link.label}
                    </p>
                    <p className="text-xs text-slate-500">{link.desc}</p>
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
                Build a signature that works in both
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates Outlook-safe and Gmail-ready HTML from the same design.
                Free, no account required, ready in under 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Create My Signature — Free
                </Link>
                <Link
                  href="/email-signature-outlook-compatible"
                  className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Outlook Compatibility Guide
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
