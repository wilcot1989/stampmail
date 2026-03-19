import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signatures for Business — Brand Every Email (2026) | NeatStamp",
  description:
    "Why consistent team signatures matter, how to roll out across departments, and what a business email signature actually needs. Free guide.",
  alternates: { canonical: "https://neatstamp.com/email-signature-for-business" },
};

const faqs = [
  {
    q: "How do I roll out a consistent email signature to the whole team?",
    a: "The easiest approach for small teams is to create a master signature in NeatStamp, share the HTML file with each person, and give them a one-page instruction sheet for their specific email client. For larger teams, look into email signature management tools that deploy via your email provider's admin console — Google Workspace and Microsoft 365 both support this at the admin level.",
  },
  {
    q: "Should every department have the same signature template?",
    a: "The structure and branding should be consistent — same font, same colors, same logo placement. But the content can differ. Sales signatures often include a Calendly link and a CTA banner. Support signatures sometimes include the team name rather than an individual name. Executives often use a shorter, more minimal version. One template with a few variations is a sensible approach.",
  },
  {
    q: "Can I include a promotional banner in a business email signature?",
    a: "Yes, and it can be effective. A banner below the main signature — 600px wide, 100–150px tall — is a good place to promote a product launch, a webinar, a case study, or a seasonal offer. Swap it out every 4–6 weeks so it doesn't go stale. Make sure it links somewhere useful.",
  },
  {
    q: "What's the right size for a company logo in an email signature?",
    a: "Keep logo width between 120px and 180px. If your logo is landscape-oriented (wider than tall), stay toward 150–180px. If it's square or portrait, 100–120px is usually enough. Upload at 2× for retina sharpness, then constrain with HTML width and height attributes. Keep file size under 80KB.",
  },
  {
    q: "Does having consistent signatures actually affect how we're perceived?",
    a: "Yes, measurably so. Inconsistent signatures — some people with logos, some without, different fonts, different phone numbers — create a patchwork impression. It signals that the company lacks internal standards. Consistent signatures are a small thing that adds up to a coherent brand presence across every single email sent.",
  },
  {
    q: "Should we include a legal disclaimer in our business email signature?",
    a: "It depends on your industry and jurisdiction. Law firms, financial services companies, and healthcare organizations often include them by policy or legal requirement. For most other businesses, a brief confidentiality notice is optional. If you do include one, put it below a divider line in a smaller font (10–11px) so it doesn't dominate the signature visually.",
  },
  {
    q: "What's the difference between a personal signature and a centrally-managed one?",
    a: "A personal signature is installed by the individual in their email client settings. A centrally-managed signature is applied by the mail server or an email signature management platform, so it appends to every outgoing email regardless of what the individual has set up. Server-side signatures are more consistent but come with limitations — they can't be personalized at the field level without a paid tool, and they sometimes appear after a Gmail thread divider rather than inline.",
  },
  {
    q: "How often should we update our business email signature?",
    a: "Review it when any of these change: logo, brand colors, phone numbers, office address, website URL, or whenever you run a major campaign that warrants a banner. Most companies do a formal review once or twice a year. Don't update signatures so frequently that employees start ignoring the instructions.",
  },
];

export default function EmailSignatureForBusinessPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature for Business",
            url: "https://neatstamp.com/email-signature-for-business",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signatures for Business
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              If your team of 20 sends an average of 30 emails each per day, that's
              600 branded impressions daily — or about 150,000 a year. Most companies
              leave those impressions to chance. Here's how to stop doing that.
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
              Why email signature consistency matters more than most companies realize
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-lg">
              Walk through the sent folders of a 15-person company and you'll typically find
              five or six different signature styles. One person is using the template from the
              company rebrand two years ago. Another is using plain text with no logo. A third
              has the old phone number from when the company was at a different address. One
              person has Comic Sans.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Clients and prospects don't see your internal branding work. They don't see your
              brand guidelines document or your Figma component library. What they see is the
              email you sent them. If that email ends with a signature that looks like it belongs
              to a different company than the one on your website, that's a real gap — and it
              happens in nearly every business that hasn't explicitly addressed it.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Consistent business email signatures accomplish a few things at once. They reinforce
              your brand on every outgoing message. They make it easy for recipients to reach the
              right person. They create a professional impression that compounds over time,
              especially in industries where you're emailing the same clients and partners
              repeatedly across months or years.
            </p>
            <p className="text-muted leading-relaxed">
              And they're not hard to do well — they just require someone to actually own the
              process. This guide covers what to put in business signatures, how to structure
              them for different departments, and how to roll them out without turning it into
              a multi-week project.
            </p>
          </section>

          {/* What a business signature needs */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              What belongs in a business email signature
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              There's a baseline set of fields that every business email signature should include,
              and then there are optional additions that make sense for certain roles. Here's how
              to think about each one.
            </p>

            <div className="space-y-5">
              {[
                {
                  field: "Full name",
                  required: "Always",
                  notes:
                    "Use the name the person goes by professionally. Bold it — it's the primary identifier. If someone goes by a nickname that differs from their legal name (e.g., 'Bex' instead of 'Rebecca'), use that.",
                },
                {
                  field: "Job title",
                  required: "Always",
                  notes:
                    "Keep it accurate and concise. 'Senior Account Manager' is fine. 'Senior Account Manager & Client Success Lead & Growth Strategist' is too long — pick the title that matters most in the context of who they're emailing.",
                },
                {
                  field: "Company name",
                  required: "Always for external email",
                  notes:
                    "Essential context for recipients who don't already know your company. For internal email threads, it's redundant — your colleagues know where they work.",
                },
                {
                  field: "Company logo",
                  required: "Strongly recommended",
                  notes:
                    "Consistent logo placement across all signatures is one of the highest-impact branding moves. Keep it at 120–180px wide with a transparent PNG background. See the full guide on email signatures with logos for sizing specifics.",
                },
                {
                  field: "Direct phone number",
                  required: "Recommended",
                  notes:
                    "One number — the one they actually answer. If a role has both a direct line and a mobile (common in sales and real estate), both can be listed. For roles that are primarily internal or async, it's fine to omit.",
                },
                {
                  field: "Website URL",
                  required: "Recommended",
                  notes:
                    "Link to the company homepage or a relevant landing page. If your website is outdated or under construction, leave this out for now rather than linking to something that undermines the impression.",
                },
                {
                  field: "Social media links",
                  required: "Context-dependent",
                  notes:
                    "LinkedIn is appropriate for most business signatures. For B2C brands with an active social presence, Instagram or Twitter/X may be worth including. Keep it to two at most — a row of six social icons adds visual noise without adding real value.",
                },
                {
                  field: "CTA / Promotional banner",
                  required: "Optional",
                  notes:
                    "A Calendly link for booking calls is highly effective for sales and consulting roles. A promotional banner for a current campaign works well for marketing. Skip these for support, finance, and operational roles where they feel out of place.",
                },
                {
                  field: "Legal disclaimer",
                  required: "Industry-dependent",
                  notes:
                    "Required for law, financial services, healthcare, and some regulated industries. Optional for everyone else. If you include one, use 10–11px font, gray color, and separate it visually with a divider so it doesn't crowd the main signature.",
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

          {/* Department templates */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Signature templates by department
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              The core structure should be the same across your company, but the content varies
              by role. Here's how I'd think about it for four common departments.
            </p>

            <div className="space-y-10">

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Sales team signatures
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Maya Chen</div>
                  <div className="text-muted">Account Executive | Fieldstone SaaS</div>
                  <div className="text-muted">M: +1 (415) 555-0142</div>
                  <div className="text-primary">fieldstone.io</div>
                  <div className="mt-2 text-xs text-primary">📅 Book a 20-min call → calendly.com/maya-fieldstone</div>
                  <div className="mt-2 text-xs text-muted italic border-t border-border pt-2">🎉 New: Fieldstone 3.0 is live — see what's new →</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Sales signatures benefit most from a Calendly link — it removes friction from
                  booking a discovery call. A rotating campaign banner is also worth doing here;
                  every outbound email becomes a soft touchpoint for whatever you're currently
                  promoting. The banner should be an image file (600×120px) that links to a
                  campaign page, not just plain text. See our guide on{" "}
                  <Link href="/email-signature-with-logo" className="text-primary underline underline-offset-2">
                    email signatures with logos
                  </Link>{" "}
                  for how to handle images correctly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Customer support signatures
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Alex Torres</div>
                  <div className="text-muted">Customer Support | Fieldstone SaaS</div>
                  <div className="text-muted">support@fieldstone.io | help.fieldstone.io</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Support signatures are usually the leanest. The person's role (Customer Support,
                  not a specific title) is more useful than a direct phone number, because
                  customers should be reaching the team rather than an individual. A link to the
                  help center is worth including. Skip promotional banners here — the context is
                  solving a problem, not selling. Some support teams use a team name like "The
                  Fieldstone Support Team" instead of individual names, particularly for shared
                  inboxes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Executive signatures
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Jordan Rivera</div>
                  <div className="text-muted">CEO | Fieldstone SaaS</div>
                  <div className="text-primary">fieldstone.io</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Executive signatures are typically the most minimal. Title and company website is
                  often enough — the brevity signals confidence rather than laziness. A phone number
                  is appropriate if the executive regularly takes calls with external stakeholders.
                  Skip the promotional banners; they can feel out of place coming from the CEO.
                  If you're a{" "}
                  <Link href="/small-business-email-signature" className="text-primary underline underline-offset-2">
                    small business
                  </Link>{" "}
                  where the CEO is also the salesperson, a Calendly link makes sense here.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Marketing team signatures
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed mb-3">
                  <div className="text-foreground font-bold">Priya Nair</div>
                  <div className="text-muted">Head of Marketing | Fieldstone SaaS</div>
                  <div className="text-muted">fieldstone.io | LinkedIn</div>
                  <div className="mt-2 text-xs text-muted italic border-t border-border pt-2">📖 New case study: How Acme Corp grew 3× with Fieldstone →</div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Marketing signatures can afford to be slightly richer than others, because
                  content is the currency of the role. A link to a recent piece of content — a
                  case study, a blog post, a webinar — is entirely appropriate and can drive
                  meaningful traffic when multiplied across dozens of outbound emails per day.
                  Social links make more sense here than in most other roles.
                </p>
              </div>

            </div>
          </section>

          {/* ROI of email branding */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The actual ROI of email signature branding
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Most companies think of email signatures as an afterthought — something you set up
              once and forget. But think about the math. A 20-person company where each person
              sends 40 emails a day is sending 800 emails per day, or around 200,000 per year.
              Every single one of those carries a signature.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              If you include a promotional banner in those signatures and just 0.5% of recipients
              click through, that's 1,000 clicks per year from zero additional spend. No ad budget,
              no campaign setup, no audience targeting. Just a banner at the bottom of emails you
              were already sending.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The brand reinforcement effect is harder to quantify but just as real. Consistent
              signatures with a proper logo and design create a professional impression across
              every touchpoint. The client who gets 50 emails from your team over six months
              has seen your brand 50 times. That familiarity matters when they're making a
              decision about renewing or expanding.
            </p>
            <p className="text-muted leading-relaxed">
              The cost of doing this well is a few hours of setup and a bit of coordination.
              The cost of not doing it is a constant leak of brand credibility that you probably
              don't notice because you're on the sending end.
            </p>
          </section>

          {/* How to roll out */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to roll out consistent signatures across your team
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              This doesn't have to be a major project. Here's a practical process that works
              for teams of 5 to 100 without needing IT support or a dedicated tool.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: "Step 1",
                  title: "Create a master template",
                  body: "Build one signature in the NeatStamp editor with placeholder text — {FirstName}, {Title}, {Phone}. Get the HTML. This is your company master.",
                },
                {
                  step: "Step 2",
                  title: "Create department variations",
                  body: "Duplicate the master template and modify it for sales (add Calendly CTA), support (remove phone, add help center link), and executive (remove CTA, keep it minimal). You probably need 2–4 variations total.",
                },
                {
                  step: "Step 3",
                  title: "Write a one-page installation guide",
                  body: "Cover the three main clients your team uses: Gmail, Outlook, and Apple Mail. Include screenshots. Make it specific — 'go to Settings → See all settings → General → Signature' not 'go to your email settings.' Short and concrete is better than thorough and confusing.",
                },
                {
                  step: "Step 4",
                  title: "Send a company-wide message",
                  body: "Explain why you're doing this (brand consistency, professional appearance), provide the guide and the correct template for their role, and set a deadline. Most people will comply if the instructions are clear and the update takes less than five minutes.",
                },
                {
                  step: "Step 5",
                  title: "Verify and follow up",
                  body: "Send a test email to yourself from a few different team members. Check that the logo loads, the links work, and the signature renders correctly. Follow up individually with anyone who hasn't updated or whose signature looks wrong.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary text-white flex flex-col items-center justify-center text-xs font-bold leading-tight text-center">
                    <span className="text-blue-200 text-[10px]">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Brand guidelines enforcement */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Enforcing brand guidelines without driving your team crazy
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              The biggest challenge with business email signatures isn't setting them up — it's
              keeping them consistent as the team grows and changes. People join, leave, get
              promoted, change their phone numbers, and switch email clients. Signatures drift.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              A few things that help:
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  title: "Add signature setup to your onboarding checklist",
                  detail:
                    "New employees should set up their signature on day one, alongside their email account and Slack. Include it as an explicit step with a link to the current template and installation guide.",
                },
                {
                  title: "Keep the guide somewhere everyone can find it",
                  detail:
                    "Your company wiki, Notion, or internal docs. When someone switches from PC to Mac, or from Gmail to Outlook, they need to be able to find the guide without asking someone else.",
                },
                {
                  title: "Do a quarterly audit",
                  detail:
                    "Once a quarter, ask everyone to forward you a sent email and check the signature. It takes 20 minutes and catches problems before they become habits. Alternatively, send yourself an email from each team member's account if you have access.",
                },
                {
                  title: "Consider a server-side solution if your team is large",
                  detail:
                    "Once you're past 30–50 people, manually managing signatures becomes painful. Tools like Exclaimer, Opensense, or Google Workspace's signature management can deploy signatures centrally. The trade-off is cost and some setup complexity, but the consistency gain is significant.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-surface p-4">
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <p className="text-muted leading-relaxed text-sm">
              If you're exploring centralized management, see the comparison in our{" "}
              <Link href="/email-signature-outlook-365" className="text-primary underline underline-offset-2">
                Outlook 365 signature guide
              </Link>{" "}
              — it covers admin deployment options for Microsoft 365 environments specifically.
            </p>
          </section>

          {/* Common mistakes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Business email signature mistakes to avoid
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: "Letting individuals choose their own format",
                  why: "The result is always inconsistency. Some people will do great work; others will use Comic Sans and a motivational quote. Give everyone the template and the instructions — the format isn't up for individual interpretation.",
                },
                {
                  mistake: "Using a logo that's too large",
                  why: "A logo that's 400px wide dominates the signature and looks like an ad. Keep it at 120–180px wide. Anything bigger creates visual imbalance and can trigger spam filters on some mail servers.",
                },
                {
                  mistake: "Too many social media icons",
                  why: "A row of 8 social icons (Facebook, Twitter, LinkedIn, Instagram, YouTube, Pinterest, TikTok, Spotify) looks desperate and clutters the layout. Pick the two that are actually relevant to your business and your audience.",
                },
                {
                  mistake: "Including the company's full mailing address",
                  why: "Unless you're a law firm, financial institution, or physical retail location where the address is operationally important, your full street address is just noise in a business email signature. Link to a 'contact us' page if people need to find you.",
                },
                {
                  mistake: "Never updating the promotional banner",
                  why: "A banner promoting your 'New Year's offer — January only!' that's still running in August actively undermines trust. Either commit to updating banners regularly (every 4–6 weeks) or leave them out.",
                },
                {
                  mistake: "Not testing across email clients",
                  why: "A signature that looks perfect in Gmail can look broken in Outlook, and vice versa. Before rolling out to the team, test by sending to accounts in Gmail, Outlook, and Apple Mail. NeatStamp generates table-based HTML that renders consistently across all three.",
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

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/email-signature-maker",
                  title: "Email Signature Maker",
                  desc: "Build your signature in 60 seconds. No account required.",
                },
                {
                  href: "/small-business-email-signature",
                  title: "Small Business Email Signatures",
                  desc: "Specific advice for small teams rolling out signatures without IT support.",
                },
                {
                  href: "/email-signature-with-logo",
                  title: "Email Signature with Logo",
                  desc: "Logo sizing, file formats, and placement that works in every client.",
                },
                {
                  href: "/email-signature-examples-with-logo",
                  title: "Email Signature Examples with Logo",
                  desc: "10+ real examples across different industries and roles.",
                },
                {
                  href: "/email-signature-outlook-365",
                  title: "Outlook 365 Signatures",
                  desc: "Admin deployment, roaming signatures, and IT policy options.",
                },
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature Guide",
                  desc: "The full breakdown of what makes a signature actually professional.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Typography, color, layout, and mobile rendering.",
                },
                {
                  href: "/email-signature-for-freelancers",
                  title: "Email Signature for Freelancers",
                  desc: "How solo operators can use signatures as a soft sales tool.",
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
              Build a master template in the NeatStamp editor, share it with your team,
              and you're done. Free, no account needed, works in every major email client.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create Your Business Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
