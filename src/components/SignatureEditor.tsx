"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { useState, useRef, useCallback, useEffect } from "react";
import { SignatureData, WrapperSettings, DEFAULT_WRAPPER_SETTINGS } from "@/lib/types";
import { generateHtmlFromBlocks, Block, getPresetForTemplate, SOCIAL_ICON_URLS, SOCIAL_LABELS, SOCIAL_FIELDS } from "@/lib/blocks";
import { generateSignatureHtml, GenerateOptions } from "@/lib/generateSignature";
import { copySignatureToClipboard } from "@/lib/clipboard";

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

function EditorToolbar({
  editor,
  wrapperSettings: ws,
  onWrapperChange,
}: {
  editor: Editor | null;
  wrapperSettings: WrapperSettings;
  onWrapperChange: (ws: WrapperSettings) => void;
}) {
  if (!editor) return null;

  const currentColor = editor.getAttributes("textStyle").color || "#000000";
  const currentSize = editor.getAttributes("textStyle").fontSize || "14";

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-slate-200 bg-slate-50 px-2 py-1.5">
      {/* Font size */}
      <select
        value={currentSize}
        onChange={(e) => {
          editor.commands.setFontSize(e.target.value + "px");
        }}
        className="h-7 rounded border border-slate-200 bg-white px-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        {[10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28].map((s) => (
          <option key={s} value={s}>{s}px</option>
        ))}
      </select>

      <div className="w-px h-5 bg-slate-200 mx-1" />

      {/* Bold */}
      <ToolbarBtn
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <strong>B</strong>
      </ToolbarBtn>

      {/* Italic */}
      <ToolbarBtn
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <em>I</em>
      </ToolbarBtn>

      {/* Strike */}
      <ToolbarBtn
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <s>S</s>
      </ToolbarBtn>

      <div className="w-px h-5 bg-slate-200 mx-1" />

      {/* Text color */}
      <label className="relative cursor-pointer" title="Text color">
        <div className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200 transition-colors">
          <span className="text-sm font-bold" style={{ color: currentColor }}>A</span>
          <div className="absolute bottom-0.5 left-1 right-1 h-0.5 rounded" style={{ backgroundColor: currentColor }} />
        </div>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>

      <div className="w-px h-5 bg-slate-200 mx-1" />

      {/* Alignment */}
      <ToolbarBtn
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        title="Align left"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M3 12h10M3 18h14"/></svg>
      </ToolbarBtn>
      <ToolbarBtn
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        title="Align center"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M7 12h10M5 18h14"/></svg>
      </ToolbarBtn>

      <div className="w-px h-5 bg-slate-200 mx-1" />

      {/* Link */}
      <ToolbarBtn
        active={editor.isActive("link")}
        onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
          } else {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        title="Link"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/></svg>
      </ToolbarBtn>

      {/* Undo / Redo */}
      <div className="w-px h-5 bg-slate-200 mx-1" />
      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 010 11H11"/></svg>
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 000 11H13"/></svg>
      </ToolbarBtn>

      {/* Spacer to push BG controls to the right */}
      <div className="flex-1" />

      {/* Background color */}
      <label className="relative cursor-pointer flex items-center gap-1" title="Signature background color">
        <div
          className="h-5 w-5 rounded border border-slate-300"
          style={{ backgroundColor: ws.backgroundColor !== "none" ? ws.backgroundColor : "#ffffff" }}
        />
        <span className="text-[10px] text-slate-500 hidden sm:inline">BG</span>
        <input
          type="color"
          value={ws.backgroundColor !== "none" ? ws.backgroundColor : "#ffffff"}
          onChange={(e) => onWrapperChange({
            ...ws,
            backgroundColor: e.target.value,
            backgroundRadius: ws.backgroundRadius || 8,
            backgroundPadding: ws.backgroundPadding || 16,
          })}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>
      {ws.backgroundColor !== "none" && (
        <>
          <ToolbarBtn
            active={ws.textOnDark}
            onClick={() => onWrapperChange({ ...ws, textOnDark: !ws.textOnDark })}
            title="Light text (for dark backgrounds)"
          >
            <span className="text-[10px]">Aa</span>
          </ToolbarBtn>
          <button
            onClick={() => onWrapperChange({ ...ws, backgroundColor: "none", backgroundPadding: 0, backgroundRadius: 0, textOnDark: false })}
            className="text-[10px] text-red-500 hover:text-red-700 px-1"
            title="Remove background"
          >
            &times;
          </button>
        </>
      )}
    </div>
  );
}

