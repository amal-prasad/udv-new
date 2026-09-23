import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site-config";

export type Crumb = { name: string; href: string };

/** Visible trail plus the matching BreadcrumbList JSON-LD. Home is implied. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: c.href === "/" ? SITE.url : `${SITE.url}${c.href}`,
          })),
        }}
      />
      <ol className="flex flex-wrap items-center gap-2 text-xs text-cloud">
        {all.map((c, i) =>
          i < all.length - 1 ? (
            <li key={c.href} className="flex items-center gap-2">
              <Link href={c.href} className="rounded-sm transition-colors hover:text-dawn">
                {c.name}
              </Link>
              <span aria-hidden>/</span>
            </li>
          ) : (
            <li key={c.href} aria-current="page" className="text-paper">
              {c.name}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
