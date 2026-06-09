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
  hideScrollDownButton = false,
}: ContentAreaProps) => {
  const heroHeadlineClass = cn(
    "font-antonio font-bold text-primary",
    "text-[44px] md:text-[48px] lg:text-[98px] leading-[52px] md:leading-[56px] lg:leading-[100px]",
    "tracking-normal text-center uppercase",
    "[text-shadow:0px_4px_0px_0px_#9E1B1C]",
  );

  return (
    <Container className="py-[60px]">
      <Container as="div" className={cn("relative flex flex-col maxContainer")}>
        <Container
          as="div"
          className="pt-5 md:pt-0 md:absolute md:top-[0] md:left-[20px]"
        >
          <Text
            variant="h3"
            className={cn(
              "font-antonio font-semibold text-primary",
              "text-base md:text-[20px] leading-[28px] lg:text-[24px] lg:leading-[32px]",
              "tracking-normal text-center",
            )}
          >
            With {experience} Professional Experience
          </Text>
        </Container>
        <Container as="div" className={cn("relative pt-[15px] md:pt-[40px]")}>
          <Text variant="h2" className={cn(heroHeadlineClass, "relative")}>
            <span>Senior</span>
            <Image
              src="/images/Icons/talkWithButtonIndecator.svg"
              alt=""
              width={100}
              height={62}
              unoptimized
              className={cn(
                "shrink-0 object-contain",
                "w-[80px] h-[52px] lg:w-[100px] lg:h-[62px]",
                "absolute top-[-20px] lg:top-[10px] right-[10%] md:right-[30%]",
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
            "grid items-stretch gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)_minmax(0,1.15fr)]",
          )}
        >
          <Container as="div" className="order-1 md:order-2 lg:contents">
            <HeroIntroColumn
              name={name}
              introText={introText}
              ctaURL={ctaURL}
              ctaLabel={ctaLabel}
            />
          </Container>

          <Container
            as="div"
            className={cn(
              "flex md:order-1 md:col-span-2 lg:col-span-1 lg:order-2",
              "relative min-w-0 flex-col items-center self-stretch",
            )}
          >
            <Container
              as="span"
              aria-hidden
              className="block absolute top-[60px] right-1/2 h-[2px] w-[80vw] bg-primary"
            />
            <Container
              as="span"
              aria-hidden
              className="block absolute top-[125px] left-1/2 h-[2px] w-[80vw] bg-primary"
            />
            <Container className="relative w-full max-w-[560px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={520}
                height={650}
                className={cn(
                  "relative top-[-40px] lg:top-[-50px] z-[1] mx-auto block min-h-0 min-w-0",
                  "h-[320px] lg:h-[520px] w-auto max-w-full",
                  "object-contain object-bottom",
                )}
                priority
              />
              {!hideScrollDownButton ? (
                <Container
                  as="div"
                  className={cn(
                    "absolute bottom-[0] lg:bottom-[15%] left-1/2 z-10 -translate-x-1/2",
                  )}
                >
                  <ScrollDownButton
                    scrollTargetId="company"
                    className="text-ternary"
                  />
                </Container>
              ) : null}
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

          <Container as="div" className="order-2 md:order-3 lg:contents">
            <HeroExperienceColumn aboutMe={aboutMe} socialLinks={socialLinks} />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ContentArea;
