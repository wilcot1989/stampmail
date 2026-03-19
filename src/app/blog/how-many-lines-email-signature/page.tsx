import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "How Many Lines Should Your Email Signature Be? | NeatStamp",
  description:
    "The definitive answer: 3–5 lines. Here's exactly what each line should say, why shorter is better, and when more is actually acceptable.",
  alternates: {
    canonical: "https://neatstamp.com/blog/how-many-lines-email-signature",
  },
};

const faqs = [
  {
    q: "How many lines should a professional email signature have?",
    a: "3 to 5 lines of text is the right target for most professionals. Line 1: your name. Line 2: title and company. Line 3: phone number. Line 4: website. Line 5 (optional): social links or a single CTA. A photo, logo, and banner can sit alongside the text without adding to the line count.",
  },
  {
    q: "Is it okay to have a one-line email signature?",
    a: "Yes, in casual or internal contexts. 'Alex Chen | Product, Acme Inc.' on a single line is clean and functional. For external or client-facing email, two to three lines is more appropriate so recipients have enough to identify and contact you.",
  },
  {
    q: "What's too long for an email signature?",
    a: "If the recipient has to scroll past your signature to see the email content, it's too long. As a practical rule: anything over 6 lines of text, or a total height of more than 200px, starts to feel excessive. Long legal disclaimers, multiple social links, inspirational quotes, and environmental notices all push signatures into 'too long' territory.",
  },
  {
    q: "Should I include my email address in my signature?",
    a: "Yes. Even though the recipient already has your address in the 'from' field, your email gets forwarded, printed, saved as a PDF, and copied into calendar invites. Including it in the signature means your address travels with the content.",
  },
  {
    q: "Do I need my physical address in my signature?",
    a: "Only if your role or legal requirements demand it. Financial advisors, solicitors, and businesses registered under certain regulations often need to include a registered address. For everyone else, it adds length without adding value — most recipients won't need to mail you anything.",
  },
  {
    q: "What about mobile — does line count matter differently there?",
    a: "More so, actually. On a mobile screen, a 6-line signature with a logo and a banner can take up more vertical space than the email message itself. This is especially jarring on reply chains, where the recipient is scrolling through multiple quoted replies and hitting a full-page signature block each time.",
  },
];

