import type { ExperienceCardData } from "./component/card/type";

export type ExperienceSectionData = {
  title?: string;
  paragraph?: string;
  timeline?: ExperienceCardData[];
};
