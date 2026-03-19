import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Marketing — Turn Every Email Into a Campaign | NeatStamp",
  description:
    "Your team sends thousands of emails a month. That's free advertising space most companies completely ignore. Here's how to turn email signatures into a real marketing channel.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-marketing",
  },
};

const faqs = [
  {
    q: "Does email signature marketing actually work?",
    a: "Yes, when done with a specific offer and a trackable link. Generic branding banners ('Follow us on social!') rarely move the needle. A webinar registration link with a deadline, or a link to a case study that's directly relevant to who your team emails, can generate real conversions — and the cost is zero beyond the time to set it up.",
  },
  {
    q: "How do I track clicks from email signature banners?",
    a: "Use UTM parameters on every link. A link like /demo?utm_source=email_signature&utm_medium=signature_banner&utm_campaign=q2_webinar will show up in Google Analytics or any other analytics tool as a distinct traffic source. Without UTMs, you can't tell signature traffic from direct traffic.",
  },
  {
    q: "Should everyone on my team use the same banner?",
    a: "Not necessarily. Your sales team's signature banner might link to a free trial or demo. Your support team's might link to your knowledge base or a satisfaction survey. Customer-facing teams benefit from campaign banners; internal or back-office teams probably don't need them at all.",
  },
  {
    q: "How often should I rotate email signature banners?",
    a: "Every 4–8 weeks is a reasonable cadence. Any shorter and you're adding overhead without meaningful data. Any longer and your team's regular contacts stop noticing. Align rotations with your actual marketing calendar — product launches, events, seasonal promotions.",
  },
  {
    q: "Can I A/B test email signature banners?",
    a: "You can, though it requires some coordination. Split your team into two groups with different banners, use distinct UTM campaigns for each, and compare click-through rates over the same time period. It's not as clean as website A/B testing, but you'll get directional data within a few weeks.",
  },
  {
    q: "What's a realistic click-through rate for email signature banners?",
    a: "Industry estimates vary, but 0.5–2% is typical for a relevant offer sent to warm contacts. That sounds low until you do the math: if your team sends 2,000 emails per day and you get a 1% CTR, that's 20 qualified clicks per day — 600 per month — at zero media cost.",
  },
];

