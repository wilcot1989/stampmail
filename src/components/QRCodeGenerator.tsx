"use client";

import { useState, useEffect, useRef } from "react";

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

// Simple QR code generator using a public API (no dependencies needed)
export default function QRCodeGenerator({ url, size = 200 }: QRCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&format=png&margin=8`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "signature-qr-code.png";
    link.click();
  };

  const handleCopy = async () => {
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: just copy the URL
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!url.trim()) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-center">
        <p className="text-xs text-slate-500">Enter a website URL to generate a QR code</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-3">QR Code</h3>
      <div className="flex items-start gap-4">
        <div className="bg-white border border-slate-100 rounded-lg p-2 shrink-0">
          <img
            src={qrUrl}
            alt={`QR code for ${url}`}
            width={120}
            height={120}
            className="block"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <p className="text-xs text-slate-600 break-all">{url}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Download PNG
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-[10px] text-slate-400">Add this QR code to business cards or printed materials</p>
        </div>
      </div>
    </div>
  );
}
