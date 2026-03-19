import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signatures for Small Business — Free",
  description:
    "Why small businesses need consistent signatures, how to roll out for free, template selection by industry, and when to upgrade to a team plan.",
  alternates: { canonical: "https://neatstamp.com/small-business-email-signature" },
};

const faqs = [
  {
    q: "How do small businesses create consistent email signatures without IT support?",
    a: "The most practical approach is: build a template in NeatStamp, export the HTML, and share it with each employee along with a one-page installation guide for their email client (Gmail, Outlook, or Apple Mail). Most employees can follow a clear set of steps without technical support. The key is giving them specific instructions for their exact email client rather than generic guidance. Set a deadline and do a brief check afterward by asking each person to forward you a sent email.",
  },
  {
    q: "Are there free email signature tools for small businesses?",
    a: "Yes. NeatStamp is free for individuals and has a team plan for managing multiple signatures. Other free options include HubSpot's email signature generator and MySignature's free tier. The free tiers of most tools are adequate for small businesses that just need a clean template with logo and contact info — paid plans are mainly worth it when you want centralized management, dynamic fields, or banner campaign rotation.",
  },
  {
    q: "When should a small business upgrade to a paid signature management tool?",
    a: "When you have more than 15–20 people and manual rollout becomes a recurring headache — every new hire requires individual setup, people keep forgetting to update when details change, and doing a company-wide banner campaign means contacting everyone individually. At that scale, centralized management tools (like NeatStamp Teams, Exclaimer, or Opensense) pay for themselves in saved admin time.",
  },
  {
    q: "Should a restaurant or retail business use email signatures?",
    a: "Yes — especially for the owners and managers who email suppliers, vendors, partners, and wholesale buyers. A restaurant owner emailing a wine distributor with a polished signature (including the restaurant name, their logo, and a phone number) looks more established than one emailing from a personal Gmail with no signature. B2B relationships matter even in consumer-facing businesses.",
  },
  {
    q: "What's the biggest mistake small businesses make with email signatures?",
    a: "Not having a consistent format across the team. The owner has a polished signature with the logo and brand colors, but the front desk person and the three sales reps each have something different — one is plain text, one has the old address, one has Comic Sans. The inconsistency undermines the effort that went into the owner's signature. If you're going to do it, do it for the whole team.",
  },
  {
    q: "Do small business email signatures need a legal disclaimer?",
    a: "It depends on the industry. Law firms, financial advisors, healthcare providers, and real estate agents often have legal requirements around email disclosures. Most retail businesses, restaurants, agencies, and service businesses do not have a legal requirement for a disclaimer. If in doubt, ask your attorney — but don't add a boilerplate disclaimer just because you've seen others do it. An unnecessary disclaimer adds length and looks like you copied it from someone else.",
  },
  {
    q: "How do I add my logo to an email signature for the first time?",
    a: "You need your logo as a PNG file (transparent background is ideal). Upload it to a publicly accessible location — your website, a CDN like Cloudinary, or even a public Google Drive link. Then in NeatStamp, add the image URL in the logo field. Using a hosted URL rather than embedding the image directly is more reliable across email clients. See the email signature with logo guide for the exact dimensions and file size recommendations.",
  },
];

