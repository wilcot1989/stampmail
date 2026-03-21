import { SignatureData, TemplateName } from "./types";

export interface GenerateOptions {
  plan?: "free" | "pro" | "team";
  signatureId?: string;
  imageUrl?: string; // R2 hosted image URL for free user signatures
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SOCIAL_ICON_URLS: Record<string, string> = {
  linkedin: "https://neatstamp.com/icons/linkedin.png",
  twitter: "https://neatstamp.com/icons/twitter.png",
  instagram: "https://neatstamp.com/icons/instagram.png",
  facebook: "https://neatstamp.com/icons/facebook.png",
  github: "https://neatstamp.com/icons/github.png",
  youtube: "https://neatstamp.com/icons/youtube.png",
};

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
  instagram: "Instagram",
  facebook: "Facebook",
  github: "GitHub",
  youtube: "YouTube",
};

function socialLink(url: string, platform: string): string {
  if (!url) return "";
  const href = url.startsWith("http") ? url : `https://${url}`;
  const label = SOCIAL_LABELS[platform] || platform;
  const iconUrl = SOCIAL_ICON_URLS[platform] || "";
  return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:8px;text-decoration:none;" title="${escapeHtml(label)}"><img src="${iconUrl}" alt="${escapeHtml(label)}" width="20" height="20" style="width:20px;height:20px;display:block;border:0;" /></a>`;
}

function socialLinks(data: SignatureData): string {
  const links = [
    socialLink(data.linkedin, "linkedin"),
    socialLink(data.twitter, "twitter"),
    socialLink(data.instagram, "instagram"),
    socialLink(data.facebook, "facebook"),
    socialLink(data.github, "github"),
    socialLink(data.youtube, "youtube"),
  ]
    .filter(Boolean)
    .join("");

  if (!links) return "";
  return `<tr><td style="padding-top:8px;">${links}</td></tr>`;
}

// ----------------------------------------------------------------
// Shared helper: resolve photo src (handles free-tier proxy URL)
// ----------------------------------------------------------------
function resolvePhotoSrc(data: SignatureData, options?: GenerateOptions): string {
  if (!data.photoUrl) return "";
  const isPro = options?.plan === "pro" || options?.plan === "team";
  if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
    return `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
  }
  return escapeHtml(data.photoUrl);
}

// ----------------------------------------------------------------
// photoCell: renders a <td> with the photo, respecting data overrides.
// Used by templates that want the standard helper.
// ----------------------------------------------------------------
function photoCell(
  data: SignatureData,
  defaultSize: number,
  defaultBorderRadius: string,
  options?: GenerateOptions
): string {
  if (!data.photoUrl) return "";

  const size = data.photoSize ?? defaultSize;
  const shape = data.photoShape ?? "";
  const borderRadius = shape === "circle" ? "50%" : shape === "rounded" ? "8px" : shape === "square" ? "0" : defaultBorderRadius;
  const src = resolvePhotoSrc(data, options);

  return `<td style="vertical-align:top;padding-right:16px;">
    <img src="${src}" alt="${escapeHtml(data.fullName)}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:${borderRadius};object-fit:cover;display:block;" />
  </td>`;
}

// ----------------------------------------------------------------
// photoCellRight: same as photoCell but with left padding (for right-side photo)
// ----------------------------------------------------------------
function photoCellRight(
  data: SignatureData,
  defaultSize: number,
  defaultBorderRadius: string,
  options?: GenerateOptions
): string {
  if (!data.photoUrl) return "";

  const size = data.photoSize ?? defaultSize;
  const shape = data.photoShape ?? "";
  const borderRadius = shape === "circle" ? "50%" : shape === "rounded" ? "8px" : shape === "square" ? "0" : defaultBorderRadius;
  const src = resolvePhotoSrc(data, options);

  return `<td style="vertical-align:top;padding-left:16px;">
    <img src="${src}" alt="${escapeHtml(data.fullName)}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:${borderRadius};object-fit:cover;display:block;" />
  </td>`;
}

function calendlyButton(data: SignatureData, color: string): string {
  if (!data.calendlyUrl) return "";
  const href = data.calendlyUrl.startsWith("http")
    ? data.calendlyUrl
    : `https://${data.calendlyUrl}`;
  return `<tr><td style="padding-top:10px;">
    <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:6px 16px;background-color:${color};color:#ffffff;text-decoration:none;font-size:12px;font-family:Arial,sans-serif;border-radius:4px;font-weight:bold;">Book a Meeting</a>
  </td></tr>`;
}

function ctaBanner(data: SignatureData): string {
  if (!data.ctaBannerUrl) return "";
  const img = `<img src="${escapeHtml(data.ctaBannerUrl)}" alt="Banner" width="400" style="width:400px;max-width:100%;height:auto;display:block;border-radius:4px;" />`;
  if (data.ctaBannerLink) {
    const href = data.ctaBannerLink.startsWith("http")
      ? data.ctaBannerLink
      : `https://${data.ctaBannerLink}`;
    return `<tr><td style="padding-top:12px;"><a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${img}</a></td></tr>`;
  }
  return `<tr><td style="padding-top:12px;">${img}</td></tr>`;
}

function neatstampBranding(): string {
  return `<tr><td style="padding-top:10px;"><a href="https://neatstamp.com?ref=sig" target="_blank" rel="noopener noreferrer" style="color:#94a3b8;font-size:10px;font-family:Arial,sans-serif;text-decoration:none;">Made with NeatStamp</a></td></tr>`;
}

function trackingPixel(signatureId: string): string {
  return `<tr><td><img src="https://neatstamp.com/api/images/${escapeHtml(signatureId)}/track" width="1" height="1" style="width:1px;height:1px;display:block;" alt="" /></td></tr>`;
}

function disclaimerRow(data: SignatureData): string {
  if (!data.disclaimer?.trim()) return "";
  return `<tr><td style="padding-top:8px;font-size:9px;color:#94a3b8;font-family:Arial,Helvetica,sans-serif;line-height:1.4;max-width:500px;">${escapeHtml(data.disclaimer)}</td></tr>`;
}

/**
 * Build contact info string in the user's preferred order.
 * Falls back to default order if no contactOrder is set.
 */
