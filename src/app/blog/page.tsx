import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | NeatStamp — Email Signature Tips & Guides",
  description:
    "Email signature best practices, troubleshooting guides, size specs, and tool comparisons from the NeatStamp team.",
  alternates: { canonical: "https://neatstamp.com/blog" },
};

const ARTICLES = [
  {
    slug: "email-signature-best-practices",
    title: "Email Signature Best Practices — The Only Guide You Need (2026)",
    description:
      "What to include and what to leave out, font choices that work across every client, color theory for signatures, image sizing, mobile considerations, and the mistakes that make even expensive signatures look amateurish.",
    category: "Best Practices",
    date: "March 2026",
    readTime: "14 min read",
  },
  {
    slug: "email-signature-size",
    title: "Email Signature Size Guide — Dimensions, Image Sizes & Limits (2026)",
    description:
      "Exact specs for every element: 600px max width, logo dimensions, headshot sizes, banner dimensions, file size limits for Gmail and Outlook, and a quick reference table you can bookmark.",
    category: "Technical",
    date: "March 2026",
    readTime: "12 min read",
  },
  {
    slug: "outlook-signature-not-working",
    title: "Outlook Signature Not Working? Here's How to Fix It (2026)",
    description:
      "The most complete troubleshooting guide for Outlook signature problems: disappeared signatures, images as attachments, broken formatting, new Outlook vs. classic, admin policies, roaming signature conflicts, and registry fixes.",
    category: "Troubleshooting",
    date: "March 2026",
    readTime: "18 min read",
  },
  {
    slug: "how-to-add-social-media-icons-email-signature",
    title: "How to Add Social Media Icons to Your Email Signature (2026)",
    description:
      "Which icons to include (LinkedIn always, Instagram for creatives, X only if you're active), image vs. text links, exact sizing specs, and the mistakes that make signatures look cluttered.",
    category: "Guide",
    date: "March 2026",
    readTime: "11 min read",
  },
  {
    slug: "email-signature-generator-comparison",
    title: "I Tested 8 Email Signature Generators — Here's What I Found (2026)",
    description:
      "An honest review of NeatStamp, WiseStamp, MySignature, HubSpot, Canva, Signaturely, Newoldstamp, and Mail-signatures — what's good, what's bad, pricing, and Outlook compatibility results.",
    category: "Review",
    date: "March 2026",
    readTime: "16 min read",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Best Practices": "bg-green-100 text-green-700",
  Technical: "bg-purple-100 text-purple-700",
  Troubleshooting: "bg-amber-100 text-amber-800",
  Guide: "bg-blue-100 text-blue-700",
  Review: "bg-pink-100 text-pink-700",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:px-6">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
            NeatStamp Blog
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Email signature tips, guides, and troubleshooting
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Practical, technical guides from the people who built NeatStamp. We cover
            what actually works — not just theory.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        {/* Featured article */}
        <div className="mb-10">
          <Link
            href={`/blog/${ARTICLES[0].slug}`}
            className="group block bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  CATEGORY_COLORS[ARTICLES[0].category] || "bg-slate-100 text-slate-600"
                }`}
              >
                {ARTICLES[0].category}
              </span>
              <span className="text-xs text-slate-400">{ARTICLES[0].readTime}</span>
              <span className="text-xs text-slate-400">&middot;</span>
              <span className="text-xs text-slate-400">{ARTICLES[0].date}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
              {ARTICLES[0].title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              {ARTICLES[0].description}
            </p>
            <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
              Read article &rarr;
            </span>
          </Link>
        </div>

        {/* Article grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {ARTICLES.slice(1).map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                    CATEGORY_COLORS[article.category] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {article.category}
                </span>
                <span className="text-xs text-slate-400">{article.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug flex-1">
                {article.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                {article.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{article.date}</span>
                <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                  Read &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Topics nav */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-10">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
            Browse by topic
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
              <span
                key={cat}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full ${color}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Related pages */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-10">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
            Related guides
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                href: "/professional-email-signature",
                label: "Professional Email Signature",
              },
              {
                href: "/email-signature-design",
                label: "Email Signature Design",
              },
              { href: "/email-signature-with-logo", label: "Signature with Logo" },
              {
                href: "/email-signature-outlook",
                label: "Outlook Email Signature",
              },
              { href: "/email-signature-gmail", label: "Gmail Signature Setup" },
              { href: "/html-email-signature", label: "HTML Email Signatures" },
              {
                href: "/email-signature-for-business",
                label: "Business Email Signatures",
              },
              {
                href: "/email-signature-for-freelancers",
                label: "Freelancer Signatures",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors py-1"
              >
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Ready to build your signature?
          </h2>
          <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
            Free, no account needed. Outlook-proof. Takes about 60 seconds.
          </p>
          <Link
            href="/editor"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Create My Email Signature — Free
          </Link>
        </div>
      </div>
    </div>
  );
}
