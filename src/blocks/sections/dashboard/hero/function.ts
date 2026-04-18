import type { HeroBannerData } from "@/blocks/sections/frontend/heroBanner/type";
import type { HeroFormValues } from "./type";
import {
  emitHeroBannerUpdated,
  readHeroBannerDataFromStorage,
  writeHeroBannerDataToStorage,
} from "@/utilities/dashboard/heroBannerStorage";

export const HERO_FORM_SAVE_DEBOUNCE_MS = 220;

export function getHeroFormInitialValues(): HeroFormValues {
  return readHeroBannerDataFromStorage() as HeroFormValues;
}

export function persistHeroFormValues(values: HeroFormValues): void {
  writeHeroBannerDataToStorage(values as HeroBannerData);
  emitHeroBannerUpdated();
}
