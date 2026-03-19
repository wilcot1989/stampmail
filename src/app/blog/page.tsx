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
    title: "Email Signature Best Practices — The Only Guide (2026)",
    description:
      "What to include, what to leave out, fonts, colors, image sizing, mobile tips, and common mistakes. The complete email signature best practices guide.",
    category: "Best Practices",
    date: "March 2026",
    readTime: "14 min read",
  },
  {
    slug: "what-to-include-email-signature",
    title: "What to Include in Your Email Signature (2026)",
    description:
      "The definitive checklist for email signatures: must-haves, should-haves, nice-to-haves, and what to leave out entirely. Includes per-industry recommendations.",
    category: "Best Practices",
    date: "March 2026",
    readTime: "10 min read",
  },
  {
    slug: "outlook-signature-not-working",
    title: "Outlook Signature Not Working? Here's How to Fix It (2026)",
    description:
      "Complete troubleshooting guide: signature disappeared, images as attachments, formatting stripped, new Outlook vs classic, admin policies, registry fixes, and more.",
    category: "Troubleshooting",
    date: "March 2026",
    readTime: "18 min read",
  },
  {
    slug: "email-signature-not-showing-outlook",
    title: "Email Signature Not Showing in Outlook — 10 Fixes",
    description:
      "Your email signature not showing in Outlook? I've fixed this exact issue dozens of times. Here are all 10 causes — and exactly how to fix each one.",
    category: "Troubleshooting",
    date: "March 2026",
    readTime: "13 min read",
  },
  {
    slug: "gmail-signature-not-working",
    title: "Gmail Signature Not Working? 8 Fixes (2026)",
    description:
      "Gmail signature not saving, not showing on replies, or losing its formatting? I've fixed every version of this problem. Here are 8 actual causes with exact steps to fix each one.",
    category: "Troubleshooting",
    date: "March 2026",
    readTime: "11 min read",
  },
  {
    slug: "email-signature-images-not-displaying",
    title: "Email Signature Images Not Showing? Fix Guide",
    description:
      "Logo not showing in your email signature? Photo missing? I've diagnosed every cause — recipient blocks, broken URLs, wrong DPI, dark mode, and more. Here are the fixes.",
    category: "Troubleshooting",
    date: "March 2026",
    readTime: "12 min read",
  },
  {
    slug: "email-signature-keeps-disappearing",
    title: "Email Signature Keeps Disappearing? Stop It Now",
    description:
      "Your email signature keeps disappearing, changing, or deleting itself? I've tracked down every cause — Outlook roaming signatures, Gmail cache, Apple Mail font settings, and more.",
    category: "Troubleshooting",
    date: "March 2026",
    readTime: "10 min read",
  },
  {
    slug: "email-signature-size",
    title: "Email Signature Size Guide — Dimensions & Limits (2026)",
    description:
      "Exact email signature size specs: max width 600px, image sizes for Gmail and Outlook, logo dimensions, file size limits, and what breaks when you exceed them.",
    category: "Technical",
    date: "March 2026",
    readTime: "12 min read",
  },
  {
    slug: "email-signature-generator-comparison",
    title: "I Tested 8 Email Signature Generators — Here's What I Found",
    description:
      "Honest comparison of NeatStamp, WiseStamp, MySignature, HubSpot, Canva, Signaturely, Newoldstamp, and Mail-signatures. Pricing, Outlook compatibility, and verdict.",
    category: "Review",
    date: "March 2026",
    readTime: "16 min read",
  },
  {
    slug: "how-to-add-social-media-icons-email-signature",
    title: "How to Add Social Media Icons to Your Email Signature (2026)",
    description:
      "Which social icons to include, how to add them in NeatStamp, image vs text links, correct icon sizing, and common mistakes like broken links and too many icons.",
    category: "Guide",
    date: "March 2026",
    readTime: "11 min read",
  },
  {
    slug: "best-email-sign-offs",
    title: "Best Email Sign-Offs — 50+ Professional Options (2026)",
    description:
      "Formal, semi-formal, casual, and industry-specific sign-offs. Which to use, which to avoid, cultural differences, and a quick-reference table of 50+ options.",
    category: "Guide",
    date: "March 2026",
    readTime: "9 min read",
  },
  {
    slug: "email-signature-etiquette",
    title: "Email Signature Etiquette — Unwritten Rules (2026)",
    description:
      "When to include your signature, how long is too long, reply chain etiquette, internal vs external, industry norms, and the phone number debate. Real examples included.",
    category: "Best Practices",
    date: "March 2026",
    readTime: "10 min read",
  },
  {
    slug: "email-signature-dark-mode",
    title: "Email Signatures in Dark Mode — How to Make Them Work",
    description:
      "Dark mode breaks email signatures in predictable ways. Transparent PNGs go invisible, dark text disappears, Gmail auto-inverts. Here's exactly how to fix each problem.",
    category: "Technical",
    date: "March 2026",
    readTime: "11 min read",
  },
  {
    slug: "email-signature-on-phone",
    title: "Email Signature on iPhone & Android — Setup Guide",
    description:
      "How to set up an email signature on iPhone and Android. Native apps, Gmail, Outlook, Samsung Mail. The honest truth about mobile HTML signature limitations and the best workarounds.",
    category: "Guide",
    date: "March 2026",
    readTime: "10 min read",
  },
  {
    slug: "email-signature-with-credentials",
    title: "Email Signature with Credentials — MD, PhD, CPA",
    description:
      "How to list credentials correctly in your email signature. Ordering rules, real examples for medical, legal, financial, academic, and tech fields. Avoid the alphabet soup problem.",
    category: "Guide",
    date: "March 2026",
    readTime: "9 min read",
  },
  {
    slug: "email-signature-for-interns",
    title: "Email Signature for Interns — First Impression",
    description:
      "Your first professional email signature as an intern. What to include, what to skip, real examples for summer, co-op, and graduate interns, and what hiring managers actually notice.",
    category: "Guide",
    date: "March 2026",
    readTime: "8 min read",
  },
  {
    slug: "email-signature-personal-email",
    title: "Email Signature for Personal Email — Do You Need One?",
    description:
      "Honest take on personal email signatures. When you need one, when you don't, what to include, what to leave out, and examples for job seekers, freelancers, and networkers.",
    category: "Guide",
    date: "March 2026",
    readTime: "8 min read",
  },
  {
    slug: "email-signature-remote-workers",
    title: "Email Signature for Remote Workers (2026)",
    description:
      "Time zone, video call link, availability hours, Slack handle — what remote workers actually need in their email signatures. Templates for fully remote, hybrid, and digital nomads.",
    category: "Guide",
    date: "March 2026",
    readTime: "9 min read",
  },
  {
    slug: "email-signature-marketing",
    title: "Email Signature Marketing — Campaign Guide (2026)",
    description:
      "Your team sends thousands of emails a month. That's free advertising space most companies completely ignore. Here's how to turn email signatures into a real marketing channel.",
    category: "Best Practices",
    date: "March 2026",
    readTime: "12 min read",
  },
  {
    slug: "email-signature-banner-ideas",
    title: "Email Signature Banner Ideas — 20+ Examples",
    description:
      "20+ email signature banner ideas organized by type: product launches, events, hiring, social proof, seasonal campaigns. Sizing guide, design tips, and how to track clicks.",
    category: "Guide",
    date: "March 2026",
    readTime: "10 min read",
  },
  {
    slug: "email-signature-animated-gif",
    title: "Animated GIF in Email Signature — Worth It?",
    description:
      "The honest answer on animated GIFs in email signatures. Gmail, Outlook, and Apple Mail support compared. File size limits, accessibility concerns, and when they actually work.",
    category: "Technical",
    date: "March 2026",
    readTime: "8 min read",
  },
  {
    slug: "email-signature-when-leaving-job",
    title: "Changing Your Email Signature When Leaving a Job",
    description:
      "What to update before you leave, what to put in your farewell signature, what to use between jobs, and when to switch to your new one. The transition nobody talks about.",
    category: "Guide",
    date: "March 2026",
    readTime: "8 min read",
  },
  {
    slug: "how-many-lines-email-signature",
    title: "How Many Lines Should Your Email Signature Be?",
    description:
      "The definitive answer: 3–5 lines. Here's exactly what each line should say, why shorter is better, and when more is actually acceptable.",
    category: "Best Practices",
    date: "March 2026",
    readTime: "7 min read",
  },
  {
    slug: "email-signature-trends-2026",
    title: "Email Signature Trends in 2026 — What's Changed",
    description:
      "What's actually trending in email signatures in 2026 — and what's fading out. Dark mode, minimal design, Calendly links, AI layouts, QR codes, and what to ditch.",
    category: "Best Practices",
    date: "March 2026",
    readTime: "10 min read",
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
