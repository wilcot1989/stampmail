"use client";

// ════════════════════════════════════════════════════════════════════════════
// NeatStamp Outlook Add-in — Taskpane
// URL: https://neatstamp.com/outlook-addin/taskpane
//
// This page runs inside Outlook's taskpane iframe. It:
//   1. Loads Office.js from the CDN via a <Script> tag
//   2. Initialises with Office.onReady()
//   3. Checks if the user is signed in to NeatStamp (session cookie)
//   4. Lists the user's signatures fetched from /api/signatures
//   5. Lets the user insert a signature into the current compose window or
//      store it as the default (via roaming settings + full HTML cache)
//   6. Gracefully falls back when not running inside Outlook
// ════════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";

// ── Types ─────────────────────────────────────────────────────────────────

interface Signature {
  id: string;
  name: string;
  template: string;
  data: string | SignatureData;
  updated_at: string;
}

interface SignatureData {
  fullName?: string;
  jobTitle?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  [key: string]: unknown;
}

interface SessionUser {
  email: string;
  name?: string;
  image?: string;
}

type AppState =
  | "booting"       // waiting for Office.js to initialise
  | "not-in-outlook"// loaded outside Outlook
  | "signed-out"    // Office ready, user not logged in
  | "loading-sigs"  // fetching signatures
  | "ready"         // signatures loaded
  | "error";        // unrecoverable error

// ── Toast types ───────────────────────────────────────────────────────────
interface Toast {
  msg: string;
  kind: "success" | "error" | "info";
  id: number;
}

// ── Office.js global type shim (not installed via npm — loaded from CDN) ──
declare const Office: {
  onReady: (cb: (info: { host: string | null }) => void) => void;
  CoercionType: { Html: string };
  AsyncResultStatus: { Succeeded: string };
  context: {
    mailbox: {
      item: OutlookItem | null;
    };
    roamingSettings: {
      get: (key: string) => unknown;
      set: (key: string, value: unknown) => void;
      saveAsync: (cb: (r: { status: string }) => void) => void;
    };
  };
  actions: {
    associate: (name: string, fn: (event: { completed: () => void }) => void) => void;
  };
};

interface OutlookItem {
  body: {
    setSignatureAsync?: (
      html: string,
      opts: { coercionType: string },
      cb: (result: { status: string }) => void
    ) => void;
    getAsync: (
      coercionType: string,
      cb: (result: { status: string; value: string }) => void
    ) => void;
    setAsync: (
      html: string,
      opts: { coercionType: string },
      cb: (result: { status: string }) => void
    ) => void;
  };
}

// ════════════════════════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════════════════════════

