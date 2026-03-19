import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature for Yahoo Mail — Guide (2026)",
  description:
    "How to add an email signature in Yahoo Mail, what rich text and HTML options are available, common problems, and how Yahoo compares to Gmail for signatures.",
  alternates: { canonical: "https://neatstamp.com/email-signature-yahoo" },
};

const faqs = [
  {
    q: "Does Yahoo Mail support HTML email signatures?",
    a: "Yahoo Mail supports rich text formatting through its built-in signature editor — bold, italic, font size, font color, and basic links. However, it does not support full custom HTML in the same way Gmail or Outlook do. You can't paste raw HTML code into the Yahoo signature editor and have it render. The workaround is to create your signature in a browser, copy the rendered output, and paste it into Yahoo's editor — but results are inconsistent. For the most reliable rich signature in Yahoo Mail, use Yahoo's built-in formatting tools rather than trying to paste external HTML.",
  },
  {
    q: "Can I add a logo or image to my Yahoo Mail signature?",
    a: "Yes. In Yahoo Mail's signature editor, there's an image icon in the formatting toolbar. You can insert an image from a URL (hosted image) or, in some versions of Yahoo Mail, upload one directly. Use an externally hosted image URL for the most reliable results — something served from your own website, Cloudinary, or a similar CDN. Images embedded from local files may not display correctly for all recipients.",
  },
  {
    q: "How do I access Yahoo Mail signature settings?",
    a: "Open Yahoo Mail in a browser. Click the Settings gear icon in the upper right. Click 'More Settings' (not just the quick settings panel). Select 'Writing email' from the left menu. Scroll down to find the Signature section. There you can toggle signatures on, format them, and set which accounts use which signature.",
  },
  {
    q: "Why does my Yahoo Mail signature look different when received in Gmail?",
    a: "Different email clients render HTML differently. Yahoo Mail's internal formatting uses its own markup, which may not translate perfectly to how Gmail or Outlook renders incoming emails. Generally, the simpler your formatting (standard fonts, clean colors, no unusual elements), the more consistently it renders across clients. Test by sending yourself an email from Yahoo to a Gmail or Outlook account before committing.",
  },
  {
    q: "Can I use Yahoo Mail on mobile and have the same signature?",
    a: "The Yahoo Mail mobile app (iOS/Android) uses the same account settings as the web interface, including your signature. If you've set up a signature in Yahoo Mail's web settings, it should appear when you compose emails in the Yahoo Mail mobile app. Note that the signature preview in the mobile app sometimes looks slightly different from the web version — test by sending yourself a message.",
  },
  {
    q: "Is Yahoo Mail worth using for professional email in 2026?",
    a: "For personal email, Yahoo Mail is fine. For professional use — especially if you're sending client communications, running a business, or need full signature support — Gmail (via Google Workspace) or Outlook (via Microsoft 365) offer better tools. Gmail's signature editor is more capable, better documented, and the resulting signatures render more consistently across recipients. If you're using Yahoo Mail for business, consider whether a custom domain email via Google Workspace or Microsoft 365 might serve you better.",
  },
];

