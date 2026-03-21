"use client";

import { useState } from "react";
import { SignatureData, DEFAULT_SIGNATURE_DATA, TemplateName, TEMPLATES } from "@/lib/types";

interface AISignatureGeneratorProps {
  onGenerate: (data: SignatureData) => void;
}

// Parse a LinkedIn-style URL or plain text input into signature data
function parseInput(input: string): Partial<SignatureData> {
  const result: Partial<SignatureData> = {};
  const text = input.trim();

  // Try to extract from LinkedIn URL or profile text
  if (text.includes("linkedin.com")) {
    result.linkedin = text.startsWith("http") ? text : `https://${text}`;
    // Extract username from URL for name guess
    const match = text.match(/linkedin\.com\/in\/([^/?]+)/);
    if (match) {
      const username = match[1].replace(/-/g, " ");
      result.fullName = username.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
  }

  // Try to parse as multi-line text (name, title, company, email, phone)
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length >= 2 && !text.includes("linkedin.com")) {
    // First line = name
    if (lines[0] && !lines[0].includes("@") && !lines[0].includes("http")) {
      result.fullName = lines[0];
    }

    lines.forEach((line) => {
      // Email detection
      const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) result.email = emailMatch[0];

      // Phone detection
      const phoneMatch = line.match(/[\+]?[\d\s\-\(\)]{7,}/);
      if (phoneMatch && !result.phone) result.phone = phoneMatch[0].trim();

      // Website detection
      if (line.match(/^(https?:\/\/)?(www\.)?[\w-]+\.\w{2,}/i) && !line.includes("@") && !line.includes("linkedin")) {
        result.website = line.replace(/^https?:\/\//, "");
      }

      // Title/Company detection (second line usually)
      if (line !== lines[0] && !line.includes("@") && !line.includes("http") && !line.match(/[\+]?[\d]{7,}/)) {
        if (!result.jobTitle) {
          // Check if it contains common title words
          const titleWords = ["manager", "director", "engineer", "designer", "developer", "ceo", "cto", "cfo", "founder", "lead", "head", "senior", "junior", "analyst", "consultant", "specialist", "coordinator", "assistant", "intern", "vp", "president", "officer"];
          const lower = line.toLowerCase();
          if (titleWords.some((w) => lower.includes(w))) {
            result.jobTitle = line;
          } else if (!result.company) {
            // If no title words, might be company
            if (line.includes(" at ") || line.includes(" @ ")) {
              const parts = line.split(/ at | @ /i);
              result.jobTitle = parts[0]?.trim();
              result.company = parts[1]?.trim();
            } else {
              result.company = line;
            }
          }
        } else if (!result.company) {
          result.company = line;
        }
      }
    });
  }

  return result;
}

// Pick the best template based on the data
function suggestTemplate(data: Partial<SignatureData>): TemplateName {
  const title = (data.jobTitle || "").toLowerCase();

  if (title.includes("ceo") || title.includes("founder") || title.includes("director") || title.includes("president")) return "executive";
  if (title.includes("engineer") || title.includes("developer") || title.includes("programmer")) return "developer";
  if (title.includes("sales") || title.includes("account")) return "sales";
  if (title.includes("design") || title.includes("creative") || title.includes("art")) return "creative";
  if (title.includes("doctor") || title.includes("nurse") || title.includes("medical")) return "medical";
  if (title.includes("lawyer") || title.includes("attorney") || title.includes("legal")) return "legal";
  if (title.includes("professor") || title.includes("teacher") || title.includes("academic")) return "academic";
  if (title.includes("realtor") || title.includes("real estate") || title.includes("broker")) return "realtor";
  if (title.includes("photo") || title.includes("video") || title.includes("film")) return "photographer";

  return "modern"; // Safe default
}

// Pick colors based on industry
function suggestColors(data: Partial<SignatureData>): { primary: string; accent: string } {
  const title = (data.jobTitle || "").toLowerCase();
  const company = (data.company || "").toLowerCase();

  if (title.includes("medical") || title.includes("doctor") || title.includes("health")) return { primary: "#0d9488", accent: "#f59e0b" };
  if (title.includes("legal") || title.includes("law")) return { primary: "#475569", accent: "#94a3b8" };
  if (title.includes("finance") || title.includes("bank") || title.includes("account")) return { primary: "#1e3a5f", accent: "#f59e0b" };
  if (title.includes("creative") || title.includes("design")) return { primary: "#7c3aed", accent: "#f472b6" };
  if (title.includes("tech") || title.includes("engineer") || title.includes("developer")) return { primary: "#2563eb", accent: "#06b6d4" };
  if (company.includes("consult")) return { primary: "#475569", accent: "#f59e0b" };

  return { primary: "#2563eb", accent: "#f59e0b" }; // Default blue
}

export default function AISignatureGenerator({ onGenerate }: AISignatureGeneratorProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setLoading(true);

    // Simulate brief processing delay for UX
    setTimeout(() => {
      const parsed = parseInput(input);
      const template = suggestTemplate(parsed);
      const colors = suggestColors(parsed);

      const data: SignatureData = {
        ...DEFAULT_SIGNATURE_DATA,
        ...parsed,
        fullName: parsed.fullName || DEFAULT_SIGNATURE_DATA.fullName,
        template,
        primaryColor: colors.primary,
        accentColor: colors.accent,
      };

      onGenerate(data);
      setGenerated(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <div>
            <h3 className="text-sm font-bold text-slate-800">AI Signature Generator</h3>
            <p className="text-[11px] text-slate-500">Paste your info and we&apos;ll create your signature instantly</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setGenerated(false); }}
          placeholder={"Paste any of these:\n• Your LinkedIn URL\n• Your name, title, company (each on a new line)\n• Your email signature from another tool\n• A business card text"}
          rows={5}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!input.trim() || loading}
          className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            generated
              ? "bg-emerald-500 text-white"
              : loading
                ? "bg-blue-400 text-white cursor-wait"
                : !input.trim()
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Generating...
            </>
          ) : generated ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              Generated! Edit below to customize.
            </>
          ) : (
            <>
              <span>✨</span>
              Generate My Signature
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          Your data stays in your browser. We don&apos;t store or send anything.
        </div>
      </div>
    </div>
  );
}
