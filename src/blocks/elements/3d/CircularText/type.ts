export type CircularTextHoverBehavior = "slowDown" | "speedUp" | "pause" | "goBonkers" | undefined;

export interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: CircularTextHoverBehavior;
  className?: string;
  textClassName?: string;
}

