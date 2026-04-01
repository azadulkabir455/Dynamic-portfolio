import type { ElementType } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
export type ContainerElement = "div" | "section" | "span";

export interface ContainerBg {
  image: string;
  size?: "auto" | "cover" | "contain" | string;
  position?: string;
  repeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y" | string;
  attachment?: "scroll" | "fixed" | "local";
}

export interface ContainerProps {
  children?: any;
  className?: string;
  size?: ContainerSize;
  as?: ContainerElement | ElementType;
  bg?: ContainerBg;
  bgClassName?: string;
  [key: string]: any;
}
