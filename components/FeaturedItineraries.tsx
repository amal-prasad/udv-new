import Link from "next/link";

import { BlurHighlight } from "@/components/BlurHighlight";
import { Globe } from "@/components/Globe";
import { TripGrid } from "@/components/TripCard";
import { ITINERARIES } from "@/data/trips";

// Cards link to /trips/[slug], where the day-by-day lives as crawlable HTML
// (it used to sit in a client-only modal).
export function FeaturedItineraries() {
  return (
    <section id="itineraries" className="relative w-full overflow-hidden bg-night px-4 pb-[10vh] pt-[14vh]">
      {/* Every trip on this page leaves from Delhi and lands somewhere in the
          Himalaya — the globe draws exactly those arcs, so the background is
          the section's content rather than decoration. */}
      <Globe className="pointer-events-none absolute -right-[22%] top-[6%] h-[38rem] w-[38rem] opacity-40 md:-right-[8%] md:h-[46rem] md:w-[46rem] md:opacity-55" />
      <div aria-hidden className="sun-wash pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid gap-4 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
            <Link href="/trips">Group Departures</Link>
          </h2>
          <BlurHighlight
            className="max-w-sm text-sm text-cloud md:justify-self-end md:text-right md:text-base"
            text="Nine fixed departures, all of them leaving Delhi by night and ending somewhere most itineraries never reach. Open any trip for the full day-by-day."
            highlight={["leaving Delhi by night", "day-by-day"]}
          />
        </div>

        <div className="mt-12">
          <TripGrid trips={ITINERARIES} />
        </div>
      </div>
    </section>
  );
}
