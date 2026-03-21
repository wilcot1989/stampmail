import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Signature Template Guide (2026)",
  description:
    "How to create, install, and fix Outlook email signature templates. Covers Outlook desktop, web, and mobile with step-by-step instructions and common fixes.",
  alternates: {
    canonical: "https://neatstamp.com/blog/outlook-signature-template-guide",
  },
};

const faqs = [
  {
    q: "Why does my email signature look different in Outlook?",
    a: "Outlook uses Microsoft Word's rendering engine, not a browser. It doesn't support CSS flexbox, grid, or many other modern CSS properties. It also ignores CSS background-image on table cells. Use HTML tables with inline styles for reliable Outlook rendering.",
  },
  {
    q: "How do I add an HTML signature to Outlook?",
    a: "In Outlook desktop: go to File → Options → Mail → Signatures. Create a new signature, then paste your HTML. The most reliable method is to paste your signature into a new email first, then copy-paste from there into the signature dialog box.",
  },
  {
    q: "Does Outlook desktop sync signatures with Outlook on the web?",
    a: "No. Outlook desktop and Outlook on the web (OWA/365) store signatures separately. You need to set up your signature in each environment independently.",
  },
  {
    q: "Why are my images not showing in Outlook?",
    a: "Outlook blocks externally hosted images by default until the recipient clicks 'Download images.' Make sure your image has explicit width/height HTML attributes, is hosted at a public URL (not base64-embedded), and the alt text describes what the image is.",
  },
  {
    q: "Can I have multiple signatures in Outlook?",
    a: "Yes. You can create multiple signatures in Outlook and assign different ones to different email accounts. You can also set one signature for new emails and a different (shorter) one for replies and forwards.",
  },
  {
    q: "How do I fix extra spacing in my Outlook signature?",
    a: "Extra spacing in Outlook is usually caused by paragraph spacing or line-height on table rows. Set mso-line-height-rule: exactly and a fixed line-height on your table cells. Also add cellspacing='0' cellpadding='0' border='0' to your tables.",
  },
];

export default function OutlookSignatureTemplateGuidePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook Signature Template Guide",
            url: "https://neatstamp.com/blog/outlook-signature-template-guide",
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
            <span className="text-slate-700">Outlook Signature Template Guide</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Outlook
                </span>
                <span className="text-sm text-slate-400">16 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook Signature Template Guide: Create, Install &amp; Fix (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Outlook is responsible for more broken email signatures than any other
                client — not because it&rsquo;s bad, but because it renders HTML differently
                from every browser and most other email clients. This guide walks you
                through creating Outlook-compatible signature templates, installing them
                in every version of Outlook, and fixing the most common problems.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 16 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                {[
                  ["#why-outlook-different", "Why Outlook renders differently"],
                  ["#outlook-desktop", "Outlook desktop (Windows)"],
                  ["#outlook-web", "Outlook on the web (365/OWA)"],
                  ["#outlook-mac", "Outlook for Mac"],
                  ["#outlook-mobile", "Outlook mobile (iOS & Android)"],
                  ["#template-rules", "HTML template rules for Outlook"],
                  ["#common-problems", "Common Outlook signature problems — fixed"],
                  ["#generator", "Using a generator for Outlook signatures"],
                  ["#faq", "FAQ"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href as string}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1 */}
            <section id="why-outlook-different" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why Outlook renders differently from everything else
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the fundamental thing to understand before you build any Outlook
                signature. Outlook 2007 and later uses Microsoft Word&rsquo;s rendering
                engine to display HTML email. Not a browser. Word.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                That means Outlook&rsquo;s HTML/CSS support is frozen roughly at 2003-era
                browser capabilities. Here&rsquo;s specifically what that means:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Not supported in Outlook</p>
                  <ul className="space-y-1 text-xs text-red-700">
                    <li>CSS flexbox and grid</li>
                    <li>background-image on table cells</li>
                    <li>CSS border-radius (ignored)</li>
                    <li>External stylesheets and &lt;style&gt; blocks (partially ignored)</li>
                    <li>max-width (use width attribute instead)</li>
                    <li>CSS float on table cells</li>
                    <li>SVG images</li>
                    <li>CSS variables (custom properties)</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Reliably supported</p>
                  <ul className="space-y-1 text-xs text-green-700">
                    <li>HTML tables (the backbone of everything)</li>
                    <li>Inline CSS styles</li>
                    <li>font-family (with web-safe fallbacks)</li>
                    <li>font-size, font-weight, color</li>
                    <li>PNG and JPG images with width/height attributes</li>
                    <li>Hyperlinks (&lt;a href&gt;)</li>
                    <li>Table cell borders</li>
                    <li>bgcolor attribute on table cells</li>
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The practical implication: any Outlook-compatible signature template must
                use HTML tables for layout and inline CSS for styling. Every other
                approach is a gamble.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Outlook on the web (Office 365 / OWA) is different — it uses a browser
                rendering engine and supports more modern CSS. But if your recipients
                use Outlook desktop, that&rsquo;s what matters. For the full breakdown of
                design rules, the{" "}
                <Link href="/email-signature-design" className="text-blue-600 hover:underline">
                  email signature design guide
                </Link>{" "}
                covers this in detail.
              </p>
            </section>

            {/* Section 2 */}
            <section id="outlook-desktop" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to set up a signature in Outlook desktop (Windows)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This applies to Outlook 2016, 2019, 2021, and the Microsoft 365
                desktop app on Windows. The interface is almost identical across
                all these versions.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Method 1: Using the Signatures dialog
              </h3>
              <ol className="space-y-4 mb-6">
                {[
                  {
                    step: "Open Signature settings",
                    detail: "In Outlook, click File → Options → Mail → Signatures. Alternatively, when composing a new email, click Insert in the toolbar, then Signature → Signatures.",
                  },
                  {
                    step: "Create a new signature",
                    detail: "Click New. Give your signature a name — something descriptive like \"Full Signature\" or \"Reply Signature.\" Click OK.",
                  },
                  {
                    step: "Add your signature content",
                    detail: "The signature editor box appears at the bottom of the Signatures dialog. For a plain text signature, type directly here. For a formatted HTML signature, see Method 2 below.",
                  },
                  {
                    step: "Assign to email account",
                    detail: "In the \"Choose default signature\" section at the top right, select which email account uses this signature. Choose a default for \"New messages\" and optionally for \"Replies/forwards.\"",
                  },
                  {
                    step: "Save",
                    detail: "Click OK twice. Open a new email to verify your signature appears.",
                  },
                ].map(({ step, detail }, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">{step}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Method 2: Installing an HTML signature (the reliable way)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Outlook signature editor doesn&rsquo;t have a &ldquo;paste HTML source&rdquo; button.
                The best way to install a formatted HTML signature is:
              </p>
              <ol className="space-y-4 mb-6">
                {[
                  {
                    step: "Get your rendered signature",
                    detail: "In NeatStamp's editor, build your signature and click the copy button. This copies the rendered HTML version — the visual output, not the raw code.",
                  },
                  {
                    step: "Compose a new email",
                    detail: "Open a new email composition window in Outlook.",
                  },
                  {
                    step: "Paste into the email body",
                    detail: "Paste (Ctrl+V) your signature into the body of the new email. You should see it rendered with your formatting, logo, and colors.",
                  },
                  {
                    step: "Select all and copy",
                    detail: "Select everything in the email body (Ctrl+A) and copy it (Ctrl+C).",
                  },
                  {
                    step: "Open Signatures and paste",
                    detail: "Go to File → Options → Mail → Signatures. Click in the signature editor box and paste (Ctrl+V). The formatting should transfer intact.",
                  },
                  {
                    step: "Save and test",
                    detail: "Click OK, compose a new email, and verify the signature looks correct. Send a test to yourself and a Gmail address to check cross-client rendering.",
                  },
                ].map(({ step, detail }, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">{step}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Method 3: Editing the .htm file directly
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook stores signatures as .htm files on disk. You can edit these
                directly with a text editor for precise HTML control:
              </p>
              <div className="bg-slate-900 rounded-xl p-4 mb-4">
                <code className="text-xs text-green-400 font-mono">
                  C:\Users\[YourName]\AppData\Roaming\Microsoft\Signatures\
                </code>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Find the .htm file matching your signature name, open it in a text
                editor, and replace the body content with your HTML. Save the file,
                then restart Outlook. This method gives you the most control but
                requires knowing Outlook-compatible HTML.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-amber-800 mb-2">
                  Important: Outlook desktop ≠ Outlook on the web
                </p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Signatures set in Outlook desktop do NOT sync to Outlook on the web
                  (OWA / Microsoft 365). You need to set up the signature separately
                  in each environment. Both the{" "}
                  <Link href="/email-signature-outlook" className="text-amber-800 font-medium hover:underline">
                    Outlook guide
                  </Link>{" "}
                  and{" "}
                  <Link href="/email-signature-outlook-365" className="text-amber-800 font-medium hover:underline">
                    Outlook 365 guide
                  </Link>{" "}
                  explain the differences in more detail.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="outlook-web" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to set up a signature in Outlook on the web
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook on the web (OWA) includes both outlook.com for personal accounts
                and the Microsoft 365 web interface for business accounts. They use the
                same interface but have slightly different navigation.
              </p>

              <ol className="space-y-4 mb-6">
                {[
                  {
                    step: "Open Settings",
                    detail: "Click the gear icon in the top right corner of Outlook on the web.",
                  },
                  {
                    step: "Go to mail settings",
                    detail: "Click 'View all Outlook settings' at the bottom of the settings panel. Then go to Mail → Compose and reply.",
                  },
                  {
                    step: "Find Email signature",
                    detail: "Scroll down to the 'Email signature' section. You'll see a rich text editor.",
                  },
                  {
                    step: "Add your signature",
                    detail: "Paste your signature into the editor. OWA's editor handles HTML better than Outlook desktop's signature dialog — it accepts more CSS properties. You can paste the rendered version directly.",
                  },
                  {
                    step: "Configure when it appears",
                    detail: "Check 'Automatically include my signature on new messages' and optionally 'Automatically include my signature on messages I forward or reply to.'",
                  },
                  {
                    step: "Save",
                    detail: "Click Save. The signature takes effect immediately for new emails.",
                  },
                ].map(({ step, detail }, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">{step}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm font-semibold text-blue-800 mb-1">
                  OWA vs. Outlook desktop rendering
                </p>
                <p className="text-sm text-blue-700 leading-relaxed">
                  OWA renders email in a browser, so it supports more CSS than Outlook
                  desktop. However, your recipients may be using Outlook desktop — so
                  design for the most restrictive environment (Outlook desktop) regardless
                  of where you set up your signature.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="outlook-mac" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Outlook for Mac
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook for Mac uses a different rendering engine from Outlook on
                Windows — it&rsquo;s closer to WebKit (Safari&rsquo;s engine), so it supports
                more modern CSS. But your recipients on Windows Outlook still have
                the same limitations. Design for Windows Outlook, and Mac users will
                see it fine (or better).
              </p>

              <ol className="space-y-4 mb-6">
                {[
                  {
                    step: "Open Preferences",
                    detail: "In Outlook for Mac, go to Outlook → Preferences (or Outlook → Settings on newer versions).",
                  },
                  {
                    step: "Open Signatures",
                    detail: "Click on Signatures in the Email section.",
                  },
                  {
                    step: "Click the + button",
                    detail: "This creates a new signature. Give it a name.",
                  },
                  {
                    step: "Edit the signature",
                    detail: "The signature editor opens. For HTML signatures, the best method is to paste your rendered signature from NeatStamp directly into the editor.",
                  },
                  {
                    step: "Assign to account",
                    detail: "At the top of the Signatures dialog, select which account uses this signature. Set it as default for new emails and/or replies.",
                  },
                ].map(({ step, detail }, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">{step}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Section 5 */}
            <section id="outlook-mobile" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Outlook mobile (iOS and Android)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook mobile has its own signature setting, separate from desktop
                and web. It supports limited HTML formatting but not complex layouts.
              </p>

              <ol className="space-y-4 mb-6">
                {[
                  {
                    step: "Open Outlook on your phone",
                    detail: "Tap your profile picture or initials in the top left corner.",
                  },
                  {
                    step: "Open Settings",
                    detail: "Tap the Settings gear icon at the bottom left.",
                  },
                  {
                    step: "Find your email account",
                    detail: "Under 'Mail', tap on your email account name.",
                  },
                  {
                    step: "Tap Signature",
                    detail: "You'll see a toggle 'Use signature' and an edit field below it.",
                  },
                  {
                    step: "Edit your signature",
                    detail: "Outlook mobile supports basic formatting: bold, italic, underline, and links. Paste a simplified version of your signature here. Complex table layouts won't render reliably on mobile.",
                  },
                ].map(({ step, detail }, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">{step}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="text-slate-600 leading-relaxed">
                Most professionals set their full HTML signature on desktop, and use a
                minimal 2–3 line text signature on mobile. This is the practical solution
                given mobile app limitations. The{" "}
                <Link href="/email-signature-mobile-friendly" className="text-blue-600 hover:underline">
                  mobile-friendly signature guide
                </Link>{" "}
                covers how to design your desktop signature so it also renders well
                when your recipients read it on their phones.
              </p>
            </section>

            {/* Section 6 */}
            <section id="template-rules" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                HTML template rules for Outlook signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re writing or customizing HTML for an Outlook signature, these
                are the rules that prevent the most common rendering failures.
              </p>

              <div className="space-y-5">
                {[
                  {
                    rule: "Use tables, not divs, for layout",
                    detail: "A two-column layout (logo on left, text on right) must use a table with two cells. A div with display:flex breaks completely in Outlook. The table approach is verbose but reliable.",
                    code: '<table cellspacing="0" cellpadding="0" border="0"><tr><td width="80" valign="top"><img src="logo.png" width="60" height="60" /></td><td valign="top" style="padding-left:16px;">Your name here</td></tr></table>',
                  },
                  {
                    rule: "All styles must be inline",
                    detail: "Outlook partially respects <style> blocks in the <head> but strips them in many scenarios. The only safe approach is inline styles on every element.",
                    code: '<p style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; margin: 0;">',
                  },
                  {
                    rule: "Set image dimensions in HTML attributes, not CSS",
                    detail: "Outlook ignores CSS width and height on images. Set width and height as HTML attributes directly on the img tag. Use both, always.",
                    code: '<img src="logo.png" width="150" height="50" style="width:150px;height:50px;" alt="Company Logo">',
                  },
                  {
                    rule: "Add table reset attributes",
                    detail: "Outlook adds default spacing between table cells. Remove it with: cellspacing='0' cellpadding='0' border='0'. Missing these can add unwanted gaps.",
                    code: '<table cellspacing="0" cellpadding="0" border="0">',
                  },
                  {
                    rule: "Use mso-line-height-rule for exact line heights",
                    detail: "Outlook interprets line-height differently. Use mso-line-height-rule: exactly to prevent it from adding extra space.",
                    code: 'style="line-height: 20px; mso-line-height-rule: exactly;"',
                  },
                  {
                    rule: "Use bgcolor for background colors, not CSS background-color",
                    detail: "For table cells that need a background color, use the bgcolor HTML attribute alongside CSS for maximum compatibility.",
                    code: '<td bgcolor="#f8f9fa" style="background-color: #f8f9fa;">',
                  },
                  {
                    rule: "No SVGs — use PNG or JPG for all images",
                    detail: "Outlook does not render SVG images. Convert all SVG icons and logos to PNG. Use @2x (2x actual size, displayed at half size) for retina sharpness.",
                  },
                ].map(({ rule, detail, code }) => (
                  <div key={rule} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{rule}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">{detail}</p>
                      {code && (
                        <div className="bg-slate-900 rounded-lg p-3">
                          <code className="text-xs text-green-400 font-mono break-all">
                            {code}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                The{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>{" "}
                has a complete annotated template you can use as a starting point.
                For design-level decisions (fonts, colors, sizing), the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  best practices guide
                </Link>{" "}
                covers everything.
              </p>
            </section>

            {/* Section 7 */}
            <section id="common-problems" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Common Outlook signature problems — and how to fix them
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These are the problems I see most often with Outlook signatures.
                Each one has a specific fix.
              </p>

              <div className="space-y-5">
                {[
                  {
                    problem: "Logo appears too large or at full resolution",
                    cause: "Missing width/height HTML attributes on the img tag.",
                    fix: "Add width='150' height='50' (or your logo's dimensions) directly to the img tag, alongside the same values in the inline style attribute. Both are needed.",
                  },
                  {
                    problem: "Extra space above or below the signature",
                    cause: "Outlook adds paragraph spacing above and below tables by default.",
                    fix: "Add margin:0; padding:0; to your outer table and all surrounding elements. Also set mso-table-lspace:0pt; mso-table-rspace:0pt; on your tables.",
                  },
                  {
                    problem: "Text appears in Times New Roman (not your chosen font)",
                    cause: "Your font-family declaration uses only a custom font with no fallback.",
                    fix: "Always declare font-family: 'YourFont', Arial, sans-serif. When Outlook can't load 'YourFont', it needs a web-safe fallback to use instead.",
                  },
                  {
                    problem: "Images blocked / red X instead of logo",
                    cause: "Outlook blocks externally hosted images until the user clicks 'Always download images.' This is the default for security reasons.",
                    fix: "Always include descriptive alt text on images. Consider making your signature readable even without images — key info should be in text, not embedded in an image. Nothing you do will disable Outlook's image blocking; the user controls that setting.",
                  },
                  {
                    problem: "Colors inverted in dark mode",
                    cause: "Outlook in dark mode tries to invert elements that don't have explicit background-color declarations.",
                    fix: "Add background-color: #ffffff explicitly to your outer table and key cells. Use a slightly off-white (#fafafa or #f8f9fa) for backgrounds — pure white (#ffffff) sometimes handles dark mode better than transparent. For a deep explanation, see the dark mode guide.",
                  },
                  {
                    problem: "Signature disappeared or reverted",
                    cause: "Outlook can reset signatures when profiles are rebuilt, when you reinstall Office, or after certain updates.",
                    fix: "Save your signature HTML externally (a text file or in NeatStamp). That way, reinstalling the signature takes under 2 minutes. For teams, using a centrally managed signature tool prevents this entirely.",
                  },
                  {
                    problem: "Two-column layout collapses to one column",
                    cause: "Using CSS flexbox or float instead of HTML tables for the two-column layout.",
                    fix: "Replace your flex or float layout with an HTML table. Two cells, valign='top'. This is the only reliable approach in Outlook desktop.",
                  },
                  {
                    problem: "Signature shows as attachment",
                    cause: "Usually caused by base64-encoded images embedded directly in the HTML.",
                    fix: "Host your images at an external URL. Don't embed them as base64 strings. NeatStamp Pro hosts signature images on a CDN automatically; on the free plan, use a publicly accessible URL for your logo.",
                  },
                ].map(({ problem, cause, fix }) => (
                  <div key={problem} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-3">{problem}</h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium text-amber-700">Cause:</span>{" "}
                        <span className="text-slate-600">{cause}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-green-700">Fix:</span>{" "}
                        <span className="text-slate-600">{fix}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                For specific problems like your signature not showing up at all, the{" "}
                <Link href="/blog/email-signature-not-showing-outlook" className="text-blue-600 hover:underline">
                  Outlook signature not showing guide
                </Link>{" "}
                and the{" "}
                <Link href="/blog/email-signature-keeps-disappearing" className="text-blue-600 hover:underline">
                  signature keeps disappearing guide
                </Link>{" "}
                have dedicated troubleshooting steps.
              </p>
            </section>

            {/* Section 8 */}
            <section id="generator" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The easiest way: use an Outlook-compatible generator
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If manually debugging Outlook-specific HTML isn&rsquo;t how you want to spend
                your afternoon, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                generates signatures that are pre-tested for Outlook compatibility.
                Everything it produces uses table-based layout, inline styles, HTML image
                attributes, and the other conventions described in this guide.
              </p>

              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s what the workflow looks like:
              </p>

              <ol className="space-y-3 mb-6 text-sm text-slate-600">
                {[
                  "Open the NeatStamp editor and fill in your name, title, company, phone, and email.",
                  "Upload your logo (or skip it for a text-only signature).",
                  "Choose a template from the template library — all are Outlook-compatible.",
                  "Copy the signature using the copy button.",
                  "Paste it into Outlook using Method 2 (paste into email body first, then transfer to signature settings).",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-blue-600">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <p className="text-slate-600 leading-relaxed mb-4">
                The whole process takes about 5 minutes. The signatures work in Outlook
                desktop (all versions from 2007 onwards), Outlook on the web, Outlook
                for Mac, Gmail, and Apple Mail.
              </p>

              <p className="text-slate-600 leading-relaxed">
                For team deployments — where you need all employees to have the same
                signature — the{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature guide
                </Link>{" "}
                and the{" "}
                <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
                  Outlook-compatible signature guide
                </Link>{" "}
                cover the options for centralized management.
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
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related guides</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "/email-signature-outlook", label: "Outlook Email Signature Guide" },
                  { href: "/email-signature-outlook-365", label: "Outlook 365 Signature Guide" },
                  { href: "/email-signature-outlook-compatible", label: "Outlook-Compatible Signatures" },
                  { href: "/blog/email-signature-best-practices", label: "Email Signature Best Practices" },
                  { href: "/blog/free-email-signature-template", label: "Free Email Signature Templates" },
                  { href: "/html-email-signature", label: "HTML Email Signature Guide" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-slate-700 hover:text-blue-700"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {label}
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Need an Outlook-ready signature?
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates Outlook-compatible HTML automatically — table-based
                layout, inline styles, the works. Free, no account needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Build My Outlook Signature
                </Link>
                <Link
                  href="/templates"
                  className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Browse Templates
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
