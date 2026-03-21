import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Outlook Signature Best Practices for 2026",
  description:
    "Outlook signature best practices for 2026: HTML structure, image sizing, dark mode, mobile, legal requirements, and team deployment.",
  alternates: {
    canonical:
      "https://neatstamp.com/blog/outlook-signature-best-practices-2026",
  },
};

const faqs = [
  {
    q: "Why does my Outlook signature look different on the recipient's end?",
    a: "Outlook uses the Word rendering engine to display HTML, which ignores many standard CSS properties. The most common culprits are CSS classes (Outlook strips them), non-table layouts (Word doesn't understand div-based layout), and custom fonts that aren't installed on the recipient's machine. Build your signature with table-based HTML and inline styles only.",
  },
  {
    q: "What's the maximum size for an Outlook signature HTML file?",
    a: "Keep the total HTML under 10KB. Beyond that, some mail servers and spam filters start treating the signature as suspicious content. Base64-encoded images are the fastest way to blow this limit — a single 20KB logo becomes 27KB of base64 text. Use externally hosted images instead.",
  },
  {
    q: "Can I use animated GIFs in my Outlook signature?",
    a: "Classic Outlook (2016, 2019, 2021, and Outlook for Microsoft 365 on Windows) only renders the first frame of an animated GIF — it never plays. New Outlook and Outlook on the web do support animation. Since most corporate users are still on classic Outlook, it's safest to avoid animated GIFs altogether unless you know your audience.",
  },
  {
    q: "How do I make my Outlook signature work on mobile?",
    a: "Design for 500–600px maximum width. Use a single-column layout that scales down gracefully. Set explicit width and height attributes on all images. Keep text at 11px minimum. Wrap phone numbers in tel: links so they're tappable. Outlook mobile renders signatures fairly faithfully if the HTML is clean table-based code.",
  },
  {
    q: "Do I legally need a disclaimer in my Outlook signature?",
    a: "It depends on your country and industry. In the UK, limited companies must include their company registration number, registered office, and place of registration in business emails — that's a legal requirement. In the US, HIPAA requires disclaimers for healthcare communications. Financial services firms in most countries need regulatory body references. For most other businesses, a confidentiality disclaimer is optional but common.",
  },
  {
    q: "Should I use PNG or JPEG for my logo in Outlook?",
    a: "PNG for logos — it supports transparent backgrounds and renders sharp edges without artifacts. JPEG for headshots and photos — the file size is significantly smaller for photographic content. Never use SVG in Outlook signatures. Outlook's Word renderer does not support SVG and will either show a broken image icon or nothing at all.",
  },
  {
    q: "How do I deploy one Outlook signature across my whole team?",
    a: "There are three common approaches: Exchange/Microsoft 365 transport rules (server-side, no user involvement required), Active Directory-linked templates via third-party tools, or a managed signature tool like NeatStamp that lets you push consistent signatures to everyone from a single dashboard. The right choice depends on your IT setup and how much control you need.",
  },
  {
    q: "Why does Outlook show my image as an attachment?",
    a: "This almost always happens when images are embedded as base64 data URIs rather than hosted externally. Outlook treats embedded images as email attachments. Host your images on a public URL (your company website, a CDN, or NeatStamp's hosting) and reference them with a standard img src tag.",
  },
];

