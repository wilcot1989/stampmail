import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Outlook 365 (2026 Guide)",
  description:
    "Step-by-step for Outlook 365 web, desktop, and mobile. Admin deployment, roaming signatures, IT policy options, and common fixes.",
  alternates: { canonical: "https://neatstamp.com/email-signature-outlook-365" },
};

const faqs = [
  {
    q: "What's the difference between classic Outlook and Outlook 365?",
    a: "Classic Outlook (also called 'Outlook Desktop' or 'legacy Outlook') is the traditional Windows application that uses Microsoft Word as its email rendering engine — this is why HTML signatures often break in it. Outlook 365 (also called 'New Outlook for Windows') is a newer version that Microsoft began rolling out in 2023 and is now default for many Microsoft 365 subscribers. New Outlook uses a web-based rendering engine, so HTML signatures behave much more like they do in Outlook Web Access. The installation steps are different for each version.",
  },
  {
    q: "How do I know if I have classic Outlook or new Outlook?",
    a: "Classic Outlook has a 'File' menu in the top-left corner of the window, like a traditional Office application. New Outlook looks more like a web app — there's a gear/settings icon in the top-right corner, and it lacks the classic ribbon in the same form. You can also check: in classic Outlook, go to File → Office Account and check the version number. New Outlook version numbers are typically much higher (16.x+) and the interface is noticeably different.",
  },
  {
    q: "Can IT admins push email signatures to all users in Microsoft 365?",
    a: "Yes. There are two approaches. First, Exchange Transport Rules (ETR) — admins can create rules in the Exchange Admin Center that append a disclaimer or signature to all outgoing emails server-side. This doesn't appear in the user's compose window but attaches after sending. Second, Microsoft 365 supports 'roaming signatures' — a feature that syncs signature settings across devices for a user. For company-wide managed signatures with more control, third-party tools like Exclaimer or Opensense integrate with Microsoft 365 and offer per-user field population (e.g., pulling name and title from Azure AD).",
  },
  {
    q: "What are roaming signatures in Microsoft 365?",
    a: "Roaming signatures is a Microsoft 365 feature that stores your Outlook signatures in your Exchange Online mailbox rather than locally on your device. This means if you sign into Outlook on a new computer, your signatures are already there. It requires Microsoft 365 Exchange Online (not on-premises Exchange) and Outlook for Windows 16.0.14326.20000 or later, or New Outlook. When enabled, signatures appear in Outlook Web App and sync to Outlook Desktop automatically.",
  },
  {
    q: "Why does my HTML signature look broken in classic Outlook desktop?",
    a: "Classic Outlook uses Microsoft Word's HTML rendering engine, which does not support modern CSS (flexbox, grid, media queries, etc.) or many HTML5 features. Table-based layouts — using HTML <table> elements for positioning — are the reliable format. CSS float, position: absolute, and most CSS layout techniques break. NeatStamp generates table-based HTML specifically to work in classic Outlook. If you're writing HTML yourself, use tables and inline styles only.",
  },
  {
    q: "How do I add a signature in Outlook on iPhone or Android?",
    a: "Open the Outlook app, tap your profile photo or initials in the upper left, tap Settings (gear icon), scroll to 'Email Signature', toggle it on, and edit. Note: the Outlook mobile signature is plain text only. For HTML signatures on mobile, set up your signature in Outlook Web (outlook.office.com) — Outlook mobile will then pull from that setting in some configurations, though behavior varies. Testing on your specific device is recommended.",
  },
  {
    q: "What's the maximum size for an Outlook signature?",
    a: "Microsoft doesn't publish a strict character limit for Outlook signatures, but practical performance degrades above 100KB of HTML. For images, keep each image under 100KB and your total signature size under 200KB. Very large signatures can trigger spam filters on receiving servers and slow down email loading. Keep image dimensions reasonable: logo at 120–180px wide, headshot at 80–100px.",
  },
];

