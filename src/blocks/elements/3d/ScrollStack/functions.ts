export function calculateScrollStackProgress(
  scrollTop: number,
  start: number,
  end: number,
): number {
  if (scrollTop < start) return 0;
  if (scrollTop > end) return 1;
  return (scrollTop - start) / (end - start);
}

export function parseStackPercentage(
  value: string | number,
  containerHeight: number,
): number {
  if (typeof value === "string" && value.includes("%")) {
    return (parseFloat(value) / 100) * containerHeight;
  }
  return typeof value === "number" ? value : parseFloat(String(value));
}
