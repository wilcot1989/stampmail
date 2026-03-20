"use client";

import { useState, useRef } from "react";
import { SignatureData, WrapperSettings, DEFAULT_WRAPPER_SETTINGS } from "@/lib/types";
import { generateHtmlFromBlocks, Block, SOCIAL_ICON_URLS, SOCIAL_LABELS } from "@/lib/blocks";
import { GenerateOptions } from "@/lib/generateSignature";
import { copySignatureToClipboard } from "@/lib/clipboard";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SignatureEditorProps {
  blocks: Block[];
  data: SignatureData;
  wrapperSettings: WrapperSettings;
  plan: "free" | "pro" | "team";
  onBlocksChange: (blocks: Block[]) => void;
  onDataChange: (data: SignatureData) => void;
  onWrapperSettingsChange: (ws: WrapperSettings) => void;
}

// ---------------------------------------------------------------------------
// Small form controls
// ---------------------------------------------------------------------------

function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-slate-500 mb-0.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
      />
    </div>
  );
}

function Section({ title, icon, children, defaultOpen = true }: {
  title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors select-none">
        <span>{icon}</span>
        <span className="flex-1">{title}</span>
        <svg className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
      </summary>
      <div className="mt-2 space-y-2.5 px-1 pb-1">{children}</div>
    </details>
  );
}

// ---------------------------------------------------------------------------
// Photo upload section
// ---------------------------------------------------------------------------

