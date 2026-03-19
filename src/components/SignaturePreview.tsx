"use client";

import { SignatureData } from "@/lib/types";
import { generateSignatureHtml } from "@/lib/generateSignature";
import { copySignatureToClipboard } from "@/lib/clipboard";
import { useState, useRef } from "react";

interface SignaturePreviewProps {
  data: SignatureData;
}

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [showCode, setShowCode] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const html = generateSignatureHtml(data);

  const handleCopy = async () => {
    const success = await copySignatureToClipboard(html);
    if (success) {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
    } else {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 3000);
    }
  };

  // Manual select - user can then Ctrl+C themselves
  const handleSelect = () => {
    if (!previewRef.current) return;
    const range = document.createRange();
    range.selectNodeContents(previewRef.current);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = html;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Preview</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Outlook-safe</span>
            <span className="inline-flex h-5 items-center rounded-full bg-emerald-50 px-2 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Verified
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-6">
          <div
            ref={previewRef}
            className="signature-preview-container"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      {/* Copy buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all shadow-sm ${
            copyState === "copied"
              ? "bg-emerald-500 text-white shadow-emerald-500/25"
              : copyState === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-600 text-white shadow-blue-600/25 hover:bg-blue-700 hover:shadow-md"
          }`}
        >
          {copyState === "copied" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied! Now paste in your email client
            </span>
          ) : copyState === "error" ? (
            <span>Copy failed — use &quot;Select&quot; below and Ctrl+C</span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy Signature
            </span>
          )}
        </button>

        <button
          onClick={handleSelect}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
          title="Select the signature — then press Ctrl+C to copy"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <button
          onClick={() => setShowCode(!showCode)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
          title="View HTML code"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </button>
      </div>

      {/* Error help text */}
      {copyState === "error" && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs text-amber-800">
            <strong>Tip:</strong> Click the select button (
            <svg className="inline h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            ) to highlight the signature, then press <strong>Ctrl+C</strong> (or Cmd+C on Mac) to copy manually.
          </p>
        </div>
      )}

      {/* HTML code view */}
      {showCode && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">HTML Code</span>
            <button
              onClick={handleCopyHtml}
              className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-blue-400 hover:text-blue-300 hover:bg-slate-700 transition-colors"
            >
              {copyState === "copied" ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <pre className="max-h-60 overflow-auto text-xs text-slate-300 leading-relaxed">
            <code>{html}</code>
          </pre>
        </div>
      )}

      {/* Installation guide */}
      <div className="rounded-xl bg-slate-50 border border-slate-100 p-5">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          How to install your signature
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { client: "Gmail", steps: "Settings → See all settings → Signature → Paste" },
            { client: "Outlook", steps: "File → Options → Mail → Signatures → Paste" },
            { client: "Apple Mail", steps: "Settings → Signatures → Paste" },
            { client: "Yahoo", steps: "Settings → More Settings → Writing email → Paste" },
          ].map((item) => (
            <div key={item.client} className="flex gap-2">
              <span className="text-xs font-semibold text-slate-700 min-w-[70px]">{item.client}:</span>
              <span className="text-xs text-slate-500">{item.steps}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
