"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a href="https://neatstamp.com" className="flex items-center">
          <img src="/logo.svg" alt="NeatStamp" className="h-9" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/editor"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Create Signature
          </Link>
          <Link
            href="/templates"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/examples"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Examples
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Pricing
          </Link>
          <div className="ml-3 pl-3 border-l border-slate-200">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700 transition-colors"
              >
                {session.user?.image && (
                  <img src={session.user.image} alt="" className="h-5 w-5 rounded-full" />
                )}
                Dashboard
              </Link>
            ) : (
              <Link
                href="/editor"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700 transition-colors"
              >
                Get Started — Free
              </Link>
            )}
          </div>
        </div>

        <button
          className="md:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-slate-100 md:hidden bg-white">
          <div className="flex flex-col gap-1 px-4 py-4">
            {[
              { href: "/editor", label: "Create Signature" },
              { href: "/templates", label: "Templates" },
              { href: "/examples", label: "Examples" },
              { href: "/pricing", label: "Pricing" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/editor"
              className="mt-2 rounded-full bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started — Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
