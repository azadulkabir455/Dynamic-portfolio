"use client";

import Container from "@/blocks/elements/container/Container";
import Image from "@/blocks/elements/image/Image";
import Text from "@/blocks/elements/text/Text";
import AnimatedButton from "@/blocks/elements/3d/AnimatedButton/AnimatedButton";
import { cn } from "@/utilities/helpers/classMerge";
import type { PortfolioCardProps } from "./type";

const PortfolioCard = ({
  imageSrc,
  imageAlt,
  title,
  description,
  duration,
  buttonText,
  buttonLink,
  className,
  surface = "ternary",
}: PortfolioCardProps) => {
  return (
    <Container
      as="article"
      className={cn("relative w-full flex flex-col gap-[50px]", className)}
      aria-label={title}
    >
      <Container
        as="div"
        className={cn(  
          surface === "primary" ? "bg-primary" : "bg-ternary",
          "flex min-h-[420px] lg:min-h-[465px] flex-col rounded-xl lg:rounded-2xl overflow-hidden pb-0 px-[30px] lg:px-[50px] pt-[30px] lg:pt-[50px]",
        )}
      >
        <Container
          as="div"
          className={cn(
            "grid min-h-0 w-full flex-1 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] items-end lg:gap-10",
          )}
        >
          <Container
            as="div"
            className={cn(
              "flex h-full min-h-0 flex-col lg:justify-between pb-0 lg:pb-[50px]",
            )}
          >
            <Container as="div">
              <Text
                variant="h3"
                className={cn(
                  'text-secondary text-[22px] lg:text-[28px]',
                  "font-open-sans font-bold leading-[28px] lg:leading-[36px] tracking-normal align-middle",
                )}
              >
                {title}
              </Text>
              <Text
                variant="p"
                className={cn(
                  "font-open-sans font-semibold leading-[32px] tracking-normal align-middle",
                  "text-[16px] lg:text-[18px] text-secondary",
                  "mt-4",
                )}
              >
                {description}
              </Text>
            </Container>
            {duration ? (
              <Text
                variant="p"
                className={cn(
                  "text-[18px] lg:text-[20px] text-secondary",
                  "font-open-sans font-normal leading-[30px] tracking-normal align-middle",
                  "mt-5 lg:mt-0",
                )}
              >
                <span className="font-bold">Project duration:</span> {duration}
              </Text>
            ) : null}
            <AnimatedButton
              text={buttonText}
              link={buttonLink}
              iconClassName="text-secondary"
              iconContainerClassName="bg-primary"
              buttonClassName="bg-quaternary text-primary mt-5 lg:mt-0"
            />
          </Container>
          <Container
            as="div"
            className="relative w-full overflow-hidden rounded-t-2xl"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={600}
              className={cn(
                "block w-full max-w-full object-cover object-top shadow-lg",
              )}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default PortfolioCard;
