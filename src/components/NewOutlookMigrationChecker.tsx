"use client";

import { useState } from "react";

interface NewOutlookMigrationCheckerProps {
  signatureHtml: string;
  isPro: boolean;
}

type CheckStatus = "pass" | "warn" | "fail" | "info";

interface MigrationCheck {
  id: number;
  label: string;
  status: CheckStatus;
  summary: string;
  detail: string;
  fix: string;
}

function runMigrationChecks(html: string): MigrationCheck[] {
  const checks: MigrationCheck[] = [];

  // 1. VML code detected
  const hasVml = /v:roundrect|v:rect|v:oval|v:fill|v:stroke|xmlns:v=|<v:/i.test(html);
  checks.push({
    id: 1,
    label: "VML code",
    status: hasVml ? "warn" : "pass",
    summary: hasVml
      ? "VML markup found — ignored by New Outlook"
      : "No VML markup detected",
    detail: hasVml
      ? "Classic Outlook uses VML (Vector Markup Language) to render rounded corners, background fills, and shapes. New Outlook's web-based engine ignores VML entirely, so these elements will disappear or fall back to unstyled HTML."
      : "Your signature doesn't use VML. It will render consistently across both Classic and New Outlook.",
    fix: hasVml
      ? "Replace VML-based rounded corners and shapes with CSS border-radius and standard HTML. New Outlook supports CSS, so modern CSS approaches will work better."
      : "No action needed.",
  });

  // 2. Conditional comments
  const hasConditionals = /<!--\[if\s+mso/i.test(html);
  checks.push({
    id: 2,
    label: "Conditional comments (<!--[if mso]-->)",
    status: hasConditionals ? "warn" : "pass",
    summary: hasConditionals
      ? "MSO conditional comments found — stripped by New Outlook"
      : "No MSO conditional comments detected",
    detail: hasConditionals
      ? "Classic Outlook supports HTML conditional comments like <!--[if mso]> to deliver Outlook-specific code. New Outlook does not parse these — the conditional blocks are either ignored or rendered as raw HTML, causing layout breaks."
      : "Your signature doesn't use MSO conditional comments, so there's nothing to strip in New Outlook.",
    fix: hasConditionals
      ? "Audit each conditional comment block. Content inside <!--[if mso]> will not render in New Outlook. Restructure those sections to use CSS that works in both engines."
      : "No action needed.",
  });

  // 3. mso-* CSS properties
  const msoMatches = html.match(/mso-[a-z-]+\s*:/gi) || [];
  const hasMsoProps = msoMatches.length > 0;
  checks.push({
    id: 3,
    label: "mso-* CSS properties",
    status: hasMsoProps ? "warn" : "pass",
    summary: hasMsoProps
      ? `${msoMatches.length} mso-* propert${msoMatches.length === 1 ? "y" : "ies"} found — not recognized by New Outlook`
      : "No mso-* CSS properties detected",
    detail: hasMsoProps
      ? "Properties like mso-line-height-rule, mso-padding-alt, and mso-font-kerning are Word-engine specific. New Outlook's Chromium renderer ignores them, which can cause spacing and layout inconsistencies."
      : "Your signature doesn't rely on Word-engine CSS properties. Layout should be consistent between Classic and New Outlook.",
    fix: hasMsoProps
      ? "Remove mso-* properties and use standard CSS equivalents. For example, replace mso-line-height-rule: exactly with standard line-height. Test both Classic and New Outlook after changes."
      : "No action needed.",
  });

  // 4. Base64 embedded images
  const hasBase64 = /src=["']data:image/i.test(html);
  checks.push({
    id: 4,
    label: "Base64 embedded images",
    status: hasBase64 ? "fail" : "pass",
    summary: hasBase64
      ? "Base64 image data found — unreliable in both Outlook versions"
      : "No embedded base64 images detected",
    detail: hasBase64
      ? "Base64-encoded images are embedded directly in the HTML. Classic Outlook handles them inconsistently across versions; New Outlook may block or fail to render them depending on security settings. They also inflate your signature's file size significantly."
      : "All images use hosted URLs. This is the recommended approach for both Classic and New Outlook.",
    fix: hasBase64
      ? "Upload your images to a reliable host (e.g., your company server, Cloudinary, or a CDN) and reference them with absolute HTTPS URLs instead of base64 data URIs."
      : "No action needed.",
  });

  // 5. Table width using percentages
  const percentWidthMatches = html.match(/width\s*=\s*["']?\d+%["']?|width\s*:\s*\d+%/gi) || [];
  const hasPercentWidths = percentWidthMatches.length > 0;
  checks.push({
    id: 5,
    label: "Percentage-based table widths",
    status: hasPercentWidths ? "warn" : "pass",
    summary: hasPercentWidths
      ? `${percentWidthMatches.length} percentage width${percentWidthMatches.length === 1 ? "" : "s"} found — may render differently`
      : "No percentage widths detected — fixed widths used",
    detail: hasPercentWidths
      ? "Classic Outlook calculates percentage widths based on the reading pane width; New Outlook calculates them relative to the email container. The same percentage can produce very different pixel values, causing columns to wrap or overflow."
      : "Your signature uses fixed pixel widths, which render predictably in both Classic and New Outlook.",
    fix: hasPercentWidths
      ? "Where possible, replace percentage widths with fixed pixel values (e.g., width=\"500\" instead of width=\"100%\"). This gives you consistent rendering across both Outlook versions."
      : "No action needed.",
  });

  // 6. Images without explicit width/height
  const imgTags = html.match(/<img[^>]+>/gi) || [];
  const imgsWithoutDimensions = imgTags.filter((tag) => {
    const hasWidth = /width\s*=\s*["']?\d+["']?|width\s*:\s*\d+px/i.test(tag);
    const hasHeight = /height\s*=\s*["']?\d+["']?|height\s*:\s*\d+px/i.test(tag);
    return !hasWidth || !hasHeight;
  });
  const hasBadImages = imgsWithoutDimensions.length > 0;
  checks.push({
    id: 6,
    label: "Images without explicit dimensions",
    status: hasBadImages ? "fail" : "pass",
    summary: hasBadImages
      ? `${imgsWithoutDimensions.length} image${imgsWithoutDimensions.length === 1 ? "" : "s"} missing width or height attribute`
      : "All images have explicit width and height",
    detail: hasBadImages
      ? "New Outlook loads images asynchronously and will resize images to fit available space if no explicit dimensions are set. This can break your signature layout while images are loading or if they fail to load."
      : "All your images have explicit width and height attributes. This ensures stable layout in both Classic and New Outlook.",
    fix: hasBadImages
      ? "Add width and height attributes to every <img> tag. Example: <img src=\"...\" width=\"120\" height=\"120\" alt=\"Logo\">. Use the same values in a style attribute for belt-and-suspenders safety."
      : "No action needed.",
  });

  // 7. SVG images
  const hasSvg = /<img[^>]+\.svg["']/i.test(html) || /<svg[\s>]/i.test(html);
  checks.push({
    id: 7,
    label: "SVG images",
    status: hasSvg ? "warn" : "pass",
    summary: hasSvg
      ? "SVG image or inline SVG detected — rendering differs between versions"
      : "No SVG images detected",
    detail: hasSvg
      ? "Classic Outlook blocks SVG files entirely (they show as broken images). New Outlook renders SVGs, but inline SVG support is inconsistent. The net effect is that your signature looks different depending on which Outlook version the recipient uses."
      : "Your signature doesn't use SVG images. PNG and JPEG images are supported reliably in both Outlook versions.",
    fix: hasSvg
      ? "Export your SVG graphics as PNG files and reference those instead. Use a 2x resolution PNG (e.g., 240×240px displayed at 120×120px) for crisp rendering on retina displays."
      : "No action needed.",
  });

  // 8. CSS classes used
  const cssClassMatches = html.match(/class=["'][^"']+["']/gi) || [];
  const hasCssClasses = cssClassMatches.length > 0;
  checks.push({
    id: 8,
    label: "CSS class attributes",
    status: hasCssClasses ? "info" : "pass",
    summary: hasCssClasses
      ? `${cssClassMatches.length} class attribute${cssClassMatches.length === 1 ? "" : "s"} found — behavior differs between versions`
      : "No CSS class attributes — fully inline styles",
    detail: hasCssClasses
      ? "Classic Outlook strips CSS class attributes and the associated <style> block rules, rendering elements without those styles. New Outlook preserves class attributes but may still strip <style> block rules. The result is inconsistent styling between the two versions."
      : "All styles are inline. This is the most compatible approach — both Classic and New Outlook respect inline styles.",
    fix: hasCssClasses
      ? "Move all styles from CSS classes into inline style attributes. Inline styles are the only reliable way to achieve consistent appearance across all Outlook versions."
      : "No action needed.",
  });

  // 9. Font-family fallback check
  const fontFamilyMatches = html.match(/font-family\s*:\s*([^;"]+)/gi) || [];
  const safeFallbacks = ["Arial", "Helvetica", "Georgia", "Times New Roman", "Courier New", "Verdana", "Tahoma", "Trebuchet MS", "sans-serif", "serif", "monospace"];
  const fontsWithoutFallback = fontFamilyMatches.filter((match) => {
    const value = match.replace(/font-family\s*:\s*/i, "").trim();
    return !safeFallbacks.some((safe) => value.toLowerCase().includes(safe.toLowerCase()));
  });
  const hasFontWarning = fontsWithoutFallback.length > 0;
  checks.push({
    id: 9,
    label: "Font-family fallback chain",
    status: hasFontWarning ? "warn" : "pass",
    summary: hasFontWarning
      ? `${fontsWithoutFallback.length} font declaration${fontsWithoutFallback.length === 1 ? "" : "s"} missing a web-safe fallback`
      : "All font declarations include a web-safe fallback",
    detail: hasFontWarning
      ? "Both Classic and New Outlook fall back to system fonts when the specified font isn't available, but they use different fallback chains. Classic Outlook falls back to Calibri; New Outlook falls back to the system default sans-serif. Without an explicit fallback, your text may look very different for recipients."
      : "Your font declarations include web-safe fallbacks. If the primary font isn't available, both Outlook versions will fall back to a predictable alternative.",
    fix: hasFontWarning
      ? "Add a web-safe fallback to every font-family declaration. Example: font-family: 'Lato', Arial, sans-serif. Always end with a generic family (sans-serif, serif, or monospace)."
      : "No action needed.",
  });

  // 10. Signature total size
  const sizeBytes = new Blob([html]).size;
  const sizeKB = sizeBytes / 1024;
  checks.push({
    id: 10,
    label: "Signature file size",
    status: sizeKB > 50 ? "warn" : "pass",
    summary: sizeKB > 50
      ? `${sizeKB.toFixed(1)}KB — exceeds 50KB recommended limit`
      : `${sizeKB.toFixed(1)}KB — within recommended size`,
    detail: sizeKB > 50
      ? `Your signature HTML is ${sizeKB.toFixed(1)}KB. New Outlook may truncate large signatures or fail to save them properly. Classic Outlook is more lenient, but large signatures slow down every email sent.`
      : `Your signature HTML is ${sizeKB.toFixed(1)}KB — well within the recommended 50KB limit. Both Classic and New Outlook will handle it without issue.`,
    fix: sizeKB > 50
      ? "Reduce size by: (1) removing base64 images and using hosted URLs, (2) stripping unnecessary HTML comments and whitespace, (3) removing unused CSS properties, (4) compressing image file sizes."
      : "No action needed.",
  });

  // 11. Number of images
  const imageCount = (html.match(/<img/gi) || []).length;
  checks.push({
    id: 11,
    label: "Image count",
    status: imageCount > 5 ? "warn" : "pass",
    summary: imageCount > 5
      ? `${imageCount} images detected — may load slowly in New Outlook`
      : `${imageCount} image${imageCount === 1 ? "" : "s"} — within recommended limit`,
    detail: imageCount > 5
      ? `New Outlook uses lazy image loading, which means ${imageCount} images may not all be visible immediately when the recipient opens the email. This is especially noticeable for recipients on slower connections. Classic Outlook loads all images simultaneously.`
      : `${imageCount} image${imageCount === 1 ? "" : "s"} is well within the recommended limit. Both Classic and New Outlook will load them promptly.`,
    fix: imageCount > 5
      ? "Consolidate multiple small icons into a single image sprite, or remove non-essential decorative images. Aim for 5 or fewer images for the best experience in New Outlook."
      : "No action needed.",
  });

  // 12. External stylesheet links
  const stylesheetMatches = html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
  const hasStylesheets = stylesheetMatches.length > 0;
  checks.push({
    id: 12,
    label: "External stylesheet links",
    status: hasStylesheets ? "fail" : "pass",
    summary: hasStylesheets
      ? `${stylesheetMatches.length} external stylesheet${stylesheetMatches.length === 1 ? "" : "s"} linked — will not load`
      : "No external stylesheets linked",
    detail: hasStylesheets
      ? "Both Classic and New Outlook block external CSS stylesheets for security reasons. Any styles you've applied via <link rel=\"stylesheet\"> will be completely ignored, making affected elements unstyled."
      : "Your signature doesn't link any external stylesheets. This is correct — all email clients, including both Outlook versions, block external CSS.",
    fix: hasStylesheets
      ? "Remove all <link rel=\"stylesheet\"> tags and move every style property inline. There is no workaround — email clients do not load external CSS files."
      : "No action needed.",
  });

  // 13. Background images on table cells
  const hasTableBgImages = /background\s*(?:=|:)\s*["']?https?:|background-image\s*:\s*url\s*\(/i.test(html);
  checks.push({
    id: 13,
    label: "Background images on table cells",
    status: hasTableBgImages ? "warn" : "pass",
    summary: hasTableBgImages
      ? "CSS or HTML background images found on table elements"
      : "No background images on table elements",
    detail: hasTableBgImages
      ? "Classic Outlook requires VML markup to render background images on table cells. New Outlook renders them via CSS background-image. The same background image requires two different approaches for the two versions — meaning any single approach will fail in one of them."
      : "Your signature doesn't use background images on table cells. This avoids a major source of rendering differences between Classic and New Outlook.",
    fix: hasTableBgImages
      ? "Replace background images with foreground <img> tags where possible. If you must use backgrounds, implement both the CSS version (for New Outlook) and the VML version (for Classic Outlook) within conditional comments — but note that this adds complexity."
      : "No action needed.",
  });

  // 14. Border-radius usage
  const borderRadiusMatches = html.match(/border-radius\s*:/gi) || [];
  const hasBorderRadius = borderRadiusMatches.length > 0;
  checks.push({
    id: 14,
    label: "CSS border-radius",
    status: hasBorderRadius ? "info" : "pass",
    summary: hasBorderRadius
      ? `${borderRadiusMatches.length} border-radius declaration${borderRadiusMatches.length === 1 ? "" : "s"} — supported in New Outlook, not Classic`
      : "No CSS border-radius detected",
    detail: hasBorderRadius
      ? "This is good news for New Outlook. Classic Outlook ignores CSS border-radius (elements will appear square), but New Outlook fully supports it. Recipients on New Outlook will see your rounded corners; Classic Outlook users will see square versions. Both are functional — just visually different."
      : "Your signature doesn't use CSS border-radius. Both Classic and New Outlook will render elements with square corners consistently.",
    fix: hasBorderRadius
      ? "No action required — this difference is cosmetic and acceptable. If pixel-perfect consistency matters, design with square corners so both versions match."
      : "No action needed.",
  });

  // 15. Multiple signatures note
  checks.push({
    id: 15,
    label: "Signature count limitation",
    status: "info",
    summary: "New Outlook supports only 1 signature per account (Classic supports multiple)",
    detail: "Classic Outlook allows you to configure multiple signatures and choose between them when composing emails. New Outlook restricts each account to a single default signature. Users who relied on multiple signatures in Classic Outlook will need to manually switch between them or recreate their workflow.",
    fix: "Communicate this limitation to your team before migration. Consider designing a single comprehensive signature that covers all common use cases, or investigate whether your organization's IT policy can manage signatures centrally via a tool like NeatStamp.",
  });

  return checks;
}

function StatusDot({ status }: { status: CheckStatus }) {
  const colors: Record<CheckStatus, string> = {
    pass: "bg-emerald-500",
    warn: "bg-amber-400",
    fail: "bg-red-500",
    info: "bg-blue-500",
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${colors[status]}`}
      aria-label={status}
    />
  );
}

function StatusBadge({ status }: { status: CheckStatus }) {
  const styles: Record<CheckStatus, string> = {
    pass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warn: "bg-amber-50 text-amber-700 border border-amber-200",
    fail: "bg-red-50 text-red-700 border border-red-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200",
  };
  const labels: Record<CheckStatus, string> = {
    pass: "Pass",
    warn: "Warning",
    fail: "Fail",
    info: "Info",
  };
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function MigrationIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-500"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="7" height="12" rx="1" />
      <rect x="11" y="4" width="7" height="12" rx="1" />
      <path d="M9 10h2M14 7l3 3-3 3" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckRow({ check }: { check: MigrationCheck }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-50 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-2.5 flex items-start gap-2.5 text-left hover:bg-slate-50 transition-colors"
      >
        <StatusDot status={check.status} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-700">{check.label}</span>
            <StatusBadge status={check.status} />
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{check.summary}</p>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="px-4 pb-3 ml-4 border-l-2 border-slate-100 ml-[1.375rem] pl-3 mb-1">
          <p className="text-[11px] text-slate-600 leading-relaxed mb-1.5">{check.detail}</p>
          {check.status !== "pass" && (
            <div className="flex items-start gap-1.5">
              <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wide flex-shrink-0 mt-0.5">Fix:</span>
              <p className="text-[11px] text-blue-700 leading-relaxed">{check.fix}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function NewOutlookMigrationChecker({ signatureHtml, isPro }: NewOutlookMigrationCheckerProps) {
  const checks = runMigrationChecks(signatureHtml);

  const passCount = checks.filter((c) => c.status === "pass").length;
  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const totalChecks = checks.length;

  const allPass = failCount === 0 && warnCount === 0;

  const scoreBadgeStyle =
    failCount > 0
      ? "bg-red-100 text-red-700 border border-red-200"
      : warnCount > 0
      ? "bg-amber-100 text-amber-700 border border-amber-200"
      : "bg-emerald-100 text-emerald-700 border border-emerald-200";

  const FREE_LIMIT = 5;
  const visibleChecks = isPro ? checks : checks.slice(0, FREE_LIMIT);
  const lockedChecks = isPro ? [] : checks.slice(FREE_LIMIT);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MigrationIcon />
            <div>
              <h3 className="text-sm font-bold text-slate-800">New Outlook Migration Checker</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Check if your signature survives the Classic &rarr; New Outlook switch
              </p>
            </div>
          </div>
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scoreBadgeStyle}`}>
            {passCount}/{totalChecks} passed
          </div>
        </div>

        {/* Score bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-500">Migration readiness</span>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              {passCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  {passCount} pass
                </span>
              )}
              {warnCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                  {warnCount} warning
                </span>
              )}
              {failCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                  {failCount} fail
                </span>
              )}
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden flex">
            {passCount > 0 && (
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(passCount / totalChecks) * 100}%` }}
              />
            )}
            {warnCount > 0 && (
              <div
                className="h-full bg-amber-400 transition-all duration-500"
                style={{ width: `${(warnCount / totalChecks) * 100}%` }}
              />
            )}
            {failCount > 0 && (
              <div
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${(failCount / totalChecks) * 100}%` }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Check rows */}
      <div className="divide-y-0">
        {visibleChecks.map((check) => (
          <CheckRow key={check.id} check={check} />
        ))}
      </div>

      {/* Locked checks (non-Pro) */}
      {!isPro && lockedChecks.length > 0 && (
        <div className="relative">
          {/* Blurred preview rows */}
          <div className="select-none pointer-events-none" aria-hidden="true">
            {lockedChecks.map((check) => (
              <div
                key={check.id}
                className="px-4 py-2.5 flex items-start gap-2.5 border-b border-slate-50 last:border-b-0 blur-sm opacity-60"
              >
                <StatusDot status={check.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-700">{check.label}</span>
                    <StatusBadge status={check.status} />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{check.summary}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <LockIcon />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {lockedChecks.length} more checks available on Pro
              </p>
              <p className="text-[11px] text-slate-500 max-w-[220px] leading-relaxed">
                Upgrade to Pro to see all {totalChecks} migration checks, including font fallbacks, image loading, external stylesheets, and more.
              </p>
              <button
                type="button"
                className="mt-1 px-4 py-1.5 bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA — only shown when all checks pass and Pro */}
      {isPro && allPass && (
        <div className="px-4 py-3 bg-emerald-50 border-t border-emerald-100">
          <div className="flex items-start gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1" />
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Your signature was built with NeatStamp — it&rsquo;s already optimized for both Classic and New Outlook.
              All {totalChecks} migration checks passed.
            </p>
          </div>
        </div>
      )}

      {/* Info legend */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-4 flex-wrap">
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Legend</span>
        {(["pass", "warn", "fail", "info"] as CheckStatus[]).map((s) => (
          <span key={s} className="flex items-center gap-1">
            <StatusDot status={s} />
            <StatusBadge status={s} />
          </span>
        ))}
      </div>
    </div>
  );
}
