import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/editor" className="text-sm text-muted hover:text-foreground">
                  Create Signature
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-sm text-muted hover:text-foreground">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-sm text-muted hover:text-foreground">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Email Clients</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/email-signature-gmail" className="text-sm text-muted hover:text-foreground">
                  Gmail Signature
                </Link>
              </li>
              <li>
                <Link href="/email-signature-outlook" className="text-sm text-muted hover:text-foreground">
                  Outlook Signature
                </Link>
              </li>
              <li>
                <Link href="/email-signature-apple-mail" className="text-sm text-muted hover:text-foreground">
                  Apple Mail Signature
                </Link>
              </li>
              <li>
                <Link href="/email-signature-yahoo" className="text-sm text-muted hover:text-foreground">
                  Yahoo Mail Signature
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Use Cases</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/email-signature-for-business" className="text-sm text-muted hover:text-foreground">
                  For Business
                </Link>
              </li>
              <li>
                <Link href="/email-signature-for-freelancers" className="text-sm text-muted hover:text-foreground">
                  For Freelancers
                </Link>
              </li>
              <li>
                <Link href="/email-signature-for-students" className="text-sm text-muted hover:text-foreground">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/email-signature-for-real-estate" className="text-sm text-muted hover:text-foreground">
                  For Real Estate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white font-bold text-xs">
              NS
            </div>
            <span className="text-sm font-semibold">NeatStamp</span>
          </div>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} NeatStamp. Professional email signatures, actually free.
          </p>
        </div>
      </div>
    </footer>
  );
}
