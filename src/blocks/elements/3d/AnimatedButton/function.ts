/**
 * Trimmed link, or `#` when empty. No rewriting — value is used as-is.
 */
export const getSafeLink = (raw: string): string => {
  const s = (raw ?? "").trim();
  return s || "#";
};

/**
 * WhatsApp button only: normalizes short `wa.me` and `tel:` → `https://wa.me/<digits>`.
 * Everything else (mailto, full URLs, relative paths, plain text) stays unchanged.
 */
export const getWhatsAppHref = (raw: string): string => {
  const s = (raw ?? "").trim();
  if (!s) return "#";

  const lower = s.toLowerCase();

  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    return s;
  }

  if (lower.startsWith("wa.me/") || lower === "wa.me") {
    return lower === "wa.me" ? "https://wa.me/" : `https://${s}`;
  }

  if (lower.startsWith("tel:")) {
    const digits = s.replace(/\D/g, "");
    if (!digits) return s;
    return `https://wa.me/${digits}`;
  }

  return s;
};
