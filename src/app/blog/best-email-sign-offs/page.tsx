import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Best Email Sign-Offs — 50+ Professional Options (2026)",
  description:
    "Formal, semi-formal, casual, and industry-specific sign-offs. Which to use, which to avoid, cultural differences, and a quick-reference table of 50+ options.",
  alternates: {
    canonical: "https://neatstamp.com/blog/best-email-sign-offs",
  },
};

const faqs = [
  {
    q: "What is the most professional email sign-off?",
    a: "For formal business emails, 'Kind regards' and 'Best regards' are the most universally appropriate. 'Regards' is clean and professional without being stiff. 'Sincerely' is safe but slightly dated in most contexts. The best choice depends on your relationship with the recipient — a close colleague gets 'Thanks' while a new executive contact gets 'Kind regards'.",
  },
  {
    q: "Is 'Best' too casual for professional emails?",
    a: "Not really. 'Best' has become the default professional sign-off in many industries, particularly in the US and in tech, consulting, and media. It reads as warm but professional. In very formal contexts (legal, senior government) or for a first contact, 'Kind regards' or 'Best regards' is safer. But for most modern business correspondence, 'Best' is fine.",
  },
  {
    q: "What email sign-offs should I avoid at work?",
    a: "Avoid anything overly casual that doesn't match the relationship ('Thx', 'XOXO', 'Later'), anything religious or spiritually loaded in a business context ('Blessings', 'In His grace'), and anything that sounds like an automated system ('Regards,' with no other context). Also avoid 'Warmly' for cold outreach — it's presumptuous.",
  },
  {
    q: "Is 'Cheers' professional?",
    a: "In the UK and Australia, 'Cheers' is widely used in professional contexts — it's informal but not inappropriately so. In the US, it reads as notably British and can feel slightly affected. If you're emailing within the UK or Australia, it's fine for most non-formal correspondence. For cross-cultural communication, 'Thanks' or 'Kind regards' is safer.",
  },
  {
    q: "Should my sign-off match my email signature?",
    a: "They serve different purposes, but they should feel consistent in tone. A formal sign-off ('Yours sincerely') paired with a casual, first-name-only signature looks mismatched. Your sign-off is the closing sentiment; your signature is the contact card. Make sure the formality level is roughly the same across both.",
  },
];

