import Image from "next/image";
import Link from "next/link";

import type { Itinerary } from "@/data/trips";
import { blurFor } from "@/lib/images";
import { cn } from "@/lib/utils";

// Photo scrim, not a flat fade: warm light entering top-right, cold and deep
// pooling at the bottom — same light source as the rest of the page, applied
// to a photograph instead of a flat ground.
export const PHOTO_SCRIM =
  "linear-gradient(180deg, rgba(16,27,36,0) 0%, rgba(16,27,36,0.5) 55%, rgba(16,27,36,0.94) 100%)," +
  "radial-gradient(120% 90% at 100% 0%, rgba(245,161,76,0.4) 0%, rgba(232,86,43,0.16) 42%, transparent 72%)," +
  "radial-gradient(90% 70% at 0% 100%, rgba(127,176,205,0.22) 0%, rgba(16,27,36,0.4) 55%, transparent 80%)";

export function TripCard({ trip }: { trip: Itinerary }) {
  return (
    <li className="list-none">
      <Link
        href={`/trips/${trip.slug}`}
        className={cn(
          "group relative flex h-72 w-full flex-col justify-end overflow-hidden rounded-3xl text-left",
          "ring-1 ring-paper/10 transition-transform duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-deep",
          "focus-visible:ring-2 focus-visible:ring-alpenglow",
        )}
      >
        <Image
          src={trip.photo}
          alt=""
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={blurFor(trip.photo)}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ backgroundImage: PHOTO_SCRIM }} />

        <div className="relative z-10 flex flex-col gap-1.5 p-5">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-dawn">
            {trip.region} · {trip.duration}
          </p>
          <h3 className="font-display text-xl font-semibold leading-tight text-paper">
            {trip.title}
          </h3>
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-paper">
            Details
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

export function TripGrid({ trips }: { trips: Itinerary[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.slug} trip={trip} />
      ))}
    </ul>
  );
}
