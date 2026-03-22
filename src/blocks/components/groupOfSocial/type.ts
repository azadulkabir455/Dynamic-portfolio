export interface SocialLinkItem {
  href: string;
  icon: string;
  label?: string;
}

export interface GroupOfSocialProps {
  items: SocialLinkItem[];
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  iconSize?: number;
  iconClassName?: string;
  linkClassName?: string;
  [key: string]: any;
}
