import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Changing Your Email Signature When Leaving a Job | NeatStamp",
  description:
    "What to update before you leave, what to put in your farewell signature, what to use between jobs, and when to switch to your new one. The transition nobody talks about.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-when-leaving-job",
  },
};

const faqs = [
  {
    q: "When should I update my email signature when leaving a job?",
    a: "You have a few windows: (1) In the weeks before your last day, if you want to start signalling the transition to regular contacts. (2) On your last day, when you switch to a farewell signature that includes your personal email and LinkedIn. (3) After access is cut, when you're using personal email only and need a between-jobs signature.",
  },
  {
    q: "Can I keep using my work email signature after leaving?",
    a: "You typically lose access to your work email on or shortly after your last day. Even before that, continuing to use your employer's branding after handing in notice can be awkward — especially in client communications where your departure might not yet be public. Transition to a personal farewell signature on your last day.",
  },
  {
    q: "What should my email signature look like between jobs?",
    a: "Keep it minimal: your name, your phone number, your LinkedIn URL, and a portfolio link if you have one. You don't need a title line — 'currently exploring new opportunities' reads as unnecessary. Just your contact information, cleanly presented. Anyone you're emailing in this period already knows you're between roles.",
  },
  {
    q: "When should I switch to my new job's email signature?",
    a: "On your first day, once you have your new work email set up. Not before — using a title you haven't officially started yet is premature, and it can complicate things if timelines shift. Set it up on day one as part of your onboarding.",
  },
  {
    q: "What about my old company signature — what happens to it?",
    a: "Once your email access is revoked, the signature is gone with it. If there were contacts who hadn't received your new details, they'll simply get a bounceback or no response. This is why sending a farewell email from your work account on your last day (with your personal email included) is important — it catches everyone in one go.",
  },
  {
    q: "Should I mention I'm leaving in my email signature?",
    a: "Only in the farewell signature sent on your last day. Not weeks before, not in an ongoing passive way. Announce it once, clearly, with your forwarding contact details, and move on. Keeping a 'moving on' message in your signature for weeks is odd and can create confusion.",
  },
];

export default function EmailSignatureWhenLeavingJobPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Changing Your Email Signature When Leaving a Job",
            url: "https://neatstamp.com/blog/email-signature-when-leaving-job",
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
            <span className="text-slate-700">Email Signature When Leaving a Job</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Career Transitions
                </span>
                <span className="text-sm text-slate-400">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Changing Your Email Signature When Leaving a Job
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Nobody talks about this part of leaving a job. The email signature transition
                gets awkward fast if you don&rsquo;t think about it ahead of time — from what to
                update before your last day, to what to put in your farewell message, to what
                you use in the gap before starting somewhere new. Here&rsquo;s a clear playbook
                for each stage.
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
                  ["#before-you-leave", "Before you leave: what to update"],
                  ["#last-day", "Last day: the farewell signature"],
                  ["#between-jobs", "Between jobs: the minimalist signature"],
                  ["#new-job", "New job: when to update"],
                  ["#forwarding-period", "The forwarding period"],
                  ["#freelance-transition", "Freelance transition signatures"],
                  ["#what-happens-to-old-signature", "What happens to your old signature"],
                  ["#templates", "Templates for each stage"],
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
            <section id="before-you-leave" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Before you leave: what to update
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In the weeks between handing in your notice and your last day, your
                work email signature doesn&rsquo;t need to change yet — and in many organizations,
                changing it early would be premature and potentially awkward with clients.
                But there are things to prepare behind the scenes.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to prepare before your last day
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Make sure your personal email address is current and professional. If you're still using an address from university or early career that looks unprofessional, this is the time to set up a new one.",
                  "Update your LinkedIn profile: at minimum, set your end date. You don't need to announce your departure publicly or change your headline yet — just make sure the data is accurate.",
                  "Update your portfolio or personal website if you have one. Any work samples or case studies you want to include should be in order, since you'll be linking to it from your new signature.",
                  "If you have a personal domain or professional website, check that it's live and looks good. You'll be directing people to it shortly.",
                  "Save any work contact information you'll need: clients, vendors, collaborators. Once your work email is gone, so is easy access to your sent history.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-for-job-seekers" className="text-blue-600 hover:underline">
                  email signature for job seekers guide
                </Link>{" "}
                covers the full picture of what you need in the transition period — including
                how to present yourself between roles.
              </p>
            </section>

            {/* Section 2 */}
            <section id="last-day" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Last day: the farewell signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                On your last day, before you send your farewell email, update your work
                signature to a farewell version. This signature will be attached to your
                goodbye email and serves as your final handoff to everyone you&rsquo;ve worked with.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What the farewell signature should include
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Your name (keep this from your work signature)",
                  "A brief note: 'Today is my last day at [Company]' — one line, no more",
                  "Your personal email address — this is the most important element",
                  "Your LinkedIn profile URL — so people can stay in touch",
                  "A portfolio link if you're in a field where it's relevant",
                  "Your personal mobile number if you're comfortable sharing it",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed mb-4">
                Leave out: the company logo, your title (you no longer hold it), any
                promotional banners, and any company boilerplate or disclaimers. You&rsquo;re
                speaking as yourself, not as a representative of the organization.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-2">
                  Keep the &ldquo;moving on&rdquo; message brief
                </p>
                <p className="text-sm text-blue-700 leading-relaxed">
                  A one-line note in the signature is sufficient: &ldquo;Today is my last day at
                  Acme — reach me at alex@alexchen.com going forward.&rdquo; Save the fuller
                  farewell message for the email body itself. Putting a long &ldquo;I&rsquo;m leaving&rdquo;
                  message in the signature is unnecessary and will look out of place in
                  forwarded or quoted emails.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="between-jobs" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Between jobs: the minimalist signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is the stage most people handle awkwardly. You no longer have a company
                to represent, you might not have a new title yet, and you&rsquo;re sending emails
                from a personal account. Here&rsquo;s the right approach: go minimal.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to include between jobs
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Your name",
                  "Your phone number",
                  "Your LinkedIn URL",
                  "Your portfolio link (if applicable)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to leave out
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  "'Currently exploring new opportunities' — it sounds like you're broadcasting desperation, even if it's true",
                  "Your previous job title — you don't hold it anymore, and it's confusing to recipients",
                  "Your previous company name or logo",
                  "A vague tagline like 'Marketing professional seeking new challenges'",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed mb-4">
                People who receive emails from you during this period generally know your
                situation. If they don&rsquo;t, the email body is the place to explain it — not
                a cryptic signature tagline. A clean four-element signature (name, phone,
                LinkedIn, portfolio) is professional and tells people everything they need
                to know to follow up with you.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For specific layouts and designs, the{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional email signature guide
                </Link>{" "}
                has clean templates that work well in personal-email contexts.
              </p>
            </section>

            {/* Section 4 */}
            <section id="new-job" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                New job: when to update
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The right time to switch to your new job&rsquo;s signature is on your first day —
                specifically, after you&rsquo;ve received your work email address and confirmed your
                title. Not before.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Why not before your start date
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                It happens more than you&rsquo;d think: someone accepts a job, puts the new title
                in their email signature the same day, and starts emailing people with it
                weeks before they actually start. Two problems with this. First, it can
                create confusion for people who assume you&rsquo;re already there and reachable
                through your new employer. Second, if the start date gets pushed or —
                more rarely but not never — the offer falls through, you&rsquo;ve created an
                awkward paper trail.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                First-day setup
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                On day one, setting up your signature is a legitimate early task. Ask your
                manager or HR what the standard format is — many organizations have brand
                guidelines for signatures. If they don&rsquo;t, use the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                to build one that matches the company&rsquo;s visual style.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Include: your new name (as it appears in company systems), your new title,
                the company name, your new work email, your work phone if you have one, and
                the company website. Add the company logo if the brand guidelines allow it.
              </p>
            </section>

            {/* Section 5 */}
            <section id="forwarding-period" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The forwarding period: keeping old contacts informed
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                After you leave, some contacts will email your old work address for weeks or
                months before they update their records. What happens to those emails depends
                on what your former employer does with the account — which is outside your
                control once you&rsquo;re gone.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What companies typically do with departed accounts
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  {
                    option: "Auto-reply for 30–90 days",
                    detail:
                      "Some companies set up an auto-reply from your old address that says you've left and provides an alternative contact. This is the most helpful option for maintaining business continuity.",
                  },
                  {
                    option: "Immediate deactivation",
                    detail:
                      "Many companies disable work email on or shortly after your last day. Senders get a bounceback. This is common and expected — which is why your farewell email matters.",
                  },
                  {
                    option: "Redirect to a successor",
                    detail:
                      "In some roles, your old address gets forwarded to whoever is covering your responsibilities. You may or may not know this is happening.",
                  },
                ].map((item) => (
                  <div key={item.option} className="bg-slate-50 rounded-xl p-4">
                    <p className="font-semibold text-slate-800 text-sm mb-1">{item.option}</p>
                    <p className="text-sm text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed mb-4">
                The most reliable way to manage the forwarding period is the farewell email
                itself. Send it to your key contacts on your last day from your work account,
                with your personal email prominently in both the body and the signature.
                That covers the transition for anyone who actually needs to reach you.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For contacts you missed or who email weeks later, they&rsquo;ll either get a
                bounceback with no alternative, or they&rsquo;ll find you on LinkedIn. Make sure
                your LinkedIn is up to date and has your contact preferences set so people
                can message you there.
              </p>
            </section>

            {/* Section 6 */}
            <section id="freelance-transition" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Freelance transition signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re leaving employment to go freelance or start your own business, the
                signature transition has an extra dimension: you&rsquo;re not just stepping away
                from one brand, you&rsquo;re building a new one from scratch.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What a new freelancer&rsquo;s signature should include
              </h3>
              <div className="border border-slate-200 rounded-xl p-5 mb-6 font-mono text-sm text-slate-600 space-y-1">
                <p className="font-bold text-slate-900">Sarah Okafor</p>
                <p>Independent UX Consultant</p>
                <p>+44 7700 900456 · sarah@sarahokafor.com</p>
                <p className="text-blue-600">sarahokafor.com · LinkedIn</p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Notice: no company name (because you&rsquo;re the company), a specific title
                rather than a vague one, a personal domain email rather than a Gmail address,
                and a portfolio website link. The personal domain email is important — it
                signals that you&rsquo;ve committed to this professionally, not just freelancing
                as a side note.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                When you have a business name
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;ve registered a business name or are trading as one:
              </p>
              <div className="border border-slate-200 rounded-xl p-5 mb-6 font-mono text-sm text-slate-600 space-y-1">
                <p className="font-bold text-slate-900">Sarah Okafor</p>
                <p>Founder, Okafor UX Studio</p>
                <p>+44 7700 900456 · sarah@okaforux.com</p>
                <p className="text-blue-600">okaforux.com · LinkedIn</p>
              </div>

              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-for-freelancers" className="text-blue-600 hover:underline">
                  email signature for freelancers guide
                </Link>{" "}
                covers this transition in much more detail — including how to handle the
                period before you have a business name or domain, and how to structure
                signatures when you work across multiple clients.
              </p>
            </section>

            {/* Section 7 */}
            <section id="what-happens-to-old-signature" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What happens to your old company signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Once you leave, your email account is closed and your signature goes with it.
                If you had a centrally managed signature (set up by IT or a third-party
                tool like NeatStamp Pro), the template still exists in the company&rsquo;s system
                but is no longer tied to your account.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For your own records: if you designed a signature you&rsquo;re proud of and want
                to reference for your next setup, take a screenshot or save the HTML before
                your last day. After access is gone, you won&rsquo;t be able to retrieve it.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                One thing that trips people up: forwarded emails. If you forwarded work emails
                to your personal account before leaving (check your company policy — some
                prohibit this), those forwarded emails will include your work signature in
                the quoted text. That&rsquo;s fine — it&rsquo;s just quoted content and isn&rsquo;t
                being sent on your behalf anymore.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Ready to build your between-jobs or new-job signature?{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  Start in the NeatStamp editor
                </Link>{" "}
                — it takes about 60 seconds and generates clean HTML for Gmail, Outlook,
                or Apple Mail. Or browse the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template library
                </Link>{" "}
                if you want a starting point.
              </p>
            </section>

            {/* Section 8 */}
            <section id="templates" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Templates for each stage
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s a quick reference for each stage of the transition.
              </p>

              <div className="space-y-6">
                {[
                  {
                    stage: "Farewell signature (last day at work)",
                    example: [
                      "Alex Chen",
                      "Today is my last day at Acme Corp — reach me at alex@alexchen.com",
                      "LinkedIn: linkedin.com/in/alexchen",
                    ],
                  },
                  {
                    stage: "Between jobs (personal email)",
                    example: [
                      "Alex Chen",
                      "+44 7700 900123",
                      "linkedin.com/in/alexchen · alexchen.com",
                    ],
                  },
                  {
                    stage: "New job (first day setup)",
                    example: [
                      "Alex Chen",
                      "Marketing Manager | Clearfield Group",
                      "+44 20 7946 0382 · alex.chen@clearfieldgroup.com",
                      "clearfieldgroup.com",
                    ],
                  },
                  {
                    stage: "Freelance / new business",
                    example: [
                      "Alex Chen",
                      "Independent Marketing Consultant",
                      "+44 7700 900123 · alex@alexchen.com",
                      "alexchen.com · LinkedIn",
                    ],
                  },
                ].map((template) => (
                  <div key={template.stage}>
                    <p className="text-sm font-semibold text-slate-700 mb-2">{template.stage}</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-sm text-slate-600 space-y-1">
                      {template.example.map((line, i) => (
                        <p key={i} className={i === 0 ? "font-bold text-slate-900" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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

            {/* Related */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related reading</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/email-signature-for-job-seekers",
                    title: "Email Signature for Job Seekers",
                    desc: "How to present yourself in the job search",
                  },
                  {
                    href: "/email-signature-for-freelancers",
                    title: "Email Signature for Freelancers",
                    desc: "Independent professional signature setup",
                  },
                  {
                    href: "/blog/email-signature-etiquette",
                    title: "Email Signature Etiquette",
                    desc: "When and how to use your signature",
                  },
                  {
                    href: "/professional-email-signature",
                    title: "Professional Email Signature",
                    desc: "The definitive guide to professional presentation",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 text-sm mb-1">{link.title}</p>
                    <p className="text-xs text-slate-500">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build your transition signature in 60 seconds
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Whether you&rsquo;re on your last day or your first day somewhere new, NeatStamp
                generates a clean signature that works in any email client.
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
