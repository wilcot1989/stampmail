import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Mobile Signature: Set Up & Sync on iOS & Android",
  description:
    "Outlook Mobile signatures don't sync with desktop. Here's how to set one up on iPhone and Android — and how to get a rich HTML signature working.",
  alternates: { canonical: "https://neatstamp.com/outlook-mobile-signature" },
};

const faqs = [
  {
    q: "Does my Outlook desktop signature automatically appear in Outlook Mobile?",
    a: "No. Outlook Mobile stores signatures locally on each device and has no connection to the signature you set up in Outlook on Windows or Mac. They are completely separate settings. The desktop signature lives in %AppData%\\Microsoft\\Signatures\\ on Windows. The mobile signature is stored in the app's local data on your phone. If you change your desktop signature, your phone signature stays exactly as it was. You have to update them independently.",
  },
  {
    q: "Can I use an HTML signature in Outlook Mobile?",
    a: "Not directly. The Outlook Mobile app (iOS and Android) only offers a plain text signature editor. There is no option to paste or insert HTML code. The workaround is to use your phone's native mail app — Apple Mail on iPhone, or the built-in Samsung Mail or Gmail app on Android — instead of the Outlook app for emails where you need a rich HTML signature. You can configure those apps with your Microsoft 365 or Exchange account and set a proper HTML signature through the desktop webmail (Outlook on the Web / OWA).",
  },
  {
    q: "Why does my Outlook Mobile signature keep disappearing?",
    a: "Three common causes: (1) The Outlook app was updated and the update reset the local app data, clearing your signature setting. (2) You signed out and back in to your account, which can clear locally stored preferences. (3) You uninstalled and reinstalled the app. The fix is to go back to Settings (your profile picture → Settings → Signature) and retype your signature. It only takes 30 seconds, but write it down somewhere so you have it ready the next time it resets.",
  },
  {
    q: "Is the Outlook Mobile signature the same on iOS and Android?",
    a: "The process is nearly identical on both platforms and the limitation (plain text only, no HTML) is the same. On iOS: tap your profile picture → Settings → Signature. On Android: tap your profile picture → Settings → Signature. Both give you a plain text editor and an on/off toggle. The visual result looks the same to recipients — plain, unformatted text appended to your email.",
  },
  {
    q: "Can I sync the same signature across multiple phones?",
    a: "No. Outlook Mobile signatures are stored locally on each device. If you have two phones (say, a work phone and a personal phone both running Outlook), you have to set the signature manually on each one. There is no cloud sync, no way to push it from a central location, and no Microsoft 365 admin feature to pre-configure it. You just have to set it on each device individually.",
  },
  {
    q: "How do I get my logo into my Outlook Mobile signature?",
    a: "You cannot insert an image directly into the Outlook Mobile signature editor. The only way to include a logo in emails sent from Outlook Mobile is to use a different mail app that supports HTML signatures. On iPhone, Apple Mail supports rich text signatures — configure your Exchange or Microsoft 365 account there and you can paste an HTML signature with a logo. Alternatively, use Outlook on the Web (OWA) from your phone's browser to send emails that require a professional signature with your logo.",
  },
  {
    q: "What's the difference between Outlook Mobile and Outlook Web Access for signatures?",
    a: "Outlook on the Web (OWA, accessible at outlook.office.com) supports full HTML signatures and stores them in the cloud attached to your Microsoft 365 account. Any email you send from OWA uses your OWA signature. The Outlook Mobile app is separate — it stores a plain text signature locally on your phone. They don't share signature settings. If you want an HTML signature on your phone, using OWA in a mobile browser is a practical option, though the compose experience is less polished than the native app.",
  },
  {
    q: "Does Outlook Mobile display HTML signatures from incoming emails correctly?",
    a: "Yes. When you receive an email from someone whose desktop Outlook or Gmail sends an HTML signature, Outlook Mobile renders it properly. It displays logos, formatted text, social icons, and clickable links just fine. The limitation is only on the outgoing side — what Outlook Mobile appends when you compose or reply. Receiving and displaying HTML signatures from others works well.",
  },
  {
    q: "My company uses Microsoft 365. Can IT push a signature to Outlook Mobile?",
    a: "Not directly to the Outlook Mobile app. Microsoft 365 Exchange transport rules can append a server-side signature or disclaimer to all outbound emails processed by Exchange — but this applies after the email leaves your device, so it shows up for recipients but not in your Sent items preview on the phone. It's a common enterprise approach. The alternative for teams is to use a server-side signature management tool that appends consistent signatures to all email, regardless of which client or device the person sends from.",
  },
  {
    q: "Why does my signature look fine in Outlook Mobile when composing but different on the recipient's end?",
    a: "If your Outlook Mobile signature is plain text, what you type is what gets sent — no rendering differences there. If you're seeing formatting differences, it's more likely a question of the recipient's email client interpreting plain text differently (some add extra spacing, some render line breaks differently). For consistent formatting across clients, the real answer is to move to an HTML signature via Outlook on the Web or a native mail app, where you control the HTML directly.",
  },
];

