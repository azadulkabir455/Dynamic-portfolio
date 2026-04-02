export type OfferCardButtonVariation = "box" | "underline";

export interface OfferCardProps {
  preHeader?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  buttonLink?: string;
  buttonVariation?: OfferCardButtonVariation;
  containerClassName?: string;
  preHeaderClassName?: string;
  titleClassName?: string;
  textClassName?: string;
  buttonClassName?: string;
  bgImage?: string;
  bgImageClassName?: string;
  [key: string]: any;
}
