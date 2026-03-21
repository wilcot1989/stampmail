import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Signature Disappeared? Here's How to Get It Back",
  description:
    "Outlook signature disappeared after an update or migration? Check the Signatures folder, recover it step by step, and prevent it from happening again.",
  alternates: {
    canonical: "https://neatstamp.com/blog/outlook-signature-disappeared",
  },
};

const faqs = [
  {
    q: "Why did my Outlook signature disappear after a Windows update?",
    a: "Windows updates that touch the Microsoft Office stack sometimes reset the 'default signature' setting in Outlook's options, even though your actual signature files in %AppData%\\Microsoft\\Signatures are still on disk. Open File → Options → Mail → Signatures after any major update to check that your signature is still assigned to New messages and Replies/forwards. If the dropdown shows (none), your files are probably fine — you just need to reassign the default.",
  },
  {
    q: "My Outlook signature disappeared after switching to the New Outlook — what happened?",
    a: "Classic Outlook and New Outlook store signatures in completely different places. Classic Outlook uses files in %AppData%\\Microsoft\\Signatures on your local machine. New Outlook syncs signatures through Microsoft 365 roaming signatures, pulling from Outlook on the Web (OWA). When you switch to New Outlook, it doesn't automatically import your classic signature files. You need to recreate the signature in New Outlook or set it via Outlook on the Web at outlook.office.com → Settings → Accounts → Signatures.",
  },
  {
    q: "Can I recover my Outlook signature after it disappeared?",
    a: "Yes, in most cases. Go to %AppData%\\Microsoft\\Signatures in File Explorer (paste that path into the address bar). If your signature files are still there, your signature was never deleted — Outlook just lost the assignment. Open File → Options → Mail → Signatures, find your signature in the list, and reassign it as the default. If the folder is empty, you'll need to recreate the signature from scratch or restore it from a backup.",
  },
  {
    q: "What is the Outlook roaming signatures feature and why does it cause problems?",
    a: "Roaming signatures is a Microsoft 365 feature that syncs your signature across all devices via the cloud. It works by pulling the signature you set in Outlook on the Web (OWA) and pushing it to your desktop Outlook. The problem: when roaming signatures is active, anything you set in the desktop client gets overwritten on the next sync. The solution is to set your signature in OWA instead — go to outlook.office.com → Settings (gear icon) → Accounts → Signatures.",
  },
  {
    q: "My Outlook signature is gone but I never deleted it. Where did it go?",
    a: "The most likely culprits are: a Windows or Office update that reset your default signature assignment (the files are still there, just not set as default), the roaming signatures feature overwriting your local setting, an antivirus tool that quarantined your signature HTML files, or a new Outlook profile that doesn't have access to your old profile's signature folder. Start by checking %AppData%\\Microsoft\\Signatures to see if the files still exist.",
  },
  {
    q: "How do I stop my Outlook signature from disappearing after every update?",
    a: "The most reliable fix is to back up your signature folder — copy the entire %AppData%\\Microsoft\\Signatures folder to a safe location like OneDrive or an external drive. Better yet, store your signature as HTML in a cloud tool like NeatStamp. After any update, you can reinstall it in under two minutes from any computer without hunting for backup files.",
  },
  {
    q: "Why is my Outlook signature gone in OWA (Outlook on the Web) but not in the desktop app?",
    a: "OWA and classic desktop Outlook stored signatures independently before roaming signatures was introduced. If you set your signature only in the desktop app, OWA won't have it. Go to outlook.office.com, click the gear icon, then Accounts → Signatures, and add your signature there. This also ensures it's available across all devices if roaming signatures is enabled for your account.",
  },
  {
    q: "Can an antivirus or IT policy delete my Outlook signature?",
    a: "Yes. Some endpoint security tools scan the %AppData%\\Microsoft\\Signatures folder and quarantine files they consider suspicious — particularly if your signature HTML contains external image URLs or embedded code. If your signature files are missing from the Signatures folder and you didn't delete them, check your antivirus quarantine. IT Group Policies can also override your personal signature with a company-mandated one, or disable the signature field entirely. If the signature settings field is greyed out in Outlook, a GPO is the cause.",
  },
];

export default function OutlookSignatureDisappearedPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook Signature Disappeared",
            url: "https://neatstamp.com/blog/outlook-signature-disappeared",
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
            <span className="text-slate-700">Outlook Signature Disappeared</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  Troubleshooting
                </span>
                <span className="text-sm text-slate-400">12 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook Signature Disappeared? Here&rsquo;s How to Get It Back
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                This is one of the most common Outlook complaints I see. Your signature was
                working fine yesterday. Today it&rsquo;s gone. No warning, no error message —
                just missing. Microsoft updates, account migrations, roaming signature
                conflicts, antivirus software, IT policies — there are more ways for Outlook
                to lose your signature than you&rsquo;d expect. The good news is that in most
                cases your signature files are still on your computer. Outlook just lost track
                of them. This guide walks through every cause and the exact steps to recover
                and prevent it from happening again.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 12 min read
              </p>
            </header>

            {/* Quick recovery box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <h2 className="text-lg font-bold text-amber-900 mb-4">
                Start here — check if your signature files still exist
              </h2>
              <p className="text-sm text-amber-800 mb-4">
                Before doing anything else, open File Explorer and paste this into the address bar:
              </p>
              <div className="bg-amber-900 rounded-lg p-3 mb-4">
                <code className="text-amber-100 text-sm font-mono">
                  %APPDATA%\Microsoft\Signatures
                </code>
              </div>
              <p className="text-sm text-amber-800 mb-3">
                If you see files ending in <code className="text-xs bg-amber-200 px-1 py-0.5 rounded font-mono">.htm</code>,{" "}
                <code className="text-xs bg-amber-200 px-1 py-0.5 rounded font-mono">.rtf</code>, or{" "}
                <code className="text-xs bg-amber-200 px-1 py-0.5 rounded font-mono">.txt</code> — your signature
                is still there. Outlook just lost the assignment. Go to{" "}
                <strong>File → Options → Mail → Signatures</strong>, find your signature in the
                dropdown, and reassign it as the default. Done.
              </p>
              <p className="text-sm text-amber-800">
                If the folder is empty, scroll down to the recovery section for your version of Outlook.
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Jump to section
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#why-signatures-disappear", "Why Outlook signatures disappear (the causes)"],
                  ["#check-signature-folder", "Step 1: Check the Signatures folder"],
                  ["#recover-classic-outlook", "Recover your signature in Classic Outlook"],
                  ["#recover-new-outlook", "Recover your signature in New Outlook"],
                  ["#recover-owa", "Recover your signature in Outlook on the Web (OWA)"],
                  ["#prevention", "How to back up your signatures so this never happens again"],
                  ["#neatstamp-solution", "The cloud approach: never lose your signature again"],
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

            {/* Why signatures disappear */}
            <section id="why-signatures-disappear" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why Outlook signatures disappear: the technical causes
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                There are six main reasons this happens. Knowing which one you&rsquo;re dealing with
                tells you exactly what to fix.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                1. Windows or Office updates resetting the signature assignment
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                This is the most common cause. A cumulative Windows update or an Office channel
                update changes registry entries that store your Outlook settings. Your signature
                files stay exactly where they are in{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures</code>,
                but the &ldquo;default signature&rdquo; setting in Outlook&rsquo;s options gets reset to{" "}
                <em>(none)</em>. Outlook then sends emails without any signature, and most people
                assume the signature was deleted. It wasn&rsquo;t. The fix is to re-open the
                Signatures settings and reassign it.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                2. The New Outlook migration wiping Classic Outlook settings
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                This one caused a lot of confusion in 2025. Microsoft has been gradually
                transitioning users from Classic Outlook (the full desktop app) to the New
                Outlook, which is built on a web architecture similar to OWA. The problem:
                these two apps don&rsquo;t share the same signature storage. Classic Outlook reads
                from your local{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures</code>{" "}
                folder. New Outlook uses Microsoft 365&rsquo;s roaming signatures, which sync from
                the cloud.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                When you switch to New Outlook — either voluntarily or because Microsoft toggled
                it for your account — your classic signatures don&rsquo;t migrate. You open New
                Outlook, and there&rsquo;s nothing there. Your files still exist on disk, but New
                Outlook can&rsquo;t see them. See the{" "}
                <Link href="/blog/email-signature-not-showing-outlook" className="text-blue-600 hover:underline">
                  email signature not showing in Outlook
                </Link>{" "}
                guide for the full breakdown of this transition.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                3. Roaming signatures feature conflicts
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Microsoft 365&rsquo;s roaming signatures feature syncs your signature across all
                devices. It pulls the signature from OWA and pushes it to the desktop client.
                The issue: when this feature is enabled and you set a signature directly in
                desktop Outlook, the next cloud sync overwrites it with whatever is in OWA
                — which may be blank or an old version.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                If your signature keeps coming back wrong or disappearing after a few hours,
                roaming signatures is almost certainly the cause. The{" "}
                <Link href="/blog/email-signature-keeps-disappearing" className="text-blue-600 hover:underline">
                  email signature keeps disappearing guide
                </Link>{" "}
                covers this in detail, but the short answer is: set your signature in OWA,
                not in the desktop app.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                4. Antivirus software flagging signature files
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Some endpoint security tools scan{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%AppData%</code>{" "}
                folders for suspicious content. HTML files with external URLs — which is exactly
                what an Outlook signature is — can trigger quarantine rules in aggressive
                configurations. If your signature files have disappeared from the Signatures
                folder and you didn&rsquo;t delete them, check your antivirus quarantine. You should
                find them there. Restore them, then whitelist the Signatures folder so it
                doesn&rsquo;t happen again.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                5. Profile corruption or migration to a new profile
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Outlook profiles store your account configuration, settings, and the path to
                your signature files. If a profile gets corrupted — from an abrupt shutdown,
                a failed update, or disk errors — Outlook may create a new profile
                automatically the next time it starts. That new profile doesn&rsquo;t inherit your
                old settings, so it starts with no signature. Similarly, if IT migrated you to
                a new computer or a new Windows account without copying your profile data, your
                old signatures were left behind. Check the{" "}
                <Link href="/blog/outlook-signature-not-working" className="text-blue-600 hover:underline">
                  Outlook signature not working guide
                </Link>{" "}
                for steps on profile recovery.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                6. Admin Group Policy overriding personal signatures
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                In enterprise environments, IT departments can deploy Group Policy Objects (GPOs)
                that control Outlook behavior. A GPO can push a company-mandated signature that
                overwrites your personal one on every login. Or it can prevent you from changing
                the signature at all — the Signatures field in Outlook Options will be greyed out.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Signs of a GPO: your signature reverts on a predictable schedule (e.g., every
                time you log into Windows), the reverted signature has company branding you
                didn&rsquo;t add, or the setting is locked in the UI. If this is your situation,
                you need to contact IT — you can&rsquo;t override a GPO yourself.
              </p>
            </section>

            {/* Check the folder */}
            <section id="check-signature-folder" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Step 1: Check if your signature is still on disk
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before you do anything else, verify whether your signature files still exist.
                This takes 30 seconds and tells you everything about what kind of problem you have.
              </p>
              <ol className="space-y-3 mb-6 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    1
                  </span>
                  <span>
                    Press <strong>Win+R</strong> to open the Run dialog. Or open File Explorer and
                    click in the address bar at the top.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    2
                  </span>
                  <span>
                    Type or paste:{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%APPDATA%\Microsoft\Signatures</code>{" "}
                    and press Enter.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    3
                  </span>
                  <span>
                    Look at what&rsquo;s in the folder. You might see files named after your signature
                    (like <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">My Signature.htm</code>,{" "}
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">My Signature.rtf</code>,{" "}
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">My Signature.txt</code>), plus a
                    folder with the same name containing image assets if your signature has a photo or logo.
                  </span>
                </li>
              </ol>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-bold text-green-800 mb-2">Files are there</p>
                  <p className="text-sm text-green-700">
                    Your signature was never deleted. Outlook just lost the assignment.
                    Open <strong>File → Options → Mail → Signatures</strong> and reassign
                    your signature as the default for new messages and replies. Click OK and
                    you&rsquo;re done.
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm font-bold text-red-800 mb-2">Folder is empty</p>
                  <p className="text-sm text-red-700">
                    The signature files are gone. Check your antivirus quarantine first —
                    they may be there. If not, you&rsquo;ll need to recreate the signature.
                    Read on for recovery steps by Outlook version.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-2">
                <p className="text-sm text-blue-800">
                  <strong>Note for New Outlook users:</strong> New Outlook does not use this
                  folder at all. If you&rsquo;ve switched to New Outlook, checking{" "}
                  <code className="text-xs bg-blue-100 px-1 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures</code>{" "}
                  will show your old Classic Outlook signatures — but New Outlook can&rsquo;t read them.
                  Skip to the New Outlook recovery section below.
                </p>
              </div>
            </section>

            {/* Classic Outlook recovery */}
            <section id="recover-classic-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to recover your signature in Classic Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Classic Outlook means the full desktop application — Outlook 2016, 2019, 2021,
                or Outlook as part of Microsoft 365 when you haven&rsquo;t switched to the new version.
                If you see the ribbon toolbar with tabs like Home, Send/Receive, Folder, View —
                that&rsquo;s Classic Outlook.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Scenario A: Files exist, just not set as default
              </h3>
              <ol className="space-y-3 mb-8 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    1
                  </span>
                  <span>Open Outlook. Click <strong>File</strong> in the top-left corner.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    2
                  </span>
                  <span>Click <strong>Options</strong> at the bottom of the left sidebar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    3
                  </span>
                  <span>
                    In the Outlook Options window, click <strong>Mail</strong> in the left column.
                    Then click the <strong>Signatures...</strong> button in the main area.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    4
                  </span>
                  <span>
                    You&rsquo;ll see the Signatures and Stationery dialog. In the top-right section
                    called &ldquo;Choose default signature&rdquo;, check the <strong>E-mail account</strong> dropdown
                    — make sure it shows your correct account.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    5
                  </span>
                  <span>
                    In the <strong>New messages</strong> dropdown, select your signature name. Do the same
                    for <strong>Replies/forwards</strong> if you want it there too.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    6
                  </span>
                  <span>
                    Click <strong>OK</strong> to close the Signatures dialog, then <strong>OK</strong> again to close
                    Outlook Options. Compose a new email to verify the signature appears.
                  </span>
                </li>
              </ol>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Scenario B: Signature files are gone — recreate from scratch
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If the{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures</code>{" "}
                folder is empty, you need to build the signature again. The fastest approach
                is to use the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                to rebuild it — choose a template, fill in your details, and get clean HTML
                that installs in one copy-paste. For a manual approach:
              </p>
              <ol className="space-y-3 mb-6 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    1
                  </span>
                  <span>
                    Go to <strong>File → Options → Mail → Signatures → New</strong>. Give your
                    signature a name.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    2
                  </span>
                  <span>
                    Build your signature in the editor box, or paste HTML using the source
                    editor. For a properly formatted HTML signature, the{" "}
                    <Link href="/outlook-signature-html" className="text-blue-600 hover:underline">
                      Outlook HTML signature guide
                    </Link>{" "}
                    covers the exact steps to insert HTML in Classic Outlook.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    3
                  </span>
                  <span>
                    Set it as the default for New messages and Replies/forwards. Click OK.
                  </span>
                </li>
              </ol>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Also useful:</strong> The{" "}
                  <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                    Outlook email signature setup guide
                  </Link>{" "}
                  and the{" "}
                  <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                    Outlook 365 signature guide
                  </Link>{" "}
                  have screenshots for each step if you get stuck on where to find these options.
                </p>
              </div>
            </section>

            {/* New Outlook recovery */}
            <section id="recover-new-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to recover your signature in New Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                New Outlook looks different from the classic version — it has a simplified UI,
                and if you look at the top-right corner of the app, you&rsquo;ll see a toggle that
                says &ldquo;New Outlook.&rdquo; The signature settings are in a completely different place.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Importantly: New Outlook does not read from{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures</code>.
                It stores signatures via roaming signatures in the cloud, connected to your
                Microsoft 365 account.
              </p>
              <ol className="space-y-3 mb-6 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    1
                  </span>
                  <span>
                    Open New Outlook. Click the <strong>gear icon</strong> (Settings) in the top-right corner.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    2
                  </span>
                  <span>
                    In the Settings panel, click <strong>Accounts</strong> in the left column, then
                    click <strong>Signatures</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    3
                  </span>
                  <span>
                    If no signature exists, click <strong>New signature</strong>. Give it a name and
                    build your signature in the editor. You can paste rich text or formatted HTML here.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    4
                  </span>
                  <span>
                    Under &ldquo;Select default signatures,&rdquo; choose your account from the dropdown and
                    assign your new signature to <strong>New messages</strong> and{" "}
                    <strong>Replies/forwards</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    5
                  </span>
                  <span>
                    Click <strong>Save</strong>. Close and reopen New Outlook to confirm the signature
                    appears when you compose a new email.
                  </span>
                </li>
              </ol>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>If you migrated from Classic Outlook:</strong> Your old signature files
                  are still in{" "}
                  <code className="text-xs bg-amber-200 px-1 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures</code>.
                  Open the <code className="text-xs bg-amber-200 px-1 py-0.5 rounded font-mono">.htm</code> file in
                  a browser to see your old signature, then copy-paste the content into the
                  New Outlook editor. It won&rsquo;t preserve all formatting perfectly, but you&rsquo;ll have
                  your name, title, and contact details to work from.
                </p>
              </div>
            </section>

            {/* OWA recovery */}
            <section id="recover-owa" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to recover your signature in Outlook on the Web (OWA)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                OWA is the browser version of Outlook you access at{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">outlook.office.com</code>{" "}
                (for Microsoft 365 work accounts) or{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">outlook.live.com</code>{" "}
                (for personal Outlook.com / Hotmail accounts). Setting your signature here is
                important: if your Microsoft 365 account has roaming signatures enabled, whatever
                you set in OWA will sync to New Outlook on all your devices.
              </p>
              <ol className="space-y-3 mb-6 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    1
                  </span>
                  <span>
                    Open a browser and go to{" "}
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">outlook.office.com</code>.
                    Sign in with your Microsoft 365 work account.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    2
                  </span>
                  <span>
                    Click the <strong>gear icon</strong> in the top-right corner to open Settings.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    3
                  </span>
                  <span>
                    In the Settings panel, click <strong>Accounts</strong>, then <strong>Signatures</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    4
                  </span>
                  <span>
                    If you don&rsquo;t see your existing signature, click <strong>New signature</strong>. Add your
                    name, title, phone, and any other details. Or paste in your formatted HTML using
                    the HTML toggle in the signature editor.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    5
                  </span>
                  <span>
                    Set it as the default for <strong>New messages</strong> and{" "}
                    <strong>Replies/forwards</strong>. Click <strong>Save</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    6
                  </span>
                  <span>
                    If you also use Classic Outlook, the roaming signature will sync to the
                    desktop app within a few minutes. Open Outlook desktop, compose a test
                    email to verify.
                  </span>
                </li>
              </ol>

              <p className="text-slate-600 leading-relaxed">
                For OWA-specific formatting tips and how to paste an HTML signature there, the{" "}
                <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
                  Outlook-compatible email signature guide
                </Link>{" "}
                covers the HTML constraints you need to know.
              </p>
            </section>

            {/* Prevention */}
            <section id="prevention" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to back up your Outlook signature so it never disappears for good
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Recovery is possible but annoying. Prevention is much better. Here are three
                approaches, from simplest to most robust.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option 1: Copy the Signatures folder to a backup location
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Open{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures</code>{" "}
                and copy the entire folder — not just the files inside it, the whole folder — to
                a safe location like your OneDrive, a shared drive, or an external disk. Label
                it with today&rsquo;s date. Do this every time you update your signature design.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                If your signature ever disappears, copy the folder back to{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%AppData%\Microsoft\</code>,
                open Outlook, and reassign the default. This works for Classic Outlook only —
                New Outlook doesn&rsquo;t use this folder.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option 2: Save your signature as an HTML file
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Open the{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">.htm</code> file
                from your Signatures folder in a text editor like Notepad or VS Code. Copy the
                entire HTML source and paste it into a plain text file or a document in your
                cloud storage. This gives you a readable backup you can paste into any
                signature editor — Classic Outlook, New Outlook, or OWA.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                This approach also works across platforms. If you ever need to set up your
                signature in{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  Microsoft Teams
                </Link>{" "}
                or on mobile via the{" "}
                <Link href="/outlook-mobile-signature" className="text-blue-600 hover:underline">
                  Outlook mobile app
                </Link>,
                having the HTML in a text file means you always have something to paste from.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option 3: Check your signature defaults after every major update
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Microsoft releases cumulative updates on the second Tuesday of every month
                (Patch Tuesday). After any major Windows or Office update, spend 30 seconds
                going to <strong>File → Options → Mail → Signatures</strong> in Classic Outlook
                and confirming your defaults are still set. It takes less time than recovering
                from a lost signature mid-email.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-2">
                <p className="text-sm font-semibold text-slate-800 mb-2">
                  Where signature files live — quick reference
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>Classic Outlook:</strong>{" "}
                      <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">%AppData%\Microsoft\Signatures\</code>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>New Outlook / OWA:</strong> Cloud-stored via Microsoft 365 roaming
                      signatures. No local file to back up.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong>Outlook mobile (iOS/Android):</strong> Device-local, managed in the
                      Outlook app settings on each device.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* NeatStamp solution */}
            <section id="neatstamp-solution" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The cloud approach: store your signature where it can&rsquo;t get lost
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every method above has one weakness: your signature still lives somewhere local
                — a file on your PC, a setting in an app, a config tied to one profile. When
                that app resets, that PC gets wiped, or that profile gets corrupted, the
                signature goes with it.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                With NeatStamp, your signature is saved to your account in the cloud. You log
                in from any computer, click your signature, and install it in under two minutes.
                It doesn&rsquo;t matter if Windows updated overnight, if your Outlook profile got
                corrupted, or if you&rsquo;re setting up a new laptop. Your signature is always
                exactly where you left it.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                generates HTML that&rsquo;s tested across all three versions of Outlook — Classic,
                New, and OWA. It uses table-based layout with inline styles, which is what
                Outlook actually renders correctly. No flexbox, no external CSS, no images
                that trigger antivirus scans because they&rsquo;re embedded as data URIs. Just clean,
                stable HTML. You can browse{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  ready-made templates
                </Link>{" "}
                or build from scratch.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For teams, NeatStamp solves the IT problem too. Instead of every employee
                having a signature stored in a local file that survives or doesn&rsquo;t based on
                whether their PC got properly migrated, everyone installs from the same shared
                template. One update in NeatStamp, sent to the team, and everyone has the new
                version in five minutes. No GPO required.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-slate-800 mb-3">
                  Install from NeatStamp in two minutes — three steps
                </p>
                <ol className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">1</span>
                    <span>Build or log in to your signature at NeatStamp.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">2</span>
                    <span>Click &ldquo;Copy signature&rdquo; — the formatted version copies to your clipboard.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">3</span>
                    <span>
                      Paste into Outlook&rsquo;s signature editor (File → Options → Mail → Signatures).
                      Done. Repeat on any computer, any time.
                    </span>
                  </li>
                </ol>
              </div>
            </section>

            {/* Related guides grid */}
            <section id="related-guides" className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related guides</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    href: "/blog/email-signature-not-showing-outlook",
                    title: "Email Signature Not Showing in Outlook",
                    desc: "10 specific causes for Outlook signatures not appearing, with exact fixes for each.",
                  },
                  {
                    href: "/blog/outlook-signature-not-working",
                    title: "Outlook Signature Not Working",
                    desc: "Comprehensive Outlook troubleshooting: images as attachments, formatting breaks, admin policies.",
                  },
                  {
                    href: "/blog/email-signature-keeps-disappearing",
                    title: "Email Signature Keeps Disappearing",
                    desc: "Signature reverts after you set it? Roaming signatures, Gmail cache, Apple Mail — all covered.",
                  },
                  {
                    href: "/email-signature-outlook",
                    title: "Outlook Email Signature Setup Guide",
                    desc: "Full setup guide for Classic Outlook with screenshots and HTML install steps.",
                  },
                  {
                    href: "/email-signature-outlook-365",
                    title: "Outlook 365 Signature Guide",
                    desc: "Microsoft 365-specific guide including roaming signatures and OWA setup.",
                  },
                  {
                    href: "/outlook-signature-html",
                    title: "Outlook HTML Signature Guide",
                    desc: "How to install a properly formatted HTML signature in Classic Outlook and New Outlook.",
                  },
                  {
                    href: "/outlook-mobile-signature",
                    title: "Outlook Mobile Signature",
                    desc: "Set up your signature in the Outlook app on iPhone and Android.",
                  },
                  {
                    href: "/email-signature-for-teams",
                    title: "Email Signature for Microsoft Teams",
                    desc: "How to add a signature in Teams messages and sync it with your Outlook signature.",
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
                Build a signature that stays put
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Your NeatStamp signature lives in the cloud, not in a local file that Windows
                updates can reset. Install it on any computer in two minutes, any time you need it.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Build My Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
