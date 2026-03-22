"use client";

import { useState, useRef } from "react";
import { SignatureData, WrapperSettings, DEFAULT_WRAPPER_SETTINGS, TEMPLATE_DEFAULTS, TemplateName } from "@/lib/types";
import { Block, SOCIAL_ICON_URLS, SOCIAL_LABELS } from "@/lib/blocks";
import { GenerateOptions, generateSignatureHtml } from "@/lib/generateSignature";
import { copySignatureToClipboard } from "@/lib/clipboard";
import SignatureScore from "./SignatureScore";
import QRCodeGenerator from "./QRCodeGenerator";
import InstallGuide from "./InstallGuide";
import EmailClientPreview from "./EmailClientPreview";
import ReplySignature from "./ReplySignature";
import DynamicSignature from "./DynamicSignature";
import BannerScheduler from "./BannerScheduler";
import DeliverabilityScore from "./DeliverabilityScore";
import DarkModePreview from "./DarkModePreview";
import OutlookPreviewTester from "./OutlookPreviewTester";
import NewOutlookMigrationChecker from "./NewOutlookMigrationChecker";
import AISignatureGenerator from "./AISignatureGenerator";
import TestimonialBlock from "./TestimonialBlock";
import OutlookPushButton from "./OutlookPushButton";

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
// Drag handle — 6-dot ⠿ pattern
// ---------------------------------------------------------------------------

function DragHandle({ onDragStart }: { onDragStart?: (e: React.MouseEvent) => void }) {
  return (
    <span
      onMouseDown={onDragStart}
      className="cursor-grab active:cursor-grabbing select-none text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0 px-0.5"
      title="Drag to reorder"
    >
      <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
        <circle cx="2" cy="2" r="1.5" />
        <circle cx="8" cy="2" r="1.5" />
        <circle cx="2" cy="8" r="1.5" />
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="2" cy="14" r="1.5" />
        <circle cx="8" cy="14" r="1.5" />
      </svg>
    </span>
  );
}

// Simple reorder: move item up or down
function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const result = [...arr];
  const [moved] = result.splice(from, 1);
  result.splice(to, 0, moved);
  return result;
}

// ---------------------------------------------------------------------------
// Section header with divider
// ---------------------------------------------------------------------------

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Delete button
// ---------------------------------------------------------------------------

function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
      aria-label="Delete"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
      </svg>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Bold / Italic / Underline toggle buttons
// ---------------------------------------------------------------------------

function BIUButtons({
  bold, italic, underline,
  onBold, onItalic, onUnderline,
}: {
  bold: boolean; italic: boolean; underline: boolean;
  onBold: (v: boolean) => void; onItalic: (v: boolean) => void; onUnderline: (v: boolean) => void;
}) {
  const cls = (active: boolean) =>
    `h-6 w-6 rounded text-[11px] font-semibold border transition-colors ${
      active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
    }`;
  return (
    <div className="flex gap-0.5">
      <button type="button" onClick={() => onBold(!bold)} className={cls(bold)}>B</button>
      <button type="button" onClick={() => onItalic(!italic)} className={`${cls(italic)} italic`}>I</button>
      <button type="button" onClick={() => onUnderline(!underline)} className={`${cls(underline)} underline`}>U</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline color picker dot
// ---------------------------------------------------------------------------

function ColorDot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="relative h-6 w-6 flex-shrink-0 cursor-pointer" title="Pick color">
      <span
        className="absolute inset-0 rounded border border-slate-200 shadow-sm"
        style={{ backgroundColor: value }}
      />
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
      />
    </label>
  );
}

// ---------------------------------------------------------------------------
// Font size number input
// ---------------------------------------------------------------------------

function FontSizeInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      min={8}
      max={36}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-12 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-center text-xs text-slate-700 focus:border-blue-500 focus:outline-none"
    />
  );
}

// ---------------------------------------------------------------------------
// TAB 1: Details Panel
// ---------------------------------------------------------------------------

// --- User Info Section ---

type FieldDef = { key: keyof SignatureData; label: string; placeholder: string; required?: boolean };

const DEFAULT_USER_FIELDS: FieldDef[] = [
  { key: "jobTitle", label: "Job Title", placeholder: "Marketing Manager" },
  { key: "fullName", label: "Name", placeholder: "John Doe", required: true },
  { key: "company", label: "Company", placeholder: "Acme Corp" },
  { key: "pronouns", label: "Pronouns", placeholder: "he/him" },
];

