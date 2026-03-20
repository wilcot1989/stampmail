import { SignatureData, TemplateName } from "./types";
import { GenerateOptions } from "./generateSignature";

// ---------------------------------------------------------------------------
// Block type system
// ---------------------------------------------------------------------------

export type BlockType =
  | "photo"
  | "name"
  | "contact"
  | "social"
  | "divider"
  | "cta"
  | "disclaimer"
  | "spacer";

export interface Block {
  id: string;
  type: BlockType;
  visible: boolean;
  settings: Record<string, unknown>;
}

export interface BlockConfig {
  type: BlockType;
  label: string;
  icon: string;
  description: string;
  defaultSettings: Record<string, unknown>;
  proOnly: boolean;
}

// ---------------------------------------------------------------------------
// Block configs
// ---------------------------------------------------------------------------

export const BLOCK_CONFIGS: Record<BlockType, BlockConfig> = {
  photo: {
    type: "photo",
    label: "Photo",
    icon: "🖼️",
    description: "Profile photo or company logo",
    defaultSettings: {
      shape: "circle",    // circle | square | rounded
      size: 80,           // px, 60–120
      alignment: "left",  // left | center
      position: "left",   // left | right — photo position relative to text
    },
    proOnly: false,
  },
  name: {
    type: "name",
    label: "Name & Title",
    icon: "👤",
    description: "Full name, job title, company, pronouns",
    defaultSettings: {
      nameSize: 18,        // px, 16–24
      showTitle: true,
      showCompany: true,
      showPronouns: true,
    },
    proOnly: false,
  },
  contact: {
    type: "contact",
    label: "Contact Info",
    icon: "📞",
    description: "Phone, email, website, address",
    defaultSettings: {
      layout: "stacked", // stacked | inline
      showIcons: false,
    },
    proOnly: false,
  },
  social: {
    type: "social",
    label: "Social Links",
    icon: "🔗",
    description: "Social media profile links",
    defaultSettings: {
      style: "text",    // text | icons
      maxLinks: 2,      // 2 for free; set to 99 for pro
    },
    proOnly: false,
  },
  divider: {
    type: "divider",
    label: "Divider",
    icon: "➖",
    description: "A horizontal separator line",
    defaultSettings: {
      color: "#e2e8f0",
      width: 100,       // %, 50–100
      style: "solid",   // solid | dashed | dotted
      thickness: 1,     // px, 1–3
    },
    proOnly: false,
  },
  cta: {
    type: "cta",
    label: "Button / CTA",
    icon: "🔘",
    description: "A call-to-action button (Calendly, custom link)",
    defaultSettings: {
      text: "Book a Meeting",
      url: "",
      bgColor: "#2563eb",
      textColor: "#ffffff",
    },
    proOnly: true,
  },
  disclaimer: {
    type: "disclaimer",
    label: "Disclaimer",
    icon: "📋",
    description: "Legal disclaimer or confidentiality notice",
    defaultSettings: {
      text: "This email and any attachments are confidential.",
      fontSize: 10, // px, 9–12
    },
    proOnly: true,
  },
  spacer: {
    type: "spacer",
    label: "Spacer",
    icon: "↕️",
    description: "Empty vertical space between blocks",
    defaultSettings: {
      height: 8, // px, 4–20
    },
    proOnly: false,
  },
};

// ---------------------------------------------------------------------------
// Default block arrangement
// ---------------------------------------------------------------------------

function makeBlock(type: BlockType, overrides?: Partial<Block>): Block {
  return {
    id: crypto.randomUUID(),
    type,
    visible: true,
    settings: { ...BLOCK_CONFIGS[type].defaultSettings },
    ...overrides,
  };
}

export function getDefaultBlocks(): Block[] {
  return [
    makeBlock("name"),
    makeBlock("divider"),
    makeBlock("contact"),
    makeBlock("social"),
  ];
}

// Templates that have a photo as part of their design
const TEMPLATES_WITH_PHOTO: string[] = [
  "minimal", "modern", "corporate", "creative", "bold", "elegant", "startup",
  "executive", "gradient", "developer", "sales", "medical", "legal",
  "academic", "realtor", "influencer", "photographer", "dark",
];

// Templates with NO photo: compact, simple

export function getBlocksForTemplate(template: string): Block[] {
  const hasPhoto = TEMPLATES_WITH_PHOTO.includes(template);
  const blocks: Block[] = [];

  if (hasPhoto) {
    blocks.push(makeBlock("photo", { settings: { ...BLOCK_CONFIGS.photo.defaultSettings, position: "left" } }));
  }

  blocks.push(makeBlock("name"));
  blocks.push(makeBlock("divider"));
  blocks.push(makeBlock("contact"));
  blocks.push(makeBlock("social"));

  return blocks;
}

