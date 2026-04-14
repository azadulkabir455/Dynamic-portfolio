export type CurvedLoopDirection = "left" | "right";

export type CurvedLoopProps = {
  marqueeText?: string;
  speed?: number;
  className?: string;
  wrapperClassName?: string;
  curveAmount?: number;
  direction?: CurvedLoopDirection;
  interactive?: boolean;
};
