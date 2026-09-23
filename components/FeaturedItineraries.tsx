"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { BlurHighlight } from "@/components/BlurHighlight";
import { Globe } from "@/components/Globe";
import { SITE } from "@/lib/site-config";
import { blurFor } from "@/lib/images";
import { ITINERARIES, type Itinerary } from "@/lib/itineraries";
import { cn } from "@/lib/utils";

// Photo scrim, not a flat fade: warm light entering top-right, cold and deep
// pooling at the bottom — same light source as the rest of the page, applied
// to a photograph instead of a flat ground.
const PHOTO_SCRIM =
  "linear-gradient(180deg, rgba(16,27,36,0) 0%, rgba(16,27,36,0.5) 55%, rgba(16,27,36,0.94) 100%)," +
  "radial-gradient(120% 90% at 100% 0%, rgba(245,161,76,0.4) 0%, rgba(232,86,43,0.16) 42%, transparent 72%)," +
  "radial-gradient(90% 70% at 0% 100%, rgba(127,176,205,0.22) 0%, rgba(16,27,36,0.4) 55%, transparent 80%)";

function tripWhatsAppHref(trip: Itinerary) {
  const message = `Hi! I'd like details on the ${trip.title} trip (${trip.duration}).`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function FeaturedItineraries() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = ITINERARIES.find((t) => t.slug === openSlug) ?? null;

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
            Group Departures
          </h2>
          <BlurHighlight
            className="max-w-sm text-sm text-cloud md:justify-self-end md:text-right md:text-base"
            text="Nine fixed departures, all of them leaving Delhi by night and ending somewhere most itineraries never reach. Open any trip for the full day-by-day."
            highlight={["leaving Delhi by night", "day-by-day"]}
          />
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITINERARIES.map((trip) => (
            <TripCard key={trip.slug} trip={trip} onOpen={() => setOpenSlug(trip.slug)} />
          ))}
        </ul>
      </div>

      <ItineraryPanel trip={open} onClose={() => setOpenSlug(null)} />
    </section>
  );
}

function TripCard({ trip, onOpen }: { trip: Itinerary; onOpen: () => void }) {
  return (
    <li className="list-none">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${trip.title} itinerary`}
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
          sizes="(min-width: 768px) 36rem, 100vw"
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
      </button>
    </li>
  );
}

function ItineraryPanel({ trip, onClose }: { trip: Itinerary | null; onClose: () => void }) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lenis owns the smooth scroll, but native scroll can still happen when it's stopped,
  // so we must pause Lenis AND hide the body overflow.
  useEffect(() => {
    if (!trip) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [trip, lenis, onClose]);

  return (
    <AnimatePresence>
      {trip && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-night/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.aside
            key={trip.slug}
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={`${trip.title} itinerary`}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col overflow-y-auto overscroll-contain bg-paper shadow-deep"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="relative h-64 shrink-0 md:h-72">
              <Image
                src={trip.photo}
                alt=""
                fill
                sizes="(min-width: 768px) 36rem, 100vw"
                placeholder="blur"
                blurDataURL={blurFor(trip.photo)}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0" style={{ backgroundImage: PHOTO_SCRIM }} />

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close itinerary"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-night/50 text-paper ring-1 ring-paper/25 backdrop-blur transition-colors hover:bg-night/75"
              >
                <span aria-hidden className="text-lg leading-none">×</span>
              </button>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-dawn">
                  {trip.region} · {trip.duration}
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold leading-tight text-paper">
                  {trip.title}
                </h2>
              </div>
            </header>

            <div className="flex flex-col gap-8 p-6 md:p-8">
              <BlurHighlight
                className="text-base leading-relaxed text-ink"
                text={trip.blurb}
                highlight={trip.highlight}
              />

              <div>
                <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-slate">Route</h3>
                <p className="mt-2 font-display text-sm leading-relaxed text-ink">{trip.route}</p>
              </div>

              <div>
                <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-slate">
                  Day by day
                </h3>
                {/* Left rule + dot per day reads as a timeline without a
                    library: the rule is the <ol> border, the dot is ::before
                    positioned onto it. */}
                <ol className="mt-4 flex flex-col gap-6 border-l border-mist pl-6">
                  {trip.days.map((day) => (
                    <li key={day.label + day.title} className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full bg-alpenglow ring-4 ring-paper"
                      />
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                        {day.label}
                      </p>
                      <p className="mt-1 font-display text-base font-semibold text-ink">
                        {day.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate">{day.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-4xl bg-ink/5 p-5 ring-1 ring-ink/10">
                <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-slate">
                  Payment terms
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  <span className="font-semibold">{trip.advancePct}%</span> as the booking
                  advance, the remaining{" "}
                  <span className="font-semibold">{100 - trip.advancePct}%</span>{" "}
                  {trip.balanceDue}.
                </p>
              </div>

              <a
                href={tripWhatsAppHref(trip)}
                target="_blank"
                rel="noopener noreferrer"
                className="sheen w-fit rounded-full bg-gradient-to-r from-alpenglow to-dawn px-8 py-4 text-sm font-semibold text-summit shadow-glow transition-transform hover:scale-[1.03]"
              >
                Ask about this trip on WhatsApp
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
