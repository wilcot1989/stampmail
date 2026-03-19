import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Remote Workers (2026)",
  description:
    "Time zone, video call link, availability hours, Slack handle — what remote workers actually need in their email signatures. Templates for fully remote, hybrid, and digital nomads.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-remote-workers",
  },
};

const faqs = [
  {
    q: "Should remote workers include their time zone in their email signature?",
    a: "Yes, for anyone working with colleagues or clients in different time zones. It removes a layer of mental math from every scheduling conversation and sets accurate expectations for response times. Format it simply: 'GMT+1 (London)' or 'PT (San Francisco)' — enough to be unambiguous without being verbose.",
  },
  {
    q: "Should I put my home address in my remote work signature?",
    a: "No. Your city is enough for context — it tells people your time zone and general location without sharing your actual home. 'Based in Edinburgh' or 'Edinburgh, UK' is the right format. A full home address is unnecessary and a potential privacy risk.",
  },
  {
    q: "Is it worth including a Zoom or meeting link in my signature?",
    a: "If you take video calls regularly, yes. A 'Book a call' Calendly link or a direct Zoom personal room link saves the back-and-forth of scheduling emails. If you rarely take calls or do mostly internal work, it adds length without value.",
  },
  {
    q: "Should I mention my working hours in my email signature?",
    a: "If your hours differ significantly from a standard 9–5 in your colleagues' time zones, a brief note is helpful: 'Available Mon–Fri, 7am–3pm GMT.' It prevents the assumption that you'll respond immediately to a 4pm GMT message. If your hours are conventional and your time zone covers it, a separate hours note isn't necessary.",
  },
  {
    q: "What's the difference between a remote employee's signature and a freelancer's signature?",
    a: "A remote employee represents their employer, so the signature follows the company's standard format with added remote-context elements (time zone, video link). A remote freelancer represents themselves, so the signature is more personal — often with a portfolio link, a booking link, and optionally their location and time zone.",
  },
  {
    q: "Should digital nomads put their location in their signature?",
    a: "Only if it's stable enough to be useful. If you're changing locations every week, a specific city is misleading — use just your time zone instead, and update it when you change regions. If you're settled somewhere for a few months, the city is worth including.",
  },
];

export default function EmailSignatureRemoteWorkersPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature for Remote Workers",
            url: "https://neatstamp.com/blog/email-signature-remote-workers",
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
            <span className="text-slate-700">Email Signature for Remote Workers</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                  Remote Work
                </span>
                <span className="text-sm text-slate-400">11 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature for Remote Workers — What to Include
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                A standard office worker&rsquo;s email signature (name, title, phone) misses
                information that&rsquo;s genuinely useful when your team spans time zones and
                you don&rsquo;t share a building with anyone. Here&rsquo;s what remote workers
                actually need in their signatures — and what&rsquo;s just clutter.
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
                  ["#what-changes", "What changes for remote workers"],
                  ["#time-zone", "Time zone — the most important addition"],
                  ["#location", "Location: city, not address"],
                  ["#video-links", "Video call links and booking links"],
                  ["#availability", "Availability hours"],
                  ["#communication-tools", "Slack and Teams handles"],
                  ["#the-reply-line", "The 'I might not reply instantly' debate"],
                  ["#remote-types", "Signatures by remote worker type"],
                  ["#multiple-time-zones", "Multiple time zone display"],
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
            <section id="what-changes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What changes for remote workers
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In an office, context is ambient. Everyone knows roughly where you are, what
                hours you keep, and how to reach you quickly. Remote work strips all of that
                away. Your email signature is one of the few places where you can restore
                some of that context automatically — without having to explain it in every
                email body.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The core additions for remote workers:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Time zone — so recipients know when you're actually working",
                  "Location — city-level, for cultural and scheduling context",
                  "Video call link — to skip the scheduling back-and-forth",
                  "Availability hours (when yours differ from standard)",
                  "Async communication handle (Slack, Teams)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Not all of these belong in every remote worker&rsquo;s signature — it depends on
                how distributed your team is and who you email externally. We&rsquo;ll break each
                one down below, including when to skip it.
              </p>
            </section>

            {/* Section 2 */}
            <section id="time-zone" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Time zone — the most important addition
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If your team or clients span more than one time zone, your time zone is the
                single most useful addition to your remote signature. It answers &ldquo;when can
                I expect a reply?&rdquo; without anyone having to ask.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to format it
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  {
                    example: "GMT+1 (London)",
                    note: "Good — unambiguous, includes offset and city",
                  },
                  {
                    example: "CET / Amsterdam",
                    note: "Good — common abbreviation plus location",
                  },
                  {
                    example: "PT (San Francisco)",
                    note: "Good for US recipients, less clear internationally",
                  },
                  {
                    example: "UTC+8",
                    note: "Technically correct but requires mental conversion — add the city",
                  },
                  {
                    example: "PST",
                    note: "Ambiguous between summer and winter (PDT vs PST) — include the offset",
                  },
                ].map((row) => (
                  <div key={row.example} className="flex items-start gap-3 text-sm">
                    <code className="bg-slate-100 px-2 py-1 rounded font-mono text-slate-700 whitespace-nowrap">
                      {row.example}
                    </code>
                    <span className="text-slate-600 mt-1">{row.note}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Remember to update it when daylight saving time changes, if your offset
                shifts. GMT+1 (BST) in summer is not the same as GMT (GMT) in winter. A
                wrong time zone in your signature can cause scheduling errors — it&rsquo;s worth
                a 30-second check every spring and autumn.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For fully co-located teams in the same time zone, skip this. It adds
                length without value if everyone is in the same city.
              </p>
            </section>

            {/* Section 3 */}
            <section id="location" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Location: city, not address
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Including your location in a remote signature gives colleagues and clients
                useful context: cultural reference points, travel logistics, and a quick
                mental anchor for who you are. City-level is the right granularity.
              </p>

              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                {[
                  {
                    label: "Right",
                    example: "Edinburgh, UK",
                    color: "green",
                  },
                  {
                    label: "Too much",
                    example: "42 Morningside Road, Edinburgh EH10 4BF",
                    color: "red",
                  },
                  {
                    label: "Too vague",
                    example: "Europe",
                    color: "yellow",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl p-4 ${
                      item.color === "green"
                        ? "bg-green-50 border border-green-200"
                        : item.color === "red"
                        ? "bg-red-50 border border-red-200"
                        : "bg-amber-50 border border-amber-200"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold mb-1 ${
                        item.color === "green"
                          ? "text-green-700"
                          : item.color === "red"
                          ? "text-red-700"
                          : "text-amber-700"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-sm font-mono text-slate-700">{item.example}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                A home address in an email signature is a privacy issue and provides no
                useful information beyond what the city already gives. Never include it.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For roles where your location is part of your professional identity —
                a consultant based in a specific market, for example — you might combine
                location and time zone: &ldquo;Singapore | SGT (UTC+8)&rdquo;.
              </p>
            </section>

            {/* Section 4 */}
            <section id="video-links" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Video call links and booking links
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                For anyone who takes regular video calls with external contacts, a meeting
                link in your signature is a genuine time saver. It converts the multi-email
                &ldquo;when are you free?&rdquo; process into a one-click action.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Two approaches
              </h3>
              <div className="space-y-4 mb-6">
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Scheduling link (recommended)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A Calendly, Cal.com, or Reclaim link lets the recipient pick a time from
                    your available slots. This works well if you have varied availability or
                    receive meeting requests from many different people. Display text like
                    &ldquo;Book a call&rdquo; or &ldquo;Schedule time with me&rdquo; — keep it short.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Direct video room link
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A Zoom personal room link or Google Meet meeting link gives recipients a
                    room to join for impromptu calls. This works better for internal teams
                    where meetings are often unscheduled. Include just the URL, labeled clearly:
                    &ldquo;Zoom: zoom.us/j/xxxxxxxxxx&rdquo;.
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Don&rsquo;t include both a scheduling link and a video room link — that&rsquo;s two lines
                doing similar jobs. Pick the one that matches how you actually work.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you rarely take calls, or if your calls are always ad hoc and internally
                initiated, skip this entirely. It adds a line that most recipients won&rsquo;t use.
              </p>
            </section>

            {/* Section 5 */}
            <section id="availability" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Availability hours
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A working hours note is useful in two specific scenarios: when your hours
                are significantly different from the norm, or when you&rsquo;re on a compressed
                schedule (four-day week, school hours, early starts).
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                When to include it
              </h3>
              <ul className="space-y-2 mb-4">
                {[
                  "You work a four-day week and want to set expectations about which day you're offline",
                  "Your working hours are significantly shifted from standard office hours (e.g., 6am–2pm)",
                  "You have a regular daily offline period (e.g., school pickup, 3–5pm)",
                  "You're a contractor who works a fixed number of hours and wants to signal that",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                When to skip it
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Your hours are conventional and match your stated time zone",
                  "You're in an 'always available' culture where listing hours would look odd",
                  "Your availability changes week to week (update your calendar status instead)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed">
                Format: &ldquo;Mon–Thu, 8am–4pm GMT&rdquo; or &ldquo;Mon–Fri, 9am–5pm CET (Fri off)&rdquo;.
                Keep it to one line. Don&rsquo;t elaborate on the reasons for your schedule — that&rsquo;s
                not your signature&rsquo;s job.
              </p>
            </section>

            {/* Section 6 */}
            <section id="communication-tools" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Slack and Teams handles
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If your team uses Slack or Microsoft Teams heavily — and most distributed
                teams do — listing your handle in your signature is a small touch that
                removes a lookup step for new contacts.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                This is most useful in email signatures sent to other people in the same
                organization, or to external contacts who are also in your Slack workspace.
                For purely external contacts who won&rsquo;t have access to your workspace, a
                Slack handle is meaningless.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-2">Formatting examples</p>
                <div className="space-y-1 text-sm font-mono text-slate-600">
                  <p>Slack: @alexchen</p>
                  <p>Teams: Alex Chen</p>
                  <p>Slack: @alex.chen (CompanyWorkspace)</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                One line is enough. Don&rsquo;t list both Slack and Teams unless you genuinely use
                both for different contact groups — that&rsquo;s adding lines that most recipients
                won&rsquo;t act on.
              </p>
            </section>

            {/* Section 7 */}
            <section id="the-reply-line" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The &ldquo;I might not reply instantly&rdquo; debate
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You&rsquo;ve probably seen this line in remote workers&rsquo; signatures: &ldquo;I work
                asynchronously and may not reply immediately. Please don&rsquo;t expect an instant
                response.&rdquo; Or variations like &ldquo;I batch my email twice a day&rdquo;.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The case for it
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Setting explicit expectations reduces anxiety on both sides. If recipients
                know you batch your email, they won&rsquo;t ping you on Slack an hour later
                wondering why you haven&rsquo;t replied. In async-first teams (fully distributed
                companies that deliberately avoid real-time pressure), this line is common
                and culturally expected.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The case against it
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                To clients and external contacts outside your organization&rsquo;s culture, a
                &ldquo;don&rsquo;t expect a fast reply&rdquo; line reads as indifferent or defensive. It
                pre-justifies slow responses before they&rsquo;ve even happened. If your SLA or
                professional norms require a response within 24 hours, the line is also
                misleading.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">The balanced view</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Use it for internal signatures in async-first organizations. Drop it for
                  external signatures where clients and partners have response time
                  expectations. Your time zone and working hours already imply availability
                  to anyone paying attention.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="remote-types" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Signatures by remote worker type
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Different remote setups have different signature needs. Here&rsquo;s a tailored
                breakdown.
              </p>

              <div className="space-y-6">
                {[
                  {
                    type: "Fully remote employee",
                    description:
                      "Works for an employer, all remote. Likely on a global or distributed team.",
                    signature: [
                      "Alex Chen",
                      "Senior Product Designer | Clearfield Group",
                      "+1 415 555 0123 · alex.chen@clearfieldgroup.com",
                      "clearfieldgroup.com",
                      "PT (San Francisco) · Slack: @alexchen",
                    ],
                    notes:
                      "Include the company's branding standards. Add time zone and Slack. A scheduling link is useful if you take external calls.",
                  },
                  {
                    type: "Hybrid worker",
                    description:
                      "In the office some days, remote others. Usually in one time zone.",
                    signature: [
                      "Alex Chen",
                      "Product Designer | Clearfield Group",
                      "+1 415 555 0123 · alex.chen@clearfieldgroup.com",
                      "clearfieldgroup.com",
                    ],
                    notes:
                      "Standard signature is usually fine. Skip the time zone if you're local. Omit 'in office Tue/Thu' — nobody needs to track your schedule from your signature.",
                  },
                  {
                    type: "Digital nomad",
                    description:
                      "Moves between locations. Time zone changes frequently.",
                    signature: [
                      "Alex Chen",
                      "Product Designer | Clearfield Group",
                      "+1 415 555 0123 · alex.chen@clearfieldgroup.com",
                      "Currently: GMT+7 (Thailand)",
                    ],
                    notes:
                      "Skip the city if you change frequently — use time zone only. Update the UTC offset when you cross time zones. Don't add 'currently in...' if it changes weekly.",
                  },
                  {
                    type: "Remote freelancer",
                    description:
                      "Self-employed, working remotely. Often emails clients in multiple time zones.",
                    signature: [
                      "Alex Chen",
                      "UX Designer & Researcher",
                      "+1 415 555 0123 · alex@alexchen.design",
                      "alexchen.design · Book a call",
                      "PT (San Francisco)",
                    ],
                    notes:
                      "No employer name — you're the brand. Include a portfolio link and a scheduling link if you take new client calls regularly.",
                  },
                ].map((item) => (
                  <div key={item.type} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                      <p className="font-semibold text-slate-900 text-sm">{item.type}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                    <div className="p-5">
                      <div className="font-mono text-sm text-slate-600 space-y-0.5 mb-4">
                        {item.signature.map((line, i) => (
                          <p key={i} className={i === 0 ? "font-bold text-slate-900" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9 */}
            <section id="multiple-time-zones" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Multiple time zone display
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Occasionally someone asks about showing two time zones — for example, an
                American working with European clients who wants to display both ET and CET.
                It&rsquo;s possible, but it only works if both time zones are genuinely relevant
                to your contact&rsquo;s daily experience.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 font-mono text-sm text-slate-600 space-y-0.5">
                <p className="font-bold text-slate-900">Alex Chen</p>
                <p>Head of Sales | Clearfield Group</p>
                <p>+1 212 555 0123 · alex.chen@clearfieldgroup.com</p>
                <p>clearfieldgroup.com</p>
                <p>ET (New York) / CET (Amsterdam)</p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Keep it to two time zones at most, and only include a second one if you
                genuinely straddle both in your daily work. Three or more time zones in a
                signature becomes unreadable and suggests you&rsquo;re covering for an unrealistic
                schedule.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For more on what remote workers should and shouldn&rsquo;t include, the{" "}
                <Link href="/blog/what-to-include-email-signature" className="text-blue-600 hover:underline">
                  what to include in an email signature guide
                </Link>{" "}
                covers every element in detail. The{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature guide
                </Link>{" "}
                is also worth reading if you&rsquo;re setting up signatures for a distributed team.
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

            {/* Related */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related reading</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/email-signature-for-business",
                    title: "Business Email Signatures",
                    desc: "Team setup and brand consistency for distributed teams",
                  },
                  {
                    href: "/email-signature-for-freelancers",
                    title: "Email Signature for Freelancers",
                    desc: "Independent professional and remote freelancer setup",
                  },
                  {
                    href: "/email-signature-with-pronouns",
                    title: "Email Signatures with Pronouns",
                    desc: "Adding pronouns professionally",
                  },
                  {
                    href: "/professional-email-signature",
                    title: "Professional Email Signature",
                    desc: "The full guide to professional presentation",
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
                Build your remote worker signature
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Add your time zone, location, and video link in the NeatStamp editor —
                free, and ready to install in Gmail, Outlook, or Apple Mail.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Open the Editor — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