function orderedContact(data: SignatureData, separator: string, linkColor: string, textColor: string): string {
  const order = data.contactOrder ?? ["phone", "email", "website"];
  const fieldMap: Record<string, () => string> = {
    phone: () => data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:${textColor};text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    email: () => data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${linkColor};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    website: () => data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${linkColor};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
    address: () => data.address ? `<span style="color:${textColor};">${escapeHtml(data.address)}</span>` : "",
  };

  return order
    .map((key) => fieldMap[key]?.() ?? "")
    .filter(Boolean)
    .join(separator);
}

/**
 * Returns HTML rows for name/title/company/pronouns in the order specified by data.fieldOrder.
 * Only used by templates that opt in (currently: minimal).
 */
function orderedUserFields(
  data: SignatureData,
  renderers: Record<string, () => string>
): string {
  const order = data.fieldOrder ?? ["fullName", "jobTitle", "company", "pronouns"];
  return order.map(key => renderers[key]?.() ?? "").filter(Boolean).join("\n        ");
}

// ----------------------------------------------------------------
// Shared style-override helpers — called inside each template
// ----------------------------------------------------------------

/** Returns font-family string to use, respecting data.fontFamily override */
function ff(data: SignatureData, templateDefault: string): string {
  return data.fontFamily ?? templateDefault;
}

/** Build name inline style from data overrides. templateDefaults contain fallbacks. */
function nameStyle(data: SignatureData, defaults: { size: number; color: string; bold?: boolean; italic?: boolean }): string {
  const size = data.nameSize ?? defaults.size;
  const color = data.nameColor ?? defaults.color;
  const bold = data.nameBold !== undefined ? data.nameBold : (defaults.bold !== false);
  const italic = data.nameItalic === true || (defaults.italic === true && data.nameItalic !== false);
  const weight = bold ? "bold" : "normal";
  const style = italic ? "font-style:italic;" : "";
  return `font-size:${size}px;font-weight:${weight};color:${color};${style}`;
}

/** Build title inline style from data overrides. */
function titleStyle(data: SignatureData, defaults: { size: number; color: string; bold?: boolean; italic?: boolean; extraCss?: string }): string {
  const size = data.titleSize ?? defaults.size;
  const color = data.titleColor ?? defaults.color;
  const bold = data.titleBold === true || (defaults.bold === true && data.titleBold !== false);
  const italic = data.titleItalic === true || (defaults.italic === true && data.titleItalic !== false);
  const weight = bold ? "bold" : "normal";
  const style = italic ? "font-style:italic;" : "";
  const extra = defaults.extraCss ?? "";
  return `font-size:${size}px;font-weight:${weight};color:${color};${style}${extra}`;
}

/** Build company inline style from data overrides. */
function companyStyle(data: SignatureData, defaults: { size: number; color: string; bold?: boolean; italic?: boolean; extraCss?: string }): string {
  const size = data.companySize ?? defaults.size;
  const color = data.companyColor ?? defaults.color;
  const bold = data.companyBold === true || (defaults.bold === true && data.companyBold !== false);
  const italic = data.companyItalic === true || (defaults.italic === true && data.companyItalic !== false);
  const weight = bold ? "bold" : "normal";
  const style = italic ? "font-style:italic;" : "";
  const extra = defaults.extraCss ?? "";
  return `font-size:${size}px;font-weight:${weight};color:${color};${style}${extra}`;
}

// ============================================================
// TEMPLATES
// ============================================================

function generateMinimal(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const contact = orderedContact(data, `<span style="color:#ccc;padding:0 6px;">·</span>`, c, "#555");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 70, "50%", options)
    : photoCell(data, 70, "50%", options);

  const minimalUserFields = orderedUserFields(data, {
    fullName: () => `<tr><td style="${nameStyle(data, { size: 17, color: "#1a1a1a", bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#999;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>`,
    jobTitle: () => data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 12, color: "#666" })};padding-bottom:2px;">${escapeHtml(data.jobTitle)}</td></tr>` : "",
    company: () => data.company ? `<tr><td style="${companyStyle(data, { size: 12, color: "#999" })};padding-bottom:4px;">${escapeHtml(data.company)}</td></tr>` : "",
    pronouns: () => "", // pronouns are rendered inline with fullName above
  });

  const contentTd = `<td style="vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        ${minimalUserFields}
        <tr><td style="border-top:1px solid #e5e7eb;padding-top:7px;font-size:12px;color:#555;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-top:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
  </tr>
</table>`;
}

function generateModern(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const contact = orderedContact(data, `<span style="color:#d1d5db;padding:0 8px;">|</span>`, c, "#555");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 75, "8px", options)
    : photoCell(data, 75, "8px", options);

  const contentTd = `<td style="vertical-align:top;border-left:4px solid ${c};padding-left:16px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 18, color: c, bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="padding-bottom:7px;">${data.jobTitle ? `<span style="${titleStyle(data, { size: 12, color: a, bold: true, extraCss: "text-transform:uppercase;letter-spacing:0.8px;" })}">${escapeHtml(data.jobTitle)}</span>` : ""}${data.jobTitle && data.company ? `<span style="color:#d1d5db;"> &nbsp;|&nbsp; </span>` : ""}${data.company ? `<span style="${companyStyle(data, { size: 12, color: "#666" })}">${escapeHtml(data.company)}</span>` : ""}</td></tr>` : ""}
        ${data.pronouns ? `<tr><td style="font-size:11px;color:#999;padding-bottom:5px;">${escapeHtml(data.pronouns)}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;padding-bottom:4px;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
  </tr>
</table>`;
}

