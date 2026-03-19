import type { Metadata } from "next";
import Link from "next/link";
import { FAQStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Email Signature: The Complete 2025 Guide | NeatStamp",
  description:
    "Outlook breaks email signatures more than any other client. Here's why it happens, how to fix it, and how to create an Outlook-proof signature that actually works — in every version.",
  alternates: { canonical: "https://neatstamp.com/email-signature-outlook" },
};

const faqs = [
  {
    q: "What's the difference between classic Outlook and new Outlook for Windows?",
    a: "Classic Outlook (also called Outlook Desktop) uses Microsoft Word as its rendering engine, which is why it breaks HTML signatures. New Outlook for Windows, rolled out from 2023 onwards, uses a web-based rendering engine similar to Outlook Web Access. Signatures behave better in new Outlook, but the installation process is different. In classic Outlook go to File → Options → Mail → Signatures. In new Outlook go to Settings (gear icon) → Accounts → Signatures.",
  },
  {
    q: "Does an Office 365 subscription give you a different version of Outlook?",
    a: "Not necessarily. Microsoft 365 (formerly Office 365) subscribers get access to the latest version of Outlook, but you might still be running classic Outlook desktop or the new Outlook depending on your settings. The distinction is between the app architecture (classic vs. new), not the subscription tier. You can tell which version you have: classic Outlook shows a File menu in the top-left; new Outlook shows a gear/settings icon in the top-right corner, more like a web app.",
  },
  {
    q: "How do I add an HTML email signature to Outlook?",
    a: "You can't paste raw HTML code directly into Outlook's signature editor — that's one of Outlook's biggest frustrations. Instead, you need to copy the rendered signature (not the code) and paste it. In NeatStamp, click 'Copy Signature' which copies the formatted version to your clipboard. Then go to Outlook's signature settings and paste with Ctrl+V. The formatting comes across without you ever touching HTML. For advanced cases, you can also edit the .htm files stored in %APPDATA%\\Microsoft\\Signatures\\.",
  },
  {
    q: "Why do my signature images show as attachments in Outlook?",
    a: "This happens when images are embedded as base64 data URIs, which Outlook strips out and converts to attachments. Outlook desktop (classic) does not support base64-encoded images in signatures at all. The fix is to host images on a public URL and reference them with a standard <img src='https://...'> tag. NeatStamp handles this automatically — your logo and photo are hosted on NeatStamp's CDN so Outlook can load them properly.",
  },
  {
    q: "Why does my signature look fine when I compose but broken when the recipient sees it?",
    a: "There are a few causes. First, the recipient might be using a different email client that renders HTML differently. Second, some corporate email security gateways strip or modify HTML content. Third, if your signature uses CSS that Outlook ignores (like flexbox), it might look fine in your preview but fall apart when sent. Table-based layouts with inline CSS are the only truly safe approach for Outlook-to-Outlook and Outlook-to-Gmail scenarios.",
  },
  {
    q: "My Outlook signature disappeared after an update. What happened?",
    a: "Outlook updates, Windows updates, and profile migrations can all reset signature settings. Signatures are stored in %APPDATA%\\Microsoft\\Signatures\\ and the registry key HKCU\\Software\\Microsoft\\Office\\[version]\\Common\\MailSettings. After an update, Outlook sometimes loses the pointer to your signatures even though the files are still there. Go back to File → Options → Mail → Signatures and re-select your default signature for new messages and replies.",
  },
  {
    q: "Can I deploy the same signature to my whole team in Outlook?",
    a: "Yes, but it requires admin work. For Microsoft 365 organisations, you can use Exchange transport rules to append a server-side signature or disclaimer to all outbound emails. For Outlook desktop, IT admins can push signatures via Group Policy using the registry key approach. NeatStamp Pro lets each team member generate their own correctly-formatted signature using a shared template, which is often simpler than server-side deployment for smaller teams.",
  },
  {
    q: "Why doesn't Outlook support CSS properly?",
    a: "Classic Outlook renders HTML emails using the Microsoft Word engine — specifically, the same engine that renders Word documents. Word was never designed to be a web browser, so it supports only a subset of HTML and CSS. It ignores most modern CSS including flexbox, grid, position:absolute, border-radius (partially), and CSS variables. It also has quirks around padding, margins, and font rendering. This is a deliberate design choice by Microsoft, not a bug, and it has been a source of frustration for email developers for over 15 years.",
  },
  {
    q: "How do I set a signature on Outlook Mobile (iOS/Android)?",
    a: "Outlook Mobile has its own separate signature settings, completely independent from Outlook Desktop. On iOS or Android, open the Outlook app, tap your profile picture, go to Settings → Signature. You'll get a plain text editor — Outlook Mobile doesn't support rich HTML signatures. For a basic formatted look, you can type your name, title, and contact details. For a proper HTML signature on mobile, consider using your phone's native mail app instead, which handles HTML signatures better.",
  },
  {
    q: "Can I paste a rich text signature into Outlook's signature editor?",
    a: "Yes, as long as you copy the rendered output (not raw HTML). When you use NeatStamp's 'Copy Signature' button, it copies the signature as rich text to your clipboard. Outlook's signature editor accepts this paste. If your paste comes out as plain text or broken, make sure you're pasting with Ctrl+V (not Ctrl+Shift+V or 'Paste as plain text'). Also check that you're pasting into the signature editor body area, not the name field.",
  },
];

