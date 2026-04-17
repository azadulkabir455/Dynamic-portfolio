"use client";

import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import type { ContentAreaProps } from "./type";
import HeroIntroColumn from "./elements/HeroIntroColumn";
import HeroExperienceColumn from "./elements/HeroExperienceColumn";
import { cn } from "@/utilities/helpers/classMerge";
import Text from "@/blocks/elements/text/Text";
import ScrollDownButton from "@/blocks/elements/3d/ScrollDownButton/ScrollDownButton";

const ContentArea = ({
  name,
  designation,
  introText,
  experience,
  imageSrc,
  imageAlt,
  aboutMe,
  ctaURL,
  socialLinks,
  ctaLabel,
}: ContentAreaProps) => {
  const heroHeadlineClass = cn(
    "font-antonio font-bold text-primary",
    "text-[48px] lg:text-[88px] xl:text-[98px] leading-[56px] lg:leading-[90px] xl:leading-[100px]",
    "tracking-normal text-center uppercase",
  );

  return (
    <Container
      className="py-[60px] z-10"
    >
      <Container
        as="div"
        className={cn(
          "relative flex flex-col maxContainer",
        )}
      >
        <Container as="div" className="pt-10 lg:pt-0 lg:absolute lg:top-[0] lg:left-[20px]">
          <Text
            variant="h3"
            className={cn(
              "font-antonio font-semibold text-primary",
              "text-[20px] leading-[28px] lg:text-[24px] lg:leading-[32px]",
              "tracking-normal text-center",
            )}
          >
            With {experience} Professional Experience
          </Text>
        </Container>
        <Container
          as="div"
          className={cn(
            "relative pt-[15px] lg:pt-[40px]",
          )}
        >
          <Text
            variant="h2"
            className={cn(
              heroHeadlineClass, 
              "relative")}
          >
            <span>Senior</span>
            <Image
              src="/images/Icons/talkWithButtonIndecator.svg"
              alt=""
              width={91}
              height={55}
              unoptimized
              className={cn(
                "inline-block shrink-0 object-contain align-middle",
                "h-[90px] lg:h-[105px] w-auto",
                "rotate-[-10deg]",
                "absolute bottom-[10%]",
              )}
              aria-hidden
            />
          </Text>
          <Text variant="h1" className={heroHeadlineClass}>
            {designation}
          </Text>
        </Container>

        <Container
          className={cn(
            "min-h-0 py-3 lg:py-0",
            "grid items-stretch gap-5 grid-cols-1  lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)_minmax(0,1.15fr)]",
          )}
        >

          <HeroIntroColumn
            name={name}
            introText={introText}
            ctaURL={ctaURL}
            ctaLabel={ctaLabel}
          />
          <Container
            as="div"
            className="order-2 flex min-w-0 flex-col items-center self-stretch"
          >
            <Container className="relative w-full max-w-[560px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={520}
                height={650}
                className={cn(
                  "relative lg:top-[-50px] z-[1] mx-auto block min-h-0 min-w-0",
                  "h-[320px] lg:h-[520px] w-auto max-w-full",
                  "object-contain object-bottom",
                )}
                priority
              />
              <Container
                as="div"
                className={cn(
                  "absolute bottom-[0] lg:bottom-[15%] left-1/2 z-10 -translate-x-1/2",
                )}
              >
                <ScrollDownButton
                  scrollTargetId="objective"
                  className="text-ternary"
                />
              </Container>
              <Container
                className={cn(
                  "absolute inset-0 z-[2]",
                  "bg-gradient-to-t from-secondary/75 via-secondary/20 via-[45%] to-transparent",
                )}
                aria-hidden
              />
              <Container
                className={cn(
                  "absolute inset-x-0 bottom-0 z-[3]",
                  "h-[min(42%,11rem)]",
                  "bg-gradient-to-t from-secondary via-secondary/90 to-transparent",
                )}
                aria-hidden
              />

            </Container>
          </Container>

          <HeroExperienceColumn
            aboutMe={aboutMe}
            socialLinks={socialLinks} />

        </Container>
      </Container>
    </Container>
  );
};

export default ContentArea;