export default function HowManyLinesEmailSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "How Many Lines Should Your Email Signature Be?",
            url: "https://neatstamp.com/blog/how-many-lines-email-signature",
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
            <span className="text-slate-700">How Many Lines Should Your Email Signature Be?</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Quick Guide
                </span>
                <span className="text-sm text-slate-400">8 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                How Many Lines Should Your Email Signature Be?
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Short answer: 3 to 5 lines of text. That&rsquo;s it. The rest of this article
                explains exactly what those lines should say, why shorter genuinely performs
                better, and the specific situations where a longer signature is actually
                justified.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 8 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#the-answer", "The answer: 3–5 lines"],
                  ["#line-by-line", "Line by line: what goes where"],
                  ["#why-shorter", "Why shorter is better"],
                  ["#mobile-argument", "The mobile argument for brevity"],
                  ["#reply-chains", "The reply-chain problem"],
                  ["#when-more", "When more lines are acceptable"],
                  ["#the-scroll-test", "The 'too long' test"],
                  ["#before-after", "Before and after examples"],
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
            <section id="the-answer" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The answer: 3–5 lines
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Three to five lines of text gives you everything a recipient needs to know
                who you are and how to reach you, without overwhelming them. This is the range
                that consistently looks professional across email clients, screen sizes, and
                contexts.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-green-800 mb-1">
                  The target: 3–5 lines + optional photo
                </p>
                <p className="text-sm text-green-700">
                  A photo, logo, and banner image sit alongside your text and don&rsquo;t count
                  toward the line total — they add visual weight but not length in the same way.
                  It&rsquo;s the text lines that determine whether your signature reads as clean or
                  cluttered.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Below five text lines and you&rsquo;re in safe territory. Above five and you need
                a clear reason why each additional line earns its place. Above eight and
                you&rsquo;re almost certainly including things that don&rsquo;t need to be there.
              </p>
            </section>

            {/* Section 2 */}
            <section id="line-by-line" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Line by line: what goes where
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Here&rsquo;s exactly how to allocate your five lines, and the reasoning behind
                each one.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    line: "Line 1",
                    content: "Your full name",
                    detail:
                      "First and last name as you&rsquo;d appear on a business card. Not a nickname, not initials. Bold it — this is the most important identifier in your signature. Size: 15–16px.",
                    required: true,
                  },
                  {
                    line: "Line 2",
                    content: "Job title | Company name",
                    detail:
                      "Separated by a pipe or bullet. 'Senior Account Manager | Clearfield Group' tells recipients exactly what you do and who you work for in a single scan. Link the company name to your company website.",
                    required: true,
                  },
                  {
                    line: "Line 3",
                    content: "Phone | Email",
                    detail:
                      "Your direct phone number and email address, both hyperlinked (tel: and mailto: respectively). If you only have one contact method to offer, just list that. Don&rsquo;t include a phone number you don&rsquo;t actually answer.",
                    required: true,
                  },
                  {
                    line: "Line 4",
                    content: "Website URL",
                    detail:
                      "Your company website or personal portfolio. Keep it clean: yourcompany.com not https://www.yourcompany.com/home. Link it. If you don&rsquo;t have a website worth linking, skip this line.",
                    required: false,
                  },
                  {
                    line: "Line 5 (optional)",
                    content: "Social link or CTA",
                    detail:
                      "One LinkedIn profile link, or a single call to action ('Book a call' / 'See our latest case study'). Pick one — not both, not three social icons. This line is where most people overload their signature.",
                    required: false,
                  },
                ].map((row) => (
                  <div
                    key={row.line}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {row.line}
                        </span>
                        <p className="font-semibold text-slate-900 text-sm mt-0.5">
                          {row.content}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          row.required
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {row.required ? "Required" : "Optional"}
                      </span>
                    </div>
                    <p
                      className="text-sm text-slate-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: row.detail }}
                    />
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                For a broader look at everything that can go in a signature and how to
                prioritize it, the{" "}
                <Link href="/blog/what-to-include-email-signature" className="text-blue-600 hover:underline">
                  what to include in an email signature
                </Link>{" "}
                guide covers every element in detail. The{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional email signature guide
                </Link>{" "}
                shows how this translates into specific layouts.
              </p>
            </section>

            {/* Section 3 */}
            <section id="why-shorter" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why shorter is better
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The intuition most people have is: more information = more helpful. In email
                signatures, the opposite is true. Here&rsquo;s why.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Attention is allocated by scarcity
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                When a recipient glances at your signature, they spend about one to two seconds
                on it. In that time, they can pick up two or three pieces of information. A
                3-line signature means they get your name, title, and phone number. A 10-line
                signature means their attention is spread across ten items, and they retain
                approximately none of them. Counterintuitively, a longer signature is actually
                harder to get information from than a short one.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                It affects how professional you look
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                There&rsquo;s a correlation (not universal, but consistent) between signature length
                and perceived seniority. The most senior people at most organizations tend
                to have the shortest signatures. A CEO&rsquo;s signature is often just their name
                and company. A junior employee&rsquo;s signature sometimes has ten lines, three
                social icons, an inspirational quote, and a banner promoting something from
                six months ago.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                This isn&rsquo;t a hard rule, but it reflects a real dynamic: people with nothing to
                prove don&rsquo;t need to cram everything into their footer. Keeping yours concise
                signals confidence.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Shorter signatures don&rsquo;t trigger spam filters
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Long, image-heavy signatures increase the total email file size and the
                image-to-text ratio — both factors that spam filters pay attention to. A
                five-line plain-text signature adds almost nothing to your email&rsquo;s deliverability
                risk. A signature with three images, ten links, and a 600px banner is a
                different story. See the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  email signature best practices guide
                </Link>{" "}
                for more on this.
              </p>
            </section>

            {/* Section 4 */}
            <section id="mobile-argument" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The mobile argument for brevity
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Just over half of business emails are read on mobile as of 2026. On a phone
                screen at standard zoom, a 3-line signature takes up maybe 20–30% of the
                visible screen. A 10-line signature with a logo and banner can easily fill
                the entire visible area.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Think about what that means for the email itself. If your signature is longer
                than your message, the recipient&rsquo;s first impression of your email (when they
                see it in their inbox preview) is dominated by your footer, not your content.
                Preview text in most mobile clients shows the first 50–100 characters of the
                email body. If your signature somehow bleeds into that preview, it looks like
                spam.
              </p>
              <p className="text-slate-600 leading-relaxed">
                On reply threads specifically, this becomes painful. Each reply typically
                quotes the previous chain. If every reply appends a full 10-line signature,
                a thread of five replies can have 50 lines of signature content embedded in
                it — more than most of the actual conversation.
              </p>
            </section>

            {/* Section 5 */}
            <section id="reply-chains" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The reply-chain problem
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Reply chains are where long signatures become genuinely irritating. Most email
                clients quote the entire previous email (including its signature) when you
                reply. So a 10-line signature gets embedded in the thread. The next reply
                quotes that embedded signature. Then the next one quotes all of that.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                By email five in a thread, you can have 40–50 lines of stacked signature
                content that the recipient has to scroll past. Some email clients collapse
                quoted text, which helps. But not all of them do, and not all recipients
                know how to use those controls.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                One common solution: use a shorter signature for replies than for initial
                emails. Many email clients let you set separate signatures for new messages
                and replies/forwards. For replies, a one or two-line signature (just your
                name and company, or just your name) is perfectly professional.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/blog/email-signature-etiquette" className="text-blue-600 hover:underline">
                  email signature etiquette guide
                </Link>{" "}
                covers this — including what&rsquo;s expected across different industries and
                communication styles.
              </p>
            </section>

            {/* Section 6 */}
            <section id="when-more" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When more lines are acceptable
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are genuine situations where a longer signature is appropriate or
                even required. Here are the main ones.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Legal and regulatory requirements",
                    body: "Solicitors in England and Wales must include their SRA number. UK limited companies must include their registered company number and registered address. Financial advisors must include regulatory body details. These add lines whether you like it or not — and they should be formatted small (10–11px) to minimize their visual weight.",
                  },
                  {
                    title: "Medical credentials",
                    body: "Physicians, specialists, and other healthcare professionals often include degree credentials (MD, FRCS, MBBS), board certifications, and hospital affiliations. For them, the extra lines serve a clear purpose: patients and colleagues need to know their qualifications. 'Dr. Sarah Okonkwo, MBBS, MRCP / Consultant Cardiologist / Royal Victoria Hospital / GMC No. 1234567' is six lines but entirely justified.",
                  },
                  {
                    title: "Academic roles",
                    body: "Professors and researchers often include institutional affiliation, department, office location, and office hours. These serve practical purposes — students need to know where to find you. A 6–7 line signature is common and appropriate in academic contexts.",
                  },
                  {
                    title: "Multiple contact methods genuinely needed",
                    body: "If you work across time zones and need to list a US number, a UK number, and a WhatsApp — and your contacts actually need all three — that adds a line. Be honest about whether they genuinely need it or whether you're padding.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-slate-50 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7 */}
            <section id="the-scroll-test" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The &ldquo;too long&rdquo; test
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s the simplest test you can run right now: open a typical email you&rsquo;ve
                sent recently. On your phone, does the recipient have to scroll past your
                signature to get back to the email content above it? If yes, your signature
                is too long.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                On desktop, a related test: does your signature take up more vertical space
                than a three-sentence email? A signature should visually feel like a footer,
                not a second body of content.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-2">
                  Signs your signature is too long
                </p>
                <ul className="space-y-1">
                  {[
                    "More than 6 lines of text",
                    "A banner image taller than 100px",
                    "More than 3 social media icons",
                    "An inspirational quote",
                    "An environmental disclaimer",
                    "A legal disclaimer that isn't legally required",
                    "Your physical mailing address (unless required)",
                    "Multiple phone numbers for the same country",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-amber-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-design" className="text-blue-600 hover:underline">
                  email signature design guide
                </Link>{" "}
                has more on sizing and visual weight — including how to check your signature
                in different email clients before finalizing it.
              </p>
            </section>

            {/* Section 8 */}
            <section id="before-after" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Before and after examples
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Here&rsquo;s what the difference looks like in practice.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-red-700 mb-3">
                    Before — 11 lines, multiple social icons, a quote, and a disclaimer
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-sm text-slate-600 space-y-1">
                    <p className="font-bold text-slate-900">James Thornbury</p>
                    <p>Senior Marketing Manager</p>
                    <p>Meridian Solutions Ltd</p>
                    <p>T: +44 (0) 20 7946 0382</p>
                    <p>M: +44 (0) 7700 900123</p>
                    <p>E: j.thornbury@meridiansolutions.co.uk</p>
                    <p>W: www.meridiansolutions.co.uk</p>
                    <p className="text-blue-600">LinkedIn | Twitter | Instagram | Facebook</p>
                    <p className="text-xs text-slate-400 italic">
                      &ldquo;The best marketing doesn&rsquo;t feel like marketing.&rdquo; — Seth Godin
                    </p>
                    <p className="text-xs text-slate-400">
                      Please consider the environment before printing this email.
                    </p>
                    <p className="text-xs text-slate-400">
                      CONFIDENTIALITY NOTICE: This email is for the intended recipient only...
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-green-700 mb-3">
                    After — 4 lines, clean and specific
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-sm text-slate-600 space-y-1">
                    <p className="font-bold text-slate-900">James Thornbury</p>
                    <p>Senior Marketing Manager | Meridian Solutions</p>
                    <p>+44 20 7946 0382 · j.thornbury@meridiansolutions.co.uk</p>
                    <p className="text-blue-600">meridiansolutions.co.uk · LinkedIn</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                The &ldquo;after&rdquo; version contains the same essential information: name, title,
                company, two contact methods, website, and LinkedIn. It removes the duplicate
                phone number, the three irrelevant social accounts, the quote, the environmental
                notice, and the unnecessary disclaimer. It looks more professional, not less,
                because of what was cut.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Ready to rebuild yours from scratch?{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  The NeatStamp editor
                </Link>{" "}
                walks you through it line by line and generates clean HTML in about a minute.
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

            {/* Related */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related reading</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/blog/what-to-include-email-signature",
                    title: "What to Include in an Email Signature",
                    desc: "Every element explained and prioritized",
                  },
                  {
                    href: "/blog/email-signature-etiquette",
                    title: "Email Signature Etiquette",
                    desc: "When, why, and how to use your signature",
                  },
                  {
                    href: "/blog/email-signature-best-practices",
                    title: "Email Signature Best Practices",
                    desc: "The complete guide to fonts, colors, and sizing",
                  },
                  {
                    href: "/email-signature-design",
                    title: "Email Signature Design",
                    desc: "Layout options and visual design principles",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 text-sm mb-1">{link.title}</p>
                    <p className="text-xs text-slate-500">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build a clean 4-line signature right now
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                The NeatStamp editor guides you through each line and generates
                copy-paste HTML that works in Gmail, Outlook, and Apple Mail.
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
