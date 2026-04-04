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
}

