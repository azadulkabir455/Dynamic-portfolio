import type { ReactNode } from "react";

export type ClickSparkEasing =
  | "linear"
  | "ease-in"
  | "ease-in-out"
  | "ease-out"
  | (string & {});

export type ClickSparkProps = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: ClickSparkEasing;
  extraScale?: number;
  zIndex?: number;
  children?: ReactNode;
};

