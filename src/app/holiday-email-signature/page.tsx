import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Holiday Email Signature — Professional Ideas",
  description:
    "Holiday email signatures for every season — inclusive greetings, office closure notices, seasonal banners, and how to handle the transition from Christmas through the New Year. Templates included.",
  alternates: {
    canonical: "https://neatstamp.com/holiday-email-signature",
  },
};

const faqs = [
  {
    q: "What's the difference between a holiday email signature and a Christmas email signature?",
    a: "A holiday email signature is broader — it covers any seasonal update to your signature, whether that's for the December holiday season (which includes Christmas, Hanukkah, Kwanzaa, and the New Year), other cultural holidays, or seasonal periods throughout the year. A Christmas email signature is specific to Christmas. If you email people across a variety of cultural backgrounds, a holiday signature with inclusive language is generally more appropriate than one that only references Christmas.",
  },
  {
    q: "Should I say 'Happy Holidays' or 'Merry Christmas' in my signature?",
    a: "'Merry Christmas' is specific and personal — it works well if you know your recipients celebrate Christmas, or if your business context is explicitly Christian. 'Happy Holidays' acknowledges that your recipients may celebrate a range of traditions in December, or none at all. 'Season's Greetings' is the most neutral option and reads as warm without being specific. If your email list includes recipients from diverse religious or cultural backgrounds, the broader greeting is more considerate.",
  },
  {
    q: "How do I integrate holiday closure information with my signature?",
    a: "Add a brief closure notice in smaller text below your main contact details. Keep it to one or two lines: the dates you're closed and the date you return. Your email signature notice complements (rather than replaces) your out-of-office auto-reply, which should carry more detail. Don't leave the closure notice in your signature after you return — remove it on your first working day back.",
  },
  {
    q: "Can I use a seasonal banner in my holiday email signature?",
    a: "Yes. A static banner image is one of the cleanest ways to add seasonal character to your signature without changing the text layout. Keep it under 500px wide, under 150px tall, and under 100KB in file size. Use JPEG or PNG — not animated GIF. Make sure it doesn't dominate the signature or obscure your contact information.",
  },
  {
    q: "What other holidays besides Christmas warrant a signature update?",
    a: "Beyond Christmas and the New Year, some professionals update their signature for other significant holidays in their context: Eid al-Fitr and Eid al-Adha (for businesses with a Muslim client base or workforce), Diwali (for businesses in India or with a significant South Asian audience), Rosh Hashanah and Passover (for Jewish contexts), and even major secular occasions like Thanksgiving (common in US businesses). The key question is whether the holiday is relevant to your particular audience.",
  },
  {
    q: "When should I switch my holiday signature back to normal?",
    a: "For Christmas and New Year, switch back on your first working day of the new year — typically January 2nd or 3rd. For other holidays, switch back the day after the holiday ends. The most common mistake is leaving a holiday signature up long after the occasion has passed. Set a calendar reminder if needed.",
  },
  {
    q: "Should everyone in the company have the same holiday signature?",
    a: "In larger organizations, yes — a company-wide holiday signature template ensures brand consistency and means everyone carries the same closure dates and greeting. This is usually managed by IT or marketing, with a template pushed to all employees. In smaller businesses, individuals can manage their own updates, though it's worth agreeing on the same greeting text and closure dates so the company speaks with one voice.",
  },
];

