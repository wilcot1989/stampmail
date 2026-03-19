export default function Footer() {
  const main = "https://neatstamp.com";
  const app = "https://app.neatstamp.com";

  return (
    <footer className="border-t border-border bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Product</h3>
            <ul className="mt-6 space-y-3">
              <li><a href={`${app}/editor`} className="text-sm text-slate-400 hover:text-white transition-colors">Create Signature</a></li>
              <li><a href={`${main}/templates`} className="text-sm text-slate-400 hover:text-white transition-colors">Templates</a></li>
              <li><a href={`${main}/examples`} className="text-sm text-slate-400 hover:text-white transition-colors">Examples</a></li>
              <li><a href={`${main}/pricing`} className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Email Clients</h3>
            <ul className="mt-6 space-y-3">
              <li><a href={`${main}/email-signature-gmail`} className="text-sm text-slate-400 hover:text-white transition-colors">Gmail Signature</a></li>
              <li><a href={`${main}/email-signature-outlook`} className="text-sm text-slate-400 hover:text-white transition-colors">Outlook Signature</a></li>
              <li><a href={`${main}/email-signature-apple-mail`} className="text-sm text-slate-400 hover:text-white transition-colors">Apple Mail Signature</a></li>
              <li><a href={`${main}/email-signature-yahoo`} className="text-sm text-slate-400 hover:text-white transition-colors">Yahoo Mail Signature</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Use Cases</h3>
            <ul className="mt-6 space-y-3">
              <li><a href={`${main}/email-signature-for-business`} className="text-sm text-slate-400 hover:text-white transition-colors">For Business</a></li>
              <li><a href={`${main}/email-signature-for-freelancers`} className="text-sm text-slate-400 hover:text-white transition-colors">For Freelancers</a></li>
              <li><a href={`${main}/email-signature-for-students`} className="text-sm text-slate-400 hover:text-white transition-colors">For Students</a></li>
              <li><a href={`${main}/email-signature-for-real-estate`} className="text-sm text-slate-400 hover:text-white transition-colors">For Real Estate</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Company</h3>
            <ul className="mt-6 space-y-3">
              <li><a href={`${main}/about`} className="text-sm text-slate-400 hover:text-white transition-colors">About</a></li>
              <li><a href={`${main}/blog`} className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href={`${main}/privacy`} className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href={`${main}/terms`} className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
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
