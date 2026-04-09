/** বাঁ দিকের স্ট্যাটিক প্যানেল (টাইটেল + প্যারাগ্রাফ + ইমেজ) */
export type ExperienceLeftData = {
  title: string;
  paragraph: string;
  imageSrc: string;
  imageAlt: string;
};

/** ডান দিকের টাইমলাইনের প্রতিটি আইটেম */
export type ExperienceItem = {
  id: string;

  /** কোম্পানির লোগো ইমেজ */
  logoSrc: string;
  logoAlt: string;

  /** কোম্পানির / ভূমিকার ব্যানার ইমেজ (ঐচ্ছিক) */
  imageSrc?: string;
  imageAlt?: string;

  /** পদবি */
  designation: string;

  /** কর্মকালীন সময় (যেমন: "Jan 2022 – Present") */
  date: string;

  /** কর্মস্থলের শহর / দেশ */
  location: string;

  /** প্রতিষ্ঠানের নাম */
  officeName: string;

  /** অফিস / টিম সম্পর্কে সংক্ষিপ্ত বিবরণ */
  officeInfo: string;

  /** কাজের বিস্তারিত বিবরণ */
  jobInfo: string;

  /** উল্লেখযোগ্য অর্জনের তালিকা */
  achievements: string[];
};

export type ExperienceData = {
  left: ExperienceLeftData;
  items: ExperienceItem[];
};
