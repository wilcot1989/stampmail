import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "How to Add an Email Signature in Gmail (2026) | NeatStamp",
  description:
    "Step-by-step guide to creating a Gmail email signature that actually looks good. Fix common problems, mobile tips, and free templates.",
  alternates: { canonical: "https://neatstamp.com/email-signature-gmail" },
};

const faqs = [
  {
    q: "Does a Gmail signature work with Google Workspace accounts?",
    a: "Yes, Gmail signatures work the same way in Google Workspace (formerly G Suite) as they do in personal Gmail accounts. The settings are in exactly the same place: Settings > See all settings > General > Signature. The one difference is that your Workspace admin may have set a company-wide footer that appends automatically to every outgoing email — you'll see that as a separate block below your personal signature. Admins can also push a default signature to all users via the Admin Console, which individual users can then edit or override depending on how the admin configured it.",
  },
  {
    q: "Why does my signature look weird after I paste it into Gmail?",
    a: "This is one of the most common complaints, and it usually comes down to how you're pasting. When you copy HTML from a website or email client, Gmail tries to preserve the formatting — but it also pulls in unwanted styles. The cleanest approach is to build your signature in an HTML editor (like NeatStamp's editor at neatstamp.com/editor), copy the rendered preview, and paste it directly into Gmail's signature box. Avoid pasting from Word, Google Docs, or directly from your browser's developer tools. If you're still seeing weirdness, try clicking the 'Remove formatting' button (the Tx icon) in Gmail's signature editor toolbar and rebuilding from scratch.",
  },
  {
    q: "Can I have different signatures for different Gmail accounts?",
    a: "Yes, but only if those accounts are separate Gmail inboxes. Each Gmail account has its own signature settings — go to Settings > See all settings > General > Signature in each account. What you cannot do is set different signatures for different recipients from a single Gmail account. However, you can create multiple named signatures within one account (Gmail supports up to 10,000 characters per signature and multiple signature slots), and then manually switch between them when composing — click the pen icon at the bottom of the compose window and select the signature you want to use for that specific email.",
  },
  {
    q: "Why doesn't my photo show up in my Gmail signature?",
    a: "Photos in Gmail signatures are almost always hosted externally — meaning Gmail stores a URL pointing to an image somewhere on the internet, not the image itself. If that external URL is broken, slow, or blocked, recipients see a broken image placeholder. The most reliable fix is to host your photo on Google's own servers: upload it to Google Drive, set sharing to 'Anyone with the link can view', and use the direct image URL. Alternatively, using a trusted CDN like Cloudinary or Imgix works well. Avoid hosting on your personal Dropbox or local server. Also check that the image URL ends in .jpg, .png, or .gif — not a redirect.",
  },
  {
    q: "Why does my Gmail signature look bad on mobile?",
    a: "Gmail's mobile apps on Android and iOS don't display HTML signatures from desktop — they use their own plain-text signature instead. So if you've built a beautiful HTML signature with your logo and social links, none of that appears when you reply from your phone. The mobile signature is set separately: in the Gmail app, tap the three-line menu > Settings > your account > Signature settings. You get a plain text box only. The workaround most people use is to write a minimal plain-text version of their signature for mobile: name, title, phone number, and website URL. It's not fancy, but it's honest and readable.",
  },
  {
    q: "Can I add a promotional banner to my Gmail signature?",
    a: "Yes, and it's a surprisingly effective way to drive attention to a product launch, event, or offer. You add a banner the same way you add any image to your signature: in the signature editor, click the image icon in the toolbar, and paste a URL to an image hosted online. Make that image clickable by selecting it and clicking the link icon. Keep your banner image under 600px wide and under 100KB in file size — large images load slowly and sometimes get clipped by email clients. Update the banner seasonally or when your promotion ends. A mistake I see often is people forgetting to remove a 'Summer Sale' banner in November.",
  },
  {
    q: "Is there a size limit for Gmail signatures?",
    a: "Gmail enforces a 10,000 character limit for each individual signature. That sounds like a lot, but if you're using inline styles, base64 images, or complex HTML tables, you can hit it faster than you'd expect. The practical limit for a signature that loads reliably and doesn't get clipped by Gmail's 'Message clipped' notice is much lower — aim for clean HTML under 3,000 characters. Gmail also clips entire email threads if they exceed 102KB total, so a long HTML signature that you're appending to every reply can push a thread over that limit surprisingly quickly. Keep replies short and your signature lean.",
  },
  {
    q: "What's the difference between Gmail and Google Workspace signatures?",
    a: "Functionally, personal Gmail and Google Workspace (business) Gmail signatures work almost identically from the user's perspective. The main differences are at the admin level. In Google Workspace, an administrator can set company-wide email footers that append to every outgoing message — these are separate from personal signatures and can't be removed by individual users. Admins can also pre-populate a default signature for new users and control whether users can edit it. Another practical difference: Workspace accounts are tied to a custom domain (like you@yourcompany.com), so your signature carries more professional weight than a @gmail.com address.",
  },
  {
    q: "How do I add social media icons to my Gmail signature?",
    a: "You add social media icons as small linked images. Host icon images (typically 20x20px or 24x24px PNG files with transparent backgrounds) on an external URL — NeatStamp's templates include hosted social icons you can use directly. In Gmail's signature editor, click the image icon in the toolbar, paste the image URL, set the size to small, then select that image and click the link icon to make it link to your social profile. Repeat for each platform. Keep icons consistent in style and size — mixing flat icons with 3D glossy ones looks messy. Limit yourself to 3-4 platforms maximum. Nobody needs to see your Tumblr in a work email.",
  },
  {
    q: "Does Gmail's signature feature work on Chromebook?",
    a: "Yes, fully. On a Chromebook you're using Gmail in the Chrome browser, so everything works exactly like it does on any other desktop browser — same Settings menu, same HTML signature editor, same image insertion tools. There's no difference at all. The one thing to be aware of is that if you also use the Gmail Android app on your Chromebook (via the Google Play Store), that app uses its own plain-text signature setting, separate from your browser Gmail. So you may need to set your signature in both places if you switch between the browser and the Android app.",
  },
];

