import Link from "next/link";
import { SeoPageData } from "@/lib/seoPages";

export default function SeoLandingPage({ page }: { page: SeoPageData }) {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">{page.intro}</p>
          <Link
            href="/editor"
            className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
          >
            Create Your {page.title} Signature — Free
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
        </div>

        {/* Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            How to Add an Email Signature in {page.title}
          </h2>
          <div className="space-y-6">
            {page.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16 rounded-xl bg-surface p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Why Use NeatStamp for {page.title}?
          </h2>
          <ul className="space-y-3">
            {page.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5"
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
                <span className="text-muted">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        {page.faq.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              FAQ: Email Signatures for {page.title}
            </h2>
            <div className="space-y-4">
              {page.faq.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-semibold text-foreground">
                    {faq.q}
                    <svg
                      className="h-5 w-5 text-muted transition-transform group-open:rotate-180"
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
                  <p className="px-6 pb-4 text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl bg-primary p-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Create Your {page.title} Signature?
          </h2>
          <p className="mt-3 text-blue-100">
            Free forever. No account. No credit card. Works in 30+ email clients.
          </p>
          <Link
            href="/editor"
            className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
          >
            Create Free Signature
          </Link>
        </section>
      </div>
    </div>
  );
}
