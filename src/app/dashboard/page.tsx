"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import Link from "next/link";
import { SignatureData, DEFAULT_SIGNATURE_DATA, TemplateName, TEMPLATES, WrapperSettings, DEFAULT_WRAPPER_SETTINGS, ColorTheme, COLOR_THEMES } from "@/lib/types";
import { Block, getDefaultBlocks, getPresetForTemplate } from "@/lib/blocks";
import SignatureEditor from "@/components/SignatureEditor";
import TemplateSelector from "@/components/TemplateSelector";
import { generateSignatureHtml } from "@/lib/generateSignature";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Plan = "free" | "pro" | "team";
type ActiveTab = "signatures" | "editor" | "analytics" | "banners" | "settings";

interface Signature {
  id: string;
  name: string;
  template: string;
  updated_at: string;
  data: SignatureData;
}

interface Analytics {
  opens_this_week: number;
  opens_this_month: number;
  top_links: { url: string; clicks: number }[];
}

interface BannerCampaign {
  id: string;
  name: string;
  status: "active" | "paused";
  clicks: number;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
}

// ---------------------------------------------------------------------------
// Small utility components
// ---------------------------------------------------------------------------

function Avatar({ src, name }: { src?: string | null; name?: string | null }) {
  if (src) {
    return <img src={src} alt={name ?? ""} className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm" />;
  }
  const initials = (name ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-xs font-bold ring-2 ring-white shadow-sm">
      {initials}
    </div>
  );
}