function generateCorporate(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  // Custom layout: stacked T/E/W/A labels — intentionally not using orderedContact()
  const corporateOrder = data.contactOrder ?? ["phone", "email", "website"];
  const corporateFieldRows: Record<string, string> = {
    phone: data.phone ? `<tr><td style="padding-bottom:2px;white-space:nowrap;"><span style="color:#999;font-weight:bold;font-size:10px;letter-spacing:0.5px;">T&nbsp;</span><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#444;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : "",
    email: data.email ? `<tr><td style="padding-bottom:2px;white-space:nowrap;"><span style="color:#999;font-weight:bold;font-size:10px;letter-spacing:0.5px;">E&nbsp;</span><a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>` : "",
    website: data.website ? `<tr><td style="padding-bottom:2px;white-space:nowrap;"><span style="color:#999;font-weight:bold;font-size:10px;letter-spacing:0.5px;">W&nbsp;</span><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : "",
    address: data.address ? `<tr><td style="padding-bottom:2px;color:#888;"><span style="color:#999;font-weight:bold;font-size:10px;letter-spacing:0.5px;">A&nbsp;</span>${escapeHtml(data.address)}</td></tr>` : "",
  };
  const corporateContactRows = [...corporateOrder, ...(!corporateOrder.includes("address") ? ["address"] : [])]
    .map((k) => corporateFieldRows[k] ?? "").filter(Boolean).join("\n            ");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 65, "4px", options)
    : photoCell(data, 65, "4px", options);

  const contentTd = `<td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 17, color: "#1a1a1a", bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#999;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="padding-bottom:7px;">${data.jobTitle ? `<span style="${titleStyle(data, { size: 12, color: c, bold: true })}">${escapeHtml(data.jobTitle)}</span>` : ""}${data.jobTitle && data.company ? `<span style="color:#ccc;"> &nbsp;&bull;&nbsp; </span>` : ""}${data.company ? `<span style="${companyStyle(data, { size: 12, color: "#444", bold: true })}">${escapeHtml(data.company)}</span>` : ""}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;">
          <table cellpadding="0" cellspacing="0" border="0">
            ${corporateContactRows}
          </table>
        </td></tr>
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;border-top:3px solid ${c};">
  <tr><td colspan="2" style="height:10px;"></td></tr>
  <tr>
    ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
  </tr>
</table>`;
}

function generateCreative(data: SignatureData, options?: GenerateOptions): string {
  // Custom layout: emoji contact icons (✉ ✆ 🌐 📍) — intentionally not using orderedContact()
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const photoSize = data.photoSize ?? 90;
  const photoShape = data.photoShape ?? "circle";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "rounded" ? "8px" : "0";

  const photoPosition = data.photoPosition ?? "left";

  let photoPart = "";
  if (data.photoUrl) {
    const src = resolvePhotoSrc(data, options);
    const paddingStyle = photoPosition === "right"
      ? "padding-left:18px;"
      : "padding-right:18px;";
    photoPart = `<td style="vertical-align:top;${paddingStyle}text-align:center;">
      <img src="${src}" alt="${escapeHtml(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;border:3px solid ${c};" />
      ${data.company ? `<p style="margin:5px 0 0;font-size:10px;font-weight:bold;color:${a};text-transform:uppercase;letter-spacing:1px;font-family:${font};width:${photoSize}px;text-align:center;">${escapeHtml(data.company)}</p>` : ""}
    </td>`;
  }

  const creativeOrder = data.contactOrder ?? ["phone", "email", "website"];
  const creativeFieldRows: Record<string, string> = {
    phone: data.phone ? `<tr><td style="font-size:12px;padding-bottom:2px;"><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">&#9742;&nbsp;${escapeHtml(data.phone)}</a></td></tr>` : "",
    email: data.email ? `<tr><td style="font-size:12px;padding-bottom:2px;"><a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">&#9993;&nbsp;${escapeHtml(data.email)}</a></td></tr>` : "",
    website: data.website ? `<tr><td style="font-size:12px;padding-bottom:2px;"><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">&#127760;&nbsp;${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : "",
    address: data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">&#128205;&nbsp;${escapeHtml(data.address)}</td></tr>` : "",
  };
  const creativeContactRows = [...creativeOrder, ...(!creativeOrder.includes("address") ? ["address"] : [])]
    .map((k) => creativeFieldRows[k] ?? "").filter(Boolean).join("\n          ");

  const contentTd = `<td style="vertical-align:top;border-left:2px dashed ${a};padding-left:18px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 20, color: c, bold: true })};padding-bottom:2px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 13, color: "#555" })};padding-bottom:8px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company && !data.photoUrl ? `<tr><td style="${companyStyle(data, { size: 10, color: a })};text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">${escapeHtml(data.company)}</td></tr>` : ""}
        <tr><td>
          <table cellpadding="0" cellspacing="0" border="0">
            ${creativeContactRows}
          </table>
        </td></tr>
        ${socialLinks(data)}
        ${calendlyButton(data, a)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photoPart : photoPart + contentTd}
  </tr>
</table>`;
}

function generateBold(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const photoSize = data.photoSize ?? 75;
  const photoShape = data.photoShape ?? "rounded";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "square" ? "0" : "8px";
  const photoPosition = data.photoPosition ?? "left";

  let photoPart = "";
  if (data.photoUrl) {
    const src = resolvePhotoSrc(data, options);
    const paddingStyle = photoPosition === "right" ? "padding-left:16px;" : "padding-right:16px;";
    photoPart = `<td style="vertical-align:middle;${paddingStyle}"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;border:2px solid rgba(255,255,255,0.4);" /></td>`;
  }

  const contactInline = orderedContact(data, `<span style="opacity:0.4;padding:0 8px;">|</span>`, "#fff", "#fff");

  const contentTd = `<td style="vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr><td style="${nameStyle(data, { size: 20, color: "#fff", bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;opacity:0.6;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
            ${(data.jobTitle || data.company) ? `<tr><td style="${titleStyle(data, { size: 12, color: "rgba(255,255,255,0.8)" })};padding-bottom:8px;">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? " &nbsp;|&nbsp; " : ""}${data.company ? escapeHtml(data.company) : ""}</td></tr>` : ""}
            <tr><td style="font-size:12px;padding-bottom:4px;">${contactInline}</td></tr>
            ${data.address ? `<tr><td style="font-size:11px;color:rgba(255,255,255,0.6);padding-bottom:4px;">${escapeHtml(data.address)}</td></tr>` : ""}
            ${socialLinks(data)}
            ${data.calendlyUrl ? `<tr><td style="padding-top:10px;"><a href="${escapeHtml(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:7px 18px;background:#fff;color:${c};text-decoration:none;font-size:12px;font-family:Arial,sans-serif;border-radius:4px;font-weight:bold;">Book a Meeting</a></td></tr>` : ""}
          </table>
        </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};background-color:${c};border-radius:8px;">
  <tr><td style="padding:18px 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        ${photoPosition === "right" ? contentTd + photoPart : photoPart + contentTd}
      </tr>
    </table>
    <table cellpadding="0" cellspacing="0" border="0">
      ${ctaBanner(data)}
      ${disclaimerRow(data)}
      ${!isPro ? `<tr><td style="padding-top:8px;"><a href="https://neatstamp.com?ref=sig" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,0.35);font-size:10px;font-family:Arial,sans-serif;text-decoration:none;">Made with NeatStamp</a></td></tr>` : ""}
      ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
    </table>
  </td></tr>
