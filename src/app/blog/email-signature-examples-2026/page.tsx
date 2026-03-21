import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Examples 2026 (15+ Real Examples)",
  description:
    "15+ real email signature examples by industry: corporate, creative, minimal, sales, medical, legal. See what works and why, then build yours free.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-examples-2026",
  },
};

const faqs = [
  {
    q: "What makes a good email signature in 2026?",
    a: "A good email signature is concise (5 lines or fewer), uses consistent branding, includes exactly the contact info the recipient needs, and renders correctly across Gmail, Outlook, and mobile. In 2026, dark mode compatibility and mobile-friendly sizing are more important than ever.",
  },
  {
    q: "How many lines should an email signature be?",
    a: "Five lines is the sweet spot for most professional roles. Name, title, company, phone, and one more element (logo, LinkedIn, or booking link). Going beyond 7–8 lines makes the signature larger than many emails.",
  },
  {
    q: "Should I include my photo in my email signature?",
    a: "It depends on your industry. For sales, consulting, real estate, and coaching, a headshot builds trust and helps recipients remember who you are. For legal, finance, and technical roles, it's unusual and often looks out of place. Keep it 80×80px to 100×100px if you use one.",
  },
  {
    q: "What's the best email signature for a small business?",
    a: "For a small business, include your name, title, company name (linked to your website), phone, and a small logo if you have one. If you serve a local area, include your city. A LinkedIn link is always worth adding. Keep the design clean — it makes the business look more established, not less.",
  },
  {
    q: "Are email signature templates free?",
    a: "Many generators offer free templates. NeatStamp has 5 free templates with no account required — you can customize and copy the code immediately. The paid plan adds more templates and team features.",
  },
];

