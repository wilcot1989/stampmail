import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Dark Mode Email Signature: Fix Invisible Logos & Broken Colors",
  description:
    "Your email signature breaks in dark mode. Here's why it happens in Gmail, Outlook, and Apple Mail — and exactly how to fix it.",
  alternates: { canonical: "https://neatstamp.com/email-signature-dark-mode-compatible" },
};

const faqs = [
  {
    q: "Why does my logo disappear in dark mode emails?",
    a: "This happens when you use a PNG with a transparent background and your logo is white or light-colored. Dark mode inverts or darkens the background behind your image, which makes a white logo on a transparent PNG completely invisible — it blends into the dark background. The fix is to either add a solid background color to your PNG (a white or brand-colored rectangle behind the logo), switch to a version of your logo that has a dark-colored version, or place the image inside an HTML table cell with a forced background color using inline CSS. NeatStamp's dark mode preview shows you exactly how this will look before you send.",
  },
  {
    q: "Does Gmail's dark theme invert my signature colors?",
    a: "It depends. Gmail on Android and iOS has a feature called 'smart inversion' that tries to invert colors that look like they belong to a light background, while leaving photographs alone. This means your blue text might turn orange, your black border might turn white, and your carefully chosen brand colors go haywire. Gmail on desktop (web) is less aggressive — it mainly changes the email background to dark gray without fully inverting content. The safest approach is to test your signature in the Gmail mobile app with dark mode enabled, which is where the most aggressive color manipulation happens.",
  },
  {
    q: "How do I stop Outlook from inverting my email signature in dark mode?",
    a: "Outlook's dark mode is the most unpredictable of all the email clients. It uses a feature called 'Color Adjustment' that tries to detect light backgrounds and convert them to dark. To stop Outlook from touching your signature colors, you can add color-scheme: light to your CSS, but Outlook doesn't reliably respect it. The more bulletproof approach is to avoid pure white backgrounds (#ffffff) in your signature table cells — use a very light gray like #f9fafb instead, which Outlook's algorithm is less likely to flag as 'needs inversion'. NeatStamp generates Outlook-safe HTML with these workarounds built in.",
  },
  {
    q: "What's the best image format for dark mode email signatures?",
    a: "PNG with a solid background is the most reliable choice for dark mode. If you need your logo to work on both light and dark backgrounds, use a version with a visible background color rather than a transparent one. SVG images are not supported by Outlook at all, so avoid those. JPEGs are fine for photographs but don't support transparency. Some advanced email designers use conditional comments to serve different images to Outlook versus other clients — but for most people, a PNG with a white or brand-colored background is the practical answer. Keep your image under 80KB for fast loading.",
  },
  {
    q: "Can I use CSS to make my signature dark mode compatible?",
    a: "Yes, with limitations. The CSS media query @media (prefers-color-scheme: dark) works in Apple Mail and some other clients, but Gmail, Yahoo, and Outlook largely ignore it. This means CSS-based dark mode switching is not a reliable cross-client solution for email. What does work reliably across all clients is designing your signature so it looks good regardless of whether dark mode inverts it — that means using images with solid backgrounds, avoiding pure white or pure black text on transparent areas, and keeping your HTML structure table-based with explicit inline background colors. Think of it as dark-mode-resistant rather than dark-mode-responsive.",
  },
  {
    q: "How do I test my signature in dark mode before sending?",
    a: "You have a few options. The most thorough is to use NeatStamp's built-in dark mode preview, which shows you a simulated dark mode render alongside the normal version before you export. Beyond that: send yourself a test email, switch your phone to dark mode, and open it in Gmail and Apple Mail. On desktop, you can switch your OS to dark mode and check the web version of Gmail and Apple Mail. If you use Outlook, enable dark mode in the Outlook desktop app under File > Office Account > Office Theme > Black. Each client behaves slightly differently, so test at least two.",
  },
  {
    q: "Why is my signature text turning a different color in dark mode?",
    a: "When your signature text is set to a specific color via inline CSS — say, color: #1a1a1a (very dark gray) — some email clients will invert or replace that color in dark mode because they detect it as a color meant for a light background. Gmail on mobile is particularly aggressive about this. The way to reduce this is to use mid-range colors instead of near-black or near-white. For example, color: #374151 (a medium dark gray) is less likely to be aggressively inverted than color: #111111. It's counterintuitive, but slightly backing off from pure black can make your text more stable across themes.",
  },
  {
    q: "Does the NeatStamp dark mode preview show all email clients?",
    a: "NeatStamp's dark mode preview simulates the two most common scenarios: Gmail's smart inversion behavior and Apple Mail's full dark mode rendering. These cover the majority of cases where dark mode breaks signatures. Outlook's dark mode is handled separately through Outlook-safe HTML generation — NeatStamp uses table-based layouts with inline background colors that resist Outlook's color adjustment algorithm. For full multi-client testing, you'd need a tool like Litmus or Email on Acid, but for most users NeatStamp's preview catches 90% of real-world dark mode issues.",
  },
  {
    q: "Should I create two separate signatures — one for light mode and one for dark mode?",
    a: "In theory, yes. In practice, you can't reliably detect which mode a recipient is using and serve a different signature accordingly, because most email clients strip dynamic CSS. The better approach is a single signature designed to work in both. That means: solid backgrounds on images, mid-range text colors, explicit background colors on all table cells, and avoiding color combinations that become unreadable when inverted. NeatStamp's templates are built with this in mind — they use a conservative color palette that holds up in both light and dark environments without needing two separate versions.",
  },
  {
    q: "My signature has a colored banner image. Will dark mode break it?",
    a: "Banner images (photographs or designed graphics saved as JPEGs or PNGs with solid backgrounds) are generally safe in dark mode, because email clients don't invert actual image pixels — they leave photos alone. Where things break is if your banner is a PNG with large transparent areas, or if you've placed text over a transparent section. If your banner has a solid background color baked in (not transparent), it should look the same in dark mode as in light mode. If you're using a PNG with transparent areas and placing it on a white table cell background, add an explicit bgcolor attribute to that cell to prevent dark mode from replacing white with dark gray.",
  },
];

