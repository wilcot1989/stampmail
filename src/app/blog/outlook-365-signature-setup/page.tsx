import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook 365 Signature Setup: Complete Guide (2026)",
  description:
    "Outlook 365 signature setup step by step — classic desktop, new Outlook, OWA, mobile, and org-wide admin deployment. Includes PowerShell scripts.",
  alternates: {
    canonical: "https://neatstamp.com/blog/outlook-365-signature-setup",
  },
};

const faqs = [
  {
    q: "What's the difference between classic Outlook and new Outlook for signatures?",
    a: "Classic Outlook (the traditional .exe desktop app) stores signatures as local files in %AppData%\\Microsoft\\Signatures. New Outlook (the web-based version Microsoft has been rolling out since 2024) stores signatures in the cloud via Microsoft 365. The two systems don't sync — you have to set up your signature separately in each client.",
  },
  {
    q: "Why does my Outlook 365 signature look different in Gmail or OWA than it does in classic Outlook?",
    a: "Classic Outlook uses a Word-based HTML renderer that interprets CSS differently than modern browsers. Signatures that look fine in Outlook's desktop app may render differently in Outlook Web Access or other mail clients. To fix this, use table-based layout with inline styles only — no flexbox, no CSS classes, no external stylesheets.",
  },
  {
    q: "Can I use the same signature in both classic Outlook and new Outlook?",
    a: "Yes, but you have to set it up manually in both. The HTML signature you create will work in either client — just paste it into the signatures editor in classic Outlook (File → Options → Mail → Signatures) and separately into new Outlook (Settings → Accounts → Signatures). The same HTML renders correctly in both.",
  },
  {
    q: "How do I add a company logo to my Outlook 365 signature?",
    a: "Host the logo image on your company website or a CDN with a public https:// URL. Then reference it in your signature HTML with an <img> tag using that absolute URL. Never embed images as base64 — classic Outlook converts them to file attachments. Once the image is hosted externally, it loads correctly in all versions of Outlook.",
  },
  {
    q: "How do I deploy the same signature to everyone in my Microsoft 365 organization?",
    a: "You have two main options: Exchange transport rules (server-side injection that appends a signature to outgoing emails regardless of client) or distributing a signature HTML file to each user. Transport rules work for every client automatically, but users can't see the signature while composing. Distributing HTML is simpler and gives users control. For fully automated per-user deployment with variables like {DisplayName}, use PowerShell with the Set-MailboxMessageConfiguration cmdlet.",
  },
  {
    q: "Does Outlook mobile sync my signature from desktop?",
    a: "No. Outlook on iOS and Android has its own separate signature settings. Go to the Outlook mobile app, tap your profile picture, then Settings → Signature. The mobile signature is plain text only — no HTML, no images, no formatting. You have to set it up separately from your desktop signature.",
  },
  {
    q: "Why is my Outlook 365 signature not saving?",
    a: "The most common causes are: a Group Policy set by your IT admin that locks signature settings, a permissions issue with the %AppData%\\Microsoft\\Signatures folder, or a conflict caused by roaming signatures. Check if your company has a managed signature policy. If the folder permissions are the issue, you can fix them via the Security tab in File Explorer. See the full Outlook signature not saving guide for step-by-step fixes.",
  },
  {
    q: "What's the fastest way to get a professional Outlook 365 signature without HTML knowledge?",
    a: "Use NeatStamp's free signature editor. You fill in your details, pick a layout, and NeatStamp generates Outlook-compatible HTML automatically. Copy it, open Outlook → File → Options → Mail → Signatures → New, paste into the editor using Insert HTML or the right-click paste option. Takes about 5 minutes and works in every version of Outlook.",
  },
];

