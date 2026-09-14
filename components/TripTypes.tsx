"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { TRIP_PHOTOS } from "@/lib/images";
import { cn } from "@/lib/utils";

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

export function TripTypes() {
  return (
    <section className="w-full bg-paper px-4 pb-[10vh] pt-[15vh]">
      <h2 className="mx-auto mb-[10vh] max-w-4xl text-center font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
        Three ways to travel with us.
      </h2>

      {/* Reduced-motion: plain stacked cards, no pin/scale mechanic. */}
      <div className="mx-auto flex max-w-4xl flex-col gap-8 motion-safe:hidden">
        {CARDS.map((card) => (
          <StaticCard key={card.name} card={card} />
        ))}
      </div>

      <div className="mx-auto hidden flex-col items-center gap-[10vh] motion-safe:flex">
        {CARDS.map((card) => (
          <StickyTripCard key={card.name} card={card} />
        ))}
      </div>
    </section>
  );
}

function StaticCard({ card }: { card: TripCard }) {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-4xl">
      <Image
        src={card.image}
        alt={card.name}
        fill
        sizes="90vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <CardCopy card={card} />
    </div>
  );
}

function CardCopy({ card }: { card: TripCard }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-10">
      <h3 className="font-display text-3xl font-semibold text-paper md:text-5xl">
        {card.name}
      </h3>
      <p className="max-w-md text-sm text-cloud md:text-base">
        {card.description}
      </p>
      <Link
        href={card.ctaHref}
        className="mt-2 w-fit text-sm font-medium text-paper underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        {card.ctaLabel}
      </Link>
    </div>
  );
}

function StickyTripCard({ card }: { card: TripCard }) {
  const vertMargin = 10;
  const container = useRef<HTMLDivElement>(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);

  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll({ target: container });
  const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 10000], [1, 0]);
  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  // Original leaked a scrollY.on("change", ...) subscription on every
  // render — subscribe once here and clean it up on unmount instead.
  useMotionValueEvent(scrollY, "change", (latest) => {
    let animationValue = 1;
    if (latest > maxScrollY) {
      animationValue = Math.max(0, 1 - (latest - maxScrollY) / 10000);
    }
    scale.set(animationValue);
    filter.set((1 - animationValue) * 100);
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView, scrollY]);

  return (
    <motion.div
      ref={container}
      className={cn(
        "sticky w-full max-w-4xl overflow-hidden rounded-4xl bg-ink",
      )}
      style={{
        scale,
        rotate: filter,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`,
      }}
    >
      <motion.div
        style={{ rotate: negateFilter }}
        className="relative h-full w-full scale-125"
      >
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="90vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <CardCopy card={card} />
    </motion.div>
  );
}
