export const getScrollTargetY = (scrollByPx: number | undefined) => {
  if (typeof scrollByPx === "number") return scrollByPx;


  if (typeof window === "undefined" || typeof document === "undefined") {
    return Math.max(320, 0);
  }

  const objectiveEl = document.getElementById("objective");
  if (objectiveEl) {
    return objectiveEl.getBoundingClientRect().top + window.scrollY;
  }

  return Math.max(window.innerHeight - 120, 320);
};