function UserInfoSection({
  data,
  onDataChange,
  fieldOrder,
  onFieldOrderChange,
}: {
  data: SignatureData;
  onDataChange: (d: SignatureData) => void;
  fieldOrder: string[];
  onFieldOrderChange: (order: string[]) => void;
}) {
  const fields = fieldOrder
    .map((key) => DEFAULT_USER_FIELDS.find((f) => f.key === key))
    .filter(Boolean) as FieldDef[];

  // Fields not currently in the order (removed ones)
  const removedFields = DEFAULT_USER_FIELDS.filter((f) => !fieldOrder.includes(f.key) && !f.required);

  const handleRemove = (key: string) => {
    // Remove from order AND clear the value
    onFieldOrderChange(fieldOrder.filter((k) => k !== key));
    onDataChange({ ...data, [key]: "" });
  };

  const handleAdd = (key: string) => {
    onFieldOrderChange([...fieldOrder, key]);
  };

  // Drag state
  const dragIdxRef = useRef<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    dragIdxRef.current = idx;

    const handleMove = (me: MouseEvent) => {
      const rows = document.querySelectorAll("[data-user-field-idx]");
      let closest = idx;
      let closestDist = Infinity;
      rows.forEach((el) => {
        const i = Number(el.getAttribute("data-user-field-idx"));
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(me.clientY - mid);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setDragOverIdx(closest);
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      const from = dragIdxRef.current;
      dragIdxRef.current = null;
      setDragOverIdx((to) => {
        if (from !== null && to !== null && from !== to) {
          onFieldOrderChange(moveItem(fieldOrder, from, to));
        }
        return null;
      });
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  return (
    <div className="space-y-1.5">
      <SectionHeader title="User Info" />
      {fields.map((f, idx) => (
        <div
          key={f.key}
          data-user-field-idx={idx}
          className={`flex items-center gap-2 group rounded-lg px-1 py-0.5 transition-colors ${
            dragOverIdx === idx && dragIdxRef.current !== null && dragIdxRef.current !== idx
              ? "bg-blue-50 border-t-2 border-blue-400"
              : ""
          } ${dragIdxRef.current === idx ? "opacity-40" : ""}`}
        >
          <DragHandle onDragStart={handleDragStart(idx)} />
          <div className="flex-1 min-w-0">
            <label className="text-[10px] text-slate-400 mb-0.5 block">{f.label}</label>
            <input
              type="text"
              data-testid={`field-${f.key}`}
              value={String(data[f.key] ?? "")}
              onChange={(e) => onDataChange({ ...data, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
          {f.required ? (
            <div className="h-7 w-7 flex-shrink-0" />
          ) : (
            <DeleteBtn onClick={() => handleRemove(f.key)} />
          )}
        </div>
      ))}
      {/* Add removed fields back */}
      {removedFields.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {removedFields.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => handleAdd(f.key)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg px-2.5 py-1 transition-colors"
            >
              + {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Contact Info Section ---

type ContactRowDef = { key: keyof SignatureData; label: string; placeholder: string };

const ALL_CONTACT_FIELDS: ContactRowDef[] = [
  { key: "phone", label: "p.", placeholder: "+1 (555) 123-4567" },
  { key: "email", label: "e.", placeholder: "john@company.com" },
  { key: "website", label: "w.", placeholder: "www.company.com" },
  { key: "address", label: "a.", placeholder: "123 Main St" },
];

function ContactInfoSection({
  data,
  onDataChange,
  contactOrder,
  onContactOrderChange,
}: {
  data: SignatureData;
  onDataChange: (d: SignatureData) => void;
  contactOrder: string[];
  onContactOrderChange: (order: string[]) => void;
}) {
  const visibleRows = contactOrder
    .map((key) => ALL_CONTACT_FIELDS.find((f) => f.key === key))
    .filter(Boolean) as ContactRowDef[];

  const hiddenFields = ALL_CONTACT_FIELDS.filter((f) => !contactOrder.includes(f.key));

  const handleRemove = (key: string) => {
    onDataChange({ ...data, [key]: "" });
    onContactOrderChange(contactOrder.filter((k) => k !== key));
  };

  // Drag state
  const dragIdxRef = useRef<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    dragIdxRef.current = idx;

    const handleMove = (me: MouseEvent) => {
      const rows = document.querySelectorAll("[data-contact-field-idx]");
      let closest = idx;
      let closestDist = Infinity;
      rows.forEach((el) => {
        const i = Number(el.getAttribute("data-contact-field-idx"));
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(me.clientY - mid);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setDragOverIdx(closest);
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      const from = dragIdxRef.current;
      dragIdxRef.current = null;
      setDragOverIdx((to) => {
        if (from !== null && to !== null && from !== to) {
          onContactOrderChange(moveItem(contactOrder, from, to));
        }
        return null;
      });
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  return (
    <div className="space-y-1.5">
      <SectionHeader title="Contact Info" />
      {visibleRows.map((row, idx) => (
        <div
          key={row.key}
          data-contact-field-idx={idx}
          className={`flex items-center gap-2 group rounded-lg px-1 py-0.5 transition-colors ${
            dragOverIdx === idx && dragIdxRef.current !== null && dragIdxRef.current !== idx
              ? "bg-blue-50 border-t-2 border-blue-400"
              : ""
          } ${dragIdxRef.current === idx ? "opacity-40" : ""}`}
        >
          <DragHandle onDragStart={handleDragStart(idx)} />
          <input
            type="text"
            value={row.label}
            readOnly
            className="w-8 rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-1.5 text-[11px] text-slate-500 text-center focus:outline-none flex-shrink-0"
          />
          <input
            type="text"
            data-testid={`field-${row.key}`}
            value={String(data[row.key] ?? "")}
            onChange={(e) => onDataChange({ ...data, [row.key]: e.target.value })}
            placeholder={row.placeholder}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          <DeleteBtn onClick={() => handleRemove(row.key)} />
        </div>
      ))}
      {hiddenFields.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {hiddenFields.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => onContactOrderChange([...contactOrder, f.key])}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg px-2.5 py-1 transition-colors"
            >
              + {f.key === "phone" ? "Phone" : f.key === "email" ? "Email" : f.key === "website" ? "Website" : "Address"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Photo or Logo Section ---

function PhotoSection({
  data,
  onDataChange,
  blocks,
  onBlocksChange,
}: {
  data: SignatureData;
  onDataChange: (d: SignatureData) => void;
  blocks: Block[];
  onBlocksChange: (b: Block[]) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const shape = String(data.photoShape ?? "circle");
  const size = Number(data.photoSize ?? 80);
  const position = String(data.photoPosition ?? "left");

  const set = (key: string, val: unknown) => {
    onDataChange({ ...data, [key]: val });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Max 2MB"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const sz = 200;
        const canvas = document.createElement("canvas");
        canvas.width = sz; canvas.height = sz;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const min = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, sz, sz);
        onDataChange({ ...data, photoUrl: canvas.toDataURL("image/jpeg", 0.85) });
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const shapeOptions: { value: string; title: string; borderRadius: string }[] = [
    { value: "circle", title: "Circle", borderRadius: "50%" },
    { value: "rounded", title: "Rounded", borderRadius: "22%" },
    { value: "near-square", title: "Near square", borderRadius: "8%" },
    { value: "square", title: "Square", borderRadius: "0%" },
  ];

  return (
    <div className="space-y-3">
      <SectionHeader title="Photo or Logo" />

      {data.photoUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={data.photoUrl}
            alt="Photo"
            className="object-cover border border-slate-200 flex-shrink-0"
            style={{
              width: 52, height: 52,
              borderRadius: shape === "circle" ? "50%" : shape === "rounded" ? "22%" : shape === "near-square" ? "8%" : "0",
            }}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onDataChange({ ...data, photoUrl: "" })}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-5 text-sm text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <span>Click to upload photo or logo</span>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

      {/* Shape */}
      <div>
        <p className="text-[11px] font-medium text-slate-500 mb-1.5">Shape</p>
        <div className="flex gap-2">
          {shapeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("photoShape", opt.value)}
              title={opt.title}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                shape === opt.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span
                className="h-5 w-5 bg-slate-400"
                style={{ borderRadius: opt.borderRadius }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] font-medium text-slate-500">Size</p>
          <span className="text-[11px] text-slate-400">{size}px</span>
        </div>
        <input
          type="range"
          min={40}
          max={120}
          value={size}
          onChange={(e) => set("photoSize", Number(e.target.value))}
          className="w-full h-1.5 accent-blue-600"
        />
      </div>

      {/* Position */}
      <div>
        <p className="text-[11px] font-medium text-slate-500 mb-1.5">Position</p>
        <div className="flex rounded-lg border border-slate-200 overflow-hidden w-fit">
          {(["left", "right"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => set("photoPosition", p)}
              className={`px-4 py-1.5 text-xs font-medium transition-colors ${
                position === p
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p === "left" ? "Left" : "Right"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Social Media Section ---

const SOCIAL_PLATFORMS = [
  { key: "linkedin" as keyof SignatureData, icon: "linkedin" },
  { key: "twitter" as keyof SignatureData, icon: "twitter" },
  { key: "instagram" as keyof SignatureData, icon: "instagram" },
  { key: "facebook" as keyof SignatureData, icon: "facebook" },
  { key: "github" as keyof SignatureData, icon: "github" },
  { key: "youtube" as keyof SignatureData, icon: "youtube" },
];

function SocialSection({
  data,
  onDataChange,
  plan,
}: {
  data: SignatureData;
  onDataChange: (d: SignatureData) => void;
  plan: "free" | "pro" | "team";
}) {
  const isPro = plan === "pro" || plan === "team";
  const [showDropdown, setShowDropdown] = useState(false);

  const activePlatforms = SOCIAL_PLATFORMS.filter((p) => String(data[p.key] ?? "").trim() !== "");
  const availablePlatforms = SOCIAL_PLATFORMS.filter((p) => String(data[p.key] ?? "").trim() === "");

  return (
    <div className="space-y-1.5">
      <SectionHeader title="Social Media" />
      {activePlatforms.map((p, i) => {
        const locked = !isPro && i >= 2;
        return (
          <div key={p.key} className="flex items-center gap-2">
            <DragHandle />
            <img src={SOCIAL_ICON_URLS[p.icon]} alt={SOCIAL_LABELS[p.icon] ?? p.icon} className="h-4 w-4 flex-shrink-0" />
            {locked ? (
              <div className="flex-1 flex items-center justify-between rounded-lg border border-dashed border-amber-200 bg-amber-50 px-3 py-1.5">
                <span className="text-xs text-amber-700">{SOCIAL_LABELS[p.icon]}</span>
                <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">PRO</span>
              </div>
            ) : (
              <input
                type="text"
                value={String(data[p.key] ?? "")}
                onChange={(e) => onDataChange({ ...data, [p.key]: e.target.value })}
                placeholder={`https://...`}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            )}
            <DeleteBtn onClick={() => onDataChange({ ...data, [p.key]: "" })} />
          </div>
        );
      })}

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowDropdown((v) => !v)}
          className="mt-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          + Add social link
        </button>
        {showDropdown && availablePlatforms.length > 0 && (
          <div className="absolute left-0 top-full mt-1 z-10 w-48 rounded-xl border border-slate-200 bg-white shadow-lg py-1">
            {availablePlatforms.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  onDataChange({ ...data, [p.key]: " " });
                  setShowDropdown(false);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <img src={SOCIAL_ICON_URLS[p.icon]} alt="" className="h-4 w-4" />
                {SOCIAL_LABELS[p.icon] ?? p.key}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Add-ons Section (Pro) ---

function AddOnsSection({
  data,
  onDataChange,
  plan,
}: {
  data: SignatureData;
  onDataChange: (d: SignatureData) => void;
  plan: "free" | "pro" | "team";
}) {
  const isPro = plan === "pro" || plan === "team";

  if (!isPro) {
    return (
      <div className="space-y-2">
        <SectionHeader title="Add-ons" />
        <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50 p-4 text-center">
          <p className="text-xs font-semibold text-amber-700">Pro Feature</p>
          <p className="text-xs text-amber-600 mt-0.5">Upgrade to add CTA buttons, banners & disclaimers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <SectionHeader title="Add-ons" />

      {/* CTA Button */}
      <div>
        <p className="text-[11px] font-medium text-slate-500 mb-1.5">CTA Button</p>
        <div className="space-y-1.5">
          <input
            type="text"
            value={data.calendlyUrl}
            onChange={(e) => onDataChange({ ...data, calendlyUrl: e.target.value })}
            placeholder="Button URL (e.g. calendly.com/...)"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Banner */}
      <div>
        <p className="text-[11px] font-medium text-slate-500 mb-1.5">Banner</p>
        <div className="space-y-1.5">
          <input
            type="text"
            value={data.ctaBannerUrl}
            onChange={(e) => onDataChange({ ...data, ctaBannerUrl: e.target.value })}
            placeholder="Banner image URL"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          <input
            type="text"
            value={data.ctaBannerLink}
            onChange={(e) => onDataChange({ ...data, ctaBannerLink: e.target.value })}
            placeholder="Banner link URL"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div>
        <p className="text-[11px] font-medium text-slate-500 mb-1.5">Legal Disclaimer</p>
        <textarea
          value={data.disclaimer ?? ""}
          onChange={(e) => onDataChange({ ...data, disclaimer: e.target.value })}
          placeholder="Confidentiality notice or legal disclaimer..."
          rows={2}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 2: Design Panel
// ---------------------------------------------------------------------------

function DesignPanel({
  data,
  onDataChange,
}: {
  data: SignatureData;
  onDataChange: (d: SignatureData) => void;
}) {
  const set = (key: keyof SignatureData, val: unknown) => onDataChange({ ...data, [key]: val });
  const td = TEMPLATE_DEFAULTS[(data.template || "minimal") as TemplateName] ?? TEMPLATE_DEFAULTS.minimal;

  return (
    <div className="space-y-6">
      {/* Text Styling — all write to data.* so renderer can read them */}
      <div>
        <SectionHeader title="Text Styling" />
        <div className="space-y-2.5">
          {/* Name */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs text-slate-500 flex-shrink-0">Name</span>
            <BIUButtons
              bold={data.nameBold ?? td.nameBold}
              italic={data.nameItalic ?? td.nameItalic}
              underline={data.nameUnderline === true}
              onBold={(v) => set("nameBold", v)}
              onItalic={(v) => set("nameItalic", v)}
              onUnderline={(v) => set("nameUnderline", v)}
            />
            <ColorDot value={data.nameColor ?? td.nameColor} onChange={(v) => set("nameColor", v)} />
            <FontSizeInput value={data.nameSize ?? td.nameSize} onChange={(v) => set("nameSize", v)} />
          </div>
          {/* Job Title */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs text-slate-500 flex-shrink-0">Title</span>
            <BIUButtons
              bold={data.titleBold ?? false}
              italic={data.titleItalic ?? false}
              underline={data.titleUnderline === true}
              onBold={(v) => set("titleBold", v)}
              onItalic={(v) => set("titleItalic", v)}
              onUnderline={(v) => set("titleUnderline", v)}
            />
            <ColorDot value={data.titleColor ?? td.titleColor} onChange={(v) => set("titleColor", v)} />
            <FontSizeInput value={data.titleSize ?? td.titleSize} onChange={(v) => set("titleSize", v)} />
          </div>
          {/* Company */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs text-slate-500 flex-shrink-0">Company</span>
            <BIUButtons
              bold={data.companyBold ?? false}
              italic={data.companyItalic ?? false}
              underline={data.companyUnderline === true}
              onBold={(v) => set("companyBold", v)}
              onItalic={(v) => set("companyItalic", v)}
              onUnderline={(v) => set("companyUnderline", v)}
            />
            <ColorDot value={data.companyColor ?? td.companyColor} onChange={(v) => set("companyColor", v)} />
            <FontSizeInput value={data.companySize ?? td.titleSize} onChange={(v) => set("companySize", v)} />
          </div>
        </div>
      </div>

      {/* Style */}
      <div>
        <SectionHeader title="Style" />
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-medium text-slate-500 block mb-1">Font family</label>
            <select
              value={data.fontFamily ?? "Arial,Helvetica,sans-serif"}
              onChange={(e) => set("fontFamily", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
            >
              <option value="Arial,Helvetica,sans-serif">Arial</option>
              <option value="Georgia,'Times New Roman',serif">Georgia</option>
              <option value="'Courier New',Courier,monospace">Courier New</option>
              <option value="Verdana,Geneva,sans-serif">Verdana</option>
              <option value="Tahoma,Geneva,sans-serif">Tahoma</option>
              <option value="'Trebuchet MS',Helvetica,sans-serif">Trebuchet MS</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium text-slate-500">Base font size</label>
              <span className="text-[11px] text-slate-400">{data.fontSize ?? 14}px</span>
            </div>
            <input type="range" min={11} max={18} value={data.fontSize ?? 14} onChange={(e) => set("fontSize", Number(e.target.value))} className="w-full h-1.5 accent-blue-600" />
          </div>
        </div>
      </div>

      {/* Photo */}
      <div>
        <SectionHeader title="Photo Style" />
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-medium text-slate-500 block mb-1">Size</label>
            <input type="range" min={40} max={120} value={data.photoSize ?? 70} onChange={(e) => set("photoSize", Number(e.target.value))} className="w-full h-1.5 accent-blue-600" />
            <span className="text-[10px] text-slate-400">{data.photoSize ?? 70}px</span>
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 block mb-1">Shape</label>
            <div className="flex gap-2">
              {(["circle", "rounded", "square"] as const).map((s) => (
                <button key={s} type="button" onClick={() => set("photoShape", s)}
                  className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-colors ${(data.photoShape ?? "circle") === s ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <span className="h-4 w-4 bg-slate-400" style={{ borderRadius: s === "circle" ? "50%" : s === "rounded" ? "20%" : "0" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Field Layout */}
      <div>
        <SectionHeader title="Field Layout" />
        <div className="space-y-2">
          <p className="text-[10px] text-slate-400">Drag fields up/down in Details tab. Use arrows below to place side by side or move to photo column.</p>
          {/* Field rows editor */}
          {(() => {
            const currentRows: string[][] = data.fieldRows || (data.fieldOrder || ["fullName", "jobTitle", "company"]).map(f => [f]);
            const leftCols = new Set(data.leftColumnFields || []);

            const allFields: Record<string, string> = {
              fullName: "Name", jobTitle: "Title", company: "Company",
              contact: "Contact", social: "Social Icons", calendly: "Calendly",
            };

            const mergeWithNext = (rowIdx: number) => {
              if (rowIdx >= currentRows.length - 1) return;
              const merged = [...currentRows];
              merged[rowIdx] = [...merged[rowIdx], ...merged[rowIdx + 1]];
              merged.splice(rowIdx + 1, 1);
              set("fieldRows", merged);
            };

            const splitRow = (rowIdx: number, fieldIdx: number) => {
              if (currentRows[rowIdx].length <= 1) return;
              const merged = [...currentRows];
              const field = merged[rowIdx][fieldIdx];
              merged[rowIdx] = merged[rowIdx].filter((_, i) => i !== fieldIdx);
              merged.splice(rowIdx + 1, 0, [field]);
              set("fieldRows", merged);
            };

            const toggleLeftColumn = (key: string) => {
              const current = new Set(data.leftColumnFields || []);
              if (current.has(key)) current.delete(key); else current.add(key);
              set("leftColumnFields", [...current]);
            };

            return (
              <>
                {/* User fields layout */}
                <div className="space-y-1">
                  {currentRows.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex items-center gap-1">
                      <div className="flex-1 flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5">
                        {row.map((field, fIdx) => (
                          <div key={field} className="flex items-center gap-1">
                            {fIdx > 0 && <span className="text-[9px] text-slate-300">|</span>}
                            <span className="text-[11px] text-slate-700 font-medium">{allFields[field] || field}</span>
                            {row.length > 1 && (
                              <button type="button" onClick={() => splitRow(rowIdx, fIdx)}
                                className="text-[9px] text-slate-400 hover:text-red-500" title="Split to own row">↓</button>
                            )}
                          </div>
                        ))}
                      </div>
                      {rowIdx < currentRows.length - 1 && (
                        <button type="button" onClick={() => mergeWithNext(rowIdx)}
                          className="h-6 w-6 rounded border border-slate-200 text-[10px] text-slate-500 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center" title="Merge with row below">→←</button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Section column assignment */}
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 mb-1">Move to photo column:</p>
                  <div className="flex flex-wrap gap-1">
                    {(["social", "contact", "calendly"] as const).map(key => (
                      <button key={key} type="button" onClick={() => toggleLeftColumn(key)}
                        className={`text-[10px] rounded-full px-2.5 py-1 font-medium transition-colors ${
                          leftCols.has(key)
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}>
                        {leftCols.has(key) ? "← " : ""}{allFields[key] || key}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Colors */}
      <div>
        <SectionHeader title="Colors" />
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Primary color</span>
            <label className="relative cursor-pointer">
              <span className="block h-7 w-12 rounded-lg border border-slate-200 shadow-sm" style={{ backgroundColor: data.primaryColor }} />
              <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" value={data.primaryColor} onChange={(e) => set("primaryColor", e.target.value)} />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Accent color</span>
            <label className="relative cursor-pointer">
              <span className="block h-7 w-12 rounded-lg border border-slate-200 shadow-sm" style={{ backgroundColor: data.accentColor }} />
              <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" value={data.accentColor} onChange={(e) => set("accentColor", e.target.value)} />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Background</span>
            <div className="flex items-center gap-1.5">
              <label className="relative cursor-pointer">
                <span className="block h-7 w-12 rounded-lg border border-slate-200 shadow-sm" style={{ backgroundColor: data.backgroundColor ?? "#ffffff" }} />
                <input type="color" value={data.backgroundColor ?? "#ffffff"} onChange={(e) => set("backgroundColor", e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
              </label>
              {data.backgroundColor && (
                <button type="button" onClick={() => { set("backgroundColor", undefined); set("textOnDark", false); }} className="text-xs text-slate-400 hover:text-red-500 px-1">none</button>
              )}
            </div>
          </div>
          {data.backgroundColor && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={data.textOnDark ?? false} onChange={(e) => set("textOnDark", e.target.checked)} className="accent-blue-600 h-3.5 w-3.5" />
              <span className="text-xs text-slate-600">Light text (dark background)</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live Preview — email chrome + rendered signature
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Collapsible tool section — keeps right panel clean
// ---------------------------------------------------------------------------

function ToolSection({
  title,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">{title}</span>
          {badge && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live preview in email chrome mockup
// ---------------------------------------------------------------------------

function LivePreview({
  data,
  plan,
}: {
  data: SignatureData;
  plan: "free" | "pro" | "team";
}) {
  const options: GenerateOptions = { plan };
  const html = generateSignatureHtml(data, options);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* macOS-style window chrome */}
      <div className="border-b border-slate-100 bg-[#f3f3f5] px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="ml-2 text-[11px] font-medium text-slate-400 tracking-wide">New Message</span>
      </div>

      {/* Email headers */}
      <div className="border-b border-slate-100 px-4 py-1.5 flex items-baseline gap-1">
        <span className="text-[11px] font-medium text-slate-400 w-12 flex-shrink-0">To</span>
        <span className="text-xs text-slate-600">recipient@company.com</span>
      </div>
      <div className="border-b border-slate-100 px-4 py-1.5 flex items-baseline gap-1">
        <span className="text-[11px] font-medium text-slate-400 w-12 flex-shrink-0">Subject</span>
        <span className="text-xs text-slate-600">Quick follow up</span>
      </div>

      {/* Email body */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-sm text-slate-500 leading-relaxed">Hi there,</p>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Just wanted to follow up on our conversation. Let me know if you have any questions.
        </p>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">Best regards,</p>
      </div>

      {/* Signature */}
      <div className="px-4 pb-4" data-testid="live-preview-signature">
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
  const [activeTab, setActiveTab] = useState<"details" | "design">("details");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [sigId] = useState(() =>
    typeof crypto !== "undefined" ? crypto.randomUUID() : "temp"
  );
  // Field order stored in data so the renderer can use it
  const userFieldOrder = data.fieldOrder ?? ["jobTitle", "fullName", "company", "pronouns"];
  const setUserFieldOrder = (order: string[]) => onDataChange({ ...data, fieldOrder: order });
  const contactOrder = data.contactOrder ?? ["phone", "email", "website"];
  const setContactOrder = (order: string[]) => onDataChange({ ...data, contactOrder: order });

  const ws = wrapperSettings ?? DEFAULT_WRAPPER_SETTINGS;
  const isPro = plan === "pro" || plan === "team";
  const previewHtml = generateSignatureHtml(data, { plan });
  const photoBlock = blocks.find((b) => b.type === "photo" && b.visible);

  const cropPhotoToShape = (photoUrl: string, shape: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const sz = 200;
        const canvas = document.createElement("canvas");
        canvas.width = sz; canvas.height = sz;
        const ctx = canvas.getContext("2d");
        if (!ctx) { resolve(photoUrl); return; }
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, sz, sz);
        if (shape === "circle") {
          ctx.beginPath();
          ctx.arc(sz / 2, sz / 2, sz / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
        } else if (shape === "rounded" || shape === "near-square") {
          const r = shape === "rounded" ? 44 : 16;
          ctx.beginPath();
          ctx.moveTo(r, 0); ctx.lineTo(sz - r, 0);
          ctx.quadraticCurveTo(sz, 0, sz, r); ctx.lineTo(sz, sz - r);
          ctx.quadraticCurveTo(sz, sz, sz - r, sz); ctx.lineTo(r, sz);
          ctx.quadraticCurveTo(0, sz, 0, sz - r); ctx.lineTo(0, r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.closePath();
          ctx.clip();
        }
        const min = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, sz, sz);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.onerror = () => resolve(photoUrl);
      img.src = photoUrl;
    });
  };

  const handleCopy = async () => {
    const options: GenerateOptions = { plan, signatureId: sigId };
    let copyData = { ...data };

    if (data.photoUrl) {
      const shape = String(data.photoShape ?? "circle");
      if (shape !== "square") {
        copyData = { ...data, photoUrl: await cropPhotoToShape(data.photoUrl, shape) };
      }
    }

    let html = generateSignatureHtml(copyData, options);

    if (copyData.photoUrl && copyData.photoUrl.startsWith("data:")) {
      try {
        await fetch("/api/signatures/free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: sigId, data: copyData, template: data.template }),
        });
        const res = await fetch(copyData.photoUrl);
        const blob = await res.blob();
        const formData = new FormData();
        formData.append("file", blob, "photo.jpg");
        formData.append("signature_id", sigId);
        const uploadRes = await fetch("/api/images/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json() as { url?: string };
        if (uploadData.url) {
          html = html.replace(/src="data:image[^"]*"/g, `src="${uploadData.url}"`);
        }
      } catch { /* continue with local data URI */ }
    }

    const ok = await copySignatureToClipboard(html);
    setCopyState(ok ? "copied" : "error");
    setTimeout(() => setCopyState("idle"), 3000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">

      {/* ================================================================
          LEFT PANEL — 2 cols (form)
      ================================================================ */}
      <div className="lg:col-span-2 flex flex-col min-h-0">

        {/* AI Signature Generator — FREE (viral acquisition) */}
        <AISignatureGenerator onGenerate={(newData) => onDataChange(newData)} />

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 mb-5">
          {(["details", "design"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              data-testid={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors relative ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable form content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 pb-4">
          {activeTab === "details" ? (
            <>
              <UserInfoSection data={data} onDataChange={onDataChange} fieldOrder={userFieldOrder} onFieldOrderChange={setUserFieldOrder} />
              <ContactInfoSection data={data} onDataChange={onDataChange} contactOrder={contactOrder} onContactOrderChange={setContactOrder} />
              <PhotoSection
                data={data}
                onDataChange={onDataChange}
                blocks={blocks}
                onBlocksChange={onBlocksChange}
              />
              <SocialSection data={data} onDataChange={onDataChange} plan={plan} />
              <AddOnsSection data={data} onDataChange={onDataChange} plan={plan} />
            </>
          ) : (
            <DesignPanel
              data={data}
              onDataChange={onDataChange}
            />
          )}
        </div>
      </div>

      {/* ================================================================
          RIGHT PANEL — 3 cols: live preview + copy button
      ================================================================ */}
      <div className="lg:col-span-3">
        <div className="sticky top-20 space-y-3">
          <LivePreview data={data} plan={plan} />

          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${
              copyState === "copied"
                ? "bg-emerald-500 text-white"
                : copyState === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {copyState === "copied" ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Copied! Paste in your email client
              </>
            ) : copyState === "error" ? (
              "Copy failed — try again"
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                Copy Signature
              </>
            )}
          </button>

          {/* Push to Outlook — one-click integration */}
          <OutlookPushButton signatureHtml={previewHtml} />

          {/* ================================================================
              TOOLS — organized in collapsible groups for clarity
          ================================================================ */}
          <ToolSection title="Signature Score" defaultOpen>
            <SignatureScore data={data} />
          </ToolSection>

          {isPro ? (
            <>
              <ToolSection title="Outlook Compatibility" badge="Pro" defaultOpen>
                <div className="space-y-3">
                  <OutlookPreviewTester data={data} plan={plan} />
                  <NewOutlookMigrationChecker signatureHtml={previewHtml} isPro={isPro} />
                </div>
              </ToolSection>

              <ToolSection title="Preview & Test" badge="Pro">
                <div className="space-y-3">
                  <EmailClientPreview data={data} plan={plan} />
                  <DarkModePreview data={data} plan={plan} />
                </div>
              </ToolSection>

              <ToolSection title="Deliverability" badge="Pro">
                <DeliverabilityScore data={data} plan={plan} />
              </ToolSection>

              <ToolSection title="Install & Export">
                <div className="space-y-3">
                  <InstallGuide />
                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob([previewHtml], { type: "text/html" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `signature-${data.fullName?.replace(/\s+/g, "-").toLowerCase() || "backup"}.html`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download HTML Backup
                  </button>
                </div>
              </ToolSection>

              <ToolSection title="Advanced Features" badge="Pro">
                <div className="space-y-3">
                  {data.website && (
                    <QRCodeGenerator url={data.website.startsWith("http") ? data.website : `https://${data.website}`} />
                  )}
                  <ReplySignature data={data} plan={plan} />
                  <DynamicSignature data={data} plan={plan} onDataChange={onDataChange} />
                  <TestimonialBlock data={data} plan={plan} onDataChange={onDataChange} />
                  <BannerScheduler plan={plan} onApplyBanner={(img, link) => onDataChange({ ...data, ctaBannerUrl: img, ctaBannerLink: link })} />
                </div>
              </ToolSection>
            </>
          ) : (
            <>
              <ToolSection title="Install Your Signature" defaultOpen>
                <InstallGuide />
              </ToolSection>

              {/* Compact Pro upsell — focused on sub-niche value */}
              <div className="rounded-xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white p-4">
                <p className="text-xs font-bold text-blue-800 mb-2">Upgrade to Pro</p>
                <ul className="space-y-1.5 mb-3">
                  {[
                    "Outlook Compatibility Tester (11 checks)",
                    "New Outlook Migration Checker",
                    "Dark Mode + Email Client Preview",
                    "Deliverability Score",
                    "HTML Backup & Export",
                    "QR Code, Banner Scheduling & more",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                      <svg className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-px" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://neatstamp.com/pricing"
                  className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Try Pro — $5/month
                </a>
                <p className="text-[10px] text-slate-400 text-center mt-1.5">30-day money-back guarantee</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
