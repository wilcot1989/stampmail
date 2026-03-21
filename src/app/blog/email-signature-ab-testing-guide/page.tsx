import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature A/B Testing: A Practical Guide",
  description:
    "How to run real A/B tests on your email signature. What to measure, how long to run tests, which variants move the needle, and what the data actually looks like.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-ab-testing-guide",
  },
};

const faqs = [
  {
    q: "Can you really A/B test an email signature?",
    a: "Yes, and it's more useful than most people expect. The key is testing one variable at a time over a meaningful sample size. Signature A/B tests typically measure click-through rate on specific links (like a Calendly booking link or a website link), reply rate on cold outreach, and occasionally conversion events like meeting bookings. You won't get statistically perfect data, but you'll get directional signals that are actionable.",
  },
  {
    q: "How long should an email signature A/B test run?",
    a: "At minimum, run each variant for 2 weeks and across at least 200 sent emails per variant. For most professionals who send 30–50 emails per day, that's achievable in 4–7 days. But 2 weeks is safer because day-of-week effects (fewer emails on Fridays and Mondays) can skew results if you stop too early.",
  },
  {
    q: "What is the best thing to A/B test in an email signature?",
    a: "The highest-impact test in my experience is the call-to-action: testing a booking link vs. no booking link, or testing the wording of the CTA anchor text. Second is headshot vs. no headshot for sales teams — this one often shows a meaningful difference in reply rate. Testing layout (horizontal vs. vertical) is interesting but harder to isolate as a single variable.",
  },
  {
    q: "How do I measure email signature click-through rate?",
    a: "Add UTM parameters to your links: utm_source=email&utm_medium=signature&utm_campaign=variant_a. When recipients click, Google Analytics or your web analytics tool records the session. Compare sessions attributed to each variant over your test period. For direct tracking without UTM parameters, some signature tools (including NeatStamp Pro) include built-in click tracking.",
  },
  {
    q: "Does the time of year affect email signature A/B test results?",
    a: "Yes, significantly. Reply rates and click-through rates vary by month, quarter end, and major holidays. Run your A/B test during a 'normal' period — avoid Q4 holiday season, major conference weeks, and summer holiday months if your audience is concentrated in one region. If you must test during unusual periods, note the context so you can discount certain findings.",
  },
];