const psBulkDeployScript = [
  "# Get all mailboxes in your organization",
  "$mailboxes = Get-Mailbox -ResultSize Unlimited -RecipientTypeDetails UserMailbox",
  "",
  "foreach ($mailbox in $mailboxes) {",
  "",
  "    # Get display name and email address",
  "    $displayName = $mailbox.DisplayName",
  "    $email = $mailbox.PrimarySmtpAddress",
  "",
  "    # Get job title from Active Directory / Azure AD",
  "    $adUser = Get-User -Identity $mailbox.Identity",
  "    $title  = $adUser.Title",
  "    $phone  = $adUser.Phone",
  "",
  "    # Build the HTML signature",
  '    $signatureHtml = @"',
  '<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a;">',
  "  <tr>",
  '    <td style="padding:0;">',
  "      <strong>$displayName</strong><br>",
  '      <span style="color:#555555;font-size:13px;">$title</span><br>',
  '      <span style="color:#555555;font-size:13px;">$email</span><br>',
  '      <span style="color:#555555;font-size:13px;">$phone</span>',
  "    </td>",
  "  </tr>",
  "</table>",
  '"@',
  "",
  "    # Plain text fallback",
  '    $signatureText = "$displayName`n$title`n$email`n$phone"',
  "",
  "    # Push to Exchange Online (New Outlook + OWA)",
  "    Set-MailboxMessageConfiguration -Identity $mailbox.Identity `",
  "        -SignatureHtml $signatureHtml `",
  "        -SignatureText $signatureText `",
  "        -AutoAddSignature $true `",
  "        -AutoAddSignatureOnReply $false",
  "",
  '    Write-Host "Set signature for $displayName ($email)"',
  "}",
  "",
  'Write-Host "Done. Signatures deployed to $($mailboxes.Count) mailboxes."',
].join("\n");

