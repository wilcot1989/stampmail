/**
 * Signature Engine v2 — Single render engine with template configs
 *
 * Architecture: Templates are DATA (config objects), not code (functions).
 * One render function reads the config + user data and produces HTML.
 * Every feature works on every template automatically.
 */

import { SignatureData, TemplateName } from "./types";

// ================================================================
// Types
// ================================================================

export interface GenerateOptions {
  plan?: "free" | "pro" | "team";
  signatureId?: string;
}

/** Template configuration — everything that makes one template different from another */
export interface TemplateStyleConfig {
  // Layout
  showPhoto: boolean;            // compact/simple = false
  contactLayout: "inline" | "stacked"; // inline = separated by a character, stacked = one per line

  // Separators
  contactSeparator: string;      // "·" "|" "—" etc. (HTML)

  // Borders & dividers
  borderTop: string;             // "" or "3px solid ${primary}"
  borderLeft: string;            // "" or "3px solid ${primary}"
  borderStyle: "solid" | "dashed"; // for borderLeft

  // Background
  outerBg: "none" | "primary" | "dark" | "accent"; // background color source
  outerRadius: number;           // border-radius in px
  outerPadding: number;          // padding inside bg wrapper in px

  // Name defaults (overridable by user via data.nameSize etc.)
  nameSize: number;
  nameColor: string;             // use "primary" | "accent" | "white" | hex
  nameBold: boolean;
  nameItalic: boolean;
  nameLetterSpacing: string;     // "" or "1.5px" or "2px"
  nameTransform: string;         // "" or "uppercase"

  // Title defaults
  titleSize: number;
  titleColor: string;
  titleBold: boolean;

  // Company defaults
  companySize: number;
  companyColor: string;
  companyPosition: "with-title" | "separate" | "under-photo"; // how company is rendered

  // Contact defaults
  contactSize: number;
  contactColor: string;
  contactLinkColor: string;      // use "primary" for template primary color

  // Photo defaults
  photoSize: number;
  photoShape: "circle" | "rounded" | "square";
  photoBorder: string;           // "" or "3px solid ${primary}" or "2px solid rgba(255,255,255,0.4)"

  // Social icons
  socialIconSize: number;        // 20 (default) or 24 (influencer)

  // Font
  defaultFont: string;

  // Base font size for outer table
  baseFontSize: number;

  // Text color (for non-bg templates this is #333, for dark/bold it's white)
  textColor: string;

  // Special features
  showPhoneAsHero: boolean;      // sales: phone above name as hero
  codePrefix: boolean;           // developer: // prefix on name
  headerBg: string;              // executive: dark header behind name, "" for none
  gradientBar: string;           // gradient: colored bar, "" for none
}

// ================================================================
// Template configs — ALL 20 templates as pure data
// ================================================================

function cfg(overrides: Partial<TemplateStyleConfig>): TemplateStyleConfig {
  return {
    showPhoto: true,
    contactLayout: "inline",
    contactSeparator: `<span style="color:#ccc;padding:0 6px;">&middot;</span>`,
    borderTop: "",
    borderLeft: "",
    borderStyle: "solid",
    outerBg: "none",
    outerRadius: 0,
    outerPadding: 0,
    nameSize: 17,
    nameColor: "#1a1a1a",
    nameBold: true,
    nameItalic: false,
    nameLetterSpacing: "",
    nameTransform: "",
    titleSize: 12,
    titleColor: "#555",
    titleBold: false,
    companySize: 12,
    companyColor: "#999",
    companyPosition: "with-title",
    contactSize: 12,
    contactColor: "#555",
    contactLinkColor: "primary",
    photoSize: 70,
    photoShape: "circle",
    photoBorder: "",
    socialIconSize: 20,
    defaultFont: "Arial,Helvetica,sans-serif",
    baseFontSize: 14,
    textColor: "#333",
    showPhoneAsHero: false,
    codePrefix: false,
    headerBg: "",
    gradientBar: "",
    ...overrides,
  };
}

