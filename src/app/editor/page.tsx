"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { SignatureData, TemplateName, DEFAULT_SIGNATURE_DATA, TEMPLATES, WrapperSettings, DEFAULT_WRAPPER_SETTINGS } from "@/lib/types";
import { generateSignatureHtml, generateCopyHtml } from "@/lib/generateSignature";
import { copySignatureToClipboard } from "@/lib/clipboard";
import { Block, getDefaultBlocks, getPresetForTemplate } from "@/lib/blocks";
import BlockEditor from "@/components/BlockEditor";


// ---------------------------------------------------------------------------
// ProBadge helper component
// ---------------------------------------------------------------------------

interface ProBadgeProps {
  label?: string;
  className?: string;
}

function ProBadge({ label = "Pro feature", className = "" }: ProBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 ring-1 ring-amber-300 ${className}`}
    >
      <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8z" />
      </svg>
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ProGateField — wraps a field and shows a lock overlay for free users
// ---------------------------------------------------------------------------

interface ProGateFieldProps {
  children: React.ReactNode;
  locked: boolean;
  message?: string;
}

function ProGateField({
  children,
  locked,
  message = "Upgrade to Pro to use this feature",
}: ProGateFieldProps) {
  if (!locked) return <>{children}</>;
  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-40">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-[1px]">
        <div className="flex flex-col items-center gap-1.5 px-3 text-center">
          <ProBadge label="PRO" />
          <p className="text-xs text-slate-600">{message}</p>
          <a
            href="https://neatstamp.com/pricing"
            className="mt-0.5 rounded-md bg-amber-500 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
          >
            Upgrade — $5/mo
          </a>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------

interface ToastProps {
  message: string;
  type?: "info" | "warning" | "success";
  onClose: () => void;
}

function Toast({ message, type = "info", onClose }: ToastProps) {
  const colors = {
    info: "bg-slate-800 text-white",
    warning: "bg-amber-50 border border-amber-200 text-amber-800",
    success: "bg-emerald-50 border border-emerald-200 text-emerald-800",
  };
  return (
    <div
      className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 max-w-sm w-full mx-4 rounded-xl px-4 py-3 shadow-lg flex items-start gap-3 ${colors[type]}`}
    >
      <p className="text-sm flex-1">{message}</p>
      <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100 text-lg leading-none">
        ×
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pro-aware Template Selector
// ---------------------------------------------------------------------------

interface ProTemplateSelectorProps {
  data: SignatureData;
  selectedTemplate: TemplateName;
  onSelect: (template: TemplateName) => void;
  isPro: boolean;
  onProClick: () => void;
}

