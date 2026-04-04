import type { HeroBannerData } from "../../type";

export type ContentAreaProps = Pick<
  HeroBannerData,
  | "preTitle"
  | "preTitleHighlight"
  | "titleLine1"
  | "titleLine2"
  | "socialLinks"
  | "imageSrc"
  | "imageAlt"
  | "contactEmail"
  | "contactPhone"
>;
