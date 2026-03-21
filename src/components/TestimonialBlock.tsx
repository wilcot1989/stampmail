"use client";

import { useState } from "react";
import { SignatureData } from "@/lib/types";

interface TestimonialBlockProps {
  data: SignatureData;
  plan: "free" | "pro" | "team";
  onDataChange: (d: SignatureData) => void;
}

const PRESETS = [
  { label: "Google Reviews", template: "★★★★★ Rated {rating} on Google ({count} reviews)", defaultRating: "4.9", defaultCount: "127" },
  { label: "Trustpilot", template: "★★★★★ Rated {rating}/5 on Trustpilot", defaultRating: "4.8", defaultCount: "" },
  { label: "Client Quote", template: "\"{quote}\" — {author}", defaultRating: "", defaultCount: "" },
  { label: "Award", template: "🏆 {award}", defaultRating: "", defaultCount: "" },
  { label: "Custom", template: "{custom}", defaultRating: "", defaultCount: "" },
];

export default function TestimonialBlock({ data, plan, onDataChange }: TestimonialBlockProps) {
  const isPro = plan === "pro" || plan === "team";
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [rating, setRating] = useState("4.9");
  const [count, setCount] = useState("127");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [award, setAward] = useState("");
  const [custom, setCustom] = useState("");
  const [enabled, setEnabled] = useState(false);

  if (!isPro) {
    return (
      <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">⭐</span>
          <h3 className="text-xs font-bold text-amber-800">Social Proof Block</h3>
          <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">PRO</span>
        </div>
        <p className="text-[11px] text-amber-700">Add a testimonial, review rating, or award below your signature. Proven to increase trust and response rates.</p>
      </div>
    );
  }

  const generateText = () => {
    const preset = PRESETS[selectedPreset];
    let text = preset.template;
    text = text.replace("{rating}", rating);
    text = text.replace("{count}", count);
    text = text.replace("{quote}", quote);
    text = text.replace("{author}", author);
    text = text.replace("{award}", award);
    text = text.replace("{custom}", custom);
    return text;
  };

  const handleApply = () => {
    const text = generateText();
    // We'll store the testimonial in the disclaimer field with a special prefix
    // The renderer will display it differently based on the prefix
    onDataChange({ ...data, disclaimer: enabled ? `[testimonial]${text}` : data.disclaimer });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">⭐</span>
          <h3 className="text-sm font-bold text-slate-800">Social Proof Block</h3>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => { setEnabled(!enabled); if (!enabled) handleApply(); }}
          className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${enabled ? "bg-blue-600" : "bg-slate-300"}`}
        >
          <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform mt-0.5 ${enabled ? "translate-x-4 ml-0.5" : "translate-x-0.5"}`} />
        </button>
      </div>

      {enabled && (
        <div className="p-4 space-y-3">
          {/* Preset selector */}
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedPreset(i)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  selectedPreset === i ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Fields based on preset */}
          <div className="space-y-2">
            {selectedPreset <= 1 && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Rating</label>
                  <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="4.9" className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
                </div>
                {selectedPreset === 0 && (
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Review count</label>
                    <input type="text" value={count} onChange={(e) => setCount(e.target.value)} placeholder="127" className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
                  </div>
                )}
              </div>
            )}

            {selectedPreset === 2 && (
              <>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Quote</label>
                  <input type="text" value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Working with them was incredible..." className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Author</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Sarah, CEO of Acme" className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
                </div>
              </>
            )}

            {selectedPreset === 3 && (
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Award</label>
                <input type="text" value={award} onChange={(e) => setAward(e.target.value)} placeholder="Best SaaS Tool 2026 — Product Hunt" className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
              </div>
            )}

            {selectedPreset === 4 && (
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Custom text</label>
                <input type="text" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Your custom social proof text..." className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2">
            <p className="text-xs text-slate-600 italic">{generateText()}</p>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="w-full rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Apply to Signature
          </button>
        </div>
      )}
    </div>
  );
}
