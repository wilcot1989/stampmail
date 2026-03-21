import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "How to Cancel Your WiseStamp Subscription (2026)",
  description:
    "Step-by-step guide to cancelling WiseStamp. What to do when there's no cancel button, support ignores you, and what alternatives exist.",
  alternates: {
    canonical: "https://neatstamp.com/blog/cancel-wisestamp-subscription",
  },
};

const faqs = [
  {
    q: "Can I get a refund after cancelling WiseStamp?",
    a: "WiseStamp's terms state that subscriptions are non-refundable. However, if you were charged after attempting to cancel and have documentation (screenshots, email timestamps), you have a stronger case for a chargeback via your card issuer or PayPal. Many users have succeeded this way when WiseStamp's support didn't respond.",
  },
  {
    q: "Does WiseStamp automatically renew?",
    a: "Yes. WiseStamp subscriptions renew automatically unless you cancel before the renewal date. You'll receive a renewal reminder email — that's usually the trigger for people discovering they can't find a cancel button. Cancel at least 3 days before your renewal date to be safe.",
  },
  {
    q: "What happens to my signatures after I cancel WiseStamp?",
    a: "After cancellation, your WiseStamp account reverts to the free tier. Signatures you've built are still accessible but some features (custom fonts, banners, team management) may be locked. The signatures already installed in Gmail or Outlook continue to work — they're saved in those email clients, not hosted live by WiseStamp.",
  },
  {
    q: "Is there a phone number to cancel WiseStamp?",
    a: "WiseStamp does not publish a customer support phone number. All cancellation and support is handled through their web portal, email support, and live chat (when available). If you can't get a response via those channels, contact your card issuer.",
  },
  {
    q: "How do I export my WiseStamp signatures before cancelling?",
    a: "In WiseStamp, open the signature you want to save, go to the HTML tab (if available on your plan), and copy the HTML. Alternatively, take a screenshot of the rendered signature. This lets you recreate it elsewhere. WiseStamp doesn't currently offer a bulk export feature.",
  },
];

export default function CancelWisestampSubscriptionPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "How to Cancel WiseStamp",
            url: "https://neatstamp.com/blog/cancel-wisestamp-subscription",
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
            <span className="text-slate-700">Cancel WiseStamp Subscription</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                  How-To Guide
                </span>
                <span className="text-sm text-slate-400">9 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                How to Cancel Your WiseStamp Subscription (And What To Do When It Doesn&rsquo;t Work)
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Cancelling WiseStamp should be simple. For a lot of people, it isn&rsquo;t. This guide
                walks you through every step — including what to do when the cancel button is missing,
                support doesn&rsquo;t respond, and you need to escalate to your bank.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 9 min read
              </p>
            </header>

            {/* Note box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-10">
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">A note on this guide:</span> We&rsquo;re
                NeatStamp, a WiseStamp alternative. We have an obvious interest in you switching.
                But this page exists because WiseStamp genuinely has a cancellation problem — 53% of
                their Trustpilot reviews are 1-star, and the most common complaint is about billing
                and cancellation. We&rsquo;ve written this to actually help you cancel, not just to
                criticize a competitor. If you want to stay with WiseStamp after reading this, that&rsquo;s
                fine.
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#how-to-cancel", "How to cancel WiseStamp (standard process)"],
                  ["#common-problems", "Common problems during cancellation"],
                  ["#support-ignores", "What to do if support ignores you"],
                  ["#chargeback", "Disputing a charge with your bank"],
                  ["#before-you-leave", "Before you leave: export your signatures"],
                  ["#alternatives", "Alternatives to WiseStamp"],
                  ["#neatstamp-policy", "NeatStamp's cancellation policy"],
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
            <section id="how-to-cancel" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to cancel WiseStamp (standard process)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                When the process works correctly, cancellation goes like this. If you hit problems,
                skip to the next section.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  {
                    step: "1",
                    title: "Log in to your WiseStamp account",
                    body: "Go to wisestamp.com and log in. Make sure you're logged in to the correct account — if you have multiple email addresses, try each one. WiseStamp sometimes creates duplicate accounts when users log in with Google vs. with email/password.",
                  },
                  {
                    step: "2",
                    title: "Go to Account Settings",
                    body: "Click your profile avatar or name in the top right corner. Select 'Account Settings' or 'My Account' from the dropdown. If you don't see a dropdown, look for a settings gear icon.",
                  },
                  {
                    step: "3",
                    title: "Find the Billing or Subscription section",
                    body: "Inside Account Settings, look for a tab or section labelled 'Billing', 'Subscription', or 'Plan'. This is where your current plan and renewal date should be shown.",
                  },
                  {
                    step: "4",
                    title: "Click 'Cancel Plan' or 'Downgrade'",
                    body: "The button may be labelled 'Cancel Plan', 'Cancel Subscription', 'Downgrade to Free', or similar. WiseStamp has changed their UI multiple times, so the exact label may differ. If you see a 'Manage Subscription' button, click that — the cancel option is usually inside it.",
                  },
                  {
                    step: "5",
                    title: "Confirm cancellation and save a record",
                    body: "WiseStamp will likely show a retention offer (a discount to stay). You can decline it. After confirming cancellation, take a screenshot of the confirmation screen and note the date and time. If you receive a cancellation confirmation email, save it.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">Cancel before your renewal date</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  WiseStamp processes renewals automatically. If you cancel on your renewal day, you
                  may already have been charged. Check your renewal date in the Billing section and
                  cancel at least 3 days in advance.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="common-problems" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Common problems during cancellation
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Based on WiseStamp&rsquo;s Trustpilot reviews — which as of early 2026 are 53% one-star —
                these are the problems people hit most often.
              </p>

              <div className="space-y-5">
                {[
                  {
                    problem: "No cancel button visible",
                    detail: "This is the most commonly reported issue. WiseStamp has been known to hide the cancellation option or require you to navigate through several screens to reach it. Try accessing your account settings directly at wisestamp.com/app/#/account. If that doesn't work, try clearing your browser cache, using an incognito window, or trying a different browser. The UI seems to behave differently depending on your account type and plan.",
                  },
                  {
                    problem: "The cancel button is greyed out or unclickable",
                    detail: "Some users report the cancel button appearing but being non-functional. This has been attributed to browser extensions (particularly ad blockers) interfering with WiseStamp's UI. Try disabling extensions and reloading the page before attempting cancellation.",
                  },
                  {
                    problem: "Charged after attempting to cancel",
                    detail: "Multiple Trustpilot reviewers report completing what appeared to be a cancellation flow, only to be charged at the next renewal. This is why the confirmation screenshot matters so much. If you went through a cancellation process but didn't receive a confirmation email within 24 hours, the cancellation may not have processed correctly.",
                  },
                  {
                    problem: "Can't find which email address the account is under",
                    detail: "If you originally signed up with Google ('Sign in with Google'), your account is tied to your Google email address. If you signed up with a different email, the account is under that one. Check both. If you have a recurring charge on your card and can't find the account, check the billing email on your card statement — it usually shows the email address.",
                  },
                  {
                    problem: "Team/Business plan cancellation requires contacting support",
                    detail: "WiseStamp's Team and Business plans sometimes don't have a self-service cancel option. Cancellation requires emailing support. The email address is usually support@wisestamp.com. Document your cancellation request in writing and note the date.",
                  },
                ].map((item) => (
                  <div key={item.problem} className="border border-slate-200 rounded-xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm">{item.problem}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section id="support-ignores" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What to do if support doesn&rsquo;t respond
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;ve emailed support, waited, and heard nothing — or received a non-answer —
                here&rsquo;s how to escalate.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Try every contact channel
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                WiseStamp has multiple support channels. If email isn&rsquo;t working, try:
              </p>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                {[
                  "Live chat on the WiseStamp website (sometimes available during business hours)",
                  "Their support portal if you can access it",
                  "Twitter/X @WiseStamp — public posts often get faster responses than email tickets",
                  "LinkedIn — message their company page or a listed support contact",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to include in your support email
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Make your cancellation request very clear and create a paper trail:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 font-mono text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
{`Subject: Cancellation request — Account [your email address]

I am requesting immediate cancellation of my WiseStamp subscription.

Account email: [your email]
Plan type: [Personal/Team/Business]
Request date: [today's date]

Please confirm cancellation in writing and ensure no further charges
are made to my payment method.

I am keeping a record of this email as evidence of my cancellation request.`}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The 14-day rule for EU/UK customers
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re in the EU or UK, you have a statutory right to cancel a digital subscription
                within 14 days of purchase under the Consumer Rights Directive (EU) or Consumer
                Contracts Regulations (UK). This applies even if WiseStamp&rsquo;s own terms say
                otherwise. If you&rsquo;re within that window and support is unresponsive, you can cite
                this right explicitly in your support email.
              </p>
            </section>

            {/* Section 4 */}
            <section id="chargeback" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Disputing a charge with your bank
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;ve been charged after cancelling — or after attempting to cancel and receiving
                no response — a chargeback with your card issuer or PayPal is a legitimate option.
                Here&rsquo;s how to approach it properly.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What you need to document
              </h3>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                {[
                  "Screenshot of any cancellation confirmation you received",
                  "Date and time you requested cancellation",
                  "Copy of any support emails you sent and any responses (or lack thereof)",
                  "Date of the charge you're disputing",
                  "Statement that you attempted to cancel before the charge",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Chargeback grounds
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The correct dispute reason is typically &ldquo;cancelled subscription&rdquo; or &ldquo;services not
                as described&rdquo;. Most card issuers have an online dispute form. PayPal handles this
                through their Resolution Centre.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Contact your card issuer first — give WiseStamp one final chance to process the
                cancellation and refund before filing the dispute. Some card issuers require you to
                have attempted to resolve it with the merchant first. A documented email exchange
                showing no response is usually sufficient.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">Time limits apply</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Credit card chargeback windows are typically 60–120 days from the charge date,
                  depending on your card issuer and country. Don&rsquo;t wait months before escalating.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="before-you-leave" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Before you leave: export your signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Before you close your WiseStamp account, save your signatures. You&rsquo;ve invested time
                in building them and you may want to recreate them elsewhere.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to save your WiseStamp signature HTML
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  "Open your signature in WiseStamp's editor.",
                  "Look for an 'HTML' tab or 'Get code' option within the editor.",
                  "Copy the entire HTML block and save it in a text file.",
                  "Also take a screenshot of the rendered preview so you have a visual reference.",
                  "Note your signature settings: font name, colors (hex codes if visible), image URLs.",
                ].map((item, i) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-600">
                    <span className="flex-shrink-0 w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs font-semibold text-slate-700">
                      {i + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">
                If the HTML export isn&rsquo;t available on your plan, the screenshot is enough to
                recreate the signature in another tool. Most signature generators —
                including NeatStamp — let you build a matching signature from scratch in
                under 5 minutes if you have a visual reference.
              </p>
            </section>

            {/* Section 6 */}
            <section id="alternatives" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Alternatives to WiseStamp
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re looking for a replacement, here&rsquo;s an honest comparison of the main
                options — including where NeatStamp fits and where it doesn&rsquo;t.
              </p>

              <div className="space-y-5 mb-6">
                {[
                  {
                    name: "NeatStamp",
                    best: "Individuals and small teams who want a clean, fast tool without the complexity",
                    notes: "Free tier available. No credit card to start. One-click Gmail install via Chrome extension. Explicit 1-click cancellation policy. Good Outlook support. Doesn't have WiseStamp's social media feed integrations.",
                    link: "/alternative-to-wisestamp",
                  },
                  {
                    name: "Exclaimer",
                    best: "Large enterprises needing server-side signature management for Microsoft 365",
                    notes: "Very powerful for IT teams deploying signatures at scale. More expensive. Complex to set up for individuals. Good choice if you need Active Directory integration.",
                    link: "/alternative-to-exclaimer",
                  },
                  {
                    name: "Manual HTML",
                    best: "Developers or people who want zero dependency on third-party tools",
                    notes: "Full control. No monthly fee. Takes 30–60 minutes to set up correctly. Requires understanding of HTML table layouts and Gmail's quirks. NeatStamp's editor can generate the HTML for you to use this way.",
                    link: "/html-email-signature",
                  },
                ].map((alt) => (
                  <div key={alt.name} className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">{alt.name}</h3>
                      <span className="text-xs text-slate-500">Best for: {alt.best}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{alt.notes}</p>
                    <Link href={alt.link} className="text-sm text-blue-600 hover:underline font-medium">
                      Learn more &rarr;
                    </Link>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                For a fuller comparison of WiseStamp vs. NeatStamp with specific feature differences,
                see the{" "}
                <Link href="/alternative-to-wisestamp" className="text-blue-600 hover:underline">
                  WiseStamp alternative page
                </Link>
                .
              </p>
            </section>

            {/* Section 7 */}
            <section id="neatstamp-policy" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp&rsquo;s cancellation policy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Because cancellation issues are the primary reason people leave WiseStamp, we want
                to be explicit about how NeatStamp handles this.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-green-900 mb-3">Our policy, plainly stated</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  {[
                    "Cancel anytime from your account settings — one click, no email required, no retention flows.",
                    "Cancellation takes effect immediately. You keep access until the end of your current billing period.",
                    "No dark patterns. The cancel button is in your account settings, clearly labelled.",
                    "We'll send you a confirmation email when you cancel. If you don't get one within 5 minutes, contact us.",
                    "If you were charged in error, contact support and we'll refund it. We don't argue about this.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                We offer a free tier with no time limit — so you can try NeatStamp without a
                credit card, and you won&rsquo;t face an unexpected charge if you forget to cancel a trial.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you want to see what NeatStamp looks like before committing to anything, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  editor
                </Link>{" "}
                is free to use, and you can build and export a complete signature without entering
                payment details. The{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing page
                </Link>{" "}
                lists exactly what each plan includes and excludes, and the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template library
                </Link>{" "}
                is fully accessible on the free tier. For Gmail users, the{" "}
                <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                  Gmail signature guide
                </Link>{" "}
                shows the full installation process, and for Outlook users the{" "}
                <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                  Outlook guide
                </Link>{" "}
                walks through setup step by step. If you manage signatures for a team, see{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  NeatStamp for teams
                </Link>
                {" "}and the{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature page
                </Link>
                .
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
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Looking for a simpler alternative?
              </h2>
              <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                NeatStamp is free to start — no credit card, no complicated cancellation. Build
                a professional signature in about 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Try NeatStamp Free
                </Link>
                <Link
                  href="/alternative-to-wisestamp"
                  className="inline-block px-8 py-3 bg-transparent text-white border border-white/30 font-semibold rounded-lg hover:border-white/60 transition-colors"
                >
                  See WiseStamp vs. NeatStamp
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
