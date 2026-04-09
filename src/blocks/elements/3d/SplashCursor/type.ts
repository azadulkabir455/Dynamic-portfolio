export type SplashCursorBackColor = {
  r: number;
  g: number;
  b: number;
};

export type SplashCursorProps = {
  simResolution?: number;
  dyeResolution?: number;
  captureResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  shading?: boolean;
  colorUpdateSpeed?: number;
  backColor?: SplashCursorBackColor;
  transparent?: boolean;
};
