import type { AnchorHTMLAttributes, ReactNode } from "react";

export type AnimatedButtonProps = {
  text: string;
  link: string;
  downloadFile?: string;
  icon?: string;
  /** When set, replaces Lucide `icon` (e.g. brand SVG from react-icons) */
  iconNode?: ReactNode;
  iconSize?: number;
  iconClassName?: string;
  textClassName?: string;
  className?: string;
  dark?: boolean;
  bordered?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "download">;

