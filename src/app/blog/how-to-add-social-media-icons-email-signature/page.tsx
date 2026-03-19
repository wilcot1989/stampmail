import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "How to Add Social Media Icons to Your Email Signature (2026)",
  description:
    "Which social icons to include, how to add them in NeatStamp, image vs text links, correct icon sizing, and common mistakes like broken links and too many icons.",
  alternates: {
    canonical:
      "https://neatstamp.com/blog/how-to-add-social-media-icons-email-signature",
  },
};

const faqs = [
  {
    q: "What size should social media icons be in an email signature?",
    a: "20–24px is the sweet spot. That's large enough to be identifiable and tap-friendly on mobile, but doesn't dominate the signature visually. Use a 2x resolution file (40–48px actual pixel dimensions) so they're sharp on retina screens.",
  },
  {
    q: "Should I use image icons or text links for social media?",
    a: "Image icons look better when they load. Text links work in every situation — even when images are blocked. The best approach is image icons that fall back gracefully with alt text. NeatStamp uses this approach automatically.",
  },
  {
    q: "How many social icons should I include in my email signature?",
    a: "Two to three maximum. LinkedIn is almost always the right call. Add a second one only if it's relevant to your recipients. Eight icons in a row looks cluttered and signals that you're not sure which platform matters.",
  },
  {
    q: "Can I use branded social icons (the ones from each platform)?",
    a: "Yes, but check each platform's brand guidelines. LinkedIn, X, YouTube, and Instagram all publish official icon assets with usage rules. The main rules: don't change the colors, don't add visual effects, keep them at the minimum size specified.",
  },
  {
    q: "Why do my social icons look blurry in my email signature?",
    a: "You're using a 1x resolution image on a 2x (retina) screen. Export your icons at double the display size: if you display at 20px, export the file at 40px, then set the HTML width and height attributes to 20.",
  },
];

export default function SocialMediaIconsEmailSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Social Media Icons Email Signature",
            url: "https://neatstamp.com/blog/how-to-add-social-media-icons-email-signature",
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
            <span className="text-slate-700">Social Media Icons in Email Signatures</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Guide
                </span>
                <span className="text-sm text-slate-400">11 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                How to Add Social Media Icons to Your Email Signature (2026)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Done right, social icons in your signature give recipients an easy way to
                connect with you on the channels that matter. Done wrong, they look like a
                cluttered mess of tiny broken images. This guide covers which icons to include,
                exactly how to size and add them, and the mistakes that make even nicely
                designed signatures look amateurish.
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
                  ["#which-icons", "Which icons to include (and why)"],
                  ["#adding-in-neatstamp", "How to add them in NeatStamp"],
                  ["#image-vs-text", "Image-based vs text-based links"],
                  ["#icon-sizing", "Icon sizing — the exact numbers"],
                  ["#common-mistakes", "Common mistakes to avoid"],
                  ["#platform-tips", "Platform-specific tips"],
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
            <section id="which-icons" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Which icons to include (and why)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before we get into the technical side, the question most people skip:
                which platforms should actually be in your signature? My answer is: fewer
                than you think.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                LinkedIn — almost always yes
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                LinkedIn is the one platform that&rsquo;s appropriate for virtually every
                professional context. It&rsquo;s where recipients go to verify who you are, check
                your credentials, and decide whether to respond to cold outreach. If you
                include one social icon and nothing else, make it LinkedIn.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Link to your personal profile, not your company page. Your personal profile
                is the handshake — the company page is marketing material.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                X (Twitter) — situational
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                X belongs in your signature if you genuinely use it for professional content
                and have a meaningful following. If you tweet about your industry, share
                research, or engage in public professional conversations, it&rsquo;s worth including.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If your last tweet was six months ago, leave it out. A link to a dormant
                account looks worse than no link at all.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Instagram — for creatives and visual businesses
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Instagram makes sense if your work is visual — designers, photographers,
                architects, interior decorators, personal trainers. It&rsquo;s also worth including
                if you run a product-based business where Instagram functions as a portfolio
                or shop window.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                It&rsquo;s out of place in most B2B contexts — legal, finance, software, consulting.
                In those settings it reads as unprofessional rather than personable.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                YouTube — if you produce video content
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have a channel with relevant content — tutorials, webinars, thought
                leadership videos — YouTube is worth including. A subscriber count below
                500–1000 probably isn&rsquo;t helping you; at that point it&rsquo;s a distraction rather
                than social proof.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                GitHub, Behance, Dribbble — niche but powerful
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                For software developers, a GitHub link is more informative than a LinkedIn
                profile. For designers, Dribbble or Behance does the same work. Use these
                for role-specific contexts where the audience will recognize and value them.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The ones to skip
              </h3>
              <ul className="space-y-2 mb-4 text-slate-600">
                {[
                  "Facebook — personal, not professional. The exception is if you run a Facebook business page that clients actively use.",
                  "TikTok — occasionally relevant for consumer-facing brands and content creators. In most B2B contexts, it looks off-brand.",
                  "Pinterest — relevant for home decor, food, wedding, or retail. Rarely appropriate elsewhere.",
                  "Snapchat — hard to think of a professional context where this belongs in a signature.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                For freelancers specifically, the approach is slightly different — the{" "}
                <Link
                  href="/email-signature-for-freelancers"
                  className="text-blue-600 hover:underline"
                >
                  freelancer email signature guide
                </Link>{" "}
                covers how to use social links as a portfolio tool.
              </p>
            </section>

            {/* Section 2 */}
            <section id="adding-in-neatstamp" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to add social media icons in NeatStamp
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Adding social icons in NeatStamp takes about 30 seconds. Here&rsquo;s the process:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Open the editor",
                    body: 'Go to neatstamp.com/editor. Fill in your basic details if you haven\'t already — name, title, company, contact info.',
                  },
                  {
                    step: "2",
                    title: "Find the Social Links section",
                    body: "In the left panel, scroll to the Social Links section. You'll see icons for LinkedIn, X, Instagram, Facebook, YouTube, GitHub, and more.",
                  },
                  {
                    step: "3",
                    title: "Click a platform and paste your URL",
                    body: "Click the LinkedIn icon (or whichever platform you want). A text field appears — paste your full profile URL there. Example: https://linkedin.com/in/yourname",
                  },
                  {
                    step: "4",
                    title: "Check the preview",
                    body: "The live preview on the right updates immediately. Click the icon in the preview to verify the link works correctly before you copy the signature.",
                  },
                  {
                    step: "5",
                    title: "Copy and install",
                    body: 'Click "Copy Signature" and paste into your email client\'s signature settings. The icons are included as hosted PNG images — no base64 embedding, no attachment issues.',
                  },
                ].map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                The icons in NeatStamp are sized at 20px display / 40px file resolution,
                with proper HTML width/height attributes, and wrapped in clickable anchor
                tags pointing to your URLs. They display correctly in Gmail, Outlook, Apple
                Mail, and mobile clients. See the{" "}
                <Link
                  href="/email-signature-design"
                  className="text-blue-600 hover:underline"
                >
                  email signature design guide
                </Link>{" "}
                for more on how the overall layout is structured.
              </p>
            </section>

            {/* Section 3 */}
            <section id="image-vs-text" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Image-based vs text-based links
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are two approaches to social links in email signatures: image icons
                (the typical little square or circle icons) and plain text links (like
                &ldquo;LinkedIn: linkedin.com/in/yourname&rdquo;). Both have legitimate use cases.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                {[
                  {
                    type: "Image icons",
                    pros: [
                      "Visually clean — recognizable at a glance",
                      "Compact — doesn't add vertical height to the signature",
                      "Consistent with modern design conventions",
                    ],
                    cons: [
                      "Blocked by default in Outlook for external senders",
                      "Alt text fallback needs to be set correctly",
                      "Slightly more complex HTML to write manually",
                    ],
                  },
                  {
                    type: "Text links",
                    pros: [
                      "Always visible — no image blocking issues",
                      "Screen reader friendly",
                      "Works even in plain-text emails",
                    ],
                    cons: [
                      "Takes up more horizontal or vertical space",
                      "Looks more dated — less visual polish",
                      "Long URLs look cluttered",
                    ],
                  },
                ].map((option) => (
                  <div
                    key={option.type}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-slate-900 mb-3">
                      {option.type}
                    </h3>
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                        Pros
                      </p>
                      <ul className="space-y-1">
                        {option.pros.map((pro) => (
                          <li key={pro} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="mt-1 h-1 w-1 rounded-full bg-green-500 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">
                        Cons
                      </p>
                      <ul className="space-y-1">
                        {option.cons.map((con) => (
                          <li key={con} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="mt-1 h-1 w-1 rounded-full bg-red-400 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                My recommendation: use image icons with properly set alt text. The alt text
                fallback means that even when Outlook blocks images, recipients see &ldquo;LinkedIn&rdquo;
                as a clickable link rather than a broken image. NeatStamp sets this
                automatically.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If your audience is primarily Outlook desktop users (common in corporate
                enterprise environments), a hybrid approach works well: image icons that link
                out, with the platform name as alt text. It looks like image icons when images
                load, and like sensible text links when they don&rsquo;t. For more technical detail on
                how this is structured, the{" "}
                <Link href="/html-email-signature" className="text-blue-600 hover:underline">
                  HTML email signature guide
                </Link>{" "}
                has the code.
              </p>
            </section>

            {/* Section 4 */}
            <section id="icon-sizing" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Icon sizing — the exact numbers
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Tiny icons look blurry. Oversized icons dominate the whole signature. Here
                are the numbers that work.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
                <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
                  Recommended icon specifications
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Display size (HTML width/height)",
                      value: "20px × 20px",
                      note: "Minimum 20px for readability and tap-friendliness",
                    },
                    {
                      label: "Actual file resolution",
                      value: "40px × 40px",
                      note: "2x for retina — prevents blurry icons on HiDPI screens",
                    },
                    {
                      label: "Icon spacing (between icons)",
                      value: "6–8px",
                      note: "Enough gap that they don't look crammed together",
                    },
                    {
                      label: "File format",
                      value: "PNG (transparent background)",
                      note: "Retains crisp edges. Works on any background.",
                    },
                    {
                      label: "File size per icon",
                      value: "Under 3KB",
                      note: "Simple icons at this size should be tiny",
                    },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-start justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-blue-900">{spec.label}</p>
                        <p className="text-xs text-blue-600">{spec.note}</p>
                      </div>
                      <code className="text-sm font-bold text-blue-900 font-mono whitespace-nowrap">
                        {spec.value}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Icon style choices
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Consistent icon style matters as much as consistent size. Mixing a flat
                colored LinkedIn icon with a gradient Instagram icon and a monochrome GitHub
                icon looks disjointed. Pick one style set and stick to it:
              </p>
              <ul className="space-y-2 mb-4 text-slate-600">
                {[
                  "Branded (official colors) — each icon uses its platform's color. Vibrant but can clash with your signature palette.",
                  "Monochrome (all one color) — typically your brand color or dark grey. Clean and cohesive. Looks great with minimal signatures.",
                  "Outlined (line-art style) — a middle ground. More personality than monochrome, less visually complex than full color.",
                ].map((style) => (
                  <li key={style} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span className="text-sm">{style}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                NeatStamp uses monochrome icons by default, which works with any signature
                color scheme. The{" "}
                <Link
                  href="/professional-email-signature"
                  className="text-blue-600 hover:underline"
                >
                  professional email signature page
                </Link>{" "}
                has examples showing how icons look across different templates.
              </p>
            </section>

            {/* Section 5 */}
            <section id="common-mistakes" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Common mistakes to avoid
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                I&rsquo;ve seen all of these in real signatures, including from marketing agencies
                who should know better.
              </p>

              <div className="space-y-5 mb-6">
                {[
                  {
                    title: "Too many icons",
                    description:
                      "Eight social icons in a row is not impressive — it's visual noise. Recipients don't click all of them. If you include Facebook, Instagram, LinkedIn, Twitter, YouTube, TikTok, Pinterest, and GitHub, you're announcing that you're on every platform and active on none. Pick the two or three that matter.",
                  },
                  {
                    title: "Broken or wrong links",
                    description:
                      "This happens more than you'd think. Someone creates a signature in a hurry, pastes a link incorrectly, and sends thousands of emails with a LinkedIn icon that points to the wrong profile — or worse, a 404 page. Click every link in your signature before you deploy it. Click them again after you install it in the email client.",
                  },
                  {
                    title: "Icons that link to a company page instead of a personal profile",
                    description:
                      "Your LinkedIn icon should point to your personal profile at linkedin.com/in/yourname, not to your company page at linkedin.com/company/yourcompany. Recipients clicking the LinkedIn icon want to learn about you, not see your company's press releases.",
                  },
                  {
                    title: "Using SVG files",
                    description:
                      "SVGs are not supported by Outlook desktop. If you copy SVG social icons from a design website and paste them into your HTML, they'll be blank boxes in Outlook. Always export icons as PNG.",
                  },
                  {
                    title: "Mixing icon sets and sizes",
                    description:
                      "One icon from Brand Resources, one from Flaticon, one that's 16px and one that's 32px. The inconsistency is jarring up close. Source all icons from the same set and size them identically.",
                  },
                  {
                    title: "No alt text or wrong alt text",
                    description:
                      "When Outlook blocks images, what does the recipient see? If you haven't set alt text, they see a broken image placeholder. Set alt text to the platform name: alt=\"LinkedIn\". This way blocked-image users still see a text link they can click.",
                  },
                  {
                    title: "Padding or spacing via empty images",
                    description:
                      "I've seen signatures use a 1x1 transparent GIF to add spacing between icons. This is a 1990s technique. Use table cell padding or margin instead — it's cleaner and doesn't add extra HTTP requests or attachment confusion.",
                  },
                ].map((mistake) => (
                  <div
                    key={mistake.title}
                    className="border-l-4 border-red-400 bg-red-50 rounded-r-xl pl-5 pr-5 py-4"
                  >
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {mistake.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {mistake.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 */}
            <section id="platform-tips" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Platform-specific tips
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                A few things worth knowing about specific platforms when setting up icons.
              </p>

              <div className="space-y-5">
                {[
                  {
                    platform: "LinkedIn",
                    tips: [
                      'Use your "Public Profile URL" — found in LinkedIn under View Profile → Edit public profile & URL. You can customize it to linkedin.com/in/firstname-lastname. The default URL has numbers and looks messy.',
                      "LinkedIn requires an HTTPS link. Don't use http://.",
                      "LinkedIn's brand guidelines allow the blue square icon, the blue in/circle icon, and the \"in\" text. They prohibit distorting the logo or changing the color.",
                    ],
                  },
                  {
                    platform: "X (formerly Twitter)",
                    tips: [
                      'Your X profile URL is x.com/yourusername. Some people still use twitter.com/yourusername — both resolve, but x.com is current.',
                      "X's brand guidelines as of 2025 require the X logo rather than the old bird logo. Using the bird may technically violate their brand guidelines.",
                      "If your username changed with the rebrand, make sure your signature reflects your current handle.",
                    ],
                  },
                  {
                    platform: "Instagram",
                    tips: [
                      "Profile URL format: instagram.com/yourusername",
                      "Instagram has no desktop app — all clicks from email will open in a browser or the mobile app. Make sure your profile is set to public.",
                      "The Meta brand guidelines require specific Instagram icon variants. The gradient icon is correct; a flat blue version is not officially approved.",
                    ],
                  },
                  {
                    platform: "GitHub",
                    tips: [
                      "Profile URL: github.com/yourusername",
                      "If you're using GitHub in a signature, it's usually for developer outreach. Make sure your profile is polished — pinned repos, a proper README, and activity.",
                      "GitHub's Invertocat logo is free to use in most contexts. Don't use GitHub's wordmark in a modified form.",
                    ],
                  },
                ].map((p) => (
                  <div key={p.platform} className="bg-slate-50 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-3">
                      {p.platform}
                    </h3>
                    <ul className="space-y-2">
                      {p.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                For a complete look at how social icons fit into overall signature design,
                the{" "}
                <Link
                  href="/email-signature-examples-with-logo"
                  className="text-blue-600 hover:underline"
                >
                  signature examples with logo
                </Link>{" "}
                page shows real templates. If you&rsquo;re ready to build yours, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                handles all the icon sizing and linking automatically.
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
                Add social icons to your signature in 60 seconds
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp handles icon sizing, hosting, and linking automatically. Free,
                no account needed.
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