export default function HolidayEmailSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Holiday Email Signature",
            url: "https://neatstamp.com/holiday-email-signature",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Holiday Email Signature
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              How to update your email signature for holidays — festive but
              professional, inclusive where it needs to be, and easy to switch
              back when the season ends.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build My Holiday Signature — Free
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
              A holiday email signature is any seasonal update to your standard
              signature — a banner, a greeting, closure dates, or a color change
              tied to a specific holiday or time of year. Most people think of this
              as a December-only thing, but the same approach applies to any
              significant occasion that's relevant to your business and audience.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The principles are the same whatever the season: keep the update
              visually coherent with your standard signature, don't let it
              overwhelm the contact information, and set a reminder to remove it
              when the occasion has passed.
            </p>
            <p className="text-muted leading-relaxed">
              This guide focuses on the broader holiday picture — the December
              season, end-of-year messaging, and how to handle multiple holidays
              in a diverse professional context. For specific Christmas templates,
              see the{" "}
              <Link href="/christmas-email-signature" className="text-primary underline underline-offset-2">
                Christmas email signature guide
              </Link>
              . For New Year updates, see the{" "}
              <Link href="/new-year-email-signature" className="text-primary underline underline-offset-2">
                New Year email signature guide
              </Link>
              .
            </p>
          </section>

          {/* Holiday season timeline */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The holiday signature season — a practical timeline
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              December and early January follow a predictable pattern for most
              businesses. Here's how to plan your signature updates:
            </p>
            <div className="space-y-4">
              {[
                {
                  period: "December 1st",
                  action: "Switch to holiday signature",
                  detail:
                    "Update your signature with a seasonal banner or greeting. If your organization does company-wide holiday signatures, this is typically when they go live.",
                },
                {
                  period: "December 15th–23rd",
                  action: "Add office closure dates",
                  detail:
                    "Add your closure notice to the signature so recipients are prepared. This is especially useful for clients who are planning end-of-year requests or project deadlines.",
                },
                {
                  period: "December 24th onwards",
                  action: "Out-of-office handles it",
                  detail:
                    "Your auto-reply does the heavy lifting during the closure period. Your holiday signature can stay up, but keep it simple — anyone reaching your inbox during closure is relying on the auto-reply for information.",
                },
                {
                  period: "January 2nd–3rd (first working days)",
                  action: "Switch to New Year signature or standard",
                  detail:
                    "Some people run a brief New Year version before reverting to standard — 'Wishing you a happy and productive 2027' for a week or two. Others go straight back to the standard signature.",
                },
                {
                  period: "January 15th at the latest",
                  action: "Back to standard signature",
                  detail:
                    "By mid-January, any holiday reference should be gone. No exceptions.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex-shrink-0 text-primary font-semibold text-sm min-w-[120px]">
                    {item.period}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      {item.action}
                    </p>
                    <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Inclusive greetings */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Inclusive greetings — choosing the right wording
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              The choice of holiday greeting says something about how broadly you're
              thinking about your audience. Here's a honest breakdown of the options:
            </p>
            <div className="space-y-4 mb-8">
              {[
                {
                  greeting: "Merry Christmas",
                  appropriate: "When your audience primarily celebrates Christmas",
                  considerations:
                    "Personal and specific. Works well if you know your recipients — most individual clients, partners in predominantly Christian contexts, or internal teams in Christmas-celebrating countries. Not appropriate for globally diverse audiences.",
                },
                {
                  greeting: "Happy Holidays",
                  appropriate: "Diverse or uncertain audiences",
                  considerations:
                    "Broader than Christmas — acknowledges the December season without specifying a religion. Very common in US business contexts. Some recipients find it hollow compared to a specific greeting; others appreciate the inclusivity. The right choice for large contact lists with varied religious backgrounds.",
                },
                {
                  greeting: "Season's Greetings",
                  appropriate: "Most formal and universally applicable",
                  considerations:
                    "The most traditional and neutral option. Reads as warm but makes no religious or cultural assumptions. Works across all professional contexts and all recipient demographics. Some find it old-fashioned; most find it perfectly appropriate.",
                },
                {
                  greeting: "Wishing you a restful end of year",
                  appropriate: "Secular professional contexts",
                  considerations:
                    "Entirely secular — acknowledges the end of the calendar year without any holiday reference. Works well for businesses in regions where December is not a significant holiday season for everyone, or in contexts where religious neutrality is important.",
                },
                {
                  greeting: "Warm wishes for the season",
                  appropriate: "Friendly but neutral",
                  considerations:
                    "Informal and warm without being specific. Works in creative and startup contexts. More personal-feeling than 'Season's Greetings' but equally neutral.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="font-semibold text-foreground mb-1 text-primary">
                    &ldquo;{item.greeting}&rdquo;
                  </h3>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Best when: {item.appropriate}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">{item.considerations}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-foreground mb-2">
                A note on international audiences
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                If you regularly email clients in the Middle East, South Asia,
                East Asia, or other regions where Christmas is not a public
                holiday, be aware that December holiday messaging may not
                resonate. In these contexts, a simple professional sign-off
                without holiday references is often more appropriate than
                forcing a Christmas or "Happy Holidays" greeting that doesn't
                reflect the recipient's context.
              </p>
            </div>
          </section>

          {/* Seasonal banners */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Seasonal banners in email signatures
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              A banner image is the most visually impactful way to signal a holiday
              season in your email signature. Done well, it looks polished and
              intentional. Done badly, it looks like clip art.
            </p>
            <div className="grid gap-5 md:grid-cols-2 mb-6">
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  Banner best practices
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Maximum 500px wide, 150px tall
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Under 100KB file size (JPEG or PNG)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Uses your brand colors with seasonal palette
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Has alt text in case images are blocked
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Hosted at a stable URL that won't expire
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  Banner mistakes to avoid
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Animated GIFs — blocked and unprofessional
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Very large file sizes that slow email loading
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Generic stock imagery with no brand connection
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Overly cluttered — snowflakes, ribbons, bells all at once
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Banners that obscure or replace your contact details
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted">
              For more on image sizing and placement in email signatures, see the{" "}
              <Link href="/email-signature-design" className="text-primary underline underline-offset-2">
                email signature design guide
              </Link>
              .
            </p>
          </section>

          {/* Other holidays */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Holiday signatures beyond Christmas
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Whether or how to update your signature for non-Christian holidays
              depends on your industry, your audience, and your own background.
              Here's how different contexts typically handle it:
            </p>
            <div className="space-y-4">
              {[
                {
                  holiday: "Eid al-Fitr / Eid al-Adha",
                  context: "Businesses with Muslim staff or clients",
                  guidance:
                    "In organizations with significant Muslim representation, a brief Eid greeting in the signature is warm and appropriate. The dates vary each year (based on the Islamic calendar), so check the specific dates before updating. 'Eid Mubarak' or 'Wishing you and your family Eid Mubarak' is the standard greeting.",
                },
                {
                  holiday: "Diwali",
                  context: "Businesses in India or with significant South Asian audience",
                  guidance:
                    "Common in Indian businesses and multinational companies with significant India operations or South Asian workforce. 'Wishing you a happy Diwali' or a Diwali banner using gold and warm colors is appropriate. Less common in purely Western business contexts.",
                },
                {
                  holiday: "Hanukkah",
                  context: "Businesses with Jewish staff or clients",
                  guidance:
                    "Hanukkah falls at different points in December each year. 'Happy Hanukkah' or 'Hanukkah Sameach' is appropriate in relevant contexts. In businesses that celebrate Christmas company-wide, some Jewish staff prefer to use 'Happy Holidays' as the more inclusive term.",
                },
                {
                  holiday: "Thanksgiving",
                  context: "US-based businesses",
                  guidance:
                    "Thanksgiving is largely a US holiday (late November) and marks the informal start of the holiday season for many American businesses. A brief 'Wishing you a warm Thanksgiving' is common in US corporate contexts — less common outside North America.",
                },
                {
                  holiday: "Lunar New Year",
                  context: "Businesses with Chinese, Korean, Vietnamese, or East Asian audience",
                  guidance:
                    "Falls in late January or February. Very appropriate for businesses with East Asian clients or staff. 'Happy Lunar New Year' or 'Wishing you a prosperous Lunar New Year' works. Use 'Lunar New Year' rather than 'Chinese New Year' if your audience includes Vietnamese or Korean recipients.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="font-semibold text-foreground">{item.holiday}</h3>
                    <span className="text-xs text-muted bg-border px-2 py-0.5 rounded-full">
                      {item.context}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.guidance}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Out-of-office integration */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Integrating holiday closure with your out-of-office
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Your holiday signature and your out-of-office auto-reply are two
              separate tools that work together. Here's how to think about each:
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  What the signature handles
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    Signals the festive season proactively
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    Gives closure dates before you actually close
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    Appears on outgoing emails you send during December
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    Sets client expectations about your availability
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  What the out-of-office handles
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    Responds automatically when you're actually away
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    Gives an emergency contact if needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    Provides detailed information about your return
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">→</span>
                    Can link to specific resources for urgent queries
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              The signature notice and the out-of-office message should give
              consistent dates. If your signature says you close on December 24th
              but your out-of-office says December 23rd, recipients get confused.
              Check both before you leave.
            </p>
          </section>

          {/* End-of-year messaging */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              End-of-year messaging in your signature
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              The end of the calendar year is an opportunity to add a reflective
              or appreciative note to your signature beyond just holiday greetings.
              This works particularly well for client-facing roles or small businesses
              where the relationship is personal.
            </p>
            <div className="space-y-4">
              {[
                {
                  type: "Simple gratitude",
                  example: "Thank you for your trust and partnership this year.",
                  notes: "Works in B2B contexts where ongoing client relationships matter. Brief and genuine.",
                },
                {
                  type: "Year-end reflection",
                  example: "It's been a remarkable year. Thank you for being part of it.",
                  notes: "Slightly more personal — suits founders, creative professionals, and small business owners.",
                },
                {
                  type: "Forward-looking",
                  example: "Looking forward to working with you in 2027.",
                  notes: "Focuses on the future rather than the past. Works in sales and partnership contexts.",
                },
                {
                  type: "Team acknowledgment",
                  example: "From everyone at [Company] — thank you for a great 2026.",
                  notes: "Plural voice suits company-wide or department-wide signatures.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-5">
                  <p className="text-xs font-medium text-primary mb-2">{item.type}</p>
                  <blockquote className="font-mono text-sm text-foreground mb-2">
                    &ldquo;{item.example}&rdquo;
                  </blockquote>
                  <p className="text-xs text-muted">{item.notes}</p>
                </div>
              ))}
            </div>
          </section>

          {/* New Year transition */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Transitioning from holiday to New Year signature
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              After Christmas and before you revert to your standard signature,
              some professionals run a brief New Year version for the first two
              weeks of January. See the full{" "}
              <Link href="/new-year-email-signature" className="text-primary underline underline-offset-2">
                New Year email signature guide
              </Link>{" "}
              for details on what to change and when. The short version:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Replace 'Happy Christmas' or 'Season's Greetings' with 'Happy New Year' or 'Wishing you a successful 2027'",
                "Remove the December closure dates — they're no longer relevant",
                "Consider updating your copyright year if it appears in your signature",
                "Check whether your job title or other details changed at year-end",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">→</span>
                  <p className="text-sm text-muted leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/new-year-email-signature"
              className="inline-flex items-center text-primary font-semibold text-sm underline underline-offset-2"
            >
              Read the New Year signature guide →
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
                  href: "/christmas-email-signature",
                  title: "Christmas Email Signature",
                  desc: "Christmas-specific templates, timing, and the most common mistakes.",
                },
                {
                  href: "/new-year-email-signature",
                  title: "New Year Email Signature",
                  desc: "What to update in January and how to start the year right.",
                },
                {
                  href: "/email-signature-for-business",
                  title: "Email Signature for Business",
                  desc: "Company-wide signature policy and brand consistency.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Banners, colors, and seasonal formatting.",
                },
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature",
                  desc: "The base your holiday signature should build on.",
                },
                {
                  href: "/editor",
                  title: "Signature Editor",
                  desc: "Build your holiday signature now — free.",
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
              Build your holiday signature
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Free. No account needed. Works in Gmail, Outlook, and Apple Mail.
              Easy to revert to your standard signature when the season ends.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create My Holiday Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
