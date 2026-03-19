"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "neatstamp-consent";

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (consent === "true") {
        setHasConsent(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!hasConsent || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
