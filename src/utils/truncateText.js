export function truncateText(text, maxLength = 120, suffix = "...") {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}${suffix}`;
}
