"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

export function StrangerTrip() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Big text starts lower, in perspective, and moves up/flattens
  const bigTextRotateX = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const bigTextY = useTransform(scrollYProgress, [0, 0.4], [250, 0]);
  const bigTextOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const bigTextTransform = useMotionTemplate`rotateX(${bigTextRotateX}deg) translateY(${bigTextY}px)`;

  // Small text fades in from blur and slightly below after big text
  const smallTextBlur = useTransform(scrollYProgress, [0.4, 0.8], [20, 0]);
  const smallTextOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const smallTextY = useTransform(scrollYProgress, [0.4, 0.8], [40, 0]);
  const smallTextFilter = useMotionTemplate`blur(${smallTextBlur}px)`;

  return (
    <section
      ref={targetRef}
      className="relative z-0 h-[250vh] w-full bg-ink text-paper"
    >
      {/* Sticky container */}
      <div
        className="sticky top-0 mx-auto flex h-[100svh] w-full flex-col items-center justify-center bg-transparent px-6"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            transform: bigTextTransform,
            opacity: bigTextOpacity,
          }}
          className="w-full max-w-4xl text-center"
        >
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-tight text-paper">
            You don&apos;t need a travel buddy.<br className="hidden md:block" /> You need a departure date.
          </h2>
        </motion.div>

        <motion.div
          style={{
            opacity: smallTextOpacity,
            y: smallTextY,
            filter: smallTextFilter,
          }}
          className="mt-8 max-w-2xl text-center text-base text-cloud md:text-lg"
        >
          <p>
            Most of our group trips fill up with people who signed up solo. That&apos;s the point. By
            day two you&apos;re not fifteen strangers in a Tempo Traveller — you&apos;re a group with{" "}
            <span className="text-dawn">inside jokes</span> already.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
