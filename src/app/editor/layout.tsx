import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Free Email Signature | NeatStamp Editor",
  description:
    "Free email signature generator. Choose a template, add your details, copy and paste. Works in Gmail, Outlook, Apple Mail & 30+ email clients. No account needed.",
  alternates: { canonical: "https://neatstamp.com/editor" },
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
