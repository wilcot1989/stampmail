import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Accountants & CPAs | NeatStamp",
  description:
    "What to include in an accountant's email signature — CPA credentials, firm branding, compliance notes, and client trust signals. Practical guide with examples.",
  alternates: { canonical: "https://neatstamp.com/email-signature-for-accountant" },
};

const faqs = [
  {
    q: "Should CPAs include their license number in their email signature?",
    a: "Yes, and it's worth doing even in states where it isn't technically required. Your CPA license number is publicly searchable through your state board, so including it signals confidence — you're not hiding anything. It also gives clients a quick way to verify your credentials without having to ask. Format it simply: 'CPA License No. 123456' or 'State CPA #123456'. If you hold licenses in multiple states, list the primary one or both if your practice covers multiple jurisdictions.",
  },
  {
    q: "What credentials should an accountant list after their name?",
    a: "List only the credentials that are active and directly relevant to your practice. CPA is the primary one. EA (Enrolled Agent) is worth including if you do a significant amount of tax work. CMA, CFE, ABV, PFS — include them if they're relevant to the work you do and if the recipient is likely to recognize them. Don't pad the list: three well-known credentials look more credible than seven obscure ones. Order them by relevance to your primary practice area.",
  },
  {
    q: "Do accountants need a disclaimer in their email signature?",
    a: "Not legally in most cases, but a brief disclaimer is good practice for several reasons. Tax advice disclaimers ('This communication is not intended as tax advice for any specific situation') can help manage client expectations about the nature of general guidance versus formal engagement work. They also reduce the risk of misunderstandings about informal email exchanges. Keep it short — two sentences. The full engagement letter handles the formal scope-of-services language; your signature disclaimer just reinforces that email exchanges aren't a substitute for formal advice.",
  },
  {
    q: "How should a sole practitioner accountant's signature differ from a Big 4 employee?",
    a: "Sole practitioners need more information in their signature because they are the brand. Include your CPA license, your firm name (even if it's just 'Jane Smith, CPA'), your phone number, and your website. Services listed as 2–3 specialties help new contacts understand what you do. At a Big 4 or large regional firm, your firm's brand carries the recognition weight — your signature can be leaner: name, credentials, title, practice group, contact info, and the firm's required legal footer. The firm's branding team usually handles the template.",
  },
  {
    q: "Is it unprofessional to include a headshot in an accounting email signature?",
    a: "Not at all — it depends on your practice and client base. For accountants who work closely with individual clients (tax preparation, personal financial planning, small business advisory), a professional photo builds rapport and makes you more approachable. For those working primarily with institutional clients, CFOs, or audit committees, a photo-free signature reads as more formal and may be more appropriate. If you do include a photo, use a professional headshot, not a conference photo or LinkedIn snapshot.",
  },
  {
    q: "Should an accounting firm standardize signatures across all staff?",
    a: "Yes, 100%. Inconsistent signatures make a firm look disorganized, especially when a client is emailing multiple people — the partner, the manager, and the staff accountant — and gets three completely different signature formats. Create a master template with your firm colors, logo, and font. Leave fields for name, title, credentials, direct line, and email. Roll it out firm-wide. The investment is a few hours of setup; the payoff is a consistently professional impression across every client touchpoint.",
  },
  {
    q: "Can I include my firm's service specialties in my signature?",
    a: "Yes, and for smaller firms it's a good idea. Two or three specialties — 'Tax Planning | Small Business Advisory | Bookkeeping' — immediately tell a new contact what you focus on. For larger firms where the website handles that context, it's less necessary. Avoid long lists of every service you offer; that reads as a marketing brochure, not a professional signature. Think of it as a two-second pitch for what you're known for.",
  },
  {
    q: "What's the right font size for an accountant's email signature?",
    a: "Your name should be 13–14px, bold. Everything else — title, firm name, contact info — works well at 11–12px in regular weight. The disclaimer at the bottom should drop to 10–11px in a lighter gray. Using a font that matches your firm's branding materials (often a sans-serif like Arial, Calibri, or a custom brand font) creates visual consistency. Avoid fonts that aren't web-safe, since they'll fall back to defaults in clients that don't support them.",
  },
];

export default function EmailSignatureForAccountantPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature for Accountants",
            url: "https://neatstamp.com/email-signature-for-accountant",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signature for Accountants & CPAs
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Your clients trust you with their most sensitive financial information. Your email
              signature should reflect that same standard of care — complete credentials, firm
              branding, and the right professional signals for every email you send.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build Your CPA Signature — Free
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <p className="mt-3 text-sm text-muted">No account needed. Free forever for individuals.</p>
          </div>

          {/* Intro */}
          <section className="mb-16">
            <p className="text-muted leading-relaxed mb-4 text-lg">
              Accountants and CPAs are in a trust business. Clients hand over their tax returns,
              their business financials, their payroll data. Every interaction — including the
              hundreds of emails you send each year — is an opportunity to reinforce that they
              made the right choice hiring you. A sloppy, incomplete, or outdated email signature
              does the opposite.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The accounting profession has specific credentialing standards that belong in your
              signature: your CPA license, your firm affiliation, and in many cases a brief
              disclaimer about the nature of your email communications. Most accountants I talk
              to set up their signature once, never revisit it, and are sending emails with
              outdated firm names or missing credentials years later.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              This guide covers exactly what to include, what to leave out, how to structure
              it for maximum clarity, and what the common mistakes look like so you can avoid
              them. Whether you're a sole practitioner, a manager at a regional firm, or
              setting up signatures for your entire accounting team, the guidance here applies.
            </p>
            <p className="text-muted leading-relaxed">
              For a broader foundation on professional signature design, the{" "}
              <Link href="/professional-email-signature" className="text-primary underline underline-offset-2">
                professional email signature guide
              </Link>{" "}
              covers the universal principles. This page focuses on what's specific to accounting.
            </p>
          </section>

          {/* Why accountants need a great signature */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why your accounting email signature matters more than you think
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              In most industries, a mediocre email signature is just a minor missed opportunity.
              In accounting, it's a more significant problem. Here's why.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              Credentials are the product
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              When a client hires a CPA instead of an uncredentialed bookkeeper, they're paying
              specifically for the licensure, the ethical obligations, and the professional
              standards that come with it. Your CPA designation represents years of education,
              a rigorous exam, and continuing education requirements. Not displaying it in your
              signature is like a doctor sending emails without mentioning they're an MD — you're
              underrepresenting your own qualifications.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The same applies to specialty certifications. If you're a Certified Fraud Examiner
              (CFE) and you work with clients on internal controls, that credential belongs in
              your signature. If you're a Personal Financial Specialist (PFS) working with
              high-net-worth individuals, list it. These abbreviations mean something to the
              clients who are looking for exactly those skills.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              Client communications happen at high-stress moments
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Think about when clients actually read your emails carefully: it's when they've
              got an IRS notice, when they're making a major business decision, when they're
              worried about a tax liability. At those moments, your signature is part of the
              signal they're using to gauge their confidence in you. A polished, complete,
              professional signature reinforces that they're in good hands. A signature with
              a broken logo, a phone number for a firm you left three years ago, or no
              credentials listed does the opposite.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              Referrals happen in forwarded emails
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              A significant share of accounting clients come through referrals. When your
              current client forwards one of your emails to a friend who's looking for a CPA,
              that forwarded email — with your signature intact — is often the first impression
              that new prospect gets. Your signature is doing sales work you don't even know
              about. It needs to include your contact information, your credentials, and your
              firm website so that referral can find you.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              Firm-wide consistency builds brand equity
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              If you manage a team, your staff accountants are sending dozens of client emails
              every day. Each one of those emails is a brand impression for your firm. When
              every team member has a consistent signature — same logo, same fonts, same colors,
              same contact format — it signals a well-run, professional operation. When every
              person has a different format, it signals the opposite.
            </p>
            <p className="text-muted leading-relaxed">
              The{" "}
              <Link href="/email-signature-for-business" className="text-primary underline underline-offset-2">
                business email signature guide
              </Link>{" "}
              covers the mechanics of rolling out consistent signatures across a team — the
              same approach works for an accounting firm of 3 or 300.
            </p>
          </section>

          {/* What to include */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What to include in your accountant email signature
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Here's a complete breakdown of every element, what it does, and when to include it.
            </p>

            <div className="space-y-5">
              {[
                {
                  field: "Full name + credentials",
                  required: "Always",
                  notes: "Your name followed by your active credentials: 'Michael Chen, CPA' or 'Michael Chen, CPA, CFE' if both are relevant. Don't list credentials you've let lapse. Bold your name — it's the primary identifier. Order credentials by professional significance: CPA first, then specialty certifications, then others.",
                },
                {
                  field: "Title and firm name",
                  required: "Always",
                  notes: "Be specific: 'Senior Tax Manager' beats 'Manager.' Your firm name should match your registered business name exactly. For sole practitioners, 'Jane Kim, CPA' with no separate firm line is clean and accurate. 'Principal' or 'Managing Partner' communicates your position at a glance.",
                },
                {
                  field: "CPA license number",
                  required: "Recommended",
                  notes: "Not required in every state, but worth including. It takes one line and provides instant verification. Format: 'CPA License: CA #99234' or 'Licensed CPA, Illinois #12345.' For multi-state licenses, list your primary state or the states most relevant to your clients.",
                },
                {
                  field: "Direct phone number",
                  required: "Always",
                  notes: "Your direct line, not just the main office number. During tax season especially, clients need to reach the specific person working on their account. Include your mobile if you use it for client calls — many accounting clients expect some level of accessibility outside business hours.",
                },
                {
                  field: "Firm website",
                  required: "Always",
                  notes: "Link to your firm website or your individual bio page if one exists. The individual bio is better — it gives prospective clients immediate access to your background, specialties, and credentials without having to navigate a site. Make sure it's up to date before you link to it.",
                },
                {
                  field: "Firm logo",
                  required: "Recommended",
                  notes: "A properly sized firm logo adds instant brand recognition and visual polish. Keep it 150–200px wide maximum, uploaded at 2× resolution for retina screens. If you're a sole practitioner without a logo, the text-only format is fine — don't use a generic clipart logo as a substitute.",
                },
                {
                  field: "Services / specialties",
                  required: "Optional — useful for smaller firms",
                  notes: "Two or three specialties help new contacts quickly understand your focus: 'Tax Planning | Business Advisory | Nonprofit Accounting.' For larger firms where the website handles this context, skip it to keep the signature clean. Never list more than three.",
                },
                {
                  field: "Disclaimer",
                  required: "Recommended",
                  notes: "A brief two-sentence disclaimer protects you in situations where a client might interpret general email guidance as formal advice: 'The contents of this email are informational only and do not constitute tax, legal, or accounting advice. For advice specific to your situation, please contact us to establish a formal engagement.' Place it below a visual divider in 10px gray text.",
                },
                {
                  field: "Social links",
                  required: "Optional",
                  notes: "LinkedIn is appropriate for most accounting professionals. It's where colleagues, prospects, and referrers look you up. A link to your firm's LinkedIn page works if you don't maintain an individual profile. Skip Facebook, Twitter/X, and Instagram unless they serve a specific professional purpose.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-5">
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

          {/* Example signature */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Example accountant email signature
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Here's what a well-structured CPA signature looks like in practice — for a tax
              manager at a mid-size regional firm. Adjust to your title, credentials, and context.
            </p>

            <div className="rounded-xl border-l-4 border-primary bg-surface p-6 font-mono text-sm leading-relaxed mb-6">
              <div className="text-foreground font-bold text-base">Sarah Okafor, CPA, CFP®</div>
              <div className="text-muted">Tax Manager | Individual & Business Tax</div>
              <div className="text-muted">Greenfield Advisory Group</div>
              <div className="text-muted mt-2">D: (312) 555-0177 | M: (312) 555-0198</div>
              <div className="text-primary">greenfieldadvisory.com/team/okafor</div>
              <div className="text-muted text-xs mt-2">CPA License: IL #67823</div>
              <div className="border-t border-border mt-4 pt-3">
                <div className="text-muted text-xs italic leading-relaxed">
                  This email is informational only and does not constitute tax, legal, or accounting
                  advice specific to your situation. Contact us to establish a formal engagement for
                  advice tailored to your circumstances.
                </div>
              </div>
            </div>

            <p className="text-muted leading-relaxed mb-4">
              Notice what this signature does efficiently: credentials are right after the name
              (hard to miss), the title specifies the type of work so new contacts immediately
              know whether Sarah can help them, and the license number is there for verification
              without dominating the signature. The disclaimer is brief and practical — two sentences.
            </p>
            <p className="text-muted leading-relaxed">
              For a sole practitioner, add a line with two or three service specialties. For a
              staff accountant at a Big 4 firm, remove the license number line and the disclaimer
              (the firm has its own standard footer) and keep the contact information lean.
              Browse{" "}
              <Link href="/examples" className="text-primary underline underline-offset-2">
                signature examples
              </Link>{" "}
              to see how these elements come together in different layouts.
            </p>
          </section>

          {/* Step-by-step with NeatStamp */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to build your accountant signature with NeatStamp
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              The whole process takes about 10 minutes. Here's exactly what to do:
            </p>

            <ol className="space-y-5">
              {[
                {
                  step: "Open the editor and pick a template",
                  detail: "Go to the NeatStamp editor and choose a professional template — the 'Classic' and 'Corporate' layouts work well for accounting professionals. Both are clean, table-based, and render correctly in Gmail, Outlook, and Apple Mail.",
                },
                {
                  step: "Fill in your name and credentials",
                  detail: "Enter your full name followed by your credentials in the name field: 'Michael Chen, CPA' or 'Michael Chen, CPA, CFE.' The editor formats the name in bold automatically. Your credentials will render at the same size as your name — this is correct.",
                },
                {
                  step: "Add your title, firm, and contact details",
                  detail: "Fill in your job title, firm name, direct phone number, and website URL. If you want to include your CPA license number, add it in the secondary information field or the custom text area below your contact details.",
                },
                {
                  step: "Upload your firm logo",
                  detail: "Upload your logo at 2× the intended display size for sharp rendering on retina screens. If your logo is 150px wide in the signature, upload a 300px version. The editor handles the display sizing. PNG with transparent background works best.",
                },
                {
                  step: "Add your disclaimer",
                  detail: "Paste your disclaimer text into the footer field. The editor styles it in a smaller gray font automatically. Keep it under 50 words — the engagement letter handles the formal scope language.",
                },
                {
                  step: "Export and install",
                  detail: "Download the HTML file and follow the instructions for your email client. The editor has direct guides for Gmail and Outlook. For firm-wide rollout, export the HTML and share it with your IT contact or office manager.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">{item.step}</div>
                    <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/editor"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow hover:bg-primary-dark transition-all"
              >
                Create Your CPA Signature — Free
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-6 py-3 text-base font-semibold text-foreground hover:border-primary transition-all"
              >
                Browse Templates
              </Link>
            </div>
          </section>

          {/* Common mistakes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Common mistakes accountants make with their email signatures
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: "Not listing CPA credentials",
                  why: "This is the most common and most damaging mistake. You earned that designation — display it. Every email you send without 'CPA' after your name is an email that doesn't communicate your full professional qualifications. Some clients genuinely don't know the difference between a bookkeeper and a licensed CPA until they see the credential.",
                },
                {
                  mistake: "Using an outdated firm name or phone number",
                  why: "Accounting professionals often change firms, go solo, or merge practices. If you set up your signature three years ago and haven't updated it since, there's a real chance it references an old firm or a phone number you've since changed. Quarterly, spend five minutes checking that everything in your signature is still accurate.",
                },
                {
                  mistake: "Image-only signatures",
                  why: "Some accountants create their signature as a single graphic with all the information baked in. It looks consistent but breaks in practice: phone numbers can't be tapped on mobile, email addresses can't be copied, and corporate email clients often block images entirely. Use real text for your contact information.",
                },
                {
                  mistake: "Making the disclaimer too long",
                  why: "I've seen accounting email signatures with 200-word disclaimer paragraphs that are larger than the signature itself. A disclaimer that long gets ignored and undermines the clean professional look you're going for. Two sentences is enough. The engagement letter handles the substantive scope-of-services language.",
                },
                {
                  mistake: "Inconsistent format across the team",
                  why: "If you manage a team and everyone has a different signature format, it looks like your firm doesn't have basic operational standards. A client emailing your partner, manager, and staff accountant in the same thread gets three different visual impressions. This is easily fixed with a shared template.",
                },
                {
                  mistake: "Skipping the website link",
                  why: "Your website — or your individual bio page — is where prospective clients go to evaluate whether they want to hire you. Not including it in your signature means every forwarded email, every new introduction, every referral has to find you some other way. It's one link, and it does significant work.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 rounded-lg border border-red-100 bg-red-50 p-5">
                  <span className="text-red-500 text-lg font-bold flex-shrink-0 mt-0.5">✗</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.mistake}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pro tips */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Pro tips for accountants
            </h2>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Use two signatures: one for clients, one for internal</h3>
                <p className="text-muted leading-relaxed">
                  Your full external signature with credentials, logo, and disclaimer doesn't need
                  to appear on every internal email reply. Set up a shorter internal version —
                  just your name, title, and direct line — for emails within the firm. Both Gmail
                  and Outlook let you switch between signatures. It saves visual clutter and your
                  colleagues don't need to read your disclaimer every time you reply to a thread.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Update your signature before tax season starts</h3>
                <p className="text-muted leading-relaxed">
                  Tax season is when you're sending the most client emails. It's also when you're
                  the busiest and least likely to notice that your signature has outdated information.
                  Make it a practice to review your signature in late January — before the crunch
                  hits — and confirm that your phone number, email, firm name, and website are all
                  current. Fifteen minutes now saves embarrassment later.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">For Gmail users: check signature rendering in Outlook</h3>
                <p className="text-muted leading-relaxed">
                  Most corporate clients use Outlook. If your firm uses Gmail internally but your
                  clients are on Outlook, test how your signature renders in Outlook before you
                  finalize it. Font substitutions and alignment issues that look fine in Gmail
                  can break badly in Outlook's rendering engine. The{" "}
                  <Link href="/email-signature-outlook" className="text-primary underline underline-offset-2">
                    Outlook signature guide
                  </Link>{" "}
                  covers the specific settings to check.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Link to your bio page, not your homepage</h3>
                <p className="text-muted leading-relaxed">
                  If your firm has individual bio pages, link to yours rather than the firm homepage.
                  A prospective client who received a referral to you specifically wants to see your
                  credentials, your experience, your specialties. Your bio page delivers that
                  immediately. The homepage makes them search for you. Keep your bio updated —
                  add recent credentials, update your practice description annually.
                </p>
              </div>
            </div>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { href: "/professional-email-signature", title: "Professional Email Signature", desc: "The complete guide to what makes a signature genuinely professional." },
                { href: "/email-signature-for-business", title: "Email Signature for Business", desc: "Roll out consistent signatures across an entire firm or team." },
                { href: "/email-signature-with-logo", title: "Email Signature with Logo", desc: "Logo sizing, file formats, and placement done right." },
                { href: "/email-signature-gmail", title: "Gmail Signature Setup", desc: "Step-by-step instructions for installing your signature in Gmail." },
                { href: "/email-signature-outlook", title: "Outlook Signature Setup", desc: "How to install and manage signatures in Microsoft Outlook." },
                { href: "/email-signature-for-consultant", title: "Email Signature for Consultants", desc: "Relevant if you do advisory work alongside accounting services." },
                { href: "/templates", title: "Signature Templates", desc: "Browse professional templates ready to customize for your firm." },
                { href: "/blog/email-signature-best-practices", title: "Email Signature Best Practices", desc: "The definitive guide to what works and what doesn't in 2026." },
                { href: "/email-signature-for-lawyer", title: "Email Signature for Lawyers", desc: "How legal professionals handle credentials and disclaimers." },
                { href: "/alternative-to-wisestamp", title: "WiseStamp Alternative", desc: "How NeatStamp compares if you're evaluating signature tools." },
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
                <details key={i} className="group rounded-lg border border-border bg-white">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-semibold text-foreground">
                    {faq.q}
                    <svg className="h-5 w-5 text-muted transition-transform group-open:rotate-180 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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
              Build your accountant signature today
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Professional, properly formatted, works in Gmail and Outlook.
              Free, no account required, ready to install in under 10 minutes.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create Your CPA Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