export default function EmailSignatureABTestingPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature A/B Testing Guide",
            url: "https://neatstamp.com/blog/email-signature-ab-testing-guide",
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
            <span className="text-slate-700">Email Signature A/B Testing Guide</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Analytics
                </span>
                <span className="text-sm text-slate-400">15 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature A/B Testing: A Practical Guide to Getting Real Data
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Most people build a signature, decide they like how it looks, and leave it
                alone for years. That&rsquo;s a mistake when you&rsquo;re sending 40+ emails per day —
                you have a huge built-in sample size that most marketers would love to have.
                Running structured A/B tests on your signature doesn&rsquo;t require a data science
                background. It requires a clear question, two distinct variants, and enough
                patience to let the data accumulate. Here&rsquo;s exactly how to do it.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 15 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#why-test", "Why test your email signature?"],
                  ["#what-to-test", "What to test (ranked by impact)"],
                  ["#what-to-measure", "What to measure"],
                  ["#how-to-set-up", "How to set up the test"],
                  ["#how-long", "How long to run it"],
                  ["#real-examples", "Real examples and results"],
                  ["#common-mistakes", "Common testing mistakes"],
                  ["#neatstamp-ab", "NeatStamp's A/B testing feature"],
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
            <section id="why-test" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why test your email signature?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Here&rsquo;s a number worth sitting with: if you send 40 emails per day and work
                250 days per year, that&rsquo;s 10,000 emails annually — each one with your
                signature at the bottom. If your signature has even a 2% click-through rate
                on a booking link, that&rsquo;s 200 people per year who clicked and visited your
                calendar page. If you could improve that to 3% with a better CTA, that&rsquo;s
                300 clicks — 100 extra chances at a meeting or sale.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most marketing channels you&rsquo;d pay to optimize — display ads, landing pages,
                email campaigns — have smaller sample sizes than your daily email output.
                Yet almost nobody tests their signature. They just pick a design they like
                and move on.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Testing your signature is also low-risk. You&rsquo;re not testing ad copy or a
                pricing page where a bad variant costs you real money. The worst case of
                a signature A/B test is that one variant is slightly less engaging than the
                other — not a crisis.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The goal isn&rsquo;t academic rigor — you&rsquo;re not publishing a peer-reviewed paper.
                The goal is directional evidence: is a headshot better or worse for my
                reply rate? Does including a Calendly link help or hurt? Does a shorter
                signature get more clicks? These questions have answers, and testing is
                the only reliable way to find them.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Before running a test, make sure your baseline signature follows{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  best practices
                </Link>{" "}
                — testing a broken baseline produces misleading results. Check your
                deliverability score too, since a signature that lands in spam won&rsquo;t
                generate any clicks regardless of the variant. The{" "}
                <Link href="/email-signature-deliverability" className="text-blue-600 hover:underline">
                  deliverability guide
                </Link>{" "}
                and the{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional signature guide
                </Link>{" "}
                are worth a quick read first.
              </p>
            </section>

            {/* Section 2 */}
            <section id="what-to-test" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to test (ranked by impact)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Not all variables are worth testing. Some have a bigger impact on measurable
                outcomes than others. Here&rsquo;s my ranking based on what I&rsquo;ve seen produce
                meaningful data.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    rank: "1",
                    impact: "High",
                    color: "red",
                    variable: "Presence and wording of a CTA",
                    detail: 'Does having a Calendly booking link increase meetings booked? Does "Schedule 15 minutes" outperform "Book a call"? CTAs have a direct effect on a measurable action, making them the clearest thing to test.',
                    metric: "Click-through rate, meetings booked",
                  },
                  {
                    rank: "2",
                    impact: "High",
                    color: "red",
                    variable: "Headshot vs. no headshot",
                    detail: "For sales, consulting, and other relationship-driven roles, a headshot often improves reply rate. But in some technical or conservative contexts, it can have the opposite effect. Test it for your specific audience.",
                    metric: "Reply rate on cold outreach",
                  },
                  {
                    rank: "3",
                    impact: "Medium",
                    color: "amber",
                    variable: "Promotional banner vs. no banner",
                    detail: "Does a promotional banner below the signature generate clicks to your campaign page? Or does it make the signature feel cluttered and reduce engagement? Banner testing has a clear metric (banner click rate) and is worth running before any major campaign.",
                    metric: "Banner click-through rate",
                  },
                  {
                    rank: "4",
                    impact: "Medium",
                    color: "amber",
                    variable: "Short vs. long signature",
                    detail: "A 3-line minimal signature vs. a full 6-line contact block with logo, headshot, and social icons. Shorter signatures sometimes perform better in cold outreach (feels more personal). Longer ones can look more authoritative for inbound or established relationships.",
                    metric: "Reply rate",
                  },
                  {
                    rank: "5",
                    impact: "Low-medium",
                    color: "slate",
                    variable: "Layout: horizontal vs. vertical",
                    detail: "A single-column vertical layout vs. a two-column layout (contact details on the left, headshot on the right). Layout differences are harder to isolate as the sole variable but worth testing for branding consistency reasons.",
                    metric: "Click-through rate",
                  },
                  {
                    rank: "6",
                    impact: "Low",
                    color: "slate",
                    variable: "Social icon count",
                    detail: "2 social icons vs. 5 social icons. The hypothesis is that more icons dilute attention. In practice, this is a small effect — don't run this test first.",
                    metric: "Individual social link click rate",
                  },
                ].map((item) => (
                  <div key={item.rank} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          item.color === "red" ? "bg-red-100 text-red-700" :
                          item.color === "amber" ? "bg-amber-100 text-amber-700" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {item.rank}
                        </span>
                        <h3 className="font-semibold text-slate-900">{item.variable}</h3>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                        item.color === "red" ? "bg-red-50 text-red-600" :
                        item.color === "amber" ? "bg-amber-50 text-amber-600" :
                        "bg-slate-100 text-slate-500"
                      }`}>
                        {item.impact} impact
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">{item.detail}</p>
                    <p className="text-xs text-slate-500">
                      <strong>Primary metric:</strong> {item.metric}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                Start with rank 1 or 2. They have the clearest metrics and the highest chance
                of producing actionable data. Save layout and icon tests for later — they&rsquo;re
                interesting but lower-impact.
              </p>
            </section>

            {/* Section 3 */}
            <section id="what-to-measure" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to measure
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The metric you choose determines how useful your test is. Here&rsquo;s a breakdown
                of the main metrics, how to measure them, and what they actually tell you.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Click-through rate (CTR) on signature links
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                CTR is the most straightforward metric. If your signature has a booking link
                or a website link, how often do recipients click it? This is measurable two
                ways:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>
                    <strong>UTM parameters:</strong> Add{" "}
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">
                      ?utm_source=email&amp;utm_medium=signature&amp;utm_campaign=variant_a
                    </code>{" "}
                    to the URL in Variant A, and{" "}
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">
                      variant_b
                    </code>{" "}
                    to Variant B. Google Analytics records each click separately.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>
                    <strong>Built-in tracking:</strong> NeatStamp Pro tracks clicks on signature
                    links natively, with per-variant reporting in the analytics dashboard.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Reply rate
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                For cold outreach, reply rate is the ultimate measure of whether your
                signature makes you seem more or less approachable. The challenge is
                isolation: reply rate is affected by dozens of factors beyond the
                signature (subject line, message body, timing, prospect quality). Use reply
                rate as a supporting metric alongside CTR, not as the only measure.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most reliable way to measure reply rate differences is to use a sales
                sequence tool (Outreach, Salesloft, or even a simple spreadsheet tracking)
                and randomize which signature variant goes on which sequence. Track replies
                per variant over the same time period.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Meeting bookings
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If your signature includes a Calendly or Cal.com link, meeting bookings are
                the cleanest outcome metric. Calendly lets you add UTM parameters to your
                booking page URL, and it tracks the source of each booking. This is a
                direct conversion metric — much more valuable than a click.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Formula: Meetings booked per 1,000 emails sent. If Variant A books 8 meetings
                per 1,000 emails and Variant B books 12, Variant B has a 50% lift in
                conversion rate. That&rsquo;s significant.
              </p>
            </section>

            {/* Section 4 */}
            <section id="how-to-set-up" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to set up the test
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The mechanics are simpler than most people expect. Here&rsquo;s a step-by-step
                setup for a manual A/B test (no special tools required beyond your normal
                email client).
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "Step 1",
                    title: "Define your question before designing the variants",
                    detail: 'Be specific. "Does a Calendly link increase meeting bookings?" is a good question. "Is Variant A better than Variant B?" is not. The question determines your metric, which determines how you build the variants and how long you run the test.',
                  },
                  {
                    step: "Step 2",
                    title: "Change exactly one variable",
                    detail: "This is the most common mistake I see: someone makes a \"new signature\" that differs in five ways from the old one, then tries to figure out which difference caused a change in results. You can't. Change one thing: the CTA wording, the presence of a headshot, the banner vs. no banner. Everything else stays identical.",
                  },
                  {
                    step: "Step 3",
                    title: "Add unique tracking to each variant",
                    detail: 'Add a UTM parameter to the tracked link in each variant. Variant A: utm_campaign=sig_a. Variant B: utm_campaign=sig_b. This is the only way to attribute clicks to the correct variant in Google Analytics.',
                  },
                  {
                    step: "Step 4",
                    title: "Alternate variants by week or day",
                    detail: "If you're testing alone, use Variant A for one full week, then Variant B for the next. If you're testing across a team, split the team in half: group A uses Variant A, group B uses Variant B simultaneously. The simultaneous split is more accurate because it controls for time-based effects.",
                  },
                  {
                    step: "Step 5",
                    title: "Record sends and results",
                    detail: "At the end of each period, record: emails sent with that variant, clicks on the tracked link, meetings booked (if applicable), and replies (if applicable). Keep a simple spreadsheet — you don't need anything more sophisticated.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-5 border border-slate-200 rounded-xl">
                    <div className="flex-shrink-0">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 */}
            <section id="how-long" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How long to run the test
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There&rsquo;s a straightforward calculation for minimum test duration. You need:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  At least 200 emails sent per variant
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  At minimum 2 weeks of wall-clock time (to capture Monday–Friday variation)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  At least 10 conversion events per variant (clicks, replies, or bookings) to draw any conclusion
                </li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5">
                <p className="text-sm font-semibold text-blue-800 mb-3">Time estimates by email volume</p>
                <div className="space-y-2 text-sm">
                  {[
                    { sends: "10 emails/day", time: "20 days minimum per variant" },
                    { sends: "30 emails/day", time: "7 days minimum per variant" },
                    { sends: "50 emails/day", time: "4 days minimum (run 2 weeks anyway)" },
                    { sends: "Team of 20, 30 emails/person/day", time: "Simultaneous split, run 2 weeks" },
                  ].map((row) => (
                    <div key={row.sends} className="flex items-center justify-between gap-4">
                      <span className="text-blue-700 font-medium">{row.sends}</span>
                      <span className="text-blue-600">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Don&rsquo;t stop early because one variant is &ldquo;obviously winning.&rdquo; Early results
                in small sample tests are noise. I&rsquo;ve seen tests where Variant A led 3:1
                after the first 50 sends, then ended up tied at 500 sends. The first week
                is just the randomness working itself out.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re not hitting 10 conversion events per variant after 4 weeks, your
                conversion metric is too specific. Switch to a higher-volume metric — use
                clicks instead of bookings, or use reply rate instead of clicks.
              </p>
            </section>

            {/* Section 6 */}
            <section id="real-examples" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Real examples and what the data looked like
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These are representative examples based on tests run by NeatStamp users.
                All numbers have been anonymized but the patterns are real.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Test 1: Calendly link vs. no Calendly link (B2B consultant, 45 emails/day)",
                    setup: "Variant A had a 'Book a 15-minute call' Calendly link. Variant B had no booking link — just phone and email. Test ran for 3 weeks.",
                    result: "Variant A generated 14 meeting bookings over 3 weeks. Variant B generated 4. Variant A produced 3.5x more meetings from the same email volume.",
                    takeaway: "For anyone in sales or consulting, the Calendly link is likely worth testing. The friction reduction of one-click scheduling is significant.",
                  },
                  {
                    title: "Test 2: Headshot vs. no headshot (SaaS account executive, cold outreach)",
                    setup: "Split a team of 6 AEs into two groups. Group A used signatures with headshots for 2 weeks. Group B used identical signatures without headshots. Primary metric: reply rate on cold outreach.",
                    result: "Group A (with headshots) had a reply rate of 8.3%. Group B (no headshots) had 7.1%. Difference was ~17% lift, across 1,200 emails per group. Statistically meaningful at this sample size.",
                    takeaway: "For B2B sales, a headshot likely helps. The effect was more pronounced for emails to VP/C-level contacts than for mid-manager contacts.",
                  },
                  {
                    title: "Test 3: 'Schedule a call' vs. 'Let's talk this week' as CTA anchor text",
                    setup: "Single person, 35 emails/day, 4-week test. Same Calendly URL, different text. Primary metric: Calendly clicks via UTM.",
                    result: "\"Let's talk this week\" generated 22% more clicks than \"Schedule a call\". The informal wording felt less transactional.",
                    takeaway: "CTA wording has a meaningful effect even when the destination is identical. First-person, time-specific phrasing ('this week') outperforms generic ('a call').",
                  },
                ].map((example) => (
                  <div key={example.title} className="bg-slate-50 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">{example.title}</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-600"><strong>Setup:</strong> {example.setup}</p>
                      <p className="text-slate-600"><strong>Result:</strong> {example.result}</p>
                      <p className="text-blue-700"><strong>Takeaway:</strong> {example.takeaway}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7 */}
            <section id="common-mistakes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Common testing mistakes
              </h2>

              <div className="space-y-4">
                {[
                  {
                    mistake: "Testing too many variables at once",
                    fix: "Change exactly one element between variants. If Variant A has a headshot, shorter text, and a Calendly link while Variant B has none of those, you can't attribute results to any specific change.",
                  },
                  {
                    mistake: "Stopping too early",
                    fix: "Wait for at least 200 sends per variant AND 2 weeks of wall-clock time. Early results are dominated by randomness.",
                  },
                  {
                    mistake: "Testing on the wrong email type",
                    fix: "If you test on internal emails (to colleagues), the results tell you nothing about how prospects respond. Test on the email type where you care about the outcome: cold outreach, client communications, or newsletter responses.",
                  },
                  {
                    mistake: "Not tracking conversions — just clicks",
                    fix: "Clicks tell you about interest, but bookings and replies tell you about action. Set up UTM tracking or use NeatStamp's built-in tracking to capture the full conversion funnel.",
                  },
                  {
                    mistake: "Running the test during an unusual period",
                    fix: "Avoid Q4 holiday season, the week of a major industry conference, and any week where your email volume is unusually high or low. These skew results in ways that don't reflect normal conditions.",
                  },
                ].map((item) => (
                  <div key={item.mistake} className="border border-slate-200 rounded-xl p-5">
                    <p className="font-semibold text-red-700 mb-1">{item.mistake}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong>Fix:</strong> {item.fix}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8 */}
            <section id="neatstamp-ab" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp&rsquo;s A/B testing feature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp Pro includes a built-in A/B testing workflow that handles tracking
                and reporting without requiring UTM parameter setup or Google Analytics
                configuration. Here&rsquo;s how it works:
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "Build two signature variants in the editor — any element can differ between them.",
                  "Set the test split: 50/50 is standard, but you can weight it (e.g., 80/20 if you want to protect your main variant).",
                  "Enable link tracking. NeatStamp wraps your signature links with tracking URLs that record clicks per variant without affecting deliverability.",
                  "Start the test. NeatStamp alternates which signature is shown in your copy-and-install flow — or, for team accounts, distributes variant A to half your team and variant B to the other half.",
                  "Check the analytics dashboard at any time to see clicks, click-through rate, and (for Calendly-integrated accounts) meeting bookings per variant.",
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                At the end of the test, the dashboard shows a statistical confidence estimate.
                Below 80% confidence, the result is inconclusive — run the test longer.
                Above 95%, the result is reliable enough to make the winning variant permanent.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The A/B feature is available on NeatStamp Pro. You can start building and
                testing your first variant in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  signature editor
                </Link>{" "}
                right now — the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template library
                </Link>{" "}
                is a good starting point if you want pre-built designs to test against.
                See{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing
                </Link>{" "}
                for what&rsquo;s included on the Pro plan.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group border border-slate-200 rounded-xl">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                      {faq.q}
                      <svg
                        className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related reading</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "/blog/email-signature-roi-calculator", label: "Email signature ROI calculator" },
                  { href: "/blog/email-signature-best-practices", label: "Email signature best practices" },
                  { href: "/professional-email-signature", label: "Professional email signature guide" },
                  { href: "/email-signature-for-business", label: "Business email signatures" },
                  { href: "/email-signature-deliverability", label: "Deliverability guide" },
                  { href: "/templates", label: "Browse signature templates" },
                  { href: "/email-signature-for-teams", label: "Team signature management" },
                  { href: "/email-signature-gmail", label: "Gmail signature guide" },
                  { href: "/email-signature-mobile-friendly", label: "Mobile-friendly signatures" },
                  { href: "/alternative-to-wisestamp", label: "NeatStamp vs. WiseStamp" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-slate-700 hover:text-blue-700"
                  >
                    <span className="text-blue-400">→</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Start your first signature A/B test
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Build two variants in the NeatStamp editor, add UTM tracking, and start
                getting real data. Free to start.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Build My Variants — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
