export interface HeaderStat {
  label: string;
  value: string;
  sublabel?: string;
}

export interface HeaderContact {
  address: string;
  email: string;
  phone: string;
}

export interface HeaderContent {
  title: string;
  subtitle: string;
  stats: HeaderStat[];
  biographyTitle: string;
  biographyText: string;
  contactTitle: string;
  contact: HeaderContact;
  imageSrc: string;
  imageAlt: string;
}

