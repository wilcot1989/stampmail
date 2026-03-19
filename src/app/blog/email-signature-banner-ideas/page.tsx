import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Banner Ideas — 20+ Examples That Convert | NeatStamp",
  description:
    "20+ email signature banner ideas organized by type: product launches, events, hiring, social proof, seasonal campaigns. Sizing guide, design tips, and how to track clicks.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-banner-ideas",
  },
};

const faqs = [
  {
    q: "What is an email signature banner?",
    a: "An email signature banner is a promotional image placed below your standard contact information in your email signature. It links to a landing page and is used to promote something — a product launch, event, blog post, job opening, or anything else you want to draw attention to. Think of it as a small billboard that appears at the bottom of every email you send.",
  },
  {
    q: "What size should an email signature banner be?",
    a: "The standard recommendation is 600px wide and 100–150px tall. This fits within the standard email reading pane width without requiring horizontal scrolling, and the height is enough to be readable without dominating the email. Keep the file size under 40KB.",
  },
  {
    q: "Do email signature banners increase click-through rates?",
    a: "When used with relevant, timely messaging and a clear call to action, yes. Some companies report click-through rates of 1–3% on signature banners across high-volume email senders. The advantage is that every email becomes a touchpoint — you're reaching people you're already in conversation with, who already trust you.",
  },
  {
    q: "How often should I change my email signature banner?",
    a: "At minimum, when the promotion or event it's pointing to has ended. More actively, you might rotate banners every 2–4 weeks if you have a content calendar or regular launches. Old banners pointing to expired promotions or past events undermine credibility.",
  },
  {
    q: "Can I track clicks on my email signature banner?",
    a: "Yes, by using UTM parameters on the link behind the banner. Adding ?utm_source=email_signature&utm_medium=email&utm_campaign=banner_q1 to your URL lets Google Analytics (or any analytics platform) track traffic that comes from your signature banner clicks.",
  },
  {
    q: "Is an email signature banner a Pro feature in NeatStamp?",
    a: "Yes, signature banners with rotation and click tracking are available in NeatStamp Pro. The free plan supports static banners using an externally hosted image URL.",
  },
];

export default function EmailSignatureBannerIdeasPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Banner Ideas",
            url: "https://neatstamp.com/blog/email-signature-banner-ideas",
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
            <span className="text-slate-700">Email Signature Banner Ideas</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  Marketing
                </span>
                <span className="text-sm text-slate-400">14 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Banner Ideas — 20+ Examples That Convert
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Your email signature is one of the most underused marketing channels in most
                businesses. Every email you send already has your contact information at the
                bottom — adding a well-designed banner below it costs nothing in extra send time
                and puts a promotional message in front of people who are already reading your emails.
                Here are 20+ ideas for what to put there, organized by what you&rsquo;re trying to accomplish.
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
                  ["#what-is-a-banner", "What is an email signature banner?"],
                  ["#product-launches", "Product launch and feature announcement banners"],
                  ["#events", "Event and webinar banners"],
                  ["#content", "Content promotion banners"],
                  ["#hiring", "Hiring and recruiting banners"],
                  ["#social-proof", "Social proof banners (awards, press, testimonials)"],
                  ["#seasonal", "Seasonal and campaign banners"],
                  ["#social-media", "Social media and app banners"],
                  ["#sizing-guide", "Sizing guide"],
                  ["#design-tips", "Design tips"],
                  ["#tracking-clicks", "How to track clicks"],
                  ["#rotating-banners", "How to rotate banners"],
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
            <section id="what-is-a-banner" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What is an email signature banner?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                An email signature banner is a promotional image that sits below your standard
                contact information — name, title, phone, email — in your email footer. It links
                to a landing page when clicked and is used to promote something you want your
                email recipients to notice.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The key difference between a signature banner and a marketing email: the banner
                reaches people you&rsquo;re already in an active conversation with. These are warm
                contacts — clients, prospects, colleagues, partners. They&rsquo;re reading your email
                for another reason and seeing your banner as a secondary touchpoint, which is
                why the conversion rates, while modest, tend to be higher than cold outreach.
              </p>

              <div className="bg-slate-900 rounded-xl p-5 mb-6">
                <p className="text-slate-400 text-xs font-mono mb-3">Email signature structure</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-slate-800 rounded p-3">
                    <p className="text-white font-semibold">Alex Rivera</p>
                    <p className="text-slate-400 text-xs">Head of Marketing &middot; Acme Corp</p>
                    <p className="text-slate-400 text-xs">+1 (415) 555-0190 &middot; alex@acmecorp.com</p>
                  </div>
                  <div className="border-2 border-dashed border-emerald-500 rounded p-3 text-center">
                    <p className="text-emerald-400 text-xs font-semibold">BANNER GOES HERE</p>
                    <p className="text-slate-500 text-xs">600 × 120px &middot; links to landing page</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                For the full context of how a banner fits into a complete signature, see the{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  email signature best practices guide
                </Link>
                . For sizing specifics across all signature image types, the{" "}
                <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
                  email signature size guide
                </Link>{" "}
                has the technical details.
              </p>
            </section>

            {/* Section 2 */}
            <section id="product-launches" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Product launch and feature announcement banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                This is where signature banners earn their keep most clearly. Every email your
                team sends during a launch period becomes a distribution channel.
              </p>

              <div className="space-y-4">
                {[
                  {
                    idea: "New product launch",
                    copy: "\"[Product Name] is here — see what's new\"",
                    cta: "Link to product page or launch landing page",
                    tip: "Include a product image if the visual communicates value immediately.",
                  },
                  {
                    idea: "New feature announcement",
                    copy: "\"New in [Product]: [Feature Name] — now available\"",
                    cta: "Link to feature announcement blog post or changelog",
                    tip: "Works especially well for SaaS companies with existing customers in email threads.",
                  },
                  {
                    idea: "Beta or early access",
                    copy: "\"Join the [Product] beta — limited spots\"",
                    cta: "Link to waitlist or signup page",
                    tip: "The scarcity framing ('limited spots') increases click intent.",
                  },
                  {
                    idea: "App store launch",
                    copy: "\"[App Name] is now on iOS and Android\"",
                    cta: "App Store and Google Play links (or a landing page with both)",
                    tip: "Use the official App Store / Google Play badge graphics for instant recognition.",
                  },
                ].map((banner) => (
                  <div key={banner.idea} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        IDEA
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm">{banner.idea}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>Copy idea:</strong> {banner.copy}
                    </p>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>CTA:</strong> {banner.cta}
                    </p>
                    <p className="text-slate-500 text-xs italic">{banner.tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section id="events" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Event and webinar banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Events live and die by registration numbers. A signature banner promoting an
                upcoming event is a warm channel — everyone who gets an email from you is
                a potential registrant.
              </p>

              <div className="space-y-4">
                {[
                  {
                    idea: "Webinar registration",
                    copy: "\"Join us live: [Topic] — [Date] at [Time]\"",
                    cta: "Registration page",
                    tip: "Include the date prominently. Urgency drives registrations.",
                  },
                  {
                    idea: "Conference appearance",
                    copy: "\"Catch [Name] speaking at [Conference] — [Date]\"",
                    cta: "Conference schedule or your speaking session page",
                    tip: "Good for founders, executives, and thought leaders. Reinforces credibility.",
                  },
                  {
                    idea: "Virtual event",
                    copy: "\"[Company] Summit 2026 — register free\"",
                    cta: "Event registration page",
                    tip: "Works across all team members' signatures to maximize reach.",
                  },
                  {
                    idea: "In-person event or trade show",
                    copy: "\"We'll be at [Event Name] — book a meeting\"",
                    cta: "Calendly or meeting booking link",
                    tip: "For sales teams attending trade shows, a booking link in the banner drives more pre-scheduled meetings.",
                  },
                  {
                    idea: "Recorded webinar / on-demand content",
                    copy: "\"Missed our [Topic] webinar? Watch the recording.\"",
                    cta: "Watch page or gated download",
                    tip: "Don't let good event content die after the live date. A banner extending its life is low effort.",
                  },
                ].map((banner) => (
                  <div key={banner.idea} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        IDEA
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm">{banner.idea}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>Copy:</strong> {banner.copy}
                    </p>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>CTA:</strong> {banner.cta}
                    </p>
                    <p className="text-slate-500 text-xs italic">{banner.tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 */}
            <section id="content" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Content promotion banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you publish content — blog posts, reports, podcasts, videos — your signature
                is an underused distribution channel. The people you email are already interested
                in what you do; a banner pointing to a relevant piece of content can drive
                meaningful traffic.
              </p>

              <div className="space-y-4 mb-4">
                {[
                  {
                    idea: "Recent blog post or guide",
                    copy: "\"New on the blog: [Post Title]\"",
                    tip: "Rotate this as you publish new content. A banner pointing to a 6-month-old post looks stale.",
                  },
                  {
                    idea: "Annual report or industry research",
                    copy: "\"[Year] [Industry] Report — download free\"",
                    tip: "High-value content performs well here. Gated downloads get more clicks when the perceived value is clear.",
                  },
                  {
                    idea: "Podcast episode",
                    copy: "\"New episode: [Guest Name] on [Topic]\"",
                    tip: "Works especially well when the guest is recognizable to your email contacts.",
                  },
                  {
                    idea: "Video or YouTube content",
                    copy: "\"Watch: [Video Title] — [X] minutes\"",
                    tip: "Including the runtime sets expectations and reduces hesitation.",
                  },
                ].map((banner) => (
                  <div key={banner.idea} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded">
                        IDEA
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm">{banner.idea}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>Copy:</strong> {banner.copy}
                    </p>
                    <p className="text-slate-500 text-xs italic">{banner.tip}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                For broader email signature marketing strategy, the{" "}
                <Link href="/email-signature-marketing" className="text-blue-600 hover:underline">
                  email signature marketing guide
                </Link>{" "}
                covers how to build banners into your content calendar.
              </p>
            </section>

            {/* Section 5 */}
            <section id="hiring" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Hiring and recruiting banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every employee is a potential recruiter, and every email they send reaches people
                in their network. A hiring banner is one of the most cost-effective recruiting
                signals you can add.
              </p>

              <div className="space-y-4">
                {[
                  {
                    idea: "General hiring banner",
                    copy: "\"We're hiring — see open roles at [Company]\"",
                    cta: "Careers page",
                    tip: "Use across all employees during active hiring phases. Even casual contacts may know someone.",
                  },
                  {
                    idea: "Specific role hiring",
                    copy: "\"Hiring: Senior [Role] — apply by [Date]\"",
                    cta: "Direct link to the job listing",
                    tip: "More specific than a generic careers link. Useful when you have a hard-to-fill role.",
                  },
                  {
                    idea: "Internship recruitment",
                    copy: "\"Summer 2026 internships now open — apply now\"",
                    cta: "Internship application page",
                    tip: "Particularly effective from founders and department heads whose networks include university contacts.",
                  },
                ].map((banner) => (
                  <div key={banner.idea} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        IDEA
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm">{banner.idea}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>Copy:</strong> {banner.copy}
                    </p>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>CTA:</strong> {banner.cta}
                    </p>
                    <p className="text-slate-500 text-xs italic">{banner.tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 */}
            <section id="social-proof" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Social proof banners (awards, press, testimonials)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Social proof is particularly powerful in a signature because it appears in context
                — the recipient is already in a conversation with you and the proof point reinforces
                your credibility at a natural moment.
              </p>

              <div className="space-y-4">
                {[
                  {
                    idea: "Award or recognition",
                    copy: "\"[Company] named [Award] by [Publication] 2026\"",
                    tip: "Use the award logo or publication logo if you have permission. Visual credibility marks work better than text alone.",
                  },
                  {
                    idea: "Press mention or feature",
                    copy: "\"As featured in [Publication]: [Headline]\"",
                    tip: "Works best when the publication is recognizable to your audience. A Forbes mention carries more weight in B2B than a niche trade publication would, and vice versa.",
                  },
                  {
                    idea: "Customer testimonial",
                    copy: "\"'[Short quote]' — [Customer Name], [Title]\"",
                    tip: "Keep the quote to one sentence. Link to a case study or reviews page. Specific, named testimonials perform better than generic praise.",
                  },
                  {
                    idea: "Case study",
                    copy: "\"How [Customer] achieved [Result] with [Product]\"",
                    tip: "The most effective social proof format for B2B. The result-focused headline tells the story immediately.",
                  },
                  {
                    idea: "Review platform rating",
                    copy: "\"Rated 4.9/5 on G2 — read reviews\"",
                    tip: "Works if your rating is genuinely strong. A 3.8/5 banner is not a good idea.",
                  },
                ].map((banner) => (
                  <div key={banner.idea} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                        IDEA
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm">{banner.idea}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>Copy:</strong> {banner.copy}
                    </p>
                    <p className="text-slate-500 text-xs italic">{banner.tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7 */}
            <section id="seasonal" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Seasonal and campaign banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Seasonal banners are time-sensitive by definition — their relevance expires.
                Set a calendar reminder to remove or update them on a specific date.
              </p>

              <div className="space-y-4">
                {[
                  {
                    idea: "Holiday greeting (Christmas, Hanukkah, New Year)",
                    copy: "\"Wishing you a wonderful [holiday] from the [Company] team\"",
                    tip: "Keep it warm and non-pushy. Seasonal banners are better as genuine goodwill than as promotional vehicles. No CTA needed.",
                  },
                  {
                    idea: "Black Friday or Cyber Monday promotion",
                    copy: "\"[X]% off [Product] — this week only\"",
                    cta: "Discount landing page",
                    tip: "Include the offer and the deadline. Specific percentages convert better than vague 'big savings' language.",
                  },
                  {
                    idea: "End-of-quarter or end-of-year deal",
                    copy: "\"Close before [Date] and save [X]%\"",
                    tip: "Particularly relevant for B2B sales teams. The fiscal urgency is real for many buyers.",
                  },
                  {
                    idea: "Annual recap",
                    copy: "\"[Company] in 2025 — our year in numbers\"",
                    cta: "Year in review blog post or report",
                    tip: "End of year banners pointing to a retrospective build trust and give readers a reason to click.",
                  },
                ].map((banner) => (
                  <div key={banner.idea} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                        IDEA
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm">{banner.idea}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>Copy:</strong> {banner.copy}
                    </p>
                    {"cta" in banner && (
                      <p className="text-slate-600 text-sm mb-1">
                        <strong>CTA:</strong> {banner.cta}
                      </p>
                    )}
                    <p className="text-slate-500 text-xs italic">{banner.tip}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-4">
                For holiday-specific signature design ideas, the{" "}
                <Link href="/christmas-email-signature" className="text-blue-600 hover:underline">
                  Christmas email signature guide
                </Link>{" "}
                has examples.
              </p>
            </section>

            {/* Section 8 */}
            <section id="social-media" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Social media and app banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These banners grow your channels rather than driving direct conversions.
                Useful if building an audience is a priority.
              </p>

              <div className="space-y-4">
                {[
                  {
                    idea: "LinkedIn follow or newsletter subscribe",
                    copy: "\"Follow [Name] on LinkedIn for weekly [Topic] insights\"",
                    tip: "More specific than a generic 'follow us' — give them a reason.",
                  },
                  {
                    idea: "YouTube channel subscribe",
                    copy: "\"[X] videos on [Topic] — subscribe on YouTube\"",
                    tip: "The content count gives social proof. Works if you have an established library.",
                  },
                  {
                    idea: "Podcast subscribe",
                    copy: "\"New episodes every [day] — listen on Spotify & Apple\"",
                    tip: "Include both major platforms. Linking to both (or to a landing page that links both) removes friction.",
                  },
                  {
                    idea: "App download",
                    copy: "\"Download [App Name] — free on iOS and Android\"",
                    tip: "Use official app store badges. They're recognizable and increase click confidence.",
                  },
                  {
                    idea: "Newsletter subscription",
                    copy: "\"[Newsletter Name]: [frequency] emails on [Topic] — subscribe free\"",
                    tip: "Works well for founders and professionals with personal newsletters. The offer should be clear.",
                  },
                ].map((banner) => (
                  <div key={banner.idea} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        IDEA
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm">{banner.idea}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-1">
                      <strong>Copy:</strong> {banner.copy}
                    </p>
                    <p className="text-slate-500 text-xs italic">{banner.tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9 */}
            <section id="sizing-guide" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Sizing guide
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Getting the dimensions wrong is the most common execution mistake with signature
                banners. Here are the numbers.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-4">Recommended dimensions</p>
                <div className="space-y-3">
                  {[
                    { label: "Width", value: "600px", note: "Matches the standard email reading pane. Wider than 600px causes horizontal scrolling on desktop." },
                    { label: "Height", value: "100–150px", note: "Enough to be readable. Taller than 150px and the banner starts to dominate the email footer." },
                    { label: "File size", value: "Under 40KB", note: "For static images. For animated GIFs (not recommended — see GIF guide), under 200KB." },
                    { label: "Actual file resolution", value: "1200 × 200–300px", note: "2x resolution for retina displays. Set the HTML width attribute to 600px, height proportionally." },
                    { label: "Format", value: "JPEG or PNG", note: "JPEG for photographic banners (smaller file). PNG for text-heavy or graphical banners (crisper text)." },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-28">
                        <p className="text-xs font-semibold text-blue-700">{row.label}</p>
                        <code className="text-xs bg-white border border-blue-200 px-1.5 py-0.5 rounded font-mono text-blue-800">
                          {row.value}
                        </code>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{row.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                For the full image sizing guide covering logos, headshots, and banners together,
                see the{" "}
                <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
                  email signature size guide
                </Link>
                .
              </p>
            </section>

            {/* Section 10 */}
            <section id="design-tips" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Design tips
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                A signature banner has a small canvas and a secondary position — the recipient is
                reading your email first and noticing the banner after. Design for that context.
              </p>

              <div className="space-y-5">
                {[
                  {
                    tip: "Keep it to one message",
                    detail: "One value proposition, one CTA. A banner trying to promote three things at once promotes none of them clearly. Pick the most important message and make it unmissable.",
                  },
                  {
                    tip: "Use a contrasting CTA button",
                    detail: "A button-style CTA ('Register Now', 'Download Free', 'Read More') consistently outperforms a hyperlinked text CTA. Use a color that contrasts with your banner background so it reads immediately.",
                  },
                  {
                    tip: "Left-align the key information",
                    detail: "Reading patterns start at the left. Your headline and CTA should be on the left side of the banner. If you use a visual (product screenshot, illustration), put it on the right.",
                  },
                  {
                    tip: "Match your brand but not your email",
                    detail: "Your banner should clearly come from your company (colors, logo, typography) but shouldn't try to match the content of the email it appears in. It's a consistent brand touchpoint, not a contextual adaptation.",
                  },
                  {
                    tip: "Use alt text with the key message",
                    detail: "Many corporate email clients block images by default. If your banner image is blocked, the alt text is what the recipient sees. Write alt text that includes the key message: 'Register for our April 15 webinar on B2B pricing strategy' is better than 'Webinar banner'.",
                  },
                  {
                    tip: "Design for the first frame of any animation",
                    detail: "If you're using any animation (unlikely if you've read the GIF guide, but possible), make sure the first frame works perfectly as a static image for Outlook users.",
                  },
                ].map((item) => (
                  <div key={item.tip} className="flex gap-4">
                    <span className="mt-1 h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{item.tip}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 11 */}
            <section id="tracking-clicks" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to track clicks
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Without tracking, you have no idea whether your signature banner is driving
                traffic or being completely ignored. The good news is that adding tracking is
                straightforward if you use UTM parameters.
              </p>

              <div className="bg-slate-50 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">UTM parameter structure for signature banners</p>
                <code className="text-xs bg-white border border-slate-200 px-3 py-2 rounded font-mono text-slate-700 block leading-relaxed break-all">
                  https://yoursite.com/landing-page?utm_source=email_signature&amp;utm_medium=email&amp;utm_campaign=q2_webinar&amp;utm_content=banner
                </code>
                <div className="mt-3 space-y-1">
                  {[
                    { param: "utm_source", value: "email_signature", note: "Identifies the source" },
                    { param: "utm_medium", value: "email", note: "The channel type" },
                    { param: "utm_campaign", value: "q2_webinar", note: "The specific campaign — change this per banner" },
                    { param: "utm_content", value: "banner", note: "Distinguishes this click from other email links" },
                  ].map((row) => (
                    <div key={row.param} className="flex gap-3 text-xs">
                      <code className="text-blue-700 flex-shrink-0">{row.param}={row.value}</code>
                      <span className="text-slate-500">{row.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                In Google Analytics 4, you can then see exactly how many sessions came from
                email signature banner clicks, what pages they visited, and whether they converted.
                This is how you compare the performance of different banner messages over time.
              </p>
              <p className="text-slate-600 leading-relaxed">
                NeatStamp Pro includes built-in click tracking for signature banners — no UTM
                parameters needed on your end. The analytics dashboard shows clicks per banner
                across your team. See the{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  NeatStamp pricing page
                </Link>{" "}
                for what&rsquo;s included.
              </p>
            </section>

            {/* Section 12 */}
            <section id="rotating-banners" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to rotate banners
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Rotating banners — showing different banner content to different recipients or
                at different times — is a more advanced use of signature marketing. Here&rsquo;s how
                to do it at different levels of sophistication.
              </p>

              <div className="space-y-5">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Manual rotation (free)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Update the banner URL in your signature when you change campaigns. This works
                    but requires remembering to do it and doesn&rsquo;t let you test multiple banners
                    simultaneously. Set a recurring calendar reminder to review your banner weekly
                    or biweekly.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Dynamic image URL rotation</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    If you host your own banner image on a server, you can update the image file
                    at the same URL — everyone whose signature points to that URL will automatically
                    see the new banner the next time someone opens an email with their signature.
                    This is a zero-cost workaround that many teams use.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">NeatStamp Pro banner management</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    NeatStamp Pro allows you to set a banner in one place and push it to all team
                    members&rsquo; signatures simultaneously. When you update the banner in the admin
                    dashboard, it updates for everyone. You can also schedule banner rotations in
                    advance — set a webinar banner to go live on a specific date and expire after
                    the event without manual intervention. Learn more on the{" "}
                    <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                      business email signature page
                    </Link>
                    .
                  </p>
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
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Add a banner to your signature
              </h2>
              <p className="text-emerald-100 text-sm mb-6 max-w-md mx-auto">
                Banner rotation, click tracking, and team-wide updates are available in
                NeatStamp Pro. Start with a free signature and upgrade when you&rsquo;re ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Create My Signature — Free
                </Link>
                <Link
                  href="/pricing"
                  className="inline-block px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition-colors border border-emerald-400"
                >
                  See Pro Features
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
