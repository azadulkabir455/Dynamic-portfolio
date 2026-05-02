import type { BlogCardData } from "./component/card/type";

export type BlogSectionData = {
  title?: string;
  paragraph?: string;
  blogs?: BlogCardData[];
  viewAllText?: string;
  viewAllUrl?: string;
};
