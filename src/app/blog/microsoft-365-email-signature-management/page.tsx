import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Microsoft 365 Email Signature Management Guide",
  description:
    "Microsoft 365 email signature management at scale: transport rules, PowerShell scripts, third-party tools, and a cost comparison. For IT managers.",
  alternates: {
    canonical:
      "https://neatstamp.com/blog/microsoft-365-email-signature-management",
  },
};

const faqs = [
  {
    q: "Does Microsoft 365 have built-in email signature management?",
    a: "Yes, but it's limited. Exchange Online lets you create mail flow rules (transport rules) that append HTML to outgoing messages. The catch: signatures are appended after sending, so employees never see them in the compose window. For full control — including composing with a visible signature — you need PowerShell, an Outlook add-in, or a third-party tool.",
  },
  {
    q: "What are Exchange transport rules and how do they work for signatures?",
    a: "Transport rules are mail flow policies in Exchange Admin Center that apply actions to messages that match specific conditions. For signatures, you create a rule that fires on all outbound messages and appends an HTML disclaimer block. You can include Active Directory attributes like %%DisplayName%%, %%Title%%, and %%PhoneNumber%% as dynamic variables. The signature is injected server-side before delivery — employees don't see it until they check Sent Items.",
  },
  {
    q: "Can I deploy email signatures to all M365 users via PowerShell?",
    a: "Yes. Using the Exchange Online PowerShell module, the Set-MailboxMessageConfiguration cmdlet lets you set the SignatureHtml property for individual mailboxes. You can run this in a loop across all mailboxes, pulling employee data from Get-Mailbox or a CSV file. The limitation is that PowerShell sets the signature in Outlook on the Web — it doesn't always sync immediately to the desktop Outlook client.",
  },
  {
    q: "What's the difference between Exclaimer, CodeTwo, and NeatStamp for M365?",
    a: "Exclaimer and CodeTwo are server-side tools that integrate deeply with Exchange Online and inject signatures after sending. They're powerful but priced for larger enterprises — typically $1–3 per user per month. NeatStamp is a client-side tool where each user installs their personalized signature, with a flat-fee team plan rather than per-user pricing. For teams under 200 people, NeatStamp is usually significantly cheaper. For absolute server-side enforcement regardless of client, Exclaimer or CodeTwo are the stronger fit.",
  },
  {
    q: "Why don't M365 email signatures sync to mobile devices?",
    a: "When you set a signature in Outlook desktop, it's stored locally on that machine. Outlook mobile (iOS and Android) uses a separate signature setting that doesn't sync with the desktop. The same applies to Outlook on the Web — three separate places to set three separate signatures. The only way to enforce consistency across all surfaces is server-side injection (transport rules or a tool like Exclaimer) or using the new M365 roaming signatures feature, which currently only works in the new Outlook for Windows.",
  },
  {
    q: "What is the New Outlook migration and how does it affect signatures?",
    a: "Microsoft is migrating users from the classic Outlook desktop client (Win32) to a new browser-based Outlook for Windows. The two clients use different signature storage mechanisms. Classic Outlook stores signatures as .htm files in a local AppData folder. The new Outlook stores them in the cloud via Exchange. If employees are mid-migration — some on classic, some on new — their signatures may not transfer automatically. IT admins need to handle both environments during the transition period.",
  },
  {
    q: "How do I manage signatures in a hybrid Exchange environment?",
    a: "In a hybrid setup (on-premises Exchange plus Exchange Online), transport rules need to exist in both environments to cover all mail flows. Rules created in Exchange Admin Center (online) only apply to messages routed through Exchange Online. Messages sent from on-premises mailboxes through your on-premises Exchange server aren't touched by EAC rules. You'll need matching rules in your on-premises Exchange Management Console, or route all outbound mail through Exchange Online.",
  },
  {
    q: "How do I handle email signatures for shared mailboxes in M365?",
    a: "Shared mailboxes in Exchange Online can have a signature set via PowerShell using Set-MailboxMessageConfiguration on the shared mailbox itself. However, when a user sends as a shared mailbox from Outlook desktop, the signature that appears is the one from their personal profile, not the shared mailbox's setting. The reliable fix is a transport rule scoped to messages sent from the shared mailbox address, or a third-party tool with explicit shared mailbox support.",
  },
  {
    q: "What's the maximum file size for an M365 email signature?",
    a: "Microsoft recommends keeping email signatures under 10KB total. This includes the HTML markup and any base64-encoded images embedded inline. Beyond 10KB you start to affect deliverability — some receiving mail servers flag oversized signatures as suspicious, and large HTML blocks can trip spam filters. Host images externally (via HTTPS URL) instead of embedding them to keep the signature small. A typical well-designed HTML signature with an external logo should come in under 3KB.",
  },
  {
    q: "Can NeatStamp replace Exclaimer for Microsoft 365?",
    a: "It depends on your requirements. If you need server-side injection (the signature is appended at the mail server level regardless of client) and absolute enforcement with no reliance on employee setup, Exclaimer is the purpose-built tool for that. If you're willing to have employees install the signature once and want a simpler, cheaper alternative for teams under 200 users, NeatStamp with its M365 deployment guide and CSV upload covers most of the same ground at a fraction of the cost. The alternative-to-Exclaimer comparison page has a detailed breakdown.",
  },
];

