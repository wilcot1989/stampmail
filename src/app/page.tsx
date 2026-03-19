import Link from "next/link";
import type { Metadata } from "next";
import { EmailClientGrid } from "@/components/EmailClientLogos";
import { generateSignatureHtml } from "@/lib/generateSignature";
import { DEFAULT_SIGNATURE_DATA } from "@/lib/types";

export const metadata: Metadata = {
  title: "Free Email Signature Generator | NeatStamp — Actually Free",
  description:
    "Create a professional email signature in 60 seconds. Free forever — no account, no credit card. Works in Gmail, Outlook & 30+ email clients.",
  alternates: { canonical: "https://neatstamp.com" },
};

function CheckIcon({ className = "h-5 w-5 text-emerald-500" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Freelance Designer",
    image: "/images/avatar-1.jpg",
    quote: "Finally an email signature generator that's actually free. No bait-and-switch. I had my signature ready in under a minute.",
  },
  {
    name: "Marcus Johnson",
    role: "Sales Director, TechFlow",
    image: "/images/avatar-2.jpg",
    quote: "We switched our entire team from WiseStamp. The Outlook compatibility alone was worth it — no more broken signatures.",
  },
  {
    name: "Emma Rodriguez",
    role: "Real Estate Agent",
    image: "/images/avatar-3.jpg",
    quote: "I was putting off updating my signature for months. NeatStamp took me literally 45 seconds. My clients started complimenting it the same day.",
  },
];


