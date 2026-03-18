"use client";

import { SignatureData } from "@/lib/types";
import { generateSignatureHtml } from "@/lib/generateSignature";
import { copySignatureToClipboard } from "@/lib/clipboard";
import { useState } from "react";

interface SignaturePreviewProps {
  data: SignatureData;
}

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const html = generateSignatureHtml(data);

  const handleCopy = async () => {
    const success = await copySignatureToClipboard(html);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = html;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Preview</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Outlook-safe</span>
            <span className="inline-flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
              Verified
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
          <div
            className="signature-preview-container"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            copied
              ? "bg-green-500 text-white"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {copied ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied! Paste in your email client
            </span>
          ) : (
            "Copy Signature"
          )}
        </button>
        <button
          onClick={() => setShowCode(!showCode)}
          className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-muted hover:bg-surface transition-colors"
          title="View HTML code"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </button>
      </div>

      {showCode && (
        <div className="rounded-xl border border-border bg-gray-900 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">HTML Code</span>
            <button
              onClick={handleCopyHtml}
              className="text-xs text-primary hover:text-primary-light"
            >
              {copied ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <pre className="max-h-60 overflow-auto text-xs text-gray-300">
            <code>{html}</code>
          </pre>
        </div>
      )}

      <div className="rounded-lg bg-surface p-4">
        <h4 className="text-xs font-semibold text-foreground mb-2">
          How to install your signature:
        </h4>
        <ol className="space-y-1 text-xs text-muted">
          <li>
            <strong>Gmail:</strong> Settings → See all settings → Signature → Paste
          </li>
          <li>
            <strong>Outlook:</strong> File → Options → Mail → Signatures → Paste
          </li>
          <li>
            <strong>Apple Mail:</strong> Preferences → Signatures → Paste
          </li>
          <li>
            <strong>Yahoo:</strong> Settings → More Settings → Writing email → Signature → Paste
          </li>
        </ol>
      </div>
    </div>
  );
}
