"use client";

import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import Image from "@/blocks/elements/image/Image";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { cn } from "@/utilities/helpers/classMerge";

export type HeroIntroColumnProps = {
  name: string;
  introText: string;
  ctaURL: string;
  ctaLabel?: string;
};

const heroIntroBodyTextClass = cn(
  "font-open-sans font-semibold text-[20px] leading-[40px] tracking-normal",
  "text-ternary-light align-middle text-left",
);

const HeroIntroColumn = ({
  name,
  introText,
  ctaURL,
  ctaLabel,
}: HeroIntroColumnProps) => {
  return (
    <Container
      as="div"
      className={cn(
        "order-1 flex flex-col items-start gap-0",
      )}
    >
      <Container as="div" className="flex flex-col items-start">
        <Text
          variant="p"
          className={cn(
            "flex items-center gap-2",
            heroIntroBodyTextClass,
          )}
        >
          <span>Hey</span>
          <Image
            src="/images/Icons/smily.svg"
            alt=""
            width={28}
            height={28}
            className={cn(
              "inline-block align-middle",
              "h-7 w-7 shrink-0 object-contain",
            )}
            aria-hidden
          />
          <span className="font-bold text-ternary">
            I am {name},
          </span>
        </Text>
        <Text variant="p" className={heroIntroBodyTextClass}>
          {introText}
        </Text>
      </Container>

      <Container
        as="div"
        className={cn(
          "relative w-full max-w-[min(100%,28rem)]",
          "flex flex-col gap-4",
        )}
      >
        <Container
          as="div"
          className="flex items-end pl-[160px] gap-2"
        >
          <Image
            src="/images/icons/talkbuttonindicator.svg"
            alt=""
            width={100}
            height={250}
            unoptimized
            className={cn(
              "relative",
              "bottom-[-10px]",
              "h-auto w-[64px]",

            )}
            aria-hidden
          />
          <Text
            variant="p"
            className={cn(
              "font-open-sans font-normal text-base leading-[20px]",
              " text-left align-middle tracking-normal",
              "text-ternary-light/50",
            )}
          >
            Don&apos;t be a <span className="block">stranger</span>
          </Text>

        </Container>
        <AnimatedButton
          text={ctaLabel ?? "Let's Talk"}
          link={ctaURL}
          className="relative z-10"
        />
      </Container>
    </Container>
  );
};

export default HeroIntroColumn;
