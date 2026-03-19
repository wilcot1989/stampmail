import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "HTML Email Signature — Works in Every Client",
  description:
    "A practical guide to writing HTML that actually renders correctly in Gmail, Outlook, and Apple Mail. Includes a working template, a CSS support table, and an explanation of why email HTML is still stuck in 2003.",
  alternates: { canonical: "https://neatstamp.com/html-email-signature" },
};

const faqs = [
  {
    q: "Can I use CSS in an HTML email signature?",
    a: "Yes, but only inline CSS — style attributes on individual elements, not a <style> block in the <head>. Gmail strips <style> blocks entirely. Outlook ignores many CSS properties because it uses Word's rendering engine. Stick to inline CSS with basic properties: font-family, font-size, color, padding, and border.",
  },
  {
    q: "Why does my HTML email signature look different in Outlook vs Gmail?",
    a: "Outlook uses Microsoft Word as its HTML rendering engine (since Outlook 2007), while Gmail uses a browser-based renderer. Word's HTML support is significantly more limited — it doesn't support flexbox, CSS grid, many border styles, or web fonts. Gmail supports more modern CSS but strips out <style> blocks. You need to write HTML that works for both simultaneously.",
  },
  {
    q: "Can I use flexbox or CSS grid in an email signature?",
    a: "No, not reliably. Flexbox and CSS grid are not supported by Outlook's Word-based renderer. Use HTML tables for layout instead. It feels like going back to 1999, but tables are the only layout method that works consistently across all major email clients.",
  },
  {
    q: "Do web fonts work in HTML email signatures?",
    a: "Partially. Gmail and Apple Mail support web fonts loaded via @font-face or Google Fonts links. Outlook does not — it falls back to the system font stack. Always include a web-safe fallback: font-family: 'Your Font', Arial, sans-serif. The signature will use 'Your Font' in Gmail and Arial in Outlook.",
  },
  {
    q: "Should I embed images as base64 or use URLs?",
    a: "Use hosted URLs. Base64-embedded images are treated as attachments by Outlook, adding a paperclip icon to every email. Hosted URLs load from a server, keep email file size small, and don't trigger the attachment indicator. The downside is the image breaks if the server is down — use a reliable CDN.",
  },
  {
    q: "How do I test my HTML email signature?",
    a: "The fastest way: email yourself from the account with the new signature, open it on the clients you care about (Outlook on Windows, Gmail in Chrome, Apple Mail on iPhone). For thorough testing before a company-wide rollout, Litmus and Email on Acid can render your HTML across 90+ clients without sending actual emails.",
  },
  {
    q: "What's the maximum width for an HTML email signature?",
    a: "600px is the standard safe width. Most email clients display the reading pane at 600px or wider, but mobile screens can be narrower. Keep your signature table at 600px max-width and make sure it doesn't have any fixed-width elements that force horizontal scrolling on mobile.",
  },
  {
    q: "Can I add a clickable phone number in an HTML email signature?",
    a: "Yes — use a tel: link: <a href='tel:+15551234567'>+1 555 123 4567</a>. This makes the number tappable on mobile. On desktop it may launch a calling app (Skype, FaceTime) or do nothing, depending on the user's setup. It's still worth including.",
  },
];

const codeExample = `<table cellpadding="0" cellspacing="0" border="0"
  style="font-family: Arial, sans-serif; font-size: 14px;
         color: #1a1a1a; max-width: 600px;">
  <tr>
    <td style="padding-right: 16px; vertical-align: top;
               border-right: 2px solid #e2e8f0;">
      <!-- Headshot or logo -->
      <img
        src="https://yourcdn.com/headshot.jpg"
        width="80"
        height="80"
        alt="Jane Smith"
        style="display: block; border-radius: 50%;
               width: 80px; height: 80px;"
      />
    </td>
    <td style="padding-left: 16px; vertical-align: top;">
      <!-- Name -->
      <p style="margin: 0; font-size: 16px; font-weight: bold;
                color: #0f172a;">Jane Smith</p>
      <!-- Title -->
      <p style="margin: 4px 0 0 0; font-size: 13px;
                color: #64748b;">Senior Designer, Acme Inc</p>
      <!-- Divider -->
      <p style="margin: 10px 0; border-top: 1px solid #e2e8f0;"></p>
      <!-- Contact details -->
      <p style="margin: 0; font-size: 13px; color: #475569;">
        <a href="tel:+15551234567"
           style="color: #475569; text-decoration: none;">
          +1 555 123 4567
        </a>
        &nbsp;·&nbsp;
        <a href="https://acmeinc.com"
           style="color: #2563eb; text-decoration: none;">
          acmeinc.com
        </a>
      </p>
      <!-- Logo -->
      <p style="margin: 10px 0 0 0;">
        <a href="https://acmeinc.com">
          <img
            src="https://yourcdn.com/logo.png"
            width="100"
            height="32"
            alt="Acme Inc"
            style="display: block; width: 100px; height: 32px;"
          />
        </a>
      </p>
    </td>
  </tr>
</table>`;

