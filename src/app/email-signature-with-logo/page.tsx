import type { Metadata } from "next";
import Link from "next/link";
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Email Signature with Logo — How to Add Yours (Free) | NeatStamp",
  description:
    "A logo makes your email signature look 10x more professional. Here's exactly how to add it, size it correctly, and fix the common problems (blurry logo, attachment icon, broken in Outlook).",
  alternates: { canonical: "https://neatstamp.com/email-signature-with-logo" },
};

const faqs = [
  {
    q: "What size should a logo be in an email signature?",
    a: "Keep your logo height between 70px and 100px in the signature itself. The source file should be at least 200px tall so it doesn't look blurry on high-DPI screens. Width will scale proportionally — don't force a fixed width that distorts the aspect ratio.",
  },
  {
    q: "Why does my logo show up as an attachment in Outlook?",
    a: "Outlook treats base64-encoded images (images embedded directly in the HTML) as attachments. The fix is to host your logo at a public URL and reference it with an img src tag pointing to that URL. NeatStamp hosts your uploaded images automatically.",
  },
  {
    q: "Should I use PNG or JPG for my email signature logo?",
    a: "PNG is almost always better. PNG supports transparent backgrounds, which means your logo looks clean on any email background color. JPG compression can introduce visible artifacts around logos, especially text-based ones. Use a PNG with a transparent background if you have one.",
  },
  {
    q: "Can I have both a logo and a headshot in my email signature?",
    a: "Yes, and it works well when done right. The typical approach is a headshot on the left (80–100px square, circular crop) with your name and title, and the company logo below the contact details. Avoid putting both images side by side — it crowds the signature on mobile.",
  },
  {
    q: "Why does my logo look blurry in my email signature?",
    a: "Usually a source resolution issue. If your original logo file is only 70px wide and you're displaying it at 70px, it'll look blurry on retina/high-DPI screens because those screens need 2x the pixels. Start with a source image at least 200px in its longest dimension and let the HTML scale it down.",
  },
  {
    q: "How do I make my logo a clickable link in my email signature?",
    a: "Wrap the img tag in an anchor tag pointing to your website. Most email signature generators, including NeatStamp, handle this automatically — you just enter your website URL and it links the logo. In raw HTML it looks like: <a href='https://yoursite.com'><img src='...' /></a>",
  },
  {
    q: "Why does my logo show a broken image icon in some emails?",
    a: "A few possible causes: the image URL is returning a 404 (the file moved or was deleted), the recipient's email client is blocking external images by default (common in Outlook), or the image was embedded as base64 and something corrupted the encoding. Hosting the image at a stable public URL fixes the first two.",
  },
  {
    q: "Does a logo in an email signature increase file size?",
    a: "If you're using a hosted URL (which you should be), the logo adds essentially nothing to the email file size — it's just a link. If you're using base64 embedding, a small logo can add 10–30KB to every email. Over thousands of emails that adds up, and many corporate email systems have size limits.",
  },
];