export default function SmallBusinessEmailSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Small Business Email Signatures",
            url: "https://neatstamp.com/small-business-email-signature",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signatures for Small Business
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Small businesses send thousands of emails a year with no consistent signature
              across the team. This guide covers why it matters, how to fix it for free, and
              what a good signature looks like for your type of business.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build Your Business Signature — Free
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

          {/* Why it matters */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why consistent signatures matter for small businesses
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-lg">
              Large companies have brand guidelines, marketing teams, and someone whose job
              it is to ensure consistency across every customer touchpoint. Small businesses
              usually don't — which means small, visible things like email signatures get
              left to chance.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Here's what that typically looks like in practice. The owner has a signature
              they set up when they launched the business — it has the logo, the brand colors,
              and the right contact info. The first employee they hired set up their own
              signature with a different font and the old office phone number. A newer hire
              has no signature at all. A part-timer is using their personal Gmail.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              From the outside — from a client's or supplier's perspective — these emails
              look like they come from different organizations. The trust and recognition
              you've built through your logo and brand colors is missing from most of your
              team's communications.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              For small businesses, this matters in specific ways:
            </p>
            <div className="space-y-3 mb-4">
              {[
                "Suppliers and vendors form impressions about your business based on how organized your communications look",
                "Referral clients who got your name from someone often email before calling — their first real impression is your email",
                "If you're in a B2B industry, inconsistent signatures across your team undermine the professional appearance you've worked to build",
                "When you're growing and adding people, the chaos only compounds if you don't establish standards early",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">→</span>
                  <p className="text-sm text-muted leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-muted leading-relaxed">
              The good news is that this is one of the cheapest, fastest wins available to
              a small business. You don't need software, a designer, or IT support. You need
              a template and a few hours to roll it out.
            </p>
          </section>

          {/* The cost of NOT having them */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The cost of not having a consistent signature
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              It's hard to put a dollar figure on brand inconsistency, but the mechanism is clear.
              Think about the last time you received a poorly formatted email from a company you
              were considering doing business with. Maybe the font was inconsistent, the logo was
              missing, or the person's contact information was out of date. What did that do to
              your perception of the business?
            </p>
            <p className="text-muted leading-relaxed mb-4">
              For small businesses that are competing against larger, better-resourced competitors,
              professional appearance is a differentiator. You may not be able to outspend them on
              advertising, but you can absolutely match them — or beat them — on the quality of
              your communications.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              There's also a more concrete opportunity cost: a signature with no promotional
              banner is a signature that's doing nothing beyond contact info. A small business
              owner who sends 50 emails a day and has a banner linking to their latest offer,
              their Google review page, or their booking calendar is generating a low-friction
              touchpoint with every email. That's marketing that costs nothing but the initial
              setup time.
            </p>
            <p className="text-muted leading-relaxed">
              The math isn't hard. If your team of 5 collectively sends 200 emails per day,
              that's 50,000 branded impressions per year. If your current signatures are
              inconsistent, you're not capturing that.
            </p>
          </section>

          {/* Getting started */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to get started for free
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Here's the practical process. This works for a business with 1 to 20 people,
              with no IT support and no budget.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Gather what you need before you start",
                  detail: "Your logo as a PNG file (transparent background). Your brand color hex codes (the primary one is enough). Up-to-date contact information for each person: name, title, phone number, email, website URL. This sounds obvious but spending 10 minutes gathering these before you start saves headaches.",
                },
                {
                  step: "2",
                  title: "Build a master template in NeatStamp",
                  detail: "Go to the NeatStamp editor. Add placeholder content — 'First Last', 'Job Title', etc. Add your logo, brand colors, website link, and social links. Pick a template that matches your business type. Get it looking right, then copy the HTML.",
                },
                {
                  step: "3",
                  title: "Create variations for different roles (if needed)",
                  detail: "Most small businesses need only one template. But if some roles include promotional CTAs and others don't, or if some staff include personal mobile numbers and others don't, creating 2–3 variations (each with different fields populated) takes an extra 10 minutes.",
                },
                {
                  step: "4",
                  title: "Write a one-page instruction guide",
                  detail: "Cover exactly how to install the signature in the email clients your team uses. Most small businesses use Gmail, Outlook, or a mix. Write specific, step-by-step instructions. 'Go to Settings > See all settings > General > Signature' is more useful than 'go to your email settings'. Include a screenshot if you can.",
                },
                {
                  step: "5",
                  title: "Roll out to the team",
                  detail: "Send each person their correct HTML template and the installation guide. Set a specific deadline — 'please have this set up by Friday' is more effective than 'when you get a chance'. Follow up after the deadline with anyone who hasn't done it.",
                },
                {
                  step: "6",
                  title: "Verify and maintain",
                  detail: "After rollout, ask each person to forward you an email they've sent so you can see the signature in action. Add 'check email signatures' to your onboarding checklist for new hires. Do a quick check every six months to catch any drift.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 pb-5 border-b border-border last:border-0">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Templates by industry */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Email signature templates by industry
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              What belongs in a small business signature varies by industry. Here's what I'd
              recommend for five common types.
            </p>

            <div className="space-y-10">

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Restaurant or food business</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Marco Rossi</div>
                  <div className="text-muted text-xs">Owner | Rossi's Trattoria</div>
                  <div className="text-muted text-xs">T: +1 (503) 555-0113 | rossistrattoria.com</div>
                  <div className="text-primary text-xs">Instagram | OpenTable reservations →</div>
                  <div className="mt-2 text-xs text-muted italic border-t border-border pt-2">🍝 New: Sunday family-style dinners. Book now →</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Restaurants have a natural advantage here: there's always something to promote.
                  New menu, seasonal special, private dining availability, catering services.
                  The banner space at the bottom earns its place for a restaurant. Instagram is
                  usually more relevant than LinkedIn for food businesses — it's where the photos
                  are. An OpenTable or Resy link is a direct conversion driver.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Law firm or solo attorney</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Sarah Chen</div>
                  <div className="text-muted text-xs">Attorney at Law | Chen Law Office</div>
                  <div className="text-muted text-xs">Bar #CA 123456 | T: +1 (415) 555-0134</div>
                  <div className="text-primary text-xs">chenlaw.com | Schedule a consultation →</div>
                  <div className="mt-2 text-xs text-muted italic border-t border-border pt-2 text-[10px]">This email may contain confidential and privileged information. If you are not the intended recipient, please notify the sender...</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Legal signatures need the bar number and usually a confidentiality disclaimer.
                  Both are here, with the disclaimer set small and separated visually. A Calendly
                  link for consultations works well for solo attorneys and small firms — it converts
                  interested parties into booked consultations without phone tag. See the{" "}
                  <Link href="/email-signature-for-business" className="text-primary underline underline-offset-2">
                    business signature guide
                  </Link>{" "}
                  for managing signatures across a multi-attorney firm.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Marketing or creative agency</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Alex Kim</div>
                  <div className="text-muted text-xs">Brand Strategist | Bright Lines Agency</div>
                  <div className="text-muted text-xs">brightlines.agency | LinkedIn</div>
                  <div className="text-primary text-xs">📅 Book a discovery call →</div>
                  <div className="mt-2 text-xs text-muted italic border-t border-border pt-2">📋 New case study: How we grew Acme's conversion rate 40% →</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Agencies benefit from using the signature as a soft portfolio showcase. The case
                  study link at the bottom is appropriate for agencies sending proposals or follow-up
                  emails — it naturally surfaces your work without feeling pushy. A discovery call
                  CTA is standard for agencies. The signature should look visually polished — your
                  design quality is part of the pitch.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Hair salon or beauty studio</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Maya Torres</div>
                  <div className="text-muted text-xs">Owner & Lead Stylist | Studio Maya</div>
                  <div className="text-muted text-xs">T: +1 (213) 555-0112 | studiomaya.com</div>
                  <div className="text-primary text-xs">Instagram | Book online →</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  For a salon, an online booking link is the most valuable signature element —
                  it converts every email exchange directly into a booked appointment. Instagram
                  is the primary portfolio platform for beauty services. Keep the signature
                  short; most client communication is via text or DM. The email signature is
                  mainly for new client inquiries and any business-to-business communication.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">B2B services (accountant, consultant, IT support)</h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">James Park</div>
                  <div className="text-muted text-xs">CPA | Park Accounting Services</div>
                  <div className="text-muted text-xs">T: +1 (312) 555-0189 | D: +1 (312) 555-0190</div>
                  <div className="text-primary text-xs">parkaccounting.com | LinkedIn</div>
                  <div className="mt-2 text-xs text-muted italic border-t border-border pt-2 text-[10px]">This email is confidential. It may contain tax advice intended solely for the addressee...</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Professional services firms communicate heavily by email, and trust is the
                  primary currency. A polished signature with a direct phone number and a
                  professional credential (CPA, etc.) signals that this is an established
                  practice. LinkedIn is appropriate for the B2B context. A short confidentiality
                  notice is common in accounting and financial services.
                </p>
              </div>

            </div>
          </section>

          {/* When to upgrade */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              When to upgrade to a team plan
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              The free approach works well for small teams. Here are the signs that it's worth
              moving to a team or business plan (whether NeatStamp Teams or another tool):
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  signal: "You have more than 15–20 people",
                  why: "At this scale, manual rollout and maintenance becomes a significant recurring time cost. Centralized management pays for itself.",
                },
                {
                  signal: "You want to run banner campaigns centrally",
                  why: "If you want to change the promotional banner for all 25 staff members simultaneously — for a new product launch or seasonal campaign — doing it individually is impractical. Centralized tools let you update everyone at once.",
                },
                {
                  signal: "New hires frequently slip through without a correct signature",
                  why: "If you're adding people regularly and the signature setup keeps getting missed or done wrong, automated provisioning (new user gets a correct signature automatically) is worth the cost.",
                },
                {
                  signal: "You want to track clicks on signature links",
                  why: "Paid tools offer analytics: how many people clicked the banner, which CTA performed better. If you're running marketing campaigns through signatures, this data is useful.",
                },
                {
                  signal: "Your team uses multiple email clients and platforms",
                  why: "Server-side signature tools (which append signatures regardless of the client) eliminate the compatibility headache entirely. Worth it when managing diverse device environments.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-surface p-4">
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{item.signal}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.why}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted leading-relaxed">
              If none of those apply — you have under 15 people, a stable team, and you're not
              running active signature campaigns — the free approach is completely adequate.
            </p>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/email-signature-maker",
                  title: "Email Signature Maker",
                  desc: "Build your first template. Free, no account needed.",
                },
                {
                  href: "/email-signature-for-business",
                  title: "Business Email Signatures",
                  desc: "Deeper guide on team rollout, brand guidelines, and departments.",
                },
                {
                  href: "/email-signature-with-logo",
                  title: "Email Signature with Logo",
                  desc: "Adding your logo correctly — sizing, formats, hosting.",
                },
                {
                  href: "/email-signature-examples-with-logo",
                  title: "Signature Examples with Logo",
                  desc: "Real examples across different industries and styles.",
                },
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature",
                  desc: "What makes a signature look genuinely professional.",
                },
                {
                  href: "/email-signature-gmail",
                  title: "Gmail Signature Setup",
                  desc: "Installing signatures in Gmail — for most small businesses.",
                },
                {
                  href: "/email-signature-outlook-365",
                  title: "Outlook 365 Signatures",
                  desc: "Setup and admin options for Microsoft 365 businesses.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Color, typography, and layout principles.",
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
              Get your team's signatures sorted today
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Build a template in NeatStamp, share it with your team, and you're done.
              Free forever for individuals. No watermarks. Works in Gmail, Outlook, and Apple Mail.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create My Business Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
