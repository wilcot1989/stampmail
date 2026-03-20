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

function photoCell(
  data: SignatureData,
  size: number,
  borderRadius: string,
  options?: GenerateOptions
): string {
  if (!data.photoUrl) return "";

  // For free users with a signatureId, route photo through our CDN
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let src = escapeHtml(data.photoUrl);
  if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
    src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
  }

  return `<td style="vertical-align:top;padding-right:16px;">
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

// ============================================================
// TEMPLATES
// ============================================================

function generateMinimal(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#ccc;padding:0 6px;">·</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    ${photoCell(data, 70, "50%", options)}
    <td style="vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:17px;font-weight:bold;color:#1a1a1a;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#999;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="font-size:12px;color:#666;padding-bottom:6px;">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? " &mdash; " : ""}${data.company ? `<span style="color:#999;">${escapeHtml(data.company)}</span>` : ""}</td></tr>` : ""}
        <tr><td style="border-top:1px solid #e5e7eb;padding-top:7px;font-size:12px;color:#555;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-top:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateModern(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 8px;">|</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    ${photoCell(data, 75, "8px", options)}
    <td style="vertical-align:top;border-left:4px solid ${c};padding-left:16px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:18px;font-weight:bold;color:${c};padding-bottom:1px;">${escapeHtml(data.fullName)}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="font-size:12px;padding-bottom:7px;">${data.jobTitle ? `<span style="color:${a};font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">${escapeHtml(data.jobTitle)}</span>` : ""}${data.jobTitle && data.company ? `<span style="color:#d1d5db;"> &nbsp;|&nbsp; </span>` : ""}${data.company ? `<span style="color:#666;">${escapeHtml(data.company)}</span>` : ""}</td></tr>` : ""}
        ${data.pronouns ? `<tr><td style="font-size:11px;color:#999;padding-bottom:5px;">${escapeHtml(data.pronouns)}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;padding-bottom:4px;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateCorporate(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;border-top:3px solid ${c};">
  <tr><td colspan="2" style="height:10px;"></td></tr>
  <tr>
    ${photoCell(data, 65, "4px", options)}
    <td style="vertical-align:top;padding-left:${data.photoUrl ? "0" : "0"};">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:17px;font-weight:bold;color:#1a1a1a;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#999;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="font-size:12px;padding-bottom:7px;">${data.jobTitle ? `<span style="color:${c};font-weight:600;">${escapeHtml(data.jobTitle)}</span>` : ""}${data.jobTitle && data.company ? `<span style="color:#ccc;"> &nbsp;&bull;&nbsp; </span>` : ""}${data.company ? `<span style="color:#444;font-weight:600;">${escapeHtml(data.company)}</span>` : ""}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;">
          <table cellpadding="0" cellspacing="0" border="0">
            ${data.phone ? `<tr><td style="padding-bottom:2px;white-space:nowrap;"><span style="color:#999;font-weight:bold;font-size:10px;letter-spacing:0.5px;">T&nbsp;</span><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#444;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : ""}
            ${data.email ? `<tr><td style="padding-bottom:2px;white-space:nowrap;"><span style="color:#999;font-weight:bold;font-size:10px;letter-spacing:0.5px;">E&nbsp;</span><a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>` : ""}
            ${data.website ? `<tr><td style="padding-bottom:2px;white-space:nowrap;"><span style="color:#999;font-weight:bold;font-size:10px;letter-spacing:0.5px;">W&nbsp;</span><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : ""}
            ${data.address ? `<tr><td style="padding-bottom:2px;color:#888;"><span style="color:#999;font-weight:bold;font-size:10px;letter-spacing:0.5px;">A&nbsp;</span>${escapeHtml(data.address)}</td></tr>` : ""}
          </table>
        </td></tr>
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateCreative(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let photoPart = "";
  if (data.photoUrl) {
    let src = escapeHtml(data.photoUrl);
    if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
      src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
    }
    photoPart = `<td style="vertical-align:top;padding-right:18px;text-align:center;">
      <img src="${src}" alt="${escapeHtml(data.fullName)}" width="90" height="90" style="width:90px;height:90px;border-radius:50%;object-fit:cover;display:block;border:3px solid ${c};" />
      ${data.company ? `<p style="margin:5px 0 0;font-size:10px;font-weight:bold;color:${a};text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;width:90px;text-align:center;">${escapeHtml(data.company)}</p>` : ""}
    </td>`;
  }
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    ${photoPart}
    <td style="vertical-align:top;border-left:2px dashed ${a};padding-left:18px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:20px;font-weight:bold;color:${c};padding-bottom:2px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="font-size:13px;color:#555;padding-bottom:8px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        <tr><td style="font-size:12px;">
          ${data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">&#9993;&nbsp;${escapeHtml(data.email)}</a>` : ""}
          ${data.email && data.phone ? `&nbsp;&nbsp;` : ""}
          ${data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">&#9742;&nbsp;${escapeHtml(data.phone)}</a>` : ""}
        </td></tr>
        ${data.website ? `<tr><td style="font-size:12px;padding-top:2px;"><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">&#127760;&nbsp;${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : ""}
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-top:3px;">&#128205;&nbsp;${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, a)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateBold(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let photoPart = "";
  if (data.photoUrl) {
    let src = escapeHtml(data.photoUrl);
    if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
      src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
    }
    photoPart = `<td style="vertical-align:middle;padding-right:16px;"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="75" height="75" style="width:75px;height:75px;border-radius:8px;object-fit:cover;display:block;border:2px solid rgba(255,255,255,0.4);" /></td>`;
  }
  const contactInline = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:#fff;text-decoration:none;opacity:0.9;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#fff;text-decoration:none;opacity:0.85;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:#fff;text-decoration:none;opacity:0.9;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="opacity:0.4;padding:0 8px;">|</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;background-color:${c};border-radius:8px;">
  <tr><td style="padding:18px 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        ${photoPart}
        <td style="vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr><td style="font-size:20px;font-weight:bold;color:#fff;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;opacity:0.6;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
            ${(data.jobTitle || data.company) ? `<tr><td style="font-size:12px;color:rgba(255,255,255,0.8);padding-bottom:8px;">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? " &nbsp;|&nbsp; " : ""}${data.company ? escapeHtml(data.company) : ""}</td></tr>` : ""}
            <tr><td style="font-size:12px;padding-bottom:4px;">${contactInline}</td></tr>
            ${data.address ? `<tr><td style="font-size:11px;color:rgba(255,255,255,0.6);padding-bottom:4px;">${escapeHtml(data.address)}</td></tr>` : ""}
            ${socialLinks(data)}
            ${data.calendlyUrl ? `<tr><td style="padding-top:10px;"><a href="${escapeHtml(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:7px 18px;background:#fff;color:${c};text-decoration:none;font-size:12px;font-family:Arial,sans-serif;border-radius:4px;font-weight:bold;">Book a Meeting</a></td></tr>` : ""}
          </table>
        </td>
      </tr>
    </table>
    <table cellpadding="0" cellspacing="0" border="0">
      ${ctaBanner(data)}
      ${!isPro ? `<tr><td style="padding-top:8px;"><a href="https://neatstamp.com?ref=sig" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,0.35);font-size:10px;font-family:Arial,sans-serif;text-decoration:none;">Made with NeatStamp</a></td></tr>` : ""}
      ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
    </table>
  </td></tr>
</table>`;
}

function generateElegant(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;font-family:Arial,sans-serif;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#666;text-decoration:none;font-family:Arial,sans-serif;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;font-family:Arial,sans-serif;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#ccc;padding:0 6px;">&mdash;</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#333;">
  <tr>
    ${photoCell(data, 70, "50%", options)}
    <td style="vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:18px;font-weight:bold;color:#1a1a1a;letter-spacing:0.5px;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;font-style:italic;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="font-size:12px;color:${c};font-style:italic;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="font-size:11px;color:#777;letter-spacing:1.5px;text-transform:uppercase;padding-bottom:7px;">${escapeHtml(data.company)}</td></tr>` : ""}
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
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateStartup(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let avatarCell = "";
  if (data.photoUrl) {
    let src = escapeHtml(data.photoUrl);
    if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
      src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
    }
    avatarCell = `<td style="vertical-align:middle;padding-right:12px;"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="44" height="44" style="width:44px;height:44px;border-radius:50%;object-fit:cover;display:block;" /></td>`;
  }
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 7px;">·</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333;">
  <tr>
    ${avatarCell}
    <td style="vertical-align:middle;">
      <span style="font-size:15px;font-weight:bold;color:#1a1a1a;">${escapeHtml(data.fullName)}</span>${data.pronouns ? ` <span style="font-size:11px;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}
      ${(data.jobTitle || data.company) ? `&nbsp;<span style="color:#d1d5db;">|</span>&nbsp;<span style="font-size:12px;color:${c};">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? `<span style="color:#aaa;"> @ </span>` : ""}${data.company ? escapeHtml(data.company) : ""}</span>` : ""}
    </td>
  </tr>
  <tr><td colspan="2" style="border-top:1px solid #f0f0f0;padding-top:7px;font-size:12px;color:#555;">${contact}</td></tr>
  ${data.address ? `<tr><td colspan="2" style="font-size:11px;color:#aaa;padding-top:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
  ${socialLinks(data)}
  ${data.calendlyUrl ? `<tr><td colspan="2" style="padding-top:8px;"><a href="${escapeHtml(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:5px 14px;background-color:${c};color:#fff;text-decoration:none;font-size:11px;font-family:Arial,sans-serif;border-radius:12px;font-weight:bold;">Book a Meeting</a></td></tr>` : ""}
  ${ctaBanner(data)}
  ${!isPro ? neatstampBranding() : ""}
  ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
</table>`;
}

function generateCompact(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 5px;">&middot;</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333;">
  <tr><td style="white-space:nowrap;">
    <strong style="color:#1a1a1a;">${escapeHtml(data.fullName)}</strong>${data.pronouns ? ` <span style="font-size:11px;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}${data.jobTitle ? ` <span style="color:#ccc;">|</span> <span style="color:${c};">${escapeHtml(data.jobTitle)}</span>` : ""}${data.company ? ` <span style="color:#ccc;">|</span> <span style="color:#555;">${escapeHtml(data.company)}</span>` : ""}
  </td></tr>
  <tr><td style="font-size:12px;padding-top:3px;color:#555;">${contact}</td></tr>
  ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-top:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
  ${calendlyButton(data, c)}
  ${ctaBanner(data)}
  ${!isPro ? neatstampBranding() : ""}
  ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
</table>`;
}

function generateExecutive(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#444;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 8px;">|</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    <td style="background-color:#1e293b;padding:16px 20px;border-radius:4px 4px 0 0;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${photoCell(data, 80, "6px", options)}
          <td style="vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr><td style="font-size:20px;font-weight:bold;color:#fff;padding-bottom:2px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:rgba(255,255,255,0.45);">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
              ${data.jobTitle ? `<tr><td style="font-size:13px;color:${a};font-weight:700;letter-spacing:0.3px;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
              ${data.company ? `<tr><td style="font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:1px;text-transform:uppercase;">${escapeHtml(data.company)}</td></tr>` : ""}
            </table>
          </td>
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
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${a};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#cbd5e1;padding:0 7px;">|</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    <td style="width:8px;background-color:${c};padding:0;font-size:0;line-height:0;">&nbsp;</td>
    <td style="width:4px;background-color:${a};padding:0;font-size:0;line-height:0;">&nbsp;</td>
    <td style="padding:14px 18px;background-color:#f8fafc;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${photoCell(data, 70, "50%", options)}
          <td style="vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr><td style="font-size:19px;font-weight:bold;color:${c};padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#999;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
              ${(data.jobTitle || data.company) ? `<tr><td style="font-size:12px;padding-bottom:7px;">${data.jobTitle ? `<span style="color:${a};font-weight:700;">${escapeHtml(data.jobTitle)}</span>` : ""}${data.jobTitle && data.company ? `<span style="color:#cbd5e1;padding:0 6px;">·</span>` : ""}${data.company ? `<span style="color:#666;">${escapeHtml(data.company)}</span>` : ""}</td></tr>` : ""}
              <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
              ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
              ${socialLinks(data)}
              ${calendlyButton(data, c)}
              ${ctaBanner(data)}
              ${!isPro ? neatstampBranding() : ""}
              ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function generateDeveloper(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:'Courier New',Courier,monospace;font-size:13px;color:#334155;border-bottom:2px solid #e2e8f0;">
  <tr>
    ${photoCell(data, 64, "4px", options)}
    <td style="vertical-align:top;padding-bottom:10px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:15px;font-weight:bold;color:${c};padding-bottom:1px;"><span style="color:#94a3b8;">// </span>${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#94a3b8;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="font-size:11px;color:${a};padding-bottom:1px;"><span style="color:#94a3b8;">const </span><span style="color:#334155;">role</span><span style="color:#94a3b8;"> = </span>'${escapeHtml(data.jobTitle)}${data.company ? ` @ ${escapeHtml(data.company)}` : ""}'</td></tr>` : ""}
        <tr><td style="padding-top:6px;">
          <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;">
            ${data.email ? `<tr><td style="padding-bottom:2px;color:#64748b;"><span style="color:#94a3b8;">&gt; </span><a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>` : ""}
            ${data.phone ? `<tr><td style="padding-bottom:2px;color:#64748b;"><span style="color:#94a3b8;">&gt; </span><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#475569;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : ""}
            ${data.website ? `<tr><td style="padding-bottom:2px;color:#64748b;"><span style="color:#94a3b8;">&gt; </span><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : ""}
            ${data.github ? `<tr><td style="padding-bottom:2px;color:#64748b;"><span style="color:#94a3b8;">&gt; </span><a href="${escapeHtml(data.github.startsWith("http") ? data.github : `https://${data.github}`)}" target="_blank" rel="noopener noreferrer" style="color:${a};text-decoration:none;">github/${escapeHtml(data.github.replace(/^https?:\/\/(www\.)?github\.com\//, ""))}</a></td></tr>` : ""}
            ${data.address ? `<tr><td style="padding-bottom:2px;color:#94a3b8;"><span style="color:#cbd5e1;"># </span>${escapeHtml(data.address)}</td></tr>` : ""}
          </table>
        </td></tr>
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateSales(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 7px;">·</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    ${photoCell(data, 72, "50%", options)}
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        ${data.phone ? `<tr><td style="font-size:18px;font-weight:bold;color:#16a34a;padding-bottom:3px;"><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#16a34a;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : ""}
        <tr><td style="font-size:16px;font-weight:bold;color:#1a1a1a;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="font-size:12px;color:${c};font-weight:600;padding-bottom:6px;">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? " &mdash; " : ""}${data.company ? escapeHtml(data.company) : ""}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:4px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${data.calendlyUrl ? `<tr><td style="padding-top:8px;"><a href="${escapeHtml(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:8px 22px;background-color:#16a34a;color:#fff;text-decoration:none;font-size:13px;font-family:Arial,sans-serif;border-radius:4px;font-weight:bold;">Schedule a Call</a></td></tr>` : ""}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateMedical(data: SignatureData, options?: GenerateOptions): string {
  const c = "#0d9488";
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let photoCell2 = "";
  if (data.photoUrl) {
    let src = escapeHtml(data.photoUrl);
    if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
      src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
    }
    photoCell2 = `<td style="vertical-align:top;padding-right:16px;"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="72" height="72" style="width:72px;height:72px;border-radius:50%;object-fit:cover;display:block;border:2px solid ${c};" /></td>`;
  }
  const contact = [
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#333;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 7px;">·</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;border-top:3px solid ${c};">
  <tr><td colspan="2" style="height:10px;"></td></tr>
  <tr>
    ${photoCell2}
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:17px;font-weight:bold;color:#1a1a1a;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="font-size:12px;color:${c};font-weight:600;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="font-size:12px;color:#555;padding-bottom:6px;">${escapeHtml(data.company)}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateLegal(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#1a1a1a;">
  <tr>
    ${photoCell(data, 72, "2px", options)}
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:16px;font-weight:bold;color:#1a1a1a;letter-spacing:2px;text-transform:uppercase;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:10px;font-weight:normal;letter-spacing:0;font-style:italic;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="font-size:12px;color:${c};font-style:italic;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="font-size:13px;color:#1a1a1a;font-weight:bold;padding-bottom:7px;">${escapeHtml(data.company)}</td></tr>` : ""}
        <tr><td style="border-top:2px solid #334155;padding-top:8px;">
          <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;font-family:Arial,Helvetica,sans-serif;color:#555;">
            ${data.phone ? `<tr><td style="padding-bottom:3px;"><span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;font-weight:bold;">T&nbsp;</span><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#333;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : ""}
            ${data.email ? `<tr><td style="padding-bottom:3px;"><span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;font-weight:bold;">E&nbsp;</span><a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>` : ""}
            ${data.website ? `<tr><td style="padding-bottom:3px;"><span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;font-weight:bold;">W&nbsp;</span><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : ""}
            ${data.address ? `<tr><td style="color:#888;"><span style="color:#94a3b8;font-size:10px;letter-spacing:0.5px;font-weight:bold;">A&nbsp;</span>${escapeHtml(data.address)}</td></tr>` : ""}
          </table>
        </td></tr>
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
  <tr><td colspan="2" style="border-bottom:3px solid #334155;padding-top:10px;"></td></tr>
</table>`;
}

function generateAcademic(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${a};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 8px;">·</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    ${photoCell(data, 68, "4px", options)}
    <td style="vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:18px;font-weight:bold;color:#1e3a5f;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="font-size:12px;color:${c};font-style:italic;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="font-size:13px;color:#1e3a5f;font-weight:bold;">${escapeHtml(data.company)}</td></tr>` : ""}
      </table>
    </td>
  </tr>
  <tr><td colspan="2" style="border-top:1px solid #cbd5e1;padding-top:8px;">
    <table cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
      ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
      ${socialLinks(data)}
      ${calendlyButton(data, c)}
      ${ctaBanner(data)}
      ${!isPro ? neatstampBranding() : ""}
      ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
    </table>
  </td></tr>
</table>`;
}

function generateRealtor(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let photoCell2 = "";
  if (data.photoUrl) {
    let src = escapeHtml(data.photoUrl);
    if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
      src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
    }
    photoCell2 = `<td style="vertical-align:top;padding-right:18px;"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="100" height="100" style="width:100px;height:100px;border-radius:10px;object-fit:cover;display:block;border:3px solid ${c};" /></td>`;
  }
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    ${photoCell2}
    <td style="vertical-align:top;border-left:4px solid ${c};padding-left:18px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:22px;font-weight:bold;color:#1a1a1a;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:12px;font-weight:normal;color:#aaa;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${data.jobTitle ? `<tr><td style="font-size:13px;color:${c};font-weight:700;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="font-size:14px;color:#333;font-weight:700;padding-bottom:7px;">${escapeHtml(data.company)}</td></tr>` : ""}
        <tr><td style="font-size:13px;padding-bottom:3px;">
          ${data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#1a1a1a;text-decoration:none;font-weight:bold;">${escapeHtml(data.phone)}</a>` : ""}
          ${data.phone && data.email ? `<span style="color:#d1d5db;padding:0 10px;">|</span>` : ""}
          ${data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : ""}
        </td></tr>
        ${data.website ? `<tr><td style="font-size:12px;padding-bottom:2px;"><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${a};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : ""}
        ${data.address ? `<tr><td style="font-size:11px;color:#aaa;padding-bottom:2px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateInfluencer(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let photoCell2 = "";
  if (data.photoUrl) {
    let src = escapeHtml(data.photoUrl);
    if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
      src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
    }
    photoCell2 = `<td style="vertical-align:top;padding-right:18px;"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="85" height="85" style="width:85px;height:85px;border-radius:50%;object-fit:cover;display:block;border:3px solid ${c};outline:3px solid ${a};outline-offset:2px;" /></td>`;
  }
  const bigSocials = [
    data.instagram ? socialLink(data.instagram, "instagram") : "",
    data.twitter ? socialLink(data.twitter, "twitter") : "",
    data.youtube ? socialLink(data.youtube, "youtube") : "",
    data.facebook ? socialLink(data.facebook, "facebook") : "",
  ].filter(Boolean).join("").replace(/width="20" height="20" style="width:20px;height:20px/g, `width="24" height="24" style="width:24px;height:24px`);
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 8px;">·</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    ${photoCell2}
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:21px;font-weight:bold;color:${c};padding-bottom:1px;">${escapeHtml(data.fullName)}</td></tr>
        ${data.jobTitle ? `<tr><td style="font-size:13px;color:${a};font-weight:700;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
        ${data.company ? `<tr><td style="font-size:12px;color:#999;padding-bottom:6px;">@${escapeHtml(data.company)}</td></tr>` : ""}
        ${bigSocials ? `<tr><td style="padding-bottom:7px;">${bigSocials}</td></tr>` : ""}
        <tr><td style="font-size:12px;color:#555;padding-bottom:3px;">${contact}</td></tr>
        ${data.phone ? `<tr><td style="font-size:12px;color:#555;padding-bottom:2px;"><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>` : ""}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generatePhotographer(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let photoCell2 = "";
  if (data.photoUrl) {
    let src = escapeHtml(data.photoUrl);
    if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
      src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
    }
    photoCell2 = `<td style="vertical-align:top;padding-right:22px;"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="55" height="55" style="width:55px;height:55px;border-radius:0;object-fit:cover;display:block;" /></td>`;
  }
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    ${photoCell2}
    <td style="vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:18px;font-weight:300;color:#1a1a1a;letter-spacing:1.5px;padding-bottom:2px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;color:#ccc;">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
        ${(data.jobTitle || data.company) ? `<tr><td style="font-size:11px;color:#aaa;letter-spacing:0.5px;padding-bottom:8px;">${data.jobTitle ? escapeHtml(data.jobTitle) : ""}${data.jobTitle && data.company ? " &bull; " : ""}${data.company ? escapeHtml(data.company) : ""}</td></tr>` : ""}
        <tr><td style="border-top:1px solid #e5e7eb;padding-top:7px;">
          <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;">
            <tr>
              ${data.email ? `<td style="padding-right:14px;"><a href="mailto:${escapeHtml(data.email)}" style="color:#666;text-decoration:none;">${escapeHtml(data.email)}</a></td>` : ""}
              ${data.phone ? `<td style="padding-right:14px;"><a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#888;text-decoration:none;">${escapeHtml(data.phone)}</a></td>` : ""}
            </tr>
          </table>
        </td></tr>
        ${data.website ? `<tr><td style="font-size:12px;padding-top:3px;"><a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:underline;font-style:italic;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a></td></tr>` : ""}
        ${data.address ? `<tr><td style="font-size:11px;color:#ccc;padding-top:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
        ${socialLinks(data)}
        ${calendlyButton(data, c)}
        ${ctaBanner(data)}
        ${!isPro ? neatstampBranding() : ""}
        ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
      </table>
    </td>
  </tr>
</table>`;
}

function generateDark(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const a = data.accentColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  let photoCell2 = "";
  if (data.photoUrl) {
    let src = escapeHtml(data.photoUrl);
    if (!isPro && options?.signatureId && !data.photoUrl.startsWith("https://neatstamp.com")) {
      src = `https://neatstamp.com/api/images/${escapeHtml(options.signatureId)}/photo`;
    }
    photoCell2 = `<td style="vertical-align:middle;padding-right:18px;"><img src="${src}" alt="${escapeHtml(data.fullName)}" width="76" height="76" style="width:76px;height:76px;border-radius:8px;object-fit:cover;display:block;border:2px solid rgba(255,255,255,0.2);" /></td>`;
  }
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:rgba(255,255,255,0.7);text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:rgba(255,255,255,0.2);padding:0 8px;">|</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;background-color:#111827;border-radius:8px;">
  <tr><td style="padding:18px 22px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        ${photoCell2}
        <td style="vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr><td style="font-size:19px;font-weight:bold;color:#f1f5f9;padding-bottom:1px;">${escapeHtml(data.fullName)}${data.pronouns ? ` <span style="font-size:11px;font-weight:normal;color:rgba(255,255,255,0.35);">(${escapeHtml(data.pronouns)})</span>` : ""}</td></tr>
            ${data.jobTitle ? `<tr><td style="font-size:12px;color:${a};font-weight:700;padding-bottom:1px;">${escapeHtml(data.jobTitle)}</td></tr>` : ""}
            ${data.company ? `<tr><td style="font-size:12px;color:rgba(255,255,255,0.45);padding-bottom:8px;">${escapeHtml(data.company)}</td></tr>` : ""}
            <tr><td style="font-size:12px;padding-bottom:3px;">${contact}</td></tr>
            ${data.address ? `<tr><td style="font-size:11px;color:rgba(255,255,255,0.35);padding-bottom:4px;">${escapeHtml(data.address)}</td></tr>` : ""}
            ${socialLinks(data)}
            ${data.calendlyUrl ? `<tr><td style="padding-top:8px;"><a href="${escapeHtml(data.calendlyUrl.startsWith("http") ? data.calendlyUrl : `https://${data.calendlyUrl}`)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:7px 18px;background-color:${c};color:#111827;text-decoration:none;font-size:12px;font-family:Arial,sans-serif;border-radius:4px;font-weight:bold;">Book a Meeting</a></td></tr>` : ""}
          </table>
        </td>
      </tr>
    </table>
    <table cellpadding="0" cellspacing="0" border="0">
      ${ctaBanner(data)}
      ${!isPro ? `<tr><td style="padding-top:8px;"><a href="https://neatstamp.com?ref=sig" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,0.2);font-size:10px;font-family:Arial,sans-serif;text-decoration:none;">Made with NeatStamp</a></td></tr>` : ""}
      ${!isPro && options?.signatureId ? trackingPixel(options.signatureId) : ""}
    </table>
  </td></tr>
</table>`;
}

function generateSimple(data: SignatureData, options?: GenerateOptions): string {
  const c = data.primaryColor;
  const isPro = options?.plan === "pro" || options?.plan === "team";
  const contact = [
    data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${c};text-decoration:none;">${escapeHtml(data.email)}</a>` : "",
    data.phone ? `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#555;text-decoration:none;">${escapeHtml(data.phone)}</a>` : "",
    data.website ? `<a href="https://${escapeHtml(data.website.replace(/^https?:\/\//, ""))}" style="color:${c};text-decoration:none;">${escapeHtml(data.website.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join(`<span style="color:#d1d5db;padding:0 5px;">&middot;</span>`);
  return `<table cellpadding="0" cellspacing="0" border="0" width="500" style="max-width:500px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333;">
  <tr><td style="white-space:nowrap;padding-bottom:2px;">
    <strong style="font-size:14px;color:#1a1a1a;">${escapeHtml(data.fullName)}</strong>${data.pronouns ? ` <span style="font-size:11px;color:#bbb;">(${escapeHtml(data.pronouns)})</span>` : ""}${data.jobTitle ? ` <span style="color:#d1d5db;">|</span> <span style="color:${c};">${escapeHtml(data.jobTitle)}</span>` : ""}${data.company ? ` <span style="color:#d1d5db;">|</span> <span style="color:#555;">${escapeHtml(data.company)}</span>` : ""}
  </td></tr>
  <tr><td style="font-size:12px;padding-bottom:3px;color:#555;">${contact}</td></tr>
  ${data.address ? `<tr><td style="font-size:11px;color:#bbb;padding-bottom:3px;">${escapeHtml(data.address)}</td></tr>` : ""}
  ${socialLinks(data)}
  ${calendlyButton(data, c)}
  ${ctaBanner(data)}
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
  return generator(data, options);
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