export default function EmailSignatureDarkModePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Dark Mode Email Signature", url: "https://neatstamp.com/email-signature-dark-mode-compatible" },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-10 text-slate-800">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-slate-700 underline underline-offset-2">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-700 font-medium">Dark Mode Email Signature</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
          Dark Mode Email Signature: Why Yours Breaks and How to Fix It
        </h1>
        <p className="text-slate-500 text-sm mb-8">Updated March 2026 · 18 min read</p>

        {/* ── INTRO ── */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-4">
            You spent time getting your email signature looking exactly right. Logo, colors, clean
            layout. Then someone using dark mode opens your email and tells you your company logo has
            vanished, your text is unreadable, or the whole thing looks like a photographic negative.
            It&apos;s a specific kind of frustrating, because it works perfectly on your own screen.
          </p>
          <p className="leading-relaxed mb-4">
            Dark mode email signatures break for a handful of predictable reasons, and once you
            understand what&apos;s happening, the fixes are straightforward. The problem is that different
            email clients handle dark mode completely differently — Gmail on Android does something
            different from Gmail on desktop, Apple Mail does something different from both of them, and
            Outlook does something different from everything else. There&apos;s no single fix that covers all
            of them at once, but there&apos;s a way to design your signature so it holds up well across all
            of them.
          </p>
          <p className="leading-relaxed mb-4">
            This guide covers exactly what each major client does to your signature in dark mode,
            what specific changes to make to your images and HTML, and how to test before you send.
            The most common culprit — and the one I see trip people up constantly — is the transparent
            PNG problem, and we&apos;ll get to that in detail.
          </p>
          <p className="leading-relaxed">
            If you want to skip ahead and just see how your signature looks in dark mode right now,{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              NeatStamp&apos;s editor
            </Link>{" "}
            has a built-in dark mode preview that shows you both versions side by side before you export.
            It&apos;s the fastest way to spot the exact elements that need fixing.
          </p>
        </section>

        {/* ── WHY DARK MODE BREAKS SIGNATURES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why dark mode breaks email signatures</h2>

          <p className="leading-relaxed mb-4">
            Dark mode in email clients isn&apos;t a simple &quot;invert everything&quot; switch — though some
            clients get close to that. What&apos;s actually happening is that each email client applies its
            own algorithm to decide which parts of an email should be darkened and which should be
            left alone. The result is wildly inconsistent, and signature HTML is particularly
            vulnerable because it usually relies on color choices that made sense for light mode only.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Gmail dark theme: smart inversion</h3>
          <p className="leading-relaxed mb-4">
            Gmail on Android and iOS uses what Google calls &quot;smart inversion.&quot; The app analyzes your
            email&apos;s color palette and tries to invert anything that appears to be designed for a
            light background. This means backgrounds go from white to dark gray, and text colors
            that were dark get flipped to lighter variants. The problem is that &quot;smart&quot; is doing
            a lot of heavy lifting there — it regularly makes wrong decisions about signature elements.
          </p>
          <p className="leading-relaxed mb-4">
            In practice, Gmail&apos;s smart inversion affects backgrounds, borders, and non-image colors.
            Your brand color (#0066cc, for example) might get transformed into something completely
            different because the algorithm decides it needs to be lighter for contrast. A black
            horizontal rule in your signature might flip to white. Text you set to dark gray ends up
            light gray. Gmail on desktop (web) is more conservative — it mainly darkens the email
            canvas background without touching the content as aggressively.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Outlook dark mode: the color adjustment algorithm</h3>
          <p className="leading-relaxed mb-4">
            Outlook&apos;s dark mode behavior is the hardest to predict and the most disruptive to
            email signatures. The desktop app for Windows has a feature called &quot;Color Adjustment&quot;
            that detects light-colored backgrounds and converts them to dark. Unlike Gmail, which
            works at the email content level, Outlook can apply these changes at the HTML rendering
            level — meaning your carefully set inline CSS background colors can be overridden.
          </p>
          <p className="leading-relaxed mb-4">
            A white table cell background (#ffffff) is the most common trigger. Outlook sees a white
            background, flags it as a light-mode element, and converts it to a dark background — often
            a dark gray or near-black. If your signature has white text on a colored button, Outlook
            might leave the button color alone but also darken it, making the text harder to read.
            The full Outlook dark mode experience varies between Outlook 2016, Outlook 2019,
            Outlook 365 on Windows, and Outlook on Mac — they all behave somewhat differently.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Apple Mail: full color inversion</h3>
          <p className="leading-relaxed mb-4">
            Apple Mail on iOS and macOS is the most aggressive of the major clients. When a user has
            dark mode enabled, Apple Mail performs a near-complete inversion of email content unless
            the HTML explicitly declares support for dark mode via{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">color-scheme: light dark</code>. Without
            that declaration, Apple Mail essentially flips your entire signature: white backgrounds
            become black, black text becomes white, and your brand colors get their hue and lightness
            values adjusted.
          </p>
          <p className="leading-relaxed mb-4">
            Apple Mail is the one client where CSS media queries for dark mode (
            <code className="bg-slate-100 px-1 rounded text-sm">@media (prefers-color-scheme: dark)</code>)
            actually work and are the right tool. But if your goal is a signature that works across
            all clients without complex conditional CSS, designing for light-mode-resistance is
            still the more practical path. More on that in the step-by-step section.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">The transparent PNG problem</h3>
          <p className="leading-relaxed mb-4">
            This is the issue I see most often, and it&apos;s the one that completely blindsides people
            who haven&apos;t thought about dark mode. When you have a logo saved as a PNG with a
            transparent background, your signature HTML places that image over whatever background
            color the email has. In light mode, the background is white, so a dark-colored logo on
            transparent PNG looks fine. In dark mode, the background behind that image goes dark — and
            if your logo is white or light-colored, it becomes invisible.
          </p>
          <p className="leading-relaxed mb-4">
            This isn&apos;t a rendering bug — it&apos;s working exactly as designed. The email client is
            showing a transparent image on a dark background, and your white logo just doesn&apos;t appear
            against dark gray. The fix is to either bake a background color into the PNG itself (no
            longer transparent), add an explicit background color to the HTML element containing the
            image, or use a dark-colored version of your logo for the signature. All three approaches
            work. The first two are the easiest.
          </p>
        </section>

        {/* ── STEP BY STEP ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to create a dark-mode-safe email signature: step by step</h2>

          <p className="leading-relaxed mb-6">
            The goal here isn&apos;t a signature that looks different in light vs. dark mode. The goal
            is a signature that looks acceptable in both — without needing conditional CSS or
            separate image versions for different clients. Here&apos;s how to get there.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 1: Fix your logo image first</h3>
          <p className="leading-relaxed mb-4">
            Open your logo file and check whether it has a transparent background. If it does, you
            have a choice: add a solid background color to the image, or add an explicit background
            to the HTML container. The simplest fix is to open the image in any image editor
            (Photoshop, Canva, even macOS Preview) and add a white or brand-colored rectangle behind
            the logo before exporting.
          </p>
          <p className="leading-relaxed mb-4">
            If you want to keep the transparent PNG (maybe it&apos;s used elsewhere and you don&apos;t want
            to create a separate version), wrap the image in a table cell with an explicit
            background color:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-700 whitespace-pre">{`<td bgcolor="#ffffff" style="background-color:#ffffff;">
  <img src="your-logo.png" width="120" alt="Your Company" />
</td>`}</code>
          </div>
          <p className="leading-relaxed mb-4">
            Use both the <code className="bg-slate-100 px-1 rounded text-sm">bgcolor</code> attribute
            and the inline <code className="bg-slate-100 px-1 rounded text-sm">style</code> property.
            The <code className="bg-slate-100 px-1 rounded text-sm">bgcolor</code> attribute is an old
            HTML attribute that Outlook respects even when it ignores CSS. The inline style is for
            modern clients. Using both is the standard &quot;belt and suspenders&quot; approach in email HTML.
          </p>
          <p className="leading-relaxed mb-4">
            Resize your logo to a maximum of 200px wide (160px is a good standard size) and export
            it at 2x resolution if you want it to look sharp on retina screens — that means a 320px
            wide image displayed at 160px. Keep the file under 60KB. Larger files load slowly and
            can trigger spam filters.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 2: Use mid-range colors for text</h3>
          <p className="leading-relaxed mb-4">
            Pure black (#000000 or #111111) text is the most likely to get aggressively inverted by
            Gmail&apos;s smart inversion algorithm. Pure white backgrounds are the most likely to be
            converted by Outlook. The practical fix is to avoid the extremes. For body text in your
            signature, use <code className="bg-slate-100 px-1 rounded text-sm">#374151</code> or{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">#4b5563</code> instead of black.
            These are dark enough to be clearly readable on white, but not &quot;black enough&quot; to trigger
            aggressive inversion.
          </p>
          <p className="leading-relaxed mb-4">
            For your name (which is usually the most prominent text element), using your brand color
            is fine — but test it. Saturated colors like deep red (#cc0000) or deep blue (#003399)
            can shift noticeably under dark mode. A slightly lighter or more muted variant of your
            brand color tends to survive inversion better because it&apos;s not an extreme value.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 3: Set explicit background colors on every table cell</h3>
          <p className="leading-relaxed mb-4">
            The most reliable dark mode protection comes from being explicit about backgrounds. Every
            table cell in your signature that should have a white or near-white background should have
            both a <code className="bg-slate-100 px-1 rounded text-sm">bgcolor</code> attribute and a
            background-color inline style set explicitly. Don&apos;t rely on the default white background —
            state it explicitly.
          </p>
          <p className="leading-relaxed mb-4">
            Here&apos;s the key insight: avoid pure white (#ffffff) for the main signature wrapper
            background. Use a very light gray like #fafafa or #f8f9fa instead. In light mode, you
            can&apos;t tell the difference. But Outlook&apos;s color adjustment algorithm is specifically
            tuned to convert #ffffff backgrounds — lighter grays are less likely to be flagged.
            This single change reduces Outlook dark mode disruption significantly.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-700 whitespace-pre">{`<table cellpadding="0" cellspacing="0" width="100%"
  bgcolor="#fafafa" style="background-color:#fafafa;">
  <tr>
    <td style="padding:16px;">
      <!-- Your signature content -->
    </td>
  </tr>
</table>`}</code>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 4: Add the color-scheme meta tag for Apple Mail</h3>
          <p className="leading-relaxed mb-4">
            Apple Mail respects the CSS color-scheme declaration. Adding this to your signature&apos;s
            HTML tells Apple Mail that your signature is designed for light mode only, which prevents
            the aggressive full-inversion behavior:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-700 whitespace-pre">{`<div style="color-scheme:light;display:block;">
  <!-- Your signature table here -->
</div>`}</code>
          </div>
          <p className="leading-relaxed mb-4">
            This tells Apple Mail &quot;this content is designed for light mode, please display it as-is.&quot;
            Apple Mail respects this and won&apos;t invert your signature. Gmail and Outlook ignore this
            declaration, but that&apos;s fine — the other fixes handle those clients.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 5: Use NeatStamp&apos;s dark mode preview to check your work</h3>
          <p className="leading-relaxed mb-4">
            Once you&apos;ve made these changes,{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              paste your signature into NeatStamp&apos;s editor
            </Link>{" "}
            and toggle the dark mode preview. You&apos;ll see a side-by-side rendering that simulates
            Gmail&apos;s smart inversion and a general dark background scenario. This catches most issues
            before you go live.
          </p>
          <p className="leading-relaxed mb-4">
            What to look for in the preview: any logos or images that disappear or look wrong,
            text that becomes unreadable (too low contrast), borders or dividers that vanish or become
            too prominent, and link colors that clash with the dark background. Fix each one, then
            run through the preview again.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 6: Send test emails and check on a real device</h3>
          <p className="leading-relaxed mb-4">
            No preview tool replaces a real-device test. Send yourself a test email from your
            signature-equipped account and open it on your phone with dark mode enabled. Check it
            in Gmail (if you use Gmail on mobile), Apple Mail, and any other clients your recipients
            use. Pay attention to whether images load, whether colors have shifted to something
            unacceptable, and whether all text is readable. This takes five minutes and saves you
            the embarrassment of a broken signature.
          </p>
        </section>

        {/* ── COMMON PROBLEMS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common dark mode signature problems and how to solve them</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: logo disappears completely</h3>
          <p className="leading-relaxed mb-4">
            Almost certainly a transparent PNG with a white or light-colored logo. The fix is
            exactly what I described above — add a solid background to either the image file itself
            or the HTML container holding it. If you don&apos;t have access to the original logo file
            and can&apos;t modify it, use the table cell bgcolor approach. If you&apos;re using{" "}
            <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">
              an email signature with a logo
            </Link>
            , this is the number one thing to get right.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: signature text turns an unreadable color</h3>
          <p className="leading-relaxed mb-4">
            Gmail&apos;s smart inversion has decided your text color needs adjusting. This usually
            happens to very dark text (near-black) or to specific brand colors that the algorithm
            flags. Try shifting your text colors slightly — not dramatically, just away from the
            extreme ends of the scale. If you have text set to #0a0a0a, try #2d3748. If you have
            text at #000080 (dark navy), try #1e40af (a medium blue). Mid-range values invert less
            aggressively. Also check our{" "}
            <Link href="/blog/email-signature-dark-mode" className="text-blue-600 hover:underline">
              deeper dive on email signature dark mode behavior
            </Link>{" "}
            for more client-specific color tables.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: Outlook makes my signature background dark</h3>
          <p className="leading-relaxed mb-4">
            Outlook&apos;s color adjustment algorithm is triggering on your white background. Two fixes:
            switch your signature wrapper background from #ffffff to #f8f9fa (near-white but not
            pure white), and make sure you&apos;re using both the bgcolor attribute and inline
            background-color style on every table cell. You can also try adding{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">mso-color-alt: windowtext</code> to
            your CSS, which is a Microsoft-specific property that hints to Outlook to preserve the
            original colors. It doesn&apos;t always work, but it helps in some Outlook versions.
          </p>
          <p className="leading-relaxed mb-4">
            For more Outlook-specific signature issues, the{" "}
            <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
              Outlook email signature guide
            </Link>{" "}
            covers the rendering engine quirks in detail, including what CSS properties Outlook
            simply ignores.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: Apple Mail inverts my entire signature</h3>
          <p className="leading-relaxed mb-4">
            You&apos;re missing the color-scheme declaration. Add{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">style="color-scheme:light;"</code> to
            the outermost wrapper element of your signature. Apple Mail checks for this and respects
            it. Without it, Apple Mail performs a full color inversion on anything it detects as
            &quot;light mode&quot; content. This is the most reliable fix for Apple Mail specifically.
            If you&apos;re also a heavy Apple Mail user, see the{" "}
            <Link href="/email-signature-apple-mail" className="text-blue-600 hover:underline">
              Apple Mail signature guide
            </Link>{" "}
            for additional client-specific tips.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: my social media icons look wrong in dark mode</h3>
          <p className="leading-relaxed mb-4">
            Social media icons are typically small PNGs or SVGs. If they&apos;re using brand colors
            (LinkedIn blue, Twitter black), they tend to be fine. If they&apos;re white icons on
            transparent backgrounds (a common design pattern), they&apos;ll disappear on dark backgrounds
            — same transparent PNG issue as logos. The fix is the same: add solid backgrounds to the
            icons or their container cells. Use the official brand-color versions of social icons
            (LinkedIn blue background, etc.) rather than monochrome white versions.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: my signature looks fine in dark mode on my phone but broken on someone else&apos;s</h3>
          <p className="leading-relaxed mb-4">
            This is a client difference problem. You might be testing in Apple Mail while they&apos;re
            reading in Gmail, or you&apos;re on Android and they&apos;re on iOS. The rendering behavior is
            genuinely different. If you can&apos;t test on their specific client, the best you can do
            is apply all the fixes described in this guide — they reduce the impact across all clients
            even if they don&apos;t completely solve every one. Building your signature with{" "}
            <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
              a professional template
            </Link>{" "}
            that&apos;s already tested across clients is the shortcut here.
          </p>
        </section>

        {/* ── PRO TIPS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pro tips for dark mode email signatures</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 1: Use the same image for light and dark mode, not two separate ones</h3>
          <p className="leading-relaxed mb-4">
            You might be tempted to set up two signature versions with CSS media queries — one for
            light mode, one for dark mode. This is technically possible in Apple Mail and a few
            modern clients, but it doesn&apos;t work in Gmail or Outlook. Don&apos;t invest time in it unless
            your entire recipient base uses Apple Mail. A single well-designed signature that holds up
            in both modes is the right approach for 95% of people.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 2: Avoid gradient backgrounds</h3>
          <p className="leading-relaxed mb-4">
            CSS gradients in email signatures are already fragile because Outlook doesn&apos;t support
            them at all. In dark mode, they become even more unpredictable — email clients trying
            to adjust gradient backgrounds often produce strange results. Stick to solid, flat colors
            for all backgrounds. If you want a visual accent, use a single solid-color stripe rather
            than a gradient. See the{" "}
            <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
              email signature best practices guide
            </Link>{" "}
            for more on what CSS actually works reliably in email.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 3: Set image dimensions explicitly</h3>
          <p className="leading-relaxed mb-4">
            Always set width and height attributes on your signature images. When dark mode causes
            layout recalculation (which happens in some clients), images without explicit dimensions
            can collapse or stretch unexpectedly. Set both:{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">
              width="160" height="40"
            </code>{" "}
            directly on the img tag. This also prevents layout shift while images load. Check the{" "}
            <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
              email signature size guide
            </Link>{" "}
            for exact recommended dimensions for logos, photos, and social icons.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 4: Check if dark mode is making your images load incorrectly</h3>
          <p className="leading-relaxed mb-4">
            Some email clients serve cached versions of images that were rendered in light mode.
            If a recipient has dark mode enabled and sees cached images, they may see an inconsistent
            mix. This is especially relevant for banner images in marketing emails, less so for basic
            signature logos. Keep your image URLs stable — don&apos;t change the URL when you update the
            image, because cached versions will persist. If you update your logo, use a new filename.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 5: Test with real contacts, not just yourself</h3>
          <p className="leading-relaxed mb-4">
            When testing, send to a real contact who uses Outlook on Windows with dark mode enabled
            — if you can. Ask them to screenshot what they see. Outlook&apos;s behavior on Windows is the
            hardest to simulate accurately in preview tools, and an actual screenshot from a real
            user is worth ten simulated previews. Many dark mode signature issues get discovered this
            way long after a signature has been in use.
          </p>
        </section>

        {/* ── SPECIFIC SITUATIONS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Dark mode in specific situations</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Company-wide signatures and dark mode</h3>
          <p className="leading-relaxed mb-4">
            If you&apos;re managing signatures for a whole company, dark mode compatibility needs to be
            part of your template standard. One broken logo in a transparent PNG will propagate
            across hundreds of employees&apos; signatures. Build the dark-mode fixes into your master
            template before you distribute it. See the{" "}
            <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
              team email signature management guide
            </Link>{" "}
            for how to deploy a consistent, pre-tested template to everyone at once.
          </p>
          <p className="leading-relaxed mb-4">
            For business-specific requirements, the{" "}
            <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
              business email signature guide
            </Link>{" "}
            covers branding consistency and how to make sure every employee&apos;s signature looks right
            across all clients.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Freelancers and consultants</h3>
          <p className="leading-relaxed mb-4">
            As a{" "}
            <Link href="/email-signature-for-freelancers" className="text-blue-600 hover:underline">
              freelancer
            </Link>
            , your signature is often the first branded element a new client sees. Getting it wrong
            in dark mode — especially a disappearing logo — sends the wrong signal before you&apos;ve even
            started a project. The good news is that the fixes here are easy to implement once and
            then forget about. Spend 30 minutes getting it right and you won&apos;t have to think about it
            again.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Outlook users in corporate environments</h3>
          <p className="leading-relaxed mb-4">
            Corporate Outlook environments often enforce dark mode at the OS level, meaning everyone
            in that company sees dark mode whether they chose it or not. If you communicate regularly
            with corporate Outlook users — especially in finance, consulting, or large enterprise — dark
            mode compatibility matters more than average. The Outlook-specific fixes (near-white
            backgrounds, dual bgcolor/style attributes) are especially important for this audience.
            The{" "}
            <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
              Outlook email signature guide
            </Link>{" "}
            has more depth on this.
          </p>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/email-signature-outlook", label: "Outlook Email Signature Guide" },
              { href: "/email-signature-gmail", label: "Gmail Email Signature Guide" },
              { href: "/email-signature-apple-mail", label: "Apple Mail Email Signature" },
              { href: "/email-signature-for-business", label: "Business Email Signatures" },
              { href: "/email-signature-for-freelancers", label: "Freelancer Email Signatures" },
              { href: "/blog/email-signature-best-practices", label: "Email Signature Best Practices" },
              { href: "/blog/email-signature-size", label: "Email Signature Size Guide" },
              { href: "/blog/email-signature-images-not-displaying", label: "Fixing Images Not Displaying" },
              { href: "/professional-email-signature", label: "Professional Email Signatures" },
              { href: "/email-signature-with-logo", label: "Email Signatures With Logo" },
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
