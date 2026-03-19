import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Freelancers — Stand Out & Win Clients | NeatStamp",
  description:
    "Your email signature is your business card. What to include as a freelancer, how to build trust, and real examples that win clients.",
  alternates: { canonical: "https://neatstamp.com/email-signature-for-freelancers" },
};

const faqs = [
  {
    q: "Should I use my personal name or a business name in my freelance signature?",
    a: "Both can work, but the right choice depends on how you're positioning yourself. If you've registered a business name (e.g., 'Bright Copy Studio'), use it — it reads as more established. If you're operating entirely under your personal name and haven't built a brand around a business identity, then using your name is more honest and often warmer. What you should avoid is using a vague placeholder like 'Freelance Writer' with no company name — it reads as someone who hasn't thought about their positioning.",
  },
  {
    q: "Should I include a photo in my freelance email signature?",
    a: "Generally, yes — especially if your work involves direct client communication, ongoing relationships, or anything where trust and personality matter. A small headshot (80×80px, circular if you like) humanizes your emails and helps clients remember who they're talking to. Use the same photo you have on your LinkedIn and website so there's visual consistency across touchpoints.",
  },
  {
    q: "How many portfolio links should I include?",
    a: "One — your portfolio site or a curated 'best work' page. Don't list three different platforms (Behance, Dribbble, a personal site). Pick the one that best represents your work and link to that. If you work in different disciplines, link to a page that shows the most relevant work for the client you're emailing.",
  },
  {
    q: "Is it professional to include a Calendly link in a freelance signature?",
    a: "Yes, and it's increasingly standard. A Calendly link removes the back-and-forth of scheduling and signals that you're organized and respect your own time. Use a tool like Calendly's 15-minute or 30-minute booking option specifically labeled for initial calls, rather than just your main availability calendar.",
  },
  {
    q: "Should I include my hourly rate or pricing in my signature?",
    a: "No. Pricing belongs in a proposal or a conversation, not a signature. Including rates in your signature pre-qualifies prospects in a way that often does more harm than good — you want them to have a conversation with you first.",
  },
  {
    q: "Can I have different signatures for different clients?",
    a: "Yes, and it's a good idea. Most email clients support multiple signatures. Create a 'default' signature for general use, and a variation for clients in specific industries or at specific stages of the relationship. For example, a signature for cold outreach might include your Calendly link and a recent project highlight; one for ongoing clients might be simpler with just name and contact info.",
  },
  {
    q: "What's the biggest mistake freelancers make with email signatures?",
    a: "Either extreme: the bare-bones three-line signature that gives no context about who you are, or the over-stuffed signature with five links, a motivational quote, a list of skills, and a banner image. The sweet spot is confident and specific: your name, your role or specialty, one clear link, and one optional CTA. Professional appearance without clutter.",
  },
];

export default function EmailSignatureForFreelancersPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature for Freelancers",
            url: "https://neatstamp.com/email-signature-for-freelancers",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signature for Freelancers
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              As a freelancer, your email signature is the closest thing you have to a business
              card that people actually see. Here's how to make it work for you rather than
              just sitting there at the bottom of every message.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build My Freelance Signature — Free
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
            <p className="mt-3 text-sm text-muted">No account needed. Takes about 3 minutes.</p>
          </div>

          {/* Your signature is your business card */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Your signature is the business card that actually gets seen
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-lg">
              When was the last time a client looked at your business card? Now think about
              how many emails you've sent in the past week. Every single one of those emails
              carries an impression of who you are as a professional — and that impression
              starts before they open the email and ends after they read your signature.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Most freelancers drastically underinvest in their signatures. They either use
              plain text (just a name and maybe a phone number), or they throw everything
              in at once — a list of every skill they have, links to four different platforms,
              a quote, and an outdated banner image. Neither approach is doing the work it
              could be.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              A well-built freelance email signature does three specific things. First, it
              establishes credibility — the person receiving your email gets a clear sense
              of who you are and what you do within two seconds. Second, it makes it easy
              to take action — whether that's viewing your work, booking a call, or finding
              your LinkedIn profile. Third, it's consistent — the same visual identity
              shows up in every email, which builds recognition over time.
            </p>
            <p className="text-muted leading-relaxed">
              None of that requires a complex signature. In fact, the best freelance signatures
              are quite short. But they're specific about what you do and who you are, and
              they make the next step obvious.
            </p>
          </section>

          {/* What to include */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              What to include in your freelance email signature
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Think of your signature as a response to the question: "Who is this person and
              how do I find out more?" Here's each element and how to think about it.
            </p>

            <div className="space-y-5">
              {[
                {
                  element: "Your name",
                  include: "Always",
                  note: "Use the name you use professionally. If you go by a nickname, use it. Bold it — it's your primary identifier. If you've named your freelance business, include it below your name (e.g., 'Kat Sullivan / Sullivan Copy').",
                },
                {
                  element: "Your specialty or role",
                  include: "Always",
                  note: "Be specific. 'Freelance Writer' tells people very little. 'B2B SaaS Copywriter' or 'UX Designer for e-commerce brands' is immediately more useful and positions you. This one line is prime real estate for communicating your niche.",
                },
                {
                  element: "Portfolio link",
                  include: "Always",
                  note: "One link to your best work. Your personal website is ideal. If you don't have one, a curated Behance, Dribbble, or Notion portfolio page works. Make the link text descriptive — 'view my portfolio' rather than just the raw URL.",
                },
                {
                  element: "Calendly or booking link",
                  include: "Strongly recommended",
                  note: "This is the highest-converting element in a freelance signature. A 'Book a 20-minute call' link removes friction from the decision to hire you. Even if only one in twenty clients clicks it, that's one less email thread negotiating availability.",
                },
                {
                  element: "LinkedIn profile",
                  include: "Recommended",
                  note: "Your LinkedIn profile is a form of social proof — it shows endorsements, recommendations, past work history, and a more complete picture of who you are. Include it if your profile is up to date and reflects your current positioning.",
                },
                {
                  element: "Headshot",
                  include: "Recommended for most freelancers",
                  note: "A small, professional headshot (80×80px) humanizes your emails and helps clients remember you. Use the same photo as your LinkedIn and website. Avoid casual photos — a plain or blurred background works best.",
                },
                {
                  element: "Phone number",
                  include: "Optional",
                  note: "Include it if clients regularly call you, or if you work in industries where phone communication is common (law, finance, real estate). For fully remote freelancers who work async, a phone number is often unnecessary.",
                },
                {
                  element: "Current project highlight",
                  include: "Optional, rotate regularly",
                  note: "A brief one-line CTA linking to a recent project or case study — 'Just finished: brand refresh for Acme Corp →' — is an effective way to signal active work. Update it every month or two, or remove it if you forget.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{item.element}</h3>
                    <span className="text-xs font-medium text-primary bg-blue-50 px-2 py-0.5 rounded-full">
                      {item.include}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real examples */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Real freelance email signature examples
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Here's what well-structured signatures look like for different types of freelancers,
              and why each element earns its place.
            </p>

            <div className="space-y-10">

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Freelance copywriter</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Kat Sullivan</div>
                  <div className="text-muted">B2B SaaS Copywriter</div>
                  <div className="text-primary">katsullivan.co | LinkedIn</div>
                  <div className="mt-2 text-xs text-primary">📅 Book a 20-min intro call →</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Notice how "B2B SaaS Copywriter" immediately communicates the niche — a
                  SaaS company reading this knows exactly whether she's relevant. The Calendly
                  link makes it trivially easy to take the next step. Clean and specific.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Freelance designer</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Marcus Webb</div>
                  <div className="text-muted">Brand & UI Designer | Webb Studio</div>
                  <div className="text-muted">webbstudio.co | Dribbble | LinkedIn</div>
                  <div className="mt-2 text-xs text-muted italic">Currently: brand identity for Fieldstone AI →</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  The business name ("Webb Studio") adds a layer of professionalism. The "currently
                  working on" line signals active demand — it's social proof that other clients
                  want his work. The Dribbble link is appropriate here because it's where design
                  clients actually look at work.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Freelance developer</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Dev Patel</div>
                  <div className="text-muted">Full-Stack Developer (React / Node / PostgreSQL)</div>
                  <div className="text-primary">devpatel.dev | GitHub</div>
                  <div className="mt-2 text-xs text-primary">📅 30-min project scoping call → calendly.com/dev-patel</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Listing the specific stack (React / Node / PostgreSQL) is useful for technical
                  clients evaluating fit. GitHub is the portfolio equivalent for developers. The
                  "project scoping call" framing is smarter than a generic "intro call" — it sets
                  the expectation that you're talking about a specific project.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Freelance consultant</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Yuki Tanaka</div>
                  <div className="text-muted">Operations Consultant | Tanaka Advisory</div>
                  <div className="text-muted">M: +1 (312) 555-0194</div>
                  <div className="text-primary">tanakaadvisory.com | LinkedIn</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Consulting work often involves phone communication and more formal relationships,
                  so a phone number makes more sense here than for a designer or writer. The business
                  name adds credibility. See the{" "}
                  <Link href="/professional-email-signature" className="text-primary underline underline-offset-2">
                    professional email signature guide
                  </Link>{" "}
                  for more on matching your signature to your industry context.
                </p>
              </div>

            </div>
          </section>

          {/* Different signatures for different clients */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Using different signatures for different client contexts
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Most email clients let you set up multiple signatures and switch between them.
              As a freelancer, there are a few situations where having a second signature
              is worth the small effort.
            </p>

            <div className="grid gap-5 md:grid-cols-2 mb-6">
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Cold outreach signature</h3>
                <p className="text-sm text-muted leading-relaxed">
                  For emails to prospects you haven't worked with yet. Include your Calendly link
                  prominently, a brief descriptor of what you do, and a link to a relevant project
                  or case study. The goal is to give them enough to understand your value and make
                  it easy to respond.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Ongoing client signature</h3>
                <p className="text-sm text-muted leading-relaxed">
                  For emails to clients you're actively working with. Simpler — just your name,
                  phone number, and maybe a portfolio link. They already know what you do; you
                  don't need to sell to them in every email. A short signature in ongoing threads
                  can actually feel more professional.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Industry-specific signature</h3>
                <p className="text-sm text-muted leading-relaxed">
                  If you work across multiple industries, a signature tailored to each context
                  can help. A developer pitching a fintech company might emphasize different
                  projects than when pitching an e-commerce brand. Adjust the portfolio link and
                  the specialty description.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Minimal reply signature</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Some email clients let you use a shorter signature for replies (vs. new emails).
                  A reply signature with just your name and phone number keeps long threads from
                  filling up with 8-line signatures on every exchange. Gmail's signature settings
                  support this natively.
                </p>
              </div>
            </div>
          </section>

          {/* Trust and personal brand */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Building trust through professional appearance
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              As a freelancer, you're constantly competing with other freelancers for the same
              projects. The quality of your work is the primary differentiator, but your
              professional appearance matters more than most people admit — especially early in
              the relationship when the client hasn't seen your work yet.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              A well-designed email signature is part of that professional appearance. It doesn't
              need to be elaborate — it just needs to look intentional. Clean typography, consistent
              colors that match your website or portfolio, a properly-sized headshot or logo.
              The impression it creates is: "This person has their act together."
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Contrast that with a plain-text signature, or one where the logo is blurry, the
              font is Times New Roman, and the phone number is still from three cities ago. That
              impression is: "This person doesn't pay attention to details" — which is exactly
              the wrong message to send as someone being hired for their attention to craft.
            </p>
            <p className="text-muted leading-relaxed">
              The{" "}
              <Link href="/email-signature-design" className="text-primary underline underline-offset-2">
                email signature design guide
              </Link>{" "}
              covers the specific design choices — fonts, colors, spacing — that make a signature
              look genuinely polished rather than just functional. Worth reading if you care about
              the visual side.
            </p>
          </section>

          {/* What NOT to include */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What to leave out of your freelance signature
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              The temptation as a freelancer is to use your signature to establish credibility
              by listing everything you do. Resist this. Here's what doesn't work.
            </p>

            <div className="space-y-4">
              {[
                {
                  bad: "A list of all your skills",
                  why: "\"Copywriting | Content Strategy | SEO | Email Marketing | Brand Voice | Social Media\" — this looks like a keyword list, not a professional bio. Your specialty line does this job better. If you do multiple things, link to a website that explains them.",
                },
                {
                  bad: "Links to every platform you're on",
                  why: "One or two links is enough. Listing Behance, Dribbble, Instagram, Twitter, LinkedIn, GitHub, and your YouTube channel creates visual clutter and signals that you're not sure which one is most valuable. Pick the one or two that matter most for your work.",
                },
                {
                  bad: "Hourly rates or pricing information",
                  why: "Pricing belongs in a proposal or conversation, not a signature. Leading with rates before establishing value is rarely the right positioning.",
                },
                {
                  bad: "\"Available for freelance work\" or \"open to new projects\"",
                  why: "This reads as desperate rather than confident. Let your Calendly link and portfolio do this work implicitly. If you want to signal availability, a specific CTA is better: 'Taking new clients for Q2 →'",
                },
                {
                  bad: "Inspirational quotes",
                  why: "\"Do what you love and you'll never work a day in your life.\" In a professional email context, these read as noise at best and unprofessional at worst. They add length and don't communicate anything useful about who you are or what you do.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-red-100 bg-red-50 p-5"
                >
                  <span className="text-red-500 text-lg font-bold flex-shrink-0 mt-0.5">✗</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.bad}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to create */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to build your freelance signature
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              The{" "}
              <Link href="/email-signature-maker" className="text-primary underline underline-offset-2">
                NeatStamp signature maker
              </Link>{" "}
              is the fastest way to do this. Fill in your details, pick a template, upload a
              headshot if you want one, and copy the HTML. It takes about three minutes. No
              account required, no watermarks, and the output works in Gmail, Outlook, and
              Apple Mail.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Once you have the HTML, follow the installation guide for your email client.
              Gmail instructions are in the{" "}
              <Link href="/email-signature-gmail" className="text-primary underline underline-offset-2">
                Gmail signature guide
              </Link>
              . For Outlook, see the{" "}
              <Link href="/email-signature-outlook" className="text-primary underline underline-offset-2">
                Outlook guide
              </Link>
              . For Apple Mail on Mac or iPhone, the{" "}
              <Link href="/email-signature-apple-mail" className="text-primary underline underline-offset-2">
                Apple Mail guide
              </Link>{" "}
              covers the specific quirks of that client.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              If you use multiple devices — a MacBook and an iPhone, for example — you'll need
              to install the signature on each one separately. The Apple Mail guide covers both.
            </p>
            <Link
              href="/editor"
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow hover:bg-primary-dark transition-all"
            >
              Open the Signature Editor
              <svg
                className="ml-2 h-4 w-4"
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
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/email-signature-maker",
                  title: "Email Signature Maker",
                  desc: "Build a signature in 60 seconds. No account, no watermarks.",
                },
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature",
                  desc: "What makes a signature genuinely professional, with examples.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Typography, color, spacing — the visual side of signatures.",
                },
                {
                  href: "/email-signature-with-logo",
                  title: "Email Signature with Logo",
                  desc: "Adding your logo or headshot without breaking the layout.",
                },
                {
                  href: "/email-signature-gmail",
                  title: "Gmail Signature Setup",
                  desc: "Step-by-step for setting up your signature in Gmail.",
                },
                {
                  href: "/email-signature-apple-mail",
                  title: "Apple Mail Signature Setup",
                  desc: "Mac, iPhone, and iPad instructions — including the HTML workaround.",
                },
                {
                  href: "/email-signature-examples-with-logo",
                  title: "Signature Examples with Logo",
                  desc: "10+ real examples across different professions and styles.",
                },
                {
                  href: "/html-email-signature",
                  title: "HTML Email Signature Guide",
                  desc: "How HTML signatures work and why they render differently by client.",
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
              Make your signature work as hard as you do
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Build a signature that reflects your work and makes it easy for clients to
              reach you. Free, no account needed, installs in Gmail, Outlook, and Apple Mail.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create My Freelance Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
