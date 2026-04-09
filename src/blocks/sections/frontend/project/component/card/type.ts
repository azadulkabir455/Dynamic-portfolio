import type { RefObject } from "react";

export type ProjectCardProps = {
  /** প্রজেক্ট ক্যারোসেল স্ক্রল রুট — শুধু দৃশ্যমান স্লাইডে ইনভিউ ট্রিগার। */
  scrollRootRef?: RefObject<HTMLElement | null>;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  features: string;
  liveLink: string;
  viewDetailsLink: string;
  liveButtonText?: string;
  viewDetailsButtonText?: string;
  /** Lucide icon name (Icon component) */
  liveIcon?: string;
  viewDetailsIcon?: string;
  className?: string;
};
