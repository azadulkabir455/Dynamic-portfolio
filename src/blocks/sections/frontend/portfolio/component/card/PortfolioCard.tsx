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
          "flex min-h-[465px] flex-col rounded-2xl overflow-hidden px-[50px] pb-0 pt-[50px]",
        )}
      >
        <Container
          as="div"
          className={cn(
            "grid min-h-0 w-full flex-1 grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] items-end gap-10",
          )}
        >
          <Container
            as="div"
            className={cn(
              "flex h-full min-h-0 flex-col justify-between pb-[50px]",
            )}
          >
            <Container as="div">
              <Text
                variant="h3"
                className={cn(
                  "font-open-sans text-[28px] font-bold leading-[36px] tracking-normal text-secondary align-middle",
                )}
              >
                {title}
              </Text>
              <Text
                variant="p"
                className={cn(
                  "font-open-sans font-semibold leading-[32px] tracking-normal align-middle",
                  "text-[18px] text-secondary",
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
                  "text-[20px] text-secondary",
                  "font-open-sans font-normal leading-[30px] tracking-normal align-middle",
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
              buttonClassName="bg-quaternary text-primary"
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
