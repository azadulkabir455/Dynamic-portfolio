export const portfolioCardCount = 3;

let step = 0;
let locked = false;
let lockTimer: ReturnType<typeof setTimeout> | null = null;

export function getPortfolioStackStep(): number {
  return step;
}

export function setPortfolioStackStep(next: number): void {
  step = Math.max(0, Math.min(portfolioCardCount, next));
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("portfolioStackStep", { detail: step }),
    );
  }
  locked = true;
  if (lockTimer) clearTimeout(lockTimer);
  lockTimer = setTimeout(() => {
    locked = false;
  }, 350);
}

export function isPortfolioStackScrollLocked(): boolean {
  return locked;
}

export function isInPortfolioStackScrollZone(scrollY: number): boolean {
  if (typeof document === "undefined") return false;
  const projectTwo = document.getElementById("project-two");
  const skills = document.getElementById("skills");
  if (!projectTwo || !skills) return false;
  return scrollY >= projectTwo.offsetTop - 56 && scrollY < skills.offsetTop - 2;
}
