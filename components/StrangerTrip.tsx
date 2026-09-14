"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HEADLINE = "You don't need a travel buddy. You need a departure date.";

export function StrangerTrip() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [travelDistance, setTravelDistance] = useState(0);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // The original hardcoded a 487px travel distance, tuned for desktop only.
  // Derive it from the measured text height instead so it lands correctly
  // at any viewport size.
  useEffect(() => {
    const measure = () => {
      if (textRef.current) setTravelDistance(textRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const yMotionValue = useTransform(scrollYProgress, [0, 1], [travelDistance, 0]);
  const transform = useMotionTemplate`rotateX(30deg) translateY(${yMotionValue}px) translateZ(10px)`;

  return (
    <section
      ref={targetRef}
      className="relative z-0 h-[300vh] w-full bg-ink text-paper motion-reduce:h-auto"
    >
      {/* Reduced-motion: plain static stacked copy, no pin/3D reveal. */}
      <div className="mx-auto hidden max-w-4xl flex-col items-center gap-8 px-4 py-24 text-center motion-reduce:flex">
        <h2 className="font-display text-4xl font-bold tracking-tight text-paper md:text-6xl">
          {HEADLINE}
        </h2>
        <StrangerTripBody />
      </div>

      <div
        className="sticky top-0 mx-auto flex h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-transparent px-4 py-20 motion-reduce:hidden"
        style={{ transformStyle: "preserve-3d", perspective: "200px" }}
      >
        <motion.div
          ref={textRef}
          style={{ transformStyle: "preserve-3d", transform }}
          className="w-full max-w-4xl text-center font-display text-4xl font-bold tracking-tight text-paper md:text-7xl lg:text-8xl"
        >
          {HEADLINE}
        </motion.div>

        <div className="max-w-lg text-center text-base text-cloud md:text-lg">
          <StrangerTripBody />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[60vh] w-full bg-gradient-to-b from-transparent to-ink" />
      </div>
    </section>
  );
}

function StrangerTripBody() {
  return (
    <p>
      Most of our group trips fill up with people who signed up solo. That&apos;s
      the point. By day two you&apos;re not fifteen strangers in a Tempo
      Traveller — you&apos;re a group with{" "}
      <span className="text-ember">inside jokes</span> already.
    </p>
  );
}
