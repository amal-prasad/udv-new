// Single source of truth for the photos in /public/images. Filenames come
// straight off the camera — alias them here so components never hardcode
// "DSC01003.JPEG".
export const HERO_IMAGE = "/images/hero.JPEG";

// logo.png ships with ~40% transparent padding baked in, which makes any
// height-constrained <Image> render a tiny, visually off-centre mark. These
// two are trimmed to the artwork's real bounding box.
export const LOGO = "/logo-mark.png"; // colour, for pale surfaces
export const LOGO_LIGHT = "/logo-mark-light.png"; // knocked out to paper-white, for ink surfaces

// Real Open Peeps sprite atlas: 15 columns x 7 rows of 240x324 cutouts,
// transparent background. CrowdCanvas slices this. (all-peeps.png, still in
// the same folder, is a single flat crowd scene — not sliceable.)
export const PEEPS_SPRITE = "/images/peeps/open-peeps-sheet.png";
export const PEEPS_COLS = 15;
export const PEEPS_ROWS = 7;

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
];
