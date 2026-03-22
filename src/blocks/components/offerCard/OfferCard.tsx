"use client";

import clsx from "clsx";
import Button from "@/blocks/elements/button/Button";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import type { OfferCardProps } from "./type";

export const OfferCard = (props: OfferCardProps) => {
  const {
    preHeader,
    title,
    text,
    buttonLabel,
    buttonLink,
    buttonVariation = "box",
    containerClassName,
    preHeaderClassName,
    titleClassName,
    textClassName,
    buttonClassName,
    bgImage,
    bgImageClassName,
    ...rest
  } = props;

  const isBox = buttonVariation === "box";

  return (
    <Container
      as="div"
      size="full"
      bg={bgImage ? { image: bgImage } : undefined}
      bgClassName={bgImageClassName}
      className={clsx(
        "flex min-h-[280px] flex-col justify-end rounded-xl p-6 !max-w-none",
        bgImage && "bg-cover bg-center bg-no-repeat",
        containerClassName
      )}
      {...rest}
    >
      <Container as="div" size="full" className="flex flex-col gap-2 !max-w-none">
        {preHeader ? (
          <Text
            variant="span"
            className={clsx(
              "text-sm font-medium uppercase tracking-wider text-white/90",
              preHeaderClassName
            )}
          >
            {preHeader}
          </Text>
        ) : null}
        {title ? (
          <Text
            variant="h3"
            className={clsx("text-2xl font-bold text-white sm:text-3xl", titleClassName)}
          >
            {title}
          </Text>
        ) : null}
        {text ? (
          <Text
            variant="p"
            className={clsx("max-w-md text-sm text-white/90", textClassName)}
          >
            {text}
          </Text>
        ) : null}
        {buttonLabel ? (
          <Container as="div" size="full" className="mt-2 !max-w-none">
            <Button
              href={buttonLink}
              type="button"
              size="sm"
              className={clsx(
                isBox
                  ? "rounded-md border border-white/80 bg-white/10 px-4 py-2 text-white hover:bg-white/20"
                  : "bg-transparent px-0 py-0 text-white underline underline-offset-4 hover:text-white/90",
                buttonClassName
              )}
            >
              {buttonLabel}
            </Button>
          </Container>
        ) : null}
      </Container>
    </Container>
  );
};

export default OfferCard;

/*
Import:
import OfferCard from "@/blocks/componets/offerCard/OfferCard";

Props:
- preHeader, title, text: optional copy
- buttonLabel: text for the button
- buttonLink: href for the button (button renders as link when provided)
- buttonVariation: "box" | "underline" (default "box")
- containerClassName, preHeaderClassName, titleClassName, textClassName, buttonClassName
- bgImage: background image URL
- bgImageClassName: classes for bg (e.g. bg-cover bg-center)
- ...props: extra native div attributes for the outer container
*/
