import type { AnimatedButtonProps } from "@/blocks/elements/3d/AnimatedButton/type";

export type ProjectHeaderProps = {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  /** Lucide icon name for `AnimatedButton`. */
  buttonIcon?: AnimatedButtonProps["icon"];
  titleClassName?: string;
  descriptionClassName?: string;
};