export default function Outlook365SignatureSetupPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook 365 Signature Setup",
            url: "https://neatstamp.com/blog/outlook-365-signature-setup",
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
            <span className="text-slate-700">Outlook 365 Signature Setup</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Microsoft 365
                </span>
                <span className="text-sm text-slate-400">13 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook 365 Signature Setup: Complete Guide for 2026
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Microsoft 365 (formerly Office 365) gives you several ways to set up email
                signatures — some obvious, some hidden. The problem is that Microsoft keeps
                changing the interface, and the &ldquo;new Outlook&rdquo; works completely differently
                from the classic version. This guide covers every version: classic Outlook
                desktop, new Outlook, Outlook Web Access, Outlook mobile, and admin deployment
                for your whole organization.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 13 min read
              </p>
            </header>

            {/* Which version callout */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-bold text-blue-900 mb-3">
                Jump to your version
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  ["#which-version", "How to tell which Outlook you have"],
                  ["#classic-outlook", "Classic Outlook desktop (File → Options)"],
                  ["#new-outlook", "New Outlook (cloud-based, 2024+)"],
                  ["#owa", "Outlook Web Access (browser)"],
                  ["#mobile", "Outlook mobile (iOS and Android)"],
                  ["#admin-deployment", "Admin: deploy for your whole organization"],
                  ["#powershell", "PowerShell bulk deployment script"],
                  ["#common-issues", "Common issues and fixes"],
                  ["#teams-tip", "Tips for teams"],
                  ["#faq", "Frequently asked questions"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-blue-800 hover:text-blue-900 hover:underline font-medium"
                    >
                      → {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 1: Which version */}
            <section id="which-version" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Which Outlook 365 version are you using?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before you set anything up, figure out which version you&rsquo;re in. The
                steps are different for each one, and mixing them up is the most common
                reason people can&rsquo;t find the signature settings.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    label: "Classic Outlook (desktop app)",
                    description:
                      "This is the traditional Outlook .exe that&rsquo;s been around for years. You can tell you&rsquo;re in classic Outlook if the top menu bar has File, Home, Send/Receive, Folder, View tabs. The title bar usually says \"Outlook\" or \"Microsoft Outlook\". Signature settings are under File → Options → Mail → Signatures.",
                    color: "bg-slate-100 border-slate-300",
                    labelColor: "text-slate-800",
                  },
                  {
                    label: "New Outlook (2024+)",
                    description:
                      "New Outlook looks more like a web app — cleaner interface, no ribbon tabs at the top, more like Outlook.com. Microsoft has been pushing this version as the default since late 2024. If you see a \"Try the new Outlook\" toggle in classic Outlook and you&rsquo;ve switched it on, you&rsquo;re in new Outlook. Signatures are under Settings → Accounts → Signatures.",
                    color: "bg-blue-50 border-blue-200",
                    labelColor: "text-blue-900",
                  },
                  {
                    label: "Outlook Web Access (OWA)",
                    description:
                      "OWA is Outlook in your browser. Go to outlook.office.com or outlook.office365.com and log in with your Microsoft 365 account. Signatures are under Settings → Mail → Compose and reply → Email signature.",
                    color: "bg-indigo-50 border-indigo-200",
                    labelColor: "text-indigo-900",
                  },
                  {
                    label: "Outlook mobile (iOS / Android)",
                    description:
                      "The Outlook app on your phone. Tap your profile picture in the top-left corner, then go to Settings → Signature. Mobile signatures are plain text only — no HTML, no logos.",
                    color: "bg-green-50 border-green-200",
                    labelColor: "text-green-900",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`border rounded-xl p-5 ${item.color}`}
                  >
                    <p className={`text-sm font-bold mb-1.5 ${item.labelColor}`}>
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                One important thing to know: signatures don&rsquo;t sync between these clients.
                Classic Outlook stores signatures locally in{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  %AppData%\Microsoft\Signatures
                </code>
                . New Outlook and OWA store them in the cloud via Microsoft 365. Outlook
                mobile has its own separate store. That means if you set up a signature
                in one place, it won&rsquo;t appear in the others automatically.
              </p>
            </section>

            {/* Section 2: Classic Outlook */}
            <section id="classic-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Setup for classic Outlook desktop
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                This is the most feature-complete option. Classic Outlook&rsquo;s signature
                editor supports rich HTML, inline images, and full formatting. Here&rsquo;s
                the full process:
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    step: "1",
                    title: "Open the Signatures dialog",
                    body: "Click File in the top-left corner, then Options, then Mail, then the Signatures button near the top. On Mac, go to Outlook → Preferences → Signatures. The dialog that opens is where you manage all your signatures.",
                  },
                  {
                    step: "2",
                    title: "Create a new signature",
                    body: "Click New in the left panel (under \"E-mail signature\"). Give it a name — something like \"Work\" or \"Full signature\". The name is just for your reference and won't appear in the email.",
                  },
                  {
                    step: "3",
                    title: "Write or paste your signature",
                    body: "The text editor at the bottom of the dialog is where you build your signature. You can type directly and use the formatting toolbar for bold, fonts, and colors. To use a professionally designed HTML signature, right-click in the editor and choose \"Paste\" (or Ctrl+V) to paste your HTML. Note: Outlook doesn't render the HTML in this editor perfectly — the actual email will look correct.",
                  },
                  {
                    step: "4",
                    title: "Assign to your email account",
                    body: "In the top-right section under \"Choose default signature\", select your email account from the dropdown. Then set the signature for \"New messages\" and separately for \"Replies/Forwards\". Most people use the full signature for new messages and either a shorter version or none for replies.",
                  },
                  {
                    step: "5",
                    title: "Save and test",
                    body: "Click OK to close the Signatures dialog, then OK again to close Options. Open a new compose window — your signature should appear automatically. If it doesn't, check the account assignment in step 4 and make sure the correct account is selected in the \"From\" field.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Inserting an HTML signature into classic Outlook
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Classic Outlook&rsquo;s signature editor doesn&rsquo;t have an &ldquo;Insert HTML&rdquo; button.
                  The most reliable way to paste a formatted HTML signature is:
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {[
                    "Open the HTML file in a browser (Chrome, Edge, or Firefox)",
                    "Select all (Ctrl+A), copy (Ctrl+C)",
                    "Click inside the signature editor in Outlook",
                    "Paste (Ctrl+V) — Outlook will convert the rendered content to its own format",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-slate-400 text-xs mt-0.5">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  For detailed instructions on this process, see the{" "}
                  <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                    Outlook signature setup guide
                  </Link>
                  .
                </p>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Options explained
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                The Signatures dialog has a few settings that aren&rsquo;t obvious:
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  {
                    term: "New messages vs Replies/Forwards",
                    detail: "These are separate assignments. Most people set a full signature for new messages and a shorter one (or none) for replies. Having your full 6-line signature on every reply thread gets cluttered fast.",
                  },
                  {
                    term: "E-mail account dropdown",
                    detail: "If you have multiple accounts in Outlook — like a personal and work account — signatures are per-account. Switch the account in this dropdown to set up signatures for each one separately.",
                  },
                  {
                    term: "Multiple signatures",
                    detail: "You can have more than one signature and switch between them manually in the compose window. Create them all in the Signatures dialog and give them clear names. In the compose window, go to Insert → Signature to pick a different one for a specific email.",
                  },
                ].map((item) => (
                  <li key={item.term} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">
                      <span className="font-semibold text-slate-800">{item.term}: </span>
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed">
                If your signature uses images, read the{" "}
                <Link href="/outlook-signature-html" className="text-blue-600 hover:underline">
                  Outlook HTML signature guide
                </Link>{" "}
                before you paste anything. Classic Outlook handles image embedding
                differently from other clients and has specific quirks around base64 images.
              </p>
            </section>

            {/* Section 3: New Outlook */}
            <section id="new-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Setup for new Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                New Outlook (the web-based version Microsoft has been rolling out as the
                default since late 2024) has a simpler interface but fewer options than
                classic Outlook. Here&rsquo;s how to set up your signature:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Open Settings",
                    body: "Click the gear icon in the top-right corner of new Outlook to open Settings.",
                  },
                  {
                    step: "2",
                    title: "Go to Accounts → Signatures",
                    body: "In the Settings panel, click Accounts in the left sidebar, then select Signatures. You'll see a signature editor on the right.",
                  },
                  {
                    step: "3",
                    title: "Create your signature",
                    body: "Click \"New signature\" and give it a name. Type or paste your signature in the editor. New Outlook's editor is a rich text editor — it supports bold, italic, links, and images via the toolbar.",
                  },
                  {
                    step: "4",
                    title: "Set as default",
                    body: "Under \"Select default signatures\", choose your email account and set the default for new messages and for replies/forwards. Click Save.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  Limitations of new Outlook signatures
                </p>
                <ul className="space-y-2 text-sm text-amber-800">
                  {[
                    "The HTML editor is simplified — you can't paste raw HTML directly like you can in classic Outlook",
                    "Signatures are stored in the cloud (Exchange Online), not locally — so they don't exist if you're offline",
                    "Roaming signatures can cause conflicts if you also use classic Outlook on the same account",
                    "Some advanced HTML formatting (like table layouts) may not render correctly in the editor preview",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed">
                The roaming signatures feature is what links new Outlook and OWA together —
                a signature you create in one will appear in the other. But it won&rsquo;t
                appear in classic Outlook. For more on this, see the{" "}
                <Link href="/blog/outlook-roaming-signatures" className="text-blue-600 hover:underline">
                  Outlook roaming signatures guide
                </Link>
                .
              </p>
            </section>

            {/* Section 4: OWA */}
            <section id="owa" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Setup for Outlook Web Access (OWA)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                OWA is the browser-based version of Outlook at{" "}
                <span className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
                  outlook.office.com
                </span>
                . It shares signature storage with new Outlook — if you set up a signature
                in OWA, it will also appear in new Outlook and vice versa.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Open Settings",
                    body: "Click the gear icon in the top-right corner. Then click \"View all Outlook settings\" at the bottom of the settings panel that appears.",
                  },
                  {
                    step: "2",
                    title: "Go to Mail → Compose and reply",
                    body: "In the full settings window, expand Mail in the left sidebar and click \"Compose and reply\". The Email signature section is near the top of this page.",
                  },
                  {
                    step: "3",
                    title: "Write or paste your signature",
                    body: "The signature editor in OWA supports rich text and basic HTML. You can type your signature directly or paste formatted content. To paste an HTML signature: open the HTML in a browser, select all and copy, then paste into the OWA editor.",
                  },
                  {
                    step: "4",
                    title: "Set auto-include options",
                    body: "Below the editor, two checkboxes control whether your signature is added automatically to new messages and to replies/forwards. Check the ones you want.",
                  },
                  {
                    step: "5",
                    title: "Save",
                    body: "Click Save at the bottom of the section. The signature is stored in Exchange Online and will sync to new Outlook automatically.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                OWA has better HTML support than classic Outlook&rsquo;s signature editor because
                it runs in a browser. Images, links, and table-based layouts all work well.
                For a full Outlook-compatible signature with the right HTML structure, the{" "}
                <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
                  Outlook-compatible signature guide
                </Link>{" "}
                explains exactly what CSS and HTML to use.
              </p>
            </section>

            {/* Section 5: Mobile */}
            <section id="mobile" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Setup for Outlook mobile (iOS and Android)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outlook&rsquo;s mobile app has the most limited signature support of all the
                clients. You get plain text only — no HTML, no images, no bold or italic.
                It&rsquo;s a separate setting from everything else and doesn&rsquo;t sync to desktop.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="border border-slate-200 rounded-xl p-5">
                  <p className="text-sm font-bold text-slate-900 mb-3">iOS (iPhone/iPad)</p>
                  <ol className="space-y-2 text-sm text-slate-600">
                    {[
                      "Open the Outlook app",
                      "Tap your profile picture (top-left)",
                      "Tap the gear icon for Settings",
                      "Scroll down to Signature",
                      "Type your signature text",
                      "It saves automatically",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-slate-400 text-xs mt-0.5 flex-shrink-0">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="border border-slate-200 rounded-xl p-5">
                  <p className="text-sm font-bold text-slate-900 mb-3">Android</p>
                  <ol className="space-y-2 text-sm text-slate-600">
                    {[
                      "Open the Outlook app",
                      "Tap the hamburger menu (top-left)",
                      "Tap the gear icon for Settings",
                      "Tap on your email account",
                      "Tap Signature",
                      "Edit the text and tap the back arrow to save",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-slate-400 text-xs mt-0.5 flex-shrink-0">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Tips for mobile signatures
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {[
                    "Keep it short — 3 to 4 lines maximum. Name, title, company, and a phone number is enough.",
                    "Plain text means no line breaks from tables. Use simple line-by-line formatting.",
                    "You can use Unicode characters for visual separation — like a pipe (|) or em dash (—).",
                    "If you want an HTML-rich signature on mobile, some third-party email apps (like Spark) support it. The native Outlook app doesn't.",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed mt-4">
                For more detail on mobile-specific limitations and workarounds, see the{" "}
                <Link href="/outlook-mobile-signature" className="text-blue-600 hover:underline">
                  Outlook mobile signature guide
                </Link>
                .
              </p>
            </section>

            {/* Section 6: Admin deployment */}
            <section id="admin-deployment" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Admin setup: deploying signatures for your organization
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you manage Microsoft 365 for your company and need to deploy a consistent
                signature to all users, you have three main approaches. Each one works
                differently and has real tradeoffs.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Option 1: Exchange transport rules (server-side injection)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Transport rules run on Microsoft&rsquo;s servers and append a signature to every
                outgoing email, regardless of which client the user sends from. Users don&rsquo;t
                need to do anything — the signature is added automatically.
              </p>

              <div className="space-y-3 mb-4">
                {[
                  {
                    label: "How to set it up",
                    text: "Go to the Exchange Admin Center (admin.exchange.microsoft.com), click Mail flow → Rules, then create a new rule. Set the condition to \"Apply to all messages\" (or scope to a specific domain or group). Under \"Do the following\", select \"Append a disclaimer\" and enter your HTML signature. Set the fallback action to Wrap (this wraps the message if the disclaimer can't be inserted).",
                  },
                  {
                    label: "Limitation",
                    text: "Users can't see the signature while composing. They only see it in Sent Items after the message is delivered. This leads to duplicate signatures if users also have a client-side signature set up. You'll need to either disable client-side signatures or instruct users to remove theirs.",
                  },
                  {
                    label: "Best for",
                    text: "Large organizations that need guaranteed consistency and can't rely on users to set up their own signatures. Also useful for legal disclaimers that must appear on every email regardless of user action.",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">
                      <span className="font-semibold text-slate-800">{item.label}: </span>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3 mt-6">
                Option 2: Group Policy (classic Outlook only)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Group Policy can pre-populate signatures on domain-joined Windows PCs
                running classic Outlook. You copy the signature files (.htm, .rtf, .txt)
                to each user&rsquo;s{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  %AppData%\Microsoft\Signatures
                </code>{" "}
                folder via a GPO login script, or use the Office ADMX templates to set
                signature registry keys. This only works for classic Outlook on domain-joined
                machines — it has no effect on new Outlook, OWA, or Outlook mobile.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3 mt-6">
                Option 3: PowerShell per-user deployment
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                For Microsoft 365 environments without on-premises Group Policy, PowerShell
                via Exchange Online lets you set the roaming signature for each user. This
                pushes the signature into Exchange Online, which means it appears in new
                Outlook and OWA. Classic Outlook users won&rsquo;t see it unless they also
                use new Outlook.
              </p>
            </section>

            {/* Section 7: PowerShell */}
            <section id="powershell" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                PowerShell script for bulk signature deployment
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This script connects to Exchange Online and sets a personalized HTML
                signature for every user in your organization. It pulls the user&rsquo;s
                display name and email from their mailbox and inserts them into the
                signature template.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Prerequisites
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  {`# Install the Exchange Online module if you haven't already
Install-Module -Name ExchangeOnlineManagement -Scope CurrentUser

# Connect to Exchange Online
Connect-ExchangeOnline -UserPrincipalName admin@yourdomain.com`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Bulk deployment script
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-6 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  {psBulkDeployScript}
                </pre>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  What this script does and doesn&rsquo;t do
                </p>
                <ul className="space-y-2 text-sm text-amber-800">
                  {[
                    "Sets the roaming signature in Exchange Online — affects new Outlook and OWA",
                    "Does NOT affect classic Outlook desktop (which reads from the local %AppData% folder)",
                    "Requires Exchange Administrator or Global Administrator privileges",
                    "You need to run it again if users change their name or title in Azure AD",
                    "Test on one mailbox first before running across all users",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed">
                For the full Outlook 365 signature reference — including all HTML elements
                that render correctly in every version of Outlook — see{" "}
                <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
                  Outlook 365 email signatures
                </Link>
                .
              </p>
            </section>

            {/* Section 8: Common issues */}
            <section id="common-issues" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Common issues and how to fix them
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These are the problems that come up most often with Outlook 365 signatures.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-red-400 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Signature not syncing between clients
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    This happens because each Outlook client has its own signature store.
                    Classic Outlook reads from{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      %AppData%\Microsoft\Signatures
                    </code>
                    . New Outlook and OWA read from Exchange Online. You have to set up
                    the signature separately in each client you use.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-medium text-slate-800">Fix:</span> Decide which
                    client you use most and set up the signature there. Then manually
                    replicate it in the other clients. Or use a signature tool that gives
                    you one source of truth — see{" "}
                    <Link href="/blog/outlook-roaming-signatures" className="text-blue-600 hover:underline">
                      the roaming signatures guide
                    </Link>{" "}
                    for the full picture.
                  </p>
                </div>

                <div className="border-l-4 border-orange-400 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    HTML formatting breaks between Outlook versions
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    Classic Outlook uses Word&rsquo;s HTML rendering engine, which doesn&rsquo;t support
                    CSS flexbox, CSS Grid, float-based layouts, or most modern CSS properties.
                    Signatures that look fine in OWA or Gmail may break in classic Outlook.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-medium text-slate-800">Fix:</span> Use table-based
                    HTML layout with inline styles only. No{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      display:flex
                    </code>
                    , no external CSS files, no CSS classes. Every style goes in a{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      style=""
                    </code>{" "}
                    attribute directly on the element. The{" "}
                    <Link href="/outlook-signature-html" className="text-blue-600 hover:underline">
                      Outlook HTML signature guide
                    </Link>{" "}
                    covers all of this in detail.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Roaming signatures causing conflicts
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    If you have roaming signatures enabled and also use classic Outlook,
                    you may see different signatures in different clients — or one version
                    overwriting another. The roaming signature in Exchange Online doesn&rsquo;t
                    know about the local classic Outlook signature, and vice versa.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-medium text-slate-800">Fix:</span> Either pick
                    one client and stick with it, or disable roaming signatures for your
                    tenant with{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      Set-OrganizationConfig -RoamingSignaturesEnabled $false
                    </code>
                    . See{" "}
                    <Link href="/blog/outlook-roaming-signatures" className="text-blue-600 hover:underline">
                      the roaming signatures guide
                    </Link>{" "}
                    for the full disable process and what it affects.
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Signature not saving in Outlook
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    If your signature disappears after you close Outlook, the most likely
                    cause is a permissions problem on the Signatures folder, an admin
                    Group Policy that resets signatures on every login, or a disk space
                    issue preventing Outlook from writing to{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      %AppData%
                    </code>
                    .
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-medium text-slate-800">Fix:</span> Check the{" "}
                    <Link href="/blog/outlook-signature-not-saving" className="text-blue-600 hover:underline">
                      Outlook signature not saving guide
                    </Link>{" "}
                    for the full diagnostic process. Also check with your IT admin whether
                    a policy is managing your signature settings.
                  </p>
                </div>

                <div className="border-l-4 border-slate-400 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Signature not appearing on new compose window
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    You created the signature but it doesn&rsquo;t appear when you open a new
                    email. The most common cause is that the signature wasn&rsquo;t assigned to
                    your account for &ldquo;New messages&rdquo; in the signature settings.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-medium text-slate-800">Fix:</span> Go back to
                    File → Options → Mail → Signatures. In the right panel under
                    &ldquo;Choose default signature&rdquo;, make sure your email account is selected
                    and your signature is assigned to &ldquo;New messages&rdquo;. If you have multiple
                    accounts, check each one. Also see the full{" "}
                    <Link href="/blog/outlook-signature-not-working" className="text-blue-600 hover:underline">
                      Outlook signature not working guide
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Teams tips */}
            <section id="teams-tip" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Tips for teams: create once, deploy everywhere
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you manage email signatures for a team — whether it&rsquo;s 5 people or 500 —
                the core problem is always the same: signatures need to look consistent
                across everyone, but each person is using a different combination of
                Outlook clients and devices.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The approach that works best for most teams is to centralize the design
                but distribute the implementation. Here&rsquo;s what that looks like in practice:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    number: "1",
                    title: "Design one signature template",
                    body: "Use NeatStamp's free editor to build the signature with your company branding, fonts, and layout. The editor generates Outlook-compatible table-based HTML automatically — you don't need to write any HTML yourself. Try the editor at neatstamp.com/editor.",
                  },
                  {
                    number: "2",
                    title: "Create versions for each person",
                    body: "Each team member needs their own version with their own name, title, and contact details. NeatStamp stores signatures in your account so you can duplicate the template and swap in each person's details. Or, if you're using PowerShell deployment, build the template once and let the script substitute variables.",
                  },
                  {
                    number: "3",
                    title: "Write one setup guide",
                    body: "Document the exact steps for your Outlook version (classic or new) and share it in your onboarding docs. A one-page guide with screenshots prevents \"my signature disappeared\" IT tickets every time someone gets a new laptop.",
                  },
                  {
                    number: "4",
                    title: "Test on all clients you use",
                    body: "Before rolling out to the team, test the signature in every client your team actually uses: classic Outlook, OWA, new Outlook if applicable, and at least one mobile device. It's faster to fix rendering issues before distribution than to chase down 20 people after.",
                  },
                  {
                    number: "5",
                    title: "Account for Microsoft Teams chat",
                    body: "Microsoft Teams chat doesn't use Outlook signatures — it has no signature feature at all. If your team wants consistent contact details in Teams messages, that's a separate workflow. The email signature for Teams guide covers your options.",
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

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Using NeatStamp for team signatures
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  NeatStamp&rsquo;s{" "}
                  <Link href="/editor" className="text-blue-600 hover:underline">
                    free signature editor
                  </Link>{" "}
                  generates HTML that works in every version of Outlook — classic, new,
                  and OWA — without any manual HTML editing. You build the signature once,
                  each person copies their version, and pastes it into their Outlook.
                  No Exchange admin needed, no infrastructure, no sync issues.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For teams that need more control — like centralized updates that push
                  to everyone automatically — check{" "}
                  <Link href="/pricing" className="text-blue-600 hover:underline">
                    NeatStamp Pro
                  </Link>
                  . It lets you manage all team signatures from one dashboard and send
                  updated HTML to everyone at once.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed mt-4">
                For the full picture on managing signatures across an organization, see the{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  email signature for teams guide
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
                    label: "Outlook 365 Email Signatures",
                  },
                  {
                    href: "/email-signature-outlook-compatible",
                    label: "Outlook-Compatible Signature Formats",
                  },
                  {
                    href: "/outlook-signature-html",
                    label: "Outlook HTML Signature Guide",
                  },
                  {
                    href: "/outlook-mobile-signature",
                    label: "Outlook Mobile Signature Setup",
                  },
                  {
                    href: "/blog/outlook-signature-not-working",
                    label: "Outlook Signature Not Working",
                  },
                  {
                    href: "/blog/outlook-roaming-signatures",
                    label: "Outlook Roaming Signatures Explained",
                  },
                  {
                    href: "/blog/outlook-signature-not-saving",
                    label: "Outlook Signature Not Saving Fix",
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
                  { href: "/templates", label: "Email signature templates" },
                  { href: "/pricing", label: "NeatStamp Pro for teams" },
                  { href: "/editor", label: "Free signature editor" },
                  { href: "/email-signature-for-teams", label: "Signatures for Microsoft Teams" },
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
                Build your Outlook 365 signature in minutes
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates clean, Outlook-compatible HTML — no HTML knowledge
                needed. Works in classic Outlook, new Outlook, OWA, and every other
                email client. Free, no account required.
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
