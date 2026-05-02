export type ExperienceLeftData = {
  title: string;
  paragraph: string;
  imageSrc: string;
  imageAlt: string;
};

export type ExperienceItem = {
  id: string;
  logoSrc: string;
  logoAlt: string;
  imageSrc?: string;
  imageAlt?: string;
  designation: string;
  date: string;
  location: string;
  officeName: string;
  officeInfo: string;
  jobInfo: string;
  achievements: string[];
};

export type ExperienceData = {
  left: ExperienceLeftData;
  items: ExperienceItem[];
};