</table>`;
}

function generateElegant(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Georgia,'Times New Roman',serif");

  const contact = orderedContact(data, `<span style="color:#ccc;padding:0 6px;">&mdash;</span>`, c, "#666");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 70, "50%", options)
    : photoCell(data, 70, "50%", options);

  const contentTd = `<td style="vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 18, color: "#1a1a1a", bold: true })};letter-spacing:0.5px;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;font-style:italic;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 12, color: c, italic: true })};padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="${companyStyle(data, { size: 11, color: "#777", extraCss: "letter-spacing:1.5px;text-transform:uppercase;" })};padding-bottom:7px;">${escapeHtml(data.company)}</td></tr>` : ""}
        <tr><td style="padding-bottom:7px;">
          <table cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="width:36px;height:1px;background-color:${c};font-size:0;line-height:0;">&nbsp;</td>
            <td style="width:8px;font-size:0;line-height:0;">&nbsp;</td>
            <td style="width:6px;height:1px;background-color:${c};font-size:0;line-height:0;">&nbsp;</td>
            <td style="width:4px;font-size:0;line-height:0;">&nbsp;</td>
            <td style="width:4px;height:4px;border-radius:50%;background-color:${c};font-size:0;line-height:0;">&nbsp;</td>
          </tr></table>
        </td></tr>
        <tr><td style="font-size:12px;font-family:Arial,sans-serif;color:#666;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;font-family:Arial,sans-serif;padding-top:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
  </tr>
</table>`;
}

function generateStartup(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const photoSize = data.photoSize ?? 44;
  const photoShape = data.photoShape ?? "circle";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "square" ? "0" : "8px";
  const photoPosition = data.photoPosition ?? "left";

  let avatarCell = "";
  if (data.photoUrl) {
    const src = resolvePhotoSrc(data, options);
    const paddingStyle = photoPosition === "right" ? "padding-left:12px;" : "padding-right:12px;";
    avatarCell = `<td style="vertical-align:middle;${paddingStyle}"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;" /></td>`;
  }

  const contact = orderedContact(data, `<span style="color:#d1d5db;padding:0 7px;">·</span>`, c, "#555");

  const nameTd = `<td style="vertical-align:middle;">
      <span style="${nameStyle(data, { size: 15, color: "#1a1a1a", bold: true })}">${escapeHtml(data.fullName)}</span>${data.pronouns ? ` <span style="font-size:11px;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}
      ${(data.jobTitle || data.company) ? `&nbsp;<span style="color:#d1d5db;">|</span>&nbsp;<span style="${titleStyle(data, { size: 12, color: c })}">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? `<span style="color:#aaa;"> @ </span>` : ""}${data.company ? escapeHtml(data.company) : ""}</span>` : ""}
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:13px;color:#333;">
  <tr>
    ${photoPosition === "right" ? nameTd + avatarCell : avatarCell + nameTd}
  </tr>
  <tr><td colspan="2" style="border-top:1px solid #f0f0f0;padding-top:7px;font-size:12px;color:#555;">${contact}</td></tr>
  ${data.address ? `<tr><td colspan="2" style="font-size:11px;color:#aaa;padding-top:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
  ${socialLinks(data)}
  ${data.calendlyUrl ? `<tr><td colspan="2" style="padding-top:8px;"><a href="${escapeHtml(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:5px 14px;background-color:${c};color:#fff;text-decoration:none;font-size:11px;font-family:Arial,sans-serif;border-radius:12px;font-weight:bold;">Book a Meeting</a></td></tr>` : ""}
  ${ctaBanner(data)}
  ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
  ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
</table>`;
}

