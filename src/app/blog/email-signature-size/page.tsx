import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Size Guide — Dimensions & Limits (2026)",
  description:
    "Exact email signature size specs: max width 600px, image sizes for Gmail and Outlook, logo dimensions, file size limits, and what breaks when you exceed them.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-size",
  },
};

const faqs = [
  {
    q: "What is the ideal email signature width?",
    a: "600px is the standard maximum width. Most desktop email clients display the reading pane at 600–800px wide, and mobile email clients scale down a 600px layout reasonably well. Going wider causes horizontal scrollbars on mobile.",
  },
  {
    q: "What's the ideal email signature height?",
    a: "Keep the visible height between 100px and 200px. That's enough room for your name, title, contact info, and a small logo or headshot. Signatures taller than 200px start to feel longer than the emails themselves.",
  },
  {
    q: "How big should the logo be in an email signature?",
    a: "Display the logo at 150–200px wide and set the actual image at 2x resolution (300–400px) so it's sharp on retina displays. The file size should be under 20KB — PNG for logos with transparency.",
  },
  {
    q: "Is there a file size limit for email signature images?",
    a: "There's no hard limit enforced by email standards, but large images cause problems. Gmail shows a 'Show images' prompt when an email with images exceeds certain size thresholds. Outlook can convert images to attachments. Aim for total signature image weight under 80KB.",
  },
  {
    q: "Why does Outlook resize my signature images?",
    a: "Outlook uses DPI scaling based on your monitor settings. At 120 DPI or 150 DPI, Outlook scales up images that don't have explicit width/height HTML attributes. Always set width and height attributes directly on the img tag, not just in CSS.",
  },
];

