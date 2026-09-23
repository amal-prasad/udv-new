// Single source of truth for the photos in /public/images. Files are
// lowercase kebab-case JPEGs (max 2048px); camera originals live in the
// git-ignored /originals folder.
export const HERO_IMAGE = "/images/snow-peaks-pine-valley.jpg";

// logo.png ships with ~40% transparent padding baked in, which makes any
// height-constrained <Image> render a tiny, visually off-centre mark. These
// two are trimmed to the artwork's real bounding box.
export const LOGO = "/logo-mark.png"; // colour, for pale surfaces
export const LOGO_LIGHT = "/logo-mark-light.png"; // knocked out to paper-white, for ink surfaces

export const TRIP_PHOTOS = [
  "/images/himalayan-valley-river.jpg",
  "/images/group-selfie-prayer-flags.jpg",
  "/images/monastery-prayer-flags.jpg",
  "/images/village-children-smiling.jpg",
  "/images/hillside-village-temple.jpg",
  "/images/craft-workshop-table.jpg",
  "/images/temple-below-mountain-wall.jpg",
  "/images/traveller-craft-workshop.jpg",
  "/images/traveller-himachali-cap.jpg",
  "/images/traveller-mountain-view.jpg",
  "/images/village-snow-peaks-view.jpg",
  "/images/painting-in-the-forest.jpg",
  "/images/painting-session-by-river.jpg",
  "/images/group-art-session-forest.jpg"
];

