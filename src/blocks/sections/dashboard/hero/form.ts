import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultHeroBannerData } from "@/blocks/sections/frontend/heroBanner/component/data/Data";

export const heroSocialLinkSchema = z.object({
  iconName: z.string().trim().min(1, "Icon name is required"),
  link: z.string().trim().min(1, "URL is required"),
  label: z.string().trim().min(1, "Label is required"),
});

export const heroFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  designation: z.string().trim().min(1, "Designation is required"),
  introText: z.string().trim().min(1, "Intro is required"),
  experience: z.string().trim().min(1, "Experience is required"),
  aboutMe: z.string().trim().min(1, "About me is required"),
  imageSrc: z.string().trim().min(1, "Image path is required"),
  imageAlt: z.string().trim().min(1, "Alt text is required"),
  ctaURL: z.string().trim().min(1, "CTA URL is required"),
  ctaLabel: z.string().trim().optional(),
  socialLinks: z.tuple([
    heroSocialLinkSchema,
    heroSocialLinkSchema,
    heroSocialLinkSchema,
  ]),
});

export const heroFormResolver = zodResolver(heroFormSchema);

export const heroFormDefaultValues: z.infer<typeof heroFormSchema> = {
  name: defaultHeroBannerData.name,
  designation: defaultHeroBannerData.designation,
  introText: defaultHeroBannerData.introText,
  experience: defaultHeroBannerData.experience,
  aboutMe: defaultHeroBannerData.aboutMe,
  imageSrc: defaultHeroBannerData.imageSrc,
  imageAlt: defaultHeroBannerData.imageAlt,
  ctaURL: defaultHeroBannerData.ctaURL,
  ctaLabel: defaultHeroBannerData.ctaLabel,
  socialLinks: [
    { ...defaultHeroBannerData.socialLinks[0]! },
    { ...defaultHeroBannerData.socialLinks[1]! },
    { ...defaultHeroBannerData.socialLinks[2]! },
  ],
};