function PhotoUpload({ data, onDataChange, photoBlock, onBlockSettingsChange }: {
  data: SignatureData;
  onDataChange: (d: SignatureData) => void;
  photoBlock: Block | undefined;
  onBlockSettingsChange: (id: string, s: Record<string, unknown>) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const s = photoBlock?.settings ?? {};
  const size = Number(s.size ?? 80);
  const shape = String(s.shape ?? "circle");
  const borderWidth = Number(s.borderWidth ?? 0);
  const borderColor = String(s.borderColor ?? "#2563eb");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Max 2MB"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 200; canvas.height = 200;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const min = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, 200, 200);
        onDataChange({ ...data, photoUrl: canvas.toDataURL("image/jpeg", 0.85) });
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const set = (key: string, val: unknown) => {
    if (!photoBlock) return;
    onBlockSettingsChange(photoBlock.id, { ...s, [key]: val });
  };

  return (
    <div className="space-y-2.5">
      {data.photoUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={data.photoUrl}
            alt="Photo"
            className="object-cover border border-slate-200"
            style={{
              width: 56, height: 56,
              borderRadius: shape === "circle" ? "50%" : shape === "rounded" ? "8px" : "0px",
            }}
          />
          <div className="flex gap-2">
            <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">Change</button>
            <button onClick={() => onDataChange({ ...data, photoUrl: "" })} className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100">Remove</button>
          </div>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-5 text-sm text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors">
          Click to upload photo
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

      {photoBlock && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-500">Size</label>
            <input type="range" min={40} max={120} value={size} onChange={(e) => set("size", Number(e.target.value))} className="w-full accent-blue-600 h-1" />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Shape</label>
            <div className="flex gap-1">
              {(["circle", "rounded", "square"] as const).map((sh) => (
                <button key={sh} onClick={() => set("shape", sh)} className={`flex-1 px-1 py-0.5 text-[10px] rounded ${shape === sh ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{sh}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Border</label>
            <input type="range" min={0} max={5} value={borderWidth} onChange={(e) => set("borderWidth", Number(e.target.value))} className="w-full accent-blue-600 h-1" />
          </div>
          {borderWidth > 0 && (
            <div>
              <label className="text-[10px] text-slate-500">Border color</label>
              <input type="color" value={borderColor} onChange={(e) => set("borderColor", e.target.value)} className="h-6 w-full rounded border cursor-pointer" />
            </div>
          )}
          <div>
            <label className="text-[10px] text-slate-500">Position</label>
            <div className="flex gap-1">
              {(["left", "right"] as const).map((p) => (
                <button key={p} onClick={() => set("position", p)} className={`flex-1 px-1 py-0.5 text-[10px] rounded ${String(s.position ?? "left") === p ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{p === "left" ? "← Left" : "Right →"}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Style controls
// ---------------------------------------------------------------------------

function StyleControls({ blocks, wrapperSettings: ws, onBlockSettingsChange, onWrapperChange }: {
  blocks: Block[];
  wrapperSettings: WrapperSettings;
  onBlockSettingsChange: (id: string, s: Record<string, unknown>) => void;
  onWrapperChange: (ws: WrapperSettings) => void;
}) {
  const nameBlock = blocks.find((b) => b.type === "name");
  const contactBlock = blocks.find((b) => b.type === "contact");
  const dividerBlock = blocks.find((b) => b.type === "divider");
  const ns = nameBlock?.settings ?? {};
  const cs = contactBlock?.settings ?? {};
  const ds = dividerBlock?.settings ?? {};

  const setName = (key: string, val: unknown) => nameBlock && onBlockSettingsChange(nameBlock.id, { ...ns, [key]: val });
  const setContact = (key: string, val: unknown) => contactBlock && onBlockSettingsChange(contactBlock.id, { ...cs, [key]: val });
  const setDivider = (key: string, val: unknown) => dividerBlock && onBlockSettingsChange(dividerBlock.id, { ...ds, [key]: val });

  return (
    <div className="space-y-3">
      {/* Font family */}
      <div>
        <label className="text-[10px] text-slate-500">Font</label>
        <select
          value={ws.fontFamily}
          onChange={(e) => onWrapperChange({ ...ws, fontFamily: e.target.value })}
          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="Arial,Helvetica,sans-serif">Arial</option>
          <option value="Georgia,'Times New Roman',serif">Georgia</option>
          <option value="'Courier New',Courier,monospace">Courier New</option>
          <option value="Verdana,Geneva,sans-serif">Verdana</option>
          <option value="Tahoma,Geneva,sans-serif">Tahoma</option>
          <option value="'Trebuchet MS',Helvetica,sans-serif">Trebuchet MS</option>
        </select>
      </div>

      {/* Name styling */}
      {nameBlock && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-500">Name color</label>
            <input type="color" value={String(ns.nameColor ?? "#1a1a1a")} onChange={(e) => setName("nameColor", e.target.value)} className="h-6 w-full rounded border cursor-pointer" />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Name size</label>
            <input type="range" min={12} max={28} value={Number(ns.nameSize ?? 16)} onChange={(e) => setName("nameSize", Number(e.target.value))} className="w-full accent-blue-600 h-1" />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Title color</label>
            <input type="color" value={String(ns.titleColor ?? "#555555")} onChange={(e) => setName("titleColor", e.target.value)} className="h-6 w-full rounded border cursor-pointer" />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Weight</label>
            <div className="flex gap-1">
              {(["300", "normal", "bold"] as const).map((w) => (
                <button key={w} onClick={() => setName("nameWeight", w)} className={`flex-1 px-1 py-0.5 text-[10px] rounded ${String(ns.nameWeight ?? "bold") === w ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {w === "300" ? "Light" : w === "normal" ? "Reg" : "Bold"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact link color */}
      {contactBlock && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-500">Link color</label>
            <input type="color" value={String(cs.linkColor ?? "#2563eb")} onChange={(e) => setContact("linkColor", e.target.value)} className="h-6 w-full rounded border cursor-pointer" />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Contact layout</label>
            <select
              value={String(cs.layout ?? "stacked")}
              onChange={(e) => setContact("layout", e.target.value)}
              className="w-full rounded border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-700"
            >
              <option value="stacked">Stacked</option>
              <option value="inline-pipes">Inline |</option>
              <option value="inline-middot">Inline ·</option>
              <option value="stacked-labeled">With labels</option>
              <option value="stacked-emoji">With emoji</option>
            </select>
          </div>
        </div>
      )}

      {/* Divider */}
      {dividerBlock && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-500">Divider color</label>
            <input type="color" value={String(ds.color ?? "#2563eb")} onChange={(e) => setDivider("color", e.target.value)} className="h-6 w-full rounded border cursor-pointer" />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Divider style</label>
            <div className="flex gap-1">
              {(["solid", "dashed", "dotted"] as const).map((st) => (
                <button key={st} onClick={() => setDivider("style", st)} className={`flex-1 px-1 py-0.5 text-[10px] rounded ${String(ds.style ?? "solid") === st ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>{st}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Thickness</label>
            <input type="range" min={1} max={5} value={Number(ds.thickness ?? 2)} onChange={(e) => setDivider("thickness", Number(e.target.value))} className="w-full accent-blue-600 h-1" />
          </div>
          <div>
            <label className="text-[10px] text-slate-500">Width</label>
            <input type="range" min={20} max={100} value={Number(ds.width ?? 100)} onChange={(e) => setDivider("width", Number(e.target.value))} className="w-full accent-blue-600 h-1" />
          </div>
        </div>
      )}

      {/* Background */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-slate-500">Background</label>
          <div className="flex items-center gap-1">
            <input
              type="color"
              value={ws.backgroundColor !== "none" ? ws.backgroundColor : "#ffffff"}
              onChange={(e) => onWrapperChange({ ...ws, backgroundColor: e.target.value, backgroundRadius: 8, backgroundPadding: 16 })}
              className="h-6 w-8 rounded border cursor-pointer"
            />
            {ws.backgroundColor !== "none" && (
              <button onClick={() => onWrapperChange({ ...ws, backgroundColor: "none", backgroundPadding: 0, backgroundRadius: 0, textOnDark: false })} className="text-[10px] text-red-500">&times;</button>
            )}
          </div>
        </div>
        {ws.backgroundColor !== "none" && (
          <div>
            <label className="text-[10px] text-slate-500">Light text</label>
            <label className="flex items-center gap-1.5 mt-1">
              <input type="checkbox" checked={ws.textOnDark} onChange={(e) => onWrapperChange({ ...ws, textOnDark: e.target.checked })} className="accent-blue-600 h-3 w-3" />
              <span className="text-[10px] text-slate-600">For dark bg</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Social media fields
// ---------------------------------------------------------------------------

function SocialFields({ data, onDataChange, plan }: {
  data: SignatureData; onDataChange: (d: SignatureData) => void; plan: "free" | "pro" | "team";
}) {
  const isPro = plan === "pro" || plan === "team";
  const socialFields: { key: keyof SignatureData; label: string; placeholder: string; icon: string }[] = [
    { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/...", icon: "linkedin" },
    { key: "twitter", label: "X (Twitter)", placeholder: "https://x.com/...", icon: "twitter" },
    { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/...", icon: "instagram" },
    { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/...", icon: "facebook" },
    { key: "github", label: "GitHub", placeholder: "https://github.com/...", icon: "github" },
    { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@...", icon: "youtube" },
  ];

  return (
    <div className="space-y-2">
      {socialFields.map((f, i) => {
        const locked = !isPro && i >= 2 && !data[f.key];
        if (locked) {
          return (
            <div key={f.key} className="flex items-center justify-between rounded-lg border border-dashed border-amber-200 bg-amber-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <img src={SOCIAL_ICON_URLS[f.icon]} alt={f.label} className="h-4 w-4 opacity-50" />
                <span className="text-[11px] text-amber-700">{f.label}</span>
              </div>
              <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">PRO</span>
            </div>
          );
        }
        return (
          <div key={f.key} className="flex items-center gap-2">
            <img src={SOCIAL_ICON_URLS[f.icon]} alt={f.label} className="h-4 w-4" />
            <input
              type="text"
              value={String(data[f.key] ?? "")}
              onChange={(e) => onDataChange({ ...data, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live Preview — email chrome + rendered signature
// ---------------------------------------------------------------------------

function LivePreview({ blocks, data, wrapperSettings, plan }: {
  blocks: Block[]; data: SignatureData; wrapperSettings: WrapperSettings; plan: "free" | "pro" | "team";
}) {
  const options: GenerateOptions = { plan };
  const html = generateHtmlFromBlocks(blocks, data, wrapperSettings, options);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Email chrome */}
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <span className="ml-2 text-xs text-slate-400 font-medium">New Message</span>
      </div>
      <div className="border-b border-slate-100 px-4 py-1.5">
        <span className="text-xs text-slate-400">To: </span>
        <span className="text-xs text-slate-600">recipient@company.com</span>
      </div>
      <div className="border-b border-slate-100 px-4 py-1.5">
        <span className="text-xs text-slate-400">Subject: </span>
        <span className="text-xs text-slate-600">Quick follow up</span>
      </div>
      {/* Email body */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-sm text-slate-500 leading-relaxed">Hi there,</p>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">Just wanted to follow up on our conversation. Let me know if you have any questions.</p>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">Best regards,</p>
      </div>
      {/* Signature */}
      <div className="px-4 pb-4">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main SignatureEditor component
// ---------------------------------------------------------------------------

export default function SignatureEditor({
  blocks,
  data,
  wrapperSettings,
  plan,
  onBlocksChange,
  onDataChange,
  onWrapperSettingsChange,
}: SignatureEditorProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [sigId] = useState(() => typeof crypto !== "undefined" ? crypto.randomUUID() : "temp");
  const ws = wrapperSettings ?? DEFAULT_WRAPPER_SETTINGS;

  const updateBlockSettings = (blockId: string, newSettings: Record<string, unknown>) => {
    onBlocksChange(blocks.map((b) => b.id === blockId ? { ...b, settings: newSettings } : b));
  };

  const photoBlock = blocks.find((b) => b.type === "photo" && b.visible);

  const handleCopy = async () => {
    const options: GenerateOptions = { plan, signatureId: sigId };
    let html = generateHtmlFromBlocks(blocks, data, ws, options);

    if (data.photoUrl && data.photoUrl.startsWith("data:")) {
      try {
        await fetch("/api/signatures/free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: sigId, data, template: data.template }),
        });
        const res = await fetch(data.photoUrl);
        const blob = await res.blob();
        const formData = new FormData();
        formData.append("file", blob, "photo.jpg");
        formData.append("signature_id", sigId);
        const uploadRes = await fetch("/api/images/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json() as { url?: string };
        if (uploadData.url) {
          html = html.replace(/src="data:image[^"]*"/g, `src="${uploadData.url}"`);
        }
      } catch { /* continue */ }
    }

    const ok = await copySignatureToClipboard(html);
    setCopyState(ok ? "copied" : "error");
    setTimeout(() => setCopyState("idle"), 3000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* LEFT: Form */}
      <div className="lg:col-span-2 space-y-3">
        <Section title="Personal Info" icon="👤" defaultOpen={true}>
          <Field label="Full Name" value={data.fullName} onChange={(v) => onDataChange({ ...data, fullName: v })} placeholder="John Doe" />
          <Field label="Job Title" value={data.jobTitle} onChange={(v) => onDataChange({ ...data, jobTitle: v })} placeholder="Marketing Manager" />
          <Field label="Company" value={data.company} onChange={(v) => onDataChange({ ...data, company: v })} placeholder="Acme Corp" />
          <Field label="Pronouns" value={data.pronouns} onChange={(v) => onDataChange({ ...data, pronouns: v })} placeholder="he/him" />
        </Section>

        <Section title="Contact" icon="📞" defaultOpen={true}>
          <Field label="Email" value={data.email} onChange={(v) => onDataChange({ ...data, email: v })} placeholder="john@company.com" type="email" />
          <Field label="Phone" value={data.phone} onChange={(v) => onDataChange({ ...data, phone: v })} placeholder="+1 (555) 123-4567" type="tel" />
          <Field label="Website" value={data.website} onChange={(v) => onDataChange({ ...data, website: v })} placeholder="www.company.com" />
          <Field label="Address" value={data.address} onChange={(v) => onDataChange({ ...data, address: v })} placeholder="123 Main St, New York" />
        </Section>

        <Section title="Photo" icon="🖼️" defaultOpen={false}>
          <PhotoUpload data={data} onDataChange={onDataChange} photoBlock={photoBlock} onBlockSettingsChange={updateBlockSettings} />
        </Section>

        <Section title="Social Media" icon="🔗" defaultOpen={false}>
          <SocialFields data={data} onDataChange={onDataChange} plan={plan} />
        </Section>

        <Section title="Styling" icon="🎨" defaultOpen={false}>
          <StyleControls blocks={blocks} wrapperSettings={ws} onBlockSettingsChange={updateBlockSettings} onWrapperChange={onWrapperSettingsChange} />
        </Section>
      </div>

      {/* RIGHT: Live Preview + Copy */}
      <div className="lg:col-span-3">
        <div className="sticky top-20 space-y-3">
          <LivePreview blocks={blocks} data={data} wrapperSettings={ws} plan={plan} />

          <button
            type="button"
            onClick={handleCopy}
            className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${
              copyState === "copied"
                ? "bg-emerald-500 text-white"
                : copyState === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {copyState === "copied" ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                Copied! Paste in your email client
              </>
            ) : copyState === "error" ? "Copy failed — try again" : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                Copy Signature
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-slate-400">Works in Gmail, Outlook, Apple Mail & Yahoo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
