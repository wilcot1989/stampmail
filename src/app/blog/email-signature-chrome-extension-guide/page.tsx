import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Chrome Extension Guide (2026)",
  description:
    "How Chrome extensions make email signature setup fast and painless. Step-by-step guide to one-click Gmail install vs. manual HTML setup.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-chrome-extension-guide",
  },
};

const faqs = [
  {
    q: "Is a Chrome extension safe for installing email signatures?",
    a: "Yes, as long as the extension is from a verified publisher on the Chrome Web Store. NeatStamp's extension only requests access to Gmail and writes your signature HTML directly into the Gmail settings — it doesn't read your email content, store credentials, or access any other sites.",
  },
  {
    q: "Do I need to reinstall the Chrome extension if I update my signature?",
    a: "No. Once the extension is installed, you can update your signature in NeatStamp and re-push it to Gmail in one click. The extension handles the update without you manually copying and pasting HTML again.",
  },
  {
    q: "Does the Chrome extension work with Google Workspace accounts?",
    a: "Yes. It works with both personal Gmail (@gmail.com) and Google Workspace accounts. For Google Workspace, your admin may need to allow third-party Chrome extensions via the Admin Console, but most organizations have this enabled by default.",
  },
  {
    q: "What if I use multiple Gmail accounts?",
    a: "The NeatStamp extension supports multiple accounts. You can install different signatures for different Gmail accounts and manage them all from your NeatStamp dashboard.",
  },
  {
    q: "Can I use the extension on my work computer without admin rights?",
    a: "Chrome extensions don't require admin rights on Windows or Mac. You can install them from the Chrome Web Store with a standard user account. The only exception is if your organization has a policy that restricts extension installs — in that case, ask your IT admin to whitelist NeatStamp.",
  },
];

export default function EmailSignatureChromeExtensionGuidePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Chrome Extension Guide",
            url: "https://neatstamp.com/blog/email-signature-chrome-extension-guide",
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
            <span className="text-slate-700">Chrome Extension Guide</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Gmail
                </span>
                <span className="text-sm text-slate-400">11 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Chrome Extension: The Complete Guide for Gmail Users
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Installing an email signature manually in Gmail is a 15-step process that involves
                copying raw HTML, navigating buried settings, and praying nothing breaks. A Chrome
                extension cuts that to one click. Here&rsquo;s how it works, what to look for,
                and a step-by-step walkthrough using NeatStamp&rsquo;s extension.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 11 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#manual-problem", "The problem with manual Gmail signature setup"],
                  ["#what-extensions-do", "What a Chrome extension actually does"],
                  ["#our-extension", "NeatStamp's Gmail extension"],
                  ["#step-by-step", "Step-by-step installation guide"],
                  ["#multi-account", "Multiple Gmail accounts"],
                  ["#troubleshooting", "Troubleshooting common issues"],
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
            <section id="manual-problem" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The problem with manual Gmail signature setup
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;ve ever tried to set up a properly formatted HTML email signature in Gmail
                by hand, you know how frustrating it is. Here&rsquo;s what the process actually looks
                like without an extension or tool to help you.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The 15 steps nobody warns you about
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                First, you need to build or obtain your signature HTML. Then you open Gmail, go to
                Settings, click &ldquo;See all settings,&rdquo; scroll to the Signatures section, click
                &ldquo;Create new,&rdquo; name it, and then paste your signature. Except Gmail&rsquo;s
                editor is a rich-text box — not an HTML editor. If you paste raw HTML, you get the
                actual code showing as text, not a rendered signature.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                To get around this, most guides tell you to use a workaround: paste the HTML into a
                plain browser window (using the URL bar as an HTML preview trick), copy the rendered
                output, then paste that into Gmail. Except that strips half the formatting. Then you
                have to manually re-add font colors. Then your logo appears as a broken image because
                Gmail doesn&rsquo;t trust images from local paths.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Even when you get it working, you need to scroll back down to set it as the default
                for new emails AND for replies. Miss that second step and half your emails go out
                with no signature at all.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-2">The time cost adds up</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  For a single person: 20–40 minutes the first time, and another 10–15 minutes every
                  time you need to update it. For a team of 20 people, that&rsquo;s potentially 8–13
                  hours of collective time spent on something that should take seconds.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What breaks most often
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most common failure points in manual Gmail signature setup:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Images don't show — because they're embedded as base64 (which Gmail strips) or referenced from a local file path that recipients can't access.",
                  "Fonts revert to Arial — because Gmail normalizes fonts when you paste rich text, ignoring your original font family declarations.",
                  "Layout collapses — multi-column table layouts often break into a vertical stack because Gmail's paste function strips table attributes.",
                  "Links turn the wrong color — Gmail overrides link colors with its own defaults unless you use very specific inline style syntax.",
                  "Signature shows only in new emails, not replies — because you forgot to set it in the 'For Replies/Forwards' dropdown separately.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                There&rsquo;s a more thorough breakdown of all the ways Gmail mangles signatures in the{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail signature guide
                </Link>
                . The short version: Gmail&rsquo;s built-in signature editor was designed for plain
                text, not HTML. If you want a properly formatted signature, you need either the right
                tool or a very specific manual workflow — and the right tool is faster.
              </p>
            </section>

            {/* Section 2 */}
            <section id="what-extensions-do" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What a Chrome extension actually does
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A Chrome extension for email signatures doesn&rsquo;t just give you a better interface.
                It interacts directly with Gmail&rsquo;s API or settings in ways that bypass the
                limitations of Gmail&rsquo;s paste-and-hope interface.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How extensions write signatures to Gmail
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are two technical approaches. The first is direct API integration: the extension
                uses the Gmail API with OAuth to write your signature HTML directly to your account
                settings — the same way Gmail&rsquo;s own settings page does it, but programmatically.
                This is the cleanest approach. The signature is stored in your Gmail account, works
                on all devices, and survives browser restarts.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The second approach is DOM injection: the extension detects when Gmail is open and
                injects signature HTML into the compose window in real time. This is less reliable —
                it depends on Gmail&rsquo;s interface not changing — but it allows more complex dynamic
                content like live calendar availability or real-time banners.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp uses the API approach. Your signature is actually saved to your Gmail
                account, not injected on the fly. This means it works on mobile Gmail, in other
                browsers, and anywhere else you access your Gmail account — not just in Chrome with
                the extension active.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What permissions extensions need (and why)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail signature extensions typically request the following permissions. Here&rsquo;s
                what each one actually means:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  {
                    permission: "gmail.settings.basic",
                    why: "Required to read and write your Gmail signature settings. Without this, the extension can't install your signature.",
                  },
                  {
                    permission: "identity",
                    why: "Required for OAuth login — so the extension knows which Google account to update. It doesn't expose your password.",
                  },
                  {
                    permission: "storage",
                    why: "Stores your NeatStamp signature ID locally so the extension knows which signature to push when you click install.",
                  },
                ].map((p) => (
                  <div key={p.permission} className="bg-slate-50 rounded-lg p-4">
                    <code className="text-xs font-mono text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {p.permission}
                    </code>
                    <p className="text-sm text-slate-600 mt-2">{p.why}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">
                Reputable extensions do not request{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  gmail.readonly
                </code>{" "}
                or{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  gmail.modify
                </code>{" "}
                — those allow reading and modifying email content, which is not needed to install a
                signature. If an extension asks for those, be cautious.
              </p>
            </section>

            {/* Section 3 */}
            <section id="our-extension" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp&rsquo;s Gmail extension
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp&rsquo;s Chrome extension is built around one goal: getting your signature
                into Gmail without you having to touch any HTML. Here&rsquo;s exactly how it works
                and what it does (and doesn&rsquo;t do).
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What the extension does
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Connects to your NeatStamp account via OAuth — no password sharing, no separate login.",
                  "Reads your saved signature from NeatStamp and formats it as Gmail-compatible HTML automatically.",
                  "Pushes the HTML to your Gmail settings in one click using the Gmail API.",
                  "Sets your signature as the default for both new emails and replies/forwards — the step most people forget.",
                  "Handles image hosting automatically: images are referenced from NeatStamp's CDN, so they load for every recipient.",
                  "Works with multiple Gmail accounts — you can install different signatures to each account from the same extension.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What it doesn&rsquo;t do
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  "It doesn't read your emails. The gmail.settings.basic scope has no access to your email content.",
                  "It doesn't store your Gmail credentials. Authentication is handled entirely by Google's OAuth flow.",
                  "It doesn't inject scripts into Gmail. Once the signature is installed, the extension has done its job.",
                  "It doesn't require a paid plan to use — the extension works with NeatStamp's free tier.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-1">
                  Why this matters for team deployments
                </p>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Because the signature is written to Gmail via the API and not injected at runtime,
                  it works even when the extension isn&rsquo;t active. Once installed, the signature
                  is part of the account. This makes it suitable for teams — an admin can push
                  signatures to team members without everyone needing the extension installed
                  permanently. For team-scale deployment options, see the{" "}
                  <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline font-medium">
                    email signature for teams page
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="step-by-step" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Step-by-step installation guide
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Here&rsquo;s the full process from zero to a working Gmail signature using
                NeatStamp&rsquo;s Chrome extension. This takes about 3 minutes the first time.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  {
                    step: "1",
                    title: "Build your signature in NeatStamp",
                    body: "Go to the NeatStamp editor and create your signature. Fill in your name, title, contact details, add a logo if you have one, and choose a template layout. You can start from one of the pre-built templates to save time — the template library has options for most industries and roles.",
                  },
                  {
                    step: "2",
                    title: "Install the Chrome extension",
                    body: "From the NeatStamp dashboard, click 'Install to Gmail' on your signature. This opens the Chrome Web Store page for the NeatStamp extension. Click 'Add to Chrome', then confirm by clicking 'Add extension' in the dialog that appears. The extension installs in seconds.",
                  },
                  {
                    step: "3",
                    title: "Connect your Google account",
                    body: "Click the NeatStamp icon in your Chrome toolbar (top right, in the extensions area). Click 'Connect Google Account'. A Google OAuth popup appears — this is Google's own authentication, not a third-party form. Select the Gmail account you want to install the signature to and click Allow.",
                  },
                  {
                    step: "4",
                    title: "Select and install your signature",
                    body: "The extension panel shows your NeatStamp signatures. Click the one you want to install. Click 'Install to Gmail'. The extension writes the signature to your Gmail settings via the API. This takes 2–3 seconds.",
                  },
                  {
                    step: "5",
                    title: "Verify in Gmail settings",
                    body: "Open Gmail, go to Settings → See all settings → Signatures. You'll see your signature installed and set as the default for both new emails and replies. Compose a test email to yourself to confirm it looks correct.",
                  },
                  {
                    step: "6",
                    title: "Test on mobile",
                    body: "Because the signature is saved to your Gmail account (not just injected in Chrome), it should now appear in Gmail on your phone too. Open the Gmail app on iOS or Android, compose a new email, and check the signature appears at the bottom.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-green-800 mb-1">Updating your signature</p>
                <p className="text-sm text-green-700 leading-relaxed">
                  When you update your signature in NeatStamp, the change isn&rsquo;t automatically
                  pushed to Gmail — you need to re-install it via the extension. Open the NeatStamp
                  extension, find your updated signature, and click &rsquo;Install to Gmail&lsquo; again.
                  It takes about 5 seconds and overwrites the previous version. You don&rsquo;t need
                  to uninstall first.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Ready to get started? The{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                is free. Build your signature there first, then install the extension when you&rsquo;re
                ready to push it to Gmail.
              </p>
            </section>

            {/* Section 5 */}
            <section id="multi-account" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Multiple Gmail accounts
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you use more than one Gmail account — a personal one and a work one, or multiple
                client accounts — here&rsquo;s how to manage signatures across all of them without
                going through the manual process each time.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Installing to multiple accounts
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                In the NeatStamp Chrome extension, you can connect multiple Google accounts. Click
                &ldquo;Add account&rdquo; in the extension panel and authenticate with your second Gmail
                account. You&rsquo;ll then see both accounts listed, and you can install different
                signatures to each one independently.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                A common setup: your work account gets your full professional signature with logo,
                phone, and LinkedIn. Your personal account gets a minimal signature with just your
                name and email. Both can be installed and updated from a single NeatStamp account.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Google Workspace multiple aliases
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If your Google Workspace account has multiple email aliases (e.g.,
                hello@company.com and support@company.com on the same account), Gmail lets you set
                a different signature for each alias. The NeatStamp extension respects this — when
                you install a signature, you can choose which send-as address it applies to.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For a team or company setting up signatures across many employees,
                the individual extension approach doesn&rsquo;t scale well. At that point you want
                centralized deployment — see the{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature guide
                </Link>{" "}
                for how that works in practice, or check out{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  NeatStamp for teams
                </Link>
                .
              </p>
            </section>

            {/* Section 6 */}
            <section id="troubleshooting" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Troubleshooting common issues
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                A few things go wrong reliably enough that they&rsquo;re worth covering here. If
                something isn&rsquo;t working, check these first.
              </p>

              <div className="space-y-5">
                {[
                  {
                    problem: "Signature installed but not showing in Gmail",
                    solution: "Refresh Gmail after installation. The extension writes to Gmail's settings via the API, but Gmail caches settings in the browser. A hard refresh (Ctrl+Shift+R or Cmd+Shift+R) forces Gmail to reload the settings. If it still doesn't appear, go to Gmail Settings → Signatures to confirm it's there.",
                  },
                  {
                    problem: "'Permission denied' error during installation",
                    solution: "This happens when the Gmail API call is blocked by a Google Workspace admin policy. Ask your IT admin to allow the NeatStamp application in the Google Admin Console under Security → API Controls → App Access Control. The NeatStamp app ID is listed in the Chrome Web Store description.",
                  },
                  {
                    problem: "Images in the signature appear broken",
                    solution: "This usually means the images are referencing a URL that Gmail can't load — either a localhost URL or a private CDN. NeatStamp Pro hosts images on a public CDN automatically. On the free plan, ensure your logo is hosted at a publicly accessible URL (your company website works fine).",
                  },
                  {
                    problem: "Signature looks different in replies vs. new emails",
                    solution: "Gmail has separate signature settings for new emails and replies. If NeatStamp's extension set only the new email signature, go to Gmail Settings → Signatures and manually set the reply signature in the 'For replies/forwards' dropdown. The extension sets both by default, but Workspace admins can lock this setting.",
                  },
                  {
                    problem: "Extension icon not appearing in Chrome toolbar",
                    solution: "Chrome hides extensions by default. Click the puzzle piece icon in the Chrome toolbar (top right), find NeatStamp in the list, and click the pin icon to pin it to the toolbar. This has no effect on functionality — it's just a display preference.",
                  },
                ].map((item) => (
                  <div key={item.problem} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm">{item.problem}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.solution}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                If you&rsquo;re using Outlook instead of Gmail, the Chrome extension approach doesn&rsquo;t
                apply — Outlook has its own setup process. The{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature guide
                </Link>{" "}
                covers the correct process for that. And if your signatures are disappearing
                unexpectedly, the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  email signature best practices guide
                </Link>{" "}
                has a section on keeping signatures stable after updates.
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
                  { href: "/email-signature-gmail", label: "Gmail Signature Setup Guide" },
                  { href: "/email-signature-outlook", label: "Outlook Signature Guide" },
                  { href: "/professional-email-signature", label: "Professional Email Signature Tips" },
                  { href: "/templates", label: "Browse Signature Templates" },
                  { href: "/pricing", label: "NeatStamp Pricing" },
                  { href: "/email-signature-for-teams", label: "Signatures for Teams" },
                  { href: "/blog/email-signature-best-practices", label: "Email Signature Best Practices" },
                  { href: "/email-signature-for-business", label: "Business Email Signatures" },
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
                Ready to skip the manual setup?
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Build your signature in NeatStamp and install it to Gmail in one click — free,
                no HTML required.
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