export default function EmailSignatureExamples2026Page() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Examples 2026",
            url: "https://neatstamp.com/blog/email-signature-examples-2026",
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
            <span className="text-slate-700">Email Signature Examples 2026</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Examples
                </span>
                <span className="text-sm text-slate-400">18 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Examples 2026: 15+ Real-World Designs by Industry
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Looking for inspiration before you build your signature? I&rsquo;ve put
                together 15 real-world examples across every major industry and role
                type. For each one I&rsquo;ll explain what it includes, why each element is
                there, and what you can take from it for your own design.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 18 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Jump to a category
              </p>
              <ol className="grid sm:grid-cols-2 gap-1.5 text-sm">
                {[
                  ["#corporate", "Corporate & Executive"],
                  ["#minimal", "Minimal & Clean"],
                  ["#sales", "Sales & Business Development"],
                  ["#creative", "Creative & Freelance"],
                  ["#medical", "Medical & Healthcare"],
                  ["#legal", "Legal & Financial"],
                  ["#startup", "Startup & Tech"],
                  ["#real-estate", "Real Estate"],
                  ["#what-makes-good", "What makes a great signature"],
                  ["#faq", "FAQ"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href as string}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Intro box */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-10">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>How to use this guide:</strong> Each example describes a real
                signature type with specific details on layout, content, and design
                choices. You can find templates matching all of these styles in the{" "}
                <Link href="/templates" className="text-blue-700 font-medium hover:underline">
                  NeatStamp template library
                </Link>
                . To start building immediately, the{" "}
                <Link href="/editor" className="text-blue-700 font-medium hover:underline">
                  editor
                </Link>{" "}
                is free and takes about 60 seconds.
              </p>
            </div>

            {/* Section 1: Corporate */}
            <section id="corporate" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Corporate &amp; Executive Email Signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Corporate signatures prioritize clarity, brand consistency, and
                professionalism. They carry the weight of the company brand in every
                email, so the design needs to feel polished and intentional.
              </p>

              {/* Example 1 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 1 — Corporate Standard
                  </span>
                  <span className="text-xs text-slate-400">Fortune 500 style</span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm border-l-4 border-blue-600 pl-4 mb-4">
                    <p className="font-bold text-slate-900 text-base">Sarah Chen</p>
                    <p className="text-slate-500">VP of Operations · Meridian Global</p>
                    <p className="text-slate-500">+1 (212) 555-0192 · sarah.chen@meridianglobal.com</p>
                    <p className="text-blue-600 text-xs mt-1">meridianglobal.com · LinkedIn</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Name in 15px bold, title and company separated by a bullet, phone and email on one line, company website and LinkedIn as plain text links, a 4px left border in brand blue.</p>
                    <p><strong className="text-slate-800">Why it works:</strong> The vertical left border acts as a brand marker without needing a logo. Everything fits on three text lines. The title-company combo in one line saves vertical space.</p>
                    <p><strong className="text-slate-800">Font:</strong> Arial 13px. Background white. Text #333333.</p>
                    <p><strong className="text-slate-800">Steal this:</strong> The left border trick. It&rsquo;s one CSS property that instantly makes a plain signature look intentional.</p>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 2 — Corporate with Logo
                  </span>
                  <span className="text-xs text-slate-400">Side-by-side layout</span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm flex gap-4 mb-4">
                    <div className="w-16 h-16 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500 flex-shrink-0">
                      LOGO
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-base">James Whitfield</p>
                      <p className="text-slate-500">Chief Financial Officer</p>
                      <p className="text-slate-500">Apex Financial Group</p>
                      <p className="text-slate-500">+44 20 7946 0123</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Company logo (square format, 60×60px) on the left, name/title/company/phone stacked on the right using a two-column table layout.</p>
                    <p><strong className="text-slate-800">Why it works:</strong> The logo reinforces brand identity on every email. Square logos work better than horizontal ones for this layout. Title and company on separate lines because both are important at CFO level.</p>
                    <p><strong className="text-slate-800">Technical note:</strong> This uses an HTML table with two cells. The logo cell has a fixed width of 80px with padding-right: 16px. Without the table, this layout breaks in Outlook.</p>
                    <p><strong className="text-slate-800">Steal this:</strong> Separate title from company onto two lines when both carry real weight. Don&rsquo;t combine them just to save space if it dilutes the information.</p>
                  </div>
                </div>
              </div>

              {/* Example 3 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 3 — Executive with Social Row
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <p className="font-bold text-slate-900 text-base">Maria Santos</p>
                    <p className="text-slate-500">CEO &amp; Co-founder · TechBridge Inc.</p>
                    <p className="text-slate-500">+1 415 555 0178</p>
                    <div className="flex gap-2 mt-2">
                      {["LinkedIn", "Twitter/X", "Website"].map((s) => (
                        <span key={s} className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Name, title+company on one line, phone, then a row of three social icon links (LinkedIn, Twitter/X, personal website).</p>
                    <p><strong className="text-slate-800">Why it works:</strong> For a CEO or founder, personal brand matters as much as company brand. Three social links is the maximum — beyond that it looks scattershot. Twitter/X is relevant here because many tech executives are active there.</p>
                    <p><strong className="text-slate-800">Icon sizing:</strong> Each icon is 20×20px with at least 8px of spacing between them. Smaller than this and they become impossible to tap on mobile.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Minimal */}
            <section id="minimal" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Minimal &amp; Clean Email Signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Minimal signatures are increasingly popular, especially in tech, design,
                and consulting. The philosophy: show exactly what&rsquo;s needed, nothing
                more. Done well, a minimal signature looks more confident than an
                over-decorated one.
              </p>

              {/* Example 4 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 4 — The Two-Liner
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <p className="font-bold text-slate-900">Tom Blackwell</p>
                    <p className="text-slate-500">Product Designer · Figma · <span className="text-blue-600">tom@figma.com</span> · +1 628 555 0147</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Name on line one. Everything else — title, company, email, phone — separated by bullets on line two.</p>
                    <p><strong className="text-slate-800">Why it works:</strong> For internal emails or short replies, this is all you need. Two lines is genuinely minimal. The bullet separator keeps it readable without multiple lines.</p>
                    <p><strong className="text-slate-800">When to use it:</strong> Set this as your reply signature. Use a fuller version for new emails to people who don&rsquo;t know you.</p>
                    <p><strong className="text-slate-800">Steal this:</strong> The reply signature concept. Long thread? Keep it short. Most email clients let you set a separate signature for replies.</p>
                  </div>
                </div>
              </div>

              {/* Example 5 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 5 — Monochrome Minimal
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4 border-t border-slate-200 pt-3">
                    <p className="font-semibold text-slate-900">Priya Mehta</p>
                    <p className="text-slate-400 text-xs">Senior Engineer · Stripe</p>
                    <p className="text-slate-400 text-xs">priya.mehta@stripe.com</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> A thin horizontal rule, name in 13px semibold, title+company in 11px light grey, email in 11px light grey. No phone, no social, no logo.</p>
                    <p><strong className="text-slate-800">Why it works:</strong> In technical and internal contexts, this is enough. The thin rule provides a clean visual separator. The hierarchy is clear without being heavy.</p>
                    <p><strong className="text-slate-800">Color choice:</strong> Name is #1a1a1a. Secondary text is #9ca3af. Background is transparent (white). This passes contrast requirements for the name, and the secondary text is acceptable at the size it&rsquo;s used.</p>
                    <p><strong className="text-slate-800">Warning:</strong> #9ca3af (grey-400) technically fails WCAG AA at small text sizes. Use #6b7280 (grey-500) or darker if accessibility is a priority.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Sales */}
            <section id="sales" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Sales &amp; Business Development Signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Sales signatures do real work. They need to build credibility fast,
                make follow-up easy, and sometimes carry a subtle call to action. The
                balance is doing all of this without looking like you&rsquo;re trying too hard.
              </p>

              {/* Example 6 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 6 — Sales with Booking CTA
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-500 flex-shrink-0">
                        Photo
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">David Kim</p>
                        <p className="text-slate-500 text-xs">Account Executive · Salesforce</p>
                        <p className="text-slate-500 text-xs">+1 415 555 0234</p>
                        <p className="text-blue-600 text-xs mt-1">📅 Book a 30-min call</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Small circular headshot (48×48px), name, title+company, phone, and a Calendly booking link styled as a CTA.</p>
                    <p><strong className="text-slate-800">Why the headshot:</strong> In sales, you&rsquo;re often emailing people who don&rsquo;t know you. A face makes the email feel personal rather than corporate-automated. Even a small headshot changes the dynamic.</p>
                    <p><strong className="text-slate-800">Why the booking link:</strong> The single biggest friction in sales is scheduling. A one-click booking link eliminates a 3–5 email back-and-forth. That&rsquo;s worth a lot.</p>
                    <p><strong className="text-slate-800">What to avoid:</strong> Don&rsquo;t add a promotional banner as well. A headshot + booking link + banner is too much. Pick the elements that do the most work and cut the rest.</p>
                  </div>
                </div>
              </div>

              {/* Example 7 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 7 — B2B Sales with Social Proof
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <p className="font-bold text-slate-900">Rachel Torres</p>
                    <p className="text-slate-500 text-xs">Enterprise Sales · HubSpot</p>
                    <p className="text-slate-500 text-xs">rachel.torres@hubspot.com · +1 617 555 0189</p>
                    <p className="text-xs text-slate-400 mt-2 italic">&ldquo;Trusted by 150,000+ businesses&rdquo;</p>
                    <p className="text-blue-600 text-xs">View customer stories</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Standard contact info, a one-line social proof stat in italic, and a link to customer case studies.</p>
                    <p><strong className="text-slate-800">Why it works:</strong> The social proof line is subtle — it&rsquo;s not a hard sell, just context. But &ldquo;150,000+ businesses&rdquo; plants a credibility marker with every email. The case studies link gives genuinely curious prospects somewhere to go.</p>
                    <p><strong className="text-slate-800">Key rule:</strong> Only use this approach if the stat is real and impressive. A made-up or weak stat (e.g., &ldquo;serving customers since 2019&rdquo;) undermines credibility rather than building it.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Creative */}
            <section id="creative" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Creative &amp; Freelance Signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Creative professionals can be slightly more expressive in their
                signatures — but &ldquo;more expressive&rdquo; doesn&rsquo;t mean more cluttered. The
                best creative signatures show taste and restraint at the same time.
              </p>

              {/* Example 8 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 8 — Graphic Designer
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <div className="flex gap-3 items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900">Alex Morgan</p>
                        <p className="text-slate-400 text-xs">Brand Designer &amp; Art Director</p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs">alex@alexmorgandesign.com</p>
                    <p className="text-blue-600 text-xs">Portfolio · Instagram · Behance</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Circular headshot with bold color, name, creative-specific title, email, and three platform links relevant to the work (portfolio, Instagram, Behance).</p>
                    <p><strong className="text-slate-800">Why it works:</strong> The colorful headshot is the first thing you see — it establishes personality immediately. The social links go to places where the work actually lives, not generic social profiles.</p>
                    <p><strong className="text-slate-800">Platform logic:</strong> A brand designer should be on Behance (professional work) and Instagram (visual work, wider audience). LinkedIn would be a fourth link too many here.</p>
                    <p><strong className="text-slate-800">What to avoid:</strong> Don&rsquo;t try to make your signature HTML as creative as your design work. Email clients will mangle it. Express your personality through the profile photo and which platforms you link to, not complex layouts.</p>
                  </div>
                </div>
              </div>

              {/* Example 9 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 9 — Freelance Writer / Journalist
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <p className="font-bold text-slate-900">Isabelle Fontaine</p>
                    <p className="text-slate-500 text-xs">Freelance Journalist · Technology &amp; Culture</p>
                    <p className="text-slate-500 text-xs">Published in The Atlantic, Wired, MIT Technology Review</p>
                    <p className="text-blue-600 text-xs mt-1">isabellefontaine.com · Twitter/X</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Name, niche (technology &amp; culture), publication credits, website, and Twitter/X.</p>
                    <p><strong className="text-slate-800">Why the publication credits:</strong> For a freelance journalist, publication credits are the credibility signal. This line does more work than a LinkedIn link. The publications themselves carry the brand.</p>
                    <p><strong className="text-slate-800">Why Twitter/X:</strong> Journalists live on Twitter/X professionally. Editors and PRs expect it. It&rsquo;s appropriate here in a way it isn&rsquo;t for a corporate executive.</p>
                    <p><strong className="text-slate-800">Steal this:</strong> Use the third line to add relevant credentials rather than just contact info. For any specialist (doctor, lawyer, engineer), credentials on line three add real value.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Medical */}
            <section id="medical" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Medical &amp; Healthcare Signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Medical email signatures carry specific requirements. Credentials must
                appear correctly. HIPAA compliance affects what you can and can&rsquo;t
                include. The design needs to feel authoritative without being cold.
              </p>

              {/* Example 10 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 10 — Physician
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4 border-l-4 border-blue-800 pl-4">
                    <p className="font-bold text-slate-900">Dr. Michael Chen, MD, FACP</p>
                    <p className="text-slate-500 text-xs">Internal Medicine · Massachusetts General Hospital</p>
                    <p className="text-slate-500 text-xs">Harvard Medical School Clinical Faculty</p>
                    <p className="text-slate-500 text-xs">+1 617 555 0310</p>
                    <p className="text-xs text-slate-400 mt-2">CONFIDENTIALITY NOTICE: This email and any attachments are for the exclusive use of the intended recipient and may contain confidential or privileged information.</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Full name with MD + board certification (FACP), specialty + hospital, academic affiliation, direct phone, HIPAA confidentiality notice.</p>
                    <p><strong className="text-slate-800">Credential order:</strong> MD comes before FACP. Board certifications follow the degree. This is a professional standard in medicine — getting it wrong signals that someone didn&rsquo;t earn those letters naturally.</p>
                    <p><strong className="text-slate-800">The HIPAA notice:</strong> Required for US healthcare providers communicating about patient matters. It should be brief, small-font, and genuinely concise — not a 5-paragraph legal wall.</p>
                    <p><strong className="text-slate-800">No social links:</strong> Personal social links are inappropriate in a clinical context. A hospital website link in the affiliation line is fine.</p>
                  </div>
                </div>
              </div>

              {/* Example 11 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 11 — Healthcare Administrator
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <p className="font-bold text-slate-900">Jennifer Walsh, MHA, FACHE</p>
                    <p className="text-slate-500 text-xs">Chief Operating Officer · Riverside Health System</p>
                    <p className="text-slate-500 text-xs">+1 312 555 0241 · jennifer.walsh@rhsystem.org</p>
                    <p className="text-blue-600 text-xs mt-1">LinkedIn · rhsystem.org</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Administrative credentials (MHA = Master of Health Administration, FACHE = Fellow of the American College of Healthcare Executives), executive title, organization, contact info, LinkedIn.</p>
                    <p><strong className="text-slate-800">Why FACHE matters:</strong> FACHE is earned, not just a degree. It signals genuine professional standing to others in healthcare administration. Worth including at this level.</p>
                    <p><strong className="text-slate-800">LinkedIn is appropriate here:</strong> Unlike clinical physicians, healthcare administrators regularly engage professionally on LinkedIn. It&rsquo;s expected at the C-suite level.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Legal */}
            <section id="legal" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Legal &amp; Financial Services Signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Legal and financial signatures often have mandatory elements — registration
                numbers, regulatory disclosures, firm details required by law. They
                also tend toward the conservative end of design: no photos, minimal
                color, Georgia or Arial fonts.
              </p>

              {/* Example 12 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 12 — Law Firm Partner
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-xs font-bold text-slate-700 border border-slate-300 px-2 py-1 rounded">FIRM LOGO</div>
                    </div>
                    <p className="font-bold text-slate-900">Jonathan Hartley</p>
                    <p className="text-slate-500 text-xs">Partner · Hartley &amp; Associates LLP</p>
                    <p className="text-slate-500 text-xs">Employment &amp; Commercial Litigation</p>
                    <p className="text-slate-500 text-xs">T: +44 20 7946 0845 · E: j.hartley@hartleyassociates.co.uk</p>
                    <p className="text-slate-500 text-xs">Authorised and regulated by the Solicitors Regulation Authority (SRA No. 123456)</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Firm logo, name, title+firm name, specialty area, phone, email, regulatory line (mandatory in the UK for solicitors).</p>
                    <p><strong className="text-slate-800">Why the specialty line:</strong> A partner at an employment law firm doesn&rsquo;t want to receive commercial property enquiries. Stating the practice area pre-qualifies contacts without being exclusionary.</p>
                    <p><strong className="text-slate-800">The regulatory line:</strong> Mandatory in many jurisdictions. In the UK, SRA-regulated firms must include this. In the US, bar admission details are often required. Check your jurisdiction&rsquo;s rules.</p>
                    <p><strong className="text-slate-800">No headshot:</strong> Unusual in legal contexts, especially at partner level. The firm brand does the credibility work.</p>
                  </div>
                </div>
              </div>

              {/* Example 13 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 13 — Financial Adviser
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <p className="font-bold text-slate-900">Claire Beaumont, CFP®, CFA</p>
                    <p className="text-slate-500 text-xs">Senior Financial Adviser · Beacon Wealth Management</p>
                    <p className="text-slate-500 text-xs">+1 312 555 0378 · claire.beaumont@beaconwealth.com</p>
                    <p className="text-xs text-slate-400 mt-2">Investment advice is provided through Beacon Wealth Management LLC, a Registered Investment Adviser. This email is for informational purposes only and does not constitute investment advice.</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> CFP® and CFA credentials (both earned, both significant), title, firm, contact, mandatory regulatory disclosure.</p>
                    <p><strong className="text-slate-800">The ® on CFP®:</strong> The CFP Board requires this symbol. It&rsquo;s a small detail but skipping it can create compliance issues.</p>
                    <p><strong className="text-slate-800">The disclaimer:</strong> RIAs in the US are often required to include a brief disclosure. Keep it to 1–2 sentences. A wall of disclaimers belongs in the footer, not the signature.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Startup */}
            <section id="startup" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Startup &amp; Tech Signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Startup signatures trend minimal. Over-decorated signatures read as
                unsophisticated in tech circles. The typical startup signature is 3–4
                lines max, no headshot, small logo if any, maybe a GitHub link for
                engineering roles.
              </p>

              {/* Example 14 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 14 — Startup Founder
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <p className="font-bold text-slate-900">Niklas Bauer</p>
                    <p className="text-slate-500 text-xs">Co-founder &amp; CEO · Klarity</p>
                    <p className="text-blue-600 text-xs">klarity.io · LinkedIn</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Name, title+company, website and LinkedIn. Three lines. No phone (async culture), no headshot, no logo separate from the website link.</p>
                    <p><strong className="text-slate-800">Why no phone:</strong> Early-stage startup culture is async. Including a phone number implies you expect calls. Many startup founders don&rsquo;t. If you do, add it. If you don&rsquo;t take random calls, leave it out.</p>
                    <p><strong className="text-slate-800">The product link:</strong> Linking to the product (klarity.io) rather than a .com corporate site signals that the product is the brand. It&rsquo;s a subtle positioning choice.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Real Estate */}
            <section id="real-estate" className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Real Estate Signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Real estate is the one profession where a busy signature is not just
                acceptable — it&rsquo;s expected. Headshots are standard. Licence numbers
                are often required. Multiple contact methods make sense because clients
                choose how they want to reach you.
              </p>

              {/* Example 15 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Example 15 — Real Estate Agent
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-sans text-sm mb-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-500 flex-shrink-0">
                        Photo
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Lisa Park</p>
                        <p className="text-slate-500 text-xs">REALTOR® · Coldwell Banker</p>
                        <p className="text-slate-500 text-xs">Serving Miami-Dade &amp; Broward</p>
                        <p className="text-slate-500 text-xs">Cell: +1 305 555 0198 · Office: +1 305 555 0100</p>
                        <p className="text-slate-400 text-xs">DRE Lic. #1234567</p>
                        <p className="text-blue-600 text-xs mt-1">View my listings · LinkedIn</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-800">What&rsquo;s in it:</strong> Headshot (critical in real estate), name, REALTOR® designation, brokerage, service area, cell AND office numbers, licence number, listings link, LinkedIn.</p>
                    <p><strong className="text-slate-800">Why REALTOR® not just &ldquo;Realtor&rdquo;:</strong> REALTOR® is a NAR trademark. Using it properly (with ® and capitalised) signals membership and adherence to the code of ethics. Using it as a generic term is actually prohibited by NAR guidelines.</p>
                    <p><strong className="text-slate-800">Two phone numbers:</strong> Normal in real estate. Clients want to know they can reach you directly (cell) and also call the office if needed. List cell first — it&rsquo;s more reachable.</p>
                    <p><strong className="text-slate-800">The listings link:</strong> The most important CTA in a real estate signature. Direct interested contacts straight to active inventory. Update the link when your listing inventory changes.</p>
                    <p><strong className="text-slate-800">Service area:</strong> &ldquo;Serving Miami-Dade &amp; Broward&rdquo; pre-qualifies geographically. Anyone outside those counties knows immediately before they contact you. This saves time for everyone.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* What makes a great signature */}
            <section id="what-makes-good" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What makes a great email signature in 2026
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Looking across all 15 examples, a few patterns emerge for what separates
                the good signatures from the cluttered or forgettable ones.
              </p>

              <div className="space-y-4">
                {[
                  {
                    principle: "It gives the recipient exactly what they need",
                    body: "Every element earns its place. A real estate agent needs a photo and two phone numbers. A startup engineer needs nothing but name, title, and a website link. The right signature depends on who you are and what your contacts need from you.",
                  },
                  {
                    principle: "It renders correctly across email clients",
                    body: "Beautiful design means nothing if it breaks in Outlook. In 2026, Outlook is still used by the majority of corporate email users. Any signature you send to a business contact will likely be read in Outlook. Table-based layout with inline CSS is still the right technical approach.",
                  },
                  {
                    principle: "It works on mobile",
                    body: "Over 50% of business email is read on a phone. Your signature needs to scale down to a 375px wide screen without horizontal scrolling. Max-width 600px, explicit image dimensions, minimum 11px text. Check the mobile-friendly signature guide for specifics.",
                  },
                  {
                    principle: "It reflects your industry conventions",
                    body: "A lawyer with a headshot and emoji looks unprofessional. A creative director with a two-line plain-text signature looks like they don't care about their personal brand. Calibrate your signature to what's normal in your industry, then be slightly better than average.",
                  },
                  {
                    principle: "It's consistent across your whole team",
                    body: "Individual signatures are fine. But if you're part of a company, having everyone use a completely different format looks messy. A shared template ensures everyone's signature reflects the brand consistently.",
                  },
                ].map(({ principle, body }) => (
                  <div
                    key={principle}
                    className="bg-slate-50 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">{principle}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                For the technical rules behind all of these, the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  email signature best practices guide
                </Link>{" "}
                goes into fonts, colors, image sizing, and dark mode in detail. The{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional email signature guide
                </Link>{" "}
                has a pre-launch checklist. And if you want to see how your signature
                performs across different email clients, the{" "}
                <Link href="/blog/email-signature-dark-mode" className="text-blue-600 hover:underline">
                  dark mode guide
                </Link>{" "}
                is worth a read before you ship.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                For client-specific setup, the{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail signature guide
                </Link>
                {" "}and the{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook signature guide
                </Link>{" "}
                cover installation step by step. If you&rsquo;re on a Mac,{" "}
                <Link href="/email-signature-apple-mail" className="text-blue-600 hover:underline">
                  Apple Mail has its own setup process
                </Link>
                . All the signature styles in this guide are available in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                — free, no account required. The{" "}
                <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">
                  logo signature guide
                </Link>{" "}
                and{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature guide
                </Link>{" "}
                cover the corporate and team use cases in more depth. For sizing specifics on every element, the{" "}
                <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
                  signature size guide
                </Link>{" "}
                has the exact numbers.
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
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Found a style you like?
              </h2>
              <p className="text-purple-100 text-sm mb-6 max-w-md mx-auto">
                All the signature styles in this guide are available as templates in
                NeatStamp. Free to use, no account needed, copy-paste-ready for Gmail
                and Outlook.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/templates"
                  className="inline-block px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-sm"
                >
                  Browse Templates
                </Link>
                <Link
                  href="/editor"
                  className="inline-block px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-400 transition-colors text-sm"
                >
                  Build Mine Now
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
