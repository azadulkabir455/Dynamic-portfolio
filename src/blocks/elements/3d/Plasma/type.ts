export type PlasmaDirection = "forward" | "reverse" | "pingpong";

export type PlasmaProps = {
  color?: string;
  speed?: number;
  direction?: PlasmaDirection;
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
};
