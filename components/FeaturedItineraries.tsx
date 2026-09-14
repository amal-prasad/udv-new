"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { TRIP_PHOTOS } from "@/lib/images";
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

export function FeaturedItineraries() {
  const [active, setActive] = useState<number>(0);

  return (
    <section id="itineraries" className="w-full bg-paper px-4 py-[10vh]">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          Trips going out soon
        </h2>
        <p className="mt-3 max-w-xl text-sm text-ink/70 md:text-base">
          Fixed departures filling up right now — hover a trip (or tap on
          mobile) to see dates, pricing and seats left.
        </p>

        <ul className="mt-10 flex w-full flex-col gap-1.5">
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
        "group relative w-full list-none overflow-hidden rounded-3xl outline-none",
        "focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-2 focus-within:ring-offset-paper",
      )}
      initial={false}
      animate={{ height: isActive ? "26rem" : "3.5rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Keyboard users: focusing (Tab) or activating this control expands
          the panel just like hover/tap does. It sits behind the "View
          itinerary" link in DOM order so the link stays a plain, reachable
          anchor rather than nesting interactive elements. */}
      <button
        type="button"
        className="absolute inset-0 z-0 h-full w-full cursor-pointer text-left"
        aria-expanded={isActive}
        aria-label={`Expand ${trip.title}`}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
      >
        <Image
          src={trip.photo}
          alt={trip.title}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-4 md:p-6">
        <h3 className="font-display text-lg font-semibold text-paper md:text-2xl">
          {trip.title}
        </h3>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex flex-col gap-2"
            >
              <p className="text-sm text-cloud">
                {trip.region} · {trip.duration}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-fit rounded-full bg-ember px-3 py-1 text-xs font-medium text-paper">
                  {trip.seatsLeft} of {trip.seatsTotal} left
                </span>
                <span className="text-sm font-medium text-paper">
                  from ₹{trip.priceFrom.toLocaleString("en-IN")}
                </span>
              </div>
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
