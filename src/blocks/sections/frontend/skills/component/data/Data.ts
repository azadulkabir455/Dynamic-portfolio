import type { SkillsData } from "../../type";

const skillItems = [
  {
    name: "React & Next.js",
    blurb:
      "App Router, server components where they help, and client islands for rich interaction — structured for performance and maintainability.",
  },
  {
    name: "TypeScript",
    blurb:
      "Typed boundaries across components and APIs so refactors stay safe and onboarding stays predictable for the whole team.",
  },
  {
    name: "Modern CSS",
    blurb:
      "Layout with flex and grid, responsive tokens, and animation that respects reduced-motion preferences.",
  },
  {
    name: "Design systems",
    blurb:
      "Reusable primitives, consistent spacing and typography, and documentation that keeps UI drift in check.",
  },
  {
    name: "Accessibility",
    blurb:
      "Semantic markup, focus order, keyboard paths, and contrast checks baked into the build rhythm.",
  },
  {
    name: "Performance",
    blurb:
      "Bundle awareness, image strategy, and measuring Core Web Vitals before shipping to users.",
  },
] as const;

const itemsOnceDoubled = [...skillItems, ...skillItems].map((item, index) => ({
  ...item,
  name:
    index >= skillItems.length ? `${item.name} · continued` : item.name,
}));

export const defaultSkillsData: SkillsData = {
  title: "Skills & craft",
  subtitle:
    "A snapshot of the tools and practices I lean on when building interfaces, systems, and polished user flows — from first sketch to production deploy.",
  backgroundImage: "/images/portfolio/pf2.jpg",
  backgroundAlt: "Abstract workspace texture",
  items: [...itemsOnceDoubled, ...itemsOnceDoubled].map((item, index) => ({
    ...item,
    name:
      index >= itemsOnceDoubled.length
        ? `${item.name} · continued`
        : item.name,
  })),
};
