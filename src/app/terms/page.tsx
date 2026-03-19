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
            email signatures. Free signatures include a tracking pixel and
            &ldquo;Made with NeatStamp&rdquo; branding — upgrade to Pro to
            remove both. Be responsible for what you put in your signatures.
            Don&rsquo;t use NeatStamp for spam, impersonation, or anything
            illegal. We offer a 30-day refund, no questions asked.
          </p>
        </div>

        <div className="space-y-10 text-gray-600">

          {/* ── 1. Acceptance of terms ── */}
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

          {/* ── 2. Description of service ── */}
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
                available with or without registration. See section 3 for
                important free-tier limitations.
              </li>
              <li>
                <strong>Pro tier:</strong> Advanced features including saved
                signatures, additional templates, Calendly integration, CTA
                banners, and tracking-free pure HTML output. Requires account
                creation and a paid subscription.
              </li>
            </ul>
          </section>

          {/* ── 3. Free tier limitations ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Free tier limitations
            </h2>
            <p className="leading-relaxed mb-3">
              The free tier is provided at no cost, and comes with the following
              limitations you should be aware of before using it:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>90-day expiry:</strong> free accounts and their
                associated signatures are deactivated after 90 days of
                inactivity (no logins and no pixel activity). Deactivated
                signatures will stop rendering correctly in email clients.
                Logging back in reactivates your account.
              </li>
              <li>
                <strong>Hosted images:</strong> profile photos in free-tier
                signatures are hosted on our servers. We control availability.
                If your account is deactivated or deleted, your photo will no
                longer load for recipients.
              </li>
              <li>
                <strong>&ldquo;Made with NeatStamp&rdquo; branding:</strong>{" "}
                free signatures include a small &ldquo;Made with NeatStamp&rdquo;
                link. This cannot be removed on the free tier.
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              Upgrade to Pro to remove all of the above limitations and get
              pure HTML output you fully control.
            </p>
          </section>

          {/* ── 4. Tracking pixel ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Tracking pixel
            </h2>
            <p className="leading-relaxed mb-3">
              Free-tier signatures include a tracking pixel — a small invisible
              image that loads from our servers when a recipient opens an email.
              This allows us to show you open counts on your dashboard.
            </p>
            <p className="leading-relaxed mb-3">
              By using a free-tier signature, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                A tracking pixel will be embedded in signatures generated under
                your account
              </li>
              <li>
                Email recipients&rsquo; open events (timestamp and IP address)
                will be logged and shown to you
              </li>
              <li>
                You are responsible for ensuring your use of email open tracking
                complies with applicable laws in your jurisdiction (such as GDPR
                or CASL), including any obligation to disclose tracking to
                recipients
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              Pro signatures contain no tracking pixel. See our{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              for full details on how tracking data is handled.
            </p>
          </section>

          {/* ── 5. Acceptable use ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Acceptable use
            </h2>
            <p className="leading-relaxed mb-3">
              You may use NeatStamp only for lawful purposes and in accordance
              with these Terms. You must not use the Service to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Create signatures for use in unsolicited bulk email (spam) or
                any other activity that violates anti-spam laws (CAN-SPAM, CASL,
                etc.)
              </li>
              <li>
                Impersonate any person, company, or organization, or create
                signatures that are deliberately misleading or fraudulent
              </li>
              <li>
                Include content that is defamatory, harassing, hateful,
                obscene, or otherwise unlawful
              </li>
              <li>
                Upload images or use content that infringes any third
                party&rsquo;s intellectual property rights
              </li>
              <li>
                Attempt to circumvent or abuse the free-tier limits (including
                artificially generating pixel events)
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              We reserve the right to suspend or terminate accounts that violate
              this section without notice.
            </p>
          </section>

          {/* ── 6. User responsibilities ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. User responsibilities
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
                misleading, or defamatory
              </li>
            </ul>
          </section>

          {/* ── 7. Accounts ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Accounts
            </h2>
            <p className="leading-relaxed mb-3">
              To use Pro features, you must create an account. You are
              responsible for maintaining the security of your account
              credentials. You must notify us immediately of any unauthorized
              use of your account at{" "}
              <a
                href="mailto:support@neatstamp.com"
                className="text-blue-600 hover:underline"
              >
                support@neatstamp.com
              </a>
              .
            </p>
            <p className="leading-relaxed">
              You must be at least 16 years old to create an account.
            </p>
          </section>

          {/* ── 8. Billing and payment ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Billing and payment
            </h2>
            <p className="leading-relaxed mb-3">
              Pro subscriptions are billed monthly or annually in advance.
              Payments are processed by LemonSqueezy. By providing payment
              information, you authorize us to charge you the applicable
              subscription fee on a recurring basis.
            </p>
            <p className="leading-relaxed">
              Prices are listed in USD and may be subject to local taxes
              depending on your location. LemonSqueezy handles all payment data
              — we never see or store your card details.
            </p>
          </section>

          {/* ── 9. Refund policy ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Refund policy
            </h2>
            <p className="leading-relaxed mb-3">
              We offer a <strong>30-day money-back guarantee</strong> on all Pro
              subscriptions. If you are not satisfied for any reason within 30
              days of your initial purchase, contact us at{" "}
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

          {/* ── 10. Cancellation ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Cancellation
            </h2>
            <p className="leading-relaxed">
              You may cancel your Pro subscription at any time from your account
              settings. Cancellation takes effect at the end of your current
              billing period. We do not prorate refunds for partial billing
              periods after the 30-day refund window.
            </p>
          </section>

          {/* ── 11. Service provided "as-is" ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Service provided &ldquo;as-is&rdquo;
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

          {/* ── 12. Limitation of liability ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Limitation of liability
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

          {/* ── 13. Intellectual property ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              13. Intellectual property
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

          {/* ── 14. Changes to these terms ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              14. Changes to these terms
            </h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. We will
              notify registered users of material changes by email at least
              14 days before they take effect. Your continued use of the Service
              after the effective date constitutes acceptance of the revised
              Terms.
            </p>
          </section>

          {/* ── 15. Governing law ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              15. Governing law
            </h2>
            <p className="leading-relaxed">
              These Terms are governed by and construed in accordance with the
              laws of the State of Delaware, United States, without regard to
              its conflict of law provisions.
            </p>
          </section>

          {/* ── 16. Contact ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              16. Contact
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
