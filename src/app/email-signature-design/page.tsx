import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Design — Templates, Ideas & Best Practices | NeatStamp",
  description:
    "Good email signature design isn't about being flashy — it's about being clear. Covers templates, typography, colors, image sizing, mobile rendering, and common mistakes.",
  alternates: {
    canonical: "https://neatstamp.com/email-signature-design",
  },
};

const faqs = [
  {
    q: "What is the ideal width for an email signature?",
    a: "Between 500px and 600px. Most email clients display content at roughly 600px wide. If your signature is wider than that, it will either get clipped or force horizontal scrolling on mobile. NeatStamp's templates are all constrained to 500px to give a comfortable margin.",
  },
  {
    q: "Can I use custom fonts in my email signature?",
    a: "Not reliably. Custom fonts (including Google Fonts) require a font load from an external server, and most email clients block external resources or simply ignore font-face declarations. When the font doesn't load, the email client substitutes a system default — often at a slightly different size and spacing. Use Arial, Verdana, Georgia, Trebuchet MS, or Times New Roman.",
  },
  {
    q: "Why does my signature look different in Outlook than in Gmail?",
    a: "Outlook Desktop uses Microsoft Word's rendering engine, which ignores most CSS. Flexbox, grid, and floats don't work. Margins, padding, and line-height behave differently. The only reliable layout approach for Outlook is HTML tables. If your signature was built with modern CSS, it may look fine in Gmail and broken in Outlook.",
  },
  {
    q: "What file format should I use for my logo?",
    a: "PNG with a transparent background is best. It works on both light and dark email themes and doesn't show a white rectangle around the logo. Keep the file size under 100KB. Avoid SVG — Outlook doesn't render SVG images.",
  },
  {
    q: "How do I make my signature look good on mobile?",
    a: "Use a single-column layout. Two-column designs (photo on the left, text on the right) often collapse or wrap poorly on small screens. Keep total content width under 500px. Avoid very small text — 12px is the minimum for comfortable mobile reading. Test by sending yourself a test email and viewing it on your phone.",
  },
  {
    q: "How many colors should an email signature use?",
    a: "Two at most. One primary color (typically your brand color, used for your name, links, or dividers) and dark gray or black for body text. Three or more colors makes the signature feel cluttered. If you're unsure, monochrome — black name, gray secondary text — always looks clean.",
  },
  {
    q: "What size should a headshot be in an email signature?",
    a: "Display it at 80×80px. Upload the actual image file at 160×160px (2× the display size) for sharp rendering on retina screens. Use the HTML width and height attributes to constrain the display size rather than CSS, as Outlook ignores CSS sizing on images.",
  },
  {
    q: "Should I include a banner image in my email signature?",
    a: "Only if it serves a specific purpose — a promotion, an event, or a clear CTA. Decorative banners add weight to every email you send and are often blocked by corporate email clients that strip images. If you use one, keep it under 600px wide, under 150px tall, and under 100KB.",
  },
];

