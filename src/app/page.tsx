import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Email Signature Generator | NeatStamp — Actually Free, No Signup",
  description:
    "Create a professional email signature in 60 seconds. Free forever — no account, no credit card, no paywall. Works in Gmail, Outlook, Apple Mail & 30+ email clients. Outlook-proof guaranteed.",
  alternates: { canonical: "https://neatstamp.com" },
};

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

const TRUSTED_CLIENTS = [
  "Gmail", "Outlook", "Apple Mail", "Yahoo Mail",
  "Thunderbird", "Outlook Mobile", "Samsung Mail", "Spark",
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
            Actually free — no credit card, no account
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Professional Email Signatures
            <span className="text-primary"> in 60 Seconds</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            Create beautiful, Outlook-proof email signatures for free.
            No signup. No paywall. No nonsense. Just paste and go.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/editor"
              className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all hover:shadow-xl"
            >
              Create Your Signature — Free
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <span className="text-sm text-muted">
              No account needed. Ready in 60 seconds.
            </span>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {TRUSTED_CLIENTS.map((client) => (
              <span
                key={client}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted shadow-sm border border-border"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Three Steps. 60 Seconds. Done.
            </h2>
            <p className="mt-4 text-lg text-muted">
              No account. No learning curve. No BS.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter Your Details",
                description:
                  "Name, title, email, phone, socials. Just fill in what you want to show.",
              },
              {
                step: "2",
                title: "Pick a Design",
                description:
                  "Choose from 5 free templates. Customize colors to match your brand.",
              },
              {
                step: "3",
                title: "Copy & Paste",
                description:
                  "One click to copy. Paste into Gmail, Outlook, or any email client. Done.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/editor"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              Start Creating — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      {/* WHY NEATSTAMP */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why NeatStamp?
            </h2>
            <p className="mt-4 text-lg text-muted">
              Built to fix everything wrong with email signature generators.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Actually Free",
                description:
                  "No account needed. No credit card. No sneaky paywall after you've spent 20 minutes designing. The free tier is genuinely free.",
                icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Outlook-Proof",
                description:
                  "Built with table-based HTML and inline CSS. Your signature looks perfect in Outlook, Gmail, Apple Mail, Yahoo, and 30+ email clients.",
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
              },
              {
                title: "Privacy-First",
                description:
                  "Your data stays in your browser. We don't store your name, email, phone, or photo on any server. No tracking. No data collection.",
                icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
              },
              {
                title: "60-Second Setup",
                description:
                  "Three steps: fill in your details, pick a design, copy and paste. No onboarding wizard. No account creation. No tutorial needed.",
                icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Mobile Responsive",
                description:
                  "Your signature looks great on desktop and mobile. No broken layouts on phones — ever.",
                icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
              },
              {
                title: "Cancel Anytime",
                description:
                  "No subscription traps. Cancel Pro in 2 clicks. 30-day money-back guarantee. The free tier never expires.",
                icon: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-white p-6 shadow-sm border border-border"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              NeatStamp vs. the Competition
            </h2>
            <p className="mt-4 text-lg text-muted">
              See why professionals are switching.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 text-left font-medium text-muted">Feature</th>
                  <th className="py-3 text-center font-semibold text-primary">NeatStamp</th>
                  <th className="py-3 text-center font-medium text-muted">WiseStamp</th>
                  <th className="py-3 text-center font-medium text-muted">MySignature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { feature: "Free tier (no catch)", us: true, wise: false, my: false },
                  { feature: "No account required", us: true, wise: false, my: false },
                  { feature: "Outlook-proof guaranteed", us: true, wise: false, my: false },
                  { feature: "Privacy-first (client-side)", us: true, wise: false, my: false },
                  { feature: "Cancel in 2 clicks", us: true, wise: false, my: true },
                  { feature: "Multiple templates", us: true, wise: true, my: true },
                  { feature: "Social media links", us: true, wise: true, my: true },
                  { feature: "Mobile responsive", us: true, wise: false, my: false },
                  { feature: "Free price", us: "$0", wise: "$0*", my: "$0*" },
                  { feature: "Pro price", us: "$5/mo", wise: "$6-10/mo", my: "$4-8/mo" },
                ].map((row) => (
                  <tr key={row.feature}>
                    <td className="py-3 text-foreground">{row.feature}</td>
                    <td className="py-3 text-center">
                      {typeof row.us === "boolean" ? (
                        row.us ? <span className="inline-flex justify-center"><CheckIcon /></span> : <span className="inline-flex justify-center"><XIcon /></span>
                      ) : (
                        <span className="font-semibold text-primary">{row.us}</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {typeof row.wise === "boolean" ? (
                        row.wise ? <span className="inline-flex justify-center"><CheckIcon /></span> : <span className="inline-flex justify-center"><XIcon /></span>
                      ) : (
                        <span className="text-muted">{row.wise}</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {typeof row.my === "boolean" ? (
                        row.my ? <span className="inline-flex justify-center"><CheckIcon /></span> : <span className="inline-flex justify-center"><XIcon /></span>
                      ) : (
                        <span className="text-muted">{row.my}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-muted">* Advertised as free but requires payment for essential features like PDF export or premium templates.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / SOCIAL PROOF PLACEHOLDER */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Works With Every Email Client
          </h2>
          <p className="mt-4 text-lg text-muted">
            Tested and verified in 30+ email clients. Your signature will look perfect everywhere.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {TRUSTED_CLIENTS.map((client) => (
              <div
                key={client}
                className="rounded-lg bg-white p-4 text-center shadow-sm border border-border"
              >
                <p className="text-sm font-medium text-foreground">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - SEO RICH */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center sm:text-4xl mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is NeatStamp really free?",
                a: "Yes. The free tier lets you create a professional email signature with 5 templates, custom colors, social media links, and photo upload. No account required, no credit card needed, no time limit. The free tier is truly free — forever.",
              },
              {
                q: "Will my signature work in Outlook?",
                a: "Yes. NeatStamp signatures are built with table-based HTML and inline CSS — the gold standard for email client compatibility. Your signature is guaranteed to look correct in Outlook (desktop, web, and mobile), Gmail, Apple Mail, Yahoo Mail, Thunderbird, and 30+ other email clients.",
              },
              {
                q: "Do you store my personal data?",
                a: "No. The free version runs entirely in your browser. Your name, email, phone number, and photo never leave your device. We don't track you, we don't store your data, and we don't sell anything to third parties.",
              },
              {
                q: "How do I add the signature to my email?",
                a: "Click 'Copy Signature', then paste it into your email client's signature settings. For Gmail: Settings → See all settings → Signature → Paste. For Outlook: File → Options → Mail → Signatures → Paste. For Apple Mail: Preferences → Signatures → Paste.",
              },
              {
                q: "What's included in the Pro plan?",
                a: "Pro ($5/month) adds 15+ premium templates, Calendly booking buttons, CTA banners, multiple signatures, click analytics, and the ability to save your signatures. You can cancel anytime in 2 clicks with a 30-day money-back guarantee.",
              },
              {
                q: "Can I use NeatStamp for my team?",
                a: "Yes. The Team plan ($3/user/month, minimum 5 users) lets you manage signatures centrally, enforce brand guidelines, and deploy signatures to your entire team. Perfect for small businesses that want consistent email branding.",
              },
              {
                q: "What makes NeatStamp different from WiseStamp or MySignature?",
                a: "NeatStamp is genuinely free (no paywall tricks), privacy-first (no data stored), and Outlook-proof (guaranteed to work in all email clients). We also offer easy cancellation (2 clicks) and a 30-day money-back guarantee. Our competitors have 53% 1-star reviews on Trustpilot for subscription traps — we do things differently.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg border border-border bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-semibold text-foreground">
                  {faq.q}
                  <svg className="h-5 w-5 text-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="px-6 pb-4 text-sm text-muted leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Make a Great Impression?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of professionals who use NeatStamp.
            Free forever. No account needed.
          </p>
          <Link
            href="/editor"
            className="mt-8 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
          >
            Create Your Free Signature
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
