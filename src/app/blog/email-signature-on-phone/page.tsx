import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature on iPhone & Android — Setup Guide",
  description:
    "How to set up an email signature on iPhone and Android. Native apps, Gmail, Outlook, Samsung Mail. The honest truth about mobile HTML signature limitations and the best workarounds.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-on-phone",
  },
};

const faqs = [
  {
    q: "Can I have an HTML email signature on my iPhone?",
    a: "Not in the native iPhone Mail app — it only supports plain text signatures. However, you can get a rich HTML signature on iPhone by using the Gmail app or Outlook app instead of native Mail. Both support HTML signatures configured through their respective web interfaces.",
  },
  {
    q: "How do I remove 'Sent from my iPhone'?",
    a: "Go to Settings → Apps → Mail → Signature on iOS 18+, or Settings → Mail → Signature on earlier iOS versions. Delete the 'Sent from my iPhone' text and either leave it blank or type your preferred plain text signature.",
  },
  {
    q: "Does the Gmail app on Android support HTML signatures?",
    a: "No — the Gmail app on Android only supports plain text signatures, the same as Gmail on iPhone. HTML signatures in Gmail only work in the Gmail web interface (browser). If you use Gmail on Android and need an HTML signature, you'll need a workaround like the Gboard snippet method or a third-party email app.",
  },
  {
    q: "What's the best email app for HTML signatures on mobile?",
    a: "Outlook for iOS and Android currently offers the best HTML signature support on mobile — it renders the signature you configure in Outlook web (Outlook.com or Microsoft 365) accurately. Gmail's app doesn't support HTML signatures natively. Apple Mail on iOS only supports plain text.",
  },
  {
    q: "Why does my email signature look different on my phone than on my computer?",
    a: "Mobile email apps render HTML differently from desktop clients, and the native iPhone and Android apps often strip styling or convert HTML to plain text. The Gmail and Outlook apps on mobile will render HTML signatures more faithfully, but still not identically to desktop. Test your signature on multiple devices before considering it final.",
  },
];

export default function EmailSignatureOnPhonePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature on Phone",
            url: "https://neatstamp.com/blog/email-signature-on-phone",
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
            <span className="text-slate-700">Email Signature on Phone</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Setup Guide
                </span>
                <span className="text-sm text-slate-400">11 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature on iPhone &amp; Android — The Complete Setup Guide (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Mobile email signature support in 2026 is still, honestly, a bit of a mess.
                Native apps on both iOS and Android have significant limitations. But there
                are workarounds that actually work — and this guide covers both platforms,
                every major email app, and the honest trade-offs of each approach.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 11 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#the-honest-truth", "The honest truth about mobile email signatures"],
                  ["#iphone-native", "iPhone — native Mail app setup"],
                  ["#iphone-gmail", "iPhone — Gmail app workaround"],
                  ["#iphone-outlook", "iPhone — Outlook app"],
                  ["#android-gmail", "Android — Gmail app"],
                  ["#android-outlook", "Android — Outlook app"],
                  ["#android-samsung", "Android — Samsung Mail"],
                  ["#sent-from-phone", "Remove 'Sent from my iPhone' (and why you must)"],
                  ["#best-approach", "The best approach by situation"],
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

            {/* Section 1 */}
            <section id="the-honest-truth" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The honest truth about mobile email signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before we get into the how-to steps, it&rsquo;s worth setting expectations.
                Mobile email apps were not designed with HTML signatures in mind, and most
                of them don&rsquo;t support them natively. Here&rsquo;s the quick summary of where
                we stand in 2026:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">App</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Platform</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">HTML Sig?</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { app: "Apple Mail", platform: "iOS", html: "No", notes: "Plain text only. No images, no formatting.", rowClass: "text-red-600" },
                      { app: "Gmail app", platform: "iOS & Android", html: "No", notes: "Plain text only in the app. HTML requires web setup.", rowClass: "text-red-600" },
                      { app: "Outlook app", platform: "iOS & Android", html: "Yes (partial)", notes: "Renders HTML signature set in Outlook web. Best mobile option.", rowClass: "text-green-600" },
                      { app: "Samsung Mail", platform: "Android", html: "Yes (basic)", notes: "Supports limited HTML. Can paste formatted signature.", rowClass: "text-amber-600" },
                      { app: "Apple Mail", platform: "macOS", html: "Yes", notes: "Full HTML signature support on desktop Mac.", rowClass: "text-green-600" },
                    ].map((row) => (
                      <tr key={row.app + row.platform}>
                        <td className="py-3 px-4 font-medium text-slate-800">{row.app}</td>
                        <td className="py-3 px-4 text-slate-600">{row.platform}</td>
                        <td className={`py-3 px-4 font-semibold ${row.rowClass}`}>{row.html}</td>
                        <td className="py-3 px-4 text-slate-500 text-xs">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The bottom line: if you need a rich HTML signature with your logo, formatted
                text, and social links on mobile, the Outlook app is your best option. If
                you&rsquo;re using Gmail on mobile, you&rsquo;re stuck with plain text in the app — the
                HTML signature you set up in Gmail web will only appear when recipients
                receive emails sent from the web browser, not from the phone.
              </p>
              <p className="text-slate-600 leading-relaxed">
                This is a genuine limitation, not something we&rsquo;ve missed. Let&rsquo;s walk through
                each platform and what&rsquo;s actually possible.
              </p>
            </section>

            {/* Section 2 */}
            <section id="iphone-native" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                iPhone — native Mail app setup
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The native iPhone Mail app supports plain text signatures only. No images,
                no bold text, no colours, no logos. If that&rsquo;s acceptable for your use case
                (and for quick mobile replies, it often is), here&rsquo;s how to set it up.
              </p>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  iOS 18 — Step by step
                </p>
                <ol className="space-y-2 text-sm">
                  {[
                    "Open the Settings app",
                    "Scroll down and tap Apps",
                    "Tap Mail",
                    "Scroll down to Composing and tap Signature",
                    "Choose 'All Accounts' for a single signature, or 'Per Account' to set different signatures for different email accounts",
                    "Tap in the text field and type your signature",
                    "Tap the back arrow — it saves automatically",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                On older iOS versions (before iOS 18), the path is Settings &rarr; Mail &rarr;
                Signature. Same result, slightly different navigation.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to type in your plain text signature
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Since you can&rsquo;t add formatting or images, keep it clean and informative.
                A good plain text mobile signature looks like this:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-sm mb-4">
                <p className="text-slate-900">Alex Brennan</p>
                <p className="text-slate-600">Senior Designer, Studio North</p>
                <p className="text-slate-600">+44 7700 900567</p>
                <p className="text-blue-600">alex@studionorth.co.uk</p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                That&rsquo;s it. Four lines. The email address is technically redundant since
                it&rsquo;s in the From field, but it becomes useful when the email gets forwarded
                or printed.
              </p>
            </section>

            {/* Section 3 */}
            <section id="iphone-gmail" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                iPhone — Gmail app workaround
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Gmail app on iOS supports only plain text signatures set within the
                app. However, there&rsquo;s a widely used workaround: configure your HTML
                signature in Gmail&rsquo;s web interface, and use the Gmail web app in Safari
                (or Chrome) for emails where your HTML signature needs to appear.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For the Gmail app&rsquo;s built-in plain text signature:
              </p>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Gmail app on iPhone — plain text signature
                </p>
                <ol className="space-y-2 text-sm">
                  {[
                    "Open the Gmail app",
                    "Tap the menu (three lines, top left)",
                    "Scroll down and tap Settings",
                    "Tap your email account",
                    "Tap Signature settings",
                    "Toggle 'Mobile Signature' on",
                    "Type your plain text signature in the field",
                    "Tap the back arrow to save",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                For HTML signatures in Gmail, you need to use the web interface. The{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail signature guide
                </Link>{" "}
                walks through the full process of setting up an HTML signature in Gmail web,
                which will appear when you send from a browser. On mobile, you can add
                gmail.com to your Home Screen as a Progressive Web App to make access faster.
              </p>
            </section>

            {/* Section 4 */}
            <section id="iphone-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                iPhone — Outlook app (best HTML option on iOS)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you use a Microsoft 365 or Outlook.com account, the Outlook app on iOS
                is the best path to an HTML signature on your phone. The workflow is:
                configure your HTML signature in Outlook web, and the Outlook iOS app will
                use it when composing emails.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5">
                <p className="text-sm font-semibold text-blue-800 mb-3">
                  Step 1 — Set up your HTML signature in Outlook web first
                </p>
                <ol className="space-y-2 text-sm text-blue-700">
                  {[
                    "Go to outlook.com or your Microsoft 365 webmail in a browser",
                    "Click Settings (gear icon, top right)",
                    "Search for 'Signature' or go to Mail → Compose and reply → Email signature",
                    "Paste your HTML signature code (from NeatStamp or elsewhere)",
                    "Check 'Automatically include my signature on new messages'",
                    "Click Save",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 font-bold text-blue-800">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5">
                <p className="text-sm font-semibold text-blue-800 mb-3">
                  Step 2 — Configure the Outlook iOS app
                </p>
                <ol className="space-y-2 text-sm text-blue-700">
                  {[
                    "Open the Outlook app on your iPhone",
                    "Tap your profile picture or initials (top left)",
                    "Tap Settings (gear icon)",
                    "Tap your account under Mail Accounts",
                    "Tap Signature",
                    "Toggle 'Use Signature' on",
                    "The app will sync the signature from your Outlook web settings",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 font-bold text-blue-800">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-slate-600 leading-relaxed">
                The Outlook app renders HTML signatures better than any other mobile email
                client. Images, logos, and formatted text all work. It&rsquo;s not pixel-perfect
                compared to desktop Outlook, but it&rsquo;s close enough for professional use.
                The full{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook email signature guide
                </Link>{" "}
                covers desktop and web configuration in detail.
              </p>
            </section>

            {/* Section 5 */}
            <section id="android-gmail" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Android — Gmail app
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Same story as iOS: the Gmail app on Android supports plain text signatures
                only. There is no native HTML signature capability in the Gmail Android app.
              </p>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Gmail app on Android — plain text signature
                </p>
                <ol className="space-y-2 text-sm">
                  {[
                    "Open the Gmail app",
                    "Tap the menu (three horizontal lines, top left)",
                    "Tap Settings",
                    "Tap your email address",
                    "Tap Mobile Signature",
                    "Type your plain text signature",
                    "Tap OK to save",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The Gboard text snippet workaround
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                One practical workaround on Android: if you use Gboard (Google&rsquo;s keyboard),
                you can save a text snippet that expands to your full plain text signature.
                Type a short trigger like &ldquo;mysig&rdquo; and it pastes your name, title, phone,
                and email automatically. It&rsquo;s not HTML, but it&rsquo;s fast.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                To set this up: open Gboard settings &rarr; Dictionary &rarr; Personal dictionary &rarr;
                add a word. Set the shortcut to something like &ldquo;ssig&rdquo; and the phrase to your
                full plain text signature.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For HTML signatures on Gmail Android, the cleanest approach is to use Chrome
                to open Gmail in desktop mode and send from there when appearance matters.
                Not ideal, but it works.
              </p>
            </section>

            {/* Section 6 */}
            <section id="android-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Android — Outlook app
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Same as iOS: the Outlook app on Android offers the best HTML signature
                support of any mobile email client. The setup mirrors what we covered for
                iOS — configure in Outlook web first, then sync to the app.
              </p>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Outlook app on Android
                </p>
                <ol className="space-y-2 text-sm">
                  {[
                    "Open the Outlook app",
                    "Tap your profile picture (top left)",
                    "Tap the Settings gear icon",
                    "Tap your account under Mail Accounts",
                    "Tap Signature",
                    "Enable 'Use Signature' — it pulls from your Outlook web signature",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-slate-600 leading-relaxed">
                If your signature was built with NeatStamp, the HTML it generates is
                tested for Outlook compatibility, which means it will render correctly in
                the Outlook app on Android. The{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  free editor
                </Link>{" "}
                generates the code you&rsquo;ll paste into Outlook web.
              </p>
            </section>

            {/* Section 7 */}
            <section id="android-samsung" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Android — Samsung Mail
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Samsung Mail (pre-installed on Samsung Galaxy devices) has slightly better
                HTML signature support than the Gmail app. It won&rsquo;t render complex HTML
                faithfully, but it can handle basic formatting: bold text, a company name
                in a different colour, a simple line break structure.
              </p>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Samsung Mail — signature setup
                </p>
                <ol className="space-y-2 text-sm">
                  {[
                    "Open Samsung Mail",
                    "Tap the three-line menu (top left)",
                    "Tap Settings (gear icon)",
                    "Tap your email account",
                    "Tap Signature",
                    "Toggle the signature on",
                    "Tap Edit signature — this opens a basic rich text editor",
                    "Type and format your signature using the formatting toolbar",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Samsung Mail&rsquo;s rich text editor supports bold, italic, underline, font
                colour, and font size — enough to make a readable, styled signature without
                images. For images in Samsung Mail, some users paste HTML directly into the
                signature field, but results vary depending on the app version and
                Android version.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For best results on Samsung, the Outlook app is still the more reliable
                route to a proper HTML signature.
              </p>
            </section>

            {/* Section 8 */}
            <section id="sent-from-phone" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Remove &ldquo;Sent from my iPhone&rdquo; — and why you must
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                &ldquo;Sent from my iPhone&rdquo; is the default signature Apple adds to every new
                iPhone. Millions of people never remove it. Here&rsquo;s why you should.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                It tells your recipient that you didn&rsquo;t bother to customise your email
                settings. In a professional context, that signals inattention to detail.
                It&rsquo;s not a major professional crime, but there&rsquo;s simply no upside to
                keeping it. There&rsquo;s also a widespread (if slightly unfair) perception that
                it&rsquo;s used as an excuse for typos — &ldquo;sorry, sent from my iPhone&rdquo; — which
                doesn&rsquo;t reflect well.
              </p>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  How to remove it — iOS 18
                </p>
                <ol className="space-y-2 text-sm">
                  {[
                    "Open Settings",
                    "Tap Apps",
                    "Tap Mail",
                    "Tap Signature (under Composing)",
                    "Select 'All Accounts' or the specific account",
                    "Delete the 'Sent from my iPhone' text",
                    "Leave blank, or type your plain text signature",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Android doesn&rsquo;t add a default device signature, but Gmail on Android used
                to add &ldquo;Sent from Gmail&rdquo; by default. If you see that in your Gmail app
                settings, remove it the same way as the custom signature setup above — just
                clear the field.
              </p>
            </section>

            {/* Section 9 */}
            <section id="best-approach" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The best approach by situation
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s a quick decision guide based on your setup and what you actually need.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    situation: "I use Gmail on iPhone and need an HTML signature",
                    answer: "Switch to the Outlook app for emails where appearance matters, or use Gmail web in Safari (add to Home Screen for easy access). There's no native HTML signature in the Gmail iOS app.",
                    icon: "📱",
                  },
                  {
                    situation: "I use Gmail on Android and need an HTML signature",
                    answer: "Same as iPhone. Best option is the Outlook app (if your account is Microsoft 365) or Gmail web in Chrome. For Gmail accounts, the Outlook app can connect via IMAP — it's a workaround but it works.",
                    icon: "🤖",
                  },
                  {
                    situation: "I use Microsoft 365 / Outlook and need an HTML signature on mobile",
                    answer: "Install the Outlook app, configure your HTML signature in Outlook web, and the app will sync it. This is the smoothest path to a proper HTML signature on a phone.",
                    icon: "✉️",
                  },
                  {
                    situation: "I don't need HTML — just a clean plain text signature",
                    answer: "Native Mail on iPhone or the Gmail app on either platform. Four lines of plain text is all you need. Set it once and forget it.",
                    icon: "✍️",
                  },
                  {
                    situation: "I send most emails from my computer and occasionally from my phone",
                    answer: "Set up your HTML signature on desktop (full quality), and set a simple plain text signature on mobile for the times you reply on the go. Recipients will get your full signature when it matters most.",
                    icon: "💻",
                  },
                ].map((item) => (
                  <div key={item.situation} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <p className="font-semibold text-slate-900 text-sm">{item.situation}</p>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed pl-9">{item.answer}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                For related reading: the{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail signature guide
                </Link>{" "}
                covers the full desktop setup, and the{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature guide
                </Link>{" "}
                covers the Microsoft ecosystem in detail. The{" "}
                <Link href="/email-signature-apple-mail" className="text-blue-600 hover:underline">
                  Apple Mail signature guide
                </Link>{" "}
                covers the macOS desktop experience (which is much better than iOS for
                HTML signatures). And if you&rsquo;re curious about how image sizing affects
                how signatures look on mobile, the{" "}
                <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
                  email signature size guide
                </Link>{" "}
                has the exact numbers.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you need to build an HTML signature to use in Outlook web or the Outlook
                app, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                generates mobile-compatible HTML and gives you the code to paste wherever
                you need it. The{" "}
                <Link
                  href="/blog/email-signature-best-practices"
                  className="text-blue-600 hover:underline"
                >
                  email signature best practices guide
                </Link>{" "}
                is also worth reading before you finalize anything.
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
                Build the signature you&rsquo;ll use on desktop and mobile
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates HTML that works in Outlook web, Gmail web, and Apple
                Mail — with the code ready to paste wherever you need it.
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