export default function EmailSignatureGmailPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Gmail Email Signature", url: "https://neatstamp.com/email-signature-gmail" },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-10 text-slate-800">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-slate-700 underline underline-offset-2">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-700 font-medium">Gmail Email Signature</li>
          </ol>
        </nav>

        {/* Page title */}
        <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
          How to Create an Email Signature in Gmail (2026 Guide)
        </h1>
        <p className="text-slate-500 text-sm mb-8">Updated March 2026 · 15 min read</p>

        {/* ── INTRO ── */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-4">
            If you&apos;re reading this, you probably just realized your Gmail signature either looks
            embarrassing, broke overnight, or simply doesn&apos;t exist yet. I&apos;ve been there. You
            send an email to a client, someone replies asking for your phone number, and you realize
            you&apos;ve been signing off as literally nothing for months.
          </p>
          <p className="leading-relaxed mb-4">
            Gmail&apos;s built-in signature editor isn&apos;t the most intuitive thing Google has ever
            built. It&apos;s tucked away in a settings page most people never visit, and when you do
            find it, it behaves strangely — formatting breaks, images disappear for some recipients,
            and anything you paste from a Word doc turns into a disaster. I&apos;ve spent a lot of time
            figuring out what actually works and what&apos;s just a waste of effort.
          </p>
          <p className="leading-relaxed mb-4">
            This guide covers everything: how to set up your signature step by step, how to fix the
            problems that inevitably come up (signature disappearing on replies, photos showing as
            broken images, looking completely different in Outlook), mobile limitations, and some
            things Gmail can do that most people don&apos;t know about. By the end you&apos;ll have a
            signature that works reliably across devices and email clients.
          </p>
          <p className="leading-relaxed">
            If you want a head start, <Link href="/editor" className="text-blue-600 hover:underline font-medium">NeatStamp&apos;s free editor</Link> generates
            clean HTML that pastes into Gmail without the usual formatting headaches. But even if you
            want to build yours from scratch, this guide has you covered.
          </p>
        </section>

        {/* ── WHAT MAKES A GOOD GMAIL SIGNATURE ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What makes a good Gmail signature</h2>

          <p className="leading-relaxed mb-6">
            Before you open Settings, it&apos;s worth thinking about what you actually want your
            signature to do. A good signature is a small piece of information that saves the recipient
            time. A bad signature is a branding exercise that annoys everyone. Here&apos;s what
            separates one from the other.
          </p>

          <ol className="space-y-6">
            <li>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">1. Keep it short — five lines max</h3>
              <p className="leading-relaxed text-slate-700">
                The most common mistake I see is signatures that are longer than the email itself.
                Your full mailing address, three phone numbers, a legal disclaimer, your LinkedIn,
                Twitter, Instagram, and a motivational quote — none of that is useful to the person
                you&apos;re emailing. They want your name, job title, one phone number, and maybe your
                website. That&apos;s it. If your signature scrolls past on a phone screen, it&apos;s too long.
                Aim for five lines of content or fewer.
              </p>
            </li>

            <li>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">2. Use one font, one size, two colors at most</h3>
              <p className="leading-relaxed text-slate-700">
                Signatures with five different fonts and every color of the rainbow look like a
                ransom note. Pick one font that your company actually uses (or default to Arial or
                Georgia — they render consistently across all email clients). Use 13px or 14px for
                body text. If you want to emphasize your name, make it slightly larger — 16px — or
                bold. For colors, your name or title in your brand color, and everything else in
                slate gray (#64748b works well). That&apos;s a complete palette.
              </p>
            </li>

            <li>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">3. Your profile photo should be 100x100px, not 500x500px</h3>
              <p className="leading-relaxed text-slate-700">
                Profile photos in signatures are a nice personal touch, especially for sales or
                client-facing roles. But the image needs to be the right size. A 500x500px photo
                looks gigantic in an email, takes forever to load on slow connections, and Gmail will
                sometimes just not display it at all. Resize your photo to exactly 100x100px (or
                96x96px) before you upload or link to it. Square crop, professional-ish background.
                Also make sure the file is under 50KB — a properly compressed JPEG headshot at
                100x100px should be around 8-15KB.
              </p>
            </li>

            <li>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">4. Make every piece of contact info clickable</h3>
              <p className="leading-relaxed text-slate-700">
                Your phone number should be a <code className="bg-slate-100 px-1 rounded text-sm">tel:</code> link so mobile recipients can tap to call.
                Your email address — if you include it at all — should be a <code className="bg-slate-100 px-1 rounded text-sm">mailto:</code> link.
                Your website should link to your actual site, not just display the URL as text.
                Social icons should each link to their respective profiles. Clickable details are
                dramatically more useful than plain text, and they cost you nothing extra. A mistake
                I see constantly: people who type out &quot;www.mycompany.com&quot; as plain text instead of
                making it a hyperlink.
              </p>
            </li>

            <li>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">5. Don&apos;t include your email address in your signature</h3>
              <p className="leading-relaxed text-slate-700">
                This surprises people, but think about it: the person you&apos;re emailing already has
                your email address. It&apos;s in the From field of every email you send. Including it in
                your signature wastes a line and often looks redundant. Use that line for something
                they don&apos;t already have — your direct phone number, your Calendly link, your company
                website. The one exception is if you have multiple email addresses and want to
                clarify which one to use for which purpose.
              </p>
            </li>

            <li>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">6. Test it in at least two different email clients</h3>
              <p className="leading-relaxed text-slate-700">
                A signature that looks great in Gmail can look completely broken in Outlook, because
                Outlook uses Microsoft Word&apos;s HTML rendering engine, which is notoriously bad at
                modern CSS. Always send yourself a test email and open it on your phone, and if you
                work with people who use Outlook, send a test there too. I&apos;d recommend checking
                our <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">Outlook signature guide</Link> as well, because there are
                specific tricks for making signatures render cleanly in both clients. If you want
                a signature that looks consistently good everywhere, start with <Link href="/professional-email-signature" className="text-blue-600 hover:underline">these professional
                signature templates</Link> — they&apos;re tested across major email clients.
              </p>
            </li>
          </ol>
        </section>

        {/* ── HOW TO ADD AN EMAIL SIGNATURE IN GMAIL ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to add an email signature in Gmail</h2>

          <p className="leading-relaxed mb-8">
            Here are the exact steps. I&apos;ll mention the menu path for each one, plus the things
            that commonly go wrong at each stage.
          </p>

          <div className="space-y-6">

            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Step 1 — Open Gmail Settings
              </h3>
              <p className="leading-relaxed text-slate-700 mb-3">
                In Gmail, click the gear icon in the top-right corner. This opens a quick-settings
                sidebar, but you don&apos;t want that — click <strong>&quot;See all settings&quot;</strong> at the top of
                that sidebar. You&apos;ll land on the General tab by default. The keyboard shortcut to
                get here faster is to type <kbd className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-sm font-mono">?</kbd> from anywhere in Gmail and search for
                &quot;Signature&quot; — though honestly, the gear icon route is more reliable.
              </p>
              <p className="text-sm text-slate-500">
                Common mistake: people click &quot;Quick settings&quot; options in the sidebar and never
                find the signature section. Always click &quot;See all settings&quot;.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Step 2 — Find the Signature section and create a new one
              </h3>
              <p className="leading-relaxed text-slate-700 mb-3">
                Scroll down on the General settings page until you reach the <strong>Signature</strong> section —
                it&apos;s about two-thirds of the way down. Click <strong>&quot;Create new&quot;</strong> and give your
                signature a name. The name is just for your reference (like &quot;Main&quot; or &quot;Work&quot;) and
                never shows to recipients. You can create multiple signatures — one for new emails,
                one for replies, a plain one for internal threads.
              </p>
              <p className="text-sm text-slate-500">
                Common mistake: people edit a &quot;No signature&quot; placeholder instead of creating a
                named signature, then wonder why it doesn&apos;t save. Always click &quot;Create new&quot; first.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Step 3 — Build or paste your signature in the editor
              </h3>
              <p className="leading-relaxed text-slate-700 mb-3">
                The signature editor is a basic rich-text box with a small toolbar. You can type
                directly, apply bold/italic, change font size, insert images, and add hyperlinks. For
                anything beyond a simple text signature, I recommend building your signature in{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">NeatStamp&apos;s editor</Link> first, then copying
                the visual result and pasting it in here. The editor generates clean HTML that
                survives Gmail&apos;s paste process without turning into a mess.
              </p>
              <p className="leading-relaxed text-slate-700 mb-3">
                To add an image (logo or headshot): click the image icon in the toolbar (it looks
                like a mountain), then paste the URL of your image hosted online. Do not try to
                upload an image directly from your computer — Gmail doesn&apos;t store it reliably.
                Host the image on Google Drive, Imgur, or a CDN first.
              </p>
              <p className="text-sm text-slate-500">
                Common mistake: pasting from Microsoft Word. Word adds huge amounts of invisible
                formatting that will make your signature look strange and bloated. Always paste from
                a clean HTML preview, or type directly.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Step 4 — Set signature defaults for new emails and replies
              </h3>
              <p className="leading-relaxed text-slate-700 mb-3">
                Just below the editor, you&apos;ll see a section called <strong>&quot;Signature defaults&quot;</strong>.
                There are two dropdowns: one for new emails and one for replies/forwards. Set each
                one to the signature you just created. If you leave them on &quot;No signature&quot;, your
                signature won&apos;t appear automatically — you&apos;ll have to insert it manually every time.
              </p>
              <p className="leading-relaxed text-slate-700 mb-3">
                A useful pattern: use your full signature (name, title, logo, social links) on new
                emails, and a shorter version (name and phone number only) for replies. Creates a
                cleaner thread experience without sacrificing contact info on your initial outreach.
              </p>
              <p className="text-sm text-slate-500">
                Common mistake: setting the new email default but forgetting the reply default.
                Then your signature only appears on the first email of a thread.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Step 5 — Save changes and test immediately
              </h3>
              <p className="leading-relaxed text-slate-700 mb-3">
                Scroll all the way to the bottom of the Settings page and click <strong>&quot;Save Changes&quot;</strong>.
                Gmail does not auto-save signature edits — if you navigate away without clicking
                Save, everything you just did is gone. This has happened to everyone at least once.
              </p>
              <p className="leading-relaxed text-slate-700 mb-3">
                After saving, compose a new email to yourself and check how the signature looks. Send
                it to a personal address or a colleague who uses Outlook if you can. Check it on
                your phone too. Look for broken images, misaligned text, and color differences. If
                something looks off, go back to Settings and adjust.
              </p>
              <p className="text-sm text-slate-500">
                Common mistake: not clicking Save. I&apos;ve seen people redo their entire signature three
                times because they kept clicking Back instead of Save.
              </p>
            </div>

          </div>
        </section>

        {/* ── COMMON PROBLEMS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common problems and how to fix them</h2>

          <p className="leading-relaxed mb-8">
            These are the issues people search for most. I&apos;ll go through each one with a concrete fix.
          </p>

          <div className="space-y-8">

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Signature disappears on reply emails</h3>
              <p className="leading-relaxed text-slate-700">
                The most likely cause: you set the signature default for new emails but left the
                reply/forward default on &quot;No signature&quot;. Go back to Settings &gt; See all settings &gt;
                General &gt; Signature, scroll to &quot;Signature defaults&quot;, and set the &quot;On reply/forward&quot;
                dropdown to your signature. The second possible cause: you&apos;re replying inline (inside
                a quoted thread) and your signature is being inserted below the quoted text, where
                you have to scroll to see it. Check below the full thread before concluding it&apos;s missing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Profile photo looks blurry or pixelated</h3>
              <p className="leading-relaxed text-slate-700">
                This happens when you use an image that&apos;s smaller than the display size, or one that
                gets displayed larger than it was designed for. For a profile photo in a signature,
                the right approach is to start with a 200x200px image (to support Retina/HiDPI
                screens) and then set its display size to 100x100px using Gmail&apos;s image size options.
                After inserting the image, click on it — you&apos;ll see size options appear (Small,
                Medium, Large, Original, or a custom size). Pick &quot;Small&quot; or set a custom size of 100.
                The image will look crisp on normal screens and on Retina displays.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Formatting breaks mid-thread</h3>
              <p className="leading-relaxed text-slate-700">
                When a long email thread gets clipped by Gmail (you&apos;ll see &quot;[Message clipped] View
                entire message&quot; at the bottom), your signature might render incorrectly because the
                HTML gets cut off. Gmail clips messages at 102KB. A complex HTML signature can be
                10-20KB by itself, and if you&apos;re adding it to every reply in a long thread, the total
                size adds up quickly. The fix is to either use a plain-text signature for replies, or
                significantly simplify your HTML signature. Also check if your signature contains
                any unminified CSS — extra whitespace adds up. Our <Link href="/html-email-signature" className="text-blue-600 hover:underline">HTML email signature guide</Link> has tips on keeping file size down.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Signature looks different in Outlook</h3>
              <p className="leading-relaxed text-slate-700">
                This is a well-known and genuinely annoying problem. Outlook uses Microsoft Word&apos;s
                rendering engine for HTML emails, which doesn&apos;t support many CSS properties that
                work fine in Gmail. Specifically: <code className="bg-slate-100 px-1 rounded text-sm">border-radius</code>, <code className="bg-slate-100 px-1 rounded text-sm">flexbox</code>,
                and <code className="bg-slate-100 px-1 rounded text-sm">background-image</code> all fail in Outlook. To build signatures that work in
                both, use HTML tables for layout (old-school but reliable), inline styles only
                (no external CSS), and avoid any rounded corners or flex-based layouts. If you
                use <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">a signature with a logo</Link>,
                make the logo a simple <code className="bg-slate-100 px-1 rounded text-sm">&lt;img&gt;</code> tag rather than a CSS background. See our full{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">Outlook signature guide</Link> for specifics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Signature doesn&apos;t show on mobile app</h3>
              <p className="leading-relaxed text-slate-700">
                This is working as intended, not a bug. Gmail&apos;s mobile apps (Android and iOS) use a
                completely separate signature setting from the web version. Your HTML signature from
                desktop Settings does not transfer to mobile. In the Gmail app, tap the three-line
                menu (hamburger) at the top-left, go to Settings, tap your account name, then tap
                &quot;Signature settings&quot;. There you can enable a mobile signature and write a plain-text
                version. You can&apos;t insert images or HTML in the mobile signature — it&apos;s plain text only.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Gmail strips my HTML formatting</h3>
              <p className="leading-relaxed text-slate-700">
                Gmail sanitizes certain HTML for security reasons — it strips <code className="bg-slate-100 px-1 rounded text-sm">&lt;script&gt;</code> tags,
                some <code className="bg-slate-100 px-1 rounded text-sm">&lt;style&gt;</code> blocks, and certain attributes. This is why external stylesheets
                and <code className="bg-slate-100 px-1 rounded text-sm">&lt;style&gt;</code> tags in your signature HTML don&apos;t work — you must use inline styles
                on every element. If you&apos;re pasting HTML source code directly into Gmail&apos;s signature
                box, it also doesn&apos;t work the way you&apos;d expect — Gmail treats the signature box as a
                visual editor, not a code editor. To use HTML source, you need to either use a
                browser extension like &quot;Signature Maker&quot; or work with a tool that generates a rendered
                preview you can copy-paste visually. NeatStamp&apos;s <Link href="/editor" className="text-blue-600 hover:underline">signature editor</Link> outputs a
                visual preview specifically for this purpose.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Signature is too long and gets cut off</h3>
              <p className="leading-relaxed text-slate-700">
                Gmail&apos;s 10,000 character limit for signatures is per-signature, and it&apos;s rarely the
                issue — more often the problem is visual length, not technical length. If your
                signature is visually taller than about 150px on a desktop screen, it&apos;s going to
                feel intrusive, especially on replies. Cut anything that isn&apos;t genuinely useful:
                your physical address (unless you need people to visit you), secondary phone numbers,
                social platforms you rarely use, and especially legal disclaimers that your legal
                team insists on but nobody reads. If you need a disclaimer for compliance reasons,
                put it in a small, light-gray font at the very bottom — at least it won&apos;t be the
                first thing people see.
              </p>
            </div>

          </div>
        </section>

        {/* ── TIPS MOST PEOPLE DON'T KNOW ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Gmail signature tips most people don&apos;t know</h2>

          <p className="leading-relaxed mb-6">
            Beyond the basics, here are some things that come up once you&apos;ve been dealing with
            Gmail signatures for a while.
          </p>

          <div className="space-y-6">

            <div className="border-l-4 border-blue-400 pl-5">
              <h3 className="font-semibold text-slate-900 mb-2">You can switch signatures while composing</h3>
              <p className="leading-relaxed text-slate-700">
                If you have multiple signatures saved, you can swap between them mid-compose. At the
                bottom of the compose window, click the pen icon (it might be hidden under the three-dot
                &quot;More options&quot; menu). You&apos;ll see a list of your saved signatures. This is handy if you
                have a formal signature for client emails and a shorter one for internal Slack-style
                quick replies that ended up going via email.
              </p>
            </div>

            <div className="border-l-4 border-blue-400 pl-5">
              <h3 className="font-semibold text-slate-900 mb-2">Image size limit is 10,000 characters of base64, not a file size</h3>
              <p className="leading-relaxed text-slate-700">
                If you embed a base64-encoded image directly into your signature HTML, it counts
                against your 10,000 character limit fast. A 10KB image as base64 is about 13,333
                characters — already over the limit by itself. This is why external image hosting
                is the right approach: link to the image URL rather than embedding the image data.
                A URL like <code className="bg-slate-100 px-1 rounded text-sm">https://example.com/logo.png</code> is only about 30 characters.
              </p>
            </div>

            <div className="border-l-4 border-blue-400 pl-5">
              <h3 className="font-semibold text-slate-900 mb-2">Always test by emailing yourself at a different domain</h3>
              <p className="leading-relaxed text-slate-700">
                Sending a test email to yourself at the same Gmail account shows you what it looks
                like in Gmail. That&apos;s useful but incomplete. Email yourself at an Outlook.com, a
                Yahoo Mail, or an iCloud address too. Better yet, if you have a colleague who uses
                Outlook on desktop, send them a test and ask them to screenshot it. The same
                signature can look clean in Gmail and completely broken in Outlook 2019.
              </p>
            </div>

            <div className="border-l-4 border-blue-400 pl-5">
              <h3 className="font-semibold text-slate-900 mb-2">Update your signature at least quarterly</h3>
              <p className="leading-relaxed text-slate-700">
                Job titles change. Phone numbers change. You switch to a new Calendly link.
                You launch a new product. Most people set their signature once and forget it
                for years — I&apos;ve seen people emailing with a job title from three positions ago.
                Put a reminder in your calendar every three months to check your signature and
                confirm every link still works and every detail is current. It takes five minutes
                and occasionally saves you an awkward conversation.
              </p>
            </div>

            <div className="border-l-4 border-blue-400 pl-5">
              <h3 className="font-semibold text-slate-900 mb-2">Use a Calendly or booking link instead of asking people to reply</h3>
              <p className="leading-relaxed text-slate-700">
                If you take calls or meetings as part of your work, a booking link in your signature
                is one of the highest-leverage things you can do. Instead of three back-and-forth
                emails scheduling a time, the person reading your email can click your booking link
                and pick a slot right there. Keep the link text short: &quot;Book a call&quot; or &quot;Schedule
                time with me&quot; — not a full URL. Make it a hyperlink so it doesn&apos;t break across
                lines in the email. See our <Link href="/email-signature-design" className="text-blue-600 hover:underline">signature design guide</Link> for how to
                style a CTA link cleanly without making it look like a spam email.
              </p>
            </div>

          </div>
        </section>

        {/* ── GOOGLE WORKSPACE ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Gmail signatures for Google Workspace</h2>

          <p className="leading-relaxed mb-4">
            If your organization uses Google Workspace (the paid business version of Gmail, formerly
            known as G Suite), there are a few things that work differently from a personal Gmail account.
          </p>

          <p className="leading-relaxed mb-4">
            First, your Workspace admin can set a company-wide email footer that appends to every
            outgoing message from your organization. This is set in the Google Admin Console under
            Apps &gt; Google Workspace &gt; Gmail &gt; Compliance &gt; Append footer. This footer appears below
            your personal signature and cannot be removed by individual users — only an admin can
            turn it off. It&apos;s typically used for legal disclaimers or company branding.
          </p>

          <p className="leading-relaxed mb-4">
            Second, admins can push a default signature to users via the Admin Console under
            Directory &gt; Users. When they do this, you&apos;ll see a pre-filled signature in your Settings.
            Depending on how the admin configured it, you may or may not be able to edit it. If you
            can edit it but you want the changes to persist for everyone in your organization, your
            admin needs to push updates centrally — individual edits only apply to that person.
          </p>

          <p className="leading-relaxed mb-4">
            For teams that want a consistent <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">business email signature</Link> across
            the whole company, the cleanest workflow is: design a master template in NeatStamp,
            export the HTML, and distribute it to team members with instructions for pasting it into
            Gmail. This is more manual than an enterprise signature management tool, but it works
            and it&apos;s free. Check <Link href="/pricing" className="text-blue-600 hover:underline">NeatStamp&apos;s pricing</Link> if you need a more
            managed solution for a larger team.
          </p>

          <p className="leading-relaxed">
            One practical note: in Google Workspace accounts, make sure your signature matches your
            display name exactly. If your email shows &quot;Sarah Johnson&quot; in the From field but your
            signature says &quot;Sarah J&quot;, it looks inconsistent and slightly unprofessional. Small thing,
            but it comes up more than you&apos;d think.
          </p>
        </section>

        {/* ── MOBILE ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Gmail signature on mobile</h2>

          <p className="leading-relaxed mb-4">
            This is the section most guides skip, which is frustrating because it&apos;s one of the most
            commonly asked questions. Here&apos;s the honest situation with Gmail signatures on Android
            and iOS.
          </p>

          <p className="leading-relaxed mb-4">
            The Gmail mobile app uses a completely separate signature from the desktop web version.
            Your HTML signature with the logo, social icons, and formatted layout? None of that
            carries over. The mobile app only supports plain text. This isn&apos;t a bug — it&apos;s a
            deliberate limitation. To set your mobile signature:
          </p>

          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-2">
            <li><strong>Android:</strong> Open Gmail app → tap the three-line menu (top-left) → Settings → tap your account → Signature settings → toggle on &quot;Mobile Signature&quot; → write your text</li>
            <li><strong>iOS (iPhone/iPad):</strong> Open Gmail app → tap the three-line menu → Settings → tap your account → Signature settings → write your text</li>
          </ul>

          <p className="leading-relaxed mb-4">
            The plain text box accepts line breaks and standard punctuation but no formatting, no
            images, no links (well, raw URLs will auto-link in most email clients, but you can&apos;t
            anchor link text). A practical mobile signature looks like this:
          </p>

          <div className="bg-slate-100 rounded-xl p-5 font-mono text-sm text-slate-700 mb-4">
            <p>Sarah Johnson</p>
            <p>Product Manager, Acme Corp</p>
            <p>+1 (415) 555-0192</p>
            <p>www.acmecorp.com</p>
          </div>

          <p className="leading-relaxed mb-4">
            That&apos;s four lines. It tells the person everything they need to follow up. No clutter.
          </p>

          <p className="leading-relaxed">
            One workaround for getting a rich signature from mobile: some people use a third-party
            app like Spark or Outlook for iOS/Android, which support HTML signatures and sync with
            Gmail accounts. If having your branded signature on mobile is a priority, switching
            email apps is genuinely the most reliable solution. Apple Mail on iPhone also supports
            richer signatures than the Gmail app — see our{" "}
            <Link href="/email-signature-apple-mail" className="text-blue-600 hover:underline">Apple Mail signature guide</Link> for how to set that up.
          </p>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/editor", label: "Free Email Signature Editor", desc: "Build and export your signature" },
              { href: "/email-signature-outlook", label: "Email Signature in Outlook", desc: "Step-by-step for Outlook 2021 and 365" },
              { href: "/email-signature-apple-mail", label: "Email Signature in Apple Mail", desc: "Mac, iPhone, and iPad instructions" },
              { href: "/professional-email-signature", label: "Professional Email Signature", desc: "What to include and what to skip" },
              { href: "/email-signature-with-logo", label: "Email Signature with Logo", desc: "Logo sizing, hosting, and formatting" },
              { href: "/email-signature-design", label: "Email Signature Design", desc: "Layout, color, and typography tips" },
              { href: "/templates", label: "Email Signature Templates", desc: "Ready-to-use signature designs" },
              { href: "/email-signature-examples-with-logo", label: "Email Signature Examples", desc: "Real examples with logos" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="block bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1">{label}</div>
                <div className="text-sm text-slate-500">{desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>

          <div className="space-y-8">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{q}</h3>
                <p className="leading-relaxed text-slate-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Ready to build your Gmail signature?</h2>
          <p className="text-slate-600 mb-5">
            Use NeatStamp&apos;s free editor to create a signature that pastes cleanly into Gmail — no
            account required.
          </p>
          <Link
            href="/editor"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create your signature free
          </Link>
        </section>

      </article>
    </>
  );
}
