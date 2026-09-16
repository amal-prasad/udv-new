"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
import { Globe } from "@/components/Globe";

export function StrangerTrip() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Skiper28 PerspectiveTextScroll: the heading holds a fixed rotateX and
  // only travels vertically, so it rises through a permanently tilted plane
  // like a film credit roll.
  //
  // Order matters, and getting it wrong is what the reference snippet hides:
  // `rotateX() translateY()` translates along the *already-rotated* Y axis,
  // which carries a Z component of Y*sin(30deg) = Y/2. Against a 200px
  // perspective that magnifies the element by 200/(200 - Y/2) — 1.6x by
  // Y=150px, and the reference's Y=487px lands it behind the camera plane
  // entirely. Translating first keeps the motion in the flat parent frame
  // (Z never changes), so the tilt stays constant and the travel range is
  // free to be whatever reads well.
  const yMotionValue = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const transform = useMotionTemplate`translateY(${yMotionValue}vh) rotateX(30deg) translateZ(10px)`;

  return (
    <section
      ref={targetRef}
      className="relative z-0 h-[250vh] w-full bg-ink text-paper"
    >
      {/* Sticky container */}
      <div
        className="sticky top-0 mx-auto flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-transparent px-6"
        style={{
          transformStyle: "preserve-3d",
          perspective: "700px",
        }}
      >
        <Globe className="pointer-events-none absolute -right-[22%] top-[6%] h-[38rem] w-[38rem] opacity-40 md:-right-[8%] md:h-[46rem] md:w-[46rem] md:opacity-55" />
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : { transformStyle: "preserve-3d", transform }
          }
          className="w-full max-w-4xl text-center"
        >
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-tight text-paper">
            You don&apos;t need a travel buddy.<br className="hidden md:block" /> You need a departure date.
          </h2>
        </motion.div>
        {/* Fixed to the sticky viewport (not the moving heading) so it fades
            the section's bottom edge into bg-ink without dimming the text. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24vh] bg-gradient-to-b from-transparent to-ink" />
      </div>
    </section>
  );
}