const ps365BulkScript = [
  "# Connect to Exchange Online",
  "Connect-ExchangeOnline -UserPrincipalName admin@yourcompany.com",
  "",
  "# Get all user mailboxes (excludes shared/room/equipment)",
  "$mailboxes = Get-Mailbox -RecipientTypeDetails UserMailbox -ResultSize Unlimited",
  "",
  "foreach ($mailbox in $mailboxes) {",
  "    # Get user details from Azure AD",
  "    $user = Get-User -Identity $mailbox.UserPrincipalName",
  "",
  "    $displayName = $user.DisplayName",
  "    $title       = $user.Title",
  "    $phone       = $user.Phone",
  "    $email       = $mailbox.PrimarySmtpAddress",
  "",
  "    # Build personalized HTML signature",
  '    $signatureHtml = @"',
  '<table cellpadding="0" cellspacing="0" border="0"',
  '  style="font-family:Arial,sans-serif;font-size:13px;color:#333333;">',
  "  <tr>",
  '    <td style="padding-right:16px;border-right:2px solid #0062FF;vertical-align:top;">',
  '      <img src="https://yourcompany.com/email-logo.png" width="120" alt="YourCompany" />',
  "    </td>",
  '    <td style="padding-left:16px;vertical-align:top;line-height:1.6;">',
  '      <strong style="font-size:14px;color:#111111;">$displayName</strong><br/>',
  '      <span style="color:#555555;">$title</span><br/>',
  '      $(if ($phone) { "<span style=\'color:#555555;\'>$phone</span><br/>" })',
  '      <a href="mailto:$email" style="color:#0062FF;">$email</a><br/>',
  '      <a href="https://yourcompany.com" style="color:#0062FF;">yourcompany.com</a>',
  "    </td>",
  "  </tr>",
  "</table>",
  '"@',
  "",
  "    # Push signature to mailbox",
  "    Set-MailboxMessageConfiguration `",
  "        -Identity $mailbox.UserPrincipalName `",
  "        -SignatureHtml $signatureHtml `",
  "        -AutoAddSignature $true `",
  "        -AutoAddSignatureOnReply $false",
  "",
  '    Write-Host "Set signature for $displayName ($email)"',
  "}",
  "",
  "Disconnect-ExchangeOnline -Confirm:$false",
].join("\n");

