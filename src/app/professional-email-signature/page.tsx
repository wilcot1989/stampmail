import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Professional Email Signature Guide (2026)",
  description:
    "Your email signature gets seen thousands of times a year. Learn what belongs in a professional signature, what to cut, and how to build one that works in every email client.",
  alternates: {
    canonical: "https://neatstamp.com/professional-email-signature",
  },
};

const faqs = [
  {
    q: "How long should a professional email signature be?",
    a: "Three to five lines of actual content is the sweet spot. Name, title, company, one phone number, and one link. Anything beyond that starts competing with your email for attention. If you need a legal disclaimer, add it below a divider and use a smaller font size (11px).",
  },
  {
    q: "Should I include my photo in my email signature?",
    a: "It depends on the context. In sales, real estate, consulting, or any role where a personal relationship matters, a headshot helps. In technical or back-office roles, it's usually unnecessary. If you include one, keep it square, around 80×80px, and use a clean professional background.",
  },
  {
    q: "Can I use a custom font in my email signature?",
    a: "No — or rather, you shouldn't. Custom fonts require the recipient to have that font installed. If they don't, their email client substitutes a fallback, and your spacing and sizing can shift unexpectedly. Stick to web-safe fonts: Arial, Verdana, Georgia, or Trebuchet MS.",
  },
  {
    q: "Should I include my social media links?",
    a: "Only the ones you actively use and that are relevant to your professional context. LinkedIn is almost always worth including. Twitter/X depends on whether you post professionally. Instagram and Facebook are usually not appropriate for a business signature unless you're a creative professional.",
  },
  {
    q: "Is an inspirational quote in an email signature professional?",
    a: "No. I've never encountered a professional context where an inspirational quote in a signature came across well. It adds length, brings in your personal opinions where they don't belong, and can easily feel out of tone. Leave it out.",
  },
  {
    q: "Do I need a different signature for internal vs. external emails?",
    a: "Many professionals use a shorter signature for internal emails — just their name and extension number — and a fuller signature for external ones. Most email clients let you set up multiple signatures. It's a small thing but it stops you from padding every internal thread with 8 lines of contact info your colleagues already know.",
  },
  {
    q: "What's the right image size for a logo in an email signature?",
    a: "Aim for a maximum width of 150px for logos displayed inline with text, or up to 500px for a banner running below the signature content. Keep file sizes under 100KB. Use a PNG with a transparent background so the logo works on both light and dark email themes.",
  },
  {
    q: "How do I make my signature look the same in Gmail and Outlook?",
    a: "Use table-based HTML — not CSS floats, flexbox, or grid. Outlook's rendering engine strips modern CSS layout. NeatStamp generates table-based signatures that hold their layout in both Gmail and Outlook. If you're writing the HTML yourself, test by sending to both clients before rolling it out.",
  },
];

export default function ProfessionalEmailSignaturePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Professional Email Signature",
            url: "https://neatstamp.com/professional-email-signature",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Professional Email Signature
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Your email signature gets seen more than your business card, your
              LinkedIn profile, and probably your website. If it looks like you
              made it in 2005, that's the impression you're leaving — every
              single time.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build My Professional Signature — Free
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <p className="mt-3 text-sm text-muted">No account needed.</p>
          </div>

          {/* Intro */}
          <section className="mb-16">
            <p className="text-muted leading-relaxed mb-4 text-lg">
              If you send 40 emails a day — which is low for most professionals —
              that's roughly 10,000 emails a year. Every single one of those
              carries your signature. That's 10,000 impressions from one tiny
              block of HTML at the bottom of your messages.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Most people have never thought about their signature beyond typing
              their name and phone number into the settings box. The result is
              usually a plain-text list that looks like it belongs in 2005, or
              (worse) an over-designed mess with multiple fonts, a motivational
              quote, and an animated GIF.
            </p>
            <p className="text-muted leading-relaxed">
              A genuinely professional signature is neither of those things. It's
              brief, well-designed, and consistent. It gives the recipient
              exactly the information they need and no more. This guide covers
              what that looks like in practice, across different industries and
              roles.
            </p>
          </section>

          {/* Anatomy */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              The anatomy of a professional email signature
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Let's break down each element — what it is, whether you need it,
              and what it should look like.
            </p>

            <div className="space-y-5">
              {[
                {
                  element: "Full name",
                  verdict: "Always include",
                  detail:
                    "Use the name you go by professionally. If your legal name is difficult to pronounce, it's fine to include a phonetic spelling in parentheses or to use your preferred name. Bold it so it reads as the primary identifier.",
                },
                {
                  element: "Job title",
                  verdict: "Almost always include",
                  detail:
                    "Keep it concise and accurate. 'Senior Product Designer' is good. 'Senior Product Designer & Brand Strategist & Design Lead' is too long. Pick the one that matters most in the context of who you're emailing.",
                },
                {
                  element: "Company name",
                  verdict: "Include for external email",
                  detail:
                    "If you're emailing people outside your organization, your company name is essential context. For internal emails, it's redundant — your colleagues know where you work.",
                },
                {
                  element: "Phone number",
                  verdict: "Include if people call you",
                  detail:
                    "One number, formatted consistently. If you have a direct line and a mobile, pick the one you actually answer. Two phone numbers adds length without adding much value for most professionals. Real estate, sales, and support roles are exceptions — include both.",
                },
                {
                  element: "Website / portfolio",
                  verdict: "Include if it's polished",
                  detail:
                    "A link to your company website or personal portfolio is worth including. Check before adding it — if the site hasn't been updated in two years, that link does more harm than good.",
                },
                {
                  element: "Headshot or logo",
                  verdict: "Context-dependent",
                  detail:
                    "Covered in detail in the photo section below. Short version: use a headshot in relationship-driven roles; use a logo for brand-forward businesses.",
                },
                {
                  element: "Social media links",
                  verdict: "One or two, maximum",
                  detail:
                    "LinkedIn is almost always appropriate. Add a second one (Twitter/X, GitHub, Dribbble) only if it's relevant to your professional work and actually maintained.",
                },
                {
                  element: "Call to action",
                  verdict: "Optional but effective in sales/consultancy",
                  detail:
                    "A single, specific CTA — 'Book a 20-minute call' with a Calendly link, or 'See our latest case studies' — can be effective in contexts where you're building a pipeline. Skip it in internal emails and operational roles.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{item.element}</h3>
                    <span className="text-xs font-medium text-primary bg-blue-50 px-2 py-0.5 rounded-full">
                      {item.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Examples by industry */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Professional email signature examples by industry
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              What looks right varies by field. Here's what I'd recommend for
              six different roles, keeping in mind that these are starting
              points — adapt them to your own context.
            </p>

            <div className="space-y-8">

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Lawyer / attorney
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed">
                  <div className="text-foreground font-bold">Sarah Chen</div>
                  <div className="text-muted">Associate Attorney | Chen &amp; Associates LLP</div>
                  <div className="text-muted">T: +1 (212) 555-0134</div>
                  <div className="text-primary">sarah.chen@chenassociates.com</div>
                  <div className="mt-2 text-xs text-muted italic">
                    This email and any attachments are confidential and may be
                    legally privileged...
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Legal signatures usually need a confidentiality disclaimer. Keep
                  everything else minimal — lawyers email a lot, and no one reads
                  a long signature. Bar number is sometimes included depending on
                  jurisdiction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Marketing manager
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed">
                  <div className="text-foreground font-bold">Marcus Webb</div>
                  <div className="text-muted">Marketing Manager | Fieldstone Media</div>
                  <div className="text-muted">fieldstone.co | LinkedIn</div>
                  <div className="text-primary text-xs mt-2">📅 Book a call →</div>
                </div>
                <p className="mt-2 text-sm text-muted">
                  A CTA works well here — marketers often want to drive action.
                  Include a direct link to your LinkedIn profile (not just the
                  LinkedIn logo). See our{" "}
                  <Link href="/email-signature-for-business" className="text-primary underline underline-offset-2">
                    business email signature guide
                  </Link>{" "}
                  for more on corporate context.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Software developer
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed">
                  <div className="text-foreground font-bold">Priya Nair</div>
                  <div className="text-muted">Senior Backend Engineer | Lumio</div>
                  <div className="text-primary">github.com/priya-nair | priya@lumio.io</div>
                </div>
                <p className="mt-2 text-sm text-muted">
                  In technical roles, a GitHub link is worth more than a phone
                  number. Keep it very short — developers often email other
                  developers who don't want to wade through a long signature.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Real estate agent
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed">
                  <div className="text-foreground font-bold">James Ortega</div>
                  <div className="text-muted">Realtor® | Compass | License #DRE 01234567</div>
                  <div className="text-muted">M: +1 (310) 555-0187 | O: +1 (310) 555-0100</div>
                  <div className="text-primary">jamesortega.compass.com</div>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Real estate is one of the few cases where two phone numbers
                  make sense. License number is legally required in most US
                  states. See the full{" "}
                  <Link href="/email-signature-for-real-estate" className="text-primary underline underline-offset-2">
                    real estate email signature guide
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  CEO / founder
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed">
                  <div className="text-foreground font-bold">Elena Vasquez</div>
                  <div className="text-muted">CEO | Archway Software</div>
                  <div className="text-primary">archway.io</div>
                </div>
                <p className="mt-2 text-sm text-muted">
                  CEOs can get away with minimal signatures precisely because
                  of the title. A company website link is usually sufficient.
                  The brevity is itself a signal of someone who values their
                  time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Student
                </h3>
                <div className="rounded-xl border-l-4 border-primary bg-surface p-5 font-mono text-sm leading-relaxed">
                  <div className="text-foreground font-bold">Tom Lindqvist</div>
                  <div className="text-muted">BSc Computer Science (Expected May 2027)</div>
                  <div className="text-muted">University of Michigan</div>
                  <div className="text-primary">linkedin.com/in/tomlindqvist</div>
                </div>
                <p className="mt-2 text-sm text-muted">
                  A graduation year gives context without being too specific.
                  LinkedIn is worth including if the profile is complete. See the{" "}
                  <Link href="/email-signature-for-students" className="text-primary underline underline-offset-2">
                    student email signature guide
                  </Link>{" "}
                  for more detail.
                </p>
              </div>

            </div>
          </section>

          {/* Common mistakes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Common mistakes that make signatures look unprofessional
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              I've seen all of these in the wild. Some regularly. Here's what
              to avoid and why.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Comic Sans, Papyrus, or novelty fonts",
                  detail:
                    "This is the most immediate way to undermine an otherwise professional email. Stick to Arial, Verdana, Georgia, or Trebuchet MS. Not because these are exciting fonts — because they render consistently across every email client.",
                },
                {
                  title: "Too many colors",
                  detail:
                    "One primary color and black text. Maybe one accent. Three or more colors looks like a flyer, not a business communication. Your company's brand color is the right choice for accents.",
                },
                {
                  title: "A huge logo",
                  detail:
                    "Logos that are 400px wide and 200px tall dominate the signature and make it look like an advertisement. A logo width of 120–150px is appropriate for most signatures. See the full{' '}email signature with logo guide for exact sizing recommendations.",
                },
                {
                  title: "Inspirational quotes",
                  detail:
                    '"The best way to predict the future is to create it." No. Just no. These don\'t land the way people think they do. They add length and inject personal opinions into professional communication where they don\'t belong.',
                },
                {
                  title: "Animated GIFs",
                  detail:
                    "Animated GIFs in email signatures were briefly fashionable around 2013. They are a distraction and they add significant file size to every email you send. Avoid.",
                },
                {
                  title: "Too much information",
                  detail:
                    "Three phone numbers, four social media links, a mailing address, an office address, a fax number, and a Skype handle is not a signature — it's a contact form. Ruthlessly cut anything you don't actively use.",
                },
                {
                  title: "Broken or placeholder images",
                  detail:
                    "A missing logo or broken headshot image — showing a gray box or a broken-image icon — is worse than no image at all. If you're hosting images yourself, make sure the URL is stable and the image is actually there.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-red-100 bg-red-50 p-5"
                >
                  <span className="text-red-500 text-lg font-bold flex-shrink-0 mt-0.5">
                    ✗
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Photo section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The right photo for your professional signature
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              If you decide a headshot is right for your context, here's what
              makes one work versus what makes it awkward.
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="font-semibold text-foreground mb-3">What works</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Square crop, ideally 80×80px displayed size
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Plain or blurred background — not a crowded office
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Face taking up 60–70% of the frame
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Natural expression — not stiff, not grinning
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Match your LinkedIn photo for consistency
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                <h3 className="font-semibold text-foreground mb-3">What doesn't work</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Casual photos (at a party, on holiday, with a pet)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Cropped group photos where you can see part of someone else
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Images over 200KB (slows email loading noticeably)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    JPEGs with heavy compression artifacts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Cartoons, illustrations, or avatars in a professional context
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              For Outlook specifically: upload your photo at 2× the display
              size (so 160×160px for an 80×80px display), then constrain it
              with HTML width and height attributes. This keeps it sharp on
              retina screens. The{" "}
              <Link href="/email-signature-design" className="text-primary underline underline-offset-2">
                email signature design guide
              </Link>{" "}
              has the exact pixel dimensions.
            </p>
          </section>

          {/* Color and font */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Color and font choices that actually work
            </h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">Fonts</h3>
            <p className="text-muted leading-relaxed mb-4">
              Only use web-safe fonts. That means: Arial, Verdana, Trebuchet MS,
              Georgia, or Times New Roman. That's effectively your list.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Custom fonts (including Google Fonts) don't reliably load in email
              clients. When a custom font doesn't load, the client substitutes
              a system default — often with different letter-spacing and sizing
              that breaks your carefully laid-out signature. Arial is boring.
              It also works everywhere. That's why you use it. See the full
              explanation in the{" "}
              <Link href="/email-signature-design" className="text-primary underline underline-offset-2">
                email signature design guide
              </Link>
              .
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Colors</h3>
            <p className="text-muted leading-relaxed mb-4">
              Two colors maximum: your primary brand color for accents (links,
              dividers, your name if you want it styled), and black or dark
              gray (#0f172a or #334155) for body text. Using more than two
              colors makes the signature feel like a promotional flyer.
            </p>
            <div className="rounded-xl border border-border bg-surface p-5 mb-4">
              <h4 className="font-semibold text-foreground mb-3 text-sm">
                Safe color combinations
              </h4>
              <div className="space-y-2 text-sm text-muted">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-[#2563eb] flex-shrink-0" />
                  <span>Name in #2563eb (blue), body text in #0f172a (near-black)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-[#16a34a] flex-shrink-0" />
                  <span>Accents in #16a34a (green), body text in #111827 (near-black)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-[#64748b] flex-shrink-0" />
                  <span>Monochrome: name in #0f172a (black), title/details in #64748b (slate-500)</span>
                </div>
              </div>
            </div>
            <p className="text-muted leading-relaxed text-sm">
              If you're at a company with defined brand colors, match those
              exactly. A hex code that's off by a few values will be noticeable
              to anyone who knows the brand.
            </p>
          </section>

          {/* How to create */}
          <section className="mb-16 rounded-xl bg-surface border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to create your professional signature
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              The fastest way is to use the{" "}
              <Link href="/email-signature-maker" className="text-primary underline underline-offset-2">
                NeatStamp email signature maker
              </Link>
              . Fill in your details, pick a template, copy the HTML. No
              account needed, no watermarks, and the output works in Gmail,
              Outlook, and Apple Mail.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Once you have the HTML, follow the installation guide for your
              email client:{" "}
              <Link href="/email-signature-gmail" className="text-primary underline underline-offset-2">
                Gmail
              </Link>
              ,{" "}
              <Link href="/email-signature-outlook" className="text-primary underline underline-offset-2">
                Outlook
              </Link>
              ,{" "}
              <Link href="/email-signature-outlook-365" className="text-primary underline underline-offset-2">
                Outlook 365
              </Link>
              , or{" "}
              <Link href="/email-signature-apple-mail" className="text-primary underline underline-offset-2">
                Apple Mail
              </Link>
              .
            </p>
            <Link
              href="/editor"
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow hover:bg-primary-dark transition-all"
            >
              Open the editor
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/email-signature-maker",
                  title: "Email Signature Maker",
                  desc: "Build your signature in 60 seconds. No account required.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Design principles, templates, typography, and mobile rendering.",
                },
                {
                  href: "/email-signature-for-business",
                  title: "Email Signature for Business",
                  desc: "Brand consistency and what corporate signatures need.",
                },
                {
                  href: "/email-signature-for-freelancers",
                  title: "Email Signature for Freelancers",
                  desc: "How to make your signature work as a soft sales tool.",
                },
                {
                  href: "/email-signature-for-students",
                  title: "Email Signature for Students",
                  desc: "Minimal and professional — what to include when you're starting out.",
                },
                {
                  href: "/email-signature-with-logo",
                  title: "Email Signature with Logo",
                  desc: "Adding a company logo without breaking the layout.",
                },
                {
                  href: "/email-signature-examples-with-logo",
                  title: "Email Signature Examples with Logo",
                  desc: "Real examples across different industries.",
                },
                {
                  href: "/small-business-email-signature",
                  title: "Small Business Email Signature",
                  desc: "What works for small teams and solo operators.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-border bg-surface p-4 hover:border-primary hover:bg-white transition-colors"
                >
                  <div className="font-semibold text-foreground text-sm">
                    {link.title}
                  </div>
                  <div className="mt-1 text-xs text-muted">{link.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-semibold text-foreground">
                    {faq.q}
                    <svg
                      className="h-5 w-5 text-muted transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
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
                  <p className="px-6 pb-5 text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary p-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Build your professional signature today
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Free. No account needed. Works in Gmail, Outlook, Apple Mail,
              and more. Your signature is yours — no watermarks.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create My Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
