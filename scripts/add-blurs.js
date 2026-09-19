const sharp = require("sharp");
const fs = require("fs");

const newImages = [
  "/Jibhi & Shangarh.png",
  "/Kasardevi.png",
  "/Chandratal.jpg",
  "/Zanskar.png",
  "/darma.png",
  "/naggar.png",
  "/sangla-chitkul.png",
  "/spiti.png",
  "/zanskar-padum.jpg",
];

(async () => {
  let src = fs.readFileSync("lib/images.ts", "utf8");
  let entries = [];
  for (const p of newImages) {
    const buf = await sharp("public" + p)
      .resize(12, 12, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();
    entries.push(`  "${p}": "data:image/webp;base64,${buf.toString("base64")}",`);
  }
  
  // Replace the closing brace of the BLUR object
  src = src.replace(
    /(\/images\/14\.JPEG.*?)\n};/s,
    "$1,\n" + entries.join("\n") + "\n};\n"
  );
  fs.writeFileSync("lib/images.ts", src);
  console.log("Updated lib/images.ts with new blurs");
})();