function PlanBadge({ plan }: { plan: Plan }) {
  const styles: Record<Plan, string> = {
    free: "bg-slate-100 text-slate-600",
    pro: "bg-amber-100 text-amber-700",
    team: "bg-violet-100 text-violet-700",
  };
  const labels: Record<Plan, string> = { free: "Free", pro: "Pro", team: "Team" };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[plan]}`}>
      {labels[plan]}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-16 text-center">
      <div className="mb-3 text-muted">{icon}</div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-muted">{description}</p>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Plan Status Card
// ---------------------------------------------------------------------------

function PlanCard({
  plan,
  expiresAt,
  onUpgrade,
}: {
  plan: Plan;
  expiresAt?: string;
  onUpgrade: () => void;
}) {
  if (plan === "free") {
    return (
      <div className="rounded-xl border border-border bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PlanBadge plan="free" />
          <p className="text-sm text-muted">Free Plan</p>
        </div>
        <button
          onClick={onUpgrade}
          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          Upgrade to Pro
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <PlanBadge plan={plan} />
        <p className="text-sm text-muted">
          {plan === "team" ? "Team Plan" : "Pro Plan"}
          {expiresAt ? (
            <span className="text-xs text-amber-600 ml-2">· Cancels {new Date(expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          ) : (
            <span className="text-xs text-emerald-600 ml-2">· Active</span>
          )}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Signature Card
// ---------------------------------------------------------------------------

function SignatureCard({
  sig,
  onEdit,
  onCopy,
  onDelete,
}: {
  sig: Signature;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  // Parse signature data for preview
  const sigData = (() => {
    try {
      const parsed = typeof sig.data === "string" ? JSON.parse(sig.data) : sig.data;
      const { _blocks, _wrapperSettings, ...rest } = parsed;
      return { ...DEFAULT_SIGNATURE_DATA, ...rest } as SignatureData;
    } catch {
      return DEFAULT_SIGNATURE_DATA;
    }
  })();
  const previewHtml = generateSignatureHtml(sigData);

  return (
    <div className="rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Mini signature preview */}
      <div className="border-b border-slate-100 bg-slate-50 p-4">
        <div
          className="pointer-events-none select-none overflow-hidden"
          style={{ transform: "scale(0.55)", transformOrigin: "top left", width: "182%", maxHeight: "90px" }}
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{sig.name}</p>
            <p className="mt-0.5 text-xs text-muted capitalize">
              {sig.template} template · Edited{" "}
              {new Date(sig.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-slate-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onCopy}
            className="flex-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Copy
          </button>
          <button
            onClick={onDelete}
            className="rounded-lg border border-red-100 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-100 transition-colors"
            title="Delete signature"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Compact Signature Form (for dashboard editor)
// ---------------------------------------------------------------------------

function CompactInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-slate-500 mb-0.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function CompactSignatureForm({
  data,
  onChange,
  plan,
}: {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
  plan: "free" | "pro" | "team";
}) {
  const isPro = plan === "pro" || plan === "team";
  const FREE_SOCIAL_LIMIT = 2;
  const update = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image must be under 2MB"); return; }
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
        update("photoUrl", canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <details open className="group">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors">
          Personal Info
          <svg className="h-3.5 w-3.5 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="mt-2 space-y-2 px-1">
          <CompactInput label="Full Name" value={data.fullName} onChange={(v) => update("fullName", v)} placeholder="John Doe" />
          <CompactInput label="Job Title" value={data.jobTitle} onChange={(v) => update("jobTitle", v)} placeholder="Marketing Manager" />
          <CompactInput label="Company" value={data.company} onChange={(v) => update("company", v)} placeholder="Acme Corp" />
          <CompactInput label="Pronouns" value={data.pronouns} onChange={(v) => update("pronouns", v)} placeholder="he/him" />
        </div>
      </details>

      <details open className="group">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors">
          Contact
          <svg className="h-3.5 w-3.5 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="mt-2 space-y-2 px-1">
          <CompactInput label="Email" value={data.email} onChange={(v) => update("email", v)} placeholder="john@company.com" type="email" />
          <CompactInput label="Phone" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 123-4567" type="tel" />
          <CompactInput label="Website" value={data.website} onChange={(v) => update("website", v)} placeholder="www.company.com" />
          <CompactInput label="Address" value={data.address} onChange={(v) => update("address", v)} placeholder="123 Main St, New York" />
        </div>
      </details>

      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors">
          Photo
          <svg className="h-3.5 w-3.5 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="mt-2 space-y-2 px-1">
          {data.photoUrl ? (
            <div className="flex items-center gap-2">
              <img src={data.photoUrl} alt="Preview" className="h-10 w-10 rounded-full object-cover border border-slate-200" />
              <button onClick={() => update("photoUrl", "")} className="text-[11px] text-red-500 hover:text-red-700">Remove</button>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
              <span>Upload photo (max 2MB)</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          )}
        </div>
      </details>

      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors">
          Social Media {!isPro && <span className="text-[10px] text-slate-400 font-normal ml-1">(2 free)</span>}
          <svg className="h-3.5 w-3.5 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="mt-2 space-y-2 px-1">
          {([
            { key: "linkedin" as keyof SignatureData, label: "LinkedIn", ph: "https://linkedin.com/in/..." },
            { key: "twitter" as keyof SignatureData, label: "X (Twitter)", ph: "https://x.com/..." },
            { key: "instagram" as keyof SignatureData, label: "Instagram", ph: "https://instagram.com/..." },
            { key: "facebook" as keyof SignatureData, label: "Facebook", ph: "https://facebook.com/..." },
            { key: "github" as keyof SignatureData, label: "GitHub", ph: "https://github.com/..." },
            { key: "youtube" as keyof SignatureData, label: "YouTube", ph: "https://youtube.com/@..." },
          ]).map((field, idx) => {
            const isLocked = !isPro && idx >= FREE_SOCIAL_LIMIT && !data[field.key];
            if (isLocked) {
              return (
                <div key={field.key} className="rounded-lg border border-dashed border-amber-200 bg-amber-50 px-2.5 py-2 flex items-center justify-between">
                  <span className="text-[11px] text-amber-700 font-medium">{field.label}</span>
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">PRO</span>
                </div>
              );
            }
            return (
              <CompactInput key={field.key} label={field.label} value={data[field.key] as string} onChange={(v) => update(field.key, v)} placeholder={field.ph} />
            );
          })}
        </div>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar / Tab navigation
// ---------------------------------------------------------------------------

function SideNav({
  activeTab,
  onTabChange,
  plan,
}: {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  plan: Plan;
}) {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; proOnly?: boolean }[] = [
    {
      id: "signatures",
      label: "Signatures",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
      ),
    },
    {
      id: "editor",
      label: "Editor",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      proOnly: true,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      id: "banners",
      label: "Banners",
      proOnly: true,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="flex flex-row gap-1 lg:flex-col">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isLocked = tab.proOnly && plan === "free";
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full ${
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:bg-slate-100 hover:text-foreground"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            {isLocked && !isActive && (
              <svg className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-400 hidden sm:block" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Tab: Signatures
// ---------------------------------------------------------------------------

function SignaturesTab({
  signatures,
  plan,
  loading,
  onCreateNew,
  onEdit,
  onCopy,
  onDelete,
  onUpgrade,
}: {
  signatures: Signature[];
  plan: Plan;
  loading: boolean;
  onCreateNew: () => void;
  onEdit: (sig: Signature) => void;
  onCopy: (sig: Signature) => void;
  onDelete: (id: string) => void;
  onUpgrade: () => void;
}) {
  const isPro = plan === "pro" || plan === "team";
  const canCreate = isPro || signatures.length === 0;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-foreground">My Signatures</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Existing signature cards */}
        {signatures.map((sig) => (
          <SignatureCard
            key={sig.id}
            sig={sig}
            onEdit={() => onEdit(sig)}
            onCopy={() => onCopy(sig)}
            onDelete={() => onDelete(sig.id)}
          />
        ))}

        {/* Create new card */}
        <button
          onClick={canCreate ? onCreateNew : onUpgrade}
          className={`rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 transition-colors min-h-[180px] ${
            canCreate
              ? "border-slate-300 hover:border-primary hover:bg-blue-50 text-slate-500 hover:text-primary cursor-pointer"
              : "border-slate-200 bg-slate-50 text-slate-400 cursor-pointer"
          }`}
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="text-sm font-medium">
            {canCreate ? "Create new signature" : "Create another"}
          </span>
          {!canCreate && (
            <span className="text-xs text-slate-400">Requires Pro</span>
          )}
        </button>
      </div>

    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Analytics
// ---------------------------------------------------------------------------

function AnalyticsTab({
  analytics,
  plan,
  loading,
  onUpgrade,
}: {
  analytics: Analytics | null;
  plan: Plan;
  loading: boolean;
  onUpgrade: () => void;
}) {
  const isPro = plan === "pro" || plan === "team";

  if (!isPro) {
    return (
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
        <div className="rounded-xl border-2 border-dashed border-border p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-foreground">Analytics is a Pro feature</h3>
          <p className="mt-1 text-xs text-muted max-w-xs mx-auto">
            See how many people opened your emails and which links they clicked.
          </p>
          <button
            onClick={onUpgrade}
            className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Upgrade to Pro — $5/month
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Opens this week" value={analytics?.opens_this_week ?? 0} />
        <StatCard label="Opens this month" value={analytics?.opens_this_month ?? 0} />
        <StatCard label="Total link clicks" value={analytics?.top_links.reduce((s, l) => s + l.clicks, 0) ?? 0} />
      </div>

      {analytics?.top_links && analytics.top_links.length > 0 ? (
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Top Clicked Links</h3>
          <div className="space-y-2">
            {analytics.top_links.map((link) => (
              <div key={link.url} className="flex items-center justify-between gap-3">
                <span className="truncate text-xs text-muted max-w-[300px]">{link.url}</span>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                  {link.clicks} clicks
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          }
          title="No link clicks yet"
          description="Data will appear here once people start clicking links in your signature."
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Banners
// ---------------------------------------------------------------------------

function BannersTab({
  campaigns,
  plan,
  loading,
  onCreateNew,
  onUpgrade,
}: {
  campaigns: BannerCampaign[];
  plan: Plan;
  loading: boolean;
  onCreateNew: () => void;
  onUpgrade: () => void;
}) {
  const isPro = plan === "pro" || plan === "team";

  if (!isPro) {
    return (
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-foreground">Banner Campaigns</h2>
        <div className="rounded-xl border-2 border-dashed border-border p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-foreground">Banner campaigns are a Pro feature</h3>
          <p className="mt-1 text-xs text-muted max-w-xs mx-auto">
            Add promotional banners to your email signatures and track clicks.
          </p>
          <button
            onClick={onUpgrade}
            className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Upgrade to Pro — $5/month
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Banner Campaigns</h2>
        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <EmptyState
          icon={
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          }
          title="No campaigns yet"
          description="Create a banner campaign to promote your products or services via your email signature."
          cta={
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              Create campaign
            </button>
          }
        />
      ) : (
        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between rounded-xl border border-border bg-white p-4 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-foreground">{campaign.name}</p>
                <p className="text-xs text-muted">{campaign.clicks} clicks</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${campaign.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {campaign.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Settings
// ---------------------------------------------------------------------------

function SettingsTab({
  plan,
  planExpiresAt,
  teamMembers,
  loadingTeam,
  onInviteMember,
  onUpgrade,
}: {
  plan: Plan;
  planExpiresAt?: string;
  teamMembers: TeamMember[];
  loadingTeam: boolean;
  onInviteMember: () => void;
  onUpgrade: () => void;
}) {
  const isTeam = plan === "team";
  const isPro = plan === "pro" || plan === "team";
  const [cancelStatus, setCancelStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel your subscription? You'll keep Pro access until the end of your billing period.")) return;
    setCancelStatus("loading");
    try {
      const res = await fetch("/api/user/cancel", { method: "POST" });
      if (res.ok) {
        setCancelStatus("done");
      } else {
        setCancelStatus("error");
      }
    } catch {
      setCancelStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Settings</h2>

      {/* Billing / Subscription */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-3">Subscription</h3>
        {isPro ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground font-medium">Pro Plan</p>
                {planExpiresAt ? (
                  <p className="text-xs text-amber-600">Cancels on {new Date(planExpiresAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                ) : (
                  <p className="text-xs text-emerald-600">Active</p>
                )}
              </div>
              <PlanBadge plan={plan} />
            </div>
            {cancelStatus === "done" || planExpiresAt ? (
              <p className="text-xs text-muted">Your Pro features remain active until the end of your billing period.</p>
            ) : (
              <button
                onClick={handleCancel}
                disabled={cancelStatus === "loading"}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
              >
                {cancelStatus === "loading" ? "Cancelling..." : cancelStatus === "error" ? "Failed — try again" : "Cancel subscription"}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted">You&apos;re on the free plan.</p>
            <button
              onClick={onUpgrade}
              className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>
        )}
      </div>

      {/* QR Code generator */}
      {isPro && (
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">QR Code Generator</h3>
              <p className="mt-0.5 text-xs text-muted">Generate a QR code for your signature link.</p>
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
              Generate QR
            </button>
          </div>
        </div>
      )}

      {/* Team section */}
      {isTeam && (
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Team Members</h3>
              <p className="mt-0.5 text-xs text-muted">Manage your team&apos;s access.</p>
            </div>
            <button
              onClick={onInviteMember}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
              Invite member
            </button>
          </div>
          {loadingTeam ? (
            <LoadingSpinner />
          ) : teamMembers.length === 0 ? (
            <p className="text-xs text-muted">No team members yet. Invite someone to get started.</p>
          ) : (
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50">
                  <Avatar name={member.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
                    <p className="truncate text-xs text-muted">{member.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${member.role === "admin" ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-600"}`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Brand guidelines (Team only) */}
      {isTeam && (
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-1">Brand Guidelines</h3>
          <p className="text-xs text-muted mb-4">Set default colors and templates for your team.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Primary brand color</label>
              <input type="color" className="h-8 w-16 cursor-pointer rounded border border-border" defaultValue="#2563eb" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Default template</label>
              <select className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
                <option value="minimal">Minimal</option>
                <option value="modern">Modern</option>
                <option value="corporate">Corporate</option>
                <option value="elegant">Elegant</option>
              </select>
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
              Save brand guidelines
            </button>
          </div>
        </div>
      )}

      {/* Account settings */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-4">Account</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Notification emails</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-foreground">Weekly analytics digest</span>
            </label>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main DashboardContent
// ---------------------------------------------------------------------------

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const upgraded = searchParams.get("upgraded");

  const [plan, setPlan] = useState<Plan>("free");
  const [planExpiresAt, setPlanExpiresAt] = useState<string | undefined>();
  const [planLoading, setPlanLoading] = useState(true);

  // Persist active tab in URL hash so refresh keeps you on the same tab
  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "") as ActiveTab;
      if (["signatures", "editor", "analytics", "banners", "settings"].includes(hash)) return hash;
    }
    return "signatures";
  });
  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [sigsLoading, setSigsLoading] = useState(false);

  // Editor state (shared)
  const [editorData, setEditorData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);
  const [editorBlocks, setEditorBlocks] = useState<Block[]>(getDefaultBlocks());
  const [editorWrapperSettings, setEditorWrapperSettings] = useState<WrapperSettings>(DEFAULT_WRAPPER_SETTINGS);
  const [editorTheme, setEditorTheme] = useState("blue");
  const [editingSignatureId, setEditingSignatureId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const [campaigns, setCampaigns] = useState<BannerCampaign[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(false);

  const isPro = plan === "pro" || plan === "team";

  // Auth guard
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard");
    }
  }, [status, router]);

  // Fetch plan
  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/user/plan")
      .then((r) => r.json())
      .then((result) => {
        const r = result as { plan?: string; expires_at?: string };
        if (r.plan === "pro" || r.plan === "team") {
          setPlan(r.plan as Plan);
        }
        if (r.expires_at) setPlanExpiresAt(r.expires_at);
        setPlanLoading(false);
      })
      .catch(() => setPlanLoading(false));
  }, [status]);

  // Fetch signatures
  useEffect(() => {
    if (status !== "authenticated") return;
    setSigsLoading(true);
    fetch("/api/signatures")
      .then((r) => r.json())
      .then((result) => {
        const r = result as { signatures?: Signature[] };
        setSignatures(r.signatures ?? []);
      })
      .catch(() => {})
      .finally(() => setSigsLoading(false));
  }, [status]);

  // Fetch analytics (Pro only)
  useEffect(() => {
    if (!isPro || activeTab !== "analytics") return;
    setAnalyticsLoading(true);
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((result) => {
        const r = result as { signatures?: Array<{ opens_7d: number; opens_30d: number }> };
        const sigs = r.signatures ?? [];
        const opens7d = sigs.reduce((s, x) => s + (x.opens_7d ?? 0), 0);
        const opens30d = sigs.reduce((s, x) => s + (x.opens_30d ?? 0), 0);
        setAnalytics({ opens_this_week: opens7d, opens_this_month: opens30d, top_links: [] });
      })
      .catch(() => {
        setAnalytics({ opens_this_week: 0, opens_this_month: 0, top_links: [] });
      })
      .finally(() => setAnalyticsLoading(false));
  }, [isPro, activeTab]);

  // Fetch campaigns (Pro only)
  useEffect(() => {
    if (!isPro || activeTab !== "banners") return;
    setCampaignsLoading(true);
    setTimeout(() => {
      setCampaigns([]);
      setCampaignsLoading(false);
    }, 400);
  }, [isPro, activeTab]);

  // Fetch team (Team admin only)
  useEffect(() => {
    if (plan !== "team" || activeTab !== "settings") return;
    setTeamLoading(true);
    setTimeout(() => {
      setTeamMembers([]);
      setTeamLoading(false);
    }, 400);
  }, [plan, activeTab]);

  // Redirect to pricing page for all upgrade actions
  const handleUpgrade = () => {
    window.location.href = "https://neatstamp.com/pricing";
  };

  // Auto-trigger checkout when arriving from pricing page with ?upgrade param
  const upgradeVariant = searchParams.get("upgrade");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const checkoutTriggered = useRef(false);

  useEffect(() => {
    if (!upgradeVariant || status !== "authenticated" || checkoutTriggered.current) return;
    checkoutTriggered.current = true;
    setCheckoutLoading(true);
    const variant = upgradeVariant === "yearly" ? "yearly" : "monthly";
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variant }),
    })
      .then((r) => r.json())
      .then((result) => {
        const r = result as { url?: string; error?: string };
        if (r.url) {
          window.location.href = r.url;
        } else {
          setCheckoutError(r.error || "Failed to create checkout");
          setCheckoutLoading(false);
        }
      })
      .catch(() => {
        setCheckoutError("Something went wrong. Please try again.");
        setCheckoutLoading(false);
      });
  }, [upgradeVariant, status]);

  // Poll for plan upgrade after returning from checkout
  useEffect(() => {
    if (!upgraded || plan !== "free") return;
    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      attempts++;
      fetch("/api/user/plan")
        .then((r) => r.json())
        .then((result) => {
          const r = result as { plan?: string };
          if (r.plan === "pro" || r.plan === "team") {
            setPlan(r.plan as Plan);
            clearInterval(interval);
          }
        })
        .catch(() => {});
      if (attempts >= maxAttempts) clearInterval(interval);
    }, 3000);
    return () => clearInterval(interval);
  }, [upgraded, plan]);

  const handleDeleteSignature = async (id: string) => {
    if (!confirm("Delete this signature?")) return;
    await fetch(`/api/signatures?id=${id}`, { method: "DELETE" });
    setSignatures((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCopySignature = (sig: Signature) => {
    // Open in dashboard editor
    try {
      const parsed = typeof sig.data === "string" ? JSON.parse(sig.data) : sig.data;
      setEditorData({ ...DEFAULT_SIGNATURE_DATA, ...parsed });
    } catch {
      setEditorData(DEFAULT_SIGNATURE_DATA);
    }
    setActiveTab("editor");
  };

  if (status === "loading" || planLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={session.user?.image} name={session.user?.name} />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {session.user?.name || session.user?.email}
            </p>
            {session.user?.name && (
              <p className="text-xs text-muted">{session.user.email}</p>
            )}
          </div>
          <PlanBadge plan={plan} />
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-slate-50 transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Checkout loading overlay */}
      {checkoutLoading && (
        <div className="mb-6 rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-center gap-3">
          <svg className="h-5 w-5 text-blue-500 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          <p className="text-sm text-blue-800 font-medium">Redirecting to checkout...</p>
        </div>
      )}

      {/* Checkout error */}
      {checkoutError && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 flex items-center gap-3">
          <svg className="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
          <p className="text-sm text-red-800 font-medium">{checkoutError}</p>
        </div>
      )}

      {/* Upgrade success banner */}
      {upgraded && (
        <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
          <svg className="h-5 w-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <p className="text-sm text-emerald-800 font-medium">
            {plan === "pro" ? "Welcome to NeatStamp Pro! All premium features are unlocked." : "Payment received! Activating your Pro features..."}
          </p>
        </div>
      )}

      {/* Plan status card */}
      <div className="mb-6">
        <PlanCard plan={plan} expiresAt={planExpiresAt} onUpgrade={handleUpgrade} />
      </div>


      {/* Layout: sidebar + content */}
      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-48 shrink-0">
          <SideNav activeTab={activeTab} onTabChange={setActiveTab} plan={plan} />
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {activeTab === "signatures" && (
            <SignaturesTab
              signatures={signatures}
              plan={plan}
              loading={sigsLoading}
              onCreateNew={() => { setEditorData(DEFAULT_SIGNATURE_DATA); setEditorBlocks(getDefaultBlocks()); setEditingSignatureId(null); setActiveTab("editor"); }}
              onEdit={(sig) => {
                try {
                  const parsed = typeof sig.data === "string" ? JSON.parse(sig.data) : sig.data;
                  const { _blocks, _wrapperSettings, ...rest } = parsed;
                  setEditorData({ ...DEFAULT_SIGNATURE_DATA, ...rest });
                  setEditorBlocks(_blocks && Array.isArray(_blocks) ? _blocks : getDefaultBlocks());
                  if (_wrapperSettings) setEditorWrapperSettings(_wrapperSettings);
                } catch {
                  setEditorData(DEFAULT_SIGNATURE_DATA);
                  setEditorBlocks(getDefaultBlocks());
                }
                setEditingSignatureId(sig.id);
                setActiveTab("editor");
              }}
              onCopy={handleCopySignature}
              onDelete={handleDeleteSignature}
              onUpgrade={() => handleUpgrade()}
            />
          )}
          {activeTab === "editor" && (() => {
            const isNewSignature = !editingSignatureId;
            const freeAndAtLimit = !isPro && signatures.length >= 1 && isNewSignature;

            if (freeAndAtLimit) {
              return (
                <div className="relative">
                  <div className="pointer-events-none select-none opacity-30 blur-[2px]">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">Signature Editor</h2>
                        <span className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-400">Save Signature</span>
                      </div>
                      <div className="h-64 rounded-xl border border-slate-200 bg-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-2xl bg-white border border-slate-200 shadow-xl p-8 max-w-sm text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                        <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Free plan: 1 signature</h3>
                      <p className="mt-2 text-sm text-slate-500">You already have a signature. Edit your existing one or upgrade to Pro for unlimited signatures.</p>
                      <div className="mt-5 flex flex-col gap-2">
                        <button
                          onClick={() => handleUpgrade()}
                          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                        >
                          Upgrade to Pro — $5/month
                        </button>
                        <button
                          onClick={() => {
                            const sig = signatures[0];
                            try {
                              const parsed = typeof sig.data === "string" ? JSON.parse(sig.data) : sig.data;
                              const { _blocks, _wrapperSettings, ...rest } = parsed;
                              setEditorData({ ...DEFAULT_SIGNATURE_DATA, ...rest });
                              setEditorBlocks(_blocks && Array.isArray(_blocks) ? _blocks : getDefaultBlocks());
                              if (_wrapperSettings) setEditorWrapperSettings(_wrapperSettings);
                            } catch {
                              setEditorData(DEFAULT_SIGNATURE_DATA);
                              setEditorBlocks(getDefaultBlocks());
                            }
                            setEditingSignatureId(sig.id);
                          }}
                          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Edit existing signature
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Signature Editor</h2>
                <button
                  disabled={saveStatus === "saving"}
                  onClick={async () => {
                    setSaveStatus("saving");
                    try {
                      // Strip base64 photo from save data (too large for DB)
                      // Photo is uploaded to R2 on copy, not on save
                      const cleanData = { ...editorData };
                      if (cleanData.photoUrl?.startsWith("data:")) {
                        cleanData.photoUrl = "__base64__"; // marker to know photo was set
                      }
                      const saveData = { ...cleanData, _blocks: editorBlocks, _wrapperSettings: editorWrapperSettings };
                      const isUpdate = !!editingSignatureId;
                      const res = await fetch("/api/signatures", {
                        method: isUpdate ? "PUT" : "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          id: isUpdate ? editingSignatureId : undefined,
                          name: editorData.fullName ? `${editorData.fullName}'s Signature` : "My Signature",
                          template: editorData.template,
                          data: saveData,
                        }),
                      });
                      if (res.ok) {
                        const result = await res.json() as { id?: string; success?: boolean };
                        // If newly created, track the ID for future updates
                        if (!isUpdate && result.id) {
                          setEditingSignatureId(result.id);
                        }
                        setSaveStatus("saved");
                        setTimeout(() => setSaveStatus("idle"), 2500);
                        // Refresh signatures
                        const sigRes = await fetch("/api/signatures");
                        const sigData = await sigRes.json() as { signatures?: Signature[] };
                        setSignatures(sigData.signatures ?? []);
                      } else {
                        const err = await res.json() as { error?: string };
                        console.error("Save failed:", err);
                        setSaveStatus("error");
                        setTimeout(() => setSaveStatus("idle"), 3000);
                      }
                    } catch (err) {
                      console.error("Save error:", err);
                      setSaveStatus("error");
                      setTimeout(() => setSaveStatus("idle"), 3000);
                    }
                  }}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors shadow-sm ${
                    saveStatus === "saved"
                      ? "bg-emerald-500"
                      : saveStatus === "error"
                        ? "bg-red-500"
                        : saveStatus === "saving"
                          ? "bg-blue-400 cursor-wait"
                          : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  {saveStatus === "saving" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Saving...
                    </>
                  ) : saveStatus === "saved" ? (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      Saved!
                    </>
                  ) : saveStatus === "error" ? (
                    <>Save failed — try again</>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      Save Signature
                    </>
                  )}
                </button>
              </div>

              {/* Template selector */}
              <TemplateSelector
                selectedTemplate={editorData.template}
                selectedTheme={editorTheme}
                isPro={isPro}
                onSelect={(template, theme) => {
                  const tpl = TEMPLATES.find((t) => t.id === template);
                  const updatedData = { ...editorData, template, primaryColor: theme.primary, accentColor: theme.accent };
                  if (!editorData.photoUrl && tpl?.previewPhoto) {
                    updatedData.photoUrl = `https://neatstamp.com${tpl.previewPhoto}`;
                  }
                  const preset = getPresetForTemplate(template, updatedData);
                  setEditorData(updatedData);
                  setEditorBlocks(preset.blocks);
                  setEditorWrapperSettings(preset.wrapperSettings);
                  setEditorTheme(theme.id);
                }}
              />

              {/* Signature editor: form left + live preview right */}
              <SignatureEditor
                blocks={editorBlocks}
                data={editorData}
                wrapperSettings={editorWrapperSettings}
                plan={plan}
                onBlocksChange={setEditorBlocks}
                onDataChange={setEditorData}
                onWrapperSettingsChange={setEditorWrapperSettings}
              />
            </div>
          );
          })()}
          {activeTab === "analytics" && (
            <AnalyticsTab
              analytics={analytics}
              plan={plan}
              loading={analyticsLoading}
              onUpgrade={() => handleUpgrade()}
            />
          )}
          {activeTab === "banners" && (
            <BannersTab
              campaigns={campaigns}
              plan={plan}
              loading={campaignsLoading}
              onCreateNew={() => {}}
              onUpgrade={() => handleUpgrade()}
            />
          )}
          {activeTab === "settings" && (
            <SettingsTab
              plan={plan}
              planExpiresAt={planExpiresAt}
              teamMembers={teamMembers}
              loadingTeam={teamLoading}
              onInviteMember={() => {}}
              onUpgrade={handleUpgrade}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