function ProTemplateSelector({
  data,
  selectedTemplate,
  onSelect,
  isPro,
  onProClick,
}: ProTemplateSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-2">Choose a Template</h3>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-10">
        {TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const locked = template.isPro && !isPro;
          const previewData: SignatureData = {
            ...DEFAULT_SIGNATURE_DATA,
            template: template.id as TemplateName,
            fullName: template.previewName || DEFAULT_SIGNATURE_DATA.fullName,
            jobTitle: template.previewTitle || DEFAULT_SIGNATURE_DATA.jobTitle,
            company: template.previewCompany || DEFAULT_SIGNATURE_DATA.company,
            photoUrl: template.previewPhoto ? `https://neatstamp.com${template.previewPhoto}` : "",
          };
          const previewHtml = generateSignatureHtml(previewData);

          return (
            <button
              key={template.id}
              onClick={() => {
                if (locked) {
                  onProClick();
                } else {
                  onSelect(template.id);
                }
              }}
              className={`relative rounded-lg border-2 p-2 text-left transition-all ${
                isSelected
                  ? "border-primary bg-blue-50"
                  : locked
                    ? "border-border bg-gray-50 opacity-70 hover:opacity-90"
                    : "border-border bg-white hover:border-primary-light"
              }`}
            >
              {locked && (
                <span className="absolute -top-1.5 -right-1.5 z-10 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
                  PRO
                </span>
              )}
              {locked && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/60">
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
              )}
              <div
                className="mb-1 max-h-12 overflow-hidden pointer-events-none"
                style={{ transform: "scale(0.25)", transformOrigin: "top left", width: "400%", height: "48px" }}
              >
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              </div>
              <p className="text-[11px] font-semibold text-foreground truncate">{template.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pro-aware Signature Form
// ---------------------------------------------------------------------------

interface ProSignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
  isPro: boolean;
}

function FormSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-surface px-3 py-2 text-xs font-semibold text-foreground hover:bg-gray-100 transition-colors">
        {title}
        <svg
          className="h-4 w-4 text-muted transition-transform group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <div className="mt-2 space-y-2 px-1">{children}</div>
    </details>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-muted mb-0.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-md border border-border bg-white px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-7 w-7 cursor-pointer rounded border border-border disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div>
        <label className="block text-[11px] font-medium text-muted">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-24 rounded border border-border bg-white px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
}

function ProSignatureForm({ data, onChange, isPro }: ProSignatureFormProps) {
  const update = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 200;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        update("photoUrl", dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Count filled social links
  const socialFields: (keyof SignatureData)[] = [
    "linkedin", "twitter", "instagram", "facebook", "github", "youtube",
  ];
  const filledSocial = socialFields.filter((f) => !!data[f]).length;
  const FREE_SOCIAL_LIMIT = 2;

  const socialLabels: Record<string, string> = {
    linkedin: "LinkedIn",
    twitter: "X (Twitter)",
    instagram: "Instagram",
    facebook: "Facebook",
    github: "GitHub",
    youtube: "YouTube",
  };

  const socialPlaceholders: Record<string, string> = {
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://x.com/username",
    instagram: "https://instagram.com/username",
    facebook: "https://facebook.com/username",
    github: "https://github.com/username",
    youtube: "https://youtube.com/@channel",
  };

  return (
    <div className="space-y-3">
      <FormSection title="Personal Information">
        <InputField label="Full Name" value={data.fullName} onChange={(v) => update("fullName", v)} placeholder="John Doe" />
        <InputField label="Job Title" value={data.jobTitle} onChange={(v) => update("jobTitle", v)} placeholder="Marketing Manager" />
        <InputField label="Company" value={data.company} onChange={(v) => update("company", v)} placeholder="Acme Corp" />
        <InputField label="Pronouns" value={data.pronouns} onChange={(v) => update("pronouns", v)} placeholder="he/him, she/her, they/them" />
      </FormSection>

      <FormSection title="Contact Details">
        <InputField label="Email" value={data.email} onChange={(v) => update("email", v)} placeholder="john@company.com" type="email" />
        <InputField label="Phone" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 123-4567" type="tel" />
        <InputField label="Website" value={data.website} onChange={(v) => update("website", v)} placeholder="www.company.com" />
        <InputField label="Address" value={data.address} onChange={(v) => update("address", v)} placeholder="123 Main St, New York, NY" />
      </FormSection>

      <FormSection title="Photo" defaultOpen={false}>
        <div>
          <label className="block text-[11px] font-medium text-muted mb-1">Profile Photo or Logo</label>
          {data.photoUrl ? (
            <div className="flex items-center gap-2">
              <img src={data.photoUrl} alt="Preview" className="h-12 w-12 rounded-full object-cover border border-border" />
              <button onClick={() => update("photoUrl", "")} className="text-[11px] text-red-500 hover:text-red-700">Remove</button>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface px-3 py-4 text-xs text-muted hover:border-primary hover:text-primary transition-colors">
              <span>Click to upload (max 2MB)</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          )}
          <p className="mt-1 text-[11px] text-muted-light">Or paste an image URL:</p>
          <input
            type="text"
            value={data.photoUrl.startsWith("data:") ? "" : data.photoUrl}
            onChange={(e) => update("photoUrl", e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="mt-1 w-full rounded-md border border-border bg-white px-2.5 py-1.5 text-xs placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </FormSection>

      {/* Social links with Pro gating after 2 */}
      <FormSection title="Social Media" defaultOpen={false}>
        {socialFields.map((field, idx) => {
          const isOverLimit = !isPro && idx >= FREE_SOCIAL_LIMIT;
          const isFilled = !!data[field];
          // Lock unfilled fields beyond the free limit, but keep filled ones accessible
          const shouldLock = isOverLimit && !isFilled;

          if (shouldLock) {
            return (
              <div key={field} className="rounded-lg border border-dashed border-amber-200 bg-amber-50 px-2.5 py-2 flex items-center justify-between gap-2">
                <span className="text-[11px] text-amber-700 font-medium">{socialLabels[field]}</span>
                <div className="flex items-center gap-2">
                  <ProBadge label="Pro for unlimited links" />
                  <a href="https://neatstamp.com/pricing" className="text-xs text-amber-600 underline hover:text-amber-800">Upgrade</a>
                </div>
              </div>
            );
          }

          return (
            <InputField
              key={field}
              label={socialLabels[field]}
              value={data[field] as string}
              onChange={(v) => update(field, v)}
              placeholder={socialPlaceholders[field]}
            />
          );
        })}
        {!isPro && filledSocial < FREE_SOCIAL_LIMIT && (
          <p className="text-[11px] text-muted-light">
            {FREE_SOCIAL_LIMIT - filledSocial} free social link{FREE_SOCIAL_LIMIT - filledSocial !== 1 ? "s" : ""} remaining.{" "}
            <a href="https://neatstamp.com/pricing" className="text-primary underline">Upgrade for unlimited.</a>
          </p>
        )}
      </FormSection>

      {/* Color picker — visible but disabled for free users */}
      <FormSection title="Styling">
        <ProGateField
          locked={!isPro}
          message="Custom colors are a Pro feature"
        >
          <div className="flex gap-6">
            <ColorField
              label="Primary Color"
              value={data.primaryColor}
              onChange={(v) => update("primaryColor", v)}
              disabled={!isPro}
            />
            <ColorField
              label="Accent Color"
              value={data.accentColor}
              onChange={(v) => update("accentColor", v)}
              disabled={!isPro}
            />
          </div>
        </ProGateField>
      </FormSection>

      {/* Extras with Pro gating */}
      <FormSection title="Extras" defaultOpen={false}>
        {/* Calendly */}
        <ProGateField locked={!isPro} message="Calendly booking buttons are a Pro feature">
          <InputField
            label="Calendly / Booking URL"
            value={data.calendlyUrl}
            onChange={(v) => update("calendlyUrl", v)}
            placeholder="https://calendly.com/yourname"
            disabled={!isPro}
          />
        </ProGateField>

        {/* Disclaimer */}
        <ProGateField locked={!isPro} message="Email disclaimers are a Pro feature">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              Email Disclaimer
              {!isPro && <ProBadge className="ml-2" />}
            </label>
            <textarea
              disabled={!isPro}
              placeholder="Confidentiality notice or legal disclaimer..."
              className="w-full rounded-md border border-border bg-white px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              rows={2}
            />
          </div>
        </ProGateField>

        {/* CTA Banner */}
        <ProGateField locked={!isPro} message="CTA banners are a Pro feature">
          <InputField
            label="CTA Banner Image URL"
            value={data.ctaBannerUrl}
            onChange={(v) => update("ctaBannerUrl", v)}
            placeholder="https://example.com/banner.png"
            disabled={!isPro}
          />
          {data.ctaBannerUrl && isPro && (
            <InputField
              label="CTA Banner Link"
              value={data.ctaBannerLink}
              onChange={(v) => update("ctaBannerLink", v)}
              placeholder="https://example.com/promo"
            />
          )}
        </ProGateField>
      </FormSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pro-aware Signature Preview (with copy restrictions message)
// ---------------------------------------------------------------------------

interface ProSignaturePreviewProps {
  data: SignatureData;
  isPro: boolean;
  onAfterCopy: () => void;
}

function ProSignaturePreview({ data, isPro, onAfterCopy }: ProSignaturePreviewProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [showCode, setShowCode] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [sigId] = useState(() => crypto.randomUUID());

  // Preview: always show full HTML (so user can see what they're building)
  const previewHtml = generateSignatureHtml(data);

  // Copy: free users get image, pro users get HTML
  const copyHtml = generateCopyHtml(data, {
    plan: isPro ? "pro" : "free",
    signatureId: sigId,
  });

  const handleCopy = async () => {
    // Free users: save signature data to D1 first so the render endpoint works
    if (!isPro) {
      try {
        await fetch("/api/signatures/free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: sigId, data, template: data.template }),
        });
      } catch {
        // Continue even if save fails — user still gets the copy
      }
    }

    const success = await copySignatureToClipboard(copyHtml);
    if (success) {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
      if (!isPro) onAfterCopy();
    } else {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 3000);
    }
  };

  const handleSelect = () => {
    if (!previewRef.current) return;
    const range = document.createRange();
    range.selectNodeContents(previewRef.current);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    if (!isPro) onAfterCopy();
  };

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(copyHtml);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
      if (!isPro) onAfterCopy();
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = copyHtml;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
      if (!isPro) onAfterCopy();
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Preview</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Outlook-safe</span>
            <span className="inline-flex h-5 items-center rounded-full bg-emerald-50 px-2 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Verified
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-6">
          <div
            ref={previewRef}
            className="signature-preview-container"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all shadow-sm ${
            copyState === "copied"
              ? "bg-emerald-500 text-white shadow-emerald-500/25"
              : copyState === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-600 text-white shadow-blue-600/25 hover:bg-blue-700 hover:shadow-md"
          }`}
        >
          {copyState === "copied" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied! Now paste in your email client
            </span>
          ) : copyState === "error" ? (
            <span>Copy failed — use &quot;Select&quot; below and Ctrl+C</span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy Signature
            </span>
          )}
        </button>

        <button
          onClick={handleSelect}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
          title="Select the signature — then press Ctrl+C to copy"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <button
          onClick={() => setShowCode(!showCode)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
          title="View HTML code"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </button>
      </div>

      {copyState === "error" && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs text-amber-800">
            <strong>Tip:</strong> Click the select button to highlight the signature, then press <strong>Ctrl+C</strong> (or Cmd+C on Mac) to copy manually.
          </p>
        </div>
      )}

      {showCode && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">HTML Code</span>
            <button
              onClick={handleCopyHtml}
              className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-blue-400 hover:text-blue-300 hover:bg-slate-700 transition-colors"
            >
              {copyState === "copied" ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <pre className="max-h-60 overflow-auto text-xs text-slate-300 leading-relaxed">
            <code>{copyHtml}</code>
          </pre>
        </div>
      )}

      <div className="rounded-xl bg-slate-50 border border-slate-100 p-5">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">How to install your signature</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { client: "Gmail", steps: "Settings → See all settings → Signature → Paste" },
            { client: "Outlook", steps: "File → Options → Mail → Signatures → Paste" },
            { client: "Apple Mail", steps: "Settings → Signatures → Paste" },
            { client: "Yahoo", steps: "Settings → More Settings → Writing email → Paste" },
          ].map((item) => (
            <div key={item.client} className="flex gap-2">
              <span className="text-xs font-semibold text-slate-700 min-w-[70px]">{item.client}:</span>
              <span className="text-xs text-slate-500">{item.steps}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main EditorPage
// ---------------------------------------------------------------------------

const steps = [
  { number: 1, label: "Choose a template" },
  { number: 2, label: "Enter your details" },
  { number: 3, label: "Copy & go" },
];

export default function EditorPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [userPlan, setUserPlan] = useState<"free" | "pro" | "team">("free");
  const [planLoaded, setPlanLoaded] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "info" | "warning" | "success" } | null>(null);
  const [editorMode, setEditorMode] = useState<"templates" | "blocks">("templates");
  const [blocks, setBlocks] = useState<Block[]>(() => getDefaultBlocks());
  const [wrapperSettings, setWrapperSettings] = useState<WrapperSettings>(DEFAULT_WRAPPER_SETTINGS);
  const previewRef = useRef<HTMLDivElement>(null);

  const isPro = userPlan === "pro" || userPlan === "team";

  // Fetch user plan when session is available
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/plan")
        .then((r) => r.json())
        .then((result) => {
          const r = result as { plan?: string };
          if (r.plan === "pro" || r.plan === "team") {
            setUserPlan(r.plan as "pro" | "team");
          }
          setPlanLoaded(true);
        })
        .catch(() => setPlanLoaded(true));
    } else if (status === "unauthenticated") {
      setPlanLoaded(true);
    }
  }, [status]);

  const handleTemplateSelect = (template: TemplateName) => {
    const tpl = TEMPLATES.find((t) => t.id === template);
    const updatedData = { ...data, template };
    if (!data.photoUrl && tpl?.previewPhoto) {
      updatedData.photoUrl = `https://neatstamp.com${tpl.previewPhoto}`;
    }
    const preset = getPresetForTemplate(template, updatedData);
    setData(updatedData);
    setBlocks(preset.blocks);
    setWrapperSettings(preset.wrapperSettings);
  };

  const handleProTemplateClick = () => {
    setToast({
      message: "Upgrade to Pro to use this template — $5/month",
      type: "warning",
    });
  };

  const handleAfterCopy = () => {
    setToast({
      message:
        "Your free signature expires in 90 days. Upgrade to Pro for permanent signatures.",
      type: "warning",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButton(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );
    if (previewRef.current) observer.observe(previewRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <nav className="flex items-center justify-center gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-semibold">
                  {step.number}
                </div>
                <span className="mt-1 text-xs font-medium text-muted hidden sm:block whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="mx-2 mb-4 h-px w-12 bg-border sm:w-20" />
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Create Your Email Signature
        </h1>
        <p className="mt-2 text-muted">
          {isPro
            ? "Pro plan — all features unlocked."
            : "Free. No account needed. Works in Gmail, Outlook, Apple Mail & more."}
        </p>
      </div>

      {/* Template selector + Drag & Drop editor — all on one page */}

      <div className="mb-2">
        <ProTemplateSelector
          data={data}
          selectedTemplate={data.template}
          onSelect={handleTemplateSelect}
          isPro={isPro}
          onProClick={handleProTemplateClick}
        />
      </div>

      {/* Pro template note */}
      {!isPro && (
        <p className="mb-8 text-center text-xs text-muted">
          Pro templates require a $5/mo subscription.{" "}
          <a href="https://neatstamp.com/pricing" className="font-medium text-primary underline">
            Upgrade to Pro
          </a>
        </p>
      )}
      {isPro && <div className="mb-8" />}

      {/* Three-column layout: form | blocks | preview */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Left: Your details form (compact) */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Your Details</h2>
            <ProSignatureForm data={data} onChange={setData} isPro={isPro} />
          </div>
        </div>

        {/* Right: Drag & drop layout + live preview + copy */}
        <div className="lg:col-span-5">
          <BlockEditor
            blocks={blocks}
            onBlocksChange={setBlocks}
            data={data}
            onDataChange={setData}
            plan={userPlan}
            wrapperSettings={wrapperSettings}
            onWrapperSettingsChange={setWrapperSettings}
          />
        </div>
      </div>

      {/* Why sign up — only for free users */}
      {!isPro && planLoaded && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-sm font-semibold text-slate-900">Want custom colors, unlimited signatures & more?</p>
          <p className="mt-1 text-xs text-slate-500">Upgrade to Pro for $5/month. 30-day money-back guarantee.</p>
          <div className="mt-3 flex justify-center gap-3">
            {status === "unauthenticated" ? (
              <a href="https://app.neatstamp.com/login" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
                Sign in first
              </a>
            ) : (
              <a href="https://neatstamp.com/pricing" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
                Upgrade to Pro
              </a>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
