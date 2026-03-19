import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Personal Email — Do You Need One?",
  description:
    "Honest take on personal email signatures. When you need one, when you don't, what to include, what to leave out, and examples for job seekers, freelancers, and networkers.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-personal-email",
  },
};

const faqs = [
  {
    q: "Do I need an email signature on my personal email?",
    a: "It depends entirely on what you use your personal email for. If you're job hunting, freelancing, networking, or doing anything professional from your personal address, a signature adds credibility. If you're primarily emailing friends and family, a signature is unnecessary and will probably seem odd.",
  },
  {
    q: "What should I include in a personal email signature?",
    a: "For a personal email used professionally: your full name, phone number, and LinkedIn profile URL. That's the core. You might add a job title or a 'currently seeking' note if relevant. What you should leave out: your current employer (if you're using this for job hunting separately from work), a company logo (you don't have one if this is personal), and lengthy contact lists. Keep it to three or four lines.",
  },
  {
    q: "Should I include my job title in my personal email signature?",
    a: "Only if it's relevant and accurate. If you're emailing from a personal account for work-related networking or freelance outreach, your current title adds credibility. If you're unemployed or between roles and emailing a recruiter from your personal address, leaving the job title blank is better than including an outdated one or making something up.",
  },
  {
    q: "Can I use a personal email signature when job hunting?",
    a: "Yes, and you should. A clean personal signature on job applications and recruiter outreach makes you look organised and professional. Include your name, phone number, LinkedIn URL, and optionally your location (city, not full address). Don't include your current employer — that creates awkward questions.",
  },
  {
    q: "Should my personal email signature look the same as my work one?",
    a: "No. Your work signature represents your employer. Your personal signature represents you. They might share some design sensibility, but the content should differ. Your personal signature shouldn't use your company's logo, and it shouldn't include your work phone number if you're trying to keep professional and personal communication separate.",
  },
];

export default function EmailSignaturePersonalEmailPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature for Personal Email",
            url: "https://neatstamp.com/blog/email-signature-personal-email",
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
            <span className="text-slate-700">Email Signature for Personal Email</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Personal
                </span>
                <span className="text-sm text-slate-400">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature for Personal Email — Do You Even Need One?
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                The honest answer is: sometimes yes, sometimes no, and the difference
                matters. Most signature advice assumes you&rsquo;re using a work email. This guide
                is specifically for personal email accounts — the questions of whether you
                need one at all, what to put in it when you do, and what commonly goes
                wrong.
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
                  ["#do-you-need-one", "Do you actually need a personal email signature?"],
                  ["#when-you-do", "When you genuinely need one"],
                  ["#when-you-dont", "When you definitely don't"],
                  ["#what-to-include", "What to include"],
                  ["#what-to-leave-out", "What to leave out"],
                  ["#examples", "Examples for different situations"],
                  ["#job-hunting", "Job hunting from a personal email"],
                  ["#freelancing", "Freelancing from a personal email"],
                  ["#networking", "Networking and side projects"],
                  ["#the-balance", "The professional-personal balance"],
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

            {/* Section 1 */}
            <section id="do-you-need-one" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Do you actually need a personal email signature?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is a question most signature guides avoid because they&rsquo;re trying to
                sell you on signatures. I&rsquo;ll give you the real answer: no, not always.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The purpose of an email signature is to give someone who doesn&rsquo;t know you
                a way to identify you and reach you. If you&rsquo;re emailing your sister to
                coordinate Christmas plans, she knows who you are. A signature with your
                LinkedIn URL and job title is unnecessary and will probably read as odd.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                But here&rsquo;s what&rsquo;s changed: most people use their personal email for a
                lot more than personal correspondence. Job applications, freelance work,
                networking, volunteer roles, professional side projects — all of this often
                flows through a personal Gmail or similar account. And in those contexts,
                a signature does real work.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The decision isn&rsquo;t really &ldquo;do I need a personal email signature&rdquo; — it&rsquo;s
                &ldquo;what am I using my personal email for, and does that use benefit from a
                signature?&rdquo; The sections below break this down by situation.
              </p>
            </section>

            {/* Section 2 */}
            <section id="when-you-do" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When you genuinely need one
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A personal email signature earns its place in these situations:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "You're actively job hunting",
                    body: "Recruiters and hiring managers receive hundreds of emails. A clean signature — name, phone, LinkedIn — immediately signals that you're organised and professional. It also makes it easy for them to call you without hunting for your number.",
                  },
                  {
                    title: "You're doing freelance work from your personal account",
                    body: "If clients are emailing you at your Gmail, your signature is part of your professional presentation. It signals that you take the work seriously, and it gives clients a clear way to reach you. More on this in the freelancing section below.",
                  },
                  {
                    title: "You're networking professionally",
                    body: "Following up after an event, reaching out to someone you met, asking for an introduction — all of these benefit from a signature. The person on the other end is likely filing you in their mental contacts, and your signature helps them do that.",
                  },
                  {
                    title: "You're applying for things formally",
                    body: "University applications, grant applications, membership organisations, professional association applications — any formal submission made by email benefits from looking polished. A signature adds a small but real layer of professionalism.",
                  },
                  {
                    title: "You're running a side project or small business",
                    body: "If you have a blog, a newsletter, a product, or any kind of professional side project, a signature that includes a link to it is a simple form of outreach. Every email you send becomes a tiny introduction.",
                  },
                ].map((item) => (
                  <div key={item.title} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section id="when-you-dont" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                When you definitely don&rsquo;t need one
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Save yourself the setup time in these situations:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Emailing friends, family, and people who know you well — they know who you are",
                  "Personal logistics (booking appointments, responding to event invitations, ordering things online)",
                  "Any email thread that's clearly personal in nature, regardless of the recipient",
                  "Quick replies in an ongoing thread — even if the first email warranted a signature, replies don't",
                  "Any context where a formal signature would feel oddly out of place",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                One practical approach: keep your personal email signature turned on by
                default for new messages (where it does the most good), but turn off
                automatic insertion on replies. That way your signature appears when you
                first contact someone but doesn&rsquo;t clutter your &ldquo;OK, sounds good!&rdquo; responses.
                The{" "}
                <Link
                  href="/blog/email-signature-etiquette"
                  className="text-blue-600 hover:underline"
                >
                  email signature etiquette guide
                </Link>{" "}
                covers reply chain etiquette in detail.
              </p>
            </section>

            {/* Section 4 */}
            <section id="what-to-include" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to include in a personal email signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The core of a personal professional signature is simpler than a work
                signature. Here&rsquo;s what I&rsquo;d put in, in order of importance:
              </p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    item: "Your full name",
                    why: "Essential. This sounds obvious but some people put a nickname or just a first name. Use your full name as you'd introduce yourself professionally.",
                    priority: "Essential",
                    priorityClass: "bg-green-100 text-green-700",
                  },
                  {
                    item: "Phone number",
                    why: "Your mobile number. One number only. Gives people a direct way to reach you that isn't email. Format it as a tappable tel: link so mobile recipients can call with one tap.",
                    priority: "Essential",
                    priorityClass: "bg-green-100 text-green-700",
                  },
                  {
                    item: "LinkedIn profile URL",
                    why: "Your LinkedIn is your professional identity on the web. Including it in a personal signature gives recipients an easy way to learn more about you, check your experience, and connect. Clean this link up — use linkedin.com/in/yourname rather than the full URL with tracking parameters.",
                    priority: "Usually yes",
                    priorityClass: "bg-blue-100 text-blue-700",
                  },
                  {
                    item: "Brief descriptor or current status",
                    why: "Optional but useful in specific situations. 'Currently seeking product management roles' or 'Freelance graphic designer' tells the recipient immediately what context to read your email in. Skip if it's not relevant.",
                    priority: "Situational",
                    priorityClass: "bg-amber-100 text-amber-700",
                  },
                  {
                    item: "Portfolio or website link",
                    why: "If you're freelancing or doing creative work and have a portfolio, one link is worth including. One link only — not a list of seven social platforms.",
                    priority: "Situational",
                    priorityClass: "bg-amber-100 text-amber-700",
                  },
                ].map((row) => (
                  <div key={row.item} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-slate-900">{row.item}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${row.priorityClass}`}>
                        {row.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{row.why}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 */}
            <section id="what-to-leave-out" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to leave out
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Personal signatures fail in different ways from work signatures. Here&rsquo;s
                what I see most often that shouldn&rsquo;t be there:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    item: "Your current employer's name and logo",
                    reason: "If you're using a personal email for job hunting or side projects, including your current employer creates awkward implications — are they aware you're doing this? Are you using their brand for personal correspondence? Keep employer identity on your work account.",
                  },
                  {
                    item: "An outdated job title",
                    reason: "I've seen signatures saying 'Marketing Director at XYZ Corp' from someone who left that role two years ago. If you can't put a current and accurate title, leave it blank and use a descriptor instead ('Marketing professional' or 'Open to new opportunities').",
                  },
                  {
                    item: "Your home address",
                    reason: "Almost never necessary in email. It's a privacy risk and adds clutter. Recruiters don't need your street address. If something requires a mailing address, include it in the body of the email, not in every signature.",
                  },
                  {
                    item: "Inspirational quotes",
                    reason: "In a personal email sent to a recruiter or a potential client, a quote adds an air of presumption. You're putting a philosophical statement between your contact details and their response. Save it for your social profiles if you want.",
                  },
                  {
                    item: "Every social platform you're on",
                    reason: "A row of eight social icons on a personal email signature looks like spam. LinkedIn only, unless your work is specifically on another platform (a photographer might include Instagram; a developer might include GitHub).",
                  },
                  {
                    item: "Legal disclaimers",
                    reason: "These are for regulated industries and corporate email. A personal Gmail with a GDPR disclaimer is both legally ineffective and just looks strange.",
                  },
                ].map((item) => (
                  <div key={item.item} className="border border-red-100 bg-red-50 rounded-xl p-5">
                    <h3 className="font-semibold text-red-900 mb-2">{item.item}</h3>
                    <p className="text-sm text-red-700 leading-relaxed">{item.reason}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 */}
            <section id="examples" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Examples for different situations
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                These show what a good personal email signature looks like for common
                scenarios. Each is stripped down to what actually matters.
              </p>

              <div className="space-y-6">
                {[
                  {
                    label: "Job seeker (currently employed, exploring discreetly)",
                    example: ["Priya Mehta", "+44 7700 900312", "linkedin.com/in/priyamehta"],
                    note: "No current employer, no title. Just contact info and LinkedIn. Clean, professional, tells the recruiter nothing about her current situation.",
                  },
                  {
                    label: "Job seeker (between roles)",
                    example: ["Daniel Park", "Marketing professional · Open to new opportunities", "+44 7700 900488 | daniel.park@gmail.com", "linkedin.com/in/danielpark"],
                    note: "The 'Open to new opportunities' line is optional but can help. It sets context without oversharing. Four lines total.",
                  },
                  {
                    label: "Freelancer (no registered company)",
                    example: ["Sasha Reeves", "Freelance Copywriter", "+44 7700 900227 | sasha@sashawritescopy.com", "sashawritescopy.com"],
                    note: "Uses a professional-sounding personal domain (ideal). Portfolio link instead of LinkedIn since the work speaks for itself. Four lines.",
                  },
                  {
                    label: "Networking / professional introductions",
                    example: ["Michael Torres", "Head of Partnerships, Brightfield", "+44 7700 900541", "linkedin.com/in/michaeltorres"],
                    note: "Uses his work title here because he's networking in a professional context and the title adds credibility. Fine to include when it's current and accurate.",
                  },
                  {
                    label: "Student / recent graduate",
                    example: ["Amara Osei", "MSc Data Science, University of Edinburgh (2026)", "+44 7700 900761", "linkedin.com/in/amaraosei"],
                    note: "Qualification instead of job title. Gives immediate context to recruiters and professional contacts. Perfectly appropriate for a personal email.",
                  },
                ].map((item) => (
                  <div key={item.label} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        {item.label}
                      </p>
                    </div>
                    <div className="p-5">
                      <div className="font-mono text-sm bg-white border border-slate-100 rounded-lg p-4 mb-3">
                        {item.example.map((line, i) => (
                          <p
                            key={i}
                            className={i === 0 ? "font-bold text-slate-900" : "text-slate-600"}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-slate-500 italic">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7 */}
            <section id="job-hunting" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Job hunting from a personal email
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Job hunting from a personal email is common and completely normal. Most
                people don&rsquo;t want to use their work email for this — either because
                they&rsquo;re looking discreetly while employed, or because they no longer have
                a work email. Here&rsquo;s how to handle the signature specifically for this context.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your email address matters before your signature does. A personal email like
                firstname.lastname@gmail.com is fine. firstdancedragon99@hotmail.com is not.
                If your personal email address is embarrassing, create a clean Gmail before
                you start applying. No recruiter will penalise you for it, but an awkward
                address does create an unnecessary first impression problem.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For the signature itself: name, phone, LinkedIn. That&rsquo;s the minimum and
                often the maximum you need. Recruiters want to call you — make that easy.
                They want to look you up on LinkedIn before calling — make that easy too.
              </p>
              <p className="text-slate-600 leading-relaxed">
                One thing to avoid: including a home address. Some job seekers feel they
                should include it because &ldquo;that&rsquo;s how it&rsquo;s done on CVs.&rdquo; Your email signature
                isn&rsquo;t your CV header. Leave the address off — include it only if the
                application form asks for it explicitly. The{" "}
                <Link
                  href="/email-signature-for-job-seekers"
                  className="text-blue-600 hover:underline"
                >
                  email signature for job seekers guide
                </Link>{" "}
                goes into this in more detail, including how to format your signature
                for different stages of the application process.
              </p>
            </section>

            {/* Section 8 */}
            <section id="freelancing" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Freelancing from a personal email
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Freelancers who operate from a personal email address — rather than a
                dedicated business domain — have a specific challenge: looking professional
                without a company name or logo to lean on.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The fix is simple: be clear about what you do. &ldquo;Freelance Designer&rdquo; or
                &ldquo;Independent Marketing Consultant&rdquo; in the line below your name tells clients
                immediately what context to read your email in. You don&rsquo;t need a company name
                to be credible — your clarity and your portfolio do that work.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have a portfolio or website, include that link. If you don&rsquo;t, LinkedIn
                is a reasonable substitute — especially if your profile is complete. Make sure
                your LinkedIn shows your freelance work, not just previous employment.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                One thing worth considering: if you&rsquo;re doing meaningful volume of freelance
                work, registering a domain (even just yourname.com and using it for email)
                makes a notable difference to how clients perceive you. A professional email
                address is a credibility signal even before they read your signature. The{" "}
                <Link
                  href="/email-signature-for-freelancers"
                  className="text-blue-600 hover:underline"
                >
                  email signature for freelancers guide
                </Link>{" "}
                has more on how to handle signatures across different freelance contexts.
              </p>
            </section>

            {/* Section 9 */}
            <section id="networking" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Networking and side projects
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Professional networking from a personal email is common — following up from
                events, reaching out to someone whose work you admire, asking for advice or
                introductions. These emails benefit from a signature that gives context without
                being heavy.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re reaching out in a professional capacity, include your current title
                or role so the recipient knows who they&rsquo;re dealing with. If you&rsquo;re connecting
                around a side project or shared interest, a brief descriptor of what you do
                professionally is enough.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Side projects are a specific case worth mentioning. If you run a newsletter,
                a podcast, a community, or any kind of project that you want to be associated
                with professionally, including a link to it in your personal email signature
                is a low-friction form of outreach. Every email you send is a small discovery
                moment for someone who didn&rsquo;t know about it.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Keep this to one link. Two links (portfolio + newsletter + LinkedIn) looks
                like you&rsquo;re trying to sell something in every email you send. Pick the one
                that matters most for the context. The{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  NeatStamp templates
                </Link>{" "}
                include options for personal and semi-professional signature styles if you
                want to start from a clean base.
              </p>
            </section>

            {/* Section 10 */}
            <section id="the-balance" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The professional-personal balance
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The hardest thing about a personal email signature is calibrating the tone.
                Too formal and it feels off — a heavily designed corporate-style signature
                on a personal Gmail looks like you&rsquo;ve copy-pasted your work signature
                without thinking. Too casual and it adds nothing.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The right calibration for most people: clean, text-based, four lines or
                fewer, with one optional link. No logo (unless it&rsquo;s genuinely your personal
                brand). No headshot (unless you&rsquo;re in a field where headshots are the norm).
                No legal disclaimer. No inspirational quote.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you want to include a simple logo — maybe a personal brand mark or a
                wordmark of your name — that can work for freelancers or consultants who
                have consistent personal branding. But it should look intentional and
                professional, not like a clipart symbol. The{" "}
                <Link
                  href="/professional-email-signature"
                  className="text-blue-600 hover:underline"
                >
                  professional email signature guide
                </Link>{" "}
                covers design standards that apply whether your signature is on a work or
                personal account.
              </p>
              <p className="text-slate-600 leading-relaxed">
                One final thought: your personal email signature is yours, not your
                employer&rsquo;s. It should represent you as a person and professional — your
                name, your contact details, your professional identity. If you&rsquo;re unsure
                what that looks like, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                is free to try and takes about two minutes. Build one, look at it, and
                decide if it represents you well. That&rsquo;s the whole test.
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
                Build a personal email signature in 60 seconds
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Clean, professional, and genuinely yours. Free — no account required.
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
