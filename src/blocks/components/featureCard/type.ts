export type FeatureCardVariation = "top" | "left";

export interface FeatureCardProps {
  icon: string;
  title: string;
  text: string;
  variation?: FeatureCardVariation;
  iconSize?: number;
  iconClassName?: string;
  titleClassName?: string;
  textClassName?: string;
  containerClassName?: string;
  [key: string]: any;
}
