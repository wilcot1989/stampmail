import type { Metadata } from "next";
import SeoLandingPage from "@/components/SeoLandingPage";
import { SEO_PAGES_2 } from "@/lib/seoPages2";

const page = SEO_PAGES_2.find((p) => p.slug === "email-signature-maker")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `https://neatstamp.com/${page.slug}` },
};

export default function EmailSignatureMakerPage() {
  return <SeoLandingPage page={page} />;
}
