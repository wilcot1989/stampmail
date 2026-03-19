import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signatures in Dark Mode — How to Make Them Work",
  description:
    "Dark mode breaks email signatures in predictable ways. Transparent PNGs go invisible, dark text disappears, Gmail auto-inverts. Here's exactly how to fix each problem.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-dark-mode",
  },
};

const faqs = [
  {
    q: "Why does my email signature logo disappear in dark mode?",
    a: "This almost always happens because your logo is a PNG with a transparent background. In light mode, the white email background shows through the transparent areas, and the logo looks fine. In dark mode, the email client applies a dark background — and now that transparent area shows the dark background instead. If your logo is a dark-coloured image on a transparent background, it becomes invisible. The fix is to either use a logo with a solid white or light background behind it, or to create a version of your logo specifically for dark mode (a light-coloured version of the mark).",
  },
  {
    q: "Does Gmail dark mode invert email signature colours automatically?",
    a: "Yes and no. Gmail on Android applies an 'intelligent' dark mode that inverts colours it detects as light backgrounds. This can flip your white signature background to dark and change your text colours. Gmail on web (in a browser) respects inline styles more faithfully. The most reliable protection is to set an explicit background-color: #ffffff (or another light colour) on your outermost table element as an inline style — Gmail's dark mode is less likely to invert explicitly declared backgrounds.",
  },
  {
    q: "What's the safest background colour for an email signature in dark mode?",
    a: "White (#ffffff) with an explicit inline background-color declaration is the most reliable. Some designers use very light grey (#f8f8f8 or #fafafa) as it's slightly softer but still works in dark mode. Avoid transparent backgrounds — they cause problems in almost every dark mode implementation.",
  },
  {
    q: "Should I use black or dark grey for text in my email signature?",
    a: "Use dark grey (#333333 or #1a1a1a) rather than pure black (#000000). Pure black text on a white background can trigger aggressive colour inversion in some clients (particularly Outlook on Windows), which can make your text disappear on dark backgrounds. Dark grey is visually indistinguishable from black to most recipients, but behaves better in dark mode scenarios.",
  },
  {
    q: "How do I test my email signature in dark mode?",
    a: "Send a test email to yourself and open it on: Gmail on Android (dark mode enabled), Outlook on Windows (dark mode enabled), and Apple Mail on iOS (dark mode enabled). These three cover the main failure modes. You can also use an email testing tool like Litmus or Email on Acid to render across 90+ clients simultaneously — worth it if you're deploying signatures company-wide.",
  },
];