export default function Microsoft365EmailSignatureManagementPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Microsoft 365 Email Signature Management",
            url: "https://neatstamp.com/blog/microsoft-365-email-signature-management",
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
            <span className="text-slate-700">M365 Signature Management</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  IT Management
                </span>
                <span className="text-sm text-slate-400">15 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Microsoft 365 Email Signature Management: The Complete Guide
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Managing email signatures for a Microsoft 365 organization is one of those
                tasks that sounds simple until you actually try to do it at scale. 10 people?
                Fine, send a template by email. 100 people? You need a system. This guide
                covers every practical approach — from Exchange transport rules and PowerShell
                scripts to third-party tools — so you can pick what fits your organization
                and get it done.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 15 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#four-approaches", "The 4 approaches to M365 signature management"],
                  ["#transport-rules", "Exchange transport rules: deep dive"],
                  ["#powershell", "PowerShell deployment across all mailboxes"],
                  ["#cost-comparison", "Cost comparison: DIY vs. Exclaimer vs. CodeTwo vs. NeatStamp"],
                  ["#m365-challenges", "M365-specific challenges IT teams face"],
                  ["#best-practices", "Best practices for IT managers"],
                  ["#neatstamp-m365", "NeatStamp for M365 teams"],
                  ["#related-guides", "Related guides"],
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
            <section id="four-approaches" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The 4 approaches to M365 signature management
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                There isn&rsquo;t one right answer here — the best approach depends on your team
                size, technical resources, and how much enforcement you need. Here&rsquo;s how
                each option actually works in practice.
              </p>

              <div className="space-y-5 mb-6">
                {[
                  {
                    number: "1",
                    title: "Manual distribution",
                    subtitle: "Template + instructions sent to each employee",
                    detail:
                      "You design a signature, send a template file and setup instructions to each person, and hope they follow through. This works at 10 people. At 50, you'll have employees using the wrong template, wrong phone numbers, or no signature at all. Every rebrand or update requires the whole process again from scratch. The time cost compounds fast: a 100-person company spending 3 minutes per person per update spends 5 hours every time anything changes.",
                    verdict: "Doesn't scale past ~20 people.",
                    color: "red",
                  },
                  {
                    number: "2",
                    title: "Exchange transport rules",
                    subtitle: "Server-side injection via Exchange Admin Center",
                    detail:
                      "Exchange Online mail flow rules append an HTML signature to every outgoing message at the server level. This is guaranteed consistency — the signature fires regardless of what client or device the employee sends from. The downsides: employees never see the signature in their compose window (it only appears in Sent Items), HTML formatting is constrained, images require external hosting, and long reply chains can end up with the signature at the very bottom of a chain rather than above the reply.",
                    verdict: "Guaranteed delivery, but limited formatting and no compose-window preview.",
                    color: "yellow",
                  },
                  {
                    number: "3",
                    title: "PowerShell scripting",
                    subtitle: "Set-MailboxMessageConfiguration across all mailboxes",
                    detail:
                      "PowerShell gives you programmatic control over every mailbox in your tenant. You can pull employee data from Active Directory, build personalized HTML signatures, and push them to all mailboxes in a single script run. This is technically powerful and fully free — no additional licenses. The catch: it requires someone comfortable with Exchange Online PowerShell, the signatures are set in Outlook on the Web (not always syncing to desktop Outlook immediately), and you need to re-run the script whenever data or templates change.",
                    verdict: "Powerful and free, but requires ongoing technical maintenance.",
                    color: "yellow",
                  },
                  {
                    number: "4",
                    title: "Third-party tools",
                    subtitle: "Exclaimer, CodeTwo, NeatStamp — purpose-built for this",
                    detail:
                      "Tools built specifically for signature management handle the complexity for you. Exclaimer and CodeTwo do server-side injection with a proper admin UI. NeatStamp takes a client-side approach with a flat-fee team plan, master templates, CSV upload, and a PowerShell deployment script you can run as part of onboarding. These tools are the fastest to set up and require the least ongoing maintenance.",
                    verdict: "Best for IT teams that want consistent results without ongoing scripting work.",
                    color: "green",
                  },
                ].map((item) => (
                  <div key={item.number} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-5 py-4 flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {item.number}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-500 mt-0.5">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.detail}</p>
                      <p
                        className={`text-xs font-semibold ${
                          item.color === "green"
                            ? "text-green-700"
                            : item.color === "red"
                            ? "text-red-600"
                            : "text-amber-700"
                        }`}
                      >
                        Verdict: {item.verdict}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2 */}
            <section id="transport-rules" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Exchange transport rules: deep dive
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                If you want to try the built-in M365 approach before looking at third-party
                tools, here&rsquo;s how to set up a transport rule signature properly. This covers
                the Exchange Admin Center setup, a working HTML template, and the limitations
                you&rsquo;ll hit.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Setting up the rule in Exchange Admin Center
              </h3>
              <ol className="space-y-3 mb-6 text-slate-600">
                {[
                  "Go to Exchange Admin Center (admin.exchange.microsoft.com) and navigate to Mail flow → Rules.",
                  "Click Add a rule → Apply disclaimers.",
                  "Name the rule (e.g., \"Company Email Signature — All Outbound\").",
                  "Under Apply this rule if, select The sender is located → Inside the organization.",
                  "Under Do the following, select Append the disclaimer and paste your HTML template.",
                  "Set the fallback action to Wrap (this wraps the entire message in a new email if the signature can't be injected, which almost never happens but is required).",
                  "Set the rule priority and set the mode to Enforce (not Test).",
                  "Save and wait 5–10 minutes for the rule to propagate to all Exchange servers.",
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                HTML template with Active Directory variables
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                Exchange transport rules support a set of Active Directory attributes as
                variables. Use them in your HTML template like this:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap">
{`<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:13px;color:#333333;">
  <tr>
    <td style="padding-right:16px;border-right:2px solid #0062FF;vertical-align:top;">
      <img src="https://yourcompany.com/email-logo.png" width="120" alt="Company Logo" />
    </td>
    <td style="padding-left:16px;vertical-align:top;">
      <strong style="font-size:14px;color:#111111;">%%DisplayName%%</strong><br/>
      <span style="color:#666666;">%%Title%%</span><br/>
      <span style="color:#666666;">%%PhoneNumber%%</span><br/>
      <a href="https://yourcompany.com" style="color:#0062FF;">yourcompany.com</a>
    </td>
  </tr>
</table>`}
                </pre>
              </div>

              <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                The variables Exchange supports include:
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-2.5 px-4 text-left font-semibold text-slate-700 text-xs">Variable</th>
                      <th className="py-2.5 px-4 text-left font-semibold text-slate-700 text-xs">Source in Azure AD / M365</th>
                      <th className="py-2.5 px-4 text-left font-semibold text-slate-700 text-xs">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {[
                      ["%%DisplayName%%", "Display Name", "Usually First Last — most reliable"],
                      ["%%Title%%", "Job Title", "Set in Azure AD or M365 Admin Center"],
                      ["%%PhoneNumber%%", "Business Phone", "Often blank if not populated in AD"],
                      ["%%MobilePhone%%", "Mobile Phone", "Usually blank without HR sync"],
                      ["%%Street%%", "Street Address", "Rarely used"],
                      ["%%City%%", "City", "Useful for multi-office companies"],
                      ["%%Company%%", "Company", "Consistent if set in tenant settings"],
                      ["%%Department%%", "Department", "Useful for segmenting by team"],
                    ].map((row) => (
                      <tr key={row[0]}>
                        <td className="py-2.5 px-4 font-mono text-blue-700">{row[0]}</td>
                        <td className="py-2.5 px-4 text-slate-600">{row[1]}</td>
                        <td className="py-2.5 px-4 text-slate-500">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Limitations you&rsquo;ll run into
              </h3>
              <ul className="space-y-2 mb-4 text-slate-600">
                {[
                  "Employees don't see the signature in compose. It only appears in Sent Items, which means no compose-window preview and employees can't verify their details look right.",
                  "Images can't be embedded as inline attachments via transport rules. You must host the logo externally at an HTTPS URL. If your URL changes or the image goes offline, everyone's signature breaks.",
                  "Plain text fallback is needed. Every HTML rule should have a plain text version set separately. If a receiving server requests plain text, Exchange falls back to this — without it, you get a raw HTML dump in plain text emails.",
                  "Reply chains get messy. The signature is appended at the bottom of the entire conversation each time someone replies, not at the top of the new reply. By email 5 in a chain, the thread is very long.",
                  "Scoping to departments is possible but complex. You can scope rules by distribution group membership, but this requires keeping those groups updated — another manual process.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed text-sm">
                For a more detailed look at Outlook-specific signature behavior, the{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook email signature guide
                </Link>{" "}
                covers client-side setup, and the{" "}
                <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                  Outlook 365 guide
                </Link>{" "}
                specifically addresses the web-based client differences.
              </p>
            </section>

            {/* Section 3 */}
            <section id="powershell" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                PowerShell deployment across all mailboxes
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you want client-side signatures (employees see them in compose) without
                paying for a third-party tool, PowerShell is the path. Here&rsquo;s a working
                script that covers the core workflow: connect to Exchange Online, pull
                mailbox data, and push a personalized HTML signature to each user.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Prerequisites
              </h3>
              <ul className="space-y-1.5 mb-5 text-slate-600 text-sm">
                {[
                  "Exchange Online PowerShell module installed: Install-Module -Name ExchangeOnlineManagement",
                  "Global Admin or Exchange Admin credentials",
                  "Your HTML template as a string variable (or loaded from a .html file)",
                  "A CSV file with employee data if you're supplementing what's in Azure AD",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Script: set signatures for all users
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap">
{ps365BulkScript}
                </pre>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                A few notes on running this in production:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600 text-sm">
                {[
                  "Set -AutoAddSignatureOnReply to $false unless you want the full signature on every reply. Most companies only want it on new messages.",
                  "Set-MailboxMessageConfiguration pushes to Outlook on the Web. Desktop Outlook syncs this setting when it next connects and processes the mailbox configuration — usually within 30 minutes, but can take up to 24 hours on some tenants.",
                  "If %%Title%% or %%Phone%% fields are empty in Azure AD, the script produces empty lines in the signature. Add conditional logic (as shown with $phone) to skip blank fields.",
                  "Run this on a schedule (Task Scheduler or Azure Automation) to catch new hires and role changes. Monthly is the minimum; weekly is better.",
                  "Test with a single mailbox first: pipe to Where-Object { $_.PrimarySmtpAddress -eq 'test.user@yourcompany.com' } before running across all 50+ users.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed text-sm">
                This approach works well for IT teams comfortable with PowerShell. If you&rsquo;d
                rather not maintain a script long-term, NeatStamp includes a ready-made
                PowerShell deployment script as part of the team plan — no scripting required
                on your end. The{" "}
                <Link href="/outlook-signature-for-company" className="text-blue-600 hover:underline">
                  company Outlook signature guide
                </Link>{" "}
                also covers the manual deployment workflow step by step.
              </p>
            </section>

            {/* Section 4: Cost Comparison */}
            <section id="cost-comparison" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Cost comparison: DIY vs. Exclaimer vs. CodeTwo vs. NeatStamp
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                This is the table most IT managers want before they make a decision. The
                numbers below assume a 50-user M365 organization.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Option</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Setup cost</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Monthly cost (50 users)</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">IT time/month</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Server-side?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        option: "Manual distribution",
                        setup: "0",
                        monthly: "0",
                        time: "3–5 hrs",
                        serverSide: "No",
                        highlight: false,
                      },
                      {
                        option: "Transport rules only",
                        setup: "1–2 hrs",
                        monthly: "0",
                        time: "1–2 hrs",
                        serverSide: "Yes",
                        highlight: false,
                      },
                      {
                        option: "PowerShell script",
                        setup: "4–8 hrs",
                        monthly: "0",
                        time: "1 hr (maintenance)",
                        serverSide: "No",
                        highlight: false,
                      },
                      {
                        option: "Exclaimer",
                        setup: "Half day",
                        monthly: "~$75–150",
                        time: "<30 min",
                        serverSide: "Yes",
                        highlight: false,
                      },
                      {
                        option: "CodeTwo",
                        setup: "Half day",
                        monthly: "~$50–125",
                        time: "<30 min",
                        serverSide: "Yes",
                        highlight: false,
                      },
                      {
                        option: "NeatStamp",
                        setup: "1–2 hrs",
                        monthly: "Flat fee (not per user)",
                        time: "<15 min",
                        serverSide: "No (client-side)",
                        highlight: true,
                      },
                    ].map((row) => (
                      <tr
                        key={row.option}
                        className={row.highlight ? "bg-blue-50" : ""}
                      >
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {row.option}
                          {row.highlight && (
                            <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
                              Best value
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{row.setup}</td>
                        <td className="py-3 px-4 text-slate-600">{row.monthly}</td>
                        <td className="py-3 px-4 text-slate-600">{row.time}</td>
                        <td className="py-3 px-4 text-slate-600">{row.serverSide}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                The monthly cost difference between Exclaimer/CodeTwo and NeatStamp is
                significant at 50 users — and it gets larger as the team grows, because
                Exclaimer and CodeTwo price per seat while NeatStamp uses flat-fee pricing.
                At 100 users, Exclaimer can cost $150–300/month. NeatStamp doesn&rsquo;t change
                price.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                The tradeoff is server-side enforcement: Exclaimer and CodeTwo guarantee the
                signature on every outbound email regardless of client. NeatStamp requires
                the employee to install the signature once. For most teams, the one-time
                setup is manageable — especially with the deployment tools NeatStamp provides.
                See the{" "}
                <Link href="/alternative-to-exclaimer" className="text-blue-600 hover:underline">
                  Exclaimer alternative comparison
                </Link>{" "}
                and the{" "}
                <Link href="/alternative-to-codetwo" className="text-blue-600 hover:underline">
                  CodeTwo alternative comparison
                </Link>{" "}
                for a deeper breakdown.
              </p>
            </section>

            {/* Section 5: M365 Challenges */}
            <section id="m365-challenges" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                M365-specific challenges IT teams face
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Managing signatures in a Microsoft 365 environment has specific complications
                that don&rsquo;t apply to Google Workspace. Here are the four you&rsquo;re most likely
                to hit.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    1. Roaming signatures (and why they&rsquo;re not working yet)
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-2">
                    Microsoft introduced &ldquo;roaming signatures&rdquo; — cloud-stored signatures that
                    sync across devices — but as of early 2026, they only work in the new
                    Outlook for Windows and Outlook on the Web. Classic Outlook desktop (the
                    Win32 app that most enterprises still run) stores signatures as local .htm
                    files in{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      %APPDATA%\Microsoft\Signatures
                    </code>
                    . These don&rsquo;t sync to Outlook mobile or Outlook on the Web.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    If your users are on classic Outlook desktop, roaming signatures won&rsquo;t
                    solve your problem today. The{" "}
                    <Link href="/blog/outlook-roaming-signatures" className="text-blue-600 hover:underline">
                      roaming signatures guide
                    </Link>{" "}
                    covers the current state in detail, including which clients support it
                    and the known gaps.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    2. The New Outlook migration
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Microsoft is actively migrating users from the classic Win32 Outlook to
                    a new browser-based Outlook for Windows. The two clients use fundamentally
                    different signature storage systems. Classic Outlook uses local .htm files.
                    The new Outlook uses cloud-stored signatures managed via Exchange. If your
                    organization is mid-migration — some people have switched, some haven&rsquo;t —
                    signatures set on one client may not appear on the other. You need to
                    handle both environments during the transition period, which for most
                    enterprises will last 12–24 months. Track which users have migrated via
                    the M365 Admin Center (Settings → Org settings → New Outlook) and
                    maintain separate deployment workflows for each group.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    3. Hybrid Exchange environments
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Organizations running a hybrid setup — some mailboxes on-premises Exchange,
                    some in Exchange Online — face a split-brain signature problem. Transport
                    rules created in Exchange Admin Center (the cloud admin portal) only apply
                    to mail routed through Exchange Online. Mail sent from an on-premises
                    mailbox goes through your on-premises Exchange server, which has its own
                    set of transport rules in Exchange Management Console. You need matching
                    rules in both environments to achieve consistent signatures. This also
                    applies to mail routing: if on-premises mail is centralized-routed through
                    Exchange Online, EAC rules will cover it — but that&rsquo;s not always the case
                    in hybrid setups.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    4. Mobile devices not syncing signatures
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-2">
                    Outlook mobile (iOS and Android) has its own signature setting under
                    Settings → Account → Signature. This doesn&rsquo;t sync with Outlook desktop
                    or Outlook on the Web. Users have to set it up separately. For most
                    organizations, this is solved in one of two ways: either use server-side
                    injection (transport rules or a tool like Exclaimer) which catches mobile
                    sends at the server level, or include mobile signature setup in your
                    onboarding checklist with instructions specific to each mobile OS. For the
                    mobile setup process, the{" "}
                    <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                      Teams deployment guide
                    </Link>{" "}
                    includes a mobile section with step-by-step screenshots.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Best Practices */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Best practices for IT managers
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                These aren&rsquo;t theoretical — they&rsquo;re the things that prevent the most common
                problems in Microsoft 365 signature management.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Standardize on one HTML template, tested in all clients",
                    detail:
                      "Before rolling out to the entire organization, test your HTML template in Outlook desktop (classic), the new Outlook for Windows, Outlook on the Web, Outlook on iOS, and Gmail (for any users who forward to Gmail). Table-based HTML layouts are more reliable across email clients than modern CSS layouts. Test dark mode rendering too — signatures with white text or light backgrounds can become invisible in dark mode.",
                  },
                  {
                    title: "Keep the template under 10KB",
                    detail:
                      "10KB is the practical limit before you start affecting deliverability. A well-structured table-based HTML signature with an externally hosted logo should come in under 3KB. Avoid embedding images as base64 — this inflates size dramatically. Host your logo and any banners at an HTTPS URL and reference them externally. This also means the image can be updated without touching the signature HTML.",
                  },
                  {
                    title: "Automate onboarding",
                    detail:
                      "New employee setup is the biggest source of signature inconsistency. Build signature provisioning into your onboarding workflow. Whether you use a PowerShell script triggered from your HR system, a scheduled task that runs weekly, or a third-party tool with directory sync, the goal is that a new employee has a correct signature on day one without IT needing to manually intervene. The blog post on email signature onboarding covers the full workflow.",
                  },
                  {
                    title: "Run quarterly audits",
                    detail:
                      "Set a calendar reminder for the first Monday of each quarter: open 10 random employee signatures (check their email footers) and verify they're correct, current, and consistent. Look specifically for employees who have changed roles but still have their old title, employees who have modified their signature layout, and anyone who's still on an outdated template from before your last rebrand. Fix what you find and use it as a signal for whether your current system is working.",
                  },
                  {
                    title: "Populate Active Directory fields before deploying",
                    detail:
                      "Transport rules and PowerShell scripts both pull from Azure AD attributes. If those attributes are empty or inconsistent, your signatures will be too. Before your rollout, audit the Job Title, Business Phone, and Department fields for all users in Azure AD. Fix blanks and inconsistencies at the source. This pays dividends beyond email signatures — these fields are used throughout M365 in Teams profiles, SharePoint, and the directory.",
                  },
                  {
                    title: "Plan for the New Outlook transition",
                    detail:
                      "If you're on classic Outlook today, plan your signature strategy with the new Outlook migration in mind. Build your template and deployment process to work in both environments. Test your approach in both clients before rolling out. Document which employees have migrated so you know which deployment method applies to each person.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-5 border border-slate-200 rounded-xl">
                    <span className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-blue-500" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                <strong>One more thing:</strong> document your signature system. Write down which
                approach you&rsquo;re using, where the master template lives, how to update it, and
                how to provision a new employee. The person who sets this up often isn&rsquo;t the
                person who inherits it 18 months later. Good documentation turns a 2-hour task
                into a 15-minute one.
              </div>
            </section>

            {/* Section 7: NeatStamp */}
            <section id="neatstamp-m365" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp for M365 teams
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                NeatStamp is built for the IT manager who needs consistent M365 signatures
                without maintaining a PowerShell script forever or paying Exclaimer-level
                prices for a 50-person team. Here&rsquo;s what the workflow looks like in practice.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Design your master template in the editor",
                    detail:
                      "Use the NeatStamp editor to build your company signature — logo, brand colors, social links, disclaimer, promotional banner. Brand elements are locked at the template level. Variable fields (name, title, phone, email) are defined as placeholders. The editor exports clean HTML that works in Outlook, Gmail, and Apple Mail.",
                  },
                  {
                    step: "2",
                    title: "Upload employees via CSV",
                    detail:
                      "Export your employee list from Azure AD, your HR system, or the M365 Admin Center and upload it as a CSV. NeatStamp maps your column names to the template fields and generates a personalized signature for each person. A 50-person CSV takes about 2 minutes to process.",
                  },
                  {
                    step: "3",
                    title: "Deploy via the included PowerShell script",
                    detail:
                      "NeatStamp provides a ready-made PowerShell script that sets each employee's signature in Exchange Online (Outlook on the Web) via Set-MailboxMessageConfiguration. You run it once after upload. For classic Outlook desktop, each employee also gets an email with a direct installation link and client-specific instructions.",
                  },
                  {
                    step: "4",
                    title: "Track setup completion from the admin dashboard",
                    detail:
                      "The admin dashboard shows which employees have installed their signature and which haven't. You can send a reminder email to anyone who hasn't completed setup from the dashboard — no manual tracking in a spreadsheet.",
                  },
                  {
                    step: "5",
                    title: "Update the template anytime",
                    detail:
                      "When your branding changes or a new promotional campaign starts, update the master template in the editor. Re-run the PowerShell script to push the update to all mailboxes. The whole process takes under 15 minutes. No individual emails, no chasing employees.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-5 border border-slate-200 rounded-xl">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                NeatStamp uses flat-fee pricing — one price for your whole team, not per
                user. For a 50-person team, this is typically 60–70% cheaper than Exclaimer
                or CodeTwo on an annual basis. The{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing page
                </Link>{" "}
                has the current tier details.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                You can try the editor before committing to a team plan. Build your signature
                template in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  free editor
                </Link>{" "}
                to see exactly how it will look, then upgrade to the team plan when you&rsquo;re
                ready to deploy. Browse the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  signature templates
                </Link>{" "}
                to find a starting point that fits your brand — each template is
                M365-compatible and tested in Outlook.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                For the{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature
                </Link>{" "}
                context — what to include, what to leave out, and how to position your
                signature as a brand asset — that guide covers the design and content
                decisions before you get to the technical deployment.
              </p>
            </section>

            {/* Related Guides */}
            <section id="related-guides" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-5">
                Related guides
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/blog/email-signature-company-wide-management",
                    title: "Company-wide email signature management",
                    desc: "The complete IT guide for centralizing signatures across your whole organization.",
                  },
                  {
                    href: "/blog/email-signature-onboarding-employees",
                    title: "Email signature onboarding for new employees",
                    desc: "How to automate signature setup so every new hire is ready on day one.",
                  },
                  {
                    href: "/blog/outlook-roaming-signatures",
                    title: "Outlook roaming signatures explained",
                    desc: "Current state of M365 cloud-synced signatures, which clients support them, and the gaps.",
                  },
                  {
                    href: "/email-signature-outlook",
                    title: "Outlook email signature setup guide",
                    desc: "Step-by-step setup for the classic Outlook desktop client (Win32).",
                  },
                  {
                    href: "/email-signature-outlook-365",
                    title: "Outlook 365 signature guide",
                    desc: "Setting up signatures in the Outlook on the Web and new Outlook for Windows.",
                  },
                  {
                    href: "/email-signature-for-teams",
                    title: "Email signatures for teams",
                    desc: "Centralized deployment for Microsoft Teams organizations.",
                  },
                  {
                    href: "/outlook-signature-for-company",
                    title: "Company Outlook signature setup",
                    desc: "How to configure a company-standard Outlook signature for all users.",
                  },
                  {
                    href: "/alternative-to-exclaimer",
                    title: "Exclaimer alternatives",
                    desc: "Compare Exclaimer to NeatStamp and other tools for M365 signature management.",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 text-sm mb-1">{link.title}</p>
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
                  <details key={faq.q} className="group border border-slate-200 rounded-xl">
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
                Deploy M365 signatures in under 2 hours
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp Teams includes a master template builder, CSV upload, a ready-made
                PowerShell deployment script, and a compliance dashboard. Flat-fee pricing
                — not per user.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Try the free editor
                </Link>
                <Link
                  href="/email-signature-for-teams"
                  className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  See NeatStamp Teams
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
