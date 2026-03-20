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

// ---------------------------------------------------------------------------
// Wrapper settings — global signature-level styling
// ---------------------------------------------------------------------------

export interface WrapperSettings {
  fontFamily: string;
  baseFontSize: number;
  backgroundColor: string; // "none" or hex
  backgroundRadius: number;
  backgroundPadding: number;
  textOnDark: boolean;
  borderTop: string; // "" or "3px solid #2563eb"
  borderLeft: string; // "" or "3px solid #2563eb"
  headerBackground: string; // "" or "#1e293b" (executive dark header)
}

export const DEFAULT_WRAPPER_SETTINGS: WrapperSettings = {
  fontFamily: "Arial,Helvetica,sans-serif",
  baseFontSize: 14,
  backgroundColor: "none",
  backgroundRadius: 0,
  backgroundPadding: 0,
  textOnDark: false,
  borderTop: "",
  borderLeft: "",
  headerBackground: "",
};

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
  styleCategory?: string;
  professionCategory?: string;
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
    styleCategory: "minimal",
    professionCategory: "business",
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
    styleCategory: "modern",
    professionCategory: "tech",
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
    styleCategory: "corporate",
    professionCategory: "business",
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
    styleCategory: "creative",
    professionCategory: "creative-pro",
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
    styleCategory: "bold",
    professionCategory: "business",
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
    styleCategory: "corporate",
    professionCategory: "legal",
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
    styleCategory: "modern",
    professionCategory: "tech",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Minimal footprint.",
    isPro: true,
    previewName: "Emily Zhang",
    previewTitle: "Analyst",
    previewCompany: "Deloitte",
    styleCategory: "compact",
    professionCategory: "business",
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
    styleCategory: "corporate",
    professionCategory: "business",
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
    styleCategory: "modern",
    professionCategory: "creative-pro",
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
    styleCategory: "modern",
    professionCategory: "tech",
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
    styleCategory: "bold",
    professionCategory: "business",
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
    styleCategory: "minimal",
    professionCategory: "medical",
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
    styleCategory: "corporate",
    professionCategory: "legal",
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
    styleCategory: "minimal",
    professionCategory: "academic",
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
    styleCategory: "modern",
    professionCategory: "real-estate",
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
    styleCategory: "creative",
    professionCategory: "creative-pro",
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
    styleCategory: "creative",
    professionCategory: "creative-pro",
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
    styleCategory: "bold",
    professionCategory: "tech",
  },
  {
    id: "simple",
    name: "Simple",
    description: "Text-only, ultra clean.",
    isPro: true,
    previewName: "Kate Morrison",
    previewTitle: "Consultant",
    previewCompany: "Independent",
    styleCategory: "minimal",
    professionCategory: "business",
  },
];

// ---------------------------------------------------------------------------
// Color themes — multiply templates by applying different palettes
// ---------------------------------------------------------------------------

export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  accent: string;
  swatch: string; // display color for the theme pill
}

export const COLOR_THEMES: ColorTheme[] = [
  { id: "blue", name: "Blue", primary: "#2563eb", accent: "#f59e0b", swatch: "#2563eb" },
  { id: "teal", name: "Teal", primary: "#0d9488", accent: "#f59e0b", swatch: "#0d9488" },
  { id: "purple", name: "Purple", primary: "#7c3aed", accent: "#f472b6", swatch: "#7c3aed" },
  { id: "red", name: "Red", primary: "#dc2626", accent: "#f59e0b", swatch: "#dc2626" },
  { id: "green", name: "Green", primary: "#16a34a", accent: "#fbbf24", swatch: "#16a34a" },
  { id: "orange", name: "Orange", primary: "#ea580c", accent: "#fbbf24", swatch: "#ea580c" },
  { id: "pink", name: "Pink", primary: "#db2777", accent: "#a855f7", swatch: "#db2777" },
  { id: "slate", name: "Slate", primary: "#475569", accent: "#94a3b8", swatch: "#475569" },
];

// Template categories for filtering
export const TEMPLATE_CATEGORIES = {
  style: [
    { id: "all", label: "All" },
    { id: "minimal", label: "Minimal" },
    { id: "modern", label: "Modern" },
    { id: "bold", label: "Bold" },
    { id: "creative", label: "Creative" },
    { id: "corporate", label: "Corporate" },
    { id: "compact", label: "Compact" },
  ],
  profession: [
    { id: "all", label: "All" },
    { id: "business", label: "Business" },
    { id: "tech", label: "Tech" },
    { id: "creative-pro", label: "Creative" },
    { id: "medical", label: "Medical" },
    { id: "legal", label: "Legal" },
    { id: "real-estate", label: "Real Estate" },
    { id: "academic", label: "Academic" },
  ],
};
