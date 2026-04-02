export const getIsMobile = () => {
  const userAgent =
    typeof navigator !== "undefined"
      ? navigator.userAgent || navigator.vendor || (window as any).opera
      : "";

  const mobileRegex =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());

  const coarsePointer =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(pointer: coarse)").matches
      : false;

  const isSmallScreen = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  return isMobileUserAgent || coarsePointer || (isSmallScreen && coarsePointer);
};

