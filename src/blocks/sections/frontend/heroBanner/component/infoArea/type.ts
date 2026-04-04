import type { HeroBannerData } from "../../type";

export type InfoAreaProps = Pick<
  HeroBannerData,
  | "introCircleText"
  | "introText"
  | "contactEmail"
  | "whatsappNumber"
  | "cvHref"
  | "cvFileName"
>;
