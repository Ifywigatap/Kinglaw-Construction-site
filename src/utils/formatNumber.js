export function formatNumber(value, locale = "en-US", options = {}) {
  if (value === null || value === undefined || value === "") return "";
  const number = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(number)) return String(value);

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);
}
