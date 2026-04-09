import type { ProjectTwoCardProps } from "./component/card/type";

export const PROJECT_TWO_DEFAULT_IMAGE = "/images/portfolio/pf1.jpg";

export const PROJECT_TWO_CARDS: ProjectTwoCardProps[] = [
  {
    imageSrc: "/images/portfolio/pf1.jpg",
    imageAlt: "Featured build — product UI preview",
    tag: "E-commerce",
    title: "Commerce checkout flow",
    description:
      "Headless storefront with cart sync, promos, and Stripe — tuned for Core Web Vitals and a11y.",
    liveLink: "https://example.com",
    viewLink: "#project-two-card-1",
  },
  {
    imageSrc: "/images/portfolio/pf2.jpg",
    imageAlt: "Dashboard — analytics overview",
    tag: "SaaS",
    title: "Ops analytics suite",
    description:
      "React dashboards with live KPIs, TanStack Query, and WebSocket alerts for fast decisions.",
    liveLink: "https://example.com",
    viewLink: "#project-two-card-2",
  },
  {
    imageSrc: "/images/portfolio/pf3.jpg",
    imageAlt: "Mobile app — onboarding screens",
    tag: "Mobile",
    title: "Field service companion",
    description:
      "Offline-first React Native workflows, GPS routing, and signature capture for technicians on the go.",
    liveLink: "https://example.com",
    viewLink: "#project-two-card-3",
  },
  {
    imageSrc: "/images/portfolio/pf4.jpg",
    imageAlt: "Design system — component library",
    tag: "Design system",
    title: "Unified UI kit",
    description:
      "Tokens, Storybook, and accessible primitives shared across web and native — one source of truth.",
    liveLink: "https://example.com",
    viewLink: "#project-two-card-4",
  },
];
