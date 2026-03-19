import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "What to Include in Your Email Signature (Complete Guide) | NeatStamp",
  description:
    "The definitive checklist for email signatures: must-haves, should-haves, nice-to-haves, and what to leave out entirely. Includes per-industry recommendations.",
  alternates: {
    canonical: "https://neatstamp.com/blog/what-to-include-email-signature",
  },
};

const faqs = [
  {
    q: "What are the most important things to include in an email signature?",
    a: "Your full name, job title, company name, one phone number, and your email address. Those five form the non-negotiable core. Everything else is optional and should earn its place based on whether it adds value for the person reading it.",
  },
  {
    q: "Should I include my email address in my signature if the recipient already has it?",
    a: "Yes. Your email address gets stripped out when messages are forwarded, printed, or copied into documents. Including it means your contact info stays complete no matter how the email gets shared.",
  },
  {
    q: "How many lines should an email signature be?",
    a: "Four to six lines is the sweet spot for most professional contexts. Below four and you're likely missing something useful. Above six and you're competing with the content of your email for attention.",
  },
  {
    q: "Should I include inspirational quotes in my email signature?",
    a: "Generally no. Most recipients find them distracting, and they add length without adding contact information. The exception is if you're a speaker, coach, or author and the quote is your own — in that context it can reinforce your positioning.",
  },
  {
    q: "Do I need a legal disclaimer in my email signature?",
    a: "It depends on your industry and jurisdiction. Financial services, legal, and some healthcare sectors require them. For most other businesses, a boilerplate disclaimer adds length without providing real legal protection. Check with your compliance team if you're unsure.",
  },
  {
    q: "Is it okay to include pronouns in my email signature?",
    a: "Absolutely. Adding pronouns (she/her, he/him, they/them) to your signature is increasingly common and signals that you respect others' pronouns too. It's a personal choice, but in many workplaces it's actively encouraged.",
  },
];

