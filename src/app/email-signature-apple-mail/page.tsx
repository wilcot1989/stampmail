import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { SEO_PAGES } from "@/lib/seoPages";

const page = SEO_PAGES.find((p) => p.slug === "email-signature-apple-mail")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `https://neatstamp.com/${page.slug}` },
};

export default function EmailSignatureAppleMailPage() {
  return <SeoLandingPage page={page} />;
}
