export type HomeSectionKey = "hero" | "portfolio" | "company" | "skills";

export type HomeSectionVisibility = Record<HomeSectionKey, boolean>;

export const HOME_SECTION_STORAGE_KEY = "portfolio_home_sections_v1";

export const defaultHomeSectionVisibility: HomeSectionVisibility = {
  hero: true,
  portfolio: true,
  company: true,
  skills: true,
};

export function parseHomeSectionVisibility(raw: string | null): HomeSectionVisibility {
  if (!raw) return { ...defaultHomeSectionVisibility };
  try {
    const parsed = JSON.parse(raw) as Partial<HomeSectionVisibility>;
    return {
      ...defaultHomeSectionVisibility,
      ...parsed,
    };
  } catch {
    return { ...defaultHomeSectionVisibility };
  }
}

export function readHomeSectionVisibilityFromStorage(): HomeSectionVisibility {
  if (typeof window === "undefined") return { ...defaultHomeSectionVisibility };
  return parseHomeSectionVisibility(window.localStorage.getItem(HOME_SECTION_STORAGE_KEY));
}

export function writeHomeSectionVisibilityToStorage(next: HomeSectionVisibility): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HOME_SECTION_STORAGE_KEY, JSON.stringify(next));
}