export default function BestEmailSignOffsPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Best Email Sign-Offs",
            url: "https://neatstamp.com/blog/best-email-sign-offs",
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
            <span className="text-slate-700">Best Email Sign-Offs</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Writing
                </span>
                <span className="text-sm text-slate-400">15 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Best Email Sign-Offs — 50+ Professional Options (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Your sign-off is the last thing someone reads before they see your name and
                contact details. Most people pick one phrase and use it forever, without
                thinking much about whether it fits the context. This guide covers every
                option worth knowing — formal, casual, industry-specific, and cultural
                differences — so you can make an informed choice rather than a habitual one.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 15 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#quick-reference", "Quick-reference table"],
                  ["#formal", "Formal sign-offs"],
                  ["#semi-formal", "Semi-formal sign-offs"],
                  ["#casual", "Casual sign-offs"],
                  ["#industry-specific", "Industry-specific options"],
                  ["#avoid", "Sign-offs to avoid at work"],
                  ["#cultural-differences", "Cultural differences: UK vs US vs Australia"],
                  ["#best-vs-regards", "Best vs Regards vs Thanks — when to use each"],
                  ["#pairing-with-signature", "Pairing your sign-off with your signature"],
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

            {/* Quick Reference */}
            <section id="quick-reference" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Quick-reference table
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                If you just need a fast answer, this table covers the most commonly used
                sign-offs, what they signal, and when to use them. The full breakdowns
                follow below.
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Sign-off</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Tone</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Use when</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { signoff: "Yours sincerely", tone: "Very formal", use: "Letters/emails where you know the recipient's name (formal correspondence)" },
                      { signoff: "Yours faithfully", tone: "Very formal", use: "Letters starting 'Dear Sir/Madam' where you don't know the name" },
                      { signoff: "Sincerely", tone: "Formal", use: "US formal business correspondence, cover letters, complaints" },
                      { signoff: "Respectfully", tone: "Formal", use: "Legal, government, senior officials, military" },
                      { signoff: "Kind regards", tone: "Formal-professional", use: "First contact with clients, senior contacts, formal requests" },
                      { signoff: "Best regards", tone: "Professional", use: "General professional emails, safe for most contexts" },
                      { signoff: "Warm regards", tone: "Professional-warm", use: "Ongoing client relationships, mentors, known contacts" },
                      { signoff: "Regards", tone: "Neutral-professional", use: "Direct, no-nonsense professional email" },
                      { signoff: "Best", tone: "Modern professional", use: "Most professional emails in US, tech, media, consulting" },
                      { signoff: "Many thanks", tone: "Professional-warm", use: "When you genuinely appreciate something they've done" },
                      { signoff: "Thanks", tone: "Semi-formal", use: "Quick replies, internal emails, known contacts" },
                      { signoff: "Thank you", tone: "Semi-formal", use: "More complete than 'Thanks', appropriate for requests granted" },
                      { signoff: "Cheers", tone: "Casual-professional", use: "UK/Australia: most professional emails. US: informal only" },
                      { signoff: "Talk soon", tone: "Casual", use: "Ongoing conversations, people you work with regularly" },
                      { signoff: "Speak soon", tone: "Casual", use: "UK equivalent of 'Talk soon'" },
                      { signoff: "All the best", tone: "Warm-casual", use: "Friendly sign-off for known contacts" },
                      { signoff: "Take care", tone: "Warm", use: "Closing a longer exchange, someone going through something difficult" },
                    ].map((row) => (
                      <tr key={row.signoff}>
                        <td className="py-3 px-4 font-semibold text-slate-900">{row.signoff}</td>
                        <td className="py-3 px-4 text-slate-500 text-xs">{row.tone}</td>
                        <td className="py-3 px-4 text-slate-600">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Formal */}
            <section id="formal" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Formal sign-offs
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Formal sign-offs are for situations where the relationship is new,
                the stakes are high, or the context demands deference — job applications,
                legal correspondence, initial contact with very senior people, complaints,
                and any communication that might be read by more than one person or
                forwarded up a chain.
              </p>

              <div className="space-y-5 mb-6">
                {[
                  {
                    signoff: "Yours sincerely",
                    when: "Traditional business letters and formal emails where you address the recipient by name ('Dear Mr Davies'). More common in UK and Commonwealth countries than the US.",
                    notes: "Technically there's a rule from letter-writing: 'Yours sincerely' when you know the name, 'Yours faithfully' when you're writing to 'Dear Sir/Madam'. Most people have abandoned this distinction in email — but if you're writing in a very traditional formal context (law, government), it's worth knowing.",
                  },
                  {
                    signoff: "Sincerely",
                    when: "US formal business correspondence. The standard choice for cover letters, complaint letters, and any email that needs to feel official.",
                    notes: "Feels slightly stiff in casual contexts but is bulletproof for formal use. Nobody has ever been offended by 'Sincerely'.",
                  },
                  {
                    signoff: "Respectfully",
                    when: "Communications with government officials, elected representatives, judges, military superiors, or anyone in a position of formal authority where deference is appropriate.",
                    notes: "Overused in casual professional emails, where it reads as obsequious. Reserve it for genuinely formal authority contexts.",
                  },
                  {
                    signoff: "Respectfully submitted",
                    when: "Legal filings, formal petitions, anything being submitted to an official body.",
                    notes: "This is for documents and formal submissions, not regular emails.",
                  },
                ].map((item) => (
                  <div key={item.signoff} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-bold text-slate-900 text-base mb-2">
                      &ldquo;{item.signoff}&rdquo;
                    </h3>
                    <p className="text-sm text-slate-700 mb-2">
                      <strong>When:</strong> {item.when}
                    </p>
                    <p className="text-sm text-slate-500 italic">{item.notes}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Semi-formal */}
            <section id="semi-formal" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Semi-formal sign-offs
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Semi-formal is where most professional email lives. These sign-offs are
                appropriate for the vast majority of business correspondence — new client
                contacts, external partners, stakeholders you know but aren&rsquo;t close to,
                and most outbound professional email.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                In my experience, this is also where the most confusion happens, because
                the differences between options like &ldquo;Kind regards,&rdquo; &ldquo;Best regards,&rdquo; and
                just &ldquo;Regards&rdquo; are subtle but real. More on those distinctions in the
                dedicated section below.
              </p>

              <div className="space-y-5 mb-6">
                {[
                  {
                    signoff: "Kind regards",
                    when: "First contact with external clients, senior contacts, anyone you're asking a favour of, and any context where you want to be professional without being stiff.",
                    notes: "The safest semi-formal option. It's warm enough to signal goodwill without being presumptuous. Widely used in the UK and becoming more common in the US.",
                  },
                  {
                    signoff: "Best regards",
                    when: "General professional email. Slightly more formal than 'Best' alone. Good for industries that err on the formal side.",
                    notes: "A solid, neutral choice. Works across cultures and contexts. Some people find it slightly robotic after years of use, which is why 'Kind regards' has overtaken it in many circles.",
                  },
                  {
                    signoff: "Warm regards",
                    when: "Ongoing client relationships, mentors, colleagues you have a genuine rapport with, or any situation where you want to acknowledge the human side of the professional relationship.",
                    notes: "More personal than 'Kind regards'. Don't use it for cold outreach — it implies familiarity you haven't earned yet.",
                  },
                  {
                    signoff: "Regards",
                    when: "Direct, no-nonsense professional emails. Works well for internal communications, follow-ups, and straightforward requests.",
                    notes: "Some people read 'Regards' as slightly cold compared to 'Kind regards'. In practice, it's neutral. Worth knowing that some recipients will notice the difference between 'Regards' and 'Kind regards' in a tense exchange.",
                  },
                  {
                    signoff: "Many thanks",
                    when: "When you're genuinely thanking someone — they helped you, sent you something, or did something you appreciated.",
                    notes: "More emphatic than plain 'Thanks'. Feels genuine if you actually mean it; can feel performative if you use it for routine acknowledgments.",
                  },
                  {
                    signoff: "With appreciation",
                    when: "When you want to acknowledge significant help or support in a more formal register than 'Thanks'.",
                    notes: "Less common but perfectly appropriate for situations where someone went out of their way for you.",
                  },
                ].map((item) => (
                  <div key={item.signoff} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-bold text-slate-900 text-base mb-2">
                      &ldquo;{item.signoff}&rdquo;
                    </h3>
                    <p className="text-sm text-slate-700 mb-2">
                      <strong>When:</strong> {item.when}
                    </p>
                    <p className="text-sm text-slate-500 italic">{item.notes}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Casual */}
            <section id="casual" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Casual sign-offs
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Casual sign-offs are for people you work with regularly, internal colleagues,
                and any context where formality would feel out of place. They still need to
                be appropriate for a professional environment — just not stiff.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { signoff: "Best", notes: "The most common modern professional sign-off in the US. Short, warm, unfussy. Works for almost everything that doesn't require formality." },
                  { signoff: "Thanks", notes: "Works whenever you're asking for something or wrapping up an action item. Simple and direct. Don't use it if you're not actually thanking them for anything." },
                  { signoff: "Thank you", notes: "Slightly more complete than 'Thanks'. Good for when someone has done something concrete that you're acknowledging." },
                  { signoff: "Cheers", notes: "Standard in the UK and Australia. Casual but professional in those contexts. Use carefully in the US where it reads as British affectation." },
                  { signoff: "Talk soon", notes: "Good for closing a thread where you expect to speak again shortly. Makes the sign-off feel less final." },
                  { signoff: "Speak soon", notes: "UK equivalent of 'Talk soon'. Both imply the conversation will continue." },
                  { signoff: "All the best", notes: "Warm and friendly. Good for closing an email that doesn't need to continue, with someone you have a good relationship with." },
                  { signoff: "Take care", notes: "Slightly warmer than 'All the best'. Can feel appropriate when someone has mentioned a difficult personal situation." },
                  { signoff: "Have a great week", notes: "Contextual — works on a Monday or Tuesday. Feels strange on a Thursday afternoon." },
                  { signoff: "Looking forward to it", notes: "Use only when there's something specific you're both looking forward to — a meeting, a project, a call." },
                ].map((item) => (
                  <div key={item.signoff} className="bg-slate-50 rounded-xl p-4">
                    <p className="font-semibold text-slate-900 mb-1">&ldquo;{item.signoff}&rdquo;</p>
                    <p className="text-sm text-slate-600">{item.notes}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Industry-specific */}
            <section id="industry-specific" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Industry-specific options
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Some fields have conventions around sign-offs that aren&rsquo;t obvious unless
                you&rsquo;ve worked in them. Here&rsquo;s what I&rsquo;ve seen actually used across different sectors.
              </p>

              <div className="space-y-6 mb-6">
                {[
                  {
                    sector: "Legal",
                    options: ["Yours faithfully (formal letters)", "Kind regards (most correspondence)", "Yours sincerely (when addressing by name)", "With thanks (for quick replies)"],
                    avoid: "Never 'Cheers' or 'Best' in formal client correspondence. Some firms have a house style — check what senior partners use.",
                  },
                  {
                    sector: "Medical / Healthcare",
                    options: ["Kind regards", "Best regards", "Yours sincerely (patient letters)", "With kind regards"],
                    avoid: "Casual sign-offs in patient-facing communication feel out of place and can undermine trust. Stick to professional options.",
                  },
                  {
                    sector: "Academic",
                    options: ["Best wishes", "Kind regards", "Thanks", "Best (in US academia)", "With many thanks (for significant assistance)"],
                    avoid: "Academic culture varies by institution and country. US academia skews casual ('Best', 'Thanks'). UK academia is often more formal ('Kind regards', 'Best wishes').",
                  },
                  {
                    sector: "Creative / Agency",
                    options: ["Thanks!", "Cheers", "Best", "Talk soon", "Excited to hear your thoughts"],
                    avoid: "Overly formal sign-offs can feel incongruent in creative environments. Match the energy of the relationship and the brief.",
                  },
                  {
                    sector: "Sales and Business Development",
                    options: ["Best regards (cold outreach)", "Thanks (follow-ups)", "Looking forward to connecting", "Looking forward to hearing from you"],
                    avoid: "Don't use 'Warmly' or 'Warm regards' in cold outreach — it implies familiarity you don't have. 'Best regards' is safer for first contact.",
                  },
                  {
                    sector: "Finance and Banking",
                    options: ["Kind regards", "Best regards", "Regards", "Yours sincerely (formal)"],
                    avoid: "This sector skews formal. 'Cheers' and 'Best' are fine internally but can feel out of place in client communication, depending on the institution.",
                  },
                ].map((item) => (
                  <div key={item.sector} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-3">{item.sector}</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Works well</p>
                        <ul className="space-y-1">
                          {item.options.map((opt) => (
                            <li key={opt} className="text-sm text-slate-600 flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                              {opt}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Notes</p>
                        <p className="text-sm text-slate-500 italic">{item.avoid}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Avoid */}
            <section id="avoid" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Sign-offs to avoid at work
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                These range from genuinely problematic to just mildly awkward. Some are
                fine in personal email — just not in professional contexts.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    signoff: "Thx / Rgds / Thnx",
                    problem: "Text abbreviations in professional email signal that you couldn't be bothered to type two more characters. It reads as dismissive. The full word is four letters. Use it.",
                  },
                  {
                    signoff: "XOXO",
                    problem: "Romantic and personal. Not for professional email under any circumstances.",
                  },
                  {
                    signoff: "Blessings / Blessed",
                    problem: "Religious language in a business context can make recipients uncomfortable, regardless of your own beliefs. It introduces an implicit personal framework that not everyone shares.",
                  },
                  {
                    signoff: "Namaste",
                    problem: "Culturally specific in a way that can feel affected or performative outside of contexts where it's genuinely appropriate. Stick to conventional professional options in most business email.",
                  },
                  {
                    signoff: "Peace / Peace out",
                    problem: "Casual to the point of being out of place in any professional context unless you're 100% sure your recipient will read it the way you intend.",
                  },
                  {
                    signoff: "Yours truly",
                    problem: "Technically fine, but sounds like a 19th-century letter. Most recipients will find it oddly formal or humorously antiquated. Stick to 'Sincerely' or 'Kind regards' for formal correspondence.",
                  },
                  {
                    signoff: "Warmly (in cold outreach)",
                    problem: "'Warmly' implies an established relationship. Using it in a cold email — one where the recipient doesn't know you yet — is presumptuous. Save it for people who actually know you.",
                  },
                  {
                    signoff: "Looking forward to your prompt response",
                    problem: "Reads as passive-aggressive pressure. If something is genuinely urgent, say so explicitly in the body of the email. The sign-off shouldn't do that work.",
                  },
                  {
                    signoff: "Sent from my iPhone (left in by default)",
                    problem: "This isn't technically a sign-off, but it belongs here because it's so commonly left in. It implies you didn't customise your email at all. Turn it off in Settings.",
                  },
                ].map((item) => (
                  <div
                    key={item.signoff}
                    className="border border-red-100 bg-red-50 rounded-xl p-5"
                  >
                    <p className="font-bold text-red-900 mb-1">&ldquo;{item.signoff}&rdquo;</p>
                    <p className="text-sm text-red-700">{item.problem}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cultural differences */}
            <section id="cultural-differences" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Cultural differences: UK vs US vs Australia
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Sign-off conventions vary meaningfully between English-speaking countries.
                What reads as normal in London can feel oddly formal in San Francisco, and
                what&rsquo;s breezy in Sydney might raise eyebrows in a New York law firm.
              </p>

              <div className="space-y-5 mb-6">
                {[
                  {
                    country: "United Kingdom",
                    flag: "🇬🇧",
                    norms: "UK professional email tends to be slightly more formal than equivalent US email. 'Kind regards' is the workhorse of British professional correspondence. 'Cheers' is widely used internally and in established relationships — it's professional-casual rather than unprofessional. 'Best wishes' is common for warmer sign-offs. 'Yours sincerely' and 'Yours faithfully' are still used in formal letters.",
                    typical: ["Kind regards", "Best regards", "Cheers", "Many thanks", "Best wishes"],
                  },
                  {
                    country: "United States",
                    flag: "🇺🇸",
                    norms: "US professional email is generally less formal than UK equivalents. 'Best' has become the dominant default across industries. 'Regards' is common in finance and law. 'Thanks' is used widely, even in relatively formal contexts. 'Cheers' is used but can read as affectedly British. 'Sincerely' is for formal correspondence only.",
                    typical: ["Best", "Thanks", "Best regards", "Regards", "Sincerely (formal only)"],
                  },
                  {
                    country: "Australia",
                    flag: "🇦🇺",
                    norms: "Australian professional culture skews informal. 'Cheers' is more common in Australian professional email than in the UK, and significantly more common than in the US. 'Thanks' and 'Kind regards' are both normal. The overall tone of Australian business email tends to be direct and conversational — overly formal sign-offs can read as stiff.",
                    typical: ["Cheers", "Thanks", "Kind regards", "Best regards", "All the best"],
                  },
                ].map((item) => (
                  <div key={item.country} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <span>{item.flag}</span>
                      <span>{item.country}</span>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.norms}</p>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        Typical sign-offs
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.typical.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                For cross-cultural professional email, &ldquo;Kind regards&rdquo; and &ldquo;Best regards&rdquo;
                are the safest choices — they read as professional in all three contexts
                without any cultural ambiguity. Also worth reading: the{" "}
                <Link
                  href="/blog/email-signature-etiquette"
                  className="text-blue-600 hover:underline"
                >
                  email signature etiquette guide
                </Link>{" "}
                covers how cultural differences affect the whole signature, not just the
                sign-off.
              </p>
            </section>

            {/* Best vs Regards vs Thanks */}
            <section id="best-vs-regards" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                &ldquo;Best&rdquo; vs &ldquo;Regards&rdquo; vs &ldquo;Thanks&rdquo; — when to use each
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                These three are the most common professional sign-offs, and the choice
                between them matters more than most people think. Here&rsquo;s the practical
                breakdown.
              </p>

              <div className="space-y-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h3 className="font-bold text-blue-900 mb-2">&ldquo;Best&rdquo;</h3>
                  <p className="text-sm text-blue-800 leading-relaxed mb-3">
                    &ldquo;Best&rdquo; is short for &ldquo;Best wishes&rdquo; or &ldquo;All the best.&rdquo; It&rsquo;s warm without being
                    effusive, professional without being stiff. It&rsquo;s the most common sign-off
                    in modern US professional email and is gaining ground in the UK and Australia.
                  </p>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Use &ldquo;Best&rdquo; for: most professional emails in established relationships,
                    ongoing correspondence, and any context where you want to seem approachable
                    without being casual. Avoid it for: initial contact with very senior people
                    in formal industries, or anywhere that formality is expected.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 mb-2">&ldquo;Regards&rdquo; / &ldquo;Kind regards&rdquo; / &ldquo;Best regards&rdquo;</h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    The &ldquo;regards&rdquo; family is the semi-formal backbone of professional email. Each
                    variant signals a slightly different level of warmth: &ldquo;Regards&rdquo; is neutral,
                    &ldquo;Best regards&rdquo; is slightly warmer, &ldquo;Kind regards&rdquo; is warmer still.
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Use &ldquo;Kind regards&rdquo; for first contact with clients or senior contacts where
                    you want to signal goodwill. Use &ldquo;Best regards&rdquo; for general professional
                    correspondence. Use &ldquo;Regards&rdquo; alone when you want to be direct and
                    professional without additional warmth — it can occasionally read as slightly
                    cold, so reserve it for neutral-to-direct contexts.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-bold text-green-900 mb-2">&ldquo;Thanks&rdquo; / &ldquo;Thank you&rdquo;</h3>
                  <p className="text-sm text-green-800 leading-relaxed mb-3">
                    &ldquo;Thanks&rdquo; is the most functional sign-off in the set. It works best when
                    you&rsquo;re actually thanking someone — for a reply, a favour, an introduction.
                    It&rsquo;s slightly odd when you&rsquo;re not thanking them for anything, like when you&rsquo;re
                    sending them new information or making a request.
                  </p>
                  <p className="text-sm text-green-800 leading-relaxed">
                    Use &ldquo;Thanks&rdquo; for: replies to someone who helped you, requests where you&rsquo;re
                    anticipating their help, and internal emails where brevity is appropriate.
                    &ldquo;Thank you&rdquo; is slightly more formal and complete — better for genuine
                    gratitude, worse for perfunctory closes.
                  </p>
                </div>
              </div>
            </section>

            {/* Pairing with signature */}
            <section id="pairing-with-signature" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Pairing your sign-off with your signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your sign-off and your email signature together create the close of every
                email you send. They should feel consistent — the same general level of
                formality, the same general tone.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                A few combinations that work well:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    signoff: "Kind regards,",
                    sig: "Sarah Chen\nHead of Client Success, Meridian Consulting\n+44 7700 900234 | sarah@meridianconsulting.com\nlinkedin.com/in/sarahchen",
                    label: "Formal-professional",
                    match: "Consistent: the sign-off and signature are both professional and clear.",
                  },
                  {
                    signoff: "Best,",
                    sig: "Marcus\nProduct Lead, Tangent",
                    label: "Modern-casual-professional",
                    match: "Works: the brevity of 'Best' matches the stripped-down signature.",
                  },
                  {
                    signoff: "Thanks,",
                    sig: "Priya",
                    label: "Internal/quick reply",
                    match: "Fine for internal quick replies where full context already exists in the thread.",
                  },
                ].map((item) => (
                  <div key={item.label} className="border border-slate-200 rounded-xl p-5">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.label}</span>
                    <div className="mt-3 font-mono text-sm bg-slate-50 rounded-lg p-4 whitespace-pre-line text-slate-700">
                      {item.signoff}
                      {"\n\n"}
                      {item.sig}
                    </div>
                    <p className="text-sm text-slate-500 mt-3 italic">{item.match}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The part that trips people up most often is using a very formal sign-off
                with a casual, minimal signature — or the reverse, a breezy &ldquo;Cheers&rdquo; with
                a heavily formal signature block. It&rsquo;s not a hard rule, but the inconsistency
                is noticeable.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re building or updating your signature, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                is free and generates clean, client-compatible HTML. The{" "}
                <Link
                  href="/professional-email-signature"
                  className="text-blue-600 hover:underline"
                >
                  professional email signature guide
                </Link>{" "}
                covers what belongs in the signature itself, and the{" "}
                <Link
                  href="/email-signature-for-business"
                  className="text-blue-600 hover:underline"
                >
                  business email signature guide
                </Link>{" "}
                has examples by industry. For quotes in signatures (different from sign-offs),
                the{" "}
                <Link
                  href="/email-signature-quotes"
                  className="text-blue-600 hover:underline"
                >
                  email signature quotes guide
                </Link>{" "}
                is worth a read. And the{" "}
                <Link
                  href="/blog/email-signature-best-practices"
                  className="text-blue-600 hover:underline"
                >
                  email signature best practices guide
                </Link>{" "}
                pulls everything together.
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
                Now build the signature that goes with your sign-off
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                A great sign-off deserves a great signature. Build yours free in about
                60 seconds — no account required.
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
