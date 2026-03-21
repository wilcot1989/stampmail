import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Signature Deployment Guide for M365 Teams",
  description:
    "Every method to deploy signatures in Outlook 365: Exchange transport rules, PowerShell, Group Policy, Intune, and third-party tools. With actual code.",
  alternates: {
    canonical: "https://neatstamp.com/blog/outlook-signature-deployment-guide",
  },
};

const faqs = [
  {
    q: "What is the fastest way to deploy signatures to all Outlook 365 users?",
    a: "Exchange transport rules are the fastest to set up — you can have a server-side signature appending to all outbound emails in under 10 minutes. The limitation is that users never see the signature in their compose window. If you need users to see their signature while writing, a PowerShell script via Set-MailboxMessageConfiguration is the next fastest option, taking around 30 minutes for a team of 50.",
  },
  {
    q: "Can I deploy different signatures to different departments in Microsoft 365?",
    a: "Yes. Exchange transport rules support conditions, so you can apply different rules based on department, group membership, or any attribute in Azure AD. With PowerShell, you can loop through a CSV filtered by department and apply different HTML templates. Both approaches let you give Sales a signature with a promotional banner while Legal gets a signature with specific compliance text.",
  },
  {
    q: "Does the PowerShell Set-MailboxMessageConfiguration method work on mobile?",
    a: "No. Set-MailboxMessageConfiguration sets the signature in the Outlook desktop and web clients, but it does not apply to Outlook Mobile on iOS or Android. For mobile, the only reliable approaches are Exchange transport rules (which add the signature server-side, so they work on any device) or a third-party tool that handles mobile separately.",
  },
  {
    q: "Will Group Policy work for users on the new Outlook for Windows?",
    a: "No. Group Policy registry keys for signatures (under HKCU\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings) only work with classic Outlook. The new Outlook for Windows uses a web-based architecture that ignores these registry settings entirely. For the new Outlook, use Exchange transport rules, PowerShell, or a third-party tool.",
  },
  {
    q: "How do I use Active Directory attributes in Exchange transport rules?",
    a: "In the HTML you add to your transport rule disclaimer, use Active Directory property tokens wrapped in double percent signs: %%DisplayName%%, %%Title%%, %%PhoneNumber%%, %%Department%%, %%Company%%, %%City%%, %%StateOrProvince%%, and %%CountryOrRegion%%. Exchange resolves these at send time using the sender's Azure AD attributes. If an attribute is empty, the token is replaced with an empty string.",
  },
  {
    q: "What happens if an employee's Azure AD profile doesn't have a phone number?",
    a: "If the Azure AD attribute is empty, the %%PhoneNumber%% token renders as an empty string. This means you get a blank line in the signature where the phone number should be. To avoid this, wrap phone lines in conditional logic — which transport rules don't support natively. A PowerShell script with conditional checks, or a third-party tool, handles missing fields more gracefully by hiding the entire line if the field is empty.",
  },
  {
    q: "How do I verify that a deployed signature is working correctly?",
    a: "Send a test email from the affected mailbox to an external address you control (not another mailbox in your tenant — internal emails may bypass transport rules). Check the received email in the raw source view to confirm the HTML is present and the variables resolved correctly. For PowerShell-deployed signatures, log into Outlook on the Web for the test mailbox and check Settings → Mail → Compose and reply to see the installed signature.",
  },
  {
    q: "What should I do if the HTML signature renders badly in Outlook?",
    a: "Outlook (both desktop and 365) uses the Word rendering engine for HTML, which strips many CSS properties including margin, padding on certain elements, CSS classes, and background images. Build your HTML signature using table-based layout rather than div/flexbox. Use inline styles only. Avoid background-image. Use only web-safe fonts or include fallbacks. Test specifically in Outlook by sending to a test account — what looks fine in Gmail may render differently in Outlook.",
  },
];

