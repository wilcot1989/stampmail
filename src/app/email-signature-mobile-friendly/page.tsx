import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Mobile Friendly Email Signature: Design for Phones (2026)",
  description:
    "61.9% of emails are read on mobile. Here's how to make your email signature look good on every phone, not just your desktop.",
  alternates: { canonical: "https://neatstamp.com/email-signature-mobile-friendly" },
};

const faqs = [
  {
    q: "Why does my email signature look different on my phone than on my computer?",
    a: "Email clients on mobile render HTML differently from desktop clients. Mobile screens are narrower (typically 320-430px wide versus 1200px+ on desktop), so a fixed-width signature designed for desktop gets either scaled down — making text tiny — or it overflows the screen horizontally, requiring sideways scrolling. Mobile email apps also have different default styles and sometimes strip certain CSS properties. The Gmail app on Android, for instance, has known quirks with how it handles signature font sizes and image widths. Building a signature with a maximum width of 480px and text at a minimum of 14px solves most of these issues.",
  },
  {
    q: "How wide should my email signature be on mobile?",
    a: "Design your signature to fit within 480px wide, which is the safe maximum for most phone screens in portrait mode. For the minimum guaranteed visible width, design to 320px — that's the narrowest iPhone screen. The practical approach is to build at 480px wide with images that scale down using max-width: 100% on the img tag. Avoid fixed-width images wider than 480px. For logos, 160px wide is a comfortable size that looks good on both desktop and mobile. Text at 14px and larger remains readable when scaled; text at 11px or 12px becomes illegible on small screens.",
  },
  {
    q: "Does Gmail mobile app show my HTML signature?",
    a: "The Gmail mobile app (Android and iOS) does show HTML signatures that were set up via Gmail on desktop — it will display them when you receive emails containing them. However, the Gmail mobile app uses its own separate plain-text signature for emails you compose on your phone. The signature you configure in the app (under Settings > account > Signature settings) is plain text only. So when you reply or compose from your phone, your beautiful HTML signature isn't sent — only your plain text mobile signature is. This is a Gmail limitation, not a NeatStamp issue. Many users set a clean plain text version of their contact info as their mobile signature.",
  },
  {
    q: "Can I make my email signature tap-to-call on mobile?",
    a: "Yes, and you absolutely should. Wrap your phone number in a tel: link so mobile users can tap it to call directly: <a href='tel:+15551234567'>+1 555 123 4567</a>. This works in Apple Mail, Gmail app, and most mobile email clients. Similarly, your address can be wrapped in a Google Maps link or Apple Maps link so tapping it opens navigation. Your email address should use a mailto: link. These clickable elements are especially valuable on mobile, where typing is slow and error-prone. They cost nothing to implement and recipients genuinely appreciate them.",
  },
  {
    q: "Why does my logo look blurry on iPhone?",
    a: "iPhone and most modern smartphones have retina (2x or 3x) displays, which means they pack twice or three times as many pixels into the same physical space as older screens. If you display a 100px image at 100px on a 2x retina screen, it gets stretched to fill the physical 200px space — which makes it look blurry. The fix is to use a 2x version of your image. If your logo displays at 160px wide, use a 320px wide version of the file and set the HTML attribute width='160'. The browser/email client will display it at 160px but use the higher-resolution version, so it looks sharp. Keep the 2x image under 80KB.",
  },
  {
    q: "What's the minimum font size that reads well on mobile?",
    a: "14px is the minimum you should use for body text in a mobile email signature. At 13px or smaller, text becomes difficult to read on a 5-inch phone screen without zooming in. Many email clients also automatically bump font sizes below 13px up to 13px on mobile — meaning your carefully chosen small text gets overridden anyway. Use 14px for contact details (job title, phone, website), 16px for your name, and if you include a secondary information block (department, disclaimer text), keep even that at a minimum of 12px with higher contrast. Good contrast matters more on mobile screens viewed outdoors in sunlight.",
  },
  {
    q: "Does Outlook Mobile display email signatures correctly?",
    a: "Outlook Mobile (the iOS and Android app) generally displays HTML email signatures from desktop clients correctly — it uses a browser-based rendering engine on mobile, not the Word engine that desktop Outlook on Windows uses. So CSS that breaks in Outlook 2019 on Windows often works fine in Outlook Mobile. The main mobile-specific issue in Outlook Mobile is image width: images without explicit max-width:100% can overflow the reading pane on narrow screens. Make sure all your signature images have max-width:100% in their inline CSS in addition to a fixed pixel width attribute. This ensures they scale down properly on small screens.",
  },
  {
    q: "Should I have a different signature for mobile and desktop?",
    a: "Ideally, yes — but in practice, most email clients don't give you the tools to serve truly different signatures based on device. What you can control is your outgoing signature: on desktop, use your full HTML signature. In your mobile email app's settings, configure a shorter plain-text signature with just your name, title, and phone number. This means recipients who get your desktop emails see the full signature, and recipients who get your mobile replies see a clean minimal one. It's not fully automatic, but it's the most practical approach given how mobile email apps work.",
  },
  {
    q: "How do I make social media icons the right size on mobile?",
    a: "Social icons in email signatures should be 24x24px minimum on mobile — anything smaller is too small to tap reliably. Apple's Human Interface Guidelines recommend a minimum tap target of 44x44px, though your icon doesn't need to be that large if there's adequate spacing around it. Space your social icons at least 8px apart to prevent accidental taps on the wrong one. Use PNG icons at 2x resolution (48x48px file displayed at 24x24px) for retina sharpness. Don't use more than 4-5 social icons — a row of 8 tiny icons is unusable on a phone and looks crowded everywhere.",
  },
  {
    q: "My email signature has a disclaimer. How do I handle it on mobile?",
    a: "Legal disclaimers in email signatures are often longer than the rest of the signature and become a scrolling nightmare on mobile. Keep the disclaimer text at 11px — it's below the ideal reading size but acceptable for legal text that recipients rarely read in detail. Set the text color to a lighter gray (#9ca3af or similar) to visually de-emphasize it. Put the disclaimer below a thin horizontal rule to separate it from your actual contact info. If your legal team allows it, consider a shorter disclaimer for mobile — though in practice most companies use the same text everywhere to ensure legal coverage.",
  },
];

export default function EmailSignatureMobileFriendlyPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Mobile Friendly Email Signature", url: "https://neatstamp.com/email-signature-mobile-friendly" },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-10 text-slate-800">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-slate-700 underline underline-offset-2">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-700 font-medium">Mobile Friendly Email Signature</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
          Mobile Friendly Email Signature: How to Design One That Works on Every Phone
        </h1>
        <p className="text-slate-500 text-sm mb-8">Updated March 2026 · 18 min read</p>

        {/* ── INTRO ── */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-4">
            61.9% of emails are opened on mobile devices. That number has been climbing for years
            and isn&apos;t going back down. If your email signature was designed only for a desktop screen,
            you&apos;re presenting a broken first impression to more than half the people you email.
          </p>
          <p className="leading-relaxed mb-4">
            A mobile-unfriendly signature has a few recognizable failure modes. The most common one:
            a logo that&apos;s so wide it forces horizontal scrolling. Or text set at 11px that becomes
            completely illegible on a phone held at arm&apos;s length. Or a two-column layout that gets
            squeezed into a 375px screen and collapses into an unreadable mess. Or social media icons
            so small and close together that tapping the LinkedIn one also hits the Twitter one.
          </p>
          <p className="leading-relaxed mb-4">
            The good news is that building a mobile-friendly signature isn&apos;t technically complicated.
            Most of the fixes are about design decisions — maximum widths, font sizes, touch target
            sizes, and image resolution — rather than complex responsive CSS. Email clients on mobile
            have limited CSS support anyway, so simple is better.
          </p>
          <p className="leading-relaxed mb-4">
            This guide covers the specific changes that make the biggest difference on phones,
            the differences between iOS and Android rendering, how Outlook Mobile handles signatures,
            and what to do about the Gmail mobile app&apos;s limitation with HTML signatures.
          </p>
          <p className="leading-relaxed">
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              NeatStamp&apos;s editor
            </Link>{" "}
            generates mobile-optimized HTML automatically — every signature it exports includes
            proper image sizing, minimum font sizes, and tap-friendly spacing. But understanding
            why these choices matter helps you make better decisions regardless of what tool you use.
          </p>
        </section>

        {/* ── WHY MOBILE SIGNATURES ARE DIFFERENT ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why mobile email signatures are different from desktop</h2>

          <p className="leading-relaxed mb-4">
            The core issue is screen width. A desktop email client might display the reading pane
            at 800-1200px wide. A phone screen is 320-430px wide in portrait mode (the way most
            people read email on their phones). An email signature designed with a fixed 600px width
            for desktop is 50% wider than a phone screen can comfortably show.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">What email clients do when content is too wide</h3>
          <p className="leading-relaxed mb-4">
            Different mobile email clients handle content that&apos;s wider than the screen in
            different ways. Gmail on Android scales the entire email down to fit — which means your
            carefully chosen 14px font becomes 8px after scaling, and everything looks tiny. Apple
            Mail on iOS does something similar. Outlook Mobile clips the content and adds horizontal
            scroll. None of these are good outcomes.
          </p>
          <p className="leading-relaxed mb-4">
            The solution isn&apos;t responsive CSS (though that helps in clients that support it).
            The primary solution is designing to a maximum width of 480px so your signature fits
            mobile screens without requiring any scaling or clipping. 480px is narrow enough for
            all modern smartphones while still giving you enough space for a logo and contact info
            side by side.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Touch targets vs. click targets</h3>
          <p className="leading-relaxed mb-4">
            On desktop, a user can precisely click on a link 12px tall with a mouse cursor. On a
            phone, they&apos;re using a finger, which has a contact area of roughly 44-57px. A phone
            number displayed as 12px text with no padding around it is nearly impossible to tap
            reliably. Small social media icons packed tightly together lead to constant mis-taps.
          </p>
          <p className="leading-relaxed mb-4">
            Apple&apos;s Human Interface Guidelines recommend a minimum tap target of 44x44 points.
            Google&apos;s Material Design recommends 48x48dp. Your individual signature links don&apos;t need
            to be that large visually, but they need enough padding and spacing around them to be
            tappable without frustration. For social icons, 24x24px with 8px spacing between them
            is a workable minimum. For the phone number link, adding
            <code className="bg-slate-100 px-1 rounded text-sm"> padding: 4px 0</code> above and below
            gives the finger something to land on.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">iOS vs. Android email rendering differences</h3>
          <p className="leading-relaxed mb-4">
            Apple Mail on iOS and the built-in Samsung/Android email apps are generally the most
            forgiving mobile email clients — they render HTML well and handle most CSS that works
            in browsers. The Gmail app on Android has more quirks: it has historically auto-sized
            fonts in ways that ignore your CSS, and it handles certain image layouts differently.
            The most reliable cross-platform approach is to keep your signature HTML simple — tables,
            inline CSS, explicit widths — rather than relying on modern CSS that may or may not work
            on any given Android email app.
          </p>
          <p className="leading-relaxed mb-4">
            For{" "}
            <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
              Gmail specifically
            </Link>
            , note that the Gmail app on Android renders emails in a restricted environment that
            can alter font sizes, particularly for text below 13px. Gmail&apos;s iOS app behaves
            somewhat differently from Android. If your primary recipient base is Gmail users on
            mobile, test on both platforms.
          </p>
        </section>

        {/* ── STEP BY STEP ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to build a mobile-friendly email signature: step by step</h2>

          <p className="leading-relaxed mb-6">
            These steps go from the most impactful changes to the refinements. If you only do the
            first three, you&apos;ll already have a significantly better mobile experience than most
            email signatures out there.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 1: Set your signature width to 480px maximum</h3>
          <p className="leading-relaxed mb-4">
            Change your outer signature table width from 600px (or whatever it currently is) to
            480px. Set <code className="bg-slate-100 px-1 rounded text-sm">width="480"</code> as the
            HTML attribute and <code className="bg-slate-100 px-1 rounded text-sm">style="width:480px;max-width:100%;"</code>
            as the inline style. The <code className="bg-slate-100 px-1 rounded text-sm">max-width:100%</code>
            part is the responsive piece — it lets the signature shrink below 480px if the screen is
            narrower, rather than overflowing. Many older Outlook versions ignore max-width (they
            respect the pixel width attribute instead), but for mobile clients it&apos;s essential.
          </p>
          <p className="leading-relaxed mb-4">
            For your images, add
            <code className="bg-slate-100 px-1 rounded text-sm"> style="max-width:100%;height:auto;"</code>
            to every img tag in addition to the explicit width and height attributes. This lets images
            scale down proportionally on narrow screens while maintaining their intended size on wider
            ones.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 2: Set minimum font size to 14px</h3>
          <p className="leading-relaxed mb-4">
            Every text element in your signature should be at least 14px. Your name should be 16px
            or larger. Check every p tag and td tag with text content. A common mistake I see is
            people setting job titles or contact details at 12px because they want a visual hierarchy
            effect — the secondary information looks smaller and de-emphasized. On mobile, 12px is
            genuinely unreadable without zooming. Achieve hierarchy through color and weight instead:
            your name in 16px bold, job title in 14px regular weight in a lighter gray, contact
            details in 14px regular. The size difference between 16px and 14px reads as hierarchy
            on mobile without making anything illegible.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 3: Make all contact info tap-to-action</h3>
          <p className="leading-relaxed mb-4">
            This is the most practical UX improvement you can make for mobile users:
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-4 text-slate-700">
            <li>
              <strong>Phone number:</strong>{" "}
              <code className="bg-slate-100 px-1 rounded text-sm">
                &lt;a href=&quot;tel:+15551234567&quot; style=&quot;color:#1d4ed8;text-decoration:none;&quot;&gt;
                +1 555 123 4567&lt;/a&gt;
              </code>
              — tap to call opens the phone dialer immediately.
            </li>
            <li>
              <strong>Email address:</strong>{" "}
              <code className="bg-slate-100 px-1 rounded text-sm">
                &lt;a href=&quot;mailto:you@company.com&quot;&gt;
              </code>
              — opens the email composer.
            </li>
            <li>
              <strong>Physical address:</strong> link to Google Maps or Apple Maps with the address
              URL-encoded — tap to navigate.
            </li>
            <li>
              <strong>Website:</strong> standard{" "}
              <code className="bg-slate-100 px-1 rounded text-sm">href</code> link — tap to open in browser.
            </li>
            <li>
              <strong>Calendar/meeting link:</strong> if you include a Calendly or Cal.com link,
              make it a full clickable link, not just displayed text.
            </li>
          </ul>
          <p className="leading-relaxed mb-4">
            The tel: link is the one I see missing most often. A business contact reading your email
            on their phone who wants to call you should be able to tap once. Making them memorize or
            type your number is friction you can eliminate for free.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 4: Use retina-resolution images</h3>
          <p className="leading-relaxed mb-4">
            For every image in your signature, create a version that&apos;s 2x the display size. If your
            logo displays at 160px wide, export it at 320px wide and set{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">width="160"</code> in the HTML.
            If your profile photo displays at 80x80px, use a 160x160px source image. This 2x rule
            applies to all images: logos, profile photos, social icons, banner images.
          </p>
          <p className="leading-relaxed mb-4">
            Keep file sizes lean despite the larger dimensions. A well-compressed PNG logo at 320px
            wide should be 20-50KB. A JPEG profile photo at 160x160px should be 10-25KB. Large
            images slow down loading on mobile data connections and can get flagged by spam filters.
            See the{" "}
            <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
              email signature size guide
            </Link>{" "}
            for exact recommended file sizes.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 5: Simplify multi-column layouts for mobile</h3>
          <p className="leading-relaxed mb-4">
            A two-column signature with a logo on the left and three lines of contact info on the
            right looks clean on a 1200px desktop screen. On a 375px phone screen, each column is
            under 188px — which squashes the logo and makes the text line-wrap unpredictably. The
            best mobile layout is single-column: logo on top, name and title below, then contact
            details stacked vertically.
          </p>
          <p className="leading-relaxed mb-4">
            You can achieve a responsive single-column-on-mobile layout using a media query that
            stacks the columns when the screen is narrow — but this only works in email clients
            that support media queries (Apple Mail, most), not in Gmail or Outlook on Windows.
            The practical compromise: design a single-column layout at 480px that works on both
            desktop and mobile. It might not be as visually refined as a two-column desktop layout,
            but it works everywhere reliably.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 6: Increase spacing between tap targets</h3>
          <p className="leading-relaxed mb-4">
            Add at least 8px of padding above and below each clickable element. For social icon rows,
            space icons at least 8px apart horizontally. A common pattern is to wrap each social
            icon in a td with 4px of horizontal padding on each side:{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">style="padding:0 4px;"</code>. This
            gives each icon 8px of space between it and its neighbor, making them individually
            tappable without accidentally activating the adjacent one.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 7: Configure your mobile email app signature separately</h3>
          <p className="leading-relaxed mb-4">
            For Gmail on Android and iOS, your HTML signature set on desktop won&apos;t be used when
            you compose from the app. Set up a plain-text mobile signature in the app settings:{" "}
            <em>Gmail app &gt; Menu &gt; Settings &gt; [your account] &gt; Signature settings</em>.
            Keep this short: your name, title, phone number (as plain text), and company website.
            Four lines maximum. Plain text only — no HTML or formatting.
          </p>
          <p className="leading-relaxed mb-4">
            For Apple Mail on iPhone, your configured email signature (set in Settings &gt; Mail &gt;
            Signature) will be sent as HTML if you&apos;ve set it up that way, or as plain text.
            Apple Mail preserves rich text signatures made in the Mail settings interface.
            See the{" "}
            <Link href="/email-signature-apple-mail" className="text-blue-600 hover:underline">
              Apple Mail signature guide
            </Link>{" "}
            for the full setup process.
          </p>
        </section>

        {/* ── COMMON PROBLEMS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common mobile signature problems and solutions</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: signature forces horizontal scrolling on iPhone</h3>
          <p className="leading-relaxed mb-4">
            Your signature table has a fixed pixel width wider than the phone screen. Check every
            table, td, and img element for explicit pixel widths wider than 480px. Also check that
            you&apos;re not missing <code className="bg-slate-100 px-1 rounded text-sm">max-width:100%</code>
            on images and the outer table wrapper. A single wide image without max-width will cause
            the entire email to scroll horizontally on iOS.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: text is tiny on Android</h3>
          <p className="leading-relaxed mb-4">
            Two possible causes: font sizes below 13px (Android&apos;s Gmail app auto-scales these, and
            the scaling isn&apos;t always accurate) or the email is rendering wider than the screen, causing
            Gmail to scale the entire message down to fit. Fix font sizes to 14px minimum. Fix widths
            to 480px maximum. Both together usually resolve the tiny text issue.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: logo looks blurry on iPhone Pro</h3>
          <p className="leading-relaxed mb-4">
            You&apos;re using a 1x resolution image on a 3x retina display. iPhone Pro models and some
            Android flagship phones have 3x pixel density. For those devices, you&apos;d technically need
            a 3x image, but 2x is a practical compromise that looks good on all retina screens
            including 3x. Export your logo at 2x the display width and ensure the file is compressed
            properly. If you&apos;re unsure whether your images are sharp enough, see the{" "}
            <Link href="/blog/email-signature-images-not-displaying" className="text-blue-600 hover:underline">
              guide on email signature image issues
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: Outlook Mobile shows images too large</h3>
          <p className="leading-relaxed mb-4">
            In Outlook Mobile, images without max-width set can display at their full natural width,
            ignoring the HTML width attribute. Add
            <code className="bg-slate-100 px-1 rounded text-sm"> style="max-width:100%;width:160px;height:auto;"</code>
            to your img tags. The max-width:100% prevents overflow; the explicit width is the fallback
            for clients that ignore max-width (Outlook on Windows). Using both gives you coverage
            across different client behaviors. For more Outlook-specific issues, the{" "}
            <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
              Outlook compatible signature guide
            </Link>{" "}
            covers them in detail.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: two-column layout looks broken on mobile</h3>
          <p className="leading-relaxed mb-4">
            When each column is squeezed below ~180px on mobile, text wraps unpredictably and logos
            get compressed. The cleanest solution is to switch to a single-column layout at 480px
            maximum width. If your brand guidelines require the two-column look on desktop, you have
            three options: accept that it looks different on mobile (and design it to look at least
            acceptable), use a media query to stack columns on narrow screens (works in Apple Mail,
            not Gmail), or build two separate versions and serve one via your mobile email app
            settings.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: social icons are too small to tap</h3>
          <p className="leading-relaxed mb-4">
            Increase social icon display size to at least 24x24px and add 6-8px padding around
            each one. If you have more than 5 social icons, consider cutting the list — pick the
            two or three platforms most relevant to your work. A row of 8 tiny social icons is
            frustrating on mobile and visually cluttered everywhere. For{" "}
            <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
              business signatures
            </Link>
            , LinkedIn and your company website are usually the only two worth including.
          </p>
        </section>

        {/* ── PRO TIPS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pro tips for mobile email signatures</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 1: Test on a real phone in airplane mode</h3>
          <p className="leading-relaxed mb-4">
            Send yourself a test email, then view it on your phone on a slow connection or in
            airplane mode. This reveals whether images load quickly enough to be practical and
            whether the layout holds up without images (recipients on very slow connections or with
            image loading disabled in their email app). A good mobile signature should show the right
            information even if images fail to load — always set descriptive alt text on every image.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 2: Include your mobile number, not just your office number</h3>
          <p className="leading-relaxed mb-4">
            If you communicate with clients who are primarily mobile, they expect to reach you on
            mobile too. Including your direct mobile number in your signature — linked with a tel:
            tag — makes it trivial for a client to tap and call you directly from your email.
            This small detail is something{" "}
            <Link href="/email-signature-for-freelancers" className="text-blue-600 hover:underline">
              freelancers
            </Link>{" "}
            and consultants often get right but large-company employees often overlook.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 3: Preview in the actual email apps your clients use</h3>
          <p className="leading-relaxed mb-4">
            Your clients are not all using the same app. If you work with corporate clients, they&apos;re
            probably using Outlook Mobile or the native iOS Mail app. If you work with tech startups,
            they&apos;re probably using Gmail on Android. Ask a few key contacts what email app they use,
            then specifically test your signature in those apps. Five minutes of targeted testing is
            worth more than hours of theoretical optimization.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 4: Keep the whole signature under 100KB of HTML</h3>
          <p className="leading-relaxed mb-4">
            On mobile data, large HTML files load noticeably slowly. Email signature HTML should be
            lean. Avoid base64 images (they bloat the HTML file size dramatically). Keep inline CSS
            concise — don&apos;t include CSS properties that aren&apos;t doing anything. A well-built email
            signature should have an HTML footprint of under 5KB for the HTML itself, with images
            loaded externally via URL. Total email size under 100KB is a good target.
          </p>
        </section>

        {/* ── SPECIFIC SITUATIONS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Mobile signatures in specific situations</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Yahoo Mail on mobile</h3>
          <p className="leading-relaxed mb-4">
            Yahoo Mail&apos;s mobile app is less common than Gmail or Apple Mail but still used by a
            significant audience. It renders HTML emails reasonably well but has some quirks with
            CSS. The table-based, inline-CSS approach described throughout this guide works in
            Yahoo Mail. For Yahoo-specific signature setup, see the{" "}
            <Link href="/email-signature-yahoo" className="text-blue-600 hover:underline">
              Yahoo email signature guide
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Gmail on Android vs. Gmail on iPhone</h3>
          <p className="leading-relaxed mb-4">
            These are the same app in terms of email composition behavior — both use plain text
            mobile signatures set in the app settings. But rendering received emails works slightly
            differently. Android&apos;s WebView (which Gmail uses to render emails) has historically been
            more aggressive about font size adjustments. On iPhone, the Gmail app tends to render
            HTML emails closer to the desktop Gmail web experience. If you notice font size issues
            specifically on Android but not iPhone, reduce your absolute font sizes slightly and
            check whether you have any text below 13px.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Company-wide mobile signature standards</h3>
          <p className="leading-relaxed mb-4">
            If you&apos;re standardizing signatures across a company, mobile optimization needs to be in
            the template requirements before distribution. One person on the team using a 600px-wide
            template they made themselves will undermine the whole effort. Build the mobile rules
            into the master template and then use deployment tools to push it consistently. The{" "}
            <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
              team email signature management guide
            </Link>{" "}
            covers how to do this with{" "}
            <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
              business-grade signature management
            </Link>
            .
          </p>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/email-signature-gmail", label: "Gmail Email Signature Guide" },
              { href: "/email-signature-apple-mail", label: "Apple Mail Email Signature" },
              { href: "/email-signature-yahoo", label: "Yahoo Email Signature Guide" },
              { href: "/email-signature-outlook", label: "Outlook Email Signature Guide" },
              { href: "/email-signature-outlook-compatible", label: "Outlook Compatible Signatures" },
              { href: "/email-signature-dark-mode-compatible", label: "Dark Mode Compatible Signatures" },
              { href: "/email-signature-for-business", label: "Business Email Signatures" },
              { href: "/email-signature-for-freelancers", label: "Freelancer Email Signatures" },
              { href: "/blog/email-signature-size", label: "Email Signature Size Guide" },
              { href: "/blog/email-signature-best-practices", label: "Best Practices Guide" },
              { href: "/templates", label: "Browse Signature Templates" },
              { href: "/examples", label: "Signature Examples Gallery" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                {label} →
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
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

      </article>
    </>
  );
}
