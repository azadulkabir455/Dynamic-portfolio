export const wordGapForCurvedLoop = 15;

export function prepareMarqueeText(marqueeText: string): string {
  const hasTrailing = /\s|\u00A0$/.test(marqueeText);
  return (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0";
}

export const curvedLoopViewBox = "0 0 1440 32" as const;

export function getCurvePathD(curveAmount: number): string {
  const baseY = 26;
  const maxDip = 10;
  const dip = Math.min(Math.max(0, curveAmount) * (maxDip / 80), maxDip);
  return `M-100,${baseY} Q500,${baseY + dip} 1540,${baseY}`;
}
