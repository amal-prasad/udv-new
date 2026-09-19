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
  "/images/1.JPEG",
  "/images/14.JPEG",
  "/images/2.JPEG",
  "/images/3.JPEG",
  "/images/4.JPEG",
  "/images/5.JPG",
  "/images/6.JPEG",
  "/images/7.JPG",
  "/images/8.JPEG",
  "/images/9.JPEG",
  "/images/10.JPEG",
  "/images/11.png",
  "/images/12.png",
  "/images/13.png"
];

// 12px WebP thumbnails, inlined so next/image can paint a blurred stand-in on
// the very first frame instead of a grey box. Regenerate with
// scripts/gen-blur.js whenever a photo in /public/images is replaced.
const BLUR: Record<string, string> = {
  "/images/hero.JPEG": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoMAAkAA4BaJYgCdAELKPMiAAD+64wC1oBpTdbCi8LAwJIuemBNxbwOM1p1FBj5daXLntZ5p6Lm7oAA",
  "/images/1.JPEG": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoJAAwAA4BaJQBOgB6XcVyWE6AA/u3sd2xaIjeW0ZbjSO2xbf19gzGdquhL3QC8GqcTLMWluGb2nYLwfoSAAA==",
  "/images/2.JPEG": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAQCdASoMAAgAA4BaJZQC7ADZoU6IAMr2/E98HY3PW05bFSiTaeT4TRkPpoHIT4XT0MK9IFnOLNo/4IpMUzNgAAA=",
  "/images/3.JPEG": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoMAAgAA4BaJYwCdAENeeY4KgAA/u7wF2vKWxfoj8mjtGolh5byMO3ZinXIwh/+PLehvgAA",
  "/images/4.JPEG": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoMAAgAA4BaJQBOgCP+zAtQAP7lzU4QJSmjJoGV6qD9TJSrSKvuz4YwAAA=",
  "/images/5.JPG": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoIAAwAA4BaJYgCdAEOtX00AAD98Hik0OdWhkDwl/Cs2/NOL1AW89z12zTnKIAA",
  "/images/6.JPEG": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoMAAkAA4BaJYwCdAD1fT9AebMAAP7N9EpOjuLOVSKZ5XicL8ho3VZibgmO6S4JU7cMIi+mcXWT5sPaPpwJjsjsjAqg8AAA",
  "/images/7.JPG": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAABQAgCdASoJAAwAA4BaJbACdAYtp2whzNbElwAA/sp7MB8wDmHC7Z6pOGvAcDtiTybqaH1SCjCwnWmsWaaDOB120qpkcez29MQR9oP0ZgWuId7kz9/stX5s+eGkAA==",
  "/images/8.JPEG": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACwAQCdASoMAAkAA4BaJQBOgBdYMNEAAP7oh2r8REIJekz9oBDZLwAm0zCFvfdHPzInmTI/2QiP3GWkZVOnSYeWivAAAA==",
  "/images/9.JPEG": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoMAAkAA4BaJYgCdAEDe9f2K0AA/urGJQWxmrXK/+yH91THFlki0kUFZJnq+Lza3Z5Cc+kdAczeiHAA",
  "/images/10.JPEG": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoMAAkAA4BaJQBOgB+FmSG9gAD+7/IaE7brgXtYpWIte7n/am0HDUEejkZf5UmQsBdEsfTvDlsdMAAA",
  "/images/11.png": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoMAAkAA4BaJYwCdAD1fT9AebMAAP7N9EpOjuLOVSKZ5XicL8ho3VZibgmO6S4JU7cMIi+mcXWT5sPaPpwJjsjsjAqg8AAA",
  "/images/12.png": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAABQAgCdASoJAAwAA4BaJbACdAYtp2whzNbElwAA/sp7MB8wDmHC7Z6pOGvAcDtiTybqaH1SCjCwnWmsWaaDOB120qpkcez29MQR9oP0ZgWuId7kz9/stX5s+eGkAA==",
  "/images/13.png": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoIAAwAA4BaJYgCdAEOtX00AAD98Hik0OdWhkDwl/Cs2/NOL1AW89z12zTnKIAA",
  "/images/14.JPEG": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IEYAAAAQAgCdASoMAAgAA4BaJZQC7AI0hT9YAAJ/M9B/P15bGy7aJk0x88G6bUvS2+15f0/S09gBfG0291xW/M7/r5tC12j378q216KAA",
  "/Jibhi & Shangarh.png": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoMAAcAA4BaJYwCdAEUoxp+YAD337U8gmtfA7rIen9m8tdGQFDJpkh+DFavAbuGkAA=",
  "/Kasardevi.png": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAAAwAgCdASoMAAgAA4BaJYgCdAEQXNROCaOGAAD5QrdETtl3pGihAlI4xJgzbsYycGzrhpzP8LV+b5H+fEwWJQgS68owfAXUZ7NWJ0fTpwAAAA==",
  "/Chandratal.jpg": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoKAAwAA4BaJZACdAEOzBOk4AD+6hf3YWktwb7EaMckL23P2Yee4vou9ExiK0By63xF8AAA",
  "/Zanskar.png": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAAAQAgCdASoMAAYAA4BaJYgCdH8AE73zwbqgAP7zMHGbaj8/zQXZhx0ByrtkhIIQ7v57rNJ1AhZZggAA",
  "/darma.png": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoMAAYAA4BaJbACdADx+e1QAAD+7SgKWIvczkbJTVt/XxfyN9OqKxOSliBs1spHk++vkZ+O2lUuQnNkAAA=",
  "/naggar.png": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoLAAwAA4BaJZACdAEf3P+5nrxAAP7Q1PXCXTbIMgyFMPYFdbD1CJ037119GdjMktvNIunUZ6cryykRAAA=",
  "/sangla-chitkul.png": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoMAAYAA4BaJZQAAu0U29pQAP5Yh2SgbDHFXNvVM9t87VK6v/mi4F+pstRB95rq1ehUeoOAAAA=",
  "/spiti.png": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoMAAoAA4BaJYwCdADbUrmoAAD+YOkoACdfMFV8E4yoF6i/l3XCd6dyQW+LpnHFUGlAdMo1uUagnXSxAAA=",
  "/zanskar-padum.jpg": "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAwAgCdASoMAAgAA4BaJZACdGuAAqxjikSUAAD9rth9h1UfMscSkNJm1NRLqFo1L8syy15lHLFsHdp8SSAAAA==",
};


/** blurDataURL for a /public/images photo, or undefined if we have none. */
export const blurFor = (src: string) => BLUR[src];