export default function EmailSignatureDesignPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature Design",
            url: "https://neatstamp.com/email-signature-design",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signature Design
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Good design isn't about being flashy. It's about being clear. The
              best email signatures you've ever seen probably didn't stand out
              — they just felt right. This guide covers everything that makes
              that happen.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Design My Signature — Free
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
            <p className="mt-3 text-sm text-muted">No account needed.</p>
          </div>

          {/* Design principles */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Email signature design principles that actually matter
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Email signatures are small. The constraints are real. You have a
              few lines of text and maybe an image to communicate who you are
              and how to reach you. These principles are what separate a
              signature that works from one that gets in the way.
            </p>
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Hierarchy
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Your name should be the most visually prominent element.
                  Job title second. Everything else — phone, links, company —
                  should be smaller or lighter. In practice this means: name
                  at 14–16px and bold, title and company at 13px in a medium
                  weight, contact details at 12px in a muted gray. This is
                  how readers naturally scan from most to least important.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Whitespace
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Line height of 1.4–1.6 makes text readable without the
                  signature feeling crammed. Add a small amount of space
                  (8–12px) between logical groups — for example, between your
                  name/title block and your contact details block. Whitespace
                  is what makes a signature feel organized rather than dense.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Alignment
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Left-align everything unless you're using a centered
                  single-column layout. Mixed alignments — some centered, some
                  left — look accidental. If you have a photo or logo on the
                  left with text on the right, make sure the text column
                  starts at a consistent horizontal position across all rows.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Consistency
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Use the same font throughout. The same font size for the
                  same hierarchy level. The same color for all links. Mixing
                  fonts, sizes, or link colors inside a single signature
                  creates visual noise that reads as sloppiness even if the
                  reader can't articulate why.
                </p>
              </div>
            </div>
          </section>

          {/* Templates */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Choosing the right template for your context
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              NeatStamp's templates are built around these principles. Here's
              what each style is best suited for — and when you should pick
              one over the others.
            </p>

            <div className="space-y-5">
              <div className="rounded-xl border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Minimal</h3>
                  <span className="text-xs text-muted bg-surface border border-border px-2 py-0.5 rounded-full">
                    Most versatile
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  A single column. Name, title, contact details, optional
                  social links. No photo, no logo. Pure text with one accent
                  color.
                </p>
                <p className="text-sm text-muted">
                  <strong className="text-foreground">Best for:</strong> Lawyers,
                  accountants, engineers, consultants, anyone in a formal or
                  technical context. Works equally well whether you're emailing
                  a client for the first time or replying to an internal thread.
                </p>
              </div>

              <div className="rounded-xl border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">With headshot</h3>
                  <span className="text-xs text-muted bg-surface border border-border px-2 py-0.5 rounded-full">
                    Relationship-driven roles
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  Two-column layout: headshot on the left (80×80px), name,
                  title, and contact details on the right.
                </p>
                <p className="text-sm text-muted">
                  <strong className="text-foreground">Best for:</strong> Sales,
                  real estate, coaching, recruiting, financial advisors —
                  any role where putting a face to a name matters. See the{" "}
                  <Link href="/professional-email-signature" className="text-primary underline underline-offset-2">
                    professional email signature guide
                  </Link>{" "}
                  for headshot sizing best practices.
                </p>
              </div>

              <div className="rounded-xl border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">With logo</h3>
                  <span className="text-xs text-muted bg-surface border border-border px-2 py-0.5 rounded-full">
                    Brand-forward
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  Company logo positioned above or beside the contact details.
                  Works best with a horizontal logo under 150px wide.
                </p>
                <p className="text-sm text-muted">
                  <strong className="text-foreground">Best for:</strong> Small
                  business owners, agency staff, startup founders — anyone
                  where the brand is still being built and every touchpoint
                  matters. See the{" "}
                  <Link href="/email-signature-with-logo" className="text-primary underline underline-offset-2">
                    email signature with logo guide
                  </Link>{" "}
                  for logo file format and sizing guidance.
                </p>
              </div>

              <div className="rounded-xl border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">With CTA</h3>
                  <span className="text-xs text-muted bg-surface border border-border px-2 py-0.5 rounded-full">
                    Sales &amp; outreach
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  Includes a styled call-to-action line below the contact
                  details — a booking link, a resource, or a product page.
                </p>
                <p className="text-sm text-muted">
                  <strong className="text-foreground">Best for:</strong> Sales
                  reps, consultants, and anyone who sends a high volume of
                  outbound email. Use a single, specific CTA — not multiple.
                  "Book a 20-minute call →" with a Calendly link is a good
                  example.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-muted">
              Browse all templates in the{" "}
              <Link href="/templates" className="text-primary underline underline-offset-2">
                NeatStamp template gallery
              </Link>
              . Each one is table-based and tested in Outlook.
            </p>
          </section>

          {/* Colors */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Colors in email signatures — what works and what doesn't
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              The rule is simple: two colors. One for accents, one for body
              text. Here's how that plays out in practice.
            </p>

            <div className="rounded-xl border border-border bg-surface p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">
                Proven combinations
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "Professional blue",
                    primary: "#2563eb",
                    body: "#0f172a",
                    use: "Technology, finance, SaaS, general business",
                  },
                  {
                    name: "Forest green",
                    primary: "#16a34a",
                    body: "#111827",
                    use: "Sustainability, healthcare, wellness, education",
                  },
                  {
                    name: "Slate gray",
                    primary: "#475569",
                    body: "#0f172a",
                    use: "Law, accounting, consulting — very conservative contexts",
                  },
                  {
                    name: "Deep orange",
                    primary: "#c2410c",
                    body: "#1c1917",
                    use: "Creative agencies, media, hospitality",
                  },
                  {
                    name: "Monochrome",
                    primary: "#0f172a",
                    body: "#475569",
                    use: "Any industry — the safest and most timeless option",
                  },
                ].map((combo, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex gap-1.5 flex-shrink-0">
                      <div
                        className="h-6 w-6 rounded-full border border-border"
                        style={{ backgroundColor: combo.primary }}
                      />
                      <div
                        className="h-6 w-6 rounded-full border border-border"
                        style={{ backgroundColor: combo.body }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {combo.name}
                      </div>
                      <div className="text-xs text-muted">
                        {combo.primary} + {combo.body} — {combo.use}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-semibold text-foreground mb-3">
              Color psychology basics (applied to signatures)
            </h3>
            <p className="text-muted leading-relaxed mb-4 text-sm">
              Blue reads as trustworthy and stable — it's the most common
              choice in professional contexts for a reason. Green signals
              growth or health. Gray and black are authoritative and timeless.
              Red draws attention but is also associated with alerts and errors —
              use it carefully. Yellow and orange can work for creative
              contexts but often look casual.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              If your company has brand colors, match them exactly. Use the
              hex code from your brand guide, not an approximation. Being
              slightly off (#2464eb instead of #2563eb) is visible to anyone
              who works on brand materials and gives the impression of
              carelessness. If you're not sure what your brand color is, ask
              your marketing team for the hex code.
            </p>
          </section>

          {/* Typography */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Typography for email signatures
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Typography is where most people's design instincts work against
              them. You want to use a nice font. But email isn't a webpage —
              it doesn't load fonts from Google Fonts. Here's the reality.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-6">
              <h3 className="font-semibold text-foreground mb-2">
                Why custom fonts break in email
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Custom fonts require the email client to fetch the font file
                from an external server. Gmail, Outlook, and most corporate
                email clients either block external requests for security
                reasons or simply don't support @font-face declarations.
                When the font doesn't load, the client substitutes a system
                font — usually Arial or Times New Roman — at whatever default
                size it feels like. Your carefully sized 15px Inter suddenly
                becomes 16px Arial and the spacing shifts. Table cells that
                fit at the original size now overflow.
              </p>
            </div>

            <h3 className="font-semibold text-foreground mb-4">
              Web-safe fonts that work in every email client
            </h3>
            <div className="space-y-4 mb-6">
              {[
                {
                  font: "Arial / Helvetica",
                  character: "Clean, neutral, modern-ish",
                  best: "Default choice for most professional contexts",
                  stack: "Arial, Helvetica, sans-serif",
                },
                {
                  font: "Verdana",
                  character: "Wider letterforms, very readable at small sizes",
                  best: "Good for small text — phone numbers, disclaimers",
                  stack: "Verdana, Geneva, sans-serif",
                },
                {
                  font: "Georgia",
                  character: "Serif — warm, editorial, slightly formal",
                  best: "Law, finance, publishing — traditional industries",
                  stack: "Georgia, 'Times New Roman', serif",
                },
                {
                  font: "Trebuchet MS",
                  character: "Slightly more personality than Arial",
                  best: "Marketing, creative, startup contexts",
                  stack: "Trebuchet MS, Helvetica, sans-serif",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4
                      className="font-semibold text-foreground"
                      style={{ fontFamily: item.stack }}
                    >
                      {item.font}
                    </h4>
                  </div>
                  <p className="text-sm text-muted mb-1">{item.character}</p>
                  <p className="text-xs text-muted">
                    <strong>Best for:</strong> {item.best}
                  </p>
                  <p className="text-xs text-muted-light mt-1 font-mono">
                    {item.stack}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-foreground mb-3">Font sizes</h3>
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Name</span>
                  <span className="text-muted">14–16px, bold</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Title / Company</span>
                  <span className="text-muted">13–14px, regular or medium weight</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Contact details</span>
                  <span className="text-muted">12–13px, regular weight</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Legal disclaimer</span>
                  <span className="text-muted">10–11px, lighter color</span>
                </div>
              </div>
            </div>
          </section>

          {/* Image sizing */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Image sizing and placement — exact dimensions
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Image handling is one of the trickier parts of email signature
              design because Outlook and Gmail handle them differently. Here
              are the exact numbers I recommend.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="py-3 text-left font-semibold text-foreground">
                      Image type
                    </th>
                    <th className="py-3 text-left font-semibold text-foreground">
                      Display size
                    </th>
                    <th className="py-3 text-left font-semibold text-foreground">
                      Upload size (2×)
                    </th>
                    <th className="py-3 text-left font-semibold text-foreground">
                      Max file size
                    </th>
                    <th className="py-3 text-left font-semibold text-foreground">
                      Format
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 text-foreground">Headshot</td>
                    <td className="py-3 text-muted">80×80px</td>
                    <td className="py-3 text-muted">160×160px</td>
                    <td className="py-3 text-muted">80KB</td>
                    <td className="py-3 text-muted">JPEG or PNG</td>
                  </tr>
                  <tr className="bg-surface">
                    <td className="py-3 text-foreground">Company logo (inline)</td>
                    <td className="py-3 text-muted">max 150px wide</td>
                    <td className="py-3 text-muted">max 300px wide</td>
                    <td className="py-3 text-muted">60KB</td>
                    <td className="py-3 text-muted">PNG (transparent)</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-foreground">Banner (below signature)</td>
                    <td className="py-3 text-muted">max 500px wide, max 150px tall</td>
                    <td className="py-3 text-muted">max 1000px wide</td>
                    <td className="py-3 text-muted">100KB</td>
                    <td className="py-3 text-muted">JPEG or PNG</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 mb-4">
              <h3 className="font-semibold text-foreground mb-2">
                DPI and Outlook — the retina problem
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Outlook on Windows doesn't automatically adjust images for
                high-DPI displays. An image uploaded at exactly 80×80px will
                look blurry on a retina screen because Outlook displays it at
                80×80px physical pixels without upscaling. The fix: upload at
                160×160px and constrain the display size using HTML attributes
                — <code className="text-xs bg-border rounded px-1">width="80" height="80"</code> directly
                on the <code className="text-xs bg-border rounded px-1">&lt;img&gt;</code> tag,
                not in CSS. Outlook respects HTML attributes; it ignores CSS
                properties on images.
              </p>
            </div>

            <p className="text-sm text-muted">
              For full guidance on using a logo specifically, see the{" "}
              <Link href="/email-signature-with-logo" className="text-primary underline underline-offset-2">
                email signature with logo guide
              </Link>
              .
            </p>
          </section>

          {/* Design mistakes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Design mistakes to avoid
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              These come up constantly. Some are obvious in hindsight, some
              less so.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Using CSS floats or flexbox for layout",
                  detail:
                    "Outlook Desktop ignores CSS layout properties. A signature built with float: left for the photo and a div for the text will look correct in Gmail and completely broken in Outlook — the photo and text will stack vertically instead of sitting side by side. Use HTML tables for any multi-column layout.",
                },
                {
                  title: "Inline images vs. linked images — and getting it wrong",
                  detail:
                    "Images can be embedded inline (base64 encoded directly in the HTML) or linked from a URL. Inline images are never blocked by corporate firewalls. Linked images can be blocked. However, inline images significantly increase email file size. NeatStamp links to hosted images, which works fine for most use cases — but if you're emailing very security-conscious corporate recipients, test it first.",
                },
                {
                  title: "Absolute pixel padding in Outlook",
                  detail:
                    "Outlook adds extra padding to table cells in ways that differ from other clients. If you're adding padding in CSS, test in Outlook specifically. The common workaround is to use empty spacer cells (a transparent 1×1 pixel image with specified width/height) instead of CSS padding for critical spacing.",
                },
                {
                  title: "Three or more fonts",
                  detail:
                    "I've seen signatures with one font for the name, a different one for the title, and a third for the contact details. Even if all three are web-safe, using multiple fonts in a signature reads as inconsistent and undesigned. Pick one.",
                },
                {
                  title: "Oversized logos",
                  detail:
                    "A logo wider than 150px in a signature typically looks like an advertisement. Keep logos small and proportional to the text. See the exact dimensions in the image table above.",
                },
                {
                  title: "Wrapping text issues on Outlook 365",
                  detail:
                    "Outlook 365 (the web version) and Outlook Desktop have slightly different font-size handling. Text that sits at 12px can sometimes look too small in Outlook 365 if the client's zoom level is set above 100%. Using 13px as a minimum for all visible text prevents most of these issues.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-red-100 bg-red-50 p-5"
                >
                  <span className="text-red-500 text-lg font-bold flex-shrink-0 mt-0.5">
                    ✗
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Mobile-responsive signature design
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              More than half of email opens happen on mobile. Your signature
              will be seen on a 375px-wide screen frequently. Here's what that
              means in practice.
            </p>

            <div className="grid gap-5 md:grid-cols-2 mb-6">
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  What holds up on mobile
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Single-column layouts — they simply scale down
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Signatures constrained to max 500px wide
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Font sizes of 13px minimum — readable without zooming
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Links with enough tap target area (at least 44×44px)
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  What breaks on mobile
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Two-column table layouts — the columns stack or overflow
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Wide banner images that force horizontal scrolling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Font sizes below 12px — unreadable without pinch-zoom
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Fixed-width tables wider than 480px
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-muted leading-relaxed mb-4 text-sm">
              The biggest design compromise in email signatures is the
              two-column layout (photo left, text right). It looks great on
              desktop. On mobile, the two columns often stack — the photo
              appears above the text, and the visual hierarchy breaks. This
              isn't fixable with CSS media queries in Outlook. The honest
              answer is that single-column layouts are safer for most users.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Always test your signature by sending yourself a test email and
              checking it on your phone before rolling it out. What looks right
              in the editor doesn't always match what your recipients see.
            </p>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/email-signature-maker",
                  title: "Email Signature Maker",
                  desc: "Build a signature in 60 seconds. No account, no watermark.",
                },
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature",
                  desc: "What belongs in a signature and what to leave out.",
                },
                {
                  href: "/email-signature-with-logo",
                  title: "Email Signature with Logo",
                  desc: "Logo formats, sizing, and placement in detail.",
                },
                {
                  href: "/html-email-signature",
                  title: "HTML Email Signature",
                  desc: "Why table-based HTML is the only approach that works everywhere.",
                },
                {
                  href: "/email-signature-gmail",
                  title: "Email Signature in Gmail",
                  desc: "How to install your signature in Gmail's settings.",
                },
                {
                  href: "/email-signature-outlook",
                  title: "Email Signature in Outlook",
                  desc: "Desktop and Outlook 365 have different processes.",
                },
                {
                  href: "/email-signature-examples-with-logo",
                  title: "Email Signature Examples with Logo",
                  desc: "See real examples across different design styles.",
                },
                {
                  href: "/templates",
                  title: "Signature Templates",
                  desc: "Browse all available NeatStamp templates.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-border bg-surface p-4 hover:border-primary hover:bg-white transition-colors"
                >
                  <div className="font-semibold text-foreground text-sm">
                    {link.title}
                  </div>
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
                  <p className="px-6 pb-5 text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary p-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to put this into practice?
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              NeatStamp's templates apply all of these principles out of the
              box. Free, no account, works in Gmail, Outlook, and Apple Mail.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Design My Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