export default function EmailSignatureWithLogoPage() {
  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neatstamp.com" },
          { name: "Email Signature with Logo", url: "https://neatstamp.com/email-signature-with-logo" },
        ]}
      />

      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-700">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">Email Signature with Logo</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Email Signature with Logo — How to Add Yours (Free)
            </h1>
            <p className="mt-5 text-xl text-slate-600 leading-relaxed">
              A logo makes your signature look 10x more professional. But getting it right is trickier than you'd think — there are sizing rules, format choices, and a handful of Outlook-specific quirks that trip people up every time.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>Updated March 2026</span>
              <span>·</span>
              <span>~3,000 words</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

          {/* Intro */}
          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              Most people who add a logo to their email signature do it roughly right. They upload an image, it appears in the signature, they move on. But "roughly right" shows up in the emails: the logo looks slightly blurry, it appears as an attachment, or it doesn't load at all for Outlook users who haven't enabled images.
            </p>
            <p>
              This guide covers every part of the process properly — which image format to use, what dimensions actually work across clients, and how to diagnose the problems when they come up. I'll also cover when a headshot makes more sense than a logo, and when you should use both.
            </p>
          </div>

          {/* Company logo vs headshot */}
          <div className="mt-14">
            <h2 className="text-3xl font-bold text-slate-900">Company logo vs headshot — which one to use?</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              This depends almost entirely on context, not on what looks better in the abstract.
            </p>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-6">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Use the company logo when:</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>→ You're representing the company, not yourself personally</li>
                  <li>→ Multiple employees need to use the same signature template</li>
                  <li>→ You're in a role where brand recognition matters (sales, marketing, client services)</li>
                  <li>→ You don't have a professional headshot</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-6">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Use a headshot when:</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>→ You're in a relationship-driven role (consulting, coaching, recruiting)</li>
                  <li>→ You're a freelancer or sole trader</li>
                  <li>→ Building trust with new contacts is the main goal</li>
                  <li>→ You send a lot of cold or first-contact emails</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Can you use both?</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Yes, and it works well when the layout is considered. The most effective approach I've seen: headshot on the left at 80–100px, name and title to the right of it, then company logo below the divider line with contact details. What doesn't work is placing them side by side at similar sizes — it creates visual clutter and the signature looks like it's trying too hard. See the <Link href="/email-signature-examples-with-logo" className="text-blue-600 hover:underline">email signature examples with logo page</Link> for layouts that get this right.
              </p>
              <p className="mt-3 text-slate-600 text-sm">
                Sizing note: headshots should be square at 80–100px (circular crop works in most clients). Logos should be wider than tall in most cases — a standard landscape logo at 140px wide and 50px tall reads cleanly.
              </p>
            </div>
          </div>

          {/* How to add a logo */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">How to add a logo to your email signature with NeatStamp</h2>
            <p className="mt-3 text-slate-600">
              This takes about 3 minutes. You can do it in the <Link href="/editor" className="text-blue-600 hover:underline">NeatStamp editor</Link> without creating an account.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  step: "1",
                  title: "Open the editor and fill in your details",
                  desc: "Go to neatstamp.com/editor. Enter your name, title, company, phone, and email address. You'll see a live preview update as you type.",
                },
                {
                  step: "2",
                  title: "Upload your logo",
                  desc: "Click the logo upload area. Upload a PNG file — ideally with a transparent background. NeatStamp hosts the image automatically, so it'll have a stable URL rather than being embedded as base64.",
                },
                {
                  step: "3",
                  title: "Adjust the logo size",
                  desc: "Use the height slider to set the display size. For most logos, 60–80px height is the right range. The width scales proportionally. Check the preview — if it looks sharp there, it'll look sharp in email.",
                },
                {
                  step: "4",
                  title: "Add your website link",
                  desc: "Enter your website URL in the link field so the logo is clickable. This is one of the most consistently useful things in an email signature — people click company logos expecting to go to the website.",
                },
                {
                  step: "5",
                  title: "Choose a template and export",
                  desc: "Pick a template from the sidebar — the templates on the right-hand side are designed to give logos proper visual weight. Then use the copy button for Gmail, or the Outlook installation guide for Outlook.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 rounded-xl border border-slate-200 p-5">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{s.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Need client-specific instructions? See the full guides for <Link href="/email-signature-gmail" className="text-blue-600 hover:underline">Gmail</Link> and <Link href="/email-signature-outlook" className="text-blue-600 hover:underline">Outlook</Link>.
            </p>
          </div>

          {/* Logo sizing guide */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">Logo sizing guide — exact numbers</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Logo sizing is where most people go wrong, and it's usually in one of two directions: too big (takes over the signature) or too small from a low-res source file (looks blurry). Here's the spec that works:
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Use case</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Display size</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Source size minimum</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { use: "Landscape logo (wide)", display: "120–160px wide, 40–60px tall", source: "300px wide", format: "PNG with transparent bg" },
                    { use: "Square logo (icon/mark)", display: "60–80px square", source: "200px square", format: "PNG with transparent bg" },
                    { use: "Headshot (circular)", display: "80–100px square", source: "200px square", format: "JPG or PNG" },
                    { use: "Logo + headshot combo", display: "Logo: 120px wide / Headshot: 80px", source: "Both at 200px+", format: "PNG for logo, JPG for headshot" },
                  ].map((row) => (
                    <tr key={row.use} className="bg-white even:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.use}</td>
                      <td className="px-4 py-3 text-slate-600">{row.display}</td>
                      <td className="px-4 py-3 text-slate-600">{row.source}</td>
                      <td className="px-4 py-3 text-slate-600">{row.format}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                <h3 className="font-semibold text-amber-900">PNG vs JPG: why it matters</h3>
                <p className="mt-2 text-sm text-amber-800 leading-relaxed">
                  PNG supports transparent backgrounds; JPG does not. If your logo has a transparent background and you save it as JPG, the transparency becomes white — which looks fine on a white email background but breaks completely on any other background color. Always use PNG for logos with transparency. JPG is fine for headshots where you want the background.
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
                <h3 className="font-semibold text-blue-900">Retina / high-DPI screens</h3>
                <p className="mt-2 text-sm text-blue-800 leading-relaxed">
                  Modern phones, MacBooks, and many monitors are high-DPI (2x pixel density). An image displayed at 80px on a high-DPI screen actually needs 160px of source pixels to look sharp. This is why you need a source file that's at least 2x your intended display size. If you only have a low-res logo, ask your designer for a vector version (SVG or AI file) and export it at the right size.
                </p>
              </div>
            </div>
          </div>

          {/* Blurry logo */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">Why your logo looks blurry (and how to fix it)</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Blurry logos in email signatures have a few causes, and fortunately most are fixable without a designer.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  problem: "Low-resolution source file",
                  detail: "If your logo file is 60x20px and you're displaying it at 60x20px, it looks fine on a standard screen but blurry on any high-DPI display (iPhone, MacBook Retina, most modern monitors). The fix: get a higher-resolution version. If your logo is in Canva or any design tool, just re-export it at 300px or 400px wide.",
                  fix: "Re-export at 2x–3x the display size",
                },
                {
                  problem: "JPEG compression artifacts",
                  detail: "JPG format uses lossy compression that introduces visible noise and blurring around edges, especially on text-based logos. The compression is designed for photographs, not flat graphics with sharp lines. Switch to PNG.",
                  fix: "Convert to PNG format",
                },
                {
                  problem: "Outlook's DPI rendering",
                  detail: "Outlook on Windows uses a fixed DPI rendering that can make images appear slightly soft compared to other clients. Adding width and height attributes to your img tag (not just setting one of them via CSS) tells Outlook the exact dimensions and reduces scaling artifacts.",
                  fix: "Set explicit width and height attributes in HTML",
                },
                {
                  problem: "Browser/email client image downsampling",
                  detail: "Some email clients downscale images using a nearest-neighbor algorithm instead of bilinear, which produces a pixelated look. Using an image that's already close to the correct display size (rather than a very large image scaled down) minimizes this.",
                  fix: "Use source file at 2x display size — not 5x",
                },
              ].map((item) => (
                <div key={item.problem} className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{item.problem}</p>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {item.fix}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachment issue */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">Why your logo shows as an attachment in Outlook</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              This is one of the most common and most frustrating email signature problems. You set up a beautiful signature, send a test email, and the recipient sees a paperclip icon indicating an attachment — even though you didn't attach anything.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Here's the technical explanation: there are two ways to include an image in an email. The first is to reference it by URL — your img tag says "go fetch this image from https://example.com/logo.png." The image loads from a remote server each time the email is viewed. The second is to embed it as base64 — the entire image is converted to a long string of text and included directly in the HTML.
            </p>
            <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Why Outlook treats base64 images as attachments</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Outlook's rendering engine (which uses Word's HTML renderer, not a browser engine) doesn't always handle base64-embedded images correctly. In many cases, it strips the embedded image out of the HTML and re-attaches it as a separate file — which is why you see it as an attachment. This isn't a bug in Outlook per se; it's a consequence of how the MIME email format works and Outlook's conservative interpretation of it.
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                The fix is straightforward: use a hosted image URL instead of base64 embedding. NeatStamp hosts your uploaded logo automatically when you build a signature — so the img src in your exported HTML points to a URL on our servers, not to a base64 blob. This eliminates the attachment problem.
              </p>
            </div>
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-5">
              <p className="text-sm font-semibold text-amber-900">One tradeoff to know:</p>
              <p className="mt-1 text-sm text-amber-800 leading-relaxed">
                Hosted images require the server to be up and accessible. If you use your own server to host logo images and it goes down, the image breaks in older emails. NeatStamp's CDN has 99.9%+ uptime specifically to handle this. If you're self-hosting, make sure the URL is stable and long-lived.
              </p>
            </div>
          </div>

          {/* Logo signature examples */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900">Logo email signature examples</h2>
            <p className="mt-3 text-slate-600">
              There are a few common layouts that work well. Here's what each looks like and when to use it. For actual rendered examples, see the <Link href="/email-signature-examples-with-logo" className="text-blue-600 hover:underline">email signature examples with logo gallery</Link>.
            </p>

            <div className="mt-7 space-y-5">
              {[
                {
                  name: "Logo left, text right",
                  when: "Corporate teams with a wide horizontal logo",
                  desc: "The logo sits in the left column at 50–70px tall. Name, title, and contact details stack on the right. This is the most common enterprise layout and it works in every email client without issues. The logo becomes the visual anchor. Works especially well with a subtle divider between columns.",
                  tip: "Keep the left column narrow — 120–160px wide max. Wider logos push the text too far right on mobile.",
                },
                {
                  name: "Logo below contact details",
                  when: "Most general use cases",
                  desc: "Name and contact details sit at the top, a thin horizontal rule divides the section, and the logo appears below. This is the layout NeatStamp uses by default in most templates. It's clean, works on mobile, and doesn't force the logo and text to compete for attention.",
                  tip: "Add a small amount of padding above the logo (8–10px) so the divider doesn't feel cramped.",
                },
                {
                  name: "Circular headshot, with logo badge",
                  when: "Consultants, coaches, personal brands",
                  desc: "A circular headshot crop (80–100px) on the left, name and title on the right, and a smaller company logo (40–50px) placed below the title. This format says 'you're dealing with a real person who works at a real company' — which is exactly what relationship-driven roles need.",
                  tip: "The headshot should be clearly the primary image. If the company logo is too large relative to the headshot, it competes.",
                },
                {
                  name: "Centered logo, centered text",
                  when: "Creative agencies, design studios",
                  desc: "Everything centered: logo at top, name and title below, contact details below that. This layout has a business-card feel. It looks excellent in a well-designed template but can feel cold without the right brand elements. Check how it looks on mobile — centered layouts sometimes collapse awkwardly on narrow screens.",
                  tip: "Test in Gmail on mobile before committing. If the logo and text reflow oddly, use the left-aligned version instead.",
                },
                {
                  name: "Text-only with favicon",
                  when: "Plain text email fans, or when bandwidth matters",
                  desc: "Some professionals deliberately avoid images in signatures to keep emails lightweight and to avoid 'blocked images' issues. A 16px or 20px favicon-style icon next to the company name is the compromise — it adds a subtle visual identifier without the rendering risk of a full logo. Not for everyone, but worth considering if your emails go to heavily filtered inboxes.",
                  tip: "Use a 32px PNG favicon file — it scales cleanly to 16–20px display size.",
                },
              ].map((ex) => (
                <div key={ex.name} className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-900">{ex.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Best for: {ex.when}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-slate-600 leading-relaxed">{ex.desc}</p>
                    <p className="mt-3 text-sm text-slate-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                      <span className="font-medium">Tip:</span> {ex.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-blue-600 p-8 text-center">
            <h2 className="text-2xl font-bold text-white">Add your logo in under 5 minutes</h2>
            <p className="mt-2 text-blue-100">
              NeatStamp hosts your logo automatically and generates HTML that works in Outlook and Gmail.
            </p>
            <Link
              href="/editor"
              className="mt-6 inline-flex items-center rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Build your signature — free
            </Link>
          </div>

          {/* Related guides */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900">Related guides</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/email-signature-examples-with-logo", label: "Email signature examples with logo gallery" },
                { href: "/email-signature-gmail", label: "How to install your signature in Gmail" },
                { href: "/email-signature-outlook", label: "How to install your signature in Outlook" },
                { href: "/email-signature-design", label: "Email signature design best practices" },
                { href: "/professional-email-signature", label: "What makes a professional email signature" },
                { href: "/html-email-signature", label: "HTML email signature — technical deep dive" },
                { href: "/templates", label: "Browse logo-ready signature templates" },
                { href: "/email-signature-for-business", label: "Email signature for business — full guide" },
                { href: "/best-email-signature-generator", label: "Best email signature generators compared" },
                { href: "/editor", label: "Create your signature now — free" },
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
