import type { ReactNode } from "react";

export type GradientKey = "blue" | "purple" | "red" | "indigo" | "orange" | "green" | "skyblue" | "pink";


export interface GlassIconsItem {
  icon: ReactNode;
  color: GradientKey;
  label: string;
  href?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
  colorful?: boolean;
  /** Slide each tile up from below, one after another (hero stagger). */
  staggerSlideUp?: boolean;
  staggerBaseDelay?: number;
  staggerStep?: number;
  loaderExited?: boolean;
}

