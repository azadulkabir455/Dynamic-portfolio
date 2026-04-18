export type HeroSocialLink = {
  iconName: string;
  link: string;
  label: string;
};

export type HeroBannerData = {
  name: string;
  designation: string;
  introText: string;
  experience: string;
  aboutMe: string;
  imageSrc: string;
  imageAlt: string;
  ctaURL: string;
  socialLinks: HeroSocialLink[];
  ctaLabel?: string;
};

export type HeroBannerProps = {
  content?: Partial<HeroBannerData> | null;
  variant?: "default" | "dashboardPreview";
};