export default function EmailSignatureDarkModePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signatures in Dark Mode",
            url: "https://neatstamp.com/blog/email-signature-dark-mode",
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
            <span className="text-slate-700">Email Signatures in Dark Mode</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-slate-800 text-slate-200 text-xs font-semibold rounded-full">
                  Technical
                </span>
                <span className="text-sm text-slate-400">12 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signatures in Dark Mode — How to Make Them Work (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Dark mode broke a lot of email signatures when it arrived, and most people
                didn&rsquo;t notice until someone complained. By 2026, around 65% of email users
                have dark mode enabled at least some of the time — so if your signature
                isn&rsquo;t dark-mode-aware, a large chunk of your recipients are seeing something
                broken. Here&rsquo;s what&rsquo;s actually happening, and what to do about it.
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
                  ["#the-problem", "What dark mode actually does to email signatures"],
                  ["#transparent-png", "The transparent PNG problem (most common)"],
                  ["#text-colours", "Text colour issues in dark mode"],
                  ["#gmail-dark-mode", "Gmail dark mode behaviour"],
                  ["#outlook-dark-mode", "Outlook dark mode behaviour"],
                  ["#apple-mail-dark-mode", "Apple Mail dark mode behaviour"],
                  ["#logo-solutions", "Logo solutions for dark mode"],
                  ["#html-fixes", "HTML and CSS fixes for dark mode"],
                  ["#testing", "How to test your signature in dark mode"],
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
            <section id="the-problem" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What dark mode actually does to email signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Dark mode doesn&rsquo;t work the same way across every email client — and that&rsquo;s
                the root of the problem. There are roughly three different approaches email
                clients take when dark mode is on:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    type: "Full inversion",
                    description: "The client literally inverts all colours. White becomes black, black becomes white, dark grey becomes light grey. Old versions of Outlook on Windows do this. If your email has no explicit colour declarations, it gets fully inverted and may become unreadable.",
                    clients: ["Outlook for Windows (older versions)"],
                    bg: "bg-red-50 border-red-200",
                    badge: "bg-red-100 text-red-700",
                  },
                  {
                    type: "Partial / intelligent inversion",
                    description: "The client applies dark mode only to elements it detects as having light backgrounds — but not to elements with explicit dark or medium colours. Gmail on Android does this. It's trying to be helpful but the 'intelligence' is imperfect and can create strange results.",
                    clients: ["Gmail on Android", "Gmail on iOS (partial)"],
                    bg: "bg-amber-50 border-amber-200",
                    badge: "bg-amber-100 text-amber-700",
                  },
                  {
                    type: "UI only, email unchanged",
                    description: "The client applies dark mode to its own interface (sidebar, toolbar, header) but renders emails as-is, respecting inline styles. Outlook web (new) and Apple Mail on macOS mostly do this. Your email looks the same as it would in light mode.",
                    clients: ["Outlook web (new)", "Apple Mail on macOS (mostly)"],
                    bg: "bg-green-50 border-green-200",
                    badge: "bg-green-100 text-green-700",
                  },
                ].map((item) => (
                  <div key={item.type} className={`border rounded-xl p-5 ${item.bg}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{item.type}</h3>
                      <div className="flex flex-wrap gap-1">
                        {item.clients.map((c) => (
                          <span key={c} className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.badge}`}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                Because there&rsquo;s no single standard, the goal of dark-mode-friendly email
                signatures is to write HTML that holds up reasonably well across all three
                approaches. That means using explicit colour declarations, avoiding transparent
                backgrounds, and building in fallbacks. The rest of this guide covers exactly
                how to do that.
              </p>
            </section>

            {/* Section 2 */}
            <section id="transparent-png" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The transparent PNG problem (the most common issue)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the issue I see most often when someone reports their signature
                &ldquo;breaking&rdquo; in dark mode. Here&rsquo;s exactly what happens:
              </p>

              <div className="bg-slate-900 rounded-xl p-5 mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  The failure pattern
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Light mode</p>
                    <div className="h-8 bg-slate-800 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">LOGO</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Dark logo on transparent background. White email background shows through — looks fine.</p>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-400 mb-2">Dark mode</p>
                    <div className="h-8 bg-slate-700 rounded flex items-center justify-center">
                      <span className="text-slate-700 font-bold text-xs">LOGO</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Same logo, dark email background shows through transparent areas — logo invisible.</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The transparent PNG issue affects two types of logos:
              </p>
              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-2 text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>
                    <strong>Dark logo on a transparent background:</strong> Works in light mode (white fills the transparent area), breaks in dark mode (dark fills the transparent area and the dark logo is invisible).
                  </span>
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>
                    <strong>White logo on a transparent background:</strong> The classic &ldquo;dark mode only&rdquo; logo. Invisible in light mode, visible in dark mode. Often used for website dark mode, but doesn&rsquo;t work in email.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The fixes
              </h3>
              <div className="space-y-3 mb-4">
                {[
                  {
                    fix: "Add a solid background to the image itself",
                    detail: "Export your logo as a PNG with a white (or light) background filled in — not transparent. This is the simplest and most reliable fix. The logo will look identical in light mode, and in dark mode, the white background prevents the transparency issue.",
                  },
                  {
                    fix: "Set a background-color on the <td> or <div> containing the image",
                    detail: "If you need to keep the PNG transparent, wrap the image in a table cell with background-color: #ffffff as an inline style. This tells the email client to use white behind the image, preventing the dark background from showing through.",
                  },
                  {
                    fix: "Create two versions of your logo",
                    detail: "A dark version for light backgrounds and a light version for dark backgrounds. Use media queries to switch between them — though be aware that many email clients don't support media queries, so this is only a partial solution.",
                  },
                ].map((item) => (
                  <div key={item.fix} className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <p className="font-semibold text-green-900 mb-1">{item.fix}</p>
                    <p className="text-sm text-green-800 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                Of these three, the first — exporting with a solid background — is the one
                I&rsquo;d recommend to almost everyone. It&rsquo;s the most reliable and requires no HTML
                changes. The{" "}
                <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">
                  email signature with logo guide
                </Link>{" "}
                covers image export settings in more detail, including file size optimisation.
              </p>
            </section>

            {/* Section 3 */}
            <section id="text-colours" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Text colour issues in dark mode
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                After transparent PNG issues, text colour problems are the second most
                common complaint. The pattern is: signature looks fine in light mode,
                text becomes invisible or very low contrast in dark mode.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Why pure black (#000000) is a problem
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                This feels counterintuitive — surely the darkest text is the most readable?
                But pure black (#000000) is detected as a &ldquo;dark colour&rdquo; by some email clients&rsquo;
                dark mode algorithms, which then skip inverting it. On a dark background, pure
                black text becomes nearly invisible.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Dark grey (#333333 or #1a1a1a) sits in a different zone — it&rsquo;s detected as
                &ldquo;very dark but not pure black&rdquo; and gets handled differently. In practice, it
                looks identical to black in light mode and behaves better in dark mode.
                I&rsquo;d recommend #333333 as your standard body text colour for email signatures.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Colour</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Hex</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Light mode</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Dark mode risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { color: "Pure black", hex: "#000000", light: "Fine", dark: "High — can disappear", riskClass: "text-red-600" },
                      { color: "Dark grey", hex: "#333333", light: "Fine (indistinguishable)", dark: "Low — handles better", riskClass: "text-green-600" },
                      { color: "Medium grey (body text)", hex: "#555555", light: "Fine", dark: "Low", riskClass: "text-green-600" },
                      { color: "Light grey (secondary)", hex: "#999999", light: "Reduced contrast", dark: "Medium — may disappear on dark bg", riskClass: "text-amber-600" },
                      { color: "Brand blue (links)", hex: "#1a6be0", light: "Fine", dark: "Usually OK — kept as-is by most clients", riskClass: "text-green-600" },
                      { color: "White text", hex: "#ffffff", light: "Invisible on white bg!", dark: "Fine on dark bg", riskClass: "text-red-600" },
                    ].map((row) => (
                      <tr key={row.hex}>
                        <td className="py-3 px-4 font-medium text-slate-800 flex items-center gap-2">
                          <span
                            className="inline-block h-4 w-4 rounded border border-slate-300 flex-shrink-0"
                            style={{ backgroundColor: row.hex }}
                          />
                          {row.color}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-slate-600">{row.hex}</td>
                        <td className="py-3 px-4 text-slate-600 text-xs">{row.light}</td>
                        <td className={`py-3 px-4 text-xs font-medium ${row.riskClass}`}>{row.dark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Brand colours in dark mode
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Brand colours used for your name, a divider line, or highlighted text
                generally survive dark mode better than body text, because they&rsquo;re
                recognisably non-black and most clients preserve them. However, very
                light brand colours — pastels, light yellows, light blues — can become
                invisible on dark backgrounds if the email client doesn&rsquo;t invert them.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Test any brand colour you use against a dark background — simply check
                whether it&rsquo;s readable on #1a1a1a or #121212. If it isn&rsquo;t, darken the shade
                slightly or reserve that colour for decorative elements rather than text.
                For more on colour choices, the{" "}
                <Link href="/email-signature-design" className="text-blue-600 hover:underline">
                  email signature design guide
                </Link>{" "}
                covers contrast ratios and accessibility in detail.
              </p>
            </section>

            {/* Section 4 */}
            <section id="gmail-dark-mode" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Gmail dark mode behaviour
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail&rsquo;s dark mode implementation is the most complex of the major clients,
                and it behaves differently depending on whether you&rsquo;re using Gmail web
                (browser) or the Gmail mobile app.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Gmail web (browser) — dark mode
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail web respects inline styles reasonably well. If you declare
                {" "}<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">background-color: #ffffff</code>
                {" "}on your signature&rsquo;s outermost element as an inline style, Gmail web will
                mostly leave it alone — it won&rsquo;t force a dark background over your explicitly
                white one. Text colours declared inline are also generally preserved.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The catch: if any part of your signature doesn&rsquo;t have explicit colour
                declarations — text that inherits colour from the browser default, or
                table cells without a background-color — Gmail web may apply its dark mode
                logic there. The fix is explicit inline styles on everything that matters.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Gmail on Android — dark mode
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Gmail on Android is more aggressive. It applies what Google calls &ldquo;smart
                inversion&rdquo; — it analyses the email&rsquo;s colour palette and tries to apply dark
                mode without making things unreadable. In practice, this can:
              </p>
              <ul className="space-y-2 mb-5">
                {[
                  "Change your white signature background to a dark grey or near-black",
                  "Invert light-coloured text to dark, and vice versa",
                  "Leave some explicitly-coloured elements unchanged while modifying others",
                  "Make transparent PNGs pick up the dark background",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most effective protection against Gmail Android&rsquo;s smart inversion is to
                use{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  background-color: #ffffff
                </code>
                {" "}on your outer table, declare all text colours explicitly as inline styles,
                and avoid transparent PNG backgrounds. There&rsquo;s no perfect solution — Gmail
                Android&rsquo;s dark mode is genuinely unpredictable — but these steps reduce
                the failure rate substantially.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re seeing Gmail-specific issues in your signature, the{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail signature guide
                </Link>{" "}
                covers the full range of Gmail-specific quirks and fixes.
              </p>
            </section>

            {/* Section 5 */}
            <section id="outlook-dark-mode" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Outlook dark mode behaviour
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook has multiple versions with different dark mode behaviour, which makes
                it the most complicated to target.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    version: "Outlook for Windows (2016–2021)",
                    behavior: "Uses GDI rendering (Word-based). Dark mode applies full colour inversion to emails that don't have explicit background-color declarations. Elements with explicit inline background-color are treated differently — Outlook respects them as 'intentional' and may preserve them.",
                    recommendation: "Always set background-color: #ffffff on your outermost table. Declare all text colours inline. This prevents Outlook's full inversion from applying.",
                  },
                  {
                    version: "Outlook for Microsoft 365 (Windows)",
                    behavior: "The newer versions of Microsoft 365 Outlook on Windows have improved dark mode handling. They're more likely to respect inline styles than older versions. Still follows the same 'explicit = preserved' logic.",
                    recommendation: "Same advice: explicit inline background-color and text colours. Test on both old and new Outlook if your audience is mixed.",
                  },
                  {
                    version: "Outlook on Mac",
                    behavior: "Mac Outlook uses a different rendering engine (WebKit-based rather than Word-based). Dark mode support is better — it respects CSS more faithfully and is less likely to apply aggressive colour inversion.",
                    recommendation: "Still use explicit colours, but this version is much less likely to cause problems.",
                  },
                  {
                    version: "Outlook web (OWA / Outlook.com)",
                    behavior: "The new web-based Outlook is the most standards-compliant. It respects inline styles and applies dark mode only to the UI shell, not the email content (mostly). Best dark mode behaviour of the Outlook family.",
                    recommendation: "Minimal special treatment needed, but consistent inline styles are still best practice.",
                  },
                ].map((item) => (
                  <div key={item.version} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.version}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.behavior}</p>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                      <p className="text-xs font-semibold text-blue-700 mb-1">Recommendation</p>
                      <p className="text-sm text-blue-800">{item.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                For a full breakdown of Outlook-specific signature behaviour beyond dark mode,
                the{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature guide
                </Link>{" "}
                covers rendering quirks, DPI scaling, and image handling in detail.
              </p>
            </section>

            {/* Section 6 */}
            <section id="apple-mail-dark-mode" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Apple Mail dark mode behaviour
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Apple Mail on both macOS and iOS has relatively well-behaved dark mode
                support — it applies dark mode to its own interface but generally preserves
                email content as-is when inline styles are present.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Where Apple Mail does apply dark mode to email content, it uses the{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  @media (prefers-color-scheme: dark)
                </code>
                {" "}CSS media query — which means it respects CSS targeting. You can write
                dark-mode-specific CSS rules that Apple Mail will apply when dark mode is
                active. Most other email clients ignore these rules, but you can use them
                as a progressive enhancement for Apple Mail users.
              </p>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Apple Mail dark mode CSS (progressive enhancement)
                </p>
                <pre className="text-sm font-mono leading-relaxed">{`<style>
  /* Only Apple Mail and a few others will apply this */
  @media (prefers-color-scheme: dark) {
    .signature-wrapper {
      background-color: #1a1a1a !important;
    }
    .signature-text {
      color: #e0e0e0 !important;
    }
    .signature-name {
      color: #ffffff !important;
    }
  }
</style>`}</pre>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                This works for Apple Mail but is ignored by Gmail, Outlook, and most other
                clients. That&rsquo;s fine — it&rsquo;s a progressive enhancement, not a requirement.
                Your signature still needs to work in light mode (and look acceptable in
                other clients&rsquo; dark modes) even without this media query.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Apple Mail&rsquo;s transparent PNG issue mirrors what we covered earlier — the same
                fix applies. A PNG with a solid background behind the logo will avoid the
                transparent background problem in Apple Mail&rsquo;s dark mode just as in any other.
              </p>
            </section>

            {/* Section 7 */}
            <section id="logo-solutions" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Logo solutions for dark mode
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The logo is the element most likely to break visibly in dark mode, so
                it deserves its own section with specific recommendations.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option 1 — Solid background PNG (recommended)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Export your logo as a PNG with a solid white (or very light grey) background.
                No transparency. This is the most universally compatible approach because it
                removes the dark-mode variable entirely — the email client can&rsquo;t change what&rsquo;s
                inside the image. The trade-off is that the logo always has a white
                background, which is fine in nearly all professional contexts.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option 2 — Wrap in a white background table cell
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you want to keep your transparent PNG (perhaps because your logo is
                used in multiple places and changing the export is impractical), wrap
                the{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  &lt;img&gt;
                </code>
                {" "}in a table cell with a forced white background:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">{`<td style="background-color:#ffffff; padding:4px;">
  <img src="logo.png"
       width="180"
       height="48"
       alt="Company Name"
       style="display:block;width:180px;height:48px;" />
</td>`}</pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-5">
                The{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  background-color:#ffffff
                </code>
                {" "}on the{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  &lt;td&gt;
                </code>
                {" "}creates a white box behind the transparent PNG. Most clients preserve
                explicit inline background-color declarations, so your logo gets a white
                backing in both light and dark mode.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option 3 — A dedicated light logo version
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Some brands have a version of their logo designed for dark backgrounds — a
                light or white version of the mark. You can use CSS media queries in Apple
                Mail (and a few other supporting clients) to swap between logo versions:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-4 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">{`<!-- Light-mode logo (default, shown in all clients) -->
<img class="logo-light"
     src="logo-dark.png"
     width="180" height="48"
     alt="Company Name"
     style="display:block;" />

<!-- Dark-mode logo (only shown in Apple Mail with dark mode) -->
<img class="logo-dark"
     src="logo-light.png"
     width="180" height="48"
     alt="Company Name"
     style="display:none;" />

<style>
  @media (prefers-color-scheme: dark) {
    .logo-light { display: none !important; }
    .logo-dark { display: block !important; }
  }
</style>`}</pre>
              </div>
              <p className="text-slate-600 leading-relaxed">
                This works in Apple Mail. Gmail, Outlook, and most other clients will ignore
                the media query and show both images (or only the first if they handle display
                correctly). It&rsquo;s worth testing before relying on it. For a full overview of
                logo handling in email signatures, see the{" "}
                <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">
                  signature with logo guide
                </Link>
                {" "}and the{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>
                .
              </p>
            </section>

            {/* Section 8 */}
            <section id="html-fixes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                HTML and CSS fixes for dark mode — the complete checklist
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Here&rsquo;s a consolidation of every HTML-level fix that makes a meaningful
                difference to dark mode compatibility. If you&rsquo;re building or reviewing
                signature code, run through this list.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    fix: "Set background-color on the outermost table",
                    code: '<table style="background-color:#ffffff;" width="600" cellpadding="0" cellspacing="0">',
                    why: "Prevents email clients from applying a dark background to your entire signature. The most important single fix.",
                  },
                  {
                    fix: "Declare text colour explicitly on every text element",
                    code: '<td style="color:#333333; font-family:Arial,sans-serif; font-size:14px;">',
                    why: "Inherited colours are vulnerable to dark mode inversion. Explicit inline colour declarations are more likely to be preserved.",
                  },
                  {
                    fix: "Avoid pure black (#000000) for body text",
                    code: "Use #333333 instead of #000000",
                    why: "Some clients treat pure black differently in dark mode. Dark grey is visually identical but behaves better.",
                  },
                  {
                    fix: "Remove transparent backgrounds from all images",
                    code: "Export logos as PNG with white fill, not transparent",
                    why: "Transparent areas inherit the background — which becomes dark in dark mode.",
                  },
                  {
                    fix: "Set background-color on image container cells",
                    code: '<td style="background-color:#ffffff;">',
                    why: "Creates a reliable light background behind images even if the outer table background is overridden.",
                  },
                  {
                    fix: "Use border-color instead of border shorthand",
                    code: '<td style="border-top-color:#e5e7eb; border-top-width:1px; border-top-style:solid;">',
                    why: "Full CSS shorthand can sometimes cause border colours to be affected by dark mode inversion. Explicit properties are safer.",
                  },
                  {
                    fix: "Link colours — use explicit hex rather than relying on defaults",
                    code: '<a href="..." style="color:#1a6be0; text-decoration:none;">',
                    why: "Default link colour (#0000ff blue) can be changed by dark mode. Your brand link colour should be declared explicitly.",
                  },
                ].map((item) => (
                  <div key={item.fix} className="border border-slate-200 rounded-xl p-5">
                    <p className="font-semibold text-slate-900 mb-2">{item.fix}</p>
                    <div className="bg-slate-900 text-slate-300 text-xs font-mono rounded-lg p-3 mb-3 overflow-x-auto">
                      {item.code}
                    </div>
                    <p className="text-sm text-slate-500">{item.why}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                NeatStamp generates code with all of these considerations baked in. If you
                build your signature in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  editor
                </Link>
                , you get dark-mode-aware HTML without needing to write any of this manually.
                If you&rsquo;re editing existing HTML, this checklist covers the changes that
                matter most. The{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>{" "}
                goes deeper on the full code structure.
              </p>
            </section>

            {/* Section 9 */}
            <section id="testing" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to test your signature in dark mode
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Dark mode testing has to be done in real clients — there&rsquo;s no reliable way
                to predict how each client will handle your code without actually sending
                the email and viewing it. Here&rsquo;s a practical testing workflow.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Minimum viable testing (free)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Send a test email to yourself and view it on these three clients with
                dark mode enabled:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { client: "Gmail on Android", what: "Tests Google's smart inversion logic. Enable dark mode in Android Settings → Display → Dark theme.", priority: "Critical" },
                  { client: "Outlook on Windows", what: "Tests full and partial inversion behaviour. Enable dark mode in Windows Settings → Personalisation → Colours → Dark.", priority: "Critical" },
                  { client: "Apple Mail on iPhone", what: "Tests the prefers-color-scheme behaviour. Enable dark mode in iOS Settings → Display & Brightness → Dark.", priority: "Important" },
                ].map((item) => (
                  <div key={item.client} className="flex items-start gap-4 border border-slate-200 rounded-xl p-4">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">{item.client}</p>
                      <p className="text-sm text-slate-500 mt-1">{item.what}</p>
                    </div>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Extended testing (for company-wide deployment)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re deploying a signature across a whole company or need to test
                across more clients, tools like Litmus and Email on Acid render emails
                across 90+ client/OS combinations and show screenshots. At around $100/month
                for occasional use, this is worth it for company-wide deployments but
                overkill for individual signatures.
              </p>
              <p className="text-slate-600 leading-relaxed">
                One final note: if you discover that your existing signature has dark mode
                issues, the{" "}
                <Link
                  href="/blog/email-signature-images-not-displaying"
                  className="text-blue-600 hover:underline"
                >
                  guide to images not displaying in email signatures
                </Link>{" "}
                covers a broader set of image rendering problems (not just dark mode) that
                might explain other issues you find during testing.
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
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build a dark-mode-safe signature right now
              </h2>
              <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates email signature HTML with explicit inline styles,
                solid image backgrounds, and dark-mode-aware colour choices. Free.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
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