const RELATED_GUIDES = [
  { href: "/editor", label: "Signature Editor", desc: "Build your signature free" },
  { href: "/email-signature-gmail", label: "Gmail Signatures", desc: "Complete Gmail guide" },
  { href: "/email-signature-outlook-365", label: "Outlook 365 Signatures", desc: "Microsoft 365 specific" },
  { href: "/email-signature-apple-mail", label: "Apple Mail Signatures", desc: "Mac & iOS setup" },
  { href: "/html-email-signature", label: "HTML Email Signatures", desc: "Technical deep dive" },
  { href: "/email-signature-for-business", label: "Business Signatures", desc: "Team & brand guide" },
  { href: "/email-signature-with-logo", label: "Signature with Logo", desc: "Logo setup tips" },
  { href: "/professional-email-signature", label: "Professional Signatures", desc: "Best practices" },
];

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function EmailSignatureOutlookPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Email Signature for Outlook", url: "https://neatstamp.com/email-signature-outlook" },
        ]}
      />

      <article>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-20 sm:py-28">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-300 mb-6">
              <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              Outlook breaks signatures more than any other email client
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Outlook Email Signature:<br />
              <span className="text-blue-400">The Complete Guide</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              If you&apos;ve ever spent an hour perfecting an email signature — picked the fonts, lined up the logo, added your socials — only to paste it into Outlook and watch it completely fall apart... you&apos;re not alone. This guide explains exactly why Outlook does this, and how to make a signature that actually holds together.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/editor"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-400 transition-all"
              >
                Create an Outlook-Proof Signature — Free
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="text-sm text-slate-400">No account needed. Free forever.</span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">

          {/* ─── INTRO ─── */}
          <section>
            <p className="text-lg leading-relaxed text-slate-700">
              Here&apos;s a scenario that probably sounds familiar. You build a beautiful email signature in a tool, or maybe you copy one from a colleague who works in Gmail. It looks great in the preview. Colors are right, the logo is crisp, the spacing is clean. You paste it into Outlook&apos;s signature settings and hit Save.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              You send a test email to yourself. You open it. The font has changed to something you didn&apos;t choose. The logo is missing — or worse, it&apos;s shown as a paperclip attachment at the bottom. The columns have collapsed into a vertical stack. The colors are off. And somehow there are mysterious extra spaces between every line.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              This isn&apos;t bad luck. It&apos;s Outlook being Outlook. The problem is so well-known in email development circles that it has its own dedicated complaints section in every email HTML guide ever written. Outlook&apos;s behavior with HTML signatures is genuinely inconsistent, often counterintuitive, and has barely changed despite years of complaints.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              The reason it happens — and the fix for it — all comes down to one thing: Outlook renders HTML using Microsoft Word&apos;s engine, not a proper web browser. Once you understand that, everything else makes sense. And once you build your signature with that constraint in mind (or use a tool like <Link href="/editor" className="text-blue-600 hover:underline font-medium">NeatStamp</Link> that already accounts for it), you&apos;ll stop fighting Outlook and start getting consistent results.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              This guide covers: why Outlook breaks signatures at a technical level, how to set up signatures in every version of Outlook (2016, 2019, 2021, Microsoft 365, new Outlook, Outlook Web, and Outlook Mobile), the most common problems and exactly how to fix them, and what you can and can&apos;t do with HTML in Outlook.
            </p>
          </section>

          {/* ─── WHY OUTLOOK BREAKS SIGNATURES ─── */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Outlook breaks your email signature</h2>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              To understand why Outlook mangles HTML signatures, you need to understand a decision Microsoft made back in 2007 that email developers have been cursing ever since: they switched Outlook&apos;s rendering engine from Internet Explorer to Microsoft Word.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 mb-8">
              <div className="flex gap-3">
                <WarningIcon />
                <div>
                  <p className="font-semibold text-amber-900 mb-1">The Word engine problem</p>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Classic Outlook (2007 through current desktop versions) renders HTML content using the Microsoft Word rendering engine — specifically, the same code that Word uses to display documents. Word was designed to render Word documents, not web pages. It supports a small, inconsistent subset of HTML and CSS, and ignores everything else without warning.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-slate-700 mb-4">
              What does this mean in practice? Here&apos;s a non-exhaustive list of things Outlook either ignores completely or handles incorrectly:
            </p>

            <div className="grid gap-3 sm:grid-cols-2 mb-8">
              {[
                { issue: "CSS flexbox and grid", detail: "Completely ignored. Layout collapses." },
                { issue: "CSS position: absolute/relative", detail: "Not supported. Elements jump." },
                { issue: "border-radius", detail: "Partially broken — rounded corners disappear." },
                { issue: "background-image in CSS", detail: "Stripped entirely." },
                { issue: "max-width / min-width", detail: "Inconsistent behavior across versions." },
                { issue: "Base64 encoded images", detail: "Converted to attachments." },
                { issue: "Web fonts (@font-face)", detail: "Falls back to system fonts silently." },
                { issue: "CSS variables (--custom)", detail: "Not supported at all." },
                { issue: "External stylesheets", detail: "Stripped by most email clients." },
                { issue: "padding on div elements", detail: "Ignored; use tables instead." },
              ].map((item) => (
                <div key={item.issue} className="flex gap-3 rounded-lg border border-red-100 bg-red-50 p-3">
                  <XIcon />
                  <div>
                    <p className="font-medium text-sm text-slate-900">{item.issue}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-lg leading-relaxed text-slate-700 mb-4">
              Then there&apos;s the DPI scaling problem. Outlook renders images at 96 DPI by default, regardless of what your screen or the image file specifies. If you have a high-DPI (Retina) image and don&apos;t set explicit pixel dimensions with <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">width</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">height</code> attributes directly on the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">img</code> tag, Outlook will display it at the wrong size — typically much larger than intended.
            </p>

            <p className="text-lg leading-relaxed text-slate-700 mb-4">
              The base64 image problem is particularly frustrating. Most modern web-based signature generators embed images as base64 data URIs because it makes the signature self-contained. That works fine in Gmail, Apple Mail, and Outlook Web. But Outlook Desktop sees base64 image data, doesn&apos;t know what to do with it, and turns it into a file attachment. Recipients then see a blank signature with a mysterious attachment called something like &quot;image001.png&quot;. Not ideal.
            </p>

            <p className="text-lg leading-relaxed text-slate-700">
              The only layout approach that reliably works across all versions of Outlook is HTML tables — the same technique used to build websites in the late 1990s. Table cells accept inline CSS (with limitations), images with explicit dimensions behave predictably, and the overall structure doesn&apos;t collapse. It&apos;s not glamorous code, but it&apos;s what actually works. This is exactly what <Link href="/html-email-signature" className="text-blue-600 hover:underline font-medium">properly built HTML email signatures</Link> use under the hood.
            </p>
          </section>

          {/* ─── HOW TO CREATE AN OUTLOOK-PROOF SIGNATURE ─── */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How to create an Outlook-proof email signature</h2>
            <p className="text-lg leading-relaxed text-slate-700 mb-8">
              The approach that works consistently is: build your signature in a tool that understands Outlook&apos;s constraints and generates table-based HTML with hosted images and inline CSS. Then copy the rendered output (not raw HTML code) and paste it into Outlook. Here&apos;s how to do it with NeatStamp.
            </p>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white flex-shrink-0">1</span>
                  Open NeatStamp and fill in your details
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Go to <Link href="/editor" className="text-blue-600 hover:underline font-medium">NeatStamp&apos;s free editor</Link>. Enter your name, job title, company, phone number, email address, and website. Upload your profile photo if you want one — NeatStamp hosts it on its CDN automatically, which is what makes it work in Outlook (no base64 problems). Add your company logo the same way.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white flex-shrink-0">2</span>
                  Choose a template and set your colors
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Pick from NeatStamp&apos;s templates — all of them use table-based HTML that survives Outlook&apos;s renderer. Set your brand colors. Everything you see in the preview is what you&apos;ll get in Outlook, because the preview respects the same CSS limitations Outlook does. This is different from tools that show you a beautiful preview but generate code Outlook can&apos;t handle.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white flex-shrink-0">3</span>
                  Click &quot;Copy Signature&quot;
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  NeatStamp&apos;s Copy Signature button copies the rendered signature as rich text (not raw HTML code) to your clipboard. This is important: you&apos;re copying the formatted output, not source code. When you paste this into Outlook, it goes in as a formatted signature — not as literal HTML characters. Think of it like copying a formatted table from Word and pasting it somewhere else.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white flex-shrink-0">4</span>
                  Paste into Outlook&apos;s signature editor
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Open Outlook, navigate to the signature settings (exact path depends on your version — see the section below), create a new signature, click inside the signature body area, and press Ctrl+V. The signature should appear with formatting intact. Give it a name, set it as your default for new messages, and optionally set a different or no signature for replies and forwards.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white flex-shrink-0">5</span>
                  Send a test and check on multiple devices
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Send a test email to yourself and to a Gmail address. Check how it looks at different window widths. If you can, check it on your phone too. The signature from NeatStamp includes a mobile-responsive fallback so it doesn&apos;t look too wide on small screens — even though Outlook itself doesn&apos;t support CSS media queries, the table structure collapses gracefully.
                </p>
              </div>
            </div>
          </section>

          {/* ─── HOW TO ADD IN EVERY VERSION ─── */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How to add your signature in every version of Outlook</h2>
            <p className="text-lg leading-relaxed text-slate-700 mb-8">
              Outlook has more versions and flavors than almost any other email client, and the signature settings are in a different place in each one. Here&apos;s exactly where to go.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Outlook Desktop — Classic (2016, 2019, 2021, Microsoft 365)</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  This is the traditional Outlook app on Windows. The path is the same across Outlook 2016, 2019, 2021, and the Microsoft 365 version of Outlook Desktop.
                </p>
                <ol className="space-y-3">
                  {[
                    "Open Outlook and click File in the top-left menu bar.",
                    "Click Options in the left sidebar.",
                    "In the Outlook Options dialog, click Mail.",
                    "Under the Compose messages section, click Signatures…",
                    "In the Signatures and Stationery dialog, click New to create a new signature.",
                    "Give it a name (e.g., 'Main Signature') and click OK.",
                    "Click inside the large text area on the right side — this is the signature editor.",
                    "Press Ctrl+V to paste your signature from NeatStamp.",
                    "Under 'Choose default signature', set your email account, and select your new signature for both New messages and Replies/forwards.",
                    "Click OK to save.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800">
                  <strong>Shortcut:</strong> In any compose window, go to the Insert tab → Signature → Signatures… — this takes you directly to the Signatures dialog without going through File → Options.
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">New Outlook for Windows</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The &quot;new Outlook&quot; is a redesigned app Microsoft rolled out from late 2023. It looks and works more like a web app. The signature settings are in a completely different location.
                </p>
                <ol className="space-y-3">
                  {[
                    "Open the new Outlook app.",
                    "Click the gear/Settings icon in the top-right corner.",
                    "In the Settings panel, click Accounts in the left sidebar.",
                    "Click Signatures.",
                    "Click the + New signature button.",
                    "Enter a name for your signature.",
                    "Click inside the signature editor area.",
                    "Press Ctrl+V to paste your NeatStamp signature.",
                    "Use the dropdowns to set this signature as default for new messages and replies.",
                    "Click Save.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Outlook Web (OWA — Outlook.com and Microsoft 365 webmail)</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Outlook Web Access (OWA) is the browser version of Outlook, accessible at outlook.office.com or outlook.com. It has its own signature settings, separate from the desktop app.
                </p>
                <ol className="space-y-3">
                  {[
                    "Go to outlook.office.com (for work) or outlook.com (personal) and sign in.",
                    "Click the Settings gear icon in the top-right corner.",
                    "At the bottom of the Settings panel, click View all Outlook settings.",
                    "Go to Mail → Compose and reply.",
                    "Scroll down to the Email signature section.",
                    "Click inside the signature editor and press Ctrl+V to paste your signature.",
                    "Check the box to automatically include the signature on new messages.",
                    "Optionally check the box for replies and forwards.",
                    "Click Save.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
                  OWA uses a web renderer so HTML signatures generally work better here than in classic Outlook desktop. Images load properly, and more CSS is supported.
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Outlook on Mac</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Outlook for Mac is a separate app from the Windows version and has a different rendering engine. Signatures generally behave better on Mac Outlook than Windows Outlook, but the setup path is different.
                </p>
                <ol className="space-y-3">
                  {[
                    "Open Outlook for Mac.",
                    "In the top menu bar, click Outlook → Settings (or press Cmd + ,).",
                    "In the Preferences window, click Signatures.",
                    "Click the + button to add a new signature.",
                    "Give it a name.",
                    "Click in the signature editing area on the right.",
                    "Press Cmd+V to paste your NeatStamp signature.",
                    "Close the Preferences window — changes save automatically.",
                    "To set a default, go to the Accounts tab in Preferences, select your account, and choose your signature from the Default signature dropdown.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Outlook Mobile (iOS and Android)</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Outlook Mobile is its own separate app and only supports plain text signatures. If you need a <Link href="/professional-email-signature" className="text-blue-600 hover:underline font-medium">professional-looking signature</Link> on mobile, you have two options: use a plain text version, or use your phone&apos;s native mail app which handles HTML better.
                </p>
                <ol className="space-y-3">
                  {[
                    "Open the Outlook app on your phone.",
                    "Tap your profile picture or initials in the top-left corner.",
                    "Tap the Settings gear icon at the bottom.",
                    "Scroll down and tap Signature.",
                    "Toggle the Per Account Signature if you want different signatures for different accounts.",
                    "Type your signature text in the box. Plain text only — no formatting.",
                    "Tap the back arrow to save.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                  <strong>Note:</strong> If you use iPhone&apos;s native Mail app with your Microsoft 365 account, you can add an HTML signature through iOS Settings → Mail → Signature. This gives you a much richer signature experience than Outlook Mobile allows.
                </div>
              </div>
            </div>
          </section>

          {/* ─── COMMON PROBLEMS ─── */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Common Outlook signature problems — and how to fix them</h2>
            <p className="text-lg leading-relaxed text-slate-700 mb-8">
              These are the problems that come up again and again. If you&apos;re troubleshooting a specific issue, find it here.
            </p>

            <div className="space-y-8">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Images are showing as attachments, not in the signature</h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  This is the single most common Outlook signature complaint. You add a logo or photo to your signature, it shows fine on your end, but recipients see a blank space and a file attachment.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  <strong>Why it happens:</strong> The image in your signature is encoded as a base64 data URI (a long string of characters that represents the image data directly in the HTML). Outlook Desktop doesn&apos;t support base64 images and converts them to email attachments.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>The fix:</strong> Your images need to be hosted at a public URL and referenced with a standard <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">src="https://..."</code> tag. NeatStamp hosts your uploaded images on its CDN automatically. If you&apos;re building HTML by hand, upload images to an S3 bucket, your company website, or any publicly accessible hosting, and link to them.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Signature loses formatting in replies and forwards</h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  You reply to an email, your signature appears — but it&apos;s in a smaller font, the colors are wrong, or the layout has shifted.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  <strong>Why it happens:</strong> Outlook applies its own default font and size settings when you compose in &quot;plain text reply&quot; mode, or when corporate email settings force a specific font on replies. Some Outlook configurations also compress or strip inline CSS in quoted replies.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>The fix:</strong> In Outlook Desktop, go to File → Options → Mail → Stationery and Fonts. Set &quot;When replying and forwarding&quot; to &quot;Use the same as my current theme&quot; or specify your preferred font. Also make sure you&apos;re composing in HTML format (not Plain Text). Check File → Options → Mail → &quot;Compose messages in this format&quot; should be set to HTML.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Signature looks different on the recipient&apos;s end</h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Your signature looks correct in Outlook but the person receiving it sees something different — wrong font, missing bold, different spacing.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  <strong>Why it happens:</strong> If you&apos;re using a web font or a font that isn&apos;t installed on the recipient&apos;s computer, their email client falls back to a system font. Corporate security gateways sometimes also strip or modify HTML. And if the recipient uses Gmail or Apple Mail, they render HTML differently than Outlook does.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>The fix:</strong> Stick to web-safe fonts: Arial, Helvetica, Georgia, Times New Roman, Verdana, Trebuchet MS. These are installed on virtually every operating system. Also specify fallback fonts in your font-family declaration: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">font-family: Arial, Helvetica, sans-serif;</code>. NeatStamp uses web-safe fonts by default.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Can&apos;t paste a rich text signature — it pastes as plain text</h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  You copy the signature, paste it into Outlook, and it comes in as plain text with no formatting — just raw characters.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  <strong>Why it happens:</strong> Either you&apos;re pasting raw HTML source code instead of the rendered signature, or you&apos;re composing in Plain Text mode (which doesn&apos;t support formatted content), or you&apos;re using Ctrl+Shift+V (paste without formatting) instead of Ctrl+V.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>The fix:</strong> First, make sure you&apos;re using NeatStamp&apos;s &quot;Copy Signature&quot; button, not copying raw HTML from the source. Second, make sure your compose format is set to HTML: File → Options → Mail → Compose messages in HTML format. Third, use Ctrl+V (standard paste) when pasting into the signature editor — not right-click, as some context menus default to plain text paste.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Signature not showing at all</h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  You created and saved a signature but it doesn&apos;t appear when you compose a new email.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  <strong>Why it happens:</strong> Usually the signature exists but hasn&apos;t been set as the default. Or it&apos;s assigned to the wrong email account. This is especially common when you have multiple accounts in Outlook.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>The fix:</strong> Go to File → Options → Mail → Signatures. In the &quot;Choose default signature&quot; section, make sure you&apos;ve selected the correct email account from the &quot;E-mail account&quot; dropdown, then set your signature in both the &quot;New messages&quot; and &quot;Replies/forwards&quot; dropdowns. Each account has its own signature assignment.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Signature is too wide on mobile screens</h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Your signature looks great on desktop but on mobile it extends past the screen edge, requiring horizontal scrolling.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  <strong>Why it happens:</strong> The signature table has a fixed pixel width (e.g., <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">width="600"</code>) that doesn&apos;t adapt to smaller screens. Outlook doesn&apos;t support CSS media queries, so standard responsive design techniques don&apos;t work.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>The fix:</strong> Keep your signature width at or below 500px. Use a single-column layout rather than multi-column for critical information. NeatStamp signatures are designed to be narrow enough to display reasonably on most mobile screens without CSS media queries. If you&apos;re seeing this issue with a NeatStamp signature, try a more compact template from the <Link href="/editor" className="text-blue-600 hover:underline font-medium">signature editor</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* ─── TECHNICAL TRUTH ─── */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The technical truth about Outlook signatures</h2>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              If you&apos;re the type who wants to know exactly what&apos;s happening under the hood, here&apos;s the full picture. This section is for developers or technically inclined folks who want to understand the constraints rather than just work around them.
            </p>

            <div className="rounded-xl bg-slate-900 p-6 mb-8 overflow-x-auto">
              <p className="text-slate-400 text-xs font-mono mb-3">/* What actually works in Outlook */</p>
              <pre className="text-green-400 text-sm font-mono leading-relaxed whitespace-pre">{`<table width="480" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="font-family: Arial, sans-serif; font-size: 14px;
               color: #1a1a1a; padding-right: 16px;">
      <img src="https://cdn.example.com/logo.png"
           width="120" height="40" alt="Logo" />
    </td>
    <td style="font-size: 13px; color: #555555;
               line-height: 1.5; border-left: 2px solid #0078d4;
               padding-left: 16px;">
      <strong>Jane Smith</strong><br />
      Senior Account Manager<br />
      jane@company.com
    </td>
  </tr>
</table>`}</pre>
            </div>

            <p className="text-lg leading-relaxed text-slate-700 mb-4">
              The table approach above is essentially the only layout method that works reliably. Here&apos;s a precise breakdown of what Outlook supports and ignores:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                  <CheckIcon />
                  CSS that works in Outlook
                </p>
                <ul className="space-y-1 text-sm text-emerald-800">
                  {[
                    "font-family (web-safe only)",
                    "font-size, font-weight, font-style",
                    "color (hex values)",
                    "background-color on table cells",
                    "padding (on td, not div)",
                    "border (solid, specified fully)",
                    "text-align, vertical-align",
                    "line-height",
                    "text-decoration",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                  <XIcon />
                  CSS ignored by Outlook
                </p>
                <ul className="space-y-1 text-sm text-red-800">
                  {[
                    "display: flex / grid",
                    "position (relative/absolute)",
                    "border-radius",
                    "background-image",
                    "CSS variables",
                    "@font-face / web fonts",
                    "@media queries",
                    "transform, animation",
                    "box-shadow (mostly)",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-slate-700 mb-4">
              One more technical gotcha: Outlook adds its own styles on top of yours. It applies a default 10pt Times New Roman font inside the compose window, and when your signature is inserted, Outlook&apos;s own stylesheet can override yours unless you explicitly specify every style property with inline CSS. This is why you should always specify font-family, font-size, and color directly on every text element, never rely on inheritance from a parent element.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              If you want to dig deeper, the <Link href="/html-email-signature" className="text-blue-600 hover:underline font-medium">HTML email signature technical guide</Link> covers the full spec of what&apos;s safe to use across all major email clients, not just Outlook.
            </p>
          </section>

          {/* ─── OUTLOOK VS GMAIL ─── */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Outlook vs Gmail: signature compatibility</h2>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              A question that comes up a lot: if I create my signature in Outlook and someone with Gmail receives it, will it look right? And what about the reverse — if someone creates a signature in <Link href="/email-signature-gmail" className="text-blue-600 hover:underline font-medium">Gmail</Link> and I receive it in Outlook?
            </p>

            <div className="grid gap-6 sm:grid-cols-2 mb-8">
              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-3">Outlook → Gmail</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  If your Outlook signature uses table-based HTML with inline CSS and hosted images, Gmail will display it correctly. Gmail&apos;s renderer is much more capable than Outlook&apos;s — it handles most HTML and CSS properly. Your Outlook-safe signature will look fine in Gmail, and probably even better than it does in Outlook.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The one exception: Gmail strips <code className="bg-slate-100 px-1 rounded text-xs">style</code> blocks in the <code className="bg-slate-100 px-1 rounded text-xs">&lt;head&gt;</code> section, but since Outlook-safe signatures use inline CSS anyway, this doesn&apos;t matter.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-3">Gmail → Outlook</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  This is where problems occur. Gmail signature builders often use CSS that looks great in web browsers but fails in Outlook. Flexbox layouts, CSS gradients, CSS animations, web fonts — all of these will break when the email arrives in Outlook Desktop.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  If you receive a broken-looking signature from a Gmail user, that&apos;s why. It&apos;s not a problem you can fix on your end — the sender needs to update their signature to use Outlook-compatible code.
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-slate-700 mb-4">
              The safest approach if you communicate with a mixed audience (some on Outlook, some on Gmail, some on Apple Mail) is to build to the lowest common denominator — which means building to Outlook&apos;s constraints. A signature that works in Outlook will work everywhere. A signature that only works in Gmail will break for Outlook users.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              This is exactly the philosophy behind NeatStamp&apos;s templates. They look good in every client, including <Link href="/email-signature-apple-mail" className="text-blue-600 hover:underline font-medium">Apple Mail</Link>, Yahoo Mail, and even older email clients, because they&apos;re built to the strictest compatibility standard first. That&apos;s also why it&apos;s worth using a dedicated tool rather than building your signature in Gmail&apos;s editor and hoping it survives the trip to Outlook.
            </p>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-6">
              <h4 className="font-bold text-blue-900 mb-2">Quick cross-client compatibility tips</h4>
              <ul className="space-y-2">
                {[
                  "Keep images under 100KB each — large images load slowly and some clients block them",
                  "Always set alt text on images so recipients see something if images are blocked",
                  "Use hex colors (like #0078d4) rather than CSS color names or rgb()",
                  "Keep total signature width under 500px for best mobile compatibility",
                  "Test by sending to a Gmail address and a Outlook address before deploying",
                  "Avoid animated GIFs — Outlook shows only the first frame",
                ].map((tip) => (
                  <li key={tip} className="flex gap-2 text-sm text-blue-800">
                    <CheckIcon />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ─── RELATED GUIDES ─── */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {RELATED_GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                    {guide.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{guide.desc}</p>
                  <span className="mt-3 inline-flex items-center text-xs font-medium text-blue-600">
                    Read guide
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ─── MID-PAGE CTA ─── */}
          <section className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Stop fighting Outlook. Let NeatStamp handle it.
            </h2>
            <p className="mt-3 text-blue-100 max-w-lg mx-auto">
              NeatStamp generates table-based HTML with hosted images — the only format Outlook actually respects. Free forever. No account required.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-slate-50 transition-all"
            >
              Create Your Outlook Signature Free
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </section>

          {/* ─── FAQ ─── */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
              Frequently asked questions about Outlook signatures
            </h2>
            <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
              The questions that come up most often from people setting up Outlook signatures for the first time — or the fifth time after it breaks again.
            </p>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-base font-semibold text-slate-900">
                    {faq.q}
                    <svg
                      className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ─── FINAL CTA ─── */}
          <section className="text-center pb-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Ready to create a signature that actually works in Outlook?
            </h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">
              NeatStamp is free, requires no account, and generates Outlook-compatible signatures in 60 seconds. Every template is tested across Outlook 2016, 2019, 2021, Microsoft 365, and Outlook Web.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/editor"
                className="inline-flex items-center rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-all"
              >
                Create Your Free Signature
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/email-signature-outlook-365" className="text-sm font-medium text-blue-600 hover:underline">
                Microsoft 365 specific guide →
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">No account. No credit card. Free forever.</p>
          </section>

        </div>
      </article>
    </>
  );
}
