import { SignatureData } from "./types";
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
// Per-block HTML generators — each returns a <tr> string (or multiple)
// ---------------------------------------------------------------------------

function renderPhoto(block: Block, data: SignatureData, options?: GenerateOptions): string {
  if (!data.photoUrl) return "";

  const s = block.settings;
  const size = safeNum(s.size, 80);
  const shape = safeStr(s.shape, "circle");
  const alignment = safeStr(s.alignment, "left");

  const borderRadius =
    shape === "circle" ? "50%" : shape === "rounded" ? "8px" : "0px";

  // Always use the actual photo URL for preview (base64 or external URL)
  // The hosted URL replacement only happens in generateCopyHtml, not here
  const src = esc(data.photoUrl);

  const align = alignment === "center" ? "center" : "left";

  return `<tr><td align="${align}" style="padding-bottom:8px;">
  <img src="${src}" alt="${esc(data.fullName)}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:${borderRadius};object-fit:cover;display:block;" />
</td></tr>`;
}

function renderName(block: Block, data: SignatureData): string {
  const s = block.settings;
  const nameSize = safeNum(s.nameSize, 18);
  const showTitle = safeBool(s.showTitle, true);
  const showCompany = safeBool(s.showCompany, true);
  const showPronouns = safeBool(s.showPronouns, true);

  const pronounPart =
    showPronouns && data.pronouns
      ? ` <span style="font-size:12px;font-weight:normal;color:#888;">(${esc(data.pronouns)})</span>`
      : "";

  const titlePart =
    showTitle && data.jobTitle
      ? `<tr><td style="font-size:13px;color:#555555;padding-top:2px;">${esc(data.jobTitle)}${showCompany && data.company ? ` at ${esc(data.company)}` : ""}</td></tr>`
      : showCompany && data.company && !showTitle
        ? `<tr><td style="font-size:13px;color:#555555;padding-top:2px;">${esc(data.company)}</td></tr>`
        : "";

  return `<tr><td style="padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr><td style="font-size:${nameSize}px;font-weight:bold;color:#1a1a1a;font-family:Arial,Helvetica,sans-serif;">${esc(data.fullName)}${pronounPart}</td></tr>
    ${titlePart}
  </table>
</td></tr>`;
}

