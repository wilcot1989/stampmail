import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NeatStamp",
  description:
    "NeatStamp privacy policy. Clear, plain-English explanation of what data we collect, why, and how long we keep it.",
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
            <strong>Short version:</strong> Free users get a tracking pixel in
            their signatures so they can see email open counts — we are upfront
            about this below. Pro users get pure HTML signatures with no
            tracking. We never sell your data to anyone.
          </p>
        </div>

        <div className="space-y-10 text-gray-600">

          {/* ── 1. What we collect ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. What we collect
            </h2>

            <h3 className="font-semibold text-gray-800 mb-2">Free accounts (registered)</h3>
            <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
              <li>Your email address (used to log in)</li>
              <li>
                Your signature data — name, title, company, phone, social links,
                and any other details you enter in the builder
              </li>
              <li>
                Your profile photo, if you upload one — stored on our servers
                (Cloudflare R2) and served from neatstamp.com
              </li>
              <li>
                <strong>Tracking pixel data:</strong> when someone opens an
                email containing your free-tier signature, our pixel records
                the event&rsquo;s timestamp and the opener&rsquo;s approximate
                IP address. This is how we show you open counts. You can read
                more in section 3 below.
              </li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">Pro accounts</h3>
            <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
              <li>Same as above, except Pro signatures contain no tracking pixel</li>
              <li>Subscription status and renewal date</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">Google Analytics (with your consent)</h3>
            <p className="leading-relaxed mb-2">
              If you accept cookies when the consent banner appears, we load
              Google Analytics. It collects:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
              <li>Pages you visit and how long you spend on them</li>
              <li>Device type, browser, and operating system</li>
              <li>Country-level location (not city or street level)</li>
            </ul>
            <p className="leading-relaxed mb-4">
              If you decline cookies, Google Analytics is not loaded at all.
              You can change your preference at any time via the cookie settings
              link in the site footer.
            </p>

            <h3 className="font-semibold text-gray-800 mb-2">Google OAuth (if you sign in with Google)</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your name, email address, and Google profile picture</li>
            </ul>
          </section>

          {/* ── 2. How we use your data ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. How we use your data
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Signature creation and storage:</strong> your signature
                data is saved so you can edit and re-copy it any time you log in
              </li>
              <li>
                <strong>Tracking pixel (free tier):</strong> pixel events are
                aggregated into an open count shown on your dashboard — we do not
                share individual open events with third parties
              </li>
              <li>
                <strong>Google Analytics:</strong> to understand how people use
                the site so we can improve it — only with your cookie consent
              </li>
              <li>
                <strong>Transactional email:</strong> to send password reset
                links and other account-related messages. We do not send
                marketing email unless you opt in separately.
              </li>
            </ul>
          </section>

          {/* ── 3. Tracking pixel ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Tracking pixel (free tier)
            </h2>
            <p className="leading-relaxed mb-3">
              Free-tier signatures include a 1&times;1 pixel image hosted on
              neatstamp.com. When a recipient opens an email containing your
              signature, their email client loads this image — that request tells
              us the email was opened, along with the time and the
              recipient&rsquo;s IP address.
            </p>
            <p className="leading-relaxed mb-3">
              We use this data only to show you your own open counts. We do not
              build profiles of your recipients, and we do not sell or share this
              data.
            </p>
            <p className="leading-relaxed">
              If you would prefer signatures with no tracking, upgrade to Pro.
              Pro signatures are pure HTML with no server-side image loading.
            </p>
          </section>

          {/* ── 4. Image hosting ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Image hosting
            </h2>
            <p className="leading-relaxed mb-3">
              Profile photos uploaded by free and registered users are stored on
              Cloudflare R2 and served from the neatstamp.com domain. This means
              your photo is loaded from our servers every time someone views an
              email with your signature.
            </p>
            <p className="leading-relaxed mb-3">
              Images belonging to inactive free accounts may be deleted after
              90 days of inactivity. If your account is deactivated, your
              signature images will stop loading for recipients.
            </p>
            <p className="leading-relaxed">
              Pro users receive pure HTML output. Their signatures do not
              reference any image hosted on our servers — you host your own
              images or reference external URLs you control.
            </p>
          </section>

          {/* ── 5. Cookies ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Cookies
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Authentication cookie:</strong> set when you log in to
                keep your session active. This is strictly necessary and cannot
                be turned off.
              </li>
              <li>
                <strong>Cookie consent preference:</strong> stored in
                localStorage to remember whether you accepted or declined
                analytics cookies.
              </li>
              <li>
                <strong>Google Analytics cookies:</strong> set only if you
                accept the cookie consent banner. These track page views and
                session data as described in section 1.
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              We do not use advertising cookies or sell cookie data to any
              third party.
            </p>
          </section>

          {/* ── 6. Data retention ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Data retention
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Account data:</strong> kept until you delete your
                account. You can request deletion at any time.
              </li>
              <li>
                <strong>Free signatures and hosted images:</strong> deactivated
                and queued for deletion after 90 days of inactivity (no logins
                and no pixel activity).
              </li>
              <li>
                <strong>Tracking pixel data:</strong> retained for 90 days,
                then permanently deleted.
              </li>
              <li>
                <strong>Audit logs:</strong> retained for 90 days, then
                permanently deleted.
              </li>
            </ul>
          </section>

          {/* ── 7. Your rights (GDPR) ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Your rights (GDPR)
            </h2>
            <p className="leading-relaxed mb-3">
              If you are in the European Economic Area (or anywhere else, for
              that matter), you have the following rights regarding your personal
              data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Access:</strong> request a copy of the data we hold
                about you
              </li>
              <li>
                <strong>Correction:</strong> ask us to fix inaccurate data
              </li>
              <li>
                <strong>Deletion:</strong> ask us to delete your account and all
                associated data (&ldquo;right to be forgotten&rdquo;)
              </li>
              <li>
                <strong>Withdraw consent:</strong> opt out of analytics cookies
                at any time via the cookie settings link in the footer
              </li>
              <li>
                <strong>Data portability:</strong> request your data in a
                machine-readable format
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:privacy@neatstamp.com"
                className="text-blue-600 hover:underline"
              >
                privacy@neatstamp.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* ── 8. Third-party services ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Third-party services
            </h2>
            <p className="leading-relaxed mb-3">
              We use the following third parties to run NeatStamp. Each has its
              own privacy policy.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Cloudflare</strong> — hosting, CDN, database (D1), and
                image storage (R2). Your data is stored on Cloudflare
                infrastructure.
              </li>
              <li>
                <strong>Google</strong> — OAuth sign-in and, with your consent,
                Google Analytics.
              </li>
              <li>
                <strong>Resend</strong> — transactional email delivery (password
                resets, etc.). They receive your email address to deliver
                messages.
              </li>
              <li>
                <strong>LemonSqueezy</strong> — payment processing. All payment
                and billing data is handled entirely by LemonSqueezy. We never
                see or store your card details.
              </li>
            </ul>
          </section>

          {/* ── 9. We never sell your data ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. We never sell your data
            </h2>
            <p className="leading-relaxed">
              We do not sell, rent, trade, or otherwise transfer your personal
              information to any third party for their own commercial use. Ever.
            </p>
          </section>

          {/* ── 10. Data security ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Data security
            </h2>
            <p className="leading-relaxed">
              All data transmitted between your browser and our servers is
              encrypted using TLS. Account data is stored in Cloudflare D1,
              which is encrypted at rest. We follow industry best practices for
              access control and security.
            </p>
          </section>

          {/* ── 11. Children's privacy ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Children&rsquo;s privacy
            </h2>
            <p className="leading-relaxed">
              NeatStamp is not directed at children under 13. We do not
              knowingly collect personal information from children under 13. If
              you believe we have inadvertently collected such information,
              contact us immediately at{" "}
              <a
                href="mailto:privacy@neatstamp.com"
                className="text-blue-600 hover:underline"
              >
                privacy@neatstamp.com
              </a>
              .
            </p>
          </section>

          {/* ── 12. Changes to this policy ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Changes to this policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify registered users of material changes by email. The
              &ldquo;last updated&rdquo; date at the top of this page shows when
              the policy was last revised.
            </p>
          </section>

          {/* ── 13. Contact ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              13. Contact
            </h2>
            <p className="leading-relaxed">
              Questions about this Privacy Policy? Email us at{" "}
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
