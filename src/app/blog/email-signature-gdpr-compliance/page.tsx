import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature GDPR Compliance: What You Need to Know",
  description:
    "GDPR rules for email signatures — privacy policy links, tracking pixels, hosted images, data processing. Compliance checklist included.",
  alternates: {
    canonical: "https://neatstamp.com/blog/email-signature-gdpr-compliance",
  },
};

const faqs = [
  {
    q: "Does a tracking pixel in my email signature violate GDPR?",
    a: "Tracking pixels that record when a recipient opens your email are almost certainly a GDPR violation for B2C communications and for B2B communications involving EU/UK individuals. They process personal data (IP address, device info, location) without explicit consent. Most email signature tools that include open-tracking pixels are operating in a grey area at best. You should either remove them or obtain explicit consent before sending emails with tracking enabled.",
  },
  {
    q: "Do I need to include my company's privacy policy in every email signature?",
    a: "There's no strict legal requirement to include a privacy policy link in every email signature under GDPR. However, it's considered best practice for outbound B2C emails, and it's required if you're collecting any personal data through the interaction (e.g., the email is part of a marketing campaign). For internal emails, a privacy policy link in the signature is usually unnecessary.",
  },
  {
    q: "Are email signature images that load from an external server a GDPR risk?",
    a: "They can be. When a recipient opens an email with an externally hosted image, their email client makes an HTTP request to load that image. That request logs the recipient's IP address on the hosting server. Under GDPR, IP addresses are personal data. However, the practical risk is low if: (a) you're not logging or processing those requests, (b) your hosting provider is GDPR-compliant, and (c) you're not using that data to track individuals. NeatStamp's CDN is GDPR-compliant and doesn't log individual image load events for tracking purposes.",
  },
  {
    q: "What should a GDPR-compliant legal disclaimer in an email signature say?",
    a: "A standard GDPR-aware disclaimer typically states: (1) the email is confidential and intended only for the named recipient, (2) the sender's company name, registered address, and registration number, (3) a link to the company privacy policy, and (4) any sector-specific required notices. Keep it concise — a 200-word legal block at the bottom of every email is ineffective and often counterproductive.",
  },
  {
    q: "Does GDPR apply to email signatures on internal emails?",
    a: "Technically yes — GDPR applies to any processing of EU/UK personal data, including data in internal emails. In practice, the risk exposure for internal email signatures is very low, and GDPR enforcement has not targeted internal email practices. The main thing to avoid on internal emails is including employee personal data that isn't necessary (e.g., full home address, personal phone number) without a lawful basis.",
  },
];

