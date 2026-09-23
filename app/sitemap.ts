import type { MetadataRoute } from "next";

import { DESTINATIONS } from "@/data/destinations";
import { ITINERARIES } from "@/data/trips";
import { SITE } from "@/lib/site-config";

// Built from the data files, never hand-listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/trips", "/destinations", "/group-trips-for-solo-travellers", "/private-trips", "/about"];
  return [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, priority: 0.8 })),
    ...ITINERARIES.map((t) => ({ url: `${SITE.url}/trips/${t.slug}`, priority: 0.9 })),
    ...DESTINATIONS.map((d) => ({ url: `${SITE.url}/destinations/${d.slug}`, priority: 0.7 })),
  ];
}
