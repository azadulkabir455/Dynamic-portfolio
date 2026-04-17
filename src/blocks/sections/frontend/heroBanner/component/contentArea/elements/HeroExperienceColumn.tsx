"use client";

import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import Icon from "@/blocks/elements/icon/Icon";
import GlassIcons from "@/blocks/elements/3d/GlassIcons/GlassIcons";
import { cn } from "@/utilities/helpers/classMerge";
import type { HeroSocialLink } from "../../../type";

export type HeroExperienceColumnProps = {
  aboutMe: string;
  socialLinks: HeroSocialLink[];
};

const HeroExperienceColumn = ({
  aboutMe,
  socialLinks,
}: HeroExperienceColumnProps) => {
  const socialItems = socialLinks.map((social) => ({
    icon: (
      <Icon name={social.iconName} size={24} className="text-white/90" aria-hidden />
    ),
    label: social.label,
    href: social.link,
    ...(social.color ? { color: social.color } : {}),
  }));

  return (
    <Container className="order-3 flex flex-col justify-center">
      <Text
        variant="p"
        className={cn(
          "text-left align-middle",
          "font-open-sans font-normal not-italic",
          "text-base xl:text-[20px] leading-[28px] xl:leading-[32px] tracking-normal",
          "text-ternary-light",
        )}
      >
        {aboutMe}
      </Text>
      <Container className="mt-6 flex flex-col gap-3 z-10">
        <Text
          variant="h2"
          className={cn(
            "text-left align-middle",
            "font-open-sans font-semibold not-italic",
            "text-base xl:text-[20px] leading-[28px] xl:leading-[30px] tracking-normal",
            "text-ternary",
          )}
        >
          Connect with me
        </Text>
        <GlassIcons
          items={socialItems}
          className={cn(
            "w-fit max-w-none cursor-target justify-items-center",
          )}
        />
      </Container>
    </Container>
  );
};

export default HeroExperienceColumn;