export default function EmailSignatureGdprCompliancePage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Blog", url: "https://neatstamp.com/blog" },
          {
            name: "Email Signature GDPR Compliance",
            url: "https://neatstamp.com/blog/email-signature-gdpr-compliance",
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
            <span className="text-slate-700">Email Signature GDPR Compliance</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  Legal &amp; Compliance
                </span>
                <span className="text-sm text-slate-400">14 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Email Signature GDPR Compliance: What EU and UK Businesses Actually Need to Do
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                GDPR creates specific obligations around email signatures that most businesses
                haven&rsquo;t thought through. This guide covers what the regulation actually requires,
                the five most common violations, how to handle tracking pixels, hosted images, and
                consent, and a practical compliance checklist you can use today.
              </p>
              <p className="text-sm text-slate-500">
                By the NeatStamp Team &middot; Updated March 2026 &middot; 14 min read
              </p>
            </header>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
              <p className="text-sm text-amber-800 leading-relaxed">
                <span className="font-semibold">Legal disclaimer:</span> This article is for
                informational purposes and does not constitute legal advice. GDPR interpretation
                varies by jurisdiction and specific circumstances. If you have specific compliance
                questions, consult a qualified data protection solicitor or your Data Protection
                Officer.
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
              <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Table of Contents
              </p>
              <ol className="space-y-2 text-sm">
                {[
                  ["#what-gdpr-requires", "What GDPR actually requires for email"],
                  ["#personal-data-in-signatures", "Personal data in your signature"],
                  ["#common-violations", "The 5 most common GDPR violations in email signatures"],
                  ["#tracking-pixels", "Tracking pixels: the compliance problem"],
                  ["#hosted-images", "Hosted images and data logging"],
                  ["#privacy-links", "Privacy policy links and consent notices"],
                  ["#disclaimer-text", "What your legal disclaimer should say"],
                  ["#compliance-checklist", "GDPR compliance checklist"],
                  ["#neatstamp-approach", "How NeatStamp handles this"],
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
            <section id="what-gdpr-requires" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What GDPR actually requires for email
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                GDPR (General Data Protection Regulation) and its UK equivalent (UK GDPR) don&rsquo;t
                contain a specific provision about email signatures. But they do apply to email
                communications because email involves the processing of personal data — and that
                includes what&rsquo;s in your signature.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The relevant GDPR principles
              </h3>
              <div className="space-y-4 mb-6">
                {[
                  {
                    principle: "Lawfulness, fairness, and transparency (Article 5(1)(a))",
                    relevance: "You need a lawful basis for processing the personal data of email recipients. For most business communications, 'legitimate interests' covers this. But if you're using tracking pixels to build profiles of recipients, that's a different and harder-to-justify basis.",
                  },
                  {
                    principle: "Data minimisation (Article 5(1)(c))",
                    relevance: "Collect and include only the personal data necessary for the purpose. This applies both to what you include in your signature (employee personal data) and what you collect about recipients through tracking.",
                  },
                  {
                    principle: "Purpose limitation (Article 5(1)(b))",
                    relevance: "Data collected through email interactions should only be used for the purpose for which it was collected. If you use signature tracking to identify which prospects opened emails, that data should only be used for that specific sales follow-up purpose, not fed into marketing profiling systems without disclosure.",
                  },
                  {
                    principle: "Accountability (Article 5(2))",
                    relevance: "You need to be able to demonstrate compliance. This means documenting your decisions about what data you process through email signatures and why.",
                  },
                ].map((item) => (
                  <div key={item.principle} className="border border-slate-200 rounded-xl p-5">
                    <h4 className="font-semibold text-slate-900 text-sm mb-2">{item.principle}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.relevance}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                GDPR vs. other regulations
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                GDPR isn&rsquo;t the only regulation relevant to email. PECR (Privacy and Electronic
                Communications Regulations) in the UK governs direct marketing emails separately from
                GDPR. ePrivacy Directive covers similar ground in the EU. For company registration
                information in signatures, the UK Companies Act 2006 applies independently of GDPR.
              </p>
              <p className="text-slate-600 leading-relaxed">
                This guide focuses on GDPR specifically. Your legal obligations may be broader
                depending on your industry and location.
              </p>
            </section>

            {/* Section 2 */}
            <section id="personal-data-in-signatures" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Personal data in your signature
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your email signature contains personal data about your employees. Under GDPR, this
                processing has its own requirements.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What counts as personal data in a signature
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Under GDPR, personal data is any information relating to an identifiable natural
                person. In a typical email signature:
              </p>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                {[
                  { item: "Name — personal data", include: true },
                  { item: "Job title — personal data (identifies the individual in professional context)", include: true },
                  { item: "Work phone number — personal data", include: true },
                  { item: "Work email address — personal data", include: true },
                  { item: "Photo / headshot — personal data (biometric data in some interpretations)", include: true },
                  { item: "LinkedIn URL — personal data", include: true },
                  { item: "Company name — not personal data on its own", include: false },
                  { item: "Company address — not personal data on its own", include: false },
                ].map((item) => (
                  <li key={item.item} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${item.include ? "bg-amber-400" : "bg-slate-300"}`} />
                    {item.item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The lawful basis for including employee data
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Including employee personal data in a business email signature is generally covered
                under the &ldquo;legitimate interests&rdquo; basis (Article 6(1)(f)) or &ldquo;performance of a contract&rdquo;
                basis (Article 6(1)(b)). The employee&rsquo;s employment contract typically grants the
                company the right to use their professional contact details for business purposes.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Best practice: include a brief mention in your employee handbook or employment
                contract stating that work contact details will be used in email communications
                and company directories. This covers you against any employee data subject request.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What not to include
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Some signature elements carry disproportionate privacy risk:
              </p>
              <ul className="space-y-2 mb-4 text-sm text-slate-600">
                {[
                  "Home address — no reason this should ever be in a work email signature",
                  "Personal mobile number — only include if it's the number the employee uses professionally",
                  "Date of birth or age — never appropriate",
                  "Health or medical information (e.g., disability accommodation notices) — very sensitive, only include with explicit consent and clear necessity",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section id="common-violations" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The 5 most common GDPR violations in email signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                These are the issues that come up most often when businesses review their email
                signature practices for GDPR compliance.
              </p>

              <div className="space-y-5">
                {[
                  {
                    number: "1",
                    title: "Undisclosed tracking pixels",
                    detail: "Open tracking pixels — tiny 1x1 images that fire when an email is opened — collect IP addresses, device information, and timestamps without the recipient's knowledge. This is arguably a violation of both GDPR (processing without consent or lawful basis) and ePrivacy Directive rules on tracking. It's also just ethically questionable: you're surveilling your email recipients without telling them. Remove tracking pixels from your signature design, or use a consent-based alternative.",
                    severity: "High",
                  },
                  {
                    number: "2",
                    title: "Logging image loads for individual tracking",
                    detail: "Some signature services log when their hosted images are loaded — in theory to confirm email delivery, in practice to build open-rate profiles of individual recipients. If your signature tool is doing this, you're processing recipient personal data (IP addresses and timestamps) without adequate lawful basis. Check your signature provider's privacy policy for this.",
                    severity: "High",
                  },
                  {
                    number: "3",
                    title: "Outdated or missing privacy policy link",
                    detail: "If your email signature includes a link to your privacy policy but the link points to an outdated page, you're misleading recipients about how their data is handled. Worse, some businesses have no privacy policy linked at all. For any business that sends marketing emails or handles EU/UK customers, a current privacy policy link is important for demonstrating transparency.",
                    severity: "Medium",
                  },
                  {
                    number: "4",
                    title: "Insufficient data processing disclosure",
                    detail: "If you use email tracking services, CRM integrations, or analytics that log interactions from email signatures (e.g., link click tracking), recipients should be informed of this in your privacy policy. Many businesses track email signature clicks (to measure marketing campaign performance) but don't mention this data collection anywhere in their privacy notices.",
                    severity: "Medium",
                  },
                  {
                    number: "5",
                    title: "Excessive personal data in signatures",
                    detail: "Including more personal employee data than necessary — full personal phone numbers, home office addresses, detailed personal bios — conflicts with GDPR's data minimisation principle. If data isn't necessary for the communication, it shouldn't be in the signature.",
                    severity: "Low",
                  },
                ].map((item) => (
                  <div key={item.number} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {item.number}. {item.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-3 ${
                        item.severity === "High"
                          ? "bg-red-100 text-red-700"
                          : item.severity === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {item.severity} risk
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 */}
            <section id="tracking-pixels" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Tracking pixels: the compliance problem
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Open tracking pixels deserve their own section because they&rsquo;re built into so many
                email signature tools and marketing platforms — often enabled by default — and the
                GDPR implications are serious.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How tracking pixels work
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                A tracking pixel is a 1x1 transparent PNG image loaded from a remote server. When
                your email is opened and images are loaded, the recipient&rsquo;s email client makes a
                request to that remote server to load the pixel. That request includes the
                recipient&rsquo;s IP address, the email client, operating system, timestamp, and
                geolocation data derived from the IP. The server logs this as an &ldquo;open event.&rdquo;
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Why this is a GDPR problem
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Under GDPR, IP addresses are personal data when they can be linked to an individual
                (Article 4(1)). Collecting this data without informing the recipient violates the
                transparency principle. Using it to build individual profiles (e.g., &ldquo;this
                contact opened our email 3 times on their iPhone in London&rdquo;) compounds the issue.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Information Commissioner&rsquo;s Office (ICO) in the UK has stated that using
                tracking technologies in emails requires either consent or a compelling legitimate
                interest where that interest overrides individual rights. For commercial tracking
                of prospects, consent is the safer basis — and most email tracking happens without
                obtaining consent.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to do
              </h3>
              <ul className="space-y-2 mb-4 text-sm text-slate-600">
                {[
                  "If you're using a signature tool with built-in open tracking, disable it unless you have a clear legitimate interest and disclosure in your privacy policy.",
                  "If you want to track email engagement, consider using it only for explicit opt-in marketing campaigns, not general business correspondence.",
                  "Review whether your signature image hosting provider logs image loads. NeatStamp's CDN does not log individual image load events for user tracking.",
                  "If you operate a sales team that relies on email open tracking for outreach, consult your DPO about whether your current disclosure and legitimate interest assessment is sufficient.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 5 */}
            <section id="hosted-images" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Hosted images and data logging
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every externally hosted image in your email signature — your logo, headshot, social
                media icons — makes an HTTP request from the recipient&rsquo;s device when the email is
                opened. That request is logged by the hosting server.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Standard server access logs
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                All web servers log HTTP requests by default. These logs include IP address,
                timestamp, requested file, HTTP status code, and user agent string. For most
                businesses, these logs are kept for operational purposes (debugging, security
                monitoring) and are not used to track individual email recipients.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Under GDPR, this standard logging is generally covered under the legitimate
                interests basis — it&rsquo;s a normal operational activity with a minimal privacy
                impact, provided the logs aren&rsquo;t used to track individuals and are deleted
                after a reasonable retention period.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                When this becomes a problem
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The line is crossed when:
              </p>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                {[
                  "Logs are analysed to identify individual recipients who opened emails",
                  "Image URLs are personalised per recipient (so each load is linked to a specific contact record)",
                  "Data is retained longer than necessary for operational purposes",
                  "Data is shared with third parties or aggregated into marketing analytics without disclosure",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Choose a signature image hosting provider that is explicit about not using access
                logs for individual tracking. For NeatStamp&rsquo;s deliverability-focused hosting
                approach, see the{" "}
                <Link href="/email-signature-deliverability" className="text-blue-600 hover:underline">
                  deliverability guide
                </Link>
                .
              </p>
            </section>

            {/* Section 6 */}
            <section id="privacy-links" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Privacy policy links and consent notices
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Including a privacy policy link in your email signature is a transparency measure
                rather than a strict legal requirement. But it&rsquo;s increasingly expected for
                businesses that send marketing or client-facing emails.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What to link to (and what not to)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Your privacy policy link should point to a page that:
              </p>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                {[
                  "Identifies your company as the data controller",
                  "Explains what data you collect through email interactions (including any tracking)",
                  "States the lawful basis for processing",
                  "Explains how long data is retained",
                  "Tells recipients how to exercise their rights (access, deletion, correction)",
                  "Includes your DPO contact details if you have one",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                Don&rsquo;t link to a generic web privacy policy that only covers your website cookies.
                If your email communications involve tracking, that tracking should be described
                specifically.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                How to display the link without cluttering the signature
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                A privacy policy link at the bottom of a signature doesn&rsquo;t need to be prominent.
                A small-text link in the disclaimer section works fine:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 font-mono text-xs text-slate-600 leading-relaxed">
                This email is confidential and intended only for the named recipient.
                For information about how we handle your data, see our{" "}
                <span className="text-blue-600 underline">Privacy Policy</span>.
              </div>
              <p className="text-slate-600 leading-relaxed">
                Avoid making the disclaimer text so long that it dominates the signature visually.
                The{" "}
                <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
                  email signature best practices guide
                </Link>{" "}
                has guidance on balancing legal requirements with clean design.
              </p>
            </section>

            {/* Section 7 */}
            <section id="disclaimer-text" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What your legal disclaimer should say
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Long legal disclaimers appended to every email have questionable legal value and
                significant readability cost. Here&rsquo;s what actually matters.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                The elements with genuine legal utility
              </h3>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                {[
                  "Confidentiality notice — appropriate if your emails contain commercially sensitive information or privileged legal advice",
                  "Company registration information — required by Companies Act 2006 (UK): registered name, number, address, country of registration",
                  "Sector-specific regulatory notices — required for FCA-regulated firms, HIPAA-covered US entities, and others",
                  "Data processing notice — relevant if you use email tracking (link to privacy policy is usually sufficient)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                What doesn&rsquo;t work (and why)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Disclaimers stating &ldquo;if you received this in error, please delete it&rdquo; have no
                binding legal effect under any EU or UK legislation. Courts have consistently found
                that unilateral disclaimers appended to emails cannot create contractual obligations
                or override statutory rights.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Disclaimers attempting to limit liability for email content (&ldquo;this email does not
                constitute legal advice&rdquo;) can have some value in specific professional contexts
                (law, finance, medicine) but are meaningless in general business correspondence.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The practical recommendation: keep your disclaimer to three lines or fewer. Include
                your company registration information, a one-line confidentiality notice if relevant,
                and a privacy policy link. Cut everything else.
              </p>
            </section>

            {/* Section 8 — Checklist */}
            <section id="compliance-checklist" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                GDPR compliance checklist for email signatures
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Use this checklist to review your current email signature setup. It covers the
                main GDPR risk areas without getting into sector-specific requirements.
              </p>

              <div className="space-y-6">
                {[
                  {
                    category: "Data in your signature",
                    items: [
                      "Only work contact details are included (no personal home address, personal phone, etc.)",
                      "Headshot (if included) was provided by the employee with awareness it would be used professionally",
                      "Employment contract or handbook mentions use of professional contact details in email",
                    ],
                  },
                  {
                    category: "Tracking and data collection",
                    items: [
                      "No open-tracking pixels embedded in signature design",
                      "Signature image hosting provider does not log individual image loads for tracking",
                      "Any link click tracking is disclosed in your privacy policy",
                      "If tracking is used, a legitimate interests assessment has been completed",
                    ],
                  },
                  {
                    category: "Transparency and disclosure",
                    items: [
                      "Current privacy policy link is included in signature or disclaimer",
                      "Privacy policy mentions email communications and any associated tracking",
                      "Company registration details are included (UK/EU businesses)",
                    ],
                  },
                  {
                    category: "Signature tool and hosting",
                    items: [
                      "Signature management tool has a GDPR-compliant privacy policy",
                      "Image CDN is operated by a GDPR-compliant provider",
                      "Data processing agreement (DPA) is in place with your signature tool vendor",
                    ],
                  },
                ].map((section) => (
                  <div key={section.category}>
                    <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                          <span className="mt-0.5 w-4 h-4 border border-slate-300 rounded flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9 */}
            <section id="neatstamp-approach" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How NeatStamp handles this
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Because GDPR compliance is a real concern for our users, here&rsquo;s what NeatStamp
                does and doesn&rsquo;t do with signature data.
              </p>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    "NeatStamp does not embed open-tracking pixels in signatures.",
                    "Our CDN logs access requests for operational purposes (debugging, security) but does not use these logs to track individual email recipients.",
                    "We process your employees' personal data (name, title, contact details) under our Data Processing Agreement, which is available on request.",
                    "We are compliant with UK GDPR and EU GDPR. Our data processing infrastructure is hosted in the EU/UK.",
                    "You can delete your NeatStamp account and all associated employee data at any time from account settings.",
                    "We will sign a DPA with any customer who requires one for their own compliance obligations.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed">
                If you&rsquo;re a professional email signature user interested in the deliverability side
                of signature compliance (how signatures affect spam scores and email reputation),
                see the{" "}
                <Link href="/email-signature-deliverability" className="text-blue-600 hover:underline">
                  deliverability guide
                </Link>
                . And if you&rsquo;re looking to build a compliant signature from scratch, the{" "}
                <Link href="/editor" className="text-blue-600 hover:underline">
                  NeatStamp editor
                </Link>{" "}
                lets you do that for free — including a proper privacy policy link field and
                legally required company information fields. If you want to compare GDPR-aware
                tools,{" "}
                <Link href="/alternative-to-wisestamp" className="text-blue-600 hover:underline">
                  our WiseStamp comparison
                </Link>{" "}
                covers privacy practices, and the{" "}
                <Link href="/alternative-to-exclaimer" className="text-blue-600 hover:underline">
                  Exclaimer alternative page
                </Link>{" "}
                goes into enterprise compliance features. For team-wide signature management with
                centralised data control, see{" "}
                <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
                  NeatStamp for teams
                </Link>
                , and for business-specific requirements see the{" "}
                <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
                  business email signature page
                </Link>
                .
              </p>
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

            {/* Related links */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Related guides</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "/email-signature-deliverability", label: "Deliverability Guide" },
                  { href: "/professional-email-signature", label: "Professional Signature Tips" },
                  { href: "/email-signature-for-business", label: "Business Email Signatures" },
                  { href: "/blog/email-signature-best-practices", label: "Email Signature Best Practices" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm font-medium text-slate-700"
                  >
                    {link.label} &rarr;
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Build a GDPR-compliant signature
              </h2>
              <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                NeatStamp doesn&rsquo;t use tracking pixels, is GDPR-compliant, and makes it
                easy to include all required legal information. Free to start.
              </p>
              <Link
                href="/editor"
                className="inline-block px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Create My Signature — Free
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
