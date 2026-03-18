"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            NS
          </div>
          <span className="text-xl font-bold text-foreground">
            Neat<span className="text-primary">Stamp</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/editor"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Create Signature
          </Link>
          <Link
            href="/templates"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/examples"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Examples
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/editor"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Get Started — Free
          </Link>
        </div>

        <button
          className="md:hidden p-2"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            <Link
              href="/editor"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-surface"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Signature
            </Link>
            <Link
              href="/templates"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-surface"
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="/examples"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-surface"
              onClick={() => setMobileMenuOpen(false)}
            >
              Examples
            </Link>
            <Link
              href="/pricing"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-surface"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/editor"
              className="mt-2 rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-white"
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
