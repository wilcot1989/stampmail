import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Roaming Signatures: What They Are and How to Fix",
  description:
    "Outlook roaming signatures sync across devices via Microsoft 365 — but they break often. Learn how they work, why they fail, and how to fix them.",
  alternates: {
    canonical: "https://neatstamp.com/blog/outlook-roaming-signatures",
  },
};

const faqs = [
  {
    q: "What are Outlook roaming signatures?",
    a: "Roaming signatures is a Microsoft 365 feature that stores your Outlook email signature in the cloud (Exchange Online) instead of on your local machine. The idea is that your signature follows you to any device where you log in — New Outlook on a work laptop, Outlook Web Access, etc. It was introduced in 2022-2023 for Microsoft 365 Business subscribers.",
  },
  {
    q: "Do roaming signatures work in classic Outlook?",
    a: "No. Roaming signatures only work in New Outlook (the web-based version rolling out since 2024) and Outlook Web Access (OWA). Classic Outlook — the traditional .exe desktop app — reads signatures from the local %APPDATA%\\Microsoft\\Signatures folder, not from Exchange Online. This mismatch is the root cause of most roaming signature problems.",
  },
  {
    q: "How do I check if roaming signatures are enabled in my organization?",
    a: "Run this PowerShell command as an Exchange admin: Get-OrganizationConfig | Select RoamingSignaturesEnabled. If it returns True, roaming signatures are active for your tenant. If False or the property doesn't exist, they're off. You can also check per-user with Get-MailboxMessageConfiguration -Identity user@domain.com.",
  },
  {
    q: "How do I disable roaming signatures for my organization?",
    a: "Run: Set-OrganizationConfig -RoamingSignaturesEnabled $false in Exchange Online PowerShell. This disables roaming signatures for the entire tenant. Users will then manage signatures locally in classic Outlook again. Note: you need Exchange Administrator or Global Administrator privileges to run this command.",
  },
  {
    q: "Why does my signature disappear when I switch between classic and new Outlook?",
    a: "Because they use separate signature storage systems. Classic Outlook reads from %APPDATA%\\Microsoft\\Signatures on your local machine. New Outlook reads from Exchange Online. When you switch clients, you're looking at a different signature store. You need to set up the signature separately in each client, or disable roaming signatures entirely and manage everything locally.",
  },
  {
    q: "How long does it take for roaming signatures to sync?",
    a: "Microsoft doesn't publish a guaranteed sync time. In practice, updates can take anywhere from a few minutes to several hours to propagate across devices. This makes roaming signatures unreliable for anything time-sensitive — like updating your signature before an important email goes out. IT admins and users consistently report sync delays as the biggest pain point with this feature.",
  },
  {
    q: "Can IT admins control roaming signatures with Group Policy?",
    a: "Not directly. Traditional Group Policy works against the local registry and file system — which is how classic Outlook signatures work. Roaming signatures are stored in Exchange Online, so they're managed through Exchange PowerShell or Microsoft 365 Admin Center, not Group Policy. This breaks many existing IT workflows that relied on GPO-based signature management.",
  },
  {
    q: "Is there a way to manage signatures centrally without dealing with roaming signatures?",
    a: "Yes. The simplest approach is to disable roaming signatures and distribute a pre-built signature HTML to all users, which they paste into classic Outlook manually. For teams, NeatStamp lets each person build their own signature with consistent branding — no server-side infrastructure needed. You create it once in NeatStamp, copy the HTML, paste into Outlook, done. It works the same way on every device.",
  },
];

export default function OutlookRoamingSignaturesPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook Roaming Signatures",
            url: "https://neatstamp.com/blog/outlook-roaming-signatures",
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
            <span className="text-slate-700">Outlook Roaming Signatures</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Microsoft 365
                </span>
                <span className="text-sm text-slate-400">14 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook Roaming Signatures: What They Are and How to Fix Them
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Microsoft introduced roaming signatures to sync your email signature across
                devices via the cloud. Sounds great in theory. In practice, it causes more
                problems than it solves — signatures disappearing, duplicating, not updating,
                or reverting to old versions. This guide explains exactly how the feature
                works, what goes wrong, and how to fix it.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 14 min read
              </p>
            </header>

            {/* Quick nav */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-bold text-amber-900 mb-3">
                Jump to the section you need
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  ["#what-are-roaming-signatures", "What are roaming signatures?"],
                  ["#how-they-work", "How roaming signatures work"],
                  ["#problems", "The problems with roaming signatures"],
                  ["#check-if-enabled", "How to check if roaming signatures are enabled"],
                  ["#how-to-disable", "How to disable roaming signatures (PowerShell)"],
                  ["#when-to-keep", "When to keep vs. disable roaming signatures"],
                  ["#best-practices", "Best practices for Microsoft 365 teams"],
                  ["#neatstamp-approach", "The NeatStamp approach (no roaming needed)"],
                  ["#related-guides", "Related guides"],
                  ["#faq", "Frequently asked questions"],
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

            {/* Section 1: What are roaming signatures */}
            <section id="what-are-roaming-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What are Outlook roaming signatures?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Roaming signatures is a Microsoft 365 feature that moves your email signature
                storage from your local machine to Exchange Online — Microsoft&rsquo;s cloud email
                infrastructure. The feature rolled out between 2022 and 2023 for Microsoft 365
                Business and Enterprise subscribers.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before roaming signatures existed, Outlook stored your signature as three files
                on your local machine:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <code className="text-sm font-mono">
                  %APPDATA%\Microsoft\Signatures\MySignature.htm{"\n"}
                  %APPDATA%\Microsoft\Signatures\MySignature.rtf{"\n"}
                  %APPDATA%\Microsoft\Signatures\MySignature.txt
                </code>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Those files lived on one machine. If you logged into Outlook on a second
                laptop, you had to recreate the signature there too. Roaming signatures were
                supposed to solve that by storing the signature in Exchange Online instead,
                so any device with your Microsoft 365 account could pull it down automatically.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The problem is that &ldquo;any device&rdquo; means something very specific to Microsoft.
                It means New Outlook and Outlook Web Access. It does not mean classic Outlook
                — the traditional Windows desktop application that most business users still
                run every day.
              </p>
              <p className="text-slate-600 leading-relaxed">
                That gap between what the feature promises and what it actually supports is
                where 90% of the confusion and frustration comes from. If your organization
                has a mix of classic Outlook users and New Outlook users — which most do right
                now — roaming signatures will cause inconsistent behavior for everyone.
              </p>
            </section>

            {/* Section 2: How they work */}
            <section id="how-they-work" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How roaming signatures work
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                When roaming signatures are enabled for your Microsoft 365 tenant, Outlook
                changes where it reads and writes signature data.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Instead of saving to the local{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  %APPDATA%\Microsoft\Signatures
                </code>{" "}
                folder, New Outlook and OWA write signatures directly into Exchange Online
                using the Microsoft Graph API. The signature data is stored in your mailbox
                settings in the cloud, under your account properties in Exchange.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you open New Outlook on a different device, it authenticates with your
                Microsoft 365 account, fetches your mailbox settings including the stored
                signature data, and presents it in your compose window. From a user&rsquo;s
                perspective, the signature just appears — no manual setup.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Administrators can control roaming signatures at the tenant level or per-user
                level using Exchange Online PowerShell. The main setting is a boolean property
                called <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">RoamingSignaturesEnabled</code> on
                the organization config. When it&rsquo;s set to{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">$true</code>,
                the cloud storage is active. When it&rsquo;s{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">$false</code>,
                Outlook falls back to local file storage.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">Important distinction</p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Roaming signatures are a tenant-wide setting, not a per-device setting.
                  You can&rsquo;t turn them on for some users and off for others without using
                  per-mailbox overrides. This matters a lot if your organization has a mix
                  of tech-savvy and non-technical users.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                The sync itself happens asynchronously. Microsoft doesn&rsquo;t guarantee a
                specific sync window — in practice, updates can take anywhere from minutes
                to several hours to propagate. For a feature designed to keep signatures
                consistent, that delay is a significant limitation.
              </p>
            </section>

            {/* Section 3: The problems */}
            <section id="problems" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The problems with roaming signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Here are the 6 most common problems that roaming signatures cause — and
                why each one happens.
              </p>

              <div className="space-y-6">
                {/* Problem 1 */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Only works in New Outlook and OWA — not classic Outlook
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        Classic Outlook (the traditional Windows .exe application) reads
                        signatures from the local file system, period. It does not talk to
                        Exchange Online to fetch roaming signature data. So if your
                        organization enables roaming signatures and some users are still on
                        classic Outlook, those users will see either their old local
                        signature or no signature at all — depending on what&rsquo;s in their
                        local Signatures folder.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        This isn&rsquo;t a minor edge case. As of early 2026, a large proportion
                        of business users are still on classic Outlook. Microsoft is pushing
                        the New Outlook transition, but many organizations haven&rsquo;t made
                        the switch — and some are actively resisting it due to missing
                        features in the new version.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Problem 2 */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Signatures sync slowly — and sometimes not at all
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        When you update your signature in New Outlook on one device, the change
                        doesn&rsquo;t immediately appear on your other devices. Microsoft routes
                        the change through Exchange Online, and the sync can take hours.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        In some cases, the sync never completes at all — especially when
                        there are conflicts between the local and cloud versions (see
                        problem 3). Users end up with different signatures on different
                        devices, which defeats the entire purpose of the feature.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Problem 3 */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Conflicts between local and cloud versions
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        If you edited your signature locally on classic Outlook, then your
                        organization enables roaming signatures, you now have two conflicting
                        versions: the local file and whatever is (or isn&rsquo;t) in Exchange Online.
                        New Outlook will show the cloud version. Classic Outlook will show
                        the local version. Neither will be automatically reconciled.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        The same conflict can occur if you edit the signature on two different
                        devices before the sync completes. Whichever version was written last
                        to Exchange Online usually &ldquo;wins,&rdquo; but that&rsquo;s not always predictable.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Problem 4 */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        IT admins can&rsquo;t manage roaming signatures via Group Policy
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        Group Policy was the standard way IT teams managed Outlook signatures
                        centrally. They could push a signature template to every user&rsquo;s machine
                        via GPO, and it would appear automatically in classic Outlook. That
                        workflow doesn&rsquo;t work for roaming signatures.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Roaming signatures are controlled through Exchange Online PowerShell
                        or the Microsoft 365 Admin Center — not Group Policy. IT teams have
                        to learn a completely different management system, and many
                        signature deployment tools built on GPO don&rsquo;t support the roaming
                        model at all.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Problem 5 */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Signature disappears when switching between classic and New Outlook
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        This is the most disorienting experience for users. Someone sets up
                        their signature in classic Outlook, everything looks fine. They open
                        New Outlook one day (maybe for a specific feature, or because IT
                        pushed an update) and their signature is gone.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        It hasn&rsquo;t actually been deleted — it&rsquo;s still in the local Signatures
                        folder. But New Outlook looks in Exchange Online, where there&rsquo;s
                        nothing. The user then sets up the signature in New Outlook, switches
                        back to classic, and the signature they see there is the old local
                        one — not the updated cloud version. Both clients think they&rsquo;re
                        right, and neither is talking to the other.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Problem 6 */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-sm font-bold">
                      6
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Only 1 signature in some configurations
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        Classic Outlook supports multiple named signatures — you can create
                        10 different signatures and manually select which to use when composing.
                        Some roaming signature configurations limit this to 1 active signature
                        per mailbox, or only expose 1 signature in the New Outlook compose UI.
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        For users who legitimately need different signatures for different
                        contexts — formal vs. casual, different languages, project-specific
                        signatures — this is a real functional regression from how classic
                        Outlook worked.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Check if enabled */}
            <section id="check-if-enabled" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to check if roaming signatures are enabled
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You need Exchange admin access to run these commands. Connect to Exchange
                Online PowerShell first, then run:
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Check the tenant-wide setting
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  {`Get-OrganizationConfig | Select RoamingSignaturesEnabled`}
                </pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                This returns either <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">True</code> or{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">False</code>. If the property
                doesn&rsquo;t exist on your tenant (older Exchange Online configurations), the
                feature hasn&rsquo;t been provisioned and is effectively disabled.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Check a specific user&rsquo;s setting
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  {`Get-MailboxMessageConfiguration -Identity user@yourdomain.com | Select SignatureHtml, SignatureText`}
                </pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                This shows you what signature content is stored in Exchange Online for that
                user. If both fields are empty, the user hasn&rsquo;t set up a roaming signature
                yet — or they&rsquo;re using classic Outlook and never touched New Outlook&rsquo;s
                signature settings.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Check without admin access (user self-check)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re a regular user without PowerShell access, the easiest way to
                check is to open Outlook Web Access at{" "}
                <span className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
                  outlook.office.com
                </span>
                , go to Settings &rarr; Mail &rarr; Compose and reply, and look at the signature
                section. If there&rsquo;s a signature there that you never set up on OWA, your
                admin has pushed one via Exchange — or roaming signatures picked it up from
                your New Outlook session.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If the signature in OWA is different from what you see in classic Outlook,
                that&rsquo;s a sign that roaming signatures are causing a split — two separate
                versions living in two separate places. See also:{" "}
                <Link
                  href="/blog/outlook-signature-not-working"
                  className="text-blue-600 hover:underline"
                >
                  full Outlook signature troubleshooting guide
                </Link>{" "}
                for diagnosing other causes.
              </p>
            </section>

            {/* Section 5: How to disable */}
            <section id="how-to-disable" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to disable roaming signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Disabling roaming signatures at the organization level is a single PowerShell
                command. You need Exchange Administrator or Global Administrator privileges.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Disable for the entire tenant
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  {`# Connect to Exchange Online first
Connect-ExchangeOnline -UserPrincipalName admin@yourdomain.com

# Disable roaming signatures
Set-OrganizationConfig -RoamingSignaturesEnabled $false

# Verify the change
Get-OrganizationConfig | Select RoamingSignaturesEnabled`}
                </pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                After running this, Outlook will fall back to reading signatures from the
                local{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  %APPDATA%\Microsoft\Signatures
                </code>{" "}
                folder — the same behavior as before roaming signatures existed. Users who
                had set up signatures in New Outlook or OWA will need to set them up again
                in classic Outlook.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  Before you disable
                </p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Tell your users in advance. When you flip this setting, anyone who was
                  relying on New Outlook or OWA to show their signature will lose it.
                  Give them time to export their signature HTML from OWA (Settings &rarr;
                  Mail &rarr; Compose and reply &rarr; copy the signature text) before you
                  make the change.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Disable for a specific user only
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you want to test the change on one user before rolling it out, or if
                you need per-user control, you can override at the mailbox level. However,
                note that per-user overrides for roaming signatures require setting a
                mailbox-level property, and Microsoft&rsquo;s documentation on this is thin.
                The most reliable approach is the tenant-wide setting.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For most organizations, the cleanest solution is to disable roaming
                signatures tenant-wide and use a consistent distribution method instead —
                which we cover in the best practices section below.
              </p>
            </section>

            {/* Section 6: When to keep vs disable */}
            <section id="when-to-keep" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When to keep roaming signatures enabled vs. disabled
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are situations where roaming signatures actually work well. And there
                are situations where they&rsquo;re a guaranteed headache. Here&rsquo;s a straightforward
                breakdown:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="border border-green-200 bg-green-50 rounded-xl p-5">
                  <p className="text-sm font-bold text-green-900 mb-3">
                    Keep roaming signatures ON if:
                  </p>
                  <ul className="space-y-2 text-sm text-green-800">
                    {[
                      "Your entire organization has migrated to New Outlook",
                      "All users primarily access email via OWA/browser",
                      "Nobody in the org uses classic Outlook desktop",
                      "You don't need Group Policy-based signature management",
                      "Users work on many different devices and manual setup would be a burden",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-green-600 font-bold flex-shrink-0">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-red-200 bg-red-50 rounded-xl p-5">
                  <p className="text-sm font-bold text-red-900 mb-3">
                    Disable roaming signatures if:
                  </p>
                  <ul className="space-y-2 text-sm text-red-800">
                    {[
                      "Any users are still on classic Outlook desktop",
                      "You manage signatures centrally via Group Policy",
                      "Your org uses a third-party signature management tool",
                      "You've seen reports of signatures disappearing or conflicting",
                      "Users need multiple named signatures to switch between",
                      "You need predictable, immediate signature updates",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-red-600 font-bold flex-shrink-0">&minus;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                For most organizations in 2026, the honest answer is: disable roaming
                signatures until the Classic-to-New Outlook migration is fully complete.
                The feature adds complexity without clear benefits for mixed-client
                environments, and the sync delays alone make it unsuitable for anyone
                who needs reliable signature behavior.
              </p>
            </section>

            {/* Section 7: Best practices */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Best practices for teams using Microsoft 365
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Whether you keep roaming signatures enabled or disabled, here&rsquo;s what
                actually works well for teams managing signatures across Microsoft 365.
              </p>

              <div className="space-y-4">
                {[
                  {
                    number: "1",
                    title: "Pick one Outlook client per user and stick with it",
                    body: "The majority of signature problems come from users who bounce between classic Outlook and New Outlook. If you're in transition, pick one for each user and make sure their signature is set up correctly in that client. Mixing clients on the same mailbox is where conflicts multiply.",
                  },
                  {
                    number: "2",
                    title: "Use HTML-based signatures, not plain text",
                    body: "Plain text signatures work everywhere but can't include logos, social icons, or formatted contact details. HTML signatures look professional and work reliably in both classic Outlook and New Outlook as long as you use table-based layout with inline styles — not flexbox or CSS classes. For a full Outlook-compatible signature, see our guide to Outlook 365 signatures.",
                  },
                  {
                    number: "3",
                    title: "Host signature images externally",
                    body: "Never embed images as base64 in your signature HTML. Classic Outlook converts base64 images to file attachments, which is confusing for recipients and makes emails look unprofessional. Host images on your company website or a CDN and reference them by absolute https:// URL.",
                  },
                  {
                    number: "4",
                    title: "Document the signature setup process for new hires",
                    body: "\"My signature is gone\" is one of the top IT helpdesk tickets in any organization that uses Outlook. Write a one-page setup guide and put it in your employee onboarding docs. Include the Outlook client version, the steps to add the signature, and where to get the signature HTML from.",
                  },
                  {
                    number: "5",
                    title: "Test on mobile too",
                    body: "The Outlook mobile app on iOS and Android has its own signature settings, separate from both classic Outlook and New Outlook desktop. If your team sends emails from their phones, make sure they've set up a consistent mobile signature. The Outlook mobile signature guide covers this separately.",
                  },
                  {
                    number: "6",
                    title: "If you manage signatures centrally, use PowerShell or a dedicated tool",
                    body: "Group Policy works for classic Outlook signatures but not roaming signatures. For organization-wide signature management across Microsoft 365, you need either Exchange Online PowerShell scripts, a server-side signature injection tool (like those covered in the company-wide management guide), or a per-user distribution method that doesn't depend on GPO.",
                  },
                ].map((item) => (
                  <div key={item.number} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                      {item.number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-slate-600 leading-relaxed">
                  For company-wide signature rollouts across Microsoft 365, the{" "}
                  <Link
                    href="/blog/email-signature-company-wide-management"
                    className="text-blue-600 hover:underline"
                  >
                    company-wide email signature management guide
                  </Link>{" "}
                  covers your options in detail — from free PowerShell scripts to
                  enterprise signature management platforms, with real cost comparisons.
                  If you also need Teams signatures to match, see the{" "}
                  <Link
                    href="/email-signature-for-teams"
                    className="text-blue-600 hover:underline"
                  >
                    Microsoft Teams signature guide
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Section 8: NeatStamp approach */}
            <section id="neatstamp-approach" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The NeatStamp approach: no roaming required
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp doesn&rsquo;t use roaming signatures at all. Your signature is designed
                and saved in NeatStamp — our{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  free online editor
                </Link>{" "}
                generates clean, Outlook-compatible HTML that you copy once and paste
                into any email client.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                That approach bypasses the entire roaming signatures problem:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "No sync delays — you paste the HTML once and it works immediately",
                  "Works in classic Outlook, New Outlook, OWA, Gmail, Apple Mail, and Outlook mobile",
                  "No Exchange Online dependency — the signature is just HTML in your email client",
                  "No conflicts between local and cloud versions — there's only one version, and it's in NeatStamp",
                  "Easy to update — change it in NeatStamp, copy the new HTML, paste to replace the old signature",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                For individual users, this means you design your signature in NeatStamp,
                follow the{" "}
                <Link
                  href="/email-signature-outlook"
                  className="text-blue-600 hover:underline"
                >
                  Outlook signature setup guide
                </Link>
                , and you&rsquo;re done. No IT ticket, no PowerShell, no waiting for sync.
                It takes about 5 minutes.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For teams, you can build a signature template in NeatStamp, send the setup
                instructions to everyone, and each person pastes it into their own Outlook.
                It&rsquo;s simpler than any centralized management solution — no infrastructure
                to maintain, no Exchange admin needed.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  What about the{" "}
                  <Link
                    href="/email-signature-outlook-365"
                    className="text-blue-600 hover:underline"
                  >
                    Outlook 365 signature
                  </Link>
                  {" "}specifically?
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  NeatStamp generates table-based HTML with inline styles that renders
                  correctly in every version of Outlook — 2016, 2019, 2021, and 365.
                  The same HTML file works in classic Outlook and New Outlook. You don&rsquo;t
                  need to maintain separate signatures for separate clients.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed">
                If your signature is showing the wrong content or has disappeared, the
                fastest fix is to rebuild it in NeatStamp and paste the fresh HTML into
                Outlook. Check the{" "}
                <Link
                  href="/blog/email-signature-not-showing-outlook"
                  className="text-blue-600 hover:underline"
                >
                  email signature not showing in Outlook guide
                </Link>{" "}
                if you&rsquo;re having trouble getting the pasted signature to appear. For
                signatures that disappear repeatedly, see{" "}
                <Link
                  href="/blog/outlook-signature-disappeared"
                  className="text-blue-600 hover:underline"
                >
                  why Outlook signatures disappear and how to stop it
                </Link>
                .
              </p>
            </section>

            {/* Related guides */}
            <section id="related-guides" className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related guides</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/email-signature-outlook",
                    label: "Outlook Signature Setup Guide",
                  },
                  {
                    href: "/email-signature-outlook-365",
                    label: "Outlook 365 Signature Guide",
                  },
                  {
                    href: "/blog/outlook-signature-not-working",
                    label: "Outlook Signature Not Working",
                  },
                  {
                    href: "/blog/outlook-signature-disappeared",
                    label: "Why Outlook Signatures Disappear",
                  },
                  {
                    href: "/blog/email-signature-not-showing-outlook",
                    label: "Email Signature Not Showing in Outlook",
                  },
                  {
                    href: "/outlook-mobile-signature",
                    label: "Outlook Mobile Signature Setup",
                  },
                  {
                    href: "/email-signature-for-teams",
                    label: "Email Signature for Microsoft Teams",
                  },
                  {
                    href: "/blog/email-signature-company-wide-management",
                    label: "Company-Wide Signature Management",
                  },
                  {
                    href: "/email-signature-cost-calculator",
                    label: "Email Signature Cost Calculator",
                  },
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

            {/* Internal links block */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-4">
                More resources
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                {[
                  { href: "/email-signature-outlook-compatible", label: "Outlook-compatible signature formats" },
                  { href: "/templates", label: "Email signature templates" },
                  { href: "/pricing", label: "NeatStamp Pro for teams" },
                  { href: "/editor", label: "Free signature editor" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Skip the roaming signatures headache
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Build your signature in NeatStamp and paste the HTML into any version of
                Outlook. No Exchange admin needed, no sync delays, no conflicts. Free, no
                account required. Takes about 5 minutes.
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