export default function HtmlEmailSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "HTML Email Signature", url: "https://neatstamp.com/html-email-signature" },
        ]}
      />

      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-700">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">HTML Email Signature</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              HTML Email Signature — Code That Works in Every Client
            </h1>
            <p className="mt-5 text-xl text-slate-600 leading-relaxed">
              If you've ever tried to write HTML for an email signature, you know the pain. Modern CSS doesn't work. Divs break. Outlook ignores half your code. Here's what's actually happening, and what you should do instead.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>Updated March 2026</span>
              <span>·</span>
              <span>~2,800 words</span>
              <span>·</span>
              <span>Includes working code example</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

          {/* Intro */}
          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              Email HTML is its own strange discipline. You can write perfectly valid, standards-compliant HTML that looks great in a browser preview — and then watch it fall apart the moment you paste it into Outlook. Layouts collapse, fonts change, images appear as attachments.
            </p>
            <p>
              The reason isn't a bug you can fix. It's a fundamental architectural decision that was made in 2007 and never reversed. This guide explains what's going on, gives you the rules for writing HTML that actually works, and includes a real working template you can use or adapt.
            </p>
          </div>

          {/* Why email HTML is stuck in 2003 */}
          <div className="mt-14">
            <h2 className="text-3xl font-bold text-slate-900">Why email HTML is stuck in 2003</h2>
            <div className="mt-4 prose prose-slate max-w-none">
              <p>
                Starting with Outlook 2007, Microsoft changed the Outlook rendering engine from Internet Explorer to Microsoft Word. That sounds like an internal implementation detail, but the consequences are enormous.
              </p>
              <p>
                Word is a word processor. Its HTML renderer was designed to handle simple formatted documents — headings, paragraphs, bold text, basic tables. It was never designed to handle CSS layout properties, web fonts, or modern HTML5 elements. So when Outlook encounters CSS grid, flexbox, <code>display: flex</code>, <code>position: relative</code>, or half a dozen other modern properties, it either ignores them entirely or renders them incorrectly.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-slate-400">The rendering engine problem</span>
              </div>
              <div className="bg-slate-900 p-5">
                <div className="grid gap-4 sm:grid-cols-3 text-sm">
                  {[
                    { client: "Gmail", engine: "Chrome (Blink)", support: "Good modern CSS support, but strips <style> blocks" },
                    { client: "Outlook 2007–2021", engine: "Microsoft Word", support: "Very limited CSS. No flexbox, grid, or float." },
                    { client: "Apple Mail", engine: "WebKit", support: "Best CSS support. Web fonts work. Closest to a browser." },
                  ].map((row) => (
                    <div key={row.client} className="rounded-lg bg-slate-800 p-4">
                      <p className="font-semibold text-white">{row.client}</p>
                      <p className="mt-1 text-slate-400 text-xs">Engine: {row.engine}</p>
                      <p className="mt-2 text-slate-300 text-xs leading-relaxed">{row.support}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 prose prose-slate max-w-none">
              <p>
                Gmail adds its own complication: it strips <code>&lt;style&gt;</code> blocks from the email <code>&lt;head&gt;</code> entirely. Any CSS you write in a stylesheet won't survive Gmail. The only CSS that works is inline styles — <code>style=""</code> attributes directly on HTML elements.
              </p>
              <p>
                The result: if you want an email signature that works in Gmail, Outlook, and Apple Mail simultaneously, you're writing HTML roughly the way people wrote it in 2003. Tables for layout. Inline styles only. No JavaScript. No modern CSS. It's not elegant, but it's what the constraints require.
              </p>
            </div>
          </div>

          {/* Rules of email-safe HTML */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">The rules of email-safe HTML</h2>
            <p className="mt-3 text-slate-600">
              These aren't stylistic preferences — they're hard requirements if you want consistent rendering.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  rule: "Use tables for layout, not divs",
                  detail: "Div-based layouts rely on CSS for positioning. Since Outlook's Word renderer doesn't support the CSS needed for div layouts (flexbox, float, inline-block), divs collapse into a single column or stack unpredictably. HTML tables render correctly in every email client because table layout is determined by HTML attributes, not CSS.",
                  code: true,
                  good: '<table cellpadding="0" cellspacing="0"><tr><td>...</td></tr></table>',
                  bad: '<div style="display: flex">...',
                },
                {
                  rule: "Inline all CSS",
                  detail: "Don't use a <style> block, external stylesheet, or CSS classes. Gmail strips <style> blocks; Outlook ignores external stylesheets. Every style property needs to be written directly on the element as a style attribute.",
                  code: true,
                  good: '<p style="font-size: 14px; color: #1a1a1a;">',
                  bad: '<p class="body-text"> (with CSS elsewhere)',
                },
                {
                  rule: "Use web-safe fonts with fallbacks",
                  detail: "Web fonts (Google Fonts, custom @font-face) don't work in Outlook. Always include a web-safe fallback in your font stack: Arial, Helvetica, Georgia, or Times New Roman. These are installed on virtually every operating system.",
                  code: true,
                  good: 'font-family: \'Inter\', Arial, sans-serif;',
                  bad: 'font-family: \'Inter\'; (no fallback)',
                },
                {
                  rule: "Host images externally, not as base64",
                  detail: "Base64-embedded images are treated as attachments by Outlook, adding a paperclip icon to every email you send. Host images at a stable public URL instead. Set explicit width and height attributes on every img tag (not just via CSS) to prevent layout shifts in Outlook.",
                  code: false,
                },
                {
                  rule: "Set explicit width and height on images",
                  detail: "Outlook's Word renderer sometimes ignores CSS width/height on images. Set the HTML attributes directly: <img width='80' height='80' ... >. Also include the CSS equivalent in the style attribute as a backup for other clients.",
                  code: true,
                  good: '<img width="80" height="80" style="width:80px;height:80px;" ...>',
                  bad: '<img style="width:80px;height:80px;" ...> (no HTML attrs)',
                },
                {
                  rule: "No float, no position, no flexbox or grid",
                  detail: "These CSS layout properties either don't work in Outlook or produce unpredictable results. float is particularly dangerous — it can cause entire sections to overlap or disappear. Use table columns for any multi-column layout instead.",
                  code: false,
                },
                {
                  rule: "Keep total width at 600px or less",
                  detail: "600px is the safe maximum width for email content. Wider than that and you risk horizontal scrolling on smaller screens. Specify this on your outer table element.",
                  code: true,
                  good: '<table style="max-width: 600px;" ...>',
                  bad: '<table style="width: 900px;" ...>',
                },
              ].map((item) => (
                <div key={item.rule} className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-900">{item.rule}</h3>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    {item.code && (
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs font-mono">
                        <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                          <p className="text-green-700 font-sans font-semibold mb-1 text-xs">✓ Do this</p>
                          <p className="text-green-800 break-all">{item.good}</p>
                        </div>
                        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                          <p className="text-red-700 font-sans font-semibold mb-1 text-xs">✗ Not this</p>
                          <p className="text-red-800 break-all">{item.bad}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Working template */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">A working HTML email signature template</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Below is a simplified but fully functional HTML signature. It uses a two-column table layout (photo | text), inline CSS only, externally hosted images, and explicit image dimensions. It renders correctly in Outlook 2016/2021/365, Gmail, and Apple Mail.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Replace the placeholder values (URLs, names, contact details) and it's ready to use. Or use the <Link href="/editor" className="text-blue-600 hover:underline">NeatStamp editor</Link> to generate this kind of HTML with your real details automatically.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-slate-400">email-signature.html</span>
              </div>
              <div className="bg-slate-950 p-5 overflow-x-auto">
                <pre className="text-sm text-slate-300 leading-relaxed font-mono whitespace-pre">{codeExample}</pre>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                {
                  element: "Outer table",
                  why: "Sets max-width to 600px and establishes the table context. The cellpadding='0' cellspacing='0' border='0' attributes prevent default table spacing that varies across clients.",
                },
                {
                  element: "Image with explicit dimensions",
                  why: "Both the HTML width/height attributes AND the CSS style dimensions are set. This is redundant but intentional — Outlook reads the HTML attributes, other clients may prefer the CSS.",
                },
                {
                  element: "border-right divider",
                  why: "A simple border-right on the left cell creates a vertical divider. This is more reliable than a separate <td> with a background color, which some clients render inconsistently.",
                },
                {
                  element: "vertical-align: top",
                  why: "Without this, table cells default to vertical-align: middle, which can look odd when one column is taller than the other. top alignment keeps content anchored to the top of each cell.",
                },
                {
                  element: "margin: 0 on paragraphs",
                  why: "Different clients add different default margins to <p> tags. Setting margin: 0 on every paragraph and using padding on the parent cell for spacing gives consistent results.",
                },
              ].map((note) => (
                <div key={note.element} className="flex gap-3 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                  <code className="flex-shrink-0 text-xs font-mono bg-slate-200 text-slate-700 rounded px-2 py-0.5 h-fit mt-0.5">{note.element}</code>
                  <p className="text-sm text-slate-600 leading-relaxed">{note.why}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CSS support table */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">CSS properties that work (and don't work) in email</h2>
            <p className="mt-3 text-slate-600">
              The honest status of the properties you're most likely to reach for.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">CSS Property</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Gmail</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Outlook 365</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Apple Mail</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { prop: "font-family", gmail: "✓", outlook: "Partial", apple: "✓", note: "Web fonts ignored by Outlook. Use web-safe fallbacks." },
                    { prop: "font-size, font-weight", gmail: "✓", outlook: "✓", apple: "✓", note: "Fully supported everywhere." },
                    { prop: "color", gmail: "✓", outlook: "✓", apple: "✓", note: "Works reliably in all clients." },
                    { prop: "background-color", gmail: "✓", outlook: "Partial", apple: "✓", note: "Works on table cells. Inconsistent on divs in Outlook." },
                    { prop: "padding (inline)", gmail: "✓", outlook: "Partial", apple: "✓", note: "Use cellpadding on tables in Outlook for better results." },
                    { prop: "border", gmail: "✓", outlook: "Partial", apple: "✓", note: "Simple borders work. Shorthand (border: 1px solid #ccc) can fail in Outlook — use individual properties." },
                    { prop: "border-radius", gmail: "✓", outlook: "✗", apple: "✓", note: "Outlook ignores border-radius entirely. Circular images need the image pre-cropped." },
                    { prop: "display: flex", gmail: "✓", outlook: "✗", apple: "✓", note: "Don't use. Breaks Outlook completely." },
                    { prop: "display: grid", gmail: "✓", outlook: "✗", apple: "✓", note: "Don't use. Same as flexbox." },
                    { prop: "float", gmail: "Partial", outlook: "✗", apple: "✓", note: "Avoid. Causes unpredictable layout in Outlook." },
                    { prop: "position: relative/absolute", gmail: "✓", outlook: "✗", apple: "✓", note: "Not supported in Outlook. Don't use." },
                    { prop: "max-width", gmail: "✓", outlook: "Partial", apple: "✓", note: "Use width for Outlook compatibility. max-width may be ignored." },
                    { prop: "line-height", gmail: "✓", outlook: "✓", apple: "✓", note: "Works consistently." },
                    { prop: "text-align", gmail: "✓", outlook: "✓", apple: "✓", note: "Works consistently." },
                    { prop: "@media queries", gmail: "Partial", outlook: "✗", apple: "✓", note: "Gmail supports media queries on newer versions. Outlook does not." },
                  ].map((row, i) => {
                    const badge = (val: string) => {
                      if (val === "✓") return <span className="inline-block rounded-full bg-green-100 text-green-700 text-xs px-2 py-0.5 font-medium">{val} Yes</span>;
                      if (val === "✗") return <span className="inline-block rounded-full bg-red-100 text-red-700 text-xs px-2 py-0.5 font-medium">{val} No</span>;
                      return <span className="inline-block rounded-full bg-amber-100 text-amber-700 text-xs px-2 py-0.5 font-medium">{val}</span>;
                    };
                    return (
                      <tr key={row.prop} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="px-4 py-3 font-mono text-sm text-slate-900">{row.prop}</td>
                        <td className="px-4 py-3 text-center">{badge(row.gmail)}</td>
                        <td className="px-4 py-3 text-center">{badge(row.outlook)}</td>
                        <td className="px-4 py-3 text-center">{badge(row.apple)}</td>
                        <td className="px-4 py-3 text-xs text-slate-500 max-w-xs">{row.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Data based on testing in Outlook 365 (Windows), Gmail (Chrome browser), and Apple Mail on macOS Sonoma, March 2026.
            </p>
          </div>

          {/* Testing */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">Testing your HTML signature</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              There's no substitute for actually sending the email and checking it. Here's how to do it properly.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900">The fast way: email yourself</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Set the signature in your email client, compose a new email to an address you control, and check it in the clients you care about. For most people that means: Outlook on Windows (if you use it), Gmail in Chrome, and your phone's native mail app. If it looks right in those three, you're probably fine for 95% of recipients.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900">For thorough pre-deployment testing: Litmus or Email on Acid</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Both tools let you paste HTML and see rendered previews across 90+ email clients without sending a single email. You'll see exactly what your signature looks like in Outlook 2016, Outlook 2021, Gmail app on Android, Samsung Mail, and dozens of others. Litmus starts at around $79/month (overkill for individual use, sensible for agencies). Email on Acid has a one-time test option.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  For a company-wide rollout, this kind of testing is worth the cost. The first time a senior executive's signature shows up broken in a client pitch email, you'll wish you'd tested first.
                </p>
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                <h3 className="font-semibold text-amber-900">What to look for when testing</h3>
                <ul className="mt-2 space-y-2 text-sm text-amber-800">
                  <li>→ Does the layout hold? Check for collapsed columns or elements stacking unexpectedly.</li>
                  <li>→ Are images loading? Look for broken image icons (indicates a bad URL or blocked images).</li>
                  <li>→ Is there an attachment paperclip? That's base64 embedding — switch to hosted URLs.</li>
                  <li>→ Is the font correct? If it looks like Times New Roman in Outlook, your font stack fallback isn't working.</li>
                  <li>→ Are the links clickable? Test phone, email, website, and social links specifically.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* The easy way */}
          <div className="mt-14 rounded-2xl bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-white">The easy way: let NeatStamp generate it</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Everything in this guide is what NeatStamp's generator handles automatically. When you build a signature in the editor, the exported HTML uses tables for layout, inline CSS only, hosted image URLs with explicit dimensions, and web-safe font stacks. You get the technically correct output without writing a line of HTML.
            </p>
            <p className="mt-3 text-slate-300 leading-relaxed">
              That said, if you're a developer who wants to write and maintain the HTML yourself — or if you need to integrate signature HTML into a larger system — this guide gives you everything you need to do it from scratch.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Generate HTML signature — free
              </Link>
              <Link
                href="/email-signature-outlook"
                className="inline-flex items-center rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Outlook installation guide →
              </Link>
            </div>
          </div>

          {/* Related guides */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900">Related guides</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/email-signature-outlook", label: "Installing your signature in Outlook step by step" },
                { href: "/email-signature-gmail", label: "Installing your signature in Gmail" },
                { href: "/email-signature-outlook-365", label: "Outlook 365 specific signature guide" },
                { href: "/email-signature-design", label: "Email signature design best practices" },
                { href: "/professional-email-signature", label: "What makes a professional email signature" },
                { href: "/email-signature-with-logo", label: "Adding a logo to your email signature" },
                { href: "/templates", label: "Browse email signature templates" },
                { href: "/best-email-signature-generator", label: "Best email signature generators compared" },
                { href: "/editor", label: "Create your HTML signature — free" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-blue-200 hover:text-blue-700 hover:bg-blue-50/50 transition-colors"
                >
                  <span className="text-slate-400">→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
              {faqs.map((faq) => (
                <div key={faq.q} className="px-6 py-5">
                  <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