function renderContact(block: Block, data: SignatureData, primaryColor: string): string {
  const s = block.settings;
  const layout = safeStr(s.layout, "stacked");
  const showIcons = safeBool(s.showIcons, false);

  const fields: { key: keyof SignatureData; icon: string; href: (v: string) => string }[] = [
    { key: "email", icon: "✉", href: (v) => `mailto:${esc(v)}` },
    { key: "phone", icon: "☎", href: (v) => `tel:${esc(v.replace(/\s/g, ""))}` },
    { key: "website", icon: "🌐", href: (v) => `https://${esc(v.replace(/^https?:\/\//, ""))}` },
    { key: "address", icon: "📍", href: () => "#" },
  ];

  const items = fields.filter((f) => !!data[f.key]);
  if (items.length === 0) return "";

  if (layout === "inline") {
    const parts = items.map((f) => {
      const val = String(data[f.key]);
      const display = f.key === "website" ? val.replace(/^https?:\/\//, "") : val;
      const href = f.key === "address" ? "" : f.href(val);
      const iconHtml = showIcons ? `${f.icon}&nbsp;` : "";
      if (href) {
        return `<a href="${href}" style="color:${primaryColor};text-decoration:none;font-size:12px;font-family:Arial,Helvetica,sans-serif;">${iconHtml}${esc(display)}</a>`;
      }
      return `<span style="font-size:12px;color:#555555;font-family:Arial,Helvetica,sans-serif;">${iconHtml}${esc(display)}</span>`;
    });
    return `<tr><td style="padding-bottom:4px;font-size:12px;">${parts.join('<span style="color:#ccc;margin:0 6px;">|</span>')}</td></tr>`;
  }

  // stacked
  const rows = items.map((f) => {
    const val = String(data[f.key]);
    const display = f.key === "website" ? val.replace(/^https?:\/\//, "") : val;
    const href = f.key === "address" ? "" : f.href(val);
    const iconHtml = showIcons ? `<span style="margin-right:4px;">${f.icon}</span>` : "";
    if (href) {
      return `<tr><td style="padding-bottom:2px;font-size:12px;font-family:Arial,Helvetica,sans-serif;">${iconHtml}<a href="${href}" style="color:${primaryColor};text-decoration:none;">${esc(display)}</a></td></tr>`;
    }
    return `<tr><td style="padding-bottom:2px;font-size:12px;color:#555555;font-family:Arial,Helvetica,sans-serif;">${iconHtml}${esc(display)}</td></tr>`;
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

const SOCIAL_FIELDS: (keyof SignatureData)[] = [
  "linkedin", "twitter", "instagram", "facebook", "github", "youtube",
];

function renderSocial(block: Block, data: SignatureData, primaryColor: string, plan: "free" | "pro" | "team"): string {
  const s = block.settings;
  const style = safeStr(s.style, "text");
  const isPro = plan === "pro" || plan === "team";
  const maxLinks = isPro ? 99 : 2;

  const links = SOCIAL_FIELDS
    .filter((f) => !!data[f])
    .slice(0, maxLinks);

  if (links.length === 0) return "";

  const parts = links.map((f) => {
    const url = String(data[f]);
    const href = url.startsWith("http") ? url : `https://${url}`;
    const label = SOCIAL_LABELS[f] ?? String(f);

    if (style === "icons") {
      // Use text with [brackets] as a simple icon substitute (no external images for Outlook safety)
      return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:6px;padding:2px 6px;background-color:${primaryColor};color:#ffffff;font-size:10px;font-family:Arial,Helvetica,sans-serif;text-decoration:none;border-radius:3px;">${esc(label)}</a>`;
    }
    return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer" style="color:${primaryColor};text-decoration:none;font-size:12px;font-family:Arial,Helvetica,sans-serif;margin-right:10px;">${esc(label)}</a>`;
  });

  return `<tr><td style="padding-bottom:4px;">${parts.join("")}</td></tr>`;
}

function renderDivider(block: Block): string {
  const s = block.settings;
  const color = safeStr(s.color, "#e2e8f0");
  const width = safeNum(s.width, 100);
  const lineStyle = safeStr(s.style, "solid");
  const thickness = safeNum(s.thickness, 1);

  return `<tr><td style="padding-top:4px;padding-bottom:4px;">
  <table cellpadding="0" cellspacing="0" border="0" width="${width}%">
    <tr><td style="font-size:0;line-height:0;border-top:${thickness}px ${lineStyle} ${esc(color)};">&nbsp;</td></tr>
  </table>
</td></tr>`;
}

function renderCta(block: Block): string {
  const s = block.settings;
  const text = safeStr(s.text, "Book a Meeting");
  const url = safeStr(s.url, "");
  const bgColor = safeStr(s.bgColor, "#2563eb");
  const textColor = safeStr(s.textColor, "#ffffff");

  if (!url) return "";
  const href = url.startsWith("http") ? url : `https://${url}`;

  return `<tr><td style="padding-bottom:4px;">
  <a href="${esc(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:7px 18px;background-color:${esc(bgColor)};color:${esc(textColor)};text-decoration:none;font-size:13px;font-family:Arial,Helvetica,sans-serif;border-radius:4px;font-weight:bold;">${esc(text)}</a>
</td></tr>`;
}

function renderDisclaimer(block: Block): string {
  const s = block.settings;
  const text = safeStr(s.text, "");
  const fontSize = safeNum(s.fontSize, 10);

  if (!text) return "";

  return `<tr><td style="padding-top:4px;font-size:${fontSize}px;color:#94a3b8;font-family:Arial,Helvetica,sans-serif;line-height:1.4;">${esc(text)}</td></tr>`;
}

function renderSpacer(block: Block): string {
  const s = block.settings;
  const height = safeNum(s.height, 8);

  return `<tr><td style="font-size:0;line-height:0;height:${height}px;">&nbsp;</td></tr>`;
}

// ---------------------------------------------------------------------------
// Main HTML generator
// ---------------------------------------------------------------------------

export function generateHtmlFromBlocks(
  blocks: Block[],
  data: SignatureData,
  options?: GenerateOptions
): string {
  const primaryColor = data.primaryColor || "#2563eb";
  const plan = options?.plan ?? "free";
  const isPro = plan === "pro" || plan === "team";

  const rows = blocks
    .filter((b) => b.visible)
    .map((b) => {
      switch (b.type) {
        case "photo":
          return renderPhoto(b, data, options);
        case "name":
          return renderName(b, data);
        case "contact":
          return renderContact(b, data, primaryColor);
        case "social":
          return renderSocial(b, data, primaryColor, plan);
        case "divider":
          return renderDivider(b);
        case "cta":
          return isPro ? renderCta(b) : "";
        case "disclaimer":
          return isPro ? renderDisclaimer(b) : "";
        case "spacer":
          return renderSpacer(b);
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n");

  const branding = !isPro
    ? `<tr><td style="padding-top:8px;"><a href="https://neatstamp.com?ref=sig" target="_blank" rel="noopener noreferrer" style="color:#94a3b8;font-size:10px;font-family:Arial,Helvetica,sans-serif;text-decoration:none;">Made with NeatStamp</a></td></tr>`
    : "";

  const pixel =
    !isPro && options?.signatureId
      ? `<tr><td><img src="https://neatstamp.com/api/images/${esc(options.signatureId)}/track" width="1" height="1" style="width:1px;height:1px;display:block;" alt="" /></td></tr>`
      : "";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;">
${rows}
${branding}
${pixel}
</table>`;
}
