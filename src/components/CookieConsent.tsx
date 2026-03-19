"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "neatstamp-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — don't show banner
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(CONSENT_KEY, "true");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800 border-t border-slate-700">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-xs text-slate-300 flex-1 leading-relaxed">
          We use cookies and tracking pixels to improve your experience and
          measure signature performance.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/privacy"
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-2"
          >
            Learn more
          </Link>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
