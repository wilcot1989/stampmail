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
  | "compact";

export interface TemplateConfig {
  id: TemplateName;
  name: string;
  description: string;
  isPro: boolean;
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
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple. Perfect for any professional.",
    isPro: false,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with accent colors.",
    isPro: false,
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional look for business environments.",
    isPro: false,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with a bold, colorful design.",
    isPro: false,
  },
  {
    id: "bold",
    name: "Bold",
    description: "Make a strong impression with large text.",
    isPro: false,
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated design for premium brands.",
    isPro: true,
  },
  {
    id: "startup",
    name: "Startup",
    description: "Modern and dynamic for tech companies.",
    isPro: true,
  },
  {
    id: "compact",
    name: "Compact",
    description: "Minimal footprint, maximum information.",
    isPro: true,
  },
];
