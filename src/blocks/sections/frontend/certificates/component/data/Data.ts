export type Certificate = {
  id: number;
  src: string;
  alt: string;
  title: string;
  issuer: string;
  originalWidth: number;
  originalHeight: number;
};

export const certificates: Certificate[] = [
  {
    id: 1,
    src: "/images/portfolio/pf1.jpg",
    alt: "Mobile UX Design Certificate",
    title: "Mobile User Experience (UX) Design",
    issuer: "Udemy",
    originalWidth: 1280,
    originalHeight: 960,
  },
  {
    id: 2,
    src: "/images/portfolio/pf2.jpg",
    alt: "Visual Design Certificate",
    title: "Visual Design: The Ultimate Guide",
    issuer: "Udemy",
    originalWidth: 1280,
    originalHeight: 960,
  },
  {
    id: 3,
    src: "/images/portfolio/pf3.jpg",
    alt: "Google UX Design Certificate",
    title: "Foundations of User Experience Design",
    issuer: "Google",
    originalWidth: 1440,
    originalHeight: 1080,
  },
  {
    id: 4,
    src: "/images/portfolio/pf4.jpg",
    alt: "UI Design Certificate",
    title: "UI / UX Design Specialization",
    issuer: "Coursera",
    originalWidth: 1280,
    originalHeight: 960,
  },
  {
    id: 5,
    src: "/images/portfolio/pf1.jpg",
    alt: "Front-End Development Certificate",
    title: "Front-End Web Development",
    issuer: "freeCodeCamp",
    originalWidth: 1200,
    originalHeight: 900,
  },
  {
    id: 6,
    src: "/images/portfolio/pf2.jpg",
    alt: "React Development Certificate",
    title: "Advanced React & Redux",
    issuer: "Udemy",
    originalWidth: 1280,
    originalHeight: 960,
  },
];