export const TEMPLATE_STYLE_CONFIGS: Record<TemplateName, TemplateStyleConfig> = {
  minimal: cfg({
    borderTop: "2px solid ${primary}",
  }),

  modern: cfg({
    nameSize: 18, nameColor: "primary",
    borderLeft: "3px solid ${primary}",
    contactSeparator: `<span style="color:#d1d5db;padding:0 8px;">|</span>`,
    photoSize: 75, photoShape: "rounded",
  }),

  corporate: cfg({
    borderTop: "3px solid ${primary}",
    titleColor: "primary",
    photoSize: 65, photoShape: "rounded",
    contactSeparator: `<span style="color:#d1d5db;padding:0 7px;">&middot;</span>`,
  }),

  creative: cfg({
    nameSize: 20, nameColor: "primary",
    borderLeft: "2px dashed ${accent}",
    borderStyle: "dashed",
    companyPosition: "under-photo",
    companyColor: "accent", companySize: 10,
    contactLayout: "stacked",
    photoSize: 90, photoShape: "circle", photoBorder: "3px solid ${primary}",
  }),

  bold: cfg({
    nameSize: 20, nameColor: "white",
    titleColor: "rgba(255,255,255,0.8)",
    companyColor: "rgba(255,255,255,0.8)",
    contactColor: "#fff", contactLinkColor: "#fff",
    outerBg: "primary", outerRadius: 8, outerPadding: 18,
    photoSize: 75, photoShape: "rounded", photoBorder: "2px solid rgba(255,255,255,0.4)",
    textColor: "#fff",
    contactSeparator: `<span style="opacity:0.4;padding:0 8px;">|</span>`,
  }),

  elegant: cfg({
    nameSize: 18,
    nameLetterSpacing: "0.5px",
    companyPosition: "separate",
    defaultFont: "Georgia,'Times New Roman',serif",
    contactSeparator: `<span style="color:#ccc;padding:0 6px;">&mdash;</span>`,
  }),

  startup: cfg({
    nameSize: 15,
    borderTop: "2px solid ${primary}",
    photoSize: 44, photoShape: "circle",
    contactSeparator: `<span style="color:#d1d5db;padding:0 5px;">&middot;</span>`,
  }),

  compact: cfg({
    showPhoto: false,
    nameSize: 13,
    baseFontSize: 13,
    contactSeparator: `<span style="color:#d1d5db;padding:0 5px;">|</span>`,
  }),

  executive: cfg({
    nameSize: 20, nameColor: "white",
    titleColor: "#fff",
    headerBg: "#1e293b",
    outerBg: "none",
    contactSeparator: `<span style="color:#d1d5db;padding:0 8px;">|</span>`,
    photoSize: 80, photoShape: "rounded",
  }),

  gradient: cfg({
    nameSize: 19, nameColor: "primary",
    gradientBar: "linear-gradient(90deg, ${primary}, ${accent})",
    contactSeparator: `<span style="color:#cbd5e1;padding:0 7px;">|</span>`,
  }),

  developer: cfg({
    nameSize: 15, nameColor: "primary",
    codePrefix: true,
    defaultFont: "'Courier New',Courier,monospace",
    baseFontSize: 13,
    borderTop: "2px solid #e2e8f0",
    photoSize: 64, photoShape: "rounded",
    contactLayout: "stacked",
  }),

  sales: cfg({
    nameSize: 16,
    showPhoneAsHero: true,
    titleColor: "primary", titleBold: true,
    photoSize: 72, photoShape: "circle",
    contactSeparator: `<span style="color:#d1d5db;padding:0 7px;">&middot;</span>`,
  }),

  medical: cfg({
    borderTop: "3px solid ${primary}",
    photoSize: 72, photoShape: "circle",
    contactSeparator: `<span style="color:#d1d5db;padding:0 7px;">&middot;</span>`,
  }),

  legal: cfg({
    nameSize: 16,
    nameLetterSpacing: "2px", nameTransform: "uppercase",
    borderTop: "2px solid ${primary}",
    defaultFont: "Georgia,'Times New Roman',serif",
    photoSize: 72, photoShape: "rounded",
    contactSeparator: `<span style="color:#d1d5db;padding:0 7px;">&middot;</span>`,
  }),

  academic: cfg({
    nameSize: 18, nameColor: "#1e3a5f",
    borderTop: "3px solid ${primary}",
    photoSize: 68, photoShape: "rounded",
    contactSeparator: `<span style="color:#d1d5db;padding:0 8px;">&middot;</span>`,
  }),

  realtor: cfg({
    nameSize: 22,
    titleColor: "primary", titleBold: true,
    companySize: 14, companyColor: "#333", companyPosition: "separate",
    borderLeft: "4px solid ${primary}",
    photoSize: 100, photoShape: "rounded", photoBorder: "3px solid ${primary}",
  }),

  influencer: cfg({
    nameSize: 21, nameColor: "primary",
    socialIconSize: 24,
    photoSize: 85, photoShape: "circle", photoBorder: "3px solid ${primary}",
    contactSeparator: `<span style="color:#d1d5db;padding:0 7px;">&middot;</span>`,
  }),

  photographer: cfg({
    nameSize: 18, nameBold: false,
    nameLetterSpacing: "1.5px",
    titleSize: 11, titleColor: "#aaa",
    companyColor: "#aaa",
    borderTop: "1px solid #e5e7eb",
    photoSize: 55, photoShape: "square",
    contactSeparator: `<span style="color:#d1d5db;padding:0 7px;">&middot;</span>`,
  }),

  dark: cfg({
    nameSize: 19, nameColor: "#f1f5f9",
    titleColor: "#94a3b8",
    companyColor: "#64748b",
    contactColor: "rgba(255,255,255,0.7)",
    contactLinkColor: "primary",
    outerBg: "dark", outerRadius: 8, outerPadding: 18,
    textColor: "#f1f5f9",
    photoSize: 76, photoShape: "rounded",
    contactSeparator: `<span style="color:rgba(255,255,255,0.2);padding:0 8px;">|</span>`,
  }),

  simple: cfg({
    showPhoto: false,
    nameSize: 14,
    baseFontSize: 13,
    contactSeparator: `<span style="color:#d1d5db;padding:0 5px;">&middot;</span>`,
  }),
};

