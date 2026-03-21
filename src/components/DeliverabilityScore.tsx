"use client";

import { SignatureData } from "@/lib/types";
import { generateSignatureHtml, GenerateOptions } from "@/lib/generateSignature";

interface DeliverabilityScoreProps {
  data: SignatureData;
  plan: "free" | "pro" | "team";
}

interface CheckResult {
  label: string;
  status: "pass" | "warn" | "fail";
  message: string;
}

function checkDeliverability(data: SignatureData, plan: "free" | "pro" | "team"): { score: number; checks: CheckResult[]; color: string } {
  const options: GenerateOptions = { plan };
  const html = generateSignatureHtml(data, options);
  const checks: CheckResult[] = [];

  // 1. Total HTML size (Gmail clips at ~102KB)
  const sizeKB = new Blob([html]).size / 1024;
  if (sizeKB > 50) {
    checks.push({ label: "HTML Size", status: "fail", message: `${sizeKB.toFixed(1)}KB — too large, may be clipped by Gmail (limit ~102KB for entire email)` });
  } else if (sizeKB > 20) {
    checks.push({ label: "HTML Size", status: "warn", message: `${sizeKB.toFixed(1)}KB — consider reducing to stay well under Gmail's clipping limit` });
  } else {
    checks.push({ label: "HTML Size", status: "pass", message: `${sizeKB.toFixed(1)}KB — well within limits` });
  }

  // 2. Number of external links (too many = spam trigger)
  const linkCount = (html.match(/href="/g) || []).length;
  if (linkCount > 10) {
    checks.push({ label: "Link Count", status: "fail", message: `${linkCount} links — too many, reduces deliverability` });
  } else if (linkCount > 6) {
    checks.push({ label: "Link Count", status: "warn", message: `${linkCount} links — consider reducing to under 6 for best deliverability` });
  } else {
    checks.push({ label: "Link Count", status: "pass", message: `${linkCount} links — good` });
  }

  // 3. Image count
  const imgCount = (html.match(/<img/g) || []).length;
  if (imgCount > 8) {
    checks.push({ label: "Image Count", status: "fail", message: `${imgCount} images — too many, increases spam score` });
  } else if (imgCount > 5) {
    checks.push({ label: "Image Count", status: "warn", message: `${imgCount} images — consider reducing` });
  } else {
    checks.push({ label: "Image Count", status: "pass", message: `${imgCount} images — good` });
  }

  // 4. Base64 images (increase size dramatically)
  const hasBase64 = html.includes("data:image");
  if (hasBase64) {
    checks.push({ label: "Embedded Images", status: "warn", message: "Contains base64 image — will be converted to hosted URL on copy" });
  } else {
    checks.push({ label: "Embedded Images", status: "pass", message: "All images are hosted URLs — good" });
  }

  // 5. HTTPS check
  const hasHttp = html.includes('src="http:') || html.includes("src='http:");
  if (hasHttp) {
    checks.push({ label: "HTTPS", status: "fail", message: "Contains non-HTTPS image URLs — blocked by many email clients" });
  } else {
    checks.push({ label: "HTTPS", status: "pass", message: "All resources use HTTPS — good" });
  }

  // 6. Table structure (Outlook compatibility)
  const hasTable = html.includes("<table");
  if (hasTable) {
    checks.push({ label: "Outlook Compatible", status: "pass", message: "Uses table-based layout — renders correctly in Outlook" });
  } else {
    checks.push({ label: "Outlook Compatible", status: "fail", message: "No table layout — will break in Outlook" });
  }

  // 7. Inline styles (no CSS classes)
  const hasClasses = /class="[^"]+"/g.test(html);
  if (hasClasses) {
    checks.push({ label: "Inline Styles", status: "warn", message: "Contains CSS classes — may be stripped by email clients" });
  } else {
    checks.push({ label: "Inline Styles", status: "pass", message: "All styles are inline — maximum compatibility" });
  }

  // 8. Width check
  if (html.includes('width="500"') || html.includes("max-width:500px")) {
    checks.push({ label: "Width", status: "pass", message: "500px width — optimal for email clients" });
  } else {
    checks.push({ label: "Width", status: "warn", message: "Width may not be set — could render differently across clients" });
  }

  // Calculate score
  const passCount = checks.filter((c) => c.status === "pass").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const score = Math.round(((passCount * 1 + warnCount * 0.5) / checks.length) * 100);

  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#f59e0b" : "#dc2626";

  return { score, checks, color };
}

export default function DeliverabilityScore({ data, plan }: DeliverabilityScoreProps) {
  const { score, checks, color } = checkDeliverability(data, plan);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">📬</span>
          <h3 className="text-sm font-bold text-slate-800">Deliverability Check</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold" style={{ color }}>{score}</span>
          <span className="text-[10px] text-slate-400">/100</span>
        </div>
      </div>

      <div className="divide-y divide-slate-50">
        {checks.map((check) => (
          <div key={check.label} className="px-4 py-2 flex items-start gap-2.5">
            <span className="mt-0.5 flex-shrink-0">
              {check.status === "pass" && <span className="text-emerald-500 text-xs">✓</span>}
              {check.status === "warn" && <span className="text-amber-500 text-xs">⚠</span>}
              {check.status === "fail" && <span className="text-red-500 text-xs">✕</span>}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-700">{check.label}</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">{check.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
