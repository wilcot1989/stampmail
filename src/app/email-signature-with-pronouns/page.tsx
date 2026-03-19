import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Pronouns in Email Signatures — Guide & Examples",
  description:
    "Should you add pronouns to your email signature? Where do they go, how should they look, and what do you do if your company requires it but you'd rather not? A practical, non-preachy guide.",
  alternates: {
    canonical: "https://neatstamp.com/email-signature-with-pronouns",
  },
};

const faqs = [
  {
    q: "Should I add pronouns to my email signature?",
    a: "That's genuinely up to you. Some people include them because it signals to colleagues and clients that they're in an environment where everyone's identity is acknowledged. Others prefer not to for personal or cultural reasons. Neither is wrong. The only thing worth avoiding is adding them purely because it seems expected — if you're not sure, leave them out until you are.",
  },
  {
    q: "Where should pronouns go in an email signature?",
    a: "The most common placement is on the same line as your name — 'Sarah Chen (she/her)' — or on a new line directly below your name. Don't put them after your job title or buried at the bottom near your disclaimer. They're an identifier, so they belong near your name, not mixed in with your contact details.",
  },
  {
    q: "My company has made pronouns mandatory in email signatures. Is that legal?",
    a: "In most jurisdictions, yes — employers can require specific content in work email signatures. Whether it's a good policy is a separate debate. If you object for personal or religious reasons, the approach most employment lawyers suggest is to raise the concern through HR or a formal internal process rather than simply ignoring the requirement.",
  },
  {
    q: "What if I don't want to share my pronouns?",
    a: "You don't have to. Not including pronouns in your signature is a perfectly normal choice. If you work at an organization that has made them mandatory and you're uncomfortable sharing, that's worth raising with HR — there may be accommodations available, particularly if you have religious or other personal objections.",
  },
  {
    q: "How will international colleagues interpret pronouns in my signature?",
    a: "It varies a lot. In the US, Canada, UK, Australia, and most of Western Europe, pronoun disclosure in professional settings is broadly understood. In many other regions — parts of Asia, the Middle East, Eastern Europe, Latin America — it may be unfamiliar, and some colleagues may find it unusual. If you work globally, it's worth being aware that this context doesn't translate universally.",
  },
  {
    q: "Are pronoun additions more appropriate in formal or informal email contexts?",
    a: "They've become common across both. You'll see them in internal emails, client-facing signatures, and academic correspondence. The format varies slightly — more formal contexts tend to use parentheses: 'James (he/him)', while informal ones might use a forward slash without parentheses. Either works.",
  },
  {
    q: "Should I include pronouns in my email signature if I'm a manager or leader?",
    a: "Many managers and leaders choose to include pronouns specifically because it can make it feel safer for reports or team members who use non-binary or non-default pronouns to do the same. If that's your intent, it's a reasonable one. It's not required, but some leaders find it a practical signal rather than an empty gesture.",
  },
  {
    q: "Can I add pronouns to my NeatStamp signature?",
    a: "Yes. In the NeatStamp editor, you can add your pronouns directly in the name field — for example 'Alex Rivera (they/them)' — or add a separate line below your name in the custom fields section. You control the formatting, font size, and color.",
  },
];

export default function EmailSignatureWithPronounsPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Pronouns in Email Signatures",
            url: "https://neatstamp.com/email-signature-with-pronouns",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Pronouns in Email Signatures
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              How to add them, where to put them, what they look like in practice,
              and the honest answer to the question nobody quite wants to ask out loud:
              do you actually have to?
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build My Signature — Free
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
            <p className="mt-3 text-sm text-muted">No account needed.</p>
          </div>

          {/* Intro */}
          <section className="mb-16">
            <p className="text-muted leading-relaxed mb-4 text-lg">
              Pronouns started appearing in email signatures around 2016 and
              became much more common after 2020. They're now standard in many
              technology companies, universities, healthcare organizations, and
              large corporations. You'll see them less in law firms, financial
              services, manufacturing, and international businesses — though
              that's changing too.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              This guide covers the practical side: where to place them, how to
              format them, what different industries and cultures make of them,
              and how to add them using{" "}
              <Link href="/editor" className="text-primary underline underline-offset-2">
                NeatStamp's signature editor
              </Link>
              . We're not going to argue for or against the practice — that's not
              what this is for.
            </p>
            <p className="text-muted leading-relaxed">
              One thing worth saying upfront: there's no universal rule. The
              people who include pronouns in their signature aren't obligated to,
              and the people who don't aren't making a statement. It's a choice
              that depends on your context, your organization, and what feels
              right to you.
            </p>
          </section>

          {/* Why people include them */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why people add pronouns to their signatures
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              The reasoning varies. Here are the most common ones, without editorializing:
            </p>
            <div className="space-y-4">
              {[
                {
                  reason: "Clarity for people with ambiguous or unfamiliar names",
                  detail:
                    "If your name is Alex, Sam, Jordan, or a name that's common in some cultures but reads as unusual in the recipient's country, adding pronouns removes the guesswork. This is useful regardless of whether someone is trans or non-binary — plenty of people with conventionally gendered names add them for exactly this reason.",
                },
                {
                  reason: "Signaling inclusivity in client or candidate-facing roles",
                  detail:
                    "HR professionals, recruiters, counselors, and others who work closely with people often add pronouns to signal that they're open to working with anyone. The argument is that it costs nothing to add and may make someone who's hesitant feel more comfortable.",
                },
                {
                  reason: "Following organizational policy",
                  detail:
                    "Many large employers now encourage or require pronoun disclosure in email signatures. This is particularly common in universities, healthcare systems, and tech companies. If your organization has a policy, that's often the reason.",
                },
                {
                  reason: "Personal preference to be addressed correctly",
                  detail:
                    "Some people — not only those who are trans or non-binary — simply prefer that people know how to address them without having to ask. This is especially relevant for they/them users whose pronoun isn't guessable from their name.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.reason}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Placement */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Where to put pronouns in your signature
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Placement matters more than most people think. Pronouns belong
              near your name — they're an identifier, not a legal disclaimer
              or a contact detail.
            </p>

            <div className="space-y-5 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Option 1: Same line as your name (most common)
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-2">
                  <div className="text-foreground font-bold">Sarah Chen (she/her)</div>
                  <div className="text-muted">Marketing Manager | Fieldstone Media</div>
                  <div className="text-muted">+1 (212) 555-0134</div>
                  <div className="text-primary">sarah.chen@fieldstone.co</div>
                </div>
                <p className="text-sm text-muted">
                  Clean and unobtrusive. The pronouns read as part of the name
                  field rather than a separate element. This is the most widely
                  used format in professional contexts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Option 2: Separate line below the name
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-2">
                  <div className="text-foreground font-bold">Alex Rivera</div>
                  <div className="text-muted text-xs">they/them</div>
                  <div className="text-muted">Senior Product Designer | Lumio</div>
                  <div className="text-muted">alex@lumio.io</div>
                </div>
                <p className="text-sm text-muted">
                  Works well for they/them or less familiar pronouns where you
                  want a bit more visual separation. Use a smaller font (11–12px)
                  and a lighter color so it doesn't compete with your name.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Option 3: After the job title (less recommended)
                </h3>
                <div className="rounded-xl border-l-4 border-red-300 bg-red-50 p-5 font-mono text-sm leading-relaxed mb-2">
                  <div className="text-foreground font-bold">Marcus Webb</div>
                  <div className="text-muted">Marketing Director | Fieldstone Media | he/him</div>
                  <div className="text-muted">+1 (212) 555-0134</div>
                </div>
                <p className="text-sm text-muted">
                  This placement buries the pronouns in the middle of the
                  signature and makes the job title line long and cluttered.
                  Avoid this format — it's harder to read and doesn't look
                  intentional.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-foreground mb-2">
                Formatting tip
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                If you put pronouns on the same line as your name, use
                parentheses — <em>Name (pronouns)</em> — rather than a slash
                or pipe. Parentheses visually group the pronouns as supplementary
                to the name rather than an equal part of it. This is the format
                most style guides (including those from major universities and
                healthcare systems) recommend.
              </p>
            </div>
          </section>

          {/* Examples by pronoun */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Formatted examples for common pronouns
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Here's what each common pronoun set looks like formatted into a
              real{" "}
              <Link href="/professional-email-signature" className="text-primary underline underline-offset-2">
                professional email signature
              </Link>
              .
            </p>

            <div className="space-y-6">
              {[
                {
                  pronouns: "she/her",
                  example: {
                    name: "Dr. Priya Nair (she/her)",
                    title: "Consultant Cardiologist | St. Clement's Medical",
                    contact: "+44 20 7946 0134",
                    email: "p.nair@stclements.nhs.uk",
                  },
                  note: "Common in healthcare, academia, and corporate settings. The parenthetical format is well understood across all industries.",
                },
                {
                  pronouns: "he/him",
                  example: {
                    name: "James Ortega (he/him)",
                    title: "Head of Sales | Archway Software",
                    contact: "+1 (415) 555-0187",
                    email: "james@archway.io",
                  },
                  note: "He/him is still less common than she/her in signatures, largely because it's assumed as default in many professional contexts. Some men include it anyway to normalize the practice.",
                },
                {
                  pronouns: "they/them",
                  example: {
                    name: "Sam Holloway (they/them)",
                    title: "UX Researcher | Lumio",
                    contact: "sam@lumio.io",
                    email: "",
                  },
                  note: "This is where adding pronouns is most practically useful — they/them is not automatically inferred from a name, so explicitly noting it removes ambiguity for colleagues writing about the person.",
                },
                {
                  pronouns: "she/they",
                  example: {
                    name: "Morgan Lee (she/they)",
                    title: "Creative Director | Blue Door Agency",
                    contact: "morgan@bluedoor.co",
                    email: "",
                  },
                  note: "Multiple pronoun sets are less common but well understood in progressive professional environments. The slash format between sets is standard.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-primary">
                    {item.pronouns}
                  </h3>
                  <div className="rounded-lg bg-surface border-l-4 border-primary p-4 font-mono text-sm leading-relaxed mb-3">
                    <div className="text-foreground font-bold">{item.example.name}</div>
                    <div className="text-muted">{item.example.title}</div>
                    {item.example.contact && <div className="text-muted">{item.example.contact}</div>}
                    {item.example.email && <div className="text-primary">{item.example.email}</div>}
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* The debate — addressed fairly */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The debate — what both sides actually say
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              This is one of those workplace topics where people have genuinely
              strong opinions on both sides. Here's a fair account of each
              position.
            </p>

            <div className="grid gap-5 md:grid-cols-2 mb-6">
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  Arguments for including pronouns
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">+</span>
                    Makes non-binary colleagues feel less alone in disclosure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">+</span>
                    Removes ambiguity for people with gender-neutral names
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">+</span>
                    Costs nothing to add and takes a second
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">+</span>
                    Widely normalized in tech, healthcare, and education
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  Arguments against (or reasons people decline)
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-muted font-bold flex-shrink-0">—</span>
                    Personal or religious beliefs about gender
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted font-bold flex-shrink-0">—</span>
                    Cultural context where it's unusual or misunderstood
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted font-bold flex-shrink-0">—</span>
                    Preference not to share personal information in professional settings
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted font-bold flex-shrink-0">—</span>
                    Concern that it adds clutter to an already-short signature
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-muted leading-relaxed text-sm">
              There's a third position that doesn't get mentioned enough: many
              people simply haven't thought about it and default to whatever
              seems normal in their immediate workplace. That's fine too.
            </p>
          </section>

          {/* International differences */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How pronouns in signatures land internationally
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              If you email people in different countries regularly, it's worth
              knowing that this practice is not universally understood or
              expected.
            </p>
            <div className="space-y-4">
              {[
                {
                  region: "US, Canada, UK, Australia, New Zealand",
                  assessment: "Widely understood",
                  detail: "The practice is mainstream in large organizations in these countries. Recipients are unlikely to be confused or put off by pronouns in your signature, even if they don't use them themselves.",
                },
                {
                  region: "Western Europe (Germany, Netherlands, Nordics, France)",
                  assessment: "Generally understood, less common",
                  detail: "More common in tech and academic contexts than in traditional industries. Recipients will likely understand what they mean even if the practice is less widespread than in North America.",
                },
                {
                  region: "Eastern Europe, Russia",
                  assessment: "Unfamiliar in most contexts",
                  detail: "The concept exists in activist and academic circles but is not a mainstream professional practice. Pronoun disclosure may confuse recipients or be read as unusual. This shouldn't stop you from using them, but be aware of it.",
                },
                {
                  region: "East Asia (China, Japan, Korea)",
                  assessment: "Not a recognized convention",
                  detail: "These countries have their own rich pronoun systems, but the Western practice of listing English pronouns in business communications is not established. It's unlikely to cause offense — it just may not register as meaningful.",
                },
                {
                  region: "Middle East, South Asia",
                  assessment: "Culturally context-dependent",
                  detail: "Varies widely by country, industry, and organization. In multinational companies operating in these regions, the practice may be more familiar. In local businesses, it's often not a recognized convention.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="font-semibold text-foreground">{item.region}</h3>
                    <span className="text-xs font-medium text-muted bg-border px-2 py-0.5 rounded-full">
                      {item.assessment}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Company policy */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What to do when your company requires pronouns in signatures
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              More organizations are building this into their email signature
              policies, particularly in HR, healthcare, and tech. Here's the
              practical situation:
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  If you're comfortable with the requirement
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Add your pronouns following the guidance above. Place them
                  after your name in parentheses, keep the font size consistent
                  with the rest of your name line. Done.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  If you object for personal or religious reasons
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  This is worth raising with HR through official channels. In
                  some countries and some legal contexts, there may be
                  accommodations available. Blanket mandates are increasingly
                  common, but so are legal challenges to them — the law is still
                  developing in this area in most jurisdictions.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  If the policy is "encouraged" rather than required
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Then it's genuinely optional. Some people include them; some
                  don't. You're unlikely to face consequences either way in most
                  organizations with an "encouraged" policy.
                </p>
              </div>
            </div>
          </section>

          {/* How to add in NeatStamp */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to add pronouns in NeatStamp
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              There are two approaches depending on where you want the pronouns:
            </p>
            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border bg-white p-4">
                <h3 className="font-semibold text-foreground mb-1 text-sm">
                  Same line as your name
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  In the Name field in the{" "}
                  <Link href="/editor" className="text-primary underline underline-offset-2">
                    NeatStamp editor
                  </Link>
                  , type your full name followed by your pronouns in parentheses:
                  <code className="ml-1 text-xs bg-surface border border-border rounded px-1.5 py-0.5">
                    Sarah Chen (she/her)
                  </code>
                  . The field accepts any text, so you have full control over the format.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-white p-4">
                <h3 className="font-semibold text-foreground mb-1 text-sm">
                  Separate line below your name
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Use one of the custom fields to add a second line below your
                  name. Set the font size to 11–12px and use a lighter gray
                  so it's clearly secondary to your name without disappearing.
                  See the{" "}
                  <Link href="/email-signature-design" className="text-primary underline underline-offset-2">
                    email signature design guide
                  </Link>{" "}
                  for font size and color recommendations.
                </p>
              </div>
            </div>
            <Link
              href="/editor"
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow hover:bg-primary-dark transition-all"
            >
              Open the editor
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
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature",
                  desc: "Everything that belongs in a professional signature — and what to cut.",
                },
                {
                  href: "/email-signature-for-business",
                  title: "Email Signature for Business",
                  desc: "Company-wide signature policies and brand consistency.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Formatting, fonts, colors, and layout best practices.",
                },
                {
                  href: "/email-signature-disclaimer",
                  title: "Email Signature Disclaimer",
                  desc: "Legal disclaimers — when you need one and what to put in it.",
                },
                {
                  href: "/email-signature-for-doctor",
                  title: "Email Signature for Doctors",
                  desc: "Healthcare-specific signature guidelines including credentials.",
                },
                {
                  href: "/email-signature-for-lawyer",
                  title: "Email Signature for Lawyers",
                  desc: "What law firm signatures need and the disclaimers required.",
                },
                {
                  href: "/editor",
                  title: "Signature Editor",
                  desc: "Build your signature now — free, no account needed.",
                },
                {
                  href: "/email-signature-maker",
                  title: "Email Signature Maker",
                  desc: "Quick-start guide to creating your signature in NeatStamp.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-border bg-surface p-4 hover:border-primary hover:bg-white transition-colors"
                >
                  <div className="font-semibold text-foreground text-sm">
                    {link.title}
                  </div>
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
                  <p className="px-6 pb-5 text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary p-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Build your signature — with or without pronouns
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              NeatStamp lets you format your signature exactly the way you want
              it. Free, no account needed, works in Gmail, Outlook, and Apple Mail.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create My Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
