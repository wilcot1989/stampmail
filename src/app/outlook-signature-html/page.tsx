import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Signature HTML: Create & Install Guide",
  description:
    "Outlook signature HTML guide: table-based layout, inline CSS rules, and install steps for classic Outlook, New Outlook, and OWA.",
  alternates: { canonical: "https://neatstamp.com/outlook-signature-html" },
};

const faqs = [
  {
    q: "Why does my HTML signature look broken in Outlook?",
    a: "Outlook on Windows uses Microsoft Word's HTML rendering engine, not a browser. Word was built to handle formatted documents, not web HTML. It ignores CSS flexbox, CSS grid, border-radius, CSS variables, background-image, position:absolute, float, and SVG entirely. When Outlook encounters these properties it silently drops them, which causes layouts to collapse. The fix is to build your signature using HTML tables for layout and inline CSS only — the same approach that worked in browsers in 2003.",
  },
  {
    q: "Can I use CSS classes in my Outlook HTML signature?",
    a: "No. Gmail strips <style> blocks from email HTML entirely, which removes any CSS classes you define. Outlook partially reads <style> blocks but applies them inconsistently across versions. The only reliable approach is to write every style property as an inline style attribute directly on the HTML element. That means no class attributes, no stylesheet links, no <style> blocks — just style='...' on each tag.",
  },
  {
    q: "What width should my Outlook HTML signature be?",
    a: "500px to 600px. Most email clients display a reading pane at least 600px wide, and most mobile screens handle 500px comfortably. NeatStamp generates signatures at 500px — narrow enough to work on small screens, wide enough to display two columns comfortably. Set the width as a fixed pixel value on your outer table element using both the HTML width attribute and the inline style: width='500' style='width:500px;'.",
  },
  {
    q: "Where do I install the HTML signature file in classic Outlook?",
    a: "The signature folder for classic Outlook (2016, 2019, 2021, and the 365 desktop app) is at %APPDATA%\\Microsoft\\Signatures on Windows. Open that folder, create a new .htm file with your signature HTML, and also create a matching folder named yourfile_files for any locally referenced assets. Then go to File → Options → Mail → Signatures in Outlook to assign that signature to your account.",
  },
  {
    q: "How do I install an HTML signature in New Outlook?",
    a: "New Outlook (the 2024+ redesign) uses a different path. Go to Settings → Accounts → Signatures. New Outlook has a built-in rich text editor — it doesn't support pasting raw HTML directly. The workaround is to paste your rendered signature (rendered as HTML in a browser, then copy-paste the visual output) into the signature box. Some formatting survives, some doesn't. For full HTML control in New Outlook, the most reliable method is using a signature management tool that injects HTML via Exchange rules.",
  },
  {
    q: "Does Outlook support border-radius in HTML signatures?",
    a: "No. Outlook's Word rendering engine completely ignores border-radius. Round profile photos will display as squares. Rounded button corners will display as sharp right angles. The workaround for a round profile photo is to export the photo as a PNG that's already been cropped to a circle shape before it's placed in the signature. NeatStamp's photo crop tool does this automatically — the PNG you get is already circular, so it looks round in every email client including Outlook.",
  },
  {
    q: "Why do images in my Outlook signature show as attachments?",
    a: "Two causes. First: you've embedded images as base64 strings in the HTML. Outlook treats base64-embedded images as file attachments, adding a paperclip icon to every email and displaying images as attached files rather than inline. Fix: host all images at public HTTPS URLs and reference them with a standard img src tag. Second cause: you used Outlook's Insert Picture function to add images. That also embeds them. Use HTML img tags with hosted URLs instead.",
  },
  {
    q: "Can I use SVG icons in my Outlook HTML signature?",
    a: "No. Outlook on Windows has zero support for SVG. SVG images either display as broken image icons or don't render at all. Use PNG icons instead — they work in every email client including all Outlook versions. Keep icon files under 20KB by optimizing them before hosting. NeatStamp uses PNG social icons and avoids SVG in all generated signatures for exactly this reason.",
  },
  {
    q: "What is the Outlook Compatibility Tester and how does it work?",
    a: "NeatStamp's Outlook Compatibility Tester is an 11-point check that runs automatically when you export a signature. It checks for: table-based layout (no divs or flexbox), inline CSS only (no style blocks or classes), pixel widths on tables and columns, explicit width and height attributes on images, no border-radius, no SVG files, no base64 images, no CSS variables, no position:absolute or float, web-safe font fallbacks, and images hosted at HTTPS URLs. Any issues are flagged with specific fixes before you install.",
  },
  {
    q: "How do I install an HTML signature in Outlook Web App (OWA)?",
    a: "In OWA (Outlook.com and the Office 365 web interface), go to Settings (gear icon) → View all Outlook settings → Mail → Compose and reply → Email signature. OWA uses a browser-based renderer, so it supports more CSS than desktop Outlook. However, the OWA signature editor doesn't accept raw HTML paste directly in all versions. The reliable method: compose a new email in OWA, switch to HTML source view if available, paste your signature HTML, copy the rendered output, then paste that into the signature editor.",
  },
];

export default function OutlookSignatureHtmlPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Outlook Signature HTML", url: "https://neatstamp.com/outlook-signature-html" },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-10 text-slate-800">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-slate-700 underline underline-offset-2">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-700 font-medium">Outlook Signature HTML</li>
          </ol>
        </nav>

        {/* Article header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">
              Outlook Guide
            </span>
            <span className="text-slate-400 text-sm">~3,200 words · 18 min read</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Outlook Signature HTML: How to Create and Install HTML Signatures
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            HTML signatures in Outlook are harder than they should be. The same code that looks sharp
            in Gmail collapses in Outlook, fonts change, images become attachments, and layouts fall
            apart. Here&apos;s exactly why that happens and how to write HTML that survives Outlook&apos;s
            rendering engine — plus where to install the file when you&apos;re done.
          </p>
          <p className="text-sm text-slate-400 mt-3">Updated March 2026</p>
        </div>

        {/* ── INTRO ── */}
        <section className="mb-12">
          <p className="leading-relaxed mb-4">
            You open your HTML file in a browser and it looks exactly right. Two columns, clean fonts,
            your logo sharp on the left. Then you paste it into Outlook, send a test email, and
            everything is wrong. The columns have stacked vertically. Your profile photo is a white
            square. There&apos;s a gap the size of a paragraph between your name and your job title.
            The font has switched to Times New Roman.
          </p>
          <p className="leading-relaxed mb-4">
            This is not random. Outlook on Windows doesn&apos;t use a browser to display HTML. It uses
            Microsoft Word&apos;s rendering engine — the same engine that renders Word documents. Word
            was designed for formatted text documents, not web pages. It supports a narrow subset of
            HTML and ignores most modern CSS properties without any error or warning.
          </p>
          <p className="leading-relaxed mb-4">
            The frustrating part is that this has been true since Outlook 2007, and Microsoft has
            made no move to change it. Every version of Outlook on Windows from 2007 through the
            current 365 desktop app uses Word&apos;s engine. You are writing HTML for a 17-year-old
            renderer, and there is no workaround — only a different way to write the HTML.
          </p>
          <p className="leading-relaxed">
            This guide covers the HTML rules for Outlook, how to install your signature in each
            Outlook variant, what common HTML breaks in Outlook and what to use instead, and how{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              NeatStamp&apos;s signature editor
            </Link>{" "}
            generates Outlook-safe HTML automatically. If you want to understand the problem and fix
            it yourself, start with the next section. If you want to skip to installation, jump to
            the install steps.
          </p>
        </section>

        {/* ── THE WORD ENGINE ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What Outlook does to your HTML</h2>

          <p className="leading-relaxed mb-4">
            When Outlook receives an email with HTML content, it passes that HTML through Word&apos;s
            rendering engine before displaying it. Word reads the HTML, applies what it understands,
            and ignores or misinterprets everything else. There&apos;s no error message. Outlook just
            displays whatever Word produced, which can look completely different from what you intended.
          </p>
          <p className="leading-relaxed mb-4">
            Word&apos;s HTML renderer was originally built for importing HTML documents into Word for
            editing — not for rendering web-quality email layouts. It handles paragraphs, headings,
            basic tables, inline formatting, and simple borders. That&apos;s roughly where its competence
            ends.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">What Outlook strips or ignores</h3>
          <p className="leading-relaxed mb-4">
            These CSS properties and HTML features are either ignored entirely or broken in Outlook
            on Windows (2016, 2019, 2021, and the 365 desktop app):
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-red-900 mb-3 text-sm">Properties Outlook ignores or breaks</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { prop: "display: flex / grid", reason: "Layout collapses to single column" },
                { prop: "float: left / right", reason: "Elements stack or overlap unpredictably" },
                { prop: "position: absolute / relative", reason: "Positioning ignored entirely" },
                { prop: "border-radius", reason: "All corners become sharp right angles" },
                { prop: "background-image (CSS)", reason: "Images don't render — use img tags" },
                { prop: "CSS variables (--color)", reason: "Variables not resolved, property dropped" },
                { prop: "SVG images", reason: "Not rendered at all in any Outlook version" },
                { prop: "base64 images", reason: "Treated as file attachments" },
                { prop: "max-width / min-width", reason: "Use fixed pixel widths instead" },
                { prop: "box-shadow", reason: "Ignored entirely" },
                { prop: "CSS animations", reason: "No animation support" },
                { prop: "Web fonts (@font-face)", reason: "Falls back to system fonts" },
              ].map((item) => (
                <div key={item.prop} className="flex items-start gap-2 text-sm">
                  <code className="flex-shrink-0 bg-red-100 text-red-800 rounded px-1.5 py-0.5 font-mono text-xs">{item.prop}</code>
                  <span className="text-red-700">{item.reason}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">What Outlook does support</h3>
          <p className="leading-relaxed mb-4">
            The good news is that a properly built HTML signature — using the techniques below — will
            look identical in Outlook and in modern browsers. These properties work reliably:
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "HTML table layout (table, tr, td)",
                "Inline CSS (style attribute on each element)",
                "font-family (with web-safe fallbacks)",
                "font-size, font-weight, font-style",
                "color, background-color on table cells",
                "Simple borders (use individual properties, not shorthand)",
                "padding on table cells (also use cellpadding attribute)",
                "vertical-align on table cells",
                "text-align, line-height",
                "Clickable links (a href tags)",
                "PNG and JPEG images (externally hosted)",
                "HTML width and height attributes on images",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-green-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Outlook vs. Gmail vs. Apple Mail</h3>
          <p className="leading-relaxed mb-4">
            Gmail adds its own constraint on top of Outlook&apos;s: it strips the entire{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">&lt;style&gt;</code> block from email
            HTML. So any CSS you put in a stylesheet or a style block in the head is deleted before the
            email is displayed. The only CSS that reaches Gmail&apos;s renderer is inline CSS — style
            attributes written directly on each element.
          </p>
          <p className="leading-relaxed mb-4">
            Apple Mail uses WebKit, the same engine as Safari. It has excellent CSS support and handles
            nearly everything a browser would. It is the least constrained of the major clients.
          </p>
          <p className="leading-relaxed">
            The practical upshot: if you write HTML that works in Outlook (table-based layout, inline
            CSS only, no flexbox or modern positioning), it will also work in Gmail and Apple Mail.
            The Outlook constraints are the binding constraint for everyone.
          </p>
        </section>

        {/* ── RULES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">The rules for Outlook-safe HTML signatures</h2>

          <p className="leading-relaxed mb-6">
            These are hard requirements, not stylistic preferences. Violate any of them and your
            signature will break in Outlook.
          </p>

          <div className="space-y-5">

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <h3 className="font-semibold text-slate-900">Rule 1: Use table-based layout only</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Every layout element — columns, rows, stacked text — must be built with HTML tables.
                  No divs for layout, no flexbox, no CSS grid, no float. If you want your photo on the
                  left and contact details on the right, that&apos;s a one-row table with two cells. Add{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">cellpadding="0"</code>{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">cellspacing="0"</code>{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">border="0"</code> to every table
                  element. These HTML attributes control spacing in Outlook even when CSS is ignored.
                </p>
                <div className="grid gap-2 sm:grid-cols-2 text-xs font-mono">
                  <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                    <p className="text-green-700 font-sans font-semibold mb-1 text-xs">Do this</p>
                    <p className="text-green-800 break-all whitespace-pre-wrap">{`<table cellpadding="0" cellspacing="0" border="0">\n  <tr>\n    <td>Photo</td>\n    <td>Contact info</td>\n  </tr>\n</table>`}</p>
                  </div>
                  <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                    <p className="text-red-700 font-sans font-semibold mb-1 text-xs">Not this</p>
                    <p className="text-red-800 break-all whitespace-pre-wrap">{`<div style="display:flex;">\n  <div>Photo</div>\n  <div>Contact info</div>\n</div>`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <h3 className="font-semibold text-slate-900">Rule 2: Inline CSS on every element</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  No CSS classes. No stylesheet links. No{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">&lt;style&gt;</code> blocks.
                  Every style property must be written as a{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">style=""</code> attribute directly
                  on the element. Yes, that means setting font-family, font-size, and color on every
                  single paragraph. It&apos;s repetitive, but it&apos;s the only thing that survives both
                  Gmail and Outlook.
                </p>
                <div className="grid gap-2 sm:grid-cols-2 text-xs font-mono">
                  <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                    <p className="text-green-700 font-sans font-semibold mb-1 text-xs">Do this</p>
                    <p className="text-green-800 break-all">{`<p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a;">Jane Smith</p>`}</p>
                  </div>
                  <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                    <p className="text-red-700 font-sans font-semibold mb-1 text-xs">Not this</p>
                    <p className="text-red-800 break-all">{`<style>.name{font-size:14px;}</style>\n<p class="name">Jane Smith</p>`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <h3 className="font-semibold text-slate-900">Rule 3: Fixed pixel widths on tables and columns</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Percentage widths are unreliable in Outlook. Set fixed pixel widths on your outer table
                  and on each column. Use both the HTML attribute and the CSS style — Outlook reads the
                  HTML attribute, other clients prefer CSS. A 500px outer table with a 100px photo
                  column and a 380px text column (accounting for padding) is a standard working layout.
                </p>
                <div className="grid gap-2 sm:grid-cols-2 text-xs font-mono">
                  <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                    <p className="text-green-700 font-sans font-semibold mb-1 text-xs">Do this</p>
                    <p className="text-green-800 break-all">{`<table width="500" style="width:500px;">\n  <td width="100" style="width:100px;">`}</p>
                  </div>
                  <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                    <p className="text-red-700 font-sans font-semibold mb-1 text-xs">Not this</p>
                    <p className="text-red-800 break-all">{`<table style="max-width:600px;width:100%;">\n  <td style="width:20%;">`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <h3 className="font-semibold text-slate-900">Rule 4: Explicit width and height attributes on every image</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Outlook sometimes ignores CSS dimensions on images. Set both the HTML attributes
                  (<code className="bg-slate-100 px-1 rounded text-xs">width="80" height="80"</code>)
                  and the CSS inline style. Redundant, but intentional — Outlook reads the HTML
                  attributes while other clients read the CSS. Without explicit dimensions, images
                  can load at full original size and break your layout.
                </p>
                <div className="grid gap-2 sm:grid-cols-2 text-xs font-mono">
                  <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                    <p className="text-green-700 font-sans font-semibold mb-1 text-xs">Do this</p>
                    <p className="text-green-800 break-all">{`<img src="photo.png" width="80" height="80" style="width:80px;height:80px;display:block;" alt="Jane">`}</p>
                  </div>
                  <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                    <p className="text-red-700 font-sans font-semibold mb-1 text-xs">Not this</p>
                    <p className="text-red-800 break-all">{`<img src="photo.png" style="width:80px;height:80px;" alt="Jane">`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <h3 className="font-semibold text-slate-900">Rule 5: Host images at public HTTPS URLs — never base64</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Base64-encoded images embedded directly in HTML are treated as file attachments by Outlook.
                  Your recipients see a paperclip icon and find your logo in their attachment list.
                  Host all signature images — logo, photo, social icons — at public HTTPS URLs and
                  reference them with a standard{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">img src="https://..."</code> tag.
                  Use a reliable host: your own server, a CDN, AWS S3, or Cloudinary. Dropbox and Google
                  Drive sharing links don&apos;t serve raw image files reliably.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <h3 className="font-semibold text-slate-900">Rule 6: Web-safe fonts with explicit fallbacks</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Outlook doesn&apos;t load web fonts. Google Fonts, Adobe Fonts, custom @font-face — none
                  of them work. Outlook falls back to Times New Roman if you don&apos;t specify a web-safe
                  alternative. Always include a system font fallback:{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">font-family: &apos;Inter&apos;, Arial, sans-serif</code>.
                  In Outlook, &apos;Inter&apos; will be ignored and Arial will be used. In Gmail and Apple Mail,
                  &apos;Inter&apos; loads if available. Web-safe fonts that work everywhere: Arial, Helvetica,
                  Georgia, Trebuchet MS, Verdana.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <h3 className="font-semibold text-slate-900">Rule 7: Set margin:0 on paragraphs, control spacing with padding</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Outlook adds default paragraph spacing — a bottom margin — to all{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">p</code> tags. If you use paragraph
                  tags without explicitly setting{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">margin:0</code>, Outlook adds large
                  gaps between text elements. Set{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">style="margin:0 0 4px 0;"</code>
                  on every p tag. Use small bottom margins (4px–8px) for controlled spacing between lines
                  rather than relying on default paragraph margins.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                <h3 className="font-semibold text-slate-900">Rule 8: Use bgcolor attribute alongside background-color CSS</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  For table cells that need a background color, use both the HTML{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">bgcolor</code> attribute and the
                  CSS{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">background-color</code> inline
                  style:{" "}
                  <code className="bg-slate-100 px-1 rounded text-xs">&lt;td bgcolor=&quot;#f1f5f9&quot; style=&quot;background-color:#f1f5f9;&quot;&gt;</code>.
                  Outlook&apos;s Word engine reliably reads the HTML attribute even when it ignores the CSS
                  equivalent.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── HTML TEMPLATE ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A working Outlook-safe HTML signature template</h2>
          <p className="leading-relaxed mb-4">
            This is a complete, functional two-column signature. Left column: photo. Right column:
            name, title, contact details, logo. It uses table-based layout, inline CSS only, explicit
            pixel dimensions on everything, and externally hosted images. It renders correctly in
            Outlook 2016, 2019, 2021, 365, Gmail, and Apple Mail.
          </p>
          <p className="text-sm text-slate-500 mb-5">
            Replace placeholder values with your real details. Or use the{" "}
            <Link href="/editor" className="text-blue-600 hover:underline">
              NeatStamp editor
            </Link>{" "}
            to generate this structure automatically with your actual photo, logo, and brand colors.
          </p>

          <div className="rounded-xl border border-slate-200 overflow-hidden mb-6">
            <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-400">outlook-signature.htm</span>
            </div>
            <div className="bg-slate-950 p-5 overflow-x-auto">
              <pre className="text-sm text-slate-300 leading-relaxed font-mono whitespace-pre">{`<table cellpadding="0" cellspacing="0" border="0"
  width="500" style="width:500px;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <!-- Left column: profile photo -->
    <td width="90" style="width:90px;padding-right:16px;vertical-align:top;">
      <img
        src="https://yourcdn.com/photo.png"
        width="80"
        height="80"
        alt="Jane Smith"
        style="display:block;width:80px;height:80px;"
      />
    </td>
    <!-- Right column: contact info -->
    <td style="vertical-align:top;border-left:2px solid #e2e8f0;
               padding-left:16px;">
      <!-- Name -->
      <p style="margin:0 0 2px 0;font-size:15px;font-weight:bold;
                color:#0f172a;">Jane Smith</p>
      <!-- Title -->
      <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;">
        Senior Designer · Acme Inc
      </p>
      <!-- Phone -->
      <p style="margin:0 0 3px 0;font-size:13px;color:#475569;">
        <a href="tel:+15551234567"
           style="color:#475569;text-decoration:none;">
          +1 555 123 4567
        </a>
      </p>
      <!-- Email -->
      <p style="margin:0 0 3px 0;font-size:13px;color:#475569;">
        <a href="mailto:jane@acmeinc.com"
           style="color:#2563eb;text-decoration:none;">
          jane@acmeinc.com
        </a>
      </p>
      <!-- Website -->
      <p style="margin:0 0 10px 0;font-size:13px;">
        <a href="https://acmeinc.com"
           style="color:#2563eb;text-decoration:none;">
          acmeinc.com
        </a>
      </p>
      <!-- Company logo -->
      <p style="margin:0;">
        <a href="https://acmeinc.com">
          <img
            src="https://yourcdn.com/logo.png"
            width="110"
            height="36"
            alt="Acme Inc"
            style="display:block;width:110px;height:36px;"
          />
        </a>
      </p>
    </td>
  </tr>
</table>`}</pre>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                label: "cellpadding/cellspacing/border on table",
                note: "HTML attributes that control table spacing in Outlook. CSS equivalents are often ignored by Word's renderer. Always include all three, set to 0.",
              },
              {
                label: "width='500' AND style='width:500px;'",
                note: "Both the HTML attribute and the CSS inline style. Outlook reads the attribute, modern clients prefer the CSS. Using both covers every scenario.",
              },
              {
                label: "vertical-align:top on td",
                note: "Without this, table cells default to middle alignment. When columns have different heights, middle alignment creates visual gaps at the top. Top alignment keeps content anchored correctly.",
              },
              {
                label: "border-left divider",
                note: "A simple border-left on the right cell creates the vertical divider between columns. More reliable than a separate thin-column cell with a background color.",
              },
              {
                label: "style on every a tag",
                note: "Outlook overrides link colors with its default blue unless you set color inline on the a tag itself. Always set color and text-decoration on every anchor.",
              },
              {
                label: "tel: link on phone number",
                note: "Makes the number tappable on mobile. On desktop it may open a dialer app or do nothing — either way, include it. It's a one-line change that benefits every mobile recipient.",
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                <code className="flex-shrink-0 text-xs font-mono bg-slate-200 text-slate-700 rounded px-2 py-0.5 h-fit mt-0.5 whitespace-nowrap">{item.label}</code>
                <p className="text-sm text-slate-600 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MANUAL VS NEATSTAMP ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Manual approach vs using NeatStamp</h2>

          <p className="leading-relaxed mb-4">
            Writing HTML signatures by hand is doable if you&apos;re comfortable with HTML and willing
            to test carefully. It typically takes 1–3 hours to write a clean two-column signature from
            scratch, plus another hour of testing across clients. If you need to maintain and update it
            over time — new headshot, new job title, updated branding — those manual edits accumulate.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">The manual approach</h3>
          <p className="leading-relaxed mb-4">
            Write the HTML following the rules above. Test by emailing yourself and checking in Outlook
            (desktop), Gmail (browser), and your phone&apos;s mail app. The most common issues to debug:
            image dimensions, cellpadding/cellspacing missing from a nested table, a paragraph tag
            without{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">margin:0</code>, or a web font
            without a fallback. The{" "}
            <Link href="/html-email-signature" className="text-blue-600 hover:underline">
              HTML email signature guide
            </Link>{" "}
            has a full CSS support table showing which properties work in each client.
          </p>
          <p className="leading-relaxed mb-4">
            Use Litmus or Email on Acid if you need to test across many Outlook versions without
            access to each one. Both services render your HTML across 90+ clients. Email on Acid
            offers single-test purchases — useful if this is a one-time project.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">NeatStamp&apos;s approach</h3>
          <p className="leading-relaxed mb-4">
            NeatStamp generates table-based HTML with inline CSS automatically. You fill in your
            details and choose a template — the editor produces the correct Outlook-safe HTML
            without you writing a line of code. Specifically:
          </p>
          <ul className="list-none space-y-2 mb-4">
            {[
              "500px fixed-width table layout — no flexbox or grid anywhere in the output",
              "Inline CSS on every element — no style blocks, no classes",
              "Both HTML attributes and CSS styles for widths and background colors",
              "PNG icons for social links — no SVG",
              "Photo crop tool exports a PNG already cropped to shape (circle or square) — no border-radius needed",
              "Images hosted on NeatStamp's CDN at stable HTTPS URLs — no base64",
              "Web-safe font stacks with Arial/Helvetica fallbacks",
              "margin:0 on all paragraphs, spacing controlled via padding",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-blue-500 flex-shrink-0 mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="leading-relaxed">
            The output passes the 11-point Outlook Compatibility Check automatically (more on that
            below). If you want to see the HTML it generates, the editor has a code export button
            that shows you the full{" "}
            <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
              Outlook-compatible HTML
            </Link>{" "}
            ready to copy.
          </p>
        </section>

        {/* ── HOW TO INSTALL ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to install your HTML signature in Outlook</h2>

          <p className="leading-relaxed mb-6">
            The installation method depends on which version of Outlook you&apos;re using. Classic Outlook
            (the traditional desktop app), New Outlook (the 2024 redesign), and Outlook Web App (OWA)
            each have different paths.
          </p>

          {/* Classic Outlook */}
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Classic Outlook (2016, 2019, 2021, 365 desktop)</h3>
          <p className="leading-relaxed mb-4">
            Classic Outlook stores signatures as files in a specific Windows folder. You can drop your
            HTML file directly into that folder. See the full{" "}
            <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
              Outlook email signature installation guide
            </Link>{" "}
            for screenshots of each step.
          </p>

          <div className="space-y-3 mb-6">
            {[
              {
                step: "1",
                title: "Open the signatures folder",
                detail: "Press Win + R, type %APPDATA%\\Microsoft\\Signatures, press Enter. This opens the folder where Outlook stores signature files. If the folder doesn't exist, create it.",
              },
              {
                step: "2",
                title: "Save your HTML file here",
                detail: "Save your signature as yourname.htm (not .html — Outlook looks for .htm files). The filename becomes the signature's display name in Outlook's settings.",
              },
              {
                step: "3",
                title: "Create a matching _files folder",
                detail: "For Outlook to recognize the signature, create a folder named yourname_files in the same Signatures directory. This folder can be empty — it just needs to exist for Outlook to register the signature correctly.",
              },
              {
                step: "4",
                title: "Assign the signature in Outlook",
                detail: "In Outlook, go to File → Options → Mail → Signatures. You'll see your new signature in the list. Select it and assign it to your email account as the default for new emails and/or replies.",
              },
              {
                step: "5",
                title: "Test by composing a new email",
                detail: "Open a new compose window — your signature should appear automatically. Send a test email to yourself and check it in a fresh email client window (not the compose preview, which isn't a reliable rendering check).",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl border border-slate-200 px-5 py-4">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 mb-8">
            <p className="font-semibold text-amber-900 mb-2 text-sm">The %APPDATA% path in full</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              On most Windows installations:{" "}
              <code className="bg-amber-100 px-1 rounded">C:\Users\YourName\AppData\Roaming\Microsoft\Signatures</code>.
              The AppData folder is hidden by default — using %APPDATA% in the Run dialog bypasses the
              need to navigate to it manually. If you&apos;re on a managed corporate computer, the IT team
              may have set a different AppData path. Check with your IT department if the folder
              doesn&apos;t appear where expected.
            </p>
          </div>

          {/* New Outlook */}
          <h3 className="text-xl font-semibold text-slate-900 mb-4">New Outlook (2024 redesign)</h3>
          <p className="leading-relaxed mb-4">
            New Outlook uses a completely different architecture from classic Outlook. It doesn&apos;t read
            the Signatures folder. Signatures are stored in the cloud and managed through the app&apos;s
            settings UI. See the{" "}
            <Link href="/email-signature-outlook-365" className="text-blue-600 hover:underline">
              Outlook 365 signature guide
            </Link>{" "}
            for version-specific details.
          </p>
          <div className="space-y-3 mb-6">
            {[
              {
                step: "1",
                title: "Open your HTML in a browser",
                detail: "Open your signature HTML file in Chrome or Edge. The browser renders it as it will appear in email. Select all the rendered content (Ctrl+A) and copy it (Ctrl+C).",
              },
              {
                step: "2",
                title: "Go to New Outlook's signature settings",
                detail: "In New Outlook, click the gear icon (Settings) → Accounts → Signatures → New signature. Give it a name.",
              },
              {
                step: "3",
                title: "Paste the rendered signature",
                detail: "Click inside the signature editor and paste (Ctrl+V). The visual signature content pastes in — not the HTML code, but the rendered output. Some formatting survives the paste; some doesn't, depending on New Outlook's version.",
              },
              {
                step: "4",
                title: "Set as default and save",
                detail: "Choose the signature as default for new messages and/or replies under the dropdown. Click Save.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl border border-slate-200 px-5 py-4">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-slate-700 text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-slate-100 border border-slate-200 p-5 mb-8">
            <p className="font-semibold text-slate-900 mb-2 text-sm">New Outlook HTML limitations</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              New Outlook&apos;s signature editor does not accept raw HTML paste directly in most versions.
              The copy-from-browser workaround preserves basic formatting but may lose some styling.
              For guaranteed HTML fidelity in New Outlook, the most reliable approach is a server-side
              signature solution via Exchange or Microsoft 365 admin — or using{" "}
              <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                a team signature management tool
              </Link>.
            </p>
          </div>

          {/* OWA */}
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Outlook Web App (OWA)</h3>
          <p className="leading-relaxed mb-4">
            OWA (Outlook.com and the Office 365 web interface at outlook.office365.com) uses a browser
            engine to render HTML — so it supports more CSS than desktop Outlook. Installation:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 mb-4">
            <li>Click the gear icon → View all Outlook settings.</li>
            <li>Go to Mail → Compose and reply.</li>
            <li>In the Email signature section, click the signature editor area.</li>
            <li>Open your HTML in a browser, select all, copy, paste into the OWA editor.</li>
            <li>Alternatively, if your OWA version has a source view button (&lt;/&gt;), use it to paste your HTML directly.</li>
            <li>Save. Send a test email to verify.</li>
          </ol>
          <p className="text-sm text-slate-600 leading-relaxed">
            OWA&apos;s editor can strip some HTML on paste, particularly complex nested tables. If your
            layout breaks in OWA, simplify the nesting or use the{" "}
            <Link href="/editor" className="text-blue-600 hover:underline">
              NeatStamp editor&apos;s
            </Link>{" "}
            OWA-specific export option.
          </p>
        </section>

        {/* ── COMMON BREAKS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">HTML that commonly breaks in Outlook — and what to use instead</h2>

          <p className="leading-relaxed mb-6">
            These are the mistakes that show up in almost every first-attempt Outlook signature. Each
            one has a specific fix.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Broken HTML</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">What happens in Outlook</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    broken: "border-radius: 50%",
                    result: "Sharp square corners — ignored entirely",
                    fix: "Pre-crop the image to a circle shape as a PNG file. No CSS needed.",
                  },
                  {
                    broken: "display: flex",
                    result: "Columns collapse to a single vertical stack",
                    fix: "Use HTML table with two td elements for the two columns.",
                  },
                  {
                    broken: "max-width: 600px",
                    result: "Ignored — table expands to full width",
                    fix: "Use width='500' HTML attribute + style='width:500px;' on the table.",
                  },
                  {
                    broken: "background-image: url(...)",
                    result: "Background image doesn't render",
                    fix: "Use an img tag instead. For backgrounds on email sections, use VML (complex but supported).",
                  },
                  {
                    broken: "SVG images",
                    result: "Broken image icon or blank space",
                    fix: "Export the icon as a PNG. Keep file size under 20KB.",
                  },
                  {
                    broken: "base64 img src",
                    result: "Image appears as email attachment, paperclip icon on every email",
                    fix: "Host image at a public HTTPS URL and use that URL in the src attribute.",
                  },
                  {
                    broken: "position: absolute",
                    result: "Element disappears or overlaps other content",
                    fix: "Remove absolutely positioned elements. Use table cell padding for spacing.",
                  },
                  {
                    broken: "float: left/right",
                    result: "Elements stack or overlap unpredictably",
                    fix: "Use table columns for multi-column layout.",
                  },
                  {
                    broken: "--primary-color: #2563eb",
                    result: "Variable not resolved, property dropped",
                    fix: "Use literal color values everywhere. No CSS custom properties.",
                  },
                  {
                    broken: "p (no margin:0)",
                    result: "Large gaps between text elements",
                    fix: "Add style='margin:0 0 4px 0;' to every p tag.",
                  },
                  {
                    broken: "border: 1px solid #ccc (shorthand)",
                    result: "Border may not render in some Outlook versions",
                    fix: "Use individual border properties: border-left:1px solid #ccc; (not the shorthand).",
                  },
                ].map((row, i) => (
                  <tr key={row.broken} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-800">{row.broken}</td>
                    <td className="px-4 py-3 text-xs text-red-700">{row.result}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
            <p className="font-semibold text-blue-900 mb-2 text-sm">Dark mode and Outlook</p>
            <p className="text-sm text-blue-800 leading-relaxed">
              Outlook 2021 and 365 (Windows and Mac) apply an automatic dark mode inversion to email
              content. Light backgrounds flip to dark, dark text flips to light. This can make logos
              invisible and break carefully chosen color schemes. The{" "}
              <Link href="/email-signature-dark-mode-compatible" className="text-blue-700 hover:underline font-medium">
                dark mode compatible signature guide
              </Link>{" "}
              covers how to prevent unwanted inversions using{" "}
              <code className="bg-blue-100 px-1 rounded text-xs">color-scheme</code> meta tags and
              strategic use of light backgrounds.
            </p>
          </div>
        </section>

        {/* ── COMPATIBILITY TESTER ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">NeatStamp&apos;s Outlook Compatibility Tester</h2>
          <p className="leading-relaxed mb-6">
            NeatStamp runs an 11-point compatibility check automatically when you export a signature.
            Each check corresponds to a specific Outlook rendering issue. If any check fails, you get
            a specific description of the problem and how to fix it before you install.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { num: "01", label: "Table-based layout", detail: "No flexbox, grid, float, or position detected in the signature HTML" },
              { num: "02", label: "Inline CSS only", detail: "No <style> blocks, no CSS classes, no external stylesheet links" },
              { num: "03", label: "Fixed pixel widths", detail: "Outer table and all columns have explicit pixel width attributes" },
              { num: "04", label: "Image HTML attributes", detail: "Every img tag has both width= and height= HTML attributes" },
              { num: "05", label: "No border-radius", detail: "No border-radius property anywhere in the inline CSS" },
              { num: "06", label: "No SVG images", detail: "All image src attributes reference PNG or JPEG files, not SVG" },
              { num: "07", label: "No base64 images", detail: "No data: URLs in any img src — all images use HTTPS URLs" },
              { num: "08", label: "No CSS variables", detail: "No var(--property) references in any inline style" },
              { num: "09", label: "No position/float", detail: "No position:absolute, position:relative, or float properties" },
              { num: "10", label: "Web-safe font fallbacks", detail: "Every font-family declaration includes Arial, Helvetica, or another system font fallback" },
              { num: "11", label: "HTTPS image URLs", detail: "All image URLs begin with https:// and point to public hosts" },
            ].map((check) => (
              <div key={check.num} className="flex gap-3 rounded-lg border border-slate-200 px-4 py-3 bg-white">
                <span className="flex-shrink-0 text-xs font-mono text-slate-400 mt-0.5 w-6">{check.num}</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{check.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{check.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Signatures built with NeatStamp pass all 11 checks by default — the HTML generator follows
            these rules in its output. The tester is most useful if you&apos;ve customized the generated
            HTML manually or if you&apos;re pasting in HTML from another source to check it. It&apos;s available
            on the{" "}
            <Link href="/email-signature-outlook-compatible" className="text-blue-600 hover:underline">
              Outlook-compatible signature
            </Link>{" "}
            page and in the editor export panel.
          </p>
        </section>

        {/* ── MOBILE FRIENDLY NOTE ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What about mobile?</h2>
          <p className="leading-relaxed mb-4">
            Outlook-safe HTML (table-based, 500px wide) renders reasonably well on most mobile email
            clients. A 500px table will scale down on smaller screens — the layout stays intact but
            text and images get smaller. For most signatures this is acceptable. For a signature
            that needs to look deliberately designed on mobile, you&apos;d need media queries — but Outlook
            ignores those, so any mobile-specific adjustments will only apply to non-Outlook clients.
          </p>
          <p className="leading-relaxed mb-4">
            The practical approach: keep your signature simple enough that it reads clearly at 500px
            wide and at 60–70% of that on mobile. Avoid small text (under 12px), avoid cramming too
            many elements in, and make sure phone and email links use{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">tel:</code> and{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">mailto:</code> links so they&apos;re
            tappable. The{" "}
            <Link href="/email-signature-mobile-friendly" className="text-blue-600 hover:underline">
              mobile-friendly signature guide
            </Link>{" "}
            goes into more depth on optimizing for smaller screens without breaking Outlook.
          </p>
        </section>

        {/* ── DARK MODE BOX ── */}
        <section className="mb-12">
          <div className="rounded-2xl bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to generate Outlook-safe HTML?</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              NeatStamp&apos;s editor generates table-based, inline-CSS signatures that pass the Outlook
              Compatibility Tester automatically. You fill in your details, pick a template, and the
              correct HTML comes out — no manual table writing required.
            </p>
            <p className="text-slate-300 leading-relaxed mb-5">
              Export options include a downloadable .htm file ready to drop into your Outlook Signatures
              folder, copy-to-clipboard for OWA and New Outlook, and a full HTML source view. Works
              for individual signatures and for{" "}
              <Link href="/email-signature-for-teams" className="text-blue-300 hover:underline">
                team rollouts
              </Link>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Create your signature — free
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Browse templates →
              </Link>
            </div>
          </div>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Related guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/email-signature-outlook", label: "Outlook email signature setup — step by step" },
              { href: "/email-signature-outlook-365", label: "Outlook 365 signature guide" },
              { href: "/email-signature-outlook-compatible", label: "Outlook-compatible signature generator" },
              { href: "/html-email-signature", label: "HTML email signature — works in every client" },
              { href: "/blog/outlook-signature-not-working", label: "Fix: Outlook signature not working" },
              { href: "/blog/email-signature-not-showing-outlook", label: "Fix: signature not showing in Outlook" },
              { href: "/email-signature-mobile-friendly", label: "Mobile-friendly email signatures" },
              { href: "/email-signature-for-teams", label: "Team email signature management" },
              { href: "/email-signature-dark-mode-compatible", label: "Dark mode compatible signatures" },
              { href: "/templates", label: "Browse signature templates" },
              { href: "/editor", label: "Create your HTML signature — free" },
              { href: "/examples", label: "Email signature examples gallery" },
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
