"use client";

import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OutlookStatus {
  connected: boolean;
  email?: string;
  canPush: boolean;
  error?: string;
}

type PushState = "idle" | "pushing" | "success" | "error";

interface OutlookPushButtonProps {
  signatureHtml: string;
  signatureText?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Icons (inline SVG — no extra dependency)
// ---------------------------------------------------------------------------

function MicrosoftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 21 21"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 animate-spin"
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OutlookPushButton({
  signatureHtml,
  signatureText = "",
  className = "",
}: OutlookPushButtonProps) {
  const [status, setStatus] = useState<OutlookStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [pushState, setPushState] = useState<PushState>("idle");
  const [pushError, setPushError] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);

  // ── Fetch connection status on mount ─────────────────────────────────────

  const fetchStatus = useCallback(async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch("/api/outlook/status");
      if (res.ok) {
        const data = (await res.json()) as OutlookStatus;
        setStatus(data);
      } else {
        setStatus({ connected: false, canPush: false });
      }
    } catch {
      setStatus({ connected: false, canPush: false });
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    void fetchStatus();
  }, [fetchStatus]);

  // ── Push signature ────────────────────────────────────────────────────────

  const handlePush = async () => {
    if (!signatureHtml || pushState === "pushing") return;

    setPushState("pushing");
    setPushError(null);

    try {
      const res = await fetch("/api/outlook/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: signatureHtml, signatureText }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string; code?: string };

      if (res.ok && data.success) {
        setPushState("success");
        // Reset to idle after 4 seconds so the button is reusable
        setTimeout(() => setPushState("idle"), 4000);
      } else {
        setPushState("error");
        // If the token expired, refresh the status so the UI shows "reconnect"
        if (data.code === "token_expired" || data.code === "not_connected") {
          await fetchStatus();
        }
        setPushError(data.error ?? "Push failed. Please try again.");
      }
    } catch {
      setPushState("error");
      setPushError("Connection error. Please check your internet and try again.");
    }
  };

  // ── Disconnect ────────────────────────────────────────────────────────────

  const handleDisconnect = async () => {
    if (disconnecting) return;
    if (!confirm("Disconnect your Microsoft account? Your Outlook signature will not be affected.")) {
      return;
    }

    setDisconnecting(true);
    try {
      // POST to /api/outlook/push with a disconnect flag is a clean pattern;
      // alternatively a dedicated DELETE /api/outlook/status would work too.
      // Here we call a simple endpoint that clears the stored tokens.
      const res = await fetch("/api/outlook/disconnect", { method: "POST" });
      if (res.ok) {
        setStatus({ connected: false, canPush: false });
        setPushState("idle");
        setPushError(null);
      }
    } catch {
      // Non-critical — just refresh status
      await fetchStatus();
    } finally {
      setDisconnecting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (loadingStatus) {
    return (
      <div className={`flex items-center gap-2 text-slate-400 text-xs py-2 ${className}`}>
        <SpinnerIcon />
        <span>Checking Outlook connection…</span>
      </div>
    );
  }

  // Not connected — show "Connect Microsoft 365" CTA
  if (!status?.connected) {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <a
          href="/api/auth/microsoft"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100"
        >
          <MicrosoftIcon />
          Connect Microsoft 365
        </a>
        <p className="text-[11px] text-slate-400 text-center leading-snug">
          Push your signature to OWA, New Outlook &amp; Outlook Mobile
        </p>
      </div>
    );
  }

  // Connected but token is stale — ask to reconnect
  if (status.connected && !status.canPush) {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          <p className="font-medium">Microsoft session expired</p>
          <p className="mt-0.5 text-amber-600">{status.error ?? "Please reconnect your account."}</p>
        </div>
        <a
          href="/api/auth/microsoft"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <MicrosoftIcon />
          Reconnect Microsoft 365
        </a>
      </div>
    );
  }

  // Connected and ready — show push button + status
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Connected indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-100" aria-hidden="true" />
          <span>
            Microsoft 365 connected
            {status.email && (
              <span className="ml-1 text-slate-400">({status.email})</span>
            )}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          disabled={disconnecting}
          className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-2"
          aria-label="Disconnect Microsoft account"
        >
          {disconnecting ? "Disconnecting…" : "Disconnect"}
        </button>
      </div>

      {/* Push button */}
      <button
        onClick={handlePush}
        disabled={pushState === "pushing" || pushState === "success" || !signatureHtml}
        className={[
          "flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
          pushState === "success"
            ? "bg-emerald-600 text-white cursor-default"
            : pushState === "pushing"
            ? "bg-blue-500 text-white cursor-wait opacity-80"
            : "bg-[#0078D4] text-white hover:bg-[#106EBE] active:bg-[#005A9E] shadow-sm",
        ].join(" ")}
        aria-live="polite"
        aria-label={
          pushState === "pushing"
            ? "Pushing signature to Outlook…"
            : pushState === "success"
            ? "Signature pushed successfully"
            : "Push signature to Outlook"
        }
      >
        {pushState === "pushing" && <SpinnerIcon />}
        {pushState === "success" && <CheckIcon />}
        {pushState !== "pushing" && pushState !== "success" && <MicrosoftIcon />}
        {pushState === "pushing"
          ? "Pushing to Outlook…"
          : pushState === "success"
          ? "Pushed to Outlook!"
          : "Push to Outlook"}
      </button>

      {/* Success message */}
      {pushState === "success" && (
        <p className="text-[11px] text-emerald-600 text-center font-medium">
          Signature is now live in Outlook, OWA, and Outlook Mobile
        </p>
      )}

      {/* Error message */}
      {pushState === "error" && pushError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] text-red-700">
          {pushError}
        </div>
      )}

      {/* Coverage note when idle */}
      {pushState === "idle" && (
        <p className="text-[11px] text-slate-400 text-center leading-snug">
          Sets your signature in OWA, New Outlook &amp; Outlook Mobile
        </p>
      )}
    </div>
  );
}
