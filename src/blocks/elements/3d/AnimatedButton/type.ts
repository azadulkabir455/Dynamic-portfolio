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
  /** Default `false`. When `true` with `bordered`, uses primary accents. */
  dark?: boolean;
  /** `true` = outline / border (glass). `false` = solid fill (secondary + primary text; with `dark`, primary + secondary text). Default `true`. */
  bordered?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "download">;

