import type { PortfolioCardProps } from "../card/type";
import type { PortfolioData } from "../../type";

export const defaultPortfolioData: PortfolioData = {
  portfolioTitle: "Featured projects",
  viewAllButton: {
    href: "/projects",
    label: "View all projects",
  },
  portfolios: [
    {
      imageSrc: "/images/portfolio/pf1.jpg",
      imageAlt: "Featured build - product UI preview",
      title: "Commerce checkout flow",
      description:
        "Headless storefront with cart sync, promos, and Stripe - tuned for Core Web Vitals and a11y.",
      duration: "12 weeks",
      buttonText: "Go to live link",
      buttonLink: "https://example.com",
    },
    {
      imageSrc: "/images/portfolio/pf2.jpg",
      imageAlt: "Dashboard - analytics overview",
      title: "Ops analytics suite",
      description:
        "React dashboards with live KPIs, TanStack Query, and WebSocket alerts for fast decisions.",
      duration: "8 weeks",
      buttonText: "Go to live link",
      buttonLink: "https://example.com",
    },
    {
      imageSrc: "/images/portfolio/pf3.jpg",
      imageAlt: "Mobile app - onboarding screens",
      title: "Field service companion",
      description:
        "Offline-first React Native workflows, GPS routing, and signature capture for technicians on the go.",
      duration: "16 weeks",
      buttonText: "Go to live link",
      buttonLink: "https://example.com",
    },
  ] as PortfolioCardProps[],
}