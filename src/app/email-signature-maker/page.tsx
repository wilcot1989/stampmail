import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Free Email Signature Maker — No Signup, Ready in 60 Seconds | NeatStamp",
  description:
    "Create a professional email signature in under a minute. NeatStamp is free, requires no account, and works in Gmail, Outlook, Apple Mail and more. No watermarks, no hidden fees.",
  alternates: { canonical: "https://neatstamp.com/email-signature-maker" },
};

const faqs = [
  {
    q: "Is NeatStamp really free?",
    a: "Yes — completely. There's no paid tier, no watermark on free signatures, and no account required. You fill in your details, pick a template, copy the HTML, and you're done. That's it.",
  },
  {
    q: "Do I need to create an account to use the email signature maker?",
    a: "No. You can build and copy your signature without ever logging in. If you want to save it and come back later, you can create a free account, but it's entirely optional.",
  },
  {
    q: "Which email clients does NeatStamp work with?",
    a: "Gmail, Outlook (desktop and 365), Apple Mail, Yahoo Mail, Thunderbird, and most other HTML-based clients. The HTML NeatStamp generates is table-based, which is the only format that renders reliably across all of them.",
  },
  {
    q: "Can I add a photo to my email signature?",
    a: "Yes. Upload a headshot or logo directly in the editor. We recommend a square image at 80×80px for headshots and keeping logo files under 100KB so they don't slow down email loading.",
  },
  {
    q: "What makes a good email signature maker vs a bad one?",
    a: "The output needs to render correctly in Outlook, which is notoriously strict about HTML. Most tools generate clean HTML in the preview but produce broken layouts in Outlook because they use CSS floats or flexbox — both of which Outlook ignores. Good makers use table-based HTML. NeatStamp does.",
  },
  {
    q: "How many signatures can I create?",
    a: "As many as you like. There's no cap on the number of signatures you can build and copy.",
  },
  {
    q: "Can I use NeatStamp for my whole team?",
    a: "Absolutely. Each team member can use the tool independently. If you need centralized control and brand consistency across a large organization, that's typically when paid enterprise tools like Exclaimer are worth considering.",
  },
  {
    q: "Do the signatures include NeatStamp branding?",
    a: "No. Your signature is yours. There's no 'Made with NeatStamp' footer or any watermark, even on free signatures.",
  },
];

