"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Icon from "@/blocks/elements/icon/Icon";
import Button from "@/blocks/elements/button/Button";
import Container from "@/blocks/elements/container/Container";
import {
  useClickOutside,
  useDropdownPlacement,
  useDropdownState,
} from "./function";
import { DropdownItem, DropdownProps } from "./type";

const DROPDOWN_ANIMATION_MS = 200;

export const Dropdown = ({
  button,
  items = [],
  trigger = "click",
  onSelect,
  listContainerClassName,
  itemClassName,
  textClassName,
  containerClassName,
  ...props
}: DropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { isOpen, open, close, closeImmediate, openWithDelay, toggle } =
    useDropdownState(trigger);
  const placement = useDropdownPlacement(isOpen, triggerRef, panelRef);
  useClickOutside(containerRef, isOpen, closeImmediate);

  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsAnimated(false);
      const raf = requestAnimationFrame(() => setIsAnimated(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [isOpen]);

  const handleItemClick = (item: DropdownItem, index: number) => {
    if (item.disabled) return;
    onSelect?.(item, index);
    closeImmediate();
  };

  return (
    <Container
      ref={containerRef as any}
      as="div"
      size="full"
      className={clsx("relative inline-block !max-w-full", containerClassName)}
      {...props}
    >
      <Container
        ref={triggerRef as any}
        as="span"
        size="full"
        className="inline-flex"
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          rightIcon="ChevronDown"
          rightIconClassName={clsx(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          className="inline-flex items-center gap-1.5 outline-none"
          onMouseEnter={trigger === "hover" ? openWithDelay : undefined}
          onMouseLeave={trigger === "hover" ? close : undefined}
          onClick={trigger === "click" ? toggle : undefined}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (trigger === "click" && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              toggle();
            }
          }}
        >
          {button}
        </Button>
      </Container>

      {isOpen ? (
        <Container
          ref={panelRef as any}
          as="div"
          size="full"
          className={clsx(
            "absolute left-0 z-50 min-w-[10rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg transition-all ease-out !max-w-none",
            placement === "above" ? "bottom-full mb-1 origin-bottom" : "top-full mt-1 origin-top",
            isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-95",
            listContainerClassName
          )}
          style={{ transitionDuration: `${DROPDOWN_ANIMATION_MS}ms` }}
          onMouseEnter={trigger === "hover" ? open : undefined}
          onMouseLeave={trigger === "hover" ? close : undefined}
        >
          {items.map((item, index) => (
            <Button
              key={item.value ?? index}
              type="button"
              variant="ghost"
              size="sm"
              disabled={item.disabled}
              onClick={() => handleItemClick(item, index)}
              leftIcon={item.icon}
              leftIconClassName={item.iconClassName}
              className={clsx(
                "flex w-full justify-start gap-2 px-3 py-2 text-sm",
                item.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-slate-100",
                itemClassName
              )}
            >
              <span className={clsx("truncate text-left", textClassName)}>
                {item.text}
              </span>
            </Button>
          ))}
        </Container>
      ) : null}
    </Container>
  );
};

export default Dropdown;
