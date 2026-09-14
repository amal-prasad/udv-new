import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // qualities must list every value passed to <Image quality>; Next 16 makes
  // this required and warns today. 75 is the default, 82 is what the hero uses.
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 82] },
};

export default nextConfig;
