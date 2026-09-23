"use client";

import Image from "next/image";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { blurFor, TRIP_PHOTOS } from "@/lib/images";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/HyperText";

type TripCard = {
  image: string;
  name: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const CARDS: TripCard[] = [
  {
    image: TRIP_PHOTOS[7],
    name: "Slow travel",
    description:
      "Not a checklist, a pause. Our retreats are built around actually resting — long mornings, one place, no rush to squeeze in 'one more thing' before checkout.",
    ctaLabel: "See retreats →",
    ctaHref: "#itineraries",
  },
  {
    image: TRIP_PHOTOS[9],
    name: "Travel without a map",
    description:
      "No hour-by-hour itinerary. We pick the direction, the road decides the rest. For people who'd rather wander somewhere than tick it off a list.",
    ctaLabel: "Go off the plan →",
    ctaHref: "#itineraries",
  },
  {
    image: TRIP_PHOTOS[4],
    name: "Adventure",
    description:
      "Rafting, trekking, the stuff that gets your heart rate up. Built for people who want the trip to hurt a little, in the best way.",
    ctaLabel: "Get moving →",
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
  // null until hydrated: SSR keeps all three variants, client keeps one.
  const isMd = useMediaQuery("(min-width: 768px)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <section
      id="trip-types"
      className="w-full bg-paper px-4 pb-[10vh] pt-[20vh]"
    >
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 md:grid-cols-[280px_1fr] md:items-start">
        {/* Set against the opposite column, per DESIGN.md's rhythm rule —
            not another centred h2 over a grid. */}
        <div className="md:sticky md:top-[14vh]">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            <HyperText>Experience trips</HyperText>
          </h2>
          <p className="mt-4 max-w-[42ch] text-sm text-slate md:text-base">
            Some trips are about how many places you can cover. Ours are about how deeply you can experience one. Trek a route, lose yourself in a festival, follow a camera through the mountains, or stay awhile in a village kitchen. Smaller, slower, and built around what you'll actually remember.
          </p>
        </div>

        <div>
          {/* Below md: horizontal snap carousel, at every viewport height —
              the sticky-pin mechanic needs the ~175vh runway below to scale
              against, which is why it was making the section five phone
              screens tall. Carousel replaces it entirely on mobile, motion
              preference or not (see MobileTripCarousel for how reduced
              motion is handled inside it). */}
          {isMd !== true && (
            <div className="md:hidden">
              <MobileTripCarousel cards={CARDS} />
            </div>
          )}

          {/* md and up, reduced motion: plain stacked cards, no pin/scale. */}
          {isMd !== false && reduce !== false && (
            <div className="hidden md:motion-reduce:flex md:flex-col md:gap-8">
              {CARDS.map((card) => (
                <StaticCard key={card.name} card={card} />
              ))}
            </div>
          )}

          {/* md and up, motion-safe: the sticky-scale-blur mechanic, untouched. */}
          {isMd !== false && reduce !== true && (
            <div className="hidden md:motion-safe:flex md:flex-col">
              {CARDS.map((card) => (
                <StickyTripCard key={card.name} card={card} />
              ))}
            </div>
          )}
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
  // Only rendered at md and up now — the mobile carousel builds its own
  // title-on-photo / copy-below-photo split inline.
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-10">
      <h3 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
        {card.name}
      </h3>
      <p className="max-w-[60ch] text-sm text-cloud md:text-base">
        {card.description}
      </p>
    </div>
  );
}

// Peeking snap carousel. Native CSS scroll-snap does the scrolling (touch,
// trackpad, and — via tabIndex on the track — arrow keys, all for free); the
// only JS is an IntersectionObserver that watches which card is centred so
// we know which one to scale up. Cheaper and simpler than an embla/shadcn
// carousel dependency for what's a three-item strip.
function MobileTripCarousel({ cards }: { cards: TripCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // threshold: 0.6 means a card only "wins" once it's most of the way
    // centred, so the active card doesn't flicker between two neighbours
    // mid-swipe.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: track, threshold: 0.6 },
    );

    for (const card of cardRefs.current) {
      if (card) observer.observe(card);
    }
    return () => observer.disconnect();
  }, [cards.length]);

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="Trip types"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[6vw] pb-2 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alpenglow [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, index) => (
          <div
            key={card.name}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={cn(
              "w-full shrink-0 basis-[86%] snap-center",
              "motion-safe:transition-[transform,opacity] motion-safe:duration-500",
              index === activeIndex
                ? "scale-100 opacity-100"
                : "motion-safe:scale-[0.92] motion-safe:opacity-70",
            )}
          >
            {/* Only the title sits on the photo, where the scrim's dark pool
                actually is. The description is a full paragraph — overlaid on
                a ~260px-wide card it covered the whole frame and ran across
                the bright sky at roughly 2:1 contrast. Below the image, on
                paper, it reads at the same contrast as the rest of the page. */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl bg-ink shadow-deep">
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="86vw"
                placeholder="blur"
                blurDataURL={blurFor(card.image)}
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0" style={SCRIM_STYLE} />
              <h3 className="absolute inset-x-0 bottom-0 p-5 font-display text-2xl font-semibold tracking-tight text-paper">
                {card.name}
              </h3>
            </div>
            <div className="flex flex-col items-start gap-3 px-1 pt-4">
              <p className="text-sm text-slate">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators: each button gets a 44px hit area even though the
          visible dot is much smaller, so it stays tappable on a phone. */}
      <div className="mt-4 flex justify-center gap-1">
        {cards.map((card, index) => (
          <button
            key={card.name}
            type="button"
            aria-label={`Show ${card.name}`}
            aria-current={index === activeIndex ? true : undefined}
            onClick={() =>
              cardRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              })
            }
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                index === activeIndex ? "bg-ink" : "bg-ink/30",
              )}
            />
          </button>
        ))}
      </div>
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
