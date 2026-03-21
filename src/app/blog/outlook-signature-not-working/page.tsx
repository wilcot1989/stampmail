import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Signature Not Working? Here's How to Fix It (2026)",
  description:
    "Fix Outlook signature issues: disappeared signatures, images as attachments, formatting stripped, admin policies, and registry fixes.",
  alternates: {
    canonical: "https://neatstamp.com/blog/outlook-signature-not-working",
  },
};

const faqs = [
  {
    q: "Why did my Outlook signature disappear after an update?",
    a: "Outlook updates sometimes reset or don't migrate signature settings correctly. After an update, go to File → Options → Mail → Signatures and check if your signature is still assigned to your account. If it's listed but not appearing, reassign it to New Messages and Replies/Forwards, then click OK.",
  },
  {
    q: "Why are my signature images showing as attachments in Outlook?",
    a: "This happens when images are embedded as base64 data URIs instead of being referenced by an external URL. Outlook (especially older versions) doesn't handle embedded images well and converts them to file attachments. Use externally hosted images with a public https:// URL instead.",
  },
  {
    q: "How do I fix formatting that looks fine in NeatStamp but breaks in Outlook?",
    a: "Outlook uses a Word-based HTML renderer that ignores many modern CSS properties. The fix is to use table-based layout with inline styles only — no external stylesheets, no CSS floats, no flexbox. NeatStamp generates table-based HTML that works in Outlook by default.",
  },
  {
    q: "My IT department says signatures are managed centrally — what can I do?",
    a: "If your organization uses an Exchange or Microsoft 365 signature policy, your personal signature settings may be overridden. Talk to your IT admin — they can often allow personal signatures alongside the corporate template, or create an exception for your account.",
  },
  {
    q: "What's the difference between classic Outlook and new Outlook for signatures?",
    a: "Classic Outlook (the .exe app) stores signatures as files in %AppData%\\Microsoft\\Signatures. New Outlook (the web-based version rolling out from 2024) stores signatures in the cloud via Microsoft 365 settings. Signatures don't sync between the two — you need to set them up separately.",
  },
];

export default function OutlookSignatureNotWorkingPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook Signature Not Working",
            url: "https://neatstamp.com/blog/outlook-signature-not-working",
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
            <span className="text-slate-700">Outlook Signature Not Working</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Troubleshooting
                </span>
                <span className="text-sm text-slate-400">18 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook Signature Not Working? Here&rsquo;s How to Fix It (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                This is the most complete troubleshooting guide for Outlook signature problems
                on the internet. I&rsquo;ve covered every scenario I&rsquo;ve encountered: signatures
                that disappear after updates, images that turn into attachments, formatting
                that strips out, new Outlook vs. classic Outlook, admin policies blocking
                signatures, roaming signature conflicts, and the registry fixes that actually
                work when nothing else does.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 18 min read
              </p>
            </header>

            {/* Quick diagnostic */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-bold text-amber-900 mb-3">
                Quick diagnostic — which problem do you have?
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  ["#disappeared", "Signature disappeared or won't appear"],
                  ["#images-attachments", "Images showing as attachments"],
                  ["#formatting-stripped", "Formatting is stripped or broken"],
                  ["#new-vs-classic", "New Outlook vs Classic Outlook confusion"],
                  ["#admin-policies", "Admin policies blocking your signature"],
                  ["#roaming-signatures", "Roaming signatures not syncing"],
                  ["#cached-signatures", "Cached/stale signature showing wrong content"],
                  ["#registry-fixes", "Registry fixes (last resort)"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-amber-800 hover:text-amber-900 hover:underline font-medium"
                    >
                      → {label}
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
              <ol className="space-y-2 text-sm">
                {[
                  ["#disappeared", "1. Signature disappeared or won't appear"],
                  ["#images-attachments", "2. Images showing as attachments"],
                  ["#formatting-stripped", "3. Formatting stripped or broken"],
                  ["#new-vs-classic", "4. New Outlook vs Classic Outlook"],
                  ["#admin-policies", "5. Admin policies blocking signatures"],
                  ["#roaming-signatures", "6. Roaming signatures issues"],
                  ["#cached-signatures", "7. Cached and stale signatures"],
                  ["#registry-fixes", "8. Registry fixes"],
                  ["#prevention", "9. Preventing future problems"],
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
            <section id="disappeared" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                1. Signature disappeared or won&rsquo;t appear
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the most common complaint after a Windows Update or Office update.
                The signature hasn&rsquo;t been deleted — it&rsquo;s almost always a matter of it being
                de-assigned from your account. Here&rsquo;s the fix:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Check that the signature still exists",
                    body: "In Outlook, go to File → Options → Mail → Signatures (or on Mac: Outlook → Preferences → Signatures). Look at the left panel — is your signature listed? If yes, continue to step 2. If not, your signature file may have been deleted during the update.",
                  },
                  {
                    step: "2",
                    title: "Check the assignment",
                    body: 'On the right side of the Signatures window, there are two dropdowns: "New messages" and "Replies/Forwards". Both may have been reset to "(none)". Reassign your signature in both dropdowns, then click OK.',
                  },
                  {
                    step: "3",
                    title: "Check the email account association",
                    body: "If you have multiple email accounts in Outlook, signatures are per-account. Make sure you're viewing the signature settings for the correct account — there's usually a dropdown at the top of the Signatures window that says \"E-mail account.\"",
                  },
                  {
                    step: "4",
                    title: "Restart Outlook",
                    body: "After making changes to signatures, fully close and reopen Outlook. Changes don't always apply to the currently open compose window.",
                  },
                ].map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Signature file was deleted during the update
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook stores signature files in a specific location. On Windows, open File
                Explorer and navigate to:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <code className="text-sm font-mono">
                  %APPDATA%\Microsoft\Signatures
                </code>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                (Paste that path into the File Explorer address bar and press Enter — Windows
                expands the %APPDATA% variable automatically.) You should see files named
                after your signature. If the folder is empty, your signature files were wiped.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you had the signature elsewhere (another computer, a backup, a shared
                network drive), copy the .htm, .rtf, and .txt files back into this folder.
                Each signature consists of three files plus a folder with the same name plus
                &ldquo;_files&rdquo; (containing images).
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you no longer have the files, rebuild the signature in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>
                , copy the HTML, and paste it into Outlook&rsquo;s signature editor. The{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature setup guide
                </Link>{" "}
                walks through this step by step.
              </p>
            </section>

            {/* Section 2 */}
            <section id="images-attachments" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. Images showing as attachments
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Recipients get an email from you with a paperclip icon and a file attached.
                The file is called something like &ldquo;image001.png&rdquo; or &ldquo;logo.jpg&rdquo;. Your signature
                image appears inline in some clients but as an attachment in others.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are three different causes, and each has a different fix.
              </p>

              <div className="space-y-6 mb-6">
                {[
                  {
                    cause: "Cause 1: Images embedded as base64 (the most common cause)",
                    fix: "Some signature generators embed images as base64 data URIs directly in the HTML — this creates enormous inline data strings that Outlook's Word-based renderer cannot handle. It converts them to file attachments. The fix: use externally hosted images. In NeatStamp Pro, images are automatically hosted on our CDN. In the free version, upload your images to your company website and reference them by URL.",
                  },
                  {
                    cause: "Cause 2: Message format set to Plain Text",
                    fix: "If your email is composed in Plain Text format, all HTML signature content (including images) gets stripped and may appear as attachments. Go to Format → HTML in the compose window. To make HTML the default: File → Options → Mail → Compose messages in this format → HTML.",
                  },
                  {
                    cause: "Cause 3: Inline images not properly referenced in the HTML",
                    fix: "Some email clients treat cid: (Content-ID) referenced images differently than https:// referenced images. Cid-referenced images can appear as attachments. The reliable fix is always to use absolute https:// URLs for signature images.",
                  },
                ].map((item) => (
                  <div
                    key={item.cause}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">{item.cause}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.fix}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re consistently seeing this issue across your organization, it&rsquo;s also
                worth checking whether your Exchange admin has configured a policy that strips
                embedded attachments — some anti-spam configurations do this. For a fully
                Outlook-compatible signature format, see the{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>
                .
              </p>
            </section>

            {/* Section 3 */}
            <section id="formatting-stripped" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Formatting stripped or broken
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your signature looks perfect in the preview, perfect in Gmail, but in Outlook
                it&rsquo;s a jumbled mess — wrong fonts, colors gone, layout collapsed into a single
                column.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The reason is Outlook&rsquo;s HTML renderer. Unlike every other email client, which
                uses a browser-based rendering engine, Outlook desktop uses the Microsoft Word
                rendering engine (since Outlook 2007). Word was designed for print documents,
                not the web. It supports approximately 25% of the CSS properties that Chrome
                or Firefox do.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                CSS properties Outlook ignores entirely
              </h3>
              <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-6">
                <ul className="grid grid-cols-2 gap-2 text-sm text-red-700 font-mono">
                  {[
                    "display: flex",
                    "display: grid",
                    "border-radius",
                    "background-image",
                    "position: absolute",
                    "position: fixed",
                    "box-shadow",
                    "text-shadow",
                    "opacity",
                    "transform",
                    "transition",
                    "@media queries",
                  ].map((prop) => (
                    <li key={prop} className="flex items-center gap-1">
                      <span className="text-red-400">✗</span> {prop}
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What Outlook does support
              </h3>
              <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-6">
                <ul className="grid grid-cols-2 gap-2 text-sm text-green-700 font-mono">
                  {[
                    "display: table",
                    "display: table-cell",
                    "color",
                    "font-family",
                    "font-size",
                    "font-weight",
                    "text-align",
                    "padding",
                    "margin (partial)",
                    "border (partial)",
                    "width (on tables)",
                    "height (on images)",
                  ].map((prop) => (
                    <li key={prop} className="flex items-center gap-1">
                      <span className="text-green-500">✓</span> {prop}
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The practical fix
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Rebuild your signature using HTML tables for layout. Every column, every
                side-by-side element, every piece of structure should be a{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  &lt;table&gt;
                </code>{" "}
                with{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  &lt;tr&gt;
                </code>{" "}
                and{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  &lt;td&gt;
                </code>{" "}
                elements. All styles must be inline — Outlook strips{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  &lt;style&gt;
                </code>{" "}
                blocks in signatures.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Using{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  style="display:flex"
                </code>{" "}
                on a div to place your logo and contact info side-by-side? Outlook ignores
                flexbox. Replace that div with a two-column table. This is tedious to write by
                hand, which is why tools like NeatStamp exist — we generate table-based HTML
                automatically. The{" "}
                <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                  Outlook 365 guide
                </Link>{" "}
                and the main{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature page
                </Link>{" "}
                have code examples.
              </p>
            </section>

            {/* Section 4 */}
            <section id="new-vs-classic" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. New Outlook vs. Classic Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Starting in late 2023, Microsoft began rolling out a completely new version
                of Outlook — sometimes called &ldquo;New Outlook&rdquo; — that replaces the classic .exe
                desktop app with a web-based version. In 2026, many organizations are in
                the middle of this migration, which creates specific signature problems.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Key differences for signatures
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Feature
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Classic Outlook
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        New Outlook
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        feature: "Signature storage",
                        classic: "%AppData%\\Microsoft\\Signatures folder",
                        newOut: "Cloud (Microsoft 365 settings)",
                      },
                      {
                        feature: "Sync between devices",
                        classic: "No — per-machine",
                        newOut: "Yes — follows your Microsoft account",
                      },
                      {
                        feature: "HTML renderer",
                        classic: "Word-based (GDI)",
                        newOut: "Chromium-based (more CSS support)",
                      },
                      {
                        feature: "CSS support",
                        classic: "Limited (no flexbox, no grid)",
                        newOut: "Much better — closer to a browser",
                      },
                      {
                        feature: "Signature setup path",
                        classic: "File → Options → Mail → Signatures",
                        newOut: "Settings (gear) → Accounts → Signatures",
                      },
                      {
                        feature: "Admin control",
                        classic: "Group Policy / registry",
                        newOut: "Exchange Admin Center / M365 policies",
                      },
                    ].map((row) => (
                      <tr key={row.feature}>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {row.feature}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{row.classic}</td>
                        <td className="py-3 px-4 text-slate-600">{row.newOut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Common confusion: set up in Classic but not in New
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you set up your signature in Classic Outlook and then someone on your team
                switches to New Outlook, they won&rsquo;t see the signature. The cloud-based New
                Outlook has no visibility into the local %AppData% signature folder. Both
                versions require independent setup.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to identify which version you have
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Classic Outlook has a ribbon-based UI with the familiar Office look. New
                Outlook looks similar to Outlook on the web — flat, clean, with a
                toggle in the top-right corner labeled &ldquo;New Outlook&rdquo; (you can switch back to
                Classic using that toggle if you&rsquo;re in a transition period).
              </p>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                  Outlook 365 signature guide
                </Link>{" "}
                has specific instructions for the New Outlook interface alongside the Classic
                instructions.
              </p>
            </section>

            {/* Section 5 */}
            <section id="admin-policies" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                5. Admin policies blocking signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In enterprise environments, IT administrators can restrict or override email
                signatures at the server level. This is more common than you might think —
                and it&rsquo;s one of the hardest problems to diagnose because nothing appears
                broken on your end.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Exchange Transport Rules
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Administrators can use Exchange Transport Rules (or Mail Flow Rules in
                Microsoft 365) to add, modify, or replace email signatures at the server
                level. These rules run after the email leaves your client, so they can
                overwrite whatever you set in Outlook. Symptoms include:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  Your signature shows in the compose window but recipients see a different one
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  Your signature shows twice (your client-side one plus the server-side one)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  Your signature doesn&rsquo;t appear for external recipients but works for internal
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                If you suspect a transport rule, contact your Exchange administrator or check
                the Microsoft 365 Admin Center → Exchange → Mail Flow → Rules. Solving this
                requires admin access — it&rsquo;s not something you can fix from Outlook itself.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Group Policy restrictions
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Group Policy can disable signature creation entirely or lock the signature
                settings. If the Signatures button in Outlook is greyed out or the Signatures
                window is inaccessible, Group Policy is the likely cause. Signs:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  File → Options → Mail → Signatures button is greyed out
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  You can click Signatures but can&rsquo;t edit or add new ones
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  A new signature is applied automatically every time you restart Outlook
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Solutions here require your IT department. You can raise a support ticket
                explaining the business need for a custom signature. Many organizations have
                exceptions for C-level executives or external-facing roles. If your company
                uses a third-party signature management tool like Exclaimer, there may be a
                self-service portal — the{" "}
                <Link href="/alternative-to-exclaimer" className="text-blue-600 hover:underline">
                  alternative to Exclaimer page
                </Link>{" "}
                covers this scenario in more detail.
              </p>
            </section>

            {/* Section 6 */}
            <section id="roaming-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Roaming signatures issues
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Microsoft introduced &ldquo;Roaming Signatures&rdquo; in Microsoft 365 to sync signatures
                across devices. It&rsquo;s a useful feature in theory but a significant source of
                confusion and conflicts in practice.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How roaming signatures work
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                When enabled, Outlook uploads your signatures to the Microsoft cloud
                (Exchange Online) and downloads them on any device where you sign in with
                the same Microsoft 365 account. Sounds ideal — but when something goes wrong,
                it&rsquo;s hard to diagnose because the signature lives in the cloud, not locally.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Common roaming signature problems and fixes
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    problem: "Old signature keeps reappearing after you delete it",
                    fix: "The cloud copy still exists. Delete it from Outlook web (outlook.office.com) → Settings → View all settings → Compose and reply → Email signature. Then delete it locally and restart Outlook.",
                  },
                  {
                    problem:
                      "Signature you set on one device isn't appearing on another",
                    fix: "Sync may be delayed — wait 5–10 minutes and restart Outlook on the second device. If still missing, check that the same Microsoft 365 account is connected on both devices (File → Office Account).",
                  },
                  {
                    problem: "Conflict: Outlook shows different signature than Outlook Web",
                    fix: 'This happens when you\'ve edited the signature in both places. Outlook Web usually "wins" for the cloud copy. Delete the local version, update in Outlook Web, and allow it to sync back down.',
                  },
                  {
                    problem: "Roaming is disabled by admin but you didn't know",
                    fix: "Administrators can disable roaming signatures via Exchange PowerShell. If you're not seeing sync behavior, ask your admin whether it's enabled for your account.",
                  },
                ].map((item) => (
                  <div
                    key={item.problem}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      Problem: {item.problem}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Fix: {item.fix}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7 */}
            <section id="cached-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Cached and stale signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You&rsquo;ve updated your signature but Outlook keeps inserting the old version.
                Or you see a different signature in sent emails than what you set. This is
                almost always a caching issue.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Clearing the Outlook signature cache
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    body: "Close Outlook completely — check the system tray to make sure it's fully exited, not just minimized.",
                  },
                  {
                    step: "2",
                    body: "Open File Explorer and navigate to %APPDATA%\\Microsoft\\Signatures",
                  },
                  {
                    step: "3",
                    body: "Delete the signature files you want to refresh (back them up first if you're uncertain).",
                  },
                  {
                    step: "4",
                    body: "Reopen Outlook and set up the signature fresh.",
                  },
                ].map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                      {step.step}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed pt-1">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                OWA (Outlook Web Access) caching
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you use both the desktop app and Outlook Web (outlook.office.com), the web
                version has its own signature settings that are separate from the desktop.
                Stale signatures on the web version require you to update them in Outlook
                Web settings directly — go to Settings (gear icon) → View all settings →
                Compose and reply → Email signature.
              </p>
            </section>

            {/* Section 8 */}
            <section id="registry-fixes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                8. Registry fixes (use only if other solutions haven&rsquo;t worked)
              </h2>

              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-red-800 mb-1">Warning</p>
                <p className="text-sm text-red-700">
                  Editing the Windows registry can cause system instability if done
                  incorrectly. Back up the registry before making any changes (File → Export
                  in Registry Editor). Only use these fixes if you&rsquo;re comfortable with the
                  registry and other solutions haven&rsquo;t worked.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Fix: Signature not auto-inserting in new messages
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                If the signature assignment in Outlook&rsquo;s UI doesn&rsquo;t stick (resets after
                restart), the registry may have a corrupt or conflicting value. Check:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">
                  {`HKEY_CURRENT_USER\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings

Values to check:
NewSignature = [Your Signature Name]
ReplySignature = [Your Signature Name]`}
                </pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                If these values are missing or point to a signature name that no longer exists,
                either recreate the signature with the exact same name or update the registry
                values to match your current signature name. The version number (16.0) varies:
                Outlook 2016/2019/2021 and 365 all use 16.0; Outlook 2013 uses 15.0.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Fix: HTML signature being stripped to plain text
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                If Outlook is stripping your HTML signature to plain text, the mail format
                setting may have been reset at the registry level:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">
                  {`HKEY_CURRENT_USER\\Software\\Microsoft\\Office\\16.0\\Outlook\\Preferences

MailFormat = 2  (1 = Plain Text, 2 = HTML, 3 = Rich Text)`}
                </pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Set MailFormat to 2 for HTML. This is equivalent to the setting in File →
                Options → Mail → Compose messages in this format, but sometimes the UI change
                doesn&rsquo;t persist while the registry change does.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Fix: Signatures missing after Office repair
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Running an Office repair (Programs and Features → Microsoft 365 → Change →
                Quick Repair or Online Repair) can reset signature settings. After a repair,
                check the Signatures folder and reassign signatures in the UI. If signatures
                are gone, they may be in a backup — check{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  %APPDATA%\Microsoft\Signatures
                </code>{" "}
                for any .bak files.
              </p>
            </section>

            {/* Section 9 */}
            <section id="prevention" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                9. Preventing future problems
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;ve gone through this guide once, you probably don&rsquo;t want to do it
                again. Here&rsquo;s what I&rsquo;d set up to prevent recurring issues.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Back up your signature files. Copy the %APPDATA%\\Microsoft\\Signatures folder to a shared drive or cloud storage quarterly.",
                  "Use externally hosted images, not base64. This eliminates the attachment bug and keeps email file sizes manageable.",
                  "Use table-based HTML. If you rebuild your signature, generate it with NeatStamp's Outlook-proof output rather than writing flexbox-based HTML that will break.",
                  "Set up signatures in both Classic and New Outlook if your organization is in a mixed state.",
                  "Document your signature setup. A simple note with the signature name, account it's assigned to, and where the image files are hosted saves hours the next time something breaks.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                If the Outlook complexity is getting to be too much to manage, one option is
                to look at a server-side signature manager. The{" "}
                <Link href="/alternative-to-exclaimer" className="text-blue-600 hover:underline">
                  alternative to Exclaimer page
                </Link>{" "}
                covers the available options, including some much cheaper alternatives
                to enterprise tools. NeatStamp&rsquo;s Pro plan also handles multi-signature
                management. The{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  free editor
                </Link>{" "}
                is the quickest way to regenerate a clean Outlook-compatible signature right now.
              </p>
            </section>

            {/* Related Outlook guides */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">More Outlook signature guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { href: "/blog/outlook-signature-disappeared", label: "Signature disappeared? Recovery steps" },
                  { href: "/blog/outlook-signature-not-saving", label: "Signature not saving? 8 fixes" },
                  { href: "/blog/new-outlook-signature-problems", label: "New Outlook problems — every known issue" },
                  { href: "/blog/outlook-roaming-signatures", label: "Roaming signatures explained" },
                  { href: "/blog/email-signature-not-working-new-outlook", label: "Fix signatures in New Outlook" },
                  { href: "/outlook-signature-html", label: "Outlook HTML signatures guide" },
                  { href: "/outlook-mobile-signature", label: "Outlook Mobile signature setup" },
                  { href: "/blog/outlook-365-signature-setup", label: "Outlook 365 setup guide" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    {link.label} →
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
                Need a fresh Outlook-compatible signature?
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates table-based HTML that works in every version of Outlook.
                Free, no account needed. Takes about 60 seconds.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Create My Outlook Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
