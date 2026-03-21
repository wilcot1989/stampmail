import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "QR Code in Email Signature: When and How to Use One",
  description:
    "When does a QR code in an email signature actually make sense? Real estate, business cards, vCard downloads. How to create one, right size, right placement, common mistakes.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-qr-code-guide",
  },
};

const faqs = [
  {
    q: "Should I add a QR code to my email signature?",
    a: "It depends on your context. QR codes in email signatures make the most sense when your recipient is likely to view the email on desktop but needs to take action on their phone — like adding your contact details (vCard), visiting your property listings (real estate), or booking a mobile-optimized scheduling page. If your audience is primarily mobile email readers, a QR code is redundant — they're already on a phone. Test whether it adds value for your specific use case.",
  },
  {
    q: "What should a QR code in an email signature link to?",
    a: "The most practical options are: a vCard URL (adds your contact details to the recipient's phone with one scan), your Calendly or booking page (for quick mobile scheduling), a specific landing page or campaign URL, or your LinkedIn profile. Avoid QR codes that link to generic homepages — they need to deliver clear value relative to just tapping a text link.",
  },
  {
    q: "What size should a QR code be in an email signature?",
    a: "80×80px to 100×100px is the right range for a signature QR code. Smaller than 80px and it may be too small to scan accurately with older phone cameras. Larger than 100px and it dominates the signature visually. Set the actual image file at 2x resolution (160×160px or 200×200px) for sharpness on retina displays, but render it at 80–100px display size.",
  },
  {
    q: "Do QR codes work in all email clients?",
    a: "The QR code image itself renders in all email clients that display images — Gmail, Outlook, Apple Mail, etc. The scanning experience is client-agnostic: the recipient opens their phone camera and scans the image on screen. The only limitation is Outlook's default image-blocking behavior, which means new contacts may see a blank box where the QR code should be until they click 'Show images'. This is why alt text on the QR code matters.",
  },
  {
    q: "Can I create a QR code for my email signature for free?",
    a: "Yes. NeatStamp's QR code generator creates a signature-optimized QR code (correct size, correct resolution, with your chosen destination URL) as part of the editor. Free QR code tools like QR Code Generator or QRCode Monkey also work — just make sure to export at 2x resolution (minimum 200×200px) for a sharp result in retina email clients.",
  },
];

export default function EmailSignatureQRCodeGuidePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "QR Code Email Signature Guide",
            url: "https://neatstamp.com/blog/email-signature-qr-code-guide",
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
            <span className="text-slate-700">QR Code Email Signature Guide</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                  Design
                </span>
                <span className="text-sm text-slate-400">11 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                QR Code in Your Email Signature: When It Makes Sense and How to Do It Right
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                QR codes in email signatures are having a moment — real estate agents,
                consultants, and event speakers are adding them everywhere. Some of those
                use cases are genuinely useful. Others are a solution looking for a problem.
                This guide walks through when a QR code adds real value, when it doesn&rsquo;t,
                how to create one that works across all email clients, and the mistakes
                that make signature QR codes frustrating rather than helpful.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 11 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#why-qr-codes", "Why QR codes in signatures at all?"],
                  ["#when-use", "When a QR code is genuinely useful"],
                  ["#when-not", "When to skip the QR code"],
                  ["#what-to-link", "What to link your QR code to"],
                  ["#how-to-create", "How to create a signature QR code"],
                  ["#best-practices", "Best practices for size and placement"],
                  ["#common-mistakes", "Common mistakes"],
                  ["#neatstamp-qr", "NeatStamp's QR code generator"],
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
            <section id="why-qr-codes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why QR codes in signatures at all?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The core value of a QR code in an email signature is bridging the desktop-to-mobile
                gap. If someone is reading your email on a laptop or desktop computer and
                wants to add your contact details to their phone, or visit a mobile-optimized
                experience, copying a URL and manually typing it into their phone is
                friction. Scanning a QR code with their phone camera is one action.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                That use case is real, but it&rsquo;s narrower than most QR code enthusiasts
                acknowledge. If your recipient is reading the email on their phone already
                (which is over 50% of business email in 2026), a QR code is useless — they
                can&rsquo;t scan their own phone screen. If your link is already clickable in the
                signature, a QR code is redundant for the same reason.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                So the question to ask before adding a QR code: is there a meaningful
                portion of my email recipients who are reading on desktop but would benefit
                from taking this action on their phone? If the answer is yes, a QR code
                earns its place. If the answer is &ldquo;I just think it looks modern,&rdquo; skip it.
              </p>
              <p className="text-slate-600 leading-relaxed">
                There are three industries where I consistently see QR codes in signatures
                adding genuine value: real estate, professional services where contact
                saving matters, and event speakers or educators. More on each of those below.
              </p>
            </section>

            {/* Section 2 */}
            <section id="when-use" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When a QR code is genuinely useful
              </h2>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                1. Real estate agents — property listings and virtual tours
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Real estate is the clearest use case I&rsquo;ve seen. Agents email buyers and
                sellers from desktop email constantly. A QR code that links to your current
                listings, a specific property&rsquo;s virtual tour, or your agency profile does
                something text links can&rsquo;t: it lets the recipient immediately scan and view
                the property on their phone while they continue the conversation on their
                laptop.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The specific workflow that makes this work: recipient gets your email on
                desktop, sees a QR code labeled &ldquo;View current listings on your phone,&rdquo; scans
                it, and starts browsing photos on a mobile-optimized listings page. The
                QR code shortens the path from email to mobile property search by several
                steps. For a real estate agent using a{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional email signature
                </Link>
                , a QR code to a listings page is worth testing.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                2. vCard contact saving
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                A vCard QR code is probably the most universally applicable use case for
                any professional. When the recipient scans it, their phone immediately
                opens a &ldquo;Add to Contacts&rdquo; dialog populated with your name, phone, email,
                website, and company. One tap and you&rsquo;re in their contacts.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is useful for: consultants and freelancers (prospects are more likely
                to save your contact before they decide to hire you), sales professionals
                (getting into someone&rsquo;s phone contacts is valuable for callback intent), and
                anyone whose work involves people calling or texting them later.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                The vCard format is a standard — any modern smartphone can read it. You
                create a URL that returns a .vcf file when visited, then encode that URL
                as a QR code.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                3. Business card alignment
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you hand out physical business cards that include a QR code, having the
                same QR code in your email signature creates a consistent experience across
                channels. Someone who&rsquo;s seen your business card recognizes the same QR code
                in your email — it reinforces the connection and makes the destination
                obvious (they&rsquo;ve probably already scanned it once).
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                4. Event speakers and educators
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                After a conference or webinar, speakers often follow up with attendees via
                email. A QR code linking to the slide deck, a course enrollment page, or
                a resource list is actually useful here — attendees are reading on their
                laptops but may want to access the resource on their phone later. The QR
                code eliminates the step of typing a long URL.
              </p>
            </section>

            {/* Section 3 */}
            <section id="when-not" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When to skip the QR code
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In my experience, a QR code in an email signature is a poor fit in these situations:
              </p>

              <div className="space-y-3 mb-4">
                {[
                  {
                    scenario: "Your audience reads email primarily on mobile",
                    reason: "Over 50% of business email is opened on phones. A QR code requires a second device to be useful. For mobile-first audiences, the QR code is just visual clutter.",
                  },
                  {
                    scenario: "The QR code links to something already in the signature as a text link",
                    reason: "If you already have a clickable link to your website in the signature, a QR code for the same URL is pure redundancy. The recipient will just click the link.",
                  },
                  {
                    scenario: "Internal company emails",
                    reason: "Colleagues who already have your contact details saved don't need a vCard QR code. For internal communications, a QR code adds weight to the signature with no value.",
                  },
                  {
                    scenario: "Conservative or formal industries",
                    reason: "In legal, finance, or traditional corporate settings, a QR code in a signature can look informal or gimmicky. Read the room — if senior people at your company don't use them, neither should you.",
                  },
                  {
                    scenario: "The destination isn't mobile-optimized",
                    reason: "A QR code that sends someone to a desktop-only website on their phone is a frustrating experience. Only use a QR code if the destination works well on mobile.",
                  },
                ].map((item) => (
                  <div key={item.scenario} className="p-4 border border-slate-200 rounded-xl">
                    <p className="font-semibold text-red-700 mb-1">{item.scenario}</p>
                    <p className="text-sm text-slate-600">{item.reason}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 */}
            <section id="what-to-link" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to link your QR code to
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Ranked by usefulness across most professional contexts:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    rank: "1",
                    destination: "vCard / digital contact card",
                    value: "High",
                    detail: "Lets recipients add your contact details to their phone in one scan. Use a URL that serves a .vcf file, or a service like HiHello or Linktree for a more polished experience.",
                    audiences: "Universal — works for almost any professional",
                  },
                  {
                    rank: "2",
                    destination: "Calendly / Cal.com booking page",
                    value: "High",
                    detail: "Particularly useful if the booking page is mobile-optimized (Calendly's is). The QR code removes the copy-paste-into-phone step for people who prefer to schedule on mobile.",
                    audiences: "Sales, consultants, anyone who takes meetings",
                  },
                  {
                    rank: "3",
                    destination: "Property listings page",
                    value: "High (niche)",
                    detail: "Links to your current listings on a mobile-friendly property portal. Update the QR code destination when listings change, or link to a persistent 'my listings' page.",
                    audiences: "Real estate agents",
                  },
                  {
                    rank: "4",
                    destination: "LinkedIn profile",
                    value: "Medium",
                    detail: "LinkedIn's own QR code scanner does this natively in the app, so it feels slightly redundant. But as a standalone signature QR code, it works and gives context about you.",
                    audiences: "Business development, personal branding",
                  },
                  {
                    rank: "5",
                    destination: "Portfolio or case study",
                    value: "Medium",
                    detail: "Works if the portfolio is genuinely mobile-optimized. For creatives following up after a pitch, this gets the portfolio onto their phone fast.",
                    audiences: "Designers, consultants, freelancers",
                  },
                  {
                    rank: "6",
                    destination: "Company homepage",
                    value: "Low",
                    detail: "A link is already in the signature. This is redundant in almost every case. Don't use a QR code for a destination that's already one click away in text.",
                    audiences: "Not recommended",
                  },
                ].map((item) => (
                  <div key={item.rank} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-3 bg-slate-50 px-5 py-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.rank}
                      </span>
                      <h3 className="font-semibold text-slate-900">{item.destination}</h3>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.value === "High" ? "bg-green-100 text-green-700" :
                        item.value === "Medium" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-500"
                      }`}>
                        {item.value} value
                      </span>
                    </div>
                    <div className="px-5 py-3">
                      <p className="text-sm text-slate-600 mb-1">{item.detail}</p>
                      <p className="text-xs text-slate-400">Best for: {item.audiences}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 */}
            <section id="how-to-create" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to create a signature QR code
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Creating a QR code takes 5 minutes. The part that requires care is making
                sure the output is technically correct for email use.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Step 1: Choose your destination URL
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Decide what the QR code links to (see the ranking above). If it&rsquo;s a vCard,
                you&rsquo;ll need a URL that serves a .vcf file. Options:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  Host a .vcf file on your company website (e.g.,{" "}
                  <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">
                    yourcompany.com/contacts/sarah.vcf
                  </code>
                  )
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  Use a digital business card service: HiHello, Popl, or Linktree all generate
                  vCard QR codes
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  NeatStamp generates a vCard QR code automatically from your signature details
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Step 2: Generate the QR code at the right resolution
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                This is where most people go wrong. They generate a 100×100px QR code and
                it looks pixelated on retina displays. Generate at 2x:
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>Output size from the generator: 200×200px minimum</li>
                  <li>Display size in the signature: 80–100px</li>
                  <li>File format: PNG (not JPG — QR codes are geometric shapes and compress poorly as JPG)</li>
                  <li>Error correction level: Medium (M) — gives enough redundancy without making the pattern too dense at small sizes</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Step 3: Test the scan at the display size
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before using it, display the QR code at 80–100px on your monitor and try
                to scan it with your phone camera. If it doesn&rsquo;t scan reliably at that size,
                your error correction level is too low or your QR code contains too much
                data (long URLs with UTM parameters can make QR codes very dense). Shorten
                the URL if needed (using your own domain redirect, not a third-party
                shortener — see the deliverability section below).
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Step 4: Host the QR code image
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Like any signature image, the QR code PNG should be hosted externally,
                not embedded as base64. Upload it to your company website or CDN. For
                NeatStamp Pro users, the image hosting is handled automatically.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For general guidance on image hosting and why it matters for deliverability,
                the{" "}
                <Link href="/blog/email-signature-spam-filter-fix" className="text-blue-600 hover:underline">
                  spam filter fix guide
                </Link>{" "}
                covers this in detail.
              </p>
            </section>

            {/* Section 6 */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Best practices for size and placement
              </h2>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Size</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <div className="space-y-2 text-sm text-blue-800">
                  {[
                    "Minimum display size: 80×80px — below this, older phone cameras struggle",
                    "Maximum display size: 100×100px — larger than this and it looks like the QR code is the main event",
                    "File resolution: 200×200px (2x) for retina sharpness",
                    "File size: under 15KB — QR codes compress well as PNGs",
                    "White padding around the code: 10–15% of the image size (called 'quiet zone') — this is required for reliable scanning and most generators include it automatically",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Placement</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The QR code works best in one of two positions:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                {[
                  {
                    position: "Right column, aligned with contact details",
                    detail: "In a two-column layout, the QR code sits on the right side alongside (but not overlapping) the contact information. This is the most natural position — it reads as a companion element to the rest of the contact block.",
                    verdict: "Recommended",
                    color: "green",
                  },
                  {
                    position: "Below the main signature, on its own line",
                    detail: "A full-width QR code below all other signature elements. Works for single-column signatures. The risk is that it makes the signature taller and pushes it below the fold in short email clients.",
                    verdict: "Acceptable",
                    color: "amber",
                  },
                ].map((item) => (
                  <div key={item.position} className="border border-slate-200 rounded-xl p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block ${
                      item.color === "green" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.verdict}
                    </span>
                    <h4 className="font-semibold text-slate-900 text-sm mb-2">{item.position}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Label your QR code</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                A QR code without context is ambiguous. Most recipients won&rsquo;t scan a random
                pattern — they need to know what it does. Add a 2–4 word label directly
                below the QR code:
              </p>
              <ul className="space-y-2 mb-4 text-slate-600">
                {[
                  '"Save my contact" — for vCard QR codes',
                  '"Book a call" — for Calendly links',
                  '"View listings" — for real estate',
                  '"Scan to connect" — for LinkedIn',
                ].map((example) => (
                  <li key={example} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {example}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Keep the label text at 9–10px — it&rsquo;s secondary information. The{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  best practices guide
                </Link>{" "}
                covers minimum font sizes and when to use small text safely.
              </p>
            </section>

            {/* Section 7 */}
            <section id="common-mistakes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Common mistakes with signature QR codes
              </h2>

              <div className="space-y-4 mb-4">
                {[
                  {
                    mistake: "Generating at too small a resolution",
                    detail: "A 80×80px QR code generated at 80px actual resolution looks pixelated on retina screens. Always generate at 2x (200×200px) and display at 80–100px.",
                  },
                  {
                    mistake: "Using a JPG instead of PNG",
                    detail: "JPG compression creates artifacts around the dark/light edges of QR code modules. These artifacts can confuse phone cameras, causing scan failures. Always use PNG for QR codes.",
                  },
                  {
                    mistake: "No alt text on the QR code image",
                    detail: 'Outlook blocks images by default. Without alt text, new contacts see a blank box where the QR code should be. Set descriptive alt text: "Scan to save my contact details" or "QR code: scan to book a call".',
                  },
                  {
                    mistake: "Too much data encoded — URL is too long",
                    detail: "Long URLs (especially with UTM parameters) create very dense QR codes that are hard to scan at small sizes. Use a URL redirect or shortener on your own domain to keep the encoded URL short. Don't use third-party shorteners (bit.ly, etc.) as they can affect deliverability.",
                  },
                  {
                    mistake: "Dynamic QR code service that expires",
                    detail: "Some free QR code tools generate 'dynamic' codes that redirect through their servers and expire after a free trial period ends. The QR code in every email you've already sent stops working when the service expires. Use a static QR code pointing directly to your URL, or host the redirect on your own domain.",
                  },
                  {
                    mistake: "No quiet zone around the QR code",
                    detail: "The quiet zone (white border around the QR code pattern) is required by the QR standard for reliable scanning. Some generators skip it if you set padding to zero. Make sure your export includes at least 4 modules of white space around all four sides.",
                  },
                ].map((item) => (
                  <div key={item.mistake} className="border border-slate-200 rounded-xl p-5">
                    <p className="font-semibold text-red-700 mb-2">{item.mistake}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8 */}
            <section id="neatstamp-qr" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp&rsquo;s QR code generator
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp includes a QR code generator built directly into the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  signature editor
                </Link>
                . It handles the technical requirements automatically so you don&rsquo;t have to
                think about resolution, error correction level, or quiet zones.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    feature: "Auto-generated vCard QR code",
                    detail: "When you fill in your contact details in the editor, NeatStamp can generate a vCard QR code from those details automatically — you don't need to manually create a .vcf file.",
                  },
                  {
                    feature: "Custom URL QR code",
                    detail: "Enter any URL (Calendly, portfolio, listings page) and NeatStamp generates a correctly sized, correctly formatted QR code ready for email use.",
                  },
                  {
                    feature: "Correct sizing and placement",
                    detail: "The editor constrains the QR code to 80–100px display size and places it correctly in the signature layout. The file is generated at 2x resolution for retina sharpness.",
                  },
                  {
                    feature: "Hosted on NeatStamp's CDN",
                    detail: "The QR code image is hosted on NeatStamp's CDN (Pro plan), so you don't have to worry about hosting it yourself or it being blocked by spam filters due to hosting domain reputation.",
                  },
                  {
                    feature: "Label text included",
                    detail: "You can set the label text (e.g., 'Save my contact') that appears below the QR code directly in the editor. The font size is automatically set to the minimum readable size.",
                  },
                ].map((item) => (
                  <div key={item.feature} className="flex gap-3 p-4 border border-slate-200 rounded-xl">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">{item.feature}</p>
                      <p className="text-sm text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The QR code feature is available on the Pro and Teams plans. The free plan
                generates the signature HTML without the QR element — you can add a manually
                created QR code as a custom image if needed.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you want to see how a QR code looks in context before building yours,
                the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template library
                </Link>{" "}
                has several templates with QR code placement options. For the email client
                setup steps after you&rsquo;ve built the signature, the{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail guide
                </Link>
                ,{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook guide
                </Link>
                , and{" "}
                <Link href="/email-signature-apple-mail" className="text-blue-600 hover:underline">
                  Apple Mail guide
                </Link>{" "}
                walk through installation in each client.
              </p>
            </section>

            {/* Quick decision framework */}
            <section className="mb-12">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Should I add a QR code? Quick decision framework
                </h2>
                <div className="space-y-3 text-sm">
                  {[
                    { q: "Do at least 40% of my recipients read emails on desktop?", yes: "Proceed", no: "Skip it" },
                    { q: "Is there a clear mobile-specific action the QR code enables (vCard save, mobile booking)?", yes: "Proceed", no: "Skip it" },
                    { q: "Does my industry / role support a non-traditional signature element?", yes: "Proceed", no: "Skip it" },
                    { q: "Is the destination mobile-optimized?", yes: "Proceed", no: "Fix that first, then revisit" },
                  ].map((row) => (
                    <div key={row.q} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 text-blue-500">→</span>
                      <div className="flex-1">
                        <p className="text-slate-800 font-medium">{row.q}</p>
                        <p className="text-slate-500 mt-0.5">
                          Yes: <span className="text-green-600 font-medium">{row.yes}</span>
                          {" "}&nbsp;/&nbsp;{" "}
                          No: <span className="text-red-600 font-medium">{row.no}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Related reads */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related reading</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "/blog/email-signature-best-practices", label: "Email signature best practices" },
                  { href: "/blog/email-signature-size", label: "Signature size & image specs" },
                  { href: "/blog/email-signature-spam-filter-fix", label: "Spam filter fix guide" },
                  { href: "/email-signature-mobile-friendly", label: "Mobile-friendly signatures" },
                  { href: "/email-signature-dark-mode-compatible", label: "Dark mode compatibility" },
                  { href: "/professional-email-signature", label: "Professional signature guide" },
                  { href: "/email-signature-for-business", label: "Business email signatures" },
                  { href: "/email-signature-gmail", label: "Gmail signature guide" },
                  { href: "/email-signature-outlook", label: "Outlook signature guide" },
                  { href: "/alternative-to-wisestamp", label: "NeatStamp vs. WiseStamp" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-slate-700 hover:text-blue-700"
                  >
                    <span className="text-blue-400">→</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group border border-slate-200 rounded-xl">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                      {faq.q}
                      <svg
                        className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Add a QR code to your signature in 2 minutes
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates a correctly sized, email-ready QR code for your vCard
                or any URL — built right into the signature editor.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Build My Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
