import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Onboarding for New Employees (2026)",
  description:
    "How IT and HR teams set up email signatures for new hires. Manual process, CSV import, master templates, and automated deployment — with real examples.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-onboarding-employees",
  },
};

const faqs = [
  {
    q: "How long does it take to set up signatures for new employees manually?",
    a: "For a single new hire, the manual process (IT creates the template, customises it with the employee's details, sends it to them, guides them through installation) typically takes 20–45 minutes of combined IT and employee time. For 10 new starters in the same week, that's 3–7 hours of work that could be automated.",
  },
  {
    q: "Can we use a CSV file to set up signatures for multiple employees at once?",
    a: "Yes. NeatStamp's team plan supports CSV import. You upload a spreadsheet with columns for each employee's name, title, email, phone, and department, and NeatStamp generates a customised signature for each person automatically. This works well for bulk onboarding after an acquisition or new office opening.",
  },
  {
    q: "What's the best way to ensure new employees actually use the official signature?",
    a: "The most reliable method is server-side signature management, where the signature is appended at the mail server level and employees can't opt out. For Microsoft 365, this is done through transport rules or tools like Exclaimer. For Gmail, you can use Google Workspace's admin-enforced signature feature or deploy signatures via the Gmail API with admin credentials. NeatStamp's team plan supports Gmail API deployment that employees can't easily override.",
  },
  {
    q: "Should we include the employee's photo in the onboarding signature?",
    a: "It depends on your company policy and the role. For customer-facing roles (sales, account management, support), photos significantly improve response rates. For internal IT staff or back-office roles, it's less critical. If you include photos, establish a clear submission process as part of onboarding — ask for a headshot during the first week, with specific size and format requirements.",
  },
  {
    q: "How do we handle signature updates when company information changes?",
    a: "This is where a centralised signature management tool pays for itself. With NeatStamp's team plan, you update the master template once and push the change to everyone's signature. Without a centralised tool, you'd need to contact every employee individually, which is practically impossible to execute consistently.",
  },
];

export default function EmailSignatureOnboardingEmployeesPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature Onboarding for New Employees",
            url: "https://neatstamp.com/blog/email-signature-onboarding-employees",
          },
        ]}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-700 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-700">Employee Signature Onboarding</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                  IT &amp; HR
                </span>
                <span className="text-sm text-slate-400">13 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature Onboarding for New Employees: The IT Guide
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Every new employee sends emails from day one. But email signatures are almost always
                an afterthought in onboarding checklists — something IT handles manually, or employees
                sort out themselves with inconsistent results. Here&rsquo;s how to fix that process,
                from a basic manual approach to fully automated deployment.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 13 min read
              </p>
            </header>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#onboarding-gap", "The onboarding gap nobody talks about"],
                  ["#why-it-matters", "Why consistent signatures matter for the business"],
                  ["#manual-approach", "The manual approach (and its limits)"],
                  ["#automated-approach", "The automated approach"],
                  ["#csv-import", "CSV import for bulk onboarding"],
                  ["#deployment-options", "Deployment options by email platform"],
                  ["#neatstamp-teams", "NeatStamp for teams"],
                  ["#checklist", "IT onboarding checklist"],
                  ["#faq", "Frequently asked questions"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-blue-600 hover:text-blue-800 hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1 */}
            <section id="onboarding-gap" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The onboarding gap nobody talks about
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                New employee onboarding checklists are thorough about hardware, software licences,
                access credentials, and compliance training. Email signatures rarely appear until
                someone in leadership gets a forwarded email from a new hire that says &ldquo;Best,
                Alex&rdquo; with no company logo, no title, and a personal Gmail address in the footer.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                It&rsquo;s a small thing that signals something larger: the company hasn&rsquo;t thought
                through its professional presentation at the individual employee level. And it
                compounds over time. New starters who set up their own signatures create variations
                that drift further from brand guidelines with every iteration.
              </p>

              <div className="bg-slate-50 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  What the typical unmanaged signature situation looks like after 2 years
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {[
                    "5 different logo versions (two of them outdated)",
                    "3 different phone number formats",
                    "No consistent social links — some have LinkedIn, some have Twitter, some have both, many have neither",
                    "2 employees still using the old company address from before the office move",
                    "1 employee with a motivational quote that makes clients uncomfortable",
                    "Several employees with no signature at all",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed">
                This isn&rsquo;t a hypothetical. This is the state of email signatures at most
                companies that don&rsquo;t actively manage them. The fix is integrating signature
                setup into the onboarding process — ideally automated, but even a well-documented
                manual process is better than nothing.
              </p>
            </section>

            {/* Section 2 */}
            <section id="why-it-matters" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why consistent signatures matter for the business
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Beyond aesthetics, inconsistent signatures create real business problems.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Legal and compliance requirements
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                In the UK, the Companies Act 2006 requires all company emails to include the
                company&rsquo;s full registered name, registered number, registered office address,
                and place of registration. Similar requirements exist in Germany, France, Australia,
                and other jurisdictions. An employee who sends emails without these details creates
                a compliance risk — even if they&rsquo;re just sending a casual reply.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For regulated industries — financial services, healthcare, legal — the requirements
                are stricter. FCA-regulated firms may need specific disclosures. HIPAA-covered
                entities need appropriate privacy notices. These can&rsquo;t be optional.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Brand consistency across every email thread
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The average business email is replied to by 3–5 people before a thread closes.
                Each reply appends the previous signatures. If five employees have wildly different
                signature styles, a long email thread becomes a visual patchwork that doesn&rsquo;t
                reinforce any coherent brand identity.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For client-facing teams — sales, support, account management — a consistent
                professional signature builds trust. A prospect who gets an email from a sales rep
                with a clean, branded signature is more likely to trust the company than one who
                gets a plain-text footer.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Marketing campaigns via email
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Many marketing teams now use email signatures as a distribution channel for
                banners, event announcements, and promotions. This only works if signatures are
                centrally managed. If employees can modify their own signatures, your campaign
                banner reaches 30% of recipients rather than 100%.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature guide
                </Link>{" "}
                covers the marketing use case in more depth.
              </p>
            </section>

            {/* Section 3 */}
            <section id="manual-approach" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The manual approach (and its limits)
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you&rsquo;re not ready to implement a full automated system, a structured manual process
                is still much better than leaving it to employees. Here&rsquo;s how to do it properly.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The IT-managed manual process
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Maintain a master template",
                    body: "IT keeps a master signature HTML file with placeholder variables — {first_name}, {last_name}, {job_title}, {phone_number}, etc. When a new employee starts, IT copies the template and replaces the variables with the employee's actual details.",
                  },
                  {
                    step: "2",
                    title: "Prepare the signature before day one",
                    body: "Request the employee's job title and direct phone number from HR at least 2 days before their start date. This information should be in the hiring documentation. Build the signature on day minus one so it's ready when the employee arrives.",
                  },
                  {
                    step: "3",
                    title: "Guide the employee through installation",
                    body: "On the employee's first day, have them install the signature as part of the standard workstation setup. For Gmail, this means navigating to Settings → See all settings → Signatures. For Outlook, it's File → Options → Mail → Signatures. Include this in your onboarding documentation with screenshots.",
                  },
                  {
                    step: "4",
                    title: "Verify before end of week one",
                    body: "Ask the new employee to send you a test email on their first or second day. Check that the signature renders correctly — logo displays, links work, phone number is tappable. This catches installation errors before they send 50 emails with a broken signature.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Where manual processes break down
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-slate-600">
                {[
                  "Scale: works fine for 2–3 new starters per month, becomes unsustainable at 10+ per month.",
                  "Consistency: each time IT manually edits the template, small variations creep in.",
                  "Updates: when the company phone number, address, or logo changes, you need to contact every employee and guide them through updating their signature manually.",
                  "Remote onboarding: harder to verify and troubleshoot over video call.",
                  "Employee modifications: nothing stops employees from editing their signature after installation.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4 */}
            <section id="automated-approach" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The automated approach
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Automated signature management replaces the IT-manual-edit workflow with a system
                where employee data flows directly into signature generation. The key components are
                a central template, a data source, and a deployment mechanism.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How automation works end to end
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The basic flow looks like this:
              </p>
              <div className="bg-slate-50 rounded-xl p-5 mb-6">
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Data source", value: "HR system / Active Directory / Google Workspace directory" },
                    { label: "Template", value: "Centralised master template with variable placeholders" },
                    { label: "Generation", value: "Automated merge of employee data into template" },
                    { label: "Deployment", value: "Push to email client via API, transport rule, or install link" },
                    { label: "Updates", value: "Any change to template or employee data triggers re-generation" },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-3 text-sm">
                      <span className="font-semibold text-slate-700 w-28 flex-shrink-0">{row.label}</span>
                      <span className="text-slate-600">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                When a new employee is added to your HR system or Google Workspace directory, the
                signature management tool detects the new account and generates their signature
                automatically. If your system is integrated with a deployment mechanism, the
                signature can be pushed to their email account without any IT action required.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What triggers signature regeneration
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Good automation systems don&rsquo;t just handle new hires — they respond to data
                changes. Triggers that should automatically regenerate and redeploy signatures:
              </p>
              <ul className="space-y-2 mb-4 text-sm text-slate-600">
                {[
                  "Employee promoted or changes job title",
                  "Employee moves to a different department or office location",
                  "Employee's direct phone number changes",
                  "Company logo or branding updated",
                  "Company address or phone number changes",
                  "New banner or marketing campaign added to the template",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 5 */}
            <section id="csv-import" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                CSV import for bulk onboarding
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you don&rsquo;t have full API integration with your HR system, CSV import is the
                practical middle ground. You export a spreadsheet from your HR system, upload it
                to your signature management tool, and it generates signatures in bulk.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What your CSV needs to include
              </h3>
              <div className="bg-slate-50 rounded-xl p-5 mb-6 overflow-x-auto">
                <table className="text-xs text-slate-700 w-full">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="text-left pb-2 pr-4 font-semibold">Column</th>
                      <th className="text-left pb-2 pr-4 font-semibold">Example value</th>
                      <th className="text-left pb-2 font-semibold">Required?</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    {[
                      ["email", "sarah.jones@company.com", "Yes"],
                      ["first_name", "Sarah", "Yes"],
                      ["last_name", "Jones", "Yes"],
                      ["job_title", "Senior Account Manager", "Yes"],
                      ["phone", "+44 20 1234 5678", "Recommended"],
                      ["department", "Sales", "Optional"],
                      ["office_location", "London", "Optional"],
                      ["linkedin_url", "https://linkedin.com/in/sarahjones", "Optional"],
                    ].map(([col, example, req]) => (
                      <tr key={col} className="border-b border-slate-100">
                        <td className="py-2 pr-4">
                          <code className="font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                            {col}
                          </code>
                        </td>
                        <td className="py-2 pr-4 text-slate-500">{example}</td>
                        <td className="py-2 text-slate-500">{req}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Common CSV data quality issues
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The most frequent problems when importing from HR systems:
              </p>
              <ul className="space-y-2 mb-4 text-sm text-slate-600">
                {[
                  "Phone numbers in inconsistent formats — some with country code, some without, some with spaces, some with hyphens. Standardise to E.164 format (+44...) before import.",
                  "Job titles with non-standard capitalisation — 'senior account manager' vs 'Senior Account Manager'. Your signature template should display the title as-entered, so clean the data first.",
                  "Missing LinkedIn URLs — decide before import whether to include a placeholder, leave blank (which hides the LinkedIn icon), or omit LinkedIn from the template entirely.",
                  "Email addresses that don't match the actual account — happens often with aliases. The email in your CSV should match the account you're deploying the signature to.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 6 */}
            <section id="deployment-options" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Deployment options by email platform
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                How you deploy signatures depends on which email platform your company uses. Here
                are the main options for each.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    Google Workspace / Gmail
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                    Google Workspace offers three deployment approaches:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 mb-3">
                    {[
                      "Gmail API deployment: Use the Gmail API with service account credentials to write signatures directly to user accounts. Requires enabling the API in Google Admin Console and granting domain-wide delegation. NeatStamp's team plan uses this approach.",
                      "Admin-enforced signatures: Google Workspace Business Plus and Enterprise plans include a native signature management feature in the Admin Console (Google Workspace → Apps → Gmail → Compliance → Routing and Signature). Limited template flexibility but zero third-party dependency.",
                      "Self-install with install link: Generate a signature for each employee and provide them a one-click install link. Requires the employee to click and authorise — more friction, but works on any Workspace plan.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    For the full Gmail installation process, see the{" "}
                    <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">
                      Gmail signature guide
                    </Link>
                    .
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    Microsoft 365 / Outlook
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-3 text-sm">
                    Microsoft 365 has two fundamentally different signature deployment approaches:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 mb-3">
                    {[
                      "Client-side signatures: Stored in each user's Outlook profile. Employees see the signature when composing. Easy to set up but employees can modify them.",
                      "Server-side (transport rules): Appended to emails at the Exchange Online level, after the email leaves the client. Employees don't see it in their compose window, but it's guaranteed to appear on every outbound email and can't be removed by the employee. This requires Exchange Online transport rules or a third-party tool like Exclaimer or CodeTwo.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    For client-side Outlook signatures, the{" "}
                    <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">
                      Outlook signature guide
                    </Link>{" "}
                    covers the installation process in detail.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="neatstamp-teams" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                NeatStamp for teams
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                NeatStamp&rsquo;s{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  team plan
                </Link>{" "}
                is built around the onboarding workflow described above. Here&rsquo;s what it
                provides for IT teams managing signature rollouts.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    feature: "Master template management",
                    detail: "Create one template that applies to all employees. Update the template once and the change pushes to everyone. Templates support all standard variables plus conditional blocks (e.g., show a regional phone number only for London-based employees).",
                  },
                  {
                    feature: "CSV import and bulk generation",
                    detail: "Upload a CSV of employee data and NeatStamp generates customised signatures for every row. You can preview each signature before deployment and catch data quality issues before they reach 300 inboxes.",
                  },
                  {
                    feature: "Gmail API deployment",
                    detail: "Connect your Google Workspace account with domain-wide delegation and NeatStamp can push signatures to employee Gmail accounts without employees having to take any action. New employees added to Workspace can have signatures deployed automatically within minutes.",
                  },
                  {
                    feature: "Department-specific templates",
                    detail: "Different teams can have different signature designs or content — sales can have a CTA banner, legal can have a mandatory disclaimer, IT can have a plain minimal signature. All managed from a single dashboard.",
                  },
                  {
                    feature: "Audit log",
                    detail: "See which employees have the current signature version installed and which are running old versions. Useful after a rebrand or address change to confirm the update reached everyone.",
                  },
                ].map((item) => (
                  <div key={item.feature} className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.feature}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                The{" "}
                <Link href="/blog/email-signature-company-wide-management" className="text-blue-600 hover:underline">
                  company-wide signature management guide
                </Link>{" "}
                covers the broader strategy for managing signatures across a whole organisation, beyond
                just the onboarding piece. To see how templates look before building, the{" "}
                <Link href="/templates" className="text-blue-600 hover:underline">
                  template library
                </Link>{" "}
                has options by department and role. For team plan pricing, see the{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  pricing page
                </Link>
                . When you&rsquo;re ready to build the master template,{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  open the editor
                </Link>{" "}
                — it&rsquo;s free and a good base takes about 5 minutes.
              </p>
            </section>

            {/* Section 8 — Checklist */}
            <section id="checklist" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                IT onboarding checklist for email signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Use this checklist as a starting point for building your onboarding process. Adapt
                it to your specific platform and tooling.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <p className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                  Before employee start date
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Confirm final job title with HR (titles change between offer and start date)",
                    "Confirm direct phone number (or use department number if no direct line yet)",
                    "Confirm office location if multiple sites have different contact details",
                    "Generate signature from master template with employee's data",
                    "Preview signature in at least one email client before deployment",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 w-4 h-4 border border-slate-300 rounded flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                  On day one
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Deploy signature to email client (API push, or guide employee through install)",
                    "Set signature as default for both new emails AND replies",
                    "Ask employee to send a test email to IT",
                    "Verify logo renders, links work, phone number is correctly formatted",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 w-4 h-4 border border-slate-300 rounded flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                  Ongoing
                </p>
                <ul className="space-y-2">
                  {[
                    "Add signature onboarding to the IT onboarding runbook",
                    "Include signature in the offboarding checklist (deactivate when employee leaves)",
                    "Review master template quarterly for accuracy",
                    "Set up alerts for when employees modify their signatures (if your tool supports it)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 w-4 h-4 border border-slate-300 rounded flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border border-slate-200 rounded-xl"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                      {faq.q}
                      <svg
                        className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Set up signatures for your whole team
              </h2>
              <p className="text-teal-100 text-sm mb-6 max-w-md mx-auto">
                NeatStamp&rsquo;s team plan handles CSV import, bulk generation, and Gmail API
                deployment. Build the master template for free.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/editor"
                  className="inline-block px-8 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
                >
                  Start Building — Free
                </Link>
                <Link
                  href="/email-signature-for-teams"
                  className="inline-block px-8 py-3 bg-transparent text-white border border-white/30 font-semibold rounded-lg hover:border-white/60 transition-colors"
                >
                  View Team Plan
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
