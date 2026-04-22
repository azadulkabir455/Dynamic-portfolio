import type { SkillsData } from "../../type";

export const defaultSkillsData: SkillsData = {
  skillBackgroundImage: "/images/bg/skillBackground.jpg",
  skillTitle:
    "I Focus On Creating Designs People Don't Just See Or Attend. They Feel And Remember.",
  skillRadialTitle: "Skill & Crafts",
  skillOrbits: {
    orbitOne: [
      { imageUrl: "/images/logo/zam.avif", label: "Zam" },
      { imageUrl: "/images/logo/telnor.png", label: "Telnor" },
    ],
    orbitTwo: [
      { imageUrl: "/images/logo/orangetoolz.png", label: "Orange Toolz" },
      { imageUrl: "/images/logo/beatnik.png", label: "Beatnik" },
      { imageUrl: "/images/logo/beshto.png", label: "Beshto" },
      { imageUrl: "/images/logo/iovison.png", label: "Iovison" },
    ],
    orbitThree: [
      { imageUrl: "/images/logo/marico.avif", label: "Marico" },
      { imageUrl: "/images/logo/arla.png", label: "Arla" },
      { imageUrl: "/images/logo/sheba.avif", label: "Sheba" },
      { imageUrl: "/images/logo/americanbestit.png", label: "American Best IT" },
    ],
  },
  skillSliderSlides: [
    {
      id: "ai-tools",
      title: "AI Tools",
      tags: [
        { label: "React" },
        { label: "OpenAI" },
        { label: "TypeScript" },
        { label: "Next.js" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend",
      tags: [
        { label: "React" },
        { label: "Next.js" },
        { label: "TypeScript" },
        { label: "Tailwind" },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      tags: [
        { label: "Node.js" },
        { label: "PostgreSQL" },
        { label: "TypeScript" },
      ],
    },
  ],
};