// 12px WebP thumbnails, inlined so next/image can paint a blurred stand-in on
// the very first frame instead of a grey box. Regenerate with
// scripts/gen-blur.js whenever a photo in /public/images is replaced.
const BLUR: Record<string, string> = {
  "/images/craft-workshop-table.jpg": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADQAQCdASoMAAkAA4BaJQBOgB6P3AKj4AD+zfRKTpQvrzS7dMARMxqeYEVvWc115oTAoYP0nzNBwX5WzlYEqTJsnCCFmWbJW6JPhgAA",
  "/images/group-art-session-forest.jpg": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACwAQCdASoHAAwAA4BaJZgAAppr+JgAAPv6PNIvgh3Si1C1EkQOqeq9dZoVznf3W+Bs/pYLfqN/cCNW/92nhJteyAoAAA==",
  "/images/group-selfie-prayer-flags.jpg": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAABwAgCdASoMAAkAA4BaJZgCdIE5/+BYTNWSidYAAP6Jy2Vhm7nYKPTWX3tOA8NGlV/Y6PxtmpjIza8Ei6acrwCloN22pA07CD0u7ZKAAAA=",
  "/images/hillside-village-temple.jpg": "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoMAAgAA4BaJQBOgCP+zAtQAP7lzU4QJSmjJHD9lqzRmSZ+Oxv+201FSfAAAA==",
  "/images/himalayan-valley-river.jpg": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADwAQCdASoJAAwAA4BaJQBOgB6XcWxG1gAA/u3sd2xaIjeW0ZbjSO2xdIfk42IHKCmuaK0iAB5oVMSmp+luGb2nYLwfoSAA",
  "/images/monastery-prayer-flags.jpg": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACwAQCdASoMAAgAA4BaJZQC7ADW0nIAAMr2/E98HY3PW05bFSiTaeT4TRkPpoHIy/C6e0uzFldzqigPDtxHAzHkAC5QAA==",
  "/images/painting-in-the-forest.jpg": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoMAAcAA4BaJYwCdADcXJ6PZkAA/u6pko/5nNurL0bHwZxKnFXxFcCYB1bytQdLlv85wT/0mwtZ/kT3yEUAAA==",
  "/images/painting-session-by-river.jpg": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACwAQCdASoHAAwAA4BaJQBOgB5t5WAAAOJ9IU49/J7pdvMCvRDAWBm/ZXGJKJcynMBOiPkv/j278jQmu9RPXH987g156n8YPIAAAA==",
  "/images/snow-peaks-pine-valley.jpg": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoMAAkAA4BaJYgCdAELKPMiAAD+64wC1oBpTdbCi8M26yr1FkB+2OJC+oMPq/9zd+sGHN5WQpErigAA",
  "/images/temple-below-mountain-wall.jpg": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoIAAwAA4BaJYgCdAEO1DdZDAAA/fB4pNDnVoYdsk9AHj+swEtK9IIdlis/TJAA",
  "/images/traveller-craft-workshop.jpg": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADQAQCdASoJAAwAA4BaJbACdAEfaPdYAAD+yns11YPlJ/Y5WS8sQZq4jmwlirya0c+dCndS3sbx8RSwJ5uR2WXMtg7KKNvaOqdCXSCMiFi7S1F8+K9mopBBUdeHEAAA",
  "/images/traveller-himachali-cap.jpg": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACQAQCdASoMAAkAA4BaJQBOgBHmlAAA/uiHavxEQgl6TP2gENkvACbTkfEVwz9cUWLHVY8l/mLyeeJaR+7TRMPLRXgAAA==",
  "/images/traveller-mountain-view.jpg": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoMAAkAA4BaJYgCdAC3DYdgAAD+6sYlBa6PYiRyLLE80rtODHlKBYE3gZGT4UcMMyfhs4+ZGex3UBE9TxVKAAAA",
  "/images/trips/darma-valley-darchula.jpg": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoMAAYAA4BaJbACdAD0Qyzm4AD+7ShALEXuci2QDkuUcCAlPDpbC1GrO9uJDIUlAelplqaktGNTcoAA",
  "/images/trips/jibhi-shangarh.jpg": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoMAAcAA4BaJYwCdAEUoxqBIAD337U8gmtfA7rIen9m8tdGQFDJpkh+DFavAbuGkAA=",
  "/images/trips/kasar-devi-munsiyari-khaliya-top.jpg": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoMAAgAA4BaJYgCdAEQW/lBzeAA+UK3RE7Z1xo84DA+D3PYaYAgKUzuzJKrTnN9t/ZUVIUwW4CNziCERZF5/WDco0Dw+/0uQyYAAA==",
  "/images/trips/manali-chandratal.jpg": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoKAAwAA4BaJZACdAEOtWT4AAD+6hf3YWktwb7JNEZjIff54vv+qQM5ZjEVlNxD8DMAAA==",
  "/images/trips/manali-to-zanskar.jpg": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoMAAYAA4BaJYgCdH8AE70aCwAA/vMwcZtqPz/NBalEdl9lJynSc0rfi75vcl2PwQ4AAA==",
  "/images/trips/naggar-parashar.jpg": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoLAAwAA4BaJZACdAEf2+tr0WEAAP7Q1PXCYSIGkKc3LSMGu0nj+z5gPlXyqtQS5lWVsHezSnPIf5h3AAA=",
  "/images/trips/sangla-chitkul-kalpa.jpg": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoMAAYAA4BaJZQAAuXvXaUAAP5Yh2SgcT3ja1LGrzqtAgawQPTguGF5Xdo/tylK/8DccooAAAA=",
  "/images/trips/spiti-circuit.jpg": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAQCdASoMAAoAA4BaJYwCdADbV5nwAP5g6SgAJ18wVXwTjKgXmJ3Z5NB3fkpUHZ/mWz1pRDm4nEuiKownSoHuUAA=",
  "/images/trips/zanskar-padum-circuit.jpg": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAAAwAgCdASoMAAgAA4BaJZACdGuAAqxjikTgAAD9rth9h1UfMscSkNJm1NRLqFo1L8syy12QlnpaIRDEkAA=",
  "/images/village-children-smiling.jpg": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoMAAgAA4BaJYwCw7EOzpztNAAA/u7wF1eULPF/Bwuvmls4TdfA6siG3VyLD8OjmWbakAAA",
  "/images/village-snow-peaks-view.jpg": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoMAAkAA4BaJQBOgB+FkwMfmAAA/u/yGhO264F7WKViLXu6ACTkH0JdMr6XCKhQrZmruzrG4hD+EAAA",
};


/** blurDataURL for a /public/images photo, or undefined if we have none. */
export const blurFor = (src: string) => BLUR[src];
