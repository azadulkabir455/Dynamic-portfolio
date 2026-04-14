import type { AnchorHTMLAttributes, MouseEventHandler } from "react";

export type AnimatedButtonProps = {
  text: string;
  link: string;
  iconName?: string;
  iconSize?: number;
  iconClassName?: string;
  iconContainerClassName?: string;
  buttonClassName?: string;
  className?: string;
  isWhatsApp?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "download">;
