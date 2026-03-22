import type { ReactNode } from "react";

export type BubbleMenuHoverStyles = {
  bgColor: string;
  textColor: string;
};

export type BubbleMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: BubbleMenuHoverStyles;
};

export type BubbleMenuProps = {
  logo?: ReactNode;
  items?: BubbleMenuItem[];
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  onMenuClick?: (isOpen: boolean) => void;
};

