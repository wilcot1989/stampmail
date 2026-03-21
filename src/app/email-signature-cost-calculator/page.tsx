import type { Metadata } from "next";
import Link from "next/link";
import { FAQStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";
import CostCalculator from "@/components/CostCalculator";

export const metadata: Metadata = {
  title: "Email Signature Cost Calculator for Teams | NeatStamp",
  description:
    "Use this email signature cost calculator to see how much manual management costs your team in IT hours — and how fast NeatStamp pays for itself.",
  alternates: {
    canonical: "https://neatstamp.com/email-signature-cost-calculator",
  },
};

const faqs = [
  {
    q: "How much does manual email signature management actually cost?",
    a: "More than most IT managers expect. The cost adds up from three main sources: time spent updating signatures across all employees when branding changes, time spent setting up signatures for new hires, and the hidden cost of inconsistent signatures when employees go rogue with their own formatting. For a 50-person company with a $50/hr IT rate, four signature updates per year and 12 new hires, you're looking at roughly $10,000–$14,000 annually in IT labor alone. Use the calculator above to plug in your own numbers.",
  },
  {
    q: "What does the calculator include in its cost estimate?",
    a: "Two main categories: signature update cost (how long it takes to deploy an update across all employees, multiplied by how many times you do it per year) and new hire onboarding cost (how long it takes to set up a proper signature for each new employee). It doesn't try to quantify the brand inconsistency problem — employees using old logos, wrong phone numbers, or completely custom formatting — but that's a real cost too, it's just harder to put a number on.",
  },
  {
    q: "How does NeatStamp's flat-fee pricing compare to per-user tools like Exclaimer?",
    a: "The difference is significant for small and mid-size teams. Exclaimer charges roughly $2–6 per user per month, which means a 25-person team pays $600–$1,800 per year just for the software. NeatStamp charges $29/month flat for up to 25 users — that's $348/year regardless of headcount. CodeTwo is cheaper at around $1.11/user/month, but you're still paying per seat, so as your team grows, so does your bill. NeatStamp's flat fee means adding your 10th or 25th employee costs you nothing extra.",
  },
  {
    q: "At what company size does a signature management tool pay for itself?",
    a: "For most companies, even a handful of employees. If your IT person spends two hours updating signatures for a 10-person team four times per year, that's 80 hours — probably more than the annual cost of a basic signature tool. The ROI gets more obvious as team size grows. The calculator above shows you exactly when NeatStamp pays for itself based on your own numbers, but for most teams it's within a few weeks of the first signature update.",
  },
  {
    q: "What's the difference between NeatStamp's $29/mo and $59/mo plans?",
    a: "The $29/month plan covers up to 25 users. The $59/month plan covers up to 100 users. Both plans include the same features: team template management, install guides for Outlook and Gmail, custom branding, and the signature editor. There's no per-user fee on either plan — you pay the flat rate and add as many team members as the plan allows. For companies over 100 users, pricing is custom.",
  },
  {
    q: "Does the calculator account for the cost of brand inconsistency?",
    a: "Not directly — it's hard to put an exact number on it. What the calculator measures is pure IT labor: the time your team spends creating, updating, and deploying signatures. The cost of inconsistency (employees using outdated logos, wrong contact info, or completely custom formatting they put together themselves) is separate and usually invisible until a client notices it or a rebrand leaves half your team with the old logo for six months. That's a real business cost, just not one you can calculate precisely.",
  },
];

const relatedLinks = [
  { href: "/email-signature-for-teams", label: "Email Signatures for Teams" },
  { href: "/outlook-signature-for-company", label: "Outlook Signature for Company" },
  {
    href: "/blog/microsoft-365-email-signature-management",
    label: "Microsoft 365 Signature Management",
  },
  {
    href: "/blog/outlook-signature-deployment-guide",
    label: "Outlook Signature Deployment Guide",
  },
  {
    href: "/blog/email-signature-for-remote-teams-outlook",
    label: "Email Signatures for Remote Teams",
  },
  { href: "/alternative-to-exclaimer", label: "Exclaimer Alternative" },
  { href: "/alternative-to-codetwo", label: "CodeTwo Alternative" },
  {
    href: "/blog/email-signature-company-wide-management",
    label: "Company-Wide Email Signature Management",
  },
  { href: "/email-signature-outlook", label: "Outlook Email Signature Guide" },
  { href: "/email-signature-mobile-friendly", label: "Mobile-Friendly Email Signatures" },
  { href: "/pricing", label: "NeatStamp Pricing" },
];

export default function EmailSignatureCostCalculatorPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Cost Calculator",
            url: "https://neatstamp.com/email-signature-cost-calculator",
          },
        ]}
      />

      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-700">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">Cost Calculator</span>
            </nav>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Email Signature Cost Calculator for Teams
            </h1>

            <p className="mt-5 text-xl text-slate-600 leading-relaxed max-w-3xl">
              Managing email signatures manually costs more than most companies realize. IT time,
              inconsistent branding, onboarding delays — it adds up. Use this calculator to see
              exactly how much your company spends on manual signature management, and how much you
              could save with NeatStamp.
            </p>

            <p className="mt-4 text-base text-slate-500 max-w-3xl">
              The numbers are straightforward: every time your brand changes, someone has to update
              signatures across your whole team. Every new hire needs a signature set up correctly.
              Every employee who goes off-template with their own formatting is a support ticket
              waiting to happen. None of this shows up on a line item in your IT budget — it just
              disappears into the week. This calculator makes those hours visible.
            </p>

            <p className="mt-4 text-base text-slate-500 max-w-3xl">
              Enter your team size, IT hourly rate, and how often signatures change. The calculator
              shows your current annual cost in labor, compares it against NeatStamp and the main
              alternatives, and tells you exactly how long before the tool pays for itself. Most
              teams find the break-even point is less than two months. Once you see the numbers,{" "}
              <Link href="/editor" className="text-blue-600 hover:underline">
                try the NeatStamp editor free
              </Link>{" "}
              — no account needed.
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <CostCalculator />
        </div>

        {/* Why companies switch */}
        <div className="bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why companies switch from manual to managed
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              The frustration isn't usually one big thing. It's the same small annoyances showing
              up over and over.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">
                    Every rebrand turns into a two-day IT project.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    New logo? Updated tagline? Changed phone number? Someone has to manually update
                    every employee's signature, in every email client, on every device. With a 30-person
                    team, that's 30 individual signatures to touch. With a 100-person team, it's a
                    week of work.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">
                    New hires send emails with broken signatures on day one.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    The onboarding checklist has twenty things on it. Signature setup is item
                    seventeen. Half the time it gets skipped or done wrong. The new hire sends
                    client emails for two weeks with a plain-text footer that says "Sent from
                    Outlook." It's small, but clients notice.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">
                    Employees customize their own signatures.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Some add inspirational quotes. Some change the font to something their IT team
                    has never heard of. Some add five lines of awards. You have one brand and twelve
                    different signature styles. There's no good way to fix this without a central
                    management system.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">
                    Mobile signatures are always out of sync.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    You update the Outlook desktop signature. Three months later you realize half
                    your team uses Outlook mobile and the mobile signature hasn't been touched since
                    2021. Same problem, separate fix. Multiply by Gmail, Apple Mail, and whatever
                    else your team uses.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">
                    There's no visibility into who has which version.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    You pushed an update six weeks ago. Did everyone install it? You don't know
                    without asking each person individually. Managed tools give you a dashboard.
                    Manual management gives you hope.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* How NeatStamp compares */}
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            How NeatStamp compares
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            There are three main options for managing signatures across a team. Here's the honest
            breakdown.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Tool</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Pricing</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Best for</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Watch out for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-emerald-50">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    NeatStamp
                    <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      flat fee
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    $29/mo (up to 25 users)
                    <br />
                    <span className="text-slate-400">$59/mo (up to 100 users)</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    Small and mid-size teams that want central control without per-seat pricing
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    No server-side deployment; employees install signatures in their own clients
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900">Exclaimer</td>
                  <td className="px-4 py-3 text-slate-700">
                    ~$2–6/user/mo
                    <br />
                    <span className="text-slate-400">10-user minimum</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    Enterprises with IT staff, Active Directory, and 50+ users
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    High cost at scale, complex setup, minimum user requirement
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900">CodeTwo</td>
                  <td className="px-4 py-3 text-slate-700">
                    ~$1.11/user/mo
                    <br />
                    <span className="text-slate-400">Microsoft 365 only</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    Microsoft 365 shops that want server-side signature deployment
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    Per-user cost grows with team; Microsoft-only; steeper learning curve
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            The right choice depends on your team size and how much control you need. For a
            10-person team, NeatStamp saves hundreds per year vs. Exclaimer. For a 500-person
            enterprise that needs server-side Active Directory sync, Exclaimer is probably worth the
            cost. The calculator above shows the exact numbers for your situation.
          </p>
        </div>

        {/* Related guides */}
        <div className="bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900">Related guides</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                <h3 className="text-base font-semibold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to stop paying for manual signature management?
            </h2>
            <p className="mt-4 text-blue-100 text-base max-w-xl mx-auto">
              NeatStamp starts at $29/month for up to 25 users. No per-seat fees. No minimum
              commitment. Try the editor free — no account needed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
              >
                See pricing
              </Link>
              <Link
                href="/editor"
                className="rounded-xl border border-blue-400 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Try the editor free
              </Link>
            </div>
            <p className="mt-4 text-xs text-blue-200">
              Set up your whole team in under 10 minutes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
