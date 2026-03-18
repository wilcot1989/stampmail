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
    cta: "Start Pro — 30 Day Guarantee",
    ctaLink: "/editor",
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
    ctaLink: "/editor",
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
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Simple, Honest Pricing
          </h1>
          <p className="mt-4 text-lg text-muted">
            Free forever. Upgrade only if you need more. Cancel in 2 clicks.
          </p>
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
      </div>
    </div>
  );
}
