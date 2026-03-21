"use client";

import { useState } from "react";
import { SignatureData } from "@/lib/types";
import { generateSignatureHtml, GenerateOptions } from "@/lib/generateSignature";

interface DarkModePreviewProps {
  data: SignatureData;
  plan: "free" | "pro" | "team";
}

function getDarkModeWarnings(data: SignatureData, html: string): string[] {
  const warnings: string[] = [];

  // Check for transparent images (PNG with transparency may be invisible)
  if (data.photoUrl && data.photoUrl.includes(".png")) {
    warnings.push("Your photo appears to be a PNG — if it has a transparent background, it may be invisible in dark mode. Use JPEG instead.");
  }

  // Check for dark text colors without background container
  if (html.includes("color:#1a1a1a") || html.includes("color:#333") || html.includes("color:#000")) {
    if (!html.includes("background-color:")) {
      warnings.push("Dark text colors (#000, #333) will be nearly invisible if the email client enables dark mode. Consider adding a background color.");
    }
  }

  // Check for very light text on white background
  if (html.includes("color:#fff") && !html.includes("background-color:")) {
    warnings.push("White text without a colored background will be invisible in light mode.");
  }

  return warnings;
}

export default function DarkModePreview({ data, plan }: DarkModePreviewProps) {
  const [darkMode, setDarkMode] = useState(false);
  const options: GenerateOptions = { plan };
  const html = generateSignatureHtml(data, options);
  const warnings = getDarkModeWarnings(data, html);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">{darkMode ? "🌙" : "☀️"}</span>
          <h3 className="text-sm font-bold text-slate-800">Dark Mode Preview</h3>
        </div>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}
        >
          <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${darkMode ? "translate-x-5 ml-0.5" : "translate-x-0.5"}`} />
        </button>
      </div>

      {/* Preview */}
      <div className={`p-4 transition-colors ${darkMode ? "bg-[#1e1e1e]" : "bg-white"}`}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-100 bg-amber-50">
          <p className="text-[11px] font-semibold text-amber-800 mb-1">⚠️ Dark mode warnings</p>
          {warnings.map((w, i) => (
            <p key={i} className="text-[10px] text-amber-700 leading-relaxed">{w}</p>
          ))}
        </div>
      )}

      {warnings.length === 0 && (
        <div className="px-4 py-2 border-t border-slate-100 bg-emerald-50">
          <p className="text-[10px] text-emerald-700">✓ No dark mode issues detected</p>
        </div>
      )}
    </div>
  );
}
