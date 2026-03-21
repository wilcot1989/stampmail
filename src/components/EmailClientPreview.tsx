"use client";

import { useState } from "react";
import { SignatureData } from "@/lib/types";
import { generateSignatureHtml, GenerateOptions } from "@/lib/generateSignature";

interface EmailClientPreviewProps {
  data: SignatureData;
  plan: "free" | "pro" | "team";
}

type Client = "gmail" | "outlook" | "outlook-mobile" | "owa" | "apple";

const clients: { id: Client; name: string }[] = [
  { id: "outlook", name: "Outlook" },
  { id: "outlook-mobile", name: "Mobile" },
  { id: "owa", name: "OWA" },
  { id: "gmail", name: "Gmail" },
  { id: "apple", name: "Apple Mail" },
];

function GmailFrame({ html }: { html: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Gmail toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#f6f8fc] border-b border-slate-200">
        <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
        <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></svg>
        <div className="flex-1" />
        <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
      </div>
      {/* Email header */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">YN</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900">You</span>
              <span className="text-xs text-slate-400">10:32 AM</span>
            </div>
            <p className="text-xs text-slate-500">to recipient@company.com</p>
          </div>
        </div>
      </div>
      {/* Email body + signature */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-sm text-slate-800 leading-relaxed">Hi there,</p>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed">Thanks for getting back to me. I&apos;ve attached the proposal for your review.</p>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed">Best regards,</p>
      </div>
      <div className="px-4 pb-4 border-t border-slate-100 mt-2 pt-3">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

function OutlookFrame({ html }: { html: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Outlook ribbon */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-[#0078d4] text-white text-[10px]">
        <span className="font-semibold">File</span>
        <span className="px-2">Message</span>
        <span className="px-2">Insert</span>
        <span className="px-2">Options</span>
      </div>
      {/* Outlook toolbar */}
      <div className="flex items-center gap-3 px-3 py-1.5 bg-[#f3f2f1] border-b border-slate-200">
        <button className="bg-[#0078d4] text-white text-xs px-3 py-1 rounded">Send</button>
        <div className="text-xs text-slate-600">To: recipient@company.com</div>
      </div>
      <div className="px-3 py-1 border-b border-slate-200 text-xs text-slate-600">
        Subject: Quick follow up
      </div>
      {/* Email body + signature */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-sm text-slate-800 leading-relaxed" style={{ fontFamily: "Calibri, sans-serif" }}>Hi there,</p>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed" style={{ fontFamily: "Calibri, sans-serif" }}>Thanks for getting back to me. I&apos;ve attached the proposal for your review.</p>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed" style={{ fontFamily: "Calibri, sans-serif" }}>Best regards,</p>
      </div>
      <div className="px-4 pb-4">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

function AppleMailFrame({ html }: { html: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* macOS title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#e8e8e8] border-b border-slate-200">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="flex-1 text-center text-xs text-slate-500 font-medium">New Message</span>
      </div>
      {/* Mail headers */}
      <div className="px-4 py-1.5 border-b border-slate-100 text-xs">
        <span className="text-slate-400">To: </span>
        <span className="text-slate-700">recipient@company.com</span>
      </div>
      <div className="px-4 py-1.5 border-b border-slate-100 text-xs">
        <span className="text-slate-400">Subject: </span>
        <span className="text-slate-700">Quick follow up</span>
      </div>
      {/* Email body + signature */}
      <div className="px-4 pt-3 pb-2" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
        <p className="text-sm text-slate-800 leading-relaxed">Hi there,</p>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed">Thanks for getting back to me. I&apos;ve attached the proposal for your review.</p>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed">Best regards,</p>
      </div>
      <div className="px-4 pb-4 border-t border-slate-100 mt-2 pt-3">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

function OutlookMobileFrame({ html }: { html: string }) {
  return (
    <div className="mx-auto" style={{ maxWidth: 375 }}>
      <div className="rounded-2xl border-2 border-slate-800 bg-white overflow-hidden shadow-lg">
        {/* Phone status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#0078d4]">
          <span className="text-[10px] text-white/80 font-medium">9:41</span>
          <span className="text-[10px] text-white font-semibold">Outlook</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 rounded-sm border border-white/60 relative">
              <div className="absolute inset-0.5 bg-white/80 rounded-[1px]" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
        {/* Email header */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">Y</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">You</p>
              <p className="text-[11px] text-slate-400">To: recipient@company.com</p>
            </div>
          </div>
        </div>
        {/* Email body */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-[13px] text-slate-800">Hi there,</p>
          <p className="text-[13px] text-slate-800 mt-2">Thanks for getting back to me.</p>
          <p className="text-[13px] text-slate-800 mt-2">Best regards,</p>
        </div>
        {/* Signature — constrained to mobile width */}
        <div className="px-3 pb-4 border-t border-slate-100 mt-2 pt-3 overflow-x-auto">
          <div style={{ maxWidth: 345, overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <p className="text-center text-[10px] text-slate-400 mt-2">375px viewport — Outlook Mobile (iOS/Android)</p>
    </div>
  );
}

function OWAFrame({ html }: { html: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* OWA top bar */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#0078d4]">
        <span className="text-white text-xs font-semibold">Outlook</span>
        <div className="flex-1 bg-white/20 rounded px-3 py-1">
          <span className="text-white/70 text-[10px]">Search mail and people</span>
        </div>
      </div>
      {/* OWA compose area */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-100">
        <button className="bg-[#0078d4] text-white text-xs px-3 py-1 rounded">Send</button>
        <button className="text-xs text-slate-500 px-2 py-1">Discard</button>
      </div>
      <div className="px-4 py-1.5 border-b border-slate-100 text-xs">
        <span className="text-slate-400">To: </span>
        <span className="text-slate-700">recipient@company.com</span>
      </div>
      <div className="px-4 py-1.5 border-b border-slate-100 text-xs">
        <span className="text-slate-400">Subject: </span>
        <span className="text-slate-700">Quick follow up</span>
      </div>
      {/* Email body + signature */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-sm text-slate-800 leading-relaxed" style={{ fontFamily: "Segoe UI, sans-serif" }}>Hi there,</p>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed" style={{ fontFamily: "Segoe UI, sans-serif" }}>Thanks for getting back to me. I&apos;ve attached the proposal.</p>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed" style={{ fontFamily: "Segoe UI, sans-serif" }}>Best regards,</p>
      </div>
      <div className="px-4 pb-4 border-t border-slate-100 mt-2 pt-3">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export default function EmailClientPreview({ data, plan }: EmailClientPreviewProps) {
  const [activeClient, setActiveClient] = useState<Client>("outlook");
  const options: GenerateOptions = { plan };
  const html = generateSignatureHtml(data, options);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Email Client Preview</h3>
        <div className="flex gap-1">
          {clients.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveClient(c.id)}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                activeClient === c.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {activeClient === "outlook" && <OutlookFrame html={html} />}
      {activeClient === "outlook-mobile" && <OutlookMobileFrame html={html} />}
      {activeClient === "owa" && <OWAFrame html={html} />}
      {activeClient === "gmail" && <GmailFrame html={html} />}
      {activeClient === "apple" && <AppleMailFrame html={html} />}

      <p className="text-center text-[10px] text-slate-400">
        Preview is approximate — actual rendering may vary slightly per client
      </p>
    </div>
  );
}
