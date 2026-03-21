import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Gmail Signature Template Guide: Setup & Tips (2026)",
  description:
    "Gmail signature template guide: step-by-step setup, why Gmail strips formatting, how to paste HTML, and mobile differences.",
  alternates: {
    canonical: "https://neatstamp.com/blog/gmail-signature-template-guide",
  },
};

const faqs = [
  {
    q: "Why does my Gmail signature look different from what I designed?",
    a: "Gmail strips CSS class names and external stylesheets. If your signature uses a <style> block or class-based CSS, Gmail removes it. Everything must be inline styles. Gmail also compresses whitespace, so use <br> tags for line breaks rather than empty paragraphs.",
  },
  {
    q: "How do I add an HTML signature to Gmail?",
    a: "Go to Gmail Settings → See all settings → General → Signature → Create new. The most reliable method is to build your signature in NeatStamp, click Copy, then paste directly into the Gmail signature editor box. The formatting transfers because you're pasting rendered HTML, not raw code.",
  },
  {
    q: "Does my Gmail desktop signature appear on Gmail mobile too?",
    a: "No. Gmail desktop and Gmail mobile maintain separate signature settings. You set the desktop signature in Gmail's web settings. The mobile signature is set inside the Gmail app: tap your profile picture → Manage your Google Account → Settings → your account → Mobile Signature.",
  },
  {
    q: "Can I have different signatures for different email addresses in Gmail?",
    a: "Yes. If you've added multiple accounts to Gmail (or multiple aliases), you can set a different signature for each one. In Gmail Settings → Signature, each signature can be assigned to a specific email address in the 'Signature defaults' section.",
  },
  {
    q: "Why do images in my Gmail signature show as attachments?",
    a: "Images that are embedded as base64 or attached inline often get treated as attachments by Gmail. Use externally hosted images with a public URL (https://yourwebsite.com/logo.png) instead. NeatStamp Pro hosts images on a CDN; on the free plan, upload your logo to your website and reference that URL.",
  },
  {
    q: "How do I make my Gmail signature work in dark mode?",
    a: "Gmail on Android applies dark mode by inverting colors when background-color isn't explicitly declared. Add background-color: #ffffff to your outer table and key cells to prevent this. Use #333333 for text rather than #000000, and declare all colors explicitly rather than relying on defaults.",
  },
];

export default function GmailSignatureTemplateGuidePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Gmail Signature Template Guide",
            url: "https://neatstamp.com/blog/gmail-signature-template-guide",
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
            <span className="text-slate-700">Gmail Signature Template Guide</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  Gmail
                </span>
                <span className="text-sm text-slate-400">15 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Gmail Signature Template Guide: Setup, Tips &amp; Common Fixes (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Gmail is where most people expect their email signature to &ldquo;just work.&rdquo;
                It often does — but there are enough quirks (CSS stripping, dark mode
                behavior, the mobile/desktop split) that knowing them in advance saves
                a lot of frustration. This guide covers everything from setting up a
                Gmail signature from scratch to making HTML templates paste in correctly.
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
              <ol className="space-y-2 text-sm list-decimal list-inside">
                {[
                  ["#gmail-basics", "Gmail signature basics"],
                  ["#step-by-step", "Step-by-step setup on desktop"],
                  ["#why-gmail-strips", "Why Gmail strips your formatting (and how to work around it)"],
                  ["#pasting-html", "How to paste an HTML signature into Gmail"],
                  ["#multiple-signatures", "Multiple signatures and email aliases"],
                  ["#mobile-gmail", "Gmail mobile: the separate signature problem"],
                  ["#dark-mode", "Dark mode in Gmail"],
                  ["#common-issues", "Common Gmail signature issues — fixed"],
                  ["#generator", "Using a Gmail-optimized generator"],
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
            <section id="gmail-basics" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Gmail signature basics
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail&rsquo;s signature feature has been around for years but has been
                significantly improved. As of 2026, you can:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Create multiple named signatures per account",
                  "Assign different signatures to different email aliases",
                  "Set a separate signature for new emails and for replies/forwards",
                  "Paste formatted HTML signatures (with logos, colors, and links)",
                  "Insert images from Google Drive or by URL",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed mb-4">
                What Gmail&rsquo;s signature editor does NOT support:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "CSS class-based styling (it strips class attributes)",
                  "External stylesheets (<link> tags or @import)",
                  "<style> blocks (Gmail removes these in rendering)",
                  "Custom web fonts loaded via Google Fonts or similar",
                  "SVG images",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed">
                This is why professionally-designed signatures often look worse in Gmail
                than they do in a browser preview. The solution is to build specifically
                for Gmail&rsquo;s constraints — which is exactly what{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail-optimized signature tools
                </Link>{" "}
                do.
              </p>
            </section>

            {/* Section 2 */}
            <section id="step-by-step" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Step-by-step Gmail signature setup (desktop)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This covers Gmail in a web browser (Chrome, Firefox, Safari, Edge).
                The interface is the same across all desktop browsers.
              </p>

              <ol className="space-y-5 mb-6">
                {[
                  {
                    step: "Open Gmail Settings",
                    detail: "Click the gear icon in the top-right corner of Gmail. In the dropdown that appears, click 'See all settings.' This opens the full settings page.",
                  },
                  {
                    step: "Navigate to Signatures",
                    detail: "You're on the General tab by default. Scroll down until you see the Signature section — it's about halfway down the page.",
                  },
                  {
                    step: "Create a new signature",
                    detail: "Click '+ Create new.' A dialog appears asking you to name your signature. Give it a descriptive name — 'Full Signature' or your name. Click Create.",
                  },
                  {
                    step: "Add your signature content",
                    detail: "The signature editor is a rich text box. You can type directly for a basic text signature. For a formatted HTML signature with a logo and colors, see the section on pasting HTML below.",
                  },
                  {
                    step: "Set signature defaults",
                    detail: "Scroll up slightly to the 'Signature defaults' area. Select your email address from the dropdown and choose your signature for 'For New Emails Use' and optionally 'On Reply/Forward Use.' A shorter, simpler signature for replies is good practice.",
                  },
                  {
                    step: "Save Changes",
                    detail: "Scroll to the bottom of the Settings page and click 'Save Changes.' Gmail saves the whole page at once — if you close without saving, your signature is gone.",
                  },
                  {
                    step: "Test it",
                    detail: "Click Compose. Your signature should appear automatically in the email body. Send a test email to yourself and check how it renders. Also send to a colleague on Outlook if you have one — cross-client testing is important.",
                  },
                ].map(({ step, detail }, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">{step}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-amber-800 mb-1">
                  Remember: Save Changes at the bottom of the page
                </p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Gmail&rsquo;s Settings page saves all changes at once when you click the
                  Save Changes button at the very bottom. Navigating away from the page
                  without saving loses all your edits. This catches people out more than
                  almost any other Gmail gotcha.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="why-gmail-strips" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why Gmail strips your formatting (and how to work around it)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s what&rsquo;s actually happening when Gmail removes your carefully crafted
                styles: Gmail&rsquo;s rendering pipeline sanitizes incoming HTML to prevent
                CSS class collisions with its own interface and to block potential
                security vectors. It removes:
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  {
                    removes: "<style> blocks",
                    because: "Gmail wraps all email content in its own CSS. External style blocks would interfere with that wrapper.",
                    fix: "Use inline styles on every element. style=\"color: #333; font-size: 14px;\" on each tag.",
                  },
                  {
                    removes: "class attributes",
                    because: "Gmail removes class names from all HTML elements. Any styling tied to classes simply disappears.",
                    fix: "Never rely on CSS classes for email signatures. Every style must be inline.",
                  },
                  {
                    removes: "Google Fonts and custom webfonts",
                    because: "Gmail blocks external stylesheet loading, including Google Fonts @import statements.",
                    fix: "Use web-safe fonts: Arial, Georgia, Verdana, Trebuchet MS, Tahoma. Optionally declare your preferred font first with a web-safe fallback.",
                  },
                  {
                    removes: "SVG images",
                    because: "SVG can contain executable JavaScript. Gmail blocks all SVG for security.",
                    fix: "Export all icons and logos as PNG. Use 2x dimensions for retina (display at half the actual size using width/height attributes).",
                  },
                ].map(({ removes, because, fix }) => (
                  <li key={removes} className="border border-slate-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      Gmail removes: <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">{removes}</code>
                    </p>
                    <p className="text-xs text-slate-500 mb-1.5"><em>Why:</em> {because}</p>
                    <p className="text-xs text-green-700"><em>Fix:</em> {fix}</p>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Other Gmail rendering behaviors to know
              </h3>
              <ul className="space-y-3 mb-4">
                {[
                  {
                    behavior: "Line breaks",
                    detail: "Gmail compresses multiple empty lines. If you want vertical spacing, use explicit padding or margin on elements, or use a table cell with a fixed height for spacing.",
                  },
                  {
                    behavior: "Image blocking",
                    detail: "Gmail on desktop shows all externally hosted images by default (unlike Outlook). On mobile Gmail, behavior can vary by account settings. Always include descriptive alt text.",
                  },
                  {
                    behavior: "Link colors",
                    detail: "Gmail overrides link colors to its default blue in some views. Use !important on link colors or set the color directly on the <a> tag with an explicit inline style.",
                  },
                  {
                    behavior: "Quote collapsing",
                    detail: "In reply threads, Gmail hides repeated signature content under a '...' expander. This is normal. Recipients can see it by clicking the expander.",
                  },
                ].map(({ behavior, detail }) => (
                  <li key={behavior} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-800">{behavior}:</strong> {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4 */}
            <section id="pasting-html" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to paste an HTML signature into Gmail
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the most common question about Gmail signatures, and there&rsquo;s
                a lot of confusion about it. Here&rsquo;s the clearest explanation.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The right method: paste the rendered version
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail&rsquo;s signature editor accepts formatted HTML — but not raw HTML
                source code. If you paste{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  &lt;p style=&quot;color:red&quot;&gt;Hello&lt;/p&gt;
                </code>
                {" "}directly, it shows up as literal text, not as rendered HTML.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                What you need to paste is the <em>rendered output</em> — the visual
                result of the HTML, not the source code. When you copy from a tool like
                NeatStamp, the copy button copies the rendered version to your
                clipboard. Your clipboard contains formatted, styled content, not
                angle brackets.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Then when you paste into Gmail&rsquo;s signature editor, Gmail receives that
                rendered content and converts it to its own internal representation.
                The formatting, images, and links all carry over.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-2">
                  Step by step
                </p>
                <ol className="space-y-2 text-sm text-blue-800">
                  {[
                    "Build your signature in the NeatStamp editor.",
                    "Click 'Copy Signature' — this copies the rendered version.",
                    "Go to Gmail Settings → Signature → Create new.",
                    "Click inside the signature editor box.",
                    "Paste (Ctrl+V on Windows, Cmd+V on Mac).",
                    "You should see your formatted signature appear with correct styling.",
                    "Scroll down and click Save Changes.",
                  ].map((step, i) => (
                    <li key={step} className="flex gap-2">
                      <span className="font-bold flex-shrink-0">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The wrong method: pasting raw HTML source
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you copy the raw HTML source code from a text editor and paste it
                into Gmail&rsquo;s signature box, you get a wall of{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">&lt;table&gt;&lt;tr&gt;&lt;td&gt;</code>
                {" "}appearing as literal text. This is the most common mistake.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Some advanced users need the raw HTML for specific customization. In
                that case, the workaround is:
              </p>
              <ol className="space-y-3 mb-4 text-sm text-slate-600">
                {[
                  "Open a blank HTML file in your browser (create a file called sig.html and open it with your browser).",
                  "Paste the HTML source into that file.",
                  "View it in the browser — you see the rendered result.",
                  "Select all (Ctrl+A) and copy.",
                  "Paste that into Gmail's signature editor.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-blue-600">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <p className="text-slate-600 leading-relaxed">
                This is more work than using a tool that handles it for you. For most
                people, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>
                {" "}copy button is the right approach.
              </p>
            </section>

            {/* Section 5 */}
            <section id="multiple-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Multiple signatures and email aliases
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail allows you to create multiple signatures and assign them
                differently based on context. This is one of its most useful features
                and one of the least-known.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Full signature vs. reply signature
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Create two signatures:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="font-semibold text-slate-800 text-sm mb-2">Full signature (new emails)</p>
                  <p className="text-xs text-slate-600">Your name, title, company, phone, email, logo, LinkedIn. Everything a new contact needs to know who you are and how to reach you.</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="font-semibold text-slate-800 text-sm mb-2">Reply signature (replies & forwards)</p>
                  <p className="text-xs text-slate-600">Name, title, phone. 2–3 lines maximum. The person already knows your email. A short signature keeps long threads readable.</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                In Gmail Settings → Signature, set &ldquo;For New Emails Use&rdquo; to your full
                signature and &ldquo;On Reply/Forward Use&rdquo; to your short signature. Done.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Multiple email addresses / aliases
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have multiple email addresses (addresses added in Gmail Settings
                → Accounts and Import → Send mail as), you can assign a different
                signature to each one.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                In the Signature defaults section, there&rsquo;s a dropdown to select
                &ldquo;For emails sent from [address].&rdquo; Create the appropriate signature
                for each address and assign it here. When you compose from that address,
                Gmail automatically inserts the right signature.
              </p>

              <p className="text-slate-600 leading-relaxed">
                Useful scenarios: a work Gmail account (@company.com added as an alias)
                uses a corporate signature with a logo; a personal Gmail uses a minimal
                personal signature. Or a sales alias (sales@) uses a signature with a
                booking link; a support alias (support@) uses a signature with your
                support hours.
              </p>
            </section>

            {/* Section 6 */}
            <section id="mobile-gmail" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Gmail mobile: the separate signature problem
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is one of the most frustrating Gmail signature limitations: your
                desktop signature and your mobile signature are completely independent.
                Setting one does not affect the other.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to set your Gmail mobile signature
              </h3>
              <ol className="space-y-4 mb-6">
                {[
                  {
                    step: "Open the Gmail app on your phone",
                    detail: "This works the same on iOS and Android.",
                  },
                  {
                    step: "Tap your profile picture",
                    detail: "It's in the top-right corner. This opens a small account menu.",
                  },
                  {
                    step: "Tap 'Manage your Google Account'",
                    detail: "This opens your Google Account settings.",
                  },
                  {
                    step: "Go back to the Gmail app menu",
                    detail: "Tap the three horizontal lines (hamburger menu) at the top left of Gmail.",
                  },
                  {
                    step: "Tap Settings",
                    detail: "Scroll to the bottom of the left-side menu.",
                  },
                  {
                    step: "Select your account",
                    detail: "If you have multiple Gmail accounts, tap the one you want to set a signature for.",
                  },
                  {
                    step: "Tap 'Mobile Signature'",
                    detail: "This is separate from the regular Signature setting. Type your mobile signature here. Plain text only — no HTML formatting available in the mobile app.",
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

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-2">
                  Gmail mobile only supports plain text
                </p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  The Gmail mobile app doesn&rsquo;t support HTML signatures natively. You
                  get a plain text field. The practical approach is to set a minimal
                  plain text signature on mobile (name, title, phone) and reserve your
                  full HTML signature for emails sent from desktop. Most important
                  professional emails are sent from desktop anyway.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How your desktop signature looks on your recipients&rsquo; phones
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                There&rsquo;s an important distinction here: your mobile signature (the one
                you send from your phone) vs. how your signature looks when a
                recipient reads it on their phone.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For your signature to look good on recipients&rsquo; phones, it needs to be
                built for mobile rendering: max-width 600px, minimum 11px text, explicit
                image dimensions, tappable phone links. The{" "}
                <Link href="/email-signature-mobile-friendly" className="text-blue-600 hover:underline">
                  mobile-friendly signature guide
                </Link>{" "}
                has all the specifics. NeatStamp&rsquo;s templates are built to these
                standards automatically.
              </p>
            </section>

            {/* Section 7 */}
            <section id="dark-mode" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Dark mode in Gmail
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Dark mode behavior in Gmail varies significantly by platform. Here&rsquo;s
                what actually happens:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    platform: "Gmail on desktop (web)",
                    behavior: "Gmail desktop applies dark mode to its interface but generally leaves email content (including signatures) in light mode. Your signature should look normal for most desktop Gmail users.",
                  },
                  {
                    platform: "Gmail on Android",
                    behavior: "Gmail on Android applies a dark background but attempts to preserve inline-styled colors. If your signature elements don't have explicit background-color declarations, Android Gmail may apply dark styling inconsistently — making light text hard to read or inverting colors unexpectedly.",
                  },
                  {
                    platform: "Gmail on iOS",
                    behavior: "Similar to Android. iOS Gmail in dark mode preserves content colors more reliably than Android but can still show issues with transparent backgrounds.",
                  },
                ].map(({ platform, behavior }) => (
                  <div key={platform} className="bg-slate-50 rounded-xl p-4">
                    <p className="font-semibold text-slate-800 text-sm mb-1">{platform}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{behavior}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to make your Gmail signature dark-mode-safe
              </h3>
              <ul className="space-y-3 mb-4">
                {[
                  {
                    rule: "Declare explicit background-color on your outer table",
                    detail: "Add background-color: #ffffff to your outer <table> element. This tells Gmail (and other clients) that this area is explicitly white, so they don't apply their dark background to it.",
                  },
                  {
                    rule: "Use #333333 for text, not #000000",
                    detail: "Pure black (#000000) can cause color inversion issues in some dark mode implementations. #333333 is dark enough to be readable on light backgrounds but handles dark mode more gracefully.",
                  },
                  {
                    rule: "Declare colors on every element, not just the container",
                    detail: "If only your outer table has a color declaration but inner cells don't, dark mode can apply differently to nested elements. Set color explicitly on each <td> that contains text.",
                  },
                  {
                    rule: "Test on Android Gmail in dark mode",
                    detail: "This is the most aggressive dark mode implementation. If your signature survives Gmail on Android in dark mode, it will be fine everywhere else.",
                  },
                ].map(({ rule, detail }) => (
                  <li key={rule} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-800">{rule}:</strong> {detail}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed">
                For a thorough treatment of this, the{" "}
                <Link href="/blog/email-signature-dark-mode" className="text-blue-600 hover:underline">
                  dark mode email signature guide
                </Link>{" "}
                covers every major email client&rsquo;s behavior with code examples.
              </p>
            </section>

            {/* Section 8 */}
            <section id="common-issues" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Common Gmail signature issues — fixed
              </h2>

              <div className="space-y-5">
                {[
                  {
                    issue: "Signature not appearing in new emails",
                    cause: "The signature isn't set as the default for new emails.",
                    fix: "Go to Gmail Settings → Signature → Signature defaults. Under 'For New Emails Use,' select your signature name from the dropdown. Save Changes.",
                  },
                  {
                    issue: "Signature disappears in reply threads",
                    cause: "This is expected Gmail behavior. Gmail hides repeated content in reply chains under the '...' expander. Your signature is there — the recipient can see it by clicking the expander.",
                    fix: "No fix needed — this is correct behavior. If you want the signature visible in all replies, set a shorter reply signature that's less likely to be collapsed.",
                  },
                  {
                    issue: "Logo appears broken / shows alt text",
                    cause: "The image URL is not publicly accessible, uses http (not https), or the image has been moved or deleted.",
                    fix: "Verify your image URL is publicly accessible by opening it in an incognito window. Use https. If you're on NeatStamp Pro, use the built-in CDN hosting.",
                  },
                  {
                    issue: "Formatting looks different after saving",
                    cause: "Gmail modifies the HTML when you save it — it normalizes inline styles and restructures some elements. This is normal. The result should still look correct.",
                    fix: "Don't re-paste your signature after every minor tweak. Make all your changes first, paste once, then save. If the rendering is wrong, check that your source HTML uses only inline styles.",
                  },
                  {
                    issue: "Links aren't clickable in the signature",
                    cause: "Sometimes pasting stripped the href attributes from your links.",
                    fix: "After pasting, verify your links work by right-clicking them in the editor and checking that 'Edit link' shows the correct URL. If links are broken, paste again from a fresh copy.",
                  },
                  {
                    issue: "Extra blank lines appear above the signature",
                    cause: "Gmail automatically adds a blank line above the signature when you compose. This is a Gmail UI behavior, not a problem with your signature.",
                    fix: "This is expected. Recipients see your email content followed by the signature without excessive spacing. The blank line is a compose-view artifact.",
                  },
                  {
                    issue: "Signature shows up on all replies even though I set a shorter one",
                    cause: "The reply signature default wasn't saved, or it was set to 'No signature' accidentally.",
                    fix: "Go back to Gmail Settings → Signature defaults. Verify the 'On Reply/Forward Use' dropdown shows your short reply signature. Save Changes again.",
                  },
                  {
                    issue: "Signature not working on Gmail mobile",
                    cause: "Desktop and mobile signatures are set separately. Setting the desktop signature doesn't affect mobile.",
                    fix: "Set the mobile signature separately in the Gmail app: three lines → Settings → your account → Mobile Signature.",
                  },
                ].map(({ issue, cause, fix }) => (
                  <div key={issue} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-3 text-sm">{issue}</h3>
                    <div className="space-y-1.5">
                      <p className="text-xs">
                        <span className="font-medium text-amber-700">Cause:</span>{" "}
                        <span className="text-slate-600">{cause}</span>
                      </p>
                      <p className="text-xs">
                        <span className="font-medium text-green-700">Fix:</span>{" "}
                        <span className="text-slate-600">{fix}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                For Gmail-specific problems like your signature not working at all, the{" "}
                <Link href="/gmail-signature-not-working" className="text-blue-600 hover:underline">
                  Gmail signature not working guide
                </Link>{" "}
                has a dedicated troubleshooting checklist.
              </p>
            </section>

            {/* Section 9 */}
            <section id="generator" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Using a Gmail-optimized signature generator
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The fastest and most reliable way to get a professional Gmail signature
                is to use a generator that&rsquo;s built for Gmail&rsquo;s specific constraints.
              </p>

              <p className="text-slate-600 leading-relaxed mb-4">
                The{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                is designed specifically for this. It generates HTML that:
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "Uses only inline styles (no classes, no external CSS)",
                  "Uses web-safe fonts with proper fallbacks",
                  "Uses PNG images with explicit width/height attributes",
                  "Includes explicit background-color declarations for dark mode safety",
                  "References images at external URLs (not base64 embedded)",
                  "Works in Gmail desktop, Gmail on Android, and Gmail on iOS",
                  "Also works in Outlook, Apple Mail, and other clients",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed mb-4">
                The workflow: open the editor, fill in your details, upload your logo,
                pick a template from the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template library
                </Link>
                , click Copy, paste into Gmail. About 5 minutes total.
              </p>

              <p className="text-slate-600 leading-relaxed">
                For design inspiration before you start, the{" "}
                <Link href="/blog/email-signature-examples-2026" className="text-blue-600 hover:underline">
                  email signature examples guide
                </Link>{" "}
                has 15+ real examples across industries. For the complete design
                framework, the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  best practices guide
                </Link>{" "}
                covers fonts, colors, sizing, and what to include.
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
                  { href: "/email-signature-gmail", label: "Gmail Signature Setup Guide" },
                  { href: "/blog/how-to-create-email-signature", label: "How to Create an Email Signature" },
                  { href: "/blog/free-email-signature-template", label: "Free Email Signature Templates" },
                  { href: "/blog/email-signature-dark-mode", label: "Email Signature Dark Mode Guide" },
                  { href: "/email-signature-mobile-friendly", label: "Mobile-Friendly Signatures" },
                  { href: "/blog/email-signature-best-practices", label: "Email Signature Best Practices" },
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
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build your Gmail signature now
              </h2>
              <p className="text-red-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates Gmail-compatible signatures with inline styles,
                web-safe fonts, and proper dark mode support. Free, no account needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Create Gmail Signature — Free
                </Link>
                <Link
                  href="/templates"
                  className="inline-block px-8 py-3 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-300 transition-colors"
                >
                  See Templates
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