function generateCompact(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const contact = orderedContact(data, `<span style="color:#d1d5db;padding:0 5px;">&middot;</span>`, c, "#555");

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:13px;color:#333;">
  <tr><td style="white-space:nowrap;">
    <strong style="${nameStyle(data, { size: 13, color: "#1a1a1a", bold: true })}">${escapeHtml(data.fullName)}</strong>${data.pronouns ? ` <span style="font-size:11px;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}${data.jobTitle ? ` <span style="color:#ccc;">|</span> <span style="${titleStyle(data, { size: 13, color: c })}">${escapeHtml(data.jobTitle)}</span>` : ""}${data.company ? ` <span style="color:#ccc;">|</span> <span style="${companyStyle(data, { size: 13, color: "#555" })}">${escapeHtml(data.company)}</span>` : ""}
  </td></tr>
  <tr><td style="font-size:12px;padding-top:3px;color:#555;">${contact}</td></tr>
  ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-top:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
  ${calendlyButton(data, c)}
  ${ctaBanner(data)}
  ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
  ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
</table>`;
}

function generateExecutive(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const contact = orderedContact(data, `<span style="color:#d1d5db;padding:0 8px;">|</span>`, c, "#444");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 80, "6px", options)
    : photoCell(data, 80, "6px", options);

  const headerContent = `<td style="vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr><td style="${nameStyle(data, { size: 20, color: "#fff", bold: true })};padding-bottom:2px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:rgba(255,255,255,0.45);">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
              ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 13, color: a, bold: true })};letter-spacing:0.3px;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
              ${data.company ? `<tr><td style="${companyStyle(data, { size: 11, color: "rgba(255,255,255,0.55)", extraCss: "letter-spacing:1px;text-transform:uppercase;" })}">${escapeHtml(data.company)}</td></tr>` : ""}
            </table>
          </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    <td style="background-color:#1e293b;padding:16px 20px;border-radius:4px 4px 0 0;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${photoPosition === "right" ? headerContent + photo : photo + headerContent}
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 20px;border-left:3px solid ${c};background-color:#fafafa;border-radius:0 0 4px 4px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:12px;color:#555;padding-bottom:4px;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:4px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateGradient(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const contact = orderedContact(data, `<span style="color:#cbd5e1;padding:0 7px;">|</span>`, c, "#555");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 70, "50%", options)
    : photoCell(data, 70, "50%", options);

  const contentTd = `<td style="vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr><td style="${nameStyle(data, { size: 19, color: c, bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#999;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
              ${(data.jobTitle || data.company) ? `<tr><td style="padding-bottom:7px;">${data.jobTitle ? `<span style="${titleStyle(data, { size: 12, color: a, bold: true })}">${escapeHtml(data.jobTitle)}</span>` : ""}${data.jobTitle && data.company ? `<span style="color:#cbd5e1;padding:0 6px;">·</span>` : ""}${data.company ? `<span style="${companyStyle(data, { size: 12, color: "#666" })}">${escapeHtml(data.company)}</span>` : ""}</td></tr>` : ""}
              <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
              ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
              ${socialLinks(data)}
              ${calendlyButton(data, c)}
              ${ctaBanner(data)}
              ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
              ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
            </table>
          </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    <td style="width:8px;background-color:${c};padding:0;font-size:0;line-height:0;">&nbsp;</td>
    <td style="width:4px;background-color:${a};padding:0;font-size:0;line-height:0;">&nbsp;</td>
    <td style="padding:14px 18px;background-color:#f8fafc;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateDeveloper(data: SignatureData, options?: GenerateOptions): string {
  // Custom layout: stacked rows with > prefix — intentionally not using orderedContact()
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "'Courier New',Courier,monospace");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 64, "4px", options)
    : photoCell(data, 64, "4px", options);

  const contentTd = `<td style="vertical-align:top;padding-bottom:10px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 15, color: c, bold: true })};padding-bottom:1px;"><span style="color:#94a3b8;">// </span>${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#94a3b8;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 11, color: a })};padding-bottom:1px;"><span style="color:#94a3b8;">const </span><span style="color:#334155;">role</span><span style="color:#94a3b8;"> = </span>'${escapeHtml(data.jobTitle)}${data.company ? ` @ ${escapeHtml(data.company)}` : ""}'</td></tr>` : ""}
        <tr><td style="padding-top:6px;">
          <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;">
            ${(() => {
              const devOrder = data.contactOrder ?? ["phone", "email", "website"];
              const devFieldRows: Record<string, string> = {
                phone: data.phone ? `<tr><td style="padding-bottom:2px;color:#64748b;"><span style="color:#94a3b8;">&gt; </span><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#475569;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : "",
                email: data.email ? `<tr><td style="padding-bottom:2px;color:#64748b;"><span style="color:#94a3b8;">&gt; </span><a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>` : "",
                website: data.website ? `<tr><td style="padding-bottom:2px;color:#64748b;"><span style="color:#94a3b8;">&gt; </span><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : "",
                address: data.address ? `<tr><td style="padding-bottom:2px;color:#94a3b8;"><span style="color:#cbd5e1;"># </span>${escapeHtml(data.address)}</td></tr>` : "",
              };
              const rows = [...devOrder, ...(!devOrder.includes("address") ? ["address"] : [])]
                .map((k) => devFieldRows[k] ?? "").filter(Boolean);
              const githubRow = data.github ? `<tr><td style="padding-bottom:2px;color:#64748b;"><span style="color:#94a3b8;">&gt; </span><a href="${escapeHtml(data.github.startsWith("http") ? data.github : `https://${data.github}`)}" target="_blank" rel="noopener noreferrer" style="color:${a};text-decoration:none;">github/${escapeHtml(data.github.replace(/^https?:\/\/(www\.)?github\.com\//, ""))}</a></td></tr>` : "";
              return [...rows, githubRow].filter(Boolean).join("\n            ");
            })()}
          </table>
        </td></tr>
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:13px;color:#334155;border-bottom:2px solid #e2e8f0;">
  <tr>
    ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
  </tr>
</table>`;
}

function generateSales(data: SignatureData, options?: GenerateOptions): string {
  // Custom layout: phone is displayed as a hero click-to-call above the name — intentionally not using orderedContact()
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const salesOrder = data.contactOrder ?? ["phone", "email", "website"];
  const salesFieldMap: Record<string, () => string> = {
    email: () => data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    website: () => data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
    address: () => "",
    phone: () => "",
  };
  const contact = salesOrder
    .filter((k) => k !== "phone")
    .map((k) => salesFieldMap[k]?.() ?? "")
    .filter(Boolean)
    .join(`<span style="color:#d1d5db;padding:0 7px;">·</span>`);

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 72, "50%", options)
    : photoCell(data, 72, "50%", options);

  const contentTd = `<td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        ${data.phone ? `<tr><td style="font-size:18px;font-weight:bold;color:#16a34a;padding-bottom:3px;"><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#16a34a;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : ""}
        <tr><td style="${nameStyle(data, { size: 16, color: "#1a1a1a", bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="${titleStyle(data, { size: 12, color: c, bold: true })};padding-bottom:6px;">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? " &mdash; " : ""}${data.company ? escapeHtml(data.company) : ""}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:4px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${data.calendlyUrl ? `<tr><td style="padding-top:8px;"><a href="${escapeHtml(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:8px 22px;background-color:#16a34a;color:#fff;text-decoration:none;font-size:13px;font-family:Arial,sans-serif;border-radius:4px;font-weight:bold;">Schedule a Call</a></td></tr>` : ""}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
  </tr>
</table>`;
}

function generateMedical(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor !== "#2563eb" ? data.primaryColor : "#0d9488";
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const photoSize = data.photoSize ?? 72;
  const photoShape = data.photoShape ?? "circle";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "square" ? "0" : "8px";
  const photoPosition = data.photoPosition ?? "left";

  let photoCell2 = "";
  if (data.photoUrl) {
    const src = resolvePhotoSrc(data, options);
    const paddingStyle = photoPosition === "right" ? "padding-left:16px;" : "padding-right:16px;";
    photoCell2 = `<td style="vertical-align:top;${paddingStyle}"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;border:2px solid ${c};" /></td>`;
  }

  const contact = orderedContact(data, `<span style="color:#d1d5db;padding:0 7px;">·</span>`, c, "#333");

  const contentTd = `<td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 17, color: "#1a1a1a", bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 12, color: c, bold: true })};padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="${companyStyle(data, { size: 12, color: "#555" })};padding-bottom:6px;">${escapeHtml(data.company)}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#1a1a1a;border-top:3px solid ${c};">
  <tr><td colspan="2" style="height:10px;"></td></tr>
  <tr>
    ${photoPosition === "right" ? contentTd + photoCell2 : photoCell2 + contentTd}
  </tr>
</table>`;
}

