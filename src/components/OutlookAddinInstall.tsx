"use client";

// ════════════════════════════════════════════════════════════════════════════
// OutlookAddinInstall
//
// Shows step-by-step instructions for installing the NeatStamp Outlook add-in.
// Two tabs:
//   1. Individual install — sideload from a URL (no admin rights needed)
//   2. IT Admin deploy   — Microsoft 365 Admin Center bulk deployment
//
// Used on the dashboard and any install-guide pages.
// ════════════════════════════════════════════════════════════════════════════

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

interface Step {
  n: number;
  title: string;
  body: React.ReactNode;
}

// ── Manifest URL ─────────────────────────────────────────────────────────

const MANIFEST_URL = "https://neatstamp.com/outlook-addin/manifest";

// ════════════════════════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════════════════════════

export default function OutlookAddinInstall() {
  const [tab, setTab] = useState<"individual" | "admin">("individual");
  const [copied, setCopied] = useState(false);

  function copyUrl() {
    navigator.clipboard?.writeText(MANIFEST_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── Individual steps ────────────────────────────────────────────────────

  const individualSteps: Step[] = [
    {
      n: 1,
      title: "Open Outlook",
      body: (
        <>
          Works in <strong>Classic Desktop</strong> (Windows/Mac), <strong>New Outlook</strong>,{" "}
          <strong>Outlook on the Web</strong> (OWA), and <strong>Outlook Mobile</strong>.
        </>
      ),
    },
    {
      n: 2,
      title: 'Click "Get Add-ins" in the ribbon',
      body: (
        <>
          In the Home tab of Outlook, click the <strong>Get Add-ins</strong> button (or three-dot
          menu → <em>Get Add-ins</em>). In OWA it's under the three-dot "More options" menu of a
          compose window.
        </>
      ),
    },
    {
      n: 3,
      title: "Search for NeatStamp",
      body: (
        <>
          In the Add-ins dialog, search for <strong>NeatStamp</strong> in the search box. If it's
          not in the store yet, use the <strong>My add-ins</strong> tab and click{" "}
          <em>Add a custom add-in → Add from URL</em>, then paste:
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <code style={codeStyle}>{MANIFEST_URL}</code>
            <button style={copyBtnStyle} onClick={copyUrl}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </>
      ),
    },
    {
      n: 4,
      title: 'Click "Add"',
      body: (
        <>
          Click <strong>Add</strong> to install. Outlook may ask you to confirm the permissions
          (ReadWriteMailbox — needed to insert the signature into the compose window).
        </>
      ),
    },
    {
      n: 5,
      title: "Open the NeatStamp panel",
      body: (
        <>
          Compose a new email. You&apos;ll see a <strong>NeatStamp Signatures</strong> button in the
          ribbon (in the Home tab group). Click it to open the taskpane.
        </>
      ),
    },
    {
      n: 6,
      title: "Sign in and select your signature",
      body: (
        <>
          Sign in with your NeatStamp account. Your saved signatures will appear. Click{" "}
          <strong>Insert into email</strong> to insert immediately, or{" "}
          <strong>Set as default</strong> to auto-insert on every new message.
        </>
      ),
    },
  ];

  // ── Admin steps ─────────────────────────────────────────────────────────

  const adminSteps: Step[] = [
    {
      n: 1,
      title: "Open Microsoft 365 Admin Center",
      body: (
        <>
          Go to{" "}
          <a
            href="https://admin.microsoft.com"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            admin.microsoft.com
          </a>{" "}
          and sign in as a Global Admin or Exchange Admin.
        </>
      ),
    },
    {
      n: 2,
      title: "Navigate to Integrated apps",
      body: (
        <>
          In the left sidebar: <strong>Settings</strong> → <strong>Integrated apps</strong>. Then
          click <strong>Upload custom apps</strong>.
        </>
      ),
    },
    {
      n: 3,
      title: "Upload the manifest",
      body: (
        <>
          Select <strong>Office Add-in</strong> as the app type. Choose{" "}
          <strong>Provide link to manifest file</strong> and paste:
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <code style={codeStyle}>{MANIFEST_URL}</code>
            <button style={copyBtnStyle} onClick={copyUrl}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          Or download the XML and upload the file directly.
        </>
      ),
    },
    {
      n: 4,
      title: "Assign to users",
      body: (
        <>
          Choose whether to deploy to <strong>Entire organization</strong>, specific{" "}
          <strong>groups</strong>, or individual <strong>users</strong>. Click{" "}
          <strong>Next</strong> and then <strong>Finish deployment</strong>.
        </>
      ),
    },
    {
      n: 5,
      title: "Verify rollout (up to 24 hours)",
      body: (
        <>
          Microsoft 365 can take up to 24 hours to push the add-in to all users. The add-in will
          appear automatically in Outlook — users don&apos;t need to do anything. Recommend sending
          a quick announcement email so they know to look for the{" "}
          <strong>NeatStamp Signatures</strong> button in the ribbon.
        </>
      ),
    },
  ];

  const steps = tab === "individual" ? individualSteps : adminSteps;

  return (
    <div style={containerStyle}>
      {/* Tab bar */}
      <div style={tabBarStyle}>
        <button
          style={{ ...tabStyle, ...(tab === "individual" ? tabActiveStyle : {}) }}
          onClick={() => setTab("individual")}
        >
          Individual install
        </button>
        <button
          style={{ ...tabStyle, ...(tab === "admin" ? tabActiveStyle : {}) }}
          onClick={() => setTab("admin")}
        >
          IT Admin deployment
        </button>
      </div>

      {/* Context note */}
      <div style={noteStyle}>
        {tab === "individual" ? (
          <>
            No admin rights needed. Any Outlook user can install this in under 2 minutes.
          </>
        ) : (
          <>
            Deploy to your entire organization via the Microsoft 365 Admin Center. Requires Global
            Admin or Exchange Admin role.
          </>
        )}
      </div>

      {/* Steps */}
      <ol style={stepListStyle}>
        {steps.map((step) => (
          <li key={step.n} style={stepItemStyle}>
            <span style={stepNumberStyle}>{step.n}</span>
            <div style={stepContentStyle}>
              <div style={stepTitleStyle}>{step.title}</div>
              <div style={stepBodyStyle}>{step.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* Download manifest link */}
      <div style={footerRowStyle}>
        <a href={MANIFEST_URL} download="neatstamp-manifest.xml" style={downloadLinkStyle}>
          Download manifest XML
        </a>
        <span style={{ color: "#94a3b8" }}>·</span>
        <a
          href="https://neatstamp.com/about"
          target="_blank"
          rel="noopener noreferrer"
          style={downloadLinkStyle}
        >
          Support
        </a>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Styles
// ════════════════════════════════════════════════════════════════════════════

const containerStyle: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: 14,
  color: "#334155",
  maxWidth: 640,
};

const tabBarStyle: React.CSSProperties = {
  display: "flex",
  gap: 4,
  marginBottom: 16,
  background: "#f1f5f9",
  borderRadius: 8,
  padding: 4,
};

const tabStyle: React.CSSProperties = {
  flex: 1,
  padding: "7px 12px",
  fontSize: 13,
  fontWeight: 600,
  background: "none",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  color: "#64748b",
  transition: "background 0.15s, color 0.15s",
};

const tabActiveStyle: React.CSSProperties = {
  background: "#fff",
  color: "#0f172a",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const noteStyle: React.CSSProperties = {
  background: "#eff6ff",
  border: "1px solid rgba(37,99,235,0.15)",
  borderRadius: 8,
  padding: "10px 14px",
  fontSize: 12,
  color: "#1e40af",
  marginBottom: 20,
  lineHeight: 1.5,
};

const stepListStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 0,
  margin: 0,
};

const stepItemStyle: React.CSSProperties = {
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
};

const stepNumberStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  background: "#2563eb",
  color: "#fff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 700,
  flexShrink: 0,
  marginTop: 1,
};

const stepContentStyle: React.CSSProperties = {
  flex: 1,
  paddingBottom: 16,
  borderBottom: "1px solid #f1f5f9",
};

const stepTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "#0f172a",
  marginBottom: 4,
};

const stepBodyStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#475569",
  lineHeight: 1.6,
};

const codeStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#f1f5f9",
  border: "1px solid #e2e8f0",
  borderRadius: 5,
  padding: "4px 8px",
  fontSize: 11,
  fontFamily: "ui-monospace, 'Cascadia Code', monospace",
  color: "#0f172a",
  wordBreak: "break-all",
  flex: 1,
};

const copyBtnStyle: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 5,
  padding: "4px 10px",
  fontSize: 11,
  fontWeight: 600,
  cursor: "pointer",
  flexShrink: 0,
};

const linkStyle: React.CSSProperties = {
  color: "#2563eb",
  fontWeight: 600,
  textDecoration: "none",
};

const footerRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginTop: 20,
  paddingTop: 16,
  borderTop: "1px solid #f1f5f9",
};

const downloadLinkStyle: React.CSSProperties = {
  color: "#64748b",
  fontSize: 12,
  textDecoration: "none",
};