export default function EmailSignatureOutlook365Page() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature for Outlook 365",
            url: "https://neatstamp.com/email-signature-outlook-365",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signature for Outlook 365 / Microsoft 365
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Microsoft 365 has multiple versions of Outlook — and the steps for adding an
              email signature differ between them. This guide covers Outlook Web, New Outlook
              for Windows, classic Outlook desktop, and mobile, plus the admin deployment
              options that matter for business users.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build My Signature — Free
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <p className="mt-3 text-sm text-muted">No account needed. Get the HTML, then follow these steps.</p>
          </div>

          {/* Which Outlook */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              First: which version of Outlook are you using?
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              This matters more than it should. Microsoft has multiple Outlook versions and the
              installation steps are genuinely different. Here's how to tell them apart.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  name: "Outlook Web (OWA / outlook.office.com)",
                  how: "You're accessing Outlook in a browser at outlook.office.com or mail.microsoft365.com. No installation required.",
                  steps: "Settings gear (top right) → View all Outlook settings → Mail → Compose and reply → Email signature",
                  note: "The most reliable way to add an HTML signature. What you set here will also be used if roaming signatures are enabled.",
                  color: "border-blue-200",
                },
                {
                  name: "New Outlook for Windows",
                  how: "The application looks like a web app — there's a gear icon in the top right, minimal ribbon, modern flat design. If you see 'New Outlook' in the title bar or in File, this is it.",
                  steps: "Settings gear (top right) → Accounts → Email signature",
                  note: "New Outlook uses a web-based renderer, so HTML signatures work much better here than in classic Outlook.",
                  color: "border-blue-200",
                },
                {
                  name: "Classic Outlook Desktop (Outlook 2016, 2019, 2021)",
                  how: "The traditional Windows application with a 'File' menu in the top-left and the full Office ribbon. Version numbers in the File → Account section.",
                  steps: "File → Options → Mail → Signatures",
                  note: "Uses Word's HTML renderer. Table-based HTML signatures work; modern CSS layouts often break. See the full classic Outlook guide for details.",
                  color: "border-orange-200",
                },
                {
                  name: "Outlook on Mac",
                  how: "Outlook installed via Microsoft 365 on a Mac computer.",
                  steps: "Outlook → Settings (or Preferences) → Email → Signatures",
                  note: "Similar to New Outlook in behavior. HTML signatures work reasonably well. Test with a send before rolling out.",
                  color: "border-blue-200",
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border-l-4 ${item.color} bg-surface p-5`}>
                  <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-xs text-muted mb-2"><strong>How to identify it:</strong> {item.how}</p>
                  <p className="text-xs text-muted mb-2"><strong>Signature settings path:</strong> {item.steps}</p>
                  <p className="text-xs text-muted italic">{item.note}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted leading-relaxed">
              For the complete guide to classic Outlook desktop signatures (including the HTML
              pasting workaround), see the{" "}
              <Link href="/email-signature-outlook" className="text-primary underline underline-offset-2">
                classic Outlook signature guide
              </Link>
              .
            </p>
          </section>

          {/* Outlook Web steps */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to add an HTML signature in Outlook Web (OWA)
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Outlook Web (outlook.office.com) has the best HTML support of all the Outlook
              versions. Start here if you have a choice, because what you configure in OWA
              is also what syncs via roaming signatures.
            </p>

            <div className="space-y-6 mb-6">
              {[
                {
                  step: "1",
                  title: "Open Outlook Web and go to Settings",
                  detail: "Go to outlook.office.com in your browser. Click the gear icon in the upper-right corner to open the Settings panel.",
                },
                {
                  step: "2",
                  title: "Open full settings",
                  detail: "At the bottom of the quick settings panel, click 'View all Outlook settings'. This opens the full settings window.",
                },
                {
                  step: "3",
                  title: "Navigate to Compose and reply",
                  detail: "In the full settings window, click 'Mail' in the left column, then click 'Compose and reply'. Scroll down to the 'Email signature' section.",
                },
                {
                  step: "4",
                  title: "Paste your HTML signature",
                  detail: "In the signature text box, you can paste formatted HTML directly. Build your signature in NeatStamp, copy the output, then paste it here. Outlook Web renders the HTML in the editor — you should see your formatted signature with fonts and layout intact.",
                },
                {
                  step: "5",
                  title: "Set default signature options",
                  detail: "Below the editor, there are dropdowns to set your default signature for new messages and for replies/forwards. You can use a full signature for new emails and a shorter one for replies (create a second signature if needed).",
                },
                {
                  step: "6",
                  title: "Save and test",
                  detail: "Click Save. Compose a new email and verify the signature appears. Send a test email to a Gmail address to check cross-client rendering.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 pb-5 border-b border-border last:border-0">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* New Outlook */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to add a signature in New Outlook for Windows
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              New Outlook (the modern replacement for classic Outlook Desktop) has a cleaner
              signature workflow and better HTML support.
            </p>

            <div className="space-y-6 mb-6">
              {[
                {
                  step: "1",
                  title: "Open New Outlook and click the Settings gear",
                  detail: "The gear icon is in the top-right corner of New Outlook, similar to the web app. Click it to open the settings panel.",
                },
                {
                  step: "2",
                  title: "Go to Accounts → Email signature",
                  detail: "In the settings panel, click 'Accounts' in the left menu. Then select 'Email signature'. If you have multiple accounts, select the one you want to configure.",
                },
                {
                  step: "3",
                  title: "Paste or format your signature",
                  detail: "New Outlook's signature editor supports pasting formatted HTML. Build your signature in NeatStamp, copy the output, and paste it in. The editor should render the formatted signature rather than showing raw HTML code.",
                },
                {
                  step: "4",
                  title: "Set as default and save",
                  detail: "Toggle on 'Automatically include my signature on new messages' and optionally 'Automatically include my signature on messages I forward or reply to'. Click Save.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 pb-5 border-b border-border last:border-0">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Roaming signatures */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Roaming signatures: sync across all your devices
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Microsoft 365 introduced roaming signatures to solve a longstanding frustration:
              your Outlook Desktop signature not matching your Outlook Web signature, and
              neither matching what's on your phone.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              When roaming signatures are enabled, your signatures are stored in your Exchange
              Online mailbox rather than locally. This means:
            </p>
            <ul className="space-y-2 text-sm text-muted mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">→</span>
                Set up your signature once in Outlook Web, and it syncs to New Outlook for Windows automatically
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">→</span>
                Sign into Outlook on a new device and your signature is already there
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">→</span>
                Updates made in Outlook Web appear in New Outlook on Windows without any manual step
              </li>
            </ul>
            <p className="text-muted leading-relaxed mb-4">
              <strong className="text-foreground">Requirements:</strong> Microsoft 365 Exchange Online
              (not on-premises Exchange), and Outlook for Windows version 16.0.14326.20000 or later.
              Most current Microsoft 365 Business subscribers have this.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Note: roaming signatures sync from Outlook Web to New Outlook for Windows. Classic
              Outlook Desktop doesn't fully support roaming signatures in all configurations —
              you may need to set the signature separately there.
            </p>
          </section>

          {/* Admin deployment */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Admin deployment options for IT and business admins
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              If you're responsible for managing email signatures across a company, Microsoft 365
              gives you several options — each with different trade-offs.
            </p>

            <div className="space-y-6">
              {[
                {
                  method: "Exchange Transport Rules (server-side signatures)",
                  pros: "Applies to all emails regardless of client or device. Users can't accidentally remove it. Easy to update once and affect all users.",
                  cons: "Signature is appended server-side, so it appears after the Gmail thread divider (not inline in the compose window). Can't include per-user variable fields without more complex configuration.",
                  setup: "Exchange Admin Center (admin.exchange.microsoft.com) → Mail flow → Rules → Create a rule. Choose 'Apply to all messages' and 'Apply disclaimer' action.",
                },
                {
                  method: "Group Policy / Intune (pushing local Outlook settings)",
                  pros: "Pushes signature settings to managed Windows devices. Signature appears inline in the compose window.",
                  cons: "Requires MDM/Intune or Group Policy infrastructure. Doesn't help with mobile devices or Outlook Web access from unmanaged devices.",
                  setup: "Via Intune configuration profiles targeting Outlook settings, or via GPO if using on-premises Active Directory.",
                },
                {
                  method: "Third-party signature management tools",
                  pros: "Most flexible option: populate signatures dynamically from Azure AD fields (name, title, phone), manage different templates per department, update centrally.",
                  cons: "Paid tools (Exclaimer, Opensense, CodeTwo). Additional cost per user per month.",
                  setup: "Each tool has its own setup process. They typically integrate via Microsoft 365 tenant access and apply signatures server-side or via sync.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-foreground mb-3">{item.method}</h3>
                  <div className="grid gap-3 md:grid-cols-2 mb-3">
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1">Pros</p>
                      <p className="text-xs text-muted leading-relaxed">{item.pros}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-600 mb-1">Cons</p>
                      <p className="text-xs text-muted leading-relaxed">{item.cons}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed border-t border-border pt-3">
                    <strong className="text-foreground">Setup: </strong>{item.setup}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted leading-relaxed">
              For most small to mid-size businesses (under 50 people), the simplest approach
              is to create a template, give each employee installation instructions, and verify
              via periodic checks. See the{" "}
              <Link href="/email-signature-for-business" className="text-primary underline underline-offset-2">
                business email signature guide
              </Link>{" "}
              for the rollout process.
            </p>
          </section>

          {/* Common issues */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Common Outlook 365 signature problems and fixes
            </h2>

            <div className="space-y-5">
              {[
                {
                  problem: "Signature set in Outlook Web but not showing in Outlook Desktop",
                  fix: "If roaming signatures are not enabled (or you're on classic Outlook), you need to set the signature separately in each application. Roaming signatures only sync to New Outlook for Windows, not classic Outlook.",
                },
                {
                  problem: "HTML signature looks broken in classic Outlook Desktop",
                  fix: "Classic Outlook uses Word's HTML renderer, which doesn't support modern CSS. Use table-based HTML only. NeatStamp generates table-based signatures. Avoid CSS flexbox, grid, and most positioning properties.",
                },
                {
                  problem: "Signature appears after the quoted text in replies",
                  fix: "In Outlook Web settings, there's an option to position the signature above or below the quoted text in replies. Check Settings → Mail → Compose and reply → look for the positioning option.",
                },
                {
                  problem: "Logo image doesn't display for some recipients",
                  fix: "This is almost always an image hosting issue. Make sure your image is hosted on a publicly accessible https:// URL. Some corporate email systems block external images by default — recipients may need to click 'Load images' or 'Always show images from this sender'.",
                },
                {
                  problem: "Signature is there but shows as a plain text block, not formatted",
                  fix: "You may have pasted raw HTML code instead of rendered HTML. In Outlook Web, the signature editor should render HTML when pasted. If it's showing code, try copying from the NeatStamp editor's 'Preview' output rather than the HTML source.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-foreground mb-2 text-sm">{item.problem}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    <strong className="text-foreground">Fix: </strong>{item.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/editor",
                  title: "Signature Editor",
                  desc: "Build your Outlook-safe signature. Free, no account needed.",
                },
                {
                  href: "/email-signature-outlook",
                  title: "Outlook Signature Guide",
                  desc: "Complete guide for classic and new Outlook.",
                },
                {
                  href: "/blog/outlook-365-signature-setup",
                  title: "Outlook 365 Setup Guide",
                  desc: "Step-by-step for every M365 version.",
                },
                {
                  href: "/blog/outlook-roaming-signatures",
                  title: "Roaming Signatures Explained",
                  desc: "What they are and when to disable them.",
                },
                {
                  href: "/outlook-signature-for-company",
                  title: "Company Signatures in Outlook",
                  desc: "Deploy to your whole Microsoft 365 team.",
                },
                {
                  href: "/blog/microsoft-365-email-signature-management",
                  title: "M365 Signature Management",
                  desc: "Exchange rules, PowerShell, third-party tools.",
                },
                {
                  href: "/outlook-mobile-signature",
                  title: "Outlook Mobile Signature",
                  desc: "Set up signatures on iOS and Android.",
                },
                {
                  href: "/blog/new-outlook-signature-problems",
                  title: "New Outlook Problems",
                  desc: "Every known issue and fix for 2026.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-border bg-surface p-4 hover:border-primary hover:bg-white transition-colors"
                >
                  <div className="font-semibold text-foreground text-sm">{link.title}</div>
                  <div className="mt-1 text-xs text-muted">{link.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-semibold text-foreground">
                    {faq.q}
                    <svg
                      className="h-5 w-5 text-muted transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
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
                  <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary p-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Build your Outlook 365 signature today
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              NeatStamp generates table-based HTML that works correctly in every version of
              Outlook. Free to use, no account needed.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create My Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
