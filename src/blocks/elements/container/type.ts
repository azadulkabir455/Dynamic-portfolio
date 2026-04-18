import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
export type ContainerElement =
  | "div"
  | "section"
  | "span"
  | "nav"
  | "header"
  | "aside"
  | "main"
  | "article"
  | "footer";

export interface ContainerBg {
  image: string;
  size?: "auto" | "cover" | "contain" | string;
  position?: string;
  repeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y" | string;
  attachment?: "scroll" | "fixed" | "local";
}

export type ContainerProps = {
  size?: ContainerSize;
  as?: ContainerElement | ElementType;
  bg?: ContainerBg;
  bgClassName?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children?: ReactNode;
};
