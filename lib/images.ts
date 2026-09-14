// Single source of truth for the photos in /public/images. Filenames come
// straight off the camera — alias them here so components never hardcode
// "DSC01003.JPEG".
export const HERO_IMAGE = "/images/hero.JPEG";
export const LOGO = "/logo.png";
export const PEEPS_SPRITE = "/images/peeps/all-peeps.png";

export const TRIP_PHOTOS = [
  "/images/DJI_0141.JPEG",
  "/images/DSC01003.JPEG",
  "/images/DSC01010.JPEG",
  "/images/DSC01069.JPEG",
  "/images/DSC01070.JPEG",
  "/images/DSC09613.JPG",
  "/images/DSC09615.JPG",
  "/images/IMG_20260630_080719993_HDR.JPEG",
  "/images/IMG_20260630_081210116_HDR.JPEG",
  "/images/IMG_20260630_093715977_HDR_PCT.JPEG",
] as const;