export default function EmailSignatureMarketingPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Marketing",
            url: "https://neatstamp.com/blog/email-signature-marketing",
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
            <span className="text-slate-700">Email Signature Marketing</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                  Marketing
                </span>
                <span className="text-sm text-slate-400">13 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Marketing — Turn Every Email Into a Campaign
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Your team is already sending thousands of emails every month. Each one has a
                footer. Most of those footers are doing nothing beyond listing a phone number.
                That&rsquo;s a lot of wasted real estate — and the fix is cheaper than any ad
                campaign you&rsquo;re running right now.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 13 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#the-math", "The math: how many impressions you're already getting"],
                  ["#what-works", "What actually works in banner CTAs"],
                  ["#campaign-examples", "Real campaign examples"],
                  ["#utm-tracking", "Tracking clicks with UTM parameters"],
                  ["#ab-testing", "A/B testing your banners"],
                  ["#measuring-roi", "Measuring ROI"],
                  ["#seasonal-rotation", "Seasonal rotation strategy"],
                  ["#team-deployment", "Team-wide deployment"],
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
            <section id="the-math" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The math: how many impressions you&rsquo;re already getting
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Let&rsquo;s be concrete. Take a company with 50 employees who each send an average
                of 40 emails per day. That&rsquo;s 2,000 emails per day — 40,000 per month —
                and every single one of them has a signature at the bottom. If you added a
                banner to those signatures, you&rsquo;d have 40,000 banner impressions per month at
                zero additional cost. No media buying. No targeting. No creative budget beyond
                designing the image once.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  Quick impression calculator
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>10 employees × 40 emails/day</span>
                    <span className="font-medium">400 daily impressions / 8,000/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50 employees × 40 emails/day</span>
                    <span className="font-medium">2,000 daily / 40,000/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>200 employees × 40 emails/day</span>
                    <span className="font-medium">8,000 daily / 160,000/month</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The impressions are already happening. You&rsquo;re just not directing them anywhere.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                There&rsquo;s a meaningful distinction worth making here: email signature impressions
                are warm impressions. Unlike a display ad shown to someone who&rsquo;s never heard of
                you, your signature appears in emails from real people those recipients already
                know. The trust transfer is built in. A prospect who just had a good call with
                your sales rep is more likely to click through to a case study than the same
                person would be if they saw a cold banner ad.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature guide
                </Link>{" "}
                covers the full picture of what a team signature setup looks like. For now,
                let&rsquo;s focus on the marketing piece specifically.
              </p>
            </section>

            {/* Section 2 */}
            <section id="what-works" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What actually works in banner CTAs
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Not all signature banners perform equally. There&rsquo;s a reliable pattern: the more
                specific the offer, the better it converts. Generic branding is the lowest
                performer.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Specific offers beat generic branding
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                &ldquo;Follow us on LinkedIn&rdquo; gets very few clicks. Nobody&rsquo;s going to stop reading
                their email to follow a company they&rsquo;re already doing business with. &ldquo;Upcoming
                webinar: How we cut customer churn by 34% — Register by Friday&rdquo; gets clicks.
                There&rsquo;s a specific thing, a specific benefit, and a deadline.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    label: "High performers",
                    color: "green",
                    items: [
                      "Webinar or event registrations with a date",
                      "Limited-time offers or early access",
                      "Case studies relevant to the email recipient's industry",
                      "Product launches (new feature announcements)",
                      "Job openings (particularly in a hot market)",
                      "Free tool or resource downloads",
                    ],
                  },
                  {
                    label: "Average performers",
                    color: "yellow",
                    items: [
                      "Blog posts (unless timely or highly relevant)",
                      "Generic product demos",
                      "Awards and recognitions",
                      "Customer reviews or testimonials",
                    ],
                  },
                  {
                    label: "Low performers",
                    color: "red",
                    items: [
                      "\"Follow us on social media\"",
                      "Company mission statements",
                      "Generic brand logos without a CTA",
                      "\"Learn more about us\"",
                    ],
                  },
                ].map((group) => (
                  <div key={group.label} className="bg-slate-50 rounded-xl p-5">
                    <p
                      className={`text-sm font-semibold mb-2 ${
                        group.color === "green"
                          ? "text-green-700"
                          : group.color === "yellow"
                          ? "text-amber-700"
                          : "text-red-700"
                      }`}
                    >
                      {group.label}
                    </p>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Banner design basics
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Keep banners to 600px wide and 60–90px tall. Taller than that and the signature
                starts to dwarf the email itself, which looks odd. The text on the banner needs
                to be readable at small sizes — 14px minimum, high contrast. And always include
                an alt tag with the offer text, so recipients who have images blocked still see
                the message.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For more on what banner designs convert, the{" "}
                <Link href="/blog/email-signature-banner-ideas" className="text-blue-600 hover:underline">
                  email signature banner ideas guide
                </Link>{" "}
                has templates and examples broken down by use case.
              </p>
            </section>

            {/* Section 3 */}
            <section id="campaign-examples" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Real campaign examples
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here are four scenarios based on actual company setups — without naming
                specific companies.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "B2B SaaS company — Webinar campaign",
                    body: "A 60-person software company ran a live demo webinar targeting mid-market operations teams. They updated all 15 customer-facing employees' signatures with a banner: 'Live Demo: Automating your ops workflow — [Date] at 2pm ET. Reserve your spot.' Over 3 weeks, they tracked 340 clicks from the signature banner alone, resulting in 28 webinar registrations. At their usual cost-per-registration from paid ads (~$40 each), that was $1,120 of equivalent value from a banner that cost nothing to distribute.",
                  },
                  {
                    title: "Recruiting firm — Hiring campaign",
                    body: "A 30-person staffing agency added a banner to all recruiters' signatures: 'We're hiring senior technical recruiters — see open roles.' The banner linked directly to the job description. They received 11 qualified applications over 6 weeks from people who had been emailed by their team previously — former candidates, past clients, and professional connections. None of those candidates came through job boards. The cost was one banner image and five minutes to deploy.",
                  },
                  {
                    title: "Professional services firm — Case study campaign",
                    body: "A 20-person consulting firm rotated case study banners by service line. Their strategy team's emails showed a banner linking to an operations case study. Their technology team showed a different one. Each banner said '13% cost reduction in 90 days — full case study.' They saw a measurable uptick in proposal requests in the two months the campaign ran, with attribution coming via UTM-tagged links in their CRM.",
                  },
                  {
                    title: "E-commerce brand — Seasonal offer",
                    body: "A small e-commerce brand with a customer support team of 8 people added a seasonal banner to every support reply: '15% off your next order — use code SUPPORT15, expires [date].' Their logic was that anyone emailing support is an existing customer — exactly the right audience for a retention offer. They saw a 4% redemption rate on the code, which they attributed partly to the signature and partly to the direct email context.",
                  },
                ].map((example) => (
                  <div key={example.title} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2">{example.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{example.body}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                The pattern across all of these: a specific offer, a trackable link, and
                deploying only to the team members whose contacts were the right audience.
                The{" "}
                <Link href="/small-business-email-signature" className="text-blue-600 hover:underline">
                  small business email signature guide
                </Link>{" "}
                covers how to set this up with a small team specifically.
              </p>
            </section>

            {/* Section 4 */}
            <section id="utm-tracking" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Tracking clicks with UTM parameters
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Without tracking, you&rsquo;re flying blind. UTM parameters are the simplest way to
                see exactly how many people clicked your signature banner and what they did
                next on your website.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Building your UTM link
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                A UTM-tagged link looks like this:
              </p>
              <div className="bg-slate-900 rounded-xl p-4 mb-6 overflow-x-auto">
                <code className="text-sm text-green-400 font-mono">
                  https://yoursite.com/webinar?utm_source=email_signature&amp;utm_medium=banner&amp;utm_campaign=q2_webinar_march
                </code>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  {
                    param: "utm_source",
                    value: "email_signature",
                    note: "Identifies the traffic source as your email signature",
                  },
                  {
                    param: "utm_medium",
                    value: "banner",
                    note: "Distinguishes it from text links in signatures",
                  },
                  {
                    param: "utm_campaign",
                    value: "q2_webinar_march",
                    note: "Lets you separate different campaigns over time",
                  },
                  {
                    param: "utm_content",
                    value: "sales_team",
                    note: "Optional: tracks which team or department drove the click",
                  },
                ].map((row) => (
                  <div key={row.param} className="flex items-start gap-3 text-sm">
                    <code className="bg-slate-100 px-2 py-1 rounded font-mono text-slate-700 whitespace-nowrap">
                      {row.param}={row.value}
                    </code>
                    <span className="text-slate-600 mt-1">{row.note}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Where to see the data
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                In Google Analytics 4, go to Reports &rarr; Acquisition &rarr; Traffic
                acquisition and filter by your source. If you&rsquo;re using a CRM like HubSpot
                or Salesforce, make sure the UTM values are being captured on form submissions
                so you can connect clicks to deals.
              </p>
              <p className="text-slate-600 leading-relaxed">
                One practical tip: use a URL shortener or your own branded short link
                (yoursite.com/go/webinar) so the signature banner link doesn&rsquo;t look like a
                wall of query strings to anyone who hovers over it. The underlying UTM
                parameters still fire regardless.
              </p>
            </section>

            {/* Section 5 */}
            <section id="ab-testing" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                A/B testing your banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You can run a meaningful A/B test on signature banners, though it takes a
                bit more coordination than web testing. Here&rsquo;s a simple setup that works.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to structure the test
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Split your team roughly in half — Group A and Group B. Try to split by email volume rather than headcount so both groups send a similar number of emails.",
                  "Group A gets Banner Version 1. Group B gets Banner Version 2. The only difference between the two should be the one variable you're testing (headline text, image, CTA wording, or color).",
                  "Each version gets a distinct UTM campaign tag: utm_campaign=q2_webinar_v1 and utm_campaign=q2_webinar_v2.",
                  "Run for at least 2 weeks to smooth out day-of-week variation.",
                  "Compare click-through rates: (total clicks / total emails sent) × 100.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to test first
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Headline copy is almost always the biggest lever. Before testing colors or
                image styles, test whether a benefit-led headline (&ldquo;Cut your onboarding time
                in half&rdquo;) outperforms a feature-led one (&ldquo;New onboarding automation tool&rdquo;).
                In most cases, it does — but you&rsquo;ll know for certain for your specific
                audience.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Once you have a winning headline, then test the CTA button color, then the
                imagery. Work through one variable at a time. It takes longer but the data
                is actually interpretable.
              </p>
            </section>

            {/* Section 6 */}
            <section id="measuring-roi" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Measuring ROI
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The ROI calculation for email signature marketing is unusually straightforward
                because the cost side is so small. Here&rsquo;s a basic framework.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-3">Simple ROI formula</p>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>
                    <strong>Cost:</strong> Time to design banner (1–3 hours) + time to deploy to
                    team (30 minutes with a tool like NeatStamp)
                  </p>
                  <p>
                    <strong>Revenue:</strong> Conversions attributed to signature × average deal
                    value (or LTV for e-commerce)
                  </p>
                  <p>
                    <strong>Equivalent ad spend:</strong> Clicks generated × your average
                    cost-per-click from paid channels
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The &ldquo;equivalent ad spend&rdquo; metric is useful for justifying the effort to
                stakeholders who want a dollar figure. If you got 500 clicks from your signature
                campaign and your average Google Ads CPC is $3.50, that&rsquo;s $1,750 of equivalent
                paid traffic — from a banner that cost maybe two hours of a designer&rsquo;s time.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For direct revenue attribution, you&rsquo;ll need your UTM data connected to a
                conversion event — a form submission, a purchase, a demo booking. If you
                can&rsquo;t connect the click to a downstream event, you&rsquo;re measuring impressions and
                clicks only, which is still useful for optimizing creative but won&rsquo;t satisfy
                a finance team asking &ldquo;did this make money?&rdquo;
              </p>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-design" className="text-blue-600 hover:underline">
                  email signature design guide
                </Link>{" "}
                has more on how to structure banners that are measurable from the start.
              </p>
            </section>

            {/* Section 7 */}
            <section id="seasonal-rotation" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Seasonal rotation strategy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Treating your signature banner as a permanent fixture is a missed opportunity.
                The companies that get the most out of this channel treat it like a campaign
                channel and rotate regularly.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                A simple annual calendar
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-slate-600 border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-4 py-3 border border-slate-200 font-semibold text-slate-700">
                        Period
                      </th>
                      <th className="text-left px-4 py-3 border border-slate-200 font-semibold text-slate-700">
                        Campaign idea
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Jan–Feb", "New year pricing or product launch"],
                      ["Mar–Apr", "Spring webinar or event series"],
                      ["May–Jun", "Mid-year case study or review"],
                      ["Jul–Aug", "Hiring push (summer departures create openings)"],
                      ["Sep–Oct", "Fall conference or product update"],
                      ["Nov", "End-of-year offer or early renewal"],
                      ["Dec", "Year in review, thank-you message"],
                    ].map(([period, campaign]) => (
                      <tr key={period}>
                        <td className="px-4 py-3 border border-slate-200 font-medium text-slate-700">
                          {period}
                        </td>
                        <td className="px-4 py-3 border border-slate-200">{campaign}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The exact schedule will depend on your business calendar, but the principle
                holds: plan your banners in advance, align them to campaigns that are already
                happening, and rotate before they go stale. A banner that&rsquo;s been sitting
                unchanged for six months will get banner blindness from your regular contacts.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Connections with regular email contacts (clients, partners, frequent prospects)
                will see your banner repeatedly. That repetition can work for you — consistent
                messaging builds familiarity — or against you if the banner becomes noise. Keep
                it fresh enough that people periodically notice it again.
              </p>
            </section>

            {/* Section 8 */}
            <section id="team-deployment" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Team-wide deployment
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The hardest part of email signature marketing isn&rsquo;t the creative — it&rsquo;s
                getting the whole team actually using the right banner consistently.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The consistency problem
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you send 20 people instructions to update their signature manually, you&rsquo;ll
                end up with 20 variations: some people will use the right banner, some will
                use an old version, some won&rsquo;t update at all, and a few will do something
                creative that breaks your brand standards. Manual rollouts are unreliable at
                any team size above 5.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Deployment options
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  "NeatStamp Pro: Create a team template, update it centrally, and everyone's signature updates automatically. This is the cleanest option for teams of any size.",
                  "Google Workspace admin: You can push signatures through the Admin Console using a template, but it requires some HTML knowledge and doesn't give individual customisation.",
                  "Microsoft 365 / Exchange: Centralized transport rules can append a footer to outgoing mail. It appends to the email content rather than replacing the user's signature, which can cause duplicates if users have their own signatures set.",
                  "Manual with a checklist: Works for teams of 3–5 people. Create the signature in the NeatStamp editor, export the HTML, and share step-by-step install instructions for Gmail or Outlook.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Segmenting by team
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Not every team member should have the same banner. Sales team emails going to
                prospects should have a CTA relevant to acquisition (demo, case study, webinar).
                Support team emails going to existing customers should have CTAs relevant to
                retention or upsell. Finance and HR teams probably don&rsquo;t need a campaign
                banner at all — or at least a different one.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Start with your highest email-volume, customer-facing team. Measure what works,
                then expand to others. Ready to set it up?{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  Build your signature in the NeatStamp editor
                </Link>{" "}
                and add a banner in the same step. Or see the{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing page
                </Link>{" "}
                if you&rsquo;re looking at the team deployment options.
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

            {/* Related articles */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related reading</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/blog/email-signature-banner-ideas",
                    title: "Email Signature Banner Ideas",
                    desc: "Templates and examples for every campaign type",
                  },
                  {
                    href: "/blog/email-signature-best-practices",
                    title: "Email Signature Best Practices",
                    desc: "The full guide to what works and what doesn't",
                  },
                  {
                    href: "/email-signature-for-business",
                    title: "Business Email Signatures",
                    desc: "Team setup, brand standards, and deployment",
                  },
                  {
                    href: "/email-signature-design",
                    title: "Email Signature Design",
                    desc: "Layout, dimensions, and design principles",
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
                Start turning your team&rsquo;s emails into a marketing channel
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Build a signature with a campaign banner in the NeatStamp editor — free.
                No design software required.
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
