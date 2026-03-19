"use client";

import { useState, useEffect, useRef } from "react";
import { SignatureData, TemplateName, DEFAULT_SIGNATURE_DATA } from "@/lib/types";
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";
import TemplateSelector from "@/components/TemplateSelector";
import Link from "next/link";

const steps = [
  { number: 1, label: "Choose a template" },
  { number: 2, label: "Enter your details" },
  { number: 3, label: "Copy & go" },
];

export default function EditorPage() {
  const [data, setData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleTemplateSelect = (template: TemplateName) => {
    setData({ ...data, template });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButton(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );
    if (previewRef.current) observer.observe(previewRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <nav className="flex items-center justify-center gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-semibold">
                  {step.number}
                </div>
                <span className="mt-1 text-xs font-medium text-muted hidden sm:block whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="mx-2 mb-4 h-px w-12 bg-border sm:w-20" />
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Create Your Email Signature
        </h1>
        <p className="mt-2 text-muted">
          Free. No account needed. Works in Gmail, Outlook, Apple Mail & more.
        </p>
      </div>

      <div className="mb-2">
        <TemplateSelector
          data={data}
          selectedTemplate={data.template}
          onSelect={handleTemplateSelect}
        />
      </div>

      {/* Pro template note */}
      <p className="mb-8 text-center text-xs text-muted">
        Pro templates require a $5/mo subscription.{" "}
        <span className="font-medium text-foreground">Try our 5 free templates first!</span>
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="sticky top-20">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Your Details
            </h2>
            <SignatureForm data={data} onChange={setData} />
          </div>
        </div>
        <div>
          <div className="sticky top-20" ref={previewRef}>
            <SignaturePreview data={data} />

            {/* Why sign up card */}
            <div className="mt-6 rounded-xl border border-border bg-surface p-5">
              <h3 className="text-sm font-semibold text-foreground mb-2">Why sign up?</h3>
              <ul className="space-y-1 text-sm text-muted mb-4">
                <li>Save your signature for later</li>
                <li>Create multiple signatures</li>
                <li>Get premium templates &amp; analytics</li>
              </ul>
              <Link
                href="https://app.neatstamp.com/login"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
                </svg>
                Sign in with Google
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky floating copy button */}
      {showStickyButton && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <button
            onClick={() => previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-dark transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
            Copy Signature
          </button>
        </div>
      )}
    </div>
  );
}
