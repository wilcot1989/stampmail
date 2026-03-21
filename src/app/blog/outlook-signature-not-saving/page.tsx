import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Signature Not Saving? 8 Fixes That Work",
  description:
    "Outlook signature not saving? 8 real fixes: permissions, antivirus, roaming conflicts, corrupted profiles, and registry issues.",
  alternates: {
    canonical: "https://neatstamp.com/blog/outlook-signature-not-saving",
  },
};

const faqs = [
  {
    q: "Why does my Outlook signature keep reverting to the old one?",
    a: "This usually means the new signature saved but wasn't assigned correctly, or a cached version is overwriting it. After saving, close the Signatures window, fully quit Outlook, and reopen. Check that the signature is assigned under File → Options → Mail → Signatures for both New Messages and Replies/Forwards. If it still reverts, you likely have a permissions issue on the Signatures folder or a roaming profile conflict.",
  },
  {
    q: "Can antivirus software block Outlook from saving signatures?",
    a: "Yes. Kaspersky, Norton, and Bitdefender are the most commonly reported culprits. They can block write access to %APPDATA%\\Microsoft\\Signatures because it's a folder that malware also targets. Add the Signatures folder as an exclusion in your antivirus settings and try saving again.",
  },
  {
    q: "What does 'roaming signatures' mean and why does it cause problems?",
    a: "Roaming signatures is a Microsoft 365 feature that syncs your signature across devices via the cloud. When it's enabled, the cloud copy can override your locally saved signature. If you edit the signature in classic Outlook but the cloud version is older, the cloud version wins. You can disable roaming signatures in Outlook settings or manage them via the Microsoft 365 admin portal.",
  },
  {
    q: "How do I fix a corrupted Outlook profile?",
    a: "Open Control Panel → Mail → Show Profiles → Add. Create a new profile with your email account details. Set it as the default profile and restart Outlook. Your email data stays intact — you're only recreating the profile container. If signatures were stored locally, they'll still be in %APPDATA%\\Microsoft\\Signatures.",
  },
  {
    q: "What registry key controls Outlook signature settings?",
    a: "The key is HKCU\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings. Under this key, look for NewSignature and ReplySignature values, which store the names of your assigned signatures. If these values are missing or point to a deleted signature, Outlook won't display any signature. You can set them manually using Registry Editor — just make sure the value matches the exact filename of your .htm signature file (without the extension).",
  },
  {
    q: "Why does the signature save but not appear in new emails?",
    a: "This is a known issue in new Outlook (the web-based version rolling out from 2024). The signature saves correctly in settings but fails to insert automatically into new compose windows. Microsoft acknowledged this bug. The workaround is to insert the signature manually using the signature picker in the compose toolbar, or use classic Outlook until the bug is patched.",
  },
  {
    q: "What's the safest way to reset signatures without losing everything?",
    a: "First, copy your entire %APPDATA%\\Microsoft\\Signatures folder to a backup location (Desktop is fine). Then delete the original folder — Outlook will recreate it empty on the next launch. Rebuild your signature in Outlook or paste it from NeatStamp. If something goes wrong, paste the backup folder back and you're back to where you started.",
  },
  {
    q: "My IT department controls signatures via Group Policy — can I override it?",
    a: "No, you can't override Group Policy as a regular user. You need to ask your IT admin. They can either create an exception for your account or adjust the policy to allow personal signatures alongside the company template. Some organizations allow personal signatures in replies but enforce the corporate template for new messages — that's usually the best compromise to ask for.",
  },
];

export default function OutlookSignatureNotSavingPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook Signature Not Saving",
            url: "https://neatstamp.com/blog/outlook-signature-not-saving",
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
            <span className="text-slate-700">Outlook Signature Not Saving</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Troubleshooting
                </span>
                <span className="text-sm text-slate-400">11 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook Signature Not Saving? 8 Fixes That Actually Work
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                You spend 20 minutes crafting the perfect signature, click save, close
                settings — and it&rsquo;s gone. Or it reverts to the old one. Or it saves but
                never actually appears in new emails. This is one of the most frustrating
                Outlook bugs, and it has more causes than you&rsquo;d expect. This guide covers
                all 8 of them, with a specific fix for each.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 11 min read
              </p>
            </header>

            {/* Quick nav */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-bold text-amber-900 mb-3">
                Jump to your specific problem:
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  ["#permissions", "1. Permissions issue on the Signatures folder"],
                  ["#antivirus", "2. Antivirus blocking file creation"],
                  ["#roaming", "3. Roaming signatures conflict"],
                  ["#cached-mode", "4. Cached mode vs. online mode"],
                  ["#corrupted-profile", "5. Corrupted Outlook profile"],
                  ["#group-policy", "6. Group Policy overriding your settings"],
                  ["#registry", "7. Registry key issues"],
                  ["#new-outlook-bug", "8. New Outlook bug — saves but doesn't appear"],
                  ["#flowchart", "Troubleshooting flowchart"],
                  ["#nuclear-option", "The nuclear option: full reset"],
                  ["#neatstamp", "How NeatStamp prevents this entirely"],
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

            {/* Section 1 */}
            <section id="permissions" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                1. Permissions issue on the Signatures folder
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most common and most overlooked cause. Outlook saves your signature as
                a set of files in a specific Windows folder. If that folder&rsquo;s write permissions
                got changed — after a system migration, a corporate policy push, or a Windows
                update — Outlook can read the existing signatures but can&rsquo;t write new ones.
                From your perspective, it looks like the save just did nothing.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The folder is:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-5 overflow-x-auto">
                <code className="text-sm font-mono">%APPDATA%\Microsoft\Signatures</code>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Paste that path into the File Explorer address bar and press Enter. Windows
                expands the %APPDATA% variable for you.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to check and fix write permissions
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Right-click the Signatures folder",
                    body: 'Choose Properties → Security tab. You\'ll see a list of users and groups with their permissions.',
                  },
                  {
                    step: "2",
                    title: "Check your user account",
                    body: 'Find your Windows username in the list. Under "Permissions for [username]", make sure "Write" and "Modify" have checkmarks in the Allow column — not the Deny column.',
                  },
                  {
                    step: "3",
                    title: "Fix it if needed",
                    body: 'Click Edit → select your username → check the boxes for "Write" and "Modify" under Allow → click Apply → OK.',
                  },
                  {
                    step: "4",
                    title: "Restart Outlook and try saving again",
                    body: "Fully close Outlook (check the system tray too) and reopen it. Go back to signature settings and save your signature.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> If the permissions are greyed out and you can&rsquo;t change
                  them, your IT admin has locked down this folder via policy. Jump to{" "}
                  <a href="#group-policy" className="underline">
                    section 6 (Group Policy)
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="antivirus" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. Antivirus blocking file creation
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Kaspersky, Norton, and Bitdefender are the three antivirus programs most
                commonly reported to interfere with Outlook signature saving. The reason is
                that the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">%APPDATA%\Microsoft\Signatures</code> folder is
                a known target for malware that injects malicious content into email
                signatures. So some antivirus products apply aggressive protection to it —
                blocking any process that tries to write new files there, even Outlook itself.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                From your perspective: you edit the signature, click save, Outlook says
                &ldquo;OK&rdquo; — but when you check the folder, no new files were created.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">The fix</h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Open your antivirus settings",
                    body: "Look for a section called \"Exclusions\", \"Exceptions\", or \"Protected Folders\" (the label varies by product).",
                  },
                  {
                    step: "2",
                    title: "Add the Signatures folder as an exclusion",
                    body: "Add the full path: C:\\Users\\[YourUsername]\\AppData\\Roaming\\Microsoft\\Signatures — replace [YourUsername] with your actual Windows username. Do not use the %APPDATA% shorthand here; antivirus products usually need the full path.",
                  },
                  {
                    step: "3",
                    title: "Also add Outlook.exe as a trusted process (optional but recommended)",
                    body: "Some products let you whitelist specific processes. Add C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE so Outlook is always allowed to write to its own data folders.",
                  },
                  {
                    step: "4",
                    title: "Try saving the signature again",
                    body: "You shouldn't need to restart Windows, but restart Outlook to be safe.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re on a corporate laptop and can&rsquo;t change antivirus settings yourself,
                raise a ticket with IT. They can add the exclusion from the central management
                console.
              </p>
            </section>

            {/* Section 3 */}
            <section id="roaming" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Roaming signatures conflict
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Microsoft 365 has a feature called roaming signatures that syncs your
                Outlook signatures across devices via the cloud. In theory, great. In
                practice, it causes a specific and confusing problem: you edit your signature
                locally, save it, it looks right — and then a few minutes or hours later it
                reverts.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                What&rsquo;s happening: the cloud copy of your signature is older than your local
                edit, and when the sync runs, it overwrites your local version with the cloud
                version. Or you edit on one device, but Outlook on another device hasn&rsquo;t
                synced yet and is still pushing the old version. See the full breakdown in the{" "}
                <Link
                  href="/blog/outlook-roaming-signatures"
                  className="text-blue-600 hover:underline"
                >
                  Outlook roaming signatures guide
                </Link>
                .
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option A: Disable roaming signatures
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you only use Outlook on one device, the easiest fix is to turn roaming
                signatures off:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-5">
                <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
                  <li>Open Outlook → File → Options → Mail</li>
                  <li>Scroll down to the Signatures section</li>
                  <li>Uncheck &ldquo;Roaming signatures&rdquo; if you see it listed</li>
                  <li>Click OK and restart Outlook</li>
                </ol>
                <p className="text-xs text-slate-500 mt-3">
                  Note: This option is only visible in certain versions of Outlook with a
                  Microsoft 365 subscription. If you don&rsquo;t see it, roaming may be controlled
                  by your admin.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option B: Edit via Outlook on the web
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If roaming is enabled by policy and you can&rsquo;t disable it, edit your signature
                through Outlook on the web (outlook.office.com) instead. That editing session
                writes directly to the cloud copy, so the sync won&rsquo;t overwrite it.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Go to outlook.office.com → Settings (gear icon) → View all Outlook settings
                → Mail → Compose and reply → Email signature. Edit and save there.
              </p>
            </section>

            {/* Section 4 */}
            <section id="cached-mode" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. Cached mode vs. online mode
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook&rsquo;s Cached Exchange Mode keeps a local copy of your mailbox so you can
                work offline. It also means Outlook sometimes operates against cached data
                rather than live server data — and occasionally this creates conflicts with
                signature settings, especially when roaming signatures are involved.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The symptom: signature saves fine, but when you compose a new email, Outlook
                still inserts the old one. Closing and reopening Outlook doesn&rsquo;t fix it.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Try switching modes temporarily
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Go to File → Account Settings → Account Settings",
                    body: "Double-click your email account to open the settings.",
                  },
                  {
                    step: "2",
                    title: "In the Exchange Account Settings, find the Offline Settings section",
                    body: 'Uncheck "Use Cached Exchange Mode" and click Next → Finish.',
                  },
                  {
                    step: "3",
                    title: "Restart Outlook",
                    body: "Outlook now runs in online mode against the live server. Test whether the signature saves and inserts correctly.",
                  },
                  {
                    step: "4",
                    title: "Re-enable Cached Exchange Mode if needed",
                    body: "After confirming the signature works, you can turn cached mode back on. The signature settings should now be correctly stored.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If your organization requires cached mode (for performance or compliance
                reasons), you may not be able to turn it off permanently. But the temporary
                toggle often clears the stuck state and lets signatures save correctly going
                forward.
              </p>
            </section>

            {/* Section 5 */}
            <section id="corrupted-profile" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                5. Corrupted Outlook profile
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                An Outlook profile is a configuration container that stores your account
                settings, data file locations, and preferences. Over time — especially after
                Office reinstalls, Windows upgrades, or repeated sync errors — profiles can
                become corrupted. A corrupted profile causes all kinds of strange behavior,
                including signatures that won&rsquo;t save, won&rsquo;t appear, or save correctly but
                don&rsquo;t get inserted into new emails.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;ve tried everything else and nothing works, creating a new profile
                almost always fixes it. Your emails, calendar, and contacts are not deleted —
                those live in your mailbox or a .pst file, not in the profile itself.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to create a new Outlook profile
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Close Outlook completely",
                    body: "Right-click the Outlook icon in the taskbar system tray and choose Exit.",
                  },
                  {
                    step: "2",
                    title: "Open Control Panel → Mail",
                    body: 'In Windows 10/11, search for "Mail" in the Control Panel. This opens the Mail Setup dialog.',
                  },
                  {
                    step: "3",
                    title: "Click Show Profiles → Add",
                    body: 'Give the new profile a name (e.g., "Outlook New") and click OK.',
                  },
                  {
                    step: "4",
                    title: "Add your email account",
                    body: "Enter your name, email address, and password. Let the setup wizard connect and configure the account.",
                  },
                  {
                    step: "5",
                    title: "Set the new profile as default",
                    body: 'In the Mail Setup dialog, select "Always use this profile" and choose your new profile from the dropdown. Click OK.',
                  },
                  {
                    step: "6",
                    title: "Open Outlook and recreate your signature",
                    body: "Your email will sync fresh from the server. Go to File → Options → Mail → Signatures and rebuild your signature. This time it should save without issues.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                For rebuilding the signature quickly, use the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                — you can build a professional-looking signature in a few minutes and it
                generates{" "}
                <Link href="/outlook-signature-html" className="text-blue-600 hover:underline">
                  Outlook-compatible HTML
                </Link>{" "}
                you can paste directly.
              </p>
            </section>

            {/* Section 6 */}
            <section id="group-policy" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Group Policy overriding personal settings
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In corporate environments, Windows Group Policy can control almost every
                aspect of how Outlook behaves — including whether users can create, edit, or
                save personal signatures. If Group Policy is locking down signatures, you
                can&rsquo;t fix this yourself. You need to talk to IT.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Common policies that cause this:
              </p>
              <ul className="space-y-2 mb-6 text-slate-600">
                {[
                  "\"Prevent users from creating personal signatures\" — disables the New/Edit buttons in signature settings",
                  "\"Do not allow users to change signature settings\" — makes the entire Signatures dialog read-only",
                  "Policies that enforce a company-wide signature template via Exchange transport rules — these add a signature at the server level and may conflict with personal ones",
                  "Policies that lock the %APPDATA%\\Microsoft\\Signatures folder permissions",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to check if Group Policy is the cause
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Open the signature editor in Outlook. If the New, Edit, and Delete buttons
                are greyed out, Group Policy is restricting access. Another tell: go to
                File → Options → Mail — if the Signatures button is missing entirely, a
                policy has removed it.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Your IT team can check the relevant GPO under User Configuration →
                Administrative Templates → Microsoft Outlook → Outlook Options → Mail
                Format → Internet Formatting. Ask them specifically whether the
                &ldquo;Signature&rdquo; policies are configured and whether personal signatures can
                be allowed alongside company templates.
              </p>
            </section>

            {/* Section 7 */}
            <section id="registry" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Registry key issues
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                When Outlook saves a signature assignment — which signature to insert into
                new emails, which to use for replies — it stores those settings in the
                Windows Registry. If those registry values are missing, corrupted, or point
                to a signature name that no longer exists, Outlook behaves unpredictably:
                it may show no signature, revert to a previous one, or claim to save while
                actually doing nothing.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-bold text-amber-900 mb-2">Before touching the registry</p>
                <p className="text-sm text-amber-800">
                  Export a backup first. Open Registry Editor, navigate to the key, and
                  use File → Export to save a .reg file. If anything goes wrong, double-click
                  that file to restore it.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The key to check
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-5 overflow-x-auto">
                <code className="text-sm font-mono">
                  HKCU\Software\Microsoft\Office\16.0\Common\MailSettings
                </code>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Inside this key, look for two string values:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  {
                    name: "NewSignature",
                    desc: "The name of the signature to insert into new emails. Should match the exact filename of your .htm signature file in the Signatures folder (without the .htm extension).",
                  },
                  {
                    name: "ReplySignature",
                    desc: "The name of the signature to insert into replies and forwards. Same format as above.",
                  },
                ].map((item) => (
                  <li key={item.name} className="border border-slate-200 rounded-xl p-4">
                    <code className="text-sm font-mono text-blue-700 font-semibold">
                      {item.name}
                    </code>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to fix it
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Open Registry Editor",
                    body: 'Press Win + R, type regedit, press Enter. Click Yes on the UAC prompt.',
                  },
                  {
                    step: "2",
                    title: "Navigate to the key",
                    body: "Expand HKEY_CURRENT_USER → Software → Microsoft → Office → 16.0 → Common → MailSettings. (If you're on Office 2019 or earlier, replace 16.0 with your version number.)",
                  },
                  {
                    step: "3",
                    title: "Check the values",
                    body: "Look for NewSignature and ReplySignature. Double-click each one and verify the name matches a signature file that actually exists in your Signatures folder.",
                  },
                  {
                    step: "4",
                    title: "Correct or recreate if needed",
                    body: "If the values are wrong, update the name. If the values don't exist, you can create them: right-click → New → String Value → name it NewSignature or ReplySignature → set the value to your signature's exact name.",
                  },
                  {
                    step: "5",
                    title: "Restart Outlook",
                    body: "Close Registry Editor and restart Outlook. The correct signature should now be assigned.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re not comfortable editing the registry, ask IT — this is a standard
                Outlook fix they should know. Alternatively, if you use{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  an Outlook signature manager
                </Link>
                , the registry handling is done for you automatically.
              </p>
            </section>

            {/* Section 8 */}
            <section id="new-outlook-bug" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                8. New Outlook bug — signature saves but doesn&rsquo;t appear
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This one is particularly maddening because everything looks correct. You go
                into settings, you see your signature, it&rsquo;s assigned to new messages — but
                when you open a new compose window, the signature isn&rsquo;t there. Microsoft
                acknowledged this bug in the new Outlook (the web-based version that started
                rolling out as the default in late 2024).
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The new Outlook is fundamentally different from classic Outlook — it&rsquo;s
                essentially a wrapper around Outlook on the web, and it stores signatures
                in Microsoft 365 cloud settings rather than local files. This architecture
                introduces new failure modes that didn&rsquo;t exist in classic Outlook.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Workarounds while Microsoft patches it
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    label: "Insert manually",
                    desc: "In the new Outlook compose window, click the three-dot menu (More options) → Insert → Signature, then select your signature. It's annoying but reliable.",
                  },
                  {
                    label: "Switch back to classic Outlook",
                    desc: "In new Outlook, click the toggle in the top-right corner that says \"New Outlook\" — flipping it back switches you to classic Outlook, which doesn't have this bug.",
                  },
                  {
                    label: "Edit via Outlook on the web",
                    desc: "Go to outlook.office.com → Settings → Mail → Compose and reply. Edit and save your signature there. Some users report this syncs more reliably to new Outlook than editing within the app.",
                  },
                  {
                    label: "Use a signature manager",
                    desc: "Tools like NeatStamp give you a one-click copy button — you copy the HTML from NeatStamp and paste it into any email. No dependency on Outlook's save mechanism at all.",
                  },
                ].map((item) => (
                  <div key={item.label} className="border border-slate-200 rounded-xl p-5">
                    <h4 className="font-semibold text-slate-900 mb-2">{item.label}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re on Microsoft 365 and signatures keep disappearing across sessions,
                also check the{" "}
                <Link
                  href="/blog/outlook-signature-disappeared"
                  className="text-blue-600 hover:underline"
                >
                  Outlook signature disappeared guide
                </Link>{" "}
                and the{" "}
                <Link
                  href="/blog/email-signature-not-showing-outlook"
                  className="text-blue-600 hover:underline"
                >
                  email signature not showing in Outlook
                </Link>{" "}
                article, which cover additional cloud-specific causes.
              </p>
            </section>

            {/* Troubleshooting flowchart */}
            <section id="flowchart" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Troubleshooting flowchart
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Not sure where to start? Walk through this decision tree. Each branch points
                you to the right section above.
              </p>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                {[
                  {
                    q: "Is the Signatures folder at %APPDATA%\\Microsoft\\Signatures writable?",
                    no: "→ Fix permissions first (Section 1). If greyed out, it's Group Policy (Section 6).",
                    yes: "Continue ↓",
                  },
                  {
                    q: "Does the signature file actually appear in the Signatures folder after saving?",
                    no: "→ Antivirus is likely blocking file creation (Section 2).",
                    yes: "Continue ↓",
                  },
                  {
                    q: "Does the saved signature get overwritten later (reverts to an older version)?",
                    no: "Continue ↓",
                    yes: "→ Roaming signatures conflict (Section 3). Possibly cached mode (Section 4).",
                  },
                  {
                    q: "Is Outlook behaving strangely in other ways too (search not working, meetings wrong, etc.)?",
                    no: "Continue ↓",
                    yes: "→ Corrupted profile (Section 5). Create a new profile.",
                  },
                  {
                    q: "Are the signature editor buttons greyed out or missing?",
                    no: "Continue ↓",
                    yes: "→ Group Policy is restricting access (Section 6). Talk to IT.",
                  },
                  {
                    q: "Does the signature save but never appear in new emails?",
                    no: "Continue ↓",
                    yes: "→ Check registry keys (Section 7). If you're on new Outlook, it may be the known bug (Section 8).",
                  },
                  {
                    q: "Nothing above worked?",
                    no: null,
                    yes: "→ Try the nuclear option: full reset (next section below).",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`p-5 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} ${i < 6 ? "border-b border-slate-200" : ""}`}
                  >
                    <p className="text-sm font-semibold text-slate-800 mb-2">
                      Step {i + 1}: {row.q}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm">
                      <span className="text-red-700">
                        <strong>No:</strong> {row.no}
                      </span>
                      <span className="hidden sm:block text-slate-300">|</span>
                      <span className="text-green-700">
                        <strong>Yes:</strong> {row.yes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nuclear option */}
            <section id="nuclear-option" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The nuclear option: completely reset signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                When nothing else works, a full reset of the Signatures folder clears
                whatever corrupted state is causing the problem. This wipes all your saved
                signatures — so back them up first. Here&rsquo;s the exact process:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Back up the Signatures folder",
                    body: 'Open File Explorer, navigate to %APPDATA%\\Microsoft\\Signatures (paste into the address bar). Copy the entire Signatures folder to your Desktop or another safe location. Name it "Signatures Backup [date]" so you know what it is.',
                  },
                  {
                    step: "2",
                    title: "Close Outlook completely",
                    body: "Make sure Outlook is not running — check the system tray. If you see the Outlook icon there, right-click and choose Exit.",
                  },
                  {
                    step: "3",
                    title: "Delete the original Signatures folder",
                    body: "Go back to %APPDATA%\\Microsoft\\ and delete the Signatures folder. Not just the contents — the folder itself. Outlook recreates it automatically.",
                  },
                  {
                    step: "4",
                    title: "Open Outlook",
                    body: "Outlook creates a fresh empty Signatures folder. Go to File → Options → Mail → Signatures — you should see a clean, empty list with no errors.",
                  },
                  {
                    step: "5",
                    title: "Recreate your signature",
                    body: "Click New, give your signature a name, and build it. If you have your signature content saved (from NeatStamp or a backup), paste it in. Click Save after creating it, and confirm the file appears in the Signatures folder.",
                  },
                  {
                    step: "6",
                    title: "Assign it to your account",
                    body: 'In the Signatures window, make sure the "New messages" and "Replies/Forwards" dropdowns (right side) are set to your new signature for the correct email account. Click OK.',
                  },
                  {
                    step: "7",
                    title: "Test with a new compose window",
                    body: "Open a new email and confirm your signature appears automatically. Send a test to yourself to verify it looks right to recipients.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If the problem returns after doing this, the cause is external — antivirus,
                Group Policy, roaming sync, or a corrupted Outlook profile. Go back to the
                relevant section above and fix that first before rebuilding.
              </p>
            </section>

            {/* NeatStamp section */}
            <section id="neatstamp" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How NeatStamp prevents this problem entirely
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every fix in this guide addresses a symptom of the same underlying issue:
                Outlook&rsquo;s signature system stores everything locally on your machine, making
                it vulnerable to permissions issues, antivirus interference, sync conflicts,
                profile corruption, and Group Policy.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp takes a different approach. Your signature is stored in the cloud
                and accessible from any browser. When you need to use it, you click one button
                and copy it — then paste it into Outlook&rsquo;s signature editor or directly into
                a compose window. No save issues, no sync conflicts, no file permissions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    icon: "☁️",
                    title: "Cloud-stored",
                    desc: "Your signature lives in NeatStamp, not on your local machine. Inaccessible Signatures folder? Doesn't matter.",
                  },
                  {
                    icon: "📋",
                    title: "One-click copy",
                    desc: "Copy your signature HTML with one click. Paste into Outlook's signature editor or a compose window. Done.",
                  },
                  {
                    icon: "💻",
                    title: "Works across devices",
                    desc: "Same signature on every computer you log into. No syncing required, no roaming signature conflicts.",
                  },
                  {
                    icon: "✅",
                    title: "Outlook-compatible HTML",
                    desc: "NeatStamp generates table-based HTML that Outlook renders correctly. Compatible with all versions.",
                  },
                ].map((item) => (
                  <div key={item.title} className="border border-slate-200 rounded-xl p-5">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                You can set up your signature in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                in a few minutes. Pick from the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  signature templates
                </Link>
                , add your details, and you&rsquo;re done. The editor generates
                HTML that works in{" "}
                <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                  Outlook 365
                </Link>
                , classic Outlook, and everywhere else. Check the{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing page
                </Link>{" "}
                — there&rsquo;s a free plan that covers most individual use cases.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If your team is dealing with this problem across multiple people, the{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  NeatStamp for teams
                </Link>{" "}
                plan lets you manage everyone&rsquo;s signatures centrally — updates everyone at
                once, no IT involvement needed.
              </p>
            </section>

            {/* Related guides */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Related guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/blog/outlook-signature-not-working",
                    title: "Outlook Signature Not Working",
                    desc: "Broader troubleshooting: disappeared signatures, images as attachments, formatting issues",
                  },
                  {
                    href: "/blog/outlook-signature-disappeared",
                    title: "Outlook Signature Disappeared",
                    desc: "When your signature vanishes after an update or account change",
                  },
                  {
                    href: "/blog/email-signature-not-showing-outlook",
                    title: "Email Signature Not Showing in Outlook",
                    desc: "Why the signature doesn't appear in compose windows",
                  },
                  {
                    href: "/blog/outlook-roaming-signatures",
                    title: "Outlook Roaming Signatures Explained",
                    desc: "How cloud sync works and what to do when it causes conflicts",
                  },
                  {
                    href: "/email-signature-outlook",
                    title: "Outlook Signature Setup Guide",
                    desc: "Step-by-step: creating and installing a signature in Outlook",
                  },
                  {
                    href: "/email-signature-outlook-365",
                    title: "Outlook 365 Signature Guide",
                    desc: "Specific setup steps for Microsoft 365 / new Outlook",
                  },
                  {
                    href: "/email-signature-outlook-compatible",
                    title: "Outlook-Compatible Signature Format",
                    desc: "What HTML works in Outlook and what breaks",
                  },
                  {
                    href: "/outlook-signature-html",
                    title: "Outlook Signature HTML Guide",
                    desc: "How to build a signature in HTML that renders correctly in Outlook",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{link.desc}</p>
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
                  <div
                    key={faq.q}
                    className="border border-slate-200 rounded-xl p-6"
                  >
                    <h3 className="font-semibold text-slate-900 mb-3">{faq.q}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-3">
                Tired of fighting Outlook&rsquo;s signature system?
              </h2>
              <p className="text-blue-100 mb-6 leading-relaxed max-w-xl mx-auto">
                NeatStamp stores your signature in the cloud. No file permissions, no sync
                conflicts, no registry edits. Build it once, use it everywhere — and it
                always looks right in Outlook.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Build your signature free
                </Link>
                <Link
                  href="/email-signature-outlook"
                  className="border border-blue-300 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Outlook setup guide
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
