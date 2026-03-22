export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  children?: any;
  className?: string;
  padding?: CardPadding;
  [key: string]: any;
}
