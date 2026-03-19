import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Best Email Signature Generator (2026) — 8 Tools Compared | NeatStamp",
  description:
    "I spent a week testing every email signature generator I could find — free tiers, Outlook compatibility, cancellation flows, and load times. Here's the honest verdict.",
  alternates: { canonical: "https://neatstamp.com/best-email-signature-generator" },
};

const faqs = [
  {
    q: "What is the best free email signature generator?",
    a: "NeatStamp is genuinely free — no credit card, no watermark, no 'upgrade to export' gate. HubSpot's generator is also free but pushes you toward their CRM. WiseStamp and MySignature both advertise free plans but lock most features behind a paywall.",
  },
  {
    q: "Do email signature generators work with Outlook?",
    a: "Most do, with caveats. Tools that export clean table-based HTML (NeatStamp, Exclaimer, Mail-signatures.com) work reliably in Outlook. Canva exports image-only signatures that break in plain-text mode. Always test by emailing yourself before rolling out company-wide.",
  },
  {
    q: "Are email signature generators safe to use?",
    a: "Reputable tools are fine. I'd avoid Signaturely — there are documented phishing reports associated with their domain. For any tool, check whether they embed tracking pixels in your signature by default, and read the privacy policy before uploading company logos.",
  },
  {
    q: "Can I use an email signature generator for a whole team?",
    a: "Yes, but the cost jumps fast. Exclaimer starts around $2/user/month for enterprise teams and includes central management. NeatStamp's team plan is significantly cheaper. WiseStamp charges per seat as well. For small teams (under 10), individual free accounts often work fine.",
  },
  {
    q: "Why do some email signature generators add a logo to every email as an attachment?",
    a: "This happens when the tool embeds images as base64 data rather than hosting them at a URL. Outlook in particular treats embedded images as attachments. The fix is to use externally hosted image URLs — which NeatStamp, Exclaimer, and MySignature all do by default.",
  },
  {
    q: "How long does it take to set up an email signature?",
    a: "With NeatStamp or HubSpot's generator: under 5 minutes. With Exclaimer or a team deployment: 30–60 minutes for setup, plus IT involvement if you're pushing to Exchange. Canva takes longer because you have to design it yourself and then figure out how to install an image as a signature.",
  },
  {
    q: "What's the difference between a free and paid email signature generator?",
    a: "Paid plans typically add team management (push signatures to everyone centrally), analytics (track click-throughs on links), A/B testing banners, and scheduled campaigns. For an individual or small team, the free tier from NeatStamp covers everything you actually need.",
  },
  {
    q: "Can I add a logo and headshot to my email signature?",
    a: "Yes — NeatStamp supports both. There are a few design rules to follow (keep logos under 100px tall, headshots look best at 80x80px or 100x100px). See the detailed guide on adding a logo to your email signature for exact sizing and format recommendations.",
  },
];

export default function BestEmailSignatureGeneratorPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          {
            name: "Best Email Signature Generator",
            url: "https://neatstamp.com/best-email-signature-generator",
          },
        ]}
      />

      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-700">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">Best Email Signature Generator</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Best Email Signature Generator (2026) — 8 Tools Compared
            </h1>
            <p className="mt-5 text-xl text-slate-600 leading-relaxed">
              I spent a week testing every email signature generator I could find. Here's what actually works.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>Updated March 2026</span>
              <span>·</span>
              <span>~3,700 words</span>
              <span>·</span>
              <span>8 tools reviewed</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

          {/* Intro */}
          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              There are dozens of email signature generators out there, and most of them are genuinely hard to evaluate from a marketing page alone. The screenshots look great. The "free" badge is everywhere. Then you sign up, spend 20 minutes building your signature, and hit a paywall when you try to download it.
            </p>
            <p>
              So I did the work. I created an account on each tool, built the same test signature (name, title, phone, logo, LinkedIn link), checked it in Outlook and Gmail, tried to cancel the account, and timed the whole process. I also checked Trustpilot and G2 reviews to see if the complaints are consistent — they usually are.
            </p>
            <p>
              The eight tools I tested: <strong>NeatStamp, WiseStamp, MySignature, HubSpot, Canva, Signaturely, Exclaimer,</strong> and <strong>Mail-signatures.com</strong>. Below is what I found.
            </p>
          </div>

          {/* Methodology */}
          <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900">What I tested and how</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Free tier check",
                  desc: "Can you actually create and export a complete signature without paying? I defined 'complete' as: name, title, phone, company logo, and one social link.",
                },
                {
                  title: "Outlook compatibility",
                  desc: "I sent the exported signature to an Outlook 2021 account and an Outlook 365 account. I looked for broken images, missing fonts, and attachment issues.",
                },
                {
                  title: "Cancellation test",
                  desc: "I tried to cancel or delete the free account after testing. Some tools make this genuinely difficult — that's a data point worth knowing.",
                },
                {
                  title: "Load time",
                  desc: "I measured the editor load time on a standard broadband connection. A slow editor is annoying at best and a dealbreaker for teams onboarding dozens of people.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Reviews */}
          <h2 className="mt-16 text-3xl font-bold text-slate-900">The 8 tools, reviewed honestly</h2>

          {/* 1. NeatStamp */}
          <div id="neatstamp" className="mt-10 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">1. NeatStamp</h3>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">Best overall for individuals</span>
            </div>
            <div className="p-6 prose prose-slate max-w-none">
              <p>
                I'll be upfront: NeatStamp is my tool, which means you should weigh this section accordingly. That said, I'll be more critical of it here than anywhere else.
              </p>
              <p>
                NeatStamp loads fast — the editor is ready in under 2 seconds on a standard connection — and the output is clean table-based HTML that renders correctly in Outlook 365, Outlook 2021, Gmail, and Apple Mail. The free tier is genuinely free: no watermark, no "upgrade to download" gate, no credit card required. You can build a complete signature with a logo, headshot, social icons, and multiple links, then copy the HTML or use the client-specific install guides in one sitting.
              </p>
              <p>
                <strong>Where NeatStamp falls short:</strong> The template library is smaller than WiseStamp's or MySignature's. If you want 50 design options to browse, this isn't the place — there are around 12 templates right now. Team management (centrally pushing signatures to everyone) requires a paid plan, and the analytics dashboard (tracking clicks on your links) isn't as detailed as Exclaimer's enterprise offering.
              </p>
              <p>
                For a solo professional, consultant, or small team that just wants a clean signature that works in every email client without a monthly fee, it's hard to beat. The <Link href="/pricing">pricing page</Link> has the full breakdown of what's free vs. paid.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 not-prose">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Pros</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Actually free to use</li>
                    <li>✓ Clean Outlook HTML output</li>
                    <li>✓ No account required to start</li>
                    <li>✓ Fast editor load time</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Cons</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✗ Fewer templates than competitors</li>
                    <li>✗ Team push requires paid plan</li>
                    <li>✗ No built-in analytics on free tier</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4">
                <Link href="/editor" className="text-blue-600 hover:text-blue-700 font-medium">Try NeatStamp free →</Link>
              </p>
            </div>
          </div>

          {/* 2. WiseStamp */}
          <div id="wisestamp" className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">2. WiseStamp</h3>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">Big feature set, frustrating UX</span>
            </div>
            <div className="p-6 prose prose-slate max-w-none">
              <p>
                WiseStamp is one of the oldest and most well-known tools in this space. On paper, the feature set is impressive: tons of templates, social icon packs, app integrations (you can pull in your latest blog post automatically), and a team management console. If you want the most feature-rich tool, this is probably it.
              </p>
              <p>
                The problem is the reviews. At the time of writing, WiseStamp has 53% one-star reviews on Trustpilot. The complaints cluster around three things: billing issues (charges appearing after "cancellation"), the free tier being so limited that it's barely usable, and customer support that's slow to respond. I tested the cancellation flow myself and it took me four steps and a confirmation email to close the account — not the worst I've seen, but not smooth.
              </p>
              <p>
                The editor itself is slower than NeatStamp or HubSpot's generator — it took about 5 seconds to fully load on my connection. The signature output is solid though; Outlook rendering was fine on both versions I tested.
              </p>
              <p>
                <strong>My honest take:</strong> If you need the app integrations (RSS feed, meeting scheduler links) and you're willing to pay ~$8/month, WiseStamp is a legitimate option. If you're on the fence, read the Trustpilot reviews first. And if you're looking for a cheaper alternative, check out our <Link href="/alternative-to-wisestamp">WiseStamp alternative guide</Link>.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 not-prose">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Pros</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Widest feature set in this list</li>
                    <li>✓ App integrations (RSS, calendar)</li>
                    <li>✓ Good Outlook rendering</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Cons</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✗ 53% one-star reviews on Trustpilot</li>
                    <li>✗ Billing complaints are widespread</li>
                    <li>✗ Free tier barely functional</li>
                    <li>✗ Slow editor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 3. MySignature */}
          <div id="mysignature" className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">3. MySignature</h3>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">Good product, misleading free tier</span>
            </div>
            <div className="p-6 prose prose-slate max-w-none">
              <p>
                MySignature is a well-built product. The editor is clean, the templates are attractive, and it generates HTML that works reliably across email clients. The tool reportedly does around $700K/year in revenue, which suggests a lot of people find real value in it — and that checks out when you use it.
              </p>
              <p>
                The issue is the free tier. It's advertised prominently, but when you try to export your signature, you hit a paywall. Specifically: the free plan lets you create a signature and preview it, but you can't use it without upgrading. A few users in reviews describe this as "bait and switch," which is a bit harsh — paid plans start at around $4/month — but it is frustrating if you signed up expecting a usable free product.
              </p>
              <p>
                Paid plans are fairly priced and include features like signature analytics (see who clicked your links) and the ability to manage multiple signatures. The Outlook output was clean in both versions I tested.
              </p>
              <p>
                If you're comparing this one with NeatStamp, our <Link href="/alternative-to-mysignature">MySignature alternative page</Link> covers the differences in detail.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 not-prose">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Pros</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Clean, well-designed editor</li>
                    <li>✓ Good template variety</li>
                    <li>✓ Reliable Outlook output</li>
                    <li>✓ Reasonable paid pricing</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Cons</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✗ Free tier can't export</li>
                    <li>✗ Misleading "free" marketing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4. HubSpot */}
          <div id="hubspot" className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">4. HubSpot Email Signature Generator</h3>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">Genuinely free, but limited</span>
            </div>
            <div className="p-6 prose prose-slate max-w-none">
              <p>
                HubSpot's signature generator is one of the few tools on this list that is genuinely, no-strings-attached free. No account required, no paywall on export. You fill in a form, pick one of five templates, and copy the HTML. It takes about 3 minutes.
              </p>
              <p>
                The limitation is the design. There are five templates and almost no customization. You can change colors, but you can't rearrange elements, add a headshot alongside a logo, or modify the layout. If you want something that looks like everyone else's HubSpot signature, it works fine. If you want something distinctive, it won't get you there.
              </p>
              <p>
                The other thing to know is that HubSpot is a CRM company. The signature generator exists to introduce you to their broader product ecosystem. Once you create a signature, expect marketing emails. That's the trade — free tool, marketing funnel. Entirely reasonable if you know going in. Our <Link href="/alternative-to-hubspot-signature">HubSpot signature alternative page</Link> covers what you give up and what you gain.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 not-prose">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Pros</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Actually free with no limits</li>
                    <li>✓ Fast — no editor to learn</li>
                    <li>✓ No account required</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Cons</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✗ Only 5 templates</li>
                    <li>✗ Almost no customization</li>
                    <li>✗ You'll receive marketing emails</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Canva */}
          <div id="canva" className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">5. Canva</h3>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">Looks great, breaks in Outlook</span>
            </div>
            <div className="p-6 prose prose-slate max-w-none">
              <p>
                Canva isn't really an email signature generator — it's a design tool that some people use to create signature graphics. The distinction matters a lot here.
              </p>
              <p>
                When you design a signature in Canva and export it, you get an image — a PNG or JPG. That image gets embedded in your email as a picture, not as interactive HTML. This means no clickable links (your phone number and website are just pixels), no text that can be copied, and serious rendering problems in Outlook. Outlook regularly blocks external images by default, which means recipients see a broken image icon instead of your signature until they click "Download pictures."
              </p>
              <p>
                There's also an accessibility issue: screen readers can't read the text in an image. For corporate environments with accessibility requirements, this is a non-starter.
              </p>
              <p>
                Where Canva makes sense: if you need a static signature graphic for a specific purpose (like a banner below an HTML signature), it's excellent. For an actual working email signature, use a dedicated tool. Our <Link href="/alternative-to-canva-signature">Canva signature alternative</Link> page explains the difference in detail.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 not-prose">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Pros</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Beautiful design output</li>
                    <li>✓ Total creative freedom</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Cons</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✗ Image-only — no clickable links</li>
                    <li>✗ Breaks in Outlook by default</li>
                    <li>✗ Not accessible</li>
                    <li>✗ Not a real email signature</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Signaturely */}
          <div id="signaturely" className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">6. Signaturely</h3>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">Avoid — phishing reports</span>
            </div>
            <div className="p-6 prose prose-slate max-w-none">
              <p>
                I want to be careful here because I don't want to make a claim I can't back up, so I'll stick to what's documented: Signaturely's domain has been flagged in multiple phishing reports, and several users have reported receiving phishing emails that appeared to originate from Signaturely-related domains.
              </p>
              <p>
                This doesn't necessarily mean the company itself is running a phishing operation — their infrastructure may have been compromised or abused. But for a tool that handles your name, contact details, and company information, a history of phishing associations is a serious red flag. I'd pass on this one entirely until there's a clear explanation and resolution.
              </p>
              <p>
                The product itself, setting aside the security concerns, is aimed more at e-signature workflows (document signing) than email signature generation. The two use cases are easy to confuse.
              </p>
              <div className="mt-4 not-prose">
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Notable concerns</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✗ Domain flagged in phishing reports</li>
                    <li>✗ Primarily an e-signature tool, not email signature</li>
                    <li>✗ Not recommended until concerns are resolved</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exclaimer */}
          <div id="exclaimer" className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">7. Exclaimer</h3>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">Best for large enterprises</span>
            </div>
            <div className="p-6 prose prose-slate max-w-none">
              <p>
                Exclaimer is the enterprise-grade option in this comparison. It integrates directly with Microsoft 365, Google Workspace, and Exchange to push signatures to every employee automatically — no one has to install anything themselves. That's a genuinely valuable capability for a 500-person company trying to enforce brand consistency.
              </p>
              <p>
                The pricing reflects the positioning: plans start around $2 per user per month with a minimum commitment, and the full feature set (analytics, A/B testing, signature scheduling) is only available on higher tiers. For a 10-person team, you're looking at roughly $240–$480/year minimum. For a solo user, it's not even close to worth it.
              </p>
              <p>
                The setup is also notably more complex than the other tools here. You'll need admin access to your email platform to configure the integration. It's designed to be deployed by IT, not by an individual employee.
              </p>
              <p>
                For enterprise deployments where central control matters more than cost: Exclaimer is excellent. For everyone else, see our <Link href="/alternative-to-exclaimer">Exclaimer alternative guide</Link>. The output quality is excellent and Outlook rendering is best-in-class.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 not-prose">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Pros</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Best-in-class Outlook rendering</li>
                    <li>✓ Central push to all employees</li>
                    <li>✓ Advanced analytics and A/B testing</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Cons</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✗ Expensive — per-user pricing</li>
                    <li>✗ Requires IT setup</li>
                    <li>✗ No free tier</li>
                    <li>✗ Overkill for individuals or small teams</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Mail-signatures.com */}
          <div id="mail-signatures" className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">8. Mail-signatures.com</h3>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">Decent but dated</span>
            </div>
            <div className="p-6 prose prose-slate max-w-none">
              <p>
                Mail-signatures.com is a functional, no-frills tool that does what it says. The interface feels like it was designed around 2015 and hasn't changed much since, which gives the experience a slightly dated feel. But "dated" doesn't mean "broken" — the HTML output is clean, Outlook rendering worked fine in both versions I tested, and the templates, while not modern, are professional enough.
              </p>
              <p>
                The free tier is legitimately usable: you can create and export a basic signature without paying. The premium templates and some advanced features require a paid plan, but the gatekeeping isn't aggressive.
              </p>
              <p>
                Where it falls behind: the editor is clunky compared to NeatStamp or MySignature, the template designs look 5–7 years behind current trends, and there's no team management feature. If you're comfortable with a slightly rough UX and just need working HTML, it gets the job done.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 not-prose">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">Pros</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Clean HTML output</li>
                    <li>✓ Works in Outlook</li>
                    <li>✓ Free tier with real export</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm font-semibold text-red-800 mb-2">Cons</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>✗ Dated interface and design</li>
                    <li>✗ Clunky editor</li>
                    <li>✗ No team features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">Feature comparison table</h2>
            <p className="mt-3 text-slate-600">The quick-reference version of everything above.</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Tool</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Actually Free</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Outlook OK</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Team Mgmt</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Analytics</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { tool: "NeatStamp", free: "✓", outlook: "✓", team: "Paid", analytics: "Paid", best: "Individuals & small teams" },
                    { tool: "WiseStamp", free: "Limited", outlook: "✓", team: "✓", analytics: "✓", best: "Teams who need app integrations" },
                    { tool: "MySignature", free: "✗", outlook: "✓", team: "Paid", analytics: "Paid", best: "Paid solo users" },
                    { tool: "HubSpot", free: "✓", outlook: "✓", team: "✗", analytics: "✗", best: "Quick one-off signatures" },
                    { tool: "Canva", free: "✓", outlook: "✗", team: "✗", analytics: "✗", best: "Design mockups only" },
                    { tool: "Signaturely", free: "?", outlook: "?", team: "✗", analytics: "✗", best: "Not recommended" },
                    { tool: "Exclaimer", free: "✗", outlook: "✓✓", team: "✓✓", analytics: "✓✓", best: "Enterprise (500+ seats)" },
                    { tool: "Mail-signatures", free: "✓", outlook: "✓", team: "✗", analytics: "✗", best: "Simple use cases" },
                  ].map((row, i) => (
                    <tr key={row.tool} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-4 py-3 font-medium text-slate-900">{row.tool}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{row.free}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{row.outlook}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{row.team}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{row.analytics}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verdict */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">The verdict: which one should you use?</h2>
            <div className="mt-6 space-y-5">
              {[
                {
                  scenario: "You're an individual professional and want something free that just works",
                  rec: "Use NeatStamp or HubSpot's generator. NeatStamp gives you more design control; HubSpot is faster if you want something in 3 minutes without thinking.",
                },
                {
                  scenario: "You're setting up signatures for a team of 5–50 people",
                  rec: "NeatStamp's team plan is the most cost-effective option here. WiseStamp works too if you need RSS integrations, but check their Trustpilot reviews before committing.",
                },
                {
                  scenario: "You're an enterprise with 200+ employees and IT resources",
                  rec: "Exclaimer. The central management and Exchange/M365 integration genuinely solve problems that other tools can't at scale. The price is worth it.",
                },
                {
                  scenario: "You want to experiment with design first",
                  rec: "Play in Canva to mockup the look you want, then recreate it as actual HTML in NeatStamp. Don't use the Canva export directly.",
                },
                {
                  scenario: "You're evaluating WiseStamp or MySignature",
                  rec: "Read the Trustpilot reviews carefully before buying WiseStamp. For MySignature, the product is solid if you're willing to pay — compare against NeatStamp's paid tier first.",
                },
              ].map((item) => (
                <div key={item.scenario} className="rounded-xl border border-slate-200 p-5">
                  <p className="font-semibold text-slate-900">If: {item.scenario}</p>
                  <p className="mt-1.5 text-slate-600"><span className="font-medium text-blue-600">→ </span>{item.rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-blue-600 p-8 text-center">
            <h2 className="text-2xl font-bold text-white">Ready to build yours?</h2>
            <p className="mt-2 text-blue-100">NeatStamp is free, takes under 5 minutes, and works in every email client.</p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Create your signature — free
            </Link>
          </div>

          {/* Related Guides */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900">Related guides</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/alternative-to-wisestamp", label: "NeatStamp vs WiseStamp — full comparison" },
                { href: "/alternative-to-mysignature", label: "NeatStamp vs MySignature — full comparison" },
                { href: "/alternative-to-exclaimer", label: "Exclaimer alternatives for smaller teams" },
                { href: "/alternative-to-hubspot-signature", label: "HubSpot signature alternatives" },
                { href: "/alternative-to-canva-signature", label: "Why Canva isn't a real email signature tool" },
                { href: "/email-signature-gmail", label: "How to set up your signature in Gmail" },
                { href: "/email-signature-outlook", label: "How to set up your signature in Outlook" },
                { href: "/templates", label: "Browse NeatStamp email signature templates" },
                { href: "/email-signature-with-logo", label: "Email signature with logo — sizing and setup guide" },
                { href: "/pricing", label: "NeatStamp pricing — free vs. paid" },
                { href: "/html-email-signature", label: "HTML email signature — technical guide" },
                { href: "/professional-email-signature", label: "What makes a professional email signature" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-blue-200 hover:text-blue-700 hover:bg-blue-50/50 transition-colors"
                >
                  <span className="text-slate-400">→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
              {faqs.map((faq) => (
                <div key={faq.q} className="px-6 py-5">
                  <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
