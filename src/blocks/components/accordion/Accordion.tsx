"use client";

import clsx from "clsx";
import Button from "@/blocks/elements/button/Button";
import Card from "@/blocks/elements/card/Card";
import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import { useAccordionState } from "./function";
import { AccordionProps } from "./type";

export const Accordion = ({
  items = [],
  defaultValue,
  activeValue,
  onChange,
  multiple = false,
  containerClassName,
  itemClassName,
  contentClassName,
  labelIconSize = 16,
  labelIconClassName,
  ...props
}: AccordionProps) => {
  const { values, toggleValue } = useAccordionState(defaultValue, activeValue, multiple, onChange);

  return (
    <Container as="section" size="full" className={clsx("space-y-3 !px-0", containerClassName)} {...props}>
      {items.map((item) => {
        const isOpen = values.includes(item.value);

        return (
          <Card key={item.value} className={clsx("overflow-hidden", itemClassName)} padding="none">
            <Container as="section" size="full" className="!px-0">
              <Button
                type="button"
                variant="ghost"
                disabled={item.disabled}
                onClick={() => toggleValue(item.value)}
                rightIcon="ChevronDown"
                rightIconClassName={clsx("shrink-0 transition-transform ml-auto", isOpen && "rotate-180")}
                className="flex h-auto w-full items-center justify-start rounded-none px-5 py-4 text-left"
              >
                <Container as="span" className="flex flex-1 items-center gap-2 text-left">
                  {item.labelIconName ? (
                    <Icon
                      name={item.labelIconName}
                      size={labelIconSize}
                      className={clsx("shrink-0 text-current", labelIconClassName)}
                    />
                  ) : null}
                  <span className="truncate">{item.label}</span>
                </Container>
              </Button>
            </Container>

            {isOpen ? (
              <Container
                as="section"
                size="full"
                className={clsx("border-t border-slate-200 !px-0 p-5", contentClassName )}
              >
                {item.content}
              </Container>
            ) : null}
          </Card>
        );
      })}
    </Container>
  );
};

export default Accordion;
