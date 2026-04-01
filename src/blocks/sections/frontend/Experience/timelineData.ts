import type { TimelineItem } from "@/blocks/elements/3d/Timeline/type";

export const defaultTimeLineData: TimelineItem[] = [
  {
    id: "1",
    period: "2024 — Present",
    title: "Senior Frontend Engineer",
    description:
      "Leading UI architecture, design-system adoption, and performance budgets for customer-facing products.",
    tag: "Product team",
    panelHeading: "Product & scale",
    panelParagraph:
      "Today I own end-to-end UI quality: systems that stay fast, accessible, and consistent as the product grows.",
    panelImageSrc: "/images/portfolio/pf1.jpg",
    panelImageAlt: "Current chapter — product engineering",
  },
  {
    id: "2",
    period: "2021 — 2024",
    title: "Frontend Developer",
    description:
      "Built responsive dashboards, integrated REST/GraphQL APIs, and improved Core Web Vitals across the stack.",
    tag: "SaaS",
    panelHeading: "SaaS & data UI",
    panelParagraph:
      "Shipped dashboards and integrations with a sharp eye on real-world performance and developer experience.",
    panelImageSrc: "/images/portfolio/pf2.jpg",
    panelImageAlt: "SaaS era — dashboards and APIs",
  },
  {
    id: "3",
    period: "2019 — 2021",
    title: "UI Developer",
    description:
      "Translated Figma specs into pixel-perfect components with accessibility and cross-browser consistency.",
    tag: "Agency",
    panelHeading: "Craft & delivery",
    panelParagraph:
      "Agency pace taught me precision: specs to components, every browser, every breakpoint.",
    panelImageSrc: "/images/portfolio/pf3.jpg",
    panelImageAlt: "Agency — UI craft",
  },
  {
    id: "4",
    period: "2017 — 2019",
    title: "Junior Web Developer",
    description:
      "Shipped responsive marketing sites, maintained legacy codebases, and collaborated with designers on component handoff.",
    tag: "Startup",
    panelHeading: "Foundations",
    panelParagraph:
      "Where it started: shipping sites, fixing legacy code, and learning how design meets the browser.",
    panelImageSrc: "/images/portfolio/pf4.jpg",
    panelImageAlt: "Early years — web foundations",
  }
];
