import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About NeatStamp",
  description:
    "NeatStamp was built because we were tired of 'free' email signature generators that aren't actually free. Learn about our mission and our promises to you.",
  alternates: { canonical: "https://neatstamp.com/about" },
};

const PROMISES = [
  {
    number: "01",
    title: "Actually free",
    description:
      "The free tier has no hidden paywalls, no forced account creation, and no watermarks on your signature.",
  },
  {
    number: "02",
    title: "No data collection on free tier",
    description:
      "Your free-tier signature data never touches our servers. All processing happens in your browser.",
  },
  {
    number: "03",
    title: "Works in every email client",
    description:
      "We test every template in Gmail, Outlook, Apple Mail, Yahoo Mail, and more. No broken layouts.",
  },
  {
    number: "04",
    title: "Honest pricing",
    description:
      "Pro features cost money. We tell you upfront what's free and what's paid. No bait-and-switch.",
  },
  {
    number: "05",
    title: "No spammy upsells",
    description:
      "We won't bombard you with pop-ups, countdown timers, or fake urgency tactics.",
  },
  {
    number: "06",
    title: "Your data is yours",
    description:
      "We never sell your data to third parties. Never have, never will.",
  },
  {
    number: "07",
    title: "GDPR compliant",
    description:
      "We handle personal data responsibly and give you full control over what you share with us.",
  },
  {
    number: "08",
    title: "Always improving",
    description:
      "We ship new templates, integrations, and features regularly based on real user feedback.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About NeatStamp
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We built NeatStamp because we were tired of &ldquo;free&rdquo; email
            signature generators that aren&rsquo;t actually free.
          </p>
        </div>

        {/* Origin story */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The problem with &ldquo;free&rdquo; signature tools
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
            <p>
              If you&rsquo;ve ever tried to create a professional email
              signature, you&rsquo;ve probably encountered the same pattern:
              search for a free generator, build something that looks great in
              the preview — and then hit a paywall when you try to download or
              copy it. Or worse, discover that your &ldquo;free&rdquo; signature
              has a distracting promotional banner from the tool you used to
              create it.
            </p>
            <p>
              Other tools collect your data, sign you up for marketing emails,
              or sell your information to third parties. Some generate
              technically broken HTML that looks fine in their preview but falls
              apart the moment it hits Outlook.
            </p>
            <p>
              We thought there had to be a better way. So we built NeatStamp: a
              genuinely free email signature generator that respects your time,
              your data, and your inbox.
            </p>
          </div>
        </div>

        {/* Promises */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Our 8 promises
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROMISES.map((promise) => (
              <div
                key={promise.number}
                className="bg-white rounded-xl border border-gray-200 p-6 flex gap-4"
              >
                <span className="text-2xl font-black text-blue-100 leading-none flex-shrink-0">
                  {promise.number}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {promise.title}
                  </h3>
                  <p className="text-sm text-gray-500">{promise.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-600 rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-3">
            Ready to try it for yourself?
          </h2>
          <p className="text-blue-100 mb-6">
            Create a professional email signature in 60 seconds. Free. No
            account needed.
          </p>
          <Link
            href="/editor"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Create My Signature
          </Link>
        </div>
      </div>
    </div>
  );
}
