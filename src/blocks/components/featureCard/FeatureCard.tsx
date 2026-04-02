"use client";

import clsx from "clsx";
import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import Text from "@/blocks/elements/text/Text";
import type { FeatureCardProps } from "./type";

export const FeatureCard = ({
  icon,
  title,
  text,
  variation = "left",
  iconSize = 24,
  iconClassName,
  titleClassName,
  textClassName,
  containerClassName,
  ...rest
}: FeatureCardProps) => {
  const isTop = variation === "top";

  return (
    <Container
      as="div"
      size="full"
      className={clsx(
        "flex !max-w-none",
        isTop ? "flex-col items-start gap-3" : "flex-row items-center gap-4",
        containerClassName
      )}
      {...rest}
    >
      <Icon
        name={icon}
        size={iconSize}
        className={clsx("shrink-0 text-slate-400", iconClassName)}
      />
      <Container as="div" size="full" className="flex min-w-0 flex-col gap-1 !max-w-none">
        <Text
          variant="strong"
          className={clsx("text-base font-semibold text-slate-900", titleClassName)}
        >
          {title}
        </Text>
        <Text
          variant="p"
          className={clsx("text-sm text-slate-600", textClassName)}
        >
          {text}
        </Text>
      </Container>
    </Container>
  );
};

export default FeatureCard;
