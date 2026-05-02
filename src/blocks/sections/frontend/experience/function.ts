export type SpineLine = { top: number; height: number; left: number };

export function calculateSpineLine(
  track: HTMLElement,
  first: HTMLElement,
  last: HTMLElement,
): SpineLine {
  const tr = track.getBoundingClientRect();
  const fr = first.getBoundingClientRect();
  const lr = last.getBoundingClientRect();
  const top = fr.top + fr.height / 2 - tr.top;
  const endY = lr.top + lr.height / 2 - tr.top;
  const left = fr.left + fr.width / 2 - tr.left;
  return { top, height: Math.max(0, endY - top), left };
}
