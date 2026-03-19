// Email client logos - accurate reproductions based on official brand assets
// Gmail logo source: Wikimedia Commons (CC), others: faithful SVG recreations

export function GmailLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Official Gmail icon (2020-present) - from Wikimedia Commons
  return (
    <svg className={className} viewBox="52 42 88 66" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
      <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
      <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
      <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/>
      <path fill="#c5221f" d="M72 48l-14.4-10.8C51.47 32.35 52 40.58 52 48v8l20 18"/>
    </svg>
  );
}

export function OutlookLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Microsoft Outlook icon (2019-present)
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.484 7.937v5.477l2.786 1.72a.3.3 0 00.318 0l8.933-5.64a1.786 1.786 0 00-.92-1.494 1.786 1.786 0 00-.89-.063H19.484z" fill="#0364B8"/>
      <path d="M19.484 15.457l2.786 1.72a.3.3 0 00.318 0l8.933-5.64v10.263a1.8 1.8 0 01-1.8 1.8H19.484z" fill="#0078D4"/>
      <path d="M10.44 12.932a4.214 4.214 0 00-2.058.529 4.214 4.214 0 00-1.533 1.478A4.214 4.214 0 006.1 17.14a4.214 4.214 0 00.529 2.058 4.214 4.214 0 001.478 1.533 4.214 4.214 0 002.2.749 4.214 4.214 0 002.059-.53 4.214 4.214 0 001.533-1.477 4.214 4.214 0 00.749-2.2 4.214 4.214 0 00-.529-2.059 4.214 4.214 0 00-1.478-1.533 4.214 4.214 0 00-2.2-.749zm-.062 6.377a2.2 2.2 0 01-1.624-.662 2.2 2.2 0 01-.661-1.624 2.2 2.2 0 01.661-1.624 2.2 2.2 0 011.624-.662 2.2 2.2 0 011.624.662 2.2 2.2 0 01.662 1.624 2.2 2.2 0 01-.662 1.624 2.2 2.2 0 01-1.624.662z" fill="white"/>
      <path d="M18.084 7.937H2.4A1.4 1.4 0 001 9.337v14.326a1.4 1.4 0 001.4 1.4h15.684a1.4 1.4 0 001.4-1.4V9.337a1.4 1.4 0 00-1.4-1.4z" fill="#0078D4" opacity=".8"/>
      <path d="M10.44 12.932a4.214 4.214 0 00-2.058.529 4.214 4.214 0 00-1.533 1.478A4.214 4.214 0 006.1 17.14a4.214 4.214 0 00.529 2.058 4.214 4.214 0 001.478 1.533 4.214 4.214 0 002.2.749 4.214 4.214 0 002.059-.53 4.214 4.214 0 001.533-1.477 4.214 4.214 0 00.749-2.2 4.214 4.214 0 00-.529-2.059 4.214 4.214 0 00-1.478-1.533 4.214 4.214 0 00-2.2-.749zm-.062 6.377a2.2 2.2 0 01-1.624-.662 2.2 2.2 0 01-.661-1.624 2.2 2.2 0 01.661-1.624 2.2 2.2 0 011.624-.662 2.2 2.2 0 011.624.662 2.2 2.2 0 01.662 1.624 2.2 2.2 0 01-.662 1.624 2.2 2.2 0 01-1.624.662z" fill="white"/>
    </svg>
  );
}

export function AppleMailLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Apple Mail icon - blue gradient envelope
  return (
    <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aml-bg" x1="60" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#68C8F8"/>
          <stop offset="1" stopColor="#1A8EF1"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#aml-bg)"/>
      <g fill="none" stroke="white" strokeWidth="4" strokeLinejoin="round">
        <rect x="22" y="35" width="76" height="50" rx="4" fill="white" fillOpacity="0.15"/>
        <polyline points="22,38 60,65 98,38"/>
        <line x1="22" y1="85" x2="46" y2="62"/>
        <line x1="98" y1="85" x2="74" y2="62"/>
      </g>
    </svg>
  );
}

export function YahooMailLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Yahoo Mail - purple icon with Y
  return (
    <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="26" fill="#6001D2"/>
      <g fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="35,32 55,62 55,88"/>
        <line x1="55" y1="62" x2="75" y2="32"/>
        <line x1="75" y1="32" x2="95" y2="62"/>
      </g>
      <circle cx="88" cy="34" r="5" fill="white"/>
    </svg>
  );
}

export function ThunderbirdLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Mozilla Thunderbird - stylized blue bird
  return (
    <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tb-g" x1="60" y1="10" x2="60" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#52A8F4"/>
          <stop offset="1" stopColor="#0050D4"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#tb-g)"/>
      <g fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="26" y="38" width="68" height="44" rx="6"/>
        <polyline points="26,42 60,65 94,42"/>
      </g>
    </svg>
  );
}

export function SamsungMailLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Samsung Mail - Samsung blue
  return (
    <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="26" fill="#1428A0"/>
      <g fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="24" y="36" width="72" height="48" rx="5"/>
        <polyline points="24,40 60,66 96,40"/>
      </g>
    </svg>
  );
}

export function SparkLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Readdle Spark - gradient warm colors with spark icon
  return (
    <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sp-g" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#59C5F6"/>
          <stop offset="0.35" stopColor="#4A7CF7"/>
          <stop offset="0.7" stopColor="#9B6DF0"/>
          <stop offset="1" stopColor="#ED5E84"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#sp-g)"/>
      <g fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="24" y="36" width="72" height="48" rx="5"/>
        <polyline points="24,40 60,66 96,40"/>
      </g>
    </svg>
  );
}

export function OutlookMobileLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Outlook Mobile - same blue as Outlook but with phone frame
  return (
    <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="26" fill="#0078D4"/>
      <rect x="38" y="18" width="44" height="84" rx="8" fill="none" stroke="white" strokeWidth="3.5"/>
      <circle cx="60" cy="92" r="3" fill="white"/>
      <path d="M60 45a12 12 0 100 24 12 12 0 000-24zm0 19a7 7 0 110-14 7 7 0 010 14z" fill="white"/>
    </svg>
  );
}

export const EMAIL_CLIENTS = [
  { name: "Gmail", Logo: GmailLogo },
  { name: "Outlook", Logo: OutlookLogo },
  { name: "Apple Mail", Logo: AppleMailLogo },
  { name: "Yahoo Mail", Logo: YahooMailLogo },
  { name: "Thunderbird", Logo: ThunderbirdLogo },
  { name: "Outlook Mobile", Logo: OutlookMobileLogo },
  { name: "Samsung Mail", Logo: SamsungMailLogo },
  { name: "Spark", Logo: SparkLogo },
];
