import type { Metadata } from "next";
import AlternativePage from "@/components/AlternativePage";
import { ALTERNATIVE_PAGES } from "@/lib/alternativePages";

const page = ALTERNATIVE_PAGES.find((p) => p.slug === "alternative-to-newoldstamp")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `https://neatstamp.com/${page.slug}` },
};

export default function AlternativeToNewoldstampPage() {
  return <AlternativePage page={page} />;
}