export default function OutlookTaskpane() {
  const [appState, setAppState]       = useState<AppState>("booting");
  const [user, setUser]               = useState<SessionUser | null>(null);
  const [signatures, setSignatures]   = useState<Signature[]>([]);
  const [activeId, setActiveId]       = useState<string | null>(null);
  const [autoApply, setAutoApply]     = useState(false);
  const [expandedId, setExpandedId]   = useState<string | null>(null);
  const [busy, setBusy]               = useState<string | null>(null); // sigId being processed
  const [toasts, setToasts]           = useState<Toast[]>([]);
  const toastCounter                  = useRef(0);
  const officeItemRef                 = useRef<OutlookItem | null>(null);

  // ── Toast helpers ──────────────────────────────────────────────────────
  const addToast = useCallback((msg: string, kind: Toast["kind"] = "info") => {
    const id = ++toastCounter.current;
    setToasts(t => [...t, { msg, kind, id }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  // ── Office.js init ─────────────────────────────────────────────────────
  const initOffice = useCallback(() => {
    if (typeof Office === "undefined") {
      setAppState("not-in-outlook");
      return;
    }

    Office.onReady(() => {
      // Capture current compose item (null in read mode)
      officeItemRef.current = Office.context?.mailbox?.item ?? null;

      // Read persisted settings
      const rs = Office.context.roamingSettings;
      const storedId    = rs.get("neatstamp_active_sig") as string | null;
      const storedAuto  = rs.get("neatstamp_auto_apply") as boolean | null;
      if (storedId)   setActiveId(storedId);
      if (storedAuto) setAutoApply(true);

      // Check session
      checkSession();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Session check ──────────────────────────────────────────────────────
  const checkSession = useCallback(async () => {
    try {
      const res  = await fetch("/api/auth/session", { credentials: "include" });
      const data = await res.json() as { user?: SessionUser };
      if (data?.user?.email) {
        setUser(data.user);
        loadSignatures();
      } else {
        setAppState("signed-out");
      }
    } catch {
      setAppState("signed-out");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Load signatures ────────────────────────────────────────────────────
  const loadSignatures = useCallback(async () => {
    setAppState("loading-sigs");
    try {
      const res  = await fetch("/api/signatures", { credentials: "include" });
      const data = await res.json() as { signatures?: Signature[]; error?: string };
      if (data.error) throw new Error(data.error);
      setSignatures(data.signatures ?? []);
      setAppState("ready");
    } catch {
      setAppState("error");
    }
  }, []);

  // ── Insert signature into compose window ──────────────────────────────
  const insertSignature = useCallback(async (sigId: string) => {
    setBusy(sigId);
    try {
      const res  = await fetch(`/api/outlook/addin-signature?id=${encodeURIComponent(sigId)}`, {
        credentials: "include",
      });
      const data = await res.json() as { html?: string; error?: string };
      if (!data.html) throw new Error(data.error ?? "No HTML returned");

      const item = officeItemRef.current;
      if (!item?.body) {
        addToast("Open a new compose window first", "error");
        setBusy(null);
        return;
      }

      const html = data.html;

      if (item.body.setSignatureAsync) {
        // Mailbox 1.10+ — sets the designated signature slot (Classic Desktop)
        item.body.setSignatureAsync(
          html,
          { coercionType: Office.CoercionType.Html },
          (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
              addToast("Signature set!", "success");
            } else {
              appendFallback(item, html);
            }
            setBusy(null);
          }
        );
      } else {
        appendFallback(item, html);
        setBusy(null);
      }
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Failed to load signature", "error");
      setBusy(null);
    }
  }, [addToast]);

  // Fallback: append to body for Mailbox < 1.10
  const appendFallback = useCallback((item: OutlookItem, html: string) => {
    item.body.getAsync(Office.CoercionType.Html, (getResult) => {
      if (getResult.status !== Office.AsyncResultStatus.Succeeded) {
        addToast("Could not read email body", "error");
        return;
      }
      const existing = getResult.value ?? "";
      const newBody  = `${existing}<br><br><span data-neatstamp-sig="1">${html}</span>`;
      item.body.setAsync(newBody, { coercionType: Office.CoercionType.Html }, (setResult) => {
        if (setResult.status === Office.AsyncResultStatus.Succeeded) {
          addToast("Signature inserted!", "success");
        } else {
          addToast("Could not insert signature", "error");
        }
      });
    });
  }, [addToast]);

  // ── Set as default (stores in roaming settings + caches HTML) ─────────
  const setAsDefault = useCallback(async (sigId: string) => {
    setBusy("default-" + sigId);
    try {
      // Fetch rendered HTML for caching
      const res  = await fetch(`/api/outlook/addin-signature?id=${encodeURIComponent(sigId)}`, {
        credentials: "include",
      });
      const data = await res.json() as { html?: string; error?: string };
      if (!data.html) throw new Error(data.error ?? "No HTML");

      const rs = Office.context.roamingSettings;
      rs.set("neatstamp_active_sig",    sigId);
      rs.set("neatstamp_signature_html", data.html); // used by commands.html event handler
      rs.saveAsync((result) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          setActiveId(sigId);
          addToast("Set as default signature!", "success");
        } else {
          addToast("Could not save setting", "error");
        }
        setBusy(null);
      });
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Failed", "error");
      setBusy(null);
    }
  }, [addToast]);

  // ── Toggle auto-apply ─────────────────────────────────────────────────
  const toggleAutoApply = useCallback((checked: boolean) => {
    setAutoApply(checked);
    const rs = Office.context.roamingSettings;
    rs.set("neatstamp_auto_apply", checked);
    rs.saveAsync((result) => {
      if (result.status !== Office.AsyncResultStatus.Succeeded) {
        addToast("Could not save setting", "error");
        setAutoApply(!checked);
      }
    });
  }, [addToast]);

  // ── Sign out ──────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST", credentials: "include" });
    } finally {
      setUser(null);
      setSignatures([]);
      setAppState("signed-out");
    }
  }, []);

  // ── Parse signature data ──────────────────────────────────────────────
  const parseSigData = (sig: Signature): SignatureData => {
    if (typeof sig.data === "string") {
      try { return JSON.parse(sig.data) as SignatureData; }
      catch { return {}; }
    }
    return sig.data ?? {};
  };

  // ── In compose mode? ──────────────────────────────────────────────────
  const inComposeMode = officeItemRef.current !== null && officeItemRef.current.body !== undefined;

  // ════════════════════════════════════════════════════════════════════════
  // Render
  // ════════════════════════════════════════════════════════════════════════

  return (
    <>
      {/* Load Office.js from CDN — must use the CDN version, not npm */}
      <Script
        src="https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js"
        strategy="beforeInteractive"
        onLoad={initOffice}
        onError={() => setAppState("not-in-outlook")}
      />

      <div style={styles.shell}>

        {/* ── Header ── */}
        <header style={styles.header}>
          <a href="https://neatstamp.com" target="_blank" rel="noopener" style={styles.logo}>
            <span style={styles.logoMark}>
              <svg viewBox="0 0 20 20" width={16} height={16} fill="#fff">
                <path d="M3 2h3.5l7 11V2H17v16h-3.5L6.5 7v11H3V2z" />
              </svg>
            </span>
            <span style={styles.logoText}>NeatStamp</span>
          </a>
          {user && (
            <button style={styles.btnGhost} onClick={signOut}>Sign out</button>
          )}
        </header>

        {/* ── Main ── */}
        <main style={styles.main}>

          {/* Booting */}
          {appState === "booting" && (
            <div style={styles.center}>
              <div style={styles.spinner} />
              <span style={styles.muted}>Connecting to Outlook…</span>
            </div>
          )}

          {/* Not inside Outlook */}
          {appState === "not-in-outlook" && (
            <div style={styles.notice}>
              <strong>This is the NeatStamp Outlook add-in.</strong>
              <br /><br />
              To use it, install the add-in from within Outlook:
              <ol style={{ paddingLeft: 16, lineHeight: 1.9, marginTop: 8 }}>
                <li>Open Outlook (Desktop, OWA, or Mobile)</li>
                <li>Click <strong>Get Add-ins</strong> in the ribbon</li>
                <li>Search for <strong>NeatStamp</strong></li>
                <li>Click <strong>Add</strong></li>
              </ol>
              <br />
              <a
                href="https://neatstamp.com/dashboard"
                target="_blank"
                rel="noopener"
                style={styles.link}
              >
                Go to NeatStamp Dashboard →
              </a>
            </div>
          )}

          {/* Signed out */}
          {appState === "signed-out" && (
            <div style={styles.signinScreen}>
              <div style={styles.bigIcon}>
                <svg viewBox="0 0 20 20" width={28} height={28} fill="#2563eb">
                  <path d="M3 2h3.5l7 11V2H17v16h-3.5L6.5 7v11H3V2z" />
                </svg>
              </div>
              <div style={styles.signinTitle}>Sign in to NeatStamp</div>
              <div style={styles.signinDesc}>
                Sign in to access your signatures and set them directly in Outlook.
              </div>
              <a
                href="https://neatstamp.com/login?returnTo=/outlook-addin/taskpane"
                target="_top"
                style={styles.btnPrimary}
              >
                Sign in to NeatStamp
              </a>
              <div style={{ ...styles.notice, marginTop: 8, textAlign: "left" }}>
                <strong>No account?</strong> Create one free at{" "}
                <a href="https://neatstamp.com" target="_blank" rel="noopener" style={styles.link}>
                  neatstamp.com
                </a>
              </div>
            </div>
          )}

          {/* Loading signatures */}
          {appState === "loading-sigs" && (
            <div style={styles.center}>
              <div style={styles.spinner} />
              <span style={styles.muted}>Loading signatures…</span>
            </div>
          )}

          {/* Error */}
          {appState === "error" && (
            <div style={{ ...styles.notice, textAlign: "center" }}>
              Could not load signatures.
              <br />
              <button
                style={{ ...styles.btnSecondary, ...styles.btnSm, marginTop: 12 }}
                onClick={loadSignatures}
              >
                Retry
              </button>
            </div>
          )}

          {/* Ready — signature list */}
          {appState === "ready" && (
            <>
              {signatures.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>✏️</div>
                  <strong>No signatures yet</strong>
                  <br /><br />
                  <a
                    href="https://neatstamp.com/dashboard"
                    target="_blank"
                    rel="noopener"
                    style={styles.link}
                  >
                    Create your first signature →
                  </a>
                </div>
              ) : (
                <>
                  <div style={styles.sectionLabel}>Your Signatures</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {signatures.map((sig) => {
                      const data      = parseSigData(sig);
                      const isActive  = sig.id === activeId;
                      const isExpanded = expandedId === sig.id;
                      const isBusy    = busy === sig.id || busy === "default-" + sig.id;

                      return (
                        <div
                          key={sig.id}
                          style={{
                            ...styles.sigCard,
                            ...(isActive ? styles.sigCardActive : {}),
                          }}
                        >
                          {/* Card header */}
                          <div style={styles.sigCardHeader}>
                            <span
                              style={styles.sigName}
                              title={sig.name}
                            >
                              {sig.name}
                            </span>
                            {isActive && (
                              <span style={styles.activeBadge}>Active</span>
                            )}
                            <button
                              style={styles.btnGhost}
                              onClick={() => setExpandedId(isExpanded ? null : sig.id)}
                              title="Preview"
                            >
                              {isExpanded ? "▲" : "👁"}
                            </button>
                          </div>

                          {/* Preview */}
                          {isExpanded && (
                            <div style={styles.sigPreview}>
                              <div style={styles.sigPreviewInner}>
                                {data.fullName && <strong>{data.fullName}</strong>}
                                {data.jobTitle && <><br />{data.jobTitle}</>}
                                {data.company  && <><br />{data.company}</>}
                                {data.email    && (
                                  <><br /><a href={`mailto:${data.email}`} style={styles.link}>{data.email}</a></>
                                )}
                                {data.phone   && <><br />{data.phone}</>}
                                {data.website && <><br />{data.website}</>}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div style={styles.sigActions}>
                            {inComposeMode ? (
                              <button
                                style={{
                                  ...styles.btnPrimaryBtn,
                                  flex: 1,
                                  opacity: isBusy ? 0.6 : 1,
                                }}
                                disabled={isBusy}
                                onClick={() => insertSignature(sig.id)}
                              >
                                {busy === sig.id ? "Inserting…" : "Insert into email"}
                              </button>
                            ) : (
                              <button
                                style={{ ...styles.btnSecondary, flex: 1, opacity: isBusy ? 0.6 : 1 }}
                                disabled={isBusy}
                                onClick={() => setAsDefault(sig.id)}
                              >
                                {busy === "default-" + sig.id ? "Saving…" : "Set as default"}
                              </button>
                            )}
                            <button
                              style={{
                                ...styles.btnSecondary,
                                flex: 1,
                                opacity: isActive || isBusy ? 0.5 : 1,
                                cursor: isActive ? "not-allowed" : "pointer",
                              }}
                              disabled={isActive || isBusy}
                              onClick={() => setAsDefault(sig.id)}
                              title={isActive ? "Already the default" : "Store as default signature"}
                            >
                              {busy === "default-" + sig.id ? "Saving…" : isActive ? "Default ✓" : "Set default"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Auto-apply toggle */}
                  <div style={styles.autoApplyRow}>
                    <div>
                      <div style={styles.autoApplyTitle}>Auto-apply on new email</div>
                      <div style={styles.autoApplyDesc}>
                        Insert the active signature automatically when composing
                      </div>
                    </div>
                    <label style={styles.toggleWrap}>
                      <input
                        type="checkbox"
                        checked={autoApply}
                        onChange={(e) => toggleAutoApply(e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
                      />
                      <span style={{
                        ...styles.toggleTrack,
                        background: autoApply ? "#2563eb" : "#cbd5e1",
                      }}>
                        <span style={{
                          ...styles.toggleThumb,
                          transform: autoApply ? "translateX(16px)" : "translateX(0)",
                        }} />
                      </span>
                    </label>
                  </div>

                  {!inComposeMode && (
                    <div style={{ ...styles.notice, marginTop: 12 }}>
                      <strong>Tip:</strong> Open a new email to insert a signature directly into the compose window.
                    </div>
                  )}

                  <div style={{ marginTop: 12 }}>
                    <a
                      href="https://neatstamp.com/dashboard"
                      target="_blank"
                      rel="noopener"
                      style={{ ...styles.btnSecondary, display: "block", textAlign: "center", textDecoration: "none" }}
                    >
                      Edit in Dashboard
                    </a>
                  </div>
                </>
              )}
            </>
          )}
        </main>

        {/* ── Footer ── */}
        <footer style={styles.footer}>
          <a href="https://neatstamp.com" target="_blank" rel="noopener" style={styles.footerLink}>
            neatstamp.com
          </a>
        </footer>

        {/* ── Toasts ── */}
        <div style={styles.toastContainer}>
          {toasts.map((t) => (
            <div
              key={t.id}
              style={{
                ...styles.toast,
                background: t.kind === "success" ? "#16a34a" : t.kind === "error" ? "#dc2626" : "#0f172a",
              }}
            >
              {t.msg}
            </div>
          ))}
        </div>

      </div>

      {/* Inline style for spinner keyframes */}
      <style>{`
        @keyframes ns-spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      `}</style>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Styles (inline — no build step, works in any iframe context)
// ════════════════════════════════════════════════════════════════════════════

const styles: Record<string, React.CSSProperties> = {
  shell: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 13,
    color: "#334155",
    background: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "14px 16px 12px",
    borderBottom: "1px solid #f1f5f9",
    flexShrink: 0,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
  },
  logoMark: {
    width: 28,
    height: 28,
    background: "#2563eb",
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    fontSize: 15,
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.2px",
  },
  btnGhost: {
    marginLeft: "auto",
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: 11,
    cursor: "pointer",
    padding: "4px 6px",
    borderRadius: 4,
  },
  main: {
    flex: 1,
    overflowY: "auto",
    padding: 16,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: "40px 20px",
  },
  spinner: {
    width: 24,
    height: 24,
    border: "2px solid #cbd5e1",
    borderTopColor: "#2563eb",
    borderRadius: "50%",
    animation: "ns-spin 0.7s linear infinite",
  },
  muted: { color: "#64748b" },
  notice: {
    background: "#f8fafc",
    border: "1.5px solid #cbd5e1",
    borderRadius: 8,
    padding: "12px 14px",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#334155",
  },
  link: { color: "#2563eb", textDecoration: "none", fontWeight: 600 },
  signinScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 16,
    padding: "32px 20px",
  },
  bigIcon: {
    width: 56,
    height: 56,
    background: "#eff6ff",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signinTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
  },
  signinDesc: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 1.5,
    maxWidth: 240,
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "9px 18px",
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    width: "100%",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  btnPrimaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  btnSecondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 8,
    background: "#f1f5f9",
    color: "#334155",
    border: "none",
    cursor: "pointer",
  },
  btnSm: { padding: "5px 10px", fontSize: 11 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginBottom: 8,
  },
  sigCard: {
    border: "1.5px solid #cbd5e1",
    borderRadius: 8,
    overflow: "hidden",
    transition: "border-color 0.15s",
  },
  sigCardActive: {
    borderColor: "#2563eb",
    boxShadow: "0 0 0 3px rgba(37,99,235,0.12)",
  },
  sigCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px 8px",
    gap: 8,
  },
  sigName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#0f172a",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
  },
  activeBadge: {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 20,
    background: "#f0fdf4",
    color: "#16a34a",
    flexShrink: 0,
  },
  sigPreview: {
    padding: "0 12px 10px",
  },
  sigPreviewInner: {
    background: "#f8fafc",
    border: "1px solid #f1f5f9",
    borderRadius: 6,
    padding: 10,
    fontSize: 11,
    lineHeight: 1.6,
  },
  sigActions: {
    display: "flex",
    gap: 6,
    padding: "0 12px 12px",
  },
  autoApplyRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#eff6ff",
    border: "1.5px solid rgba(37,99,235,0.15)",
    borderRadius: 8,
    padding: "10px 14px",
    marginTop: 16,
    gap: 8,
  },
  autoApplyTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#0f172a",
    marginBottom: 1,
  },
  autoApplyDesc: {
    fontSize: 11,
    color: "#64748b",
  },
  toggleWrap: {
    position: "relative",
    width: 38,
    height: 22,
    flexShrink: 0,
    display: "block",
    cursor: "pointer",
  },
  toggleTrack: {
    position: "absolute",
    inset: 0,
    borderRadius: 11,
    transition: "background 0.2s",
    display: "block",
  },
  toggleThumb: {
    position: "absolute",
    width: 16,
    height: 16,
    background: "#fff",
    borderRadius: "50%",
    top: 3,
    left: 3,
    transition: "transform 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    display: "block",
  },
  emptyState: {
    textAlign: "center",
    padding: "32px 20px",
    color: "#64748b",
  },
  footer: {
    padding: "10px 16px",
    borderTop: "1px solid #f1f5f9",
    textAlign: "center",
    flexShrink: 0,
  },
  footerLink: {
    fontSize: 11,
    color: "#64748b",
    textDecoration: "none",
  },
  toastContainer: {
    position: "fixed",
    bottom: 16,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    zIndex: 1000,
    pointerEvents: "none",
  },
  toast: {
    color: "#fff",
    padding: "9px 16px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: "nowrap",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
};
