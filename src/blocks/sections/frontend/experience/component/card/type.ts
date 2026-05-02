export type ExperienceCardData = {
  id: string;
  year?: string;
  company: string;
  workType: string;
  officeInfo: string;
  roleLabel: string;
  role: string;
  period: string;
  images?: string[];
};

export type ExperienceCardProps = {
  item: ExperienceCardData;
};
