import type { GradientKey } from "@/blocks/elements/3d/GlassIcons/type";

export type HeroSocialLink = {
  iconName: string;
  link: string;
  label: string;
  color: GradientKey;
};

export type HeroBannerData = {
  preTitle: string;
  preTitleHighlight: string;
  titleLine1: string;
  titleLine2: string;
  socialLinks: HeroSocialLink[];
  introCircleText: string;
  introText: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  cvHref: string;
  cvFileName: string;
  imageSrc: string;
  imageAlt: string;
};

export type HeroBannerProps = {
  content?: Partial<HeroBannerData> | null;
};
