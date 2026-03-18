import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | NeatStamp",
  description:
    "NeatStamp terms of service. Plain-English SaaS terms covering usage, billing, refunds, and your responsibilities.",
  alternates: { canonical: "https://neatstamp.com/terms" },
};

export default function TermsPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-gray-500 mb-10 text-sm">Last updated: {lastUpdated}</p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong>Plain English summary:</strong> Use NeatStamp to create
            email signatures. Be responsible for what you put in your
            signatures. Pay for Pro if you use Pro features. We offer a 30-day
            refund if you&rsquo;re not satisfied. Don&rsquo;t do anything
            illegal or harmful. That&rsquo;s the gist.
          </p>
        </div>

        <div className="space-y-10 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Acceptance of terms
            </h2>
            <p className="leading-relaxed">
              By accessing or using NeatStamp (&ldquo;the Service&rdquo;),
              operated by NeatStamp (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;), you agree to be bound by these Terms of
              Service. If you do not agree to these terms, do not use the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Description of service
            </h2>
            <p className="leading-relaxed mb-3">
              NeatStamp is an email signature generator. It allows users to
              create, customize, and copy HTML email signatures for use in email
              clients. The Service is offered in two tiers:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Free tier:</strong> Core signature creation features,
                available without registration. No data is stored on our
                servers.
              </li>
              <li>
                <strong>Pro tier:</strong> Advanced features including saved
                signatures, additional templates, Calendly integration, and CTA
                banners. Requires account creation and a paid subscription.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. User responsibilities
            </h2>
            <p className="leading-relaxed mb-3">
              You are solely responsible for the content of the email signatures
              you create using NeatStamp, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Ensuring you have the right to use any images, logos, or other
                media you include
              </li>
              <li>
                Ensuring your signature complies with applicable laws and
                regulations (including CAN-SPAM, CASL, GDPR, and any applicable
                professional licensing disclosure requirements)
              </li>
              <li>
                Not using the Service to create signatures that are fraudulent,
                misleading, defamatory, or that impersonate another person or
                organization
              </li>
              <li>
                Not using the Service for any illegal purpose
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Accounts
            </h2>
            <p className="leading-relaxed mb-3">
              To use Pro features, you must create an account. You are
              responsible for maintaining the security of your account
              credentials. You must notify us immediately of any unauthorized
              use of your account.
            </p>
            <p className="leading-relaxed">
              You must be at least 16 years old to create an account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Billing and payment
            </h2>
            <p className="leading-relaxed mb-3">
              Pro subscriptions are billed monthly or annually in advance.
              Payments are processed by Stripe. By providing payment
              information, you authorize us to charge you the applicable
              subscription fee on a recurring basis.
            </p>
            <p className="leading-relaxed">
              Prices are listed in USD and may be subject to local taxes
              depending on your location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Refund policy
            </h2>
            <p className="leading-relaxed mb-3">
              We offer a <strong>30-day money-back guarantee</strong> on all Pro
              subscriptions. If you are not satisfied with your Pro subscription
              for any reason within 30 days of your initial purchase, contact us
              at{" "}
              <a
                href="mailto:support@neatstamp.com"
                className="text-blue-600 hover:underline"
              >
                support@neatstamp.com
              </a>{" "}
              and we will issue a full refund, no questions asked.
            </p>
            <p className="leading-relaxed">
              Refunds are not available after 30 days, or for renewals of
              existing subscriptions. If you cancel your subscription, you will
              retain access to Pro features until the end of your current
              billing period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Cancellation
            </h2>
            <p className="leading-relaxed">
              You may cancel your Pro subscription at any time from your account
              settings. Cancellation takes effect at the end of your current
              billing period. We do not prorate refunds for partial billing
              periods after the 30-day refund window.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Service provided &ldquo;as-is&rdquo;
            </h2>
            <p className="leading-relaxed">
              The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis without warranties of any kind, either
              express or implied. We do not guarantee that the Service will be
              uninterrupted, error-free, or that signatures will render
              identically across all email clients (though we work hard to
              ensure broad compatibility). Your use of the Service is at your
              sole risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Limitation of liability
            </h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by applicable law, NeatStamp shall
              not be liable for any indirect, incidental, special, consequential,
              or punitive damages arising from your use of the Service. Our total
              liability to you for any claim arising from these Terms shall not
              exceed the amount you paid us in the 12 months preceding the
              claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Intellectual property
            </h2>
            <p className="leading-relaxed mb-3">
              NeatStamp and its original content, features, and functionality
              are owned by us and protected by copyright and other intellectual
              property laws.
            </p>
            <p className="leading-relaxed">
              The email signatures you create using the Service are yours. We
              claim no ownership over the content of signatures you generate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Changes to these terms
            </h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. We will
              notify Pro account holders of material changes by email at least
              14 days before they take effect. Your continued use of the Service
              after the effective date constitutes acceptance of the revised
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Governing law
            </h2>
            <p className="leading-relaxed">
              These Terms are governed by and construed in accordance with the
              laws of the State of Delaware, United States, without regard to
              its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              13. Contact
            </h2>
            <p className="leading-relaxed">
              Questions about these Terms? Contact us at{" "}
              <a
                href="mailto:legal@neatstamp.com"
                className="text-blue-600 hover:underline"
              >
                legal@neatstamp.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
