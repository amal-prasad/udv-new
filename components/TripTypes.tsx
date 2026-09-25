"use client";

import Image from "next/image";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { blurFor, TRIP_PHOTOS } from "@/lib/images";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/HyperText";

type TripCard = {
  image: string;
  name: string;
  description: React.ReactNode;
  panelCtaLabel: string;
  panelCtaHref: string;
};

const CARDS: TripCard[] = [
  {
    image: TRIP_PHOTOS[7],
    name: "Group trips",
    description: (
      <div className="space-y-4">
        <p>
          <span className="text-[#E8562B] font-medium">Every Friday, we take groups of up to 12 people from Delhi deep into the mountains.</span> These energetic, adventure-filled trips are designed to disrupt your daily routine and connect you with people and land outside of the city.
        </p>
        <p>
          These trips feature a range of activities including: <span className="text-[#E8562B] font-medium">mountain trekking, temple visits, cafe lounging, and evenings around the bonfire.</span>
        </p>
        <p>
          Group trips are a fantastic opportunity to form lasting connections with your fellow travellers. We find that strangers get on the bus and friends get off.
        </p>
        <p>
          You are welcome to join as an individual or with your friends.
        </p>
      </div>
    ),
    panelCtaLabel: "See upcoming trips →",
    panelCtaHref: "/trips",
  },
  {
    image: TRIP_PHOTOS[9],
    name: "Experience trips",
    description: (
      <div className="space-y-4">
        <p>
          We believe that travel has the ability to uncover hidden treasures within ourselves. When you embark on an experience trip this is exactly what you do. You enter a journey of <span className="text-[#E8562B] font-medium">deep self-discovery and connection to world around you.</span>
        </p>
        <p>
          Our experience trips allow you to <span className="text-[#E8562B] font-medium">truly immerse yourself in one unique destination.</span> Each trip will have a specialised focus and a relaxed pace, enabling you to ground yourself and guide your time intentionally.
        </p>
        <p>
          We will provide destination specific workshops that give you the chance to satisfy your curiosity and unleash your creativity. The focus range from <span className="text-[#E8562B] font-medium">painting and woodwork to bird watching, guided foraging, and nature immersion.</span>
        </p>
        <p>
          These trips can be organised on a group or individual basis according to your desire.
        </p>
      </div>
    ),
    panelCtaLabel: "See more →",
    panelCtaHref: "#itineraries",
  },
  {
    image: TRIP_PHOTOS[4],
    name: "Custom trips",
    description: (
      <div className="space-y-4">
        <p>
          If you already have a vision for your next adventure and you simply need help making it a reality, we are here to help. We will listen to your ideas and pair them with our extensive travel expertise to <span className="text-[#E8562B] font-medium">craft the journey of your dreams.</span>
        </p>
      </div>
    ),
    panelCtaLabel: "Plan your trip →",
    panelCtaHref: "/private-trips",
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
  const [selectedCard, setSelectedCard] = useState<TripCard | null>(null);

  return (
    <>
      <section
        id="trip-types"
        className="w-full bg-paper px-4 pb-[10vh] pt-[20vh]"
      >
        <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 md:grid-cols-[280px_1fr] md:items-start">
          {/* Set against the opposite column, per DESIGN.md's rhythm rule —
              not another centred h2 over a grid. */}
          <div className="md:sticky md:top-[14vh]">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              <HyperText>Our trips</HyperText>
            </h2>
            <p className="mt-4 max-w-[42ch] text-sm text-slate md:text-base">
              We offer three distinct types of trips: Group Trips, Experience Trips, and Custom Trips. While each offers a unique feel, all embody our core values at heart: Adventure, Connection and Discovery.
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
                <MobileTripCarousel cards={CARDS} onReadMore={setSelectedCard} />
              </div>
            )}

            {/* md and up, reduced motion: plain stacked cards, no pin/scale. */}
            {isMd !== false && reduce !== false && (
              <div className="hidden md:motion-reduce:flex md:flex-col md:gap-8">
                {CARDS.map((card) => (
                  <StaticCard key={card.name} card={card} onReadMore={setSelectedCard} />
                ))}
              </div>
            )}

            {/* md and up, motion-safe: the sticky-scale-blur mechanic, untouched. */}
            {isMd !== false && reduce !== true && (
              <div className="hidden md:motion-safe:flex md:flex-col">
                {CARDS.map((card) => (
                  <StickyTripCard key={card.name} card={card} onReadMore={setSelectedCard} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCard && (
          <SidePanel card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function StaticCard({ card, onReadMore }: { card: TripCard; onReadMore: (c: TripCard) => void }) {
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
      <CardCopy card={card} onReadMore={onReadMore} />
    </div>
  );
}

function CardCopy({ card, onReadMore }: { card: TripCard; onReadMore: (c: TripCard) => void }) {
  // Only rendered at md and up now — the mobile carousel builds its own
  // title-on-photo / copy-below-photo split inline.
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-10">
      <h3 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-5xl">
        {card.name}
      </h3>
      <div>
        <button
          onClick={() => onReadMore(card)}
          className="inline-flex items-center text-sm font-medium tracking-wide text-paper transition-colors hover:text-white underline underline-offset-4"
        >
          Read more &rarr;
        </button>
      </div>
    </div>
  );
}

// Peeking snap carousel. Native CSS scroll-snap does the scrolling (touch,
// trackpad, and — via tabIndex on the track — arrow keys, all for free); the
// only JS is an IntersectionObserver that watches which card is centred so
// we know which one to scale up. Cheaper and simpler than an embla/shadcn
// carousel dependency for what's a three-item strip.
function MobileTripCarousel({ cards, onReadMore }: { cards: TripCard[]; onReadMore: (c: TripCard) => void }) {
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
            <div className="mt-4 flex flex-col px-1">
              <div>
                <button
                  onClick={() => onReadMore(card)}
                  className="inline-flex items-center text-sm font-medium tracking-wide text-ink transition-colors hover:text-ink/70 underline underline-offset-4"
                >
                  Read more &rarr;
                </button>
              </div>
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
function StickyTripCard({ card, onReadMore }: { card: TripCard; onReadMore: (c: TripCard) => void }) {
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
          <CardCopy card={card} onReadMore={onReadMore} />
        </div>
      </motion.div>
    </div>
  );
}

function SidePanel({ card, onClose }: { card: TripCard; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-paper p-6 shadow-2xl md:p-10 flex flex-col overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {card.name}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 -mr-2 text-slate hover:bg-slate/10 hover:text-ink transition-colors"
            aria-label="Close panel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="text-base text-slate leading-relaxed flex-1">
          {card.description}
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate/20 shrink-0">
          <a
            href={card.panelCtaHref}
            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-ink/80"
          >
            {card.panelCtaLabel}
          </a>
        </div>
      </motion.div>
    </>
  );
}