export default function HomePage() {
  const sampleSignatureHtml = generateSignatureHtml({
    ...DEFAULT_SIGNATURE_DATA,
    template: "modern",
    primaryColor: "#2563eb",
    accentColor: "#f59e0b",
  });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="relative mx-auto max-w-screen-2xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm font-medium text-emerald-700">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                Free forever — no credit card required
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Free email signature
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  generator.
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
                Create beautiful, Outlook-proof email signatures in 60 seconds.
                No account needed. No paywall. Just paste and go.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/editor"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 transition-all"
                >
                  Create Your Signature
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <span className="text-sm text-slate-500">
                  Free forever. Ready in 60 seconds.
                </span>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["/images/social-1.jpg", "/images/social-2.jpg", "/images/social-3.jpg", "/images/social-4.jpg"].map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <StarRating />
                  <p className="text-sm text-slate-500">
                    Loved by <strong className="text-slate-700">2,000+</strong> professionals
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl bg-white p-3 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
                <img
                  src="/images/hero.jpg"
                  alt="Professional using email on laptop"
                  className="rounded-xl object-cover w-full"
                  width={600}
                  height={400}
                />
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-lg ring-1 ring-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                      <CheckIcon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Outlook-proof</p>
                      <p className="text-xs text-slate-500">Works in 30+ email clients</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 rounded-xl bg-white px-4 py-2 shadow-lg ring-1 ring-slate-100">
                  <p className="text-xs font-semibold text-emerald-600">100% Free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEE IT IN ACTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">See it in action</p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              This is what you&apos;ll get.
            </h2>
            <p className="mt-3 text-lg text-slate-500">
              A real signature, rendered exactly as it appears in Gmail and Outlook.
            </p>
          </div>
          {/* Email compose window mockup */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Window chrome */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-medium text-slate-500">New Message</span>
            </div>
            {/* Email header fields */}
            <div className="border-b border-slate-100 divide-y divide-slate-100 text-sm">
              <div className="flex items-center px-5 py-2.5 gap-3">
                <span className="text-slate-400 font-medium w-14 flex-shrink-0">From:</span>
                <span className="text-slate-700">Alex Johnson &lt;alex@acmecorp.com&gt;</span>
              </div>
              <div className="flex items-center px-5 py-2.5 gap-3">
                <span className="text-slate-400 font-medium w-14 flex-shrink-0">To:</span>
                <span className="text-slate-700">client@company.com</span>
              </div>
              <div className="flex items-center px-5 py-2.5 gap-3">
                <span className="text-slate-400 font-medium w-14 flex-shrink-0">Subject:</span>
                <span className="text-slate-700 font-medium">Following up on our meeting</span>
              </div>
            </div>
            {/* Email body */}
            <div className="px-5 pt-5 pb-4">
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Thanks for the meeting. Let me know if you have questions.
              </p>
              {/* Divider before signature */}
              <div className="border-t border-slate-100 pt-4">
                <div
                  dangerouslySetInnerHTML={{ __html: sampleSignatureHtml }}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
          {/* CTA below mockup */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <span className="text-sm font-medium text-slate-500 italic">
              This took 60 seconds to create →
            </span>
            <Link
              href="/editor"
              className="inline-flex items-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all"
            >
              Create Yours Free
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUSTED BY / EMAIL CLIENTS */}
      <section className="border-y border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">
            Works perfectly in every email client
          </p>
          <EmailClientGrid />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Three steps. Sixty seconds. Done.
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              No account. No learning curve. No nonsense.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Enter your details",
                description: "Name, title, email, phone, socials — just fill in what you want to show.",
                image: "/images/step-1.jpg",
              },
              {
                step: "02",
                title: "Pick a design",
                description: "Choose from 5 free templates. Customize colors to match your brand.",
                image: "/images/step-2.jpg",
              },
              {
                step: "03",
                title: "Copy & paste",
                description: "One click to copy. Paste into Gmail, Outlook, or any email client.",
                image: "/images/step-3.jpg",
              },
            ].map((item) => (
              <div key={item.step} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/editor"
              className="inline-flex items-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all"
            >
              Start Creating — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET FOR FREE */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Free tier</p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              What you get for free.
            </h2>
            <p className="mt-3 text-lg text-slate-500">No credit card. No time limit. No catch.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              "5 professional templates",
              "Custom brand colors",
              "Photo & logo upload",
              "Social media links",
              "Outlook-proof HTML",
              "One-click copy",
              "Mobile responsive",
              "No account needed",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white px-4 py-4 shadow-sm ring-1 ring-slate-100"
              >
                <span className="flex-shrink-0 mt-0.5">
                  <CheckIcon className="h-5 w-5 text-emerald-500" />
                </span>
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-semibold text-slate-500">
            No credit card. No time limit. No catch.
          </p>
        </div>
      </section>

      {/* WHY NEATSTAMP — with photo */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Why NeatStamp</p>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Built to fix everything wrong with email signature generators.
              </h2>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                Competitors charge hidden fees, break in Outlook, and make it impossible to cancel. We do things differently.
              </p>
              <div className="mt-10 space-y-6">
                {[
                  { title: "Actually free", desc: "No account. No credit card. No paywall after you've designed your signature." },
                  { title: "Outlook-proof", desc: "Table-based HTML that works in Outlook, Gmail, Apple Mail, and 30+ clients." },
                  { title: "Privacy-first", desc: "Your data stays in your browser. We don't store anything on our servers." },
                  { title: "60-second setup", desc: "Three steps, no onboarding wizard. Fill in, pick design, copy and paste." },
                  { title: "Cancel anytime", desc: "Pro can be cancelled in 2 clicks. 30-day money-back guarantee." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/why-neatstamp.jpg"
                alt="Team collaborating on email branding"
                className="rounded-2xl shadow-2xl object-cover w-full"
              />
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <StarRating />
                </div>
                <p className="text-sm text-slate-600 italic">
                  &ldquo;We switched from WiseStamp and never looked back. The Outlook compatibility is perfect.&rdquo;
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-900">— Marcus J., Sales Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Comparison</p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              See why professionals are switching.
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-left font-medium text-slate-500">Feature</th>
                  <th className="py-4 px-6 text-center font-bold text-blue-600 bg-blue-50">NeatStamp</th>
                  <th className="py-4 px-6 text-center font-medium text-slate-500">WiseStamp</th>
                  <th className="py-4 px-6 text-center font-medium text-slate-500">MySignature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { feature: "Free tier (no catch)", us: true, wise: false, my: false },
                  { feature: "No account required", us: true, wise: false, my: false },
                  { feature: "Outlook-proof guaranteed", us: true, wise: false, my: false },
                  { feature: "Privacy-first (client-side)", us: true, wise: false, my: false },
                  { feature: "Cancel in 2 clicks", us: true, wise: false, my: true },
                  { feature: "Multiple templates", us: true, wise: true, my: true },
                  { feature: "Social media links", us: true, wise: true, my: true },
                  { feature: "Mobile responsive", us: true, wise: false, my: false },
                  { feature: "Free price", us: "$0", wise: "$0*", my: "$0*" },
                  { feature: "Pro price", us: "$5/mo", wise: "$6-10/mo", my: "$4-8/mo" },
                ].map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "" : "bg-slate-50/50"}>
                    <td className="py-3.5 px-6 text-slate-700 font-medium">{row.feature}</td>
                    <td className="py-3.5 px-6 text-center bg-blue-50/30">
                      {typeof row.us === "boolean" ? (
                        row.us ? <span className="inline-flex justify-center"><CheckIcon /></span> : <span className="inline-flex justify-center"><XIcon /></span>
                      ) : (
                        <span className="font-bold text-blue-600">{row.us}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      {typeof row.wise === "boolean" ? (
                        row.wise ? <span className="inline-flex justify-center"><CheckIcon /></span> : <span className="inline-flex justify-center"><XIcon /></span>
                      ) : (
                        <span className="text-slate-400">{row.wise}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      {typeof row.my === "boolean" ? (
                        row.my ? <span className="inline-flex justify-center"><CheckIcon /></span> : <span className="inline-flex justify-center"><XIcon /></span>
                      ) : (
                        <span className="text-slate-400">{row.my}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400 text-center">
            * Advertised as free but requires payment for essential features.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Loved by professionals worldwide.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow"
              >
                <StarRating />
                <p className="mt-4 text-slate-600 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI PRICING */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Simple, honest pricing.
            </h2>
            <p className="mt-3 text-lg text-slate-500">Start free. Upgrade when you need more.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Free */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Free</p>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">$0</p>
              <p className="text-sm text-slate-400 mb-6">Forever, no card needed</p>
              <ul className="space-y-3 mb-8">
                {[
                  "5 professional templates",
                  "Custom colors & photo",
                  "Social media links",
                  "Outlook-proof HTML export",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckIcon className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/editor"
                className="block text-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all"
              >
                Get Started Free
              </Link>
            </div>
            {/* Pro */}
            <div className="rounded-2xl border-2 border-blue-600 bg-blue-600 p-7 shadow-xl shadow-blue-600/20 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-amber-900 shadow">
                Most Popular
              </div>
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-widest mb-1">Pro</p>
              <p className="text-4xl font-extrabold text-white mb-1">$5<span className="text-xl font-medium text-blue-200">/mo</span></p>
              <p className="text-sm text-blue-200 mb-6">Cancel anytime, 30-day guarantee</p>
              <ul className="space-y-3 mb-8">
                {[
                  "15+ premium templates",
                  "Calendly booking button",
                  "CTA banners & analytics",
                  "Save & manage multiple signatures",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                    <CheckIcon className="h-4 w-4 text-blue-200 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="block text-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-all"
              >
                Upgrade to Pro
              </Link>
            </div>
            {/* Team */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Team</p>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">$3<span className="text-xl font-medium text-slate-400">/user/mo</span></p>
              <p className="text-sm text-slate-400 mb-6">Minimum 3 users</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Pro",
                  "Centralized team management",
                  "Brand consistency controls",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckIcon className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="block text-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all"
              >
                See Team Plans
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            Full details at{" "}
            <Link href="/pricing" className="text-blue-600 hover:underline font-medium">
              neatstamp.com/pricing
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is NeatStamp really free?",
                a: "Yes. The free tier lets you create a professional email signature with 5 templates, custom colors, social media links, and photo upload. No account required, no credit card needed, no time limit. Free means free — forever.",
              },
              {
                q: "Will my signature work in Outlook?",
                a: "Yes. NeatStamp signatures use table-based HTML and inline CSS — the gold standard for email client compatibility. Guaranteed to look correct in Outlook (desktop, web, and mobile), Gmail, Apple Mail, Yahoo Mail, and 30+ other clients.",
              },
              {
                q: "Do you store my personal data?",
                a: "No. The free version runs entirely in your browser. Your name, email, phone number, and photo never leave your device. No tracking, no data collection, no third-party sharing.",
              },
              {
                q: "How do I add the signature to my email?",
                a: "Click 'Copy Signature', then paste it into your email client's signature settings. Gmail: Settings → See all settings → Signature → Paste. Outlook: File → Options → Mail → Signatures → Paste.",
              },
              {
                q: "What's included in the Pro plan?",
                a: "Pro ($5/month) adds 15+ premium templates, Calendly booking buttons, CTA banners, multiple signatures, click analytics, and the ability to save your signatures. Cancel anytime in 2 clicks. 30-day money-back guarantee.",
              },
              {
                q: "What makes NeatStamp different from competitors?",
                a: "NeatStamp is genuinely free (no paywall tricks), privacy-first (no data stored on servers), and Outlook-proof (guaranteed to work everywhere). We also offer easy cancellation and a 30-day money-back guarantee — unlike competitors with 53% one-star reviews for subscription traps.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-base font-semibold text-slate-900">
                  {faq.q}
                  <svg className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-slate-500 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Ready to make a
            <br />
            great first impression?
          </h2>
          <p className="mt-6 text-xl text-blue-100">
            Join thousands of professionals who use NeatStamp.
          </p>
          <Link
            href="/editor"
            className="mt-10 inline-flex items-center rounded-full bg-white px-10 py-4 text-lg font-semibold text-blue-600 shadow-xl hover:bg-slate-50 transition-all"
          >
            Create Your Free Signature
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-blue-200">
            No account needed. Free forever.
          </p>
        </div>
      </section>
    </>
  );
}
