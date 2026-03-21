"use client";

import { useState } from "react";

const guides = [
  {
    id: "gmail",
    name: "Gmail",
    icon: "📧",
    steps: [
      "Open Gmail and click the gear icon ⚙️ in the top right",
      "Click \"See all settings\"",
      "Scroll down to the \"Signature\" section",
      "Click \"+ Create new\" to make a new signature",
      "Click inside the signature editor box",
      "Press Ctrl+V (or Cmd+V on Mac) to paste your signature",
      "Scroll down and click \"Save Changes\"",
    ],
  },
  {
    id: "outlook-desktop",
    name: "Outlook Desktop",
    icon: "📬",
    steps: [
      "Open Outlook and go to File → Options",
      "Click \"Mail\" in the left sidebar",
      "Click the \"Signatures...\" button",
      "Click \"New\" to create a new signature, give it a name",
      "Click inside the signature editor box",
      "Press Ctrl+V to paste your signature",
      "Select it as default for new messages and/or replies",
      "Click \"OK\" to save",
    ],
  },
  {
    id: "outlook-web",
    name: "Outlook Web",
    icon: "🌐",
    steps: [
      "Open Outlook.com and click the gear icon ⚙️",
      "Click \"View all Outlook settings\"",
      "Go to Mail → Compose and reply",
      "Under \"Email signature\", click inside the editor",
      "Press Ctrl+V (or Cmd+V) to paste your signature",
      "Toggle \"Automatically include my signature\" on",
      "Click \"Save\"",
    ],
  },
  {
    id: "apple-mail",
    name: "Apple Mail",
    icon: "🍎",
    steps: [
      "Open Mail and go to Mail → Settings (or Preferences)",
      "Click the \"Signatures\" tab",
      "Click the \"+\" button to create a new signature",
      "UNCHECK \"Always match my default message font\"",
      "Click inside the signature preview area",
      "Press Cmd+V to paste your signature",
      "Drag the signature to the account you want to use it with",
    ],
  },
  {
    id: "yahoo",
    name: "Yahoo Mail",
    icon: "📮",
    steps: [
      "Open Yahoo Mail and click the gear icon ⚙️",
      "Click \"More Settings\"",
      "Click \"Writing email\" in the left sidebar",
      "Under \"Signature\", toggle it on",
      "Click inside the signature editor",
      "Press Ctrl+V (or Cmd+V) to paste your signature",
      "Close settings — it saves automatically",
    ],
  },
  {
    id: "thunderbird",
    name: "Thunderbird",
    icon: "🦅",
    steps: [
      "Open Thunderbird and go to Account Settings",
      "Select your email account in the left sidebar",
      "Check \"Use HTML\" under the signature section",
      "Paste your signature in the text box",
      "Click \"OK\" to save",
    ],
  },
];

export default function InstallGuide() {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <h3 className="text-sm font-bold text-slate-800">How to install your signature</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Select your email client for step-by-step instructions</p>
      </div>

      {/* Email client tabs */}
      <div className="flex flex-wrap gap-1 p-3 border-b border-slate-100">
        {guides.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveGuide(activeGuide === g.id ? null : g.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeGuide === g.id
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>{g.icon}</span>
            {g.name}
          </button>
        ))}
      </div>

      {/* Steps */}
      {activeGuide && (() => {
        const guide = guides.find((g) => g.id === activeGuide);
        if (!guide) return null;
        return (
          <div className="p-4">
            <ol className="space-y-2">
              {guide.steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-700 leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
              <p className="text-xs text-emerald-800">
                <strong>Tip:</strong> Make sure you&apos;ve clicked &quot;Copy Signature&quot; above before pasting. The signature is copied as rich HTML — just paste with Ctrl+V.
              </p>
            </div>
          </div>
        );
      })()}

      {!activeGuide && (
        <div className="p-4 text-center text-xs text-slate-400">
          Click an email client above to see installation steps
        </div>
      )}
    </div>
  );
}
