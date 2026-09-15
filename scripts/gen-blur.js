// Regenerates the BLUR map at the bottom of lib/images.ts.
//   node scripts/gen-blur.js
// Run it after replacing anything in /public/images. 12px WebP keeps each
// data URI around 140 chars, so the whole map is ~1.5KB of HTML.
const sharp = require("sharp");
const fs = require("fs");

const src = fs.readFileSync("lib/images.ts", "utf8");
const files = [...new Set(src.match(/\/images\/[\w.]+\.(?:JPEG|JPG)/g) ?? [])];

(async () => {
  const entries = [];
  for (const p of files) {
    const buf = await sharp("public" + p)
      .resize(12, 12, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();
    entries.push(`  "${p}": "data:image/webp;base64,${buf.toString("base64")}",`);
  }
  const next = src.replace(
    /const BLUR: Record<string, string> = \{[\s\S]*?\n\};/,
    `const BLUR: Record<string, string> = {\n${entries.join("\n")}\n};`
  );
  fs.writeFileSync("lib/images.ts", next);
  console.log(`wrote ${entries.length} blur placeholders`);
})();
