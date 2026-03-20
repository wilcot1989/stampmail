"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Block, BlockType, BlockConfig, BLOCK_CONFIGS, generateHtmlFromBlocks } from "@/lib/blocks";
import { DEFAULT_WRAPPER_SETTINGS, WrapperSettings, SignatureData } from "@/lib/types";
import { GenerateOptions, generateSignatureHtml } from "@/lib/generateSignature";

import { copySignatureToClipboard } from "@/lib/clipboard";
import BlockSettings from "./BlockSettings";
import EditableSignature from "./EditableSignature";

interface BlockEditorProps {
  blocks: Block[];
  onBlocksChange: (blocks: Block[]) => void;
  data: SignatureData;
  onDataChange: (data: SignatureData) => void;
  plan: "free" | "pro" | "team";
  wrapperSettings?: WrapperSettings;
  onWrapperSettingsChange?: (ws: WrapperSettings) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeBlock(type: BlockType): Block {
  return {
    id: crypto.randomUUID(),
    type,
    visible: true,
    settings: { ...BLOCK_CONFIGS[type].defaultSettings },
  };
}

// ---------------------------------------------------------------------------
// Drag handle icon
// ---------------------------------------------------------------------------
function DragHandle({ onMouseDown, onTouchStart }: { onMouseDown: (e: React.MouseEvent) => void; onTouchStart: (e: React.TouchEvent) => void }) {
  return (
    <span
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 select-none pr-1 touch-none"
      aria-label="Drag to reorder"
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

// ---------------------------------------------------------------------------
// Single block card
// ---------------------------------------------------------------------------

interface BlockCardProps {
  block: Block;
  config: BlockConfig;
  index: number;
  isPro: boolean;
  expanded: boolean;
  data: SignatureData;
  plan: "free" | "pro" | "team";
  isDragging: boolean;
  dropLineIndex: number | null;
  totalBlocks: number;
  onToggleExpand: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  onSettingsChange: (settings: Record<string, unknown>) => void;
  onDataChange: (data: SignatureData) => void;
  onDragHandleMouseDown: (e: React.MouseEvent, index: number) => void;
  onDragHandleTouchStart: (e: React.TouchEvent, index: number) => void;
}

function BlockCard({
  block,
  config,
  index,
  isPro,
  expanded,
  data,
  plan,
  isDragging,
  dropLineIndex,
  totalBlocks,
  onToggleExpand,
  onToggleVisible,
  onDelete,
  onDataChange,
  onSettingsChange,
  onDragHandleMouseDown,
  onDragHandleTouchStart,
}: BlockCardProps) {
  // Show drop line above this card when dropLineIndex === index
  const showDropLineBefore = dropLineIndex === index;
  // Show drop line after last card
  const showDropLineAfter = dropLineIndex === totalBlocks && index === totalBlocks - 1;

  return (
    <div className="relative">
      {/* Drop indicator line above */}
      {showDropLineBefore && (
        <div className="absolute -top-px left-0 right-0 z-10 h-0.5 bg-blue-500 rounded-full shadow-sm" style={{ boxShadow: "0 0 4px rgba(59,130,246,0.6)" }} />
      )}

      <div
        className={`rounded-xl border bg-white transition-all duration-150 ${
          isDragging
            ? "opacity-30 scale-[0.98] border-blue-200"
            : "border-slate-200 shadow-sm hover:border-slate-300 hover:shadow"
        } ${!block.visible ? "opacity-60" : ""}`}
        style={{ transition: "transform 0.2s ease, opacity 0.15s ease" }}
      >
        {/* Card header */}
        <div className="flex items-center gap-2 px-3 py-2.5">
          <DragHandle
            onMouseDown={(e) => onDragHandleMouseDown(e, index)}
            onTouchStart={(e) => onDragHandleTouchStart(e, index)}
          />

          <span className="text-base leading-none select-none" aria-hidden>
            {config.icon}
          </span>

          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-slate-800">{config.label}</span>
            {config.proOnly && !isPro && (
              <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 ring-1 ring-amber-200">
                PRO
              </span>
            )}
          </div>

          {/* Visibility toggle */}
          <button
            type="button"
            onClick={onToggleVisible}
            title={block.visible ? "Hide this block" : "Show this block"}
            className={`rounded-md p-1.5 transition-colors ${
              block.visible
                ? "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                : "text-slate-300 hover:text-slate-500 hover:bg-slate-100"
            }`}
          >
            {block.visible ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            )}
          </button>

          {/* Settings toggle */}
          <button
            type="button"
            onClick={onToggleExpand}
            title={expanded ? "Hide settings" : "Show settings"}
            className={`rounded-md p-1.5 transition-colors ${
              expanded
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={onDelete}
            title="Remove this block"
            className="rounded-md p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Settings panel */}
        {expanded && (
          <BlockSettings
            block={block}
            data={data}
            plan={plan}
            onSettingsChange={onSettingsChange}
            onDataChange={onDataChange}
          />
        )}
      </div>

      {/* Drop indicator line after last item */}
      {showDropLineAfter && (
        <div className="absolute -bottom-px left-0 right-0 z-10 h-0.5 bg-blue-500 rounded-full shadow-sm" style={{ boxShadow: "0 0 4px rgba(59,130,246,0.6)" }} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Add-block dropdown
// ---------------------------------------------------------------------------

function AddBlockMenu({
  isPro,
  hasPhoto,
  onAdd,
}: {
  isPro: boolean;
  hasPhoto: boolean;
  onAdd: (type: BlockType) => void;
}) {
  const [open, setOpen] = useState(false);

  const blockTypes = Object.values(BLOCK_CONFIGS) as BlockConfig[];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors w-full justify-center"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add block
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full mb-2 left-0 right-0 z-30 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Photo suggestion at top if no photo block */}
            {!hasPhoto && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onAdd("photo");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left bg-blue-50 hover:bg-blue-100 transition-colors border-b border-blue-100"
                >
                  <span className="text-base">📷</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-700">Add photo</span>
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600 ring-1 ring-blue-200">Suggested</span>
                    </div>
                    <p className="text-xs text-blue-500 truncate">Profile photo or company logo</p>
                  </div>
                </button>
                <div className="border-b border-slate-100" />
              </>
            )}
            {blockTypes
              .filter((cfg) => hasPhoto || cfg.type !== "photo") // hide photo entry if already shown above or photo exists
              .map((cfg) => {
                const locked = cfg.proOnly && !isPro;
                return (
                  <button
                    key={cfg.type}
                    type="button"
                    onClick={() => {
                      if (!locked) {
                        onAdd(cfg.type);
                        setOpen(false);
                      }
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors ${
                      locked ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="text-base">{cfg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">{cfg.label}</span>
                        {locked && (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                            PRO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{cfg.description}</p>
                    </div>
                    {locked && (
                      <svg className="h-3.5 w-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    )}
                  </button>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live preview panel
// ---------------------------------------------------------------------------

function LivePreview({
  blocks,
  data,
  plan,
  wrapperSettings,
}: {
  blocks: Block[];
  data: SignatureData;
  plan: "free" | "pro" | "team";
  wrapperSettings: WrapperSettings;
}) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [sigId] = useState(() => crypto.randomUUID());
  const previewRef = useRef<HTMLDivElement>(null);

  const options: GenerateOptions = {
    plan,
    signatureId: sigId,
  };
  const blockHtml = generateHtmlFromBlocks(blocks, data, wrapperSettings, options);
  const templateHtml = generateSignatureHtml(data, options);
  const html = blockHtml;

  const handleCopy = async () => {
    let finalHtml = templateHtml;

    // If photo is base64, upload to R2 first so it works in email clients
    if (data.photoUrl && data.photoUrl.startsWith("data:")) {
      try {
        // Save signature data to D1 first
        await fetch("/api/signatures/free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: sigId, data, template: data.template }),
        });

        // Convert base64 to blob and upload
        const res = await fetch(data.photoUrl);
        const blob = await res.blob();
        const formData = new FormData();
        formData.append("file", blob, "photo.jpg");
        formData.append("signature_id", sigId);

        const uploadRes = await fetch("/api/images/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json() as { url?: string };

        if (uploadData.url) {
          // Replace base64 with hosted URL in the copy HTML
          finalHtml = finalHtml.replace(
            /src="data:image[^"]*"/g,
            `src="${uploadData.url}"`
          );
        }
      } catch {
        // Continue with base64 if upload fails
      }
    }

    const ok = await copySignatureToClipboard(finalHtml);
    if (ok) {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
    } else {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 3000);
    }
  };

  const handleSelect = () => {
    if (!previewRef.current) return;
    const range = document.createRange();
    range.selectNodeContents(previewRef.current);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mock email compose window */}
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
        <div className="border-b border-slate-100 px-4 py-2">
          <span className="text-xs text-slate-400">To: </span>
          <span className="text-xs text-slate-600">colleague@company.com</span>
        </div>
        <div className="border-b border-slate-100 px-4 py-2">
          <span className="text-xs text-slate-400">Subject: </span>
          <span className="text-xs text-slate-600">Following up on our call</span>
        </div>
        <div className="px-4 py-4">
          <p className="text-sm text-slate-700 mb-4 leading-relaxed">
            Hi Sarah,<br />
            <br />
            Thanks for your time today. As discussed, I&apos;ll send over the proposal by end of week.
          </p>
          <div className="border-t border-slate-100 pt-4">
            <div
              ref={previewRef}
              className="signature-preview-container"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>

      {/* Copy controls */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${
            copyState === "copied"
              ? "bg-emerald-500 text-white"
              : copyState === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
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
            "Copy failed — try Select below"
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy Signature
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSelect}
          title="Select the signature, then press Ctrl+C to copy"
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Output is Outlook-safe table HTML — no flexbox or grid.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ghost element shown while dragging
// ---------------------------------------------------------------------------

interface GhostProps {
  label: string;
  icon: string;
  x: number;
  y: number;
}

function DragGhost({ label, icon, x, y }: GhostProps) {
  return (
    <div
      style={{
        position: "fixed",
        left: x + 12,
        top: y - 18,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0.92,
      }}
      className="flex items-center gap-2 rounded-xl border border-blue-300 bg-white shadow-2xl px-3 py-2.5 cursor-grabbing select-none"
    >
      <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" className="text-blue-400 shrink-0">
        <circle cx="2" cy="2" r="1.5" />
        <circle cx="8" cy="2" r="1.5" />
        <circle cx="2" cy="8" r="1.5" />
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="2" cy="14" r="1.5" />
        <circle cx="8" cy="14" r="1.5" />
      </svg>
      <span className="text-base leading-none select-none">{icon}</span>
      <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main BlockEditor component
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Copy button (standalone)
// ---------------------------------------------------------------------------

function CopyButton({
  blocks,
  data,
  wrapperSettings: ws,
  plan,
}: {
  blocks: Block[];
  data: SignatureData;
  wrapperSettings: WrapperSettings;
  plan: "free" | "pro" | "team";
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const [sigId] = useState(() => crypto.randomUUID());

  const handleCopy = async () => {
    const options: GenerateOptions = { plan, signatureId: sigId };
    let html = generateHtmlFromBlocks(blocks, data, ws, options);

    // Upload base64 photo to R2 for email client compatibility
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
      } catch {
        // Continue with base64 if upload fails
      }
    }

    const ok = await copySignatureToClipboard(html);
    setState(ok ? "copied" : "error");
    setTimeout(() => setState("idle"), 3000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${
        state === "copied"
          ? "bg-emerald-500 text-white"
          : state === "error"
            ? "bg-red-500 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {state === "copied" ? (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          Copied! Paste in your email client
        </>
      ) : state === "error" ? (
        "Copy failed — try again"
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
          Copy Signature
        </>
      )}
    </button>
  );
}

export default function BlockEditor({
  blocks,
  onBlocksChange,
  data,
  onDataChange,
  plan,
  wrapperSettings,
  onWrapperSettingsChange,
}: BlockEditorProps) {
  const ws = wrapperSettings ?? DEFAULT_WRAPPER_SETTINGS;
  const handleWsChange = onWrapperSettingsChange ?? (() => {});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Drag state
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dropLineIndex, setDropLineIndex] = useState<number | null>(null);
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const listRef = useRef<HTMLDivElement>(null);
  const dragIndexRef = useRef<number | null>(null);

  const isPro = plan === "pro" || plan === "team";

  // ---------------------------------------------------------------------------
  // Mouse-based drag & drop
  // ---------------------------------------------------------------------------

  const getDropIndex = useCallback(
    (clientY: number): number => {
      if (!listRef.current) return blocks.length;
      const items = Array.from(listRef.current.children) as HTMLElement[];
      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        if (clientY < mid) return i;
      }
      return blocks.length;
    },
    [blocks.length]
  );

  const startDrag = useCallback(
    (index: number, clientX: number, clientY: number) => {
      dragIndexRef.current = index;
      setDraggingIndex(index);
      setGhostPos({ x: clientX, y: clientY });
      setDropLineIndex(index);
      // Prevent text selection during drag
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragIndexRef.current === null) return;
      setGhostPos({ x: e.clientX, y: e.clientY });
      const di = getDropIndex(e.clientY);
      setDropLineIndex(di);
    },
    [getDropIndex]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (dragIndexRef.current === null) return;
      const from = dragIndexRef.current;
      const to = getDropIndex(e.clientY);

      if (to !== from && to !== from + 1) {
        const next = [...blocks];
        const [moved] = next.splice(from, 1);
        const insertAt = to > from ? to - 1 : to;
        next.splice(insertAt, 0, moved);
        onBlocksChange(next);
      }

      dragIndexRef.current = null;
      setDraggingIndex(null);
      setDropLineIndex(null);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    },
    [blocks, onBlocksChange, getDropIndex]
  );

  // Touch handlers
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (dragIndexRef.current === null) return;
      e.preventDefault();
      const touch = e.touches[0];
      setGhostPos({ x: touch.clientX, y: touch.clientY });
      const di = getDropIndex(touch.clientY);
      setDropLineIndex(di);
    },
    [getDropIndex]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (dragIndexRef.current === null) return;
      const touch = e.changedTouches[0];
      const from = dragIndexRef.current;
      const to = getDropIndex(touch.clientY);

      if (to !== from && to !== from + 1) {
        const next = [...blocks];
        const [moved] = next.splice(from, 1);
        const insertAt = to > from ? to - 1 : to;
        next.splice(insertAt, 0, moved);
        onBlocksChange(next);
      }

      dragIndexRef.current = null;
      setDraggingIndex(null);
      setDropLineIndex(null);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    },
    [blocks, onBlocksChange, getDropIndex]
  );

  // Attach / detach global listeners during drag
  useEffect(() => {
    if (draggingIndex === null) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [draggingIndex, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const handleDragHandleMouseDown = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.preventDefault();
      startDrag(index, e.clientX, e.clientY);
    },
    [startDrag]
  );

  const handleDragHandleTouchStart = useCallback(
    (e: React.TouchEvent, index: number) => {
      const touch = e.touches[0];
      startDrag(index, touch.clientX, touch.clientY);
    },
    [startDrag]
  );

  // ---------------------------------------------------------------------------
  // Block mutations
  // ---------------------------------------------------------------------------

  const toggleVisible = (id: string) => {
    onBlocksChange(
      blocks.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b))
    );
  };

  const deleteBlock = (id: string) => {
    onBlocksChange(blocks.filter((b) => b.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const updateSettings = (id: string, settings: Record<string, unknown>) => {
    onBlocksChange(
      blocks.map((b) => (b.id === id ? { ...b, settings } : b))
    );
  };

  const addBlock = (type: BlockType) => {
    const nb = makeBlock(type);
    onBlocksChange([...blocks, nb]);
    setExpandedId(nb.id);
  };

  const hasPhoto = blocks.some((b) => b.type === "photo");

  // Ghost block config (for the floating element during drag)
  const ghostBlock = draggingIndex !== null ? blocks[draggingIndex] : null;
  const ghostConfig = ghostBlock ? BLOCK_CONFIGS[ghostBlock.type] : null;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* LEFT COLUMN — block list */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Signature layout</h2>
          <p className="text-xs text-slate-500">Drag blocks to reorder. Click the gear to change settings.</p>
        </div>

        {/* Block list */}
        <div ref={listRef} className="space-y-2">
          {blocks.map((block, index) => {
            const config = BLOCK_CONFIGS[block.type];
            return (
              <BlockCard
                key={block.id}
                block={block}
                config={config}
                index={index}
                isPro={isPro}
                expanded={expandedId === block.id}
                data={data}
                plan={plan}
                isDragging={draggingIndex === index}
                dropLineIndex={dropLineIndex}
                totalBlocks={blocks.length}
                onToggleExpand={() =>
                  setExpandedId(expandedId === block.id ? null : block.id)
                }
                onToggleVisible={() => toggleVisible(block.id)}
                onDelete={() => deleteBlock(block.id)}
                onSettingsChange={(s) => updateSettings(block.id, s)}
                onDataChange={onDataChange}
                onDragHandleMouseDown={handleDragHandleMouseDown}
                onDragHandleTouchStart={handleDragHandleTouchStart}
              />
            );
          })}

          {blocks.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">
              <p className="text-sm text-slate-500">No blocks yet. Add one below.</p>
            </div>
          )}
        </div>

        {/* Add block button */}
        <AddBlockMenu isPro={isPro} hasPhoto={hasPhoto} onAdd={addBlock} />
      </div>

      {/* RIGHT COLUMN — WYSIWYG preview editor */}
      <div className="lg:col-span-3">
        <div className="sticky top-20 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Edit your signature</h2>
              <p className="text-xs text-slate-400">Click on any element to edit. Drag to reorder.</p>
            </div>
          </div>
          <EditableSignature
            blocks={blocks}
            data={data}
            wrapperSettings={ws}
            plan={plan}
            onBlocksChange={onBlocksChange}
            onDataChange={onDataChange}
            onWrapperSettingsChange={handleWsChange}
          />
          <CopyButton blocks={blocks} data={data} wrapperSettings={ws} plan={plan} />
        </div>
      </div>

      {/* Floating ghost element while dragging */}
      {draggingIndex !== null && ghostConfig && (
        <DragGhost
          label={ghostConfig.label}
          icon={ghostConfig.icon}
          x={ghostPos.x}
          y={ghostPos.y}
        />
      )}
    </div>
  );
}
