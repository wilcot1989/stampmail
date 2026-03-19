"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { SignatureData, DEFAULT_SIGNATURE_DATA, TemplateName } from "@/lib/types";
import { Block, getDefaultBlocks } from "@/lib/blocks";
import BlockEditor from "@/components/BlockEditor";
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
  onUpgrade: (variant: "monthly" | "yearly") => void;
}) {
  if (plan === "free") {
    return (
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Free Plan</p>
              <p className="text-xs text-muted">Limited features</p>
            </div>
          </div>
          <PlanBadge plan="free" />
        </div>
        <div className="mt-4 rounded-lg bg-gradient-to-r from-primary/5 to-blue-50 border border-primary/10 p-4">
          <p className="text-sm font-semibold text-foreground">Unlock custom colors, unlimited signatures, and more</p>
          <p className="mt-1 text-xs text-muted">Analytics, Calendly buttons, CTA banners, Pro templates</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onUpgrade("monthly")}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm"
            >
              $5/month
            </button>
            <button
              onClick={() => onUpgrade("yearly")}
              className="rounded-lg border border-primary/30 bg-white px-4 py-2 text-xs font-semibold text-primary hover:bg-blue-50 transition-colors"
            >
              $39/year <span className="text-emerald-600 font-bold">Save 35%</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {plan === "team" ? "Team Plan" : "Pro Plan"}
            </p>
            {expiresAt ? (
              <p className="text-xs text-muted">
                Renews {new Date(expiresAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            ) : (
              <p className="text-xs text-emerald-600 font-medium">Active subscription</p>
            )}
          </div>
        </div>
        <PlanBadge plan={plan} />
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
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          {isPro ? "Your Signatures" : "Your Signature"}
        </h2>
        {isPro ? (
          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create new signature
          </button>
        ) : (
          <Link
            href="/editor"
            className="text-xs text-primary underline"
          >
            Edit in editor
          </Link>
        )}
      </div>

      {/* Free plan — single signature view */}
      {!isPro && (
        <>
          {signatures.length === 0 ? (
            <EmptyState
              icon={
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              }
              title="No signature yet"
              description="Create your first email signature in the editor."
              cta={
                <Link
                  href="/editor"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                >
                  Create signature
                </Link>
              }
            />
          ) : (
            <SignatureCard
              sig={signatures[0]}
              onEdit={() => onEdit(signatures[0])}
              onCopy={() => onCopy(signatures[0])}
              onDelete={() => onDelete(signatures[0].id)}
            />
          )}

          {/* Free upgrade CTA */}
          <div className="rounded-xl bg-gradient-to-r from-primary to-blue-700 p-5 text-white">
            <p className="font-semibold">Unlock custom colors, unlimited signatures, and more</p>
            <p className="mt-1 text-sm text-blue-100">Analytics, Calendly buttons, CTA banners, and Pro templates.</p>
            <button
              onClick={onUpgrade}
              className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-gray-100 transition-colors"
            >
              Upgrade to Pro — $5/month
            </button>
          </div>
        </>
      )}

      {/* Pro / Team signature list */}
      {isPro && (
        <>
          {signatures.length === 0 ? (
            <EmptyState
              icon={
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              }
              title="No signatures yet"
              description="Create your first signature to get started."
              cta={
                <button
                  onClick={onCreateNew}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                >
                  Create signature
                </button>
              }
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {signatures.map((sig) => (
                <SignatureCard
                  key={sig.id}
                  sig={sig}
                  onEdit={() => onEdit(sig)}
                  onCopy={() => onCopy(sig)}
                  onDelete={() => onDelete(sig.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
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
  teamMembers,
  loadingTeam,
  onInviteMember,
}: {
  plan: Plan;
  teamMembers: TeamMember[];
  loadingTeam: boolean;
  onInviteMember: () => void;
}) {
  const isTeam = plan === "team";

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Settings</h2>

      {/* QR Code generator */}
      {(plan === "pro" || plan === "team") && (
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

  const [activeTab, setActiveTab] = useState<ActiveTab>("signatures");
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [sigsLoading, setSigsLoading] = useState(false);

  // Editor state (shared)
  const [editorData, setEditorData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);
  const [editorBlocks, setEditorBlocks] = useState<Block[]>(getDefaultBlocks());

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
    // Stub: would call /api/analytics in a real implementation
    setTimeout(() => {
      setAnalytics({ opens_this_week: 34, opens_this_month: 142, top_links: [{ url: "https://acmecorp.com", clicks: 28 }, { url: "https://calendly.com/alex", clicks: 12 }] });
      setAnalyticsLoading(false);
    }, 600);
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

  const handleUpgrade = async (variant: "monthly" | "yearly" = "monthly") => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant }),
      });
      const result = await res.json() as { url?: string };
      if (result.url) window.location.href = result.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const handleDeleteSignature = async (id: string) => {
    if (!confirm("Delete this signature?")) return;
    await fetch(`/api/signatures?id=${id}`, { method: "DELETE" });
    setSignatures((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCopySignature = (sig: Signature) => {
    // Navigate to editor pre-filled, or copy the HTML directly
    router.push(`/editor?sigId=${sig.id}`);
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

      {/* Upgrade success banner */}
      {upgraded && (
        <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
          <svg className="h-5 w-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <p className="text-sm text-emerald-800 font-medium">
            Welcome to NeatStamp Pro! All premium features are now unlocked.
          </p>
        </div>
      )}

      {/* Plan status card */}
      <div className="mb-6">
        <PlanCard plan={plan} expiresAt={planExpiresAt} onUpgrade={handleUpgrade} />
      </div>

      {/* Free user: signature expiry warning */}
      {plan === "free" && signatures.length > 0 && (
        <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <svg className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Your free signature expires in 90 days</p>
            <p className="text-xs text-amber-700 mt-0.5">
              <Link href="/pricing" className="underline font-medium">Upgrade to Pro</Link> for permanent, never-expiring signatures.
            </p>
          </div>
        </div>
      )}

      {/* Free user: basic stats */}
      {plan === "free" && signatures.length > 0 && (
        <div className="mb-6 rounded-xl border border-border bg-white p-4 shadow-sm">
          <p className="text-xs text-muted">Your signature was viewed</p>
          <p className="mt-1 text-2xl font-bold text-foreground">— <span className="text-sm font-normal text-muted">times this week</span></p>
          <p className="mt-1 text-xs text-muted">
            <Link href="/pricing" className="text-primary underline">Upgrade to Pro</Link> to see full analytics.
          </p>
        </div>
      )}

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
              onCreateNew={() => { setEditorData(DEFAULT_SIGNATURE_DATA); setEditorBlocks(getDefaultBlocks()); setActiveTab("editor"); }}
              onEdit={(sig) => { if (sig.data) setEditorData(sig.data); setActiveTab("editor"); }}
              onCopy={handleCopySignature}
              onDelete={handleDeleteSignature}
              onUpgrade={() => handleUpgrade("monthly")}
            />
          )}
          {activeTab === "editor" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Signature Editor</h2>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/signatures", {
                        method: signatures.length > 0 ? "PUT" : "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          id: signatures.length > 0 ? signatures[0].id : undefined,
                          name: editorData.fullName ? `${editorData.fullName}'s Signature` : "My Signature",
                          template: editorData.template,
                          data: editorData,
                        }),
                      });
                      if (res.ok) {
                        // Refresh signatures
                        const sigRes = await fetch("/api/signatures");
                        const sigData = await sigRes.json() as { signatures?: Signature[] };
                        setSignatures(sigData.signatures ?? []);
                        setActiveTab("signatures");
                      }
                    } catch (err) {
                      console.error("Save error:", err);
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Save Signature
                </button>
              </div>

              {/* Template selector — horizontally scrollable */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Choose a template</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
                  {(["minimal", "modern", "corporate", "creative", "bold", "elegant", "startup", "compact"] as const).map((t) => {
                    const isSelected = editorData.template === t;
                    const isLocked = !isPro && !["minimal", "modern"].includes(t);
                    const previewHtml = generateSignatureHtml({ ...DEFAULT_SIGNATURE_DATA, template: t });
                    return (
                      <button
                        key={t}
                        onClick={() => {
                          if (!isLocked) setEditorData({ ...editorData, template: t });
                        }}
                        className={`relative rounded-xl border-2 overflow-hidden text-left transition-all flex-shrink-0 w-[140px] snap-start ${
                          isSelected
                            ? "border-primary shadow-md"
                            : isLocked
                              ? "border-border bg-slate-50 cursor-not-allowed opacity-70"
                              : "border-border bg-white hover:border-primary/50 hover:shadow-sm"
                        }`}
                      >
                        {/* Mini preview */}
                        <div className="relative h-[70px] overflow-hidden bg-white">
                          <div
                            style={{
                              transform: "scale(0.3)",
                              transformOrigin: "top left",
                              width: "333%",
                              pointerEvents: "none",
                              userSelect: "none",
                            }}
                            dangerouslySetInnerHTML={{ __html: previewHtml }}
                          />
                          {/* Locked overlay */}
                          {isLocked && (
                            <div className="absolute inset-0 bg-slate-100/70 flex items-center justify-center">
                              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {/* Template name */}
                        <div className={`px-2 py-1.5 border-t flex items-center justify-between ${isSelected ? "border-primary/20 bg-blue-50" : "border-border"}`}>
                          <span className={`text-xs font-medium capitalize ${isSelected ? "text-primary" : isLocked ? "text-slate-400" : "text-slate-700"}`}>
                            {t}
                          </span>
                          {isLocked && (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">PRO</span>
                          )}
                          {isSelected && (
                            <svg className="h-3.5 w-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {!isPro && (
                  <p className="mt-2 text-xs text-muted">Free plan: 2 templates. <a href="https://neatstamp.com/pricing" className="text-primary underline">Upgrade for all 8+</a></p>
                )}
              </div>

              {/* Block editor */}
              <BlockEditor
                blocks={editorBlocks}
                onBlocksChange={setEditorBlocks}
                data={editorData}
                onDataChange={setEditorData}
                plan={plan}
              />
            </div>
          )}
          {activeTab === "analytics" && (
            <AnalyticsTab
              analytics={analytics}
              plan={plan}
              loading={analyticsLoading}
              onUpgrade={() => handleUpgrade("monthly")}
            />
          )}
          {activeTab === "banners" && (
            <BannersTab
              campaigns={campaigns}
              plan={plan}
              loading={campaignsLoading}
              onCreateNew={() => {}}
              onUpgrade={() => handleUpgrade("monthly")}
            />
          )}
          {activeTab === "settings" && (
            <SettingsTab
              plan={plan}
              teamMembers={teamMembers}
              loadingTeam={teamLoading}
              onInviteMember={() => {}}
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
