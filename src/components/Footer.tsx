import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Product</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <a href="https://app.neatstamp.com/editor" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Create Signature
                </a>
              </li>
              <li>
                <Link href="/templates" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Email Clients</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/email-signature-gmail" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Gmail Signature
                </Link>
              </li>
              <li>
                <Link href="/email-signature-outlook" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Outlook Signature
                </Link>
              </li>
              <li>
                <Link href="/email-signature-apple-mail" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Apple Mail Signature
                </Link>
              </li>
              <li>
                <Link href="/email-signature-yahoo" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Yahoo Mail Signature
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Use Cases</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/email-signature-for-business" className="text-sm text-slate-400 hover:text-white transition-colors">
                  For Business
                </Link>
              </li>
              <li>
                <Link href="/email-signature-for-freelancers" className="text-sm text-slate-400 hover:text-white transition-colors">
                  For Freelancers
                </Link>
              </li>
              <li>
                <Link href="/email-signature-for-students" className="text-sm text-slate-400 hover:text-white transition-colors">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/email-signature-for-real-estate" className="text-sm text-slate-400 hover:text-white transition-colors">
                  For Real Estate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Company</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center">
            <img src="/logo-light.svg" alt="NeatStamp" className="h-6" />
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} NeatStamp. Professional email signatures, actually free.
          </p>
        </div>
      </div>
    </footer>
  );
}
