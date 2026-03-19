import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Etiquette — Unwritten Rules (2026)",
  description:
    "When to include your signature, how long is too long, reply chain etiquette, internal vs external, industry norms, and the phone number debate. Real examples included.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-etiquette",
  },
};

const faqs = [
  {
    q: "Should I include my signature on every reply?",
    a: "No. Include your full signature on the first email in a thread. After that, trim it to just your name — or remove it entirely if the reply is short and conversational. Repeating a six-line signature on every 'Sounds good, thanks!' looks robotic and wastes space.",
  },
  {
    q: "How many lines should an email signature be?",
    a: "Four to six lines is the sweet spot for most professional contexts. Name, title, company, phone, email, and one optional element (LinkedIn or a logo). Beyond that, you're competing with your own email content for attention.",
  },
  {
    q: "Is it appropriate to include a quote in my email signature?",
    a: "Rarely. Inspirational quotes in email signatures are divisive — some recipients find them meaningful, many find them presumptuous. If you're going to include one, make sure it's closely relevant to your work or industry, not a generic motivational line.",
  },
  {
    q: "Should I use the same signature for internal and external emails?",
    a: "Ideally, no. Your external signature should be complete and polished — it's representing your company. Internal signatures can be much shorter: first name, role, and maybe a phone extension. Long formal signatures between colleagues who sit in the same building feel odd.",
  },
  {
    q: "Is it unprofessional to include social media links in an email signature?",
    a: "LinkedIn is almost universally fine. Beyond that, it depends on relevance. If you're a social media manager or content creator, other platforms make sense. But including Instagram or TikTok in a corporate finance or legal context will raise eyebrows.",
  },
];

export default function EmailSignatureEtiquettePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Etiquette",
            url: "https://neatstamp.com/blog/email-signature-etiquette",
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
            <span className="text-slate-700">Email Signature Etiquette</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  Etiquette
                </span>
                <span className="text-sm text-slate-400">13 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Etiquette — The Unwritten Rules (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Nobody gives you a handbook for this. You figure it out by noticing what feels
                off in someone else&rsquo;s emails, or worse, by getting it wrong yourself. I&rsquo;ve
                spent a long time thinking about what actually matters here — when to include
                a signature, when to drop it, what belongs in it, and what makes recipients
                quietly cringe. This is that handbook.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 13 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#when-to-include", "When to include your signature (and when not to)"],
                  ["#length", "How long is too long?"],
                  ["#formal-vs-casual", "Formal vs. casual — reading the room"],
                  ["#reply-chains", "Reply chain etiquette"],
                  ["#internal-vs-external", "Internal vs. external emails"],
                  ["#industry-norms", "Industry-specific norms"],
                  ["#phone-number", "The phone number debate"],
                  ["#quotes", "When quotes are appropriate (and when they're not)"],
                  ["#social-media", "Social media links — what's acceptable"],
                  ["#real-examples", "Real-world examples: good and bad"],
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
            <section id="when-to-include" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When to include your signature (and when not to)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The thing most people get wrong is treating their email signature like a
                footer that should appear on every single message they send. It shouldn&rsquo;t. A
                signature serves a specific purpose — it introduces you to someone who doesn&rsquo;t
                know you yet, or gives them a quick way to reach you. Once a thread is
                established, repeating your full contact block adds nothing.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s how to think about it:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    situation: "New email to someone you haven't contacted before",
                    verdict: "Yes — include full signature",
                    bg: "bg-green-50 border-green-200",
                    label: "bg-green-100 text-green-700",
                    note: "This is the primary use case. Your signature is doing real work here — establishing who you are, what you do, and how to reach you.",
                  },
                  {
                    situation: "First email in a new thread with an existing contact",
                    verdict: "Yes — include full signature",
                    bg: "bg-green-50 border-green-200",
                    label: "bg-green-100 text-green-700",
                    note: "Even if you know the person, a new thread benefits from your full details, especially if they need to forward or archive the email.",
                  },
                  {
                    situation: "A quick reply within an ongoing thread",
                    verdict: "Name only, or no signature",
                    bg: "bg-amber-50 border-amber-200",
                    label: "bg-amber-100 text-amber-700",
                    note: "Once a conversation is established, replying with your full six-line signature every time reads as automated. Just use your first name.",
                  },
                  {
                    situation: "Internal Slack-style quick emails to colleagues",
                    verdict: "Skip it entirely",
                    bg: "bg-red-50 border-red-200",
                    label: "bg-red-100 text-red-700",
                    note: "\"Can you send me the Q3 report?\" doesn't need your full title, company, LinkedIn, and logo. It's noise.",
                  },
                  {
                    situation: "Forwarding an email to a new recipient",
                    verdict: "Yes — include full signature",
                    bg: "bg-green-50 border-green-200",
                    label: "bg-green-100 text-green-700",
                    note: "You're now introducing yourself to someone who may not know you from the original thread.",
                  },
                ].map((item) => (
                  <div
                    key={item.situation}
                    className={`border rounded-xl p-5 ${item.bg}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <p className="font-semibold text-slate-900 flex-1">{item.situation}</p>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${item.label}`}
                      >
                        {item.verdict}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                Most email clients let you configure whether signatures are added to replies
                automatically. Gmail and Outlook both default to adding it everywhere — turn
                that off for replies, or set a shorter &ldquo;reply&rdquo; signature. If you&rsquo;re using
                the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>
                , you can export two versions: one full, one reply-only (just your name and
                title), and configure each in your client separately.
              </p>
            </section>

            {/* Section 2 */}
            <section id="length" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How long is too long?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                I&rsquo;ve seen email signatures that were, without exaggeration, longer than the
                emails they were attached to. A three-sentence email with an eight-line
                signature, two banners, eight social icons, a legal disclaimer, an
                inspirational quote, and a headshot. That&rsquo;s not a signature — that&rsquo;s an
                advertisement that arrived uninvited.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The practical guideline: <strong>four to six lines of text</strong>. Here&rsquo;s
                what fits comfortably in that budget:
              </p>

              <div className="bg-slate-50 rounded-xl p-6 mb-6 font-mono text-sm">
                <p className="text-slate-900 font-bold">Jordan Ellis</p>
                <p className="text-slate-600">Senior Account Manager, Whitmore &amp; Co.</p>
                <p className="text-slate-600">+44 7700 900452 &nbsp;|&nbsp; <span className="text-blue-600">jordan@whitmore.co.uk</span></p>
                <p className="text-blue-600">linkedin.com/in/jordanellis</p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Four lines. Everything a stranger needs to know who you are, what you do,
                and how to reach you. That&rsquo;s it.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you want to add a logo, that&rsquo;s legitimate — it takes up visual space but
                not additional lines of cognitive load. A headshot alongside your text block
                is similar: it expands the width, not the height. Both are fine if they&rsquo;re
                appropriately sized.
              </p>
              <p className="text-slate-600 leading-relaxed">
                What you shouldn&rsquo;t do is stack logos, headshots, banners, social icons, a
                tagline, a quote, and a disclaimer all at once. Pick the two or three
                elements that matter most for your context. The{" "}
                <Link
                  href="/professional-email-signature"
                  className="text-blue-600 hover:underline"
                >
                  professional email signature guide
                </Link>{" "}
                has detailed guidance on which elements earn their place and which are
                just padding.
              </p>
            </section>

            {/* Section 3 */}
            <section id="formal-vs-casual" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Formal vs. casual — reading the room
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A solicitor writing to a new client has different needs from a UX designer
                sending a proposal to a startup. Both are professional. Neither should use
                the same signature.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Formal contexts — legal, financial services, healthcare, government — call for
                a conservative design. Clean layout, no personal photos, no social links except
                LinkedIn at most, possibly a regulatory disclaimer. The signature communicates
                that you take the interaction seriously.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Casual-professional contexts — startups, creative agencies, consultants,
                freelancers — have more room to show personality. A headshot humanises outreach.
                A link to your portfolio or recent work is relevant. Even a one-line tagline
                can work if it&rsquo;s genuinely useful rather than marketing fluff.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The honest test: would someone senior at your organisation be comfortable
                seeing this signature forwarded to a major client? If you&rsquo;d wince, it&rsquo;s
                too casual. If it reads like a terms-of-service document, it&rsquo;s too formal
                for the relationship you&rsquo;re trying to build.
              </p>
              <p className="text-slate-600 leading-relaxed">
                One thing I&rsquo;ve seen work well: a slightly more formal signature for cold
                outreach, and a lighter version for ongoing relationships. Most people don&rsquo;t
                bother with this level of nuance, but it does make a difference in how
                emails land. The{" "}
                <Link
                  href="/email-signature-for-business"
                  className="text-blue-600 hover:underline"
                >
                  email signature for business guide
                </Link>{" "}
                covers industry-specific calibration in more detail.
              </p>
            </section>

            {/* Section 4 */}
            <section id="reply-chains" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Reply chain etiquette
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Reply chains are where signature etiquette breaks down most visibly. Open
                any long email thread and you&rsquo;ll often find five copies of the same six-line
                signature interspersed with two-word replies. It looks like nobody thought
                about it — because usually nobody did.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The sensible approach:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "First message in a thread: full signature.",
                  "Second reply and beyond: first name only, or no signature at all.",
                  "If you're bringing a new person into an existing thread (CC or Forward): include full signature again, because they don't have your context.",
                  "If the thread has gone on for days and shifts to a new topic: a brief re-introduction with your signature is thoughtful.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                The practical obstacle is that most email clients automatically append your
                signature to every reply. You have to actively disable this, or remember to
                delete it manually each time. In Gmail, you can go to Settings &rarr; General
                and choose &ldquo;Insert signature before quoted text&rdquo; — but you still need to
                choose whether to include the signature at all. The cleanest option is to
                set up a short reply signature (just your name) as a separate option.
              </p>
              <p className="text-slate-600 leading-relaxed">
                In Outlook, you can configure separate signatures for &ldquo;New messages&rdquo; and
                &ldquo;Replies/forwards&rdquo; under File &rarr; Options &rarr; Mail &rarr; Signatures.
                Set &ldquo;New messages&rdquo; to your full signature and &ldquo;Replies/forwards&rdquo; to either
                nothing or a one-line version with just your name.
              </p>
            </section>

            {/* Section 5 */}
            <section id="internal-vs-external" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Internal vs. external emails
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your external email signature is a business card. Your internal signature
                is a Post-it note. They serve different purposes, and treating them the same
                way is a common mistake.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h3 className="font-semibold text-blue-900 mb-3">External signature</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    {[
                      "Full name",
                      "Job title (specific)",
                      "Company name + link",
                      "Direct phone number",
                      "Email address",
                      "Company logo",
                      "LinkedIn profile",
                      "Legal disclaimer if required",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Internal signature</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {[
                      "First name (or full name)",
                      "Role / team",
                      "Phone extension or mobile",
                      "Slack handle (if relevant)",
                      "Nothing else",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Your colleagues know what company you work at. They can look up your email.
                They know your phone extension is on the internal directory. A full formal
                signature on every internal email is the email equivalent of handing a business
                card to the person you sit next to every day.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Some companies mandate a standardised signature for all staff, internal and
                external. That&rsquo;s a reasonable brand decision, and if it&rsquo;s policy, follow it.
                But if you have discretion, shorter internally is always better. The{" "}
                <Link
                  href="/email-signature-disclaimer"
                  className="text-blue-600 hover:underline"
                >
                  email signature disclaimer guide
                </Link>{" "}
                covers the legal requirements that sometimes make full signatures mandatory
                even internally.
              </p>
            </section>

            {/* Section 6 */}
            <section id="industry-norms" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Industry-specific norms
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                What&rsquo;s professional in one field is unusual in another. Here&rsquo;s a quick rundown
                of what&rsquo;s expected across different sectors, based on what I&rsquo;ve actually seen
                from professionals in each.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    sector: "Legal",
                    norms: "Credentials and regulatory affiliations after your name are standard (LLB, Solicitor of the Senior Courts of England and Wales). Registered office address is often legally required. No headshot — it's unusual in most firms. Legal disclaimers are mandatory. Conservative fonts only.",
                  },
                  {
                    sector: "Finance and Banking",
                    norms: "Regulatory disclosure is often required (FCA registration numbers, etc.). Keep it formal. No casual social links. Company logo yes, personal headshot typically no. Multi-line disclaimers are the norm even if most recipients ignore them.",
                  },
                  {
                    sector: "Healthcare",
                    norms: "Credentials are important — patients and colleagues want to see your qualifications. HIPAA disclaimers are required in the US. No personal social media. Avoid promotional content in signatures — it can look inappropriate in clinical contexts.",
                  },
                  {
                    sector: "Academic",
                    norms: "Title and institutional affiliation are everything. List your degrees after your name. Include your department, university, and office hours if relevant. A link to your research profile or Google Scholar page is expected and useful. Personal social links are fine in most academic cultures.",
                  },
                  {
                    sector: "Creative/Agency",
                    norms: "Portfolio link is more important than almost anything else. Headshots are normal. Unusual but tasteful design is acceptable — your signature is itself a small creative statement. Instagram or Behance may be relevant depending on your discipline.",
                  },
                  {
                    sector: "Real Estate",
                    norms: "Headshot is nearly universal and expected — clients buy from people they trust, and familiarity matters. Licence number is legally required in most jurisdictions. Agency logo. Phone number prominently placed — calls are how business happens.",
                  },
                  {
                    sector: "Tech/Startup",
                    norms: "Minimalism is valued. A long formal signature in a startup context can read as trying too hard. Keep it to four lines. A GitHub link is appropriate for engineers. If the company just launched, a product tagline can work.",
                  },
                ].map((item) => (
                  <div key={item.sector} className="bg-slate-50 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.sector}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.norms}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7 */}
            <section id="phone-number" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The phone number debate
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                I get asked about this surprisingly often: should you include your phone
                number in your email signature? The short answer is yes, if your work
                involves calls or time-sensitive communication. The longer answer depends
                on your role.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Include your phone number if:
              </p>
              <ul className="space-y-2 mb-5">
                {[
                  "You take client calls or external calls as part of your job",
                  "Recipients might need to reach you urgently",
                  "You're in sales, account management, consulting, or real estate",
                  "You frequently communicate with people outside your organisation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                Skip it or make it optional if:
              </p>
              <ul className="space-y-2 mb-5">
                {[
                  "You work exclusively with internal colleagues who know your extension",
                  "Your role is primarily asynchronous (no urgent inbound calls expected)",
                  "You have privacy concerns about sharing a personal mobile number widely",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you include a number, use your direct line rather than a general
                switchboard, and format it so it&rsquo;s tappable on mobile (use a{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  tel:
                </code>{" "}
                link). One number only — listing a mobile, an office line, and a
                WhatsApp number in a row looks desperate and makes recipients unsure
                which to use.
              </p>
            </section>

            {/* Section 8 */}
            <section id="quotes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When quotes are appropriate (and when they&rsquo;re not)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Inspirational quotes in email signatures are one of those things where people
                feel strongly. I&rsquo;ve seen both sides of this clearly. Here&rsquo;s my honest take.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The case against: a quote is your unsolicited opinion about what your
                recipient should find inspiring. Most email threads are about specific,
                practical things — projects, approvals, scheduling. Ending every email
                with &ldquo;Be the change you wish to see in the world&rdquo; doesn&rsquo;t add meaning; it adds
                noise. And it can feel passive-aggressive in tense professional exchanges.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The case for: in some contexts — coaching, speaking, writing, leadership
                development — a relevant quote signals your professional frame. If you&rsquo;re
                a leadership consultant and you quote Peter Drucker, that&rsquo;s genuinely
                on-brand and relevant. It tells people something meaningful about how you think.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The rule I&rsquo;d apply: if the quote is directly relevant to your professional
                positioning and your recipients would find it interesting rather than
                eye-roll-inducing, it can work. Generic motivational quotes from people who
                never said them, or vaguely spiritual aphorisms in a corporate context —
                leave those out. The{" "}
                <Link
                  href="/email-signature-quotes"
                  className="text-blue-600 hover:underline"
                >
                  email signature quotes guide
                </Link>{" "}
                has a full breakdown of quote etiquette with examples that work and ones
                that really don&rsquo;t.
              </p>
            </section>

            {/* Section 9 */}
            <section id="social-media" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Social media links — what&rsquo;s acceptable
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The general rule: include a social link only if your recipients would find
                it professionally relevant and if you&rsquo;re actually active on that platform.
                A LinkedIn icon that leads to a profile last updated in 2021 is worse than
                no LinkedIn icon.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Platform</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Appropriate for</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { platform: "LinkedIn", appropriate: "Almost everyone in a professional context", verdict: "Always fine", verdictClass: "text-green-700" },
                      { platform: "Twitter / X", appropriate: "Journalists, analysts, thought leaders, political professionals", verdict: "Contextual", verdictClass: "text-amber-700" },
                      { platform: "GitHub", appropriate: "Developers, technical roles, open source contributors", verdict: "Fine in tech", verdictClass: "text-green-700" },
                      { platform: "Instagram", appropriate: "Photographers, designers, fashion, food, lifestyle brands", verdict: "Creative contexts only", verdictClass: "text-amber-700" },
                      { platform: "YouTube", appropriate: "Educators, content creators, trainers", verdict: "Only if active", verdictClass: "text-amber-700" },
                      { platform: "TikTok", appropriate: "Social media professionals, consumer brands", verdict: "Usually no", verdictClass: "text-red-600" },
                      { platform: "Facebook", appropriate: "Rarely", verdict: "Generally no", verdictClass: "text-red-600" },
                    ].map((row) => (
                      <tr key={row.platform}>
                        <td className="py-3 px-4 font-medium text-slate-800">{row.platform}</td>
                        <td className="py-3 px-4 text-slate-600">{row.appropriate}</td>
                        <td className={`py-3 px-4 font-semibold ${row.verdictClass}`}>{row.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                One more thing: limit yourself to two or three social icons maximum. A row
                of eight social platform icons is visually overwhelming and implies you&rsquo;re
                trying to be found on any platform possible, which doesn&rsquo;t communicate
                confidence. Pick the two that matter and link to those.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Make sure your icons are properly sized and spaced — minimum 24x24px, with
                at least 6px between them. Tiny clustered icons are nearly impossible to tap
                on a phone. The{" "}
                <Link
                  href="/professional-email-signature"
                  className="text-blue-600 hover:underline"
                >
                  professional email signature guide
                </Link>{" "}
                covers social icon sizing and layout in detail.
              </p>
            </section>

            {/* Section 10 */}
            <section id="real-examples" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Real-world examples: good and bad
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Let me show you what these principles look like in practice. These are
                composites based on patterns I&rsquo;ve seen — not real individuals, but
                representative of actual problems.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Example 1 — The overloaded signature
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4 font-mono text-sm">
                <p className="text-slate-900 font-bold">MARCUS J. HENDERSON</p>
                <p className="text-slate-600">Chief Experience Officer | Visionary Leader | Passionate About People</p>
                <p className="text-slate-600">Henderson Solutions Group Ltd</p>
                <p className="text-slate-600">+44 7700 900111 (Mobile) | +44 20 7946 0202 (Office) | +44 1234 567890 (Direct)</p>
                <p className="text-slate-600">marcus.henderson@hendersonsolutions.co.uk</p>
                <p className="text-blue-600">www.hendersonsolutions.co.uk</p>
                <p className="text-slate-500 italic text-xs mt-2">&ldquo;The secret of getting ahead is getting started.&rdquo; — Mark Twain</p>
                <div className="flex gap-2 mt-2 text-xs text-blue-600">
                  <span>[LinkedIn]</span><span>[Twitter]</span><span>[Facebook]</span>
                  <span>[Instagram]</span><span>[YouTube]</span><span>[TikTok]</span>
                </div>
                <p className="text-slate-400 text-xs mt-2">CONFIDENTIALITY NOTICE: This email and any attachments are for the exclusive use of the intended recipient(s) and may contain confidential or legally privileged information...</p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                What&rsquo;s wrong: Three phone numbers with no guidance on which to call. A
                job title padded with buzzwords. A generic quote with a dubious attribution.
                Six social icons for someone in consulting. A legal disclaimer for what
                is probably a routine email. This signature is longer than most of the
                emails it&rsquo;s attached to.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Example 2 — The clean signature
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4 font-mono text-sm">
                <p className="text-slate-900 font-bold">Sarah Okafor</p>
                <p className="text-slate-600">Head of Partnerships, Brightfield Media</p>
                <p className="text-slate-600">+44 7700 900823 &nbsp;|&nbsp; <span className="text-blue-600">sarah@brightfieldmedia.com</span></p>
                <p className="text-blue-600">linkedin.com/in/sarahokafor</p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                Four lines. One phone number. One social link. Name and title are clear.
                Nothing is competing for attention. A first-time recipient knows exactly
                who Sarah is and how to reach her.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Example 3 — Good use of optional elements
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4 font-mono text-sm">
                <p className="text-slate-900 font-bold">James Whitfield</p>
                <p className="text-slate-600">Commercial Solicitor — Banking &amp; Finance</p>
                <p className="text-slate-600">Harwick LLP &nbsp;|&nbsp; +44 20 7946 0445</p>
                <p className="text-blue-600">james.whitfield@harwick.co.uk</p>
                <p className="text-slate-500 text-xs mt-2">Harwick LLP is authorised and regulated by the Solicitors Regulation Authority (SRA No. 123456). Registered in England and Wales.</p>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                A legal disclaimer here is appropriate — it&rsquo;s required for most UK law
                firms. It&rsquo;s kept brief. The signature is otherwise clean and professional.
                Notice there&rsquo;s no headshot (unusual in law), no social links, and the title
                is specific and informative rather than vague or inflated.
              </p>

              <p className="text-slate-600 leading-relaxed">
                If you want to see more examples and build your own, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                is free and generates clean, properly formatted code. For industry-specific
                examples, the{" "}
                <Link
                  href="/blog/email-signature-best-practices"
                  className="text-blue-600 hover:underline"
                >
                  email signature best practices guide
                </Link>{" "}
                has breakdowns by sector, and the{" "}
                <Link
                  href="/email-signature-disclaimer"
                  className="text-blue-600 hover:underline"
                >
                  disclaimer guide
                </Link>{" "}
                goes into detail on when and how to include legal footers.
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
                Build a signature that follows every rule on this page
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Clean, professional, correctly sized — and free. No account required.
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
