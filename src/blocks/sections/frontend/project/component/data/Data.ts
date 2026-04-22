import type { ProjectSectionData } from "../../type";

export const defaultProjectData: ProjectSectionData = {
  title: "Featured Projects",
  projectList: [
    {
      image: "/images/portfolio/pf1.jpg",
      imageAlt: "Portfolio — retail commerce project preview",
      tag: "E-commerce",
      title: "Retail checkout rebuild",
      description:
        "Next.js, Stripe, and a headless CMS. Faster product pages, reliable cart sync, and flexible promos.",
      detailsText: "View details",
      detailsUrl: "#project-commerce",
      liveText: "Go to live site",
      liveLink: "https://example.com",
    },
    {
      image: "/images/portfolio/pf2.jpg",
      imageAlt: "Portfolio — analytics dashboard preview",
      tag: "SaaS",
      title: "Ops KPI dashboard",
      description:
        "React, TanStack Query, and WebSockets for live KPIs and team alerts.",
      detailsText: "View details",
      detailsUrl: "#project-ops",
      liveText: "Go to live site",
      liveLink: "https://example.com",
    },
    {
      image: "/images/portfolio/pf3.jpg",
      imageAlt: "Portfolio — mobile app concept screens",
      tag: "Mobile",
      title: "Habit journal app",
      description:
        "React Native and Expo with SQLite for offline-first journaling and widgets.",
      detailsText: "View details",
      detailsUrl: "#project-habit",
      liveText: "Go to live site",
      liveLink: "https://example.com",
    },
    {
      image: "/images/portfolio/pf4.jpg",
      imageAlt: "Portfolio — design system documentation preview",
      tag: "Design system",
      title: "Tokens & Storybook",
      description:
        "Style Dictionary and Storybook with Figma so design tokens stay aligned in CI.",
      detailsText: "View details",
      detailsUrl: "#project-ds",
      liveText: "Go to live site",
      liveLink: "https://example.com",
    },
  ],
  viewAllText: "View all projects",
  viewAllUrl: "/projects",
};
