import type { ClickSparkEasing } from "./type";

export const getEasedValue = (t: number, easing: ClickSparkEasing): number => {
  const clamped = Math.min(1, Math.max(0, t));
  switch (easing) {
    case "linear":
      return clamped;
    case "ease-in":
      return clamped * clamped;
    case "ease-in-out":
      return clamped < 0.5 ? 2 * clamped * clamped : -1 + (4 - 2 * clamped) * clamped;
    case "ease-out":
      // ease-out quadratic: t * (2 - t)
      return clamped * (2 - clamped);
    default:
      // fallback
      return clamped * (2 - clamped);
  }
};

