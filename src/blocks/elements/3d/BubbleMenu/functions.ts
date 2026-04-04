import type { BubbleMenuHoverStyles, BubbleMenuItem } from "./type";

/** Random tilt in degrees: left (negative) or right (positive), ~4–11° */
export function randomMenuTilt(): number {
  const sign = Math.random() < 0.5 ? -1 : 1;
  const magnitude = 4 + Math.random() * 7;
  return Math.round(sign * magnitude * 10) / 10;
}

export const defaultHoverStyles: BubbleMenuHoverStyles = {
  bgColor: "var(--ternary)",
  textColor: "var(--secondary)",
};

export const defaultItems: BubbleMenuItem[] = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    hoverStyles: { ...defaultHoverStyles },
  },
  {
    label: "project",
    href: "#",
    ariaLabel: "Project",
    hoverStyles: { ...defaultHoverStyles },
  },
  {
    label: "portfolio",
    href: "#",
    ariaLabel: "Official projects",
    hoverStyles: { ...defaultHoverStyles },
  },
  {
    label: "contact us",
    href: "#",
    ariaLabel: "Contact us",
    hoverStyles: { ...defaultHoverStyles },
  },
];
