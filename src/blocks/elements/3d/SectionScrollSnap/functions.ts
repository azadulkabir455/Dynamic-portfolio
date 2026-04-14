/** এত px সেকশন ভিউপোর্টে দেখা গেলে স্ন্যাপ ট্রিগার। */
export const minVisiblePx = 80;

/** স্ক্রল অ্যানিমেশন সময় — কম মান = দ্রুত স্ন্যাপ। */
export const scrollDurationMs = 800;

/** অ্যানিমেশন শেষের পর আবার স্ন্যাপ ট্রিগার হতে দেরি (ms)। */
export const snapCooldownMs = 320;

let snapCompleteListener: (() => void) | null = null;

/** SectionScrollSnap কুলডাউন সিঙ্ক করতে (ক্লিক + হুইল একই আচরণ)। */
export function setSnapCompleteListener(fn: (() => void) | null) {
  snapCompleteListener = fn;
}

export function lockPageScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

export function unlockPageScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

/** হিরো থেকে অবজেক্টিভ — ক্লিক/বাটন; `animateScrollTo` + লক। */
export function scrollToNextSectionFromHero(): void {
  const objective = document.getElementById("objective");
  if (!objective) return;
  const objRect = objective.getBoundingClientRect();
  if (objRect.top <= 1) return;
  const targetY = clampScrollY(window.scrollY + objRect.top);
  animateScrollTo(targetY, scrollDurationMs, {
    onStart: lockPageScroll,
    onComplete: () => {
      unlockPageScroll();
      snapCompleteListener?.();
    },
  });
}

/** নির্দিষ্ট `#id` সেকশনে স্মুথ স্ক্রল — লক + স্ন্যাপ কুলডাউন সিঙ্ক। */
export function scrollToSectionById(
  elementId: string,
  onCompleteExtra?: () => void,
): void {
  const el = document.getElementById(elementId);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const targetY = clampScrollY(window.scrollY + rect.top);
  animateScrollTo(targetY, scrollDurationMs, {
    onStart: lockPageScroll,
    onComplete: () => {
      unlockPageScroll();
      snapCompleteListener?.();
      onCompleteExtra?.();
    },
  });
}

/** Ease-in cubic — শুরুতে ধীর (উপরে/নিচে মোশন)। */
export function easeInCubic(t: number): number {
  const u = Math.min(1, Math.max(0, t));
  return u * u * u;
}

/** Ease-out: দ্রুত শুরু, শেষে ধীর (cubic) — স্কেল। */
export function easeOutCubic(t: number): number {
  const u = 1 - t;
  return 1 - u * u * u;
}

/** Ease-in-out cubic — মাঝখানে দ্রুত, শুরু/শেষে মসৃণ (CSS ease-in-out এর কাছাকাছি)। */
export function easeInOutCubic(t: number): number {
  const u = Math.min(1, Math.max(0, t));
  return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
}

export function clampScrollY(y: number): number {
  const max = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  return Math.max(0, Math.min(max, y));
}

let activeScrollRafId: number | null = null;

export function isScrollAnimationRunning(): boolean {
  return activeScrollRafId !== null;
}

export type AnimateScrollOptions = {
  onStart?: () => void;
  onComplete?: () => void;
};

/** আগের স্মুথ স্ক্রল বাতিল করে নতুন চালু — দুটো একসাথে চললে কাপুনি হয়। */
export function animateScrollTo(
  targetY: number,
  durationMs: number,
  opts?: AnimateScrollOptions,
): void {
  if (activeScrollRafId !== null) {
    cancelAnimationFrame(activeScrollRafId);
    activeScrollRafId = null;
  }

  const startY = window.scrollY;
  const endY = clampScrollY(targetY);
  const delta = endY - startY;
  if (Math.abs(delta) < 0.5) {
    opts?.onComplete?.();
    return;
  }

  opts?.onStart?.();

  const start = performance.now();

  const frame = (now: number) => {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / durationMs);
    const eased = easeOutCubic(t);
    window.scrollTo(0, startY + delta * eased);
    if (t < 1) {
      activeScrollRafId = requestAnimationFrame(frame);
    } else {
      activeScrollRafId = null;
      opts?.onComplete?.();
    }
  };

  activeScrollRafId = requestAnimationFrame(frame);
}

export function visibleInViewport(rect: DOMRect): number {
  const h = window.innerHeight;
  return Math.min(rect.bottom, h) - Math.max(rect.top, 0);
}

export function thresholdForHeight(height: number): number {
  return Math.min(minVisiblePx, Math.max(height, 1));
}