const psAllUsersScript = [
  '$signatureHTML = @"',
  '<table cellpadding="0" cellspacing="0" border="0"',
  '  style="font-family:Arial,sans-serif;font-size:13px;color:#333;">',
  "  <tr>",
  '    <td style="padding-right:16px;">',
  '      <img src="https://yourdomain.com/logo.png"',
  '           width="120" alt="Logo" />',
  "    </td>",
  '    <td style="border-left:1px solid #e2e8f0;padding-left:16px;">',
  "      <strong>EMPLOYEE_NAME</strong><br/>",
  '      <span style="color:#64748b;">EMPLOYEE_TITLE</span><br/>',
  '      <a href="tel:EMPLOYEE_PHONE"',
  '         style="color:#2563EB;">EMPLOYEE_PHONE</a>',
  "    </td>",
  "  </tr>",
  "</table>",
  '"@',
  "",
  "# Get all user mailboxes and apply the signature",
  "Get-Mailbox -ResultSize Unlimited -RecipientTypeDetails UserMailbox |",
  "  ForEach-Object {",
  "    Set-MailboxMessageConfiguration -Identity $_.UserPrincipalName `",
  "      -SignatureHTML $signatureHTML `",
  "      -AutoAddSignature $true `",
  "      -AutoAddSignatureOnReply $false",
  '    Write-Host "Set signature for $($_.UserPrincipalName)"',
  "  }",
].join("\n");

const psDeptScript = [
  "# Define signatures per department",
  '$sigSales = "<table><!-- Sales signature HTML --></table>"',
  '$sigLegal = "<table><!-- Legal signature with compliance text --></table>"',
  '$sigDefault = "<table><!-- Default company signature --></table>"',
  "",
  "Get-Mailbox -ResultSize Unlimited -RecipientTypeDetails UserMailbox |",
  "  ForEach-Object {",
  "    $mbx = $_",
  "    # Get department from Azure AD",
  "    $user = Get-User -Identity $mbx.UserPrincipalName",
  "    $sig = switch ($user.Department) {",
  '      "Sales"  { $sigSales }',
  '      "Legal"  { $sigLegal }',
  "      default  { $sigDefault }",
  "    }",
  "    Set-MailboxMessageConfiguration -Identity $mbx.UserPrincipalName `",
  "      -SignatureHTML $sig `",
  "      -AutoAddSignature $true `",
  "      -AutoAddSignatureOnReply $false",
  '    Write-Host "$($mbx.UserPrincipalName) -> $($user.Department)"',
  "  }",
].join("\n");

const psCsvScript = [
  "# employees.csv columns:",
  "# email,display_name,title,phone,department",
  "",
  '$employees = Import-Csv -Path "C:\\signatures\\employees.csv"',
  "",
  "foreach ($emp in $employees) {",
  "",
  "  # Build conditional phone line",
  "  $phoneLine = if ($emp.phone) {",
  "    \"<a href='tel:$($emp.phone)'",
  "       style='color:#2563EB;text-decoration:none;'>$($emp.phone)</a>\"",
  '  } else { "" }',
  "",
  '  $html = @"',
  '<table cellpadding="0" cellspacing="0" border="0"',
  '  style="font-family:Arial,sans-serif;font-size:13px;',
  '         color:#333333;border-top:3px solid #2563EB;',
  '         padding-top:12px;margin-top:16px;">',
  "  <tr>",
  '    <td style="padding-right:16px;vertical-align:top;">',
  '      <img src="https://yourdomain.com/logo.png"',
  '           width="120" height="40" alt="Logo" />',
  "    </td>",
  '    <td style="border-left:1px solid #e2e8f0;',
  '               padding-left:16px;vertical-align:top;">',
  '      <strong style="font-size:14px;color:#1e293b;">',
  "        $($emp.display_name)",
  "      </strong><br/>",
  '      <span style="color:#64748b;">$($emp.title)</span><br/>',
  '      <span style="color:#64748b;">Your Company Ltd</span><br/>',
  "      $phoneLine",
  "    </td>",
  "  </tr>",
  "  <tr>",
  '    <td colspan="2"',
  '        style="padding-top:10px;font-size:11px;color:#94a3b8;">',
  "      This email is confidential. If received in error,",
  "      please delete and notify the sender.",
  "    </td>",
  "  </tr>",
  "</table>",
  '"@',
  "",
  "  try {",
  "    Set-MailboxMessageConfiguration `",
  "      -Identity $emp.email `",
  "      -SignatureHTML $html `",
  "      -AutoAddSignature $true `",
  "      -AutoAddSignatureOnReply $false",
  '    Write-Host "OK: $($emp.email)"',
  "  } catch {",
  '    Write-Warning "FAILED: $($emp.email) — $_"',
  "  }",
  "}",
  "",
  'Write-Host "Done. $($employees.Count) mailboxes processed."',
  "Disconnect-ExchangeOnline -Confirm:$false",
].join("\n");

export default function OutlookSignatureDeploymentGuidePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook Signature Deployment Guide",
            url: "https://neatstamp.com/blog/outlook-signature-deployment-guide",
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
            <span className="text-slate-700">Outlook Signature Deployment Guide</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  IT Guide
                </span>
                <span className="text-sm text-slate-400">18 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook Signature Deployment Guide for Microsoft 365
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                You&rsquo;ve got a new company signature. Now you need to get it into 50 mailboxes.
                Here&rsquo;s every method available, with actual code and step-by-step instructions
                — Exchange transport rules, PowerShell scripts, Group Policy, Intune, and
                what a third-party tool adds on top. Pick the method that fits your
                environment and follow it through to verification.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 18 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                {[
                  ["#method-1-transport-rules", "Method 1: Exchange Transport Rules"],
                  ["#method-2-powershell", "Method 2: PowerShell Set-MailboxMessageConfiguration"],
                  ["#method-3-group-policy", "Method 3: Group Policy for Classic Outlook"],
                  ["#method-4-intune", "Method 4: Intune for Managed Devices"],
                  ["#method-5-third-party", "Method 5: Third-party tools"],
                  ["#comparison-table", "Comparison: all 5 methods"],
                  ["#verification", "Post-deployment: verifying signatures work"],
                  ["#troubleshooting", "Troubleshooting common issues"],
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

            {/* Method 1: Exchange Transport Rules */}
            <section id="method-1-transport-rules" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Method 1: Exchange Transport Rules
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Exchange transport rules (called mail flow rules in the Exchange Admin Center)
                let you inject a signature at the server level — after the email is sent and
                before it reaches the recipient. This is the most reliable method for
                guaranteed delivery across all devices, because the signature is applied
                server-side regardless of what client or device the sender used. Outlook
                Mobile, Apple Mail, a web browser — it doesn&rsquo;t matter. The signature
                gets appended.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-2">When to use this method</h3>
              <ul className="space-y-2 text-slate-600 mb-6">
                {[
                  "You need signatures on emails sent from mobile devices — this is the only built-in Microsoft method that covers mobile.",
                  "Compliance is a priority and you cannot rely on users to set up their own signatures.",
                  "You have a small IT team and want a set-it-and-forget-it approach.",
                  "Your signature doesn't need to be visible to users while they're composing (they won't see it until after sending).",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Step-by-step in Exchange Admin Center
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  { step: "1", text: "Go to admin.exchange.microsoft.com and sign in as an Exchange admin." },
                  { step: "2", text: "In the left sidebar, select Mail flow → Rules." },
                  { step: "3", text: "Click Add a rule → Apply disclaimers." },
                  { step: "4", text: "Name the rule (e.g. \"Company email signature — outbound\")." },
                  { step: "5", text: "Under Apply this rule if, select The sender is located → Inside the organization." },
                  { step: "6", text: "Under Do the following, select Append the disclaimer → Enter text. Paste your HTML signature into the text box. Set Fallback action to Wrap." },
                  { step: "7", text: "If you want the signature only on external emails, add an exception: The recipient is located → Inside the organization." },
                  { step: "8", text: "Set Priority to 0 if this should run before other rules. Save the rule." },
                  { step: "9", text: "Test by sending an email from an affected mailbox to an external address and checking the raw source of the received message." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed pt-0.5">{item.text}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                HTML template with Active Directory placeholders
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Exchange resolves Active Directory attribute tokens at send time. Use this
                template as a starting point — paste it into the disclaimer text box in the
                admin center:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-4 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed whitespace-pre">{`<table cellpadding="0" cellspacing="0" border="0"
  style="font-family: Arial, sans-serif; font-size: 13px;
         color: #333333; border-top: 3px solid #2563EB;
         padding-top: 12px; margin-top: 16px;">
  <tr>
    <td style="padding-right: 16px; vertical-align: top;">
      <img src="https://yourdomain.com/logo.png"
           width="120" height="40"
           alt="Company logo"
           style="display: block;" />
    </td>
    <td style="border-left: 1px solid #e2e8f0;
               padding-left: 16px; vertical-align: top;">
      <strong style="font-size: 14px; color: #1e293b;">
        %%DisplayName%%
      </strong><br/>
      <span style="color: #64748b;">%%Title%%</span><br/>
      <span style="color: #64748b;">%%Company%%</span><br/>
      <a href="tel:%%PhoneNumber%%"
         style="color: #2563EB; text-decoration: none;">
        %%PhoneNumber%%
      </a>
    </td>
  </tr>
  <tr>
    <td colspan="2"
        style="padding-top: 10px; font-size: 11px;
               color: #94a3b8;">
      This email and any attachments are confidential.
      If you are not the intended recipient, please delete
      this message and notify the sender immediately.
    </td>
  </tr>
</table>`}</pre>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Available Active Directory tokens:{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%%DisplayName%%</code>,{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%%Title%%</code>,{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%%PhoneNumber%%</code>,{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%%Department%%</code>,{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%%Company%%</code>,{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%%City%%</code>,{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%%StateOrProvince%%</code>,{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%%CountryOrRegion%%</code>.
                These are resolved from the sender&rsquo;s Azure AD profile at the time the email is sent.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-2">Limitations to know before choosing this method</p>
                <ul className="space-y-1.5">
                  {[
                    "Applies to all emails including internal — you need an exception condition to exclude internal messages.",
                    "No per-user customization beyond what's in Azure AD. Everyone gets the same template with their AD attributes filled in.",
                    "The signature is appended at the bottom of the entire email thread on replies, not at the cursor position.",
                    "If an AD attribute is empty (e.g. the user has no phone number), you get an empty line or a bare HTML element — no conditional logic.",
                    "Exchange strips some CSS. Avoid margin, padding shorthand, CSS classes, and background-image.",
                    "Users never see the signature in their compose window — only in sent items after the fact.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-amber-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Method 2: PowerShell */}
            <section id="method-2-powershell" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Method 2: PowerShell Set-MailboxMessageConfiguration
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">Set-MailboxMessageConfiguration</code>{" "}
                cmdlet lets you set the signature that appears in the Outlook compose window
                for any mailbox in your tenant. Unlike transport rules, users see their
                signature while composing. Unlike Group Policy, this works for Outlook on
                the Web (OWA) as well as desktop Outlook.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                This is the right method when you want users to see their signature in the
                compose window, you have per-user variation (different departments, different
                signatures), and you&rsquo;re comfortable running PowerShell scripts with Exchange
                Online credentials. For a broader look at managing signatures in Microsoft 365,
                see the{" "}
                <Link href="/blog/microsoft-365-email-signature-management" className="text-blue-600 hover:underline">
                  Microsoft 365 email signature management guide
                </Link>
                .
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Connect to Exchange Online
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Install the Exchange Online PowerShell module if you haven&rsquo;t already, then connect:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">{`# Install the module (run once, as administrator)
Install-Module -Name ExchangeOnlineManagement -Force -AllowClobber

# Connect — this opens a browser login window
Connect-ExchangeOnline -UserPrincipalName admin@yourdomain.com

# Verify the connection
Get-OrganizationConfig | Select-Object DisplayName`}</pre>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Set the same signature for all users
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                This script sets an HTML signature for every mailbox in your tenant. Replace
                the HTML string with your actual signature code:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">{psAllUsersScript}</pre>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Per-department signatures
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                To apply different signatures by department, get the department attribute
                from Azure AD and switch on it:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">{psDeptScript}</pre>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Full script with CSV input
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                For the most control, generate personalized HTML for each user from a CSV
                of employee data. The CSV should have columns:{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">email, display_name, title, phone, department</code>.
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">{psCsvScript}</pre>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-blue-800 mb-2">Important notes</p>
                <ul className="space-y-1.5">
                  {[
                    "AutoAddSignature $true sets the signature for new emails. AutoAddSignatureOnReply $false prevents it appending on every reply in a thread — set to $true if your policy requires signatures on replies.",
                    "This method does not work for mobile (Outlook iOS/Android). For mobile, combine with an Exchange transport rule.",
                    "The signature is set in the mailbox configuration — if the user manually changes their signature in Outlook, your setting is overwritten. Re-run the script periodically (e.g. via a scheduled task) to enforce the corporate signature.",
                    "You need Exchange Administrator or Global Administrator permissions to run Set-MailboxMessageConfiguration on other users' mailboxes.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-blue-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Method 3: Group Policy */}
            <section id="method-3-group-policy" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Method 3: Group Policy for Classic Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If your organization runs classic Outlook (2016, 2019, or the LTSC version)
                on domain-joined Windows PCs, you can deploy signatures via Group Policy.
                GPO sets registry keys that Outlook reads on startup. The signature appears
                in the Outlook compose window.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                This method has a hard requirement: domain-joined PCs with classic Outlook
                installed. It does not work on the new Outlook for Windows, Outlook on the
                Web, or any non-Windows device. If your team is a mix of old and new Outlook,
                you need a secondary method for everyone not covered by GPO. For more on
                managing{" "}
                <Link href="/outlook-signature-for-company" className="text-blue-600 hover:underline">
                  Outlook signatures for a whole company
                </Link>
                , including non-domain scenarios, that guide covers the full picture.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Registry keys Outlook reads for signatures
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Outlook 2016 and later reads signature settings from:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">{`HKCU\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings

Key: NewSignature
Type: REG_SZ
Value: Name of the signature (must match a .htm file in the signatures folder)

Key: ReplySignature
Type: REG_SZ
Value: Name of the signature for replies (can be the same or different)

Key: SignaturePickerForced
Type: REG_DWORD
Value: 1 (prevents users from switching to a different signature)`}</pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-5">
                The signature file itself (the .htm file) needs to be placed in the user&rsquo;s
                Outlook signatures folder:{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  %APPDATA%\Microsoft\Signatures\
                </code>
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">GPO setup steps</h3>
              <div className="space-y-3 mb-6">
                {[
                  { step: "1", text: "Open Group Policy Management Console (gpmc.msc) on a domain controller or management PC." },
                  { step: "2", text: "Create or edit a GPO linked to the OU containing your users (not computers — signatures are per-user settings)." },
                  { step: "3", text: "Navigate to User Configuration → Preferences → Windows Settings → Files. Add a file action to copy the .htm signature file from a network share (\\\\server\\signatures\\company-signature.htm) to %APPDATA%\\Microsoft\\Signatures\\CompanySignature.htm on each user's machine." },
                  { step: "4", text: "Navigate to User Configuration → Preferences → Windows Settings → Registry. Add registry items for NewSignature (REG_SZ, value: CompanySignature) and ReplySignature (REG_SZ, value: CompanySignature)." },
                  { step: "5", text: "Under Common tab for each preference item, enable Apply once and do not reapply if you want users to be able to change their signature after initial setup, or leave it unchecked to re-apply on every Group Policy refresh." },
                  { step: "6", text: "Run gpupdate /force on a test machine and open Outlook to verify the signature appears in the compose window." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed pt-0.5">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-amber-800 mb-1">Limitation: classic Outlook only</p>
                <p className="text-sm text-amber-700">
                  These registry keys are ignored by the new Outlook for Windows and by
                  Outlook on the Web. If any of your users have switched to the new Outlook
                  experience (the toggle in the top-right corner of classic Outlook), GPO
                  signatures will stop working for them. You need to supplement with the
                  PowerShell method or a third-party tool. Also, GPO cannot personalize
                  signatures per user without scripting — the same .htm file applies to
                  everyone unless you build per-user file distribution logic using item-level
                  targeting in Group Policy Preferences.
                </p>
              </div>
            </section>

            {/* Method 4: Intune */}
            <section id="method-4-intune" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Method 4: Intune for Managed Devices
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you use Microsoft Intune to manage your Windows devices, you can deploy
                signatures via a PowerShell script that runs on each managed endpoint. This
                works for both classic Outlook and the new Outlook for Windows, and doesn&rsquo;t
                require domain membership — making it the right choice for hybrid or
                cloud-only organizations.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Deploying a PowerShell script via Intune
              </h3>
              <div className="space-y-3 mb-5">
                {[
                  { step: "1", text: "Go to intune.microsoft.com → Devices → Scripts and remediations → Platform scripts." },
                  { step: "2", text: "Click Add → Windows 10 and later. Give it a name (e.g. \"Deploy Outlook Signature\")." },
                  { step: "3", text: "Upload your PowerShell script. The script should write the signature .htm file to %APPDATA%\\Microsoft\\Signatures\\ and set the registry keys (for classic Outlook) or call Set-MailboxMessageConfiguration via Exchange Online PowerShell if you want to target OWA as well." },
                  { step: "4", text: "Set Run this script using the logged on credentials to Yes — signatures are per-user and need to be written to the user's profile, not the system profile." },
                  { step: "5", text: "Assign the script to the user group or device group you want to target." },
                  { step: "6", text: "Monitor deployment status under Devices → Monitor → Script deployment status." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed pt-0.5">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Pros</p>
                  <ul className="space-y-1.5">
                    {[
                      "Works without domain join — ideal for cloud-only M365 tenants.",
                      "Targets specific user groups or devices with Intune assignment.",
                      "Runs automatically on new device enrollments.",
                      "Can combine registry keys (for classic Outlook) and Exchange cmdlets in one script.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-green-700">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-red-700 mb-2">Cons</p>
                  <ul className="space-y-1.5">
                    {[
                      "Script runs on device — if the user is not logged in, it doesn't run.",
                      "Signature updates require a new script version and re-deployment.",
                      "Requires Intune P1 or P2 license — not available on basic M365 plans.",
                      "Still doesn't cover mobile (Outlook iOS/Android) without pairing with a transport rule.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-red-600">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                For organizations running Intune-managed devices, combining Intune script
                deployment with an Exchange transport rule gives you the broadest coverage:
                desktop users see the signature in their compose window, and mobile users get
                it appended server-side. The{" "}
                <Link href="/outlook-mobile-signature" className="text-blue-600 hover:underline">
                  Outlook Mobile signature guide
                </Link>{" "}
                covers the mobile side in detail.
              </p>
            </section>

            {/* Method 5: Third-party tools */}
            <section id="method-5-third-party" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Method 5: Third-party tools
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The native Microsoft methods each have gaps: transport rules work on mobile
                but users can&rsquo;t see their signature in compose; PowerShell gives compose-window
                visibility but needs re-running when things change; Group Policy is desktop-only;
                Intune requires a specific license tier and per-deployment script updates.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Third-party tools are built to fill those gaps without requiring you to
                chain multiple methods together. They typically provide a no-code template
                editor, directory sync (Azure AD, Google Workspace, or CSV), and a deployment
                layer that handles different clients.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                NeatStamp: master template + deployment script
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp&rsquo;s workflow for Outlook 365 deployment works like this: you build
                the master template in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  signature editor
                </Link>{" "}
                — logo, colors, social links, promotional banners, and the legal disclaimer
                are set centrally and locked. Variable fields (name, title, phone) are marked
                as employee-fillable or pulled from your directory.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Once the template is ready, you upload your team via CSV or sync with Azure AD.
                NeatStamp generates a personalized signature for each user and provides two
                deployment paths:
              </p>
              <ul className="space-y-2 text-slate-600 mb-5">
                {[
                  "Self-service: each employee gets an email with a personal link to their signature setup page, with step-by-step instructions specific to their Outlook version. See the full Outlook 365 setup steps in the email signature Outlook 365 guide.",
                  "Admin-push via PowerShell: NeatStamp generates a ready-to-run PowerShell script that calls Set-MailboxMessageConfiguration for each user in your team. You run it once with Exchange admin credentials. No scripting required on your part.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you update the master template — new logo, new banner, new legal text
                — you re-generate the signatures and re-run the deployment script. The whole
                cycle takes about 5 minutes rather than the 2-4 hours a manual update
                typically requires. For organizations that want a comparison with enterprise
                alternatives, the{" "}
                <Link href="/alternative-to-exclaimer" className="text-blue-600 hover:underline">
                  Exclaimer alternative page
                </Link>{" "}
                and{" "}
                <Link href="/alternative-to-codetwo" className="text-blue-600 hover:underline">
                  CodeTwo alternative page
                </Link>{" "}
                break down the feature and pricing differences.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For Teams users, the{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  Teams plan
                </Link>{" "}
                covers multi-user signature management with an admin dashboard showing
                who has installed their signature and who hasn&rsquo;t. The{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing page
                </Link>{" "}
                has details on per-seat costs for different team sizes.
              </p>
            </section>

            {/* Comparison Table */}
            <section id="comparison-table" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Comparison: all 5 deployment methods
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Each method fits a different situation. Here&rsquo;s how they stack up across the
                factors that matter most for IT deployments:
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700 min-w-[140px]">Method</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Ease of setup</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Per-user control</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Mobile support</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Visible in compose</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Cost</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Maintenance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        method: "Exchange Transport Rules",
                        ease: "Easy",
                        control: "AD attributes only",
                        mobile: "Yes",
                        compose: "No",
                        cost: "Free",
                        maintenance: "Low",
                      },
                      {
                        method: "PowerShell (Set-MailboxMessageConfiguration)",
                        ease: "Moderate",
                        control: "Full per-user HTML",
                        mobile: "No",
                        compose: "Yes",
                        cost: "Free",
                        maintenance: "Moderate (re-run to update)",
                      },
                      {
                        method: "Group Policy",
                        ease: "Moderate",
                        control: "Limited (same file for all)",
                        mobile: "No",
                        compose: "Yes (classic Outlook)",
                        cost: "Free",
                        maintenance: "Moderate (update share file)",
                      },
                      {
                        method: "Intune Script",
                        ease: "Moderate",
                        control: "Full (scripted per-user)",
                        mobile: "No",
                        compose: "Yes",
                        cost: "Requires Intune license",
                        maintenance: "Moderate (re-deploy script)",
                      },
                      {
                        method: "Third-party (NeatStamp)",
                        ease: "Easy",
                        control: "Full — template + directory sync",
                        mobile: "Via transport rule pairing",
                        compose: "Yes",
                        cost: "Subscription",
                        maintenance: "Low (template update = done)",
                      },
                    ].map((row) => (
                      <tr key={row.method} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium text-slate-800">{row.method}</td>
                        <td className="py-3 px-4 text-slate-600">{row.ease}</td>
                        <td className="py-3 px-4 text-slate-600">{row.control}</td>
                        <td className="py-3 px-4 text-slate-600">{row.mobile}</td>
                        <td className="py-3 px-4 text-slate-600">{row.compose}</td>
                        <td className="py-3 px-4 text-slate-600">{row.cost}</td>
                        <td className="py-3 px-4 text-slate-600">{row.maintenance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-slate-600 leading-relaxed">
                For most organizations under 200 people, the PowerShell method or a
                third-party tool gives the best balance of control and maintainability.
                Transport rules are a solid addition for mobile coverage regardless of
                which primary method you choose.
              </p>
            </section>

            {/* Post-deployment verification */}
            <section id="verification" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Post-deployment: how to verify signatures are working
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Don&rsquo;t assume deployment worked — verify it. Each method has a slightly
                different verification approach.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                For Exchange transport rules
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Send a test email from an affected mailbox to an external address. Check
                the received email in its raw form (in Gmail: three-dot menu → Show original;
                in Outlook: File → Properties → Internet headers). Look for your HTML
                signature in the message body. Confirm the AD attribute tokens have been
                replaced with actual values.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                Common mistake: sending to a mailbox in the same tenant. Internal emails
                may bypass external-only transport rules. Always test with an external address.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                For PowerShell-deployed signatures
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Log into Outlook on the Web (outlook.office.com) using the affected user&rsquo;s
                credentials (or impersonate via Exchange admin). Go to Settings → Mail →
                Compose and reply. You should see the signature in the signature field.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">
                For desktop Outlook, open the Outlook client and go to File → Options →
                Mail → Signatures. The signature should be listed there. Compose a new
                email and confirm it auto-inserts.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                To verify all users at once using PowerShell:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">{`# Check signature status for all user mailboxes
Get-Mailbox -ResultSize Unlimited -RecipientTypeDetails UserMailbox |
  Get-MailboxMessageConfiguration |
  Select-Object Identity, AutoAddSignature, SignatureHTML |
  Export-Csv -Path "C:\signatures\verification-report.csv" -NoTypeInformation

# Quick summary count
$results = Get-Mailbox -ResultSize Unlimited -RecipientTypeDetails UserMailbox |
  Get-MailboxMessageConfiguration
$withSig = $results | Where-Object { $_.SignatureHTML -ne $null -and $_.SignatureHTML -ne "" }
Write-Host "$($withSig.Count) of $($results.Count) mailboxes have a signature set"`}</pre>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                For Group Policy deployments
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                On a test machine, run{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">gpupdate /force</code>{" "}
                in Command Prompt, then open Outlook. Check File → Options → Mail → Signatures.
                If the signature doesn&rsquo;t appear, verify the .htm file was copied to{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">%APPDATA%\Microsoft\Signatures\</code>{" "}
                and the registry keys are set using{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">reg query HKCU\Software\Microsoft\Office\16.0\Common\MailSettings</code>.
              </p>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Troubleshooting common issues
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These are the problems that come up most often after deploying signatures in
                Microsoft 365, with the specific fix for each.
              </p>

              <div className="space-y-5">
                {[
                  {
                    problem: "Signature not applying after PowerShell script",
                    details: [
                      "Check the script output for errors. Set-MailboxMessageConfiguration fails silently if it can't find the mailbox identity — make sure you're passing the UserPrincipalName, not just the display name.",
                      "Verify the cmdlet ran successfully by checking the mailbox: Get-MailboxMessageConfiguration -Identity user@domain.com | Select SignatureHTML",
                      "If OWA doesn't show the signature, try logging out and back in. OWA caches settings and may not pick up the change immediately.",
                      "For desktop Outlook: close Outlook completely, open it again. On first open after a signature change, Outlook re-syncs settings from the server.",
                    ],
                  },
                  {
                    problem: "Transport rule variables showing as %%DisplayName%% (not resolved)",
                    details: [
                      "This happens when the Azure AD attribute is empty. Go to Microsoft 365 Admin Center → Users → select the user → Edit contact information. Fill in the Display Name, Job Title, and Phone Number fields.",
                      "Changes to Azure AD attributes can take up to 15 minutes to propagate to Exchange. Wait and re-test.",
                      "If the attribute is populated but still not resolving, confirm the token syntax is exact — it's %%DisplayName%% with double percent signs, not single.",
                    ],
                  },
                  {
                    problem: "HTML signature rendering badly in Outlook",
                    details: [
                      "Outlook uses the Word HTML rendering engine, which strips many CSS properties. Use table-based layout instead of divs. Use only inline styles — no style blocks or CSS classes.",
                      "Avoid: margin, padding on <p> tags, background-image, border-radius, CSS flexbox, CSS grid, most shorthand properties. These are stripped or mishandled.",
                      "Use: inline style attributes, cellpadding/cellspacing on tables, font-family and font-size as inline styles, direct px or pt measurements.",
                      "Test by actually sending the email to an Outlook recipient. Do not rely on browser previews — Outlook renders HTML differently from any browser.",
                    ],
                  },
                  {
                    problem: "Signature appearing twice in emails",
                    details: [
                      "This usually means both a transport rule and a client-side signature are active for the same user. The user's Outlook client inserts the signature at compose time, and the transport rule appends another one at the server.",
                      "Fix: if using transport rules, disable the signature in the client (set AutoAddSignature to $false in the PowerShell script, or instruct users to set their signature to 'none' in Outlook settings).",
                      "Alternatively, add a condition to the transport rule: except when the message header contains X-NeatStamp-Signed or similar — then set that header in your client-side signature. This prevents double-appending.",
                    ],
                  },
                  {
                    problem: "Signature not showing on mobile (Outlook iOS/Android)",
                    details: [
                      "Set-MailboxMessageConfiguration and Group Policy do not control the mobile app. Outlook Mobile has its own signature settings.",
                      "The only way to enforce a corporate signature on Outlook Mobile without the user manually setting it is Exchange transport rules (server-side injection). Add a transport rule with a condition to catch mail from mobile clients, or simply apply it to all outbound messages.",
                      "Some organizations use Intune app configuration policies for Outlook Mobile, which can push a default signature via managed app config. This requires Intune App Protection Policies and an Intune license.",
                    ],
                  },
                ].map((item) => (
                  <details key={item.problem} className="group border border-slate-200 rounded-xl">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                      {item.problem}
                      <svg
                        className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>
                    <ul className="px-5 pb-5 space-y-2.5">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>

            {/* Related guides */}
            <section id="related-guides" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-5">Related guides</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/email-signature-outlook",
                    title: "Email signature setup in Outlook",
                    desc: "Step-by-step for classic Outlook desktop, new Outlook, and OWA.",
                  },
                  {
                    href: "/email-signature-outlook-365",
                    title: "Outlook 365 signature guide",
                    desc: "Specific setup steps for the web-based Outlook 365 experience.",
                  },
                  {
                    href: "/blog/microsoft-365-email-signature-management",
                    title: "Microsoft 365 signature management",
                    desc: "Broader overview of all M365 signature tools and admin options.",
                  },
                  {
                    href: "/blog/email-signature-company-wide-management",
                    title: "Company-wide signature management",
                    desc: "Multi-platform guide covering Google Workspace and M365.",
                  },
                  {
                    href: "/blog/outlook-roaming-signatures",
                    title: "Outlook roaming signatures",
                    desc: "How to use Microsoft's cloud-sync feature for Outlook signatures.",
                  },
                  {
                    href: "/outlook-signature-for-company",
                    title: "Outlook signatures for a company",
                    desc: "Options for getting all employees onto a consistent signature.",
                  },
                  {
                    href: "/outlook-mobile-signature",
                    title: "Outlook Mobile signature guide",
                    desc: "How to control signatures on Outlook iOS and Android.",
                  },
                  {
                    href: "/email-signature-for-teams",
                    title: "NeatStamp for teams",
                    desc: "Centralized deployment with a master template and compliance dashboard.",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 mb-1">
                      {link.title}
                    </p>
                    <p className="text-xs text-slate-500">{link.desc}</p>
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Skip the scripting — deploy in 30 minutes
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates the PowerShell script for you. Build your master template,
                upload your team via CSV, and get a ready-to-run deployment script for Outlook 365.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Build your template free
                </Link>
                <Link
                  href="/templates"
                  className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Browse signature templates
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
