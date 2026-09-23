import Link from "next/link";

import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { DESTINATIONS, tripsFor } from "@/data/destinations";
import { HERO_IMAGE } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Himalayan Destinations & Travel Guides",
  description:
    "Travel guides to the valleys our small-group trips go to: Spiti, Kinnaur, Zanskar, Jibhi and Kumaon, with the trips from Delhi that cover each one.",
  path: "/destinations",
});

export default function DestinationsPage() {
  return (
    <>
      <main>
        <PageHero
          photo={HERO_IMAGE}
          crumbs={[{ name: "Destinations", href: "/destinations" }]}
          title="Where we travel"
        >
          <p className="max-w-2xl text-base text-cloud md:text-lg">
            The valleys our trips go to, and what you see in each one.
          </p>
        </PageHero>

        <div className="bg-paper px-6 py-16 md:px-10 md:py-24">
          <ul className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {DESTINATIONS.map((d) => (
              <li key={d.slug} className="rounded-4xl bg-ink/5 p-6 ring-1 ring-ink/10">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  <Link href={`/destinations/${d.slug}`} className="hover:text-ember">
                    {d.name}
                  </Link>
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate">{d.description}</p>
                <p className="mt-3 text-sm text-slate">
                  Trips: {tripsFor(d).map((t) => t.title).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
