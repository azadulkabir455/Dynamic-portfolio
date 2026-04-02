import type { AnchorHTMLAttributes } from "react";

export type AnimatedButtonProps = {
  text: string;
  link: string;
  downloadFile?: string;
  icon?: string;
  iconSize?: number;
  iconClassName?: string;
  textClassName?: string;
  className?: string;
  dark?: boolean;
  bordered?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "download">;

