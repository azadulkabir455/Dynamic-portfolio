export type OfferCardButtonVariation = "box" | "underline";

export interface OfferCardProps {
  preHeader?: string;
  title?: string;
  text?: string;
  /** Button label text */
  buttonLabel?: string;
  /** Link href for the button (if provided, button renders as link) */
  buttonLink?: string;
  buttonVariation?: OfferCardButtonVariation;
  containerClassName?: string;
  preHeaderClassName?: string;
  titleClassName?: string;
  textClassName?: string;
  buttonClassName?: string;
  /** Background image URL */
  bgImage?: string;
  /** Classes for the background image layer (e.g. bg-cover bg-center) */
  bgImageClassName?: string;
  [key: string]: any;
}
