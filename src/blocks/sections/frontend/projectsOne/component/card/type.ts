import type { AnimatedButtonProps } from "@/blocks/elements/3d/AnimatedButton/type";

export type ProjectCardProps = {
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  features: string;
  liveLink: string;
  viewDetailsLink: string;
  liveButtonText?: string;
  viewDetailsButtonText?: string;
  liveIcon?: AnimatedButtonProps["icon"];
  viewDetailsIcon?: AnimatedButtonProps["icon"];
  index?: number;
  className?: string;
};
