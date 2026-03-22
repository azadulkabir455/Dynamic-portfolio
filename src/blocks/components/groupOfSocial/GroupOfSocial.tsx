"use client";

import clsx from "clsx";
import NextLink from "next/link";
import Icon from "@/blocks/elements/icon/Icon";
import { GroupOfSocialProps } from "./type";
import Container from "@/blocks/elements/container/Container";

export const GroupOfSocial = ({
  items = [],
  label,
  labelClassName,
  containerClassName,
  iconSize = 20,
  iconClassName,
  linkClassName,
  ...props
}: GroupOfSocialProps) => {
  return (
    <Container as="div"
      className={clsx("flex items-center gap-3", containerClassName)}
      {...props}
    >
      {label ? (
        <Container as="span"
          className={clsx(
            "text-sm font-medium text-slate-700",
            labelClassName
          )}
        >
          {label}
        </Container>
      ) : null}
      {items.map((item) => (
        <NextLink
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.label ?? item.icon}
          aria-label={item.label ?? item.icon}
          className={clsx(
            "inline-flex shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:text-slate-900",
            linkClassName
          )}
        >
          <Icon
            name={item.icon}
            size={iconSize}
            className={clsx("text-current", iconClassName)}
          />
        </NextLink>
      ))}
    </Container>
  );
};

export default GroupOfSocial;

/*
Import:
import GroupOfSocial from "@/blocks/componets/groupOfSocial/GroupOfSocial";

Props:
- items: { href, icon (Lucide name), label? }[]
- containerClassName: wrapper classes
- iconSize: icon size in px
- iconClassName: classes for each icon
- linkClassName: classes for each link
*/