export default function OutlookSignatureBestPractices2026Page() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Outlook Signature Best Practices 2026",
            url: "https://neatstamp.com/blog/outlook-signature-best-practices-2026",
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
            <Link
              href="/blog"
              className="hover:text-slate-700 transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-700">
              Outlook Signature Best Practices 2026
            </span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Best Practices
                </span>
                <span className="text-sm text-slate-400">13 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Outlook Signature Best Practices for 2026
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Most Outlook signatures I see are either way too long, completely broken
                on mobile, or look like they were designed in 2008. The problem is that
                Outlook is genuinely harder to build for than Gmail or Apple Mail — it uses
                the Word rendering engine, which throws out half of modern CSS. Here are
                the rules that actually matter in 2026.
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
                  ["#golden-rules", "The 12 golden rules of Outlook signatures"],
                  ["#design-tips", "Design tips: fonts, colors, photos"],
                  ["#include-vs-skip", "What to include vs what to skip"],
                  ["#team-deployment", "Company-wide best practices for teams"],
                  ["#testing-checklist", "Testing checklist before you deploy"],
                  ["#neatstamp", "How NeatStamp handles this for you"],
                  ["#related-guides", "Related guides"],
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
            <section id="golden-rules" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The 12 golden rules of Outlook signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These aren&rsquo;t opinions — they&rsquo;re based on how Outlook actually
                renders HTML. Break any of these and you&rsquo;ll see broken layouts, missing
                images, or deliverability problems. Follow them and your signature works
                everywhere.
              </p>

              <div className="space-y-5">
                {[
                  {
                    num: "01",
                    rule: "Keep it under 4–5 lines of contact info",
                    detail:
                      "Less is more. A name, title, company, phone, and one social link is a complete signature. Everything beyond that competes with your actual email for attention. Most recipients spend about two seconds glancing at a signature — they're not reading it.",
                  },
                  {
                    num: "02",
                    rule: "Use table-based HTML",
                    detail:
                      "Outlook renders email HTML using the Word engine, not a browser. That means flexbox, grid, and div-based layouts simply don't work. The only reliable layout system is HTML tables with inline styles. This is not elegant, but it works across Outlook 2016 through New Outlook and everything in between. See the full breakdown in the",
                    link: { href: "/outlook-signature-html", text: "Outlook HTML guide" },
                    afterLink: ".",
                  },
                  {
                    num: "03",
                    rule: "Keep total HTML under 10KB",
                    detail:
                      "Deliverability matters. Email servers and spam filters start treating large signature blocks as suspicious. Some corporate mail gateways strip signatures over a certain size. Keep your HTML lean. If you're hitting 10KB, the culprit is almost certainly embedded images — which leads directly to rule 4.",
                    link: { href: "/email-signature-deliverability", text: "Deliverability guide" },
                    afterLink: " has more on this.",
                  },
                  {
                    num: "04",
                    rule: "Use hosted images, not embedded (base64 = attachment)",
                    detail:
                      "Base64-encoded images look convenient — no external hosting required — but they're a mistake. Outlook treats them as email attachments, so recipients see a paperclip icon. They also bloat your HTML file size significantly. Host all images on a public URL instead.",
                  },
                  {
                    num: "05",
                    rule: "Keep images under 100KB total",
                    detail:
                      "Add up the file sizes of every image in your signature: logo, headshot, social icons, banner. That total should stay under 100KB. If you're over that, compress your JPEG photos (aim for under 25KB each) and run your PNGs through a tool like TinyPNG.",
                    link: { href: "/blog/email-signature-size", text: "Email signature size guide" },
                    afterLink: " covers the exact numbers.",
                  },
                  {
                    num: "06",
                    rule: "Use PNG for icons, JPEG for photos — never SVG",
                    detail:
                      "Outlook's Word renderer does not support SVG. It will show a broken image icon or nothing at all. Use PNG for logos and social icons (transparent background, sharp edges), and JPEG for headshots and photos (much smaller file size for photographic content).",
                  },
                  {
                    num: "07",
                    rule: "Set explicit width and height on every image",
                    detail:
                      "Always set both the HTML width and height attributes directly on your img tag — not just in CSS. Without them, Outlook ignores your dimensions and renders images at their actual file size. A 400px logo file displayed without explicit dimensions will appear as 400px wide, breaking your layout.",
                  },
                  {
                    num: "08",
                    rule: "Use inline CSS only",
                    detail:
                      "No CSS classes. No external stylesheets. No <style> blocks in the head. Outlook strips all of these. Every style property must be written directly on the element as a style attribute. This is tedious to write by hand, which is why signature generators exist.",
                  },
                  {
                    num: "09",
                    rule: "Design for 500px width",
                    detail:
                      "A 500px maximum width works on desktop reading panes (which typically show at 600–800px) and scales down to mobile without horizontal scrollbars. It also leaves breathing room in Outlook's layout. Cap your outer table at 500px.",
                    link: { href: "/email-signature-mobile-friendly", text: "Mobile-friendly signature guide" },
                    afterLink: " has layout examples.",
                  },
                  {
                    num: "10",
                    rule: "Test in dark mode",
                    detail:
                      "Outlook on Windows inverts colors that don't have explicit background declarations. If your text is dark on a white background but you haven't declared that white background inline, Outlook may flip it to dark — making dark text invisible on a dark background. Always set background-color: #ffffff on your outer table.",
                    link: { href: "/email-signature-dark-mode-compatible", text: "Dark mode compatible signatures" },
                    afterLink: " explains exactly which properties to declare.",
                  },
                  {
                    num: "11",
                    rule: "Include a CTA, but keep it subtle",
                    detail:
                      "A scheduling link, a link to your latest blog post, or a one-line mention of a new product can all work well. The key word is subtle — a CTA that's bigger than your name looks desperate. One line, smaller font, below your contact details.",
                  },
                  {
                    num: "12",
                    rule: "Don't use animated GIFs in Outlook",
                    detail:
                      "Classic Outlook (2016, 2019, 2021, and Outlook for Microsoft 365 on Windows) shows only the first frame of any animated GIF. It never plays. The animation you spent time on is completely invisible to the majority of corporate recipients.",
                    link: { href: "/blog/email-signature-best-practices", text: "General email signature best practices" },
                    afterLink: " covers more on multimedia in signatures.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl font-extrabold text-slate-200 leading-none flex-shrink-0 w-8">
                        {item.num}
                      </span>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">
                          {item.rule}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item.detail}
                          {item.link && (
                            <>
                              {" "}
                              <Link
                                href={item.link.href}
                                className="text-blue-600 hover:underline"
                              >
                                {item.link.text}
                              </Link>
                              {item.afterLink}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2 */}
            <section id="design-tips" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Design tips: fonts, colors, and photos
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                The technical rules above keep your signature from breaking. These design
                guidelines keep it from looking bad. They&rsquo;re not the same thing.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Font choices: stick to web-safe
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Email is not a web page. Custom fonts from Google Fonts or your brand kit
                won&rsquo;t load in Outlook — the client doesn&rsquo;t fetch external CSS. Outlook
                will fall back to its own default (usually Times New Roman) if it can&rsquo;t
                find your declared font. The safe choice is to use web-safe fonts as your
                primary declaration:
              </p>
              <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3">
                {[
                  {
                    name: "Arial",
                    notes:
                      "The most universally safe option. Clean, neutral, works at any size. Hard to go wrong.",
                  },
                  {
                    name: "Georgia",
                    notes:
                      "The best serif option. Authoritative feel without looking old-fashioned. Good for law, finance, academia.",
                  },
                  {
                    name: "Verdana",
                    notes:
                      "Designed specifically for screen readability. Slightly wider, very legible at 11–12px.",
                  },
                  {
                    name: "Trebuchet MS",
                    notes:
                      "A humanist sans-serif with a bit more character than Arial. Works well for creative fields.",
                  },
                  {
                    name: "Tahoma",
                    notes:
                      "Compact and clean. Windows staple. Renders particularly well in Outlook.",
                  },
                ].map((font) => (
                  <div key={font.name} className="flex items-start gap-3">
                    <code className="mt-0.5 text-xs bg-white border border-slate-200 px-2 py-1 rounded font-mono text-slate-700 whitespace-nowrap">
                      {font.name}
                    </code>
                    <p className="text-sm text-slate-600">{font.notes}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                You can specify a brand font as your first choice with a web-safe fallback —
                for example:{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  font-family: &apos;Lato&apos;, Arial, sans-serif
                </code>
                . Recipients with Lato installed see it; everyone else sees Arial. The
                fallback is what matters. Keep body text at 12–13px minimum and your name
                at 14–16px bold.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Color contrast
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Use dark text on a light background — not pure black (#000000), but a dark
                grey like #333333 or #1a1a2e. Pure black can cause inversion issues in some
                dark mode implementations. Your text needs to pass a 4.5:1 contrast ratio
                for normal text sizes. Common failures I see:
              </p>
              <ul className="space-y-2 mb-6 text-slate-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Light grey (#999999) on white — fails WCAG AA at normal text sizes
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Brand colors that are too light (yellow, pale blue, mint green) as text
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  White text without an explicit background declaration — disappears in dark mode
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                Stick to a maximum of three colors in total: one primary brand color for
                accent elements (a divider line, your name, a CTA button), one dark neutral
                for body text, and white or very light grey for the background.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                White space and photo shape
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cramped signatures look unprofessional. Give elements breathing room with
                cell padding in your tables — at least 4–6px between rows. Don&rsquo;t stack
                seven lines of text with no visual separation.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For headshots: a circular crop looks modern and friendly. A square crop is
                more neutral. Either works — just apply the crop before you upload the image,
                not in CSS (CSS border-radius on images is unreliable in Outlook). Keep
                headshots at 80&times;80px or 100&times;100px display size. Anything larger
                and it starts to dominate the signature.
              </p>
            </section>

            {/* Section 3 */}
            <section id="include-vs-skip" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to include vs what to skip
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                There&rsquo;s no universal answer — it depends on your role, industry, and
                country. Here&rsquo;s a clear breakdown.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Always include
              </h3>
              <ul className="space-y-2 mb-6 text-slate-600">
                {[
                  "Full name — as you&rsquo;d appear on a business card",
                  "Job title — specific beats vague (\"Senior Account Manager\" vs \"Sales\")",
                  "Company name — linked to your company website",
                  "One phone number — direct line preferred",
                  "Email address — yes, even though they have it; it gets copied into forwards and calendar invites",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Include if relevant to your role
              </h3>
              <ul className="space-y-2 mb-6 text-slate-600">
                {[
                  "Company logo — reinforces trust for client-facing roles",
                  "LinkedIn link — nearly universally appropriate",
                  "Headshot — strong for sales, consulting, coaching, real estate",
                  "Scheduling link — only if recipients actually book meetings with you",
                  "Pronouns — increasingly common in progressive industries and companies",
                  "Certifications or credentials — valuable in regulated fields (healthcare, finance, legal)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Legal disclaimer requirements by country
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                This catches people out. Some countries have actual legal requirements for
                what must appear in business emails, not just best practice suggestions:
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <ul className="space-y-3 text-sm text-amber-900">
                  <li>
                    <strong>UK:</strong> Limited companies must include full company name,
                    registered number, registered office address, and country of registration
                    in all business correspondence — including email. This is the Companies Act
                    2006.
                  </li>
                  <li>
                    <strong>Germany:</strong> Similar requirements under the GmbH-Gesetz and
                    AG-Gesetz — company name, legal form, registered office, and registration
                    court must appear.
                  </li>
                  <li>
                    <strong>EU generally:</strong> VAT numbers required in some B2B contexts.
                  </li>
                  <li>
                    <strong>US healthcare:</strong> HIPAA requires a confidentiality notice on
                    emails that may contain protected health information.
                  </li>
                  <li>
                    <strong>US financial services:</strong> FINRA and SEC-registered firms need
                    regulatory disclosures.
                  </li>
                </ul>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Check with your legal team or company secretary for your specific obligations.
                NeatStamp&rsquo;s{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  team signature management
                </Link>{" "}
                lets you add required legal text as a locked field that employees can&rsquo;t
                accidentally delete.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Leave these out
              </h3>
              <ul className="space-y-2 mb-4 text-slate-600">
                {[
                  "\"Sent from my iPhone\" or \"Sent from my Android\" — turn this off immediately",
                  "\"Please consider the environment before printing\" — accomplishes nothing",
                  "Inspirational quotes — unless thought leadership is your specific positioning",
                  "Animated GIFs — broken in classic Outlook, distracting everywhere else",
                  "More than 3 social media icons — two or three platforms you&rsquo;re actually active on",
                  "Your full mailing address — unless legally required or you run a physical location business",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                For a detailed breakdown of every element and whether it earns its spot, the{" "}
                <Link
                  href="/email-signature-outlook"
                  className="text-blue-600 hover:underline"
                >
                  Outlook signature guide
                </Link>{" "}
                covers this with specific examples by industry. You can also see what clean,
                minimal signatures look like in the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template library
                </Link>
                .
              </p>
            </section>

            {/* Section 4 */}
            <section id="team-deployment" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Company-wide best practices for teams
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                One person following these rules is good. Your whole company following them
                consistently is significantly better. A uniform signature policy creates
                brand consistency and makes legal compliance manageable. Here&rsquo;s how to
                do it right.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Define a signature policy first
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before you build anything, decide what&rsquo;s mandatory and what&rsquo;s optional.
                A good policy covers: required fields (name, title, phone, email), brand
                elements (approved logo, approved colors), what employees can personalize
                (maybe their pronouns or a personal LinkedIn link), and what&rsquo;s prohibited
                (personal quotes, non-brand images, custom fonts).
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Write this down. An unwritten policy gets ignored as soon as someone joins
                and sets up their signature based on a colleague&rsquo;s six-year-old example.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Centralized deployment options
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "Exchange / Microsoft 365 transport rules",
                    desc: "Microsoft 365 lets IT admins apply server-side signatures via transport rules (also called mail flow rules). These append HTML to every outgoing email automatically, regardless of what signature the user has locally. The downside: they apply after the email leaves Outlook, so the sender doesn't see the signature in their sent copy.",
                  },
                  {
                    title: "Active Directory + signature template tools",
                    desc: "Tools like CodeTwo, Exclaimer, and Crossware pull employee data from Active Directory (name, title, department, phone) and auto-populate signature templates. Good for larger organizations where keeping 200 signatures updated manually is impractical.",
                  },
                  {
                    title: "Managed signature platforms",
                    desc: "NeatStamp's team plan lets you create a master template, lock brand elements that can't be changed, and let employees fill in their personal details. Everyone gets a consistent, correctly coded signature without involving IT for every update.",
                  },
                ].map((option) => (
                  <div
                    key={option.title}
                    className="bg-slate-50 rounded-xl p-5"
                  >
                    <h4 className="font-semibold text-slate-900 mb-2 text-sm">
                      {option.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {option.desc}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Update management
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Signatures go stale fast. Phone numbers change, people get promoted, offices
                move. Set a quarterly reminder to audit signatures across your team. With
                a centralized tool, you change the template once and everyone&rsquo;s signature
                updates. Without one, you&rsquo;re chasing 30 people to re-install theirs.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link
                  href="/email-signature-for-teams"
                  className="text-blue-600 hover:underline"
                >
                  email signature for teams guide
                </Link>{" "}
                covers deployment options in much more detail, including the Microsoft 365
                transport rule setup step by step.
              </p>
            </section>

            {/* Section 5 */}
            <section id="testing-checklist" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Testing checklist before you deploy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Building a signature is step one. Testing it is step two — and most people
                skip it. Here&rsquo;s what to check before you roll anything out.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    category: "Outlook desktop (Windows)",
                    checks: [
                      "Images display at the correct size (not at full file resolution)",
                      "Layout doesn't collapse — columns stay side by side",
                      "Text renders in the correct font (Arial, not Times New Roman)",
                      "Links are clickable (phone number, email, website, social icons)",
                      "No images show as email attachments",
                    ],
                  },
                  {
                    category: "Dark mode (Outlook + other clients)",
                    checks: [
                      "Text is visible on dark backgrounds",
                      "Background is explicitly declared white (#ffffff) in inline style",
                      "No text or icon disappears",
                      "Logo is legible (consider a dark-mode version if your logo is white)",
                    ],
                  },
                  {
                    category: "Mobile (iOS Mail + Gmail + Outlook mobile)",
                    checks: [
                      "No horizontal scrollbars",
                      "Text is at least 11px and readable without zooming",
                      "Phone number is a tappable tel: link",
                      "Social icons are at least 24×24px (tappable)",
                      "Images scale proportionally",
                    ],
                  },
                  {
                    category: "Gmail and Apple Mail",
                    checks: [
                      "Images load from external URLs (not broken)",
                      "Colors are correct",
                      "Spacing looks right (Gmail sometimes adds margins)",
                    ],
                  },
                  {
                    category: "Content",
                    checks: [
                      "All links go to the right URLs (easy to make a typo)",
                      "Phone number is correct and includes country code for international contacts",
                      "Company website link works",
                      "No outdated job title or company name",
                    ],
                  },
                ].map((section) => (
                  <div
                    key={section.category}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-slate-900 mb-3 text-sm">
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.checks.map((check) => (
                        <li
                          key={check}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 text-slate-300 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you want to test properly without sending test emails to your team, use a
                service like Litmus or Email on Acid for multi-client preview rendering.
                For quick checks, send to yourself across a Gmail account, an Outlook.com
                account, and your work email — that covers the most common rendering paths.
                The{" "}
                <Link
                  href="/email-signature-outlook-compatible"
                  className="text-blue-600 hover:underline"
                >
                  Outlook-compatible signature guide
                </Link>{" "}
                goes deeper on testing in specific Outlook versions.
              </p>
            </section>

            {/* Section 6 */}
            <section id="neatstamp" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How NeatStamp handles this for you
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every rule in this guide is built into NeatStamp&rsquo;s output. When you build
                a signature in the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>
                , the generated HTML automatically:
              </p>
              <ul className="space-y-2 mb-6 text-slate-600">
                {[
                  "Uses table-based layout compatible with Outlook 2016 through New Outlook",
                  "Applies all styles inline (no classes, no external CSS)",
                  "Sets explicit width and height on every image",
                  "Uses only web-safe fonts with appropriate fallbacks",
                  "Declares background colors explicitly to prevent dark mode inversions",
                  "Keeps the HTML well under 10KB",
                  "Hosts your images on a CDN (Pro plan) so they never appear as attachments",
                  "Generates mobile-responsive code within a 500px max-width structure",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                You don&rsquo;t need to know any HTML to build a correctly coded signature. The
                editor gives you a visual interface; the output is production-ready code you
                can paste directly into Outlook. If you want to inspect or customize the HTML,
                you can — but you don&rsquo;t have to.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For teams, NeatStamp lets you create a master template, lock the elements
                that must stay consistent (logo, colors, legal text), and let each team member
                fill in their own name, title, and photo. One click updates the template
                across everyone. The{" "}
                <Link
                  href="/email-signature-for-teams"
                  className="text-blue-600 hover:underline"
                >
                  team features page
                </Link>{" "}
                has the full details.
              </p>
            </section>

            {/* Related Guides */}
            <section id="related-guides" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Related guides
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/email-signature-outlook",
                    title: "Outlook Signature Setup",
                    desc: "Step-by-step instructions for every Outlook version",
                  },
                  {
                    href: "/outlook-signature-html",
                    title: "Outlook HTML Signature Guide",
                    desc: "The complete technical reference for Outlook-compatible HTML",
                  },
                  {
                    href: "/email-signature-outlook-compatible",
                    title: "Outlook-Compatible Signatures",
                    desc: "What works and what doesn&rsquo;t across Outlook versions",
                  },
                  {
                    href: "/email-signature-dark-mode-compatible",
                    title: "Dark Mode Compatible Signatures",
                    desc: "How to keep your signature visible in dark mode",
                  },
                  {
                    href: "/email-signature-mobile-friendly",
                    title: "Mobile-Friendly Signatures",
                    desc: "Layout and sizing rules for iOS, Android, and Outlook mobile",
                  },
                  {
                    href: "/email-signature-deliverability",
                    title: "Signatures and Deliverability",
                    desc: "How signature size and code quality affect your email reputation",
                  },
                  {
                    href: "/blog/outlook-signature-not-working",
                    title: "Outlook Signature Not Working",
                    desc: "Fixes for the most common Outlook signature problems",
                  },
                  {
                    href: "/blog/email-signature-size",
                    title: "Email Signature Size Guide",
                    desc: "Exact numbers for image dimensions, file size, and HTML size",
                  },
                  {
                    href: "/blog/new-outlook-signature-problems",
                    title: "New Outlook Signature Problems",
                    desc: "Every known issue with New Outlook signatures and how to fix each one",
                  },
                ].map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="block border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 mb-1">
                      {guide.title}
                    </p>
                    <p
                      className="text-xs text-slate-500"
                      dangerouslySetInnerHTML={{ __html: guide.desc }}
                    />
                  </Link>
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

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build a signature that follows every rule on this page
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp generates Outlook-compatible HTML automatically. No code required.
                Free to try, takes about 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Create My Signature — Free
                </Link>
                <Link
                  href="/templates"
                  className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Browse Templates
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
