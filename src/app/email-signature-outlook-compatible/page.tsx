import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook-Compatible Email Signature Generator",
  description:
    "Why your email signature breaks in Outlook — and how to build one that actually renders correctly every time.",
  alternates: { canonical: "https://neatstamp.com/email-signature-outlook-compatible" },
};

const faqs = [
  {
    q: "Why does my email signature look different in Outlook than in Gmail?",
    a: "Outlook uses Microsoft Word's HTML rendering engine, which is a completely different technology from the web browser engines that Gmail and Apple Mail use. Word's engine was designed to render Microsoft Office documents, not web HTML. It strips or ignores many modern CSS properties — including flexbox, CSS grid, border-radius, many background properties, and more. Gmail renders HTML in a Webkit/Blink engine that's essentially a stripped-down browser. So a signature that looks great in Gmail (where browser HTML is respected) can look completely different in Outlook (where only a limited subset of HTML is rendered). NeatStamp generates table-based HTML with inline CSS that Outlook's engine can handle.",
  },
  {
    q: "Why does Outlook add images as attachments instead of displaying them inline?",
    a: "This happens when images in your signature aren't being properly linked as external URLs — instead, they're embedded or included in a way that Outlook treats as email attachments. The most common cause is using base64-encoded images directly in the HTML. Outlook's email format (TNEF/Winmail.dat) handles these differently depending on settings, and many recipients end up seeing a 'winmail.dat' attachment or the images appear as separate attachments below the email body. The fix is always to host your image externally at a real URL (https://yourdomain.com/logo.png) and reference it with a standard img src tag. Never embed images as base64 in an Outlook signature.",
  },
  {
    q: "Does Outlook support border-radius in email signatures?",
    a: "No. Outlook's Word rendering engine does not support CSS border-radius at all. Any rounded corners you apply will display as sharp right angles in Outlook. This applies to all current Outlook versions on Windows (2016, 2019, 2021, 365). Outlook for Mac is slightly different — it uses WebKit instead of Word's engine, so it supports border-radius fine. If you need a rounded element that displays correctly in Windows Outlook, the workaround is to use a pre-rendered PNG image of the rounded element instead of trying to achieve it with CSS. For buttons in signatures, use a table-based VML button approach (Microsoft's recommended method) rather than a CSS-styled div.",
  },
  {
    q: "How do I stop Outlook from changing my font?",
    a: "Outlook overrides font settings when it doesn't recognize the font you've specified or when your font declarations aren't structured correctly. To prevent this, always specify web-safe fonts as fallbacks: font-family: Arial, Helvetica, sans-serif. If you use a custom brand font, Outlook will fall back to Times New Roman unless you specify a system font as backup. Another common cause is that Outlook applies its default email style to anything that doesn't have an explicit inline font-family declaration. Every text element in your signature should have font-family, font-size, and color set inline — not in a style block at the top, because Outlook partially ignores style blocks.",
  },
  {
    q: "Why are there extra spaces or gaps in my Outlook signature?",
    a: "Outlook's Word engine adds extra padding and spacing to elements in ways that ignore your CSS. The most common culprits: it adds margin below every paragraph element (p tags), it adds default cell padding to table cells, and it sometimes doubles vertical spacing. The fix is to set margin: 0, padding: 0 explicitly on p tags and use br tags for line breaks instead of paragraph spacing. For table cells, set cellpadding='0' cellspacing='0' on every table element and set padding explicitly via inline CSS on each td. Also remove any mso-padding-alt conflicts. A signature built with nested tables and explicit padding on each cell gives you predictable control.",
  },
  {
    q: "What image formats work best in Outlook signatures?",
    a: "JPEG and PNG are the only reliable formats for Outlook signatures. SVG is not supported at all in any version of Outlook on Windows. GIF is supported but can behave unpredictably. WebP is not supported. Use JPEG for photographs (it compresses well, keeps file sizes small) and PNG for logos, icons, and anything needing transparency. Keep image file sizes under 80KB per image. Larger images can cause Outlook to show them as attachments or trigger slow loading that frustrates recipients. Always reference images via absolute HTTPS URLs — relative URLs don't work when the email travels between servers.",
  },
  {
    q: "My Outlook signature looks fine when I compose but breaks when the recipient sees it. Why?",
    a: "This is a classic problem, and it almost always comes down to either image URL issues or the difference between how Outlook renders the compose window versus how it packages the email for delivery. Outlook's compose preview isn't a fully accurate rendering of what recipients will see. Test by actually sending the email to an Outlook inbox (ideally a different account) and opening it there. Common causes of the send/receive discrepancy: images hosted on localhost or intranet URLs (they work on your machine but not for external recipients), images that are cached locally in your Outlook install, or HTML that renders differently in reading mode versus compose mode.",
  },
  {
    q: "Can I use HTML tables with multiple columns in an Outlook signature?",
    a: "Yes, and in fact HTML tables are the recommended layout method for Outlook signatures — they're the most reliable approach across all Outlook versions. You can have multiple table columns (using multiple td elements in a row), set explicit widths, and use nested tables for complex layouts. The key rules: set explicit pixel widths on every column (don't use percentages in Outlook), set cellpadding='0' and cellspacing='0' on every table, and add border='0' to prevent Outlook from adding visible borders. Outlook's Word engine handles basic HTML tables very well — it's CSS layout (flexbox, grid, absolute positioning) that it fails at.",
  },
  {
    q: "How do I add a hyperlink button to my Outlook-compatible signature?",
    a: "A plain styled button using CSS (border, background-color, padding on an a tag) will not display correctly in Outlook — Outlook ignores background-color and border on inline elements. The Outlook-compatible approach is to use a table cell as the button: set a background color on the td, put your link text inside it, and use padding to give it button-like dimensions. This is called a 'table-based button' and it renders consistently in Outlook. For really polished results, you can use Microsoft's VML (Vector Markup Language) button syntax inside conditional comments, but table-based buttons are simpler and cover most needs.",
  },
  {
    q: "Does NeatStamp actually fix Outlook compatibility, or is it just a template editor?",
    a: "NeatStamp generates the underlying HTML with Outlook compatibility built in. That means it uses table-based layouts instead of CSS flexbox, places inline CSS on every element rather than relying on style blocks, uses both bgcolor attributes and background-color styles on table cells, sets explicit cellpadding and cellspacing on every table, avoids unsupported CSS properties like border-radius, and generates clean alt text for images. The output is designed to pass through Outlook's Word rendering engine without breaking. You don't have to know any of this — you just design visually and NeatStamp handles the HTML.",
  },
];

export default function EmailSignatureOutlookCompatiblePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Outlook Compatible Email Signature", url: "https://neatstamp.com/email-signature-outlook-compatible" },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-10 text-slate-800">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-slate-700 underline underline-offset-2">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-700 font-medium">Outlook Compatible Email Signature</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
          Outlook Compatible Email Signature: Why Yours Breaks and How to Build One That Doesn&apos;t
        </h1>
        <p className="text-slate-500 text-sm mb-8">Updated March 2026 · 20 min read</p>

        {/* ── INTRO ── */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-4">
            Your email signature looks great in Gmail. You&apos;ve got the layout right, the logo is
            sharp, the colors are on-brand. Then you send it to a colleague who uses Outlook and
            they send you a screenshot. The logo is a red X. The layout has fallen apart. The font
            has changed. There&apos;s a gap the size of a parking space between your name and your
            job title.
          </p>
          <p className="leading-relaxed mb-4">
            This is not a random glitch. Outlook breaks email signatures for a specific, predictable
            reason — and once you understand it, you can either fix what you have or build a new
            signature in a way that works from the start. The reason is that Outlook on Windows uses
            Microsoft Word&apos;s HTML rendering engine instead of a real browser engine. Word was built
            to render documents, not web pages. It handles a limited subset of HTML and CSS, ignores
            a lot of what modern browsers support, and applies its own default styles on top of
            everything.
          </p>
          <p className="leading-relaxed mb-4">
            I&apos;ve seen hundreds of signature builds go sideways specifically because of Outlook. The
            mistakes are always the same: using CSS properties Outlook doesn&apos;t support, using
            image formats Outlook doesn&apos;t handle, or building a layout with modern CSS instead of
            HTML tables. This guide covers all of it — what breaks, what to do instead, and how to
            verify that what you&apos;ve built actually works before you roll it out.
          </p>
          <p className="leading-relaxed">
            If you want Outlook-safe HTML generated automatically without getting into the code,{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              NeatStamp&apos;s editor
            </Link>{" "}
            builds table-based, inline-CSS signatures that are tested against Outlook&apos;s rendering
            engine. But this guide will help you understand what&apos;s actually happening — which is
            useful whether you&apos;re using a tool or building by hand.
          </p>
        </section>

        {/* ── WHY OUTLOOK BREAKS SIGNATURES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">The Word rendering engine: why Outlook is different from everything else</h2>

          <p className="leading-relaxed mb-4">
            Outlook 2007 introduced the use of Microsoft Word&apos;s rendering engine to display HTML
            emails. Microsoft made this decision for consistency — Outlook was already using Word to
            compose emails, so using it to render them seemed to make sense. The unintended
            consequence was that Outlook suddenly stopped being able to render most modern web HTML.
          </p>
          <p className="leading-relaxed mb-4">
            Every other major email client — Gmail, Apple Mail, Yahoo Mail, Outlook on Mac, and
            even most webmail clients — uses a browser-based rendering engine. These engines support
            current HTML and CSS standards. Outlook on Windows (2007, 2010, 2013, 2016, 2019, 2021,
            and the 365 desktop app) still uses the Word engine. This is not a bug or an oversight
            — Microsoft has made an active choice to keep it this way for the Windows desktop app.
          </p>
          <p className="leading-relaxed mb-4">
            The practical consequence for email signatures: anything that relies on modern CSS will
            not display correctly in Outlook on Windows. That covers a surprising amount of common
            HTML practices. Here&apos;s a partial list of what Outlook&apos;s engine doesn&apos;t support:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700">
            <li>CSS flexbox and CSS grid (entire layout systems ignored)</li>
            <li>border-radius (all corners become sharp right angles)</li>
            <li>CSS background images on elements (use img tags instead)</li>
            <li>max-width and min-width (pixel widths only)</li>
            <li>SVG images</li>
            <li>CSS animations and transitions</li>
            <li>box-shadow</li>
            <li>CSS variables (custom properties)</li>
            <li>background-color on inline elements (a tags, span tags)</li>
            <li>Padding on inline elements</li>
          </ul>
          <p className="leading-relaxed mb-4">
            When Outlook encounters HTML or CSS it doesn&apos;t support, it doesn&apos;t throw an error —
            it just silently ignores it or renders something unexpected in its place. This is what
            makes debugging Outlook signatures so frustrating: you can&apos;t see the errors, you just
            see a broken layout.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Outlook versions behave differently from each other</h3>
          <p className="leading-relaxed mb-4">
            Outlook 2016, 2019, 2021, and the Microsoft 365 desktop app for Windows all use
            variations of the Word rendering engine, but they&apos;re not identical. Outlook 2016 and
            2019 are especially strict. The 365 desktop app is slightly more forgiving in some areas.
            Outlook for Mac uses the WebKit engine — so it renders HTML like a browser, and most
            modern CSS works fine there. Outlook on the web (OWA — Outlook.com and Office 365 web
            interface) also uses a browser engine, not Word.
          </p>
          <p className="leading-relaxed mb-4">
            The version your recipients are most likely using depends on their industry. Corporate
            environments on long IT refresh cycles often run Outlook 2016 or 2019 on Windows.
            Tech companies and startups tend to use either Outlook 365 or Gmail. If you communicate
            regularly with large enterprises, banking, legal, or government organizations, you can
            assume Outlook 2016 or 2019 is common. Design your signature to work there and it
            will work in every other version too.
          </p>
        </section>

        {/* ── STEP BY STEP ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to build an Outlook-compatible email signature: step by step</h2>

          <p className="leading-relaxed mb-6">
            The core principle is simple: build like it&apos;s 2005, not 2025. Use HTML tables for layout.
            Use inline CSS. Use only properties that Outlook&apos;s Word engine supports. Here&apos;s how to
            do that in practice.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 1: Use HTML tables — not divs, not flexbox, not grid</h3>
          <p className="leading-relaxed mb-4">
            Every layout in your email signature should be built with HTML tables. If you want two
            columns — say, your logo on the left and your contact info on the right — that&apos;s a table
            with one row and two cells. If you want a vertical stack of text elements, that&apos;s a
            single-column table with rows. You cannot use CSS to position elements reliably in Outlook.
          </p>
          <p className="leading-relaxed mb-4">
            The basic structure for a two-column Outlook-safe signature layout:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-700 whitespace-pre">{`<table cellpadding="0" cellspacing="0" border="0"
  width="540" style="width:540px;">
  <tr>
    <td width="120" valign="top"
      style="padding-right:16px;">
      <!-- Logo column -->
      <img src="https://example.com/logo.png"
        width="100" height="40" alt="Company" />
    </td>
    <td valign="top">
      <!-- Contact info column -->
      <p style="margin:0;font-family:Arial,sans-serif;
        font-size:14px;font-weight:bold;color:#1a202c;">
        Your Name
      </p>
    </td>
  </tr>
</table>`}</code>
          </div>
          <p className="leading-relaxed mb-4">
            Notice the use of <code className="bg-slate-100 px-1 rounded text-sm">cellpadding="0"</code>,{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">cellspacing="0"</code>, and{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">border="0"</code> on the table.
            These are HTML attributes (not CSS) that control spacing. Outlook&apos;s engine respects these
            HTML attributes even when it ignores the equivalent CSS. Always include all three.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 2: Put CSS inline on every element</h3>
          <p className="leading-relaxed mb-4">
            Outlook partially strips CSS from{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">&lt;style&gt;</code> blocks in the
            head or body of the email. CSS defined in a style block may or may not be applied —
            behavior varies by Outlook version. The only reliable approach is to put CSS directly on
            each element via the style attribute.
          </p>
          <p className="leading-relaxed mb-4">
            This means every paragraph, every table cell, every link, and every image needs its
            styling written inline. Yes, it&apos;s verbose. Yes, it&apos;s repetitive. It&apos;s also the only
            approach that works consistently. Set at minimum: font-family, font-size, color, margin,
            and padding on every text element. For links, set color and text-decoration inline —
            Outlook overrides link colors if you don&apos;t.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-700 whitespace-pre">{`<!-- ✗ Don't do this — Outlook may ignore it -->
<style>.sig-name { font-size: 16px; font-weight: bold; }</style>
<p class="sig-name">Your Name</p>

<!-- ✓ Do this instead -->
<p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;
  font-size:16px;font-weight:bold;color:#111827;">
  Your Name
</p>`}</code>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 3: Set explicit pixel widths on every column</h3>
          <p className="leading-relaxed mb-4">
            Outlook&apos;s engine handles percentage widths inconsistently. A table column set to
            <code className="bg-slate-100 px-1 rounded text-sm"> width="50%"</code> may not divide
            the space the way you expect. Always set pixel widths: if your signature is 540px wide
            and you want two equal columns, set each column to 270px explicitly. Use both the HTML
            attribute (<code className="bg-slate-100 px-1 rounded text-sm">width="270"</code>) and the
            inline style (<code className="bg-slate-100 px-1 rounded text-sm">style="width:270px;"</code>)
            on each td.
          </p>
          <p className="leading-relaxed mb-4">
            Keep your total signature width between 480px and 600px. Wider signatures get cut off
            in Outlook&apos;s reading pane when it&apos;s not fully expanded. 540px is a safe standard width
            that leaves breathing room. See the{" "}
            <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
              email signature size guide
            </Link>{" "}
            for recommended dimensions for each element.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 4: Use absolute HTTPS URLs for all images</h3>
          <p className="leading-relaxed mb-4">
            Image URLs in Outlook signatures must be absolute HTTPS URLs pointing to publicly
            accessible servers. No relative paths, no localhost, no intranet URLs, no base64-encoded
            images. Outlook fetches images at the time the email is displayed — if the URL isn&apos;t
            reachable from outside your network, recipients see a broken image.
          </p>
          <p className="leading-relaxed mb-4">
            Host your signature images on your own web server, a CDN, or a cloud storage service
            like AWS S3 or Google Cloud Storage configured for public access. Don&apos;t use Dropbox or
            Google Drive shareable links — they don&apos;t reliably serve raw image files and can redirect
            in ways that break Outlook. Use image URLs that end in the actual file extension
            (.png, .jpg) and return the image directly.
          </p>
          <p className="leading-relaxed mb-4">
            Base64 images are a particular problem. Some editors embed images as base64 strings
            directly in the HTML — this makes the HTML enormous and causes Outlook to treat images as
            email attachments rather than inline content. Recipients end up with image files in their
            attachment list, and the inline display breaks. Never use base64 in signatures intended
            for Outlook.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 5: Set explicit background colors with both bgcolor and style</h3>
          <p className="leading-relaxed mb-4">
            For table cells that need a background color, use both the HTML attribute and the CSS
            inline style. The HTML bgcolor attribute is respected by Outlook&apos;s Word engine even
            when it ignores the CSS equivalent:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-700 whitespace-pre">{`<td bgcolor="#f8f9fa"
  style="background-color:#f8f9fa;padding:16px;">
  <!-- content -->
</td>`}</code>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 6: Replace rounded elements with sharp alternatives or pre-rendered images</h3>
          <p className="leading-relaxed mb-4">
            border-radius simply doesn&apos;t work in Outlook on Windows. Round profile photos stay square.
            Rounded button corners stay sharp. If rounded corners matter for your brand, the only
            reliable Outlook solution is to pre-render the rounded element as a PNG image. A circular
            profile photo, for example, should be a PNG file that&apos;s already cropped to a circle —
            not an img tag with CSS border-radius applied.
          </p>
          <p className="leading-relaxed mb-4">
            For most signature elements, sharp corners are perfectly fine and often look cleaner.
            Don&apos;t add complexity trying to simulate rounded corners in Outlook. Design with sharp
            corners from the start and your signature will look identical in Outlook and every other
            client.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 7: Test by actually sending to Outlook, not just previewing</h3>
          <p className="leading-relaxed mb-4">
            Outlook&apos;s compose view is not an accurate preview. You must send a real email and open it
            in a real Outlook inbox. Set up a test Outlook.com account (it uses the web rendering
            engine, different from desktop Outlook) and also test in the actual desktop Outlook app.
            If you don&apos;t have Outlook installed, ask a colleague who does.{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              NeatStamp&apos;s Outlook compatibility preview
            </Link>{" "}
            is a good first check, but a real-device test is always the final word.
          </p>
        </section>

        {/* ── COMMON PROBLEMS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Outlook signature problems and how to solve them</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: images show as attachments</h3>
          <p className="leading-relaxed mb-4">
            The images in your signature are either embedded as base64 or Outlook is treating inline
            images as attachments due to how the message is composed. Solution: use external HTTPS
            URLs for all images, never base64. Also check that you&apos;re not using Outlook&apos;s &quot;Insert
            Picture&quot; function to add images — that embeds them. Instead, use HTML with an img src
            pointing to your hosted URL. See the guide on{" "}
            <Link href="/blog/email-signature-images-not-displaying" className="text-blue-600 hover:underline">
              fixing email signature images not displaying
            </Link>{" "}
            for a full breakdown.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: huge gap between signature elements</h3>
          <p className="leading-relaxed mb-4">
            Outlook adds default paragraph spacing — a bottom margin equivalent — to all p tags.
            If you&apos;re using p tags inside your signature table cells without explicitly setting
            <code className="bg-slate-100 px-1 rounded text-sm"> margin: 0</code>, Outlook adds space
            below each paragraph. Fix: add
            <code className="bg-slate-100 px-1 rounded text-sm"> style="margin:0 0 4px 0;"</code>
            to every p tag. You can use a small bottom margin (4px or 6px) to add controlled spacing
            between lines instead of relying on default paragraph spacing.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: fonts change to Times New Roman</h3>
          <p className="leading-relaxed mb-4">
            Outlook falls back to Times New Roman when it can&apos;t apply the font you&apos;ve specified.
            This happens when fonts are set in a CSS class rather than inline, or when you&apos;ve
            specified a web font that Outlook can&apos;t load. Fix: set font-family inline on every
            text element, and always use web-safe fonts as the primary choice: Arial, Helvetica,
            Georgia, or Trebuchet MS. If you must use a brand font, put it first in the stack with
            Arial as an explicit fallback:
            <code className="bg-slate-100 px-1 rounded text-sm"> font-family:'YourFont',Arial,sans-serif</code>.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: link colors are wrong in Outlook</h3>
          <p className="leading-relaxed mb-4">
            Outlook applies its own blue color to hyperlinks unless you override it explicitly.
            The fix is to set color inline directly on the a tag:{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">
              &lt;a href="..." style="color:#2563eb;text-decoration:none;"&gt;
            </code>. Also wrap the a tag in a span with the same color to catch some Outlook
            versions that apply the default link style to the span instead of the anchor. This
            looks redundant but is the reliable solution.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: signature layout collapses on reply or forward</h3>
          <p className="leading-relaxed mb-4">
            When Outlook forwards or replies to an email, it re-renders the message content and
            can strip some HTML. Tables with percentage-based widths are particularly vulnerable.
            Fix: use pixel widths on every table and td element. Also make sure you&apos;re not using
            nested tables beyond 3-4 levels deep — very deeply nested tables can collapse during
            forward/reply rendering. The{" "}
            <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
              Outlook email signature guide
            </Link>{" "}
            covers the full set of Outlook-specific HTML rules.
          </p>
        </section>

        {/* ── PRO TIPS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pro tips for Outlook-compatible signatures</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 1: Use Outlook conditional comments for specific fixes</h3>
          <p className="leading-relaxed mb-4">
            Outlook supports Microsoft-proprietary conditional comment syntax that lets you target
            specific Outlook versions with special HTML. This is useful for things like VML-based
            rounded buttons or Outlook-specific width overrides. The syntax:{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">
              &lt;!--[if mso]&gt;...Outlook-only HTML...&lt;![endif]--&gt;
            </code>. Most people don&apos;t need this for basic signatures, but it&apos;s the professional
            email developer&apos;s tool for handling edge cases.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 2: Use mso-line-height-rule for consistent line heights</h3>
          <p className="leading-relaxed mb-4">
            Outlook interprets line-height differently from browsers. To get consistent results,
            add <code className="bg-slate-100 px-1 rounded text-sm">mso-line-height-rule:exactly;</code> to
            any element where you set a specific line-height. Without it, Outlook may apply its own
            line height calculation and override yours. For signature text set at font-size 14px with
            line-height 20px, the declaration would be:
            <code className="bg-slate-100 px-1 rounded text-sm">
              style="font-size:14px;line-height:20px;mso-line-height-rule:exactly;"
            </code>.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 3: Test across the full Outlook version range before rolling out</h3>
          <p className="leading-relaxed mb-4">
            If you&apos;re deploying signatures company-wide, test in Outlook 2016, 2019, and the 365
            desktop app. The differences are subtle but real. Outlook 2016 is the strictest —
            if it looks right there, it will look right everywhere. See the{" "}
            <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
              team email signature management guide
            </Link>{" "}
            for how to standardize and distribute tested templates across an organization.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 4: Don&apos;t use background images — use img tags</h3>
          <p className="leading-relaxed mb-4">
            CSS background-image is not supported in Outlook. If you want a background image effect,
            you have two options: use VML (Outlook-specific vector markup) or redesign the element
            to use a real img tag instead. For most signature use cases — a logo, a banner, a
            profile photo — an img tag is the right approach anyway. Reserve background images for
            marketing emails where you have the budget to implement VML workarounds.
          </p>
        </section>

        {/* ── SPECIFIC SITUATIONS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Outlook compatibility in specific situations</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Microsoft 365 and Exchange environments</h3>
          <p className="leading-relaxed mb-4">
            In corporate environments running Microsoft 365 or Exchange, email signatures are often
            deployed centrally via Exchange transport rules or third-party signature management tools.
            These server-side signatures are appended to emails after they leave the sender&apos;s client,
            which means they can&apos;t rely on client-side HTML capabilities at all — they must be
            Outlook-compatible at the HTML level. The{" "}
            <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
              team signature management guide
            </Link>{" "}
            covers deployment methods for large organizations.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Professional and business signatures in Outlook</h3>
          <p className="leading-relaxed mb-4">
            For{" "}
            <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
              business email signatures
            </Link>{" "}
            deployed across a team, Outlook compatibility is non-negotiable — assume at least some
            of your clients use Outlook. The{" "}
            <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
              professional email signature guide
            </Link>{" "}
            has templates already tested for Outlook. Using a pre-tested template saves the hours
            of debugging that a DIY approach inevitably requires.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Outlook on Mac vs. Outlook on Windows</h3>
          <p className="leading-relaxed mb-4">
            Outlook for Mac uses WebKit and supports modern CSS — it&apos;s not the problem child that
            Windows Outlook is. If you build a signature that works in Outlook for Windows, it will
            almost certainly look better in Outlook for Mac (because the Mac version supports more
            CSS). The reverse is not true: a Mac-first signature using border-radius and flexbox
            will break on Windows. Always design to the lowest common denominator — Windows Outlook.
          </p>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/email-signature-outlook", label: "Outlook Email Signature Guide" },
              { href: "/outlook-signature-html", label: "Outlook HTML Signatures" },
              { href: "/blog/new-outlook-signature-problems", label: "New Outlook Problems & Fixes" },
              { href: "/blog/outlook-vs-gmail-signature-differences", label: "Outlook vs Gmail Differences" },
              { href: "/blog/outlook-signature-best-practices-2026", label: "Outlook Best Practices 2026" },
              { href: "/outlook-mobile-signature", label: "Outlook Mobile Signature" },
              { href: "/email-signature-outlook-365", label: "Outlook 365 Signature Guide" },
              { href: "/email-signature-for-teams", label: "Team Signature Management" },
              { href: "/email-signature-dark-mode-compatible", label: "Dark Mode Compatible" },
              { href: "/blog/email-signature-not-working-new-outlook", label: "Fix New Outlook Signatures" },
              { href: "/templates", label: "Browse Signature Templates" },
              { href: "/alternative-to-exclaimer", label: "Exclaimer Alternative" },
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
