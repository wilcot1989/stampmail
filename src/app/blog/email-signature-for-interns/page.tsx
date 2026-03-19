import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Interns — Make a Great First Impression | NeatStamp",
  description:
    "Your first professional email signature as an intern. What to include, what to skip, real examples for summer, co-op, and graduate interns, and what hiring managers actually notice.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-for-interns",
  },
};

const faqs = [
  {
    q: "Should I include my GPA in my email signature as an intern?",
    a: "No. Your GPA belongs on your resume, not your email signature. Even a high GPA listed in a signature looks unusual and can come across as boastful or insecure. Your title — 'Marketing Intern' or 'Software Engineering Intern' — is enough context. If your GPA is a talking point, the interview is the right place for it.",
  },
  {
    q: "Should I put 'Aspiring [X]' in my email signature?",
    a: "Avoid it. 'Aspiring Software Engineer' in your signature signals that you don't yet see yourself as a software engineer — but you're doing the work of one. Use your actual role title instead: 'Software Engineering Intern at [Company]'. Let the role speak for itself.",
  },
  {
    q: "Is it okay to include my university in my email signature as an intern?",
    a: "Yes, if you're a current student or recent graduate. Format it as 'BS Computer Science, Stanford University (Expected May 2027)' or just 'University of Michigan, Class of 2026'. It provides context for your level and is expected information for interns. Once you're a full-time employee, remove it.",
  },
  {
    q: "Should my intern email signature look the same as full-time employees'?",
    a: "It should follow the same format and brand standards as your company's standard signatures, but your title will clearly identify you as an intern. Don't try to obscure that — it's not a liability, it's context. What you want is a signature that looks professional and complete, not one that minimizes your status.",
  },
  {
    q: "What should I do with my email signature when I get a full-time offer?",
    a: "Update your title from 'Intern' to your new role, remove the university line if you included one, and keep everything else. The transition from intern to full-time is also a good opportunity to update your LinkedIn profile and make sure everything is consistent.",
  },
  {
    q: "I'm a virtual intern — should my signature be different?",
    a: "Not significantly. The main consideration is that you probably don't have a company phone number. If the company hasn't given you one, use your personal mobile (which is fine for a virtual internship) or omit the phone field if you genuinely don't need to be reached by phone. Your company email address and LinkedIn are the essentials.",
  },
];

