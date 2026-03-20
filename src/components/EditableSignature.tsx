"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Block, SOCIAL_LABELS, SOCIAL_ICON_URLS, SOCIAL_FIELDS } from "@/lib/blocks";
import { SignatureData, WrapperSettings } from "@/lib/types";

// ---------------------------------------------------------------------------
// Props
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

// ---------------------------------------------------------------------------
// Inline editable text — click to edit, blur to save
// ---------------------------------------------------------------------------

function InlineEdit({
  value,
  onChange,
  style,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleBlur = () => {
    if (ref.current) {
      const text = ref.current.textContent || "";
      if (text !== value) onChange(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); (e.target as HTMLElement).blur(); }
  };

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
      style={{ ...style, outline: "none", cursor: "text", minWidth: 20, display: "inline-block" }}
      className="hover:ring-1 hover:ring-blue-300 hover:ring-offset-1 rounded focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
    >
      {value || placeholder || "..."}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Floating Toolbar — stopPropagation on all events to prevent closing
// ---------------------------------------------------------------------------

function FloatingToolbar({
  block,
  wrapperSettings,
  onSettingsChange,
  onWrapperChange,
  onClose,
}: {
  block: Block;
  wrapperSettings: WrapperSettings;
  onSettingsChange: (s: Record<string, unknown>) => void;
  onWrapperChange: (ws: WrapperSettings) => void;
  onClose: () => void;
}) {
  const s = block.settings;
  const set = (key: string, val: unknown) => onSettingsChange({ ...s, [key]: val });

  return (
    <div
      className="mt-3 rounded-xl border border-slate-200 bg-white shadow-lg p-3 w-full"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{block.type}</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-base leading-none px-1">&times;</button>
      </div>

      <div className="space-y-2.5">
        {block.type === "photo" && <>
          <ToolbarSlider label="Size" value={Number(s.size ?? 80)} min={40} max={120} unit="px" onChange={(v) => set("size", v)} />
          <ToolbarRadio label="Shape" value={String(s.shape ?? "circle")} options={[["circle","●"],["rounded","▢"],["square","■"]]} onChange={(v) => set("shape", v)} />
          <ToolbarSlider label="Border" value={Number(s.borderWidth ?? 0)} min={0} max={5} unit="px" onChange={(v) => set("borderWidth", v)} />
          {Number(s.borderWidth ?? 0) > 0 && <ToolbarColor label="Border color" value={String(s.borderColor ?? "#2563eb")} onChange={(v) => set("borderColor", v)} />}
          <ToolbarRadio label="Position" value={String(s.position ?? "left")} options={[["left","← Left"],["right","Right →"]]} onChange={(v) => set("position", v)} />
        </>}

        {block.type === "name" && <>
          <ToolbarSlider label="Name size" value={Number(s.nameSize ?? 16)} min={12} max={28} unit="px" onChange={(v) => set("nameSize", v)} />
          <ToolbarColor label="Name color" value={String(s.nameColor ?? "#1a1a1a")} onChange={(v) => set("nameColor", v)} />
          <ToolbarRadio label="Weight" value={String(s.nameWeight ?? "bold")} options={[["300","Light"],["normal","Normal"],["bold","Bold"]]} onChange={(v) => set("nameWeight", v)} />
          <ToolbarColor label="Title color" value={String(s.titleColor ?? "#555555")} onChange={(v) => set("titleColor", v)} />
          <ToolbarRadio label="Title style" value={String(s.titleFontStyle ?? "normal")} options={[["normal","Normal"],["italic","Italic"]]} onChange={(v) => set("titleFontStyle", v)} />
          <ToolbarRadio label="Transform" value={String(s.titleTransform ?? "none")} options={[["none","Normal"],["uppercase","UPPER"]]} onChange={(v) => set("titleTransform", v)} />
          <ToolbarColor label="Company" value={String(s.companyColor ?? "#555555")} onChange={(v) => set("companyColor", v)} />
        </>}

        {block.type === "contact" && <>
          <ToolbarRadio label="Layout" value={String(s.layout ?? "stacked")} options={[["stacked","Stack"],["inline-pipes","|"],["inline-middot","·"],["stacked-labeled","T/E"],["stacked-emoji","📧"]]} onChange={(v) => set("layout", v)} />
          <ToolbarColor label="Link color" value={String(s.linkColor ?? "#2563eb")} onChange={(v) => set("linkColor", v)} />
          <ToolbarColor label="Text color" value={String(s.textColor ?? "#555555")} onChange={(v) => set("textColor", v)} />
        </>}

        {block.type === "divider" && <>
          <ToolbarColor label="Color" value={String(s.color ?? "#2563eb")} onChange={(v) => set("color", v)} />
          <ToolbarRadio label="Style" value={String(s.style ?? "solid")} options={[["solid","───"],["dashed","- - -"],["dotted","···"]]} onChange={(v) => set("style", v)} />
          <ToolbarSlider label="Thickness" value={Number(s.thickness ?? 2)} min={1} max={5} unit="px" onChange={(v) => set("thickness", v)} />
          <ToolbarSlider label="Width" value={Number(s.width ?? 100)} min={20} max={100} unit="%" onChange={(v) => set("width", v)} />
        </>}

        {block.type === "social" && <>
          <ToolbarSlider label="Icon size" value={Number(s.iconSize ?? 20)} min={14} max={32} unit="px" onChange={(v) => set("iconSize", v)} />
          <ToolbarSlider label="Spacing" value={Number(s.spacing ?? 8)} min={2} max={16} unit="px" onChange={(v) => set("spacing", v)} />
        </>}

        {block.type === "spacer" && <>
          <ToolbarSlider label="Height" value={Number(s.height ?? 8)} min={2} max={32} unit="px" onChange={(v) => set("height", v)} />
        </>}

        {/* Background controls for any block */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[9px] font-bold text-slate-400 uppercase">Signature background</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="color"
              value={wrapperSettings.backgroundColor === "none" ? "#ffffff" : wrapperSettings.backgroundColor}
              onChange={(e) => onWrapperChange({ ...wrapperSettings, backgroundColor: e.target.value, backgroundRadius: 8, backgroundPadding: 16 })}
              className="h-6 w-6 rounded border border-slate-200 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">BG color</span>
            {wrapperSettings.backgroundColor !== "none" && (
              <button
                onClick={() => onWrapperChange({ ...wrapperSettings, backgroundColor: "none", backgroundPadding: 0, backgroundRadius: 0, textOnDark: false })}
                className="text-[10px] text-red-500 hover:text-red-700 ml-auto"
              >
                Clear
              </button>
            )}
          </div>
          {wrapperSettings.backgroundColor !== "none" && (
            <label className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
              <input
                type="checkbox"
                checked={wrapperSettings.textOnDark}
                onChange={(e) => onWrapperChange({ ...wrapperSettings, textOnDark: e.target.checked })}
                className="accent-blue-600 h-3 w-3"
              />
              Light text on dark background
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

// Mini toolbar controls
function ToolbarSlider({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }) {
  return (
    <label className="flex items-center gap-2 text-[11px] text-slate-600">
      <span className="w-14 shrink-0">{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-blue-600 h-1" />
      <span className="text-slate-400 w-10 text-right text-[10px]">{value}{unit}</span>
    </label>
  );
}

function ToolbarColor({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-2 text-[11px] text-slate-600">
      <span className="w-14 shrink-0">{label}</span>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-5 w-5 rounded border border-slate-200 cursor-pointer" />
      <span className="text-[10px] text-slate-400">{value}</span>
    </label>
  );
}

function ToolbarRadio({ label, value, options, onChange }: { label: string; value: string; options: string[][]; onChange: (v: string) => void }) {
  return (
    <div>
      <span className="text-[11px] text-slate-600 block mb-1">{label}</span>
      <div className="flex gap-1 flex-wrap">
        {options.map(([val, lbl]) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={`px-2 py-0.5 text-[10px] rounded transition-colors ${value === val ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Block renderers as React components
// ---------------------------------------------------------------------------

function PhotoBlock({ block, data, selected, onSelect, onDataChange }: {
  block: Block; data: SignatureData; selected: boolean;
  onSelect: (e: React.MouseEvent) => void; onDataChange: (d: SignatureData) => void;
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
      <div onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} className="cursor-pointer" style={{ width: size, height: size }}>
        <div className="bg-slate-100 flex items-center justify-center text-slate-400 text-xs hover:bg-slate-200 transition-colors"
          style={{ width: size, height: size, borderRadius, border: "2px dashed #cbd5e1" }}>+ Photo</div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </div>
    );
  }

  return (
    <div onClick={onSelect} className={`cursor-pointer transition-all ${selected ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-1 hover:ring-blue-300"}`} style={{ borderRadius, display: "inline-block" }}>
      <img src={data.photoUrl} alt={data.fullName} style={{ width: size, height: size, borderRadius, objectFit: "cover", display: "block", border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none" }} />
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
    </div>
  );
}

function NameBlock({ block, data, ws, selected, onSelect, onDataChange }: {
  block: Block; data: SignatureData; ws: WrapperSettings; selected: boolean;
  onSelect: (e: React.MouseEvent) => void; onDataChange: (d: SignatureData) => void;
}) {
  const s = block.settings;
  const nameSize = Number(s.nameSize ?? 16);
  const nameWeight = String(s.nameWeight ?? "bold");
  const nameColor = String(s.nameColor ?? "#1a1a1a");
  const letterSpacing = String(s.nameLetterSpacing ?? "");
  const showTitle = s.showTitle !== false;
  const titleSize = Number(s.titleSize ?? 13);
  const titleColor = String(s.titleColor ?? "#555555");
  const titleTransform = String(s.titleTransform ?? "none") as "none" | "uppercase";
  const titleFontStyle = String(s.titleFontStyle ?? "normal") as "normal" | "italic";
  const showCompany = s.showCompany !== false;
  const companyDisplay = String(s.companyDisplay ?? "merged-title");
  const companyColor = String(s.companyColor ?? "#555555");
  const showPronouns = s.showPronouns !== false;
  const fontFamily = ws.fontFamily || "Arial,Helvetica,sans-serif";

  return (
    <div onClick={onSelect} className={`cursor-pointer transition-all rounded px-1 -mx-1 ${selected ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-1 hover:ring-blue-300"}`}>
      <div style={{ fontFamily }}>
        <div>
          <InlineEdit value={data.fullName} onChange={(v) => onDataChange({ ...data, fullName: v })} placeholder="Your Name"
            style={{ fontSize: nameSize, fontWeight: nameWeight, color: nameColor, letterSpacing: letterSpacing || undefined }} />
          {showPronouns && data.pronouns && (
            <span style={{ fontSize: 12, fontWeight: "normal", color: "#888", marginLeft: 4 }}>
              (<InlineEdit value={data.pronouns} onChange={(v) => onDataChange({ ...data, pronouns: v })} style={{ fontSize: 12, color: "#888" }} />)
            </span>
          )}
        </div>
        {showTitle && (
          <div style={{ paddingTop: 2 }}>
            <InlineEdit value={data.jobTitle} onChange={(v) => onDataChange({ ...data, jobTitle: v })} placeholder="Job Title"
              style={{ fontSize: titleSize, color: titleColor, textTransform: titleTransform, fontStyle: titleFontStyle, letterSpacing: titleTransform === "uppercase" ? "0.5px" : undefined }} />
            {companyDisplay === "merged-title" && showCompany && data.company && (
              <span style={{ fontSize: titleSize, color: companyColor }}>{" "}at{" "}
                <InlineEdit value={data.company} onChange={(v) => onDataChange({ ...data, company: v })} style={{ fontSize: titleSize, color: companyColor }} />
              </span>
            )}
          </div>
        )}
        {showCompany && companyDisplay !== "merged-title" && companyDisplay !== "inline-name" && (
          <div style={{ paddingTop: 1 }}>
            <InlineEdit value={data.company} onChange={(v) => onDataChange({ ...data, company: v })} placeholder="Company"
              style={{ fontSize: 13, color: companyColor, fontWeight: companyDisplay === "separate-bold" ? "bold" : "normal",
                textTransform: companyDisplay === "separate-uppercase" ? "uppercase" : "none" as "uppercase" | "none",
                letterSpacing: companyDisplay === "separate-uppercase" ? "1px" : undefined }} />
          </div>
        )}
      </div>
    </div>
  );
}

function ContactBlock({ block, data, ws, selected, onSelect, onDataChange }: {
  block: Block; data: SignatureData; ws: WrapperSettings; selected: boolean;
  onSelect: (e: React.MouseEvent) => void; onDataChange: (d: SignatureData) => void;
}) {
  const s = block.settings;
  const linkColor = String(s.linkColor ?? "#2563eb");
  const textColor = String(s.textColor ?? "#555555");
  const layout = String(s.layout ?? "stacked");
  const fontFamily = String(s.fontFamily ?? "") || ws.fontFamily || "Arial,Helvetica,sans-serif";

  const fields = [
    { key: "email" as keyof SignatureData, icon: "✉", label: "E", placeholder: "email@company.com" },
    { key: "phone" as keyof SignatureData, icon: "☎", label: "T", placeholder: "+1 (555) 123-4567" },
    { key: "website" as keyof SignatureData, icon: "🌐", label: "W", placeholder: "www.company.com" },
    { key: "address" as keyof SignatureData, icon: "📍", label: "A", placeholder: "123 Main St" },
  ].filter((f) => data[f.key]);

  const isInline = layout.startsWith("inline");
  const sep = layout === "inline-middot" ? " · " : layout === "inline-pipes" ? " | " : "";

  return (
    <div onClick={onSelect} className={`cursor-pointer transition-all rounded px-1 -mx-1 ${selected ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-1 hover:ring-blue-300"}`} style={{ fontFamily, fontSize: 12 }}>
      {isInline ? (
        <div>
          {fields.map((f, i) => (
            <span key={f.key}>
              {i > 0 && <span style={{ color: "#ccc" }}>{sep}</span>}
              <InlineEdit value={String(data[f.key])} onChange={(v) => onDataChange({ ...data, [f.key]: v })}
                style={{ color: f.key === "address" ? textColor : linkColor }} />
            </span>
          ))}
        </div>
      ) : (
        <div>
          {fields.map((f) => (
            <div key={f.key} style={{ paddingBottom: 2 }}>
              {layout === "stacked-emoji" && <span style={{ marginRight: 4 }}>{f.icon}</span>}
              {layout === "stacked-labeled" && <strong style={{ color: "#888", marginRight: 4 }}>{f.label}</strong>}
              <InlineEdit value={String(data[f.key])} onChange={(v) => onDataChange({ ...data, [f.key]: v })}
                style={{ color: f.key === "address" ? textColor : linkColor }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DividerBlock({ block, selected, onSelect }: { block: Block; selected: boolean; onSelect: (e: React.MouseEvent) => void }) {
  const s = block.settings;
  const color = String(s.color ?? "#2563eb");
  const style = String(s.style ?? "solid");
  const thickness = Number(s.thickness ?? 2);
  const width = Number(s.width ?? 100);

  return (
    <div onClick={onSelect} className={`cursor-pointer py-1 transition-all ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded" : "hover:ring-1 hover:ring-blue-300 rounded"}`}>
      {style === "decorative" ? (
        <div style={{ display: "flex", alignItems: "center", width: `${width}%` }}>
          <div style={{ width: 40, height: 1, background: color }} />
          <div style={{ width: 8 }} />
          <div style={{ width: 8, height: 1, background: color }} />
        </div>
      ) : (
        <div style={{ width: `${width}%`, borderTop: `${thickness}px ${style} ${color}` }} />
      )}
    </div>
  );
}

function SocialBlock({ block, data, plan, selected, onSelect }: {
  block: Block; data: SignatureData; plan: "free" | "pro" | "team"; selected: boolean; onSelect: (e: React.MouseEvent) => void;
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
    <div onClick={onSelect} className={`cursor-pointer flex items-center transition-all rounded ${selected ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-1 hover:ring-blue-300"}`}>
      {links.map((f) => (
        <img key={f} src={SOCIAL_ICON_URLS[f]} alt={SOCIAL_LABELS[f]} title={SOCIAL_LABELS[f]}
          style={{ width: iconSize, height: iconSize, marginRight: spacing, display: "block" }} />
      ))}
    </div>
  );
}

function SpacerBlock({ block, selected, onSelect }: { block: Block; selected: boolean; onSelect: (e: React.MouseEvent) => void }) {
  const height = Number(block.settings.height ?? 8);
  return (
    <div onClick={onSelect} className={`cursor-pointer transition-all ${selected ? "ring-2 ring-blue-500 ring-offset-2 rounded" : "hover:ring-1 hover:ring-blue-300 rounded"}`}
      style={{ height, minHeight: 4, background: selected ? "rgba(59,130,246,0.05)" : undefined }} />
  );
}

// ---------------------------------------------------------------------------
// Main Component
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
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag state
  const dragIdx = useRef<number | null>(null);
  const [dragVisualIdx, setDragVisualIdx] = useState<number | null>(null);
  const [dropVisualIdx, setDropVisualIdx] = useState<number | null>(null);

  const visibleBlocks = blocks.filter((b) => b.visible);
  const selectedBlock = visibleBlocks.find((b) => b.id === selectedBlockId) ?? null;

  const handleSelect = useCallback((blockId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBlockId(blockId);
  }, []);

  const handleDeselect = useCallback(() => {
    setSelectedBlockId(null);
  }, []);

  const updateBlockSettings = useCallback((blockId: string, newSettings: Record<string, unknown>) => {
    onBlocksChange(blocks.map((b) => b.id === blockId ? { ...b, settings: newSettings } : b));
  }, [blocks, onBlocksChange]);

  // Close toolbar on outside click
  useEffect(() => {
    if (!selectedBlockId) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside toolbar or a color picker popover
      if (target.closest("[data-toolbar]") || target.closest("input[type=color]") || target.closest("[data-block-wrap]")) return;
      handleDeselect();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [selectedBlockId, handleDeselect]);

  // Drag handlers
  const handleDragStart = useCallback((idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragIdx.current = idx;
    setDragVisualIdx(idx);

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
      setDropVisualIdx(closest);
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);

      const fromIdx = dragIdx.current;
      dragIdx.current = null;
      setDragVisualIdx(null);
      setDropVisualIdx((toIdx) => {
        if (fromIdx !== null && toIdx !== null && fromIdx !== toIdx) {
          const visible = blocks.filter((b) => b.visible);
          const item = visible[fromIdx];
          const newVisible = [...visible];
          newVisible.splice(fromIdx, 1);
          newVisible.splice(toIdx, 0, item);
          const hidden = blocks.filter((b) => !b.visible);
          onBlocksChange([...newVisible, ...hidden]);
        }
        return null;
      });
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  }, [blocks, onBlocksChange]);

  // Layout
  const photoBlock = visibleBlocks.find((b) => b.type === "photo");
  const photoPosition = photoBlock ? String(photoBlock.settings.position ?? "left") : "";
  const isSideBySide = photoBlock && (photoPosition === "left" || photoPosition === "right") && !!data.photoUrl;

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

  const renderBlock = (block: Block, idx: number) => {
    const isSelected = selectedBlockId === block.id;
    const onSel = (e: React.MouseEvent) => handleSelect(block.id, e);
    const isDragging = dragVisualIdx === idx;
    const isDropTarget = dropVisualIdx === idx && dragVisualIdx !== null && dragVisualIdx !== idx;

    return (
      <div
        key={block.id}
        data-block-idx={idx}
        data-block-wrap
        className={`group relative ${isDragging ? "opacity-40" : ""}`}
        style={{ paddingBottom: 4 }}
      >
        {isDropTarget && <div className="absolute -top-0.5 left-0 right-0 h-0.5 bg-blue-500 rounded" />}

        {/* Drag handle — visible on hover */}
        <div
          onMouseDown={(e) => handleDragStart(idx, e)}
          className="absolute -left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 hover:!opacity-100 cursor-grab active:cursor-grabbing transition-opacity p-1"
        >
          <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>
            <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
            <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
          </svg>
        </div>

        {block.type === "photo" && <PhotoBlock block={block} data={data} selected={isSelected} onSelect={onSel} onDataChange={onDataChange} />}
        {block.type === "name" && <NameBlock block={block} data={data} ws={ws} selected={isSelected} onSelect={onSel} onDataChange={onDataChange} />}
        {block.type === "contact" && <ContactBlock block={block} data={data} ws={ws} selected={isSelected} onSelect={onSel} onDataChange={onDataChange} />}
        {block.type === "divider" && <DividerBlock block={block} selected={isSelected} onSelect={onSel} />}
        {block.type === "social" && <SocialBlock block={block} data={data} plan={plan} selected={isSelected} onSelect={onSel} />}
        {block.type === "spacer" && <SpacerBlock block={block} selected={isSelected} onSelect={onSel} />}
      </div>
    );
  };

  const contentBlocks = isSideBySide ? visibleBlocks.filter((b) => b.type !== "photo") : visibleBlocks;
  const photoIdx = visibleBlocks.findIndex((b) => b.type === "photo");

  return (
    <div className="relative">
      <div ref={containerRef} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm" style={outerStyle}>
        {isSideBySide && photoBlock ? (
          <div style={{ display: "flex", gap: 14, flexDirection: photoPosition === "right" ? "row-reverse" : "row" }}>
            <div style={{ flexShrink: 0 }}>
              {renderBlock(photoBlock, photoIdx)}
            </div>
            <div style={{ flex: 1, borderLeft: ws.borderLeft || undefined, paddingLeft: ws.borderLeft ? 14 : undefined }}>
              {contentBlocks.map((b) => renderBlock(b, visibleBlocks.indexOf(b)))}
            </div>
          </div>
        ) : (
          visibleBlocks.map((b, i) => renderBlock(b, i))
        )}
      </div>

      {/* Toolbar — renders below the preview when a block is selected */}
      {selectedBlock && (
        <div data-toolbar>
          <FloatingToolbar
            block={selectedBlock}
            wrapperSettings={wrapperSettings}
            onSettingsChange={(s) => updateBlockSettings(selectedBlock.id, s)}
            onWrapperChange={onWrapperSettingsChange}
            onClose={handleDeselect}
          />
        </div>
      )}
    </div>
  );
}
