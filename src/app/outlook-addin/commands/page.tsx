"use client";

// ════════════════════════════════════════════════════════════════════════════
// NeatStamp Outlook Add-in — Commands page (Function File)
// URL: https://neatstamp.com/outlook-addin/commands
//
// This page is referenced as the FunctionFile in the manifest. Outlook loads
// it in a hidden iframe and calls the event-handler functions registered via
// Office.actions.associate() when LaunchEvents fire:
//   - OnNewMessageCompose  → onNewMessageComposeHandler
//   - OnNewReplyCompose    → onNewReplyComposeHandler
//
// The page renders nothing visible — it's purely a JavaScript runtime host.
// ════════════════════════════════════════════════════════════════════════════

import { useEffect } from "react";
import Script from "next/script";

declare const Office: {
  onReady: (cb: () => void) => void;
  CoercionType: { Html: string };
  AsyncResultStatus: { Succeeded: string };
  actions: {
    associate: (name: string, fn: (event: { completed: () => void }) => void) => void;
  };
  context: {
    mailbox: {
      item: {
        body: {
          setSignatureAsync?: (
            html: string,
            opts: { coercionType: string },
            cb: (r: { status: string }) => void
          ) => void;
          getAsync: (
            coercionType: string,
            cb: (r: { status: string; value: string }) => void
          ) => void;
          setAsync: (
            html: string,
            opts: { coercionType: string },
            cb: (r: { status: string }) => void
          ) => void;
        };
      } | null;
    };
    roamingSettings: {
      get: (key: string) => unknown;
    };
  };
};

function registerHandlers() {
  if (typeof Office === "undefined") return;

  Office.onReady(() => {
    Office.actions.associate("onNewMessageComposeHandler", onNewMessageComposeHandler);
    Office.actions.associate("onNewReplyComposeHandler",   onNewReplyComposeHandler);
  });
}

// ── Event handlers ────────────────────────────────────────────────────────

function onNewMessageComposeHandler(event: { completed: () => void }) {
  insertStoredSignature(event);
}

function onNewReplyComposeHandler(event: { completed: () => void }) {
  insertStoredSignature(event);
}

function insertStoredSignature(event: { completed: () => void }) {
  const rs = Office.context.roamingSettings;

  const autoApply = rs.get("neatstamp_auto_apply");
  if (!autoApply) {
    event.completed();
    return;
  }

  const signatureHtml = rs.get("neatstamp_signature_html") as string | null;
  if (!signatureHtml) {
    event.completed();
    return;
  }

  const item = Office.context.mailbox.item;
  if (!item?.body) {
    event.completed();
    return;
  }

  if (item.body.setSignatureAsync) {
    // Mailbox 1.10+ — dedicated signature slot (Classic Desktop / New Outlook)
    item.body.setSignatureAsync(
      signatureHtml,
      { coercionType: Office.CoercionType.Html },
      () => { event.completed(); }
    );
  } else {
    // Fallback: append to body (avoids double-insert via a sentinel attribute)
    item.body.getAsync(Office.CoercionType.Html, (getResult) => {
      if (getResult.status !== Office.AsyncResultStatus.Succeeded) {
        event.completed();
        return;
      }
      const existing = getResult.value ?? "";
      if (existing.includes("data-neatstamp-sig")) {
        // Signature already present — don't insert again
        event.completed();
        return;
      }
      const newBody = `${existing}<br><br><span data-neatstamp-sig="1">${signatureHtml}</span>`;
      item.body.setAsync(newBody, { coercionType: Office.CoercionType.Html }, () => {
        event.completed();
      });
    });
  }
}

// ── Component ─────────────────────────────────────────────────────────────

export default function OutlookCommandsPage() {
  useEffect(() => {
    // If Office.js is already loaded (SSR hydration race), register immediately
    if (typeof Office !== "undefined") {
      registerHandlers();
    }
  }, []);

  return (
    <>
      <Script
        src="https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js"
        strategy="beforeInteractive"
        onLoad={registerHandlers}
      />
      {/* This page renders nothing — it's a function-file host only */}
    </>
  );
}