export default function EmailSignatureForInternsPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature for Interns",
            url: "https://neatstamp.com/blog/email-signature-for-interns",
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
            <span className="text-slate-700">Email Signature for Interns</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">
                  Career Guide
                </span>
                <span className="text-sm text-slate-400">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature for Interns — Make a Great First Impression
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Your email signature is probably not the first thing on your mind when you start
                an internship — there&rsquo;s a lot else going on. But it&rsquo;s worth spending 15 minutes
                getting it right. Every email you send during your internship has your signature
                at the bottom, which means it&rsquo;s a small but persistent piece of how colleagues,
                clients, and managers perceive you. Here&rsquo;s how to do it well.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 10 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#what-to-include", "What to include in an intern signature"],
                  ["#what-not-to-include", "What not to include"],
                  ["#balance", "The balance between professional and approachable"],
                  ["#examples", "Examples for different intern types"],
                  ["#hiring-managers", "What hiring managers notice"],
                  ["#transition", "Transitioning to a full-time signature"],
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
            <section id="what-to-include" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to include in an intern signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                An intern signature follows the same logic as any professional signature — most
                important information first, nothing that doesn&rsquo;t add value. Here&rsquo;s what belongs.
              </p>

              <div className="space-y-5">
                <div className="border-l-4 border-sky-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Full name</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Your full name, same as you&rsquo;d introduce yourself professionally. If you use a
                    preferred name that differs from your legal name, use the preferred name — that&rsquo;s
                    the name people will know you by. Make it slightly larger or bolder than the rest
                    of the signature so it reads first.
                  </p>
                </div>

                <div className="border-l-4 border-sky-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Your intern title</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The right wording depends on what your company calls it. Common formats:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600 ml-2">
                    <li>Marketing Intern</li>
                    <li>Software Engineering Intern</li>
                    <li>Finance Intern &middot; Corporate Development</li>
                    <li>Product Design Intern</li>
                    <li>Operations Intern</li>
                  </ul>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2">
                    Use whatever your company&rsquo;s offer letter or HR system lists. If you have a
                    team or department, adding it after a middot (&middot;) gives context without
                    adding a full line.
                  </p>
                </div>

                <div className="border-l-4 border-sky-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Company name (linked)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Link your company name to the company website. This is standard for everyone,
                    not just interns. It makes your signature feel like it belongs to the organization
                    you&rsquo;re part of.
                  </p>
                </div>

                <div className="border-l-4 border-sky-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Work email address</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Your company email address, not your personal one. If the company has given you
                    a company email, use it. If you&rsquo;re working on a personal email (some very small
                    companies or freelance internships work this way), that&rsquo;s fine — it just slightly
                    changes the formality of the context.
                  </p>
                </div>

                <div className="border-l-4 border-sky-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Phone number (optional but often useful)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    If the company has given you a work phone or extension, use that. If not, using
                    your personal mobile is completely normal for interns. The question to ask is
                    whether colleagues or clients are likely to need to call you. If yes, include it.
                    Format it as a clickable{" "}
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">tel:</code>{" "}
                    link. Include your country code if you&rsquo;re in an international organization.
                  </p>
                </div>

                <div className="border-l-4 border-sky-500 pl-5">
                  <h3 className="font-semibold text-slate-900 mb-2">LinkedIn profile</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Your personal LinkedIn profile is worth including. It gives recipients context
                    about your background and is the standard professional networking platform.
                    Before your internship starts, make sure your LinkedIn profile is updated and
                    reflects your current role. A link to an incomplete or outdated LinkedIn profile
                    does more harm than not including it.
                  </p>
                </div>

                <div className="border-l-4 border-sky-400 pl-5 border-dashed">
                  <h3 className="font-semibold text-slate-900 mb-2">University (if current student or recent grad)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    This is optional but reasonable. Your university gives context about your
                    stage — it helps people understand whether you&rsquo;re a current student, a recent
                    graduate, or a gap-year intern. Keep it brief:{" "}
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">BS Computer Science, MIT (Expected 2027)</code>{" "}
                    or{" "}
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">University of Texas, Class of 2026</code>.
                    Once you start a full-time role, remove it.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-sky-50 border border-sky-100 rounded-xl p-5">
                <p className="text-sm text-sky-800">
                  <strong>Quick start:</strong> Build your intern signature in the{" "}
                  <Link href="/editor" className="underline hover:no-underline">
                    NeatStamp editor
                  </Link>{" "}
                  — free, no account needed. The templates section has options that work well for
                  intern-level signatures.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="what-not-to-include" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What not to include
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                There are a handful of things that regularly appear in intern signatures that
                create a bad impression. These are specific — not vague warnings about
                &ldquo;looking unprofessional&rdquo; — so you can make a clear decision on each one.
              </p>

              <div className="space-y-4">
                {[
                  {
                    item: "GPA",
                    why: "Your GPA belongs on your resume, not your email signature. A signature is a contact card, not a credential list. Even a 4.0 GPA listed in a signature looks unusual. The people receiving your emails aren't evaluating you academically — they're working with you.",
                  },
                  {
                    item: "\"Aspiring [Role]\" language",
                    why: "If you're doing the work of a marketing intern, you're a marketing intern — not 'an aspiring marketing professional'. The 'aspiring' framing signals self-doubt. Use your actual role title and let your work make the impression.",
                  },
                  {
                    item: "Personal Instagram, TikTok, or Twitter",
                    why: "Unless your personal social media is directly relevant to the role (a social media intern at a creator-economy startup might be an exception), keep personal accounts out of work email signatures. Your professional presence is LinkedIn. Your personal life is personal.",
                  },
                  {
                    item: "Emojis in your name or title",
                    why: "One or two emojis can work in very casual company cultures if you've seen colleagues do it and it genuinely fits the tone. But starting your internship with emojis in your signature before you understand the culture is a risky first impression. Default to no emojis; adjust later if the culture clearly supports it.",
                  },
                  {
                    item: "Too many social links",
                    why: "LinkedIn is enough. Adding GitHub makes sense for software engineering roles. Beyond that, you're adding noise. A row of five social icons on an intern signature looks like you're trying too hard to seem established.",
                  },
                  {
                    item: "\"Intern\" made ambiguous or hidden",
                    why: "Some interns try to make their title less obvious by using vague language like 'Associate' or 'Analyst' when their actual title is 'Intern'. Don't do this. Your title is your title. People will find out you're an intern anyway, and obscuring it makes you look dishonest.",
                  },
                  {
                    item: "Personal pronouncements or taglines",
                    why: "\"Creating impact through innovation\" under your intern title is not the move. Leave taglines and positioning statements to senior executives who've earned the right to be self-promotional. For interns, straightforward contact information is the right tone.",
                  },
                ].map((entry) => (
                  <div key={entry.item} className="flex gap-4">
                    <span className="mt-1 h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center font-bold flex-shrink-0">
                      ✕
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{entry.item}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{entry.why}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                For the broader guide to signature content decisions, the{" "}
                <Link href="/blog/what-to-include-email-signature" className="text-blue-600 hover:underline">
                  what to include in an email signature guide
                </Link>{" "}
                covers every element with the same level of specificity.
              </p>
            </section>

            {/* Section 3 */}
            <section id="balance" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The balance between professional and approachable
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                One of the things that makes intern signatures tricky is the temptation to
                err hard in one direction — either going very formal to seem serious, or staying
                casual because you don&rsquo;t yet feel like a &ldquo;real professional.&rdquo;
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The right answer is straightforward: match the tone of your company. Look at what
                your manager&rsquo;s signature looks like. Look at what other employees at your level
                (recent graduates, junior employees) have in their signatures. Mirror that.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re at a startup where signatures are one-liners with just a name and email,
                your signature should be minimal too. If you&rsquo;re at a large professional services
                firm where everyone has a formatted signature with logo, job title, and contact
                info on separate lines, yours should match that structure.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                What you&rsquo;re calibrating for is: does this signature make me look like I belong
                here? Not: does this signature make me look like I&rsquo;ve been here for 10 years?
                The title will tell people you&rsquo;re an intern. The format should say you&rsquo;re
                paying attention.
              </p>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  How to calibrate your signature tone
                </p>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex gap-3">
                    <span className="text-blue-600 font-semibold flex-shrink-0">Step 1:</span>
                    <span>Find 2–3 email signatures from colleagues at the company (ask your manager to forward one, or look at emails from onboarding)</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-blue-600 font-semibold flex-shrink-0">Step 2:</span>
                    <span>Note: what elements do they include? What fonts and colors? Do they have headshots or logos?</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-blue-600 font-semibold flex-shrink-0">Step 3:</span>
                    <span>Build yours with the same structure. The only difference is your title says "Intern."</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="examples" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Examples for different intern types
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Here are complete signature examples for the most common internship contexts.
                These are clean, appropriate, and follow the content guidelines above.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Summer intern at a tech company
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-5 font-mono text-sm">
                    <p className="font-bold text-slate-900">Jordan Patel</p>
                    <p className="text-slate-600">Software Engineering Intern &middot; Acme Technologies</p>
                    <p className="text-slate-600">jordan.patel@acmetech.com</p>
                    <p className="text-slate-600">+1 (617) 555-0142</p>
                    <p className="text-blue-600">linkedin.com/in/jordanpatel</p>
                    <p className="text-slate-500 text-xs mt-1">BS Computer Science, MIT (Expected May 2027)</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Clean, complete, and clearly identifies role. University line is appropriate for a current student.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Co-op student at a consulting firm
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-5 font-mono text-sm">
                    <p className="font-bold text-slate-900">Mia Okonkwo</p>
                    <p className="text-slate-600">Strategy Consulting Co-op &middot; Deloitte</p>
                    <p className="text-slate-600">mia.okonkwo@deloitte.com</p>
                    <p className="text-slate-600">+1 (416) 555-0187</p>
                    <p className="text-blue-600">linkedin.com/in/miaokonkwo</p>
                    <p className="text-slate-500 text-xs mt-1">BBA, Rotman School of Management, University of Toronto</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    &ldquo;Co-op&rdquo; is the right terminology if that&rsquo;s how the company titles it. Matches professional services norms.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Graduate intern (post-degree, pre-full-time)
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-5 font-mono text-sm">
                    <p className="font-bold text-slate-900">Sam Torres</p>
                    <p className="text-slate-600">Marketing Intern &middot; Meridian Health</p>
                    <p className="text-slate-600">sam.torres@meridianhealth.com</p>
                    <p className="text-slate-600">+1 (303) 555-0166</p>
                    <p className="text-blue-600">linkedin.com/in/samtorres</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Graduate intern who finished their degree. University line removed — no longer relevant. Clean and simple.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Virtual / remote intern
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-5 font-mono text-sm">
                    <p className="font-bold text-slate-900">Priya Nair</p>
                    <p className="text-slate-600">Product Design Intern &middot; Stackwell Inc.</p>
                    <p className="text-slate-600">priya.nair@stackwell.com</p>
                    <p className="text-blue-600">linkedin.com/in/priyanair</p>
                    <p className="text-slate-500 text-xs mt-1">MS Human-Computer Interaction, Carnegie Mellon (Expected Dec 2026)</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Phone omitted because the company didn&rsquo;t provide one and the role doesn&rsquo;t require calls. Email and LinkedIn are sufficient.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Finance intern at a bank or investment firm
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-5 font-mono text-sm">
                    <p className="font-bold text-slate-900">Alex Chen</p>
                    <p className="text-slate-600">Investment Banking Intern &middot; Goldman Sachs</p>
                    <p className="text-slate-600">Investment Banking Division</p>
                    <p className="text-slate-600">alex.chen@gs.com</p>
                    <p className="text-slate-600">+1 (212) 555-0194 ext. 4821</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Finance and banking contexts are more formal. Division listed on a separate line. No LinkedIn (unusual in this sector). No university (not standard in banking signatures).
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                You can build any of these formats in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                for free. The{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  templates library
                </Link>{" "}
                has a starting point for most of these styles.
              </p>
            </section>

            {/* Section 5 */}
            <section id="hiring-managers" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What hiring managers notice
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This section is based on a consistent theme from conversations with hiring managers,
                recruiters, and internship program coordinators: they notice when things are wrong
                much more readily than when things are right. A good signature is invisible; a bad
                one creates a small but real negative impression.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Here&rsquo;s what actually gets noticed — for better and worse.
              </p>

              <div className="space-y-5">
                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Things that create a positive impression</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {[
                      "A signature that matches the company's standard format on the first day — shows attention to detail and that you did your homework.",
                      "A professional LinkedIn profile that's linked and actually complete. Hiring managers click it. Make sure your profile is up to date before linking it.",
                      "A mobile number formatted as a clickable tel: link, especially for roles where you need to be reachable.",
                      "Consistent formatting — same font, same size, aligned — rather than a mix of styles that looks like it was assembled quickly.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-4 w-4 rounded-full bg-green-200 text-green-700 text-xs flex items-center justify-center flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Things that create a negative impression</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {[
                      "\"Sent from my iPhone\" still visible — the easiest thing to fix and a reliable signal that someone doesn't sweat the details.",
                      "A LinkedIn link to an empty or minimally-completed profile. This actively hurts you — better to omit the link.",
                      "GPA listed in the signature. Every hiring manager I've heard comment on this says the same thing: it looks insecure.",
                      "A personal email address in the signature instead of the company one. It signals you haven't fully committed to your role at this company.",
                      "A creative or experimental signature format that doesn't match the company's style — especially using a heavy HTML template when everyone else uses plain text.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-4 w-4 rounded-full bg-red-200 text-red-700 text-xs flex items-center justify-center flex-shrink-0">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">The biggest takeaway from hiring managers</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Most hiring managers said essentially the same thing: a good signature doesn&rsquo;t
                    get you hired, but a bad one can be a small data point in the wrong direction. In
                    competitive internship-to-full-time conversions where multiple interns are being
                    evaluated, every data point matters. Your email signature is a small one, but it&rsquo;s
                    entirely within your control. Take 15 minutes to get it right.
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                For broader advice on professional email communication, the{" "}
                <Link href="/blog/email-signature-etiquette" className="text-blue-600 hover:underline">
                  email signature etiquette guide
                </Link>{" "}
                covers context-specific norms that are useful when you&rsquo;re navigating a new workplace.
              </p>
            </section>

            {/* Section 6 */}
            <section id="transition" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Transitioning to a full-time signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you convert from intern to full-time employee, your signature needs a few updates.
                This is also a natural moment to make it more polished if you want to level it up.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    change: "Update your title",
                    detail: "Remove \"Intern\" and update to your new role. If you're moving from \"Marketing Intern\" to \"Marketing Associate\", that's the only required change in most cases.",
                  },
                  {
                    change: "Remove the university line",
                    detail: "If you included your degree and expected graduation date, remove it now. You're a full-time professional, not a student. Your degree can live on your LinkedIn.",
                  },
                  {
                    change: "Add a company phone if you now have one",
                    detail: "If you've been given a desk phone, direct line, or company mobile, replace your personal number with it.",
                  },
                  {
                    change: "Check your LinkedIn profile",
                    detail: "Update your LinkedIn role to the new title. Your signature links to your LinkedIn, so make sure what recipients find there matches what's in your signature.",
                  },
                  {
                    change: "Match the company's full-time signature format",
                    detail: "Full-time employee signatures may have more elements than intern signatures — a company logo, additional social links, or a specific format. Check with your manager or IT/HR team about whether there's a standard company signature template.",
                  },
                ].map((item) => (
                  <div key={item.change} className="flex gap-4">
                    <span className="mt-1 h-5 w-5 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center font-bold flex-shrink-0">→</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{item.change}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you want help building the next version of your signature — including a logo,
                headshot, or more polished layout — the{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional email signature guide
                </Link>{" "}
                is the right next read. The{" "}
                <Link href="/email-signature-for-job-seekers" className="text-blue-600 hover:underline">
                  email signature for job seekers
                </Link>{" "}
                and{" "}
                <Link href="/email-signature-for-students" className="text-blue-600 hover:underline">
                  email signature for students
                </Link>{" "}
                guides are also useful if you&rsquo;re transitioning between phases of your career.
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
            <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build your intern signature in 60 seconds
              </h2>
              <p className="text-sky-100 text-sm mb-6 max-w-md mx-auto">
                Free, no account required. Start your internship with a signature that looks
                like you know what you&rsquo;re doing — because you do.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
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