function ToolbarBtn({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded text-xs transition-colors ${
        active ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Photo section (above or beside the editor)
// ---------------------------------------------------------------------------

function PhotoSection({
  data,
  photoSettings,
  onDataChange,
  onSettingsChange,
}: {
  data: SignatureData;
  photoSettings: Record<string, unknown>;
  onDataChange: (d: SignatureData) => void;
  onSettingsChange: (s: Record<string, unknown>) => void;
}) {
  const size = Number(photoSettings.size ?? 80);
  const shape = String(photoSettings.shape ?? "circle");
  const borderWidth = Number(photoSettings.borderWidth ?? 0);
  const borderColor = String(photoSettings.borderColor ?? "#2563eb");
  const borderRadius = shape === "circle" ? "50%" : shape === "rounded" ? "8px" : shape === "near-square" ? "4px" : "0px";
  const fileRef = useRef<HTMLInputElement>(null);
  const [showControls, setShowControls] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
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

  if (!data.photoUrl) {
    return (
      <div>
        <div
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-400 text-xs"
          style={{ width: size, height: size, borderRadius, border: "2px dashed #cbd5e1" }}
        >
          + Photo
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </div>
    );
  }

  return (
    <div className="relative group" style={{ width: size }}>
      <img
        src={data.photoUrl}
        alt={data.fullName}
        onClick={() => setShowControls(!showControls)}
        className="cursor-pointer"
        style={{ width: size, height: size, borderRadius, objectFit: "cover", display: "block", border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none" }}
      />
      {/* Overlay buttons */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded" style={{ borderRadius }}>
        <button onClick={() => fileRef.current?.click()} className="rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-slate-700 hover:bg-white">Change</button>
        <button onClick={() => onDataChange({ ...data, photoUrl: "" })} className="rounded bg-red-500/90 px-2 py-1 text-[10px] font-medium text-white hover:bg-red-500">Remove</button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

      {/* Photo controls */}
      {showControls && (
        <div className="absolute top-full left-0 mt-2 z-20 rounded-lg border border-slate-200 bg-white shadow-lg p-2.5 w-48 space-y-2" onClick={(e) => e.stopPropagation()}>
          <label className="flex items-center gap-2 text-[11px] text-slate-600">
            <span className="w-10">Size</span>
            <input type="range" min={40} max={120} value={size} onChange={(e) => onSettingsChange({ ...photoSettings, size: Number(e.target.value) })} className="flex-1 accent-blue-600 h-1" />
            <span className="text-slate-400 w-7 text-right text-[10px]">{size}</span>
          </label>
          <div className="flex gap-1">
            {(["circle", "rounded", "square"] as const).map((s) => (
              <button key={s} onClick={() => onSettingsChange({ ...photoSettings, shape: s })} className={`flex-1 px-1 py-0.5 text-[10px] rounded ${shape === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>{s}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-[11px] text-slate-600">
            <span className="w-10">Border</span>
            <input type="range" min={0} max={5} value={borderWidth} onChange={(e) => onSettingsChange({ ...photoSettings, borderWidth: Number(e.target.value) })} className="flex-1 accent-blue-600 h-1" />
          </label>
          {borderWidth > 0 && (
            <label className="flex items-center gap-2 text-[11px] text-slate-600">
              <span className="w-10">Color</span>
              <input type="color" value={borderColor} onChange={(e) => onSettingsChange({ ...photoSettings, borderColor: e.target.value })} className="h-5 w-5 rounded border cursor-pointer" />
            </label>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Social icons row
// ---------------------------------------------------------------------------

function SocialRow({ data, plan }: { data: SignatureData; plan: "free" | "pro" | "team" }) {
  const isPro = plan === "pro" || plan === "team";
  const maxLinks = isPro ? 99 : 2;
  const links = SOCIAL_FIELDS.filter((f) => !!data[f]).slice(0, maxLinks);
  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-2 pt-1">
      {links.map((f) => (
        <img key={f} src={SOCIAL_ICON_URLS[f]} alt={SOCIAL_LABELS[f]} title={SOCIAL_LABELS[f]} className="w-5 h-5" />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main SignatureEditor component
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

  // Build initial editor content from signature data
  const buildContent = useCallback(() => {
    const lines: string[] = [];

    // Name
    lines.push(`<p><strong style="font-size: 18px">${data.fullName || "Your Name"}</strong>${data.pronouns ? ` <span style="color: #888; font-size: 12px">(${data.pronouns})</span>` : ""}</p>`);

    // Title + Company
    if (data.jobTitle || data.company) {
      const parts = [data.jobTitle, data.company].filter(Boolean);
      lines.push(`<p style="font-size: 13px; color: #555">${parts.join(" at ")}</p>`);
    }

    // Divider
    lines.push(`<p>—</p>`);

    // Contact
    const contacts: string[] = [];
    if (data.email) contacts.push(`<a href="mailto:${data.email}">${data.email}</a>`);
    if (data.phone) contacts.push(data.phone);
    if (data.website) contacts.push(`<a href="https://${data.website.replace(/^https?:\/\//, "")}">${data.website.replace(/^https?:\/\//, "")}</a>`);
    if (contacts.length > 0) {
      lines.push(`<p style="font-size: 12px">${contacts.join(" · ")}</p>`);
    }

    if (data.address) {
      lines.push(`<p style="font-size: 12px; color: #888">${data.address}</p>`);
    }

    return lines.join("");
  }, [data]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        code: false,
        horizontalRule: false,
      }),
      TextStyle,
      FontSize,
      Color,
      TextAlign.configure({ types: ["paragraph"] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start typing your signature..." }),
    ],
    content: buildContent(),
    editorProps: {
      attributes: {
        class: "outline-none min-h-[120px] prose prose-sm max-w-none",
        style: `font-family: ${ws.fontFamily || "Arial,Helvetica,sans-serif"}; font-size: ${ws.baseFontSize || 14}px; color: ${ws.textOnDark ? "#fff" : "#333"}`,
      },
    },
    onUpdate: ({ editor: ed }) => {
      // Sync editor content back to data
      syncEditorToData(ed);
    },
  });

  // Update editor styling when wrapper settings change
  useEffect(() => {
    if (!editor) return;
    editor.view.dom.style.fontFamily = ws.fontFamily || "Arial,Helvetica,sans-serif";
    editor.view.dom.style.fontSize = `${ws.baseFontSize || 14}px`;
    editor.view.dom.style.color = ws.textOnDark ? "#fff" : "#333";
  }, [editor, ws]);

  // Sync TipTap content back to SignatureData (basic extraction)
  const syncEditorToData = useCallback((ed: Editor) => {
    // For now, we keep the data in sync through direct editing
    // The TipTap content IS the source of truth for the text
    // The export will use TipTap's HTML output
  }, []);

  // Photo block
  const photoBlock = blocks.find((b) => b.type === "photo" && b.visible);
  const photoPosition = photoBlock ? String(photoBlock.settings.position ?? "left") : "left";

  const updatePhotoSettings = useCallback((s: Record<string, unknown>) => {
    if (!photoBlock) return;
    onBlocksChange(blocks.map((b) => b.id === photoBlock.id ? { ...b, settings: s } : b));
  }, [photoBlock, blocks, onBlocksChange]);

  // Copy handler — uses the block renderer for email-safe output
  const handleCopy = async () => {
    const options: GenerateOptions = { plan, signatureId: sigId };
    let html = generateHtmlFromBlocks(blocks, data, ws, options);

    // Upload base64 photo to R2
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

  // Wrapper styles for the editor area
  const editorWrapperStyle: React.CSSProperties = {
    backgroundColor: ws.backgroundColor !== "none" ? ws.backgroundColor : "#ffffff",
    borderRadius: ws.backgroundRadius || 0,
    padding: ws.backgroundPadding || 24,
    borderTop: ws.borderTop || undefined,
    borderLeft: ws.borderLeft || undefined,
    paddingLeft: ws.borderLeft ? (ws.backgroundPadding || 24) : (ws.backgroundPadding || 24),
  };

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <EditorToolbar editor={editor} wrapperSettings={ws} onWrapperChange={onWrapperSettingsChange} />

      {/* Mock email compose window */}
      <div className="rounded-b-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Email chrome header */}
        <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="ml-2 text-xs text-slate-400 font-medium">New Message</span>
        </div>
        {/* Email fields */}
        <div className="border-b border-slate-100 px-4 py-1.5">
          <span className="text-xs text-slate-400">To: </span>
          <span className="text-xs text-slate-600">recipient@company.com</span>
        </div>
        <div className="border-b border-slate-100 px-4 py-1.5">
          <span className="text-xs text-slate-400">Subject: </span>
          <span className="text-xs text-slate-600">Quick follow up</span>
        </div>
        {/* Email body with typed message */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-sm text-slate-500">Hi there,</p>
          <p className="text-sm text-slate-500 mt-1">Just wanted to follow up on our conversation. Let me know if you have any questions.</p>
          <p className="text-sm text-slate-500 mt-1">Best regards,</p>
        </div>
        {/* Signature area */}
        <div className="px-4 pb-4" style={editorWrapperStyle}>
        <div style={{
          display: "flex",
          gap: 14,
          flexDirection: photoPosition === "right" ? "row-reverse" : "row",
          alignItems: "flex-start",
        }}>
          {/* Photo */}
          {photoBlock && (
            <div style={{ flexShrink: 0 }}>
              <PhotoSection
                data={data}
                photoSettings={photoBlock.settings}
                onDataChange={onDataChange}
                onSettingsChange={updatePhotoSettings}
              />
            </div>
          )}

          {/* Text content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <EditorContent editor={editor} />
            <SocialRow data={data} plan={plan} />
          </div>
        </div>
        </div>
      </div>

      {/* Copy button */}
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
    </div>
  );
}