function generateLegal(data: SignatureData, options?: GenerateOptions): string {
  // Custom layout: stacked T/E/W/A labels — intentionally not using orderedContact()
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Georgia,'Times New Roman',serif");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 72, "2px", options)
    : photoCell(data, 72, "2px", options);

  const contentTd = `<td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 16, color: "#1a1a1a", bold: true })};letter-spacing:2px;text-transform:uppercase;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:10px;font-weight:normal;letter-spacing:0;font-style:italic;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 12, color: c, italic: true })};padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="${companyStyle(data, { size: 13, color: "#1a1a1a", bold: true })};padding-bottom:7px;">${escapeHtml(data.company)}</td></tr>` : ""}
        <tr><td style="border-top:2px solid #334155;padding-top:8px;">
          <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;font-family:Arial,Helvetica,sans-serif;color:#555;">
            ${(() => {
              const legalOrder = data.contactOrder ?? ["phone", "email", "website"];
              const legalFieldRows: Record<string, string> = {
                phone: data.phone ? `<tr><td style="padding-bottom:3px;"><span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;font-weight:bold;">T&nbsp;</span><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#333;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : "",
                email: data.email ? `<tr><td style="padding-bottom:3px;"><span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;font-weight:bold;">E&nbsp;</span><a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>` : "",
                website: data.website ? `<tr><td style="padding-bottom:3px;"><span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;font-weight:bold;">W&nbsp;</span><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : "",
                address: data.address ? `<tr><td style="color:#888;"><span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;font-weight:bold;">A&nbsp;</span>${escapeHtml(data.address)}</td></tr>` : "",
              };
              return [...legalOrder, ...(!legalOrder.includes("address") ? ["address"] : [])]
                .map((k) => legalFieldRows[k] ?? "").filter(Boolean).join("\n            ");
            })()}
          </table>
        </td></tr>
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#1a1a1a;">
  <tr>
    ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
  </tr>
  <tr><td colspan="2" style="border-bottom:3px solid #334155;padding-top:10px;"></td></tr>
</table>`;
}

function generateAcademic(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const contact = orderedContact(data, `<span style="color:#d1d5db;padding:0 8px;">·</span>`, c, "#555");

  const photoPosition = data.photoPosition ?? "left";
  const photo = photoPosition === "right"
    ? photoCellRight(data, 68, "4px", options)
    : photoCell(data, 68, "4px", options);

  const contentTd = `<td style="vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 18, color: "#1e3a5f", bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 12, color: c, italic: true })};padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="${companyStyle(data, { size: 13, color: "#1e3a5f", bold: true })}">${escapeHtml(data.company)}</td></tr>` : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photo : photo + contentTd}
  </tr>
  <tr><td colspan="2" style="border-top:1px solid #cbd5e1;padding-top:8px;">
    <table cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
      ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
      ${socialLinks(data)}
      ${calendlyButton(data, c)}
      ${ctaBanner(data)}
      ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
      ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
    </table>
  </td></tr>
</table>`;
}

function generateRealtor(data: SignatureData, options?: GenerateOptions): string {
  // Custom layout: bold phone + email inline, website on separate row — intentionally not using orderedContact()
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const photoSize = data.photoSize ?? 100;
  const photoShape = data.photoShape ?? "rounded";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "rounded" ? "8px" : photoShape === "square" ? "0" : "8px";
  const photoPosition = data.photoPosition ?? "left";

  let photoCell2 = "";
  if (data.photoUrl) {
    const src = resolvePhotoSrc(data, options);
    const paddingStyle = photoPosition === "right" ? "padding-left:18px;" : "padding-right:18px;";
    photoCell2 = `<td style="vertical-align:top;${paddingStyle}"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;border:3px solid ${c};" /></td>`;
  }

  const contentTd = `<td style="vertical-align:top;border-left:4px solid ${c};padding-left:18px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 22, color: "#1a1a1a", bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:12px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 13, color: c, bold: true })};padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="${companyStyle(data, { size: 14, color: "#333", bold: true })};padding-bottom:7px;">${escapeHtml(data.company)}</td></tr>` : ""}
        ${(() => {
          const realtorOrder = data.contactOrder ?? ["phone", "email", "website"];
          const realtorFieldMap: Record<string, string> = {
            phone: data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#1a1a1a;text-decoration:none;font-weight:bold;">${escapeHtml(data.phone)}</a>` : "",
            email: data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
          };
          const inlineFields = realtorOrder
            .filter((k) => k !== "website" && k !== "address")
            .map((k) => realtorFieldMap[k] ?? "").filter(Boolean);
          const inlineHtml = inlineFields.join(`<span style="color:#d1d5db;padding:0 10px;">|</span>`);
          const websiteRow = realtorOrder.includes("website") && data.website
            ? `<tr><td style="font-size:12px;padding-bottom:2px;"><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${a};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>`
            : "";
          const addressRow = data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${escapeHtml(data.address)}</td></tr>` : "";
          // Determine whether website row comes before or after address based on order
          const websiteBeforeAddress = !realtorOrder.includes("address") || realtorOrder.indexOf("website") < realtorOrder.indexOf("address");
          return `<tr><td style="font-size:13px;padding-bottom:3px;">${inlineHtml}</td></tr>\n        ${websiteBeforeAddress ? websiteRow + "\n        " + addressRow : addressRow + "\n        " + websiteRow}`;
        })()}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photoCell2 : photoCell2 + contentTd}
  </tr>
</table>`;
}

function generateInfluencer(data: SignatureData, options?: GenerateOptions): string {
  // Custom layout: email+website inline, phone on separate row below — intentionally not using orderedContact()
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const photoSize = data.photoSize ?? 85;
  const photoShape = data.photoShape ?? "circle";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "square" ? "0" : "8px";
  const photoPosition = data.photoPosition ?? "left";

  let photoCell2 = "";
  if (data.photoUrl) {
    const src = resolvePhotoSrc(data, options);
    const paddingStyle = photoPosition === "right" ? "padding-left:18px;" : "padding-right:18px;";
    photoCell2 = `<td style="vertical-align:top;${paddingStyle}"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;border:3px solid ${c};outline:3px solid ${a};outline-offset:2px;" /></td>`;
  }

  const bigSocials = [
    data.instagram ? socialLink(data.instagram, "instagram") : "",
    data.twitter ? socialLink(data.twitter, "twitter") : "",
    data.youtube ? socialLink(data.youtube, "youtube") : "",
    data.facebook ? socialLink(data.facebook, "facebook") : "",
  ].filter(Boolean).join("").replace(/width="20" height="20" style="width:20px;height:20px/g, `width="24" height="24" style="width:24px;height:24px`);

  const influencerOrder = data.contactOrder ?? ["phone", "email", "website"];
  const influencerFieldMap: Record<string, () => string> = {
    phone: () => data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    email: () => data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    website: () => data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
    address: () => data.address ? `<span style="color:#888;">${escapeHtml(data.address)}</span>` : "",
  };
  const influencerContactParts = [...influencerOrder, ...(!influencerOrder.includes("address") ? ["address"] : [])]
    .map((k) => influencerFieldMap[k]?.() ?? "").filter(Boolean);
  const contact = influencerContactParts.join(`<span style="color:#d1d5db;padding:0 8px;">·</span>`);

  const contentTd = `<td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 21, color: c, bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}</td></tr>
        ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 13, color: a, bold: true })};padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="${companyStyle(data, { size: 12, color: "#999" })};padding-bottom:6px;">@${escapeHtml(data.company)}</td></tr>` : ""}
        ${bigSocials ? `<tr><td style="padding-bottom:7px;">${bigSocials}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photoCell2 : photoCell2 + contentTd}
  </tr>
</table>`;
}