// ================================================================
// HTML Helpers
// ================================================================

function esc(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function safeSize(val: number | undefined, fallback: number): number {
  if (val !== undefined && Number.isFinite(val) && val > 0) return val;
  return fallback;
}

function resolveColor(color: string, primary: string, accent: string): string {
  if (color === "primary") return primary;
  if (color === "accent") return accent;
  if (color === "white") return "#ffffff";
  return color.replace("${primary}", primary).replace("${accent}", accent);
}

// ================================================================
// The ONE render function
// ================================================================

export function renderSignature(data: SignatureData, options: GenerateOptions = {}): string {
  const template = data.template || "minimal";
  const config = TEMPLATE_STYLE_CONFIGS[template] || TEMPLATE_STYLE_CONFIGS.minimal;
  const primary = data.primaryColor || "#2563eb";
  const accent = data.accentColor || "#f59e0b";
  const isPro = options.plan === "pro" || options.plan === "team";
  const font = data.fontFamily || config.defaultFont;
  const baseFontSize = safeSize(data.fontSize, config.baseFontSize);

  // Resolve colors
  const rc = (c: string) => resolveColor(c, primary, accent);
  const nameColor = data.nameColor || rc(config.nameColor);
  const titleColor = data.titleColor || rc(config.titleColor);
  const companyColor = data.companyColor || rc(config.companyColor);
  const contactLinkColor = rc(config.contactLinkColor);
  const contactColor = rc(config.contactColor);
  const textColor = rc(config.textColor);

  // Resolve sizes (user override → template default)
  const nameSize = safeSize(data.nameSize, config.nameSize);
  const titleSize = safeSize(data.titleSize, config.titleSize);
  const companySize = safeSize(data.companySize, config.companySize);

  // Resolve bold/italic/underline
  const nameBold = data.nameBold !== undefined ? data.nameBold : config.nameBold;
  const nameItalic = data.nameItalic === true;
  const nameUnderline = data.nameUnderline === true;
  const titleBold = data.titleBold !== undefined ? data.titleBold : config.titleBold;
  const titleItalic = data.titleItalic === true;
  const titleUnderline = data.titleUnderline === true;
  const companyBold = data.companyBold === true;
  const companyItalic = data.companyItalic === true;
  const companyUnderline = data.companyUnderline === true;

  // Photo
  const photoSize = safeSize(data.photoSize, config.photoSize);
  const photoShape = data.photoShape || config.photoShape;
  const photoPosition = data.photoPosition || "left";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "rounded" ? "8px" : "0";
  const photoBorder = config.photoBorder ? rc(config.photoBorder) : "";

  // Build inline style strings
  const buildStyle = (size: number, color: string, bold: boolean, italic: boolean, underline: boolean, extra: string = ""): string => {
    let s = `font-size:${size}px;font-weight:${bold ? "bold" : "normal"};color:${color};`;
    if (italic) s += "font-style:italic;";
    if (underline) s += "text-decoration:underline;";
    if (config.nameLetterSpacing && size === nameSize) s += `letter-spacing:${config.nameLetterSpacing};`;
    if (config.nameTransform && size === nameSize) s += `text-transform:${config.nameTransform};`;
    if (extra) s += extra;
    return s;
  };

  const nameStyle = buildStyle(nameSize, nameColor, nameBold, nameItalic, nameUnderline);
  const titleStyle = buildStyle(titleSize, titleColor, titleBold, titleItalic, titleUnderline);
  const companyStyle = buildStyle(companySize, companyColor, companyBold, companyItalic, companyUnderline);

  // ---- Build sections ----

  // Social icons
  const ICON_BASE = "https://neatstamp.com/icons/";
  const socialSize = config.socialIconSize;
  const socials = (["linkedin", "twitter", "instagram", "facebook", "github", "youtube"] as const)
    .filter(s => data[s])
    .map(s => `<a href="${esc(data[s]!)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:8px;text-decoration:none;" title="${s}"><img src="${ICON_BASE}${s}.png" alt="${s}" width="${socialSize}" height="${socialSize}" style="width:${socialSize}px;height:${socialSize}px;display:block;border:0;" /></a>`)
    .join("");
  const socialRow = socials ? `<tr><td style="padding-top:8px;">${socials}</td></tr>` : "";

  // Contact info — respects contactOrder
  const contactOrder = data.contactOrder || ["phone", "email", "website"];
  const contactFields: Record<string, () => string> = {
    phone: () => data.phone ? `<a href="tel:${esc(data.phone.replace(/\s/g, ""))}" style="color:${contactColor};text-decoration:none;">${esc(data.phone)}</a>` : "",
    email: () => data.email ? `<a href="mailto:${esc(data.email)}" style="color:${contactLinkColor};text-decoration:none;">${esc(data.email)}</a>` : "",
    website: () => data.website ? `<a href="https://${esc(data.website.replace(/^https?:\/\//, ""))}" style="color:${contactLinkColor};text-decoration:none;">${esc(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
    address: () => data.address ? `<span style="color:${contactColor};">${esc(data.address)}</span>` : "",
  };

  let contactHtml = "";
  if (config.showPhoneAsHero && data.phone) {
    // Sales-style: phone as hero above name
    contactHtml = `<tr><td style="font-size:18px;font-weight:bold;color:#16a34a;padding-bottom:3px;"><a href="tel:${esc(data.phone.replace(/\s/g, ""))}" style="color:#16a34a;text-decoration:none;">${esc(data.phone)}</a></td></tr>`;
  }

  const inlineContact = contactOrder
    .filter(k => !config.showPhoneAsHero || k !== "phone")
    .map(k => contactFields[k]?.() ?? "")
    .filter(Boolean);

  let contactRow = "";
  if (inlineContact.length > 0) {
    if (config.contactLayout === "stacked") {
      contactRow = inlineContact.map(c => `<tr><td style="font-size:${config.contactSize}px;padding-bottom:2px;">${c}</td></tr>`).join("\n");
    } else {
      contactRow = `<tr><td style="font-size:${config.contactSize}px;color:${contactColor};padding-bottom:3px;">${inlineContact.join(config.contactSeparator)}</td></tr>`;
    }
  }

  // Address (separate from contact)
  const addressRow = data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${esc(data.address)}</td></tr>` : "";

  // Calendly
  const calendlyRow = data.calendlyUrl ? `<tr><td style="padding-top:8px;"><a href="${esc(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:7px 18px;background-color:${primary};color:#fff;text-decoration:none;font-size:12px;font-family:Arial,sans-serif;border-radius:4px;font-weight:bold;">Book a Meeting</a></td></tr>` : "";

  // Banner
  const bannerRow = data.ctaBannerUrl ? `<tr><td style="padding-top:10px;">${data.ctaBannerLink ? `<a href="${esc(data.ctaBannerLink)}" target="_blank" rel="noopener noreferrer">` : ""}<img src="${esc(data.ctaBannerUrl)}" alt="Banner" width="400" style="width:400px;max-width:100%;height:auto;display:block;border:0;" />${data.ctaBannerLink ? "</a>" : ""}</td></tr>` : "";

  // Disclaimer
  const disclaimerRow = data.disclaimer ? `<tr><td style="padding-top:8px;font-size:9px;color:#94a3b8;font-family:Arial,Helvetica,sans-serif;line-height:1.4;max-width:500px;">${esc(data.disclaimer)}</td></tr>` : "";

  // Branding (free plan)
  const brandingRow = !isPro ? `<tr><td style="padding-top:8px;"><a href="https://neatstamp.com?ref=sig" target="_blank" rel="noopener noreferrer" style="color:#94a3b8;font-size:10px;font-family:Arial,sans-serif;text-decoration:none;">Made with NeatStamp</a></td></tr>` : "";

  // Tracking pixel (free plan)
  const pixelRow = !isPro && options.signatureId ? `<tr><td><img src="https://neatstamp.com/r/${esc(options.signatureId)}/track" width="1" height="1" style="width:1px;height:1px;border:0;display:block;" alt="" /></td></tr>` : "";

  // ---- Name/Title/Company rows ----
  const pronounsHtml = data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${esc(data.pronouns)})</span>` : "";
  const namePrefix = config.codePrefix ? `<span style="color:#94a3b8;">// </span>` : "";

  // Field cell renderers — return inline HTML (no <tr>/<td> wrapper)
  const fieldCellRenderers: Record<string, () => string> = {
    fullName: () => data.fullName ? `<span style="${nameStyle}">${namePrefix}${esc(data.fullName)}${pronounsHtml}</span>` : "",
    jobTitle: () => data.jobTitle ? `<span style="${titleStyle}">${esc(data.jobTitle)}</span>` : "",
    company: () => {
      if (config.companyPosition === "under-photo" && data.photoUrl) return "";
      return data.company ? `<span style="${companyStyle}">${esc(data.company)}</span>` : "";
    },
    pronouns: () => "", // rendered inline with name
  };

  // Build rows from fieldRows (2D) or fieldOrder (1D fallback)
  let userFieldRows: string;

  if (data.fieldRows && data.fieldRows.length > 0) {
    // 2D layout: each inner array is a row, fields in same array are side by side
    userFieldRows = data.fieldRows.map(row => {
      const cells = row.map(k => fieldCellRenderers[k]?.() ?? "").filter(Boolean);
      if (cells.length === 0) return "";
      if (cells.length === 1) {
        // Single field row — simple
        return `<tr><td style="padding-bottom:2px;">${cells[0]}</td></tr>`;
      }
      // Multiple fields side by side — use inline table cells
      return `<tr><td style="padding-bottom:2px;"><table cellpadding="0" cellspacing="0" border="0"><tr>${
        cells.map(c => `<td style="padding-right:12px;">${c}</td>`).join("")
      }</tr></table></td></tr>`;
    }).filter(Boolean).join("\n");
  } else {
    // 1D fallback: each field on its own row
    const fieldOrder = data.fieldOrder || ["fullName", "jobTitle", "company"];
    userFieldRows = fieldOrder.map(k => {
      const content = fieldCellRenderers[k]?.() ?? "";
      return content ? `<tr><td style="padding-bottom:2px;">${content}</td></tr>` : "";
    }).filter(Boolean).join("\n");
  }

  // ---- Photo cell ----
  let photoCell = "";
  if (config.showPhoto && data.photoUrl) {
    const paddingStyle = photoPosition === "right" ? "padding-left:18px;" : "padding-right:18px;";
    const borderStyle = photoBorder ? `border:${photoBorder};` : "";
    photoCell = `<td style="vertical-align:top;${paddingStyle}">
      <img src="${esc(data.photoUrl)}" alt="${esc(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;${borderStyle}" />
      ${config.companyPosition === "under-photo" && data.company ? `<p style="margin:5px 0 0;font-size:${companySize}px;font-weight:bold;color:${companyColor};text-transform:uppercase;letter-spacing:1px;font-family:${font};width:${photoSize}px;text-align:center;">${esc(data.company)}</p>` : ""}
    </td>`;
  }

  // ---- Section assignment: what goes in photo column vs content column ----
  const leftFields = new Set(data.leftColumnFields || []);
  const inLeft = (key: string) => leftFields.has(key);
  const inRight = (key: string) => !leftFields.has(key);

  // Build rows per section
  const sections: Record<string, string> = {
    heroPhone: contactHtml,
    userFields: userFieldRows,
    contact: contactRow,
    address: addressRow,
    social: socialRow,
    calendly: calendlyRow,
    banner: bannerRow,
    disclaimer: disclaimerRow,
    branding: brandingRow,
    pixel: pixelRow,
  };

  // Left column content (under the photo)
  const leftContent = ["social", "contact", "calendly"].filter(k => inLeft(k)).map(k => sections[k]).filter(Boolean).join("\n");

  // Add left column content under the photo in the photo cell
  if (leftContent && photoCell) {
    photoCell = photoCell.replace("</td>", `${leftContent}</td>`);
  }

  // ---- Content cell ----
  const borderLeftStyle = config.borderLeft ? `border-left:${rc(config.borderLeft)};padding-left:18px;` : "";

  const contentCell = `<td style="vertical-align:top;${borderLeftStyle}">
      <table cellpadding="0" cellspacing="0" border="0">
        ${inRight("heroPhone") ? sections.heroPhone : ""}
        ${sections.userFields}
        ${inRight("contact") ? sections.contact : ""}
        ${inRight("address") ? sections.address : ""}
        ${inRight("social") ? sections.social : ""}
        ${inRight("calendly") ? sections.calendly : ""}
        ${sections.banner}
        ${sections.disclaimer}
        ${sections.branding}
        ${sections.pixel}
      </table>
    </td>`;

  // ---- Outer table ----
  const borderTopStyle = config.borderTop ? `border-top:${rc(config.borderTop)};` : "";

  let outerBgStyle = "";
  if (config.outerBg === "primary") outerBgStyle = `background-color:${primary};`;
  else if (config.outerBg === "dark") outerBgStyle = "background-color:#111827;";
  else if (config.outerBg === "accent") outerBgStyle = `background-color:${accent};`;

  const outerRadiusStyle = config.outerRadius ? `border-radius:${config.outerRadius}px;` : "";
  const outerPaddingStyle = config.outerPadding ? `padding:${config.outerPadding}px ${config.outerPadding + 2}px;` : "";

  // Build the table
  let html: string;

  if (config.outerBg !== "none") {
    // Templates with background: wrap content in padded cell
    html = `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:${baseFontSize}px;color:${textColor};${outerBgStyle}${outerRadiusStyle}${borderTopStyle}">
  <tr><td style="${outerPaddingStyle}">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        ${photoPosition === "right" ? contentCell + photoCell : photoCell + contentCell}
      </tr>
    </table>
  </td></tr>
</table>`;
  } else {
    // Templates without background: simpler structure
    html = `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:${baseFontSize}px;color:${textColor};${borderTopStyle}">
  <tr>
    ${photoPosition === "right" ? contentCell + photoCell : photoCell + contentCell}
  </tr>
</table>`;
  }

  // Apply background wrapper if data.backgroundColor is set
  if (data.backgroundColor) {
    html = `<table cellpadding="0" cellspacing="0" border="0" style="background-color:${data.backgroundColor};"><tr><td style="padding:16px;">${html}</td></tr></table>`;
    if (data.textOnDark) {
      // Replace dark AND mid-tone text colors with white/light variants
      html = html.replace(/color:#1a1a1a/g, "color:#ffffff")
                 .replace(/color:#1e3a5f/g, "color:#ffffff")
                 .replace(/color:#333/g, "color:#ffffff")
                 .replace(/color:#334155/g, "color:#ffffff")
                 .replace(/color:#555/g, "color:#dddddd")
                 .replace(/color:#999/g, "color:#bbbbbb")
                 .replace(/color:#f1f5f9/g, "color:#ffffff")
                 .replace(/color:#94a3b8/g, "color:#dddddd")
                 .replace(/color:#64748b/g, "color:#bbbbbb")
                 .replace(/color:#aaa/g, "color:#bbbbbb");
    }
  }

  return html;
}
