"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { blurFor, TRIP_PHOTOS } from "@/lib/images";

type TripCard = {
  image: string;
  name: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const CARDS: TripCard[] = [
  {
    image: TRIP_PHOTOS[1],
    name: "Group departures",
    description:
      "Fixed dates, fixed price, a capped group. You book a seat, not the whole trip. Every departure is confirmed once the minimum group size hits — no surprise cancellations two days out.",
    ctaLabel: "View departures →",
    ctaHref: "#itineraries",
  },
  {
    image: TRIP_PHOTOS[4],
    name: "Customised trips",
    description:
      "Tell us your dates, your budget and the shape of the trip you want. We build the route, the stays, the pace. Everything from the vehicle to the last homestay picked for your group, not shared with strangers.",
    ctaLabel: "Start planning →",
    ctaHref: "#plan",
  },
  {
    image: TRIP_PHOTOS[7],
    name: "Experience trips",
    description:
      "Built around one focus instead of covering ground — trekking-only routes, festival-timed trips, photography-led itineraries, food and village-stay trails. Deeper, slower, usually smaller.",
    ctaLabel: "See experiences →",
    ctaHref: "#itineraries",
  },
];

// Alpenglow scrim: warm light entering top-right, cooling to deep ink at the
// bottom-left, plus enough darkening at the base for the copy to sit on.
// Never `from-ink/90 to-transparent` — that has no light direction.
const SCRIM_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(120% 90% at 92% -10%, rgb(245 161 76 / 0.42) 0%, rgb(232 86 43 / 0.2) 32%, transparent 62%), " +
    "radial-gradient(90% 70% at 4% 106%, rgb(127 176 205 / 0.22) 0%, transparent 55%), " +
    "linear-gradient(200deg, transparent 18%, rgb(16 27 36 / 0.55) 55%, rgb(16 27 36 / 0.94) 100%)",
};

export function TripTypes() {
  return (
    <section
      id="trip-types"
      className="w-full bg-paper px-4 pb-[10vh] pt-[20vh]"
    >
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 md:grid-cols-[280px_1fr] md:items-start">
        {/* Set against the opposite column, per DESIGN.md's rhythm rule —
            not another centred h2 over a grid. */}
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:sticky md:top-[14vh] md:text-4xl">
          Three ways to travel with us.
        </h2>

        <div>
          {/* Reduced-motion: plain stacked cards, no pin/scale mechanic. */}
          <div className="flex flex-col gap-8 motion-safe:hidden">
            {CARDS.map((card) => (
              <StaticCard key={card.name} card={card} />
            ))}
          </div>

          <div className="hidden flex-col motion-safe:flex">
            {CARDS.map((card) => (
              <StickyTripCard key={card.name} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticCard({ card }: { card: TripCard }) {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-4xl shadow-lift">
      <Image
        src={card.image}
        alt={card.name}
        fill
        sizes="(min-width: 768px) 60vw, 90vw"
        placeholder="blur"
        blurDataURL={blurFor(card.image)}
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0" style={SCRIM_STYLE} />
      <CardCopy card={card} />
    </div>
  );
}

function CardCopy({ card }: { card: TripCard }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-10">
      <h3 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
        {card.name}
      </h3>
      <p className="max-w-[60ch] text-sm text-cloud md:text-base">
        {card.description}
      </p>
      <Link
        href={card.ctaHref}
        className="mt-2 w-fit rounded-sm text-sm font-medium text-paper underline underline-offset-4 transition-colors hover:text-dawn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpenglow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        {card.ctaLabel}
      </Link>
    </div>
  );
}

// One owner per motion value: scrollYProgress is the single source of truth
// and every dependent style (scale, blur) is a pure useTransform() of it.
// Nothing ever calls .set() on a derived value and no endpoint is an
// unresolved sentinel like Infinity, so no NaN can reach a style — this is
// what broke the section before (see git history for the old mechanic).
function StickyTripCard({ card }: { card: TripCard }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 0 when this card's wrapper reaches the top of the viewport (it starts
  // being pinned), 1 when the wrapper's bottom reaches the top (the next
  // card is about to slide over it). No `target` offset here would be an
  // invalid scroll-linked config — this one is always well-defined.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <div ref={wrapperRef} className="relative h-[175vh]">
      {/* The sticky element and the fill-image container have to be two
          different nodes: next/image rejects a `position: sticky` parent, and
          collapsing them is what produced the "invalid position" warning. */}
      <motion.div
        style={{ scale, filter: blur }}
        className="sticky top-[10vh] mx-auto h-[80vh] w-full max-w-4xl"
      >
        <div className="relative h-full w-full overflow-hidden rounded-4xl bg-ink shadow-deep">
          <Image
            src={card.image}
            alt={card.name}
            fill
            sizes="(min-width: 768px) 60vw, 90vw"
            placeholder="blur"
            blurDataURL={blurFor(card.image)}
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0" style={SCRIM_STYLE} />
          <CardCopy card={card} />
        </div>
      </motion.div>
    </div>
  );
}
