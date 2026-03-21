import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature Deliverability: Stop Going to Spam (2026)",
  description:
    "Your email signature might be sending your emails to spam. Here's how to check your deliverability score and fix the real culprits.",
  alternates: { canonical: "https://neatstamp.com/email-signature-deliverability" },
};

const faqs = [
  {
    q: "Can my email signature really cause emails to go to spam?",
    a: "Yes, absolutely. Spam filters analyze the entire email, including the signature HTML. A signature with too many links, hosted images from domains with poor reputation, excessive HTML complexity, or large base64 images can push a message's spam score over the threshold. The most common culprit I see is signatures with five or more links — each link is a signal spam filters count. Another frequent issue is images hosted on servers that also host spam, which taints the domain's reputation. Gmail's spam filter, SpamAssassin (used by many mail servers), and Microsoft's filtering all examine signature content.",
  },
  {
    q: "How does Gmail clipping relate to email signatures?",
    a: "Gmail clips email threads that exceed 102KB in total HTML size, replacing most of the content with a 'Message clipped' notice and a link to view the full message. A long HTML signature that you're appending to every reply in a thread is a frequent cause of this. If your signature HTML is 20KB and you exchange 8 emails in a thread, the cumulative size from stacked signatures can easily exceed the 102KB limit. Recipients then see 'Message clipped' and have to click through to read the full email. Fix: keep your signature HTML lean — under 5KB of pure HTML — and avoid base64 images, which inflate size dramatically.",
  },
  {
    q: "What is a deliverability score for an email signature?",
    a: "A deliverability score is an assessment of how likely your signature's HTML is to trigger spam filters or other deliverability problems. NeatStamp calculates a score based on several factors: number of links in the signature, presence of tracking pixels, image hosting reputation, HTML size, HTML complexity (deeply nested tables, excessive CSS), ratio of text to HTML, and known spam-trigger phrases. A higher score means lower risk. The score gives you an actionable number and highlights the specific elements that are reducing it, so you can fix them before deploying the signature.",
  },
  {
    q: "How many links in an email signature is too many?",
    a: "As a rule of thumb, keep your total link count under 5. That includes your website, social media profile links, phone (tel:) links, email (mailto:) links, and any other hyperlinks. Spam filters count links as a spam signal — a message with 12+ links is treated with more suspicion than one with 3. Some spam filters also check whether linked domains are on known block lists. Social media icons are the most common link inflation source: LinkedIn, Twitter, Facebook, Instagram, YouTube, TikTok — that's already 6 links. Pick the 2-3 platforms most relevant to your work and cut the rest.",
  },
  {
    q: "Do tracking pixels in email signatures hurt deliverability?",
    a: "Yes, and significantly. A tracking pixel is a 1x1 invisible image loaded from a third-party URL that records when the email is opened. Some email signature tools embed tracking pixels automatically. These are detected by modern spam filters, which flag them as a sign that the email is commercial or promotional in nature — not a personal one-on-one message. Some corporate email security gateways (like Proofpoint and Mimecast) specifically block emails containing known tracking pixel domains. NeatStamp does not add tracking pixels to signatures. If you use another tool that adds them, check your signature HTML for 1x1 images with external URLs.",
  },
  {
    q: "Does image hosting reputation affect email deliverability?",
    a: "Yes. Every image in your email signature is loaded from an external URL when the recipient opens the email. Spam filters check the domain of that URL against reputation databases. If your images are hosted on a server or CDN that has been used to host spam, phishing pages, or malware — even by other users on a shared hosting plan — your email can be flagged. This is why I recommend hosting signature images on your own domain (company.com/email-assets/logo.png) or a reputable CDN like Cloudflare Images or AWS CloudFront rather than generic file hosting sites. NeatStamp's image hosting uses vetted infrastructure with good domain reputation.",
  },
  {
    q: "Can base64 images in my signature hurt deliverability?",
    a: "Yes, in multiple ways. Base64 images inflate the raw HTML size of your email dramatically — a 50KB logo becomes roughly 66KB of base64 text embedded in the HTML. This large HTML size triggers Gmail clipping at 102KB and increases spam scores on many filters that penalize large HTML payloads. Additionally, some spam filters specifically flag base64-encoded content as suspicious because it's a technique used to obfuscate malicious payloads. Always use externally hosted images referenced by URL rather than base64-encoded images in email signatures.",
  },
  {
    q: "Does an HTML-heavy signature affect deliverability in Microsoft 365?",
    a: "Microsoft 365's spam filtering (EOP — Exchange Online Protection) and its advanced security layer (Defender for Office 365) both analyze HTML complexity as part of spam scoring. Deeply nested tables (more than 4-5 levels), excessive inline CSS, and large amounts of HTML with little text content are all signals that can raise a message's spam score in Microsoft's filter. The practical implication: keep your signature HTML as clean and minimal as possible. Avoid nesting tables beyond what's needed for layout. Strip out any unused CSS properties. A signature that's 3KB of clean HTML performs better than one that's 25KB of complex markup, even if they look identical to the recipient.",
  },
  {
    q: "Should I use text links or icon links for social media in my signature?",
    a: "From a deliverability standpoint, text links are slightly better than icon links. A text link like 'LinkedIn' is one link. An icon image link is still one link, but it also adds an external image request and a potential image-reputation check. The practical difference is small, but if you're trying to optimize deliverability, replacing image-based social icons with text links (LinkedIn | Twitter | Website) reduces both your link-to-image ratio concern and removes the image reputation variable. Visually, text-based social links look clean and minimalist — many professional email signatures use this approach and it reads as confident rather than overdone.",
  },
  {
    q: "How do I check my current email signature's deliverability score?",
    a: "The easiest way is to use NeatStamp's deliverability score checker, which analyzes your signature HTML and flags specific issues. You can also use a general email testing tool like Mail-Tester.com — compose an email using your signature and send it to the test address they provide, and you'll get a spam score and breakdown. For the most thorough analysis, use a dedicated tool like GlockApps or MXToolbox to run your email through multiple spam filters and see exactly what's being flagged. Most deliverability issues with signatures fall into the same categories: too many links, large images, or complex HTML.",
  },
];

export default function EmailSignatureDeliverabilityPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Email Signature Deliverability", url: "https://neatstamp.com/email-signature-deliverability" },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-10 text-slate-800">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-slate-700 underline underline-offset-2">Home</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-700 font-medium">Email Signature Deliverability</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
          Email Signature Deliverability: Is Your Signature Sending Emails to Spam?
        </h1>
        <p className="text-slate-500 text-sm mb-8">Updated March 2026 · 19 min read</p>

        {/* ── INTRO ── */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-4">
            Most people assume that once they set up their email signature, their deliverability
            problems are somewhere else — their domain reputation, their sending volume, their content.
            The signature is just branding, right? It doesn&apos;t affect whether emails land in inboxes.
          </p>
          <p className="leading-relaxed mb-4">
            Wrong. Your email signature is part of every email you send, and spam filters analyze
            every part of every email. A signature with too many links, images hosted on a
            suspicious domain, several kilobytes of complex HTML, or an embedded tracking pixel
            can push an otherwise clean message over the spam threshold. I&apos;ve seen situations where
            removing a single signature element — a row of six social media icons — fixed a client&apos;s
            deliverability problem completely.
          </p>
          <p className="leading-relaxed mb-4">
            The tricky part is that you won&apos;t always know this is happening. Spam filters don&apos;t
            send you rejection notices explaining which part of your email triggered them. Your
            emails just quietly land in spam, or they get silently discarded, and you never
            know a conversation never happened. For business emails, that&apos;s a serious problem.
          </p>
          <p className="leading-relaxed mb-4">
            This guide covers the specific signature elements that affect deliverability, how spam
            filters actually work when they encounter your signature HTML, and what to change to
            reduce your risk. It also covers Gmail&apos;s clipping threshold — a separate but related
            issue that affects readability even when emails do land in the inbox.
          </p>
          <p className="leading-relaxed">
            NeatStamp includes a{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              deliverability score checker in the editor
            </Link>{" "}
            — a feature I haven&apos;t seen in other signature tools — that analyzes your signature and
            flags the specific elements that are raising your spam risk before you deploy it.
          </p>
        </section>

        {/* ── HOW SPAM FILTERS SEE YOUR SIGNATURE ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How spam filters see your email signature</h2>

          <p className="leading-relaxed mb-4">
            Spam filters don&apos;t read email the way humans do. They process the raw email message —
            headers, body, and HTML — as a document and run it through a scoring system. Different
            elements of the email contribute positive or negative points to a spam score. If the
            score exceeds a threshold, the email goes to spam. If it exceeds a higher threshold,
            it gets rejected outright.
          </p>
          <p className="leading-relaxed mb-4">
            The most widely deployed spam filter engine — SpamAssassin — is used by many independent
            mail servers and is the basis for some commercial spam filtering products. Gmail uses its
            own machine-learning-based filter. Microsoft&apos;s Exchange Online Protection (used by
            Microsoft 365) uses a combination of Microsoft&apos;s own engine and reputation data. All of
            them look at signature content.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">What spam filters look for in signature HTML</h3>
          <p className="leading-relaxed mb-4">
            These are the signature elements that consistently contribute to higher spam scores:
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-4 text-slate-700">
            <li>
              <strong>High link count:</strong> More than 5 links in total. Each link is a
              counted signal. Social media icon rows are the worst offender — 6 platforms equals
              6 links, adding to your tel:, mailto:, and website links.
            </li>
            <li>
              <strong>Linked domains with poor reputation:</strong> If your signature links to any
              domain that&apos;s on a spam or malware block list, every email you send inherits that
              domain&apos;s reputation problem.
            </li>
            <li>
              <strong>Image URLs from low-reputation hosts:</strong> Images hosted on shared hosting,
              certain CDNs, or domains previously used for spam can flag your emails.
            </li>
            <li>
              <strong>Tracking pixels:</strong> 1x1 transparent images from third-party tracking
              domains are a known spam signal and are actively blocked by corporate security gateways.
            </li>
            <li>
              <strong>Large HTML size:</strong> Signatures with base64-embedded images or
              excessively complex HTML increase the total email size, which correlates with spam.
            </li>
            <li>
              <strong>Low text-to-HTML ratio:</strong> A signature that&apos;s mostly images with
              minimal text has a low text-to-HTML ratio, which spam filters treat as a warning sign
              (image-only spam is a known technique for evading content filters).
            </li>
            <li>
              <strong>Overly promotional language in signature text:</strong> Phrases like
              &quot;Limited time offer&quot; or &quot;Free trial&quot; in banner images or promotional text are
              treated the same in a signature as they are in email body copy.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">The Gmail 102KB clipping threshold</h3>
          <p className="leading-relaxed mb-4">
            Gmail clips email threads that exceed 102KB in total HTML size. This isn&apos;t a spam filter
            — it&apos;s a display limitation. But it affects readability in a serious way: the recipient
            sees a truncated version of your email with a &quot;Message clipped&quot; notice, and they have
            to click a link to view the full content. Most recipients don&apos;t click it. They skim what
            they can see and reply based on incomplete information.
          </p>
          <p className="leading-relaxed mb-4">
            Email signatures cause clipping when they&apos;re appended to long email threads. If your
            signature HTML is 15KB and a thread has had 8 back-and-forth replies (each appending
            the signature again), the cumulative signature HTML in the thread can easily be 120KB+,
            well over Gmail&apos;s threshold. Your actual reply might be only 200 words, but the thread
            gets clipped because of stacked signature HTML.
          </p>
          <p className="leading-relaxed mb-4">
            The fix: keep your signature HTML lean. Under 5KB of raw HTML is achievable. It requires
            clean, minimal code — no base64 images, no redundant CSS, no deeply nested table
            structures. NeatStamp&apos;s generated HTML is typically 2-4KB for a standard signature,
            which gives plenty of headroom even in long threads. For more context on how Gmail
            handles this, see the{" "}
            <Link href="/blog/email-signature-size" className="text-blue-600 hover:underline">
              email signature size guide
            </Link>
            .
          </p>
        </section>

        {/* ── STEP BY STEP ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to check and improve your email signature deliverability: step by step</h2>

          <p className="leading-relaxed mb-6">
            This is a practical audit process. Work through these steps in order — the first few
            have the most impact on deliverability.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 1: Count every link in your signature</h3>
          <p className="leading-relaxed mb-4">
            Open your signature HTML and count every href attribute. Include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700">
            <li>Your website URL</li>
            <li>Each social media icon link (LinkedIn, Twitter, Instagram, etc.)</li>
            <li>Your phone number (tel: link)</li>
            <li>Your email address (mailto: link)</li>
            <li>Any banner image link</li>
            <li>Any calendar/booking link (Calendly, etc.)</li>
            <li>Any legal disclaimer link</li>
          </ul>
          <p className="leading-relaxed mb-4">
            If the total is more than 5-6, you need to cut. Start with social media icons —
            they&apos;re the easiest to reduce. Keep LinkedIn if you&apos;re in a professional field. Keep
            one other platform that&apos;s genuinely relevant to your work. Cut the rest. You can
            include more social links on your website; your email signature doesn&apos;t need to be
            a full social directory.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 2: Check where your images are hosted</h3>
          <p className="leading-relaxed mb-4">
            Look at every image URL in your signature HTML. Ask yourself:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700">
            <li>Is it on your own company domain? (Best option)</li>
            <li>Is it on a major reputable CDN (AWS CloudFront, Cloudflare, Fastly)? (Good option)</li>
            <li>Is it on a generic file hosting service (Dropbox, generic shared hosting)? (Risky)</li>
            <li>Is it on a URL that looks like a random string or a subdomain you don&apos;t recognize? (Very risky)</li>
          </ul>
          <p className="leading-relaxed mb-4">
            If any of your image URLs are on shared hosting or services you don&apos;t control, migrate
            them to your own domain or a major CDN. The URL{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">https://company.com/assets/logo.png</code> is
            far better from a reputation standpoint than{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">https://randomcdn.io/user8234/logo.png</code>.
            NeatStamp hosts signature images on its own vetted infrastructure, which maintains domain
            reputation for exactly this reason.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 3: Find and remove any tracking pixels</h3>
          <p className="leading-relaxed mb-4">
            In your signature HTML, search for{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">width="1" height="1"</code> or{" "}
            <code className="bg-slate-100 px-1 rounded text-sm">width="0" height="0"</code> on img tags.
            These are tracking pixels. If you find them, remove them. They were likely added by
            whatever tool generated your signature HTML. Common tracking pixel domains include
            various email analytics services — if you see an img src pointing to an analytics domain
            rather than your own company domain, it&apos;s a tracking pixel.
          </p>
          <p className="leading-relaxed mb-4">
            If you genuinely need to track email opens, use it at the campaign level for marketing
            emails — not embedded in a transactional business email signature where it can flag
            every email you send as potentially commercial.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 4: Check your signature HTML file size</h3>
          <p className="leading-relaxed mb-4">
            Copy your signature HTML, paste it into a text editor, and check the character count.
            Divide by roughly 1,000 to get the approximate kilobyte size. Under 5KB is excellent.
            5-10KB is fine. 10-20KB is getting risky for Gmail clipping in long threads. Over 20KB
            is a problem.
          </p>
          <p className="leading-relaxed mb-4">
            The most common reason for oversized signature HTML is base64-encoded images. A single
            company logo embedded as base64 can add 40-80KB to the HTML. Replace all base64 images
            with externally hosted URLs immediately. That single change often drops signature HTML
            size by 80-90%.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 5: Run NeatStamp&apos;s deliverability score checker</h3>
          <p className="leading-relaxed mb-4">
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              Open NeatStamp&apos;s editor
            </Link>{" "}
            and either build or paste your signature. The deliverability score checker analyzes the
            HTML and provides a score out of 100, along with a breakdown of which elements are
            reducing the score. It checks link count, image hosting reputation, HTML size, tracking
            pixel presence, and several other signals. This is a feature I haven&apos;t found in other
            signature tools — most just let you build and export without any analysis of whether
            the result will cause deliverability problems.
          </p>
          <p className="leading-relaxed mb-4">
            Work through each flagged item in the report. The most impactful fixes (link count,
            base64 images, tracking pixels) have specific suggestions for what to change.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 6: Send a test email to Mail-Tester.com</h3>
          <p className="leading-relaxed mb-4">
            Mail-Tester.com gives you a test email address. Compose a new email using your signature
            and send it to that address. Mail-Tester will analyze the full email (headers, body,
            signature, image URLs, link count) and give you a spam score out of 10 with a detailed
            breakdown of every issue. Aim for a score of 9/10 or higher for transactional business
            emails. Anything below 7/10 is likely causing real deliverability problems.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Step 7: Test deliverability with actual email providers</h3>
          <p className="leading-relaxed mb-4">
            Send test emails from your account to a Gmail address, a Microsoft 365 address, and
            if possible a corporate mail server. Check whether they land in the primary inbox,
            promotions tab, or spam. The promotions tab in Gmail is not ideal for business emails —
            it signals that Gmail&apos;s filters have categorized your message as marketing. If business
            emails are landing there, review your signature for promotional language, high link count,
            and image-heavy content.
          </p>
        </section>

        {/* ── COMMON PROBLEMS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common deliverability problems caused by email signatures</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: emails landing in Gmail&apos;s Promotions tab</h3>
          <p className="leading-relaxed mb-4">
            Gmail&apos;s categorization algorithm is trained to identify marketing emails. Heavy
            HTML signatures with images, multiple links, and low text-to-HTML ratios look like
            marketing emails to this algorithm. Fixes: reduce your link count, increase the amount
            of text in your signature relative to HTML, remove tracking pixels, and avoid any
            promotional language. For context on what else might be affecting this, see the{" "}
            <Link href="/blog/email-signature-best-practices" className="text-blue-600 hover:underline">
              email signature best practices guide
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: emails to corporate addresses consistently go to spam</h3>
          <p className="leading-relaxed mb-4">
            Corporate email security gateways (Proofpoint, Mimecast, Barracuda) are often more
            aggressive than Gmail or consumer filters. They&apos;re particularly likely to flag tracking
            pixels (they actively block known tracking pixel domains), suspicious image hosting
            domains, and certain HTML patterns. If your emails specifically go to spam at corporate
            addresses but land fine in Gmail inboxes, the issue is almost certainly something your
            corporate recipients&apos; security gateway is blocking — likely a tracking pixel or
            suspicious image URL.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: Gmail shows &quot;Message clipped&quot; for long email threads</h3>
          <p className="leading-relaxed mb-4">
            This is the HTML size issue. Your signature HTML is too large and is causing threads
            to exceed Gmail&apos;s 102KB limit. First priority: eliminate any base64 images. Second:
            reduce the overall HTML complexity — deeply nested tables, excessive inline CSS, and
            unnecessary wrapper elements all add size. If your signature is a template that generates
            code, switch to one that generates lean HTML. For the{" "}
            <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
              business signature
            </Link>{" "}
            context, this is especially important if you communicate via long project email threads.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem: deliverability dropped after adding a banner to the signature</h3>
          <p className="leading-relaxed mb-4">
            Promotional banners in email signatures — event announcements, product launches, special
            offers — are a significant deliverability risk. They add images and links to an email
            that would otherwise look like a clean business message. They often contain promotional
            language in the banner text. And they increase the image-to-text ratio. If you add a
            banner and your deliverability suffers, the banner is the likely cause. Either remove
            it or redesign it to use minimal graphics and no promotional text.
          </p>
        </section>

        {/* ── PRO TIPS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pro tips for email signature deliverability</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 1: Design your signature to work without images</h3>
          <p className="leading-relaxed mb-4">
            Many corporate email clients block external images by default (Outlook does this). From
            a deliverability perspective, a signature that works well without images — where the text
            content is clear and informative on its own — is lower risk than one that relies on
            images for most of its content. Always write descriptive alt text for every image.
            Use text for your name, title, and contact info rather than embedding them in a graphic.
            Images should supplement, not replace, text.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 2: Keep signatures out of reply/forward chains</h3>
          <p className="leading-relaxed mb-4">
            Configure your email client to only include the full HTML signature on new messages,
            not on replies and forwards. In Gmail: Settings &gt; See all settings &gt; General &gt;
            Signature &gt; uncheck &quot;Insert signature before quoted text&quot; for reply/forward. In
            Outlook: Tools &gt; Options &gt; Mail Format &gt; uncheck &quot;Automatically include my signature
            on replies and forwards&quot;. This keeps the full HTML out of long threads, preventing
            Gmail clipping and reducing total email size for every exchange.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 3: Monitor your sending domain reputation separately</h3>
          <p className="leading-relaxed mb-4">
            Signature deliverability is one piece of a larger picture. Your overall domain
            reputation (affected by your email sending volume, bounce rate, spam reports, and
            SPF/DKIM/DMARC configuration) matters more than any individual signature element.
            Check your domain reputation at Google Postmaster Tools and Microsoft SNDS (Smart
            Network Data Services) if you send high volumes. A clean domain reputation provides
            more leeway for individual email elements that might otherwise raise flags.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Tip 4: Use NeatStamp&apos;s deliverability score before every deployment</h3>
          <p className="leading-relaxed mb-4">
            Every time you update your signature — new job title, updated logo, new banner, added
            social platform — run the updated version through{" "}
            <Link href="/editor" className="text-blue-600 hover:underline font-medium">
              NeatStamp&apos;s deliverability checker
            </Link>{" "}
            before you push it out. Small changes can have unexpected deliverability impacts. A
            new banner adds two links and an image. A new social icon adds one link. It adds up.
            Checking first takes two minutes and catches problems before they affect your inbox
            placement.
          </p>
        </section>

        {/* ── SPECIFIC SITUATIONS ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Deliverability in specific situations</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Freelancers sending cold emails</h3>
          <p className="leading-relaxed mb-4">
            If you&apos;re a{" "}
            <Link href="/email-signature-for-freelancers" className="text-blue-600 hover:underline">
              freelancer
            </Link>{" "}
            sending outreach emails, deliverability matters enormously — your emails go to people
            who don&apos;t know you and haven&apos;t whitelisted your address. Keep your signature minimal:
            name, title, one link (your portfolio), one phone number. The cleaner your cold outreach
            email looks (including the signature), the better its chances of landing in the inbox.
            Save the elaborate signature for your existing client relationships.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Company-wide signatures and deliverability</h3>
          <p className="leading-relaxed mb-4">
            When you deploy a signature to 50+ employees via a{" "}
            <Link href="/email-signature-for-teams" className="text-blue-600 hover:underline">
              team signature management tool
            </Link>
            , any deliverability problem in that template affects every email from every employee.
            A tracking pixel in the master template means every employee&apos;s email carries a tracking
            pixel. Run the company signature through NeatStamp&apos;s deliverability checker and a tool
            like Mail-Tester before you deploy it. For{" "}
            <Link href="/email-signature-for-business" className="text-blue-600 hover:underline">
              business signatures
            </Link>
            , this is a standard pre-deployment check.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Sales teams and CRM-integrated signatures</h3>
          <p className="leading-relaxed mb-4">
            Sales email tools (Outreach, Salesloft, HubSpot Sequences) often inject tracking pixels
            into every sent email automatically — separate from your signature. If your signature
            also has tracking elements, the combined effect on spam scores can be significant.
            Work with your sales ops team to audit what tracking is being added at the tool level
            and make sure your signature doesn&apos;t add to it redundantly.
          </p>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/email-signature-gmail", label: "Gmail Email Signature Guide" },
              { href: "/email-signature-outlook", label: "Outlook Email Signature Guide" },
              { href: "/email-signature-for-business", label: "Business Email Signatures" },
              { href: "/email-signature-for-freelancers", label: "Freelancer Email Signatures" },
              { href: "/email-signature-for-teams", label: "Team Email Signature Management" },
              { href: "/blog/email-signature-best-practices", label: "Email Signature Best Practices" },
              { href: "/blog/email-signature-size", label: "Email Signature Size Guide" },
              { href: "/blog/email-signature-images-not-displaying", label: "Fix Images Not Displaying" },
              { href: "/email-signature-mobile-friendly", label: "Mobile Friendly Signatures" },
              { href: "/professional-email-signature", label: "Professional Email Signatures" },
              { href: "/templates", label: "Browse Signature Templates" },
              { href: "/pricing", label: "NeatStamp Pricing" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                {label} →
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-6 last:border-0">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="leading-relaxed text-slate-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
