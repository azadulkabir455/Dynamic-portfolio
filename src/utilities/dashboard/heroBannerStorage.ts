import type { HeroBannerData, HeroSocialLink } from "@/blocks/sections/frontend/heroBanner/type";
import { defaultHeroBannerData } from "@/blocks/sections/frontend/heroBanner/component/data/Data";

export const HERO_BANNER_STORAGE_KEY = "portfolio_hero_banner_v1";

function normalizeLink(row: Partial<HeroSocialLink> | undefined, fallback: HeroSocialLink): HeroSocialLink {
  const src = row && typeof row === "object" ? row : {};
  return {
    iconName: typeof src.iconName === "string" && src.iconName.trim() ? src.iconName.trim() : fallback.iconName,
    label: typeof src.label === "string" && src.label.trim() ? src.label.trim() : fallback.label,
    link: typeof src.link === "string" && src.link.trim() ? src.link.trim() : fallback.link,
  };
}

function mergeSocialLinks(parsed: unknown): HeroSocialLink[] {
  const base = defaultHeroBannerData.socialLinks;
  if (!Array.isArray(parsed)) return base.map((s) => ({ ...s }));
  return base.map((item, i) => normalizeLink(parsed[i] as Partial<HeroSocialLink> | undefined, item));
}

export function parseHeroBannerDataFromStorage(raw: string | null): HeroBannerData {
  if (!raw) return { ...defaultHeroBannerData, socialLinks: mergeSocialLinks(null) };
  try {
    const parsed = JSON.parse(raw) as Partial<HeroBannerData>;
    return {
      ...defaultHeroBannerData,
      ...parsed,
      socialLinks: mergeSocialLinks(parsed.socialLinks),
    };
  } catch {
    return { ...defaultHeroBannerData, socialLinks: mergeSocialLinks(null) };
  }
}

export function readHeroBannerDataFromStorage(): HeroBannerData {
  if (typeof window === "undefined") {
    return { ...defaultHeroBannerData, socialLinks: mergeSocialLinks(null) };
  }
  return parseHeroBannerDataFromStorage(window.localStorage.getItem(HERO_BANNER_STORAGE_KEY));
}

export function writeHeroBannerDataToStorage(next: HeroBannerData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HERO_BANNER_STORAGE_KEY, JSON.stringify(next));
}

export function emitHeroBannerUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("hero-banner-updated"));
}