export default function EmailSignatureSizePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Size Guide",
            url: "https://neatstamp.com/blog/email-signature-size",
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
            <span className="text-slate-700">Email Signature Size Guide</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Technical
                </span>
                <span className="text-sm text-slate-400">12 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Size Guide — Dimensions, Image Sizes &amp; Limits (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Getting the dimensions wrong is the most common technical reason email
                signatures look broken. This guide gives you the exact numbers — width,
                height, image resolution, file size limits — and explains what actually
                happens in each email client when you exceed them.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 12 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#overall-dimensions", "Overall signature dimensions"],
                  ["#image-sizes-by-client", "Image sizes by email client"],
                  ["#logo-dimensions", "Logo dimensions"],
                  ["#headshot-dimensions", "Headshot dimensions"],
                  ["#banner-dimensions", "Banner dimensions"],
                  ["#file-size-limits", "File size limits and what exceeds them"],
                  ["#outlook-dpi", "Outlook DPI and scaling issues"],
                  ["#quick-reference", "Quick reference table"],
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

            {/* Section 1 */}
            <section id="overall-dimensions" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Overall signature dimensions
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before we get into the specifics of individual image types, let&rsquo;s establish
                the outer bounds of the whole signature block.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3">
                  Target dimensions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Maximum width", value: "600px" },
                    { label: "Ideal height", value: "100–200px" },
                    { label: "Absolute max height", value: "300px" },
                    { label: "Minimum font size", value: "10px" },
                  ].map((dim) => (
                    <div key={dim.label} className="bg-white rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-medium mb-1">{dim.label}</p>
                      <p className="text-lg font-bold text-slate-900">{dim.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Why 600px?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                600px became the de facto email standard during the era of 1024px desktop
                monitors. A typical email client with a sidebar took up about 400px, leaving
                around 600px for the reading pane. Even in 2026, with wider monitors
                everywhere, email clients like Outlook, Gmail, and Apple Mail still constrain
                the message column to roughly 600–700px in their default layouts.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                More importantly, mobile email clients scale a 600px email down gracefully.
                A 700px email, by contrast, requires horizontal scrolling on most phones —
                a UX failure that makes your signature look unprofessional. The{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail signature guide
                </Link>{" "}
                and the{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature guide
                </Link>{" "}
                both cover client-specific rendering in more detail.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Why keep height under 200px?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                There&rsquo;s no hard technical limit on height — you could make a 1000px tall
                signature and most clients would display it. The issue is practical: a signature
                longer than the email itself is noise. Recipients scroll past it and eventually
                start filtering people who send them. Short emails with towering signatures look
                like the author doesn&rsquo;t respect their reader&rsquo;s time.
              </p>
              <p className="text-slate-600 leading-relaxed">
                I&rsquo;ve seen enterprise customers ask about including detailed company
                information, legal disclaimers, and promotional banners all in one signature.
                The answer is usually to pick one: either include the banner or the disclaimer,
                not both stacked below a full contact block.
              </p>
            </section>

            {/* Section 2 */}
            <section id="image-sizes-by-client" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Image sizes by email client
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Each major email client handles images differently. Here&rsquo;s exactly what each
                one does and what you need to know for each.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Gmail
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Gmail proxies all images through Google&rsquo;s caching servers (the{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  googleusercontent.com
                </code>{" "}
                CDN). This happens automatically and changes your image URLs when the email
                arrives. The practical implications:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  Images load fast for recipients — Google&rsquo;s CDN is global and fast.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  Gmail does not enforce a strict file size limit per image, but very large
                  images (over 5MB) may fail to proxy. Keep images under 5MB (easily done with
                  proper optimization — your logo should be 10–20KB, not 5MB).
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  Gmail clips emails that exceed 102KB total — not just images, but the entire
                  HTML. If your signature HTML (including base64 images) pushes an email over
                  102KB, Gmail shows a &ldquo;[Message clipped]&rdquo; link. This is why externally hosted
                  images are critical in Gmail.
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                The{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail email signature guide
                </Link>{" "}
                covers the full setup process for Gmail-specific signatures.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Outlook (Desktop — 2016, 2019, 2021, 365)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Outlook desktop is the most demanding email client when it comes to image
                handling. Several specific behaviors to know:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Images blocked by default</strong> — Outlook blocks images from
                    external senders until the user clicks &ldquo;Show images.&rdquo; Your logo and
                    headshot will not appear on first view for new contacts. This is why alt
                    text matters: set descriptive alt text on every image.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>DPI scaling</strong> — if the user&rsquo;s monitor is set to 120 DPI
                    or higher (common on high-DPI Windows laptops), Outlook scales up images
                    without proper width/height HTML attributes. More on this in the{" "}
                    <a href="#outlook-dpi" className="text-blue-600 hover:underline">
                      Outlook DPI section
                    </a>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Images as attachments</strong> — older versions of Outlook (2010,
                    2013) sometimes convert inline signature images to attachments if the
                    image is embedded via base64 or if the message format is set to
                    plain text.
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                The{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature guide
                </Link>{" "}
                and the{" "}
                <Link
                  href="/email-signature-outlook-365"
                  className="text-blue-600 hover:underline"
                >
                  Outlook 365 signature guide
                </Link>{" "}
                go into full setup instructions.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Apple Mail (macOS and iOS)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Apple Mail is generally the most forgiving of the three. It handles modern
                CSS better than Outlook, doesn&rsquo;t block images by default, and supports
                retina rendering. The main quirk is that Apple Mail on iOS may re-flow
                your signature layout depending on the iOS version and display scaling.
                Keep your layout to a single column or a simple two-column table (content +
                headshot) to avoid surprises.
              </p>
            </section>

            {/* Section 3 */}
            <section id="logo-dimensions" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Logo dimensions
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The logo is usually the largest element in a signature and the one that
                causes the most rendering problems. Here&rsquo;s exactly how to size it.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Property
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Value
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Why
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        prop: "Display width",
                        val: "150–200px",
                        why: "Visible in the signature. Proportional to the text block.",
                      },
                      {
                        prop: "Display height",
                        val: "40–60px (horizontal logo)",
                        why: "Enough vertical space to read the name/mark.",
                      },
                      {
                        prop: "Actual file width",
                        val: "300–400px",
                        why: "2x resolution for retina/HiDPI screens.",
                      },
                      {
                        prop: "File format",
                        val: "PNG (transparent bg)",
                        why: "Preserves crisp edges. Works on any background color.",
                      },
                      {
                        prop: "File size",
                        val: "Under 20KB",
                        why: "Keeps total email size down. No delivery issues.",
                      },
                      {
                        prop: "HTML attributes",
                        val: 'width="200" height="53"',
                        why: "Prevents Outlook DPI scaling. Always set both.",
                      },
                    ].map((row) => (
                      <tr key={row.prop}>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {row.prop}
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-700">
                            {row.val}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-slate-500">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                One common mistake: using an SVG file for the logo. SVGs are not universally
                supported in email clients — Outlook desktop doesn&rsquo;t render them at all, and
                neither does Gmail. Always export your logo as a PNG for email use.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If your brand uses a square icon/mark alongside a horizontal wordmark, use
                the horizontal version in signatures — square logos at signature scale (40–60px)
                are often unreadable. For more on how logos interact with signature layout, the{" "}
                <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">
                  signature with logo guide
                </Link>{" "}
                is the right next read.
              </p>
            </section>

            {/* Section 4 */}
            <section id="headshot-dimensions" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Headshot dimensions
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A headshot (or profile photo) in a signature adds a human face to what
                would otherwise be a block of text. Here are the sizing specs:
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <ul className="space-y-2 text-sm text-blue-800">
                  {[
                    "Display size: 80×80px or 100×100px. Square or circle crop.",
                    "Actual file resolution: 160×160px or 200×200px (2x for retina).",
                    "File size: under 25KB. JPEG compression at 80% quality is usually enough.",
                    "Format: JPG (not PNG — photos compress much smaller as JPG).",
                    "Crop style: Professional headshot, neutral background, face centered.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                For circle crops, you can achieve this in CSS with{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  border-radius: 50%
                </code>
                — but be aware that Outlook (before the new web-based version) ignores
                border-radius on images. The NeatStamp editor handles this by providing a
                pre-cropped circle image rather than relying on CSS, which works in every
                client.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Headshot vs. no headshot: I&rsquo;d recommend it if your role is client-facing. For
                internal communications or technical roles, it&rsquo;s less important. When in doubt,
                check what senior people at your company do.
              </p>
            </section>

            {/* Section 5 */}
            <section id="banner-dimensions" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Banner dimensions
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A banner is a promotional strip at the bottom of your signature — useful
                for advertising a webinar, a product launch, a new case study, or a
                professional certification.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Property
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { prop: "Width", val: "600px (full-width) or 400–500px (narrower)" },
                      { prop: "Height", val: "60–100px" },
                      { prop: "Actual file resolution", val: "1200px × 120–200px (2x)" },
                      { prop: "File size", val: "Under 40KB" },
                      { prop: "Format", val: "JPG for photo-heavy, PNG for graphic/text" },
                    ].map((row) => (
                      <tr key={row.prop}>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {row.prop}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                A few banner best practices: always link the banner image to the relevant
                page. Include the key information as alt text, because Outlook blocks images
                by default and many recipients will see a blank box first. Keep the design
                simple — at 80px tall, you don&rsquo;t have room for long copy. One headline and a
                clear CTA is enough.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Banners are available in NeatStamp Pro alongside the rest of the signature
                builder. The{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  free editor
                </Link>{" "}
                handles the standard signature elements without a banner.
              </p>
            </section>

            {/* Section 6 */}
            <section id="file-size-limits" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                File size limits and what exceeds them
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There&rsquo;s no single universal file size limit across email clients — each
                has its own thresholds and failure modes. Here&rsquo;s what actually happens when
                images are too large.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    client: "Gmail",
                    limit: "102KB total email HTML",
                    failure:
                      'When the entire email (HTML + inline base64 images) exceeds 102KB, Gmail clips the message and shows "[Message clipped] View entire message." The signature is usually at the bottom and gets clipped first.',
                  },
                  {
                    client: "Outlook Desktop",
                    limit: "No hard image limit, but...",
                    failure:
                      "If you embed images as base64 data URIs, Outlook may convert them to file attachments — showing a paperclip icon and attaching the image as a .png file. The image disappears from the signature body. This is why hosted images (not embedded) are required for Outlook.",
                  },
                  {
                    client: "Exchange / Microsoft 365",
                    limit: "Admin-configurable",
                    failure:
                      "Exchange administrators can set maximum message size limits (typically 25MB–50MB). Signatures with very large embedded images can push emails over these limits and cause delivery failures.",
                  },
                  {
                    client: "Apple Mail",
                    limit: "Generous — practical limit is ISP/server-side",
                    failure:
                      "Apple Mail itself doesn't clip. However, if you send large emails through an ISP with a 25MB send limit, large embedded signatures can cause failures for image-heavy emails.",
                  },
                ].map((row) => (
                  <div
                    key={row.client}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-slate-900">{row.client}</h3>
                      <code className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded font-mono whitespace-nowrap">
                        {row.limit}
                      </code>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{row.failure}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                The solution in every case is the same: host your signature images externally
                (on a CDN or your company website) and reference them with a standard{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  src="https://..."
                </code>{" "}
                URL. Never embed them as base64 in the HTML. The{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>{" "}
                explains exactly how to structure the markup.
              </p>
            </section>

            {/* Section 7 */}
            <section id="outlook-dpi" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Outlook DPI and scaling issues
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the most technically fiddly issue in email signatures, and it only
                affects Outlook on Windows. Here&rsquo;s exactly what happens and how to fix it.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The problem
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Windows allows users to set their display scaling (DPI) as a percentage:
                100% (96 DPI), 125% (120 DPI), 150% (144 DPI), or 200% (192 DPI). Modern
                laptops with high-resolution screens often ship at 125% or 150%.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                When Outlook renders an email, it uses the GDI rendering engine (inherited
                from Microsoft Word, which is the actual engine behind Outlook&rsquo;s HTML renderer).
                GDI respects Windows DPI. If your image is 200px wide but you only specify
                the width in CSS (not in the HTML attribute), Outlook scales it up proportionally
                to the DPI setting. At 150% DPI, your 200px logo becomes 300px.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The fix
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Always set both{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  width
                </code>{" "}
                and{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  height
                </code>{" "}
                as HTML attributes on the{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  &lt;img&gt;
                </code>{" "}
                tag, not just as CSS:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  {`<!-- Wrong — only CSS width -->
<img src="logo.png" style="width:200px;" />

<!-- Right — HTML attributes AND CSS -->
<img src="logo.png"
     width="200"
     height="53"
     style="width:200px;height:53px;display:block;" />`}
                </pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                The HTML{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  width
                </code>{" "}
                and{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  height
                </code>{" "}
                attributes tell Outlook&rsquo;s Word-based renderer exactly how many pixels to
                allocate — it respects these over DPI scaling. The CSS{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  width/height
                </code>{" "}
                handles the other clients. You need both.
              </p>
              <p className="text-slate-600 leading-relaxed">
                NeatStamp generates signatures with correct HTML attributes automatically.
                If you&rsquo;re writing your own HTML, this is the detail that&rsquo;s easiest to miss
                and most visible when wrong. The{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature guide
                </Link>{" "}
                has a complete checklist for Outlook-proof images.
              </p>
            </section>

            {/* Section 8 — Quick reference */}
            <section id="quick-reference" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Quick reference table
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Bookmark this. These are the numbers to use for every project.
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Element
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Display size
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        File resolution
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Max file size
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">
                        Format
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        el: "Entire signature",
                        display: "≤600px wide, 100–200px tall",
                        res: "—",
                        size: "—",
                        fmt: "—",
                      },
                      {
                        el: "Logo (horizontal)",
                        display: "150–200px × 40–60px",
                        res: "300–400px × 2x",
                        size: "20KB",
                        fmt: "PNG",
                      },
                      {
                        el: "Logo (square/icon)",
                        display: "40–60px × 40–60px",
                        res: "80–120px × 2x",
                        size: "10KB",
                        fmt: "PNG",
                      },
                      {
                        el: "Headshot",
                        display: "80–100px × 80–100px",
                        res: "160–200px × 2x",
                        size: "25KB",
                        fmt: "JPG",
                      },
                      {
                        el: "Banner",
                        display: "600px × 60–100px",
                        res: "1200px × 2x",
                        size: "40KB",
                        fmt: "JPG or PNG",
                      },
                      {
                        el: "Social icon",
                        display: "20–24px × 20–24px",
                        res: "40–48px × 2x",
                        size: "3KB",
                        fmt: "PNG",
                      },
                    ].map((row) => (
                      <tr key={row.el}>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {row.el}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{row.display}</td>
                        <td className="py-3 px-4 text-slate-600">{row.res}</td>
                        <td className="py-3 px-4 text-slate-600">{row.size}</td>
                        <td className="py-3 px-4 text-slate-600">{row.fmt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                Build a correctly sized signature right now
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates Outlook-proof signatures with correct image dimensions
                automatically. Free, no account needed.
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
