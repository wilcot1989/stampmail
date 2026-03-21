import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Not Working in New Outlook? Fix Guide",
  description:
    "Email signature not working in New Outlook? 7 specific fixes: migration, images as attachments, HTML formatting, reset loops, and when to switch back.",
  alternates: {
    canonical:
      "https://neatstamp.com/blog/email-signature-not-working-new-outlook",
  },
};

const faqs = [
  {
    q: "Why didn't my signature migrate to New Outlook automatically?",
    a: "Classic Outlook stores signatures as files in %AppData%\\Microsoft\\Signatures on your local machine. New Outlook is essentially a web app that stores signatures in the cloud via Microsoft 365. The two systems are completely separate — Microsoft never built an automatic migration. You have to recreate your signature manually in New Outlook by going to Settings → Accounts → Signatures.",
  },
  {
    q: "My signature saves in New Outlook but doesn't appear in emails. How do I fix that?",
    a: "This is a known Microsoft bug that has affected many users since New Outlook launched. The most reliable workaround is to set your default signature via Outlook on the Web (OWA) at outlook.office.com instead of inside the New Outlook app. Go to Settings → Accounts → Signatures in OWA, create the signature there, and set it as the default. New Outlook pulls from the same backend and should pick it up.",
  },
  {
    q: "Why does my signature image appear as an attachment in New Outlook?",
    a: "New Outlook does not support embedded (base64) images in signatures — it treats them as file attachments. Every image in your signature must be hosted at a public HTTPS URL. Replace any embedded images with externally hosted ones, and the attachment problem will stop immediately.",
  },
  {
    q: "My HTML signature looks fine in Classic Outlook but is broken in New Outlook. Why?",
    a: "New Outlook renders HTML differently from Classic Outlook, which used Microsoft Word's rendering engine. New Outlook is closer to a web browser but still strips many modern CSS properties. The safest approach is table-based HTML with inline styles only — no CSS classes, no flexbox, no external stylesheets. NeatStamp generates this format by default.",
  },
  {
    q: "Why does my New Outlook signature reset after every update?",
    a: "New Outlook is actively rolling out and Microsoft has acknowledged signature persistence bugs in certain update channels. The most stable workaround is to set your signature via OWA (outlook.office.com) rather than inside the desktop app — OWA writes to the cloud backend directly, which is more durable across app updates.",
  },
  {
    q: "Can I use multiple signatures in New Outlook?",
    a: "Not in the same way Classic Outlook allows. New Outlook currently supports one default signature per email account. You can't switch between multiple saved signatures on a per-email basis from within the compose window. If you need multiple signatures regularly, Classic Outlook is still the better option for that workflow.",
  },
  {
    q: "How do I switch back to Classic Outlook from New Outlook?",
    a: "In the New Outlook app, look for a toggle in the top-left area of the window that says 'New Outlook' with a switch. Flipping it off will revert to Classic Outlook — provided Classic is still installed on your machine. Microsoft has been making Classic Outlook harder to access over time, so do this sooner rather than later if you rely on features New Outlook doesn't yet support.",
  },
  {
    q: "Does NeatStamp work with New Outlook?",
    a: "Yes. NeatStamp generates table-based HTML with externally hosted images and inline styles — the exact format New Outlook handles correctly. All signatures created in NeatStamp are tested against New Outlook's renderer. We also flag compatibility issues before you copy your signature across.",
  },
];

export default function NewOutlookSignatureFixPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Not Working in New Outlook",
            url: "https://neatstamp.com/blog/email-signature-not-working-new-outlook",
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
            <span className="text-slate-700">New Outlook Signature Fix</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Troubleshooting
                </span>
                <span className="text-sm text-slate-400">12 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Not Working in New Outlook? Complete Fix Guide
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Microsoft has been rolling out New Outlook for Windows aggressively since
                late 2024, and a lot of people got moved over without warning. If you opened
                Outlook one morning and your signature was gone, broken, or saving but not
                showing — you&rsquo;re not alone, and you&rsquo;re not doing anything wrong. New Outlook
                handles signatures completely differently from Classic Outlook, and Microsoft
                built no automatic migration. This guide covers every{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  New Outlook signature fix
                </Link>{" "}
                in one place, in the order you should try them.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 12 min read
              </p>
            </header>

            {/* Are you on New Outlook? */}
            <section id="are-you-on-new-outlook" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                First: are you actually on New Outlook?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before going through the fixes, confirm which version you&rsquo;re running. It
                matters because Classic Outlook and New Outlook store signatures in
                completely different places — a fix for one does nothing for the other.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s how to tell:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "New Outlook has a toggle switch in the top-left corner of the window. If you see a small labeled toggle that says 'New Outlook' — that's New Outlook.",
                  "New Outlook looks cleaner and more minimal. The ribbon toolbar is gone, replaced by a slimmer top bar. The layout resembles Outlook on the Web.",
                  "New Outlook shows 'New Outlook' in the title bar on some builds.",
                  "Classic Outlook has the full ribbon toolbar at the top with tabs like Home, Send/Receive, Folder, View.",
                  "If you're not sure: go to Help in the menu. Classic Outlook shows a version number like '16.0.xxxxx'. New Outlook shows account info but not a build number in the same way.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>Using Classic Outlook?</strong> The fixes in this guide are specifically
                  for New Outlook. If you&rsquo;re on Classic, check our{" "}
                  <Link href="/blog/outlook-signature-not-working" className="text-blue-700 font-medium hover:underline">
                    Classic Outlook signature troubleshooting guide
                  </Link>{" "}
                  instead.
                </p>
              </div>
            </section>

            {/* Quick fix list */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-bold text-amber-900 mb-3">
                Which problem matches yours?
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  ["#fix-1-migration", "Signature didn't migrate from Classic Outlook"],
                  ["#fix-2-saves-but-doesnt-appear", "Signature saves but doesn't appear in emails"],
                  ["#fix-3-html-formatting", "HTML formatting is broken (layout, fonts, images too large)"],
                  ["#fix-4-images-attachments", "Images showing as attachments"],
                  ["#fix-5-resets-after-update", "Signature resets after every Outlook update"],
                  ["#fix-6-paste", "Can't paste a rich formatted signature"],
                  ["#fix-7-multiple-signatures", "Multiple signatures not available"],
                  ["#switch-back", "How to switch back to Classic Outlook"],
                  ["#long-term", "The long-term solution"],
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
                  ["#are-you-on-new-outlook", "Are you actually on New Outlook?"],
                  ["#fix-1-migration", "Fix 1: Signature didn't migrate"],
                  ["#fix-2-saves-but-doesnt-appear", "Fix 2: Saves but doesn't appear"],
                  ["#fix-3-html-formatting", "Fix 3: HTML formatting is broken"],
                  ["#fix-4-images-attachments", "Fix 4: Images showing as attachments"],
                  ["#fix-5-resets-after-update", "Fix 5: Resets after every update"],
                  ["#fix-6-paste", "Fix 6: Can't paste rich signature"],
                  ["#fix-7-multiple-signatures", "Fix 7: Multiple signatures not available"],
                  ["#switch-back", "How to switch back to Classic Outlook"],
                  ["#long-term", "The long-term solution"],
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

            {/* Fix 1 */}
            <section id="fix-1-migration" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 1: Your signature didn&rsquo;t migrate to New Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the most common cause of a missing signature. Classic Outlook stores
                your signatures as files in this folder on your computer:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mb-4 overflow-x-auto">
                <code className="text-sm font-mono">%APPDATA%\Microsoft\Signatures</code>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                New Outlook ignores that folder entirely. It stores signatures in the cloud
                via your Microsoft 365 account. When you switch to New Outlook, it doesn&rsquo;t
                import anything from your local machine — your old signature just doesn&rsquo;t exist
                in the new system.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The fix is to recreate your signature from scratch in New Outlook:
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Open Settings in New Outlook",
                    body: "Click the gear icon in the top-right corner of New Outlook, or go to View → Settings from the menu bar.",
                  },
                  {
                    step: "2",
                    title: "Go to Accounts → Signatures",
                    body: "In the Settings panel, select 'Accounts' from the left sidebar, then click 'Signatures'. This is where New Outlook stores all signature configuration.",
                  },
                  {
                    step: "3",
                    title: "Create a new signature",
                    body: "Click '+ New signature'. Give it a name, then paste or type your signature content in the editor. If you have your old HTML from a tool like NeatStamp, paste it directly into the HTML view.",
                  },
                  {
                    step: "4",
                    title: "Set it as the default",
                    body: "Under 'Select default signatures', assign your new signature to 'New messages' and 'Replies/forwards'. Click Save.",
                  },
                  {
                    step: "5",
                    title: "Test with a new compose window",
                    body: "Open a new email and check that the signature appears. If it's still missing, continue to Fix 2 — there's a separate bug where the signature saves but won't inject into emails.",
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
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Tip:</strong> If your old signature had specific HTML formatting, open
                  the classic Outlook{" "}
                  <code className="text-xs bg-slate-200 px-1.5 py-0.5 rounded font-mono">
                    %APPDATA%\Microsoft\Signatures
                  </code>{" "}
                  folder, find the <code className="text-xs bg-slate-200 px-1.5 py-0.5 rounded font-mono">.htm</code>{" "}
                  file with your signature name, open it in a text editor, and copy the HTML. See
                  our guide on{" "}
                  <Link href="/outlook-signature-html" className="text-blue-600 hover:underline">
                    Outlook-safe signature HTML
                  </Link>{" "}
                  if the formatting still looks wrong after pasting.
                </p>
              </div>
            </section>

            {/* Fix 2 */}
            <section id="fix-2-saves-but-doesnt-appear" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 2: Signature saves but doesn&rsquo;t appear in emails
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You set up your signature in New Outlook. You can see it in Settings. But
                when you open a new compose window — nothing. This is a known bug in New
                Outlook that Microsoft has been aware of since launch. It affects certain
                Microsoft 365 account configurations and tends to come and go with app
                updates.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most reliable fix is to bypass the New Outlook app entirely and set your
                signature via Outlook on the Web (OWA):
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Go to outlook.office.com",
                    body: "Open a browser and sign in to your Microsoft 365 account at outlook.office.com. This is Outlook on the Web — it writes directly to the same cloud backend that New Outlook reads from.",
                  },
                  {
                    step: "2",
                    title: "Open Settings → Accounts → Signatures",
                    body: "Click the gear icon in the top-right corner, then search for 'Signatures' or navigate to Settings → Accounts → Signatures.",
                  },
                  {
                    step: "3",
                    title: "Create your signature in OWA",
                    body: "Set up your signature here, including the default assignment for new messages and replies. Click Save.",
                  },
                  {
                    step: "4",
                    title: "Reopen New Outlook",
                    body: "Close New Outlook completely and reopen it. Give it a minute to sync from the cloud. Open a new compose window — your signature should now appear.",
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
              <p className="text-slate-600 leading-relaxed">
                This OWA workaround is also covered in our dedicated post on{" "}
                <Link href="/blog/new-outlook-signature-problems" className="text-blue-600 hover:underline">
                  New Outlook signature problems
                </Link>{" "}
                with more details on the specific account types affected.
              </p>
            </section>

            {/* Fix 3 */}
            <section id="fix-3-html-formatting" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 3: HTML formatting is broken
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your signature shows up, but something looks wrong — images are huge, fonts
                are different, the two-column layout has collapsed into one block, or the
                spacing is completely off. This comes down to how New Outlook renders HTML.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Classic Outlook used Microsoft Word&rsquo;s rendering engine — with all its quirks
                and limitations. New Outlook uses a more browser-like renderer. That sounds
                like an improvement, but in practice it means signatures designed for Classic
                Outlook sometimes break in New Outlook, and vice versa.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The specific things that break most often:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Images sized with width/height attributes on the <img> tag may scale unexpectedly. New Outlook often overrides these with CSS. Use inline style=\"width:Xpx; height:auto;\" on the image tag, not just HTML attributes.",
                  "Font-family declarations using system fonts sometimes fall back to a different default. Stick to web-safe fonts like Arial, Helvetica, Georgia, or Verdana and always specify a fallback: font-family: Arial, Helvetica, sans-serif.",
                  "Table-based layouts generally survive the transition well, but tables using percentage widths (width='100%') can collapse on narrow views. Use fixed pixel widths on your outer table: width='600'.",
                  "CSS classes and external stylesheets are stripped entirely. Everything must be inline styles — style=\"...\" directly on each element.",
                  "Padding and margin on <td> elements behave differently than Classic Outlook. Use cellpadding and cellspacing attributes on tables instead of CSS padding where possible.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                The safest approach is to start with a signature generator that produces
                Outlook-safe HTML from the beginning, rather than trying to fix broken HTML
                manually. Our full guide on{" "}
                <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
                  Outlook-compatible email signature HTML
                </Link>{" "}
                covers the exact markup patterns that work consistently across all Outlook
                versions.
              </p>
            </section>

            {/* Fix 4 */}
            <section id="fix-4-images-attachments" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 4: Images showing as attachments
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Recipients are getting your emails with a mysterious attachment — and it turns
                out to be your signature logo or headshot. This is one of the most
                embarrassing signature bugs because it looks unprofessional to everyone you
                email.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The cause is almost always embedded images — where the image data is baked
                into the HTML as a long base64 string that starts with{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  data:image/png;base64,...
                </code>
                . New Outlook doesn&rsquo;t handle these. It converts them to file attachments
                instead of displaying them inline.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The fix is straightforward: host your images externally and reference them
                with a URL.
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Upload your image to a public host",
                    body: "Upload your logo or headshot to any public image host — your company website, an AWS S3 bucket, Google Cloud Storage, Cloudinary, or even a public GitHub repository. The image needs to be accessible via a public HTTPS URL.",
                  },
                  {
                    step: "2",
                    title: "Replace the base64 data with the URL",
                    body: 'In your signature HTML, find the img tag with the base64 data. Replace the src attribute value with the public URL. It should look like: src="https://yourwebsite.com/images/logo.png"',
                  },
                  {
                    step: "3",
                    title: "Test by sending to yourself",
                    body: "Send a test email to your own address from outside your domain, then check the received email. If the image renders inline and there's no attachment — the fix worked.",
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
              <p className="text-slate-600 leading-relaxed">
                NeatStamp automatically hosts all signature images on our CDN — you never
                deal with base64 or self-hosting. This also keeps your emails lighter, which
                helps with{" "}
                <Link href="/blog/outlook-signature-not-saving" className="text-blue-600 hover:underline">
                  signature saving issues
                </Link>{" "}
                caused by large payloads.
              </p>
            </section>

            {/* Fix 5 */}
            <section id="fix-5-resets-after-update" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 5: Signature resets after every update
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You set up your signature. It works for a few days. Then New Outlook updates
                and it&rsquo;s gone again — or reverted to an old version, or back to nothing.
                This is one of the most frustrating issues because the fix keeps undoing
                itself.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Microsoft has acknowledged this as a known issue in New Outlook&rsquo;s early
                release channels. The root cause is that the app sometimes overwrites the
                cloud-stored signature settings on update, particularly when there&rsquo;s a
                conflict between local cache and cloud state.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most durable fix:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Set your signature via OWA (outlook.office.com) rather than inside the New Outlook desktop app. The OWA write goes directly to the cloud backend and is less likely to be overwritten by app updates.",
                  "After setting via OWA, clear the New Outlook cache. Close New Outlook, then navigate to %LocalAppData%\\Microsoft\\OneOutlook and delete the cache folder. Reopen New Outlook — it will re-sync from the cloud.",
                  "Check if your organization uses roaming signatures centrally managed by IT. If so, your personal setting may be getting overwritten by a policy. See our guide on Outlook roaming signatures for the exact settings to check.",
                  "If you're on the Beta Channel of Microsoft 365, consider switching to Current Channel or Monthly Enterprise Channel — those builds are more stable for signature handling.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/blog/outlook-roaming-signatures" className="text-blue-600 hover:underline">
                  Outlook roaming signatures guide
                </Link>{" "}
                has a full walkthrough on how roaming signatures interact with New Outlook —
                and why the interaction sometimes causes this reset loop.
              </p>
            </section>

            {/* Fix 6 */}
            <section id="fix-6-paste" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 6: Can&rsquo;t paste a rich formatted signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You copy your beautifully formatted signature — with the logo, the colored
                name, the two-column layout — and paste it into New Outlook&rsquo;s signature
                editor. What comes through is a plain text mess. Or the layout is there
                but all the fonts and colors are wrong. Or the paste just doesn&rsquo;t work at all.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                New Outlook&rsquo;s built-in signature editor has noticeably weaker paste support
                than Classic Outlook. This isn&rsquo;t a user error — the editor genuinely strips
                more on paste.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Two workarounds that actually work:
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "Paste into OWA instead",
                    body: "Go to outlook.office.com, open Settings → Accounts → Signatures, and paste your signature there. OWA's signature editor has better rich-text paste handling. Once saved in OWA, New Outlook will sync the result.",
                  },
                  {
                    title: "Use the HTML source view",
                    body: "If your signature tool gives you an HTML file or source code, some versions of the OWA signature editor have a 'Switch to HTML view' option or accept raw HTML. Paste the HTML source directly. This is the most reliable way to get your exact formatting across without the editor mangling it.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re starting from scratch, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                gives you clean HTML output that pastes correctly into OWA without stripping.
                You can also copy the rendered signature (not the HTML) from our preview and
                paste that directly — the formatting holds up better than pasting from most
                other sources.
              </p>
            </section>

            {/* Fix 7 */}
            <section id="fix-7-multiple-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Fix 7: Multiple signatures aren&rsquo;t available
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In Classic Outlook, you could save multiple signatures and pick one per email
                — one formal signature for client emails, a simpler one for internal threads,
                a plain text version for replies. New Outlook doesn&rsquo;t support this the same way.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                As of early 2026, New Outlook lets you save multiple signatures, but the
                compose window doesn&rsquo;t show a dropdown to switch between them mid-email the
                way Classic Outlook did. You can change your default in settings, but that&rsquo;s
                a global change — not a per-email choice.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your options:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Switch back to Classic Outlook for now. If you frequently switch signatures, Classic Outlook is still significantly better for this workflow. The section below covers how to switch back.",
                  "Use OWA in a browser tab as your primary email client instead of the desktop app. OWA has more reliable multi-signature support.",
                  "Change your default signature in Settings when you need a different one, then switch back. Annoying, but workable for occasional use.",
                  "For company-wide scenarios — where different teams need different signatures — look at centralized signature management rather than per-user workarounds.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                This limitation also affects{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  Microsoft Teams email signatures
                </Link>{" "}
                and mobile — see our{" "}
                <Link href="/outlook-mobile-signature" className="text-blue-600 hover:underline">
                  Outlook mobile signature guide
                </Link>{" "}
                for the current state of signature support across the Microsoft ecosystem.
              </p>
            </section>

            {/* Switch back */}
            <section id="switch-back" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to switch back to Classic Outlook
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Microsoft has been nudging — and in some cases forcing — users onto New
                Outlook. But as of early 2026, the switch back to Classic Outlook is still
                available for most users. Here&rsquo;s how to do it.
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Find the toggle in New Outlook",
                    body: "Look at the top-left corner of the New Outlook window. You should see a toggle switch labeled 'New Outlook'. Click it to turn it off.",
                  },
                  {
                    step: "2",
                    title: "Classic Outlook opens automatically",
                    body: "If Classic Outlook is installed, it will reopen. You may get a prompt asking for confirmation. Accept it.",
                  },
                  {
                    step: "3",
                    title: "If the toggle isn't there",
                    body: "Some enterprise Microsoft 365 configurations remove the toggle via Group Policy. If you don't see it, your IT admin has likely disabled the ability to switch back. Contact your IT department.",
                  },
                  {
                    step: "4",
                    title: "If Classic Outlook isn't installed",
                    body: "If you're on a new machine or your organization provisioned Office without the Classic client, you may need IT to install it. Alternatively, use Outlook on the Web (outlook.office.com) which has better signature functionality than New Outlook currently.",
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
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Act sooner rather than later.</strong> Microsoft has stated they plan to
                  retire Classic Outlook for Windows in 2026. The timeline keeps shifting, but at
                  some point switching back won&rsquo;t be an option. If you&rsquo;re relying on Classic
                  Outlook features, start planning for alternatives now rather than waiting
                  until you&rsquo;re forced off.
                </p>
              </div>
            </section>

            {/* Long-term solution */}
            <section id="long-term" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The long-term solution
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every fix in this guide is a workaround for New Outlook&rsquo;s current
                immaturity around signatures. Microsoft will improve it — but the timing is
                unpredictable, and your signature needs to work today.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most durable approach is to build your signature in a format that&rsquo;s
                already compatible with New Outlook from the start:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Table-based HTML with fixed pixel widths — not flexbox, not percentage widths, not CSS grid.",
                  "Inline styles only — no classes, no external stylesheets, no <style> blocks.",
                  "Externally hosted images via HTTPS — no base64, no locally embedded files.",
                  "Web-safe fonts with fallbacks — no Google Fonts, no custom font-face declarations.",
                  "No JavaScript, no CSS animations, no SVG — these are stripped by every email client.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                Writing this HTML by hand is tedious and error-prone. That&rsquo;s the exact problem
                NeatStamp was built to solve.
              </p>

              {/* NeatStamp callout */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">
                  How NeatStamp handles New Outlook
                </h3>
                <p className="text-sm text-blue-800 leading-relaxed mb-4">
                  Every signature built in the{" "}
                  <Link href="/editor" className="text-blue-700 font-medium hover:underline">
                    NeatStamp editor
                  </Link>{" "}
                  outputs Outlook-safe HTML automatically. We use table-based layouts, inline
                  styles, and CDN-hosted images by default. You don&rsquo;t have to think about any of
                  the technical constraints — they&rsquo;re handled in the output.
                </p>
                <p className="text-sm text-blue-800 leading-relaxed mb-4">
                  We also run every signature through a compatibility check before you export.
                  The checker flags anything that New Outlook is likely to break — embedded
                  images, unsupported CSS, font declarations that will fall back incorrectly.
                  You see the warning before the problem hits your recipients&rsquo; inboxes.
                </p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  If you&rsquo;re migrating from Classic Outlook to New Outlook and you want to
                  validate that your existing signature will hold up, use our Migration Checker.
                  Paste in your current HTML and it tells you exactly what needs to change and why.
                  See our{" "}
                  <Link href="/email-signature-outlook-compatible" className="text-blue-700 font-medium hover:underline">
                    Outlook-compatible signature guide
                  </Link>{" "}
                  for what the checker looks for.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                If you want to browse tested templates before building from scratch, the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  signature template library
                </Link>{" "}
                has options that are pre-validated for New Outlook. Pick one, customize it,
                and copy the output directly into OWA.
              </p>
            </section>

            {/* Related guides */}
            <section id="related-guides" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Related guides
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/blog/outlook-signature-not-working",
                    title: "Classic Outlook Signature Not Working",
                    desc: "Fixes for the desktop .exe version of Outlook",
                  },
                  {
                    href: "/blog/outlook-signature-disappeared",
                    title: "Outlook Signature Disappeared",
                    desc: "Why it vanishes and how to recover it",
                  },
                  {
                    href: "/blog/outlook-signature-not-saving",
                    title: "Outlook Signature Not Saving",
                    desc: "When changes don't persist after clicking OK",
                  },
                  {
                    href: "/blog/new-outlook-signature-problems",
                    title: "New Outlook Signature Problems",
                    desc: "Full list of known bugs and current workarounds",
                  },
                  {
                    href: "/blog/outlook-roaming-signatures",
                    title: "Outlook Roaming Signatures Explained",
                    desc: "How cloud sync works and when it breaks",
                  },
                  {
                    href: "/email-signature-outlook",
                    title: "Email Signature Setup for Outlook",
                    desc: "Setup guides for all Outlook versions",
                  },
                  {
                    href: "/outlook-mobile-signature",
                    title: "Outlook Mobile Signature",
                    desc: "Signature setup for iOS and Android Outlook",
                  },
                  {
                    href: "/outlook-signature-html",
                    title: "Outlook Signature HTML Guide",
                    desc: "The exact HTML rules that work in every Outlook",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 mb-1">
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
                Build a signature that actually works in New Outlook
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates New Outlook-compatible HTML, hosts your images on our CDN,
                and validates compatibility before you export. Free, no account needed.
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
