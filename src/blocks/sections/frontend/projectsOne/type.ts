import type { AnimatedButtonProps } from "@/blocks/elements/3d/AnimatedButton/type";

export type ProjectsOneProps = {
  title?: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonText?: string;
  link?: string;
  buttonIcon?: AnimatedButtonProps["icon"];
};
