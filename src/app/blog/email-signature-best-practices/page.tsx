import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Best Practices — The Only Guide (2026)",
  description:
    "What to include, what to leave out, fonts, colors, image sizing, mobile tips, and common mistakes. The complete email signature best practices guide.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-best-practices",
  },
};

const faqs = [
  {
    q: "What should every professional email signature include?",
    a: "At minimum: your full name, job title, company name, and one way to reach you (phone or email). After that, a logo and one or two social links (especially LinkedIn) add credibility. Keep it to five lines or fewer and you'll be in good shape.",
  },
  {
    q: "What's the ideal font for an email signature?",
    a: "Stick to web-safe fonts — Arial, Georgia, or Verdana. These render correctly across every email client. Custom fonts like Montserrat or Raleway often fall back to a default serif anyway, so you lose control of how it looks.",
  },
  {
    q: "Should I include a photo in my email signature?",
    a: "It depends on your industry. For sales, consulting, and real estate, a headshot builds rapport. For a law firm or corporate finance role, it can look out of place. If you include one, keep it 80×80px to 100×100px and under 20KB.",
  },
  {
    q: "How many social media icons should I include?",
    a: "Two or three maximum. LinkedIn is almost always worth including. After that, add only the platform where you're actually active and where your recipients would find it relevant. Eight social icons in a row just looks desperate.",
  },
  {
    q: "Do I need a different signature for mobile?",
    a: "Your signature should be built responsively — max-width 600px, scalable images, and nothing that relies on hover states. NeatStamp generates mobile-friendly code automatically. The main thing to avoid is text below 10px, which is unreadable on phones.",
  },
];

export default function EmailSignatureBestPracticesPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Best Practices",
            url: "https://neatstamp.com/blog/email-signature-best-practices",
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
            <Link
              href="/blog"
              className="hover:text-slate-700 transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-700">Email Signature Best Practices</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Best Practices
                </span>
                <span className="text-sm text-slate-400">14 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Best Practices — The Only Guide You Need (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                After looking at thousands of email signatures — good, bad, and genuinely
                horrifying — I&rsquo;ve distilled everything that actually matters into one
                place. What to include, what to cut, how to handle fonts and colors, and
                the mistakes that make even expensive signatures look amateurish.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 14 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#what-to-include", "What to include (and what to skip)"],
                  ["#font-choices", "Font choices that actually work"],
                  ["#color-theory", "Color theory for email signatures"],
                  ["#image-sizing", "Image sizing — the numbers matter"],
                  ["#mobile", "Mobile considerations"],
                  ["#common-mistakes", "Common mistakes (and how to avoid them)"],
                  ["#industry-tips", "Industry-specific tips"],
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
            <section id="what-to-include" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to include (and what to skip)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most signature advice tells you to add more. My take is the opposite: every
                element you add competes for attention, and most of them lose. Here&rsquo;s
                how I think about what earns a spot.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The core five — always include these
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                These are non-negotiable for any professional context:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Full name — not a nickname, your actual name as you&rsquo;d appear on a business card.",
                  "Job title — be specific. \"Marketing Manager\" is better than \"Marketing\" and much better than \"Team Lead.\"",
                  "Company name — and link it to your company website, not just leave it as plain text.",
                  "Phone number — one number only. If you have a direct line, use that over a switchboard.",
                  "Email address — yes, even though they already have it. It gets copied into calendar invites, forwarded emails, and printed conversations.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Optional but worth considering
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                These add real value in the right context:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Company logo — if your company has decent brand recognition or you&rsquo;re client-facing, a logo reinforces trust. If you&rsquo;re a solo freelancer, a simple wordmark often looks cleaner than a complex icon.",
                  "LinkedIn profile link — nearly universally appropriate. Recipients often check LinkedIn before or after a meeting.",
                  "Headshot — valuable for anyone in a relationship-driven role: sales, consulting, coaching, real estate. Less necessary in technical or back-office roles.",
                  "Booking link — if you take meetings, a Calendly or Cal.com link saves back-and-forth. Only include it if people actually need to book time with you.",
                  "One-line tagline — only if it&rsquo;s genuinely useful, not marketing copy. \"Specialising in UK employment law\" is useful. \"Creating smiles one client at a time\" is not.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Things to leave out
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                I&rsquo;ve seen these in real signatures. Please don&rsquo;t:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "\"Sent from my iPhone\" — disables this immediately. It makes you look like you don&rsquo;t care enough to turn it off.",
                  "Environmental disclaimers like \"Please consider the environment before printing this email\" — they accomplish nothing except adding visual clutter.",
                  "Long legal disclaimers tacked onto personal emails — these belong only on regulated communications, not every email your team sends.",
                  "Animated GIFs — they are almost universally stripped or blocked. And even when they work, they&rsquo;re distracting.",
                  "Inspirational quotes — unless you&rsquo;re specifically positioning yourself around thought leadership and your audience expects it.",
                  "Your full mailing address — unless you&rsquo;re in a business that requires it (financial services, legal, e-commerce).",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                If you want to see how a clean signature actually looks before building yours, the{" "}
                <Link href="/examples" className="text-blue-600 hover:underline">
                  NeatStamp examples gallery
                </Link>{" "}
                has real-world signatures by role and industry. The{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template library
                </Link>{" "}
                is also a good place to calibrate what &ldquo;just enough&rdquo; looks like.
              </p>
            </section>

            {/* Section 2 */}
            <section id="font-choices" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Font choices that actually work
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is where a lot of designers get tripped up. Email is not a web page.
                You cannot reliably use Google Fonts or any custom webfont in an email
                signature — most email clients simply don&rsquo;t load external CSS. What they
                do render is a short list of system fonts, commonly called &ldquo;web-safe fonts.&rdquo;
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The web-safe font list for email
              </h3>
              <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3">
                {[
                  {
                    name: "Arial / Arial Narrow",
                    notes: "Safe on every platform. Clean, neutral, works at any size.",
                  },
                  {
                    name: "Georgia",
                    notes:
                      "The best serif option. Adds a classic, authoritative feel. Good for law, finance, academia.",
                  },
                  {
                    name: "Verdana",
                    notes:
                      "Designed for screens. Very readable at small sizes (10–12px). Slightly wider letterforms.",
                  },
                  {
                    name: "Trebuchet MS",
                    notes:
                      "A bit more personality than Arial. Humanist sans-serif. Works well for creative industries.",
                  },
                  {
                    name: "Tahoma",
                    notes:
                      "Compact and clean. Windows staple. Renders well in Outlook.",
                  },
                ].map((font) => (
                  <div key={font.name} className="flex items-start gap-3">
                    <code className="mt-0.5 text-xs bg-white border border-slate-200 px-2 py-1 rounded font-mono text-slate-700 whitespace-nowrap">
                      {font.name}
                    </code>
                    <p className="text-sm text-slate-600">{font.notes}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What about custom fonts?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You can specify a custom font as your first choice and then fall back to a
                web-safe font. Like this:{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  font-family: &apos;Lato&apos;, Arial, sans-serif;
                </code>
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                On devices where Lato is installed (which is surprisingly many, since it&rsquo;s
                a popular system font on Android), your recipient sees it. On Outlook desktop
                or iOS Mail, they see Arial. The important thing is that the fallback is
                something sensible, not a random system font.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Size guidelines
              </h3>
              <ul className="space-y-2 mb-4 text-slate-600">
                <li>Name: 14–16px, bold</li>
                <li>Job title: 12–14px, regular or medium weight</li>
                <li>Contact details: 11–13px, regular</li>
                <li>Tagline or secondary text: 10–11px, this is the absolute minimum</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Don&rsquo;t go below 10px anywhere. On mobile screens (especially at iOS&rsquo;s default
                zoom), 9px text is effectively invisible. The{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                enforces this minimum automatically.
              </p>
            </section>

            {/* Section 3 */}
            <section id="color-theory" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Color theory for email signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The goal of color in a signature isn&rsquo;t to look pretty — it&rsquo;s to reinforce
                your brand identity without fighting the email content for attention. Here&rsquo;s
                how to use it well.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The three-color rule
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Limit yourself to three colors maximum: a primary brand color (for your
                name or a divider line), a neutral dark (for body text — #333333 or
                #1a1a2e, not pure black), and white or light grey for the background. That&rsquo;s
                it. Every additional color adds visual noise.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Contrast and accessibility
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                WCAG AA requires a contrast ratio of at least 4.5:1 for normal text. This
                matters for email signatures because roughly 8% of men have some form of
                color blindness, and many more read emails in low-light conditions. Test your
                colors with a contrast checker before finalising. Common fails I&rsquo;ve seen:
              </p>
              <ul className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Light grey text (#999999) on white — fails AA at body text sizes
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Yellow or light orange text on white — fails badly
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Brand-colored text on a matching brand background (e.g., blue text on blue background)
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Dark mode considerations
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                In 2026, roughly 60–70% of email clients support dark mode, and a significant
                chunk of users have it turned on. The problem is that dark mode implementations
                vary wildly. Outlook on Windows inverts colors that aren&rsquo;t declared inline.
                Gmail on Android preserves inline styles but adds a dark background.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Practical advice: use a light or white background for your signature explicitly
                with{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  background-color: #ffffff
                </code>{" "}
                in the inline style. This prevents Outlook from guessing. Your text should be
                dark (#333 or #1a1a2e) rather than black (#000000), because pure black on a
                forced dark background can cause inversion issues.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For a deep dive on design options, the{" "}
                <Link href="/email-signature-design" className="text-blue-600 hover:underline">
                  email signature design guide
                </Link>{" "}
                covers layout patterns in more detail.
              </p>
            </section>

            {/* Section 4 */}
            <section id="image-sizing" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Image sizing — the numbers matter
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Images in email signatures are where most things go wrong. Too big and they
                become attachments. Too small and they look pixelated on retina screens. Wrong
                format and they break in Outlook. Here are the exact numbers to use.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Logo dimensions
              </h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-2">Recommended</p>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>Width: 150–200px (display size)</li>
                  <li>Height: proportional, usually 40–60px for horizontal logos</li>
                  <li>Actual file resolution: 2x for retina (so 300–400px actual width)</li>
                  <li>File size: under 20KB, ideally under 10KB</li>
                  <li>Format: PNG with transparent background (not JPG for logos)</li>
                </ul>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Always set explicit width and height attributes in the HTML, not just CSS.
                Without them, Outlook ignores your dimensions entirely and renders the image
                at full size. This is the single most common Outlook image bug I&rsquo;ve seen. The{" "}
                <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">
                  guide to signatures with logos
                </Link>{" "}
                walks through exactly how to set these attributes.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Headshot dimensions
              </h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>Display size: 80×80px or 100×100px (square or circle crop)</li>
                  <li>Actual file: 160×160px or 200×200px for retina</li>
                  <li>File size: under 25KB</li>
                  <li>Format: JPG for photos (smaller file than PNG)</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Banner/promotional image dimensions
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re using a banner below your signature details (for a promotion, event,
                or certification badge), these should be:
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>Width: 600px maximum (matches the max-width of most email layouts)</li>
                  <li>Height: 60–100px — enough to read, not so tall it dominates</li>
                  <li>File size: under 40KB</li>
                  <li>Format: JPG for photographs, PNG for graphics with text</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Hosting your images
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Images in email signatures should be hosted externally — not embedded as
                base64. Base64 images bloat the email file size enormously (a 20KB image
                becomes ~27KB of text), and many spam filters flag high base64 usage.
              </p>
              <p className="text-slate-600 leading-relaxed">
                NeatStamp Pro hosts your images on our CDN automatically. On the free plan,
                your images need to be hosted somewhere publicly accessible — a company
                website image folder works fine. The full technical details are in the{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>
                .
              </p>
            </section>

            {/* Section 5 */}
            <section id="mobile" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Mobile considerations
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                As of 2026, just over 50% of business email is read on mobile — roughly split
                between iOS Mail, Gmail mobile, and Outlook mobile. None of them render HTML
                signatures identically, and the differences matter.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Width: the 600px rule
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cap your signature at 600px wide. Most desktop email clients show the reading
                pane at 600–800px. On mobile, a 600px table scales down reasonably. Wider than
                that and you get horizontal scrollbars on phones, which looks terrible.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Tap target sizes
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Any link in your signature — phone number, email, social icon — should be
                touch-friendly. Apple&rsquo;s HIG recommends a minimum tap target of 44×44pt.
                Tiny social icons at 16×16px are nearly impossible to tap accurately. Aim for
                at least 24×24px for icons, and give links some vertical padding.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Phone numbers as tappable links
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Wrap your phone number in a{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  tel:
                </code>{" "}
                link. iOS and Android will both recognize it and offer to call. Without it,
                users have to manually copy the number — an unnecessary friction.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Testing on real devices
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Email rendering on mobile varies by OS version, display scaling, and even dark
                mode settings. Before sending a signature into production, test it on at least:
                iOS Mail, Gmail on Android, and Outlook mobile. If you have access to a Windows
                PC, test Outlook desktop too. The{" "}
                <Link
                  href="/professional-email-signature"
                  className="text-blue-600 hover:underline"
                >
                  professional email signature guide
                </Link>{" "}
                includes a pre-launch checklist covering all of these.
              </p>
            </section>

            {/* Section 6 */}
            <section id="common-mistakes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Common mistakes (and how to avoid them)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                I&rsquo;ve seen these mistakes repeatedly — sometimes from major companies, which is
                embarrassing for them and educational for the rest of us.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Using a table with background images",
                    body: "Outlook (all versions) does not support CSS background-image on table cells. If your template relies on background images for layout, it will be a blank rectangle in Outlook. Use a foreground <img> element instead, with all formatting as inline styles.",
                  },
                  {
                    title: "Stacking social icons horizontally without spacing",
                    body: "When four or five social icons sit directly adjacent with no spacing, they look compressed and are hard to tap. Add at least 6–8px of spacing between them — either as a margin or by putting each icon in its own table cell.",
                  },
                  {
                    title: "Linking to your LinkedIn company page instead of your personal profile",
                    body: "The company page is marketing. Your personal LinkedIn profile is the connection. Recipients who click want to know who they're talking to. Link to your personal profile.",
                  },
                  {
                    title: "Using a web font without a fallback",
                    body: 'If you declare font-family: "Poppins" with nothing else, Outlook falls back to Times New Roman. Your beautifully designed signature renders in a serif font you didn\'t choose. Always specify font-family: "Poppins", Arial, sans-serif.',
                  },
                  {
                    title: "Embedding the signature as a screenshot",
                    body: "I see this occasionally — someone takes a screenshot of a nicely designed signature and puts that image in the email footer. Zero links work. Zero text is selectable. Zero accessibility. It downloads as an attachment in some clients.",
                  },
                  {
                    title: "Not updating it when you change roles",
                    body: "Your signature is a live document. I've seen people with a title three jobs ago still in their footer. Set a quarterly reminder to check it. If you use NeatStamp Pro with saved signatures, updating takes 30 seconds.",
                  },
                ].map((mistake) => (
                  <div
                    key={mistake.title}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {mistake.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {mistake.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7 */}
            <section id="industry-tips" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Industry-specific tips
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                One size doesn&rsquo;t fit all here. What works for a startup founder is wrong for a
                solicitor. Here&rsquo;s what I&rsquo;d recommend by sector.
              </p>

              <div className="space-y-5">
                {[
                  {
                    sector: "Legal and Financial Services",
                    tips: "Required in many jurisdictions: company registration number, registered address, regulatory body (e.g., FCA, SRA). Skip the headshot — it's unusual in these sectors. Use a conservative serif font (Georgia) or clean sans-serif (Arial). No social links except LinkedIn. A legal disclaimer at the bottom is often mandatory.",
                  },
                  {
                    sector: "Creative and Freelance",
                    tips: "Your signature is a portfolio teaser. Include a direct link to your portfolio or a featured project. A headshot is almost always worth including — it personalises otherwise cold outreach. Instagram is relevant if your work is visual; Behance or Dribbble for designers. Keep the design distinctive but not distracting — your work should speak louder.",
                  },
                  {
                    sector: "Real Estate",
                    tips: "Headshots are nearly universal and important in this sector — clients buy from people they trust, and a photo builds familiarity fast. Include your licence number (required in many regions), agency logo, and phone number prominently. A link to your current listings or a recent sale is a good CTA.",
                  },
                  {
                    sector: "Startup and Tech",
                    tips: "Keep it minimal. One line of contact info, a small logo, LinkedIn. Optionally: GitHub if you're recruiting developers. If the company is post-launch, a product link or NPS score can work as social proof. Avoid anything that looks corporate — it reads as try-hard in this context.",
                  },
                  {
                    sector: "Healthcare",
                    tips: "Credentials matter enormously: degrees, board certifications, hospital affiliations. These belong immediately after your name or title. No personal social links. A HIPAA disclaimer is required for US providers.",
                  },
                  {
                    sector: "Sales and Business Development",
                    tips: "This is where CTAs earn their place. A Calendly link, a recent case study, or a one-sentence value proposition can all work. Keep the signature to 5 lines of text so it doesn't overwhelm a short outbound email. The email-signature-for-business page has examples tuned for this context.",
                  },
                ].map((sector) => (
                  <div
                    key={sector.sector}
                    className="bg-slate-50 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {sector.sector}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {sector.tips}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                For dedicated industry templates, the{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature page
                </Link>{" "}
                and{" "}
                <Link href="/examples" className="text-blue-600 hover:underline">
                  examples gallery
                </Link>{" "}
                are worth a look. If you want to build yours right now, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                is free and takes about 60 seconds.
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
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Ready to put this into practice?
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Build a signature that follows every best practice on this page — free, in
                about 60 seconds.
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
