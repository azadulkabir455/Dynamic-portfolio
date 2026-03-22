export const getSafeLink = (link: string) => {
  return link?.trim() ? link : "#";
};

