"use client";

import Link from "next/link";
import { SignatureData } from "@/lib/types";
import { generateSignatureHtml } from "@/lib/generateSignature";

const EXAMPLES: { label: string; data: SignatureData }[] = [
  {
    label: "Marketing Manager",
    data: {
      fullName: "Sarah Chen",
      jobTitle: "Marketing Manager",
      company: "Acme Corp",
      email: "sarah@acmecorp.com",
      phone: "+1 (415) 555-0182",
      website: "www.acmecorp.com",
      photoUrl: "",
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "",
      instagram: "",
      facebook: "",
      github: "",
      youtube: "",
      primaryColor: "#2563eb",
      accentColor: "#f59e0b",
      template: "modern",
      calendlyUrl: "",
      ctaBannerUrl: "",
      ctaBannerLink: "",
      pronouns: "she/her",
      address: "San Francisco, CA",
    },
  },
  {
    label: "Software Developer",
    data: {
      fullName: "Marcus Williams",
      jobTitle: "Senior Software Engineer",
      company: "BuildFast Inc.",
      email: "marcus@buildfast.io",
      phone: "+1 (512) 555-0947",
      website: "marcuswilliams.dev",
      photoUrl: "",
      linkedin: "https://linkedin.com/in/marcuswilliams",
      twitter: "",
      instagram: "",
      facebook: "",
      github: "https://github.com/marcuswilliams",
      youtube: "",
      primaryColor: "#16a34a",
      accentColor: "#6366f1",
      template: "startup",
      calendlyUrl: "",
      ctaBannerUrl: "",
      ctaBannerLink: "",
      pronouns: "he/him",
      address: "Austin, TX",
    },
  },
  {
    label: "Real Estate Agent",
    data: {
      fullName: "Diana Morales",
      jobTitle: "Licensed Real Estate Agent | DRE #9981234",
      company: "Sunrise Realty Group",
      email: "diana@sunriserealty.com",
      phone: "+1 (310) 555-0234",
      website: "www.sunriserealty.com",
      photoUrl: "",
      linkedin: "https://linkedin.com/in/dianamorales",
      twitter: "",
      instagram: "",
      facebook: "",
      github: "",
      youtube: "",
      primaryColor: "#dc2626",
      accentColor: "#f59e0b",
      template: "corporate",
      calendlyUrl: "https://calendly.com/dianamorales",
      ctaBannerUrl: "",
      ctaBannerLink: "",
      pronouns: "",
      address: "Los Angeles, CA 90210",
    },
  },
  {
    label: "Freelance Designer",
    data: {
      fullName: "Jordan Blake",
      jobTitle: "Freelance Brand Designer",
      company: "",
      email: "hello@jordanblake.design",
      phone: "+1 (646) 555-0371",
      website: "jordanblake.design",
      photoUrl: "",
      linkedin: "https://linkedin.com/in/jordanblake",
      twitter: "",
      instagram: "https://instagram.com/jordanblakedesign",
      facebook: "",
      github: "",
      youtube: "",
      primaryColor: "#7c3aed",
      accentColor: "#ec4899",
      template: "creative",
      calendlyUrl: "https://calendly.com/jordanblake",
      ctaBannerUrl: "",
      ctaBannerLink: "",
      pronouns: "they/them",
      address: "Brooklyn, NY",
    },
  },
  {
    label: "CEO",
    data: {
      fullName: "Robert Hartmann",
      jobTitle: "Chief Executive Officer",
      company: "Nexus Ventures",
      email: "robert@nexusventures.com",
      phone: "+1 (212) 555-0601",
      website: "www.nexusventures.com",
      photoUrl: "",
      linkedin: "https://linkedin.com/in/roberthartmann",
      twitter: "",
      instagram: "",
      facebook: "",
      github: "",
      youtube: "",
      primaryColor: "#1e293b",
      accentColor: "#c2a04c",
      template: "elegant",
      calendlyUrl: "",
      ctaBannerUrl: "",
      ctaBannerLink: "",
      pronouns: "",
      address: "New York, NY 10022",
    },
  },
  {
    label: "Student",
    data: {
      fullName: "Priya Patel",
      jobTitle: "Computer Science, Class of 2027",
      company: "MIT",
      email: "ppatel@mit.edu",
      phone: "+1 (617) 555-0489",
      website: "",
      photoUrl: "",
      linkedin: "https://linkedin.com/in/priyapatel",
      twitter: "",
      instagram: "",
      facebook: "",
      github: "https://github.com/priyapatel",
      youtube: "",
      primaryColor: "#0891b2",
      accentColor: "#f59e0b",
      template: "minimal",
      calendlyUrl: "",
      ctaBannerUrl: "",
      ctaBannerLink: "",
      pronouns: "she/her",
      address: "Cambridge, MA",
    },
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Email Signature Examples for Every Profession
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how NeatStamp signatures look across different industries and
            roles. Click any example to open the editor and create your own.
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {EXAMPLES.map((example) => {
            const html = generateSignatureHtml(example.data);
            return (
              <div
                key={example.label}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">
                    {example.label}
                  </h2>
                  <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    Template: {example.data.template}
                  </span>
                </div>
                <div className="p-8 overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <Link
                    href="/editor"
                    className="text-sm text-blue-600 font-medium hover:text-blue-700"
                  >
                    Create a similar signature &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-white rounded-2xl border border-gray-200 p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Create yours in 60 seconds
          </h2>
          <p className="text-gray-600 mb-6">
            Free. No account needed. Works in Gmail, Outlook, Apple Mail, and
            more.
          </p>
          <Link
            href="/editor"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Build My Email Signature
          </Link>
        </div>
      </div>
    </div>
  );
}
