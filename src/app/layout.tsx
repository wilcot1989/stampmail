import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import {
  WebsiteStructuredData,
  OrganizationStructuredData,
} from "@/components/StructuredData";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "NeatStamp — Free Email Signature Generator",
    template: "%s",
  },
  description:
    "Create professional email signatures for free. No account needed. Works in Gmail, Outlook, Apple Mail & more. Actually free — no paywall, no credit card.",
  keywords: [
    "email signature generator",
    "free email signature",
    "email signature maker",
    "email signature template",
    "email signature for gmail",
    "email signature for outlook",
    "professional email signature",
    "email signature creator",
    "email signature design",
    "business email signature",
  ],
  metadataBase: new URL("https://neatstamp.com"),
  openGraph: {
    title: "NeatStamp — Free Email Signature Generator",
    description:
      "Create professional email signatures in 60 seconds. Actually free. No account needed.",
    url: "https://neatstamp.com",
    siteName: "NeatStamp",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeatStamp — Free Email Signature Generator",
    description:
      "Create professional email signatures in 60 seconds. Actually free. No account needed.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://neatstamp.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <AuthProvider>
          <GoogleAnalytics />
          <WebsiteStructuredData />
          <OrganizationStructuredData />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
