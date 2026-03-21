import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Not Showing in Outlook — 10 Fixes",
  description:
    "Your email signature not showing in Outlook? I've fixed this exact issue dozens of times. Here are all 10 causes — and exactly how to fix each one.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-not-showing-outlook",
  },
};

const faqs = [
  {
    q: "Why is my email signature not showing in Outlook?",
    a: "The most common reasons are: the signature isn't set as the default for new messages or replies, you're composing in plain text format instead of HTML, or a Microsoft 365 roaming signature policy is overwriting your local one. Start by going to File → Options → Mail → Signatures and checking all three settings there.",
  },
  {
    q: "My signature shows in Outlook but recipients don't see it — why?",
    a: "This usually means recipients have images blocked (so they see the layout but not logos or photos), or you're sending to a mail system that strips HTML signatures. Try sending a test to a Gmail address to rule out recipient-side settings.",
  },
  {
    q: "How do I fix the signature missing from replies in Outlook?",
    a: "In the Signatures window (File → Options → Mail → Signatures), look at the right side for 'Replies/forwards' and set it to your signature. This is a separate dropdown from the 'New messages' setting — it's easy to set one and forget the other.",
  },
  {
    q: "Where is the signature setting in the new Outlook (2024/2025)?",
    a: "In the new Outlook (the one that looks like Outlook.com), go to Settings (gear icon, top right) → Accounts → Signatures. It's completely separate from Classic Outlook's File → Options → Mail path. Changes in one don't affect the other.",
  },
  {
    q: "Can my company's IT policy block my email signature?",
    a: "Yes. Exchange and Microsoft 365 admins can apply transport rules that strip or replace individual signatures. They can also set roaming signatures that overwrite whatever you've set locally. If you've checked everything else and still can't get a signature to stick, talk to IT — this is likely the cause.",
  },
  {
    q: "What is the file size limit for an Outlook email signature?",
    a: "The HTML file for your signature should be under 10KB. Images don't count toward this limit as long as they're hosted externally (not embedded as base64). If your HTML is over 10KB, Outlook may silently truncate or drop the signature.",
  },
];

export default function EmailSignatureNotShowingOutlookPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Not Showing in Outlook",
            url: "https://neatstamp.com/blog/email-signature-not-showing-outlook",
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
            <span className="text-slate-700">Email Signature Not Showing in Outlook</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  Troubleshooting
                </span>
                <span className="text-sm text-slate-400">18 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Not Showing in Outlook — 10 Fixes (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                I know how frustrating this is. You&rsquo;ve spent time setting up your signature,
                hit send, and it&rsquo;s just... gone. Or it shows up for you in the compose window
                but your recipient gets nothing. I&rsquo;ve fixed this exact issue dozens of times
                across all versions of Outlook, and there are really only 10 things that cause it.
                Let&rsquo;s go through each one.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 18 min read
              </p>
            </header>

            {/* Quick Fix Checklist */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <h2 className="text-lg font-bold text-amber-900 mb-4">
                Quick fix checklist — try these first
              </h2>
              <p className="text-sm text-amber-800 mb-4">
                If you&rsquo;re in a hurry, work through this list in order. Most people find their
                fix in the first three items.
              </p>
              <ol className="space-y-3">
                {[
                  {
                    step: "Check the default signature setting",
                    detail:
                      'File → Options → Mail → Signatures. Make sure your signature is selected under both "New messages" and "Replies/forwards".',
                  },
                  {
                    step: "Confirm you're composing in HTML format",
                    detail:
                      "Signatures don't appear in plain text emails. In a new email: Format Text tab → HTML.",
                  },
                  {
                    step: "If you're on new Outlook, check the right settings page",
                    detail:
                      "New Outlook uses Settings (gear icon) → Accounts → Signatures — completely separate from Classic Outlook.",
                  },
                  {
                    step: "Check for roaming signatures (Microsoft 365)",
                    detail:
                      "If IT has enabled roaming signatures, they override your local ones. Ask your admin or check Outlook Web App to see what's set there.",
                  },
                  {
                    step: "Clear cached signature files",
                    detail:
                      "Navigate to %AppData%\\Microsoft\\Signatures, delete the files, close Outlook completely, reopen and recreate your signature.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-amber-900">{item.step}</p>
                      <p className="text-sm text-amber-700 mt-0.5">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                All 10 causes — jump to any section
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#not-set-as-default", "Fix 1: Signature not set as default"],
                  ["#new-vs-classic-outlook", "Fix 2: New Outlook vs Classic Outlook"],
                  ["#plain-text-format", "Fix 3: Compose format set to plain text"],
                  ["#admin-policy", "Fix 4: Admin policy blocking signatures"],
                  ["#roaming-signatures", "Fix 5: Roaming signatures conflict"],
                  ["#cached-file-corrupted", "Fix 6: Cached signature file corrupted"],
                  ["#add-in-conflict", "Fix 7: Add-in conflict"],
                  ["#signature-too-large", "Fix 8: Signature HTML too large"],
                  ["#images-blocked", "Fix 9: Images blocked by recipient"],
                  ["#fresh-install", "Fix 10: Fresh install / profile recreation"],
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

            {/* Fix 1 */}
            <section id="not-set-as-default" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 1: Signature not set as default
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the most common cause by a wide margin. Outlook has a subtlety that
                catches almost everyone: there are two separate signature dropdowns — one for
                new messages and one for replies and forwards. People set the first and assume
                the second follows. It doesn&rsquo;t.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s exactly where to find it in Classic Outlook:
              </p>
              <ol className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Open Outlook. Click <strong>File</strong> in the top-left menu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Go to <strong>Options</strong> (near the bottom of the left panel).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Click <strong>Mail</strong> in the left sidebar of the Options window.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Click <strong>Signatures...</strong> (in the "Compose messages" section).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>On the right side, under <strong>"Choose default signature"</strong>, set the <strong>E-mail account</strong> to your account, then set <strong>New messages</strong> AND <strong>Replies/forwards</strong> to your signature. They default to "(none)".</span>
                </li>
              </ol>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Note for multiple accounts:</strong> If you have more than one email account
                  set up in Outlook, the "E-mail account" dropdown at the top right of the Signatures
                  window matters. The signature settings are per-account. You may have set a signature
                  for your work account but not for a second account you&rsquo;re currently composing from.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Once you&rsquo;ve saved these settings, open a new email and a reply to an existing
                email to confirm the signature appears in both. If you want to build a signature
                first, the <Link href="/editor" className="text-blue-600 hover:underline">NeatStamp editor</Link> generates
                Outlook-compatible HTML you can paste directly into the signature editor.
              </p>
            </section>

            {/* Fix 2 */}
            <section id="new-vs-classic-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 2: New Outlook vs Classic Outlook — completely different settings
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Since 2024, Microsoft has been rolling out a &ldquo;new Outlook&rdquo; that looks very
                different from Classic Outlook. If your computer updated and suddenly your
                signature disappeared, this is probably why — the two versions store signatures
                completely separately. A signature you set in Classic Outlook does not carry
                over to new Outlook, and vice versa.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to tell which version you&rsquo;re using
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Classic Outlook has a traditional ribbon menu (Home, Send/Receive, Folder, View,
                Help tabs across the top). New Outlook has a simplified bar with fewer visible
                tabs and looks more like Outlook.com. If you see a toggle in the top-right of
                the window labeled &ldquo;Try the new Outlook&rdquo; or &ldquo;Back to classic Outlook,&rdquo; that
                confirms which one you&rsquo;re in.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Setting your signature in new Outlook
              </h3>
              <ol className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Click the <strong>gear icon</strong> (Settings) in the top-right corner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>In the Settings panel that opens, go to <strong>Accounts</strong> in the left sidebar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Click <strong>Signatures</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Click <strong>New signature</strong>, give it a name, and paste your HTML.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Under <strong>"Select default signatures"</strong>, choose it for new messages and for replies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Click <strong>Save</strong> — then close and reopen a compose window to verify.</span>
                </li>
              </ol>
              <p className="text-slate-600 leading-relaxed">
                The new Outlook uses a rich text editor for signatures that is slightly more
                limited than what Classic Outlook supports for HTML. If you&rsquo;re hitting formatting
                issues in new Outlook specifically, the{" "}
                <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                  Outlook 365 signature guide
                </Link>{" "}
                covers the specific limitations and workarounds.
              </p>
            </section>

            {/* Fix 3 */}
            <section id="plain-text-format" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 3: Compose format set to plain text
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                HTML signatures do not appear when you&rsquo;re composing in plain text format. Plain
                text emails strip all formatting, images, and HTML — including your signature.
                Outlook will silently drop your carefully set signature without any warning.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are two places this can happen:
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Account-level plain text setting (affects all new emails)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Go to <strong>File → Options → Mail</strong>. Under &ldquo;Compose messages,&rdquo; find the
                dropdown labeled <strong>&ldquo;Compose messages in this format&rdquo;</strong> and make sure
                it&rsquo;s set to <strong>HTML</strong> (not Plain Text or Rich Text).
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Per-email plain text (affects a single compose window)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                In an open compose window, click the <strong>Format Text</strong> tab in the ribbon.
                Check whether <strong>HTML</strong>, <strong>Rich Text</strong>, or <strong>Plain Text</strong> is
                highlighted. If it&rsquo;s Plain Text, click <strong>HTML</strong> to switch. Your signature
                should reappear immediately.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-slate-700">
                  <strong>Why does this happen?</strong> Some contacts use plain text only, so when you
                  reply to one of their emails, Outlook may automatically switch to plain text to
                  match. You can override this per-email or turn off the auto-match behavior in
                  File → Options → Mail → &ldquo;When replying to a message&rdquo; settings.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                For a signature that looks great in HTML, the{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>{" "}
                explains how to write Outlook-safe HTML that won&rsquo;t break when pasted into the
                editor.
              </p>
            </section>

            {/* Fix 4 */}
            <section id="admin-policy" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 4: Admin policy blocking signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you work at a company, your IT department may have applied policies that
                prevent you from setting or modifying email signatures. This is more common
                than most people realize — especially in regulated industries like finance,
                legal, and healthcare.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Signs that this is happening:
              </p>
              <ul className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  The Signatures button in File → Options → Mail is greyed out.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  You can set a signature but it disappears after restarting Outlook or
                  logging out.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Your emails arrive at recipients with a different signature than what you
                  configured — a company-standard one is being injected by the mail server.
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                Two mechanisms admins use:
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>Group Policy (GPO):</strong> An IT admin can push a Windows Group Policy
                Object that locks down Outlook signature settings. You won&rsquo;t be able to change
                these without IT removing the restriction.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>Exchange transport rules / Microsoft 365 mail flow rules:</strong> The Exchange
                server or Microsoft 365 can append a standard signature to every outgoing email
                at the server level. This appears to recipients correctly, but you may not see
                it in your sent copy or compose window.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you suspect a policy is the issue, talk to your IT department. Ask specifically
                whether &ldquo;Outlook signature management is controlled by Group Policy&rdquo; or whether
                &ldquo;mail flow rules append signatures at the server.&rdquo; They&rsquo;ll know immediately.
              </p>
            </section>

            {/* Fix 5 */}
            <section id="roaming-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 5: Roaming signatures conflict (Microsoft 365)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Microsoft 365 introduced &ldquo;roaming signatures&rdquo; — a feature that syncs your
                signature settings across devices via the cloud. The intention is good: set your
                signature once, have it everywhere. The problem is that if roaming signatures are
                enabled for your account, they will overwrite any signature you set locally
                every time Outlook syncs.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                This explains the especially maddening behavior where you set your signature,
                it appears to work, then disappears after an hour or after you restart Outlook.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to check if roaming signatures are the cause
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Sign into Outlook Web App (OWA) at{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">outlook.office.com</code> with
                your work account. Go to <strong>Settings (gear icon) → View all Outlook settings →
                Compose and reply → Email signature</strong>. If there&rsquo;s a signature set here that
                isn&rsquo;t the one you want, roaming signatures are active and this is what&rsquo;s being
                synced to your desktop Outlook.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The fix: set your correct signature in OWA, not in desktop Outlook. Whatever is
                set in OWA will sync to all devices where roaming signatures are enabled. The
                desktop Outlook setting becomes irrelevant.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Turning off roaming signatures:</strong> This requires admin access. The
                  Microsoft 365 admin can disable roaming signatures per-mailbox using PowerShell:
                  {" "}<code className="text-xs bg-white px-1.5 py-0.5 rounded font-mono border border-blue-200">Set-MailboxMessageConfiguration -Identity user@company.com -UseDefaultSignatureOnMobile $false</code>.
                  Ask your IT admin if you need roaming disabled.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                  Outlook 365 guide
                </Link>{" "}
                covers roaming signatures in more depth, including how to format your signature
                so it looks right in both OWA and the desktop app.
              </p>
            </section>

            {/* Fix 6 */}
            <section id="cached-file-corrupted" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 6: Cached signature file corrupted
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook stores your signatures as HTML files in a local folder. If these files
                get corrupted — which can happen after a crash, a failed Windows update, or a
                disk error — Outlook may silently fail to load them. You&rsquo;ll see your signature
                listed in the Signatures window but it won&rsquo;t appear when composing.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Where the signature files live
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Open Windows Explorer (Win+E), click in the address bar, and paste this path:
              </p>
              <div className="bg-slate-900 rounded-xl p-4 mb-6">
                <code className="text-green-400 text-sm font-mono">
                  %AppData%\Microsoft\Signatures
                </code>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Press Enter. You&rsquo;ll see your signature files — each signature has an .htm file
                and a folder containing associated files (images, etc.).
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to clear and recreate
              </h3>
              <ol className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Copy the entire Signatures folder to your Desktop as a backup (Ctrl+A, then Ctrl+C into a new folder on Desktop).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Close Outlook completely — check Task Manager (Ctrl+Shift+Esc) to make sure <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">OUTLOOK.EXE</code> is not running.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Select all files in the Signatures folder and delete them (Del key).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Reopen Outlook, go to File → Options → Mail → Signatures, and create a new signature from scratch.</span>
                </li>
              </ol>
              <p className="text-slate-600 leading-relaxed">
                If you need the HTML to recreate your signature, use the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">NeatStamp editor</Link> to
                rebuild it quickly. The{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature guide
                </Link>{" "}
                has step-by-step instructions for pasting HTML into the signature editor correctly.
              </p>
            </section>

            {/* Fix 7 */}
            <section id="add-in-conflict" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 7: Add-in conflict
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook add-ins — third-party tools that integrate into Outlook — can sometimes
                conflict with signature functionality. This is especially common with email
                tracking tools, CRM integrations (Salesforce, HubSpot), and other signature
                management tools installed alongside Outlook.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The quickest way to test if an add-in is the cause: start Outlook in Safe Mode.
                Press <strong>Win+R</strong>, type{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">outlook.exe /safe</code>,
                and press Enter. Outlook will open with all add-ins disabled. Try composing a
                new email. If your signature appears, an add-in is the culprit.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Identifying and disabling the problem add-in
              </h3>
              <ol className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Close Safe Mode Outlook and reopen Outlook normally.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Go to <strong>File → Options → Add-ins</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>At the bottom, set the dropdown to <strong>"COM Add-ins"</strong> and click <strong>Go</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Uncheck all add-ins and click OK. Restart Outlook and test.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Re-enable add-ins one at a time (checking and restarting Outlook each time) until the signature stops appearing. The last one you enabled is the conflict.</span>
                </li>
              </ol>
              <p className="text-slate-600 leading-relaxed">
                Once identified, check if the add-in has an update available — the issue may
                already be fixed in a newer version. If not, contact the add-in vendor with the
                specific symptom.
              </p>
            </section>

            {/* Fix 8 */}
            <section id="signature-too-large" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 8: Signature HTML too large (10KB limit)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook has an undocumented limit on signature HTML size: around 10KB for the
                HTML code itself. If your signature HTML exceeds this, Outlook may silently
                truncate it or drop the signature entirely. This doesn&rsquo;t apply to externally
                hosted images — just the HTML code.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most common cause of oversized signature HTML is base64-encoded images
                embedded directly in the HTML. A 15KB logo becomes roughly 20KB of base64 text,
                which instantly pushes you over the limit. Never embed images as base64 in an
                Outlook signature.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to check your signature file size
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Navigate to{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures</code>,
                right-click your signature .htm file, choose Properties, and check the file
                size. If it&rsquo;s over 10KB, you need to trim it down.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to reduce signature size
              </h3>
              <ul className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Replace any base64 images with externally hosted URLs (your company server,
                  CDN, or NeatStamp&rsquo;s hosting).
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Remove inline CSS that is repeated on every element — consolidate where
                  possible.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Strip HTML comments and unnecessary whitespace.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Remove any tracking pixels or analytics scripts embedded in the HTML.
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                NeatStamp generates signatures with clean, minimal HTML that stays well under
                the 10KB limit. If you&rsquo;re working with a hand-coded signature, the{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>{" "}
                covers HTML optimization in detail.
              </p>
            </section>

            {/* Fix 9 */}
            <section id="images-blocked" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 9: Images blocked by recipient&rsquo;s settings
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your signature may be working perfectly — but your recipient&rsquo;s email client is
                blocking images by default, so they see your layout but no logo or photo. This
                isn&rsquo;t a bug in your signature. It&rsquo;s a deliberate privacy feature in most email
                clients, including Outlook itself.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook&rsquo;s default setting for images in external emails is &ldquo;block.&rdquo; Recipients
                see a placeholder with &ldquo;Right-click here to download pictures.&rdquo; There is no
                way to force image loading on the recipient&rsquo;s end. What you can do:
              </p>
              <ul className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Add descriptive <strong>alt text</strong> to every image so the text version is still
                  meaningful. For a logo, the alt text should be your company name.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Make sure your signature is still readable and functional with images
                  hidden — name, title, phone, and links should all work without images.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Host images on your own domain. Some recipients&rsquo; email clients auto-load
                  images from senders they&rsquo;ve previously interacted with, but block unknown
                  CDN domains.
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/blog/email-signature-images-not-displaying" className="text-blue-600 hover:underline">
                  email signature images not showing guide
                </Link>{" "}
                goes deep on this topic with all the specific scenarios and workarounds. The{" "}
                <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">
                  signature with logo guide
                </Link>{" "}
                covers image optimization so your logo displays correctly when images are allowed.
              </p>
            </section>

            {/* Fix 10 */}
            <section id="fresh-install" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 10: Fresh install / profile recreation as the nuclear option
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;ve tried everything above and still can&rsquo;t get a signature to stick, the
                problem is likely a corrupted Outlook profile rather than the signature itself.
                An Outlook profile is a collection of settings and account information stored
                in the Windows registry and user profile. If it gets corrupted — from a failed
                update, a power outage, or a migration — weird things happen. Missing signatures
                is one of them.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Creating a new Outlook profile
              </h3>
              <ol className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Close Outlook completely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Open Control Panel → Mail (Microsoft Outlook) → Show Profiles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Click <strong>Add</strong>, give the new profile a name (e.g., &ldquo;Outlook2&rdquo;), and set up your email account again.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Set the new profile as the default: select it and choose &ldquo;Always use this profile.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Open Outlook with the new profile and set your signature from scratch.</span>
                </li>
              </ol>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the nuclear option because it means reconfiguring Outlook from scratch
                — all your rules, categories, cached folders, and Quick Steps will be gone. But
                if a corrupted profile is the cause, this will definitively fix it.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Before taking this step, make sure you have your email account credentials ready
                (you&rsquo;ll need to sign in again), and note any important rules or settings you
                want to recreate. For Outlook 365 accounts, most settings sync from the server
                automatically. The{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  full Outlook signature guide
                </Link>{" "}
                has the complete setup walkthrough for a clean Outlook installation.
              </p>
            </section>

            {/* Related Outlook guides */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">More Outlook signature guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { href: "/blog/outlook-signature-not-working", label: "Outlook signature not working — full fix guide" },
                  { href: "/blog/outlook-signature-disappeared", label: "Signature disappeared? Recovery steps" },
                  { href: "/blog/new-outlook-signature-problems", label: "New Outlook problems — every known issue" },
                  { href: "/blog/outlook-signature-not-saving", label: "Signature not saving? 8 fixes" },
                  { href: "/blog/outlook-roaming-signatures", label: "Roaming signatures explained" },
                  { href: "/outlook-signature-html", label: "Outlook HTML signatures guide" },
                  { href: "/outlook-mobile-signature", label: "Outlook Mobile signature setup" },
                  { href: "/blog/outlook-signature-best-practices-2026", label: "Outlook best practices for 2026" },
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

            {/* Related articles */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related articles</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    href: "/blog/email-signature-keeps-disappearing",
                    title: "Email Signature Keeps Disappearing",
                    desc: "Why your signature vanishes and how to permanently stop it.",
                  },
                  {
                    href: "/blog/email-signature-images-not-displaying",
                    title: "Email Signature Images Not Showing",
                    desc: "Logo and photo not loading? Here's exactly why.",
                  },
                  {
                    href: "/blog/outlook-signature-not-working",
                    title: "Outlook Signature Not Working",
                    desc: "Broader troubleshooting for all Outlook signature problems.",
                  },
                  {
                    href: "/email-signature-outlook-365",
                    title: "Outlook 365 Signature Setup",
                    desc: "Complete setup guide for Microsoft 365 accounts.",
                  },
                ].map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <p className="text-sm font-semibold text-slate-900 mb-1">{article.title}</p>
                    <p className="text-xs text-slate-500">{article.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Need a fresh Outlook-compatible signature?
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Build one with NeatStamp — we generate clean HTML that works in every version
                of Outlook without any tweaking required.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Build My Outlook Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
