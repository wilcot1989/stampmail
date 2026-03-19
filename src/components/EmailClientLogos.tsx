export function GmailLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 16.2l-5 2.75-8 4.5V14l6.5-4.5 2.75 2c2.1 1.44 3.75 3.6 3.75 4.7z" fill="#4285F4"/>
      <path d="M3 16.2l5 2.75 8 4.5V14L9.5 9.5 6.75 11.5C4.65 12.94 3 15.1 3 16.2z" fill="#34A853"/>
      <path d="M16 37V23.45L3 16.2V37c0 2.21 1.79 4 4 4h12l3-4H16z" fill="#34A853"/>
      <path d="M45 16.2V37c0 2.21-1.79 4-4 4H29l3-4h8V23.45L32 19.25l8 4.25 5-2.75V16.2z" fill="#4285F4"/>
      <path d="M45 37c0 2.21-1.79 4-4 4H29l-5-7 5-4 11-6.55V37z" fill="#1967D2"/>
      <path d="M3 37c0 2.21 1.79 4 4 4h12l5-7-5-4-11-6.55V37z" fill="#1967D2"/>
      <path d="M24 26l-8-12.55L3 16.2l13 7.25L24 26z" fill="#EA4335"/>
      <path d="M40 14l-8 9.45L24 26l8-2.75 8-4.5V14z" fill="#FBBC04"/>
      <path d="M40 14l-8 9.45-8 2.55-8-2.55L8 14l16 12 16-12z" fill="#EA4335"/>
    </svg>
  );
}

export function OutlookLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28.5 44H42a2 2 0 002-2V17.5L28.5 26v18z" fill="#1976D2"/>
      <path d="M44 17.5l-15.5 8.5L44 17.5zm0 0V10a2 2 0 00-2-2H28.5l-4 6.5L44 17.5z" fill="#2196F3"/>
      <path d="M28.5 8H14a2 2 0 00-2 2v28a2 2 0 002 2h14.5V8z" fill="#0D47A1"/>
      <rect x="4" y="12" width="24" height="24" rx="2" fill="#0D47A1"/>
      <path d="M16 20.5c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5zm0 10.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white"/>
    </svg>
  );
}

export function AppleMailLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="url(#apple-mail-grad)"/>
      <path d="M8 16l16 10 16-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="8" y="14" width="32" height="20" rx="2" stroke="white" strokeWidth="2.5" fill="none"/>
      <defs>
        <linearGradient id="apple-mail-grad" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5AC8FA"/>
          <stop offset="1" stopColor="#007AFF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function YahooMailLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#6001D2"/>
      <path d="M10 14l8 12v8h4v-8l-2-3" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M20 26l8-12" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M28 14l8 12" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="36" cy="14" r="2.5" fill="white"/>
    </svg>
  );
}

export function ThunderbirdLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="url(#tb-grad)"/>
      <path d="M12 20c0-6.627 5.373-12 12-12s12 5.373 12 12v8c0 6.627-5.373 12-12 12S12 34.627 12 28v-8z" fill="url(#tb-grad2)" opacity="0.8"/>
      <path d="M14 22l10 6 10-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="tb-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A84FF"/>
          <stop offset="1" stopColor="#0060DF"/>
        </linearGradient>
        <linearGradient id="tb-grad2" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#45A1FF"/>
          <stop offset="1" stopColor="#0A84FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SamsungMailLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#1428A0"/>
      <path d="M10 16l14 9 14-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="10" y="14" width="28" height="20" rx="2" stroke="white" strokeWidth="2" fill="none"/>
    </svg>
  );
}

export function SparkLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="url(#spark-grad)"/>
      <path d="M24 10l3 10h10l-8 6 3 10-8-6-8 6 3-10-8-6h10z" fill="white"/>
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B6B"/>
          <stop offset="0.5" stopColor="#EE5A24"/>
          <stop offset="1" stopColor="#F9CA24"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function OutlookMobileLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#0078D4"/>
      <path d="M24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="white"/>
      <rect x="16" y="10" width="16" height="28" rx="3" stroke="white" strokeWidth="1.5" fill="none"/>
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
