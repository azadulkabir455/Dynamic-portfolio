import type { CSSProperties, ReactNode } from "react";

export type LogoNodeItem = {
  node: ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
};

export type LogoImageItem = {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
  width?: number;
  height?: number;
  srcSet?: string;
  sizes?: string;
};

export type LogoLoopItem = LogoNodeItem | LogoImageItem;

export type LogoLoopProps = {
  logos: LogoLoopItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoLoopItem, key: string) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

