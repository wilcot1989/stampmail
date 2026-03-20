"use client";

import { useState, useRef, useCallback } from "react";
import { Block, SOCIAL_LABELS, SOCIAL_ICON_URLS, SOCIAL_FIELDS } from "@/lib/blocks";
import { SignatureData, WrapperSettings } from "@/lib/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EditableSignatureProps {
  blocks: Block[];
  data: SignatureData;
  wrapperSettings: WrapperSettings;
  plan: "free" | "pro" | "team";
  onBlocksChange: (blocks: Block[]) => void;
  onDataChange: (data: SignatureData) => void;
  onWrapperSettingsChange: (ws: WrapperSettings) => void;
}

type SelectedBlock = string | null; // block ID

// ---------------------------------------------------------------------------
// Floating Toolbar
// ---------------------------------------------------------------------------

function FloatingToolbar({
  block,
  wrapperSettings,
  onSettingsChange,
  onWrapperChange,
  onClose,
  position,
}: {
  block: Block;
  wrapperSettings: WrapperSettings;
  onSettingsChange: (s: Record<string, unknown>) => void;
  onWrapperChange: (ws: WrapperSettings) => void;
  onClose: () => void;
  position: { top: number; left: number };
}) {
  const s = block.settings;
  const set = (key: string, val: unknown) => onSettingsChange({ ...s, [key]: val });

  return (
    <div
      className="fixed z-50 rounded-xl border border-slate-200 bg-white shadow-2xl p-3 min-w-[220px] max-w-[320px]"
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{block.type}</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">&times;</button>
      </div>

      {block.type === "photo" && (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Size</span>
            <input type="range" min={40} max={120} value={Number(s.size ?? 80)} onChange={(e) => set("size", Number(e.target.value))} className="flex-1 accent-blue-600" />
            <span className="text-slate-400 w-8 text-right">{String(s.size ?? 80)}</span>
          </label>
          <div className="flex gap-1">
            {(["circle", "rounded", "square"] as const).map((shape) => (
              <button key={shape} onClick={() => set("shape", shape)} className={`px-2 py-1 text-[10px] rounded ${s.shape === shape ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {shape}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Border</span>
            <input type="range" min={0} max={4} value={Number(s.borderWidth ?? 0)} onChange={(e) => set("borderWidth", Number(e.target.value))} className="flex-1 accent-blue-600" />
          </label>
          {Number(s.borderWidth ?? 0) > 0 && (
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <span>Color</span>
              <input type="color" value={String(s.borderColor ?? "#2563eb")} onChange={(e) => set("borderColor", e.target.value)} className="h-6 w-6 rounded border cursor-pointer" />
            </label>
          )}
        </div>
      )}

      {block.type === "name" && (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Size</span>
            <input type="range" min={12} max={28} value={Number(s.nameSize ?? 16)} onChange={(e) => set("nameSize", Number(e.target.value))} className="flex-1 accent-blue-600" />
            <span className="text-slate-400 w-8 text-right">{String(s.nameSize ?? 16)}</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Name</span>
            <input type="color" value={String(s.nameColor ?? "#1a1a1a")} onChange={(e) => set("nameColor", e.target.value)} className="h-6 w-6 rounded border cursor-pointer" />
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Title</span>
            <input type="color" value={String(s.titleColor ?? "#555555")} onChange={(e) => set("titleColor", e.target.value)} className="h-6 w-6 rounded border cursor-pointer" />
          </label>
          <div className="flex gap-1">
            {(["300", "normal", "bold"] as const).map((w) => (
              <button key={w} onClick={() => set("nameWeight", w)} className={`px-2 py-1 text-[10px] rounded ${s.nameWeight === w ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {w === "300" ? "Light" : w === "normal" ? "Regular" : "Bold"}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {(["normal", "italic"] as const).map((fs) => (
              <button key={fs} onClick={() => set("titleFontStyle", fs)} className={`px-2 py-1 text-[10px] rounded ${s.titleFontStyle === fs ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {fs === "normal" ? "Normal" : "Italic"}
              </button>
            ))}
            {(["none", "uppercase"] as const).map((t) => (
              <button key={t} onClick={() => set("titleTransform", t)} className={`px-2 py-1 text-[10px] rounded ${s.titleTransform === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {t === "none" ? "Normal" : "UPPER"}
              </button>
            ))}
          </div>
        </div>
      )}

      {block.type === "contact" && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {([
              ["stacked", "Stack"],
              ["inline-pipes", "Inline |"],
              ["inline-middot", "Inline ·"],
              ["stacked-labeled", "Labels"],
              ["stacked-emoji", "Emoji"],
            ] as const).map(([val, label]) => (
              <button key={val} onClick={() => set("layout", val)} className={`px-2 py-1 text-[10px] rounded ${s.layout === val ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Links</span>
            <input type="color" value={String(s.linkColor ?? "#2563eb")} onChange={(e) => set("linkColor", e.target.value)} className="h-6 w-6 rounded border cursor-pointer" />
          </label>
        </div>
      )}

      {block.type === "divider" && (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Color</span>
            <input type="color" value={String(s.color ?? "#2563eb")} onChange={(e) => set("color", e.target.value)} className="h-6 w-6 rounded border cursor-pointer" />
          </label>
          <div className="flex gap-1">
            {(["solid", "dashed", "dotted"] as const).map((st) => (
              <button key={st} onClick={() => set("style", st)} className={`px-2 py-1 text-[10px] rounded ${s.style === st ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                {st}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Thick</span>
            <input type="range" min={1} max={4} value={Number(s.thickness ?? 2)} onChange={(e) => set("thickness", Number(e.target.value))} className="flex-1 accent-blue-600" />
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Width</span>
            <input type="range" min={20} max={100} value={Number(s.width ?? 100)} onChange={(e) => set("width", Number(e.target.value))} className="flex-1 accent-blue-600" />
            <span className="text-slate-400 w-8 text-right">{String(s.width ?? 100)}%</span>
          </label>
        </div>
      )}

      {block.type === "social" && (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Size</span>
            <input type="range" min={14} max={32} value={Number(s.iconSize ?? 20)} onChange={(e) => set("iconSize", Number(e.target.value))} className="flex-1 accent-blue-600" />
            <span className="text-slate-400 w-8 text-right">{String(s.iconSize ?? 20)}</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>Gap</span>
            <input type="range" min={2} max={16} value={Number(s.spacing ?? 8)} onChange={(e) => set("spacing", Number(e.target.value))} className="flex-1 accent-blue-600" />
          </label>
        </div>
      )}

      {/* Wrapper/global settings for background templates */}
      {(block.type === "name" || block.type === "photo") && (
        <div className="mt-2 pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Background</span>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <span>BG</span>
            <input
              type="color"
              value={wrapperSettings.backgroundColor === "none" ? "#ffffff" : wrapperSettings.backgroundColor}
              onChange={(e) => onWrapperChange({ ...wrapperSettings, backgroundColor: e.target.value, backgroundRadius: 8, backgroundPadding: 16 })}
              className="h-6 w-6 rounded border cursor-pointer"
            />
            {wrapperSettings.backgroundColor !== "none" && (
              <button onClick={() => onWrapperChange({ ...wrapperSettings, backgroundColor: "none", backgroundPadding: 0, backgroundRadius: 0, textOnDark: false })} className="text-[10px] text-red-500">Remove</button>
            )}
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600">
            <input type="checkbox" checked={wrapperSettings.textOnDark} onChange={(e) => onWrapperChange({ ...wrapperSettings, textOnDark: e.target.checked })} className="accent-blue-600" />
            <span>Light text (dark bg)</span>
          </label>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline editable text
// ---------------------------------------------------------------------------

function InlineEdit({
  value,
  onChange,
  style,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [editing, setEditing] = useState(false);

  const handleBlur = () => {
    setEditing(false);
    if (ref.current) {
      const text = ref.current.textContent || "";
      if (text !== value) onChange(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={style}
      className={`outline-none cursor-text ${editing ? "ring-2 ring-blue-400 ring-offset-1 rounded px-0.5" : "hover:ring-1 hover:ring-blue-300 hover:ring-offset-1 rounded"} ${className} ${!value ? "text-slate-300" : ""}`}
    >
      {value || placeholder}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Drag & drop within the preview
// ---------------------------------------------------------------------------

function DragHandle({ onDragStart }: { onDragStart: (e: React.MouseEvent) => void }) {
  return (
    <div
      onMouseDown={onDragStart}
      className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
    >
      <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
        <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
        <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Block renderers as React components (visual match to HTML output)
// ---------------------------------------------------------------------------

function PhotoBlock({
  block,
  data,
  selected,
  onSelect,
  onDataChange,
}: {
  block: Block;
  data: SignatureData;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDataChange: (d: SignatureData) => void;
}) {
  const s = block.settings;
  const size = Number(s.size ?? 80);
  const shape = String(s.shape ?? "circle");
  const borderWidth = Number(s.borderWidth ?? 0);
  const borderColor = String(s.borderColor ?? "#2563eb");
  const borderRadius = shape === "circle" ? "50%" : shape === "rounded" ? "8px" : shape === "near-square" ? "4px" : "0px";

  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
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

  if (!data.photoUrl) {
    return (
      <div onClick={() => fileRef.current?.click()} className="cursor-pointer hover:opacity-80 transition-opacity" style={{ width: size, height: size }}>
        <div
          className="bg-slate-100 flex items-center justify-center text-slate-400 text-xs"
          style={{ width: size, height: size, borderRadius, border: `2px dashed #cbd5e1` }}
        >
          + Photo
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </div>
    );
  }

  return (
    <div onClick={onSelect} className={`cursor-pointer ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded" : ""}`}>
      <img
        src={data.photoUrl}
        alt={data.fullName}
        style={{
          width: size,
          height: size,
          borderRadius,
          objectFit: "cover",
          display: "block",
          border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
        }}
      />
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
    </div>
  );
}

function NameBlock({
  block,
  data,
  ws,
  selected,
  onSelect,
  onDataChange,
}: {
  block: Block;
  data: SignatureData;
  ws: WrapperSettings;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDataChange: (d: SignatureData) => void;
}) {
  const s = block.settings;
  const nameSize = Number(s.nameSize ?? 16);
  const nameWeight = String(s.nameWeight ?? "bold");
  const nameColor = String(s.nameColor ?? "#1a1a1a");
  const nameLetterSpacing = String(s.nameLetterSpacing ?? "");
  const showTitle = s.showTitle !== false;
  const titleSize = Number(s.titleSize ?? 13);
  const titleColor = String(s.titleColor ?? "#555555");
  const titleTransform = String(s.titleTransform ?? "none") as "none" | "uppercase";
  const titleFontStyle = String(s.titleFontStyle ?? "normal") as "normal" | "italic";
  const showCompany = s.showCompany !== false;
  const companyColor = String(s.companyColor ?? "#555555");
  const showPronouns = s.showPronouns !== false;
  const fontFamily = ws.fontFamily || "Arial,Helvetica,sans-serif";

  return (
    <div onClick={onSelect} className={`cursor-pointer ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded" : ""}`}>
      <table cellPadding={0} cellSpacing={0} style={{ fontFamily }}>
        <tbody>
          <tr>
            <td>
              <InlineEdit
                value={data.fullName}
                onChange={(v) => onDataChange({ ...data, fullName: v })}
                placeholder="Your Name"
                style={{ fontSize: nameSize, fontWeight: nameWeight, color: nameColor, letterSpacing: nameLetterSpacing || undefined, display: "inline" }}
              />
              {showPronouns && data.pronouns && (
                <span style={{ fontSize: 12, fontWeight: "normal", color: "#888", marginLeft: 4 }}>
                  (<InlineEdit value={data.pronouns} onChange={(v) => onDataChange({ ...data, pronouns: v })} style={{ fontSize: 12, color: "#888" }} placeholder="pronouns" />)
                </span>
              )}
            </td>
          </tr>
          {showTitle && (
            <tr>
              <td style={{ paddingTop: 2 }}>
                <InlineEdit
                  value={data.jobTitle}
                  onChange={(v) => onDataChange({ ...data, jobTitle: v })}
                  placeholder="Job Title"
                  style={{ fontSize: titleSize, color: titleColor, textTransform: titleTransform, fontStyle: titleFontStyle, letterSpacing: titleTransform === "uppercase" ? "0.5px" : undefined }}
                />
                {showCompany && String(s.companyDisplay ?? "merged-title") === "merged-title" && data.company && (
                  <span style={{ fontSize: titleSize, color: companyColor }}> at <InlineEdit value={data.company} onChange={(v) => onDataChange({ ...data, company: v })} style={{ fontSize: titleSize, color: companyColor }} placeholder="Company" /></span>
                )}
              </td>
            </tr>
          )}
          {showCompany && String(s.companyDisplay ?? "merged-title") !== "merged-title" && String(s.companyDisplay) !== "inline-name" && (
            <tr>
              <td style={{ paddingTop: 1 }}>
                <InlineEdit
                  value={data.company}
                  onChange={(v) => onDataChange({ ...data, company: v })}
                  placeholder="Company"
                  style={{
                    fontSize: 13,
                    color: companyColor,
                    fontWeight: String(s.companyDisplay) === "separate-bold" ? "bold" : "normal",
                    textTransform: String(s.companyDisplay) === "separate-uppercase" ? "uppercase" : "none",
                    letterSpacing: String(s.companyDisplay) === "separate-uppercase" ? "1px" : undefined,
                  }}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ContactBlock({
  block,
  data,
  ws,
  selected,
  onSelect,
  onDataChange,
}: {
  block: Block;
  data: SignatureData;
  ws: WrapperSettings;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDataChange: (d: SignatureData) => void;
}) {
  const s = block.settings;
  const linkColor = String(s.linkColor ?? "#2563eb");
  const textColor = String(s.textColor ?? "#555555");
  const layout = String(s.layout ?? "stacked");
  const fontFamily = String(s.fontFamily ?? "") || ws.fontFamily || "Arial,Helvetica,sans-serif";

  const fields = [
    { key: "email" as keyof SignatureData, icon: "✉", label: "E" },
    { key: "phone" as keyof SignatureData, icon: "☎", label: "T" },
    { key: "website" as keyof SignatureData, icon: "🌐", label: "W" },
    { key: "address" as keyof SignatureData, icon: "📍", label: "A" },
  ].filter((f) => data[f.key]);

  const isInline = layout.startsWith("inline");
  const separator = layout === "inline-middot" ? " · " : layout === "inline-pipes" ? " | " : "";

  return (
    <div onClick={onSelect} className={`cursor-pointer ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded" : ""}`} style={{ fontFamily, fontSize: 12 }}>
      {isInline ? (
        <div>
          {fields.map((f, i) => (
            <span key={f.key}>
              {i > 0 && <span style={{ color: "#ccc" }}>{separator}</span>}
              <InlineEdit
                value={String(data[f.key])}
                onChange={(v) => onDataChange({ ...data, [f.key]: v })}
                style={{ color: f.key === "address" ? textColor : linkColor, textDecoration: "none" }}
              />
            </span>
          ))}
        </div>
      ) : (
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            {fields.map((f) => (
              <tr key={f.key}>
                <td style={{ paddingBottom: 2 }}>
                  {layout === "stacked-emoji" && <span style={{ marginRight: 4 }}>{f.icon}</span>}
                  {layout === "stacked-labeled" && <strong style={{ color: "#888", marginRight: 4 }}>{f.label}</strong>}
                  <InlineEdit
                    value={String(data[f.key])}
                    onChange={(v) => onDataChange({ ...data, [f.key]: v })}
                    style={{ color: f.key === "address" ? textColor : linkColor, textDecoration: "none" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function DividerBlock({
  block,
  selected,
  onSelect,
}: {
  block: Block;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}) {
  const s = block.settings;
  const color = String(s.color ?? "#2563eb");
  const style = String(s.style ?? "solid");
  const thickness = Number(s.thickness ?? 2);
  const width = Number(s.width ?? 100);

  if (style === "decorative") {
    return (
      <div onClick={onSelect} className={`cursor-pointer py-1 ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", width: `${width}%` }}>
          <div style={{ width: 40, height: 1, background: color }} />
          <div style={{ width: 8 }} />
          <div style={{ width: 8, height: 1, background: color }} />
        </div>
      </div>
    );
  }

  return (
    <div onClick={onSelect} className={`cursor-pointer py-1 ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded" : ""}`}>
      <div style={{ width: `${width}%`, borderTop: `${thickness}px ${style} ${color}` }} />
    </div>
  );
}

function SocialBlock({
  block,
  data,
  plan,
  selected,
  onSelect,
}: {
  block: Block;
  data: SignatureData;
  plan: "free" | "pro" | "team";
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}) {
  const s = block.settings;
  const iconSize = Number(s.iconSize ?? 20);
  const spacing = Number(s.spacing ?? 8);
  const subset = Boolean(s.subset);
  const isPro = plan === "pro" || plan === "team";
  const maxLinks = isPro ? 99 : 2;

  let fields = [...SOCIAL_FIELDS];
  if (subset) fields = ["linkedin", "twitter", "github"] as (keyof SignatureData)[];

  const links = fields.filter((f) => !!data[f]).slice(0, maxLinks);
  if (links.length === 0) return null;

  return (
    <div onClick={onSelect} className={`cursor-pointer flex items-center ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded" : ""}`}>
      {links.map((f) => (
        <img
          key={f}
          src={SOCIAL_ICON_URLS[f]}
          alt={SOCIAL_LABELS[f]}
          title={SOCIAL_LABELS[f]}
          style={{ width: iconSize, height: iconSize, marginRight: spacing, display: "block" }}
        />
      ))}
    </div>
  );
}

function SpacerBlock({ block }: { block: Block }) {
  const height = Number(block.settings.height ?? 8);
  return <div style={{ height }} />;
}

// ---------------------------------------------------------------------------
// Main EditableSignature component
// ---------------------------------------------------------------------------

export default function EditableSignature({
  blocks,
  data,
  wrapperSettings,
  plan,
  onBlocksChange,
  onDataChange,
  onWrapperSettingsChange,
}: EditableSignatureProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<SelectedBlock>(null);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dropIdx, setDropIdx] = useState<number | null>(null);

  const visibleBlocks = blocks.filter((b) => b.visible);
  const selectedBlock = visibleBlocks.find((b) => b.id === selectedBlockId) ?? null;

  const handleSelect = useCallback((blockId: string, e: React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
    setSelectedBlockId(blockId);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setToolbarPos({ top: rect.top - 10, left: rect.right + 12 });
  }, []);

  const handleDeselect = useCallback(() => {
    setSelectedBlockId(null);
  }, []);

  const updateBlockSettings = useCallback((blockId: string, newSettings: Record<string, unknown>) => {
    onBlocksChange(blocks.map((b) => b.id === blockId ? { ...b, settings: newSettings } : b));
  }, [blocks, onBlocksChange]);

  // Drag handlers
  const handleDragStart = useCallback((idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    setDragIdx(idx);

    const handleMove = (me: MouseEvent) => {
      if (!containerRef.current) return;
      const children = containerRef.current.querySelectorAll("[data-block-idx]");
      let closest = idx;
      let closestDist = Infinity;
      children.forEach((child) => {
        const i = Number(child.getAttribute("data-block-idx"));
        const rect = child.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(me.clientY - mid);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setDropIdx(closest);
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      setDragIdx(null);
      setDropIdx(null);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  }, []);

  // Reorder on drop
  const handleDrop = useCallback(() => {
    if (dragIdx === null || dropIdx === null || dragIdx === dropIdx) return;
    const visible = blocks.filter((b) => b.visible);
    const item = visible[dragIdx];
    const newVisible = visible.filter((_, i) => i !== dragIdx);
    newVisible.splice(dropIdx, 0, item);
    const hidden = blocks.filter((b) => !b.visible);
    onBlocksChange([...newVisible, ...hidden]);
    setDragIdx(null);
    setDropIdx(null);
  }, [dragIdx, dropIdx, blocks, onBlocksChange]);

  if (dragIdx !== null && dropIdx !== null && dragIdx !== dropIdx) {
    handleDrop();
  }

  // Photo is side-by-side?
  const photoBlock = visibleBlocks.find((b) => b.type === "photo");
  const photoPosition = photoBlock ? String(photoBlock.settings.position ?? "left") : "";
  const isSideBySide = photoBlock && (photoPosition === "left" || photoPosition === "right") && !!data.photoUrl;

  // Wrapper styles
  const ws = wrapperSettings;
  const outerStyle: React.CSSProperties = {
    fontFamily: ws.fontFamily || "Arial,Helvetica,sans-serif",
    fontSize: ws.baseFontSize || 14,
    color: ws.textOnDark ? "#ffffff" : "#333333",
    borderTop: ws.borderTop || undefined,
    paddingTop: ws.borderTop ? 12 : undefined,
    backgroundColor: ws.backgroundColor !== "none" ? ws.backgroundColor : undefined,
    borderRadius: ws.backgroundRadius || undefined,
    padding: ws.backgroundPadding || undefined,
  };

  // Render blocks
  const renderBlock = (block: Block, idx: number) => {
    const isSelected = selectedBlockId === block.id;
    const onSel = (e: React.MouseEvent) => handleSelect(block.id, e);

    return (
      <div
        key={block.id}
        data-block-idx={idx}
        className={`group relative ${dragIdx === idx ? "opacity-50" : ""} ${dropIdx === idx && dragIdx !== null && dragIdx !== idx ? "border-t-2 border-blue-500" : ""}`}
        style={{ paddingBottom: 4 }}
      >
        <DragHandle onDragStart={(e) => handleDragStart(idx, e)} />

        {block.type === "photo" && (
          <PhotoBlock block={block} data={data} selected={isSelected} onSelect={onSel} onDataChange={onDataChange} />
        )}
        {block.type === "name" && (
          <NameBlock block={block} data={data} ws={ws} selected={isSelected} onSelect={onSel} onDataChange={onDataChange} />
        )}
        {block.type === "contact" && (
          <ContactBlock block={block} data={data} ws={ws} selected={isSelected} onSelect={onSel} onDataChange={onDataChange} />
        )}
        {block.type === "divider" && (
          <DividerBlock block={block} selected={isSelected} onSelect={onSel} />
        )}
        {block.type === "social" && (
          <SocialBlock block={block} data={data} plan={plan} selected={isSelected} onSelect={onSel} />
        )}
        {block.type === "spacer" && <SpacerBlock block={block} />}
      </div>
    );
  };

  // Side-by-side layout
  const contentBlocks = isSideBySide ? visibleBlocks.filter((b) => b.type !== "photo") : visibleBlocks;
  const photoIdx = visibleBlocks.findIndex((b) => b.type === "photo");

  return (
    <div className="relative" onClick={handleDeselect}>
      <div
        ref={containerRef}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        style={outerStyle}
      >
        {isSideBySide && photoBlock ? (
          <div style={{ display: "flex", gap: 14, flexDirection: photoPosition === "right" ? "row-reverse" : "row" }}>
            <div style={{ flexShrink: 0 }}>
              {renderBlock(photoBlock, photoIdx)}
            </div>
            <div style={{ flex: 1, borderLeft: ws.borderLeft || undefined, paddingLeft: ws.borderLeft ? 14 : undefined }}>
              {contentBlocks.map((b, i) => renderBlock(b, visibleBlocks.indexOf(b)))}
            </div>
          </div>
        ) : (
          visibleBlocks.map((b, i) => renderBlock(b, i))
        )}
      </div>

      {/* Floating toolbar */}
      {selectedBlock && (
        <FloatingToolbar
          block={selectedBlock}
          wrapperSettings={wrapperSettings}
          onSettingsChange={(s) => updateBlockSettings(selectedBlock.id, s)}
          onWrapperChange={onWrapperSettingsChange}
          onClose={handleDeselect}
          position={toolbarPos}
        />
      )}
    </div>
  );
}
