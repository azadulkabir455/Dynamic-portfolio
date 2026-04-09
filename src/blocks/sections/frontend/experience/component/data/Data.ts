import type { ExperienceData } from "./type";

export const experienceData: ExperienceData = {
  left: {
    title: "Experience",
    paragraph:
      "Roles and milestones across product teams — building interfaces that scale.",
    imageSrc: "/images/azadulkabir.png",
    imageAlt: "Azadul Kabir",
  },

  items: [
    {
      id: "1",
      logoSrc: "/images/logo/orangetoolz.png",
      logoAlt: "Orangetoolz logo",
      designation: "Senior Frontend Engineer",
      date: "Jan 2024 – Present",
      location: "Dhaka, Bangladesh",
      officeName: "Orangetoolz Ltd.",
      officeInfo:
        "A product-led SaaS company focused on enterprise analytics and real-time dashboards.",
      jobInfo:
        "Leading UI architecture, design-system adoption, and performance budgets for customer-facing products. Collaborating closely with product and design to ship features that delight users.",
      achievements: [
        "Reduced initial bundle size by 42% through code-splitting and lazy loading.",
        "Built and documented a shared component library used across 4 product teams.",
        "Improved Core Web Vitals scores from 60 to 95+ across all key pages.",
        "Mentored 3 junior developers through structured code reviews and pair programming.",
      ],
    },
    {
      id: "2",
      logoSrc: "/images/logo/sheba.avif",
      logoAlt: "Sheba logo",
      designation: "Frontend Developer",
      date: "Mar 2021 – Dec 2023",
      location: "Dhaka, Bangladesh",
      officeName: "Sheba.xyz",
      officeInfo:
        "A B2B SaaS startup building data-pipeline and monitoring tools for engineering teams.",
      jobInfo:
        "Built responsive dashboards, integrated REST and GraphQL APIs, and maintained a fast release cadence with automated visual regression testing.",
      achievements: [
        "Delivered the v2 dashboard rewrite 2 weeks ahead of schedule.",
        "Integrated 6 third-party APIs including Stripe, Mixpanel, and Segment.",
        "Established a Storybook-driven workflow that cut QA time by 30%.",
      ],
    },
    {
      id: "3",
      logoSrc: "/images/logo/beatnik.png",
      logoAlt: "Beatnik logo",
      designation: "UI Developer",
      date: "Jun 2019 – Feb 2021",
      location: "Chittagong, Bangladesh",
      officeName: "Beatnik",
      officeInfo:
        "A creative digital agency delivering web and mobile products for clients across retail and finance.",
      jobInfo:
        "Translated Figma specs into pixel-perfect components with full accessibility and cross-browser consistency. Worked in short sprints with direct client feedback loops.",
      achievements: [
        "Delivered 12+ client projects on time with a 100% client satisfaction rate.",
        "Introduced a CSS design-token system that halved theming effort across projects.",
        "Led accessibility audit for a banking client, resolving 40+ WCAG AA issues.",
      ],
    },
    {
      id: "4",
      logoSrc: "/images/logo/beshto.png",
      logoAlt: "Beshto logo",
      designation: "Junior Web Developer",
      date: "Aug 2017 – May 2019",
      location: "Dhaka, Bangladesh",
      officeName: "Beshto",
      officeInfo:
        "An early-stage startup studio incubating consumer apps and marketplaces.",
      jobInfo:
        "Shipped responsive marketing sites, maintained legacy codebases, and collaborated with designers on component handoff.",
      achievements: [
        "Rebuilt the company's main marketing site, improving load time from 8 s to under 2 s.",
        "Migrated a jQuery-heavy codebase to vanilla ES6 modules.",
        "Contributed to an open-source CSS utility toolkit with 200+ GitHub stars.",
      ],
    },
  ],
};
