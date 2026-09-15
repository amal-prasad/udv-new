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

// 12px WebP thumbnails, inlined so next/image can paint a blurred stand-in on
// the very first frame instead of a grey box. Regenerate with
// scripts/gen-blur.js whenever a photo in /public/images is replaced.
const BLUR: Record<string, string> = {
  "/images/hero.JPEG": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoMAAkAA4BaJYgCdAELKPMiAAD+64wC1oBpTdbCi8LAwJIuemBNxbwOM1p1FBj5daXLntZ5p6Lm7oAA",
  "/images/DJI_0141.JPEG": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoJAAwAA4BaJQBOgB6XcVyWE6AA/u3sd2xaIjeW0ZbjSO2xbf19gzGdquhL3QC8GqcTLMWluGb2nYLwfoSAAA==",
  "/images/DSC01003.JPEG": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAQCdASoMAAgAA4BaJZQC7ADZoU6IAMr2/E98HY3PW05bFSiTaeT4TRkPpoHIT4XT0MK9IFnOLNo/4IpMUzNgAAA=",
  "/images/DSC01010.JPEG": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoMAAgAA4BaJYwCdAENeeY4KgAA/u7wF2vKWxfoj8mjtGolh5byMO3ZinXIwh/+PLehvgAA",
  "/images/DSC01069.JPEG": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoMAAgAA4BaJQBOgCP+zAtQAP7lzU4QJSmjJoGV6qD9TJSrSKvuz4YwAAA=",
  "/images/DSC01070.JPEG": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoIAAwAA4BaJYgCdAEOtX00AAD98Hik0OdWhkDwl/Cs2/NOL1AW89z12zTnKIAA",
  "/images/DSC09613.JPG": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoMAAkAA4BaJYwCdAD1fT9AebMAAP7N9EpOjuLOVSKZ5XicL8ho3VZibgmO6S4JU7cMIi+mcXWT5sPaPpwJjsjsjAqg8AAA",
  "/images/DSC09615.JPG": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAABQAgCdASoJAAwAA4BaJbACdAYtp2whzNbElwAA/sp7MB8wDmHC7Z6pOGvAcDtiTybqaH1SCjCwnWmsWaaDOB120qpkcez29MQR9oP0ZgWuId7kz9/stX5s+eGkAA==",
  "/images/IMG_20260630_080719993_HDR.JPEG": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACwAQCdASoMAAkAA4BaJQBOgBdYMNEAAP7oh2r8REIJekz9oBDZLwAm0zCFvfdHPzInmTI/2QiP3GWkZVOnSYeWivAAAA==",
  "/images/IMG_20260630_081210116_HDR.JPEG": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoMAAkAA4BaJYgCdAEDe9f2K0AA/urGJQWxmrXK/+yH91THFlki0kUFZJnq+Lza3Z5Cc+kdAczeiHAA",
  "/images/IMG_20260630_093715977_HDR_PCT.JPEG": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoMAAkAA4BaJQBOgB+FmSG9gAD+7/IaE7brgXtYpWIte7n/am0HDUEejkZf5UmQsBdEsfTvDlsdMAAA",
};

/** blurDataURL for a /public/images photo, or undefined if we have none. */
export const blurFor = (src: string) => BLUR[src];
