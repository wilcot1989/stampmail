import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NeatStamp",
  description:
    "NeatStamp privacy policy. Learn how we handle your data — spoiler: we barely collect any.",
  alternates: { canonical: "https://neatstamp.com/privacy" },
};

export default function PrivacyPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-10 text-sm">Last updated: {lastUpdated}</p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
          <p className="text-blue-800 font-medium text-sm leading-relaxed">
            <strong>Short version:</strong> If you use the free tier of
            NeatStamp, we store nothing about you on our servers. All signature
            generation happens in your browser. If you upgrade to Pro, we store
            only the minimum data necessary to provide the service.
          </p>
        </div>

        <div className="space-y-10 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Free tier: no server-side data storage
            </h2>
            <p className="leading-relaxed mb-3">
              When you use NeatStamp on the free tier, all signature generation
              and preview rendering happens entirely client-side in your web
              browser. We do not transmit your name, email address, phone
              number, photo, or any other personal information you enter in the
              signature builder to our servers.
            </p>
            <p className="leading-relaxed">
              Your data stays in your browser session. When you close the tab,
              it is gone. We have no record of it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Pro tier: what we store and why
            </h2>
            <p className="leading-relaxed mb-3">
              If you subscribe to NeatStamp Pro, we store the following data in
              our database (Cloudflare D1) to provide the service:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your email address (for account authentication)</li>
              <li>
                Your saved signature data (name, title, company, contact
                details, template settings, and any uploaded image URLs)
              </li>
              <li>
                Billing information — handled entirely by Stripe; we never see
                or store your full card details
              </li>
              <li>
                Subscription status and renewal dates
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. We never sell your data
            </h2>
            <p className="leading-relaxed">
              We do not sell, rent, trade, or otherwise transfer your personal
              information to third parties. Ever. This applies to both free and
              paid users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Analytics and cookies
            </h2>
            <p className="leading-relaxed mb-3">
              We use privacy-respecting analytics to understand aggregate usage
              patterns — things like which pages are popular and where users
              come from. This data is anonymized and does not include personal
              identifiers.
            </p>
            <p className="leading-relaxed">
              We use essential cookies for authentication on the Pro tier. We do
              not use third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. GDPR compliance
            </h2>
            <p className="leading-relaxed mb-3">
              NeatStamp is GDPR compliant. If you are a resident of the European
              Economic Area, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
              <li>Object to processing of your data</li>
              <li>Request portability of your data</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@neatstamp.com"
                className="text-blue-600 hover:underline"
              >
                privacy@neatstamp.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Data security
            </h2>
            <p className="leading-relaxed">
              All data transmitted between your browser and our servers is
              encrypted using TLS. Pro account data is stored in Cloudflare D1,
              which is encrypted at rest. We follow industry best practices for
              access control and security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Data retention
            </h2>
            <p className="leading-relaxed">
              Pro account data is retained for as long as your account is
              active. If you cancel your Pro subscription, your account data is
              retained for 90 days in case you wish to reactivate, after which
              it is permanently deleted. You can request immediate deletion at
              any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Children&rsquo;s privacy
            </h2>
            <p className="leading-relaxed">
              NeatStamp is not directed at children under 13. We do not
              knowingly collect personal information from children under 13. If
              you believe we have inadvertently collected such information,
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Changes to this policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify Pro account holders of material changes by email. The
              &ldquo;last updated&rdquo; date at the top of this page indicates
              when the policy was last revised.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Contact
            </h2>
            <p className="leading-relaxed">
              Questions about this Privacy Policy? Contact us at{" "}
              <a
                href="mailto:privacy@neatstamp.com"
                className="text-blue-600 hover:underline"
              >
                privacy@neatstamp.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
