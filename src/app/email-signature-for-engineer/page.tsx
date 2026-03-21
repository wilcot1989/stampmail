import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Engineers (PE, Software, Civil) | NeatStamp",
  description:
    "What engineers should include in their email signature — PE license, GitHub, technical credentials, and minimal clean design. Practical guide with examples.",
  alternates: { canonical: "https://neatstamp.com/email-signature-for-engineer" },
};

const faqs = [
  {
    q: "Should engineers include their PE license number in their email signature?",
    a: "Yes, if you're a licensed Professional Engineer and you do work where that license is relevant — civil, structural, mechanical, electrical engineering especially. The PE license is a legal credential, not just a title, and displaying it signals that you bear the professional and legal responsibility that comes with the license. Format it as 'PE License: [State] #12345' or 'Licensed PE, California #C12345'. If you're licensed in multiple states, list the primary jurisdiction or the one most relevant to your current work.",
  },
  {
    q: "Is it appropriate for software engineers to link to their GitHub profile?",
    a: "Absolutely, especially for individual contributors and technical leads. Your GitHub is a public portfolio — it shows actual code, actual projects, and actual contribution history. A link to your profile (github.com/username) is more credible than any bullet point on a resume. Keep in mind that your profile should be reasonably active and presentable before you link to it. If your last commit was two years ago and your pinned repos are unfinished side projects, a GitHub link may raise more questions than it answers.",
  },
  {
    q: "What's the right length for an engineer's email signature?",
    a: "Short. Engineers tend to write emails that are already information-dense. A long signature at the bottom of a technical message adds noise. Aim for 4–6 lines: name and credentials, title and company, phone and email, website or LinkedIn, and optionally one specialty line. Everything else can live on your LinkedIn profile or personal site. If you're a PE, add the license number — that's worth the extra line. If you're at a company with required legal disclaimers in the footer, those will be added by the mail server and don't count against your personal signature length.",
  },
  {
    q: "Should a mechanical engineer's signature look different from a software engineer's?",
    a: "The content differs more than the format. A mechanical or civil engineer's signature typically includes a PE license number and possibly a state seal, reflects a firm name, and may include a project-related title like 'Principal Structural Engineer.' A software engineer's signature typically skips the license number (unless they're also a licensed engineer in a jurisdiction that requires it), includes a GitHub or portfolio link, and often has a shorter title. The visual format — clean, minimal, table-based HTML — works for both.",
  },
  {
    q: "Can I include my Stack Overflow or LinkedIn profile in my signature?",
    a: "LinkedIn makes sense as a standard professional link for almost any engineer. Stack Overflow is more niche — it's a strong signal in software engineering circles, especially if you have a high reputation score (say, 10,000+). If your Stack Overflow profile shows substantial contributions, it's worth including. Below a few thousand reputation, it adds a link without adding much signal. Limit social/profile links to two total in your signature — it stays clean and focused.",
  },
  {
    q: "How should an engineer at a large company handle signatures if the IT team controls them?",
    a: "Many large engineering firms and tech companies control email signatures centrally through IT. In that case, your personal signature options are limited — IT typically pushes a standard template to everyone. What you can usually control is whether your title is accurate, your phone number is listed, and whether optional fields like a photo or personal website are included. Check with your IT or HR team about what customization is allowed. If you're unsatisfied with the company-mandated format, that feedback is worth raising — you're not the only one.",
  },
  {
    q: "Should I include my engineering specialization in my signature?",
    a: "Yes, if it's not already clear from your title. 'Senior Engineer' tells someone very little. 'Senior Structural Engineer — Bridge Design' or 'Senior Software Engineer — Backend Infrastructure' is immediately useful context. For consulting engineers, specialization is especially valuable because prospective clients use email signatures to evaluate whether you can help with their specific problem. One specialty line, 3–6 words, below your title is all it takes.",
  },
  {
    q: "What font and color choices work best for engineering signatures?",
    a: "Conservative and legible. Sans-serif fonts — Arial, Calibri, Inter, or your company brand font — render cleanly across email clients. Stick to black or dark gray for the main text, a mid-gray for secondary information, and your company's primary color for links or a thin accent border if you want a visual element. Avoid colored fonts, gradient effects, or decorative borders — they look unprofessional in a technical context and sometimes break in older email clients like Outlook 2019. The engineering aesthetic is precise, not decorative.",
  },
];

export default function EmailSignatureForEngineerPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature for Engineers",
            url: "https://neatstamp.com/email-signature-for-engineer",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signature for Engineers
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Engineers value precision and efficiency. Your email signature should reflect both.
              Whether you're a licensed PE, a software engineer, or a civil engineer at a large
              firm, this guide covers exactly what to include and what to cut.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build Your Engineer Signature — Free
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <p className="mt-3 text-sm text-muted">No account needed. Free forever for individuals.</p>
          </div>

          {/* Intro */}
          <section className="mb-16">
            <p className="text-muted leading-relaxed mb-4 text-lg">
              Engineers tend to underestimate how much work an email signature does. You're often
              communicating with clients, contractors, regulators, procurement teams, and colleagues
              all through email. The signature that appears at the bottom of every one of those
              messages is communicating your credentials, your role, and your firm — whether you've
              thought about it or not.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The specific elements that matter depend on your discipline. A licensed Professional
              Engineer in civil or structural work has very different signature requirements from a
              software engineer at a tech company. Both benefit from the same core principles: clean
              layout, accurate credentials, and a format that renders correctly in every email client.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              This guide covers both worlds. The PE-specific guidance applies to civil, structural,
              mechanical, and electrical engineers who hold a professional license. The software
              engineering section covers portfolio links, GitHub, and the kind of technical signals
              that matter in that context. Most of the formatting guidance applies to everyone.
            </p>
            <p className="text-muted leading-relaxed">
              For the broader principles that apply across all professions, the{" "}
              <Link href="/professional-email-signature" className="text-primary underline underline-offset-2">
                professional email signature guide
              </Link>{" "}
              is a good starting point. This page focuses specifically on what engineers need.
            </p>
          </section>

          {/* Why engineers need a great signature */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why engineers need to take their signature seriously
            </h2>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              For licensed PEs: your signature is part of your professional identity
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              A PE license means you're legally responsible for the engineering work you stamp.
              When clients, contractors, or government agencies receive email from you, they need
              to know they're dealing with a licensed professional. Your PE designation in your
              signature isn't optional nicety — it's part of accurately representing your
              professional status.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              This matters especially for consulting engineers who work with multiple clients.
              A prospective client evaluating whether to hire you for a bridge inspection or a
              foundation analysis is looking at your signature as a quick credential check.
              "Senior Engineer" tells them very little. "Senior Structural Engineer, PE" tells
              them exactly what they need to know.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              For software engineers: your signature is a portfolio shortcut
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Software engineering is a field where what you've built matters more than any
              credential. A GitHub link in your signature gives every recipient — recruiters,
              collaborators, open source contributors, clients — immediate access to your actual
              work. It's more efficient than a portfolio website and more credible than a title.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              For senior engineers, staff engineers, and engineering managers who receive emails
              from candidates, vendors, and recruiters, a clean signature with a LinkedIn link
              also reduces the friction of anyone wanting to understand your background. The
              less friction, the better the professional relationship starts.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              Firms judge organization by operational details
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              When you're dealing with contractors, procurement teams, or large clients, they're
              often evaluating your firm alongside several others. Operational professionalism
              — consistent signatures, proper credentials displayed, accurate contact information
              — is a signal that the firm has its systems together. A signature with a missing
              phone number, an old firm name, or no credentials listed sends a different signal.
            </p>
            <p className="text-muted leading-relaxed">
              The{" "}
              <Link href="/email-signature-for-business" className="text-primary underline underline-offset-2">
                business email signature guide
              </Link>{" "}
              covers how engineering firms can roll out consistent signatures across their teams —
              the same approach works for a 5-person structural firm or a 500-person engineering
              consultancy.
            </p>
          </section>

          {/* What to include */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What to include in an engineer's email signature
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              The elements that belong in your signature depend on your discipline, but here's a
              complete breakdown for both licensed engineers and software/tech engineers.
            </p>

            <div className="space-y-5">
              {[
                {
                  field: "Full name + credentials",
                  required: "Always",
                  notes: "For PEs: 'David Park, PE' or 'David Park, PE, SE' (Structural Engineer). For software engineers: 'David Park' with credentials in the title line rather than after the name — unless you hold a relevant certification like AWS Certified Solutions Architect, which can go after your name. Bold your name. Keep credentials to what's genuinely relevant.",
                },
                {
                  field: "Title and company",
                  required: "Always",
                  notes: "Be specific. 'Senior Civil Engineer — Transportation' beats 'Senior Engineer.' For software: 'Staff Software Engineer — Infrastructure' or 'Engineering Manager, Platform Team.' Your title and specialization together tell the recipient whether you're the right person to talk to, which saves everyone time.",
                },
                {
                  field: "PE license number",
                  required: "Required for licensed PEs",
                  notes: "Include your state and license number: 'PE License: TX #98231' or 'Licensed PE, Texas #98231.' If licensed in multiple states, list your primary state or the states relevant to your current projects. Some state engineering boards have specific display requirements — check yours.",
                },
                {
                  field: "Direct phone number",
                  required: "Always",
                  notes: "Your direct line. For project engineers and consultants who work closely with clients and contractors, your mobile number is often appropriate too. Phone accessibility matters in engineering — field issues, project emergencies, and client questions don't always wait for email responses.",
                },
                {
                  field: "Company website or personal site",
                  required: "Recommended",
                  notes: "Link to your company's homepage or your individual profile if one exists. For consulting engineers, a personal website that showcases past projects is more valuable than a company homepage link. For software engineers, a personal portfolio site or technical blog is worth linking if it's active and current.",
                },
                {
                  field: "GitHub profile",
                  required: "Recommended for software engineers",
                  notes: "A direct link to github.com/yourusername. Only include this if your profile is reasonably active and presentable. Pinned repos should showcase your best or most relevant work. If your GitHub shows substantial open source contributions or well-documented projects, this single link adds more credibility than several lines of job description.",
                },
                {
                  field: "LinkedIn profile",
                  required: "Recommended",
                  notes: "Standard professional link for engineers at all levels. Useful for anyone receiving your email who wants to understand your background, see your credentials, or evaluate you for a project or role. Keep your LinkedIn profile current — an outdated profile is worse than no link.",
                },
                {
                  field: "Company logo",
                  required: "Recommended for firm employees",
                  notes: "Adds brand recognition and visual structure. Upload at 2× resolution for sharp rendering on high-DPI screens. Keep width to 150–180px. If you're an independent consultant, a simple text-only signature is cleaner than a low-quality DIY logo.",
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

          {/* Example signatures */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Example engineer email signatures
            </h2>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              Licensed Professional Engineer (Civil/Structural)
            </h3>
            <div className="rounded-xl border-l-4 border-primary bg-surface p-6 font-mono text-sm leading-relaxed mb-6">
              <div className="text-foreground font-bold text-base">Rachel Mendez, PE, SE</div>
              <div className="text-muted">Principal Structural Engineer — Bridge & Transportation</div>
              <div className="text-muted">Mercer Engineering Associates</div>
              <div className="text-muted mt-2">D: (503) 555-0144 | M: (503) 555-0167</div>
              <div className="text-primary">mercerengineeringassociates.com</div>
              <div className="text-muted text-xs mt-2">PE License: OR #C-23891 | WA #PE-78234</div>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              Software Engineer (Tech Company)
            </h3>
            <div className="rounded-xl border-l-4 border-primary bg-surface p-6 font-mono text-sm leading-relaxed mb-6">
              <div className="text-foreground font-bold text-base">Thomas Wren</div>
              <div className="text-muted">Staff Software Engineer — Backend Infrastructure</div>
              <div className="text-muted">Dataflow Systems</div>
              <div className="text-muted mt-2">M: (415) 555-0221</div>
              <div className="text-primary">linkedin.com/in/thomaswren · github.com/twren</div>
            </div>

            <p className="text-muted leading-relaxed mb-4">
              Notice the differences: the PE signature includes the license numbers prominently
              because they're professional credentials that establish legal standing. The software
              engineer signature skips the phone entirely (reasonable for a role where nearly all
              communication is async) and includes GitHub as the portfolio signal. Both are clean
              and specific about the person's specialization.
            </p>
            <p className="text-muted leading-relaxed">
              Browse{" "}
              <Link href="/examples" className="text-primary underline underline-offset-2">
                more signature examples
              </Link>{" "}
              to see how different layouts handle these elements, or go straight to the{" "}
              <Link href="/editor" className="text-primary underline underline-offset-2">
                editor
              </Link>{" "}
              to build yours.
            </p>
          </section>

          {/* Step-by-step */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to build your engineer signature with NeatStamp
            </h2>

            <ol className="space-y-5">
              {[
                {
                  step: "Choose a minimal template",
                  detail: "Open the NeatStamp editor and select a clean, minimal template. For engineers, the 'Classic' or 'Minimal' layouts work best — they're precise, they render correctly in Gmail and Outlook, and they don't add decorative elements that feel out of place in technical correspondence.",
                },
                {
                  step: "Enter your name and credentials accurately",
                  detail: "Type your full name and append your credentials: 'Rachel Mendez, PE, SE' or 'Thomas Wren, AWS-SAA.' Only include credentials that are active and relevant. If you're a PE, your credential placement after your name is the right standard; that's how the engineering community expects to see it.",
                },
                {
                  step: "Add your title with specialization",
                  detail: "Don't just put 'Engineer' — add your discipline and specialty. The editor has a title field where you can write 'Principal Structural Engineer — Bridge & Transportation' or 'Staff Software Engineer — Backend Infrastructure.' That specificity does real work in every email you send.",
                },
                {
                  step: "Add contact info and links",
                  detail: "Fill in your phone number and website. For software engineers, add your GitHub URL and LinkedIn in the social links section. The editor formats these as clean hyperlinks. For PEs, add your license number in the custom text field — format it as 'PE License: [State] #[Number]'.",
                },
                {
                  step: "Upload your company logo",
                  detail: "Upload the logo at 2× your intended display size. If the logo will display at 150px wide, upload a 300px wide version. PNG with transparent background works best for logos on different background colors.",
                },
                {
                  step: "Export and install",
                  detail: "Download the HTML and install in Gmail or Outlook. The editor includes step-by-step installation guides for both. For Outlook specifically, follow the guide carefully — Outlook has quirks in how it handles HTML signatures that can break layouts if not installed correctly.",
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
                Create Your Engineer Signature — Free
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
              Common mistakes engineers make with email signatures
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: "Vague job titles",
                  why: "'Engineer' or 'Senior Engineer' tells recipients almost nothing. Your discipline, specialization, and seniority matter. 'Senior Geotechnical Engineer' or 'Lead Software Engineer — Machine Learning' communicates who you are and what you do in three seconds. In a world where people are deciding in the email preview whether to read your message, specificity helps.",
                },
                {
                  mistake: "Missing PE credentials for licensed engineers",
                  why: "If you hold a PE license and you're sending professional correspondence, those two letters after your name matter legally and professionally. Clients and contractors expect to see them. Regulators look for them. It's not about ego — it's accurate professional identification.",
                },
                {
                  mistake: "Linking to an inactive or messy GitHub",
                  why: "A GitHub link that leads to a profile with no activity, a dozen unfinished repos, and no clear organization sends a negative signal. If you're going to link to GitHub, spend an hour making your profile presentable first: pin your best 4–6 repos, write clear README files, and make sure your contribution history isn't completely flat.",
                },
                {
                  mistake: "Using HTML that breaks in Outlook",
                  why: "A significant portion of corporate clients, contractors, and government agencies use Microsoft Outlook. Engineering firms themselves often run on Outlook. If your signature uses CSS properties that Outlook's rendering engine doesn't support, it can look broken or display as plain text. Use table-based HTML layouts generated by tools that test Outlook rendering.",
                },
                {
                  mistake: "Including too much information",
                  why: "Engineers sometimes treat their signature like a resume: certifications, industry memberships, conference presentations, publications. All of that belongs on your LinkedIn or personal site. Your signature is contact information and professional identification. Four to six lines is the right target.",
                },
                {
                  mistake: "No phone number for client-facing engineers",
                  why: "For consulting engineers, project managers, and client-facing technical leads, the absence of a phone number in the signature creates unnecessary friction. Clients who need to reach you urgently shouldn't have to dig through your email history to find a number. Include your direct line.",
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Pro tips for engineers</h2>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Keep it mobile-readable</h3>
                <p className="text-muted leading-relaxed">
                  Engineering project teams often read emails on phones during site visits,
                  inspections, and field work. Your signature should render cleanly on a 390px
                  wide screen. Avoid multi-column layouts — they collapse awkwardly on mobile.
                  A single-column signature with your name at top and links at bottom reads
                  fine on any device. Check the{" "}
                  <Link href="/email-signature-mobile-friendly" className="text-primary underline underline-offset-2">
                    mobile signature guide
                  </Link>{" "}
                  for specific testing steps.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Update when you change roles or firms</h3>
                <p className="text-muted leading-relaxed">
                  Engineers change firms, projects, and titles fairly often in some specialties.
                  Set a reminder — quarterly works — to review your signature. Check that your
                  title is current, your phone number still works, your firm name is right, and
                  your PE license number hasn't expired. A signature with an old firm's logo is
                  a credibility problem you can avoid with five minutes of attention.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Test in both Gmail and Outlook before finalizing</h3>
                <p className="text-muted leading-relaxed">
                  Send a test email to yourself and open it in both Gmail and Outlook (or have
                  a colleague open it in the one you don't use). Check that the logo loads,
                  the font looks right, the links are clickable, and nothing is misaligned.
                  The{" "}
                  <Link href="/email-signature-outlook" className="text-primary underline underline-offset-2">
                    Outlook setup guide
                  </Link>{" "}
                  covers the specific installation steps that prevent rendering issues.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">For consulting engineers: link to a project portfolio</h3>
                <p className="text-muted leading-relaxed">
                  If you have a personal website that showcases past engineering projects —
                  bridge designs, software systems, infrastructure work — link to it instead of
                  just your LinkedIn. A portfolio link is a stronger signal than a LinkedIn
                  profile for a technical audience evaluating your work. Even a simple page
                  with three or four well-documented project descriptions is more compelling
                  than a profile page.
                </p>
              </div>
            </div>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { href: "/professional-email-signature", title: "Professional Email Signature", desc: "The universal principles that apply across all engineering disciplines." },
                { href: "/email-signature-with-logo", title: "Email Signature with Logo", desc: "Logo sizing, file formats, and placement for firm branding." },
                { href: "/email-signature-outlook", title: "Outlook Signature Setup", desc: "How to install and manage signatures in Microsoft Outlook." },
                { href: "/email-signature-gmail", title: "Gmail Signature Setup", desc: "Step-by-step installation for Gmail users." },
                { href: "/email-signature-for-business", title: "Email Signature for Business", desc: "Roll out consistent signatures across an engineering team." },
                { href: "/email-signature-mobile-friendly", title: "Mobile-Friendly Signatures", desc: "How to ensure your signature reads well on phones." },
                { href: "/templates", title: "Signature Templates", desc: "Browse clean, minimal templates suited for technical professionals." },
                { href: "/blog/email-signature-best-practices", title: "Email Signature Best Practices", desc: "The definitive guide to what works in 2026." },
                { href: "/email-signature-for-developer", title: "Email Signature for Developers", desc: "Specific guidance for software developers and tech leads." },
                { href: "/html-email-signature", title: "HTML Email Signature Guide", desc: "How the code works and why it matters for cross-client rendering." },
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
              Build your engineer signature today
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Clean, minimal, renders correctly in Gmail and Outlook.
              Free, no account required, ready in under 10 minutes.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create Your Engineer Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
