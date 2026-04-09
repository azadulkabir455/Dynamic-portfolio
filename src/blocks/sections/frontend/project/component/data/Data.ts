export type ProjectListItem = {
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  features: string;
  liveLink: string;
  viewDetailsLink: string;
};

export const PROJECT_DEMO_LIST: ProjectListItem[] = [
  {
    imageSrc: "/images/demo.jpg",
    imageAlt: "Night city — storefront of the commerce project",
    category: "E-commerce",
    title: "Retail checkout rebuild",
    features:
      "Next.js · Stripe · headless CMS. Faster PDPs, cart sync, and promos. Next.js · Stripe · headless CMS. Faster PDPs, cart syn",
    liveLink: "https://example.com",
    viewDetailsLink: "#project-commerce",
  },
  {
    imageSrc: "/images/demo.jpg",
    imageAlt: "Analytics dashboard preview",
    category: "SaaS",
    title: "Ops KPI dashboard",
    features:
      "React · TanStack Query · WebSockets. Live KPIs and alerts for one team.",
    liveLink: "https://example.com",
    viewDetailsLink: "#project-ops",
  },
  {
    imageSrc: "/images/demo.jpg",
    imageAlt: "Mobile app concept screens",
    category: "Mobile",
    title: "Habit journal app",
    features:
      "React Native · Expo · SQLite. Offline-first, widgets, and a11y.",
    liveLink: "https://example.com",
    viewDetailsLink: "#project-habit",
  },
  {
    imageSrc: "/images/demo.jpg",
    imageAlt: "Design system documentation site",
    category: "Design system",
    title: "Tokens & Storybook",
    features:
      "Style Dictionary · Storybook · Figma. CI keeps design and code aligned.",
    liveLink: "https://example.com",
    viewDetailsLink: "#project-ds",
  },
];
