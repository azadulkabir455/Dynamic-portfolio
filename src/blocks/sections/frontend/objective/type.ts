import type { AnimatedButtonProps } from "@/blocks/elements/3d/AnimatedButton/type";

export type ObjectiveLogo = {
  src: string;
  alt: string;
  href?: string;
};

export type ObjectiveProps = {
  titlePrefix?: string;
  titleEmphasis?: string;
  paragraph?: string;
  logos?: ObjectiveLogo[];
  buttonText?: string;
  buttonLink?: string;
  buttonIcon?: AnimatedButtonProps["icon"];
  buttonIconSize?: number;
  buttonIconClassName?: string;
  buttonTextClassName?: string;
  buttonClassName?: string;
};

