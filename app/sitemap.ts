import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

// Trip and destination routes join this list in Phase 5 (read from the trip
// data file, never hand-listed).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url, changeFrequency: "weekly", priority: 1 }];
}
