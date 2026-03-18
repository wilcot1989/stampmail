import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | NeatStamp",
  description:
    "Email signature tips, best practices, and guides from the NeatStamp team. Coming soon.",
  alternates: { canonical: "https://neatstamp.com/blog" },
};

const PLANNED_ARTICLES = [
  {
    title: "How to Create a Professional Email Signature in 2026",
    description:
      "A step-by-step guide to building an email signature that makes a great first impression — covering what to include, what to leave out, and how to install it in any email client.",
    category: "Guide",
    readTime: "8 min read",
  },
  {
    title: "Email Signature Best Practices: The Definitive Checklist",
    description:
      "Everything you need to know about email signature design, content, and technical implementation. Avoid the most common mistakes that make signatures look unprofessional.",
    category: "Best Practices",
    readTime: "12 min read",
  },
  {
    title: "Gmail vs Outlook: Which Handles Signatures Better?",
    description:
      "A technical deep-dive into how Gmail and Outlook render HTML signatures differently — and what that means for how you design yours.",
    category: "Technical",
    readTime: "10 min read",
  },
  {
    title: "The Psychology of First Impressions in Email",
    description:
      "Research shows that recipients judge the professionalism of an email within seconds. Here&rsquo;s what your email signature signals about you and your business.",
    category: "Strategy",
    readTime: "6 min read",
  },
  {
    title: "Email Signature for Freelancers: A Complete Guide",
    description:
      "How to use your email signature as a marketing tool — linking your portfolio, booking calendar, and testimonials to convert every email into a business opportunity.",
    category: "Freelancing",
    readTime: "9 min read",
  },
  {
    title: "Why Your Email Signature Looks Broken in Outlook (And How to Fix It)",
    description:
      "Outlook uses a Word-based rendering engine that breaks most modern CSS. Here&rsquo;s a technical explanation of the problem and the only reliable solution.",
    category: "Technical",
    readTime: "11 min read",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Guide: "bg-blue-100 text-blue-700",
  "Best Practices": "bg-green-100 text-green-700",
  Technical: "bg-purple-100 text-purple-700",
  Strategy: "bg-orange-100 text-orange-700",
  Freelancing: "bg-pink-100 text-pink-700",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NeatStamp Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Email signature tips, technical guides, and best practices from the
            NeatStamp team.
          </p>
        </div>

        {/* Coming soon banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12 text-center">
          <div className="text-2xl mb-2">Coming soon</div>
          <p className="text-amber-800 text-sm leading-relaxed max-w-xl mx-auto">
            We&rsquo;re writing in-depth articles on email signature design,
            compatibility, and strategy. Subscribe below to be notified when the
            first articles go live.
          </p>
          <form className="mt-4 flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-4 py-2 text-sm border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
            >
              Notify me
            </button>
          </form>
        </div>

        {/* Planned articles */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Articles in progress
          </h2>
          <div className="space-y-4">
            {PLANNED_ARTICLES.map((article) => (
              <div
                key={article.title}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          CATEGORY_COLORS[article.category] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                    <p
                      className="text-sm text-gray-500 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: article.description }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      href="/editor"
                      className="text-xs text-blue-600 font-medium whitespace-nowrap hover:text-blue-700"
                    >
                      Try the editor &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl border border-gray-200 p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            While you wait, make your signature
          </h2>
          <p className="text-gray-600 mb-6">
            Create a professional email signature in 60 seconds. Free, no
            account needed.
          </p>
          <Link
            href="/editor"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Build My Email Signature
          </Link>
        </div>
      </div>
    </div>
  );
}
