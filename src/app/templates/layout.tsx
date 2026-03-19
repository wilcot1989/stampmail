import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Email Signature Templates — 8 Designs",
  description:
    "Browse free email signature templates: Minimal, Modern, Corporate, Creative, Bold & more. No signup needed. Customize colors, add logo, copy and paste. Works in Gmail & Outlook.",
  alternates: { canonical: "https://neatstamp.com/templates" },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
