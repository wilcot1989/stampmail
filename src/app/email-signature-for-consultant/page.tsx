import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Consultants (2026)",
  description:
    "How consultants should handle email signatures across multiple clients, Calendly booking links, credentials, and thought leadership. With examples.",
  alternates: { canonical: "https://neatstamp.com/email-signature-for-consultant" },
};

const faqs = [
  {
    q: "Should a consultant have different email signatures for different clients?",
    a: "It depends on your engagement structure. If you're embedded enough in a client's organization that you've been given a client email address, use their signature format for that account — you're representing their brand in that context. If you're using your own email for all client relationships, one signature that represents your consultancy works fine. Where you do benefit from multiple signatures: one formal version for new business and proposals, one stripped-down version for familiar ongoing client relationships where the full contact block is redundant.",
  },
  {
    q: "Should consultants include a Calendly link in their email signature?",
    a: "Yes, almost always. Scheduling is one of the highest-friction activities in consulting — every round of 'when are you free?' emails wastes time on both sides. A Calendly link in your signature solves this entirely. Use a link that shows only the availability you want to share — don't give clients access to your entire calendar. 'Book a 30-min call' is the most useful framing. For engaged clients, 'Schedule a check-in' works. For new business context, 'Book a discovery call' sets the right expectation.",
  },
  {
    q: "What credentials should consultants list in their email signature?",
    a: "List credentials that are directly relevant to your practice area and that your clients would recognize. An HR consultant might list SHRM-SCP or PHR. A financial consultant might list CFA or CFP. An IT consultant might list CISSP or PMP. The test: would your target clients know what this abbreviation means? If yes, include it. If you'd have to explain it, it might not be earning its place in the signature. A maximum of two or three credential abbreviations is readable; more starts to look like alphabet soup.",
  },
  {
    q: "Should a consultant include a thought leadership link — a newsletter, blog, or podcast?",
    a: "Yes, if you have one that's current and high quality. A consultant who publishes a weekly newsletter, writes substantive articles, or has a podcast signals that they're genuinely expert, not just credentialed. A link to your best recent piece of content — 'Monthly newsletter: 3,000+ subscribers' or 'Recent article: The Hidden Costs of Scope Creep' — in your signature can be a meaningful client development touchpoint. The caveat: the content has to actually be good. Linking to a sparse LinkedIn presence with three posts doesn't accomplish this.",
  },
  {
    q: "How should an independent consultant handle their business name versus their personal name?",
    a: "If you've built a consultancy brand (Acme Strategy Group, Rivera Advisory), use that as your business name. If you operate primarily under your personal name (many solos do), that's your business name. The choice affects how you're perceived: a named consultancy suggests a practice with scale and permanence; a personal name suggests more individual, boutique engagement. Neither is wrong — it depends on the positioning you want. Whatever you choose, be consistent: same name in your signature, on your website, on invoices, and in your email address.",
  },
  {
    q: "What should a consultant NOT include in their email signature?",
    a: "Past client names without permission — listing current or former client names suggests you'll disclose other clients' names too, which is a confidentiality signal. Revenue claims ('Helped clients generate $50M+') belong on your website or proposal, not your daily email signature. Endorsement quotes — these belong in a proposal or on your website, not in an email footer. Rate information — never in a signature. And an excessive list of past employers, which turns the signature into a resume rather than contact information.",
  },
  {
    q: "Should independent consultants use a professional headshot in their signature?",
    a: "Yes, more than most professions. Consulting relationships are trust-based and often relationship-intensive. A professional headshot — good lighting, professional attire, genuine expression — creates a human connection in email that's worth having. Clients who see your face regularly in correspondence feel more connected to you as an advisor. Keep it 80×80px to 100×100px, circular crop is optional but increasingly common, and use a recent photo that looks like you actually look when you show up to meetings.",
  },
  {
    q: "How do firm-based consultants differ from independent consultants in their signature setup?",
    a: "Firm consultants (McKinsey, Deloitte, Big Four, boutique strategy firms) should follow their firm's signature standards — the firm's brand identity takes precedence, and there's usually an IT-mandated template. Personal portfolio links and Calendly aren't appropriate in a firm context. Independent consultants have full latitude and should use it: personal brand, booking links, thought leadership, professional headshot. The independence is part of your value proposition, and your signature can reflect that.",
  },
];

export default function EmailSignatureForConsultantPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature for Consultants",
            url: "https://neatstamp.com/email-signature-for-consultant",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signature for Consultants & Advisors
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Consultants live in their inboxes. Your email is often the primary touchpoint
              between you and your clients — between engagements, across time zones, and in
              the moments when your client is deciding whether to extend a contract or make
              a referral. Your signature is doing real work in every one of those emails.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build Your Consultant Signature — Free
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
            <p className="mt-3 text-sm text-muted">No account needed. Free forever for individuals.</p>
          </div>

          {/* Intro */}
          <section className="mb-16">
            <p className="text-muted leading-relaxed mb-4 text-lg">
              I've worked with independent consultants and advisors on their professional presence
              for years, and the email signature is one of the highest-impact, lowest-effort
              improvements most of them can make. Consultants send a lot of email, they send it
              to high-value audiences (clients, prospects, referral sources), and the signature
              appears in every single one of those emails. The compounding effect over months of
              client relationships is real.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The challenges specific to consulting are also real: managing multiple client
              contexts, deciding what credentials and certifications to display, and figuring
              out how much thought leadership content to include without the signature becoming
              a self-promotion billboard. The Calendly question comes up constantly — and for
              consultants, the answer is almost always yes.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              This guide is primarily for independent consultants and advisors. If you're at a
              consulting firm with a mandated signature format, the practical guidance here
              is less directly applicable — follow your firm's standards. For the freelance
              business angles, the
              {" "}<Link href="/email-signature-for-freelancers" className="text-primary underline underline-offset-2">freelancer signature guide</Link>{" "}
              has significant overlap and is worth reading alongside this one.
            </p>
            <p className="text-muted leading-relaxed">
              If your consulting practice serves primarily business clients, the
              {" "}<Link href="/email-signature-for-business" className="text-primary underline underline-offset-2">business email signature guide</Link>{" "}
              is also relevant — your clients are following those norms, and understanding them
              helps you calibrate your own.
            </p>
          </section>

          {/* What to include */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              What to include in your consultant email signature
            </h2>

            <div className="space-y-5">
              {[
                {
                  field: "Name and title",
                  required: "Always",
                  notes:
                    "'Independent Consultant,' 'Strategy Advisor,' 'HR Consultant,' 'Management Consultant,' 'Technology Advisor' — your title should communicate your practice area. If you work across multiple areas, pick the one most relevant to your primary clients. 'Consultant' alone is acceptable but generic; a specialty makes it immediately more useful.",
                },
                {
                  field: "Consultancy name",
                  required: "If you have one — yes",
                  notes:
                    "Your business name, or your personal name if you operate as a solo under your own name. Use the same name you use on contracts, invoices, and your website for consistency. For firm-based consultants, the firm name takes precedence over personal branding.",
                },
                {
                  field: "Relevant certifications",
                  required: "If recognized by your clients",
                  notes:
                    "PMP, CFA, CFP, SHRM-SCP, CISSP, CMC — list credentials your clients would recognize as meaningful. Two or three maximum. If the credential requires more context to be useful (your clients don't know what it means), it might not earn its place in the signature.",
                },
                {
                  field: "Professional website",
                  required: "Always",
                  notes:
                    "Your consultancy website is where clients find your full credentials, case studies, testimonials, and contact form. Make sure the site is current before linking — an outdated consulting site can undermine the professional impression your signature creates.",
                },
                {
                  field: "Calendly or booking link",
                  required: "Strongly recommended",
                  notes:
                    "A Calendly link in a consultant's signature is one of the highest-ROI additions you can make. It eliminates scheduling back-and-forth, signals organization and respect for time, and makes it frictionless for clients and prospects to move conversations forward. Set it up to show the availability you actually want to share.",
                },
                {
                  field: "Thought leadership link",
                  required: "If you have good content",
                  notes:
                    "A newsletter, podcast, article series, or research publication. Link to your most recent or best-performing piece. Keep it to one link — presenting multiple content links competes for attention. The link should be something you'd be proud to have any client see regardless of context.",
                },
                {
                  field: "Professional headshot",
                  required: "Recommended for independent consultants",
                  notes:
                    "Consulting relationships are personal and trust-based. A professional headshot in your signature reinforces the human relationship in email-heavy engagements. Use a photo that looks like you at client meetings.",
                },
                {
                  field: "LinkedIn",
                  required: "Recommended",
                  notes:
                    "Consultants' LinkedIn profiles are typically substantive — work history, endorsements, recommendations, and content. For a prospective client doing due diligence on you before engagement, your LinkedIn is often the first detailed credential check. Link to it if your profile is well-maintained.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{item.field}</h3>
                    <span className="text-xs font-medium text-primary bg-blue-50 px-2 py-0.5 rounded-full">
                      {item.required}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.notes}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Example */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Example consultant email signatures
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Here's an independent strategy consultant signature, and a specialized HR
              consultant version.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Independent strategy consultant</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-6 font-mono text-sm leading-relaxed">
                  <div className="text-foreground font-bold text-base">Priya Sharma</div>
                  <div className="text-muted">Strategy & Operations Consultant</div>
                  <div className="text-muted">Sharma Advisory</div>
                  <div className="text-muted mt-2">M: (617) 555-0183 | priya@sharmaadvisory.com</div>
                  <div className="text-primary">sharmaadvisory.com</div>
                  <div className="text-primary text-xs mt-1">LinkedIn | Newsletter (4,200 subscribers)</div>
                  <div className="text-xs text-primary mt-2">📅 Book a discovery call → cal.com/priyasharma</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">HR & talent consultant</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-6 font-mono text-sm leading-relaxed">
                  <div className="text-foreground font-bold text-base">Marcus Webb, SHRM-SCP, SPHR</div>
                  <div className="text-muted">HR & Organizational Development Consultant</div>
                  <div className="text-muted">Webb Talent Partners</div>
                  <div className="text-muted mt-2">D: (512) 555-0291</div>
                  <div className="text-primary">webbtalent.com</div>
                  <div className="text-xs text-primary mt-2">📅 30-min consultation → calendly.com/marcuswebb</div>
                  <div className="text-xs text-muted mt-1">Recent: "Why 70% of Performance Reviews Fail" →</div>
                </div>
              </div>
            </div>

            <p className="text-muted leading-relaxed mt-6">
              Notice what's not in either example: client names, revenue figures, or award badges.
              The credentials in Marcus's signature (SHRM-SCP, SPHR) are immediately recognized by
              his target audience — HR leaders — without needing explanation. Priya's newsletter
              subscriber count is a social proof signal that doesn't require the reader to know
              what the newsletter is about to understand its significance.
            </p>
          </section>

          {/* Tips */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Consultant-specific email signature tips
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Managing multiple client email contexts
                </h3>
                <p className="text-muted leading-relaxed mb-3">
                  If a client has given you an email address in their domain — you're embedded
                  enough for that — use their email format for correspondence related to that
                  engagement. You're acting as a member of their team in that context, and using
                  your own branded signature can feel out of place. Save your personal consultancy
                  signature for outbound new business, your own network, and correspondence where
                  you're clearly representing yourself rather than a client.
                </p>
                <p className="text-muted leading-relaxed">
                  For multiple independent clients all managed through your own email, one signature
                  works fine. You don't need to customize per client unless there's a specific reason
                  (you're making a formal proposal and want to match their aesthetic, for example).
                  The mistake is overthinking this — one good signature is better than five
                  context-specific ones you'll forget to switch between.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Thought leadership links: what earns a place in your signature
                </h3>
                <p className="text-muted leading-relaxed mb-3">
                  The bar for including a thought leadership link should be: "Would I be comfortable
                  if my most skeptical potential client followed this link right now?" If the answer
                  is yes, include it. If your newsletter has gone dark for six months, or your blog
                  has three posts, or your LinkedIn articles are generic — leave it out.
                </p>
                <p className="text-muted leading-relaxed">
                  What does earn a place: an active newsletter with a real subscriber base, a
                  podcast with recent episodes in your area of expertise, a substantive research
                  report or framework you've published, or a series of articles where you've
                  developed a genuine point of view. One well-chosen link is better than three
                  mediocre ones competing for attention.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  The Calendly setup that actually works
                </h3>
                <p className="text-muted leading-relaxed mb-3">
                  Many consultants I work with have Calendly but their setup undermines the
                  professional impression: every slot is open, including evenings and weekends,
                  there's no buffer between meetings, and the meeting type says "15 Minute Meeting"
                  which feels rushed for a consultancy context.
                </p>
                <p className="text-muted leading-relaxed">
                  Better setup: create a specific event type for your signature link — "Discovery
                  Call (30 min)" or "Advisor Check-in (45 min)" — with appropriate availability
                  (business hours, a buffer after each meeting, blocked-out days when you're at
                  capacity). The calendar link in your signature should take people to a professional,
                  appropriately scoped meeting type, not your raw availability.
                </p>
              </div>
            </div>
          </section>

          {/* Common mistakes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Common mistakes consultants make with email signatures
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: "Naming clients without permission",
                  why: "Some consultants list past clients in their signature as a credibility signal — 'Formerly: McKinsey, Google, Boeing.' Even if these relationships are public knowledge, including them in your email signature suggests you'll disclose other clients' names as well. This is a confidentiality signal your potential clients will notice. Client names belong in a proposal or on a website's case study page with permission — not in your daily email footer.",
                },
                {
                  mistake: "Too many CTAs competing for attention",
                  why: "A signature with a booking link, a newsletter subscribe link, a 'download my free guide' link, and a 'view my latest case study' link is presenting five decisions to the reader instead of one. Prioritize: usually the Calendly link is the primary CTA, and one secondary content link is the limit.",
                },
                {
                  mistake: "Inconsistent branding across touchpoints",
                  why: "If your email signature says 'Priya Sharma Consulting' but your website says 'Sharma Strategy Group' and your LinkedIn says 'Priya Sharma, Independent Consultant,' clients doing due diligence face confusion. Consistency in business name, professional title, and contact information across all platforms is a basic professionalism signal.",
                },
                {
                  mistake: "No website link",
                  why: "A consultant with no website link in their signature is missing a significant credibility asset. Your website is where clients verify your credentials, read case studies, and find social proof. Even a single-page site is better than nothing. If your website isn't ready yet, building it is a higher priority than perfecting your signature.",
                },
                {
                  mistake: "Stale thought leadership links",
                  why: "Linking to a newsletter that went dark in 2023 or a blog post from four years ago doesn't signal expertise — it signals that you started something and stopped. Either maintain the content channel or remove the link. Stale content can actively undermine the expert positioning you're trying to build.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-red-100 bg-red-50 p-5"
                >
                  <span className="text-red-500 text-lg font-bold flex-shrink-0 mt-0.5">✗</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.mistake}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to create */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to create your consultant email signature
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Open the <Link href="/editor" className="text-primary underline underline-offset-2">NeatStamp editor</Link> and
              choose a professional template with enough visual weight to match a consultancy context.
              Fill in your name, title, consultancy name, credentials, website, and Calendly link.
              Upload a professional headshot if you have one. Add your LinkedIn URL.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              If you have a thought leadership link worth including — newsletter, recent article —
              add it in the footer section with a brief descriptor: "Weekly newsletter: Strategy &
              Operations (4,000+ subscribers)." Keep secondary links visually subordinate to your
              primary contact information and booking link.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Build two versions if you manage multiple client contexts: one full signature for new
              business and external correspondence, and one minimal version for ongoing client threads
              where the full context block is redundant.
            </p>
            <Link
              href="/editor"
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow hover:bg-primary-dark transition-all"
            >
              Create Your Consultant Signature — Free
            </Link>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/email-signature-for-freelancers",
                  title: "Email Signature for Freelancers",
                  desc: "Overlapping guidance for independent practitioners.",
                },
                {
                  href: "/email-signature-for-business",
                  title: "Email Signature for Business",
                  desc: "Understanding the norms your business clients are operating by.",
                },
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature",
                  desc: "The complete framework for professional signatures.",
                },
                {
                  href: "/email-signature-with-logo",
                  title: "Email Signature with Logo",
                  desc: "Your consultancy logo — sizing, format, and placement.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Visual design principles for consultant signatures.",
                },
                {
                  href: "/email-signature-for-ceo",
                  title: "Email Signature for CEOs",
                  desc: "Relevant if your clients are executives or C-suite level.",
                },
                {
                  href: "/email-signature-for-lawyer",
                  title: "Email Signature for Lawyers",
                  desc: "For consultants who work with or within legal contexts.",
                },
                {
                  href: "/html-email-signature",
                  title: "HTML Email Signature Guide",
                  desc: "Technical guide to how email signatures are built.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-border bg-surface p-4 hover:border-primary hover:bg-white transition-colors"
                >
                  <div className="font-semibold text-foreground text-sm">{link.title}</div>
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
                  <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary p-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Build your consultant signature today
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Professional, booking-link-ready, and consistent across every client email.
              Free, no account required.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create Your Consultant Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
