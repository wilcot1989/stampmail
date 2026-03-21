import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Marketing ROI Calculator (2026)",
  description:
    "Calculate the real marketing value of your email signature. At 40 emails/day × 250 days = 10,000 impressions per year per employee. Here's how to turn that into measurable ROI.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-roi-calculator",
  },
};

const faqs = [
  {
    q: "What is the average ROI of email signature marketing?",
    a: "The ROI varies significantly based on how actively you use your signature as a marketing channel. A basic signature with just contact info has near-zero direct ROI — it's a utility. A signature with a promotional banner, a clear CTA, and UTM tracking can generate meaningful returns. Industry benchmarks suggest a well-optimized signature for a 50-person company can generate 5,000–15,000 additional website visits per month from signature link clicks alone.",
  },
  {
    q: "How many impressions does an email signature get per year?",
    a: "The standard calculation: the average professional sends 40 emails per day × 250 working days = 10,000 email sends per year. Not every recipient reads the signature, but assuming 60–70% glance at it, that's 6,000–7,000 impressions per person per year. For a 50-person team, that's 300,000–350,000 annual impressions — comparable to a mid-tier display ad campaign.",
  },
  {
    q: "How do I track email signature click-through rate?",
    a: "Add UTM parameters to links in your signature: utm_source=email, utm_medium=signature, utm_campaign=your-campaign-name. Google Analytics records every click from those links as a separate traffic source. For team-wide tracking, NeatStamp Pro's built-in click tracking shows you aggregate data across all employees without requiring each person to manually set up UTM parameters.",
  },
  {
    q: "Is email signature marketing better than paid advertising for B2B?",
    a: "They're different channels, but email signatures have two advantages over paid advertising for B2B: they reach known contacts who have already agreed to engage with you, and the marginal cost per impression is essentially zero (the cost is the tool, not the media). A CPM of $0 with self-qualified reach is hard to beat. The limitation is you're limited to existing email correspondents — you can't acquire new contacts through signature marketing alone.",
  },
  {
    q: "What's the best call-to-action for email signature marketing ROI?",
    a: "It depends on your goal. For lead generation, a Calendly booking link consistently shows the highest direct conversion rate. For brand awareness, a link to a recent piece of content or case study drives quality traffic. For product-led growth, a link to your product or free trial. The key is to have one primary CTA — too many options reduces clicks on all of them.",
  },
];

export default function EmailSignatureROICalculatorPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Marketing ROI Calculator",
            url: "https://neatstamp.com/blog/email-signature-roi-calculator",
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
            <span className="text-slate-700">Email Signature ROI Calculator</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Marketing
                </span>
                <span className="text-sm text-slate-400">14 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Marketing ROI: The Numbers, the Benchmarks, and How to Calculate Yours
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Your email signature is a marketing channel most companies don&rsquo;t
                intentionally manage. If your team of 20 sends 40 emails per day each, that&rsquo;s
                200,000 brand impressions per year — at zero marginal cost per impression.
                This guide walks through the math, the industry benchmarks for click-through
                rates and conversion, and how to calculate what your signature is actually
                worth to your business.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Published March 2026 &middot; 14 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#the-math", "The impression math — start here"],
                  ["#benchmarks", "Industry benchmarks for CTR and conversion"],
                  ["#calculate-roi", "How to calculate your ROI"],
                  ["#meeting-bookings", "The meeting booking calculation"],
                  ["#banner-value", "Calculating banner click value"],
                  ["#maximize", "Maximizing returns: what actually moves the needle"],
                  ["#tracking", "Setting up tracking to measure it"],
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
            <section id="the-math" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The impression math — start here
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before you can calculate ROI, you need to know your impression volume. Most
                people underestimate how large this number is.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <p className="text-sm font-bold text-blue-800 mb-4 uppercase tracking-wide">
                  The standard calculation
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Average emails sent per employee per day", value: "40" },
                    { label: "Working days per year", value: "× 250" },
                    { label: "Annual email sends per employee", value: "= 10,000" },
                    { label: "Estimated signature view rate (recipients who see it)", value: "× 65%" },
                    { label: "Annual signature impressions per employee", value: "≈ 6,500" },
                  ].map((row, idx) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between gap-4 ${
                        idx === 4 ? "pt-3 border-t border-blue-200 font-bold" : ""
                      }`}
                    >
                      <span className={`text-sm ${idx === 4 ? "text-blue-900" : "text-blue-700"}`}>
                        {row.label}
                      </span>
                      <span className={`text-sm font-mono font-bold ${idx === 4 ? "text-blue-900 text-base" : "text-blue-800"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The 65% view rate is a reasonable estimate. Not every recipient reads all the
                way to the signature — people skim, and in long reply chains the signature
                gets pushed down. But most first-touch emails and direct replies are read
                in full, and the signature is typically visible without scrolling in most
                email clients.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Scale by team size</h3>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Team size</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Annual sends</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Annual impressions</th>
                      <th className="py-3 px-4 text-left font-semibold text-slate-700">Equivalent CPM at $2 CPM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { size: "1 person", sends: "10,000", impressions: "6,500", equiv: "$13 value" },
                      { size: "10 employees", sends: "100,000", impressions: "65,000", equiv: "$130 value" },
                      { size: "25 employees", sends: "250,000", impressions: "162,500", equiv: "$325 value" },
                      { size: "50 employees", sends: "500,000", impressions: "325,000", equiv: "$650 value" },
                      { size: "100 employees", sends: "1,000,000", impressions: "650,000", equiv: "$1,300 value" },
                      { size: "200 employees", sends: "2,000,000", impressions: "1,300,000", equiv: "$2,600 value" },
                    ].map((row) => (
                      <tr key={row.size}>
                        <td className="py-3 px-4 font-medium text-slate-800">{row.size}</td>
                        <td className="py-3 px-4 text-slate-600">{row.sends}</td>
                        <td className="py-3 px-4 text-slate-600">{row.impressions}</td>
                        <td className="py-3 px-4 text-green-700 font-medium">{row.equiv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                Note on the CPM comparison: comparing email signature impressions to display
                advertising at $2 CPM actually understates the value. Your email signature
                is seen by people who are already engaging with you — recipients of your
                emails are a self-selected audience with demonstrated interest. That&rsquo;s
                much higher quality than the average display ad impression, which might be
                to a completely unrelated person on a random website.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For context on why this matters for your business email strategy, the{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature guide
                </Link>{" "}
                covers the broader case for treating your signature as an active marketing asset.
              </p>
            </section>

            {/* Section 2 */}
            <section id="benchmarks" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Industry benchmarks for CTR and conversion
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Raw impressions are interesting, but what you really care about is
                what recipients do. Here are the benchmarks I use, based on aggregated
                data from email signature analytics platforms and our own user data.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Click-through rate on signature links
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  { type: "Website homepage link", ctr: "0.5–1.2%", note: "Passive browsing intent — low CTR is normal" },
                  { type: "Booking link (Calendly/Cal.com)", ctr: "1.5–3.5%", note: "High intent, especially in sales contexts" },
                  { type: "Promotional banner link", ctr: "0.8–2.0%", note: "Depends heavily on offer relevance" },
                  { type: "Recent blog post or case study", ctr: "1.0–2.5%", note: "Content links often outperform homepage" },
                  { type: "LinkedIn profile", ctr: "0.3–0.8%", note: "Lower CTR but high value connections" },
                ].map((row) => (
                  <div key={row.type} className="flex items-start justify-between gap-4 p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{row.type}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{row.note}</p>
                    </div>
                    <span className="flex-shrink-0 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {row.ctr}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                These numbers might seem low, but apply them to your annual impression volume
                and they become significant. A 1.5% CTR on a booking link, across 10,000
                annual email sends, means 150 people per year visited your booking page from
                your signature alone.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Conversion rates from signature traffic
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                People who click through a signature are self-selected — they were already
                in an email conversation with you. Their conversion rates on whatever they
                land on tend to be meaningfully higher than general web traffic.
              </p>

              <div className="bg-slate-50 rounded-xl p-5 mb-4 space-y-3">
                {[
                  { action: "Booking page visit → meeting booked", rate: "25–40%", note: "High because they initiated the click" },
                  { action: "Website visit → contact form submission", rate: "3–8%", note: "2–3x typical web average" },
                  { action: "Case study view → sales inquiry", rate: "5–12%", note: "Intent-rich visitors" },
                  { action: "LinkedIn click → connection request", rate: "15–25%", note: "Strong warm audience" },
                ].map((row) => (
                  <div key={row.action} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-700">{row.action}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{row.note}</p>
                    </div>
                    <span className="flex-shrink-0 text-sm font-semibold text-green-700">
                      {row.rate}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section id="calculate-roi" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to calculate your ROI
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are two ways to approach ROI calculation: the impression value method
                (comparing your signature impressions to the equivalent cost in paid media)
                and the direct conversion method (calculating revenue attributable to
                signature-driven actions). The second is more rigorous if you have tracking
                in place.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Method 1: Impression value (quick estimate)
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
{`// Your inputs
employees = 50
emails_per_day = 40
working_days = 250
view_rate = 0.65
comparable_cpm = 5.00  // LinkedIn CPM for B2B is ~$5

// Calculation
annual_sends = employees × emails_per_day × working_days
// = 50 × 40 × 250 = 500,000

annual_impressions = annual_sends × view_rate
// = 500,000 × 0.65 = 325,000

impression_value = (annual_impressions / 1000) × comparable_cpm
// = (325,000 / 1000) × $5 = $1,625 per year`}
                </pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                At LinkedIn&rsquo;s B2B CPM of ~$5, your 50-person team&rsquo;s signatures generate the
                equivalent of $1,625/year in brand impressions. For a NeatStamp Teams
                subscription at $99/month ($1,188/year), the impression value alone more
                than pays for the tool — before counting a single click or booking.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Method 2: Direct conversion value (if you have tracking)
              </h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
{`// Your inputs
annual_emails_sent = 500,000          // 50 employees × 40/day × 250 days
booking_link_ctr = 0.02               // 2% click-through on booking link
booking_page_conversion = 0.30        // 30% of visitors book
meetings_booked_per_year = annual_emails_sent × booking_link_ctr × booking_page_conversion
// = 500,000 × 0.02 × 0.30 = 3,000 meetings

// Convert meetings to pipeline
close_rate = 0.15                     // 15% of meetings become customers
avg_deal_value = 3000                 // $3,000 average deal
customers_from_signatures = 3000 × 0.15 = 450
revenue_from_signatures = 450 × $3,000 = $1,350,000`}
                </pre>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Now, that $1.35M revenue figure isn&rsquo;t pure attribution — those 3,000
                meetings would have been booked via other channels too if the signature
                link didn&rsquo;t exist. The realistic question is: what percentage of those
                bookings were influenced by the ease of the signature link vs. what would
                have happened anyway via cold outreach follow-up?
              </p>
              <p className="text-slate-600 leading-relaxed">
                A conservative assumption is 10–20% incremental lift from the signature
                link vs. no link. At 20% incremental: 600 additional meetings, 90 additional
                customers, $270,000 additional revenue. That&rsquo;s a realistic, defensible
                ROI estimate for a sales-focused B2B company. And it&rsquo;s generated by one
                change — adding a booking link to the signature.
              </p>
            </section>

            {/* Section 4 */}
            <section id="meeting-bookings" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The meeting booking calculation in detail
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Meeting bookings via a Calendly link in the signature is the highest-return
                single action you can take for B2B sales teams. Here&rsquo;s how to build a
                realistic model for your company.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The four-step model
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1. Email sends per year per rep",
                    formula: "40 emails/day × 250 days = 10,000 sends/year",
                    input: "Adjust your actual send volume",
                  },
                  {
                    step: "2. Signature CTR on booking link",
                    formula: "Benchmark: 1.5–2.5% for a well-placed CTA",
                    input: "Start with 2% as your baseline estimate",
                  },
                  {
                    step: "3. Booking page conversion rate",
                    formula: "Benchmark: 25–35% of visitors book",
                    input: "Calendly shows this in your analytics",
                  },
                  {
                    step: "4. Meetings to revenue",
                    formula: "Meeting close rate × average deal value",
                    input: "Use your actual sales data",
                  },
                ].map((item) => (
                  <div key={item.step} className="p-4 border border-slate-200 rounded-xl">
                    <p className="font-semibold text-slate-900 mb-1">{item.step}</p>
                    <p className="text-sm text-blue-700 font-mono mb-1">{item.formula}</p>
                    <p className="text-xs text-slate-500">{item.input}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-green-800 mb-3">Example calculation for one sales rep</p>
                <div className="space-y-1 text-sm text-green-700 font-mono">
                  <p>10,000 sends/year</p>
                  <p>× 2.0% booking link CTR = 200 booking page visits</p>
                  <p>× 30% booking rate = 60 meetings from signature</p>
                  <p>× 20% close rate = 12 customers</p>
                  <p>× $5,000 ACV = $60,000 influenced revenue</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                For a team of 10 reps, that scales to $600,000 in influenced revenue. Even
                if you attribute only 20% incremental lift to the signature (vs. bookings
                that would have happened anyway), that&rsquo;s $120,000 in incremental revenue
                from one line in a signature. For a team using a{" "}
                <Link href="/professional-email-signature" className="text-blue-600 hover:underline">
                  professional email signature
                </Link>{" "}
                with an optimized CTA, the math is compelling.
              </p>
            </section>

            {/* Section 5 */}
            <section id="banner-value" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Calculating banner click value
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                A promotional banner in your signature is one of the most underused B2B
                marketing tactics. If you&rsquo;re running a webinar, a product launch, a case
                study release, or a limited-time offer, a banner in every employee&rsquo;s
                signature is free reach to an already-engaged audience.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The banner value model
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  { label: "Team of 20 employees", calc: "20 × 40 emails/day = 800 emails/day with banner" },
                  { label: "Campaign duration", calc: "4-week campaign = 20 working days" },
                  { label: "Total emails during campaign", calc: "800 × 20 = 16,000 emails" },
                  { label: "Estimated banner views (65% rate)", calc: "16,000 × 0.65 = 10,400 banner impressions" },
                  { label: "CTR on campaign banner (1.2%)", calc: "10,400 × 0.012 = 125 campaign page visits" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-3 text-sm">
                    <span className="flex-shrink-0 text-slate-400 w-2 mt-1.5">→</span>
                    <div>
                      <span className="font-medium text-slate-800">{row.label}: </span>
                      <span className="text-slate-600 font-mono">{row.calc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                125 warm, permission-based clicks on your campaign landing page, with
                zero extra ad spend. If your webinar page converts at 25%, that&rsquo;s 31
                webinar registrations from signature banners alone. For comparison, a
                LinkedIn campaign targeting the same audience would cost $600–$1,500
                to generate the same 125 clicks at LinkedIn&rsquo;s typical B2B CPC of $5–$12.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Banners are available on NeatStamp Pro and Teams plans. The{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing page
                </Link>{" "}
                has the full feature breakdown. For banner design guidelines and dimensions,
                the{" "}
                <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
                  signature size guide
                </Link>{" "}
                covers the technical specs.
              </p>
            </section>

            {/* Section 6 */}
            <section id="maximize" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Maximizing returns: what actually moves the needle
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Based on the math, here are the highest-leverage actions ranked by expected
                ROI impact. Do these in order.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    rank: "1",
                    action: "Add a booking link if you're in any sales or consulting role",
                    expected: "20–50% increase in meeting bookings from email",
                    effort: "5 minutes to add Calendly URL",
                  },
                  {
                    rank: "2",
                    action: "Ensure every employee has a consistent, professional signature",
                    expected: "Trust and brand impression value — harder to quantify but foundational",
                    effort: "1–4 hours with NeatStamp Teams setup",
                  },
                  {
                    rank: "3",
                    action: "Add UTM tracking to all signature links",
                    expected: "No direct revenue lift, but enables measurement of all other actions",
                    effort: "30 minutes",
                  },
                  {
                    rank: "4",
                    action: "Run a promotional banner during your next campaign",
                    expected: "125–500 additional campaign page visits per campaign (20-person team)",
                    effort: "Design banner (2–3 hours), deploy to team (30 min)",
                  },
                  {
                    rank: "5",
                    action: "A/B test your CTA wording",
                    expected: "10–30% CTR improvement on the winning variant",
                    effort: "30 minutes to set up, 4 weeks to run",
                  },
                ].map((item) => (
                  <div key={item.rank} className="flex gap-4 p-5 border border-slate-200 rounded-xl">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.rank}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">{item.action}</p>
                      <p className="text-sm text-green-700 mb-1">{item.expected}</p>
                      <p className="text-xs text-slate-500">Effort: {item.effort}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                For a deeper look at the A/B testing approach, the{" "}
                <Link href="/blog/email-signature-ab-testing-guide" className="text-blue-600 hover:underline">
                  email signature A/B testing guide
                </Link>{" "}
                walks through exactly how to run tests and what results look like. For the
                professional design side, the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  best practices guide
                </Link>{" "}
                ensures your signature is optimized before you start measuring.
              </p>
            </section>

            {/* Section 7 */}
            <section id="tracking" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Setting up tracking to measure it
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You can&rsquo;t improve what you don&rsquo;t measure. Here&rsquo;s a minimal tracking setup
                that takes under an hour to implement.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                UTM parameter setup
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                For each link in your signature, add UTM parameters:
              </p>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
{`// Website link
https://yourcompany.com?utm_source=email&utm_medium=signature&utm_campaign=sig_default

// Booking link
https://calendly.com/you/15min?utm_source=email&utm_medium=signature&utm_campaign=sig_booking

// Case study link
https://yourcompany.com/case-study?utm_source=email&utm_medium=signature&utm_campaign=sig_case_study_q1_2026`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to check in Google Analytics
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                In GA4: Reports → Acquisition → Traffic acquisition. Filter by Source/Medium =
                email/signature. You&rsquo;ll see:
              </p>
              <ul className="space-y-2 mb-5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Sessions from each signature campaign tag
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Pages per session and time on site (these are high for signature traffic)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  Conversions (contact form fills, free trial signups, etc.) if you have goals set up
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                NeatStamp Pro built-in tracking
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If managing UTM parameters across a team is impractical (people will forget
                to add them, use different naming conventions, etc.), NeatStamp Pro tracks
                clicks centrally without requiring per-person UTM setup. Every click on any
                link in any team member&rsquo;s signature is recorded in the analytics dashboard
                with the variant, timestamp, and link type.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For building signatures with tracking already configured, use the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                — the Pro plan enables tracking on every link automatically. The{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  Teams plan
                </Link>{" "}
                consolidates tracking across all employees into a single dashboard.
              </p>
            </section>

            {/* ROI Summary Box */}
            <section className="mb-12">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-7 text-white">
                <h2 className="text-lg font-bold mb-5">Quick ROI reference</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Annual impressions (50-person team)", value: "325,000+" },
                    { label: "Meetings from booking link (10 reps)", value: "600/year" },
                    { label: "Banner campaign clicks (20 employees)", value: "125+ per campaign" },
                    { label: "Incremental revenue per 10 reps (est.)", value: "$120,000+" },
                    { label: "Cost of NeatStamp Teams", value: "$99–$299/month" },
                    { label: "Payback period", value: "Days, not months" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 rounded-xl p-4">
                      <p className="text-xs text-slate-300 mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
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
                  { href: "/blog/email-signature-ab-testing-guide", label: "A/B testing your signature" },
                  { href: "/email-signature-for-business", label: "Business email signature guide" },
                  { href: "/professional-email-signature", label: "Professional signature guide" },
                  { href: "/email-signature-for-teams", label: "NeatStamp Teams overview" },
                  { href: "/blog/email-signature-best-practices", label: "Email signature best practices" },
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
                Start generating measurable ROI from your signature
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                Build a signature with a booking link, UTM tracking, and a promotional banner
                in under 5 minutes. Free to start.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
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
