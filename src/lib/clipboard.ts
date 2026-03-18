export async function copySignatureToClipboard(
  html: string
): Promise<boolean> {
  try {
    // Try the modern Clipboard API with HTML support
    if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
      const blob = new Blob([html], { type: "text/html" });
      const plainBlob = new Blob([stripHtml(html)], { type: "text/plain" });
      const item = new ClipboardItem({
        "text/html": blob,
        "text/plain": plainBlob,
      });
      await navigator.clipboard.write([item]);
      return true;
    }

    // Fallback: use document.execCommand with a temporary element
    return copyViaExecCommand(html);
  } catch {
    // Final fallback
    return copyViaExecCommand(html);
  }
}

function copyViaExecCommand(html: string): boolean {
  const container = document.createElement("div");
  container.innerHTML = html;
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.opacity = "0";
  document.body.appendChild(container);

  const range = document.createRange();
  range.selectNodeContents(container);

  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }

  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }

  document.body.removeChild(container);
  if (selection) {
    selection.removeAllRanges();
  }

  return success;
}

function stripHtml(html: string): string {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
