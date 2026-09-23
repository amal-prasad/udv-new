import Link from "next/link";

import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { TripGrid } from "@/components/TripCard";
import { DESTINATIONS } from "@/data/destinations";
import { ITINERARIES } from "@/data/trips";
import { HERO_IMAGE } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Himalayan Group Trips from Delhi",
  description:
    "All our small-group trips from Delhi: Spiti, Kinnaur, Manali & Chandratal, Jibhi, Naggar & Parashar, Zanskar, Munsiyari and the Darma Valley. Day-by-day plans.",
  path: "/trips",
});

const REGIONS = ["Himachal", "Uttarakhand", "Zanskar & Ladakh"] as const;
const inRegion = (region: string, r: (typeof REGIONS)[number]) =>
  r === "Zanskar & Ladakh" ? region.includes("Ladakh") : !region.includes("Ladakh") && region.includes(r);

export default function TripsPage() {
  return (
    <>
      <main>
        <PageHero
          photo={HERO_IMAGE}
          crumbs={[{ name: "Trips", href: "/trips" }]}
          title="Himalayan group trips from Delhi"
        >
          <p className="max-w-2xl text-base text-cloud md:text-lg">
            Nine small-group trips across Himachal, Uttarakhand and Zanskar, all of them leaving
            Delhi by night. Open any trip for the full day-by-day plan.
          </p>
        </PageHero>

        <div className="bg-night px-4 py-16 md:py-24">
          <div className="mx-auto flex max-w-5xl flex-col gap-16">
            {REGIONS.map((r) => (
              <section key={r}>
                <h2 className="mb-6 font-display text-2xl font-semibold text-paper md:text-4xl">
                  {r} trips
                </h2>
                <TripGrid trips={ITINERARIES.filter((t) => inRegion(t.region, r))} />
              </section>
            ))}

            <section>
              <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">
                Travel guides by region
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {DESTINATIONS.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/destinations/${d.slug}`}
                      className="inline-block rounded-full px-5 py-2.5 text-sm text-paper ring-1 ring-paper/25 transition-colors hover:bg-paper/10"
                    >
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
