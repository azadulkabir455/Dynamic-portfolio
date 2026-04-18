import * as LucideIcons from "lucide-react";

const BLOCKLIST = new Set([
  "createLucideIcon",
  "default",
  "Icon",
  "IconNode",
  "LucideIcon",
  "LucideProps",
]);

function collectLucideIconNames(): string[] {
  const mod = LucideIcons as Record<string, unknown>;
  return Object.keys(mod)
    .filter((key) => {
      if (BLOCKLIST.has(key)) return false;
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(key)) return false;
      const val = mod[key];
      return typeof val === "function" || (typeof val === "object" && val !== null);
    })
    .sort((a, b) => a.localeCompare(b));
}
export const LUCIDE_ICON_NAMES: string[] = collectLucideIconNames();

export function filterLucideIconNames(query: string, limit = 50): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return LUCIDE_ICON_NAMES.slice(0, limit);
  return LUCIDE_ICON_NAMES.filter((n) => n.toLowerCase().includes(q)).slice(0, limit);
}
