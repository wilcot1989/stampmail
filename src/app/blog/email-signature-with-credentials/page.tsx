import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature with Credentials — MD, PhD, CPA & More | NeatStamp",
  description:
    "How to list credentials correctly in your email signature. Ordering rules, real examples for medical, legal, financial, academic, and tech fields. Avoid the alphabet soup problem.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-with-credentials",
  },
};

const faqs = [
  {
    q: "Should I put my credentials before or after my name?",
    a: "Post-nominal credentials (PhD, MD, CPA, JD) go after your name, separated by a comma. Some academic and medical titles (Dr.) are pre-nominal and go before. If you use a pre-nominal title, skip the redundant post-nominal: use \"Dr. Sarah Kim\" or \"Sarah Kim, MD\" — not \"Dr. Sarah Kim, MD\".",
  },
  {
    q: "How do I order multiple credentials?",
    a: "The general rule is: licensed credentials first (those required to practice), then academic degrees, then certifications and honours. Within each group, go highest to lowest. So \"MD, PhD\" not \"PhD, MD\" for a physician-researcher.",
  },
  {
    q: "I have five credentials — should I list all of them?",
    a: "Probably not. List the two or three most relevant to your current role. The rest can live on your LinkedIn profile or CV. A long string of post-nominals can read as credential-padding rather than impressive.",
  },
  {
    q: "What's the difference between JD and Esq. in an email signature?",
    a: "JD is an academic degree (Juris Doctor) that you earned in law school. Esq. (Esquire) is a professional courtesy title used by practicing attorneys. In the US, you'd typically use one or the other, not both. JD is used when the academic credential is the point; Esq. when the professional practice is the point.",
  },
  {
    q: "Can I include certifications like PMP or AWS in my email signature?",
    a: "Yes, but apply the same relevance test as any other credential. PMP makes sense if you're a project manager or work in consulting. AWS certification is relevant for cloud architects. If the certification doesn't describe what you actually do in this role, leave it on your LinkedIn instead.",
  },
  {
    q: "Should RN come before or after BSN?",
    a: "In nursing, the convention is to list the licensure first (RN), then the academic degree (BSN), then certifications. So: Jane Smith, RN, BSN — or for a more senior nurse: Jane Smith, RN, MSN, CCRN.",
  },
];

export default function EmailSignatureWithCredentialsPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature with Credentials",
            url: "https://neatstamp.com/blog/email-signature-with-credentials",
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
            <span className="text-slate-700">Email Signature with Credentials</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Credentials Guide
                </span>
                <span className="text-sm text-slate-400">11 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature with Credentials — MD, PhD, CPA &amp; More
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Credentials in email signatures seem simple until you actually have to format them.
                Do degrees go before or after the name? Which certifications belong? How do you
                avoid ending up with a six-letter soup that no one can decipher? This guide walks
                through the actual conventions by field, with real examples you can use directly.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 11 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#ordering-rules", "The ordering rules explained"],
                  ["#medical", "Medical credentials: MD, DO, NP, RN, BSN"],
                  ["#academic", "Academic credentials: PhD, EdD, MA"],
                  ["#legal", "Legal credentials: JD and Esq."],
                  ["#financial", "Financial credentials: CPA, CFA, CFP"],
                  ["#tech", "Tech credentials: PMP, AWS, CISSP"],
                  ["#how-many", "How many is too many — the alphabet soup problem"],
                  ["#real-examples", "Real examples for each field"],
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
            <section id="ordering-rules" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The ordering rules explained
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before field-specific conventions, here&rsquo;s the general framework most professional
                bodies use for ordering credentials after a name.
              </p>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-4">Standard ordering (left to right, after the name)</p>
                <div className="space-y-3">
                  {[
                    { num: "1", label: "Licensure credentials", note: "Required to legally practice (MD, RN, JD, CPA, PE). These come first." },
                    { num: "2", label: "Earned academic degrees", note: "Highest to lowest (PhD before MA, MD before BS). Exception: if the professional license already implies the degree, don't repeat it." },
                    { num: "3", label: "Graduate certifications", note: "Post-graduate specializations, board certifications (FACP, CCRN, CFP)." },
                    { num: "4", label: "Other certifications", note: "Professional certifications from recognized bodies (PMP, CISSP, AWS)." },
                    { num: "5", label: "Honours and awards", note: "Fellowships, honorary designations (FICD, OBE). These go last." },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <span className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {step.num}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{step.label}</p>
                        <p className="text-xs text-slate-500">{step.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                There&rsquo;s a second question beyond ordering: pre-nominal vs. post-nominal. Some titles
                go before the name (Dr., Prof.), while credentials go after. The key rule: don&rsquo;t
                double up. If you use &ldquo;Dr.&rdquo; before your name, you don&rsquo;t need to repeat the PhD or
                MD after it. Pick one placement and be consistent.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The underlying logic is that your primary professional identity should be clear from the
                first thing someone reads. If you&rsquo;re a practicing physician, &ldquo;MD&rdquo; first tells that
                story. If you&rsquo;re a researcher, leading with &ldquo;PhD&rdquo; may be more appropriate. The ordering
                reflects which credential is most relevant to your current role.
              </p>
            </section>

            {/* Section 2 */}
            <section id="medical" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Medical credentials: MD, DO, NP, RN, BSN
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Healthcare has some of the most developed credential conventions of any field,
                partly because the credentials carry real regulatory weight — they signal scope of
                practice, not just educational achievement.
              </p>

              <div className="space-y-5 mb-6">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Physicians (MD, DO)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    MD (Doctor of Medicine) and DO (Doctor of Osteopathic Medicine) are both
                    complete physician credentials. Neither is higher than the other — they reflect
                    different training paths. In signatures, they come immediately after the name
                    before any other credentials.
                  </p>
                  <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-sm">
                    <p>James Okafor, MD</p>
                    <p className="text-slate-500 text-xs mt-1">Attending Physician, Internal Medicine</p>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mt-3">
                    If you&rsquo;re also a researcher or hold a research degree: <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">MD, PhD</code>.
                    The clinical credential leads even if you identify more as a researcher, because
                    the MD is the licensure.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Nurse Practitioners (NP, APRN)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    Nurse Practitioners use NP as their primary credential, preceded by the
                    educational degree and followed by specialty certification. The most common format:
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "Master's-prepared FNP", format: "Maria Lopez, MSN, RN, FNP-C" },
                      { label: "DNP-prepared", format: "Maria Lopez, DNP, RN, FNP-BC" },
                      { label: "APRN with board certification", format: "Maria Lopez, APRN, NP-C" },
                    ].map((ex) => (
                      <div key={ex.label} className="bg-white border border-slate-200 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">{ex.label}</p>
                        <p className="font-mono text-sm">{ex.format}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Registered Nurses (RN, BSN)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    The nursing convention is licensure first (RN), then academic degree, then
                    specialty certifications. This is different from most other fields where the
                    degree comes first.
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "BSN-prepared RN", format: "Sarah Kim, RN, BSN" },
                      { label: "MSN with certification", format: "Sarah Kim, RN, MSN, CCRN" },
                      { label: "With specialty cert", format: "Sarah Kim, RN, BSN, PCCN" },
                    ].map((ex) => (
                      <div key={ex.label} className="bg-white border border-slate-200 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">{ex.label}</p>
                        <p className="font-mono text-sm">{ex.format}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                For complete nurse and physician signature examples including layout and HIPAA
                disclaimer placement, see the{" "}
                <Link href="/email-signature-for-nurse" className="text-blue-600 hover:underline">
                  email signature for nurses guide
                </Link>{" "}
                and{" "}
                <Link href="/email-signature-for-doctor" className="text-blue-600 hover:underline">
                  email signature for doctors guide
                </Link>
                .
              </p>
            </section>

            {/* Section 3 */}
            <section id="academic" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Academic credentials: PhD, EdD, MA
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Academic credentials carry different weight depending on context. In a university
                setting, a PhD after your name is expected and important. In a corporate email,
                it&rsquo;s situational — relevant if your research background is directly applicable,
                potentially pretentious if it isn&rsquo;t.
              </p>

              <div className="space-y-5 mb-6">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">PhD — when to use it</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Include your PhD in your signature when: you work in academia or research,
                    when it&rsquo;s directly relevant to your role (a data scientist with a statistics
                    PhD, a clinical psychologist), or when you&rsquo;re in a field where the doctorate
                    signals a specific scope of practice. Omit it when it&rsquo;s irrelevant to your
                    current work — a PhD in English Literature listed in a tech startup CEO&rsquo;s
                    signature just reads as credential-padding.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">EdD vs. PhD</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Both are doctoral degrees. The EdD (Doctor of Education) is typically a
                    professional practice doctorate, while a PhD is research-focused. In educational
                    administration and leadership roles, EdD is perfectly appropriate and should be
                    listed. In research contexts, the PhD carries more weight. Neither is inherently
                    superior — it depends on context.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Master&rsquo;s degrees (MA, MS, MEd, MBA)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Master&rsquo;s degrees are usually worth listing if they&rsquo;re directly relevant and
                    you don&rsquo;t also hold a doctorate in the same field. An MBA is worth listing in
                    business contexts. An MS in Computer Science is worth listing in tech roles. An
                    MA in Communications probably belongs on your LinkedIn rather than your email
                    signature for most corporate roles.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm font-semibold text-blue-800 mb-2">Academic signature example</p>
                <div className="font-mono text-sm text-blue-900 space-y-1">
                  <p>Prof. Amara Osei, PhD</p>
                  <p className="text-blue-700 text-xs">Associate Professor of Computational Biology</p>
                  <p className="text-blue-700 text-xs">Department of Biology &middot; University of Michigan</p>
                  <p className="text-blue-700 text-xs">amosei@umich.edu &middot; +1 (734) 555-0178</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="legal" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Legal credentials: JD and Esq.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                JD and Esq. are both used by lawyers, but they mean different things and are
                generally not used together.
              </p>

              <div className="space-y-5 mb-6">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">JD (Juris Doctor)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The JD is the academic degree conferred by law school. You use JD when you want
                    to emphasize the educational credential — common in academic settings, consulting
                    roles where the legal training is relevant but you&rsquo;re not practicing law, or on
                    CVs. Format: <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">Thomas Reid, JD</code>
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Esq. (Esquire)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Esq. is a courtesy title used by licensed, practicing attorneys in the United
                    States. It goes after the name without any other title. You&rsquo;d use Esq. when
                    you&rsquo;re actively practicing law and corresponding professionally. Don&rsquo;t use both
                    JD and Esq. — pick one. Format: <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">Thomas Reid, Esq.</code>
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">LLM and SJD</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The LLM (Master of Laws) and SJD (Doctor of Juridical Science) are post-JD
                    degrees. They&rsquo;re worth including when you&rsquo;re in a specialty where they add
                    meaningful context — international law, tax law, academic law practice. In
                    general practice, they can be listed after Esq. or JD if relevant.
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                For full attorney signature examples including required firm disclosures, the{" "}
                <Link href="/email-signature-for-lawyer" className="text-blue-600 hover:underline">
                  email signature for lawyers guide
                </Link>{" "}
                has jurisdiction-specific templates.
              </p>
            </section>

            {/* Section 5 */}
            <section id="financial" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Financial credentials: CPA, CFA, CFP
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Financial credentials are regulated by professional bodies and carry specific
                requirements about how they can be displayed. Here&rsquo;s what you need to know.
              </p>

              <div className="space-y-5 mb-6">
                {[
                  {
                    credential: "CPA (Certified Public Accountant)",
                    body: "State boards and AICPA",
                    notes: "The most widely recognized accounting credential in the US. Goes immediately after the name. If you hold a CPA in multiple states, you list it once — not state by state. Often paired with a master's: Jane Lee, CPA, MSA.",
                    example: "Jane Lee, CPA",
                  },
                  {
                    credential: "CFA (Chartered Financial Analyst)",
                    body: "CFA Institute",
                    notes: "The CFA Institute has specific rules: you can display 'CFA' after your name, but you cannot write 'James Chen is a CFA' or use 'CFA' as a noun. It must be used as an adjective or post-nominal. CFA candidates who haven't passed all three levels cannot use the designation.",
                    example: "James Chen, CFA",
                  },
                  {
                    credential: "CFP (Certified Financial Planner)",
                    body: "CFP Board",
                    notes: "CFP® (note the registered trademark symbol) is technically correct, though many practitioners omit it in signatures for brevity. The CFP Board requires that you clearly distinguish yourself as a CFP professional. Used by financial planners, wealth advisors, and investment advisors.",
                    example: "Marcus Williams, CFP®",
                  },
                ].map((cred) => (
                  <div key={cred.credential} className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-slate-900">{cred.credential}</h3>
                      <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded flex-shrink-0">
                        {cred.body}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{cred.notes}</p>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-sm">
                      {cred.example}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-amber-800 mb-2">Important for CFA holders</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  The CFA Institute actively monitors misuse of the CFA designation. If you&rsquo;re a
                  charterholder, display it correctly to avoid disciplinary action. If you&rsquo;re still
                  a candidate, you cannot use the designation at all until you pass Level III and meet
                  the work experience requirement.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="tech" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Tech credentials: PMP, AWS, CISSP
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Technology certifications are a different animal from professional licenses. They&rsquo;re
                not required to practice — they&rsquo;re signals of expertise in specific domains. That
                changes how you should think about including them.
              </p>

              <div className="space-y-5 mb-6">
                {[
                  {
                    credential: "PMP (Project Management Professional)",
                    issuer: "PMI",
                    notes: "The most recognized project management credential globally. Worth including if project management is a significant part of your role. Works well in consulting, construction, IT, and operations.",
                    example: "Elena Vasquez, PMP",
                  },
                  {
                    credential: "AWS Certified Solutions Architect / Developer",
                    issuer: "Amazon Web Services",
                    notes: "AWS certifications are widely recognized in cloud and tech. The full name is long for a signature — shorthand like 'AWS Certified' or 'AWS-SAA' (Solutions Architect Associate) is commonly used. Don't stack multiple AWS tiers; pick the highest or most relevant.",
                    example: "Ryan Park, AWS Certified Solutions Architect",
                  },
                  {
                    credential: "CISSP (Certified Information Systems Security Professional)",
                    issuer: "(ISC)²",
                    notes: "The gold standard in information security. Highly relevant for security engineers, CISOs, and security architects. The (ISC)² requires accurate representation — you must be in good standing to use the credential.",
                    example: "Nina Okafor, CISSP",
                  },
                  {
                    credential: "CISM / CISA",
                    issuer: "ISACA",
                    notes: "CISM (Certified Information Security Manager) and CISA (Certified Information Systems Auditor) are relevant for IT governance, audit, and security management roles. Worth including if these are central to your position.",
                    example: "Kevin Zhang, CISA, CISM",
                  },
                ].map((cred) => (
                  <div key={cred.credential} className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm">{cred.credential}</h3>
                      <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded flex-shrink-0">
                        {cred.issuer}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{cred.notes}</p>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-sm">
                      {cred.example}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                For consultant and professional services signature guidance including how to present
                multiple certifications, the{" "}
                <Link href="/email-signature-for-consultant" className="text-blue-600 hover:underline">
                  email signature for consultants guide
                </Link>{" "}
                is worth reading.
              </p>
            </section>

            {/* Section 7 */}
            <section id="how-many" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How many is too many — the alphabet soup problem
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                &ldquo;Alphabet soup&rdquo; is the informal term for signatures that look like this:
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
                <p className="text-xs text-red-600 font-semibold mb-2">Example of alphabet soup to avoid</p>
                <p className="font-mono text-sm text-red-800">
                  Patricia Walsh, PhD, EdD, MBA, CPA, CFA, PMP, CISSP, CISM
                </p>
                <p className="text-xs text-red-600 mt-2">
                  Eight credentials after the name. Even if every one is legitimate, this reads as insecure rather than impressive.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The rule of thumb that holds up across fields: list no more than three post-nominal
                credentials in your email signature. If you have more, prioritize:
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  "The credential that defines your professional license (required to practice)",
                  "The one most relevant to your current role",
                  "The one most recognized by the people you email",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed mb-4">
                Everything else belongs on your LinkedIn profile, your website bio, or your CV.
                Your email signature is not your full credentials list — it&rsquo;s a quick reference for
                people already corresponding with you.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Also worth considering: the people you email most frequently already know who you are.
                The credential list is most important for first-contact emails. After that, the
                signature is primarily functional — name, title, contact info.
              </p>
            </section>

            {/* Section 8 */}
            <section id="real-examples" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Real examples for each field
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Here are clean, correctly formatted credential lines for common professional
                contexts. These follow the ordering conventions for each field.
              </p>

              <div className="space-y-4">
                {[
                  {
                    field: "Hospitalist physician with research background",
                    signature: "David Osei, MD, PhD\nHospitalist &middot; Cleveland Clinic\n+1 (216) 555-0190 &middot; d.osei@clevelandclinic.org",
                  },
                  {
                    field: "ICU nurse with specialty certification",
                    signature: "Michelle Torres, RN, BSN, CCRN\nICU Charge Nurse &middot; Mass General Hospital",
                  },
                  {
                    field: "Family nurse practitioner",
                    signature: "James Nguyen, DNP, RN, FNP-BC\nFamily Nurse Practitioner &middot; Summit Primary Care",
                  },
                  {
                    field: "Practicing attorney",
                    signature: "Sophia Brennan, Esq.\nPartner, Litigation &middot; Brennan & Walsh LLP",
                  },
                  {
                    field: "Academic with JD",
                    signature: "Professor Rashid Malik, JD, LLM\nAssociate Professor of Law &middot; Georgetown University Law Center",
                  },
                  {
                    field: "Financial planner",
                    signature: "Caroline Yip, CFP®\nWealth Advisor &middot; Meridian Financial Group",
                  },
                  {
                    field: "Senior accountant",
                    signature: "Aaron Kim, CPA, MSA\nSenior Tax Manager &middot; Deloitte",
                  },
                  {
                    field: "Cloud security architect",
                    signature: "Priya Nair, CISSP, AWS-SAA\nCloud Security Architect &middot; Cloudbase Technologies",
                  },
                  {
                    field: "Project manager in construction",
                    signature: "Marco Vasquez, PMP, PE\nSenior Project Manager &middot; Turner Construction",
                  },
                  {
                    field: "University professor",
                    signature: "Prof. Laura Chen, PhD\nAssociate Professor of Neuroscience &middot; Johns Hopkins University",
                  },
                ].map((ex) => (
                  <div key={ex.field} className="bg-slate-50 rounded-xl p-5">
                    <p className="text-xs text-slate-500 font-medium mb-2">{ex.field}</p>
                    <div
                      className="font-mono text-sm text-slate-800 whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: ex.signature }}
                    />
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                To build any of these in a clean, copy-pasteable format, use the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>
                . The{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional email signature guide
                </Link>{" "}
                also has layout examples for credential-heavy signatures. And if you want to see
                what the full checklist for your signature looks like, start with{" "}
                <Link href="/blog/what-to-include-email-signature" className="text-blue-600 hover:underline">
                  what to include in an email signature
                </Link>
                .
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
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Put your credentials in the right order
              </h2>
              <p className="text-purple-100 text-sm mb-6 max-w-md mx-auto">
                Build a professionally formatted signature with your credentials displayed
                correctly — free in the NeatStamp editor.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Build My Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