export default function OutlookMobileSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Outlook Mobile Signature", url: "https://neatstamp.com/outlook-mobile-signature" },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-10 text-slate-800">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-slate-700 underline underline-offset-2">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-700 font-medium">Outlook Mobile Signature</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              Setup Guide
            </span>
            <span className="text-sm text-slate-400">16 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            Outlook Mobile Signature: How to Set Up &amp; Sync on iOS and Android
          </h1>
          <p className="text-slate-500 text-sm">Updated March 2026</p>
        </header>

        {/* ── INTRO ── */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-4">
            Here&apos;s the problem with Outlook Mobile signatures: they work almost nothing like
            your desktop Outlook signature. There&apos;s no sync, no HTML support, no way to include
            your logo, and your signature gets wiped every time the app updates or you reinstall it.
            If you&apos;ve set up a great signature on Outlook for Windows or Mac, none of that carries
            over to your phone.
          </p>
          <p className="leading-relaxed mb-4">
            This catches a lot of people off guard. You spend time creating a professional signature
            in Outlook on your desktop — with your company logo, job title, LinkedIn icon, and
            office number — then you send an email from your phone and it goes out with plain text
            (or worse, the default &ldquo;Sent from Outlook&rdquo; line that makes it obvious you forgot to
            set anything up).
          </p>
          <p className="leading-relaxed mb-4">
            The reason Outlook Mobile works this way is architectural. Outlook Mobile stores
            signatures locally on the device, in a completely separate data store from your
            Exchange or Microsoft 365 account. Microsoft hasn&apos;t built any cloud sync for
            mobile signatures into the product. Each device is its own island.
          </p>
          <p className="leading-relaxed mb-4">
            This guide covers how to set up an Outlook Mobile signature on both iPhone and Android,
            the HTML workaround that gets you a proper rich signature on your phone, how to make
            your existing desktop signature display correctly in mobile email clients, and the common
            things that go wrong (and how to fix them).
          </p>
          <p className="leading-relaxed">
            If you want a signature that looks professional across every device and client without
            fighting with settings on each one, the{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              NeatStamp editor
            </Link>{" "}
            generates mobile-safe HTML that works in Outlook on the Web, Apple Mail, and any
            email client that supports HTML signatures. More on that below.
          </p>
        </section>

        {/* ── WHY DIFFERENT ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Outlook Mobile signatures are completely different from desktop</h2>

          <p className="leading-relaxed mb-4">
            On Windows, your{" "}
            <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
              Outlook desktop signature
            </Link>{" "}
            is stored as an .htm file in your local AppData folder
            (<code className="bg-slate-100 px-1 rounded text-sm">%AppData%\Microsoft\Signatures\</code>).
            When you create or edit a signature in Outlook&apos;s settings, it writes those files.
            When you compose an email, Outlook reads them and injects the HTML into the message.
            That whole system is local to your Windows machine.
          </p>
          <p className="leading-relaxed mb-4">
            Outlook Mobile doesn&apos;t read from that folder. It can&apos;t — it&apos;s a mobile app running on
            a completely different operating system. Instead, it has its own internal settings
            storage on the device. When you sign into your Microsoft 365 account in Outlook Mobile,
            it connects to your mailbox for emails, calendar, and contacts, but it does not pull
            your signature configuration from anywhere. You start fresh.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">No HTML support in Outlook Mobile</h3>
          <p className="leading-relaxed mb-4">
            The Outlook Mobile signature editor is plain text only. You can type your name,
            title, phone number, and website. You can&apos;t bold anything, change the font size,
            add a logo, insert social icons, or include any HTML markup. What you type is what
            gets appended to your emails, formatted as unstyled plain text.
          </p>
          <p className="leading-relaxed mb-4">
            This is a significant limitation compared to what you get on{" "}
            <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
              Outlook for Microsoft 365
            </Link>{" "}
            on desktop, or on Outlook on the Web (OWA), both of which support full HTML signatures.
            Microsoft hasn&apos;t explained why they haven&apos;t added HTML support to the mobile app,
            but it&apos;s been a known limitation since the app launched and remains the case in 2026.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">No sync between devices</h3>
          <p className="leading-relaxed mb-4">
            If you have two phones, or a phone and a tablet, both running Outlook — you need to
            set the signature on each device separately. There is no Microsoft 365 setting to push
            a mobile signature. There is no import/export. The only way to get the same text on
            multiple devices is to type it on each one.
          </p>
          <p className="leading-relaxed mb-4">
            This also means when you upgrade your phone and sign in to Outlook Mobile on the new
            device, your signature is gone. Signing into your Microsoft 365 account restores your
            emails, calendar, and contacts from the cloud — but not your mobile signature setting,
            because it was only ever stored locally on the old phone.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">No sync with Outlook on the Web</h3>
          <p className="leading-relaxed mb-4">
            Outlook on the Web (OWA, at outlook.office.com) does store its signature in the cloud.
            When you set up a signature in OWA, it&apos;s available on any device you use to access OWA
            via browser. But OWA signatures also don&apos;t sync to Outlook Mobile. They are three
            separate systems: Outlook Desktop, Outlook on the Web, and Outlook Mobile. Each manages
            signatures independently.
          </p>
          <p className="leading-relaxed mb-4">
            The practical implication: if you want the same signature everywhere, you have to
            configure it in three places. Most people just accept the limitation and configure
            the desktop version properly, set a minimal plain text version in Outlook Mobile,
            and move on.
          </p>
        </section>

        {/* ── SETUP STEPS iOS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Step-by-step: Set up your signature in Outlook Mobile on iPhone (iOS)</h2>

          <p className="leading-relaxed mb-4">
            Setting up a basic plain text signature in Outlook Mobile on iPhone takes under
            two minutes. Here&apos;s exactly where to find the setting:
          </p>

          <ol className="list-none space-y-5 mb-6">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">1</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Open the Outlook app and tap your profile picture</p>
                <p className="text-slate-700 leading-relaxed">Your profile picture (or initials if you haven&apos;t set a photo) is in the top-left corner of the main screen. Tap it to open the left sidebar.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">2</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Tap the Settings gear icon</p>
                <p className="text-slate-700 leading-relaxed">The gear icon is at the bottom of the sidebar. Tap it to go into the Outlook Settings screen.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">3</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Scroll down to find &ldquo;Signature&rdquo;</p>
                <p className="text-slate-700 leading-relaxed">In the Settings screen, scroll down until you see &ldquo;Signature&rdquo; under the Mail section. Tap it.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">4</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Toggle the signature on and type your text</p>
                <p className="text-slate-700 leading-relaxed">You&apos;ll see a toggle (on/off) and a plain text field. Turn the toggle on if it&apos;s off. Clear the default text (&ldquo;Get Outlook for iOS&rdquo;) and type your signature. Use line breaks to separate your name, title, phone, and website.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">5</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Select which accounts use this signature</p>
                <p className="text-slate-700 leading-relaxed">If you have multiple email accounts in Outlook Mobile (e.g., your work Microsoft 365 account and a personal Gmail), you can choose &ldquo;All Accounts&rdquo; or &ldquo;Per Account&rdquo; to set different signatures for different accounts. Per Account is useful if you want different plain text for your work account vs. personal.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">6</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Back out — it saves automatically</p>
                <p className="text-slate-700 leading-relaxed">There&apos;s no Save button. Tapping the back arrow saves the setting. Send yourself a test email to confirm the signature appears correctly.</p>
              </div>
            </li>
          </ol>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Note on the &ldquo;Get Outlook for iOS&rdquo; default:</strong> Outlook pre-fills this promotional text as the default signature. Most users don&apos;t realize it&apos;s there until a client points it out. Delete it and replace it with your actual information.
            </p>
          </div>
        </section>

        {/* ── SETUP STEPS Android ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Step-by-step: Set up your signature in Outlook Mobile on Android</h2>

          <p className="leading-relaxed mb-4">
            The Android process is virtually identical to iOS. The navigation is the same:
          </p>

          <ol className="list-none space-y-5 mb-6">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">1</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Tap your profile picture in the top-left</p>
                <p className="text-slate-700 leading-relaxed">Opens the navigation drawer on the left side of the screen.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">2</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Tap the gear icon at the bottom</p>
                <p className="text-slate-700 leading-relaxed">Takes you to the Settings screen.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">3</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Tap your account name, then tap &ldquo;Signature&rdquo;</p>
                <p className="text-slate-700 leading-relaxed">On Android, signature settings are sometimes nested under the specific account rather than a top-level setting. If you don&apos;t see &ldquo;Signature&rdquo; at the top level, tap your email account name first.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">4</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Enable the signature and type your content</p>
                <p className="text-slate-700 leading-relaxed">Same as iOS — toggle on, clear the default promotional text, type your name, title, phone, and website on separate lines.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">5</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Tap the checkmark or back arrow to save</p>
                <p className="text-slate-700 leading-relaxed">On some Android versions there&apos;s a checkmark to confirm; on others the back gesture saves. Send a test email to verify.</p>
              </div>
            </li>
          </ol>

          <p className="leading-relaxed mb-4">
            One thing to watch on Android specifically: if you have Outlook connected to both a
            Microsoft 365 account and a Gmail account, the signature settings may behave slightly
            differently per account. The Microsoft 365 account will use Outlook&apos;s own signature.
            The Gmail account in Outlook Mobile may use Gmail&apos;s own signature setting, which you
            configure separately in the Gmail app or at mail.google.com. Check both.
          </p>
        </section>

        {/* ── HTML WORKAROUND ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">The HTML workaround: using native mail apps for a rich signature</h2>

          <p className="leading-relaxed mb-4">
            If you need a proper HTML signature on your phone — with your logo, formatted contact
            details, and social icons — Outlook Mobile can&apos;t do it. But your phone&apos;s native mail
            apps can. Here&apos;s how to get a rich signature on your phone using a workaround:
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Option 1: Apple Mail on iPhone (the cleanest solution)</h3>
          <p className="leading-relaxed mb-4">
            Apple Mail on iPhone supports HTML signatures. You can add your Microsoft 365 or
            Exchange account to Apple Mail and send emails from there when you need a
            professional HTML signature. The setup:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4 text-slate-700">
            <li>Go to <strong>Settings &rarr; Mail &rarr; Accounts &rarr; Add Account</strong></li>
            <li>Choose <strong>Microsoft Exchange</strong> and enter your work email and password</li>
            <li>Apple Mail will connect to your Exchange or Microsoft 365 mailbox</li>
            <li>Now open a desktop computer and go to <strong>outlook.office.com</strong></li>
            <li>Go to Settings &rarr; View all Outlook settings &rarr; Mail &rarr; Compose and reply</li>
            <li>Set up your HTML signature there — OWA supports full HTML</li>
          </ol>
          <p className="leading-relaxed mb-4">
            The Apple Mail trick: Apple Mail on iPhone actually reads your signature from the
            iOS Settings app. Go to <strong>Settings &rarr; Mail &rarr; Signature</strong>. You can type
            rich text there, but not HTML directly. For a genuine HTML signature in Apple Mail,
            you need to copy your formatted signature (not the HTML code, but the rendered output)
            from a desktop and paste it into the Apple Mail signature field on your Mac, then it
            syncs to your iPhone via iCloud.
          </p>
          <p className="leading-relaxed mb-4">
            This is easier than it sounds. Build your signature in the{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              NeatStamp editor
            </Link>
            , click &ldquo;Copy Signature&rdquo; on your Mac, then open Apple Mail on your Mac, go to
            Mail &rarr; Settings &rarr; Signatures, and paste it in. Enable iCloud sync for Mail
            and it appears on your iPhone within a few minutes. The full process is in the{" "}
            <Link href="/email-signature-mobile-friendly" className="text-blue-600 hover:underline">
              mobile-friendly signature guide
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Option 2: Use Outlook on the Web from your phone&apos;s browser</h3>
          <p className="leading-relaxed mb-4">
            Outlook on the Web (OWA) at outlook.office.com works in mobile browsers. If you
            bookmark it on your home screen, it functions almost like a native app. The signature
            you configure in OWA is an HTML signature stored in your Microsoft 365 account —
            it travels with your account and appears on any device where you access OWA.
          </p>
          <p className="leading-relaxed mb-4">
            To set up your OWA signature: log in at outlook.office.com, click the settings gear
            (top right), click &ldquo;View all Outlook settings&rdquo;, go to Mail &rarr; Compose and reply,
            and paste your HTML signature. You can paste the rendered output (click &ldquo;Copy Signature&rdquo;
            in NeatStamp, then Ctrl+V in the OWA signature editor) and it works with full
            formatting preserved. This is the closest thing to a true sync between your{" "}
            <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
              Microsoft 365 signature
            </Link>{" "}
            and your mobile experience.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Option 3: Gmail app for Google Workspace accounts</h3>
          <p className="leading-relaxed mb-4">
            If your organization uses Google Workspace (not Microsoft 365), you can set up an
            HTML signature via Gmail on desktop at mail.google.com and it will appear when you
            compose emails in the Gmail app on Android and iOS. Google does sync Gmail web
            signatures to the mobile app. The Gmail mobile app itself only has a plain text
            signature setting — but the HTML signature set on desktop takes priority for composed
            emails. For the full Gmail signature setup,{" "}
            <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
              check the compatibility guide
            </Link>{" "}
            for cross-client testing tips.
          </p>
        </section>

        {/* ── MAKING DESKTOP SIGNATURE MOBILE SAFE ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to make your desktop signature mobile-safe</h2>

          <p className="leading-relaxed mb-4">
            Even if you&apos;re sending from the desktop most of the time, your recipients are reading
            your emails on their phones. 61.9% of emails are opened on mobile. So your desktop
            signature — the one you send from Outlook on Windows — needs to render properly on
            a 375px iPhone screen, not just look good in your Outlook compose window.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Keep the max width at 500px</h3>
          <p className="leading-relaxed mb-4">
            Most email signature templates default to 600px or 700px wide. That&apos;s wider than most
            phone screens in portrait mode. Set your outer signature table to a maximum of 500px
            and add <code className="bg-slate-100 px-1 rounded text-sm">max-width: 100%</code> so it
            shrinks on narrower screens without creating horizontal scroll. The code looks like this:
          </p>
          <div className="bg-slate-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-emerald-400 text-sm leading-relaxed">{`<table width="500" style="width:500px;max-width:100%;" cellpadding="0" cellspacing="0" border="0">`}</pre>
          </div>
          <p className="leading-relaxed mb-4">
            This single change eliminates the horizontal scroll problem that makes wide signatures
            look broken on phones. For{" "}
            <Link href="/email-signature-mobile-friendly" className="text-blue-600 hover:underline">
              mobile-friendly signatures
            </Link>
            , 500px is the widest you should go.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Use table-based layout, not CSS floats or flexbox</h3>
          <p className="leading-relaxed mb-4">
            Outlook for Windows uses the Word rendering engine, which ignores CSS flexbox,
            CSS grid, and float-based layouts. Build your signature with HTML tables for layout.
            This is old-school web development, but it&apos;s what actually works across Outlook desktop,
            Outlook Mobile, Gmail, and Apple Mail simultaneously. If your signature uses flexbox
            and it renders fine in Gmail — it will likely break in Outlook on Windows.
          </p>
          <p className="leading-relaxed mb-4">
            Table-based layouts also tend to be more predictable on mobile, since they don&apos;t
            rely on CSS behavior that varies by client. A two-column table with your logo on
            the left and contact info on the right will render the same in most clients
            (though on very narrow phones, the two columns may be squeezed — single-column
            is safer for small screens).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Inline all CSS — no external stylesheets</h3>
          <p className="leading-relaxed mb-4">
            Email clients strip external stylesheets and often strip{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">&lt;style&gt;</code> tags from the
            email head. Everything needs to be inline:{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">style=&quot;font-size:14px;color:#374151;&quot;</code>
            on each element directly. This is verbose but it&apos;s the only approach that works
            reliably across all clients. NeatStamp generates inline-CSS signatures by default —
            this is not something you need to do manually if you use the editor.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Minimum 14px font size</h3>
          <p className="leading-relaxed mb-4">
            Text below 13px gets auto-scaled by the Gmail Android app in ways that aren&apos;t
            predictable. Text below 14px is genuinely difficult to read on a 5-inch phone screen.
            Set your name at 16px or 18px, job title and contact details at 14px, and any
            disclaimer text at a minimum of 12px (acceptable for legal fine print, but that&apos;s the
            floor). The font size hierarchy helps create visual structure without making anything
            unreadable on mobile.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Host images externally, not as base64</h3>
          <p className="leading-relaxed mb-4">
            Base64-encoded images bloat your email HTML, get converted to attachments by
            Outlook desktop, and don&apos;t cache on mobile devices. Host your logo and any signature
            images on a CDN or your own server with a public HTTPS URL. Reference them with a
            standard <code className="bg-slate-100 px-1 rounded text-sm">&lt;img src=&quot;https://...&quot;&gt;</code> tag.
            For reliable delivery and display, see the{" "}
            <Link href="/blog/email-signature-images-not-displaying" className="text-blue-600 hover:underline">
              email signature images not displaying guide
            </Link>{" "}
            — it covers exactly which hosting setups work and which cause problems.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Use PNG icons for social links at 2x resolution</h3>
          <p className="leading-relaxed mb-4">
            Phone screens are retina displays (2x or 3x pixel density). A 24px icon displayed
            at 24px on a 2x display gets stretched to fill 48 physical pixels — which makes it
            look blurry. Export your social icons as 48x48px PNG files and display them at 24px
            via the HTML width attribute. The display size stays 24px but the extra pixels keep
            it sharp on retina screens.
          </p>
          <p className="leading-relaxed mb-4">
            PNG is better than SVG for email signatures because SVG support in email clients
            is inconsistent. PNG renders identically across all clients and all devices.
          </p>
        </section>

        {/* ── COMMON PROBLEMS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Outlook Mobile signature problems</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: signature disappeared after the app updated</h3>
          <p className="leading-relaxed mb-4">
            This is the most common Outlook Mobile signature complaint. App updates sometimes
            reset locally stored settings, and your signature is one of them. It happens with
            major version updates more often than minor ones, but there&apos;s no pattern you can
            predict. The fix is straightforward: go back to Settings &rarr; Signature and retype it.
          </p>
          <p className="leading-relaxed mb-4">
            The prevention: keep a note with your signature text saved somewhere (Notes app,
            a document, anywhere accessible). When the app resets it, you&apos;re copying and pasting
            instead of retyping from memory. 30 seconds versus 3 minutes. Some people also email
            themselves the text so it&apos;s in their inbox for quick reference. For other Outlook
            signature disappearing issues, the{" "}
            <Link href="/blog/outlook-signature-not-working" className="text-blue-600 hover:underline">
              Outlook signature not working guide
            </Link>{" "}
            covers the desktop-specific causes as well.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: signature not syncing between devices</h3>
          <p className="leading-relaxed mb-4">
            It won&apos;t. There is no sync. This is not a misconfiguration — it&apos;s how the product
            works. If you have two phones, you set the signature on both phones manually. If you
            got a new phone and signed in to Outlook, you set the signature again. The only
            workaround is to accept the limitation and either keep the mobile signature very
            short (easy to retype) or use an alternative approach like OWA in the browser.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: images in emails aren&apos;t loading on Outlook Mobile</h3>
          <p className="leading-relaxed mb-4">
            Outlook Mobile by default may block remote images to protect privacy. When your
            recipients see your email in Outlook Mobile with blocked images, your logo shows
            as a broken image icon. They need to tap &ldquo;Load images&rdquo; or adjust their settings
            to always load images from known senders. You can&apos;t control this on their end, but
            you can make it less of a problem by:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700">
            <li>Setting descriptive <code className="bg-slate-100 px-1 rounded text-sm">alt</code> text on all images so the signature reads sensibly even without images</li>
            <li>Hosting images on a reputable CDN (not a personal web server) — trusted hosts get unblocked more often</li>
            <li>Keeping the signature readable without images — critical info as text, not embedded in the logo</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: signature text is too wide on recipients&apos; phones</h3>
          <p className="leading-relaxed mb-4">
            If recipients are telling you your signature requires horizontal scrolling on their
            phone, your desktop signature HTML is too wide. Check the outer table width —
            if it&apos;s 600px or 700px without <code className="bg-slate-100 px-1 rounded text-sm">max-width:100%</code>,
            that&apos;s the cause. Drop it to 500px and add max-width:100%. Also check for any images
            with explicit pixel widths larger than 500px and no max-width override.
          </p>
          <p className="leading-relaxed mb-4">
            The quickest way to diagnose this: email yourself from your desktop Outlook, then
            open that email on your phone. Can you read the entire signature without scrolling
            sideways? If not, you have a width problem. Resize the table and repeat until
            it fits cleanly on a 375px iPhone screen (iPhone SE width, the narrowest iPhone
            still in common use).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: phone number not tappable in email</h3>
          <p className="leading-relaxed mb-4">
            Plain text phone numbers in emails are sometimes auto-detected by iOS and Android
            and converted to tappable links automatically. But this is unreliable — some email
            clients do it, some don&apos;t, and the formatting can vary. The reliable fix is to explicitly
            wrap your phone number in a tel: link in your HTML signature:
          </p>
          <div className="bg-slate-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-emerald-400 text-sm leading-relaxed">{`<a href="tel:+15551234567" style="color:#2563eb;text-decoration:none;">+1 555 123 4567</a>`}</pre>
          </div>
          <p className="leading-relaxed">
            This works in Apple Mail, Gmail, Outlook Mobile, and every mobile email client.
            Recipients tap once and their phone dialer opens with your number pre-filled.
            It&apos;s one of the most practical improvements you can make for mobile recipients.
          </p>
        </section>

        {/* ── NEATSTAMP SOLUTION ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How NeatStamp handles mobile signatures</h2>

          <p className="leading-relaxed mb-4">
            Every signature built in NeatStamp is mobile-safe by default. You don&apos;t have to
            think about any of the technical details above — the output HTML already includes
            them. Specifically:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">&#10003;</span>
              <span className="text-slate-700 leading-relaxed"><strong>375px tested:</strong> Every template is previewed and tested at 375px width (iPhone SE), the narrowest iPhone in common use. If it fits there, it fits on any phone.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">&#10003;</span>
              <span className="text-slate-700 leading-relaxed"><strong>Table-based layout:</strong> All signatures use HTML tables, not flexbox or CSS floats, so they render correctly in Outlook desktop and Outlook Mobile.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">&#10003;</span>
              <span className="text-slate-700 leading-relaxed"><strong>Inline CSS only:</strong> No external stylesheets, no style tags. Everything is inline so it survives email client preprocessing.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">&#10003;</span>
              <span className="text-slate-700 leading-relaxed"><strong>PNG social icons:</strong> Social icons are exported as PNG at 2x resolution, displayed at 24px — sharp on retina screens, correctly sized touch targets.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">&#10003;</span>
              <span className="text-slate-700 leading-relaxed"><strong>Hosted images:</strong> Logo and photo images are hosted on NeatStamp&apos;s CDN via HTTPS. No base64 encoding, no attachment issues in Outlook.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">&#10003;</span>
              <span className="text-slate-700 leading-relaxed"><strong>max-width:100% on all images:</strong> Every image element includes the responsive max-width declaration so images scale down on narrow screens.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">&#10003;</span>
              <span className="text-slate-700 leading-relaxed"><strong>14px minimum font size:</strong> No text element in any NeatStamp signature is below 14px, keeping content readable on every screen size.</span>
            </li>
          </ul>

          <p className="leading-relaxed mb-4">
            The one thing NeatStamp can&apos;t do is bypass the Outlook Mobile plain-text limitation.
            That&apos;s a product decision by Microsoft, not something any tool can override. What
            NeatStamp gives you is a properly built HTML signature for your desktop clients that
            looks right when your recipients open your emails on their phones.
          </p>
          <p className="leading-relaxed">
            You can also use NeatStamp to generate a clean plain-text version of your signature
            to paste into Outlook Mobile — same information, just no formatting. Browse the{" "}
            <Link href="/templates" className="text-blue-600 hover:underline">
              signature templates
            </Link>{" "}
            to find a design that works for your role and industry.
          </p>
        </section>

        {/* ── PRO TIPS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pro tips for Outlook Mobile signatures</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 1: Test on a real phone, not a simulator</h3>
          <p className="leading-relaxed mb-4">
            Browser developer tools with mobile simulation modes give you a rough idea of how
            an email looks on a phone, but they don&apos;t replicate real email client rendering.
            Send yourself a test email and open it in Outlook Mobile, Apple Mail, and Gmail on
            your actual phone. What looks fine in Chrome DevTools at 375px may render completely
            differently in the real Outlook Mobile app on an actual iPhone. Five minutes of
            real device testing reveals problems that hours of simulator testing misses.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 2: Use hosted images, never attachments</h3>
          <p className="leading-relaxed mb-4">
            For the images in your desktop signature (the ones that appear in emails you send
            from desktop Outlook), host them at a stable HTTPS URL. Images that load from a URL
            display correctly in Outlook Mobile when recipients open your emails. Images embedded
            as base64 or attached as files may show as attachments or not load at all on mobile.
            Keep the images under 80KB each. Faster loading on mobile data connections, less
            chance of getting caught in spam filters. The{" "}
            <Link href="/blog/email-signature-images-not-displaying" className="text-blue-600 hover:underline">
              images not displaying guide
            </Link>{" "}
            has the full breakdown of what causes image loading failures in Outlook Mobile.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 3: Keep the Outlook Mobile signature under 5 lines</h3>
          <p className="leading-relaxed mb-4">
            Since it&apos;s plain text, keep it short. Recipients who get your mobile emails don&apos;t
            need a six-line signature with every social profile listed. They need to know who you
            are and how to reach you. A good 4-line Outlook Mobile signature:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 font-mono text-sm text-slate-700">
            <p>Sarah Chen</p>
            <p>Head of Product | Acme Corp</p>
            <p>+1 415 555 0198</p>
            <p>acmecorp.com</p>
          </div>
          <p className="leading-relaxed mb-4">
            That&apos;s it. Name, title, phone, website. If you need to include your email address
            too, add it. But avoid listing every social media handle, your full office address,
            and a legal disclaimer in the plain text mobile signature — that&apos;s what the full
            HTML desktop signature is for.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 4: Keep your HTML under 10KB</h3>
          <p className="leading-relaxed mb-4">
            The HTML that makes up your desktop email signature gets included in every email
            you send. If the HTML is 50KB, every email you send is 50KB heavier. On mobile
            data connections, large emails load noticeably more slowly. Some corporate email
            gateways flag messages with unusually large signature HTML as potential spam.
            A well-written email signature HTML should be 3-8KB. If yours is larger, look for
            base64 images or excessive inline CSS that can be trimmed.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 5: For teams, use server-side signatures as the safety net</h3>
          <p className="leading-relaxed mb-4">
            If you manage signatures for a team and the Outlook Mobile limitation is causing
            problems — people sending from their phones without a proper signature — the
            practical solution is a server-side signature appended by Exchange transport rules.
            Every email that goes through Exchange (including mobile emails) gets the signature
            appended server-side, regardless of which client or device it was sent from. The
            employee doesn&apos;t need to configure anything on their phone. The signature is added
            automatically. See the{" "}
            <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
              email signature for teams guide
            </Link>{" "}
            for how this works and what tools support it. Also worth reading:{" "}
            <Link href="/blog/email-signature-on-phone" className="text-blue-600 hover:underline">
              how to set up email signatures on any phone
            </Link>
            .
          </p>
        </section>

        {/* ── RELATED GUIDES GRID ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/editor", label: "Build your signature free" },
              { href: "/email-signature-outlook", label: "Outlook Email Signature Guide" },
              { href: "/email-signature-outlook-365", label: "Outlook 365 Signature Setup" },
              { href: "/email-signature-mobile-friendly", label: "Mobile Friendly Signature Design" },
              { href: "/email-signature-outlook-compatible", label: "Outlook Compatible Signatures" },
              { href: "/blog/outlook-signature-not-working", label: "Outlook Signature Not Working" },
              { href: "/blog/email-signature-on-phone", label: "Email Signature on Phone" },
              { href: "/email-signature-for-teams", label: "Team Email Signature Management" },
              { href: "/templates", label: "Browse Signature Templates" },
              { href: "/pricing", label: "NeatStamp Pricing" },
              { href: "/blog/email-signature-images-not-displaying", label: "Signature Images Not Displaying" },
              { href: "/editor", label: "Create Your Signature Now" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="block rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                {label} &rarr;
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-6 last:border-0">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="leading-relaxed text-slate-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="rounded-2xl bg-blue-600 px-8 py-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Build a signature that works on every device</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto leading-relaxed">
            NeatStamp generates mobile-safe HTML signatures — 375px tested, table-based, with hosted
            images and 2x resolution icons. Works in Outlook on the Web, Apple Mail, Gmail, and
            every client your recipients use. Free to create, no account required.
          </p>
          <Link
            href="/editor"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Create your signature free &rarr;
          </Link>
        </section>

      </article>
    </>
  );
}
