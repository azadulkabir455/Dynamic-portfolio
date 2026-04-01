export type FooterProps = {
  /** Shown after © — e.g. your name or site title */
  ownerLabel?: string;
  /** Defaults to current calendar year */
  year?: number;
  email?: string;
  /** Visible phone text */
  phone?: string;
  /** `tel:` href; if omitted, derived from `phone` (digits and leading +) */
  phoneHref?: string;
};
