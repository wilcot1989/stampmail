import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Free Email Signature Generator",
  description:
    "NeatStamp pricing: Free forever with 5 templates. Pro at $5/month for premium features. Team at $3/user/month. No hidden fees. 30-day money-back guarantee.",
  alternates: { canonical: "https://neatstamp.com/pricing" },
};

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to create a professional email signature.",
    cta: "Get Started — Free",
    ctaLink: "/editor",
    highlighted: false,
    features: [
      "5 signature templates",
      "Custom colors",
      "Profile photo or logo",
      "Social media links",
      "Phone, email, website",
      "Outlook-proof HTML",
      "One-click copy to clipboard",
      "No account required",
      "No watermark",
      "No time limit",
    ],
  },
  {
    name: "Pro",
    price: "$5",
    period: "/month",
    yearlyPrice: "$39/year (save 35%)",
    description: "For professionals who want more templates and features.",
    cta: "Try Pro Free for 7 Days",
    ctaLink: "/login",
    highlighted: true,
    features: [
      "Everything in Free, plus:",
      "15+ premium templates",
      "Calendly booking button",
      "CTA promotional banner",
      "Multiple signatures",
      "Save signatures to account",
      "Click analytics",
      "Priority support",
      "Remove NeatStamp branding",
      "30-day money-back guarantee",
    ],
  },
  {
    name: "Team",
    price: "$3",
    period: "/user/month",
    description: "Consistent email branding for your entire team.",
    cta: "Start Team Trial",
    ctaLink: "/login",
    highlighted: false,
    features: [
      "Everything in Pro, plus:",
      "Central signature management",
      "Brand guidelines enforcement",
      "Team member invites",
      "Bulk signature deployment",
      "Company-wide templates",
      "Admin dashboard",
      "Usage analytics",
      "Minimum 5 users",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Simple, Honest Pricing
          </h1>
          <p className="mt-4 text-lg text-muted">
            Free forever. Upgrade only if you need more. Cancel in 2 clicks.
          </p>
        </div>

        {/* Social proof bar */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {["bg-blue-400", "bg-green-400", "bg-purple-400", "bg-orange-400", "bg-pink-400"].map((color, i) => (
              <div
                key={i}
                className={`h-9 w-9 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
              >
                {["JR", "SK", "ML", "AT", "CP"][i]}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">Trusted by 2,000+ professionals</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-primary text-white shadow-xl ring-2 ring-primary scale-105"
                  : "bg-white border border-border shadow-sm"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  plan.highlighted ? "text-blue-100" : "text-muted"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-extrabold ${
                    plan.highlighted ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.highlighted ? "text-blue-200" : "text-muted"
                  }`}
                >
                  {plan.period}
                </span>
              </div>
              {plan.yearlyPrice && (
                <p
                  className={`mt-1 text-sm ${
                    plan.highlighted ? "text-blue-200" : "text-muted"
                  }`}
                >
                  {plan.yearlyPrice}
                </p>
              )}
              <p
                className={`mt-4 text-sm ${
                  plan.highlighted ? "text-blue-100" : "text-muted"
                }`}
              >
                {plan.description}
              </p>
              <Link
                href={plan.ctaLink}
                className={`mt-6 block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                {plan.cta}
              </Link>
              {plan.highlighted && (
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <svg className="h-4 w-4 text-blue-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span className="text-xs font-medium text-blue-200">30-day money-back guarantee</span>
                </div>
              )}
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg
                      className={`h-5 w-5 flex-shrink-0 ${
                        plan.highlighted ? "text-blue-200" : "text-green-500"
                      }`}
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
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-blue-100" : "text-muted"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Our Promise
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { title: "No Hidden Fees", desc: "What you see is what you pay" },
              {
                title: "Cancel in 2 Clicks",
                desc: "No emails, no calls, no hoops",
              },
              {
                title: "30-Day Guarantee",
                desc: "Full refund, no questions asked",
              },
            ].map((promise) => (
              <div key={promise.title} className="text-center">
                <CheckIcon />
                <h3 className="mt-2 text-sm font-semibold text-foreground">
                  {promise.title}
                </h3>
                <p className="text-xs text-muted">{promise.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor comparison */}
        <div className="mt-20 mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-foreground mb-8">How We Compare</h2>
          <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="px-5 py-4 text-left font-semibold text-foreground">Tool</th>
                  <th className="px-5 py-4 text-center font-semibold text-foreground">Price</th>
                  <th className="px-5 py-4 text-center font-semibold text-foreground">Free tier</th>
                  <th className="px-5 py-4 text-center font-semibold text-foreground">No watermark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "NeatStamp", price: "$0–$5/mo", free: true, noMark: true, highlight: true },
                  { name: "WiseStamp", price: "$6–10/mo", free: false, noMark: false, highlight: false },
                  { name: "MySignature", price: "$4–8/mo", free: false, noMark: false, highlight: false },
                  { name: "Exclaimer", price: "$20+/mo", free: false, noMark: false, highlight: false },
                ].map((row) => (
                  <tr key={row.name} className={row.highlight ? "bg-blue-50" : "bg-white"}>
                    <td className={`px-5 py-4 font-medium ${row.highlight ? "text-primary" : "text-foreground"}`}>
                      {row.name}
                      {row.highlight && <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">You&apos;re here</span>}
                    </td>
                    <td className="px-5 py-4 text-center text-muted">{row.price}</td>
                    <td className="px-5 py-4 text-center">
                      {row.free
                        ? <span className="text-green-500 font-bold">Yes</span>
                        : <span className="text-red-400">No</span>}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {row.noMark
                        ? <span className="text-green-500 font-bold">Yes</span>
                        : <span className="text-red-400">No</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-foreground mb-10">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes — cancel in 2 clicks from your account settings. No calls, no forms, no drama. Your Pro features stay active until the end of your billing period.",
              },
              {
                q: "Is the free tier really free?",
                a: "Completely free, forever. No credit card required. 5 templates, no watermarks, no time limits. We make money when you upgrade to Pro — not before.",
              },
              {
                q: "What payment methods do you accept?",
                a: "All major credit cards (Visa, Mastercard, Amex), and Apple Pay / Google Pay. Payments are processed securely by Stripe.",
              },
              {
                q: "Can I switch plans?",
                a: "Yes. Upgrade or downgrade at any time. If you upgrade mid-cycle, you&apos;ll only be charged the prorated difference.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes. If you&apos;re not satisfied within 30 days of starting a paid plan, contact us for a full refund — no questions asked.",
              },
              {
                q: "Is there a student discount?",
                a: "Students get 50% off Pro. Email us from your .edu address and we&apos;ll send you a discount code within 24 hours.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <dt className="font-semibold text-foreground">{q}</dt>
                <dd className="mt-2 text-sm text-muted leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
