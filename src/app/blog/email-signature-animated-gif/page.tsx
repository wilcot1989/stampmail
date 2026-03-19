import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Animated GIF in Email Signature — Should You Use One? | NeatStamp",
  description:
    "The honest answer on animated GIFs in email signatures. Gmail, Outlook, and Apple Mail support compared. File size limits, accessibility concerns, and when they actually work.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-animated-gif",
  },
};

const faqs = [
  {
    q: "Do animated GIFs work in Gmail signatures?",
    a: "Yes. Gmail on both desktop and mobile renders animated GIFs correctly, including the animation. If your primary audience is Gmail users, you'll see the animation as intended. That said, Gmail is not the only email client your recipients use.",
  },
  {
    q: "What does Outlook do with animated GIFs in email signatures?",
    a: "Outlook 2007 through 2019 on Windows shows only the first frame of the GIF as a static image. The animation is completely ignored. Outlook on Mac and Outlook.com (web) do support animated GIFs. Since many corporate environments use Outlook on Windows, plan for a significant portion of recipients seeing a static image.",
  },
  {
    q: "What's the maximum file size for a GIF in an email signature?",
    a: "Keep it under 200KB — ideally under 100KB. Above 200KB and you'll meaningfully increase the email size, which can affect deliverability and slow load times on mobile. A GIF that pushes an email over 102KB total may be clipped by Gmail's display.",
  },
  {
    q: "Are animated GIFs in email signatures accessible?",
    a: "Only if you do the work. GIFs must have descriptive alt text. Motion that loops for more than three cycles can trigger issues for users with vestibular disorders or cognitive disabilities — per WCAG 2.2 guideline 2.2.2. A GIF that pulses indefinitely is inaccessible by default.",
  },
  {
    q: "What kind of GIF works best in an email signature?",
    a: "Subtle, relevant animation that plays a few times and stops — not an infinitely looping distraction. A logo with a brief appearance animation, a holiday element, or a badge that rotates once works much better than a flashing banner or a spinning element.",
  },
  {
    q: "Can I use a GIF for my headshot in an email signature?",
    a: "You technically can, but you almost certainly shouldn't. An animated headshot is deeply unusual and will come across as unprofessional in most contexts. The exception might be if you're in a creative field and the animation is subtle and deliberate — but it's a difficult execution to get right.",
  },
];

export default function EmailSignatureAnimatedGifPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Animated GIF in Email Signature",
            url: "https://neatstamp.com/blog/email-signature-animated-gif",
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
            <span className="text-slate-700">Animated GIF in Email Signature</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                  Design & Technical
                </span>
                <span className="text-sm text-slate-400">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Animated GIF in Email Signature — Should You Use One?
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Animated GIFs in email signatures are one of those ideas that sounds fun in
                theory and gets complicated fast in practice. The honest answer to whether you
                should use one is: it depends, and the conditions where it works are narrower
                than most people expect. Here&rsquo;s what you need to know before adding one.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 10 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#the-honest-truth", "The honest truth about GIFs in email signatures"],
                  ["#when-they-work", "When animated GIFs actually work"],
                  ["#when-they-dont", "When they don't work"],
                  ["#client-support", "Email client support: Gmail, Outlook, Apple Mail"],
                  ["#technical-limits", "Technical limits: file size and performance"],
                  ["#how-to-add", "How to add a GIF to your signature"],
                  ["#accessibility", "Accessibility concerns"],
                  ["#professional-consensus", "The professional consensus"],
                  ["#faq", "Frequently asked questions"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-blue-600 hover:text-blue-800 hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1 */}
            <section id="the-honest-truth" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The honest truth about GIFs in email signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most advice on this topic either enthusiastically encourages you to add a GIF
                (usually written by people selling GIF creation tools) or dismisses the idea
                entirely (usually written by conservative corporate types). The truth is somewhere
                more specific.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Animated GIFs in email signatures can work. I&rsquo;ve seen them done well. But most
                executions I see are poorly sized, infinitely looping, not tested in Outlook,
                and ultimately distracting rather than impressive. The question isn&rsquo;t whether
                GIFs can work — it&rsquo;s whether yours, in your context, for your recipients, will
                work.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before deciding, you need to know two things: who your recipients are (which email
                clients they use) and what impression you want to make. A freelance motion designer
                with mostly Gmail-using startup clients is in a different position than a corporate
                lawyer whose clients use Outlook 2019 on Windows.
              </p>

              <div className="bg-slate-900 text-white rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold mb-3">Quick decision guide</p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-3">
                    <span className="text-green-400 flex-shrink-0">Yes:</span>
                    <span className="text-slate-300">Creative industry, mostly Gmail/Apple Mail users, subtle animation, under 200KB, plays 2–3 times and stops</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-red-400 flex-shrink-0">No:</span>
                    <span className="text-slate-300">Corporate, legal, medical, or financial context; Outlook-heavy recipient base; looping flashy animation; over 200KB</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-400 flex-shrink-0">Maybe:</span>
                    <span className="text-slate-300">Holiday signature, promotional campaign, agency work — if executed carefully</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="when-they-work" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When animated GIFs actually work
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are genuine use cases where a GIF in your email signature adds something
                rather than distracting from it.
              </p>

              <div className="space-y-5">
                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Creative and design industries</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    If you&rsquo;re a motion designer, animator, creative director, or visual artist, an
                    animated element in your signature is on-brand. It demonstrates your craft
                    directly. The GIF in this context is a portfolio sample, not decoration. Keep
                    it subtle — a short logo animation or a brief clip from a recent project that
                    loops once or twice and stops. The{" "}
                    <Link href="/email-signature-for-designer" className="text-blue-600 hover:underline">
                      email signature for designers guide
                    </Link>{" "}
                    has examples of this done well.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Holiday and seasonal signatures</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A subtle holiday animation — falling snow, a gentle sparkle, a waving flag —
                    is one of the more forgivable uses of GIFs in business email. The context
                    signals that it&rsquo;s intentionally playful, and recipients generally expect it.
                    The key is subtle: a few snowflakes drifting, not a full Christmas scene with
                    sound effects. See the{" "}
                    <Link href="/christmas-email-signature" className="text-blue-600 hover:underline">
                      Christmas email signature guide
                    </Link>{" "}
                    and{" "}
                    <Link href="/holiday-email-signature" className="text-blue-600 hover:underline">
                      holiday email signature guide
                    </Link>{" "}
                    for examples. Just be sure to remove the seasonal GIF after the holiday.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Marketing and agency contexts</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    In marketing agencies or companies where email is used as a promotional channel,
                    an animated banner in the signature can drive engagement. An animated CTA
                    button, a looping product demo screenshot, or a &ldquo;new feature&rdquo; announcement
                    with motion can outperform a static banner. But this only works if your audience
                    uses clients that support animation and if the GIF is optimized properly.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Internal communications at casual companies</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Internal emails between colleagues at startups, tech companies, and agencies
                    are often more casual than external communications. If your company culture
                    supports it and your recipients use Gmail or similar, a GIF for an internal
                    campaign, team event, or company milestone can work without the professional
                    risk of external email.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="when-they-dont" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When they don&rsquo;t work
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The cases where GIFs actively hurt you are clearer than the cases where they help.
              </p>

              <div className="space-y-4">
                {[
                  {
                    context: "Corporate, enterprise, and B2B sales",
                    reason: "Enterprise clients use Outlook on Windows. Your carefully animated logo becomes a static first frame. More importantly, a GIF in a business development email to a Fortune 500 procurement team signals a lack of seriousness. The email content should do the work.",
                  },
                  {
                    context: "Legal, medical, and financial services",
                    reason: "These industries have strong norms around professional presentation. An animated element in a lawyer's or doctor's email signature is jarring — not because of technical limitations, but because it's out of place with the gravitas the context calls for.",
                  },
                  {
                    context: "Cold outreach and prospecting emails",
                    reason: "Animated elements in cold email signatures can trigger spam filters. Some providers flag high-animation content as marketing email and route it accordingly. In cold outreach, where deliverability is already a concern, adding a GIF is an unnecessary risk.",
                  },
                  {
                    context: "Executive-level communication",
                    reason: "C-suite and senior leadership email signatures are generally expected to be understated. A CEO with an animated logo in their signature looks like they're trying too hard. Simplicity at senior levels reads as confidence.",
                  },
                  {
                    context: "When you haven't tested it",
                    reason: "Adding a GIF without testing in Outlook, Gmail, and Apple Mail is a mistake regardless of industry. You might be sending a static, oddly-sized first frame with no idea that's what recipients see.",
                  },
                ].map((entry) => (
                  <div key={entry.context} className="flex gap-4">
                    <span className="mt-1 h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center font-bold flex-shrink-0">
                      ✕
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{entry.context}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{entry.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 */}
            <section id="client-support" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Email client support: Gmail, Outlook, Apple Mail
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                This is the technical reality you need to plan around. Client support for animated
                GIFs varies significantly.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    client: "Gmail (Web, Android, iOS)",
                    support: "Full support",
                    color: "green",
                    detail: "Gmail renders animated GIFs correctly on all platforms — desktop web, Android, and iOS. The animation plays as expected. Gmail is the most GIF-friendly major client.",
                  },
                  {
                    client: "Outlook 2007–2019 (Windows)",
                    support: "First frame only",
                    color: "red",
                    detail: "This is the big one. Outlook on Windows (the version most enterprise users have) renders only the first frame of an animated GIF as a static image. No animation whatsoever. If you design your GIF so that the first frame looks good as a standalone image, Outlook users get a sensible static image. If you don't, they see an odd partial frame.",
                  },
                  {
                    client: "Outlook 2021 / Microsoft 365 (Windows)",
                    support: "Partial — still first frame in some versions",
                    color: "yellow",
                    detail: "The new Outlook app (the one rolling out as part of Microsoft 365) is built on a web-based rendering engine and does support animated GIFs. However, many corporate users are still on the legacy Outlook rendering engine. Don't assume M365 means GIF support.",
                  },
                  {
                    client: "Outlook.com (Web)",
                    support: "Full support",
                    color: "green",
                    detail: "The web version of Outlook at outlook.com renders animated GIFs correctly. This is separate from the Outlook desktop application.",
                  },
                  {
                    client: "Apple Mail (macOS and iOS)",
                    support: "Full support",
                    color: "green",
                    detail: "Apple Mail renders animated GIFs correctly on both Mac and iPhone/iPad. If your recipients are heavy Apple ecosystem users, GIFs are more likely to be seen as intended.",
                  },
                  {
                    client: "Samsung Email",
                    support: "Full support",
                    color: "green",
                    detail: "Samsung's built-in email client renders GIFs correctly.",
                  },
                  {
                    client: "Yahoo Mail",
                    support: "Full support",
                    color: "green",
                    detail: "Yahoo Mail supports animated GIFs in email content including signatures.",
                  },
                ].map((client) => (
                  <div key={client.client} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm">{client.client}</h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                          client.color === "green"
                            ? "bg-green-100 text-green-700"
                            : client.color === "red"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {client.support}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{client.detail}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-amber-800 mb-2">The Outlook problem in numbers</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Outlook on Windows is still used by a majority of enterprise email users globally.
                  Estimates put desktop Outlook usage at around 35–40% of all business email
                  in 2026. If you&rsquo;re in B2B sales, consulting, finance, or any other field where
                  corporate clients are common, that means a large proportion of your recipients
                  will see only the first frame of your animated GIF — at best.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="technical-limits" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Technical limits: file size and performance
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                File size is not optional advice — it&rsquo;s a hard constraint with real consequences.
              </p>

              <div className="bg-slate-50 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">File size guide for GIFs in email signatures</p>
                <div className="space-y-3">
                  {[
                    { range: "Under 100KB", status: "Ideal", note: "Minimal impact on email size, loads fast on mobile" },
                    { range: "100–200KB", status: "Acceptable", note: "Watch total email size; still workable for most use cases" },
                    { range: "200–500KB", status: "Problematic", note: "Noticeably increases email load time; may be stripped by some servers" },
                    { range: "Over 500KB", status: "Don't do it", note: "Can push emails over Gmail's 102KB clip threshold; serious deliverability risk" },
                  ].map((row) => (
                    <div key={row.range} className="flex items-start gap-4">
                      <code className="text-xs bg-white border border-slate-200 px-2 py-1 rounded font-mono text-slate-700 flex-shrink-0">
                        {row.range}
                      </code>
                      <div>
                        <span
                          className={`text-xs font-semibold mr-2 ${
                            row.status === "Ideal"
                              ? "text-green-600"
                              : row.status === "Acceptable"
                              ? "text-amber-600"
                              : "text-red-600"
                          }`}
                        >
                          {row.status}
                        </span>
                        <span className="text-xs text-slate-500">{row.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to keep GIF file size down
              </h3>
              <ul className="space-y-3 mb-6 text-slate-600">
                {[
                  "Reduce the number of colors in the GIF palette. GIF supports up to 256 colors, but most animated signatures look fine with 64–128.",
                  "Limit the number of frames. The fewer frames, the smaller the file. A 5-frame animation can be just as effective as a 30-frame one.",
                  "Reduce dimensions. A 200×60px GIF will always be smaller than a 600×100px GIF. Match your GIF size to its display size — don't use a 1200px wide GIF displayed at 600px.",
                  "Use a GIF optimizer. Ezgif.com and Gifsicle are free tools that can significantly reduce file size without visible quality loss.",
                  "Limit animation loops. A GIF set to loop 2–3 times and stop is both more professional and often renders faster than an infinite loop.",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed">
                For context on email signature image sizing more broadly, the{" "}
                <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
                  email signature size guide
                </Link>{" "}
                covers all image types with specific dimension recommendations.
              </p>
            </section>

            {/* Section 6 */}
            <section id="how-to-add" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to add a GIF to your signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Adding a GIF to an email signature follows the same process as adding any
                image — with a few extra considerations.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Host the GIF externally",
                    body: "Never embed your GIF as base64 inline data. It dramatically increases email size and may trigger spam filters. Host the GIF file on a server (your company website, a CDN, or an image hosting service) and reference it via URL in the HTML.",
                  },
                  {
                    step: "2",
                    title: "Reference it with an <img> tag with explicit dimensions",
                    body: 'Use width and height attributes in the HTML tag itself — not just CSS. Without these, Outlook ignores your dimensions and renders the image at its native size: <img src="https://yoursite.com/animated-logo.gif" width="200" height="60" alt="Company Logo">',
                  },
                  {
                    step: "3",
                    title: "Design the first frame for Outlook",
                    body: "Since Outlook on Windows shows only the first frame, make sure that first frame works as a standalone image. If your GIF starts from a blank frame before animating in, Outlook users see a blank image. Start with the final, complete visual state.",
                  },
                  {
                    step: "4",
                    title: "Set meaningful alt text",
                    body: "Always include a descriptive alt attribute. If your email client blocks images (which many corporate clients do by default), the alt text is all the recipient sees. \"Animated logo\" is not useful. \"Acme Corp — Cloud Security Solutions\" is.",
                  },
                  {
                    step: "5",
                    title: "Test before rolling out",
                    body: "Send the signature to a Gmail account, an Outlook desktop account, and an Apple Mail account. Check each one. What you see in the NeatStamp editor preview is the rendered HTML — the actual rendering varies by client.",
                  },
                ].map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <span className="h-7 w-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {step.step}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-1">{step.title}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you want to build a signature with an optional GIF element or a seasonal
                animated banner, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                supports image uploads and external URL references for signature images.
              </p>
            </section>

            {/* Section 7 */}
            <section id="accessibility" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Accessibility concerns
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This section is shorter than the others because the rules are simple, but they
                matter enough to call out separately.
              </p>

              <div className="space-y-5">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Vestibular disorders and motion sensitivity</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    WCAG 2.2 guideline 2.2.2 requires that any content that moves, blinks, or
                    scrolls for more than five seconds must have a way to pause it. Email GIFs can&rsquo;t
                    include a pause control in the traditional sense. The practical implication: if
                    you use a GIF in your signature, it should loop a limited number of times (2–3)
                    and stop. Indefinitely looping animations create real problems for users with
                    vestibular disorders, ADHD, or epilepsy-related conditions.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Alt text is non-negotiable</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Every image in your email signature needs meaningful alt text. Screen readers
                    used by blind and low-vision users will read the alt attribute. &ldquo;GIF&rdquo; or
                    &ldquo;image&rdquo; is not meaningful. &ldquo;NeatStamp logo animation&rdquo; or &ldquo;Festive holiday
                    greeting&rdquo; are.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">High contrast and color dependency</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    If your animated GIF contains important information (text, a CTA, a phone
                    number), that information needs to be readable by users with color vision
                    deficiencies. Don&rsquo;t rely on color alone to convey meaning. If the GIF shows
                    text, ensure sufficient contrast against the background.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="professional-consensus" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The professional consensus
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you ask ten email design professionals whether GIFs belong in email signatures,
                you&rsquo;ll get a range of answers. But most will land somewhere close to this position:
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-5 py-2 mb-6">
                <p className="text-slate-700 italic leading-relaxed">
                  GIFs in email signatures are a tool, not a best practice. In the right context,
                  executed carefully, they add something. In the wrong context, they undermine
                  credibility. Most business contexts are the wrong context. Most executions
                  are not careful enough.
                </p>
              </blockquote>

              <p className="text-slate-600 leading-relaxed mb-4">
                The underlying issue is that an email signature is part of your professional
                identity broadcast at scale. Every email you send appends your signature. A
                decision about your signature is a decision about how you want to appear in
                every professional communication you send.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For most people reading this, the answer is probably: skip the GIF in your
                primary signature. If you want seasonal animation, use it only for a holiday
                signature and only if your recipients are mostly Gmail or Apple Mail users.
                If you&rsquo;re in a creative field and you know your recipients use non-Outlook clients,
                a carefully executed GIF logo can work.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For broader context on what makes a signature effective, the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  email signature best practices guide
                </Link>{" "}
                covers design and content decisions that hold up across all clients and contexts.
                And the{" "}
                <Link href="/email-signature-design" className="text-blue-600 hover:underline">
                  email signature design guide
                </Link>{" "}
                has layout options that look polished without relying on animation.
              </p>
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
            <div className="bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build a signature that works everywhere
              </h2>
              <p className="text-orange-100 text-sm mb-6 max-w-md mx-auto">
                GIF or no GIF, NeatStamp generates signatures that render correctly across
                Gmail, Outlook, and Apple Mail. Free to try.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
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