export default function EmailSignatureYahooPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Email Signature for Yahoo Mail",
            url: "https://neatstamp.com/email-signature-yahoo",
          },
        ]}
      />

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl leading-tight">
              Email Signature for Yahoo Mail
            </h1>
            <p className="mt-5 text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Yahoo Mail's signature editor is functional but limited compared to Gmail or
              Outlook. Here's exactly how to set it up, what it can and can't do, and what
              to do when things don't work the way you expect.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Build My Signature — Free
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <p className="mt-3 text-sm text-muted">No account needed. Get the signature, then follow these steps.</p>
          </div>

          {/* Quick overview */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What Yahoo Mail signature support actually looks like
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-lg">
              Before going through the steps, it helps to know what you're working with.
              Yahoo Mail has a signature feature, but it works differently from Gmail or
              Outlook — and knowing the limitations upfront will save you frustration.
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm">What Yahoo Mail signatures support</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Bold, italic, underline text formatting
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Font size and color changes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Clickable hyperlinks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Images (via URL or upload)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Multiple signatures (one per account)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Mobile app signature sync
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm">What Yahoo Mail signatures don't support</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Pasting raw HTML code that renders correctly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Table-based layouts (logo left, text right)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Custom fonts (web-safe only)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Social media icon sets with clickable icons
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Different signatures for replies vs. new messages
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    Admin-managed team signatures
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-muted text-sm leading-relaxed">
              If you need a full HTML layout with a side-by-side logo and text, Yahoo Mail's
              signature editor will frustrate you. The most reliable approach is to build a
              clean, well-formatted signature using Yahoo's own tools. For complex layouts,
              Gmail offers significantly better support — see the{" "}
              <Link href="/email-signature-gmail" className="text-primary underline underline-offset-2">
                Gmail signature guide
              </Link>{" "}
              for comparison.
            </p>
          </section>

          {/* Step by step */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Step-by-step: adding a signature in Yahoo Mail
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              These steps are for Yahoo Mail in a desktop browser (Chrome, Firefox, Safari).
              The steps for the Yahoo Mail mobile app are slightly different and covered below.
            </p>

            <div className="space-y-6 mb-8">
              {[
                {
                  step: "1",
                  title: "Open Yahoo Mail in a browser and go to Settings",
                  detail: "Click the gear icon in the upper-right corner of Yahoo Mail. This opens the quick settings panel. At the bottom of the panel, click 'More Settings' to open the full settings page.",
                },
                {
                  step: "2",
                  title: "Click 'Writing email' in the left menu",
                  detail: "In the full settings page, find 'Writing email' in the left-hand navigation. This is where Yahoo keeps all composition-related settings, including signatures.",
                },
                {
                  step: "3",
                  title: "Find the Signature section and toggle it on",
                  detail: "Scroll down on the 'Writing email' page to find the Signature section. If you have multiple accounts added to Yahoo Mail, you'll see a separate signature toggle for each. Turn on the signature for the account you want to configure.",
                },
                {
                  step: "4",
                  title: "Format your signature using the toolbar",
                  detail: "Once the signature editor is active, you'll see a text area with a formatting toolbar. Type your signature content and apply formatting using the toolbar: bold your name, change the color for your company name, add a link to your website. The toolbar has icons for bold, italic, underline, font size, font color, links, and images.",
                },
                {
                  step: "5",
                  title: "Add an image (optional)",
                  detail: "To add a logo or headshot, click the image icon in the toolbar. You'll be prompted to enter an image URL — paste the URL of a hosted image (e.g., your logo uploaded to your company website or a CDN). For the most reliable results, use an externally hosted image rather than uploading directly, especially if you're sending to people with different email clients.",
                },
                {
                  step: "6",
                  title: "Add hyperlinks to your website and social profiles",
                  detail: "Select the text you want to link (e.g., 'yourwebsite.com'), then click the link icon in the toolbar. Paste your full URL including https://. Repeat for any other links. Yahoo Mail supports clickable hyperlinks well — these will work in most recipients' inboxes.",
                },
                {
                  step: "7",
                  title: "Save and test",
                  detail: "Click the Save button (usually at the bottom of the settings page). Then compose a new email to see how your signature appears. Send a test to a Gmail or Outlook account so you can see how it looks when received.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 pb-5 border-b border-border last:border-0">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Yahoo Mail signature on iPhone and Android
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              The Yahoo Mail mobile app uses the signature settings you've configured in the
              web interface. If you set up a signature in Yahoo Mail's web settings, it should
              automatically appear when you compose emails in the Yahoo Mail iOS or Android app.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              You can also edit the signature directly in the mobile app:
            </p>
            <div className="rounded-xl border-l-4 border-primary bg-surface p-5 mb-6">
              <ol className="space-y-2 text-sm text-muted leading-relaxed list-decimal list-inside">
                <li>Open the Yahoo Mail app</li>
                <li>Tap the three-line menu icon in the upper left</li>
                <li>Scroll to the bottom and tap Settings</li>
                <li>Tap your account name</li>
                <li>Find the Signature option and tap it</li>
                <li>Edit your signature and tap Save</li>
              </ol>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              The mobile signature editor is more limited than the web version — primarily
              plain text. For a rich signature on mobile, consider using Yahoo Mail's web
              settings (which support more formatting) and relying on those to sync to the app.
            </p>
          </section>

          {/* Yahoo vs Gmail comparison */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Yahoo Mail vs. Gmail for email signatures
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              If you have a choice of email client, here's an honest comparison of how
              the two handle signatures.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left px-4 py-3 border border-border font-semibold text-foreground">Feature</th>
                    <th className="text-left px-4 py-3 border border-border font-semibold text-foreground">Yahoo Mail</th>
                    <th className="text-left px-4 py-3 border border-border font-semibold text-foreground">Gmail</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Basic text formatting", "✓ Yes", "✓ Yes"],
                    ["Image support", "✓ Yes (URL or upload)", "✓ Yes (URL or upload)"],
                    ["Paste HTML code", "✗ Renders as text", "✓ Supported"],
                    ["Table-based layouts", "✗ Not reliably", "✓ Works well"],
                    ["Different sig for replies", "✗ No", "✓ Yes"],
                    ["Multiple signatures", "✗ One per account", "✓ Multiple supported"],
                    ["Social media icons", "Limited", "✓ Via HTML"],
                    ["Mobile app support", "✓ Syncs from web", "✓ Syncs from web"],
                    ["Google Workspace admin control", "✗ N/A", "✓ Yes"],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-surface"}>
                      <td className="px-4 py-3 border border-border text-foreground font-medium">{row[0]}</td>
                      <td className={`px-4 py-3 border border-border ${row[1].startsWith("✗") ? "text-red-500" : "text-muted"}`}>{row[1]}</td>
                      <td className={`px-4 py-3 border border-border ${row[2].startsWith("✗") ? "text-red-500" : "text-muted"}`}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-muted leading-relaxed">
              For personal email, Yahoo Mail is a perfectly functional choice. For professional
              email where you need a polished HTML signature with specific layout, logo placement,
              and social icons, Gmail or Outlook handle this more reliably. If you're evaluating
              options, also see the{" "}
              <Link href="/email-signature-outlook-365" className="text-primary underline underline-offset-2">
                Outlook 365 signature guide
              </Link>
              .
            </p>
          </section>

          {/* Common problems */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Common Yahoo Mail signature problems
            </h2>

            <div className="space-y-5">
              {[
                {
                  problem: "I pasted HTML code and it shows as raw text, not formatted",
                  fix: "Yahoo Mail doesn't support raw HTML pasting. Use the built-in formatting toolbar instead. For a rich signature, build it using Yahoo's tools: bold, color, links, and images via the toolbar.",
                },
                {
                  problem: "My signature appears in new emails but not in replies",
                  fix: "Yahoo Mail doesn't offer a separate setting for replies vs. new emails. When replying, click inside the compose area and look for a signature toggle. In some versions of Yahoo Mail, the signature is collapsed by default in replies — click the three dots or the signature icon in the compose toolbar to show it.",
                },
                {
                  problem: "My image isn't showing up",
                  fix: "Check that your image URL starts with https:// (not http://). Some email clients block non-secure image sources. Also check that the image URL is publicly accessible — a Google Drive link set to 'restricted' won't work.",
                },
                {
                  problem: "The signature looks different on mobile",
                  fix: "The Yahoo Mail mobile app sometimes renders signatures slightly differently from the web. Test by sending yourself an email from Yahoo to a test account and checking it on your phone. For the most consistent results, keep your signature simple: standard fonts, basic formatting, one image.",
                },
                {
                  problem: "My signature is appearing twice",
                  fix: "This sometimes happens when you've set a signature in both the account settings and the web settings. Check Settings → Writing email and make sure the signature is only set once.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-foreground mb-2 text-sm">{item.problem}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    <strong className="text-foreground">Fix: </strong>{item.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related guides */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/email-signature-maker",
                  title: "Email Signature Maker",
                  desc: "Build your signature. Free, no account needed.",
                },
                {
                  href: "/email-signature-gmail",
                  title: "Gmail Signature Guide",
                  desc: "Full HTML support — the gold standard for signature setup.",
                },
                {
                  href: "/email-signature-outlook",
                  title: "Outlook Signature Guide",
                  desc: "Step-by-step for classic Outlook desktop.",
                },
                {
                  href: "/email-signature-outlook-365",
                  title: "Outlook 365 Signature Guide",
                  desc: "Web, desktop, and mobile for Microsoft 365.",
                },
                {
                  href: "/email-signature-apple-mail",
                  title: "Apple Mail Signature Guide",
                  desc: "Mac, iPhone, and iPad — including the HTML workaround.",
                },
                {
                  href: "/html-email-signature",
                  title: "HTML Email Signatures",
                  desc: "Why HTML signatures are worth using and how they work.",
                },
                {
                  href: "/professional-email-signature",
                  title: "Professional Email Signature",
                  desc: "What your signature content should actually say.",
                },
                {
                  href: "/email-signature-design",
                  title: "Email Signature Design",
                  desc: "Typography, color, and layout that works across clients.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-border bg-surface p-4 hover:border-primary hover:bg-white transition-colors"
                >
                  <div className="font-semibold text-foreground text-sm">{link.title}</div>
                  <div className="mt-1 text-xs text-muted">{link.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-semibold text-foreground">
                    {faq.q}
                    <svg
                      className="h-5 w-5 text-muted transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
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
                  <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary p-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Build your signature in 60 seconds
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Free. No account needed. Get clean, formatted HTML you can use in Yahoo Mail
              or any other email client.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all"
            >
              Create My Signature — Free
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
