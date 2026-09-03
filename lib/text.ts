/**
 * Utility functions for normalizing and rendering CMS text with newlines and HTML
 */

export function normalizeNewlines(text?: string | null): string {
  if (!text) return "";
  return text
    .replace(/&#92;n/g, "\n")
    .replace(/&bsol;n/g, "\n")
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");
}

export function formatCmsHtml(text?: string | null): string {
  if (!text) return "";
  const normalized = normalizeNewlines(text);
  return normalized.replace(/\n/g, "<br />");
}

export function splitCmsLines(text?: string | null): string[] {
  if (!text) return [];
  const normalized = normalizeNewlines(text);
  if (!normalized.includes("\n")) {
    return [normalized.trim()];
  }
  return normalized
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function cleanCardTitle(text?: string | null): string {
  if (!text) return "";
  const normalized = normalizeNewlines(text);
  return normalized
    .replace(/<[^>]*>/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
