import type { Metadata } from "next";

import { SITE } from "@/lib/site-config";

// A page's `openGraph` replaces the layout's whole object, so inner pages go
// through here to keep siteName/locale alongside their own title and URL.
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_IN",
      url: path,
      title,
      description,
      images: [image ?? "/opengraph-image.jpg"],
    },
  };
}