// Ensure blocks have a photo block when switching to a template that needs one
export function ensureBlocksForTemplate(existingBlocks: Block[], template: string): Block[] {
  const needsPhoto = TEMPLATES_WITH_PHOTO.includes(template);
  const hasPhotoBlock = existingBlocks.some((b) => b.type === "photo");

  if (needsPhoto && !hasPhotoBlock) {
    // Add photo block at the beginning
    return [
      makeBlock("photo", { settings: { ...BLOCK_CONFIGS.photo.defaultSettings, position: "left" } }),
      ...existingBlocks,
    ];
  }

  return existingBlocks;
}

// ---------------------------------------------------------------------------
// HTML escape helper
// ---------------------------------------------------------------------------

function esc(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeStr(val: unknown, fallback = ""): string {
  return typeof val === "string" ? val : fallback;
}

function safeNum(val: unknown, fallback: number): number {
  return typeof val === "number" ? val : fallback;
}

function safeBool(val: unknown, fallback: boolean): boolean {
  return typeof val === "boolean" ? val : fallback;
}

// ---------------------------------------------------------------------------
// Template style system
// ---------------------------------------------------------------------------

interface TemplateStyle {
  fontFamily: string;
  baseFontSize: number;
  // Name block
  nameSize: number;
  nameColor: "dark" | "primary";
  nameWeight: string;
  nameLetterSpacing: string;
  pronounsStyle: "inline" | "separate" | "italic-separate";
  // Title + company
  titleSize: number;
  titleColor: "muted" | "primary" | "accent" | "white-alpha";
  titleTransform: "none" | "uppercase";
  titleFontStyle: "normal" | "italic";
  companyDisplay: "merged-title" | "separate" | "separate-bold" | "separate-uppercase" | "inline-name" | "merged-at";
  // Divider
  dividerStyle: "solid" | "dashed" | "thin-grey" | "decorative" | "none";
  dividerColor: "primary" | "accent" | "grey";
  dividerThickness: number;
  // Contact
  contactLayout: "stacked" | "stacked-labeled" | "stacked-emoji" | "inline-pipes" | "inline-middot" | "partial-inline";
  contactFontFamily: string;
  // Social
  socialColor: "primary" | "white-alpha";
  socialSubset: boolean; // compact only shows 3
  // Photo defaults
  photoSize: number;
  photoShape: "circle" | "rounded" | "near-square" | "none";
  photoBorder: string;
  // Layout
  outerBorderTop: string;
  contentBorderLeft: string;
  outerBackground: "none" | "primary";
  textOnDark: boolean;
  // CTA
  ctaStyle: "standard" | "inverted" | "gradient-pill" | "accent";
}

function getTemplateStyle(template: TemplateName, data: SignatureData): TemplateStyle {
  const pc = data.primaryColor || "#2563eb";
  const ac = data.accentColor || "#f59e0b";

  const base: TemplateStyle = {
    fontFamily: "Arial,Helvetica,sans-serif",
    baseFontSize: 14,
    nameSize: 16,
    nameColor: "dark",
    nameWeight: "bold",
    nameLetterSpacing: "",
    pronounsStyle: "inline",
    titleSize: 13,
    titleColor: "muted",
    titleTransform: "none",
    titleFontStyle: "normal",
    companyDisplay: "merged-title",
    dividerStyle: "solid",
    dividerColor: "primary",
    dividerThickness: 2,
    contactLayout: "stacked",
    contactFontFamily: "Arial,Helvetica,sans-serif",
    socialColor: "primary",
    socialSubset: false,
    photoSize: 72,
    photoShape: "circle",
    photoBorder: "",
    outerBorderTop: "",
    contentBorderLeft: "",
    outerBackground: "none",
    textOnDark: false,
    ctaStyle: "standard",
  };

  switch (template) {
    case "minimal":
      return base;

    case "modern":
      return {
        ...base,
        nameSize: 18,
        nameColor: "primary",
        titleColor: "accent",
        titleTransform: "uppercase",
        companyDisplay: "separate",
        dividerStyle: "none",
        contentBorderLeft: `3px solid ${pc}`,
        contactLayout: "partial-inline",
        photoSize: 80,
        photoShape: "rounded",
      };

    case "corporate":
      return {
        ...base,
        nameSize: 17,
        pronounsStyle: "separate",
        titleSize: 13,
        titleColor: "primary",
        companyDisplay: "separate-bold",
        dividerStyle: "none",
        outerBorderTop: `3px solid ${pc}`,
        contactLayout: "stacked-labeled",
        photoSize: 70,
        photoShape: "near-square",
      };

    case "creative":
      return {
        ...base,
        nameSize: 20,
        nameColor: "primary",
        titleSize: 14,
        companyDisplay: "separate-uppercase",
        dividerStyle: "dashed",
        dividerColor: "accent",
        dividerThickness: 2,
        contentBorderLeft: `2px dashed ${ac}`,
        contactLayout: "stacked-emoji",
        photoSize: 90,
        photoShape: "circle",
        photoBorder: `3px solid ${pc}`,
        ctaStyle: "accent",
      };

    case "bold":
      return {
        ...base,
        nameSize: 20,
        nameColor: "dark",
        titleColor: "white-alpha",
        companyDisplay: "merged-title",
        dividerStyle: "none",
        socialColor: "white-alpha",
        photoSize: 80,
        photoShape: "rounded",
        photoBorder: "2px solid rgba(255,255,255,0.3)",
        outerBackground: "primary",
        textOnDark: true,
        ctaStyle: "inverted",
      };

    case "elegant":
      return {
        ...base,
        fontFamily: "Georgia,'Times New Roman',serif",
        nameSize: 18,
        nameLetterSpacing: "0.5px",
        pronounsStyle: "italic-separate",
        titleSize: 12,
        titleColor: "primary",
        titleFontStyle: "italic",
        companyDisplay: "separate-uppercase",
        dividerStyle: "decorative",
        dividerColor: "primary",
        contactFontFamily: "Arial,Helvetica,sans-serif",
        photoSize: 75,
        photoShape: "circle",
      };

    case "startup":
      return {
        ...base,
        nameSize: 16,
        titleColor: "primary",
        companyDisplay: "merged-at",
        dividerStyle: "thin-grey",
        dividerThickness: 1,
        contactLayout: "inline-pipes",
        photoSize: 48,
        photoShape: "circle",
        ctaStyle: "gradient-pill",
      };

    case "compact":
      return {
        ...base,
        baseFontSize: 13,
        nameSize: 13,
        companyDisplay: "inline-name",
        dividerStyle: "none",
        contactLayout: "inline-middot",
        socialSubset: true,
        photoSize: 0,
        photoShape: "none",
      };

    case "executive":
      return {
        ...base,
        nameSize: 18,
        nameColor: "dark",
        titleColor: "accent",
        companyDisplay: "separate",
        dividerStyle: "solid",
        dividerThickness: 1,
        dividerColor: "grey",
        contactLayout: "stacked",
        photoSize: 85,
        photoShape: "rounded",
      };

    case "gradient":
      return {
        ...base,
        nameSize: 18,
        nameColor: "primary",
        companyDisplay: "separate",
        dividerStyle: "none",
        contentBorderLeft: `8px solid ${pc}`,
        contactLayout: "inline-pipes",
        photoSize: 75,
        photoShape: "circle",
      };

    case "developer":
      return {
        ...base,
        fontFamily: "'Courier New',Courier,monospace",
        nameSize: 16,
        nameColor: "primary",
        companyDisplay: "separate",
        dividerStyle: "solid",
        dividerThickness: 1,
        dividerColor: "grey",
        contactLayout: "stacked",
        contactFontFamily: "'Courier New',Courier,monospace",
        photoSize: 70,
        photoShape: "rounded",
      };

    case "sales":
      return {
        ...base,
        nameSize: 18,
        titleColor: "muted",
        companyDisplay: "separate",
        dividerStyle: "solid",
        dividerThickness: 2,
        contactLayout: "stacked",
        photoSize: 80,
        photoShape: "circle",
        ctaStyle: "standard",
      };

    case "medical":
      return {
        ...base,
        nameSize: 17,
        titleColor: "primary",
        companyDisplay: "separate",
        dividerStyle: "solid",
        dividerThickness: 2,
        contactLayout: "stacked",
        photoSize: 75,
        photoShape: "circle",
        photoBorder: `2px solid ${pc}`,
        outerBorderTop: `3px solid ${pc}`,
      };

    case "legal":
      return {
        ...base,
        fontFamily: "Georgia,'Times New Roman',serif",
        nameSize: 16,
        nameLetterSpacing: "2px",
        pronounsStyle: "separate",
        titleColor: "muted",
        titleFontStyle: "italic",
        companyDisplay: "separate-bold",
        dividerStyle: "solid",
        dividerThickness: 2,
        dividerColor: "grey",
        contactLayout: "stacked-labeled",
        contactFontFamily: "Arial,Helvetica,sans-serif",
        photoSize: 70,
        photoShape: "near-square",
      };

    case "academic":
      return {
        ...base,
        nameSize: 17,
        nameColor: "dark",
        titleColor: "primary",
        companyDisplay: "separate-bold",
        dividerStyle: "thin-grey",
        contactLayout: "stacked",
        photoSize: 75,
        photoShape: "circle",
      };

    case "realtor":
      return {
        ...base,
        nameSize: 22,
        nameColor: "dark",
        companyDisplay: "separate",
        dividerStyle: "solid",
        dividerThickness: 2,
        contactLayout: "partial-inline",
        photoSize: 100,
        photoShape: "rounded",
        photoBorder: `3px solid ${pc}`,
      };

    case "influencer":
      return {
        ...base,
        nameSize: 20,
        nameColor: "primary",
        companyDisplay: "separate",
        dividerStyle: "none",
        contactLayout: "stacked",
        photoSize: 85,
        photoShape: "circle",
        photoBorder: `3px solid ${pc}`,
      };

    case "photographer":
      return {
        ...base,
        nameSize: 18,
        nameColor: "dark",
        nameWeight: "300",
        companyDisplay: "separate",
        dividerStyle: "thin-grey",
        contactLayout: "stacked",
        photoSize: 60,
        photoShape: "near-square",
      };

    case "dark":
      return {
        ...base,
        nameSize: 18,
        nameColor: "dark",
        titleColor: "white-alpha",
        companyDisplay: "merged-title",
        dividerStyle: "none",
        socialColor: "white-alpha",
        photoSize: 80,
        photoShape: "rounded",
        photoBorder: "2px solid rgba(255,255,255,0.2)",
        outerBackground: "primary",
        textOnDark: true,
        ctaStyle: "inverted",
      };

    case "simple":
      return {
        ...base,
        baseFontSize: 13,
        nameSize: 14,
        companyDisplay: "inline-name",
        dividerStyle: "none",
        contactLayout: "inline-middot",
        photoSize: 0,
        photoShape: "none",
      };

    default:
      return base;
  }
}

// ---------------------------------------------------------------------------
// Resolve style colors based on template settings
// ---------------------------------------------------------------------------

function resolveColor(
  token: "dark" | "primary" | "accent" | "muted" | "white-alpha" | string,
  data: SignatureData,
  ts: TemplateStyle
): string {
  if (ts.textOnDark) {
    switch (token) {
      case "dark": return "#ffffff";
      case "primary": return "#ffffff";
      case "muted": return "rgba(255,255,255,0.85)";
      case "accent": return "rgba(255,255,255,0.85)";
      case "white-alpha": return "rgba(255,255,255,0.8)";
      default: return token;
    }
  }
  switch (token) {
    case "dark": return "#1a1a1a";
    case "primary": return data.primaryColor || "#2563eb";
    case "accent": return data.accentColor || "#f59e0b";
    case "muted": return "#555555";
    case "white-alpha": return "rgba(255,255,255,0.8)";
    default: return token;
  }
}

// ---------------------------------------------------------------------------
// Per-block HTML generators — template-aware
// ---------------------------------------------------------------------------

function renderPhoto(block: Block, data: SignatureData, ts: TemplateStyle): string {
  if (!data.photoUrl || ts.photoShape === "none") return "";

  const s = block.settings;
  const size = safeNum(s.size, ts.photoSize);
  const shape = safeStr(s.shape, ts.photoShape);
  const alignment = safeStr(s.alignment, "left");

  const borderRadius =
    shape === "circle" ? "50%" : shape === "rounded" ? "8px" : shape === "near-square" ? "4px" : "0px";

  const src = esc(data.photoUrl);
  const align = alignment === "center" ? "center" : "left";
  const borderStyle = ts.photoBorder ? `border:${ts.photoBorder};` : "";

  return `<tr><td align="${align}" style="padding-bottom:8px;">
  <img src="${src}" alt="${esc(data.fullName)}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:${borderRadius};object-fit:cover;display:block;${borderStyle}" />
</td></tr>`;
}

function renderName(block: Block, data: SignatureData, ts: TemplateStyle): string {
  const s = block.settings;
  const nameSize = safeNum(s.nameSize, ts.nameSize);
  const showTitle = safeBool(s.showTitle, true);
  const showCompany = safeBool(s.showCompany, true);
  const showPronouns = safeBool(s.showPronouns, true);

  const nameCol = resolveColor(ts.nameColor, data, ts);
  const titleCol = resolveColor(ts.titleColor, data, ts);
  const mutedCol = resolveColor("muted", data, ts);
  const darkCol = resolveColor("dark", data, ts);
  const letterSp = ts.nameLetterSpacing ? `letter-spacing:${ts.nameLetterSpacing};` : "";

  // Pronouns
  let pronounRow = "";
  if (showPronouns && data.pronouns) {
    if (ts.pronounsStyle === "inline") {
      // handled inline below
    } else if (ts.pronounsStyle === "italic-separate") {
      pronounRow = `<tr><td style="font-size:11px;color:${ts.textOnDark ? "rgba(255,255,255,0.6)" : "#888"};font-style:italic;">${esc(data.pronouns)}</td></tr>`;
    } else {
      pronounRow = `<tr><td style="font-size:11px;color:${ts.textOnDark ? "rgba(255,255,255,0.6)" : "#888"};">${esc(data.pronouns)}</td></tr>`;
    }
  }

  const pronounInline =
    ts.pronounsStyle === "inline" && showPronouns && data.pronouns
      ? ` <span style="font-size:12px;font-weight:normal;color:${ts.textOnDark ? "rgba(255,255,255,0.6)" : "#888"};">(${esc(data.pronouns)})</span>`
      : "";

  // Title + company rendering
  let titleRows = "";
  if (ts.companyDisplay === "merged-title") {
    if (showTitle && data.jobTitle) {
      const companyPart = showCompany && data.company ? ` at ${esc(data.company)}` : "";
      const transform = ts.titleTransform === "uppercase" ? "text-transform:uppercase;letter-spacing:0.5px;" : "";
      const fontStyle = ts.titleFontStyle === "italic" ? "font-style:italic;" : "";
      titleRows = `<tr><td style="font-size:${ts.titleSize}px;color:${titleCol};padding-top:2px;${transform}${fontStyle}">${esc(data.jobTitle)}${companyPart}</td></tr>`;
    }
  } else if (ts.companyDisplay === "merged-at") {
    const combined = [data.jobTitle, data.company].filter(Boolean);
    if (combined.length > 0 && (showTitle || showCompany)) {
      const text = showTitle && data.jobTitle && showCompany && data.company
        ? `${esc(data.jobTitle)} @ ${esc(data.company)}`
        : esc(combined[0]);
      titleRows = `<tr><td style="font-size:12px;color:${titleCol};padding-top:2px;">${text}</td></tr>`;
    }
  } else if (ts.companyDisplay === "inline-name") {
    // Compact: name | title | company all in one — handled in the name row itself
    // title and company are part of the name <td>
    const parts: string[] = [];
    if (showTitle && data.jobTitle) parts.push(`<span style="color:${titleCol};">${esc(data.jobTitle)}</span>`);
    if (showCompany && data.company) parts.push(esc(data.company));
    if (parts.length > 0) {
      titleRows = ""; // nothing separate
    }
  } else {
    // separate, separate-bold, separate-uppercase
    if (showTitle && data.jobTitle) {
      const transform = ts.titleTransform === "uppercase" ? "text-transform:uppercase;letter-spacing:0.5px;" : "";
      const fontStyle = ts.titleFontStyle === "italic" ? "font-style:italic;" : "";
      const weight = ts.companyDisplay === "separate-bold" ? "font-weight:600;" : "";
      titleRows += `<tr><td style="font-size:${ts.titleSize}px;color:${titleCol};padding-top:2px;${transform}${fontStyle}${weight}">${esc(data.jobTitle)}</td></tr>`;
    }
    if (showCompany && data.company) {
      if (ts.companyDisplay === "separate-bold") {
        titleRows += `<tr><td style="font-size:13px;color:${mutedCol};font-weight:bold;padding-top:1px;">${esc(data.company)}</td></tr>`;
      } else if (ts.companyDisplay === "separate-uppercase") {
        titleRows += `<tr><td style="font-size:12px;color:${mutedCol};letter-spacing:1px;text-transform:uppercase;padding-top:2px;">${esc(data.company)}</td></tr>`;
      } else {
        titleRows += `<tr><td style="font-size:13px;color:${mutedCol};padding-top:1px;">${esc(data.company)}</td></tr>`;
      }
    }
  }

  // Build the name cell content
  let nameHtml: string;
  if (ts.companyDisplay === "inline-name") {
    // Compact style: Name | Title | Company on one line
    const inlineParts: string[] = [];
    if (showTitle && data.jobTitle) inlineParts.push(`<span style="color:${titleCol};">${esc(data.jobTitle)}</span>`);
    if (showCompany && data.company) inlineParts.push(esc(data.company));
    const suffix = inlineParts.length > 0 ? " | " + inlineParts.join(" | ") : "";
    nameHtml = `<tr><td style="font-size:${nameSize}px;font-weight:bold;color:${nameCol};font-family:${ts.fontFamily};${letterSp}"><strong style="color:${darkCol};">${esc(data.fullName)}</strong>${pronounInline}${suffix}</td></tr>`;
  } else {
    nameHtml = `<tr><td style="font-size:${nameSize}px;font-weight:bold;color:${nameCol};font-family:${ts.fontFamily};${letterSp}">${esc(data.fullName)}${pronounInline}</td></tr>`;
  }

  return `<tr><td style="padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0">
    ${nameHtml}
    ${pronounRow}
    ${titleRows}
  </table>
</td></tr>`;
}

function renderContact(block: Block, data: SignatureData, ts: TemplateStyle): string {
  const s = block.settings;
  const pc = data.primaryColor || "#2563eb";
  const linkColor = resolveColor("primary", data, ts);
  const textColor = resolveColor("muted", data, ts);

  const fields: { key: keyof SignatureData; icon: string; label: string; href: (v: string) => string }[] = [
    { key: "email", icon: "✉", label: "E", href: (v) => `mailto:${esc(v)}` },
    { key: "phone", icon: "☎", label: "T", href: (v) => `tel:${esc(v.replace(/\s/g, ""))}` },
    { key: "website", icon: "🌐", label: "W", href: (v) => `https://${esc(v.replace(/^https?:\/\//, ""))}` },
    { key: "address", icon: "📍", label: "A", href: () => "" },
  ];

  const items = fields.filter((f) => !!data[f.key]);
  if (items.length === 0) return "";

  const layout = ts.contactLayout;
  const cfont = ts.contactFontFamily;

  // Inline layouts (pipes, middot, partial-inline)
  if (layout === "inline-pipes" || layout === "inline-middot" || layout === "partial-inline") {
    const separator = layout === "inline-middot"
      ? ' <span style="color:#ccc;">&middot;</span> '
      : '<span style="color:#888;margin:0 4px;">|</span>';

    let inlineItems = items;
    let extraRows = "";

    // partial-inline: email + phone inline, rest stacked
    if (layout === "partial-inline") {
      const inlineKeys = ["email", "phone"];
      inlineItems = items.filter((f) => inlineKeys.includes(f.key as string));
      const stackedItems = items.filter((f) => !inlineKeys.includes(f.key as string));
      extraRows = stackedItems.map((f) => {
        const val = String(data[f.key]);
        const display = f.key === "website" ? val.replace(/^https?:\/\//, "") : val;
        const href = f.href(val);
        if (href) {
          return `<tr><td style="padding-top:2px;font-size:12px;font-family:${cfont};"><a href="${href}" style="color:${linkColor};text-decoration:none;">${esc(display)}</a></td></tr>`;
        }
        return `<tr><td style="padding-top:2px;font-size:11px;color:${ts.textOnDark ? "rgba(255,255,255,0.6)" : "#888"};font-family:${cfont};">${esc(display)}</td></tr>`;
      }).join("\n");
    }

    const parts = inlineItems.map((f) => {
      const val = String(data[f.key]);
      const display = f.key === "website" ? val.replace(/^https?:\/\//, "") : val;
      const href = f.href(val);
      if (href) {
        return `<a href="${href}" style="color:${linkColor};text-decoration:none;font-size:12px;font-family:${cfont};">${esc(display)}</a>`;
      }
      return `<span style="font-size:12px;color:${textColor};font-family:${cfont};">${esc(display)}</span>`;
    });

    return `<tr><td style="padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr><td style="font-size:12px;">${parts.join(separator)}</td></tr>
    ${extraRows}
  </table>
</td></tr>`;
  }

  // Stacked with labels (corporate: T, E, W, A)
  if (layout === "stacked-labeled") {
    const rows = items.map((f) => {
      const val = String(data[f.key]);
      const display = f.key === "website" ? val.replace(/^https?:\/\//, "") : val;
      const href = f.href(val);
      const labelColor = ts.textOnDark ? "rgba(255,255,255,0.5)" : "#888";
      const labelHtml = `<strong style="color:${labelColor};">${f.label}</strong>&nbsp;&nbsp;`;
      if (href) {
        return `<tr><td style="padding-bottom:2px;font-size:12px;font-family:${cfont};">${labelHtml}<a href="${href}" style="color:${f.key === "phone" ? textColor : linkColor};text-decoration:none;">${esc(display)}</a></td></tr>`;
      }
      return `<tr><td style="padding-bottom:2px;font-size:12px;color:${textColor};font-family:${cfont};">${labelHtml}${esc(display)}</td></tr>`;
    });

    return `<tr><td style="padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0">
    ${rows.join("\n    ")}
  </table>
</td></tr>`;
  }

  // Stacked with emoji icons (creative)
  if (layout === "stacked-emoji") {
    const rows = items.map((f) => {
      const val = String(data[f.key]);
      const display = f.key === "website" ? val.replace(/^https?:\/\//, "") : val;
      const href = f.href(val);
      if (href) {
        return `<tr><td style="padding-bottom:3px;font-size:12px;font-family:${cfont};"><a href="${href}" style="color:${linkColor};text-decoration:none;">${f.icon} ${esc(display)}</a></td></tr>`;
      }
      return `<tr><td style="padding-bottom:3px;font-size:12px;color:${textColor};font-family:${cfont};">${f.icon} ${esc(display)}</td></tr>`;
    });

    return `<tr><td style="padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0">
    ${rows.join("\n    ")}
  </table>
</td></tr>`;
  }

  // Default: stacked (no icons, no labels)
  const showIcons = safeBool(s.showIcons, false);
  const rows = items.map((f) => {
    const val = String(data[f.key]);
    const display = f.key === "website" ? val.replace(/^https?:\/\//, "") : val;
    const href = f.href(val);
    const iconHtml = showIcons ? `<span style="margin-right:4px;">${f.icon}</span>` : "";
    if (href) {
      return `<tr><td style="padding-bottom:2px;font-size:12px;font-family:${cfont};">${iconHtml}<a href="${href}" style="color:${linkColor};text-decoration:none;">${esc(display)}</a></td></tr>`;
    }
    return `<tr><td style="padding-bottom:2px;font-size:12px;color:${textColor};font-family:${cfont};">${iconHtml}${esc(display)}</td></tr>`;
  });

  return `<tr><td style="padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0">
    ${rows.join("\n    ")}
  </table>
</td></tr>`;
}

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
  instagram: "Instagram",
  facebook: "Facebook",
  github: "GitHub",
  youtube: "YouTube",
};

const SOCIAL_ICON_URLS: Record<string, string> = {
  linkedin: "https://neatstamp.com/icons/linkedin.svg",
  twitter: "https://neatstamp.com/icons/twitter.svg",
  instagram: "https://neatstamp.com/icons/instagram.svg",
  facebook: "https://neatstamp.com/icons/facebook.svg",
  github: "https://neatstamp.com/icons/github.svg",
  youtube: "https://neatstamp.com/icons/youtube.svg",
};

const SOCIAL_FIELDS: (keyof SignatureData)[] = [
  "linkedin", "twitter", "instagram", "facebook", "github", "youtube",
];

function renderSocial(block: Block, data: SignatureData, ts: TemplateStyle, plan: "free" | "pro" | "team"): string {
  const isPro = plan === "pro" || plan === "team";
  const maxLinks = isPro ? 99 : 2;

  let fields = SOCIAL_FIELDS;
  if (ts.socialSubset) {
    fields = ["linkedin", "twitter", "github"] as (keyof SignatureData)[];
  }

  const links = fields
    .filter((f) => !!data[f])
    .slice(0, maxLinks);

  if (links.length === 0) return "";

  const iconSize = 20;
  const parts = links.map((f) => {
    const url = String(data[f]);
    const href = url.startsWith("http") ? url : `https://${url}`;
    const label = SOCIAL_LABELS[f] ?? String(f);
    const iconUrl = SOCIAL_ICON_URLS[f];

    return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:8px;text-decoration:none;" title="${esc(label)}"><img src="${iconUrl}" alt="${esc(label)}" width="${iconSize}" height="${iconSize}" style="width:${iconSize}px;height:${iconSize}px;display:block;border:0;" /></a>`;
  });

  return `<tr><td style="padding-bottom:4px;">${parts.join("")}</td></tr>`;
}

function renderDivider(_block: Block, ts: TemplateStyle, data: SignatureData): string {
  const pc = data.primaryColor || "#2563eb";
  const ac = data.accentColor || "#f59e0b";

  if (ts.dividerStyle === "none") return "";

  const color = ts.dividerColor === "accent" ? ac : ts.dividerColor === "grey" ? "#eeeeee" : pc;

  if (ts.dividerStyle === "decorative") {
    // Elegant: long dash + short dash pattern
    return `<tr><td style="padding-top:4px;padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0"><tr><td style="width:40px;height:1px;background:${color};"></td><td style="width:8px;"></td><td style="width:8px;height:1px;background:${color};"></td></tr></table>
</td></tr>`;
  }

  if (ts.dividerStyle === "thin-grey") {
    return `<tr><td style="padding-top:4px;padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td style="font-size:0;line-height:0;border-top:1px solid #eeeeee;">&nbsp;</td></tr>
  </table>
</td></tr>`;
  }

  const lineStyle = ts.dividerStyle === "dashed" ? "dashed" : "solid";
  return `<tr><td style="padding-top:4px;padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td style="font-size:0;line-height:0;border-top:${ts.dividerThickness}px ${lineStyle} ${color};">&nbsp;</td></tr>
  </table>
</td></tr>`;
}

function renderCta(block: Block, ts: TemplateStyle, data: SignatureData): string {
  const s = block.settings;
  const text = safeStr(s.text, "Book a Meeting");
  const url = safeStr(s.url, "");
  const pc = data.primaryColor || "#2563eb";
  const ac = data.accentColor || "#f59e0b";

  if (!url) return "";
  const href = url.startsWith("http") ? url : `https://${url}`;

  let style: string;
  switch (ts.ctaStyle) {
    case "inverted":
      style = `background-color:#ffffff;color:${pc};`;
      break;
    case "gradient-pill":
      style = `background:linear-gradient(135deg,${pc},${ac});color:#ffffff;border-radius:20px;`;
      break;
    case "accent":
      style = `background-color:${ac};color:#ffffff;`;
      break;
    default:
      style = `background-color:${pc};color:#ffffff;`;
  }

  return `<tr><td style="padding-bottom:4px;">
  <a href="${esc(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:7px 18px;${style}text-decoration:none;font-size:13px;font-family:Arial,Helvetica,sans-serif;border-radius:4px;font-weight:bold;">${esc(text)}</a>
</td></tr>`;
}

function renderDisclaimer(block: Block, ts: TemplateStyle): string {
  const s = block.settings;
  const text = safeStr(s.text, "");
  const fontSize = safeNum(s.fontSize, 10);
  const color = ts.textOnDark ? "rgba(255,255,255,0.4)" : "#94a3b8";

  if (!text) return "";

  return `<tr><td style="padding-top:4px;font-size:${fontSize}px;color:${color};font-family:Arial,Helvetica,sans-serif;line-height:1.4;">${esc(text)}</td></tr>`;
}

function renderSpacer(block: Block): string {
  const s = block.settings;
  const height = safeNum(s.height, 8);

  return `<tr><td style="font-size:0;line-height:0;height:${height}px;">&nbsp;</td></tr>`;
}

// ---------------------------------------------------------------------------
// Main HTML generator — template-aware
// ---------------------------------------------------------------------------

export function generateHtmlFromBlocks(
  blocks: Block[],
  data: SignatureData,
  options?: GenerateOptions
): string {
  const plan = options?.plan ?? "free";
  const isPro = plan === "pro" || plan === "team";
  const template = data.template || "minimal";
  const ts = getTemplateStyle(template, data);
  const pc = data.primaryColor || "#2563eb";

  const visibleBlocks = blocks.filter((b) => b.visible);

  // Check if photo block has position left/right (side-by-side layout)
  const photoBlock = visibleBlocks.find((b) => b.type === "photo");
  const photoPosition = photoBlock ? safeStr(photoBlock.settings.position, "left") : "";
  const photoIsSideBySide = photoBlock && (photoPosition === "left" || photoPosition === "right") && data.photoUrl && ts.photoShape !== "none";

  // Build content rows (everything except photo if it's side-by-side)
  const contentBlocks = photoIsSideBySide
    ? visibleBlocks.filter((b) => b.type !== "photo")
    : visibleBlocks;

  const contentRows = contentBlocks
    .map((b) => {
      switch (b.type) {
        case "photo":
          return renderPhoto(b, data, ts);
        case "name":
          return renderName(b, data, ts);
        case "contact":
          return renderContact(b, data, ts);
        case "social":
          return renderSocial(b, data, ts, plan);
        case "divider":
          return renderDivider(b, ts, data);
        case "cta":
          return isPro ? renderCta(b, ts, data) : "";
        case "disclaimer":
          return isPro ? renderDisclaimer(b, ts) : "";
        case "spacer":
          return renderSpacer(b);
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n");

  // If photo is side-by-side, wrap in a two-column table
  let rows: string;
  if (photoIsSideBySide && photoBlock) {
    const size = safeNum(photoBlock.settings.size, ts.photoSize);
    const shape = safeStr(photoBlock.settings.shape, ts.photoShape);
    const borderRadius = shape === "circle" ? "50%" : shape === "rounded" ? "8px" : shape === "near-square" ? "4px" : "0px";
    const src = esc(data.photoUrl);
    const borderStyle = ts.photoBorder ? `border:${ts.photoBorder};` : "";

    const photoTd = `<td style="vertical-align:top;padding-${photoPosition === "left" ? "right" : "left"}:14px;width:${size}px;">
      <img src="${src}" alt="${esc(data.fullName)}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:${borderRadius};object-fit:cover;display:block;${borderStyle}" />
    </td>`;

    const contentBorderStyle = ts.contentBorderLeft ? `border-left:${ts.contentBorderLeft};padding-left:14px;` : "";
    const contentTd = `<td style="vertical-align:top;${contentBorderStyle}">
      <table cellpadding="0" cellspacing="0" border="0" style="font-family:${ts.fontFamily};font-size:${ts.baseFontSize}px;color:${ts.textOnDark ? "#ffffff" : "#333"};">
        ${contentRows}
      </table>
    </td>`;

    rows = `<tr>${photoPosition === "left" ? photoTd + contentTd : contentTd + photoTd}</tr>`;
  } else {
    rows = contentRows;
  }

  const branding = !isPro
    ? `<tr><td style="padding-top:8px;"><a href="https://neatstamp.com?ref=sig" target="_blank" rel="noopener noreferrer" style="color:${ts.textOnDark ? "rgba(255,255,255,0.4)" : "#94a3b8"};font-size:10px;font-family:Arial,Helvetica,sans-serif;text-decoration:none;">Made with NeatStamp</a></td></tr>`
    : "";

  const pixel =
    !isPro && options?.signatureId
      ? `<tr><td><img src="https://neatstamp.com/api/images/${esc(options.signatureId)}/track" width="1" height="1" style="width:1px;height:1px;display:block;" alt="" /></td></tr>`
      : "";

  // Outer table styles
  const outerStyles: string[] = [
    `font-family:${ts.fontFamily}`,
    `font-size:${ts.baseFontSize}px`,
    `color:${ts.textOnDark ? "#ffffff" : "#333333"}`,
  ];
  if (ts.outerBorderTop) outerStyles.push(`border-top:${ts.outerBorderTop}`, "padding-top:12px");
  if (ts.outerBackground === "primary") outerStyles.push(`background-color:${pc}`, "border-radius:8px", "padding:16px");

  return `<table cellpadding="0" cellspacing="0" border="0" style="${outerStyles.join(";") + ";"}">
${rows}
${branding}
${pixel}
</table>`;
}
