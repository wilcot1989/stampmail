/**
 * Copy an HTML email signature to the clipboard in a way that
 * allows pasting as rich text into Gmail, Outlook, Apple Mail, etc.
 *
 * Strategy:
 * 1. Try ClipboardItem API (modern browsers, Chrome 76+)
 * 2. Fallback: render HTML in a hidden div, select it, copy the selection
 *    This produces a rich-text copy that email clients understand.
 */
export async function copySignatureToClipboard(
  html: string
): Promise<boolean> {
  // Strategy 1: ClipboardItem API (best quality, preserves HTML)
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof ClipboardItem !== "undefined"
    ) {
      const htmlBlob = new Blob([html], { type: "text/html" });
      const textBlob = new Blob([stripHtml(html)], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
        }),
      ]);
      return true;
    }
  } catch (err) {
    console.log("ClipboardItem failed, trying fallback:", err);
  }

  // Strategy 2: Render + select + execCommand
  // This is the most compatible method for rich-text copy
  try {
    return copyRenderedHtml(html);
  } catch (err) {
    console.log("execCommand fallback failed:", err);
  }

  // Strategy 3: Last resort - just copy as plain text
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(html);
      return true;
    }
  } catch {
    // nothing left to try
  }

  return false;
}

function copyRenderedHtml(html: string): boolean {
  // Create a container with the rendered signature
  const container = document.createElement("div");
  container.innerHTML = html;

  // Make it visible but off-screen (must be visible for selection to work)
  Object.assign(container.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: "600px",
    opacity: "0.01", // near-invisible but not display:none
    pointerEvents: "none",
    zIndex: "-1",
    background: "white",
    padding: "0",
    margin: "0",
  });

  document.body.appendChild(container);

  // Select the rendered content
  const range = document.createRange();
  range.selectNodeContents(container);

  const selection = window.getSelection();
  if (!selection) {
    document.body.removeChild(container);
    return false;
  }

  selection.removeAllRanges();
  selection.addRange(range);

  // Copy the selection (this copies the RENDERED html as rich text)
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }

  // Clean up
  selection.removeAllRanges();
  document.body.removeChild(container);

  return success;
}

function stripHtml(html: string): string {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
