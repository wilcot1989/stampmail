import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "New Outlook Signature Problems: Every Fix (2026)",
  description:
    "New Outlook broke your signature? Every known issue covered: missing signatures, HTML breaks, image distortion, no HTML editor, and how to fix each.",
  alternates: {
    canonical: "https://neatstamp.com/blog/new-outlook-signature-problems",
  },
};

const faqs = [
  {
    q: "Why did my signature disappear when I switched to New Outlook?",
    a: "New Outlook does not import signatures from Classic Outlook. They are completely separate systems. Classic Outlook stores signatures as local files in %APPDATA%\\Microsoft\\Signatures. New Outlook stores them in the cloud via Microsoft 365. You have to recreate every signature manually in the new interface.",
  },
  {
    q: "Can I have multiple signatures in New Outlook?",
    a: "As of early 2026, New Outlook only allows one signature per email account — one for new messages and one for replies. Classic Outlook had no limit. Microsoft has acknowledged this as a known limitation and has it on the roadmap, but there is no confirmed release date.",
  },
  {
    q: "How do I edit the HTML source of my signature in New Outlook?",
    a: "You cannot. New Outlook does not expose an HTML source editor. The only workaround is to compose a new email, paste your HTML signature into the body (using a tool that lets you paste raw HTML), then copy it and paste it into the signature field. It is clunky but it works. Alternatively, use NeatStamp to build the signature and copy the rendered output.",
  },
  {
    q: "Why do my signature images look bigger or distorted in New Outlook?",
    a: "New Outlook uses a Chromium-based rendering engine instead of the Word engine used by Classic Outlook. Images without explicit width and height attributes will be rendered at their natural pixel size, which is often larger than intended. Add width and height attributes to every img tag in your signature HTML.",
  },
  {
    q: "Does VML work in New Outlook?",
    a: "No. VML (Vector Markup Language) is ignored entirely by New Outlook. VML was used in Classic Outlook for rounded corners, background images, and shapes. In New Outlook, none of that renders. You need to replace VML elements with standard HTML and CSS alternatives.",
  },
  {
    q: "Do Outlook conditional comments work in New Outlook?",
    a: "No. Conditional comments like <!--[if mso]> are stripped by New Outlook's rendering engine. These were used to target Classic Outlook specifically. New Outlook treats them as invalid HTML and removes the entire block.",
  },
  {
    q: "My signature keeps resetting after New Outlook updates. Why?",
    a: "This is a known bug in New Outlook. After certain app updates, the signature assignment (which account uses which signature) gets cleared. The signature itself usually survives but it gets unassigned. Go to Settings → Accounts → Signatures and reassign it after each update until Microsoft patches this.",
  },
  {
    q: "Can I switch back to Classic Outlook after Microsoft forces the migration?",
    a: "Microsoft's timeline for removing the Classic Outlook toggle varies by license type. As of March 2026, most Microsoft 365 Personal and Home users can still switch back using the toggle in the top-right corner. Business and Enterprise users on certain plans have more time. Check the Microsoft 365 roadmap for your specific plan.",
  },
  {
    q: "How do I make one signature that works in both Classic and New Outlook?",
    a: "Use table-based layouts with inline CSS only. Avoid VML, avoid conditional comments, avoid CSS flexbox or grid, and use externally hosted images with explicit width and height. This subset of HTML renders correctly in both the Word engine (Classic Outlook) and the Chromium engine (New Outlook). NeatStamp generates this format by default.",
  },
  {
    q: "What happened in May 2025 with New Outlook signatures?",
    a: "A Windows Update pushed in May 2025 caused New Outlook to lose signature assignments for a large number of users. The signatures themselves were not deleted, but the setting linking each account to its signature was wiped. Affected users found that emails were going out with no signature. The fix was to go back into signature settings and reassign — but many users didn't know this and sent unsigned emails for days.",
  },
];

export default function NewOutlookSignatureProblemsPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "New Outlook Signature Problems",
            url: "https://neatstamp.com/blog/new-outlook-signature-problems",
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
            <span className="text-slate-700">New Outlook Signature Problems</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Troubleshooting
                </span>
                <span className="text-sm text-slate-400">16 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                New Outlook Signature Problems: Every Known Issue and Fix (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Microsoft&rsquo;s &ldquo;New Outlook for Windows&rdquo; has been rolling out since late 2024,
                and it has broken email signatures for millions of users. If you&rsquo;re here because
                your signature disappeared, looks wrong, won&rsquo;t save, or just behaves completely
                differently than it did in Classic Outlook &mdash; you&rsquo;re not alone, and this
                guide covers every known issue with a concrete fix for each one.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 16 min read
              </p>
            </header>

            {/* Quick jump box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-bold text-amber-900 mb-3">
                Jump to your problem
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  ["#what-is-new-outlook", "What is New Outlook and why is Microsoft pushing it?"],
                  ["#may-2025-incident", "The May 2025 incident that wiped signatures company-wide"],
                  ["#problem-1", "Signatures didn't migrate from Classic Outlook"],
                  ["#problem-2", "Only 1 signature per account"],
                  ["#problem-3", "HTML formatting looks different"],
                  ["#problem-4", "Images appear larger or distorted"],
                  ["#problem-5", "Fonts render differently"],
                  ["#problem-6", "Signature won't save"],
                  ["#problem-7", "No access to %APPDATA%\\Signatures folder"],
                  ["#problem-8", "Roaming signatures conflict"],
                  ["#problem-9", "VML code is ignored"],
                  ["#problem-10", "Conditional comments stripped"],
                  ["#problem-11", "Signature resets after app update"],
                  ["#problem-12", "Can't edit HTML source directly"],
                  ["#how-to-check", "How to check if you're on New Outlook"],
                  ["#switch-back", "How to switch back to Classic Outlook"],
                  ["#both-versions", "Making signatures that work in both versions"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-amber-800 hover:text-amber-900 hover:underline font-medium"
                    >
                      &rarr; {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                {[
                  ["#what-is-new-outlook", "What is New Outlook?"],
                  ["#may-2025-incident", "The May 2025 incident"],
                  ["#all-problems", "All 12 known signature problems and fixes"],
                  ["#how-to-check", "How to check which Outlook you're on"],
                  ["#switch-back", "How to switch back to Classic Outlook"],
                  ["#both-versions", "Signatures that work in both versions"],
                  ["#neatstamp-approach", "How NeatStamp handles this"],
                  ["#related-guides", "Related guides"],
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

            {/* Section: What is New Outlook */}
            <section id="what-is-new-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What is &ldquo;New Outlook&rdquo; and why is Microsoft pushing it?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                New Outlook for Windows is Microsoft&rsquo;s replacement for the classic Outlook
                desktop application that most of us have used since the early 2000s. The old
                app was a native Windows application that rendered email using the Microsoft
                Word rendering engine. It was clunky, had an ancient HTML renderer, and was
                expensive to maintain.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                New Outlook is built on a completely different foundation. It&rsquo;s essentially an
                Electron-based wrapper around the Outlook Web App (OWA) — the same interface
                you see when you log into Outlook.com or outlook.office.com in a browser. The
                rendering engine underneath is Chromium, which is the same engine that powers
                Chrome, Edge, and most modern browsers.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For most things, this is an improvement. But for email signatures, it has
                caused significant breakage for three reasons:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Signatures are no longer stored locally as files. They live in the cloud via Microsoft 365, which means they don't automatically migrate from the old app.",
                  "The rendering engine is completely different. HTML and CSS that was specifically crafted to work around Classic Outlook's Word engine now behaves differently — sometimes better, sometimes worse.",
                  "Features that relied on Word-specific HTML extensions (like VML for shapes and rounded corners) simply don't work at all.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-slate-600 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                Microsoft started rolling out New Outlook as opt-in in late 2023, with a
                toggle switch in the top-right corner of Classic Outlook. By late 2024 it
                became the default for new installations. By 2025, Microsoft began removing
                the toggle for some Microsoft 365 Personal and Home subscribers, making the
                migration mandatory for those users.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The business and enterprise timeline is more extended — Microsoft has committed
                to keeping Classic Outlook available for commercial customers until at least
                2026, with a full deprecation announcement expected. But for many home and
                small business users, the migration is already happening whether they chose it
                or not. And the first casualty is almost always the email signature.
              </p>
            </section>

            {/* Section: May 2025 Incident */}
            <section id="may-2025-incident" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The May 2025 incident that wiped signatures for thousands of companies
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In May 2025, a Windows Update caused New Outlook to lose signature assignments
                for a large number of users. This wasn&rsquo;t a small edge case — forums, Reddit
                threads, and IT helpdesks lit up with complaints from people who suddenly
                noticed their emails were going out with no signature.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-bold text-red-800 mb-2">What actually happened</p>
                <p className="text-sm text-red-700 leading-relaxed">
                  The signatures themselves weren&rsquo;t deleted. The cloud storage that holds the
                  signature content was fine. What broke was the <em>assignment</em> — the setting
                  that links an email account to a specific signature for new messages and
                  replies. After the update, that link was cleared, and New Outlook fell back
                  to &ldquo;no signature&rdquo; as the default.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                The fix was simple — go to Settings &rarr; Accounts &rarr; Signatures and
                reassign the signature. But the damage was done. Many users (and their
                companies) sent emails without signatures for hours or days before anyone
                noticed. For sales teams, executives, and anyone where the signature carries
                legal disclaimers, this was a real problem.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re managing signatures for a team, this incident is exactly why relying
                on individual users to set up and maintain their own signatures is risky. The{" "}
                <Link href="/outlook-signature-for-company" className="text-blue-600 hover:underline">
                  company-wide signature management guide
                </Link>{" "}
                covers how to set up signatures centrally so one Windows Update can&rsquo;t wipe
                everyone&rsquo;s at once.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The incident also highlighted a deeper issue: New Outlook signature settings
                are not robust in the way Classic Outlook&rsquo;s file-based system was. Local files
                don&rsquo;t get wiped by cloud sync bugs. Cloud-stored settings can. Until Microsoft
                matures the New Outlook signature storage, you should treat your signature as
                something that might need to be reassigned after major updates.
              </p>
            </section>

            {/* Section: All Problems */}
            <section id="all-problems" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                All 12 known signature problems in New Outlook — and how to fix each one
              </h2>

              {/* Problem 1 */}
              <div id="problem-1" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Signatures didn&rsquo;t migrate from Classic Outlook
                    </h3>
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      Very common
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  This is the first thing people hit. You switch to New Outlook and your
                  carefully crafted signature is just gone. No error, no warning — it simply
                  doesn&rsquo;t appear. That&rsquo;s because New Outlook and Classic Outlook use completely
                  different signature storage systems. Classic Outlook stored signatures as
                  .htm, .rtf, and .txt files in{" "}
                  <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">
                    %APPDATA%\Microsoft\Signatures
                  </code>
                  . New Outlook doesn&rsquo;t read that folder at all.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Manual re-setup is unavoidable. In New Outlook, go to Settings (gear icon)
                    &rarr; Accounts &rarr; Signatures &rarr; New signature. If you still have
                    access to Classic Outlook, you can open your signature there, copy the
                    content, and paste it into the New Outlook editor. Or rebuild it from
                    scratch using the{" "}
                    <Link href="/editor" className="underline font-medium">
                      NeatStamp editor
                    </Link>
                    , which generates HTML that works in both versions.
                  </p>
                </div>
              </div>

              {/* Problem 2 */}
              <div id="problem-2" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Only 1 signature per account (vs. unlimited in Classic)
                    </h3>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      Ongoing limitation
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  In Classic Outlook, you could create unlimited signatures and assign
                  different ones for new messages, replies, different accounts, or switch
                  manually while composing. Sales reps would use different signatures for
                  different contexts. Executives had a formal version and a casual version.
                  New Outlook cuts this down to one signature for new messages and one for
                  replies — per account.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Workaround</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    There is no clean fix as of March 2026. Microsoft has acknowledged this
                    on the Microsoft 365 roadmap as a feature request with significant
                    votes. The practical workaround is to keep one all-purpose signature
                    and manually edit it when you need a different variant. Alternatively,
                    some teams use OWA (Outlook Web Access) which has slightly more
                    flexibility. If your team needs multiple signature variants, this alone
                    may be reason to delay migration to New Outlook.
                  </p>
                </div>
              </div>

              {/* Problem 3 */}
              <div id="problem-3" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      HTML formatting looks different (web engine vs. Word engine)
                    </h3>
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      Very common
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Classic Outlook used the Word rendering engine — the same engine that
                  renders Word documents. It had notoriously bad CSS support: no flexbox, no
                  grid, limited border-radius, no CSS variables, partial margin support.
                  Signature HTML for Classic Outlook was written defensively, with table-based
                  layouts and inline styles specifically to work around these limitations.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  New Outlook uses a Chromium-based engine. It supports modern CSS. This
                  sounds like an improvement — and it often is — but it means your
                  Classic-Outlook-optimized signature HTML may now render differently. Tables
                  that were sized to compensate for Word&rsquo;s quirks can look off in Chromium.
                  Spacing that was tuned for Word&rsquo;s odd margin interpretation may now have
                  too much or too little whitespace.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Test your signature in both versions side by side. The safest HTML uses
                    table-based layout with inline CSS, with no VML and no conditional
                    comments. This renders predictably in both the Word engine and the
                    Chromium engine. See the{" "}
                    <Link href="/outlook-signature-html" className="underline font-medium">
                      Outlook-compatible HTML guide
                    </Link>{" "}
                    for the full ruleset. The{" "}
                    <Link href="/email-signature-outlook-compatible" className="underline font-medium">
                      compatibility checklist
                    </Link>{" "}
                    lists every property to avoid.
                  </p>
                </div>
              </div>

              {/* Problem 4 */}
              <div id="problem-4" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Images appear larger or distorted
                    </h3>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      Common
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Your company logo or headshot looks fine in Classic Outlook but blows up
                  to an enormous size in New Outlook — or vice versa. The cause is almost
                  always missing width and height attributes on the{" "}
                  <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;img&gt;</code>{" "}
                  tag, combined with the difference in how the two rendering engines handle
                  unsized images.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Classic Outlook&rsquo;s Word engine would sometimes apply default sizing constraints
                  to images. Chromium in New Outlook renders images at their native pixel
                  dimensions unless explicitly constrained. So a 600px-wide logo that looked
                  fine because Word was compressing it now fills the entire screen.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Add explicit{" "}
                    <code className="text-xs bg-green-100 px-1 rounded font-mono">width</code>{" "}
                    and{" "}
                    <code className="text-xs bg-green-100 px-1 rounded font-mono">height</code>{" "}
                    attributes to every image tag in your signature HTML. Use the actual
                    display size you want, not the image&rsquo;s native size. Also add{" "}
                    <code className="text-xs bg-green-100 px-1 rounded font-mono">style=&quot;width:Xpx;height:Ypx;&quot;</code>{" "}
                    as an inline style as a belt-and-suspenders approach, since some clients
                    ignore HTML attributes in favor of CSS. Use images that are 2x the display
                    size for retina screens, but constrain them to the display size via
                    attributes.
                  </p>
                </div>
              </div>

              {/* Problem 5 */}
              <div id="problem-5" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-sm font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Fonts render differently (Calibri Light missing, etc.)
                    </h3>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      Common
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Several users have reported that fonts like Calibri Light either don&rsquo;t
                  render at all or look different in New Outlook. Some fonts that were
                  available via Windows font substitution in Classic Outlook aren&rsquo;t available
                  in the Electron/Chromium environment. Other fonts render at slightly
                  different weights or metrics due to the engine change.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Stick to system-safe fonts for email signatures: Arial, Verdana, Georgia,
                    Trebuchet MS, Tahoma, Times New Roman, and the standard Calibri (not
                    Calibri Light). Always specify a fallback stack in your font-family
                    declaration, like{" "}
                    <code className="text-xs bg-green-100 px-1 rounded font-mono">
                      font-family: Arial, Helvetica, sans-serif
                    </code>
                    . Web fonts (Google Fonts, etc.) are unreliable in email clients and
                    should be avoided entirely.
                  </p>
                </div>
              </div>

              {/* Problem 6 */}
              <div id="problem-6" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                    6
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Signature won&rsquo;t save (known bug with OWA workaround)
                    </h3>
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      Known bug
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Some users get stuck in a loop where they type or paste a signature, click
                  Save, and nothing happens — or the signature appears to save but disappears
                  the next time they open settings. This happens most often when the signature
                  HTML contains characters or elements that the New Outlook save function
                  doesn&rsquo;t handle correctly, particularly complex formatting or certain
                  special characters.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Workaround</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Use OWA (Outlook Web App) instead of the desktop app to set up your
                    signature. Go to outlook.office.com, log in with the same account, then
                    go to Settings &rarr; Mail &rarr; Compose and reply &rarr; Email signature.
                    Set up your signature there. Because New Outlook and OWA share the same
                    cloud backend, the signature you set in OWA will appear in New Outlook.
                    This bypasses whatever bug is preventing the save in the desktop app.
                    See the related guide on{" "}
                    <Link href="/blog/outlook-signature-not-saving" className="underline font-medium">
                      Outlook signature not saving
                    </Link>{" "}
                    for more detail.
                  </p>
                </div>
              </div>

              {/* Problem 7 */}
              <div id="problem-7" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 text-sm font-bold">
                    7
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      No access to the %APPDATA%\Signatures folder
                    </h3>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      By design
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Classic Outlook stored signatures as files you could directly edit, back up,
                  copy between machines, and version-control. The folder at{" "}
                  <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">
                    %APPDATA%\Microsoft\Signatures
                  </code>{" "}
                  contained .htm, .rtf, and .txt versions of each signature. Many IT
                  departments used scripts to deploy signatures by simply writing files to
                  this folder. New Outlook doesn&rsquo;t use this folder at all.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">What this means</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Signatures in New Outlook are cloud-stored via Microsoft 365. This means
                    file-based deployment scripts won&rsquo;t work. IT teams need to use the
                    Microsoft 365 admin center, PowerShell with Exchange Online cmdlets, or a
                    third-party signature management platform to deploy signatures centrally.
                    If you relied on the Signatures folder for backup or portability, that
                    workflow no longer applies. See{" "}
                    <Link href="/outlook-signature-for-company" className="underline font-medium">
                      company-wide Outlook signature management
                    </Link>{" "}
                    for modern alternatives.
                  </p>
                </div>
              </div>

              {/* Problem 8 */}
              <div id="problem-8" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-sm font-bold">
                    8
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Roaming signatures conflict
                    </h3>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      Common for Microsoft 365 users
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Microsoft 365 introduced &ldquo;roaming signatures&rdquo; — a feature that syncs
                  signatures across devices via the cloud. This should be convenient, but it
                  creates conflicts when users have set up different signatures on different
                  devices and the sync overwrites the preferred version. It also interacts
                  oddly with signatures set up in OWA vs. in the desktop app.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  For a full breakdown of how roaming signatures work and what goes wrong, the{" "}
                  <Link href="/blog/outlook-roaming-signatures" className="text-blue-600 hover:underline">
                    Outlook roaming signatures guide
                  </Link>{" "}
                  covers every edge case in detail.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    If roaming signatures are causing conflicts, you can disable the feature
                    via the Microsoft 365 admin center (Exchange admin center &rarr; Org settings
                    &rarr; Roaming signatures). If you&rsquo;re an individual user without admin
                    access, the cleanest approach is to delete all signatures across all
                    devices and OWA, then set up fresh in one place and let it sync.
                  </p>
                </div>
              </div>

              {/* Problem 9 */}
              <div id="problem-9" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                    9
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      VML code is ignored
                    </h3>
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      Breaking change
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  VML (Vector Markup Language) is a Microsoft-specific HTML extension that
                  Classic Outlook supported for drawing shapes, applying background images
                  to table cells, and creating rounded corners. Many professional email
                  signature templates — especially older ones or those built specifically
                  for Outlook — rely on VML for visual effects that couldn&rsquo;t be done with
                  standard CSS in the Word renderer.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  In New Outlook, VML is completely ignored. Not rendered incorrectly —
                  just not rendered at all. If your signature has a colored background panel
                  achieved via VML, it will be gone. If you have a circular headshot using
                  VML for the mask, it will be a plain square image or nothing.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Replace VML elements with their CSS or standard HTML equivalents. For
                    background colors on table cells, use{" "}
                    <code className="text-xs bg-green-100 px-1 rounded font-mono">bgcolor</code>{" "}
                    attribute and{" "}
                    <code className="text-xs bg-green-100 px-1 rounded font-mono">background-color</code>{" "}
                    inline style. For rounded corners, use{" "}
                    <code className="text-xs bg-green-100 px-1 rounded font-mono">border-radius</code>{" "}
                    (which New Outlook&rsquo;s Chromium engine supports, even though Classic Outlook
                    didn&rsquo;t). For background images, note that New Outlook supports CSS
                    background-image on table cells — something Classic Outlook required VML
                    for. Rebuild any VML-dependent design elements from scratch.
                  </p>
                </div>
              </div>

              {/* Problem 10 */}
              <div id="problem-10" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                    10
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Conditional comments are stripped
                    </h3>
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      Breaking change
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Classic Outlook conditional comments look like this:
                </p>
                <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                  <code className="text-xs font-mono whitespace-pre">
                    {`<!--[if mso]>
  <table width="600">
    <!-- Classic Outlook-specific layout -->
  </table>
<![endif]-->`}
                  </code>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  These were a way to send Classic Outlook-specific HTML that other clients
                  would ignore, because those clients would just see it as an HTML comment.
                  Many signature templates used conditional comments extensively — wrapping
                  VML in conditional comments, applying different table widths, adding
                  Outlook-specific spacing.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  New Outlook strips conditional comment blocks entirely. The entire block
                  between{" "}
                  <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;!--[if mso]&gt;</code>{" "}
                  and{" "}
                  <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;![endif]--&gt;</code>{" "}
                  is removed. If your signature used conditional comments to show elements
                  that Classic Outlook needed, those elements won&rsquo;t appear at all.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Fix</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Audit your signature HTML for any conditional comment blocks and replace
                    them with standard HTML that works in both renderers. The goal is a single
                    HTML structure that renders well in both Classic Outlook&rsquo;s Word engine
                    and New Outlook&rsquo;s Chromium engine — which is possible if you stick to
                    table-based layouts and inline CSS. Read more in the{" "}
                    <Link href="/email-signature-outlook-compatible" className="underline font-medium">
                      Outlook-compatible signature guide
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Problem 11 */}
              <div id="problem-11" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-sm font-bold">
                    11
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Signature resets after New Outlook updates
                    </h3>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      Intermittent bug
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  This is the signature-assignment bug that caused the May 2025 incident
                  (see above), but it also happens at a smaller scale with routine New Outlook
                  app updates. After an update, New Outlook may clear the assignment that
                  links your email account to a specific signature. The signature still
                  exists in storage, but the setting saying &ldquo;use this signature for new
                  messages&rdquo; gets cleared.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Workaround</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    After any significant New Outlook update, check your signature settings
                    before sending email. Go to Settings &rarr; Accounts &rarr; Signatures and
                    verify that your signature is still assigned to the correct account for
                    both new messages and replies. It takes 30 seconds and prevents the
                    embarrassment of sending emails with no signature. Microsoft is aware of
                    this bug; watch the update notes for a fix.
                  </p>
                </div>
              </div>

              {/* Problem 12 */}
              <div id="problem-12" className="border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 text-sm font-bold">
                    12
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Can&rsquo;t edit HTML source directly
                    </h3>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      By design
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  Classic Outlook had a workaround for editing signature HTML: you could open
                  the .htm file in the Signatures folder directly in Notepad or a code editor.
                  You could tweak anything. New Outlook doesn&rsquo;t expose an HTML source editor
                  anywhere in the UI, and the signature content lives in the cloud, not in
                  accessible local files.
                </p>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                  If you paste HTML into the signature editor using the standard paste function,
                  New Outlook&rsquo;s editor will strip or modify your code — it tries to &ldquo;clean up&rdquo;
                  HTML and often removes things you need.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-green-800 mb-1">Workaround</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    The most reliable method: use OWA to set up the signature. In OWA&rsquo;s
                    signature editor, you can paste rendered HTML (copy the rendered visual
                    output from a signature tool, not raw code) and it preserves formatting
                    better than the desktop editor. Alternatively, use the NeatStamp editor
                    to build and preview your signature, then use the Install Guide specific
                    to New Outlook — it walks through the exact paste method that preserves
                    your formatting. The{" "}
                    <Link href="/email-signature-outlook-365" className="underline font-medium">
                      Outlook 365 signature guide
                    </Link>{" "}
                    covers this in detail.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: How to check */}
            <section id="how-to-check" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to check if you&rsquo;re on New Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The clearest indicator is a toggle switch in the top-right corner of the
                Outlook window. If you see a toggle labeled &ldquo;New Outlook&rdquo; or &ldquo;Try the new
                Outlook&rdquo; — and it&rsquo;s switched <strong>on</strong> — you&rsquo;re on New Outlook.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Other signs you&rsquo;re on New Outlook:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "The interface looks significantly different — cleaner, more web-like, similar to Outlook.com",
                  "File → Options no longer exists (New Outlook uses a Settings panel instead)",
                  "There is no more Word-like ribbon for composing email — the toolbar is simpler",
                  "You can't find the Signatures folder at %APPDATA%\\Microsoft\\Signatures, or it's empty",
                  "When you right-click the taskbar icon, it says 'Outlook' not 'Outlook (new)'",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-slate-600 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re unsure, the definitive check is to look at Help &rarr; About in Classic
                Outlook — the version number and app name will confirm which one you&rsquo;re running.
                New Outlook reports a version number in the format &ldquo;1.2025.XXXX.X&rdquo; while Classic
                Outlook reports &ldquo;16.X.XXXXX.XXXXX&rdquo;.
              </p>
            </section>

            {/* Section: Switch back */}
            <section id="switch-back" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to switch back to Classic Outlook (while you still can)
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-bold text-amber-800 mb-1">Time-sensitive</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Microsoft is removing the ability to switch back for some user types. As of
                  March 2026, Microsoft 365 Personal and Home subscribers on the Current Channel
                  can no longer toggle back to Classic Outlook in some regions. If you still
                  have the toggle, use it now if you need to — it may disappear after the next
                  update.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you currently see the New Outlook toggle and it&rsquo;s turned on, you can switch
                back by clicking the toggle to turn it off. Outlook will restart in Classic mode.
                Your Classic Outlook signatures should still be intact in the Signatures folder
                (they&rsquo;re not deleted when you switch to New Outlook).
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If the toggle is gone and you&rsquo;re stuck on New Outlook, there are two options:
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    label: "Option 1: Use the classic Outlook installer",
                    body: "Microsoft still provides the classic Outlook .exe installer for Microsoft 365 Business, Enterprise, and Education subscribers. IT admins can deploy it via the Office Deployment Tool. Individual users can sometimes find it via their Microsoft 365 account portal under Apps & devices.",
                  },
                  {
                    label: "Option 2: Adapt to New Outlook",
                    body: "If you can't switch back, the practical path is to rebuild your signature to work correctly in New Outlook. Follow the dual-compatibility rules in the next section, use the NeatStamp editor which generates New Outlook-compatible HTML, and verify your signature looks right before sending.",
                  },
                ].map((opt) => (
                  <div key={opt.label} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm">{opt.label}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{opt.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">
                Microsoft&rsquo;s official end-of-life date for Classic Outlook is still subject to
                change, but internal communications suggest it will be fully deprecated by
                mid-2026 for most commercial customers and 2027 for Enterprise. If your
                organization relies heavily on Classic Outlook signature workflows, now is
                the time to plan the migration.
              </p>
            </section>

            {/* Section: Both versions */}
            <section id="both-versions" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Making signatures that work in both Classic and New Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The good news: it&rsquo;s possible to write one signature that works correctly in
                both Classic and New Outlook. Your organization may have a mix of users on
                both versions, or you may want to future-proof your signature before the
                forced migration. Here are the rules.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Layout: table-based, always
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Both Classic Outlook&rsquo;s Word engine and New Outlook&rsquo;s Chromium engine handle
                HTML tables reliably. Use{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;table&gt;</code>,{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;tr&gt;</code>, and{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;td&gt;</code>{" "}
                for your layout. No div-based layouts, no flexbox, no CSS grid. Tables are
                the one thing both engines agree on.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                CSS: inline only, safe properties only
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-xs font-bold text-green-800 mb-2">Safe to use</p>
                  <ul className="text-xs text-green-700 space-y-1 font-mono">
                    {[
                      "color",
                      "font-family",
                      "font-size",
                      "font-weight",
                      "font-style",
                      "text-align",
                      "text-decoration",
                      "padding",
                      "border (simple)",
                      "background-color",
                      "width (on td/table)",
                      "line-height",
                    ].map((p) => (
                      <li key={p} className="flex items-center gap-1">
                        <span className="text-green-500">&#10003;</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <p className="text-xs font-bold text-red-800 mb-2">Avoid</p>
                  <ul className="text-xs text-red-700 space-y-1 font-mono">
                    {[
                      "display: flex",
                      "display: grid",
                      "position: absolute",
                      "VML elements",
                      "<!--[if mso]-->",
                      "border-radius (Classic breaks)",
                      "box-shadow",
                      "opacity",
                      "transform",
                      "CSS variables (--var)",
                      "Web fonts (@import)",
                      "external stylesheets",
                    ].map((p) => (
                      <li key={p} className="flex items-center gap-1">
                        <span className="text-red-400">&#10007;</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Images: hosted externally, sized explicitly
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Host all images on a public HTTPS server. Do not use base64-encoded images.
                Do not use cid: references. Add explicit{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">width</code>{" "}
                and{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">height</code>{" "}
                attributes to every{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;img&gt;</code>{" "}
                tag. Mirror these in inline styles. This prevents the size distortion problem
                and keeps images from appearing as attachments.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                No VML, no conditional comments
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                These are the two biggest breaking changes. Audit any existing signature HTML
                for VML tags (they start with{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">v:</code>{" "}
                like{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;v:rect&gt;</code>) and for
                conditional comment blocks. Remove or replace both with standard HTML equivalents.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Safe fonts with fallbacks
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Stick to web-safe system fonts: Arial, Verdana, Georgia, Tahoma, Trebuchet
                MS, regular Calibri. Always specify a fallback like{" "}
                <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">
                  font-family: Arial, Helvetica, sans-serif
                </code>
                . This ensures consistent rendering when the first-choice font isn&rsquo;t available.
                For further guidance, see the{" "}
                <Link href="/outlook-signature-html" className="text-blue-600 hover:underline">
                  Outlook signature HTML reference
                </Link>
                .
              </p>

              <p className="text-slate-600 leading-relaxed">
                If you follow these rules, your signature will render consistently across
                both Classic Outlook (with its Word engine) and New Outlook (with its Chromium
                engine). It will also work correctly in Gmail, Apple Mail, Outlook mobile, and
                most other clients. The{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook email signature setup guide
                </Link>{" "}
                walks through installation for both versions step by step.
              </p>
            </section>

            {/* Section: NeatStamp approach */}
            <section id="neatstamp-approach" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How NeatStamp handles New Outlook compatibility
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                When Microsoft started rolling out New Outlook, we updated our signature
                generator to produce HTML that works correctly in both versions. Every
                signature you build in NeatStamp uses table-based layout with inline CSS,
                externally hosted images with explicit dimensions, safe system fonts, and
                no VML or conditional comments.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                We also added a New Outlook Migration Checker that runs 15 compatibility
                tests against your signature HTML before export:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  {[
                    "No VML elements detected",
                    "No conditional comments",
                    "No base64 image data",
                    "All images have width/height",
                    "No external stylesheets",
                    "No CSS flexbox or grid",
                    "No web font imports",
                    "All links use https://",
                    "Images on public CDN",
                    "No CSS variables",
                    "No position: absolute",
                    "Font-family fallbacks present",
                    "No cid: image references",
                    "Table layout confirmed",
                    "Inline CSS only",
                  ].map((check, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500 font-bold text-base">&#10003;</span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                If any check fails, NeatStamp tells you exactly what the problem is and how
                to fix it before you copy the signature into Outlook. This is the kind of
                thing that used to require a developer to audit — now it&rsquo;s automated.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                We also provide a New Outlook-specific install guide inside the editor, with
                the exact copy-paste method that preserves your formatting in the New Outlook
                signature editor. It&rsquo;s one of the trickier parts of New Outlook setup and
                the guide saves significant trial and error.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/editor"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Build a New Outlook-compatible signature
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Browse templates
                </Link>
              </div>
            </section>

            {/* Related Guides */}
            <section id="related-guides" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Related guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    href: "/blog/outlook-signature-not-working",
                    title: "Outlook Signature Not Working",
                    desc: "Every cause and fix for Classic Outlook signature issues.",
                  },
                  {
                    href: "/blog/outlook-signature-disappeared",
                    title: "Outlook Signature Disappeared",
                    desc: "Why signatures vanish after updates and how to recover them.",
                  },
                  {
                    href: "/blog/outlook-signature-not-saving",
                    title: "Outlook Signature Not Saving",
                    desc: "Fixes for the signature save bug, including the OWA workaround.",
                  },
                  {
                    href: "/blog/outlook-roaming-signatures",
                    title: "Outlook Roaming Signatures Guide",
                    desc: "How cloud-synced signatures work and what goes wrong.",
                  },
                  {
                    href: "/blog/email-signature-not-showing-outlook",
                    title: "Email Signature Not Showing in Outlook",
                    desc: "Signatures that exist but don't appear in composed emails.",
                  },
                  {
                    href: "/email-signature-outlook",
                    title: "Outlook Email Signature Setup",
                    desc: "Step-by-step setup for both Classic and New Outlook.",
                  },
                  {
                    href: "/email-signature-outlook-365",
                    title: "Outlook 365 Signature Guide",
                    desc: "Microsoft 365-specific setup, roaming signatures, and admin controls.",
                  },
                  {
                    href: "/outlook-mobile-signature",
                    title: "Outlook Mobile Signature",
                    desc: "Setting up signatures on iOS and Android Outlook apps.",
                  },
                ].map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <p className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">
                      {guide.title}
                    </p>
                    <p className="text-xs text-slate-500">{guide.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Fix your New Outlook signature today
              </h2>
              <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                NeatStamp generates signatures that pass all 15 New Outlook compatibility
                checks automatically. No VML, no conditional comments, no broken images.
                Just a signature that works — in New Outlook, Classic Outlook, and everywhere
                else.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Create your signature — free
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  See pricing
                </Link>
              </div>
              <p className="text-xs text-slate-400 mt-4">
                No account required to start. Works with{" "}
                <Link href="/email-signature-for-teams" className="hover:underline">
                  Microsoft Teams
                </Link>
                ,{" "}
                <Link href="/email-signature-outlook-365" className="hover:underline">
                  Outlook 365
                </Link>
                , and all major email clients.
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