function generatePhotographer(data: SignatureData, options?: GenerateOptions): string {
  // Custom layout: email+phone in inline table cells, website on separate row — intentionally not using orderedContact()
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const photoSize = data.photoSize ?? 55;
  const photoShape = data.photoShape ?? "square";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "rounded" ? "8px" : "0";
  const photoPosition = data.photoPosition ?? "left";

  let photoCell2 = "";
  if (data.photoUrl) {
    const src = resolvePhotoSrc(data, options);
    const paddingStyle = photoPosition === "right" ? "padding-left:22px;" : "padding-right:22px;";
    photoCell2 = `<td style="vertical-align:top;${paddingStyle}"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;" /></td>`;
  }

  const contentTd = `<td style="vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="${nameStyle(data, { size: 18, color: "#1a1a1a", bold: false })};letter-spacing:1.5px;padding-bottom:2px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;color:#ccc;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="${titleStyle(data, { size: 11, color: "#aaa" })};letter-spacing:0.5px;padding-bottom:8px;">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? " &bull; " : ""}${data.company ? escapeHtml(data.company) : ""}</td></tr>` : ""}
        <tr><td style="border-top:1px solid #e5e7eb;padding-top:7px;">
          <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;">
            <tr>
              ${(() => {
                const photoOrder = data.contactOrder ?? ["phone", "email", "website"];
                const photoInlineMap: Record<string, string> = {
                  phone: data.phone ? `<td style="padding-right:14px;"><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#888;text-decoration:none;">${escapeHtml(data.phone)}</a></td>` : "",
                  email: data.email ? `<td style="padding-right:14px;"><a href="mailto:${escapeHtml(data.email)}" style="color:#666;text-decoration:none;">${escapeHtml(data.email)}</a></td>` : "",
                };
                return photoOrder.filter((k) => k !== "website" && k !== "address")
                  .map((k) => photoInlineMap[k] ?? "").filter(Boolean).join("\n              ");
              })()}
            </tr>
          </table>
        </td></tr>
        ${(() => {
          const photoOrder = data.contactOrder ?? ["phone", "email", "website"];
          const websiteRow = data.website ? `<tr><td style="font-size:12px;padding-top:3px;"><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:underline;font-style:italic;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : "";
          const addressRow = data.address ? `<tr><td style="font-size:11px;color:#ccc;padding-top:3px;">${escapeHtml(data.address)}</td></tr>` : "";
          const websiteBeforeAddress = !photoOrder.includes("address") || !photoOrder.includes("website") || photoOrder.indexOf("website") < photoOrder.indexOf("address");
          return websiteBeforeAddress ? websiteRow + "\n        " + addressRow : addressRow + "\n        " + websiteRow;
        })()}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:14px;color:#333;">
  <tr>
    ${photoPosition === "right" ? contentTd + photoCell2 : photoCell2 + contentTd}
  </tr>
</table>`;
}

function generateDark(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const photoSize = data.photoSize ?? 76;
  const photoShape = data.photoShape ?? "rounded";
  const photoBr = photoShape === "circle" ? "50%" : photoShape === "square" ? "0" : "8px";
  const photoPosition = data.photoPosition ?? "left";

  let photoCell2 = "";
  if (data.photoUrl) {
    const src = resolvePhotoSrc(data, options);
    const paddingStyle = photoPosition === "right" ? "padding-left:18px;" : "padding-right:18px;";
    photoCell2 = `<td style="vertical-align:middle;${paddingStyle}"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="${photoSize}" height="${photoSize}" style="width:${photoSize}px;height:${photoSize}px;border-radius:${photoBr};object-fit:cover;display:block;border:2px solid rgba(255,255,255,0.2);" /></td>`;
  }

  const contact = orderedContact(data, `<span style="color:rgba(255,255,255,0.2);padding:0 8px;">|</span>`, c, "rgba(255,255,255,0.7)");

  const contentTd = `<td style="vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr><td style="${nameStyle(data, { size: 19, color: "#f1f5f9", bold: true })};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:rgba(255,255,255,0.35);">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
            ${data.jobTitle ? `<tr><td style="${titleStyle(data, { size: 12, color: a, bold: true })};padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
            ${data.company ? `<tr><td style="${companyStyle(data, { size: 12, color: "rgba(255,255,255,0.45)" })};padding-bottom:8px;">${escapeHtml(data.company)}</td></tr>` : ""}
            <tr><td style="font-size:12px;padding-bottom:3px;">${contact}</td></tr>
            ${data.address ? `<tr><td style="font-size:11px;color:rgba(255,255,255,0.35);padding-bottom:4px;">${escapeHtml(data.address)}</td></tr>` : ""}
            ${socialLinks(data)}
            ${data.calendlyUrl ? `<tr><td style="padding-top:8px;"><a href="${escapeHtml(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:7px 18px;background-color:${c};color:#111827;text-decoration:none;font-size:12px;font-family:Arial,sans-serif;border-radius:4px;font-weight:bold;">Book a Meeting</a></td></tr>` : ""}
          </table>
        </td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};background-color:#111827;border-radius:8px;">
  <tr><td style="padding:18px 22px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        ${photoPosition === "right" ? contentTd + photoCell2 : photoCell2 + contentTd}
      </tr>
    </table>
    <table cellpadding="0" cellspacing="0" border="0">
      ${ctaBanner(data)}
      ${disclaimerRow(data)}
      ${!isPro ? `<tr><td style="padding-top:8px;"><a href="https://neatstamp.com?ref=sig" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,0.2);font-size:10px;font-family:Arial,sans-serif;text-decoration:none;">Made with NeatStamp</a></td></tr>` : ""}
      ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
    </table>
  </td></tr>
</table>`;
}

function generateSimple(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const font = ff(data, "Arial,Helvetica,sans-serif");

  const contact = orderedContact(data, `<span style="color:#d1d5db;padding:0 5px;">&middot;</span>`, c, "#555");

  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:${font};font-size:13px;color:#333;">
  <tr><td style="white-space:nowrap;padding-bottom:2px;">
    <strong style="${nameStyle(data, { size: 14, color: "#1a1a1a", bold: true })}">${escapeHtml(data.fullName)}</strong>${data.pronouns ? ` <span style="font-size:11px;color:#bbb;">(${escapeHtml(data.pronouns)})</span>` : ""}${data.jobTitle ? ` <span style="color:#d1d5db;">|</span> <span style="${titleStyle(data, { size: 13, color: c })}">${escapeHtml(data.jobTitle)}</span>` : ""}${data.company ? ` <span style="color:#d1d5db;">|</span> <span style="${companyStyle(data, { size: 13, color: "#555" })}">${escapeHtml(data.company)}</span>` : ""}
  </td></tr>
  <tr><td style="font-size:12px;padding-bottom:3px;color:#555;">${contact}</td></tr>
  ${data.address ? `<tr><td style="font-size:11px;color:#bbb;padding-bottom:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
  ${socialLinks(data)}
  ${calendlyButton(data, c)}
  ${ctaBanner(data)}
  ${disclaimerRow(data)}
        ${!isPro ? neatstampBranding() : ""}
  ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
</table>`;
}

// ============================================================
// MAIN EXPORT
// ============================================================

const templateGenerators: Record<
  TemplateName,
  (data: SignatureData, options?: GenerateOptions) => string
> = {
  minimal: generateMinimal,
  modern: generateModern,
  corporate: generateCorporate,
  creative: generateCreative,
  bold: generateBold,
  elegant: generateElegant,
  startup: generateStartup,
  compact: generateCompact,
  executive: generateExecutive,
  gradient: generateGradient,
  developer: generateDeveloper,
  sales: generateSales,
  medical: generateMedical,
  legal: generateLegal,
  academic: generateAcademic,
  realtor: generateRealtor,
  influencer: generateInfluencer,
  photographer: generatePhotographer,
  dark: generateDark,
  simple: generateSimple,
};

// Preview HTML — always shows the full editable signature (for the editor preview)
export function generateSignatureHtml(
  data: SignatureData,
  options?: GenerateOptions
): string {
  const generator = templateGenerators[data.template] || generateMinimal;
  let html = generator(data, options);

  // Background color wrapper — the only post-processing still needed
  if (data.backgroundColor && data.backgroundColor !== "#ffffff") {
    const textColor = data.textOnDark ? "#ffffff" : "#333333";
    html = `<table cellpadding="0" cellspacing="0" border="0" style="background-color:${escapeHtml(data.backgroundColor)};border-radius:8px;"><tr><td style="padding:16px 20px;color:${textColor};">${html}</td></tr></table>`;
    if (data.textOnDark) {
      html = html.replace(/color:#1a1a1a/g, "color:#ffffff");
      html = html.replace(/color:#333/g, "color:#ffffff");
      html = html.replace(/color:#555/g, "color:rgba(255,255,255,0.85)");
      html = html.replace(/color:#666/g, "color:rgba(255,255,255,0.8)");
      html = html.replace(/color:#999/g, "color:rgba(255,255,255,0.5)");
      html = html.replace(/color:#aaa/g, "color:rgba(255,255,255,0.4)");
    }
  }

  return html;
}

// Copy HTML — what the user actually gets when they click "Copy"
// Free users: single image. Pro users: full HTML.
export function generateCopyHtml(
  data: SignatureData,
  options?: GenerateOptions
): string {
  const isPro = options?.plan === "pro" || options?.plan === "team";

  // Free users: if imageUrl is provided (uploaded to R2), output is a single <img> tag
  if (!isPro && options?.signatureId && options?.imageUrl) {
    const trackUrl = `https://neatstamp.com/api/images/${encodeURIComponent(options.signatureId)}/track`;

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;">
  <tr>
    <td>
      <a href="https://neatstamp.com?ref=sig&id=${encodeURIComponent(options.signatureId)}" target="_blank" rel="noopener noreferrer">
        <img src="${escapeHtml(options.imageUrl)}" alt="Email signature — ${escapeHtml(data.fullName)}" width="500" style="width:500px;max-width:100%;height:auto;display:block;border:0;" />
      </a>
    </td>
  </tr>
  <tr>
    <td><img src="${trackUrl}" width="1" height="1" style="width:1px;height:1px;display:block;" alt="" /></td>
  </tr>
</table>`;
  }

  // Free users without imageUrl: fall back to HTML with branding
  if (!isPro && options?.signatureId) {
    const generator = templateGenerators[data.template] || generateMinimal;
    return generator(data, options);
  }

  // Pro/Team users: full HTML
  const generator = templateGenerators[data.template] || generateMinimal;
  return generator(data, options);
}
