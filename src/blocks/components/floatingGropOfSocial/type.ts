import type { SocialLinkItem } from "../groupOfSocial/type";

export interface FloatingGroupOfSocialProps {
  items: SocialLinkItem[];
  centerIconName: string;
  centerIconSize?: number;
  centerIconClassName?: string;
  centerIconContainerClassName?: string;
  positionClassName?: string;
  containerClassName?: string;
  socialIconSize?: number;
  socialIconClassName?: string;
  socialLinkClassName?: string;
  [key: string]: any;
}