export default function EmailSignatureMakerPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature Maker",
            url: "https://neatstamp.com/email-signature-maker",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Free Email Signature Maker
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              No signup. No watermark. No credit card. Build a{" "}
              <Link href="/professional-email-signature" className="text-primary underline underline-offset-2">
                professional email signature
              </Link>{" "}
              in about 60 seconds and copy it straight into Gmail, Outlook, or
              wherever you send email.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Make My Free Signature
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
            <p className="mt-3 text-sm text-muted">
              Takes about 60 seconds. No account needed.
            </p>
          </div>

          {/* What is an email signature maker */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What is an email signature maker, and do you actually need one?
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              An email signature maker is a tool that lets you build an HTML
              email signature through a visual interface — you fill in your
              name, title, phone number, and links, pick a design, and the tool
              generates the underlying HTML for you. Then you paste that HTML
              into your email client's signature settings.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The reason you need a dedicated tool (rather than just typing your
              details into the signature box in Gmail) is that email clients
              render HTML in a very specific, limited way. CSS that works on a
              website will often break inside Outlook. A maker that knows its
              craft generates table-based HTML that holds together across every
              major client.
            </p>
            <p className="text-muted leading-relaxed">
              The thing most people get wrong is assuming any tool will do.
              In my experience, half the "free" makers online produce beautiful
              previews and then broken layouts the moment you paste them into
              Outlook. That's why compatibility with Outlook specifically is the
              single most important thing to check.
            </p>
          </section>

          {/* What to look for */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              What to look for in an email signature maker
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              I've evaluated a lot of these tools. Here's what actually matters:
            </p>
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  1. Outlook compatibility (non-negotiable)
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Outlook Desktop uses the Word rendering engine, which ignores
                  CSS flexbox, grid, and floats. Your signature needs to be
                  built with HTML tables. If a tool doesn't mention Outlook
                  compatibility, test it before committing. Paste the signature
                  into Outlook and send yourself a test email.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2. Actually free vs. free-ish
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  A lot of tools call themselves free but add a watermark unless
                  you pay. Others let you design for free but charge to
                  download. Check the pricing page before you spend 20 minutes
                  building something. We cover this in detail in the{" "}
                  <Link href="#free-vs-paid" className="text-primary underline underline-offset-2">
                    free vs. paid section below
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  3. Design quality
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  Templates should look clean at the sizes email actually
                  uses — typically a max width of 500–600px. Avoid any tool
                  whose templates look cluttered or use more than two or three
                  colors. You want something that looks deliberate, not
                  busy. See our{" "}
                  <Link href="/email-signature-design" className="text-primary underline underline-offset-2">
                    email signature design guide
                  </Link>{" "}
                  for more on what "clean" actually means in practice.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4. Ease of use
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  You should be able to go from blank to finished in under two
                  minutes. If a tool requires you to set up a brand kit, confirm
                  an email, or watch an onboarding video before you can touch
                  the editor, that's a red flag for how the rest of the
                  experience will go.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  5. Photo and logo support
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  The ability to add a{" "}
                  <Link href="/email-signature-with-logo" className="text-primary underline underline-offset-2">
                    company logo
                  </Link>{" "}
                  or headshot matters for most professionals. Check whether the
                  tool hosts the image for you (simpler) or requires you to
                  host it yourself. Self-hosted images can break if you change
                  the file location.
                </p>
              </div>
            </div>
          </section>

          {/* How to make your signature in 5 steps */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              How to make your email signature in 5 steps (using NeatStamp)
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Here's the exact process. The whole thing takes about a minute.
            </p>
            <div className="space-y-6">
              {[
                {
                  title: "Open the editor",
                  body: (
                    <>
                      Go to the{" "}
                      <Link href="/editor" className="text-primary underline underline-offset-2">
                        NeatStamp editor
                      </Link>
                      . No account required. You'll see the form on the left and
                      a live preview on the right that updates as you type.
                    </>
                  ),
                },
                {
                  title: "Fill in your details",
                  body: "Enter your name, job title, company, phone number, and website. Each field is optional — only add what you actually want in the signature. Less is usually more.",
                },
                {
                  title: "Upload a photo or logo (optional)",
                  body: "If you want a headshot or company logo, upload it here. For headshots, a square image around 80×80px works well. For logos, aim for a width of 120–150px and a transparent PNG background so it works on any email theme.",
                },
                {
                  title: "Pick a template",
                  body: (
                    <>
                      Browse the available{" "}
                      <Link href="/templates" className="text-primary underline underline-offset-2">
                        signature templates
                      </Link>
                      . Each one is designed to render correctly in Outlook.
                      Pick the one that fits your context — minimal for a
                      consultant, slightly more structured for a sales role with
                      a CTA, logo-forward for a brand-focused role.
                    </>
                  ),
                },
                {
                  title: "Copy and paste into your email client",
                  body: (
                    <>
                      Hit the Copy button to copy the HTML. Then paste it into
                      your email client's signature settings. We have step-by-step
                      instructions for{" "}
                      <Link href="/email-signature-gmail" className="text-primary underline underline-offset-2">
                        Gmail
                      </Link>
                      ,{" "}
                      <Link href="/email-signature-outlook" className="text-primary underline underline-offset-2">
                        Outlook
                      </Link>
                      , and{" "}
                      <Link href="/email-signature-apple-mail" className="text-primary underline underline-offset-2">
                        Apple Mail
                      </Link>{" "}
                      if you need a walkthrough.
                    </>
                  ),
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Free vs paid */}
          <section id="free-vs-paid" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Free vs. paid email signature makers — an honest comparison
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              I want to be direct here: for the vast majority of people, free
              is completely sufficient. Here's when each actually makes sense.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  When free is enough
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    You're an individual or freelancer managing your own signature
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    You don't need team-wide signature management
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    You want a clean, professional look without custom branding
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    You're a student or someone early in their career
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    You update your signature occasionally, not daily
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  When paid might be worth it
                </h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">→</span>
                    You're managing signatures for 50+ employees
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">→</span>
                    You need signatures to update automatically when an employee
                    changes their title
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">→</span>
                    You want server-side signature injection (appended by the mail
                    server regardless of what the sender does)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">→</span>
                    You need compliance or legal disclaimer management
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-muted leading-relaxed">
              For most people reading this page — individual professionals,
              freelancers, small business owners, students — a free tool does
              everything you need. The paid tools are genuinely solving an IT
              management problem, not a design problem.
            </p>
          </section>

          {/* Why most free makers aren't free */}
          <section className="mb-16 rounded-xl border border-red-100 bg-red-50 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why most "free" email signature makers aren't actually free
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              This is worth calling out directly because it's genuinely
              frustrating. A lot of popular tools advertise themselves as free
              but operate on a bait-and-switch model:
            </p>
            <ul className="space-y-3 text-muted text-sm mb-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                <span>
                  <strong className="text-foreground">Watermark on the signature</strong> — "Powered by [Tool]" in small
                  print at the bottom. You have to pay to remove it.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                <span>
                  <strong className="text-foreground">Free to design, not to download</strong> — You can see your
                  signature but can't copy the HTML without entering a credit
                  card.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                <span>
                  <strong className="text-foreground">Free tier with locked templates</strong> — The nicest designs are
                  Pro-only. You can use the tool for free but only with one
                  basic template.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                <span>
                  <strong className="text-foreground">Free trial, not free forever</strong> — "Free" means 14 days,
                  after which you're charged automatically.
                </span>
              </li>
            </ul>
            <p className="text-muted leading-relaxed">
              NeatStamp doesn't do any of this. No watermark. No paywall. No
              trial. The tool is free because the overhead of running it is low
              enough that we don't need to charge. You can verify this yourself:
              build a signature, copy it, and check the HTML. No hidden code.
            </p>
          </section>

          {/* Email signature maker for different roles */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Email signature maker for different roles
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              What goes in a good signature varies by context. A freelancer has
              different priorities than a corporate employee, and a student has
              different priorities than both.
            </p>
            <div className="space-y-5">
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  <Link href="/email-signature-for-freelancers" className="text-primary hover:underline">
                    Freelancers →
                  </Link>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Your signature is a sales tool. Include your name, what you
                  do (specifically — "UX designer specializing in SaaS
                  onboarding" beats "designer"), your portfolio link, and one
                  clear way to reach you. Keep it short — potential clients
                  won't read a long signature.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  <Link href="/email-signature-for-business" className="text-primary hover:underline">
                    Business / corporate employees →
                  </Link>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Brand consistency matters more here. Use your company's exact
                  brand colors, include the company logo, and match the format
                  your colleagues use. Your{" "}
                  <Link href="/email-signature-with-logo" className="text-primary underline underline-offset-2">
                    logo sizing
                  </Link>{" "}
                  and placement should be uniform across the team.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  <Link href="/email-signature-for-students" className="text-primary hover:underline">
                    Students →
                  </Link>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Keep it minimal but professional. Your name, university,
                  degree program, and expected graduation year is usually
                  enough. Add a LinkedIn if it's polished. Skip the phone
                  number unless you're actively job hunting.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  <Link href="/email-signature-for-real-estate" className="text-primary hover:underline">
                    Real estate agents →
                  </Link>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Phone number is critical — leads need to reach you fast.
                  Include your agency logo, license number (required in most
                  states), and a link to your listings or profile page. A
                  professional headshot builds trust quickly in this industry.
                </p>
              </div>
            </div>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature",
                  desc: "What separates a great signature from an embarrassing one.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Templates, color choices, typography, and mobile rendering.",
                },
                {
                  href: "/email-signature-gmail",
                  title: "Add a Signature in Gmail",
                  desc: "Step-by-step instructions for Gmail's signature settings.",
                },
                {
                  href: "/email-signature-outlook",
                  title: "Add a Signature in Outlook",
                  desc: "Desktop and Outlook 365 — they work differently.",
                },
                {
                  href: "/email-signature-with-logo",
                  title: "Email Signature with Logo",
                  desc: "How to add a company logo without breaking your layout.",
                },
                {
                  href: "/html-email-signature",
                  title: "HTML Email Signature",
                  desc: "Why table-based HTML is the only safe option.",
                },
                {
                  href: "/best-email-signature-generator",
                  title: "Best Email Signature Generators",
                  desc: "An honest comparison of the tools available.",
                },
                {
                  href: "/email-signature-examples-with-logo",
                  title: "Email Signature Examples with Logo",
                  desc: "Real examples showing what works and what doesn't.",
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
              Ready to make your signature?
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Takes about 60 seconds. No account. No credit card. No watermark.
              Works in Gmail, Outlook, Apple Mail, and more.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create My Free Signature
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
