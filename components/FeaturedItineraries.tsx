"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { blurFor, TRIP_PHOTOS } from "@/lib/images";
import { cn } from "@/lib/utils";

export type FeaturedTrip = {
  slug: string;
  title: string;
  region: string;
  duration: string;
  priceFrom: number;
  nextDeparture: string;
  seatsLeft: number;
  seatsTotal: number;
  photo: string;
};

// Placeholder trip data — real itineraries are awaiting the client and will
// replace this const. Keep the shape (slug/title/region/duration/price/
// departure/seats/photo) so swapping in real trips is a data-only change.
export const FEATURED_TRIPS: FeaturedTrip[] = [
  {
    slug: "spiti-valley-circuit",
    title: "Spiti Valley circuit",
    region: "Himachal Pradesh",
    duration: "7 days",
    priceFrom: 18999,
    nextDeparture: "12 Oct 2026",
    seatsLeft: 4,
    seatsTotal: 12,
    photo: TRIP_PHOTOS[0],
  },
  {
    slug: "kedarkantha-winter-trek",
    title: "Kedarkantha winter trek",
    region: "Uttarakhand",
    duration: "5 days",
    priceFrom: 9499,
    nextDeparture: "20 Dec 2026",
    seatsLeft: 6,
    seatsTotal: 15,
    photo: TRIP_PHOTOS[1],
  },
  {
    slug: "ladakh-monasteries-road-trip",
    title: "Ladakh monasteries road trip",
    region: "Ladakh",
    duration: "9 days",
    priceFrom: 27999,
    nextDeparture: "3 Jul 2026",
    seatsLeft: 2,
    seatsTotal: 10,
    photo: TRIP_PHOTOS[2],
  },
  {
    slug: "meghalaya-living-roots",
    title: "Meghalaya living roots",
    region: "Meghalaya",
    duration: "6 days",
    priceFrom: 15999,
    nextDeparture: "8 Nov 2026",
    seatsLeft: 9,
    seatsTotal: 12,
    photo: TRIP_PHOTOS[3],
  },
  {
    slug: "hampi-heritage-cycling",
    title: "Hampi heritage cycling",
    region: "Karnataka",
    duration: "4 days",
    priceFrom: 11499,
    nextDeparture: "15 Jan 2027",
    seatsLeft: 5,
    seatsTotal: 12,
    photo: TRIP_PHOTOS[4],
  },
  {
    slug: "chopta-tungnath-getaway",
    title: "Chopta Tungnath getaway",
    region: "Uttarakhand",
    duration: "3 days",
    priceFrom: 6999,
    nextDeparture: "28 Oct 2026",
    seatsLeft: 7,
    seatsTotal: 14,
    photo: TRIP_PHOTOS[5],
  },
];

// Photo scrim, not a flat fade: warm light entering top-right, cold and deep
// pooling at the bottom — same light source as the rest of the page, applied
// to a photograph instead of a flat ground.
const PHOTO_SCRIM =
  "linear-gradient(180deg, rgba(16,27,36,0) 0%, rgba(16,27,36,0.5) 55%, rgba(16,27,36,0.94) 100%)," +
  "radial-gradient(120% 90% at 100% 0%, rgba(245,161,76,0.4) 0%, rgba(232,86,43,0.16) 42%, transparent 72%)," +
  "radial-gradient(90% 70% at 0% 100%, rgba(127,176,205,0.22) 0%, rgba(16,27,36,0.4) 55%, transparent 80%)";

export function FeaturedItineraries() {
  const [active, setActive] = useState<number>(0);

  return (
    <section id="itineraries" className="w-full bg-paper px-4 pb-[8vh] pt-[14vh]">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-4 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Trips going out soon
          </h2>
          <p className="max-w-sm text-sm text-slate md:text-right md:text-base md:justify-self-end">
            Fixed departures filling up right now — hover a trip (or tap on
            mobile) to see dates, pricing and seats left.
          </p>
        </div>

        <ul className="mt-10 flex w-full flex-col gap-2">
          {FEATURED_TRIPS.map((trip, index) => (
            <TripRow
              key={trip.slug}
              trip={trip}
              isActive={active === index}
              onActivate={() => setActive(index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SeatsBadge({ seatsLeft, seatsTotal }: { seatsLeft: number; seatsTotal: number }) {
  // Honest scarcity, not invented urgency: the badge only reads as "hot"
  // when the real ratio is genuinely low. No countdowns, no fabricated
  // numbers — just a styling threshold on the actual figures above.
  const low = seatsLeft / seatsTotal <= 0.3;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium",
        low ? "bg-alpenglow text-summit shadow-lift" : "bg-paper/15 text-paper ring-1 ring-paper/30",
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", low ? "bg-summit" : "bg-cloud")} />
      {seatsLeft} of {seatsTotal} seats left
    </span>
  );
}

function TripRow({
  trip,
  isActive,
  onActivate,
}: {
  trip: FeaturedTrip;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.li
      className={cn(
        "group relative w-full list-none overflow-hidden rounded-3xl",
        "focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-2 focus-within:ring-offset-paper",
      )}
      initial={false}
      animate={{ height: isActive ? "26rem" : "6.5rem" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Keyboard users: focusing (Tab) or activating this control expands
          the panel just like hover/tap does. It sits behind the "View
          itinerary" link in DOM order so the link stays a plain, reachable
          anchor rather than nesting interactive elements. Default outline is
          suppressed here because the li's overflow-hidden clips it — the
          focus-within ring above is the visible affordance instead. */}
      <button
        type="button"
        className="absolute inset-0 z-0 h-full w-full cursor-pointer text-left outline-none"
        aria-expanded={isActive}
        aria-label={`${isActive ? "Collapse" : "Expand"} ${trip.title}`}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
      >
        <Image
          src={trip.photo}
          alt={trip.title}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          placeholder="blur"
          blurDataURL={blurFor(trip.photo)}
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundImage: PHOTO_SCRIM }} />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-4 md:p-6">
        {/* Always-on row: legible at 6.5rem collapsed, not dependent on
            hover/focus to communicate anything. */}
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold text-paper md:text-2xl">
              {trip.title}
            </h3>
            <p className="truncate text-xs text-cloud md:text-sm">
              {trip.region} · {trip.duration} · from ₹{trip.priceFrom.toLocaleString("en-IN")}
            </p>
          </div>
          <SeatsBadge seatsLeft={trip.seatsLeft} seatsTotal={trip.seatsTotal} />
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex flex-col gap-2"
            >
              <p className="text-xs text-cloud">
                Next departure {trip.nextDeparture}
              </p>
              <Link
                href={`/itineraries/${trip.slug}`}
                className="mt-1 w-fit text-sm font-medium text-paper underline underline-offset-4 transition-opacity hover:opacity-80"
              >
                View itinerary →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
