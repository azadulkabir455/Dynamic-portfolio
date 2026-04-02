"use client";

import clsx from "clsx";
import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import Link from "@/blocks/elements/link/Link";
import Text from "@/blocks/elements/text/Text";
import type { CategoryCardProps } from "./type";

const cardClasses =
  "flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md w-full min-w-0 text-center";

const linkCardClasses =
  "!flex min-h-full flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md w-full min-w-0 text-center no-underline";

export const CategoryCard = ({
  icon,
  title,
  href,
  iconSize = 24,
  iconClassName,
  titleClassName,
  containerClassName,
  linkClassName,
  ...rest
}: CategoryCardProps) => {
  const content = (
    <>
      <Icon
        name={icon}
        size={iconSize}
        className={clsx("shrink-0 text-slate-600", iconClassName)}
      />
      <Text
        variant="span"
        className={clsx("block w-full text-center text-sm font-semibold text-slate-900", titleClassName)}
      >
        {title}
      </Text>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={clsx(linkCardClasses, linkClassName)}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <Container
      as="div"
      size="full"
      className={clsx(cardClasses, "!max-w-none", containerClassName)}
      {...rest}
    >
      {content}
    </Container>
  );
};

export default CategoryCard;