export default function WhatToIncludeEmailSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "What to Include in Your Email Signature",
            url: "https://neatstamp.com/blog/what-to-include-email-signature",
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
            <span className="text-slate-700">What to Include in Your Email Signature</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Complete Guide
                </span>
                <span className="text-sm text-slate-400">13 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                What to Include in Your Email Signature (Complete Guide)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                There&rsquo;s no shortage of advice on email signatures, but most of it falls into two
                camps: either it&rsquo;s so vague it&rsquo;s useless (&ldquo;be professional!&rdquo;) or it tells you to
                add everything and the kitchen sink. This guide takes a different approach. We&rsquo;ll
                work through exactly what earns a place in your signature, why, and what to
                cut without guilt.
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
                  ["#the-hierarchy-rule", "The hierarchy rule — most important info first"],
                  ["#must-haves", "Must-haves: the non-negotiable five"],
                  ["#should-haves", "Should-haves: strong additions for most people"],
                  ["#nice-to-haves", "Nice-to-haves: situational extras"],
                  ["#leave-out", "What to leave out"],
                  ["#how-many-lines", "How many lines (and why 4–6 is ideal)"],
                  ["#character-count", "Character count and length limits"],
                  ["#by-industry", "Recommendations by industry"],
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
            <section id="the-hierarchy-rule" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The hierarchy rule — most important info first
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before getting into specific elements, here&rsquo;s the principle that should govern
                everything else: put the most important information first, and let everything
                else follow in descending order of usefulness.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your name and title go at the top because that&rsquo;s what establishes who you are.
                Your contact details follow because that&rsquo;s what the person needs to reach you.
                Social links, banners, and supplementary information go last, because if the
                email gets truncated or the recipient stops reading, they&rsquo;ve still seen the
                things that matter most.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                This sounds obvious but most people get it backwards — they put the company
                logo large at the top, then name and title, then a cluster of social icons,
                and then, buried at the bottom, their actual phone number. The logo doesn&rsquo;t
                need to be the hero. Your contact information does.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you want to see how this plays out visually, the{" "}
                <Link href="/email-signature-design" className="text-blue-600 hover:underline">
                  email signature design guide
                </Link>{" "}
                covers layout patterns in detail. For now, hold the hierarchy principle in mind
                as we go through each element.
              </p>
            </section>

            {/* Section 2 */}
            <section id="must-haves" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Must-haves: the non-negotiable five
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These belong in every professional email signature regardless of industry,
                seniority, or personal preference. If any of these is missing, your signature
                is incomplete.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">1. Full name</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Your full name, not a nickname and not just a first name. If you go by a
                    preferred name that differs from your legal name, that&rsquo;s fine — use the name
                    you&rsquo;d introduce yourself with professionally. Bold it slightly or use a
                    larger font size (14–16px) so it reads immediately.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">2. Job title</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Be specific. &ldquo;Marketing Manager&rdquo; tells someone more than &ldquo;Manager&rdquo;.
                    &ldquo;Senior Software Engineer, Platform Team&rdquo; is better than &ldquo;Software Engineer&rdquo;
                    if the team context helps. Avoid vanity titles like &ldquo;Chief Happiness Officer&rdquo;
                    unless that genuinely is your official role — these tend to undermine credibility
                    with people outside your company culture.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">3. Company name</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Link it to your company website. Plain text company names are a missed
                    opportunity — if someone is unfamiliar with your company, a clickable link
                    lets them learn more without having to Google it. If you&rsquo;re a freelancer, your
                    company name might just be your own name, which is fine.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">4. Phone number</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    One phone number only. If you have a direct line, use that over a main
                    switchboard. If you have both a mobile and an office line, pick the one where
                    you&rsquo;re most reliably reachable. Format it as a clickable{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">tel:</code>{" "}
                    link so mobile users can tap to call. Include your country code (+1, +44, etc.)
                    if you communicate internationally.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">5. Email address</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Yes, even though they already have it. Email addresses get lost when messages
                    are forwarded, printed, saved as PDFs, or quoted in other contexts. Your email
                    address in your signature means your contact info stays intact regardless of
                    how the email travels. Make it a{" "}
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">mailto:</code>{" "}
                    link so it&rsquo;s clickable on desktop too.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm text-blue-800">
                  <strong>Quick check:</strong> Open your current email signature. Does it have all five?
                  If yes, you have a functional signature. Everything from this point is about making
                  it better, not fixing something broken. You can build or update yours in the{" "}
                  <Link href="/editor" className="underline hover:no-underline">
                    NeatStamp editor
                  </Link>{" "}
                  free.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="should-haves" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Should-haves: strong additions for most people
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These elements add real value in most professional contexts. If you&rsquo;re unsure
                whether to include them, start with your industry and role — the section below
                on per-industry recommendations will make it clearer.
              </p>

              <div className="space-y-5">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">LinkedIn profile link</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    This is the closest thing to a universal &ldquo;should include&rdquo; outside the core
                    five. Most business recipients will visit your LinkedIn profile before or after
                    a meeting — giving them a direct link saves them the step of searching for you.
                    Link to your personal profile, not your company page. The{" "}
                    <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                      professional email signature guide
                    </Link>{" "}
                    has more on how to present this cleanly.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Company logo</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    A logo reinforces brand recognition and makes your signature look polished.
                    Keep it small — 150–200px wide, under 20KB file size. Use PNG with a transparent
                    background so it works on both light and dark email backgrounds. If you&rsquo;re a
                    solo freelancer with a complex logo, a clean wordmark often looks better in
                    the small format a signature allows. See the{" "}
                    <Link href="/email-signature-with-logo" className="text-blue-600 hover:underline">
                      email signature with logo guide
                    </Link>{" "}
                    for sizing specifics.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Website URL</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Your company website or personal portfolio. For most people this is already
                    covered by linking the company name — don&rsquo;t list the URL as separate text
                    unless it&rsquo;s a different URL from what you&rsquo;ve linked on the company name.
                    Freelancers and consultants should absolutely include their portfolio URL.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Headshot</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Particularly valuable in sales, consulting, real estate, coaching, and any
                    other role where building personal rapport matters. A small, professional photo
                    (80–100px square) helps recipients put a face to a name before a first meeting.
                    In technical, back-office, or traditionally conservative fields (corporate law,
                    investment banking) it can look out of place. Use your judgment based on what
                    others in your company do.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="nice-to-haves" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Nice-to-haves: situational extras
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These can add genuine value in specific situations. The question to ask before
                including any of them: &ldquo;Does this help the people I email most, or does it help
                me feel like I&rsquo;ve got a thorough signature?&rdquo; Be honest with the answer.
              </p>

              <div className="space-y-5">
                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-1">Calendly or booking link</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    If people regularly need to schedule time with you, a booking link eliminates
                    back-and-forth. Works well for consultants, salespeople, recruiters, and
                    anyone else whose work involves a lot of meetings. Not worth including if
                    you only occasionally need to book calls — in that case, just offer times in
                    the email body.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-1">Promotional banner</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A banner image below your signature is a low-friction way to promote a launch,
                    event, or piece of content to everyone you email. Keep it to 600px wide,
                    100–150px tall, and make sure it links somewhere useful. Rotate it when the
                    promotion changes. This is a Pro feature in NeatStamp — the{" "}
                    <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                      email signature best practices guide
                    </Link>{" "}
                    covers how to use banners without them feeling spammy.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-1">Pronouns</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Adding your pronouns (she/her, he/him, they/them, etc.) is a personal choice
                    and increasingly common in many workplaces. The main benefit is normalizing
                    the practice so that colleagues who need to share their pronouns don&rsquo;t feel
                    like they&rsquo;re the only ones doing it. Place pronouns directly after your name
                    or in a small, lighter-weight line below your title. The{" "}
                    <Link href="/email-signature-with-pronouns" className="text-blue-600 hover:underline">
                      guide to email signatures with pronouns
                    </Link>{" "}
                    shows formatting options.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-1">Credentials and certifications</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    In fields where credentials carry real weight — medicine, law, finance,
                    academia — listing your most relevant qualifications after your name or title
                    is expected and useful. Elsewhere, credentials can read as defensive rather
                    than informative. The rule of thumb: list credentials only if they&rsquo;re relevant
                    to the work you&rsquo;re doing with this person.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-1">Quotes</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Inspirational quotes are usually a mistake. They add length, rarely resonate
                    with every recipient, and can read as self-important. The exception: if
                    you&rsquo;re a speaker, author, or coach, a short quote (your own, not someone
                    else&rsquo;s) can reinforce what you stand for. The{" "}
                    <Link href="/email-signature-quotes" className="text-blue-600 hover:underline">
                      email signature quotes guide
                    </Link>{" "}
                    has examples of when quotes work and when they don&rsquo;t.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="leave-out" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to leave out
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                This list is more fun to write than the previous ones, because every item on
                it represents a real mistake I&rsquo;ve seen repeatedly.
              </p>

              <div className="space-y-4">
                {[
                  {
                    item: "Fax numbers",
                    reason:
                      "Unless you work in a field where fax is genuinely still used (some healthcare and legal contexts in certain countries), remove it. It looks dated and adds clutter.",
                  },
                  {
                    item: "Multiple phone numbers",
                    reason:
                      "Pick one. If you list a mobile, office, and direct line, recipients don't know which to use. You've added friction, not helpfulness. The number you list should be the one where you're most reliably reachable.",
                  },
                  {
                    item: "Inspirational quotes you didn't write",
                    reason:
                      "\"The only way to do great work is to love what you do\" was already tired when Steve Jobs said it. Quotes from other people in your signature communicate very little about you specifically.",
                  },
                  {
                    item: "Long legal disclaimers (if not required)",
                    reason:
                      "Boilerplate disclaimers like \"This email and any attachments are confidential\" have been tested in court many times and generally provide little actual protection. They make your signature longer and your emails less readable. If your compliance team requires one, it goes in — but don't add one voluntarily.",
                  },
                  {
                    item: "\"Sent from my iPhone\"",
                    reason:
                      "Turn this off. It's the single easiest signature fix available. It signals you care so little about your signature that you left the default on.",
                  },
                  {
                    item: "Eight social media icons",
                    reason:
                      "Two or three platforms maximum. Choose the ones where you're actually active and where it would be relevant for a professional contact to find you. A row of eight icons linking to accounts you haven't posted on in 14 months helps no one.",
                  },
                  {
                    item: "\"Please think before you print this email\"",
                    reason:
                      "Environmental guilt messages accomplish nothing except making your signature longer. Anyone who was going to print it will still print it.",
                  },
                  {
                    item: "Personal Instagram unless it's professionally relevant",
                    reason:
                      "Your personal Instagram is probably fine to leave out of work emails. If your Instagram is genuinely professional (you're a photographer, designer, or food blogger), it belongs. Otherwise, keep work and personal separate.",
                  },
                ].map((entry) => (
                  <div key={entry.item} className="flex gap-4">
                    <span className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center font-bold">
                      ✕
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{entry.item}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{entry.reason}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                If you&rsquo;re dealing with required legal disclaimers, the{" "}
                <Link href="/email-signature-disclaimer" className="text-blue-600 hover:underline">
                  email signature disclaimer guide
                </Link>{" "}
                covers how to handle them cleanly — including how to minimize their visual impact
                without removing them.
              </p>
            </section>

            {/* Section 6 */}
            <section id="how-many-lines" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How many lines (and why 4–6 is ideal)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Four to six lines is the most commonly cited best practice, and it holds up.
                Here&rsquo;s why that range makes sense.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Below four lines: you&rsquo;re probably missing something useful — either your title,
                a contact method, or your company. A two-line signature with just your name and
                email works for very casual contexts but reads as too minimal for most professional
                email.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                At four to six lines: you can fit name, title, company, phone, email, and one
                optional element (LinkedIn, website) without the signature visually overwhelming
                the email. This is the range where it feels intentional and complete.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Above six lines: you&rsquo;re starting to compete with the email content itself. A
                signature longer than the message looks odd. And on mobile, where emails are
                read in a constrained viewport, a long signature forces the reader to scroll
                through your contact details to get back to the thread.
              </p>

              <div className="bg-slate-50 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-3">Example: 5-line signature</p>
                <div className="font-mono text-sm text-slate-700 space-y-1">
                  <p className="font-bold">Alex Chen</p>
                  <p>Head of Product &middot; Acme Corp</p>
                  <p>+1 (415) 555-0123</p>
                  <p>alex@acmecorp.com</p>
                  <p>linkedin.com/in/alexchen</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                That&rsquo;s it. Five lines. Everything the recipient needs, nothing they don&rsquo;t.
                A logo could be added as a visual element alongside the text without adding a
                text line. A banner could go below without adding to the line count.
              </p>
            </section>

            {/* Section 7 */}
            <section id="character-count" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Character count and length limits
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Some email systems — particularly certain corporate Microsoft Exchange
                configurations — add a character limit to email signatures. The limit varies
                but is commonly around 10,000 characters of HTML. A well-designed signature
                should be well under this.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For plain text, keep your signature under 250 characters if you also send plain
                text versions of emails. Many email clients automatically generate a plain text
                version, and a signature that renders beautifully in HTML can look like a wall
                of tags in plain text. NeatStamp generates HTML signatures with clean, minimal
                code specifically to avoid this.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For subject lines and preview text: this doesn&rsquo;t apply directly, but it&rsquo;s
                worth knowing that some email clients show a preview of the first few lines of
                an email, and if your signature appears at the top (unusual but it happens on
                some reply threads), it will show up in that preview.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-amber-800 mb-2">Practical tip</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  If you work at a large company with Exchange or Outlook and your signature
                  keeps getting stripped or truncated, the likely culprit is an IT policy on
                  signature size. Ask your IT team about the limit. In the meantime, simplify
                  until you&rsquo;re under it.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="by-industry" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Recommendations by industry
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                The &ldquo;ideal&rdquo; signature varies significantly by field. Here are practical
                recommendations for the most common professional sectors.
              </p>

              <div className="space-y-5">
                {[
                  {
                    sector: "Legal",
                    include: "Full name with post-nominals (JD, Esq.), firm name, direct phone, email, bar admission if client-facing. Mandatory in many jurisdictions: firm registration number, registered address. Legal disclaimer required.",
                    exclude: "Headshot, social links beyond LinkedIn, promotional banners.",
                  },
                  {
                    sector: "Healthcare / Medicine",
                    include: "Name with credentials (MD, DO, NP), title, institution, department, direct line. HIPAA disclaimer required for US providers. Hospital or clinic website.",
                    exclude: "Personal social media, promotional content.",
                  },
                  {
                    sector: "Finance and Accounting",
                    include: "Name, credentials (CPA, CFA, CFP), firm, phone, email. Regulatory disclosures often required (FCA, SEC). Company registration info in many jurisdictions.",
                    exclude: "Headshot is uncommon in investment banking / larger firms. Limit to essential contact info.",
                  },
                  {
                    sector: "Sales and Business Development",
                    include: "Name, title, company, phone, email, LinkedIn. Consider a Calendly link, a brief value line, or a banner linking to a case study or current promotion.",
                    exclude: "Long disclaimers, too many social icons. Short is better here — the signature shouldn't dwarf a short prospecting email.",
                  },
                  {
                    sector: "Creative / Freelance / Design",
                    include: "Name, title or specialty, portfolio link, email, phone. Headshot works well. Instagram or Behance/Dribbble if professionally active.",
                    exclude: "Formal-looking corporate design. Let the signature reflect your aesthetic.",
                  },
                  {
                    sector: "Real Estate",
                    include: "Name, licence number (required in most regions), agency name and logo, mobile number, email, headshot. Link to current listings or recent sales page.",
                    exclude: "Multiple phone numbers. Keep it to one number — the one you actually answer.",
                  },
                  {
                    sector: "Technology / Startup",
                    include: "Name, title, company, email, LinkedIn. Keep it minimal. If recruiting, GitHub can be relevant for engineering roles.",
                    exclude: "Heavy design, too many elements. Minimal reads as confident in this sector.",
                  },
                  {
                    sector: "Academia",
                    include: "Name, highest degree and field (PhD, EdD), title, institution and department, office phone, email. ORCID ID if publishing. Lab or research group website.",
                    exclude: "Commercial-looking banners, personal social media.",
                  },
                ].map((industry) => (
                  <div key={industry.sector} className="bg-slate-50 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-3">{industry.sector}</h3>
                    <div className="space-y-2">
                      <div className="flex gap-2 text-sm">
                        <span className="text-green-600 font-medium flex-shrink-0">Include:</span>
                        <span className="text-slate-600">{industry.include}</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="text-red-500 font-medium flex-shrink-0">Skip:</span>
                        <span className="text-slate-600">{industry.exclude}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                For further reading on etiquette across different contexts, the{" "}
                <Link href="/blog/email-signature-etiquette" className="text-blue-600 hover:underline">
                  email signature etiquette guide
                </Link>{" "}
                is worth a look. Once you know what you want to include, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                will help you put it together cleanly — the free version covers everything in this guide.
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
                Ready to build yours?
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                You now know exactly what to include. Put it together in the NeatStamp editor
                — free, no account required.
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
