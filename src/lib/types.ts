export interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  photoUrl: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  github: string;
  youtube: string;
  primaryColor: string;
  accentColor: string;
  template: TemplateName;
  calendlyUrl: string;
  ctaBannerUrl: string;
  ctaBannerLink: string;
  pronouns: string;
  address: string;
}

export type TemplateName =
  | "minimal"
  | "modern"
  | "corporate"
  | "creative"
  | "bold"
  | "elegant"
  | "startup"
  | "compact"
  | "executive"
  | "gradient"
  | "developer"
  | "sales"
  | "medical"
  | "legal"
  | "academic"
  | "realtor"
  | "influencer"
  | "photographer"
  | "dark"
  | "simple";

export interface TemplateConfig {
  id: TemplateName;
  name: string;
  description: string;
  isPro: boolean;
  previewPhoto?: string;
  previewName?: string;
  previewTitle?: string;
  previewCompany?: string;
}

export const DEFAULT_SIGNATURE_DATA: SignatureData = {
  fullName: "Alex Johnson",
  jobTitle: "Marketing Manager",
  company: "Acme Corp",
  email: "alex@acmecorp.com",
  phone: "+1 (555) 123-4567",
  website: "www.acmecorp.com",
  photoUrl: "",
  linkedin: "https://linkedin.com/in/alexjohnson",
  twitter: "",
  instagram: "",
  facebook: "",
  github: "",
  youtube: "",
  primaryColor: "#2563eb",
  accentColor: "#f59e0b",
  template: "minimal",
  calendlyUrl: "",
  ctaBannerUrl: "",
  ctaBannerLink: "",
  pronouns: "",
  address: "",
};

export const TEMPLATES: TemplateConfig[] = [
  // --- Free templates ---
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple.",
    isPro: false,
    previewPhoto: "/images/templates/woman1.jpg",
    previewName: "Sarah Chen",
    previewTitle: "Marketing Manager",
    previewCompany: "Bloom Agency",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary with accent colors.",
    isPro: false,
    previewPhoto: "/images/templates/man1.jpg",
    previewName: "James Rivera",
    previewTitle: "Product Designer",
    previewCompany: "Vercel",
  },
  // --- Pro templates ---
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional for business.",
    isPro: true,
    previewPhoto: "/images/templates/man2.jpg",
    previewName: "Michael Brooks",
    previewTitle: "VP of Operations",
    previewCompany: "Sterling & Associates",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and colorful.",
    isPro: true,
    previewPhoto: "/images/templates/woman2.jpg",
    previewName: "Luna Martinez",
    previewTitle: "Art Director",
    previewCompany: "Pixelwave Studio",
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong colored impression.",
    isPro: true,
    previewPhoto: "/images/templates/man3.jpg",
    previewName: "David Park",
    previewTitle: "CEO & Founder",
    previewCompany: "Nexus AI",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated serif design.",
    isPro: true,
    previewPhoto: "/images/templates/woman3.jpg",
    previewName: "Victoria Wells",
    previewTitle: "Managing Partner",
    previewCompany: "Wells & Hart LLP",
  },
  {
    id: "startup",
    name: "Startup",
    description: "Dynamic for tech companies.",
    isPro: true,
    previewPhoto: "/images/templates/man4.jpg",
    previewName: "Ryan Patel",
    previewTitle: "CTO",
    previewCompany: "LaunchPad",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Minimal footprint.",
    isPro: true,
    previewName: "Emily Zhang",
    previewTitle: "Analyst",
    previewCompany: "Deloitte",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium dark header look.",
    isPro: true,
    previewPhoto: "/images/templates/man2.jpg",
    previewName: "Richard Thornton",
    previewTitle: "Chief Financial Officer",
    previewCompany: "Meridian Capital",
  },
  {
    id: "gradient",
    name: "Gradient",
    description: "Modern color gradient.",
    isPro: true,
    previewPhoto: "/images/templates/woman2.jpg",
    previewName: "Mia Nakamura",
    previewTitle: "Brand Strategist",
    previewCompany: "Prism Creative",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Code-inspired monospace.",
    isPro: true,
    previewPhoto: "/images/templates/man1.jpg",
    previewName: "Alex Kowalski",
    previewTitle: "Senior Engineer",
    previewCompany: "GitHub",
  },
  {
    id: "sales",
    name: "Sales",
    description: "CTA-focused for closers.",
    isPro: true,
    previewPhoto: "/images/templates/woman1.jpg",
    previewName: "Rachel Foster",
    previewTitle: "Account Executive",
    previewCompany: "Salesforce",
  },
  {
    id: "medical",
    name: "Medical",
    description: "Clean and professional.",
    isPro: true,
    previewPhoto: "/images/templates/woman3.jpg",
    previewName: "Dr. Amanda Liu",
    previewTitle: "Cardiologist",
    previewCompany: "St. Mary's Hospital",
  },
  {
    id: "legal",
    name: "Legal",
    description: "Formal and authoritative.",
    isPro: true,
    previewPhoto: "/images/templates/man4.jpg",
    previewName: "Thomas J. Crawford",
    previewTitle: "Senior Partner",
    previewCompany: "Crawford & Mills LLP",
  },
  {
    id: "academic",
    name: "Academic",
    description: "For universities and research.",
    isPro: true,
    previewPhoto: "/images/templates/man3.jpg",
    previewName: "Prof. Daniel Russo",
    previewTitle: "Professor of Computer Science",
    previewCompany: "MIT",
  },
  {
    id: "realtor",
    name: "Realtor",
    description: "Photo-first for real estate.",
    isPro: true,
    previewPhoto: "/images/templates/woman1.jpg",
    previewName: "Jessica Palmer",
    previewTitle: "Licensed Realtor",
    previewCompany: "Keller Williams",
  },
  {
    id: "influencer",
    name: "Influencer",
    description: "Social-first with large icons.",
    isPro: true,
    previewPhoto: "/images/templates/woman2.jpg",
    previewName: "Zara Mitchell",
    previewTitle: "Content Creator",
    previewCompany: "@zaramitchell",
  },
  {
    id: "photographer",
    name: "Photographer",
    description: "Visual and portfolio focused.",
    isPro: true,
    previewPhoto: "/images/templates/man1.jpg",
    previewName: "Marco Bellini",
    previewTitle: "Photographer",
    previewCompany: "Bellini Studios",
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Dark theme, modern feel.",
    isPro: true,
    previewPhoto: "/images/templates/man3.jpg",
    previewName: "Nathan Cole",
    previewTitle: "Lead Developer",
    previewCompany: "Midnight Labs",
  },
  {
    id: "simple",
    name: "Simple",
    description: "Text-only, ultra clean.",
    isPro: true,
    previewName: "Kate Morrison",
    previewTitle: "Consultant",
    previewCompany: "Independent",
  },
];
