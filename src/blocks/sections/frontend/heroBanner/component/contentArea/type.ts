import type { HeroBannerData } from "../../type";

export type ContentAreaProps = Pick<
  HeroBannerData,
  | "name"
  | "designation"
  | "introText"
  | "experience"
  | "aboutMe"
  | "imageSrc"
  | "imageAlt"
  | "socialLinks"
  | "ctaLabel"
  | "ctaURL"
> & {
  hideScrollDownButton?: boolean;
};
