"use client";

import clsx from "clsx";
import Button from "@/blocks/elements/button/Button";
import Card from "@/blocks/elements/card/Card";
import Container from "@/blocks/elements/container/Container";
import { useTabsState } from "./function";
import { TabsProps } from "./type";

const listAlignClasses = {
  left: "justify-start",
  right: "justify-end",
  center: "justify-center",
  full: "",
} as const;

export const Tabs = ({
  items = [],
  defaultValue,
  activeValue,
  onChange,
  listAlign = "left",
  containerClassName,
  listClassName,
  panelClassName,
  ...props
}: TabsProps) => {
  const { value, setValue, activeItem } = useTabsState(items, defaultValue, activeValue, onChange);

  const isFull = listAlign === "full";

  return (
    <Container as="section" size="full" className={clsx("space-y-4 !px-0", containerClassName)} {...props}>
      <Container
        as="section"
        size="full"
        className={clsx(
          "flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 !px-2",
          isFull ? "flex-nowrap" : "flex-wrap",
          listAlignClasses[listAlign],
          listClassName
        )}
      >
        {items.map((item) => (
          <Button
            key={item.value}
            type="button"
            variant={value === item.value ? "primary" : "ghost"}
            size="sm"
            disabled={item.disabled}
            onClick={() => setValue(item.value)}
            leftIcon={item.icon}
            leftIconClassName={item.iconClassName}
            className={clsx(isFull && "min-w-0 flex-1")}
          >
            {item.label}
          </Button>
        ))}
      </Container>

      <Card className={clsx("min-h-32", panelClassName)} padding="lg">
        {activeItem?.content}
      </Card>
    </Container>
  );
};

export default Tabs;
